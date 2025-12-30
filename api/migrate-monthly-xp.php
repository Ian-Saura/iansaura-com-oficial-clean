<?php
/**
 * Migration: Add monthly_xp column to user_progress table
 * This column resets every month for the leaderboard
 * Run once: php migrate-monthly-xp.php
 */

// Auth check
$isAuthorized = false;
if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
} elseif (isset($_GET['admin_password']) && defined('ADMIN_PASSWORD') && $_GET['admin_password'] === ADMIN_PASSWORD) {
    $isAuthorized = true;
} elseif (isset($_GET['key']) && $_GET['key'] === 'migrate_2024_iansaura') {
    $isAuthorized = true;
}

if (!$isAuthorized) {
    http_response_code(403);
    die('Unauthorized. Use ?key=migrate_2024_iansaura');
}

require_once __DIR__ . '/secure-config.php';

try {
    $db = getSecureDBConnection();
    
    echo "Connected to database\n";
    
    // Add monthly_xp column
    $db->exec("ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS monthly_xp INT DEFAULT 0");
    echo "Added monthly_xp column\n";
    
    // Add month_start column to track when to reset
    $db->exec("ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS month_start DATE DEFAULT NULL");
    echo "Added month_start column\n";
    
    // Initialize monthly_xp for existing users (copy from current XP or calculate)
    $db->exec("
        UPDATE user_progress 
        SET monthly_xp = COALESCE(
            (SELECT total_xp FROM user_progress up2 WHERE up2.email = user_progress.email),
            0
        ),
        month_start = CURDATE()
        WHERE monthly_xp = 0 OR monthly_xp IS NULL
    ");
    echo "Initialized monthly_xp for existing users\n";
    
    echo "\n✅ Migration completed successfully!\n";
    echo "Remember to add a cron job to reset monthly_xp on the 1st of each month.\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>
