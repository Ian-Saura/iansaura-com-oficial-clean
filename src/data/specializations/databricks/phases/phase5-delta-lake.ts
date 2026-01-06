/**
 * FASE 5: Delta Lake
 * 10 pasos para dominar Delta Lake - El formato que revolucionó los Data Lakes
 */

import { DatabricksPhase } from '../types';

export const PHASE_5_DELTA_LAKE: DatabricksPhase = {
  id: 'db-phase-5',
  number: 5,
  title: { es: 'Delta Lake', en: 'Delta Lake', pt: 'Delta Lake' },
  subtitle: { es: 'El formato de datos más poderoso', en: 'The most powerful data format', pt: 'O formato de dados mais poderoso' },
  description: { es: 'Domina Delta Lake: ACID transactions, time travel, schema enforcement, MERGE, OPTIMIZE, y Z-ordering. Delta Lake es la tecnología core de Databricks y lo que hace posible el Lakehouse.', en: 'Master Delta Lake: ACID transactions, time travel, schema enforcement, MERGE, OPTIMIZE, and Z-ordering. Delta Lake is the core technology of Databricks and what makes the Lakehouse possible.', pt: 'Domine Delta Lake: transações ACID, time travel, schema enforcement, MERGE, OPTIMIZE e Z-ordering. Delta Lake é a tecnologia core do Databricks e o que torna possível o Lakehouse.' },
  icon: '🔷',
  color: 'blue',
  estimatedDays: '5-7 días',
  steps: [
    {
      id: 'db-5-1',
      title: { es: '¿Qué es Delta Lake?', en: 'What is Delta Lake?', pt: 'O que é Delta Lake?' },
      description: { es: 'Introducción completa a Delta Lake y por qué revolucionó los Data Lakes.', en: 'Complete introduction to Delta Lake and why it revolutionized Data Lakes.', pt: 'Introdução completa ao Delta Lake e por que revolucionou os Data Lakes.' },
      theory: {
        es: `## Delta Lake: El Formato que Cambió Todo

Delta Lake es un **formato de almacenamiento open-source** creado por Databricks que convierte tu data lake en un lakehouse confiable. Es la tecnología que hace posible tener la flexibilidad de un data lake con las garantías de un data warehouse.

### El Problema que Resuelve

**Antes de Delta Lake (Data Lake tradicional):**
\`\`\`
┌────────────────────────────────────────────────────────────┐
│                    DATA LAKE (Parquet)                      │
├────────────────────────────────────────────────────────────┤
│ ❌ No hay transacciones ACID                               │
│    → Datos corruptos si falla a mitad de escritura         │
│                                                            │
│ ❌ No hay schema enforcement                               │
│    → Cualquiera puede escribir cualquier cosa              │
│                                                            │
│ ❌ No hay historial de cambios                             │
│    → "¿Qué datos había ayer?" → No se sabe                 │
│                                                            │
│ ❌ No hay updates ni deletes eficientes                    │
│    → Para cambiar 1 fila hay que reescribir toda la tabla  │
│                                                            │
│ ❌ Problema de "small files"                               │
│    → Miles de archivos pequeños = queries lentas           │
└────────────────────────────────────────────────────────────┘
\`\`\`

**Con Delta Lake:**
\`\`\`
┌────────────────────────────────────────────────────────────┐
│                      DELTA LAKE                             │
├────────────────────────────────────────────────────────────┤
│ ✅ Transacciones ACID                                      │
│    → Escrituras atómicas, todo o nada                      │
│                                                            │
│ ✅ Schema Enforcement                                      │
│    → Rechaza datos que no cumplen el schema                │
│                                                            │
│ ✅ Time Travel (historial de versiones)                    │
│    → Viaja a cualquier versión anterior                    │
│                                                            │
│ ✅ MERGE (upserts eficientes)                              │
│    → UPDATE, DELETE, INSERT en una operación               │
│                                                            │
│ ✅ OPTIMIZE + Z-ORDER                                      │
│    → Compacta archivos y optimiza queries                  │
└────────────────────────────────────────────────────────────┘
\`\`\`

### ¿Cómo funciona Delta Lake?

Delta Lake usa Parquet para almacenar datos + un **transaction log** (carpeta \`_delta_log/\`):

\`\`\`
mi_tabla_delta/
├── _delta_log/                    # Transaction Log
│   ├── 00000000000000000000.json  # Versión 0
│   ├── 00000000000000000001.json  # Versión 1
│   ├── 00000000000000000002.json  # Versión 2
│   └── ...                        # Más versiones
├── part-00000-xxxxx.parquet       # Datos
├── part-00001-xxxxx.parquet       # Datos
└── part-00002-xxxxx.parquet       # Datos
\`\`\`

El **transaction log** registra:
- Qué archivos agregar/eliminar
- Schema de la tabla
- Estadísticas para optimización
- Quién hizo el cambio y cuándo

### Delta Lake vs Parquet vs CSV

| Característica | CSV | Parquet | Delta Lake |
|----------------|-----|---------|------------|
| Transacciones ACID | ❌ | ❌ | ✅ |
| Schema enforcement | ❌ | ⚠️ Parcial | ✅ |
| Time travel | ❌ | ❌ | ✅ |
| UPDATE/DELETE | ❌ | ❌ | ✅ |
| Compresión | ❌ | ✅ | ✅ |
| Columnar | ❌ | ✅ | ✅ |
| Data skipping | ❌ | ⚠️ Básico | ✅ Avanzado |

### ¿Por qué Delta Lake es CRÍTICO para tu carrera?

1. **Es el estándar de facto**: Databricks, AWS, Azure, GCP todos soportan Delta
2. **Pregunta de entrevista**: "¿Por qué usarías Delta Lake?" es muy común
3. **Certificación**: 30-40% del examen de Databricks es sobre Delta Lake
4. **Diferenciador**: Saber Delta te separa de otros candidatos`,
        en: `## Delta Lake: The Format that Changed Everything

Delta Lake is an **open-source storage format** created by Databricks that converts your data lake into a reliable lakehouse. It's the technology that makes it possible to have the flexibility of a data lake with the guarantees of a data warehouse.

### The Problem it Solves

**Before Delta Lake (traditional Data Lake):**
- ❌ No ACID transactions → Corrupt data if write fails mid-way
- ❌ No schema enforcement → Anyone can write anything
- ❌ No change history → "What data was there yesterday?" → Unknown
- ❌ No efficient updates/deletes → To change 1 row you rewrite entire table
- ❌ "Small files" problem → Thousands of small files = slow queries

**With Delta Lake:**
- ✅ ACID Transactions → Atomic writes, all or nothing
- ✅ Schema Enforcement → Rejects data that doesn't match schema
- ✅ Time Travel → Go to any previous version
- ✅ MERGE (efficient upserts) → UPDATE, DELETE, INSERT in one operation
- ✅ OPTIMIZE + Z-ORDER → Compacts files and optimizes queries

### Why Delta Lake is CRITICAL for your career?

1. **It's the de facto standard**: Databricks, AWS, Azure, GCP all support Delta
2. **Interview question**: "Why would you use Delta Lake?" is very common
3. **Certification**: 30-40% of Databricks exam is about Delta Lake
4. **Differentiator**: Knowing Delta sets you apart from other candidates`,
        pt: `## Delta Lake: O Formato que Mudou Tudo

Delta Lake é um **formato de armazenamento open-source** criado pelo Databricks que converte seu data lake em um lakehouse confiável.

### O Problema que Resolve

**Antes do Delta Lake:**
- ❌ Sem transações ACID → Dados corrompidos se falhar no meio
- ❌ Sem schema enforcement → Qualquer um escreve qualquer coisa
- ❌ Sem histórico → "Que dados tinha ontem?" → Não se sabe
- ❌ Sem updates/deletes eficientes
- ❌ Problema de "small files"

**Com Delta Lake:**
- ✅ Transações ACID
- ✅ Schema Enforcement
- ✅ Time Travel
- ✅ MERGE (upserts eficientes)
- ✅ OPTIMIZE + Z-ORDER

### Por que Delta Lake é CRÍTICO para sua carreira?

1. É o padrão de facto
2. Pergunta comum em entrevistas
3. 30-40% do exame de certificação
4. Te diferencia de outros candidatos`
      },
      practicalTips: [
        { es: '💡 Delta Lake es open source (delta.io), pero Databricks tiene optimizaciones exclusivas como Photon y Liquid Clustering.', en: '💡 Delta Lake is open source (delta.io), but Databricks has exclusive optimizations like Photon and Liquid Clustering.', pt: '💡 Delta Lake é open source (delta.io), mas Databricks tem otimizações exclusivas como Photon e Liquid Clustering.' },
        { es: '🎯 En Databricks, Delta es el formato DEFAULT. No necesitás especificarlo.', en: '🎯 In Databricks, Delta is the DEFAULT format. You don\'t need to specify it.', pt: '🎯 No Databricks, Delta é o formato DEFAULT. Você não precisa especificá-lo.' },
        { es: '📚 Memorizá esto: "Delta = Parquet + Transaction Log + ACID"', en: '📚 Memorize this: "Delta = Parquet + Transaction Log + ACID"', pt: '📚 Memorize isso: "Delta = Parquet + Transaction Log + ACID"' }
      ],
      externalLinks: [
        { title: 'Delta Lake Official Site', url: 'https://delta.io/', type: 'docs' },
        { title: 'Delta Lake Paper (original)', url: 'https://www.vldb.org/pvldb/vol13/p3411-armbrust.pdf', type: 'article' },
        { title: 'What is Delta Lake? (Databricks)', url: 'https://docs.databricks.com/delta/index.html', type: 'docs' }
      ],
      checkpoint: { es: '🤔 Explicá en tus palabras: ¿Por qué Delta Lake es mejor que Parquet para un data warehouse moderno?', en: '🤔 Explain in your words: Why is Delta Lake better than Parquet for a modern data warehouse?', pt: '🤔 Explique com suas palavras: Por que Delta Lake é melhor que Parquet para um data warehouse moderno?' },
      xpReward: 25,
      estimatedMinutes: 30
    },
    {
      id: 'db-5-2',
      title: { es: 'Crear y Escribir Tablas Delta', en: 'Create and Write Delta Tables', pt: 'Criar e Escrever Tabelas Delta' },
      description: { es: 'Todas las formas de crear tablas Delta: desde DataFrames, SQL, y conversión de Parquet.', en: 'All the ways to create Delta tables: from DataFrames, SQL, and Parquet conversion.', pt: 'Todas as formas de criar tabelas Delta: de DataFrames, SQL e conversão de Parquet.' },
      theory: {
        es: `## Crear Tablas Delta

Hay múltiples formas de crear una tabla Delta. Vamos a ver todas:

### Método 1: Desde un DataFrame (más común)

\`\`\`python
# Crear un DataFrame
data = [
    (1, "Ana", 1000.50, "2024-01-15"),
    (2, "Bob", 2500.00, "2024-01-16"),
    (3, "Carlos", 1750.25, "2024-01-17")
]
df = spark.createDataFrame(data, ["id", "nombre", "monto", "fecha"])

# MÉTODO 1A: Guardar como tabla Delta (managed table)
df.write.format("delta").saveAsTable("ventas")

# MÉTODO 1B: Guardar en una ubicación específica (external table)
df.write.format("delta").save("/mnt/data/ventas_delta")

# MÉTODO 1C: Con opciones adicionales
df.write \\
    .format("delta") \\
    .mode("overwrite") \\  # overwrite, append, ignore, error
    .partitionBy("fecha") \\
    .option("overwriteSchema", "true") \\
    .save("/mnt/data/ventas_particionada")
\`\`\`

### Método 2: Usando SQL

\`\`\`sql
-- Crear tabla vacía con schema
CREATE TABLE ventas (
    id INT,
    nombre STRING,
    monto DOUBLE,
    fecha DATE
) USING DELTA
PARTITIONED BY (fecha);

-- Crear tabla desde SELECT
CREATE TABLE ventas_2024 AS
SELECT * FROM ventas WHERE fecha >= '2024-01-01';

-- Crear tabla en ubicación específica
CREATE TABLE ventas_externa
USING DELTA
LOCATION '/mnt/data/ventas_externa';

-- Insertar datos
INSERT INTO ventas VALUES (4, 'Diana', 3000.00, '2024-01-18');
\`\`\`

### Método 3: Convertir Parquet existente a Delta

\`\`\`python
# Si ya tenés datos en Parquet, convertirlos es fácil:
from delta.tables import DeltaTable

# Convertir in-place (no copia datos, solo agrega _delta_log)
DeltaTable.convertToDelta(spark, "parquet.\`/mnt/data/mis_datos_parquet\`")

# O con SQL:
# CONVERT TO DELTA parquet.\`/mnt/data/mis_datos_parquet\`
\`\`\`

### Modos de Escritura

| Modo | Comportamiento |
|------|----------------|
| \`overwrite\` | Reemplaza toda la tabla |
| \`append\` | Agrega filas al final |
| \`ignore\` | No hace nada si la tabla existe |
| \`error\` (default) | Error si la tabla existe |

### Verificar que es Delta

\`\`\`python
# Listar archivos - debés ver _delta_log/
dbutils.fs.ls("/mnt/data/ventas_delta")

# Ver historial de versiones
spark.sql("DESCRIBE HISTORY ventas").show()

# Ver detalles de la tabla
spark.sql("DESCRIBE DETAIL ventas").show()
\`\`\`

### Estructura de archivos Delta

\`\`\`
/mnt/data/ventas_delta/
├── _delta_log/
│   └── 00000000000000000000.json   # Primera versión (metadata)
├── part-00000-xxx.snappy.parquet   # Datos comprimidos
├── part-00001-xxx.snappy.parquet
└── part-00002-xxx.snappy.parquet
\`\`\``,
        en: `## Create Delta Tables

There are multiple ways to create a Delta table. Let's see them all:

### Method 1: From a DataFrame (most common)

\`\`\`python
# Create a DataFrame
data = [(1, "Ana", 1000.50), (2, "Bob", 2500.00)]
df = spark.createDataFrame(data, ["id", "name", "amount"])

# Save as Delta table (managed)
df.write.format("delta").saveAsTable("sales")

# Save to specific location (external)
df.write.format("delta").save("/mnt/data/sales_delta")

# With additional options
df.write \\
    .format("delta") \\
    .mode("overwrite") \\
    .partitionBy("date") \\
    .save("/mnt/data/sales_partitioned")
\`\`\`

### Method 2: Using SQL

\`\`\`sql
-- Create empty table with schema
CREATE TABLE sales (id INT, name STRING, amount DOUBLE)
USING DELTA;

-- Create from SELECT
CREATE TABLE sales_2024 AS SELECT * FROM sales;
\`\`\`

### Method 3: Convert existing Parquet to Delta

\`\`\`python
from delta.tables import DeltaTable
DeltaTable.convertToDelta(spark, "parquet.\`/path/to/parquet\`")
\`\`\`

### Write Modes

| Mode | Behavior |
|------|----------|
| overwrite | Replace entire table |
| append | Add rows at the end |
| ignore | Do nothing if table exists |
| error | Error if table exists |`,
        pt: `## Criar Tabelas Delta

### Método 1: De um DataFrame

\`\`\`python
df.write.format("delta").saveAsTable("vendas")
\`\`\`

### Método 2: Usando SQL

\`\`\`sql
CREATE TABLE vendas (id INT, nome STRING) USING DELTA;
\`\`\`

### Método 3: Converter Parquet existente

\`\`\`python
DeltaTable.convertToDelta(spark, "parquet.\`/path/to/parquet\`")
\`\`\``
      },
      codeExample: {
        language: 'python',
        code: `# Ejemplo completo: Crear tabla Delta
from pyspark.sql.types import *

# 1. Definir schema
schema = StructType([
    StructField("id", IntegerType(), False),
    StructField("producto", StringType(), True),
    StructField("precio", DoubleType(), True),
    StructField("categoria", StringType(), True),
    StructField("fecha_venta", DateType(), True)
])

# 2. Crear datos de ejemplo
data = [
    (1, "Laptop", 999.99, "Electronics", "2024-01-15"),
    (2, "Mouse", 29.99, "Electronics", "2024-01-15"),
    (3, "Notebook", 5.99, "Office", "2024-01-16"),
]
df = spark.createDataFrame(data, schema)

# 3. Guardar como tabla Delta particionada
df.write \\
    .format("delta") \\
    .mode("overwrite") \\
    .partitionBy("categoria") \\
    .saveAsTable("productos_delta")

# 4. Verificar
display(spark.sql("DESCRIBE DETAIL productos_delta"))
display(spark.sql("DESCRIBE HISTORY productos_delta"))`,
        explanation: { es: 'Este ejemplo crea una tabla Delta particionada por categoría, lo cual optimiza queries que filtran por categoría.', en: 'This example creates a Delta table partitioned by category, which optimizes queries filtering by category.', pt: 'Este exemplo cria uma tabela Delta particionada por categoria, otimizando queries que filtram por categoria.' }
      },
      practicalTips: [
        { es: '⚡ En Databricks, no necesitás escribir .format("delta") - es el default.', en: '⚡ In Databricks, you don\'t need to write .format("delta") - it\'s the default.', pt: '⚡ No Databricks, não precisa escrever .format("delta") - é o padrão.' },
        { es: '📁 La carpeta _delta_log es sagrada. NUNCA la borres manualmente.', en: '📁 The _delta_log folder is sacred. NEVER delete it manually.', pt: '📁 A pasta _delta_log é sagrada. NUNCA a delete manualmente.' },
        { es: '💡 Usá partitionBy() solo si tenés muchos datos y queries frecuentes por esa columna.', en: '💡 Use partitionBy() only if you have lots of data and frequent queries by that column.', pt: '💡 Use partitionBy() apenas se tiver muitos dados e queries frequentes por essa coluna.' }
      ],
      externalLinks: [
        { title: 'Create Delta Tables', url: 'https://docs.databricks.com/delta/delta-batch.html#create-a-table', type: 'docs' },
        { title: 'Delta Table Properties', url: 'https://docs.databricks.com/delta/table-properties.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Creaste una tabla Delta y verificaste que existe la carpeta _delta_log?', en: '✅ Did you create a Delta table and verify the _delta_log folder exists?', pt: '✅ Você criou uma tabela Delta e verificou que existe a pasta _delta_log?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-5-2b',
      title: { es: 'COPY INTO: Carga Idempotente de Datos', en: 'COPY INTO: Idempotent Data Loading', pt: 'COPY INTO: Carga Idempotente de Dados' },
      description: { es: 'COPY INTO es el comando preferido para cargar datos de forma segura y sin duplicados.', en: 'COPY INTO is the preferred command for loading data safely and without duplicates.', pt: 'COPY INTO é o comando preferido para carregar dados de forma segura e sem duplicados.' },
      theory: {
        es: `## COPY INTO: Carga de Datos Sin Duplicados

COPY INTO es un comando SQL de Databricks que carga datos de forma **idempotente** - si lo ejecutas 2 veces con los mismos archivos, no hay duplicados.

### ¿Por qué COPY INTO?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│         COMPARACIÓN DE MÉTODOS DE CARGA                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INSERT INTO / spark.write.mode("append"):                  │
│  ❌ Si ejecutas 2 veces = DUPLICADOS                        │
│                                                              │
│  COPY INTO:                                                  │
│  ✅ Si ejecutas 2 veces = MISMO RESULTADO (idempotente)     │
│  ✅ Trackea qué archivos ya se cargaron                     │
│  ✅ Más eficiente que Auto Loader para cargas puntuales     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Sintaxis Básica

\`\`\`sql
-- Cargar CSVs a tabla Delta
COPY INTO my_catalog.my_schema.my_table
FROM 's3://my-bucket/data/incoming/'
FILEFORMAT = CSV
FORMAT_OPTIONS (
    'header' = 'true',
    'delimiter' = ','
)
COPY_OPTIONS (
    'mergeSchema' = 'true'
);
\`\`\`

### Formatos Soportados

\`\`\`sql
-- JSON
COPY INTO target_table
FROM '/data/json/'
FILEFORMAT = JSON
FORMAT_OPTIONS ('multiLine' = 'true');

-- PARQUET
COPY INTO target_table
FROM '/data/parquet/'
FILEFORMAT = PARQUET;

-- AVRO
COPY INTO target_table
FROM '/data/avro/'
FILEFORMAT = AVRO;

-- CSV con opciones
COPY INTO target_table
FROM '/data/csv/'
FILEFORMAT = CSV
FORMAT_OPTIONS (
    'header' = 'true',
    'delimiter' = '|',
    'quote' = '"',
    'escape' = '\\\\',
    'nullValue' = 'NA',
    'dateFormat' = 'yyyy-MM-dd'
);
\`\`\`

### COPY INTO con Transformaciones

\`\`\`sql
-- Seleccionar y transformar columnas
COPY INTO bronze.sales
FROM (
    SELECT 
        _c0::INT as sale_id,
        _c1::STRING as product,
        _c2::DOUBLE as amount,
        _c3::DATE as sale_date,
        current_timestamp() as ingestion_time
    FROM 's3://bucket/raw/sales/'
)
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'false');

-- Filtrar archivos por patrón
COPY INTO bronze.logs
FROM 's3://bucket/logs/'
FILEFORMAT = JSON
PATTERN = '*.json'  -- Solo archivos .json
COPY_OPTIONS ('force' = 'false');
\`\`\`

### Opciones Importantes

| Opción | Descripción |
|--------|-------------|
| \`mergeSchema\` | Evolucionar schema automáticamente |
| \`force\` | true = re-cargar archivos ya cargados |
| \`PATTERN\` | Filtrar archivos por regex |

### COPY INTO vs Auto Loader

| Feature | COPY INTO | Auto Loader |
|---------|-----------|-------------|
| Tipo | SQL command | Streaming |
| Uso | Cargas puntuales/scheduled | Continuo |
| Schema inference | Manual o inferSchema | Automático |
| Tracking | Por comando | Checkpoint |
| Mejor para | Batch ETL, migraciones | Streaming, pipelines |

### Ejemplo Completo: Pipeline de Carga

\`\`\`sql
-- 1. Crear tabla destino
CREATE TABLE IF NOT EXISTS bronze.transactions (
    transaction_id BIGINT,
    customer_id BIGINT,
    amount DOUBLE,
    currency STRING,
    transaction_date DATE,
    _ingestion_time TIMESTAMP
);

-- 2. Cargar datos (idempotente)
COPY INTO bronze.transactions
FROM (
    SELECT 
        transaction_id::BIGINT,
        customer_id::BIGINT,
        amount::DOUBLE,
        currency::STRING,
        transaction_date::DATE,
        current_timestamp() as _ingestion_time
    FROM 's3://raw-data/transactions/2024/01/'
)
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true')
COPY_OPTIONS ('mergeSchema' = 'true');

-- 3. Verificar carga
SELECT COUNT(*) as rows_loaded FROM bronze.transactions;
\`\`\`

### Python API

\`\`\`python
# COPY INTO desde Python
spark.sql("""
    COPY INTO bronze.events
    FROM 's3://bucket/events/'
    FILEFORMAT = JSON
""")

# Verificar
df = spark.table("bronze.events")
print(f"Total rows: {df.count()}")
\`\`\``,
        en: `## COPY INTO: Idempotent Data Loading

COPY INTO is a Databricks SQL command that loads data **idempotently** - if you run it twice with the same files, there are no duplicates.

\`\`\`sql
COPY INTO my_table
FROM 's3://bucket/data/'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true')
COPY_OPTIONS ('mergeSchema' = 'true');
\`\`\`

### Key Benefits
- Idempotent (no duplicates)
- Tracks loaded files
- Schema evolution support`,
        pt: `## COPY INTO: Carga Idempotente de Dados

COPY INTO é um comando SQL do Databricks que carrega dados de forma **idempotente** - se você executar 2 vezes com os mesmos arquivos, não há duplicados.

\`\`\`sql
COPY INTO minha_tabela
FROM 's3://bucket/dados/'
FILEFORMAT = CSV
FORMAT_OPTIONS ('header' = 'true')
COPY_OPTIONS ('mergeSchema' = 'true');
\`\`\``
      },
      practicalTips: [
        { es: '⭐ COPY INTO es pregunta SEGURA en el examen de certificación. Sabé la sintaxis de memoria.', en: '⭐ COPY INTO is a SURE question on the certification exam. Know the syntax by heart.', pt: '⭐ COPY INTO é pergunta CERTA no exame de certificação. Saiba a sintaxe de cor.' },
        { es: '🔄 force=true re-carga archivos ya procesados. Úsalo solo si necesitas reprocesar.', en: '🔄 force=true reloads already processed files. Use only if you need to reprocess.', pt: '🔄 force=true re-carrega arquivos já processados. Use só se precisar reprocessar.' },
        { es: '💡 Para streaming continuo, usa Auto Loader. Para cargas batch/scheduled, usa COPY INTO.', en: '💡 For continuous streaming, use Auto Loader. For batch/scheduled loads, use COPY INTO.', pt: '💡 Para streaming contínuo, use Auto Loader. Para cargas batch/scheduled, use COPY INTO.' }
      ],
      externalLinks: [
        { title: 'COPY INTO', url: 'https://docs.databricks.com/sql/language-manual/delta-copy-into.html', type: 'docs' },
        { title: 'COPY INTO vs Auto Loader', url: 'https://docs.databricks.com/ingestion/copy-into/index.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Cargaste datos con COPY INTO y verificaste que no hay duplicados al re-ejecutar?', en: '✅ Did you load data with COPY INTO and verify there are no duplicates when re-running?', pt: '✅ Você carregou dados com COPY INTO e verificou que não há duplicados ao re-executar?' },
      xpReward: 35,
      estimatedMinutes: 30
    },
    {
      id: 'db-5-3',
      title: { es: 'Time Travel: Viajar en el Tiempo', en: 'Time Travel: Travel Through Time', pt: 'Time Travel: Viagem no Tempo' },
      description: { es: 'Accede a cualquier versión anterior de tus datos. Ideal para auditorías, debugging y recuperación.', en: 'Access any previous version of your data. Ideal for audits, debugging and recovery.', pt: 'Acesse qualquer versão anterior dos seus dados. Ideal para auditorias, debugging e recuperação.' },
      theory: {
        es: `## Time Travel en Delta Lake

Time Travel te permite acceder a **cualquier versión anterior** de una tabla. Es como Git para tus datos.

### ¿Cómo funciona?

Cada operación en Delta Lake crea una nueva versión:

\`\`\`
Versión 0: Tabla creada con 100 filas
Versión 1: INSERT de 50 filas nuevas
Versión 2: UPDATE de 10 filas
Versión 3: DELETE de 5 filas
Versión 4: MERGE con datos nuevos
\`\`\`

### Ver el historial de versiones

\`\`\`sql
-- Ver todas las versiones
DESCRIBE HISTORY mi_tabla;

-- Resultado:
-- version | timestamp           | operation | operationParameters
-- 4       | 2024-01-18 15:30:00| MERGE     | ...
-- 3       | 2024-01-18 14:00:00| DELETE    | ...
-- 2       | 2024-01-17 10:00:00| UPDATE    | ...
-- 1       | 2024-01-16 09:00:00| WRITE     | ...
-- 0       | 2024-01-15 08:00:00| CREATE    | ...
\`\`\`

### Acceder a versiones anteriores

**Por número de versión:**
\`\`\`python
# Leer versión específica
df_v2 = spark.read.format("delta") \\
    .option("versionAsOf", 2) \\
    .load("/path/to/table")

# Con SQL
spark.sql("SELECT * FROM mi_tabla VERSION AS OF 2")

# Sintaxis alternativa con @
spark.sql("SELECT * FROM mi_tabla@v2")
\`\`\`

**Por timestamp:**
\`\`\`python
# Leer por fecha/hora
df_ayer = spark.read.format("delta") \\
    .option("timestampAsOf", "2024-01-17 10:00:00") \\
    .load("/path/to/table")

# Con SQL
spark.sql("SELECT * FROM mi_tabla TIMESTAMP AS OF '2024-01-17 10:00:00'")
\`\`\`

### Casos de uso de Time Travel

**1. Debugging - ¿Qué cambió?**
\`\`\`python
# Comparar versión actual vs anterior
df_actual = spark.table("ventas")
df_ayer = spark.read.option("versionAsOf", 5).table("ventas")

# Encontrar diferencias
nuevas_filas = df_actual.exceptAll(df_ayer)
filas_eliminadas = df_ayer.exceptAll(df_actual)
\`\`\`

**2. Recuperación - Rollback**
\`\`\`python
# Restaurar versión anterior
spark.sql("RESTORE TABLE ventas TO VERSION AS OF 3")
\`\`\`

**3. Auditoría - ¿Qué había el día X?**
\`\`\`python
# Ver datos del primer día del mes
df_inicio_mes = spark.read \\
    .option("timestampAsOf", "2024-01-01 00:00:00") \\
    .table("ventas")
\`\`\`

**4. Reproducibilidad - ML Training**
\`\`\`python
# Entrenar modelo con datos de versión específica
# (para poder reproducir resultados exactos)
training_data = spark.read \\
    .option("versionAsOf", 42) \\
    .table("features")
\`\`\`

### Retención de historial

Por default, Delta Lake mantiene historial por **30 días**. Después de VACUUM, las versiones antiguas se eliminan.

\`\`\`python
# Ver configuración de retención
spark.sql("SHOW TBLPROPERTIES mi_tabla")

# Cambiar retención (ejemplo: 90 días)
spark.sql("""
    ALTER TABLE mi_tabla 
    SET TBLPROPERTIES (delta.logRetentionDuration = '90 days')
""")
\`\`\`

### ⚠️ Importante sobre Time Travel

\`\`\`
Time Travel solo funciona si:
1. No ejecutaste VACUUM con retención menor al tiempo que querés viajar
2. Los archivos de datos todavía existen

Si ejecutás VACUUM RETAIN 0 HOURS, perdés todo el historial!
\`\`\``,
        en: `## Time Travel in Delta Lake

Time Travel lets you access **any previous version** of a table. It's like Git for your data.

### How it works?

Each Delta Lake operation creates a new version. You can access any version by number or timestamp.

### View version history

\`\`\`sql
DESCRIBE HISTORY my_table;
\`\`\`

### Access previous versions

**By version number:**
\`\`\`python
df_v2 = spark.read.option("versionAsOf", 2).table("my_table")
\`\`\`

**By timestamp:**
\`\`\`python
df_yesterday = spark.read.option("timestampAsOf", "2024-01-17").table("my_table")
\`\`\`

### Use cases

1. **Debugging**: Compare current vs previous version
2. **Recovery**: Rollback with RESTORE
3. **Audit**: What data existed on date X?
4. **ML Reproducibility**: Train with specific data version`,
        pt: `## Time Travel no Delta Lake

Time Travel permite acessar **qualquer versão anterior** de uma tabela.

### Ver histórico

\`\`\`sql
DESCRIBE HISTORY minha_tabela;
\`\`\`

### Acessar versões anteriores

**Por número de versão:**
\`\`\`python
df_v2 = spark.read.option("versionAsOf", 2).table("minha_tabela")
\`\`\`

**Por timestamp:**
\`\`\`python
df_ontem = spark.read.option("timestampAsOf", "2024-01-17").table("minha_tabela")
\`\`\``
      },
      codeExample: {
        language: 'python',
        code: `# Ejemplo práctico de Time Travel

# 1. Crear tabla inicial
spark.sql("""
    CREATE OR REPLACE TABLE demo_time_travel (
        id INT, nombre STRING, valor INT
    ) USING DELTA
""")
spark.sql("INSERT INTO demo_time_travel VALUES (1, 'A', 100), (2, 'B', 200)")

# 2. Hacer algunas modificaciones
spark.sql("UPDATE demo_time_travel SET valor = 150 WHERE id = 1")
spark.sql("INSERT INTO demo_time_travel VALUES (3, 'C', 300)")
spark.sql("DELETE FROM demo_time_travel WHERE id = 2")

# 3. Ver historial
display(spark.sql("DESCRIBE HISTORY demo_time_travel"))

# 4. Viajar en el tiempo
print("=== Versión 0 (original) ===")
display(spark.sql("SELECT * FROM demo_time_travel VERSION AS OF 0"))

print("=== Versión actual ===")
display(spark.sql("SELECT * FROM demo_time_travel"))

# 5. Restaurar versión anterior si fue un error
# spark.sql("RESTORE TABLE demo_time_travel TO VERSION AS OF 1")`,
        explanation: { es: 'Este ejemplo muestra cómo cada operación crea una nueva versión y cómo viajar entre ellas.', en: 'This example shows how each operation creates a new version and how to travel between them.', pt: 'Este exemplo mostra como cada operação cria uma nova versão e como viajar entre elas.' }
      },
      practicalTips: [
        { es: '🔍 Time Travel es PERFECTO para debugging: "¿Por qué este reporte cambió?"', en: '🔍 Time Travel is PERFECT for debugging: "Why did this report change?"', pt: '🔍 Time Travel é PERFEITO para debugging: "Por que esse relatório mudou?"' },
        { es: '⚠️ RESTORE crea una nueva versión, no borra el historial. Siempre podés volver atrás.', en: '⚠️ RESTORE creates a new version, doesn\'t delete history. You can always go back.', pt: '⚠️ RESTORE cria uma nova versão, não apaga o histórico. Sempre pode voltar atrás.' },
        { es: '💡 Guardá el número de versión cuando entrenás modelos ML para reproducibilidad.', en: '💡 Save the version number when training ML models for reproducibility.', pt: '💡 Salve o número da versão ao treinar modelos ML para reprodutibilidade.' }
      ],
      externalLinks: [
        { title: 'Delta Lake Time Travel', url: 'https://docs.databricks.com/delta/history.html', type: 'docs' },
        { title: 'RESTORE Command', url: 'https://docs.databricks.com/sql/language-manual/delta-restore.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Viajaste a una versión anterior y comparaste los datos con la versión actual?', en: '✅ Did you travel to a previous version and compare the data with the current version?', pt: '✅ Você viajou para uma versão anterior e comparou os dados com a versão atual?' },
      xpReward: 35,
      estimatedMinutes: 30
    },
    {
      id: 'db-5-3b',
      title: { es: 'CLONE: Copiar Tablas Eficientemente', en: 'CLONE: Copy Tables Efficiently', pt: 'CLONE: Copiar Tabelas Eficientemente' },
      description: { es: 'CLONE crea copias de tablas Delta de forma eficiente, ideal para testing, desarrollo y backups.', en: 'CLONE creates copies of Delta tables efficiently, ideal for testing, development and backups.', pt: 'CLONE cria cópias de tabelas Delta de forma eficiente, ideal para testing, desenvolvimento e backups.' },
      theory: {
        es: `## CLONE: Copias de Tablas Sin Duplicar Datos

CLONE permite crear copias de tablas Delta de dos formas diferentes, cada una con sus casos de uso.

### Tipos de Clone

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    SHALLOW CLONE                             │
├─────────────────────────────────────────────────────────────┤
│ • Solo copia METADATA (transaction log)                     │
│ • Los datos apuntan a los archivos originales              │
│ • MUY RÁPIDO (segundos)                                    │
│ • Sin costo de storage adicional                           │
│ • ⚠️ Si se elimina la tabla original, el clone se rompe   │
│                                                              │
│ Ideal para:                                                  │
│ • Testing rápido                                            │
│ • Experimentos temporales                                   │
│ • Desarrollo local                                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     DEEP CLONE                               │
├─────────────────────────────────────────────────────────────┤
│ • Copia METADATA + TODOS LOS DATOS                          │
│ • Tabla completamente independiente                         │
│ • Tarda más (copia archivos físicamente)                   │
│ • Duplica uso de storage                                    │
│ • ✅ Tabla original y clone son independientes             │
│                                                              │
│ Ideal para:                                                  │
│ • Backups reales                                            │
│ • Migraciones a otro bucket/región                         │
│ • Ambientes de staging permanentes                         │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Sintaxis SQL

\`\`\`sql
-- SHALLOW CLONE (rápido, comparte datos)
CREATE TABLE dev.mi_tabla_test
SHALLOW CLONE prod.mi_tabla;

-- DEEP CLONE (completo, independiente)
CREATE TABLE backup.mi_tabla_backup
DEEP CLONE prod.mi_tabla;

-- Clone de versión específica (Time Travel)
CREATE TABLE dev.mi_tabla_v5
SHALLOW CLONE prod.mi_tabla VERSION AS OF 5;

-- Clone a timestamp específico
CREATE TABLE dev.mi_tabla_ayer
DEEP CLONE prod.mi_tabla TIMESTAMP AS OF '2024-01-15';

-- Clone a ubicación externa
CREATE TABLE backup.mi_tabla_s3
DEEP CLONE prod.mi_tabla
LOCATION 's3://backup-bucket/tables/mi_tabla/';
\`\`\`

### Python API

\`\`\`python
# Shallow clone
spark.sql("""
    CREATE TABLE dev.customers_test
    SHALLOW CLONE prod.customers
""")

# Deep clone con versión
spark.sql("""
    CREATE TABLE backup.customers_20240115
    DEEP CLONE prod.customers VERSION AS OF 100
""")

# Verificar que son independientes
original_count = spark.table("prod.customers").count()
clone_count = spark.table("backup.customers_20240115").count()
print(f"Original: {original_count}, Clone: {clone_count}")
\`\`\`

### Caso de Uso 1: Testing en Desarrollo

\`\`\`sql
-- Desarrollador necesita probar con datos de prod
-- Sin copiar terabytes de datos

-- 1. Crear shallow clone (segundos)
CREATE TABLE dev.orders_test
SHALLOW CLONE prod.orders;

-- 2. El desarrollador puede:
--    - Hacer queries
--    - Modificar datos (no afecta prod)
--    - Probar transformaciones

-- 3. Cuando termina, eliminar
DROP TABLE dev.orders_test;
-- (Los datos de prod siguen intactos)
\`\`\`

### Caso de Uso 2: Backup Antes de Migración

\`\`\`sql
-- Antes de hacer cambios grandes, crear backup
CREATE TABLE backup.customers_pre_migration
DEEP CLONE prod.customers;

-- Ejecutar migración riesgosa
ALTER TABLE prod.customers ADD COLUMN new_field STRING;
UPDATE prod.customers SET new_field = 'default';

-- Si algo sale mal:
-- DROP TABLE prod.customers;
-- ALTER TABLE backup.customers_pre_migration RENAME TO prod.customers;
\`\`\`

### Caso de Uso 3: Ambiente de Staging

\`\`\`sql
-- Crear staging como clone de prod
CREATE OR REPLACE TABLE staging.orders
DEEP CLONE prod.orders;

CREATE OR REPLACE TABLE staging.customers
DEEP CLONE prod.customers;

-- Staging es ahora una copia exacta de prod
-- para testing de nuevas features
\`\`\`

### Clone Incremental (Solo Deep Clone)

\`\`\`sql
-- Primera vez: clone completo
CREATE TABLE backup.orders_backup
DEEP CLONE prod.orders;

-- Actualizaciones incrementales (solo cambios)
CREATE OR REPLACE TABLE backup.orders_backup
DEEP CLONE prod.orders;
-- Delta Lake detecta cambios y solo copia lo nuevo
\`\`\`

### Comparación Rápida

| Aspecto | Shallow Clone | Deep Clone |
|---------|---------------|------------|
| Velocidad | Segundos | Minutos/Horas |
| Storage | 0 adicional | 100% duplicado |
| Independencia | Dependiente | Independiente |
| Time Travel | Hereda del original | Propio |
| Uso típico | Dev/Test temporal | Backup/Staging |`,
        en: `## CLONE: Copy Tables Without Duplicating Data

CLONE creates Delta table copies in two different ways.

\`\`\`sql
-- SHALLOW CLONE (fast, shares data)
CREATE TABLE dev.test_table
SHALLOW CLONE prod.source_table;

-- DEEP CLONE (complete, independent)
CREATE TABLE backup.backup_table
DEEP CLONE prod.source_table;

-- Clone specific version
CREATE TABLE dev.table_v5
SHALLOW CLONE prod.source VERSION AS OF 5;
\`\`\`

### When to Use
- Shallow: Dev/testing (fast, no storage cost)
- Deep: Backups, staging (independent copy)`,
        pt: `## CLONE: Copiar Tabelas Sem Duplicar Dados

CLONE cria cópias de tabelas Delta de duas formas diferentes.

\`\`\`sql
-- SHALLOW CLONE (rápido, compartilha dados)
CREATE TABLE dev.tabela_teste
SHALLOW CLONE prod.tabela_fonte;

-- DEEP CLONE (completo, independente)
CREATE TABLE backup.tabela_backup
DEEP CLONE prod.tabela_fonte;
\`\`\``
      },
      practicalTips: [
        { es: '⚡ Shallow clone es perfecto para desarrollo - crea un "ambiente de prod" en segundos.', en: '⚡ Shallow clone is perfect for development - creates a "prod environment" in seconds.', pt: '⚡ Shallow clone é perfeito para desenvolvimento - cria um "ambiente de prod" em segundos.' },
        { es: '🎯 CLONE es pregunta frecuente en el examen: "¿Diferencia entre Shallow y Deep clone?"', en: '🎯 CLONE is a frequent exam question: "Difference between Shallow and Deep clone?"', pt: '🎯 CLONE é pergunta frequente no exame: "Diferença entre Shallow e Deep clone?"' },
        { es: '⚠️ No uses shallow clone para backups reales - si se borra el original, el clone se rompe.', en: '⚠️ Don\'t use shallow clone for real backups - if original is deleted, clone breaks.', pt: '⚠️ Não use shallow clone para backups reais - se o original for deletado, o clone quebra.' }
      ],
      externalLinks: [
        { title: 'Delta Lake Clone', url: 'https://docs.databricks.com/delta/clone.html', type: 'docs' },
        { title: 'Clone a Delta Table', url: 'https://docs.databricks.com/sql/language-manual/delta-clone.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Creaste un shallow clone y verificaste que los cambios no afectan la tabla original?', en: '✅ Did you create a shallow clone and verify changes don\'t affect the original table?', pt: '✅ Você criou um shallow clone e verificou que as mudanças não afetam a tabela original?' },
      xpReward: 30,
      estimatedMinutes: 25
    },
    {
      id: 'db-5-4',
      title: { es: 'MERGE: Upserts Eficientes', en: 'MERGE: Efficient Upserts', pt: 'MERGE: Upserts Eficientes' },
      description: { es: 'MERGE es LA operación más importante de Delta Lake. Permite INSERT, UPDATE y DELETE en una sola operación atómica.', en: 'MERGE is THE most important Delta Lake operation. Allows INSERT, UPDATE and DELETE in a single atomic operation.', pt: 'MERGE é A operação mais importante do Delta Lake. Permite INSERT, UPDATE e DELETE em uma única operação atômica.' },
      theory: {
        es: `## MERGE: La Operación Más Poderosa de Delta

MERGE permite sincronizar una tabla destino con datos fuente en **una sola operación atómica**. Es esencial para:
- CDC (Change Data Capture)
- SCD Type 2 (Slowly Changing Dimensions)
- Deduplicación
- Sincronización de datos

### Sintaxis Básica

\`\`\`sql
MERGE INTO tabla_destino AS target
USING datos_nuevos AS source
ON target.id = source.id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
\`\`\`

### Casos de Uso Detallados

**1. Upsert Simple (Update + Insert)**
\`\`\`sql
MERGE INTO clientes AS target
USING nuevos_clientes AS source
ON target.cliente_id = source.cliente_id
WHEN MATCHED THEN 
    UPDATE SET 
        nombre = source.nombre,
        email = source.email,
        updated_at = current_timestamp()
WHEN NOT MATCHED THEN 
    INSERT (cliente_id, nombre, email, created_at)
    VALUES (source.cliente_id, source.nombre, source.email, current_timestamp());
\`\`\`

**2. Upsert con DELETE (CDC completo)**
\`\`\`sql
MERGE INTO productos AS target
USING cambios_productos AS source
ON target.producto_id = source.producto_id
WHEN MATCHED AND source.operacion = 'DELETE' THEN DELETE
WHEN MATCHED AND source.operacion = 'UPDATE' THEN UPDATE SET *
WHEN NOT MATCHED AND source.operacion = 'INSERT' THEN INSERT *;
\`\`\`

**3. SCD Type 1 (Sobrescribir histórico)**
\`\`\`sql
-- Simplemente actualizar el valor actual
MERGE INTO dim_cliente AS target
USING staging_cliente AS source
ON target.cliente_id = source.cliente_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
\`\`\`

**4. SCD Type 2 (Mantener histórico)**
\`\`\`sql
-- Paso 1: Cerrar registros actuales que cambiaron
MERGE INTO dim_cliente AS target
USING (
    SELECT s.*, current_timestamp() as fecha_cierre
    FROM staging_cliente s
    JOIN dim_cliente d ON s.cliente_id = d.cliente_id
    WHERE d.es_actual = true AND (s.nombre != d.nombre OR s.email != d.email)
) AS source
ON target.cliente_id = source.cliente_id AND target.es_actual = true
WHEN MATCHED THEN UPDATE SET 
    es_actual = false,
    fecha_fin = source.fecha_cierre;

-- Paso 2: Insertar nuevos registros
MERGE INTO dim_cliente AS target
USING staging_cliente AS source
ON target.cliente_id = source.cliente_id AND target.es_actual = true
WHEN NOT MATCHED THEN INSERT (
    cliente_id, nombre, email, fecha_inicio, fecha_fin, es_actual
) VALUES (
    source.cliente_id, source.nombre, source.email, 
    current_timestamp(), null, true
);
\`\`\`

**5. Deduplicación**
\`\`\`sql
-- Insertar solo si no existe
MERGE INTO eventos AS target
USING nuevos_eventos AS source
ON target.event_id = source.event_id
WHEN NOT MATCHED THEN INSERT *;
\`\`\`

### MERGE con Python (DeltaTable API)

\`\`\`python
from delta.tables import DeltaTable

# Cargar tabla destino
dt = DeltaTable.forPath(spark, "/path/to/tabla")
# o: dt = DeltaTable.forName(spark, "mi_tabla")

# Ejecutar MERGE
dt.alias("target").merge(
    df_nuevos.alias("source"),
    "target.id = source.id"
).whenMatchedUpdateAll() \\
 .whenNotMatchedInsertAll() \\
 .execute()

# Con condiciones específicas
dt.alias("target").merge(
    df_cambios.alias("source"),
    "target.id = source.id"
).whenMatchedUpdate(
    condition="source.timestamp > target.timestamp",
    set={"valor": "source.valor", "updated_at": "current_timestamp()"}
).whenNotMatchedInsert(
    values={"id": "source.id", "valor": "source.valor", "created_at": "current_timestamp()"}
).execute()
\`\`\`

### Performance Tips para MERGE

1. **Usa partition pruning**: Si la tabla está particionada, incluí la columna de partición en la condición ON
2. **Ordená los datos source**: Si es posible, ordená por la columna de join
3. **Limita las columnas**: Usa columnas específicas en vez de \`*\`
4. **Considera Z-ORDER**: En la columna de join para acelerar el matching`,
        en: `## MERGE: The Most Powerful Delta Operation

MERGE allows synchronizing a target table with source data in **a single atomic operation**.

### Basic Syntax

\`\`\`sql
MERGE INTO target_table AS target
USING new_data AS source
ON target.id = source.id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
\`\`\`

### Use Cases

1. **Simple Upsert**: Update existing, insert new
2. **CDC with DELETE**: Handle inserts, updates, and deletes
3. **SCD Type 1**: Overwrite history
4. **SCD Type 2**: Maintain history
5. **Deduplication**: Insert only if not exists`,
        pt: `## MERGE: A Operação Mais Poderosa do Delta

MERGE permite sincronizar uma tabela destino com dados fonte em **uma única operação atômica**.

### Sintaxe Básica

\`\`\`sql
MERGE INTO tabela_destino AS target
USING dados_novos AS source
ON target.id = source.id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
\`\`\``
      },
      codeExample: {
        language: 'python',
        code: `# Ejemplo completo de MERGE en Python

from delta.tables import DeltaTable

# 1. Crear tabla destino
spark.sql("""
    CREATE OR REPLACE TABLE clientes_delta (
        id INT, nombre STRING, email STRING, saldo DOUBLE, updated_at TIMESTAMP
    ) USING DELTA
""")
spark.sql("""
    INSERT INTO clientes_delta VALUES 
    (1, 'Ana', 'ana@mail.com', 100.0, current_timestamp()),
    (2, 'Bob', 'bob@mail.com', 200.0, current_timestamp())
""")

# 2. Crear datos nuevos (algunos updates, algunos inserts)
nuevos = spark.createDataFrame([
    (1, "Ana García", "ana.garcia@mail.com", 150.0),  # UPDATE
    (2, "Bob", "bob@mail.com", 250.0),                 # UPDATE (solo saldo)
    (3, "Carlos", "carlos@mail.com", 300.0),          # INSERT
], ["id", "nombre", "email", "saldo"])

# 3. Ejecutar MERGE
dt = DeltaTable.forName(spark, "clientes_delta")

dt.alias("target").merge(
    nuevos.alias("source"),
    "target.id = source.id"
).whenMatchedUpdate(
    set={
        "nombre": "source.nombre",
        "email": "source.email",
        "saldo": "source.saldo",
        "updated_at": "current_timestamp()"
    }
).whenNotMatchedInsert(
    values={
        "id": "source.id",
        "nombre": "source.nombre",
        "email": "source.email",
        "saldo": "source.saldo",
        "updated_at": "current_timestamp()"
    }
).execute()

# 4. Ver resultado
display(spark.table("clientes_delta"))
display(spark.sql("DESCRIBE HISTORY clientes_delta"))`,
        explanation: { es: 'Este ejemplo muestra un MERGE completo: actualiza clientes existentes e inserta nuevos, todo en una operación atómica.', en: 'This example shows a complete MERGE: updates existing customers and inserts new ones, all in one atomic operation.', pt: 'Este exemplo mostra um MERGE completo: atualiza clientes existentes e insere novos, tudo em uma operação atômica.' }
      },
      practicalTips: [
        { es: '🎯 MERGE es la operación #1 en entrevistas de Data Engineering. Practicala mucho.', en: '🎯 MERGE is the #1 operation in Data Engineering interviews. Practice it a lot.', pt: '🎯 MERGE é a operação #1 em entrevistas de Data Engineering. Pratique muito.' },
        { es: '⚡ whenMatchedUpdateAll() y whenNotMatchedInsertAll() son atajos para SET/VALUES *.', en: '⚡ whenMatchedUpdateAll() and whenNotMatchedInsertAll() are shortcuts for SET/VALUES *.', pt: '⚡ whenMatchedUpdateAll() e whenNotMatchedInsertAll() são atalhos para SET/VALUES *.' },
        { es: '🔍 Usá DESCRIBE HISTORY después de MERGE para ver cuántas filas se afectaron.', en: '🔍 Use DESCRIBE HISTORY after MERGE to see how many rows were affected.', pt: '🔍 Use DESCRIBE HISTORY depois do MERGE para ver quantas filas foram afetadas.' }
      ],
      externalLinks: [
        { title: 'MERGE INTO', url: 'https://docs.databricks.com/delta/merge.html', type: 'docs' },
        { title: 'Delta MERGE Performance', url: 'https://docs.databricks.com/delta/merge.html#performance-tuning', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Ejecutaste un MERGE que hace UPDATE y INSERT en la misma operación?', en: '✅ Did you run a MERGE that does UPDATE and INSERT in the same operation?', pt: '✅ Você executou um MERGE que faz UPDATE e INSERT na mesma operação?' },
      xpReward: 40,
      estimatedMinutes: 40
    },
    {
      id: 'db-5-5',
      title: { es: 'Schema Enforcement y Evolution', en: 'Schema Enforcement and Evolution', pt: 'Schema Enforcement e Evolution' },
      description: { es: 'Delta Lake protege la calidad de tus datos rechazando schemas incompatibles, pero permite evolución controlada.', en: 'Delta Lake protects your data quality by rejecting incompatible schemas, but allows controlled evolution.', pt: 'Delta Lake protege a qualidade dos seus dados rejeitando schemas incompatíveis, mas permite evolução controlada.' },
      theory: {
        es: `## Schema Enforcement: El Guardián de tus Datos

Delta Lake **rechaza automáticamente** datos que no coinciden con el schema de la tabla. Esto evita la corrupción de datos.

### ¿Qué verifica Schema Enforcement?

\`\`\`
✅ Nombres de columnas deben coincidir
✅ Tipos de datos deben ser compatibles
✅ Nullability debe ser respetada
❌ Columnas extra en source → ERROR (por default)
❌ Columnas faltantes → ERROR
❌ Tipos incompatibles → ERROR
\`\`\`

### Ejemplo de Schema Enforcement

\`\`\`python
# Tabla existente
# Schema: id INT, nombre STRING, precio DOUBLE

# Esto funciona ✅
df_ok = spark.createDataFrame([(1, "Laptop", 999.99)], ["id", "nombre", "precio"])
df_ok.write.mode("append").saveAsTable("productos")

# Esto FALLA ❌ (columna extra)
df_extra = spark.createDataFrame([(2, "Mouse", 29.99, "Electronics")], 
                                  ["id", "nombre", "precio", "categoria"])
df_extra.write.mode("append").saveAsTable("productos")
# Error: A]cannot be merged to a schema

# Esto FALLA ❌ (tipo incorrecto)
df_tipo = spark.createDataFrame([(3, "Keyboard", "cien")],  # precio es STRING
                                 ["id", "nombre", "precio"])
df_tipo.write.mode("append").saveAsTable("productos")
# Error: Failed to merge fields
\`\`\`

## Schema Evolution: Evolución Controlada

Cuando QUERÉS agregar columnas nuevas, usás Schema Evolution:

### Agregar columnas nuevas (mergeSchema)

\`\`\`python
# Agregar columna "categoria" a tabla existente
df_nuevo = spark.createDataFrame([
    (4, "Monitor", 299.99, "Electronics")
], ["id", "nombre", "precio", "categoria"])

df_nuevo.write \\
    .mode("append") \\
    .option("mergeSchema", "true") \\  # Permite agregar columnas
    .saveAsTable("productos")

# Ahora la tabla tiene: id, nombre, precio, categoria
# Las filas anteriores tendrán NULL en "categoria"
\`\`\`

### Con SQL

\`\`\`sql
-- Agregar columna manualmente
ALTER TABLE productos ADD COLUMN categoria STRING;

-- O permitir merge automático
SET spark.databricks.delta.schema.autoMerge.enabled = true;
INSERT INTO productos VALUES (5, 'Webcam', 79.99, 'Electronics');
\`\`\`

### Cambios de schema permitidos

| Cambio | mergeSchema | overwriteSchema |
|--------|-------------|-----------------|
| Agregar columna | ✅ | ✅ |
| Eliminar columna | ❌ | ✅ |
| Cambiar tipo de dato | ❌ | ✅ |
| Renombrar columna | ❌ | ✅ |
| Reordenar columnas | ✅ | ✅ |

### overwriteSchema: El Martillo Grande

\`\`\`python
# CUIDADO: Esto reemplaza el schema completamente
df_nuevo_schema.write \\
    .mode("overwrite") \\
    .option("overwriteSchema", "true") \\
    .saveAsTable("productos")
\`\`\`

### Configuración Global

\`\`\`python
# Habilitar auto-merge para toda la sesión
spark.conf.set("spark.databricks.delta.schema.autoMerge.enabled", "true")

# Habilitar para una tabla específica
spark.sql("""
    ALTER TABLE mi_tabla 
    SET TBLPROPERTIES ('delta.autoMerge.enabled' = 'true')
""")
\`\`\`

### Best Practices de Schema Management

1. **Development**: Usa mergeSchema para iterar rápido
2. **Production**: Schema enforcement estricto
3. **Migraciones**: Usa ALTER TABLE para cambios controlados
4. **Breaking changes**: Crea tabla nueva + migración`,
        en: `## Schema Enforcement: The Guardian of Your Data

Delta Lake **automatically rejects** data that doesn't match the table schema.

### Schema Evolution

When you WANT to add new columns:

\`\`\`python
df_new.write \\
    .mode("append") \\
    .option("mergeSchema", "true") \\
    .saveAsTable("products")
\`\`\`

### Allowed schema changes

| Change | mergeSchema | overwriteSchema |
|--------|-------------|-----------------|
| Add column | ✅ | ✅ |
| Remove column | ❌ | ✅ |
| Change data type | ❌ | ✅ |`,
        pt: `## Schema Enforcement: O Guardião dos Seus Dados

Delta Lake **rejeita automaticamente** dados que não coincidem com o schema da tabela.

### Schema Evolution

Quando você QUER adicionar colunas novas:

\`\`\`python
df_novo.write \\
    .mode("append") \\
    .option("mergeSchema", "true") \\
    .saveAsTable("produtos")
\`\`\``
      },
      practicalTips: [
        { es: '🛡️ Schema Enforcement es tu amigo. No lo desactives en producción.', en: '🛡️ Schema Enforcement is your friend. Don\'t disable it in production.', pt: '🛡️ Schema Enforcement é seu amigo. Não o desabilite em produção.' },
        { es: '💡 Usá ALTER TABLE para cambios de schema en producción - es más controlado.', en: '💡 Use ALTER TABLE for schema changes in production - it\'s more controlled.', pt: '💡 Use ALTER TABLE para mudanças de schema em produção - é mais controlado.' },
        { es: '⚠️ overwriteSchema puede perder datos si no tenés cuidado. Siempre hacé backup.', en: '⚠️ overwriteSchema can lose data if you\'re not careful. Always backup.', pt: '⚠️ overwriteSchema pode perder dados se não tiver cuidado. Sempre faça backup.' }
      ],
      externalLinks: [
        { title: 'Schema Enforcement', url: 'https://docs.databricks.com/delta/delta-batch.html#schema-enforcement', type: 'docs' },
        { title: 'Schema Evolution', url: 'https://docs.databricks.com/delta/delta-batch.html#schema-evolution', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Probaste qué pasa cuando escribís datos con schema diferente? ¿Y con mergeSchema?', en: '✅ Did you test what happens when writing data with different schema? And with mergeSchema?', pt: '✅ Você testou o que acontece ao escrever dados com schema diferente? E com mergeSchema?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-5-6',
      title: { es: 'OPTIMIZE y Compactación', en: 'OPTIMIZE and Compaction', pt: 'OPTIMIZE e Compactação' },
      description: { es: 'OPTIMIZE combina archivos pequeños en archivos grandes para mejorar dramáticamente la performance de lectura.', en: 'OPTIMIZE combines small files into large files to dramatically improve read performance.', pt: 'OPTIMIZE combina arquivos pequenos em arquivos grandes para melhorar dramaticamente a performance de leitura.' },
      theory: {
        es: `## El Problema de los Archivos Pequeños

Cuando hacés muchos appends pequeños, terminás con miles de archivos diminutos:

\`\`\`
mi_tabla/
├── part-00001.parquet  (10 KB)
├── part-00002.parquet  (15 KB)
├── part-00003.parquet  (8 KB)
├── ... (10,000 archivos más)
└── part-10000.parquet  (12 KB)

Problema: Leer 10,000 archivos pequeños es MUY lento
- Cada archivo = 1 request al storage
- Overhead de metadata por archivo
- No aprovecha el I/O paralelo eficientemente
\`\`\`

## OPTIMIZE: La Solución

OPTIMIZE compacta archivos pequeños en archivos de ~1GB:

\`\`\`sql
-- Optimizar toda la tabla
OPTIMIZE mi_tabla;

-- Optimizar particiones específicas
OPTIMIZE mi_tabla WHERE fecha >= '2024-01-01';

-- Ver resultado
DESCRIBE DETAIL mi_tabla;
-- Antes: numFiles = 10,000
-- Después: numFiles = 50
\`\`\`

### ¿Cuándo ejecutar OPTIMIZE?

\`\`\`
✅ Después de muchos appends pequeños
✅ Cuando las queries están lentas
✅ Antes de ejecutar queries analíticas grandes
✅ En schedule (cada hora/día según carga)

❌ Después de cada write (overhead innecesario)
❌ En tablas con pocos datos
\`\`\`

### Configuración de OPTIMIZE

\`\`\`python
# Tamaño objetivo de archivo (default: 1GB)
spark.sql("SET spark.databricks.delta.optimize.maxFileSize = 134217728")  # 128MB

# Mínimo de archivos para triggear optimize
spark.sql("SET spark.databricks.delta.optimize.minFileSize = 1048576")  # 1MB
\`\`\`

## OPTIMIZE ZORDER: Ordenamiento Multidimensional

Z-ORDER organiza los datos para que las queries sean más rápidas:

\`\`\`sql
-- Optimizar Y ordenar por columnas frecuentes en WHERE
OPTIMIZE ventas ZORDER BY (region, fecha);
\`\`\`

### ¿Cómo funciona Z-ORDER?

\`\`\`
Sin Z-ORDER:
┌─────────────────────────────────────────┐
│ Archivo 1: region=AR,MX,BR,CO           │
│ Archivo 2: region=AR,MX,BR,CO           │
│ Archivo 3: region=AR,MX,BR,CO           │
└─────────────────────────────────────────┘
Query: WHERE region = 'AR' → Lee TODOS los archivos

Con ZORDER BY (region):
┌─────────────────────────────────────────┐
│ Archivo 1: region=AR (min=AR, max=AR)   │
│ Archivo 2: region=BR (min=BR, max=BR)   │
│ Archivo 3: region=MX,CO                 │
└─────────────────────────────────────────┘
Query: WHERE region = 'AR' → Lee SOLO archivo 1 (Data Skipping!)
\`\`\`

### Best Practices para Z-ORDER

\`\`\`
✅ Usar en columnas de filtro frecuente (WHERE)
✅ Máximo 3-4 columnas (más no mejora mucho)
✅ Columnas de alta cardinalidad funcionan mejor
✅ La primera columna es la más importante

❌ No usar en columnas que nunca filtrás
❌ No usar en columnas con muy baja cardinalidad (ej: boolean)
\`\`\`

### Auto Optimize (Databricks)

\`\`\`sql
-- Habilitar optimización automática en escritura
ALTER TABLE mi_tabla SET TBLPROPERTIES (
    'delta.autoOptimize.optimizeWrite' = 'true',
    'delta.autoOptimize.autoCompact' = 'true'
);
\`\`\`

**optimizeWrite**: Optimiza el tamaño de archivo en cada escritura
**autoCompact**: Compacta archivos pequeños automáticamente`,
        en: `## The Small Files Problem

When you do many small appends, you end up with thousands of tiny files. OPTIMIZE compacts them into ~1GB files.

\`\`\`sql
OPTIMIZE my_table;
OPTIMIZE my_table ZORDER BY (region, date);
\`\`\`

### When to run OPTIMIZE?

- After many small appends
- When queries are slow
- On schedule (hourly/daily)

### Z-ORDER

Organizes data so queries filtering by those columns read fewer files (data skipping).`,
        pt: `## O Problema dos Arquivos Pequenos

OPTIMIZE compacta arquivos pequenos em arquivos de ~1GB.

\`\`\`sql
OPTIMIZE minha_tabela;
OPTIMIZE minha_tabela ZORDER BY (regiao, data);
\`\`\``
      },
      practicalTips: [
        { es: '⏰ Programá OPTIMIZE para que corra en horarios de baja carga (ej: 3am).', en: '⏰ Schedule OPTIMIZE to run during low-load hours (e.g., 3am).', pt: '⏰ Programe OPTIMIZE para rodar em horários de baixa carga (ex: 3h).' },
        { es: '📊 Usá DESCRIBE DETAIL antes y después de OPTIMIZE para ver la mejora.', en: '📊 Use DESCRIBE DETAIL before and after OPTIMIZE to see the improvement.', pt: '📊 Use DESCRIBE DETAIL antes e depois do OPTIMIZE para ver a melhora.' },
        { es: '💡 Auto Optimize es genial para tablas con streaming - evita archivos pequeños.', en: '💡 Auto Optimize is great for streaming tables - avoids small files.', pt: '💡 Auto Optimize é ótimo para tabelas com streaming - evita arquivos pequenos.' }
      ],
      externalLinks: [
        { title: 'OPTIMIZE Command', url: 'https://docs.databricks.com/delta/optimize.html', type: 'docs' },
        { title: 'Z-Ordering', url: 'https://docs.databricks.com/delta/optimizations/file-mgmt.html#z-ordering-multi-dimensional-clustering', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Ejecutaste OPTIMIZE en una tabla y verificaste la reducción de archivos con DESCRIBE DETAIL?', en: '✅ Did you run OPTIMIZE on a table and verify the file reduction with DESCRIBE DETAIL?', pt: '✅ Você executou OPTIMIZE em uma tabela e verificou a redução de arquivos com DESCRIBE DETAIL?' },
      xpReward: 35,
      estimatedMinutes: 30
    },
    {
      id: 'db-5-7',
      title: { es: 'VACUUM: Limpieza y Espacio', en: 'VACUUM: Cleanup and Space', pt: 'VACUUM: Limpeza e Espaço' },
      description: { es: 'VACUUM elimina archivos antiguos que ya no son necesarios, liberando espacio de almacenamiento.', en: 'VACUUM removes old files that are no longer needed, freeing storage space.', pt: 'VACUUM remove arquivos antigos que não são mais necessários, liberando espaço de armazenamento.' },
      theory: {
        es: `## VACUUM: Limpieza de Archivos Obsoletos

Cuando Delta Lake hace UPDATE, DELETE o OPTIMIZE, los archivos viejos no se borran inmediatamente (para permitir Time Travel). VACUUM los elimina.

### ¿Qué archivos elimina VACUUM?

\`\`\`
mi_tabla/
├── _delta_log/            # NUNCA se toca
├── part-00001.parquet     # Versión actual - NO eliminar
├── part-00002.parquet     # Versión actual - NO eliminar
├── part-00003-OLD.parquet # Ya no referenciado - ELIMINAR ✓
├── part-00004-OLD.parquet # Ya no referenciado - ELIMINAR ✓
└── part-00005-OLD.parquet # Ya no referenciado - ELIMINAR ✓
\`\`\`

### Ejecutar VACUUM

\`\`\`sql
-- Ver qué se eliminaría (dry run)
VACUUM mi_tabla RETAIN 168 HOURS DRY RUN;

-- Eliminar archivos >7 días (default)
VACUUM mi_tabla;

-- Eliminar archivos >24 horas
VACUUM mi_tabla RETAIN 24 HOURS;

-- ⚠️ PELIGRO: Eliminar todo inmediatamente
-- spark.sql("SET spark.databricks.delta.retentionDurationCheck.enabled = false")
-- VACUUM mi_tabla RETAIN 0 HOURS;
\`\`\`

### Retención Default

- **Default**: 168 horas (7 días)
- **Mínimo permitido**: 168 horas (sin desactivar check)
- **Recomendado**: 7-30 días según necesidades de auditoría

### ⚠️ ADVERTENCIA CRÍTICA

\`\`\`
DESPUÉS DE VACUUM, PIERDES TIME TRAVEL A VERSIONES ANTERIORES
AL PERÍODO DE RETENCIÓN.

Ejemplo:
- VACUUM RETAIN 24 HOURS
- Ya NO puedes hacer: SELECT * FROM tabla VERSION AS OF 2
  (si versión 2 tiene más de 24 horas)
\`\`\`

### VACUUM y Time Travel: El Trade-off

\`\`\`
Mayor retención = Más espacio + Más Time Travel
Menor retención = Menos espacio + Menos Time Travel

Recomendaciones:
- Tablas de auditoría: 30-90 días
- Tablas operacionales: 7 días
- Tablas de desarrollo: 1-3 días
\`\`\`

### Configurar Retención por Tabla

\`\`\`sql
-- Configurar retención a 30 días
ALTER TABLE mi_tabla SET TBLPROPERTIES (
    'delta.deletedFileRetentionDuration' = '30 days',
    'delta.logRetentionDuration' = '30 days'
);

-- Ver configuración actual
SHOW TBLPROPERTIES mi_tabla;
\`\`\`

### Automatizar VACUUM

\`\`\`python
# En un Job de Databricks (daily)
from delta.tables import DeltaTable

tablas = ["ventas", "clientes", "productos"]

for tabla in tablas:
    dt = DeltaTable.forName(spark, tabla)
    dt.vacuum(168)  # 7 días
    print(f"VACUUM completado para {tabla}")
\`\`\``,
        en: `## VACUUM: Cleanup of Obsolete Files

VACUUM removes old files that are no longer referenced by any version within the retention period.

\`\`\`sql
-- Dry run
VACUUM my_table RETAIN 168 HOURS DRY RUN;

-- Execute
VACUUM my_table RETAIN 24 HOURS;
\`\`\`

### ⚠️ CRITICAL WARNING

After VACUUM, you lose Time Travel to versions older than the retention period!`,
        pt: `## VACUUM: Limpeza de Arquivos Obsoletos

VACUUM remove arquivos antigos que não são mais referenciados.

\`\`\`sql
VACUUM minha_tabela RETAIN 168 HOURS;
\`\`\`

⚠️ Depois do VACUUM, você perde Time Travel para versões anteriores ao período de retenção!`
      },
      practicalTips: [
        { es: '🔒 NUNCA uses RETAIN 0 HOURS en producción sin entender las consecuencias.', en: '🔒 NEVER use RETAIN 0 HOURS in production without understanding the consequences.', pt: '🔒 NUNCA use RETAIN 0 HOURS em produção sem entender as consequências.' },
        { es: '📅 Programá VACUUM semanal después de OPTIMIZE para máxima limpieza.', en: '📅 Schedule weekly VACUUM after OPTIMIZE for maximum cleanup.', pt: '📅 Programe VACUUM semanal depois do OPTIMIZE para máxima limpeza.' },
        { es: '💡 Usá DRY RUN primero para ver cuánto espacio vas a recuperar.', en: '💡 Use DRY RUN first to see how much space you\'ll recover.', pt: '💡 Use DRY RUN primeiro para ver quanto espaço vai recuperar.' }
      ],
      externalLinks: [
        { title: 'VACUUM Command', url: 'https://docs.databricks.com/delta/vacuum.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Ejecutaste VACUUM DRY RUN y viste cuántos archivos se eliminarían?', en: '✅ Did you run VACUUM DRY RUN and see how many files would be deleted?', pt: '✅ Você executou VACUUM DRY RUN e viu quantos arquivos seriam deletados?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-5-8',
      title: { es: 'Change Data Feed (CDF)', en: 'Change Data Feed (CDF)', pt: 'Change Data Feed (CDF)' },
      description: { es: 'CDF permite capturar solo los cambios incrementales (inserts, updates, deletes) para pipelines eficientes.', en: 'CDF allows capturing only incremental changes (inserts, updates, deletes) for efficient pipelines.', pt: 'CDF permite capturar apenas as mudanças incrementais (inserts, updates, deletes) para pipelines eficientes.' },
      theory: {
        es: `## Change Data Feed: CDC Nativo de Delta Lake

Change Data Feed (CDF) te permite leer solo los cambios desde la última lectura, en vez de re-leer toda la tabla.

### ¿Por qué CDF?

\`\`\`
SIN CDF (full table scan cada vez):
┌────────────────────────────────────────┐
│ Tabla: 1 billón de filas               │
│ Cambios diarios: 10,000 filas          │
│ Pipeline lee: 1 billón de filas 😰     │
└────────────────────────────────────────┘

CON CDF (solo cambios):
┌────────────────────────────────────────┐
│ Tabla: 1 billón de filas               │
│ Cambios diarios: 10,000 filas          │
│ Pipeline lee: 10,000 filas 🚀          │
└────────────────────────────────────────┘
\`\`\`

### Habilitar CDF

\`\`\`sql
-- En tabla nueva
CREATE TABLE eventos (
    id INT, tipo STRING, timestamp TIMESTAMP
) USING DELTA
TBLPROPERTIES (delta.enableChangeDataFeed = true);

-- En tabla existente
ALTER TABLE eventos SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
\`\`\`

### Leer cambios

\`\`\`python
# Leer cambios desde versión específica
cambios = spark.read.format("delta") \\
    .option("readChangeFeed", "true") \\
    .option("startingVersion", 5) \\
    .table("eventos")

# Leer cambios desde timestamp
cambios = spark.read.format("delta") \\
    .option("readChangeFeed", "true") \\
    .option("startingTimestamp", "2024-01-15 00:00:00") \\
    .table("eventos")

# Leer rango de versiones
cambios = spark.read.format("delta") \\
    .option("readChangeFeed", "true") \\
    .option("startingVersion", 5) \\
    .option("endingVersion", 10) \\
    .table("eventos")
\`\`\`

### Columnas especiales de CDF

CDF agrega columnas automáticamente:

| Columna | Descripción |
|---------|-------------|
| \`_change_type\` | 'insert', 'update_preimage', 'update_postimage', 'delete' |
| \`_commit_version\` | Versión de Delta donde ocurrió el cambio |
| \`_commit_timestamp\` | Timestamp del cambio |

\`\`\`python
# Ejemplo de output
# +----+------+-------------+---------------+-------------------+
# | id | tipo |_change_type |_commit_version|_commit_timestamp  |
# +----+------+-------------+---------------+-------------------+
# |  1 |  A   | insert      |             5 | 2024-01-15 10:00  |
# |  2 |  B   | delete      |             6 | 2024-01-15 11:00  |
# |  3 |  C   | update_pre  |             7 | 2024-01-15 12:00  |
# |  3 |  D   | update_post |             7 | 2024-01-15 12:00  |
# +----+------+-------------+---------------+-------------------+
\`\`\`

### Streaming con CDF

\`\`\`python
# Stream incremental de cambios
stream = spark.readStream.format("delta") \\
    .option("readChangeFeed", "true") \\
    .option("startingVersion", 0) \\
    .table("eventos")

# Procesar solo inserts y updates
stream_filtrado = stream.filter(
    "_change_type IN ('insert', 'update_postimage')"
)
\`\`\`

### Casos de uso de CDF

1. **ETL incremental**: Solo procesar cambios nuevos
2. **Sincronización**: Replicar cambios a otro sistema
3. **Auditoría**: Log de todos los cambios
4. **ML Feature Store**: Actualizar features incrementalmente`,
        en: `## Change Data Feed: Delta Lake's Native CDC

CDF lets you read only changes since the last read, instead of re-reading the entire table.

### Enable CDF

\`\`\`sql
ALTER TABLE events SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
\`\`\`

### Read changes

\`\`\`python
changes = spark.read.format("delta") \\
    .option("readChangeFeed", "true") \\
    .option("startingVersion", 5) \\
    .table("events")
\`\`\`

CDF adds columns: _change_type, _commit_version, _commit_timestamp`,
        pt: `## Change Data Feed: CDC Nativo do Delta Lake

CDF permite ler apenas mudanças desde a última leitura.

\`\`\`sql
ALTER TABLE eventos SET TBLPROPERTIES (delta.enableChangeDataFeed = true);
\`\`\`

\`\`\`python
mudancas = spark.read.format("delta") \\
    .option("readChangeFeed", "true") \\
    .option("startingVersion", 5) \\
    .table("eventos")
\`\`\``
      },
      practicalTips: [
        { es: '🚀 CDF puede reducir el tiempo de ETL de horas a minutos.', en: '🚀 CDF can reduce ETL time from hours to minutes.', pt: '🚀 CDF pode reduzir o tempo de ETL de horas para minutos.' },
        { es: '💾 CDF tiene un pequeño overhead de storage (~1%). Vale la pena.', en: '💾 CDF has a small storage overhead (~1%). Worth it.', pt: '💾 CDF tem um pequeno overhead de storage (~1%). Vale a pena.' },
        { es: '🔍 Guardá el último _commit_version procesado para saber dónde continuar.', en: '🔍 Save the last processed _commit_version to know where to continue.', pt: '🔍 Salve o último _commit_version processado para saber onde continuar.' }
      ],
      externalLinks: [
        { title: 'Change Data Feed', url: 'https://docs.databricks.com/delta/delta-change-data-feed.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Habilitaste CDF, hiciste cambios en la tabla, y leíste solo los cambios?', en: '✅ Did you enable CDF, make changes to the table, and read only the changes?', pt: '✅ Você habilitou CDF, fez mudanças na tabela e leu apenas as mudanças?' },
      xpReward: 35,
      estimatedMinutes: 35
    },
    {
      id: 'db-5-9',
      title: { es: 'Liquid Clustering (Nuevo)', en: 'Liquid Clustering (New)', pt: 'Liquid Clustering (Novo)' },
      description: { es: 'Liquid Clustering es la evolución de Z-ORDER: clustering automático e incremental sin particiones.', en: 'Liquid Clustering is the evolution of Z-ORDER: automatic and incremental clustering without partitions.', pt: 'Liquid Clustering é a evolução do Z-ORDER: clustering automático e incremental sem partições.' },
      theory: {
        es: `## Liquid Clustering: El Futuro del Ordenamiento

Liquid Clustering es una feature **exclusiva de Databricks** que reemplaza y mejora:
- Particionamiento tradicional
- Z-ORDER manual

### Problemas con el approach tradicional

\`\`\`
Particionamiento:
❌ Hay que elegir columnas de partición upfront
❌ Cambiar particiones requiere reescribir toda la tabla
❌ Over-partitioning = small files
❌ Under-partitioning = queries lentas

Z-ORDER:
❌ Hay que ejecutarlo manualmente
❌ No es incremental (reescribe toda la tabla)
❌ Costoso en tablas grandes
\`\`\`

### Liquid Clustering: La Solución

\`\`\`
✅ Clustering automático en escritura
✅ Incremental (solo archivos nuevos)
✅ Puedes cambiar columnas de clustering sin reescribir
✅ Sin problema de small files
✅ Data skipping optimizado
\`\`\`

### Crear tabla con Liquid Clustering

\`\`\`sql
-- Nueva tabla
CREATE TABLE ventas_liquid (
    id BIGINT,
    producto STRING,
    region STRING,
    fecha DATE,
    monto DOUBLE
) 
USING DELTA
CLUSTER BY (region, fecha);  -- ← Liquid Clustering

-- Convertir tabla existente
ALTER TABLE ventas_existente
CLUSTER BY (region, fecha);
\`\`\`

### Clustering automático

\`\`\`sql
-- Habilitar clustering automático
ALTER TABLE ventas_liquid 
SET TBLPROPERTIES ('delta.enableOptimizeWrite' = 'true');

-- Los datos se clusterean automáticamente en cada escritura!
INSERT INTO ventas_liquid VALUES (1, 'Laptop', 'AR', '2024-01-15', 999.99);
\`\`\`

### Cambiar columnas de clustering

\`\`\`sql
-- Cambiar de (region, fecha) a (producto, region)
ALTER TABLE ventas_liquid
CLUSTER BY (producto, region);

-- No reescribe datos existentes
-- Nuevos datos usarán el nuevo clustering
-- OPTIMIZE aplicará el nuevo clustering a datos existentes
\`\`\`

### OPTIMIZE con Liquid Clustering

\`\`\`sql
-- Aplica clustering a datos no clusterados
OPTIMIZE ventas_liquid;
-- No necesita ZORDER BY - usa las columnas de CLUSTER BY automáticamente
\`\`\`

### Verificar clustering

\`\`\`sql
DESCRIBE DETAIL ventas_liquid;
-- Verás: clusteringColumns = ["region", "fecha"]
\`\`\`

### Liquid Clustering vs Partitioning vs Z-ORDER

| Feature | Partitioning | Z-ORDER | Liquid Clustering |
|---------|--------------|---------|-------------------|
| Setup | Upfront | Manual | Flexible |
| Cambiar columnas | Reescribir todo | N/A | Fácil |
| Incremental | N/A | No | Sí |
| Small files | Problemático | N/A | Resuelto |
| Costo de OPTIMIZE | N/A | Alto | Bajo |

### Cuándo usar Liquid Clustering

\`\`\`
✅ Tablas nuevas (siempre preferir LC)
✅ Tablas que necesitan filtrar por múltiples columnas
✅ Tablas con patrones de query cambiantes
✅ Tablas con streaming (evita small files)

❌ Tablas muy pequeñas (<1GB)
❌ Si necesitas compatibilidad con Delta OSS
\`\`\``,
        en: `## Liquid Clustering: The Future of Data Layout

Liquid Clustering is a **Databricks exclusive** feature that replaces partitioning and Z-ORDER.

\`\`\`sql
CREATE TABLE sales_liquid (id BIGINT, region STRING, date DATE)
USING DELTA CLUSTER BY (region, date);
\`\`\`

Benefits:
- Automatic clustering on write
- Incremental (only new files)
- Can change clustering columns without rewriting
- No small files problem`,
        pt: `## Liquid Clustering: O Futuro do Layout de Dados

Liquid Clustering é uma feature **exclusiva do Databricks** que substitui particionamento e Z-ORDER.

\`\`\`sql
CREATE TABLE vendas_liquid (id BIGINT, regiao STRING, data DATE)
USING DELTA CLUSTER BY (regiao, data);
\`\`\``
      },
      practicalTips: [
        { es: '🆕 Liquid Clustering es relativamente nuevo. Para tablas nuevas, úsalo siempre.', en: '🆕 Liquid Clustering is relatively new. For new tables, always use it.', pt: '🆕 Liquid Clustering é relativamente novo. Para tabelas novas, sempre use.' },
        { es: '💡 Liquid Clustering funciona mejor con Photon habilitado.', en: '💡 Liquid Clustering works best with Photon enabled.', pt: '💡 Liquid Clustering funciona melhor com Photon habilitado.' },
        { es: '⚠️ Es exclusivo de Databricks, no funciona en Delta Lake OSS.', en: '⚠️ It\'s Databricks exclusive, doesn\'t work in Delta Lake OSS.', pt: '⚠️ É exclusivo do Databricks, não funciona no Delta Lake OSS.' }
      ],
      externalLinks: [
        { title: 'Liquid Clustering', url: 'https://docs.databricks.com/delta/clustering.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Creaste una tabla con CLUSTER BY y verificaste con DESCRIBE DETAIL?', en: '✅ Did you create a table with CLUSTER BY and verify with DESCRIBE DETAIL?', pt: '✅ Você criou uma tabela com CLUSTER BY e verificou com DESCRIBE DETAIL?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-5-10',
      title: { es: 'Proyecto: Pipeline Delta Lake Completo', en: 'Project: Complete Delta Lake Pipeline', pt: 'Projeto: Pipeline Delta Lake Completo' },
      description: { es: 'Construí un pipeline de producción usando todas las features de Delta Lake que aprendiste.', en: 'Build a production pipeline using all the Delta Lake features you learned.', pt: 'Construa um pipeline de produção usando todas as features do Delta Lake que aprendeu.' },
      theory: {
        es: `## Proyecto Final: E-commerce Data Pipeline

Vas a construir un pipeline completo para un e-commerce ficticio usando todas las técnicas de Delta Lake.

### Arquitectura del Pipeline

\`\`\`
                  ┌─────────────────┐
                  │   RAW DATA      │
                  │  (JSON files)   │
                  └────────┬────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    BRONZE LAYER                               │
│  • Ingesta raw con schema evolution                          │
│  • Append-only (historial completo)                          │
│  • CDF habilitado para downstream                            │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    SILVER LAYER                               │
│  • Limpieza y deduplicación                                  │
│  • MERGE para upserts                                        │
│  • Schema enforcement estricto                               │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                     GOLD LAYER                                │
│  • Agregaciones de negocio                                   │
│  • OPTIMIZE + Z-ORDER para queries                           │
│  • Métricas y KPIs                                           │
└──────────────────────────────────────────────────────────────┘
\`\`\`

### Paso 1: Crear tablas Bronze

\`\`\`python
# Bronze: Pedidos raw
spark.sql("""
CREATE TABLE IF NOT EXISTS bronze_pedidos (
    order_id STRING,
    customer_id STRING,
    product_id STRING,
    quantity INT,
    price DOUBLE,
    order_date TIMESTAMP,
    raw_data STRING,
    ingestion_time TIMESTAMP
) USING DELTA
TBLPROPERTIES (
    delta.enableChangeDataFeed = true,
    delta.autoOptimize.optimizeWrite = true
)
""")
\`\`\`

### Paso 2: Silver con MERGE

\`\`\`python
from delta.tables import DeltaTable

# Leer cambios de bronze usando CDF
cambios = spark.read.format("delta") \\
    .option("readChangeFeed", "true") \\
    .option("startingVersion", last_processed_version) \\
    .table("bronze_pedidos") \\
    .filter("_change_type IN ('insert', 'update_postimage')")

# MERGE a silver (deduplicado)
silver = DeltaTable.forName(spark, "silver_pedidos")
silver.alias("target").merge(
    cambios.alias("source"),
    "target.order_id = source.order_id"
).whenMatchedUpdateAll() \\
 .whenNotMatchedInsertAll() \\
 .execute()
\`\`\`

### Paso 3: Gold con agregaciones

\`\`\`python
# Crear métricas de negocio
spark.sql("""
CREATE OR REPLACE TABLE gold_ventas_diarias AS
SELECT 
    DATE(order_date) as fecha,
    COUNT(DISTINCT order_id) as total_pedidos,
    COUNT(DISTINCT customer_id) as clientes_unicos,
    SUM(quantity * price) as revenue,
    AVG(quantity * price) as ticket_promedio
FROM silver_pedidos
GROUP BY DATE(order_date)
""")

# Optimizar para queries
spark.sql("OPTIMIZE gold_ventas_diarias ZORDER BY (fecha)")
\`\`\`

### Paso 4: Mantenimiento

\`\`\`python
# Script de mantenimiento diario
tablas = ["bronze_pedidos", "silver_pedidos", "gold_ventas_diarias"]

for tabla in tablas:
    print(f"Mantenimiento de {tabla}...")
    spark.sql(f"OPTIMIZE {tabla}")
    spark.sql(f"VACUUM {tabla} RETAIN 168 HOURS")
    print(f"✅ {tabla} completado")
\`\`\`

### Checklist del Proyecto

- [ ] Crear 3 tablas Delta (bronze, silver, gold)
- [ ] Implementar MERGE para deduplicación
- [ ] Habilitar CDF en bronze
- [ ] Usar Time Travel para debugging
- [ ] Ejecutar OPTIMIZE + Z-ORDER en gold
- [ ] Configurar VACUUM automatizado
- [ ] Documentar el pipeline`,
        en: `## Final Project: E-commerce Data Pipeline

Build a complete pipeline using all Delta Lake techniques.

### Checklist

- [ ] Create 3 Delta tables (bronze, silver, gold)
- [ ] Implement MERGE for deduplication
- [ ] Enable CDF on bronze
- [ ] Use Time Travel for debugging
- [ ] Run OPTIMIZE + Z-ORDER on gold
- [ ] Configure automated VACUUM
- [ ] Document the pipeline`,
        pt: `## Projeto Final: Pipeline de E-commerce

Construa um pipeline completo usando todas as técnicas de Delta Lake.

### Checklist

- [ ] Criar 3 tabelas Delta (bronze, silver, gold)
- [ ] Implementar MERGE para deduplicação
- [ ] Habilitar CDF na bronze
- [ ] Usar Time Travel para debugging
- [ ] Executar OPTIMIZE + Z-ORDER na gold
- [ ] Configurar VACUUM automatizado
- [ ] Documentar o pipeline`
      },
      practicalTips: [
        { es: '📝 Este proyecto puede ir directo a tu portfolio de GitHub.', en: '📝 This project can go directly to your GitHub portfolio.', pt: '📝 Este projeto pode ir direto para seu portfólio no GitHub.' },
        { es: '🎯 Practicá explicar cada decisión de diseño - es pregunta de entrevista.', en: '🎯 Practice explaining each design decision - it\'s an interview question.', pt: '🎯 Pratique explicar cada decisão de design - é pergunta de entrevista.' },
        { es: '💡 Agregá monitoreo: cuenta de filas, tiempos de ejecución, errores.', en: '💡 Add monitoring: row counts, execution times, errors.', pt: '💡 Adicione monitoramento: contagem de linhas, tempos de execução, erros.' }
      ],
      externalLinks: [
        { title: 'Medallion Architecture', url: 'https://docs.databricks.com/lakehouse/medallion.html', type: 'docs' },
        { title: 'Delta Lake Best Practices', url: 'https://docs.databricks.com/delta/best-practices.html', type: 'docs' }
      ],
      checkpoint: { es: '🏆 ¿Completaste el pipeline con las 3 capas y todas las operaciones de Delta Lake?', en: '🏆 Did you complete the pipeline with all 3 layers and all Delta Lake operations?', pt: '🏆 Você completou o pipeline com as 3 camadas e todas as operações do Delta Lake?' },
      xpReward: 75,
      estimatedMinutes: 90
    }
  ]
};
