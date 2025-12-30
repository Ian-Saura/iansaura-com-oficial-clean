<?php
/**
 * OneinFinite Webhook Handler
 * Receives payment notifications and triggers PDF delivery
 */

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/webhook-errors.log');

// CORS - Permissive for webhooks (OneInfinite needs to POST here)
require_once __DIR__ . '/middleware/cors.php';
applyCorsWebhook();

header('Content-Type: application/json');

// Create logs directory if it doesn't exist
$logsDir = __DIR__ . '/../logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

// Log function
function logWebhook($message, $data = []) {
    $logFile = __DIR__ . '/../logs/oneinfinite-webhook.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - Data: " . json_encode($data);
    }
    $logEntry .= "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// OneinFinite API configuration
class OneinFiniteAPI {
    private $apiKey;
    private $apiSecret;
    private $baseUrl = 'https://api.oneinfinite.com/v1'; // Adjust this URL if needed
    
    public function __construct($apiKey, $apiSecret) {
        $this->apiKey = $apiKey;
        $this->apiSecret = $apiSecret;
    }
    
    /**
     * Get payment order details from OneinFinite API
     */
    public function getPaymentOrder($paymentId) {
        $url = $this->baseUrl . '/payment-orders/' . $paymentId;
        
        $headers = [
            'x-api-key: ' . $this->apiKey,
            'x-api-secret: ' . $this->apiSecret,
            'Content-Type: application/json'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            throw new Exception("cURL error: $error");
        }
        
        if ($httpCode !== 200) {
            throw new Exception("API error: HTTP $httpCode - $response");
        }
        
        $data = json_decode($response, true);
        if (!$data) {
            throw new Exception("Invalid JSON response: $response");
        }
        
        return $data;
    }
    
    /**
     * Validate payment order status
     */
    public function validatePayment($paymentId) {
        try {
            $order = $this->getPaymentOrder($paymentId);
            
            // Check if payment is successful/closed
            $validStatuses = ['CLOSED', 'COMPLETED', 'PAID']; // Adjust based on OneinFinite statuses
            
            if (!in_array($order['status'], $validStatuses)) {
                return [
                    'valid' => false,
                    'reason' => 'Payment not completed',
                    'status' => $order['status']
                ];
            }
            
            // Additional validation
            if (!isset($order['payer']['email'])) {
                return [
                    'valid' => false,
                    'reason' => 'No payer email found'
                ];
            }
            
            return [
                'valid' => true,
                'order' => $order
            ];
            
        } catch (Exception $e) {
            logWebhook('Payment validation error', [
                'payment_id' => $paymentId,
                'error' => $e->getMessage()
            ]);
            
            return [
                'valid' => false,
                'reason' => 'API validation failed: ' . $e->getMessage()
            ];
        }
    }
}

// Load API credentials from secure config
function loadAPICredentials() {
    $configFile = __DIR__ . '/secure-config.php';
    if (!file_exists($configFile)) {
        throw new Exception('OneinFinite API credentials not configured');
    }
    
    include $configFile;
    
    if (!isset($ONEINFINITE_API_KEY) || !isset($ONEINFINITE_API_SECRET)) {
        throw new Exception('OneinFinite API credentials missing in config');
    }
    
    return [
        'api_key' => $ONEINFINITE_API_KEY,
        'api_secret' => $ONEINFINITE_API_SECRET
    ];
}

// Trigger PDF delivery using existing system - FIXED VERSION
function deliverPDF($email, $name, $paymentId, $orderData) {
    // Generate a secure token for this delivery
    $token = 'webhook_' . $paymentId . '_' . bin2hex(random_bytes(16));
    
    // Determine which book to deliver based on order data
    $pdfDeliveryUrl = determineProductDeliveryUrl($orderData);
    
    logWebhook('Delivering PDF for product', [
        'payment_id' => $paymentId,
        'delivery_url' => $pdfDeliveryUrl,
        'product_info' => [
            'title' => $orderData['title'] ?? 'Unknown',
            'amount' => $orderData['amount'] ?? 0,
            'currency' => $orderData['currency'] ?? 'USD'
        ]
    ]);
    
    $deliveryParams = http_build_query([
        'token' => $token,
        'email' => $email,
        'name' => $name
    ]);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $pdfDeliveryUrl . '?' . $deliveryParams);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        throw new Exception("PDF delivery cURL error: $error");
    }
    
    if ($httpCode !== 200) {
        throw new Exception("PDF delivery failed: HTTP $httpCode - $response");
    }
    
    $result = json_decode($response, true);
    if (!$result || !$result['success']) {
        throw new Exception("PDF delivery failed: " . ($result['error'] ?? 'Unknown error'));
    }
    
    return $result;
}

// Determine which delivery endpoint to use based on product information
function determineProductDeliveryUrl($orderData) {
    // Get product information
    $productTitle = strtolower($orderData['title'] ?? '');
    $productAmount = floatval($orderData['amount'] ?? 0);
    
    // Log for debugging
    logWebhook('Determining product type', [
        'title' => $productTitle,
        'amount' => $productAmount,
        'external_id' => $orderData['external_id'] ?? null,
        'description' => $orderData['description'] ?? null
    ]);
    
    // Method 1: Check external_id first (most specific)
    $externalId = strtolower($orderData['external_id'] ?? '');
    if (strpos($externalId, 'sql') !== false) {
        logWebhook('Product identified as SQL book by external_id');
        return 'https://www.iansaura.com/api/pdf-delivery-sql.php';
    }
    
    if (strpos($externalId, 'python') !== false) {
        logWebhook('Product identified as Python book by external_id');
        return 'https://www.iansaura.com/api/pdf-delivery.php';
    }
    
    // Method 2: Check by specific SQL keywords in title
    if (strpos($productTitle, 'sql') !== false || 
        strpos($productTitle, 'database') !== false ||
        strpos($productTitle, 'bases de datos') !== false) {
        logWebhook('Product identified as SQL book by title');
        return 'https://www.iansaura.com/api/pdf-delivery-sql.php';
    }
    
    // Method 3: Check by specific Python keywords in title (more specific terms first)
    if (strpos($productTitle, 'python') !== false) {
        logWebhook('Product identified as Python book by title (python keyword)');
        return 'https://www.iansaura.com/api/pdf-delivery.php';
    }
    
    // Method 4: Check description field
    $description = strtolower($orderData['description'] ?? '');
    if (strpos($description, 'sql') !== false || strpos($description, 'database') !== false) {
        logWebhook('Product identified as SQL book by description');
        return 'https://www.iansaura.com/api/pdf-delivery-sql.php';
    }
    
    if (strpos($description, 'python') !== false) {
        logWebhook('Product identified as Python book by description');
        return 'https://www.iansaura.com/api/pdf-delivery.php';
    }
    
    // Method 5: Check by broader programming keywords (less specific, checked last)
    if (strpos($productTitle, 'programación') !== false ||
        strpos($productTitle, 'programming') !== false) {
        logWebhook('Product identified as Python book by programming keywords');
        return 'https://www.iansaura.com/api/pdf-delivery.php';
    }
    
    // Default: Python book (since it was the original default)
    logWebhook('Product defaulted to Python book - could not determine from order data', [
        'available_fields' => array_keys($orderData),
        'title' => $productTitle,
        'amount' => $productAmount,
        'note' => 'Both books have same price, detection relies on title/external_id/description'
    ]);
    return 'https://www.iansaura.com/api/pdf-delivery.php';
}

// Prevent duplicate processing
function isDuplicateWebhook($paymentId) {
    $processedFile = __DIR__ . '/../logs/processed-webhooks.log';
    
    if (file_exists($processedFile)) {
        $processedPayments = file($processedFile, FILE_IGNORE_NEW_LINES);
        return in_array($paymentId, $processedPayments);
    }
    
    return false;
}

function markWebhookProcessed($paymentId) {
    $processedFile = __DIR__ . '/../logs/processed-webhooks.log';
    file_put_contents($processedFile, $paymentId . "\n", FILE_APPEND | LOCK_EX);
}

try {
    logWebhook('Webhook request received', [
        'method' => $_SERVER['REQUEST_METHOD'],
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        'headers' => getallheaders()
    ]);
    
    // Only accept POST requests
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit();
    }
    
    // Get webhook payload
    $input = file_get_contents('php://input');
    if (empty($input)) {
        logWebhook('Empty webhook payload');
        http_response_code(400);
        echo json_encode(['error' => 'Empty payload']);
        exit();
    }
    
    $payload = json_decode($input, true);
    if (!$payload) {
        logWebhook('Invalid JSON payload', ['input' => $input]);
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit();
    }
    
    logWebhook('Webhook payload received', $payload);
    
    // Extract payment ID from payload
    $paymentId = $payload['id'] ?? null;
    if (!$paymentId) {
        logWebhook('No payment ID in payload', $payload);
        http_response_code(400);
        echo json_encode(['error' => 'No payment ID found']);
        exit();
    }
    
    // Check for duplicate processing
    if (isDuplicateWebhook($paymentId)) {
        logWebhook('Duplicate webhook - already processed', ['payment_id' => $paymentId]);
        http_response_code(200);
        echo json_encode(['message' => 'Already processed']);
        exit();
    }
    
    // Load API credentials
    $credentials = loadAPICredentials();
    $api = new OneinFiniteAPI($credentials['api_key'], $credentials['api_secret']);
    
    // Validate payment with OneinFinite API
    $validation = $api->validatePayment($paymentId);
    
    if (!$validation['valid']) {
        logWebhook('Payment validation failed', [
            'payment_id' => $paymentId,
            'reason' => $validation['reason']
        ]);
        
        http_response_code(400);
        echo json_encode([
            'error' => 'Payment validation failed',
            'reason' => $validation['reason']
        ]);
        exit();
    }
    
    $order = $validation['order'];
    
    // Extract customer information
    $customerEmail = $order['payer']['email'];
    $customerName = trim(($order['payer']['first_name'] ?? '') . ' ' . ($order['payer']['last_name'] ?? ''));
    if (empty($customerName)) {
        $customerName = 'Cliente';
    }
    
    logWebhook('Payment validated successfully', [
        'payment_id' => $paymentId,
        'email' => $customerEmail,
        'name' => $customerName,
        'amount' => $order['amount'],
        'currency' => $order['currency'],
        'status' => $order['status']
    ]);
    
    // Deliver PDF
    try {
        $deliveryResult = deliverPDF($customerEmail, $customerName, $paymentId, $order);
        
        // Mark as processed to prevent duplicates
        markWebhookProcessed($paymentId);
        
        logWebhook('PDF delivered successfully', [
            'payment_id' => $paymentId,
            'email' => $customerEmail,
            'delivery_result' => $deliveryResult
        ]);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'PDF delivered successfully',
            'payment_id' => $paymentId,
            'email' => $customerEmail
        ]);
        
    } catch (Exception $deliveryError) {
        logWebhook('PDF delivery failed', [
            'payment_id' => $paymentId,
            'email' => $customerEmail,
            'error' => $deliveryError->getMessage()
        ]);
        
        // Still mark as processed to avoid infinite retries
        markWebhookProcessed($paymentId);
        
        http_response_code(500);
        echo json_encode([
            'error' => 'PDF delivery failed',
            'payment_id' => $paymentId,
            'message' => $deliveryError->getMessage()
        ]);
    }
    
} catch (Exception $e) {
    $errorMessage = "Webhook error: " . $e->getMessage();
    error_log($errorMessage);
    logWebhook("ERROR: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal server error',
        'message' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?> 