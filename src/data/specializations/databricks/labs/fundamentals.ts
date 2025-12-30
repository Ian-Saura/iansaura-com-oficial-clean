import { DatabricksLab } from './types';

/**
 * Labs de Fundamentos de Databricks
 * Diseñados para Community Edition (GRATIS)
 */
export const DATABRICKS_LABS_FUNDAMENTALS: DatabricksLab[] = [
  // =====================================================
  // LAB 1: Tu primer notebook en Databricks
  // =====================================================
  {
    id: 'db-lab-001',
    title: {
      es: '🚀 Tu Primer Notebook en Databricks',
      en: '🚀 Your First Notebook in Databricks',
      pt: '🚀 Seu Primeiro Notebook no Databricks'
    },
    subtitle: {
      es: 'Aprende a usar Databricks Community Edition',
      en: 'Learn to use Databricks Community Edition',
      pt: 'Aprenda a usar o Databricks Community Edition'
    },
    description: {
      es: 'En este lab aprenderás a crear tu cuenta gratuita en Databricks Community Edition, crear tu primer notebook, ejecutar código Python y SQL, y entender la interfaz del workspace.',
      en: 'In this lab you will learn to create your free Databricks Community Edition account, create your first notebook, run Python and SQL code, and understand the workspace interface.',
      pt: 'Neste lab você aprenderá a criar sua conta gratuita no Databricks Community Edition, criar seu primeiro notebook, executar código Python e SQL, e entender a interface do workspace.'
    },
    difficulty: 'beginner',
    estimatedMinutes: 30,
    relatedPhases: ['db-phase-1'],
    prerequisites: [
      { es: 'Email válido para crear cuenta', en: 'Valid email to create account', pt: 'Email válido para criar conta' },
      { es: 'Conocimientos básicos de Python', en: 'Basic Python knowledge', pt: 'Conhecimentos básicos de Python' }
    ],
    objectives: [
      { es: 'Crear cuenta en Databricks Community Edition', en: 'Create Databricks Community Edition account', pt: 'Criar conta no Databricks Community Edition' },
      { es: 'Navegar el workspace', en: 'Navigate the workspace', pt: 'Navegar pelo workspace' },
      { es: 'Crear y ejecutar un notebook', en: 'Create and run a notebook', pt: 'Criar e executar um notebook' },
      { es: 'Usar celdas Python y SQL', en: 'Use Python and SQL cells', pt: 'Usar células Python e SQL' }
    ],
    steps: [
      {
        id: 'lab001-step1',
        title: { es: 'Crear cuenta gratuita', en: 'Create free account', pt: 'Criar conta gratuita' },
        description: {
          es: 'Ve a community.cloud.databricks.com y crea tu cuenta gratuita. Usa tu email personal (no empresarial) para evitar restricciones.',
          en: 'Go to community.cloud.databricks.com and create your free account. Use your personal email (not corporate) to avoid restrictions.',
          pt: 'Vá para community.cloud.databricks.com e crie sua conta gratuita. Use seu email pessoal (não corporativo) para evitar restrições.'
        },
        tip: { es: '💡 La verificación puede tardar unos minutos', en: '💡 Verification may take a few minutes', pt: '💡 A verificação pode demorar alguns minutos' }
      },
      {
        id: 'lab001-step2',
        title: { es: 'Explorar el Workspace', en: 'Explore the Workspace', pt: 'Explorar o Workspace' },
        description: {
          es: 'Una vez dentro, explora las secciones principales: Workspace (archivos), Repos (Git), Data (tablas), Compute (clusters), y Jobs (automatización).',
          en: 'Once inside, explore the main sections: Workspace (files), Repos (Git), Data (tables), Compute (clusters), and Jobs (automation).',
          pt: 'Uma vez dentro, explore as seções principais: Workspace (arquivos), Repos (Git), Data (tabelas), Compute (clusters) e Jobs (automação).'
        },
        checkpoint: { es: '¿Puedes identificar dónde se crean los notebooks?', en: 'Can you identify where notebooks are created?', pt: 'Você consegue identificar onde os notebooks são criados?' }
      },
      {
        id: 'lab001-step3',
        title: { es: 'Crear tu primer Notebook', en: 'Create your first Notebook', pt: 'Criar seu primeiro Notebook' },
        description: {
          es: 'Click en Workspace > Users > tu_usuario > Create > Notebook. Nómbralo "Mi Primer Notebook" y selecciona Python como lenguaje.',
          en: 'Click on Workspace > Users > your_user > Create > Notebook. Name it "My First Notebook" and select Python as language.',
          pt: 'Clique em Workspace > Users > seu_usuario > Create > Notebook. Nomeie como "Meu Primeiro Notebook" e selecione Python como linguagem.'
        },
        code: `# Este es tu primer código en Databricks
print("¡Hola Databricks! 🎉")

# Verificar versión de Spark
spark.version`,
        codeLanguage: 'python',
        expectedOutput: '¡Hola Databricks! 🎉\n3.x.x',
        tip: { es: '⌨️ Shift+Enter ejecuta la celda', en: '⌨️ Shift+Enter runs the cell', pt: '⌨️ Shift+Enter executa a célula' }
      },
      {
        id: 'lab001-step4',
        title: { es: 'Crear un cluster', en: 'Create a cluster', pt: 'Criar um cluster' },
        description: {
          es: 'Ve a Compute > Create Cluster. En Community Edition se crea automáticamente un cluster básico. Espera a que el estado sea "Running" (verde).',
          en: 'Go to Compute > Create Cluster. In Community Edition a basic cluster is created automatically. Wait for the status to be "Running" (green).',
          pt: 'Vá para Compute > Create Cluster. No Community Edition um cluster básico é criado automaticamente. Espere o status ficar "Running" (verde).'
        },
        warning: { es: '⚠️ El cluster se apaga después de 2 horas de inactividad', en: '⚠️ The cluster shuts down after 2 hours of inactivity', pt: '⚠️ O cluster desliga após 2 horas de inatividade' }
      },
      {
        id: 'lab001-step5',
        title: { es: 'Ejecutar código SQL', en: 'Run SQL code', pt: 'Executar código SQL' },
        description: {
          es: 'Crea una nueva celda con %sql al inicio para ejecutar SQL. Vamos a explorar los datasets de ejemplo de Databricks.',
          en: 'Create a new cell with %sql at the beginning to run SQL. Let\'s explore Databricks sample datasets.',
          pt: 'Crie uma nova célula com %sql no início para executar SQL. Vamos explorar os datasets de exemplo do Databricks.'
        },
        code: `%sql
-- Ver datasets de ejemplo disponibles
SHOW DATABASES;

-- Usar la base de datos samples
USE samples;

-- Ver tablas disponibles
SHOW TABLES;`,
        codeLanguage: 'sql'
      },
      {
        id: 'lab001-step6',
        title: { es: 'Consultar datos de ejemplo', en: 'Query sample data', pt: 'Consultar dados de exemplo' },
        description: {
          es: 'Ejecuta una consulta sobre el dataset NYC Taxi que viene incluido.',
          en: 'Run a query on the NYC Taxi dataset that comes included.',
          pt: 'Execute uma consulta no dataset NYC Taxi que vem incluído.'
        },
        code: `%sql
-- Explorar datos de NYC Taxi
SELECT 
  pickup_datetime,
  dropoff_datetime,
  trip_distance,
  fare_amount
FROM samples.nyctaxi.trips
LIMIT 10;`,
        codeLanguage: 'sql',
        checkpoint: { es: '¿Puedes ver los datos de viajes?', en: 'Can you see the trip data?', pt: 'Você consegue ver os dados de viagens?' }
      }
    ],
    xpReward: 50,
    badge: {
      id: 'badge-db-first-notebook',
      name: { es: 'Primer Notebook', en: 'First Notebook', pt: 'Primeiro Notebook' },
      icon: '📓'
    },
    resources: [
      { title: 'Databricks Community Edition', url: 'https://community.cloud.databricks.com/', type: 'docs' },
      { title: 'Getting Started Guide', url: 'https://docs.databricks.com/getting-started/index.html', type: 'docs' }
    ],
    tags: ['beginner', 'notebook', 'workspace', 'community-edition'],
    services: ['Notebooks', 'Clusters', 'Workspace']
  },

  // =====================================================
  // LAB 2: DataFrames con Spark
  // =====================================================
  {
    id: 'db-lab-002',
    title: {
      es: '📊 Trabajando con DataFrames en Spark',
      en: '📊 Working with DataFrames in Spark',
      pt: '📊 Trabalhando com DataFrames no Spark'
    },
    subtitle: {
      es: 'Operaciones básicas con DataFrames',
      en: 'Basic DataFrame operations',
      pt: 'Operações básicas com DataFrames'
    },
    description: {
      es: 'Aprende a crear, transformar y analizar datos usando Spark DataFrames. Cubriremos select, filter, groupBy, y joins.',
      en: 'Learn to create, transform and analyze data using Spark DataFrames. We\'ll cover select, filter, groupBy, and joins.',
      pt: 'Aprenda a criar, transformar e analisar dados usando Spark DataFrames. Cobriremos select, filter, groupBy e joins.'
    },
    difficulty: 'beginner',
    estimatedMinutes: 45,
    relatedPhases: ['db-phase-3'],
    prerequisites: [
      { es: 'Lab 1 completado', en: 'Lab 1 completed', pt: 'Lab 1 completado' },
      { es: 'Conocimientos básicos de SQL', en: 'Basic SQL knowledge', pt: 'Conhecimentos básicos de SQL' }
    ],
    objectives: [
      { es: 'Crear DataFrames desde diferentes fuentes', en: 'Create DataFrames from different sources', pt: 'Criar DataFrames de diferentes fontes' },
      { es: 'Aplicar transformaciones básicas', en: 'Apply basic transformations', pt: 'Aplicar transformações básicas' },
      { es: 'Realizar agregaciones y joins', en: 'Perform aggregations and joins', pt: 'Realizar agregações e joins' },
      { es: 'Entender lazy evaluation', en: 'Understand lazy evaluation', pt: 'Entender lazy evaluation' }
    ],
    steps: [
      {
        id: 'lab002-step1',
        title: { es: 'Crear DataFrame desde lista', en: 'Create DataFrame from list', pt: 'Criar DataFrame de lista' },
        description: {
          es: 'Crea un DataFrame simple a partir de una lista de tuplas en Python.',
          en: 'Create a simple DataFrame from a list of tuples in Python.',
          pt: 'Crie um DataFrame simples a partir de uma lista de tuplas em Python.'
        },
        code: `# Crear DataFrame desde lista de tuplas
data = [
    ("Alice", "Engineering", 85000),
    ("Bob", "Marketing", 72000),
    ("Charlie", "Engineering", 90000),
    ("Diana", "Sales", 68000),
    ("Eve", "Marketing", 75000)
]

# Definir columnas
columns = ["nombre", "departamento", "salario"]

# Crear DataFrame
df = spark.createDataFrame(data, columns)

# Mostrar datos
df.show()

# Ver schema
df.printSchema()`,
        codeLanguage: 'python',
        expectedOutput: '+-------+-----------+------+\n|nombre |departamento|salario|\n+-------+-----------+------+\n|Alice  |Engineering |85000  |\n...',
        tip: { es: '💡 printSchema() muestra los tipos de datos inferidos', en: '💡 printSchema() shows inferred data types', pt: '💡 printSchema() mostra os tipos de dados inferidos' }
      },
      {
        id: 'lab002-step2',
        title: { es: 'Select y Alias', en: 'Select and Alias', pt: 'Select e Alias' },
        description: {
          es: 'Selecciona columnas específicas y renómbralas usando alias.',
          en: 'Select specific columns and rename them using aliases.',
          pt: 'Selecione colunas específicas e renomeie-as usando alias.'
        },
        code: `from pyspark.sql.functions import col, upper

# Select básico
df.select("nombre", "salario").show()

# Select con alias
df.select(
    col("nombre").alias("employee_name"),
    col("salario").alias("annual_salary"),
    (col("salario") / 12).alias("monthly_salary")
).show()

# Transformación de columna
df.select(
    upper(col("nombre")).alias("nombre_mayusculas"),
    "departamento"
).show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab002-step3',
        title: { es: 'Filter (Where)', en: 'Filter (Where)', pt: 'Filter (Where)' },
        description: {
          es: 'Filtra filas basándote en condiciones.',
          en: 'Filter rows based on conditions.',
          pt: 'Filtre linhas baseado em condições.'
        },
        code: `from pyspark.sql.functions import col

# Filtrar por salario > 75000
df.filter(col("salario") > 75000).show()

# Equivalente con where
df.where("salario > 75000").show()

# Múltiples condiciones
df.filter(
    (col("departamento") == "Engineering") & 
    (col("salario") > 80000)
).show()

# Filtrar con IN
df.filter(col("departamento").isin(["Engineering", "Marketing"])).show()`,
        codeLanguage: 'python',
        checkpoint: { es: '¿Cuántos empleados ganan más de $75,000?', en: 'How many employees earn more than $75,000?', pt: 'Quantos funcionários ganham mais de $75.000?' }
      },
      {
        id: 'lab002-step4',
        title: { es: 'GroupBy y Agregaciones', en: 'GroupBy and Aggregations', pt: 'GroupBy e Agregações' },
        description: {
          es: 'Agrupa datos y calcula estadísticas.',
          en: 'Group data and calculate statistics.',
          pt: 'Agrupe dados e calcule estatísticas.'
        },
        code: `from pyspark.sql.functions import avg, sum, count, max, min

# Promedio de salario por departamento
df.groupBy("departamento").agg(
    avg("salario").alias("salario_promedio"),
    count("*").alias("num_empleados"),
    max("salario").alias("salario_max"),
    min("salario").alias("salario_min")
).show()

# Múltiples agregaciones
df.groupBy("departamento").agg(
    sum("salario").alias("total_salarios"),
    (avg("salario") * 12).alias("gasto_anual_promedio")
).orderBy("total_salarios", ascending=False).show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab002-step5',
        title: { es: 'Joins entre DataFrames', en: 'Joins between DataFrames', pt: 'Joins entre DataFrames' },
        description: {
          es: 'Combina datos de múltiples DataFrames usando joins.',
          en: 'Combine data from multiple DataFrames using joins.',
          pt: 'Combine dados de múltiplos DataFrames usando joins.'
        },
        code: `# Crear DataFrame de departamentos
dept_data = [
    ("Engineering", "Tech"),
    ("Marketing", "Business"),
    ("Sales", "Business"),
    ("HR", "Support")
]
df_dept = spark.createDataFrame(dept_data, ["departamento", "division"])
df_dept.show()

# Inner Join
df.join(df_dept, "departamento", "inner").show()

# Left Join (incluye empleados sin departamento)
df.join(df_dept, "departamento", "left").show()

# Join con condición explícita
df.join(
    df_dept,
    df.departamento == df_dept.departamento,
    "inner"
).select(df.nombre, df.departamento, df_dept.division).show()`,
        codeLanguage: 'python',
        checkpoint: { es: '¿Qué diferencia ves entre inner y left join?', en: 'What difference do you see between inner and left join?', pt: 'Que diferença você vê entre inner e left join?' }
      },
      {
        id: 'lab002-step6',
        title: { es: 'Lazy Evaluation', en: 'Lazy Evaluation', pt: 'Lazy Evaluation' },
        description: {
          es: 'Entiende cómo Spark optimiza las operaciones usando lazy evaluation.',
          en: 'Understand how Spark optimizes operations using lazy evaluation.',
          pt: 'Entenda como o Spark otimiza operações usando lazy evaluation.'
        },
        code: `# Las transformaciones son "lazy" - no se ejecutan hasta una acción
df_transformed = (
    df
    .filter(col("salario") > 70000)
    .select("nombre", "departamento", "salario")
    .withColumn("salario_mensual", col("salario") / 12)
)

# Nada se ejecutó aún! Solo se construyó el plan
print("Plan de ejecución:")
df_transformed.explain()

# Ahora sí se ejecuta (show es una "acción")
df_transformed.show()

# Otras acciones: collect(), count(), take(n), first()
print(f"Total de registros: {df_transformed.count()}")`,
        codeLanguage: 'python',
        tip: { es: '💡 explain() muestra el plan de ejecución optimizado', en: '💡 explain() shows the optimized execution plan', pt: '💡 explain() mostra o plano de execução otimizado' }
      }
    ],
    xpReward: 75,
    badge: {
      id: 'badge-db-dataframes',
      name: { es: 'Maestro de DataFrames', en: 'DataFrame Master', pt: 'Mestre de DataFrames' },
      icon: '📊'
    },
    resources: [
      { title: 'Spark DataFrame API', url: 'https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html', type: 'docs' },
      { title: 'DataFrame Operations', url: 'https://docs.databricks.com/spark/latest/dataframes-datasets/introduction-to-dataframes-python.html', type: 'docs' }
    ],
    tags: ['beginner', 'dataframes', 'spark', 'transformations'],
    services: ['Spark', 'Notebooks']
  },

  // =====================================================
  // LAB 3: SQL en Databricks
  // =====================================================
  {
    id: 'db-lab-003',
    title: {
      es: '🔍 SQL Avanzado en Databricks',
      en: '🔍 Advanced SQL in Databricks',
      pt: '🔍 SQL Avançado no Databricks'
    },
    subtitle: {
      es: 'CTEs, Window Functions y más',
      en: 'CTEs, Window Functions and more',
      pt: 'CTEs, Window Functions e mais'
    },
    description: {
      es: 'Domina SQL avanzado en Databricks: CTEs, Window Functions, y cómo combinar SQL con Python en el mismo notebook.',
      en: 'Master advanced SQL in Databricks: CTEs, Window Functions, and how to combine SQL with Python in the same notebook.',
      pt: 'Domine SQL avançado no Databricks: CTEs, Window Functions e como combinar SQL com Python no mesmo notebook.'
    },
    difficulty: 'beginner',
    estimatedMinutes: 40,
    relatedPhases: ['db-phase-3'],
    prerequisites: [
      { es: 'Lab 2 completado', en: 'Lab 2 completed', pt: 'Lab 2 completado' },
      { es: 'SQL básico (SELECT, WHERE, JOIN)', en: 'Basic SQL (SELECT, WHERE, JOIN)', pt: 'SQL básico (SELECT, WHERE, JOIN)' }
    ],
    objectives: [
      { es: 'Usar CTEs para queries legibles', en: 'Use CTEs for readable queries', pt: 'Usar CTEs para queries legíveis' },
      { es: 'Aplicar Window Functions', en: 'Apply Window Functions', pt: 'Aplicar Window Functions' },
      { es: 'Crear y usar Temp Views', en: 'Create and use Temp Views', pt: 'Criar e usar Temp Views' },
      { es: 'Combinar SQL y Python', en: 'Combine SQL and Python', pt: 'Combinar SQL e Python' }
    ],
    steps: [
      {
        id: 'lab003-step1',
        title: { es: 'Preparar datos de ejemplo', en: 'Prepare sample data', pt: 'Preparar dados de exemplo' },
        description: {
          es: 'Crea una tabla temporal con datos de ventas para practicar.',
          en: 'Create a temp table with sales data to practice.',
          pt: 'Crie uma tabela temporária com dados de vendas para praticar.'
        },
        code: `# Crear datos de ventas
ventas_data = [
    ("2024-01-15", "Alice", "Electronics", 1500),
    ("2024-01-15", "Bob", "Clothing", 300),
    ("2024-01-16", "Alice", "Electronics", 2000),
    ("2024-01-16", "Charlie", "Electronics", 1800),
    ("2024-01-17", "Bob", "Home", 450),
    ("2024-01-17", "Alice", "Clothing", 200),
    ("2024-01-18", "Diana", "Electronics", 3000),
    ("2024-01-18", "Charlie", "Home", 600),
    ("2024-01-19", "Alice", "Electronics", 2500),
    ("2024-01-19", "Bob", "Electronics", 1200)
]

df_ventas = spark.createDataFrame(
    ventas_data, 
    ["fecha", "vendedor", "categoria", "monto"]
)

# Registrar como vista temporal para usar con SQL
df_ventas.createOrReplaceTempView("ventas")

# Verificar
spark.sql("SELECT * FROM ventas").show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab003-step2',
        title: { es: 'CTEs (Common Table Expressions)', en: 'CTEs (Common Table Expressions)', pt: 'CTEs (Common Table Expressions)' },
        description: {
          es: 'Usa CTEs para escribir queries más legibles y mantenibles.',
          en: 'Use CTEs to write more readable and maintainable queries.',
          pt: 'Use CTEs para escrever queries mais legíveis e manuteníveis.'
        },
        code: `%sql
-- CTE para calcular ventas por vendedor y luego filtrar top performers
WITH ventas_por_vendedor AS (
    SELECT 
        vendedor,
        SUM(monto) as total_ventas,
        COUNT(*) as num_transacciones,
        AVG(monto) as ticket_promedio
    FROM ventas
    GROUP BY vendedor
),
ranking AS (
    SELECT 
        *,
        RANK() OVER (ORDER BY total_ventas DESC) as ranking
    FROM ventas_por_vendedor
)
SELECT * FROM ranking
WHERE ranking <= 3;`,
        codeLanguage: 'sql',
        tip: { es: '💡 Los CTEs hacen el código más fácil de leer y debuggear', en: '💡 CTEs make code easier to read and debug', pt: '💡 CTEs tornam o código mais fácil de ler e debugar' }
      },
      {
        id: 'lab003-step3',
        title: { es: 'Window Functions - Ranking', en: 'Window Functions - Ranking', pt: 'Window Functions - Ranking' },
        description: {
          es: 'Usa ROW_NUMBER, RANK y DENSE_RANK para ranking.',
          en: 'Use ROW_NUMBER, RANK and DENSE_RANK for ranking.',
          pt: 'Use ROW_NUMBER, RANK e DENSE_RANK para ranking.'
        },
        code: `%sql
-- Comparar ROW_NUMBER, RANK y DENSE_RANK
SELECT 
    fecha,
    vendedor,
    monto,
    ROW_NUMBER() OVER (ORDER BY monto DESC) as row_num,
    RANK() OVER (ORDER BY monto DESC) as rank,
    DENSE_RANK() OVER (ORDER BY monto DESC) as dense_rank
FROM ventas;

-- Ranking por categoría
SELECT 
    categoria,
    vendedor,
    monto,
    ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY monto DESC) as rank_en_categoria
FROM ventas;`,
        codeLanguage: 'sql',
        checkpoint: { es: '¿Cuál es la diferencia entre RANK y DENSE_RANK?', en: 'What is the difference between RANK and DENSE_RANK?', pt: 'Qual é a diferença entre RANK e DENSE_RANK?' }
      },
      {
        id: 'lab003-step4',
        title: { es: 'Window Functions - LAG/LEAD', en: 'Window Functions - LAG/LEAD', pt: 'Window Functions - LAG/LEAD' },
        description: {
          es: 'Compara valores con filas anteriores/siguientes.',
          en: 'Compare values with previous/next rows.',
          pt: 'Compare valores com linhas anteriores/seguintes.'
        },
        code: `%sql
-- Comparar venta actual con la anterior del mismo vendedor
SELECT 
    fecha,
    vendedor,
    monto,
    LAG(monto, 1, 0) OVER (PARTITION BY vendedor ORDER BY fecha) as venta_anterior,
    monto - LAG(monto, 1, 0) OVER (PARTITION BY vendedor ORDER BY fecha) as diferencia,
    LEAD(monto, 1, 0) OVER (PARTITION BY vendedor ORDER BY fecha) as venta_siguiente
FROM ventas
ORDER BY vendedor, fecha;`,
        codeLanguage: 'sql'
      },
      {
        id: 'lab003-step5',
        title: { es: 'Window Functions - Running Totals', en: 'Window Functions - Running Totals', pt: 'Window Functions - Totais Acumulados' },
        description: {
          es: 'Calcula totales acumulados y promedios móviles.',
          en: 'Calculate running totals and moving averages.',
          pt: 'Calcule totais acumulados e médias móveis.'
        },
        code: `%sql
-- Total acumulado por vendedor
SELECT 
    fecha,
    vendedor,
    monto,
    SUM(monto) OVER (PARTITION BY vendedor ORDER BY fecha) as total_acumulado,
    AVG(monto) OVER (PARTITION BY vendedor ORDER BY fecha) as promedio_hasta_fecha,
    SUM(monto) OVER (PARTITION BY vendedor ORDER BY fecha 
                     ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) as promedio_movil_2
FROM ventas
ORDER BY vendedor, fecha;`,
        codeLanguage: 'sql'
      },
      {
        id: 'lab003-step6',
        title: { es: 'Combinar SQL y Python', en: 'Combine SQL and Python', pt: 'Combinar SQL e Python' },
        description: {
          es: 'Usa spark.sql() para ejecutar SQL desde Python y continuar con DataFrames.',
          en: 'Use spark.sql() to execute SQL from Python and continue with DataFrames.',
          pt: 'Use spark.sql() para executar SQL do Python e continuar com DataFrames.'
        },
        code: `# Ejecutar SQL y obtener DataFrame
df_top_vendedores = spark.sql("""
    SELECT 
        vendedor,
        SUM(monto) as total
    FROM ventas
    GROUP BY vendedor
    ORDER BY total DESC
    LIMIT 3
""")

# Continuar procesando con DataFrame API
from pyspark.sql.functions import col, lit

df_resultado = df_top_vendedores.withColumn(
    "bonus", 
    col("total") * 0.05
).withColumn(
    "status",
    lit("Top Performer")
)

df_resultado.show()

# Guardar resultado como nueva vista
df_resultado.createOrReplaceTempView("top_performers")`,
        codeLanguage: 'python',
        tip: { es: '💡 Puedes alternar entre SQL y Python según te convenga', en: '💡 You can alternate between SQL and Python as convenient', pt: '💡 Você pode alternar entre SQL e Python conforme conveniente' }
      }
    ],
    xpReward: 75,
    badge: {
      id: 'badge-db-sql-advanced',
      name: { es: 'SQL Avanzado', en: 'Advanced SQL', pt: 'SQL Avançado' },
      icon: '🔍'
    },
    resources: [
      { title: 'Window Functions in Spark SQL', url: 'https://spark.apache.org/docs/latest/sql-ref-syntax-qry-select-window.html', type: 'docs' },
      { title: 'Databricks SQL Reference', url: 'https://docs.databricks.com/sql/language-manual/index.html', type: 'docs' }
    ],
    tags: ['beginner', 'sql', 'window-functions', 'cte'],
    services: ['Spark SQL', 'Notebooks']
  }
];

