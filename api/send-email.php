<?php
/**
 * Email Sender using External Service
 * Ian Saura Data Engineering Hub
 */

function sendContactEmail($name, $email, $message, $isLocal = false) {
    $adminEmail = 'info@iansaura.com';
    $subject = 'New Contact Form Submission - Ian Saura Hub';
    
    $emailBody = "
Nuevo mensaje de contacto recibido:

Nombre: {$name}
Email: {$email}
Mensaje:
{$message}

---
Detalles técnicos:
Timestamp: " . date('Y-m-d H:i:s') . "
Environment: " . ($isLocal ? 'Local Development' : 'Production') . "
IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'localhost') . "
User Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown') . "
";

    // For local development, we'll use a webhook service
    if ($isLocal) {
        // Use a webhook service like webhook.site for testing
        // Or integrate with EmailJS, Formspree, etc.
        
        // Simple PHP mail() for now (works on most local setups)
        $headers = [
            'From: noreply@iansaura.com',
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion(),
            'Content-Type: text/plain; charset=UTF-8'
        ];
        
        $result = mail($adminEmail, $subject, $emailBody, implode("\r\n", $headers));
        
        // Also try to send via webhook for testing
        $webhookData = [
            'to' => $adminEmail,
            'subject' => $subject,
            'body' => $emailBody,
            'from' => $email,
            'name' => $name
        ];
        
        // Log email attempt
        error_log("Email attempt: " . ($result ? 'SUCCESS' : 'FAILED') . " to $adminEmail");
        
        return $result;
    } else {
        // Production: Use proper SMTP or email service
        return mail($adminEmail, $subject, $emailBody, "From: noreply@iansaura.com\r\nReply-To: $email");
    }
}

function sendViaWebhook($data) {
    // Example webhook integration for testing
    $webhookUrl = 'https://webhook.site/your-unique-url'; // Replace with actual webhook
    
    $postData = json_encode($data);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $webhookUrl);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    
    $result = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return $httpCode === 200;
}
?> 