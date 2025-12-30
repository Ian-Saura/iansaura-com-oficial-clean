<?php
/**
 * OneInfinite Subscription Webhook Handler
 * Handles subscription payments and manages Discord roles
 */

// Enable error logging
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/subscription-errors.log');

// CORS - Permissive for webhooks (external services need to POST here)
require_once __DIR__ . '/middleware/cors.php';
applyCorsWebhook();

header('Content-Type: application/json');

require_once __DIR__ . '/subscription-config.php';
require_once __DIR__ . '/discord-bot.php';

// Database connection function
function getDBConnection() {
    $credentialsFile = __DIR__ . '/.db-credentials.php';
    
    if (!file_exists($credentialsFile)) {
        throw new Exception("Credentials file not found");
    }
    
    $credentials = include $credentialsFile;
    
    $dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    return new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], $options);
}

// Create logs directory
$logsDir = __DIR__ . '/../logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}

// Logging function
function logSubscription($message, $data = []) {
    $logFile = __DIR__ . '/../logs/subscription-webhook.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - " . json_encode($data);
    }
    $logEntry .= "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// Send admin notification email
function notifyAdmin($subject, $message, $subscriberData = []) {
    $to = ADMIN_EMAIL;
    $fullSubject = "[Ian Saura Subs] $subject";
    
    $body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .header { background: #4F46E5; color: white; padding: 20px; }
            .content { padding: 20px; }
            .info { background: #F3F4F6; padding: 15px; border-radius: 8px; margin: 10px 0; }
            .action { background: #FEF3C7; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B; }
        </style>
    </head>
    <body>
        <div class='header'>
            <h2>🔔 Notificación de Suscripción</h2>
        </div>
        <div class='content'>
            <p>$message</p>
            " . (!empty($subscriberData) ? "
            <div class='info'>
                <h3>Datos del suscriptor:</h3>
                <ul>
                    <li><strong>Email:</strong> " . ($subscriberData['email'] ?? 'N/A') . "</li>
                    <li><strong>Nombre:</strong> " . ($subscriberData['name'] ?? 'N/A') . "</li>
                    <li><strong>Discord:</strong> " . ($subscriberData['discord_username'] ?? 'No vinculado') . "</li>
                    <li><strong>Estado:</strong> " . ($subscriberData['status'] ?? 'N/A') . "</li>
                </ul>
            </div>
            " : "") . "
            <div class='action'>
                <h4>⚠️ Acción requerida para YouTube:</h4>
                <p>Recuerda agregar/quitar el email en los videos privados de YouTube manualmente.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura Subs <noreply@iansaura.com>',
        'Reply-To: info@iansaura.com'
    ];
    
    mail($to, $fullSubject, $body, implode("\r\n", $headers));
    logSubscription("Admin notification sent: $subject");
}

// Check for duplicate webhook
function isDuplicateSubscriptionWebhook($eventId) {
    $processedFile = __DIR__ . '/../logs/processed-subscription-webhooks.log';
    
    if (file_exists($processedFile)) {
        $processed = file($processedFile, FILE_IGNORE_NEW_LINES);
        return in_array($eventId, $processed);
    }
    
    return false;
}

function markSubscriptionWebhookProcessed($eventId) {
    $processedFile = __DIR__ . '/../logs/processed-subscription-webhooks.log';
    file_put_contents($processedFile, $eventId . "\n", FILE_APPEND | LOCK_EX);
}

// Function to get subscription/recurrent payment details from OneInfinite API
function getOneInfiniteRecurrentPayment($recurrentPaymentId) {
    $url = ONEINFINITE_API_URL . '/recurrent_payments/' . $recurrentPaymentId;
    
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'x-api-key: ' . ONEINFINITE_API_KEY,
            'x-api-secret: ' . ONEINFINITE_API_SECRET
        ],
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        logSubscription('OneInfinite API curl error', ['error' => $error]);
        return null;
    }
    
    if ($httpCode !== 200) {
        logSubscription('OneInfinite API error', ['http_code' => $httpCode, 'response' => $response]);
        return null;
    }
    
    $data = json_decode($response, true);
    logSubscription('OneInfinite API response (recurrent_payment)', $data);
    return $data;
}

// Function to get payment order details from OneInfinite API (for direct payments)
function getOneInfinitePaymentOrder($paymentOrderId) {
    $url = ONEINFINITE_API_URL . '/payment_orders/' . $paymentOrderId;
    
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'x-api-key: ' . ONEINFINITE_API_KEY,
            'x-api-secret: ' . ONEINFINITE_API_SECRET
        ],
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        logSubscription('OneInfinite API curl error (payment_order)', ['error' => $error]);
        return null;
    }
    
    if ($httpCode !== 200) {
        logSubscription('OneInfinite API error (payment_order)', ['http_code' => $httpCode, 'response' => $response]);
        return null;
    }
    
    $data = json_decode($response, true);
    logSubscription('OneInfinite API response (payment_order)', $data);
    return $data;
}

// Main webhook handler
try {
    logSubscription('Subscription webhook received', [
        'method' => $_SERVER['REQUEST_METHOD'],
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ]);
    
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        exit();
    }
    
    // Get payload
    $input = file_get_contents('php://input');
    if (empty($input)) {
        logSubscription('Empty payload received');
        http_response_code(400);
        echo json_encode(['error' => 'Empty payload']);
        exit();
    }
    
    $payload = json_decode($input, true);
    if (!$payload) {
        logSubscription('Invalid JSON', ['input' => $input]);
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit();
    }
    
    logSubscription('Payload received', $payload);
    
    // Extract event info - OneInfinite uses 'event_type' not 'type'
    $eventId = $payload['id'] ?? uniqid('sub_');
    $eventType = $payload['event_type'] ?? $payload['type'] ?? $payload['event'] ?? 'unknown';
    $entityType = $payload['entity_type'] ?? 'unknown';
    $recurrentPaymentId = $payload['recurrent_payment_id'] ?? $payload['entity_id'] ?? null;
    
    logSubscription('Event parsed', [
        'event_id' => $eventId,
        'event_type' => $eventType,
        'entity_type' => $entityType,
        'recurrent_payment_id' => $recurrentPaymentId
    ]);
    
    // Check duplicate
    if (isDuplicateSubscriptionWebhook($eventId)) {
        logSubscription('Duplicate webhook ignored', ['event_id' => $eventId]);
        http_response_code(200);
        echo json_encode(['message' => 'Already processed']);
        exit();
    }
    
    // Initialize customer variables - Try multiple paths to find email
    $payer = $payload['payer'] ?? $payload['customer'] ?? $payload['buyer'] ?? [];
    
    // Try to get email from multiple possible locations
    $customerEmail = null;
    $emailPaths = [
        $payer['email'] ?? null,
        $payload['email'] ?? null,
        $payload['customer_email'] ?? null,
        $payload['payer_email'] ?? null,
        $payload['buyer_email'] ?? null,
        $payload['data']['payer']['email'] ?? null,
        $payload['data']['customer']['email'] ?? null,
        $payload['payment_order']['payer']['email'] ?? null,
    ];
    
    foreach ($emailPaths as $email) {
        if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $customerEmail = strtolower(trim($email)); // Normalize to lowercase
            break;
        }
    }
    
    $customerName = trim(($payer['first_name'] ?? '') . ' ' . ($payer['last_name'] ?? ''));
    if (empty($customerName)) {
        $customerName = $payer['name'] ?? $payload['customer_name'] ?? $payload['payer_name'] ?? 'Suscriptor';
    }
    $customerPhone = $payer['phone'] ?? $payer['phone_number'] ?? null;
    
    logSubscription('Customer info from payload', [
        'email' => $customerEmail,
        'name' => $customerName,
        'payload_keys' => array_keys($payload)
    ]);
    
    // For RECURRENT_PAYMENT events without email, try to fetch from OneInfinite API
    if (!$customerEmail && $entityType === 'RECURRENT_PAYMENT' && $recurrentPaymentId) {
        logSubscription('No email in payload (RECURRENT_PAYMENT), trying OneInfinite API...');
        $recurrentPaymentData = getOneInfiniteRecurrentPayment($recurrentPaymentId);
        
        if ($recurrentPaymentData) {
            // Try to extract customer info from the API response
            $apiPayer = $recurrentPaymentData['payer'] ?? $recurrentPaymentData['customer'] ?? [];
            $rawEmail = $apiPayer['email'] ?? $recurrentPaymentData['email'] ?? $recurrentPaymentData['customer_email'] ?? null;
            if ($rawEmail) {
                $customerEmail = strtolower(trim($rawEmail)); // Normalize to lowercase
            }
            $apiName = trim(($apiPayer['first_name'] ?? '') . ' ' . ($apiPayer['last_name'] ?? ''));
            if (!empty($apiName)) {
                $customerName = $apiName;
            } elseif (isset($apiPayer['name'])) {
                $customerName = $apiPayer['name'];
            }
            $customerPhone = $customerPhone ?? $apiPayer['phone'] ?? $apiPayer['phone_number'] ?? null;
            
            logSubscription('Customer info from API (RECURRENT_PAYMENT)', [
                'email' => $customerEmail,
                'name' => $customerName
            ]);
        }
    }
    
    // For PAYMENT_ORDER events without email, try to fetch from OneInfinite API
    $paymentOrderId = $payload['entity_id'] ?? null;
    if (!$customerEmail && $entityType === 'PAYMENT_ORDER' && $paymentOrderId) {
        logSubscription('No email in payload (PAYMENT_ORDER), trying OneInfinite API...');
        $paymentOrderData = getOneInfinitePaymentOrder($paymentOrderId);
        
        if ($paymentOrderData) {
            // Try to extract customer info from the API response
            $apiPayer = $paymentOrderData['payer'] ?? $paymentOrderData['customer'] ?? [];
            $rawEmail = $apiPayer['email'] ?? $paymentOrderData['email'] ?? $paymentOrderData['customer_email'] ?? null;
            if ($rawEmail) {
                $customerEmail = strtolower(trim($rawEmail)); // Normalize to lowercase
            }
            $apiName = trim(($apiPayer['first_name'] ?? '') . ' ' . ($apiPayer['last_name'] ?? ''));
            if (!empty($apiName)) {
                $customerName = $apiName;
            } elseif (isset($apiPayer['name'])) {
                $customerName = $apiPayer['name'];
            }
            $customerPhone = $customerPhone ?? $apiPayer['phone'] ?? $apiPayer['phone_number'] ?? null;
            
            logSubscription('Customer info from API (PAYMENT_ORDER)', [
                'email' => $customerEmail,
                'name' => $customerName
            ]);
        }
    }
    
    // Get database connection
    $db = getDBConnection();
    
    // Extract status from payload
    $status = $payload['status'] ?? $payload['payment_status'] ?? 'unknown';
    
    // Handle different event types
    // OneInfinite events: RECURRENT_PAYMENT.ACTIVE, RECURRENT_PAYMENT.PENDING, PAYMENT_ORDER.CLOSED, etc.
    
    // TRIAL detection - check for trial-related fields in payload
    $isTrial = isset($payload['trial']) || 
               isset($payload['is_trial']) || 
               isset($payload['trial_ends_at']) ||
               (isset($payload['type']) && strpos(strtolower($payload['type']), 'trial') !== false) ||
               (isset($eventType) && strpos(strtolower($eventType), 'trial') !== false);
    
    $trialEndsAt = $payload['trial_ends_at'] ?? $payload['trial_end'] ?? null;
    if ($isTrial && !$trialEndsAt) {
        // Default trial is 7 days
        $trialEndsAt = date('Y-m-d H:i:s', strtotime('+7 days'));
    }
    
    logSubscription('Trial detection', [
        'isTrial' => $isTrial,
        'trialEndsAt' => $trialEndsAt,
        'payload_keys' => array_keys($payload)
    ]);
    
    // Also check for PAYMENT_ORDER.CLOSED which is the actual payment confirmation
    // IMPORTANT: Include trial activations as new subscriptions
    // OneInfinite uses RECURRENT_PAYMENT.TRIALING for trial starts (with ING at the end!)
    $isNewSubscription = $eventType === 'RECURRENT_PAYMENT.ACTIVE' ||
                         $eventType === 'RECURRENT_PAYMENT.CREATED' ||
                         $eventType === 'RECURRENT_PAYMENT.TRIAL' ||
                         $eventType === 'RECURRENT_PAYMENT.TRIALING' || // ← OneInfinite trial event!
                         $eventType === 'PAYMENT_ORDER.CLOSED' ||
                         $eventType === 'PAYMENT_ORDER.CREATED' ||
                         (strpos($eventType, 'PAYMENT') !== false && in_array($status, ['CLOSED', 'ACTIVE', 'CREATED'])) ||
                         (strpos($eventType, 'RECURRENT') !== false && in_array($status, ['ACTIVE', 'CREATED', 'TRIAL', 'TRIALING'])) ||
                         $isTrial ||
                         in_array($eventType, ['subscription.created', 'subscription.activated', 'subscription.payment', 'payment.success', 'trial.started', 'trial.activated']);
    
    // Check if this is specifically a trial event
    $isTrialingEvent = $eventType === 'RECURRENT_PAYMENT.TRIALING';
    if ($isTrialingEvent) {
        $isTrial = true;
        if (!$trialEndsAt) {
            $trialEndsAt = date('Y-m-d H:i:s', strtotime('+7 days'));
        }
        logSubscription('TRIALING event detected - setting as trial', ['trial_ends_at' => $trialEndsAt]);
    }
    
    // ============================================
    // OneInfinite Event Types (from docs):
    // RECURRENT_PAYMENT.CANCELED - User cancelled
    // RECURRENT_PAYMENT.PENDING - Payment pending
    // RECURRENT_PAYMENT.ACTIVE - Subscription active
    // RECURRENT_PAYMENT.REJECTED - Payment rejected
    // RECURRENT_PAYMENT.UNPAID - Payment not received
    // RECURRENT_PAYMENT.COMPLETE - Subscription completed
    // RECURRENT_PAYMENT.INCOMPLETE - Info incomplete
    // RECURRENT_PAYMENT.EXPIRED - Subscription expired
    // RECURRENT_PAYMENT.TRIALING - Trial started
    // ============================================
    
    $isCancellation = $eventType === 'RECURRENT_PAYMENT.CANCELLED' ||
                      $eventType === 'RECURRENT_PAYMENT.CANCELED' ||
                      in_array($eventType, ['subscription.cancelled', 'subscription.canceled', 'trial.cancelled']);
    
    $isExpired = $eventType === 'RECURRENT_PAYMENT.EXPIRED' ||
                 $eventType === 'RECURRENT_PAYMENT.COMPLETE' ||
                 in_array($eventType, ['subscription.expired', 'subscription.ended']);
    
    $isPaymentFailed = $eventType === 'RECURRENT_PAYMENT.REJECTED' ||
                       $eventType === 'RECURRENT_PAYMENT.UNPAID' ||
                       in_array($status, ['FAILED', 'REJECTED', 'UNPAID']) || 
                       in_array($eventType, ['subscription.payment_failed', 'payment.failed']);
    
    $isPending = $eventType === 'RECURRENT_PAYMENT.PENDING' ||
                 $eventType === 'RECURRENT_PAYMENT.INCOMPLETE';
    
    logSubscription('Event classification', [
        'isNewSubscription' => $isNewSubscription,
        'isCancellation' => $isCancellation,
        'isExpired' => $isExpired,
        'isPaymentFailed' => $isPaymentFailed,
        'isPending' => $isPending,
        'status' => $status
    ]);
    
    if ($isNewSubscription && $customerEmail) {
        // Normalize email to lowercase for case-insensitive search
        $normalizedEmail = strtolower(trim($customerEmail));
        
        logSubscription('Processing new/renewed subscription', [
            'email_original' => $customerEmail,
            'email_normalized' => $normalizedEmail,
            'status' => $status,
            'event_type' => $eventType,
            'recurrent_payment_id' => $recurrentPaymentId
        ]);
        
        // ============================================
        // STEP 1: Check/Create User in 'users' table
        // ============================================
        
        // Try case-insensitive search first
        $stmt = $db->prepare("SELECT id, name, full_name, email FROM users WHERE LOWER(email) = ?");
        $stmt->execute([$normalizedEmail]);
        $existingUser = $stmt->fetch();
        
        $userId = null;
        
        if ($existingUser) {
            // User already registered - just get their ID
            $userId = $existingUser['id'];
            logSubscription('Found existing user', [
                'user_id' => $userId, 
                'email_in_db' => $existingUser['email'],
                'email_searched' => $normalizedEmail
            ]);
            
            // Use their name if we don't have one from payment
            if (empty($customerName) || $customerName === 'Suscriptor') {
                $customerName = $existingUser['full_name'] ?: $existingUser['name'] ?: 'Suscriptor';
            }
        } else {
            // User not registered - create account with temporary password
            $tempPassword = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 10);
            $hashedPassword = password_hash($tempPassword, PASSWORD_DEFAULT);
            
            // Parse name
            $nameParts = explode(' ', $customerName, 2);
            $firstName = $nameParts[0];
            $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
            
            $stmt = $db->prepare("
                INSERT INTO users (
                    email, password_hash, name, first_name, last_name, full_name,
                    email_verified, is_active, login_count, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, 1, 1, 0, NOW())
            ");
            $stmt->execute([$normalizedEmail, $hashedPassword, $customerName, $firstName, $lastName, $customerName]);
            $userId = $db->lastInsertId();
            
            logSubscription('Created new user account', [
                'user_id' => $userId, 
                'email' => $normalizedEmail,
                'temp_password_generated' => true
            ]);
        }
        
        // ============================================
        // STEP 2: Check/Create Subscriber record
        // ============================================
        // Use normalized email for subscriber lookup too
        $stmt = $db->prepare("SELECT * FROM subscribers WHERE LOWER(email) = ?");
        $stmt->execute([$normalizedEmail]);
        $existingSubscriber = $stmt->fetch();
        
        if ($existingSubscriber) {
            // Determine subscription duration based on amount
            $amount = floatval($payload['amount'] ?? $payload['amount_total'] ?? 20);
            $subscriptionMonths = 1; // Default: mensual
            $planType = 'monthly';
            
            // Detect plan by amount
            if ($amount >= 230 && $amount <= 250) {
                $subscriptionMonths = 12;
                $planType = 'annual';
            } elseif ($amount >= 140 && $amount <= 160) {
                $subscriptionMonths = 6;
                $planType = 'semi-annual';
            } elseif ($amount >= 25 && $amount <= 35) {
                $subscriptionMonths = 1;
                $planType = 'monthly';
            }
            
            // Update existing subscriber - ALWAYS link to user
            // IMPORTANT: If it's a trial event, keep as trial. Otherwise convert to active.
            if ($isTrial) {
                // Update to trial status - ALWAYS set user_id (not COALESCE)
                $stmt = $db->prepare("
                    UPDATE subscribers SET 
                        status = 'trial',
                        payment_type = 'oneinfinite',
                        plan_type = 'trial',
                        user_id = ?,
                        name = COALESCE(NULLIF(?, ''), name),
                        phone = COALESCE(?, phone),
                        oneinfinite_subscription_id = COALESCE(?, oneinfinite_subscription_id),
                        subscription_end = ?,
                        trial_ends_at = ?,
                        updated_at = NOW()
                    WHERE LOWER(email) = ?
                ");
                $stmt->execute([$userId, $customerName, $customerPhone, $eventId, $trialEndsAt, $trialEndsAt, $normalizedEmail]);
                
                logSubscription('Existing subscriber updated to TRIAL (OneInfinite)', [
                    'email' => $normalizedEmail,
                    'trial_ends_at' => $trialEndsAt
                ]);
            } else {
                // Convert to active paid subscriber - ALWAYS set user_id
                $stmt = $db->prepare("
                    UPDATE subscribers SET 
                        status = 'active',
                        payment_type = 'oneinfinite',
                        user_id = ?,
                        name = COALESCE(NULLIF(?, ''), name),
                        phone = COALESCE(?, phone),
                        oneinfinite_subscription_id = COALESCE(?, oneinfinite_subscription_id),
                        last_payment_date = NOW(),
                        subscription_end = DATE_ADD(NOW(), INTERVAL ? MONTH),
                        next_payment_date = DATE_ADD(NOW(), INTERVAL ? MONTH),
                        amount = ?,
                        plan_type = ?,
                        trial_ends_at = NULL,
                        updated_at = NOW()
                    WHERE LOWER(email) = ?
                ");
                $stmt->execute([$userId, $customerName, $customerPhone, $eventId, $subscriptionMonths, $subscriptionMonths, $amount, $planType, $normalizedEmail]);
            }
            
            logSubscription('Existing subscriber renewed', [
                'email' => $normalizedEmail,
                'plan_type' => $planType,
                'months' => $subscriptionMonths
            ]);
            
            $subscriberId = $existingSubscriber['id'];
            
            // If Discord was already connected, ensure role is assigned
            if ($existingSubscriber['discord_user_id'] && !$existingSubscriber['discord_role_assigned']) {
                try {
                    $discord = new DiscordBot();
                    $discord->addSubscriberRole($existingSubscriber['discord_user_id']);
                    
                    $stmt = $db->prepare("UPDATE subscribers SET discord_role_assigned = TRUE WHERE id = ?");
                    $stmt->execute([$subscriberId]);
                    
                    logSubscription('Discord role re-assigned for returning subscriber', [
                        'subscriber_id' => $subscriberId,
                        'discord_id' => $existingSubscriber['discord_user_id']
                    ]);
                } catch (Exception $e) {
                    logSubscription('Failed to re-assign Discord role', [
                        'error' => $e->getMessage()
                    ]);
                }
            }
            
            logSubscription('Existing subscriber renewed', ['subscriber_id' => $subscriberId, 'user_id' => $userId]);
            
        } else {
            // Determine subscription duration based on amount
            $amount = floatval($payload['amount'] ?? $payload['amount_total'] ?? 20);
            $subscriptionMonths = 1; // Default: mensual
            $planType = 'monthly';
            
            // Detect plan by amount
            if ($amount >= 230 && $amount <= 250) {
                // Plan anual: $240 = 12 meses
                $subscriptionMonths = 12;
                $planType = 'annual';
            } elseif ($amount >= 140 && $amount <= 160) {
                // Plan semestral: $150 = 6 meses
                $subscriptionMonths = 6;
                $planType = 'semi-annual';
            } elseif ($amount >= 25 && $amount <= 35) {
                // Plan mensual después del 7/12: $30 = 1 mes
                $subscriptionMonths = 1;
                $planType = 'monthly';
            }
            
            // Check if this is a trial
            if ($isTrial) {
                $planType = 'trial';
                $subscriptionMonths = 0; // Trial doesn't count as months
            }
            
            logSubscription('Subscription plan detected', [
                'amount' => $amount,
                'months' => $subscriptionMonths,
                'plan_type' => $planType,
                'is_trial' => $isTrial,
                'trial_ends_at' => $trialEndsAt
            ]);
            
            // Create new subscriber - linked to user
            // For trials: status = 'trial', payment_type = 'oneinfinite' (they put their card)
            $subscriptionStatus = $isTrial ? 'trial' : 'active';
            
            $stmt = $db->prepare("
                INSERT INTO subscribers (
                    user_id, email, name, phone, 
                    oneinfinite_subscription_id, oneinfinite_customer_id,
                    status, payment_type, subscription_start, subscription_end, 
                    next_payment_date, last_payment_date,
                    amount, currency, plan_type, trial_ends_at
                ) VALUES (
                    ?, ?, ?, ?,
                    ?, ?,
                    ?, 'oneinfinite', NOW(), " . ($isTrial ? "?" : "DATE_ADD(NOW(), INTERVAL ? MONTH)") . ",
                    " . ($isTrial ? "?" : "DATE_ADD(NOW(), INTERVAL ? MONTH)") . ", NOW(),
                    ?, ?, ?, ?
                )
            ");
            
            if ($isTrial) {
                $stmt->execute([
                    $userId,
                    $normalizedEmail, 
                    $customerName, 
                    $customerPhone,
                    $eventId,
                    $payload['customer_id'] ?? null,
                    $subscriptionStatus, // 'trial'
                    $trialEndsAt, // subscription_end
                    $trialEndsAt, // next_payment_date
                    $amount,
                    $payload['currency'] ?? 'USD',
                    $planType,
                    $trialEndsAt
                ]);
            } else {
                $stmt->execute([
                    $userId,
                    $normalizedEmail, 
                    $customerName, 
                    $customerPhone,
                    $eventId,
                    $payload['customer_id'] ?? null,
                    $subscriptionStatus, // 'active'
                    $subscriptionMonths,
                    $subscriptionMonths,
                    $amount,
                    $payload['currency'] ?? 'USD',
                    $planType,
                    null // no trial
                ]);
            }
            
            $subscriberId = $db->lastInsertId();
            logSubscription('New subscriber created', [
                'subscriber_id' => $subscriberId, 
                'user_id' => $userId,
                'plan_type' => $planType,
                'months' => $subscriptionMonths,
                'is_trial' => $isTrial,
                'trial_ends_at' => $trialEndsAt
            ]);
        }
        
        // ============================================
        // STEP 3: Mark user as subscribed in users table (CRITICAL - MUST ALWAYS RUN)
        // ============================================
        if ($userId) {
            try {
                // Check if 'subscribed' column exists
                $checkColumn = $db->query("SHOW COLUMNS FROM users LIKE 'subscribed'");
                if ($checkColumn->rowCount() > 0) {
                    $stmt = $db->prepare("UPDATE users SET subscribed = 1, updated_at = NOW() WHERE id = ?");
                    $stmt->execute([$userId]);
                    
                    // Verify the update worked
                    $verifyStmt = $db->prepare("SELECT subscribed FROM users WHERE id = ?");
                    $verifyStmt->execute([$userId]);
                    $verifyResult = $verifyStmt->fetch();
                    
                    logSubscription('User marked as subscribed in users table', [
                        'user_id' => $userId,
                        'email' => $normalizedEmail,
                        'subscribed_status' => $verifyResult['subscribed'] ?? 'unknown',
                        'update_successful' => ($verifyResult['subscribed'] ?? 0) == 1
                    ]);
                    
                    if (($verifyResult['subscribed'] ?? 0) != 1) {
                        logSubscription('WARNING: subscribed column update may have failed', [
                            'user_id' => $userId,
                            'email' => $normalizedEmail,
                            'actual_value' => $verifyResult['subscribed'] ?? 'null'
                        ]);
                    }
                } else {
                    logSubscription('ERROR: subscribed column does not exist in users table', ['user_id' => $userId]);
                }
            } catch (Exception $e) {
                logSubscription('ERROR: Could not update subscribed column', [
                    'error' => $e->getMessage(),
                    'user_id' => $userId,
                    'email' => $normalizedEmail,
                    'trace' => $e->getTraceAsString()
                ]);
            }
        } else {
            logSubscription('ERROR: userId is null, cannot update subscribed status', [
                'email' => $normalizedEmail ?? $customerEmail
            ]);
        }
        
        // Log event
        $stmt = $db->prepare("
            INSERT INTO subscription_events (subscriber_id, event_type, event_data, oneinfinite_event_id)
            VALUES (?, 'activated', ?, ?)
        ");
        $stmt->execute([$subscriberId, json_encode($payload), $eventId]);
        
        // Generate Discord connection link
        $connectionToken = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+7 days'));
        
        $stmt = $db->prepare("
            INSERT INTO pending_discord_connections (subscriber_id, connection_token, email, expires_at)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE connection_token = VALUES(connection_token), expires_at = VALUES(expires_at), used = FALSE
        ");
        $stmt->execute([$subscriberId, $connectionToken, $normalizedEmail, $expiresAt]);
        
        $discordConnectUrl = "https://www.iansaura.com/api/connect-discord.php?token=$connectionToken";
        
        // Platform access URL
        $platformUrl = "https://www.iansaura.com/members";
        $loginUrl = "https://www.iansaura.com/auth";
        
        // Send welcome email to subscriber
        $subscriberSubject = "🎉 ¡Tu acceso a la Academia está listo!";
        $subscriberBody = "
        <html>
        <head>
            <meta charset='UTF-8'>
        </head>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #0f172a;'>
            <table width='100%' cellpadding='0' cellspacing='0' style='background-color: #0f172a; padding: 20px;'>
                <tr>
                    <td align='center'>
                        <table width='600' cellpadding='0' cellspacing='0' style='background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155;'>
                            <!-- Header -->
                            <tr>
                                <td style='background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); color: #ffffff; padding: 40px; text-align: center;'>
                                    <h1 style='margin: 0; color: #ffffff; font-size: 28px;'>¡Bienvenido/a, $customerName! 🚀</h1>
                                    <p style='margin: 15px 0 0 0; color: #d1fae5; font-size: 16px;'>Tu suscripción a la Academia de Data Engineering está activa</p>
                                </td>
                            </tr>
                            <!-- Content -->
                            <tr>
                                <td style='padding: 30px;'>
                                    <h2 style='color: #ffffff; margin-top: 0;'>¿Qué sigue?</h2>
                                    
                                    <!-- Step 1 - PLATFORM ACCESS -->
                                    <table width='100%' cellpadding='20' cellspacing='0' style='background: linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(6,182,212,0.1) 100%); border-radius: 12px; margin-bottom: 15px; border: 1px solid #10b981;'>
                                        <tr>
                                            <td>
                                                <h3 style='color: #10b981; margin: 0 0 10px 0;'>1. 🎓 Accedé a tu Academia</h3>
                                                <p style='color: #94a3b8; margin: 0 0 15px 0;'>Tu plataforma de aprendizaje está lista con roadmaps, proyectos, datasets y más:</p>
                                                <a href='$loginUrl' style='display: inline-block; background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%); color: #ffffff !important; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; font-size: 16px;'>🚀 Ir a la Academia</a>
                                                <p style='color: #64748b; font-size: 12px; margin: 15px 0 0 0;'>Iniciá sesión con tu email: $normalizedEmail</p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Step 2 - DISCORD -->
                                    <table width='100%' cellpadding='20' cellspacing='0' style='background-color: rgba(99,102,241,0.1); border-radius: 12px; margin-bottom: 15px; border: 1px solid #6366f1;'>
                                        <tr>
                                            <td>
                                                <h3 style='color: #818cf8; margin: 0 0 10px 0;'>2. 💬 Unite a la Comunidad Discord</h3>
                                                <p style='color: #94a3b8; margin: 0 0 15px 0;'>Conectá tu Discord para acceder al servidor exclusivo de suscriptores:</p>
                                                <a href='$discordConnectUrl' style='display: inline-block; background-color: #6366f1; color: #ffffff !important; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;'>Conectar Discord</a>
                                                <p style='color: #64748b; font-size: 12px; margin: 15px 0 0 0;'>Este enlace expira en 7 días</p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- What's included -->
                                    <table width='100%' cellpadding='20' cellspacing='0' style='background-color: #0f172a; border-radius: 12px; margin-bottom: 15px; border: 1px solid #334155;'>
                                        <tr>
                                            <td>
                                                <h3 style='color: #f8fafc; margin: 0 0 15px 0;'>📦 Tu suscripción incluye:</h3>
                                                <ul style='color: #94a3b8; margin: 0; padding-left: 20px;'>
                                                    <li style='margin-bottom: 8px;'>✅ 3 Roadmaps completos (Novato → Junior → Senior)</li>
                                                    <li style='margin-bottom: 8px;'>✅ Proyectos prácticos con datasets reales</li>
                                                    <li style='margin-bottom: 8px;'>✅ Generador de datasets para practicar</li>
                                                    <li style='margin-bottom: 8px;'>✅ Grabaciones del Bootcamp Fundamentos</li>
                                                    <li style='margin-bottom: 8px;'>✅ Comunidad Discord exclusiva</li>
                                                    <li style='margin-bottom: 0;'>✅ Soporte directo conmigo</li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- Help -->
                                    <table width='100%' cellpadding='15' cellspacing='0' style='background-color: rgba(251,191,36,0.1); border-radius: 8px; border-left: 4px solid #fbbf24;'>
                                        <tr>
                                            <td>
                                                <p style='color: #fcd34d; margin: 0; font-size: 14px;'>
                                                    <strong>¿Problemas para acceder?</strong><br>
                                                    <span style='color: #94a3b8;'>Respondé a este email o escribime a info@iansaura.com</span>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style='background-color: #0f172a; padding: 25px; text-align: center; border-top: 1px solid #334155;'>
                                    <p style='color: #64748b; margin: 0; font-size: 14px;'>Gracias por confiar en mí para tu desarrollo profesional.</p>
                                    <p style='color: #10b981; margin: 10px 0 0 0; font-size: 16px; font-weight: bold;'>- Ian Saura 🤘</p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        ";
        
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: Ian Saura <info@iansaura.com>',
            'Reply-To: info@iansaura.com'
        ];
        
        // Send welcome email to subscriber
        $emailResult = mail($normalizedEmail, $subscriberSubject, $subscriberBody, implode("\r\n", $headers));
        
        if ($emailResult) {
            logSubscription('Welcome email sent to subscriber', ['email' => $normalizedEmail]);
        } else {
            logSubscription('FAILED to send welcome email', ['email' => $normalizedEmail, 'error' => error_get_last()]);
        }
        
        // Notify admin
        notifyAdmin(
            "🎉 Nueva suscripción: $customerName",
            "Se ha registrado una nueva suscripción. Por favor, agrega el email a los videos privados de YouTube.",
            [
                'email' => $normalizedEmail,
                'name' => $customerName,
                'status' => 'active',
                'discord_username' => 'Pendiente de conexión'
            ]
        );
        
        markSubscriptionWebhookProcessed($eventId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Subscription activated',
            'subscriber_id' => $subscriberId
        ]);
        
    } elseif ($isCancellation && $customerEmail) {
        logSubscription('Processing cancellation', ['email' => $customerEmail]);
        
        // Get subscriber (case-insensitive)
        $stmt = $db->prepare("SELECT * FROM subscribers WHERE LOWER(email) = LOWER(?)");
        $stmt->execute([$customerEmail]);
        $subscriber = $stmt->fetch();
        
        if ($subscriber) {
            // Update status
            $stmt = $db->prepare("
                UPDATE subscribers SET 
                    status = 'cancelled',
                    cancelled_at = NOW(),
                    updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([$subscriber['id']]);
            
            // Also update user's subscribed status
            try {
                $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE LOWER(email) = LOWER(?)");
                $stmt->execute([$customerEmail]);
            } catch (Exception $e) {
                // Column might not exist
            }
            
            // Remove Discord role if assigned
            if ($subscriber['discord_user_id'] && $subscriber['discord_role_assigned']) {
                try {
                    $discord = new DiscordBot();
                    $discord->removeSubscriberRole($subscriber['discord_user_id']);
                    
                    $stmt = $db->prepare("UPDATE subscribers SET discord_role_assigned = FALSE WHERE id = ?");
                    $stmt->execute([$subscriber['id']]);
                    
                    logSubscription('Discord role removed', [
                        'subscriber_id' => $subscriber['id'],
                        'discord_id' => $subscriber['discord_user_id']
                    ]);
                    
                    // Log event
                    $stmt = $db->prepare("
                        INSERT INTO subscription_events (subscriber_id, event_type, event_data, oneinfinite_event_id)
                        VALUES (?, 'discord_role_removed', ?, ?)
                    ");
                    $stmt->execute([$subscriber['id'], json_encode($payload), $eventId]);
                    
                } catch (Exception $e) {
                    logSubscription('Failed to remove Discord role', ['error' => $e->getMessage()]);
                }
            }
            
            // Log cancellation event
            $stmt = $db->prepare("
                INSERT INTO subscription_events (subscriber_id, event_type, event_data, oneinfinite_event_id)
                VALUES (?, 'cancelled', ?, ?)
            ");
            $stmt->execute([$subscriber['id'], json_encode($payload), $eventId]);
            
            // Notify admin
            notifyAdmin(
                "❌ Suscripción cancelada: " . $subscriber['name'],
                "Se ha cancelado una suscripción. Por favor, REMUEVE el email de los videos privados de YouTube.",
                [
                    'email' => $subscriber['email'],
                    'name' => $subscriber['name'],
                    'status' => 'cancelled',
                    'discord_username' => $subscriber['discord_username'] ?? 'N/A'
                ]
            );
        }
        
        markSubscriptionWebhookProcessed($eventId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Cancellation processed'
        ]);
        
    } elseif ($isPaymentFailed && $customerEmail) {
        logSubscription('Processing payment failure', ['email' => $customerEmail]);
        
        $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
        $stmt->execute([$customerEmail]);
        $subscriber = $stmt->fetch();
        
        if ($subscriber) {
            // Log event
            $stmt = $db->prepare("
                INSERT INTO subscription_events (subscriber_id, event_type, event_data, oneinfinite_event_id)
                VALUES (?, 'payment_failed', ?, ?)
            ");
            $stmt->execute([$subscriber['id'], json_encode($payload), $eventId]);
            
            // Notify admin
            notifyAdmin(
                "⚠️ Pago fallido: " . $subscriber['name'],
                "Un pago de suscripción ha fallado. El acceso se mantendrá hasta la fecha de expiración.",
                [
                    'email' => $subscriber['email'],
                    'name' => $subscriber['name'],
                    'status' => $subscriber['status'],
                    'discord_username' => $subscriber['discord_username'] ?? 'N/A'
                ]
            );
        }
        
        markSubscriptionWebhookProcessed($eventId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Payment failure logged'
        ]);
        
    } elseif ($isExpired && $customerEmail) {
        // ============================================
        // HANDLE EXPIRED SUBSCRIPTION
        // ============================================
        logSubscription('Processing subscription expiration', ['email' => $customerEmail, 'event_type' => $eventType]);
        
        $stmt = $db->prepare("SELECT * FROM subscribers WHERE LOWER(email) = LOWER(?)");
        $stmt->execute([$customerEmail]);
        $subscriber = $stmt->fetch();
        
        if ($subscriber) {
            // Update status to expired
            $stmt = $db->prepare("
                UPDATE subscribers SET 
                    status = 'expired',
                    updated_at = NOW()
                WHERE id = ?
            ");
            $stmt->execute([$subscriber['id']]);
            
            // Also update user's subscribed status
            try {
                $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE LOWER(email) = LOWER(?)");
                $stmt->execute([$customerEmail]);
            } catch (Exception $e) {
                // Column might not exist
            }
            
            // Remove Discord role if assigned
            if ($subscriber['discord_user_id'] && $subscriber['discord_role_assigned']) {
                try {
                    $discord = new DiscordBot();
                    $discord->removeSubscriberRole($subscriber['discord_user_id']);
                    
                    $stmt = $db->prepare("UPDATE subscribers SET discord_role_assigned = FALSE WHERE id = ?");
                    $stmt->execute([$subscriber['id']]);
                    
                    logSubscription('Discord role removed on expiration', [
                        'subscriber_id' => $subscriber['id'],
                        'discord_id' => $subscriber['discord_user_id']
                    ]);
                } catch (Exception $e) {
                    logSubscription('Failed to remove Discord role on expiration', ['error' => $e->getMessage()]);
                }
            }
            
            // Log expiration event
            $stmt = $db->prepare("
                INSERT INTO subscription_events (subscriber_id, event_type, event_data, oneinfinite_event_id)
                VALUES (?, 'expired', ?, ?)
            ");
            $stmt->execute([$subscriber['id'], json_encode($payload), $eventId]);
            
            // Notify admin
            notifyAdmin(
                "💀 Suscripción expirada: " . $subscriber['name'],
                "Una suscripción ha expirado. El acceso premium ha sido revocado automáticamente.",
                [
                    'email' => $subscriber['email'],
                    'name' => $subscriber['name'],
                    'status' => 'expired',
                    'discord_username' => $subscriber['discord_username'] ?? 'N/A'
                ]
            );
            
            logSubscription('Subscription expired successfully', [
                'subscriber_id' => $subscriber['id'],
                'email' => $customerEmail
            ]);
        }
        
        markSubscriptionWebhookProcessed($eventId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Expiration processed'
        ]);
        
    } elseif ($isPending && $customerEmail) {
        // ============================================
        // HANDLE PENDING/INCOMPLETE - Just log, don't change status
        // ============================================
        logSubscription('Processing pending payment', ['email' => $customerEmail, 'event_type' => $eventType]);
        
        $stmt = $db->prepare("SELECT * FROM subscribers WHERE LOWER(email) = LOWER(?)");
        $stmt->execute([$customerEmail]);
        $subscriber = $stmt->fetch();
        
        if ($subscriber) {
            // Log pending event (don't change status yet)
            $stmt = $db->prepare("
                INSERT INTO subscription_events (subscriber_id, event_type, event_data, oneinfinite_event_id)
                VALUES (?, 'pending', ?, ?)
            ");
            $stmt->execute([$subscriber['id'], json_encode($payload), $eventId]);
            
            logSubscription('Pending payment logged', [
                'subscriber_id' => $subscriber['id'],
                'email' => $customerEmail
            ]);
        }
        
        markSubscriptionWebhookProcessed($eventId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Pending payment logged'
        ]);
        
    } elseif ($isNewSubscription && !$customerEmail) {
        // We have a subscription event but couldn't get the email
        logSubscription('SUBSCRIPTION EVENT WITHOUT EMAIL - Needs manual review', [
            'event_type' => $eventType,
            'recurrent_payment_id' => $recurrentPaymentId,
            'entity_type' => $entityType
        ]);
        
        // Notify admin that manual intervention is needed
        notifyAdmin(
            "⚠️ Suscripción sin email - Intervención manual requerida",
            "Se recibió un evento de suscripción activa pero no se pudo obtener el email del cliente. " .
            "Por favor, verifica en OneInfinite y activa manualmente el acceso.",
            [
                'event_type' => $eventType,
                'recurrent_payment_id' => $recurrentPaymentId,
                'status' => 'Requiere revisión manual'
            ]
        );
        
        markSubscriptionWebhookProcessed($eventId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Subscription event received but email not found - admin notified',
            'event_type' => $eventType
        ]);
        
    } else {
        // Non-subscription events (PENDING, OPENED, etc.) - just acknowledge
        logSubscription('Non-actionable event received', [
            'event_type' => $eventType,
            'entity_type' => $entityType
        ]);
        
        markSubscriptionWebhookProcessed($eventId);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Event acknowledged',
            'event_type' => $eventType
        ]);
    }
    
} catch (Exception $e) {
    $errorMessage = "Subscription webhook error: " . $e->getMessage();
    error_log($errorMessage);
    logSubscription("ERROR: " . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Internal server error',
        'message' => $e->getMessage()
    ]);
}
?>