<?php
/**
 * Generate Invoice/Receipt
 * Creates a printable receipt for the user's subscription
 */

require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'secure-config.php';

try {
    $email = $_GET['email'] ?? null;
    $type = $_GET['type'] ?? 'current'; // 'current' or 'history'
    
    if (!$email) {
        http_response_code(400);
        echo 'Email requerido';
        exit();
    }
    
    $db = getSecureDBConnection();
    
    // Get subscriber info
    $stmt = $db->prepare("
        SELECT s.*, u.name as user_name
        FROM subscribers s
        LEFT JOIN users u ON s.email = u.email
        WHERE s.email = ?
    ");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$subscriber) {
        http_response_code(404);
        echo '<!DOCTYPE html><html><head><title>Error</title></head><body style="font-family: sans-serif; padding: 40px; text-align: center;"><h1>No se encontró suscripción</h1><p>El email proporcionado no tiene una suscripción activa.</p><a href="javascript:window.close()">Cerrar</a></body></html>';
        exit();
    }
    
    // Generate HTML receipt
    $name = $subscriber['user_name'] ?? $subscriber['name'] ?? 'Usuario';
    $startDate = $subscriber['subscription_start'] ? date('d/m/Y', strtotime($subscriber['subscription_start'])) : '-';
    $endDate = $subscriber['subscription_end'] ? date('d/m/Y', strtotime($subscriber['subscription_end'])) : '-';
    $status = $subscriber['status'] ?? 'unknown';
    $planType = $subscriber['plan_type'] ?? 'monthly';
    
    // Determine price based on plan
    $prices = [
        'monthly' => ['amount' => 20, 'period' => 'Mensual'],
        '6months' => ['amount' => 150, 'period' => '6 Meses'],
        '12months' => ['amount' => 240, 'period' => '12 Meses'],
        'trial' => ['amount' => 0, 'period' => 'Período de prueba']
    ];
    $price = $prices[$planType] ?? $prices['monthly'];
    
    $invoiceNumber = 'IS-' . date('Y') . '-' . str_pad($subscriber['id'], 6, '0', STR_PAD_LEFT);
    $today = date('d/m/Y');
    
    // Generate professional receipt HTML (opens in browser for printing)
    echo '<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Comprobante de Suscripción - Ian Saura</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #f5f5f5;
            padding: 40px;
            color: #333;
        }
        .invoice {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
            color: white;
            padding: 40px;
            text-align: center;
        }
        .header h1 { font-size: 28px; margin-bottom: 8px; }
        .header p { opacity: 0.9; }
        .content { padding: 40px; }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
        }
        .info-section h3 {
            font-size: 12px;
            text-transform: uppercase;
            color: #888;
            margin-bottom: 8px;
            letter-spacing: 1px;
        }
        .info-section p {
            font-size: 16px;
            color: #333;
        }
        .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .details-table th {
            background: #f8f9fa;
            padding: 15px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid #e5e7eb;
        }
        .details-table td {
            padding: 15px;
            border-bottom: 1px solid #e5e7eb;
        }
        .total-row td {
            font-weight: bold;
            font-size: 18px;
            background: #f0fdf4;
            color: #10b981;
        }
        .footer {
            text-align: center;
            padding: 30px;
            background: #f8f9fa;
            color: #666;
            font-size: 14px;
        }
        .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }
        .status-active { background: #d1fae5; color: #059669; }
        .status-trial { background: #cffafe; color: #0891b2; }
        .status-cancelled { background: #fed7aa; color: #c2410c; }
        .status-expired { background: #fecaca; color: #dc2626; }
        .print-bar {
            max-width: 800px;
            margin: 0 auto 20px;
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }
        .print-btn {
            padding: 12px 24px;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .print-btn:hover { background: #059669; }
        .close-btn {
            padding: 12px 24px;
            background: #64748b;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            cursor: pointer;
        }
        .close-btn:hover { background: #475569; }
        @media print {
            body { padding: 0; background: white; }
            .invoice { box-shadow: none; }
            .print-bar { display: none; }
        }
    </style>
</head>
<body>
    <div class="print-bar">
        <button class="close-btn" onclick="window.close()">Cerrar</button>
        <button class="print-btn" onclick="window.print()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Imprimir / Guardar PDF
        </button>
    </div>
    <div class="invoice">
        <div class="header">
            <h1>Ian Saura</h1>
            <p>Academia de Data Engineering</p>
        </div>
        
        <div class="content">
            <div class="info-grid">
                <div class="info-section">
                    <h3>Comprobante N°</h3>
                    <p>' . htmlspecialchars($invoiceNumber) . '</p>
                </div>
                <div class="info-section">
                    <h3>Fecha de emisión</h3>
                    <p>' . $today . '</p>
                </div>
                <div class="info-section">
                    <h3>Cliente</h3>
                    <p>' . htmlspecialchars($name) . '</p>
                    <p style="color: #666; font-size: 14px;">' . htmlspecialchars($email) . '</p>
                </div>
                <div class="info-section">
                    <h3>Estado</h3>
                    <p>
                        <span class="status-badge status-' . $status . '">
                            ' . ucfirst($status) . '
                        </span>
                    </p>
                </div>
            </div>
            
            <table class="details-table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Período</th>
                        <th style="text-align: right;">Monto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <strong>Suscripción Premium</strong><br>
                            <span style="color: #666; font-size: 14px;">Acceso completo a la Academia</span>
                        </td>
                        <td>' . $price['period'] . '</td>
                        <td style="text-align: right;">$' . $price['amount'] . ' USD</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="2">Total</td>
                        <td style="text-align: right;">$' . $price['amount'] . ' USD</td>
                    </tr>
                </tbody>
            </table>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin-bottom: 10px;"><strong>Período de suscripción:</strong></p>
                <p>Desde: ' . $startDate . '</p>
                <p>Hasta: ' . $endDate . '</p>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
                Este comprobante es válido como constancia de su suscripción a la Academia de Data Engineering de Ian Saura.
                Para consultas sobre facturación, contactar a info@iansaura.com
            </p>
        </div>
        
        <div class="footer">
            <p>Ian Saura - Academia de Data Engineering</p>
            <p>info@iansaura.com | iansaura.com</p>
        </div>
    </div>
</body>
</html>';
    
} catch (Exception $e) {
    error_log("Generate invoice error: " . $e->getMessage());
    http_response_code(500);
    echo 'Error generando comprobante';
}


                        <td>
                            <strong>Suscripción Premium</strong><br>
                            <span style="color: #666; font-size: 14px;">Acceso completo a la Academia</span>
                        </td>
                        <td>' . $price['period'] . '</td>
                        <td style="text-align: right;">$' . $price['amount'] . ' USD</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="2">Total</td>
                        <td style="text-align: right;">$' . $price['amount'] . ' USD</td>
                    </tr>
                </tbody>
            </table>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin-bottom: 10px;"><strong>Período de suscripción:</strong></p>
                <p>Desde: ' . $startDate . '</p>
                <p>Hasta: ' . $endDate . '</p>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
                Este comprobante es válido como constancia de su suscripción a la Academia de Data Engineering de Ian Saura.
                Para consultas sobre facturación, contactar a info@iansaura.com
            </p>
        </div>
        
        <div class="footer">
            <p>Ian Saura - Academia de Data Engineering</p>
            <p>info@iansaura.com | iansaura.com</p>
        </div>
    </div>
</body>
</html>';
    
} catch (Exception $e) {
    error_log("Generate invoice error: " . $e->getMessage());
    http_response_code(500);
    echo 'Error generando comprobante';
}

