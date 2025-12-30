<?php
/**
 * Migration: Add Gumroad columns to subscribers table
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Check existing columns
    $columns = $db->query("SHOW COLUMNS FROM subscribers")->fetchAll(PDO::FETCH_COLUMN);
    
    $added = [];
    
    if (!in_array('gumroad_subscription_id', $columns)) {
        $db->exec("ALTER TABLE subscribers ADD COLUMN gumroad_subscription_id VARCHAR(255) NULL");
        $added[] = 'gumroad_subscription_id';
    }
    
    if (!in_array('gumroad_sale_id', $columns)) {
        $db->exec("ALTER TABLE subscribers ADD COLUMN gumroad_sale_id VARCHAR(255) NULL");
        $added[] = 'gumroad_sale_id';
    }
    
    echo "Migration completed!\n";
    echo "Added columns: " . (empty($added) ? "none (already exist)" : implode(', ', $added)) . "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}



/**
 * Migration: Add Gumroad columns to subscribers table
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Check existing columns
    $columns = $db->query("SHOW COLUMNS FROM subscribers")->fetchAll(PDO::FETCH_COLUMN);
    
    $added = [];
    
    if (!in_array('gumroad_subscription_id', $columns)) {
        $db->exec("ALTER TABLE subscribers ADD COLUMN gumroad_subscription_id VARCHAR(255) NULL");
        $added[] = 'gumroad_subscription_id';
    }
    
    if (!in_array('gumroad_sale_id', $columns)) {
        $db->exec("ALTER TABLE subscribers ADD COLUMN gumroad_sale_id VARCHAR(255) NULL");
        $added[] = 'gumroad_sale_id';
    }
    
    echo "Migration completed!\n";
    echo "Added columns: " . (empty($added) ? "none (already exist)" : implode(', ', $added)) . "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}



/**
 * Migration: Add Gumroad columns to subscribers table
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Check existing columns
    $columns = $db->query("SHOW COLUMNS FROM subscribers")->fetchAll(PDO::FETCH_COLUMN);
    
    $added = [];
    
    if (!in_array('gumroad_subscription_id', $columns)) {
        $db->exec("ALTER TABLE subscribers ADD COLUMN gumroad_subscription_id VARCHAR(255) NULL");
        $added[] = 'gumroad_subscription_id';
    }
    
    if (!in_array('gumroad_sale_id', $columns)) {
        $db->exec("ALTER TABLE subscribers ADD COLUMN gumroad_sale_id VARCHAR(255) NULL");
        $added[] = 'gumroad_sale_id';
    }
    
    echo "Migration completed!\n";
    echo "Added columns: " . (empty($added) ? "none (already exist)" : implode(', ', $added)) . "\n";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}




