# Databricks notebook source
# MAGIC %md
# MAGIC # 🔶 Proyecto: ETL E-commerce Lakehouse
# MAGIC **Data Engineering Roadmap - Ian Saura Academy**
# MAGIC 
# MAGIC Pipeline completo Bronze → Silver → Gold usando Delta Lake.
# MAGIC 
# MAGIC ## Arquitectura Medallion:
# MAGIC - **Bronze**: Datos raw, tal como llegan
# MAGIC - **Silver**: Datos limpios y transformados
# MAGIC - **Gold**: Datos agregados listos para consumo

# COMMAND ----------

# MAGIC %md
# MAGIC ## Setup

# COMMAND ----------

from pyspark.sql.functions import *
from pyspark.sql.types import *
from delta.tables import DeltaTable

# Paths
BRONZE_PATH = "/tmp/ecommerce/bronze"
SILVER_PATH = "/tmp/ecommerce/silver"
GOLD_PATH = "/tmp/ecommerce/gold"

# COMMAND ----------

# MAGIC %md
# MAGIC ## 1. BRONZE LAYER - Ingesta de datos raw

# COMMAND ----------

# MAGIC %md
# MAGIC ### 1.1 Simular datos de órdenes (como si vinieran de un sistema transaccional)

# COMMAND ----------

# Datos de órdenes raw (simulando JSON de API)
ordenes_raw = [
    {"order_id": "ORD001", "customer_id": "C100", "product_id": "P001", "quantity": 2, "unit_price": 29.99, "order_date": "2024-01-15 10:30:00", "status": "completed", "country": "AR"},
    {"order_id": "ORD002", "customer_id": "C101", "product_id": "P002", "quantity": 1, "unit_price": 999.99, "order_date": "2024-01-15 11:45:00", "status": "completed", "country": "BR"},
    {"order_id": "ORD003", "customer_id": "C100", "product_id": "P003", "quantity": 3, "unit_price": 15.50, "order_date": "2024-01-15 14:20:00", "status": "pending", "country": "AR"},
    {"order_id": "ORD004", "customer_id": "C102", "product_id": "P001", "quantity": 1, "unit_price": 29.99, "order_date": "2024-01-16 09:00:00", "status": "completed", "country": "MX"},
    {"order_id": "ORD005", "customer_id": "C103", "product_id": "P004", "quantity": 2, "unit_price": 149.99, "order_date": "2024-01-16 16:30:00", "status": "cancelled", "country": "BR"},
    {"order_id": "ORD006", "customer_id": "C101", "product_id": "P002", "quantity": 1, "unit_price": 999.99, "order_date": "2024-01-17 08:15:00", "status": "completed", "country": "BR"},
    {"order_id": "ORD007", "customer_id": "C104", "product_id": "P005", "quantity": 5, "unit_price": 9.99, "order_date": "2024-01-17 12:00:00", "status": "completed", "country": "AR"},
    {"order_id": "ORD008", "customer_id": None, "product_id": "P001", "quantity": -1, "unit_price": 29.99, "order_date": "2024-01-17 14:30:00", "status": "error", "country": "CL"},  # Dato malo
    {"order_id": "ORD009", "customer_id": "C100", "product_id": "P003", "quantity": 2, "unit_price": 15.50, "order_date": "2024-01-18 10:00:00", "status": "completed", "country": "AR"},
    {"order_id": "ORD010", "customer_id": "C105", "product_id": "P006", "quantity": 1, "unit_price": 599.99, "order_date": "2024-01-18 15:45:00", "status": "completed", "country": "CO"},
]

# Datos de productos (dimensión)
productos_raw = [
    {"product_id": "P001", "name": "Mouse Inalámbrico", "category": "Electronics", "brand": "TechBrand"},
    {"product_id": "P002", "name": "Laptop Pro 15", "category": "Electronics", "brand": "TechBrand"},
    {"product_id": "P003", "name": "Cable USB-C", "category": "Accessories", "brand": "GenericCo"},
    {"product_id": "P004", "name": "Auriculares Bluetooth", "category": "Electronics", "brand": "SoundMax"},
    {"product_id": "P005", "name": "Funda Celular", "category": "Accessories", "brand": "GenericCo"},
    {"product_id": "P006", "name": "Monitor 27 4K", "category": "Electronics", "brand": "ViewPro"},
]

# Datos de clientes (dimensión)
clientes_raw = [
    {"customer_id": "C100", "name": "Ana García", "email": "ana@email.com", "segment": "Premium", "registration_date": "2023-01-10"},
    {"customer_id": "C101", "name": "Carlos Silva", "email": "carlos@email.com", "segment": "Standard", "registration_date": "2023-03-22"},
    {"customer_id": "C102", "name": "María López", "email": "maria@email.com", "segment": "Premium", "registration_date": "2022-11-05"},
    {"customer_id": "C103", "name": "Juan Santos", "email": "juan@email.com", "segment": "Basic", "registration_date": "2024-01-01"},
    {"customer_id": "C104", "name": "Laura Méndez", "email": "laura@email.com", "segment": "Standard", "registration_date": "2023-08-15"},
    {"customer_id": "C105", "name": "Pedro Rojas", "email": "pedro@email.com", "segment": "Premium", "registration_date": "2022-06-30"},
]

# COMMAND ----------

# Crear DataFrames
df_ordenes_raw = spark.createDataFrame(ordenes_raw)
df_productos_raw = spark.createDataFrame(productos_raw)
df_clientes_raw = spark.createDataFrame(clientes_raw)

# COMMAND ----------

# MAGIC %md
# MAGIC ### 1.2 Guardar en Bronze (con metadata de ingesta)

# COMMAND ----------

# Agregar metadata de ingesta
df_ordenes_bronze = df_ordenes_raw \
    .withColumn("_ingested_at", current_timestamp()) \
    .withColumn("_source", lit("api_orders"))

df_productos_bronze = df_productos_raw \
    .withColumn("_ingested_at", current_timestamp()) \
    .withColumn("_source", lit("catalog_products"))

df_clientes_bronze = df_clientes_raw \
    .withColumn("_ingested_at", current_timestamp()) \
    .withColumn("_source", lit("crm_customers"))

# Guardar en Bronze
df_ordenes_bronze.write.format("delta").mode("overwrite").save(f"{BRONZE_PATH}/orders")
df_productos_bronze.write.format("delta").mode("overwrite").save(f"{BRONZE_PATH}/products")
df_clientes_bronze.write.format("delta").mode("overwrite").save(f"{BRONZE_PATH}/customers")

print("✅ Bronze layer creada")

# COMMAND ----------

# Verificar Bronze
display(spark.read.format("delta").load(f"{BRONZE_PATH}/orders"))

# COMMAND ----------

# MAGIC %md
# MAGIC ## 2. SILVER LAYER - Limpieza y transformación

# COMMAND ----------

# MAGIC %md
# MAGIC ### 2.1 Limpiar órdenes

# COMMAND ----------

# Leer Bronze
df_orders_bronze = spark.read.format("delta").load(f"{BRONZE_PATH}/orders")

# Transformaciones Silver:
# 1. Filtrar datos inválidos
# 2. Parsear fechas
# 3. Calcular total
# 4. Estandarizar

df_orders_silver = df_orders_bronze \
    .filter(col("customer_id").isNotNull()) \
    .filter(col("quantity") > 0) \
    .filter(col("status") != "error") \
    .withColumn("order_date", to_timestamp("order_date")) \
    .withColumn("total_amount", col("quantity") * col("unit_price")) \
    .withColumn("country", upper(col("country"))) \
    .withColumn("_processed_at", current_timestamp()) \
    .drop("_source")

display(df_orders_silver)

# COMMAND ----------

# MAGIC %md
# MAGIC ### 2.2 Limpiar productos y clientes

# COMMAND ----------

# Productos Silver
df_products_silver = spark.read.format("delta").load(f"{BRONZE_PATH}/products") \
    .withColumn("name", initcap(col("name"))) \
    .withColumn("_processed_at", current_timestamp()) \
    .drop("_source")

# Clientes Silver
df_customers_silver = spark.read.format("delta").load(f"{BRONZE_PATH}/customers") \
    .withColumn("registration_date", to_date("registration_date")) \
    .withColumn("email", lower(col("email"))) \
    .withColumn("_processed_at", current_timestamp()) \
    .drop("_source")

# COMMAND ----------

# MAGIC %md
# MAGIC ### 2.3 Guardar Silver

# COMMAND ----------

# Guardar Silver
df_orders_silver.write.format("delta").mode("overwrite").save(f"{SILVER_PATH}/orders")
df_products_silver.write.format("delta").mode("overwrite").save(f"{SILVER_PATH}/products")
df_customers_silver.write.format("delta").mode("overwrite").save(f"{SILVER_PATH}/customers")

print("✅ Silver layer creada")

# COMMAND ----------

# Verificar: ¿cuántos registros perdimos en la limpieza?
bronze_count = spark.read.format("delta").load(f"{BRONZE_PATH}/orders").count()
silver_count = spark.read.format("delta").load(f"{SILVER_PATH}/orders").count()

print(f"Bronze orders: {bronze_count}")
print(f"Silver orders: {silver_count}")
print(f"Registros filtrados: {bronze_count - silver_count}")

# COMMAND ----------

# MAGIC %md
# MAGIC ## 3. GOLD LAYER - Agregaciones para negocio

# COMMAND ----------

# MAGIC %md
# MAGIC ### 3.1 Fact Table: Ventas enriquecidas

# COMMAND ----------

# Leer Silver
orders = spark.read.format("delta").load(f"{SILVER_PATH}/orders")
products = spark.read.format("delta").load(f"{SILVER_PATH}/products")
customers = spark.read.format("delta").load(f"{SILVER_PATH}/customers")

# Crear fact table enriquecida
fact_sales = orders \
    .join(products.select("product_id", "name", "category", "brand"), "product_id", "left") \
    .join(customers.select("customer_id", col("name").alias("customer_name"), "segment"), "customer_id", "left") \
    .withColumnRenamed("name", "product_name") \
    .select(
        "order_id",
        "order_date",
        "customer_id",
        "customer_name",
        "segment",
        "product_id",
        "product_name",
        "category",
        "brand",
        "quantity",
        "unit_price",
        "total_amount",
        "status",
        "country"
    )

fact_sales.write.format("delta").mode("overwrite").save(f"{GOLD_PATH}/fact_sales")

print("✅ Fact table creada")
display(fact_sales)

# COMMAND ----------

# MAGIC %md
# MAGIC ### 3.2 Agregación: Ventas diarias por país

# COMMAND ----------

daily_sales_by_country = orders \
    .filter(col("status") == "completed") \
    .withColumn("date", to_date("order_date")) \
    .groupBy("date", "country") \
    .agg(
        count("order_id").alias("total_orders"),
        sum("total_amount").alias("total_revenue"),
        avg("total_amount").alias("avg_order_value"),
        sum("quantity").alias("total_items")
    ) \
    .orderBy("date", "country")

daily_sales_by_country.write.format("delta").mode("overwrite").save(f"{GOLD_PATH}/daily_sales_by_country")

print("✅ Agregación diaria por país creada")
display(daily_sales_by_country)

# COMMAND ----------

# MAGIC %md
# MAGIC ### 3.3 Agregación: Performance por categoría

# COMMAND ----------

category_performance = fact_sales \
    .filter(col("status") == "completed") \
    .groupBy("category", "brand") \
    .agg(
        count("order_id").alias("total_orders"),
        sum("total_amount").alias("total_revenue"),
        sum("quantity").alias("total_units_sold"),
        countDistinct("customer_id").alias("unique_customers")
    ) \
    .withColumn("revenue_rank", dense_rank().over(Window.orderBy(col("total_revenue").desc())))

category_performance.write.format("delta").mode("overwrite").save(f"{GOLD_PATH}/category_performance")

print("✅ Agregación por categoría creada")
display(category_performance)

# COMMAND ----------

# MAGIC %md
# MAGIC ### 3.4 Agregación: Análisis de clientes

# COMMAND ----------

from pyspark.sql.window import Window

customer_analysis = fact_sales \
    .filter(col("status") == "completed") \
    .groupBy("customer_id", "customer_name", "segment") \
    .agg(
        count("order_id").alias("total_orders"),
        sum("total_amount").alias("lifetime_value"),
        avg("total_amount").alias("avg_order_value"),
        min("order_date").alias("first_order"),
        max("order_date").alias("last_order")
    ) \
    .withColumn("customer_rank", dense_rank().over(Window.orderBy(col("lifetime_value").desc())))

customer_analysis.write.format("delta").mode("overwrite").save(f"{GOLD_PATH}/customer_analysis")

print("✅ Análisis de clientes creado")
display(customer_analysis)

# COMMAND ----------

# MAGIC %md
# MAGIC ## 4. Verificación Final

# COMMAND ----------

# Resumen del pipeline
print("=" * 50)
print("📊 RESUMEN DEL PIPELINE ETL")
print("=" * 50)

layers = [
    ("Bronze - Orders", f"{BRONZE_PATH}/orders"),
    ("Bronze - Products", f"{BRONZE_PATH}/products"),
    ("Bronze - Customers", f"{BRONZE_PATH}/customers"),
    ("Silver - Orders", f"{SILVER_PATH}/orders"),
    ("Silver - Products", f"{SILVER_PATH}/products"),
    ("Silver - Customers", f"{SILVER_PATH}/customers"),
    ("Gold - Fact Sales", f"{GOLD_PATH}/fact_sales"),
    ("Gold - Daily Sales", f"{GOLD_PATH}/daily_sales_by_country"),
    ("Gold - Category Performance", f"{GOLD_PATH}/category_performance"),
    ("Gold - Customer Analysis", f"{GOLD_PATH}/customer_analysis"),
]

for name, path in layers:
    count = spark.read.format("delta").load(path).count()
    print(f"{name}: {count} registros")

# COMMAND ----------

# MAGIC %md
# MAGIC ## Cleanup

# COMMAND ----------

# Limpiar datos de demo
dbutils.fs.rm("/tmp/ecommerce", recurse=True)
print("✅ Cleanup completado")

# COMMAND ----------

# MAGIC %md
# MAGIC ## ✅ Proyecto Completado
# MAGIC 
# MAGIC ¡Felicitaciones! Construiste un pipeline ETL completo con:
# MAGIC 
# MAGIC - **Bronze**: Ingesta raw con metadata
# MAGIC - **Silver**: Limpieza, validación, transformación
# MAGIC - **Gold**: Fact tables y agregaciones para BI
# MAGIC 
# MAGIC Este proyecto es perfecto para tu **portfolio**. Documenta:
# MAGIC - Decisiones de diseño
# MAGIC - Reglas de calidad aplicadas
# MAGIC - Métricas de negocio generadas
# MAGIC 
# MAGIC **Próximo paso:** Notebook 05 - Structured Streaming
