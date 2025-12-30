# Databricks notebook source
# MAGIC %md
# MAGIC # 🔶 PySpark Avanzado
# MAGIC **Data Engineering Roadmap - Ian Saura Academy**
# MAGIC 
# MAGIC Este notebook cubre técnicas avanzadas de PySpark.
# MAGIC 
# MAGIC ## Contenido:
# MAGIC 1. Window Functions
# MAGIC 2. User Defined Functions (UDFs)
# MAGIC 3. Higher-Order Functions
# MAGIC 4. Optimización y Performance

# COMMAND ----------

# MAGIC %md
# MAGIC ## Setup - Crear datos de ejemplo

# COMMAND ----------

from pyspark.sql.functions import *
from pyspark.sql.window import Window
from pyspark.sql.types import *

# Datos de ventas
ventas_data = [
    ("2024-01-01", "Electronics", "Argentina", 1500),
    ("2024-01-01", "Electronics", "Brasil", 2300),
    ("2024-01-01", "Clothing", "Argentina", 800),
    ("2024-01-02", "Electronics", "Argentina", 1800),
    ("2024-01-02", "Electronics", "Brasil", 2100),
    ("2024-01-02", "Clothing", "Argentina", 950),
    ("2024-01-03", "Electronics", "Argentina", 2200),
    ("2024-01-03", "Electronics", "Brasil", 1900),
    ("2024-01-03", "Clothing", "Argentina", 1100),
    ("2024-01-04", "Electronics", "Argentina", 1600),
    ("2024-01-04", "Electronics", "Brasil", 2500),
    ("2024-01-04", "Clothing", "Argentina", 750),
]

df_ventas = spark.createDataFrame(ventas_data, ["fecha", "categoria", "pais", "monto"])
display(df_ventas)

# COMMAND ----------

# MAGIC %md
# MAGIC ## 1. Window Functions
# MAGIC 
# MAGIC Las Window Functions permiten hacer cálculos sobre un conjunto de filas relacionadas.

# COMMAND ----------

# MAGIC %md
# MAGIC ### ROW_NUMBER - Número secuencial

# COMMAND ----------

# Ranking de ventas por categoría
window_cat = Window.partitionBy("categoria").orderBy(col("monto").desc())

df_con_rank = df_ventas.withColumn("rank_en_categoria", row_number().over(window_cat))
display(df_con_rank)

# COMMAND ----------

# MAGIC %md
# MAGIC ### RANK vs DENSE_RANK

# COMMAND ----------

# RANK: deja gaps (1,2,2,4)
# DENSE_RANK: sin gaps (1,2,2,3)

window_pais = Window.partitionBy("pais").orderBy(col("monto").desc())

df_ranks = df_ventas.withColumn("rank", rank().over(window_pais)) \
                    .withColumn("dense_rank", dense_rank().over(window_pais))
display(df_ranks)

# COMMAND ----------

# MAGIC %md
# MAGIC ### LAG y LEAD - Valor anterior/siguiente

# COMMAND ----------

window_fecha = Window.partitionBy("categoria", "pais").orderBy("fecha")

df_lag_lead = df_ventas.withColumn("venta_dia_anterior", lag("monto", 1).over(window_fecha)) \
                       .withColumn("venta_dia_siguiente", lead("monto", 1).over(window_fecha)) \
                       .withColumn("diferencia_vs_ayer", col("monto") - col("venta_dia_anterior"))

display(df_lag_lead)

# COMMAND ----------

# MAGIC %md
# MAGIC ### Running Total (Acumulado)

# COMMAND ----------

window_acum = Window.partitionBy("categoria").orderBy("fecha").rowsBetween(Window.unboundedPreceding, 0)

df_acumulado = df_ventas.withColumn("ventas_acumuladas", sum("monto").over(window_acum))
display(df_acumulado)

# COMMAND ----------

# MAGIC %md
# MAGIC ### Moving Average (Promedio Móvil)

# COMMAND ----------

# Promedio de los últimos 3 días
window_3dias = Window.partitionBy("categoria", "pais").orderBy("fecha").rowsBetween(-2, 0)

df_moving_avg = df_ventas.withColumn("promedio_3dias", avg("monto").over(window_3dias))
display(df_moving_avg)

# COMMAND ----------

# MAGIC %md
# MAGIC ## 2. User Defined Functions (UDFs)

# COMMAND ----------

# MAGIC %md
# MAGIC ### UDF Simple

# COMMAND ----------

# Definir UDF
def categorizar_venta(monto):
    if monto >= 2000:
        return "Alta"
    elif monto >= 1000:
        return "Media"
    else:
        return "Baja"

# Registrar UDF
categorizar_udf = udf(categorizar_venta, StringType())

# Usar UDF
df_categorizado = df_ventas.withColumn("categoria_venta", categorizar_udf(col("monto")))
display(df_categorizado)

# COMMAND ----------

# MAGIC %md
# MAGIC ### Pandas UDF (Más eficiente)

# COMMAND ----------

import pandas as pd

@pandas_udf(StringType())
def categorizar_pandas_udf(montos: pd.Series) -> pd.Series:
    return montos.apply(lambda x: "Alta" if x >= 2000 else ("Media" if x >= 1000 else "Baja"))

df_pandas_udf = df_ventas.withColumn("categoria_venta", categorizar_pandas_udf(col("monto")))
display(df_pandas_udf)

# COMMAND ----------

# MAGIC %md
# MAGIC ## 3. Higher-Order Functions
# MAGIC 
# MAGIC Funciones que operan sobre arrays.

# COMMAND ----------

# Crear datos con arrays
df_arrays = spark.createDataFrame([
    (1, [100, 200, 300, 400]),
    (2, [50, 150, -20, 80]),
    (3, [1000, 2000, 3000])
], ["id", "numeros"])

display(df_arrays)

# COMMAND ----------

# TRANSFORM - Aplicar función a cada elemento
df_transform = df_arrays.withColumn(
    "numeros_dobles",
    transform("numeros", lambda x: x * 2)
)
display(df_transform)

# COMMAND ----------

# FILTER - Filtrar elementos del array
df_filter = df_arrays.withColumn(
    "solo_positivos",
    filter("numeros", lambda x: x > 0)
)
display(df_filter)

# COMMAND ----------

# AGGREGATE - Reducir array a un valor
df_aggregate = df_arrays.withColumn(
    "suma_total",
    aggregate("numeros", lit(0), lambda acc, x: acc + x)
)
display(df_aggregate)

# COMMAND ----------

# EXISTS - Verificar si existe elemento
df_exists = df_arrays.withColumn(
    "tiene_negativo",
    exists("numeros", lambda x: x < 0)
)
display(df_exists)

# COMMAND ----------

# MAGIC %md
# MAGIC ## 4. Optimización y Performance

# COMMAND ----------

# MAGIC %md
# MAGIC ### Broadcast Join

# COMMAND ----------

# Tabla pequeña (dimensión)
paises = spark.createDataFrame([
    ("Argentina", "ARS", "América del Sur"),
    ("Brasil", "BRL", "América del Sur"),
    ("México", "MXN", "América del Norte")
], ["pais", "moneda", "region"])

# Broadcast la tabla pequeña para join eficiente
from pyspark.sql.functions import broadcast

df_joined = df_ventas.join(broadcast(paises), "pais")
display(df_joined)

# COMMAND ----------

# MAGIC %md
# MAGIC ### Repartition vs Coalesce

# COMMAND ----------

# Ver particiones actuales
print(f"Particiones actuales: {df_ventas.rdd.getNumPartitions()}")

# REPARTITION: Aumenta o disminuye particiones (shuffle completo)
df_repartitioned = df_ventas.repartition(4)
print(f"Después de repartition(4): {df_repartitioned.rdd.getNumPartitions()}")

# COALESCE: Solo disminuye particiones (sin shuffle completo)
df_coalesced = df_ventas.coalesce(1)
print(f"Después de coalesce(1): {df_coalesced.rdd.getNumPartitions()}")

# COMMAND ----------

# MAGIC %md
# MAGIC ### Cache y Persist

# COMMAND ----------

from pyspark.storagelevel import StorageLevel

# Cache en memoria
df_ventas.cache()

# Persist con nivel específico
df_ventas.persist(StorageLevel.MEMORY_AND_DISK)

# Ejecutar acción para materializar cache
df_ventas.count()

# Ver si está cacheado
print(f"Está cacheado: {df_ventas.is_cached}")

# Liberar cache
df_ventas.unpersist()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 🎯 Ejercicio Final
# MAGIC 
# MAGIC Usando `df_ventas`:
# MAGIC 1. Calcula el ranking de ventas por país (mayor a menor)
# MAGIC 2. Agrega la venta del día anterior usando LAG
# MAGIC 3. Calcula el % de cambio vs día anterior
# MAGIC 4. Filtra solo los top 3 por país

# COMMAND ----------

# Tu solución aquí:
window_rank = Window.partitionBy("pais").orderBy(col("monto").desc())
window_lag = Window.partitionBy("pais", "categoria").orderBy("fecha")

resultado = (
    df_ventas
    .withColumn("rank", row_number().over(window_rank))
    .withColumn("venta_anterior", lag("monto", 1).over(window_lag))
    .withColumn("pct_cambio", 
                when(col("venta_anterior").isNotNull(), 
                     round((col("monto") - col("venta_anterior")) / col("venta_anterior") * 100, 2))
                .otherwise(None))
    .filter(col("rank") <= 3)
)

display(resultado)

# COMMAND ----------

# MAGIC %md
# MAGIC ## ✅ Checkpoint
# MAGIC 
# MAGIC ¡Completaste PySpark Avanzado! Ahora dominas:
# MAGIC - Window Functions (row_number, rank, lag, lead, running totals)
# MAGIC - UDFs y Pandas UDFs
# MAGIC - Higher-Order Functions (transform, filter, aggregate)
# MAGIC - Técnicas de optimización
# MAGIC 
# MAGIC **Próximo paso:** Notebook 03 - Delta Lake
