<?php
/**
 * User Activity Logger
 * Ian Saura Data Engineering Hub
 */

class UserLogger {
    private $pdo;
    
    public function __construct($pdo = null) {
        if ($pdo) {
            $this->pdo = $pdo;
        } else {
            // Fallback to creating connection if none provided
            require_once 'secure-config-local.php';
            $this->pdo = getSecureDBConnection();
        }
    }
    
    /**
     * Log user activity
     */
    public function logActivity($userId, $action, $description = '', $additionalData = []) {
        if (!LOG_USER_ACTIONS) return;
        
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO activity_logs 
                (user_id, action, description, page_url, ip_address, user_agent, session_id, additional_data) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $userId,
                $action,
                $description,
                $_SERVER['REQUEST_URI'] ?? '',
                $this->getClientIP(),
                $_SERVER['HTTP_USER_AGENT'] ?? '',
                session_id(),
                json_encode($additionalData)
            ]);
            
        } catch (Exception $e) {
            error_log('Activity logging failed: ' . $e->getMessage());
        }
    }
    
    /**
     * Log page view
     */
    public function logPageView($userId = null, $pageTitle = '') {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO page_views 
                (user_id, page_url, page_title, referrer, ip_address, user_agent, session_id) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $userId,
                $_SERVER['REQUEST_URI'] ?? '',
                $pageTitle,
                $_SERVER['HTTP_REFERER'] ?? '',
                $this->getClientIP(),
                $_SERVER['HTTP_USER_AGENT'] ?? '',
                session_id()
            ]);
            
        } catch (Exception $e) {
            error_log('Page view logging failed: ' . $e->getMessage());
        }
    }
    
    /**
     * Log user registration
     */
    public function logUserRegistration($userId, $email) {
        $this->logActivity($userId, 'user_registered', "User registered with email: $email", [
            'email' => $email,
            'registration_source' => $_SERVER['HTTP_REFERER'] ?? 'direct'
        ]);
    }
    
    /**
     * Log user login
     */
    public function logUserLogin($userId) {
        // Update last login in users table
        try {
            $stmt = $this->pdo->prepare("
                UPDATE users 
                SET last_login = NOW(), ip_address = ?, user_agent = ? 
                WHERE id = ?
            ");
            $stmt->execute([$this->getClientIP(), $_SERVER['HTTP_USER_AGENT'] ?? '', $userId]);
            
        } catch (Exception $e) {
            error_log('Login update failed: ' . $e->getMessage());
        }
        
        $this->logActivity($userId, 'user_login', 'User logged in');
    }
    
    /**
     * Log user logout
     */
    public function logUserLogout($userId) {
        $this->logActivity($userId, 'user_logout', 'User logged out');
    }
    
    /**
     * Log purchase
     */
    public function logPurchase($userId, $productId, $amount, $status = 'pending') {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO purchases 
                (user_id, product_id, amount, status, ip_address) 
                VALUES (?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $userId,
                $productId,
                $amount,
                $status,
                $this->getClientIP()
            ]);
            
            $purchaseId = $this->pdo->lastInsertId();
            
            $this->logActivity($userId, 'purchase_initiated', "Purchase initiated for product $productId", [
                'product_id' => $productId,
                'amount' => $amount,
                'purchase_id' => $purchaseId
            ]);
            
            return $purchaseId;
            
        } catch (Exception $e) {
            error_log('Purchase logging failed: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Log contact form submission
     */
    public function logContactSubmission($name, $email, $subject, $message) {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO contact_submissions 
                (name, email, subject, message, ip_address, user_agent) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $name,
                $email,
                $subject,
                $message,
                $this->getClientIP(),
                $_SERVER['HTTP_USER_AGENT'] ?? ''
            ]);
            
            $this->logActivity(null, 'contact_submitted', "Contact form submitted by $email", [
                'name' => $name,
                'email' => $email,
                'subject' => $subject
            ]);
            
        } catch (Exception $e) {
            error_log('Contact submission logging failed: ' . $e->getMessage());
        }
    }
    
    /**
     * Log download
     */
    public function logDownload($userId, $fileName, $fileType = '') {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO downloads 
                (user_id, file_name, file_type, ip_address, user_agent) 
                VALUES (?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $userId,
                $fileName,
                $fileType,
                $this->getClientIP(),
                $_SERVER['HTTP_USER_AGENT'] ?? ''
            ]);
            
            $this->logActivity($userId, 'file_downloaded', "Downloaded file: $fileName", [
                'file_name' => $fileName,
                'file_type' => $fileType
            ]);
            
        } catch (Exception $e) {
            error_log('Download logging failed: ' . $e->getMessage());
        }
    }
    
    /**
     * Log newsletter subscription
     */
    public function logNewsletterSubscription($email, $name = '', $source = '') {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO newsletter_subscriptions 
                (email, name, source, ip_address) 
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                status = 'active', name = VALUES(name), source = VALUES(source)
            ");
            
            $stmt->execute([
                $email,
                $name,
                $source,
                $this->getClientIP()
            ]);
            
            $this->logActivity(null, 'newsletter_subscribed', "Newsletter subscription: $email", [
                'email' => $email,
                'source' => $source
            ]);
            
        } catch (Exception $e) {
            error_log('Newsletter subscription logging failed: ' . $e->getMessage());
        }
    }
    
    /**
     * Log error
     */
    public function logError($userId, $errorType, $errorMessage, $filePath = '', $lineNumber = 0) {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO error_logs 
                (user_id, error_type, error_message, file_path, line_number, ip_address, user_agent) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $userId,
                $errorType,
                $errorMessage,
                $filePath,
                $lineNumber,
                $this->getClientIP(),
                $_SERVER['HTTP_USER_AGENT'] ?? ''
            ]);
            
        } catch (Exception $e) {
            error_log('Error logging failed: ' . $e->getMessage());
        }
    }
    
    /**
     * Get user statistics
     */
    public function getUserStats($userId, $days = 30) {
        try {
            $stmt = $this->pdo->prepare("
                SELECT 
                    COUNT(*) as total_activities,
                    COUNT(DISTINCT DATE(created_at)) as active_days,
                    MAX(created_at) as last_activity
                FROM activity_logs 
                WHERE user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
            ");
            
            $stmt->execute([$userId, $days]);
            return $stmt->fetch();
            
        } catch (Exception $e) {
            error_log('User stats retrieval failed: ' . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Get client IP address
     */
    private function getClientIP() {
        $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
        foreach ($ipKeys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                $ip = $_SERVER[$key];
                if (strpos($ip, ',') !== false) {
                    $ip = explode(',', $ip)[0];
                }
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
    
    /**
     * Clean old logs (run periodically)
     */
    public function cleanOldLogs() {
        try {
            $tables = ['activity_logs', 'page_views', 'error_logs'];
            
            foreach ($tables as $table) {
                $stmt = $this->pdo->prepare("
                    DELETE FROM $table 
                    WHERE created_at < DATE_SUB(NOW(), INTERVAL ? DAY)
                ");
                $stmt->execute([LOG_RETENTION_DAYS]);
            }
            
        } catch (Exception $e) {
            error_log('Log cleanup failed: ' . $e->getMessage());
        }
    }
}

// Global logger instance
$userLogger = new UserLogger();

?> 