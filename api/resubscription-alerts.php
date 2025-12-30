<?php
/**
 * View re-subscription alerts
 * Shows users who previously had a subscription and are subscribing again
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/secure-config.php';

// Simple auth check - must be admin
session_start();
$isAdmin = isset($_SESSION['user']) && ($_SESSION['user']['email'] ?? '') === 'iansaura3@gmail.com';

if (!$isAdmin) {
    // Also check via header token for API calls
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if ($authHeader !== 'Bearer admin-check-alerts') {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }
}

$logsDir = __DIR__ . '/../logs';
$alertFile = $logsDir . '/resubscription-alerts.log';

if (!file_exists($alertFile)) {
    echo json_encode([
        'success' => true,
        'alerts' => [],
        'message' => 'No hay alertas de re-suscripción'
    ]);
    exit();
}

$content = file_get_contents($alertFile);
$alerts = [];

// Parse the log file
$entries = preg_split('/\[\d{4}-\d{2}-\d{2}/', $content);
foreach ($entries as $entry) {
    if (empty(trim($entry))) continue;
    
    // Extract timestamp
    preg_match('/^([\d:\s]+)\]/', $entry, $timeMatch);
    $timestamp = $timeMatch[1] ?? '';
    
    // Extract email
    preg_match('/Email:\s*(.+)$/m', $entry, $emailMatch);
    $email = trim($emailMatch[1] ?? '');
    
    // Extract name
    preg_match('/Nombre:\s*(.+)$/m', $entry, $nameMatch);
    $name = trim($nameMatch[1] ?? '');
    
    // Extract previous status
    preg_match('/Estado anterior:\s*(.+)$/m', $entry, $statusMatch);
    $previousStatus = trim($statusMatch[1] ?? '');
    
    // Extract previous payment type
    preg_match('/Payment type anterior:\s*(.+)$/m', $entry, $paymentMatch);
    $previousPaymentType = trim($paymentMatch[1] ?? '');
    
    // Extract if it's a trial
    preg_match('/Es trial.*:\s*(SÍ|NO)$/m', $entry, $trialMatch);
    $isTrial = ($trialMatch[1] ?? '') === 'SÍ';
    
    if ($email) {
        $alerts[] = [
            'timestamp' => $timestamp,
            'email' => $email,
            'name' => $name,
            'previous_status' => $previousStatus,
            'previous_payment_type' => $previousPaymentType,
            'is_trial_attempt' => $isTrial
        ];
    }
}

// Sort by most recent first
$alerts = array_reverse($alerts);

echo json_encode([
    'success' => true,
    'count' => count($alerts),
    'alerts' => $alerts
]);



/**
 * View re-subscription alerts
 * Shows users who previously had a subscription and are subscribing again
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/secure-config.php';

// Simple auth check - must be admin
session_start();
$isAdmin = isset($_SESSION['user']) && ($_SESSION['user']['email'] ?? '') === 'iansaura3@gmail.com';

if (!$isAdmin) {
    // Also check via header token for API calls
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if ($authHeader !== 'Bearer admin-check-alerts') {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }
}

$logsDir = __DIR__ . '/../logs';
$alertFile = $logsDir . '/resubscription-alerts.log';

if (!file_exists($alertFile)) {
    echo json_encode([
        'success' => true,
        'alerts' => [],
        'message' => 'No hay alertas de re-suscripción'
    ]);
    exit();
}

$content = file_get_contents($alertFile);
$alerts = [];

// Parse the log file
$entries = preg_split('/\[\d{4}-\d{2}-\d{2}/', $content);
foreach ($entries as $entry) {
    if (empty(trim($entry))) continue;
    
    // Extract timestamp
    preg_match('/^([\d:\s]+)\]/', $entry, $timeMatch);
    $timestamp = $timeMatch[1] ?? '';
    
    // Extract email
    preg_match('/Email:\s*(.+)$/m', $entry, $emailMatch);
    $email = trim($emailMatch[1] ?? '');
    
    // Extract name
    preg_match('/Nombre:\s*(.+)$/m', $entry, $nameMatch);
    $name = trim($nameMatch[1] ?? '');
    
    // Extract previous status
    preg_match('/Estado anterior:\s*(.+)$/m', $entry, $statusMatch);
    $previousStatus = trim($statusMatch[1] ?? '');
    
    // Extract previous payment type
    preg_match('/Payment type anterior:\s*(.+)$/m', $entry, $paymentMatch);
    $previousPaymentType = trim($paymentMatch[1] ?? '');
    
    // Extract if it's a trial
    preg_match('/Es trial.*:\s*(SÍ|NO)$/m', $entry, $trialMatch);
    $isTrial = ($trialMatch[1] ?? '') === 'SÍ';
    
    if ($email) {
        $alerts[] = [
            'timestamp' => $timestamp,
            'email' => $email,
            'name' => $name,
            'previous_status' => $previousStatus,
            'previous_payment_type' => $previousPaymentType,
            'is_trial_attempt' => $isTrial
        ];
    }
}

// Sort by most recent first
$alerts = array_reverse($alerts);

echo json_encode([
    'success' => true,
    'count' => count($alerts),
    'alerts' => $alerts
]);



/**
 * View re-subscription alerts
 * Shows users who previously had a subscription and are subscribing again
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once __DIR__ . '/secure-config.php';

// Simple auth check - must be admin
session_start();
$isAdmin = isset($_SESSION['user']) && ($_SESSION['user']['email'] ?? '') === 'iansaura3@gmail.com';

if (!$isAdmin) {
    // Also check via header token for API calls
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if ($authHeader !== 'Bearer admin-check-alerts') {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit();
    }
}

$logsDir = __DIR__ . '/../logs';
$alertFile = $logsDir . '/resubscription-alerts.log';

if (!file_exists($alertFile)) {
    echo json_encode([
        'success' => true,
        'alerts' => [],
        'message' => 'No hay alertas de re-suscripción'
    ]);
    exit();
}

$content = file_get_contents($alertFile);
$alerts = [];

// Parse the log file
$entries = preg_split('/\[\d{4}-\d{2}-\d{2}/', $content);
foreach ($entries as $entry) {
    if (empty(trim($entry))) continue;
    
    // Extract timestamp
    preg_match('/^([\d:\s]+)\]/', $entry, $timeMatch);
    $timestamp = $timeMatch[1] ?? '';
    
    // Extract email
    preg_match('/Email:\s*(.+)$/m', $entry, $emailMatch);
    $email = trim($emailMatch[1] ?? '');
    
    // Extract name
    preg_match('/Nombre:\s*(.+)$/m', $entry, $nameMatch);
    $name = trim($nameMatch[1] ?? '');
    
    // Extract previous status
    preg_match('/Estado anterior:\s*(.+)$/m', $entry, $statusMatch);
    $previousStatus = trim($statusMatch[1] ?? '');
    
    // Extract previous payment type
    preg_match('/Payment type anterior:\s*(.+)$/m', $entry, $paymentMatch);
    $previousPaymentType = trim($paymentMatch[1] ?? '');
    
    // Extract if it's a trial
    preg_match('/Es trial.*:\s*(SÍ|NO)$/m', $entry, $trialMatch);
    $isTrial = ($trialMatch[1] ?? '') === 'SÍ';
    
    if ($email) {
        $alerts[] = [
            'timestamp' => $timestamp,
            'email' => $email,
            'name' => $name,
            'previous_status' => $previousStatus,
            'previous_payment_type' => $previousPaymentType,
            'is_trial_attempt' => $isTrial
        ];
    }
}

// Sort by most recent first
$alerts = array_reverse($alerts);

echo json_encode([
    'success' => true,
    'count' => count($alerts),
    'alerts' => $alerts
]);




