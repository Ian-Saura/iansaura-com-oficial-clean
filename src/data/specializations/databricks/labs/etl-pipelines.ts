import { DatabricksLab } from './types';

/**
 * Labs de ETL Pipelines
 * Construye pipelines de datos reales
 */
export const DATABRICKS_LABS_ETL: DatabricksLab[] = [
  // =====================================================
  // LAB 7: Pipeline Medallion (Bronze-Silver-Gold)
  // =====================================================
  {
    id: 'db-lab-007',
    title: {
      es: '🏅 Pipeline Medallion: Bronze → Silver → Gold',
      en: '🏅 Medallion Pipeline: Bronze → Silver → Gold',
      pt: '🏅 Pipeline Medallion: Bronze → Silver → Gold'
    },
    subtitle: {
      es: 'La arquitectura estándar del Lakehouse',
      en: 'The Lakehouse standard architecture',
      pt: 'A arquitetura padrão do Lakehouse'
    },
    description: {
      es: 'Construye un pipeline ETL completo usando la arquitectura Medallion: Bronze (raw), Silver (limpio), Gold (agregado). Este patrón es el estándar en la industria.',
      en: 'Build a complete ETL pipeline using Medallion architecture: Bronze (raw), Silver (clean), Gold (aggregated). This pattern is the industry standard.',
      pt: 'Construa um pipeline ETL completo usando arquitetura Medallion: Bronze (raw), Silver (limpo), Gold (agregado). Este padrão é o standard da indústria.'
    },
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    relatedPhases: ['db-phase-5', 'db-phase-7'],
    prerequisites: [
      { es: 'Labs 1-6 completados', en: 'Labs 1-6 completed', pt: 'Labs 1-6 completados' },
      { es: 'Conceptos de ETL', en: 'ETL concepts', pt: 'Conceitos de ETL' }
    ],
    objectives: [
      { es: 'Entender la arquitectura Medallion', en: 'Understand Medallion architecture', pt: 'Entender a arquitetura Medallion' },
      { es: 'Crear capa Bronze (raw data)', en: 'Create Bronze layer (raw data)', pt: 'Criar camada Bronze (dados raw)' },
      { es: 'Crear capa Silver (cleaned data)', en: 'Create Silver layer (cleaned data)', pt: 'Criar camada Silver (dados limpos)' },
      { es: 'Crear capa Gold (aggregated data)', en: 'Create Gold layer (aggregated data)', pt: 'Criar camada Gold (dados agregados)' }
    ],
    steps: [
      {
        id: 'lab007-step1',
        title: { es: '¿Qué es la arquitectura Medallion?', en: 'What is Medallion architecture?', pt: 'O que é a arquitetura Medallion?' },
        description: {
          es: 'Medallion organiza datos en 3 capas de calidad creciente.',
          en: 'Medallion organizes data in 3 layers of increasing quality.',
          pt: 'Medallion organiza dados em 3 camadas de qualidade crescente.'
        },
        code: `# ARQUITECTURA MEDALLION
#
# 🥉 BRONZE (Raw)
#    - Datos tal cual llegan de la fuente
#    - Sin transformaciones
#    - Preserva historial completo
#    - Schema flexible
#
# 🥈 SILVER (Cleaned)
#    - Datos limpiados y validados
#    - Deduplicados
#    - Tipos correctos
#    - Joins con dimensiones
#
# 🥇 GOLD (Aggregated)
#    - Datos listos para consumo
#    - Métricas de negocio
#    - Tablas para BI/Reporting
#    - Performance optimizado

# Crear databases para cada capa
spark.sql("CREATE DATABASE IF NOT EXISTS bronze")
spark.sql("CREATE DATABASE IF NOT EXISTS silver")
spark.sql("CREATE DATABASE IF NOT EXISTS gold")

print("✅ Databases creados: bronze, silver, gold")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab007-step2',
        title: { es: 'Simular datos raw de e-commerce', en: 'Simulate raw e-commerce data', pt: 'Simular dados raw de e-commerce' },
        description: {
          es: 'Crea datos de ejemplo que simulan órdenes de e-commerce.',
          en: 'Create sample data simulating e-commerce orders.',
          pt: 'Crie dados de exemplo que simulam pedidos de e-commerce.'
        },
        code: `from pyspark.sql.functions import *
from pyspark.sql.types import *

# Simular datos raw con "problemas" típicos
raw_orders_data = [
    # Datos válidos
    ('ORD001', 'CUST001', 'PROD001', 2, 29.99, '2024-01-15 10:30:00', 'completed'),
    ('ORD002', 'CUST002', 'PROD002', 1, 149.99, '2024-01-15 11:45:00', 'completed'),
    ('ORD003', 'CUST001', 'PROD003', 3, 9.99, '2024-01-15 14:20:00', 'completed'),
    # Duplicado
    ('ORD001', 'CUST001', 'PROD001', 2, 29.99, '2024-01-15 10:30:00', 'completed'),
    # Nulos
    ('ORD004', None, 'PROD001', 1, 29.99, '2024-01-16 09:00:00', 'pending'),
    # Status inválido
    ('ORD005', 'CUST003', 'PROD002', 1, 149.99, '2024-01-16 10:30:00', 'INVALID'),
    # Cantidad negativa
    ('ORD006', 'CUST002', 'PROD003', -1, 9.99, '2024-01-16 11:00:00', 'completed'),
    # Más datos válidos
    ('ORD007', 'CUST004', 'PROD001', 5, 29.99, '2024-01-17 08:00:00', 'completed'),
    ('ORD008', 'CUST005', 'PROD002', 2, 149.99, '2024-01-17 12:30:00', 'shipped'),
    ('ORD009', 'CUST001', 'PROD003', 10, 9.99, '2024-01-17 15:45:00', 'completed'),
]

columns = ['order_id', 'customer_id', 'product_id', 'quantity', 'unit_price', 'order_timestamp', 'status']

df_raw = spark.createDataFrame(raw_orders_data, columns)
print("Datos raw con problemas:")
df_raw.show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab007-step3',
        title: { es: 'Capa Bronze: Guardar raw', en: 'Bronze layer: Save raw', pt: 'Camada Bronze: Salvar raw' },
        description: {
          es: 'Guarda los datos raw sin transformaciones, agregando metadatos de ingesta.',
          en: 'Save raw data without transformations, adding ingestion metadata.',
          pt: 'Salve dados raw sem transformações, adicionando metadados de ingestão.'
        },
        code: `# Bronze: guardar tal cual + metadatos de ingesta
df_bronze = df_raw.withColumn(
    "_ingested_at", current_timestamp()
).withColumn(
    "_source_file", lit("manual_load")
)

# Guardar en Bronze
df_bronze.write.format("delta") \\
    .mode("overwrite") \\
    .saveAsTable("bronze.orders")

print("✅ Bronze layer creada")
spark.table("bronze.orders").show()`,
        codeLanguage: 'python',
        tip: { es: '💡 Bronze preserva todo, incluso errores. Esto permite reprocesar.', en: '💡 Bronze preserves everything, even errors. This allows reprocessing.', pt: '💡 Bronze preserva tudo, até erros. Isso permite reprocessar.' }
      },
      {
        id: 'lab007-step4',
        title: { es: 'Capa Silver: Limpiar datos', en: 'Silver layer: Clean data', pt: 'Camada Silver: Limpar dados' },
        description: {
          es: 'Limpia los datos: deduplica, valida, corrige tipos.',
          en: 'Clean data: deduplicate, validate, fix types.',
          pt: 'Limpe os dados: deduplique, valide, corrija tipos.'
        },
        code: `from pyspark.sql.functions import *

# Leer de Bronze
df_bronze = spark.table("bronze.orders")

# Transformaciones Silver:
# 1. Deduplicar
# 2. Filtrar nulos en campos críticos
# 3. Validar status
# 4. Validar cantidades positivas
# 5. Parsear timestamp
# 6. Calcular total

valid_statuses = ['pending', 'completed', 'shipped', 'cancelled']

df_silver = (
    df_bronze
    # 1. Deduplicar por order_id (tomar el primero)
    .dropDuplicates(["order_id"])
    
    # 2. Filtrar nulos en campos críticos
    .filter(col("customer_id").isNotNull())
    .filter(col("product_id").isNotNull())
    
    # 3. Validar y normalizar status
    .withColumn("status_clean", 
        when(lower(col("status")).isin(valid_statuses), lower(col("status")))
        .otherwise("unknown")
    )
    
    # 4. Filtrar cantidades inválidas
    .filter(col("quantity") > 0)
    
    # 5. Parsear timestamp
    .withColumn("order_datetime", to_timestamp(col("order_timestamp")))
    .withColumn("order_date", to_date(col("order_datetime")))
    
    # 6. Calcular total
    .withColumn("total_amount", col("quantity") * col("unit_price"))
    
    # Seleccionar columnas finales
    .select(
        "order_id", "customer_id", "product_id",
        "quantity", "unit_price", "total_amount",
        "order_datetime", "order_date",
        col("status_clean").alias("status")
    )
)

# Guardar en Silver
df_silver.write.format("delta") \\
    .mode("overwrite") \\
    .saveAsTable("silver.orders")

print("✅ Silver layer creada")
print(f"Bronze: {df_bronze.count()} registros")
print(f"Silver: {df_silver.count()} registros (después de limpieza)")
df_silver.show()`,
        codeLanguage: 'python',
        checkpoint: { es: '¿Cuántos registros se "perdieron" en la limpieza?', en: 'How many records were "lost" in cleaning?', pt: 'Quantos registros foram "perdidos" na limpeza?' }
      },
      {
        id: 'lab007-step5',
        title: { es: 'Crear tabla de productos (dimensión)', en: 'Create products table (dimension)', pt: 'Criar tabela de produtos (dimensão)' },
        description: {
          es: 'Crea una tabla de dimensión de productos para enriquecer los datos.',
          en: 'Create a products dimension table to enrich the data.',
          pt: 'Crie uma tabela de dimensão de produtos para enriquecer os dados.'
        },
        code: `# Tabla de dimensión de productos
productos_data = [
    ('PROD001', 'Wireless Mouse', 'Electronics', 'Logitech'),
    ('PROD002', 'Mechanical Keyboard', 'Electronics', 'Corsair'),
    ('PROD003', 'USB Cable', 'Accessories', 'Amazon Basics')
]

df_productos = spark.createDataFrame(
    productos_data,
    ['product_id', 'product_name', 'category', 'brand']
)

df_productos.write.format("delta") \\
    .mode("overwrite") \\
    .saveAsTable("silver.products")

print("✅ Dimensión productos creada")
df_productos.show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab007-step6',
        title: { es: 'Capa Gold: Métricas de negocio', en: 'Gold layer: Business metrics', pt: 'Camada Gold: Métricas de negócio' },
        description: {
          es: 'Crea tablas agregadas listas para BI y reporting.',
          en: 'Create aggregated tables ready for BI and reporting.',
          pt: 'Crie tabelas agregadas prontas para BI e reporting.'
        },
        code: `# Gold 1: Ventas diarias por categoría
df_ventas_diarias = spark.sql("""
    SELECT 
        o.order_date,
        p.category,
        COUNT(DISTINCT o.order_id) as num_orders,
        COUNT(DISTINCT o.customer_id) as unique_customers,
        SUM(o.quantity) as total_units,
        SUM(o.total_amount) as revenue,
        AVG(o.total_amount) as avg_order_value
    FROM silver.orders o
    JOIN silver.products p ON o.product_id = p.product_id
    WHERE o.status = 'completed'
    GROUP BY o.order_date, p.category
    ORDER BY o.order_date, p.category
""")

df_ventas_diarias.write.format("delta") \\
    .mode("overwrite") \\
    .saveAsTable("gold.daily_sales_by_category")

print("✅ Gold: daily_sales_by_category")
df_ventas_diarias.show()

# Gold 2: Top productos
df_top_productos = spark.sql("""
    SELECT 
        p.product_name,
        p.brand,
        p.category,
        SUM(o.quantity) as total_units_sold,
        SUM(o.total_amount) as total_revenue,
        COUNT(DISTINCT o.customer_id) as unique_buyers
    FROM silver.orders o
    JOIN silver.products p ON o.product_id = p.product_id
    WHERE o.status = 'completed'
    GROUP BY p.product_name, p.brand, p.category
    ORDER BY total_revenue DESC
""")

df_top_productos.write.format("delta") \\
    .mode("overwrite") \\
    .saveAsTable("gold.top_products")

print("✅ Gold: top_products")
df_top_productos.show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab007-step7',
        title: { es: 'Gold: Dashboard KPIs', en: 'Gold: Dashboard KPIs', pt: 'Gold: Dashboard KPIs' },
        description: {
          es: 'Crea una tabla con KPIs principales para el dashboard ejecutivo.',
          en: 'Create a table with main KPIs for executive dashboard.',
          pt: 'Crie uma tabela com KPIs principais para o dashboard executivo.'
        },
        code: `# Gold 3: KPIs ejecutivos
df_kpis = spark.sql("""
    SELECT 
        current_date() as report_date,
        COUNT(DISTINCT order_id) as total_orders,
        COUNT(DISTINCT customer_id) as unique_customers,
        SUM(total_amount) as total_revenue,
        AVG(total_amount) as avg_order_value,
        SUM(quantity) as total_units_sold,
        (SELECT COUNT(DISTINCT order_id) FROM silver.orders WHERE status = 'pending') as pending_orders,
        (SELECT COUNT(DISTINCT order_id) FROM silver.orders WHERE status = 'shipped') as shipped_orders
    FROM silver.orders
    WHERE status = 'completed'
""")

df_kpis.write.format("delta") \\
    .mode("overwrite") \\
    .saveAsTable("gold.executive_kpis")

print("✅ Gold: executive_kpis")
df_kpis.show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab007-step8',
        title: { es: 'Verificar pipeline completo', en: 'Verify complete pipeline', pt: 'Verificar pipeline completo' },
        description: {
          es: 'Revisa las tablas creadas en cada capa.',
          en: 'Review tables created in each layer.',
          pt: 'Revise as tabelas criadas em cada camada.'
        },
        code: `# Resumen del pipeline
print("=" * 50)
print("🏅 PIPELINE MEDALLION COMPLETADO")
print("=" * 50)

print("\\n🥉 BRONZE LAYER:")
print("-" * 30)
spark.sql("SHOW TABLES IN bronze").show()

print("\\n🥈 SILVER LAYER:")
print("-" * 30)
spark.sql("SHOW TABLES IN silver").show()

print("\\n🥇 GOLD LAYER:")
print("-" * 30)
spark.sql("SHOW TABLES IN gold").show()

# Flujo de datos
print("\\n📊 FLUJO DE DATOS:")
print(f"  Bronze (raw):  {spark.table('bronze.orders').count()} registros")
print(f"  Silver (clean): {spark.table('silver.orders').count()} registros")
print(f"  Gold tables:   3 tablas de métricas")`,
        codeLanguage: 'python',
        checkpoint: { es: '¡Pipeline completo! ¿Puedes identificar qué tipo de queries usaría cada capa?', en: 'Pipeline complete! Can you identify what type of queries would use each layer?', pt: 'Pipeline completo! Você consegue identificar que tipo de queries usaria cada camada?' }
      }
    ],
    xpReward: 150,
    badge: {
      id: 'badge-db-medallion',
      name: { es: 'Medallion Architect', en: 'Medallion Architect', pt: 'Medallion Architect' },
      icon: '🏅'
    },
    resources: [
      { title: 'Medallion Architecture', url: 'https://www.databricks.com/glossary/medallion-architecture', type: 'docs' },
      { title: 'Building Lakehouses', url: 'https://docs.databricks.com/lakehouse/index.html', type: 'docs' }
    ],
    tags: ['intermediate', 'medallion', 'etl', 'pipeline', 'bronze', 'silver', 'gold'],
    services: ['Delta Lake', 'Spark SQL', 'Notebooks']
  },

  // =====================================================
  // LAB 8: Streaming con Auto Loader
  // =====================================================
  {
    id: 'db-lab-008',
    title: {
      es: '🌊 Streaming con Auto Loader',
      en: '🌊 Streaming with Auto Loader',
      pt: '🌊 Streaming com Auto Loader'
    },
    subtitle: {
      es: 'Ingesta incremental automática de archivos',
      en: 'Automatic incremental file ingestion',
      pt: 'Ingestão incremental automática de arquivos'
    },
    description: {
      es: 'Auto Loader detecta y procesa automáticamente archivos nuevos. Aprenderás a configurar ingesta incremental que escala a millones de archivos.',
      en: 'Auto Loader automatically detects and processes new files. You will learn to configure incremental ingestion that scales to millions of files.',
      pt: 'Auto Loader detecta e processa automaticamente novos arquivos. Você aprenderá a configurar ingestão incremental que escala para milhões de arquivos.'
    },
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    relatedPhases: ['db-phase-7', 'db-phase-8'],
    prerequisites: [
      { es: 'Lab 7 completado', en: 'Lab 7 completed', pt: 'Lab 7 completado' },
      { es: 'Conceptos básicos de streaming', en: 'Basic streaming concepts', pt: 'Conceitos básicos de streaming' }
    ],
    objectives: [
      { es: 'Entender cómo funciona Auto Loader', en: 'Understand how Auto Loader works', pt: 'Entender como o Auto Loader funciona' },
      { es: 'Configurar ingesta incremental', en: 'Configure incremental ingestion', pt: 'Configurar ingestão incremental' },
      { es: 'Usar schema inference y evolution', en: 'Use schema inference and evolution', pt: 'Usar schema inference e evolution' },
      { es: 'Manejar checkpoints', en: 'Handle checkpoints', pt: 'Gerenciar checkpoints' }
    ],
    steps: [
      {
        id: 'lab008-step1',
        title: { es: '¿Qué es Auto Loader?', en: 'What is Auto Loader?', pt: 'O que é Auto Loader?' },
        description: {
          es: 'Auto Loader (cloudFiles) procesa archivos nuevos incrementalmente.',
          en: 'Auto Loader (cloudFiles) processes new files incrementally.',
          pt: 'Auto Loader (cloudFiles) processa novos arquivos incrementalmente.'
        },
        code: `# AUTO LOADER (cloudFiles)
# 
# ✅ Detecta archivos nuevos automáticamente
# ✅ Procesa incrementalmente (solo nuevos)
# ✅ Escala a millones de archivos
# ✅ Schema inference automático
# ✅ Tolerante a fallos (checkpoints)
# ✅ Exactly-once processing
#
# Ideal para:
# - Archivos que llegan continuamente (logs, eventos)
# - Landing zones con datos de múltiples fuentes
# - Pipelines de ingesta automatizados

print("Auto Loader = Streaming de archivos simplificado")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab008-step2',
        title: { es: 'Crear datos de ejemplo', en: 'Create sample data', pt: 'Criar dados de exemplo' },
        description: {
          es: 'Simula archivos JSON que llegan a un directorio.',
          en: 'Simulate JSON files arriving at a directory.',
          pt: 'Simule arquivos JSON que chegam a um diretório.'
        },
        code: `import json
from datetime import datetime, timedelta
import random

# Crear directorio para archivos
dbutils.fs.mkdirs("/tmp/autoloader_demo/landing")

# Función para generar eventos
def generate_events(num_events, batch_id):
    events = []
    base_time = datetime.now()
    for i in range(num_events):
        event = {
            "event_id": f"EVT_{batch_id}_{i:04d}",
            "user_id": f"USER_{random.randint(1, 100):03d}",
            "event_type": random.choice(["click", "view", "purchase", "signup"]),
            "page": random.choice(["/home", "/products", "/cart", "/checkout"]),
            "timestamp": (base_time + timedelta(seconds=i)).isoformat(),
            "value": round(random.random() * 100, 2)
        }
        events.append(event)
    return events

# Generar primer batch de archivos
batch1 = generate_events(50, "B001")
dbutils.fs.put(
    "/tmp/autoloader_demo/landing/events_batch1.json",
    "\\n".join([json.dumps(e) for e in batch1]),
    overwrite=True
)

print("✅ Batch 1 creado: 50 eventos")
print("\\nArchivos en landing zone:")
display(dbutils.fs.ls("/tmp/autoloader_demo/landing"))`,
        codeLanguage: 'python'
      },
      {
        id: 'lab008-step3',
        title: { es: 'Configurar Auto Loader básico', en: 'Configure basic Auto Loader', pt: 'Configurar Auto Loader básico' },
        description: {
          es: 'Crea un stream que procesa archivos JSON automáticamente.',
          en: 'Create a stream that processes JSON files automatically.',
          pt: 'Crie um stream que processa arquivos JSON automaticamente.'
        },
        code: `# Configurar Auto Loader
df_stream = (
    spark.readStream
    .format("cloudFiles")  # <-- Auto Loader
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", "/tmp/autoloader_demo/schema")
    .option("cloudFiles.inferColumnTypes", "true")
    .load("/tmp/autoloader_demo/landing")
)

# Ver schema inferido
df_stream.printSchema()`,
        codeLanguage: 'python',
        tip: { es: '💡 schemaLocation guarda el schema inferido para próximas ejecuciones', en: '💡 schemaLocation saves inferred schema for future runs', pt: '💡 schemaLocation salva o schema inferido para próximas execuções' }
      },
      {
        id: 'lab008-step4',
        title: { es: 'Escribir a tabla Delta', en: 'Write to Delta table', pt: 'Escrever para tabela Delta' },
        description: {
          es: 'Procesa el stream y escribe a una tabla Delta.',
          en: 'Process the stream and write to a Delta table.',
          pt: 'Processe o stream e escreva para uma tabela Delta.'
        },
        code: `from pyspark.sql.functions import current_timestamp

# Agregar metadatos y escribir a Delta
query = (
    df_stream
    .withColumn("_ingested_at", current_timestamp())
    .writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "/tmp/autoloader_demo/checkpoints/events")
    .trigger(availableNow=True)  # Procesar todo lo disponible ahora
    .toTable("bronze.events_autoloader")
)

# Esperar a que termine
query.awaitTermination()

print("✅ Stream procesado")
print(f"Registros en tabla: {spark.table('bronze.events_autoloader').count()}")
spark.table("bronze.events_autoloader").show(5)`,
        codeLanguage: 'python'
      },
      {
        id: 'lab008-step5',
        title: { es: 'Agregar más archivos', en: 'Add more files', pt: 'Adicionar mais arquivos' },
        description: {
          es: 'Simula la llegada de nuevos archivos y observa cómo Auto Loader los detecta.',
          en: 'Simulate arrival of new files and observe how Auto Loader detects them.',
          pt: 'Simule a chegada de novos arquivos e observe como o Auto Loader os detecta.'
        },
        code: `# Generar más batches de archivos
for batch_num in range(2, 5):
    batch = generate_events(30, f"B{batch_num:03d}")
    dbutils.fs.put(
        f"/tmp/autoloader_demo/landing/events_batch{batch_num}.json",
        "\\n".join([json.dumps(e) for e in batch]),
        overwrite=True
    )
    print(f"✅ Batch {batch_num} creado: 30 eventos")

print("\\nArchivos en landing zone:")
display(dbutils.fs.ls("/tmp/autoloader_demo/landing"))`,
        codeLanguage: 'python'
      },
      {
        id: 'lab008-step6',
        title: { es: 'Re-ejecutar Auto Loader', en: 'Re-run Auto Loader', pt: 'Re-executar Auto Loader' },
        description: {
          es: 'Auto Loader solo procesa los archivos nuevos gracias al checkpoint.',
          en: 'Auto Loader only processes new files thanks to the checkpoint.',
          pt: 'Auto Loader só processa os novos arquivos graças ao checkpoint.'
        },
        code: `# Contar antes
count_before = spark.table("bronze.events_autoloader").count()

# Re-ejecutar el mismo stream
df_stream = (
    spark.readStream
    .format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", "/tmp/autoloader_demo/schema")
    .load("/tmp/autoloader_demo/landing")
)

query = (
    df_stream
    .withColumn("_ingested_at", current_timestamp())
    .writeStream
    .format("delta")
    .outputMode("append")
    .option("checkpointLocation", "/tmp/autoloader_demo/checkpoints/events")
    .trigger(availableNow=True)
    .toTable("bronze.events_autoloader")
)

query.awaitTermination()

count_after = spark.table("bronze.events_autoloader").count()

print(f"Antes: {count_before} registros")
print(f"Después: {count_after} registros")
print(f"Nuevos procesados: {count_after - count_before}")`,
        codeLanguage: 'python',
        checkpoint: { es: '¿Cuántos registros nuevos se procesaron? ¿Por qué no se reprocesó el batch 1?', en: 'How many new records were processed? Why wasn\'t batch 1 reprocessed?', pt: 'Quantos registros novos foram processados? Por que o batch 1 não foi reprocessado?' }
      },
      {
        id: 'lab008-step7',
        title: { es: 'Opciones avanzadas', en: 'Advanced options', pt: 'Opções avançadas' },
        description: {
          es: 'Configura opciones adicionales para producción.',
          en: 'Configure additional options for production.',
          pt: 'Configure opções adicionais para produção.'
        },
        code: `# Configuración de producción completa
df_production = (
    spark.readStream
    .format("cloudFiles")
    .option("cloudFiles.format", "json")
    .option("cloudFiles.schemaLocation", "/tmp/autoloader_demo/schema_prod")
    
    # Schema evolution
    .option("cloudFiles.schemaEvolutionMode", "addNewColumns")
    
    # Performance
    .option("cloudFiles.maxFilesPerTrigger", 1000)  # Archivos por micro-batch
    .option("cloudFiles.maxBytesPerTrigger", "10g") # Límite de tamaño
    
    # Manejo de errores
    .option("cloudFiles.schemaHints", "value double")  # Hints de tipos
    
    # Notificaciones (en producción real)
    # .option("cloudFiles.useNotifications", "true")  # Usar cloud events
    
    .load("/tmp/autoloader_demo/landing")
)

print("Configuración de producción lista")
df_production.printSchema()`,
        codeLanguage: 'python',
        tip: { es: '💡 useNotifications=true es más eficiente que polling para muchos archivos', en: '💡 useNotifications=true is more efficient than polling for many files', pt: '💡 useNotifications=true é mais eficiente que polling para muitos arquivos' }
      }
    ],
    xpReward: 100,
    badge: {
      id: 'badge-db-autoloader',
      name: { es: 'Auto Loader Expert', en: 'Auto Loader Expert', pt: 'Auto Loader Expert' },
      icon: '🌊'
    },
    resources: [
      { title: 'Auto Loader Documentation', url: 'https://docs.databricks.com/ingestion/auto-loader/index.html', type: 'docs' },
      { title: 'Schema Evolution', url: 'https://docs.databricks.com/ingestion/auto-loader/schema.html', type: 'docs' }
    ],
    tags: ['intermediate', 'streaming', 'auto-loader', 'incremental', 'ingestion'],
    services: ['Auto Loader', 'Structured Streaming', 'Delta Lake']
  }
];

