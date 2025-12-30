<?php
/**
 * Heartbeat endpoint - Updates user's last_activity
 * Called periodically from frontend to track active users
 */

// Rate limiting - 20 requests per minute per IP (heartbeat is every 5 min)
require_once __DIR__ . '/middleware/rate-limiter.php';
applyRateLimit('heartbeat', 20, 60);

// CORS - Restrictive (only iansaura.com)
require_once __DIR__ . '/middleware/cors.php';
applyCors();

header('Content-Type: application/json');

require_once __DIR__ . '/secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Get email from POST or GET
    $email = '';
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $email = $input['email'] ?? '';
    } else {
        $email = $_GET['email'] ?? '';
    }
    
    if (empty($email)) {
        echo json_encode(['success' => false, 'error' => 'Email required']);
        exit();
    }
    
    $email = strtolower(trim($email));
    
    // Update last_activity in user_progress
    $stmt = $db->prepare("
        UPDATE user_progress 
        SET last_activity = NOW() 
        WHERE email = ?
    ");
    $stmt->execute([$email]);
    
    // If no rows updated, create a record
    if ($stmt->rowCount() === 0) {
        $stmt = $db->prepare("
            INSERT INTO user_progress (email, last_activity, xp, current_streak, longest_streak)
            VALUES (?, NOW(), 0, 0, 0)
            ON DUPLICATE KEY UPDATE last_activity = NOW()
        ");
        $stmt->execute([$email]);
    }
    
    echo json_encode([
        'success' => true,
        'timestamp' => date('Y-m-d H:i:s'),
        'email' => $email
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>

