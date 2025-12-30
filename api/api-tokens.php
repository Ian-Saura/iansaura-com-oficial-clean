<?php
/**
 * API Token Generator
 * Generates temporary tokens for API access
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
function getDBConnection() {
    $credentialsFile = __DIR__ . '/.db-credentials.php';
    if (!file_exists($credentialsFile)) {
        throw new Exception("Credentials file not found");
    }
    $credentials = include $credentialsFile;
    $dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";
    return new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
}

// Ensure api_tokens table exists
function ensureTableExists($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS api_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            token VARCHAR(64) NOT NULL UNIQUE,
            expires_at DATETIME NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            last_used_at DATETIME NULL,
            use_count INT DEFAULT 0,
            INDEX idx_token (token),
            INDEX idx_email (email),
            INDEX idx_expires (expires_at)
        )
    ");
}

$action = $_GET['action'] ?? '';

try {
    $db = getDBConnection();
    ensureTableExists($db);
    
    if ($action === 'generate' && $_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        $email = strtolower(trim($input['email'] ?? ''));
        $hours = intval($input['hours'] ?? 24);
        
        if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'error' => 'Invalid email']);
            exit();
        }
        
        // Limit hours to reasonable range
        $hours = max(1, min(168, $hours)); // 1 hour to 7 days
        
        // Check if user is a subscriber
        $stmt = $db->prepare("SELECT id, status FROM subscribers WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        $subscriber = $stmt->fetch();
        
        if (!$subscriber || !in_array($subscriber['status'], ['active', 'trial'])) {
            echo json_encode(['success' => false, 'error' => 'Not an active subscriber']);
            exit();
        }
        
        // Generate token
        $token = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime("+{$hours} hours"));
        
        // Delete old tokens for this user
        $stmt = $db->prepare("DELETE FROM api_tokens WHERE email = ?");
        $stmt->execute([$email]);
        
        // Insert new token
        $stmt = $db->prepare("
            INSERT INTO api_tokens (email, token, expires_at)
            VALUES (?, ?, ?)
        ");
        $stmt->execute([$email, $token, $expiresAt]);
        
        echo json_encode([
            'success' => true,
            'token' => $token,
            'expires_at' => $expiresAt
        ]);
        
    } elseif ($action === 'validate') {
        $token = $_GET['token'] ?? '';
        
        if (empty($token)) {
            echo json_encode(['valid' => false, 'error' => 'No token provided']);
            exit();
        }
        
        $stmt = $db->prepare("
            SELECT * FROM api_tokens 
            WHERE token = ? AND expires_at > NOW()
        ");
        $stmt->execute([$token]);
        $tokenData = $stmt->fetch();
        
        if ($tokenData) {
            // Update usage stats
            $stmt = $db->prepare("
                UPDATE api_tokens 
                SET last_used_at = NOW(), use_count = use_count + 1 
                WHERE token = ?
            ");
            $stmt->execute([$token]);
            
            echo json_encode([
                'valid' => true,
                'email' => $tokenData['email'],
                'expires_at' => $tokenData['expires_at']
            ]);
        } else {
            echo json_encode(['valid' => false, 'error' => 'Invalid or expired token']);
        }
        
    } else {
        echo json_encode(['error' => 'Invalid action. Use ?action=generate or ?action=validate']);
    }
    
} catch (Exception $e) {
    error_log("API Token error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Server error']);
}
