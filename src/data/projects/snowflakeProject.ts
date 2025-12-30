import { Project } from '../../types/members';

export const snowflakeProject: Project = {
  id: 'p2-snowflake-intro',
  level: 2,
  title: {
    es: 'Data Warehouse en Snowflake',
    pt: 'Data Warehouse no Snowflake'
  },
  description: {
    es: 'Aprendé a usar Snowflake, el data warehouse cloud más popular. Vas a cargar datos, crear tablas, optimizar queries y entender el modelo de costos.',
    pt: 'Aprenda a usar o Snowflake, o data warehouse cloud mais popular. Você vai carregar dados, criar tabelas, otimizar queries e entender o modelo de custos.'
  },
  difficulty: 'Intermedio',
  duration: '3-4 horas',
  skills: [
    { es: 'Snowflake', pt: 'Snowflake' },
    { es: 'SQL', pt: 'SQL' },
    { es: 'Data Warehouse', pt: 'Data Warehouse' },
    { es: 'Cloud', pt: 'Cloud' }
  ],
  icon: '❄️',
  color: 'cyan',
  datasetId: 'ecommerce',
  estimatedLines: 50,
  realWorldExample: {
    es: 'Snowflake es usado por Doordash, Instacart, Mercado Libre y Fortune 500',
    pt: 'Snowflake é usado por Doordash, Instacart, Mercado Libre e Fortune 500'
  },
  usedBy: ['Doordash', 'Instacart', 'Mercado Libre', 'Adobe'],
  learningObjectives: [
    { es: 'Entender la arquitectura de Snowflake (Storage, Compute, Cloud Services)', pt: 'Entender a arquitetura do Snowflake (Armazenamento, Computação, Serviços Cloud)' },
    { es: 'Crear databases, schemas y tablas', pt: 'Criar databases, schemas e tabelas' },
    { es: 'Cargar datos con COPY INTO desde Stages', pt: 'Carregar dados com COPY INTO a partir de Stages' },
    { es: 'Optimizar queries con clustering y cache', pt: 'Otimizar queries com clustering e cache' },
    { es: 'Entender el modelo de costos (credits)', pt: 'Entender o modelo de custos (créditos)' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'Dejar warehouses prendidos sin usar', pt: 'Deixar warehouses ligados sem uso' },
      why: { es: 'Snowflake cobra por segundo de compute activo', pt: 'Snowflake cobra por segundo de computação ativa' },
      solution: { es: 'Configurar AUTO_SUSPEND en 60 segundos', pt: 'Configurar AUTO_SUSPEND em 60 segundos' },
      code: `ALTER WAREHOUSE mi_wh SET AUTO_SUSPEND = 60 AUTO_RESUME = TRUE;`
    },
    {
      mistake: { es: 'No usar COPY INTO para cargas masivas', pt: 'Não usar COPY INTO para cargas massivas' },
      why: { es: 'INSERT es muy lento para millones de filas', pt: 'INSERT é muito lento para milhões de linhas' },
      solution: { es: 'Usá COPY INTO desde stages', pt: 'Use COPY INTO a partir de stages' },
      code: `COPY INTO tabla FROM @stage/archivo.csv FILE_FORMAT = (TYPE = 'CSV');`
    },
    {
      mistake: { es: 'Queries sin filtros en tablas grandes', pt: 'Queries sem filtros em tabelas grandes' },
      why: { es: 'Snowflake cobra por datos escaneados', pt: 'Snowflake cobra por dados escaneados' },
      solution: { es: 'Siempre usá WHERE con columnas de clustering', pt: 'Sempre use WHERE com colunas de clustering' },
    },
  ],
  expectedOutputs: [
    {
      step: 3,
      description: { es: 'Verificar tablas creadas', pt: 'Verificar tabelas criadas' },
      example: `+------------+
| name       |
+------------+
| ORDERS     |
| CUSTOMERS  |
+------------+`
    },
    {
      step: 5,
      description: { es: 'Resultado de COPY INTO', pt: 'Resultado do COPY INTO' },
      example: `+------------------+--------+-------------+
| file             | status | rows_loaded |
+------------------+--------+-------------+
| orders.csv       | LOADED | 10000       |
+------------------+--------+-------------+`
    },
  ],
  steps: [
    {
      order: 1,
      text: { es: '📋 Creá tu cuenta gratuita de Snowflake', pt: '📋 Crie sua conta gratuita do Snowflake' },
      explanation: { es: 'Snowflake ofrece $400 USD en créditos gratis por 30 días. Andá a snowflake.com/try y registrate.', pt: 'Snowflake oferece $400 USD em créditos grátis por 30 dias. Vá para snowflake.com/try e registre-se.' },
      tip: { es: 'Elegí AWS South America (São Paulo) o Azure Brazil para menor latencia desde LATAM.', pt: 'Escolha AWS South America (São Paulo) ou Azure Brazil para menor latência da LATAM.' },
      checkpoint: { es: '¿Tenés acceso al Snowsight (la UI web)?', pt: 'Você tem acesso ao Snowsight (a UI web)?' },
      estimatedTime: '10min',
      difficulty: 'easy',
      code: `-- Una vez dentro, verificá tu usuario:
SELECT CURRENT_USER(), CURRENT_ROLE(), CURRENT_WAREHOUSE();`
    },
    {
      order: 2,
      text: { es: '🏗️ Creá Database, Schema y Warehouse', pt: '🏗️ Crie Database, Schema e Warehouse' },
      code: `-- Crear database (contenedor principal)
CREATE DATABASE IF NOT EXISTS mi_proyecto;
USE DATABASE mi_proyecto;

-- Crear schemas (organización lógica)
CREATE SCHEMA IF NOT EXISTS raw;       -- Datos crudos
CREATE SCHEMA IF NOT EXISTS analytics; -- Datos procesados

-- Crear warehouse (poder de cómputo)
CREATE WAREHOUSE IF NOT EXISTS mi_wh
  WAREHOUSE_SIZE = 'X-SMALL'   -- El más barato
  AUTO_SUSPEND = 60            -- Apagar después de 60s sin uso
  AUTO_RESUME = TRUE;          -- Prender automáticamente

-- Verificar
SHOW WAREHOUSES;
SHOW SCHEMAS;`,
      explanation: { es: 'Database = contenedor de datos, Schema = carpetas, Warehouse = CPU/RAM para queries.', pt: 'Database = contêiner de dados, Schema = pastas, Warehouse = CPU/RAM para queries.' },
      tip: { es: 'X-SMALL es suficiente para aprender. Cada tamaño duplica el costo.', pt: 'X-SMALL é suficiente para aprender. Cada tamanho duplica o custo.' },
      estimatedTime: '10min',
      difficulty: 'easy',
      expectedOutput: `+--------+---------+-------------+
| name   | size    | auto_suspend|
+--------+---------+-------------+
| MI_WH  | X-Small | 60          |
+--------+---------+-------------+`
    },
    {
      order: 3,
      text: { es: '📊 Creá las tablas para E-commerce', pt: '📊 Crie as tabelas para E-commerce' },
      code: `USE SCHEMA mi_proyecto.raw;

-- Tabla de órdenes
CREATE OR REPLACE TABLE orders (
    order_id NUMBER PRIMARY KEY,
    customer_id NUMBER,
    order_date DATE,
    status VARCHAR(20),
    total_amount FLOAT
);

-- Tabla de clientes
CREATE OR REPLACE TABLE customers (
    customer_id NUMBER PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    city VARCHAR(50)
);

-- Tabla de productos
CREATE OR REPLACE TABLE products (
    product_id NUMBER PRIMARY KEY,
    name VARCHAR(200),
    category VARCHAR(50),
    price FLOAT
);

-- Verificar
SHOW TABLES;
DESCRIBE TABLE orders;`,
      explanation: { es: 'Snowflake usa SQL estándar. PRIMARY KEY es informativo (no enforced por defecto).', pt: 'Snowflake usa SQL padrão. PRIMARY KEY é informativo (não imposto por padrão).' },
      checkpoint: { es: '¿Ves las 3 tablas creadas?', pt: 'Vê as 3 tabelas criadas?' },
      estimatedTime: '15min',
      difficulty: 'easy'
    },
    {
      order: 4,
      text: { es: '📤 Creá un Stage y subí archivos', pt: '📤 Crie um Stage e suba arquivos' },
      code: `-- Crear stage interno (storage de Snowflake)
CREATE OR REPLACE STAGE mi_proyecto.raw.data_stage;

-- Ver el stage
SHOW STAGES;

-- Para subir archivos desde Snowsight:
-- 1. Andá a Data > Databases > mi_proyecto > raw > Stages
-- 2. Click en data_stage
-- 3. Click en "+ Files" y subí tu CSV`,
      explanation: { es: 'Un Stage es como un "bucket" temporal donde subís archivos antes de cargarlos a tablas.', pt: 'Um Stage é como um "bucket" temporário onde você sobe arquivos antes de carregá-los para tabelas.' },
      tip: { es: 'También podés conectar S3, GCS o Azure Blob como external stages.', pt: 'Também pode conectar S3, GCS ou Azure Blob como external stages.' },
      estimatedTime: '10min',
      difficulty: 'medium'
    },
    {
      order: 5,
      text: { es: '📥 Cargá datos con COPY INTO', pt: '📥 Carregue dados com COPY INTO' },
      code: `-- Definir formato del archivo
CREATE OR REPLACE FILE FORMAT mi_proyecto.raw.csv_format
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  NULL_IF = ('NULL', 'null', '');

-- Cargar datos
COPY INTO mi_proyecto.raw.orders
FROM @mi_proyecto.raw.data_stage/orders.csv
FILE_FORMAT = mi_proyecto.raw.csv_format
ON_ERROR = 'CONTINUE';

-- Verificar
SELECT COUNT(*) as total_filas FROM orders;
SELECT * FROM orders LIMIT 5;`,
      explanation: { es: 'COPY INTO es la forma más eficiente. Puede procesar millones de filas en segundos.', pt: 'COPY INTO é a forma mais eficiente. Pode processar milhões de linhas em segundos.' },
      checkpoint: { es: '¿Ves los datos cargados?', pt: 'Vê os dados carregados?' },
      estimatedTime: '20min',
      difficulty: 'medium'
    },
    {
      order: 6,
      text: { es: '📊 Queries de análisis', pt: '📊 Queries de análise' },
      code: `USE SCHEMA mi_proyecto.analytics;

-- Vista de ventas por mes
CREATE OR REPLACE VIEW ventas_mensuales AS
SELECT 
    DATE_TRUNC('month', order_date) AS mes,
    COUNT(*) AS total_ordenes,
    SUM(total_amount) AS ingresos,
    AVG(total_amount) AS ticket_promedio
FROM mi_proyecto.raw.orders
WHERE status = 'completed'
GROUP BY 1
ORDER BY 1;

SELECT * FROM ventas_mensuales;

-- Top clientes
SELECT 
    c.name,
    COUNT(o.order_id) AS ordenes,
    SUM(o.total_amount) AS total_gastado
FROM mi_proyecto.raw.orders o
JOIN mi_proyecto.raw.customers c ON o.customer_id = c.customer_id
GROUP BY 1
ORDER BY 3 DESC
LIMIT 10;`,
      explanation: { es: 'Las vistas en Snowflake son "lazy" - no almacenan datos, solo la query.', pt: 'As views no Snowflake são "lazy" - não armazenam dados, apenas a query.' },
      tip: { es: 'Para vistas materializadas usá CREATE MATERIALIZED VIEW.', pt: 'Para views materializadas use CREATE MATERIALIZED VIEW.' },
      estimatedTime: '15min',
      difficulty: 'easy'
    },
    {
      order: 7,
      text: { es: '💰 Revisá costos y limpiá', pt: '💰 Revise custos e limpe' },
      code: `-- Ver uso de créditos (últimos 7 días)
SELECT 
    WAREHOUSE_NAME,
    SUM(CREDITS_USED) AS total_credits,
    ROUND(SUM(CREDITS_USED) * 3, 2) AS costo_usd
FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
WHERE START_TIME > DATEADD(day, -7, CURRENT_TIMESTAMP())
GROUP BY 1;

-- IMPORTANTE: Suspender warehouse al terminar
ALTER WAREHOUSE mi_wh SUSPEND;

-- Verificar que está suspendido
SHOW WAREHOUSES;`,
      explanation: { es: 'Snowflake cobra ~$3/crédito. Un X-Small usa 1 crédito/hora de uso activo.', pt: 'Snowflake cobra ~$3/crédito. Um X-Small usa 1 crédito/hora de uso ativo.' },
      warning: { es: 'SIEMPRE suspendé el warehouse cuando termines de practicar. Un warehouse prendido 24/7 puede costar $70+/mes.', pt: 'SEMPRE suspenda o warehouse quando terminar de praticar. Um warehouse ligado 24/7 pode custar $70+/mês.' },
      checkpoint: { es: '¿Suspendiste el warehouse?', pt: 'Suspendeu o warehouse?' },
      estimatedTime: '10min',
      difficulty: 'easy'
    },
  ],
  deliverable: { es: 'Un database en Snowflake con tablas cargadas, vistas de analytics y warehouse configurado correctamente', pt: 'Um database no Snowflake com tabelas carregadas, views de analytics e warehouse configurado corretamente' },
  evaluation: [
    { es: '¿Creaste correctamente Database > Schema > Table?', pt: 'Criou corretamente Database > Schema > Table?' },
    { es: '¿Cargaste datos exitosamente con COPY INTO?', pt: 'Carregou dados com sucesso com COPY INTO?' },
    { es: '¿Creaste al menos una vista de analytics?', pt: 'Criou pelo menos uma view de analytics?' },
    { es: '¿Configuraste AUTO_SUSPEND en tu warehouse?', pt: 'Configurou AUTO_SUSPEND no seu warehouse?' },
    { es: '¿Suspendiste el warehouse al terminar?', pt: 'Suspendeu o warehouse ao terminar?' },
  ],
  theory: {
    es: `## Arquitectura de Snowflake

Snowflake tiene **3 capas independientes**:

### 1. Storage Layer
- Datos en formato columnar comprimido
- Pago: ~$23/TB/mes
- Separado del compute

### 2. Compute Layer (Virtual Warehouses)
- Clusters de cómputo elásticos
- Pago: por segundo de uso (~$3/crédito)
- Escalan automáticamente

### 3. Cloud Services Layer
- Autenticación, metadata, optimización
- Generalmente gratis (< 10% del compute)

## Tamaños de Warehouse

| Tamaño | Créditos/hora | Uso típico |
|--------|---------------|------------|
| X-Small | 1 | Desarrollo, queries simples |
| Small | 2 | Cargas pequeñas |
| Medium | 4 | Producción típica |
| Large | 8 | Cargas pesadas |
| X-Large+ | 16+ | Big Data, ML |

## Buenas Prácticas

1. **Siempre AUTO_SUSPEND** - No dejes warehouses prendidos
2. **Separá ambientes** - Dev, Staging, Prod con warehouses distintos
3. **Usá X-Small para desarrollo** - Es suficiente y barato
4. **Monitorea costos** - Revisá ACCOUNT_USAGE regularmente
5. **COPY INTO > INSERT** - Para cargas masivas siempre

## Comandos Esenciales

\`\`\`sql
-- Ver créditos usados
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY;

-- Suspender warehouse
ALTER WAREHOUSE nombre SUSPEND;

-- Cambiar tamaño
ALTER WAREHOUSE nombre SET WAREHOUSE_SIZE = 'SMALL';
\`\`\``,
    pt: `## Arquitetura do Snowflake

Snowflake tem **3 camadas independentes**:

### 1. Storage Layer
- Dados em formato colunar comprimido
- Pagamento: ~$23/TB/mês
- Separado da computação

### 2. Compute Layer (Virtual Warehouses)
- Clusters de computação elásticos
- Pagamento: por segundo de uso (~$3/crédito)
- Escalam automaticamente

### 3. Cloud Services Layer
- Autenticação, metadados, otimização
- Geralmente grátis (< 10% da computação)

## Tamanhos de Warehouse

| Tamanho | Créditos/hora | Uso típico |
|--------|---------------|------------|
| X-Small | 1 | Desenvolvimento, queries simples |
| Small | 2 | Cargas pequenas |
| Medium | 4 | Produção típica |
| Large | 8 | Cargas pesadas |
| X-Large+ | 16+ | Big Data, ML |

## Boas Práticas

1. **Sempre AUTO_SUSPEND** - Não deixe warehouses ligados
2. **Separe ambientes** - Dev, Staging, Prod com warehouses distintos
3. **Use X-Small para desenvolvimento** - É suficiente e barato
4. **Monitore custos** - Revise ACCOUNT_USAGE regularmente
5. **COPY INTO > INSERT** - Para cargas massivas sempre

## Comandos Essenciais

\`\`\`sql
-- Ver créditos usados
SELECT * FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY;

-- Suspender warehouse
ALTER WAREHOUSE nome SUSPEND;

-- Mudar tamanho
ALTER WAREHOUSE nome SET WAREHOUSE_SIZE = 'SMALL';
\`\`\``
  },
};
