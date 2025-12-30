<?php
/**
 * Discord Connection Handler
 * Allows subscribers to link their Discord account
 */

require_once __DIR__ . '/subscription-config.php';
require_once __DIR__ . '/discord-bot.php';

// Database connection function
function getDBConnection() {
    $credentialsFile = __DIR__ . '/.db-credentials.php';
    
    if (!file_exists($credentialsFile)) {
        throw new Exception("Credentials file not found");
    }
    
    $credentials = include $credentialsFile;
    
    $dsn = "mysql:host={$credentials['DB_HOST']};dbname={$credentials['DB_NAME']};charset={$credentials['DB_CHARSET']}";
    
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];
    
    return new PDO($dsn, $credentials['DB_USER'], $credentials['DB_PASSWORD'], $options);
}

// Logging
function logDiscordConnection($message, $data = []) {
    $logFile = __DIR__ . '/../logs/discord-connections.log';
    $timestamp = date('Y-m-d H:i:s');
    $logEntry = "[$timestamp] $message";
    if (!empty($data)) {
        $logEntry .= " - " . json_encode($data);
    }
    $logEntry .= "\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
}

// HTML response helper
function renderPage($title, $content, $success = true) {
    $bgColor = $success ? '#10B981' : '#EF4444';
    $icon = $success ? '✅' : '❌';
    
    echo "<!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>$title - Ian Saura Premium</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .container {
                background: white;
                border-radius: 16px;
                padding: 40px;
                max-width: 500px;
                width: 100%;
                text-align: center;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            .icon {
                font-size: 64px;
                margin-bottom: 20px;
            }
            h1 {
                color: #1F2937;
                margin-bottom: 15px;
                font-size: 24px;
            }
            p {
                color: #6B7280;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .status-badge {
                display: inline-block;
                background: $bgColor;
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .form-group {
                margin-bottom: 20px;
                text-align: left;
            }
            label {
                display: block;
                color: #374151;
                font-weight: 600;
                margin-bottom: 8px;
            }
            input[type='text'] {
                width: 100%;
                padding: 12px 16px;
                border: 2px solid #E5E7EB;
                border-radius: 8px;
                font-size: 16px;
                transition: border-color 0.2s;
            }
            input[type='text']:focus {
                outline: none;
                border-color: #4F46E5;
            }
            .hint {
                font-size: 13px;
                color: #9CA3AF;
                margin-top: 6px;
            }
            button {
                background: linear-gradient(135deg, #4F46E5, #7C3AED);
                color: white;
                border: none;
                padding: 14px 28px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
            }
            .discord-button {
                background: #5865F2;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }
            .link {
                color: #4F46E5;
                text-decoration: none;
            }
            .link:hover {
                text-decoration: underline;
            }
            .steps {
                background: #F9FAFB;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
                text-align: left;
            }
            .step {
                display: flex;
                gap: 12px;
                margin-bottom: 12px;
            }
            .step:last-child {
                margin-bottom: 0;
            }
            .step-num {
                background: #4F46E5;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
                flex-shrink: 0;
            }
            .step-text {
                color: #4B5563;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='icon'>$icon</div>
            $content
        </div>
    </body>
    </html>";
    exit();
}

try {
    $db = getDBConnection();
    
    // Handle form submission
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $token = $_POST['token'] ?? '';
        $discordUsername = trim($_POST['discord_username'] ?? '');
        
        if (empty($token) || empty($discordUsername)) {
            renderPage('Error', "
                <h1>Datos incompletos</h1>
                <p>Por favor, proporciona tu nombre de usuario de Discord.</p>
                <a href='javascript:history.back()' class='link'>← Volver</a>
            ", false);
        }
        
        // Validate token
        $stmt = $db->prepare("
            SELECT pc.*, s.id as subscriber_id, s.email, s.name, s.status
            FROM pending_discord_connections pc
            JOIN subscribers s ON pc.subscriber_id = s.id
            WHERE pc.connection_token = ? AND pc.used = FALSE AND pc.expires_at > NOW()
        ");
        $stmt->execute([$token]);
        $connection = $stmt->fetch();
        
        if (!$connection) {
            logDiscordConnection('Invalid or expired token', ['token' => substr($token, 0, 10) . '...']);
            renderPage('Enlace inválido', "
                <h1>Enlace inválido o expirado</h1>
                <p>Este enlace de conexión ya fue usado o ha expirado.</p>
                <p>Si necesitas un nuevo enlace, contacta a <a href='mailto:info@iansaura.com' class='link'>info@iansaura.com</a></p>
            ", false);
        }
        
        if ($connection['status'] !== 'active') {
            renderPage('Suscripción inactiva', "
                <h1>Tu suscripción no está activa</h1>
                <p>Para conectar Discord, necesitas tener una suscripción activa.</p>
                <p>Contacta a <a href='mailto:info@iansaura.com' class='link'>info@iansaura.com</a> si crees que es un error.</p>
            ", false);
        }
        
        // Try to find user in Discord
        $discord = new DiscordBot();
        
        logDiscordConnection('Searching for Discord user', ['username' => $discordUsername]);
        
        $discordUserId = $discord->findUserByUsername($discordUsername);
        
        if (!$discordUserId) {
            logDiscordConnection('Discord user not found', ['username' => $discordUsername]);
            renderPage('Usuario no encontrado', "
                <h1>No encontré tu usuario de Discord</h1>
                <p>No pude encontrar el usuario <strong>$discordUsername</strong> en el servidor.</p>
                <div class='steps'>
                    <div class='step'>
                        <span class='step-num'>1</span>
                        <span class='step-text'>Asegúrate de haber ingresado al servidor de Discord primero</span>
                    </div>
                    <div class='step'>
                        <span class='step-num'>2</span>
                        <span class='step-text'>Verifica que escribiste tu nombre de usuario correctamente (sin el @)</span>
                    </div>
                    <div class='step'>
                        <span class='step-num'>3</span>
                        <span class='step-text'>Intenta con tu nombre de usuario, no tu nombre para mostrar</span>
                    </div>
                </div>
                <a href='https://discord.gg/jfyqeAMpmk' target='_blank' class='discord-button' style='display: inline-flex; text-decoration: none; padding: 12px 24px; margin-bottom: 15px;'>
                    <svg width='24' height='24' viewBox='0 0 24 24' fill='white'><path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z'/></svg>
                    Unirme al servidor
                </a>
                <br>
                <a href='?token=$token' class='link'>← Intentar de nuevo</a>
            ", false);
        }
        
        // Assign role
        try {
            $discord->addSubscriberRole($discordUserId);
            logDiscordConnection('Role assigned successfully', [
                'discord_id' => $discordUserId,
                'username' => $discordUsername
            ]);
        } catch (Exception $e) {
            logDiscordConnection('Failed to assign role', [
                'error' => $e->getMessage(),
                'discord_id' => $discordUserId
            ]);
            renderPage('Error al asignar rol', "
                <h1>Error al asignar el rol</h1>
                <p>Encontré tu usuario pero no pude asignarte el rol de suscriptor.</p>
                <p>Por favor contacta a <a href='mailto:info@iansaura.com' class='link'>info@iansaura.com</a> con este error:</p>
                <p style='background: #FEE2E2; padding: 10px; border-radius: 8px; font-size: 12px; color: #991B1B;'>" . htmlspecialchars($e->getMessage()) . "</p>
            ", false);
        }
        
        // Update subscriber record
        $stmt = $db->prepare("
            UPDATE subscribers SET 
                discord_username = ?,
                discord_user_id = ?,
                discord_role_assigned = TRUE,
                updated_at = NOW()
            WHERE id = ?
        ");
        $stmt->execute([$discordUsername, $discordUserId, $connection['subscriber_id']]);
        
        // Mark token as used
        $stmt = $db->prepare("UPDATE pending_discord_connections SET used = TRUE WHERE connection_token = ?");
        $stmt->execute([$token]);
        
        // Log event
        $stmt = $db->prepare("
            INSERT INTO subscription_events (subscriber_id, event_type, event_data)
            VALUES (?, 'discord_role_added', ?)
        ");
        $stmt->execute([$connection['subscriber_id'], json_encode([
            'discord_username' => $discordUsername,
            'discord_user_id' => $discordUserId
        ])]);
        
        logDiscordConnection('Discord connection completed', [
            'subscriber_id' => $connection['subscriber_id'],
            'discord_id' => $discordUserId,
            'username' => $discordUsername
        ]);
        
        // Success page
        renderPage('¡Conectado!', "
            <span class='status-badge'>✓ Conexión exitosa</span>
            <h1>¡Discord conectado!</h1>
            <p>Tu cuenta de Discord <strong>$discordUsername</strong> ha sido vinculada exitosamente.</p>
            <p>Ya tienes acceso al canal exclusivo de suscriptores en el servidor.</p>
            <div class='steps'>
                <div class='step'>
                    <span class='step-num'>✓</span>
                    <span class='step-text'>Rol de suscriptor asignado</span>
                </div>
                <div class='step'>
                    <span class='step-num'>✓</span>
                    <span class='step-text'>Acceso a canales exclusivos</span>
                </div>
            </div>
            <a href='https://discord.gg/jfyqeAMpmk' target='_blank' class='discord-button' style='display: inline-flex; text-decoration: none; padding: 14px 28px;'>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='white'><path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z'/></svg>
                Ir al servidor de Discord
            </a>
        ", true);
    }
    
    // GET request - show form
    $token = $_GET['token'] ?? '';
    
    if (empty($token)) {
        renderPage('Error', "
            <h1>Token requerido</h1>
            <p>Necesitas usar el enlace que recibiste por email para conectar tu Discord.</p>
        ", false);
    }
    
    // Validate token exists and is valid
    $stmt = $db->prepare("
        SELECT pc.*, s.email, s.name, s.status
        FROM pending_discord_connections pc
        JOIN subscribers s ON pc.subscriber_id = s.id
        WHERE pc.connection_token = ? AND pc.used = FALSE AND pc.expires_at > NOW()
    ");
    $stmt->execute([$token]);
    $connection = $stmt->fetch();
    
    if (!$connection) {
        renderPage('Enlace inválido', "
            <h1>Enlace inválido o expirado</h1>
            <p>Este enlace de conexión ya fue usado o ha expirado.</p>
            <p>Si necesitas un nuevo enlace, contacta a <a href='mailto:info@iansaura.com' class='link'>info@iansaura.com</a></p>
        ", false);
    }
    
    // Show connection form
    $subscriberName = htmlspecialchars($connection['name'] ?? 'Suscriptor');
    
    echo "<!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Conectar Discord - Ian Saura Premium</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                background: linear-gradient(135deg, #1F2937 0%, #111827 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .container {
                background: white;
                border-radius: 16px;
                padding: 40px;
                max-width: 500px;
                width: 100%;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .icon {
                font-size: 64px;
                margin-bottom: 15px;
            }
            h1 {
                color: #1F2937;
                margin-bottom: 10px;
                font-size: 24px;
            }
            .subtitle {
                color: #6B7280;
                font-size: 16px;
            }
            .steps {
                background: #F9FAFB;
                border-radius: 12px;
                padding: 20px;
                margin: 20px 0;
            }
            .step {
                display: flex;
                gap: 12px;
                margin-bottom: 15px;
                align-items: flex-start;
            }
            .step:last-child {
                margin-bottom: 0;
            }
            .step-num {
                background: #4F46E5;
                color: white;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
                font-weight: 600;
                flex-shrink: 0;
            }
            .step-content h3 {
                color: #1F2937;
                font-size: 15px;
                margin-bottom: 4px;
            }
            .step-content p {
                color: #6B7280;
                font-size: 13px;
                line-height: 1.5;
            }
            .discord-join {
                background: #5865F2;
                color: white;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 6px;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                font-weight: 500;
                margin-top: 8px;
            }
            .discord-join:hover {
                background: #4752C4;
            }
            .form-group {
                margin-bottom: 20px;
            }
            label {
                display: block;
                color: #374151;
                font-weight: 600;
                margin-bottom: 8px;
            }
            input[type='text'] {
                width: 100%;
                padding: 14px 16px;
                border: 2px solid #E5E7EB;
                border-radius: 10px;
                font-size: 16px;
                transition: border-color 0.2s;
            }
            input[type='text']:focus {
                outline: none;
                border-color: #4F46E5;
            }
            .hint {
                font-size: 13px;
                color: #9CA3AF;
                margin-top: 8px;
            }
            button {
                background: linear-gradient(135deg, #4F46E5, #7C3AED);
                color: white;
                border: none;
                padding: 16px 28px;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                width: 100%;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            button:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(79, 70, 229, 0.35);
            }
            .welcome {
                background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 25px;
                text-align: center;
            }
            .welcome p {
                color: #065F46;
                font-weight: 500;
            }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <div class='icon'>🔗</div>
                <h1>Conectar tu Discord</h1>
                <p class='subtitle'>Vincula tu cuenta para acceder al contenido exclusivo</p>
            </div>
            
            <div class='welcome'>
                <p>👋 ¡Hola, $subscriberName!</p>
            </div>
            
            <div class='steps'>
                <div class='step'>
                    <span class='step-num'>1</span>
                    <div class='step-content'>
                        <h3>Únete al servidor de Discord</h3>
                        <p>Si aún no estás en el servidor, únete primero:</p>
                        <a href='https://discord.gg/jfyqeAMpmk' target='_blank' class='discord-join'>
                            <svg width='20' height='20' viewBox='0 0 24 24' fill='white'><path d='M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z'/></svg>
                            Unirme al servidor
                        </a>
                    </div>
                </div>
                <div class='step'>
                    <span class='step-num'>2</span>
                    <div class='step-content'>
                        <h3>Ingresa tu nombre de usuario</h3>
                        <p>Escribe tu nombre de usuario de Discord (sin el @)</p>
                    </div>
                </div>
            </div>
            
            <form method='POST' action=''>
                <input type='hidden' name='token' value='" . htmlspecialchars($token) . "'>
                
                <div class='form-group'>
                    <label for='discord_username'>Tu nombre de usuario de Discord</label>
                    <input type='text' id='discord_username' name='discord_username' placeholder='ejemplo: iansaura' required>
                    <p class='hint'>💡 Es tu nombre de usuario, no tu nombre para mostrar. Lo encuentras en Configuración → Mi cuenta</p>
                </div>
                
                <button type='submit'>🔗 Conectar mi Discord</button>
            </form>
        </div>
    </body>
    </html>";
    
} catch (Exception $e) {
    error_log("Discord connection error: " . $e->getMessage());
    renderPage('Error', "
        <h1>Error del sistema</h1>
        <p>Ocurrió un error procesando tu solicitud.</p>
        <p>Por favor contacta a <a href='mailto:info@iansaura.com' style='color: #4F46E5;'>info@iansaura.com</a></p>
    ", false);
}
?>