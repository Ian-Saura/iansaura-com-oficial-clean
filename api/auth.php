<?php
/**
 * Authentication API - Register & Login
 * Uses same SMTP method as test-email.php (proven to work)
 */

// Suppress errors to prevent 500
error_reporting(0);
ini_set('display_errors', 0);

// CORS - Restrictive (only iansaura.com)
require_once __DIR__ . '/middleware/cors.php';
applyCors();

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// ============================================
// RATE LIMITING - Protect against brute force
// ============================================
function checkAuthRateLimit($identifier, $maxRequests = 10, $timeWindow = 300) {
    $rateLimitFile = sys_get_temp_dir() . '/auth_rate_' . md5($identifier);
    $now = time();
    $requests = [];
    
    if (file_exists($rateLimitFile)) {
        $data = json_decode(file_get_contents($rateLimitFile), true);
        if ($data && is_array($data)) {
            $requests = array_filter($data, function($timestamp) use ($now, $timeWindow) {
                return ($now - $timestamp) < $timeWindow;
            });
        }
    }
    
    if (count($requests) >= $maxRequests) {
        http_response_code(429);
        header('Retry-After: 300');
        echo json_encode([
            'success' => false, 
            'error' => 'Demasiados intentos. Esperá 5 minutos.',
            'retry_after' => 300
        ]);
        exit;
    }
    
    $requests[] = $now;
    file_put_contents($rateLimitFile, json_encode(array_values($requests)), LOCK_EX);
}

// Apply rate limiting based on IP
$clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
checkAuthRateLimit($clientIP, 10, 300); // 10 requests per 5 minutes

/**
 * SMTP Email function - EXACT COPY from test-email.php that works
 */
function sendVerificationEmailSMTP($toEmail, $firstName, $verificationLink) {
    // Fix UTF-8 encoding for accented names (Agustín, María, José, etc.)
    require_once __DIR__ . '/email-helper.php';
    $firstName = ensureUtf8($firstName);
    
    $host = defined('SMTP_HOST') ? SMTP_HOST : 'c2621673.ferozo.com';
    $port = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $username = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $password = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    
    $socket = @fsockopen("ssl://$host", $port, $errno, $errstr, 30);
    
    if (!$socket) {
        error_log("SMTP Connection failed: $errstr ($errno)");
        return false;
    }
    
    // Read ALL server greeting lines (multi-line response)
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response = $line;
        if (substr($line, 3, 1) === ' ' || substr($line, 3, 1) === "\r" || strlen(trim($line)) <= 3) {
            break;
        }
    }
    
    // EHLO - need to read all response lines
    fputs($socket, "EHLO iansaura.com\r\n");
    while ($line = fgets($socket, 512)) {
        $response = $line;
        if (substr($line, 3, 1) === ' ') {
            break;
        }
    }
    
    if (substr($response, 0, 3) !== '250') {
        error_log("SMTP EHLO failed: $response");
        fclose($socket);
        return false;
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '334') {
        error_log("SMTP AUTH failed: $response");
        fclose($socket);
        return false;
    }
    
    // Username
    fputs($socket, base64_encode($username) . "\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '334') {
        error_log("SMTP Username failed: $response");
        fclose($socket);
        return false;
    }
    
    // Password
    fputs($socket, base64_encode($password) . "\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '235') {
        error_log("SMTP Password failed: $response");
        fclose($socket);
        return false;
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <$username>\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '250') {
        error_log("SMTP MAIL FROM failed: $response");
        fclose($socket);
        return false;
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <$toEmail>\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '250') {
        error_log("SMTP RCPT TO failed: $response");
        fclose($socket);
        return false;
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '354') {
        error_log("SMTP DATA failed: $response");
        fclose($socket);
        return false;
    }
    
    // Email content - HTML
    $subject = "=?UTF-8?B?" . base64_encode("Verificá tu email - Ian Saura Data Engineering") . "?=";
    
    $htmlBody = "<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family: Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; padding: 40px; margin: 0;'>
    <div style='max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px;'>
        <h1 style='color: #10b981; margin-bottom: 16px;'>¡Hola $firstName! 👋</h1>
        <p style='font-size: 16px; line-height: 1.6;'>
            Gracias por registrarte en <strong>Ian Saura - Data Engineering Academy</strong>.
        </p>
        <p style='font-size: 16px; line-height: 1.6;'>
            Para completar tu registro y poder iniciar sesión, hacé click en el siguiente botón:
        </p>
        <div style='text-align: center; margin: 32px 0;'>
            <a href='$verificationLink' style='background: linear-gradient(to right, #10b981, #06b6d4); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;'>
                ✅ Verificar mi email
            </a>
        </div>
        <p style='font-size: 14px; color: #94a3b8;'>
            O copiá y pegá este link en tu navegador:<br>
            <a href='$verificationLink' style='color: #10b981; word-break: break-all;'>$verificationLink</a>
        </p>
        <p style='font-size: 14px; color: #94a3b8;'>
            Este link expira en 24 horas.<br>
            Si no creaste esta cuenta, ignorá este email.
        </p>
        <hr style='border: none; border-top: 1px solid #334155; margin: 24px 0;'>
        <p style='font-size: 12px; color: #64748b; text-align: center;'>
            Ian Saura - Data Engineering Academy<br>
            <a href='https://iansaura.com' style='color: #10b981;'>iansaura.com</a>
        </p>
    </div>
</body>
</html>";
    
    $email = "From: Ian Saura <$username>\r\n";
    $email .= "To: <$toEmail>\r\n";
    $email .= "Subject: $subject\r\n";
    $email .= "MIME-Version: 1.0\r\n";
    $email .= "Content-Type: text/html; charset=utf-8\r\n";
    $email .= "Date: " . date('r') . "\r\n";
    $email .= "\r\n";
    $email .= $htmlBody;
    $email .= "\r\n.\r\n";
    
    fputs($socket, $email);
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '250') {
        error_log("SMTP Send failed: $response");
        fclose($socket);
        return false;
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    error_log("Verification email sent successfully to: $toEmail");
    return true;
}

/**
 * SMTP Email function for Password Reset
 */
function sendPasswordResetEmailSMTP($toEmail, $firstName, $resetLink) {
    $host = defined('SMTP_HOST') ? SMTP_HOST : 'c2621673.ferozo.com';
    $port = defined('SMTP_PORT') ? SMTP_PORT : 465;
    $username = defined('SMTP_USER') ? SMTP_USER : 'info@iansaura.com';
    $password = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    
    $socket = @fsockopen("ssl://$host", $port, $errno, $errstr, 30);
    
    if (!$socket) {
        error_log("SMTP Connection failed: $errstr ($errno)");
        return false;
    }
    
    // Read ALL server greeting lines (multi-line response)
    $response = '';
    while ($line = fgets($socket, 512)) {
        $response = $line;
        if (substr($line, 3, 1) === ' ' || substr($line, 3, 1) === "\r" || strlen(trim($line)) <= 3) {
            break;
        }
    }
    
    // EHLO - need to read all response lines
    fputs($socket, "EHLO iansaura.com\r\n");
    while ($line = fgets($socket, 512)) {
        $response = $line;
        if (substr($line, 3, 1) === ' ') {
            break;
        }
    }
    
    if (substr($response, 0, 3) !== '250') {
        error_log("SMTP EHLO failed: $response");
        fclose($socket);
        return false;
    }
    
    // AUTH LOGIN
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '334') {
        error_log("SMTP AUTH failed: $response");
        fclose($socket);
        return false;
    }
    
    // Username
    fputs($socket, base64_encode($username) . "\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '334') {
        error_log("SMTP Username failed: $response");
        fclose($socket);
        return false;
    }
    
    // Password
    fputs($socket, base64_encode($password) . "\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '235') {
        error_log("SMTP Password failed: $response");
        fclose($socket);
        return false;
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <$username>\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '250') {
        error_log("SMTP MAIL FROM failed: $response");
        fclose($socket);
        return false;
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <$toEmail>\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '250') {
        error_log("SMTP RCPT TO failed: $response");
        fclose($socket);
        return false;
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '354') {
        error_log("SMTP DATA failed: $response");
        fclose($socket);
        return false;
    }
    
    // Email content - HTML
    $subject = "=?UTF-8?B?" . base64_encode("🔐 Restablecer contraseña - Ian Saura Data Engineering") . "?=";
    
    $htmlBody = "<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'></head>
<body style='font-family: Arial, sans-serif; background-color: #0f172a; color: #e2e8f0; padding: 40px; margin: 0;'>
    <div style='max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px;'>
        <h1 style='color: #f59e0b; margin-bottom: 16px;'>🔐 Restablecer contraseña</h1>
        <p style='font-size: 16px; line-height: 1.6;'>
            Hola $firstName,
        </p>
        <p style='font-size: 16px; line-height: 1.6;'>
            Recibimos una solicitud para restablecer la contraseña de tu cuenta en <strong>Ian Saura - Data Engineering Academy</strong>.
        </p>
        <p style='font-size: 16px; line-height: 1.6;'>
            Hacé click en el siguiente botón para crear una nueva contraseña:
        </p>
        <div style='text-align: center; margin: 32px 0;'>
            <a href='$resetLink' style='background: linear-gradient(to right, #f59e0b, #ef4444); color: white; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;'>
                🔑 Restablecer mi contraseña
            </a>
        </div>
        <p style='font-size: 14px; color: #94a3b8;'>
            O copiá y pegá este link en tu navegador:<br>
            <a href='$resetLink' style='color: #f59e0b; word-break: break-all;'>$resetLink</a>
        </p>
        <div style='background: #374151; border-radius: 8px; padding: 16px; margin: 24px 0;'>
            <p style='font-size: 14px; color: #fbbf24; margin: 0;'>
                ⚠️ <strong>Importante:</strong>
            </p>
            <ul style='font-size: 14px; color: #94a3b8; margin: 8px 0 0 0; padding-left: 20px;'>
                <li>Este link expira en <strong>1 hora</strong>.</li>
                <li>Si no solicitaste este cambio, ignorá este email.</li>
                <li>Tu contraseña actual seguirá funcionando.</li>
            </ul>
        </div>
        <hr style='border: none; border-top: 1px solid #334155; margin: 24px 0;'>
        <p style='font-size: 12px; color: #64748b; text-align: center;'>
            Ian Saura - Data Engineering Academy<br>
            <a href='https://iansaura.com' style='color: #10b981;'>iansaura.com</a>
        </p>
    </div>
</body>
</html>";
    
    $email = "From: Ian Saura <$username>\r\n";
    $email .= "To: <$toEmail>\r\n";
    $email .= "Subject: $subject\r\n";
    $email .= "MIME-Version: 1.0\r\n";
    $email .= "Content-Type: text/html; charset=utf-8\r\n";
    $email .= "Date: " . date('r') . "\r\n";
    $email .= "\r\n";
    $email .= $htmlBody;
    $email .= "\r\n.\r\n";
    
    fputs($socket, $email);
    $response = fgets($socket, 512);
    
    if (substr($response, 0, 3) !== '250') {
        error_log("SMTP Send failed: $response");
        fclose($socket);
        return false;
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    error_log("Password reset email sent successfully to: $toEmail");
    return true;
}

// Database connection
function getDBConnection() {
    // Try to load from secure config first
    if (file_exists(__DIR__ . '/secure-config.php')) {
        require_once __DIR__ . '/secure-config.php';
        if (function_exists('getSecureDBConnection')) {
            return getSecureDBConnection();
        }
    }
    
    // No fallback - secure config is required
    throw new Exception('Database configuration not found. Ensure secure-config.php exists.');
}

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    $action = $input['action'] ?? '';
    
    if (!in_array($action, ['register', 'login', 'resend_verification', 'forgot_password', 'reset_password'])) {
        throw new Exception('Invalid action. Must be register, login, resend_verification, forgot_password, or reset_password');
    }
    
    // Validate required fields
    $email = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    if (!$email && $action !== 'reset_password') {
        throw new Exception('Email válido requerido');
    }
    
    // Password only required for register and login
    $password = trim($input['password'] ?? '');
    if (empty($password) && in_array($action, ['register', 'login'])) {
        throw new Exception('Contraseña requerida');
    }
    
    // Connect to database
    $pdo = getDBConnection();
    
    if ($action === 'register') {
        // Registration - ensure name is valid UTF-8
        require_once __DIR__ . '/email-helper.php';
        $name = trim(ensureUtf8($input['name'] ?? ''));
        if (empty($name)) {
            throw new Exception('Nombre requerido');
        }
        
        // Password validation
        if (strlen($password) < 6) {
            throw new Exception('La contraseña debe tener al menos 6 caracteres');
        }
        
        // Email domain validation (block disposable/temporary emails)
        $blockedDomains = ['tempmail.com', 'throwaway.com', 'mailinator.com', 'guerrillamail.com', '10minutemail.com', 'fakeinbox.com', 'yopmail.com'];
        $emailDomain = strtolower(substr(strrchr($email, "@"), 1));
        if (in_array($emailDomain, $blockedDomains)) {
            throw new Exception('Por favor usá un email válido, no temporales');
        }
        
        // Check if user already exists
        $stmt = $pdo->prepare("SELECT id, email_verified FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $existingUser = $stmt->fetch();
        
        if ($existingUser) {
            if ($existingUser['email_verified']) {
                throw new Exception('Este email ya está registrado. Usá iniciar sesión.');
            } else {
                throw new Exception('Este email ya está registrado pero no verificado. Revisá tu bandeja de entrada.');
            }
        }
        
        // Generate email verification token
        $verificationToken = bin2hex(random_bytes(32));
        $verificationExpiry = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        // Hash password
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        
        // Parse name into first_name and last_name
        $nameParts = explode(' ', $name, 2);
        $firstName = $nameParts[0];
        $lastName = isset($nameParts[1]) ? $nameParts[1] : '';
        
        // Insert new user
        $stmt = $pdo->prepare("
            INSERT INTO users (
                email, 
                password_hash, 
                name,
                first_name, 
                last_name, 
                full_name,
                email_verified,
                is_active,
                login_count,
                verification_token,
                verification_expires,
                created_at
            ) VALUES (?, ?, ?, ?, ?, ?, 0, 1, 0, ?, ?, NOW())
        ");
        
        $stmt->execute([
            $email,
            $passwordHash,
            $name,
            $firstName,
            $lastName,
            $name,
            $verificationToken,
            $verificationExpiry
        ]);
        
        $userId = $pdo->lastInsertId();
        
        // Send verification email
        $verificationLink = "https://iansaura.com/api/verify-email.php?token=$verificationToken";
        $emailSent = sendVerificationEmailSMTP($email, $firstName, $verificationLink);
        
        error_log("Registration for $email - User ID: $userId - Email sent: " . ($emailSent ? 'YES' : 'NO'));
        
        echo json_encode([
            'success' => true,
            'message' => $emailSent 
                ? '¡Registro exitoso! Te enviamos un email para verificar tu cuenta. Revisá tu bandeja de entrada (y spam).'
                : 'Registro exitoso pero hubo un problema enviando el email. Contactanos a info@iansaura.com',
            'action' => 'register',
            'requiresVerification' => true,
            'emailSent' => $emailSent
        ]);
        
    } else if ($action === 'login') {
        // Login
        $stmt = $pdo->prepare("
            SELECT id, email, password_hash, first_name, last_name, full_name, name,
                   email_verified, is_active, login_count, last_login
            FROM users 
            WHERE email = ?
        ");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user) {
            throw new Exception('Email o contraseña incorrectos');
        }
        
        // Check if account is active
        if (!$user['is_active']) {
            throw new Exception('Tu cuenta está desactivada. Contactanos a info@iansaura.com');
        }
        
        // Verify password
        if (!password_verify($password, $user['password_hash'])) {
            throw new Exception('Email o contraseña incorrectos');
        }
        
        // Check if email is verified - BLOCK LOGIN IF NOT VERIFIED
        if (!$user['email_verified']) {
            throw new Exception('Tu email no está verificado. Revisá tu bandeja de entrada (y spam) para el link de verificación.');
        }
        
        // Update login statistics
        $stmt = $pdo->prepare("
            UPDATE users 
            SET last_login = NOW(), login_count = login_count + 1 
            WHERE id = ?
        ");
        $stmt->execute([$user['id']]);
        
        // Check subscription status
        $hasSubscription = false;
        try {
            $stmt = $pdo->prepare("
                SELECT id FROM subscribers 
                WHERE (email = ? OR user_id = ?) 
                AND status = 'active'
            ");
            $stmt->execute([$email, $user['id']]);
            $hasSubscription = $stmt->fetch() ? true : false;
        } catch (Exception $e) {
            // Table might not exist
        }
        
        // Check for subscribed column in users table
        try {
            $stmt = $pdo->prepare("SELECT subscribed FROM users WHERE id = ?");
            $stmt->execute([$user['id']]);
            $subResult = $stmt->fetch();
            if ($subResult && $subResult['subscribed']) {
                $hasSubscription = true;
            }
        } catch (Exception $e) {
            // Column might not exist
        }
        
        // Check bootcamp access
        $hasBootcampAccess = false;
        try {
            $stmt = $pdo->prepare("SELECT bootcamp_access FROM users WHERE id = ?");
            $stmt->execute([$user['id']]);
            $bootcampResult = $stmt->fetch();
            $hasBootcampAccess = $bootcampResult && $bootcampResult['bootcamp_access'] ? true : false;
        } catch (Exception $e) {
            // Column might not exist
        }
        
        // Get display name - fix UTF-8 encoding for accented names
        require_once __DIR__ . '/email-helper.php';
        $displayName = $user['full_name'] ?: $user['name'] ?: ($user['first_name'] . ' ' . $user['last_name']);
        
        // Return user data
        $userData = [
            'id' => $user['id'],
            'email' => $user['email'],
            'name' => trim(ensureUtf8($displayName)),
            'first_name' => ensureUtf8($user['first_name']),
            'last_name' => ensureUtf8($user['last_name']),
            'subscribed' => $hasSubscription,
            'bootcamp_access' => $hasBootcampAccess,
            'email_verified' => true,
            'login_count' => $user['login_count'] + 1,
            'provider' => 'email'
        ];
        
        echo json_encode([
            'success' => true,
            'message' => 'Login exitoso',
            'user' => $userData,
            'action' => 'login'
        ]);
        
    } else if ($action === 'resend_verification') {
        // Resend verification email
        $stmt = $pdo->prepare("SELECT id, email, first_name, name, email_verified FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user) {
            throw new Exception('Usuario no encontrado');
        }
        
        if ($user['email_verified']) {
            throw new Exception('Este email ya está verificado. Podés iniciar sesión.');
        }
        
        // Generate new verification token
        $verificationToken = bin2hex(random_bytes(32));
        $verificationExpiry = date('Y-m-d H:i:s', strtotime('+24 hours'));
        
        // Update token in database
        $stmt = $pdo->prepare("UPDATE users SET verification_token = ?, verification_expires = ? WHERE id = ?");
        $stmt->execute([$verificationToken, $verificationExpiry, $user['id']]);
        
        // Send verification email
        $firstName = $user['first_name'] ?: $user['name'] ?: 'Usuario';
        $verificationLink = "https://iansaura.com/api/verify-email.php?token=$verificationToken";
        $emailSent = sendVerificationEmailSMTP($email, $firstName, $verificationLink);
        
        error_log("Resend verification for $email - Email sent: " . ($emailSent ? 'YES' : 'NO'));
        
        if ($emailSent) {
            echo json_encode([
                'success' => true,
                'message' => 'Email de verificación reenviado. Revisá tu bandeja de entrada (y spam).',
                'emailSent' => true
            ]);
        } else {
            throw new Exception('No se pudo enviar el email. Contactanos a info@iansaura.com');
        }
        
    } else if ($action === 'forgot_password') {
        // ============================================
        // FORGOT PASSWORD - Send reset link
        // ============================================
        $stmt = $pdo->prepare("SELECT id, email, first_name, name, google_id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        // Always return success to prevent email enumeration attacks
        if (!$user) {
            // Log the attempt but don't reveal if email exists
            error_log("Password reset requested for non-existent email: $email");
            echo json_encode([
                'success' => true,
                'message' => 'Si el email está registrado, recibirás un link para restablecer tu contraseña.'
            ]);
            exit;
        }
        
        // Check if user registered with Google (no password to reset)
        if (!empty($user['google_id'])) {
            echo json_encode([
                'success' => true,
                'message' => 'Si el email está registrado, recibirás un link para restablecer tu contraseña.',
                'hint' => 'google' // Frontend can use this to show a hint about Google login
            ]);
            exit;
        }
        
        // Generate password reset token
        $resetToken = bin2hex(random_bytes(32));
        $resetExpiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
        
        // Store token in database
        $stmt = $pdo->prepare("
            UPDATE users 
            SET password_reset_token = ?, password_reset_expires = ? 
            WHERE id = ?
        ");
        $stmt->execute([$resetToken, $resetExpiry, $user['id']]);
        
        // Send password reset email
        $firstName = $user['first_name'] ?: $user['name'] ?: 'Usuario';
        $resetLink = "https://iansaura.com/auth?action=reset&token=$resetToken";
        $emailSent = sendPasswordResetEmailSMTP($email, $firstName, $resetLink);
        
        error_log("Password reset for $email - Email sent: " . ($emailSent ? 'YES' : 'NO'));
        
        echo json_encode([
            'success' => true,
            'message' => 'Si el email está registrado, recibirás un link para restablecer tu contraseña. Revisá tu bandeja de entrada (y spam).',
            'emailSent' => $emailSent
        ]);
        
    } else if ($action === 'reset_password') {
        // ============================================
        // RESET PASSWORD - Change password with token
        // ============================================
        $token = trim($input['token'] ?? '');
        $newPassword = trim($input['new_password'] ?? '');
        
        if (empty($token)) {
            throw new Exception('Token de restablecimiento requerido');
        }
        
        if (empty($newPassword)) {
            throw new Exception('Nueva contraseña requerida');
        }
        
        if (strlen($newPassword) < 6) {
            throw new Exception('La contraseña debe tener al menos 6 caracteres');
        }
        
        // Find user with valid token
        $stmt = $pdo->prepare("
            SELECT id, email, first_name, name 
            FROM users 
            WHERE password_reset_token = ? 
            AND password_reset_expires > NOW()
        ");
        $stmt->execute([$token]);
        $user = $stmt->fetch();
        
        if (!$user) {
            throw new Exception('El link de restablecimiento es inválido o ha expirado. Solicitá uno nuevo.');
        }
        
        // Hash new password
        $passwordHash = password_hash($newPassword, PASSWORD_DEFAULT);
        
        // Update password and clear reset token
        $stmt = $pdo->prepare("
            UPDATE users 
            SET password_hash = ?, 
                password_reset_token = NULL, 
                password_reset_expires = NULL 
            WHERE id = ?
        ");
        $stmt->execute([$passwordHash, $user['id']]);
        
        error_log("Password reset successful for: " . $user['email']);
        
        echo json_encode([
            'success' => true,
            'message' => '¡Contraseña actualizada exitosamente! Ya podés iniciar sesión con tu nueva contraseña.'
        ]);
    }

} catch (PDOException $e) {
    error_log("Database error in auth.php: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Error de base de datos. Intentá de nuevo.'
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
