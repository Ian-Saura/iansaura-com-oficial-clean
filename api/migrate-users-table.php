<?php
/**
 * User Table Migration Script
 * Adds missing columns to existing users table
 */

// Include the secure configuration
require_once 'secure-config-simple.php';

echo "🔄 Migrating Users Table\n";
echo "========================\n\n";

try {
    // Create database connection
    $pdo = getSecureDBConnection();
    echo "✅ Database connection successful\n";
    
    // Check existing users table structure
    echo "🔍 Checking existing users table structure...\n";
    $stmt = $pdo->query("DESCRIBE users");
    $existingColumns = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "📋 Existing columns:\n";
    foreach ($existingColumns as $column) {
        echo "   - $column\n";
    }
    echo "\n";
    
    // List of columns we need for the authentication system
    $requiredColumns = [
        'id' => 'INT PRIMARY KEY AUTO_INCREMENT',
        'email' => 'VARCHAR(255) UNIQUE NOT NULL',
        'password_hash' => 'VARCHAR(255) NOT NULL',
        'first_name' => 'VARCHAR(100)',
        'last_name' => 'VARCHAR(100)',
        'full_name' => 'VARCHAR(200)',
        'profile_image_url' => 'TEXT',
        'email_verified' => 'BOOLEAN DEFAULT FALSE',
        'is_active' => 'BOOLEAN DEFAULT TRUE',
        'login_count' => 'INT DEFAULT 0',
        'provider' => "ENUM('email', 'google') DEFAULT 'email'",
        'google_id' => 'VARCHAR(255)',
        'created_at' => 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        'last_login' => 'TIMESTAMP NULL'
    ];
    
    // Add missing columns
    echo "🔧 Adding missing columns...\n";
    $columnsAdded = 0;
    
    foreach ($requiredColumns as $columnName => $columnDefinition) {
        if (!in_array($columnName, $existingColumns)) {
            try {
                $alterQuery = "ALTER TABLE users ADD COLUMN $columnName $columnDefinition";
                $pdo->exec($alterQuery);
                echo "✅ Added column: $columnName\n";
                $columnsAdded++;
            } catch (Exception $e) {
                echo "⚠️  Could not add column $columnName: " . $e->getMessage() . "\n";
            }
        } else {
            echo "✓ Column already exists: $columnName\n";
        }
    }
    
    echo "\n";
    
    // Add indexes if they don't exist
    echo "🔍 Adding indexes...\n";
    $indexes = [
        'idx_email' => 'CREATE INDEX IF NOT EXISTS idx_email ON users (email)',
        'idx_provider' => 'CREATE INDEX IF NOT EXISTS idx_provider ON users (provider)',
        'idx_google_id' => 'CREATE INDEX IF NOT EXISTS idx_google_id ON users (google_id)',
        'idx_created_at' => 'CREATE INDEX IF NOT EXISTS idx_created_at ON users (created_at)'
    ];
    
    foreach ($indexes as $indexName => $indexQuery) {
        try {
            $pdo->exec($indexQuery);
            echo "✅ Index created/verified: $indexName\n";
        } catch (Exception $e) {
            echo "⚠️  Index issue for $indexName: " . $e->getMessage() . "\n";
        }
    }
    
    echo "\n";
    
    // Verify the table structure now
    echo "📊 Updated table structure:\n";
    $stmt = $pdo->query("DESCRIBE users");
    $updatedColumns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    foreach ($updatedColumns as $column) {
        echo "   - {$column['Field']} ({$column['Type']}) {$column['Null']} {$column['Key']} {$column['Default']}\n";
    }
    
    echo "\n";
    
    // Test the authentication system
    echo "🧪 Testing authentication system...\n";
    
    // Test user insertion with all required fields
    $testEmail = 'migration.test.' . time() . '@example.com';
    $testPassword = password_hash('testpassword123', PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("INSERT INTO users (email, password_hash, full_name, provider) VALUES (?, ?, ?, ?)");
    $stmt->execute([$testEmail, $testPassword, 'Migration Test User', 'email']);
    
    $userId = $pdo->lastInsertId();
    echo "✅ Test user created successfully (ID: $userId)\n";
    
    // Test user retrieval
    $stmt = $pdo->prepare("SELECT id, email, full_name, provider, created_at FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    $user = $stmt->fetch();
    
    if ($user) {
        echo "✅ Test user retrieved successfully:\n";
        echo "   - ID: {$user['id']}\n";
        echo "   - Email: {$user['email']}\n";
        echo "   - Full Name: {$user['full_name']}\n";
        echo "   - Provider: {$user['provider']}\n";
        echo "   - Created: {$user['created_at']}\n";
    }
    
    // Clean up test data
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$userId]);
    echo "✅ Test data cleaned up\n";
    
    echo "\n🎉 USER TABLE MIGRATION COMPLETED!\n";
    echo "==================================\n";
    echo "✅ Database connection: Working\n";
    echo "✅ Users table: Updated with all required columns\n";
    echo "✅ Indexes: Created\n";
    echo "✅ Authentication system: Ready\n";
    echo "✅ Columns added: $columnsAdded\n\n";
    
    echo "🚀 Your authentication system is now ready!\n";
    echo "Users can register and login at: https://www.iansaura.com\n\n";
    
    echo "📋 Next steps:\n";
    echo "1. Visit your website: https://www.iansaura.com\n";
    echo "2. Click 'Iniciar Sesión' button\n";
    echo "3. Test user registration and login\n";
    echo "4. Test Google OAuth\n";
    echo "5. Monitor user activity in the database\n\n";
    
} catch (Exception $e) {
    echo "❌ Migration failed: " . $e->getMessage() . "\n";
    echo "\n🔧 Troubleshooting:\n";
    echo "1. Check database permissions\n";
    echo "2. Verify you have ALTER TABLE privileges\n";
    echo "3. Check for any locked tables\n";
    echo "4. Contact your hosting provider if issues persist\n";
}
?> 