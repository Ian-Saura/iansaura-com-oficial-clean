<?php
/**
 * REFERRAL SYSTEM API
 * 
 * Endpoints:
 * - GET ?action=get_code&email=...     - Get or create referral code for user
 * - GET ?action=get_stats&email=...    - Get referral stats for user
 * - POST action=apply_referral         - Apply referral code when signing up
 * - POST action=process_conversion     - Called when referred user pays (internal)
 * 
 * IMPORTANT LOGIC:
 * - FREE users (no card): Get +5 days per referral (cumulative, max 90 days)
 * - TRIAL users WITH CARD (Gumroad): Considered PREMIUM, get bootcamp discount only
 * - PREMIUM users: Get bootcamp discount (not cumulative)
 * - Referred users always get +5 days trial bonus
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Use secure-config.php for database credentials
require_once __DIR__ . '/../../api/secure-config.php';

try {
    $pdo = getSecureDBConnection();
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

// ============ CONFIGURATION ============
const REFERRAL_BONUS_DAYS = 5;           // Days added per referral
const BOOTCAMP_DISCOUNT_PERCENT = 10;    // Discount for paid users (not cumulative)
const MAX_REFERRAL_BONUS_DAYS = 90;      // Max bonus days a free user can accumulate

// ============ HELPER FUNCTIONS ============

/**
 * Generate a unique referral code
 */
function generateReferralCode($email) {
    // Create a short, memorable code based on email + random
    $base = strtoupper(substr(md5($email . time()), 0, 6));
    return 'REF-' . $base;
}

/**
 * Get or create referral code for user
 */
function getOrCreateReferralCode($pdo, $email) {
    // Check if user already has a referral code
    $stmt = $pdo->prepare("SELECT referral_code FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($user && $user['referral_code']) {
        return $user['referral_code'];
    }
    
    // Generate new code
    $code = generateReferralCode($email);
    
    // Make sure it's unique
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE referral_code = ?");
    $stmt->execute([$code]);
    $attempts = 0;
    while ($stmt->fetchColumn() > 0 && $attempts < 10) {
        $code = generateReferralCode($email . $attempts);
        $stmt->execute([$code]);
        $attempts++;
    }
    
    // Save to user
    $stmt = $pdo->prepare("UPDATE users SET referral_code = ? WHERE email = ?");
    $stmt->execute([$code, $email]);
    
    return $code;
}

/**
 * Check if a user is considered "premium" (has paid or has trial WITH credit card)
 * 
 * Premium means:
 * - subscribers.status = 'active' (paying customer)
 * - subscribers.status = 'trialing' (Gumroad trial WITH credit card)
 * 
 * FREE means:
 * - No subscription record OR
 * - subscribers.status = 'cancelled' OR
 * - No status at all (just registered without card)
 */
function isUserPremium($pdo, $email) {
    // Check subscribers table for premium status
    // Premium = has credit card on file (will pay or is paying)
    $stmt = $pdo->prepare("
        SELECT status, payment_type FROM subscribers 
        WHERE email = ? OR secondary_email = ?
        ORDER BY created_at DESC LIMIT 1
    ");
    $stmt->execute([$email, $email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($subscriber) {
        $status = $subscriber['status'];
        $paymentType = $subscriber['payment_type'] ?? '';
        
        // 'active' = paying customer - always premium
        if ($status === 'active') {
            return true;
        }
        
        // 'trial' with card (gumroad, oneinfinite, paid, stripe, invited) = premium
        // These users have provided payment info, so they're considered premium
        $paidPaymentTypes = ['gumroad', 'oneinfinite', 'paid', 'stripe', 'invited'];
        if ($status === 'trial' && in_array($paymentType, $paidPaymentTypes)) {
            return true;
        }
        
        // 'trialing' (alternative status name) = premium
        if ($status === 'trialing') {
            return true;
        }
    }
    
    return false;
}

/**
 * Get user's referral stats
 */
function getReferralStats($pdo, $email) {
    $stmt = $pdo->prepare("
        SELECT 
            referral_code,
            referral_bonus_days,
            bootcamp_discount,
            trial_end
        FROM users 
        WHERE email = ?
    ");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        return null;
    }
    
    // Count successful referrals
    $stmt = $pdo->prepare("
        SELECT COUNT(*) as total_referrals,
               SUM(CASE WHEN subscription_status = 'active' THEN 1 ELSE 0 END) as converted_referrals
        FROM users 
        WHERE referred_by = ?
    ");
    $stmt->execute([$user['referral_code']]);
    $referralCounts = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Get list of referred users
    $stmt = $pdo->prepare("
        SELECT email, created_at, subscription_status
        FROM users 
        WHERE referred_by = ?
        ORDER BY created_at DESC
        LIMIT 20
    ");
    $stmt->execute([$user['referral_code']]);
    $referredUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Mask emails for privacy
    $referredUsers = array_map(function($u) {
        $parts = explode('@', $u['email']);
        $masked = substr($parts[0], 0, 2) . '***@' . $parts[1];
        return [
            'email' => $masked,
            'date' => $u['created_at'],
            'status' => $u['subscription_status']
        ];
    }, $referredUsers);
    
    // Check if user is premium (paid or trial with card)
    $isPaid = isUserPremium($pdo, $email);
    
    return [
        'referral_code' => $user['referral_code'],
        'referral_link' => 'https://iansaura.com/auth?ref=' . $user['referral_code'],
        'bonus_days' => (int)($user['referral_bonus_days'] ?? 0),
        'bootcamp_discount' => $isPaid ? (int)($user['bootcamp_discount'] ?? BOOTCAMP_DISCOUNT_PERCENT) : 0,
        'total_referrals' => (int)($referralCounts['total_referrals'] ?? 0),
        'converted_referrals' => (int)($referralCounts['converted_referrals'] ?? 0),
        'referred_users' => $referredUsers,
        'is_paid' => $isPaid,
        'trial_end' => $user['trial_end']
    ];
}

/**
 * Apply referral code when new user signs up
 */
function applyReferralCode($pdo, $newUserEmail, $referralCode) {
    // Validate referral code exists
    $stmt = $pdo->prepare("SELECT email FROM users WHERE referral_code = ?");
    $stmt->execute([$referralCode]);
    $referrer = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$referrer) {
        return ['success' => false, 'error' => 'Invalid referral code'];
    }
    
    // Can't refer yourself
    if (strtolower($referrer['email']) === strtolower($newUserEmail)) {
        return ['success' => false, 'error' => 'Cannot refer yourself'];
    }
    
    // Check if new user already has a referrer
    $stmt = $pdo->prepare("SELECT referred_by FROM users WHERE email = ?");
    $stmt->execute([$newUserEmail]);
    $newUser = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($newUser && $newUser['referred_by']) {
        return ['success' => false, 'error' => 'User already has a referrer'];
    }
    
    // Apply referral to new user (always gets bonus days)
    $stmt = $pdo->prepare("
        UPDATE users 
        SET referred_by = ?,
            referral_bonus_days = COALESCE(referral_bonus_days, 0) + ?
        WHERE email = ?
    ");
    $stmt->execute([$referralCode, REFERRAL_BONUS_DAYS, $newUserEmail]);
    
    // Check if referrer is PREMIUM (paid or trial WITH card)
    $isPremiumReferrer = isUserPremium($pdo, $referrer['email']);
    
    if (!$isPremiumReferrer) {
        // FREE user: Add bonus days (with cap)
        $stmt = $pdo->prepare("
            UPDATE users 
            SET referral_bonus_days = LEAST(
                COALESCE(referral_bonus_days, 0) + ?,
                ?
            )
            WHERE email = ?
        ");
        $stmt->execute([REFERRAL_BONUS_DAYS, MAX_REFERRAL_BONUS_DAYS, $referrer['email']]);
    } else {
        // PREMIUM user (paid or trial with card): Bootcamp discount (set once, not cumulative)
        $stmt = $pdo->prepare("
            UPDATE users 
            SET bootcamp_discount = COALESCE(bootcamp_discount, ?)
            WHERE email = ? AND (bootcamp_discount IS NULL OR bootcamp_discount = 0)
        ");
        $stmt->execute([BOOTCAMP_DISCOUNT_PERCENT, $referrer['email']]);
    }
    
    // Log the referral
    $stmt = $pdo->prepare("
        INSERT INTO referral_log (referrer_email, referred_email, referral_code, bonus_days, created_at)
        VALUES (?, ?, ?, ?, NOW())
    ");
    $stmt->execute([$referrer['email'], $newUserEmail, $referralCode, REFERRAL_BONUS_DAYS]);
    
    return [
        'success' => true,
        'message' => 'Referral applied successfully',
        'bonus_days' => REFERRAL_BONUS_DAYS
    ];
}

/**
 * Extend trial based on referral bonus days
 * Called when checking user subscription status
 */
function calculateEffectiveTrialEnd($trialEnd, $bonusDays) {
    if (!$trialEnd || !$bonusDays) return $trialEnd;
    
    $date = new DateTime($trialEnd);
    $date->modify("+{$bonusDays} days");
    return $date->format('Y-m-d H:i:s');
}

/**
 * Send referral invitation email
 */
function sendReferralInviteEmail($referrerName, $invitedEmail, $referralCode) {
    $referralLink = "https://iansaura.com/auth?ref=" . $referralCode;
    
    $subject = "¡{$referrerName} te invita a aprender Data Engineering! 🚀";
    
    $htmlBody = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    </head>
    <body style='margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;'>
        <div style='max-width: 600px; margin: 0 auto; padding: 40px 20px;'>
            <div style='background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; padding: 40px; border: 1px solid #334155;'>
                <!-- Header -->
                <div style='text-align: center; margin-bottom: 30px;'>
                    <div style='display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); width: 64px; height: 64px; border-radius: 16px; line-height: 64px; font-size: 32px;'>🎁</div>
                </div>
                
                <!-- Content -->
                <h1 style='color: #ffffff; text-align: center; font-size: 24px; margin-bottom: 16px;'>¡{$referrerName} te invita!</h1>
                
                <p style='color: #94a3b8; text-align: center; font-size: 16px; line-height: 1.6; margin-bottom: 24px;'>
                    Tu amigo/a está aprendiendo Data Engineering en Ian Saura Academy y quiere que vos también lo hagas.
                </p>
                
                <div style='background: linear-gradient(135deg, #8b5cf6/10 0%, #ec4899/10 100%); border: 1px solid #8b5cf6; border-radius: 12px; padding: 20px; margin-bottom: 24px;'>
                    <p style='color: #a78bfa; text-align: center; font-size: 18px; font-weight: bold; margin: 0 0 8px 0;'>🎁 Regalo especial para vos</p>
                    <p style='color: #ffffff; text-align: center; font-size: 24px; font-weight: bold; margin: 0;'>+5 días de prueba GRATIS</p>
                </div>
                
                <p style='color: #94a3b8; text-align: center; font-size: 14px; margin-bottom: 32px;'>
                    ¡Y {$referrerName} también recibe días extra cuando te registrás!
                </p>
                
                <!-- CTA Button -->
                <div style='text-align: center; margin-bottom: 32px;'>
                    <a href='{$referralLink}' style='display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: bold; font-size: 16px;'>
                        Aceptar Invitación →
                    </a>
                </div>
                
                <!-- What you get -->
                <div style='border-top: 1px solid #334155; padding-top: 24px; margin-top: 24px;'>
                    <p style='color: #ffffff; font-weight: bold; margin-bottom: 16px; font-size: 14px;'>¿Qué incluye Ian Saura Academy?</p>
                    <ul style='color: #94a3b8; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;'>
                        <li>📚 Roadmaps completos de Data Engineering</li>
                        <li>💻 Ejercicios prácticos de SQL y Python</li>
                        <li>🎯 20+ System Design Interviews</li>
                        <li>🤖 Saurio AI - Tu tutor personalizado</li>
                        <li>🏆 Proyectos reales para tu portfolio</li>
                    </ul>
                </div>
                
                <!-- Footer -->
                <div style='text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #334155;'>
                    <p style='color: #64748b; font-size: 12px; margin: 0;'>
                        Ian Saura Academy - La plataforma #1 de Data Engineering
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Try to send email using configured SMTP
    try {
        // Headers for HTML email
        $headers = [
            'MIME-Version: 1.0',
            'Content-type: text/html; charset=UTF-8',
            'From: Ian Saura Academy <info@iansaura.com>',
            'Reply-To: info@iansaura.com',
            'X-Mailer: PHP/' . phpversion()
        ];
        
        $sent = mail($invitedEmail, $subject, $htmlBody, implode("\r\n", $headers));
        
        if ($sent) {
            return ['success' => true, 'message' => 'Invitation sent'];
        } else {
            error_log("Failed to send referral email to: $invitedEmail");
            return ['success' => false, 'error' => 'Failed to send email'];
        }
    } catch (Exception $e) {
        error_log("Error sending referral email: " . $e->getMessage());
        return ['success' => false, 'error' => 'Email error'];
    }
}

// ============ ROUTES ============

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {
    case 'get_code':
        $email = $_GET['email'] ?? '';
        if (!$email) {
            echo json_encode(['success' => false, 'error' => 'Email required']);
            exit;
        }
        
        $code = getOrCreateReferralCode($pdo, $email);
        echo json_encode([
            'success' => true,
            'referral_code' => $code,
            'referral_link' => 'https://iansaura.com/auth?ref=' . $code
        ]);
        break;
        
    case 'get_stats':
        $email = $_GET['email'] ?? '';
        if (!$email) {
            echo json_encode(['success' => false, 'error' => 'Email required']);
            exit;
        }
        
        $stats = getReferralStats($pdo, $email);
        if (!$stats) {
            echo json_encode(['success' => false, 'error' => 'User not found']);
            exit;
        }
        
        echo json_encode(['success' => true, 'stats' => $stats]);
        break;
        
    case 'apply_referral':
        $data = json_decode(file_get_contents('php://input'), true);
        $newUserEmail = $data['email'] ?? '';
        $referralCode = $data['referral_code'] ?? '';
        
        if (!$newUserEmail || !$referralCode) {
            echo json_encode(['success' => false, 'error' => 'Email and referral code required']);
            exit;
        }
        
        $result = applyReferralCode($pdo, $newUserEmail, $referralCode);
        echo json_encode($result);
        break;
    
    case 'send_invite':
        $data = json_decode(file_get_contents('php://input'), true);
        $referrerEmail = $data['referrer_email'] ?? '';
        $referrerName = $data['referrer_name'] ?? '';
        $invitedEmail = $data['invited_email'] ?? '';
        $referralCode = $data['referral_code'] ?? '';
        
        if (!$referrerEmail || !$invitedEmail) {
            echo json_encode(['success' => false, 'error' => 'Emails required']);
            exit;
        }
        
        // Validate email format
        if (!filter_var($invitedEmail, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(['success' => false, 'error' => 'Invalid email format']);
            exit;
        }
        
        // Can't invite yourself
        if (strtolower($referrerEmail) === strtolower($invitedEmail)) {
            echo json_encode(['success' => false, 'error' => 'Cannot invite yourself']);
            exit;
        }
        
        // Check if user is already registered
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$invitedEmail]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'error' => 'Este usuario ya está registrado']);
            exit;
        }
        
        // Check if already invited recently (within 7 days)
        $stmt = $pdo->prepare("
            SELECT id FROM referral_invites 
            WHERE referrer_email = ? AND invited_email = ? 
            AND created_at > DATE_SUB(NOW(), INTERVAL 7 DAY)
        ");
        $stmt->execute([$referrerEmail, $invitedEmail]);
        if ($stmt->fetch()) {
            echo json_encode(['success' => false, 'error' => 'Ya enviaste una invitación a este email recientemente']);
            exit;
        }
        
        // Get referral code if not provided
        if (!$referralCode) {
            $referralCode = getOrCreateReferralCode($pdo, $referrerEmail);
        }
        
        // Save invitation
        try {
            $stmt = $pdo->prepare("
                INSERT INTO referral_invites (referrer_email, invited_email, referral_code, created_at)
                VALUES (?, ?, ?, NOW())
            ");
            $stmt->execute([$referrerEmail, $invitedEmail, $referralCode]);
        } catch (Exception $e) {
            // Table might not exist, try to create it
            $pdo->exec("
                CREATE TABLE IF NOT EXISTS referral_invites (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    referrer_email VARCHAR(255) NOT NULL,
                    invited_email VARCHAR(255) NOT NULL,
                    referral_code VARCHAR(20) NOT NULL,
                    sent_at DATETIME DEFAULT NULL,
                    accepted_at DATETIME DEFAULT NULL,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_referrer (referrer_email),
                    INDEX idx_invited (invited_email)
                )
            ");
            $stmt = $pdo->prepare("
                INSERT INTO referral_invites (referrer_email, invited_email, referral_code, created_at)
                VALUES (?, ?, ?, NOW())
            ");
            $stmt->execute([$referrerEmail, $invitedEmail, $referralCode]);
        }
        
        // Send email invitation
        $result = sendReferralInviteEmail($referrerName ?: $referrerEmail, $invitedEmail, $referralCode);
        
        if ($result['success']) {
            // Update sent_at
            $stmt = $pdo->prepare("UPDATE referral_invites SET sent_at = NOW() WHERE referrer_email = ? AND invited_email = ? ORDER BY created_at DESC LIMIT 1");
            $stmt->execute([$referrerEmail, $invitedEmail]);
        }
        
        echo json_encode($result);
        break;
        
    default:
        echo json_encode(['success' => false, 'error' => 'Invalid action']);
}

