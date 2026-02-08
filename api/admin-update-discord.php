<?php
/**
 * Admin Discord Update API
 * Allows admins to manually link/unlink Discord usernames
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://iansaura.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/middleware/cors.php';

// Logging
function logAdminDiscord($message, $data = []) {
    $logFile = __DIR__ . '/../logs/admin-discord.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - " . json_encode($data);
    }
    $logEntry .= "\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $discordUsername = trim($input['discord_username'] ?? '');
    $adminKey = $input['admin_key'] ?? '';
    
    // Remove @ if present
    $discordUsername = ltrim($discordUsername, '@');
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit;
    }

    // Basic admin validation (you may want to add more robust validation)
    if (empty($adminKey)) {
        echo json_encode(['success' => false, 'error' => 'Clave de admin requerida']);
        exit;
    }

    logAdminDiscord('Admin Discord update', ['email' => $email, 'discord' => $discordUsername]);

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

    $discordUserId = null;
    $roleAssigned = false;
    $roleRemoved = false;

    // Load Discord bot if available
    if (file_exists(__DIR__ . '/discord-bot.php')) {
        require_once __DIR__ . '/discord-bot.php';
        
        try {
            $discord = new DiscordBot();
            
            if (!empty($discordUsername)) {
                // Try to find and assign role
                $discordUserId = $discord->findUserByUsername($discordUsername);
                
                if ($discordUserId) {
                    // Check if user should have access
                    $stmt = $db->prepare("SELECT status FROM subscribers WHERE email = ? OR secondary_email = ?");
                    $stmt->execute([$email, $email]);
                    $sub = $stmt->fetch();
                    
                    if ($sub && in_array($sub['status'], ['active', 'trial'])) {
                        try {
                            $discord->addSubscriberRole($discordUserId);
                            $roleAssigned = true;
                            logAdminDiscord('Role assigned', ['discord_id' => $discordUserId]);
                        } catch (Exception $e) {
                            logAdminDiscord('Failed to assign role', ['error' => $e->getMessage()]);
                        }
                    }
                }
            } else {
                // Unlinking - try to remove role
                $stmt = $db->prepare("SELECT discord_user_id FROM subscribers WHERE email = ? OR secondary_email = ?");
                $stmt->execute([$email, $email]);
                $sub = $stmt->fetch();
                
                if ($sub && !empty($sub['discord_user_id'])) {
                    try {
                        $discord->removeSubscriberRole($sub['discord_user_id']);
                        $roleRemoved = true;
                        logAdminDiscord('Role removed', ['discord_id' => $sub['discord_user_id']]);
                    } catch (Exception $e) {
                        logAdminDiscord('Failed to remove role', ['error' => $e->getMessage()]);
                    }
                }
            }
        } catch (Exception $e) {
            logAdminDiscord('Discord bot error', ['error' => $e->getMessage()]);
        }
    }

    // Update subscribers table
    $stmt = $db->prepare("
        UPDATE subscribers SET 
            discord_username = ?,
            discord_user_id = ?,
            discord_role_assigned = ?,
            updated_at = NOW()
        WHERE email = ? OR secondary_email = ?
    ");
    $stmt->execute([
        $discordUsername ?: null, 
        $discordUserId, 
        $roleAssigned ? 1 : 0,
        $email, 
        $email
    ]);
    
    $subscriberUpdated = $stmt->rowCount() > 0;

    // Also update users table
    $stmt = $db->prepare("
        UPDATE users SET 
            discord_username = ?,
            discord_user_id = ?
        WHERE email = ?
    ");
    $stmt->execute([$discordUsername ?: null, $discordUserId, $email]);

    // Build response
    $message = '';
    if (empty($discordUsername)) {
        $message = "Discord desvinculado para {$email}";
        if ($roleRemoved) {
            $message .= " y rol removido del servidor";
        }
    } else {
        $message = "Discord @{$discordUsername} vinculado a {$email}";
        if ($roleAssigned) {
            $message .= " con rol de suscriptor asignado";
        } elseif ($discordUserId) {
            $message .= " (usuario encontrado en servidor)";
        } else {
            $message .= " (usuario no encontrado en servidor todavía)";
        }
    }

    echo json_encode([
        'success' => true,
        'message' => $message,
        'discord_username' => $discordUsername ?: null,
        'discord_user_id' => $discordUserId,
        'role_assigned' => $roleAssigned,
        'role_removed' => $roleRemoved,
        'subscriber_updated' => $subscriberUpdated
    ]);

} catch (Exception $e) {
    error_log("Admin Discord update error: " . $e->getMessage());
    logAdminDiscord('Error', ['error' => $e->getMessage()]);
    
    echo json_encode([
        'success' => false,
        'error' => 'Error del servidor'
    ]);
}
?>

