// Database Configuration for Ian Saura Data Engineering Hub
// MySQL Configuration for DonWeb Hosting

const mysql = require('mysql2/promise');
require('dotenv').config();

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ian_saura_hub',
  charset: 'utf8mb4',
  timezone: 'Z',
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timeout: 60000,
  
  // Connection pool settings
  connectionLimit: 10,
  queueLimit: 0,
  
  // SSL settings (may be required by DonWeb)
  ssl: process.env.DB_SSL === 'true' ? {
    rejectUnauthorized: false
  } : false
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    
    // Test query
    const [rows] = await connection.execute('SELECT 1 as test');
    console.log('✅ Database query test passed');
    
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Execute query with error handling
async function executeQuery(query, params = []) {
  try {
    const [rows] = await pool.execute(query, params);
    return { success: true, data: rows };
  } catch (error) {
    console.error('Database query error:', error);
    return { success: false, error: error.message };
  }
}

// User-related database operations
const userDb = {
  // Create new user
  async createUser(userData) {
    const query = `
      INSERT INTO users (email, password_hash, first_name, last_name, full_name, phone, country)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      userData.email,
      userData.password_hash,
      userData.first_name,
      userData.last_name,
      userData.full_name,
      userData.phone,
      userData.country
    ];
    return await executeQuery(query, params);
  },

  // Find user by email
  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ? AND is_active = true';
    return await executeQuery(query, [email]);
  },

  // Find user by ID
  async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ? AND is_active = true';
    return await executeQuery(query, [id]);
  },

  // Update user last login
  async updateLastLogin(userId) {
    const query = `
      UPDATE users 
      SET last_login = NOW(), login_count = login_count + 1 
      WHERE id = ?
    `;
    return await executeQuery(query, [userId]);
  },

  // Verify user email
  async verifyEmail(email) {
    const query = 'UPDATE users SET email_verified = true WHERE email = ?';
    return await executeQuery(query, [email]);
  }
};

// Subscription-related database operations
const subscriptionDb = {
  // Create new subscription
  async createSubscription(subscriptionData) {
    const query = `
      INSERT INTO subscriptions (
        user_id, stripe_customer_id, stripe_subscription_id, stripe_price_id,
        status, plan_name, plan_price, current_period_start, current_period_end
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      subscriptionData.user_id,
      subscriptionData.stripe_customer_id,
      subscriptionData.stripe_subscription_id,
      subscriptionData.stripe_price_id,
      subscriptionData.status,
      subscriptionData.plan_name,
      subscriptionData.plan_price,
      subscriptionData.current_period_start,
      subscriptionData.current_period_end
    ];
    return await executeQuery(query, params);
  },

  // Get user's active subscription
  async getActiveSubscription(userId) {
    const query = `
      SELECT * FROM subscriptions 
      WHERE user_id = ? AND status = 'active'
      ORDER BY created_at DESC LIMIT 1
    `;
    return await executeQuery(query, [userId]);
  },

  // Update subscription status
  async updateSubscriptionStatus(subscriptionId, status) {
    const query = 'UPDATE subscriptions SET status = ? WHERE stripe_subscription_id = ?';
    return await executeQuery(query, [status, subscriptionId]);
  }
};

// Contact message operations
const contactDb = {
  // Save contact message
  async saveMessage(messageData) {
    const query = `
      INSERT INTO contact_messages (name, email, subject, message, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      messageData.name,
      messageData.email,
      messageData.subject,
      messageData.message,
      messageData.ip_address,
      messageData.user_agent
    ];
    return await executeQuery(query, params);
  },

  // Get unread messages
  async getUnreadMessages() {
    const query = `
      SELECT * FROM contact_messages 
      WHERE status = 'new' 
      ORDER BY created_at DESC
    `;
    return await executeQuery(query);
  }
};

// Logging operations
const logDb = {
  // Log user activity
  async logUserActivity(activityData) {
    const query = `
      INSERT INTO user_activity_logs (user_id, action, description, ip_address, user_agent, session_id, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      activityData.user_id,
      activityData.action,
      activityData.description,
      activityData.ip_address,
      activityData.user_agent,
      activityData.session_id,
      JSON.stringify(activityData.metadata || {})
    ];
    return await executeQuery(query, params);
  },

  // Log system events
  async logSystemEvent(level, message, context, metadata = {}) {
    const query = `
      INSERT INTO system_logs (level, message, context, metadata)
      VALUES (?, ?, ?, ?)
    `;
    const params = [level, message, context, JSON.stringify(metadata)];
    return await executeQuery(query, params);
  }
};

// Analytics operations
const analyticsDb = {
  // Track event
  async trackEvent(eventData) {
    const query = `
      INSERT INTO analytics_events (
        user_id, session_id, event_name, event_category, event_value,
        page_url, referrer_url, utm_source, utm_medium, utm_campaign,
        device_type, browser, os, country, city, ip_address, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [
      eventData.user_id,
      eventData.session_id,
      eventData.event_name,
      eventData.event_category,
      eventData.event_value,
      eventData.page_url,
      eventData.referrer_url,
      eventData.utm_source,
      eventData.utm_medium,
      eventData.utm_campaign,
      eventData.device_type,
      eventData.browser,
      eventData.os,
      eventData.country,
      eventData.city,
      eventData.ip_address,
      JSON.stringify(eventData.metadata || {})
    ];
    return await executeQuery(query, params);
  }
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Closing database connections...');
  await pool.end();
  process.exit(0);
});

module.exports = {
  pool,
  testConnection,
  executeQuery,
  userDb,
  subscriptionDb,
  contactDb,
  logDb,
  analyticsDb
}; 