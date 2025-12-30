-- ============================================
-- REFERRAL SYSTEM DATABASE MIGRATION
-- Run this SQL to add referral columns to users table
-- ============================================

-- Add referral columns to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS referral_code VARCHAR(20) UNIQUE DEFAULT NULL,
ADD COLUMN IF NOT EXISTS referred_by VARCHAR(20) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS referral_bonus_days INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS bootcamp_discount INT DEFAULT 0;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_referred_by ON users(referred_by);

-- Create referral log table for tracking
CREATE TABLE IF NOT EXISTS referral_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referrer_email VARCHAR(255) NOT NULL,
    referred_email VARCHAR(255) NOT NULL,
    referral_code VARCHAR(20) NOT NULL,
    bonus_days INT DEFAULT 5,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_referrer (referrer_email),
    INDEX idx_referred (referred_email)
);

-- Create referral invites table for email invitations
CREATE TABLE IF NOT EXISTS referral_invites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    referrer_email VARCHAR(255) NOT NULL,
    invited_email VARCHAR(255) NOT NULL,
    referral_code VARCHAR(20) NOT NULL,
    sent_at DATETIME DEFAULT NULL,
    accepted_at DATETIME DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_referrer (referrer_email),
    INDEX idx_invited (invited_email),
    INDEX idx_code (referral_code)
);

-- ============================================
-- REFERRAL SYSTEM LOGIC
-- ============================================
-- 
-- FREE USER REFERRAL:
-- - Referrer gets +5 days trial (cumulative, max 90 days)
-- - Referred user gets +5 days trial
-- 
-- PAID USER REFERRAL:
-- - Referrer gets 10% bootcamp discount (not cumulative)
-- - Referred user gets +5 days trial
-- 
-- Trial calculation:
-- effective_trial_end = trial_end + referral_bonus_days
-- ============================================

