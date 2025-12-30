<?php
/**
 * User Progress API
 * Guarda y recupera el progreso del usuario
 * 
 * Mapeo de campos frontend -> backend:
 * - completedSteps -> completed_steps
 * - completedProjects -> completed_projects  
 * - watchedVideos -> watched_videos
 * - totalXP -> xp
 * - dataCoins -> data_coins
 * - textInputs -> text_inputs
 */

header('Content-Type: application/json');

// CORS - Restrictive (only iansaura.com)
try {
    require_once __DIR__ . '/middleware/cors.php';
    applyCors();
} catch (Exception $e) {
    // CORS middleware failed - continue with basic headers
    error_log("CORS middleware error: " . $e->getMessage());
    header('Access-Control-Allow-Origin: https://iansaura.com');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit();
    }
}

// Helper function to return offline response
function returnOfflineResponse($method) {
    if ($method === 'GET') {
        echo json_encode([
            'success' => true,
            'progress' => null,
            'message' => 'Database temporarily unavailable - using local storage',
            'offline' => true
        ]);
    } else {
        $input = json_decode(file_get_contents('php://input'), true);
        echo json_encode([
            'success' => true,
            'message' => 'Progress registered locally - will sync when database is available',
            'offline' => true,
            'saved' => [
                'steps' => count($input['progress']['completedSteps'] ?? []),
                'projects' => count($input['progress']['completedProjects'] ?? []),
                'videos' => count($input['progress']['watchedVideos'] ?? []),
                'xp' => $input['progress']['totalXP'] ?? 0,
                'coins' => $input['progress']['dataCoins'] ?? 0
            ]
        ]);
    }
    exit();
}

// Try to load secure config and rate limiter - gracefully degrade if they fail
try {
    require_once __DIR__ . '/middleware/rate-limiter.php';
    applyRateLimit('user_progress', 60, 60);
} catch (Exception $e) {
    // Rate limiter failed - continue without it
    error_log("Rate limiter not available: " . $e->getMessage());
}

// Load secure config - this is where DB credentials come from
$dbConnected = false;
$db = null;

try {
    require_once 'secure-config.php';
    $db = getSecureDBConnection();
    $dbConnected = true;
} catch (Exception $e) {
    // Database or config not available - return offline response
    error_log("Database not available for user-progress: " . $e->getMessage());
    returnOfflineResponse($_SERVER['REQUEST_METHOD']);
}

if (!$dbConnected || !$db) {
    returnOfflineResponse($_SERVER['REQUEST_METHOD']);
}

try {
    
    // At this point, $db is guaranteed to be set from getSecureDBConnection()
    
    // Verificar que la tabla existe y tiene todas las columnas necesarias
    $tableCheck = $db->query("SHOW TABLES LIKE 'user_progress'");
    if ($tableCheck->rowCount() == 0) {
        // Crear la tabla si no existe
        $db->exec("
            CREATE TABLE IF NOT EXISTS user_progress (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                user_id INT NULL,
                completed_steps JSON NULL,
                completed_projects JSON NULL,
                watched_videos JSON NULL,
                text_inputs JSON NULL,
                level_1_percent INT DEFAULT 0,
                level_2_percent INT DEFAULT 0,
                level_3_percent INT DEFAULT 0,
                xp INT DEFAULT 0,
                data_coins INT DEFAULT 0,
                current_streak INT DEFAULT 0,
                longest_streak INT DEFAULT 0,
                last_activity_date VARCHAR(50) DEFAULT '',
                achievements JSON NULL,
                purchased_items JSON NULL,
                equipped_avatar VARCHAR(100) DEFAULT NULL,
                equipped_badge VARCHAR(100) DEFAULT NULL,
                equipped_title VARCHAR(100) DEFAULT NULL,
                coins_purchased INT DEFAULT 0,
                completed_sql_exercises JSON NULL,
                completed_python_exercises JSON NULL,
                activity_dates JSON NULL,
                last_activity DATETIME DEFAULT CURRENT_TIMESTAMP,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_email (email),
                INDEX idx_user_id (user_id),
                INDEX idx_last_activity (last_activity)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        ");
    } else {
        // Asegurar que existen las columnas nuevas
        $columns = $db->query("SHOW COLUMNS FROM user_progress")->fetchAll(PDO::FETCH_COLUMN);
        
        if (!in_array('xp', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN xp INT DEFAULT 0");
        }
        if (!in_array('data_coins', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN data_coins INT DEFAULT 0");
        }
        if (!in_array('text_inputs', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN text_inputs JSON NULL");
        }
        if (!in_array('current_streak', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN current_streak INT DEFAULT 0");
        }
        if (!in_array('longest_streak', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN longest_streak INT DEFAULT 0");
        }
        if (!in_array('last_activity_date', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN last_activity_date VARCHAR(50) DEFAULT ''");
        }
        if (!in_array('equipped_avatar', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN equipped_avatar VARCHAR(100) DEFAULT NULL");
        }
        if (!in_array('equipped_badge', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN equipped_badge VARCHAR(100) DEFAULT NULL");
        }
        if (!in_array('equipped_title', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN equipped_title VARCHAR(100) DEFAULT NULL");
        }
        if (!in_array('coins_purchased', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN coins_purchased INT DEFAULT 0");
        }
        if (!in_array('achievements', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN achievements JSON NULL");
        }
        if (!in_array('purchased_items', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN purchased_items JSON NULL");
        }
        if (!in_array('activity_dates', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN activity_dates JSON NULL");
        }
        if (!in_array('completed_sql_exercises', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN completed_sql_exercises JSON NULL");
        }
        if (!in_array('completed_python_exercises', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN completed_python_exercises JSON NULL");
        }
        // CRITICAL: Add last_activity column if it doesn't exist (for En Vivo tracking)
        if (!in_array('last_activity', $columns)) {
            $db->exec("ALTER TABLE user_progress ADD COLUMN last_activity DATETIME DEFAULT CURRENT_TIMESTAMP");
            $db->exec("CREATE INDEX idx_last_activity ON user_progress(last_activity)");
            // Initialize last_activity from updated_at if it exists
            $db->exec("UPDATE user_progress SET last_activity = COALESCE(updated_at, created_at, NOW()) WHERE last_activity IS NULL");
        }
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtener progreso
        $email = $_GET['email'] ?? null;
        
        if (!$email) {
            echo json_encode(['success' => false, 'error' => 'Email requerido']);
            exit();
        }
        
        $stmt = $db->prepare("SELECT * FROM user_progress WHERE email = ?");
        $stmt->execute([$email]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row) {
            // Calcular streak automáticamente basándose en last_activity (DATETIME)
            $today = date('Y-m-d');
            $yesterday = date('Y-m-d', strtotime('-1 day'));
            $lastActivity = $row['last_activity'] ?? null;
            $lastActivityDate = $row['last_activity_date'] ?? '';
            $currentStreak = (int)($row['current_streak'] ?? 0);
            $longestStreak = (int)($row['longest_streak'] ?? 0);
            
            // Determinar la fecha de última actividad (usar last_activity si existe, sino last_activity_date)
            $lastActivityDateFromDB = '';
            if ($lastActivity) {
                $lastActivityDateFromDB = date('Y-m-d', strtotime($lastActivity));
            } elseif (!empty($lastActivityDate)) {
                $lastActivityDateFromDB = $lastActivityDate;
            }
            
            // Calcular días de diferencia
            $daysDiff = 0;
            if (!empty($lastActivityDateFromDB)) {
                $daysDiff = (strtotime($today) - strtotime($lastActivityDateFromDB)) / 86400;
            }
            
            // Actualizar streak solo si es necesario
            $shouldUpdateStreak = false;
            
            if (empty($lastActivityDateFromDB)) {
                // Primera vez - empezar en 1
                $currentStreak = 1;
                $shouldUpdateStreak = true;
            } elseif ($lastActivityDateFromDB === $today) {
                // Ya tiene actividad hoy - mantener streak actual (no cambiar)
                // Pero asegurarse de que last_activity esté actualizado
                if (!$lastActivity || date('Y-m-d', strtotime($lastActivity)) !== $today) {
                    $shouldUpdateStreak = true; // Solo para actualizar last_activity
                }
            } elseif ($daysDiff == 1 || $lastActivityDateFromDB === $yesterday) {
                // Última actividad fue ayer - incrementar streak
                $currentStreak = $currentStreak + 1;
                $shouldUpdateStreak = true;
            } elseif ($daysDiff > 1) {
                // Más de 1 día sin actividad - resetear a 1 (porque está activo ahora)
                $currentStreak = 1;
                $shouldUpdateStreak = true;
            } else {
                // Mismo día o fecha futura (raro pero posible) - mantener streak
                $shouldUpdateStreak = true; // Para actualizar last_activity
            }
            
            // Actualizar longest streak
            $longestStreak = max($longestStreak, $currentStreak);
            
            // Guardar el streak actualizado en la BD si es necesario
            if ($shouldUpdateStreak) {
                $updateStmt = $db->prepare("
                    UPDATE user_progress 
                    SET current_streak = ?, 
                        longest_streak = ?, 
                        last_activity_date = ?,
                        last_activity = NOW()
                    WHERE email = ?
                ");
                $updateStmt->execute([$currentStreak, $longestStreak, $today, $email]);
            }
            
            // Mapear a formato frontend
            $activityDates = json_decode($row['activity_dates'] ?? '[]', true) ?: [];
            
            $progress = [
                'completedSteps' => json_decode($row['completed_steps'] ?? '[]', true) ?: [],
                'completedProjects' => json_decode($row['completed_projects'] ?? '[]', true) ?: [],
                'watchedVideos' => json_decode($row['watched_videos'] ?? '[]', true) ?: [],
                'textInputs' => json_decode($row['text_inputs'] ?? '{}', true) ?: [],
                'totalXP' => (int)($row['xp'] ?? 0),
                'dataCoins' => (int)($row['data_coins'] ?? 0),
                'currentStreak' => $currentStreak,
                'longestStreak' => $longestStreak,
                'lastActivityDate' => $today,
                'activityDates' => $activityDates,
                'achievements' => json_decode($row['achievements'] ?? '[]', true) ?: [],
                'purchasedItems' => json_decode($row['purchased_items'] ?? '[]', true) ?: [],
                'equippedAvatar' => $row['equipped_avatar'],
                'equippedBadge' => $row['equipped_badge'],
                'equippedTitle' => $row['equipped_title'],
                'coinsPurchased' => (int)($row['coins_purchased'] ?? 0),
                'level1Percent' => (int)($row['level_1_percent'] ?? 0),
                'level2Percent' => (int)($row['level_2_percent'] ?? 0),
                'level3Percent' => (int)($row['level_3_percent'] ?? 0),
                'lastUpdated' => $row['updated_at'],
                'completedSqlExercises' => json_decode($row['completed_sql_exercises'] ?? '[]', true) ?: [],
                'completedPythonExercises' => json_decode($row['completed_python_exercises'] ?? '[]', true) ?: [],
            ];
            
            echo json_encode([
                'success' => true,
                'progress' => $progress
            ]);
        } else {
            echo json_encode([
                'success' => true,
                'progress' => null,
                'message' => 'No progress found for this user'
            ]);
        }
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Guardar progreso
        $input = json_decode(file_get_contents('php://input'), true);
        
        $email = $input['email'] ?? null;
        $progress = $input['progress'] ?? null;
        
        if (!$email) {
            echo json_encode(['success' => false, 'error' => 'Email requerido']);
            exit();
        }
        
        if (!$progress) {
            echo json_encode(['success' => false, 'error' => 'Progress data requerido']);
            exit();
        }
        
        // SECURITY: Verificar que el email existe en la tabla users
        // Esto previene que usuarios manipulen localStorage con emails falsos
        $userCheckStmt = $db->prepare("SELECT id, email FROM users WHERE LOWER(email) = LOWER(?)");
        $userCheckStmt->execute([$email]);
        $validUser = $userCheckStmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$validUser) {
            // Email no existe en users - posible intento de manipulación
            error_log("SECURITY: Rejected progress save for non-existent user: {$email}");
            echo json_encode(['success' => false, 'error' => 'Usuario no válido']);
            exit();
        }
        
        // Usar el email normalizado de la BD
        $email = $validUser['email'];
        
        // IMPORTANT: Primero obtener el progreso existente para hacer MERGE, no OVERWRITE
        $existingStmt = $db->prepare("SELECT * FROM user_progress WHERE email = ?");
        $existingStmt->execute([$email]);
        $existingProgress = $existingStmt->fetch(PDO::FETCH_ASSOC);
        
        // Helper: merge arrays o usar nuevo si existe, sino existente, sino default
        $mergeJsonArray = function($newVal, $existingJson, $default = []) {
            if ($newVal !== null && !empty($newVal)) {
                return json_encode($newVal);
            }
            return $existingJson ?? json_encode($default);
        };
        
        // Helper: usar valor si existe en nuevo, sino existente, sino default
        $getValue = function($newVal, $existingVal, $default) {
            if ($newVal !== null && $newVal !== '') {
                return $newVal;
            }
            return $existingVal ?? $default;
        };
        
        // Mapear campos frontend -> backend CON MERGE
        $completedSteps = isset($progress['completedSteps']) 
            ? json_encode($progress['completedSteps']) 
            : ($existingProgress['completed_steps'] ?? json_encode([]));
            
        $completedProjects = isset($progress['completedProjects']) 
            ? json_encode($progress['completedProjects']) 
            : ($existingProgress['completed_projects'] ?? json_encode([]));
            
        $watchedVideos = isset($progress['watchedVideos']) 
            ? json_encode($progress['watchedVideos']) 
            : ($existingProgress['watched_videos'] ?? json_encode([]));
            
        $textInputs = isset($progress['textInputs']) 
            ? json_encode($progress['textInputs']) 
            : ($existingProgress['text_inputs'] ?? json_encode([]));
            
        $achievements = isset($progress['achievements']) 
            ? json_encode($progress['achievements']) 
            : ($existingProgress['achievements'] ?? json_encode([]));
            
        $purchasedItems = isset($progress['purchasedItems']) 
            ? json_encode($progress['purchasedItems']) 
            : ($existingProgress['purchased_items'] ?? json_encode([]));
        
        // Campos numéricos - usar totalXP del frontend SI existe, sino mantener existente
        $xp = isset($progress['totalXP']) || isset($progress['xp']) 
            ? (int)($progress['totalXP'] ?? $progress['xp'] ?? 0) 
            : (int)($existingProgress['xp'] ?? 0);
            
        $dataCoins = isset($progress['dataCoins']) 
            ? (int)$progress['dataCoins'] 
            : (int)($existingProgress['data_coins'] ?? 0);
            
        $currentStreak = isset($progress['currentStreak']) 
            ? (int)$progress['currentStreak'] 
            : (int)($existingProgress['current_streak'] ?? 0);
            
        $longestStreak = isset($progress['longestStreak']) 
            ? (int)$progress['longestStreak'] 
            : (int)($existingProgress['longest_streak'] ?? 0);
            
        $lastActivityDate = isset($progress['lastActivityDate']) && $progress['lastActivityDate'] !== '' 
            ? $progress['lastActivityDate'] 
            : ($existingProgress['last_activity_date'] ?? '');
            
        $activityDates = isset($progress['activityDates']) 
            ? json_encode($progress['activityDates']) 
            : ($existingProgress['activity_dates'] ?? json_encode([]));
            
        $coinsPurchased = isset($progress['coinsPurchased']) 
            ? (int)$progress['coinsPurchased'] 
            : (int)($existingProgress['coins_purchased'] ?? 0);
        
        // Equipamiento - mantener existente si no se envía nuevo
        $equippedAvatar = $progress['equippedAvatar'] ?? ($existingProgress['equipped_avatar'] ?? null);
        $equippedBadge = $progress['equippedBadge'] ?? ($existingProgress['equipped_badge'] ?? null);
        $equippedTitle = $progress['equippedTitle'] ?? ($existingProgress['equipped_title'] ?? null);
        
        // Ejercicios completados - CRITICAL: Merge arrays, no reemplazar
        if (isset($progress['completedSqlExercises'])) {
            $existingSqlArr = json_decode($existingProgress['completed_sql_exercises'] ?? '[]', true) ?: [];
            $newSqlArr = $progress['completedSqlExercises'] ?? [];
            $mergedSql = array_values(array_unique(array_merge($existingSqlArr, $newSqlArr)));
            $completedSqlExercises = json_encode($mergedSql);
        } else {
            $completedSqlExercises = $existingProgress['completed_sql_exercises'] ?? json_encode([]);
        }
        
        if (isset($progress['completedPythonExercises'])) {
            $existingPythonArr = json_decode($existingProgress['completed_python_exercises'] ?? '[]', true) ?: [];
            $newPythonArr = $progress['completedPythonExercises'] ?? [];
            $mergedPython = array_values(array_unique(array_merge($existingPythonArr, $newPythonArr)));
            $completedPythonExercises = json_encode($mergedPython);
        } else {
            $completedPythonExercises = $existingProgress['completed_python_exercises'] ?? json_encode([]);
        }
        
        // Calcular porcentajes de nivel basado en pasos completados (solo si se envían steps)
        if (isset($progress['completedSteps'])) {
            $stepsArr = $progress['completedSteps'] ?? [];
            $level1Steps = array_filter($stepsArr, fn($s) => strpos($s, 'l1-') === 0);
            $level2Steps = array_filter($stepsArr, fn($s) => strpos($s, 'l2-') === 0);
            $level3Steps = array_filter($stepsArr, fn($s) => strpos($s, 'l3-') === 0);
            
            // Aproximación de porcentajes (ajustar según total de pasos por nivel)
            $level1Percent = min(100, (int)(count($level1Steps) / 1.0)); // ~100 pasos nivel 1
            $level2Percent = min(100, (int)(count($level2Steps) / 0.8)); // ~80 pasos nivel 2
            $level3Percent = min(100, (int)(count($level3Steps) / 0.6)); // ~60 pasos nivel 3
        } else {
            // Mantener porcentajes existentes
            $level1Percent = (int)($existingProgress['level_1_percent'] ?? 0);
            $level2Percent = (int)($existingProgress['level_2_percent'] ?? 0);
            $level3Percent = (int)($existingProgress['level_3_percent'] ?? 0);
        }
        
        // Obtener user_id si existe
        $userId = null;
        $userStmt = $db->prepare("SELECT id FROM users WHERE email = ?");
        $userStmt->execute([$email]);
        $user = $userStmt->fetch(PDO::FETCH_ASSOC);
        if ($user) {
            $userId = $user['id'];
        }
        
        // Upsert (INSERT o UPDATE)
        $stmt = $db->prepare("
            INSERT INTO user_progress 
                (email, user_id, completed_steps, completed_projects, watched_videos, 
                 text_inputs, level_1_percent, level_2_percent, level_3_percent, 
                 xp, data_coins, current_streak, longest_streak, last_activity_date,
                 activity_dates, achievements, purchased_items, equipped_avatar, equipped_badge, 
                 equipped_title, coins_purchased, completed_sql_exercises, completed_python_exercises, last_activity)
            VALUES 
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE
                user_id = COALESCE(VALUES(user_id), user_id),
                completed_steps = VALUES(completed_steps),
                completed_projects = VALUES(completed_projects),
                watched_videos = VALUES(watched_videos),
                text_inputs = VALUES(text_inputs),
                level_1_percent = VALUES(level_1_percent),
                level_2_percent = VALUES(level_2_percent),
                level_3_percent = VALUES(level_3_percent),
                xp = VALUES(xp),
                data_coins = VALUES(data_coins),
                current_streak = VALUES(current_streak),
                longest_streak = VALUES(longest_streak),
                last_activity_date = VALUES(last_activity_date),
                activity_dates = VALUES(activity_dates),
                achievements = VALUES(achievements),
                purchased_items = VALUES(purchased_items),
                equipped_avatar = VALUES(equipped_avatar),
                equipped_badge = VALUES(equipped_badge),
                equipped_title = VALUES(equipped_title),
                coins_purchased = VALUES(coins_purchased),
                completed_sql_exercises = VALUES(completed_sql_exercises),
                completed_python_exercises = VALUES(completed_python_exercises),
                last_activity = NOW()
        ");
        
        $stmt->execute([
            $email, $userId, $completedSteps, $completedProjects, $watchedVideos,
            $textInputs, $level1Percent, $level2Percent, $level3Percent,
            $xp, $dataCoins, $currentStreak, $longestStreak, $lastActivityDate,
            $activityDates, $achievements, $purchasedItems, $equippedAvatar, $equippedBadge,
            $equippedTitle, $coinsPurchased, $completedSqlExercises, $completedPythonExercises
        ]);
        
        // Decode exercises for count
        $sqlExercisesArr = json_decode($completedSqlExercises, true) ?: [];
        $pythonExercisesArr = json_decode($completedPythonExercises, true) ?: [];
        
        echo json_encode([
            'success' => true,
            'message' => 'Progress saved successfully',
            'saved' => [
                'steps' => count($progress['completedSteps'] ?? []),
                'projects' => count($progress['completedProjects'] ?? []),
                'videos' => count($progress['watchedVideos'] ?? []),
                'xp' => $xp,
                'coins' => $dataCoins,
                'sqlExercises' => count($sqlExercisesArr),
                'pythonExercises' => count($pythonExercisesArr)
            ]
        ]);
        
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
    
} catch (Exception $e) {
    error_log("User Progress Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error: ' . $e->getMessage()
    ]);
}