<?php
/**
 * API to get previous month's leaderboard winners
 * Returns the top 3 winners from last month with their prizes
 */

// Rate limiting
require_once __DIR__ . '/middleware/rate-limiter.php';
applyRateLimit('leaderboard_winners', 30, 60);

// CORS
require_once __DIR__ . '/middleware/cors.php';
applyCors();

// Cache
require_once __DIR__ . '/middleware/cache.php';

header('Content-Type: application/json');

function fetchPreviousMonthWinners() {
    require_once __DIR__ . '/secure-config.php';
    $db = getSecureDBConnection();
    
    // Get previous month
    $prevMonth = new DateTime('first day of last month');
    $prevMonthStr = $prevMonth->format('Y-m');
    $prevMonthName = $prevMonth->format('F Y');
    
    // Check if table exists
    $tableCheck = $db->query("SHOW TABLES LIKE 'leaderboard_history'");
    if ($tableCheck->rowCount() == 0) {
        return [
            'winners' => [],
            'month' => $prevMonthStr,
            'month_name' => $prevMonthName,
            'has_winners' => false
        ];
    }
    
    // Get winners from history
    $stmt = $db->prepare("
        SELECT 
            position,
            name,
            score,
            steps_completed,
            projects_completed,
            prize_coins,
            awarded_at
        FROM leaderboard_history
        WHERE month = ?
        ORDER BY position ASC
        LIMIT 3
    ");
    $stmt->execute([$prevMonthStr]);
    $winners = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Format winners with medals
    $formattedWinners = [];
    foreach ($winners as $winner) {
        $pos = (int)$winner['position'];
        $formattedWinners[] = [
            'position' => $pos,
            'medal' => $pos === 1 ? '🥇' : ($pos === 2 ? '🥈' : '🥉'),
            'name' => $winner['name'],
            'score' => (int)$winner['score'],
            'steps' => (int)$winner['steps_completed'],
            'projects' => (int)$winner['projects_completed'],
            'prize' => (int)$winner['prize_coins'],
            'awardedAt' => $winner['awarded_at']
        ];
    }
    
    return [
        'winners' => $formattedWinners,
        'month' => $prevMonthStr,
        'month_name' => $prevMonthName,
        'has_winners' => count($formattedWinners) > 0
    ];
}

try {
    // Cache for 1 hour (winners don't change during the month)
    $cacheKey = 'leaderboard_winners_' . date('Y-m');
    
    $data = getCached($cacheKey, 3600, function() {
        return fetchPreviousMonthWinners();
    });
    
    echo json_encode([
        'success' => true,
        ...$data,
        'cached' => true,
        'updated' => date('c')
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    // Fallback without cache
    try {
        $data = fetchPreviousMonthWinners();
        echo json_encode([
            'success' => true,
            ...$data,
            'updated' => date('c')
        ], JSON_PRETTY_PRINT);
    } catch (Exception $e2) {
        echo json_encode([
            'success' => false,
            'winners' => [],
            'has_winners' => false,
            'error' => 'Could not fetch winners'
        ]);
    }
}
?>







