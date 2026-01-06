<?php
/**
 * Admin API - Panel de Administración
 * Solo accesible para admins autorizados
 * 
 * Endpoints:
 * GET /api/admin.php?action=stats - Estadísticas generales
 * GET /api/admin.php?action=subscribers - Lista de suscriptores
 * GET /api/admin.php?action=users - Lista de usuarios registrados
 * GET /api/admin.php?action=activity - Actividad reciente
 * POST /api/admin.php?action=update_subscriber - Actualizar suscriptor
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://iansaura.com');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secure-config.php';

// Admin emails autorizados
$ADMIN_EMAILS = [
    'iansauradata@gmail.com',
    'info@iansaura.com'
];

// Verificar autenticación de admin
function verifyAdmin($adminEmails) {
    // Verificar sesión o token
    session_start();
    
    // Opción 1: Verificar por sesión de usuario logueado
    if (isset($_SESSION['user_email']) && in_array($_SESSION['user_email'], $adminEmails)) {
        return $_SESSION['user_email'];
    }
    
    // Opción 2: Verificar por header Authorization con token
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        $token = $matches[1];
        // Verificar token en la base de datos
        try {
            $db = getSecureDBConnection();
            $stmt = $db->prepare("SELECT email FROM users WHERE session_token = ? AND email IN (" . implode(',', array_fill(0, count($adminEmails), '?')) . ")");
            $params = array_merge([$token], $adminEmails);
            $stmt->execute($params);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($user) {
                return $user['email'];
            }
        } catch (Exception $e) {
            // Log error
        }
    }
    
    // Opción 3: Verificar por cookie de sesión
    if (isset($_COOKIE['admin_session'])) {
        try {
            $db = getSecureDBConnection();
            $stmt = $db->prepare("SELECT email FROM users WHERE session_token = ? AND email IN (" . implode(',', array_fill(0, count($adminEmails), '?')) . ")");
            $params = array_merge([$_COOKIE['admin_session']], $adminEmails);
            $stmt->execute($params);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($user) {
                return $user['email'];
            }
        } catch (Exception $e) {
            // Log error
        }
    }
    
    return false;
}

// Función para generar key dinámica (debe coincidir con el frontend)
// Usa UTC para evitar problemas de timezone
function generateDynamicAdminKey($email) {
    $today = gmdate('Y-m-d'); // UTC
    $base = "{$email}_{$today}_iansaura_admin_2024";
    // Simple hash que coincide con el algoritmo JS
    $hash = 0;
    for ($i = 0; $i < strlen($base); $i++) {
        $char = ord($base[$i]);
        $hash = (($hash << 5) - $hash) + $char;
        $hash = $hash & 0xFFFFFFFF; // Keep it 32-bit
        if ($hash > 0x7FFFFFFF) $hash -= 0x100000000; // Handle sign
    }
    return 'adm_' . base_convert(abs($hash), 10, 36) . '_' . str_replace('-', '', $today);
}

// Verificar autenticación
$secretKey = $_GET['key'] ?? $_POST['key'] ?? '';
$adminEmail = verifyAdmin($ADMIN_EMAILS);

// Opción 4: Verificar por email enviado en query string (para frontend React)
if (!$adminEmail) {
    $requestEmail = $_GET['admin_email'] ?? '';
    if ($requestEmail && in_array(strtolower($requestEmail), array_map('strtolower', $ADMIN_EMAILS))) {
        $adminEmail = $requestEmail;
    }
}

// Verificar key dinámica basada en email de admin
$keyValid = false;
if ($secretKey) {
    // Opción 1: Key estática para cron jobs
    $CRON_KEYS = [
        'ian_admin_2024_secure_key_xyz',
        'iansaura_cron_2024_secret'
    ];
    if (in_array($secretKey, $CRON_KEYS)) {
        $keyValid = true;
        $adminEmail = 'cron@iansaura.com';
    }
    
    // Opción 2: Key dinámica basada en email
    if (!$keyValid) {
        foreach ($ADMIN_EMAILS as $email) {
            $expectedKey = generateDynamicAdminKey($email);
            if ($secretKey === $expectedKey) {
                $keyValid = true;
                $adminEmail = $email;
                break;
            }
        }
    }
}

if (!$adminEmail && !$keyValid) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized. Admin access required.']);
    exit();
}

$action = $_GET['action'] ?? 'stats';

try {
    $db = getSecureDBConnection();
    
    switch ($action) {
        case 'stats':
            echo json_encode(getStats($db));
            break;
            
        case 'subscribers':
            echo json_encode(getSubscribers($db));
            break;
            
        case 'users':
            echo json_encode(getUsers($db));
            break;
            
        case 'activity':
            echo json_encode(getActivity($db));
            break;
        
        case 'referrals':
            echo json_encode(getReferralStats($db));
            break;
        
        case 'migrate_oi_active':
            // Migrar usuarios activos de OneInfinite
            $users = [
                ['name' => 'Julio Lau', 'email' => 'julio.lau.n@gmail.com'],
                ['name' => 'Sergio Martin', 'email' => 'sergiom297@gmail.com'],
                ['name' => 'Mauricio Sam Chang', 'email' => 'sam_mauricio@outlook.com'],
                ['name' => 'Neivys Gonzalez', 'email' => 'imneiluz@gmail.com'],
                ['name' => 'Isabella Sansonetti', 'email' => 'isasansonetti01@gmail.com'],
                ['name' => 'Kevin Gonzales', 'email' => 'kevin.gonzales.m@uni.pe'],
                ['name' => 'Juan Cruz Godoy', 'email' => 'godoy.juan.cruz.28@gmail.com'],
                ['name' => 'Rodrigo Castro', 'email' => 'castrorodrigodev@gmail.com'],
                ['name' => 'Jose Imanol Salas', 'email' => 'j.imanol68@gmail.com'],
                ['name' => 'Sebastián Matías González', 'email' => 'sebastian.mgonzalez@hotmail.com'],
                ['name' => 'Patricio Diaz Medin', 'email' => 'pdiazmedin@gmail.com'],
                ['name' => 'Agustín Garcia', 'email' => 'agussgar32@gmail.com'],
                ['name' => 'Ivan Florez', 'email' => 'ivan.projectos.data@gmail.com'],
                ['name' => 'Juan Rodriguez', 'email' => 'juanjorb23@gmail.com'],
                ['name' => 'Alejandro Josafat Loera Ramirez', 'email' => 'josafat_22@hotmail.es'],
            ];
            
            $subscriptionStart = '2024-12-01 00:00:00';
            $subscriptionEnd = '2025-01-01 23:59:59';
            $results = [];
            
            foreach ($users as $user) {
                $email = $user['email'];
                $name = $user['name'];
                
                $stmt = $db->prepare("SELECT id FROM subscribers WHERE email = ?");
                $stmt->execute([$email]);
                $existing = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($existing) {
                    $stmt = $db->prepare("
                        UPDATE subscribers 
                        SET status = 'active',
                            payment_type = 'oneinfinite',
                            subscription_start = ?,
                            subscription_end = ?,
                            notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Migrado OI - mes pagado Dic 2024')
                        WHERE email = ?
                    ");
                    $stmt->execute([$subscriptionStart, $subscriptionEnd, $email]);
                    $results[] = ['email' => $email, 'action' => 'updated'];
                } else {
                    $stmt = $db->prepare("
                        INSERT INTO subscribers (email, name, status, payment_type, subscription_start, subscription_end, notes, created_at)
                        VALUES (?, ?, 'active', 'oneinfinite', ?, ?, 'Migrado OI - Dic 2024', NOW())
                    ");
                    $stmt->execute([$email, $name, $subscriptionStart, $subscriptionEnd]);
                    $results[] = ['email' => $email, 'action' => 'created'];
                }
                
                // Intentar actualizar subscribed si la columna existe
                try {
                    $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE email = ?");
                    $stmt->execute([$email]);
                } catch (Exception $e) {
                    // La columna puede no existir, ignorar
                }
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Migración completada',
                'start' => $subscriptionStart,
                'end' => $subscriptionEnd,
                'count' => count($results),
                'results' => $results
            ]);
            break;
        
        case 'merge_subscriber_emails':
            // Mergear emails secundarios con principales
            $merges = [
                ['secondary' => 'josafat_22@hotmail.es', 'primary' => 'josafat87@gmail.com', 'name' => 'Alejandro Josafat Loera Ramirez'],
                ['secondary' => 'sam_mauricio@outlook.com', 'primary' => 'mauriciosamch@gmail.com', 'name' => 'Mauricio Sam Chang'],
            ];
            
            $results = [];
            foreach ($merges as $merge) {
                $secondary = $merge['secondary'];
                $primary = $merge['primary'];
                $name = $merge['name'];
                
                // Obtener datos del secundario
                $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
                $stmt->execute([$secondary]);
                $secondaryData = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($secondaryData) {
                    // Verificar si el principal ya existe
                    $stmt = $db->prepare("SELECT id FROM subscribers WHERE email = ?");
                    $stmt->execute([$primary]);
                    $primaryExists = $stmt->fetch(PDO::FETCH_ASSOC);
                    
                    if ($primaryExists) {
                        // Actualizar el principal con los datos del secundario
                        $stmt = $db->prepare("
                            UPDATE subscribers 
                            SET status = ?,
                                payment_type = ?,
                                subscription_start = ?,
                                subscription_end = ?,
                                secondary_email = ?,
                                notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Mergeado desde ', ?)
                            WHERE email = ?
                        ");
                        $stmt->execute([
                            $secondaryData['status'],
                            $secondaryData['payment_type'],
                            $secondaryData['subscription_start'],
                            $secondaryData['subscription_end'],
                            $secondary,
                            $secondary,
                            $primary
                        ]);
                    } else {
                        // Crear el principal con los datos del secundario
                        $stmt = $db->prepare("
                            INSERT INTO subscribers (email, name, status, payment_type, subscription_start, subscription_end, secondary_email, notes, created_at)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
                        ");
                        $stmt->execute([
                            $primary,
                            $name,
                            $secondaryData['status'],
                            $secondaryData['payment_type'],
                            $secondaryData['subscription_start'],
                            $secondaryData['subscription_end'],
                            $secondary,
                            'Mergeado desde ' . $secondary
                        ]);
                    }
                    
                    // Eliminar el secundario de subscribers
                    $stmt = $db->prepare("DELETE FROM subscribers WHERE email = ?");
                    $stmt->execute([$secondary]);
                    
                    $results[] = ['primary' => $primary, 'secondary' => $secondary, 'action' => 'merged'];
                } else {
                    $results[] = ['primary' => $primary, 'secondary' => $secondary, 'action' => 'secondary_not_found'];
                }
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Merge completado',
                'results' => $results
            ]);
            break;
        
        case 'expire_oi_trials':
            // Expirar trials de OneInfinite y marcarlos para mostrar cartel de migración
            // Solo los que NO se suscribieron aún en Gumroad
            $trialEmails = [
                'rochaxx29@gmail.com',
                'bckgcapital@gmail.com',
                'ismartba@gmail.com',
                'jasef.huachambe@gmail.com',
                'naylamanzione@gmail.com',
                'nadiasemes85@gmail.com',
                // 'tapieroandres3@gmail.com', // Ya se suscribió en Gumroad
                'estebanledes@gmail.com',
                'owenwilson76467963@gmail.com',
                'duvanmorales07@gmail.com',
                'maria.amy.3@gmail.com',
                'gastonrodriguez.360@gmail.com',
                'darkcode134@gmail.com',
            ];
            
            $results = [];
            foreach ($trialEmails as $email) {
                // Verificar si ya está en Gumroad (no marcar)
                $stmt = $db->prepare("SELECT payment_type, status FROM subscribers WHERE email = ?");
                $stmt->execute([$email]);
                $current = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($current && $current['payment_type'] === 'gumroad') {
                    $results[] = ['email' => $email, 'action' => 'skipped_gumroad'];
                    continue;
                }
                
                // Actualizar status a oi_migrated
                $stmt = $db->prepare("UPDATE subscribers SET status = 'oi_migrated' WHERE email = ?");
                $stmt->execute([$email]);
                $results[] = ['email' => $email, 'action' => 'marked_oi_migrated'];
            }
            
            echo json_encode([
                'success' => true,
                'message' => 'Trials marcados para migración',
                'count' => count($results),
                'results' => $results
            ]);
            break;
        
        case 'list_oi_migrated':
            // Listar usuarios pendientes de migración
            $stmt = $db->prepare("SELECT email, name, status, payment_type FROM subscribers WHERE status = 'oi_migrated'");
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode([
                'success' => true,
                'count' => count($users),
                'users' => $users
            ]);
            break;
        
        case 'clear_oi_migrated':
            // Quitar el estado oi_migrated de un usuario específico (ya se suscribió)
            $email = $_GET['email'] ?? '';
            if (!$email) {
                echo json_encode(['success' => false, 'error' => 'Email required']);
                break;
            }
            $stmt = $db->prepare("UPDATE subscribers SET status = 'expired' WHERE email = ? AND status = 'oi_migrated'");
            $stmt->execute([$email]);
            echo json_encode([
                'success' => true,
                'email' => $email,
                'action' => $stmt->rowCount() > 0 ? 'cleared' : 'not_found'
            ]);
            break;
        
        case 'view_gumroad_logs':
            // Ver logs del webhook de Gumroad
            $logFile = __DIR__ . '/../logs/gumroad-webhook.log';
            if (file_exists($logFile)) {
                $logs = file_get_contents($logFile);
                // Get last 5000 chars
                $logs = substr($logs, -5000);
                echo json_encode(['success' => true, 'logs' => $logs]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Log file not found']);
            }
            break;
        
        case 'set_gumroad_user':
            // Actualizar manualmente un usuario a Gumroad
            $email = $_GET['email'] ?? '';
            $days = intval($_GET['days'] ?? 30);
            $status = $_GET['status'] ?? 'active'; // 'active' or 'trial'
            if (!$email) {
                echo json_encode(['success' => false, 'error' => 'Email required']);
                break;
            }
            $endDate = date('Y-m-d H:i:s', strtotime("+$days days"));
            
            // Primero verificar si existe
            $stmt = $db->prepare("SELECT id, email FROM subscribers WHERE email = ?");
            $stmt->execute([$email]);
            $exists = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($exists) {
                // Verificar estructura de la columna
                $colInfo = $db->query("SHOW COLUMNS FROM subscribers WHERE Field = 'payment_type'")->fetch(PDO::FETCH_ASSOC);
                
                $stmt = $db->prepare("UPDATE subscribers SET status = ?, payment_type = 'gumroad', subscription_end = ? WHERE email = ?");
                $stmt->execute([$status, $endDate, $email]);
                
                $action = "updated - column type: " . ($colInfo['Type'] ?? 'unknown');
            } else {
                $stmt = $db->prepare("
                    INSERT INTO subscribers (email, status, payment_type, subscription_end, created_at)
                    VALUES (?, ?, 'gumroad', ?, NOW())
                ");
                $stmt->execute([$email, $status, $endDate]);
                $action = 'created';
            }
            
            // Verificar el resultado
            $stmt = $db->prepare("SELECT status, payment_type, subscription_end FROM subscribers WHERE email = ?");
            $stmt->execute([$email]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'success' => true,
                'email' => $email,
                'action' => $action,
                'status' => $result['status'],
                'payment_type' => $result['payment_type'],
                'subscription_end' => $result['subscription_end']
            ]);
            break;
            
        case 'subscriber_detail':
            $id = $_GET['id'] ?? 0;
            echo json_encode(getSubscriberDetail($db, $id));
            break;
            
        case 'update_subscriber':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(updateSubscriber($db, $data));
            break;
            
        case 'api_usage':
            echo json_encode(getApiUsage($db));
            break;
        
        case 'add_subscriber':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(addSubscriber($db, $data));
            break;
            
        case 'delete_subscriber':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(deleteSubscriber($db, $data));
            break;
        
        case 'update_user_permissions':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(updateUserPermissions($db, $data));
            break;
        
        case 'delete_user':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(deleteUser($db, $data));
            break;
        
        case 'update_subscriber_type':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(updateSubscriberType($db, $data));
            break;
        
        case 'update_subscriber_full':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(updateSubscriberFull($db, $data));
            break;
        
        case 'user_progress':
            echo json_encode(getUserProgress($db));
            break;
        
        case 'activity_timeline':
            echo json_encode(getActivityTimeline($db));
            break;
        
        case 'leaderboard':
            echo json_encode(getLeaderboard($db));
            break;
        
        case 'check_tables':
            echo json_encode(checkTables($db));
            break;
        
        case 'migrate_last_activity':
            // CRITICAL FIX: Ensure last_activity column exists in user_progress for En Vivo tracking
            echo json_encode(migrateLastActivityColumn($db));
            break;
        
        case 'bootcamp_students':
            echo json_encode(getBootcampStudents($db));
            break;
        
        case 'add_bootcamp_student':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(addBootcampStudent($db, $data));
            break;
        
        case 'update_bootcamp_student':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(updateBootcampStudent($db, $data));
            break;
        
        case 'delete_bootcamp_student':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(deleteBootcampStudent($db, $data));
            break;
        
        case 'toggle_delivery':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(toggleDelivery($db, $data));
            break;
        
        case 'add_subscriber':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(addManualSubscriber($db, $data));
            break;
        
        case 'grant_trial':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(grantTrial($db, $data));
            break;
        
        case 'send_trial_invitation':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(sendTrialInvitation($db, $data));
            break;
        
        case 'send_engagement_email':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(sendEngagementEmail($db, $data));
            break;
        
        case 'delete_user_data':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(deleteUserData($db, $data));
            break;
        
        case 'check_expired_trials':
            echo json_encode(checkExpiredTrials($db));
            break;
        
        case 'assign_discord_role':
            if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
                http_response_code(405);
                echo json_encode(['error' => 'POST required']);
                exit();
            }
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode(assignDiscordRole($db, $data));
            break;
        
        case 'migrate_db':
            // Ejecutar migraciones pendientes
            $results = [];
            
            // Whitelist of allowed tables for migrations (security)
            $allowedTables = ['user_progress', 'users', 'subscribers', 'payment_history'];
            
            // Helper function to safely add column
            $addColumnIfNotExists = function($db, $table, $column, $definition) use ($allowedTables) {
                // Validate table name against whitelist
                if (!in_array($table, $allowedTables)) {
                    return 'Error: Table not in whitelist';
                }
                // Validate column name (alphanumeric + underscore only)
                if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $column)) {
                    return 'Error: Invalid column name';
                }
                $check = $db->query("SHOW COLUMNS FROM `$table` LIKE '$column'");
                if ($check->rowCount() == 0) {
                    $db->exec("ALTER TABLE `$table` ADD COLUMN `$column` $definition");
                    return 'Added';
                }
                return 'Already exists';
            };
            
            // Helper function to safely add index
            $addIndexIfNotExists = function($db, $table, $indexName, $columns) use ($allowedTables) {
                // Validate table name against whitelist
                if (!in_array($table, $allowedTables)) {
                    return 'Error: Table not in whitelist';
                }
                // Validate index name (alphanumeric + underscore only)
                if (!preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $indexName)) {
                    return 'Error: Invalid index name';
                }
                $check = $db->query("SHOW INDEX FROM `$table` WHERE Key_name = '$indexName'");
                if ($check->rowCount() == 0) {
                    $db->exec("CREATE INDEX `$indexName` ON `$table` ($columns)");
                    return 'Added';
                }
                return 'Already exists';
            };
            
            // Migration 1: monthly_xp for leaderboard
            try {
                $results['monthly_xp'] = $addColumnIfNotExists($db, 'user_progress', 'monthly_xp', 'INT DEFAULT 0');
                $results['month_start'] = $addColumnIfNotExists($db, 'user_progress', 'month_start', 'DATE DEFAULT NULL');
            } catch (Exception $e) {
                $results['monthly_xp'] = 'Error: ' . $e->getMessage();
            }
            
            // Migration 2: email notification flags
            try {
                $results['trial_reminder_sent'] = $addColumnIfNotExists($db, 'subscribers', 'trial_reminder_sent', 'TINYINT(1) DEFAULT 0');
                $results['expired_email_sent'] = $addColumnIfNotExists($db, 'subscribers', 'expired_email_sent', 'TINYINT(1) DEFAULT 0');
                $results['trial_ends_at'] = $addColumnIfNotExists($db, 'subscribers', 'trial_ends_at', 'DATE DEFAULT NULL');
            } catch (Exception $e) {
                $results['email_flags'] = 'Error: ' . $e->getMessage();
            }
            
            // Migration 3: streak freeze in user_progress
            try {
                $results['streak_freezes'] = $addColumnIfNotExists($db, 'user_progress', 'streak_freezes', 'INT DEFAULT 0');
            } catch (Exception $e) {
                $results['streak_freezes'] = 'Error: ' . $e->getMessage();
            }
            
            // Migration 4: Performance indexes
            try {
                $results['idx_user_progress_email'] = $addIndexIfNotExists($db, 'user_progress', 'idx_user_progress_email', 'email');
            } catch (Exception $e) {
                $results['user_progress_indexes'] = 'Error: ' . $e->getMessage();
            }
            
            try {
                $results['idx_subscribers_email'] = $addIndexIfNotExists($db, 'subscribers', 'idx_subscribers_email', 'email');
                $results['idx_subscribers_status'] = $addIndexIfNotExists($db, 'subscribers', 'idx_subscribers_status', 'status');
            } catch (Exception $e) {
                $results['subscribers_indexes'] = 'Error: ' . $e->getMessage();
            }
            
            try {
                $results['idx_users_email'] = $addIndexIfNotExists($db, 'users', 'idx_users_email', 'email');
            } catch (Exception $e) {
                $results['users_indexes'] = 'Error: ' . $e->getMessage();
            }
            
            // Migration 5: Analytics events table
            try {
                $db->exec("CREATE TABLE IF NOT EXISTS analytics_events (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    event_name VARCHAR(100) NOT NULL,
                    user_email VARCHAR(255),
                    properties JSON,
                    session_id VARCHAR(100),
                    page_url VARCHAR(500),
                    referrer VARCHAR(500),
                    user_agent VARCHAR(500),
                    ip_address VARCHAR(45),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_event_name (event_name),
                    INDEX idx_user_email (user_email),
                    INDEX idx_created_at (created_at)
                )");
                $results['analytics_events_table'] = 'Created/Exists';
            } catch (Exception $e) {
                $results['analytics_events_table'] = 'Error: ' . $e->getMessage();
            }
            
            // Migration 6: Rate limiting table
            try {
                $db->exec("CREATE TABLE IF NOT EXISTS rate_limits (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    ip_address VARCHAR(45) NOT NULL,
                    endpoint VARCHAR(100) NOT NULL,
                    request_count INT DEFAULT 1,
                    window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_ip_endpoint (ip_address, endpoint),
                    INDEX idx_window (window_start)
                )");
                $results['rate_limits_table'] = 'Created/Exists';
            } catch (Exception $e) {
                $results['rate_limits_table'] = 'Error: ' . $e->getMessage();
            }
            
            // Migration 7: plan_type column for subscribers (needed for webhook)
            try {
                $results['plan_type'] = $addColumnIfNotExists($db, 'subscribers', 'plan_type', "VARCHAR(50) DEFAULT 'monthly'");
            } catch (Exception $e) {
                $results['plan_type'] = 'Error: ' . $e->getMessage();
            }
            
            // Migration 8: subscription_type column for subscribers
            try {
                $results['subscription_type'] = $addColumnIfNotExists($db, 'subscribers', 'subscription_type', "VARCHAR(50) DEFAULT 'monthly'");
            } catch (Exception $e) {
                $results['subscription_type'] = 'Error: ' . $e->getMessage();
            }
            
            // Migration 9: Password reset columns for users
            try {
                $results['password_reset_token'] = $addColumnIfNotExists($db, 'users', 'password_reset_token', "VARCHAR(64) DEFAULT NULL");
                $results['password_reset_expires'] = $addColumnIfNotExists($db, 'users', 'password_reset_expires', "DATETIME DEFAULT NULL");
            } catch (Exception $e) {
                $results['password_reset'] = 'Error: ' . $e->getMessage();
            }
            
            echo json_encode(['success' => true, 'migrations' => $results]);
            break;
            
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}

// ============================================
// FUNCIONES DE DATOS
// ============================================

function getStats($db) {
    $stats = [];
    
    // Total suscriptores activos (pagos)
    $stmt = $db->query("SELECT COUNT(*) as count FROM subscribers WHERE status = 'active'");
    $stats['active_subscribers'] = (int)$stmt->fetch()['count'];
    
    // Trials activos (no expirados)
    $stmt = $db->query("SELECT COUNT(*) as count FROM subscribers WHERE status = 'trial' AND subscription_end > NOW()");
    $stats['active_trials'] = (int)$stmt->fetch()['count'];
    
    // Trials expirados
    $stmt = $db->query("SELECT COUNT(*) as count FROM subscribers WHERE status = 'trial' AND subscription_end <= NOW()");
    $stats['expired_trials'] = (int)$stmt->fetch()['count'];
    
    // Total con acceso real (activos + trials válidos)
    $stats['total_with_access'] = $stats['active_subscribers'] + $stats['active_trials'];
    
    // Total usuarios registrados
    $stmt = $db->query("SELECT COUNT(*) as count FROM users");
    $stats['total_users'] = (int)$stmt->fetch()['count'];
    
    // Suscriptores este mes
    $stmt = $db->query("SELECT COUNT(*) as count FROM subscribers WHERE status = 'active' AND created_at >= DATE_FORMAT(NOW(), '%Y-%m-01')");
    $stats['subscribers_this_month'] = (int)$stmt->fetch()['count'];
    
    // Cancelaciones este mes
    $stmt = $db->query("SELECT COUNT(*) as count FROM subscribers WHERE status = 'cancelled' AND updated_at >= DATE_FORMAT(NOW(), '%Y-%m-01')");
    $stats['cancellations_this_month'] = (int)$stmt->fetch()['count'];
    
    // Ingresos estimados (solo suscriptores pagos * $30)
    $stats['estimated_mrr'] = $stats['active_subscribers'] * 30;
    
    // Usuarios registrados últimos 7 días
    $stmt = $db->query("SELECT COUNT(*) as count FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
    $stats['new_users_7days'] = (int)$stmt->fetch()['count'];
    
    // Suscriptores por mes (últimos 6 meses)
    $stmt = $db->query("
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m') as month,
            COUNT(*) as count
        FROM subscribers 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY month DESC
    ");
    $stats['subscribers_by_month'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Tasa de conversión (suscriptores pagos / usuarios)
    $stats['conversion_rate'] = $stats['total_users'] > 0 
        ? round(($stats['active_subscribers'] / $stats['total_users']) * 100, 2) 
        : 0;
    
    return $stats;
}

function getSubscribers($db) {
    // First check which columns exist
    $columns = $db->query("SHOW COLUMNS FROM subscribers")->fetchAll(PDO::FETCH_COLUMN);
    
    // Check if payment_type column exists, if not add it
    if (!in_array('payment_type', $columns)) {
        try {
            $db->exec("ALTER TABLE subscribers ADD COLUMN payment_type ENUM('paid', 'invited', 'external') DEFAULT 'paid'");
            $db->exec("ALTER TABLE subscribers ADD COLUMN notes TEXT DEFAULT NULL");
        } catch (Exception $e) {
            // Column might already exist or table locked
        }
        $columns = $db->query("SHOW COLUMNS FROM subscribers")->fetchAll(PDO::FETCH_COLUMN);
    }
    
    $selectFields = ['s.id', 's.email', 's.status', 's.created_at', 's.updated_at'];
    
    // Add optional columns if they exist
    $optionalColumns = ['name', 'secondary_email', 'subscription_start', 'subscription_end', 'next_payment_date', 
                        'last_payment_date', 'amount', 'currency', 'discord_user_id', 'discord_connected',
                        'payment_type', 'notes', 'oneinfinite_subscription_id', 'plan_type', 'trial_ends_at',
                        'oneinfinite_customer_id'];
    foreach ($optionalColumns as $col) {
        if (in_array($col, $columns)) {
            $selectFields[] = "s.$col";
        }
    }
    
    $sql = "SELECT " . implode(', ', $selectFields) . ",
            u.google_id IS NOT NULL as has_google_login,
            COALESCE(u.full_name, u.name) as user_name
        FROM subscribers s
        LEFT JOIN users u ON LOWER(s.email) = LOWER(u.email)
        ORDER BY s.id ASC";
    
    $stmt = $db->query($sql);
    $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Add computed fields
    $now = new DateTime();
    foreach ($subscribers as &$sub) {
        // Determine if it's from OneInfinite (paid automatically)
        $sub['is_oneinfinite'] = !empty($sub['oneinfinite_subscription_id']) || 
                                  ($sub['payment_type'] ?? '') === 'oneinfinite';
        
        // Default payment_type if not set - use valid types only
        if (empty($sub['payment_type'])) {
            if ($sub['is_oneinfinite']) {
                $sub['payment_type'] = 'oneinfinite';
            } else if ($sub['status'] === 'trial') {
                $sub['payment_type'] = 'trial_manual'; // Legacy trial type
            } else {
                $sub['payment_type'] = null; // Leave null so UI shows "Sin tipo"
            }
        }
        
        // Detect trial status and type
        $planType = $sub['plan_type'] ?? null;
        $trialEndsAt = $sub['trial_ends_at'] ?? null;
        $sub['is_trial'] = ($sub['status'] === 'trial') || ($planType === 'trial');
        $sub['is_expired'] = false;
        $sub['has_access'] = ($sub['status'] === 'active'); // Default: active = has access
        
        // IMPORTANT: Distinguish between OneInfinite trial (with card) vs manual trial (no card)
        // OneInfinite trial = user put their card, will be charged automatically after trial
        // Manual trial = admin gave access, no automatic billing
        $sub['is_oneinfinite_trial'] = $sub['is_trial'] && $sub['is_oneinfinite'];
        $sub['is_manual_trial'] = $sub['is_trial'] && !$sub['is_oneinfinite'];
        
        // Trial type label for UI
        if ($sub['is_oneinfinite_trial']) {
            $sub['trial_type'] = 'oneinfinite'; // 💳 Con tarjeta
            $sub['trial_type_label'] = '💳 Trial OneInfinite (se cobra automático)';
        } else if ($sub['is_manual_trial']) {
            $sub['trial_type'] = 'manual'; // 🎁 Sin tarjeta
            $sub['trial_type_label'] = '🎁 Trial Manual (sin tarjeta)';
        } else {
            $sub['trial_type'] = null;
            $sub['trial_type_label'] = null;
        }
        
        // For trials, check if trial_ends_at or subscription_end has passed
        $trialEndDate = $trialEndsAt ?? ($sub['subscription_end'] ?? null);
        if ($sub['is_trial'] && !empty($trialEndDate)) {
            $trialEnd = new DateTime($trialEndDate);
            if ($trialEnd < $now) {
                $sub['is_expired'] = true;
                $sub['has_access'] = false;
                $sub['effective_status'] = 'expired';
            } else {
                $sub['has_access'] = true;
                $sub['effective_status'] = 'trial';
                $sub['days_left'] = $now->diff($trialEnd)->days;
                $sub['trial_ends_at_formatted'] = $trialEnd->format('Y-m-d');
            }
        } else if ($sub['status'] === 'trial') {
            // Trial without end date - still active
            $sub['has_access'] = true;
            $sub['effective_status'] = 'trial';
        } else {
            $sub['effective_status'] = $sub['status'];
        }
    }
    
    // Count only users with actual access
    $activeWithAccess = array_filter($subscribers, fn($s) => $s['has_access']);
    $expiredTrials = array_filter($subscribers, fn($s) => $s['is_expired']);
    $activeTrials = array_filter($subscribers, fn($s) => $s['is_trial'] && !$s['is_expired']);
    
    // Separate OneInfinite trials (with card) from manual trials (no card)
    $oneinfiniteTrials = array_filter($subscribers, fn($s) => $s['is_oneinfinite_trial'] && !$s['is_expired']);
    $manualTrials = array_filter($subscribers, fn($s) => $s['is_manual_trial'] && !$s['is_expired']);
    $expiredOneinfiniteTrials = array_filter($subscribers, fn($s) => $s['is_oneinfinite_trial'] && $s['is_expired']);
    $expiredManualTrials = array_filter($subscribers, fn($s) => $s['is_manual_trial'] && $s['is_expired']);
    
    return [
        'subscribers' => $subscribers,
        'total' => $db->query("SELECT COUNT(*) FROM subscribers")->fetchColumn(),
        'active' => count($activeWithAccess), // Real active count (excludes expired trials)
        'active_paid' => $db->query("SELECT COUNT(*) FROM subscribers WHERE status = 'active'")->fetchColumn(),
        'trials_active' => count($activeTrials),
        'trials_expired' => count($expiredTrials),
        // NEW: Separate trial types
        'trials_oneinfinite_active' => count($oneinfiniteTrials), // 💳 Con tarjeta, se cobran automático
        'trials_manual_active' => count($manualTrials), // 🎁 Sin tarjeta, manuales
        'trials_oneinfinite_expired' => count($expiredOneinfiniteTrials),
        'trials_manual_expired' => count($expiredManualTrials),
        'paid' => $db->query("SELECT COUNT(*) FROM subscribers WHERE status = 'active' AND (payment_type = 'paid' OR payment_type = 'oneinfinite' OR payment_type IS NULL)")->fetchColumn(),
        // OI = activos que NO son gumroad (OneInfinite, vencen enero, $18 neto)
        'paid_oneinfinite' => $db->query("SELECT COUNT(*) FROM subscribers WHERE status = 'active' AND (payment_type IS NULL OR payment_type = 'oneinfinite' OR payment_type = 'paid') AND payment_type != 'gumroad'")->fetchColumn(),
        // Gumroad activos ($16.62 neto)
        'paid_gumroad' => $db->query("SELECT COUNT(*) FROM subscribers WHERE status = 'active' AND payment_type = 'gumroad'")->fetchColumn(),
        // Trials con tarjeta Gumroad (potencial $16.62)
        'trials_gumroad' => $db->query("SELECT COUNT(*) FROM subscribers WHERE status = 'trial' AND payment_type = 'gumroad'")->fetchColumn(),
        'invited' => $db->query("SELECT COUNT(*) FROM subscribers WHERE status = 'active' AND payment_type = 'invited'")->fetchColumn(),
        'external' => $db->query("SELECT COUNT(*) FROM subscribers WHERE status = 'active' AND (payment_type = 'external' OR payment_type = 'manual')")->fetchColumn()
    ];
}

function getUsers($db) {
    // Check which columns exist in users table
    $userCols = $db->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
    $subCols = $db->query("SHOW COLUMNS FROM subscribers")->fetchAll(PDO::FETCH_COLUMN);
    
    $selectFields = ['u.id', 'u.email'];
    
    // Add optional user columns
    if (in_array('name', $userCols)) $selectFields[] = 'u.name';
    if (in_array('full_name', $userCols)) $selectFields[] = 'u.full_name';
    if (in_array('first_name', $userCols)) $selectFields[] = 'u.first_name';
    if (in_array('last_name', $userCols)) $selectFields[] = 'u.last_name';
    if (in_array('google_id', $userCols)) $selectFields[] = "CASE WHEN u.google_id IS NOT NULL THEN 'google' ELSE 'email' END as provider";
    if (in_array('email_verified', $userCols)) $selectFields[] = 'u.email_verified';
    if (in_array('is_active', $userCols)) $selectFields[] = 'u.is_active';
    $hasSubscribedCol = in_array('subscribed', $userCols);
    $hasBootcampCol = in_array('bootcamp_access', $userCols);
    
    if (in_array('login_count', $userCols)) $selectFields[] = 'u.login_count';
    if (in_array('created_at', $userCols)) $selectFields[] = 'u.created_at';
    if (in_array('last_login', $userCols)) $selectFields[] = 'u.last_login';
    
    // Add subscriber columns - check for active subscription (handle missing columns)
    if ($hasSubscribedCol) {
        $selectFields[] = "(CASE WHEN s.status = 'active' THEN 1 ELSE COALESCE(u.subscribed, 0) END) as subscribed";
    } else {
        $selectFields[] = "(CASE WHEN s.status = 'active' THEN 1 ELSE 0 END) as subscribed";
    }
    
    if ($hasBootcampCol) {
        $selectFields[] = 'COALESCE(u.bootcamp_access, 0) as bootcamp_access';
    } else {
        $selectFields[] = '0 as bootcamp_access';
    }
    
    $selectFields[] = 's.status as subscription_status';
    if (in_array('subscription_start', $subCols)) $selectFields[] = 's.subscription_start';
    if (in_array('subscription_end', $subCols)) $selectFields[] = 's.subscription_end';
    
    // Add trial info - detect trial by status='trial' OR by having subscription_end but status is not 'active'
    $selectFields[] = "(CASE WHEN (s.status = 'trial' OR (s.status != 'active' AND s.status != 'cancelled' AND s.subscription_end IS NOT NULL)) AND s.subscription_end > NOW() THEN 1 ELSE 0 END) as is_trial";
    $selectFields[] = "(CASE WHEN (s.status = 'trial' OR (s.status != 'active' AND s.status != 'cancelled' AND s.subscription_end IS NOT NULL)) AND s.subscription_end > NOW() THEN DATEDIFF(s.subscription_end, NOW()) ELSE NULL END) as trial_days_left";
    
    // Add past trial info - if they had a subscription that expired
    $selectFields[] = "(CASE WHEN s.id IS NOT NULL AND s.subscription_end < NOW() THEN 1 ELSE 0 END) as had_trial";
    $selectFields[] = "(CASE WHEN s.id IS NOT NULL AND s.subscription_end < NOW() THEN s.subscription_end ELSE NULL END) as trial_expired_at";
    
    // Add referral columns if they exist
    if (in_array('referral_code', $userCols)) $selectFields[] = 'u.referral_code';
    if (in_array('referred_by', $userCols)) $selectFields[] = 'u.referred_by';
    if (in_array('referral_bonus_days', $userCols)) $selectFields[] = 'COALESCE(u.referral_bonus_days, 0) as referral_bonus_days';
    if (in_array('bootcamp_discount', $userCols)) $selectFields[] = 'COALESCE(u.bootcamp_discount, 0) as bootcamp_discount';
    
    $sql = "SELECT " . implode(', ', $selectFields) . "
        FROM users u
        LEFT JOIN subscribers s ON (u.email = s.email OR u.email = s.secondary_email)
        ORDER BY u.created_at DESC
        LIMIT 2000";
    
    $stmt = $db->query($sql);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Add referral counts for each user
    $hasReferralCode = in_array('referral_code', $userCols);
    if ($hasReferralCode) {
        foreach ($users as &$user) {
            if (!empty($user['referral_code'])) {
                // Count how many people this user referred
                $countStmt = $db->prepare("SELECT COUNT(*) FROM users WHERE referred_by = ?");
                $countStmt->execute([$user['referral_code']]);
                $user['referrals_count'] = (int)$countStmt->fetchColumn();
                
                // Get list of referred users
                $listStmt = $db->prepare("SELECT email, created_at FROM users WHERE referred_by = ? ORDER BY created_at DESC LIMIT 10");
                $listStmt->execute([$user['referral_code']]);
                $user['referred_users'] = $listStmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                $user['referrals_count'] = 0;
                $user['referred_users'] = [];
            }
            
            // Get who referred this user
            if (!empty($user['referred_by'])) {
                $refStmt = $db->prepare("SELECT email FROM users WHERE referral_code = ?");
                $refStmt->execute([$user['referred_by']]);
                $referrer = $refStmt->fetch(PDO::FETCH_ASSOC);
                $user['referred_by_email'] = $referrer ? $referrer['email'] : null;
            }
        }
    }
    
    // Determine user status type (for filtering)
    foreach ($users as &$user) {
        if ($user['subscription_status'] === 'active') {
            $user['status_type'] = 'active';
        } else if ($user['is_trial'] ?? false) {
            // Check if it's a referral trial (no card) vs gumroad trial (with card)
            if (!empty($user['referred_by']) && empty($user['subscription_status'])) {
                $user['status_type'] = 'referral_trial';
            } else {
                $user['status_type'] = 'trial';
            }
        } else if ($user['had_trial'] ?? false) {
            $user['status_type'] = 'trial_expired';
        } else {
            $user['status_type'] = 'free';
        }
    }
    
    return [
        'users' => $users,
        'total' => $db->query("SELECT COUNT(*) FROM users")->fetchColumn()
    ];
}

function getActivity($db) {
    $activity = [];
    
    try {
        // Check columns
        $userCols = $db->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
        $subCols = $db->query("SHOW COLUMNS FROM subscribers")->fetchAll(PDO::FETCH_COLUMN);
        
        $hasUserName = in_array('name', $userCols);
        $hasSubName = in_array('name', $subCols);
        
        // Últimos registros de usuarios
        $stmt = $db->query("
            SELECT 'user_registered' as type, email, " . ($hasUserName ? "COALESCE(name, email)" : "email as name") . ", created_at as timestamp
            FROM users
            ORDER BY created_at DESC
            LIMIT 20
        ");
        $userActivity = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $activity = array_merge($activity, $userActivity);
        
        // Últimas suscripciones activas
        $stmt = $db->query("
            SELECT 'subscription_created' as type, email, " . ($hasSubName ? "COALESCE(name, email)" : "email as name") . ", created_at as timestamp
            FROM subscribers
            WHERE status = 'active'
            ORDER BY created_at DESC
            LIMIT 20
        ");
        $subActivity = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $activity = array_merge($activity, $subActivity);
        
        // Últimas cancelaciones
        $stmt = $db->query("
            SELECT 'subscription_cancelled' as type, email, " . ($hasSubName ? "COALESCE(name, email)" : "email as name") . ", updated_at as timestamp
            FROM subscribers
            WHERE status = 'cancelled'
            ORDER BY updated_at DESC
            LIMIT 20
        ");
        $cancelActivity = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $activity = array_merge($activity, $cancelActivity);
        
        // Ordenar por timestamp descendente
        usort($activity, function($a, $b) {
            $timeA = strtotime($a['timestamp'] ?? '1970-01-01');
            $timeB = strtotime($b['timestamp'] ?? '1970-01-01');
            return $timeB - $timeA;
        });
        
        // Retornar máximo 50 items
        return array_slice($activity, 0, 50);
    } catch (Exception $e) {
        error_log("Error in getActivity: " . $e->getMessage());
        return [];
    }
}

/**
 * Get referral statistics for admin panel
 */
function getReferralStats($db) {
    try {
        $userCols = $db->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
        $hasReferralCols = in_array('referral_code', $userCols) && in_array('referred_by', $userCols);
        
        if (!$hasReferralCols) {
            return [
                'success' => false,
                'error' => 'Referral columns not found. Please run the migration.',
                'total_referrals' => 0,
                'referral_trials' => 0,
                'referrers' => [],
                'recent_referrals' => []
            ];
        }
        
        // Total referrals
        $totalReferrals = (int)$db->query("SELECT COUNT(*) FROM users WHERE referred_by IS NOT NULL AND referred_by != ''")->fetchColumn();
        
        // Users currently on referral trial (have bonus days)
        $referralTrials = (int)$db->query("SELECT COUNT(*) FROM users WHERE referral_bonus_days > 0")->fetchColumn();
        
        // Total bonus days given out
        $totalBonusDays = (int)$db->query("SELECT COALESCE(SUM(referral_bonus_days), 0) FROM users")->fetchColumn();
        
        // Top referrers
        $topReferrers = $db->query("
            SELECT 
                u.email,
                u.referral_code,
                COALESCE(u.referral_bonus_days, 0) as bonus_days,
                COALESCE(u.bootcamp_discount, 0) as bootcamp_discount,
                (SELECT COUNT(*) FROM users u2 WHERE u2.referred_by = u.referral_code) as referral_count
            FROM users u
            WHERE u.referral_code IS NOT NULL
            HAVING referral_count > 0
            ORDER BY referral_count DESC
            LIMIT 20
        ")->fetchAll(PDO::FETCH_ASSOC);
        
        // Recent referrals
        $recentReferrals = $db->query("
            SELECT 
                u.email as referred_email,
                u.referred_by as referral_code,
                u.created_at,
                COALESCE(u.referral_bonus_days, 0) as bonus_days,
                (SELECT email FROM users u2 WHERE u2.referral_code = u.referred_by LIMIT 1) as referrer_email,
                (SELECT status FROM subscribers s WHERE s.email = u.email LIMIT 1) as subscription_status
            FROM users u
            WHERE u.referred_by IS NOT NULL AND u.referred_by != ''
            ORDER BY u.created_at DESC
            LIMIT 50
        ")->fetchAll(PDO::FETCH_ASSOC);
        
        return [
            'success' => true,
            'total_referrals' => $totalReferrals,
            'referral_trials' => $referralTrials,
            'total_bonus_days' => $totalBonusDays,
            'top_referrers' => $topReferrers,
            'recent_referrals' => $recentReferrals
        ];
    } catch (Exception $e) {
        error_log("Error in getReferralStats: " . $e->getMessage());
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

function getSubscriberDetail($db, $id) {
    $stmt = $db->prepare("
        SELECT s.*, u.google_id, u.last_login
        FROM subscribers s
        LEFT JOIN users u ON s.email = u.email
        WHERE s.id = ?
    ");
    $stmt->execute([$id]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$subscriber) {
        return ['error' => 'Subscriber not found'];
    }
    
    // Historial de pagos (si existe tabla)
    $payments = [];
    try {
        $stmt = $db->prepare("SELECT * FROM payment_history WHERE subscriber_id = ? ORDER BY created_at DESC");
        $stmt->execute([$id]);
        $payments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        // Tabla no existe
    }
    
    return [
        'subscriber' => $subscriber,
        'payments' => $payments
    ];
}

function updateSubscriber($db, $data) {
    if (!isset($data['id'])) {
        return ['error' => 'Subscriber ID required'];
    }
    
    $allowedFields = ['status', 'name', 'subscription_end', 'next_payment_date', 'notes'];
    $updates = [];
    $params = [];
    
    foreach ($allowedFields as $field) {
        if (isset($data[$field])) {
            $updates[] = "$field = ?";
            $params[] = $data[$field];
        }
    }
    
    if (empty($updates)) {
        return ['error' => 'No valid fields to update'];
    }
    
    $params[] = $data['id'];
    $sql = "UPDATE subscribers SET " . implode(', ', $updates) . ", updated_at = NOW() WHERE id = ?";
    
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    
    return ['success' => true, 'message' => 'Subscriber updated'];
}

function getApiUsage($db) {
    // Leer archivos de rate limit para obtener uso de API
    $tempDir = sys_get_temp_dir();
    $files = glob($tempDir . '/dataset_rate_limit_*');
    
    $usage = [];
    foreach ($files as $file) {
        $data = json_decode(file_get_contents($file), true);
        if ($data) {
            $usage[] = [
                'ip_hash' => basename($file),
                'count' => $data['count'],
                'reset_at' => date('c', $data['reset'])
            ];
        }
    }
    
    return [
        'api_usage' => $usage,
        'total_requests_today' => array_sum(array_column($usage, 'count'))
    ];
}

function addSubscriber($db, $data) {
    if (!isset($data['email']) || empty($data['email'])) {
        return ['error' => 'Email es requerido'];
    }
    
    $email = trim($data['email']);
    $name = isset($data['name']) ? trim($data['name']) : '';
    $accessType = isset($data['access_type']) ? $data['access_type'] : 'subscription';
    
    // Determinar qué accesos dar
    $giveSubscription = ($accessType === 'subscription' || $accessType === 'both');
    $giveBootcamp = ($accessType === 'bootcamp' || $accessType === 'both');
    
    $subscriberId = null;
    
    // Si da acceso a suscripción, crear/actualizar en subscribers
    if ($giveSubscription) {
        // Verificar si ya existe como suscriptor
        $stmt = $db->prepare("SELECT id FROM subscribers WHERE email = ?");
        $stmt->execute([$email]);
        $existingSub = $stmt->fetch();
        
        if ($existingSub) {
            // Actualizar a activo si ya existe
            $stmt = $db->prepare("UPDATE subscribers SET status = 'active', updated_at = NOW() WHERE id = ?");
            $stmt->execute([$existingSub['id']]);
            $subscriberId = $existingSub['id'];
        } else {
            // Crear suscriptor
            $stmt = $db->prepare("
                INSERT INTO subscribers (
                    email, name, status, 
                    subscription_start, subscription_end, 
                    next_payment_date, last_payment_date,
                    amount, currency, created_at, updated_at
                ) VALUES (
                    ?, ?, 'active',
                    NOW(), DATE_ADD(NOW(), INTERVAL 1 MONTH),
                    DATE_ADD(NOW(), INTERVAL 1 MONTH), NOW(),
                    20.00, 'USD', NOW(), NOW()
                )
            ");
            $stmt->execute([$email, $name]);
            $subscriberId = $db->lastInsertId();
        }
    }
    
    // Verificar/crear usuario
    $stmt = $db->prepare("SELECT id, bootcamp_access FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $existingUser = $stmt->fetch();
    
    $tempPassword = null;
    $userCreated = false;
    
    if (!$existingUser) {
        // Generar contraseña temporal
        $tempPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 8);
        $hashedPassword = password_hash($tempPassword, PASSWORD_DEFAULT);
        
        // Crear usuario con bootcamp_access si corresponde
        $stmt = $db->prepare("INSERT INTO users (email, name, password_hash, email_verified, is_active, bootcamp_access, created_at) VALUES (?, ?, ?, 1, 1, ?, NOW())");
        $stmt->execute([$email, $name, $hashedPassword, $giveBootcamp ? 1 : 0]);
        $userCreated = true;
    } else {
        // Actualizar bootcamp_access si corresponde
        if ($giveBootcamp && !$existingUser['bootcamp_access']) {
            $stmt = $db->prepare("UPDATE users SET bootcamp_access = 1 WHERE id = ?");
            $stmt->execute([$existingUser['id']]);
        }
    }
    
    // Determinar mensaje según tipo de acceso
    $accessDescription = '';
    if ($giveSubscription && $giveBootcamp) {
        $accessDescription = 'Academia Premium + Bootcamp';
    } elseif ($giveSubscription) {
        $accessDescription = 'Academia Premium';
    } else {
        $accessDescription = 'Bootcamp';
    }
    
    $response = [
        'success' => true,
        'subscriber_id' => $subscriberId,
        'access_type' => $accessType,
        'access_description' => $accessDescription,
        'message' => "Usuario $email agregado con acceso a: $accessDescription",
        'user_created' => $userCreated,
        'login_url' => 'https://iansaura.com/auth'
    ];
    
    // Solo incluir contraseña temporal si se creó un usuario nuevo
    if ($tempPassword) {
        $response['temp_password'] = $tempPassword;
        $response['instructions'] = "El usuario puede iniciar sesión con email: $email y contraseña: $tempPassword (recomendá que la cambie)";
    } else {
        $response['instructions'] = "El usuario ya existe. Puede iniciar sesión con su email y contraseña existente.";
    }
    
    return $response;
}

function deleteSubscriber($db, $data) {
    if (!isset($data['id'])) {
        return ['error' => 'ID es requerido'];
    }
    
    $id = intval($data['id']);
    
    // Obtener email antes de eliminar (para logging)
    $stmt = $db->prepare("SELECT email FROM subscribers WHERE id = ?");
    $stmt->execute([$id]);
    $subscriber = $stmt->fetch();
    
    if (!$subscriber) {
        return ['error' => 'Suscriptor no encontrado'];
    }
    
    // Eliminar suscriptor
    $stmt = $db->prepare("DELETE FROM subscribers WHERE id = ?");
    $stmt->execute([$id]);
    
    return [
        'success' => true,
        'message' => "Suscriptor {$subscriber['email']} eliminado"
    ];
}

/**
 * Actualizar permisos de un usuario existente
 * Permite dar/quitar acceso a suscripción y bootcamp directamente
 */
function updateUserPermissions($db, $data) {
    $userId = $data['user_id'] ?? null;
    $email = $data['email'] ?? null;
    $subscribed = isset($data['subscribed']) ? (bool)$data['subscribed'] : null;
    $bootcampAccess = isset($data['bootcamp_access']) ? (bool)$data['bootcamp_access'] : null;
    
    if (!$userId && !$email) {
        return ['error' => 'Se requiere user_id o email'];
    }
    
    // Check which columns exist
    $userCols = $db->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
    $hasSubscribedCol = in_array('subscribed', $userCols);
    $hasBootcampCol = in_array('bootcamp_access', $userCols);
    
    // Buscar usuario
    if ($userId) {
        $stmt = $db->prepare("SELECT id, email, name FROM users WHERE id = ?");
        $stmt->execute([$userId]);
    } else {
        $stmt = $db->prepare("SELECT id, email, name FROM users WHERE email = ?");
        $stmt->execute([$email]);
    }
    
    $user = $stmt->fetch();
    
    if (!$user) {
        return ['error' => 'Usuario no encontrado'];
    }
    
    $updates = [];
    $params = [];
    
    // Actualizar subscribed en users (si la columna existe)
    if ($subscribed !== null) {
        if ($hasSubscribedCol) {
            $updates[] = 'subscribed = ?';
            $params[] = $subscribed ? 1 : 0;
        }
        
        // También actualizar/crear en subscribers table
        if ($subscribed) {
            // Verificar si ya existe
            $stmt = $db->prepare("SELECT id, payment_type FROM subscribers WHERE email = ?");
            $stmt->execute([$user['email']]);
            $existingSub = $stmt->fetch();
            
            if ($existingSub) {
                // Si no tiene payment_type, ponerle invited_permanent
                $updatePaymentType = empty($existingSub['payment_type']) ? ", payment_type = 'invited_permanent'" : "";
                $stmt = $db->prepare("UPDATE subscribers SET status = 'active'{$updatePaymentType}, updated_at = NOW() WHERE id = ?");
                $stmt->execute([$existingSub['id']]);
            } else {
                // Crear nuevo subscriber con payment_type = invited_permanent (admin manual grant)
                $stmt = $db->prepare("
                    INSERT INTO subscribers (email, name, status, payment_type, subscription_start, subscription_end, amount, currency, notes, created_at, updated_at)
                    VALUES (?, ?, 'active', 'invited_permanent', NOW(), NULL, 0.00, 'USD', 'Acceso otorgado manualmente desde Admin', NOW(), NOW())
                ");
                $stmt->execute([$user['email'], $user['name']]);
            }
        } else {
            // Desactivar suscripción
            $stmt = $db->prepare("UPDATE subscribers SET status = 'cancelled', updated_at = NOW() WHERE email = ?");
            $stmt->execute([$user['email']]);
        }
    }
    
    // Actualizar bootcamp_access (si la columna existe)
    if ($bootcampAccess !== null && $hasBootcampCol) {
        $updates[] = 'bootcamp_access = ?';
        $params[] = $bootcampAccess ? 1 : 0;
        
        // Si se da acceso al bootcamp, agregarlo a bootcamp_students
        if ($bootcampAccess) {
            ensureBootcampTable($db);
            $stmt = $db->prepare("SELECT id FROM bootcamp_students WHERE email = ?");
            $stmt->execute([$user['email']]);
            if (!$stmt->fetch()) {
                $stmt = $db->prepare("
                    INSERT INTO bootcamp_students (email, name, edition, amount_paid, amount_total, payment_status, has_platform_access)
                    VALUES (?, ?, 3, 0, 350, 'pending', 1)
                ");
                $stmt->execute([$user['email'], $user['name'] ?? '']);
            }
        }
    }
    
    // Si hay updates para la tabla users, ejecutarlos
    if (!empty($updates)) {
        $params[] = $user['id'];
        $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE id = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
    }
    
    // Obtener estado actualizado desde subscribers
    $stmt = $db->prepare("SELECT status FROM subscribers WHERE email = ?");
    $stmt->execute([$user['email']]);
    $subStatus = $stmt->fetch();
    $isSubscribed = $subStatus && $subStatus['status'] === 'active';
    
    // Obtener bootcamp_access si existe
    $hasBootcamp = false;
    if ($hasBootcampCol) {
        $stmt = $db->prepare("SELECT bootcamp_access FROM users WHERE id = ?");
        $stmt->execute([$user['id']]);
        $bootcampResult = $stmt->fetch();
        $hasBootcamp = $bootcampResult && $bootcampResult['bootcamp_access'];
    }
    
    $updatedUser = [
        'id' => $user['id'],
        'email' => $user['email'],
        'name' => $user['name'],
        'subscribed' => $isSubscribed,
        'bootcamp_access' => $hasBootcamp
    ];
    
    $accessList = [];
    if ($isSubscribed) $accessList[] = 'Academia Premium';
    if ($hasBootcamp) $accessList[] = 'Bootcamp';
    
    return [
        'success' => true,
        'user' => $updatedUser,
        'message' => "Permisos actualizados para {$user['email']}: " . (empty($accessList) ? 'Sin acceso' : implode(' + ', $accessList))
    ];
}

/**
 * Eliminar un usuario completamente
 * También elimina su suscripción y datos relacionados
 */
function deleteUser($db, $data) {
    $userId = $data['user_id'] ?? null;
    $email = $data['email'] ?? null;
    
    if (!$userId && !$email) {
        return ['error' => 'Se requiere user_id o email'];
    }
    
    // Buscar usuario
    if ($userId) {
        $stmt = $db->prepare("SELECT id, email, name FROM users WHERE id = ?");
        $stmt->execute([$userId]);
    } else {
        $stmt = $db->prepare("SELECT id, email, name FROM users WHERE email = ?");
        $stmt->execute([$email]);
    }
    
    $user = $stmt->fetch();
    
    if (!$user) {
        return ['error' => 'Usuario no encontrado'];
    }
    
    $userEmail = $user['email'];
    $userName = $user['name'] ?: $userEmail;
    
    // Eliminar datos relacionados
    try {
        // Eliminar de subscribers
        $stmt = $db->prepare("DELETE FROM subscribers WHERE email = ? OR user_id = ?");
        $stmt->execute([$userEmail, $user['id']]);
        
        // Eliminar de bootcamp_students
        $stmt = $db->prepare("DELETE FROM bootcamp_students WHERE email = ?");
        $stmt->execute([$userEmail]);
        
        // Eliminar progreso del usuario
        $stmt = $db->prepare("DELETE FROM user_progress WHERE user_id = ?");
        $stmt->execute([$user['id']]);
        
        // Eliminar actividad del usuario
        $stmt = $db->prepare("DELETE FROM user_activity WHERE user_id = ?");
        $stmt->execute([$user['id']]);
        
        // Eliminar conexiones de Discord pendientes
        $stmt = $db->prepare("DELETE FROM pending_discord_connections WHERE email = ?");
        $stmt->execute([$userEmail]);
        
    } catch (Exception $e) {
        // Algunas tablas pueden no existir, continuar
        error_log("Warning deleting related data: " . $e->getMessage());
    }
    
    // Eliminar el usuario
    $stmt = $db->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$user['id']]);
    
    return [
        'success' => true,
        'message' => "Usuario $userName ($userEmail) eliminado completamente"
    ];
}

function getUserProgress($db) {
    try {
        // Verificar si la tabla existe
        $tableCheck = $db->query("SHOW TABLES LIKE 'user_progress'");
        if ($tableCheck->rowCount() == 0) {
            return [
                'success' => false,
                'error' => 'La tabla user_progress no existe. Necesita ejecutar la migración.',
                'users' => []
            ];
        }
        
        // Obtener progreso de todos los usuarios con métricas extendidas
        $stmt = $db->query("
            SELECT 
                u.id,
                u.email,
                COALESCE(u.full_name, u.name, 'Sin nombre') as name,
                up.completed_steps,
                up.completed_projects,
                up.watched_videos,
                up.level_1_percent,
                up.level_2_percent,
                up.level_3_percent,
                up.xp,
                up.datacoins,
                up.current_streak,
                up.longest_streak,
                up.monthly_xp,
                up.last_activity,
                up.last_activity_date,
                up.created_at as progress_created,
                u.created_at,
                u.login_count,
                u.last_login,
                CASE WHEN s.status = 'active' OR s.status = 'trial' THEN 1 ELSE 0 END as is_subscriber,
                s.status as subscription_status,
                s.subscription_start,
                s.subscription_end
            FROM users u
            LEFT JOIN user_progress up ON u.email = up.email
            LEFT JOIN subscribers s ON u.email = s.email
            ORDER BY CASE WHEN up.last_activity IS NULL THEN 1 ELSE 0 END, up.last_activity DESC, u.created_at DESC
        ");
        
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result = [];
        
        foreach ($users as $user) {
            $completedStepsArr = json_decode($user['completed_steps'] ?? '[]', true) ?: [];
            $completedProjectsArr = json_decode($user['completed_projects'] ?? '[]', true) ?: [];
            $watchedVideosArr = json_decode($user['watched_videos'] ?? '[]', true) ?: [];
            
            $completedSteps = count($completedStepsArr);
            $completedProjects = count($completedProjectsArr);
            $watchedVideos = count($watchedVideosArr);
            
            $level1 = (int)($user['level_1_percent'] ?? 0);
            $level2 = (int)($user['level_2_percent'] ?? 0);
            $level3 = (int)($user['level_3_percent'] ?? 0);
            
            $hasProgress = $user['progress_created'] !== null;
            
            // Score mejorado
            $score = ($completedSteps * 10) + ($completedProjects * 25) + ($watchedVideos * 5);
            
            // Calcular días desde registro
            $createdAt = new DateTime($user['created_at']);
            $now = new DateTime();
            $daysSinceRegistration = $createdAt->diff($now)->days;
            
            // Calcular días inactivo
            $daysInactive = 0;
            if ($user['last_activity']) {
                $lastActive = new DateTime($user['last_activity']);
                $daysInactive = $lastActive->diff($now)->days;
            } else {
                $daysInactive = $daysSinceRegistration;
            }
            
            // Estado del usuario
            $userStatus = 'new';
            if ($daysInactive > 30) {
                $userStatus = 'churned';
            } elseif ($daysInactive > 14) {
                $userStatus = 'at_risk';
            } elseif ($daysInactive > 7) {
                $userStatus = 'cooling';
            } elseif ($hasProgress) {
                $userStatus = 'active';
            }
            
            // Engagement score (0-100)
            $engagementScore = 0;
            $engagementScore += min(30, $completedSteps * 2); // Max 30 pts
            $engagementScore += min(20, $completedProjects * 5); // Max 20 pts
            $engagementScore += min(15, $watchedVideos * 3); // Max 15 pts
            $engagementScore += min(20, ($user['current_streak'] ?? 0) * 4); // Max 20 pts
            $engagementScore += min(15, ($user['login_count'] ?? 0)); // Max 15 pts
            
            $result[] = [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'is_subscriber' => (bool)$user['is_subscriber'],
                'subscription_status' => $user['subscription_status'],
                'subscription_start' => $user['subscription_start'],
                'subscription_end' => $user['subscription_end'],
                'has_progress' => $hasProgress,
                'completed_steps' => $completedSteps,
                'completed_projects' => $completedProjects,
                'watched_videos' => $watchedVideos,
                'level_1_percent' => $level1,
                'level_2_percent' => $level2,
                'level_3_percent' => $level3,
                'xp' => (int)($user['xp'] ?? 0),
                'datacoins' => (int)($user['datacoins'] ?? 0),
                'current_streak' => (int)($user['current_streak'] ?? 0),
                'longest_streak' => (int)($user['longest_streak'] ?? 0),
                'monthly_xp' => (int)($user['monthly_xp'] ?? 0),
                'login_count' => (int)($user['login_count'] ?? 0),
                'score' => $score,
                'engagement_score' => $engagementScore,
                'user_status' => $userStatus,
                'days_since_registration' => $daysSinceRegistration,
                'days_inactive' => $daysInactive,
                'last_active' => $user['last_activity'],
                'last_login' => $user['last_login'],
                'created_at' => $user['created_at']
            ];
        }
        
        // Ordenar por engagement_score descendente
        usort($result, function($a, $b) {
            return $b['engagement_score'] - $a['engagement_score'];
        });
        
        // Calcular estadísticas agregadas
        $totalUsers = count($result);
        $activeUsers = count(array_filter($result, fn($u) => $u['user_status'] === 'active'));
        $atRiskUsers = count(array_filter($result, fn($u) => $u['user_status'] === 'at_risk'));
        $churnedUsers = count(array_filter($result, fn($u) => $u['user_status'] === 'churned'));
        $avgEngagement = $totalUsers > 0 ? round(array_sum(array_column($result, 'engagement_score')) / $totalUsers) : 0;
        
        return [
            'success' => true,
            'total' => $totalUsers,
            'with_progress' => count(array_filter($result, fn($u) => $u['has_progress'])),
            'stats' => [
                'active' => $activeUsers,
                'at_risk' => $atRiskUsers,
                'churned' => $churnedUsers,
                'avg_engagement' => $avgEngagement
            ],
            'users' => $result
        ];
        
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage(),
            'users' => []
        ];
    }
}

// ============================================
// MIGRATION: Add last_activity column to user_progress
// ============================================
function migrateLastActivityColumn($db) {
    try {
        $results = [];
        
        // Check if column exists
        $columns = $db->query("SHOW COLUMNS FROM user_progress")->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('last_activity', $columns)) {
            // Add the column
            $db->exec("ALTER TABLE user_progress ADD COLUMN last_activity DATETIME DEFAULT CURRENT_TIMESTAMP");
            $results[] = "✓ Added last_activity column";
            
            // Add index
            try {
                $db->exec("CREATE INDEX idx_last_activity ON user_progress(last_activity)");
                $results[] = "✓ Added index on last_activity";
            } catch (Exception $e) {
                $results[] = "⚠ Index may already exist: " . $e->getMessage();
            }
            
            // Initialize from updated_at or created_at
            $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL");
            $results[] = "✓ Initialized last_activity from existing timestamps";
            
        } else {
            $results[] = "ℹ Column last_activity already exists";
            
            // Still update NULL values
            $stmt = $db->query("SELECT COUNT(*) as null_count FROM user_progress WHERE last_activity IS NULL");
            $nullCount = $stmt->fetch(PDO::FETCH_ASSOC)['null_count'];
            
            if ($nullCount > 0) {
                $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL");
                $results[] = "✓ Updated $nullCount NULL last_activity values";
            } else {
                $results[] = "ℹ No NULL last_activity values to update";
            }
        }
        
        // Get stats
        $stmt = $db->query("
            SELECT 
                COUNT(*) as total_users,
                COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN 1 END) as active_24h,
                COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 1 HOUR) THEN 1 END) as active_1h,
                COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 15 MINUTE) THEN 1 END) as active_now,
                MIN(last_activity) as oldest_activity,
                MAX(last_activity) as newest_activity
            FROM user_progress
        ");
        $stats = $stmt->fetch(PDO::FETCH_ASSOC);
        
        return [
            'success' => true,
            'results' => $results,
            'stats' => $stats,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ];
    }
}

function getActivityTimeline($db) {
    try {
        // Set timezone to Argentina for consistent date calculations
        $db->exec("SET time_zone = '-03:00'");
        
        $result = [
            'success' => true,
            'today' => [],
            'by_hour' => [],
            'by_day' => [],
            'recent_activity' => [],
            'debug' => [] // Debug info para diagnosticar
        ];
        
        // Debug: Check current time and timezone
        $stmt = $db->query("SELECT NOW() as server_now, CURDATE() as server_date");
        $timeInfo = $stmt->fetch(PDO::FETCH_ASSOC);
        $result['debug']['server_now'] = $timeInfo['server_now'];
        $result['debug']['server_date'] = $timeInfo['server_date'];
        
        // Debug: Count total records with activity in last 7 days
        $stmt = $db->query("SELECT COUNT(*) as total_records, MIN(last_activity) as oldest, MAX(last_activity) as newest FROM user_progress WHERE last_activity IS NOT NULL");
        $debugCounts = $stmt->fetch(PDO::FETCH_ASSOC);
        $result['debug']['total_progress_records'] = $debugCounts['total_records'];
        $result['debug']['oldest_activity'] = $debugCounts['oldest'];
        $result['debug']['newest_activity'] = $debugCounts['newest'];
        
        // Actividad por hora - Show most recent day with data
        // First try today
        $stmt = $db->query("
            SELECT 
                HOUR(last_activity) as hour,
                COUNT(DISTINCT email) as users,
                SUM(xp) as total_xp
            FROM user_progress 
            WHERE DATE(last_activity) = CURDATE()
            GROUP BY HOUR(last_activity)
            ORDER BY hour ASC
        ");
        $result['by_hour'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result['hourly_date'] = date('Y-m-d');
        
        // If no data for today, find the most recent day with data
        if (empty($result['by_hour'])) {
            $stmt = $db->query("
                SELECT DATE(last_activity) as activity_date
                FROM user_progress 
                WHERE last_activity IS NOT NULL
                GROUP BY DATE(last_activity)
                ORDER BY activity_date DESC
                LIMIT 1
            ");
            $mostRecentDay = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($mostRecentDay) {
                $recentDate = $mostRecentDay['activity_date'];
                $stmt = $db->query("
                    SELECT 
                        HOUR(last_activity) as hour,
                        COUNT(DISTINCT email) as users,
                        SUM(xp) as total_xp
                    FROM user_progress 
                    WHERE DATE(last_activity) = '$recentDate'
                    GROUP BY HOUR(last_activity)
                    ORDER BY hour ASC
                ");
                $result['by_hour'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $result['hourly_date'] = $recentDate;
                $result['showing_most_recent_day'] = true;
            }
        }
        
        // Actividad últimos 7 días
        $stmt = $db->query("
            SELECT 
                DATE(last_activity) as date,
                COUNT(DISTINCT email) as users,
                SUM(xp) as total_xp
            FROM user_progress 
            WHERE last_activity >= DATE_SUB(NOW(), INTERVAL 7 DAY)
            GROUP BY DATE(last_activity)
            ORDER BY date DESC
        ");
        $result['by_day'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Usuarios activos hoy con detalle
        $stmt = $db->query("
            SELECT 
                up.email,
                COALESCE(u.full_name, u.name, 'Sin nombre') as name,
                up.xp,
                up.current_streak,
                up.last_activity,
                TIME(up.last_activity) as last_time,
                CASE WHEN s.status IN ('active', 'trial') THEN 1 ELSE 0 END as is_subscriber
            FROM user_progress up
            LEFT JOIN users u ON up.email = u.email
            LEFT JOIN subscribers s ON up.email = s.email
            WHERE DATE(up.last_activity) = CURDATE()
            ORDER BY up.last_activity DESC
            LIMIT 50
        ");
        $result['today'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Get the most recent activity timestamp for relative calculations
        $stmt = $db->query("SELECT MAX(last_activity) as max_activity FROM user_progress");
        $maxActivity = $stmt->fetch(PDO::FETCH_ASSOC)['max_activity'];
        $result['latest_activity'] = $maxActivity;
        
        // Actividad reciente - Show last 100 users by activity (not time-limited)
        $stmt = $db->query("
            SELECT 
                up.email,
                COALESCE(u.full_name, u.name, 'Sin nombre') as name,
                up.xp,
                up.monthly_xp,
                up.current_streak,
                up.level_1_percent,
                up.level_2_percent,
                up.level_3_percent,
                up.last_activity,
                TIMESTAMPDIFF(MINUTE, up.last_activity, NOW()) as minutes_ago,
                TIMESTAMPDIFF(HOUR, up.last_activity, NOW()) as hours_ago,
                CASE WHEN s.status IN ('active', 'trial') THEN 1 ELSE 0 END as is_subscriber,
                s.status as subscription_status
            FROM user_progress up
            LEFT JOIN users u ON up.email = u.email
            LEFT JOIN subscribers s ON up.email = s.email
            WHERE up.last_activity IS NOT NULL
            ORDER BY up.last_activity DESC
            LIMIT 100
        ");
        $result['recent_activity'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Stats - Calculate based on ACTUAL last activity, not NOW()
        // This handles the case where there's no recent activity
        $stmt = $db->query("
            SELECT 
                COUNT(DISTINCT email) as active_today,
                COUNT(DISTINCT CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 1 HOUR) THEN email END) as active_last_hour,
                COUNT(DISTINCT CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 15 MINUTE) THEN email END) as active_now,
                COUNT(DISTINCT CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN email END) as active_24h
            FROM user_progress 
            WHERE last_activity IS NOT NULL
        ");
        $todayStats = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $result['stats'] = [
            'active_today' => (int)($todayStats['active_today'] ?? 0),
            'active_last_hour' => (int)($todayStats['active_last_hour'] ?? 0),
            'active_now' => (int)($todayStats['active_now'] ?? 0),
            'active_24h' => (int)($todayStats['active_24h'] ?? 0)
        ];
        
        // If no recent activity (24h), show stats relative to the MOST RECENT day
        if ($result['stats']['active_24h'] == 0 && $maxActivity) {
            $stmt = $db->query("
                SELECT 
                    COUNT(DISTINCT email) as active_on_day,
                    COUNT(DISTINCT CASE WHEN last_activity >= DATE_SUB('$maxActivity', INTERVAL 1 HOUR) THEN email END) as active_last_hour_relative,
                    COUNT(DISTINCT CASE WHEN last_activity >= DATE_SUB('$maxActivity', INTERVAL 15 MINUTE) THEN email END) as active_now_relative
                FROM user_progress 
                WHERE DATE(last_activity) = DATE('$maxActivity')
            ");
            $relativeStats = $stmt->fetch(PDO::FETCH_ASSOC);
            $result['stats']['active_on_latest_day'] = (int)($relativeStats['active_on_day'] ?? 0);
            $result['stats']['showing_relative_to'] = $maxActivity;
            $result['stats']['note'] = 'No hay actividad reciente. Mostrando datos del último día con actividad.';
        }
        
        // Nuevos registros hoy
        $stmt = $db->query("
            SELECT COUNT(*) as new_users_today
            FROM users 
            WHERE DATE(created_at) = CURDATE()
        ");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $result['stats']['new_users_today'] = (int)($row['new_users_today'] ?? 0);
        
        // Nuevos suscriptores hoy
        $stmt = $db->query("
            SELECT COUNT(*) as new_subs_today
            FROM subscribers 
            WHERE DATE(created_at) = CURDATE() AND status IN ('active', 'trial')
        ");
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $result['stats']['new_subs_today'] = (int)($row['new_subs_today'] ?? 0);
        
        $result['generated_at'] = date('Y-m-d H:i:s');
        $result['timezone'] = 'America/Argentina/Buenos_Aires (UTC-3)';
        
        return $result;
        
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ];
    }
}

// ============================================
// BOOTCAMP FUNCTIONS
// ============================================

function ensureBootcampTable($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS bootcamp_students (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            name VARCHAR(255),
            edition INT DEFAULT 3,
            amount_paid DECIMAL(10,2) DEFAULT 0,
            amount_total DECIMAL(10,2) DEFAULT 350,
            payment_status ENUM('paid', 'partial', 'pending', 'invited') DEFAULT 'pending',
            has_platform_access BOOLEAN DEFAULT FALSE,
            deliveries JSON DEFAULT NULL,
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    ");
    
    // Add deliveries column if it doesn't exist
    try {
        $db->exec("ALTER TABLE bootcamp_students ADD COLUMN deliveries JSON DEFAULT NULL");
    } catch (Exception $e) {
        // Column already exists
    }
    
    // Update ENUM to include 'invited'
    try {
        $db->exec("ALTER TABLE bootcamp_students MODIFY COLUMN payment_status ENUM('paid', 'partial', 'pending', 'invited') DEFAULT 'pending'");
    } catch (Exception $e) {
        // Already updated
    }
}

function getBootcampStudents($db) {
    ensureBootcampTable($db);
    
    // Get students from bootcamp_students table
    $stmt = $db->query("
        SELECT bs.*, 
               u.id as user_id,
               COALESCE(u.full_name, u.name) as user_name,
               CASE WHEN u.bootcamp_access = 1 THEN 1 ELSE bs.has_platform_access END as has_platform_access
        FROM bootcamp_students bs
        LEFT JOIN users u ON bs.email = u.email
    ");
    $fromTable = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Get users with bootcamp_access that are NOT in bootcamp_students table
    $stmt = $db->query("
        SELECT 
            u.id as user_id,
            u.email,
            COALESCE(u.full_name, u.name, '') as name,
            3 as edition,
            0 as amount_paid,
            350 as amount_total,
            'pending' as payment_status,
            1 as has_platform_access,
            NULL as deliveries,
            NULL as notes,
            u.created_at,
            u.created_at as updated_at
        FROM users u
        LEFT JOIN bootcamp_students bs ON u.email = bs.email
        WHERE u.bootcamp_access = 1 AND bs.id IS NULL
    ");
    $fromUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Auto-add users with bootcamp_access to bootcamp_students table
    foreach ($fromUsers as $user) {
        try {
            $stmt = $db->prepare("
                INSERT INTO bootcamp_students (email, name, edition, amount_paid, amount_total, payment_status, has_platform_access)
                VALUES (?, ?, 3, 0, 350, 'pending', 1)
            ");
            $stmt->execute([$user['email'], $user['name']]);
            $user['id'] = $db->lastInsertId();
        } catch (Exception $e) {
            // Already exists, ignore
        }
    }
    
    // Merge and get all again
    $stmt = $db->query("
        SELECT bs.*, 
               u.id as user_id,
               COALESCE(u.full_name, u.name, bs.name) as display_name,
               CASE WHEN u.bootcamp_access = 1 THEN 1 ELSE bs.has_platform_access END as has_platform_access
        FROM bootcamp_students bs
        LEFT JOIN users u ON bs.email = u.email
        ORDER BY bs.edition DESC, bs.created_at DESC
    ");
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Parse deliveries JSON
    foreach ($students as &$student) {
        $student['deliveries'] = json_decode($student['deliveries'] ?? 'null', true) ?: [false,false,false,false,false,false,false,false];
        // Use display_name as name if name is empty
        if (empty($student['name'])) {
            $student['name'] = $student['display_name'] ?? '';
        }
    }
    
    return [
        'students' => $students,
        'total' => count($students)
    ];
}

function addBootcampStudent($db, $data) {
    ensureBootcampTable($db);
    
    $email = $data['email'] ?? null;
    $name = $data['name'] ?? '';
    $edition = $data['edition'] ?? 3;
    $amountPaid = $data['amount_paid'] ?? 0;
    $amountTotal = $data['amount_total'] ?? 350;
    $paymentStatus = $data['payment_status'] ?? 'pending';
    $notes = $data['notes'] ?? '';
    
    if (!$email) {
        return ['error' => 'Email es requerido'];
    }
    
    try {
        // Check if already exists
        $stmt = $db->prepare("SELECT id FROM bootcamp_students WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            return ['error' => 'Este email ya está registrado en bootcamp'];
        }
        
        $stmt = $db->prepare("
            INSERT INTO bootcamp_students (email, name, edition, amount_paid, amount_total, payment_status, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([$email, $name, $edition, $amountPaid, $amountTotal, $paymentStatus, $notes]);
        
        // If they paid something, give them platform access
        if ($amountPaid > 0 || $paymentStatus === 'paid') {
            // Check if user exists and grant bootcamp access
            $stmt = $db->prepare("UPDATE users SET bootcamp_access = 1 WHERE email = ?");
            $stmt->execute([$email]);
        }
        
        return [
            'success' => true,
            'id' => $db->lastInsertId(),
            'message' => "Estudiante $email agregado a Bootcamp Ed. $edition"
        ];
        
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function updateBootcampStudent($db, $data) {
    ensureBootcampTable($db);
    
    $id = $data['id'] ?? null;
    if (!$id) {
        return ['error' => 'ID es requerido'];
    }
    
    $edition = $data['edition'] ?? 3;
    $amountPaid = $data['amount_paid'] ?? 0;
    $amountTotal = $data['amount_total'] ?? 350;
    $paymentStatus = $data['payment_status'] ?? 'pending';
    $notes = $data['notes'] ?? '';
    
    try {
        $stmt = $db->prepare("
            UPDATE bootcamp_students 
            SET edition = ?, amount_paid = ?, amount_total = ?, payment_status = ?, notes = ?
            WHERE id = ?
        ");
        $stmt->execute([$edition, $amountPaid, $amountTotal, $paymentStatus, $notes, $id]);
        
        // Get email to update user access
        $stmt = $db->prepare("SELECT email FROM bootcamp_students WHERE id = ?");
        $stmt->execute([$id]);
        $email = $stmt->fetchColumn();
        
        // If they paid something, give them platform access
        if ($email && ($amountPaid > 0 || $paymentStatus === 'paid')) {
            $stmt = $db->prepare("UPDATE users SET bootcamp_access = 1 WHERE email = ?");
            $stmt->execute([$email]);
        }
        
        return [
            'success' => true,
            'message' => "Estudiante actualizado"
        ];
        
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function deleteBootcampStudent($db, $data) {
    ensureBootcampTable($db);
    
    $id = $data['id'] ?? null;
    if (!$id) {
        return ['error' => 'ID es requerido'];
    }
    
    try {
        // Get email before deleting
        $stmt = $db->prepare("SELECT email, name FROM bootcamp_students WHERE id = ?");
        $stmt->execute([$id]);
        $student = $stmt->fetch();
        
        if (!$student) {
            return ['error' => 'Estudiante no encontrado'];
        }
        
        // Delete the student
        $stmt = $db->prepare("DELETE FROM bootcamp_students WHERE id = ?");
        $stmt->execute([$id]);
        
        $name = $student['name'] ?: $student['email'];
        
        return [
            'success' => true,
            'message' => "Estudiante $name eliminado del bootcamp"
        ];
        
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function toggleDelivery($db, $data) {
    ensureBootcampTable($db);
    
    $studentId = $data['student_id'] ?? null;
    $deliveryIndex = $data['delivery_index'] ?? null;
    $completed = $data['completed'] ?? false;
    
    if (!$studentId || $deliveryIndex === null) {
        return ['error' => 'student_id y delivery_index son requeridos'];
    }
    
    try {
        // Get current deliveries
        $stmt = $db->prepare("SELECT deliveries FROM bootcamp_students WHERE id = ?");
        $stmt->execute([$studentId]);
        $current = $stmt->fetchColumn();
        
        $deliveries = json_decode($current ?? 'null', true) ?: [false,false,false,false,false,false,false,false];
        $deliveries[$deliveryIndex] = $completed;
        
        // Update
        $stmt = $db->prepare("UPDATE bootcamp_students SET deliveries = ? WHERE id = ?");
        $stmt->execute([json_encode($deliveries), $studentId]);
        
        return [
            'success' => true,
            'deliveries' => $deliveries
        ];
        
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function updateSubscriberType($db, $data) {
    $subscriberId = $data['subscriber_id'] ?? null;
    $paymentType = $data['payment_type'] ?? null;
    $notes = $data['notes'] ?? null;
    
    if (!$subscriberId) {
        return ['error' => 'Se requiere subscriber_id'];
    }
    
    // Valid payment types - all user types
    $validTypes = [
        'invited_permanent', 'invited_temporary', 
        'trial_with_card', 'trial_no_card',
        'gumroad', 'oneinfinite', 'free', 'paid', 'external',
        'invited', 'trial_free', 'trial_manual'
    ];
    
    if (!in_array($paymentType, $validTypes)) {
        return ['error' => 'Tipo de pago inválido: ' . $paymentType];
    }
    
    try {
        $stmt = $db->prepare("UPDATE subscribers SET payment_type = ?, notes = ? WHERE id = ?");
        $stmt->execute([$paymentType, $notes, $subscriberId]);
        
        return [
            'success' => true,
            'message' => "Tipo de pago actualizado a '$paymentType'"
        ];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function updateSubscriberFull($db, $data) {
    $subscriberId = $data['subscriber_id'] ?? null;
    $email = strtolower(trim($data['email'] ?? ''));
    $status = $data['status'] ?? 'active';
    $paymentType = $data['payment_type'] ?? 'gumroad';
    $subscriptionStart = $data['subscription_start'] ?? date('Y-m-d');
    $subscriptionEnd = $data['subscription_end'] ?? date('Y-m-d', strtotime('+30 days'));
    $notes = $data['notes'] ?? null;
    $secondaryEmail = $data['secondary_email'] ?? null;
    
    // Need either subscriber_id OR email
    if (!$subscriberId && !$email) {
        return ['error' => 'Se requiere subscriber_id o email'];
    }
    
    if (!in_array($status, ['active', 'trial', 'cancelled', 'expired', 'free'])) {
        return ['error' => 'Estado inválido'];
    }
    
    // Valid payment types - all user types
    $validTypes = [
        'invited_permanent', 'invited_temporary', 
        'trial_with_card', 'trial_no_card',
        'gumroad', 'oneinfinite', 'free', 'paid', 'external',
        'invited', 'trial_free', 'trial_manual'
    ];
    
    if (!in_array($paymentType, $validTypes)) {
        return ['error' => 'Tipo de pago inválido: ' . $paymentType];
    }
    
    // Validate secondary_email if provided
    if ($secondaryEmail && !filter_var($secondaryEmail, FILTER_VALIDATE_EMAIL)) {
        return ['error' => 'Email secundario inválido'];
    }
    
    try {
        // Get subscriber - by ID or create by email
        if ($subscriberId) {
            $stmt = $db->prepare("SELECT id, email FROM subscribers WHERE id = ?");
        $stmt->execute([$subscriberId]);
        $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            // Try to find by email first
            $stmt = $db->prepare("SELECT id, email FROM subscribers WHERE LOWER(email) = ?");
            $stmt->execute([$email]);
            $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
            
            // If not found, create new subscriber record
            if (!$subscriber) {
                // Get user name from users table
                $userStmt = $db->prepare("SELECT name FROM users WHERE LOWER(email) = ?");
                $userStmt->execute([$email]);
                $user = $userStmt->fetch(PDO::FETCH_ASSOC);
                $userName = $user ? $user['name'] : 'Sin nombre';
                
                $insertStmt = $db->prepare("
                    INSERT INTO subscribers (email, name, status, payment_type, subscription_start, subscription_end, notes, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
                ");
                $insertStmt->execute([$email, $userName, $status, $paymentType, $subscriptionStart, $subscriptionEnd, $notes]);
                
                $subscriberId = $db->lastInsertId();
                $subscriber = ['id' => $subscriberId, 'email' => $email];
                
                // Also update user's subscribed status
                $isSubscribed = in_array($status, ['active', 'trial']) ? 1 : 0;
                try {
                    $stmt = $db->prepare("UPDATE users SET subscribed = ? WHERE LOWER(email) = ?");
                    $stmt->execute([$isSubscribed, $email]);
                } catch (Exception $e) {
                    // Column might not exist
                }
                
                return [
                    'success' => true,
                    'message' => "Suscriptor CREADO: $email - Estado: $status, Tipo: $paymentType, Fin: $subscriptionEnd",
                    'created' => true
                ];
            }
            
            $subscriberId = $subscriber['id'];
        }
        
        if (!$subscriber) {
            return ['error' => 'Suscriptor no encontrado'];
        }
        
        // Check if secondary_email column exists
        $columns = $db->query("SHOW COLUMNS FROM subscribers LIKE 'secondary_email'")->fetch();
        $hasSecondaryEmail = (bool)$columns;
        
        // Update subscriber
        if ($hasSecondaryEmail) {
            $stmt = $db->prepare("
                UPDATE subscribers 
                SET status = ?, 
                    payment_type = ?, 
                    subscription_start = ?, 
                    subscription_end = ?,
                    notes = ?,
                    secondary_email = ?,
                    updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([
                $status, 
                $paymentType, 
                $subscriptionStart, 
                $subscriptionEnd,
                $notes,
                $secondaryEmail ?: null,
                $subscriberId
            ]);
        } else {
            $stmt = $db->prepare("
                UPDATE subscribers 
                SET status = ?, 
                    payment_type = ?, 
                    subscription_start = ?, 
                    subscription_end = ?,
                    notes = ?,
                    updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([
                $status, 
                $paymentType, 
                $subscriptionStart, 
                $subscriptionEnd,
                $notes,
                $subscriberId
            ]);
        }
        
        // Also update user's subscribed status
        $isSubscribed = in_array($status, ['active', 'trial']) ? 1 : 0;
        try {
            $stmt = $db->prepare("UPDATE users SET subscribed = ? WHERE email = ?");
            $stmt->execute([$isSubscribed, $subscriber['email']]);
        } catch (Exception $e) {
            // Column might not exist
        }
        
        return [
            'success' => true,
            'message' => "Suscriptor actualizado: {$subscriber['email']} - Estado: $status, Fin: $subscriptionEnd"
        ];
    } catch (Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

function checkTables($db) {
    $result = [];
    
    // Verificar tabla user_progress
    try {
        $stmt = $db->query("DESCRIBE user_progress");
        $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $result['user_progress'] = [
            'exists' => true,
            'columns' => array_column($columns, 'Field')
        ];
        
        // Contar registros
        $count = $db->query("SELECT COUNT(*) FROM user_progress")->fetchColumn();
        $result['user_progress']['count'] = (int)$count;
        
        // Ver algunos datos
        $sample = $db->query("SELECT * FROM user_progress LIMIT 3")->fetchAll(PDO::FETCH_ASSOC);
        $result['user_progress']['sample'] = $sample;
        
    } catch (Exception $e) {
        $result['user_progress'] = [
            'exists' => false,
            'error' => $e->getMessage()
        ];
    }
    
    return $result;
}

function getLeaderboard($db) {
    try {
        // Verificar si la tabla existe
        $tableCheck = $db->query("SHOW TABLES LIKE 'user_progress'");
        if ($tableCheck->rowCount() == 0) {
            return [
                'success' => false,
                'error' => 'La tabla user_progress no existe',
                'leaderboard' => [],
                'is_demo' => true
            ];
        }
        
        // Obtener top usuarios con progreso (usando email como join)
        $stmt = $db->query("
            SELECT 
                u.id,
                up.email,
                COALESCE(u.full_name, u.name, s.name, 'Anónimo') as name,
                up.completed_steps,
                up.completed_projects,
                up.watched_videos,
                up.level_1_percent,
                up.level_2_percent,
                up.level_3_percent,
                up.last_activity
            FROM user_progress up
            LEFT JOIN users u ON up.email = u.email
            LEFT JOIN subscribers s ON up.email = s.email
            ORDER BY up.last_activity DESC
            LIMIT 50
        ");
        
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $leaderboard = [];
        
        foreach ($users as $user) {
            $completedStepsArr = json_decode($user['completed_steps'] ?? '[]', true) ?: [];
            $completedProjectsArr = json_decode($user['completed_projects'] ?? '[]', true) ?: [];
            $watchedVideosArr = json_decode($user['watched_videos'] ?? '[]', true) ?: [];
            
            $completedSteps = count($completedStepsArr);
            $completedProjects = count($completedProjectsArr);
            $watchedVideos = count($watchedVideosArr);
            
            // Incluir aunque no tenga progreso para mostrar actividad
            $score = ($completedSteps * 10) + ($completedProjects * 25) + ($watchedVideos * 5);
            
            $leaderboard[] = [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'] ?? 'Anónimo',
                'initial' => strtoupper(substr($user['name'] ?? 'A', 0, 1)) . '.',
                'steps' => $completedSteps,
                'projects' => $completedProjects,
                'videos' => $watchedVideos,
                'level_1' => (int)($user['level_1_percent'] ?? 0),
                'level_2' => (int)($user['level_2_percent'] ?? 0),
                'level_3' => (int)($user['level_3_percent'] ?? 0),
                'score' => $score,
                'last_active' => $user['last_activity']
            ];
        }
        
        // Ordenar por score
        usort($leaderboard, function($a, $b) {
            return $b['score'] - $a['score'];
        });
        
        // Agregar posición y medallas
        foreach ($leaderboard as $idx => &$entry) {
            $entry['position'] = $idx + 1;
            $entry['medal'] = $idx === 0 ? '🥇' : ($idx === 1 ? '🥈' : ($idx === 2 ? '🥉' : ''));
        }
        
        return [
            'success' => true,
            'total' => count($leaderboard),
            'leaderboard' => $leaderboard,
            'is_demo' => false
        ];
        
    } catch (Exception $e) {
        return [
            'success' => false,
            'error' => $e->getMessage(),
            'leaderboard' => [],
            'is_demo' => true
        ];
    }
}

// ============================================
// TRIAL / PRUEBA GRATUITA
// ============================================

// Función para leer respuesta SMTP completa (multilinea)
function readSMTPResponse($socket) {
    $response = '';
    while (true) {
        $line = fgets($socket, 512);
        if ($line === false) break;
        $response .= $line;
        // Si el 4to caracter NO es '-', es la última línea
        if (strlen($line) < 4 || $line[3] !== '-') {
            break;
        }
    }
    return $response;
}

// Función de envío de email SMTP (corregida para leer multilinea)
function sendTrialEmailSMTP($to, $subject, $body) {
    $host = 'c2621673.ferozo.com';
    $port = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $username = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $password = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    
    $socket = @fsockopen("ssl://$host", $port, $errno, $errstr, 30);
    
    if (!$socket) {
        error_log("Trial SMTP Connection failed: $errstr ($errno)");
        return false;
    }
    
    // Read server greeting (puede ser multilinea 220-)
    $response = readSMTPResponse($socket);
    if (substr($response, 0, 3) !== '220') {
        fclose($socket);
        error_log("SMTP Greeting failed: $response");
        return false;
    }
    
    // EHLO command (respuesta multilinea 250-)
    fputs($socket, "EHLO iansaura.com\r\n");
    $response = readSMTPResponse($socket);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        error_log("SMTP EHLO failed: $response");
        return false;
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '334') {
        fclose($socket);
        error_log("SMTP AUTH failed: $response");
        return false;
    }
    
    // Send username
    fputs($socket, base64_encode($username) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '334') {
        fclose($socket);
        error_log("SMTP Username failed: $response");
        return false;
    }
    
    // Send password
    fputs($socket, base64_encode($password) . "\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '235') {
        fclose($socket);
        error_log("SMTP Password failed: $response");
        return false;
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <$username>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        error_log("SMTP MAIL FROM failed: $response");
        return false;
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '250') {
        fclose($socket);
        error_log("SMTP RCPT TO failed: $response");
        return false;
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    if (substr($response, 0, 3) !== '354') {
        fclose($socket);
        error_log("SMTP DATA failed: $response");
        return false;
    }
    
    // Email headers and body
    $email = "From: Ian Saura <$username>\r\n";
    $email .= "To: <$to>\r\n";
    $email .= "Reply-To: <$username>\r\n";
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
        error_log("SMTP Send failed: $response");
        return false;
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    error_log("Trial email sent successfully to: $to");
    return true;
}

/**
 * Agrega un suscriptor manualmente (para pagos externos)
 */
function addManualSubscriber($db, $data) {
    $email = $data['email'] ?? '';
    $name = $data['name'] ?? '';
    $accessType = $data['access_type'] ?? 'subscription'; // subscription, bootcamp, both
    $subscriptionMonths = intval($data['subscription_months'] ?? 1); // 1, 6, 12
    
    if (empty($email)) {
        return ['success' => false, 'error' => 'Email requerido'];
    }
    
    // Validar meses
    if (!in_array($subscriptionMonths, [1, 6, 12])) {
        $subscriptionMonths = 1;
    }
    
    // Determinar precio según período
    $priceMap = [1 => 20, 6 => 150, 12 => 240];
    $amount = $priceMap[$subscriptionMonths];
    $planType = $subscriptionMonths === 1 ? 'monthly' : ($subscriptionMonths === 6 ? 'semi-annual' : 'annual');
    
    try {
        $tempPassword = null;
        $userCreated = false;
        
        // Verificar si el usuario ya existe
        $stmt = $db->prepare("SELECT id, name, full_name FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $userId = null;
        
        if ($existingUser) {
            $userId = $existingUser['id'];
            if (empty($name)) {
                $name = $existingUser['full_name'] ?? $existingUser['name'] ?? 'Usuario';
            }
        } else {
            // Crear usuario nuevo con contraseña temporal
            $tempPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 10);
            $hashedPassword = password_hash($tempPassword, PASSWORD_DEFAULT);
            
            $nameParts = explode(' ', $name, 2);
            $firstName = $nameParts[0] ?: 'Usuario';
            $lastName = $nameParts[1] ?? '';
            
            $stmt = $db->prepare("
                INSERT INTO users (email, password_hash, name, first_name, last_name, full_name, email_verified_at, is_active, created_at)
                VALUES (?, ?, ?, ?, ?, ?, NOW(), 1, NOW())
            ");
            $stmt->execute([$email, $hashedPassword, $name ?: 'Usuario', $firstName, $lastName, $name ?: 'Usuario']);
            $userId = $db->lastInsertId();
            $userCreated = true;
        }
        
        // Calcular fecha de expiración
        $subscriptionEnd = date('Y-m-d H:i:s', strtotime("+{$subscriptionMonths} months"));
        
        // Manejar suscripción si aplica
        if ($accessType === 'subscription' || $accessType === 'both') {
            // Verificar si ya tiene suscripción
            $stmt = $db->prepare("SELECT id FROM subscribers WHERE email = ?");
            $stmt->execute([$email]);
            $existingSub = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($existingSub) {
                // Actualizar suscripción existente
                $stmt = $db->prepare("
                    UPDATE subscribers SET 
                        status = 'active',
                        user_id = ?,
                        name = ?,
                        subscription_end = ?,
                        amount = ?,
                        plan_type = ?,
                        payment_type = 'external',
                        notes = CONCAT(COALESCE(notes, ''), ' [Manual: {$subscriptionMonths} meses - ', NOW(), ']'),
                        updated_at = NOW()
                    WHERE email = ?
                ");
                $stmt->execute([$userId, $name, $subscriptionEnd, $amount, $planType, $email]);
            } else {
                // Crear nueva suscripción
                $stmt = $db->prepare("
                    INSERT INTO subscribers (user_id, email, name, status, subscription_start, subscription_end, amount, currency, plan_type, payment_type, notes, created_at, updated_at)
                    VALUES (?, ?, ?, 'active', NOW(), ?, ?, 'USD', ?, 'external', ?, NOW(), NOW())
                ");
                $stmt->execute([$userId, $email, $name, $subscriptionEnd, $amount, $planType, "Manual: {$subscriptionMonths} meses"]);
            }
            
            // Marcar usuario como suscrito
            $columns = $db->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
            if (in_array('subscribed', $columns)) {
                $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE id = ?");
                $stmt->execute([$userId]);
            }
        }
        
        // Manejar bootcamp si aplica
        if ($accessType === 'bootcamp' || $accessType === 'both') {
            // Verificar si ya está en bootcamp
            $stmt = $db->prepare("SELECT id FROM bootcamp_students WHERE email = ?");
            $stmt->execute([$email]);
            $existingBootcamp = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$existingBootcamp) {
                // Agregar al bootcamp
                $stmt = $db->prepare("
                    INSERT INTO bootcamp_students (user_id, email, name, edition, status, payment_status, created_at)
                    VALUES (?, ?, ?, 3, 'active', 'paid', NOW())
                ");
                $stmt->execute([$userId, $email, $name]);
            }
            
            // Marcar acceso a bootcamp
            if (in_array('has_bootcamp_access', $columns ?? [])) {
                $stmt = $db->prepare("UPDATE users SET has_bootcamp_access = 1 WHERE id = ?");
                $stmt->execute([$userId]);
            }
        }
        
        $result = [
            'success' => true,
            'message' => "Suscriptor agregado: {$email}",
            'user_created' => $userCreated,
            'access_type' => $accessType,
            'subscription_months' => $subscriptionMonths,
            'subscription_end' => $subscriptionEnd,
            'amount' => $amount
        ];
        
        if ($tempPassword) {
            $result['temp_password'] = $tempPassword;
        }
        
        return $result;
        
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

/**
 * Asigna manualmente el rol de Discord Premium a un suscriptor
 */
function assignDiscordRole($db, $data) {
    $email = $data['email'] ?? '';
    
    if (empty($email)) {
        return ['success' => false, 'error' => 'Email requerido'];
    }
    
    try {
        // Buscar el suscriptor
        $stmt = $db->prepare("
            SELECT id, email, name, status, discord_user_id, discord_role_assigned 
            FROM subscribers 
            WHERE LOWER(email) = LOWER(?)
        ");
        $stmt->execute([$email]);
        $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$subscriber) {
            return ['success' => false, 'error' => 'Suscriptor no encontrado'];
        }
        
        // Verificar que tiene Discord conectado
        if (empty($subscriber['discord_user_id'])) {
            return ['success' => false, 'error' => 'El usuario no tiene Discord conectado. Debe conectar Discord primero desde /members'];
        }
        
        // Verificar que tiene acceso (active o trial)
        if (!in_array($subscriber['status'], ['active', 'trial'])) {
            return ['success' => false, 'error' => "El usuario tiene status '{$subscriber['status']}'. Solo se puede asignar rol a usuarios 'active' o 'trial'"];
        }
        
        // Verificar si ya tiene el rol
        if ($subscriber['discord_role_assigned']) {
            return ['success' => true, 'message' => 'El usuario ya tiene el rol de Discord asignado', 'already_assigned' => true];
        }
        
        // Cargar el bot de Discord
        require_once 'discord-bot.php';
        $discord = new DiscordBot();
        
        // Intentar asignar el rol
        $discord->addSubscriberRole($subscriber['discord_user_id']);
        
        // Actualizar en la base de datos
        $stmt = $db->prepare("
            UPDATE subscribers 
            SET discord_role_assigned = TRUE, updated_at = NOW() 
            WHERE id = ?
        ");
        $stmt->execute([$subscriber['id']]);
        
        // Registrar en el historial
        $stmt = $db->prepare("
            INSERT INTO subscription_history (subscriber_id, event_type, details)
            VALUES (?, 'discord_role_added', ?)
        ");
        $stmt->execute([
            $subscriber['id'],
            json_encode(['assigned_by' => 'admin_manual', 'timestamp' => date('Y-m-d H:i:s')])
        ]);
        
        return [
            'success' => true, 
            'message' => "Rol de Discord Premium asignado correctamente a {$subscriber['name']} ({$subscriber['email']})",
            'discord_user_id' => $subscriber['discord_user_id']
        ];
        
    } catch (Exception $e) {
        error_log("Error assigning Discord role: " . $e->getMessage());
        return ['success' => false, 'error' => 'Error al asignar rol: ' . $e->getMessage()];
    }
}

/**
 * Otorga acceso trial a un usuario
 * @param trial_type: 'manual' (invitación sin tarjeta), 'gumroad' (con tarjeta Gumroad), o 'oneinfinite' (legacy)
 */
function grantTrial($db, $data) {
    $email = $data['email'] ?? '';
    $days = $data['days'] ?? 7;
    $trialType = $data['trial_type'] ?? 'manual'; // 'manual', 'gumroad', o 'oneinfinite'
    
    if (empty($email)) {
        return ['success' => false, 'error' => 'Email requerido'];
    }
    
    // Validate trial_type - convert oneinfinite to gumroad
    if ($trialType === 'oneinfinite') {
        $trialType = 'gumroad'; // Migrar a Gumroad
    }
    if (!in_array($trialType, ['manual', 'gumroad'])) {
        $trialType = 'manual';
    }
    
    // Determine payment_type based on trial_type
    $paymentType = $trialType === 'gumroad' ? 'gumroad' : 'manual';
    $trialLabel = $trialType === 'gumroad' ? 'Trial Gumroad (con tarjeta)' : 'Trial Manual (sin tarjeta)';
    
    try {
        // Verificar si el usuario existe
        $stmt = $db->prepare("SELECT id, email, name, full_name FROM users WHERE LOWER(email) = LOWER(?)");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            return ['success' => false, 'error' => 'Usuario no encontrado'];
        }
        
        // Calcular fecha de expiración
        $trialEnd = date('Y-m-d H:i:s', strtotime("+{$days} days"));
        $trialEndDate = date('Y-m-d', strtotime("+{$days} days"));
        
        // Verificar si ya tiene suscripción
        $stmt = $db->prepare("SELECT id, status FROM subscribers WHERE LOWER(email) = LOWER(?)");
        $stmt->execute([$email]);
        $existingSub = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($existingSub && $existingSub['status'] === 'active') {
            return ['success' => false, 'error' => 'El usuario ya tiene una suscripción activa paga'];
        }
        
        $userName = $user['full_name'] ?? $user['name'] ?? 'Usuario';
        
        if ($existingSub) {
            // Actualizar suscripción existente (trial o expirada)
            $isUpdate = $existingSub['status'] === 'trial';
            $noteAction = $isUpdate ? "{$trialLabel} actualizado a {$days} días" : "{$trialLabel} {$days} días otorgado";
            
            $stmt = $db->prepare("
                UPDATE subscribers SET 
                    status = 'trial',
                    subscription_end = ?,
                    payment_type = ?,
                    plan_type = 'trial',
                    trial_ends_at = ?,
                    notes = CONCAT(COALESCE(notes, ''), ' [{$noteAction}: ', NOW(), ']'),
                    updated_at = NOW()
                WHERE LOWER(email) = LOWER(?)
            ");
            $stmt->execute([$trialEnd, $paymentType, $trialEndDate, $email]);
        } else {
            // Crear nueva suscripción trial
            $stmt = $db->prepare("
                INSERT INTO subscribers (email, name, status, subscription_start, subscription_end, payment_type, plan_type, trial_ends_at, notes, created_at, updated_at)
                VALUES (?, ?, 'trial', NOW(), ?, ?, 'trial', ?, ?, NOW(), NOW())
            ");
            $stmt->execute([$email, $userName, $trialEnd, $paymentType, $trialEndDate, "{$trialLabel} {$days} días"]);
        }
        
        // Actualizar campo subscribed en users
        $columns = $db->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
        if (in_array('subscribed', $columns)) {
            $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE LOWER(email) = LOWER(?)");
            $stmt->execute([$email]);
        }
        
        $action = isset($isUpdate) && $isUpdate ? 'actualizado' : 'otorgado';
        return [
            'success' => true, 
            'message' => "{$trialLabel} de {$days} días {$action} a {$email}",
            'trial_end' => $trialEnd,
            'trial_type' => $trialType,
            'was_update' => isset($isUpdate) && $isUpdate
        ];
        
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

/**
 * Envía email de invitación con trial gratuito
 */
function sendTrialInvitation($db, $data) {
    $email = $data['email'] ?? '';
    $grantAccess = $data['grant_access'] ?? false;
    $days = $data['days'] ?? 7;
    $trialType = $data['trial_type'] ?? 'manual'; // 'manual' or 'gumroad'
    if ($trialType === 'oneinfinite') $trialType = 'gumroad'; // Migrate legacy
    
    if (empty($email)) {
        return ['success' => false, 'error' => 'Email requerido'];
    }
    
    try {
        // Obtener datos del usuario
        $stmt = $db->prepare("SELECT id, email, name, full_name FROM users WHERE LOWER(email) = LOWER(?)");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            return ['success' => false, 'error' => 'Usuario no encontrado'];
        }
        
        $userName = $user['full_name'] ?? $user['name'] ?? 'Crack';
        $firstName = explode(' ', $userName)[0];
        
        // Si grant_access es true, otorgar trial
        $trialEnd = null;
        if ($grantAccess) {
            $result = grantTrial($db, ['email' => $email, 'days' => $days, 'trial_type' => $trialType]);
            if (!$result['success']) {
                return $result;
            }
            $trialEnd = $result['trial_end'];
        }
        
        // Enviar email usando el mismo método que contact.php
        $trialEndFormatted = $trialEnd ? date('d/m/Y', strtotime($trialEnd)) : date('d/m/Y', strtotime("+{$days} days"));
        
        $daysText = $days == 1 ? "1 DIA" : "{$days} DIAS";
        $subject = "Regalo especial: {$daysText} GRATIS en la Academia de Data Engineering";
        
        // Usar texto plano como contact.php (funciona mejor)
        $emailBody = "
Hola {$firstName}!

Soy Ian. Vi que te registraste en mi web hace un tiempo y queria darte algo especial por ser de los primeros.

TE REGALO {$daysText} GRATIS de acceso completo a mi Academia de Data Engineering.

Que incluye?
- Roadmap completo de 3 niveles (Entry -> Senior)
- Videos del bootcamp completo
- Generador de datasets para practicar SQL
- Proyectos guiados con autoevaluacion
- Acceso a la comunidad Discord premium
- Q&A mensuales en vivo conmigo

ACCEDE AHORA: https://iansaura.com/members

Tu acceso gratuito vence el {$trialEndFormatted}
Despues de esa fecha, podes continuar con la suscripcion por solo \$30 USD/mes.

Si tenes alguna duda, responde este email directamente. Leo todos los mensajes.

Nos vemos adentro!

Ian Saura
Data Engineer & Educador
https://iansaura.com
";
        
        // Usar exactamente el mismo método que contact.php
        $emailSent = sendTrialEmailSMTP($email, $subject, $emailBody);
        
        if ($emailSent) {
            // Registrar que se envió la invitación
            try {
                $stmt = $db->prepare("
                    UPDATE subscribers SET 
                        notes = CONCAT(COALESCE(notes, ''), ' [Invitación trial enviada: ', NOW(), ']')
                    WHERE email = ?
                ");
                $stmt->execute([$email]);
            } catch (Exception $e) {
                // No es crítico si falla el log
            }
            
            return [
                'success' => true, 
                'message' => "Invitación enviada a {$email}" . ($grantAccess ? " con acceso trial hasta {$trialEndFormatted}" : ""),
                'email_sent' => true,
                'trial_granted' => $grantAccess,
                'trial_end' => $trialEnd
            ];
        } else {
            return ['success' => false, 'error' => 'Error al enviar el email'];
        }
        
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

/**
 * Elimina TODOS los datos de un usuario (para limpiar cuentas sospechosas/test)
 */
function deleteUserData($db, $data) {
    $email = strtolower(trim($data['email'] ?? ''));
    
    if (empty($email)) {
        return ['success' => false, 'error' => 'Email requerido'];
    }
    
    $deleted = [];
    
    try {
        // 1. Eliminar de user_progress
        $stmt = $db->prepare("DELETE FROM user_progress WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) $deleted[] = 'progreso';
        
        // 2. Eliminar de subscribers
        $stmt = $db->prepare("DELETE FROM subscribers WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) $deleted[] = 'suscripción';
        
        // 3. Eliminar de users
        $stmt = $db->prepare("DELETE FROM users WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        if ($stmt->rowCount() > 0) $deleted[] = 'usuario';
        
        // 4. Eliminar de bootcamp_students si existe
        try {
            $stmt = $db->prepare("DELETE FROM bootcamp_students WHERE LOWER(email) = ?");
            $stmt->execute([$email]);
            if ($stmt->rowCount() > 0) $deleted[] = 'bootcamp';
        } catch (Exception $e) {
            // Tabla puede no existir
        }
        
        if (count($deleted) > 0) {
            error_log("Admin deleted user data for {$email}: " . implode(', ', $deleted));
            return [
                'success' => true,
                'message' => "Eliminado: " . implode(', ', $deleted) . " de {$email}",
                'deleted' => $deleted
            ];
        } else {
            return [
                'success' => true,
                'message' => "No se encontraron datos para {$email}",
                'deleted' => []
            ];
        }
        
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

/**
 * Envía un email de engagement personalizado a un usuario
 * Para usar cuando ves usuarios activos que no han convertido
 */
function sendEngagementEmail($db, $data) {
    $email = $data['email'] ?? '';
    $message = $data['message'] ?? '';
    $subject = $data['subject'] ?? '¡Hola desde Ian Saura!';
    
    if (empty($email) || empty($message)) {
        return ['success' => false, 'error' => 'Email y mensaje requeridos'];
    }
    
    try {
        // Obtener datos del usuario
        $stmt = $db->prepare("SELECT id, email, name, full_name FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            return ['success' => false, 'error' => 'Usuario no encontrado'];
        }
        
        $userName = $user['full_name'] ?? $user['name'] ?? 'Crack';
        
        // Construir email en texto plano
        $emailBody = "
{$message}

---
Ian Saura
Data Engineer & Educador
https://iansaura.com

P.S: Responde este email directamente si tenes alguna pregunta. Leo todos los mensajes.
";
        
        // Enviar email
        $emailSent = sendTrialEmailSMTP($email, $subject, $emailBody);
        
        if ($emailSent) {
            // Log de actividad
            error_log("Engagement email sent to {$email}: {$subject}");
            
            return [
                'success' => true, 
                'message' => "Email enviado a {$email}",
                'email_sent' => true
            ];
        } else {
            return ['success' => false, 'error' => 'Error al enviar el email'];
        }
        
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

/**
 * Verifica y desactiva trials expirados
 * Debería ejecutarse vía CRON diariamente
 */
function checkExpiredTrials($db) {
    try {
        // Buscar trials expirados
        $stmt = $db->query("
            SELECT id, email, name, subscription_end 
            FROM subscribers 
            WHERE status = 'trial' 
            AND subscription_end < NOW()
        ");
        $expiredTrials = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        $deactivated = 0;
        foreach ($expiredTrials as $trial) {
            // Desactivar trial
            $stmt = $db->prepare("
                UPDATE subscribers SET 
                    status = 'expired',
                    notes = CONCAT(COALESCE(notes, ''), ' [Trial expirado: ', NOW(), ']'),
                    updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([$trial['id']]);
            
            // Quitar acceso en users
            $columns = $db->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
            if (in_array('subscribed', $columns)) {
                $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE email = ?");
                $stmt->execute([$trial['email']]);
            }
            
            $deactivated++;
            
            // Opcional: enviar email de que el trial expiró
            // sendTrialExpiredEmail($trial['email'], $trial['name']);
        }
        
        return [
            'success' => true,
            'checked' => count($expiredTrials),
            'deactivated' => $deactivated,
            'message' => "Se desactivaron {$deactivated} trials expirados"
        ];
        
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}