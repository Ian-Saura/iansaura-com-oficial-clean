<?php
/**
 * Dataset Suggestions API with Voting System
 * Permite sugerir datasets y votar por los existentes
 */

header('Content-Type: application/json');
require_once __DIR__ . '/middleware/cors.php'; applyCors(); // CORS restrictive
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Archivo donde se guardan las sugerencias
$suggestionsFile = __DIR__ . '/data/dataset-suggestions.json';

// Asegurar que el directorio existe
if (!file_exists(__DIR__ . '/data')) {
    mkdir(__DIR__ . '/data', 0755, true);
}

// Cargar sugerencias existentes
function loadSuggestions($file) {
    if (!file_exists($file)) {
        return [];
    }
    $content = file_get_contents($file);
    return json_decode($content, true) ?: [];
}

// Guardar sugerencias
function saveSuggestions($file, $suggestions) {
    // Ordenar por votos (mayor a menor)
    usort($suggestions, function($a, $b) {
        return ($b['votes'] ?? 0) - ($a['votes'] ?? 0);
    });
    file_put_contents($file, json_encode($suggestions, JSON_PRETTY_PRINT));
}

// GET - Listar sugerencias (público)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = $_GET['action'] ?? '';
    
    if ($action === 'list') {
        $suggestions = loadSuggestions($suggestionsFile);
        
        // Ordenar por votos
        usort($suggestions, function($a, $b) {
            return ($b['votes'] ?? 0) - ($a['votes'] ?? 0);
        });
        
        echo json_encode([
            'success' => true,
            'count' => count($suggestions),
            'suggestions' => $suggestions
        ]);
        exit();
    }
    
    // Admin: ver todas con key
    $adminKey = $_GET['key'] ?? '';
    require_once 'secrets.php';
    if ($adminKey === ADMIN_API_KEY) {
        $suggestions = loadSuggestions($suggestionsFile);
        echo json_encode([
            'success' => true,
            'count' => count($suggestions),
            'suggestions' => $suggestions
        ]);
        exit();
    }
    
    echo json_encode(['success' => false, 'error' => 'Acción no válida']);
    exit();
}

// POST - Sugerir o Votar
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $action = $input['action'] ?? 'suggest';
    $email = strtolower(trim($input['email'] ?? ''));
    
    if (empty($email)) {
        echo json_encode(['success' => false, 'error' => 'Email requerido']);
        exit();
    }
    
    $suggestions = loadSuggestions($suggestionsFile);
    
    // ACCIÓN: Nueva sugerencia
    if ($action === 'suggest') {
        $suggestionText = trim($input['suggestion'] ?? '');
        
        if (empty($suggestionText)) {
            echo json_encode(['success' => false, 'error' => 'Sugerencia vacía']);
            exit();
        }
        
        // Verificar si ya existe una sugerencia similar (case insensitive)
        $normalizedNew = strtolower($suggestionText);
        foreach ($suggestions as $existing) {
            if (strtolower($existing['suggestion']) === $normalizedNew) {
                echo json_encode([
                    'success' => false, 
                    'error' => 'Esta sugerencia ya existe. ¡Podés votarla!'
                ]);
                exit();
            }
        }
        
        // Agregar nueva sugerencia
        $newSuggestion = [
            'id' => 'sug_' . uniqid(),
            'suggestion' => $suggestionText,
            'votes' => 1, // El que sugiere cuenta como primer voto
            'voters' => [$email],
            'created_at' => date('c'),
            'created_by' => $email
        ];
        
        $suggestions[] = $newSuggestion;
        saveSuggestions($suggestionsFile, $suggestions);
        
        // Log
        error_log("📊 Nueva sugerencia de dataset: '{$suggestionText}' por {$email}");
        
        echo json_encode([
            'success' => true,
            'message' => '¡Sugerencia agregada!',
            'suggestion' => $newSuggestion
        ]);
        exit();
    }
    
    // ACCIÓN: Votar
    if ($action === 'vote') {
        $suggestionId = $input['suggestion_id'] ?? '';
        
        if (empty($suggestionId)) {
            echo json_encode(['success' => false, 'error' => 'ID de sugerencia requerido']);
            exit();
        }
        
        // Buscar la sugerencia
        $found = false;
        foreach ($suggestions as &$sug) {
            if ($sug['id'] === $suggestionId) {
                $found = true;
                
                // Verificar si ya votó
                if (in_array($email, $sug['voters'] ?? [])) {
                    echo json_encode([
                        'success' => false,
                        'error' => 'Ya votaste por esta sugerencia'
                    ]);
                    exit();
                }
                
                // Agregar voto
                $sug['votes'] = ($sug['votes'] ?? 0) + 1;
                $sug['voters'][] = $email;
                
                saveSuggestions($suggestionsFile, $suggestions);
                
                // Log
                error_log("🗳️ Voto para '{$sug['suggestion']}' por {$email} (total: {$sug['votes']})");
                
                echo json_encode([
                    'success' => true,
                    'message' => '¡Voto registrado!',
                    'new_votes' => $sug['votes']
                ]);
                exit();
            }
        }
        
        if (!$found) {
            echo json_encode(['success' => false, 'error' => 'Sugerencia no encontrada']);
            exit();
        }
    }
    
    echo json_encode(['success' => false, 'error' => 'Acción no válida']);
    exit();
}

echo json_encode(['success' => false, 'error' => 'Método no soportado']);
