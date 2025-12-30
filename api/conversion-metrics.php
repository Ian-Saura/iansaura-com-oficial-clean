<?php
/**
 * Conversion Metrics API
 * Métricas de conversión para el Admin Panel
 * 
 * Mide el funnel:
 * 1. Usuarios registrados (total)
 * 2. Usuarios que completaron Nivel 0
 * 3. Usuarios que iniciaron trial
 * 4. Usuarios que pagaron
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // Check if 'subscribed' column exists in users table
    $hasSubscribedColumn = false;
    try {
        $checkCol = $db->query("SHOW COLUMNS FROM users LIKE 'subscribed'");
        $hasSubscribedColumn = $checkCol->rowCount() > 0;
    } catch (Exception $e) {
        $hasSubscribedColumn = false;
    }
    
    // =============================================
    // 1. TOTAL USUARIOS REGISTRADOS
    // =============================================
    $stmt = $db->query("SELECT COUNT(*) as total FROM users");
    $totalUsers = (int)$stmt->fetch()['total'];
    
    // =============================================
    // 2. USUARIOS GRATUITOS (sin suscripción)
    // =============================================
    // Count users that are NOT in subscribers table with active status
    $stmt = $db->query("
        SELECT COUNT(*) as total 
        FROM users u
        WHERE NOT EXISTS (
            SELECT 1 FROM subscribers s 
            WHERE (LOWER(s.email) = LOWER(u.email) OR LOWER(s.secondary_email) = LOWER(u.email))
            AND s.status IN ('active', 'trial')
        )
    ");
    $freeUsers = (int)$stmt->fetch()['total'];
    
    // =============================================
    // 3. USUARIOS QUE COMPLETARON NIVEL 0 (>80% pasos l0-)
    // =============================================
    // Contamos pasos que empiezan con 'l0-'
    $stmt = $db->query("
        SELECT 
            up.email,
            up.completed_steps
        FROM user_progress up
    ");
    
    $level0Completers = 0;
    $level0CompletersNotSubscribed = 0;
    $level0CompletersTrialed = 0;
    $level0CompletersPaid = 0;
    
    // Total de pasos en nivel 0 (aproximado)
    $totalLevel0Steps = 234;
    $completionThreshold = 0.80; // 80%
    
    $userDetails = [];
    
    while ($row = $stmt->fetch()) {
        $steps = json_decode($row['completed_steps'] ?? '[]', true) ?: [];
        $level0Steps = array_filter($steps, fn($s) => strpos($s, 'l0-') === 0);
        $level0Count = count($level0Steps);
        $level0Percent = $totalLevel0Steps > 0 ? ($level0Count / $totalLevel0Steps) : 0;
        
        if ($level0Percent >= $completionThreshold) {
            $level0Completers++;
            
            // Verificar si este usuario pasó a trial o pagó
            $email = $row['email'];
            $checkSub = $db->prepare("
                SELECT status, payment_type 
                FROM subscribers 
                WHERE LOWER(email) = LOWER(?) OR LOWER(secondary_email) = LOWER(?)
            ");
            $checkSub->execute([$email, $email]);
            $sub = $checkSub->fetch();
            
            if ($sub) {
                if ($sub['status'] === 'active' && $sub['payment_type'] === 'oneinfinite') {
                    $level0CompletersPaid++;
                } elseif ($sub['status'] === 'trial') {
                    $level0CompletersTrialed++;
                }
            } else {
                $level0CompletersNotSubscribed++;
            }
            
            $userDetails[] = [
                'email' => $email,
                'level0_steps' => $level0Count,
                'level0_percent' => round($level0Percent * 100, 1),
                'status' => $sub ? $sub['status'] : 'free',
                'payment_type' => $sub ? $sub['payment_type'] : null
            ];
        }
    }
    
    // =============================================
    // 4. TRIALS ACTIVOS (con tarjeta - OneInfinite)
    // =============================================
    $stmt = $db->query("
        SELECT COUNT(*) as total 
        FROM subscribers 
        WHERE status = 'trial' 
        AND payment_type = 'oneinfinite'
        AND (subscription_end IS NULL OR subscription_end > NOW())
    ");
    $activeTrialsWithCard = (int)$stmt->fetch()['total'];
    
    // =============================================
    // 5. TRIALS MANUALES (sin tarjeta)
    // =============================================
    $stmt = $db->query("
        SELECT COUNT(*) as total 
        FROM subscribers 
        WHERE status = 'trial' 
        AND payment_type IN ('trial_free', 'trial_manual')
        AND (subscription_end IS NULL OR subscription_end > NOW())
    ");
    $activeTrialsManual = (int)$stmt->fetch()['total'];
    
    // =============================================
    // 6. SUSCRIPTORES PAGOS ACTIVOS
    // =============================================
    $stmt = $db->query("
        SELECT COUNT(*) as total 
        FROM subscribers 
        WHERE status = 'active' 
        AND payment_type IN ('oneinfinite', 'paid')
    ");
    $paidSubscribers = (int)$stmt->fetch()['total'];
    
    // =============================================
    // 7. INVITADOS VIP
    // =============================================
    $stmt = $db->query("
        SELECT COUNT(*) as total 
        FROM subscribers 
        WHERE payment_type = 'invited'
        AND status IN ('active', 'trial')
    ");
    $invitedVIP = (int)$stmt->fetch()['total'];
    
    // =============================================
    // 8. TRIALS EXPIRADOS (no convirtieron)
    // =============================================
    $stmt = $db->query("
        SELECT COUNT(*) as total 
        FROM subscribers 
        WHERE status = 'trial' 
        AND subscription_end < NOW()
    ");
    $expiredTrials = (int)$stmt->fetch()['total'];
    
    // =============================================
    // 9. HISTÓRICO DE CONVERSIONES POR MES
    // =============================================
    $stmt = $db->query("
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m') as month,
            COUNT(*) as new_subscribers,
            SUM(CASE WHEN payment_type = 'oneinfinite' AND status = 'active' THEN 1 ELSE 0 END) as paid,
            SUM(CASE WHEN status = 'trial' THEN 1 ELSE 0 END) as trials
        FROM subscribers
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY month DESC
    ");
    $monthlyData = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // =============================================
    // 10. USUARIOS ACTIVOS ÚLTIMOS 7 DÍAS
    // =============================================
    $stmt = $db->query("
        SELECT COUNT(*) as total 
        FROM user_progress 
        WHERE last_activity >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ");
    $activeLastWeek = (int)$stmt->fetch()['total'];
    
    // =============================================
    // CALCULAR TASAS DE CONVERSIÓN
    // =============================================
    $funnelMetrics = [
        'total_users' => $totalUsers,
        'free_users' => $freeUsers,
        'level0_completers' => $level0Completers,
        'level0_completers_not_subscribed' => $level0CompletersNotSubscribed,
        'level0_completers_trialed' => $level0CompletersTrialed,
        'level0_completers_paid' => $level0CompletersPaid,
        'active_trials_with_card' => $activeTrialsWithCard,
        'active_trials_manual' => $activeTrialsManual,
        'paid_subscribers' => $paidSubscribers,
        'invited_vip' => $invitedVIP,
        'expired_trials' => $expiredTrials,
        'active_last_week' => $activeLastWeek,
    ];
    
    // Calcular porcentajes de conversión
    $conversionRates = [
        'registration_to_level0' => $totalUsers > 0 
            ? round(($level0Completers / $totalUsers) * 100, 1) 
            : 0,
        'level0_to_trial' => $level0Completers > 0 
            ? round((($level0CompletersTrialed + $level0CompletersPaid) / $level0Completers) * 100, 1) 
            : 0,
        'trial_to_paid' => ($activeTrialsWithCard + $paidSubscribers) > 0 
            ? round(($paidSubscribers / ($activeTrialsWithCard + $paidSubscribers + $expiredTrials)) * 100, 1) 
            : 0,
        'overall' => $totalUsers > 0 
            ? round(($paidSubscribers / $totalUsers) * 100, 1) 
            : 0,
    ];
    
    echo json_encode([
        'success' => true,
        'metrics' => $funnelMetrics,
        'conversion_rates' => $conversionRates,
        'monthly_data' => $monthlyData,
        'level0_completers_details' => array_slice($userDetails, 0, 50), // Top 50
        'generated_at' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    error_log("Conversion Metrics Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}




