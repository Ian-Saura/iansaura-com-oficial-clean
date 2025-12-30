<?php
/**
 * Analytics API - Track user events for conversion funnel
 * 
 * Events tracked:
 * - page_view: User visits a page
 * - user_registered: New user signs up
 * - user_logged_in: User logs in
 * - trial_started: User starts free trial
 * - step_completed: User completes a roadmap step
 * - exercise_completed: User completes an exercise
 * - project_started: User starts a project
 * - subscription_started: User subscribes
 * - subscription_cancelled: User cancels
 */

error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/secure-config.php';

// Rate limiting function for analytics
function checkAnalyticsRateLimit($db, $ip, $endpoint, $maxRequests = 100, $windowSeconds = 60) {
    try {
        $windowStart = date('Y-m-d H:i:s', time() - $windowSeconds);
        
        // Clean old entries
        $db->exec("DELETE FROM rate_limits WHERE window_start < '$windowStart'");
        
        // Check current count
        $stmt = $db->prepare("SELECT request_count FROM rate_limits WHERE ip_address = ? AND endpoint = ? AND window_start > ?");
        $stmt->execute([$ip, $endpoint, $windowStart]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row && $row['request_count'] >= $maxRequests) {
            return false; // Rate limited
        }
        
        // Update or insert
        if ($row) {
            $db->prepare("UPDATE rate_limits SET request_count = request_count + 1 WHERE ip_address = ? AND endpoint = ?")->execute([$ip, $endpoint]);
        } else {
            $db->prepare("INSERT INTO rate_limits (ip_address, endpoint, request_count, window_start) VALUES (?, ?, 1, NOW())")->execute([$ip, $endpoint]);
        }
        
        return true;
    } catch (Exception $e) {
        // If rate_limits table doesn't exist, allow the request
        return true;
    }
}

// Get client IP
function getClientIP() {
    $headers = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ip = $_SERVER[$header];
            if (strpos($ip, ',') !== false) {
                $ip = trim(explode(',', $ip)[0]);
            }
            return $ip;
        }
    }
    return 'unknown';
}

try {
    $db = getSecureDBConnection();
    $ip = getClientIP();
    
    // Rate limit: 100 requests per minute per IP
    if (!checkAnalyticsRateLimit($db, $ip, 'analytics', 100, 60)) {
        http_response_code(429);
        echo json_encode(['error' => 'Too many requests']);
        exit;
    }
    
    $action = $_GET['action'] ?? 'track';
    
    switch ($action) {
        case 'track':
            // Track a single event
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['event'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Event name required']);
                exit;
            }
            
            // Try to create table if not exists
            $db->exec("CREATE TABLE IF NOT EXISTS analytics_events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                event_name VARCHAR(100) NOT NULL,
                user_email VARCHAR(255),
                properties JSON,
                session_id VARCHAR(100),
                page_url VARCHAR(500),
                referrer VARCHAR(500),
                user_agent VARCHAR(500),
                ip_address VARCHAR(45),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_event_name (event_name),
                INDEX idx_user_email (user_email),
                INDEX idx_created_at (created_at)
            )");
            
            $stmt = $db->prepare("INSERT INTO analytics_events 
                (event_name, user_email, properties, session_id, page_url, referrer, user_agent, ip_address) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            
            $stmt->execute([
                $input['event'],
                $input['user_email'] ?? null,
                json_encode($input['properties'] ?? []),
                $input['session_id'] ?? null,
                $input['page_url'] ?? null,
                $input['referrer'] ?? null,
                $_SERVER['HTTP_USER_AGENT'] ?? null,
                $ip
            ]);
            
            echo json_encode(['success' => true, 'event_id' => $db->lastInsertId()]);
            break;
            
        case 'batch':
            // Track multiple events at once
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input || !isset($input['events']) || !is_array($input['events'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Events array required']);
                exit;
            }
            
            $stmt = $db->prepare("INSERT INTO analytics_events 
                (event_name, user_email, properties, session_id, page_url, referrer, user_agent, ip_address) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            
            $inserted = 0;
            foreach ($input['events'] as $event) {
                if (!isset($event['event'])) continue;
                
                $stmt->execute([
                    $event['event'],
                    $event['user_email'] ?? $input['user_email'] ?? null,
                    json_encode($event['properties'] ?? []),
                    $event['session_id'] ?? $input['session_id'] ?? null,
                    $event['page_url'] ?? null,
                    $event['referrer'] ?? null,
                    $_SERVER['HTTP_USER_AGENT'] ?? null,
                    $ip
                ]);
                $inserted++;
            }
            
            echo json_encode(['success' => true, 'inserted' => $inserted]);
            break;
            
        case 'funnel':
            // Get conversion funnel stats (admin only)
            $key = $_GET['key'] ?? '';
            $adminKey = 'iansaura_analytics_2024';
            
            if ($key !== $adminKey) {
                http_response_code(401);
                echo json_encode(['error' => 'Unauthorized']);
                exit;
            }
            
            $days = intval($_GET['days'] ?? 30);
            $since = date('Y-m-d', strtotime("-$days days"));
            
            // Get funnel counts
            $funnel = [];
            $events = ['page_view', 'user_registered', 'step_completed', 'trial_started', 'subscription_started'];
            
            foreach ($events as $event) {
                $stmt = $db->prepare("SELECT COUNT(DISTINCT COALESCE(user_email, ip_address)) as count 
                    FROM analytics_events WHERE event_name = ? AND created_at >= ?");
                $stmt->execute([$event, $since]);
                $funnel[$event] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            }
            
            // Get daily breakdown
            $stmt = $db->prepare("SELECT DATE(created_at) as date, event_name, COUNT(*) as count 
                FROM analytics_events 
                WHERE created_at >= ? 
                GROUP BY DATE(created_at), event_name 
                ORDER BY date DESC");
            $stmt->execute([$since]);
            $daily = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get top pages
            $stmt = $db->prepare("SELECT page_url, COUNT(*) as views 
                FROM analytics_events 
                WHERE event_name = 'page_view' AND created_at >= ? AND page_url IS NOT NULL
                GROUP BY page_url 
                ORDER BY views DESC 
                LIMIT 10");
            $stmt->execute([$since]);
            $topPages = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Get referrers
            $stmt = $db->prepare("SELECT referrer, COUNT(*) as count 
                FROM analytics_events 
                WHERE event_name = 'page_view' AND created_at >= ? AND referrer IS NOT NULL AND referrer != ''
                GROUP BY referrer 
                ORDER BY count DESC 
                LIMIT 10");
            $stmt->execute([$since]);
            $topReferrers = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo json_encode([
                'success' => true,
                'period' => "$days days",
                'funnel' => $funnel,
                'daily' => $daily,
                'top_pages' => $topPages,
                'top_referrers' => $topReferrers
            ]);
            break;
            
        case 'events':
            // Get recent events (admin only)
            $key = $_GET['key'] ?? '';
            $adminKey = 'iansaura_analytics_2024';
            
            if ($key !== $adminKey) {
                http_response_code(401);
                echo json_encode(['error' => 'Unauthorized']);
                exit;
            }
            
            $limit = min(intval($_GET['limit'] ?? 100), 1000);
            $eventFilter = $_GET['event'] ?? null;
            
            if ($eventFilter) {
                $stmt = $db->prepare("SELECT * FROM analytics_events WHERE event_name = ? ORDER BY created_at DESC LIMIT ?");
                $stmt->execute([$eventFilter, $limit]);
            } else {
                $stmt = $db->prepare("SELECT * FROM analytics_events ORDER BY created_at DESC LIMIT ?");
                $stmt->execute([$limit]);
            }
            
            echo json_encode(['success' => true, 'events' => $stmt->fetchAll(PDO::FETCH_ASSOC)]);
            break;
            
        default:
            http_response_code(400);
            echo json_encode(['error' => 'Invalid action']);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error', 'message' => $e->getMessage()]);
}
