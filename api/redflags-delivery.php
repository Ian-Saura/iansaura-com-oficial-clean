<?php
/**
 * Red Flags PDF Delivery - Lead Magnet
 * Sends PDF via email without exposing the public URL
 */

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/redflags-delivery-errors.log');
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

// Create logs directory if it doesn't exist
$logsDir = __DIR__ . '/../logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

// Log function
function logRedFlags($message, $data = []) {
    $logFile = __DIR__ . '/../logs/redflags-delivery.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - Data: " . json_encode($data);
    }
    $logEntry .= "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// SMTP Email function with attachment support
function sendSMTPEmailWithAttachment($host, $port, $username, $password, $to, $subject, $body, $attachmentPath, $attachmentName, &$errorMessage = null) {
    // Fix UTF-8 encoding for accented names
    require_once __DIR__ . '/email-helper.php';
    $subject = encodeEmailSubject(ensureUtf8($subject));
    $body = ensureUtf8($body);
    
    $errorMessage = null;

    // Read the attachment
    if (!file_exists($attachmentPath)) {
        $errorMessage = "Attachment file not found: $attachmentPath";
        return false;
    }

    $attachmentContent = file_get_contents($attachmentPath);
    if ($attachmentContent === false) {
        $errorMessage = "Failed to read attachment file";
        return false;
    }

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

    // Generate boundary for multipart email
    $boundary = md5(time());

    // Build email with attachment
    $email = "From: Ian Saura <$username>\r\n";
    $email .= "To: <$to>\r\n";
    $email .= "Reply-To: <$username>\r\n";
    $email .= "Subject: $subject\r\n";
    $email .= "MIME-Version: 1.0\r\n";
    $email .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    $email .= "Date: " . date('r') . "\r\n";
    $email .= "\r\n";
    
    // Email body
    $email .= "--$boundary\r\n";
    $email .= "Content-Type: text/html; charset=utf-8\r\n";
    $email .= "Content-Transfer-Encoding: 7bit\r\n";
    $email .= "\r\n";
    $email .= $body . "\r\n";
    $email .= "\r\n";
    
    // Attachment
    $email .= "--$boundary\r\n";
    $email .= "Content-Type: application/pdf; name=\"$attachmentName\"\r\n";
    $email .= "Content-Transfer-Encoding: base64\r\n";
    $email .= "Content-Disposition: attachment; filename=\"$attachmentName\"\r\n";
    $email .= "\r\n";
    $email .= chunk_split(base64_encode($attachmentContent)) . "\r\n";
    $email .= "--$boundary--\r\n";
    $email .= ".\r\n";

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
    logRedFlags('Red Flags PDF delivery request received', [
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'method' => $_SERVER['REQUEST_METHOD'],
        'origin' => $_SERVER['HTTP_ORIGIN'] ?? 'none'
    ]);
    
    // Get JSON input
    $rawInput = file_get_contents('php://input');
    logRedFlags('Raw input received', ['length' => strlen($rawInput)]);
    
    $input = json_decode($rawInput, true);
    
    if (!$input) {
        logRedFlags('JSON decode failed', ['raw_input' => substr($rawInput, 0, 100)]);
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Invalid JSON data'
        ]);
        exit();
    }
    
    // Validate email
    if (empty($input['email'])) {
        logRedFlags("Missing email field");
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => "Email is required"
        ]);
        exit();
    }
    
    // Sanitize email
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        logRedFlags("Invalid email: $email");
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit();
    }

    logRedFlags("Processing Red Flags PDF delivery for: $email");

    // PDF file path (not exposed publicly)
    $pdfPath = __DIR__ . '/../public/15-RED-FLAGS-EN-TU-CODIGO-DE-DATA-ENGINEERING.pdf';
    $pdfFilename = '15-Red-Flags-Data-Engineering-Ian-Saura.pdf';

    // Check if PDF exists
    if (!file_exists($pdfPath)) {
        logRedFlags("PDF file not found at: $pdfPath");
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'PDF file not found on server'
        ]);
        exit();
    }

    // Send email with PDF attachment
    $emailSent = false;

    // SMTP Configuration for Ferozo
    $smtpHost = 'c2621673.ferozo.com';
    $smtpPort = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $smtpUsername = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $smtpPassword = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';

    $subject = "Tu checklist de Red Flags [+ lo que nadie te cuenta sobre fundamentos]";

    $emailBody = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .content { background: #ffffff; padding: 30px; }
        .highlight { background: #f3f4f6; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
        .footer { text-align: left; padding: 20px 0; color: #666; font-size: 14px; border-top: 1px solid #e5e7eb; margin-top: 30px; }
        a { color: #2563eb; text-decoration: underline; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='content'>
            <p>Hola! Acá está tu checklist: <strong>\"15 Red Flags en tu código DE\"</strong> [adjunto]</p>
            
            <p>Si identificaste 3+ red flags, estás en buena compañía.</p>
            
            <p>El 80% de la gente que entra a DE aprende <strong>\"haciendo que funcione\"</strong> en vez de <strong>\"haciendo que escale\"</strong>.</p>
            
            <p>La diferencia es brutal cuando querés:</p>
            
            <ul>
                <li>Productivizar pipelines serios</li>
                <li>Que tu código no explote a las 3am</li>
                <li>Que otro dev pueda mantener lo que armaste</li>
            </ul>
            
            <p>En los próximos días te voy a compartir exactamente cómo construir fundamentos sólidos sin cloud complexity.</p>
            
            <div class='highlight'>
                <p style='margin: 0;'><strong>Mañana:</strong> El error #1 que hace que tu pipeline sea imposible de debuggear.</p>
            </div>
            
            <p>— Ian</p>
            
            <div class='footer'>
                <p style='margin: 0;'><strong>Ian Saura</strong><br>
                Data Engineering Mentor<br>
                <a href='https://iansaura.com'>iansaura.com</a> | <a href='https://linkedin.com/in/iansaura'>linkedin.com/in/iansaura</a></p>
            </div>
        </div>
    </div>
</body>
</html>
";

    $smtpError = null;

    if (!empty($smtpUsername) && !empty($smtpPassword)) {
        $emailSent = sendSMTPEmailWithAttachment(
            $smtpHost,
            $smtpPort,
            $smtpUsername,
            $smtpPassword,
            $email,
            $subject,
            $emailBody,
            $pdfPath,
            $pdfFilename,
            $smtpError
        );

        if ($emailSent) {
            logRedFlags('PDF sent via SMTP successfully', [
                'to' => $email,
                'subject' => $subject,
                'pdf' => $pdfFilename
            ]);
        } else {
            logRedFlags('SMTP email with PDF failed', [
                'error' => $smtpError ?? 'unknown'
            ]);
        }
    } else {
        logRedFlags('SMTP credentials missing');
    }

    if ($emailSent) {
        // Save subscriber to database for automation
        try {
            // Database connection using secure config
            if (file_exists(__DIR__ . '/secure-config.php')) {
                require_once __DIR__ . '/secure-config.php';
                $config = getSecureConfig();
                $dbHost = $config['DB_HOST'];
                $dbName = $config['DB_NAME'];
                $dbUser = $config['DB_USER'];
                $dbPass = $config['DB_PASSWORD'];
            } else {
                throw new Exception('Secure configuration file not found');
            }
            
            $dsn = "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4";
            $pdo = new PDO($dsn, $dbUser, $dbPass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
            ]);
            
            $stmt = $pdo->prepare("
                INSERT INTO redflags_subscribers (email, source, subscribed_at) 
                VALUES (?, 'redflags_pdf', NOW())
                ON DUPLICATE KEY UPDATE subscribed_at = subscribed_at
            ");
            $stmt->execute([$email]);
            
            logRedFlags('Subscriber saved to database', ['email' => $email]);
        } catch (Exception $e) {
            logRedFlags('Failed to save subscriber to database', [
                'error' => $e->getMessage(),
                'email' => $email
            ]);
            // Don't fail the request if DB insert fails
        }
        
        // Return success response
        http_response_code(200);
        
        echo json_encode([
            'success' => true,
            'message' => 'PDF enviado exitosamente. Revisa tu email.',
            'debug' => [
                'email_sent' => true,
                'timestamp' => date('Y-m-d H:i:s')
            ]
        ]);

        logRedFlags('Red Flags PDF delivery completed successfully for: ' . $email);

    } else {
        // Log failure but don't expose to user
        logRedFlags('Failed to send PDF email', [
            'to' => $email,
            'smtp_error' => $smtpError
        ]);
        
        http_response_code(500);
        
        echo json_encode([
            'success' => false,
            'error' => 'No pudimos enviar el email. Por favor intenta nuevamente o contacta a info@iansaura.com',
            'debug' => [
                'error' => $smtpError,
                'timestamp' => date('Y-m-d H:i:s')
            ]
        ]);
    }

} catch (Exception $e) {
    $errorMessage = "Red Flags delivery error: " . $e->getMessage();
    error_log($errorMessage);
    logRedFlags("ERROR: " . $e->getMessage());
    
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
?>

