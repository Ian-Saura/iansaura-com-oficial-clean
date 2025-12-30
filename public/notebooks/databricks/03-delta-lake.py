# Databricks notebook source
# MAGIC %md
# MAGIC # 🔶 Delta Lake Completo
# MAGIC **Data Engineering Roadmap - Ian Saura Academy**
# MAGIC 
# MAGIC Este notebook cubre todas las funcionalidades de Delta Lake.
# MAGIC 
# MAGIC ## Contenido:
# MAGIC 1. Crear tablas Delta
# MAGIC 2. ACID Transactions
# MAGIC 3. Time Travel
# MAGIC 4. MERGE (Upserts)
# MAGIC 5. OPTIMIZE y Z-Ordering
# MAGIC 6. VACUUM

# COMMAND ----------

# MAGIC %md
# MAGIC ## Setup

# COMMAND ----------

from pyspark.sql.functions import *
from delta.tables import DeltaTable

# Path para nuestras tablas
BASE_PATH = "/tmp/delta_lake_demo"

# COMMAND ----------

# MAGIC %md
# MAGIC ## 1. Crear Tablas Delta

# COMMAND ----------

# Datos de productos
productos_data = [
    (1, "Laptop", "Electronics", 999.99, 50),
    (2, "Mouse", "Electronics", 29.99, 200),
    (3, "Teclado", "Electronics", 79.99, 150),
    (4, "Monitor", "Electronics", 299.99, 75),
    (5, "Silla Gamer", "Furniture", 249.99, 30)
]

df_productos = spark.createDataFrame(
    productos_data, 
    ["id", "nombre", "categoria", "precio", "stock"]
)

# Guardar como Delta
df_productos.write.format("delta").mode("overwrite").save(f"{BASE_PATH}/productos")

print("✅ Tabla Delta creada")

# COMMAND ----------

# Leer tabla Delta
df_delta = spark.read.format("delta").load(f"{BASE_PATH}/productos")
display(df_delta)

# COMMAND ----------

# También podemos crear como tabla manejada
df_productos.write.format("delta").mode("overwrite").saveAsTable("demo_productos")

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Ver la tabla
# MAGIC SELECT * FROM demo_productos

# COMMAND ----------

# MAGIC %md
# MAGIC ## 2. ACID Transactions
# MAGIC 
# MAGIC Delta Lake garantiza:
# MAGIC - **A**tomicity: Transacciones completas o nada
# MAGIC - **C**onsistency: Datos siempre válidos
# MAGIC - **I**solation: Transacciones aisladas
# MAGIC - **D**urability: Cambios persistentes

# COMMAND ----------

# Actualizar datos (transacción atómica)
spark.sql("""
    UPDATE demo_productos 
    SET precio = precio * 1.1 
    WHERE categoria = 'Electronics'
""")

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Verificar actualización
# MAGIC SELECT * FROM demo_productos

# COMMAND ----------

# MAGIC %md
# MAGIC ## 3. Time Travel
# MAGIC 
# MAGIC Accede a versiones anteriores de tus datos.

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Ver historial de cambios
# MAGIC DESCRIBE HISTORY demo_productos

# COMMAND ----------

# Leer versión específica
df_version_0 = spark.read.format("delta").option("versionAsOf", 0).table("demo_productos")
display(df_version_0)

# COMMAND ----------

# Leer por timestamp (ajustar fecha)
# df_timestamp = spark.read.format("delta").option("timestampAsOf", "2024-01-01").table("demo_productos")

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Comparar versiones
# MAGIC SELECT 'actual' as version, * FROM demo_productos
# MAGIC UNION ALL
# MAGIC SELECT 'anterior' as version, * FROM demo_productos VERSION AS OF 0

# COMMAND ----------

# MAGIC %md
# MAGIC ## 4. MERGE (Upserts)
# MAGIC 
# MAGIC Actualiza registros existentes e inserta nuevos en una sola operación.

# COMMAND ----------

# Nuevos datos (algunos existentes, algunos nuevos)
nuevos_productos = [
    (1, "Laptop Pro", "Electronics", 1299.99, 40),  # UPDATE: cambió nombre y precio
    (3, "Teclado", "Electronics", 89.99, 180),      # UPDATE: cambió precio y stock
    (6, "Webcam", "Electronics", 59.99, 100),       # INSERT: nuevo producto
    (7, "Auriculares", "Electronics", 149.99, 80)   # INSERT: nuevo producto
]

df_nuevos = spark.createDataFrame(
    nuevos_productos,
    ["id", "nombre", "categoria", "precio", "stock"]
)

display(df_nuevos)

# COMMAND ----------

# MERGE usando DeltaTable API
delta_table = DeltaTable.forName(spark, "demo_productos")

delta_table.alias("target").merge(
    df_nuevos.alias("source"),
    "target.id = source.id"
).whenMatchedUpdate(set={
    "nombre": "source.nombre",
    "precio": "source.precio",
    "stock": "source.stock"
}).whenNotMatchedInsert(values={
    "id": "source.id",
    "nombre": "source.nombre",
    "categoria": "source.categoria",
    "precio": "source.precio",
    "stock": "source.stock"
}).execute()

print("✅ MERGE completado")

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Verificar resultado del MERGE
# MAGIC SELECT * FROM demo_productos ORDER BY id

# COMMAND ----------

# MAGIC %md
# MAGIC ## 5. OPTIMIZE y Z-Ordering
# MAGIC 
# MAGIC Optimiza el layout físico de los datos para mejor performance.

# COMMAND ----------

# MAGIC %sql
# MAGIC -- OPTIMIZE: Compacta archivos pequeños
# MAGIC OPTIMIZE demo_productos

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Z-ORDER: Colocate data by column for faster queries
# MAGIC OPTIMIZE demo_productos ZORDER BY (categoria)

# COMMAND ----------

# MAGIC %md
# MAGIC ## 6. VACUUM
# MAGIC 
# MAGIC Elimina archivos antiguos que ya no son necesarios.

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Ver archivos antes de VACUUM
# MAGIC DESCRIBE DETAIL demo_productos

# COMMAND ----------

# Por defecto, VACUUM elimina archivos > 7 días
# Para demo, podemos reducir (¡NO hacer en producción!)
spark.conf.set("spark.databricks.delta.retentionDurationCheck.enabled", "false")

# COMMAND ----------

# MAGIC %sql
# MAGIC -- VACUUM: eliminar archivos > 0 horas (solo para demo!)
# MAGIC -- En producción usar al menos 168 horas (7 días)
# MAGIC VACUUM demo_productos RETAIN 0 HOURS

# COMMAND ----------

# MAGIC %md
# MAGIC ## 7. Schema Evolution

# COMMAND ----------

# Agregar nueva columna
df_con_descuento = df_nuevos.withColumn("descuento", lit(0.0))

# Habilitar schema evolution
df_con_descuento.write.format("delta") \
    .mode("append") \
    .option("mergeSchema", "true") \
    .saveAsTable("demo_productos")

# COMMAND ----------

# MAGIC %sql
# MAGIC -- Ver nueva columna
# MAGIC SELECT * FROM demo_productos

# COMMAND ----------

# MAGIC %md
# MAGIC ## 🎯 Ejercicio Final
# MAGIC 
# MAGIC 1. Crea una tabla Delta llamada `ventas_demo`
# MAGIC 2. Inserta 5 registros
# MAGIC 3. Actualiza el precio de un producto
# MAGIC 4. Usa Time Travel para ver la versión anterior
# MAGIC 5. Haz un MERGE con nuevos datos

# COMMAND ----------

# Tu solución aquí:

# 1. Crear datos
ventas = spark.createDataFrame([
    (1, "2024-01-01", 100.0),
    (2, "2024-01-02", 150.0),
    (3, "2024-01-03", 200.0),
    (4, "2024-01-04", 175.0),
    (5, "2024-01-05", 225.0)
], ["id", "fecha", "monto"])

# 2. Guardar como Delta
ventas.write.format("delta").mode("overwrite").saveAsTable("ventas_demo")

# 3. Actualizar
spark.sql("UPDATE ventas_demo SET monto = 999.0 WHERE id = 1")

# 4. Time Travel
display(spark.read.format("delta").option("versionAsOf", 0).table("ventas_demo"))

# 5. MERGE
nuevas_ventas = spark.createDataFrame([
    (1, "2024-01-01", 100.0),  # Ya existe
    (6, "2024-01-06", 300.0)   # Nuevo
], ["id", "fecha", "monto"])

DeltaTable.forName(spark, "ventas_demo").alias("t").merge(
    nuevas_ventas.alias("s"), "t.id = s.id"
).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()

display(spark.table("ventas_demo"))

# COMMAND ----------

# MAGIC %md
# MAGIC ## Cleanup

# COMMAND ----------

# Limpiar tablas de demo
spark.sql("DROP TABLE IF EXISTS demo_productos")
spark.sql("DROP TABLE IF EXISTS ventas_demo")
dbutils.fs.rm(BASE_PATH, recurse=True)

print("✅ Cleanup completado")

# COMMAND ----------

# MAGIC %md
# MAGIC ## ✅ Checkpoint
# MAGIC 
# MAGIC ¡Completaste Delta Lake! Ahora dominas:
# MAGIC - Crear y leer tablas Delta
# MAGIC - ACID transactions
# MAGIC - Time Travel
# MAGIC - MERGE para upserts
# MAGIC - OPTIMIZE y Z-Ordering
# MAGIC - VACUUM y mantenimiento
# MAGIC 
# MAGIC **Próximo paso:** Notebook 04 - Proyecto ETL E-commerce
