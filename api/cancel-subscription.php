<?php
/**
 * Cancel Subscription
 * Marks subscription as cancelled but keeps access until end date
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

require_once 'secure-config.php';

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = $input['email'] ?? null;
    $reason = $input['reason'] ?? '';
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit();
    }
    
    $db = getSecureDBConnection();
    
    // Get current subscription
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$subscriber) {
        echo json_encode(['success' => false, 'error' => 'No se encontró suscripción']);
        exit();
    }
    
    if ($subscriber['status'] === 'cancelled') {
        echo json_encode(['success' => false, 'error' => 'La suscripción ya está cancelada']);
        exit();
    }
    
    $paymentType = $subscriber['payment_type'] ?? 'paid';
    $gumroadSubscriptionId = $subscriber['gumroad_subscription_id'] ?? null;
    $oneinfiniteId = $subscriber['oneinfinite_subscription_id'] ?? null;
    
    // Cancel in Gumroad if it's a Gumroad subscription
    if ($gumroadSubscriptionId && $paymentType === 'gumroad') {
        require_once 'secrets.php';
        
        // Gumroad API to cancel subscription
        // PUT https://api.gumroad.com/v2/subscribers/{subscriber_id}
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => "https://api.gumroad.com/v2/subscribers/{$gumroadSubscriptionId}",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => 'PUT',
            CURLOPT_POSTFIELDS => http_build_query([
                'access_token' => GUMROAD_ACCESS_TOKEN,
                'cancelled' => 'true'
            ]),
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/x-www-form-urlencoded'
            ]
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        error_log("Gumroad cancel attempt for {$email} (sub_id: {$gumroadSubscriptionId}): HTTP {$httpCode} - {$response}");
        
        // Even if Gumroad API fails, we still mark as cancelled in our system
    }
    
    // Cancel in OneInfinite if it's a OneInfinite subscription
    if ($oneinfiniteId && ($paymentType === 'oneinfinite' || $paymentType === 'paid')) {
        require_once 'secrets.php';
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => ONEINFINITE_API_URL . "/recurrent_payments/{$oneinfiniteId}/cancel",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_HTTPHEADER => [
                'Authorization: Bearer ' . ONEINFINITE_API_KEY,
                'Content-Type: application/json'
            ]
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        error_log("OneInfinite cancel attempt for {$email}: HTTP {$httpCode} - {$response}");
    }
    
    // Update subscription status
    $stmt = $db->prepare("
        UPDATE subscribers 
        SET status = 'cancelled',
            notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Cancelado por usuario. Razón: ', ?)
        WHERE email = ?
    ");
    $stmt->execute([$reason ?: 'No especificada', $email]);
    
    // Log cancellation
    error_log("📛 Subscription cancelled: {$email} - Reason: {$reason}");
    
    // Send notification email to admin
    $adminEmail = 'iansauradata@gmail.com';
    $subject = "⚠️ Cancelación de suscripción: {$email}";
    $message = "El usuario {$email} ha cancelado su suscripción.\n\nRazón: " . ($reason ?: 'No especificada');
    // Encode subject for UTF-8 (emojis, accented chars)
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    @mail($adminEmail, $encodedSubject, $message, "Content-Type: text/plain; charset=UTF-8");
    
    echo json_encode([
        'success' => true,
        'message' => 'Suscripción cancelada correctamente'
    ]);
    
} catch (Exception $e) {
    error_log("Cancel subscription error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error del servidor']);
}

