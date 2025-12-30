<?php
/**
 * Create OneInfinite Subscription Checkout
 * Generates a checkout link with webhook configured
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive

// Security check - admin only
$key = $_GET['key'] ?? '';
$today = new DateTime();
$expectedKey = hash('sha256', 'iansaura_checkout_' . $today->format('Y-m-d'));

if ($key !== $expectedKey) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

require_once __DIR__ . '/subscription-config.php';

// OneInfinite API credentials
$apiKey = ONEINFINITE_API_KEY;
$apiSecret = ONEINFINITE_API_SECRET;
$subscriptionId = ONEINFINITE_SUBSCRIPTION_ID;

// Checkout configuration with webhook
// Trial de 7 días ya está configurado en el Payment Link del dashboard
$checkoutData = [
    'type' => 'SUBSCRIPTION',
    'payment_link_id' => $subscriptionId,
    'origin' => 'API',
    'custom_urls' => [
        'status_changes_webhook' => 'https://www.iansaura.com/api/subscription-webhook.php',
        'success_payment_redirect' => 'https://www.iansaura.com/members?welcome=true',
        'error_payment_redirect' => 'https://www.iansaura.com/suscripcion?error=payment'
    ]
];

// Optional: Add payer info if provided
if (isset($_GET['email'])) {
    $checkoutData['payer'] = [
        'email' => $_GET['email']
    ];
    
    if (isset($_GET['name'])) {
        $checkoutData['payer']['first_name'] = $_GET['name'];
    }
}

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

if ($error) {
    echo json_encode([
        'success' => false,
        'error' => 'cURL error: ' . $error
    ]);
    exit();
}

$responseData = json_decode($response, true);

if ($httpCode !== 200 && $httpCode !== 201) {
    echo json_encode([
        'success' => false,
        'error' => 'API error',
        'http_code' => $httpCode,
        'response' => $responseData
    ], JSON_PRETTY_PRINT);
    exit();
}

// Return the checkout URL
echo json_encode([
    'success' => true,
    'checkout_url' => $responseData['url'] ?? $responseData['checkout_url'] ?? null,
    'checkout_id' => $responseData['id'] ?? null,
    'full_response' => $responseData
], JSON_PRETTY_PRINT);
?>


