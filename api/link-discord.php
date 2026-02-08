<?php
/**
 * Link Discord API
 * Allows users to link their Discord username directly from the platform
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://iansaura.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/middleware/cors.php';

// Logging function
function logDiscordLink($message, $data = []) {
    $logFile = __DIR__ . '/../logs/discord-links.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - " . json_encode($data);
    }
    $logEntry .= "\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = filter_var($input['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $discordUsername = trim($input['discord_username'] ?? '');
    
    // Remove @ if present
    $discordUsername = ltrim($discordUsername, '@');
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit;
    }
    
    if (empty($discordUsername)) {
        echo json_encode(['success' => false, 'error' => 'Nombre de usuario de Discord requerido']);
        exit;
    }
    
    // Validate Discord username format (alphanumeric, dots, underscores, 2-32 chars)
    if (!preg_match('/^[a-z0-9_.]{2,32}$/i', $discordUsername)) {
        echo json_encode(['success' => false, 'error' => 'Nombre de usuario de Discord inválido. Debe tener entre 2-32 caracteres (letras, números, puntos o guiones bajos)']);
        exit;
    }

    logDiscordLink('Link request received', ['email' => $email, 'discord' => $discordUsername]);

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

    // Check if user is a subscriber
    $stmt = $db->prepare("
        SELECT id, status, discord_username 
        FROM subscribers 
        WHERE email = ? OR secondary_email = ?
        LIMIT 1
    ");
    $stmt->execute([$email, $email]);
    $subscriber = $stmt->fetch();

    $discordUserId = null;
    $roleAssigned = false;

    // Try to find user in Discord and assign role if they're an active subscriber
    if ($subscriber && in_array($subscriber['status'], ['active', 'trial'])) {
        // Load Discord bot
        if (file_exists(__DIR__ . '/discord-bot.php')) {
            require_once __DIR__ . '/discord-bot.php';
            
            try {
                $discord = new DiscordBot();
                
                // Try to find user in Discord server
                $discordUserId = $discord->findUserByUsername($discordUsername);
                
                if ($discordUserId) {
                    logDiscordLink('Discord user found', ['discord_id' => $discordUserId]);
                    
                    // Assign subscriber role
                    try {
                        $discord->addSubscriberRole($discordUserId);
                        $roleAssigned = true;
                        logDiscordLink('Role assigned successfully');
                    } catch (Exception $e) {
                        logDiscordLink('Failed to assign role', ['error' => $e->getMessage()]);
                        // Continue anyway - we'll save the username
                    }
                } else {
                    logDiscordLink('Discord user not found in server', ['username' => $discordUsername]);
                }
            } catch (Exception $e) {
                logDiscordLink('Discord bot error', ['error' => $e->getMessage()]);
                // Continue anyway - save the username for manual role assignment
            }
        }
    }

    // Update subscriber record
    if ($subscriber) {
        $stmt = $db->prepare("
            UPDATE subscribers SET 
                discord_username = ?,
                discord_user_id = ?,
                discord_role_assigned = ?,
                updated_at = NOW()
            WHERE id = ?
        ");
        $stmt->execute([$discordUsername, $discordUserId, $roleAssigned ? 1 : 0, $subscriber['id']]);
        
        logDiscordLink('Subscriber record updated', ['subscriber_id' => $subscriber['id']]);
    }

    // Also update users table
    $stmt = $db->prepare("
        UPDATE users SET 
            discord_username = ?,
            discord_user_id = ?
        WHERE email = ?
    ");
    $stmt->execute([$discordUsername, $discordUserId, $email]);
    
    logDiscordLink('User record updated', ['email' => $email]);

    // Build response message
    $message = '¡Discord vinculado exitosamente!';
    if ($roleAssigned) {
        $message .= ' Ya tenés el rol de suscriptor en el servidor.';
    } elseif ($discordUserId) {
        $message .= ' Te encontramos en el servidor pero no pudimos asignar el rol automáticamente. Contactá a @iansaura en Discord.';
    } elseif (!$discordUserId && $subscriber) {
        $message .= ' No te encontramos en el servidor todavía. Uníte primero y luego te asignaremos el rol.';
    }

    echo json_encode([
        'success' => true,
        'message' => $message,
        'discord_username' => $discordUsername,
        'discord_user_id' => $discordUserId,
        'role_assigned' => $roleAssigned,
        'found_in_server' => !empty($discordUserId)
    ]);

} catch (Exception $e) {
    error_log("Link Discord error: " . $e->getMessage());
    logDiscordLink('Error', ['error' => $e->getMessage()]);
    
    echo json_encode([
        'success' => false,
        'error' => 'Error del servidor. Por favor intentá de nuevo.'
    ]);
}
?>

