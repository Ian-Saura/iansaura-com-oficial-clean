<?php
/**
 * Global Rate Limiter Middleware
 * Include this at the top of any PHP endpoint to add rate limiting
 * 
 * Usage:
 *   require_once __DIR__ . '/middleware/rate-limiter.php';
 *   applyRateLimit('endpoint_name', 60, 60); // 60 requests per 60 seconds
 */

/**
 * Apply rate limiting to current request
 * 
 * @param string $endpoint Unique identifier for this endpoint
 * @param int $maxRequests Maximum requests allowed in the window
 * @param int $windowSeconds Time window in seconds
 * @param bool $byUser If true, rate limit by user email instead of IP
 * @return bool True if request is allowed, exits with 429 if rate limited
 */
function applyRateLimit($endpoint = 'default', $maxRequests = 60, $windowSeconds = 60, $byUser = false) {
    // Get identifier (IP or user email)
    $identifier = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    
    if ($byUser) {
        // Try to get email from request
        $email = $_GET['email'] ?? $_POST['email'] ?? null;
        if (!$email) {
            $input = json_decode(file_get_contents('php://input'), true);
            $email = $input['email'] ?? null;
        }
        if ($email) {
            $identifier = strtolower(trim($email));
        }
    }
    
    // Create unique key for this endpoint + identifier
    $key = md5($endpoint . '_' . $identifier);
    $rateLimitDir = sys_get_temp_dir() . '/rate_limits';
    
    // Ensure directory exists
    if (!is_dir($rateLimitDir)) {
        @mkdir($rateLimitDir, 0755, true);
    }
    
    $rateLimitFile = $rateLimitDir . '/' . $key . '.json';
    $now = time();
    $requests = [];
    
    // Load existing requests
    if (file_exists($rateLimitFile)) {
        $data = @json_decode(file_get_contents($rateLimitFile), true);
        if (is_array($data)) {
            // Filter to only requests within the window
            $requests = array_filter($data, function($timestamp) use ($now, $windowSeconds) {
                return ($now - $timestamp) < $windowSeconds;
            });
        }
    }
    
    // Check if rate limit exceeded
    if (count($requests) >= $maxRequests) {
        $retryAfter = $windowSeconds - ($now - min($requests));
        
        http_response_code(429);
        header('Content-Type: application/json');
        header('Retry-After: ' . max(1, $retryAfter));
        header('X-RateLimit-Limit: ' . $maxRequests);
        header('X-RateLimit-Remaining: 0');
        header('X-RateLimit-Reset: ' . ($now + $retryAfter));
        
        echo json_encode([
            'success' => false,
            'error' => 'Rate limit exceeded. Please try again later.',
            'error_es' => 'Demasiadas solicitudes. Por favor espera un momento.',
            'retry_after' => max(1, $retryAfter)
        ]);
        exit;
    }
    
    // Add current request
    $requests[] = $now;
    
    // Save updated requests
    @file_put_contents($rateLimitFile, json_encode(array_values($requests)), LOCK_EX);
    
    // Set rate limit headers
    header('X-RateLimit-Limit: ' . $maxRequests);
    header('X-RateLimit-Remaining: ' . ($maxRequests - count($requests)));
    header('X-RateLimit-Reset: ' . ($now + $windowSeconds));
    
    return true;
}

/**
 * Rate limit presets for common scenarios
 */
class RateLimits {
    // Public endpoints - generous limits
    const PUBLIC_READ = ['requests' => 100, 'window' => 60];      // 100/min
    const PUBLIC_WRITE = ['requests' => 20, 'window' => 60];      // 20/min
    
    // Authenticated endpoints
    const AUTH_READ = ['requests' => 200, 'window' => 60];        // 200/min
    const AUTH_WRITE = ['requests' => 60, 'window' => 60];        // 60/min
    
    // Sensitive endpoints
    const LOGIN = ['requests' => 10, 'window' => 300];            // 10 per 5 min
    const PASSWORD_RESET = ['requests' => 5, 'window' => 300];    // 5 per 5 min
    const PAYMENT = ['requests' => 10, 'window' => 60];           // 10/min
    
    // Heavy endpoints
    const LEADERBOARD = ['requests' => 30, 'window' => 60];       // 30/min
    const ANALYTICS = ['requests' => 20, 'window' => 60];         // 20/min
    const DATASET_GENERATE = ['requests' => 100, 'window' => 3600]; // 100/hour
    
    // Webhooks (need to be generous)
    const WEBHOOK = ['requests' => 100, 'window' => 60];          // 100/min
}

/**
 * Clean up old rate limit files (call periodically)
 */
function cleanupRateLimitFiles($maxAgeSeconds = 3600) {
    $rateLimitDir = sys_get_temp_dir() . '/rate_limits';
    if (!is_dir($rateLimitDir)) return;
    
    $now = time();
    $files = glob($rateLimitDir . '/*.json');
    $cleaned = 0;
    
    foreach ($files as $file) {
        if (($now - filemtime($file)) > $maxAgeSeconds) {
            @unlink($file);
            $cleaned++;
        }
    }
    
    return $cleaned;
}

