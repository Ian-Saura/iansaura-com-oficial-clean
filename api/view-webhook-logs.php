<?php
// Temporary endpoint to view webhook logs
// DELETE THIS FILE AFTER DEBUGGING

header('Content-Type: text/plain');

$secret = $_GET['key'] ?? '';
if ($secret !== 'ian2025debug') {
    http_response_code(403);
    echo "Forbidden";
    exit;
}

$logFile = __DIR__ . '/../logs/gumroad-webhook.log';

if (!file_exists($logFile)) {
    echo "No log file found at: $logFile\n";
    echo "Webhook may not have been called yet.";
    exit;
}

$lines = $_GET['lines'] ?? 100;
$content = file_get_contents($logFile);

// Get last N lines
$allLines = explode("\n", $content);
$lastLines = array_slice($allLines, -$lines);

echo "=== GUMROAD WEBHOOK LOGS (last $lines lines) ===\n\n";
echo implode("\n", $lastLines);



// Temporary endpoint to view webhook logs
// DELETE THIS FILE AFTER DEBUGGING

header('Content-Type: text/plain');

$secret = $_GET['key'] ?? '';
if ($secret !== 'ian2025debug') {
    http_response_code(403);
    echo "Forbidden";
    exit;
}

$logFile = __DIR__ . '/../logs/gumroad-webhook.log';

if (!file_exists($logFile)) {
    echo "No log file found at: $logFile\n";
    echo "Webhook may not have been called yet.";
    exit;
}

$lines = $_GET['lines'] ?? 100;
$content = file_get_contents($logFile);

// Get last N lines
$allLines = explode("\n", $content);
$lastLines = array_slice($allLines, -$lines);

echo "=== GUMROAD WEBHOOK LOGS (last $lines lines) ===\n\n";
echo implode("\n", $lastLines);



// Temporary endpoint to view webhook logs
// DELETE THIS FILE AFTER DEBUGGING

header('Content-Type: text/plain');

$secret = $_GET['key'] ?? '';
if ($secret !== 'ian2025debug') {
    http_response_code(403);
    echo "Forbidden";
    exit;
}

$logFile = __DIR__ . '/../logs/gumroad-webhook.log';

if (!file_exists($logFile)) {
    echo "No log file found at: $logFile\n";
    echo "Webhook may not have been called yet.";
    exit;
}

$lines = $_GET['lines'] ?? 100;
$content = file_get_contents($logFile);

// Get last N lines
$allLines = explode("\n", $content);
$lastLines = array_slice($allLines, -$lines);

echo "=== GUMROAD WEBHOOK LOGS (last $lines lines) ===\n\n";
echo implode("\n", $lastLines);




