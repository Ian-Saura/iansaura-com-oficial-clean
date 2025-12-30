<?php
/**
 * Check Delivery Status Script
 * Verifica si las compras fueron entregadas exitosamente
 */

// Function to read and parse logs
function checkDeliveryLogs($email = null, $paymentId = null, $days = 7) {
    $webhookLog = __DIR__ . '/logs/oneinfinite-webhook.log';
    $pdfLog = __DIR__ . '/logs/pdf-delivery.log';
    $sqlLog = __DIR__ . '/logs/pdf-delivery-sql.log';
    
    $results = [
        'webhooks' => [],
        'python_deliveries' => [],
        'sql_deliveries' => [],
        'summary' => []
    ];
    
    // Check webhook logs
    if (file_exists($webhookLog)) {
        $webhookLines = file($webhookLog, FILE_IGNORE_NEW_LINES);
        $cutoffDate = date('Y-m-d', strtotime("-$days days"));
        
        foreach ($webhookLines as $line) {
            // Filter by date
            if (strpos($line, $cutoffDate) === false && $days < 30) {
                continue;
            }
            
            // Filter by email or payment ID if specified
            if ($email && strpos($line, $email) === false) {
                continue;
            }
            if ($paymentId && strpos($line, $paymentId) === false) {
                continue;
            }
            
            // Parse webhook events
            if (strpos($line, 'Payment validated successfully') !== false ||
                strpos($line, 'PDF delivered successfully') !== false ||
                strpos($line, 'Payment validation failed') !== false) {
                $results['webhooks'][] = $line;
            }
        }
    }
    
    // Check Python PDF delivery logs
    if (file_exists($pdfLog)) {
        $pdfLines = file($pdfLog, FILE_IGNORE_NEW_LINES);
        $cutoffDate = date('Y-m-d', strtotime("-$days days"));
        
        foreach ($pdfLines as $line) {
            // Filter by date
            if (strpos($line, $cutoffDate) === false && $days < 30) {
                continue;
            }
            
            // Filter by email if specified
            if ($email && strpos($line, $email) === false) {
                continue;
            }
            
            // Parse delivery events
            if (strpos($line, 'PDF delivery request received') !== false ||
                strpos($line, 'PDF enviado exitosamente') !== false ||
                strpos($line, 'PDF delivery error') !== false) {
                $results['python_deliveries'][] = $line;
            }
        }
    }
    
    // Check SQL PDF delivery logs
    if (file_exists($sqlLog)) {
        $sqlLines = file($sqlLog, FILE_IGNORE_NEW_LINES);
        $cutoffDate = date('Y-m-d', strtotime("-$days days"));
        
        foreach ($sqlLines as $line) {
            // Filter by date
            if (strpos($line, $cutoffDate) === false && $days < 30) {
                continue;
            }
            
            // Filter by email if specified
            if ($email && strpos($line, $email) === false) {
                continue;
            }
            
            // Parse delivery events
            if (strpos($line, 'SQL PDF delivery request received') !== false ||
                strpos($line, 'SQL PDF email sent successfully') !== false ||
                strpos($line, 'SQL PDF email failed') !== false) {
                $results['sql_deliveries'][] = $line;
            }
        }
    }
    
    // Generate summary
    $successfulDeliveries = 0;
    $failedDeliveries = 0;
    $totalWebhooks = 0;
    $pythonDeliveries = 0;
    $sqlDeliveries = 0;
    
    foreach ($results['webhooks'] as $webhook) {
        if (strpos($webhook, 'PDF delivered successfully') !== false) {
            $successfulDeliveries++;
        }
        $totalWebhooks++;
    }
    
    foreach ($results['python_deliveries'] as $delivery) {
        if (strpos($delivery, 'PDF enviado exitosamente') !== false) {
            $pythonDeliveries++;
        } elseif (strpos($delivery, 'PDF delivery error') !== false) {
            $failedDeliveries++;
        }
    }
    
    foreach ($results['sql_deliveries'] as $delivery) {
        if (strpos($delivery, 'SQL PDF email sent successfully') !== false) {
            $sqlDeliveries++;
        } elseif (strpos($delivery, 'SQL PDF email failed') !== false) {
            $failedDeliveries++;
        }
    }
    
    $results['summary'] = [
        'total_webhooks' => $totalWebhooks,
        'successful_deliveries' => $successfulDeliveries,
        'python_deliveries' => $pythonDeliveries,
        'sql_deliveries' => $sqlDeliveries,
        'failed_deliveries' => $failedDeliveries,
        'success_rate' => $totalWebhooks > 0 ? round(($successfulDeliveries / $totalWebhooks) * 100, 2) : 0
    ];
    
    return $results;
}

// Function to check specific email
function checkEmailDelivery($email) {
    echo "🔍 Verificando entregas para: $email\n\n";
    
    $results = checkDeliveryLogs($email, null, 30); // Last 30 days
    
    if (empty($results['webhooks']) && empty($results['python_deliveries']) && empty($results['sql_deliveries'])) {
        echo "❌ No se encontraron registros para este email\n";
        return false;
    }
    
    echo "📊 Resultados encontrados:\n";
    echo "- Webhooks procesados: " . count($results['webhooks']) . "\n";
    echo "- Entregas Python procesadas: " . count($results['python_deliveries']) . "\n";
    echo "- Entregas SQL procesadas: " . count($results['sql_deliveries']) . "\n\n";
    
    echo "🔄 Eventos de webhook:\n";
    foreach ($results['webhooks'] as $webhook) {
        echo "  " . $webhook . "\n";
    }
    
    echo "\n�� Eventos de entrega Python:\n";
    foreach ($results['python_deliveries'] as $delivery) {
        echo "  " . $delivery . "\n";
    }
    
    echo "\n📧 Eventos de entrega SQL:\n";
    foreach ($results['sql_deliveries'] as $delivery) {
        echo "  " . $delivery . "\n";
    }
    
    return true;
}

// Function to get recent deliveries summary
function getRecentDeliveriesSummary($days = 7) {
    echo "📈 Resumen de entregas (últimos $days días)\n";
    echo "=" . str_repeat("=", 50) . "\n\n";
    
    $results = checkDeliveryLogs(null, null, $days);
    
    echo "📊 Estadísticas:\n";
    echo "- Total webhooks: " . $results['summary']['total_webhooks'] . "\n";
    echo "- Entregas exitosas: " . $results['summary']['successful_deliveries'] . "\n";
    echo "- Entregas Python: " . $results['summary']['python_deliveries'] . "\n";
    echo "- Entregas SQL: " . $results['summary']['sql_deliveries'] . "\n";
    echo "- Entregas fallidas: " . $results['summary']['failed_deliveries'] . "\n";
    echo "- Tasa de éxito: " . $results['summary']['success_rate'] . "%\n\n";
    
    if (!empty($results['webhooks'])) {
        echo "🔄 Últimos webhooks:\n";
        $recentWebhooks = array_slice($results['webhooks'], -10);
        foreach ($recentWebhooks as $webhook) {
            echo "  " . $webhook . "\n";
        }
    }
    
    return $results;
}

// Function to check processed payments (avoid duplicates)
function checkProcessedPayments() {
    $processedFile = __DIR__ . '/logs/processed-webhooks.log';
    
    if (!file_exists($processedFile)) {
        echo "❌ Archivo de pagos procesados no encontrado\n";
        return [];
    }
    
    $processedPayments = file($processedFile, FILE_IGNORE_NEW_LINES);
    
    echo "💳 Pagos procesados (últimos 10):\n";
    $recent = array_slice($processedPayments, -10);
    foreach ($recent as $paymentId) {
        echo "  - $paymentId\n";
    }
    
    echo "\nTotal pagos procesados: " . count($processedPayments) . "\n\n";
    
    return $processedPayments;
}

// Main execution
echo "🚀 Verificador de Entregas - Ian Saura\n";
echo "====================================\n\n";

// Check command line arguments
if ($argc > 1) {
    $command = $argv[1];
    
    switch ($command) {
        case 'email':
            if ($argc < 3) {
                echo "❌ Uso: php check-deliveries.php email usuario@ejemplo.com\n";
                exit(1);
            }
            checkEmailDelivery($argv[2]);
            break;
            
        case 'summary':
            $days = $argc > 2 ? (int)$argv[2] : 7;
            getRecentDeliveriesSummary($days);
            break;
            
        case 'processed':
            checkProcessedPayments();
            break;
            
        default:
            echo "❌ Comando no reconocido: $command\n";
            echo "Comandos disponibles:\n";
            echo "  email <email>     - Verificar entregas para un email específico\n";
            echo "  summary [días]    - Resumen de entregas recientes (default: 7 días)\n";
            echo "  processed         - Ver pagos procesados\n";
            exit(1);
    }
} else {
    // Default: show recent summary
    getRecentDeliveriesSummary(7);
    echo "\n";
    checkProcessedPayments();
    
    echo "💡 Para más opciones:\n";
    echo "  php check-deliveries.php email usuario@ejemplo.com\n";
    echo "  php check-deliveries.php summary 30\n";
    echo "  php check-deliveries.php processed\n";
}

echo "\n✅ Verificación completada\n";
?> 