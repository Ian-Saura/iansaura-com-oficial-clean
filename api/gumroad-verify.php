<?php
/**
 * Gumroad Subscription Verification
 * Verifica el estado de suscripción directamente con Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

$email = $_GET['email'] ?? $_POST['email'] ?? null;
$subscriberId = $_GET['subscriber_id'] ?? $_POST['subscriber_id'] ?? null;

if (!$email && !$subscriberId) {
    echo json_encode(['success' => false, 'error' => 'Email or subscriber_id required']);
    exit();
}

try {
    $db = getSecureDBConnection();
    
    // If we have subscriber_id, verify directly with Gumroad
    if ($subscriberId) {
        $gumroadStatus = verifyWithGumroad($subscriberId);
        
        if ($gumroadStatus['success']) {
            // Update our DB if status changed
            updateLocalStatus($db, $email, $gumroadStatus);
        }
        
        echo json_encode($gumroadStatus);
        exit();
    }
    
    // If only email, first check our DB for gumroad_subscription_id
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $localSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$localSubscriber) {
        echo json_encode([
            'success' => true,
            'has_access' => false,
            'source' => 'local',
            'message' => 'No subscription found'
        ]);
        exit();
    }
    
    // Check if Gumroad subscription
    $gumroadSubId = $localSubscriber['gumroad_subscription_id'] ?? null;
    
    if ($gumroadSubId && $localSubscriber['payment_type'] === 'gumroad') {
        // Verify with Gumroad API
        $gumroadStatus = verifyWithGumroad($gumroadSubId);
        
        if ($gumroadStatus['success']) {
            // Update our DB if status changed
            if ($gumroadStatus['gumroad_status'] !== $localSubscriber['status']) {
                updateLocalStatus($db, $email, $gumroadStatus);
            }
            
            echo json_encode([
                'success' => true,
                'has_access' => $gumroadStatus['has_access'],
                'status' => $gumroadStatus['gumroad_status'],
                'source' => 'gumroad_verified',
                'local_status' => $localSubscriber['status'],
                'subscription_end' => $localSubscriber['subscription_end'],
                'gumroad_data' => $gumroadStatus['data'] ?? null
            ]);
            exit();
        }
    }
    
    // Fallback to local DB check
    $hasAccess = in_array($localSubscriber['status'], ['active', 'trial']) && 
                 ($localSubscriber['subscription_end'] === null || 
                  strtotime($localSubscriber['subscription_end']) > time());
    
    echo json_encode([
        'success' => true,
        'has_access' => $hasAccess,
        'status' => $localSubscriber['status'],
        'source' => 'local',
        'subscription_end' => $localSubscriber['subscription_end'],
        'payment_type' => $localSubscriber['payment_type']
    ]);
    
} catch (Exception $e) {
    error_log("Gumroad verify error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Verify subscription status directly with Gumroad
 */
function verifyWithGumroad($subscriberId) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/subscribers/" . urlencode($subscriberId) . "?access_token=" . GUMROAD_ACCESS_TOKEN,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        return [
            'success' => false,
            'error' => "Gumroad API returned HTTP $httpCode"
        ];
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        return [
            'success' => false,
            'error' => $data['message'] ?? 'Unknown Gumroad error'
        ];
    }
    
    $subscriber = $data['subscriber'] ?? [];
    $status = $subscriber['status'] ?? 'unknown';
    
    // Map Gumroad status to our status
    $mappedStatus = 'expired';
    $hasAccess = false;
    
    if ($status === 'alive') {
        $mappedStatus = 'active';
        $hasAccess = true;
    } elseif ($status === 'pending_cancellation') {
        // Still has access until end of period
        $mappedStatus = 'active';
        $hasAccess = true;
    } elseif ($status === 'cancelled') {
        $mappedStatus = 'cancelled';
        $hasAccess = false;
    }
    
    return [
        'success' => true,
        'has_access' => $hasAccess,
        'gumroad_status' => $mappedStatus,
        'raw_status' => $status,
        'data' => [
            'email' => $subscriber['email'] ?? null,
            'created_at' => $subscriber['created_at'] ?? null,
            'ended_at' => $subscriber['ended_at'] ?? null,
            'cancelled' => $subscriber['cancelled'] ?? false,
            'failed_at' => $subscriber['failed_at'] ?? null
        ]
    ];
}

/**
 * Update local DB status based on Gumroad verification
 */
function updateLocalStatus($db, $email, $gumroadStatus) {
    if (!$email || !$gumroadStatus['success']) return;
    
    $newStatus = $gumroadStatus['gumroad_status'];
    
    $stmt = $db->prepare("
        UPDATE subscribers 
        SET status = ?,
            notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Gumroad sync: status updated to ', ?)
        WHERE email = ? AND payment_type = 'gumroad'
    ");
    $stmt->execute([$newStatus, $newStatus, $email]);
    
    // Also update users table
    $subscribed = ($newStatus === 'active' || $newStatus === 'trial') ? 1 : 0;
    $stmt = $db->prepare("UPDATE users SET subscribed = ? WHERE email = ?");
    $stmt->execute([$subscribed, $email]);
}


/**
 * Gumroad Subscription Verification
 * Verifica el estado de suscripción directamente con Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

$email = $_GET['email'] ?? $_POST['email'] ?? null;
$subscriberId = $_GET['subscriber_id'] ?? $_POST['subscriber_id'] ?? null;

if (!$email && !$subscriberId) {
    echo json_encode(['success' => false, 'error' => 'Email or subscriber_id required']);
    exit();
}

try {
    $db = getSecureDBConnection();
    
    // If we have subscriber_id, verify directly with Gumroad
    if ($subscriberId) {
        $gumroadStatus = verifyWithGumroad($subscriberId);
        
        if ($gumroadStatus['success']) {
            // Update our DB if status changed
            updateLocalStatus($db, $email, $gumroadStatus);
        }
        
        echo json_encode($gumroadStatus);
        exit();
    }
    
    // If only email, first check our DB for gumroad_subscription_id
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $localSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$localSubscriber) {
        echo json_encode([
            'success' => true,
            'has_access' => false,
            'source' => 'local',
            'message' => 'No subscription found'
        ]);
        exit();
    }
    
    // Check if Gumroad subscription
    $gumroadSubId = $localSubscriber['gumroad_subscription_id'] ?? null;
    
    if ($gumroadSubId && $localSubscriber['payment_type'] === 'gumroad') {
        // Verify with Gumroad API
        $gumroadStatus = verifyWithGumroad($gumroadSubId);
        
        if ($gumroadStatus['success']) {
            // Update our DB if status changed
            if ($gumroadStatus['gumroad_status'] !== $localSubscriber['status']) {
                updateLocalStatus($db, $email, $gumroadStatus);
            }
            
            echo json_encode([
                'success' => true,
                'has_access' => $gumroadStatus['has_access'],
                'status' => $gumroadStatus['gumroad_status'],
                'source' => 'gumroad_verified',
                'local_status' => $localSubscriber['status'],
                'subscription_end' => $localSubscriber['subscription_end'],
                'gumroad_data' => $gumroadStatus['data'] ?? null
            ]);
            exit();
        }
    }
    
    // Fallback to local DB check
    $hasAccess = in_array($localSubscriber['status'], ['active', 'trial']) && 
                 ($localSubscriber['subscription_end'] === null || 
                  strtotime($localSubscriber['subscription_end']) > time());
    
    echo json_encode([
        'success' => true,
        'has_access' => $hasAccess,
        'status' => $localSubscriber['status'],
        'source' => 'local',
        'subscription_end' => $localSubscriber['subscription_end'],
        'payment_type' => $localSubscriber['payment_type']
    ]);
    
} catch (Exception $e) {
    error_log("Gumroad verify error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Verify subscription status directly with Gumroad
 */
function verifyWithGumroad($subscriberId) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/subscribers/" . urlencode($subscriberId) . "?access_token=" . GUMROAD_ACCESS_TOKEN,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        return [
            'success' => false,
            'error' => "Gumroad API returned HTTP $httpCode"
        ];
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        return [
            'success' => false,
            'error' => $data['message'] ?? 'Unknown Gumroad error'
        ];
    }
    
    $subscriber = $data['subscriber'] ?? [];
    $status = $subscriber['status'] ?? 'unknown';
    
    // Map Gumroad status to our status
    $mappedStatus = 'expired';
    $hasAccess = false;
    
    if ($status === 'alive') {
        $mappedStatus = 'active';
        $hasAccess = true;
    } elseif ($status === 'pending_cancellation') {
        // Still has access until end of period
        $mappedStatus = 'active';
        $hasAccess = true;
    } elseif ($status === 'cancelled') {
        $mappedStatus = 'cancelled';
        $hasAccess = false;
    }
    
    return [
        'success' => true,
        'has_access' => $hasAccess,
        'gumroad_status' => $mappedStatus,
        'raw_status' => $status,
        'data' => [
            'email' => $subscriber['email'] ?? null,
            'created_at' => $subscriber['created_at'] ?? null,
            'ended_at' => $subscriber['ended_at'] ?? null,
            'cancelled' => $subscriber['cancelled'] ?? false,
            'failed_at' => $subscriber['failed_at'] ?? null
        ]
    ];
}

/**
 * Update local DB status based on Gumroad verification
 */
function updateLocalStatus($db, $email, $gumroadStatus) {
    if (!$email || !$gumroadStatus['success']) return;
    
    $newStatus = $gumroadStatus['gumroad_status'];
    
    $stmt = $db->prepare("
        UPDATE subscribers 
        SET status = ?,
            notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Gumroad sync: status updated to ', ?)
        WHERE email = ? AND payment_type = 'gumroad'
    ");
    $stmt->execute([$newStatus, $newStatus, $email]);
    
    // Also update users table
    $subscribed = ($newStatus === 'active' || $newStatus === 'trial') ? 1 : 0;
    $stmt = $db->prepare("UPDATE users SET subscribed = ? WHERE email = ?");
    $stmt->execute([$subscribed, $email]);
}


/**
 * Gumroad Subscription Verification
 * Verifica el estado de suscripción directamente con Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
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

$email = $_GET['email'] ?? $_POST['email'] ?? null;
$subscriberId = $_GET['subscriber_id'] ?? $_POST['subscriber_id'] ?? null;

if (!$email && !$subscriberId) {
    echo json_encode(['success' => false, 'error' => 'Email or subscriber_id required']);
    exit();
}

try {
    $db = getSecureDBConnection();
    
    // If we have subscriber_id, verify directly with Gumroad
    if ($subscriberId) {
        $gumroadStatus = verifyWithGumroad($subscriberId);
        
        if ($gumroadStatus['success']) {
            // Update our DB if status changed
            updateLocalStatus($db, $email, $gumroadStatus);
        }
        
        echo json_encode($gumroadStatus);
        exit();
    }
    
    // If only email, first check our DB for gumroad_subscription_id
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $localSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$localSubscriber) {
        echo json_encode([
            'success' => true,
            'has_access' => false,
            'source' => 'local',
            'message' => 'No subscription found'
        ]);
        exit();
    }
    
    // Check if Gumroad subscription
    $gumroadSubId = $localSubscriber['gumroad_subscription_id'] ?? null;
    
    if ($gumroadSubId && $localSubscriber['payment_type'] === 'gumroad') {
        // Verify with Gumroad API
        $gumroadStatus = verifyWithGumroad($gumroadSubId);
        
        if ($gumroadStatus['success']) {
            // Update our DB if status changed
            if ($gumroadStatus['gumroad_status'] !== $localSubscriber['status']) {
                updateLocalStatus($db, $email, $gumroadStatus);
            }
            
            echo json_encode([
                'success' => true,
                'has_access' => $gumroadStatus['has_access'],
                'status' => $gumroadStatus['gumroad_status'],
                'source' => 'gumroad_verified',
                'local_status' => $localSubscriber['status'],
                'subscription_end' => $localSubscriber['subscription_end'],
                'gumroad_data' => $gumroadStatus['data'] ?? null
            ]);
            exit();
        }
    }
    
    // Fallback to local DB check
    $hasAccess = in_array($localSubscriber['status'], ['active', 'trial']) && 
                 ($localSubscriber['subscription_end'] === null || 
                  strtotime($localSubscriber['subscription_end']) > time());
    
    echo json_encode([
        'success' => true,
        'has_access' => $hasAccess,
        'status' => $localSubscriber['status'],
        'source' => 'local',
        'subscription_end' => $localSubscriber['subscription_end'],
        'payment_type' => $localSubscriber['payment_type']
    ]);
    
} catch (Exception $e) {
    error_log("Gumroad verify error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Verify subscription status directly with Gumroad
 */
function verifyWithGumroad($subscriberId) {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/subscribers/" . urlencode($subscriberId) . "?access_token=" . GUMROAD_ACCESS_TOKEN,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        return [
            'success' => false,
            'error' => "Gumroad API returned HTTP $httpCode"
        ];
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        return [
            'success' => false,
            'error' => $data['message'] ?? 'Unknown Gumroad error'
        ];
    }
    
    $subscriber = $data['subscriber'] ?? [];
    $status = $subscriber['status'] ?? 'unknown';
    
    // Map Gumroad status to our status
    $mappedStatus = 'expired';
    $hasAccess = false;
    
    if ($status === 'alive') {
        $mappedStatus = 'active';
        $hasAccess = true;
    } elseif ($status === 'pending_cancellation') {
        // Still has access until end of period
        $mappedStatus = 'active';
        $hasAccess = true;
    } elseif ($status === 'cancelled') {
        $mappedStatus = 'cancelled';
        $hasAccess = false;
    }
    
    return [
        'success' => true,
        'has_access' => $hasAccess,
        'gumroad_status' => $mappedStatus,
        'raw_status' => $status,
        'data' => [
            'email' => $subscriber['email'] ?? null,
            'created_at' => $subscriber['created_at'] ?? null,
            'ended_at' => $subscriber['ended_at'] ?? null,
            'cancelled' => $subscriber['cancelled'] ?? false,
            'failed_at' => $subscriber['failed_at'] ?? null
        ]
    ];
}

/**
 * Update local DB status based on Gumroad verification
 */
function updateLocalStatus($db, $email, $gumroadStatus) {
    if (!$email || !$gumroadStatus['success']) return;
    
    $newStatus = $gumroadStatus['gumroad_status'];
    
    $stmt = $db->prepare("
        UPDATE subscribers 
        SET status = ?,
            notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Gumroad sync: status updated to ', ?)
        WHERE email = ? AND payment_type = 'gumroad'
    ");
    $stmt->execute([$newStatus, $newStatus, $email]);
    
    // Also update users table
    $subscribed = ($newStatus === 'active' || $newStatus === 'trial') ? 1 : 0;
    $stmt = $db->prepare("UPDATE users SET subscribed = ? WHERE email = ?");
    $stmt->execute([$subscribed, $email]);
}



