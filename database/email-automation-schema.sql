-- Email Automation Schema for Red Flags Funnel
-- Ian Saura Data Engineering Hub

-- Subscribers table (leads que descargaron el PDF)
CREATE TABLE IF NOT EXISTS redflags_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(50) DEFAULT 'redflags_pdf',
    status ENUM('active', 'unsubscribed', 'bounced') DEFAULT 'active',
    INDEX idx_email (email),
    INDEX idx_subscribed_at (subscribed_at),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Email sequence tracking
CREATE TABLE IF NOT EXISTS email_sequence_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subscriber_id INT NOT NULL,
    email_number INT NOT NULL COMMENT '1=Day0, 2=Day2, 3=Day5',
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('sent', 'failed', 'bounced', 'opened', 'clicked') DEFAULT 'sent',
    error_message TEXT,
    FOREIGN KEY (subscriber_id) REFERENCES redflags_subscribers(id) ON DELETE CASCADE,
    INDEX idx_subscriber_email (subscriber_id, email_number),
    INDEX idx_sent_at (sent_at),
    UNIQUE KEY unique_subscriber_email (subscriber_id, email_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Manual campaigns (broadcast emails)
CREATE TABLE IF NOT EXISTS broadcast_campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_name VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    scheduled_for TIMESTAMP NULL,
    sent_at TIMESTAMP NULL,
    recipient_count INT DEFAULT 0,
    status ENUM('draft', 'scheduled', 'sending', 'sent', 'cancelled') DEFAULT 'draft',
    exclude_buyers BOOLEAN DEFAULT FALSE COMMENT 'Excluir gente que ya compró',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_scheduled (scheduled_for),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Broadcast send log
CREATE TABLE IF NOT EXISTS broadcast_send_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    campaign_id INT NOT NULL,
    subscriber_id INT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('sent', 'failed', 'bounced') DEFAULT 'sent',
    error_message TEXT,
    FOREIGN KEY (campaign_id) REFERENCES broadcast_campaigns(id) ON DELETE CASCADE,
    FOREIGN KEY (subscriber_id) REFERENCES redflags_subscribers(id) ON DELETE CASCADE,
    INDEX idx_campaign_subscriber (campaign_id, subscriber_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Bootcamp purchases (para excluir de broadcasts)
CREATE TABLE IF NOT EXISTS bootcamp_purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    bootcamp_name VARCHAR(100),
    purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2),
    status ENUM('pending', 'completed', 'refunded') DEFAULT 'completed',
    INDEX idx_email (email),
    INDEX idx_purchased_at (purchased_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




