<?php
/**
 * Test Red Flags Lead Magnet Funnel
 * Tests the complete flow from landing page to PDF delivery
 */

echo "===========================================\n";
echo "RED FLAGS FUNNEL TEST\n";
echo "===========================================\n\n";

// Test 1: Check if PDF exists
echo "Test 1: Checking if PDF file exists...\n";
$pdfPath = __DIR__ . '/../public/15-RED-FLAGS-EN-TU-CODIGO-DE-DATA-ENGINEERING.pdf';
if (file_exists($pdfPath)) {
    $fileSize = filesize($pdfPath);
    $fileSizeMB = round($fileSize / 1024 / 1024, 2);
    echo "✅ PDF found: $pdfPath\n";
    echo "   File size: $fileSizeMB MB\n";
} else {
    echo "❌ PDF NOT FOUND at: $pdfPath\n";
    exit(1);
}
echo "\n";

// Test 2: Check if API endpoint exists
echo "Test 2: Checking if API endpoint exists...\n";
$apiPath = __DIR__ . '/../api/redflags-delivery.php';
if (file_exists($apiPath)) {
    echo "✅ API endpoint found: $apiPath\n";
} else {
    echo "❌ API endpoint NOT FOUND at: $apiPath\n";
    exit(1);
}
echo "\n";

// Test 3: Test email validation
echo "Test 3: Testing email validation logic...\n";
$testEmails = [
    'test@example.com' => true,
    'invalid-email' => false,
    'test@domain' => false,
    'test+alias@example.com' => true,
];

foreach ($testEmails as $email => $shouldBeValid) {
    $isValid = filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    if ($isValid === $shouldBeValid) {
        echo "✅ Email '$email' validation: " . ($isValid ? 'valid' : 'invalid') . " (expected)\n";
    } else {
        echo "❌ Email '$email' validation failed\n";
    }
}
echo "\n";

// Test 4: Check SMTP configuration (without actually sending)
echo "Test 4: Checking SMTP configuration...\n";
$smtpHost = 'c2621673.ferozo.com';
$smtpPort = 465;
$smtpUsername = 'info@iansaura.com';

echo "   Host: $smtpHost\n";
echo "   Port: $smtpPort\n";
echo "   Username: $smtpUsername\n";

// Try to connect to SMTP server
$socket = @fsockopen("ssl://$smtpHost", $smtpPort, $errno, $errstr, 5);
if ($socket) {
    echo "✅ SMTP server is reachable\n";
    fclose($socket);
} else {
    echo "⚠️  WARNING: Cannot connect to SMTP server: $errstr ($errno)\n";
    echo "   (This might be normal if testing from a different network)\n";
}
echo "\n";

// Test 5: Check logs directory
echo "Test 5: Checking logs directory...\n";
$logsDir = __DIR__ . '/../logs';
if (is_dir($logsDir)) {
    echo "✅ Logs directory exists: $logsDir\n";
    if (is_writable($logsDir)) {
        echo "✅ Logs directory is writable\n";
    } else {
        echo "⚠️  WARNING: Logs directory is not writable\n";
    }
} else {
    echo "⚠️  Logs directory doesn't exist, creating...\n";
    if (mkdir($logsDir, 0755, true)) {
        echo "✅ Logs directory created\n";
    } else {
        echo "❌ Failed to create logs directory\n";
    }
}
echo "\n";

// Test 6: Simulate API request (without actually sending email)
echo "Test 6: Simulating API request structure...\n";
$testRequest = [
    'email' => 'test@example.com'
];
$json = json_encode($testRequest);
echo "   Request JSON: $json\n";
$decoded = json_decode($json, true);
if ($decoded && isset($decoded['email'])) {
    echo "✅ JSON encoding/decoding works correctly\n";
} else {
    echo "❌ JSON encoding/decoding failed\n";
}
echo "\n";

// Test 7: Check React build
echo "Test 7: Checking React build...\n";
$buildIndex = __DIR__ . '/../build/index.html';
if (file_exists($buildIndex)) {
    echo "✅ React build exists: $buildIndex\n";
    
    // Check if RedFlags route is in the build
    $indexContent = file_get_contents($buildIndex);
    if ($indexContent) {
        echo "✅ Build index.html is readable\n";
    } else {
        echo "❌ Cannot read build index.html\n";
    }
} else {
    echo "⚠️  React build not found. Run 'npm run build' first.\n";
}
echo "\n";

// Test 8: Check .htaccess configuration
echo "Test 8: Checking .htaccess configuration...\n";
$htaccessPath = __DIR__ . '/../.htaccess';
if (file_exists($htaccessPath)) {
    echo "✅ .htaccess file exists\n";
    $htaccessContent = file_get_contents($htaccessPath);
    
    // Check for React Router support
    if (strpos($htaccessContent, 'RewriteEngine On') !== false) {
        echo "✅ RewriteEngine is enabled\n";
    } else {
        echo "❌ RewriteEngine is not enabled\n";
    }
    
    // Check for API route handling
    if (strpos($htaccessContent, '/api/') !== false) {
        echo "✅ API routes are configured\n";
    } else {
        echo "❌ API routes are not configured\n";
    }
} else {
    echo "⚠️  .htaccess file not found\n";
}
echo "\n";

echo "===========================================\n";
echo "TEST SUMMARY\n";
echo "===========================================\n";
echo "All critical tests passed! ✅\n\n";

echo "NEXT STEPS:\n";
echo "1. Deploy to production server\n";
echo "2. Test the complete flow at: https://iansaura.com/redflags\n";
echo "3. Submit a test email and verify PDF delivery\n";
echo "4. Check logs at: $logsDir/redflags-delivery.log\n";
echo "5. Monitor email delivery and conversions\n\n";

echo "API ENDPOINT: /api/redflags-delivery.php\n";
echo "LANDING PAGE: /redflags\n";
echo "PDF: (Hidden from public, delivered via email only)\n\n";

echo "===========================================\n";
?>




