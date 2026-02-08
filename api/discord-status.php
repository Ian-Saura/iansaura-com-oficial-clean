<?php
/**
 * Discord Status API
 * Check if a user has linked their Discord account
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://iansaura.com');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once __DIR__ . '/middleware/cors.php';

try {
    $email = filter_var($_GET['email'] ?? '', FILTER_VALIDATE_EMAIL);
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit;
    }

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

    // Check subscribers table first
    $stmt = $db->prepare("
        SELECT discord_username, discord_user_id, discord_role_assigned 
        FROM subscribers 
        WHERE email = ? OR secondary_email = ?
        LIMIT 1
    ");
    $stmt->execute([$email, $email]);
    $subscriber = $stmt->fetch();

    if ($subscriber && !empty($subscriber['discord_username'])) {
        echo json_encode([
            'success' => true,
            'linked' => true,
            'discord_username' => $subscriber['discord_username'],
            'discord_user_id' => $subscriber['discord_user_id'],
            'has_role' => (bool)$subscriber['discord_role_assigned']
        ]);
        exit;
    }

    // Check users table as fallback
    $stmt = $db->prepare("
        SELECT discord_username, discord_user_id 
        FROM users 
        WHERE email = ?
        LIMIT 1
    ");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && !empty($user['discord_username'])) {
        echo json_encode([
            'success' => true,
            'linked' => true,
            'discord_username' => $user['discord_username'],
            'discord_user_id' => $user['discord_user_id'] ?? null,
            'has_role' => false
        ]);
        exit;
    }

    // Not linked
    echo json_encode([
        'success' => true,
        'linked' => false
    ]);

} catch (Exception $e) {
    error_log("Discord status error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => 'Error del servidor'
    ]);
}
?>

