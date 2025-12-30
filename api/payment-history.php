<?php
/**
 * Payment History API
 * Returns payment history for a user from Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secrets.php';
require_once 'secure-config.php';

if (!defined('GUMROAD_ACCESS_TOKEN')) {
    echo json_encode(['success' => false, 'error' => 'GUMROAD_ACCESS_TOKEN not configured']);
    exit();
}

$email = $_GET['email'] ?? null;

if (!$email) {
    echo json_encode(['success' => false, 'error' => 'Email required']);
    exit();
}

try {
    // Get local subscription info
    $db = getSecureDBConnection();
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $localSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $payments = [];
    $subscription = null;
    
    // Fetch from Gumroad if we have access token
    $gumroadSales = fetchGumroadSalesByEmail($email);
    
    foreach ($gumroadSales as $sale) {
        $payments[] = [
            'id' => $sale['id'] ?? null,
            'date' => $sale['created_at'] ?? null,
            'amount' => floatval($sale['price'] ?? 0) / 100, // Convert cents to dollars
            'currency' => $sale['currency'] ?? 'USD',
            'product' => $sale['product_name'] ?? 'Ian Saura Premium',
            'status' => isset($sale['refunded']) && $sale['refunded'] ? 'refunded' : 'completed',
            'source' => 'gumroad',
            'receipt_url' => $sale['receipt_url'] ?? null
        ];
    }
    
    // Add subscription info
    if ($localSubscriber) {
        $subscription = [
            'status' => $localSubscriber['status'],
            'payment_type' => $localSubscriber['payment_type'],
            'start_date' => $localSubscriber['subscription_start'],
            'end_date' => $localSubscriber['subscription_end'],
            'is_trial' => $localSubscriber['status'] === 'trial',
            'created_at' => $localSubscriber['created_at']
        ];
    }
    
    // Sort payments by date (newest first)
    usort($payments, function($a, $b) {
        return strtotime($b['date'] ?? '0') - strtotime($a['date'] ?? '0');
    });
    
    echo json_encode([
        'success' => true,
        'email' => $email,
        'subscription' => $subscription,
        'payments' => $payments,
        'total_paid' => array_reduce($payments, function($sum, $p) {
            return $sum + ($p['status'] === 'completed' ? $p['amount'] : 0);
        }, 0)
    ]);
    
} catch (Exception $e) {
    error_log("Payment history error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Fetch sales from Gumroad filtered by email
 */
function fetchGumroadSalesByEmail($email) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/sales?access_token=" . GUMROAD_ACCESS_TOKEN . "&email=" . urlencode($email),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        error_log("Gumroad sales API returned HTTP $httpCode for email: $email");
        return [];
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        error_log("Gumroad sales API error for email: $email - " . json_encode($data));
        return [];
    }
    
    return $data['sales'] ?? [];
}


/**
 * Payment History API
 * Returns payment history for a user from Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secrets.php';
require_once 'secure-config.php';

if (!defined('GUMROAD_ACCESS_TOKEN')) {
    echo json_encode(['success' => false, 'error' => 'GUMROAD_ACCESS_TOKEN not configured']);
    exit();
}

$email = $_GET['email'] ?? null;

if (!$email) {
    echo json_encode(['success' => false, 'error' => 'Email required']);
    exit();
}

try {
    // Get local subscription info
    $db = getSecureDBConnection();
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $localSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $payments = [];
    $subscription = null;
    
    // Fetch from Gumroad if we have access token
    $gumroadSales = fetchGumroadSalesByEmail($email);
    
    foreach ($gumroadSales as $sale) {
        $payments[] = [
            'id' => $sale['id'] ?? null,
            'date' => $sale['created_at'] ?? null,
            'amount' => floatval($sale['price'] ?? 0) / 100, // Convert cents to dollars
            'currency' => $sale['currency'] ?? 'USD',
            'product' => $sale['product_name'] ?? 'Ian Saura Premium',
            'status' => isset($sale['refunded']) && $sale['refunded'] ? 'refunded' : 'completed',
            'source' => 'gumroad',
            'receipt_url' => $sale['receipt_url'] ?? null
        ];
    }
    
    // Add subscription info
    if ($localSubscriber) {
        $subscription = [
            'status' => $localSubscriber['status'],
            'payment_type' => $localSubscriber['payment_type'],
            'start_date' => $localSubscriber['subscription_start'],
            'end_date' => $localSubscriber['subscription_end'],
            'is_trial' => $localSubscriber['status'] === 'trial',
            'created_at' => $localSubscriber['created_at']
        ];
    }
    
    // Sort payments by date (newest first)
    usort($payments, function($a, $b) {
        return strtotime($b['date'] ?? '0') - strtotime($a['date'] ?? '0');
    });
    
    echo json_encode([
        'success' => true,
        'email' => $email,
        'subscription' => $subscription,
        'payments' => $payments,
        'total_paid' => array_reduce($payments, function($sum, $p) {
            return $sum + ($p['status'] === 'completed' ? $p['amount'] : 0);
        }, 0)
    ]);
    
} catch (Exception $e) {
    error_log("Payment history error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Fetch sales from Gumroad filtered by email
 */
function fetchGumroadSalesByEmail($email) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/sales?access_token=" . GUMROAD_ACCESS_TOKEN . "&email=" . urlencode($email),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        error_log("Gumroad sales API returned HTTP $httpCode for email: $email");
        return [];
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        error_log("Gumroad sales API error for email: $email - " . json_encode($data));
        return [];
    }
    
    return $data['sales'] ?? [];
}


/**
 * Payment History API
 * Returns payment history for a user from Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secrets.php';
require_once 'secure-config.php';

if (!defined('GUMROAD_ACCESS_TOKEN')) {
    echo json_encode(['success' => false, 'error' => 'GUMROAD_ACCESS_TOKEN not configured']);
    exit();
}

$email = $_GET['email'] ?? null;

if (!$email) {
    echo json_encode(['success' => false, 'error' => 'Email required']);
    exit();
}

try {
    // Get local subscription info
    $db = getSecureDBConnection();
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $localSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $payments = [];
    $subscription = null;
    
    // Fetch from Gumroad if we have access token
    $gumroadSales = fetchGumroadSalesByEmail($email);
    
    foreach ($gumroadSales as $sale) {
        $payments[] = [
            'id' => $sale['id'] ?? null,
            'date' => $sale['created_at'] ?? null,
            'amount' => floatval($sale['price'] ?? 0) / 100, // Convert cents to dollars
            'currency' => $sale['currency'] ?? 'USD',
            'product' => $sale['product_name'] ?? 'Ian Saura Premium',
            'status' => isset($sale['refunded']) && $sale['refunded'] ? 'refunded' : 'completed',
            'source' => 'gumroad',
            'receipt_url' => $sale['receipt_url'] ?? null
        ];
    }
    
    // Add subscription info
    if ($localSubscriber) {
        $subscription = [
            'status' => $localSubscriber['status'],
            'payment_type' => $localSubscriber['payment_type'],
            'start_date' => $localSubscriber['subscription_start'],
            'end_date' => $localSubscriber['subscription_end'],
            'is_trial' => $localSubscriber['status'] === 'trial',
            'created_at' => $localSubscriber['created_at']
        ];
    }
    
    // Sort payments by date (newest first)
    usort($payments, function($a, $b) {
        return strtotime($b['date'] ?? '0') - strtotime($a['date'] ?? '0');
    });
    
    echo json_encode([
        'success' => true,
        'email' => $email,
        'subscription' => $subscription,
        'payments' => $payments,
        'total_paid' => array_reduce($payments, function($sum, $p) {
            return $sum + ($p['status'] === 'completed' ? $p['amount'] : 0);
        }, 0)
    ]);
    
} catch (Exception $e) {
    error_log("Payment history error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Fetch sales from Gumroad filtered by email
 */
function fetchGumroadSalesByEmail($email) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/sales?access_token=" . GUMROAD_ACCESS_TOKEN . "&email=" . urlencode($email),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        error_log("Gumroad sales API returned HTTP $httpCode for email: $email");
        return [];
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        error_log("Gumroad sales API error for email: $email - " . json_encode($data));
        return [];
    }
    
    return $data['sales'] ?? [];
}



