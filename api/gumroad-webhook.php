<?php
/**
 * Gumroad Webhook Handler (Ping)
 * 
 * Receives notifications from Gumroad when:
 * - New subscription purchase
 * - Subscription renewal
 * - Subscription cancelled
 * - Refund
 * 
 * Docs: https://gumroad.com/ping
 */

// Log all requests for debugging
$logsDir = __DIR__ . '/../logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}
$logFile = $logsDir . '/gumroad-webhook.log';
$timestamp = date('Y-m-d H:i:s');

// Get raw POST data
$rawInput = file_get_contents('php://input');
$postData = $_POST;

// Log the incoming request
file_put_contents($logFile, "\n\n========== [$timestamp] NEW WEBHOOK ==========\n", FILE_APPEND | LOCK_EX);
file_put_contents($logFile, "POST Data: " . json_encode($postData, JSON_PRETTY_PRINT) . "\n", FILE_APPEND | LOCK_EX);
file_put_contents($logFile, "Raw Input: " . $rawInput . "\n", FILE_APPEND | LOCK_EX);

// Always respond 200 first (Gumroad requires quick response)
http_response_code(200);

// Required files
require_once __DIR__ . '/secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Extract data from Gumroad ping
    $saleId = $postData['sale_id'] ?? null;
    $email = strtolower(trim($postData['email'] ?? ''));
    $productId = $postData['product_id'] ?? null;
    $productName = $postData['product_name'] ?? '';
    $price = isset($postData['price']) ? (int)$postData['price'] / 100 : 0; // Gumroad sends cents
    $fullName = $postData['full_name'] ?? '';
    $subscriptionId = $postData['subscription_id'] ?? null;
    $recurrence = $postData['recurrence'] ?? 'monthly';
    $refunded = ($postData['refunded'] ?? 'false') === 'true';
    $isRecurringCharge = ($postData['is_recurring_charge'] ?? 'false') === 'true';
    $licenseKey = $postData['license_key'] ?? null;
    $test = ($postData['test'] ?? 'false') === 'true';
    
    // Cancellation detection - Gumroad sends these fields when subscription is cancelled
    $cancelled = ($postData['cancelled'] ?? 'false') === 'true';
    $subscriptionEndedAt = $postData['subscription_ended_at'] ?? null;
    $resourceName = $postData['resource_name'] ?? null; // 'cancellation' for cancel events
    
    // Failed charge detection - Gumroad may send these when payment fails
    $chargebackTime = $postData['chargeback_date'] ?? null;
    $failedAt = $postData['failed_at'] ?? null;
    $disputed = ($postData['disputed'] ?? 'false') === 'true';
    
    file_put_contents($logFile, "Parsed: email=$email, price=$price, refunded=$refunded, cancelled=$cancelled, subscription_ended_at=$subscriptionEndedAt, resource_name=$resourceName, recurring=$isRecurringCharge, subscription_id=$subscriptionId, disputed=$disputed, chargebackTime=$chargebackTime, failedAt=$failedAt\n", FILE_APPEND | LOCK_EX);
    
    if (empty($email)) {
        file_put_contents($logFile, "ERROR: No email in webhook\n", FILE_APPEND | LOCK_EX);
        exit();
    }
    
    // Handle cancellation (user cancelled but didn't request refund)
    if ($cancelled || $resourceName === 'cancellation' || !empty($subscriptionEndedAt)) {
        file_put_contents($logFile, "Processing CANCELLATION for $email\n", FILE_APPEND | LOCK_EX);
        
        // Update subscriber status to cancelled
        $stmt = $db->prepare("
            UPDATE subscribers SET 
                status = 'cancelled',
                notes = CONCAT(COALESCE(notes, ''), '\n[Subscription cancelled: $timestamp]'),
                updated_at = NOW()
            WHERE LOWER(email) = ?
        ");
        $stmt->execute([$email]);
        $rowsAffected = $stmt->rowCount();
        
        // Update user's subscribed status
        $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        
        file_put_contents($logFile, "Cancellation processed for $email (rows affected: $rowsAffected)\n", FILE_APPEND | LOCK_EX);
        
        // Log cancellation for analytics
        $cancelLog = $logsDir . '/cancellations.log';
        file_put_contents($cancelLog, "[$timestamp] CANCELLED: $email\n", FILE_APPEND | LOCK_EX);
        
        exit();
    }
    
    // Handle refund
    if ($refunded) {
        file_put_contents($logFile, "Processing REFUND for $email\n", FILE_APPEND | LOCK_EX);
        
        // Update subscriber status to cancelled
        $stmt = $db->prepare("
            UPDATE subscribers SET 
                status = 'cancelled',
                notes = CONCAT(COALESCE(notes, ''), '\n[Refund processed: $timestamp]'),
                updated_at = NOW()
            WHERE LOWER(email) = ?
        ");
        $stmt->execute([$email]);
        
        // Update user's subscribed status
        $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        
        file_put_contents($logFile, "Refund processed for $email\n", FILE_APPEND | LOCK_EX);
        exit();
    }
    
    // Handle disputed/chargeback - payment failed
    if ($disputed || $chargebackTime || $failedAt) {
        file_put_contents($logFile, "Processing FAILED PAYMENT / DISPUTE for $email\n", FILE_APPEND | LOCK_EX);
        
        // Update subscriber status to cancelled
        $reason = $disputed ? 'disputed' : ($chargebackTime ? 'chargeback' : 'failed');
        $stmt = $db->prepare("
            UPDATE subscribers SET 
                status = 'cancelled',
                notes = CONCAT(COALESCE(notes, ''), ?),
                updated_at = NOW()
            WHERE LOWER(email) = ?
        ");
        $stmt->execute(["\n[Payment $reason: $timestamp]", $email]);
        
        // Update user's subscribed status
        $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE LOWER(email) = ?");
        $stmt->execute([$email]);
        
        // Log for manual review
        $alertFile = $logsDir . '/payment-failures.log';
        file_put_contents($alertFile, "[$timestamp] PAYMENT FAILED ($reason): $email\n", FILE_APPEND | LOCK_EX);
        
        file_put_contents($logFile, "Payment failure ($reason) processed for $email\n", FILE_APPEND | LOCK_EX);
        exit();
    }
    
    // Check if subscriber exists (including by secondary email)
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE LOWER(email) = ? OR LOWER(secondary_email) = ?");
    $stmt->execute([$email, $email]);
    $existingSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Find user by email
    $stmt = $db->prepare("SELECT id FROM users WHERE LOWER(email) = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    $userId = $user ? $user['id'] : null;
    
    // ⚠️ ALERT: Detect re-subscription (someone who already had a subscription before)
    $isResubscription = false;
    $previousStatus = null;
    if ($existingSubscriber) {
        $previousStatus = $existingSubscriber['status'];
        // If they had cancelled, expired, or any previous subscription
        if (in_array($previousStatus, ['cancelled', 'expired', 'active', 'trial'])) {
            $isResubscription = true;
            
            // Log alert for manual review
            $alertFile = $logsDir . '/resubscription-alerts.log';
            $alertMsg = "[$timestamp] ⚠️ RE-SUSCRIPCIÓN DETECTADA\n";
            $alertMsg .= "  Email: $email\n";
            $alertMsg .= "  Nombre: $fullName\n";
            $alertMsg .= "  Estado anterior: $previousStatus\n";
            $alertMsg .= "  Payment type anterior: " . ($existingSubscriber['payment_type'] ?? 'N/A') . "\n";
            $alertMsg .= "  Fecha suscripción anterior: " . ($existingSubscriber['subscription_start'] ?? 'N/A') . "\n";
            $alertMsg .= "  Nuevo precio: $price USD\n";
            $alertMsg .= "  Es trial (price=0): " . ($price == 0 ? 'SÍ' : 'NO') . "\n";
            $alertMsg .= "  ---\n";
            file_put_contents($alertFile, $alertMsg, FILE_APPEND | LOCK_EX);
            
            file_put_contents($logFile, "⚠️ ALERT: Re-subscription detected for $email (previous status: $previousStatus)\n", FILE_APPEND | LOCK_EX);
        }
    }
    
    // Determine if this is a trial or paid subscription
    // Gumroad sends price even for trials (the price that will be charged after trial)
    // We detect trial by:
    // 1. Product name contains "trial"
    // 2. is_recurring_charge = false (first time) AND it's a subscription
    // 3. price = 0 (some configs)
    $productNameLower = strtolower($productName);
    $isTrial = ($price == 0) || 
               (strpos($productNameLower, 'trial') !== false && !$isRecurringCharge) ||
               (strpos($productNameLower, '7d') !== false && !$isRecurringCharge);
    
    // If it's a recurring charge (renewal), it's NOT a trial anymore
    if ($isRecurringCharge) {
        $isTrial = false;
    }
    
    $status = $isTrial ? 'trial' : 'active';
    
    file_put_contents($logFile, "Trial detection: productName='$productName', isRecurringCharge=" . ($isRecurringCharge ? 'true' : 'false') . ", price=$price, isTrial=" . ($isTrial ? 'YES' : 'NO') . "\n", FILE_APPEND | LOCK_EX);
    
    // Calculate subscription end date
    $subscriptionEnd = null;
    if ($isTrial) {
        // 7-day trial
        $subscriptionEnd = date('Y-m-d H:i:s', strtotime('+7 days'));
    } else {
        // Monthly subscription
        $subscriptionEnd = date('Y-m-d H:i:s', strtotime('+1 month'));
    }
    
    if ($existingSubscriber) {
        // Update existing subscriber
        file_put_contents($logFile, "Updating existing subscriber: $email\n", FILE_APPEND | LOCK_EX);
        
        $stmt = $db->prepare("
            UPDATE subscribers SET 
                status = ?,
                payment_type = 'gumroad',
                plan_type = ?,
                amount = ?,
                subscription_end = ?,
                last_payment_date = NOW(),
                next_payment_date = ?,
                user_id = COALESCE(?, user_id),
                name = COALESCE(?, name),
                gumroad_subscription_id = ?,
                gumroad_sale_id = ?,
                notes = CONCAT(COALESCE(notes, ''), ?),
                updated_at = NOW()
            WHERE LOWER(email) = ?
        ");
        
        $note = "\n[Gumroad payment: $timestamp, sale_id: $saleId, amount: $price USD]";
        
        $stmt->execute([
            $status,
            $recurrence,
            $price,
            $subscriptionEnd,
            $subscriptionEnd,
            $userId,
            $fullName ?: null,
            $subscriptionId,
            $saleId,
            $note,
            $email
        ]);
        
    } else {
        // Create new subscriber
        file_put_contents($logFile, "Creating new subscriber: $email\n", FILE_APPEND | LOCK_EX);
        
        $stmt = $db->prepare("
            INSERT INTO subscribers (
                email, name, status, payment_type, plan_type, amount,
                subscription_start, subscription_end, last_payment_date, next_payment_date,
                user_id, gumroad_subscription_id, gumroad_sale_id, notes, created_at, updated_at
            ) VALUES (
                ?, ?, ?, 'gumroad', ?, ?,
                NOW(), ?, NOW(), ?,
                ?, ?, ?, ?, NOW(), NOW()
            )
        ");
        
        $note = "[Gumroad signup: $timestamp, sale_id: $saleId]";
        
        $stmt->execute([
            $email,
            $fullName ?: null,
            $status,
            $recurrence,
            $price,
            $subscriptionEnd,
            $subscriptionEnd,
            $userId,
            $subscriptionId,
            $saleId,
            $note
        ]);
    }
    
    // Update user's subscribed status (column may not exist in all setups)
    if ($userId) {
        try {
            $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE id = ?");
            $stmt->execute([$userId]);
            file_put_contents($logFile, "Updated user $userId subscribed status to 1\n", FILE_APPEND | LOCK_EX);
        } catch (Exception $e) {
            // Column may not exist, that's ok
            file_put_contents($logFile, "Note: Could not update users.subscribed (column may not exist)\n", FILE_APPEND | LOCK_EX);
        }
    }
    
    file_put_contents($logFile, "SUCCESS: Subscriber $email processed (status: $status, trial: " . ($isTrial ? 'yes' : 'no') . ")\n", FILE_APPEND | LOCK_EX);
    
    // Send welcome email (optional - you can implement this later)
    // sendWelcomeEmail($email, $fullName, $isTrial);
    
} catch (Exception $e) {
    file_put_contents($logFile, "ERROR: " . $e->getMessage() . "\n", FILE_APPEND | LOCK_EX);
    file_put_contents($logFile, "Stack trace: " . $e->getTraceAsString() . "\n", FILE_APPEND | LOCK_EX);
}

echo "OK";


