<?php
/**
 * Email Verification Endpoint
 * Handles verification links sent to users during registration
 */

// Suppress errors to prevent 500
error_reporting(0);
ini_set('display_errors', 0);

// Database connection
function getDBConnection() {
    // Try to load from secure config first
    if (file_exists(__DIR__ . '/secure-config.php')) {
        require_once __DIR__ . '/secure-config.php';
        if (function_exists('getSecureDBConnection')) {
            return getSecureDBConnection();
        }
    }
    
    // Fallback to direct connection
    $host = 'localhost';
    $dbname = 'c2621673_iansaura';
    $username = 'c2621673_admin';
    $password = '***REMOVED***';
    
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    
    return $pdo;
}

// Get token from URL
$token = $_GET['token'] ?? '';

if (empty($token)) {
    // Redirect to login with error
    header('Location: https://iansaura.com/login?error=missing_token&message=' . urlencode('Link de verificación inválido'));
    exit;
}

// Validate token format (should be 64 hex characters)
if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
    header('Location: https://iansaura.com/login?error=invalid_token&message=' . urlencode('Link de verificación inválido'));
    exit;
}

try {
    $pdo = getDBConnection();
    
    // Find user with this token
    $stmt = $pdo->prepare("
        SELECT id, email, first_name, name, email_verified, verification_expires 
        FROM users 
        WHERE verification_token = ?
    ");
    $stmt->execute([$token]);
    $user = $stmt->fetch();
    
    if (!$user) {
        // Token not found
        header('Location: https://iansaura.com/login?error=invalid_token&message=' . urlencode('Link de verificación inválido o ya utilizado'));
        exit;
    }
    
    // Check if already verified
    if ($user['email_verified']) {
        header('Location: https://iansaura.com/login?success=already_verified&message=' . urlencode('Tu email ya está verificado. Podés iniciar sesión.'));
        exit;
    }
    
    // Check if token expired
    if ($user['verification_expires'] && strtotime($user['verification_expires']) < time()) {
        header('Location: https://iansaura.com/login?error=expired_token&message=' . urlencode('El link de verificación expiró. Solicitá uno nuevo.'));
        exit;
    }
    
    // Mark email as verified and clear token
    $stmt = $pdo->prepare("
        UPDATE users 
        SET email_verified = 1, 
            verification_token = NULL, 
            verification_expires = NULL,
            updated_at = NOW()
        WHERE id = ?
    ");
    $stmt->execute([$user['id']]);
    
    error_log("Email verified successfully for user: " . $user['email']);
    
    // Redirect to login with success message
    $firstName = $user['first_name'] ?: $user['name'] ?: 'Usuario';
    header('Location: https://iansaura.com/login?success=verified&message=' . urlencode("¡Perfecto $firstName! Tu email fue verificado. Ya podés iniciar sesión."));
    exit;
    
} catch (PDOException $e) {
    error_log("Database error in verify-email.php: " . $e->getMessage());
    header('Location: https://iansaura.com/login?error=server_error&message=' . urlencode('Error del servidor. Intentá de nuevo.'));
    exit;
} catch (Exception $e) {
    error_log("Error in verify-email.php: " . $e->getMessage());
    header('Location: https://iansaura.com/login?error=unknown&message=' . urlencode('Error inesperado. Contactanos a info@iansaura.com'));
    exit;
}
?>