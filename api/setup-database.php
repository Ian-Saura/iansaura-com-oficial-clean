<?php
/**
 * Database Setup Script
 * Creates all necessary tables for the authentication system
 * Run this ONCE on your production server
 */

// Include the secure configuration
require_once 'secure-config-simple.php';

echo "🔧 Setting up Production Database\n";
echo "=================================\n\n";

try {
    // Create database connection
    $pdo = getSecureDBConnection();
    echo "✅ Database connection successful\n";
    
    // Create users table
    $createUsersTable = "
        CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            first_name VARCHAR(100),
            last_name VARCHAR(100),
            full_name VARCHAR(200),
            profile_image_url TEXT,
            email_verified BOOLEAN DEFAULT FALSE,
            is_active BOOLEAN DEFAULT TRUE,
            login_count INT DEFAULT 0,
            provider ENUM('email', 'google') DEFAULT 'email',
            google_id VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP NULL,
            
            INDEX idx_email (email),
            INDEX idx_provider (provider),
            INDEX idx_google_id (google_id),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createUsersTable);
    echo "✅ Users table created/verified\n";
    
    // Create user_activity table for tracking
    $createActivityTable = "
        CREATE TABLE IF NOT EXISTS user_activity (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            activity_type ENUM('login', 'logout', 'register', 'password_change', 'email_change') NOT NULL,
            ip_address VARCHAR(45),
            user_agent TEXT,
            session_id VARCHAR(255),
            additional_data JSON,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            INDEX idx_user_id (user_id),
            INDEX idx_activity_type (activity_type),
            INDEX idx_created_at (created_at),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createActivityTable);
    echo "✅ User activity table created/verified\n";
    
    // Create contact_submissions table
    $createContactTable = "
        CREATE TABLE IF NOT EXISTS contact_submissions (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            subject VARCHAR(500),
            message TEXT NOT NULL,
            ip_address VARCHAR(45),
            user_agent TEXT,
            status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            INDEX idx_email (email),
            INDEX idx_status (status),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createContactTable);
    echo "✅ Contact submissions table created/verified\n";
    
    // Create sessions table for secure session management
    $createSessionsTable = "
        CREATE TABLE IF NOT EXISTS user_sessions (
            id VARCHAR(128) PRIMARY KEY,
            user_id INT NOT NULL,
            ip_address VARCHAR(45),
            user_agent TEXT,
            expires_at TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            
            INDEX idx_user_id (user_id),
            INDEX idx_expires_at (expires_at),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createSessionsTable);
    echo "✅ User sessions table created/verified\n";
    
    // Create analytics table for tracking
    $createAnalyticsTable = "
        CREATE TABLE IF NOT EXISTS page_analytics (
            id INT PRIMARY KEY AUTO_INCREMENT,
            page_path VARCHAR(500) NOT NULL,
            page_title VARCHAR(500),
            user_id INT NULL,
            session_id VARCHAR(255),
            ip_address VARCHAR(45),
            user_agent TEXT,
            referrer TEXT,
            visit_duration INT DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            INDEX idx_page_path (page_path),
            INDEX idx_user_id (user_id),
            INDEX idx_session_id (session_id),
            INDEX idx_created_at (created_at),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ";
    
    $pdo->exec($createAnalyticsTable);
    echo "✅ Analytics table created/verified\n";
    
    // Verify all tables were created
    echo "\n📊 Database Status:\n";
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    foreach ($tables as $table) {
        echo "   ✅ $table\n";
    }
    
    echo "\n🎉 Database setup completed successfully!\n";
    echo "Your authentication system is now ready to use.\n\n";
    
    // Test basic functionality
    echo "🧪 Testing basic functionality...\n";
    
    // Test user insertion
    $testEmail = 'setup.test.' . time() . '@example.com';
    $testPassword = password_hash('testpassword123', PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, full_name, provider) VALUES (?, ?, ?, ?)");
    $stmt->execute([$testEmail, $testPassword, 'Setup Test User', 'email']);
    
    $userId = $pdo->lastInsertId();
    echo "✅ Test user created (ID: $userId)\n";
    
    // Test user retrieval
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    
    if ($user) {
        echo "✅ Test user retrieved successfully\n";
    }
    
    // Log the test registration
    $stmt = $pdo->prepare("INSERT INTO user_activity (user_id, activity_type, ip_address) VALUES (?, 'register', ?)");
    $stmt->execute([$userId, $_SERVER['REMOTE_ADDR'] ?? 'localhost']);
    echo "✅ Activity logging working\n";
    
    // Clean up test data
    $stmt = $pdo->prepare("DELETE FROM user_activity WHERE user_id = ?");
    $stmt->execute([$userId]);
    
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    echo "✅ Test data cleaned up\n";
    
    echo "\n🚀 SETUP COMPLETE!\n";
    echo "==================\n";
    echo "Your production database is ready!\n";
    echo "Users can now register and login on your website.\n\n";
    
    echo "📋 Next steps:\n";
    echo "1. Visit https://www.iansaura.com\n";
    echo "2. Click 'Iniciar Sesión' button\n";
    echo "3. Test user registration and login\n";
    echo "4. Monitor user activity in the database\n\n";
    
} catch (Exception $e) {
    echo "❌ Setup failed: " . $e->getMessage() . "\n";
    echo "\n🔧 Troubleshooting:\n";
    echo "1. Check database credentials in secure-config-simple.php\n";
    echo "2. Verify database server is running\n";
    echo "3. Check database permissions\n";
    echo "4. Contact your hosting provider if issues persist\n";
}
?> 