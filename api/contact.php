<?php
/**
 * Contact Form API Endpoint - BASIC VERSION
 * Ian Saura Data Engineering Hub
 * Ultra-simplified version with minimal dependencies
 */

// Rate limiting - 5 requests per 5 minutes (prevent spam)
require_once __DIR__ . '/middleware/rate-limiter.php';
applyRateLimit('contact', 5, 300);

// Suppress all errors to prevent 500
error_reporting(0);
ini_set('display_errors', 0);

// Enable CORS for React frontend
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
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Rate limiting - 5 requests per hour per IP
$clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/contact_rate_' . md5($clientIP);
$now = time();
$requests = [];

if (file_exists($rateLimitFile)) {
    $data = json_decode(file_get_contents($rateLimitFile), true);
    if ($data && is_array($data)) {
        $requests = array_filter($data, function($timestamp) use ($now) {
            return ($now - $timestamp) < 3600;
        });
    }
}

if (count($requests) >= 5) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Demasiados mensajes. Intentá de nuevo en 1 hora.']);
    exit();
}

$requests[] = $now;
file_put_contents($rateLimitFile, json_encode(array_values($requests)), LOCK_EX);

// SMTP Email function for Ferozo
function sendSMTPEmail($host, $port, $username, $password, $to, $subject, $body, $replyTo, $fromName) {
    // Fix UTF-8 encoding for accented names
    require_once __DIR__ . '/email-helper.php';
    $subject = encodeEmailSubject(ensureUtf8($subject));
    $body = ensureUtf8($body);
    $fromName = ensureUtf8($fromName);
    
    $socket = @fsockopen("ssl://$host", $port, $errno, $errstr, 30);
    
    if (!$socket) {
        return false;
    }
    
    // Read server greeting
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '220') {
        fclose($socket);
        return false;
    }
    
    // EHLO command
    fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }
    
    // Skip additional EHLO responses
    while (substr($response, 3, 1) === '-') {
        $response = fgets($socket, 512);
    }
    
    // AUTH LOGIN
    if ($username && $password) {
        fputs($socket, "AUTH LOGIN\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) !== '334') {
            fclose($socket);
            return false;
        }
        
        // Send username
        fputs($socket, base64_encode($username) . "\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) !== '334') {
            fclose($socket);
            return false;
        }
        
        // Send password
        fputs($socket, base64_encode($password) . "\r\n");
        $response = fgets($socket, 512);
        if (substr($response, 0, 3) !== '235') {
            fclose($socket);
            return false;
        }
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <$username>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '354') {
        fclose($socket);
        return false;
    }
    
    // Email headers and body
    $email = "From: $fromName <$username>\r\n";
    $email .= "To: <$to>\r\n";
    $email .= "Reply-To: <$replyTo>\r\n";
    $email .= "Subject: $subject\r\n";
    $email .= "Content-Type: text/plain; charset=utf-8\r\n";
    $email .= "Date: " . date('r') . "\r\n";
    $email .= "\r\n";
    $email .= $body;
    $email .= "\r\n.\r\n";
    
    fputs($socket, $email);
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        return false;
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    return true;
}

try {
    // Get JSON input
    $rawInput = @file_get_contents('php://input');
    $input = @json_decode($rawInput, true);

    if (!$input) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid JSON data'
        ]);
        exit();
    }

    // Validate required fields
    $required_fields = ['name', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (empty($input[$field])) {
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
    $message = htmlspecialchars(trim($input['message']), ENT_QUOTES | ENT_HTML5, 'UTF-8');

    // Additional validation
    if (strlen($name) < 2 || strlen($name) > 100) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Name must be between 2 and 100 characters']);
        exit();
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid email address']);
        exit();
    }

    // Basic spam protection
    if (strlen($message) < 10 || strlen($message) > 5000) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Message length invalid']);
        exit();
    }

    // Send email notification using SMTP
    $emailSent = false;
    
    try {
        // Load secure configuration
        if (file_exists(__DIR__ . '/secure-config.php')) {
            require_once __DIR__ . '/secure-config.php';
        }
        
        // SMTP Configuration for Ferozo (with fallback to defined constants)
        $smtpHost = defined('SMTP_HOST') ? SMTP_HOST : 'c2621673.ferozo.com';
        $smtpPort = defined('SMTP_PORT') ? SMTP_PORT : 465;
        $smtpUsername = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
        $smtpPassword = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
        
        $adminEmail = defined('ADMIN_EMAIL') ? ADMIN_EMAIL : 'info@iansaura.com';
        $emailSubject = "Nueva consulta desde iansaura.com - $name";
        
        $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        
        $emailBody = "
==================================================
    NUEVA CONSULTA DESDE IANSAURA.COM
==================================================

Nombre: $name
Email: $email

Mensaje:
$message
        
--------------------------------------------------
Información técnica:
IP: $clientIP
User Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown') . "
Fecha: " . date('Y-m-d H:i:s') . "
==================================================

Responde directamente a este email para contactar al usuario.
";
        
        // Send via SMTP
        $emailSent = sendSMTPEmail(
            $smtpHost,
            $smtpPort,
            $smtpUsername,
            $smtpPassword,
            $adminEmail,
            $emailSubject,
            $emailBody,
            $email, // Reply-To
            $name
        );
        
    } catch (Exception $emailError) {
        // Fallback to PHP mail() if SMTP fails
        $headers = [
            'From: noreply@iansaura.com',
            'Reply-To: ' . $email,
            'Content-Type: text/plain; charset=utf-8',
            'X-Mailer: PHP/' . phpversion()
        ];
        
        $emailSent = @mail($adminEmail, $emailSubject, $emailBody, implode("\r\n", $headers));
    }

    // Return success response
    http_response_code(200);
    
    echo json_encode([
        'success' => true,
        'message' => 'Gracias por tu mensaje! Te responderé pronto.',
        'debug' => [
            'email_sent' => $emailSent,
            'timestamp' => date('Y-m-d H:i:s')
        ]
    ]);

} catch (Exception $e) {
    http_response_code(500);
    
    echo json_encode([
        'success' => false,
        'error' => 'Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente.',
        'debug' => [
            'error_message' => $e->getMessage(),
            'timestamp' => date('Y-m-d H:i:s')
        ]
    ]);
}
?>