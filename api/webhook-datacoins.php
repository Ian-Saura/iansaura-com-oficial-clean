<?php
/**
 * Webhook para procesar compras de DataCoins desde OneInfinite
 * 
 * Este endpoint recibe notificaciones de pago y acredita automáticamente
 * los DataCoins a la cuenta del usuario.
 */

header('Content-Type: application/json');

// Log para debugging
$logFile = __DIR__ . '/logs/datacoins-webhook.log';
function logWebhook($message) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $dir = dirname($logFile);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

try {
    require_once __DIR__ . '/secure-config.php';
    
    // Obtener el payload
    $rawPayload = file_get_contents('php://input');
    logWebhook("Webhook recibido: " . $rawPayload);
    
    if (empty($rawPayload)) {
        logWebhook("ERROR: Payload vacío");
        http_response_code(400);
        echo json_encode(['error' => 'Empty payload']);
        exit;
    }
    
    $payload = json_decode($rawPayload, true);
    if (!$payload) {
        logWebhook("ERROR: JSON inválido");
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }
    
    // Verificar que sea un evento de pago completado
    $eventType = $payload['event'] ?? $payload['type'] ?? '';
    logWebhook("Tipo de evento: $eventType");
    
    // OneInfinite puede enviar diferentes formatos
    $isPaymentComplete = in_array($eventType, [
        'payment.completed',
        'payment_intent.succeeded',
        'checkout.session.completed',
        'order.completed',
        'sale.completed'
    ]);
    
    // También verificar por status
    $status = $payload['data']['status'] ?? $payload['status'] ?? '';
    if ($status === 'completed' || $status === 'paid' || $status === 'succeeded') {
        $isPaymentComplete = true;
    }
    
    if (!$isPaymentComplete) {
        logWebhook("Evento ignorado: $eventType (status: $status)");
        echo json_encode(['status' => 'ignored', 'reason' => 'Not a payment completion event']);
        exit;
    }
    
    // Extraer información del pago
    $data = $payload['data'] ?? $payload;
    $customerEmail = $data['customer_email'] ?? $data['email'] ?? $data['buyer_email'] ?? 
                     $data['customer']['email'] ?? $data['payer']['email'] ?? null;
    $amount = $data['amount'] ?? $data['total'] ?? $data['price'] ?? 0;
    $productId = $data['product_id'] ?? $data['item_id'] ?? $data['sku'] ?? '';
    $productName = $data['product_name'] ?? $data['item_name'] ?? $data['description'] ?? '';
    $transactionId = $data['transaction_id'] ?? $data['payment_id'] ?? $data['id'] ?? uniqid();
    
    logWebhook("Email: $customerEmail, Amount: $amount, Product: $productId ($productName), Transaction: $transactionId");
    
    if (!$customerEmail) {
        logWebhook("ERROR: Email no encontrado en el payload");
        http_response_code(400);
        echo json_encode(['error' => 'Customer email not found']);
        exit;
    }
    
    // Determinar cuántos DataCoins acreditar basado en el monto o producto
    $coinsToAdd = 0;
    $bonusCoins = 0;
    
    // Mapeo de productos/montos a DataCoins
    $coinPackages = [
        // Por product ID
        'datacoins-500' => ['coins' => 500, 'bonus' => 50],
        'datacoins-1200' => ['coins' => 1200, 'bonus' => 300],
        'datacoins-2500' => ['coins' => 2500, 'bonus' => 750],
        // Por monto (en centavos o dólares)
        '10' => ['coins' => 500, 'bonus' => 50],
        '1000' => ['coins' => 500, 'bonus' => 50], // 10.00 en centavos
        '20' => ['coins' => 1200, 'bonus' => 300],
        '2000' => ['coins' => 1200, 'bonus' => 300], // 20.00 en centavos
        '30' => ['coins' => 2500, 'bonus' => 750],
        '3000' => ['coins' => 2500, 'bonus' => 750], // 30.00 en centavos
    ];
    
    // Buscar por product ID primero
    if (isset($coinPackages[$productId])) {
        $coinsToAdd = $coinPackages[$productId]['coins'];
        $bonusCoins = $coinPackages[$productId]['bonus'];
    } 
    // Buscar por nombre del producto
    elseif (stripos($productName, 'datacoin') !== false || stripos($productName, 'coin') !== false) {
        // Extraer número del nombre
        preg_match('/(\d+)/', $productName, $matches);
        if (!empty($matches[1])) {
            $coinsToAdd = (int)$matches[1];
            $bonusCoins = (int)($coinsToAdd * 0.1); // 10% bonus
        }
    }
    // Buscar por monto
    elseif (isset($coinPackages[(string)$amount])) {
        $coinsToAdd = $coinPackages[(string)$amount]['coins'];
        $bonusCoins = $coinPackages[(string)$amount]['bonus'];
    }
    // Fallback: calcular basado en monto ($1 = 50 coins)
    else {
        $amountUSD = $amount > 100 ? $amount / 100 : $amount; // Convertir centavos a dólares si es necesario
        $coinsToAdd = (int)($amountUSD * 50);
        $bonusCoins = (int)($coinsToAdd * 0.1);
    }
    
    $totalCoins = $coinsToAdd + $bonusCoins;
    logWebhook("Coins a acreditar: $coinsToAdd + $bonusCoins bonus = $totalCoins total");
    
    if ($totalCoins <= 0) {
        logWebhook("ERROR: No se pudo determinar cantidad de coins");
        http_response_code(400);
        echo json_encode(['error' => 'Could not determine coins amount']);
        exit;
    }
    
    // Conectar a la base de datos
    $db = getSecureDBConnection();
    
    // Verificar si la transacción ya fue procesada (evitar duplicados)
    $stmt = $db->prepare("SELECT id FROM datacoins_transactions WHERE transaction_id = ?");
    $stmt->execute([$transactionId]);
    if ($stmt->fetch()) {
        logWebhook("Transacción ya procesada: $transactionId");
        echo json_encode(['status' => 'already_processed', 'transaction_id' => $transactionId]);
        exit;
    }
    
    // Buscar o crear el usuario
    $stmt = $db->prepare("SELECT id, email FROM users WHERE email = ?");
    $stmt->execute([$customerEmail]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $userId = null;
    if ($user) {
        $userId = $user['id'];
        logWebhook("Usuario encontrado: ID $userId");
    } else {
        // Crear usuario básico si no existe
        $stmt = $db->prepare("INSERT INTO users (email, full_name, created_at, email_verified) VALUES (?, ?, NOW(), 1)");
        $stmt->execute([$customerEmail, 'DataCoins Customer']);
        $userId = $db->lastInsertId();
        logWebhook("Usuario creado: ID $userId");
    }
    
    // Registrar la transacción
    $stmt = $db->prepare("
        INSERT INTO datacoins_transactions 
        (user_id, email, transaction_id, amount_usd, coins_base, coins_bonus, coins_total, product_id, product_name, raw_payload, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
    ");
    $stmt->execute([
        $userId,
        $customerEmail,
        $transactionId,
        $amount > 100 ? $amount / 100 : $amount,
        $coinsToAdd,
        $bonusCoins,
        $totalCoins,
        $productId,
        $productName,
        $rawPayload
    ]);
    logWebhook("Transacción registrada");
    
    // Actualizar el balance de DataCoins del usuario en user_progress
    // La tabla user_progress tiene columnas: email, completed_steps, completed_projects, watched_videos, datacoins, etc.
    
    // Verificar estructura de la tabla
    $tableExists = false;
    $hasDatacoinsColumn = false;
    
    try {
        $checkTable = $db->query("SHOW TABLES LIKE 'user_progress'");
        $tableExists = $checkTable->rowCount() > 0;
        
        if ($tableExists) {
            $checkColumn = $db->query("SHOW COLUMNS FROM user_progress LIKE 'datacoins'");
            $hasDatacoinsColumn = $checkColumn->rowCount() > 0;
        }
    } catch (Exception $e) {
        logWebhook("Error verificando tabla: " . $e->getMessage());
    }
    
    // Si no existe la columna datacoins, crearla
    if ($tableExists && !$hasDatacoinsColumn) {
        try {
            $db->exec("ALTER TABLE user_progress ADD COLUMN datacoins INT DEFAULT 0");
            $db->exec("ALTER TABLE user_progress ADD COLUMN coins_purchased INT DEFAULT 0");
            logWebhook("Columnas datacoins y coins_purchased agregadas a user_progress");
            $hasDatacoinsColumn = true;
        } catch (Exception $e) {
            logWebhook("Error agregando columnas: " . $e->getMessage());
        }
    }
    
    if ($tableExists && $hasDatacoinsColumn) {
        // Verificar si existe registro para este email
        $stmt = $db->prepare("SELECT id, datacoins, coins_purchased FROM user_progress WHERE email = ?");
        $stmt->execute([$customerEmail]);
        $progressRecord = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($progressRecord) {
            // Actualizar el balance existente
            $currentCoins = (int)($progressRecord['datacoins'] ?? 0);
            $newCoins = $currentCoins + $totalCoins;
            $currentPurchased = (int)($progressRecord['coins_purchased'] ?? 0);
            
            $stmt = $db->prepare("UPDATE user_progress SET datacoins = ?, coins_purchased = ?, last_activity = NOW() WHERE email = ?");
            $stmt->execute([$newCoins, $currentPurchased + $totalCoins, $customerEmail]);
            logWebhook("Balance actualizado: $currentCoins + $totalCoins = $newCoins");
        } else {
            // Crear nuevo registro de progreso
            $stmt = $db->prepare("INSERT INTO user_progress (email, completed_steps, completed_projects, watched_videos, datacoins, coins_purchased, last_activity) VALUES (?, 0, 0, 0, ?, ?, NOW())");
            $stmt->execute([$customerEmail, $totalCoins, $totalCoins]);
            logWebhook("Nuevo registro de progreso creado con $totalCoins coins");
        }
    } else {
        logWebhook("ADVERTENCIA: No se pudo actualizar user_progress (tabla: $tableExists, columna: $hasDatacoinsColumn)");
        // Aun así, la transacción fue registrada en datacoins_transactions
    }
    
    // Enviar email de confirmación
    try {
        $credentials = include __DIR__ . '/.db-credentials.php';
        $smtpUser = $credentials['SMTP_USER'] ?? '';
        $smtpPass = $credentials['SMTP_PASSWORD'] ?? '';
        
        if ($smtpUser && $smtpPass) {
            $to = $customerEmail;
            $subject = "🎉 ¡Tus DataCoins ya están disponibles!";
            $message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f59e0b, #ea580c); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
        .coins-box { background: linear-gradient(135deg, #fef3c7, #fde68a); padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .coins-amount { font-size: 48px; font-weight: bold; color: #b45309; }
        .bonus { color: #059669; font-weight: bold; }
        .button { display: inline-block; background: #3b82f6; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>💎 ¡Gracias por tu compra!</h1>
        </div>
        <div class='content'>
            <p>¡Hola!</p>
            <p>Tu compra de DataCoins fue procesada exitosamente. Ya están disponibles en tu cuenta.</p>
            
            <div class='coins-box'>
                <div class='coins-amount'>$totalCoins 💎</div>
                <p>DataCoins acreditados</p>
                <p class='bonus'>($coinsToAdd base + $bonusCoins bonus)</p>
            </div>
            
            <p>Ahora podés usar tus DataCoins para:</p>
            <ul>
                <li>🐍 Desbloquear avatares exclusivos</li>
                <li>🏆 Obtener badges únicos</li>
                <li>👑 Conseguir títulos especiales</li>
            </ul>
            
            <center>
                <a href='https://iansaura.com/members' class='button'>Ir a la Tienda 🛒</a>
            </center>
            
            <p>¡Gracias por ser parte de la comunidad!</p>
            <p>— Ian Saura</p>
        </div>
        <div class='footer'>
            <p>Data Engineering Academy by Ian Saura</p>
            <p>Este email fue enviado automáticamente. Si tenés dudas, escribinos a info@iansaura.com</p>
        </div>
    </div>
</body>
</html>
";
            
            $headers = [
                'MIME-Version: 1.0',
                'Content-type: text/html; charset=UTF-8',
                'From: Ian Saura <info@iansaura.com>',
                'Reply-To: info@iansaura.com',
            ];
            
            mail($to, $subject, $message, implode("\r\n", $headers));
            logWebhook("Email de confirmación enviado a $customerEmail");
        }
    } catch (Exception $e) {
        logWebhook("Error enviando email: " . $e->getMessage());
    }
    
    // Respuesta exitosa
    logWebhook("✅ Proceso completado exitosamente");
    echo json_encode([
        'success' => true,
        'message' => 'DataCoins credited successfully',
        'email' => $customerEmail,
        'coins_credited' => $totalCoins,
        'transaction_id' => $transactionId
    ]);
    
} catch (Exception $e) {
    logWebhook("ERROR FATAL: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error', 'message' => $e->getMessage()]);
}
?>