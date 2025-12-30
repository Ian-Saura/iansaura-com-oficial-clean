<?php
/**
 * Database Index Optimization for 1000+ Users
 * Run once to ensure all critical indexes exist
 */

require_once __DIR__ . '/../secure-config.php';

header('Content-Type: application/json');

// Security check
$key = $_GET['key'] ?? '';
$adminEmails = ['sauraiansaura@gmail.com', 'ian@iansaura.com'];
$keyValid = false;

foreach ($adminEmails as $email) {
    $today = gmdate('Y-m-d');
    $base = "{$email}_{$today}_iansaura_admin_2024";
    $hash = 0;
    for ($i = 0; $i < strlen($base); $i++) {
        $hash = (($hash << 5) - $hash) + ord($base[$i]);
        $hash = $hash & 0xFFFFFFFF;
    }
    $expectedKey = 'adm_' . dechex(abs($hash) % 0xFFFFFF) . '_' . str_replace('-', '', $today);
    if ($key === $expectedKey) {
        $keyValid = true;
        break;
    }
}

if (!$keyValid) {
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $db = getSecureDBConnection();
    $results = [];
    
    // ============================================
    // USERS TABLE INDEXES
    // ============================================
    $indexes = [
        ['table' => 'users', 'name' => 'idx_users_email', 'columns' => 'email'],
        ['table' => 'users', 'name' => 'idx_users_created_at', 'columns' => 'created_at'],
        
        // SUBSCRIBERS TABLE INDEXES
        ['table' => 'subscribers', 'name' => 'idx_subscribers_email', 'columns' => 'email'],
        ['table' => 'subscribers', 'name' => 'idx_subscribers_status', 'columns' => 'status'],
        ['table' => 'subscribers', 'name' => 'idx_subscribers_created_at', 'columns' => 'created_at'],
        ['table' => 'subscribers', 'name' => 'idx_subscribers_trial_ends', 'columns' => 'trial_ends_at'],
        
        // USER_PROGRESS TABLE INDEXES
        ['table' => 'user_progress', 'name' => 'idx_user_progress_email', 'columns' => 'email'],
        ['table' => 'user_progress', 'name' => 'idx_user_progress_xp', 'columns' => 'xp'],
        ['table' => 'user_progress', 'name' => 'idx_user_progress_monthly_xp', 'columns' => 'monthly_xp'],
        ['table' => 'user_progress', 'name' => 'idx_user_progress_last_activity', 'columns' => 'last_activity'],
        ['table' => 'user_progress', 'name' => 'idx_user_progress_streak', 'columns' => 'current_streak'],
        
        // COMPOSITE INDEXES FOR COMMON QUERIES
        ['table' => 'subscribers', 'name' => 'idx_subscribers_email_status', 'columns' => 'email, status'],
        ['table' => 'user_progress', 'name' => 'idx_user_progress_email_xp', 'columns' => 'email, xp'],
    ];
    
    foreach ($indexes as $idx) {
        $table = $idx['table'];
        $name = $idx['name'];
        $columns = $idx['columns'];
        
        try {
            // Check if table exists
            $stmt = $db->query("SHOW TABLES LIKE '$table'");
            if (!$stmt->fetch()) {
                $results[$name] = "Skipped - Table '$table' doesn't exist";
                continue;
            }
            
            // Check if index already exists
            $stmt = $db->query("SHOW INDEX FROM $table WHERE Key_name = '$name'");
            if ($stmt->fetch()) {
                $results[$name] = "Already exists ✓";
                continue;
            }
            
            // Create the index
            $db->exec("CREATE INDEX $name ON $table ($columns)");
            $results[$name] = "Created ✓";
            
        } catch (Exception $e) {
            $results[$name] = "Error: " . $e->getMessage();
        }
    }
    
    // ============================================
    // ANALYZE TABLES FOR QUERY OPTIMIZATION
    // ============================================
    $tables = ['users', 'subscribers', 'user_progress'];
    foreach ($tables as $table) {
        try {
            $stmt = $db->query("SHOW TABLES LIKE '$table'");
            if ($stmt->fetch()) {
                $db->exec("ANALYZE TABLE $table");
                $results["analyze_$table"] = "Analyzed ✓";
            }
        } catch (Exception $e) {
            $results["analyze_$table"] = "Error: " . $e->getMessage();
        }
    }
    
    // ============================================
    // GET CURRENT INDEX STATUS
    // ============================================
    $indexStatus = [];
    foreach ($tables as $table) {
        try {
            $stmt = $db->query("SHOW TABLES LIKE '$table'");
            if ($stmt->fetch()) {
                $stmt = $db->query("SHOW INDEX FROM $table");
                $tableIndexes = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $indexStatus[$table] = count($tableIndexes) . ' indexes';
            }
        } catch (Exception $e) {
            $indexStatus[$table] = 'Error checking';
        }
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Index optimization completed',
        'results' => $results,
        'index_status' => $indexStatus,
        'timestamp' => date('Y-m-d H:i:s')
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

