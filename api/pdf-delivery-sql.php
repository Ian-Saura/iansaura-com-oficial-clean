<?php
/**
 * SQL Book PDF Delivery System
 * Validates payment and sends SQL PDF via email
 */

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/pdf-delivery-sql-errors.log');

// CORS headers for security
$allowedOrigins = [
    'https://www.iansaura.com',
    'https://iansaura.com',
    'https://onei.la',
    'http://localhost:3000',
    'http://localhost:3001'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: https://www.iansaura.com');
}

header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Create logs directory if it doesn't exist
$logsDir = __DIR__ . '/../logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

// Log function
function logSQLDelivery($message, $data = []) {
    $logFile = __DIR__ . '/../logs/pdf-delivery-sql.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - Data: " . json_encode($data);
    }
    $logEntry .= "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// SMTP Email function for SQL book
function sendSQLPDFEmail($to, $name, $pdfPath) {
    // Use correct Ferozo SMTP settings
    $smtpHost = 'c2621673.ferozo.com';
    $smtpPort = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $smtpUsername = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $smtpPassword = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    
    logSQLDelivery('Attempting SMTP connection for SQL delivery', [
        'host' => $smtpHost,
        'port' => $smtpPort,
        'username' => $smtpUsername
    ]);
    
    // Create SSL context for proper connection
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);
    
    $socket = stream_socket_client("ssl://$smtpHost:$smtpPort", $errno, $errstr, 30, STREAM_CLIENT_CONNECT, $context);
    
    if (!$socket) {
        logSQLDelivery('SMTP connection failed', ['error' => "$errstr ($errno)"]);
        throw new Exception("Failed to connect to SMTP server: $errstr ($errno)");
    }
    
    // Read server greeting
    $response = fgets($socket, 1024);
    logSQLDelivery('SMTP greeting received', ['response' => trim($response)]);
    
    // Read any additional greeting lines
    while (substr($response, 3, 1) === '-') {
        $response = fgets($socket, 1024);
        logSQLDelivery('SMTP greeting continuation', ['response' => trim($response)]);
    }
    
    if (substr($response, 0, 3) !== '220') {
        fclose($socket);
        throw new Exception("SMTP server not ready: $response");
    }
    
    // Try EHLO first
    $hostname = 'c2621673.ferozo.com';
    fputs($socket, "EHLO $hostname\r\n");
    $response = fgets($socket, 1024);
    logSQLDelivery('EHLO response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '250') {
        // Try HELO if EHLO fails
        fputs($socket, "HELO $hostname\r\n");
        $response = fgets($socket, 1024);
        if (substr($response, 0, 3) !== '250') {
            fclose($socket);
            throw new Exception("HELO/EHLO failed: $response");
        }
    }
    
    // Read any additional EHLO lines
    while (substr($response, 3, 1) === '-') {
        $response = fgets($socket, 1024);
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 1024);
    logSQLDelivery('AUTH LOGIN response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '334') {
        fclose($socket);
        throw new Exception("AUTH LOGIN failed: $response");
    }
    
    // Send username
    fputs($socket, base64_encode($smtpUsername) . "\r\n");
    $response = fgets($socket, 1024);
    logSQLDelivery('Username response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '334') {
        fclose($socket);
        throw new Exception("Username authentication failed: $response");
    }
    
    // Send password
    fputs($socket, base64_encode($smtpPassword) . "\r\n");
    $response = fgets($socket, 1024);
    logSQLDelivery('Password response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '235') {
        fclose($socket);
        throw new Exception("Password authentication failed: $response");
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <$smtpUsername>\r\n");
    $response = fgets($socket, 1024);
    logSQLDelivery('MAIL FROM response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        throw new Exception("MAIL FROM failed: $response");
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 1024);
    logSQLDelivery('RCPT TO response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        throw new Exception("RCPT TO failed: $response");
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 1024);
    logSQLDelivery('DATA response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '354') {
        fclose($socket);
        throw new Exception("DATA command failed: $response");
    }
    
    // Prepare PDF attachment
    $pdfContent = file_get_contents($pdfPath);
    $pdfBase64 = base64_encode($pdfContent);
    $boundary = md5(time());
    
    $subject = "📊 Tu libro: SQL desde Cero";
    
    // Create email with PDF attachment
    $email = "From: Ian Saura <$smtpUsername>\r\n";
    $email .= "To: <$to>\r\n";
    $email .= "Subject: $subject\r\n";
    $email .= "MIME-Version: 1.0\r\n";
    $email .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
    $email .= "\r\n";
    
    // Text part
    $email .= "--$boundary\r\n";
    $email .= "Content-Type: text/plain; charset=utf-8\r\n";
    $email .= "Content-Transfer-Encoding: 8bit\r\n";
    $email .= "\r\n";
    $email .= "¡Hola $name!\r\n\r\n";
    $email .= "¡Gracias por tu compra! 🎉\r\n\r\n";
    $email .= "Aquí tienes tu libro:\r\n";
    $email .= "📊 SQL desde Cero\r\n";
    $email .= "🎯 Tu guía completa para dominar bases de datos\r\n\r\n";
    $email .= "El PDF está adjunto a este email. Puedes descargarlo y comenzar a aprender inmediatamente.\r\n\r\n";
    $email .= "Consejos para aprovechar al máximo el libro:\r\n";
    $email .= "• Práctica cada ejemplo en tu computadora\r\n";
    $email .= "• Instala una base de datos para seguir los ejercicios\r\n";
    $email .= "• Toma notas de los conceptos más importantes\r\n";
    $email .= "• Experimenta con tus propias consultas\r\n\r\n";
    $email .= "¿Necesitas ayuda? Responde a este email con tus dudas.\r\n\r\n";
    $email .= "¡Que disfrutes tu aprendizaje!\r\n\r\n";
    $email .= "📋 IMPORTANTE - Política de No Reembolso:\r\n";
    $email .= "Al ser un producto digital descargable, todas las ventas son finales.\r\n";
    $email .= "No se ofrecen reembolsos una vez que el PDF ha sido entregado.\r\n";
    $email .= "Si tienes problemas técnicos con el archivo, contáctanos para asistencia.\r\n\r\n";
    $email .= "Saludos,\r\n";
    $email .= "Ian Saura\r\n";
    $email .= "Data Engineer & Educador\r\n";
    $email .= "https://www.iansaura.com\r\n";
    $email .= "info@iansaura.com\r\n\r\n";
    
    // PDF attachment
    $email .= "--$boundary\r\n";
    $email .= "Content-Type: application/pdf; name=\"SQL_desde_Cero.pdf\"\r\n";
    $email .= "Content-Transfer-Encoding: base64\r\n";
    $email .= "Content-Disposition: attachment; filename=\"SQL_desde_Cero.pdf\"\r\n";
    $email .= "\r\n";
    
    // Split base64 content into 76-character lines
    $email .= chunk_split($pdfBase64, 76, "\r\n");
    
    $email .= "\r\n--$boundary--\r\n";
    $email .= ".\r\n";
    
    // Send email content
    fputs($socket, $email);
    $response = fgets($socket, 1024);
    logSQLDelivery('Email send response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        throw new Exception("Email sending failed: $response");
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    $response = fgets($socket, 1024);
    fclose($socket);
    
    logSQLDelivery('SQL PDF email sent successfully', [
        'email' => $to,
        'name' => $name,
        'pdf_size' => strlen($pdfContent) . ' bytes'
    ]);
    
    return true;
}

// Generate secure token
function generateSecureToken() {
    return bin2hex(random_bytes(32));
}

// Validate payment token (updated for manual SQL tokens)
function validatePaymentToken($token) {
    // Accept manual SQL tokens from success page
    if (strpos($token, 'manual_sql_') === 0) {
        return strlen($token) >= 25;
    }
    
    // Accept webhook tokens from OneinFinite
    if (strpos($token, 'webhook_') === 0) {
        return strlen($token) >= 30;
    }
    
    // Original onei.la token validation (legacy)
    if (strlen($token) >= 32 && ctype_alnum($token)) {
        return true;
    }
    
    return false;
}

try {
    logSQLDelivery('SQL PDF delivery request received', [
        'method' => $_SERVER['REQUEST_METHOD'],
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ]);
    
    // Handle GET request for secure download link
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $token = $_GET['token'] ?? '';
        $email = $_GET['email'] ?? '';
        $name = $_GET['name'] ?? 'Cliente';
        
        if (empty($token) || empty($email)) {
            logSQLDelivery('Missing token or email in GET request');
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'Token y email son requeridos'
            ]);
            exit();
        }
        
        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            logSQLDelivery('Invalid email format', ['email' => $email]);
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'Email inválido'
            ]);
            exit();
        }
        
        // Validate payment token
        if (!validatePaymentToken($token)) {
            logSQLDelivery('Invalid payment token', ['token' => substr($token, 0, 10) . '...']);
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'error' => 'Token de pago inválido'
            ]);
            exit();
        }
        
        // Path to the SQL PDF file
        $pdfPath = __DIR__ . '/../assets/SQL_desde_Cero.pdf';
        
        if (!file_exists($pdfPath)) {
            logSQLDelivery('SQL PDF file not found', ['path' => $pdfPath]);
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Archivo PDF de SQL no encontrado'
            ]);
            exit();
        }
        
        // Send SQL PDF via email
        try {
            $emailSent = sendSQLPDFEmail($email, $name, $pdfPath);
            
            if ($emailSent) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Libro SQL enviado exitosamente a tu email',
                    'email' => $email
                ]);
            } else {
                throw new Exception('SQL PDF email failed');
            }
            
        } catch (Exception $emailError) {
            logSQLDelivery('SQL PDF email failed', ['error' => $emailError->getMessage()]);
            
            // Manual process as fallback
            http_response_code(200);
            echo json_encode([
                'success' => true,
                'message' => 'Tu compra ha sido procesada. Te contactaremos en menos de 24 horas con tu libro SQL',
                'email' => $email,
                'note' => 'Si no recibes respuesta, contacta a info@iansaura.com'
            ]);
        }
        
    } else {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'error' => 'Método no permitido'
        ]);
    }
    
} catch (Exception $e) {
    $errorMessage = "SQL PDF delivery error: " . $e->getMessage();
    error_log($errorMessage);
    logSQLDelivery("ERROR: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error interno del servidor. Por favor contacta a info@iansaura.com',
        'debug' => [
            'error_message' => $e->getMessage(),
            'timestamp' => date('Y-m-d H:i:s')
        ]
    ]);
}
?> 