<?php
/**
 * Exercise Answers API
 * Guarda y recupera las respuestas de ejercicios del usuario
 * 
 * Arquitectura de primer nivel:
 * - localStorage: Caché rápido para UX inmediata
 * - Database: Fuente de verdad, persistencia entre dispositivos
 * 
 * GET /api/exercise-answers.php?email=user@example.com
 *   - Devuelve todas las respuestas guardadas del usuario
 * 
 * POST /api/exercise-answers.php
 *   - Body: { email, exerciseId, exerciseType, code }
 *   - Guarda/actualiza una respuesta
 */

header('Content-Type: application/json');

// CORS
try {
    require_once __DIR__ . '/middleware/cors.php';
    applyCors();
} catch (Exception $e) {
    header('Access-Control-Allow-Origin: https://iansaura.com');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(204);
        exit();
    }
}

// Rate limiting (más permisivo para este endpoint ya que se llama frecuentemente)
try {
    require_once __DIR__ . '/middleware/rate-limiter.php';
    applyRateLimit('exercise_answers', 120, 60); // 120 requests per minute
} catch (Exception $e) {
    // Continue without rate limiting
}

// Database connection
$db = null;
try {
    require_once 'secure-config.php';
    $db = getSecureDBConnection();
} catch (Exception $e) {
    // Database not available - return offline response
    echo json_encode([
        'success' => false,
        'offline' => true,
        'message' => 'Database temporarily unavailable'
    ]);
    exit();
}

// Ensure table exists
try {
    $tableCheck = $db->query("SHOW TABLES LIKE 'saved_exercise_answers'");
    if ($tableCheck->rowCount() == 0) {
        $db->exec("
            CREATE TABLE saved_exercise_answers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                exercise_id VARCHAR(100) NOT NULL,
                exercise_type ENUM('sql', 'python') NOT NULL,
                code TEXT NOT NULL,
                is_correct BOOLEAN DEFAULT FALSE,
                execution_count INT DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                UNIQUE KEY unique_user_exercise (email, exercise_id, exercise_type),
                INDEX idx_email (email),
                INDEX idx_exercise (exercise_id),
                INDEX idx_type (exercise_type),
                INDEX idx_updated (updated_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
        ");
    }
} catch (Exception $e) {
    error_log("Failed to create saved_exercise_answers table: " . $e->getMessage());
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Obtener todas las respuestas del usuario
        $email = $_GET['email'] ?? null;
        $exerciseType = $_GET['type'] ?? null; // 'sql' or 'python' (optional filter)
        
        if (!$email) {
            echo json_encode(['success' => false, 'error' => 'Email required']);
            exit();
        }
        
        if ($exerciseType) {
            $stmt = $db->prepare("
                SELECT exercise_id, exercise_type, code, is_correct, execution_count, updated_at
                FROM saved_exercise_answers 
                WHERE email = ? AND exercise_type = ?
                ORDER BY updated_at DESC
            ");
            $stmt->execute([$email, $exerciseType]);
        } else {
            $stmt = $db->prepare("
                SELECT exercise_id, exercise_type, code, is_correct, execution_count, updated_at
                FROM saved_exercise_answers 
                WHERE email = ?
                ORDER BY updated_at DESC
            ");
            $stmt->execute([$email]);
        }
        
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Format as { exerciseId: { code, isCorrect, ... } }
        $answers = [];
        foreach ($rows as $row) {
            $key = $row['exercise_id'];
            $answers[$key] = [
                'code' => $row['code'],
                'type' => $row['exercise_type'],
                'isCorrect' => (bool)$row['is_correct'],
                'executionCount' => (int)$row['execution_count'],
                'updatedAt' => $row['updated_at']
            ];
        }
        
        echo json_encode([
            'success' => true,
            'answers' => $answers,
            'count' => count($answers)
        ]);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Guardar respuesta
        $input = json_decode(file_get_contents('php://input'), true);
        
        $email = $input['email'] ?? null;
        $exerciseId = $input['exerciseId'] ?? null;
        $exerciseType = $input['exerciseType'] ?? null; // 'sql' or 'python'
        $code = $input['code'] ?? null;
        $isCorrect = $input['isCorrect'] ?? false;
        
        // Bulk save support
        $bulkAnswers = $input['answers'] ?? null;
        
        if ($bulkAnswers && $email) {
            // Bulk save mode
            $saved = 0;
            foreach ($bulkAnswers as $exId => $data) {
                try {
                    $stmt = $db->prepare("
                        INSERT INTO saved_exercise_answers 
                            (email, exercise_id, exercise_type, code, is_correct, execution_count)
                        VALUES (?, ?, ?, ?, ?, 1)
                        ON DUPLICATE KEY UPDATE
                            code = VALUES(code),
                            is_correct = VALUES(is_correct),
                            execution_count = execution_count + 1,
                            updated_at = NOW()
                    ");
                    $stmt->execute([
                        $email,
                        $exId,
                        $data['type'] ?? 'python',
                        $data['code'] ?? '',
                        $data['isCorrect'] ?? false
                    ]);
                    $saved++;
                } catch (Exception $e) {
                    error_log("Bulk save error for $exId: " . $e->getMessage());
                }
            }
            
            echo json_encode([
                'success' => true,
                'message' => "Saved $saved answers",
                'count' => $saved
            ]);
            exit();
        }
        
        // Single save mode
        if (!$email || !$exerciseId || !$exerciseType || $code === null) {
            echo json_encode(['success' => false, 'error' => 'Missing required fields']);
            exit();
        }
        
        // Validate exercise type
        if (!in_array($exerciseType, ['sql', 'python'])) {
            echo json_encode(['success' => false, 'error' => 'Invalid exercise type']);
            exit();
        }
        
        // Upsert
        $stmt = $db->prepare("
            INSERT INTO saved_exercise_answers 
                (email, exercise_id, exercise_type, code, is_correct, execution_count)
            VALUES (?, ?, ?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE
                code = VALUES(code),
                is_correct = VALUES(is_correct),
                execution_count = execution_count + 1,
                updated_at = NOW()
        ");
        
        $stmt->execute([$email, $exerciseId, $exerciseType, $code, $isCorrect]);
        
        echo json_encode([
            'success' => true,
            'message' => 'Answer saved',
            'exerciseId' => $exerciseId
        ]);
        
    } else {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
    }
    
} catch (Exception $e) {
    error_log("Exercise Answers Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Server error'
    ]);
}
