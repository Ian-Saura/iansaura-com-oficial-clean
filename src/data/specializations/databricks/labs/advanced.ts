import { DatabricksLab } from './types';

/**
 * Labs Avanzados de Databricks
 * Unity Catalog, DLT, Jobs
 */
export const DATABRICKS_LABS_ADVANCED: DatabricksLab[] = [
  // =====================================================
  // LAB 9: Delta Live Tables (DLT)
  // =====================================================
  {
    id: 'db-lab-009',
    title: {
      es: '⚙️ Delta Live Tables (DLT)',
      en: '⚙️ Delta Live Tables (DLT)',
      pt: '⚙️ Delta Live Tables (DLT)'
    },
    subtitle: {
      es: 'Pipelines declarativos con data quality',
      en: 'Declarative pipelines with data quality',
      pt: 'Pipelines declarativos com data quality'
    },
    description: {
      es: 'DLT simplifica la creación de pipelines ETL con expectativas de calidad integradas. Aprenderás a crear pipelines declarativos que manejan automáticamente dependencias y errores.',
      en: 'DLT simplifies ETL pipeline creation with built-in quality expectations. You will learn to create declarative pipelines that automatically handle dependencies and errors.',
      pt: 'DLT simplifica a criação de pipelines ETL com expectativas de qualidade integradas. Você aprenderá a criar pipelines declarativos que gerenciam automaticamente dependências e erros.'
    },
    difficulty: 'advanced',
    estimatedMinutes: 50,
    relatedPhases: ['db-phase-8'],
    prerequisites: [
      { es: 'Labs 1-8 completados', en: 'Labs 1-8 completed', pt: 'Labs 1-8 completados' },
      { es: 'Entender arquitectura Medallion', en: 'Understand Medallion architecture', pt: 'Entender arquitetura Medallion' }
    ],
    objectives: [
      { es: 'Entender la sintaxis declarativa de DLT', en: 'Understand DLT declarative syntax', pt: 'Entender a sintaxe declarativa do DLT' },
      { es: 'Usar @dlt.table para crear tablas', en: 'Use @dlt.table to create tables', pt: 'Usar @dlt.table para criar tabelas' },
      { es: 'Implementar expectations para data quality', en: 'Implement expectations for data quality', pt: 'Implementar expectations para data quality' },
      { es: 'Configurar un pipeline DLT', en: 'Configure a DLT pipeline', pt: 'Configurar um pipeline DLT' }
    ],
    steps: [
      {
        id: 'lab009-step1',
        title: { es: '¿Qué es Delta Live Tables?', en: 'What is Delta Live Tables?', pt: 'O que é Delta Live Tables?' },
        description: {
          es: 'DLT es un framework declarativo para construir pipelines confiables.',
          en: 'DLT is a declarative framework for building reliable pipelines.',
          pt: 'DLT é um framework declarativo para construir pipelines confiáveis.'
        },
        code: `# DELTA LIVE TABLES (DLT)
#
# Ventajas:
# ✅ Declarativo: defines QUÉ, no CÓMO
# ✅ Expectations: validación de calidad integrada
# ✅ Dependencias automáticas entre tablas
# ✅ Manejo de errores y reintentos
# ✅ Streaming y batch unificados
# ✅ Monitoreo visual del pipeline
#
# Sintaxis:
# @dlt.table          - define una tabla materializada
# @dlt.view           - define una vista (no materializada)
# @dlt.expect         - expectativa que registra violaciones
# @dlt.expect_or_drop - elimina filas que no cumplen
# @dlt.expect_or_fail - falla si hay violaciones

print("DLT = ETL declarativo + Data Quality")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab009-step2',
        title: { es: 'Crear notebook DLT', en: 'Create DLT notebook', pt: 'Criar notebook DLT' },
        description: {
          es: 'Crea un notebook con la estructura de un pipeline DLT.',
          en: 'Create a notebook with DLT pipeline structure.',
          pt: 'Crie um notebook com a estrutura de um pipeline DLT.'
        },
        code: `# NOTA: Este código debe ir en un notebook separado para DLT
# Aquí mostramos la estructura, pero DLT se ejecuta desde el UI de Pipelines

import dlt
from pyspark.sql.functions import *

# Configuración del pipeline (normalmente en el UI)
# - Source: ruta a archivos raw
# - Target: database destino
# - Mode: triggered o continuous

# Los decoradores @dlt.table y @dlt.view definen el pipeline`,
        codeLanguage: 'python',
        tip: { es: '💡 DLT notebooks se ejecutan desde Workflows > Delta Live Tables, no como notebooks normales', en: '💡 DLT notebooks run from Workflows > Delta Live Tables, not as normal notebooks', pt: '💡 Notebooks DLT são executados de Workflows > Delta Live Tables, não como notebooks normais' }
      },
      {
        id: 'lab009-step3',
        title: { es: 'Capa Bronze en DLT', en: 'Bronze layer in DLT', pt: 'Camada Bronze em DLT' },
        description: {
          es: 'Define la ingesta de datos raw como tabla DLT.',
          en: 'Define raw data ingestion as DLT table.',
          pt: 'Defina a ingestão de dados raw como tabela DLT.'
        },
        code: `# Código para notebook DLT: Bronze Layer
import dlt
from pyspark.sql.functions import current_timestamp

# Bronze: ingesta raw con Auto Loader
@dlt.table(
    name="bronze_orders",
    comment="Raw orders data from landing zone"
)
def bronze_orders():
    return (
        spark.readStream
        .format("cloudFiles")
        .option("cloudFiles.format", "json")
        .option("cloudFiles.inferColumnTypes", "true")
        .load("/landing/orders/")
        .withColumn("_ingested_at", current_timestamp())
    )

# La tabla se crea automáticamente y se mantiene actualizada`,
        codeLanguage: 'python'
      },
      {
        id: 'lab009-step4',
        title: { es: 'Capa Silver con Expectations', en: 'Silver layer with Expectations', pt: 'Camada Silver com Expectations' },
        description: {
          es: 'Agrega validación de calidad con expectations.',
          en: 'Add quality validation with expectations.',
          pt: 'Adicione validação de qualidade com expectations.'
        },
        code: `# Código para notebook DLT: Silver Layer con Expectations
import dlt
from pyspark.sql.functions import *

@dlt.table(
    name="silver_orders",
    comment="Cleaned orders with quality checks"
)
@dlt.expect("valid_customer", "customer_id IS NOT NULL")
@dlt.expect("valid_amount", "total_amount > 0")
@dlt.expect_or_drop("valid_status", "status IN ('pending', 'completed', 'shipped')")
def silver_orders():
    return (
        dlt.read_stream("bronze_orders")  # Lee de tabla Bronze
        .dropDuplicates(["order_id"])
        .withColumn("order_date", to_date("order_timestamp"))
        .withColumn("total_amount", col("quantity") * col("unit_price"))
        .select(
            "order_id", "customer_id", "product_id",
            "quantity", "unit_price", "total_amount",
            "order_date", "status"
        )
    )

# Expectations:
# - expect: registra violaciones pero pasa los datos
# - expect_or_drop: elimina filas que no cumplen
# - expect_or_fail: falla el pipeline si hay violaciones`,
        codeLanguage: 'python',
        tip: { es: '💡 expect_or_drop es perfecto para filtrar datos inválidos automáticamente', en: '💡 expect_or_drop is perfect for automatically filtering invalid data', pt: '💡 expect_or_drop é perfeito para filtrar dados inválidos automaticamente' }
      },
      {
        id: 'lab009-step5',
        title: { es: 'Capa Gold en DLT', en: 'Gold layer in DLT', pt: 'Camada Gold em DLT' },
        description: {
          es: 'Crea agregaciones para reporting.',
          en: 'Create aggregations for reporting.',
          pt: 'Crie agregações para reporting.'
        },
        code: `# Código para notebook DLT: Gold Layer
import dlt
from pyspark.sql.functions import *

@dlt.table(
    name="gold_daily_sales",
    comment="Daily sales metrics for BI"
)
def gold_daily_sales():
    return (
        dlt.read("silver_orders")  # Lee de Silver (sin stream para batch)
        .groupBy("order_date")
        .agg(
            count("order_id").alias("num_orders"),
            countDistinct("customer_id").alias("unique_customers"),
            sum("total_amount").alias("revenue"),
            avg("total_amount").alias("avg_order_value")
        )
        .orderBy("order_date")
    )

@dlt.table(
    name="gold_customer_metrics",
    comment="Customer lifetime metrics"
)
def gold_customer_metrics():
    return (
        dlt.read("silver_orders")
        .groupBy("customer_id")
        .agg(
            count("order_id").alias("total_orders"),
            sum("total_amount").alias("lifetime_value"),
            min("order_date").alias("first_order_date"),
            max("order_date").alias("last_order_date")
        )
    )`,
        codeLanguage: 'python'
      },
      {
        id: 'lab009-step6',
        title: { es: 'Configurar pipeline en UI', en: 'Configure pipeline in UI', pt: 'Configurar pipeline na UI' },
        description: {
          es: 'Pasos para crear el pipeline en Databricks.',
          en: 'Steps to create the pipeline in Databricks.',
          pt: 'Passos para criar o pipeline no Databricks.'
        },
        code: `# PASOS PARA CREAR PIPELINE DLT EN UI:
#
# 1. Workflows > Delta Live Tables > Create Pipeline
#
# 2. Configuración:
#    - Name: "ecommerce_pipeline"
#    - Source: notebook(s) con código DLT
#    - Target: database donde crear tablas
#    - Storage: ruta para datos
#    - Mode: Triggered (manual) o Continuous
#
# 3. Cluster settings:
#    - Workers: ajustar según volumen
#    - Photon: habilitar para performance
#
# 4. Advanced:
#    - channel: "current" (estable) o "preview" (nuevas features)
#
# 5. Start: ejecutar el pipeline
#
# 6. Monitorear:
#    - Ver grafo de dependencias
#    - Revisar expectations (calidad)
#    - Ver métricas de cada tabla

print("Ver documentación para pasos detallados en UI")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab009-step7',
        title: { es: 'Monitorear Data Quality', en: 'Monitor Data Quality', pt: 'Monitorar Data Quality' },
        description: {
          es: 'Revisa las métricas de calidad en el Event Log de DLT.',
          en: 'Review quality metrics in DLT Event Log.',
          pt: 'Revise as métricas de qualidade no Event Log do DLT.'
        },
        code: `# Después de ejecutar el pipeline, puedes ver métricas en SQL
# (asumiendo que el pipeline se llama "ecommerce_pipeline")

# Ver eventos del pipeline
%sql
SELECT * FROM event_log(TABLE(ecommerce_pipeline))
ORDER BY timestamp DESC
LIMIT 20;

# Ver métricas de expectations específicamente
%sql
SELECT 
    name as table_name,
    expectation.name as expectation_name,
    expectation.dataset as dataset,
    expectation.passed_records,
    expectation.failed_records,
    timestamp
FROM event_log(TABLE(ecommerce_pipeline))
WHERE details:expectation IS NOT NULL
ORDER BY timestamp DESC;`,
        codeLanguage: 'python',
        checkpoint: { es: '¿Cuántos registros fallaron cada expectation?', en: 'How many records failed each expectation?', pt: 'Quantos registros falharam cada expectation?' }
      }
    ],
    xpReward: 125,
    badge: {
      id: 'badge-db-dlt',
      name: { es: 'DLT Pipeline Builder', en: 'DLT Pipeline Builder', pt: 'DLT Pipeline Builder' },
      icon: '⚙️'
    },
    resources: [
      { title: 'DLT Documentation', url: 'https://docs.databricks.com/workflows/delta-live-tables/index.html', type: 'docs' },
      { title: 'DLT Best Practices', url: 'https://docs.databricks.com/workflows/delta-live-tables/delta-live-tables-cookbook.html', type: 'docs' }
    ],
    tags: ['advanced', 'dlt', 'pipeline', 'data-quality', 'expectations'],
    services: ['Delta Live Tables', 'Workflows', 'Delta Lake']
  },

  // =====================================================
  // LAB 10: Jobs y Orquestación
  // =====================================================
  {
    id: 'db-lab-010',
    title: {
      es: '📅 Jobs: Automatización y Scheduling',
      en: '📅 Jobs: Automation and Scheduling',
      pt: '📅 Jobs: Automação e Scheduling'
    },
    subtitle: {
      es: 'Orquesta y programa tus pipelines',
      en: 'Orchestrate and schedule your pipelines',
      pt: 'Orquestre e programe seus pipelines'
    },
    description: {
      es: 'Aprende a crear Jobs multi-task con dependencias, scheduling, alertas y manejo de errores. Lleva tus pipelines a producción.',
      en: 'Learn to create multi-task Jobs with dependencies, scheduling, alerts and error handling. Take your pipelines to production.',
      pt: 'Aprenda a criar Jobs multi-task com dependências, scheduling, alertas e tratamento de erros. Leve seus pipelines para produção.'
    },
    difficulty: 'advanced',
    estimatedMinutes: 45,
    relatedPhases: ['db-phase-7'],
    prerequisites: [
      { es: 'Labs 1-9 completados', en: 'Labs 1-9 completed', pt: 'Labs 1-9 completados' }
    ],
    objectives: [
      { es: 'Crear un Job con múltiples tasks', en: 'Create a Job with multiple tasks', pt: 'Criar um Job com múltiplas tasks' },
      { es: 'Configurar dependencias entre tasks', en: 'Configure dependencies between tasks', pt: 'Configurar dependências entre tasks' },
      { es: 'Programar ejecuciones periódicas', en: 'Schedule periodic executions', pt: 'Programar execuções periódicas' },
      { es: 'Configurar alertas de fallo', en: 'Configure failure alerts', pt: 'Configurar alertas de falha' }
    ],
    steps: [
      {
        id: 'lab010-step1',
        title: { es: 'Conceptos de Jobs', en: 'Jobs concepts', pt: 'Conceitos de Jobs' },
        description: {
          es: 'Entiende la estructura de Jobs en Databricks.',
          en: 'Understand Jobs structure in Databricks.',
          pt: 'Entenda a estrutura de Jobs no Databricks.'
        },
        code: `# DATABRICKS JOBS
#
# Estructura:
# JOB
# └── TASK 1 (notebook/script/jar/DLT)
# └── TASK 2 (depende de TASK 1)
# └── TASK 3 (depende de TASK 1)
# └── TASK 4 (depende de TASK 2 y TASK 3)
#
# Tipos de Tasks:
# - Notebook
# - Python script
# - Python wheel
# - JAR
# - SQL
# - DLT pipeline
# - dbt task
#
# Tipos de Cluster:
# - Job cluster: se crea para el job, se destruye al terminar (más económico)
# - All-purpose cluster: existente, no se destruye

print("Jobs = Automatización de workflows")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab010-step2',
        title: { es: 'Crear notebook para el Job', en: 'Create notebook for Job', pt: 'Criar notebook para o Job' },
        description: {
          es: 'Prepara notebooks que serán tasks del Job.',
          en: 'Prepare notebooks that will be Job tasks.',
          pt: 'Prepare notebooks que serão tasks do Job.'
        },
        code: `# TASK 1: Ingesta (guarda este código como notebook "01_ingesta")
# --------------------------------------------------------
from pyspark.sql.functions import *

# Simular ingesta de datos nuevos
print("📥 Iniciando ingesta...")

new_data = [
    ("ORD100", "CUST001", 99.99, current_timestamp()),
    ("ORD101", "CUST002", 149.99, current_timestamp()),
]

df = spark.createDataFrame(new_data, ["order_id", "customer_id", "amount", "timestamp"])
df.write.format("delta").mode("append").saveAsTable("bronze.daily_orders")

print(f"✅ Insertados {df.count()} registros")

# Pasar valor a siguiente task
dbutils.jobs.taskValues.set(key="records_ingested", value=df.count())`,
        codeLanguage: 'python'
      },
      {
        id: 'lab010-step3',
        title: { es: 'Task de transformación', en: 'Transformation task', pt: 'Task de transformação' },
        description: {
          es: 'Notebook que transforma datos y depende del anterior.',
          en: 'Notebook that transforms data and depends on the previous one.',
          pt: 'Notebook que transforma dados e depende do anterior.'
        },
        code: `# TASK 2: Transformación (guarda como "02_transformacion")
# --------------------------------------------------------
from pyspark.sql.functions import *

# Leer valor del task anterior
records_ingested = dbutils.jobs.taskValues.get(
    taskKey="ingesta",  # nombre del task anterior
    key="records_ingested",
    default=0
)
print(f"📊 Task anterior ingresó {records_ingested} registros")

# Transformar
print("🔄 Transformando datos...")

df_silver = (
    spark.table("bronze.daily_orders")
    .filter(col("amount") > 0)
    .withColumn("amount_with_tax", col("amount") * 1.21)
)

df_silver.write.format("delta").mode("overwrite").saveAsTable("silver.daily_orders")

print(f"✅ Transformación completada: {df_silver.count()} registros")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab010-step4',
        title: { es: 'Task de métricas', en: 'Metrics task', pt: 'Task de métricas' },
        description: {
          es: 'Notebook que genera métricas Gold.',
          en: 'Notebook that generates Gold metrics.',
          pt: 'Notebook que gera métricas Gold.'
        },
        code: `# TASK 3: Métricas Gold (guarda como "03_metricas")
# --------------------------------------------------------
from pyspark.sql.functions import *

print("📈 Generando métricas...")

df_metrics = spark.sql("""
    SELECT 
        current_date() as metric_date,
        COUNT(*) as total_orders,
        SUM(amount) as total_revenue,
        AVG(amount) as avg_order_value
    FROM silver.daily_orders
""")

df_metrics.write.format("delta").mode("append").saveAsTable("gold.daily_metrics")

# Mostrar métricas
df_metrics.show()
print("✅ Métricas generadas")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab010-step5',
        title: { es: 'Crear Job en UI', en: 'Create Job in UI', pt: 'Criar Job na UI' },
        description: {
          es: 'Pasos para crear el Job multi-task en Databricks.',
          en: 'Steps to create the multi-task Job in Databricks.',
          pt: 'Passos para criar o Job multi-task no Databricks.'
        },
        code: `# CREAR JOB EN UI
#
# 1. Workflows > Jobs > Create Job
#
# 2. Nombre: "daily_etl_pipeline"
#
# 3. Agregar Task 1:
#    - Name: "ingesta"
#    - Type: Notebook
#    - Source: 01_ingesta
#    - Cluster: New Job Cluster (más económico)
#    - Depends on: (ninguno - es el primero)
#
# 4. Agregar Task 2:
#    - Name: "transformacion"
#    - Type: Notebook
#    - Source: 02_transformacion
#    - Depends on: ingesta ✓
#
# 5. Agregar Task 3:
#    - Name: "metricas"
#    - Type: Notebook
#    - Source: 03_metricas
#    - Depends on: transformacion ✓
#
# 6. El grafo de dependencias debería verse:
#    ingesta → transformacion → metricas

print("Ver UI de Databricks para crear el Job")`,
        codeLanguage: 'python',
        tip: { es: '💡 Usa Job Clusters en producción - más económico que All-Purpose', en: '💡 Use Job Clusters in production - more economical than All-Purpose', pt: '💡 Use Job Clusters em produção - mais econômico que All-Purpose' }
      },
      {
        id: 'lab010-step6',
        title: { es: 'Configurar Schedule', en: 'Configure Schedule', pt: 'Configurar Schedule' },
        description: {
          es: 'Programa el Job para ejecutar automáticamente.',
          en: 'Schedule the Job to run automatically.',
          pt: 'Programe o Job para executar automaticamente.'
        },
        code: `# SCHEDULING
#
# En la configuración del Job:
#
# 1. Add Trigger > Scheduled
#
# 2. Opciones de frecuencia:
#    - Diario: "0 0 * * *" (medianoche)
#    - Cada hora: "0 * * * *"
#    - Lunes a Viernes 8am: "0 8 * * 1-5"
#    - Personalizado: expresión cron
#
# 3. Timezone: seleccionar zona horaria
#
# 4. Concurrency: cuántas ejecuciones simultáneas permitir
#    - 1 es lo más seguro para ETL
#
# Ejemplos de cron:
# "0 6 * * *"    → Todos los días a las 6am
# "0 */2 * * *"  → Cada 2 horas
# "0 0 1 * *"    → Primer día de cada mes

print("Cron expressions para scheduling")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab010-step7',
        title: { es: 'Configurar Alertas', en: 'Configure Alerts', pt: 'Configurar Alertas' },
        description: {
          es: 'Recibe notificaciones cuando el Job falla.',
          en: 'Receive notifications when the Job fails.',
          pt: 'Receba notificações quando o Job falhar.'
        },
        code: `# ALERTAS Y NOTIFICACIONES
#
# En la configuración del Job, pestaña "Notifications":
#
# 1. Email Notifications:
#    - On Start: email cuando inicia
#    - On Success: email cuando termina OK
#    - On Failure: email cuando falla ← IMPORTANTE
#
# 2. Slack:
#    - Webhook URL de tu canal
#    - Seleccionar eventos a notificar
#
# 3. Pagerduty:
#    - Para alertas críticas de producción
#
# 4. Webhook genérico:
#    - Llamar API custom
#
# Configuración recomendada para producción:
# - On Failure: siempre
# - On Success: opcional (puede ser mucho ruido)
# - On Start: solo para jobs críticos

print("Configura alertas para enterarte de fallos")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab010-step8',
        title: { es: 'Manejo de errores y reintentos', en: 'Error handling and retries', pt: 'Tratamento de erros e retentativas' },
        description: {
          es: 'Configura reintentos automáticos ante fallos.',
          en: 'Configure automatic retries on failures.',
          pt: 'Configure retentativas automáticas em caso de falhas.'
        },
        code: `# MANEJO DE ERRORES
#
# Por Task:
# 1. Retries: número de reintentos ante fallo
# 2. Min retry interval: tiempo entre reintentos
# 3. Max retry interval: tiempo máximo entre reintentos
#
# Configuración recomendada:
# - Retries: 2-3 para jobs de ingesta (pueden fallar por red)
# - Retries: 1 para jobs de transformación
# - Retries: 0 para jobs críticos que no deben duplicar datos
#
# En código, puedes hacer handling manual:
try:
    # ... tu código ...
    dbutils.notebook.exit("SUCCESS")
except Exception as e:
    # Log error
    print(f"Error: {e}")
    # Opcional: guardar error en tabla de auditoría
    # Fallar el notebook
    dbutils.notebook.exit("FAILED")

print("Retries configurados desde UI")`,
        codeLanguage: 'python',
        checkpoint: { es: '¿Tu Job tiene configurado al menos 1 reintento y alertas de fallo?', en: 'Does your Job have at least 1 retry and failure alerts configured?', pt: 'Seu Job tem pelo menos 1 retentativa e alertas de falha configurados?' }
      }
    ],
    xpReward: 125,
    badge: {
      id: 'badge-db-jobs',
      name: { es: 'Job Orchestrator', en: 'Job Orchestrator', pt: 'Job Orchestrator' },
      icon: '📅'
    },
    resources: [
      { title: 'Jobs Documentation', url: 'https://docs.databricks.com/workflows/jobs/jobs.html', type: 'docs' },
      { title: 'Job Scheduling', url: 'https://docs.databricks.com/workflows/jobs/schedule-jobs.html', type: 'docs' }
    ],
    tags: ['advanced', 'jobs', 'workflow', 'scheduling', 'orchestration'],
    services: ['Databricks Workflows', 'Jobs', 'Notebooks']
  }
];

