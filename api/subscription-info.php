<?php
/**
 * Get Subscription Info for Settings Page
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secure-config.php';

try {
    $email = $_GET['email'] ?? null;
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit();
    }
    
    $db = getSecureDBConnection();
    
    // Get subscriber info
    $stmt = $db->prepare("
        SELECT 
            s.*,
            u.name as user_name
        FROM subscribers s
        LEFT JOIN users u ON s.email = u.email
        WHERE s.email = ?
    ");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$subscriber) {
        echo json_encode([
            'success' => true,
            'subscription' => [
                'status' => 'none',
                'is_oneinfinite' => false
            ]
        ]);
        exit();
    }
    
    // Determine status
    $status = $subscriber['status'] ?? 'none';
    $subEnd = $subscriber['subscription_end'] ?? null;
    $paymentType = $subscriber['payment_type'] ?? 'paid';
    
    // Check if trial expired
    $trialDaysLeft = null;
    if ($status === 'trial' && $subEnd) {
        $trialEnd = new DateTime($subEnd);
        $now = new DateTime();
        if ($trialEnd < $now) {
            $status = 'expired';
        } else {
            $trialDaysLeft = $now->diff($trialEnd)->days;
            if ($trialDaysLeft == 0) $trialDaysLeft = 1; // At least 1 day
        }
    }
    
    // Determine if OneInfinite (with card)
    $isOneinfinite = ($paymentType === 'oneinfinite' || $paymentType === 'paid');
    
    $response = [
        'success' => true,
        'subscription' => [
            'status' => $status,
            'is_oneinfinite' => $isOneinfinite,
            'subscription_start' => $subscriber['subscription_start'] ?? null,
            'subscription_end' => $subEnd,
            'trial_days_left' => $trialDaysLeft,
            'payment_type' => $paymentType,
            'plan_type' => $subscriber['plan_type'] ?? null,
            'oneinfinite_subscription_id' => $subscriber['oneinfinite_subscription_id'] ?? null
        ]
    ];
    
    echo json_encode($response);
    
} catch (Exception $e) {
    error_log("Subscription info error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error del servidor']);
}

