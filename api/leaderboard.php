<?php
/**
 * API de Leaderboard
 * Devuelve top suscriptores más activos
 * Con cache de 5 minutos para mejor performance
 */

// Rate limiting - 30 requests per minute per IP
require_once __DIR__ . '/middleware/rate-limiter.php';
applyRateLimit('leaderboard', 30, 60);

// Cache system
require_once __DIR__ . '/middleware/cache.php';

// CORS - Restrictive (only iansaura.com)
require_once __DIR__ . '/middleware/cors.php';
applyCors();

header('Content-Type: application/json');

// Helper functions
function getInitials($fullName) {
    if (empty($fullName) || $fullName === 'Anónimo') return 'A.';
    $parts = explode(' ', trim($fullName));
    if (count($parts) >= 2) {
        return $parts[0] . ' ' . strtoupper(substr($parts[1], 0, 1)) . '.';
    }
    return strtoupper(substr($parts[0], 0, 1)) . '.';
}

function getDisplayName($fullName, $showFullName = false) {
    if (empty($fullName) || $fullName === 'Anónimo') return 'Anónimo';
    return $showFullName ? $fullName : getInitials($fullName);
}

// Main function to fetch leaderboard data
function fetchLeaderboardData() {
    require_once __DIR__ . '/secure-config.php';
    $pdo = getSecureDBConnection();
    
    $tableCheck = $pdo->query("SHOW TABLES LIKE 'user_progress'");
    if ($tableCheck->rowCount() == 0) {
        return ['leaderboard' => [], 'stats' => ['totalActive' => 0, 'avgSteps' => 0]];
    }
    
    $hasShowNameColumn = false;
    try {
        $checkColumn = $pdo->query("SHOW COLUMNS FROM user_progress LIKE 'show_name_in_leaderboard'");
        $hasShowNameColumn = $checkColumn->rowCount() > 0;
    } catch (Exception $e) {}
    
    $monthStart = date('Y-m-01 00:00:00');
    
    // Check if equipped_avatar column exists
    $hasAvatarColumn = false;
    try {
        $checkAvatarCol = $pdo->query("SHOW COLUMNS FROM user_progress LIKE 'equipped_avatar'");
        $hasAvatarColumn = $checkAvatarCol->rowCount() > 0;
    } catch (Exception $e) {}
    
    $query = "
        SELECT 
            COALESCE(s.name, u.full_name, u.name, 'Anónimo') as full_name,
            up.email,
            up.completed_steps,
            up.completed_projects,
            up.watched_videos,
            up.monthly_xp,
            up.last_activity" . 
            ($hasShowNameColumn ? ", up.show_name_in_leaderboard" : "") . 
            ($hasAvatarColumn ? ", up.equipped_avatar" : "") . "
        FROM user_progress up
        LEFT JOIN users u ON up.email = u.email
        LEFT JOIN subscribers s ON up.email = s.email
        WHERE up.last_activity >= :month_start
        ORDER BY up.monthly_xp DESC, up.last_activity DESC
        LIMIT 50
    ";
    
    $stmt = $pdo->prepare($query);
    $stmt->execute(['month_start' => $monthStart]);
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $leaderboard = [];
    foreach ($users as $user) {
        $completedStepsArr = json_decode($user['completed_steps'] ?? '[]', true) ?: [];
        $completedProjectsArr = json_decode($user['completed_projects'] ?? '[]', true) ?: [];
        $watchedVideosArr = json_decode($user['watched_videos'] ?? '[]', true) ?: [];
        
        $completedSteps = count($completedStepsArr);
        $completedProjects = count($completedProjectsArr);
        $watchedVideos = count($watchedVideosArr);
        
        if ($completedSteps > 0 || $completedProjects > 0 || $watchedVideos > 0) {
            $showFullName = $hasShowNameColumn && !empty($user['show_name_in_leaderboard']);
            $monthlyXp = isset($user['monthly_xp']) ? (int)$user['monthly_xp'] : 0;
            $calculatedScore = ($completedSteps * 10) + ($completedProjects * 25) + ($watchedVideos * 5);
            $score = $monthlyXp > 0 ? $monthlyXp : $calculatedScore;
            
            // Get avatar icon from equipped_avatar ID
            $avatarIcon = null;
            if ($hasAvatarColumn && !empty($user['equipped_avatar'])) {
                // Map avatar IDs to their icons
                $avatarMap = [
                    'avatar-python' => '🐍', 'avatar-sql' => '🗃️', 'avatar-terminal' => '💻',
                    'avatar-coffee' => '☕', 'avatar-bug' => '🐛', 'avatar-rocket' => '🚀',
                    'avatar-cloud' => '☁️', 'avatar-spark' => '⚡', 'avatar-docker' => '🐳',
                    'avatar-robot' => '🤖', 'avatar-ninja' => '🥷', 'avatar-fire' => '🔥',
                    'avatar-architect' => '🏛️', 'avatar-dragon' => '🐉', 'avatar-alien' => '👽',
                    'avatar-crown' => '👑', 'avatar-wizard' => '🧙', 'avatar-unicorn' => '🦄',
                    'avatar-diamond' => '💎', 'avatar-galaxy' => '🌌'
                ];
                $avatarIcon = $avatarMap[$user['equipped_avatar']] ?? null;
            }
            
            $leaderboard[] = [
                'name' => getDisplayName($user['full_name'], $showFullName),
                'steps' => $completedSteps,
                'projects' => $completedProjects,
                'videos' => $watchedVideos,
                'score' => $score,
                'monthlyXp' => $monthlyXp,
                'lastActive' => $user['last_activity'],
                'avatar' => $avatarIcon // Avatar icon emoji or null
            ];
        }
    }
    
    usort($leaderboard, fn($a, $b) => $b['score'] - $a['score']);
    
    foreach ($leaderboard as $idx => &$entry) {
        $entry['position'] = $idx + 1;
        $entry['medal'] = $idx === 0 ? '🥇' : ($idx === 1 ? '🥈' : ($idx === 2 ? '🥉' : ''));
    }
    
    $totalActive = count($leaderboard);
    $avgSteps = $totalActive > 0 ? round(array_sum(array_column($leaderboard, 'steps')) / $totalActive) : 0;
    
    return [
        'leaderboard' => $leaderboard,
        'stats' => [
            'totalActive' => $totalActive,
            'avgSteps' => $avgSteps
        ]
    ];
}

// Main execution with cache
try {
    $cacheKey = 'leaderboard_' . date('Y-m');
    
    $data = getCached($cacheKey, CacheTTL::LEADERBOARD, function() {
        return fetchLeaderboardData();
    });
    
    echo json_encode([
        'success' => true,
        'leaderboard' => $data['leaderboard'],
        'stats' => $data['stats'],
        'month' => date('F Y'),
        'updated' => date('c'),
        'cached' => true
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    // Fallback without cache
    try {
        $data = fetchLeaderboardData();
        echo json_encode([
            'success' => true,
            'leaderboard' => $data['leaderboard'],
            'stats' => $data['stats'],
            'month' => date('F Y'),
            'updated' => date('c')
        ], JSON_PRETTY_PRINT);
    } catch (Exception $e2) {
        echo json_encode([
            'success' => true,
            'leaderboard' => [],
            'stats' => ['totalActive' => 0, 'avgSteps' => 0],
            'message' => 'No hay datos de actividad aún'
        ]);
    }
}
