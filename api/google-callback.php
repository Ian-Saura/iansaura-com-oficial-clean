<?php
/**
 * Google OAuth Callback Handler
 * 
 * Intercambia el código de autorización por tokens y autentica al usuario
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once 'secure-config.php';
require_once 'secrets.php';

// Google OAuth Configuration (from secrets.php)
$GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
$GOOGLE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET;

try {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $code = $input['code'] ?? null;
    $redirectUri = $input['redirect_uri'] ?? null;
    
    // Log for debugging
    error_log("Google callback - code length: " . strlen($code ?? '') . ", redirect_uri: " . ($redirectUri ?? 'null'));
    
    if (!$code || !$redirectUri) {
        throw new Exception('Code and redirect_uri are required');
    }
    
    // Exchange code for tokens
    $tokenUrl = 'https://oauth2.googleapis.com/token';
    $tokenData = [
        'code' => $code,
        'client_id' => $GOOGLE_CLIENT_ID,
        'client_secret' => $GOOGLE_CLIENT_SECRET,
        'redirect_uri' => $redirectUri,
        'grant_type' => 'authorization_code',
    ];
    
    $ch = curl_init($tokenUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($tokenData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/x-www-form-urlencoded']);
    
    $tokenResponse = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    $tokens = json_decode($tokenResponse, true);
    
    if (isset($tokens['error'])) {
        error_log("Google token error: " . json_encode($tokens));
        error_log("Token request data: client_id=" . $GOOGLE_CLIENT_ID . ", redirect_uri=" . $redirectUri);
        throw new Exception($tokens['error_description'] ?? $tokens['error']);
    }
    
    error_log("Google token exchange successful");
    
    // Decode ID token to get user info
    $idToken = $tokens['id_token'] ?? null;
    if (!$idToken) {
        throw new Exception('No ID token received from Google');
    }
    
    $parts = explode('.', $idToken);
    if (count($parts) !== 3) {
        throw new Exception('Invalid ID token format');
    }
    
    $payload = json_decode(base64_decode(strtr($parts[1], '-_', '+/')), true);
    
    if (!$payload || !isset($payload['email'])) {
        throw new Exception('Could not decode user info from token');
    }
    
    // Now authenticate/register the user
    $email = $payload['email'];
    $name = $payload['name'] ?? $payload['email'];
    $picture = $payload['picture'] ?? '';
    $googleId = $payload['sub'];
    
    $pdo = getSecureDBConnection();
    
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '';
    
    // Check if user exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $existingUser = $stmt->fetch();
    
    if ($existingUser) {
        // Update login info
        $stmt = $pdo->prepare("
            UPDATE users 
            SET last_login = NOW(), 
                login_count = login_count + 1,
                profile_image_url = COALESCE(NULLIF(profile_image_url, ''), ?)
            WHERE id = ?
        ");
        $stmt->execute([$picture, $existingUser['id']]);
        
        $userId = $existingUser['id'];
        $userName = $existingUser['full_name'] ?: $existingUser['name'] ?: $name;
        
    } else {
        // Create new user
        $nameParts = explode(' ', $name, 2);
        $firstName = $nameParts[0];
        $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
        
        $stmt = $pdo->prepare("
            INSERT INTO users (
                email, password_hash, name, first_name, last_name, full_name,
                profile_image_url, email_verified, is_active, login_count, created_at
            ) VALUES (?, '', ?, ?, ?, ?, ?, 1, 1, 1, NOW())
        ");
        $stmt->execute([$email, $name, $firstName, $lastName, $name, $picture]);
        
        $userId = $pdo->lastInsertId();
        $userName = $name;
    }
    
    // Check subscription status - include trial (they put their card)
    // Also check secondary_email for users who paid with different email
    $hasSubscription = false;
    $isTrial = false;
    $isOneInfiniteTrial = false;
    $trialDaysLeft = null;
    try {
        $stmt = $pdo->prepare("SELECT status, subscription_end, payment_type FROM subscribers WHERE (LOWER(email) = LOWER(?) OR LOWER(secondary_email) = LOWER(?)) AND status IN ('active', 'trial')");
        $stmt->execute([$email, $email]);
        $result = $stmt->fetch();
        
        if ($result) {
            $paymentType = $result['payment_type'] ?? 'oneinfinite';
            
            // LÓGICA SIMPLIFICADA:
            // - active = Premium (sin banners)
            // - trial + oneinfinite/invited = Trial con tarjeta (sin banners)
            // - trial + trial_free = Trial sin tarjeta (CON banners)
            
            if ($result['status'] === 'active') {
                $hasSubscription = true;
                $isOneInfiniteTrial = true; // Todos los activos sin banners
            } elseif ($result['status'] === 'trial') {
                $subEnd = $result['subscription_end'];
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
        // Ignore if table doesn't exist
    }
    
    // Check bootcamp access
    $hasBootcampAccess = false;
    try {
        $stmt = $pdo->prepare("SELECT bootcamp_access FROM users WHERE id = ?");
        $stmt->execute([$userId]);
        $bootcampResult = $stmt->fetch();
        $hasBootcampAccess = $bootcampResult && $bootcampResult['bootcamp_access'] ? true : false;
    } catch (Exception $e) {
        // Column might not exist yet
    }
    
    // Log activity
    try {
        $stmt = $pdo->prepare("
            INSERT INTO user_activity (user_id, activity_type, ip_address, user_agent, created_at) 
            VALUES (?, 'login_google', ?, ?, NOW())
        ");
        $stmt->execute([$userId, $ipAddress, $userAgent]);
    } catch (Exception $e) {
        // Ignore activity log errors
    }
    
    echo json_encode([
        'success' => true,
        'user' => [
            'id' => $userId,
            'email' => $email,
            'name' => $userName,
            'picture' => $picture,
            'subscribed' => $hasSubscription,
            'is_trial' => $isTrial,
            'is_oneinfinite_trial' => $isOneInfiniteTrial,
            'trial_days_left' => $trialDaysLeft,
            'bootcamp_access' => $hasBootcampAccess,
            'email_verified' => true,
            'provider' => 'google'
        ]
    ]);
    
} catch (Exception $e) {
    error_log("Google callback error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>