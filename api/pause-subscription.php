<?php
/**
 * Pause/Resume Subscription
 * Allows users to temporarily pause their subscription instead of cancelling
 * Note: Gumroad doesn't have a native pause feature, so we handle it locally
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
    $action = $input['action'] ?? 'pause'; // 'pause' or 'resume'
    $pauseDays = intval($input['pause_days'] ?? 30); // Default 30 days pause
    $reason = $input['reason'] ?? '';
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit();
    }
    
    if (!in_array($action, ['pause', 'resume'])) {
        echo json_encode(['success' => false, 'error' => 'Acción inválida. Use "pause" o "resume"']);
        exit();
    }
    
    // Limit pause to 90 days max
    $pauseDays = min($pauseDays, 90);
    
    $db = getSecureDBConnection();
    
    // Get current subscription
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$subscriber) {
        echo json_encode(['success' => false, 'error' => 'No se encontró suscripción']);
        exit();
    }
    
    if ($action === 'pause') {
        // Check if already paused
        if ($subscriber['status'] === 'paused') {
            echo json_encode(['success' => false, 'error' => 'La suscripción ya está pausada']);
            exit();
        }
        
        // Check if active or trial
        if (!in_array($subscriber['status'], ['active', 'trial'])) {
            echo json_encode(['success' => false, 'error' => 'Solo se pueden pausar suscripciones activas']);
            exit();
        }
        
        // Calculate pause end date
        $pauseEndDate = date('Y-m-d H:i:s', strtotime("+{$pauseDays} days"));
        
        // Store original end date and status for resume
        $originalData = json_encode([
            'original_status' => $subscriber['status'],
            'original_end' => $subscriber['subscription_end'],
            'paused_at' => date('Y-m-d H:i:s'),
            'pause_reason' => $reason
        ]);
        
        // Update subscription to paused
        $stmt = $db->prepare("
            UPDATE subscribers 
            SET status = 'paused',
                paused_data = ?,
                notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Pausado por ', ? , ' días. Razón: ', ?)
            WHERE email = ?
        ");
        $stmt->execute([$originalData, $pauseDays, $reason ?: 'No especificada', $email]);
        
        // Update users table - remove access during pause
        $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE email = ?");
        $stmt->execute([$email]);
        
        error_log("⏸️ Subscription paused: {$email} for {$pauseDays} days - Reason: {$reason}");
        
        // Notify admin
        $adminEmail = 'iansauradata@gmail.com';
        $subject = "⏸️ Suscripción pausada: {$email}";
        $message = "El usuario {$email} pausó su suscripción por {$pauseDays} días.\n\nRazón: " . ($reason ?: 'No especificada');
        @mail($adminEmail, $subject, $message);
        
        echo json_encode([
            'success' => true,
            'message' => "Suscripción pausada por {$pauseDays} días",
            'pause_ends' => $pauseEndDate
        ]);
        
    } else {
        // Resume subscription
        if ($subscriber['status'] !== 'paused') {
            echo json_encode(['success' => false, 'error' => 'La suscripción no está pausada']);
            exit();
        }
        
        // Get original data
        $pausedData = json_decode($subscriber['paused_data'] ?? '{}', true);
        $originalStatus = $pausedData['original_status'] ?? 'active';
        $originalEnd = $pausedData['original_end'] ?? null;
        $pausedAt = $pausedData['paused_at'] ?? null;
        
        // Calculate new end date (add paused days to original end)
        $newEndDate = $originalEnd;
        if ($originalEnd && $pausedAt) {
            $pausedDays = ceil((time() - strtotime($pausedAt)) / 86400);
            $newEndDate = date('Y-m-d H:i:s', strtotime($originalEnd) + ($pausedDays * 86400));
        }
        
        // Resume subscription
        $stmt = $db->prepare("
            UPDATE subscribers 
            SET status = ?,
                subscription_end = ?,
                paused_data = NULL,
                notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Reanudado. Nuevo vencimiento: ', ?)
            WHERE email = ?
        ");
        $stmt->execute([$originalStatus, $newEndDate, $newEndDate, $email]);
        
        // Restore access
        $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE email = ?");
        $stmt->execute([$email]);
        
        error_log("▶️ Subscription resumed: {$email}");
        
        echo json_encode([
            'success' => true,
            'message' => 'Suscripción reanudada',
            'new_end_date' => $newEndDate
        ]);
    }
    
} catch (Exception $e) {
    error_log("Pause subscription error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error del servidor']);
}


/**
 * Pause/Resume Subscription
 * Allows users to temporarily pause their subscription instead of cancelling
 * Note: Gumroad doesn't have a native pause feature, so we handle it locally
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
    $action = $input['action'] ?? 'pause'; // 'pause' or 'resume'
    $pauseDays = intval($input['pause_days'] ?? 30); // Default 30 days pause
    $reason = $input['reason'] ?? '';
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit();
    }
    
    if (!in_array($action, ['pause', 'resume'])) {
        echo json_encode(['success' => false, 'error' => 'Acción inválida. Use "pause" o "resume"']);
        exit();
    }
    
    // Limit pause to 90 days max
    $pauseDays = min($pauseDays, 90);
    
    $db = getSecureDBConnection();
    
    // Get current subscription
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$subscriber) {
        echo json_encode(['success' => false, 'error' => 'No se encontró suscripción']);
        exit();
    }
    
    if ($action === 'pause') {
        // Check if already paused
        if ($subscriber['status'] === 'paused') {
            echo json_encode(['success' => false, 'error' => 'La suscripción ya está pausada']);
            exit();
        }
        
        // Check if active or trial
        if (!in_array($subscriber['status'], ['active', 'trial'])) {
            echo json_encode(['success' => false, 'error' => 'Solo se pueden pausar suscripciones activas']);
            exit();
        }
        
        // Calculate pause end date
        $pauseEndDate = date('Y-m-d H:i:s', strtotime("+{$pauseDays} days"));
        
        // Store original end date and status for resume
        $originalData = json_encode([
            'original_status' => $subscriber['status'],
            'original_end' => $subscriber['subscription_end'],
            'paused_at' => date('Y-m-d H:i:s'),
            'pause_reason' => $reason
        ]);
        
        // Update subscription to paused
        $stmt = $db->prepare("
            UPDATE subscribers 
            SET status = 'paused',
                paused_data = ?,
                notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Pausado por ', ? , ' días. Razón: ', ?)
            WHERE email = ?
        ");
        $stmt->execute([$originalData, $pauseDays, $reason ?: 'No especificada', $email]);
        
        // Update users table - remove access during pause
        $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE email = ?");
        $stmt->execute([$email]);
        
        error_log("⏸️ Subscription paused: {$email} for {$pauseDays} days - Reason: {$reason}");
        
        // Notify admin
        $adminEmail = 'iansauradata@gmail.com';
        $subject = "⏸️ Suscripción pausada: {$email}";
        $message = "El usuario {$email} pausó su suscripción por {$pauseDays} días.\n\nRazón: " . ($reason ?: 'No especificada');
        @mail($adminEmail, $subject, $message);
        
        echo json_encode([
            'success' => true,
            'message' => "Suscripción pausada por {$pauseDays} días",
            'pause_ends' => $pauseEndDate
        ]);
        
    } else {
        // Resume subscription
        if ($subscriber['status'] !== 'paused') {
            echo json_encode(['success' => false, 'error' => 'La suscripción no está pausada']);
            exit();
        }
        
        // Get original data
        $pausedData = json_decode($subscriber['paused_data'] ?? '{}', true);
        $originalStatus = $pausedData['original_status'] ?? 'active';
        $originalEnd = $pausedData['original_end'] ?? null;
        $pausedAt = $pausedData['paused_at'] ?? null;
        
        // Calculate new end date (add paused days to original end)
        $newEndDate = $originalEnd;
        if ($originalEnd && $pausedAt) {
            $pausedDays = ceil((time() - strtotime($pausedAt)) / 86400);
            $newEndDate = date('Y-m-d H:i:s', strtotime($originalEnd) + ($pausedDays * 86400));
        }
        
        // Resume subscription
        $stmt = $db->prepare("
            UPDATE subscribers 
            SET status = ?,
                subscription_end = ?,
                paused_data = NULL,
                notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Reanudado. Nuevo vencimiento: ', ?)
            WHERE email = ?
        ");
        $stmt->execute([$originalStatus, $newEndDate, $newEndDate, $email]);
        
        // Restore access
        $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE email = ?");
        $stmt->execute([$email]);
        
        error_log("▶️ Subscription resumed: {$email}");
        
        echo json_encode([
            'success' => true,
            'message' => 'Suscripción reanudada',
            'new_end_date' => $newEndDate
        ]);
    }
    
} catch (Exception $e) {
    error_log("Pause subscription error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error del servidor']);
}


/**
 * Pause/Resume Subscription
 * Allows users to temporarily pause their subscription instead of cancelling
 * Note: Gumroad doesn't have a native pause feature, so we handle it locally
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
    $action = $input['action'] ?? 'pause'; // 'pause' or 'resume'
    $pauseDays = intval($input['pause_days'] ?? 30); // Default 30 days pause
    $reason = $input['reason'] ?? '';
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit();
    }
    
    if (!in_array($action, ['pause', 'resume'])) {
        echo json_encode(['success' => false, 'error' => 'Acción inválida. Use "pause" o "resume"']);
        exit();
    }
    
    // Limit pause to 90 days max
    $pauseDays = min($pauseDays, 90);
    
    $db = getSecureDBConnection();
    
    // Get current subscription
    $stmt = $db->prepare("SELECT * FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$subscriber) {
        echo json_encode(['success' => false, 'error' => 'No se encontró suscripción']);
        exit();
    }
    
    if ($action === 'pause') {
        // Check if already paused
        if ($subscriber['status'] === 'paused') {
            echo json_encode(['success' => false, 'error' => 'La suscripción ya está pausada']);
            exit();
        }
        
        // Check if active or trial
        if (!in_array($subscriber['status'], ['active', 'trial'])) {
            echo json_encode(['success' => false, 'error' => 'Solo se pueden pausar suscripciones activas']);
            exit();
        }
        
        // Calculate pause end date
        $pauseEndDate = date('Y-m-d H:i:s', strtotime("+{$pauseDays} days"));
        
        // Store original end date and status for resume
        $originalData = json_encode([
            'original_status' => $subscriber['status'],
            'original_end' => $subscriber['subscription_end'],
            'paused_at' => date('Y-m-d H:i:s'),
            'pause_reason' => $reason
        ]);
        
        // Update subscription to paused
        $stmt = $db->prepare("
            UPDATE subscribers 
            SET status = 'paused',
                paused_data = ?,
                notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Pausado por ', ? , ' días. Razón: ', ?)
            WHERE email = ?
        ");
        $stmt->execute([$originalData, $pauseDays, $reason ?: 'No especificada', $email]);
        
        // Update users table - remove access during pause
        $stmt = $db->prepare("UPDATE users SET subscribed = 0 WHERE email = ?");
        $stmt->execute([$email]);
        
        error_log("⏸️ Subscription paused: {$email} for {$pauseDays} days - Reason: {$reason}");
        
        // Notify admin
        $adminEmail = 'iansauradata@gmail.com';
        $subject = "⏸️ Suscripción pausada: {$email}";
        $message = "El usuario {$email} pausó su suscripción por {$pauseDays} días.\n\nRazón: " . ($reason ?: 'No especificada');
        @mail($adminEmail, $subject, $message);
        
        echo json_encode([
            'success' => true,
            'message' => "Suscripción pausada por {$pauseDays} días",
            'pause_ends' => $pauseEndDate
        ]);
        
    } else {
        // Resume subscription
        if ($subscriber['status'] !== 'paused') {
            echo json_encode(['success' => false, 'error' => 'La suscripción no está pausada']);
            exit();
        }
        
        // Get original data
        $pausedData = json_decode($subscriber['paused_data'] ?? '{}', true);
        $originalStatus = $pausedData['original_status'] ?? 'active';
        $originalEnd = $pausedData['original_end'] ?? null;
        $pausedAt = $pausedData['paused_at'] ?? null;
        
        // Calculate new end date (add paused days to original end)
        $newEndDate = $originalEnd;
        if ($originalEnd && $pausedAt) {
            $pausedDays = ceil((time() - strtotime($pausedAt)) / 86400);
            $newEndDate = date('Y-m-d H:i:s', strtotime($originalEnd) + ($pausedDays * 86400));
        }
        
        // Resume subscription
        $stmt = $db->prepare("
            UPDATE subscribers 
            SET status = ?,
                subscription_end = ?,
                paused_data = NULL,
                notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Reanudado. Nuevo vencimiento: ', ?)
            WHERE email = ?
        ");
        $stmt->execute([$originalStatus, $newEndDate, $newEndDate, $email]);
        
        // Restore access
        $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE email = ?");
        $stmt->execute([$email]);
        
        error_log("▶️ Subscription resumed: {$email}");
        
        echo json_encode([
            'success' => true,
            'message' => 'Suscripción reanudada',
            'new_end_date' => $newEndDate
        ]);
    }
    
} catch (Exception $e) {
    error_log("Pause subscription error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error del servidor']);
}



