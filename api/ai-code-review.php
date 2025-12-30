<?php
/**
 * AI Code Review API Endpoint
 * Provides automatic feedback on completed exercises
 * Uses Groq (free) for fast AI responses
 */

require_once __DIR__ . '/middleware/cors.php';
applyCors();

header('Content-Type: application/json');

error_reporting(0);
ini_set('display_errors', 0);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/secure-config.php';

$GROQ_API_KEY = defined('GROQ_API_KEY') ? GROQ_API_KEY : '';

if (empty($GROQ_API_KEY)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'AI not configured']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$code = $input['code'] ?? '';
$exerciseTitle = $input['exerciseTitle'] ?? '';
$exerciseDescription = $input['exerciseDescription'] ?? '';
$language = $input['language'] ?? 'sql';
$userLanguage = $input['userLanguage'] ?? 'es';
$expectedOutput = $input['expectedOutput'] ?? '';
$userOutput = $input['userOutput'] ?? '';

if (empty($code)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Code is required']);
    exit;
}

// Multi-language prompts
$prompts = [
    'es' => [
        'intro' => 'Eres un revisor de código experto en Data Engineering. Tu tarea es dar feedback constructivo sobre el código del estudiante.',
        'rules' => [
            'El código YA FUNCIONA correctamente, no necesita corrección.',
            'Da feedback en 3-4 puntos máximo.',
            'Menciona 1 cosa que hizo BIEN (refuerzo positivo).',
            'Sugiere 1-2 mejoras o best practices.',
            'Si hay anti-patrones, menciónalos amablemente.',
            'Sé conciso y motivador.',
            'Responde en español.',
        ],
        'categories' => [
            'performance' => '⚡ Performance',
            'readability' => '📖 Legibilidad',
            'bestPractice' => '✨ Best Practice',
            'positive' => '👍 Bien hecho',
        ],
    ],
    'en' => [
        'intro' => 'You are an expert Data Engineering code reviewer. Your task is to provide constructive feedback on the student\'s code.',
        'rules' => [
            'The code ALREADY WORKS correctly, no correction needed.',
            'Give feedback in 3-4 points maximum.',
            'Mention 1 thing they did WELL (positive reinforcement).',
            'Suggest 1-2 improvements or best practices.',
            'If there are anti-patterns, mention them kindly.',
            'Be concise and motivating.',
            'Respond in English.',
        ],
        'categories' => [
            'performance' => '⚡ Performance',
            'readability' => '📖 Readability',
            'bestPractice' => '✨ Best Practice',
            'positive' => '👍 Well done',
        ],
    ],
    'pt' => [
        'intro' => 'Você é um revisor de código expert em Data Engineering. Sua tarefa é dar feedback construtivo sobre o código do estudante.',
        'rules' => [
            'O código JÁ FUNCIONA corretamente, não precisa de correção.',
            'Dê feedback em 3-4 pontos máximo.',
            'Mencione 1 coisa que fez BEM (reforço positivo).',
            'Sugira 1-2 melhorias ou best practices.',
            'Se houver anti-patterns, mencione-os gentilmente.',
            'Seja conciso e motivador.',
            'Responda em português.',
        ],
        'categories' => [
            'performance' => '⚡ Performance',
            'readability' => '📖 Legibilidade',
            'bestPractice' => '✨ Best Practice',
            'positive' => '👍 Bem feito',
        ],
    ],
];

$p = $prompts[$userLanguage] ?? $prompts['es'];

$systemPrompt = "{$p['intro']}\n\n" .
    "REGLAS:\n" . implode("\n", array_map(fn($r) => "- $r", $p['rules'])) . "\n\n" .
    "FORMATO DE RESPUESTA (JSON):\n" .
    "{\n" .
    '  "positive": "Lo que hizo bien",' . "\n" .
    '  "improvements": ["Mejora 1", "Mejora 2"],' . "\n" .
    '  "rating": 1-5 (estrellas),' . "\n" .
    '  "tip": "Un tip profesional corto"' . "\n" .
    "}\n\n" .
    "IMPORTANTE: Responde SOLO el JSON, sin markdown ni explicaciones adicionales.";

$userPrompt = "EJERCICIO: {$exerciseTitle}\n\n" .
    "DESCRIPCIÓN: {$exerciseDescription}\n\n" .
    "LENGUAJE: {$language}\n\n" .
    "CÓDIGO DEL ESTUDIANTE:\n```{$language}\n{$code}\n```\n\n" .
    "El código produce el resultado correcto. Dame feedback constructivo en formato JSON.";

// Call Groq API
$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL => 'https://api.groq.com/openai/v1/chat/completions',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $GROQ_API_KEY
    ],
    CURLOPT_POSTFIELDS => json_encode([
        'model' => 'llama-3.3-70b-versatile',
        'messages' => [
            ['role' => 'system', 'content' => $systemPrompt],
            ['role' => 'user', 'content' => $userPrompt]
        ],
        'max_tokens' => 500,
        'temperature' => 0.7,
    ])
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Connection error']);
    exit;
}

if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode(['success' => false, 'error' => 'AI service error', 'details' => $response]);
    exit;
}

$data = json_decode($response, true);
$aiResponse = $data['choices'][0]['message']['content'] ?? '';

// Try to parse as JSON
$review = json_decode($aiResponse, true);

if (!$review) {
    // Try to extract JSON from response
    preg_match('/\{[\s\S]*\}/', $aiResponse, $matches);
    if (!empty($matches[0])) {
        $review = json_decode($matches[0], true);
    }
}

if (!$review) {
    // Fallback to raw response
    $review = [
        'positive' => $aiResponse,
        'improvements' => [],
        'rating' => 4,
        'tip' => ''
    ];
}

// Ensure all fields exist
$review = array_merge([
    'positive' => '',
    'improvements' => [],
    'rating' => 4,
    'tip' => ''
], $review);

// Clamp rating
$review['rating'] = max(1, min(5, intval($review['rating'])));

echo json_encode([
    'success' => true,
    'review' => $review
]);


