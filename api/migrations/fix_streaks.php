<?php
/**
 * Migration: Fix streaks for existing users
 * - Add activity_dates column if not exists
 * - For users with streak > 7, generate activity_dates from registration date
 * - For users with streak <= 7, keep as is (they'll build naturally)
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    // 1. Add activity_dates column if not exists
    $columns = $db->query("SHOW COLUMNS FROM user_progress")->fetchAll(PDO::FETCH_COLUMN);
    if (!in_array('activity_dates', $columns)) {
        $db->exec("ALTER TABLE user_progress ADD COLUMN activity_dates JSON NULL");
        echo "✅ Column activity_dates added\n";
    } else {
        echo "✅ Column activity_dates already exists\n";
    }
    
    // 2. Get all users with their progress and registration date
    $stmt = $db->query("
        SELECT 
            up.email,
            up.current_streak,
            up.longest_streak,
            up.last_activity_date,
            up.activity_dates,
            u.created_at as user_created
        FROM user_progress up
        LEFT JOIN users u ON up.email = u.email
        ORDER BY up.email
    ");
    
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "Found " . count($users) . " users with progress\n\n";
    
    $today = date('Y-m-d');
    $appLaunchDate = '2025-11-28'; // App launch date
    
    foreach ($users as $user) {
        $email = $user['email'];
        $currentStreak = (int)$user['current_streak'];
        $existingDates = json_decode($user['activity_dates'] ?? '[]', true) ?: [];
        $userCreated = $user['user_created'] ? date('Y-m-d', strtotime($user['user_created'])) : $appLaunchDate;
        
        // Use the later of user creation or app launch
        $startDate = max($userCreated, $appLaunchDate);
        
        // If already has activity_dates, skip
        if (!empty($existingDates) && count($existingDates) > 0) {
            echo "⏭️ {$email}: Already has " . count($existingDates) . " activity dates, skipping\n";
            continue;
        }
        
        // Calculate max possible streak from start date to today
        $startDateTime = new DateTime($startDate);
        $todayDateTime = new DateTime($today);
        $maxPossibleDays = $startDateTime->diff($todayDateTime)->days + 1; // +1 to include today
        
        // If streak > max possible, cap it
        if ($currentStreak > $maxPossibleDays) {
            echo "⚠️ {$email}: Streak {$currentStreak} > max possible {$maxPossibleDays}, capping\n";
            $currentStreak = $maxPossibleDays;
        }
        
        // If streak > 7, generate activity dates
        if ($currentStreak > 7) {
            $activityDates = [];
            $date = new DateTime($today);
            
            // Generate dates going backwards from today
            for ($i = 0; $i < $currentStreak; $i++) {
                $activityDates[] = $date->format('Y-m-d');
                $date->modify('-1 day');
            }
            
            // Sort ascending
            sort($activityDates);
            
            $activityDatesJson = json_encode($activityDates);
            
            // Update user
            $updateStmt = $db->prepare("
                UPDATE user_progress 
                SET activity_dates = ?,
                    current_streak = ?,
                    longest_streak = GREATEST(longest_streak, ?)
                WHERE email = ?
            ");
            $updateStmt->execute([$activityDatesJson, $currentStreak, $currentStreak, $email]);
            
            echo "✅ {$email}: Generated " . count($activityDates) . " activity dates, streak set to {$currentStreak}\n";
        } else {
            // For users with streak <= 7, just add today if they had activity today
            $lastActivity = $user['last_activity_date'] ?? '';
            if ($lastActivity === $today) {
                $activityDates = [$today];
                $activityDatesJson = json_encode($activityDates);
                
                $updateStmt = $db->prepare("
                    UPDATE user_progress 
                    SET activity_dates = ?,
                        current_streak = 1
                    WHERE email = ?
                ");
                $updateStmt->execute([$activityDatesJson, $email]);
                
                echo "✅ {$email}: Streak {$currentStreak} <= 7, set to 1 with today's date\n";
            } else {
                // Reset streak to 0
                $updateStmt = $db->prepare("
                    UPDATE user_progress 
                    SET activity_dates = '[]',
                        current_streak = 0
                    WHERE email = ?
                ");
                $updateStmt->execute([$email]);
                
                echo "⚠️ {$email}: No recent activity, streak reset to 0\n";
            }
        }
    }
    
    echo "\n✅ Migration completed!\n";
    
} catch (Exception $e) {
    echo "❌ Migration error: " . $e->getMessage() . "\n";
}
