<?php
/**
 * Email Automation Cron Job
 * Runs every hour to send automated emails in the sequence
 * 
 * Setup in crontab:
 * 0 * * * * /usr/bin/php /path/to/api/email-automation-cron.php >> /path/to/logs/email-automation-cron.log 2>&1
 */

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/email-automation-errors.log');
ini_set('display_errors', 0);

// Database connection using secure config
try {
    // Try to load from secure-config first (preferred)
    if (file_exists(__DIR__ . '/secure-config.php')) {
        require_once __DIR__ . '/secure-config.php';
        $config = getSecureConfig();
        $dbHost = $config['DB_HOST'];
        $dbName = $config['DB_NAME'];
        $dbUser = $config['DB_USER'];
        $dbPass = $config['DB_PASSWORD'];
    } else {
        // Fallback to environment variables (for cron jobs)
        $dbHost = getenv('DB_HOST') ?: 'localhost';
        $dbName = getenv('DB_NAME') ?: 'c2621673_ian';
        $dbUser = getenv('DB_USER') ?: 'c2621673_ian';
        $dbPass = getenv('DB_PASSWORD') ?: '';
        
        if (empty($dbPass)) {
            throw new Exception('Database password not configured');
        }
    }
    
    $dsn = "mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4";
    $pdo = new PDO($dsn, $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (Exception $e) {
    error_log("Email automation DB connection failed: " . $e->getMessage());
    die("Database connection error");
}

// Log function
function logAutomation($message, $data = []) {
    $logFile = __DIR__ . '/../logs/email-automation.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - Data: " . json_encode($data);
    }
    $logEntry .= "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// SMTP Email function (same as redflags-delivery.php)
function sendSMTPEmail($host, $port, $username, $password, $to, $subject, $body, &$errorMessage = null) {
    $errorMessage = null;
    $socket = @fsockopen("ssl://$host", $port, $errno, $errstr, 30);

    if (!$socket) {
        $errorMessage = "Failed to connect: $errstr ($errno)";
        return false;
    }

    stream_set_timeout($socket, 30);

    // SMTP handshake
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '220') {
        $errorMessage = 'SMTP server not ready: ' . trim($response);
        fclose($socket);
        return false;
    }

    $ehloHost = $_SERVER['HTTP_HOST'] ?? gethostname();
    fputs($socket, "EHLO $ehloHost\r\n");
    
    // Read multi-line response
    while (($line = fgets($socket, 512)) !== false) {
        if (substr($line, 3, 1) !== '-') break;
    }

    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    fgets($socket, 512);
    
    fputs($socket, base64_encode($username) . "\r\n");
    fgets($socket, 512);
    
    fputs($socket, base64_encode($password) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '235') {
        $errorMessage = 'Auth failed: ' . trim($response);
        fclose($socket);
        return false;
    }

    // MAIL FROM
    fputs($socket, "MAIL FROM: <$username>\r\n");
    fgets($socket, 512);

    // RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    fgets($socket, 512);

    // DATA
    fputs($socket, "DATA\r\n");
    fgets($socket, 512);

    // Email content
    $email = "From: Ian Saura <$username>\r\n";
    $email .= "To: <$to>\r\n";
    $email .= "Subject: $subject\r\n";
    $email .= "MIME-Version: 1.0\r\n";
    $email .= "Content-Type: text/html; charset=utf-8\r\n";
    $email .= "Date: " . date('r') . "\r\n";
    $email .= "\r\n";
    $email .= $body;
    $email .= "\r\n.\r\n";

    fputs($socket, $email);
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        $errorMessage = 'Send failed: ' . trim($response);
        fclose($socket);
        return false;
    }

    fputs($socket, "QUIT\r\n");
    fclose($socket);

    return true;
}

// Email templates
function getEmailTemplate($emailNumber, $firstName = '') {
    $templates = [
        2 => [ // Day 2
            'subject' => 'El error que hace imposible debuggear tus pipelines',
            'body' => "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .content { background: #ffffff; padding: 30px; }
        .code-block { background: #f3f4f6; padding: 15px; font-family: monospace; margin: 15px 0; border-left: 4px solid #ef4444; }
        .highlight { background: #f3f4f6; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
        .footer { text-align: left; padding: 20px 0; color: #666; font-size: 14px; border-top: 1px solid #e5e7eb; margin-top: 30px; }
        a { color: #2563eb; text-decoration: underline; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='content'>
            <p>Hola! Red Flag más común que veo: <strong>logging inexistente o mal hecho</strong>.</p>
            
            <p>Cuando algo falla en producción y no tenés logs estructurados, estás adivinando. Perdés horas (o días) buscando el problema.</p>
            
            <p>Un ejemplo que veo todo el tiempo:</p>
            
            <div class='code-block'>
❌ INCORRECTO:<br><br>
print(f\"Procesando {archivo}\")<br>
print(f\"Error: {e}\")<br>
            </div>
            
            <div class='code-block'>
✅ CORRECTO:<br><br>
import logging<br><br>
logging.info(\"process_started\", extra={<br>
&nbsp;&nbsp;&nbsp;&nbsp;\"file\": archivo,<br>
&nbsp;&nbsp;&nbsp;&nbsp;\"timestamp\": datetime.now(),<br>
&nbsp;&nbsp;&nbsp;&nbsp;\"expected_rows\": 1000<br>
})<br><br>
logging.error(\"process_failed\", extra={<br>
&nbsp;&nbsp;&nbsp;&nbsp;\"error\": str(e),<br>
&nbsp;&nbsp;&nbsp;&nbsp;\"file\": archivo<br>
})<br>
            </div>
            
            <p>La diferencia: cuando falla, sabés exactamente qué, dónde y cuándo. No adivinás. No perdés horas.</p>
            
            <p>Logs estructurados = poder filtrar, agregar métricas, y alertar. Es la base del debugging profesional.</p>
            
            <div class='highlight'>
                <p style='margin: 0;'>En el bootcamp dedicamos una sesión entera a logging, monitoring y observabilidad. Porque el código que no se puede debuggear, no es código profesional.</p>
            </div>
            
            <p>¿Vos cómo estás manejando logs ahora mismo?</p>
            
            <p>— Ian</p>
            
            <p style='font-size: 14px; color: #666;'>PD: En 3 días te cuento sobre el Red Flag #5 (validación de inputs) que le costó a un equipo 3 días de rollback.</p>
            
            <div class='footer'>
                <p style='margin: 0;'><strong>Ian Saura</strong><br>
                Data Engineering Mentor<br>
                <a href='https://iansaura.com'>iansaura.com</a></p>
            </div>
        </div>
    </div>
</body>
</html>"
        ],
        3 => [ // Day 5
            'subject' => 'Esta validación te puede ahorrar 3 días de rollback',
            'body' => "
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.8; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .content { background: #ffffff; padding: 30px; }
        .code-block { background: #f3f4f6; padding: 15px; font-family: monospace; margin: 15px 0; border-left: 4px solid #ef4444; }
        .highlight { background: #dbeafe; padding: 15px; border-left: 4px solid #2563eb; margin: 20px 0; }
        .footer { text-align: left; padding: 20px 0; color: #666; font-size: 14px; border-top: 1px solid #e5e7eb; margin-top: 30px; }
        a { color: #2563eb; text-decoration: underline; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='content'>
            <p>Hola! <strong>Historia real</strong> de un equipo que mentoré:</p>
            
            <p>Pipeline en prod. Todo funcionando. Un día, el vendor cambia el formato de 1 columna en el CSV que consumen.</p>
            
            <p>Pipeline explota. Data corrupta. 3 días arreglando + rollback.</p>
            
            <p>¿El problema? <strong>Zero validación de inputs</strong>.</p>
            
            <div class='code-block'>
❌ LO QUE HACÍAN:<br><br>
df = pd.read_csv(file)<br>
# Asumían que el CSV tenía las columnas correctas<br>
df['amount'].sum()  # 💥 KeyError cuando cambió el schema
            </div>
            
            <div class='code-block'>
✅ EL FIX:<br><br>
expected_columns = ['id', 'date', 'amount']<br>
df = pd.read_csv(file)<br><br>
if not all(col in df.columns for col in expected_columns):<br>
&nbsp;&nbsp;&nbsp;&nbsp;raise ValueError(f\"Missing columns: {set(expected_columns) - set(df.columns)}\")<br><br>
# Ahora sí, procesar<br>
df['amount'].sum()
            </div>
            
            <p>Validar inputs no es paranoia. Es la diferencia entre <strong>dormir tranquilo</strong> y que te llamen a las 2am porque la data está rota.</p>
            
            <p>Un cambio en el source no debería tumbar todo tu sistema. Tu código tiene que ser resiliente.</p>
            
            <p>¿Tu código valida antes de procesar?</p>
            
            <div class='highlight'>
                <p style='margin: 0;'><strong>El bootcamp DE Fundamentals arranca el 13 de enero a las 18hs.</strong><br><br>
                8 semanas para construir fundamentos sólidos y un data warehouse production-ready.<br><br>
                El lanzamiento oficial es el 30 de diciembre, pero si querés asegurar tu lugar antes, respondé este email.</p>
            </div>
            
            <p>— Ian</p>
            
            <div class='footer'>
                <p style='margin: 0;'><strong>Ian Saura</strong><br>
                Data Engineering Mentor<br>
                <a href='https://iansaura.com'>iansaura.com</a></p>
            </div>
        </div>
    </div>
</body>
</html>"
        ]
    ];

    return $templates[$emailNumber] ?? null;
}

// Main automation logic
try {
    logAutomation('=== Starting email automation cron job ===');
    
    // SMTP Configuration
    $smtpHost = 'c2621673.ferozo.com';
    $smtpPort = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $smtpUsername = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $smtpPassword = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    
    $emailsSent = 0;
    $emailsFailed = 0;
    
    // EMAIL 2: Day 2 (48 hours after subscription)
    logAutomation('Checking for Email 2 (Day 2) candidates...');
    
    $stmt = $pdo->prepare("
        SELECT s.id, s.email, s.subscribed_at
        FROM redflags_subscribers s
        WHERE s.status = 'active'
        AND s.subscribed_at <= DATE_SUB(NOW(), INTERVAL 48 HOUR)
        AND NOT EXISTS (
            SELECT 1 FROM email_sequence_log esl 
            WHERE esl.subscriber_id = s.id AND esl.email_number = 2
        )
        LIMIT 50
    ");
    $stmt->execute();
    $email2Candidates = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    logAutomation('Found ' . count($email2Candidates) . ' candidates for Email 2');
    
    foreach ($email2Candidates as $subscriber) {
        $template = getEmailTemplate(2);
        $smtpError = null;
        
        $sent = sendSMTPEmail(
            $smtpHost,
            $smtpPort,
            $smtpUsername,
            $smtpPassword,
            $subscriber['email'],
            $template['subject'],
            $template['body'],
            $smtpError
        );
        
        if ($sent) {
            // Log successful send
            $stmt = $pdo->prepare("
                INSERT INTO email_sequence_log (subscriber_id, email_number, status) 
                VALUES (?, 2, 'sent')
            ");
            $stmt->execute([$subscriber['id']]);
            $emailsSent++;
            
            logAutomation('Email 2 sent successfully', [
                'email' => $subscriber['email'],
                'subscriber_id' => $subscriber['id']
            ]);
        } else {
            // Log failed send
            $stmt = $pdo->prepare("
                INSERT INTO email_sequence_log (subscriber_id, email_number, status, error_message) 
                VALUES (?, 2, 'failed', ?)
            ");
            $stmt->execute([$subscriber['id'], $smtpError]);
            $emailsFailed++;
            
            logAutomation('Email 2 failed to send', [
                'email' => $subscriber['email'],
                'error' => $smtpError
            ]);
        }
        
        // Sleep to avoid hitting rate limits
        sleep(2);
    }
    
    // EMAIL 3: Day 5 (120 hours after subscription)
    logAutomation('Checking for Email 3 (Day 5) candidates...');
    
    $stmt = $pdo->prepare("
        SELECT s.id, s.email, s.subscribed_at
        FROM redflags_subscribers s
        WHERE s.status = 'active'
        AND s.subscribed_at <= DATE_SUB(NOW(), INTERVAL 120 HOUR)
        AND NOT EXISTS (
            SELECT 1 FROM email_sequence_log esl 
            WHERE esl.subscriber_id = s.id AND esl.email_number = 3
        )
        LIMIT 50
    ");
    $stmt->execute();
    $email3Candidates = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    logAutomation('Found ' . count($email3Candidates) . ' candidates for Email 3');
    
    foreach ($email3Candidates as $subscriber) {
        $template = getEmailTemplate(3);
        $smtpError = null;
        
        $sent = sendSMTPEmail(
            $smtpHost,
            $smtpPort,
            $smtpUsername,
            $smtpPassword,
            $subscriber['email'],
            $template['subject'],
            $template['body'],
            $smtpError
        );
        
        if ($sent) {
            // Log successful send
            $stmt = $pdo->prepare("
                INSERT INTO email_sequence_log (subscriber_id, email_number, status) 
                VALUES (?, 3, 'sent')
            ");
            $stmt->execute([$subscriber['id']]);
            $emailsSent++;
            
            logAutomation('Email 3 sent successfully', [
                'email' => $subscriber['email'],
                'subscriber_id' => $subscriber['id']
            ]);
        } else {
            // Log failed send
            $stmt = $pdo->prepare("
                INSERT INTO email_sequence_log (subscriber_id, email_number, status, error_message) 
                VALUES (?, 3, 'failed', ?)
            ");
            $stmt->execute([$subscriber['id'], $smtpError]);
            $emailsFailed++;
            
            logAutomation('Email 3 failed to send', [
                'email' => $subscriber['email'],
                'error' => $smtpError
            ]);
        }
        
        // Sleep to avoid hitting rate limits
        sleep(2);
    }
    
    logAutomation('=== Email automation completed ===', [
        'emails_sent' => $emailsSent,
        'emails_failed' => $emailsFailed,
        'total_processed' => $emailsSent + $emailsFailed
    ]);
    
} catch (Exception $e) {
    logAutomation('FATAL ERROR in automation cron', [
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}
?>

