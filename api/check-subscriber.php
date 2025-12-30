<?php
/**
 * Check User Subscription and Bootcamp Access Status
 * Used by frontend to refresh user permissions
 */

// Rate limiting - 100 requests per minute per IP
require_once __DIR__ . '/middleware/rate-limiter.php';
applyRateLimit('check_subscriber', 100, 60);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://iansaura.com');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $email = $_GET['email'] ?? null;
    
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Email required']);
        exit;
    }
    
    $email = filter_var($email, FILTER_VALIDATE_EMAIL);
    if (!$email) {
        echo json_encode(['success' => false, 'error' => 'Invalid email']);
        exit;
    }
    
    $credentialsFile = __DIR__ . '/.db-credentials.php';
    if (!file_exists($credentialsFile)) {
        throw new Exception('Database configuration not found');
    }
    
    $credentials = include $credentialsFile;
    
    $dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";
    $db = new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    
    // Check subscription status
    $subscribed = false;
    $is_trial = false;
    $is_oneinfinite_trial = false; // Trial con tarjeta (OneInfinite) - acceso completo
    $trial_ends = null;
    $trial_days_left = null;
    
    // Get subscriber record - include payment_type to detect OneInfinite trials
    // Also check secondary_email for users who paid with different email
    $stmt = $db->prepare("SELECT id, status, subscription_end, payment_type FROM subscribers WHERE LOWER(email) = LOWER(?) OR LOWER(secondary_email) = LOWER(?)");
    $stmt->execute([$email, $email]);
    $subscriber = $stmt->fetch();
    
    // Flag para usuarios migrados de OneInfinite
    $oi_migrated = false;
    
    // Lista de emails de trials de OneInfinite que deben migrar
    // (quitamos los que ya pagaron en Gumroad)
    $oi_trial_emails = [
        'rochaxx29@gmail.com',
        'bckgcapital@gmail.com',
        'ismartba@gmail.com',
        'jasef.huachambe@gmail.com',
        'naylamanzione@gmail.com',
        'nadiasemes85@gmail.com',
        'estebanledes@gmail.com',
        'owenwilson76467963@gmail.com',
        'duvanmorales07@gmail.com',
        // Ya pagaron en Gumroad:
        // 'maria.amy.3@gmail.com',
        // 'gastonrodriguez.360@gmail.com',
        // 'darkcode134@gmail.com',
        // 'tapieroandres3@gmail.com',
    ];
    
    if ($subscriber) {
        $status = $subscriber['status'];
        $subEnd = $subscriber['subscription_end'];
        $paymentType = $subscriber['payment_type'] ?? 'oneinfinite';
        
        // Detectar usuarios de OneInfinite trials que deben migrar a Gumroad
        // Solo si están en la lista Y su payment_type es oneinfinite (no gumroad)
        if (in_array(strtolower($email), array_map('strtolower', $oi_trial_emails)) && $paymentType === 'oneinfinite') {
            $oi_migrated = true;
            $subscribed = false;
        }
        
        // LÓGICA SIMPLIFICADA DE ACCESO:
        // 1. Premium (invited, oneinfinite, gumroad + active) = SIN banners
        // 2. Trial con tarjeta (oneinfinite/gumroad + trial) = SIN banners (ya puso tarjeta)
        // 3. Trial sin tarjeta (trial_free + trial) = CON banners (debe pagar)
        
        // Payment types that indicate user has a card on file
        $paidPaymentTypes = ['oneinfinite', 'gumroad', 'invited', 'paid', 'stripe'];
        
        if ($status === 'active') {
            $subscribed = true;
            // Todos los activos tienen acceso completo sin banners
            $is_oneinfinite_trial = true;
        } elseif ($status === 'trial') {
            // Verificar si el trial no expiró
            if ($subEnd) {
                $trialEnd = new DateTime($subEnd);
                $now = new DateTime();
                
                if ($trialEnd > $now) {
                    // Trial activo
                    $subscribed = true;
                    $is_trial = true;
                    $trial_ends = $subEnd;
                    $interval = $now->diff($trialEnd);
                    $trial_days_left = $interval->days;
                    if ($interval->h > 0 || $interval->i > 0) {
                        $trial_days_left += 1;
                    }
                    
                    // Trial con tarjeta (oneinfinite/gumroad) = SIN banners
                    // Trial sin tarjeta (trial_free) = CON banners
                    // invited siempre es sin banners
                    $is_oneinfinite_trial = in_array($paymentType, $paidPaymentTypes);
                } else {
                    // Trial expirado - OPTIMISMO DE CONVERSIÓN para Gumroad
                    // Asumimos que pagaron hasta que Gumroad/admin confirme lo contrario
                    if ($paymentType === 'gumroad') {
                        $subscribed = true;
                        $is_trial = false; // Ya no es trial, es "premium asumido"
                        $is_oneinfinite_trial = true; // Sin banners
                        // Nota: Gumroad webhook o admin puede cambiar status a 'cancelled' para revocar
                    }
                    // Si es trial_free o oneinfinite, no auto-convierten (pierden acceso)
                }
            } else {
                // Trial sin fecha de fin = acceso indefinido (invitados)
                $subscribed = true;
                $is_oneinfinite_trial = ($paymentType === 'invited');
            }
        } elseif ($status === 'cancelled') {
            // Explícitamente cancelado por Gumroad webhook o admin = sin acceso
            $subscribed = false;
        }
    }
    
    // Check bootcamp access
    $bootcamp_access = false;
    $stmt = $db->prepare("SELECT bootcamp_access FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if ($user && $user['bootcamp_access']) {
        $bootcamp_access = true;
    }
    
    $response = [
        'success' => true,
        'email' => $email,
        'subscribed' => $subscribed,
        'bootcamp_access' => $bootcamp_access
    ];
    
    // Add trial info if applicable
    if ($is_trial) {
        $response['is_trial'] = true;
        $response['is_oneinfinite_trial'] = $is_oneinfinite_trial; // true = con tarjeta, false = manual
        $response['trial_ends'] = $trial_ends;
        $response['trial_days_left'] = $trial_days_left;
    }
    
    // Add migration flag for OneInfinite users
    if ($oi_migrated) {
        $response['oi_migrated'] = true;
        $response['migration_message'] = 'Tu suscripción de OneInfinite fue cancelada debido a problemas con la plataforma. Registrate en nuestro nuevo sistema para obtener 7 días de prueba gratis.';
        $response['migration_link'] = 'https://iansaura.com/api/subscribe.php?email=' . urlencode($email);
    }
    
    echo json_encode($response);
    
} catch (Exception $e) {
    error_log("check-subscriber error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error'
    ]);
}
?>