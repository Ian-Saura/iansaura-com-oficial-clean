# Databricks notebook source
# MAGIC %md
# MAGIC # 🔶 Structured Streaming
# MAGIC **Data Engineering Roadmap - Ian Saura Academy**
# MAGIC 
# MAGIC Procesamiento de datos en tiempo real con Spark Structured Streaming.
# MAGIC 
# MAGIC ## Contenido:
# MAGIC 1. Conceptos de Streaming
# MAGIC 2. Leer streams
# MAGIC 3. Transformaciones
# MAGIC 4. Escribir streams
# MAGIC 5. Triggers y Checkpoints

# COMMAND ----------

# MAGIC %md
# MAGIC ## 1. Conceptos de Streaming
# MAGIC 
# MAGIC **Structured Streaming** trata un stream de datos como una tabla infinita que crece continuamente.
# MAGIC 
# MAGIC ### Modelo de procesamiento:
# MAGIC - **Input**: Stream continuo de datos
# MAGIC - **Query**: Transformaciones (igual que batch!)
# MAGIC - **Output**: Resultados actualizados incrementalmente
# MAGIC 
# MAGIC ### Output Modes:
# MAGIC - **Append**: Solo nuevos registros
# MAGIC - **Complete**: Toda la tabla de resultados
# MAGIC - **Update**: Solo registros modificados

# COMMAND ----------

# MAGIC %md
# MAGIC ## 2. Setup - Simular Stream con Rate Source

# COMMAND ----------

from pyspark.sql.functions import *
from pyspark.sql.types import *

# COMMAND ----------

# Rate source: genera datos sintéticos para testing
df_stream = spark.readStream \
    .format("rate") \
    .option("rowsPerSecond", 5) \
    .load()

# Ver esquema
df_stream.printSchema()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 3. Transformaciones en Streaming
# MAGIC 
# MAGIC ¡Las mismas operaciones que en batch!

# COMMAND ----------

# Simular eventos de e-commerce
df_eventos = df_stream \
    .withColumn("event_type", 
        when(col("value") % 3 == 0, "purchase")
        .when(col("value") % 3 == 1, "view")
        .otherwise("add_to_cart")
    ) \
    .withColumn("product_id", concat(lit("P"), (col("value") % 10).cast("string"))) \
    .withColumn("user_id", concat(lit("U"), (col("value") % 100).cast("string"))) \
    .withColumn("amount", (rand() * 100 + 10).cast("decimal(10,2)")) \
    .withColumn("country", 
        when(col("value") % 4 == 0, "AR")
        .when(col("value") % 4 == 1, "BR")
        .when(col("value") % 4 == 2, "MX")
        .otherwise("CO")
    ) \
    .select("timestamp", "event_type", "product_id", "user_id", "amount", "country")

# COMMAND ----------

# MAGIC %md
# MAGIC ## 4. Escribir Stream a Consola (para testing)

# COMMAND ----------

# Mostrar en consola - útil para debugging
# NOTA: Esto es solo para demo, en producción escribirías a Delta

query_console = df_eventos \
    .writeStream \
    .format("console") \
    .outputMode("append") \
    .option("truncate", False) \
    .start()

# COMMAND ----------

# Ver el stream corriendo por unos segundos
import time
time.sleep(10)
query_console.stop()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 5. Escribir Stream a Delta Lake

# COMMAND ----------

CHECKPOINT_PATH = "/tmp/streaming_demo/checkpoints/eventos"
OUTPUT_PATH = "/tmp/streaming_demo/delta/eventos"

# Stream a Delta con checkpoint
query_delta = df_eventos \
    .writeStream \
    .format("delta") \
    .outputMode("append") \
    .option("checkpointLocation", CHECKPOINT_PATH) \
    .start(OUTPUT_PATH)

# COMMAND ----------

# Dejar correr unos segundos
import time
time.sleep(15)

# Ver datos escritos
display(spark.read.format("delta").load(OUTPUT_PATH))

# COMMAND ----------

# Detener el stream
query_delta.stop()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 6. Agregaciones en Streaming

# COMMAND ----------

# Reiniciar stream para agregaciones
df_stream_2 = spark.readStream.format("rate").option("rowsPerSecond", 10).load()

df_eventos_2 = df_stream_2 \
    .withColumn("event_type", 
        when(col("value") % 3 == 0, "purchase")
        .when(col("value") % 3 == 1, "view")
        .otherwise("add_to_cart")
    ) \
    .withColumn("amount", (rand() * 100 + 10).cast("decimal(10,2)")) \
    .withColumn("country", 
        when(col("value") % 4 == 0, "AR")
        .when(col("value") % 4 == 1, "BR")
        .when(col("value") % 4 == 2, "MX")
        .otherwise("CO")
    )

# COMMAND ----------

# MAGIC %md
# MAGIC ### Agregación con Windowing (Ventanas de tiempo)

# COMMAND ----------

# Agregación por ventana de tiempo de 10 segundos
agregacion_windowed = df_eventos_2 \
    .withWatermark("timestamp", "10 seconds") \
    .groupBy(
        window("timestamp", "10 seconds"),
        "event_type",
        "country"
    ) \
    .agg(
        count("*").alias("event_count"),
        sum("amount").alias("total_amount")
    )

# COMMAND ----------

# Escribir agregación
CHECKPOINT_AGG = "/tmp/streaming_demo/checkpoints/agregacion"
OUTPUT_AGG = "/tmp/streaming_demo/delta/agregacion"

query_agg = agregacion_windowed \
    .writeStream \
    .format("delta") \
    .outputMode("complete") \
    .option("checkpointLocation", CHECKPOINT_AGG) \
    .start(OUTPUT_AGG)

# COMMAND ----------

# Dejar correr
import time
time.sleep(20)

# Ver resultados
display(spark.read.format("delta").load(OUTPUT_AGG).orderBy("window"))

# COMMAND ----------

query_agg.stop()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 7. Triggers
# MAGIC 
# MAGIC Controlan cuándo se procesa el micro-batch.

# COMMAND ----------

# Trigger por defecto: procesa tan rápido como puede
# .trigger(processingTime="0 seconds")

# Trigger cada 10 segundos
# .trigger(processingTime="10 seconds")

# Trigger una sola vez (útil para testing o catch-up)
# .trigger(once=True)

# Trigger disponible (Databricks): procesa cuando hay datos disponibles
# .trigger(availableNow=True)

# COMMAND ----------

# Ejemplo: Trigger cada 5 segundos
df_stream_3 = spark.readStream.format("rate").option("rowsPerSecond", 2).load()

query_trigger = df_stream_3 \
    .writeStream \
    .format("console") \
    .trigger(processingTime="5 seconds") \
    .start()

time.sleep(15)
query_trigger.stop()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 8. Auto Loader (Databricks)
# MAGIC 
# MAGIC Forma recomendada de ingestar archivos incrementalmente.

# COMMAND ----------

# MAGIC %md
# MAGIC ```python
# MAGIC # Auto Loader: detecta nuevos archivos automáticamente
# MAGIC df_autoloader = spark.readStream \
# MAGIC     .format("cloudFiles") \
# MAGIC     .option("cloudFiles.format", "json") \
# MAGIC     .option("cloudFiles.schemaLocation", "/path/to/schema") \
# MAGIC     .load("/path/to/input/")
# MAGIC 
# MAGIC # Escribir a Delta
# MAGIC df_autoloader.writeStream \
# MAGIC     .format("delta") \
# MAGIC     .option("checkpointLocation", "/path/to/checkpoint") \
# MAGIC     .trigger(availableNow=True) \
# MAGIC     .start("/path/to/output/")
# MAGIC ```
# MAGIC 
# MAGIC ### Ventajas de Auto Loader:
# MAGIC - Detecta nuevos archivos automáticamente
# MAGIC - Maneja schema evolution
# MAGIC - Escalable a millones de archivos
# MAGIC - Exactly-once semantics

# COMMAND ----------

# MAGIC %md
# MAGIC ## 9. Monitoreo de Streams

# COMMAND ----------

# Reiniciar un stream para monitoreo
df_stream_4 = spark.readStream.format("rate").option("rowsPerSecond", 5).load()

query_monitor = df_stream_4 \
    .writeStream \
    .format("memory") \
    .queryName("monitor_demo") \
    .start()

time.sleep(5)

# COMMAND ----------

# Ver estado del query
print(f"ID: {query_monitor.id}")
print(f"Status: {query_monitor.status}")
print(f"Is Active: {query_monitor.isActive}")

# Progreso reciente
query_monitor.recentProgress

# COMMAND ----------

query_monitor.stop()

# COMMAND ----------

# MAGIC %md
# MAGIC ## Cleanup

# COMMAND ----------

# Limpiar datos de demo
dbutils.fs.rm("/tmp/streaming_demo", recurse=True)
print("✅ Cleanup completado")

# COMMAND ----------

# MAGIC %md
# MAGIC ## ✅ Checkpoint Completado
# MAGIC 
# MAGIC ¡Completaste Structured Streaming! Ahora dominas:
# MAGIC 
# MAGIC - Conceptos de streaming (output modes, triggers)
# MAGIC - Leer y transformar streams
# MAGIC - Escribir a Delta Lake
# MAGIC - Agregaciones con ventanas de tiempo
# MAGIC - Watermarks para late data
# MAGIC - Auto Loader para ingesta de archivos
# MAGIC - Monitoreo de queries
# MAGIC 
# MAGIC **¡Felicitaciones! Completaste todos los notebooks de la especialización.**
