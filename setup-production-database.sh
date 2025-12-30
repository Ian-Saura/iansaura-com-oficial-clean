#!/bin/bash

# Production Database Setup Guide
# Ian Saura Data Engineering Hub

echo "🗄️  Production Database Setup Guide"
echo "===================================="
echo ""

echo "📋 You need to configure your production database credentials."
echo "   This involves updating your secure configuration files."
echo ""

echo "🔧 Steps to configure production database:"
echo ""

echo "1. 📝 Update api/secure-config.php with your database credentials:"
echo "   - DB_HOST: Your database server hostname"
echo "   - DB_NAME: Your database name (usually provided by your hosting provider)"
echo "   - DB_USER: Your database username"
echo "   - DB_PASSWORD: Your database password"
echo ""

echo "2. 🏢 For Ferozo hosting, your credentials are typically:"
echo "   - DB_HOST: 'localhost' or your specific DB server"
echo "   - DB_NAME: Something like 'c2621673_your_db_name'"
echo "   - DB_USER: Your cPanel username or specific DB user"
echo "   - DB_PASSWORD: The password you set for the database"
echo ""

echo "3. 📍 You can find these in your hosting control panel:"
echo "   - Login to your Ferozo cPanel"
echo "   - Go to 'MySQL Databases' or 'Database Management'"
echo "   - Look for your database connection details"
echo ""

echo "4. 🔒 Update the configuration:"
echo "   - Edit api/secure-config.php"
echo "   - Or create a .env file with your credentials"
echo "   - Make sure to use the exact credentials from your hosting provider"
echo ""

echo "📊 Example configuration (api/secure-config.php):"
echo ""
cat << 'EOF'
<?php
// Production Database Configuration

// Database credentials from your hosting provider
define('DB_HOST', 'localhost');                    // Usually localhost
define('DB_NAME', 'c2621673_your_database_name');  // Your actual DB name
define('DB_USER', 'c2621673_your_username');       // Your actual DB user
define('DB_PASSWORD', 'your_actual_password');     // Your actual DB password

// Other configuration...
define('ADMIN_PASSWORD', 'your_secure_admin_password');
define('JWT_SECRET', 'your_secure_jwt_secret');

// OneinFinite credentials (already configured)
$ONEINFINITE_API_KEY = '***REMOVED***';
$ONEINFINITE_API_SECRET = '***REMOVED***';

function getSecureDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 30
        ];
        return new PDO($dsn, DB_USER, DB_PASSWORD, $options);
    } catch (PDOException $e) {
        error_log('Database connection failed: ' . $e->getMessage());
        throw new Exception('Database configuration error');
    }
}
?>
EOF

echo ""
echo "⚠️  IMPORTANT SECURITY NOTES:"
echo "   - Never commit database passwords to version control"
echo "   - Use strong, unique passwords"
echo "   - Keep your database credentials secure"
echo ""

echo "🧪 After configuring, test with:"
echo "   php test-production-database.php"
echo ""

echo "🌐 Then test the APIs with:"
echo "   php test-production-apis.php"
echo ""

echo "💡 If you don't have production database credentials yet:"
echo "   1. Contact your hosting provider (Ferozo)"
echo "   2. Set up a MySQL database in your control panel"
echo "   3. Note down the connection details"
echo "   4. Update the configuration files"
echo ""

echo "✅ Once configured, you'll be able to test the full production setup!" 