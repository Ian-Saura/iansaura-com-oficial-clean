<?php
/**
 * Analytics Dashboard
 * Ian Saura Data Engineering Hub
 */

require_once 'secure-config.php';
require_once 'user-logger.php';

// Set security headers
setSecurityHeaders();

// Enhanced authentication with rate limiting
session_start();

// Check rate limit for login attempts
$clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
checkRateLimit('login_' . $clientIP, 5, 900); // 5 attempts per 15 minutes

if (!isset($_SESSION['admin_logged_in'])) {
    if (isset($_POST['admin_password'])) {
        $submittedPassword = $_POST['admin_password'];
        
        // Use constant-time comparison to prevent timing attacks
        if (hash_equals(ADMIN_PASSWORD, $submittedPassword)) {
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['login_time'] = time();
            
            // Regenerate session ID to prevent session fixation
            session_regenerate_id(true);
        } else {
            // Log failed login attempt
            error_log("Failed admin login attempt from IP: " . $clientIP);
            sleep(2); // Add delay to slow down brute force attempts
            showLoginForm('Invalid password. Please try again.');
            exit;
        }
    } else {
        showLoginForm();
        exit;
    }
}

// Check session timeout (4 hours)
if (isset($_SESSION['login_time']) && (time() - $_SESSION['login_time']) > 14400) {
    session_destroy();
    showLoginForm('Session expired. Please login again.');
    exit;
}

function showLoginForm($error = '') {
    $csrfToken = generateCSRFToken();
    
    echo '<!DOCTYPE html>
    <html>
    <head>
        <title>Analytics Dashboard - Login</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 400px; 
                margin: 100px auto; 
                padding: 20px; 
                background: #f5f5f5;
            }
            .login-card {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            input { 
                width: 100%; 
                padding: 12px; 
                margin: 10px 0; 
                border: 1px solid #ddd;
                border-radius: 5px;
                box-sizing: border-box;
            }
            button { 
                background: #007cba; 
                color: white; 
                padding: 12px 20px; 
                border: none; 
                border-radius: 5px;
                cursor: pointer;
                width: 100%;
            }
            button:hover { background: #005a8b; }
            .error {
                background: #f8d7da;
                color: #721c24;
                padding: 10px;
                border-radius: 5px;
                margin: 10px 0;
            }
            .security-notice {
                background: #d1ecf1;
                color: #0c5460;
                padding: 10px;
                border-radius: 5px;
                margin: 10px 0;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="login-card">
            <h2>🔒 Analytics Dashboard</h2>';
    
    if ($error) {
        echo '<div class="error">❌ ' . htmlspecialchars($error) . '</div>';
    }
    
    echo '<form method="POST">
                <input type="hidden" name="csrf_token" value="' . $csrfToken . '">
                <input type="password" name="admin_password" placeholder="Enter Admin Password" required autocomplete="off">
                <button type="submit">Login</button>
            </form>
            <div class="security-notice">
                🛡️ This dashboard is protected by rate limiting and secure authentication.
            </div>
        </div>
    </body>
    </html>';
}

// Initialize variables
$stats = [];
$recent_activity = [];
$daily_stats = [];
$top_pages = [];
$recent_purchases = [];
$error_message = '';

// Get analytics data
try {
    $pdo = getSecureDBConnection();
    
    // Test database connection
    $test = $pdo->query("SELECT 1");
    if (!$test) {
        throw new Exception("Database connection test failed");
    }
    
    // Check if tables exist
    $tables_check = $pdo->query("SHOW TABLES");
    $existing_tables = $tables_check->fetchAll(PDO::FETCH_COLUMN);
    
    $required_tables = ['users', 'activity_logs', 'page_views', 'purchases', 'products', 'contact_submissions', 'waitlist'];
    $missing_tables = array_diff($required_tables, $existing_tables);
    
    if (!empty($missing_tables)) {
        $error_message = "Missing database tables: " . implode(', ', $missing_tables) . 
                        ". Please import database/database-setup.sql first.";
    } else {
        // Get overview statistics with error handling
        
        // Total users
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as total_users FROM users");
            $result = $stmt->fetch();
            $stats['total_users'] = $result ? $result['total_users'] : 0;
        } catch (Exception $e) {
            $stats['total_users'] = 0;
        }
        
        // Users this month
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as monthly_users FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
            $result = $stmt->fetch();
            $stats['monthly_users'] = $result ? $result['monthly_users'] : 0;
        } catch (Exception $e) {
            $stats['monthly_users'] = 0;
        }
        
        // Total page views
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as total_views FROM page_views");
            $result = $stmt->fetch();
            $stats['total_views'] = $result ? $result['total_views'] : 0;
        } catch (Exception $e) {
            $stats['total_views'] = 0;
        }
        
        // Total revenue
        try {
            $stmt = $pdo->query("SELECT SUM(amount) as total_revenue FROM purchases WHERE status = 'completed'");
            $result = $stmt->fetch();
            $stats['total_revenue'] = $result && $result['total_revenue'] ? $result['total_revenue'] : 0;
        } catch (Exception $e) {
            $stats['total_revenue'] = 0;
        }
        
        // Waitlist subscribers
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as waitlist_count FROM waitlist WHERE status = 'active'");
            $result = $stmt->fetch();
            $stats['waitlist_count'] = $result ? $result['waitlist_count'] : 0;
        } catch (Exception $e) {
            $stats['waitlist_count'] = 0;
        }
        
        // Contact messages
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as contact_messages FROM contact_submissions WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
            $result = $stmt->fetch();
            $stats['contact_messages'] = $result ? $result['contact_messages'] : 0;
        } catch (Exception $e) {
            $stats['contact_messages'] = 0;
        }
        
        // New users this month
        try {
            $stmt = $pdo->query("SELECT COUNT(*) as new_users FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)");
            $result = $stmt->fetch();
            $stats['new_users'] = $result ? $result['new_users'] : 0;
        } catch (Exception $e) {
            $stats['new_users'] = 0;
        }
        
        // Recent activity (last 10 actions)
        try {
            $stmt = $pdo->query("
                SELECT a.*, u.email 
                FROM activity_logs a 
                LEFT JOIN users u ON a.user_id = u.id 
                ORDER BY a.created_at DESC 
                LIMIT 10
            ");
            $recent_activity = $stmt->fetchAll();
        } catch (Exception $e) {
            $recent_activity = [];
        }
        
        // Daily stats for last 30 days
        try {
            $stmt = $pdo->query("
                SELECT 
                    DATE(created_at) as date,
                    COUNT(*) as activities,
                    COUNT(DISTINCT user_id) as active_users,
                    COUNT(DISTINCT ip_address) as unique_visitors
                FROM activity_logs 
                WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                GROUP BY DATE(created_at)
                ORDER BY date DESC
            ");
            $daily_stats = $stmt->fetchAll();
        } catch (Exception $e) {
            $daily_stats = [];
        }
        
        // Top pages
        try {
            $stmt = $pdo->query("
                SELECT 
                    page_url,
                    COUNT(*) as views,
                    COUNT(DISTINCT ip_address) as unique_visitors
                FROM page_views 
                WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                GROUP BY page_url
                ORDER BY views DESC
                LIMIT 10
            ");
            $top_pages = $stmt->fetchAll();
        } catch (Exception $e) {
            $top_pages = [];
        }
        
        // Recent purchases
        try {
            $stmt = $pdo->query("
                SELECT p.*, u.email, pr.name as product_name
                FROM purchases p
                LEFT JOIN users u ON p.user_id = u.id
                LEFT JOIN products pr ON p.product_id = pr.id
                ORDER BY p.created_at DESC
                LIMIT 10
            ");
            $recent_purchases = $stmt->fetchAll();
        } catch (Exception $e) {
            $recent_purchases = [];
        }
        
        // Recent waitlist signups
        try {
            $stmt = $pdo->query("
                SELECT *
                FROM waitlist 
                ORDER BY created_at DESC
                LIMIT 20
            ");
            $recent_waitlist = $stmt->fetchAll();
        } catch (Exception $e) {
            $recent_waitlist = [];
        }
        
        // Recent user registrations
        try {
            $stmt = $pdo->query("
                SELECT id, email, first_name, last_name, full_name, 
                       email_verified, login_count, last_login, created_at
                FROM users 
                ORDER BY created_at DESC
                LIMIT 20
            ");
            $recent_users = $stmt->fetchAll();
        } catch (Exception $e) {
            $recent_users = [];
        }
    }
    
} catch (Exception $e) {
    $error_message = 'Database error: ' . $e->getMessage();
    error_log('Analytics dashboard error: ' . $e->getMessage());
}

?>
<!DOCTYPE html>
<html>
<head>
    <title>Analytics Dashboard - Ian Saura Hub</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: #f5f5f5; 
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header { 
            border-bottom: 1px solid #eee; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .error-message {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border: 1px solid #f5c6cb;
        }
        .setup-instructions {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            border: 1px solid #c3e6cb;
        }
        .stats-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .stat-card { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 20px; 
            border-radius: 8px; 
            text-align: center; 
        }
        .stat-number { 
            font-size: 2em; 
            font-weight: bold; 
            margin-bottom: 5px; 
        }
        .stat-label { 
            opacity: 0.9; 
            font-size: 0.9em; 
        }
        .section { 
            margin-bottom: 30px; 
        }
        .section h2 { 
            border-bottom: 2px solid #007cba; 
            padding-bottom: 10px; 
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 10px; 
        }
        th, td { 
            padding: 10px; 
            text-align: left; 
            border-bottom: 1px solid #eee; 
        }
        th { 
            background: #f8f9fa; 
            font-weight: bold; 
        }
        .logout-btn {
            background: #dc3545;
            color: white;
            padding: 8px 16px;
            text-decoration: none;
            border-radius: 4px;
        }
        .status-pending { color: #ffc107; }
        .status-completed { color: #28a745; }
        .status-failed { color: #dc3545; }
        .no-data {
            text-align: center;
            color: #666;
            font-style: italic;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📊 Analytics Dashboard</h1>
            <a href="?logout=1" class="logout-btn">Logout</a>
        </div>
        
        <?php if ($error_message): ?>
        <div class="error-message">
            <h3>⚠️ Setup Required</h3>
            <p><?= htmlspecialchars($error_message) ?></p>
        </div>
        
        <div class="setup-instructions">
            <h3>🚀 Quick Setup Instructions:</h3>
            <ol>
                <li>Go to your Ferozo control panel</li>
                <li>Open phpMyAdmin</li>
                <li>Select database: <strong>c2621673_ian</strong></li>
                <li>Go to "Import" tab</li>
                <li>Upload file: <strong>database/database-setup.sql</strong></li>
                <li>Click "Go" to create tables</li>
                <li>Refresh this page</li>
            </ol>
        </div>
        <?php endif; ?>
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number"><?= number_format($stats['total_users'] ?? 0) ?></div>
                <div class="stat-label">Total Registered Users</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?= number_format($stats['new_users'] ?? 0) ?></div>
                <div class="stat-label">New Users (30d)</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?= number_format($stats['waitlist_count'] ?? 0) ?></div>
                <div class="stat-label">Waitlist Subscribers</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?= number_format($stats['contact_messages'] ?? 0) ?></div>
                <div class="stat-label">Contact Messages (30d)</div>
            </div>
        </div>
        
        <?php if (!empty($daily_stats)): ?>
        <div class="section">
            <h2>📈 Daily Activity (Last 30 Days)</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Total Activities</th>
                        <th>Active Users</th>
                        <th>Unique Visitors</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($daily_stats as $day): ?>
                    <tr>
                        <td><?= $day['date'] ?></td>
                        <td><?= number_format($day['activities']) ?></td>
                        <td><?= number_format($day['active_users']) ?></td>
                        <td><?= number_format($day['unique_visitors']) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php else: ?>
        <div class="section">
            <h2>📈 Daily Activity</h2>
            <div class="no-data">No activity data yet. Start using your site to see analytics!</div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($top_pages)): ?>
        <div class="section">
            <h2>🔥 Top Pages (Last 30 Days)</h2>
            <table>
                <thead>
                    <tr>
                        <th>Page URL</th>
                        <th>Total Views</th>
                        <th>Unique Visitors</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($top_pages as $page): ?>
                    <tr>
                        <td><?= htmlspecialchars($page['page_url']) ?></td>
                        <td><?= number_format($page['views']) ?></td>
                        <td><?= number_format($page['unique_visitors']) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php else: ?>
        <div class="section">
            <h2>🔥 Top Pages</h2>
            <div class="no-data">No page view data yet. Visit your site to generate analytics!</div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($recent_purchases)): ?>
        <div class="section">
            <h2>🛒 Recent Purchases</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>User Email</th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recent_purchases as $purchase): ?>
                    <tr>
                        <td><?= date('M j, Y H:i', strtotime($purchase['created_at'])) ?></td>
                        <td><?= htmlspecialchars($purchase['email']) ?></td>
                        <td><?= htmlspecialchars($purchase['product_name']) ?></td>
                        <td>$<?= number_format($purchase['amount'], 2) ?></td>
                        <td class="status-<?= $purchase['status'] ?>"><?= ucfirst($purchase['status']) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php else: ?>
        <div class="section">
            <h2>🛒 Recent Purchases</h2>
            <div class="no-data">No purchases yet. Sales data will appear here once customers make purchases.</div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($recent_waitlist)): ?>
        <div class="section">
            <h2>🔔 Waitlist Subscribers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Interest Area</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recent_waitlist as $subscriber): ?>
                    <tr>
                        <td><?= date('M j, Y H:i', strtotime($subscriber['created_at'])) ?></td>
                        <td><?= htmlspecialchars($subscriber['first_name'] . ' ' . $subscriber['last_name']) ?></td>
                        <td><?= htmlspecialchars($subscriber['email']) ?></td>
                        <td><?= htmlspecialchars($subscriber['interest_area']) ?></td>
                        <td class="status-<?= $subscriber['status'] ?>"><?= ucfirst($subscriber['status']) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php else: ?>
        <div class="section">
            <h2>🔔 Waitlist Subscribers</h2>
            <div class="no-data">No waitlist subscribers yet. Users will appear here when they join the waitlist.</div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($recent_users)): ?>
        <div class="section">
            <h2>👤 Recent User Registrations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Registration Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Email Verified</th>
                        <th>Login Count</th>
                        <th>Last Login</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recent_users as $user): ?>
                    <tr>
                        <td><?= date('M j, Y H:i', strtotime($user['created_at'])) ?></td>
                        <td><?= htmlspecialchars($user['full_name'] ?: ($user['first_name'] . ' ' . $user['last_name'])) ?></td>
                        <td><?= htmlspecialchars($user['email']) ?></td>
                        <td class="status-<?= $user['email_verified'] ? 'completed' : 'pending' ?>">
                            <?= $user['email_verified'] ? 'Verified' : 'Pending' ?>
                        </td>
                        <td><?= $user['login_count'] ?></td>
                        <td><?= $user['last_login'] ? date('M j, Y H:i', strtotime($user['last_login'])) : 'Never' ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php else: ?>
        <div class="section">
            <h2>👤 Recent User Registrations</h2>
            <div class="no-data">No registered users yet. User registrations will appear here once people sign up.</div>
        </div>
        <?php endif; ?>
        
        <?php if (!empty($recent_activity)): ?>
        <div class="section">
            <h2>⚡ Recent Activity</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Description</th>
                        <th>IP Address</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($recent_activity as $activity): ?>
                    <tr>
                        <td><?= date('M j, H:i', strtotime($activity['created_at'])) ?></td>
                        <td><?= htmlspecialchars($activity['email'] ?? 'Guest') ?></td>
                        <td><?= htmlspecialchars($activity['action']) ?></td>
                        <td><?= htmlspecialchars($activity['description']) ?></td>
                        <td><?= htmlspecialchars($activity['ip_address']) ?></td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php else: ?>
        <div class="section">
            <h2>⚡ Recent Activity</h2>
            <div class="no-data">No activity logged yet. User interactions will appear here once tracking starts.</div>
        </div>
        <?php endif; ?>
        
        <div style="text-align: center; margin-top: 30px; color: #666;">
            <p>Last updated: <?= date('Y-m-d H:i:s') ?></p>
            <?php if (!empty($existing_tables)): ?>
            <p><small>Database tables: <?= implode(', ', $existing_tables) ?></small></p>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>

<?php
// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: analytics-dashboard.php');
    exit;
}
?> 