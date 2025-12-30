import { DatabricksExercise } from '../types';

/**
 * Ejercicios de Delta Lake para Databricks
 * 10 ejercicios prácticos de nivel intermedio a avanzado
 */
export const DATABRICKS_EXERCISES_DELTA_LAKE: DatabricksExercise[] = [
  {
    id: 'db-delta-1',
    name: {
      es: 'Crear tabla Delta desde DataFrame',
      en: 'Create Delta table from DataFrame',
      pt: 'Criar tabela Delta a partir de DataFrame'
    },
    description: {
      es: 'Crea una tabla Delta Lake a partir de un DataFrame de empleados.',
      en: 'Create a Delta Lake table from an employees DataFrame.',
      pt: 'Crie uma tabela Delta Lake a partir de um DataFrame de funcionários.'
    },
    code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

data = [
    (1, "Alice", "Engineering", 80000),
    (2, "Bob", "Marketing", 70000),
    (3, "Charlie", "Sales", 65000)
]
df = spark.createDataFrame(data, ["id", "nombre", "departamento", "salario"])

# Guarda como tabla Delta en /tmp/delta/empleados
df.write.___

# Lee la tabla Delta
df_delta = spark.read.format("delta").load("/tmp/delta/empleados")
df_delta.show()`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

data = [
    (1, "Alice", "Engineering", 80000),
    (2, "Bob", "Marketing", 70000),
    (3, "Charlie", "Sales", 65000)
]
df = spark.createDataFrame(data, ["id", "nombre", "departamento", "salario"])

df.write.format("delta").mode("overwrite").save("/tmp/delta/empleados")

df_delta = spark.read.format("delta").load("/tmp/delta/empleados")
df_delta.show()`,
    testCases: [
      'df_delta.count() == 3',
      '"nombre" in df_delta.columns'
    ],
    difficulty: 'easy',
    category: {
      es: 'Delta Lake Básico',
      en: 'Basic Delta Lake',
      pt: 'Delta Lake Básico'
    },
    tags: ['delta', 'write', 'create table']
  },
  {
    id: 'db-delta-2',
    name: {
      es: 'MERGE INTO - Upsert',
      en: 'MERGE INTO - Upsert',
      pt: 'MERGE INTO - Upsert'
    },
    description: {
      es: 'Realiza un upsert usando MERGE INTO para actualizar o insertar registros.',
      en: 'Perform an upsert using MERGE INTO to update or insert records.',
      pt: 'Realize um upsert usando MERGE INTO para atualizar ou inserir registros.'
    },
    code: `from delta.tables import DeltaTable
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

# Datos existentes
existing = [
    (1, "Alice", 80000),
    (2, "Bob", 70000)
]
df_existing = spark.createDataFrame(existing, ["id", "nombre", "salario"])
df_existing.write.format("delta").mode("overwrite").save("/tmp/delta/merge_test")

# Nuevos datos (Bob actualizado, Charlie nuevo)
updates = [
    (2, "Bob", 85000),     # Actualización
    (3, "Charlie", 65000)  # Nuevo
]
df_updates = spark.createDataFrame(updates, ["id", "nombre", "salario"])

# Realiza MERGE
delta_table = DeltaTable.forPath(spark, "/tmp/delta/merge_test")

delta_table.alias("target").merge(
    df_updates.alias("source"),
    "target.id = source.id"
).whenMatchedUpdate(___).whenNotMatchedInsert(___).execute()

# Verifica resultado
spark.read.format("delta").load("/tmp/delta/merge_test").show()`,
    solution: `from delta.tables import DeltaTable
from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

existing = [
    (1, "Alice", 80000),
    (2, "Bob", 70000)
]
df_existing = spark.createDataFrame(existing, ["id", "nombre", "salario"])
df_existing.write.format("delta").mode("overwrite").save("/tmp/delta/merge_test")

updates = [
    (2, "Bob", 85000),
    (3, "Charlie", 65000)
]
df_updates = spark.createDataFrame(updates, ["id", "nombre", "salario"])

delta_table = DeltaTable.forPath(spark, "/tmp/delta/merge_test")

delta_table.alias("target").merge(
    df_updates.alias("source"),
    "target.id = source.id"
).whenMatchedUpdate(set={"salario": "source.salario"}).whenNotMatchedInsert(values={
    "id": "source.id",
    "nombre": "source.nombre",
    "salario": "source.salario"
}).execute()

result = spark.read.format("delta").load("/tmp/delta/merge_test")
result.show()`,
    testCases: [
      'result.count() == 3',
      'result.filter(col("id") == 2).first()["salario"] == 85000'
    ],
    difficulty: 'hard',
    category: {
      es: 'Delta Lake Avanzado',
      en: 'Advanced Delta Lake',
      pt: 'Delta Lake Avançado'
    },
    tags: ['delta', 'merge', 'upsert']
  },
  {
    id: 'db-delta-3',
    name: {
      es: 'Time Travel - Versiones anteriores',
      en: 'Time Travel - Previous versions',
      pt: 'Time Travel - Versões anteriores'
    },
    description: {
      es: 'Usa Time Travel para leer una versión anterior de una tabla Delta.',
      en: 'Use Time Travel to read a previous version of a Delta table.',
      pt: 'Use Time Travel para ler uma versão anterior de uma tabela Delta.'
    },
    code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

# Versión 0: datos iniciales
v0_data = [(1, "Alice", 80000)]
spark.createDataFrame(v0_data, ["id", "nombre", "salario"]).write.format("delta").mode("overwrite").save("/tmp/delta/time_travel")

# Versión 1: agregar registro
v1_data = [(1, "Alice", 80000), (2, "Bob", 70000)]
spark.createDataFrame(v1_data, ["id", "nombre", "salario"]).write.format("delta").mode("overwrite").save("/tmp/delta/time_travel")

# Lee versión actual
df_actual = spark.read.format("delta").load("/tmp/delta/time_travel")
print(f"Versión actual: {df_actual.count()} registros")

# Lee versión 0 usando Time Travel
df_v0 = spark.read.format("delta").option(___, ___).load("/tmp/delta/time_travel")
print(f"Versión 0: {df_v0.count()} registros")

df_v0.show()`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

v0_data = [(1, "Alice", 80000)]
spark.createDataFrame(v0_data, ["id", "nombre", "salario"]).write.format("delta").mode("overwrite").save("/tmp/delta/time_travel")

v1_data = [(1, "Alice", 80000), (2, "Bob", 70000)]
spark.createDataFrame(v1_data, ["id", "nombre", "salario"]).write.format("delta").mode("overwrite").save("/tmp/delta/time_travel")

df_actual = spark.read.format("delta").load("/tmp/delta/time_travel")
print(f"Versión actual: {df_actual.count()} registros")

df_v0 = spark.read.format("delta").option("versionAsOf", 0).load("/tmp/delta/time_travel")
print(f"Versión 0: {df_v0.count()} registros")

df_v0.show()`,
    testCases: [
      'df_actual.count() == 2',
      'df_v0.count() == 1'
    ],
    difficulty: 'medium',
    category: {
      es: 'Time Travel',
      en: 'Time Travel',
      pt: 'Time Travel'
    },
    tags: ['delta', 'time travel', 'version']
  },
  {
    id: 'db-delta-4',
    name: {
      es: 'OPTIMIZE y Z-ORDER',
      en: 'OPTIMIZE and Z-ORDER',
      pt: 'OPTIMIZE e Z-ORDER'
    },
    description: {
      es: 'Optimiza una tabla Delta usando OPTIMIZE y Z-ORDER para mejorar el rendimiento de queries.',
      en: 'Optimize a Delta table using OPTIMIZE and Z-ORDER to improve query performance.',
      pt: 'Otimize uma tabela Delta usando OPTIMIZE e Z-ORDER para melhorar o desempenho de queries.'
    },
    code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

# Crea tabla con muchos archivos pequeños
for i in range(10):
    df = spark.createDataFrame(
        [(i*10 + j, f"User{i*10+j}", "Dept" + str(j % 3)) for j in range(10)],
        ["id", "nombre", "departamento"]
    )
    df.write.format("delta").mode("append").save("/tmp/delta/optimize_test")

# Verifica archivos antes de optimizar
print("Antes de OPTIMIZE:")

# Ejecuta OPTIMIZE con Z-ORDER en departamento
spark.sql(___)

print("Después de OPTIMIZE")`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

# Crea tabla con muchos archivos pequeños
for i in range(10):
    df = spark.createDataFrame(
        [(i*10 + j, f"User{i*10+j}", "Dept" + str(j % 3)) for j in range(10)],
        ["id", "nombre", "departamento"]
    )
    df.write.format("delta").mode("append").save("/tmp/delta/optimize_test")

print("Antes de OPTIMIZE:")

spark.sql("OPTIMIZE delta.\`/tmp/delta/optimize_test\` ZORDER BY (departamento)")

print("Después de OPTIMIZE")`,
    testCases: [
      'spark.read.format("delta").load("/tmp/delta/optimize_test").count() == 100'
    ],
    difficulty: 'medium',
    category: {
      es: 'Optimización',
      en: 'Optimization',
      pt: 'Otimização'
    },
    tags: ['delta', 'optimize', 'zorder', 'performance']
  },
  {
    id: 'db-delta-5',
    name: {
      es: 'VACUUM - Limpieza de archivos',
      en: 'VACUUM - File cleanup',
      pt: 'VACUUM - Limpeza de arquivos'
    },
    description: {
      es: 'Usa VACUUM para eliminar archivos antiguos que ya no son necesarios.',
      en: 'Use VACUUM to remove old files that are no longer needed.',
      pt: 'Use VACUUM para remover arquivos antigos que não são mais necessários.'
    },
    code: `from pyspark.sql import SparkSession
from delta.tables import DeltaTable

spark = SparkSession.builder.getOrCreate()

# Configura retención mínima (solo para demo, no usar en producción)
spark.conf.set("spark.databricks.delta.retentionDurationCheck.enabled", "false")

# Crea y actualiza tabla varias veces
for i in range(5):
    df = spark.createDataFrame([(i, f"Version{i}")], ["id", "version"])
    df.write.format("delta").mode("overwrite").save("/tmp/delta/vacuum_test")

# Muestra historial
delta_table = DeltaTable.forPath(spark, "/tmp/delta/vacuum_test")
delta_table.history().show()

# Ejecuta VACUUM para eliminar archivos > 0 horas
spark.sql(___)

print("VACUUM ejecutado - archivos antiguos eliminados")`,
    solution: `from pyspark.sql import SparkSession
from delta.tables import DeltaTable

spark = SparkSession.builder.getOrCreate()

spark.conf.set("spark.databricks.delta.retentionDurationCheck.enabled", "false")

for i in range(5):
    df = spark.createDataFrame([(i, f"Version{i}")], ["id", "version"])
    df.write.format("delta").mode("overwrite").save("/tmp/delta/vacuum_test")

delta_table = DeltaTable.forPath(spark, "/tmp/delta/vacuum_test")
delta_table.history().show()

spark.sql("VACUUM delta.\`/tmp/delta/vacuum_test\` RETAIN 0 HOURS")

print("VACUUM ejecutado - archivos antiguos eliminados")`,
    testCases: [
      'spark.read.format("delta").load("/tmp/delta/vacuum_test").count() == 1'
    ],
    difficulty: 'medium',
    category: {
      es: 'Mantenimiento',
      en: 'Maintenance',
      pt: 'Manutenção'
    },
    tags: ['delta', 'vacuum', 'cleanup', 'maintenance']
  },
  {
    id: 'db-delta-6',
    name: {
      es: 'Schema Evolution - Agregar columnas',
      en: 'Schema Evolution - Add columns',
      pt: 'Schema Evolution - Adicionar colunas'
    },
    description: {
      es: 'Usa mergeSchema para agregar nuevas columnas a una tabla Delta existente.',
      en: 'Use mergeSchema to add new columns to an existing Delta table.',
      pt: 'Use mergeSchema para adicionar novas colunas a uma tabela Delta existente.'
    },
    code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

# Tabla inicial con 2 columnas
initial_data = [(1, "Alice"), (2, "Bob")]
df_initial = spark.createDataFrame(initial_data, ["id", "nombre"])
df_initial.write.format("delta").mode("overwrite").save("/tmp/delta/schema_evolution")

# Nuevos datos con columna adicional
new_data = [(3, "Charlie", "Engineering")]
df_new = spark.createDataFrame(new_data, ["id", "nombre", "departamento"])

# Escribe con schema evolution habilitado
df_new.write.format("delta").mode("append").option(___, ___).save("/tmp/delta/schema_evolution")

# Verifica el nuevo schema
df_result = spark.read.format("delta").load("/tmp/delta/schema_evolution")
df_result.printSchema()
df_result.show()`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

initial_data = [(1, "Alice"), (2, "Bob")]
df_initial = spark.createDataFrame(initial_data, ["id", "nombre"])
df_initial.write.format("delta").mode("overwrite").save("/tmp/delta/schema_evolution")

new_data = [(3, "Charlie", "Engineering")]
df_new = spark.createDataFrame(new_data, ["id", "nombre", "departamento"])

df_new.write.format("delta").mode("append").option("mergeSchema", "true").save("/tmp/delta/schema_evolution")

df_result = spark.read.format("delta").load("/tmp/delta/schema_evolution")
df_result.printSchema()
df_result.show()`,
    testCases: [
      '"departamento" in df_result.columns',
      'df_result.count() == 3'
    ],
    difficulty: 'medium',
    category: {
      es: 'Schema Evolution',
      en: 'Schema Evolution',
      pt: 'Schema Evolution'
    },
    tags: ['delta', 'schema', 'evolution', 'merge schema']
  },
  {
    id: 'db-delta-7',
    name: {
      es: 'Particionamiento de tablas Delta',
      en: 'Delta table partitioning',
      pt: 'Particionamento de tabelas Delta'
    },
    description: {
      es: 'Crea una tabla Delta particionada por fecha para optimizar queries.',
      en: 'Create a partitioned Delta table by date to optimize queries.',
      pt: 'Crie uma tabela Delta particionada por data para otimizar queries.'
    },
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import lit, to_date

spark = SparkSession.builder.getOrCreate()

data = [
    (1, "Alice", "2024-01-15", 100),
    (2, "Bob", "2024-01-15", 200),
    (3, "Charlie", "2024-01-16", 150),
    (4, "Diana", "2024-01-17", 300)
]
df = spark.createDataFrame(data, ["id", "nombre", "fecha", "ventas"])

# Escribe la tabla particionada por fecha
df.write.format("delta").mode("overwrite").partitionBy(___).save("/tmp/delta/partitioned")

# Lee solo la partición del 15 de enero
df_filtered = spark.read.format("delta").load("/tmp/delta/partitioned").filter(___)

df_filtered.show()
print(f"Registros del 15 de enero: {df_filtered.count()}")`,
    solution: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.getOrCreate()

data = [
    (1, "Alice", "2024-01-15", 100),
    (2, "Bob", "2024-01-15", 200),
    (3, "Charlie", "2024-01-16", 150),
    (4, "Diana", "2024-01-17", 300)
]
df = spark.createDataFrame(data, ["id", "nombre", "fecha", "ventas"])

df.write.format("delta").mode("overwrite").partitionBy("fecha").save("/tmp/delta/partitioned")

df_filtered = spark.read.format("delta").load("/tmp/delta/partitioned").filter(col("fecha") == "2024-01-15")

df_filtered.show()
print(f"Registros del 15 de enero: {df_filtered.count()}")`,
    testCases: [
      'df_filtered.count() == 2'
    ],
    difficulty: 'medium',
    category: {
      es: 'Particionamiento',
      en: 'Partitioning',
      pt: 'Particionamento'
    },
    tags: ['delta', 'partition', 'optimization']
  },
  {
    id: 'db-delta-8',
    name: {
      es: 'Constraints y Checks',
      en: 'Constraints and Checks',
      pt: 'Constraints e Checks'
    },
    description: {
      es: 'Agrega constraints (CHECK) a una tabla Delta para validar datos.',
      en: 'Add constraints (CHECK) to a Delta table to validate data.',
      pt: 'Adicione constraints (CHECK) a uma tabela Delta para validar dados.'
    },
    code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

# Crea tabla
data = [(1, "Alice", 80000), (2, "Bob", 70000)]
df = spark.createDataFrame(data, ["id", "nombre", "salario"])
df.write.format("delta").mode("overwrite").saveAsTable("default.empleados_constraint")

# Agrega constraint: salario debe ser positivo
spark.sql(___)

# Intenta insertar dato inválido (esto debería fallar)
try:
    spark.sql("INSERT INTO default.empleados_constraint VALUES (3, 'Charlie', -1000)")
except Exception as e:
    print(f"Error esperado: {e}")

# Insertar dato válido
spark.sql("INSERT INTO default.empleados_constraint VALUES (3, 'Charlie', 65000)")

spark.table("default.empleados_constraint").show()`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

data = [(1, "Alice", 80000), (2, "Bob", 70000)]
df = spark.createDataFrame(data, ["id", "nombre", "salario"])
df.write.format("delta").mode("overwrite").saveAsTable("default.empleados_constraint")

spark.sql("ALTER TABLE default.empleados_constraint ADD CONSTRAINT salario_positivo CHECK (salario > 0)")

try:
    spark.sql("INSERT INTO default.empleados_constraint VALUES (3, 'Charlie', -1000)")
except Exception as e:
    print(f"Error esperado: {e}")

spark.sql("INSERT INTO default.empleados_constraint VALUES (3, 'Charlie', 65000)")

spark.table("default.empleados_constraint").show()`,
    testCases: [
      'spark.table("default.empleados_constraint").count() == 3'
    ],
    difficulty: 'hard',
    category: {
      es: 'Data Quality',
      en: 'Data Quality',
      pt: 'Qualidade de Dados'
    },
    tags: ['delta', 'constraint', 'check', 'data quality']
  },
  {
    id: 'db-delta-9',
    name: {
      es: 'Change Data Feed (CDF)',
      en: 'Change Data Feed (CDF)',
      pt: 'Change Data Feed (CDF)'
    },
    description: {
      es: 'Habilita y usa Change Data Feed para capturar cambios incrementales.',
      en: 'Enable and use Change Data Feed to capture incremental changes.',
      pt: 'Habilite e use Change Data Feed para capturar mudanças incrementais.'
    },
    code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

# Crea tabla con CDF habilitado
spark.sql("""
CREATE TABLE IF NOT EXISTS default.cdf_table (
    id INT,
    nombre STRING,
    salario INT
) USING DELTA
TBLPROPERTIES (___)
""")

# Inserta datos iniciales
spark.sql("INSERT INTO default.cdf_table VALUES (1, 'Alice', 80000)")

# Actualiza un registro
spark.sql("UPDATE default.cdf_table SET salario = 85000 WHERE id = 1")

# Lee los cambios
changes = spark.read.format("delta").option(___, ___).option(___, ___).table("default.cdf_table")

changes.show()`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

spark.sql("""
CREATE TABLE IF NOT EXISTS default.cdf_table (
    id INT,
    nombre STRING,
    salario INT
) USING DELTA
TBLPROPERTIES (delta.enableChangeDataFeed = true)
""")

spark.sql("INSERT INTO default.cdf_table VALUES (1, 'Alice', 80000)")

spark.sql("UPDATE default.cdf_table SET salario = 85000 WHERE id = 1")

changes = spark.read.format("delta").option("readChangeData", "true").option("startingVersion", 0).table("default.cdf_table")

changes.show()`,
    testCases: [
      'changes.count() > 0',
      '"_change_type" in changes.columns'
    ],
    difficulty: 'hard',
    category: {
      es: 'Change Data Feed',
      en: 'Change Data Feed',
      pt: 'Change Data Feed'
    },
    tags: ['delta', 'cdf', 'change data feed', 'incremental']
  },
  {
    id: 'db-delta-10',
    name: {
      es: 'Restore - Recuperar versión anterior',
      en: 'Restore - Recover previous version',
      pt: 'Restore - Recuperar versão anterior'
    },
    description: {
      es: 'Usa RESTORE para volver a una versión anterior de la tabla.',
      en: 'Use RESTORE to revert to a previous version of the table.',
      pt: 'Use RESTORE para voltar a uma versão anterior da tabela.'
    },
    code: `from pyspark.sql import SparkSession
from delta.tables import DeltaTable

spark = SparkSession.builder.getOrCreate()

# Versión 0: datos originales
spark.sql("DROP TABLE IF EXISTS default.restore_demo")
df0 = spark.createDataFrame([(1, "Alice"), (2, "Bob")], ["id", "nombre"])
df0.write.format("delta").saveAsTable("default.restore_demo")

# Versión 1: agregar Charlie
spark.sql("INSERT INTO default.restore_demo VALUES (3, 'Charlie')")

# Versión 2: eliminar Bob (¡error!)
spark.sql("DELETE FROM default.restore_demo WHERE id = 2")

print("Después del DELETE (versión actual):")
spark.table("default.restore_demo").show()

# Restaurar a versión 1 (antes del delete)
spark.sql(___)

print("Después de RESTORE a versión 1:")
spark.table("default.restore_demo").show()`,
    solution: `from pyspark.sql import SparkSession
from delta.tables import DeltaTable

spark = SparkSession.builder.getOrCreate()

spark.sql("DROP TABLE IF EXISTS default.restore_demo")
df0 = spark.createDataFrame([(1, "Alice"), (2, "Bob")], ["id", "nombre"])
df0.write.format("delta").saveAsTable("default.restore_demo")

spark.sql("INSERT INTO default.restore_demo VALUES (3, 'Charlie')")

spark.sql("DELETE FROM default.restore_demo WHERE id = 2")

print("Después del DELETE (versión actual):")
spark.table("default.restore_demo").show()

spark.sql("RESTORE TABLE default.restore_demo TO VERSION AS OF 1")

print("Después de RESTORE a versión 1:")
spark.table("default.restore_demo").show()`,
    testCases: [
      'spark.table("default.restore_demo").count() == 3',
      'spark.table("default.restore_demo").filter(col("id") == 2).count() == 1'
    ],
    difficulty: 'medium',
    category: {
      es: 'Recuperación',
      en: 'Recovery',
      pt: 'Recuperação'
    },
    tags: ['delta', 'restore', 'recovery', 'time travel']
  }
];


