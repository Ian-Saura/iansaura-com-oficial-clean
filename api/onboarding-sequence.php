<?php
/**
 * Onboarding Email Sequence
 * Ian Saura Data Engineering Hub
 * 
 * Secuencia de emails para nuevos usuarios:
 * - Día 0: Bienvenida + primer paso
 * - Día 1: Primer desafío SQL
 * - Día 3: Mostrar valor (proyectos)
 * - Día 5: Social proof (testimonios)
 * - Día 7: Oferta de suscripción
 * 
 * Ejecutar con cron: 0 9 * * * php /path/to/onboarding-sequence.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar autorización
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
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

$testMode = isset($_GET['test']) && $_GET['test'] === '1';

try {
    $pdo = getSecureDBConnection();
    
    // Verificar si la tabla tiene la estructura correcta
    try {
        $stmt = $pdo->query("DESCRIBE email_sequence_log");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('email', $columns)) {
            // Tabla existe pero sin columna email - recrear
            $pdo->exec("DROP TABLE IF EXISTS email_sequence_log");
            $pdo->exec("
                CREATE TABLE email_sequence_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    email_type VARCHAR(100) NOT NULL,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ");
        }
    } catch (Exception $e) {
        // Tabla no existe - crear
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => []
    ];
    
    // Día 0: Bienvenida (usuarios registrados hoy que no recibieron email)
    $day0Users = getUsersForSequence($pdo, 0, 'onboarding_welcome');
    foreach ($day0Users as $user) {
        if (sendOnboardingEmail($user, 'welcome', $testMode)) {
            $results['emails_sent'][] = ['type' => 'welcome', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_welcome');
        }
    }
    
    // Día 1: Primer desafío
    $day1Users = getUsersForSequence($pdo, 1, 'onboarding_day1');
    foreach ($day1Users as $user) {
        if (sendOnboardingEmail($user, 'day1', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day1', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day1');
        }
    }
    
    // Día 3: Mostrar proyectos
    $day3Users = getUsersForSequence($pdo, 3, 'onboarding_day3');
    foreach ($day3Users as $user) {
        if (sendOnboardingEmail($user, 'day3', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day3');
        }
    }
    
    // Día 5: Social proof
    $day5Users = getUsersForSequence($pdo, 5, 'onboarding_day5');
    foreach ($day5Users as $user) {
        if (sendOnboardingEmail($user, 'day5', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day5', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day5');
        }
    }
    
    // Día 7: Oferta final
    $day7Users = getUsersForSequence($pdo, 7, 'onboarding_day7');
    foreach ($day7Users as $user) {
        // Solo si no es suscriptor pagado
        if (!isSubscriber($pdo, $user['email'])) {
            if (sendOnboardingEmail($user, 'day7', $testMode)) {
                $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
                logEmail($pdo, $user['email'], 'onboarding_day7');
            }
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getUsersForSequence($pdo, $daysSinceRegistration, $emailType) {
    try {
        // Get already emailed users
        $alreadyEmailed = [];
        try {
            $stmt = $pdo->prepare("SELECT email FROM email_sequence_log WHERE email_type = ?");
            $stmt->execute([$emailType]);
            $alreadyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at,
                   COALESCE(up.xp, 0) as xp
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE DATE(u.created_at) = DATE_SUB(CURDATE(), INTERVAL ? DAY)
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$daysSinceRegistration]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out already emailed
        return array_filter($users, function($u) use ($alreadyEmailed) {
            return !in_array($u['email'], $alreadyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

function isSubscriber($pdo, $email) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subscribers WHERE email = ? AND payment_type = 'paid'");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}

function sendOnboardingEmail($user, $type, $testMode) {
    $template = getOnboardingTemplate($type, $user);
    
    if ($testMode) {
        return true;
    }
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com'
    ];
    
    return mail($user['email'], $template['subject'], $template['html'], implode("\r\n", $headers));
}

function getOnboardingTemplate($type, $user) {
    $name = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    
    $templates = [
        'welcome' => [
            'subject' => "🚀 Bienvenido a la Academia, $name!",
            'html' => getWelcomeTemplate($name)
        ],
        'day1' => [
            'subject' => "🎯 $name, tu primer desafío SQL te espera",
            'html' => getDay1Template($name)
        ],
        'day3' => [
            'subject' => "💼 $name, mirá estos proyectos para tu portfolio",
            'html' => getDay3OnboardingTemplate($name, $xp)
        ],
        'day5' => [
            'subject' => "⭐ $name, así les fue a otros como vos",
            'html' => getDay5Template($name)
        ],
        'day7' => [
            'subject' => "🎁 $name, última oportunidad: $20/mes",
            'html' => getDay7OnboardingTemplate($name)
        ]
    ];
    
    return $templates[$type] ?? $templates['welcome'];
}

function getWelcomeTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Bienvenido a la Academia, $name! 🎉</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Soy Ian, y estoy muy contento de que hayas decidido empezar tu camino en Data Engineering.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que tenés disponible ahora:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de 3 niveles</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu primer paso (2 minutos)
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Entrá a la plataforma y completá tu primer desafío SQL. 
                    Ganarás +50 XP y empezarás tu racha.
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o unite al Discord.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay1Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿listo para tu primer desafío? 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ayer te registraste. Hoy es el día perfecto para dar tu primer paso real.
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    💡 Desafío del día: Tu primera query SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Tenés una tabla de ventas. Tu misión: calcular el total de ingresos.<br>
                    <strong style="color:#fff;">Tiempo estimado: 2 minutos</strong>
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fbbf24;">Recompensa:</strong> +50 XP + 10 DataCoins 🪙
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay3OnboardingTemplate($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, mirá estos proyectos 💼</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Los reclutadores no quieren ver cursos. Quieren ver <strong style="color:#fff;">proyectos reales</strong>.
            </p>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0 0 10px;font-size:14px;font-weight:600;">🚀 NIVEL 1</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">ETL Simple con Python</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Procesá datos de e-commerce con Pandas</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#3b82f6;margin:0 0 10px;font-size:14px;font-weight:600;">🎯 NIVEL 2</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Data Warehouse con Snowflake</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Diseñá un DWH profesional</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#8b5cf6;margin:0 0 10px;font-size:14px;font-weight:600;">👑 NIVEL 3</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Pipeline con Airflow</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Orquestá pipelines como un Senior</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Ver todos los proyectos →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay5Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, así les fue a otros como vos ⭐</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                No tenés que confiar en mi palabra. Mirá lo que dicen otros:
            </p>
            
            <div style="background:#1e293b;border-left:4px solid #10b981;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Seguí el roadmap al pie de la letra. En 4 meses conseguí mi primer laburo como Data Engineer Jr. 
                    Los proyectos fueron clave en las entrevistas."
                </p>
                <p style="color:#10b981;margin:0;font-size:12px;font-weight:600;">— Martín, Argentina 🇦🇷</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #3b82f6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Venía de ser analista de datos. Con la Academia pasé a Data Engineer en 5 meses. 
                    El salto de sueldo fue de 40%."
                </p>
                <p style="color:#3b82f6;margin:0;font-size:12px;font-weight:600;">— Carolina, Chile 🇨🇱</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #8b5cf6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Lo mejor es la comunidad. Cada vez que tengo una duda, Ian o alguien del Discord me ayuda. 
                    No estás solo."
                </p>
                <p style="color:#8b5cf6;margin:0;font-size:12px;font-weight:600;">— Diego, México 🇲🇽</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar mi transformación →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay7OnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⚠️ Precio sube a \$30 el 7 de Diciembre
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, última oportunidad 🎁</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Llevas una semana con acceso gratuito. ¿Viste el valor que hay?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                <p style="color:#94a3b8;margin:0 0 5px;font-size:14px;">Precio de lanzamiento</p>
                <p style="color:#10b981;margin:0;font-size:36px;font-weight:700;">\$30 USD/mes</p>
                <p style="color:#64748b;margin:5px 0 0;font-size:12px;">Después del 7/12: \$30/mes</p>
            </div>
            
            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que obtenés:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Acceso completo al roadmap</li>
                <li>✅ 25+ proyectos para portfolio</li>
                <li>✅ Ejercicios SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
                <li>✅ Actualizaciones de por vida</li>
            </ul>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme a \$30/mes →
            </a>
            
            <p style="color:#64748b;font-size:12px;margin:20px 0 0;text-align:center;">
                ¿Preferís pagar 6 meses? <a href="https://onei.la/56P" style="color:#10b981;">Ahorrá 17% →</a>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function logEmail($pdo, $email, $type) {
    $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
    $stmt->execute([$email, $type]);
}


 * Onboarding Email Sequence
 * Ian Saura Data Engineering Hub
 * 
 * Secuencia de emails para nuevos usuarios:
 * - Día 0: Bienvenida + primer paso
 * - Día 1: Primer desafío SQL
 * - Día 3: Mostrar valor (proyectos)
 * - Día 5: Social proof (testimonios)
 * - Día 7: Oferta de suscripción
 * 
 * Ejecutar con cron: 0 9 * * * php /path/to/onboarding-sequence.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar autorización
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
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

$testMode = isset($_GET['test']) && $_GET['test'] === '1';

try {
    $pdo = getSecureDBConnection();
    
    // Verificar si la tabla tiene la estructura correcta
    try {
        $stmt = $pdo->query("DESCRIBE email_sequence_log");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('email', $columns)) {
            // Tabla existe pero sin columna email - recrear
            $pdo->exec("DROP TABLE IF EXISTS email_sequence_log");
            $pdo->exec("
                CREATE TABLE email_sequence_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    email_type VARCHAR(100) NOT NULL,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ");
        }
    } catch (Exception $e) {
        // Tabla no existe - crear
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => []
    ];
    
    // Día 0: Bienvenida (usuarios registrados hoy que no recibieron email)
    $day0Users = getUsersForSequence($pdo, 0, 'onboarding_welcome');
    foreach ($day0Users as $user) {
        if (sendOnboardingEmail($user, 'welcome', $testMode)) {
            $results['emails_sent'][] = ['type' => 'welcome', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_welcome');
        }
    }
    
    // Día 1: Primer desafío
    $day1Users = getUsersForSequence($pdo, 1, 'onboarding_day1');
    foreach ($day1Users as $user) {
        if (sendOnboardingEmail($user, 'day1', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day1', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day1');
        }
    }
    
    // Día 3: Mostrar proyectos
    $day3Users = getUsersForSequence($pdo, 3, 'onboarding_day3');
    foreach ($day3Users as $user) {
        if (sendOnboardingEmail($user, 'day3', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day3');
        }
    }
    
    // Día 5: Social proof
    $day5Users = getUsersForSequence($pdo, 5, 'onboarding_day5');
    foreach ($day5Users as $user) {
        if (sendOnboardingEmail($user, 'day5', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day5', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day5');
        }
    }
    
    // Día 7: Oferta final
    $day7Users = getUsersForSequence($pdo, 7, 'onboarding_day7');
    foreach ($day7Users as $user) {
        // Solo si no es suscriptor pagado
        if (!isSubscriber($pdo, $user['email'])) {
            if (sendOnboardingEmail($user, 'day7', $testMode)) {
                $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
                logEmail($pdo, $user['email'], 'onboarding_day7');
            }
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getUsersForSequence($pdo, $daysSinceRegistration, $emailType) {
    try {
        // Get already emailed users
        $alreadyEmailed = [];
        try {
            $stmt = $pdo->prepare("SELECT email FROM email_sequence_log WHERE email_type = ?");
            $stmt->execute([$emailType]);
            $alreadyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at,
                   COALESCE(up.xp, 0) as xp
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE DATE(u.created_at) = DATE_SUB(CURDATE(), INTERVAL ? DAY)
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$daysSinceRegistration]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out already emailed
        return array_filter($users, function($u) use ($alreadyEmailed) {
            return !in_array($u['email'], $alreadyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

function isSubscriber($pdo, $email) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subscribers WHERE email = ? AND payment_type = 'paid'");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}

function sendOnboardingEmail($user, $type, $testMode) {
    $template = getOnboardingTemplate($type, $user);
    
    if ($testMode) {
        return true;
    }
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com'
    ];
    
    return mail($user['email'], $template['subject'], $template['html'], implode("\r\n", $headers));
}

function getOnboardingTemplate($type, $user) {
    $name = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    
    $templates = [
        'welcome' => [
            'subject' => "🚀 Bienvenido a la Academia, $name!",
            'html' => getWelcomeTemplate($name)
        ],
        'day1' => [
            'subject' => "🎯 $name, tu primer desafío SQL te espera",
            'html' => getDay1Template($name)
        ],
        'day3' => [
            'subject' => "💼 $name, mirá estos proyectos para tu portfolio",
            'html' => getDay3OnboardingTemplate($name, $xp)
        ],
        'day5' => [
            'subject' => "⭐ $name, así les fue a otros como vos",
            'html' => getDay5Template($name)
        ],
        'day7' => [
            'subject' => "🎁 $name, última oportunidad: $20/mes",
            'html' => getDay7OnboardingTemplate($name)
        ]
    ];
    
    return $templates[$type] ?? $templates['welcome'];
}

function getWelcomeTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Bienvenido a la Academia, $name! 🎉</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Soy Ian, y estoy muy contento de que hayas decidido empezar tu camino en Data Engineering.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que tenés disponible ahora:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de 3 niveles</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu primer paso (2 minutos)
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Entrá a la plataforma y completá tu primer desafío SQL. 
                    Ganarás +50 XP y empezarás tu racha.
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o unite al Discord.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay1Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿listo para tu primer desafío? 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ayer te registraste. Hoy es el día perfecto para dar tu primer paso real.
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    💡 Desafío del día: Tu primera query SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Tenés una tabla de ventas. Tu misión: calcular el total de ingresos.<br>
                    <strong style="color:#fff;">Tiempo estimado: 2 minutos</strong>
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fbbf24;">Recompensa:</strong> +50 XP + 10 DataCoins 🪙
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay3OnboardingTemplate($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, mirá estos proyectos 💼</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Los reclutadores no quieren ver cursos. Quieren ver <strong style="color:#fff;">proyectos reales</strong>.
            </p>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0 0 10px;font-size:14px;font-weight:600;">🚀 NIVEL 1</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">ETL Simple con Python</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Procesá datos de e-commerce con Pandas</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#3b82f6;margin:0 0 10px;font-size:14px;font-weight:600;">🎯 NIVEL 2</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Data Warehouse con Snowflake</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Diseñá un DWH profesional</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#8b5cf6;margin:0 0 10px;font-size:14px;font-weight:600;">👑 NIVEL 3</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Pipeline con Airflow</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Orquestá pipelines como un Senior</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Ver todos los proyectos →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay5Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, así les fue a otros como vos ⭐</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                No tenés que confiar en mi palabra. Mirá lo que dicen otros:
            </p>
            
            <div style="background:#1e293b;border-left:4px solid #10b981;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Seguí el roadmap al pie de la letra. En 4 meses conseguí mi primer laburo como Data Engineer Jr. 
                    Los proyectos fueron clave en las entrevistas."
                </p>
                <p style="color:#10b981;margin:0;font-size:12px;font-weight:600;">— Martín, Argentina 🇦🇷</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #3b82f6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Venía de ser analista de datos. Con la Academia pasé a Data Engineer en 5 meses. 
                    El salto de sueldo fue de 40%."
                </p>
                <p style="color:#3b82f6;margin:0;font-size:12px;font-weight:600;">— Carolina, Chile 🇨🇱</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #8b5cf6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Lo mejor es la comunidad. Cada vez que tengo una duda, Ian o alguien del Discord me ayuda. 
                    No estás solo."
                </p>
                <p style="color:#8b5cf6;margin:0;font-size:12px;font-weight:600;">— Diego, México 🇲🇽</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar mi transformación →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay7OnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⚠️ Precio sube a \$30 el 7 de Diciembre
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, última oportunidad 🎁</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Llevas una semana con acceso gratuito. ¿Viste el valor que hay?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                <p style="color:#94a3b8;margin:0 0 5px;font-size:14px;">Precio de lanzamiento</p>
                <p style="color:#10b981;margin:0;font-size:36px;font-weight:700;">\$30 USD/mes</p>
                <p style="color:#64748b;margin:5px 0 0;font-size:12px;">Después del 7/12: \$30/mes</p>
            </div>
            
            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que obtenés:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Acceso completo al roadmap</li>
                <li>✅ 25+ proyectos para portfolio</li>
                <li>✅ Ejercicios SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
                <li>✅ Actualizaciones de por vida</li>
            </ul>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme a \$30/mes →
            </a>
            
            <p style="color:#64748b;font-size:12px;margin:20px 0 0;text-align:center;">
                ¿Preferís pagar 6 meses? <a href="https://onei.la/56P" style="color:#10b981;">Ahorrá 17% →</a>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function logEmail($pdo, $email, $type) {
    $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
    $stmt->execute([$email, $type]);
}

 * Onboarding Email Sequence
 * Ian Saura Data Engineering Hub
 * 
 * Secuencia de emails para nuevos usuarios:
 * - Día 0: Bienvenida + primer paso
 * - Día 1: Primer desafío SQL
 * - Día 3: Mostrar valor (proyectos)
 * - Día 5: Social proof (testimonios)
 * - Día 7: Oferta de suscripción
 * 
 * Ejecutar con cron: 0 9 * * * php /path/to/onboarding-sequence.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar autorización
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
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

$testMode = isset($_GET['test']) && $_GET['test'] === '1';

try {
    $pdo = getSecureDBConnection();
    
    // Verificar si la tabla tiene la estructura correcta
    try {
        $stmt = $pdo->query("DESCRIBE email_sequence_log");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('email', $columns)) {
            // Tabla existe pero sin columna email - recrear
            $pdo->exec("DROP TABLE IF EXISTS email_sequence_log");
            $pdo->exec("
                CREATE TABLE email_sequence_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    email_type VARCHAR(100) NOT NULL,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ");
        }
    } catch (Exception $e) {
        // Tabla no existe - crear
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => []
    ];
    
    // Día 0: Bienvenida (usuarios registrados hoy que no recibieron email)
    $day0Users = getUsersForSequence($pdo, 0, 'onboarding_welcome');
    foreach ($day0Users as $user) {
        if (sendOnboardingEmail($user, 'welcome', $testMode)) {
            $results['emails_sent'][] = ['type' => 'welcome', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_welcome');
        }
    }
    
    // Día 1: Primer desafío
    $day1Users = getUsersForSequence($pdo, 1, 'onboarding_day1');
    foreach ($day1Users as $user) {
        if (sendOnboardingEmail($user, 'day1', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day1', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day1');
        }
    }
    
    // Día 3: Mostrar proyectos
    $day3Users = getUsersForSequence($pdo, 3, 'onboarding_day3');
    foreach ($day3Users as $user) {
        if (sendOnboardingEmail($user, 'day3', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day3');
        }
    }
    
    // Día 5: Social proof
    $day5Users = getUsersForSequence($pdo, 5, 'onboarding_day5');
    foreach ($day5Users as $user) {
        if (sendOnboardingEmail($user, 'day5', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day5', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day5');
        }
    }
    
    // Día 7: Oferta final
    $day7Users = getUsersForSequence($pdo, 7, 'onboarding_day7');
    foreach ($day7Users as $user) {
        // Solo si no es suscriptor pagado
        if (!isSubscriber($pdo, $user['email'])) {
            if (sendOnboardingEmail($user, 'day7', $testMode)) {
                $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
                logEmail($pdo, $user['email'], 'onboarding_day7');
            }
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getUsersForSequence($pdo, $daysSinceRegistration, $emailType) {
    try {
        // Get already emailed users
        $alreadyEmailed = [];
        try {
            $stmt = $pdo->prepare("SELECT email FROM email_sequence_log WHERE email_type = ?");
            $stmt->execute([$emailType]);
            $alreadyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at,
                   COALESCE(up.xp, 0) as xp
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE DATE(u.created_at) = DATE_SUB(CURDATE(), INTERVAL ? DAY)
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$daysSinceRegistration]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out already emailed
        return array_filter($users, function($u) use ($alreadyEmailed) {
            return !in_array($u['email'], $alreadyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

function isSubscriber($pdo, $email) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subscribers WHERE email = ? AND payment_type = 'paid'");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}

function sendOnboardingEmail($user, $type, $testMode) {
    $template = getOnboardingTemplate($type, $user);
    
    if ($testMode) {
        return true;
    }
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com'
    ];
    
    return mail($user['email'], $template['subject'], $template['html'], implode("\r\n", $headers));
}

function getOnboardingTemplate($type, $user) {
    $name = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    
    $templates = [
        'welcome' => [
            'subject' => "🚀 Bienvenido a la Academia, $name!",
            'html' => getWelcomeTemplate($name)
        ],
        'day1' => [
            'subject' => "🎯 $name, tu primer desafío SQL te espera",
            'html' => getDay1Template($name)
        ],
        'day3' => [
            'subject' => "💼 $name, mirá estos proyectos para tu portfolio",
            'html' => getDay3OnboardingTemplate($name, $xp)
        ],
        'day5' => [
            'subject' => "⭐ $name, así les fue a otros como vos",
            'html' => getDay5Template($name)
        ],
        'day7' => [
            'subject' => "🎁 $name, última oportunidad: $20/mes",
            'html' => getDay7OnboardingTemplate($name)
        ]
    ];
    
    return $templates[$type] ?? $templates['welcome'];
}

function getWelcomeTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Bienvenido a la Academia, $name! 🎉</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Soy Ian, y estoy muy contento de que hayas decidido empezar tu camino en Data Engineering.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que tenés disponible ahora:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de 3 niveles</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu primer paso (2 minutos)
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Entrá a la plataforma y completá tu primer desafío SQL. 
                    Ganarás +50 XP y empezarás tu racha.
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o unite al Discord.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay1Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿listo para tu primer desafío? 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ayer te registraste. Hoy es el día perfecto para dar tu primer paso real.
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    💡 Desafío del día: Tu primera query SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Tenés una tabla de ventas. Tu misión: calcular el total de ingresos.<br>
                    <strong style="color:#fff;">Tiempo estimado: 2 minutos</strong>
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fbbf24;">Recompensa:</strong> +50 XP + 10 DataCoins 🪙
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay3OnboardingTemplate($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, mirá estos proyectos 💼</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Los reclutadores no quieren ver cursos. Quieren ver <strong style="color:#fff;">proyectos reales</strong>.
            </p>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0 0 10px;font-size:14px;font-weight:600;">🚀 NIVEL 1</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">ETL Simple con Python</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Procesá datos de e-commerce con Pandas</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#3b82f6;margin:0 0 10px;font-size:14px;font-weight:600;">🎯 NIVEL 2</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Data Warehouse con Snowflake</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Diseñá un DWH profesional</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#8b5cf6;margin:0 0 10px;font-size:14px;font-weight:600;">👑 NIVEL 3</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Pipeline con Airflow</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Orquestá pipelines como un Senior</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Ver todos los proyectos →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay5Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, así les fue a otros como vos ⭐</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                No tenés que confiar en mi palabra. Mirá lo que dicen otros:
            </p>
            
            <div style="background:#1e293b;border-left:4px solid #10b981;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Seguí el roadmap al pie de la letra. En 4 meses conseguí mi primer laburo como Data Engineer Jr. 
                    Los proyectos fueron clave en las entrevistas."
                </p>
                <p style="color:#10b981;margin:0;font-size:12px;font-weight:600;">— Martín, Argentina 🇦🇷</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #3b82f6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Venía de ser analista de datos. Con la Academia pasé a Data Engineer en 5 meses. 
                    El salto de sueldo fue de 40%."
                </p>
                <p style="color:#3b82f6;margin:0;font-size:12px;font-weight:600;">— Carolina, Chile 🇨🇱</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #8b5cf6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Lo mejor es la comunidad. Cada vez que tengo una duda, Ian o alguien del Discord me ayuda. 
                    No estás solo."
                </p>
                <p style="color:#8b5cf6;margin:0;font-size:12px;font-weight:600;">— Diego, México 🇲🇽</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar mi transformación →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay7OnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⚠️ Precio sube a \$30 el 7 de Diciembre
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, última oportunidad 🎁</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Llevas una semana con acceso gratuito. ¿Viste el valor que hay?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                <p style="color:#94a3b8;margin:0 0 5px;font-size:14px;">Precio de lanzamiento</p>
                <p style="color:#10b981;margin:0;font-size:36px;font-weight:700;">\$30 USD/mes</p>
                <p style="color:#64748b;margin:5px 0 0;font-size:12px;">Después del 7/12: \$30/mes</p>
            </div>
            
            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que obtenés:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Acceso completo al roadmap</li>
                <li>✅ 25+ proyectos para portfolio</li>
                <li>✅ Ejercicios SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
                <li>✅ Actualizaciones de por vida</li>
            </ul>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme a \$30/mes →
            </a>
            
            <p style="color:#64748b;font-size:12px;margin:20px 0 0;text-align:center;">
                ¿Preferís pagar 6 meses? <a href="https://onei.la/56P" style="color:#10b981;">Ahorrá 17% →</a>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function logEmail($pdo, $email, $type) {
    $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
    $stmt->execute([$email, $type]);
}


 * Onboarding Email Sequence
 * Ian Saura Data Engineering Hub
 * 
 * Secuencia de emails para nuevos usuarios:
 * - Día 0: Bienvenida + primer paso
 * - Día 1: Primer desafío SQL
 * - Día 3: Mostrar valor (proyectos)
 * - Día 5: Social proof (testimonios)
 * - Día 7: Oferta de suscripción
 * 
 * Ejecutar con cron: 0 9 * * * php /path/to/onboarding-sequence.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar autorización
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
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

$testMode = isset($_GET['test']) && $_GET['test'] === '1';

try {
    $pdo = getSecureDBConnection();
    
    // Verificar si la tabla tiene la estructura correcta
    try {
        $stmt = $pdo->query("DESCRIBE email_sequence_log");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('email', $columns)) {
            // Tabla existe pero sin columna email - recrear
            $pdo->exec("DROP TABLE IF EXISTS email_sequence_log");
            $pdo->exec("
                CREATE TABLE email_sequence_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    email_type VARCHAR(100) NOT NULL,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ");
        }
    } catch (Exception $e) {
        // Tabla no existe - crear
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => []
    ];
    
    // Día 0: Bienvenida (usuarios registrados hoy que no recibieron email)
    $day0Users = getUsersForSequence($pdo, 0, 'onboarding_welcome');
    foreach ($day0Users as $user) {
        if (sendOnboardingEmail($user, 'welcome', $testMode)) {
            $results['emails_sent'][] = ['type' => 'welcome', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_welcome');
        }
    }
    
    // Día 1: Primer desafío
    $day1Users = getUsersForSequence($pdo, 1, 'onboarding_day1');
    foreach ($day1Users as $user) {
        if (sendOnboardingEmail($user, 'day1', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day1', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day1');
        }
    }
    
    // Día 3: Mostrar proyectos
    $day3Users = getUsersForSequence($pdo, 3, 'onboarding_day3');
    foreach ($day3Users as $user) {
        if (sendOnboardingEmail($user, 'day3', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day3');
        }
    }
    
    // Día 5: Social proof
    $day5Users = getUsersForSequence($pdo, 5, 'onboarding_day5');
    foreach ($day5Users as $user) {
        if (sendOnboardingEmail($user, 'day5', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day5', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day5');
        }
    }
    
    // Día 7: Oferta final
    $day7Users = getUsersForSequence($pdo, 7, 'onboarding_day7');
    foreach ($day7Users as $user) {
        // Solo si no es suscriptor pagado
        if (!isSubscriber($pdo, $user['email'])) {
            if (sendOnboardingEmail($user, 'day7', $testMode)) {
                $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
                logEmail($pdo, $user['email'], 'onboarding_day7');
            }
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getUsersForSequence($pdo, $daysSinceRegistration, $emailType) {
    try {
        // Get already emailed users
        $alreadyEmailed = [];
        try {
            $stmt = $pdo->prepare("SELECT email FROM email_sequence_log WHERE email_type = ?");
            $stmt->execute([$emailType]);
            $alreadyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at,
                   COALESCE(up.xp, 0) as xp
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE DATE(u.created_at) = DATE_SUB(CURDATE(), INTERVAL ? DAY)
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$daysSinceRegistration]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out already emailed
        return array_filter($users, function($u) use ($alreadyEmailed) {
            return !in_array($u['email'], $alreadyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

function isSubscriber($pdo, $email) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subscribers WHERE email = ? AND payment_type = 'paid'");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}

function sendOnboardingEmail($user, $type, $testMode) {
    $template = getOnboardingTemplate($type, $user);
    
    if ($testMode) {
        return true;
    }
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com'
    ];
    
    return mail($user['email'], $template['subject'], $template['html'], implode("\r\n", $headers));
}

function getOnboardingTemplate($type, $user) {
    $name = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    
    $templates = [
        'welcome' => [
            'subject' => "🚀 Bienvenido a la Academia, $name!",
            'html' => getWelcomeTemplate($name)
        ],
        'day1' => [
            'subject' => "🎯 $name, tu primer desafío SQL te espera",
            'html' => getDay1Template($name)
        ],
        'day3' => [
            'subject' => "💼 $name, mirá estos proyectos para tu portfolio",
            'html' => getDay3OnboardingTemplate($name, $xp)
        ],
        'day5' => [
            'subject' => "⭐ $name, así les fue a otros como vos",
            'html' => getDay5Template($name)
        ],
        'day7' => [
            'subject' => "🎁 $name, última oportunidad: $20/mes",
            'html' => getDay7OnboardingTemplate($name)
        ]
    ];
    
    return $templates[$type] ?? $templates['welcome'];
}

function getWelcomeTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Bienvenido a la Academia, $name! 🎉</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Soy Ian, y estoy muy contento de que hayas decidido empezar tu camino en Data Engineering.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que tenés disponible ahora:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de 3 niveles</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu primer paso (2 minutos)
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Entrá a la plataforma y completá tu primer desafío SQL. 
                    Ganarás +50 XP y empezarás tu racha.
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o unite al Discord.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay1Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿listo para tu primer desafío? 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ayer te registraste. Hoy es el día perfecto para dar tu primer paso real.
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    💡 Desafío del día: Tu primera query SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Tenés una tabla de ventas. Tu misión: calcular el total de ingresos.<br>
                    <strong style="color:#fff;">Tiempo estimado: 2 minutos</strong>
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fbbf24;">Recompensa:</strong> +50 XP + 10 DataCoins 🪙
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay3OnboardingTemplate($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, mirá estos proyectos 💼</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Los reclutadores no quieren ver cursos. Quieren ver <strong style="color:#fff;">proyectos reales</strong>.
            </p>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0 0 10px;font-size:14px;font-weight:600;">🚀 NIVEL 1</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">ETL Simple con Python</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Procesá datos de e-commerce con Pandas</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#3b82f6;margin:0 0 10px;font-size:14px;font-weight:600;">🎯 NIVEL 2</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Data Warehouse con Snowflake</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Diseñá un DWH profesional</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#8b5cf6;margin:0 0 10px;font-size:14px;font-weight:600;">👑 NIVEL 3</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Pipeline con Airflow</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Orquestá pipelines como un Senior</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Ver todos los proyectos →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay5Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, así les fue a otros como vos ⭐</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                No tenés que confiar en mi palabra. Mirá lo que dicen otros:
            </p>
            
            <div style="background:#1e293b;border-left:4px solid #10b981;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Seguí el roadmap al pie de la letra. En 4 meses conseguí mi primer laburo como Data Engineer Jr. 
                    Los proyectos fueron clave en las entrevistas."
                </p>
                <p style="color:#10b981;margin:0;font-size:12px;font-weight:600;">— Martín, Argentina 🇦🇷</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #3b82f6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Venía de ser analista de datos. Con la Academia pasé a Data Engineer en 5 meses. 
                    El salto de sueldo fue de 40%."
                </p>
                <p style="color:#3b82f6;margin:0;font-size:12px;font-weight:600;">— Carolina, Chile 🇨🇱</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #8b5cf6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Lo mejor es la comunidad. Cada vez que tengo una duda, Ian o alguien del Discord me ayuda. 
                    No estás solo."
                </p>
                <p style="color:#8b5cf6;margin:0;font-size:12px;font-weight:600;">— Diego, México 🇲🇽</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar mi transformación →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay7OnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⚠️ Precio sube a \$30 el 7 de Diciembre
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, última oportunidad 🎁</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Llevas una semana con acceso gratuito. ¿Viste el valor que hay?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                <p style="color:#94a3b8;margin:0 0 5px;font-size:14px;">Precio de lanzamiento</p>
                <p style="color:#10b981;margin:0;font-size:36px;font-weight:700;">\$30 USD/mes</p>
                <p style="color:#64748b;margin:5px 0 0;font-size:12px;">Después del 7/12: \$30/mes</p>
            </div>
            
            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que obtenés:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Acceso completo al roadmap</li>
                <li>✅ 25+ proyectos para portfolio</li>
                <li>✅ Ejercicios SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
                <li>✅ Actualizaciones de por vida</li>
            </ul>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme a \$30/mes →
            </a>
            
            <p style="color:#64748b;font-size:12px;margin:20px 0 0;text-align:center;">
                ¿Preferís pagar 6 meses? <a href="https://onei.la/56P" style="color:#10b981;">Ahorrá 17% →</a>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function logEmail($pdo, $email, $type) {
    $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
    $stmt->execute([$email, $type]);
}

 * Onboarding Email Sequence
 * Ian Saura Data Engineering Hub
 * 
 * Secuencia de emails para nuevos usuarios:
 * - Día 0: Bienvenida + primer paso
 * - Día 1: Primer desafío SQL
 * - Día 3: Mostrar valor (proyectos)
 * - Día 5: Social proof (testimonios)
 * - Día 7: Oferta de suscripción
 * 
 * Ejecutar con cron: 0 9 * * * php /path/to/onboarding-sequence.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar autorización
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
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

$testMode = isset($_GET['test']) && $_GET['test'] === '1';

try {
    $pdo = getSecureDBConnection();
    
    // Verificar si la tabla tiene la estructura correcta
    try {
        $stmt = $pdo->query("DESCRIBE email_sequence_log");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('email', $columns)) {
            // Tabla existe pero sin columna email - recrear
            $pdo->exec("DROP TABLE IF EXISTS email_sequence_log");
            $pdo->exec("
                CREATE TABLE email_sequence_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    email_type VARCHAR(100) NOT NULL,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ");
        }
    } catch (Exception $e) {
        // Tabla no existe - crear
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => []
    ];
    
    // Día 0: Bienvenida (usuarios registrados hoy que no recibieron email)
    $day0Users = getUsersForSequence($pdo, 0, 'onboarding_welcome');
    foreach ($day0Users as $user) {
        if (sendOnboardingEmail($user, 'welcome', $testMode)) {
            $results['emails_sent'][] = ['type' => 'welcome', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_welcome');
        }
    }
    
    // Día 1: Primer desafío
    $day1Users = getUsersForSequence($pdo, 1, 'onboarding_day1');
    foreach ($day1Users as $user) {
        if (sendOnboardingEmail($user, 'day1', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day1', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day1');
        }
    }
    
    // Día 3: Mostrar proyectos
    $day3Users = getUsersForSequence($pdo, 3, 'onboarding_day3');
    foreach ($day3Users as $user) {
        if (sendOnboardingEmail($user, 'day3', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day3');
        }
    }
    
    // Día 5: Social proof
    $day5Users = getUsersForSequence($pdo, 5, 'onboarding_day5');
    foreach ($day5Users as $user) {
        if (sendOnboardingEmail($user, 'day5', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day5', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day5');
        }
    }
    
    // Día 7: Oferta final
    $day7Users = getUsersForSequence($pdo, 7, 'onboarding_day7');
    foreach ($day7Users as $user) {
        // Solo si no es suscriptor pagado
        if (!isSubscriber($pdo, $user['email'])) {
            if (sendOnboardingEmail($user, 'day7', $testMode)) {
                $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
                logEmail($pdo, $user['email'], 'onboarding_day7');
            }
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getUsersForSequence($pdo, $daysSinceRegistration, $emailType) {
    try {
        // Get already emailed users
        $alreadyEmailed = [];
        try {
            $stmt = $pdo->prepare("SELECT email FROM email_sequence_log WHERE email_type = ?");
            $stmt->execute([$emailType]);
            $alreadyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at,
                   COALESCE(up.xp, 0) as xp
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE DATE(u.created_at) = DATE_SUB(CURDATE(), INTERVAL ? DAY)
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$daysSinceRegistration]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out already emailed
        return array_filter($users, function($u) use ($alreadyEmailed) {
            return !in_array($u['email'], $alreadyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

function isSubscriber($pdo, $email) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subscribers WHERE email = ? AND payment_type = 'paid'");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}

function sendOnboardingEmail($user, $type, $testMode) {
    $template = getOnboardingTemplate($type, $user);
    
    if ($testMode) {
        return true;
    }
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com'
    ];
    
    return mail($user['email'], $template['subject'], $template['html'], implode("\r\n", $headers));
}

function getOnboardingTemplate($type, $user) {
    $name = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    
    $templates = [
        'welcome' => [
            'subject' => "🚀 Bienvenido a la Academia, $name!",
            'html' => getWelcomeTemplate($name)
        ],
        'day1' => [
            'subject' => "🎯 $name, tu primer desafío SQL te espera",
            'html' => getDay1Template($name)
        ],
        'day3' => [
            'subject' => "💼 $name, mirá estos proyectos para tu portfolio",
            'html' => getDay3OnboardingTemplate($name, $xp)
        ],
        'day5' => [
            'subject' => "⭐ $name, así les fue a otros como vos",
            'html' => getDay5Template($name)
        ],
        'day7' => [
            'subject' => "🎁 $name, última oportunidad: $20/mes",
            'html' => getDay7OnboardingTemplate($name)
        ]
    ];
    
    return $templates[$type] ?? $templates['welcome'];
}

function getWelcomeTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Bienvenido a la Academia, $name! 🎉</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Soy Ian, y estoy muy contento de que hayas decidido empezar tu camino en Data Engineering.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que tenés disponible ahora:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de 3 niveles</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu primer paso (2 minutos)
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Entrá a la plataforma y completá tu primer desafío SQL. 
                    Ganarás +50 XP y empezarás tu racha.
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o unite al Discord.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay1Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿listo para tu primer desafío? 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ayer te registraste. Hoy es el día perfecto para dar tu primer paso real.
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    💡 Desafío del día: Tu primera query SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Tenés una tabla de ventas. Tu misión: calcular el total de ingresos.<br>
                    <strong style="color:#fff;">Tiempo estimado: 2 minutos</strong>
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fbbf24;">Recompensa:</strong> +50 XP + 10 DataCoins 🪙
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay3OnboardingTemplate($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, mirá estos proyectos 💼</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Los reclutadores no quieren ver cursos. Quieren ver <strong style="color:#fff;">proyectos reales</strong>.
            </p>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0 0 10px;font-size:14px;font-weight:600;">🚀 NIVEL 1</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">ETL Simple con Python</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Procesá datos de e-commerce con Pandas</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#3b82f6;margin:0 0 10px;font-size:14px;font-weight:600;">🎯 NIVEL 2</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Data Warehouse con Snowflake</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Diseñá un DWH profesional</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#8b5cf6;margin:0 0 10px;font-size:14px;font-weight:600;">👑 NIVEL 3</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Pipeline con Airflow</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Orquestá pipelines como un Senior</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Ver todos los proyectos →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay5Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, así les fue a otros como vos ⭐</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                No tenés que confiar en mi palabra. Mirá lo que dicen otros:
            </p>
            
            <div style="background:#1e293b;border-left:4px solid #10b981;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Seguí el roadmap al pie de la letra. En 4 meses conseguí mi primer laburo como Data Engineer Jr. 
                    Los proyectos fueron clave en las entrevistas."
                </p>
                <p style="color:#10b981;margin:0;font-size:12px;font-weight:600;">— Martín, Argentina 🇦🇷</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #3b82f6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Venía de ser analista de datos. Con la Academia pasé a Data Engineer en 5 meses. 
                    El salto de sueldo fue de 40%."
                </p>
                <p style="color:#3b82f6;margin:0;font-size:12px;font-weight:600;">— Carolina, Chile 🇨🇱</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #8b5cf6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Lo mejor es la comunidad. Cada vez que tengo una duda, Ian o alguien del Discord me ayuda. 
                    No estás solo."
                </p>
                <p style="color:#8b5cf6;margin:0;font-size:12px;font-weight:600;">— Diego, México 🇲🇽</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar mi transformación →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay7OnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⚠️ Precio sube a \$30 el 7 de Diciembre
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, última oportunidad 🎁</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Llevas una semana con acceso gratuito. ¿Viste el valor que hay?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                <p style="color:#94a3b8;margin:0 0 5px;font-size:14px;">Precio de lanzamiento</p>
                <p style="color:#10b981;margin:0;font-size:36px;font-weight:700;">\$30 USD/mes</p>
                <p style="color:#64748b;margin:5px 0 0;font-size:12px;">Después del 7/12: \$30/mes</p>
            </div>
            
            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que obtenés:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Acceso completo al roadmap</li>
                <li>✅ 25+ proyectos para portfolio</li>
                <li>✅ Ejercicios SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
                <li>✅ Actualizaciones de por vida</li>
            </ul>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme a \$30/mes →
            </a>
            
            <p style="color:#64748b;font-size:12px;margin:20px 0 0;text-align:center;">
                ¿Preferís pagar 6 meses? <a href="https://onei.la/56P" style="color:#10b981;">Ahorrá 17% →</a>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function logEmail($pdo, $email, $type) {
    $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
    $stmt->execute([$email, $type]);
}


 * Onboarding Email Sequence
 * Ian Saura Data Engineering Hub
 * 
 * Secuencia de emails para nuevos usuarios:
 * - Día 0: Bienvenida + primer paso
 * - Día 1: Primer desafío SQL
 * - Día 3: Mostrar valor (proyectos)
 * - Día 5: Social proof (testimonios)
 * - Día 7: Oferta de suscripción
 * 
 * Ejecutar con cron: 0 9 * * * php /path/to/onboarding-sequence.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar autorización
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
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

$testMode = isset($_GET['test']) && $_GET['test'] === '1';

try {
    $pdo = getSecureDBConnection();
    
    // Verificar si la tabla tiene la estructura correcta
    try {
        $stmt = $pdo->query("DESCRIBE email_sequence_log");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('email', $columns)) {
            // Tabla existe pero sin columna email - recrear
            $pdo->exec("DROP TABLE IF EXISTS email_sequence_log");
            $pdo->exec("
                CREATE TABLE email_sequence_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    email_type VARCHAR(100) NOT NULL,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ");
        }
    } catch (Exception $e) {
        // Tabla no existe - crear
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => []
    ];
    
    // Día 0: Bienvenida (usuarios registrados hoy que no recibieron email)
    $day0Users = getUsersForSequence($pdo, 0, 'onboarding_welcome');
    foreach ($day0Users as $user) {
        if (sendOnboardingEmail($user, 'welcome', $testMode)) {
            $results['emails_sent'][] = ['type' => 'welcome', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_welcome');
        }
    }
    
    // Día 1: Primer desafío
    $day1Users = getUsersForSequence($pdo, 1, 'onboarding_day1');
    foreach ($day1Users as $user) {
        if (sendOnboardingEmail($user, 'day1', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day1', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day1');
        }
    }
    
    // Día 3: Mostrar proyectos
    $day3Users = getUsersForSequence($pdo, 3, 'onboarding_day3');
    foreach ($day3Users as $user) {
        if (sendOnboardingEmail($user, 'day3', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day3');
        }
    }
    
    // Día 5: Social proof
    $day5Users = getUsersForSequence($pdo, 5, 'onboarding_day5');
    foreach ($day5Users as $user) {
        if (sendOnboardingEmail($user, 'day5', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day5', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day5');
        }
    }
    
    // Día 7: Oferta final
    $day7Users = getUsersForSequence($pdo, 7, 'onboarding_day7');
    foreach ($day7Users as $user) {
        // Solo si no es suscriptor pagado
        if (!isSubscriber($pdo, $user['email'])) {
            if (sendOnboardingEmail($user, 'day7', $testMode)) {
                $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
                logEmail($pdo, $user['email'], 'onboarding_day7');
            }
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getUsersForSequence($pdo, $daysSinceRegistration, $emailType) {
    try {
        // Get already emailed users
        $alreadyEmailed = [];
        try {
            $stmt = $pdo->prepare("SELECT email FROM email_sequence_log WHERE email_type = ?");
            $stmt->execute([$emailType]);
            $alreadyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at,
                   COALESCE(up.xp, 0) as xp
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE DATE(u.created_at) = DATE_SUB(CURDATE(), INTERVAL ? DAY)
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$daysSinceRegistration]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out already emailed
        return array_filter($users, function($u) use ($alreadyEmailed) {
            return !in_array($u['email'], $alreadyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

function isSubscriber($pdo, $email) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subscribers WHERE email = ? AND payment_type = 'paid'");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}

function sendOnboardingEmail($user, $type, $testMode) {
    $template = getOnboardingTemplate($type, $user);
    
    if ($testMode) {
        return true;
    }
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com'
    ];
    
    return mail($user['email'], $template['subject'], $template['html'], implode("\r\n", $headers));
}

function getOnboardingTemplate($type, $user) {
    $name = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    
    $templates = [
        'welcome' => [
            'subject' => "🚀 Bienvenido a la Academia, $name!",
            'html' => getWelcomeTemplate($name)
        ],
        'day1' => [
            'subject' => "🎯 $name, tu primer desafío SQL te espera",
            'html' => getDay1Template($name)
        ],
        'day3' => [
            'subject' => "💼 $name, mirá estos proyectos para tu portfolio",
            'html' => getDay3OnboardingTemplate($name, $xp)
        ],
        'day5' => [
            'subject' => "⭐ $name, así les fue a otros como vos",
            'html' => getDay5Template($name)
        ],
        'day7' => [
            'subject' => "🎁 $name, última oportunidad: $20/mes",
            'html' => getDay7OnboardingTemplate($name)
        ]
    ];
    
    return $templates[$type] ?? $templates['welcome'];
}

function getWelcomeTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Bienvenido a la Academia, $name! 🎉</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Soy Ian, y estoy muy contento de que hayas decidido empezar tu camino en Data Engineering.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que tenés disponible ahora:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de 3 niveles</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu primer paso (2 minutos)
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Entrá a la plataforma y completá tu primer desafío SQL. 
                    Ganarás +50 XP y empezarás tu racha.
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o unite al Discord.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay1Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿listo para tu primer desafío? 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ayer te registraste. Hoy es el día perfecto para dar tu primer paso real.
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    💡 Desafío del día: Tu primera query SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Tenés una tabla de ventas. Tu misión: calcular el total de ingresos.<br>
                    <strong style="color:#fff;">Tiempo estimado: 2 minutos</strong>
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fbbf24;">Recompensa:</strong> +50 XP + 10 DataCoins 🪙
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay3OnboardingTemplate($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, mirá estos proyectos 💼</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Los reclutadores no quieren ver cursos. Quieren ver <strong style="color:#fff;">proyectos reales</strong>.
            </p>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0 0 10px;font-size:14px;font-weight:600;">🚀 NIVEL 1</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">ETL Simple con Python</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Procesá datos de e-commerce con Pandas</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#3b82f6;margin:0 0 10px;font-size:14px;font-weight:600;">🎯 NIVEL 2</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Data Warehouse con Snowflake</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Diseñá un DWH profesional</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#8b5cf6;margin:0 0 10px;font-size:14px;font-weight:600;">👑 NIVEL 3</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Pipeline con Airflow</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Orquestá pipelines como un Senior</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Ver todos los proyectos →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay5Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, así les fue a otros como vos ⭐</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                No tenés que confiar en mi palabra. Mirá lo que dicen otros:
            </p>
            
            <div style="background:#1e293b;border-left:4px solid #10b981;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Seguí el roadmap al pie de la letra. En 4 meses conseguí mi primer laburo como Data Engineer Jr. 
                    Los proyectos fueron clave en las entrevistas."
                </p>
                <p style="color:#10b981;margin:0;font-size:12px;font-weight:600;">— Martín, Argentina 🇦🇷</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #3b82f6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Venía de ser analista de datos. Con la Academia pasé a Data Engineer en 5 meses. 
                    El salto de sueldo fue de 40%."
                </p>
                <p style="color:#3b82f6;margin:0;font-size:12px;font-weight:600;">— Carolina, Chile 🇨🇱</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #8b5cf6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Lo mejor es la comunidad. Cada vez que tengo una duda, Ian o alguien del Discord me ayuda. 
                    No estás solo."
                </p>
                <p style="color:#8b5cf6;margin:0;font-size:12px;font-weight:600;">— Diego, México 🇲🇽</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar mi transformación →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay7OnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⚠️ Precio sube a \$30 el 7 de Diciembre
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, última oportunidad 🎁</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Llevas una semana con acceso gratuito. ¿Viste el valor que hay?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                <p style="color:#94a3b8;margin:0 0 5px;font-size:14px;">Precio de lanzamiento</p>
                <p style="color:#10b981;margin:0;font-size:36px;font-weight:700;">\$30 USD/mes</p>
                <p style="color:#64748b;margin:5px 0 0;font-size:12px;">Después del 7/12: \$30/mes</p>
            </div>
            
            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que obtenés:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Acceso completo al roadmap</li>
                <li>✅ 25+ proyectos para portfolio</li>
                <li>✅ Ejercicios SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
                <li>✅ Actualizaciones de por vida</li>
            </ul>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme a \$30/mes →
            </a>
            
            <p style="color:#64748b;font-size:12px;margin:20px 0 0;text-align:center;">
                ¿Preferís pagar 6 meses? <a href="https://onei.la/56P" style="color:#10b981;">Ahorrá 17% →</a>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function logEmail($pdo, $email, $type) {
    $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
    $stmt->execute([$email, $type]);
}

 * Onboarding Email Sequence
 * Ian Saura Data Engineering Hub
 * 
 * Secuencia de emails para nuevos usuarios:
 * - Día 0: Bienvenida + primer paso
 * - Día 1: Primer desafío SQL
 * - Día 3: Mostrar valor (proyectos)
 * - Día 5: Social proof (testimonios)
 * - Día 7: Oferta de suscripción
 * 
 * Ejecutar con cron: 0 9 * * * php /path/to/onboarding-sequence.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar autorización
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
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

$testMode = isset($_GET['test']) && $_GET['test'] === '1';

try {
    $pdo = getSecureDBConnection();
    
    // Verificar si la tabla tiene la estructura correcta
    try {
        $stmt = $pdo->query("DESCRIBE email_sequence_log");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('email', $columns)) {
            // Tabla existe pero sin columna email - recrear
            $pdo->exec("DROP TABLE IF EXISTS email_sequence_log");
            $pdo->exec("
                CREATE TABLE email_sequence_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    email_type VARCHAR(100) NOT NULL,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ");
        }
    } catch (Exception $e) {
        // Tabla no existe - crear
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => []
    ];
    
    // Día 0: Bienvenida (usuarios registrados hoy que no recibieron email)
    $day0Users = getUsersForSequence($pdo, 0, 'onboarding_welcome');
    foreach ($day0Users as $user) {
        if (sendOnboardingEmail($user, 'welcome', $testMode)) {
            $results['emails_sent'][] = ['type' => 'welcome', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_welcome');
        }
    }
    
    // Día 1: Primer desafío
    $day1Users = getUsersForSequence($pdo, 1, 'onboarding_day1');
    foreach ($day1Users as $user) {
        if (sendOnboardingEmail($user, 'day1', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day1', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day1');
        }
    }
    
    // Día 3: Mostrar proyectos
    $day3Users = getUsersForSequence($pdo, 3, 'onboarding_day3');
    foreach ($day3Users as $user) {
        if (sendOnboardingEmail($user, 'day3', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day3');
        }
    }
    
    // Día 5: Social proof
    $day5Users = getUsersForSequence($pdo, 5, 'onboarding_day5');
    foreach ($day5Users as $user) {
        if (sendOnboardingEmail($user, 'day5', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day5', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day5');
        }
    }
    
    // Día 7: Oferta final
    $day7Users = getUsersForSequence($pdo, 7, 'onboarding_day7');
    foreach ($day7Users as $user) {
        // Solo si no es suscriptor pagado
        if (!isSubscriber($pdo, $user['email'])) {
            if (sendOnboardingEmail($user, 'day7', $testMode)) {
                $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
                logEmail($pdo, $user['email'], 'onboarding_day7');
            }
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getUsersForSequence($pdo, $daysSinceRegistration, $emailType) {
    try {
        // Get already emailed users
        $alreadyEmailed = [];
        try {
            $stmt = $pdo->prepare("SELECT email FROM email_sequence_log WHERE email_type = ?");
            $stmt->execute([$emailType]);
            $alreadyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at,
                   COALESCE(up.xp, 0) as xp
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE DATE(u.created_at) = DATE_SUB(CURDATE(), INTERVAL ? DAY)
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$daysSinceRegistration]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out already emailed
        return array_filter($users, function($u) use ($alreadyEmailed) {
            return !in_array($u['email'], $alreadyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

function isSubscriber($pdo, $email) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subscribers WHERE email = ? AND payment_type = 'paid'");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}

function sendOnboardingEmail($user, $type, $testMode) {
    $template = getOnboardingTemplate($type, $user);
    
    if ($testMode) {
        return true;
    }
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com'
    ];
    
    return mail($user['email'], $template['subject'], $template['html'], implode("\r\n", $headers));
}

function getOnboardingTemplate($type, $user) {
    $name = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    
    $templates = [
        'welcome' => [
            'subject' => "🚀 Bienvenido a la Academia, $name!",
            'html' => getWelcomeTemplate($name)
        ],
        'day1' => [
            'subject' => "🎯 $name, tu primer desafío SQL te espera",
            'html' => getDay1Template($name)
        ],
        'day3' => [
            'subject' => "💼 $name, mirá estos proyectos para tu portfolio",
            'html' => getDay3OnboardingTemplate($name, $xp)
        ],
        'day5' => [
            'subject' => "⭐ $name, así les fue a otros como vos",
            'html' => getDay5Template($name)
        ],
        'day7' => [
            'subject' => "🎁 $name, última oportunidad: $20/mes",
            'html' => getDay7OnboardingTemplate($name)
        ]
    ];
    
    return $templates[$type] ?? $templates['welcome'];
}

function getWelcomeTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Bienvenido a la Academia, $name! 🎉</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Soy Ian, y estoy muy contento de que hayas decidido empezar tu camino en Data Engineering.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que tenés disponible ahora:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de 3 niveles</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu primer paso (2 minutos)
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Entrá a la plataforma y completá tu primer desafío SQL. 
                    Ganarás +50 XP y empezarás tu racha.
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o unite al Discord.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay1Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿listo para tu primer desafío? 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ayer te registraste. Hoy es el día perfecto para dar tu primer paso real.
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    💡 Desafío del día: Tu primera query SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Tenés una tabla de ventas. Tu misión: calcular el total de ingresos.<br>
                    <strong style="color:#fff;">Tiempo estimado: 2 minutos</strong>
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fbbf24;">Recompensa:</strong> +50 XP + 10 DataCoins 🪙
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay3OnboardingTemplate($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, mirá estos proyectos 💼</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Los reclutadores no quieren ver cursos. Quieren ver <strong style="color:#fff;">proyectos reales</strong>.
            </p>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0 0 10px;font-size:14px;font-weight:600;">🚀 NIVEL 1</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">ETL Simple con Python</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Procesá datos de e-commerce con Pandas</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#3b82f6;margin:0 0 10px;font-size:14px;font-weight:600;">🎯 NIVEL 2</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Data Warehouse con Snowflake</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Diseñá un DWH profesional</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#8b5cf6;margin:0 0 10px;font-size:14px;font-weight:600;">👑 NIVEL 3</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Pipeline con Airflow</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Orquestá pipelines como un Senior</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Ver todos los proyectos →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay5Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, así les fue a otros como vos ⭐</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                No tenés que confiar en mi palabra. Mirá lo que dicen otros:
            </p>
            
            <div style="background:#1e293b;border-left:4px solid #10b981;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Seguí el roadmap al pie de la letra. En 4 meses conseguí mi primer laburo como Data Engineer Jr. 
                    Los proyectos fueron clave en las entrevistas."
                </p>
                <p style="color:#10b981;margin:0;font-size:12px;font-weight:600;">— Martín, Argentina 🇦🇷</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #3b82f6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Venía de ser analista de datos. Con la Academia pasé a Data Engineer en 5 meses. 
                    El salto de sueldo fue de 40%."
                </p>
                <p style="color:#3b82f6;margin:0;font-size:12px;font-weight:600;">— Carolina, Chile 🇨🇱</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #8b5cf6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Lo mejor es la comunidad. Cada vez que tengo una duda, Ian o alguien del Discord me ayuda. 
                    No estás solo."
                </p>
                <p style="color:#8b5cf6;margin:0;font-size:12px;font-weight:600;">— Diego, México 🇲🇽</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar mi transformación →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay7OnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⚠️ Precio sube a \$30 el 7 de Diciembre
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, última oportunidad 🎁</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Llevas una semana con acceso gratuito. ¿Viste el valor que hay?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                <p style="color:#94a3b8;margin:0 0 5px;font-size:14px;">Precio de lanzamiento</p>
                <p style="color:#10b981;margin:0;font-size:36px;font-weight:700;">\$30 USD/mes</p>
                <p style="color:#64748b;margin:5px 0 0;font-size:12px;">Después del 7/12: \$30/mes</p>
            </div>
            
            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que obtenés:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Acceso completo al roadmap</li>
                <li>✅ 25+ proyectos para portfolio</li>
                <li>✅ Ejercicios SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
                <li>✅ Actualizaciones de por vida</li>
            </ul>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme a \$30/mes →
            </a>
            
            <p style="color:#64748b;font-size:12px;margin:20px 0 0;text-align:center;">
                ¿Preferís pagar 6 meses? <a href="https://onei.la/56P" style="color:#10b981;">Ahorrá 17% →</a>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function logEmail($pdo, $email, $type) {
    $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
    $stmt->execute([$email, $type]);
}


 * Onboarding Email Sequence
 * Ian Saura Data Engineering Hub
 * 
 * Secuencia de emails para nuevos usuarios:
 * - Día 0: Bienvenida + primer paso
 * - Día 1: Primer desafío SQL
 * - Día 3: Mostrar valor (proyectos)
 * - Día 5: Social proof (testimonios)
 * - Día 7: Oferta de suscripción
 * 
 * Ejecutar con cron: 0 9 * * * php /path/to/onboarding-sequence.php
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');

require_once 'secure-config.php';

// Verificar autorización
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
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

$testMode = isset($_GET['test']) && $_GET['test'] === '1';

try {
    $pdo = getSecureDBConnection();
    
    // Verificar si la tabla tiene la estructura correcta
    try {
        $stmt = $pdo->query("DESCRIBE email_sequence_log");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('email', $columns)) {
            // Tabla existe pero sin columna email - recrear
            $pdo->exec("DROP TABLE IF EXISTS email_sequence_log");
            $pdo->exec("
                CREATE TABLE email_sequence_log (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL,
                    email_type VARCHAR(100) NOT NULL,
                    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            ");
        }
    } catch (Exception $e) {
        // Tabla no existe - crear
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS email_sequence_log (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                email_type VARCHAR(100) NOT NULL,
                sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ");
    }
    
    $results = [
        'timestamp' => date('Y-m-d H:i:s'),
        'test_mode' => $testMode,
        'emails_sent' => []
    ];
    
    // Día 0: Bienvenida (usuarios registrados hoy que no recibieron email)
    $day0Users = getUsersForSequence($pdo, 0, 'onboarding_welcome');
    foreach ($day0Users as $user) {
        if (sendOnboardingEmail($user, 'welcome', $testMode)) {
            $results['emails_sent'][] = ['type' => 'welcome', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_welcome');
        }
    }
    
    // Día 1: Primer desafío
    $day1Users = getUsersForSequence($pdo, 1, 'onboarding_day1');
    foreach ($day1Users as $user) {
        if (sendOnboardingEmail($user, 'day1', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day1', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day1');
        }
    }
    
    // Día 3: Mostrar proyectos
    $day3Users = getUsersForSequence($pdo, 3, 'onboarding_day3');
    foreach ($day3Users as $user) {
        if (sendOnboardingEmail($user, 'day3', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day3', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day3');
        }
    }
    
    // Día 5: Social proof
    $day5Users = getUsersForSequence($pdo, 5, 'onboarding_day5');
    foreach ($day5Users as $user) {
        if (sendOnboardingEmail($user, 'day5', $testMode)) {
            $results['emails_sent'][] = ['type' => 'day5', 'email' => $user['email']];
            logEmail($pdo, $user['email'], 'onboarding_day5');
        }
    }
    
    // Día 7: Oferta final
    $day7Users = getUsersForSequence($pdo, 7, 'onboarding_day7');
    foreach ($day7Users as $user) {
        // Solo si no es suscriptor pagado
        if (!isSubscriber($pdo, $user['email'])) {
            if (sendOnboardingEmail($user, 'day7', $testMode)) {
                $results['emails_sent'][] = ['type' => 'day7', 'email' => $user['email']];
                logEmail($pdo, $user['email'], 'onboarding_day7');
            }
        }
    }
    
    $results['total_sent'] = count($results['emails_sent']);
    
    echo json_encode($results, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function getUsersForSequence($pdo, $daysSinceRegistration, $emailType) {
    try {
        // Get already emailed users
        $alreadyEmailed = [];
        try {
            $stmt = $pdo->prepare("SELECT email FROM email_sequence_log WHERE email_type = ?");
            $stmt->execute([$emailType]);
            $alreadyEmailed = $stmt->fetchAll(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            // Table might not exist
        }
        
        $sql = "
            SELECT u.email, u.first_name, u.full_name, u.created_at,
                   COALESCE(up.xp, 0) as xp
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            WHERE DATE(u.created_at) = DATE_SUB(CURDATE(), INTERVAL ? DAY)
        ";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$daysSinceRegistration]);
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Filter out already emailed
        return array_filter($users, function($u) use ($alreadyEmailed) {
            return !in_array($u['email'], $alreadyEmailed);
        });
    } catch (Exception $e) {
        return [];
    }
}

function isSubscriber($pdo, $email) {
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM subscribers WHERE email = ? AND payment_type = 'paid'");
    $stmt->execute([$email]);
    return $stmt->fetchColumn() > 0;
}

function sendOnboardingEmail($user, $type, $testMode) {
    $template = getOnboardingTemplate($type, $user);
    
    if ($testMode) {
        return true;
    }
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <hola@iansaura.com>',
        'Reply-To: hola@iansaura.com'
    ];
    
    return mail($user['email'], $template['subject'], $template['html'], implode("\r\n", $headers));
}

function getOnboardingTemplate($type, $user) {
    $name = $user['first_name'] ?: explode(' ', $user['full_name'] ?? '')[0] ?: 'Crack';
    $xp = $user['xp'] ?? 0;
    
    $templates = [
        'welcome' => [
            'subject' => "🚀 Bienvenido a la Academia, $name!",
            'html' => getWelcomeTemplate($name)
        ],
        'day1' => [
            'subject' => "🎯 $name, tu primer desafío SQL te espera",
            'html' => getDay1Template($name)
        ],
        'day3' => [
            'subject' => "💼 $name, mirá estos proyectos para tu portfolio",
            'html' => getDay3OnboardingTemplate($name, $xp)
        ],
        'day5' => [
            'subject' => "⭐ $name, así les fue a otros como vos",
            'html' => getDay5Template($name)
        ],
        'day7' => [
            'subject' => "🎁 $name, última oportunidad: $20/mes",
            'html' => getDay7OnboardingTemplate($name)
        ]
    ];
    
    return $templates[$type] ?? $templates['welcome'];
}

function getWelcomeTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">¡Bienvenido a la Academia, $name! 🎉</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Soy Ian, y estoy muy contento de que hayas decidido empezar tu camino en Data Engineering.
            </p>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que tenés disponible ahora:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Roadmap completo de 3 niveles</li>
                <li>✅ 25+ proyectos para tu portfolio</li>
                <li>✅ Ejercicios de SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Comunidad Discord</li>
            </ul>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0;font-size:16px;font-weight:600;">
                    🎯 Tu primer paso (2 minutos)
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Entrá a la plataforma y completá tu primer desafío SQL. 
                    Ganarás +50 XP y empezarás tu racha.
                </p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar ahora →
            </a>
            
            <p style="color:#64748b;font-size:14px;margin:30px 0 0;">
                ¿Tenés alguna duda? Respondé este email o unite al Discord.
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay1Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, ¿listo para tu primer desafío? 🎯</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Ayer te registraste. Hoy es el día perfecto para dar tu primer paso real.
            </p>
            
            <div style="background:#8b5cf620;border:1px solid #8b5cf650;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#a78bfa;margin:0;font-size:16px;font-weight:600;">
                    💡 Desafío del día: Tu primera query SQL
                </p>
                <p style="color:#94a3b8;margin:10px 0 0;font-size:14px;">
                    Tenés una tabla de ventas. Tu misión: calcular el total de ingresos.<br>
                    <strong style="color:#fff;">Tiempo estimado: 2 minutos</strong>
                </p>
            </div>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 30px;">
                <strong style="color:#fbbf24;">Recompensa:</strong> +50 XP + 10 DataCoins 🪙
            </p>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#8b5cf6,#ec4899);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Completar mi desafío →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay3OnboardingTemplate($name, $xp) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, mirá estos proyectos 💼</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Los reclutadores no quieren ver cursos. Quieren ver <strong style="color:#fff;">proyectos reales</strong>.
            </p>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#10b981;margin:0 0 10px;font-size:14px;font-weight:600;">🚀 NIVEL 1</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">ETL Simple con Python</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Procesá datos de e-commerce con Pandas</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#3b82f6;margin:0 0 10px;font-size:14px;font-weight:600;">🎯 NIVEL 2</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Data Warehouse con Snowflake</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Diseñá un DWH profesional</p>
            </div>
            
            <div style="background:#1e293b;border:1px solid #334155;border-radius:12px;padding:20px;margin:20px 0;">
                <p style="color:#8b5cf6;margin:0 0 10px;font-size:14px;font-weight:600;">👑 NIVEL 3</p>
                <p style="color:#fff;margin:0 0 5px;font-size:16px;font-weight:600;">Pipeline con Airflow</p>
                <p style="color:#94a3b8;margin:0;font-size:14px;">Orquestá pipelines como un Senior</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Ver todos los proyectos →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay5Template($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, así les fue a otros como vos ⭐</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                No tenés que confiar en mi palabra. Mirá lo que dicen otros:
            </p>
            
            <div style="background:#1e293b;border-left:4px solid #10b981;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Seguí el roadmap al pie de la letra. En 4 meses conseguí mi primer laburo como Data Engineer Jr. 
                    Los proyectos fueron clave en las entrevistas."
                </p>
                <p style="color:#10b981;margin:0;font-size:12px;font-weight:600;">— Martín, Argentina 🇦🇷</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #3b82f6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Venía de ser analista de datos. Con la Academia pasé a Data Engineer en 5 meses. 
                    El salto de sueldo fue de 40%."
                </p>
                <p style="color:#3b82f6;margin:0;font-size:12px;font-weight:600;">— Carolina, Chile 🇨🇱</p>
            </div>
            
            <div style="background:#1e293b;border-left:4px solid #8b5cf6;padding:20px;margin:20px 0;border-radius:0 12px 12px 0;">
                <p style="color:#fff;margin:0 0 10px;font-size:14px;line-height:1.6;">
                    "Lo mejor es la comunidad. Cada vez que tengo una duda, Ian o alguien del Discord me ayuda. 
                    No estás solo."
                </p>
                <p style="color:#8b5cf6;margin:0;font-size:12px;font-weight:600;">— Diego, México 🇲🇽</p>
            </div>
            
            <a href="https://iansaura.com/members" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;">
                Empezar mi transformación →
            </a>
        </div>
    </div>
</body>
</html>
HTML;
}

function getDay7OnboardingTemplate($name) {
    return <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0f172a;">
    <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <div style="background:linear-gradient(135deg,#1e293b,#0f172a);border-radius:16px;padding:40px;border:1px solid #334155;">
            <div style="background:#ef444420;border:1px solid #ef444450;border-radius:12px;padding:15px;margin:0 0 20px;text-align:center;">
                <p style="color:#f87171;margin:0;font-size:14px;font-weight:600;">
                    ⚠️ Precio sube a \$30 el 7 de Diciembre
                </p>
            </div>
            
            <h1 style="color:#fff;margin:0 0 20px;font-size:28px;">$name, última oportunidad 🎁</h1>
            
            <p style="color:#94a3b8;font-size:16px;line-height:1.6;margin:0 0 20px;">
                Llevas una semana con acceso gratuito. ¿Viste el valor que hay?
            </p>
            
            <div style="background:#10b98120;border:1px solid #10b98150;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
                <p style="color:#94a3b8;margin:0 0 5px;font-size:14px;">Precio de lanzamiento</p>
                <p style="color:#10b981;margin:0;font-size:36px;font-weight:700;">\$30 USD/mes</p>
                <p style="color:#64748b;margin:5px 0 0;font-size:12px;">Después del 7/12: \$30/mes</p>
            </div>
            
            <p style="color:#94a3b8;font-size:14px;line-height:1.6;margin:0 0 20px;">
                <strong style="color:#fff;">Lo que obtenés:</strong>
            </p>
            
            <ul style="color:#94a3b8;font-size:14px;line-height:1.8;margin:0 0 20px;padding-left:20px;">
                <li>✅ Acceso completo al roadmap</li>
                <li>✅ 25+ proyectos para portfolio</li>
                <li>✅ Ejercicios SQL y Python</li>
                <li>✅ Generador de datasets</li>
                <li>✅ Discord Premium</li>
                <li>✅ Q&A mensuales en vivo</li>
                <li>✅ Actualizaciones de por vida</li>
            </ul>
            
            <a href="https://onei.la/eY7" style="display:inline-block;background:linear-gradient(135deg,#10b981,#06b6d4);color:#fff;text-decoration:none;padding:16px 32px;border-radius:12px;font-weight:600;font-size:16px;width:100%;text-align:center;box-sizing:border-box;">
                Suscribirme a \$30/mes →
            </a>
            
            <p style="color:#64748b;font-size:12px;margin:20px 0 0;text-align:center;">
                ¿Preferís pagar 6 meses? <a href="https://onei.la/56P" style="color:#10b981;">Ahorrá 17% →</a>
            </p>
        </div>
    </div>
</body>
</html>
HTML;
}

function logEmail($pdo, $email, $type) {
    $stmt = $pdo->prepare("INSERT INTO email_sequence_log (email, email_type) VALUES (?, ?)");
    $stmt->execute([$email, $type]);
}