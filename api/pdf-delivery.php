<?php
/**
 * Secure PDF Delivery System
 * Validates payment and sends PDF via email
 */

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/pdf-delivery-errors.log');

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
function logPDFDelivery($message, $data = []) {
    $logFile = __DIR__ . '/../logs/pdf-delivery.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - Data: " . json_encode($data);
    }
    $logEntry .= "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// SMTP Email function
function sendPDFEmail($to, $name, $pdfPath) {
    // Fix UTF-8 encoding for accented names
    require_once __DIR__ . '/email-helper.php';
    $name = ensureUtf8($name);
    
    // Use correct Ferozo SMTP settings
    $smtpHost = 'c2621673.ferozo.com';
    $smtpPort = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $smtpUsername = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $smtpPassword = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    
    logPDFDelivery('Attempting SMTP connection with correct settings', [
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
        logPDFDelivery('SMTP connection failed', ['error' => "$errstr ($errno)"]);
        throw new Exception("Failed to connect to SMTP server: $errstr ($errno)");
    }
    
    // Read server greeting (might be multi-line)
    $response = fgets($socket, 1024);
    logPDFDelivery('SMTP greeting received', ['response' => trim($response)]);
    
    // Read any additional greeting lines
    while (substr($response, 3, 1) === '-') {
        $response = fgets($socket, 1024);
        logPDFDelivery('SMTP greeting continuation', ['response' => trim($response)]);
    }
    
    if (substr($response, 0, 3) !== '220') {
        fclose($socket);
        throw new Exception("SMTP server not ready: $response");
    }
    
    // Try EHLO first, then HELO if it fails
    $hostname = 'c2621673.ferozo.com';
    fputs($socket, "EHLO $hostname\r\n");
    $response = fgets($socket, 1024);
    logPDFDelivery('EHLO response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '250') {
        // EHLO failed, try HELO
        logPDFDelivery('EHLO failed, trying HELO', ['ehlo_response' => trim($response)]);
        fputs($socket, "HELO $hostname\r\n");
        $response = fgets($socket, 1024);
        logPDFDelivery('HELO response', ['response' => trim($response)]);
        
        if (substr($response, 0, 3) !== '250') {
            fclose($socket);
            throw new Exception("Both EHLO and HELO failed: $response");
        }
    }
    
    // Skip additional EHLO responses if any
    while (substr($response, 3, 1) === '-') {
        $response = fgets($socket, 1024);
        logPDFDelivery('EHLO continuation', ['response' => trim($response)]);
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 1024);
    logPDFDelivery('AUTH LOGIN response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '334') {
        fclose($socket);
        throw new Exception("AUTH LOGIN failed: $response");
    }
    
    // Send username
    fputs($socket, base64_encode($smtpUsername) . "\r\n");
    $response = fgets($socket, 1024);
    logPDFDelivery('Username auth response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '334') {
        fclose($socket);
        throw new Exception("Username authentication failed: $response");
    }
    
    // Send password
    fputs($socket, base64_encode($smtpPassword) . "\r\n");
    $response = fgets($socket, 1024);
    logPDFDelivery('Password auth response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '235') {
        fclose($socket);
        throw new Exception("Password authentication failed: $response");
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <$smtpUsername>\r\n");
    $response = fgets($socket, 1024);
    logPDFDelivery('MAIL FROM response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        throw new Exception("MAIL FROM failed: $response");
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 1024);
    logPDFDelivery('RCPT TO response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        throw new Exception("RCPT TO failed: $response");
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 1024);
    logPDFDelivery('DATA response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '354') {
        fclose($socket);
        throw new Exception("DATA command failed: $response");
    }
    
    // Prepare PDF attachment
    $pdfContent = file_get_contents($pdfPath);
    $pdfBase64 = base64_encode($pdfContent);
    $boundary = md5(time());
    
    $subject = "📚 Tu libro: Fundamentos Prácticos de Programación con Python";
    
    // Create email with PDF attachment (Fixed structure)
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
    $email .= "📖 Fundamentos Prácticos de Programación con Python\r\n";
    $email .= "🎯 Nivel 1: De Cero a Scripts Profesionales\r\n\r\n";
    $email .= "El PDF está adjunto a este email. Puedes descargarlo y comenzar a aprender inmediatamente.\r\n\r\n";
    $email .= "Consejos para aprovechar al máximo el libro:\r\n";
    $email .= "• Practica cada ejemplo de código\r\n";
    $email .= "• Completa los proyectos paso a paso\r\n";
    $email .= "• Si tienes dudas, no dudes en contactarme\r\n\r\n";
    $email .= "¡Que disfrutes el aprendizaje!\r\n\r\n";
    $email .= "📋 IMPORTANTE - Política de No Reembolso:\r\n";
    $email .= "Al ser un producto digital descargable, todas las ventas son finales.\r\n";
    $email .= "No se ofrecen reembolsos una vez que el PDF ha sido entregado.\r\n";
    $email .= "Si tienes problemas técnicos con el archivo, contáctanos para asistencia.\r\n\r\n";
    $email .= "Saludos,\r\n";
    $email .= "Ian Saura\r\n";
    $email .= "Data Engineer & Educador\r\n";
    $email .= "https://www.iansaura.com\r\n";
    $email .= "info@iansaura.com\r\n\r\n";
    
    // PDF attachment (Fixed headers and encoding)
    $email .= "--$boundary\r\n";
    $email .= "Content-Type: application/pdf; name=\"Fundamentos_Python_Ian_Saura.pdf\"\r\n";
    $email .= "Content-Transfer-Encoding: base64\r\n";
    $email .= "Content-Disposition: attachment; filename=\"Fundamentos_Python_Ian_Saura.pdf\"\r\n";
    $email .= "\r\n";
    
    // Add PDF content in proper chunks (76 chars per line)
    $pdfChunked = chunk_split($pdfBase64, 76, "\r\n");
    $email .= $pdfChunked;
    
    // Ensure proper ending
    if (substr($email, -2) !== "\r\n") {
        $email .= "\r\n";
    }
    
    // End boundary
    $email .= "--$boundary--\r\n";
    
    // SMTP DATA terminator (single dot on line)
    $email .= "\r\n.\r\n";
    
    fputs($socket, $email);
    $response = fgets($socket, 1024);
    logPDFDelivery('Email send response', ['response' => trim($response)]);
    
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        throw new Exception("Email sending failed: $response");
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    $response = fgets($socket, 1024);
    logPDFDelivery('QUIT response', ['response' => trim($response)]);
    
    fclose($socket);
    
    logPDFDelivery('SMTP email sent successfully', [
        'email' => $to,
        'name' => $name,
        'attachment_size' => strlen($pdfBase64) . ' bytes (base64)'
    ]);
    
    return true;
}

// Alternative: Send notification without attachment
function sendNotificationEmail($to, $name, $token) {
    require_once __DIR__ . '/email-helper.php';
    $name = ensureUtf8($name);
    $subject = "📚 Tu libro: Fundamentos Prácticos de Programación con Python";
    $from = "info@iansaura.com";
    
    $message = "¡Hola $name!\n\n";
    $message .= "¡Gracias por tu compra! 🎉\n\n";
    $message .= "Debido a las restricciones del servidor, no pudimos enviarte el PDF automáticamente.\n";
    $message .= "Por favor, responde a este email con tu token de compra y te enviaremos el libro inmediatamente.\n\n";
    $message .= "Token de compra: " . substr($token, 0, 16) . "...\n\n";
    $message .= "Tu libro: Fundamentos Prácticos de Programación con Python\n";
    $message .= "Nivel 1: De Cero a Scripts Profesionales\n\n";
    $message .= "Respuesta garantizada en menos de 24 horas.\n\n";
    $message .= "IMPORTANTE - Política de No Reembolso:\n";
    $message .= "Al ser un producto digital descargable, todas las ventas son finales.\n";
    $message .= "No se ofrecen reembolsos una vez que el PDF ha sido entregado.\n\n";
    $message .= "Saludos,\n";
    $message .= "Ian Saura\n";
    $message .= "Data Engineer & Educador\n";
    $message .= "https://www.iansaura.com\n";
    $message .= "info@iansaura.com\n";
    
    $headers = [
        "From: Ian Saura <$from>",
        "Reply-To: $from",
        "Content-Type: text/plain; charset=utf-8"
    ];
    
    $sent = mail($to, $subject, $message, implode("\r\n", $headers));
    
    if ($sent) {
        logPDFDelivery('Notification email sent successfully', [
            'email' => $to,
            'name' => $name,
            'token' => substr($token, 0, 10) . '...'
        ]);
        return true;
    } else {
        throw new Exception('Notification email failed');
    }
}

// Generate secure token
function generateSecureToken() {
    return bin2hex(random_bytes(32));
}

// Validate payment token (updated for manual and webhook tokens)
function validatePaymentToken($token) {
    // Accept manual tokens from success page
    if (strpos($token, 'manual_') === 0) {
        return strlen($token) >= 20;
    }
    
    // Accept webhook tokens from OneinFinite
    if (strpos($token, 'webhook_') === 0) {
        return strlen($token) >= 30; // webhook_ + payment_id + _ + random_bytes
    }
    
    // Original onei.la token validation (legacy)
    if (strlen($token) >= 32 && ctype_alnum($token)) {
        return true;
    }
    
    return false;
}

try {
    logPDFDelivery('PDF delivery request received', [
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
            logPDFDelivery('Missing token or email in GET request');
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'Token y email son requeridos'
            ]);
            exit();
        }
        
        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            logPDFDelivery('Invalid email format', ['email' => $email]);
            http_response_code(400);
            echo json_encode([
                'success' => false,
                'error' => 'Email inválido'
            ]);
            exit();
        }
        
        // Validate payment token
        if (!validatePaymentToken($token)) {
            logPDFDelivery('Invalid payment token', ['token' => substr($token, 0, 10) . '...']);
            http_response_code(403);
            echo json_encode([
                'success' => false,
                'error' => 'Token de pago inválido'
            ]);
            exit();
        }
        
        // Path to the PDF file
        $pdfPath = __DIR__ . '/../assets/Fundamentos_Python_Ian_Saura.pdf';
        
        if (!file_exists($pdfPath)) {
            logPDFDelivery('PDF file not found', ['path' => $pdfPath]);
            http_response_code(500);
            echo json_encode([
                'success' => false,
                'error' => 'Archivo PDF no encontrado'
            ]);
            exit();
        }
        
        // Send PDF via email
        try {
            // First try: Send PDF with attachment
            $emailSent = sendPDFEmail($email, $name, $pdfPath);
            
            if ($emailSent) {
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'PDF enviado exitosamente a tu email',
                    'email' => $email
                ]);
            } else {
                throw new Exception('PDF email failed');
            }
            
        } catch (Exception $emailError) {
            logPDFDelivery('PDF email failed, trying notification email', ['error' => $emailError->getMessage()]);
            
            // Fallback: Send notification email without attachment
            try {
                $notificationSent = sendNotificationEmail($email, $name, $token);
                
                if ($notificationSent) {
                    http_response_code(200);
                    echo json_encode([
                        'success' => true,
                        'message' => 'Se ha enviado un email con instrucciones para obtener tu PDF',
                        'email' => $email
                    ]);
                } else {
                    throw new Exception('Notification email failed');
                }
                
            } catch (Exception $notificationError) {
                logPDFDelivery('All email methods failed', [
                    'pdf_error' => $emailError->getMessage(),
                    'notification_error' => $notificationError->getMessage()
                ]);
                
                // Final fallback: Manual process
                http_response_code(200);
                echo json_encode([
                    'success' => true,
                    'message' => 'Tu compra ha sido procesada. Te contactaremos en menos de 24 horas con tu PDF',
                    'email' => $email,
                    'note' => 'Si no recibes respuesta, contacta a info@iansaura.com con tu token de compra'
                ]);
            }
        }
        
    } else {
        http_response_code(405);
        echo json_encode([
            'success' => false,
            'error' => 'Método no permitido'
        ]);
    }
    
} catch (Exception $e) {
    $errorMessage = "PDF delivery error: " . $e->getMessage();
    error_log($errorMessage);
    logPDFDelivery("ERROR: " . $e->getMessage());
    
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