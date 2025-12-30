<?php
/**
 * Subscription Redirect
 * Creates a checkout with webhook and redirects to OneInfinite
 * 
 * Usage:
 * - /subscribe.php (default monthly with trial)
 * - /subscribe.php?plan=monthly
 * - /subscribe.php?plan=6months
 * - /subscribe.php?plan=12months
 */

// Logging function
function logCheckout($message, $data = []) {
    $logFile = __DIR__ . '/../logs/checkout-creation.log';
    $logDir = dirname($logFile);
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    $entry = '[' . date('Y-m-d H:i:s') . '] ' . $message;
    if (!empty($data)) {
        $entry .= ' - ' . json_encode($data, JSON_UNESCAPED_UNICODE);
    }
    file_put_contents($logFile, $entry . "\n", FILE_APPEND | LOCK_EX);
}

// Get plan from query string
$plan = $_GET['plan'] ?? 'monthly';

logCheckout('Checkout creation started', ['ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown', 'plan' => $plan]);

// OneInfinite API credentials
$apiKey = '***REMOVED***';
$apiSecret = '***REMOVED***';

// Subscription IDs for each plan
$subscriptionIds = [
    'monthly' => 'X4xYnptN1lF3qnfKnP',   // Monthly with 7-day trial
    '6months' => '56P',                    // 6 months - need actual ID
    '12months' => '0KX'                    // 12 months - need actual ID
];

// Fallback links (direct OneInfinite links without webhook)
$fallbackLinks = [
    'monthly' => 'https://onei.la/eY7',
    '6months' => 'https://onei.la/56P',
    '12months' => 'https://onei.la/0KX'
];

$subscriptionId = $subscriptionIds[$plan] ?? $subscriptionIds['monthly'];
$fallbackLink = $fallbackLinks[$plan] ?? $fallbackLinks['monthly'];

// Checkout configuration
$checkoutData = [
    'type' => 'SUBSCRIPTION',
    'payment_link_id' => $subscriptionId,
    'origin' => 'API',
    'custom_urls' => [
        'status_changes_webhook' => 'https://iansaura.com/api/subscription-webhook.php',
        'success_payment_redirect' => 'https://iansaura.com/payment-success',
        'error_payment_redirect' => 'https://iansaura.com/suscripcion?error=payment'
    ]
];

logCheckout('Sending to OneInfinite API', $checkoutData);

// Make API request to OneInfinite
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.one.lat/v1/checkout_preferences');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($checkoutData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-key: ' . $apiKey,
    'x-api-secret: ' . $apiSecret
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

logCheckout('OneInfinite API response', [
    'http_code' => $httpCode,
    'error' => $error,
    'response' => substr($response, 0, 500)
]);

// Handle errors
if ($error || ($httpCode !== 200 && $httpCode !== 201)) {
    logCheckout('ERROR: API failed, using fallback link WITHOUT webhook!', [
        'http_code' => $httpCode,
        'error' => $error,
        'plan' => $plan
    ]);
    // Fallback to direct link if API fails - WARNING: No webhook on this link!
    header('Location: ' . $fallbackLink);
    exit();
}

$responseData = json_decode($response, true);
$checkoutUrl = $responseData['checkout_url'] ?? $responseData['url'] ?? null;

if ($checkoutUrl) {
    logCheckout('SUCCESS: Redirecting to checkout with webhook', ['checkout_url' => $checkoutUrl, 'plan' => $plan]);
    // Redirect to OneInfinite checkout
    header('Location: ' . $checkoutUrl);
    exit();
} else {
    logCheckout('ERROR: No checkout_url in response, using fallback WITHOUT webhook!', $responseData);
    // Fallback
    header('Location: ' . $fallbackLink);
    exit();
}
?>
