<?php
/**
 * Smart Subscription Redirect
 * Redirects to Gumroad checkout with user email pre-filled
 * 
 * Gumroad product: https://iansaura.gumroad.com/l/dgyzxi
 */

// Log the request
$logsDir = __DIR__ . '/../logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

$logFile = $logsDir . '/subscribe-redirects.log';
$timestamp = date('Y-m-d H:i:s');
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$referer = $_SERVER['HTTP_REFERER'] ?? 'direct';

// Gumroad product URL
$gumroadUrl = 'https://iansaura.gumroad.com/l/dgyzxi';

// Build URL with parameters
$params = [];

// Email pre-fill
$email = isset($_GET['email']) ? trim($_GET['email']) : null;
if ($email && filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $params['email'] = $email;
}

// Add wanted=true for overlay checkout (optional, better UX)
$params['wanted'] = 'true';

// Build final URL
if (!empty($params)) {
    $gumroadUrl .= '?' . http_build_query($params);
}

// Log
$emailLog = $email ?? 'none';
file_put_contents($logFile, "[$timestamp] IP: $ip, Email: $emailLog, Redirecting to Gumroad\n", FILE_APPEND | LOCK_EX);

// Redirect to Gumroad
header('Location: ' . $gumroadUrl);
exit();
