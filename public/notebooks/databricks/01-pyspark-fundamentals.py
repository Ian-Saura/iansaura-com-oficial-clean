# Databricks notebook source
# MAGIC %md
# MAGIC # 🔶 PySpark Fundamentos
# MAGIC **Data Engineering Roadmap - Ian Saura Academy**
# MAGIC 
# MAGIC Este notebook cubre los fundamentos de PySpark en Databricks.
# MAGIC 
# MAGIC ## Contenido:
# MAGIC 1. SparkSession
# MAGIC 2. Crear DataFrames
# MAGIC 3. Operaciones básicas (select, filter, orderBy)
# MAGIC 4. Funciones de agregación
# MAGIC 5. Joins

# COMMAND ----------

# MAGIC %md
# MAGIC ## 1. SparkSession
# MAGIC En Databricks, `spark` ya viene pre-configurado.

# COMMAND ----------

# Ver versión de Spark
print(f"Spark Version: {spark.version}")

# Ver configuración
spark.sparkContext.getConf().getAll()[:5]

# COMMAND ----------

# MAGIC %md
# MAGIC ## 2. Crear DataFrames

# COMMAND ----------

# Crear DataFrame desde lista
data = [
    (1, "Ana García", "Data Engineer", 75000, "2022-01-15"),
    (2, "Carlos López", "Data Analyst", 55000, "2021-06-20"),
    (3, "María Rodríguez", "Data Scientist", 85000, "2020-03-10"),
    (4, "Juan Martínez", "Data Engineer", 72000, "2023-02-28"),
    (5, "Laura Sánchez", "Analytics Engineer", 68000, "2022-09-01")
]

columns = ["id", "nombre", "puesto", "salario", "fecha_ingreso"]

df = spark.createDataFrame(data, columns)

# Mostrar datos
display(df)

# COMMAND ----------

# Ver esquema
df.printSchema()

# COMMAND ----------

# Información básica
print(f"Número de filas: {df.count()}")
print(f"Columnas: {df.columns}")

# COMMAND ----------

# MAGIC %md
# MAGIC ## 3. Operaciones Básicas

# COMMAND ----------

# SELECT - Seleccionar columnas
df.select("nombre", "puesto", "salario").show()

# COMMAND ----------

# FILTER/WHERE - Filtrar filas
from pyspark.sql.functions import col

# Opción 1: usando col()
df.filter(col("salario") > 70000).show()

# Opción 2: usando string
df.where("salario > 70000").show()

# Opción 3: usando df.columna
df.filter(df.salario > 70000).show()

# COMMAND ----------

# Múltiples condiciones
df.filter(
    (col("salario") > 60000) & 
    (col("puesto") == "Data Engineer")
).show()

# COMMAND ----------

# ORDER BY - Ordenar
df.orderBy("salario").show()  # Ascendente
df.orderBy(col("salario").desc()).show()  # Descendente

# COMMAND ----------

# MAGIC %md
# MAGIC ## 4. Funciones de Agregación

# COMMAND ----------

from pyspark.sql.functions import sum, avg, count, min, max, countDistinct

# Agregaciones simples
df.select(
    count("*").alias("total_empleados"),
    avg("salario").alias("salario_promedio"),
    min("salario").alias("salario_minimo"),
    max("salario").alias("salario_maximo"),
    sum("salario").alias("suma_salarios")
).show()

# COMMAND ----------

# GROUP BY - Agrupar
df.groupBy("puesto").agg(
    count("*").alias("cantidad"),
    avg("salario").alias("salario_promedio")
).show()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 5. Joins

# COMMAND ----------

# Crear tabla de departamentos
departamentos = spark.createDataFrame([
    ("Data Engineer", "Engineering", "Buenos Aires"),
    ("Data Analyst", "Analytics", "México"),
    ("Data Scientist", "Data Science", "São Paulo"),
    ("Analytics Engineer", "Analytics", "Bogotá")
], ["puesto", "departamento", "ubicacion"])

display(departamentos)

# COMMAND ----------

# INNER JOIN
df.join(departamentos, "puesto", "inner").show()

# COMMAND ----------

# LEFT JOIN
df.join(departamentos, "puesto", "left").show()

# COMMAND ----------

# MAGIC %md
# MAGIC ## 🎯 Ejercicio Práctico
# MAGIC 
# MAGIC Usando el DataFrame `df`:
# MAGIC 1. Filtra empleados con salario > 65000
# MAGIC 2. Agrupa por puesto
# MAGIC 3. Calcula el salario promedio por puesto
# MAGIC 4. Ordena de mayor a menor salario promedio

# COMMAND ----------

# Tu solución aquí:
resultado = (
    df
    .filter(col("salario") > 65000)
    .groupBy("puesto")
    .agg(avg("salario").alias("salario_promedio"))
    .orderBy(col("salario_promedio").desc())
)

display(resultado)

# COMMAND ----------

# MAGIC %md
# MAGIC ## ✅ Checkpoint
# MAGIC 
# MAGIC Si pudiste ejecutar todo el notebook sin errores, ¡completaste los fundamentos de PySpark!
# MAGIC 
# MAGIC **Próximo paso:** Notebook 02 - PySpark Avanzado (Window Functions, UDFs)
