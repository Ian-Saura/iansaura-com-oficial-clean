<?php
/**
 * Migrate OneInfinite Active Users
 * Asigna premium a usuarios que pagaron en OneInfinite
 * Fecha inicio: 1 Dic 2024, Vencimiento: 1 Ene 2025
 */

header('Content-Type: application/json');
require_once 'secure-config.php';

$users = [
    ['name' => 'Julio Lau', 'email' => 'julio.lau.n@gmail.com'],
    ['name' => 'Sergio Martin', 'email' => 'sergiom297@gmail.com'],
    ['name' => 'Mauricio Sam Chang', 'email' => 'sam_mauricio@outlook.com'],
    ['name' => 'Neivys Gonzalez', 'email' => 'imneiluz@gmail.com'],
    ['name' => 'Isabella Sansonetti', 'email' => 'isasansonetti01@gmail.com'],
    ['name' => 'Kevin Gonzales', 'email' => 'kevin.gonzales.m@uni.pe'],
    ['name' => 'Juan Cruz Godoy', 'email' => 'godoy.juan.cruz.28@gmail.com'],
    ['name' => 'Rodrigo Castro', 'email' => 'castrorodrigodev@gmail.com'],
    ['name' => 'Jose Imanol Salas', 'email' => 'j.imanol68@gmail.com'],
    ['name' => 'Sebastián Matías González', 'email' => 'sebastian.mgonzalez@hotmail.com'],
    ['name' => 'Patricio Diaz Medin', 'email' => 'pdiazmedin@gmail.com'],
    ['name' => 'Agustín Garcia', 'email' => 'agussgar32@gmail.com'],
    ['name' => 'Ivan Florez', 'email' => 'ivan.projectos.data@gmail.com'],
    ['name' => 'Juan Rodriguez', 'email' => 'juanjorb23@gmail.com'],
    ['name' => 'Alejandro Josafat Loera Ramirez', 'email' => 'josafat_22@hotmail.es'],
];

$subscriptionStart = '2024-12-01 00:00:00';
$subscriptionEnd = '2025-01-01 23:59:59';

try {
    $db = getSecureDBConnection();
    $results = [];
    
    foreach ($users as $user) {
        $email = $user['email'];
        $name = $user['name'];
        
        // Check if subscriber exists
        $stmt = $db->prepare("SELECT id, status FROM subscribers WHERE email = ?");
        $stmt->execute([$email]);
        $existing = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($existing) {
            // Update existing
            $stmt = $db->prepare("
                UPDATE subscribers 
                SET status = 'active',
                    payment_type = 'oneinfinite',
                    subscription_start = ?,
                    subscription_end = ?,
                    notes = CONCAT(IFNULL(notes, ''), '\n[', NOW(), '] Migrado de OneInfinite - mes pagado Dic 2024')
                WHERE email = ?
            ");
            $stmt->execute([$subscriptionStart, $subscriptionEnd, $email]);
            $results[] = ['email' => $email, 'action' => 'updated', 'name' => $name];
        } else {
            // Insert new
            $stmt = $db->prepare("
                INSERT INTO subscribers (email, name, status, payment_type, subscription_start, subscription_end, notes, created_at)
                VALUES (?, ?, 'active', 'oneinfinite', ?, ?, ?, NOW())
            ");
            $stmt->execute([
                $email, 
                $name, 
                $subscriptionStart, 
                $subscriptionEnd,
                'Migrado de OneInfinite - mes pagado Dic 2024'
            ]);
            $results[] = ['email' => $email, 'action' => 'created', 'name' => $name];
        }
        
        // Update users table
        $stmt = $db->prepare("UPDATE users SET subscribed = 1 WHERE email = ?");
        $stmt->execute([$email]);
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Migración completada',
        'subscription_start' => $subscriptionStart,
        'subscription_end' => $subscriptionEnd,
        'users_processed' => count($results),
        'results' => $results
    ], JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

