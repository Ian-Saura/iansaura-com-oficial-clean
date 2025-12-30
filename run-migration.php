<?php
/**
 * Run Migration: Add last_activity to user_progress
 * 
 * EJECUTAR LOCALMENTE:
 * php run-migration.php
 */

echo "🔄 Starting migration: Add last_activity column...\n";

require_once 'api/secure-config.php';

try {
    $db = getSecureDBConnection();
    echo "✓ Connected to database\n";
    
    // Check if column exists
    $stmt = $db->query("SHOW COLUMNS FROM user_progress");
    $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    if (!in_array('last_activity', $columns)) {
        echo "⏳ Adding last_activity column...\n";
        $db->exec("ALTER TABLE user_progress ADD COLUMN last_activity DATETIME DEFAULT CURRENT_TIMESTAMP");
        echo "✓ Column added\n";
        
        echo "⏳ Creating index...\n";
        try {
            $db->exec("CREATE INDEX idx_last_activity ON user_progress(last_activity)");
            echo "✓ Index created\n";
        } catch (Exception $e) {
            echo "⚠ Index may already exist\n";
        }
        
        echo "⏳ Initializing last_activity values...\n";
        $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL");
        echo "✓ Values initialized\n";
        
    } else {
        echo "ℹ Column last_activity already exists\n";
        
        $stmt = $db->query("SELECT COUNT(*) as null_count FROM user_progress WHERE last_activity IS NULL");
        $nullCount = $stmt->fetch(PDO::FETCH_ASSOC)['null_count'];
        
        if ($nullCount > 0) {
            echo "⏳ Updating $nullCount NULL values...\n";
            $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL");
            echo "✓ Values updated\n";
        } else {
            echo "ℹ All values already initialized\n";
        }
    }
    
    // Show stats
    echo "\n📊 STATS:\n";
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
    
    echo "  Total users: " . $stats['total_users'] . "\n";
    echo "  Active in last 24h: " . $stats['active_24h'] . "\n";
    echo "  Active in last 1h: " . $stats['active_1h'] . "\n";
    echo "  Active now (15 min): " . $stats['active_now'] . "\n";
    echo "  Oldest activity: " . ($stats['oldest_activity'] ?? 'NULL') . "\n";
    echo "  Newest activity: " . ($stats['newest_activity'] ?? 'NULL') . "\n";
    
    echo "\n✅ Migration completed successfully!\n";
    echo "🔴 'En Vivo' section should now show active users.\n";
    
} catch (Exception $e) {
    echo "\n❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>

