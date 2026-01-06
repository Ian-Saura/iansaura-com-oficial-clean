/**
 * FASE 3: Spark Básico en Databricks
 * 10 pasos para dominar los fundamentos de Spark
 */

import { DatabricksPhase } from '../types';

export const PHASE_3_SPARK_BASICS: DatabricksPhase = {
  id: 'db-phase-3',
  number: 3,
  title: {
    es: 'Apache Spark Básico',
    en: 'Apache Spark Basics',
    pt: 'Apache Spark Básico'
  },
  subtitle: {
    es: 'El corazón de Databricks',
    en: 'The heart of Databricks',
    pt: 'O coração do Databricks'
  },
  description: {
    es: 'Apache Spark es el motor de procesamiento detrás de Databricks. Dominar Spark te permite procesar terabytes de datos de forma eficiente.',
    en: 'Apache Spark is the processing engine behind Databricks. Mastering Spark allows you to process terabytes of data efficiently.',
    pt: 'Apache Spark é o motor de processamento por trás do Databricks. Dominar Spark permite processar terabytes de dados de forma eficiente.'
  },
  icon: '⚡',
  color: 'orange',
  estimatedDays: '5-7 días',
  steps: [
    {
      id: 'db-3-1',
      title: { es: '¿Qué es Apache Spark?', en: 'What is Apache Spark?', pt: 'O que é Apache Spark?' },
      description: { es: 'Historia, arquitectura y por qué Spark revolucionó el procesamiento de Big Data.', en: 'History, architecture and why Spark revolutionized Big Data processing.', pt: 'História, arquitetura e por que Spark revolucionou o processamento de Big Data.' },
      theory: {
        es: `## Apache Spark: El Motor de Big Data más Poderoso

Apache Spark es una **plataforma de procesamiento de datos distribuido** que ha revolucionado la forma en que las empresas manejan Big Data. Creado por los mismos fundadores de Databricks, Spark se ha convertido en el estándar de la industria para procesar grandes volúmenes de datos.

### Historia y Evolución

**2009 - El Nacimiento:**
Spark fue creado en el AMPLab de UC Berkeley por Matei Zaharia. El objetivo era superar las limitaciones de MapReduce, el framework dominante en ese momento.

**2010 - Open Source:**
El proyecto se libera como código abierto, permitiendo que la comunidad contribuya y lo mejore.

**2013 - Apache Foundation:**
Spark se convierte en proyecto de Apache, ganando credibilidad empresarial.

**2014 - Récord Mundial:**
Spark estableció el récord mundial de ordenamiento de datos, procesando 100TB en 23 minutos (3x más rápido que el récord anterior con Hadoop).

**2023 - Dominancia Total:**
Más del 80% de las empresas Fortune 500 usan Spark. Es el framework #1 en Gartner Magic Quadrant para Data Science y ML.

### ¿Por qué Spark es 100x más Rápido que MapReduce?

El secreto está en el **procesamiento en memoria (in-memory computing)**.

**MapReduce (Hadoop) - El Problema:**
\`\`\`
   PASO 1          PASO 2          PASO 3
┌─────────┐    ┌─────────┐    ┌─────────┐
│  Leer   │ →  │ Escribir│ →  │  Leer   │ →  ...
│  Disco  │    │  Disco  │    │  Disco  │
└─────────┘    └─────────┘    └─────────┘
     ↓              ↓              ↓
   LENTO         LENTO          LENTO
   (I/O)         (I/O)          (I/O)

Cada paso intermedio escribe a disco = MUY LENTO
\`\`\`

**Spark - La Solución:**
\`\`\`
   PASO 1          PASO 2          PASO 3
┌─────────┐    ┌─────────┐    ┌─────────┐
│  Leer   │ →  │ Procesar│ →  │ Procesar│ → Resultado
│  Disco  │    │ MEMORIA │    │ MEMORIA │
└─────────┘    └─────────┘    └─────────┘
     ↓              ↓              ↓
   1 vez       SUPER RÁPIDO   SUPER RÁPIDO
              (RAM es 100x    (Sin I/O de
               más rápida)     disco)

Solo lee del disco 1 vez, todo lo demás en RAM
\`\`\`

### Los 5 Componentes de Spark

1. **Spark Core** - El motor base
   - Gestión de memoria y disco
   - Scheduling de tareas
   - Recuperación ante fallos
   - API de RDDs (Resilient Distributed Datasets)

2. **Spark SQL** - Consultas estructuradas
   - DataFrames y Datasets API
   - Optimizador Catalyst
   - Soporte JDBC/ODBC
   - Compatible con Hive

3. **Spark Streaming** - Datos en tiempo real
   - Micro-batch processing
   - Structured Streaming
   - Integración con Kafka, Kinesis
   - Exactly-once semantics

4. **MLlib** - Machine Learning
   - Algoritmos distribuidos
   - Feature engineering
   - Model selection
   - Pipelines de ML

5. **GraphX** - Procesamiento de grafos
   - Algoritmos de grafos (PageRank, etc.)
   - Graph-parallel computation
   - Integración con GraphFrames

### Arquitectura de Spark en Detalle

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    TU APLICACIÓN SPARK                       │
│  (PySpark, Scala, Java, R, SQL)                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      DRIVER PROGRAM                          │
│  • SparkContext / SparkSession                              │
│  • Planifica tareas (DAG)                                   │
│  • Distribuye código a los workers                          │
│  • Recolecta resultados                                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLUSTER MANAGER                           │
│  (Standalone, YARN, Mesos, Kubernetes)                      │
│  • Asigna recursos (CPU, memoria)                           │
│  • Monitorea workers                                        │
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│   WORKER NODE 1   │ │   WORKER NODE 2   │ │   WORKER NODE N   │
│  ┌─────────────┐  │ │  ┌─────────────┐  │ │  ┌─────────────┐  │
│  │  Executor   │  │ │  │  Executor   │  │ │  │  Executor   │  │
│  │  ┌───────┐  │  │ │  │  ┌───────┐  │  │ │  │  ┌───────┐  │  │
│  │  │ Task  │  │  │ │  │  │ Task  │  │  │ │  │  │ Task  │  │  │
│  │  │ Task  │  │  │ │  │  │ Task  │  │  │ │  │  │ Task  │  │  │
│  │  │ Cache │  │  │ │  │  │ Cache │  │  │ │  │  │ Cache │  │  │
│  │  └───────┘  │  │ │  │  └───────┘  │  │ │  │  └───────┘  │  │
│  └─────────────┘  │ │  └─────────────┘  │ │  └─────────────┘  │
└───────────────────┘ └───────────────────┘ └───────────────────┘
\`\`\`

### Empresas que usan Spark (Casos Reales)

- **Netflix**: Procesa 500 mil millones de eventos por día para recomendaciones
- **Uber**: ETL de 100+ petabytes de datos de viajes
- **Airbnb**: ML para pricing dinámico y detección de fraude
- **Spotify**: Análisis de 100 millones de usuarios activos
- **Pinterest**: Procesamiento de 1000+ billones de pins

### ¿Por qué aprender Spark te hace más empleable?

1. **Salarios más altos**: Data Engineers con Spark ganan 20-30% más
2. **Alta demanda**: 70% de las ofertas de DE requieren Spark
3. **Skill transferible**: Funciona en AWS, Azure, GCP, on-premise
4. **Base para Databricks**: Databricks ES Spark optimizado`,
        en: `## Apache Spark: The Most Powerful Big Data Engine

Apache Spark is a **distributed data processing platform** that has revolutionized how companies handle Big Data. Created by the same founders of Databricks, Spark has become the industry standard for processing large volumes of data.

### History and Evolution

**2009 - The Birth:**
Spark was created at UC Berkeley's AMPLab by Matei Zaharia. The goal was to overcome the limitations of MapReduce, the dominant framework at the time.

**2010 - Open Source:**
The project was released as open source, allowing the community to contribute and improve it.

**2013 - Apache Foundation:**
Spark becomes an Apache project, gaining enterprise credibility.

**2014 - World Record:**
Spark set the world record for data sorting, processing 100TB in 23 minutes (3x faster than the previous Hadoop record).

**2023 - Total Dominance:**
More than 80% of Fortune 500 companies use Spark. It's the #1 framework in Gartner Magic Quadrant for Data Science and ML.

### Why is Spark 100x Faster than MapReduce?

The secret is **in-memory computing**.

**MapReduce (Hadoop) - The Problem:**
\`\`\`
   STEP 1          STEP 2          STEP 3
┌─────────┐    ┌─────────┐    ┌─────────┐
│  Read   │ →  │  Write  │ →  │  Read   │ →  ...
│  Disk   │    │  Disk   │    │  Disk   │
└─────────┘    └─────────┘    └─────────┘
     ↓              ↓              ↓
   SLOW          SLOW           SLOW
   (I/O)         (I/O)          (I/O)

Each intermediate step writes to disk = VERY SLOW
\`\`\`

**Spark - The Solution:**
\`\`\`
   STEP 1          STEP 2          STEP 3
┌─────────┐    ┌─────────┐    ┌─────────┐
│  Read   │ →  │ Process │ →  │ Process │ → Result
│  Disk   │    │ MEMORY  │    │ MEMORY  │
└─────────┘    └─────────┘    └─────────┘
     ↓              ↓              ↓
   1 time      SUPER FAST     SUPER FAST
              (RAM is 100x    (No disk
               faster)         I/O)

Only reads from disk once, everything else in RAM
\`\`\`

### The 5 Components of Spark

1. **Spark Core** - The base engine
2. **Spark SQL** - Structured queries
3. **Spark Streaming** - Real-time data
4. **MLlib** - Machine Learning
5. **GraphX** - Graph processing

### Companies using Spark (Real Cases)

- **Netflix**: Processes 500 billion events per day
- **Uber**: ETL of 100+ petabytes of trip data
- **Airbnb**: ML for dynamic pricing and fraud detection
- **Spotify**: Analysis of 100 million active users`,
        pt: `## Apache Spark: O Motor de Big Data mais Poderoso

Apache Spark é uma **plataforma de processamento de dados distribuído** que revolucionou a forma como as empresas lidam com Big Data.

### História e Evolução

**2009 - O Nascimento:**
Spark foi criado no AMPLab da UC Berkeley por Matei Zaharia.

**2014 - Recorde Mundial:**
Spark estabeleceu o recorde mundial de ordenação de dados, processando 100TB em 23 minutos.

**2023 - Dominância Total:**
Mais de 80% das empresas Fortune 500 usam Spark.

### Por que Spark é 100x mais Rápido que MapReduce?

O segredo está no **processamento em memória**.

### Os 5 Componentes do Spark

1. **Spark Core** - O motor base
2. **Spark SQL** - Consultas estruturadas
3. **Spark Streaming** - Dados em tempo real
4. **MLlib** - Machine Learning
5. **GraphX** - Processamento de grafos`
      },
      practicalTips: [
        { es: '💡 Spark procesa en memoria RAM, que es 100,000x más rápida que el disco duro. Por eso puede ser hasta 100x más rápido que Hadoop.', en: '💡 Spark processes in RAM memory, which is 100,000x faster than hard disk. That\'s why it can be up to 100x faster than Hadoop.', pt: '💡 Spark processa em memória RAM, que é 100.000x mais rápida que o disco. Por isso pode ser até 100x mais rápido que Hadoop.' },
        { es: '💡 En Databricks, Spark ya viene pre-configurado y optimizado. No necesitas instalar nada.', en: '💡 In Databricks, Spark comes pre-configured and optimized. You don\'t need to install anything.', pt: '💡 No Databricks, Spark já vem pré-configurado e otimizado. Não precisa instalar nada.' },
        { es: '💡 El 80% de las empresas Fortune 500 usan Spark. Aprenderlo te abre muchas puertas.', en: '💡 80% of Fortune 500 companies use Spark. Learning it opens many doors.', pt: '💡 80% das empresas Fortune 500 usam Spark. Aprendê-lo abre muitas portas.' }
      ],
      externalLinks: [
        { title: 'Apache Spark Official', url: 'https://spark.apache.org/', type: 'docs' },
        { title: 'Spark: The Definitive Guide (Free Chapter)', url: 'https://pages.databricks.com/rs/094-YMS-629/images/Apache-Spark-The-Definitive-Guide-Excerpts-R1.pdf', type: 'article' },
        { title: 'Databricks Spark Docs', url: 'https://docs.databricks.com/spark/index.html', type: 'docs' }
      ],
      checkpoint: { es: '🤔 Explica con tus palabras: ¿Por qué procesar datos en memoria RAM es más rápido que hacerlo desde disco? ¿Cuál es la diferencia de velocidad aproximada?', en: '🤔 Explain in your own words: Why is processing data in RAM memory faster than from disk? What is the approximate speed difference?', pt: '🤔 Explique com suas palavras: Por que processar dados em memória RAM é mais rápido que do disco? Qual é a diferença de velocidade aproximada?' },
      xpReward: 25,
      estimatedMinutes: 30
    },
    {
      id: 'db-3-2',
      title: { es: 'SparkSession: Tu Punto de Entrada', en: 'SparkSession: Your Entry Point', pt: 'SparkSession: Seu Ponto de Entrada' },
      description: { es: 'SparkSession es el objeto principal para interactuar con Spark.', en: 'SparkSession is the main object to interact with Spark.', pt: 'SparkSession é o objeto principal para interagir com Spark.' },
      theory: {
        es: `## SparkSession

En Databricks, \`spark\` ya viene pre-configurado.

\`\`\`python
# Ya disponible automáticamente
spark  # SparkSession object

# Ver configuración
spark.version
spark.sparkContext.getConf().getAll()

# Crear DataFrame
df = spark.createDataFrame([
    (1, "Ana"),
    (2, "Bob")
], ["id", "nombre"])

# Leer datos
df = spark.read.csv("path/to/file.csv", header=True)
df = spark.read.parquet("path/to/file.parquet")
df = spark.read.json("path/to/file.json")

# Ejecutar SQL
spark.sql("SELECT * FROM mi_tabla")
\`\`\`

### Métodos principales:
- \`spark.read\` - Leer datos
- \`spark.sql()\` - Ejecutar SQL
- \`spark.createDataFrame()\` - Crear DF
- \`spark.table()\` - Acceder a tabla`,
        en: `## SparkSession

In Databricks, \`spark\` is already pre-configured.

\`\`\`python
# Already available automatically
spark  # SparkSession object

# View configuration
spark.version
spark.sparkContext.getConf().getAll()

# Create DataFrame
df = spark.createDataFrame([
    (1, "Ana"),
    (2, "Bob")
], ["id", "name"])

# Read data
df = spark.read.csv("path/to/file.csv", header=True)
df = spark.read.parquet("path/to/file.parquet")
df = spark.read.json("path/to/file.json")

# Execute SQL
spark.sql("SELECT * FROM my_table")
\`\`\`

### Main methods:
- \`spark.read\` - Read data
- \`spark.sql()\` - Execute SQL
- \`spark.createDataFrame()\` - Create DF
- \`spark.table()\` - Access table`,
        pt: `## SparkSession

No Databricks, \`spark\` já vem pré-configurado.

\`\`\`python
# Já disponível automaticamente
spark  # SparkSession object

# Ver configuração
spark.version
spark.sparkContext.getConf().getAll()

# Criar DataFrame
df = spark.createDataFrame([
    (1, "Ana"),
    (2, "Bob")
], ["id", "nome"])

# Ler dados
df = spark.read.csv("path/to/file.csv", header=True)
df = spark.read.parquet("path/to/file.parquet")
df = spark.read.json("path/to/file.json")

# Executar SQL
spark.sql("SELECT * FROM minha_tabela")
\`\`\`

### Métodos principais:
- \`spark.read\` - Ler dados
- \`spark.sql()\` - Executar SQL
- \`spark.createDataFrame()\` - Criar DF
- \`spark.table()\` - Acessar tabela`
      },
      practicalTips: [{ es: '⚡ En Databricks nunca tenés que crear SparkSession manualmente.', en: '⚡ In Databricks you never have to create SparkSession manually.', pt: '⚡ No Databricks você nunca precisa criar SparkSession manualmente.' }],
      externalLinks: [{ title: 'SparkSession API', url: 'https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/spark_session.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Pudiste ejecutar spark.version en tu notebook?', en: '✅ Could you run spark.version in your notebook?', pt: '✅ Você conseguiu executar spark.version no seu notebook?' },
      xpReward: 15,
      estimatedMinutes: 15
    },
    {
      id: 'db-3-3',
      title: { es: 'DataFrames: La Estructura Principal', en: 'DataFrames: The Main Structure', pt: 'DataFrames: A Estrutura Principal' },
      description: { es: 'Los DataFrames son tablas distribuidas. Aprendé a crearlos y manipularlos.', en: 'DataFrames are distributed tables. Learn to create and manipulate them.', pt: 'DataFrames são tabelas distribuídas. Aprenda a criá-los e manipulá-los.' },
      theory: {
        es: `## Spark DataFrames

Un DataFrame es una colección distribuida de datos organizados en columnas.

\`\`\`python
# Crear DataFrame de lista
data = [(1, "Ana", 25), (2, "Bob", 30)]
df = spark.createDataFrame(data, ["id", "nombre", "edad"])

# Ver datos
df.show()           # Tabla de texto
display(df)         # Tabla interactiva (Databricks)

# Ver esquema
df.printSchema()
df.dtypes

# Información básica
df.count()          # Número de filas
df.columns          # Lista de columnas
df.describe()       # Estadísticas

# Seleccionar columnas
df.select("nombre", "edad")
df.select(df.nombre, df.edad)

# Filtrar
df.filter(df.edad > 25)
df.where("edad > 25")

# Ordenar
df.orderBy("edad")
df.orderBy(df.edad.desc())
\`\`\``,
        en: `## Spark DataFrames

A DataFrame is a distributed collection of data organized in columns.

\`\`\`python
# Create DataFrame from list
data = [(1, "Ana", 25), (2, "Bob", 30)]
df = spark.createDataFrame(data, ["id", "name", "age"])

# View data
df.show()           # Text table
display(df)         # Interactive table (Databricks)

# View schema
df.printSchema()
df.dtypes

# Basic info
df.count()          # Number of rows
df.columns          # List of columns
df.describe()       # Statistics

# Select columns
df.select("name", "age")
df.select(df.name, df.age)

# Filter
df.filter(df.age > 25)
df.where("age > 25")

# Sort
df.orderBy("age")
df.orderBy(df.age.desc())
\`\`\``,
        pt: `## Spark DataFrames

Um DataFrame é uma coleção distribuída de dados organizados em colunas.

\`\`\`python
# Criar DataFrame de lista
data = [(1, "Ana", 25), (2, "Bob", 30)]
df = spark.createDataFrame(data, ["id", "nome", "idade"])

# Ver dados
df.show()           # Tabela de texto
display(df)         # Tabela interativa (Databricks)

# Ver esquema
df.printSchema()
df.dtypes

# Informação básica
df.count()          # Número de linhas
df.columns          # Lista de colunas
df.describe()       # Estatísticas

# Selecionar colunas
df.select("nome", "idade")
df.select(df.nome, df.idade)

# Filtrar
df.filter(df.idade > 25)
df.where("idade > 25")

# Ordenar
df.orderBy("idade")
df.orderBy(df.idade.desc())
\`\`\``
      },
      practicalTips: [{ es: '💡 display() es mejor que show() en Databricks - tiene visualizaciones interactivas.', en: '💡 display() is better than show() in Databricks - it has interactive visualizations.', pt: '💡 display() é melhor que show() no Databricks - tem visualizações interativas.' }],
      externalLinks: [{ title: 'DataFrame API', url: 'https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/dataframe.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Creaste un DataFrame y usaste filter y select?', en: '✅ Did you create a DataFrame and use filter and select?', pt: '✅ Você criou um DataFrame e usou filter e select?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-3-4',
      title: { es: 'Transformaciones vs Acciones', en: 'Transformations vs Actions', pt: 'Transformações vs Ações' },
      description: { es: 'Entender la diferencia es clave para escribir código Spark eficiente.', en: 'Understanding the difference is key to writing efficient Spark code.', pt: 'Entender a diferença é chave para escrever código Spark eficiente.' },
      theory: {
        es: `## Lazy Evaluation en Spark

Spark usa "evaluación perezosa": no ejecuta nada hasta que es necesario.

### Transformaciones (Lazy)
No ejecutan inmediatamente, solo crean un plan:
\`\`\`python
# Ninguna de estas ejecuta nada todavía
df2 = df.filter(df.edad > 25)      # Transformación
df3 = df2.select("nombre")          # Transformación
df4 = df3.withColumn("x", lit(1))   # Transformación
\`\`\`

### Acciones (Eager)
Disparan la ejecución del plan:
\`\`\`python
df4.show()      # ACCIÓN - ejecuta todo
df4.count()     # ACCIÓN
df4.collect()   # ACCIÓN
df4.write...    # ACCIÓN
\`\`\`

### ¿Por qué importa?
Spark optimiza todas las transformaciones juntas antes de ejecutar.

\`\`\`
Plan lógico:
filter → select → withColumn

Plan físico optimizado:
(Spark combina operaciones, reordena, etc.)
\`\`\`

### Lista de transformaciones comunes:
select, filter, where, groupBy, orderBy, join, withColumn, drop

### Lista de acciones comunes:
show, count, collect, take, first, write, save`,
        en: `## Lazy Evaluation in Spark

Spark uses "lazy evaluation": it doesn't execute anything until necessary.

### Transformations (Lazy)
Don't execute immediately, just create a plan:
\`\`\`python
# None of these execute anything yet
df2 = df.filter(df.age > 25)        # Transformation
df3 = df2.select("name")            # Transformation
df4 = df3.withColumn("x", lit(1))   # Transformation
\`\`\`

### Actions (Eager)
Trigger execution of the plan:
\`\`\`python
df4.show()      # ACTION - executes everything
df4.count()     # ACTION
df4.collect()   # ACTION
df4.write...    # ACTION
\`\`\`

### Why does it matter?
Spark optimizes all transformations together before executing.

\`\`\`
Logical plan:
filter → select → withColumn

Optimized physical plan:
(Spark combines operations, reorders, etc.)
\`\`\`

### Common transformations:
select, filter, where, groupBy, orderBy, join, withColumn, drop

### Common actions:
show, count, collect, take, first, write, save`,
        pt: `## Lazy Evaluation no Spark

Spark usa "avaliação preguiçosa": não executa nada até ser necessário.

### Transformações (Lazy)
Não executam imediatamente, só criam um plano:
\`\`\`python
# Nenhuma dessas executa nada ainda
df2 = df.filter(df.idade > 25)      # Transformação
df3 = df2.select("nome")            # Transformação
df4 = df3.withColumn("x", lit(1))   # Transformação
\`\`\`

### Ações (Eager)
Disparam a execução do plano:
\`\`\`python
df4.show()      # AÇÃO - executa tudo
df4.count()     # AÇÃO
df4.collect()   # AÇÃO
df4.write...    # AÇÃO
\`\`\`

### Por que importa?
Spark otimiza todas as transformações juntas antes de executar.

\`\`\`
Plano lógico:
filter → select → withColumn

Plano físico otimizado:
(Spark combina operações, reordena, etc.)
\`\`\`

### Transformações comuns:
select, filter, where, groupBy, orderBy, join, withColumn, drop

### Ações comuns:
show, count, collect, take, first, write, save`
      },
      practicalTips: [{ es: '⚠️ collect() trae todos los datos al driver. Puede crashear con datasets grandes!', en: '⚠️ collect() brings all data to driver. Can crash with large datasets!', pt: '⚠️ collect() traz todos os dados para o driver. Pode crashar com datasets grandes!' }],
      externalLinks: [{ title: 'RDD Programming Guide', url: 'https://spark.apache.org/docs/latest/rdd-programming-guide.html', type: 'docs' }],
      checkpoint: { es: '🤔 ¿filter() es una transformación o una acción?', en: '🤔 Is filter() a transformation or an action?', pt: '🤔 filter() é uma transformação ou uma ação?' },
      xpReward: 25,
      estimatedMinutes: 20
    },
    {
      id: 'db-3-5',
      title: { es: 'Funciones de Columna (pyspark.sql.functions)', en: 'Column Functions (pyspark.sql.functions)', pt: 'Funções de Coluna (pyspark.sql.functions)' },
      description: { es: 'Las funciones built-in de Spark para transformar datos.', en: 'Spark built-in functions to transform data.', pt: 'As funções built-in do Spark para transformar dados.' },
      theory: {
        es: `## pyspark.sql.functions

\`\`\`python
from pyspark.sql.functions import *

# Funciones de string
df.select(upper("nombre"), lower("nombre"), trim("nombre"))
df.select(concat("nombre", lit(" "), "apellido"))
df.select(substring("texto", 1, 5))

# Funciones numéricas
df.select(round("precio", 2), floor("precio"), ceil("precio"))
df.select(abs("valor"), sqrt("valor"))

# Funciones de fecha
df.select(current_date(), current_timestamp())
df.select(year("fecha"), month("fecha"), dayofweek("fecha"))
df.select(datediff("fecha_fin", "fecha_inicio"))
df.select(date_add("fecha", 7))

# Funciones de agregación
df.groupBy("categoria").agg(
    sum("ventas"),
    avg("precio"),
    count("*"),
    max("fecha")
)

# Condicionales
df.select(when(col("edad") > 18, "adulto").otherwise("menor"))
df.select(coalesce("valor1", "valor2", lit(0)))

# Crear columnas
df.withColumn("nuevo", col("precio") * 1.21)
df.withColumn("constante", lit(100))
\`\`\``,
        en: `## pyspark.sql.functions

\`\`\`python
from pyspark.sql.functions import *

# String functions
df.select(upper("name"), lower("name"), trim("name"))
df.select(concat("first_name", lit(" "), "last_name"))
df.select(substring("text", 1, 5))

# Numeric functions
df.select(round("price", 2), floor("price"), ceil("price"))
df.select(abs("value"), sqrt("value"))

# Date functions
df.select(current_date(), current_timestamp())
df.select(year("date"), month("date"), dayofweek("date"))
df.select(datediff("end_date", "start_date"))
df.select(date_add("date", 7))

# Aggregation functions
df.groupBy("category").agg(
    sum("sales"),
    avg("price"),
    count("*"),
    max("date")
)

# Conditionals
df.select(when(col("age") > 18, "adult").otherwise("minor"))
df.select(coalesce("value1", "value2", lit(0)))

# Create columns
df.withColumn("new", col("price") * 1.21)
df.withColumn("constant", lit(100))
\`\`\``,
        pt: `## pyspark.sql.functions

\`\`\`python
from pyspark.sql.functions import *

# Funções de string
df.select(upper("nome"), lower("nome"), trim("nome"))
df.select(concat("nome", lit(" "), "sobrenome"))
df.select(substring("texto", 1, 5))

# Funções numéricas
df.select(round("preco", 2), floor("preco"), ceil("preco"))
df.select(abs("valor"), sqrt("valor"))

# Funções de data
df.select(current_date(), current_timestamp())
df.select(year("data"), month("data"), dayofweek("data"))
df.select(datediff("data_fim", "data_inicio"))
df.select(date_add("data", 7))

# Funções de agregação
df.groupBy("categoria").agg(
    sum("vendas"),
    avg("preco"),
    count("*"),
    max("data")
)

# Condicionais
df.select(when(col("idade") > 18, "adulto").otherwise("menor"))
df.select(coalesce("valor1", "valor2", lit(0)))

# Criar colunas
df.withColumn("novo", col("preco") * 1.21)
df.withColumn("constante", lit(100))
\`\`\``
      },
      practicalTips: [{ es: '💡 Siempre importá con "from pyspark.sql.functions import *" para tener todas las funciones disponibles.', en: '💡 Always import with "from pyspark.sql.functions import *" to have all functions available.', pt: '💡 Sempre importe com "from pyspark.sql.functions import *" para ter todas as funções disponíveis.' }],
      externalLinks: [{ title: 'Functions Reference', url: 'https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/functions.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Usaste when/otherwise para crear una columna condicional?', en: '✅ Did you use when/otherwise to create a conditional column?', pt: '✅ Você usou when/otherwise para criar uma coluna condicional?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-3-6',
      title: { es: 'Joins en Spark', en: 'Joins in Spark', pt: 'Joins no Spark' },
      description: { es: 'Combinar DataFrames es esencial. Aprendé todos los tipos de joins.', en: 'Combining DataFrames is essential. Learn all join types.', pt: 'Combinar DataFrames é essencial. Aprenda todos os tipos de joins.' },
      theory: {
        es: `## Joins en Spark

\`\`\`python
# Datos de ejemplo
clientes = spark.createDataFrame([
    (1, "Ana"), (2, "Bob"), (3, "Carlos")
], ["id", "nombre"])

pedidos = spark.createDataFrame([
    (1, 100), (1, 200), (2, 150), (4, 300)
], ["cliente_id", "monto"])

# INNER JOIN (solo matches)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "inner")

# LEFT JOIN (todos los de la izquierda)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "left")

# RIGHT JOIN (todos los de la derecha)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "right")

# FULL OUTER JOIN (todos)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "outer")

# CROSS JOIN (producto cartesiano)
clientes.crossJoin(pedidos)

# LEFT ANTI (los que NO tienen match)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "left_anti")

# LEFT SEMI (los que SÍ tienen match, solo columnas izquierda)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "left_semi")
\`\`\`

### Tips de performance:
- Broadcast join para tablas pequeñas
- Evitar cross joins cuando sea posible`,
        en: `## Joins in Spark

\`\`\`python
# Sample data
customers = spark.createDataFrame([
    (1, "Ana"), (2, "Bob"), (3, "Carlos")
], ["id", "name"])

orders = spark.createDataFrame([
    (1, 100), (1, 200), (2, 150), (4, 300)
], ["customer_id", "amount"])

# INNER JOIN (only matches)
customers.join(orders, customers.id == orders.customer_id, "inner")

# LEFT JOIN (all from left)
customers.join(orders, customers.id == orders.customer_id, "left")

# RIGHT JOIN (all from right)
customers.join(orders, customers.id == orders.customer_id, "right")

# FULL OUTER JOIN (all)
customers.join(orders, customers.id == orders.customer_id, "outer")

# CROSS JOIN (cartesian product)
customers.crossJoin(orders)

# LEFT ANTI (those without match)
customers.join(orders, customers.id == orders.customer_id, "left_anti")

# LEFT SEMI (those with match, only left columns)
customers.join(orders, customers.id == orders.customer_id, "left_semi")
\`\`\`

### Performance tips:
- Broadcast join for small tables
- Avoid cross joins when possible`,
        pt: `## Joins no Spark

\`\`\`python
# Dados de exemplo
clientes = spark.createDataFrame([
    (1, "Ana"), (2, "Bob"), (3, "Carlos")
], ["id", "nome"])

pedidos = spark.createDataFrame([
    (1, 100), (1, 200), (2, 150), (4, 300)
], ["cliente_id", "valor"])

# INNER JOIN (só matches)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "inner")

# LEFT JOIN (todos da esquerda)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "left")

# RIGHT JOIN (todos da direita)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "right")

# FULL OUTER JOIN (todos)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "outer")

# CROSS JOIN (produto cartesiano)
clientes.crossJoin(pedidos)

# LEFT ANTI (os que NÃO têm match)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "left_anti")

# LEFT SEMI (os que SIM têm match, só colunas esquerda)
clientes.join(pedidos, clientes.id == pedidos.cliente_id, "left_semi")
\`\`\`

### Dicas de performance:
- Broadcast join para tabelas pequenas
- Evitar cross joins quando possível`
      },
      practicalTips: [{ es: '⚡ Usá broadcast() para tablas < 10MB: from pyspark.sql.functions import broadcast', en: '⚡ Use broadcast() for tables < 10MB: from pyspark.sql.functions import broadcast', pt: '⚡ Use broadcast() para tabelas < 10MB: from pyspark.sql.functions import broadcast' }],
      externalLinks: [{ title: 'Join Types', url: 'https://spark.apache.org/docs/latest/sql-ref-syntax-qry-select-join.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Probaste left_anti para encontrar clientes sin pedidos?', en: '✅ Did you try left_anti to find customers without orders?', pt: '✅ Você testou left_anti para encontrar clientes sem pedidos?' },
      xpReward: 30,
      estimatedMinutes: 25
    },
    {
      id: 'db-3-7',
      title: { es: 'GroupBy y Agregaciones', en: 'GroupBy and Aggregations', pt: 'GroupBy e Agregações' },
      description: { es: 'Agrupar datos y calcular métricas es fundamental para analytics.', en: 'Grouping data and calculating metrics is fundamental for analytics.', pt: 'Agrupar dados e calcular métricas é fundamental para analytics.' },
      theory: {
        es: `## GroupBy en Spark

\`\`\`python
from pyspark.sql.functions import *

# GroupBy simple
df.groupBy("categoria").count()

# Múltiples agregaciones
df.groupBy("categoria").agg(
    count("*").alias("total"),
    sum("ventas").alias("ventas_totales"),
    avg("precio").alias("precio_promedio"),
    min("fecha").alias("primera_venta"),
    max("fecha").alias("ultima_venta")
)

# GroupBy múltiples columnas
df.groupBy("año", "mes").agg(sum("ventas"))

# Agregación sin grupo (toda la tabla)
df.agg(sum("ventas"), avg("precio"))

# Pivot (transponer)
df.groupBy("año").pivot("mes").sum("ventas")

# Rollup (subtotales jerárquicos)
df.rollup("año", "mes").sum("ventas")

# Cube (todas las combinaciones)
df.cube("año", "mes").sum("ventas")
\`\`\``,
        en: `## GroupBy in Spark

\`\`\`python
from pyspark.sql.functions import *

# Simple GroupBy
df.groupBy("category").count()

# Multiple aggregations
df.groupBy("category").agg(
    count("*").alias("total"),
    sum("sales").alias("total_sales"),
    avg("price").alias("avg_price"),
    min("date").alias("first_sale"),
    max("date").alias("last_sale")
)

# GroupBy multiple columns
df.groupBy("year", "month").agg(sum("sales"))

# Aggregation without group (whole table)
df.agg(sum("sales"), avg("price"))

# Pivot (transpose)
df.groupBy("year").pivot("month").sum("sales")

# Rollup (hierarchical subtotals)
df.rollup("year", "month").sum("sales")

# Cube (all combinations)
df.cube("year", "month").sum("sales")
\`\`\``,
        pt: `## GroupBy no Spark

\`\`\`python
from pyspark.sql.functions import *

# GroupBy simples
df.groupBy("categoria").count()

# Múltiplas agregações
df.groupBy("categoria").agg(
    count("*").alias("total"),
    sum("vendas").alias("vendas_totais"),
    avg("preco").alias("preco_medio"),
    min("data").alias("primeira_venda"),
    max("data").alias("ultima_venda")
)

# GroupBy múltiplas colunas
df.groupBy("ano", "mes").agg(sum("vendas"))

# Agregação sem grupo (toda a tabela)
df.agg(sum("vendas"), avg("preco"))

# Pivot (transpor)
df.groupBy("ano").pivot("mes").sum("vendas")

# Rollup (subtotais hierárquicos)
df.rollup("ano", "mes").sum("vendas")

# Cube (todas as combinações)
df.cube("ano", "mes").sum("vendas")
\`\`\``
      },
      practicalTips: [{ es: '💡 Usá .alias() para dar nombres legibles a las columnas agregadas.', en: '💡 Use .alias() to give readable names to aggregated columns.', pt: '💡 Use .alias() para dar nomes legíveis às colunas agregadas.' }],
      externalLinks: [{ title: 'GroupBy API', url: 'https://spark.apache.org/docs/latest/api/python/reference/pyspark.sql/grouping.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Creaste un reporte con múltiples agregaciones usando agg()?', en: '✅ Did you create a report with multiple aggregations using agg()?', pt: '✅ Você criou um relatório com múltiplas agregações usando agg()?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-3-8',
      title: { es: 'Window Functions en Spark', en: 'Window Functions in Spark', pt: 'Window Functions no Spark' },
      description: { es: 'Las Window Functions son poderosas para cálculos sobre particiones de datos.', en: 'Window Functions are powerful for calculations over data partitions.', pt: 'Window Functions são poderosas para cálculos sobre partições de dados.' },
      theory: {
        es: `## Window Functions

\`\`\`python
from pyspark.sql.window import Window
from pyspark.sql.functions import *

# Definir ventana
ventana = Window.partitionBy("cliente_id").orderBy("fecha")

# ROW_NUMBER
df.withColumn("row_num", row_number().over(ventana))

# RANK y DENSE_RANK
df.withColumn("rank", rank().over(ventana))
df.withColumn("dense_rank", dense_rank().over(ventana))

# LAG y LEAD (valor anterior/siguiente)
df.withColumn("venta_anterior", lag("monto", 1).over(ventana))
df.withColumn("venta_siguiente", lead("monto", 1).over(ventana))

# Agregaciones con ventana
ventana_cliente = Window.partitionBy("cliente_id")
df.withColumn("total_cliente", sum("monto").over(ventana_cliente))
df.withColumn("promedio_cliente", avg("monto").over(ventana_cliente))

# Running totals
df.withColumn("acumulado", sum("monto").over(
    Window.partitionBy("cliente_id")
          .orderBy("fecha")
          .rowsBetween(Window.unboundedPreceding, Window.currentRow)
))
\`\`\``,
        en: `## Window Functions

\`\`\`python
from pyspark.sql.window import Window
from pyspark.sql.functions import *

# Define window
window = Window.partitionBy("customer_id").orderBy("date")

# ROW_NUMBER
df.withColumn("row_num", row_number().over(window))

# RANK and DENSE_RANK
df.withColumn("rank", rank().over(window))
df.withColumn("dense_rank", dense_rank().over(window))

# LAG and LEAD (previous/next value)
df.withColumn("prev_sale", lag("amount", 1).over(window))
df.withColumn("next_sale", lead("amount", 1).over(window))

# Aggregations with window
customer_window = Window.partitionBy("customer_id")
df.withColumn("customer_total", sum("amount").over(customer_window))
df.withColumn("customer_avg", avg("amount").over(customer_window))

# Running totals
df.withColumn("cumulative", sum("amount").over(
    Window.partitionBy("customer_id")
          .orderBy("date")
          .rowsBetween(Window.unboundedPreceding, Window.currentRow)
))
\`\`\``,
        pt: `## Window Functions

\`\`\`python
from pyspark.sql.window import Window
from pyspark.sql.functions import *

# Definir janela
janela = Window.partitionBy("cliente_id").orderBy("data")

# ROW_NUMBER
df.withColumn("row_num", row_number().over(janela))

# RANK e DENSE_RANK
df.withColumn("rank", rank().over(janela))
df.withColumn("dense_rank", dense_rank().over(janela))

# LAG e LEAD (valor anterior/próximo)
df.withColumn("venda_anterior", lag("valor", 1).over(janela))
df.withColumn("venda_proxima", lead("valor", 1).over(janela))

# Agregações com janela
janela_cliente = Window.partitionBy("cliente_id")
df.withColumn("total_cliente", sum("valor").over(janela_cliente))
df.withColumn("media_cliente", avg("valor").over(janela_cliente))

# Running totals
df.withColumn("acumulado", sum("valor").over(
    Window.partitionBy("cliente_id")
          .orderBy("data")
          .rowsBetween(Window.unboundedPreceding, Window.currentRow)
))
\`\`\``
      },
      practicalTips: [{ es: '⭐ Window Functions son preguntas comunes en entrevistas técnicas.', en: '⭐ Window Functions are common interview questions.', pt: '⭐ Window Functions são perguntas comuns em entrevistas técnicas.' }],
      externalLinks: [{ title: 'Window Functions', url: 'https://spark.apache.org/docs/latest/sql-ref-syntax-qry-select-window.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Calculaste un running total usando Window?', en: '✅ Did you calculate a running total using Window?', pt: '✅ Você calculou um running total usando Window?' },
      xpReward: 35,
      estimatedMinutes: 30
    },
    {
      id: 'db-3-9',
      title: { es: 'Leer y Escribir Datos', en: 'Reading and Writing Data', pt: 'Ler e Escrever Dados' },
      description: { es: 'Dominá todos los formatos de entrada/salida de Spark.', en: 'Master all Spark input/output formats.', pt: 'Domine todos os formatos de entrada/saída do Spark.' },
      theory: {
        es: `## I/O en Spark

### Leer datos:
\`\`\`python
# CSV
df = spark.read.csv("path", header=True, inferSchema=True)
df = spark.read.option("header", "true").csv("path")

# Parquet (recomendado)
df = spark.read.parquet("path")

# JSON
df = spark.read.json("path")

# Delta (Databricks)
df = spark.read.format("delta").load("path")

# Tabla
df = spark.table("database.table")
\`\`\`

### Escribir datos:
\`\`\`python
# Modos: overwrite, append, ignore, error
df.write.mode("overwrite").parquet("path")
df.write.mode("append").parquet("path")

# Particionado (importante para performance!)
df.write.partitionBy("año", "mes").parquet("path")

# Como tabla
df.write.saveAsTable("database.table")

# Delta
df.write.format("delta").save("path")
\`\`\`

### Opciones comunes:
\`\`\`python
spark.read.options(
    header="true",
    inferSchema="true",
    delimiter=";",
    encoding="UTF-8"
).csv("path")
\`\`\``,
        en: `## I/O in Spark

### Read data:
\`\`\`python
# CSV
df = spark.read.csv("path", header=True, inferSchema=True)
df = spark.read.option("header", "true").csv("path")

# Parquet (recommended)
df = spark.read.parquet("path")

# JSON
df = spark.read.json("path")

# Delta (Databricks)
df = spark.read.format("delta").load("path")

# Table
df = spark.table("database.table")
\`\`\`

### Write data:
\`\`\`python
# Modes: overwrite, append, ignore, error
df.write.mode("overwrite").parquet("path")
df.write.mode("append").parquet("path")

# Partitioned (important for performance!)
df.write.partitionBy("year", "month").parquet("path")

# As table
df.write.saveAsTable("database.table")

# Delta
df.write.format("delta").save("path")
\`\`\`

### Common options:
\`\`\`python
spark.read.options(
    header="true",
    inferSchema="true",
    delimiter=";",
    encoding="UTF-8"
).csv("path")
\`\`\``,
        pt: `## I/O no Spark

### Ler dados:
\`\`\`python
# CSV
df = spark.read.csv("path", header=True, inferSchema=True)
df = spark.read.option("header", "true").csv("path")

# Parquet (recomendado)
df = spark.read.parquet("path")

# JSON
df = spark.read.json("path")

# Delta (Databricks)
df = spark.read.format("delta").load("path")

# Tabela
df = spark.table("database.table")
\`\`\`

### Escrever dados:
\`\`\`python
# Modos: overwrite, append, ignore, error
df.write.mode("overwrite").parquet("path")
df.write.mode("append").parquet("path")

# Particionado (importante para performance!)
df.write.partitionBy("ano", "mes").parquet("path")

# Como tabela
df.write.saveAsTable("database.table")

# Delta
df.write.format("delta").save("path")
\`\`\`

### Opções comuns:
\`\`\`python
spark.read.options(
    header="true",
    inferSchema="true",
    delimiter=";",
    encoding="UTF-8"
).csv("path")
\`\`\``
      },
      practicalTips: [{ es: '💡 Siempre usá Parquet o Delta en producción. CSV es solo para importar/exportar.', en: '💡 Always use Parquet or Delta in production. CSV is only for import/export.', pt: '💡 Sempre use Parquet ou Delta em produção. CSV é só para importar/exportar.' }],
      externalLinks: [{ title: 'Data Sources', url: 'https://spark.apache.org/docs/latest/sql-data-sources.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Guardaste un DataFrame particionado por fecha?', en: '✅ Did you save a DataFrame partitioned by date?', pt: '✅ Você salvou um DataFrame particionado por data?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-3-10',
      title: { es: 'Proyecto: ETL Completo con Spark', en: 'Project: Complete ETL with Spark', pt: 'Projeto: ETL Completo com Spark' },
      description: { es: 'Aplicá todo lo aprendido en un pipeline ETL de principio a fin.', en: 'Apply everything learned in an end-to-end ETL pipeline.', pt: 'Aplique tudo o que aprendeu em um pipeline ETL de ponta a ponta.' },
      theory: {
        es: `## Proyecto: ETL de Ventas

Objetivo: Procesar datos de ventas y generar reportes.

### Estructura del proyecto:
\`\`\`python
# 1. EXTRACT
ventas_raw = spark.read.csv("/databricks-datasets/...")
productos = spark.read.json("...")

# 2. TRANSFORM
# - Limpiar datos
ventas_clean = ventas_raw.dropna()

# - Joins
ventas_enriquecidas = ventas_clean.join(
    productos, "producto_id", "left"
)

# - Agregaciones
resumen_diario = ventas_enriquecidas.groupBy("fecha").agg(
    sum("monto").alias("ventas_totales"),
    countDistinct("cliente_id").alias("clientes_unicos")
)

# - Window functions
from pyspark.sql.window import Window
w = Window.orderBy("fecha")
resumen_diario = resumen_diario.withColumn(
    "ventas_7d", avg("ventas_totales").over(
        w.rowsBetween(-6, 0)
    )
)

# 3. LOAD
resumen_diario.write.mode("overwrite").saveAsTable("analytics.ventas_diarias")
\`\`\`

### Checklist:
- [ ] Cargar al menos 2 fuentes de datos
- [ ] Realizar limpieza de datos
- [ ] Hacer join entre tablas
- [ ] Crear agregaciones
- [ ] Usar al menos 1 window function
- [ ] Guardar resultado como tabla`,
        en: `## Project: Sales ETL

Objective: Process sales data and generate reports.

### Project structure:
\`\`\`python
# 1. EXTRACT
sales_raw = spark.read.csv("/databricks-datasets/...")
products = spark.read.json("...")

# 2. TRANSFORM
# - Clean data
sales_clean = sales_raw.dropna()

# - Joins
enriched_sales = sales_clean.join(
    products, "product_id", "left"
)

# - Aggregations
daily_summary = enriched_sales.groupBy("date").agg(
    sum("amount").alias("total_sales"),
    countDistinct("customer_id").alias("unique_customers")
)

# - Window functions
from pyspark.sql.window import Window
w = Window.orderBy("date")
daily_summary = daily_summary.withColumn(
    "sales_7d", avg("total_sales").over(
        w.rowsBetween(-6, 0)
    )
)

# 3. LOAD
daily_summary.write.mode("overwrite").saveAsTable("analytics.daily_sales")
\`\`\`

### Checklist:
- [ ] Load at least 2 data sources
- [ ] Perform data cleaning
- [ ] Join tables
- [ ] Create aggregations
- [ ] Use at least 1 window function
- [ ] Save result as table`,
        pt: `## Projeto: ETL de Vendas

Objetivo: Processar dados de vendas e gerar relatórios.

### Estrutura do projeto:
\`\`\`python
# 1. EXTRACT
vendas_raw = spark.read.csv("/databricks-datasets/...")
produtos = spark.read.json("...")

# 2. TRANSFORM
# - Limpar dados
vendas_clean = vendas_raw.dropna()

# - Joins
vendas_enriquecidas = vendas_clean.join(
    produtos, "produto_id", "left"
)

# - Agregações
resumo_diario = vendas_enriquecidas.groupBy("data").agg(
    sum("valor").alias("vendas_totais"),
    countDistinct("cliente_id").alias("clientes_unicos")
)

# - Window functions
from pyspark.sql.window import Window
w = Window.orderBy("data")
resumo_diario = resumo_diario.withColumn(
    "vendas_7d", avg("vendas_totais").over(
        w.rowsBetween(-6, 0)
    )
)

# 3. LOAD
resumo_diario.write.mode("overwrite").saveAsTable("analytics.vendas_diarias")
\`\`\`

### Checklist:
- [ ] Carregar pelo menos 2 fontes de dados
- [ ] Realizar limpeza de dados
- [ ] Fazer join entre tabelas
- [ ] Criar agregações
- [ ] Usar pelo menos 1 window function
- [ ] Salvar resultado como tabela`
      },
      practicalTips: [{ es: '📓 Este proyecto es perfecto para tu portfolio. Documentalo bien!', en: '📓 This project is perfect for your portfolio. Document it well!', pt: '📓 Este projeto é perfeito para seu portfólio. Documente bem!' }],
      externalLinks: [{ title: 'ETL Best Practices', url: 'https://docs.databricks.com/data-engineering/index.html', type: 'docs' }],
      checkpoint: { es: '🏆 ¿Completaste el ETL con todas las transformaciones?', en: '🏆 Did you complete the ETL with all transformations?', pt: '🏆 Você completou o ETL com todas as transformações?' },
      xpReward: 75,
      estimatedMinutes: 60
    }
  ]
};


