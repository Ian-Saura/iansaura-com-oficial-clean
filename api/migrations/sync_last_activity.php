<?php
/**
 * Sync last_activity from updated_at for users who have activity today
 * This fixes users who connected today but last_activity wasn't updated
 */

require_once __DIR__ . '/../secure-config.php';

header('Content-Type: application/json');

// Security check
$key = $_GET['key'] ?? '';
$adminEmail = 'sauraiansaura@gmail.com';
$today = date('Ymd');
$expectedKey = 'adm_' . substr(md5($adminEmail . $today), 0, 6) . '_' . $today;

if ($key !== $expectedKey) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $db = getSecureDBConnection();
    $db->exec("SET time_zone = '-03:00'");
    
    $results = [];
    
    // Check how many records have updated_at today but last_activity is older
    $stmt = $db->query("
        SELECT COUNT(*) as count 
        FROM user_progress 
        WHERE DATE(updated_at) = CURDATE() 
        AND (last_activity IS NULL OR DATE(last_activity) < CURDATE())
    ");
    $needsSync = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    $results['records_needing_sync'] = (int)$needsSync;
    
    if ($needsSync > 0) {
        // Update last_activity from updated_at for records that need it
        $stmt = $db->prepare("
            UPDATE user_progress 
            SET last_activity = updated_at 
            WHERE DATE(updated_at) = CURDATE() 
            AND (last_activity IS NULL OR DATE(last_activity) < CURDATE())
        ");
        $stmt->execute();
        $results['synced_records'] = $stmt->rowCount();
    }
    
    // Also sync any records where updated_at is more recent than last_activity
    $stmt = $db->query("
        SELECT COUNT(*) as count 
        FROM user_progress 
        WHERE updated_at > last_activity
    ");
    $outOfSync = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    $results['records_out_of_sync'] = (int)$outOfSync;
    
    if ($outOfSync > 0) {
        $stmt = $db->prepare("
            UPDATE user_progress 
            SET last_activity = updated_at 
            WHERE updated_at > last_activity
        ");
        $stmt->execute();
        $results['additional_synced'] = $stmt->rowCount();
    }
    
    // Get current stats after sync
    $stmt = $db->query("
        SELECT 
            COUNT(DISTINCT email) as total,
            COUNT(DISTINCT CASE WHEN DATE(last_activity) = CURDATE() THEN email END) as active_today,
            MAX(last_activity) as newest_activity,
            NOW() as server_time
        FROM user_progress
    ");
    $results['after_sync'] = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Sync completed',
        'results' => $results
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

