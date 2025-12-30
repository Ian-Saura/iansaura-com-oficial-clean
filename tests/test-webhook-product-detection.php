<?php
/**
 * Test Script for Webhook Product Detection
 * Tests the logic that determines which book to deliver
 */

require_once 'api/oneinfinite-webhook.php';

// Test data simulating different OneinFinite webhook payloads
$testCases = [
    [
        'name' => 'SQL Book - By Title',
        'orderData' => [
            'id' => 'test_sql_001',
            'title' => 'SQL desde Cero - Domina las Bases de Datos',
            'amount' => 19.99,
            'currency' => 'USD',
            'status' => 'CLOSED'
        ],
        'expected_url' => 'pdf-delivery-sql.php'
    ],
    [
        'name' => 'Python Book - By Title', 
        'orderData' => [
            'id' => 'test_python_001',
            'title' => 'Fundamentos Prácticos de Programación con Python',
            'amount' => 39.99,
            'currency' => 'USD',
            'status' => 'CLOSED'
        ],
        'expected_url' => 'pdf-delivery.php'
    ],
    [
        'name' => 'SQL Book - By External ID',
        'orderData' => [
            'id' => 'test_external_001',
            'title' => 'Libro de Programación',
            'external_id' => 'sql-beginner-book-2024',
            'amount' => 19.99,
            'currency' => 'USD',
            'status' => 'CLOSED'
        ],
        'expected_url' => 'pdf-delivery-sql.php'
    ],
    [
        'name' => 'Python Book - By External ID',
        'orderData' => [
            'id' => 'test_external_002',
            'title' => 'Libro de Programación',
            'external_id' => 'python-fundamentals-2024',
            'amount' => 39.99,
            'currency' => 'USD', 
            'status' => 'CLOSED'
        ],
        'expected_url' => 'pdf-delivery.php'
    ],
    [
        'name' => 'SQL Book - By Description',
        'orderData' => [
            'id' => 'test_desc_001',
            'title' => 'Curso Completo de Bases de Datos',
            'description' => 'Aprende SQL desde cero con ejemplos prácticos',
            'amount' => 25.00,
            'currency' => 'USD',
            'status' => 'CLOSED'
        ],
        'expected_url' => 'pdf-delivery-sql.php'
    ],
    [
        'name' => 'Unknown Product - Should Default to Python',
        'orderData' => [
            'id' => 'test_unknown_001',
            'title' => 'Curso de Desarrollo Web',
            'amount' => 29.99,
            'currency' => 'USD',
            'status' => 'CLOSED'
        ],
        'expected_url' => 'pdf-delivery.php'
    ]
];

echo "🧪 Testing Product Detection Logic\n";
echo "==================================\n\n";

$passed = 0;
$failed = 0;

foreach ($testCases as $test) {
    echo "Testing: " . $test['name'] . "\n";
    echo "Order Data: " . json_encode($test['orderData'], JSON_PRETTY_PRINT) . "\n";
    
    try {
        $actualUrl = determineProductDeliveryUrl($test['orderData']);
        $expectedContains = $test['expected_url'];
        
        if (strpos($actualUrl, $expectedContains) !== false) {
            echo "✅ PASS: Got $actualUrl (contains $expectedContains)\n";
            $passed++;
        } else {
            echo "❌ FAIL: Expected URL containing '$expectedContains', got '$actualUrl'\n";
            $failed++;
        }
    } catch (Exception $e) {
        echo "❌ ERROR: " . $e->getMessage() . "\n";
        $failed++;
    }
    
    echo "\n" . str_repeat("-", 50) . "\n\n";
}

echo "📊 Test Results:\n";
echo "Passed: $passed\n";
echo "Failed: $failed\n";
echo "Total: " . ($passed + $failed) . "\n\n";

if ($failed === 0) {
    echo "🎉 All tests passed! Product detection is working correctly.\n";
} else {
    echo "⚠️  Some tests failed. Please review the logic in determineProductDeliveryUrl().\n";
}

echo "\n📋 Next Steps:\n";
echo "1. Run this test after making changes to the detection logic\n";
echo "2. Configure your OneinFinite products with clear titles or external_ids\n";
echo "3. Monitor the webhook logs to see real product detection in action\n";
echo "4. Test with actual purchases to verify the complete flow\n";
?> 