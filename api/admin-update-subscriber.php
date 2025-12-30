<?php
/**
 * Admin endpoint to update subscriber status
 * Usage: ?email=xxx&action=cancel|activate&key=ADMIN_KEY
 */

header('Content-Type: application/json');

$adminKey = $_GET['key'] ?? '';
$email = strtolower(trim($_GET['email'] ?? ''));
$action = $_GET['action'] ?? '';

// Validate admin key
if (!defined('ADMIN_PASSWORD') || $adminKey !== ADMIN_PASSWORD) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

if (empty($email)) {
    echo json_encode(['error' => 'Email required']);
    exit();
}

require_once __DIR__ . '/secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Get current subscriber info
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE LOWER(email) = ?");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$subscriber) {
        echo json_encode(['error' => 'Subscriber not found', 'email' => $email]);
        exit();
    }
    
    $result = ['email' => $email, 'previous_status' => $subscriber['status']];
    
    if ($action === 'cancel') {
        // Cancel subscription
        $stmt = $db->prepare("
            UPDATE subscribers SET 
                status = 'cancelled',
                notes = CONCAT(COALESCE(notes, ''), '\n[Admin cancelled: " . date('Y-m-d H:i:s') . "]'),
                updated_at = NOW()
            WHERE LOWER(email) = ?
        ");
        $stmt->execute([$email]);
        
        // Update user subscribed status
        $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        
        $result['action'] = 'cancelled';
        $result['new_status'] = 'cancelled';
        $result['success'] = true;
        
    } elseif ($action === 'activate') {
        // Activate subscription
        $stmt = $db->prepare("
            UPDATE subscribers SET 
                status = 'active',
                subscription_end = DATE_ADD(NOW(), INTERVAL 1 MONTH),
                notes = CONCAT(COALESCE(notes, ''), '\n[Admin activated: " . date('Y-m-d H:i:s') . "]'),
                updated_at = NOW()
            WHERE LOWER(email) = ? OR LOWER(secondary_email) = ?
        ");
        $stmt->execute([$email, $email]);
        
        // Update user subscribed status
        $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        
        $result['action'] = 'activated';
        $result['new_status'] = 'active';
        $result['success'] = true;
        
    } elseif ($action === 'info' || empty($action)) {
        // Just return info
        $result['subscriber'] = $subscriber;
        $result['success'] = true;
        
    } else {
        $result['error'] = 'Invalid action. Use: cancel, activate, or info';
    }
    
    echo json_encode($result, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
