<?php
/**
 * Migration: Add 'gumroad' to payment_type ENUM
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Modify ENUM to include 'gumroad'
    $db->exec("
        ALTER TABLE subscribers 
        MODIFY COLUMN payment_type ENUM('paid','invited','external','oneinfinite','manual','gumroad','trial_free') 
        DEFAULT NULL
    ");
    
    echo "✅ Migration completed: 'gumroad' added to payment_type ENUM\n";
    
    // Show new column definition
    $result = $db->query("SHOW COLUMNS FROM subscribers WHERE Field = 'payment_type'")->fetch(PDO::FETCH_ASSOC);
    echo "New column type: " . $result['Type'] . "\n";
    
} catch (Exception $e) {
    echo "❌ Migration error: " . $e->getMessage() . "\n";
}


/**
 * Migration: Add 'gumroad' to payment_type ENUM
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Modify ENUM to include 'gumroad'
    $db->exec("
        ALTER TABLE subscribers 
        MODIFY COLUMN payment_type ENUM('paid','invited','external','oneinfinite','manual','gumroad','trial_free') 
        DEFAULT NULL
    ");
    
    echo "✅ Migration completed: 'gumroad' added to payment_type ENUM\n";
    
    // Show new column definition
    $result = $db->query("SHOW COLUMNS FROM subscribers WHERE Field = 'payment_type'")->fetch(PDO::FETCH_ASSOC);
    echo "New column type: " . $result['Type'] . "\n";
    
} catch (Exception $e) {
    echo "❌ Migration error: " . $e->getMessage() . "\n";
}


/**
 * Migration: Add 'gumroad' to payment_type ENUM
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Modify ENUM to include 'gumroad'
    $db->exec("
        ALTER TABLE subscribers 
        MODIFY COLUMN payment_type ENUM('paid','invited','external','oneinfinite','manual','gumroad','trial_free') 
        DEFAULT NULL
    ");
    
    echo "✅ Migration completed: 'gumroad' added to payment_type ENUM\n";
    
    // Show new column definition
    $result = $db->query("SHOW COLUMNS FROM subscribers WHERE Field = 'payment_type'")->fetch(PDO::FETCH_ASSOC);
    echo "New column type: " . $result['Type'] . "\n";
    
} catch (Exception $e) {
    echo "❌ Migration error: " . $e->getMessage() . "\n";
}



