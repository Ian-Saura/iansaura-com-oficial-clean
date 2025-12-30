<?php
/**
 * Send email to users whose trial expires tomorrow
 * Run: php send-trial-expiring-email.php
 * Or via web: /api/send-trial-expiring-email.php?key=iansaura_cron_2024_secret
 */

set_time_limit(300); // 5 minutes max
header('Content-Type: application/json');
require_once __DIR__ . '/secure-config.php';

// SMTP Email function
function sendTrialExpiringEmail($to, $subject, $body) {
    $host = 'c2621673.ferozo.com';
    $port = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $username = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $password = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    
    $socket = @fsockopen("ssl://$host", $port, $errno, $errstr, 30);
    
    if (!$socket) {
        return false;
    }
    
    // Read greeting
    $response = '';
    while (true) {
        $line = fgets($socket, 512);
        if ($line === false) break;
        $response .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }
    if (substr($response, 0, 3) !== '220') { fclose($socket); return false; }
    
    // EHLO
    fputs($socket, "EHLO iansaura.com\r\n");
    $response = '';
    while (true) {
        $line = fgets($socket, 512);
        if ($line === false) break;
        $response .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }
    if (substr($response, 0, 3) !== '250') { fclose($socket); return false; }
    
    // AUTH
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '334') { fclose($socket); return false; }
    
    fputs($socket, base64_encode($username) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '334') { fclose($socket); return false; }
    
    fputs($socket, base64_encode($password) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '235') { fclose($socket); return false; }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <$username>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') { fclose($socket); return false; }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') { fclose($socket); return false; }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '354') { fclose($socket); return false; }
    
    // Email content
    $headers = "From: Ian Saura <$username>\r\n";
    $headers .= "To: <$to>\r\n";
    $headers .= "Subject: $subject\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "\r\n";
    
    fputs($socket, $headers . $body . "\r\n.\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') { fclose($socket); return false; }
    
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    return true;
}

// Auth check
$validKey = 'iansaura_cron_2024_secret';
$providedKey = $_GET['key'] ?? '';

if ($providedKey !== $validKey) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

$testMode = isset($_GET['test']) && $_GET['test'] === '1';
$singleEmail = $_GET['email'] ?? null;

try {
    $db = getSecureDBConnection();
    
    // Get users with trial expiring in 1-2 days
    $stmt = $db->query("
        SELECT 
            u.email,
            COALESCE(u.full_name, u.first_name, 'Usuario') as name,
            s.subscription_end,
            DATEDIFF(s.subscription_end, NOW()) as days_left,
            COALESCE(up.xp, 0) as xp,
            COALESCE(up.current_streak, 0) as streak,
            COALESCE(JSON_LENGTH(up.completed_steps), 0) as steps_completed
        FROM users u
        JOIN subscribers s ON u.email = s.email
        LEFT JOIN user_progress up ON u.email = up.email
        WHERE s.status IN ('', 'trial')
        AND s.subscription_end IS NOT NULL
        AND s.subscription_end > NOW()
        AND DATEDIFF(s.subscription_end, NOW()) <= 2
        ORDER BY s.subscription_end ASC
    ");
    
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if ($singleEmail) {
        $users = array_filter($users, fn($u) => $u['email'] === $singleEmail);
    }
    
    $results = [
        'total_users' => count($users),
        'sent' => 0,
        'failed' => 0,
        'skipped' => 0,
        'details' => []
    ];
    
    foreach ($users as $user) {
        $email = $user['email'];
        $name = $user['name'];
        $daysLeft = $user['days_left'];
        $xp = $user['xp'];
        $streak = $user['streak'];
        $stepsCompleted = $user['steps_completed'];
        
        // Build personalized email
        $subject = "⏰ Tu acceso Premium termina " . ($daysLeft <= 1 ? "mañana" : "en $daysLeft días");
        
        $progressSection = "";
        if ($xp > 0 || $streak > 0 || $stepsCompleted > 0) {
            $progressSection = "
            <div style='background: #1e293b; border-radius: 12px; padding: 20px; margin: 20px 0;'>
                <p style='color: #94a3b8; margin: 0 0 15px 0; font-size: 14px;'>En estos días completaste:</p>
                <div style='display: flex; gap: 20px; flex-wrap: wrap;'>
                    " . ($stepsCompleted > 0 ? "<div style='text-align: center;'><div style='font-size: 28px; font-weight: bold; color: #10b981;'>$stepsCompleted</div><div style='color: #64748b; font-size: 12px;'>pasos</div></div>" : "") . "
                    " . ($xp > 0 ? "<div style='text-align: center;'><div style='font-size: 28px; font-weight: bold; color: #f59e0b;'>$xp</div><div style='color: #64748b; font-size: 12px;'>XP ganados</div></div>" : "") . "
                    " . ($streak > 0 ? "<div style='text-align: center;'><div style='font-size: 28px; font-weight: bold; color: #f97316;'>$streak 🔥</div><div style='color: #64748b; font-size: 12px;'>días de racha</div></div>" : "") . "
                </div>
            </div>";
        }
        
        $htmlBody = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        </head>
        <body style='margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 40px 20px;'>
                <!-- Header -->
                <div style='text-align: center; margin-bottom: 30px;'>
                    <h1 style='color: #10b981; font-size: 24px; margin: 0;'>Ian Saura</h1>
                    <p style='color: #64748b; margin: 5px 0 0 0;'>Academia de Data Engineering</p>
                </div>
                
                <!-- Main Content -->
                <div style='background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; padding: 30px; border: 1px solid #334155;'>
                    <h2 style='color: #ffffff; font-size: 22px; margin: 0 0 20px 0;'>
                        Hola $name 👋
                    </h2>
                    
                    <p style='color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;'>
                        Tu prueba gratuita de la <strong>Academia Premium</strong> termina " . ($daysLeft <= 1 ? "<span style='color: #ef4444; font-weight: bold;'>mañana</span>" : "en <strong>$daysLeft días</strong>") . ".
                    </p>
                    
                    $progressSection
                    
                    <p style='color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 20px 0;'>
                        ¿Querés seguir avanzando en tu carrera de Data Engineering?
                    </p>
                    
                    <!-- CTA Button -->
                    <div style='text-align: center; margin: 30px 0;'>
                        <a href='https://iansaura.com/suscripcion' style='display: inline-block; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: bold; font-size: 16px;'>
                            Suscribirme por \$30/mes
                        </a>
                    </div>
                    
                    <!-- What you lose -->
                    <div style='background: #0f172a; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #ef4444;'>
                        <p style='color: #ef4444; margin: 0 0 10px 0; font-weight: bold;'>Si no te suscribís, perderás acceso a:</p>
                        <ul style='color: #94a3b8; margin: 0; padding-left: 20px; line-height: 1.8;'>
                            <li>Niveles 2 y 3 del roadmap</li>
                            <li>Proyectos guiados con datos reales</li>
                            <li>Videos exclusivos de bootcamps</li>
                            <li>Tu racha de $streak días</li>
                        </ul>
                    </div>
                    
                    <!-- What you keep -->
                    <div style='background: #0f172a; border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid #10b981;'>
                        <p style='color: #10b981; margin: 0 0 10px 0; font-weight: bold;'>Pero conservarás:</p>
                        <ul style='color: #94a3b8; margin: 0; padding-left: 20px; line-height: 1.8;'>
                            <li>✅ Tu progreso guardado</li>
                            <li>✅ Nivel 0 gratis para siempre</li>
                            <li>✅ Acceso a la comunidad Discord</li>
                        </ul>
                    </div>
                    
                    <p style='color: #94a3b8; font-size: 14px; margin: 20px 0 0 0;'>
                        ¿Tenés dudas? Respondé este email y te ayudo.
                    </p>
                </div>
                
                <!-- Footer -->
                <div style='text-align: center; margin-top: 30px; color: #64748b; font-size: 12px;'>
                    <p>Ian Saura - Academia de Data Engineering</p>
                    <p>
                        <a href='https://iansaura.com' style='color: #10b981; text-decoration: none;'>iansaura.com</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
        ";
        
        if ($testMode) {
            $results['details'][] = [
                'email' => $email,
                'name' => $name,
                'days_left' => $daysLeft,
                'status' => 'test_mode_skipped'
            ];
            $results['skipped']++;
            continue;
        }
        
        // Send email
        $sent = sendTrialExpiringEmail($email, $subject, $htmlBody);
        
        if ($sent) {
            $results['sent']++;
            $results['details'][] = [
                'email' => $email,
                'name' => $name,
                'days_left' => $daysLeft,
                'status' => 'sent'
            ];
        } else {
            $results['failed']++;
            $results['details'][] = [
                'email' => $email,
                'name' => $name,
                'days_left' => $daysLeft,
                'status' => 'failed'
            ];
        }
        
        // Small delay to avoid rate limiting
        usleep(100000); // 100ms
    }
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
