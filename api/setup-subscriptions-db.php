<?php
/**
 * Setup Subscriptions Database Tables
 * Run once to create the required tables
 */

header('Content-Type: text/plain');

echo "=== Setting up Subscriptions Database ===\n\n";

try {
    // Load credentials from .db-credentials.php
    $credentialsFile = __DIR__ . '/.db-credentials.php';
    
    if (!file_exists($credentialsFile)) {
        throw new Exception("Credentials file not found: $credentialsFile");
    }
    
    $credentials = include $credentialsFile;
    
    // Connect to database
    $dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    $db = new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], $options);
    echo "✅ Database connection successful\n\n";
    
    // Create subscribers table
    echo "Creating subscribers table...\n";
    $db->exec("
        CREATE TABLE IF NOT EXISTS subscribers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            
            -- OneInfinite data
            oneinfinite_subscription_id VARCHAR(100) UNIQUE,
            oneinfinite_customer_id VARCHAR(100),
            
            -- User info
            email VARCHAR(255) NOT NULL,
            name VARCHAR(255),
            phone VARCHAR(50),
            
            -- Discord info
            discord_username VARCHAR(100),
            discord_user_id VARCHAR(50),
            discord_role_assigned BOOLEAN DEFAULT FALSE,
            
            -- Subscription status
            status ENUM('active', 'cancelled', 'expired', 'pending', 'failed') DEFAULT 'pending',
            subscription_type VARCHAR(50) DEFAULT 'monthly',
            
            -- Dates
            subscription_start DATETIME,
            subscription_end DATETIME,
            next_payment_date DATETIME,
            cancelled_at DATETIME,
            
            -- Payment info
            amount DECIMAL(10,2),
            currency VARCHAR(10) DEFAULT 'USD',
            last_payment_date DATETIME,
            payment_method VARCHAR(50),
            
            -- Metadata
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            -- Indexes
            INDEX idx_email (email),
            INDEX idx_status (status),
            INDEX idx_discord_id (discord_user_id),
            INDEX idx_subscription_end (subscription_end)
        )
    ");
    echo "✅ Created table: subscribers\n";
    
    // Create subscription_events table
    echo "Creating subscription_events table...\n";
    $db->exec("
        CREATE TABLE IF NOT EXISTS subscription_events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subscriber_id INT,
            event_type ENUM('created', 'activated', 'payment_received', 'payment_failed', 'cancelled', 'expired', 'reactivated', 'discord_role_added', 'discord_role_removed', 'youtube_access_granted', 'youtube_access_revoked') NOT NULL,
            event_data JSON,
            oneinfinite_event_id VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE,
            INDEX idx_subscriber (subscriber_id),
            INDEX idx_event_type (event_type),
            INDEX idx_created (created_at)
        )
    ");
    echo "✅ Created table: subscription_events\n";
    
    // Create pending_discord_connections table
    echo "Creating pending_discord_connections table...\n";
    $db->exec("
        CREATE TABLE IF NOT EXISTS pending_discord_connections (
            id INT AUTO_INCREMENT PRIMARY KEY,
            subscriber_id INT NOT NULL,
            connection_token VARCHAR(100) UNIQUE NOT NULL,
            email VARCHAR(255) NOT NULL,
            expires_at DATETIME NOT NULL,
            used BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE CASCADE,
            INDEX idx_token (connection_token),
            INDEX idx_email (email)
        )
    ");
    echo "✅ Created table: pending_discord_connections\n";
    
    // Create admin_notifications table
    echo "Creating admin_notifications table...\n";
    $db->exec("
        CREATE TABLE IF NOT EXISTS admin_notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            notification_type ENUM('new_subscriber', 'cancelled', 'payment_failed', 'discord_pending', 'youtube_action_needed') NOT NULL,
            subscriber_id INT,
            message TEXT,
            email_sent BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            FOREIGN KEY (subscriber_id) REFERENCES subscribers(id) ON DELETE SET NULL,
            INDEX idx_sent (email_sent)
        )
    ");
    echo "✅ Created table: admin_notifications\n";
    
    echo "\n=== Database setup completed ===\n";
    
    // Show table status
    echo "\n📊 Table Status:\n";
    
    $tables = ['subscribers', 'subscription_events', 'pending_discord_connections', 'admin_notifications'];
    
    foreach ($tables as $table) {
        try {
            $stmt = $db->query("SELECT COUNT(*) as count FROM $table");
            $count = $stmt->fetch()['count'];
            echo "   - $table: $count rows\n";
        } catch (PDOException $e) {
            echo "   - $table: ❌ Error - " . $e->getMessage() . "\n";
        }
    }
    
    echo "\n✅ All done! Subscription system is ready.\n";
    
} catch (Exception $e) {
    echo "❌ ERROR: " . $e->getMessage() . "\n";
    exit(1);
}
?>