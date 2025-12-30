-- Ian Saura Data Engineering Hub - Database Schema
-- MySQL Database Schema for DonWeb Hosting
-- Created: 2024

-- Create database (uncomment if you need to create the database)
-- CREATE DATABASE ian_saura_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE ian_saura_hub;

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    full_name VARCHAR(200), 
    phone VARCHAR(20),
    country VARCHAR(100),
    city VARCHAR(100),
    occupation VARCHAR(150),
    linkedin_url VARCHAR(300),
    github_url VARCHAR(300),
    website_url VARCHAR(300),
    bio TEXT,
    profile_image_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(100),
    password_reset_token VARCHAR(100),
    password_reset_expires TIMESTAMP NULL,
    last_login TIMESTAMP NULL,
    login_count INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_email_verified (email_verified),
    INDEX idx_is_active (is_active),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- SUBSCRIPTIONS TABLE
-- ============================================
CREATE TABLE subscriptions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    stripe_customer_id VARCHAR(100),
    stripe_subscription_id VARCHAR(100),
    stripe_price_id VARCHAR(100),
    status ENUM('active', 'canceled', 'past_due', 'unpaid', 'trialing', 'incomplete') DEFAULT 'active',
    plan_name VARCHAR(100) DEFAULT 'Club de Data Engineering',
    plan_price DECIMAL(10, 2) DEFAULT 10.00,
    currency VARCHAR(3) DEFAULT 'USD',
    interval_type ENUM('month', 'year') DEFAULT 'month',
    trial_start TIMESTAMP NULL,
    trial_end TIMESTAMP NULL,
    current_period_start TIMESTAMP NULL,
    current_period_end TIMESTAMP NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    canceled_at TIMESTAMP NULL,
    cancellation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_stripe_customer_id (stripe_customer_id),
    INDEX idx_stripe_subscription_id (stripe_subscription_id),
    INDEX idx_status (status),
    INDEX idx_current_period_end (current_period_end)
);

-- ============================================
-- CONTACT MESSAGES TABLE
-- ============================================
CREATE TABLE contact_messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(300),
    message TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
    replied_at TIMESTAMP NULL,
    replied_by INT NULL,
    reply_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (replied_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- MENTORING SESSIONS TABLE
-- ============================================
CREATE TABLE mentoring_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_type ENUM('1on1', 'group', 'workshop') DEFAULT '1on1',
    title VARCHAR(300),
    description TEXT,
    scheduled_at TIMESTAMP,
    duration_minutes INT DEFAULT 45,
    price DECIMAL(10, 2) NULL, -- Custom pricing per session
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('scheduled', 'completed', 'canceled', 'no_show') DEFAULT 'scheduled',
    meeting_url VARCHAR(500),
    meeting_notes TEXT,
    feedback_rating INT CHECK (feedback_rating >= 1 AND feedback_rating <= 5),
    feedback_comment TEXT,
    stripe_payment_intent_id VARCHAR(100),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_scheduled_at (scheduled_at),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status)
);

-- ============================================
-- CONTENT DOWNLOADS TABLE
-- ============================================
CREATE TABLE content_downloads (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    resource_name VARCHAR(300) NOT NULL,
    resource_type ENUM('pdf', 'video', 'template', 'guide', 'roadmap') NOT NULL,
    resource_url VARCHAR(500),
    file_size_bytes BIGINT,
    download_count INT DEFAULT 1,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_resource_type (resource_type),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- USER ACTIVITY LOGS TABLE
-- ============================================
CREATE TABLE user_activity_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    session_id VARCHAR(100),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    INDEX idx_session_id (session_id)
);

-- ============================================
-- SYSTEM LOGS TABLE
-- ============================================
CREATE TABLE system_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    level ENUM('debug', 'info', 'warning', 'error', 'critical') NOT NULL,
    message TEXT NOT NULL,
    context VARCHAR(100),
    file_path VARCHAR(300),
    line_number INT,
    user_id INT NULL,
    ip_address VARCHAR(45),
    stack_trace TEXT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_level (level),
    INDEX idx_context (context),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id)
);

-- ============================================
-- EMAIL CAMPAIGNS TABLE
-- ============================================
CREATE TABLE email_campaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    subject VARCHAR(300) NOT NULL,
    content TEXT NOT NULL,
    target_audience ENUM('all_users', 'subscribers', 'trial_users', 'churned_users', 'custom') DEFAULT 'subscribers',
    status ENUM('draft', 'scheduled', 'sending', 'sent', 'paused') DEFAULT 'draft',
    scheduled_at TIMESTAMP NULL,
    sent_at TIMESTAMP NULL,
    total_recipients INT DEFAULT 0,
    emails_sent INT DEFAULT 0,
    emails_delivered INT DEFAULT 0,
    emails_opened INT DEFAULT 0,
    emails_clicked INT DEFAULT 0,
    emails_bounced INT DEFAULT 0,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_scheduled_at (scheduled_at),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- ANALYTICS EVENTS TABLE
-- ============================================
CREATE TABLE analytics_events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    session_id VARCHAR(100),
    event_name VARCHAR(100) NOT NULL,
    event_category VARCHAR(50),
    event_value DECIMAL(10, 2),
    page_url VARCHAR(500),
    referrer_url VARCHAR(500),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    utm_content VARCHAR(100),
    device_type ENUM('desktop', 'mobile', 'tablet') NULL,
    browser VARCHAR(50),
    os VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    ip_address VARCHAR(45),
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_user_id (user_id),
    INDEX idx_event_name (event_name),
    INDEX idx_event_category (event_category),
    INDEX idx_session_id (session_id),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- WAITLIST TABLE (for future features)
-- ============================================
CREATE TABLE waitlist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    interest_area VARCHAR(100),
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    status ENUM('active', 'contacted', 'converted', 'unsubscribed') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- ============================================
-- INSERT SAMPLE DATA (Optional - for testing)
-- ============================================

-- Sample admin user (password: 'admin123' - change in production!)
INSERT INTO users (email, password_hash, first_name, last_name, full_name, is_admin, email_verified) 
VALUES (
    'ian@iansaura.com', 
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash for 'admin123'
    'Ian', 
    'Saura', 
    'Ian Saura',
    TRUE, 
    TRUE
);

-- Sample regular user for testing
INSERT INTO users (email, password_hash, first_name, last_name, full_name, email_verified) 
VALUES (
    'demo@example.com', 
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- bcrypt hash for 'admin123'
    'Demo', 
    'User', 
    'Demo User',
    TRUE
);

-- ============================================
-- USEFUL QUERIES FOR MONITORING
-- ============================================

-- Users by registration date
-- SELECT DATE(created_at) as date, COUNT(*) as new_users 
-- FROM users 
-- GROUP BY DATE(created_at) 
-- ORDER BY date DESC;

-- Active subscriptions
-- SELECT COUNT(*) as active_subscriptions 
-- FROM subscriptions 
-- WHERE status = 'active';

-- Monthly recurring revenue (MRR)
-- SELECT SUM(plan_price) as mrr 
-- FROM subscriptions 
-- WHERE status = 'active' AND interval_type = 'month';

-- Recent contact messages
-- SELECT * FROM contact_messages 
-- WHERE status = 'new' 
-- ORDER BY created_at DESC;

-- User activity summary
-- SELECT u.email, u.full_name, s.status as subscription_status, u.last_login
-- FROM users u
-- LEFT JOIN subscriptions s ON u.id = s.user_id
-- ORDER BY u.last_login DESC; 