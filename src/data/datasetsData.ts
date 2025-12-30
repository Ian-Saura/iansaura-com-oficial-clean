import { Dataset } from '../types/members';

/**
 * Datasets disponibles para generar
 * 
 * Para agregar un dataset:
 * 1. Agregar objeto al array con ID único
 * 2. Definir campos y tipos
 * 3. Actualizar la función de generación en el backend (api/datasets.php)
 */

export const datasets: Dataset[] = [
  {
    id: 'ecommerce',
    name: { es: 'Comercio Electrónico', en: 'E-commerce', pt: 'Comércio Eletrônico' },
    description: {
      es: 'Sistema completo de tienda online: categorías, marcas, proveedores, productos, inventario, clientes, promociones, órdenes, pagos y reseñas',
      en: 'Complete online store system: categories, brands, suppliers, products, inventory, customers, promotions, orders, payments, and reviews',
      pt: 'Sistema completo de loja online: categorias, marcas, fornecedores, produtos, inventário, clientes, promoções, pedidos, pagamentos e avaliações'
    },
    icon: '🛒',
    tables: ['categories', 'brands', 'suppliers', 'warehouses', 'products', 'inventory', 'customers', 'customer_addresses', 'promotions', 'orders', 'order_items', 'payments', 'reviews', 'wishlists'],
    fields: [
      { name: 'order_id', type: 'INT', description: { es: 'ID único del pedido', en: 'Unique order ID', pt: 'ID único do pedido' } },
      { name: 'customer_id', type: 'INT', description: { es: 'ID del cliente', en: 'Customer ID', pt: 'ID do cliente' } },
      { name: 'product_id', type: 'INT', description: { es: 'ID del producto', en: 'Product ID', pt: 'ID do produto' } },
      { name: 'quantity', type: 'INT', description: { es: 'Cantidad comprada', en: 'Quantity purchased', pt: 'Quantidade comprada' } },
      { name: 'price', type: 'DECIMAL', description: { es: 'Precio unitario', en: 'Unit price', pt: 'Preço unitário' } },
      { name: 'order_date', type: 'DATE', description: { es: 'Fecha del pedido', en: 'Order date', pt: 'Data do pedido' } },
      { name: 'status', type: 'STRING', description: { es: 'Estado: pendiente, completado, enviado, cancelado', en: 'Status: pending, completed, shipped, cancelled', pt: 'Status: pendente, completado, enviado, cancelado' } },
    ],
    difficulty: 'Principiante',
  },
  {
    id: 'logs',
    name: { es: 'Plataforma de Observabilidad', en: 'Observability Platform', pt: 'Plataforma de Observabilidade' },
    description: {
      es: 'Sistema de monitoreo completo: logs de acceso, errores, métricas de rendimiento, alertas, servicios y despliegues',
      en: 'Complete monitoring system: access logs, errors, performance metrics, alerts, services, and deployments',
      pt: 'Sistema de monitoramento completo: logs de acesso, erros, métricas de desempenho, alertas, serviços e implantações'
    },
    icon: '📊',
    tables: ['services', 'deployments', 'access_logs', 'error_logs', 'performance_metrics', 'alerts', 'alert_rules', 'incidents', 'on_call_schedules'],
    fields: [
      { name: 'timestamp', type: 'TIMESTAMP', description: { es: 'Fecha y hora del request', en: 'Request timestamp', pt: 'Data e hora da requisição' } },
      { name: 'service_id', type: 'INT', description: { es: 'ID del microservicio', en: 'Microservice ID', pt: 'ID do microsserviço' } },
      { name: 'method', type: 'STRING', description: { es: 'GET, POST, PUT, DELETE', en: 'GET, POST, PUT, DELETE', pt: 'GET, POST, PUT, DELETE' } },
      { name: 'endpoint', type: 'STRING', description: { es: 'Ruta del API', en: 'API Endpoint', pt: 'Rota da API' } },
      { name: 'status_code', type: 'INT', description: { es: 'Código HTTP (200, 404, 500, etc)', en: 'HTTP Code (200, 404, 500, etc)', pt: 'Código HTTP (200, 404, 500, etc)' } },
      { name: 'response_time_ms', type: 'INT', description: { es: 'Tiempo de respuesta en ms', en: 'Response time in ms', pt: 'Tempo de resposta em ms' } },
      { name: 'trace_id', type: 'STRING', description: { es: 'ID de trazabilidad distribuida', en: 'Distributed trace ID', pt: 'ID de rastreabilidade distribuída' } },
    ],
    difficulty: 'Avanzado',
  },
  {
    id: 'finanzas',
    name: { es: 'Sistema Bancario', en: 'Banking System', pt: 'Sistema Bancário' },
    description: {
      es: 'Sistema bancario completo: clientes, cuentas, tarjetas, transacciones, préstamos, inversiones, sucursales y empleados',
      en: 'Complete banking system: customers, accounts, cards, transactions, loans, investments, branches, and employees',
      pt: 'Sistema bancário completo: clientes, contas, cartões, transações, empréstimos, investimentos, agências e funcionários'
    },
    icon: '💰',
    tables: ['customers', 'accounts', 'account_types', 'cards', 'transactions', 'transfers', 'loans', 'loan_payments', 'investments', 'branches', 'employees', 'exchange_rates'],
    fields: [
      { name: 'transaction_id', type: 'INT', description: { es: 'ID único de transacción', en: 'Unique transaction ID', pt: 'ID único da transação' } },
      { name: 'account_id', type: 'INT', description: { es: 'ID de la cuenta', en: 'Account ID', pt: 'ID da conta' } },
      { name: 'amount', type: 'DECIMAL', description: { es: 'Monto (positivo/negativo)', en: 'Amount (positive/negative)', pt: 'Valor (positivo/negativo)' } },
      { name: 'type', type: 'STRING', description: { es: 'depósito, retiro, transferencia, pago', en: 'deposit, withdrawal, transfer, payment', pt: 'depósito, saque, transferência, pagamento' } },
      { name: 'timestamp', type: 'TIMESTAMP', description: { es: 'Fecha y hora', en: 'Timestamp', pt: 'Data e hora' } },
      { name: 'category', type: 'STRING', description: { es: 'Categoría del gasto', en: 'Expense category', pt: 'Categoria de despesa' } },
      { name: 'merchant_id', type: 'INT', description: { es: 'ID del comercio', en: 'Merchant ID', pt: 'ID do comércio' } },
    ],
    difficulty: 'Intermedio',
  },
  {
    id: 'rrhh',
    name: { es: 'Gestión de Recursos Humanos', en: 'Human Resources Management', pt: 'Gestão de Recursos Humanos' },
    description: {
      es: 'Sistema de RRHH completo: empleados, departamentos, posiciones, salarios, beneficios, vacaciones, evaluaciones, capacitaciones y reclutamiento',
      en: 'Complete HR system: employees, departments, positions, salaries, benefits, time off, reviews, trainings, and recruiting',
      pt: 'Sistema de RH completo: funcionários, departamentos, cargos, salários, benefícios, férias, avaliações, treinamentos e recrutamento'
    },
    icon: '👥',
    tables: ['departments', 'positions', 'employees', 'contracts', 'salaries', 'salary_history', 'benefits', 'time_off_requests', 'time_off_balances', 'performance_reviews', 'goals', 'trainings', 'certifications', 'job_postings', 'candidates', 'interviews'],
    fields: [
      { name: 'employee_id', type: 'INT', description: { es: 'ID del empleado', en: 'Employee ID', pt: 'ID do funcionário' } },
      { name: 'name', type: 'STRING', description: { es: 'Nombre completo', en: 'Full Name', pt: 'Nome completo' } },
      { name: 'department_id', type: 'INT', description: { es: 'ID del departamento', en: 'Department ID', pt: 'ID do departamento' } },
      { name: 'position_id', type: 'INT', description: { es: 'ID del puesto', en: 'Position ID', pt: 'ID do cargo' } },
      { name: 'salary', type: 'DECIMAL', description: { es: 'Salario mensual', en: 'Monthly salary', pt: 'Salário mensal' } },
      { name: 'hire_date', type: 'DATE', description: { es: 'Fecha de contratación', en: 'Hire date', pt: 'Data de contratação' } },
      { name: 'manager_id', type: 'INT', description: { es: 'ID del gerente', en: 'Manager ID', pt: 'ID do gerente' } },
    ],
    difficulty: 'Principiante',
  },
  {
    id: 'iot',
    name: { es: 'Fábrica Inteligente (IoT)', en: 'Smart Factory (IoT)', pt: 'Fábrica Inteligente (IoT)' },
    description: {
      es: 'Fábrica inteligente: dispositivos, sensores, lecturas, alertas, mantenimiento predictivo, líneas de producción y calidad',
      en: 'Smart factory: devices, sensors, readings, alerts, predictive maintenance, production lines, and quality',
      pt: 'Fábrica inteligente: dispositivos, sensores, leituras, alertas, manutenção preditiva, linhas de produção e qualidade'
    },
    icon: '📡',
    tables: ['factories', 'production_lines', 'machines', 'sensors', 'sensor_readings', 'alerts', 'maintenance_schedules', 'maintenance_logs', 'quality_checks', 'defects', 'operators', 'shifts', 'production_orders', 'production_output'],
    fields: [
      { name: 'sensor_id', type: 'STRING', description: { es: 'ID del sensor', en: 'Sensor ID', pt: 'ID do sensor' } },
      { name: 'machine_id', type: 'INT', description: { es: 'ID de la máquina', en: 'Machine ID', pt: 'ID da máquina' } },
      { name: 'timestamp', type: 'TIMESTAMP', description: { es: 'Fecha y hora de lectura', en: 'Reading timestamp', pt: 'Data e hora da leitura' } },
      { name: 'temperature', type: 'DECIMAL', description: { es: 'Temperatura en °C', en: 'Temperature in °C', pt: 'Temperatura em °C' } },
      { name: 'vibration', type: 'DECIMAL', description: { es: 'Nivel de vibración', en: 'Vibration level', pt: 'Nível de vibração' } },
      { name: 'pressure', type: 'DECIMAL', description: { es: 'Presión', en: 'Pressure', pt: 'Pressão' } },
      { name: 'status', type: 'STRING', description: { es: 'normal, advertencia, crítico', en: 'normal, warning, critical', pt: 'normal, aviso, crítico' } },
    ],
    difficulty: 'Avanzado',
  },
  {
    id: 'streaming',
    name: { es: 'Plataforma de Streaming', en: 'Streaming Platform', pt: 'Plataforma de Streaming' },
    description: {
      es: 'Plataforma de streaming completa: usuarios, perfiles, contenido, series, episodios, reproducciones, calificaciones, suscripciones y recomendaciones',
      en: 'Complete streaming platform: users, profiles, content, series, episodes, plays, ratings, subscriptions, and recommendations',
      pt: 'Plataforma de streaming completa: usuários, perfis, conteúdo, séries, episódios, reproduções, avaliações, assinaturas e recomendações'
    },
    icon: '🎬',
    tables: ['users', 'profiles', 'subscriptions', 'subscription_plans', 'content', 'genres', 'content_genres', 'series', 'episodes', 'watch_history', 'watch_progress', 'ratings', 'reviews', 'watchlists', 'recommendations', 'devices'],
    fields: [
      { name: 'user_id', type: 'INT', description: { es: 'ID del usuario', en: 'User ID', pt: 'ID do usuário' } },
      { name: 'profile_id', type: 'INT', description: { es: 'ID del perfil', en: 'Profile ID', pt: 'ID do perfil' } },
      { name: 'content_id', type: 'INT', description: { es: 'ID del contenido', en: 'Content ID', pt: 'ID do conteúdo' } },
      { name: 'watch_date', type: 'TIMESTAMP', description: { es: 'Fecha de visualización', en: 'Watch date', pt: 'Data de visualização' } },
      { name: 'duration_seconds', type: 'INT', description: { es: 'Segundos vistos', en: 'Seconds watched', pt: 'Segundos assistidos' } },
      { name: 'device_type', type: 'STRING', description: { es: 'móvil, escritorio, TV, tablet', en: 'mobile, desktop, TV, tablet', pt: 'móvel, desktop, TV, tablet' } },
      { name: 'quality', type: 'STRING', description: { es: 'SD, HD, 4K', en: 'SD, HD, 4K', pt: 'SD, HD, 4K' } },
    ],
    difficulty: 'Intermedio',
  },
];

// API endpoints info
export const apiInfo = {
  baseUrl: 'https://iansaura.com/api/datasets.php',
  endpoints: datasets.map(d => ({
    path: `/api/datasets.php?type=${d.id}`,
    params: '&rows=1000&format=json',
    description: d.description,
  })),
  rateLimit: {
    maxRequestsPerHour: 50,
    maxRowsPerRequest: 10000,
  },
  formats: ['json', 'csv'],
};
