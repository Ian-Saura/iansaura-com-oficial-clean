<?php
/**
 * Production Database Setup Script
 * Ian Saura Data Engineering Hub
 * 
 * Run this script once to set up your production database
 */

require_once 'api/secure-config.php';

echo "🚀 Setting up Production Database...\n\n";

try {
    // Connect to database
    echo "📡 Connecting to database...\n";
    $pdo = getSecureDBConnection();
    echo "✅ Database connection successful!\n\n";
    
    // Read and execute schema
    echo "📝 Creating database tables...\n";
    $schemaFile = __DIR__ . '/database/schema.sql';
    
    if (!file_exists($schemaFile)) {
        throw new Exception('Schema file not found: ' . $schemaFile);
    }
    
    $schema = file_get_contents($schemaFile);
    
    // Split into individual statements and execute
    $statements = array_filter(array_map('trim', explode(';', $schema)));
    
    foreach ($statements as $statement) {
        if (empty($statement) || strpos($statement, '--') === 0) {
            continue; // Skip empty lines and comments
        }
        
        try {
            $pdo->exec($statement);
        } catch (PDOException $e) {
            // Continue if table already exists
            if (strpos($e->getMessage(), 'already exists') === false) {
                throw $e;
            }
        }
    }
    
    echo "✅ Database tables created successfully!\n\n";
    
    // Verify tables were created
    echo "📊 Verifying tables...\n";
    $stmt = $pdo->query("SHOW TABLES");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    $expectedTables = [
        'users',
        'subscriptions', 
        'contact_messages',
        'user_activity_logs',
        'analytics_events',
        'waitlist'
    ];
    
    foreach ($expectedTables as $table) {
        if (in_array($table, $tables)) {
            echo "   ✓ $table\n";
        } else {
            echo "   ⚠️  $table (missing)\n";
        }
    }
    
    echo "\n📈 Testing database functionality...\n";
    
    // Test user creation
    $testEmail = 'test_' . time() . '@example.com';
    $testPassword = password_hash('test123', PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("
        INSERT INTO users (email, password_hash, first_name, last_name, full_name, email_verified, is_active) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $testEmail,
        $testPassword,
        'Test',
        'User',
        'Test User',
        1,
        1
    ]);
    
    $testUserId = $pdo->lastInsertId();
    echo "✅ Test user created (ID: $testUserId)\n";
    
    // Clean up test user
    $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
    $stmt->execute([$testUserId]);
    echo "✅ Test user cleaned up\n\n";
    
    echo "🎉 Database setup completed successfully!\n\n";
    
    echo "📋 Next steps:\n";
    echo "1. ✅ Database is ready for user signups\n";
    echo "2. 🌐 Deploy your application to production\n";
    echo "3. 🧪 Test the signup form on your website\n";
    echo "4. 📊 Monitor user registrations in the analytics dashboard\n\n";
    
    echo "🔗 Analytics Dashboard: https://yourdomain.com/api/analytics-dashboard.php\n";
    echo "🔒 Default password: admin123! (change this!)\n\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n\n";
    
    if (strpos($e->getMessage(), 'Connection refused') !== false) {
        echo "💡 Database connection failed. Check:\n";
        echo "   - Database host and port\n";
        echo "   - Database credentials in api/secure-config.php\n";
        echo "   - Firewall settings\n\n";
    } elseif (strpos($e->getMessage(), 'Access denied') !== false) {
        echo "💡 Database access denied. Check:\n";
        echo "   - Username and password\n";
        echo "   - User permissions on the database\n\n";
    } elseif (strpos($e->getMessage(), 'Unknown database') !== false) {
        echo "💡 Database not found. Check:\n";
        echo "   - Database name is correct\n";
        echo "   - Database exists on the server\n\n";
    }
    
    exit(1);
}
?> 