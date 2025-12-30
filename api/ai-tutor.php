<?php
/**
 * AI Tutor API Endpoint
 * Uses Groq (free) for fast AI responses
 * 
 * Rate limits:
 * - Free users: 20 requests per day
 * - Premium users: Unlimited
 */

// CORS
require_once __DIR__ . '/middleware/cors.php';
applyCors();

header('Content-Type: application/json');

// Error handling
error_reporting(0);
ini_set('display_errors', 0);

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

require_once __DIR__ . '/secure-config.php';

// Groq API Key - Get free at https://console.groq.com
// Add to .db-credentials.php: 'GROQ_API_KEY' => 'gsk_xxx'
$GROQ_API_KEY = defined('GROQ_API_KEY') ? GROQ_API_KEY : '';

if (empty($GROQ_API_KEY)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'AI Tutor not configured']);
    exit;
}

// Parse request
$input = json_decode(file_get_contents('php://input'), true);
$email = strtolower(trim($input['email'] ?? ''));
$code = $input['code'] ?? '';
$question = $input['question'] ?? '';
$exerciseTitle = $input['exerciseTitle'] ?? '';
$exerciseDescription = $input['exerciseDescription'] ?? '';
$language = $input['language'] ?? 'sql'; // 'sql', 'python', or 'general' (for projects)
$userLanguage = $input['userLanguage'] ?? 'es'; // 'es', 'en', 'pt'

// Validate required fields
if (empty($email) || empty($question)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Email and question are required']);
    exit;
}

// Check if user is premium
$isPremium = false;
try {
    $db = getSecureDBConnection();
    $stmt = $db->prepare("SELECT status FROM subscribers WHERE email = ? AND status IN ('active', 'trial')");
    $stmt->execute([$email]);
    $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
    $isPremium = !empty($subscriber);
} catch (Exception $e) {
    error_log("AI Tutor DB error: " . $e->getMessage());
}

// Rate limiting for free users (20 per day)
if (!$isPremium) {
    $rateLimitFile = sys_get_temp_dir() . '/ai_tutor_' . md5($email) . '_' . date('Y-m-d');
    $requestCount = 0;
    
    if (file_exists($rateLimitFile)) {
        $requestCount = (int)file_get_contents($rateLimitFile);
    }
    
    if ($requestCount >= 20) {
        http_response_code(429);
        echo json_encode([
            'success' => false, 
            'error' => 'Límite diario alcanzado (20 preguntas). Suscribite a Premium para preguntas ilimitadas.',
            'error_en' => 'Daily limit reached (20 questions). Subscribe to Premium for unlimited questions.',
            'error_pt' => 'Limite diário atingido (20 perguntas). Assine Premium para perguntas ilimitadas.',
            'remaining' => 0,
            'limit' => 20,
            'is_premium' => false
        ]);
        exit;
    }
    
    // Increment counter
    file_put_contents($rateLimitFile, $requestCount + 1);
}

/**
 * Get theory context based on exercise title/category
 * This helps the AI understand what concept the student should be applying
 */
function getTheoryContext($exerciseTitle, $language) {
    $title = strtolower($exerciseTitle);
    $contexts = [];
    
    // SQL Concepts
    if ($language === 'sql') {
        if (strpos($title, 'window') !== false || strpos($title, 'row_number') !== false || strpos($title, 'rank') !== false || strpos($title, 'lag') !== false || strpos($title, 'lead') !== false) {
            $contexts[] = "TEORÍA: Window Functions permiten hacer cálculos sobre un conjunto de filas relacionadas sin agrupar. Sintaxis: FUNCIÓN() OVER (PARTITION BY col ORDER BY col). ROW_NUMBER numera filas, RANK/DENSE_RANK para rankings, LAG/LEAD para acceder a filas anteriores/siguientes.";
        }
        if (strpos($title, 'cte') !== false || strpos($title, 'with') !== false || strpos($title, 'recursiv') !== false) {
            $contexts[] = "TEORÍA: CTEs (Common Table Expressions) se definen con WITH nombre AS (SELECT...). Permiten crear consultas temporales reutilizables. Las CTEs recursivas usan UNION ALL para iterar.";
        }
        if (strpos($title, 'join') !== false || strpos($title, 'inner') !== false || strpos($title, 'left') !== false || strpos($title, 'right') !== false) {
            $contexts[] = "TEORÍA: JOINs combinan tablas. INNER JOIN retorna solo matches. LEFT JOIN retorna todo de la izquierda + matches. RIGHT JOIN lo opuesto. FULL JOIN retorna todo de ambas.";
        }
        if (strpos($title, 'group') !== false || strpos($title, 'having') !== false || strpos($title, 'aggregat') !== false) {
            $contexts[] = "TEORÍA: GROUP BY agrupa filas para aplicar funciones de agregación (COUNT, SUM, AVG, MIN, MAX). HAVING filtra grupos (después de agrupar), WHERE filtra filas (antes de agrupar).";
        }
        if (strpos($title, 'subquer') !== false || strpos($title, 'exist') !== false || strpos($title, 'in (select') !== false) {
            $contexts[] = "TEORÍA: Subqueries son SELECT dentro de otro SELECT. Pueden ir en WHERE, FROM o SELECT. EXISTS verifica si hay resultados. IN compara contra una lista de valores.";
        }
        if (strpos($title, 'dbt') !== false || strpos($title, 'ref') !== false || strpos($title, 'source') !== false) {
            $contexts[] = "TEORÍA: dbt transforma datos en el warehouse. ref() referencia otros modelos, source() referencia tablas raw. Los modelos incrementales procesan solo datos nuevos con is_incremental().";
        }
        if (strpos($title, 'interview') !== false || strpos($title, 'entrevista') !== false) {
            $contexts[] = "TEORÍA: Preguntas de entrevista suelen combinar múltiples conceptos. Pensá paso a paso: 1) ¿Qué tablas necesito? 2) ¿Cómo las uno? 3) ¿Qué filtros aplico? 4) ¿Necesito agrupar?";
        }
    }
    
    // Python Concepts
    if ($language === 'python') {
        if (strpos($title, 'pandas') !== false || strpos($title, 'dataframe') !== false || strpos($title, 'df') !== false) {
            $contexts[] = "TEORÍA: Pandas usa DataFrames (tablas) y Series (columnas). Métodos clave: df.groupby(), df.merge(), df.apply(), df.fillna(), df.dropna(), df['col'].value_counts().";
        }
        if (strpos($title, 'etl') !== false || strpos($title, 'extract') !== false || strpos($title, 'transform') !== false) {
            $contexts[] = "TEORÍA: ETL = Extract (leer datos), Transform (limpiar/transformar), Load (guardar). Siempre validar datos de entrada, manejar errores, y loggear el proceso.";
        }
        if (strpos($title, 'airflow') !== false || strpos($title, 'dag') !== false || strpos($title, 'task') !== false || strpos($title, 'operator') !== false) {
            $contexts[] = "TEORÍA: Airflow orquesta pipelines con DAGs (grafos de tareas). Tasks se definen con Operators (PythonOperator, BashOperator). XCom pasa datos entre tasks. Sensors esperan condiciones.";
        }
        if (strpos($title, 'api') !== false || strpos($title, 'request') !== false || strpos($title, 'json') !== false) {
            $contexts[] = "TEORÍA: APIs REST usan requests.get()/post(). Siempre verificar response.status_code == 200. Parsear JSON con response.json(). Manejar errores con try/except.";
        }
        if (strpos($title, 'clean') !== false || strpos($title, 'null') !== false || strpos($title, 'duplicat') !== false) {
            $contexts[] = "TEORÍA: Limpieza de datos: df.isnull().sum() para ver nulos, df.dropna() o df.fillna() para manejarlos. df.drop_duplicates() elimina duplicados. df.dtypes verifica tipos.";
        }
        if (strpos($title, 'loop') !== false || strpos($title, 'comprehen') !== false || strpos($title, 'list') !== false) {
            $contexts[] = "TEORÍA: List comprehensions son más pythónicas que loops: [x for x in lista if condicion]. Para DataFrames, preferir métodos vectorizados (apply, map) sobre loops.";
        }
    }
    
    // Project/General Concepts
    if ($language === 'general' || $language === 'project') {
        $contexts[] = "TEORÍA: Los proyectos integran múltiples habilidades. Enfocate en: 1) Entender el problema, 2) Diseñar la solución paso a paso, 3) Implementar por partes, 4) Testear cada parte.";
        if (strpos(strtolower($title), 'etl') !== false || strpos(strtolower($title), 'pipeline') !== false) {
            $contexts[] = "TEORÍA: Un pipeline ETL tiene 3 fases: Extract (obtener datos), Transform (limpiar y procesar), Load (guardar). Diseñá cada fase por separado.";
        }
        if (strpos(strtolower($title), 'api') !== false || strpos(strtolower($title), 'data') !== false) {
            $contexts[] = "TEORÍA: Al trabajar con APIs, siempre: validar respuestas, manejar errores, implementar reintentos, y loggear el proceso.";
        }
        if (strpos(strtolower($title), 'warehouse') !== false || strpos(strtolower($title), 'modelo') !== false) {
            $contexts[] = "TEORÍA: Data Warehouse sigue Star Schema: tablas de hechos (métricas) + dimensiones (contexto). Pensá qué métricas querés y qué contexto necesitás.";
        }
    }

    if (empty($contexts)) {
        $langText = $language === 'general' ? 'Data Engineering' : $language;
        return "TEORÍA: Este ejercicio evalúa fundamentos de {$langText}. Recordá siempre: leer bien la consigna, pensar el problema paso a paso, y probar con casos simples primero.";
    }
    
    return implode("\n", $contexts);
}

// Build the prompt with precise instructions
$languageInstructions = [
    'es' => 'Responde en español de forma clara y concisa.',
    'en' => 'Respond in English clearly and concisely.',
    'pt' => 'Responda em português de forma clara e concisa.'
];

$langInstruction = $languageInstructions[$userLanguage] ?? $languageInstructions['es'];

// Get theory context based on exercise category
$theoryContext = getTheoryContext($exerciseTitle, $language);

// Multi-language system prompts
$systemPrompts = [
    'es' => [
        'intro' => 'Eres "Saurio" 🦖, el tutor amigable de Data Engineering de la Academia Ian Saura. Tu rol es ayudar a estudiantes con ejercicios Y orientarlos en la plataforma.',
        'platformGuide' => '📚 GUÍA DE LA PLATAFORMA (puedes responder sobre esto)',
        'structure' => 'ESTRUCTURA DE LA ACADEMIA',
        'dashboard' => 'Dashboard: Tu centro de control. Muestra tu progreso, XP, racha y logros.',
        'sqlPractice' => 'Práctica SQL: 51+ ejercicios desde básico hasta avanzado (Window Functions, CTEs, JOINs, dbt)',
        'pythonPractice' => 'Práctica Python: 21+ ejercicios (Pandas, ETL, Airflow, APIs)',
        'roadmap' => 'Roadmap: Guía estructurada en 3 niveles para tu carrera',
        'projects' => 'Proyectos: +25 proyectos guiados para tu portfolio',
        'datasets' => 'Datasets: Generador de datos realistas para practicar',
        'videos' => 'Videos: Grabaciones del bootcamp (8 semanas de contenido)',
        'whereToStart' => '¿POR DÓNDE EMPEZAR?',
        'startNothing' => 'Si no sabés NADA de datos: Empezá por el Roadmap Nivel 0, luego Práctica SQL (categoría Fundamentals)',
        'startBasicSql' => 'Si ya sabés SQL básico: Andá directo a Práctica SQL, categoría "Aggregations" o "JOINs"',
        'startPython' => 'Si querés Python: Práctica Python, empezá por "Pandas Basics"',
        'startPortfolio' => 'Si querés armar portfolio: Ve a Proyectos y elegí uno de nivel "Principiante"',
        'gamification' => 'SISTEMA DE GAMIFICACIÓN',
        'xp' => 'XP: Ganás puntos completando ejercicios y proyectos',
        'coins' => 'DataCoins: Moneda virtual para la tienda',
        'streak' => 'Racha: Días consecutivos de práctica',
        'leaderboard' => 'Leaderboard: Competí con otros estudiantes',
        'levels' => 'NIVELES DEL ROADMAP',
        'level0' => 'Nivel 0: Fundamentos (principiantes absolutos)',
        'level1' => 'Nivel 1: Conseguir tu primer trabajo (SQL, Python, AWS basics)',
        'level2' => 'Nivel 2: De Entry a Jr/SSR (performance, arquitecturas)',
        'level3' => 'Nivel 3: Ser Senior (liderazgo técnico, decisiones arquitectónicas)',
        'currentContext' => '🎯 CONTEXTO DEL EJERCICIO ACTUAL',
        'specialization' => 'Especialización actual',
        'responseRules' => '📋 REGLAS DE RESPUESTA',
        'exerciseRules' => 'PARA PREGUNTAS SOBRE EJERCICIOS',
        'rule1' => 'NUNCA des la solución completa ni el código exacto',
        'rule2' => 'Da pistas progresivas que guíen al pensamiento del estudiante',
        'rule3' => 'Si el código tiene errores, indica el TIPO de error sin corregirlo',
        'rule4' => 'Explica el CONCEPTO teórico relevante',
        'rule5' => 'Sugiere qué documentación investigar',
        'rule6' => 'Máximo 3-4 oraciones, sé conciso',
        'rule7' => 'Usa ejemplos genéricos, NUNCA la solución exacta',
        'platformRules' => 'PARA PREGUNTAS SOBRE LA PLATAFORMA',
        'platformRule1' => 'Respondé amablemente sobre dónde encontrar cosas',
        'platformRule2' => 'Sugerí por dónde empezar según el nivel del estudiante',
        'platformRule3' => 'Explicá cómo funciona el sistema de XP/gamificación',
        'platformRule4' => 'Guiá sobre qué sección usar para cada objetivo',
        'personality' => 'PERSONALIDAD',
        'personality1' => 'Sé amigable y motivador 🦖',
        'personality2' => 'Usá emojis ocasionalmente',
        'personality3' => 'Recordá que están aprendiendo',
        'offTopic' => '¡Ey! Solo puedo ayudarte con Data Engineering y la plataforma. ¿Qué duda tenés sobre el ejercicio o dónde encontrar algo? 🦖',
        'projectsDE' => 'proyectos de Data Engineering'
    ],
    'en' => [
        'intro' => 'You are "Saurio" 🦖, the friendly Data Engineering tutor from Ian Saura Academy. Your role is to help students with exercises AND guide them through the platform.',
        'platformGuide' => '📚 PLATFORM GUIDE (you can answer about this)',
        'structure' => 'ACADEMY STRUCTURE',
        'dashboard' => 'Dashboard: Your control center. Shows your progress, XP, streak and achievements.',
        'sqlPractice' => 'SQL Practice: 51+ exercises from basic to advanced (Window Functions, CTEs, JOINs, dbt)',
        'pythonPractice' => 'Python Practice: 21+ exercises (Pandas, ETL, Airflow, APIs)',
        'roadmap' => 'Roadmap: Structured guide in 3 levels for your career',
        'projects' => 'Projects: +25 guided projects for your portfolio',
        'datasets' => 'Datasets: Realistic data generator for practice',
        'videos' => 'Videos: Bootcamp recordings (8 weeks of content)',
        'whereToStart' => 'WHERE TO START?',
        'startNothing' => 'If you know NOTHING about data: Start with Roadmap Level 0, then SQL Practice (Fundamentals category)',
        'startBasicSql' => 'If you know basic SQL: Go directly to SQL Practice, "Aggregations" or "JOINs" category',
        'startPython' => 'If you want Python: Python Practice, start with "Pandas Basics"',
        'startPortfolio' => 'If you want to build portfolio: Go to Projects and choose a "Beginner" level one',
        'gamification' => 'GAMIFICATION SYSTEM',
        'xp' => 'XP: Earn points by completing exercises and projects',
        'coins' => 'DataCoins: Virtual currency for the store',
        'streak' => 'Streak: Consecutive days of practice',
        'leaderboard' => 'Leaderboard: Compete with other students',
        'levels' => 'ROADMAP LEVELS',
        'level0' => 'Level 0: Fundamentals (absolute beginners)',
        'level1' => 'Level 1: Get your first job (SQL, Python, AWS basics)',
        'level2' => 'Level 2: From Entry to Jr/SSR (performance, architectures)',
        'level3' => 'Level 3: Become Senior (technical leadership, architectural decisions)',
        'currentContext' => '🎯 CURRENT EXERCISE CONTEXT',
        'specialization' => 'Current specialization',
        'responseRules' => '📋 RESPONSE RULES',
        'exerciseRules' => 'FOR EXERCISE QUESTIONS',
        'rule1' => 'NEVER give the complete solution or exact code',
        'rule2' => 'Give progressive hints that guide the student\'s thinking',
        'rule3' => 'If the code has errors, indicate the TYPE of error without fixing it',
        'rule4' => 'Explain the relevant THEORETICAL CONCEPT',
        'rule5' => 'Suggest what documentation to research',
        'rule6' => 'Maximum 3-4 sentences, be concise',
        'rule7' => 'Use generic examples, NEVER the exact solution',
        'platformRules' => 'FOR PLATFORM QUESTIONS',
        'platformRule1' => 'Answer kindly about where to find things',
        'platformRule2' => 'Suggest where to start based on the student\'s level',
        'platformRule3' => 'Explain how the XP/gamification system works',
        'platformRule4' => 'Guide on which section to use for each goal',
        'personality' => 'PERSONALITY',
        'personality1' => 'Be friendly and motivating 🦖',
        'personality2' => 'Use emojis occasionally',
        'personality3' => 'Remember they are learning',
        'offTopic' => 'Hey! I can only help you with Data Engineering and the platform. What question do you have about the exercise or where to find something? 🦖',
        'projectsDE' => 'Data Engineering projects'
    ],
    'pt' => [
        'intro' => 'Você é "Saurio" 🦖, o tutor amigável de Data Engineering da Academia Ian Saura. Seu papel é ajudar os estudantes com exercícios E orientá-los na plataforma.',
        'platformGuide' => '📚 GUIA DA PLATAFORMA (você pode responder sobre isso)',
        'structure' => 'ESTRUTURA DA ACADEMIA',
        'dashboard' => 'Dashboard: Seu centro de controle. Mostra seu progresso, XP, sequência e conquistas.',
        'sqlPractice' => 'Prática SQL: 51+ exercícios do básico ao avançado (Window Functions, CTEs, JOINs, dbt)',
        'pythonPractice' => 'Prática Python: 21+ exercícios (Pandas, ETL, Airflow, APIs)',
        'roadmap' => 'Roadmap: Guia estruturado em 3 níveis para sua carreira',
        'projects' => 'Projetos: +25 projetos guiados para seu portfólio',
        'datasets' => 'Datasets: Gerador de dados realistas para praticar',
        'videos' => 'Vídeos: Gravações do bootcamp (8 semanas de conteúdo)',
        'whereToStart' => 'POR ONDE COMEÇAR?',
        'startNothing' => 'Se você não sabe NADA de dados: Comece pelo Roadmap Nível 0, depois Prática SQL (categoria Fundamentals)',
        'startBasicSql' => 'Se já sabe SQL básico: Vá direto para Prática SQL, categoria "Aggregations" ou "JOINs"',
        'startPython' => 'Se quer Python: Prática Python, comece por "Pandas Basics"',
        'startPortfolio' => 'Se quer montar portfólio: Vá em Projetos e escolha um de nível "Iniciante"',
        'gamification' => 'SISTEMA DE GAMIFICAÇÃO',
        'xp' => 'XP: Ganhe pontos completando exercícios e projetos',
        'coins' => 'DataCoins: Moeda virtual para a loja',
        'streak' => 'Sequência: Dias consecutivos de prática',
        'leaderboard' => 'Leaderboard: Compita com outros estudantes',
        'levels' => 'NÍVEIS DO ROADMAP',
        'level0' => 'Nível 0: Fundamentos (iniciantes absolutos)',
        'level1' => 'Nível 1: Conseguir seu primeiro emprego (SQL, Python, AWS basics)',
        'level2' => 'Nível 2: De Entry a Jr/SSR (performance, arquiteturas)',
        'level3' => 'Nível 3: Ser Sênior (liderança técnica, decisões arquitetônicas)',
        'currentContext' => '🎯 CONTEXTO DO EXERCÍCIO ATUAL',
        'specialization' => 'Especialização atual',
        'responseRules' => '📋 REGRAS DE RESPOSTA',
        'exerciseRules' => 'PARA PERGUNTAS SOBRE EXERCÍCIOS',
        'rule1' => 'NUNCA dê a solução completa nem o código exato',
        'rule2' => 'Dê dicas progressivas que guiem o pensamento do estudante',
        'rule3' => 'Se o código tiver erros, indique o TIPO de erro sem corrigir',
        'rule4' => 'Explique o CONCEITO teórico relevante',
        'rule5' => 'Sugira qual documentação pesquisar',
        'rule6' => 'Máximo 3-4 frases, seja conciso',
        'rule7' => 'Use exemplos genéricos, NUNCA a solução exata',
        'platformRules' => 'PARA PERGUNTAS SOBRE A PLATAFORMA',
        'platformRule1' => 'Responda gentilmente sobre onde encontrar coisas',
        'platformRule2' => 'Sugira por onde começar baseado no nível do estudante',
        'platformRule3' => 'Explique como funciona o sistema de XP/gamificação',
        'platformRule4' => 'Guie sobre qual seção usar para cada objetivo',
        'personality' => 'PERSONALIDADE',
        'personality1' => 'Seja amigável e motivador 🦖',
        'personality2' => 'Use emojis ocasionalmente',
        'personality3' => 'Lembre-se que eles estão aprendendo',
        'offTopic' => 'Ei! Só posso te ajudar com Data Engineering e a plataforma. Qual dúvida você tem sobre o exercício ou onde encontrar algo? 🦖',
        'projectsDE' => 'projetos de Data Engineering'
    ]
];

$p = $systemPrompts[$userLanguage] ?? $systemPrompts['es'];
$specialization = ($language === 'general' || $language === 'project') ? $p['projectsDE'] : $language;

$systemPrompt = <<<PROMPT
{$p['intro']}

═══════════════════════════════════════════
{$p['platformGuide']}
═══════════════════════════════════════════

{$p['structure']}:
- **{$p['dashboard']}**
- **{$p['sqlPractice']}**
- **{$p['pythonPractice']}**
- **{$p['roadmap']}**
- **{$p['projects']}**
- **{$p['datasets']}**
- **{$p['videos']}**

{$p['whereToStart']}
- {$p['startNothing']}
- {$p['startBasicSql']}
- {$p['startPython']}
- {$p['startPortfolio']}

{$p['gamification']}:
- {$p['xp']}
- {$p['coins']}
- {$p['streak']}
- {$p['leaderboard']}

{$p['levels']}:
- {$p['level0']}
- {$p['level1']}
- {$p['level2']}
- {$p['level3']}

═══════════════════════════════════════════
{$p['currentContext']}
═══════════════════════════════════════════

{$p['specialization']}: {$specialization}

{$theoryContext}

═══════════════════════════════════════════
{$p['responseRules']}
═══════════════════════════════════════════

{$p['exerciseRules']}:
1. {$p['rule1']}
2. {$p['rule2']}
3. {$p['rule3']}
4. {$p['rule4']}
5. {$p['rule5']}
6. {$p['rule6']}
7. {$p['rule7']}

{$p['platformRules']}:
- {$p['platformRule1']}
- {$p['platformRule2']}
- {$p['platformRule3']}
- {$p['platformRule4']}

{$p['personality']}:
- {$p['personality1']}
- {$p['personality2']}
- {$p['personality3']}
- {$p['offTopic']}

{$langInstruction}
PROMPT;

$userPrompt = "EJERCICIO: {$exerciseTitle}\n\n";

if (!empty($exerciseDescription)) {
    $userPrompt .= "DESCRIPCIÓN: {$exerciseDescription}\n\n";
}

if (!empty($code)) {
    $userPrompt .= "CÓDIGO DEL ESTUDIANTE:\n```{$language}\n{$code}\n```\n\n";
}

$userPrompt .= "PREGUNTA DEL ESTUDIANTE: {$question}";

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
        'max_tokens' => 300,
        'temperature' => 0.7,
        'top_p' => 0.9
    ])
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    error_log("AI Tutor cURL error: " . $curlError);
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error connecting to AI service']);
    exit;
}

if ($httpCode !== 200) {
    error_log("AI Tutor API error: HTTP $httpCode - $response");
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'AI service temporarily unavailable']);
    exit;
}

$data = json_decode($response, true);
$aiResponse = $data['choices'][0]['message']['content'] ?? '';

if (empty($aiResponse)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Empty response from AI']);
    exit;
}

// Calculate remaining requests for free users
$remaining = null;
if (!$isPremium) {
    $remaining = 20 - ($requestCount + 1);
}

// Log usage (for analytics)
try {
    $logFile = __DIR__ . '/../logs/ai-tutor.log';
    $logDir = dirname($logFile);
    if (!is_dir($logDir)) {
        mkdir($logDir, 0755, true);
    }
    $logEntry = date('Y-m-d H:i:s') . " | " . ($isPremium ? 'PREMIUM' : 'FREE') . " | {$email} | {$language} | {$exerciseTitle}\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
} catch (Exception $e) {
    // Ignore logging errors
}

echo json_encode([
    'success' => true,
    'response' => $aiResponse,
    'is_premium' => $isPremium,
    'remaining' => $remaining,
    'limit' => $isPremium ? null : 20
]);

