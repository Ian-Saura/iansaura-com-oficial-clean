<?php
/**
 * Sync Discord Roles
 * 
 * This script should be run periodically (via cron) to:
 * 1. Remove Discord roles from users who lost access (cancelled, expired trials)
 * 2. Verify active subscribers have their roles
 * 
 * Usage: 
 * - Cron: curl https://iansaura.com/api/sync-discord-roles.php?cron_key=SECRET
 * - Manual from Admin: POST with admin_key
 */

header('Content-Type: application/json');

require_once __DIR__ . '/middleware/cors.php';

// Security check
$cronKey = $_GET['cron_key'] ?? '';
$adminKey = $_POST['admin_key'] ?? json_decode(file_get_contents('php://input'), true)['admin_key'] ?? '';

$validCronKey = 'discord_sync_2024_secret'; // Change this to your secret

if (empty($cronKey) && empty($adminKey)) {
    echo json_encode(['success' => false, 'error' => 'Authentication required']);
    exit;
}

// Logging
function logSync($message, $data = []) {
    $logFile = __DIR__ . '/../logs/discord-sync.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - " . json_encode($data);
    }
    $logEntry .= "\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

try {
    logSync('Starting Discord role sync');

    // Database connection
    $credentialsFile = __DIR__ . '/.db-credentials.php';
    if (!file_exists($credentialsFile)) {
        throw new Exception("Database credentials not found");
    }
    
    $credentials = include $credentialsFile;
    $dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";
    $db = new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);

    // Load Discord bot
    if (!file_exists(__DIR__ . '/discord-bot.php')) {
        throw new Exception("Discord bot not available");
    }
    require_once __DIR__ . '/discord-bot.php';
    $discord = new DiscordBot();

    $results = [
        'roles_removed' => [],
        'roles_verified' => [],
        'errors' => []
    ];

    // 1. Find users who should NOT have access but have Discord linked with role
    $stmt = $db->prepare("
        SELECT s.id, s.email, s.discord_username, s.discord_user_id, s.status, s.discord_role_assigned,
               s.subscription_end
        FROM subscribers s
        WHERE s.discord_user_id IS NOT NULL 
          AND s.discord_role_assigned = 1
          AND (
              s.status IN ('cancelled', 'expired', 'inactive')
              OR (s.status = 'trial' AND s.subscription_end < NOW())
          )
    ");
    $stmt->execute();
    $usersToRemove = $stmt->fetchAll();

    logSync('Found users to remove roles from', ['count' => count($usersToRemove)]);

    foreach ($usersToRemove as $user) {
        try {
            $discord->removeSubscriberRole($user['discord_user_id']);
            
            // Update database
            $updateStmt = $db->prepare("
                UPDATE subscribers 
                SET discord_role_assigned = 0, updated_at = NOW() 
                WHERE id = ?
            ");
            $updateStmt->execute([$user['id']]);
            
            $results['roles_removed'][] = [
                'email' => $user['email'],
                'discord' => $user['discord_username'],
                'reason' => $user['status'] === 'trial' ? 'trial_expired' : $user['status']
            ];
            
            logSync('Role removed', [
                'email' => $user['email'], 
                'discord' => $user['discord_username'],
                'status' => $user['status']
            ]);
            
        } catch (Exception $e) {
            $results['errors'][] = [
                'email' => $user['email'],
                'discord' => $user['discord_username'],
                'error' => $e->getMessage()
            ];
            logSync('Failed to remove role', [
                'email' => $user['email'],
                'error' => $e->getMessage()
            ]);
        }
        
        // Rate limiting - Discord API has limits
        usleep(500000); // 0.5 second delay
    }

    // 2. Find active subscribers who should have role but don't
    $stmt = $db->prepare("
        SELECT s.id, s.email, s.discord_username, s.discord_user_id, s.status
        FROM subscribers s
        WHERE s.discord_user_id IS NOT NULL 
          AND s.discord_role_assigned = 0
          AND s.status IN ('active', 'trial')
          AND (s.status != 'trial' OR s.subscription_end > NOW())
    ");
    $stmt->execute();
    $usersToVerify = $stmt->fetchAll();

    logSync('Found users to verify/add roles', ['count' => count($usersToVerify)]);

    foreach ($usersToVerify as $user) {
        try {
            $discord->addSubscriberRole($user['discord_user_id']);
            
            // Update database
            $updateStmt = $db->prepare("
                UPDATE subscribers 
                SET discord_role_assigned = 1, updated_at = NOW() 
                WHERE id = ?
            ");
            $updateStmt->execute([$user['id']]);
            
            $results['roles_verified'][] = [
                'email' => $user['email'],
                'discord' => $user['discord_username']
            ];
            
            logSync('Role verified/added', ['email' => $user['email'], 'discord' => $user['discord_username']]);
            
        } catch (Exception $e) {
            $results['errors'][] = [
                'email' => $user['email'],
                'discord' => $user['discord_username'],
                'error' => $e->getMessage()
            ];
        }
        
        usleep(500000); // Rate limiting
    }

    logSync('Sync completed', [
        'removed' => count($results['roles_removed']),
        'verified' => count($results['roles_verified']),
        'errors' => count($results['errors'])
    ]);

    echo json_encode([
        'success' => true,
        'summary' => [
            'roles_removed' => count($results['roles_removed']),
            'roles_verified' => count($results['roles_verified']),
            'errors' => count($results['errors'])
        ],
        'details' => $results
    ]);

} catch (Exception $e) {
    error_log("Discord sync error: " . $e->getMessage());
    logSync('Fatal error', ['error' => $e->getMessage()]);
    
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>

