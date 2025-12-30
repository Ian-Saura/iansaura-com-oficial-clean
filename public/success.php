<?php
// Verificación de acceso desde el servidor
function validateServerAccess() {
    // 1. Verificar referer
    $referer = $_SERVER['HTTP_REFERER'] ?? '';
    $validReferers = [
        'onei.la',
        'www.onei.la',
        'checkout.onei.la',
        'pay.onei.la'
    ];
    
    $hasValidReferer = false;
    foreach ($validReferers as $domain) {
        if (strpos($referer, $domain) !== false) {
            $hasValidReferer = true;
            break;
        }
    }
    
    // 2. Verificar si tiene parámetros de pago válidos
    $hasValidParams = isset($_GET['status']) || 
                     isset($_GET['payment']) || 
                     isset($_GET['success']);
    
    // 3. Verificar si es desarrollo (localhost)
    $isDevelopment = in_array($_SERVER['SERVER_NAME'], ['localhost', '127.0.0.1']) ||
                    strpos($_SERVER['SERVER_NAME'], 'localhost') !== false;
    
    // 4. Verificar user agent (no debe ser bot)
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $isBotLike = preg_match('/bot|crawler|spider|scraper/i', $userAgent);
    
    // Log para debug en desarrollo
    if ($isDevelopment) {
        error_log("Access validation: referer=$referer, hasValidReferer=" . ($hasValidReferer ? 'true' : 'false') . 
                 ", hasValidParams=" . ($hasValidParams ? 'true' : 'false') . 
                 ", userAgent=$userAgent, isBotLike=" . ($isBotLike ? 'true' : 'false'));
    }
    
    return ($hasValidReferer || $hasValidParams || $isDevelopment) && !$isBotLike;
}

// Validar acceso
if (!validateServerAccess()) {
    // Redireccionar a página de acceso denegado
    http_response_code(403);
    ?>
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Acceso Denegado - Ian Saura</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }
            .container {
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 500px;
                width: 100%;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .access-denied {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                color: #856404;
                padding: 30px;
                border-radius: 15px;
                text-align: center;
            }
            h1 { color: #856404; margin-bottom: 20px; }
            p { line-height: 1.6; margin-bottom: 20px; }
            a { color: #667eea; text-decoration: none; font-weight: 600; }
            a:hover { text-decoration: underline; }
            ul { text-align: left; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container access-denied">
            <h1>🚫 Acceso No Autorizado</h1>
            <p>Esta página solo es accesible después de realizar una compra exitosa.</p>
            <p>Si acabas de comprar el libro, por favor:</p>
            <ul>
                <li>Verifica que llegaste aquí desde el sistema de pago</li>
                <li>Asegúrate de que tu compra se procesó correctamente</li>
                <li>Contacta soporte si continúas teniendo problemas</li>
            </ul>
            <p>
                <a href="https://www.iansaura.com">← Volver al sitio principal</a> | 
                <a href="mailto:info@iansaura.com">Contactar Soporte</a>
            </p>
        </div>
    </body>
    </html>
    <?php
    exit;
}

// Si llegamos aquí, el acceso es válido
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Compra Exitosa! - Ian Saura</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .success-container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            animation: slideUp 0.6s ease-out;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .success-icon {
            width: 80px;
            height: 80px;
            background: #4CAF50;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 30px;
            animation: bounceIn 0.8s ease-out 0.3s both;
        }

        @keyframes bounceIn {
            0% { transform: scale(0); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }

        .checkmark {
            color: white;
            font-size: 40px;
            font-weight: bold;
        }

        h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.2em;
        }

        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1em;
            line-height: 1.6;
        }

        .email-form {
            background: #f8f9fa;
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            color: #333;
            font-weight: 600;
            margin-bottom: 8px;
            text-align: left;
        }

        input[type="email"], input[type="text"] {
            width: 100%;
            padding: 15px;
            border: 2px solid #e0e6ed;
            border-radius: 10px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        input[type="email"]:focus, input[type="text"]:focus {
            outline: none;
            border-color: #667eea;
        }

        .download-btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            padding: 15px 40px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            transition: transform 0.3s;
        }

        .download-btn:hover {
            transform: translateY(-2px);
        }

        .download-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        .loading {
            display: none;
            margin-top: 20px;
        }

        .spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .message {
            margin-top: 20px;
            padding: 15px;
            border-radius: 8px;
            display: none;
        }

        .success-message {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .error-message {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .help-text {
            color: #666;
            font-size: 0.9em;
            margin-top: 15px;
            text-align: center;
        }

        .contact-info {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
        }

        .contact-info h3 {
            color: #333;
            margin-bottom: 10px;
        }

        .contact-info p {
            color: #666;
            line-height: 1.6;
        }

        a {
            color: #667eea;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="success-container">
        <div class="success-icon">
            <div class="checkmark">✓</div>
        </div>
        
        <h1>¡Compra Exitosa!</h1>
        <p class="subtitle">Gracias por tu compra. Para recibir tu libro, por favor ingresa tu email de compra:</p>
        
        <div class="email-form">
            <div class="form-group">
                <label for="email">📧 Email de compra:</label>
                <input type="email" id="email" placeholder="ejemplo@email.com" required>
            </div>
            
            <div class="form-group">
                <label for="name">👤 Tu nombre:</label>
                <input type="text" id="name" placeholder="Tu nombre completo">
            </div>
            
            <button class="download-btn" onclick="requestPDF()">
                📚 Recibir mi Libro PDF
            </button>
            
            <div class="loading" id="loading">
                <div class="spinner"></div>
                <p>Procesando tu solicitud...</p>
            </div>
            
            <div class="message" id="message"></div>
            
            <p class="help-text">
                💡 Usa el mismo email que utilizaste al comprar
            </p>
        </div>

        <div class="contact-info">
            <h3>¿Necesitas ayuda?</h3>
            <p>Contacta a: <a href="mailto:info@iansaura.com">info@iansaura.com</a></p>
            <p>Respuesta en menos de 24 horas</p>
        </div>
    </div>

    <script>
        // Marcar como acceso válido al cargar
        localStorage.setItem('validAccess', Date.now().toString());

        function requestPDF() {
            const email = document.getElementById('email').value.trim();
            const name = document.getElementById('name').value.trim() || 'Cliente';
            
            if (!email) {
                showMessage('Por favor ingresa tu email', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor ingresa un email válido', 'error');
                return;
            }
            
            // Mostrar loading
            document.getElementById('loading').style.display = 'block';
            document.querySelector('.download-btn').disabled = true;
            hideMessage();
            
            // Generar token único basado en timestamp y email
            const timestamp = Date.now();
            const token = 'manual_' + btoa(email + timestamp).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
            
            // Llamar a la API
            const apiUrl = '/api/pdf-delivery.php?token=' + encodeURIComponent(token) + 
                          '&email=' + encodeURIComponent(email) + 
                          '&name=' + encodeURIComponent(name);
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    document.getElementById('loading').style.display = 'none';
                    document.querySelector('.download-btn').disabled = false;
                    
                    if (data.success) {
                        showMessage('✅ ' + data.message, 'success');
                        // Ocultar el formulario después del éxito
                        setTimeout(() => {
                            document.querySelector('.email-form').style.display = 'none';
                        }, 3000);
                    } else {
                        showMessage('❌ ' + (data.error || 'Error al procesar tu solicitud'), 'error');
                    }
                })
                .catch(error => {
                    document.getElementById('loading').style.display = 'none';
                    document.querySelector('.download-btn').disabled = false;
                    showMessage('❌ Error de conexión. Por favor intenta de nuevo.', 'error');
                    console.error('Error:', error);
                });
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function showMessage(text, type) {
            const messageEl = document.getElementById('message');
            messageEl.textContent = text;
            messageEl.className = 'message ' + type + '-message';
            messageEl.style.display = 'block';
        }
        
        function hideMessage() {
            document.getElementById('message').style.display = 'none';
        }
        
        // Permitir envío con Enter
        document.getElementById('email').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                requestPDF();
            }
        });
        
        document.getElementById('name').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                requestPDF();
            }
        });

        // Limpiar acceso válido después de 30 minutos
        setTimeout(() => {
            localStorage.removeItem('validAccess');
        }, 30 * 60 * 1000);
    </script>
</body>
</html> 