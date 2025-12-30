<?php
/**
 * Email Helper Functions
 * Utility functions for sending emails
 */

/**
 * Send an email using PHP mail() or external service
 */
function sendEmail($to, $subject, $htmlBody, $textBody = null) {
    // Headers for HTML email
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Ian Saura <noreply@iansaura.com>',
        'Reply-To: ian@iansaura.com',
        'X-Mailer: PHP/' . phpversion()
    ];
    
    $headersStr = implode("\r\n", $headers);
    
    // Try to send email
    $result = @mail($to, $subject, $htmlBody, $headersStr);
    
    return $result;
}

/**
 * Generate HTML email template
 */
function generateEmailTemplate($title, $content, $ctaText = null, $ctaLink = null) {
    $cta = '';
    if ($ctaText && $ctaLink) {
        $cta = '<a href="' . htmlspecialchars($ctaLink) . '" style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px;">' . htmlspecialchars($ctaText) . '</a>';
    }
    
    return '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>' . htmlspecialchars($title) . '</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; background-color: #0f172a; color: #e2e8f0; margin: 0; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; padding: 30px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://iansaura.com/ian-saura-profile.jpg" alt="Ian Saura" style="width: 60px; height: 60px; border-radius: 50%; border: 2px solid #10b981;">
        </div>
        <h1 style="color: #10b981; font-size: 24px; margin-bottom: 20px; text-align: center;">' . htmlspecialchars($title) . '</h1>
        <div style="line-height: 1.6; color: #cbd5e1;">
            ' . $content . '
        </div>
        <div style="text-align: center;">
            ' . $cta . '
        </div>
        <hr style="border: none; border-top: 1px solid #334155; margin: 30px 0;">
        <p style="color: #64748b; font-size: 12px; text-align: center;">
            Ian Saura - Data Engineering Hub<br>
            <a href="https://iansaura.com" style="color: #10b981; text-decoration: none;">iansaura.com</a>
        </p>
    </div>
</body>
</html>';
}

/**
 * Log email sending attempt
 */
function logEmailSent($to, $subject, $success) {
    $logFile = sys_get_temp_dir() . '/email_log_' . date('Y-m') . '.log';
    $logEntry = date('Y-m-d H:i:s') . ' | ' . ($success ? 'SUCCESS' : 'FAILED') . ' | ' . $to . ' | ' . $subject . "\n";
    @file_put_contents($logFile, $logEntry, FILE_APPEND);
}







