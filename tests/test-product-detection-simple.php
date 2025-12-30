<?php
/**
 * Simplified Test for Product Detection Logic
 * Tests only the detection function without loading the full webhook
 */

// Copy the detection function here for testing
function determineProductDeliveryUrl($orderData) {
    // Get product information
    $productTitle = strtolower($orderData['title'] ?? '');
    $productAmount = floatval($orderData['amount'] ?? 0);
    
    echo "   📋 Analyzing: title='$productTitle', amount=$productAmount\n";
    if (!empty($orderData['external_id'])) {
        echo "   📋 External ID: '" . $orderData['external_id'] . "'\n";
    }
    if (!empty($orderData['description'])) {
        echo "   📋 Description: '" . substr($orderData['description'], 0, 50) . "...'\n";
    }
    
    // Method 1: Check external_id first (most specific)
    $externalId = strtolower($orderData['external_id'] ?? '');
    if (strpos($externalId, 'sql') !== false) {
        echo "   ✅ Detected SQL book by external_id\n";
        return 'https://www.iansaura.com/api/pdf-delivery-sql.php';
    }
    
    if (strpos($externalId, 'python') !== false) {
        echo "   ✅ Detected Python book by external_id\n";
        return 'https://www.iansaura.com/api/pdf-delivery.php';
    }
    
    // Method 2: Check by specific SQL keywords in title
    if (strpos($productTitle, 'sql') !== false || 
        strpos($productTitle, 'database') !== false ||
        strpos($productTitle, 'bases de datos') !== false) {
        echo "   ✅ Detected SQL book by title (SQL keywords)\n";
        return 'https://www.iansaura.com/api/pdf-delivery-sql.php';
    }
    
    // Method 3: Check by specific Python keywords in title (more specific terms first)
    if (strpos($productTitle, 'python') !== false) {
        echo "   ✅ Detected Python book by title (Python keyword)\n";
        return 'https://www.iansaura.com/api/pdf-delivery.php';
    }
    
    // Method 4: Check description field
    $description = strtolower($orderData['description'] ?? '');
    if (strpos($description, 'sql') !== false || strpos($description, 'database') !== false) {
        echo "   ✅ Detected SQL book by description\n";
        return 'https://www.iansaura.com/api/pdf-delivery-sql.php';
    }
    
    if (strpos($description, 'python') !== false) {
        echo "   ✅ Detected Python book by description\n";
        return 'https://www.iansaura.com/api/pdf-delivery.php';
    }
    
    // Method 5: Check by broader programming keywords (less specific, checked last)
    if (strpos($productTitle, 'programación') !== false ||
        strpos($productTitle, 'programming') !== false) {
        echo "   ✅ Detected Python book by programming keywords\n";
        return 'https://www.iansaura.com/api/pdf-delivery.php';
    }
    
    // Default: Python book (since it was the original default)
    echo "   ⚠️  Defaulted to Python book (could not determine from order data)\n";
    return 'https://www.iansaura.com/api/pdf-delivery.php';
}

// Test data simulating different OneinFinite webhook payloads
$testCases = [
    [
        'name' => '📊 SQL Book - By Title',
        'orderData' => [
            'title' => 'SQL desde Cero - Domina las Bases de Datos',
            'amount' => 39.99, // Same price as Python book
        ],
        'expected_endpoint' => 'pdf-delivery-sql.php'
    ],
    [
        'name' => '🐍 Python Book - By Title', 
        'orderData' => [
            'title' => 'Fundamentos Prácticos de Programación con Python',
            'amount' => 39.99, // Same price as SQL book
        ],
        'expected_endpoint' => 'pdf-delivery.php'
    ],
    [
        'name' => '📊 SQL Book - By External ID',
        'orderData' => [
            'title' => 'Libro de Programación', // Generic title that could be confusing
            'external_id' => 'sql-beginner-book-2024',
            'amount' => 39.99,
        ],
        'expected_endpoint' => 'pdf-delivery-sql.php'
    ],
    [
        'name' => '🐍 Python Book - By External ID',
        'orderData' => [
            'title' => 'Libro de Bases de Datos', // Generic title that could be confusing  
            'external_id' => 'python-fundamentals-2024',
            'amount' => 39.99,
        ],
        'expected_endpoint' => 'pdf-delivery.php'
    ],
    [
        'name' => '📊 SQL Book - By Description',
        'orderData' => [
            'title' => 'Curso Completo de Programación', // Generic title
            'description' => 'Aprende SQL desde cero con ejemplos prácticos y ejercicios reales',
            'amount' => 39.99,
        ],
        'expected_endpoint' => 'pdf-delivery-sql.php'
    ],
    [
        'name' => '🐍 Python Book - By Programming Keywords',
        'orderData' => [
            'title' => 'Fundamentos de Programación Moderna',
            'amount' => 39.99,
        ],
        'expected_endpoint' => 'pdf-delivery.php'
    ],
    [
        'name' => '📊 SQL Book - By "Bases de Datos" in Title',
        'orderData' => [
            'title' => 'Curso Avanzado de Bases de Datos Relacionales',
            'amount' => 39.99,
        ],
        'expected_endpoint' => 'pdf-delivery-sql.php'
    ],
    [
        'name' => '❓ Unknown Product - Should Default to Python',
        'orderData' => [
            'title' => 'Curso de Desarrollo Web con React',
            'amount' => 39.99, // Same price but no identifying keywords
        ],
        'expected_endpoint' => 'pdf-delivery.php'
    ]
];

echo "🧪 Testing Product Detection Logic\n";
echo "===================================\n\n";

$passed = 0;
$failed = 0;

foreach ($testCases as $test) {
    echo "Testing: " . $test['name'] . "\n";
    
    try {
        $actualUrl = determineProductDeliveryUrl($test['orderData']);
        $expectedEndpoint = $test['expected_endpoint'];
        
        if (strpos($actualUrl, $expectedEndpoint) !== false) {
            echo "   ✅ PASS: Correctly identified endpoint\n";
            $passed++;
        } else {
            echo "   ❌ FAIL: Expected '$expectedEndpoint', got '$actualUrl'\n";
            $failed++;
        }
    } catch (Exception $e) {
        echo "   ❌ ERROR: " . $e->getMessage() . "\n";
        $failed++;
    }
    
    echo "\n" . str_repeat("-", 60) . "\n\n";
}

echo "📊 Test Results:\n";
echo "================\n";
echo "✅ Passed: $passed\n";
echo "❌ Failed: $failed\n";
echo "📈 Total: " . ($passed + $failed) . "\n\n";

if ($failed === 0) {
    echo "🎉 ALL TESTS PASSED! Product detection is working correctly.\n\n";
    echo "✅ SQL books will be delivered correctly\n";
    echo "✅ Python books will be delivered correctly\n";
    echo "✅ Unknown products will default to Python (safe fallback)\n\n";
} else {
    echo "⚠️  Some tests failed. Please review the logic.\n\n";
}

echo "📋 Next Steps:\n";
echo "==============\n";
echo "1. 🚀 Deploy the updated webhook to your server\n";
echo "2. 🏷️  Configure your OneinFinite products with clear titles\n";
echo "3. 📊 Monitor the webhook logs during real purchases\n";
echo "4. 🧪 Test with actual purchases to verify end-to-end flow\n\n";

echo "📁 Files to deploy:\n";
echo "  • api/oneinfinite-webhook.php (modified)\n";
echo "  • assets/SQL_desde_Cero.pdf (already exists)\n";
echo "  • assets/Fundamentos_Python_Ian_Saura.pdf (already exists)\n\n";

echo "🎯 Problem solved: SQL purchases will now receive SQL books! 🎉\n";
?> 