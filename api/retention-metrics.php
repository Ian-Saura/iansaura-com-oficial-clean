<?php
/**
 * Retention & Conversion Metrics API
 * Ian Saura Data Engineering Hub
 * 
 * Métricas clave para el Admin Panel:
 * - Conversion Rate (trial → paid)
 * - Retention Rate (usuarios activos)
 * - Churn Rate
 * - Engagement Score
 * - Cohort Analysis
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Admin-Key');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'secure-config.php';

// También permitir acceso con el password de admin
$isValidAdmin = false;
if (isset($_GET['admin_password'])) {
    if (defined('ADMIN_PASSWORD') && $_GET['admin_password'] === ADMIN_PASSWORD) {
        $isValidAdmin = true;
    }
}

// Verificar admin key
if (!$isValidAdmin) {
    $headers = getallheaders();
    $adminKey = $headers['X-Admin-Key'] ?? $_GET['admin_key'] ?? '';
    
    $validAdminEmails = ['iansauradata@gmail.com', 'info@iansaura.com'];
    
    foreach ($validAdminEmails as $email) {
        $today = date('Ymd');
        $expectedKey = 'adm_' . substr(md5($email . '_' . $today . '_iansaura_admin_2024'), 0, 12) . '_' . $today;
        if ($adminKey === $expectedKey) {
            $isValidAdmin = true;
            break;
        }
    }
}

if (!$isValidAdmin) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $pdo = getSecureDBConnection();
    
    // Check which tables exist
    $tables = [];
    $result = $pdo->query("SHOW TABLES");
    while ($row = $result->fetch(PDO::FETCH_NUM)) {
        $tables[] = $row[0];
    }
    
    $metrics = [
        'generated_at' => date('Y-m-d H:i:s'),
        'available_tables' => $tables,
        'conversion' => getConversionMetrics($pdo, $tables),
        'retention' => getRetentionMetrics($pdo, $tables),
        'engagement' => getEngagementMetrics($pdo, $tables),
        'churn' => getChurnMetrics($pdo, $tables),
        'cohorts' => getCohortAnalysis($pdo, $tables),
        'funnel' => getFunnelMetrics($pdo, $tables),
        'health_score' => calculateHealthScore($pdo, $tables)
    ];
    
    echo json_encode($metrics, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);
}

/**
 * Helper function to safely query
 */
function safeQuery($pdo, $sql, $default = 0) {
    try {
        $stmt = $pdo->query($sql);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? array_values($result)[0] : $default;
    } catch (Exception $e) {
        return $default;
    }
}

function safeQueryAll($pdo, $sql, $default = []) {
    try {
        $stmt = $pdo->query($sql);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
        return $default;
    }
}

/**
 * Métricas de Conversión
 */
function getConversionMetrics($pdo, $tables) {
    $metrics = [];
    
    $hasUsers = in_array('users', $tables);
    $hasSubscribers = in_array('subscribers', $tables);
    
    // Total usuarios registrados
    $metrics['total_users'] = $hasUsers 
        ? (int)safeQuery($pdo, "SELECT COUNT(*) FROM users")
        : 0;
    
    if (!$hasSubscribers) {
        $metrics['active_trials'] = 0;
        $metrics['converted_last_90d'] = 0;
        $metrics['expired_trials'] = 0;
        $metrics['trial_to_paid_rate'] = 0;
        $metrics['register_to_trial_rate'] = 0;
        $metrics['conversions_by_month'] = [];
        return $metrics;
    }
    
    // Usuarios con trial activo
    $metrics['active_trials'] = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE trial_ends_at IS NOT NULL AND trial_ends_at > NOW()
    ");
    
    // Usuarios que convirtieron de trial a paid
    $metrics['converted_last_90d'] = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE payment_type = 'paid' 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
    ");
    
    // Trial que expiraron sin convertir
    $metrics['expired_trials'] = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE trial_ends_at IS NOT NULL 
        AND trial_ends_at < NOW() 
        AND (status != 'active' OR payment_type != 'paid')
    ");
    
    // Conversion rate
    $totalTrials = $metrics['active_trials'] + $metrics['converted_last_90d'] + $metrics['expired_trials'];
    $metrics['trial_to_paid_rate'] = $totalTrials > 0 
        ? round(($metrics['converted_last_90d'] / $totalTrials) * 100, 2) 
        : 0;
    
    // Usuarios registrados que empezaron trial
    if ($hasUsers) {
        $startedTrial = (int)safeQuery($pdo, "
            SELECT COUNT(DISTINCT s.email) 
            FROM subscribers s 
            INNER JOIN users u ON s.email = u.email
        ");
        $metrics['register_to_trial_rate'] = $metrics['total_users'] > 0 
            ? round(($startedTrial / $metrics['total_users']) * 100, 2) 
            : 0;
    } else {
        $metrics['register_to_trial_rate'] = 0;
    }
    
    // Conversiones por mes (últimos 6 meses)
    $metrics['conversions_by_month'] = safeQueryAll($pdo, "
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m') as month,
            COUNT(*) as conversions
        FROM subscribers 
        WHERE payment_type = 'paid'
        AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY month DESC
    ");
    
    return $metrics;
}

/**
 * Métricas de Retención
 */
function getRetentionMetrics($pdo, $tables) {
    $metrics = [];
    
    $hasUsers = in_array('users', $tables);
    $hasProgress = in_array('user_progress', $tables);
    
    if (!$hasUsers) {
        return [
            'active_7d' => 0,
            'active_30d' => 0,
            'retention_7d' => 0,
            'retention_30d' => 0,
            'users_with_progress' => 0,
            'avg_days_between_visits' => null,
            'users_by_frequency' => []
        ];
    }
    
    // Usuarios activos (login en últimos 7 días)
    $metrics['active_7d'] = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM users 
        WHERE last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY)
    ");
    
    // Usuarios activos (login en últimos 30 días)
    $metrics['active_30d'] = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM users 
        WHERE last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    // Total usuarios con al menos 1 login
    $totalWithLogin = (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE login_count > 0");
    
    // Retention rates
    $metrics['retention_7d'] = $totalWithLogin > 0 
        ? round(($metrics['active_7d'] / $totalWithLogin) * 100, 2) 
        : 0;
    $metrics['retention_30d'] = $totalWithLogin > 0 
        ? round(($metrics['active_30d'] / $totalWithLogin) * 100, 2) 
        : 0;
    
    // Usuarios con progreso guardado
    $metrics['users_with_progress'] = $hasProgress 
        ? (int)safeQuery($pdo, "SELECT COUNT(*) FROM user_progress WHERE xp > 0")
        : 0;
    
    // Promedio de días entre logins
    $avgDays = safeQuery($pdo, "
        SELECT AVG(DATEDIFF(NOW(), last_login)) 
        FROM users 
        WHERE last_login IS NOT NULL AND login_count > 1
    ", null);
    $metrics['avg_days_between_visits'] = $avgDays ? round($avgDays, 1) : null;
    
    // Usuarios por frecuencia de uso
    $metrics['users_by_frequency'] = safeQueryAll($pdo, "
        SELECT 
            CASE 
                WHEN login_count >= 20 THEN 'power_user'
                WHEN login_count >= 10 THEN 'regular'
                WHEN login_count >= 3 THEN 'casual'
                ELSE 'new'
            END as user_type,
            COUNT(*) as count
        FROM users
        GROUP BY user_type
    ");
    
    return $metrics;
}

/**
 * Métricas de Engagement
 */
function getEngagementMetrics($pdo, $tables) {
    $hasProgress = in_array('user_progress', $tables);
    
    if (!$hasProgress) {
        return [
            'avg_xp' => 0,
            'max_xp' => 0,
            'total_xp' => 0,
            'avg_streak' => 0,
            'max_streak' => 0,
            'users_with_streak' => 0,
            'users_by_level' => [],
            'total_projects_completed' => 0
        ];
    }
    
    $metrics = [];
    
    // Promedio de XP por usuario activo
    $xpStats = safeQueryAll($pdo, "
        SELECT AVG(xp) as avg_xp, MAX(xp) as max_xp, SUM(xp) as total_xp
        FROM user_progress WHERE xp > 0
    ");
    
    if ($xpStats && count($xpStats) > 0) {
        $metrics['avg_xp'] = round($xpStats[0]['avg_xp'] ?? 0);
        $metrics['max_xp'] = (int)($xpStats[0]['max_xp'] ?? 0);
        $metrics['total_xp'] = (int)($xpStats[0]['total_xp'] ?? 0);
    } else {
        $metrics['avg_xp'] = 0;
        $metrics['max_xp'] = 0;
        $metrics['total_xp'] = 0;
    }
    
    // Promedio de streak
    $streakStats = safeQueryAll($pdo, "
        SELECT AVG(current_streak) as avg_streak, MAX(longest_streak) as max_streak
        FROM user_progress WHERE current_streak > 0
    ");
    
    if ($streakStats && count($streakStats) > 0) {
        $metrics['avg_streak'] = round($streakStats[0]['avg_streak'] ?? 0, 1);
        $metrics['max_streak'] = (int)($streakStats[0]['max_streak'] ?? 0);
    } else {
        $metrics['avg_streak'] = 0;
        $metrics['max_streak'] = 0;
    }
    
    // Usuarios con streak activo (>= 3 días)
    $metrics['users_with_streak'] = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM user_progress WHERE current_streak >= 3
    ");
    
    // Distribución de niveles (por XP)
    $metrics['users_by_level'] = safeQueryAll($pdo, "
        SELECT 
            CASE 
                WHEN xp >= 5000 THEN 'Arquitecto'
                WHEN xp >= 3500 THEN 'Lead'
                WHEN xp >= 2500 THEN 'Senior'
                WHEN xp >= 1500 THEN 'Mid'
                WHEN xp >= 800 THEN 'Junior'
                WHEN xp >= 300 THEN 'Aprendiz'
                ELSE 'Novato'
            END as level,
            COUNT(*) as count
        FROM user_progress
        WHERE xp > 0
        GROUP BY level
        ORDER BY MIN(xp) DESC
    ");
    
    // Proyectos completados - check if column exists
    try {
        $stmt = $pdo->query("
            SELECT SUM(JSON_LENGTH(completed_projects)) as total_projects
            FROM user_progress 
            WHERE completed_projects IS NOT NULL AND completed_projects != '[]' AND completed_projects != ''
        ");
        $result = $stmt->fetch();
        $metrics['total_projects_completed'] = (int)($result['total_projects'] ?? 0);
    } catch (Exception $e) {
        $metrics['total_projects_completed'] = 0;
    }
    
    return $metrics;
}

/**
 * Métricas de Churn
 */
function getChurnMetrics($pdo, $tables) {
    $hasUsers = in_array('users', $tables);
    $hasSubscribers = in_array('subscribers', $tables);
    
    $metrics = [];
    
    // Suscriptores que cancelaron este mes
    $metrics['cancelled_30d'] = $hasSubscribers 
        ? (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM subscribers 
            WHERE status = 'cancelled' 
            AND updated_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ")
        : 0;
    
    // Suscriptores activos
    $activeNow = $hasSubscribers 
        ? (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE status = 'active'")
        : 0;
    
    // Churn rate mensual
    $totalAtStart = $activeNow + $metrics['cancelled_30d'];
    $metrics['churn_rate_30d'] = $totalAtStart > 0 
        ? round(($metrics['cancelled_30d'] / $totalAtStart) * 100, 2) 
        : 0;
    
    // Usuarios inactivos (sin login en 30+ días)
    $metrics['inactive_users'] = $hasUsers 
        ? (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users 
            WHERE last_login < DATE_SUB(NOW(), INTERVAL 30 DAY)
            AND login_count > 0
        ")
        : 0;
    
    // Usuarios en riesgo (sin login en 14-30 días)
    $metrics['at_risk_users'] = $hasUsers 
        ? (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users 
            WHERE last_login BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND DATE_SUB(NOW(), INTERVAL 14 DAY)
            AND login_count > 0
        ")
        : 0;
    
    // Razones de cancelación
    $metrics['cancellation_reasons'] = $hasSubscribers 
        ? safeQueryAll($pdo, "
            SELECT notes, COUNT(*) as count 
            FROM subscribers 
            WHERE status = 'cancelled' AND notes IS NOT NULL AND notes != ''
            GROUP BY notes
            LIMIT 10
        ")
        : [];
    
    return $metrics;
}

/**
 * Análisis de Cohortes
 */
function getCohortAnalysis($pdo, $tables) {
    $hasUsers = in_array('users', $tables);
    $hasSubscribers = in_array('subscribers', $tables);
    
    if (!$hasUsers) {
        return ['by_month' => []];
    }
    
    $cohorts = [];
    
    // Cohortes por mes de registro
    $sql = "
        SELECT 
            DATE_FORMAT(u.created_at, '%Y-%m') as cohort_month,
            COUNT(DISTINCT u.id) as total_users,
            COUNT(DISTINCT CASE WHEN u.last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN u.id END) as active_now
            " . ($hasSubscribers ? ", COUNT(DISTINCT s.id) as converted" : ", 0 as converted") . "
        FROM users u
        " . ($hasSubscribers ? "LEFT JOIN subscribers s ON u.email = s.email AND s.payment_type = 'paid'" : "") . "
        WHERE u.created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
        GROUP BY DATE_FORMAT(u.created_at, '%Y-%m')
        ORDER BY cohort_month DESC
    ";
    
    $cohorts['by_month'] = safeQueryAll($pdo, $sql);
    
    // Calcular retention por cohorte
    foreach ($cohorts['by_month'] as &$cohort) {
        $cohort['retention_rate'] = $cohort['total_users'] > 0 
            ? round(($cohort['active_now'] / $cohort['total_users']) * 100, 1) 
            : 0;
        $cohort['conversion_rate'] = $cohort['total_users'] > 0 
            ? round(($cohort['converted'] / $cohort['total_users']) * 100, 1) 
            : 0;
    }
    
    return $cohorts;
}

/**
 * Métricas de Funnel
 */
function getFunnelMetrics($pdo, $tables) {
    $hasPageViews = in_array('page_views', $tables);
    $hasUsers = in_array('users', $tables);
    $hasSubscribers = in_array('subscribers', $tables);
    
    $funnel = [];
    
    // Visitantes únicos (aproximado por page views)
    $funnel['visitors'] = $hasPageViews 
        ? (int)safeQuery($pdo, "
            SELECT COUNT(DISTINCT ip_address) 
            FROM page_views 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ")
        : 0;
    
    // Registros
    $funnel['registrations'] = $hasUsers 
        ? (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ")
        : 0;
    
    // Trials iniciados
    $funnel['trials_started'] = $hasSubscribers 
        ? (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM subscribers 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ")
        : 0;
    
    // Pagos completados
    $funnel['paid_conversions'] = $hasSubscribers 
        ? (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM subscribers 
            WHERE payment_type = 'paid'
            AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ")
        : 0;
    
    // Calcular tasas de conversión del funnel
    $funnel['visitor_to_register'] = $funnel['visitors'] > 0 
        ? round(($funnel['registrations'] / $funnel['visitors']) * 100, 2) 
        : 0;
    $funnel['register_to_trial'] = $funnel['registrations'] > 0 
        ? round(($funnel['trials_started'] / $funnel['registrations']) * 100, 2) 
        : 0;
    $funnel['trial_to_paid'] = $funnel['trials_started'] > 0 
        ? round(($funnel['paid_conversions'] / $funnel['trials_started']) * 100, 2) 
        : 0;
    $funnel['overall_conversion'] = $funnel['visitors'] > 0 
        ? round(($funnel['paid_conversions'] / $funnel['visitors']) * 100, 2) 
        : 0;
    
    return $funnel;
}

/**
 * Health Score - Puntuación general de la plataforma
 */
function calculateHealthScore($pdo, $tables) {
    $hasUsers = in_array('users', $tables);
    $hasSubscribers = in_array('subscribers', $tables);
    
    $scores = [];
    
    // 1. Engagement Score (0-25)
    if ($hasUsers) {
        $avgLogins = safeQuery($pdo, "SELECT AVG(login_count) FROM users WHERE login_count > 0", 0);
        $scores['engagement'] = min(25, round(($avgLogins / 10) * 25));
    } else {
        $scores['engagement'] = 0;
    }
    
    // 2. Retention Score (0-25)
    if ($hasUsers) {
        $retentionData = safeQueryAll($pdo, "
            SELECT 
                COUNT(CASE WHEN last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 END) as active,
                COUNT(*) as total
            FROM users WHERE login_count > 0
        ");
        
        if ($retentionData && count($retentionData) > 0 && $retentionData[0]['total'] > 0) {
            $retentionRate = $retentionData[0]['active'] / $retentionData[0]['total'];
            $scores['retention'] = round($retentionRate * 25);
        } else {
            $scores['retention'] = 0;
        }
    } else {
        $scores['retention'] = 0;
    }
    
    // 3. Conversion Score (0-25)
    if ($hasSubscribers && $hasUsers) {
        $paid = (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE payment_type = 'paid'");
        $total = (int)safeQuery($pdo, "SELECT COUNT(*) FROM users");
        $conversionRate = $total > 0 ? ($paid / $total) : 0;
        $scores['conversion'] = min(25, round($conversionRate * 100));
    } else {
        $scores['conversion'] = 0;
    }
    
    // 4. Growth Score (0-25)
    if ($hasUsers) {
        $thisMonth = (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ");
        $lastMonth = (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users 
            WHERE created_at BETWEEN DATE_SUB(NOW(), INTERVAL 60 DAY) AND DATE_SUB(NOW(), INTERVAL 30 DAY)
        ");
        $growthRate = $lastMonth > 0 ? (($thisMonth - $lastMonth) / $lastMonth) : ($thisMonth > 0 ? 1 : 0);
        $scores['growth'] = min(25, max(0, round(12.5 + ($growthRate * 12.5))));
    } else {
        $scores['growth'] = 0;
    }
    
    $totalScore = array_sum($scores);
    
    return [
        'total' => $totalScore,
        'grade' => $totalScore >= 80 ? 'A' : ($totalScore >= 60 ? 'B' : ($totalScore >= 40 ? 'C' : 'D')),
        'breakdown' => $scores,
        'recommendations' => getRecommendations($scores)
    ];
}

/**
 * Recomendaciones basadas en scores
 */
function getRecommendations($scores) {
    $recommendations = [];
    
    if ($scores['engagement'] < 15) {
        $recommendations[] = [
            'area' => 'Engagement',
            'priority' => 'high',
            'action' => 'Implementar emails de re-engagement para usuarios inactivos',
            'impact' => 'Puede aumentar DAU 20-30%'
        ];
    }
    
    if ($scores['retention'] < 15) {
        $recommendations[] = [
            'area' => 'Retention',
            'priority' => 'high',
            'action' => 'Agregar notificaciones de streak y logros desbloqueables',
            'impact' => 'Puede reducir churn 15-25%'
        ];
    }
    
    if ($scores['conversion'] < 15) {
        $recommendations[] = [
            'area' => 'Conversion',
            'priority' => 'high',
            'action' => 'Optimizar onboarding y mostrar valor rápido',
            'impact' => 'Puede aumentar conversiones 10-20%'
        ];
    }
    
    if ($scores['growth'] < 15) {
        $recommendations[] = [
            'area' => 'Growth',
            'priority' => 'medium',
            'action' => 'Implementar programa de referidos',
            'impact' => 'Puede aumentar adquisición 25-40%'
        ];
    }
    
    return $recommendations;
}