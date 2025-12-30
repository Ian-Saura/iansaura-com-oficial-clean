<?php
/**
 * Setup Email Automation Database
 * Run this once to create all necessary tables
 */

require_once __DIR__ . '/db-config.php';

echo "========================================\n";
echo "EMAIL AUTOMATION DATABASE SETUP\n";
echo "========================================\n\n";

try {
    // Read SQL schema
    $schemaFile = __DIR__ . '/../database/email-automation-schema.sql';
    
    if (!file_exists($schemaFile)) {
        die("❌ Schema file not found: $schemaFile\n");
    }
    
    $sql = file_get_contents($schemaFile);
    
    // Split by semicolons to execute each statement separately
    $statements = array_filter(
        array_map('trim', explode(';', $sql)),
        function($stmt) { return !empty($stmt) && substr($stmt, 0, 2) !== '--'; }
    );
    
    echo "📝 Found " . count($statements) . " SQL statements\n\n";
    
    foreach ($statements as $index => $statement) {
        try {
            $pdo->exec($statement);
            
            // Extract table name for friendly output
            if (preg_match('/CREATE TABLE IF NOT EXISTS (\w+)/', $statement, $matches)) {
                echo "✅ Created table: {$matches[1]}\n";
            }
        } catch (PDOException $e) {
            echo "⚠️  Statement " . ($index + 1) . " failed: " . $e->getMessage() . "\n";
        }
    }
    
    echo "\n========================================\n";
    echo "✅ DATABASE SETUP COMPLETED\n";
    echo "========================================\n\n";
    
    // Verify tables exist
    echo "Verifying tables...\n\n";
    
    $tables = [
        'redflags_subscribers',
        'email_sequence_log',
        'broadcast_campaigns',
        'broadcast_send_log',
        'bootcamp_purchases'
    ];
    
    foreach ($tables as $table) {
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            echo "✅ $table exists\n";
        } else {
            echo "❌ $table NOT FOUND\n";
        }
    }
    
    echo "\n========================================\n";
    echo "NEXT STEPS:\n";
    echo "========================================\n";
    echo "1. Configure cron job:\n";
    echo "   0 * * * * /usr/bin/php " . __DIR__ . "/email-automation-cron.php\n\n";
    echo "2. Test the automation:\n";
    echo "   php " . __DIR__ . "/email-automation-cron.php\n\n";
    echo "3. Start promoting the /redflags landing page!\n\n";
    
} catch (Exception $e) {
    echo "\n❌ ERROR: " . $e->getMessage() . "\n";
    echo "Trace: " . $e->getTraceAsString() . "\n";
    exit(1);
}
?>




