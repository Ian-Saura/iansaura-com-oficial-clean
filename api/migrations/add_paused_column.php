<?php
/**
 * Migration: Add paused_data column to subscribers table
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Check if column exists first
    $stmt = $db->query("SHOW COLUMNS FROM subscribers LIKE 'paused_data'");
    $columnExists = $stmt->fetch();
    
    if (!$columnExists) {
        $db->exec("
            ALTER TABLE subscribers 
            ADD COLUMN paused_data TEXT NULL 
            COMMENT 'JSON with pause details: original_status, original_end, paused_at, reason'
        ");
        echo "✅ Migration completed: paused_data column added\n";
    } else {
        echo "✅ Column paused_data already exists\n";
    }
    
} catch (Exception $e) {
    echo "❌ Migration error: " . $e->getMessage() . "\n";
}


/**
 * Migration: Add paused_data column to subscribers table
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Check if column exists first
    $stmt = $db->query("SHOW COLUMNS FROM subscribers LIKE 'paused_data'");
    $columnExists = $stmt->fetch();
    
    if (!$columnExists) {
        $db->exec("
            ALTER TABLE subscribers 
            ADD COLUMN paused_data TEXT NULL 
            COMMENT 'JSON with pause details: original_status, original_end, paused_at, reason'
        ");
        echo "✅ Migration completed: paused_data column added\n";
    } else {
        echo "✅ Column paused_data already exists\n";
    }
    
} catch (Exception $e) {
    echo "❌ Migration error: " . $e->getMessage() . "\n";
}


/**
 * Migration: Add paused_data column to subscribers table
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Check if column exists first
    $stmt = $db->query("SHOW COLUMNS FROM subscribers LIKE 'paused_data'");
    $columnExists = $stmt->fetch();
    
    if (!$columnExists) {
        $db->exec("
            ALTER TABLE subscribers 
            ADD COLUMN paused_data TEXT NULL 
            COMMENT 'JSON with pause details: original_status, original_end, paused_at, reason'
        ");
        echo "✅ Migration completed: paused_data column added\n";
    } else {
        echo "✅ Column paused_data already exists\n";
    }
    
} catch (Exception $e) {
    echo "❌ Migration error: " . $e->getMessage() . "\n";
}



