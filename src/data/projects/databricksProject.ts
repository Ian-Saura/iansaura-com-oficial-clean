import { Project } from '../../types/members';

export const databricksProject: Project = {
  id: 'p2-databricks-intro',
  level: 2,
  title: {
    es: 'Data Engineering con Databricks',
    pt: 'Data Engineering com Databricks'
  },
  description: {
    es: 'Aprendé a usar Databricks, la plataforma de lakehouse más popular. Vas a crear notebooks, procesar datos con Spark, y usar Delta Lake.',
    pt: 'Aprenda a usar o Databricks, a plataforma de lakehouse mais popular. Você vai criar notebooks, processar dados com Spark e usar Delta Lake.'
  },
  difficulty: 'Intermedio',
  duration: '4-5 horas',
  skills: [
    { es: 'Databricks', pt: 'Databricks' },
    { es: 'PySpark', pt: 'PySpark' },
    { es: 'Delta Lake', pt: 'Delta Lake' },
    { es: 'Notebooks', pt: 'Notebooks' },
    { es: 'SQL', pt: 'SQL' }
  ],
  icon: '🧱',
  color: 'orange',
  datasetId: 'streaming',
  estimatedLines: 100,
  realWorldExample: {
    es: 'Así analiza Comcast millones de eventos de visualización de su plataforma de streaming',
    pt: 'Assim a Comcast analisa milhões de eventos de visualização de sua plataforma de streaming'
  },
  usedBy: ['Shell', 'Comcast', 'HSBC', 'CVS Health', 'Regeneron'],
  learningObjectives: [
    { es: 'Entender la arquitectura Lakehouse', pt: 'Entender a arquitetura Lakehouse' },
    { es: 'Crear y organizar notebooks', pt: 'Criar e organizar notebooks' },
    { es: 'Procesar datos con PySpark', pt: 'Processar dados com PySpark' },
    { es: 'Usar Delta Lake para tablas ACID', pt: 'Usar Delta Lake para tabelas ACID' },
    { es: 'Optimizar con Z-Ordering y VACUUM', pt: 'Otimizar com Z-Ordering e VACUUM' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'Dejar clusters prendidos sin usar', pt: 'Deixar clusters ligados sem uso' },
      why: { es: 'Databricks cobra por DBU (Databricks Units) por hora', pt: 'Databricks cobra por DBU (Databricks Units) por hora' },
      solution: { es: 'Configurar auto-termination en 10-30 minutos', pt: 'Configurar auto-termination em 10-30 minutos' },
      code: `# En configuración del cluster:
Auto Termination: 30 minutes`
    },
    {
      mistake: { es: 'No usar Delta Lake', pt: 'Não usar Delta Lake' },
      why: { es: 'Parquet simple no tiene ACID, time travel, ni schema evolution', pt: 'Parquet simples não tem ACID, time travel nem schema evolution' },
      solution: { es: 'Siempre usá Delta: df.write.format("delta").save(path)', pt: 'Sempre use Delta: df.write.format("delta").save(path)' },
      code: `# ❌ Parquet simple
df.write.parquet("/data/orders")

# ✅ Delta Lake
df.write.format("delta").save("/data/orders")`
    },
    {
      mistake: { es: 'No optimizar tablas grandes', pt: 'Não otimizar tabelas grandes' },
      why: { es: 'Queries lentas y costos altos por escaneo', pt: 'Queries lentas e custos altos por escaneamento' },
      solution: { es: 'Usá OPTIMIZE y Z-ORDER en columnas de filtro', pt: 'Use OPTIMIZE e Z-ORDER em colunas de filtro' },
      code: `OPTIMIZE watch_history ZORDER BY (started_at, profile_id)`
    },
  ],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'DataFrame de visualizaciones en Spark', pt: 'DataFrame de visualizações no Spark' },
      example: `+----------+------------+------------+------------------+-----------+
| watch_id | profile_id | content_id | started_at       | completed |
+----------+------------+------------+------------------+-----------+
| 1        | 42         | 156        | 2024-01-15 20:30 | true      |
| 2        | 42         | 203        | 2024-01-15 22:15 | false     |
+----------+------------+------------+------------------+-----------+
Rows: 100000, Partitions: 8`
    },
    {
      step: 6,
      description: { es: 'Tabla Delta creada', pt: 'Tabela Delta criada' },
      example: `DESCRIBE HISTORY watch_history
+-------+---------------------+----------+
|version| timestamp           | operation|
+-------+---------------------+----------+
| 0     | 2024-01-15 10:30:00 | WRITE    |
| 1     | 2024-01-15 11:00:00 | MERGE    |
+-------+---------------------+----------+`
    },
  ],
  steps: [
    {
      order: 1,
      text: { es: '📋 Creá tu cuenta de Databricks Community Edition', pt: '📋 Crie sua conta do Databricks Community Edition' },
      explanation: { es: 'Databricks Community Edition es gratis y suficiente para aprender. Andá a databricks.com/try-databricks y elegí "Community Edition".', pt: 'Databricks Community Edition é grátis e suficiente para aprender. Vá para databricks.com/try-databricks e escolha "Community Edition".' },
      tip: { es: 'Community Edition tiene un cluster limitado pero suficiente para proyectos de aprendizaje.', pt: 'Community Edition tem um cluster limitado mas suficiente para projetos de aprendizado.' },
      checkpoint: { es: '¿Podés acceder al workspace de Databricks?', pt: 'Consegue acessar o workspace do Databricks?' },
      estimatedTime: '10min',
      difficulty: 'easy',
    },
    {
      order: 2,
      text: { es: '📁 Creá la estructura de notebooks', pt: '📁 Crie a estrutura de notebooks' },
      code: `# En el Workspace, creá esta estructura:
/Users/tu_email/
├── 01_setup/
│   └── 00_config.py
├── 02_ingestion/
│   └── 01_load_raw_data.py
├── 03_transformation/
│   └── 01_clean_data.py
└── 04_analytics/
    └── 01_metrics.sql`,
      explanation: { es: 'Organizá notebooks por etapa del pipeline. Usá números para ordenar la ejecución.', pt: 'Organize notebooks por etapa do pipeline. Use números para ordenar a execução.' },
      estimatedTime: '10min',
      difficulty: 'easy',
    },
    {
      order: 3,
      text: { es: '⚡ Creá y configurá un cluster', pt: '⚡ Crie e configure um cluster' },
      code: `# Configuración recomendada para Community Edition:
Cluster Mode: Single Node
Databricks Runtime: 14.0 LTS (o la última LTS)
Node Type: Standard (el disponible)
Auto Termination: 30 minutes

# En Compute > Create Cluster`,
      explanation: { es: 'LTS = Long Term Support. Siempre elegí versiones LTS para estabilidad.', pt: 'LTS = Long Term Support. Sempre escolha versões LTS para estabilidade.' },
      warning: { es: 'En Community Edition solo podés tener 1 cluster activo.', pt: 'No Community Edition você só pode ter 1 cluster ativo.' },
      estimatedTime: '5min',
      difficulty: 'easy',
    },
    {
      order: 4,
      text: { es: '📥 Cargá datos con PySpark', pt: '📥 Carregue dados com PySpark' },
      code: `# Notebook: 02_ingestion/01_load_raw_data.py

# Subir el JSON del dataset a DBFS (Databricks File System)
# En el sidebar: Data > DBFS > Upload

# Leer datos de plataforma de streaming desde DBFS
# Subí los archivos CSV/JSON a DBFS primero (Data > DBFS > Upload)

# En Databricks, spark ya está disponible
# spark = SparkSession.builder.getOrCreate()  # No necesario

# Cargar historial de visualizaciones (tabla principal)
watch_history = spark.read.option("header", True).option("inferSchema", True).csv("/FileStore/streaming_watch_history.csv")

# Cargar contenido y usuarios
content = spark.read.option("header", True).option("inferSchema", True).csv("/FileStore/streaming_content.csv")
users = spark.read.option("header", True).option("inferSchema", True).csv("/FileStore/streaming_users.csv")

# Ver estructura
watch_history.printSchema()

# Ver datos
watch_history.show(5)
print(f"Total visualizaciones: {watch_history.count()}")`,
      explanation: { es: 'DBFS es el filesystem distribuido de Databricks. /FileStore/ es para archivos subidos manualmente.', pt: 'DBFS é o filesystem distribuído do Databricks. /FileStore/ é para arquivos carregados manualmente.' },
      checkpoint: { es: '¿Podés ver las primeras filas del DataFrame?', pt: 'Consegue ver as primeiras linhas do DataFrame?' },
      estimatedTime: '20min',
      difficulty: 'medium',
    },
    {
      order: 5,
      text: { es: '🔄 Transformá con PySpark', pt: '🔄 Transforme com PySpark' },
      code: `# Notebook: 03_transformation/01_clean_data.py

from pyspark.sql.functions import col, to_timestamp, when, lit, current_timestamp

# Leer datos raw desde CSV
watch_history = spark.read.option("header", True).option("inferSchema", True).csv("/FileStore/streaming_watch_history.csv")

# Transformaciones
watch_clean = watch_history \\
    .withColumn("order_date", to_date(col("order_date"))) \\
    .withColumn("total", col("total").cast("double")) \\
    .withColumn("is_high_value", when(col("total") > 100, True).otherwise(False)) \\
    .withColumn("processed_at", current_timestamp()) \\
    .dropna(subset=["order_id", "customer_id"]) \\
    .dropDuplicates(["order_id"])

# Ver resultado
orders_clean.show(5)
print(f"Rows after cleaning: {orders_clean.count()}")

# Cache para reusar
orders_clean.cache()`,
      explanation: { es: 'PySpark es similar a Pandas pero distribuido. Usá .cache() para DataFrames que vas a reusar.', pt: 'PySpark é similar a Pandas mas distribuído. Use .cache() para DataFrames que vai reutilizar.' },
      tip: { es: 'Las transformaciones son lazy - no se ejecutan hasta que hacés una acción (show, count, write).', pt: 'As transformações são lazy - não são executadas até que você faça uma ação (show, count, write).' },
      estimatedTime: '20min',
      difficulty: 'medium',
    },
    {
      order: 6,
      text: { es: '💾 Guardá en Delta Lake', pt: '💾 Salve no Delta Lake' },
      code: `# Guardar como tabla Delta
orders_clean.write \\
    .format("delta") \\
    .mode("overwrite") \\
    .saveAsTable("default.orders_clean")

# Verificar
spark.sql("DESCRIBE EXTENDED default.orders_clean").show(truncate=False)

# Ver historial de cambios (Time Travel)
spark.sql("DESCRIBE HISTORY default.orders_clean").show()

# Leer versión anterior
# orders_v0 = spark.read.format("delta").option("versionAsOf", 0).table("default.orders_clean")`,
      explanation: { es: 'Delta Lake agrega ACID, time travel, y schema evolution sobre Parquet.', pt: 'Delta Lake adiciona ACID, time travel e schema evolution sobre Parquet.' },
      checkpoint: { es: '¿Podés ver la tabla en el Data Explorer?', pt: 'Consegue ver a tabela no Data Explorer?' },
      estimatedTime: '15min',
      difficulty: 'medium',
    },
    {
      order: 7,
      text: { es: '📊 Queries SQL en notebooks', pt: '📊 Queries SQL em notebooks' },
      code: `-- Notebook: 04_analytics/01_metrics.sql
-- Cambiar el lenguaje del notebook a SQL

-- Ventas por mes
SELECT 
    date_trunc('month', order_date) AS mes,
    COUNT(*) AS total_ordenes,
    SUM(total) AS ingresos,
    AVG(total) AS ticket_promedio
FROM default.orders_clean
GROUP BY 1
ORDER BY 1;

-- Top clientes
SELECT 
    customer_id,
    COUNT(*) AS ordenes,
    SUM(total) AS total_gastado
FROM default.orders_clean
GROUP BY 1
ORDER BY 3 DESC
LIMIT 10;`,
      explanation: { es: 'Podés mezclar notebooks Python y SQL. SQL es más fácil para análisis exploratorio.', pt: 'Pode misturar notebooks Python e SQL. SQL é mais fácil para análise exploratória.' },
      estimatedTime: '15min',
      difficulty: 'easy',
    },
    {
      order: 8,
      text: { es: '⚡ Optimizá tablas Delta', pt: '⚡ Otimize tabelas Delta' },
      code: `-- Optimizar tabla (compactar archivos pequeños)
OPTIMIZE default.orders_clean;

-- Z-Order para queries frecuentes por fecha
OPTIMIZE default.orders_clean ZORDER BY (order_date);

-- Limpiar versiones antiguas (liberar storage)
VACUUM default.orders_clean RETAIN 168 HOURS;

-- Ver métricas de la tabla
DESCRIBE DETAIL default.orders_clean;`,
      explanation: { es: 'OPTIMIZE compacta archivos pequeños. Z-ORDER ordena datos para queries más rápidas. VACUUM limpia versiones antiguas.', pt: 'OPTIMIZE compacta arquivos pequenos. Z-ORDER ordena dados para queries mais rápidas. VACUUM limpa versões antigas.' },
      warning: { es: 'VACUUM elimina el time travel para versiones anteriores al período de retención.', pt: 'VACUUM elimina o time travel para versões anteriores ao período de retenção.' },
      estimatedTime: '10min',
      difficulty: 'medium',
    },
    {
      order: 9,
      text: { es: '📝 Documentá y organizá', pt: '📝 Documente e organize' },
      code: `# Buenas prácticas:
# 1. Agregá markdown al inicio de cada notebook explicando qué hace
# 2. Usá widgets para parámetros

# Crear widget para fecha
dbutils.widgets.text("start_date", "2024-01-01", "Fecha Inicio")
start_date = dbutils.widgets.get("start_date")

# Usarlo en queries
df = spark.sql(f"SELECT * FROM orders WHERE order_date >= '{start_date}'")

# 3. Crear un notebook de orquestación
# dbutils.notebook.run("./02_ingestion/01_load_raw_data", 300)
# dbutils.notebook.run("./03_transformation/01_clean_data", 300)`,
      explanation: { es: 'Widgets permiten parametrizar notebooks. dbutils.notebook.run permite orquestar notebooks.', pt: 'Widgets permitem parametrizar notebooks. dbutils.notebook.run permite orquestrar notebooks.' },
      checkpoint: { es: '¿Tus notebooks tienen documentación clara?', pt: 'Seus notebooks têm documentação clara?' },
      estimatedTime: '15min',
      difficulty: 'easy',
    },
  ],
  deliverable: { es: 'Workspace de Databricks con notebooks organizados, tabla Delta optimizada, y queries de analytics', pt: 'Workspace do Databricks com notebooks organizados, tabela Delta otimizada e queries de analytics' },
  evaluation: [
    { es: '¿Creaste la estructura de notebooks correctamente?', pt: 'Criou a estrutura de notebooks corretamente?' },
    { es: '¿Cargaste y transformaste datos con PySpark?', pt: 'Carregou e transformou dados com PySpark?' },
    { es: '¿Guardaste en formato Delta Lake?', pt: 'Salvou em formato Delta Lake?' },
    { es: '¿Optimizaste la tabla con OPTIMIZE y Z-ORDER?', pt: 'Otimizou a tabela com OPTIMIZE e Z-ORDER?' },
    { es: '¿Configuraste auto-termination en el cluster?', pt: 'Configurou auto-termination no cluster?' },
  ],
  theory: {
    es: `## Arquitectura Lakehouse

Databricks inventó el concepto de **Lakehouse**: combina lo mejor de Data Lakes y Data Warehouses.

### Data Lake vs Data Warehouse vs Lakehouse

| Aspecto | Data Lake | Data Warehouse | Lakehouse |
|---------|-----------|----------------|-----------|
| Storage | Barato (S3) | Caro | Barato (S3) |
| Schema | Schema-on-read | Schema-on-write | Flexible |
| ACID | ❌ | ✅ | ✅ (Delta) |
| Performance | Variable | Alta | Alta |
| ML/AI | ✅ | ❌ | ✅ |

## Delta Lake

Delta Lake es un formato de storage que agrega:

- **ACID transactions**: No más datos corruptos
- **Time Travel**: Volver a versiones anteriores
- **Schema Evolution**: Cambiar schema sin reescribir
- **Audit History**: Ver quién cambió qué

## Comandos Esenciales

\`\`\`sql
-- Crear tabla Delta
CREATE TABLE orders USING DELTA AS SELECT ...

-- Time Travel
SELECT * FROM orders VERSION AS OF 5
SELECT * FROM orders TIMESTAMP AS OF '2024-01-01'

-- Merge (Upsert)
MERGE INTO target USING source ON condition
WHEN MATCHED THEN UPDATE
WHEN NOT MATCHED THEN INSERT

-- Optimizar
OPTIMIZE table ZORDER BY (columns)
VACUUM table RETAIN 168 HOURS
\`\`\`

## Costos

Databricks cobra por DBU (Databricks Unit):
- 1 DBU ≈ $0.15-0.75/hora (depende del tier)
- Cluster pequeño: ~2 DBU/hora = ~$0.30-1.50/hora
- **Siempre usar auto-termination**`,
    pt: `## Arquitetura Lakehouse

Databricks inventou o conceito de **Lakehouse**: combina o melhor de Data Lakes e Data Warehouses.

### Data Lake vs Data Warehouse vs Lakehouse

| Aspecto | Data Lake | Data Warehouse | Lakehouse |
|---------|-----------|----------------|-----------|
| Storage | Barato (S3) | Caro | Barato (S3) |
| Schema | Schema-on-read | Schema-on-write | Flexível |
| ACID | ❌ | ✅ | ✅ (Delta) |
| Performance | Variável | Alta | Alta |
| ML/AI | ✅ | ❌ | ✅ |

## Delta Lake

Delta Lake é um formato de storage que adiciona:

- **Transações ACID**: Sem mais dados corrompidos
- **Time Travel**: Voltar a versões anteriores
- **Schema Evolution**: Mudar schema sem reescrever
- **Histórico de Auditoria**: Ver quem mudou o quê

## Comandos Essenciais

\`\`\`sql
-- Criar tabela Delta
CREATE TABLE orders USING DELTA AS SELECT ...

-- Time Travel
SELECT * FROM orders VERSION AS OF 5
SELECT * FROM orders TIMESTAMP AS OF '2024-01-01'

-- Merge (Upsert)
MERGE INTO target USING source ON condition
WHEN MATCHED THEN UPDATE
WHEN NOT MATCHED THEN INSERT

-- Otimizar
OPTIMIZE table ZORDER BY (columns)
VACUUM table RETAIN 168 HOURS
\`\`\`

## Custos

Databricks cobra por DBU (Databricks Unit):
- 1 DBU ≈ $0.15-0.75/hora (depende do tier)
- Cluster pequeno: ~2 DBU/hora = ~$0.30-1.50/hora
- **Sempre usar auto-termination**`
  },
};
