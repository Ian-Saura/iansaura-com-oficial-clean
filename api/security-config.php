<?php
/**
 * Security Configuration
 * Centralized security settings for all API endpoints
 */

// ============================================
// ENVIRONMENT DETECTION
// ============================================
define('IS_PRODUCTION', strpos($_SERVER['HTTP_HOST'] ?? '', 'iansaura.com') !== false);

// ============================================
// ERROR HANDLING
// ============================================
if (IS_PRODUCTION) {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
} else {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}

// ============================================
// CORS - Strict Origin Validation
// ============================================
function setSecureCors() {
    $allowedOrigins = [
        'https://iansaura.com',
        'https://www.iansaura.com',
    ];
    
    // Allow localhost in development
    if (!IS_PRODUCTION) {
        $allowedOrigins[] = 'http://localhost:3000';
        $allowedOrigins[] = 'http://localhost:3001';
    }
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    
    if (in_array($origin, $allowedOrigins)) {
        header("Access-Control-Allow-Origin: $origin");
        header("Access-Control-Allow-Credentials: true");
    }
    
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
}

// ============================================
// ADMIN AUTHENTICATION
// ============================================
function validateAdminAccess($key = null) {
    $key = $key ?? ($_GET['key'] ?? $_POST['key'] ?? '');
    
    $adminEmails = [
        'sauraiansaura@gmail.com',
        'ian@iansaura.com'
    ];
    
    foreach ($adminEmails as $email) {
        $expectedKey = generateDynamicAdminKey($email);
        if ($key === $expectedKey) {
            return ['valid' => true, 'email' => $email];
        }
    }
    
    return ['valid' => false, 'email' => null];
}

function generateDynamicAdminKey($email) {
    $today = gmdate('Y-m-d');
    $base = "{$email}_{$today}_iansaura_admin_2024";
    $hash = 0;
    for ($i = 0; $i < strlen($base); $i++) {
        $hash = (($hash << 5) - $hash) + ord($base[$i]);
        $hash = $hash & 0xFFFFFFFF;
    }
    return 'adm_' . dechex(abs($hash) % 0xFFFFFF) . '_' . str_replace('-', '', $today);
}

// ============================================
// INPUT SANITIZATION
// ============================================
function sanitizeEmail($email) {
    $email = filter_var(trim(strtolower($email)), FILTER_SANITIZE_EMAIL);
    return filter_var($email, FILTER_VALIDATE_EMAIL) ? $email : null;
}

function sanitizeString($str, $maxLength = 255) {
    $str = trim($str);
    $str = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    return substr($str, 0, $maxLength);
}

function sanitizeInt($val, $min = 0, $max = PHP_INT_MAX) {
    $val = filter_var($val, FILTER_VALIDATE_INT);
    if ($val === false) return $min;
    return max($min, min($max, $val));
}

// ============================================
// RATE LIMITING (Enhanced)
// ============================================
function checkRateLimit($identifier, $endpoint, $maxRequests = 60, $windowSeconds = 60) {
    $key = md5($identifier . '_' . $endpoint);
    $file = sys_get_temp_dir() . "/rate_limit_{$key}";
    $now = time();
    $requests = [];
    
    if (file_exists($file)) {
        $data = @json_decode(file_get_contents($file), true);
        if (is_array($data)) {
            $requests = array_filter($data, fn($t) => ($now - $t) < $windowSeconds);
        }
    }
    
    if (count($requests) >= $maxRequests) {
        http_response_code(429);
        header('Retry-After: ' . $windowSeconds);
        return false;
    }
    
    $requests[] = $now;
    @file_put_contents($file, json_encode(array_values($requests)), LOCK_EX);
    return true;
}

// ============================================
// SECURE JSON RESPONSE
// ============================================
function jsonResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function errorResponse($message, $statusCode = 400) {
    jsonResponse(['success' => false, 'error' => $message], $statusCode);
}

// ============================================
// SMTP CREDENTIALS (from environment)
// ============================================
function getSmtpCredentials() {
    return [
        'host' => getenv('SMTP_HOST') ?: 'c2621673.ferozo.com',
        'port' => (int)(getenv('SMTP_PORT') ?: 465),
        'username' => getenv('SMTP_USER') ?: 'info@iansaura.com',
        'password' => getenv('SMTP_PASSWORD') ?: '' // MUST be set in environment
    ];
}

