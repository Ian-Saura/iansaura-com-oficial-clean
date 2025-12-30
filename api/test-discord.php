<?php
/**
 * Discord Integration Test
 * Tests the Discord bot connection and configuration
 * 
 * Usage: /api/test-discord.php?key=discord_test_2024
 */

header('Content-Type: application/json');

// Simple security - require a key
$testKey = $_GET['key'] ?? '';
if ($testKey !== 'discord_test_2024') {
    http_response_code(403);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

require_once __DIR__ . '/subscription-config.php';
require_once __DIR__ . '/discord-bot.php';

$results = [
    'timestamp' => date('Y-m-d H:i:s'),
    'tests' => []
];

// Test 1: Check if constants are defined
$results['tests']['constants'] = [
    'DISCORD_BOT_TOKEN' => defined('DISCORD_BOT_TOKEN') ? 'Defined (' . strlen(DISCORD_BOT_TOKEN) . ' chars)' : 'NOT DEFINED ❌',
    'DISCORD_GUILD_ID' => defined('DISCORD_GUILD_ID') ? DISCORD_GUILD_ID : 'NOT DEFINED ❌',
    'DISCORD_SUBSCRIBER_ROLE_ID' => defined('DISCORD_SUBSCRIBER_ROLE_ID') ? DISCORD_SUBSCRIBER_ROLE_ID : 'NOT DEFINED ❌',
    'DISCORD_API_URL' => defined('DISCORD_API_URL') ? DISCORD_API_URL : 'NOT DEFINED ❌'
];

// Test 2: Bot connection
try {
    $discord = new DiscordBot();
    $botTest = $discord->testConnection();
    $results['tests']['bot_connection'] = $botTest;
} catch (Exception $e) {
    $results['tests']['bot_connection'] = [
        'success' => false,
        'error' => $e->getMessage()
    ];
}

// Test 3: Search for a test user (if provided)
$testUsername = $_GET['username'] ?? '';
if ($testUsername) {
    try {
        $discord = new DiscordBot();
        $userId = $discord->findUserByUsername($testUsername);
        $results['tests']['user_search'] = [
            'username' => $testUsername,
            'found' => !empty($userId),
            'user_id' => $userId
        ];
        
        // If found, check if they have the role
        if ($userId) {
            $hasRole = $discord->hasSubscriberRole($userId);
            $results['tests']['user_search']['has_subscriber_role'] = $hasRole;
        }
    } catch (Exception $e) {
        $results['tests']['user_search'] = [
            'username' => $testUsername,
            'error' => $e->getMessage()
        ];
    }
}

// Test 4: Database connection and Discord columns
try {
    $credentialsFile = __DIR__ . '/.db-credentials.php';
    if (file_exists($credentialsFile)) {
        $credentials = include $credentialsFile;
        $dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";
        $db = new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);
        
        // Check subscribers table columns
        $subCols = $db->query("SHOW COLUMNS FROM subscribers")->fetchAll(PDO::FETCH_COLUMN);
        $discordCols = array_filter($subCols, fn($col) => strpos($col, 'discord') !== false);
        
        // Check users table columns
        $userCols = $db->query("SHOW COLUMNS FROM users")->fetchAll(PDO::FETCH_COLUMN);
        $userDiscordCols = array_filter($userCols, fn($col) => strpos($col, 'discord') !== false);
        
        // Count linked users
        $linkedSubscribers = $db->query("SELECT COUNT(*) FROM subscribers WHERE discord_username IS NOT NULL AND discord_username != ''")->fetchColumn();
        $linkedUsers = $db->query("SELECT COUNT(*) FROM users WHERE discord_username IS NOT NULL AND discord_username != ''")->fetchColumn();
        
        $results['tests']['database'] = [
            'connected' => true,
            'subscribers_discord_columns' => array_values($discordCols),
            'users_discord_columns' => array_values($userDiscordCols),
            'linked_subscribers' => (int)$linkedSubscribers,
            'linked_users' => (int)$linkedUsers
        ];
        
        // Sample of linked users
        $sampleLinked = $db->query("
            SELECT email, discord_username, discord_user_id, discord_role_assigned 
            FROM subscribers 
            WHERE discord_username IS NOT NULL AND discord_username != ''
            LIMIT 5
        ")->fetchAll();
        $results['tests']['database']['sample_linked'] = $sampleLinked;
        
    } else {
        $results['tests']['database'] = ['error' => 'Credentials file not found'];
    }
} catch (Exception $e) {
    $results['tests']['database'] = [
        'connected' => false,
        'error' => $e->getMessage()
    ];
}

// Summary
$allPassed = true;
if (!($results['tests']['bot_connection']['success'] ?? false)) $allPassed = false;
if (!($results['tests']['database']['connected'] ?? false)) $allPassed = false;

$results['summary'] = [
    'all_tests_passed' => $allPassed,
    'status' => $allPassed ? '✅ Discord integration OK' : '❌ Some tests failed'
];

echo json_encode($results, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);


