<?php
/**
 * Waitlist Form - Using same SMTP configuration as contact form
 */

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/waitlist-errors.log');
ini_set('display_errors', 0);

// CORS headers
$allowedOrigins = [
    'https://www.iansaura.com',
    'https://iansaura.com',
    'http://localhost:3000',
    'http://localhost:3001'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: https://www.iansaura.com');
}

header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Rate limiting - 5 requests per hour per IP
$clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/waitlist_rate_' . md5($clientIP);
$now = time();
$requests = [];

if (file_exists($rateLimitFile)) {
    $data = json_decode(file_get_contents($rateLimitFile), true);
    if ($data && is_array($data)) {
        $requests = array_filter($data, function($timestamp) use ($now) {
            return ($now - $timestamp) < 3600; // 1 hour window
        });
    }
}

if (count($requests) >= 5) {
    http_response_code(429);
    echo json_encode(['error' => 'Demasiados envíos. Intentá de nuevo en 1 hora.']);
    exit();
}

$requests[] = $now;
file_put_contents($rateLimitFile, json_encode(array_values($requests)), LOCK_EX);

// Create logs directory if it doesn't exist
$logsDir = __DIR__ . '/../logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

// Log function
function logWaitlist($message, $data = []) {
    $logFile = __DIR__ . '/../logs/waitlist.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - Data: " . json_encode($data);
    }
    $logEntry .= "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// SMTP Email function for Ferozo (same as contact.php)
function sendSMTPEmail($host, $port, $username, $password, $to, $subject, $body, $replyTo, $fromName, &$errorMessage = null) {
    // Fix UTF-8 encoding for accented names
    require_once __DIR__ . '/email-helper.php';
    $subject = encodeEmailSubject(ensureUtf8($subject));
    $body = ensureUtf8($body);
    $fromName = ensureUtf8($fromName);
    
    $errorMessage = null;

    $socket = @fsockopen("ssl://$host", $port, $errno, $errstr, 30);

    if (!$socket) {
        $errorMessage = "Failed to connect: $errstr ($errno)";
        return false;
    }

    stream_set_timeout($socket, 30);

    $response = '';
    while (($line = fgets($socket, 512)) !== false) {
        $response = $line;
        if (substr($line, 3, 1) !== '-') {
            break;
        }
    }

    if (substr($response, 0, 3) !== '220') {
        $errorMessage = 'SMTP server not ready: ' . trim($response);
        fclose($socket);
        return false;
    }

    $ehloHost = $_SERVER['HTTP_HOST'] ?? 'localhost';
    if (@fputs($socket, "EHLO $ehloHost\r\n") === false) {
        $errorMessage = 'Failed to send EHLO command';
        fclose($socket);
        return false;
    }

    $response = '';
    while (($line = fgets($socket, 512)) !== false) {
        $response = $line;
        if (substr($line, 3, 1) !== '-') {
            break;
        }
    }

    if (substr($response, 0, 3) !== '250') {
        $errorMessage = 'EHLO failed: ' . trim($response);
        fclose($socket);
        return false;
    }

    if ($username && $password) {
        if (@fputs($socket, "AUTH LOGIN\r\n") === false) {
            $errorMessage = 'AUTH LOGIN command failed to send';
            fclose($socket);
            return false;
        }

        $response = fgets($socket, 512);
        if ($response === false || substr($response, 0, 3) !== '334') {
            $errorMessage = 'AUTH LOGIN failed: ' . trim((string) $response);
            fclose($socket);
            return false;
        }

        if (@fputs($socket, base64_encode($username) . "\r\n") === false) {
            $errorMessage = 'Sending SMTP username failed';
            fclose($socket);
            return false;
        }

        $response = fgets($socket, 512);
        if ($response === false || substr($response, 0, 3) !== '334') {
            $errorMessage = 'SMTP username rejected: ' . trim((string) $response);
            fclose($socket);
            return false;
        }

        if (@fputs($socket, base64_encode($password) . "\r\n") === false) {
            $errorMessage = 'Sending SMTP password failed';
            fclose($socket);
            return false;
        }

        $response = fgets($socket, 512);
        if ($response === false || substr($response, 0, 3) !== '235') {
            $errorMessage = 'SMTP password rejected: ' . trim((string) $response);
            fclose($socket);
            return false;
        }
    }

    if (@fputs($socket, "MAIL FROM: <$username>\r\n") === false) {
        $errorMessage = 'MAIL FROM command failed to send';
        fclose($socket);
        return false;
    }

    $response = fgets($socket, 512);
    if ($response === false || substr($response, 0, 3) !== '250') {
        $errorMessage = 'MAIL FROM failed: ' . trim((string) $response);
        fclose($socket);
        return false;
    }

    if (@fputs($socket, "RCPT TO: <$to>\r\n") === false) {
        $errorMessage = 'RCPT TO command failed to send';
        fclose($socket);
        return false;
    }

    $response = fgets($socket, 512);
    if ($response === false || substr($response, 0, 3) !== '250') {
        $errorMessage = 'RCPT TO failed: ' . trim((string) $response);
        fclose($socket);
        return false;
    }

    if (@fputs($socket, "DATA\r\n") === false) {
        $errorMessage = 'DATA command failed to send';
        fclose($socket);
        return false;
    }

    $response = fgets($socket, 512);
    if ($response === false || substr($response, 0, 3) !== '354') {
        $errorMessage = 'DATA command rejected: ' . trim((string) $response);
        fclose($socket);
        return false;
    }

    $email = "From: $fromName <$username>\r\n";
    $email .= "To: <$to>\r\n";
    $email .= "Reply-To: <$replyTo>\r\n";
    $email .= "Subject: $subject\r\n";
    $email .= "Content-Type: text/plain; charset=utf-8\r\n";
    $email .= "Date: " . date('r') . "\r\n";
    $email .= "\r\n";
    $email .= $body;
    $email .= "\r\n.\r\n";

    if (@fputs($socket, $email) === false) {
        $errorMessage = 'Failed to send email payload';
        fclose($socket);
        return false;
    }

    $response = fgets($socket, 512);
    if ($response === false || substr($response, 0, 3) !== '250') {
        $errorMessage = 'Email sending failed: ' . trim((string) $response);
        fclose($socket);
        return false;
    }

    @fputs($socket, "QUIT\r\n");
    fclose($socket);

    return true;
}

try {
    logWaitlist('Waitlist form request received', [
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'method' => $_SERVER['REQUEST_METHOD'],
        'origin' => $_SERVER['HTTP_ORIGIN'] ?? 'none'
    ]);
    
    // Get JSON input
    $rawInput = file_get_contents('php://input');
    logWaitlist('Raw input received', ['length' => strlen($rawInput)]);
    
    $input = json_decode($rawInput, true);
    
    if (!$input) {
        logWaitlist('JSON decode failed', ['raw_input' => substr($rawInput, 0, 100)]);
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid JSON data'
        ]);
        exit();
    }
    
    // Validate required fields
    $required_fields = ['name', 'email', 'preferredPlan', 'reason'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
            logWaitlist("Missing field: $field");
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => "Field '$field' is required"
            ]);
            exit();
        }
    }
    
    // Sanitize inputs
    $name = htmlspecialchars(trim($input['name']), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $preferredPlan = htmlspecialchars(trim($input['preferredPlan']), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $reason = htmlspecialchars(trim($input['reason']), ENT_QUOTES | ENT_HTML5, 'UTF-8');
    
    // Handle optional contact fields
    $contactMethod = !empty($input['contactMethod']) ? htmlspecialchars(trim($input['contactMethod']), ENT_QUOTES | ENT_HTML5, 'UTF-8') : '';
    $contactLink = !empty($input['contactLink']) ? htmlspecialchars(trim($input['contactLink']), ENT_QUOTES | ENT_HTML5, 'UTF-8') : '';
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        logWaitlist("Invalid email: $email");
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit();
    }

    logWaitlist("Processing waitlist from: $name ($email) - Plan: $preferredPlan", [
        'contact_method' => $contactMethod,
        'contact_link' => $contactLink ? 'provided' : 'none'
    ]);

    // Send email notification using SMTP (same as contact.php)
    $emailSent = false;

    // SMTP Configuration for Ferozo - Using actual credentials
    $smtpHost = 'c2621673.ferozo.com';
    $smtpPort = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $smtpUsername = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $smtpPassword = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';

    $adminEmail = 'info@iansaura.com';
    $subject = "🔥 Nueva solicitud de Lista de Espera - Plan $preferredPlan";

    $emailBody = "
==================================================
    NUEVA SOLICITUD PARA LISTA DE ESPERA
==================================================

Nombre: $name
Email: $email
Plan preferido: $preferredPlan" . 
($contactMethod ? "\nMétodo de contacto preferido: $contactMethod" : "") .
($contactLink ? "\nInformación de contacto: $contactLink" : "") . "

Razón para ser seleccionado:
---------------------------
$reason

--------------------------------------------------
Información técnica:
IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "
User Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown') . "
Fecha: " . date('Y-m-d H:i:s') . "
==================================================

Responde directamente a este email para contactar al usuario.
";

    $smtpError = null;

    if (!empty($smtpUsername) && !empty($smtpPassword)) {
        $emailSent = sendSMTPEmail(
            $smtpHost,
            $smtpPort,
            $smtpUsername,
            $smtpPassword,
            $adminEmail,
            $subject,
            $emailBody,
            $email, // Reply-To
            $name,
            $smtpError
        );

        if ($emailSent) {
            logWaitlist('Email sent via SMTP', [
                'to' => $adminEmail,
                'from' => $email,
                'subject' => $subject
            ]);
        } else {
            logWaitlist('SMTP email failed', [
                'error' => $smtpError ?? 'unknown'
            ]);
        }
    } else {
        logWaitlist('SMTP credentials missing, using PHP mail() fallback');
    }

    if (!$emailSent) {
        $headers = [
            'From: noreply@iansaura.com',
            'Reply-To: ' . $email,
            'Content-Type: text/plain; charset=utf-8',
            'X-Mailer: PHP/' . phpversion()
        ];

        $emailSent = @mail($adminEmail, $subject, $emailBody, implode("\r\n", $headers));
        logWaitlist('Fallback to PHP mail()', [
            'success' => $emailSent,
            'smtp_error' => $smtpError
        ]);
    }

    if ($emailSent) {
        logWaitlist('Email sent successfully', [
            'to' => $adminEmail,
            'from' => $email,
            'subject' => $subject
        ]);
    } else {
        logWaitlist('Email sending failed', [
            'to' => $adminEmail,
            'from' => $email,
            'smtp_error' => $smtpError
        ]);
    }
    
    // Return success response regardless of email status (don't fail the user experience)
    http_response_code(200);
    
    echo json_encode([
        'success' => true,
        'message' => 'Te has unido a la lista de espera exitosamente. Te contactaré cuando se abra un cupo.',
        'debug' => [
            'email_sent' => $emailSent,
            'timestamp' => date('Y-m-d H:i:s')
        ]
    ]);

    logWaitlist('Waitlist form completed successfully');

} catch (Exception $e) {
    $errorMessage = "Waitlist form error: " . $e->getMessage();
    error_log($errorMessage);
    logWaitlist("ERROR: " . $e->getMessage());
    
    http_response_code(500);
    
    echo json_encode([
        'success' => false,
        'error' => 'Ocurrió un error al procesar tu solicitud. Por favor intenta nuevamente.',
        'debug' => [
            'error_message' => $e->getMessage(),
            'timestamp' => date('Y-m-d H:i:s')
        ]
    ]);
}