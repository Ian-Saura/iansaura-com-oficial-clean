/**
 * PySpark Exercises
 * Big Data processing
 */

import { PythonExercise } from '../types';

export const PYTHON_PYSPARK: PythonExercise[] = [
  {
    id: 'py-sp1',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pyspark',
    tags: ['pyspark', 'dataframe', 'create'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'PySpark: Crear DataFrame',
      en: 'PySpark: Create DataFrame',
      pt: 'PySpark: Criar DataFrame'
    },
    description: {
      es: 'Creá un DataFrame de PySpark a partir de una lista de tuplas.',
      en: 'Create a PySpark DataFrame from a list of tuples.',
      pt: 'Crie um DataFrame PySpark a partir de uma lista de tuplas.'
    },
    theory: {
      es: `**PySpark Session y DataFrames:**

\`\`\`python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("test").getOrCreate()

data = [("Ana", 25), ("Bob", 30)]
columns = ["Nombre", "Edad"]

df = spark.createDataFrame(data, columns)
df.show()
\`\`\``,
      en: `**PySpark Session and DataFrames:**

\`\`\`python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("test").getOrCreate()

data = [("Ana", 25), ("Bob", 30)]
columns = ["Name", "Age"]

df = spark.createDataFrame(data, columns)
df.show()
\`\`\``,
      pt: `**PySpark Session e DataFrames:**

\`\`\`python
from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("test").getOrCreate()

data = [("Ana", 25), ("Bob", 30)]
columns = ["Nome", "Idade"]

df = spark.createDataFrame(data, columns)
df.show()
\`\`\``
    },
    realWorldExample: {
      es: 'Tests unitarios en PySpark, crear data dummy.',
      en: 'Unit tests in PySpark, create dummy data.',
      pt: 'Testes unitários em PySpark, criar dados dummy.'
    },
    hint: {
      es: 'Usá spark.createDataFrame(data, schema)',
      en: 'Use spark.createDataFrame(data, schema)',
      pt: 'Use spark.createDataFrame(data, schema)'
    },
    
    starterCode: {
      es: `from pyspark.sql import SparkSession

# Asumí que 'spark' ya existe en el entorno
# spark = SparkSession.builder.getOrCreate()

data = [(1, "A"), (2, "B")]
schema = ["id", "value"]

# Creá el DF
df = None

# Tu código aquí`,
      en: `from pyspark.sql import SparkSession

# Assume 'spark' already exists in environment
# spark = SparkSession.builder.getOrCreate()

data = [(1, "A"), (2, "B")]
schema = ["id", "value"]

# Create the DF
df = None

# Your code here`,
      pt: `from pyspark.sql import SparkSession

# Assuma que 'spark' já existe no ambiente
# spark = SparkSession.builder.getOrCreate()

data = [(1, "A"), (2, "B")]
schema = ["id", "value"]

# Crie o DF
df = None

# Seu código aqui`
    },
    solution: `df = spark.createDataFrame(data, schema)
df.show()`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-sp2',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pyspark',
    tags: ['pyspark', 'filter', 'select'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'PySpark: Filtro y Select',
      en: 'PySpark: Filter and Select',
      pt: 'PySpark: Filtro e Select'
    },
    description: {
      es: 'Seleccioná la columna "name" filtrando donde "age" > 21.',
      en: 'Select the "name" column filtering where "age" > 21.',
      pt: 'Selecione a coluna "name" filtrando onde "age" > 21.'
    },
    theory: {
      es: `**Transformaciones básicas:**

\`\`\`python
# Filter (o where)
df.filter(df.age > 21)
df.where("age > 21")  # Sintaxis SQL

# Select
df.select("name", "age")
df.select(df.name)
\`\`\``,
      en: `**Basic transformations:**

\`\`\`python
# Filter (or where)
df.filter(df.age > 21)
df.where("age > 21")  # SQL Syntax

# Select
df.select("name", "age")
df.select(df.name)
\`\`\``,
      pt: `**Transformações básicas:**

\`\`\`python
# Filter (ou where)
df.filter(df.age > 21)
df.where("age > 21")  # Sintaxe SQL

# Select
df.select("name", "age")
df.select(df.name)
\`\`\``
    },
    realWorldExample: {
      es: 'Limpiar datos y reducir columnas antes de procesar.',
      en: 'Clean data and reduce columns before processing.',
      pt: 'Limpar dados e reduzir colunas antes de processar.'
    },
    hint: {
      es: 'Encadená .filter() y .select()',
      en: 'Chain .filter() and .select()',
      pt: 'Encadeie .filter() e .select()'
    },
    
    starterCode: {
      es: `# df tiene columnas "name" y "age"

# Filtrá mayores de 21 y seleccioná solo el nombre
result = None

# Tu código aquí`,
      en: `# df has columns "name" and "age"

# Filter older than 21 and select only name
result = None

# Your code here`,
      pt: `# df tem colunas "name" e "age"

# Filtre maiores de 21 e selecione apenas o nome
result = None

# Seu código aqui`
    },
    solution: `result = df.filter(df.age > 21).select("name")`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-sp3',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pyspark',
    tags: ['pyspark', 'groupby', 'agg'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'PySpark: GroupBy y Agg',
      en: 'PySpark: GroupBy and Agg',
      pt: 'PySpark: GroupBy e Agg'
    },
    description: {
      es: 'Calculá el promedio de "salary" por "department".',
      en: 'Calculate average "salary" by "department".',
      pt: 'Calcule a média de "salary" por "department".'
    },
    theory: {
      es: `**Agregaciones en PySpark:**

Se importan funciones de \`pyspark.sql.functions\`.

\`\`\`python
from pyspark.sql.functions import avg, sum, count

df.groupBy("department").agg(
    avg("salary").alias("avg_salary"),
    count("*").alias("count")
)
\`\`\``,
      en: `**Aggregations in PySpark:**

Functions are imported from \`pyspark.sql.functions\`.

\`\`\`python
from pyspark.sql.functions import avg, sum, count

df.groupBy("department").agg(
    avg("salary").alias("avg_salary"),
    count("*").alias("count")
)
\`\`\``,
      pt: `**Agregações em PySpark:**

Funções são importadas de \`pyspark.sql.functions\`.

\`\`\`python
from pyspark.sql.functions import avg, sum, count

df.groupBy("department").agg(
    avg("salary").alias("avg_salary"),
    count("*").alias("count")
)
\`\`\``
    },
    realWorldExample: {
      es: 'Métricas de Big Data, reducción de dimensionalidad.',
      en: 'Big Data metrics, dimensionality reduction.',
      pt: 'Métricas de Big Data, redução de dimensionalidade.'
    },
    hint: {
      es: 'Usá groupBy("department").agg(avg("salary"))',
      en: 'Use groupBy("department").agg(avg("salary"))',
      pt: 'Use groupBy("department").agg(avg("salary"))'
    },
    
    starterCode: {
      es: `from pyspark.sql.functions import avg

# Calculá el promedio por departamento
result = None

# Tu código aquí`,
      en: `from pyspark.sql.functions import avg

# Calculate average by department
result = None

# Your code here`,
      pt: `from pyspark.sql.functions import avg

# Calcule a média por departamento
result = None

# Seu código aqui`
    },
    solution: `result = df.groupBy("department").agg(avg("salary"))`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-sp4',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'pyspark',
    tags: ['pyspark', 'join'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'PySpark: Joins',
      en: 'PySpark: Joins',
      pt: 'PySpark: Joins'
    },
    description: {
      es: 'Hacé un Left Join entre empleados y departamentos.',
      en: 'Perform a Left Join between employees and departments.',
      pt: 'Faça um Left Join entre funcionários e departamentos.'
    },
    theory: {
      es: `**Joins en PySpark:**

\`\`\`python
# Sintaxis
df1.join(df2, on="col_name", how="inner")

# Join condition explícita (cuando columnas se llaman distinto)
df1.join(df2, df1.dept_id == df2.id, "left")
\`\`\`

**Tip:** Cuidado con nombres de columnas duplicados después del join.`,
      en: `**Joins in PySpark:**

\`\`\`python
# Syntax
df1.join(df2, on="col_name", how="inner")

# Explicit join condition (when columns have different names)
df1.join(df2, df1.dept_id == df2.id, "left")
\`\`\`

**Tip:** Be careful with duplicate column names after join.`,
      pt: `**Joins em PySpark:**

\`\`\`python
# Sintaxe
df1.join(df2, on="col_name", how="inner")

# Condição de join explícita (quando colunas têm nomes diferentes)
df1.join(df2, df1.dept_id == df2.id, "left")
\`\`\`

**Dica:** Cuidado com nomes de colunas duplicados após o join.`
    },
    realWorldExample: {
      es: 'Enriquecer datos transaccionales con catálogos.',
      en: 'Enrich transactional data with catalogs.',
      pt: 'Enriquecer dados transacionais com catálogos.'
    },
    hint: {
      es: 'Usá employees.join(departments, "dept_id", "left")',
      en: 'Use employees.join(departments, "dept_id", "left")',
      pt: 'Use employees.join(departments, "dept_id", "left")'
    },
    
    starterCode: {
      es: `# employees y departments son DataFrames
# Unilos por "dept_id" usando left join

result = None
# Tu código aquí`,
      en: `# employees and departments are DataFrames
# Join them by "dept_id" using left join

result = None
# Your code here`,
      pt: `# employees e departments são DataFrames
# Junte-os por "dept_id" usando left join

result = None
# Seu código aqui`
    },
    solution: `result = employees.join(departments, "dept_id", "left")`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-sp5',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'pyspark',
    tags: ['pyspark', 'udf'],
    interviewFrequency: 'medium',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'PySpark: UDFs',
      en: 'PySpark: UDFs',
      pt: 'PySpark: UDFs'
    },
    description: {
      es: 'Definí una User Defined Function (UDF) para convertir texto a mayúsculas.',
      en: 'Define a User Defined Function (UDF) to convert text to uppercase.',
      pt: 'Defina uma User Defined Function (UDF) para converter texto para maiúsculas.'
    },
    theory: {
      es: `**UDFs (User Defined Functions):**

Permiten usar código Python fila por fila (menos performante que funciones nativas).

\`\`\`python
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

def to_upper(s):
    return s.upper()

# Registrar UDF
upper_udf = udf(to_upper, StringType())

# Usar
df.withColumn("upper_name", upper_udf(df.name))
\`\`\``,
      en: `**UDFs (User Defined Functions):**

Allow using Python code row by row (less performant than native functions).

\`\`\`python
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

def to_upper(s):
    return s.upper()

# Register UDF
upper_udf = udf(to_upper, StringType())

# Use
df.withColumn("upper_name", upper_udf(df.name))
\`\`\``,
      pt: `**UDFs (User Defined Functions):**

Permitem usar código Python linha por linha (menos performático que funções nativas).

\`\`\`python
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

def to_upper(s):
    return s.upper()

# Registrar UDF
upper_udf = udf(to_upper, StringType())

# Usar
df.withColumn("upper_name", upper_udf(df.name))
\`\`\``
    },
    realWorldExample: {
      es: 'Lógica de negocio compleja que no existe en Spark SQL.',
      en: 'Complex business logic that does not exist in Spark SQL.',
      pt: 'Lógica de negócios complexa que não existe no Spark SQL.'
    },
    hint: {
      es: 'Importá udf y StringType, definí la función y aplicala',
      en: 'Import udf and StringType, define the function and apply it',
      pt: 'Importe udf e StringType, defina a função e aplique-a'
    },
    
    starterCode: {
      es: `from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

# 1. Definí función Python
def my_func(s):
    pass

# 2. Creá UDF
my_udf = None

# 3. Aplicá al DF
# df = df.withColumn("new_col", my_udf(df.col))`,
      en: `from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

# 1. Define Python function
def my_func(s):
    pass

# 2. Create UDF
my_udf = None

# 3. Apply to DF
# df = df.withColumn("new_col", my_udf(df.col))`,
      pt: `from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

# 1. Defina função Python
def my_func(s):
    pass

# 2. Crie UDF
my_udf = None

# 3. Aplique ao DF
# df = df.withColumn("new_col", my_udf(df.col))`
    },
    solution: `def my_func(s):
    return s.upper()

my_udf = udf(my_func, StringType())
df = df.withColumn("upper_name", my_udf(df.name))`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-sp6',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'pyspark',
    tags: ['pyspark', 'window', 'ranking'],
    interviewFrequency: 'medium',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'PySpark: Window Functions',
      en: 'PySpark: Window Functions',
      pt: 'PySpark: Window Functions'
    },
    description: {
      es: 'Calculá el ranking de salarios por departamento usando Window Functions.',
      en: 'Calculate salary ranking by department using Window Functions.',
      pt: 'Calcule o ranking de salários por departamento usando Window Functions.'
    },
    theory: {
      es: `**Window Functions en PySpark:**

Igual que en SQL (\`OVER PARTITION BY ORDER BY\`).

\`\`\`python
from pyspark.sql.window import Window
from pyspark.sql.functions import rank, col

# Definir ventana
windowSpec = Window.partitionBy("department").orderBy(col("salary").desc())

# Aplicar
df.withColumn("rank", rank().over(windowSpec))
\`\`\``,
      en: `**Window Functions in PySpark:**

Same as in SQL (\`OVER PARTITION BY ORDER BY\`).

\`\`\`python
from pyspark.sql.window import Window
from pyspark.sql.functions import rank, col

# Define window
windowSpec = Window.partitionBy("department").orderBy(col("salary").desc())

# Apply
df.withColumn("rank", rank().over(windowSpec))
\`\`\``,
      pt: `**Window Functions em PySpark:**

Igual que em SQL (\`OVER PARTITION BY ORDER BY\`).

\`\`\`python
from pyspark.sql.window import Window
from pyspark.sql.functions import rank, col

# Definir janela
windowSpec = Window.partitionBy("department").orderBy(col("salary").desc())

# Aplicar
df.withColumn("rank", rank().over(windowSpec))
\`\`\``
    },
    realWorldExample: {
      es: 'Top N por categoría, running totals.',
      en: 'Top N per category, running totals.',
      pt: 'Top N por categoria, running totals.'
    },
    hint: {
      es: 'Definí Window.partitionBy().orderBy() y usá rank().over()',
      en: 'Define Window.partitionBy().orderBy() and use rank().over()',
      pt: 'Defina Window.partitionBy().orderBy() e use rank().over()'
    },
    
    starterCode: {
      es: `from pyspark.sql.window import Window
from pyspark.sql.functions import rank, col

# Definí la ventana y aplicá rank
windowSpec = None
# df = df.withColumn("rank", ...)

# Tu código aquí`,
      en: `from pyspark.sql.window import Window
from pyspark.sql.functions import rank, col

# Define window and apply rank
windowSpec = None
# df = df.withColumn("rank", ...)

# Your code here`,
      pt: `from pyspark.sql.window import Window
from pyspark.sql.functions import rank, col

# Defina a janela e aplique rank
windowSpec = None
# df = df.withColumn("rank", ...)

# Seu código aqui`
    },
    solution: `windowSpec = Window.partitionBy("department").orderBy(col("salary").desc())
df = df.withColumn("rank", rank().over(windowSpec))`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-sp7',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'pyspark',
    tags: ['pyspark', 'parquet', 'write'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'PySpark: Escribir Parquet',
      en: 'PySpark: Write Parquet',
      pt: 'PySpark: Escrever Parquet'
    },
    description: {
      es: 'Escribí el DataFrame en formato Parquet particionado por "date".',
      en: 'Write the DataFrame in Parquet format partitioned by "date".',
      pt: 'Escreva o DataFrame no formato Parquet particionado por "date".'
    },
    theory: {
      es: `**Escribir datos:**

\`\`\`python
# Parquet (columnar, eficiente)
df.write.mode("overwrite").parquet("ruta/archivo.parquet")

# Particionado
df.write.partitionBy("date").parquet("ruta/")

# CSV
df.write.csv("ruta/", header=True)
\`\`\``,
      en: `**Writing data:**

\`\`\`python
# Parquet (columnar, efficient)
df.write.mode("overwrite").parquet("path/file.parquet")

# Partitioned
df.write.partitionBy("date").parquet("path/")

# CSV
df.write.csv("path/", header=True)
\`\`\``,
      pt: `**Escrever dados:**

\`\`\`python
# Parquet (colunar, eficiente)
df.write.mode("overwrite").parquet("caminho/arquivo.parquet")

# Particionado
df.write.partitionBy("date").parquet("caminho/")

# CSV
df.write.csv("caminho/", header=True)
\`\`\``
    },
    realWorldExample: {
      es: 'Guardar resultados en Data Lake (S3/GCS).',
      en: 'Save results to Data Lake (S3/GCS).',
      pt: 'Salvar resultados no Data Lake (S3/GCS).'
    },
    hint: {
      es: 'Usá write.partitionBy("date").parquet(...)',
      en: 'Use write.partitionBy("date").parquet(...)',
      pt: 'Use write.partitionBy("date").parquet(...)'
    },
    
    starterCode: {
      es: `# Guardá el df en "output/data" formato parquet
# particionado por "date"

# Tu código aquí`,
      en: `# Save df to "output/data" parquet format
# partitioned by "date"

# Your code here`,
      pt: `# Salve o df em "output/data" formato parquet
# particionado por "date"

# Seu código aqui`
    },
    solution: `df.write.partitionBy("date").parquet("output/data")`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
];

export default PYTHON_PYSPARK;
