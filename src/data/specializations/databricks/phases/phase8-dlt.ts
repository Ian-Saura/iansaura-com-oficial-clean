/**
 * FASE 8: Delta Live Tables (DLT)
 * ETL declarativo con calidad de datos incorporada
 */

import { DatabricksPhase } from '../types';

export const PHASE_8_DLT: DatabricksPhase = {
  id: 'db-phase-8',
  number: 8,
  title: { es: 'Delta Live Tables', en: 'Delta Live Tables', pt: 'Delta Live Tables' },
  subtitle: { es: 'ETL declarativo y calidad de datos', en: 'Declarative ETL and data quality', pt: 'ETL declarativo e qualidade de dados' },
  description: { 
    es: 'DLT es la forma más elegante de construir pipelines ETL en Databricks. Defines QUÉ quieres, no CÓMO hacerlo. Incluye validación de calidad de datos, manejo automático de dependencias, y CDC out-of-the-box.',
    en: 'DLT is the most elegant way to build ETL pipelines in Databricks. You define WHAT you want, not HOW to do it. Includes data quality validation, automatic dependency management, and CDC out-of-the-box.',
    pt: 'DLT é a forma mais elegante de construir pipelines ETL no Databricks. Você define O QUE quer, não COMO fazer. Inclui validação de qualidade de dados, gerenciamento automático de dependências e CDC out-of-the-box.'
  },
  icon: '🔄',
  color: 'teal',
  estimatedDays: '4-5 días',
  steps: [
    {
      id: 'db-8-1',
      title: { es: '¿Qué es Delta Live Tables?', en: 'What is Delta Live Tables?', pt: 'O que é Delta Live Tables?' },
      description: { es: 'Introducción a DLT y por qué es un game-changer para pipelines ETL.', en: 'Introduction to DLT and why it is a game-changer for ETL pipelines.', pt: 'Introdução ao DLT e por que é um game-changer para pipelines ETL.' },
      theory: {
        es: `## Delta Live Tables: ETL Declarativo

DLT cambia la forma de pensar en pipelines: en vez de escribir código imperativo paso a paso, **declaras el resultado que quieres** y DLT se encarga del resto.

### Imperativo vs Declarativo

\`\`\`
IMPERATIVO (tradicional):
"Primero lee el archivo, luego filtra nulls, luego 
haz join con otra tabla, luego escribe el resultado,
no olvides manejar errores, checkpoints, y retry..."

DECLARATIVO (DLT):
"Quiero una tabla llamada 'clean_orders' que sea 
el resultado de filtrar 'raw_orders' sin nulls
y hacer join con 'products'. Punto."
\`\`\`

### Comparación Visual

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                 PIPELINE TRADICIONAL                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  # 50+ líneas de código                                      │
│  df_raw = spark.read.format("json").load(path)              │
│  df_clean = df_raw.filter(col("id").isNotNull())           │
│  df_validated = validate_data(df_clean)  # custom function  │
│  if not is_valid:                                           │
│      send_alert()                                           │
│      raise Exception()                                       │
│  df_enriched = df_clean.join(dim_products, "product_id")    │
│  df_enriched.write.format("delta").mode("merge").option(...) │
│  # + manejo de errores, logging, retry, checkpoints...      │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    PIPELINE DLT                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  @dlt.table                                                  │
│  @dlt.expect_or_drop("valid_id", "id IS NOT NULL")          │
│  def clean_orders():                                         │
│      return dlt.read("raw_orders")                          │
│                                                              │
│  @dlt.table                                                  │
│  def enriched_orders():                                      │
│      return dlt.read("clean_orders").join(                  │
│          dlt.read("products"), "product_id"                 │
│      )                                                       │
│                                                              │
│  # DLT maneja: errores, retry, checkpoints, dependencias    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Conceptos Clave de DLT

| Concepto | Descripción |
|----------|-------------|
| **Pipeline** | Conjunto de tablas/views relacionadas |
| **Live Table** | Tabla materializada (se guarda en disco) |
| **Live View** | Vista virtual (se calcula on-demand) |
| **Streaming Table** | Tabla con auto-incremento (CDC, append) |
| **Expectations** | Reglas de calidad de datos |

### Beneficios de DLT

1. **Menos código**: ~80% menos líneas que imperativo
2. **Dependencias automáticas**: DLT detecta el orden de ejecución
3. **Calidad built-in**: Expectations validan datos automáticamente
4. **CDC nativo**: Change Data Capture sin código adicional
5. **Monitoreo visual**: UI muestra el pipeline y métricas
6. **Recovery automático**: Si falla, continúa desde donde quedó

### ¿Cuándo usar DLT?

**✅ Ideal para:**
- Medallion architecture (bronze → silver → gold)
- Pipelines con reglas de calidad de datos
- CDC / streaming de cambios
- Equipos que quieren reducir código boilerplate

**❌ No ideal para:**
- Lógica muy compleja que no se expresa en SQL/DataFrames
- Jobs que necesitan control muy granular de ejecución
- Integración con sistemas externos complejos`,
        en: `## Delta Live Tables: Declarative ETL

DLT changes how you think about pipelines: instead of imperative code, you **declare the result you want**.

### DLT Benefits
1. ~80% less code
2. Automatic dependencies
3. Built-in data quality
4. Native CDC
5. Visual monitoring`,
        pt: `## Delta Live Tables: ETL Declarativo

DLT muda como você pensa em pipelines: em vez de código imperativo, você **declara o resultado que quer**.

### Benefícios do DLT
1. ~80% menos código
2. Dependências automáticas
3. Qualidade de dados built-in
4. CDC nativo
5. Monitoramento visual`
      },
      practicalTips: [
        { es: '💡 DLT es perfecto para medallion architecture - cada capa es una simple función.', en: '💡 DLT is perfect for medallion architecture - each layer is a simple function.', pt: '💡 DLT é perfeito para medallion architecture - cada camada é uma função simples.' },
        { es: '⚠️ DLT tiene costo adicional por DBU. Evalúa si el ahorro en desarrollo lo justifica.', en: '⚠️ DLT has additional DBU cost. Evaluate if development savings justify it.', pt: '⚠️ DLT tem custo adicional por DBU. Avalie se a economia em desenvolvimento justifica.' }
      ],
      externalLinks: [
        { title: 'DLT Overview', url: 'https://docs.databricks.com/delta-live-tables/index.html', type: 'docs' },
        { title: 'DLT vs Traditional ETL', url: 'https://www.databricks.com/product/delta-live-tables', type: 'article' }
      ],
      checkpoint: { es: '🤔 ¿Podés explicar la diferencia entre Live Table y Live View?', en: '🤔 Can you explain the difference between Live Table and Live View?', pt: '🤔 Você consegue explicar a diferença entre Live Table e Live View?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-8-2',
      title: { es: 'Tu Primer Pipeline DLT', en: 'Your First DLT Pipeline', pt: 'Seu Primeiro Pipeline DLT' },
      description: { es: 'Crea un pipeline DLT básico con bronze, silver y gold tables.', en: 'Create a basic DLT pipeline with bronze, silver and gold tables.', pt: 'Crie um pipeline DLT básico com tabelas bronze, silver e gold.' },
      theory: {
        es: `## Crear un Pipeline DLT

### Paso 1: Crear el Notebook DLT

\`\`\`python
# Notebook: /pipelines/sales_dlt_pipeline

import dlt
from pyspark.sql.functions import col, current_timestamp

# ============================================
# CAPA BRONZE: Datos crudos
# ============================================
@dlt.table(
    name="bronze_orders",
    comment="Órdenes raw desde la fuente"
)
def bronze_orders():
    return (
        spark.read
        .format("json")
        .load("/data/raw/orders/")
        .withColumn("ingestion_time", current_timestamp())
    )

@dlt.table(
    name="bronze_products",
    comment="Productos raw desde la fuente"  
)
def bronze_products():
    return spark.read.format("csv").option("header", True).load("/data/raw/products/")


# ============================================
# CAPA SILVER: Datos limpios y validados
# ============================================
@dlt.table(
    name="silver_orders",
    comment="Órdenes limpiadas y validadas"
)
@dlt.expect_or_drop("valid_order_id", "order_id IS NOT NULL")
@dlt.expect_or_drop("valid_amount", "amount > 0")
@dlt.expect_or_drop("valid_date", "order_date IS NOT NULL")
def silver_orders():
    return (
        dlt.read("bronze_orders")
        .select(
            col("order_id").cast("long"),
            col("customer_id").cast("long"),
            col("product_id").cast("long"),
            col("amount").cast("double"),
            col("order_date").cast("date"),
            col("ingestion_time")
        )
    )


# ============================================
# CAPA GOLD: Agregaciones para negocio
# ============================================
@dlt.table(
    name="gold_daily_revenue",
    comment="Revenue diario para dashboards"
)
def gold_daily_revenue():
    return (
        dlt.read("silver_orders")
        .groupBy("order_date")
        .agg(
            {"amount": "sum", "order_id": "count"}
        )
        .withColumnRenamed("sum(amount)", "total_revenue")
        .withColumnRenamed("count(order_id)", "total_orders")
    )

@dlt.table(
    name="gold_product_performance",
    comment="Performance por producto"
)
def gold_product_performance():
    orders = dlt.read("silver_orders")
    products = dlt.read("bronze_products")
    
    return (
        orders
        .groupBy("product_id")
        .agg({"amount": "sum", "order_id": "count"})
        .join(products, "product_id")
        .select(
            "product_id",
            "product_name",
            col("sum(amount)").alias("total_revenue"),
            col("count(order_id)").alias("times_sold")
        )
    )
\`\`\`

### Paso 2: Crear el Pipeline en la UI

\`\`\`
1. Ir a Workflows → Delta Live Tables
2. Click "Create Pipeline"
3. Configurar:
   - Name: "Sales DLT Pipeline"
   - Source code: /pipelines/sales_dlt_pipeline
   - Target schema: my_catalog.sales
   - Cluster mode: Enhanced autoscaling
4. Click "Create"
\`\`\`

### Paso 3: Ejecutar y Ver Resultados

\`\`\`
1. Click "Start" para ejecutar
2. Ver el DAG generado automáticamente:

   bronze_orders ──┐
                   ├──► silver_orders ──┬──► gold_daily_revenue
   bronze_products ┘                    └──► gold_product_performance

3. Click en cada tabla para ver:
   - Rows procesadas
   - Tiempo de ejecución
   - Métricas de calidad (expectations)
\`\`\`

### Configuración del Pipeline (JSON)

\`\`\`json
{
  "name": "Sales DLT Pipeline",
  "target": "my_catalog.sales",
  "libraries": [
    {"notebook": {"path": "/pipelines/sales_dlt_pipeline"}}
  ],
  "clusters": [
    {
      "label": "default",
      "autoscale": {
        "min_workers": 1,
        "max_workers": 5
      }
    }
  ],
  "development": true,
  "continuous": false,
  "channel": "CURRENT"
}
\`\`\``,
        en: `## Create a DLT Pipeline

\`\`\`python
import dlt

@dlt.table(name="bronze_orders")
def bronze_orders():
    return spark.read.json("/data/orders/")

@dlt.table(name="silver_orders")
@dlt.expect_or_drop("valid_id", "id IS NOT NULL")
def silver_orders():
    return dlt.read("bronze_orders").filter(...)

@dlt.table(name="gold_revenue")
def gold_revenue():
    return dlt.read("silver_orders").groupBy("date").sum("amount")
\`\`\``,
        pt: `## Criar um Pipeline DLT

\`\`\`python
import dlt

@dlt.table(name="bronze_orders")
def bronze_orders():
    return spark.read.json("/data/orders/")

@dlt.table(name="silver_orders")
@dlt.expect_or_drop("valid_id", "id IS NOT NULL")
def silver_orders():
    return dlt.read("bronze_orders").filter(...)
\`\`\``
      },
      practicalTips: [
        { es: '🚀 Usa development=true mientras desarrollas para ejecución más rápida y barata.', en: '🚀 Use development=true while developing for faster and cheaper execution.', pt: '🚀 Use development=true enquanto desenvolve para execução mais rápida e barata.' },
        { es: '💡 El nombre de la función Python SE CONVIERTE en el nombre de la tabla si no especificas name=.', en: '💡 The Python function name BECOMES the table name if you don\'t specify name=.', pt: '💡 O nome da função Python SE TORNA o nome da tabela se você não especificar name=.' }
      ],
      externalLinks: [
        { title: 'Create DLT Pipeline', url: 'https://docs.databricks.com/delta-live-tables/tutorial-python.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Creaste un pipeline DLT con bronze, silver y gold?', en: '✅ Did you create a DLT pipeline with bronze, silver and gold?', pt: '✅ Você criou um pipeline DLT com bronze, silver e gold?' },
      xpReward: 40,
      estimatedMinutes: 45
    },
    {
      id: 'db-8-3',
      title: { es: 'Expectations: Calidad de Datos', en: 'Expectations: Data Quality', pt: 'Expectations: Qualidade de Dados' },
      description: { es: 'Las expectations son reglas de calidad que validan automáticamente tus datos.', en: 'Expectations are quality rules that automatically validate your data.', pt: 'Expectations são regras de qualidade que validam automaticamente seus dados.' },
      theory: {
        es: `## Expectations: Calidad de Datos Declarativa

Las expectations definen **qué condiciones deben cumplir tus datos**.

### Tipos de Expectations

| Decorador | Comportamiento |
|-----------|----------------|
| \`@dlt.expect\` | Loguea warning, procesa igual |
| \`@dlt.expect_or_drop\` | Descarta filas que no cumplen |
| \`@dlt.expect_or_fail\` | Falla el pipeline si hay violaciones |
| \`@dlt.expect_all\` | Múltiples reglas en un decorador |
| \`@dlt.expect_all_or_drop\` | Drop si cualquier regla falla |
| \`@dlt.expect_all_or_fail\` | Fail si cualquier regla falla |

### Ejemplos de Expectations

\`\`\`python
import dlt

# Expectation simple: loguea pero continúa
@dlt.table
@dlt.expect("valid_email", "email LIKE '%@%.%'")
def users_with_warnings():
    return dlt.read("raw_users")

# Drop rows que no cumplen
@dlt.table
@dlt.expect_or_drop("not_null_id", "user_id IS NOT NULL")
@dlt.expect_or_drop("positive_amount", "amount > 0")
def clean_transactions():
    return dlt.read("raw_transactions")

# Fail si hay violaciones (para datos críticos)
@dlt.table
@dlt.expect_or_fail("valid_ssn", "ssn RLIKE '^[0-9]{9}$'")
def validated_customers():
    return dlt.read("raw_customers")

# Múltiples expectations en uno
@dlt.table
@dlt.expect_all_or_drop({
    "valid_id": "id IS NOT NULL",
    "valid_name": "name IS NOT NULL",
    "valid_age": "age BETWEEN 0 AND 150",
    "valid_email": "email LIKE '%@%.%'"
})
def fully_validated_users():
    return dlt.read("raw_users")
\`\`\`

### Ver Métricas de Calidad

\`\`\`
En la UI de DLT, cada tabla muestra:

┌──────────────────────────────────────────────────────────────┐
│ Table: silver_orders                                         │
├──────────────────────────────────────────────────────────────┤
│ Rows processed: 1,000,000                                    │
│ Rows passed all expectations: 985,000                        │
│ Rows dropped: 15,000 (1.5%)                                  │
│                                                              │
│ Expectation Breakdown:                                       │
│ ├── valid_order_id: 99.5% pass (5,000 failed)               │
│ ├── valid_amount: 99.0% pass (10,000 failed)                │
│ └── valid_date: 100% pass (0 failed)                        │
└──────────────────────────────────────────────────────────────┘
\`\`\`

### Expectations Avanzadas

\`\`\`python
# Expectation con expresión SQL compleja
@dlt.table
@dlt.expect_or_drop(
    "valid_order_total",
    "quantity * unit_price = total_amount"
)
@dlt.expect_or_drop(
    "future_dates_not_allowed",
    "order_date <= current_date()"
)
@dlt.expect(
    "preferred_currency",
    "currency IN ('USD', 'EUR', 'ARS')"  # Solo warning
)
def validated_orders():
    return dlt.read("raw_orders")

# Expectation referenciando otra tabla
@dlt.table
@dlt.expect_or_fail(
    "valid_customer",
    "customer_id IN (SELECT id FROM customers)"
)
def orders_with_valid_customer():
    return dlt.read("raw_orders")
\`\`\`

### Quarantine Pattern (Filas Rechazadas)

\`\`\`python
# Guardar filas rechazadas para análisis
import dlt
from pyspark.sql.functions import col

# Datos buenos
@dlt.table
@dlt.expect_or_drop("valid_id", "id IS NOT NULL")
@dlt.expect_or_drop("valid_amount", "amount > 0")
def clean_orders():
    return dlt.read("raw_orders")

# Datos rechazados (quarantine)
@dlt.table(name="quarantine_orders")
def quarantine_orders():
    raw = dlt.read("raw_orders")
    return raw.filter(
        col("id").isNull() | (col("amount") <= 0)
    ).withColumn("rejection_reason", 
        when(col("id").isNull(), "null_id")
        .when(col("amount") <= 0, "invalid_amount")
    )
\`\`\``,
        en: `## Expectations: Declarative Data Quality

\`\`\`python
# Log warning, continue processing
@dlt.expect("valid_email", "email LIKE '%@%.%'")

# Drop invalid rows
@dlt.expect_or_drop("not_null", "id IS NOT NULL")

# Fail pipeline on violations
@dlt.expect_or_fail("critical_check", "amount > 0")

# Multiple expectations
@dlt.expect_all_or_drop({
    "valid_id": "id IS NOT NULL",
    "valid_amount": "amount > 0"
})
\`\`\``,
        pt: `## Expectations: Qualidade de Dados Declarativa

\`\`\`python
# Log warning, continua processamento
@dlt.expect("valid_email", "email LIKE '%@%.%'")

# Drop rows inválidas
@dlt.expect_or_drop("not_null", "id IS NOT NULL")

# Falha pipeline em violações
@dlt.expect_or_fail("critical_check", "amount > 0")
\`\`\``
      },
      practicalTips: [
        { es: '📊 Usa expect (warning) para métricas, expect_or_drop para limpieza, expect_or_fail para datos críticos.', en: '📊 Use expect (warning) for metrics, expect_or_drop for cleaning, expect_or_fail for critical data.', pt: '📊 Use expect (warning) para métricas, expect_or_drop para limpeza, expect_or_fail para dados críticos.' },
        { es: '🗄️ Implementa el quarantine pattern para no perder datos - guárdalos en otra tabla para análisis.', en: '🗄️ Implement the quarantine pattern to not lose data - save them in another table for analysis.', pt: '🗄️ Implemente o quarantine pattern para não perder dados - salve-os em outra tabela para análise.' }
      ],
      externalLinks: [
        { title: 'Expectations', url: 'https://docs.databricks.com/delta-live-tables/expectations.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Implementaste expectations con los 3 niveles (warn, drop, fail)?', en: '✅ Did you implement expectations with all 3 levels (warn, drop, fail)?', pt: '✅ Você implementou expectations com os 3 níveis (warn, drop, fail)?' },
      xpReward: 35,
      estimatedMinutes: 35
    },
    {
      id: 'db-8-4',
      title: { es: 'Streaming Tables y CDC', en: 'Streaming Tables and CDC', pt: 'Streaming Tables e CDC' },
      description: { es: 'Procesa datos en tiempo real con streaming tables y captura cambios automáticamente.', en: 'Process data in real-time with streaming tables and capture changes automatically.', pt: 'Processe dados em tempo real com streaming tables e capture mudanças automaticamente.' },
      theory: {
        es: `## Streaming Tables: Datos en Tiempo Real

Las streaming tables procesan datos **incrementalmente** - solo los nuevos/cambiados.

### Batch vs Streaming en DLT

\`\`\`
BATCH (dlt.read):
- Lee TODOS los datos cada vez
- Recalcula la tabla completa
- Más simple, más costoso para datos grandes

STREAMING (dlt.read_stream):
- Lee solo datos NUEVOS desde última ejecución
- Actualiza incrementalmente
- Eficiente para datos que crecen
\`\`\`

### Crear una Streaming Table

\`\`\`python
import dlt

# Streaming desde archivos (Auto Loader)
@dlt.table
def streaming_orders():
    return (
        spark.readStream
        .format("cloudFiles")
        .option("cloudFiles.format", "json")
        .load("/data/streaming/orders/")
    )

# Streaming desde otra tabla DLT
@dlt.table
def streaming_enriched_orders():
    orders = dlt.read_stream("streaming_orders")
    products = dlt.read("products")  # Dimensión puede ser batch
    return orders.join(products, "product_id")

# Streaming con aggregation (stateful)
@dlt.table
def streaming_hourly_totals():
    return (
        dlt.read_stream("streaming_orders")
        .groupBy(window("timestamp", "1 hour"))
        .agg(sum("amount").alias("hourly_total"))
    )
\`\`\`

### Change Data Capture (CDC)

CDC captura INSERT, UPDATE, DELETE de una fuente y los replica.

\`\`\`python
import dlt
from dlt import read_stream

# Tabla fuente con CDC events
@dlt.table
def cdc_events():
    return (
        spark.readStream
        .format("cloudFiles")
        .option("cloudFiles.format", "json")
        .schema("""
            operation STRING,  -- INSERT, UPDATE, DELETE
            timestamp TIMESTAMP,
            data STRUCT<
                id: LONG,
                name: STRING,
                email: STRING,
                updated_at: TIMESTAMP
            >
        """)
        .load("/data/cdc/customers/")
    )

# Aplicar CDC para mantener tabla actualizada
dlt.create_streaming_table("customers_current")

dlt.apply_changes(
    target="customers_current",
    source="cdc_events",
    keys=["data.id"],  # Primary key
    sequence_by="timestamp",  # Ordenar eventos
    apply_as_deletes=expr("operation = 'DELETE'"),
    except_column_list=["operation", "timestamp"]
)
\`\`\`

### Resultado del CDC

\`\`\`
Eventos que llegan:
1. INSERT: {id: 1, name: "Juan", email: "juan@mail.com"}
2. INSERT: {id: 2, name: "Ana", email: "ana@mail.com"}
3. UPDATE: {id: 1, name: "Juan García", email: "juan@mail.com"}
4. DELETE: {id: 2}

Estado final de la tabla:
┌────┬─────────────┬───────────────┐
│ id │ name        │ email         │
├────┼─────────────┼───────────────┤
│ 1  │ Juan García │ juan@mail.com │
└────┴─────────────┴───────────────┘

(id=2 fue eliminado por el DELETE)
\`\`\`

### CDC desde Debezium/Kafka

\`\`\`python
# Leer CDC events desde Kafka
@dlt.table
def kafka_cdc_events():
    return (
        spark.readStream
        .format("kafka")
        .option("kafka.bootstrap.servers", "broker:9092")
        .option("subscribe", "customers_cdc")
        .load()
        .select(from_json(col("value").cast("string"), schema).alias("data"))
    )

# Aplicar cambios
dlt.apply_changes(
    target="customers_replica",
    source="kafka_cdc_events",
    keys=["data.id"],
    sequence_by=col("data.ts_ms"),
    stored_as_scd_type=2  # Mantener historia (SCD Type 2)
)
\`\`\`

### SCD Type 2 (Slowly Changing Dimensions)

\`\`\`python
# Mantener historial de cambios
dlt.apply_changes(
    target="customers_history",
    source="cdc_events",
    keys=["data.id"],
    sequence_by="timestamp",
    stored_as_scd_type=2  # ← Guarda versiones anteriores
)

# Resultado:
# ┌────┬───────┬─────────────┬─────────────┬─────────┐
# │ id │ name  │ __START_AT  │ __END_AT    │__CURRENT│
# ├────┼───────┼─────────────┼─────────────┼─────────┤
# │ 1  │ Juan  │ 2024-01-01  │ 2024-01-15  │ false   │
# │ 1  │ Juan G│ 2024-01-15  │ null        │ true    │
# └────┴───────┴─────────────┴─────────────┴─────────┘
\`\`\``,
        en: `## Streaming Tables: Real-Time Data

\`\`\`python
# Streaming from files
@dlt.table
def streaming_orders():
    return spark.readStream.format("cloudFiles").load(path)

# CDC with apply_changes
dlt.apply_changes(
    target="customers_current",
    source="cdc_events",
    keys=["id"],
    sequence_by="timestamp",
    apply_as_deletes=expr("operation = 'DELETE'")
)
\`\`\``,
        pt: `## Streaming Tables: Dados em Tempo Real

\`\`\`python
# Streaming de arquivos
@dlt.table
def streaming_orders():
    return spark.readStream.format("cloudFiles").load(path)

# CDC com apply_changes
dlt.apply_changes(
    target="customers_current",
    source="cdc_events",
    keys=["id"],
    sequence_by="timestamp"
)
\`\`\``
      },
      practicalTips: [
        { es: '🌊 Usa streaming para fuentes que crecen constantemente (logs, eventos, IoT).', en: '🌊 Use streaming for constantly growing sources (logs, events, IoT).', pt: '🌊 Use streaming para fontes que crescem constantemente (logs, eventos, IoT).' },
        { es: '📝 SCD Type 2 es perfecto para dimensiones donde necesitas el historial (clientes, productos).', en: '📝 SCD Type 2 is perfect for dimensions where you need history (customers, products).', pt: '📝 SCD Type 2 é perfeito para dimensões onde precisa do histórico (clientes, produtos).' }
      ],
      externalLinks: [
        { title: 'Streaming Tables', url: 'https://docs.databricks.com/delta-live-tables/python-ref.html#create-a-streaming-table', type: 'docs' },
        { title: 'Apply Changes (CDC)', url: 'https://docs.databricks.com/delta-live-tables/cdc.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Implementaste un CDC pipeline con apply_changes?', en: '✅ Did you implement a CDC pipeline with apply_changes?', pt: '✅ Você implementou um pipeline CDC com apply_changes?' },
      xpReward: 45,
      estimatedMinutes: 50
    },
    {
      id: 'db-8-5',
      title: { es: 'DLT con SQL', en: 'DLT with SQL', pt: 'DLT com SQL' },
      description: { es: 'Si prefieres SQL, DLT también funciona con sintaxis SQL declarativa.', en: 'If you prefer SQL, DLT also works with declarative SQL syntax.', pt: 'Se você prefere SQL, DLT também funciona com sintaxe SQL declarativa.' },
      theory: {
        es: `## DLT con SQL: Para los que Prefieren SQL

DLT soporta notebooks SQL con sintaxis declarativa especial.

### Crear Tablas con SQL

\`\`\`sql
-- Bronze: Datos crudos
CREATE OR REFRESH LIVE TABLE bronze_orders
COMMENT "Órdenes raw desde JSON"
AS SELECT * FROM json.\`/data/raw/orders/\`;

-- También con streaming
CREATE OR REFRESH STREAMING LIVE TABLE streaming_events
AS SELECT * FROM cloud_files("/data/events/", "json");
\`\`\`

### Expectations en SQL

\`\`\`sql
-- Silver: Con validaciones
CREATE OR REFRESH LIVE TABLE silver_orders (
  CONSTRAINT valid_order_id EXPECT (order_id IS NOT NULL) ON VIOLATION DROP ROW,
  CONSTRAINT valid_amount EXPECT (amount > 0) ON VIOLATION DROP ROW,
  CONSTRAINT valid_date EXPECT (order_date <= current_date()) ON VIOLATION FAIL UPDATE
)
COMMENT "Órdenes validadas"
AS SELECT 
  CAST(order_id AS BIGINT) as order_id,
  CAST(customer_id AS BIGINT) as customer_id,
  CAST(amount AS DOUBLE) as amount,
  CAST(order_date AS DATE) as order_date
FROM LIVE.bronze_orders;
\`\`\`

### Joins entre Tablas DLT

\`\`\`sql
-- Gold: Agregaciones con join
CREATE OR REFRESH LIVE TABLE gold_sales_by_product
COMMENT "Revenue por producto"
AS SELECT 
  p.product_name,
  p.category,
  SUM(o.amount) as total_revenue,
  COUNT(*) as total_orders
FROM LIVE.silver_orders o
JOIN LIVE.silver_products p ON o.product_id = p.product_id
GROUP BY p.product_name, p.category;
\`\`\`

### Temporary Views (No se materializan)

\`\`\`sql
-- View temporal para lógica intermedia
CREATE TEMPORARY LIVE VIEW filtered_orders AS
SELECT * FROM LIVE.bronze_orders
WHERE status != 'cancelled';

-- Usarla en otra tabla
CREATE OR REFRESH LIVE TABLE silver_active_orders AS
SELECT * FROM LIVE.filtered_orders;
\`\`\`

### Pipeline Completo en SQL

\`\`\`sql
-- ===============================
-- CAPA BRONZE
-- ===============================
CREATE OR REFRESH STREAMING LIVE TABLE bronze_transactions
COMMENT "Transacciones desde Kafka"
AS SELECT 
  *,
  current_timestamp() as ingestion_time
FROM cloud_files("/data/transactions/", "json");

-- ===============================
-- CAPA SILVER  
-- ===============================
CREATE OR REFRESH LIVE TABLE silver_transactions (
  CONSTRAINT valid_id EXPECT (transaction_id IS NOT NULL),
  CONSTRAINT valid_amount EXPECT (amount > 0) ON VIOLATION DROP ROW,
  CONSTRAINT valid_type EXPECT (type IN ('credit', 'debit')) ON VIOLATION DROP ROW
)
AS SELECT
  transaction_id,
  account_id,
  type,
  amount,
  timestamp,
  ingestion_time
FROM LIVE.bronze_transactions;

-- ===============================
-- CAPA GOLD
-- ===============================
CREATE OR REFRESH LIVE TABLE gold_account_balances
COMMENT "Balance actual por cuenta"
AS SELECT
  account_id,
  SUM(CASE WHEN type = 'credit' THEN amount ELSE -amount END) as balance,
  COUNT(*) as transaction_count,
  MAX(timestamp) as last_transaction
FROM LIVE.silver_transactions
GROUP BY account_id;

CREATE OR REFRESH LIVE TABLE gold_daily_summary
AS SELECT
  DATE(timestamp) as date,
  SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) as total_credits,
  SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) as total_debits,
  COUNT(*) as transaction_count
FROM LIVE.silver_transactions
GROUP BY DATE(timestamp);
\`\`\``,
        en: `## DLT with SQL

\`\`\`sql
-- Create live table
CREATE OR REFRESH LIVE TABLE bronze_orders
AS SELECT * FROM json.\`/data/orders/\`;

-- With expectations
CREATE OR REFRESH LIVE TABLE silver_orders (
  CONSTRAINT valid_id EXPECT (id IS NOT NULL) ON VIOLATION DROP ROW
)
AS SELECT * FROM LIVE.bronze_orders;

-- Streaming
CREATE OR REFRESH STREAMING LIVE TABLE events
AS SELECT * FROM cloud_files("/data/events/", "json");
\`\`\``,
        pt: `## DLT com SQL

\`\`\`sql
-- Criar live table
CREATE OR REFRESH LIVE TABLE bronze_orders
AS SELECT * FROM json.\`/data/orders/\`;

-- Com expectations
CREATE OR REFRESH LIVE TABLE silver_orders (
  CONSTRAINT valid_id EXPECT (id IS NOT NULL) ON VIOLATION DROP ROW
)
AS SELECT * FROM LIVE.bronze_orders;
\`\`\``
      },
      practicalTips: [
        { es: '📝 SQL DLT es perfecto para equipos de analistas que no manejan Python.', en: '📝 SQL DLT is perfect for analyst teams that don\'t handle Python.', pt: '📝 SQL DLT é perfeito para equipes de analistas que não trabalham com Python.' },
        { es: '💡 Puedes mezclar notebooks Python y SQL en el mismo pipeline.', en: '💡 You can mix Python and SQL notebooks in the same pipeline.', pt: '💡 Você pode misturar notebooks Python e SQL no mesmo pipeline.' }
      ],
      externalLinks: [
        { title: 'DLT SQL Reference', url: 'https://docs.databricks.com/delta-live-tables/sql-ref.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Creaste un pipeline DLT usando solo SQL?', en: '✅ Did you create a DLT pipeline using only SQL?', pt: '✅ Você criou um pipeline DLT usando apenas SQL?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-8-6',
      title: { es: 'Configuración y Modos de Ejecución', en: 'Configuration and Execution Modes', pt: 'Configuração e Modos de Execução' },
      description: { es: 'Configura desarrollo vs producción, triggers, y optimizaciones de pipeline.', en: 'Configure development vs production, triggers, and pipeline optimizations.', pt: 'Configure desenvolvimento vs produção, triggers e otimizações de pipeline.' },
      theory: {
        es: `## Configuración del Pipeline DLT

### Modos de Pipeline

| Modo | Uso | Características |
|------|-----|-----------------|
| **Development** | Desarrollo/testing | Rápido, datos truncados, más logs |
| **Production** | Producción | Full data, optimizado, recovery |

\`\`\`json
{
  "development": true,  // Para desarrollo
  "development": false  // Para producción
}
\`\`\`

### Triggered vs Continuous

\`\`\`
TRIGGERED (default):
- Se ejecuta una vez cuando lo disparas
- Para batch tradicional (diario, horario)
- Más económico

CONTINUOUS:
- Corre indefinidamente procesando nuevos datos
- Para casos near-real-time
- Más costoso (cluster siempre activo)
\`\`\`

\`\`\`json
{
  "continuous": false,  // Triggered
  "continuous": true    // Continuous
}
\`\`\`

### Configuración Completa del Pipeline

\`\`\`json
{
  "name": "Production Sales Pipeline",
  "target": "prod_catalog.sales",
  "development": false,
  "continuous": false,
  
  "libraries": [
    {"notebook": {"path": "/Repos/main/pipelines/sales_bronze"}},
    {"notebook": {"path": "/Repos/main/pipelines/sales_silver"}},
    {"notebook": {"path": "/Repos/main/pipelines/sales_gold"}}
  ],
  
  "clusters": [
    {
      "label": "default",
      "autoscale": {
        "min_workers": 2,
        "max_workers": 10
      },
      "spark_conf": {
        "spark.databricks.delta.preview.enabled": "true"
      },
      "custom_tags": {
        "team": "data-engineering",
        "cost_center": "analytics"
      }
    }
  ],
  
  "configuration": {
    "pipelines.tableManagedPaths.enabled": "true",
    "source_path": "/data/production/",
    "environment": "prod"
  },
  
  "notifications": [
    {
      "email_recipients": ["team@empresa.com"],
      "alerts": {
        "on_update_failure": true,
        "on_update_success": false,
        "on_flow_failure": true
      }
    }
  ],
  
  "channel": "CURRENT"
}
\`\`\`

### Usar Variables de Configuración en el Pipeline

\`\`\`python
import dlt

# Leer configuración del pipeline
source_path = spark.conf.get("source_path")
environment = spark.conf.get("environment")

@dlt.table
def bronze_data():
    return spark.read.json(f"{source_path}/orders/")

# Comportamiento diferente según ambiente
@dlt.table
@dlt.expect_or_fail("env_check", f"'{environment}' = 'prod'") if environment == "prod" else dlt.expect("env_check", "true")
def silver_data():
    return dlt.read("bronze_data")
\`\`\`

### Schedule del Pipeline

\`\`\`
Igual que Workflows:
1. En pipeline settings → Schedules
2. Agregar cron expression
3. Ejemplo: 0 6 * * * (diario 6am)

O via API:
{
  "schedule": {
    "quartz_cron_expression": "0 0 6 * * ?",
    "timezone_id": "America/Argentina/Buenos_Aires"
  }
}
\`\`\``,
        en: `## DLT Pipeline Configuration

### Modes
- **Development**: Fast, truncated data
- **Production**: Full data, optimized

### Triggered vs Continuous
- **Triggered**: Run once per trigger (batch)
- **Continuous**: Run indefinitely (near-real-time)

\`\`\`json
{
  "development": false,
  "continuous": false,
  "target": "prod_catalog.sales"
}
\`\`\``,
        pt: `## Configuração do Pipeline DLT

### Modos
- **Development**: Rápido, dados truncados
- **Production**: Dados completos, otimizado

### Triggered vs Continuous
- **Triggered**: Roda uma vez por trigger
- **Continuous**: Roda indefinidamente`
      },
      practicalTips: [
        { es: '💰 Usa development=true para iterar rápido y barato mientras desarrollas.', en: '💰 Use development=true to iterate quickly and cheaply while developing.', pt: '💰 Use development=true para iterar rápido e barato enquanto desenvolve.' },
        { es: '⚠️ Continuous es costoso - solo úsalo si realmente necesitas latencia < 5 minutos.', en: '⚠️ Continuous is expensive - only use it if you really need latency < 5 minutes.', pt: '⚠️ Continuous é caro - só use se realmente precisar de latência < 5 minutos.' }
      ],
      externalLinks: [
        { title: 'Pipeline Configuration', url: 'https://docs.databricks.com/delta-live-tables/configure-pipeline.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Configuraste un pipeline con modo prod y schedule?', en: '✅ Did you configure a pipeline with prod mode and schedule?', pt: '✅ Você configurou um pipeline com modo prod e schedule?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-8-7',
      title: { es: 'Monitoreo y Troubleshooting', en: 'Monitoring and Troubleshooting', pt: 'Monitoramento e Troubleshooting' },
      description: { es: 'Aprende a diagnosticar problemas en pipelines DLT y optimizar performance.', en: 'Learn to diagnose DLT pipeline problems and optimize performance.', pt: 'Aprenda a diagnosticar problemas em pipelines DLT e otimizar performance.' },
      theory: {
        es: `## Monitoreo de Pipelines DLT

### Dashboard del Pipeline

\`\`\`
Al abrir un pipeline, ves:

┌─────────────────────────────────────────────────────────────┐
│ Pipeline: Sales ETL                        Status: RUNNING  │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌────────────┐    ┌────────────┐    ┌────────────┐       │
│   │ bronze_    │    │ silver_    │    │ gold_      │       │
│   │ orders     │───▶│ orders     │───▶│ metrics    │       │
│   │ ✅ 1M rows │    │ ⏳ running │    │ ⏸️ waiting │       │
│   └────────────┘    └────────────┘    └────────────┘       │
│                                                              │
│   Data Quality:                                             │
│   └── silver_orders: 99.2% pass rate (8,000 rows dropped)  │
│                                                              │
│   Duration: 12m 34s                                         │
│   Rows processed: 1,000,000                                 │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Event Log: El Diario del Pipeline

\`\`\`python
# El event log contiene TODO lo que pasa en el pipeline
event_log_path = spark.conf.get("pipelines.eventLog.path")

events = spark.read.format("delta").load(event_log_path)

# Ver eventos recientes
events.filter("timestamp > current_timestamp() - interval 1 hour").display()

# Tipos de eventos útiles:
# - flow_progress: Progreso de cada tabla
# - flow_definition: Definición del pipeline
# - update_progress: Estado general
# - maintenance: Operaciones de mantenimiento
\`\`\`

### Query de Calidad de Datos

\`\`\`sql
-- Ver métricas de expectations
SELECT
  origin.dataset_name as table_name,
  details:flow_progress:data_quality:expectations as expectations,
  details:flow_progress:metrics:num_output_rows as rows_output
FROM event_log
WHERE event_type = 'flow_progress'
ORDER BY timestamp DESC;
\`\`\`

### Problemas Comunes y Soluciones

| Problema | Causa | Solución |
|----------|-------|----------|
| Pipeline lento | Poca paralelización | Aumentar workers en cluster |
| Out of memory | Datos muy grandes | Más memoria o repartition |
| Expectation fail rate alto | Datos sucios | Revisar fuente, ajustar expectations |
| Tabla no se actualiza | Dependencia no detectada | Usar dlt.read() explícitamente |
| Error "table not found" | Nombre incorrecto | Verificar que usa LIVE.nombre |

### Debugging: Full Refresh

\`\`\`
Si el pipeline está en estado inconsistente:
1. Click en "Full Refresh"
2. Esto recrea TODAS las tablas desde cero
3. Útil para: schema changes, bugs en lógica, datos corruptos

⚠️ Full refresh puede ser costoso y lento para datasets grandes
\`\`\`

### Lineage y Dependencias

\`\`\`
DLT genera el grafo de dependencias automáticamente:

Click en una tabla → "Lineage" tab → 
Ver upstream (de dónde vienen los datos)
Ver downstream (qué tablas dependen de esta)

Útil para: "¿Qué se rompe si cambio esta tabla?"
\`\`\``,
        en: `## DLT Pipeline Monitoring

### Event Log
\`\`\`python
event_log_path = spark.conf.get("pipelines.eventLog.path")
events = spark.read.format("delta").load(event_log_path)
\`\`\`

### Common Problems
- Pipeline slow: Increase workers
- Out of memory: More RAM or repartition
- High fail rate: Fix source data`,
        pt: `## Monitoramento de Pipelines DLT

### Event Log
\`\`\`python
event_log_path = spark.conf.get("pipelines.eventLog.path")
events = spark.read.format("delta").load(event_log_path)
\`\`\`

### Problemas Comuns
- Pipeline lento: Aumentar workers
- Out of memory: Mais RAM ou repartition`
      },
      practicalTips: [
        { es: '📊 Crea un dashboard sobre el event_log para monitoreo histórico de calidad.', en: '📊 Create a dashboard on event_log for historical quality monitoring.', pt: '📊 Crie um dashboard sobre o event_log para monitoramento histórico de qualidade.' },
        { es: '🔄 Full Refresh es el "apagar y prender" de DLT - úsalo cuando nada más funciona.', en: '🔄 Full Refresh is the "turn it off and on again" of DLT - use it when nothing else works.', pt: '🔄 Full Refresh é o "desligar e ligar" do DLT - use quando nada mais funcionar.' }
      ],
      externalLinks: [
        { title: 'Event Log', url: 'https://docs.databricks.com/delta-live-tables/observability.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Consultaste el event_log de un pipeline?', en: '✅ Did you query the event_log of a pipeline?', pt: '✅ Você consultou o event_log de um pipeline?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-8-8',
      title: { es: 'Proyecto: Pipeline DLT Production-Ready', en: 'Project: Production-Ready DLT Pipeline', pt: 'Projeto: Pipeline DLT Production-Ready' },
      description: { es: 'Construye un pipeline DLT completo con medallion architecture, CDC y calidad de datos.', en: 'Build a complete DLT pipeline with medallion architecture, CDC and data quality.', pt: 'Construa um pipeline DLT completo com medallion architecture, CDC e qualidade de dados.' },
      theory: {
        es: `## Proyecto: E-commerce Data Pipeline con DLT

Vas a construir un pipeline real de e-commerce que procesa órdenes, productos y clientes.

### Arquitectura

\`\`\`
                     FUENTES
                        │
    ┌───────────────────┼───────────────────┐
    │                   │                   │
    ▼                   ▼                   ▼
┌─────────┐       ┌─────────┐       ┌─────────┐
│ Orders  │       │Products │       │Customers│
│ (JSON)  │       │ (CSV)   │       │  (CDC)  │
└────┬────┘       └────┬────┘       └────┬────┘
     │                 │                 │
     ▼                 ▼                 ▼
┌─────────────────────────────────────────────┐
│                    BRONZE                    │
│  bronze_orders  bronze_products  bronze_cdc │
│  (streaming)    (batch)          (streaming)│
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                    SILVER                    │
│  silver_orders       silver_products        │
│  (validated)         (validated)            │
│                                             │
│  customers_current (CDC applied)            │
│  customers_history (SCD Type 2)             │
│                                             │
│  Expectations:                              │
│  - valid_order_id, valid_amount             │
│  - valid_product_id, valid_price            │
│  - valid_customer_id                        │
└─────────────────────┬───────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────┐
│                    GOLD                      │
│  gold_daily_sales    gold_product_ranking   │
│  gold_customer_360   gold_inventory_alert   │
│                                             │
│  Ready for:                                 │
│  - BI Dashboards                            │
│  - ML Features                              │
│  - Business Reports                         │
└─────────────────────────────────────────────┘
\`\`\`

### Checklist del Proyecto

**Bronze Layer:**
- [ ] bronze_orders: Streaming desde JSON files
- [ ] bronze_products: Batch desde CSV
- [ ] bronze_cdc_customers: Streaming de eventos CDC

**Silver Layer:**
- [ ] silver_orders con expectations (valid_id, valid_amount > 0)
- [ ] silver_products con expectations (valid_price, valid_category)
- [ ] customers_current: CDC aplicado con apply_changes
- [ ] customers_history: SCD Type 2 para historial
- [ ] quarantine tables para filas rechazadas

**Gold Layer:**
- [ ] gold_daily_sales: Revenue por día
- [ ] gold_product_ranking: Top productos por revenue
- [ ] gold_customer_360: Vista 360 del cliente
- [ ] gold_inventory_alert: Productos con bajo stock

**Configuración:**
- [ ] Schedule diario para triggered mode
- [ ] Alertas de email on failure
- [ ] Tags de costo para tracking

### Código Base

\`\`\`python
# Notebook: ecommerce_dlt_pipeline

import dlt
from pyspark.sql.functions import *

# ================== BRONZE ==================
@dlt.table(comment="Órdenes raw desde JSON files")
def bronze_orders():
    return (
        spark.readStream
        .format("cloudFiles")
        .option("cloudFiles.format", "json")
        .load("/data/ecommerce/orders/")
    )

@dlt.table(comment="Productos raw desde CSV")
def bronze_products():
    return spark.read.csv("/data/ecommerce/products/", header=True)

@dlt.table(comment="Eventos CDC de clientes")
def bronze_cdc_customers():
    return (
        spark.readStream
        .format("cloudFiles")
        .option("cloudFiles.format", "json")
        .schema("operation STRING, timestamp TIMESTAMP, data STRUCT<id:LONG,name:STRING,email:STRING,segment:STRING>")
        .load("/data/ecommerce/customers_cdc/")
    )

# ================== SILVER ==================
@dlt.table(comment="Órdenes validadas")
@dlt.expect_or_drop("valid_order_id", "order_id IS NOT NULL")
@dlt.expect_or_drop("valid_amount", "amount > 0")
@dlt.expect_or_drop("valid_customer", "customer_id IS NOT NULL")
def silver_orders():
    return dlt.read_stream("bronze_orders").select(
        col("order_id").cast("long"),
        col("customer_id").cast("long"),
        col("product_id").cast("long"),
        col("quantity").cast("int"),
        col("amount").cast("double"),
        col("order_date").cast("date")
    )

# Quarantine para órdenes rechazadas
@dlt.table(comment="Órdenes que fallaron validación")
def quarantine_orders():
    return (
        dlt.read_stream("bronze_orders")
        .filter("order_id IS NULL OR amount <= 0 OR customer_id IS NULL")
    )

# CDC para clientes
dlt.create_streaming_table("customers_current")

dlt.apply_changes(
    target="customers_current",
    source="bronze_cdc_customers",
    keys=["data.id"],
    sequence_by="timestamp",
    apply_as_deletes=expr("operation = 'DELETE'"),
    column_list=["data.id", "data.name", "data.email", "data.segment"]
)

# ================== GOLD ==================
@dlt.table(comment="Revenue diario")
def gold_daily_sales():
    return (
        dlt.read("silver_orders")
        .groupBy("order_date")
        .agg(
            sum("amount").alias("total_revenue"),
            count("*").alias("total_orders"),
            avg("amount").alias("avg_order_value")
        )
    )

@dlt.table(comment="Vista 360 del cliente")
def gold_customer_360():
    orders = dlt.read("silver_orders")
    customers = dlt.read("customers_current")
    
    customer_metrics = orders.groupBy("customer_id").agg(
        count("*").alias("total_orders"),
        sum("amount").alias("lifetime_value"),
        avg("amount").alias("avg_order_value"),
        max("order_date").alias("last_order_date")
    )
    
    return customers.join(customer_metrics, customers["id"] == customer_metrics["customer_id"], "left")
\`\`\`

### Criterios de Éxito

✅ Pipeline corre end-to-end sin errores
✅ Expectations capturan datos inválidos correctamente
✅ CDC mantiene tabla de clientes actualizada
✅ Quarantine guarda filas rechazadas para análisis
✅ Gold tables están listas para BI
✅ Event log muestra métricas de calidad`,
        en: `## Project: E-commerce Data Pipeline with DLT

Build a complete pipeline with:
- Medallion architecture (bronze/silver/gold)
- Streaming ingestion
- CDC for customers
- Data quality expectations
- Quarantine pattern

See Spanish version for full architecture and code.`,
        pt: `## Projeto: Pipeline de E-commerce com DLT

Construa um pipeline completo com:
- Medallion architecture (bronze/silver/gold)
- Ingestão streaming
- CDC para clientes
- Expectations de qualidade
- Quarantine pattern`
      },
      practicalTips: [
        { es: '🏗️ Este proyecto demuestra todas las capacidades de DLT - perfecto para portfolio.', en: '🏗️ This project demonstrates all DLT capabilities - perfect for portfolio.', pt: '🏗️ Este projeto demonstra todas as capacidades do DLT - perfeito para portfólio.' },
        { es: '📝 Documenta las decisiones: por qué usaste streaming vs batch, qué expectations elegiste, etc.', en: '📝 Document decisions: why you used streaming vs batch, which expectations you chose, etc.', pt: '📝 Documente as decisões: por que usou streaming vs batch, quais expectations escolheu, etc.' }
      ],
      externalLinks: [
        { title: 'DLT Best Practices', url: 'https://docs.databricks.com/delta-live-tables/best-practices.html', type: 'docs' }
      ],
      checkpoint: { es: '🏆 ¿Tu pipeline procesa datos de 3 fuentes diferentes con CDC y calidad de datos?', en: '🏆 Does your pipeline process data from 3 different sources with CDC and data quality?', pt: '🏆 Seu pipeline processa dados de 3 fontes diferentes com CDC e qualidade de dados?' },
      xpReward: 100,
      estimatedMinutes: 150
    }
  ]
};
