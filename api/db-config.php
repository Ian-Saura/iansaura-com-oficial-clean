<?php
/**
 * Secure Database Configuration
 * Ian Saura Data Engineering Hub
 */

// Load environment variables securely
function loadDatabaseConfig() {
    $envFile = __DIR__ . '/../database/.env.database';
    
    if (!file_exists($envFile)) {
        throw new Exception('Database configuration file not found');
    }
    
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    $config = [];
    
    foreach ($lines as $line) {
        if (strpos($line, '#') === 0) continue; // Skip comments
        
        list($key, $value) = explode('=', $line, 2);
        $config[trim($key)] = trim($value);
    }
    
    return $config;
}

// Get database configuration
try {
    $dbConfig = loadDatabaseConfig();
    
    // Database connection parameters
    define('DB_HOST', $dbConfig['DB_HOST']);
    define('DB_NAME', $dbConfig['DB_NAME']);
    define('DB_USER', $dbConfig['DB_USER']);
    define('DB_PASSWORD', $dbConfig['DB_PASSWORD']);
    define('DB_CHARSET', $dbConfig['DB_CHARSET']);
    
    // Security settings
    define('DB_TIMEOUT', (int)$dbConfig['DB_TIMEOUT']);
    define('LOG_USER_ACTIONS', $dbConfig['LOG_USER_ACTIONS'] === 'true');
    define('LOG_RETENTION_DAYS', (int)$dbConfig['LOG_RETENTION_DAYS']);
    
} catch (Exception $e) {
    error_log('Database configuration error: ' . $e->getMessage());
    die('Database configuration error');
}

// Create secure database connection
function getSecureDBConnection() {
    try {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => DB_TIMEOUT,
            PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false
        ];
        
        $pdo = new PDO($dsn, DB_USER, DB_PASSWORD, $options);
        return $pdo;
        
    } catch (PDOException $e) {
        error_log('Database connection failed: ' . $e->getMessage());
        throw new Exception('Database connection failed');
    }
}

?> 