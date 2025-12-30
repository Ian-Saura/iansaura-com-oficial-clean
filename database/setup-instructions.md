# Database Setup Instructions
## Ian Saura Data Engineering Hub

### 🔒 **Security First**
Your database credentials are now stored securely in `api/secure-config.php` and excluded from git tracking.

### 📊 **Database Tables Created**
The system will create these tables automatically:

1. **users** - User accounts and profiles
2. **user_sessions** - Active user sessions
3. **activity_logs** - All user activities and interactions
4. **products** - Courses, consultations, services
5. **purchases** - Purchase history and transactions
6. **contact_submissions** - Contact form submissions
7. **page_views** - Page analytics and view tracking
8. **downloads** - File download tracking
9. **newsletter_subscriptions** - Email list management
10. **error_logs** - System error tracking

### 🚀 **Setup Steps**

1. **Import Database Schema**
   ```bash
   mysql -u c2621673_ian -p c2621673_ian < database/database-setup.sql
   ```

2. **Verify Connection**
   - Your credentials are configured in `api/secure-config.php`
   - Database: `c2621673_ian`
   - User: `c2621673_ian`
   - Host: `localhost`

3. **Enable Tracking**
   - JavaScript tracker automatically loads on all pages
   - Tracks page views, clicks, forms, downloads, scroll depth
   - All data is stored securely in the database

### 📈 **Analytics Dashboard**
Access your analytics at: `https://yourdomain.com/api/analytics-dashboard.php`

**Login Password:** `admin123!`
*(Change this in `api/analytics-dashboard.php`)*

### 🔧 **Features Enabled**

#### **Automatic Tracking:**
- ✅ Page views and time spent
- ✅ User clicks and interactions
- ✅ Form submissions
- ✅ File downloads
- ✅ Scroll depth tracking
- ✅ Contact form submissions
- ✅ User registrations and logins
- ✅ Purchase tracking
- ✅ Error logging

#### **Analytics Available:**
- 📊 Daily activity reports
- 👥 User behavior analysis
- 💰 Revenue tracking
- 📱 Device and browser analytics
- 🔥 Popular pages and content
- 📧 Contact form submissions

### 🛡️ **Security Features**
- Database credentials encrypted
- SQL injection protection
- XSS protection headers
- Spam detection on forms
- IP tracking for security
- Session management
- Error logging without data exposure

### 📋 **Usage Examples**

#### **Track Custom Events (JavaScript)**
```javascript
// Track custom user action
window.pageTracker.trackCustomEvent('video_watched', {
    video_title: 'Data Engineering Basics',
    watch_duration: 120
});

// Set user ID when user logs in
window.pageTracker.setUserId(userId);
```

#### **Log Activities (PHP)**
```php
// Log user action
global $userLogger;
$userLogger->logActivity($userId, 'course_completed', 'User completed Python course');

// Log purchase
$purchaseId = $userLogger->logPurchase($userId, $productId, 99.99, 'completed');
```

### 🔄 **Maintenance**
- Logs are automatically cleaned after 90 days
- Run cleanup manually: Call `$userLogger->cleanOldLogs()`
- Monitor disk space in analytics dashboard

### 📞 **Support**
If you need help with the setup, check the analytics dashboard for system health and error logs. 