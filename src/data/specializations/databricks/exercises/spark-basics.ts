import { DatabricksExercise } from '../types';

/**
 * Ejercicios de Spark Básico para Databricks
 * 20 ejercicios prácticos de nivel principiante a intermedio
 */
export const DATABRICKS_EXERCISES_SPARK_BASICS: DatabricksExercise[] = [
  // =====================================================
  // EJERCICIOS BÁSICOS DE DATAFRAMES
  // =====================================================
  {
    id: 'db-spark-1',
    name: {
      es: 'Crear un DataFrame desde una lista',
      en: 'Create a DataFrame from a list',
      pt: 'Criar um DataFrame a partir de uma lista'
    },
    description: {
      es: 'Crea un DataFrame de Spark a partir de una lista de tuplas con nombres y edades.',
      en: 'Create a Spark DataFrame from a list of tuples with names and ages.',
      pt: 'Crie um DataFrame do Spark a partir de uma lista de tuplas com nomes e idades.'
    },
    code: `# Crea un DataFrame con columnas "nombre" y "edad"
# con al menos 3 registros

from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Exercise1").getOrCreate()

# Tu código aquí
data = ___
df = ___

df.show()`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("Exercise1").getOrCreate()

data = [("Alice", 25), ("Bob", 30), ("Charlie", 35)]
df = spark.createDataFrame(data, ["nombre", "edad"])

df.show()`,
    testCases: [
      'df.count() >= 3',
      '"nombre" in df.columns',
      '"edad" in df.columns'
    ],
    difficulty: 'easy',
    category: {
      es: 'DataFrames Básicos',
      en: 'Basic DataFrames',
      pt: 'DataFrames Básicos'
    },
    tags: ['spark', 'dataframe', 'createDataFrame']
  },
  {
    id: 'db-spark-2',
    name: {
      es: 'Leer archivo CSV',
      en: 'Read CSV file',
      pt: 'Ler arquivo CSV'
    },
    description: {
      es: 'Lee un archivo CSV con inferencia de esquema y primera fila como encabezado.',
      en: 'Read a CSV file with schema inference and first row as header.',
      pt: 'Leia um arquivo CSV com inferência de esquema e primeira linha como cabeçalho.'
    },
    code: `# Lee el archivo CSV ubicado en "/databricks-datasets/samples/people/people.csv"
# con header=True e inferSchema=True

# Tu código aquí
df = spark.read.___

df.show()
df.printSchema()`,
    solution: `df = spark.read.csv(
    "/databricks-datasets/samples/people/people.csv",
    header=True,
    inferSchema=True
)

df.show()
df.printSchema()`,
    testCases: [
      'df.count() > 0',
      'len(df.columns) > 0'
    ],
    difficulty: 'easy',
    category: {
      es: 'Lectura de Datos',
      en: 'Data Reading',
      pt: 'Leitura de Dados'
    },
    tags: ['spark', 'csv', 'read']
  },
  {
    id: 'db-spark-3',
    name: {
      es: 'Seleccionar columnas específicas',
      en: 'Select specific columns',
      pt: 'Selecionar colunas específicas'
    },
    description: {
      es: 'Selecciona solo las columnas "nombre" y "edad" de un DataFrame.',
      en: 'Select only the "name" and "age" columns from a DataFrame.',
      pt: 'Selecione apenas as colunas "nome" e "idade" de um DataFrame.'
    },
    code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", 25, "NYC", "Engineering"),
    ("Bob", 30, "LA", "Marketing"),
    ("Charlie", 35, "Chicago", "Sales")
]
df = spark.createDataFrame(data, ["nombre", "edad", "ciudad", "departamento"])

# Selecciona solo nombre y edad
df_seleccionado = df.___

df_seleccionado.show()`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", 25, "NYC", "Engineering"),
    ("Bob", 30, "LA", "Marketing"),
    ("Charlie", 35, "Chicago", "Sales")
]
df = spark.createDataFrame(data, ["nombre", "edad", "ciudad", "departamento"])

df_seleccionado = df.select("nombre", "edad")

df_seleccionado.show()`,
    testCases: [
      'len(df_seleccionado.columns) == 2',
      '"nombre" in df_seleccionado.columns',
      '"edad" in df_seleccionado.columns'
    ],
    difficulty: 'easy',
    category: {
      es: 'Transformaciones',
      en: 'Transformations',
      pt: 'Transformações'
    },
    tags: ['spark', 'select', 'columns']
  },
  {
    id: 'db-spark-4',
    name: {
      es: 'Filtrar datos con condición',
      en: 'Filter data with condition',
      pt: 'Filtrar dados com condição'
    },
    description: {
      es: 'Filtra el DataFrame para obtener solo los registros donde la edad sea mayor a 30.',
      en: 'Filter the DataFrame to get only records where age is greater than 30.',
      pt: 'Filtre o DataFrame para obter apenas registros onde a idade é maior que 30.'
    },
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", 25), ("Bob", 30), ("Charlie", 35),
    ("Diana", 28), ("Eve", 45), ("Frank", 32)
]
df = spark.createDataFrame(data, ["nombre", "edad"])

# Filtra: edad > 30
df_filtrado = df.___

df_filtrado.show()`,
    solution: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", 25), ("Bob", 30), ("Charlie", 35),
    ("Diana", 28), ("Eve", 45), ("Frank", 32)
]
df = spark.createDataFrame(data, ["nombre", "edad"])

df_filtrado = df.filter(col("edad") > 30)

df_filtrado.show()`,
    testCases: [
      'df_filtrado.count() == 3',
      'df_filtrado.filter(col("edad") <= 30).count() == 0'
    ],
    difficulty: 'easy',
    category: {
      es: 'Transformaciones',
      en: 'Transformations',
      pt: 'Transformações'
    },
    tags: ['spark', 'filter', 'where']
  },
  {
    id: 'db-spark-5',
    name: {
      es: 'Agregar columna calculada',
      en: 'Add calculated column',
      pt: 'Adicionar coluna calculada'
    },
    description: {
      es: 'Agrega una nueva columna "edad_en_meses" multiplicando la edad por 12.',
      en: 'Add a new column "age_in_months" by multiplying age by 12.',
      pt: 'Adicione uma nova coluna "idade_em_meses" multiplicando a idade por 12.'
    },
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.getOrCreate()

data = [("Alice", 25), ("Bob", 30), ("Charlie", 35)]
df = spark.createDataFrame(data, ["nombre", "edad"])

# Agrega columna edad_en_meses = edad * 12
df_con_meses = df.___

df_con_meses.show()`,
    solution: `from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = SparkSession.builder.getOrCreate()

data = [("Alice", 25), ("Bob", 30), ("Charlie", 35)]
df = spark.createDataFrame(data, ["nombre", "edad"])

df_con_meses = df.withColumn("edad_en_meses", col("edad") * 12)

df_con_meses.show()`,
    testCases: [
      '"edad_en_meses" in df_con_meses.columns',
      'df_con_meses.filter(col("nombre") == "Alice").first()["edad_en_meses"] == 300'
    ],
    difficulty: 'easy',
    category: {
      es: 'Transformaciones',
      en: 'Transformations',
      pt: 'Transformações'
    },
    tags: ['spark', 'withColumn', 'calculated']
  },

  // =====================================================
  // EJERCICIOS INTERMEDIOS
  // =====================================================
  {
    id: 'db-spark-6',
    name: {
      es: 'GroupBy con agregación',
      en: 'GroupBy with aggregation',
      pt: 'GroupBy com agregação'
    },
    description: {
      es: 'Agrupa por departamento y calcula el salario promedio y el conteo de empleados.',
      en: 'Group by department and calculate average salary and employee count.',
      pt: 'Agrupe por departamento e calcule o salário médio e a contagem de funcionários.'
    },
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, count

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", "Engineering", 80000),
    ("Bob", "Engineering", 90000),
    ("Charlie", "Marketing", 70000),
    ("Diana", "Marketing", 75000),
    ("Eve", "Sales", 65000)
]
df = spark.createDataFrame(data, ["nombre", "departamento", "salario"])

# Agrupa por departamento, calcula promedio de salario y conteo
df_grouped = df.groupBy(___).agg(___)

df_grouped.show()`,
    solution: `from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, count

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", "Engineering", 80000),
    ("Bob", "Engineering", 90000),
    ("Charlie", "Marketing", 70000),
    ("Diana", "Marketing", 75000),
    ("Eve", "Sales", 65000)
]
df = spark.createDataFrame(data, ["nombre", "departamento", "salario"])

df_grouped = df.groupBy("departamento").agg(
    avg("salario").alias("salario_promedio"),
    count("*").alias("num_empleados")
)

df_grouped.show()`,
    testCases: [
      'df_grouped.count() == 3',
      '"salario_promedio" in df_grouped.columns',
      '"num_empleados" in df_grouped.columns'
    ],
    difficulty: 'medium',
    category: {
      es: 'Agregaciones',
      en: 'Aggregations',
      pt: 'Agregações'
    },
    tags: ['spark', 'groupBy', 'agg', 'avg', 'count']
  },
  {
    id: 'db-spark-7',
    name: {
      es: 'Join entre DataFrames',
      en: 'Join between DataFrames',
      pt: 'Join entre DataFrames'
    },
    description: {
      es: 'Realiza un INNER JOIN entre empleados y departamentos usando el código de departamento.',
      en: 'Perform an INNER JOIN between employees and departments using department code.',
      pt: 'Realize um INNER JOIN entre funcionários e departamentos usando o código do departamento.'
    },
    code: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

empleados = [
    ("Alice", "D001", 80000),
    ("Bob", "D002", 90000),
    ("Charlie", "D001", 70000)
]
df_empleados = spark.createDataFrame(empleados, ["nombre", "dept_id", "salario"])

departamentos = [
    ("D001", "Engineering"),
    ("D002", "Marketing"),
    ("D003", "Sales")
]
df_departamentos = spark.createDataFrame(departamentos, ["dept_id", "dept_nombre"])

# Realiza INNER JOIN
df_joined = df_empleados.join(___)

df_joined.show()`,
    solution: `from pyspark.sql import SparkSession

spark = SparkSession.builder.getOrCreate()

empleados = [
    ("Alice", "D001", 80000),
    ("Bob", "D002", 90000),
    ("Charlie", "D001", 70000)
]
df_empleados = spark.createDataFrame(empleados, ["nombre", "dept_id", "salario"])

departamentos = [
    ("D001", "Engineering"),
    ("D002", "Marketing"),
    ("D003", "Sales")
]
df_departamentos = spark.createDataFrame(departamentos, ["dept_id", "dept_nombre"])

df_joined = df_empleados.join(df_departamentos, "dept_id", "inner")

df_joined.show()`,
    testCases: [
      'df_joined.count() == 3',
      '"dept_nombre" in df_joined.columns',
      '"nombre" in df_joined.columns'
    ],
    difficulty: 'medium',
    category: {
      es: 'Joins',
      en: 'Joins',
      pt: 'Joins'
    },
    tags: ['spark', 'join', 'inner']
  },
  {
    id: 'db-spark-8',
    name: {
      es: 'Window Function - Ranking',
      en: 'Window Function - Ranking',
      pt: 'Window Function - Ranking'
    },
    description: {
      es: 'Usa ROW_NUMBER para rankear empleados por salario dentro de cada departamento.',
      en: 'Use ROW_NUMBER to rank employees by salary within each department.',
      pt: 'Use ROW_NUMBER para rankear funcionários por salário dentro de cada departamento.'
    },
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import row_number
from pyspark.sql.window import Window

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", "Engineering", 80000),
    ("Bob", "Engineering", 90000),
    ("Charlie", "Engineering", 85000),
    ("Diana", "Marketing", 70000),
    ("Eve", "Marketing", 75000)
]
df = spark.createDataFrame(data, ["nombre", "departamento", "salario"])

# Define window y agrega ranking por salario descendente por departamento
window_spec = Window.partitionBy(___).orderBy(___)
df_ranked = df.withColumn("ranking", ___)

df_ranked.show()`,
    solution: `from pyspark.sql import SparkSession
from pyspark.sql.functions import row_number, desc
from pyspark.sql.window import Window

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", "Engineering", 80000),
    ("Bob", "Engineering", 90000),
    ("Charlie", "Engineering", 85000),
    ("Diana", "Marketing", 70000),
    ("Eve", "Marketing", 75000)
]
df = spark.createDataFrame(data, ["nombre", "departamento", "salario"])

window_spec = Window.partitionBy("departamento").orderBy(desc("salario"))
df_ranked = df.withColumn("ranking", row_number().over(window_spec))

df_ranked.show()`,
    testCases: [
      '"ranking" in df_ranked.columns',
      'df_ranked.filter((col("nombre") == "Bob")).first()["ranking"] == 1'
    ],
    difficulty: 'medium',
    category: {
      es: 'Window Functions',
      en: 'Window Functions',
      pt: 'Window Functions'
    },
    tags: ['spark', 'window', 'row_number', 'ranking']
  },
  {
    id: 'db-spark-9',
    name: {
      es: 'UDF - Función Personalizada',
      en: 'UDF - Custom Function',
      pt: 'UDF - Função Personalizada'
    },
    description: {
      es: 'Crea una UDF que categorice salarios en "Alto", "Medio" o "Bajo".',
      en: 'Create a UDF that categorizes salaries into "High", "Medium", or "Low".',
      pt: 'Crie uma UDF que categorize salários em "Alto", "Médio" ou "Baixo".'
    },
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import udf
from pyspark.sql.types import StringType

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", 120000),
    ("Bob", 60000),
    ("Charlie", 85000)
]
df = spark.createDataFrame(data, ["nombre", "salario"])

# Define UDF: >100000="Alto", 70000-100000="Medio", <70000="Bajo"
def categorizar_salario(salario):
    ___

categorizar_udf = udf(___, StringType())

df_categorizado = df.withColumn("categoria", categorizar_udf(___))

df_categorizado.show()`,
    solution: `from pyspark.sql import SparkSession
from pyspark.sql.functions import udf, col
from pyspark.sql.types import StringType

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", 120000),
    ("Bob", 60000),
    ("Charlie", 85000)
]
df = spark.createDataFrame(data, ["nombre", "salario"])

def categorizar_salario(salario):
    if salario > 100000:
        return "Alto"
    elif salario >= 70000:
        return "Medio"
    else:
        return "Bajo"

categorizar_udf = udf(categorizar_salario, StringType())

df_categorizado = df.withColumn("categoria", categorizar_udf(col("salario")))

df_categorizado.show()`,
    testCases: [
      '"categoria" in df_categorizado.columns',
      'df_categorizado.filter(col("nombre") == "Alice").first()["categoria"] == "Alto"',
      'df_categorizado.filter(col("nombre") == "Bob").first()["categoria"] == "Bajo"'
    ],
    difficulty: 'medium',
    category: {
      es: 'UDFs',
      en: 'UDFs',
      pt: 'UDFs'
    },
    tags: ['spark', 'udf', 'custom function']
  },
  {
    id: 'db-spark-10',
    name: {
      es: 'Manejo de valores nulos',
      en: 'Handling null values',
      pt: 'Tratamento de valores nulos'
    },
    description: {
      es: 'Rellena los valores nulos en la columna salario con el promedio del departamento.',
      en: 'Fill null values in salary column with department average.',
      pt: 'Preencha os valores nulos na coluna salário com a média do departamento.'
    },
    code: `from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, col, when, coalesce
from pyspark.sql.window import Window

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", "Engineering", 80000),
    ("Bob", "Engineering", None),
    ("Charlie", "Marketing", 70000),
    ("Diana", "Marketing", None)
]
df = spark.createDataFrame(data, ["nombre", "departamento", "salario"])

# Calcula promedio por departamento y rellena nulos
window_spec = Window.partitionBy("departamento")
df_filled = df.withColumn(
    "salario_filled",
    ___
)

df_filled.show()`,
    solution: `from pyspark.sql import SparkSession
from pyspark.sql.functions import avg, col, coalesce
from pyspark.sql.window import Window

spark = SparkSession.builder.getOrCreate()

data = [
    ("Alice", "Engineering", 80000),
    ("Bob", "Engineering", None),
    ("Charlie", "Marketing", 70000),
    ("Diana", "Marketing", None)
]
df = spark.createDataFrame(data, ["nombre", "departamento", "salario"])

window_spec = Window.partitionBy("departamento")
df_filled = df.withColumn(
    "salario_filled",
    coalesce(col("salario"), avg("salario").over(window_spec))
)

df_filled.show()`,
    testCases: [
      '"salario_filled" in df_filled.columns',
      'df_filled.filter(col("salario_filled").isNull()).count() == 0'
    ],
    difficulty: 'medium',
    category: {
      es: 'Limpieza de Datos',
      en: 'Data Cleaning',
      pt: 'Limpeza de Dados'
    },
    tags: ['spark', 'null', 'coalesce', 'fillna']
  }
];


