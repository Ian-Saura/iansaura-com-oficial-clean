<?php
/**
 * Get Potential Buyers
 * Returns free users who have been active recently
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive

require_once 'secure-config.php';

// Simple security - only allow from command line or with secret key
$key = $_GET['key'] ?? '';
$expectedKey = 'earlybird2024';

if (php_sapi_name() !== 'cli' && $key !== $expectedKey) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $db = getSecureDBConnection();
    
    // Get users who:
    // 1. Are registered (in users table)
    // 2. Are NOT in subscribers table OR have expired/cancelled subscription
    // 3. Have activity in the last 7 days (based on user_progress table)
    
    $query = "
        SELECT DISTINCT 
            u.email,
            u.name,
            u.created_at as registered_at,
            up.updated_at as last_activity,
            COALESCE(s.status, 'none') as subscription_status,
            COALESCE(s.payment_type, 'none') as payment_type
        FROM users u
        LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
        LEFT JOIN user_progress up ON LOWER(u.email) = LOWER(up.email)
        WHERE 
            -- Not currently subscribed
            (s.id IS NULL OR s.status NOT IN ('active', 'trial'))
            -- Has some activity
            AND up.updated_at IS NOT NULL
            AND up.updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY up.updated_at DESC
    ";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Also get users who registered recently but may not have progress yet
    $query2 = "
        SELECT DISTINCT 
            u.email,
            u.name,
            u.created_at as registered_at,
            u.created_at as last_activity,
            COALESCE(s.status, 'none') as subscription_status,
            COALESCE(s.payment_type, 'none') as payment_type
        FROM users u
        LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
        WHERE 
            -- Not currently subscribed
            (s.id IS NULL OR s.status NOT IN ('active', 'trial'))
            -- Registered in last 7 days
            AND u.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY u.created_at DESC
    ";
    
    $stmt2 = $db->prepare($query2);
    $stmt2->execute();
    $recentUsers = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    
    // Merge and deduplicate
    $allEmails = [];
    $result = [];
    
    foreach ($users as $user) {
        $email = strtolower($user['email']);
        if (!in_array($email, $allEmails)) {
            $allEmails[] = $email;
            $result[] = $user;
        }
    }
    
    foreach ($recentUsers as $user) {
        $email = strtolower($user['email']);
        if (!in_array($email, $allEmails)) {
            $allEmails[] = $email;
            $result[] = $user;
        }
    }
    
    echo json_encode([
        'success' => true,
        'count' => count($result),
        'users' => $result,
        'emails_list' => implode(', ', $allEmails)
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

/**
 * Get Potential Buyers
 * Returns free users who have been active recently
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive

require_once 'secure-config.php';

// Simple security - only allow from command line or with secret key
$key = $_GET['key'] ?? '';
$expectedKey = 'earlybird2024';

if (php_sapi_name() !== 'cli' && $key !== $expectedKey) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $db = getSecureDBConnection();
    
    // Get users who:
    // 1. Are registered (in users table)
    // 2. Are NOT in subscribers table OR have expired/cancelled subscription
    // 3. Have activity in the last 7 days (based on user_progress table)
    
    $query = "
        SELECT DISTINCT 
            u.email,
            u.name,
            u.created_at as registered_at,
            up.updated_at as last_activity,
            COALESCE(s.status, 'none') as subscription_status,
            COALESCE(s.payment_type, 'none') as payment_type
        FROM users u
        LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
        LEFT JOIN user_progress up ON LOWER(u.email) = LOWER(up.email)
        WHERE 
            -- Not currently subscribed
            (s.id IS NULL OR s.status NOT IN ('active', 'trial'))
            -- Has some activity
            AND up.updated_at IS NOT NULL
            AND up.updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY up.updated_at DESC
    ";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Also get users who registered recently but may not have progress yet
    $query2 = "
        SELECT DISTINCT 
            u.email,
            u.name,
            u.created_at as registered_at,
            u.created_at as last_activity,
            COALESCE(s.status, 'none') as subscription_status,
            COALESCE(s.payment_type, 'none') as payment_type
        FROM users u
        LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
        WHERE 
            -- Not currently subscribed
            (s.id IS NULL OR s.status NOT IN ('active', 'trial'))
            -- Registered in last 7 days
            AND u.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY u.created_at DESC
    ";
    
    $stmt2 = $db->prepare($query2);
    $stmt2->execute();
    $recentUsers = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    
    // Merge and deduplicate
    $allEmails = [];
    $result = [];
    
    foreach ($users as $user) {
        $email = strtolower($user['email']);
        if (!in_array($email, $allEmails)) {
            $allEmails[] = $email;
            $result[] = $user;
        }
    }
    
    foreach ($recentUsers as $user) {
        $email = strtolower($user['email']);
        if (!in_array($email, $allEmails)) {
            $allEmails[] = $email;
            $result[] = $user;
        }
    }
    
    echo json_encode([
        'success' => true,
        'count' => count($result),
        'users' => $result,
        'emails_list' => implode(', ', $allEmails)
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

/**
 * Get Potential Buyers
 * Returns free users who have been active recently
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive

require_once 'secure-config.php';

// Simple security - only allow from command line or with secret key
$key = $_GET['key'] ?? '';
$expectedKey = 'earlybird2024';

if (php_sapi_name() !== 'cli' && $key !== $expectedKey) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $db = getSecureDBConnection();
    
    // Get users who:
    // 1. Are registered (in users table)
    // 2. Are NOT in subscribers table OR have expired/cancelled subscription
    // 3. Have activity in the last 7 days (based on user_progress table)
    
    $query = "
        SELECT DISTINCT 
            u.email,
            u.name,
            u.created_at as registered_at,
            up.updated_at as last_activity,
            COALESCE(s.status, 'none') as subscription_status,
            COALESCE(s.payment_type, 'none') as payment_type
        FROM users u
        LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
        LEFT JOIN user_progress up ON LOWER(u.email) = LOWER(up.email)
        WHERE 
            -- Not currently subscribed
            (s.id IS NULL OR s.status NOT IN ('active', 'trial'))
            -- Has some activity
            AND up.updated_at IS NOT NULL
            AND up.updated_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY up.updated_at DESC
    ";
    
    $stmt = $db->prepare($query);
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Also get users who registered recently but may not have progress yet
    $query2 = "
        SELECT DISTINCT 
            u.email,
            u.name,
            u.created_at as registered_at,
            u.created_at as last_activity,
            COALESCE(s.status, 'none') as subscription_status,
            COALESCE(s.payment_type, 'none') as payment_type
        FROM users u
        LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
        WHERE 
            -- Not currently subscribed
            (s.id IS NULL OR s.status NOT IN ('active', 'trial'))
            -- Registered in last 7 days
            AND u.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        ORDER BY u.created_at DESC
    ";
    
    $stmt2 = $db->prepare($query2);
    $stmt2->execute();
    $recentUsers = $stmt2->fetchAll(PDO::FETCH_ASSOC);
    
    // Merge and deduplicate
    $allEmails = [];
    $result = [];
    
    foreach ($users as $user) {
        $email = strtolower($user['email']);
        if (!in_array($email, $allEmails)) {
            $allEmails[] = $email;
            $result[] = $user;
        }
    }
    
    foreach ($recentUsers as $user) {
        $email = strtolower($user['email']);
        if (!in_array($email, $allEmails)) {
            $allEmails[] = $email;
            $result[] = $user;
        }
    }
    
    echo json_encode([
        'success' => true,
        'count' => count($result),
        'users' => $result,
        'emails_list' => implode(', ', $allEmails)
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}


