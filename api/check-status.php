<?php
/**
 * Quick status check - ver estado de usuarios y suscriptores recientes
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive

require_once 'secure-config.php';

try {
    $db = getSecureDBConnection();
    
    $result = [];
    
    // Total counts
    $result['totals'] = [
        'users' => $db->query("SELECT COUNT(*) FROM users")->fetchColumn(),
        'subscribers' => $db->query("SELECT COUNT(*) FROM subscribers")->fetchColumn(),
        'user_progress' => $db->query("SELECT COUNT(*) FROM user_progress")->fetchColumn()
    ];
    
    // Recent users (last 24h)
    $stmt = $db->query("
        SELECT id, email, name, full_name, created_at 
        FROM users 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        ORDER BY created_at DESC
        LIMIT 20
    ");
    $result['recent_users_24h'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['count_users_24h'] = count($result['recent_users_24h']);
    
    // Recent users (last 1h)
    $stmt = $db->query("
        SELECT id, email, name, full_name, created_at 
        FROM users 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
        ORDER BY created_at DESC
    ");
    $result['recent_users_1h'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['count_users_1h'] = count($result['recent_users_1h']);
    
    // Recent subscribers (last 24h)
    $stmt = $db->query("
        SELECT id, email, name, status, payment_type, plan_type, created_at, discord_user_id
        FROM subscribers 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        ORDER BY created_at DESC
        LIMIT 20
    ");
    $result['recent_subscribers_24h'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result['count_subscribers_24h'] = count($result['recent_subscribers_24h']);
    
    // Subscribers with Discord connected (for Shield button visibility)
    $stmt = $db->query("
        SELECT COUNT(*) as count, status
        FROM subscribers 
        WHERE discord_user_id IS NOT NULL AND discord_user_id != ''
        GROUP BY status
    ");
    $result['subscribers_with_discord'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Active/Trial subscribers without Discord
    $stmt = $db->query("
        SELECT email, name, status, payment_type
        FROM subscribers 
        WHERE status IN ('active', 'trial') 
        AND (discord_user_id IS NULL OR discord_user_id = '')
        ORDER BY created_at DESC
        LIMIT 10
    ");
    $result['active_without_discord'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Server time
    $result['server_time'] = date('Y-m-d H:i:s');
    $result['timezone'] = date_default_timezone_get();
    
    echo json_encode($result, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}


