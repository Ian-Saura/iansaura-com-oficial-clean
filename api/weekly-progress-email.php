<?php
/**
 * Weekly Progress Email
 * Envía resumen semanal de progreso a usuarios activos
 * 
 * Ejecutar con cron: 0 10 * * 1 (Lunes 10am)
 */

require_once 'secure-config.php';
require_once 'email-helper.php';

// Solo ejecutar desde CLI o con key secreta
$cronKeys = ['weekly_cron_key_2024', 'iansaura_cron_2024_secret', 'ian_admin_2024_secure_key_xyz'];
$providedKey = $_GET['key'] ?? $_GET['cron_key'] ?? '';
$isCliOrAuthorized = php_sapi_name() === 'cli' || in_array($providedKey, $cronKeys);

if (!$isCliOrAuthorized) {
    http_response_code(403);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Unauthorized']);
    exit();
}

header('Content-Type: application/json');

try {
    $db = getSecureDBConnection();
    
    // Obtener usuarios con progreso en la última semana
    $stmt = $db->query("
        SELECT 
            u.email,
            COALESCE(u.full_name, u.name, 'Data Engineer') as name,
            up.completed_steps,
            up.completed_projects,
            up.watched_videos,
            up.xp,
            up.current_streak,
            up.level_1_percent,
            up.level_2_percent,
            up.level_3_percent,
            up.last_activity
        FROM user_progress up
        JOIN users u ON up.email = u.email
        WHERE up.last_activity > DATE_SUB(NOW(), INTERVAL 7 DAY)
        AND u.email NOT LIKE '%test%'
    ");
    
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $sent = 0;
    $errors = 0;
    
    foreach ($users as $user) {
        $stepsCount = count(json_decode($user['completed_steps'] ?? '[]', true) ?: []);
        $projectsCount = count(json_decode($user['completed_projects'] ?? '[]', true) ?: []);
        $videosCount = count(json_decode($user['watched_videos'] ?? '[]', true) ?: []);
        
        // Determinar nivel actual
        $level = 1;
        if ($user['level_1_percent'] >= 100) $level = 2;
        if ($user['level_2_percent'] >= 100) $level = 3;
        
        $levelEmoji = ['🌱', '🚀', '👑'][$level - 1];
        $levelName = ['Novato', 'Guerrero', 'Maestro'][$level - 1];
        
        $content = "
            <p style='font-size: 18px; margin-bottom: 20px;'>¡Hola <strong>{$user['name']}</strong>! 👋</p>
            
            <p>Acá está tu resumen semanal de progreso:</p>
            
            <table style='width: 100%; margin: 20px 0; border-collapse: collapse;'>
                <tr>
                    <td style='padding: 15px; background: #334155; border-radius: 8px 0 0 8px; text-align: center;'>
                        <div style='font-size: 24px; font-weight: bold; color: #10B981;'>$stepsCount</div>
                        <div style='font-size: 12px; color: #94a3b8;'>Pasos</div>
                    </td>
                    <td style='padding: 15px; background: #334155; text-align: center;'>
                        <div style='font-size: 24px; font-weight: bold; color: #3B82F6;'>$projectsCount</div>
                        <div style='font-size: 12px; color: #94a3b8;'>Proyectos</div>
                    </td>
                    <td style='padding: 15px; background: #334155; text-align: center;'>
                        <div style='font-size: 24px; font-weight: bold; color: #EF4444;'>$videosCount</div>
                        <div style='font-size: 12px; color: #94a3b8;'>Videos</div>
                    </td>
                    <td style='padding: 15px; background: #334155; border-radius: 0 8px 8px 0; text-align: center;'>
                        <div style='font-size: 24px; font-weight: bold; color: #F59E0B;'>{$user['xp']}</div>
                        <div style='font-size: 12px; color: #94a3b8;'>XP Total</div>
                    </td>
                </tr>
            </table>
            
            <p style='background: #334155; padding: 15px; border-radius: 8px; text-align: center;'>
                <span style='font-size: 24px;'>$levelEmoji</span><br>
                <span style='color: #10B981; font-weight: bold;'>Nivel $level: $levelName</span><br>
                <span style='color: #94a3b8; font-size: 14px;'>🔥 Racha: {$user['current_streak']} días</span>
            </p>
            
            <p style='margin-top: 20px;'>¡Seguí así! Cada paso te acerca más a tu objetivo. 💪</p>
        ";
        
        $html = getEmailTemplate(
            '📊 Tu Progreso Semanal',
            $content,
            'Continuar Aprendiendo',
            'https://iansaura.com/members'
        );
        
        $result = sendEmailSMTP(
            $user['email'],
            $user['name'],
            '📊 Tu resumen semanal - Ian Saura Academy',
            $html
        );
        
        if ($result) {
            $sent++;
        } else {
            $errors++;
            error_log("Failed to send weekly email to: " . $user['email']);
        }
        
        // Rate limit
        usleep(500000); // 0.5 segundos entre emails
    }
    
    $result = [
        'success' => true,
        'total_users' => count($users),
        'sent' => $sent,
        'errors' => $errors,
        'timestamp' => date('c')
    ];
    
    echo json_encode($result, JSON_PRETTY_PRINT);
    
} catch (Exception $e) {
    error_log("Weekly Progress Email Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}