<?php
/**
 * Event Tracking API
 * Tracks user events for analytics
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
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

require_once 'secure-config.php';

try {
    $pdo = getSecureDBConnection();
    
    // Ensure table exists
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS subscription_events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            event_type VARCHAR(50) NOT NULL,
            email VARCHAR(255),
            user_agent TEXT,
            ip_address VARCHAR(45),
            referrer TEXT,
            page_url TEXT,
            metadata JSON,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_event_type (event_type),
            INDEX idx_created_at (created_at),
            INDEX idx_email (email)
        )
    ");
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $eventType = $input['event_type'] ?? '';
    $email = $input['email'] ?? null;
    $pageUrl = $input['page_url'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    $metadata = $input['metadata'] ?? [];
    
    if (empty($eventType)) {
        echo json_encode(['error' => 'event_type required']);
        exit();
    }
    
    // Valid event types
    $validEvents = [
        'subscribe_click',      // Click en botón de suscribirse
        'subscribe_page_view',  // Vista de página de suscripción
        'trial_start',          // Inicio de trial
        'trial_end',            // Fin de trial
        'payment_start',        // Inicio de pago
        'payment_complete',     // Pago completado
        'level0_start',         // Empezó nivel 0
        'level0_complete',      // Completó nivel 0
        'level1_start',         // Empezó nivel 1
        'video_watch',          // Vio un video
        'project_complete',     // Completó proyecto
        'discord_click',        // Click en Discord
        'login',                // Login
        'signup',               // Registro
    ];
    
    if (!in_array($eventType, $validEvents)) {
        echo json_encode(['error' => 'Invalid event type', 'valid_types' => $validEvents]);
        exit();
    }
    
    $stmt = $pdo->prepare("
        INSERT INTO subscription_events (event_type, email, user_agent, ip_address, referrer, page_url, metadata)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $eventType,
        $email,
        $_SERVER['HTTP_USER_AGENT'] ?? '',
        $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? '',
        $_SERVER['HTTP_REFERER'] ?? '',
        $pageUrl,
        json_encode($metadata)
    ]);
    
    echo json_encode(['success' => true, 'event_id' => $pdo->lastInsertId()]);
    
} catch (Exception $e) {
    error_log("Track event error: " . $e->getMessage());
    echo json_encode(['error' => 'Server error']);
}
