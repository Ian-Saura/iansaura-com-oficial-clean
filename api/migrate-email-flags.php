<?php
/**
 * Migration: Add email tracking flags to subscribers table
 * Run once: php migrate-email-flags.php
 */

require_once __DIR__ . '/.db-credentials.php';

$credentials = include __DIR__ . '/.db-credentials.php';

$dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $db = new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], $options);
    
    echo "Connected to database\n";
    
    // Add trial_reminder_sent column
    $db->exec("ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS trial_reminder_sent TINYINT(1) DEFAULT 0");
    echo "Added trial_reminder_sent column\n";
    
    // Add expired_email_sent column
    $db->exec("ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS expired_email_sent TINYINT(1) DEFAULT 0");
    echo "Added expired_email_sent column\n";
    
    // Add trial_ends_at column if not exists
    $db->exec("ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS trial_ends_at DATETIME NULL DEFAULT NULL");
    echo "Added trial_ends_at column\n";
    
    // Add current_streak column to subscribers if not exists (for email personalization)
    $db->exec("ALTER TABLE subscribers ADD COLUMN IF NOT EXISTS current_streak INT DEFAULT 0");
    echo "Added current_streak column\n";
    
    echo "\n✅ Migration completed successfully!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    exit(1);
}
?>
