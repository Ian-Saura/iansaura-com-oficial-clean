<?php
header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Include database configuration
require_once 'secure-config.php';

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    // Validate Google user data
    $googleUser = $input['googleUser'] ?? null;
    if (!$googleUser) {
        throw new Exception('Google user data is required');
    }
    
    $email = filter_var(trim($googleUser['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    if (!$email) {
        throw new Exception('Valid email is required');
    }
    
    $name = trim($googleUser['name'] ?? '');
    $googleId = trim($googleUser['id'] ?? '');
    $picture = trim($googleUser['picture'] ?? '');
    
    if (empty($name) || empty($googleId)) {
        throw new Exception('Name and Google ID are required');
    }
    
    // Connect to database
    $pdo = getSecureDBConnection();
    
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    
    // Check if user already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $existingUser = $stmt->fetch();
    
    if ($existingUser) {
        // User exists - update login info
        $stmt = $pdo->prepare("
            UPDATE users 
            SET last_login = NOW(), 
                login_count = login_count + 1,
                profile_image_url = COALESCE(NULLIF(profile_image_url, ''), ?)
            WHERE id = ?
        ");
        $stmt->execute([$picture, $existingUser['id']]);
        
        // Log login activity
        try {
            $stmt = $pdo->prepare("
                INSERT INTO user_activity (user_id, activity_type, ip_address, user_agent, created_at) 
                VALUES (?, 'login_google', ?, ?, NOW())
            ");
            $stmt->execute([$existingUser['id'], $ipAddress, $userAgent]);
        } catch (Exception $e) {
            // Ignore activity log errors
        }
        
        // Check if user has active subscription in subscribers table
        // Include 'trial' status - they put their card, they get full access
        // Also check secondary_email for users who paid with different email
        $hasSubscription = false;
        $isTrial = false;
        $isOneInfiniteTrial = false; // true = con tarjeta (OneInfinite), false = manual
        $trialDaysLeft = null;
        try {
            $stmt = $pdo->prepare("
                SELECT status, subscription_end, payment_type 
                FROM subscribers 
                WHERE (LOWER(email) = LOWER(?) OR LOWER(secondary_email) = LOWER(?)) 
                AND status IN ('active', 'trial')
            ");
            $stmt->execute([$email, $email]);
            $subscriptionResult = $stmt->fetch();
            
            if ($subscriptionResult) {
                $paymentType = $subscriptionResult['payment_type'] ?? 'oneinfinite';
                
                // LÓGICA SIMPLIFICADA:
                // - active = Premium (sin banners)
                // - trial + oneinfinite/invited = Trial con tarjeta (sin banners)
                // - trial + trial_free = Trial sin tarjeta (CON banners)
                
                if ($subscriptionResult['status'] === 'active') {
                    $hasSubscription = true;
                    $isOneInfiniteTrial = true; // Todos los activos sin banners
                } elseif ($subscriptionResult['status'] === 'trial') {
                    $subEnd = $subscriptionResult['subscription_end'];
                    if ($subEnd) {
                        $trialEnd = new DateTime($subEnd);
                        $now = new DateTime();
                        if ($trialEnd > $now) {
                            $hasSubscription = true;
                            $isTrial = true;
                            $trialDaysLeft = $now->diff($trialEnd)->days;
                            // trial_free = CON banners, otros = SIN banners
                            $isOneInfiniteTrial = ($paymentType !== 'trial_free');
                        }
                    } else {
                        $hasSubscription = true;
                        $isTrial = true;
                        $isOneInfiniteTrial = ($paymentType !== 'trial_free');
                    }
                }
            }
        } catch (Exception $e) {
            // If subscribers table doesn't exist, default to false
        }
        
        // Check bootcamp access
        $hasBootcampAccess = isset($existingUser['bootcamp_access']) && $existingUser['bootcamp_access'] ? true : false;
        
        $userData = [
            'id' => $existingUser['id'],
            'email' => $existingUser['email'],
            'name' => $existingUser['full_name'] ?: $name,
            'first_name' => $existingUser['first_name'],
            'last_name' => $existingUser['last_name'],
            'subscribed' => $hasSubscription,
            'is_trial' => $isTrial,
            'is_oneinfinite_trial' => $isOneInfiniteTrial, // true = con tarjeta, acceso completo sin banners
            'trial_days_left' => $trialDaysLeft,
            'bootcamp_access' => $hasBootcampAccess,
            'email_verified' => true, // Google accounts are verified
            'login_count' => $existingUser['login_count'] + 1,
            'provider' => 'google',
            'picture' => $picture
        ];
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'user' => $userData,
            'action' => 'login'
        ]);
        
    } else {
        // New user - create account
        // Parse name into first_name and last_name
        $nameParts = explode(' ', $name, 2);
        $firstName = $nameParts[0];
        $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
        
        // Insert new user
        $stmt = $pdo->prepare("
            INSERT INTO users (
                email, 
                password_hash, 
                first_name, 
                last_name, 
                full_name,
                profile_image_url,
                email_verified,
                is_active,
                login_count,
                created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        
        // No password for Google users (they authenticate via Google)
        $stmt->execute([
            $email,
            '', // Empty password hash for Google users
            $firstName,
            $lastName,
            $name,
            $picture,
            true,  // Google accounts are email verified
            true,  // Active by default
            1      // First login
        ]);
        
        $userId = $pdo->lastInsertId();
        
        // Log registration activity
        try {
            $stmt = $pdo->prepare("
                INSERT INTO user_activity (user_id, activity_type, ip_address, user_agent, created_at) 
                VALUES (?, 'register_google', ?, ?, NOW())
            ");
            $stmt->execute([$userId, $ipAddress, $userAgent]);
        } catch (Exception $e) {
            // Ignore activity log errors
        }
        
        // Return user data
        $userData = [
            'id' => $userId,
            'email' => $email,
            'name' => $name,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'subscribed' => false,
            'email_verified' => true,
            'login_count' => 1,
            'provider' => 'google',
            'picture' => $picture
        ];
        
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful',
            'user' => $userData,
            'action' => 'register'
        ]);
    }

} catch (PDOException $e) {
    error_log("Database error in google-auth.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error occurred'
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}