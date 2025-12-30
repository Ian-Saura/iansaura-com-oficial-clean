<?php
/**
 * FIX: Add last_activity column to user_progress
 * Ejecutar en el servidor: php fix-en-vivo.php
 * 
 * Esto arreglará el problema "En Vivo" mostrando 0 usuarios
 */

echo "🔧 FIXING 'EN VIVO' SECTION...\n";
echo "================================\n\n";

$dbhost = 'localhost';
$dbuser = 'c2621673_ian';
$dbpass = '***REMOVED***';
$dbname = 'c2621673_ian';

try {
    // Connect
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass) or die('❌ Connection failed: ' . mysqli_connect_error());
    mysqli_select_db($conn, $dbname) or die('❌ Database selection failed: ' . mysqli_error($conn));
    
    echo "✓ Connected to database\n";
    
    // Check columns
    echo "\n📋 CHECKING TABLE STRUCTURE...\n";
    $result = mysqli_query($conn, "SHOW COLUMNS FROM user_progress");
    $columns = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $columns[] = $row['Field'];
    }
    
    echo "Current columns:\n";
    foreach ($columns as $col) {
        echo "  - $col\n";
    }
    
    echo "\n";
    
    if (!in_array('last_activity', $columns)) {
        echo "❌ Missing column: last_activity\n";
        echo "⏳ Adding column...\n";
        
        if (mysqli_query($conn, "ALTER TABLE user_progress ADD COLUMN last_activity DATETIME DEFAULT CURRENT_TIMESTAMP")) {
            echo "✓ Column added\n";
        } else {
            echo "❌ Error adding column: " . mysqli_error($conn) . "\n";
            exit(1);
        }
        
        echo "⏳ Creating index...\n";
        if (@mysqli_query($conn, "CREATE INDEX idx_last_activity ON user_progress(last_activity)")) {
            echo "✓ Index created\n";
        } else {
            echo "⚠ Index creation skipped (may already exist)\n";
        }
        
        echo "⏳ Initializing values from updated_at...\n";
        if (mysqli_query($conn, "UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL OR last_activity = '0000-00-00 00:00:00'")) {
            $affected = mysqli_affected_rows($conn);
            echo "✓ Initialized $affected user records\n";
        } else {
            echo "❌ Error updating records: " . mysqli_error($conn) . "\n";
        }
        
    } else {
        echo "✓ Column last_activity already exists\n";
        
        echo "⏳ Checking for NULL or empty values...\n";
        $result = mysqli_query($conn, "SELECT COUNT(*) as null_count FROM user_progress WHERE last_activity IS NULL OR last_activity = '0000-00-00 00:00:00'");
        $row = mysqli_fetch_assoc($result);
        $nullCount = $row['null_count'];
        
        if ($nullCount > 0) {
            echo "Found $nullCount NULL/empty values. Updating...\n";
            if (mysqli_query($conn, "UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL OR last_activity = '0000-00-00 00:00:00'")) {
                $affected = mysqli_affected_rows($conn);
                echo "✓ Updated $affected records\n";
            } else {
                echo "❌ Error: " . mysqli_error($conn) . "\n";
            }
        } else {
            echo "✓ All values already initialized\n";
        }
    }
    
    echo "\n📊 STATISTICS:\n";
    echo "==============\n";
    
    $result = mysqli_query($conn, "
        SELECT 
            COUNT(*) as total_users,
            COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 24 HOUR) THEN 1 END) as active_24h,
            COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 1 HOUR) THEN 1 END) as active_1h,
            COUNT(CASE WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 15 MINUTE) THEN 1 END) as active_now,
            MIN(last_activity) as oldest_activity,
            MAX(last_activity) as newest_activity
        FROM user_progress
    ");
    $stats = mysqli_fetch_assoc($result);
    
    echo "Total users in system: " . $stats['total_users'] . "\n";
    echo "Active in last 24h: " . $stats['active_24h'] . "\n";
    echo "Active in last 1h: " . $stats['active_1h'] . "\n";
    echo "Active NOW (15 min): " . $stats['active_now'] . "\n";
    echo "Oldest activity: " . ($stats['oldest_activity'] ?? 'N/A') . "\n";
    echo "Newest activity: " . ($stats['newest_activity'] ?? 'N/A') . "\n";
    
    echo "\n✅ MIGRATION COMPLETE!\n";
    echo "================================\n";
    echo "🔴 The 'En Vivo' section should now show active users.\n";
    echo "📊 Refresh the admin panel to see the changes.\n";
    
    mysqli_close($conn);
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>
