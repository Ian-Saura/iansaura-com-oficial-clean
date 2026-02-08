<?php
/**
 * API de Datasets para Suscriptores Premium
 * 
 * REQUIERE EMAIL + API KEY (visibles en /members -> Configuración)
 * 
 * Uso:
 * GET /api/datasets.php?email=tu@email.com&key=TU_API_KEY&type=ecommerce&rows=1000
 * 
 * Alternativa con token temporal:
 * GET /api/datasets.php?token=TOKEN_GENERADO&type=ecommerce&rows=1000
 * 
 * Tipos disponibles: ecommerce, logs, finance, hr, iot, streaming
 */

// CORS - Restrictive (only iansaura.com) - datasets require authentication
require_once __DIR__ . '/middleware/cors.php';
applyCors();

// Rate limiting - 100 requests per hour per IP (generous for API usage)
$clientIP = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/datasets_rate_' . md5($clientIP);
$now = time();
$requests = [];

if (file_exists($rateLimitFile)) {
    $data = json_decode(file_get_contents($rateLimitFile), true);
    if ($data && is_array($data)) {
        $requests = array_filter($data, function($timestamp) use ($now) {
            return ($now - $timestamp) < 3600;
        });
    }
}

if (count($requests) >= 100) {
    header('Content-Type: application/json');
    http_response_code(429);
    header('Retry-After: 3600');
    echo json_encode(['error' => 'Rate limit exceeded. Max 100 requests per hour.']);
    exit();
}

$requests[] = $now;
file_put_contents($rateLimitFile, json_encode(array_values($requests)), LOCK_EX);

// ============================================
// AUTENTICACIÓN - Requiere EMAIL + API_KEY o TOKEN
// ============================================
$email = strtolower(trim($_GET['email'] ?? ''));
$apiKey = $_GET['key'] ?? '';
$token = $_GET['token'] ?? '';

// También aceptar token en header Authorization (para uso externo)
if (empty($token)) {
    $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/Bearer\s+(.+)/i', $authHeader, $matches)) {
        $token = $matches[1];
    }
}

// Requiere (email + key) O token
if ((empty($email) || empty($apiKey)) && empty($token)) {
    header('Content-Type: application/json');
    http_response_code(401);
    echo json_encode([
        'error' => 'Autenticación requerida',
        'usage' => '?email=tu@email.com&key=TU_API_KEY&type=ecommerce&rows=1000',
        'help' => 'Encontrá tu API Key en https://iansaura.com/members -> Configuración',
        'example' => 'https://iansaura.com/api/datasets.php?email=usuario@ejemplo.com&key=ds_abc123...&type=ecommerce&rows=500'
    ]);
    exit();
}

// Cargar config
try {
    require_once __DIR__ . '/secure-config.php';
} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => 'Config error: ' . $e->getMessage()]);
    exit();
}

/**
 * Genera una API key única y determinística basada en el email
 * El usuario siempre tendrá la misma key mientras sea suscriptor
 */
function generateApiKeyForEmail($email) {
    // Load secret from secure config - never hardcode
    $secret = defined('DATASETS_API_SECRET') ? DATASETS_API_SECRET : (getenv('DATASETS_API_SECRET') ?: '');
    if (empty($secret)) {
        error_log('WARNING: DATASETS_API_SECRET not configured');
        return '';
    }
    $hash = hash('sha256', strtolower($email) . $secret);
    return 'ds_' . substr($hash, 0, 32);
}

// Validar autenticación
$authenticated = false;
$userEmail = '';

try {
        $db = getSecureDBConnection();
    
    // Opción 1: Validar por email + API key
    if (!empty($email) && !empty($apiKey)) {
        // Generar la key esperada para este email
        $expectedKey = generateApiKeyForEmail($email);
        
        // Verificar que la key coincida
        if ($apiKey === $expectedKey) {
            // Verificar que sea suscriptor activo
            $stmt = $db->prepare("
                SELECT id, email, status FROM subscribers 
                WHERE LOWER(email) = ? 
                AND (status = 'active' OR status = 'trial' OR (subscription_end IS NOT NULL AND subscription_end > NOW()))
            ");
            $stmt->execute([$email]);
            $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($subscriber) {
                $authenticated = true;
                $userEmail = $subscriber['email'];
            }
            
            // También verificar email secundario en subscribers
            if (!$authenticated) {
                $stmt = $db->prepare("
                    SELECT id, email, status FROM subscribers 
                    WHERE LOWER(secondary_email) = ? 
                    AND (status = 'active' OR status = 'trial' OR (subscription_end IS NOT NULL AND subscription_end > NOW()))
                ");
                $stmt->execute([$email]);
                $subscriber = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($subscriber) {
                    $authenticated = true;
                    $userEmail = $subscriber['email'];
                }
            }
        } else {
            // API key incorrecta
            header('Content-Type: application/json');
            http_response_code(401);
            echo json_encode([
                'error' => 'API Key inválida para este email',
                'help' => 'Verificá tu API Key en https://iansaura.com/members -> Configuración'
            ]);
            exit();
        }
    }
    
    // Opción 2: Validar por token temporal (para scripts)
    if (!$authenticated && !empty($token)) {
        $token = preg_replace('/^Bearer\s+/i', '', $token);
        
        $stmt = $db->prepare("
            SELECT id, email, expires_at 
            FROM api_tokens 
            WHERE token = ? AND expires_at > NOW()
        ");
        $stmt->execute([$token]);
        $tokenData = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($tokenData) {
                $authenticated = true;
                $userEmail = $tokenData['email'];
                
            // Actualizar uso del token
            $stmt = $db->prepare("UPDATE api_tokens SET last_used_at = NOW(), use_count = use_count + 1 WHERE id = ?");
                $stmt->execute([$tokenData['id']]);
        }
    }
} catch (Exception $e) {
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode(['error' => 'Auth error: ' . $e->getMessage()]);
    exit();
}

if (!$authenticated) {
    header('Content-Type: application/json');
    http_response_code(403);
    echo json_encode([
        'error' => 'Acceso denegado. Tu email no tiene suscripción activa.',
        'help' => 'Suscribite en https://iansaura.com/suscripcion para acceder a los datasets'
    ]);
    exit();
}

// ============================================
// RATE LIMITING (por usuario autenticado)
// ============================================
$maxRequestsPerHour = 100;
$rateLimitFile = sys_get_temp_dir() . '/dataset_rate_limit_' . md5($userEmail);

function checkDatasetRateLimit($file, $maxRequests) {
    $data = file_exists($file) ? json_decode(file_get_contents($file), true) : ['count' => 0, 'reset' => time() + 3600];
    
    if (time() > $data['reset']) {
        $data = ['count' => 0, 'reset' => time() + 3600];
    }
    
    if ($data['count'] >= $maxRequests) {
        return false;
    }
    
    $data['count']++;
    file_put_contents($file, json_encode($data));
    return true;
}

if (!checkDatasetRateLimit($rateLimitFile, $maxRequestsPerHour)) {
    header('Content-Type: application/json');
    http_response_code(429);
    echo json_encode(['error' => 'Rate limit exceeded. Max 100 requests per hour.']);
    exit();
}

// Parse request
$datasetType = isset($_GET['type']) ? strtolower($_GET['type']) : '';
$rows = isset($_GET['rows']) ? min(intval($_GET['rows']), 5000) : 100;
$format = isset($_GET['format']) ? strtolower($_GET['format']) : 'json';
$lang = isset($_GET['lang']) ? strtolower($_GET['lang']) : 'es'; // es, en, pt

// Validate language
if (!in_array($lang, ['es', 'en', 'pt'])) {
    $lang = 'es';
}

$validTypes = ['ecommerce', 'logs', 'finance', 'finanzas', 'hr', 'rrhh', 'iot', 'streaming'];

// Normalize type names
$typeMap = [
    'finanzas' => 'finance',
    'rrhh' => 'hr'
];
if (isset($typeMap[$datasetType])) {
    $datasetType = $typeMap[$datasetType];
}

if (!in_array($datasetType, ['ecommerce', 'logs', 'finance', 'hr', 'iot', 'streaming'])) {
    header('Content-Type: application/json');
    http_response_code(400);
    echo json_encode([
        'error' => 'Invalid dataset type',
        'valid_types' => ['ecommerce', 'logs', 'finance', 'hr', 'iot', 'streaming'],
        'usage' => 'GET /api/datasets.php?type=ecommerce&rows=100&format=json'
    ]);
    exit();
}

// Generate complete dataset with all tables (with language support)
$dataset = generateCompleteDataset($datasetType, $rows, $lang);

// Output based on format
if ($format === 'csv') {
    // For CSV, return a ZIP file with all tables
    header('Content-Type: application/zip');
    header('Content-Disposition: attachment; filename="' . $datasetType . '_dataset.zip"');
    
    $zip = new ZipArchive();
    $zipFile = tempnam(sys_get_temp_dir(), 'dataset_');
    
    if ($zip->open($zipFile, ZipArchive::CREATE) === TRUE) {
        foreach ($dataset['tables'] as $tableName => $tableData) {
            if (count($tableData) > 0) {
                $csvContent = arrayToCsv($tableData);
                $zip->addFromString($tableName . '.csv', $csvContent);
            }
        }
        $zip->close();
        
        readfile($zipFile);
        unlink($zipFile);
    } else {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create ZIP file']);
    }
} else {
    // JSON format
    header('Content-Type: application/json');
    echo json_encode([
        'dataset_type' => $datasetType,
        'generated_at' => date('c'),
        'description' => $dataset['description'],
        'tables' => $dataset['tables'],
        'schema' => $dataset['schema'],
        'relationships' => $dataset['relationships']
    ], JSON_PRETTY_PRINT);
}

// ============================================
// HELPER FUNCTIONS
// ============================================
function arrayToCsv($data) {
    if (empty($data)) return '';
    
    $output = fopen('php://temp', 'r+');
    fputcsv($output, array_keys($data[0]));
    foreach ($data as $row) {
        fputcsv($output, $row);
    }
    rewind($output);
    $csv = stream_get_contents($output);
    fclose($output);
    return $csv;
}

function randomDate($start, $end) {
    $startTs = strtotime($start);
    $endTs = strtotime($end);
    $randomTs = rand($startTs, $endTs);
    return date('Y-m-d', $randomTs);
}

function randomDateTime($start, $end) {
    $startTs = strtotime($start);
    $endTs = strtotime($end);
    $randomTs = rand($startTs, $endTs);
    return date('Y-m-d H:i:s', $randomTs);
}

// ============================================
// TRANSLATED DATA ARRAYS
// ============================================
function getTranslatedData($lang) {
    $translations = [
        'es' => [
            // Categories
            'categories' => ['Electrónica', 'Ropa', 'Hogar', 'Deportes', 'Libros', 'Juguetes', 'Belleza', 'Alimentos', 'Jardín', 'Automotriz'],
            'category_desc' => 'Productos de',
            // Brands
            'countries' => ['USA', 'China', 'Alemania', 'Japón', 'Argentina', 'Brasil'],
            // Suppliers
            'suppliers' => ['Distribuidora Norte', 'Importadora Sur', 'Mayorista Central', 'Logística Express', 'Proveedores Unidos', 'Global Supply', 'FastImport', 'QualitySource'],
            'contact_names' => ['Juan Pérez', 'María García', 'Carlos López', 'Ana Martínez'],
            // Warehouses
            'warehouse_name' => 'Depósito',
            'manager_names' => ['Roberto Sánchez', 'Laura Torres', 'Diego Fernández', 'Sofía Ramírez', 'Martín González'],
            // Products
            'product_prefixes' => ['Super', 'Ultra', 'Pro', 'Max', 'Mini', 'Mega', 'Smart', 'Premium', 'Básico', 'Elite'],
            'product_types' => ['Widget', 'Gadget', 'Dispositivo', 'Herramienta', 'Kit', 'Set', 'Pack', 'Artículo', 'Producto', 'Equipo'],
            'product_desc' => 'Descripción detallada del producto',
            // Customers
            'first_names' => ['Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofía', 'Martín', 'Lucía', 'Gabriel', 'Valentina', 'Lucas', 'Camila', 'Mateo'],
            'last_names' => ['García', 'Rodríguez', 'López', 'Martínez', 'González', 'Fernández', 'Pérez', 'Sánchez', 'Ramírez', 'Torres'],
            'cities' => ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata', 'Tucumán', 'Salta', 'Santa Fe', 'Neuquén'],
            'customer_countries' => ['Argentina', 'Argentina', 'Argentina', 'Chile', 'Uruguay', 'México', 'Colombia', 'Perú'],
            // Promotions
            'promo_name' => 'Promoción',
            // Orders
            'order_statuses' => ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
            // Payments
            'payment_statuses' => ['completado', 'pendiente', 'fallido', 'reembolsado'],
            // Reviews
            'review_titles' => ['Excelente producto', 'Muy bueno', 'Cumple expectativas', 'Buena calidad', 'Recomendado', 'Satisfecho', 'Podría mejorar', 'No tan bueno'],
            'review_comments' => [
                'Superó mis expectativas, lo recomiendo totalmente.',
                'Muy buena calidad por el precio.',
                'Llegó a tiempo y en perfecto estado.',
                'Cumple con lo prometido.',
                'Excelente relación calidad-precio.',
                'El producto es correcto pero la entrega tardó.',
                'Bueno pero esperaba un poco más.',
                'No cumplió mis expectativas.'
            ],
            // HR
            'departments' => ['Ingeniería', 'Ventas', 'Marketing', 'Recursos Humanos', 'Finanzas', 'Operaciones', 'Legal', 'Soporte'],
            'positions' => ['Analista', 'Desarrollador', 'Gerente', 'Director', 'Especialista', 'Coordinador', 'Asistente', 'Consultor'],
            'contract_types' => ['tiempo_completo', 'medio_tiempo', 'contrato', 'pasantía'],
            'benefit_types' => ['salud', 'dental', 'visión', 'retiro', 'seguro_vida'],
            'time_off_types' => ['vacaciones', 'enfermedad', 'personal', 'maternidad'],
            'time_off_statuses' => ['pendiente', 'aprobado', 'rechazado'],
            'review_types' => ['anual', 'trimestral', 'promoción'],
            'goal_statuses' => ['no_iniciado', 'en_progreso', 'completado', 'cancelado'],
            'training_types' => ['en_línea', 'presencial', 'híbrido'],
            'job_statuses' => ['abierto', 'cerrado', 'en_pausa'],
            'candidate_statuses' => ['aplicado', 'en_revisión', 'entrevista', 'oferta', 'contratado', 'rechazado'],
            // IoT
            'sensor_types' => ['temperatura', 'humedad', 'presión', 'vibración', 'flujo', 'nivel', 'velocidad'],
            'alert_severities' => ['info', 'advertencia', 'crítico'],
            'maintenance_types' => ['preventivo', 'correctivo', 'predictivo'],
            'defect_types' => ['dimensional', 'visual', 'funcional', 'material'],
            // Streaming
            'genres' => ['Acción', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficción', 'Romance', 'Documental', 'Animación'],
            'content_types' => ['película', 'serie', 'documental', 'especial'],
            'subscription_plans' => ['Básico', 'Estándar', 'Premium'],
            'device_types' => ['móvil', 'escritorio', 'TV', 'tablet'],
            // Logs
            'log_levels' => ['info', 'advertencia', 'error', 'debug'],
            'services' => ['api-gateway', 'auth-service', 'user-service', 'payment-service', 'notification-service', 'analytics-service'],
            'deploy_statuses' => ['exitoso', 'fallido', 'en_progreso', 'revertido'],
            'incident_statuses' => ['abierto', 'investigando', 'resuelto', 'cerrado'],
        ],
        'en' => [
            // Categories
            'categories' => ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Toys', 'Beauty', 'Food', 'Garden', 'Automotive'],
            'category_desc' => 'Products in',
            // Brands
            'countries' => ['USA', 'China', 'Germany', 'Japan', 'Argentina', 'Brazil'],
            // Suppliers
            'suppliers' => ['North Distributor', 'South Importer', 'Central Wholesale', 'Express Logistics', 'United Providers', 'Global Supply', 'FastImport', 'QualitySource'],
            'contact_names' => ['John Smith', 'Mary Johnson', 'Charles Wilson', 'Anna Brown'],
            // Warehouses
            'warehouse_name' => 'Warehouse',
            'manager_names' => ['Robert Smith', 'Laura Johnson', 'David Williams', 'Sophie Brown', 'Martin Davis'],
            // Products
            'product_prefixes' => ['Super', 'Ultra', 'Pro', 'Max', 'Mini', 'Mega', 'Smart', 'Premium', 'Basic', 'Elite'],
            'product_types' => ['Widget', 'Gadget', 'Device', 'Tool', 'Kit', 'Set', 'Pack', 'Item', 'Product', 'Gear'],
            'product_desc' => 'Detailed description of product',
            // Customers
            'first_names' => ['John', 'Mary', 'Charles', 'Anna', 'Peter', 'Laura', 'David', 'Sophie', 'Martin', 'Lucy', 'Gabriel', 'Valerie', 'Luke', 'Camilla', 'Matthew'],
            'last_names' => ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis', 'Miller', 'Wilson', 'Moore', 'Taylor'],
            'cities' => ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin'],
            'customer_countries' => ['USA', 'USA', 'USA', 'Canada', 'UK', 'Mexico', 'Germany', 'France'],
            // Promotions
            'promo_name' => 'Promotion',
            // Orders
            'order_statuses' => ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            // Payments
            'payment_statuses' => ['completed', 'pending', 'failed', 'refunded'],
            // Reviews
            'review_titles' => ['Excellent product', 'Very good', 'Meets expectations', 'Good quality', 'Recommended', 'Satisfied', 'Could be better', 'Not so good'],
            'review_comments' => [
                'Exceeded my expectations, highly recommend.',
                'Very good quality for the price.',
                'Arrived on time and in perfect condition.',
                'Does what it promises.',
                'Excellent value for money.',
                'Product is fine but delivery was slow.',
                'Good but expected a bit more.',
                'Did not meet my expectations.'
            ],
            // HR
            'departments' => ['Engineering', 'Sales', 'Marketing', 'Human Resources', 'Finance', 'Operations', 'Legal', 'Support'],
            'positions' => ['Analyst', 'Developer', 'Manager', 'Director', 'Specialist', 'Coordinator', 'Assistant', 'Consultant'],
            'contract_types' => ['full_time', 'part_time', 'contract', 'internship'],
            'benefit_types' => ['health', 'dental', 'vision', 'retirement', 'life_insurance'],
            'time_off_types' => ['vacation', 'sick', 'personal', 'maternity'],
            'time_off_statuses' => ['pending', 'approved', 'rejected'],
            'review_types' => ['annual', 'quarterly', 'promotion'],
            'goal_statuses' => ['not_started', 'in_progress', 'completed', 'cancelled'],
            'training_types' => ['online', 'in_person', 'hybrid'],
            'job_statuses' => ['open', 'closed', 'paused'],
            'candidate_statuses' => ['applied', 'reviewing', 'interview', 'offer', 'hired', 'rejected'],
            // IoT
            'sensor_types' => ['temperature', 'humidity', 'pressure', 'vibration', 'flow', 'level', 'speed'],
            'alert_severities' => ['info', 'warning', 'critical'],
            'maintenance_types' => ['preventive', 'corrective', 'predictive'],
            'defect_types' => ['dimensional', 'visual', 'functional', 'material'],
            // Streaming
            'genres' => ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Documentary', 'Animation'],
            'content_types' => ['movie', 'series', 'documentary', 'special'],
            'subscription_plans' => ['Basic', 'Standard', 'Premium'],
            'device_types' => ['mobile', 'desktop', 'TV', 'tablet'],
            // Logs
            'log_levels' => ['info', 'warning', 'error', 'debug'],
            'services' => ['api-gateway', 'auth-service', 'user-service', 'payment-service', 'notification-service', 'analytics-service'],
            'deploy_statuses' => ['success', 'failed', 'in_progress', 'rolled_back'],
            'incident_statuses' => ['open', 'investigating', 'resolved', 'closed'],
        ],
        'pt' => [
            // Categories
            'categories' => ['Eletrônicos', 'Roupas', 'Casa', 'Esportes', 'Livros', 'Brinquedos', 'Beleza', 'Alimentos', 'Jardim', 'Automotivo'],
            'category_desc' => 'Produtos de',
            // Brands
            'countries' => ['EUA', 'China', 'Alemanha', 'Japão', 'Argentina', 'Brasil'],
            // Suppliers
            'suppliers' => ['Distribuidora Norte', 'Importadora Sul', 'Atacadista Central', 'Logística Express', 'Fornecedores Unidos', 'Global Supply', 'FastImport', 'QualitySource'],
            'contact_names' => ['João Silva', 'Maria Santos', 'Carlos Oliveira', 'Ana Costa'],
            // Warehouses
            'warehouse_name' => 'Depósito',
            'manager_names' => ['Roberto Santos', 'Laura Silva', 'Diego Oliveira', 'Sofia Costa', 'Martim Pereira'],
            // Products
            'product_prefixes' => ['Super', 'Ultra', 'Pro', 'Max', 'Mini', 'Mega', 'Smart', 'Premium', 'Básico', 'Elite'],
            'product_types' => ['Widget', 'Gadget', 'Dispositivo', 'Ferramenta', 'Kit', 'Conjunto', 'Pacote', 'Artigo', 'Produto', 'Equipamento'],
            'product_desc' => 'Descrição detalhada do produto',
            // Customers
            'first_names' => ['João', 'Maria', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofia', 'Martim', 'Lúcia', 'Gabriel', 'Valentina', 'Lucas', 'Camila', 'Mateus'],
            'last_names' => ['Silva', 'Santos', 'Oliveira', 'Costa', 'Souza', 'Pereira', 'Lima', 'Carvalho', 'Almeida', 'Ferreira'],
            'cities' => ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Curitiba', 'Porto Alegre', 'Recife', 'Manaus'],
            'customer_countries' => ['Brasil', 'Brasil', 'Brasil', 'Portugal', 'Argentina', 'Chile', 'Uruguai', 'Paraguai'],
            // Promotions
            'promo_name' => 'Promoção',
            // Orders
            'order_statuses' => ['pendente', 'processando', 'enviado', 'entregue', 'cancelado'],
            // Payments
            'payment_statuses' => ['completado', 'pendente', 'falhou', 'reembolsado'],
            // Reviews
            'review_titles' => ['Excelente produto', 'Muito bom', 'Atende expectativas', 'Boa qualidade', 'Recomendado', 'Satisfeito', 'Poderia melhorar', 'Não tão bom'],
            'review_comments' => [
                'Superou minhas expectativas, recomendo totalmente.',
                'Muito boa qualidade pelo preço.',
                'Chegou no prazo e em perfeito estado.',
                'Cumpre o prometido.',
                'Excelente custo-benefício.',
                'Produto está ok mas a entrega demorou.',
                'Bom mas esperava um pouco mais.',
                'Não atendeu minhas expectativas.'
            ],
            // HR
            'departments' => ['Engenharia', 'Vendas', 'Marketing', 'Recursos Humanos', 'Finanças', 'Operações', 'Jurídico', 'Suporte'],
            'positions' => ['Analista', 'Desenvolvedor', 'Gerente', 'Diretor', 'Especialista', 'Coordenador', 'Assistente', 'Consultor'],
            'contract_types' => ['tempo_integral', 'meio_período', 'contrato', 'estágio'],
            'benefit_types' => ['saúde', 'dental', 'visão', 'aposentadoria', 'seguro_vida'],
            'time_off_types' => ['férias', 'doença', 'pessoal', 'maternidade'],
            'time_off_statuses' => ['pendente', 'aprovado', 'rejeitado'],
            'review_types' => ['anual', 'trimestral', 'promoção'],
            'goal_statuses' => ['não_iniciado', 'em_progresso', 'completado', 'cancelado'],
            'training_types' => ['online', 'presencial', 'híbrido'],
            'job_statuses' => ['aberto', 'fechado', 'pausado'],
            'candidate_statuses' => ['aplicou', 'em_revisão', 'entrevista', 'oferta', 'contratado', 'rejeitado'],
            // IoT
            'sensor_types' => ['temperatura', 'umidade', 'pressão', 'vibração', 'fluxo', 'nível', 'velocidade'],
            'alert_severities' => ['info', 'aviso', 'crítico'],
            'maintenance_types' => ['preventiva', 'corretiva', 'preditiva'],
            'defect_types' => ['dimensional', 'visual', 'funcional', 'material'],
            // Streaming
            'genres' => ['Ação', 'Comédia', 'Drama', 'Terror', 'Ficção Científica', 'Romance', 'Documentário', 'Animação'],
            'content_types' => ['filme', 'série', 'documentário', 'especial'],
            'subscription_plans' => ['Básico', 'Padrão', 'Premium'],
            'device_types' => ['móvel', 'desktop', 'TV', 'tablet'],
            // Logs
            'log_levels' => ['info', 'aviso', 'erro', 'debug'],
            'services' => ['api-gateway', 'auth-service', 'user-service', 'payment-service', 'notification-service', 'analytics-service'],
            'deploy_statuses' => ['sucesso', 'falhou', 'em_progresso', 'revertido'],
            'incident_statuses' => ['aberto', 'investigando', 'resolvido', 'fechado'],
        ]
    ];
    
    return $translations[$lang] ?? $translations['es'];
}

// ============================================
// DATASET GENERATORS
// ============================================
function generateCompleteDataset($type, $rows, $lang = 'es') {
    $t = getTranslatedData($lang);
    
    switch ($type) {
        case 'ecommerce':
            return generateEcommerceDataset($rows, $t);
        case 'logs':
            return generateLogsDataset($rows, $t);
        case 'finance':
            return generateFinanceDataset($rows, $t);
        case 'hr':
            return generateHRDataset($rows, $t);
        case 'iot':
            return generateIoTDataset($rows, $t);
        case 'streaming':
            return generateStreamingDataset($rows, $t);
        default:
            return ['tables' => [], 'schema' => [], 'relationships' => [], 'description' => ''];
    }
}

// ============================================
// E-COMMERCE DATASET - SISTEMA COMPLETO REALISTA
// ============================================
function generateEcommerceDataset($rows, $t) {
    $numCustomers = min(ceil($rows / 3), 500);
    $numProducts = min(ceil($rows / 5), 100);
    $numCategories = 10;
    $numBrands = 15;
    $numSuppliers = 8;
    $numWarehouses = 5;
    $numPromotions = 10;
    
    // Categories (translated)
    $categories = [];
    $categoryNames = $t['categories'];
    for ($i = 0; $i < $numCategories; $i++) {
        $categories[] = [
            'category_id' => $i + 1,
            'category_name' => $categoryNames[$i],
            'description' => $t['category_desc'] . ' ' . strtolower($categoryNames[$i]),
            'parent_category_id' => $i > 0 && rand(0, 3) === 0 ? rand(1, $i) : null,
            'is_active' => rand(0, 10) > 0,
            'display_order' => $i + 1
        ];
    }
    
    // Brands (countries translated)
    $brands = [];
    $brandNames = ['TechPro', 'StyleMax', 'HomeLife', 'SportElite', 'BookWorld', 'FunTime', 'BeautyGlow', 'FreshFood', 'GardenPro', 'AutoParts', 'GlobalTech', 'PremiumStyle', 'QualityHome', 'ActiveLife', 'SmartChoice'];
    for ($i = 0; $i < $numBrands; $i++) {
        $brands[] = [
            'brand_id' => $i + 1,
            'brand_name' => $brandNames[$i],
            'country_of_origin' => $t['countries'][rand(0, 5)],
            'founded_year' => rand(1950, 2020),
            'website' => 'https://www.' . strtolower($brandNames[$i]) . '.com',
            'is_premium' => rand(0, 3) === 0
        ];
    }
    
    // Suppliers (translated)
    $suppliers = [];
    $supplierNames = $t['suppliers'];
    for ($i = 0; $i < $numSuppliers; $i++) {
        $suppliers[] = [
            'supplier_id' => $i + 1,
            'supplier_name' => $supplierNames[$i],
            'contact_name' => $t['contact_names'][rand(0, 3)],
            'email' => 'contact@' . strtolower(str_replace(' ', '', $supplierNames[$i])) . '.com',
            'phone' => '+1 ' . rand(200, 999) . '-' . rand(100, 999) . '-' . rand(1000, 9999),
            'address' => rand(100, 9999) . ' ' . $t['cities'][rand(0, count($t['cities']) - 1)],
            'rating' => round(rand(30, 50) / 10, 1),
            'is_active' => rand(0, 10) > 1
        ];
    }
    
    // Warehouses (translated)
    $warehouses = [];
    $warehouseLocations = array_slice($t['cities'], 0, 5);
    for ($i = 0; $i < $numWarehouses; $i++) {
        $warehouses[] = [
            'warehouse_id' => $i + 1,
            'warehouse_name' => $t['warehouse_name'] . ' ' . ($i + 1),
            'location' => $warehouseLocations[$i],
            'capacity_units' => rand(10000, 100000),
            'current_occupancy' => rand(40, 95),
            'manager_name' => $t['manager_names'][rand(0, 4)]
        ];
    }
    
    // Products (translated)
    $products = [];
    $productPrefixes = $t['product_prefixes'];
    $productTypes = $t['product_types'];
    for ($i = 0; $i < $numProducts; $i++) {
        $price = round(rand(500, 50000) / 100, 2);
        $products[] = [
            'product_id' => $i + 1,
            'sku' => 'SKU-' . str_pad($i + 1, 6, '0', STR_PAD_LEFT),
            'product_name' => $productPrefixes[array_rand($productPrefixes)] . ' ' . $productTypes[array_rand($productTypes)] . ' ' . ($i + 1),
            'description' => $t['product_desc'] . ' ' . ($i + 1),
            'category_id' => rand(1, $numCategories),
            'brand_id' => rand(1, $numBrands),
            'supplier_id' => rand(1, $numSuppliers),
            'price' => $price,
            'cost' => round($price * rand(40, 70) / 100, 2),
            'weight_kg' => round(rand(1, 500) / 10, 2),
            'is_active' => rand(0, 10) > 0,
            'created_at' => randomDate('2022-01-01', '2024-01-01'),
            'updated_at' => randomDate('2024-01-01', date('Y-m-d'))
        ];
    }
    
    // Inventory (stock por warehouse)
    $inventory = [];
    for ($i = 0; $i < $numProducts; $i++) {
        for ($w = 0; $w < rand(1, 3); $w++) {
            $inventory[] = [
                'inventory_id' => count($inventory) + 1,
                'product_id' => $i + 1,
                'warehouse_id' => rand(1, $numWarehouses),
                'quantity' => rand(0, 500),
                'min_stock_level' => rand(10, 50),
                'max_stock_level' => rand(200, 1000),
                'last_restock_date' => randomDate('2024-01-01', date('Y-m-d'))
            ];
        }
    }
    
    // Customers (translated)
    $customers = [];
    $firstNames = $t['first_names'];
    $lastNames = $t['last_names'];
    $cities = $t['cities'];
    $countries = $t['customer_countries'];
    $segments = ['Bronze', 'Silver', 'Gold', 'Platinum'];
    
    for ($i = 0; $i < $numCustomers; $i++) {
        $firstName = $firstNames[array_rand($firstNames)];
        $lastName = $lastNames[array_rand($lastNames)];
        $regDate = randomDate('2020-01-01', '2024-06-01');
        $customers[] = [
            'customer_id' => $i + 1,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => strtolower($firstName) . '.' . strtolower($lastName) . ($i + 1) . '@email.com',
            'phone' => '+1 ' . rand(200, 999) . '-' . rand(100, 999) . '-' . rand(1000, 9999),
            'birth_date' => randomDate('1960-01-01', '2005-12-31'),
            'city' => $cities[array_rand($cities)],
            'country' => $countries[array_rand($countries)],
            'postal_code' => rand(10000, 99999),
            'segment' => $segments[array_rand($segments)],
            'registration_date' => $regDate,
            'last_login' => randomDate($regDate, date('Y-m-d')),
            'is_verified' => rand(0, 10) > 2,
            'accepts_marketing' => rand(0, 1)
        ];
    }
    
    // Promotions (translated)
    $promotions = [];
    $promoTypes = ['percentage', 'fixed_amount', 'buy_x_get_y', 'free_shipping'];
    for ($i = 0; $i < $numPromotions; $i++) {
        $startDate = randomDate('2024-01-01', '2024-06-01');
        $promotions[] = [
            'promotion_id' => $i + 1,
            'promotion_code' => 'PROMO' . strtoupper(bin2hex(random_bytes(3))),
            'promotion_name' => $t['promo_name'] . ' ' . ($i + 1),
            'promotion_type' => $promoTypes[array_rand($promoTypes)],
            'discount_value' => rand(5, 50),
            'min_order_amount' => rand(0, 100) * 10,
            'max_uses' => rand(100, 10000),
            'current_uses' => rand(0, 500),
            'start_date' => $startDate,
            'end_date' => date('Y-m-d', strtotime($startDate . ' +' . rand(7, 90) . ' days')),
            'is_active' => rand(0, 3) > 0
        ];
    }
    
    // Orders (fact table - con más detalle)
    $orders = [];
    $orderItems = [];
    $statuses = $t['order_statuses'];
    $paymentMethods = ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery'];
    $shippingMethods = ['standard', 'express', 'same_day', 'pickup'];
    
    for ($i = 0; $i < $rows; $i++) {
        $customerId = rand(1, $numCustomers);
        $orderDate = randomDate('2023-01-01', date('Y-m-d'));
        $status = $statuses[array_rand($statuses)];
        $numItems = rand(1, 5);
        $subtotal = 0;
        
        // Generate order items
        for ($j = 0; $j < $numItems; $j++) {
            $productId = rand(1, $numProducts);
            $product = $products[$productId - 1];
            $quantity = rand(1, 5);
            $unitPrice = $product['price'];
            $itemTotal = $unitPrice * $quantity;
            $subtotal += $itemTotal;
            
            $orderItems[] = [
                'order_item_id' => count($orderItems) + 1,
                'order_id' => $i + 1,
                'product_id' => $productId,
                'quantity' => $quantity,
                'unit_price' => $unitPrice,
                'subtotal' => round($itemTotal, 2)
            ];
        }
        
        $discount = rand(0, 20);
        $shippingCost = rand(0, 50) * 10;
        $tax = round($subtotal * 0.21, 2);
        $total = round($subtotal * (1 - $discount / 100) + $shippingCost + $tax, 2);
        
        $orders[] = [
            'order_id' => $i + 1,
            'order_number' => 'ORD-' . date('Ymd', strtotime($orderDate)) . '-' . str_pad($i + 1, 5, '0', STR_PAD_LEFT),
            'customer_id' => $customerId,
            'order_date' => $orderDate,
            'status' => $status,
            'subtotal' => round($subtotal, 2),
            'discount_percent' => $discount,
            'shipping_cost' => $shippingCost,
            'tax_amount' => $tax,
            'total_amount' => $total,
            'payment_method' => $paymentMethods[array_rand($paymentMethods)],
            'shipping_method' => $shippingMethods[array_rand($shippingMethods)],
            'promotion_id' => rand(0, 3) === 0 ? rand(1, $numPromotions) : null,
            'notes' => rand(0, 5) === 0 ? 'Nota del cliente: ' . ['Entregar por la tarde', 'Llamar antes', 'Dejar en portería', 'Envolver para regalo'][rand(0, 3)] : null
        ];
    }
    
    // Reviews
    // Reviews (translated)
    $reviews = [];
    $numReviews = min($rows, 200);
    $reviewTitles = $t['review_titles'];
    $reviewComments = $t['review_comments'];
    for ($i = 0; $i < $numReviews; $i++) {
        $reviews[] = [
            'review_id' => $i + 1,
            'product_id' => rand(1, $numProducts),
            'customer_id' => rand(1, $numCustomers),
            'rating' => rand(1, 5),
            'title' => $reviewTitles[array_rand($reviewTitles)],
            'comment' => $reviewComments[array_rand($reviewComments)],
            'is_verified_purchase' => rand(0, 10) > 2,
            'helpful_votes' => rand(0, 50),
            'created_at' => randomDate('2023-01-01', date('Y-m-d'))
        ];
    }
    
    return [
        'description' => 'Dataset COMPLETO de E-commerce: categorías, marcas, proveedores, productos, inventario, clientes, promociones, órdenes, items y reviews',
        'tables' => [
            'categories' => $categories,
            'brands' => $brands,
            'suppliers' => $suppliers,
            'warehouses' => $warehouses,
            'products' => $products,
            'inventory' => $inventory,
            'customers' => $customers,
            'promotions' => $promotions,
            'orders' => $orders,
            'order_items' => $orderItems,
            'reviews' => $reviews
        ],
        'schema' => [
            'categories' => ['category_id (PK)', 'category_name', 'description', 'parent_category_id (FK self)', 'is_active', 'display_order'],
            'brands' => ['brand_id (PK)', 'brand_name', 'country_of_origin', 'founded_year', 'website', 'is_premium'],
            'suppliers' => ['supplier_id (PK)', 'supplier_name', 'contact_name', 'email', 'phone', 'address', 'rating', 'is_active'],
            'warehouses' => ['warehouse_id (PK)', 'warehouse_name', 'location', 'capacity_units', 'current_occupancy', 'manager_name'],
            'products' => ['product_id (PK)', 'sku', 'product_name', 'description', 'category_id (FK)', 'brand_id (FK)', 'supplier_id (FK)', 'price', 'cost', 'weight_kg', 'is_active', 'created_at', 'updated_at'],
            'inventory' => ['inventory_id (PK)', 'product_id (FK)', 'warehouse_id (FK)', 'quantity', 'min_stock_level', 'max_stock_level', 'last_restock_date'],
            'customers' => ['customer_id (PK)', 'first_name', 'last_name', 'email', 'phone', 'birth_date', 'city', 'country', 'postal_code', 'segment', 'registration_date', 'last_login', 'is_verified', 'accepts_marketing'],
            'promotions' => ['promotion_id (PK)', 'promotion_code', 'promotion_name', 'promotion_type', 'discount_value', 'min_order_amount', 'max_uses', 'current_uses', 'start_date', 'end_date', 'is_active'],
            'orders' => ['order_id (PK)', 'order_number', 'customer_id (FK)', 'order_date', 'status', 'subtotal', 'discount_percent', 'shipping_cost', 'tax_amount', 'total_amount', 'payment_method', 'shipping_method', 'promotion_id (FK)', 'notes'],
            'order_items' => ['order_item_id (PK)', 'order_id (FK)', 'product_id (FK)', 'quantity', 'unit_price', 'subtotal'],
            'reviews' => ['review_id (PK)', 'product_id (FK)', 'customer_id (FK)', 'rating', 'title', 'comment', 'is_verified_purchase', 'helpful_votes', 'created_at']
        ],
        'relationships' => [
            'categories.parent_category_id -> categories.category_id',
            'products.category_id -> categories.category_id',
            'products.brand_id -> brands.brand_id',
            'products.supplier_id -> suppliers.supplier_id',
            'inventory.product_id -> products.product_id',
            'inventory.warehouse_id -> warehouses.warehouse_id',
            'orders.customer_id -> customers.customer_id',
            'orders.promotion_id -> promotions.promotion_id',
            'order_items.order_id -> orders.order_id',
            'order_items.product_id -> products.product_id',
            'reviews.product_id -> products.product_id',
            'reviews.customer_id -> customers.customer_id'
        ]
    ];
}

// ============================================
// OBSERVABILITY PLATFORM DATASET - SISTEMA COMPLETO
// ============================================
function generateLogsDataset($rows, $t) {
    $numServices = 12;
    $numServers = 15;
    $numDeployments = 30;
    $numAlertRules = 20;
    $numIncidents = min(ceil($rows / 50), 50);
    $numOnCallEngineers = 10;
    
    // Services (microservices)
    $services = [];
    $serviceNames = ['api-gateway', 'user-service', 'order-service', 'payment-service', 'inventory-service', 
                     'notification-service', 'auth-service', 'analytics-service', 'search-service', 
                     'recommendation-service', 'shipping-service', 'email-service'];
    $teams = ['Platform', 'Checkout', 'Growth', 'Infrastructure', 'Data'];
    for ($i = 0; $i < $numServices; $i++) {
        $services[] = [
            'service_id' => $i + 1,
            'service_name' => $serviceNames[$i],
            'description' => 'Microservice for ' . str_replace('-', ' ', $serviceNames[$i]),
            'team' => $teams[array_rand($teams)],
            'language' => ['Python', 'Go', 'Node.js', 'Java', 'Rust'][rand(0, 4)],
            'repository_url' => 'https://github.com/company/' . $serviceNames[$i],
            'current_version' => rand(1, 5) . '.' . rand(0, 9) . '.' . rand(0, 20),
            'is_critical' => rand(0, 3) === 0,
            'created_at' => randomDate('2020-01-01', '2023-12-31')
        ];
    }
    
    // Servers/Instances
    $servers = [];
    $regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'sa-east-1', 'ap-southeast-1'];
    for ($i = 0; $i < $numServers; $i++) {
        $region = $regions[array_rand($regions)];
        $servers[] = [
            'server_id' => $i + 1,
            'hostname' => 'srv-' . substr($region, 0, 2) . '-' . sprintf('%03d', $i + 1),
            'ip_address' => '10.' . rand(0, 255) . '.' . rand(0, 255) . '.' . rand(1, 254),
            'region' => $region,
            'availability_zone' => $region . chr(97 + rand(0, 2)),
            'instance_type' => ['t3.micro', 't3.small', 't3.medium', 'm5.large', 'm5.xlarge', 'c5.2xlarge'][rand(0, 5)],
            'cpu_cores' => [2, 4, 8, 16, 32][rand(0, 4)],
            'memory_gb' => [4, 8, 16, 32, 64, 128][rand(0, 5)],
            'disk_gb' => [50, 100, 200, 500, 1000][rand(0, 4)],
            'status' => rand(0, 20) > 0 ? 'running' : 'stopped',
            'launched_at' => randomDateTime('2023-01-01', date('Y-m-d'))
        ];
    }
    
    // Deployments
    $deployments = [];
    for ($i = 0; $i < $numDeployments; $i++) {
        $serviceId = rand(1, $numServices);
        $status = ['success', 'success', 'success', 'success', 'failed', 'rolled_back'][rand(0, 5)];
        $deployments[] = [
            'deployment_id' => $i + 1,
            'service_id' => $serviceId,
            'version' => rand(1, 5) . '.' . rand(0, 9) . '.' . rand(0, 50),
            'environment' => ['production', 'staging', 'development'][rand(0, 2)],
            'deployed_by' => 'engineer-' . rand(1, 20),
            'deployed_at' => randomDateTime('2024-01-01', date('Y-m-d')),
            'status' => $status,
            'duration_seconds' => rand(30, 600),
            'commit_sha' => substr(md5(rand()), 0, 8),
            'rollback_version' => $status === 'rolled_back' ? rand(1, 5) . '.' . rand(0, 9) . '.' . rand(0, 49) : null
        ];
    }
    
    // Access Logs (main fact table)
    $accessLogs = [];
    $endpoints = ['/api/users', '/api/products', '/api/orders', '/api/auth/login', '/api/auth/logout', 
                  '/api/payments', '/api/search', '/api/cart', '/api/checkout', '/health', '/metrics'];
    $methods = ['GET', 'GET', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH'];
    $statusCodes = [200, 200, 200, 200, 201, 204, 301, 400, 401, 403, 404, 500, 502, 503];
    
    for ($i = 0; $i < $rows; $i++) {
        $statusCode = $statusCodes[array_rand($statusCodes)];
        $accessLogs[] = [
            'log_id' => $i + 1,
            'timestamp' => randomDateTime('2024-01-01', date('Y-m-d')),
            'service_id' => rand(1, $numServices),
            'server_id' => rand(1, $numServers),
            'trace_id' => 'trace-' . bin2hex(random_bytes(8)),
            'span_id' => 'span-' . bin2hex(random_bytes(4)),
            'method' => $methods[array_rand($methods)],
            'endpoint' => $endpoints[array_rand($endpoints)],
            'status_code' => $statusCode,
            'response_time_ms' => $statusCode >= 500 ? rand(1000, 30000) : rand(5, 500),
            'request_size_bytes' => rand(100, 50000),
            'response_size_bytes' => rand(200, 100000),
            'user_agent' => ['Mozilla/5.0', 'curl/7.68.0', 'PostmanRuntime/7.29.0', 'python-requests/2.28.0'][rand(0, 3)],
            'client_ip' => rand(1, 255) . '.' . rand(0, 255) . '.' . rand(0, 255) . '.' . rand(1, 254),
            'user_id' => rand(0, 2) ? rand(1, 10000) : null
        ];
    }
    
    // Error Logs
    $errorLogs = [];
    $errorTypes = ['NullPointerException', 'ConnectionTimeout', 'DatabaseError', 'ValidationError', 
                   'AuthenticationError', 'RateLimitExceeded', 'OutOfMemory', 'DiskFull'];
    $numErrors = ceil($rows * 0.1); // 10% of access logs are errors
    for ($i = 0; $i < $numErrors; $i++) {
        $errorLogs[] = [
            'error_id' => $i + 1,
            'timestamp' => randomDateTime('2024-01-01', date('Y-m-d')),
            'service_id' => rand(1, $numServices),
            'server_id' => rand(1, $numServers),
            'error_type' => $errorTypes[array_rand($errorTypes)],
            'error_message' => 'Error occurred in ' . $serviceNames[rand(0, count($serviceNames) - 1)],
            'stack_trace' => 'at com.company.service.Handler.process(Handler.java:' . rand(10, 500) . ')',
            'severity' => ['warning', 'error', 'critical'][rand(0, 2)],
            'is_resolved' => rand(0, 3) > 0,
            'resolved_at' => rand(0, 3) > 0 ? randomDateTime('2024-01-01', date('Y-m-d')) : null
        ];
    }
    
    // Performance Metrics (time series)
    $metrics = [];
    $metricNames = ['cpu_usage', 'memory_usage', 'disk_io', 'network_in', 'network_out', 'request_count', 'error_rate', 'latency_p99'];
    $numMetrics = min($rows, 500);
    for ($i = 0; $i < $numMetrics; $i++) {
        $metricName = $metricNames[array_rand($metricNames)];
        $metrics[] = [
            'metric_id' => $i + 1,
            'timestamp' => randomDateTime('2024-01-01', date('Y-m-d')),
            'service_id' => rand(1, $numServices),
            'server_id' => rand(1, $numServers),
            'metric_name' => $metricName,
            'value' => $metricName === 'cpu_usage' || $metricName === 'memory_usage' ? rand(10, 95) : rand(100, 10000),
            'unit' => in_array($metricName, ['cpu_usage', 'memory_usage', 'error_rate']) ? 'percent' : 'count'
        ];
    }
    
    // Alert Rules
    $alertRules = [];
    for ($i = 0; $i < $numAlertRules; $i++) {
        $alertRules[] = [
            'rule_id' => $i + 1,
            'name' => 'Alert Rule ' . ($i + 1),
            'service_id' => rand(1, $numServices),
            'metric_name' => $metricNames[array_rand($metricNames)],
            'condition' => ['>', '<', '>=', '<='][rand(0, 3)],
            'threshold' => rand(50, 95),
            'severity' => ['low', 'medium', 'high', 'critical'][rand(0, 3)],
            'is_enabled' => rand(0, 5) > 0,
            'notification_channel' => ['slack', 'pagerduty', 'email', 'webhook'][rand(0, 3)]
        ];
    }
    
    // Alerts (triggered)
    $alerts = [];
    $numAlerts = min(ceil($rows / 20), 100);
    for ($i = 0; $i < $numAlerts; $i++) {
        $triggeredAt = randomDateTime('2024-01-01', date('Y-m-d'));
        $isResolved = rand(0, 3) > 0;
        $alerts[] = [
            'alert_id' => $i + 1,
            'rule_id' => rand(1, $numAlertRules),
            'triggered_at' => $triggeredAt,
            'resolved_at' => $isResolved ? date('Y-m-d H:i:s', strtotime($triggeredAt) + rand(300, 7200)) : null,
            'status' => $isResolved ? 'resolved' : ['firing', 'acknowledged'][rand(0, 1)],
            'acknowledged_by' => rand(0, 1) ? 'engineer-' . rand(1, 10) : null
        ];
    }
    
    // Incidents
    $incidents = [];
    $incidentTitles = ['Database latency spike', 'API gateway timeout', 'Payment service down', 
                       'High error rate', 'Memory leak detected', 'Disk space critical'];
    for ($i = 0; $i < $numIncidents; $i++) {
        $startedAt = randomDateTime('2024-01-01', date('Y-m-d'));
        $isResolved = rand(0, 4) > 0;
        $incidents[] = [
            'incident_id' => $i + 1,
            'title' => $incidentTitles[array_rand($incidentTitles)] . ' #' . ($i + 1),
            'severity' => ['sev1', 'sev2', 'sev3', 'sev4'][rand(0, 3)],
            'status' => $isResolved ? 'resolved' : ['investigating', 'identified', 'monitoring'][rand(0, 2)],
            'started_at' => $startedAt,
            'resolved_at' => $isResolved ? date('Y-m-d H:i:s', strtotime($startedAt) + rand(1800, 14400)) : null,
            'root_cause' => $isResolved ? 'Configuration issue / Resource exhaustion / Bug in code' : null,
            'services_affected' => rand(1, 4),
            'assigned_to' => 'engineer-' . rand(1, 10)
        ];
    }
    
    // On-Call Schedule
    $onCallSchedule = [];
    for ($i = 0; $i < 52; $i++) { // 52 weeks
        $onCallSchedule[] = [
            'schedule_id' => $i + 1,
            'week_start' => date('Y-m-d', strtotime('2024-01-01 +' . $i . ' weeks')),
            'week_end' => date('Y-m-d', strtotime('2024-01-01 +' . ($i + 1) . ' weeks - 1 day')),
            'primary_engineer' => 'engineer-' . rand(1, $numOnCallEngineers),
            'secondary_engineer' => 'engineer-' . rand(1, $numOnCallEngineers),
            'team' => $teams[array_rand($teams)]
        ];
    }
    
    return [
        'description' => 'Sistema de observabilidad completo: servicios, servidores, deployments, logs, métricas, alertas e incidentes',
        'tables' => [
            'services' => $services,
            'servers' => $servers,
            'deployments' => $deployments,
            'access_logs' => $accessLogs,
            'error_logs' => $errorLogs,
            'performance_metrics' => $metrics,
            'alert_rules' => $alertRules,
            'alerts' => $alerts,
            'incidents' => $incidents,
            'on_call_schedules' => $onCallSchedule
        ],
        'schema' => [
            'services' => ['service_id (PK)', 'service_name', 'description', 'team', 'language', 'repository_url', 'current_version', 'is_critical', 'created_at'],
            'servers' => ['server_id (PK)', 'hostname', 'ip_address', 'region', 'availability_zone', 'instance_type', 'cpu_cores', 'memory_gb', 'disk_gb', 'status', 'launched_at'],
            'deployments' => ['deployment_id (PK)', 'service_id (FK)', 'version', 'environment', 'deployed_by', 'deployed_at', 'status', 'duration_seconds', 'commit_sha', 'rollback_version'],
            'access_logs' => ['log_id (PK)', 'timestamp', 'service_id (FK)', 'server_id (FK)', 'trace_id', 'span_id', 'method', 'endpoint', 'status_code', 'response_time_ms', 'request_size_bytes', 'response_size_bytes', 'user_agent', 'client_ip', 'user_id'],
            'error_logs' => ['error_id (PK)', 'timestamp', 'service_id (FK)', 'server_id (FK)', 'error_type', 'error_message', 'stack_trace', 'severity', 'is_resolved', 'resolved_at'],
            'performance_metrics' => ['metric_id (PK)', 'timestamp', 'service_id (FK)', 'server_id (FK)', 'metric_name', 'value', 'unit'],
            'alert_rules' => ['rule_id (PK)', 'name', 'service_id (FK)', 'metric_name', 'condition', 'threshold', 'severity', 'is_enabled', 'notification_channel'],
            'alerts' => ['alert_id (PK)', 'rule_id (FK)', 'triggered_at', 'resolved_at', 'status', 'acknowledged_by'],
            'incidents' => ['incident_id (PK)', 'title', 'severity', 'status', 'started_at', 'resolved_at', 'root_cause', 'services_affected', 'assigned_to'],
            'on_call_schedules' => ['schedule_id (PK)', 'week_start', 'week_end', 'primary_engineer', 'secondary_engineer', 'team']
        ],
        'relationships' => [
            'deployments.service_id -> services.service_id',
            'access_logs.service_id -> services.service_id',
            'access_logs.server_id -> servers.server_id',
            'error_logs.service_id -> services.service_id',
            'error_logs.server_id -> servers.server_id',
            'performance_metrics.service_id -> services.service_id',
            'performance_metrics.server_id -> servers.server_id',
            'alert_rules.service_id -> services.service_id',
            'alerts.rule_id -> alert_rules.rule_id'
        ]
    ];
}

// ============================================
// BANKING SYSTEM DATASET - SISTEMA COMPLETO
// ============================================
function generateFinanceDataset($rows, $t) {
    $numCustomers = min(ceil($rows / 4), 300);
    $numBranches = 15;
    $numEmployees = 50;
    $numAccountTypes = 6;
    $numLoans = min(ceil($rows / 10), 100);
    $numInvestments = min(ceil($rows / 8), 80);
    
    // Branches
    $branches = [];
    $cities = ['Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'La Plata', 'Mar del Plata', 'Tucumán', 'Salta'];
    for ($i = 0; $i < $numBranches; $i++) {
        $city = $cities[array_rand($cities)];
        $branches[] = [
            'branch_id' => $i + 1,
            'branch_name' => 'Sucursal ' . $city . ' ' . ($i + 1),
            'city' => $city,
            'address' => 'Av. Principal ' . rand(100, 9999),
            'phone' => '+54 11 ' . rand(4000, 4999) . '-' . rand(1000, 9999),
            'manager_id' => null, // Will be set after employees
            'opened_date' => randomDate('2000-01-01', '2020-12-31'),
            'is_active' => rand(0, 10) > 0
        ];
    }
    
    // Bank Employees
    $bankEmployees = [];
    $roles = ['Teller', 'Loan Officer', 'Branch Manager', 'Customer Service', 'Financial Advisor', 'Security'];
    $firstNames = ['Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura', 'Diego', 'Sofía'];
    $lastNames = ['García', 'Rodríguez', 'López', 'Martínez', 'González', 'Fernández'];
    for ($i = 0; $i < $numEmployees; $i++) {
        $bankEmployees[] = [
            'employee_id' => $i + 1,
            'branch_id' => rand(1, $numBranches),
            'first_name' => $firstNames[array_rand($firstNames)],
            'last_name' => $lastNames[array_rand($lastNames)],
            'role' => $roles[array_rand($roles)],
            'email' => 'employee' . ($i + 1) . '@banco.com',
            'hire_date' => randomDate('2010-01-01', '2023-12-31'),
            'salary' => rand(40000, 150000),
            'is_active' => rand(0, 10) > 0
        ];
    }
    
    // Update branch managers
    for ($i = 0; $i < $numBranches; $i++) {
        $branches[$i]['manager_id'] = rand(1, $numEmployees);
    }
    
    // Account Types
    $accountTypes = [];
    $typeNames = ['Cuenta Corriente', 'Caja de Ahorro', 'Cuenta Sueldo', 'Plazo Fijo', 'Cuenta Dólar', 'Cuenta Empresa'];
    $currencies = ['ARS', 'ARS', 'ARS', 'ARS', 'USD', 'ARS'];
    for ($i = 0; $i < $numAccountTypes; $i++) {
        $accountTypes[] = [
            'account_type_id' => $i + 1,
            'type_name' => $typeNames[$i],
            'currency' => $currencies[$i],
            'min_balance' => [0, 0, 0, 10000, 100, 5000][$i],
            'monthly_fee' => [500, 0, 0, 0, 10, 2000][$i],
            'interest_rate' => [0, 0.5, 0.5, 45, 1, 0][$i],
            'allows_overdraft' => $i === 0 || $i === 5
        ];
    }
    
    // Customers
    $customers = [];
    for ($i = 0; $i < $numCustomers; $i++) {
        $customers[] = [
            'customer_id' => $i + 1,
            'first_name' => $firstNames[array_rand($firstNames)],
            'last_name' => $lastNames[array_rand($lastNames)],
            'dni' => rand(10000000, 45000000),
            'email' => 'cliente' . ($i + 1) . '@email.com',
            'phone' => '+54 9 11 ' . rand(1000, 9999) . '-' . rand(1000, 9999),
            'address' => 'Calle ' . rand(1, 100) . ' #' . rand(100, 9999),
            'city' => $cities[array_rand($cities)],
            'birth_date' => randomDate('1950-01-01', '2000-12-31'),
            'registration_date' => randomDate('2015-01-01', '2023-12-31'),
            'credit_score' => rand(300, 850),
            'is_vip' => rand(0, 10) === 0,
            'preferred_branch_id' => rand(1, $numBranches)
        ];
    }
    
    // Accounts
    $accounts = [];
    $numAccounts = min($numCustomers * 2, 500);
    for ($i = 0; $i < $numAccounts; $i++) {
        $accountTypeId = rand(1, $numAccountTypes);
        $accounts[] = [
            'account_id' => $i + 1,
            'customer_id' => rand(1, $numCustomers),
            'account_type_id' => $accountTypeId,
            'account_number' => 'ACC-' . str_pad($i + 1, 10, '0', STR_PAD_LEFT),
            'cbu' => str_pad(rand(1, 9999999999), 22, '0', STR_PAD_LEFT),
            'balance' => round(rand(0, 10000000) / 100, 2),
            'opened_date' => randomDate('2015-01-01', '2023-12-31'),
            'status' => ['active', 'active', 'active', 'frozen', 'closed'][rand(0, 4)],
            'last_activity_date' => randomDate('2023-01-01', date('Y-m-d'))
        ];
    }
    
    // Cards
    $cards = [];
    $cardTypes = ['debit', 'credit', 'prepaid'];
    $cardBrands = ['Visa', 'Mastercard', 'American Express'];
    $numCards = min($numAccounts, 400);
    for ($i = 0; $i < $numCards; $i++) {
        $expiryDate = date('Y-m-d', strtotime('+' . rand(1, 5) . ' years'));
        $cards[] = [
            'card_id' => $i + 1,
            'account_id' => rand(1, $numAccounts),
            'card_type' => $cardTypes[array_rand($cardTypes)],
            'card_brand' => $cardBrands[array_rand($cardBrands)],
            'card_number_last4' => str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT),
            'expiry_date' => $expiryDate,
            'credit_limit' => rand(50000, 500000),
            'is_active' => rand(0, 10) > 1,
            'issued_date' => randomDate('2020-01-01', '2023-12-31')
        ];
    }
    
    // Transactions (main fact table)
    $transactions = [];
    $transactionTypes = ['deposit', 'withdrawal', 'transfer_in', 'transfer_out', 'card_payment', 'atm_withdrawal', 'fee', 'interest'];
    $merchants = ['Supermercado Coto', 'Carrefour', 'YPF', 'Shell', 'Netflix', 'Spotify', 'Amazon', 'MercadoLibre', 'Rappi', 'PedidosYa'];
    
    for ($i = 0; $i < $rows; $i++) {
        $type = $transactionTypes[array_rand($transactionTypes)];
        $isDebit = in_array($type, ['withdrawal', 'transfer_out', 'card_payment', 'atm_withdrawal', 'fee']);
        $amount = round(rand(100, 500000) / 100, 2);
        if ($isDebit) $amount = -$amount;
        
        $transactions[] = [
            'transaction_id' => $i + 1,
            'account_id' => rand(1, $numAccounts),
            'transaction_type' => $type,
            'amount' => $amount,
            'balance_after' => round(rand(0, 10000000) / 100, 2),
            'transaction_date' => randomDateTime('2023-01-01', date('Y-m-d')),
            'description' => $type === 'card_payment' ? $merchants[array_rand($merchants)] : ucfirst(str_replace('_', ' ', $type)),
            'reference_number' => 'TXN-' . strtoupper(bin2hex(random_bytes(6))),
            'channel' => ['online', 'mobile', 'atm', 'branch', 'pos'][rand(0, 4)],
            'status' => ['completed', 'completed', 'completed', 'pending', 'failed'][rand(0, 4)]
        ];
    }
    
    // Transfers
    $transfers = [];
    $numTransfers = ceil($rows * 0.3);
    for ($i = 0; $i < $numTransfers; $i++) {
        $transfers[] = [
            'transfer_id' => $i + 1,
            'from_account_id' => rand(1, $numAccounts),
            'to_account_id' => rand(1, $numAccounts),
            'amount' => round(rand(1000, 100000) / 100, 2),
            'transfer_date' => randomDateTime('2023-01-01', date('Y-m-d')),
            'concept' => ['Alquiler', 'Pago servicio', 'Préstamo personal', 'Compra', 'Otros'][rand(0, 4)],
            'status' => ['completed', 'completed', 'pending', 'cancelled'][rand(0, 3)]
        ];
    }
    
    // Loans
    $loans = [];
    $loanTypes = ['personal', 'mortgage', 'auto', 'business', 'student'];
    for ($i = 0; $i < $numLoans; $i++) {
        $loanAmount = rand(50000, 5000000);
        $startDate = randomDate('2020-01-01', '2023-12-31');
        $loans[] = [
            'loan_id' => $i + 1,
            'customer_id' => rand(1, $numCustomers),
            'loan_type' => $loanTypes[array_rand($loanTypes)],
            'principal_amount' => $loanAmount,
            'interest_rate' => round(rand(1000, 5000) / 100, 2),
            'term_months' => [12, 24, 36, 48, 60, 120, 240][rand(0, 6)],
            'monthly_payment' => round($loanAmount / rand(12, 60), 2),
            'start_date' => $startDate,
            'end_date' => date('Y-m-d', strtotime($startDate . ' +' . rand(12, 120) . ' months')),
            'status' => ['active', 'active', 'active', 'paid_off', 'defaulted'][rand(0, 4)],
            'collateral' => rand(0, 1) ? 'Property/Vehicle' : null
        ];
    }
    
    // Loan Payments
    $loanPayments = [];
    $numLoanPayments = $numLoans * 5;
    for ($i = 0; $i < $numLoanPayments; $i++) {
        $loanPayments[] = [
            'payment_id' => $i + 1,
            'loan_id' => rand(1, $numLoans),
            'payment_date' => randomDate('2020-01-01', date('Y-m-d')),
            'amount' => round(rand(5000, 50000) / 100, 2),
            'principal_paid' => round(rand(3000, 40000) / 100, 2),
            'interest_paid' => round(rand(1000, 10000) / 100, 2),
            'late_fee' => rand(0, 5) === 0 ? round(rand(100, 1000) / 100, 2) : 0,
            'status' => ['on_time', 'on_time', 'on_time', 'late', 'missed'][rand(0, 4)]
        ];
    }
    
    // Investments
    $investments = [];
    $investmentTypes = ['stocks', 'bonds', 'mutual_funds', 'fixed_term', 'crypto'];
    for ($i = 0; $i < $numInvestments; $i++) {
        $purchasePrice = round(rand(10000, 1000000) / 100, 2);
        $investments[] = [
            'investment_id' => $i + 1,
            'customer_id' => rand(1, $numCustomers),
            'investment_type' => $investmentTypes[array_rand($investmentTypes)],
            'symbol' => strtoupper(substr(md5(rand()), 0, 4)),
            'quantity' => round(rand(1, 1000) / 10, 2),
            'purchase_price' => $purchasePrice,
            'current_price' => round($purchasePrice * (rand(80, 150) / 100), 2),
            'purchase_date' => randomDate('2020-01-01', '2023-12-31'),
            'status' => ['holding', 'holding', 'sold'][rand(0, 2)]
        ];
    }
    
    // Exchange Rates (time series)
    $exchangeRates = [];
    $currencies = ['USD', 'EUR', 'BRL', 'CLP'];
    for ($i = 0; $i < 365; $i++) {
        foreach ($currencies as $currency) {
            $baseRate = $currency === 'USD' ? 900 : ($currency === 'EUR' ? 980 : ($currency === 'BRL' ? 180 : 1.1));
            $exchangeRates[] = [
                'rate_id' => count($exchangeRates) + 1,
                'date' => date('Y-m-d', strtotime('2024-01-01 +' . $i . ' days')),
                'currency_from' => $currency,
                'currency_to' => 'ARS',
                'buy_rate' => round($baseRate * (rand(95, 105) / 100), 2),
                'sell_rate' => round($baseRate * (rand(100, 110) / 100), 2)
            ];
        }
    }
    
    return [
        'description' => 'Sistema bancario completo: clientes, cuentas, tarjetas, transacciones, préstamos, inversiones y más',
        'tables' => [
            'branches' => $branches,
            'bank_employees' => $bankEmployees,
            'account_types' => $accountTypes,
            'customers' => $customers,
            'accounts' => $accounts,
            'cards' => $cards,
            'transactions' => $transactions,
            'transfers' => $transfers,
            'loans' => $loans,
            'loan_payments' => $loanPayments,
            'investments' => $investments,
            'exchange_rates' => $exchangeRates
        ],
        'schema' => [
            'branches' => ['branch_id (PK)', 'branch_name', 'city', 'address', 'phone', 'manager_id (FK)', 'opened_date', 'is_active'],
            'bank_employees' => ['employee_id (PK)', 'branch_id (FK)', 'first_name', 'last_name', 'role', 'email', 'hire_date', 'salary', 'is_active'],
            'account_types' => ['account_type_id (PK)', 'type_name', 'currency', 'min_balance', 'monthly_fee', 'interest_rate', 'allows_overdraft'],
            'customers' => ['customer_id (PK)', 'first_name', 'last_name', 'dni', 'email', 'phone', 'address', 'city', 'birth_date', 'registration_date', 'credit_score', 'is_vip', 'preferred_branch_id (FK)'],
            'accounts' => ['account_id (PK)', 'customer_id (FK)', 'account_type_id (FK)', 'account_number', 'cbu', 'balance', 'opened_date', 'status', 'last_activity_date'],
            'cards' => ['card_id (PK)', 'account_id (FK)', 'card_type', 'card_brand', 'card_number_last4', 'expiry_date', 'credit_limit', 'is_active', 'issued_date'],
            'transactions' => ['transaction_id (PK)', 'account_id (FK)', 'transaction_type', 'amount', 'balance_after', 'transaction_date', 'description', 'reference_number', 'channel', 'status'],
            'transfers' => ['transfer_id (PK)', 'from_account_id (FK)', 'to_account_id (FK)', 'amount', 'transfer_date', 'concept', 'status'],
            'loans' => ['loan_id (PK)', 'customer_id (FK)', 'loan_type', 'principal_amount', 'interest_rate', 'term_months', 'monthly_payment', 'start_date', 'end_date', 'status', 'collateral'],
            'loan_payments' => ['payment_id (PK)', 'loan_id (FK)', 'payment_date', 'amount', 'principal_paid', 'interest_paid', 'late_fee', 'status'],
            'investments' => ['investment_id (PK)', 'customer_id (FK)', 'investment_type', 'symbol', 'quantity', 'purchase_price', 'current_price', 'purchase_date', 'status'],
            'exchange_rates' => ['rate_id (PK)', 'date', 'currency_from', 'currency_to', 'buy_rate', 'sell_rate']
        ],
        'relationships' => [
            'branches.manager_id -> bank_employees.employee_id',
            'bank_employees.branch_id -> branches.branch_id',
            'customers.preferred_branch_id -> branches.branch_id',
            'accounts.customer_id -> customers.customer_id',
            'accounts.account_type_id -> account_types.account_type_id',
            'cards.account_id -> accounts.account_id',
            'transactions.account_id -> accounts.account_id',
            'transfers.from_account_id -> accounts.account_id',
            'transfers.to_account_id -> accounts.account_id',
            'loans.customer_id -> customers.customer_id',
            'loan_payments.loan_id -> loans.loan_id',
            'investments.customer_id -> customers.customer_id'
        ]
    ];
}

// ============================================
// HR MANAGEMENT DATASET - SISTEMA COMPLETO
// ============================================
function generateHRDataset($rows, $t) {
    $numDepartments = 10;
    $numPositions = 20;
    $numBenefitTypes = 8;
    $numTrainings = 15;
    $numJobPostings = 12;
    
    // Use translated names and data
    $firstNames = $t['first_names'];
    $lastNames = $t['last_names'];
    
    // Departments (translated)
    $departments = [];
    $deptNames = $t['departments'];
    // Extend with more departments
    $deptNames = array_merge($deptNames, ['Product', 'Data']);
    $locations = array_slice($t['cities'], 0, 4);
    
    for ($i = 0; $i < $numDepartments; $i++) {
        $departments[] = [
            'department_id' => $i + 1,
            'department_name' => $deptNames[$i],
            'department_code' => strtoupper(substr($deptNames[$i], 0, 3)),
            'budget' => rand(500000, 10000000),
            'location' => $locations[array_rand($locations)],
            'head_count_limit' => rand(10, 50),
            'cost_center' => 'CC-' . str_pad($i + 1, 3, '0', STR_PAD_LEFT),
            'created_at' => randomDate('2015-01-01', '2020-12-31')
        ];
    }
    
    // Positions
    $positions = [];
    $positionData = [
        ['Junior Developer', 'Junior', 'Ingeniería', 35000, 55000],
        ['Senior Developer', 'Senior', 'Ingeniería', 60000, 100000],
        ['Tech Lead', 'Lead', 'Ingeniería', 90000, 140000],
        ['Engineering Manager', 'Manager', 'Ingeniería', 120000, 180000],
        ['Data Engineer', 'Senior', 'Data', 70000, 120000],
        ['Data Analyst', 'Junior', 'Data', 40000, 70000],
        ['Sales Representative', 'Junior', 'Ventas', 30000, 50000],
        ['Sales Manager', 'Manager', 'Ventas', 80000, 130000],
        ['Marketing Analyst', 'Junior', 'Marketing', 35000, 55000],
        ['Marketing Manager', 'Manager', 'Marketing', 75000, 120000],
        ['HR Specialist', 'Junior', 'Recursos Humanos', 35000, 55000],
        ['HR Business Partner', 'Senior', 'Recursos Humanos', 60000, 95000],
        ['Accountant', 'Junior', 'Finanzas', 40000, 65000],
        ['Financial Analyst', 'Senior', 'Finanzas', 65000, 100000],
        ['Operations Coordinator', 'Junior', 'Operaciones', 35000, 55000],
        ['Product Manager', 'Senior', 'Producto', 80000, 130000],
        ['Support Agent', 'Junior', 'Soporte', 25000, 40000],
        ['Support Lead', 'Lead', 'Soporte', 50000, 75000],
        ['Legal Counsel', 'Senior', 'Legal', 90000, 150000],
        ['CEO', 'Executive', 'Ejecutivo', 200000, 500000]
    ];
    
    for ($i = 0; $i < count($positionData); $i++) {
        $positions[] = [
            'position_id' => $i + 1,
            'position_title' => $positionData[$i][0],
            'level' => $positionData[$i][1],
            'department_name' => $positionData[$i][2],
            'min_salary' => $positionData[$i][3],
            'max_salary' => $positionData[$i][4],
            'is_remote_eligible' => rand(0, 1),
            'requires_travel' => rand(0, 4) === 0
        ];
    }
    
    // Employees
    $employees = [];
    $numEmployees = min($rows, 500);
    
    for ($i = 0; $i < $numEmployees; $i++) {
        $firstName = $firstNames[array_rand($firstNames)];
        $lastName = $lastNames[array_rand($lastNames)];
        $positionId = rand(1, count($positionData));
        $position = $positions[$positionId - 1];
        $hireDate = randomDate('2015-01-01', '2024-06-01');
        
        $employees[] = [
            'employee_id' => $i + 1,
            'employee_code' => 'EMP-' . str_pad($i + 1, 5, '0', STR_PAD_LEFT),
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => strtolower($firstName) . '.' . strtolower($lastName) . ($i + 1) . '@company.com',
            'phone' => '+54 9 11 ' . rand(1000, 9999) . '-' . rand(1000, 9999),
            'birth_date' => randomDate('1970-01-01', '2000-12-31'),
            'gender' => ['M', 'F', 'Other'][rand(0, 2)],
            'department_id' => rand(1, $numDepartments),
            'position_id' => $positionId,
            'manager_id' => $i > 5 ? rand(1, min($i, 20)) : null,
            'hire_date' => $hireDate,
            'employment_type' => ['full_time', 'full_time', 'full_time', 'part_time', 'contractor'][rand(0, 4)],
            'work_location' => $locations[array_rand($locations)],
            'status' => ['active', 'active', 'active', 'active', 'on_leave', 'terminated'][rand(0, 5)]
        ];
    }
    
    // Contracts
    $contracts = [];
    for ($i = 0; $i < $numEmployees; $i++) {
        $startDate = $employees[$i]['hire_date'];
        $contracts[] = [
            'contract_id' => $i + 1,
            'employee_id' => $i + 1,
            'contract_type' => ['permanent', 'permanent', 'fixed_term', 'internship'][rand(0, 3)],
            'start_date' => $startDate,
            'end_date' => rand(0, 3) === 0 ? date('Y-m-d', strtotime($startDate . ' +' . rand(6, 24) . ' months')) : null,
            'probation_end_date' => date('Y-m-d', strtotime($startDate . ' +3 months')),
            'notice_period_days' => [15, 30, 30, 60][rand(0, 3)],
            'signed_date' => $startDate
        ];
    }
    
    // Salaries (current)
    $salaries = [];
    for ($i = 0; $i < $numEmployees; $i++) {
        $position = $positions[$employees[$i]['position_id'] - 1];
        $baseSalary = rand($position['min_salary'], $position['max_salary']);
        $salaries[] = [
            'salary_id' => $i + 1,
            'employee_id' => $i + 1,
            'base_salary' => $baseSalary,
            'currency' => 'USD',
            'bonus_percentage' => rand(0, 20),
            'effective_date' => $employees[$i]['hire_date'],
            'pay_frequency' => 'monthly'
        ];
    }
    
    // Salary History
    $salaryHistory = [];
    $historyId = 1;
    for ($i = 0; $i < min($numEmployees, 200); $i++) {
        $numChanges = rand(0, 4);
        for ($j = 0; $j < $numChanges; $j++) {
            $salaryHistory[] = [
                'history_id' => $historyId++,
                'employee_id' => $i + 1,
                'old_salary' => rand(30000, 80000),
                'new_salary' => rand(35000, 100000),
                'change_reason' => ['promotion', 'annual_review', 'market_adjustment', 'role_change'][rand(0, 3)],
                'effective_date' => randomDate('2018-01-01', '2024-01-01'),
                'approved_by' => rand(1, 20)
            ];
        }
    }
    
    // Benefits
    $benefitTypes = [];
    $benefitNames = ['Health Insurance', 'Dental', 'Vision', 'Life Insurance', '401k Match', 'Gym Membership', 'Education Stipend', 'Remote Work Allowance'];
    for ($i = 0; $i < count($benefitNames); $i++) {
        $benefitTypes[] = [
            'benefit_type_id' => $i + 1,
            'benefit_name' => $benefitNames[$i],
            'description' => 'Company ' . $benefitNames[$i] . ' benefit',
            'monthly_cost' => rand(50, 500),
            'is_taxable' => rand(0, 1)
        ];
    }
    
    // Employee Benefits
    $employeeBenefits = [];
    $benefitId = 1;
    for ($i = 0; $i < $numEmployees; $i++) {
        $numBenefits = rand(2, 5);
        $assignedBenefits = [];
        for ($j = 0; $j < $numBenefits; $j++) {
            $benefitTypeId = rand(1, count($benefitNames));
            if (!in_array($benefitTypeId, $assignedBenefits)) {
                $assignedBenefits[] = $benefitTypeId;
                $employeeBenefits[] = [
                    'enrollment_id' => $benefitId++,
                    'employee_id' => $i + 1,
                    'benefit_type_id' => $benefitTypeId,
                    'enrollment_date' => $employees[$i]['hire_date'],
                    'coverage_level' => ['individual', 'individual_spouse', 'family'][rand(0, 2)],
                    'is_active' => rand(0, 10) > 0
                ];
            }
        }
    }
    
    // Time Off Balances
    $timeOffBalances = [];
    for ($i = 0; $i < $numEmployees; $i++) {
        $timeOffBalances[] = [
            'balance_id' => $i + 1,
            'employee_id' => $i + 1,
            'vacation_days' => rand(10, 25),
            'sick_days' => rand(5, 15),
            'personal_days' => rand(2, 5),
            'vacation_used' => rand(0, 15),
            'sick_used' => rand(0, 8),
            'personal_used' => rand(0, 3),
            'year' => 2024
        ];
    }
    
    // Time Off Requests
    $timeOffRequests = [];
    $numRequests = min($rows, 300);
    for ($i = 0; $i < $numRequests; $i++) {
        $startDate = randomDate('2024-01-01', '2024-12-31');
        $timeOffRequests[] = [
            'request_id' => $i + 1,
            'employee_id' => rand(1, $numEmployees),
            'request_type' => ['vacation', 'sick', 'personal', 'unpaid'][rand(0, 3)],
            'start_date' => $startDate,
            'end_date' => date('Y-m-d', strtotime($startDate . ' +' . rand(1, 10) . ' days')),
            'days_requested' => rand(1, 10),
            'reason' => ['Family vacation', 'Medical appointment', 'Personal matters', 'Travel'][rand(0, 3)],
            'status' => ['approved', 'approved', 'pending', 'rejected'][rand(0, 3)],
            'approved_by' => rand(1, 20),
            'requested_at' => randomDateTime('2024-01-01', date('Y-m-d'))
        ];
    }
    
    // Performance Reviews
    $performanceReviews = [];
    $reviewId = 1;
    for ($i = 0; $i < min($numEmployees, 200); $i++) {
        $numReviews = rand(1, 3);
        for ($j = 0; $j < $numReviews; $j++) {
            $performanceReviews[] = [
                'review_id' => $reviewId++,
                'employee_id' => $i + 1,
                'reviewer_id' => $employees[$i]['manager_id'] ?? rand(1, 10),
                'review_period' => ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Annual 2023'][rand(0, 4)],
                'overall_rating' => round(rand(20, 50) / 10, 1),
                'technical_skills' => round(rand(20, 50) / 10, 1),
                'communication' => round(rand(20, 50) / 10, 1),
                'teamwork' => round(rand(20, 50) / 10, 1),
                'leadership' => round(rand(20, 50) / 10, 1),
                'comments' => 'Performance review feedback',
                'review_date' => randomDate('2023-01-01', '2024-06-01'),
                'status' => ['completed', 'completed', 'in_progress', 'scheduled'][rand(0, 3)]
            ];
        }
    }
    
    // Goals
    $goals = [];
    $goalId = 1;
    for ($i = 0; $i < min($numEmployees, 150); $i++) {
        $numGoals = rand(2, 5);
        for ($j = 0; $j < $numGoals; $j++) {
            $goals[] = [
                'goal_id' => $goalId++,
                'employee_id' => $i + 1,
                'goal_title' => ['Improve code quality', 'Increase sales by 20%', 'Complete certification', 'Lead new project', 'Mentor junior team member'][rand(0, 4)],
                'description' => 'Goal description and success criteria',
                'target_date' => randomDate('2024-06-01', '2024-12-31'),
                'progress_percentage' => rand(0, 100),
                'status' => ['not_started', 'in_progress', 'completed', 'cancelled'][rand(0, 3)],
                'created_at' => randomDate('2024-01-01', '2024-03-01')
            ];
        }
    }
    
    // Trainings
    $trainings = [];
    $trainingNames = ['Leadership Fundamentals', 'AWS Certification Prep', 'Project Management', 'Communication Skills', 
                      'Data Analytics', 'Security Awareness', 'Agile Methodology', 'Python for Data', 
                      'SQL Advanced', 'Public Speaking', 'Conflict Resolution', 'Time Management',
                      'Excel Advanced', 'Presentation Skills', 'Negotiation'];
    for ($i = 0; $i < count($trainingNames); $i++) {
        $trainings[] = [
            'training_id' => $i + 1,
            'training_name' => $trainingNames[$i],
            'provider' => ['Internal', 'Coursera', 'LinkedIn Learning', 'Udemy', 'External Vendor'][rand(0, 4)],
            'duration_hours' => rand(4, 40),
            'cost_per_person' => rand(0, 500),
            'is_mandatory' => rand(0, 4) === 0,
            'category' => ['Technical', 'Soft Skills', 'Leadership', 'Compliance'][rand(0, 3)]
        ];
    }
    
    // Employee Trainings
    $employeeTrainings = [];
    $trainingEnrollmentId = 1;
    for ($i = 0; $i < min($numEmployees, 200); $i++) {
        $numTrainings = rand(1, 4);
        for ($j = 0; $j < $numTrainings; $j++) {
            $completedDate = rand(0, 2) > 0 ? randomDate('2023-01-01', '2024-06-01') : null;
            $employeeTrainings[] = [
                'enrollment_id' => $trainingEnrollmentId++,
                'employee_id' => $i + 1,
                'training_id' => rand(1, count($trainingNames)),
                'enrolled_date' => randomDate('2023-01-01', '2024-03-01'),
                'completed_date' => $completedDate,
                'score' => $completedDate ? rand(60, 100) : null,
                'status' => $completedDate ? 'completed' : ['enrolled', 'in_progress'][rand(0, 1)]
            ];
        }
    }
    
    // Job Postings
    $jobPostings = [];
    for ($i = 0; $i < $numJobPostings; $i++) {
        $jobPostings[] = [
            'posting_id' => $i + 1,
            'position_id' => rand(1, count($positionData)),
            'department_id' => rand(1, $numDepartments),
            'title' => $positionData[rand(0, count($positionData) - 1)][0],
            'description' => 'We are looking for a talented professional to join our team.',
            'requirements' => '3+ years experience, relevant skills',
            'salary_min' => rand(40000, 80000),
            'salary_max' => rand(90000, 150000),
            'location' => $locations[array_rand($locations)],
            'posted_date' => randomDate('2024-01-01', '2024-06-01'),
            'closing_date' => randomDate('2024-07-01', '2024-12-31'),
            'status' => ['open', 'open', 'closed', 'filled'][rand(0, 3)],
            'hiring_manager_id' => rand(1, 20)
        ];
    }
    
    // Candidates
    $candidates = [];
    $numCandidates = min($rows / 3, 100);
    for ($i = 0; $i < $numCandidates; $i++) {
        $candidates[] = [
            'candidate_id' => $i + 1,
            'posting_id' => rand(1, $numJobPostings),
            'first_name' => $firstNames[array_rand($firstNames)],
            'last_name' => $lastNames[array_rand($lastNames)],
            'email' => 'candidate' . ($i + 1) . '@email.com',
            'phone' => '+54 9 11 ' . rand(1000, 9999) . '-' . rand(1000, 9999),
            'resume_url' => 'https://storage.company.com/resumes/' . ($i + 1) . '.pdf',
            'source' => ['LinkedIn', 'Indeed', 'Referral', 'Company Website', 'Recruiter'][rand(0, 4)],
            'applied_date' => randomDate('2024-01-01', '2024-06-01'),
            'status' => ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'][rand(0, 5)]
        ];
    }
    
    // Interviews
    $interviews = [];
    $numInterviews = min($numCandidates * 2, 150);
    for ($i = 0; $i < $numInterviews; $i++) {
        $interviews[] = [
            'interview_id' => $i + 1,
            'candidate_id' => rand(1, $numCandidates),
            'interviewer_id' => rand(1, $numEmployees),
            'interview_type' => ['phone_screen', 'technical', 'behavioral', 'final', 'culture_fit'][rand(0, 4)],
            'scheduled_date' => randomDateTime('2024-01-01', '2024-06-01'),
            'duration_minutes' => [30, 45, 60, 90][rand(0, 3)],
            'rating' => rand(1, 5),
            'feedback' => 'Interview feedback and notes',
            'recommendation' => ['strong_hire', 'hire', 'no_hire', 'undecided'][rand(0, 3)],
            'status' => ['scheduled', 'completed', 'cancelled', 'no_show'][rand(0, 3)]
        ];
    }
    
    return [
        'description' => 'Sistema de RRHH completo: empleados, departamentos, salarios, beneficios, vacaciones, evaluaciones, capacitaciones y recruitment',
        'tables' => [
            'departments' => $departments,
            'positions' => $positions,
            'employees' => $employees,
            'contracts' => $contracts,
            'salaries' => $salaries,
            'salary_history' => $salaryHistory,
            'benefit_types' => $benefitTypes,
            'employee_benefits' => $employeeBenefits,
            'time_off_balances' => $timeOffBalances,
            'time_off_requests' => $timeOffRequests,
            'performance_reviews' => $performanceReviews,
            'goals' => $goals,
            'trainings' => $trainings,
            'employee_trainings' => $employeeTrainings,
            'job_postings' => $jobPostings,
            'candidates' => $candidates,
            'interviews' => $interviews
        ],
        'schema' => [
            'departments' => ['department_id (PK)', 'department_name', 'department_code', 'budget', 'location', 'head_count_limit', 'cost_center', 'created_at'],
            'positions' => ['position_id (PK)', 'position_title', 'level', 'department_name', 'min_salary', 'max_salary', 'is_remote_eligible', 'requires_travel'],
            'employees' => ['employee_id (PK)', 'employee_code', 'first_name', 'last_name', 'email', 'phone', 'birth_date', 'gender', 'department_id (FK)', 'position_id (FK)', 'manager_id (FK)', 'hire_date', 'employment_type', 'work_location', 'status'],
            'contracts' => ['contract_id (PK)', 'employee_id (FK)', 'contract_type', 'start_date', 'end_date', 'probation_end_date', 'notice_period_days', 'signed_date'],
            'salaries' => ['salary_id (PK)', 'employee_id (FK)', 'base_salary', 'currency', 'bonus_percentage', 'effective_date', 'pay_frequency'],
            'salary_history' => ['history_id (PK)', 'employee_id (FK)', 'old_salary', 'new_salary', 'change_reason', 'effective_date', 'approved_by (FK)'],
            'benefit_types' => ['benefit_type_id (PK)', 'benefit_name', 'description', 'monthly_cost', 'is_taxable'],
            'employee_benefits' => ['enrollment_id (PK)', 'employee_id (FK)', 'benefit_type_id (FK)', 'enrollment_date', 'coverage_level', 'is_active'],
            'time_off_balances' => ['balance_id (PK)', 'employee_id (FK)', 'vacation_days', 'sick_days', 'personal_days', 'vacation_used', 'sick_used', 'personal_used', 'year'],
            'time_off_requests' => ['request_id (PK)', 'employee_id (FK)', 'request_type', 'start_date', 'end_date', 'days_requested', 'reason', 'status', 'approved_by (FK)', 'requested_at'],
            'performance_reviews' => ['review_id (PK)', 'employee_id (FK)', 'reviewer_id (FK)', 'review_period', 'overall_rating', 'technical_skills', 'communication', 'teamwork', 'leadership', 'comments', 'review_date', 'status'],
            'goals' => ['goal_id (PK)', 'employee_id (FK)', 'goal_title', 'description', 'target_date', 'progress_percentage', 'status', 'created_at'],
            'trainings' => ['training_id (PK)', 'training_name', 'provider', 'duration_hours', 'cost_per_person', 'is_mandatory', 'category'],
            'employee_trainings' => ['enrollment_id (PK)', 'employee_id (FK)', 'training_id (FK)', 'enrolled_date', 'completed_date', 'score', 'status'],
            'job_postings' => ['posting_id (PK)', 'position_id (FK)', 'department_id (FK)', 'title', 'description', 'requirements', 'salary_min', 'salary_max', 'location', 'posted_date', 'closing_date', 'status', 'hiring_manager_id (FK)'],
            'candidates' => ['candidate_id (PK)', 'posting_id (FK)', 'first_name', 'last_name', 'email', 'phone', 'resume_url', 'source', 'applied_date', 'status'],
            'interviews' => ['interview_id (PK)', 'candidate_id (FK)', 'interviewer_id (FK)', 'interview_type', 'scheduled_date', 'duration_minutes', 'rating', 'feedback', 'recommendation', 'status']
        ],
        'relationships' => [
            'employees.department_id -> departments.department_id',
            'employees.position_id -> positions.position_id',
            'employees.manager_id -> employees.employee_id',
            'contracts.employee_id -> employees.employee_id',
            'salaries.employee_id -> employees.employee_id',
            'salary_history.employee_id -> employees.employee_id',
            'salary_history.approved_by -> employees.employee_id',
            'employee_benefits.employee_id -> employees.employee_id',
            'employee_benefits.benefit_type_id -> benefit_types.benefit_type_id',
            'time_off_balances.employee_id -> employees.employee_id',
            'time_off_requests.employee_id -> employees.employee_id',
            'performance_reviews.employee_id -> employees.employee_id',
            'performance_reviews.reviewer_id -> employees.employee_id',
            'goals.employee_id -> employees.employee_id',
            'employee_trainings.employee_id -> employees.employee_id',
            'employee_trainings.training_id -> trainings.training_id',
            'job_postings.position_id -> positions.position_id',
            'job_postings.department_id -> departments.department_id',
            'candidates.posting_id -> job_postings.posting_id',
            'interviews.candidate_id -> candidates.candidate_id',
            'interviews.interviewer_id -> employees.employee_id'
        ]
    ];
}

// ============================================
// SMART FACTORY IoT DATASET - SISTEMA COMPLETO
// ============================================
function generateIoTDataset($rows, $t) {
    $numFactories = 3;
    $numProductionLines = 8;
    $numMachines = 25;
    $numSensors = 60;
    $numOperators = 30;
    $numShifts = 3;
    
    // Factories (translated locations)
    $factories = [];
    $factoryLocations = array_slice($t['cities'], 0, 3);
    for ($i = 0; $i < $numFactories; $i++) {
        $factories[] = [
            'factory_id' => $i + 1,
            'factory_name' => 'Plant ' . ($i + 1),
            'location' => $factoryLocations[$i],
            'address' => 'Industrial Zone ' . ($i + 1),
            'total_area_sqm' => rand(5000, 20000),
            'established_date' => randomDate('2000-01-01', '2015-12-31'),
            'manager_name' => $t['manager_names'][array_rand($t['manager_names'])],
            'is_active' => true
        ];
    }
    
    // Production Lines
    $productionLines = [];
    $lineTypes = ['Assembly', 'Packaging', 'Quality Control', 'Welding', 'Painting', 'Machining', 'Electronics', 'Final Assembly'];
    for ($i = 0; $i < $numProductionLines; $i++) {
        $productionLines[] = [
            'line_id' => $i + 1,
            'factory_id' => rand(1, $numFactories),
            'line_name' => 'Línea ' . ($i + 1) . ' - ' . $lineTypes[$i],
            'line_type' => $lineTypes[$i],
            'capacity_units_per_hour' => rand(50, 500),
            'status' => ['running', 'running', 'running', 'maintenance', 'idle'][rand(0, 4)],
            'installed_date' => randomDate('2015-01-01', '2022-12-31')
        ];
    }
    
    // Machines
    $machines = [];
    $machineTypes = ['CNC Mill', 'Lathe', 'Robot Arm', 'Conveyor', 'Press', 'Welder', 'Printer', 'Cutter', 'Dryer', 'Mixer'];
    $manufacturers = ['Siemens', 'ABB', 'Fanuc', 'Kuka', 'Bosch', 'Mitsubishi'];
    for ($i = 0; $i < $numMachines; $i++) {
        $machines[] = [
            'machine_id' => $i + 1,
            'line_id' => rand(1, $numProductionLines),
            'machine_name' => 'Machine-' . strtoupper(bin2hex(random_bytes(2))),
            'machine_type' => $machineTypes[array_rand($machineTypes)],
            'manufacturer' => $manufacturers[array_rand($manufacturers)],
            'model' => 'Model-' . rand(1000, 9999),
            'serial_number' => 'SN-' . strtoupper(bin2hex(random_bytes(6))),
            'installation_date' => randomDate('2018-01-01', '2023-12-31'),
            'last_maintenance_date' => randomDate('2024-01-01', date('Y-m-d')),
            'next_maintenance_date' => randomDate(date('Y-m-d'), '2025-12-31'),
            'status' => ['operational', 'operational', 'operational', 'maintenance', 'fault'][rand(0, 4)],
            'operating_hours' => rand(1000, 50000)
        ];
    }
    
    // Sensors
    $sensors = [];
    $sensorTypes = ['temperature', 'vibration', 'pressure', 'humidity', 'speed', 'current', 'voltage', 'flow_rate', 'level', 'proximity'];
    for ($i = 0; $i < $numSensors; $i++) {
        $sensorType = $sensorTypes[array_rand($sensorTypes)];
        $sensors[] = [
            'sensor_id' => $i + 1,
            'machine_id' => rand(1, $numMachines),
            'sensor_name' => 'Sensor-' . strtoupper(bin2hex(random_bytes(3))),
            'sensor_type' => $sensorType,
            'unit' => ['°C', 'mm/s', 'bar', '%', 'rpm', 'A', 'V', 'L/min', '%', 'mm'][array_search($sensorType, $sensorTypes)],
            'min_threshold' => rand(0, 20),
            'max_threshold' => rand(80, 100),
            'calibration_date' => randomDate('2023-01-01', '2024-06-01'),
            'is_active' => rand(0, 10) > 0
        ];
    }
    
    // Sensor Readings (main fact table)
    $sensorReadings = [];
    for ($i = 0; $i < $rows; $i++) {
        $sensorId = rand(1, $numSensors);
        $sensor = $sensors[$sensorId - 1];
        
        // Generate realistic values based on sensor type
        $value = 0;
        switch ($sensor['sensor_type']) {
            case 'temperature': $value = round(rand(200, 800) / 10, 1); break;
            case 'vibration': $value = round(rand(0, 100) / 10, 2); break;
            case 'pressure': $value = round(rand(10, 100) / 10, 1); break;
            case 'humidity': $value = round(rand(300, 800) / 10, 1); break;
            case 'speed': $value = rand(100, 5000); break;
            case 'current': $value = round(rand(10, 500) / 10, 1); break;
            case 'voltage': $value = round(rand(2100, 2400) / 10, 1); break;
            case 'flow_rate': $value = round(rand(10, 1000) / 10, 1); break;
            case 'level': $value = rand(0, 100); break;
            case 'proximity': $value = rand(0, 500); break;
        }
        
        $isAnomaly = $value > $sensor['max_threshold'] || $value < $sensor['min_threshold'];
        
        $sensorReadings[] = [
            'reading_id' => $i + 1,
            'sensor_id' => $sensorId,
            'machine_id' => $sensor['machine_id'],
            'timestamp' => randomDateTime('2024-01-01', date('Y-m-d')),
            'value' => $value,
            'is_anomaly' => $isAnomaly,
            'quality_score' => rand(80, 100)
        ];
    }
    
    // Alerts
    $alerts = [];
    $alertTypes = ['threshold_exceeded', 'sensor_offline', 'machine_fault', 'maintenance_due', 'quality_issue'];
    $numAlerts = min(ceil($rows / 20), 100);
    for ($i = 0; $i < $numAlerts; $i++) {
        $triggeredAt = randomDateTime('2024-01-01', date('Y-m-d'));
        $isResolved = rand(0, 3) > 0;
        $alerts[] = [
            'alert_id' => $i + 1,
            'machine_id' => rand(1, $numMachines),
            'sensor_id' => rand(1, $numSensors),
            'alert_type' => $alertTypes[array_rand($alertTypes)],
            'severity' => ['low', 'medium', 'high', 'critical'][rand(0, 3)],
            'message' => 'Alert triggered for machine/sensor',
            'triggered_at' => $triggeredAt,
            'acknowledged_at' => rand(0, 1) ? date('Y-m-d H:i:s', strtotime($triggeredAt) + rand(60, 3600)) : null,
            'resolved_at' => $isResolved ? date('Y-m-d H:i:s', strtotime($triggeredAt) + rand(600, 14400)) : null,
            'resolved_by' => $isResolved ? 'Operator ' . rand(1, $numOperators) : null
        ];
    }
    
    // Maintenance Schedules
    $maintenanceSchedules = [];
    for ($i = 0; $i < $numMachines; $i++) {
        $maintenanceSchedules[] = [
            'schedule_id' => $i + 1,
            'machine_id' => $i + 1,
            'maintenance_type' => ['preventive', 'predictive', 'corrective'][rand(0, 2)],
            'frequency_days' => [7, 14, 30, 60, 90][rand(0, 4)],
            'last_performed' => randomDate('2024-01-01', date('Y-m-d')),
            'next_scheduled' => randomDate(date('Y-m-d'), '2025-06-30'),
            'estimated_duration_hours' => rand(1, 8),
            'assigned_technician' => 'Technician ' . rand(1, 10)
        ];
    }
    
    // Maintenance Logs
    $maintenanceLogs = [];
    $numLogs = min($numMachines * 3, 75);
    for ($i = 0; $i < $numLogs; $i++) {
        $maintenanceLogs[] = [
            'log_id' => $i + 1,
            'machine_id' => rand(1, $numMachines),
            'performed_date' => randomDateTime('2023-01-01', date('Y-m-d')),
            'maintenance_type' => ['preventive', 'predictive', 'corrective', 'emergency'][rand(0, 3)],
            'description' => 'Maintenance performed on machine',
            'parts_replaced' => rand(0, 1) ? 'Part A, Part B' : null,
            'cost' => round(rand(100, 5000), 2),
            'downtime_hours' => round(rand(1, 24) / 2, 1),
            'performed_by' => 'Technician ' . rand(1, 10)
        ];
    }
    
    // Operators
    $operators = [];
    $firstNames = ['Juan', 'María', 'Carlos', 'Ana', 'Pedro', 'Laura'];
    $lastNames = ['García', 'Rodríguez', 'López', 'Martínez'];
    for ($i = 0; $i < $numOperators; $i++) {
        $operators[] = [
            'operator_id' => $i + 1,
            'first_name' => $firstNames[array_rand($firstNames)],
            'last_name' => $lastNames[array_rand($lastNames)],
            'employee_code' => 'OP-' . str_pad($i + 1, 4, '0', STR_PAD_LEFT),
            'certification_level' => ['basic', 'intermediate', 'advanced', 'expert'][rand(0, 3)],
            'assigned_line_id' => rand(1, $numProductionLines),
            'hire_date' => randomDate('2018-01-01', '2023-12-31'),
            'is_active' => rand(0, 10) > 0
        ];
    }
    
    // Shifts
    $shifts = [];
    $shiftNames = ['Mañana', 'Tarde', 'Noche'];
    for ($i = 0; $i < $numShifts; $i++) {
        $shifts[] = [
            'shift_id' => $i + 1,
            'shift_name' => $shiftNames[$i],
            'start_time' => ['06:00:00', '14:00:00', '22:00:00'][$i],
            'end_time' => ['14:00:00', '22:00:00', '06:00:00'][$i],
            'break_duration_minutes' => 30
        ];
    }
    
    // Production Orders
    $productionOrders = [];
    $numOrders = min(ceil($rows / 10), 100);
    for ($i = 0; $i < $numOrders; $i++) {
        $startDate = randomDate('2024-01-01', '2024-06-01');
        $productionOrders[] = [
            'order_id' => $i + 1,
            'line_id' => rand(1, $numProductionLines),
            'product_code' => 'PROD-' . str_pad(rand(1, 100), 4, '0', STR_PAD_LEFT),
            'quantity_ordered' => rand(100, 10000),
            'quantity_produced' => rand(50, 10000),
            'start_date' => $startDate,
            'target_end_date' => date('Y-m-d', strtotime($startDate . ' +' . rand(1, 14) . ' days')),
            'actual_end_date' => rand(0, 3) > 0 ? date('Y-m-d', strtotime($startDate . ' +' . rand(1, 14) . ' days')) : null,
            'status' => ['planned', 'in_progress', 'completed', 'delayed'][rand(0, 3)],
            'priority' => ['low', 'medium', 'high', 'urgent'][rand(0, 3)]
        ];
    }
    
    // Production Output (time series)
    $productionOutput = [];
    $numOutputRecords = min($rows, 500);
    for ($i = 0; $i < $numOutputRecords; $i++) {
        $productionOutput[] = [
            'output_id' => $i + 1,
            'order_id' => rand(1, $numOrders),
            'line_id' => rand(1, $numProductionLines),
            'shift_id' => rand(1, $numShifts),
            'production_date' => randomDate('2024-01-01', date('Y-m-d')),
            'units_produced' => rand(50, 500),
            'units_defective' => rand(0, 20),
            'downtime_minutes' => rand(0, 60),
            'efficiency_percentage' => round(rand(750, 990) / 10, 1)
        ];
    }
    
    // Quality Checks
    $qualityChecks = [];
    $numChecks = min(ceil($rows / 5), 200);
    for ($i = 0; $i < $numChecks; $i++) {
        $qualityChecks[] = [
            'check_id' => $i + 1,
            'order_id' => rand(1, $numOrders),
            'line_id' => rand(1, $numProductionLines),
            'check_date' => randomDateTime('2024-01-01', date('Y-m-d')),
            'sample_size' => rand(10, 100),
            'defects_found' => rand(0, 10),
            'check_type' => ['visual', 'dimensional', 'functional', 'material'][rand(0, 3)],
            'result' => ['pass', 'pass', 'pass', 'fail', 'conditional'][rand(0, 4)],
            'inspector_id' => rand(1, $numOperators),
            'notes' => rand(0, 1) ? 'Quality check notes' : null
        ];
    }
    
    // Defects
    $defects = [];
    $defectTypes = ['scratch', 'dent', 'misalignment', 'color_variation', 'dimension_error', 'material_defect'];
    $numDefects = min(ceil($rows / 10), 100);
    for ($i = 0; $i < $numDefects; $i++) {
        $defects[] = [
            'defect_id' => $i + 1,
            'check_id' => rand(1, $numChecks),
            'defect_type' => $defectTypes[array_rand($defectTypes)],
            'severity' => ['minor', 'major', 'critical'][rand(0, 2)],
            'description' => 'Defect description',
            'root_cause' => ['machine', 'material', 'operator', 'process', 'unknown'][rand(0, 4)],
            'corrective_action' => rand(0, 1) ? 'Corrective action taken' : null,
            'detected_at' => randomDateTime('2024-01-01', date('Y-m-d'))
        ];
    }
    
    return [
        'description' => 'Fábrica inteligente completa: líneas de producción, máquinas, sensores, mantenimiento, calidad y métricas de producción',
        'tables' => [
            'factories' => $factories,
            'production_lines' => $productionLines,
            'machines' => $machines,
            'sensors' => $sensors,
            'sensor_readings' => $sensorReadings,
            'alerts' => $alerts,
            'maintenance_schedules' => $maintenanceSchedules,
            'maintenance_logs' => $maintenanceLogs,
            'operators' => $operators,
            'shifts' => $shifts,
            'production_orders' => $productionOrders,
            'production_output' => $productionOutput,
            'quality_checks' => $qualityChecks,
            'defects' => $defects
        ],
        'schema' => [
            'factories' => ['factory_id (PK)', 'factory_name', 'location', 'address', 'total_area_sqm', 'established_date', 'manager_name', 'is_active'],
            'production_lines' => ['line_id (PK)', 'factory_id (FK)', 'line_name', 'line_type', 'capacity_units_per_hour', 'status', 'installed_date'],
            'machines' => ['machine_id (PK)', 'line_id (FK)', 'machine_name', 'machine_type', 'manufacturer', 'model', 'serial_number', 'installation_date', 'last_maintenance_date', 'next_maintenance_date', 'status', 'operating_hours'],
            'sensors' => ['sensor_id (PK)', 'machine_id (FK)', 'sensor_name', 'sensor_type', 'unit', 'min_threshold', 'max_threshold', 'calibration_date', 'is_active'],
            'sensor_readings' => ['reading_id (PK)', 'sensor_id (FK)', 'machine_id (FK)', 'timestamp', 'value', 'is_anomaly', 'quality_score'],
            'alerts' => ['alert_id (PK)', 'machine_id (FK)', 'sensor_id (FK)', 'alert_type', 'severity', 'message', 'triggered_at', 'acknowledged_at', 'resolved_at', 'resolved_by'],
            'maintenance_schedules' => ['schedule_id (PK)', 'machine_id (FK)', 'maintenance_type', 'frequency_days', 'last_performed', 'next_scheduled', 'estimated_duration_hours', 'assigned_technician'],
            'maintenance_logs' => ['log_id (PK)', 'machine_id (FK)', 'performed_date', 'maintenance_type', 'description', 'parts_replaced', 'cost', 'downtime_hours', 'performed_by'],
            'operators' => ['operator_id (PK)', 'first_name', 'last_name', 'employee_code', 'certification_level', 'assigned_line_id (FK)', 'hire_date', 'is_active'],
            'shifts' => ['shift_id (PK)', 'shift_name', 'start_time', 'end_time', 'break_duration_minutes'],
            'production_orders' => ['order_id (PK)', 'line_id (FK)', 'product_code', 'quantity_ordered', 'quantity_produced', 'start_date', 'target_end_date', 'actual_end_date', 'status', 'priority'],
            'production_output' => ['output_id (PK)', 'order_id (FK)', 'line_id (FK)', 'shift_id (FK)', 'production_date', 'units_produced', 'units_defective', 'downtime_minutes', 'efficiency_percentage'],
            'quality_checks' => ['check_id (PK)', 'order_id (FK)', 'line_id (FK)', 'check_date', 'sample_size', 'defects_found', 'check_type', 'result', 'inspector_id (FK)', 'notes'],
            'defects' => ['defect_id (PK)', 'check_id (FK)', 'defect_type', 'severity', 'description', 'root_cause', 'corrective_action', 'detected_at']
        ],
        'relationships' => [
            'production_lines.factory_id -> factories.factory_id',
            'machines.line_id -> production_lines.line_id',
            'sensors.machine_id -> machines.machine_id',
            'sensor_readings.sensor_id -> sensors.sensor_id',
            'sensor_readings.machine_id -> machines.machine_id',
            'alerts.machine_id -> machines.machine_id',
            'alerts.sensor_id -> sensors.sensor_id',
            'maintenance_schedules.machine_id -> machines.machine_id',
            'maintenance_logs.machine_id -> machines.machine_id',
            'operators.assigned_line_id -> production_lines.line_id',
            'production_orders.line_id -> production_lines.line_id',
            'production_output.order_id -> production_orders.order_id',
            'production_output.line_id -> production_lines.line_id',
            'production_output.shift_id -> shifts.shift_id',
            'quality_checks.order_id -> production_orders.order_id',
            'quality_checks.line_id -> production_lines.line_id',
            'quality_checks.inspector_id -> operators.operator_id',
            'defects.check_id -> quality_checks.check_id'
        ]
    ];
}

// ============================================
// STREAMING PLATFORM DATASET - SISTEMA COMPLETO
// ============================================
function generateStreamingDataset($rows, $t) {
    $numUsers = min(ceil($rows / 4), 500);
    $numProfiles = $numUsers * 2; // ~2 profiles per user
    $numContent = min(ceil($rows / 3), 300);
    $numSeries = 30;
    $numGenres = 12;
    $numPlans = 4;
    
    // Subscription Plans
    $subscriptionPlans = [
        ['plan_id' => 1, 'plan_name' => 'Free', 'price_monthly' => 0, 'max_profiles' => 1, 'max_quality' => 'SD', 'ads_enabled' => true, 'downloads_enabled' => false],
        ['plan_id' => 2, 'plan_name' => 'Basic', 'price_monthly' => 4.99, 'max_profiles' => 2, 'max_quality' => 'HD', 'ads_enabled' => true, 'downloads_enabled' => false],
        ['plan_id' => 3, 'plan_name' => 'Standard', 'price_monthly' => 9.99, 'max_profiles' => 4, 'max_quality' => 'Full HD', 'ads_enabled' => false, 'downloads_enabled' => true],
        ['plan_id' => 4, 'plan_name' => 'Premium', 'price_monthly' => 14.99, 'max_profiles' => 6, 'max_quality' => '4K HDR', 'ads_enabled' => false, 'downloads_enabled' => true]
    ];
    
    // Genres (translated)
    $genres = [];
    $genreNames = $t['genres'];
    // Extend with more genres
    $genreNames = array_merge($genreNames, ['Thriller', 'Fantasy', 'Crime', 'Family']);
    for ($i = 0; $i < min($numGenres, count($genreNames)); $i++) {
        $genres[] = [
            'genre_id' => $i + 1,
            'genre_name' => $genreNames[$i],
            'description' => strtolower($genreNames[$i])
        ];
    }
    
    // Users (translated)
    $users = [];
    $countries = $t['customer_countries'];
    $firstNames = $t['first_names'];
    $lastNames = $t['last_names'];
    for ($i = 0; $i < $numUsers; $i++) {
        $registrationDate = randomDate('2020-01-01', '2024-06-01');
        $users[] = [
            'user_id' => $i + 1,
            'email' => 'user' . ($i + 1) . '@streaming.com',
            'password_hash' => 'hashed_password_' . ($i + 1),
            'first_name' => $firstNames[array_rand($firstNames)],
            'last_name' => $lastNames[array_rand($lastNames)],
            'phone' => '+1 ' . rand(200, 999) . '-' . rand(100, 999) . '-' . rand(1000, 9999),
            'country' => $countries[array_rand($countries)],
            'language' => ['es', 'en', 'pt'][rand(0, 2)],
            'registration_date' => $registrationDate,
            'last_login' => randomDateTime($registrationDate, date('Y-m-d')),
            'is_active' => rand(0, 10) > 1
        ];
    }
    
    // Profiles
    $profiles = [];
    $profileNames = ['Principal', 'Niños', 'Pareja', 'Invitado', 'Personal'];
    for ($i = 0; $i < $numProfiles; $i++) {
        $userId = ($i % $numUsers) + 1;
        $profiles[] = [
            'profile_id' => $i + 1,
            'user_id' => $userId,
            'profile_name' => $profileNames[rand(0, 4)] . ' ' . rand(1, 99),
            'avatar_url' => 'https://cdn.streaming.com/avatars/' . rand(1, 50) . '.png',
            'is_kids_profile' => rand(0, 4) === 0,
            'maturity_rating' => ['G', 'PG', 'PG-13', 'R'][rand(0, 3)],
            'language_preference' => ['es', 'en', 'pt'][rand(0, 2)],
            'autoplay_enabled' => rand(0, 1),
            'created_at' => randomDate('2020-01-01', '2024-06-01')
        ];
    }
    
    // Subscriptions
    $subscriptions = [];
    for ($i = 0; $i < $numUsers; $i++) {
        $planId = rand(1, $numPlans);
        $startDate = randomDate('2020-01-01', '2024-01-01');
        $subscriptions[] = [
            'subscription_id' => $i + 1,
            'user_id' => $i + 1,
            'plan_id' => $planId,
            'status' => ['active', 'active', 'active', 'cancelled', 'paused'][rand(0, 4)],
            'start_date' => $startDate,
            'next_billing_date' => date('Y-m-d', strtotime($startDate . ' +1 month')),
            'payment_method' => ['credit_card', 'debit_card', 'paypal', 'gift_card'][rand(0, 3)],
            'auto_renew' => rand(0, 1)
        ];
    }
    
    // Content (movies, documentaries)
    $content = [];
    $contentTitles = ['El Último Viaje', 'Amor en París', 'Noche Eterna', 'La Gran Aventura', 'Secretos del Mar', 
                      'Furia Salvaje', 'Corazón de Hielo', 'El Misterio', 'Sueños Rotos', 'La Promesa'];
    $studios = ['Warner Bros', 'Universal', 'Paramount', 'Sony', 'Disney', 'Netflix Original', 'Amazon Original'];
    $directors = ['Director A', 'Director B', 'Director C', 'Director D', 'Director E'];
    
    for ($i = 0; $i < $numContent; $i++) {
        $type = ['movie', 'movie', 'documentary'][rand(0, 2)];
        $content[] = [
            'content_id' => $i + 1,
            'title' => $contentTitles[rand(0, count($contentTitles) - 1)] . ' ' . ($i + 1),
            'original_title' => 'Original Title ' . ($i + 1),
            'content_type' => $type,
            'description' => 'Descripción del contenido ' . ($i + 1),
            'duration_minutes' => $type === 'movie' ? rand(80, 180) : rand(45, 120),
            'release_year' => rand(2010, 2024),
            'maturity_rating' => ['G', 'PG', 'PG-13', 'R', 'NC-17'][rand(0, 4)],
            'studio' => $studios[array_rand($studios)],
            'director' => $directors[array_rand($directors)],
            'cast' => 'Actor 1, Actor 2, Actor 3',
            'thumbnail_url' => 'https://cdn.streaming.com/thumbnails/' . ($i + 1) . '.jpg',
            'trailer_url' => 'https://cdn.streaming.com/trailers/' . ($i + 1) . '.mp4',
            'avg_rating' => round(rand(25, 50) / 10, 1),
            'total_views' => rand(10000, 10000000),
            'is_original' => rand(0, 3) === 0,
            'added_date' => randomDate('2020-01-01', '2024-06-01')
        ];
    }
    
    // Content Genres (many-to-many)
    $contentGenres = [];
    $cgId = 1;
    for ($i = 1; $i <= $numContent; $i++) {
        $numGenresForContent = rand(1, 3);
        $assignedGenres = [];
        for ($j = 0; $j < $numGenresForContent; $j++) {
            $genreId = rand(1, $numGenres);
            if (!in_array($genreId, $assignedGenres)) {
                $assignedGenres[] = $genreId;
                $contentGenres[] = [
                    'id' => $cgId++,
                    'content_id' => $i,
                    'genre_id' => $genreId,
                    'is_primary' => $j === 0
                ];
            }
        }
    }
    
    // Series
    $series = [];
    $seriesTitles = ['La Casa', 'El Juego', 'Historias', 'Misterios', 'Aventuras', 'Crímenes', 'Drama Total', 'Comedia Show'];
    for ($i = 0; $i < $numSeries; $i++) {
        $series[] = [
            'series_id' => $i + 1,
            'title' => $seriesTitles[rand(0, count($seriesTitles) - 1)] . ' ' . ($i + 1),
            'description' => 'Serie de ' . $genreNames[rand(0, $numGenres - 1)],
            'total_seasons' => rand(1, 8),
            'status' => ['ongoing', 'completed', 'cancelled'][rand(0, 2)],
            'first_air_date' => randomDate('2015-01-01', '2023-01-01'),
            'maturity_rating' => ['PG', 'PG-13', 'R'][rand(0, 2)],
            'avg_rating' => round(rand(30, 50) / 10, 1),
            'studio' => $studios[array_rand($studios)]
        ];
    }
    
    // Episodes
    $episodes = [];
    $episodeId = 1;
    for ($i = 0; $i < $numSeries; $i++) {
        $numSeasons = $series[$i]['total_seasons'];
        for ($season = 1; $season <= $numSeasons; $season++) {
            $numEpisodes = rand(6, 12);
            for ($ep = 1; $ep <= $numEpisodes; $ep++) {
                $episodes[] = [
                    'episode_id' => $episodeId++,
                    'series_id' => $i + 1,
                    'season_number' => $season,
                    'episode_number' => $ep,
                    'title' => 'Episodio ' . $ep,
                    'description' => 'Descripción del episodio',
                    'duration_minutes' => rand(25, 60),
                    'air_date' => randomDate('2015-01-01', '2024-06-01'),
                    'thumbnail_url' => 'https://cdn.streaming.com/episodes/' . $episodeId . '.jpg'
                ];
            }
        }
    }
    
    // Watch History (main fact table)
    $watchHistory = [];
    $devices = ['mobile', 'desktop', 'smart_tv', 'tablet', 'console', 'chromecast'];
    $qualities = ['SD', 'HD', 'Full HD', '4K'];
    
    for ($i = 0; $i < $rows; $i++) {
        $profileId = rand(1, $numProfiles);
        $isEpisode = rand(0, 1);
        $contentId = $isEpisode ? null : rand(1, $numContent);
        $episodeId = $isEpisode ? rand(1, count($episodes)) : null;
        
        $duration = $isEpisode 
            ? (isset($episodes[$episodeId - 1]) ? $episodes[$episodeId - 1]['duration_minutes'] : 45)
            : (isset($content[$contentId - 1]) ? $content[$contentId - 1]['duration_minutes'] : 120);
        $watchedMinutes = rand(1, $duration);
        
        $watchHistory[] = [
            'watch_id' => $i + 1,
            'profile_id' => $profileId,
            'content_id' => $contentId,
            'episode_id' => $episodeId,
            'started_at' => randomDateTime('2024-01-01', date('Y-m-d')),
            'duration_watched_seconds' => $watchedMinutes * 60,
            'completed' => $watchedMinutes >= $duration * 0.9,
            'device_type' => $devices[array_rand($devices)],
            'quality' => $qualities[array_rand($qualities)],
            'country' => $countries[array_rand($countries)]
        ];
    }
    
    // Watch Progress (for resume functionality)
    $watchProgress = [];
    $numProgress = min($rows / 2, 500);
    for ($i = 0; $i < $numProgress; $i++) {
        $watchProgress[] = [
            'progress_id' => $i + 1,
            'profile_id' => rand(1, $numProfiles),
            'content_id' => rand(0, 1) ? rand(1, $numContent) : null,
            'episode_id' => rand(0, 1) ? rand(1, count($episodes)) : null,
            'position_seconds' => rand(0, 7200),
            'last_updated' => randomDateTime('2024-01-01', date('Y-m-d'))
        ];
    }
    
    // Ratings
    $ratings = [];
    $numRatings = min($rows / 3, 400);
    for ($i = 0; $i < $numRatings; $i++) {
        $ratings[] = [
            'rating_id' => $i + 1,
            'profile_id' => rand(1, $numProfiles),
            'content_id' => rand(0, 1) ? rand(1, $numContent) : null,
            'series_id' => rand(0, 1) ? rand(1, $numSeries) : null,
            'rating' => rand(1, 5),
            'created_at' => randomDateTime('2023-01-01', date('Y-m-d'))
        ];
    }
    
    // Reviews
    $reviews = [];
    $numReviews = min($numRatings / 2, 100);
    for ($i = 0; $i < $numReviews; $i++) {
        $reviews[] = [
            'review_id' => $i + 1,
            'profile_id' => rand(1, $numProfiles),
            'content_id' => rand(0, 1) ? rand(1, $numContent) : null,
            'series_id' => rand(0, 1) ? rand(1, $numSeries) : null,
            'title' => 'Review Title ' . ($i + 1),
            'body' => 'This is a review of the content...',
            'is_spoiler' => rand(0, 5) === 0,
            'helpful_count' => rand(0, 500),
            'created_at' => randomDateTime('2023-01-01', date('Y-m-d'))
        ];
    }
    
    // Watchlists
    $watchlists = [];
    $numWatchlistItems = min($rows / 4, 300);
    for ($i = 0; $i < $numWatchlistItems; $i++) {
        $watchlists[] = [
            'watchlist_id' => $i + 1,
            'profile_id' => rand(1, $numProfiles),
            'content_id' => rand(0, 1) ? rand(1, $numContent) : null,
            'series_id' => rand(0, 1) ? rand(1, $numSeries) : null,
            'added_at' => randomDateTime('2023-01-01', date('Y-m-d'))
        ];
    }
    
    // Recommendations
    $recommendations = [];
    $numRecommendations = min($rows / 3, 300);
    for ($i = 0; $i < $numRecommendations; $i++) {
        $recommendations[] = [
            'recommendation_id' => $i + 1,
            'profile_id' => rand(1, $numProfiles),
            'content_id' => rand(0, 1) ? rand(1, $numContent) : null,
            'series_id' => rand(0, 1) ? rand(1, $numSeries) : null,
            'reason' => ['similar_to_watched', 'trending', 'because_you_liked', 'top_picks', 'new_release'][rand(0, 4)],
            'score' => round(rand(50, 100) / 100, 2),
            'generated_at' => randomDateTime('2024-01-01', date('Y-m-d'))
        ];
    }
    
    // Devices (registered devices per user)
    $userDevices = [];
    $numDevices = min($numUsers * 2, 400);
    for ($i = 0; $i < $numDevices; $i++) {
        $userDevices[] = [
            'device_id' => $i + 1,
            'user_id' => rand(1, $numUsers),
            'device_type' => $devices[array_rand($devices)],
            'device_name' => ['iPhone 14', 'Samsung TV', 'MacBook Pro', 'iPad', 'Fire TV Stick', 'PS5'][rand(0, 5)],
            'device_token' => 'token_' . bin2hex(random_bytes(16)),
            'last_used' => randomDateTime('2024-01-01', date('Y-m-d')),
            'is_active' => rand(0, 5) > 0
        ];
    }
    
    return [
        'description' => 'Plataforma de streaming completa: usuarios, perfiles, suscripciones, contenido, series, episodios, historial, ratings, watchlists y recomendaciones',
        'tables' => [
            'subscription_plans' => $subscriptionPlans,
            'genres' => $genres,
            'users' => $users,
            'profiles' => $profiles,
            'subscriptions' => $subscriptions,
            'content' => $content,
            'content_genres' => $contentGenres,
            'series' => $series,
            'episodes' => $episodes,
            'watch_history' => $watchHistory,
            'watch_progress' => $watchProgress,
            'ratings' => $ratings,
            'reviews' => $reviews,
            'watchlists' => $watchlists,
            'recommendations' => $recommendations,
            'devices' => $userDevices
        ],
        'schema' => [
            'subscription_plans' => ['plan_id (PK)', 'plan_name', 'price_monthly', 'max_profiles', 'max_quality', 'ads_enabled', 'downloads_enabled'],
            'genres' => ['genre_id (PK)', 'genre_name', 'description'],
            'users' => ['user_id (PK)', 'email', 'password_hash', 'first_name', 'last_name', 'phone', 'country', 'language', 'registration_date', 'last_login', 'is_active'],
            'profiles' => ['profile_id (PK)', 'user_id (FK)', 'profile_name', 'avatar_url', 'is_kids_profile', 'maturity_rating', 'language_preference', 'autoplay_enabled', 'created_at'],
            'subscriptions' => ['subscription_id (PK)', 'user_id (FK)', 'plan_id (FK)', 'status', 'start_date', 'next_billing_date', 'payment_method', 'auto_renew'],
            'content' => ['content_id (PK)', 'title', 'original_title', 'content_type', 'description', 'duration_minutes', 'release_year', 'maturity_rating', 'studio', 'director', 'cast', 'thumbnail_url', 'trailer_url', 'avg_rating', 'total_views', 'is_original', 'added_date'],
            'content_genres' => ['id (PK)', 'content_id (FK)', 'genre_id (FK)', 'is_primary'],
            'series' => ['series_id (PK)', 'title', 'description', 'total_seasons', 'status', 'first_air_date', 'maturity_rating', 'avg_rating', 'studio'],
            'episodes' => ['episode_id (PK)', 'series_id (FK)', 'season_number', 'episode_number', 'title', 'description', 'duration_minutes', 'air_date', 'thumbnail_url'],
            'watch_history' => ['watch_id (PK)', 'profile_id (FK)', 'content_id (FK)', 'episode_id (FK)', 'started_at', 'duration_watched_seconds', 'completed', 'device_type', 'quality', 'country'],
            'watch_progress' => ['progress_id (PK)', 'profile_id (FK)', 'content_id (FK)', 'episode_id (FK)', 'position_seconds', 'last_updated'],
            'ratings' => ['rating_id (PK)', 'profile_id (FK)', 'content_id (FK)', 'series_id (FK)', 'rating', 'created_at'],
            'reviews' => ['review_id (PK)', 'profile_id (FK)', 'content_id (FK)', 'series_id (FK)', 'title', 'body', 'is_spoiler', 'helpful_count', 'created_at'],
            'watchlists' => ['watchlist_id (PK)', 'profile_id (FK)', 'content_id (FK)', 'series_id (FK)', 'added_at'],
            'recommendations' => ['recommendation_id (PK)', 'profile_id (FK)', 'content_id (FK)', 'series_id (FK)', 'reason', 'score', 'generated_at'],
            'devices' => ['device_id (PK)', 'user_id (FK)', 'device_type', 'device_name', 'device_token', 'last_used', 'is_active']
        ],
        'relationships' => [
            'profiles.user_id -> users.user_id',
            'subscriptions.user_id -> users.user_id',
            'subscriptions.plan_id -> subscription_plans.plan_id',
            'content_genres.content_id -> content.content_id',
            'content_genres.genre_id -> genres.genre_id',
            'episodes.series_id -> series.series_id',
            'watch_history.profile_id -> profiles.profile_id',
            'watch_history.content_id -> content.content_id',
            'watch_history.episode_id -> episodes.episode_id',
            'watch_progress.profile_id -> profiles.profile_id',
            'ratings.profile_id -> profiles.profile_id',
            'reviews.profile_id -> profiles.profile_id',
            'watchlists.profile_id -> profiles.profile_id',
            'recommendations.profile_id -> profiles.profile_id',
            'devices.user_id -> users.user_id'
        ]
    ];
}