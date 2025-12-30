<?php
header('Content-Type: text/plain');

// Solo admin
$key = $_GET['key'] ?? '';
if (strlen($key) < 10) {
    die('Unauthorized');
}

$logType = $_GET['type'] ?? 'subscription-webhook';
$lines = intval($_GET['lines'] ?? 100);

$allowedLogs = [
    'subscription-webhook' => '../logs/subscription-webhook.log',
    'oneinfinite-webhook' => '../logs/oneinfinite-webhook.log',
    'webhook-errors' => '../logs/webhook-errors.log',
    'subscription-errors' => '../logs/subscription-errors.log',
];

if (!isset($allowedLogs[$logType])) {
    die('Invalid log type. Available: ' . implode(', ', array_keys($allowedLogs)));
}

$logFile = __DIR__ . '/' . $allowedLogs[$logType];

if (!file_exists($logFile)) {
    echo "Log file not found: $logType\n\n";
    echo "Checking for any log files...\n";
    $logsDir = __DIR__ . '/../logs';
    if (is_dir($logsDir)) {
        $files = scandir($logsDir);
        echo "Files in logs directory:\n";
        foreach ($files as $f) {
            if ($f !== '.' && $f !== '..') {
                $path = $logsDir . '/' . $f;
                $size = filesize($path);
                $modified = date('Y-m-d H:i:s', filemtime($path));
                echo "  - $f ($size bytes, modified: $modified)\n";
            }
        }
    } else {
        echo "Logs directory does not exist\n";
    }
    exit();
}

// Read last N lines
$content = file_get_contents($logFile);
$allLines = explode("\n", $content);
$lastLines = array_slice($allLines, -$lines);

echo "=== $logType (last $lines lines) ===\n";
echo "File: $logFile\n";
echo "Size: " . filesize($logFile) . " bytes\n";
echo "Modified: " . date('Y-m-d H:i:s', filemtime($logFile)) . "\n";
echo "=================================\n\n";

echo implode("\n", $lastLines);
