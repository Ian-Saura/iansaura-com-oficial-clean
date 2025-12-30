<?php
/**
 * Migration: Restore streaks for users
 * For users with streak = 1, give them credit for all days since registration
 */

require_once __DIR__ . '/../secure-config.php';

try {
    $db = getSecureDBConnection();
    
    $today = date('Y-m-d');
    $appLaunchDate = '2025-11-28';
    
    // Get users with streak = 1 who had activity today
    $stmt = $db->query("
        SELECT 
            up.email,
            up.current_streak,
            up.longest_streak,
            up.activity_dates,
            u.created_at as user_created
        FROM user_progress up
        LEFT JOIN users u ON up.email = u.email
        WHERE up.current_streak = 1
        AND up.last_activity_date = '{$today}'
        ORDER BY up.email
    ");
    
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo "Found " . count($users) . " users with streak = 1 and activity today\n\n";
    
    foreach ($users as $user) {
        $email = $user['email'];
        $userCreated = $user['user_created'] ? date('Y-m-d', strtotime($user['user_created'])) : $appLaunchDate;
        
        // Use the later of user creation or app launch
        $startDate = max($userCreated, $appLaunchDate);
        
        // Calculate days from registration to today
        $startDateTime = new DateTime($startDate);
        $todayDateTime = new DateTime($today);
        $daysSinceRegistration = $startDateTime->diff($todayDateTime)->days + 1; // +1 to include today
        
        // Generate activity dates from registration to today
        $activityDates = [];
        $date = new DateTime($startDate);
        while ($date <= $todayDateTime) {
            $activityDates[] = $date->format('Y-m-d');
            $date->modify('+1 day');
        }
        
        $activityDatesJson = json_encode($activityDates);
        $newStreak = count($activityDates);
        $oldLongest = (int)$user['longest_streak'];
        $newLongest = max($oldLongest, $newStreak);
        
        // Update user
        $updateStmt = $db->prepare("
            UPDATE user_progress 
            SET activity_dates = ?,
                current_streak = ?,
                longest_streak = ?
            WHERE email = ?
        ");
        $updateStmt->execute([$activityDatesJson, $newStreak, $newLongest, $email]);
        
        echo "✅ {$email}: Registered {$startDate}, gave {$newStreak} days streak\n";
    }
    
    echo "\n✅ Streaks restored for " . count($users) . " users!\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
