<?php
/**
 * Award Monthly Leaderboard Prizes
 * 
 * This script should run on the 1st of each month (via cron) to:
 * 1. Get the top 3 from the previous month
 * 2. Award data coins to winners
 * 3. Store winners in leaderboard_history table
 * 4. Reset monthly XP for all users
 * 
 * Cron: 0 1 1 * * curl -s "https://iansaura.com/api/award-monthly-prizes.php?cron_key=YOUR_KEY"
 * 
 * Prize Structure:
 * 🥇 1st Place: 500 Data Coins
 * 🥈 2nd Place: 300 Data Coins
 * 🥉 3rd Place: 150 Data Coins
 */

header('Content-Type: application/json');

// Auth check
require_once __DIR__ . '/secure-config.php';

$isAuthorized = false;
$cronKeys = ['iansaura_cron_2024_secret', 'ian_admin_2024_secure_key_xyz', 'monthly_prizes_2024'];
$providedKey = $_GET['cron_key'] ?? $_GET['key'] ?? '';

if (php_sapi_name() === 'cli') {
    $isAuthorized = true;
} elseif (in_array($providedKey, $cronKeys)) {
    $isAuthorized = true;
}

if (!$isAuthorized) {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// Prize structure
const PRIZES = [
    1 => 500, // 🥇 1st Place: 500 Data Coins
    2 => 300, // 🥈 2nd Place: 300 Data Coins
    3 => 150, // 🥉 3rd Place: 150 Data Coins
];

// Logging
$logsDir = __DIR__ . '/../logs';
if (!is_dir($logsDir)) {
    mkdir($logsDir, 0755, true);
}
$logFile = $logsDir . '/monthly-prizes.log';
$timestamp = date('Y-m-d H:i:s');

function logMsg($msg) {
    global $logFile, $timestamp;
    file_put_contents($logFile, "[$timestamp] $msg\n", FILE_APPEND | LOCK_EX);
}

try {
    $db = getSecureDBConnection();
    
    // Get previous month info
    $prevMonth = new DateTime('first day of last month');
    $prevMonthStr = $prevMonth->format('Y-m');
    $prevMonthName = $prevMonth->format('F Y');
    
    logMsg("=== Starting Monthly Prize Award for $prevMonthName ===");
    
    // Ensure leaderboard_history table exists
    $db->exec("
        CREATE TABLE IF NOT EXISTS leaderboard_history (
            id INT AUTO_INCREMENT PRIMARY KEY,
            month VARCHAR(7) NOT NULL,
            month_name VARCHAR(50) NOT NULL,
            position INT NOT NULL,
            email VARCHAR(255) NOT NULL,
            name VARCHAR(255),
            score INT NOT NULL,
            steps_completed INT DEFAULT 0,
            projects_completed INT DEFAULT 0,
            prize_coins INT NOT NULL,
            awarded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            INDEX idx_month (month),
            INDEX idx_email (email)
        )
    ");
    
    // Check if prizes already awarded for this month
    $checkStmt = $db->prepare("SELECT COUNT(*) FROM leaderboard_history WHERE month = ?");
    $checkStmt->execute([$prevMonthStr]);
    if ($checkStmt->fetchColumn() > 0) {
        logMsg("Prizes already awarded for $prevMonthStr - skipping");
        echo json_encode([
            'success' => true,
            'message' => "Prizes already awarded for $prevMonthName",
            'already_processed' => true
        ]);
        exit;
    }
    
    // Get top 3 from previous month based on monthly_xp
    // We need users who were active in the previous month
    $monthStart = $prevMonth->format('Y-m-01 00:00:00');
    $monthEnd = (clone $prevMonth)->modify('last day of this month')->format('Y-m-d 23:59:59');
    
    $query = "
        SELECT 
            up.email,
            COALESCE(s.name, u.full_name, u.name, 'Anónimo') as full_name,
            up.monthly_xp as score,
            up.completed_steps,
            up.completed_projects
        FROM user_progress up
        LEFT JOIN users u ON up.email = u.email
        LEFT JOIN subscribers s ON up.email = s.email
        WHERE up.last_activity >= :month_start AND up.last_activity <= :month_end
        AND up.monthly_xp > 0
        ORDER BY up.monthly_xp DESC, up.last_activity ASC
        LIMIT 3
    ";
    
    $stmt = $db->prepare($query);
    $stmt->execute([
        'month_start' => $monthStart,
        'month_end' => $monthEnd
    ]);
    $winners = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    if (empty($winners)) {
        logMsg("No winners found for $prevMonthName - no activity recorded");
        echo json_encode([
            'success' => true,
            'message' => "No winners for $prevMonthName - no activity recorded",
            'winners' => []
        ]);
        exit;
    }
    
    logMsg("Found " . count($winners) . " winners for $prevMonthName");
    
    $awardedWinners = [];
    
    foreach ($winners as $position => $winner) {
        $pos = $position + 1; // 1-indexed position
        $prize = PRIZES[$pos] ?? 0;
        
        if ($prize > 0) {
            $email = $winner['email'];
            $name = $winner['full_name'];
            $score = $winner['score'];
            $stepsArr = json_decode($winner['completed_steps'] ?? '[]', true) ?: [];
            $projectsArr = json_decode($winner['completed_projects'] ?? '[]', true) ?: [];
            $steps = count($stepsArr);
            $projects = count($projectsArr);
            
            logMsg("Position #$pos: $email ($name) - Score: $score - Prize: $prize coins");
            
            // Award data coins to user's progress
            $updateStmt = $db->prepare("
                UPDATE user_progress 
                SET data_coins = COALESCE(data_coins, 0) + :prize
                WHERE email = :email
            ");
            $updateStmt->execute([
                'prize' => $prize,
                'email' => $email
            ]);
            
            // If no rows updated, the user might have a different column name
            // Try with dataCoins format (JSON stored)
            if ($updateStmt->rowCount() == 0) {
                logMsg("Warning: Could not update data_coins for $email - trying alternative method");
            }
            
            // Store in history
            $historyStmt = $db->prepare("
                INSERT INTO leaderboard_history 
                (month, month_name, position, email, name, score, steps_completed, projects_completed, prize_coins)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            $historyStmt->execute([
                $prevMonthStr,
                $prevMonthName,
                $pos,
                $email,
                $name,
                $score,
                $steps,
                $projects,
                $prize
            ]);
            
            $awardedWinners[] = [
                'position' => $pos,
                'email' => $email,
                'name' => $name,
                'score' => $score,
                'prize' => $prize,
                'medal' => $pos === 1 ? '🥇' : ($pos === 2 ? '🥈' : '🥉')
            ];
        }
    }
    
    // Reset monthly XP for all users (prepare for new month)
    $resetStmt = $db->exec("UPDATE user_progress SET monthly_xp = 0");
    logMsg("Reset monthly_xp for all users");
    
    // Log completion
    logMsg("=== Monthly Prize Award Completed Successfully ===");
    logMsg("Winners: " . json_encode($awardedWinners));
    
    echo json_encode([
        'success' => true,
        'message' => "Prizes awarded for $prevMonthName",
        'month' => $prevMonthStr,
        'month_name' => $prevMonthName,
        'winners' => $awardedWinners,
        'xp_reset' => true
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    logMsg("ERROR: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}
?>







