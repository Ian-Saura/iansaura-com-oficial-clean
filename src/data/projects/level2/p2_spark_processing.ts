import { Project } from '../../../types/members';

export const p2_spark_processing: Project = {
  id: 'p2-spark-processing',
  level: 2,
  title: { es: 'Procesamiento con PySpark', en: 'Processing with PySpark', pt: 'Processamento com PySpark' },
  description: {
    es: 'Procesar grandes volúmenes de datos con Spark. Cuando Pandas no alcanza, Spark es la respuesta.',
    en: 'Process large data volumes with Spark. When Pandas is not enough, Spark is the answer.',
    pt: 'Processar grandes volumes de dados com Spark. Quando Pandas não é suficiente, Spark é a resposta.'
  },
  difficulty: 'Avanzado',
  duration: '5-6 horas',
  skills: [{ es: 'Python' }, { es: 'PySpark' }, { es: 'Big Data' }, { es: 'Distributed Computing', en: 'Distributed Computing', pt: 'Computação Distribuída' }],
  icon: '⚡',
  color: 'orange',
  datasetId: 'iot',
  prerequisites: ['p1-etl-python', 'p1-extra-window-functions'],
  estimatedLines: 150,
  realWorldExample: {
    es: 'Así procesa Tesla millones de lecturas de sensores de sus vehículos por segundo',
    en: 'This is how Tesla processes millions of sensor readings from its vehicles per second',
    pt: 'Assim a Tesla processa milhões de leituras de sensores de seus veículos por segundo'
  },
  usedBy: ['Netflix', 'Uber', 'Apple', 'Meta', 'LinkedIn'],
  learningObjectives: [
    { es: 'Entender Spark architecture (Driver, Executors)', en: 'Understand Spark architecture (Driver, Executors)', pt: 'Entender arquitetura Spark (Driver, Executors)' },
    { es: 'Transformations vs Actions', en: 'Transformations vs Actions', pt: 'Transformations vs Actions' },
    { es: 'Optimizar para evitar shuffles', en: 'Optimize to avoid shuffles', pt: 'Otimizar para evitar shuffles' },
    { es: 'Usar Window Functions en Spark', en: 'Use Window Functions in Spark', pt: 'Usar Window Functions no Spark' },
    { es: 'Particionar datos eficientemente', en: 'Partition data efficiently', pt: 'Particionar dados eficientemente' },
  ],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Agregación de sensores con Spark', en: 'Sensor aggregation with Spark', pt: 'Agregação de sensores com Spark' },
      example: `+------------+------+----------+----------+--------------+
| machine_id | hour | avg_temp | max_temp | reading_count|
+------------+------+----------+----------+--------------+
| M001       | 8    | 45.2     | 52.1     | 3600         |
| M001       | 9    | 46.8     | 55.3     | 3600         |
| M002       | 8    | 38.5     | 41.2     | 3600         |
+------------+------+----------+----------+--------------+
Time: 2.3 seconds (vs 45s en Pandas para 10M lecturas)`
    },
  ],
  interviewStory: {
    hook: { es: "Migré un pipeline de Pandas a PySpark y reduje el tiempo de procesamiento de 4 horas a 8 minutos para 50GB de datos.", en: "Migrated a pipeline from Pandas to PySpark and reduced processing time from 4 hours to 8 minutes for 50GB of data.", pt: "Migrei um pipeline de Pandas para PySpark e reduzi o tempo de processamento de 4 horas para 8 minutos para 50GB de dados." },
    situation: { es: "El pipeline de analytics corría con Pandas pero empezó a fallar cuando el dataset creció a 50GB. Se quedaba sin memoria y tardaba horas.", en: "Analytics pipeline ran with Pandas but started failing when dataset grew to 50GB. Ran out of memory and took hours.", pt: "O pipeline de analytics rodava com Pandas mas começou a falhar quando o dataset cresceu para 50GB. Ficava sem memória e demorava horas." },
    task: { es: "Migrar el pipeline a PySpark para procesar datos a escala sin cambiar la lógica de negocio.", en: "Migrate pipeline to PySpark to process data at scale without changing business logic.", pt: "Migrar o pipeline para PySpark para processar dados em escala sem mudar a lógica de negócio." },
    actions: [
      { es: "Analicé el código Pandas existente e identifiqué operaciones equivalentes en Spark", en: "Analyzed existing Pandas code and identified equivalent operations in Spark", pt: "Analisei o código Pandas existente e identifiquei operações equivalentes no Spark" },
      { es: "Configuré SparkSession con particiones óptimas para el tamaño del cluster", en: "Configured SparkSession with optimal partitions for cluster size", pt: "Configurei SparkSession com partições ótimas para o tamanho do cluster" },
      { es: "Reescribí transformaciones usando DataFrame API (más legible que RDDs)", en: "Rewrote transformations using DataFrame API (more readable than RDDs)", pt: "Reescrevi transformações usando DataFrame API (mais legível que RDDs)" },
      { es: "Implementé broadcast joins para tablas pequeñas", en: "Implemented broadcast joins for small tables", pt: "Implementei broadcast joins para tabelas pequenas" },
      { es: "Optimicé con repartition y coalesce para mejor paralelismo", en: "Optimized with repartition and coalesce for better parallelism", pt: "Otimizei com repartition e coalesce para melhor paralelismo" }
    ],
    results: [
      { es: "Tiempo de procesamiento: de 4 horas a 8 minutos (30x más rápido)", en: "Processing time: from 4 hours to 8 minutes (30x faster)", pt: "Tempo de processamento: de 4 horas para 8 minutos (30x mais rápido)" },
      { es: "Puede procesar 50GB+ sin problemas de memoria", en: "Can process 50GB+ without memory issues", pt: "Pode processar 50GB+ sem problemas de memória" },
      { es: "Costo de infraestructura: mismo, solo usamos mejor el cluster existente", en: "Infrastructure cost: same, just used existing cluster better", pt: "Custo de infraestrutura: mesmo, só usamos melhor o cluster existente" },
      { es: "El pipeline ahora escala linealmente con más datos", en: "Pipeline now scales linearly with more data", pt: "O pipeline agora escala linearmente com mais dados" }
    ],
    learnings: [
      { es: "Spark no es 'Pandas distribuido' - hay que pensar diferente (lazy evaluation)", en: "Spark is not 'distributed Pandas' - must think differently (lazy evaluation)", pt: "Spark não é 'Pandas distribuído' - tem que pensar diferente (lazy evaluation)" },
      { es: "El particionamiento es crítico - mal particionado = peor que Pandas", en: "Partitioning is critical - bad partitioning = worse than Pandas", pt: "O particionamento é crítico - mal particionado = pior que Pandas" },
      { es: "Broadcast joins son un game changer para tablas de lookup", en: "Broadcast joins are a game changer for lookup tables", pt: "Broadcast joins são um game changer para tabelas de lookup" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cuándo usarías Spark vs Pandas?", en: "When would you use Spark vs Pandas?", pt: "Quando usaria Spark vs Pandas?" },
        answer: { es: "Pandas: datos que caben en memoria (<10GB). Spark: datos grandes o cuando necesitás paralelismo. El overhead de Spark no vale para datos chicos.", en: "Pandas: data fitting in memory (<10GB). Spark: large data or when parallelism is needed. Spark overhead isn't worth it for small data.", pt: "Pandas: dados que cabem na memória (<10GB). Spark: dados grandes ou quando precisa de paralelismo. O overhead do Spark não vale para dados pequenos." }
      },
      {
        question: { es: "¿Cómo optimizaste el job de Spark?", en: "How did you optimize the Spark job?", pt: "Como otimizou o job do Spark?" },
        answer: { es: "1) Broadcast joins para dims pequeñas, 2) Repartition por columnas de join, 3) Cache de DataFrames reutilizados, 4) Evité UDFs cuando había funciones nativas.", en: "1) Broadcast joins for small dims, 2) Repartition by join columns, 3) Cache reused DataFrames, 4) Avoided UDFs when native functions existed.", pt: "1) Broadcast joins para dims pequenas, 2) Repartition por colunas de join, 3) Cache de DataFrames reutilizados, 4) Evitei UDFs quando havia funções nativas." }
      },
      {
        question: { es: "¿Qué errores comunes ves en Spark?", en: "What common mistakes do you see in Spark?", pt: "Quais erros comuns vê no Spark?" },
        answer: { es: "1) Collect() en datasets grandes (trae todo al driver), 2) Demasiadas particiones pequeñas, 3) Shuffle innecesario por no usar broadcast, 4) UDFs lentos cuando hay alternativas nativas.", en: "1) Collect() on large datasets (brings all to driver), 2) Too many small partitions, 3) Unnecessary shuffle by not using broadcast, 4) Slow UDFs when native alternatives exist.", pt: "1) Collect() em datasets grandes (traz tudo para o driver), 2) Demasiadas partições pequenas, 3) Shuffle desnecessário por não usar broadcast, 4) UDFs lentos quando há alternativas nativas." }
      }
    ],
    closingStatement: { es: "Spark me enseñó que escalar no es solo agregar máquinas - es pensar diferente sobre cómo fluyen los datos.", en: "Spark taught me that scaling is not just adding machines - it's thinking differently about how data flows.", pt: "Spark me ensinou que escalar não é só adicionar máquinas - é pensar diferente sobre como fluem os dados." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '🤔 ¿Qué es Spark y cuándo lo necesito?', en: '🤔 What is Spark and when do I need it?', pt: '🤔 O que é Spark e quando preciso dele?' },
      explanation: { es: `**Apache Spark** es un motor de procesamiento de datos distribuido. Pensalo así:

| Herramienta | Límite práctico | Cuándo usar |
|-------------|-----------------|-------------|
| **Pandas** | ~5-10 GB | Datos que caben en memoria de tu laptop |
| **DuckDB** | ~50-100 GB | Analytics local, más eficiente que Pandas |
| **Spark** | Terabytes+ | Datos que no caben en una sola máquina |

### ¿Por qué Spark?
- **Distribuido**: Divide el trabajo entre múltiples máquinas
- **In-memory**: Procesa en memoria (mucho más rápido que disco)
- **Lazy evaluation**: Optimiza el plan antes de ejecutar

### La sintaxis es muy similar a Pandas:
\`\`\`python
# Pandas
df.groupby('category')['total'].sum()

# Spark
df.groupBy('category').sum('total')
\`\`\`

### ¿Puedo practicar sin un cluster?
¡Sí! PySpark corre localmente en tu laptop. Usás la misma API que en un cluster de 100 máquinas.`, en: `**Apache Spark** is a distributed data processing engine. Think of it like this:

| Tool | Practical Limit | When to use |
|------|-----------------|-------------|
| **Pandas** | ~5-10 GB | Data fitting in your laptop memory |
| **DuckDB** | ~50-100 GB | Local analytics, more efficient than Pandas |
| **Spark** | Terabytes+ | Data that doesn't fit in a single machine |

### Why Spark?
- **Distributed**: Divides work among multiple machines
- **In-memory**: Processes in memory (much faster than disk)
- **Lazy evaluation**: Optimizes plan before executing

### Syntax is very similar to Pandas:
\`\`\`python
# Pandas
df.groupby('category')['total'].sum()

# Spark
df.groupBy('category').sum('total')
\`\`\`

### Can I practice without a cluster?
Yes! PySpark runs locally on your laptop. You use the same API as in a 100-machine cluster.`, pt: `**Apache Spark** é um motor de processamento de dados distribuído. Pense assim:

| Ferramenta | Limite prático | Quando usar |
|------------|----------------|-------------|
| **Pandas** | ~5-10 GB | Dados que cabem na memória do seu laptop |
| **DuckDB** | ~50-100 GB | Analytics local, mais eficiente que Pandas |
| **Spark** | Terabytes+ | Dados que não cabem numa única máquina |

### Por que Spark?
- **Distribuído**: Divide o trabalho entre múltiplas máquinas
- **In-memory**: Processa em memória (muito mais rápido que disco)
- **Lazy evaluation**: Otimiza o plano antes de executar

### A sintaxe é muito similar ao Pandas:
\`\`\`python
# Pandas
df.groupby('category')['total'].sum()

# Spark
df.groupBy('category').sum('total')
\`\`\`

### Posso praticar sem um cluster?
Sim! PySpark roda localmente no seu laptop. Usa a mesma API que num cluster de 100 máquinas.` },
      tip: { es: 'Para este proyecto usamos Spark local. El código es idéntico al que usarías en producción.', en: 'For this project we use local Spark. Code is identical to production.', pt: 'Para este projeto usamos Spark local. O código é idêntico ao que usaria em produção.' },
      checkpoint: { es: '¿Entendés cuándo usar Spark vs Pandas?', en: 'Do you understand when to use Spark vs Pandas?', pt: 'Entende quando usar Spark vs Pandas?' }
    },
    { 
      order: 2, 
      text: { es: '📦 Instalá PySpark', en: '📦 Install PySpark', pt: '📦 Instale PySpark' },
      code: `# Instalar PySpark (incluye Spark local)
pip install pyspark

# Verificar instalación
python -c "from pyspark.sql import SparkSession; print('✅ PySpark instalado')"`,
      explanation: { es: `**Nota**: PySpark incluye una versión de Spark que corre localmente. No necesitás instalar nada más.

En producción, Spark correría en un cluster (Databricks, EMR, Dataproc), pero la API es exactamente la misma.`, en: `**Note**: PySpark includes a Spark version running locally. You don't need to install anything else.

In production, Spark would run on a cluster (Databricks, EMR, Dataproc), but API is exactly the same.`, pt: `**Nota**: PySpark inclui uma versão do Spark que roda localmente. Não precisa instalar nada mais.

Em produção, Spark rodaria num cluster (Databricks, EMR, Dataproc), mas a API é exatamente a mesma.` },
      checkpoint: { es: '¿from pyspark.sql import SparkSession funciona?', en: 'Does from pyspark.sql import SparkSession work?', pt: 'from pyspark.sql import SparkSession funciona?' }
    },
    { 
      order: 3, 
      text: { es: '🚀 Creá SparkSession', en: '🚀 Create SparkSession', pt: '🚀 Crie SparkSession' },
      code: `from pyspark.sql import SparkSession

spark = SparkSession.builder \\
    .appName("EcommerceAnalytics") \\
    .config("spark.sql.shuffle.partitions", "4") \\
    .getOrCreate()

print(f"Spark version: {spark.version}")`,
      explanation: { es: 'SparkSession es el punto de entrada a Spark. Configura partitions según tu máquina.', en: 'SparkSession is the entry point to Spark. Configures partitions according to your machine.', pt: 'SparkSession é o ponto de entrada para o Spark. Configura partitions segundo sua máquina.' }
    },
    { 
      order: 4, 
      text: { es: '📥 Cargá datos', en: '📥 Load data', pt: '📥 Carregue dados' },
      code: `# Cargar datos de sensores IoT (ideal para Spark por el volumen)
# Descargá el dataset IoT desde la pestaña Datasets
df = spark.read.option("header", True).option("inferSchema", True).csv("data/iot_sensor_readings.csv")

# Cargar también info de máquinas para enriquecer
machines = spark.read.option("header", True).option("inferSchema", True).csv("data/iot_machines.csv")

# Ver schema
df.printSchema()

# Ver primeras filas
df.show(5)

# Contar filas (las lecturas de sensores suelen ser millones)
print(f"Total lecturas: {df.count()}")`,
      explanation: { es: 'Los datos de IoT son ideales para Spark: millones de lecturas de sensores que necesitan procesamiento distribuido.', en: 'IoT data is ideal for Spark: millions of sensor readings that need distributed processing.', pt: 'Dados de IoT são ideais para Spark: milhões de leituras de sensores que precisam de processamento distribuído.' }
    },
    { 
      order: 5, 
      text: { es: '🔄 Transformaciones básicas', en: '🔄 Basic transformations', pt: '🔄 Transformações básicas' },
      code: `from pyspark.sql.functions import col, to_timestamp, hour, dayofweek

# Transformaciones (lazy - no se ejecutan todavía)
df_clean = df \\
    .withColumn("reading_time", to_timestamp(col("timestamp"))) \\
    .withColumn("reading_hour", hour(col("reading_time"))) \\
    .withColumn("day_of_week", dayofweek(col("reading_time"))) \\
    .filter(col("temperature").isNotNull())

# Esto SÍ ejecuta (action)
df_clean.show(5)`,
      explanation: { es: 'Las transformaciones son "lazy": Spark las acumula y optimiza antes de ejecutar.', en: 'Transformations are "lazy": Spark accumulates and optimizes them before executing.', pt: 'As transformações são "lazy": Spark as acumula e otimiza antes de executar.' },
      tip: { es: 'Solo cuando llamás una "action" (show, count, write) Spark ejecuta el plan.', en: 'Only when you call an "action" (show, count, write) does Spark execute the plan.', pt: 'Só quando chama uma "action" (show, count, write) o Spark executa o plano.' }
    },
    { 
      order: 6, 
      text: { es: '📊 Agregaciones', en: '📊 Aggregations', pt: '📊 Agregações' },
      code: `from pyspark.sql.functions import sum, avg, count, max, min

# Estadísticas de sensores por máquina y hora
sensor_stats = df_clean \\
    .groupBy("machine_id", "reading_hour") \\
    .agg(
        avg("temperature").alias("avg_temp"),
        max("temperature").alias("max_temp"),
        avg("vibration").alias("avg_vibration"),
        count("*").alias("reading_count")
    ) \\
    .orderBy("machine_id", "reading_hour")

sensor_stats.show()`,
      explanation: { es: 'groupBy + agg es el patrón para agregaciones. Siempre usá alias() para nombrar columnas.', en: 'groupBy + agg is the pattern for aggregations. Always use alias() to name columns.', pt: 'groupBy + agg é o padrão para agregações. Sempre use alias() para nomear colunas.' }
    },
    { 
      order: 7, 
      text: { es: '🪟 Window Functions', en: '🪟 Window Functions', pt: '🪟 Window Functions' },
      code: `from pyspark.sql.window import Window
from pyspark.sql.functions import row_number, lag

# Definir ventana por máquina ordenada por tiempo
window = Window.partitionBy("machine_id").orderBy("reading_time")

# Detectar cambios de temperatura (útil para mantenimiento predictivo)
df_with_window = df_clean \\
    .withColumn("reading_rank", row_number().over(window)) \\
    .withColumn("prev_temperature", lag("temperature").over(window)) \\
    .withColumn("temp_change", col("temperature") - col("prev_temperature"))

df_with_window.show(10)`,
      explanation: { es: 'Window Functions en Spark funcionan igual que en SQL.', en: 'Window Functions in Spark work just like in SQL.', pt: 'Window Functions no Spark funcionam igual ao SQL.' }
    },
    { 
      order: 8, 
      text: { es: '💾 Guardá particionado', en: '💾 Save partitioned', pt: '💾 Salve particionado' },
      code: `# Guardar particionado por máquina y día
df_clean.write \\
    .partitionBy("machine_id", "day_of_week") \\
    .mode("overwrite") \\
    .parquet("output/sensor_data_partitioned")

# Verificar estructura
import os
for root, dirs, files in os.walk("output/sensor_data_partitioned"):
    print(root)`,
      explanation: { es: 'Particionar mejora performance: las queries solo leen las particiones necesarias.', en: 'Partitioning improves performance: queries only read necessary partitions.', pt: 'Particionar melhora performance: as queries só leem as partições necessárias.' }
    },
    { 
      order: 9, 
      text: { es: '📊 Compará con Pandas', en: '📊 Compare with Pandas', pt: '📊 Compare com Pandas' },
      code: `import time
import pandas as pd

# Medir tiempo con Pandas
start = time.time()
df_pandas = pd.read_csv("data/iot_sensor_readings.csv")
df_pandas['timestamp'] = pd.to_datetime(df_pandas['timestamp'])
df_pandas['hour'] = df_pandas['timestamp'].dt.hour
result_pandas = df_pandas.groupby(['machine_id', 'hour'])['temperature'].mean()
pandas_time = time.time() - start

# Medir tiempo con Spark
start = time.time()
result_spark = df_clean.groupBy("machine_id", "reading_hour").avg("temperature").collect()
spark_time = time.time() - start

print(f"Pandas: {pandas_time:.2f}s")
print(f"Spark: {spark_time:.2f}s")
print("💡 Con millones de lecturas de sensores, Spark gana por mucho!")`,
      explanation: { es: 'Para datasets pequeños, Pandas es más rápido. Spark brilla con millones de filas.', en: 'For small datasets, Pandas is faster. Spark shines with millions of rows.', pt: 'Para datasets pequenos, Pandas é mais rápido. Spark brilha com milhões de linhas.' },
      tip: { es: 'Spark tiene overhead de inicialización. Vale la pena para >1GB de datos.', en: 'Spark has initialization overhead. Worth it for >1GB data.', pt: 'Spark tem overhead de inicialização. Vale a pena para >1GB de dados.' }
    },
  ],
  deliverable: { es: 'Notebook con código Spark + análisis de performance', en: 'Notebook with Spark code + performance analysis', pt: 'Notebook com código Spark + análise de performance' },
  evaluation: [
    { es: '¿Entendés la diferencia entre transformations y actions?', en: 'Do you understand difference between transformations and actions?', pt: 'Entende a diferença entre transformations e actions?' },
    { es: '¿Usaste particionamiento?', en: 'Did you use partitioning?', pt: 'Usou particionamento?' },
    { es: '¿Optimizaste para evitar shuffles?', en: 'Did you optimize to avoid shuffles?', pt: 'Otimizou para evitar shuffles?' },
    { es: '¿Comparaste performance con Pandas?', en: 'Did you compare performance with Pandas?', pt: 'Comparou performance com Pandas?' },
  ],
  theory: { es: `## Spark Architecture

**Driver**: Coordina el trabajo, crea el plan de ejecución
**Executors**: Ejecutan las tareas en paralelo
**Cluster Manager**: Asigna recursos (YARN, Kubernetes, Standalone)

## Transformations vs Actions

| Transformations (Lazy) | Actions (Execute) |
|------------------------|-------------------|
| filter, select, withColumn | show, count, collect |
| groupBy, join | write, save |
| No ejecutan inmediatamente | Ejecutan el plan |

## Optimización

1. **Evitar shuffles**: groupBy y join causan shuffles (costosos)
2. **Particionar bien**: Usar columnas de filtro común
3. **Broadcast joins**: Para tablas pequeñas
4. **Caching**: df.cache() para reusar DataFrames`, en: `## Spark Architecture

**Driver**: Coordinates work, creates execution plan
**Executors**: Execute tasks in parallel
**Cluster Manager**: Assigns resources (YARN, Kubernetes, Standalone)

## Transformations vs Actions

| Transformations (Lazy) | Actions (Execute) |
|------------------------|-------------------|
| filter, select, withColumn | show, count, collect |
| groupBy, join | write, save |
| Do not execute immediately | Execute the plan |

## Optimization

1. **Avoid shuffles**: groupBy and join cause shuffles (expensive)
2. **Partition well**: Use common filter columns
3. **Broadcast joins**: For small tables
4. **Caching**: df.cache() to reuse DataFrames`, pt: `## Arquitetura Spark

**Driver**: Coordena o trabalho, cria o plano de execução
**Executors**: Executam as tarefas em paralelo
**Cluster Manager**: Atribui recursos (YARN, Kubernetes, Standalone)

## Transformations vs Actions

| Transformations (Lazy) | Actions (Execute) |
|------------------------|-------------------|
| filter, select, withColumn | show, count, collect |
| groupBy, join | write, save |
| Não executam imediatamente | Executam o plano |

## Otimização

1. **Evitar shuffles**: groupBy e join causam shuffles (custosos)
2. **Particionar bem**: Usar colunas de filtro comum
3. **Broadcast joins**: Para tabelas pequenas
4. **Caching**: df.cache() para reusar DataFrames` },
};


