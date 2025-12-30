<?php
/**
 * Check Expired Trials - Admin Tool
 * Lists all trials that have expired and verifies they don't have access
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive

require_once 'secure-config.php';

try {
    $db = getSecureDBConnection();
    
    $now = date('Y-m-d H:i:s');
    
    // Get all trials (status = 'trial') with their subscription_end dates
    $stmt = $db->prepare("
        SELECT 
            s.id,
            s.email,
            s.name,
            s.status,
            s.subscription_start,
            s.subscription_end,
            s.payment_type,
            CASE 
                WHEN s.subscription_end IS NULL THEN 'no_end_date'
                WHEN s.subscription_end < NOW() THEN 'expired'
                ELSE 'active'
            END as trial_status,
            DATEDIFF(s.subscription_end, NOW()) as days_remaining
        FROM subscribers s
        WHERE s.status = 'trial'
        ORDER BY s.subscription_end ASC
    ");
    $stmt->execute();
    $trials = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $expired = [];
    $active = [];
    $noEndDate = [];
    
    foreach ($trials as $trial) {
        if ($trial['trial_status'] === 'expired') {
            $expired[] = $trial;
        } elseif ($trial['trial_status'] === 'no_end_date') {
            $noEndDate[] = $trial;
        } else {
            $active[] = $trial;
        }
    }
    
    // Also check for any subscribers with status='active' but expired subscription_end
    $stmt = $db->prepare("
        SELECT 
            id, email, name, status, subscription_start, subscription_end, payment_type,
            DATEDIFF(subscription_end, NOW()) as days_remaining
        FROM subscribers 
        WHERE status = 'active' 
        AND subscription_end IS NOT NULL 
        AND subscription_end < NOW()
    ");
    $stmt->execute();
    $expiredActives = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Summary
    $response = [
        'success' => true,
        'checked_at' => $now,
        'summary' => [
            'total_trials' => count($trials),
            'expired_trials' => count($expired),
            'active_trials' => count($active),
            'trials_without_end_date' => count($noEndDate),
            'active_but_expired' => count($expiredActives)
        ],
        'expired_trials' => $expired,
        'active_trials' => $active,
        'trials_without_end_date' => $noEndDate,
        'active_status_but_expired' => $expiredActives,
        'recommendation' => []
    ];
    
    // Add recommendations
    if (count($expired) > 0) {
        $response['recommendation'][] = "Hay " . count($expired) . " trials expirados que aun tienen status=trial. Deberian actualizarse a expired.";
    }
    if (count($noEndDate) > 0) {
        $response['recommendation'][] = "Hay " . count($noEndDate) . " trials sin fecha de fin. Tienen acceso indefinido.";
    }
    if (count($expiredActives) > 0) {
        $response['recommendation'][] = "Hay " . count($expiredActives) . " suscriptores con status=active pero fecha expirada!";
    }
    
    echo json_encode($response, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

