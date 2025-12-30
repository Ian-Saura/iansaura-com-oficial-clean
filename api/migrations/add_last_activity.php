<?php
/**
 * Migration: Add last_activity column to user_progress table
 * Run this once to fix the "En Vivo" section in Admin panel
 * 
 * EJECUTAR: curl https://iansaura.com/api/migrations/add_last_activity.php?key=ADMIN_KEY
 */

header('Content-Type: application/json');

// Simple auth check
$key = $_GET['key'] ?? '';
if (empty($key) || strlen($key) < 10) {
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

require_once '../secure-config-local.php';

try {
    $db = getSecureDBConnection();
    
    $results = [];
    
    // Check if column exists
    $columns = $db->query("SHOW COLUMNS FROM user_progress")->fetchAll(PDO::FETCH_COLUMN);
    
    if (!in_array('last_activity', $columns)) {
        // Add the column
        $db->exec("ALTER TABLE user_progress ADD COLUMN last_activity DATETIME DEFAULT CURRENT_TIMESTAMP");
        $results[] = "Added last_activity column";
        
        // Add index
        try {
            $db->exec("CREATE INDEX idx_last_activity ON user_progress(last_activity)");
            $results[] = "Added index on last_activity";
        } catch (Exception $e) {
            $results[] = "Index already exists or error: " . $e->getMessage();
        }
        
        // Initialize from updated_at or created_at
        $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL");
        $results[] = "Initialized last_activity from existing timestamps";
        
    } else {
        $results[] = "Column last_activity already exists";
        
        // Still update NULL values
        $stmt = $db->query("SELECT COUNT(*) as null_count FROM user_progress WHERE last_activity IS NULL");
        $nullCount = $stmt->fetch(PDO::FETCH_ASSOC)['null_count'];
        
        if ($nullCount > 0) {
            $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL");
            $results[] = "Updated $nullCount NULL last_activity values";
        }
    }
    
    // Get some stats
    $stmt = $db->query("
        SELECT 
            COUNT(*) as total_users,
            COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN 1 END) as active_24h,
            COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 1 HOUR) THEN 1 END) as active_1h,
            MIN(last_activity) as oldest_activity,
            MAX(last_activity) as newest_activity
        FROM user_progress
    ");
    $stats = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'results' => $results,
        'stats' => $stats,
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>

