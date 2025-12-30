<?php
/**
 * Analytics Metrics API - Full Business Intelligence
 * Métricas completas para análisis de negocio
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

// Auth check
$isValidAdmin = false;
if (isset($_GET['admin_password']) && defined('ADMIN_PASSWORD') && $_GET['admin_password'] === ADMIN_PASSWORD) {
    $isValidAdmin = true;
}

if (!$isValidAdmin) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

try {
    $pdo = getSecureDBConnection();
    
    $metrics = [
        'generated_at' => date('Y-m-d H:i:s'),
        'overview' => getOverviewMetrics($pdo),
        'funnel' => getFullFunnelMetrics($pdo),
        'subscription_journey' => getSubscriptionJourney($pdo),
        'engagement' => getEngagementMetrics($pdo),
        'churn_analysis' => getChurnAnalysis($pdo),
        'cohorts' => getCohortAnalysis($pdo),
        'revenue' => getRevenueMetrics($pdo),
        'content_engagement' => getContentEngagement($pdo),
        'user_segments' => getUserSegments($pdo),
        'trends' => getTrends($pdo),
        'alerts' => getAlerts($pdo),
        'quick_actions' => getQuickActions($pdo)
    ];
    
    echo json_encode($metrics, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

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
 * Overview - Key metrics at a glance
 */
function getOverviewMetrics($pdo) {
    return [
        'total_users' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users"),
        'total_subscribers' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE status IN ('active', 'trial')"),
        'paid_subscribers' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE status = 'active' AND payment_type IN ('oneinfinite', 'paid', 'gumroad')"),
        'trial_subscribers' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE status = 'trial'"),
        'free_users' => (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users u 
            WHERE NOT EXISTS (
                SELECT 1 FROM subscribers s 
                WHERE LOWER(s.email) = LOWER(u.email) AND s.status IN ('active', 'trial')
            )
        "),
        'new_users_7d' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        'new_users_30d' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)"),
        'active_users_7d' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        'active_users_30d' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY)"),
    ];
}

/**
 * Full Funnel - From visit to paid subscriber
 */
function getFullFunnelMetrics($pdo) {
    // Clicks en "Suscribirse" (tracked via subscription_events or page_views)
    $clicksOnSubscribe = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscription_events 
        WHERE event_type = 'subscribe_click' 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    // Si no hay tracking de clicks, estimamos desde registros
    if ($clicksOnSubscribe === 0) {
        $clicksOnSubscribe = (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
        ") * 3; // Estimación: 3 visitas por registro
    }
    
    $registrations = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    $startedLevel0 = (int)safeQuery($pdo, "
        SELECT COUNT(DISTINCT email) FROM user_progress 
        WHERE completed_steps LIKE '%l0-%' 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    $completedLevel0 = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM user_progress 
        WHERE JSON_LENGTH(JSON_EXTRACT(completed_steps, '$[*]')) >= 50
    ");
    
    $startedTrial = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    $trialWithCard = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE payment_type = 'oneinfinite' 
        AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    $converted = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE status = 'active' 
        AND payment_type IN ('oneinfinite', 'paid', 'gumroad')
        AND created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    return [
        'steps' => [
            ['name' => 'Clicks en Suscribirse', 'value' => $clicksOnSubscribe, 'icon' => '👆'],
            ['name' => 'Registros', 'value' => $registrations, 'icon' => '📝'],
            ['name' => 'Empezaron Nivel 0', 'value' => $startedLevel0, 'icon' => '🎮'],
            ['name' => 'Completaron Nivel 0', 'value' => $completedLevel0, 'icon' => '✅'],
            ['name' => 'Iniciaron Trial', 'value' => $startedTrial, 'icon' => '🎁'],
            ['name' => 'Trial con Tarjeta', 'value' => $trialWithCard, 'icon' => '💳'],
            ['name' => 'Pagaron', 'value' => $converted, 'icon' => '💰'],
        ],
        'conversion_rates' => [
            'click_to_register' => $clicksOnSubscribe > 0 ? round(($registrations / $clicksOnSubscribe) * 100, 1) : 0,
            'register_to_level0' => $registrations > 0 ? round(($startedLevel0 / $registrations) * 100, 1) : 0,
            'level0_to_trial' => $completedLevel0 > 0 ? round(($startedTrial / $completedLevel0) * 100, 1) : 0,
            'trial_to_paid' => $startedTrial > 0 ? round(($converted / $startedTrial) * 100, 1) : 0,
            'overall' => $registrations > 0 ? round(($converted / $registrations) * 100, 1) : 0,
        ],
        'drop_offs' => [
            ['stage' => 'No registraron', 'count' => max(0, $clicksOnSubscribe - $registrations)],
            ['stage' => 'No empezaron Nivel 0', 'count' => max(0, $registrations - $startedLevel0)],
            ['stage' => 'No completaron Nivel 0', 'count' => max(0, $startedLevel0 - $completedLevel0)],
            ['stage' => 'No iniciaron Trial', 'count' => max(0, $completedLevel0 - $startedTrial)],
            ['stage' => 'No pagaron', 'count' => max(0, $startedTrial - $converted)],
        ]
    ];
}

/**
 * Subscription Journey - What happens after subscribing
 */
function getSubscriptionJourney($pdo) {
    // Suscriptores que completaron nivel 1
    $completedLevel1 = safeQueryAll($pdo, "
        SELECT 
            s.email,
            s.status,
            s.created_at as subscribed_at,
            s.cancelled_at,
            up.completed_steps
        FROM subscribers s
        LEFT JOIN user_progress up ON LOWER(up.email) = LOWER(s.email)
        WHERE s.status IN ('active', 'cancelled')
    ");
    
    $stats = [
        'total_ever_subscribed' => count($completedLevel1),
        'completed_level1_then_cancelled' => 0,
        'completed_level2_then_cancelled' => 0,
        'active_completing_level1' => 0,
        'active_completing_level2' => 0,
        'cancelled_before_level1' => 0,
        'cancelled_after_level1' => 0,
        'avg_days_to_cancel' => 0,
    ];
    
    $cancelDays = [];
    
    foreach ($completedLevel1 as $sub) {
        $steps = json_decode($sub['completed_steps'] ?? '[]', true) ?: [];
        $level1Steps = array_filter($steps, fn($s) => strpos($s, 'l1-') === 0);
        $level2Steps = array_filter($steps, fn($s) => strpos($s, 'l2-') === 0);
        $level1Percent = count($level1Steps) / 50 * 100; // Aproximado
        $level2Percent = count($level2Steps) / 50 * 100;
        
        if ($sub['status'] === 'cancelled') {
            if ($sub['cancelled_at'] && $sub['subscribed_at']) {
                $days = (strtotime($sub['cancelled_at']) - strtotime($sub['subscribed_at'])) / 86400;
                $cancelDays[] = $days;
            }
            
            if ($level1Percent >= 80) {
                $stats['completed_level1_then_cancelled']++;
                if ($level2Percent >= 80) {
                    $stats['completed_level2_then_cancelled']++;
                }
            } else {
                $stats['cancelled_before_level1']++;
            }
        } else {
            if ($level1Percent >= 50) {
                $stats['active_completing_level1']++;
            }
            if ($level2Percent >= 50) {
                $stats['active_completing_level2']++;
            }
        }
    }
    
    $stats['avg_days_to_cancel'] = count($cancelDays) > 0 ? round(array_sum($cancelDays) / count($cancelDays), 1) : 0;
    
    // Razones de cancelación
    $stats['cancellation_reasons'] = safeQueryAll($pdo, "
        SELECT 
            COALESCE(notes, 'No especificado') as reason,
            COUNT(*) as count
        FROM subscribers
        WHERE status = 'cancelled'
        GROUP BY notes
        ORDER BY count DESC
        LIMIT 10
    ");
    
    return $stats;
}

/**
 * Engagement Metrics
 */
function getEngagementMetrics($pdo) {
    $xpStats = safeQueryAll($pdo, "
        SELECT 
            AVG(xp) as avg_xp,
            MAX(xp) as max_xp,
            SUM(xp) as total_xp,
            AVG(current_streak) as avg_streak,
            MAX(longest_streak) as max_streak
        FROM user_progress WHERE xp > 0
    ");
    
    $stats = $xpStats[0] ?? [];
    
    return [
        'avg_xp' => round($stats['avg_xp'] ?? 0),
        'max_xp' => (int)($stats['max_xp'] ?? 0),
        'total_xp' => (int)($stats['total_xp'] ?? 0),
        'avg_streak' => round($stats['avg_streak'] ?? 0, 1),
        'max_streak' => (int)($stats['max_streak'] ?? 0),
        'users_with_streak_3plus' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM user_progress WHERE current_streak >= 3"),
        'users_with_streak_7plus' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM user_progress WHERE current_streak >= 7"),
        'total_projects_completed' => (int)safeQuery($pdo, "
            SELECT SUM(JSON_LENGTH(completed_projects)) FROM user_progress 
            WHERE completed_projects IS NOT NULL AND completed_projects != '[]'
        "),
        'total_videos_watched' => (int)safeQuery($pdo, "
            SELECT SUM(JSON_LENGTH(watched_videos)) FROM user_progress 
            WHERE watched_videos IS NOT NULL AND watched_videos != '[]'
        "),
        'users_by_activity' => safeQueryAll($pdo, "
            SELECT 
                CASE 
                    WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 1 DAY) THEN 'Hoy'
                    WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 'Esta semana'
                    WHEN last_activity >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 'Este mes'
                    ELSE 'Inactivo 30d+'
                END as period,
                COUNT(*) as count
            FROM user_progress
            GROUP BY period
        "),
        'top_users' => safeQueryAll($pdo, "
            SELECT email, xp, current_streak, datacoins
            FROM user_progress
            ORDER BY xp DESC
            LIMIT 10
        ")
    ];
}

/**
 * Churn Analysis
 */
function getChurnAnalysis($pdo) {
    $cancelled30d = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE status = 'cancelled' 
        AND cancelled_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
    ");
    
    $activeStart = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE status = 'active' 
        OR (status = 'cancelled' AND cancelled_at >= DATE_SUB(NOW(), INTERVAL 30 DAY))
    ");
    
    return [
        'cancelled_7d' => (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM subscribers 
            WHERE status = 'cancelled' 
            AND cancelled_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        "),
        'cancelled_30d' => $cancelled30d,
        'cancelled_90d' => (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM subscribers 
            WHERE status = 'cancelled' 
            AND cancelled_at >= DATE_SUB(NOW(), INTERVAL 90 DAY)
        "),
        'churn_rate_30d' => $activeStart > 0 ? round(($cancelled30d / $activeStart) * 100, 2) : 0,
        'at_risk_users' => (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users 
            WHERE last_login BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND DATE_SUB(NOW(), INTERVAL 14 DAY)
            AND login_count > 0
        "),
        'inactive_users' => (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM users 
            WHERE last_login < DATE_SUB(NOW(), INTERVAL 30 DAY)
            AND login_count > 0
        "),
        'trial_expired_not_converted' => (int)safeQuery($pdo, "
            SELECT COUNT(*) FROM subscribers 
            WHERE status = 'trial' 
            AND trial_ends_at < NOW()
        "),
        'churn_by_month' => safeQueryAll($pdo, "
            SELECT 
                DATE_FORMAT(cancelled_at, '%Y-%m') as month,
                COUNT(*) as count
            FROM subscribers
            WHERE status = 'cancelled' AND cancelled_at IS NOT NULL
            GROUP BY month
            ORDER BY month DESC
            LIMIT 6
        "),
        'churn_by_tenure' => safeQueryAll($pdo, "
            SELECT 
                CASE 
                    WHEN DATEDIFF(cancelled_at, created_at) < 7 THEN '< 1 semana'
                    WHEN DATEDIFF(cancelled_at, created_at) < 30 THEN '1-4 semanas'
                    WHEN DATEDIFF(cancelled_at, created_at) < 90 THEN '1-3 meses'
                    ELSE '3+ meses'
                END as tenure,
                COUNT(*) as count
            FROM subscribers
            WHERE status = 'cancelled' AND cancelled_at IS NOT NULL
            GROUP BY tenure
        ")
    ];
}

/**
 * Cohort Analysis
 */
function getCohortAnalysis($pdo) {
    return [
        'by_registration_month' => safeQueryAll($pdo, "
            SELECT 
                DATE_FORMAT(u.created_at, '%Y-%m') as cohort,
                COUNT(DISTINCT u.id) as total_users,
                COUNT(DISTINCT CASE WHEN u.last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN u.id END) as active_now,
                COUNT(DISTINCT s.id) as converted,
                COUNT(DISTINCT CASE WHEN s.status = 'cancelled' THEN s.id END) as churned
            FROM users u
            LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
            WHERE u.created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
            GROUP BY cohort
            ORDER BY cohort DESC
        "),
        'retention_by_week' => safeQueryAll($pdo, "
            SELECT 
                FLOOR(DATEDIFF(NOW(), created_at) / 7) as weeks_since_signup,
                COUNT(*) as total,
                SUM(CASE WHEN last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) as still_active
            FROM users
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 12 WEEK)
            GROUP BY weeks_since_signup
            ORDER BY weeks_since_signup
        ")
    ];
}

/**
 * Revenue Metrics - Comprehensive SaaS Metrics
 */
function getRevenueMetrics($pdo) {
    $MONTHLY_PRICE = 15; // USD
    
    // Current MRR
    $currentPaidSubs = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE status = 'active' AND payment_type IN ('oneinfinite', 'paid', 'gumroad')
    ");
    $currentMRR = $currentPaidSubs * $MONTHLY_PRICE;
    
    // Previous month MRR (for growth calculation)
    $prevMonthPaidSubs = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE (
            (status = 'active' AND payment_type IN ('oneinfinite', 'paid', 'gumroad') 
             AND created_at < DATE_SUB(NOW(), INTERVAL 1 MONTH))
            OR (status = 'cancelled' AND cancelled_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH))
        )
    ");
    $prevMRR = $prevMonthPaidSubs * $MONTHLY_PRICE;
    
    // MRR Growth Rate
    $mrrGrowth = $prevMRR > 0 ? round((($currentMRR - $prevMRR) / $prevMRR) * 100, 1) : 0;
    
    // Calculate real LTV
    $avgMonthsData = safeQueryAll($pdo, "
        SELECT 
            AVG(DATEDIFF(COALESCE(cancelled_at, NOW()), created_at) / 30) as avg_months,
            COUNT(*) as total_subs,
            SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_count
        FROM subscribers
        WHERE payment_type IN ('oneinfinite', 'paid', 'gumroad')
    ");
    $avgMonths = $avgMonthsData[0]['avg_months'] ?? 3;
    $totalSubs = $avgMonthsData[0]['total_subs'] ?? 1;
    $cancelledCount = $avgMonthsData[0]['cancelled_count'] ?? 0;
    
    // Real LTV = ARPU * Average Customer Lifespan
    $ltv = round($MONTHLY_PRICE * max(1, $avgMonths), 2);
    
    // Churn Rate (monthly)
    $monthlyChurnRate = $totalSubs > 0 ? round(($cancelledCount / $totalSubs) / max(1, $avgMonths) * 100, 2) : 0;
    
    // ARPU (Average Revenue Per User) - including free users
    $totalUsers = (int)safeQuery($pdo, "SELECT COUNT(*) FROM users");
    $arpu = $totalUsers > 0 ? round($currentMRR / $totalUsers, 2) : 0;
    
    // ARPPU (Average Revenue Per Paying User)
    $arppu = $currentPaidSubs > 0 ? round($currentMRR / $currentPaidSubs, 2) : 0;
    
    // Net Revenue Retention (NRR)
    // Calcular ingresos de suscriptores que estaban hace 1 mes vs ahora
    $revenueFromExistingCustomers = (int)safeQuery($pdo, "
        SELECT COUNT(*) * {$MONTHLY_PRICE} FROM subscribers 
        WHERE status = 'active' 
        AND payment_type IN ('oneinfinite', 'paid', 'gumroad')
        AND created_at < DATE_SUB(NOW(), INTERVAL 1 MONTH)
    ");
    $prevMonthRevenueFromThoseCustomers = (int)safeQuery($pdo, "
        SELECT COUNT(*) * {$MONTHLY_PRICE} FROM subscribers 
        WHERE payment_type IN ('oneinfinite', 'paid', 'gumroad')
        AND created_at < DATE_SUB(NOW(), INTERVAL 1 MONTH)
    ");
    $nrr = $prevMonthRevenueFromThoseCustomers > 0 
        ? round(($revenueFromExistingCustomers / $prevMonthRevenueFromThoseCustomers) * 100, 1) 
        : 100;
    
    // DAU/MAU ratio (Stickiness)
    $dau = (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE DATE(last_login) = CURDATE()");
    $mau = (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
    $stickiness = $mau > 0 ? round(($dau / $mau) * 100, 1) : 0;
    
    // WAU (Weekly Active Users) for additional context
    $wau = (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY)");
    
    // Trial to Paid Conversion Rate
    $totalTrials = (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE payment_type IN ('oneinfinite', 'trial_with_card', 'trial_no_card')");
    $convertedFromTrial = (int)safeQuery($pdo, "
        SELECT COUNT(*) FROM subscribers 
        WHERE status = 'active' AND payment_type IN ('oneinfinite', 'paid', 'gumroad')
    ");
    $trialConversionRate = $totalTrials > 0 ? round(($convertedFromTrial / $totalTrials) * 100, 1) : 0;
    
    // Expansion Revenue (upgrades/downgrades - simplified since we have single tier)
    // For now just tracking if people extend subscriptions
    
    // CAC Payback Period (estimated - assuming $0 marketing cost for organic)
    $cacPayback = $monthlyChurnRate > 0 ? round(1 / ($monthlyChurnRate / 100), 1) : 12;
    
    return [
        // Core SaaS Metrics
        'mrr' => $currentMRR,
        'mrr_growth_rate' => $mrrGrowth,
        'mrr_previous' => $prevMRR,
        
        // Customer Value
        'ltv' => $ltv,
        'ltv_cac_ratio' => $ltv, // CAC = 0 for organic
        'avg_months_subscribed' => round($avgMonths, 1),
        'arpu' => $arpu,
        'arppu' => $arppu,
        
        // Retention
        'monthly_churn_rate' => $monthlyChurnRate,
        'nrr' => $nrr, // Net Revenue Retention
        'cac_payback_months' => $cacPayback,
        
        // Engagement
        'dau' => $dau,
        'wau' => $wau,
        'mau' => $mau,
        'stickiness' => $stickiness, // DAU/MAU %
        
        // Conversion
        'trial_conversion_rate' => $trialConversionRate,
        'total_trials_ever' => $totalTrials,
        'paid_subscribers' => $currentPaidSubs,
        
        // Historical
        'subscribers_by_plan' => safeQueryAll($pdo, "
            SELECT 
                COALESCE(plan_type, 'monthly') as plan,
                COUNT(*) as count
            FROM subscribers
            WHERE status = 'active'
            GROUP BY plan
        "),
        'revenue_by_month' => safeQueryAll($pdo, "
            SELECT 
                DATE_FORMAT(created_at, '%Y-%m') as month,
                COUNT(*) as new_subscribers,
                COUNT(*) * {$MONTHLY_PRICE} as estimated_revenue
            FROM subscribers
            WHERE payment_type IN ('oneinfinite', 'paid', 'gumroad')
            GROUP BY month
            ORDER BY month DESC
            LIMIT 12
        "),
        'mrr_by_month' => safeQueryAll($pdo, "
            SELECT 
                DATE_FORMAT(d.date, '%Y-%m') as month,
                COALESCE(
                    (SELECT COUNT(*) * {$MONTHLY_PRICE} FROM subscribers 
                     WHERE status = 'active' 
                     AND payment_type IN ('oneinfinite', 'paid', 'gumroad')
                     AND created_at <= d.date
                     AND (cancelled_at IS NULL OR cancelled_at > d.date)
                    ), 0
                ) as mrr
            FROM (
                SELECT LAST_DAY(DATE_SUB(NOW(), INTERVAL n MONTH)) as date
                FROM (SELECT 0 as n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5) months
            ) d
            ORDER BY month DESC
        "),
        
        // Health Score (0-100)
        'health_score' => calculateHealthScore($mrrGrowth, $monthlyChurnRate, $stickiness, $trialConversionRate, $nrr)
    ];
}

/**
 * Calculate overall business health score (0-100)
 */
function calculateHealthScore($mrrGrowth, $churnRate, $stickiness, $conversionRate, $nrr) {
    $score = 50; // Base score
    
    // MRR Growth (+/- 20 points)
    if ($mrrGrowth > 10) $score += 20;
    elseif ($mrrGrowth > 5) $score += 15;
    elseif ($mrrGrowth > 0) $score += 10;
    elseif ($mrrGrowth > -5) $score += 0;
    else $score -= 10;
    
    // Churn Rate (+/- 20 points)
    if ($churnRate < 2) $score += 20;
    elseif ($churnRate < 5) $score += 15;
    elseif ($churnRate < 10) $score += 5;
    else $score -= 10;
    
    // Stickiness (+/- 15 points)
    if ($stickiness > 20) $score += 15;
    elseif ($stickiness > 10) $score += 10;
    elseif ($stickiness > 5) $score += 5;
    
    // Conversion Rate (+/- 10 points)
    if ($conversionRate > 20) $score += 10;
    elseif ($conversionRate > 10) $score += 5;
    
    // NRR (+/- 15 points)
    if ($nrr > 100) $score += 15;
    elseif ($nrr > 90) $score += 10;
    elseif ($nrr > 80) $score += 5;
    else $score -= 5;
    
    return max(0, min(100, $score));
}

/**
 * Content Engagement
 */
function getContentEngagement($pdo) {
    return [
        'level_completion' => [
            'level0' => [
                'started' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM user_progress WHERE completed_steps LIKE '%l0-%'"),
                'completed_50' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM user_progress WHERE JSON_LENGTH(JSON_EXTRACT(completed_steps, '$[*]')) >= 25"),
                'completed_100' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM user_progress WHERE JSON_LENGTH(JSON_EXTRACT(completed_steps, '$[*]')) >= 50"),
            ],
            'level1' => [
                'started' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM user_progress WHERE completed_steps LIKE '%l1-%'"),
                'completed_50' => 0, // Would need more complex query
                'completed_100' => 0,
            ],
        ],
        'most_completed_steps' => safeQueryAll($pdo, "
            SELECT step_id, COUNT(*) as completions
            FROM (
                SELECT JSON_UNQUOTE(JSON_EXTRACT(completed_steps, CONCAT('$[', n.n, ']'))) as step_id
                FROM user_progress
                CROSS JOIN (
                    SELECT 0 as n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4
                    UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
                ) n
                WHERE JSON_UNQUOTE(JSON_EXTRACT(completed_steps, CONCAT('$[', n.n, ']'))) IS NOT NULL
            ) steps
            WHERE step_id IS NOT NULL AND step_id != 'null'
            GROUP BY step_id
            ORDER BY completions DESC
            LIMIT 10
        "),
        'videos_watched_distribution' => safeQueryAll($pdo, "
            SELECT 
                CASE 
                    WHEN JSON_LENGTH(watched_videos) = 0 OR watched_videos IS NULL THEN '0 videos'
                    WHEN JSON_LENGTH(watched_videos) <= 3 THEN '1-3 videos'
                    WHEN JSON_LENGTH(watched_videos) <= 10 THEN '4-10 videos'
                    ELSE '10+ videos'
                END as videos_range,
                COUNT(*) as users
            FROM user_progress
            GROUP BY videos_range
        ")
    ];
}

/**
 * User Segments
 */
function getUserSegments($pdo) {
    return [
        'by_engagement' => safeQueryAll($pdo, "
            SELECT 
                CASE 
                    WHEN xp >= 5000 THEN '🏆 Power Users (5000+ XP)'
                    WHEN xp >= 2000 THEN '⭐ Engaged (2000-5000 XP)'
                    WHEN xp >= 500 THEN '📈 Active (500-2000 XP)'
                    WHEN xp > 0 THEN '🌱 Beginners (1-500 XP)'
                    ELSE '👻 No activity'
                END as segment,
                COUNT(*) as count
            FROM user_progress
            GROUP BY segment
            ORDER BY MIN(xp) DESC
        "),
        'by_subscription' => safeQueryAll($pdo, "
            SELECT 
                CASE 
                    WHEN s.status = 'active' AND s.payment_type IN ('oneinfinite', 'paid', 'gumroad') THEN '💰 Paid'
                    WHEN s.status = 'trial' THEN '🎁 Trial'
                    WHEN s.status = 'cancelled' THEN '❌ Cancelled'
                    ELSE '🆓 Free'
                END as segment,
                COUNT(DISTINCT u.id) as count
            FROM users u
            LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
            GROUP BY segment
        "),
        'potential_upgrades' => safeQueryAll($pdo, "
            SELECT u.email, u.name, up.xp, up.current_streak
            FROM users u
            JOIN user_progress up ON LOWER(u.email) = LOWER(up.email)
            WHERE NOT EXISTS (
                SELECT 1 FROM subscribers s 
                WHERE LOWER(s.email) = LOWER(u.email) AND s.status IN ('active', 'trial')
            )
            AND up.xp >= 500
            ORDER BY up.xp DESC
            LIMIT 20
        ")
    ];
}

/**
 * Trends - Week over week comparisons
 */
function getTrends($pdo) {
    $thisWeek = [
        'registrations' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        'new_subscribers' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        'cancellations' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE cancelled_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        'active_users' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE last_login >= DATE_SUB(NOW(), INTERVAL 7 DAY)"),
    ];
    
    $lastWeek = [
        'registrations' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE created_at BETWEEN DATE_SUB(NOW(), INTERVAL 14 DAY) AND DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        'new_subscribers' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE created_at BETWEEN DATE_SUB(NOW(), INTERVAL 14 DAY) AND DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        'cancellations' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM subscribers WHERE cancelled_at BETWEEN DATE_SUB(NOW(), INTERVAL 14 DAY) AND DATE_SUB(NOW(), INTERVAL 7 DAY)"),
        'active_users' => (int)safeQuery($pdo, "SELECT COUNT(*) FROM users WHERE last_login BETWEEN DATE_SUB(NOW(), INTERVAL 14 DAY) AND DATE_SUB(NOW(), INTERVAL 7 DAY)"),
    ];
    
    $trends = [];
    foreach ($thisWeek as $key => $value) {
        $prev = $lastWeek[$key] ?: 1;
        $change = round((($value - $prev) / $prev) * 100, 1);
        $trends[$key] = [
            'this_week' => $value,
            'last_week' => $lastWeek[$key],
            'change_percent' => $change,
            'trend' => $change > 0 ? 'up' : ($change < 0 ? 'down' : 'stable')
        ];
    }
    
    return $trends;
}

/**
 * Alerts - Issues that need attention with actionable data
 */
function getAlerts($pdo) {
    $alerts = [];
    
    // High churn
    $churnRate = (float)safeQuery($pdo, "
        SELECT 
            COUNT(CASE WHEN status = 'cancelled' AND cancelled_at >= DATE_SUB(NOW(), INTERVAL 30 DAY) THEN 1 END) * 100.0 /
            NULLIF(COUNT(CASE WHEN status = 'active' OR (status = 'cancelled' AND cancelled_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)) THEN 1 END), 0)
        FROM subscribers
    ");
    if ($churnRate > 10) {
        $alerts[] = [
            'type' => 'danger',
            'title' => 'Churn Alto',
            'message' => "Churn rate del {$churnRate}% en los últimos 30 días",
            'action' => 'Revisar razones de cancelación',
            'action_id' => 'review_churn'
        ];
    }
    
    // Trials expiring soon
    $expiringTrials = safeQueryAll($pdo, "
        SELECT email, name, trial_ends_at, 
               DATEDIFF(trial_ends_at, NOW()) as days_left
        FROM subscribers 
        WHERE status = 'trial' 
        AND trial_ends_at BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 3 DAY)
        ORDER BY trial_ends_at ASC
    ");
    if (count($expiringTrials) > 0) {
        $alerts[] = [
            'type' => 'warning',
            'title' => 'Trials por Expirar',
            'message' => count($expiringTrials) . " trials expiran en los próximos 3 días",
            'action' => 'Enviar emails de conversión',
            'action_id' => 'email_expiring_trials',
            'users' => $expiringTrials
        ];
    }
    
    // Low engagement subscribers - WITH DETAILS
    $lowEngagementUsers = safeQueryAll($pdo, "
        SELECT 
            s.email, 
            s.name,
            s.status,
            s.payment_type,
            s.created_at as subscribed_at,
            COALESCE(up.xp, 0) as xp,
            COALESCE(up.current_streak, 0) as streak,
            DATEDIFF(NOW(), s.created_at) as days_subscribed,
            u.last_login
        FROM subscribers s
        LEFT JOIN user_progress up ON LOWER(s.email) = LOWER(up.email)
        LEFT JOIN users u ON LOWER(s.email) = LOWER(u.email)
        WHERE s.status IN ('active', 'trial')
        AND (up.xp IS NULL OR up.xp < 100)
        ORDER BY s.created_at DESC
    ");
    if (count($lowEngagementUsers) > 0) {
        $alerts[] = [
            'type' => 'warning',
            'title' => 'Suscriptores con Bajo Engagement',
            'message' => count($lowEngagementUsers) . " suscriptores activos con menos de 100 XP",
            'action' => 'Enviar emails de onboarding',
            'action_id' => 'email_low_engagement',
            'users' => $lowEngagementUsers
        ];
    }
    
    // Users at risk (14-30 days inactive)
    $atRiskUsers = safeQueryAll($pdo, "
        SELECT 
            u.email,
            u.name,
            u.last_login,
            DATEDIFF(NOW(), u.last_login) as days_inactive,
            COALESCE(up.xp, 0) as xp,
            s.status as subscription_status
        FROM users u
        LEFT JOIN user_progress up ON LOWER(u.email) = LOWER(up.email)
        LEFT JOIN subscribers s ON LOWER(u.email) = LOWER(s.email)
        WHERE u.last_login BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND DATE_SUB(NOW(), INTERVAL 14 DAY)
        AND u.login_count > 0
        ORDER BY u.last_login ASC
        LIMIT 50
    ");
    if (count($atRiskUsers) > 0) {
        $alerts[] = [
            'type' => 'info',
            'title' => 'Usuarios en Riesgo',
            'message' => count($atRiskUsers) . " usuarios no han entrado en 14-30 días",
            'action' => 'Campaña de re-engagement',
            'action_id' => 'email_at_risk',
            'users' => $atRiskUsers
        ];
    }
    
    // Inactive subscribers (paying but not using)
    $inactiveSubscribers = safeQueryAll($pdo, "
        SELECT 
            s.email,
            s.name,
            s.status,
            s.payment_type,
            u.last_login,
            DATEDIFF(NOW(), u.last_login) as days_inactive,
            COALESCE(up.xp, 0) as xp
        FROM subscribers s
        JOIN users u ON LOWER(s.email) = LOWER(u.email)
        LEFT JOIN user_progress up ON LOWER(s.email) = LOWER(up.email)
        WHERE s.status = 'active'
        AND s.payment_type IN ('oneinfinite', 'paid', 'gumroad')
        AND u.last_login < DATE_SUB(NOW(), INTERVAL 14 DAY)
        ORDER BY u.last_login ASC
    ");
    if (count($inactiveSubscribers) > 0) {
        $alerts[] = [
            'type' => 'danger',
            'title' => 'Suscriptores Pagos Inactivos',
            'message' => count($inactiveSubscribers) . " suscriptores pagos no entran hace 14+ días",
            'action' => 'Email urgente de re-activación',
            'action_id' => 'email_inactive_paid',
            'users' => $inactiveSubscribers
        ];
    }
    
    return $alerts;
}

/**
 * Quick Actions - Executable actions from admin panel
 */
function getQuickActions($pdo) {
    return [
        [
            'id' => 'email_low_engagement',
            'title' => 'Email a suscriptores con bajo XP',
            'description' => 'Enviar email de onboarding a suscriptores con menos de 100 XP',
            'icon' => '📧',
            'type' => 'email'
        ],
        [
            'id' => 'email_expiring_trials',
            'title' => 'Email a trials por expirar',
            'description' => 'Enviar recordatorio de conversión a trials que expiran pronto',
            'icon' => '⏰',
            'type' => 'email'
        ],
        [
            'id' => 'email_at_risk',
            'title' => 'Email de re-engagement',
            'description' => 'Enviar email a usuarios que no entran hace 14-30 días',
            'icon' => '🔄',
            'type' => 'email'
        ],
        [
            'id' => 'email_inactive_paid',
            'title' => 'Email a pagos inactivos',
            'description' => 'Enviar email urgente a suscriptores pagos que no usan la plataforma',
            'icon' => '🚨',
            'type' => 'email'
        ],
        [
            'id' => 'export_leads',
            'title' => 'Exportar leads potenciales',
            'description' => 'Descargar CSV de usuarios free con alto engagement',
            'icon' => '📊',
            'type' => 'export'
        ],
        [
            'id' => 'grant_trial_extension',
            'title' => 'Extender trials',
            'description' => 'Dar 7 días extra a trials que están por expirar',
            'icon' => '🎁',
            'type' => 'action'
        ]
    ];
}
