<?php
/**
 * Certificate Management API
 * - Store certificates for verification
 * - Verify certificate authenticity
 */

header('Content-Type: application/json');

// Allow CORS from multiple origins
$allowedOrigins = ['https://iansaura.com', 'https://www.iansaura.com', 'http://localhost:3000'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: https://iansaura.com');
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secure-config.php';

// Alias for compatibility
function getDbConnection() {
    return getSecureDBConnection();
}

// Ensure certificates table exists
function ensureCertificatesTable($db) {
    $db->exec("
        CREATE TABLE IF NOT EXISTS certificates (
            id INT AUTO_INCREMENT PRIMARY KEY,
            cert_id VARCHAR(50) UNIQUE NOT NULL,
            level INT NOT NULL,
            level_title VARCHAR(100) NOT NULL,
            user_name VARCHAR(255) NOT NULL,
            user_email VARCHAR(255),
            completed_date VARCHAR(50) NOT NULL,
            issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            verify_url VARCHAR(255),
            is_valid BOOLEAN DEFAULT TRUE,
            INDEX idx_cert_id (cert_id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    ");
}

try {
    $db = getDbConnection();
    ensureCertificatesTable($db);
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Store new certificate
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !isset($input['cert_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing cert_id']);
            exit();
        }
        
        // Check if certificate already exists
        $stmt = $db->prepare("SELECT id FROM certificates WHERE cert_id = ?");
        $stmt->execute([$input['cert_id']]);
        
        if ($stmt->fetch()) {
            // Certificate already exists, just return success
            echo json_encode(['success' => true, 'message' => 'Certificate already registered']);
            exit();
        }
        
        // Insert new certificate
        $stmt = $db->prepare("
            INSERT INTO certificates 
            (cert_id, level, level_title, user_name, completed_date, verify_url)
            VALUES (?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $input['cert_id'],
            $input['level'] ?? 1,
            $input['level_title'] ?? 'Unknown',
            $input['user_name'] ?? 'Unknown',
            $input['completed_date'] ?? date('Y-m-d'),
            $input['verify_url'] ?? ''
        ]);
        
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Verify certificate
        $certId = $_GET['id'] ?? '';
        
        if (!$certId) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing certificate ID']);
            exit();
        }
        
        $stmt = $db->prepare("
            SELECT cert_id, level, level_title, user_name, completed_date, issued_at, is_valid
            FROM certificates 
            WHERE cert_id = ?
        ");
        $stmt->execute([$certId]);
        $cert = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$cert) {
            echo json_encode([
                'valid' => false,
                'message' => 'Certificado no encontrado'
            ]);
            exit();
        }
        
        if (!$cert['is_valid']) {
            echo json_encode([
                'valid' => false,
                'message' => 'Este certificado ha sido revocado'
            ]);
            exit();
        }
        
        echo json_encode([
            'valid' => true,
            'certificate' => [
                'id' => $cert['cert_id'],
                'level' => $cert['level'],
                'level_title' => $cert['level_title'],
                'holder_name' => $cert['user_name'],
                'completed_date' => $cert['completed_date'],
                'issued_at' => $cert['issued_at'],
                'issuer' => 'Ian Saura - Academia de Data Engineering',
                'issuer_url' => 'https://iansaura.com'
            ]
        ]);
    }
    
} catch (Exception $e) {
    error_log("Certificates error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'details' => $e->getMessage()]);
}