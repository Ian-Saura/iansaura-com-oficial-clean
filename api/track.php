<?php
/**
 * Tracking Endpoint - Lightweight version
 * Just accepts tracking data and returns success
 * Actual logging is optional and non-blocking
 */

// Set headers first
header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => true]);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Always return success - tracking should never block the user experience
echo json_encode(['success' => true]);
exit;
?> 