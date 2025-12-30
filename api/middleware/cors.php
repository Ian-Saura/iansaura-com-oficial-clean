<?php
/**
 * Centralized CORS Middleware
 * Restricts Access-Control-Allow-Origin to only allowed domains
 * 
 * Usage:
 *   require_once __DIR__ . '/middleware/cors.php';
 *   applyCors(); // At the top of each endpoint
 */

/**
 * Apply restrictive CORS headers
 * Only allows requests from iansaura.com domains
 */
function applyCors() {
    // Allowed origins - ONLY your domains
    $allowedOrigins = [
        'https://iansaura.com',
        'https://www.iansaura.com',
    ];
    
    // Allow localhost in development
    if (isLocalDevelopment()) {
        $allowedOrigins[] = 'http://localhost:3000';
        $allowedOrigins[] = 'http://localhost:3001';
        $allowedOrigins[] = 'http://127.0.0.1:3000';
        $allowedOrigins[] = 'http://127.0.0.1:3001';
    }
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    // Check if origin is allowed
    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
    } elseif (empty($origin)) {
        // No origin header (same-origin request or server-to-server)
        // Allow but don't set CORS headers
    } else {
        // Origin not allowed - still set headers for proper CORS rejection
        // Browser will block the response
        header("Access-Control-Allow-Origin: https://iansaura.com");
    }
    
    // Standard CORS headers
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 86400'); // Cache preflight for 24 hours
    
    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit();
    }
}

/**
 * Check if running in local development
 */
function isLocalDevelopment() {
    $host = $_SERVER['HTTP_HOST'] ?? '';
    $serverAddr = $_SERVER['SERVER_ADDR'] ?? '';
    
    return (
        strpos($host, 'localhost') !== false ||
        strpos($host, '127.0.0.1') !== false ||
        $serverAddr === '127.0.0.1' ||
        $serverAddr === '::1' ||
        (isset($_SERVER['APP_ENV']) && $_SERVER['APP_ENV'] === 'development')
    );
}

/**
 * Apply CORS for public APIs (datasets, etc.)
 * Slightly more permissive but still secure
 */
function applyCorsPublicApi() {
    $allowedOrigins = [
        'https://iansaura.com',
        'https://www.iansaura.com',
    ];
    
    if (isLocalDevelopment()) {
        $allowedOrigins[] = 'http://localhost:3000';
        $allowedOrigins[] = 'http://localhost:3001';
    }
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
    }
    
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit();
    }
}

/**
 * Apply CORS for webhooks (external services like Gumroad, OneInfinite)
 * These need to accept requests from external domains
 */
function applyCorsWebhook() {
    // Webhooks come from external services, so we need to allow them
    // But we verify the request via signatures/tokens instead
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, X-Gumroad-Signature, X-Webhook-Secret');
    
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit();
    }
}

