# Database Documentation - Ian Saura Data Engineering Hub

This document provides comprehensive information about the database structure and setup for the Ian Saura Data Engineering Hub application.

## Overview

The application uses **MySQL** as the primary database, hosted on **DonWeb**. The database is designed to handle:
- User authentication and management
- Subscription management (Stripe integration)
- Contact form submissions
- Activity logging and analytics
- Content downloads tracking
- Mentoring session management

## Database Schema

### Core Tables

#### 1. users - User Management
Stores user account information and authentication data.

Key columns:
- id (INT PRIMARY KEY) - Unique user identifier
- email (VARCHAR(255)) - User email (unique)
- password_hash (VARCHAR(255)) - Bcrypt hashed password
- first_name, last_name, full_name - User names
- email_verified (BOOLEAN) - Email verification status
- is_active (BOOLEAN) - Account status
- is_admin (BOOLEAN) - Admin privileges
- last_login (TIMESTAMP) - Last login timestamp
- created_at (TIMESTAMP) - Account creation date

#### 2. subscriptions - Stripe Subscription Management
Manages user subscriptions to the $10/month club.

Key columns:
- id (INT PRIMARY KEY) - Subscription identifier
- user_id (INT) - Foreign key to users table
- stripe_customer_id (VARCHAR(100)) - Stripe customer ID
- stripe_subscription_id (VARCHAR(100)) - Stripe subscription ID
- status (ENUM) - Subscription status (active, canceled, etc.)
- plan_price (DECIMAL(10,2)) - Monthly price ($10.00)
- current_period_end (TIMESTAMP) - Next billing date

#### 3. contact_messages - Contact Form Submissions
Stores messages from the contact form.

Key columns:
- id (INT PRIMARY KEY) - Message identifier
- name (VARCHAR(200)) - Contact's name
- email (VARCHAR(255)) - Contact's email
- subject (VARCHAR(300)) - Message subject
- message (TEXT) - Message content
- status (ENUM) - Message status (new, read, replied)
- created_at (TIMESTAMP) - Message submission date

#### 4. user_activity_logs - User Activity Tracking
Tracks user actions and behavior.

Key columns:
- id (INT PRIMARY KEY) - Log entry identifier
- user_id (INT) - Foreign key to users table
- action (VARCHAR(100)) - Action performed
- description (TEXT) - Detailed description
- ip_address (VARCHAR(45)) - User's IP address
- session_id (VARCHAR(100)) - Session identifier
- metadata (JSON) - Additional data
- created_at (TIMESTAMP) - Action timestamp

#### 5. mentoring_sessions - 1-on-1 Sessions
Manages mentoring session bookings and payments.

Key columns:
- id (INT PRIMARY KEY) - Session identifier
- user_id (INT) - Foreign key to users table
- scheduled_at (TIMESTAMP) - Session date/time
- duration_minutes (INT) - Session duration (45 min)
- price (DECIMAL(10,2)) - Session price ($40.00)
- status (ENUM) - Session status
- payment_status (ENUM) - Payment status
- meeting_url (VARCHAR(500)) - Video call URL

### Additional Tables

- **content_downloads** - Track resource downloads
- **system_logs** - Application error and system logs
- **email_campaigns** - Email marketing campaigns
- **analytics_events** - User behavior analytics
- **waitlist** - Email collection for future features

## Setup Instructions

### 1. DonWeb Database Setup

1. Access your DonWeb control panel
2. Create a new MySQL database:
   - Database name: ian_saura_hub
   - Character set: utf8mb4
   - Collation: utf8mb4_unicode_ci
3. Create a database user with full privileges
4. Note down the connection details

### 2. Environment Configuration

Copy the environment template and update with your DonWeb credentials:

```bash
cp database/env.example .env
```

Update the .env file:
```env
DB_HOST=your-mysql-host.donweb.com
DB_PORT=3306
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=ian_saura_hub
DB_SSL=true
```

### 3. Install Dependencies

```bash
npm install mysql2 dotenv bcrypt
```

### 4. Run Database Migration

```bash
# Test connection first
node database/migrate.js test

# Run the migration
node database/migrate.js up
```

## Usage Examples

### User Management

```javascript
const { userDb } = require('./database/config');

// Create new user
const newUser = await userDb.createUser({
  email: 'user@example.com',
  password_hash: hashedPassword,
  first_name: 'John',
  last_name: 'Doe',
  full_name: 'John Doe'
});

// Find user by email
const user = await userDb.findByEmail('user@example.com');
```

### Subscription Management

```javascript
const { subscriptionDb } = require('./database/config');

// Create subscription
const subscription = await subscriptionDb.createSubscription({
  user_id: 1,
  stripe_customer_id: 'cus_xxxxxx',
  stripe_subscription_id: 'sub_xxxxxx',
  status: 'active',
  plan_price: 10.00
});
```

### Contact Messages

```javascript
const { contactDb } = require('./database/config');

// Save contact message
const message = await contactDb.saveMessage({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Question about courses',
  message: 'I would like to know more about...',
  ip_address: req.ip,
  user_agent: req.get('User-Agent')
});
```

## Maintenance

### Useful Queries

```sql
-- Check active subscriptions
SELECT COUNT(*) as active_subscriptions 
FROM subscriptions 
WHERE status = 'active';

-- Monthly recurring revenue
SELECT SUM(plan_price) as mrr 
FROM subscriptions 
WHERE status = 'active' AND interval_type = 'month';

-- New users this month
SELECT COUNT(*) as new_users 
FROM users 
WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH);
```

### Security Considerations

- All passwords are bcrypt hashed
- SQL injection protection via prepared statements
- SSL/TLS encryption for data in transit
- Sensitive data is not logged
- Foreign key constraints maintain data integrity

## Troubleshooting

### Common Issues

1. **Connection timeout:**
   - Check DonWeb firewall settings
   - Verify SSL configuration

2. **Access denied:**
   - Verify database credentials
   - Check user permissions

3. **Table doesn't exist:**
   - Run migration script
   - Check database name

---

**Last Updated:** December 2024  
**Database Version:** MySQL 8.0+  
**Application:** Ian Saura Data Engineering Hub 