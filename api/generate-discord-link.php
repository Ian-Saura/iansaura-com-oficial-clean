<?php
/**
 * Generate Discord Connection Link
 * Creates a new connection token for logged-in subscribers
 * and redirects them to the connection page
 */

require_once __DIR__ . '/subscription-config.php';

// Database connection
function getDBConnection() {
    $credentialsFile = __DIR__ . '/.db-credentials.php';
    if (!file_exists($credentialsFile)) {
        throw new Exception("Credentials file not found");
    }
    $credentials = include $credentialsFile;
    $dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";
    return new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}

// Get email from query param (passed from frontend)
$email = $_GET['email'] ?? '';

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    // Redirect to Discord invite directly if no email
    header('Location: https://discord.gg/jfyqeAMpmk');
    exit();
}

$email = strtolower(trim($email));

try {
    $db = getDBConnection();
    
    // Find subscriber by email
    $stmt = $db->prepare("SELECT id, status, discord_user_id, discord_role_assigned FROM subscribers WHERE LOWER(email) = ?");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch();
    
    if (!$subscriber) {
        // Not a subscriber - just redirect to Discord
        header('Location: https://discord.gg/jfyqeAMpmk');
        exit();
    }
    
    // If already connected and has role, just go to Discord
    if ($subscriber['discord_user_id'] && $subscriber['discord_role_assigned']) {
        header('Location: https://discord.gg/jfyqeAMpmk');
        exit();
    }
    
    // Check if subscriber is active or trial
    if (!in_array($subscriber['status'], ['active', 'trial'])) {
        // Inactive subscriber - just redirect to Discord
        header('Location: https://discord.gg/jfyqeAMpmk');
        exit();
    }
    
    // Generate new connection token
    $connectionToken = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+7 days'));
    
    // Insert or update pending connection
    $stmt = $db->prepare("
        INSERT INTO pending_discord_connections (subscriber_id, connection_token, email, expires_at, used)
        VALUES (?, ?, ?, ?, FALSE)
        ON DUPLICATE KEY UPDATE 
            connection_token = VALUES(connection_token), 
            expires_at = VALUES(expires_at), 
            used = FALSE
    ");
    $stmt->execute([$subscriber['id'], $connectionToken, $email, $expiresAt]);
    
    // Log this
    $logFile = __DIR__ . '/../logs/discord-connections.log';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] Generated new connection link for $email (subscriber_id: {$subscriber['id']})\n", FILE_APPEND | LOCK_EX);
    
    // Redirect to connection page
    header("Location: https://www.iansaura.com/api/connect-discord.php?token=$connectionToken");
    exit();
    
} catch (Exception $e) {
    error_log("Discord link generation error: " . $e->getMessage());
    // On error, just redirect to Discord
    header('Location: https://discord.gg/jfyqeAMpmk');
    exit();
}
?>
