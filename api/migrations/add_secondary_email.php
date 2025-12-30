<?php
/**
 * Migration: Add secondary_email field to subscribers table
 * This allows users who paid with one email to login with another
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Check if column already exists
    $stmt = $db->query("SHOW COLUMNS FROM subscribers LIKE 'secondary_email'");
    if ($stmt->fetch()) {
        echo "Column 'secondary_email' already exists.\n";
    } else {
        // Add secondary_email column
        $db->exec("ALTER TABLE subscribers ADD COLUMN secondary_email VARCHAR(255) NULL AFTER email");
        echo "✅ Added 'secondary_email' column to subscribers table.\n";
        
        // Add index for faster lookups
        $db->exec("CREATE INDEX idx_secondary_email ON subscribers(secondary_email)");
        echo "✅ Added index on secondary_email.\n";
    }
    
    echo "\n✅ Migration completed successfully!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
