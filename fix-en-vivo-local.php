<?php
/**
 * FIX: Add last_activity column to user_progress
 * Local execution with secure config
 */

echo "🔧 FIXING 'EN VIVO' SECTION...\n";
echo "================================\n\n";

// Load secure configuration
require_once 'api/secure-config.php';

try {
    $db = getSecureDBConnection();
    echo "✓ Connected to database\n";
    
    // Check columns
    echo "\n📋 CHECKING TABLE STRUCTURE...\n";
    $stmt = $db->query("SHOW COLUMNS FROM user_progress");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "Current columns:\n";
    foreach ($columns as $col) {
        echo "  - $col\n";
    }
    
    echo "\n";
    
    if (!in_array('last_activity', $columns)) {
        echo "❌ Missing column: last_activity\n";
        echo "⏳ Adding column...\n";
        
        $db->exec("ALTER TABLE user_progress ADD COLUMN last_activity DATETIME DEFAULT CURRENT_TIMESTAMP");
        echo "✓ Column added\n";
        
        echo "⏳ Creating index...\n";
        try {
            $db->exec("CREATE INDEX idx_last_activity ON user_progress(last_activity)");
            echo "✓ Index created\n";
        } catch (Exception $e) {
            echo "⚠ Index creation skipped (may already exist)\n";
        }
        
        echo "⏳ Initializing values from updated_at...\n";
        $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL OR last_activity = '0000-00-00 00:00:00'");
        
        $stmt = $db->query("SELECT COUNT(*) as cnt FROM user_progress WHERE last_activity IS NOT NULL AND last_activity != '0000-00-00 00:00:00'");
        $count = $stmt->fetch(PDO::FETCH_ASSOC)['cnt'];
        echo "✓ Initialized $count user records\n";
        
    } else {
        echo "✓ Column last_activity already exists\n";
        
        echo "⏳ Checking for NULL or empty values...\n";
        $stmt = $db->query("SELECT COUNT(*) as cnt FROM user_progress WHERE last_activity IS NULL OR last_activity = '0000-00-00 00:00:00'");
        $nullCount = $stmt->fetch(PDO::FETCH_ASSOC)['cnt'];
        
        if ($nullCount > 0) {
            echo "Found $nullCount NULL/empty values. Updating...\n";
            $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL OR last_activity = '0000-00-00 00:00:00'");
            echo "✓ Updated $nullCount records\n";
        } else {
            echo "✓ All values already initialized\n";
        }
    }
    
    echo "\n📊 STATISTICS:\n";
    echo "==============\n";
    
    $stmt = $db->query("
        SELECT 
            COUNT(*) as total_users,
            COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN 1 END) as active_24h,
            COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 1 HOUR) THEN 1 END) as active_1h,
            COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 15 MINUTE) THEN 1 END) as active_now,
            MIN(last_activity) as oldest_activity,
            MAX(last_activity) as newest_activity
        FROM user_progress
    ");
    $stats = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo "Total users in system: " . $stats['total_users'] . "\n";
    echo "Active in last 24h: " . $stats['active_24h'] . "\n";
    echo "Active in last 1h: " . $stats['active_1h'] . "\n";
    echo "Active NOW (15 min): " . $stats['active_now'] . "\n";
    echo "Oldest activity: " . ($stats['oldest_activity'] ?? 'N/A') . "\n";
    echo "Newest activity: " . ($stats['newest_activity'] ?? 'N/A') . "\n";
    
    echo "\n✅ MIGRATION COMPLETE!\n";
    echo "================================\n";
    echo "🔴 The 'En Vivo' section should now show active users.\n";
    echo "📊 Check the admin panel to see the changes.\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>

