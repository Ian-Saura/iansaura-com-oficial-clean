<?php
/**
 * Gumroad Sales & Metrics API
 * Obtiene métricas de ventas desde Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secrets.php';

// Verificar que el token existe
if (!defined('GUMROAD_ACCESS_TOKEN')) {
    echo json_encode(['success' => false, 'error' => 'GUMROAD_ACCESS_TOKEN not configured']);
    exit();
}

$action = $_GET['action'] ?? 'summary';

try {
    switch ($action) {
        case 'sales':
            // Obtener todas las ventas
            $sales = fetchGumroadSales();
            echo json_encode(['success' => true, 'sales' => $sales]);
            break;
            
        case 'subscribers':
            // Obtener todos los suscriptores
            $subscribers = fetchGumroadSubscribers();
            echo json_encode(['success' => true, 'subscribers' => $subscribers]);
            break;
            
        case 'summary':
        default:
            // Resumen de métricas
            $summary = getGumroadSummary();
            echo json_encode(['success' => true, 'summary' => $summary]);
            break;
    }
} catch (Exception $e) {
    error_log("Gumroad API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Fetch sales from Gumroad API
 */
function fetchGumroadSales() {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/sales?access_token=" . GUMROAD_ACCESS_TOKEN,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Gumroad API returned HTTP $httpCode");
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        throw new Exception("Gumroad API error: " . ($data['message'] ?? 'Unknown error'));
    }
    
    return $data['sales'] ?? [];
}

/**
 * Fetch subscribers from Gumroad API
 */
function fetchGumroadSubscribers($productId = null) {
    $url = "https://api.gumroad.com/v2/subscribers?access_token=" . GUMROAD_ACCESS_TOKEN;
    if ($productId) {
        $url .= "&product_id=" . urlencode($productId);
    }
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Gumroad API returned HTTP $httpCode");
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        throw new Exception("Gumroad API error: " . ($data['message'] ?? 'Unknown error'));
    }
    
    return $data['subscribers'] ?? [];
}

/**
 * Get summary metrics
 */
function getGumroadSummary() {
    $sales = fetchGumroadSales();
    $subscribers = [];
    
    try {
        $subscribers = fetchGumroadSubscribers();
    } catch (Exception $e) {
        // Subscribers endpoint might fail if no subscription products
        error_log("Could not fetch subscribers: " . $e->getMessage());
    }
    
    // Calculate metrics
    $totalRevenue = 0;
    $totalSales = count($sales);
    $refundedCount = 0;
    $refundedAmount = 0;
    $thisMonthRevenue = 0;
    $thisMonthSales = 0;
    $salesByMonth = [];
    
    $currentMonth = date('Y-m');
    
    foreach ($sales as $sale) {
        $price = floatval($sale['price'] ?? 0) / 100; // Gumroad returns cents
        $saleMonth = substr($sale['created_at'] ?? '', 0, 7);
        
        if (isset($sale['refunded']) && $sale['refunded']) {
            $refundedCount++;
            $refundedAmount += $price;
        } else {
            $totalRevenue += $price;
            
            if ($saleMonth === $currentMonth) {
                $thisMonthRevenue += $price;
                $thisMonthSales++;
            }
            
            // Group by month
            if (!isset($salesByMonth[$saleMonth])) {
                $salesByMonth[$saleMonth] = ['count' => 0, 'revenue' => 0];
            }
            $salesByMonth[$saleMonth]['count']++;
            $salesByMonth[$saleMonth]['revenue'] += $price;
        }
    }
    
    // Subscriber metrics
    $activeSubscribers = 0;
    $cancelledSubscribers = 0;
    $trialSubscribers = 0;
    
    foreach ($subscribers as $sub) {
        $status = $sub['status'] ?? '';
        if ($status === 'alive') {
            $activeSubscribers++;
            // Check if in trial
            if (isset($sub['ended_at']) && strtotime($sub['ended_at']) > time()) {
                // Could be in trial period
            }
        } elseif ($status === 'cancelled') {
            $cancelledSubscribers++;
        }
    }
    
    // Sort months
    krsort($salesByMonth);
    
    // Get last 6 months
    $recentMonths = array_slice($salesByMonth, 0, 6, true);
    
    return [
        'total_revenue' => round($totalRevenue, 2),
        'total_sales' => $totalSales,
        'refunded_count' => $refundedCount,
        'refunded_amount' => round($refundedAmount, 2),
        'this_month_revenue' => round($thisMonthRevenue, 2),
        'this_month_sales' => $thisMonthSales,
        'active_subscribers' => $activeSubscribers,
        'cancelled_subscribers' => $cancelledSubscribers,
        'churn_rate' => $activeSubscribers > 0 
            ? round(($cancelledSubscribers / ($activeSubscribers + $cancelledSubscribers)) * 100, 1) 
            : 0,
        'avg_sale_value' => $totalSales > 0 ? round($totalRevenue / $totalSales, 2) : 0,
        'sales_by_month' => $recentMonths,
        'last_updated' => date('Y-m-d H:i:s')
    ];
}


/**
 * Gumroad Sales & Metrics API
 * Obtiene métricas de ventas desde Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secrets.php';

// Verificar que el token existe
if (!defined('GUMROAD_ACCESS_TOKEN')) {
    echo json_encode(['success' => false, 'error' => 'GUMROAD_ACCESS_TOKEN not configured']);
    exit();
}

$action = $_GET['action'] ?? 'summary';

try {
    switch ($action) {
        case 'sales':
            // Obtener todas las ventas
            $sales = fetchGumroadSales();
            echo json_encode(['success' => true, 'sales' => $sales]);
            break;
            
        case 'subscribers':
            // Obtener todos los suscriptores
            $subscribers = fetchGumroadSubscribers();
            echo json_encode(['success' => true, 'subscribers' => $subscribers]);
            break;
            
        case 'summary':
        default:
            // Resumen de métricas
            $summary = getGumroadSummary();
            echo json_encode(['success' => true, 'summary' => $summary]);
            break;
    }
} catch (Exception $e) {
    error_log("Gumroad API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Fetch sales from Gumroad API
 */
function fetchGumroadSales() {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/sales?access_token=" . GUMROAD_ACCESS_TOKEN,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Gumroad API returned HTTP $httpCode");
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        throw new Exception("Gumroad API error: " . ($data['message'] ?? 'Unknown error'));
    }
    
    return $data['sales'] ?? [];
}

/**
 * Fetch subscribers from Gumroad API
 */
function fetchGumroadSubscribers($productId = null) {
    $url = "https://api.gumroad.com/v2/subscribers?access_token=" . GUMROAD_ACCESS_TOKEN;
    if ($productId) {
        $url .= "&product_id=" . urlencode($productId);
    }
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Gumroad API returned HTTP $httpCode");
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        throw new Exception("Gumroad API error: " . ($data['message'] ?? 'Unknown error'));
    }
    
    return $data['subscribers'] ?? [];
}

/**
 * Get summary metrics
 */
function getGumroadSummary() {
    $sales = fetchGumroadSales();
    $subscribers = [];
    
    try {
        $subscribers = fetchGumroadSubscribers();
    } catch (Exception $e) {
        // Subscribers endpoint might fail if no subscription products
        error_log("Could not fetch subscribers: " . $e->getMessage());
    }
    
    // Calculate metrics
    $totalRevenue = 0;
    $totalSales = count($sales);
    $refundedCount = 0;
    $refundedAmount = 0;
    $thisMonthRevenue = 0;
    $thisMonthSales = 0;
    $salesByMonth = [];
    
    $currentMonth = date('Y-m');
    
    foreach ($sales as $sale) {
        $price = floatval($sale['price'] ?? 0) / 100; // Gumroad returns cents
        $saleMonth = substr($sale['created_at'] ?? '', 0, 7);
        
        if (isset($sale['refunded']) && $sale['refunded']) {
            $refundedCount++;
            $refundedAmount += $price;
        } else {
            $totalRevenue += $price;
            
            if ($saleMonth === $currentMonth) {
                $thisMonthRevenue += $price;
                $thisMonthSales++;
            }
            
            // Group by month
            if (!isset($salesByMonth[$saleMonth])) {
                $salesByMonth[$saleMonth] = ['count' => 0, 'revenue' => 0];
            }
            $salesByMonth[$saleMonth]['count']++;
            $salesByMonth[$saleMonth]['revenue'] += $price;
        }
    }
    
    // Subscriber metrics
    $activeSubscribers = 0;
    $cancelledSubscribers = 0;
    $trialSubscribers = 0;
    
    foreach ($subscribers as $sub) {
        $status = $sub['status'] ?? '';
        if ($status === 'alive') {
            $activeSubscribers++;
            // Check if in trial
            if (isset($sub['ended_at']) && strtotime($sub['ended_at']) > time()) {
                // Could be in trial period
            }
        } elseif ($status === 'cancelled') {
            $cancelledSubscribers++;
        }
    }
    
    // Sort months
    krsort($salesByMonth);
    
    // Get last 6 months
    $recentMonths = array_slice($salesByMonth, 0, 6, true);
    
    return [
        'total_revenue' => round($totalRevenue, 2),
        'total_sales' => $totalSales,
        'refunded_count' => $refundedCount,
        'refunded_amount' => round($refundedAmount, 2),
        'this_month_revenue' => round($thisMonthRevenue, 2),
        'this_month_sales' => $thisMonthSales,
        'active_subscribers' => $activeSubscribers,
        'cancelled_subscribers' => $cancelledSubscribers,
        'churn_rate' => $activeSubscribers > 0 
            ? round(($cancelledSubscribers / ($activeSubscribers + $cancelledSubscribers)) * 100, 1) 
            : 0,
        'avg_sale_value' => $totalSales > 0 ? round($totalRevenue / $totalSales, 2) : 0,
        'sales_by_month' => $recentMonths,
        'last_updated' => date('Y-m-d H:i:s')
    ];
}


/**
 * Gumroad Sales & Metrics API
 * Obtiene métricas de ventas desde Gumroad
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secrets.php';

// Verificar que el token existe
if (!defined('GUMROAD_ACCESS_TOKEN')) {
    echo json_encode(['success' => false, 'error' => 'GUMROAD_ACCESS_TOKEN not configured']);
    exit();
}

$action = $_GET['action'] ?? 'summary';

try {
    switch ($action) {
        case 'sales':
            // Obtener todas las ventas
            $sales = fetchGumroadSales();
            echo json_encode(['success' => true, 'sales' => $sales]);
            break;
            
        case 'subscribers':
            // Obtener todos los suscriptores
            $subscribers = fetchGumroadSubscribers();
            echo json_encode(['success' => true, 'subscribers' => $subscribers]);
            break;
            
        case 'summary':
        default:
            // Resumen de métricas
            $summary = getGumroadSummary();
            echo json_encode(['success' => true, 'summary' => $summary]);
            break;
    }
} catch (Exception $e) {
    error_log("Gumroad API error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

/**
 * Fetch sales from Gumroad API
 */
function fetchGumroadSales() {
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => "https://api.gumroad.com/v2/sales?access_token=" . GUMROAD_ACCESS_TOKEN,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Gumroad API returned HTTP $httpCode");
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        throw new Exception("Gumroad API error: " . ($data['message'] ?? 'Unknown error'));
    }
    
    return $data['sales'] ?? [];
}

/**
 * Fetch subscribers from Gumroad API
 */
function fetchGumroadSubscribers($productId = null) {
    $url = "https://api.gumroad.com/v2/subscribers?access_token=" . GUMROAD_ACCESS_TOKEN;
    if ($productId) {
        $url .= "&product_id=" . urlencode($productId);
    }
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 30
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Gumroad API returned HTTP $httpCode");
    }
    
    $data = json_decode($response, true);
    
    if (!$data || !isset($data['success']) || !$data['success']) {
        throw new Exception("Gumroad API error: " . ($data['message'] ?? 'Unknown error'));
    }
    
    return $data['subscribers'] ?? [];
}

/**
 * Get summary metrics
 */
function getGumroadSummary() {
    $sales = fetchGumroadSales();
    $subscribers = [];
    
    try {
        $subscribers = fetchGumroadSubscribers();
    } catch (Exception $e) {
        // Subscribers endpoint might fail if no subscription products
        error_log("Could not fetch subscribers: " . $e->getMessage());
    }
    
    // Calculate metrics
    $totalRevenue = 0;
    $totalSales = count($sales);
    $refundedCount = 0;
    $refundedAmount = 0;
    $thisMonthRevenue = 0;
    $thisMonthSales = 0;
    $salesByMonth = [];
    
    $currentMonth = date('Y-m');
    
    foreach ($sales as $sale) {
        $price = floatval($sale['price'] ?? 0) / 100; // Gumroad returns cents
        $saleMonth = substr($sale['created_at'] ?? '', 0, 7);
        
        if (isset($sale['refunded']) && $sale['refunded']) {
            $refundedCount++;
            $refundedAmount += $price;
        } else {
            $totalRevenue += $price;
            
            if ($saleMonth === $currentMonth) {
                $thisMonthRevenue += $price;
                $thisMonthSales++;
            }
            
            // Group by month
            if (!isset($salesByMonth[$saleMonth])) {
                $salesByMonth[$saleMonth] = ['count' => 0, 'revenue' => 0];
            }
            $salesByMonth[$saleMonth]['count']++;
            $salesByMonth[$saleMonth]['revenue'] += $price;
        }
    }
    
    // Subscriber metrics
    $activeSubscribers = 0;
    $cancelledSubscribers = 0;
    $trialSubscribers = 0;
    
    foreach ($subscribers as $sub) {
        $status = $sub['status'] ?? '';
        if ($status === 'alive') {
            $activeSubscribers++;
            // Check if in trial
            if (isset($sub['ended_at']) && strtotime($sub['ended_at']) > time()) {
                // Could be in trial period
            }
        } elseif ($status === 'cancelled') {
            $cancelledSubscribers++;
        }
    }
    
    // Sort months
    krsort($salesByMonth);
    
    // Get last 6 months
    $recentMonths = array_slice($salesByMonth, 0, 6, true);
    
    return [
        'total_revenue' => round($totalRevenue, 2),
        'total_sales' => $totalSales,
        'refunded_count' => $refundedCount,
        'refunded_amount' => round($refundedAmount, 2),
        'this_month_revenue' => round($thisMonthRevenue, 2),
        'this_month_sales' => $thisMonthSales,
        'active_subscribers' => $activeSubscribers,
        'cancelled_subscribers' => $cancelledSubscribers,
        'churn_rate' => $activeSubscribers > 0 
            ? round(($cancelledSubscribers / ($activeSubscribers + $cancelledSubscribers)) * 100, 1) 
            : 0,
        'avg_sale_value' => $totalSales > 0 ? round($totalRevenue / $totalSales, 2) : 0,
        'sales_by_month' => $recentMonths,
        'last_updated' => date('Y-m-d H:i:s')
    ];
}



