<?php
/**
 * Referral System API
 * Sistema de referidos para Ian Saura Data Engineering Hub
 * 
 * BENEFICIOS:
 * - Referido: 7 días de prueba gratis + 10% descuento en bootcamps
 * - Referente: 10% descuento en bootcamps por cada referido
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secure-config.php';

try {
    $pdo = getSecureDBConnection();
    
    // Create referrals table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS referrals (
            id INT AUTO_INCREMENT PRIMARY KEY,
            referrer_email VARCHAR(255) NOT NULL,
            referrer_code VARCHAR(20) NOT NULL UNIQUE,
            referred_email VARCHAR(255) DEFAULT NULL,
            referred_at TIMESTAMP DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_referrer (referrer_email),
            INDEX idx_code (referrer_code)
        )
    ");
    
    // Create discount codes table
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS referral_discounts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            discount_code VARCHAR(50) NOT NULL UNIQUE,
            discount_percent INT NOT NULL DEFAULT 10,
            source_type ENUM('referrer', 'referred') NOT NULL,
            used BOOLEAN DEFAULT FALSE,
            expires_at TIMESTAMP DEFAULT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_email (email)
        )
    ");
    
    $action = $_GET['action'] ?? $_POST['action'] ?? null;
    
    switch ($action) {
        case 'get_code':
            $email = $_GET['email'] ?? null;
            if (!$email) {
                echo json_encode(['success' => false, 'error' => 'Email required']);
                exit;
            }
            
            $stmt = $pdo->prepare("SELECT referrer_code FROM referrals WHERE referrer_email = ? AND referred_email IS NULL LIMIT 1");
            $stmt->execute([$email]);
            $existing = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($existing) {
                echo json_encode(['success' => true, 'code' => $existing['referrer_code']]);
            } else {
                $code = 'IS' . strtoupper(substr(md5($email . time() . rand()), 0, 6));
                $stmt = $pdo->prepare("INSERT INTO referrals (referrer_email, referrer_code) VALUES (?, ?)");
                $stmt->execute([$email, $code]);
                echo json_encode(['success' => true, 'code' => $code]);
            }
            break;
            
        case 'get_stats':
            $email = $_GET['email'] ?? null;
            if (!$email) {
                echo json_encode(['success' => false, 'error' => 'Email required']);
                exit;
            }
            
            $stmt = $pdo->prepare("SELECT COUNT(*) as total FROM referrals WHERE referrer_email = ? AND referred_email IS NOT NULL");
            $stmt->execute([$email]);
            $stats = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $stmt = $pdo->prepare("SELECT referred_email, referred_at FROM referrals WHERE referrer_email = ? AND referred_email IS NOT NULL ORDER BY referred_at DESC LIMIT 10");
            $stmt->execute([$email]);
            $referrals = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $stmt = $pdo->prepare("SELECT referrer_code FROM referrals WHERE referrer_email = ? AND referred_email IS NULL LIMIT 1");
            $stmt->execute([$email]);
            $codeRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            $stmt = $pdo->prepare("SELECT discount_code, discount_percent, expires_at FROM referral_discounts WHERE email = ? AND used = FALSE AND (expires_at IS NULL OR expires_at > NOW())");
            $stmt->execute([$email]);
            $discounts = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'success' => true,
                'code' => $codeRow['referrer_code'] ?? null,
                'stats' => ['total' => (int)$stats['total']],
                'referrals' => $referrals,
                'discounts' => $discounts,
                'benefits' => [
                    'referrer' => '10% de descuento en bootcamps por cada amigo',
                    'referred' => '7 días de prueba gratis + 10% descuento en bootcamps'
                ]
            ]);
            break;
            
        case 'validate_code':
            $code = $_GET['code'] ?? null;
            if (!$code) {
                echo json_encode(['success' => false, 'error' => 'Code required']);
                exit;
            }
            
            $stmt = $pdo->prepare("SELECT r.id, u.name FROM referrals r LEFT JOIN registered_users u ON r.referrer_email = u.email WHERE r.referrer_code = ? AND r.referred_email IS NULL");
            $stmt->execute([$code]);
            $referral = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'success' => true,
                'valid' => (bool)$referral,
                'referrer_name' => $referral['name'] ?? 'Un miembro',
                'benefits' => $referral ? ['7 días de prueba gratis', '10% descuento en bootcamps'] : []
            ]);
            break;
            
        case 'apply_code':
            $input = json_decode(file_get_contents('php://input'), true);
            $code = $input['code'] ?? null;
            $email = $input['email'] ?? null;
            
            if (!$code || !$email) {
                echo json_encode(['success' => false, 'error' => 'Code and email required']);
                exit;
            }
            
            $stmt = $pdo->prepare("SELECT id, referrer_email FROM referrals WHERE referrer_code = ? AND referred_email IS NULL");
            $stmt->execute([$code]);
            $referral = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$referral) {
                echo json_encode(['success' => false, 'error' => 'Código inválido o ya usado']);
                exit;
            }
            
            if ($referral['referrer_email'] === $email) {
                echo json_encode(['success' => false, 'error' => 'No podés usar tu propio código']);
                exit;
            }
            
            $pdo->beginTransaction();
            try {
                // Mark referral as used
                $stmt = $pdo->prepare("UPDATE referrals SET referred_email = ?, referred_at = NOW() WHERE id = ?");
                $stmt->execute([$email, $referral['id']]);
                
                // Create new code for referrer
                $newCode = 'IS' . strtoupper(substr(md5($referral['referrer_email'] . time() . rand()), 0, 6));
                $stmt = $pdo->prepare("INSERT INTO referrals (referrer_email, referrer_code) VALUES (?, ?)");
                $stmt->execute([$referral['referrer_email'], $newCode]);
                
                // Give 7-day trial to referred user
                $trialEnd = date('Y-m-d H:i:s', strtotime('+7 days'));
                $stmt = $pdo->prepare("UPDATE registered_users SET is_trial = TRUE, trial_ends_at = ? WHERE email = ?");
                $stmt->execute([$trialEnd, $email]);
                
                // Create 10% discount for referred
                $referredDiscount = 'REF10-' . strtoupper(substr(md5($email . time()), 0, 6));
                $stmt = $pdo->prepare("INSERT INTO referral_discounts (email, discount_code, discount_percent, source_type, expires_at) VALUES (?, ?, 10, 'referred', DATE_ADD(NOW(), INTERVAL 30 DAY))");
                $stmt->execute([$email, $referredDiscount]);
                
                // Create 10% discount for referrer
                $referrerDiscount = 'REF10-' . strtoupper(substr(md5($referral['referrer_email'] . time()), 0, 6));
                $stmt = $pdo->prepare("INSERT INTO referral_discounts (email, discount_code, discount_percent, source_type, expires_at) VALUES (?, ?, 10, 'referrer', DATE_ADD(NOW(), INTERVAL 90 DAY))");
                $stmt->execute([$referral['referrer_email'], $referrerDiscount]);
                
                $pdo->commit();
                
                echo json_encode([
                    'success' => true,
                    'message' => '¡Código aplicado! Tenés 7 días de prueba gratis',
                    'benefits' => [
                        'trial_days' => 7,
                        'trial_ends' => $trialEnd,
                        'discount_code' => $referredDiscount,
                        'discount_percent' => 10
                    ]
                ]);
            } catch (Exception $e) {
                $pdo->rollBack();
                throw $e;
            }
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>
