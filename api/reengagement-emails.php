<?php
/**
 * Re-engagement Email System
 * Ian Saura Data Engineering Hub
 * 
 * Envía emails automáticos para:
 * 1. Usuarios inactivos (3, 7, 14, 30 días)
 * 2. Usuarios que no completaron onboarding
 * 3. Trials que están por vencer
 * 4. Usuarios con streak roto
 * 
 * Ejecutar con cron: 0 10 * * * php /path/to/reengagement-emails.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar que es llamada autorizada (cron o admin)
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true; // Cron job
} elseif (isset($_GET['admin_password']) && defined('ADMIN_PASSWORD') && $_GET['admin_password'] === ADMIN_PASSWORD) {
    $isAuthorized = true;
} elseif (isset($_GET['cron_key']) && $_GET['cron_key'] === 'iansaura_cron_2024_secret') {
    $isAuthorized = true;
}

if (!$isAuthorized) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Modo de prueba (no envía emails reales)
$testMode = isset($_GET['test']) && $_GET['test'] === '1';
$specificEmail = $_GET['email'] ?? null;

try {
    $pdo = getSecureDBConnection();
    
    // Crear tabla de log si no existe
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS email_sequence_log (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            email_type VARCHAR(100) NOT NULL,
            sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_email (email),
            INDEX idx_type (email_type),
            INDEX idx_sent (sent_at)
        )
    ");
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => [],
        'errors' => []
    ];
    
    // 1. Usuarios inactivos por 3 días (primer recordatorio suave)
    $inactive3Days = getInactiveUsers($pdo, 3, 4, $specificEmail);
    foreach ($inactive3Days as $user) {
        $sent = sendReengagementEmail($user, 'day3', $testMode);
        if ($sent) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmailSent($pdo, $user['email'], 'reengagement_day3');
        }
    }
    
    // 2. Usuarios inactivos por 7 días (mostrar progreso perdido)
    $inactive7Days = getInactiveUsers($pdo, 7, 8, $specificEmail);
    foreach ($inactive7Days as $user) {
        $sent = sendReengagementEmail($user, 'day7', $testMode);
        if ($sent) {
            $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
            logEmailSent($pdo, $user['email'], 'reengagement_day7');
        }
    }
    
    // 3. Usuarios inactivos por 14 días (oferta especial)
    $inactive14Days = getInactiveUsers($pdo, 14, 15, $specificEmail);
    foreach ($inactive14Days as $user) {
        $sent = sendReengagementEmail($user, 'day14', $testMode);
        if ($sent) {
            $results['emails_sent'][] = ['type' => 'day14', 'email' => $user['email']];
            logEmailSent($pdo, $user['email'], 'reengagement_day14');
        }
    }
    
    // 4. Trials que vencen en 2 días
    $expiringTrials = getExpiringTrials($pdo, 2, $specificEmail);
    foreach ($expiringTrials as $user) {
        $sent = sendReengagementEmail($user, 'trial_expiring', $testMode);
        if ($sent) {
            $results['emails_sent'][] = ['type' => 'trial_expiring', 'email' => $user['email']];
            logEmailSent($pdo, $user['email'], 'trial_expiring');
        }
    }
    
    // 5. Usuarios nuevos que no completaron primer paso (24h después de registro)
    $incompleteOnboarding = getIncompleteOnboarding($pdo, $specificEmail);
    foreach ($incompleteOnboarding as $user) {
        $sent = sendReengagementEmail($user, 'incomplete_onboarding', $testMode);
        if ($sent) {
            $results['emails_sent'][] = ['type' => 'incomplete_onboarding', 'email' => $user['email']];
            logEmailSent($pdo, $user['email'], 'incomplete_onboarding');
        }
    }
    
    // 6. Usuarios con streak perdido (tenían 3+ días y ahora 0)
    $lostStreak = getLostStreakUsers($pdo, $specificEmail);
    foreach ($lostStreak as $user) {
        $sent = sendReengagementEmail($user, 'lost_streak', $testMode);
        if ($sent) {
            $results['emails_sent'][] = ['type' => 'lost_streak', 'email' => $user['email']];
            logEmailSent($pdo, $user['email'], 'lost_streak');
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}

/**
 * Obtener usuarios inactivos por X días
 */
function getInactiveUsers($pdo, $minDays, $maxDays, $specificEmail = null) {
    try {
        // Get recently emailed users
        $recentlyEmailed = [];
        try {
            $stmt = $pdo->query("SELECT email FROM email_sequence_log WHERE email_type LIKE 'reengagement%' AND sent_at >= DATE_SUB(NOW(), INTERVAL 3 DAY)");
            $recentlyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist yet
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.last_login, u.login_count,
                   COALESCE(up.xp, 0) as xp,
                   COALESCE(up.current_streak, 0) as current_streak,
                   COALESCE(up.longest_streak, 0) as longest_streak
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE u.last_login BETWEEN DATE_SUB(NOW(), INTERVAL ? DAY) 
                                   AND DATE_SUB(NOW(), INTERVAL ? DAY)
        ";
        
        if ($specificEmail) {
            $sql .= " AND u.email = ?";
        }
        
        $stmt = $pdo->prepare($sql);
        $params = [$maxDays, $minDays];
        if ($specificEmail) {
            $params[] = $specificEmail;
        }
        $stmt->execute($params);
        
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out recently emailed
        return array_filter($users, function($u) use ($recentlyEmailed) {
            return !in_array($u['email'], $recentlyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

/**
 * Obtener trials que vencen pronto
 */
function getExpiringTrials($pdo, $daysUntilExpiry, $specificEmail = null) {
    try {
        $sql = "
            SELECT s.email, u.first_name, u.full_name, s.trial_ends_at,
                   DATEDIFF(s.trial_ends_at, NOW()) as days_left
            FROM subscribers s
            JOIN users u ON s.email = u.email
            WHERE s.trial_ends_at BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL ? DAY)
            AND s.payment_type != 'paid'
        ";
        
        if ($specificEmail) {
            $sql .= " AND s.email = ?";
        }
        
        $params = [$daysUntilExpiry];
        if ($specificEmail) {
            $params[] = $specificEmail;
        }
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        return [];
    }
}

/**
 * Usuarios que no completaron onboarding
 */
function getIncompleteOnboarding($pdo, $specificEmail = null) {
    try {
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE u.created_at BETWEEN DATE_SUB(NOW(), INTERVAL 48 HOUR) 
                                   AND DATE_SUB(NOW(), INTERVAL 24 HOUR)
            AND (up.xp IS NULL OR up.xp = 0)
        ";
        
        if ($specificEmail) {
            $sql .= " AND u.email = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$specificEmail]);
        } else {
            $stmt = $pdo->query($sql);
        }
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        return [];
    }
}

/**
 * Usuarios que perdieron su streak
 */
function getLostStreakUsers($pdo, $specificEmail = null) {
    try {
        $sql = "
            SELECT u.email, u.first_name, u.full_name,
                   up.longest_streak, up.current_streak
            FROM users u
            JOIN user_progress up ON u.email = up.email
            WHERE up.longest_streak >= 3
            AND up.current_streak = 0
        ";
        
        if ($specificEmail) {
            $sql .= " AND u.email = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$specificEmail]);
        } else {
            $stmt = $pdo->query($sql);
        }
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        return [];
    }
}

/**
 * Enviar email de re-engagement
 */
function sendReengagementEmail($user, $type, $testMode = false) {
    $template = getEmailTemplate($type, $user);
    
    if ($testMode) {
        return true; // Simular envío exitoso
    }
    
    $to = $user['email'];
    $subject = $template['subject'];
    $message = $template['html'];
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    return mail($to, $subject, $message, implode("\r\n", $headers));
}

/**
 * Templates de emails
 */
function getEmailTemplate($type, $user) {
    $firstName = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    $streak = $user['longest_streak'] ?? 0;
    
    $templates = [
        'day3' => [
            'subject' => "$firstName, te extrañamos en la Academia 🚀",
            'html' => getDay3Template($firstName, $xp)
        ],
        'day7' => [
            'subject' => "⚡ $firstName, tu progreso te está esperando",
            'html' => getDay7Template($firstName, $xp)
        ],
        'day14' => [
            'subject' => "🎁 $firstName, tenemos algo especial para vos",
            'html' => getDay14Template($firstName)
        ],
        'trial_expiring' => [
            'subject' => "⏰ $firstName, tu trial vence en " . ($user['days_left'] ?? 2) . " días",
            'html' => getTrialExpiringTemplate($firstName, $user['days_left'] ?? 2)
        ],
        'incomplete_onboarding' => [
            'subject' => "🎯 $firstName, completá tu primer desafío SQL (2 min)",
            'html' => getIncompleteOnboardingTemplate($firstName)
        ],
        'lost_streak' => [
            'subject' => "🔥 $firstName, ¡no pierdas tu racha de $streak días!",
            'html' => getLostStreakTemplate($firstName, $streak)
        ]
    ];
    
    return $templates[$type] ?? $templates['day3'];
}

function getDay3Template($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Hola $name! 👋</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Hace 3 días que no te vemos por la Academia. ¿Todo bien?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:14px;">
                    📊 Tu progreso actual: <strong>{$xp} XP</strong>
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Cada día que practicás, te acercás más a tu primer trabajo en Data Engineering.
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fff;">15 minutos al día</strong> es todo lo que necesitás para mantener el momentum. 
                Los que consiguen trabajo son los que no abandonan. 💪
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Continuar mi progreso →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o preguntá en Discord.
            </p>
        </div>
        
        <p style="color:#475569;font-size:12px;text-align:center;margin:20px 0 0;">
            Ian Saura - Data Engineering Academy<br>
            <a href="https://iansaura.com/unsubscribe" style="color:#475569;">Cancelar suscripción</a>
        </p>
    </div>
</body>
</html>
HTML;
}

function getDay7Template($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, una semana sin verte 😢</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Sé que la vida se pone ocupada. Pero dejame recordarte por qué empezaste:
            </p>
            
            <div style="background:#3b82f620;border:1px solid #3b82f650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#60a5fa;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu objetivo: Conseguir tu primer trabajo en Data Engineering
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ya tenés <strong style="color:#fff;">{$xp} XP</strong> acumulados. No dejes que ese esfuerzo se pierda.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#f59e0b;">Dato:</strong> Los usuarios que practican al menos 3 veces por semana 
                tienen 4x más probabilidades de conseguir trabajo en 6 meses.
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Volver a practicar →
            </a>
        </div>
        
        <p style="color:#475569;font-size:12px;text-align:center;margin:20px 0 0;">
            Ian Saura - Data Engineering Academy
        </p>
    </div>
</body>
</html>
HTML;
}

function getDay14Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿necesitás ayuda? 🤝</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Hace 2 semanas que no te vemos. Me preocupa que algo te haya trabado.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Si tenés alguna duda o te sentís perdido, <strong style="color:#fff;">respondé este email</strong> 
                y te ayudo personalmente.
            </p>
            
            <div style="background:#f59e0b20;border:1px solid #f59e0b50;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#fbbf24;margin:0;font-size:16px;font-weight:600;">
                    🎁 Oferta especial para vos
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Si volvés hoy, te regalo una sesión de 15 minutos conmigo para resolver tus dudas.
                    Solo respondé "QUIERO MI SESIÓN".
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Volver a la Academia →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                PD: No te rindas. El 90% de las personas abandonan antes de ver resultados. 
                Vos podés ser del 10% que lo logra.
            </p>
        </div>
        
        <p style="color:#475569;font-size:12px;text-align:center;margin:20px 0 0;">
            Ian Saura - Data Engineering Academy
        </p>
    </div>
</body>
</html>
HTML;
}

function getTrialExpiringTemplate($name, $daysLeft) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⏰ Tu trial vence en $daysLeft días
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, no pierdas tu acceso 🚨</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                En $daysLeft días tu período de prueba termina y perderás acceso a:
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de Data Engineering</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:18px;font-weight:600;">
                    💰 Solo $20 USD/mes
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Acceso ilimitado • Sin compromiso
                </p>
            </div>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;text-align:center;">
                ¿Tenés dudas? Respondé este email.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getIncompleteOnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¡tu primer desafío te espera! 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Te registraste pero todavía no completaste tu primer ejercicio. 
                <strong style="color:#fff;">Solo te toma 2 minutos.</strong>
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    🚀 Desafío: Tu primera consulta SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Calculá el total de ventas de una tabla. Es más fácil de lo que pensás.
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                Cuando lo completes, ganarás <strong style="color:#fbbf24;">+50 XP</strong> y 
                <strong style="color:#fbbf24;">+10 DataCoins</strong>. 
                Es tu primera victoria. 🏆
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi primer desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getLostStreakTemplate($name, $streak) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">🔥 $name, ¡tu racha de $streak días!</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Tenías una racha increíble de <strong style="color:#f97316;">$streak días consecutivos</strong>. 
                ¡No la pierdas!
            </p>
            
            <div style="background:#f9731620;border:1px solid #f9731650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#fb923c;margin:0;font-size:16px;font-weight:600;">
                    ⚡ Todavía podés recuperarla
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Completá cualquier actividad hoy y empezá una nueva racha. 
                    Tu récord de $streak días sigue guardado.
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fff;">Dato:</strong> Los usuarios con rachas de 7+ días 
                tienen 3x más probabilidades de conseguir trabajo.
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#f97316,#ef4444);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Recuperar mi racha →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

/**
 * Registrar email enviado
 */
function logEmailSent($pdo, $email, $type) {
    try {
        // Crear tabla si no existe
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_type (email_type),
                INDEX idx_sent (sent_at)
            )
        ");
        
        $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
        $stmt->execute([$email, $type]);
    } catch (Exception $e) {
        // Silent fail
    }
}

