/**
 * FASE 4: Spark Avanzado
 * 9 pasos para dominar técnicas avanzadas de Spark
 */

import { DatabricksPhase } from '../types';

export const PHASE_4_SPARK_ADVANCED: DatabricksPhase = {
  id: 'db-phase-4',
  number: 4,
  title: { es: 'Spark Avanzado', en: 'Advanced Spark', pt: 'Spark Avançado' },
  subtitle: { es: 'Optimización y técnicas avanzadas', en: 'Optimization and advanced techniques', pt: 'Otimização e técnicas avançadas' },
  description: { es: 'Llevá tu conocimiento de Spark al siguiente nivel con UDFs, broadcast, particionamiento y debugging.', en: 'Take your Spark knowledge to the next level with UDFs, broadcast, partitioning and debugging.', pt: 'Leve seu conhecimento de Spark ao próximo nível com UDFs, broadcast, particionamento e debugging.' },
  icon: '🔥',
  color: 'red',
  estimatedDays: '5-6 días',
  steps: [
    {
      id: 'db-4-1',
      title: { es: 'User Defined Functions (UDFs)', en: 'User Defined Functions (UDFs)', pt: 'User Defined Functions (UDFs)' },
      description: { es: 'Creá funciones personalizadas para transformaciones complejas.', en: 'Create custom functions for complex transformations.', pt: 'Crie funções personalizadas para transformações complexas.' },
      theory: { es: `## UDFs en Spark\n\n\`\`\`python\nfrom pyspark.sql.functions import udf\nfrom pyspark.sql.types import StringType, IntegerType\n\n# UDF simple\n@udf(returnType=StringType())\ndef limpiar_texto(texto):\n    if texto is None:\n        return None\n    return texto.strip().lower()\n\ndf.withColumn("nombre_limpio", limpiar_texto("nombre"))\n\n# UDF con registro\ndef calcular_categoria(edad):\n    if edad < 18: return "menor"\n    elif edad < 65: return "adulto"\n    else: return "senior"\n\ncategorizar = udf(calcular_categoria, StringType())\ndf.withColumn("categoria", categorizar("edad"))\n\n# Pandas UDF (más eficiente)\nfrom pyspark.sql.functions import pandas_udf\nimport pandas as pd\n\n@pandas_udf(StringType())\ndef upper_pandas(s: pd.Series) -> pd.Series:\n    return s.str.upper()\n\ndf.withColumn("nombre_upper", upper_pandas("nombre"))\n\`\`\`\n\n⚠️ Las UDFs son lentas. Preferí funciones built-in cuando sea posible.`, en: `## UDFs in Spark\n\n\`\`\`python\nfrom pyspark.sql.functions import udf\nfrom pyspark.sql.types import StringType, IntegerType\n\n# Simple UDF\n@udf(returnType=StringType())\ndef clean_text(text):\n    if text is None:\n        return None\n    return text.strip().lower()\n\ndf.withColumn("clean_name", clean_text("name"))\n\n# UDF with registration\ndef calculate_category(age):\n    if age < 18: return "minor"\n    elif age < 65: return "adult"\n    else: return "senior"\n\ncategorize = udf(calculate_category, StringType())\ndf.withColumn("category", categorize("age"))\n\n# Pandas UDF (more efficient)\nfrom pyspark.sql.functions import pandas_udf\nimport pandas as pd\n\n@pandas_udf(StringType())\ndef upper_pandas(s: pd.Series) -> pd.Series:\n    return s.str.upper()\n\ndf.withColumn("name_upper", upper_pandas("name"))\n\`\`\`\n\n⚠️ UDFs are slow. Prefer built-in functions when possible.`, pt: `## UDFs no Spark\n\n\`\`\`python\nfrom pyspark.sql.functions import udf\nfrom pyspark.sql.types import StringType, IntegerType\n\n# UDF simples\n@udf(returnType=StringType())\ndef limpar_texto(texto):\n    if texto is None:\n        return None\n    return texto.strip().lower()\n\ndf.withColumn("nome_limpo", limpar_texto("nome"))\n\n# UDF com registro\ndef calcular_categoria(idade):\n    if idade < 18: return "menor"\n    elif idade < 65: return "adulto"\n    else: return "senior"\n\ncategorizar = udf(calcular_categoria, StringType())\ndf.withColumn("categoria", categorizar("idade"))\n\n# Pandas UDF (mais eficiente)\nfrom pyspark.sql.functions import pandas_udf\nimport pandas as pd\n\n@pandas_udf(StringType())\ndef upper_pandas(s: pd.Series) -> pd.Series:\n    return s.str.upper()\n\ndf.withColumn("nome_upper", upper_pandas("nome"))\n\`\`\`\n\n⚠️ UDFs são lentas. Prefira funções built-in quando possível.` },
      practicalTips: [{ es: '⚡ Pandas UDFs son 10-100x más rápidas que UDFs normales.', en: '⚡ Pandas UDFs are 10-100x faster than regular UDFs.', pt: '⚡ Pandas UDFs são 10-100x mais rápidas que UDFs normais.' }],
      externalLinks: [{ title: 'UDF Guide', url: 'https://spark.apache.org/docs/latest/sql-ref-functions-udf-scalar.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Creaste una Pandas UDF?', en: '✅ Did you create a Pandas UDF?', pt: '✅ Você criou uma Pandas UDF?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-4-2',
      title: { es: 'Broadcast Variables y Joins', en: 'Broadcast Variables and Joins', pt: 'Broadcast Variables e Joins' },
      description: { es: 'Optimizá joins con tablas pequeñas usando broadcast.', en: 'Optimize joins with small tables using broadcast.', pt: 'Otimize joins com tabelas pequenas usando broadcast.' },
      theory: { es: `## Broadcast en Spark\n\n\`\`\`python\nfrom pyspark.sql.functions import broadcast\n\n# Sin broadcast (shuffle de ambas tablas)\ndf_grande.join(df_pequeño, "id")\n\n# Con broadcast (df_pequeño se copia a todos los workers)\ndf_grande.join(broadcast(df_pequeño), "id")\n\`\`\`\n\n### ¿Cuándo usar?\n- Tabla pequeña < 10MB (configuración default)\n- Se puede aumentar: \`spark.sql.autoBroadcastJoinThreshold\`\n\n### Broadcast variables manuales:\n\`\`\`python\n# Para diccionarios o lookups\nlookup_dict = {"A": 1, "B": 2}\nbroadcast_lookup = spark.sparkContext.broadcast(lookup_dict)\n\n@udf(IntegerType())\ndef get_value(key):\n    return broadcast_lookup.value.get(key, 0)\n\`\`\``, en: `## Broadcast in Spark\n\n\`\`\`python\nfrom pyspark.sql.functions import broadcast\n\n# Without broadcast (shuffles both tables)\ndf_large.join(df_small, "id")\n\n# With broadcast (df_small is copied to all workers)\ndf_large.join(broadcast(df_small), "id")\n\`\`\`\n\n### When to use?\n- Small table < 10MB (default config)\n- Can increase: \`spark.sql.autoBroadcastJoinThreshold\`\n\n### Manual broadcast variables:\n\`\`\`python\n# For dictionaries or lookups\nlookup_dict = {"A": 1, "B": 2}\nbroadcast_lookup = spark.sparkContext.broadcast(lookup_dict)\n\n@udf(IntegerType())\ndef get_value(key):\n    return broadcast_lookup.value.get(key, 0)\n\`\`\``, pt: `## Broadcast no Spark\n\n\`\`\`python\nfrom pyspark.sql.functions import broadcast\n\n# Sem broadcast (shuffle de ambas tabelas)\ndf_grande.join(df_pequeno, "id")\n\n# Com broadcast (df_pequeno é copiado para todos os workers)\ndf_grande.join(broadcast(df_pequeno), "id")\n\`\`\`\n\n### Quando usar?\n- Tabela pequena < 10MB (config default)\n- Pode aumentar: \`spark.sql.autoBroadcastJoinThreshold\`\n\n### Broadcast variables manuais:\n\`\`\`python\n# Para dicionários ou lookups\nlookup_dict = {"A": 1, "B": 2}\nbroadcast_lookup = spark.sparkContext.broadcast(lookup_dict)\n\n@udf(IntegerType())\ndef get_value(key):\n    return broadcast_lookup.value.get(key, 0)\n\`\`\`` },
      practicalTips: [{ es: '💡 Revisá el plan de ejecución con df.explain() para verificar que se use broadcast.', en: '💡 Check the execution plan with df.explain() to verify broadcast is used.', pt: '💡 Verifique o plano de execução com df.explain() para verificar que broadcast é usado.' }],
      externalLinks: [{ title: 'Broadcast Joins', url: 'https://spark.apache.org/docs/latest/sql-performance-tuning.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Verificaste con explain() que el join usa broadcast?', en: '✅ Did you verify with explain() that the join uses broadcast?', pt: '✅ Você verificou com explain() que o join usa broadcast?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-4-3',
      title: { es: 'Particionamiento de Datos', en: 'Data Partitioning', pt: 'Particionamento de Dados' },
      description: { es: 'El particionamiento correcto puede acelerar tus queries 10x o más.', en: 'Correct partitioning can speed up your queries 10x or more.', pt: 'O particionamento correto pode acelerar suas queries 10x ou mais.' },
      theory: { es: `## Particionamiento\n\n### Al escribir:\n\`\`\`python\n# Particionar por columnas\ndf.write.partitionBy("año", "mes").parquet("path")\n\n# Resultado en disco:\n# path/año=2024/mes=01/part-00000.parquet\n# path/año=2024/mes=02/part-00000.parquet\n\`\`\`\n\n### Al leer (partition pruning):\n\`\`\`python\n# Solo lee la partición necesaria\ndf = spark.read.parquet("path").filter("año = 2024 AND mes = 1")\n\`\`\`\n\n### Repartition vs Coalesce:\n\`\`\`python\n# Repartition: redistribuye datos (shuffle)\ndf.repartition(100)  # Aumentar particiones\ndf.repartition("columna")  # Por columna\n\n# Coalesce: reduce particiones (sin shuffle)\ndf.coalesce(10)  # Solo para reducir\n\`\`\`\n\n### Tips:\n- Particionar por columnas de filtro frecuente\n- Evitar muchas particiones pequeñas\n- Tamaño ideal: 128MB-1GB por partición`, en: `## Partitioning\n\n### When writing:\n\`\`\`python\n# Partition by columns\ndf.write.partitionBy("year", "month").parquet("path")\n\n# Result on disk:\n# path/year=2024/month=01/part-00000.parquet\n# path/year=2024/month=02/part-00000.parquet\n\`\`\`\n\n### When reading (partition pruning):\n\`\`\`python\n# Only reads needed partition\ndf = spark.read.parquet("path").filter("year = 2024 AND month = 1")\n\`\`\`\n\n### Repartition vs Coalesce:\n\`\`\`python\n# Repartition: redistributes data (shuffle)\ndf.repartition(100)  # Increase partitions\ndf.repartition("column")  # By column\n\n# Coalesce: reduces partitions (no shuffle)\ndf.coalesce(10)  # Only to reduce\n\`\`\`\n\n### Tips:\n- Partition by frequently filtered columns\n- Avoid many small partitions\n- Ideal size: 128MB-1GB per partition`, pt: `## Particionamento\n\n### Ao escrever:\n\`\`\`python\n# Particionar por colunas\ndf.write.partitionBy("ano", "mes").parquet("path")\n\n# Resultado no disco:\n# path/ano=2024/mes=01/part-00000.parquet\n# path/ano=2024/mes=02/part-00000.parquet\n\`\`\`\n\n### Ao ler (partition pruning):\n\`\`\`python\n# Só lê a partição necessária\ndf = spark.read.parquet("path").filter("ano = 2024 AND mes = 1")\n\`\`\`\n\n### Repartition vs Coalesce:\n\`\`\`python\n# Repartition: redistribui dados (shuffle)\ndf.repartition(100)  # Aumentar partições\ndf.repartition("coluna")  # Por coluna\n\n# Coalesce: reduz partições (sem shuffle)\ndf.coalesce(10)  # Só para reduzir\n\`\`\`\n\n### Dicas:\n- Particionar por colunas de filtro frequente\n- Evitar muitas partições pequenas\n- Tamanho ideal: 128MB-1GB por partição` },
      practicalTips: [{ es: '⚠️ Demasiadas particiones = archivos pequeños = performance pobre. Encontrá el balance.', en: '⚠️ Too many partitions = small files = poor performance. Find the balance.', pt: '⚠️ Muitas partições = arquivos pequenos = performance ruim. Encontre o equilíbrio.' }],
      externalLinks: [{ title: 'Partition Pruning', url: 'https://docs.databricks.com/optimizations/dynamic-partition-pruning.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Guardaste datos particionados y verificaste el partition pruning?', en: '✅ Did you save partitioned data and verify partition pruning?', pt: '✅ Você salvou dados particionados e verificou o partition pruning?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-4-4',
      title: { es: 'Caching y Persistencia', en: 'Caching and Persistence', pt: 'Caching e Persistência' },
      description: { es: 'Guardá DataFrames en memoria para reutilizarlos eficientemente.', en: 'Store DataFrames in memory to reuse them efficiently.', pt: 'Guarde DataFrames em memória para reutilizá-los eficientemente.' },
      theory: { es: `## Caching en Spark\n\n\`\`\`python\n# Cache en memoria\ndf.cache()  # Equivalente a persist(MEMORY_ONLY)\n\n# Diferentes niveles de persistencia\nfrom pyspark import StorageLevel\n\ndf.persist(StorageLevel.MEMORY_ONLY)      # Solo RAM\ndf.persist(StorageLevel.MEMORY_AND_DISK)  # RAM + disco si no entra\ndf.persist(StorageLevel.DISK_ONLY)        # Solo disco\ndf.persist(StorageLevel.MEMORY_ONLY_SER)  # RAM serializado (menos espacio)\n\n# Liberar cache\ndf.unpersist()\n\n# Ver qué está cacheado\nspark.catalog.clearCache()  # Limpiar todo\n\`\`\`\n\n### ¿Cuándo usar cache?\n✅ DataFrame usado múltiples veces\n✅ Después de transformaciones costosas\n❌ DataFrames usados una sola vez\n❌ DataFrames muy grandes que no entran en memoria`, en: `## Caching in Spark\n\n\`\`\`python\n# Cache in memory\ndf.cache()  # Equivalent to persist(MEMORY_ONLY)\n\n# Different persistence levels\nfrom pyspark import StorageLevel\n\ndf.persist(StorageLevel.MEMORY_ONLY)      # RAM only\ndf.persist(StorageLevel.MEMORY_AND_DISK)  # RAM + disk if doesn't fit\ndf.persist(StorageLevel.DISK_ONLY)        # Disk only\ndf.persist(StorageLevel.MEMORY_ONLY_SER)  # Serialized RAM (less space)\n\n# Release cache\ndf.unpersist()\n\n# See what's cached\nspark.catalog.clearCache()  # Clear all\n\`\`\`\n\n### When to use cache?\n✅ DataFrame used multiple times\n✅ After expensive transformations\n❌ DataFrames used only once\n❌ Very large DataFrames that don't fit in memory`, pt: `## Caching no Spark\n\n\`\`\`python\n# Cache em memória\ndf.cache()  # Equivalente a persist(MEMORY_ONLY)\n\n# Diferentes níveis de persistência\nfrom pyspark import StorageLevel\n\ndf.persist(StorageLevel.MEMORY_ONLY)      # Só RAM\ndf.persist(StorageLevel.MEMORY_AND_DISK)  # RAM + disco se não couber\ndf.persist(StorageLevel.DISK_ONLY)        # Só disco\ndf.persist(StorageLevel.MEMORY_ONLY_SER)  # RAM serializado (menos espaço)\n\n# Liberar cache\ndf.unpersist()\n\n# Ver o que está cacheado\nspark.catalog.clearCache()  # Limpar tudo\n\`\`\`\n\n### Quando usar cache?\n✅ DataFrame usado múltiplas vezes\n✅ Depois de transformações custosas\n❌ DataFrames usados uma única vez\n❌ DataFrames muito grandes que não cabem em memória` },
      practicalTips: [{ es: '💡 cache() es lazy - el cache real ocurre en la primera acción.', en: '💡 cache() is lazy - actual caching happens on first action.', pt: '💡 cache() é lazy - o cache real acontece na primeira ação.' }],
      externalLinks: [{ title: 'Caching', url: 'https://spark.apache.org/docs/latest/rdd-programming-guide.html#rdd-persistence', type: 'docs' }],
      checkpoint: { es: '✅ ¿Cacheaste un DataFrame y verificaste la mejora de performance?', en: '✅ Did you cache a DataFrame and verify the performance improvement?', pt: '✅ Você cacheou um DataFrame e verificou a melhora de performance?' },
      xpReward: 25,
      estimatedMinutes: 20
    },
    {
      id: 'db-4-5',
      title: { es: 'Spark UI y Debugging', en: 'Spark UI and Debugging', pt: 'Spark UI e Debugging' },
      description: { es: 'Aprendé a usar Spark UI para entender y optimizar tus jobs.', en: 'Learn to use Spark UI to understand and optimize your jobs.', pt: 'Aprenda a usar Spark UI para entender e otimizar seus jobs.' },
      theory: { es: `## Spark UI\n\nAccedé desde el cluster en Databricks: Clusters > Tu cluster > Spark UI\n\n### Secciones principales:\n\n**Jobs**: Lista de jobs ejecutados\n- Tiempo de ejecución\n- Stages completados\n- Tasks exitosos/fallidos\n\n**Stages**: Detalle de cada stage\n- Shuffle read/write\n- Tiempo por task\n- Skew de datos\n\n**Storage**: DataFrames cacheados\n- Tamaño en memoria\n- Particiones\n\n**SQL**: Planes de ejecución SQL\n- DAG visual\n- Tiempos por operación\n\n### Qué buscar:\n- 🔴 Stages muy largos\n- 🔴 Shuffle excesivo\n- 🔴 Skew (tasks mucho más lentas que otras)\n- 🔴 Spill a disco`, en: `## Spark UI\n\nAccess from cluster in Databricks: Clusters > Your cluster > Spark UI\n\n### Main sections:\n\n**Jobs**: List of executed jobs\n- Execution time\n- Completed stages\n- Successful/failed tasks\n\n**Stages**: Detail of each stage\n- Shuffle read/write\n- Time per task\n- Data skew\n\n**Storage**: Cached DataFrames\n- Size in memory\n- Partitions\n\n**SQL**: SQL execution plans\n- Visual DAG\n- Time per operation\n\n### What to look for:\n- 🔴 Very long stages\n- 🔴 Excessive shuffle\n- 🔴 Skew (tasks much slower than others)\n- 🔴 Spill to disk`, pt: `## Spark UI\n\nAcesse do cluster no Databricks: Clusters > Seu cluster > Spark UI\n\n### Seções principais:\n\n**Jobs**: Lista de jobs executados\n- Tempo de execução\n- Stages completados\n- Tasks bem-sucedidas/falhadas\n\n**Stages**: Detalhe de cada stage\n- Shuffle read/write\n- Tempo por task\n- Skew de dados\n\n**Storage**: DataFrames cacheados\n- Tamanho em memória\n- Partições\n\n**SQL**: Planos de execução SQL\n- DAG visual\n- Tempos por operação\n\n### O que procurar:\n- 🔴 Stages muito longos\n- 🔴 Shuffle excessivo\n- 🔴 Skew (tasks muito mais lentas que outras)\n- 🔴 Spill para disco` },
      practicalTips: [{ es: '🔍 El 80% de los problemas de performance se ven en Spark UI.', en: '🔍 80% of performance issues are visible in Spark UI.', pt: '🔍 80% dos problemas de performance são visíveis no Spark UI.' }],
      externalLinks: [{ title: 'Spark UI', url: 'https://spark.apache.org/docs/latest/web-ui.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Identificaste un cuello de botella en Spark UI?', en: '✅ Did you identify a bottleneck in Spark UI?', pt: '✅ Você identificou um gargalo no Spark UI?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-4-6',
      title: { es: 'Manejo de Skew de Datos', en: 'Handling Data Skew', pt: 'Lidando com Skew de Dados' },
      description: { es: 'El skew es uno de los problemas más comunes. Aprendé a detectarlo y solucionarlo.', en: 'Skew is one of the most common problems. Learn to detect and fix it.', pt: 'O skew é um dos problemas mais comuns. Aprenda a detectá-lo e corrigi-lo.' },
      theory: { es: `## Data Skew\n\nEl skew ocurre cuando algunos particiones tienen muchos más datos que otras.\n\n### Detectar skew:\n\`\`\`python\n# Ver distribución\ndf.groupBy("columna_join").count().orderBy("count", ascending=False).show()\n\`\`\`\n\n### Soluciones:\n\n**1. Salting (agregar ruido)**\n\`\`\`python\nfrom pyspark.sql.functions import rand, concat, lit\n\n# Agregar salt a la key\ndf_salted = df.withColumn("key_salted", \n    concat("key", lit("_"), (rand() * 10).cast("int")))\n\`\`\`\n\n**2. Broadcast si una tabla es pequeña**\n\`\`\`python\ndf_grande.join(broadcast(df_pequeño), "key")\n\`\`\`\n\n**3. AQE (Adaptive Query Execution)**\n\`\`\`python\nspark.conf.set("spark.sql.adaptive.enabled", "true")\nspark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")\n\`\`\``, en: `## Data Skew\n\nSkew occurs when some partitions have much more data than others.\n\n### Detect skew:\n\`\`\`python\n# View distribution\ndf.groupBy("join_column").count().orderBy("count", ascending=False).show()\n\`\`\`\n\n### Solutions:\n\n**1. Salting (add noise)**\n\`\`\`python\nfrom pyspark.sql.functions import rand, concat, lit\n\n# Add salt to key\ndf_salted = df.withColumn("key_salted", \n    concat("key", lit("_"), (rand() * 10).cast("int")))\n\`\`\`\n\n**2. Broadcast if one table is small**\n\`\`\`python\ndf_large.join(broadcast(df_small), "key")\n\`\`\`\n\n**3. AQE (Adaptive Query Execution)**\n\`\`\`python\nspark.conf.set("spark.sql.adaptive.enabled", "true")\nspark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")\n\`\`\``, pt: `## Data Skew\n\nO skew ocorre quando algumas partições têm muito mais dados que outras.\n\n### Detectar skew:\n\`\`\`python\n# Ver distribuição\ndf.groupBy("coluna_join").count().orderBy("count", ascending=False).show()\n\`\`\`\n\n### Soluções:\n\n**1. Salting (adicionar ruído)**\n\`\`\`python\nfrom pyspark.sql.functions import rand, concat, lit\n\n# Adicionar salt à key\ndf_salted = df.withColumn("key_salted", \n    concat("key", lit("_"), (rand() * 10).cast("int")))\n\`\`\`\n\n**2. Broadcast se uma tabela é pequena**\n\`\`\`python\ndf_grande.join(broadcast(df_pequeno), "key")\n\`\`\`\n\n**3. AQE (Adaptive Query Execution)**\n\`\`\`python\nspark.conf.set("spark.sql.adaptive.enabled", "true")\nspark.conf.set("spark.sql.adaptive.skewJoin.enabled", "true")\n\`\`\`` },
      practicalTips: [{ es: '💡 AQE está habilitado por default en todos los Databricks Runtime modernos (7.3+). En 14.x es aún más potente.', en: '💡 AQE is enabled by default in all modern Databricks Runtimes (7.3+). In 14.x it is even more powerful.', pt: '💡 AQE está habilitado por padrão em todos os Databricks Runtimes modernos (7.3+). No 14.x é ainda mais poderoso.' }],
      externalLinks: [{ title: 'Skew Handling', url: 'https://docs.databricks.com/optimizations/skew-join.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Detectaste skew y aplicaste una solución?', en: '✅ Did you detect skew and apply a solution?', pt: '✅ Você detectou skew e aplicou uma solução?' },
      xpReward: 35,
      estimatedMinutes: 30
    },
    {
      id: 'db-4-7',
      title: { es: 'Structured Streaming Básico', en: 'Basic Structured Streaming', pt: 'Structured Streaming Básico' },
      description: { es: 'Introducción al procesamiento de datos en tiempo real con Spark.', en: 'Introduction to real-time data processing with Spark.', pt: 'Introdução ao processamento de dados em tempo real com Spark.' },
      theory: { es: `## Structured Streaming

Structured Streaming trata los datos en tiempo real como una **tabla que crece infinitamente**.

### Modelo Mental

\`\`\`
Datos llegando:        Stream como tabla infinita:
                       
t=0: [A, B]           ┌───┬───┐
t=1: [C, D]    →      │ A │ B │  ← Fila 1
t=2: [E, F]           │ C │ D │  ← Fila 2
t=3: [G, H]           │ E │ F │  ← Fila 3
  ...                 │ G │ H │  ← Fila 4
                      │...│...│
                      └───┴───┘

Tu código opera sobre la "tabla" completa,
Spark se encarga de procesar solo lo nuevo.
\`\`\`

### Leer y Escribir Streams

\`\`\`python
# LEER STREAM desde archivos (Auto Loader)
df_stream = spark.readStream \\
    .format("cloudFiles") \\
    .option("cloudFiles.format", "json") \\
    .option("cloudFiles.schemaLocation", "/schema") \\
    .schema(schema) \\
    .load("s3://bucket/landing/")

# LEER STREAM desde Kafka
df_kafka = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "broker:9092") \\
    .option("subscribe", "topic_name") \\
    .option("startingOffsets", "latest") \\
    .load()

# Transformaciones (IGUAL que batch!)
df_transformed = df_stream \\
    .filter(col("value") > 100) \\
    .groupBy("category").count()

# ESCRIBIR STREAM a Delta
query = df_transformed.writeStream \\
    .format("delta") \\
    .outputMode("complete") \\
    .option("checkpointLocation", "/checkpoints/my_stream") \\
    .start("/output/path")

query.awaitTermination()
\`\`\`

### Output Modes

| Mode | Uso | Cuándo usar |
|------|-----|-------------|
| **append** | Solo nuevas filas | Sin agregaciones |
| **complete** | Toda la tabla | Con agregaciones (groupBy) |
| **update** | Filas modificadas | Agregaciones sin watermark |

### Ejemplo Práctico

\`\`\`python
from pyspark.sql.functions import *

# Stream de eventos de usuario
events = spark.readStream \\
    .format("cloudFiles") \\
    .option("cloudFiles.format", "json") \\
    .schema("user_id STRING, event STRING, timestamp TIMESTAMP") \\
    .load("/data/events/")

# Contar eventos por usuario (agregación)
user_counts = events \\
    .groupBy("user_id") \\
    .agg(
        count("*").alias("total_events"),
        max("timestamp").alias("last_seen")
    )

# Escribir con output mode complete (porque hay agregación)
query = user_counts.writeStream \\
    .format("delta") \\
    .outputMode("complete") \\
    .option("checkpointLocation", "/checkpoints/user_counts") \\
    .toTable("analytics.user_event_counts")
\`\`\``, en: `## Structured Streaming

Structured Streaming treats real-time data as an **infinitely growing table**.

### Read and Write Streams

\`\`\`python
# READ STREAM from files (Auto Loader)
df_stream = spark.readStream \\
    .format("cloudFiles") \\
    .option("cloudFiles.format", "json") \\
    .load("s3://bucket/landing/")

# Transformations (SAME as batch!)
df_transformed = df_stream.filter(col("value") > 100)

# WRITE STREAM to Delta
query = df_transformed.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .option("checkpointLocation", "/checkpoints/") \\
    .start("/output/")
\`\`\`

### Output Modes
- **append**: Only new rows
- **complete**: Entire table (with aggregations)
- **update**: Modified rows`, pt: `## Structured Streaming

Structured Streaming trata dados em tempo real como uma **tabela que cresce infinitamente**.

\`\`\`python
# LER STREAM de arquivos
df_stream = spark.readStream \\
    .format("cloudFiles") \\
    .option("cloudFiles.format", "json") \\
    .load("s3://bucket/landing/")

# ESCREVER STREAM para Delta
query = df_transformed.writeStream \\
    .format("delta") \\
    .outputMode("append") \\
    .start("/output/")
\`\`\`` },
      practicalTips: [
        { es: '💡 El código de streaming es casi idéntico al de batch. Esa es la magia de Structured Streaming.', en: '💡 Streaming code is almost identical to batch. That\'s the magic.', pt: '💡 O código de streaming é quase idêntico ao de batch.' },
        { es: '⚠️ checkpointLocation es OBLIGATORIO. Sin él, perdes el estado si el job falla.', en: '⚠️ checkpointLocation is MANDATORY. Without it, you lose state if job fails.', pt: '⚠️ checkpointLocation é OBRIGATÓRIO. Sem ele, você perde o estado se o job falhar.' }
      ],
      externalLinks: [{ title: 'Structured Streaming Guide', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Ejecutaste un stream y verificaste que los datos se escribieron incrementalmente?', en: '✅ Did you run a stream and verify data was written incrementally?', pt: '✅ Você executou um stream e verificou que os dados foram escritos incrementalmente?' },
      xpReward: 35,
      estimatedMinutes: 35
    },
    {
      id: 'db-4-7b',
      title: { es: 'Triggers en Streaming', en: 'Streaming Triggers', pt: 'Triggers em Streaming' },
      description: { es: 'Controla CUÁNDO y CON QUÉ FRECUENCIA se procesan los micro-batches.', en: 'Control WHEN and HOW OFTEN micro-batches are processed.', pt: 'Controle QUANDO e COM QUE FREQUÊNCIA os micro-batches são processados.' },
      theory: { es: `## Triggers: Control de Ejecución

Los triggers controlan **cuándo** Spark procesa los nuevos datos.

### Tipos de Triggers

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    TIPOS DE TRIGGERS                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Default (sin trigger)                                   │
│     └── Procesa apenas termina el batch anterior            │
│         Latencia: ~100ms                                    │
│                                                              │
│  2. processingTime("10 seconds")                            │
│     └── Procesa cada X tiempo                               │
│         Latencia: X segundos                                │
│                                                              │
│  3. availableNow() ⭐ NUEVO Y RECOMENDADO                   │
│     └── Procesa TODO lo disponible y TERMINA                │
│         Ideal para: Jobs schedulados                        │
│                                                              │
│  4. once() [DEPRECADO - usar availableNow]                  │
│     └── Un solo batch y termina                             │
│                                                              │
│  5. continuous("1 second") [Experimental]                   │
│     └── True streaming (latencia ~1ms)                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Código de Cada Trigger

\`\`\`python
# Los triggers se pasan como argumentos a writeStream
# No necesitas importar nada adicional

# 1. DEFAULT - procesa continuamente
query = df.writeStream \\
    .format("delta") \\
    .start()  # Sin trigger = default

# 2. PROCESSING TIME - cada X tiempo
query = df.writeStream \\
    .format("delta") \\
    .trigger(processingTime="30 seconds") \\
    .start()

# 3. AVAILABLE NOW ⭐ (Spark 3.3+) - RECOMENDADO
# Procesa todo lo disponible y termina elegantemente
query = df.writeStream \\
    .format("delta") \\
    .trigger(availableNow=True) \\
    .start()

# 4. ONCE [DEPRECADO]
query = df.writeStream \\
    .format("delta") \\
    .trigger(once=True) \\
    .start()

# 5. CONTINUOUS (experimental) - ultra-baja latencia
query = df.writeStream \\
    .format("console") \\
    .trigger(continuous="1 second") \\
    .start()
\`\`\`

### ¿Cuál Usar? Guía Práctica

| Escenario | Trigger Recomendado |
|-----------|---------------------|
| Job diario/horario (Workflow) | \`availableNow=True\` ⭐ |
| Dashboard near-real-time | \`processingTime="1 minute"\` |
| Alertas en tiempo real | \`processingTime="10 seconds"\` |
| Streaming 24/7 | Default (sin trigger) |
| Ultra-baja latencia | \`continuous\` (experimental) |

### availableNow vs once

\`\`\`
ONCE (deprecado):
- Procesa UN solo micro-batch
- Si hay mucha data, puede dejar datos sin procesar
- No recomendado

AVAILABLE_NOW (nuevo):
- Procesa TODOS los micro-batches disponibles
- Garantiza que procesa todo lo pendiente
- Termina limpiamente cuando no hay más datos
- IDEAL para jobs de Databricks Workflows
\`\`\`

### Ejemplo: Pipeline con Trigger.AvailableNow

\`\`\`python
# Pipeline típico de producción con Workflow
def run_streaming_job():
    df = spark.readStream \\
        .format("cloudFiles") \\
        .option("cloudFiles.format", "json") \\
        .load("/data/incoming/")
    
    result = df.withColumn("processed_at", current_timestamp())
    
    query = result.writeStream \\
        .format("delta") \\
        .outputMode("append") \\
        .trigger(availableNow=True) \\
        .option("checkpointLocation", "/checkpoints/job") \\
        .toTable("silver.processed_events")
    
    query.awaitTermination()  # Espera hasta que termine
    
    print(f"Procesados: {query.lastProgress['numInputRows']} rows")

# Este código se puede ejecutar cada hora via Databricks Workflow
run_streaming_job()
\`\`\``, en: `## Triggers: Execution Control

Triggers control WHEN Spark processes new data.

\`\`\`python
# AVAILABLE NOW (Spark 3.3+) - RECOMMENDED
query = df.writeStream \\
    .trigger(availableNow=True) \\
    .start()

# PROCESSING TIME - every X time
query = df.writeStream \\
    .trigger(processingTime="30 seconds") \\
    .start()
\`\`\`

### When to Use
- Scheduled jobs: availableNow=True
- Near-real-time: processingTime
- 24/7 streaming: Default`, pt: `## Triggers: Controle de Execução

Triggers controlam QUANDO Spark processa novos dados.

\`\`\`python
# AVAILABLE NOW (Spark 3.3+) - RECOMENDADO
query = df.writeStream \\
    .trigger(availableNow=True) \\
    .start()
\`\`\`` },
      practicalTips: [
        { es: '⭐ availableNow es el estándar actual (2024) para jobs schedulados. Trigger.once está deprecado.', en: '⭐ availableNow is the current standard (2024) for scheduled jobs. Trigger.once is deprecated.', pt: '⭐ availableNow é o padrão atual (2024) para jobs schedulados. Trigger.once está deprecado.' },
        { es: '🎯 Para pipelines de Databricks Workflows, SIEMPRE usa availableNow=True.', en: '🎯 For Databricks Workflows pipelines, ALWAYS use availableNow=True.', pt: '🎯 Para pipelines de Databricks Workflows, SEMPRE use availableNow=True.' }
      ],
      externalLinks: [
        { title: 'Triggers', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#triggers', type: 'docs' },
        { title: 'availableNow', url: 'https://docs.databricks.com/structured-streaming/triggers.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Ejecutaste un stream con trigger availableNow y verificaste que terminó correctamente?', en: '✅ Did you run a stream with availableNow trigger and verify it completed correctly?', pt: '✅ Você executou um stream com trigger availableNow e verificou que terminou corretamente?' },
      xpReward: 30,
      estimatedMinutes: 25
    },
    {
      id: 'db-4-7c',
      title: { es: 'foreachBatch: Lógica Custom en Streaming', en: 'foreachBatch: Custom Streaming Logic', pt: 'foreachBatch: Lógica Custom em Streaming' },
      description: { es: 'El patrón más poderoso para streaming en producción: ejecuta código custom en cada micro-batch.', en: 'The most powerful pattern for production streaming: execute custom code on each micro-batch.', pt: 'O padrão mais poderoso para streaming em produção: execute código custom em cada micro-batch.' },
      theory: { es: `## foreachBatch: El Patrón de Producción

foreachBatch te permite ejecutar **cualquier código** en cada micro-batch del stream.

### ¿Por qué es tan Importante?

\`\`\`
Stream normal:          Con foreachBatch:
                        
df.writeStream         df.writeStream
  .format("delta")       .foreachBatch(mi_funcion)
  .start()               .start()
     │                       │
     ▼                       ▼
  Solo escribe          Puedes hacer:
  a Delta               - MERGE/upsert
                        - Multi-table writes
                        - Notificaciones
                        - Métricas custom
                        - Llamadas a APIs
                        - Lo que quieras!
\`\`\`

### Sintaxis Básica

\`\`\`python
def process_batch(batch_df, batch_id):
    """
    Esta función se ejecuta en cada micro-batch.
    
    Args:
        batch_df: DataFrame con los datos del batch (es un DF normal!)
        batch_id: ID único del batch (para idempotencia)
    """
    print(f"Procesando batch {batch_id} con {batch_df.count()} rows")
    
    # batch_df es un DataFrame NORMAL - puedes hacer lo que quieras
    batch_df.write.format("delta").mode("append").save("/output/")

# Usar foreachBatch
query = df_stream.writeStream \\
    .foreachBatch(process_batch) \\
    .option("checkpointLocation", "/checkpoints/") \\
    .start()
\`\`\`

### Caso de Uso 1: MERGE (Upsert) en Streaming

\`\`\`python
from delta.tables import DeltaTable

def upsert_to_delta(batch_df, batch_id):
    """MERGE de datos streaming a tabla Delta"""
    
    # Referencia a la tabla destino
    delta_table = DeltaTable.forPath(spark, "/tables/customers")
    
    # MERGE: update si existe, insert si no
    delta_table.alias("target").merge(
        batch_df.alias("source"),
        "target.customer_id = source.customer_id"
    ).whenMatchedUpdate(set={
        "name": "source.name",
        "email": "source.email",
        "updated_at": "source.updated_at"
    }).whenNotMatchedInsertAll() \\
    .execute()

# Stream con upsert
query = events_stream.writeStream \\
    .foreachBatch(upsert_to_delta) \\
    .option("checkpointLocation", "/checkpoints/upsert") \\
    .trigger(availableNow=True) \\
    .start()
\`\`\`

### Caso de Uso 2: Escribir a Múltiples Tablas

\`\`\`python
def write_to_multiple_tables(batch_df, batch_id):
    """Escribe el mismo batch a varias tablas"""
    
    # Tabla principal
    batch_df.write.format("delta").mode("append").saveAsTable("silver.events")
    
    # Tabla de métricas agregadas
    metrics = batch_df.groupBy("event_type").count()
    metrics.write.format("delta").mode("overwrite").saveAsTable("gold.event_counts")
    
    # Log de auditoría
    audit = batch_df.select("event_id", "timestamp").withColumn("processed_at", current_timestamp())
    audit.write.format("delta").mode("append").saveAsTable("audit.processing_log")

query = stream.writeStream \\
    .foreachBatch(write_to_multiple_tables) \\
    .start()
\`\`\`

### Caso de Uso 3: Notificaciones y Métricas

\`\`\`python
import requests

def process_with_notification(batch_df, batch_id):
    """Procesa datos y envía notificación si hay alertas"""
    
    # Escribir datos
    batch_df.write.format("delta").mode("append").save("/data/events/")
    
    # Detectar alertas
    alerts = batch_df.filter(col("severity") == "CRITICAL")
    alert_count = alerts.count()
    
    if alert_count > 0:
        # Enviar a Slack
        webhook_url = dbutils.secrets.get("alerts", "slack_webhook")
        requests.post(webhook_url, json={
            "text": f"🚨 {alert_count} alertas críticas detectadas en batch {batch_id}"
        })
    
    # Publicar métricas
    print(f"Batch {batch_id}: {batch_df.count()} events, {alert_count} alerts")

query = events.writeStream \\
    .foreachBatch(process_with_notification) \\
    .start()
\`\`\`

### Idempotencia: Evitar Duplicados

\`\`\`python
def idempotent_write(batch_df, batch_id):
    """Escritura idempotente usando batch_id"""
    
    # Agregar batch_id como columna para tracking
    batch_with_id = batch_df.withColumn("_batch_id", lit(batch_id))
    
    # Usar MERGE para evitar duplicados si se re-procesa el batch
    delta_table = DeltaTable.forPath(spark, "/output/")
    delta_table.alias("t").merge(
        batch_with_id.alias("s"),
        "t.event_id = s.event_id"
    ).whenNotMatchedInsertAll().execute()

# Si el job falla y se reinicia, no hay duplicados
query = stream.writeStream \\
    .foreachBatch(idempotent_write) \\
    .option("checkpointLocation", "/checkpoints/") \\
    .start()
\`\`\``, en: `## foreachBatch: Production Pattern

foreachBatch lets you run **any code** on each micro-batch.

\`\`\`python
def process_batch(batch_df, batch_id):
    # batch_df is a normal DataFrame
    batch_df.write.format("delta").save("/output/")

query = stream.writeStream \\
    .foreachBatch(process_batch) \\
    .start()
\`\`\`

### Use Cases
- MERGE/upsert in streaming
- Write to multiple tables
- Send notifications
- Custom metrics`, pt: `## foreachBatch: Padrão de Produção

foreachBatch permite executar **qualquer código** em cada micro-batch.

\`\`\`python
def process_batch(batch_df, batch_id):
    batch_df.write.format("delta").save("/output/")

query = stream.writeStream \\
    .foreachBatch(process_batch) \\
    .start()
\`\`\`` },
      practicalTips: [
        { es: '🏆 foreachBatch es el patrón #1 en pipelines streaming de producción. Dominalo.', en: '🏆 foreachBatch is pattern #1 in production streaming pipelines. Master it.', pt: '🏆 foreachBatch é o padrão #1 em pipelines streaming de produção. Domine-o.' },
        { es: '⚠️ batch_df es un DataFrame NORMAL - puedes usar todas las funciones de Spark.', en: '⚠️ batch_df is a NORMAL DataFrame - you can use all Spark functions.', pt: '⚠️ batch_df é um DataFrame NORMAL - você pode usar todas as funções do Spark.' },
        { es: '🔄 Usa batch_id para idempotencia - si el job falla, puede reprocessar sin duplicados.', en: '🔄 Use batch_id for idempotency - if job fails, it can reprocess without duplicates.', pt: '🔄 Use batch_id para idempotência - se o job falhar, pode reprocessar sem duplicados.' }
      ],
      externalLinks: [
        { title: 'foreachBatch', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#foreachbatch', type: 'docs' },
        { title: 'Upsert from Streaming', url: 'https://docs.databricks.com/delta/delta-update.html#upsert-from-streaming-queries-using-foreachbatch', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Implementaste un stream con foreachBatch que hace MERGE a una tabla Delta?', en: '✅ Did you implement a stream with foreachBatch that does MERGE to a Delta table?', pt: '✅ Você implementou um stream com foreachBatch que faz MERGE para uma tabela Delta?' },
      xpReward: 40,
      estimatedMinutes: 40
    },
    {
      id: 'db-4-7d',
      title: { es: 'Watermarking: Manejo de Late Data', en: 'Watermarking: Handling Late Data', pt: 'Watermarking: Lidando com Late Data' },
      description: { es: 'En el mundo real, los datos llegan tarde. Watermarking te permite manejar late arrivals elegantemente.', en: 'In the real world, data arrives late. Watermarking lets you handle late arrivals elegantly.', pt: 'No mundo real, os dados chegam atrasados. Watermarking permite lidar com late arrivals elegantemente.' },
      theory: { es: `## Watermarking: El Problema de Late Data

En streaming real, los datos pueden llegar tarde por:
- Latencia de red
- Dispositivos offline que reconectan
- Buffers en sistemas upstream

### El Problema

\`\`\`
Tiempo real:    10:00    10:01    10:02    10:03
                  │        │        │        │
Eventos:        [A,B]    [C,D]    [E,F]    [G,H]
                                     │
                                     └─── Evento X llega con timestamp 10:00
                                          (2 minutos tarde!)

Pregunta: ¿Incluimos X en la agregación de 10:00?
          ¿Hasta cuándo esperamos datos tardíos?
\`\`\`

### La Solución: Watermark

\`\`\`
Watermark = "Acepto datos hasta N tiempo de retraso"

Si watermark = "10 minutes":
- Evento de 10:00 que llega a las 10:05 → ✅ Aceptado
- Evento de 10:00 que llega a las 10:15 → ❌ Descartado
\`\`\`

### Sintaxis

\`\`\`python
from pyspark.sql.functions import window, col

# DEFINIR WATERMARK
df_with_watermark = df_stream \\
    .withWatermark("event_timestamp", "10 minutes")

# AGREGAR POR VENTANA DE TIEMPO
result = df_with_watermark \\
    .groupBy(
        window("event_timestamp", "5 minutes"),  # Ventanas de 5 min
        "category"
    ) \\
    .agg(
        count("*").alias("event_count"),
        sum("amount").alias("total_amount")
    )

# Escribir (update mode funciona con watermark)
query = result.writeStream \\
    .format("delta") \\
    .outputMode("update") \\
    .option("checkpointLocation", "/checkpoints/windowed") \\
    .start()
\`\`\`

### Cómo Funciona el Watermark

\`\`\`
Timeline de eventos (watermark = 5 min):

Tiempo      Evento          Watermark      ¿Aceptado?
─────────────────────────────────────────────────────
10:00       A (ts=10:00)    09:55          ✅ Sí
10:01       B (ts=10:00)    09:56          ✅ Sí
10:02       C (ts=09:55)    09:57          ✅ Sí (dentro de 5min)
10:05       D (ts=09:58)    10:00          ✅ Sí (dentro de 5min)
10:07       E (ts=09:50)    10:02          ❌ No (más de 5min tarde)

Watermark = max(event_timestamp) - threshold
\`\`\`

### Ejemplo Completo: Métricas por Ventana

\`\`\`python
from pyspark.sql.functions import *

# Stream de transacciones
transactions = spark.readStream \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "broker:9092") \\
    .option("subscribe", "transactions") \\
    .load() \\
    .select(
        from_json(col("value").cast("string"), schema).alias("data")
    ).select("data.*")

# Aplicar watermark de 15 minutos
windowed_metrics = transactions \\
    .withWatermark("transaction_time", "15 minutes") \\
    .groupBy(
        window("transaction_time", "5 minutes", "1 minute"),  # Sliding window
        "merchant_category"
    ) \\
    .agg(
        count("*").alias("tx_count"),
        sum("amount").alias("total_amount"),
        avg("amount").alias("avg_amount"),
        max("amount").alias("max_amount")
    )

# Output a Delta con update mode
query = windowed_metrics.writeStream \\
    .format("delta") \\
    .outputMode("update") \\
    .option("checkpointLocation", "/checkpoints/tx_metrics") \\
    .trigger(processingTime="1 minute") \\
    .toTable("gold.transaction_metrics")
\`\`\`

### Tipos de Ventanas

\`\`\`python
# TUMBLING WINDOW (ventanas fijas sin overlap)
window("timestamp", "5 minutes")
# 10:00-10:05, 10:05-10:10, 10:10-10:15...

# SLIDING WINDOW (con overlap)
window("timestamp", "10 minutes", "5 minutes")
# 10:00-10:10, 10:05-10:15, 10:10-10:20...

# SESSION WINDOW (basado en actividad)
session_window("timestamp", "10 minutes")
# Agrupa eventos cercanos, gap de 10min crea nueva sesión
\`\`\`

### ¿Qué Watermark Elegir?

| Escenario | Watermark Sugerido |
|-----------|-------------------|
| IoT con conexión estable | 5-10 minutos |
| Mobile apps (usuarios offline) | 30-60 minutos |
| Sistemas legacy batch | 1-4 horas |
| Dispositivos que syncan diario | 24 horas |`, en: `## Watermarking: Late Data Problem

In real streaming, data can arrive late. Watermarking handles this.

\`\`\`python
# Accept data up to 10 minutes late
df_with_watermark = df_stream \\
    .withWatermark("timestamp", "10 minutes")

# Aggregate with time windows
result = df_with_watermark \\
    .groupBy(window("timestamp", "5 minutes")) \\
    .count()
\`\`\``, pt: `## Watermarking: Problema de Late Data

Em streaming real, dados podem chegar atrasados. Watermarking lida com isso.

\`\`\`python
# Aceitar dados até 10 minutos atrasados
df_with_watermark = df_stream \\
    .withWatermark("timestamp", "10 minutes")

# Agregar com janelas de tempo
result = df_with_watermark \\
    .groupBy(window("timestamp", "5 minutes")) \\
    .count()
\`\`\`` },
      practicalTips: [
        { es: '⏰ El watermark debe ser >= al retraso máximo esperado de tus datos.', en: '⏰ Watermark should be >= the maximum expected delay of your data.', pt: '⏰ O watermark deve ser >= ao atraso máximo esperado dos seus dados.' },
        { es: '📊 Watermark muy pequeño = pierdes datos tardíos. Muy grande = usas más memoria.', en: '📊 Too small watermark = lose late data. Too large = use more memory.', pt: '📊 Watermark muito pequeno = perde dados atrasados. Muito grande = usa mais memória.' },
        { es: '🎯 Esta es pregunta FRECUENTE en entrevistas de DE Senior con Spark.', en: '🎯 This is a FREQUENT question in Senior DE interviews with Spark.', pt: '🎯 Esta é pergunta FREQUENTE em entrevistas de DE Senior com Spark.' }
      ],
      externalLinks: [
        { title: 'Watermarking', url: 'https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html#handling-late-data-and-watermarking', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Implementaste una agregación con ventana de tiempo y watermark?', en: '✅ Did you implement an aggregation with time window and watermark?', pt: '✅ Você implementou uma agregação com janela de tempo e watermark?' },
      xpReward: 35,
      estimatedMinutes: 35
    },
    {
      id: 'db-4-8',
      title: { es: 'Configuración de Spark', en: 'Spark Configuration', pt: 'Configuração do Spark' },
      description: { es: 'Las configuraciones correctas pueden mejorar drásticamente la performance.', en: 'Correct configurations can dramatically improve performance.', pt: 'As configurações corretas podem melhorar drasticamente a performance.' },
      theory: { es: `## Configuraciones Importantes\n\n\`\`\`python\n# Ver configuración actual\nspark.conf.get("spark.sql.shuffle.partitions")\n\n# Cambiar en runtime\nspark.conf.set("spark.sql.shuffle.partitions", "200")\n\n# Configuraciones clave:\n\n# Particiones de shuffle (default 200, ajustar según datos)\nspark.conf.set("spark.sql.shuffle.partitions", "auto")\n\n# Adaptive Query Execution\nspark.conf.set("spark.sql.adaptive.enabled", "true")\n\n# Broadcast threshold (bytes)\nspark.conf.set("spark.sql.autoBroadcastJoinThreshold", "10MB")\n\n# Memoria del driver\nspark.conf.set("spark.driver.memory", "4g")\n\n# Memoria del executor\nspark.conf.set("spark.executor.memory", "8g")\n\`\`\`\n\n### En Databricks:\nMuchas configuraciones se manejan al crear el cluster en la UI.`, en: `## Important Configurations\n\n\`\`\`python\n# View current configuration\nspark.conf.get("spark.sql.shuffle.partitions")\n\n# Change at runtime\nspark.conf.set("spark.sql.shuffle.partitions", "200")\n\n# Key configurations:\n\n# Shuffle partitions (default 200, adjust based on data)\nspark.conf.set("spark.sql.shuffle.partitions", "auto")\n\n# Adaptive Query Execution\nspark.conf.set("spark.sql.adaptive.enabled", "true")\n\n# Broadcast threshold (bytes)\nspark.conf.set("spark.sql.autoBroadcastJoinThreshold", "10MB")\n\n# Driver memory\nspark.conf.set("spark.driver.memory", "4g")\n\n# Executor memory\nspark.conf.set("spark.executor.memory", "8g")\n\`\`\`\n\n### In Databricks:\nMany configurations are managed when creating the cluster in the UI.`, pt: `## Configurações Importantes\n\n\`\`\`python\n# Ver configuração atual\nspark.conf.get("spark.sql.shuffle.partitions")\n\n# Mudar em runtime\nspark.conf.set("spark.sql.shuffle.partitions", "200")\n\n# Configurações chave:\n\n# Partições de shuffle (default 200, ajustar conforme dados)\nspark.conf.set("spark.sql.shuffle.partitions", "auto")\n\n# Adaptive Query Execution\nspark.conf.set("spark.sql.adaptive.enabled", "true")\n\n# Broadcast threshold (bytes)\nspark.conf.set("spark.sql.autoBroadcastJoinThreshold", "10MB")\n\n# Memória do driver\nspark.conf.set("spark.driver.memory", "4g")\n\n# Memória do executor\nspark.conf.set("spark.executor.memory", "8g")\n\`\`\`\n\n### No Databricks:\nMuitas configurações são gerenciadas ao criar o cluster na UI.` },
      practicalTips: [{ es: '⚡ spark.sql.shuffle.partitions="auto" + AQE es la mejor configuración default.', en: '⚡ spark.sql.shuffle.partitions="auto" + AQE is the best default config.', pt: '⚡ spark.sql.shuffle.partitions="auto" + AQE é a melhor config padrão.' }],
      externalLinks: [{ title: 'Configuration', url: 'https://spark.apache.org/docs/latest/configuration.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Experimentaste con diferentes valores de shuffle.partitions?', en: '✅ Did you experiment with different shuffle.partitions values?', pt: '✅ Você experimentou com diferentes valores de shuffle.partitions?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-4-9',
      title: { es: 'Schema Types: StructType y StructField', en: 'Schema Types: StructType and StructField', pt: 'Schema Types: StructType e StructField' },
      description: { es: 'Definí schemas explícitos para mejor control y performance.', en: 'Define explicit schemas for better control and performance.', pt: 'Defina schemas explícitos para melhor controle e performance.' },
      theory: { es: `## Definir Schemas Explícitos\n\n\`\`\`python\nfrom pyspark.sql.types import *\n\n# Definir schema\nschema = StructType([\n    StructField("id", IntegerType(), nullable=False),\n    StructField("nombre", StringType(), nullable=True),\n    StructField("precio", DoubleType(), nullable=True),\n    StructField("fecha", DateType(), nullable=True),\n    StructField("activo", BooleanType(), nullable=True)\n])\n\n# Usar al leer\ndf = spark.read.schema(schema).csv("path")\n\n# Schema anidado (JSON)\nschema_complejo = StructType([\n    StructField("usuario", StructType([\n        StructField("id", IntegerType()),\n        StructField("nombre", StringType())\n    ])),\n    StructField("items", ArrayType(StructType([\n        StructField("producto", StringType()),\n        StructField("cantidad", IntegerType())\n    ])))\n])\n\`\`\`\n\n### Tipos disponibles:\n- StringType, IntegerType, LongType, DoubleType, FloatType\n- BooleanType, DateType, TimestampType\n- ArrayType, MapType, StructType\n\n### ¿Por qué usar schema explícito?\n✅ Más rápido (no inferSchema)\n✅ Más control sobre tipos\n✅ Detecta errores temprano\n✅ Documentación del dato`, en: `## Define Explicit Schemas\n\n\`\`\`python\nfrom pyspark.sql.types import *\n\n# Define schema\nschema = StructType([\n    StructField("id", IntegerType(), nullable=False),\n    StructField("name", StringType(), nullable=True),\n    StructField("price", DoubleType(), nullable=True),\n    StructField("date", DateType(), nullable=True),\n    StructField("active", BooleanType(), nullable=True)\n])\n\n# Use when reading\ndf = spark.read.schema(schema).csv("path")\n\n# Nested schema (JSON)\ncomplex_schema = StructType([\n    StructField("user", StructType([\n        StructField("id", IntegerType()),\n        StructField("name", StringType())\n    ])),\n    StructField("items", ArrayType(StructType([\n        StructField("product", StringType()),\n        StructField("quantity", IntegerType())\n    ])))\n])\n\`\`\`\n\n### Available types:\n- StringType, IntegerType, LongType, DoubleType, FloatType\n- BooleanType, DateType, TimestampType\n- ArrayType, MapType, StructType\n\n### Why use explicit schema?\n✅ Faster (no inferSchema)\n✅ More control over types\n✅ Detect errors early\n✅ Data documentation`, pt: `## Definir Schemas Explícitos\n\n\`\`\`python\nfrom pyspark.sql.types import *\n\n# Definir schema\nschema = StructType([\n    StructField("id", IntegerType(), nullable=False),\n    StructField("nome", StringType(), nullable=True),\n    StructField("preco", DoubleType(), nullable=True),\n    StructField("data", DateType(), nullable=True),\n    StructField("ativo", BooleanType(), nullable=True)\n])\n\n# Usar ao ler\ndf = spark.read.schema(schema).csv("path")\n\n# Schema aninhado (JSON)\nschema_complexo = StructType([\n    StructField("usuario", StructType([\n        StructField("id", IntegerType()),\n        StructField("nome", StringType())\n    ])),\n    StructField("items", ArrayType(StructType([\n        StructField("produto", StringType()),\n        StructField("quantidade", IntegerType())\n    ])))\n])\n\`\`\`\n\n### Tipos disponíveis:\n- StringType, IntegerType, LongType, DoubleType, FloatType\n- BooleanType, DateType, TimestampType\n- ArrayType, MapType, StructType\n\n### Por que usar schema explícito?\n✅ Mais rápido (sem inferSchema)\n✅ Mais controle sobre tipos\n✅ Detecta erros cedo\n✅ Documentação do dado` },
      practicalTips: [{ es: '⚡ inferSchema=True lee el archivo 2 veces. Con schema explícito solo 1 vez.', en: '⚡ inferSchema=True reads the file twice. With explicit schema only once.', pt: '⚡ inferSchema=True lê o arquivo 2 vezes. Com schema explícito só 1 vez.' }],
      externalLinks: [{ title: 'Data Types', url: 'https://spark.apache.org/docs/latest/sql-ref-datatypes.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Definiste un schema con StructType y lo usaste para leer datos?', en: '✅ Did you define a schema with StructType and use it to read data?', pt: '✅ Você definiu um schema com StructType e usou para ler dados?' },
      xpReward: 25,
      estimatedMinutes: 20
    },
    {
      id: 'db-4-10',
      title: { es: 'Higher-Order Functions', en: 'Higher-Order Functions', pt: 'Higher-Order Functions' },
      description: { es: 'Funciones avanzadas para trabajar con arrays y estructuras complejas.', en: 'Advanced functions for working with arrays and complex structures.', pt: 'Funções avançadas para trabalhar com arrays e estruturas complexas.' },
      theory: { es: `## Higher-Order Functions\n\nFunciones que operan sobre arrays y maps.\n\n### TRANSFORM - Aplicar función a cada elemento:\n\`\`\`python\nfrom pyspark.sql.functions import transform, col\n\n# Duplicar cada elemento del array\ndf.select(transform("numeros", lambda x: x * 2).alias("dobles"))\n\n# En SQL:\n# SELECT transform(numeros, x -> x * 2) FROM tabla\n\`\`\`\n\n### FILTER - Filtrar elementos del array:\n\`\`\`python\nfrom pyspark.sql.functions import filter\n\n# Solo números positivos\ndf.select(filter("numeros", lambda x: x > 0).alias("positivos"))\n\n# En SQL:\n# SELECT filter(numeros, x -> x > 0) FROM tabla\n\`\`\`\n\n### AGGREGATE - Reducir array a un valor:\n\`\`\`python\nfrom pyspark.sql.functions import aggregate\n\n# Sumar todos los elementos\ndf.select(aggregate(\n    "numeros",\n    lit(0),  # valor inicial\n    lambda acc, x: acc + x  # función de acumulación\n).alias("suma"))\n\`\`\`\n\n### EXISTS - Verificar si existe elemento:\n\`\`\`python\nfrom pyspark.sql.functions import exists\n\n# ¿Hay algún negativo?\ndf.select(exists("numeros", lambda x: x < 0).alias("tiene_negativo"))\n\`\`\`\n\n### FORALL - Verificar todos los elementos:\n\`\`\`python\nfrom pyspark.sql.functions import forall\n\n# ¿Todos son positivos?\ndf.select(forall("numeros", lambda x: x > 0).alias("todos_positivos"))\n\`\`\``, en: `## Higher-Order Functions\n\nFunctions that operate on arrays and maps.\n\n### TRANSFORM - Apply function to each element:\n\`\`\`python\nfrom pyspark.sql.functions import transform, col\n\n# Double each array element\ndf.select(transform("numbers", lambda x: x * 2).alias("doubles"))\n\n# In SQL:\n# SELECT transform(numbers, x -> x * 2) FROM table\n\`\`\`\n\n### FILTER - Filter array elements:\n\`\`\`python\nfrom pyspark.sql.functions import filter\n\n# Only positive numbers\ndf.select(filter("numbers", lambda x: x > 0).alias("positives"))\n\n# In SQL:\n# SELECT filter(numbers, x -> x > 0) FROM table\n\`\`\`\n\n### AGGREGATE - Reduce array to a value:\n\`\`\`python\nfrom pyspark.sql.functions import aggregate\n\n# Sum all elements\ndf.select(aggregate(\n    "numbers",\n    lit(0),  # initial value\n    lambda acc, x: acc + x  # accumulation function\n).alias("sum"))\n\`\`\`\n\n### EXISTS - Check if element exists:\n\`\`\`python\nfrom pyspark.sql.functions import exists\n\n# Any negative?\ndf.select(exists("numbers", lambda x: x < 0).alias("has_negative"))\n\`\`\`\n\n### FORALL - Check all elements:\n\`\`\`python\nfrom pyspark.sql.functions import forall\n\n# All positive?\ndf.select(forall("numbers", lambda x: x > 0).alias("all_positive"))\n\`\`\``, pt: `## Higher-Order Functions\n\nFunções que operam em arrays e maps.\n\n### TRANSFORM - Aplicar função a cada elemento:\n\`\`\`python\nfrom pyspark.sql.functions import transform, col\n\n# Duplicar cada elemento do array\ndf.select(transform("numeros", lambda x: x * 2).alias("dobros"))\n\n# Em SQL:\n# SELECT transform(numeros, x -> x * 2) FROM tabela\n\`\`\`\n\n### FILTER - Filtrar elementos do array:\n\`\`\`python\nfrom pyspark.sql.functions import filter\n\n# Só números positivos\ndf.select(filter("numeros", lambda x: x > 0).alias("positivos"))\n\n# Em SQL:\n# SELECT filter(numeros, x -> x > 0) FROM tabela\n\`\`\`\n\n### AGGREGATE - Reduzir array a um valor:\n\`\`\`python\nfrom pyspark.sql.functions import aggregate\n\n# Somar todos os elementos\ndf.select(aggregate(\n    "numeros",\n    lit(0),  # valor inicial\n    lambda acc, x: acc + x  # função de acumulação\n).alias("soma"))\n\`\`\`\n\n### EXISTS - Verificar se existe elemento:\n\`\`\`python\nfrom pyspark.sql.functions import exists\n\n# Há algum negativo?\ndf.select(exists("numeros", lambda x: x < 0).alias("tem_negativo"))\n\`\`\`\n\n### FORALL - Verificar todos os elementos:\n\`\`\`python\nfrom pyspark.sql.functions import forall\n\n# Todos são positivos?\ndf.select(forall("numeros", lambda x: x > 0).alias("todos_positivos"))\n\`\`\`` },
      practicalTips: [{ es: '⭐ Estas funciones son pregunta frecuente en el examen de certificación.', en: '⭐ These functions are frequently asked in the certification exam.', pt: '⭐ Estas funções são pergunta frequente no exame de certificação.' }],
      externalLinks: [{ title: 'Higher-Order Functions', url: 'https://docs.databricks.com/sql/language-manual/functions/transform.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Usaste transform y filter en un array?', en: '✅ Did you use transform and filter on an array?', pt: '✅ Você usou transform e filter em um array?' },
      xpReward: 30,
      estimatedMinutes: 25
    },
    {
      id: 'db-4-11',
      title: { es: 'Spark SQL vs DataFrame API', en: 'Spark SQL vs DataFrame API', pt: 'Spark SQL vs DataFrame API' },
      description: { es: 'Cuándo usar SQL y cuándo usar DataFrame API.', en: 'When to use SQL and when to use DataFrame API.', pt: 'Quando usar SQL e quando usar DataFrame API.' },
      theory: { es: `## Spark SQL vs DataFrame API\n\nAmbos generan el mismo plan de ejecución.\n\n### Misma operación, dos formas:\n\n**DataFrame API:**\n\`\`\`python\nfrom pyspark.sql.functions import *\n\nresult = (df\n    .filter(col("estado") == "activo")\n    .groupBy("categoria")\n    .agg(\n        sum("ventas").alias("total"),\n        avg("precio").alias("promedio")\n    )\n    .orderBy(desc("total"))\n)\n\`\`\`\n\n**Spark SQL:**\n\`\`\`python\ndf.createOrReplaceTempView("ventas")\n\nresult = spark.sql("""\n    SELECT \n        categoria,\n        SUM(ventas) as total,\n        AVG(precio) as promedio\n    FROM ventas\n    WHERE estado = 'activo'\n    GROUP BY categoria\n    ORDER BY total DESC\n""")\n\`\`\`\n\n### ¿Cuándo usar cada uno?\n\n| Caso | Recomendación |\n|------|---------------|\n| Queries ad-hoc | SQL ✅ |\n| Pipelines de ETL | DataFrame ✅ |\n| Lógica condicional compleja | DataFrame ✅ |\n| Reportes/dashboards | SQL ✅ |\n| Código reutilizable | DataFrame ✅ |\n| Usuarios de negocio | SQL ✅ |\n\n### Mezclar ambos:\n\`\`\`python\n# Crear view del DataFrame\ndf.createOrReplaceTempView("tabla")\n\n# Usar SQL\nresult = spark.sql("SELECT * FROM tabla WHERE x > 10")\n\n# Volver a DataFrame\nresult.filter(col("y") < 100)\n\`\`\``, en: `## Spark SQL vs DataFrame API\n\nBoth generate the same execution plan.\n\n### Same operation, two ways:\n\n**DataFrame API:**\n\`\`\`python\nfrom pyspark.sql.functions import *\n\nresult = (df\n    .filter(col("status") == "active")\n    .groupBy("category")\n    .agg(\n        sum("sales").alias("total"),\n        avg("price").alias("average")\n    )\n    .orderBy(desc("total"))\n)\n\`\`\`\n\n**Spark SQL:**\n\`\`\`python\ndf.createOrReplaceTempView("sales")\n\nresult = spark.sql("""\n    SELECT \n        category,\n        SUM(sales) as total,\n        AVG(price) as average\n    FROM sales\n    WHERE status = 'active'\n    GROUP BY category\n    ORDER BY total DESC\n""")\n\`\`\`\n\n### When to use each?\n\n| Case | Recommendation |\n|------|---------------|\n| Ad-hoc queries | SQL ✅ |\n| ETL pipelines | DataFrame ✅ |\n| Complex conditional logic | DataFrame ✅ |\n| Reports/dashboards | SQL ✅ |\n| Reusable code | DataFrame ✅ |\n| Business users | SQL ✅ |\n\n### Mix both:\n\`\`\`python\n# Create view from DataFrame\ndf.createOrReplaceTempView("table")\n\n# Use SQL\nresult = spark.sql("SELECT * FROM table WHERE x > 10")\n\n# Back to DataFrame\nresult.filter(col("y") < 100)\n\`\`\``, pt: `## Spark SQL vs DataFrame API\n\nAmbos geram o mesmo plano de execução.\n\n### Mesma operação, duas formas:\n\n**DataFrame API:**\n\`\`\`python\nfrom pyspark.sql.functions import *\n\nresult = (df\n    .filter(col("status") == "ativo")\n    .groupBy("categoria")\n    .agg(\n        sum("vendas").alias("total"),\n        avg("preco").alias("media")\n    )\n    .orderBy(desc("total"))\n)\n\`\`\`\n\n**Spark SQL:**\n\`\`\`python\ndf.createOrReplaceTempView("vendas")\n\nresult = spark.sql("""\n    SELECT \n        categoria,\n        SUM(vendas) as total,\n        AVG(preco) as media\n    FROM vendas\n    WHERE status = 'ativo'\n    GROUP BY categoria\n    ORDER BY total DESC\n""")\n\`\`\`\n\n### Quando usar cada um?\n\n| Caso | Recomendação |\n|------|---------------|\n| Queries ad-hoc | SQL ✅ |\n| Pipelines de ETL | DataFrame ✅ |\n| Lógica condicional complexa | DataFrame ✅ |\n| Relatórios/dashboards | SQL ✅ |\n| Código reutilizável | DataFrame ✅ |\n| Usuários de negócio | SQL ✅ |\n\n### Misturar ambos:\n\`\`\`python\n# Criar view do DataFrame\ndf.createOrReplaceTempView("tabela")\n\n# Usar SQL\nresult = spark.sql("SELECT * FROM tabela WHERE x > 10")\n\n# Voltar para DataFrame\nresult.filter(col("y") < 100)\n\`\`\`` },
      practicalTips: [{ es: '💡 En Databricks, los notebooks SQL son perfectos para exploración. Python para ETL.', en: '💡 In Databricks, SQL notebooks are perfect for exploration. Python for ETL.', pt: '💡 No Databricks, notebooks SQL são perfeitos para exploração. Python para ETL.' }],
      externalLinks: [{ title: 'Spark SQL Guide', url: 'https://spark.apache.org/docs/latest/sql-programming-guide.html', type: 'docs' }],
      checkpoint: { es: '✅ ¿Escribiste la misma query en SQL y DataFrame API?', en: '✅ Did you write the same query in SQL and DataFrame API?', pt: '✅ Você escreveu a mesma query em SQL e DataFrame API?' },
      xpReward: 20,
      estimatedMinutes: 20
    },
    {
      id: 'db-4-12',
      title: { es: 'Quiz y Proyecto: Optimización', en: 'Quiz and Project: Optimization', pt: 'Quiz e Projeto: Otimização' },
      description: { es: 'Poné a prueba todo lo aprendido sobre Spark avanzado.', en: 'Test everything learned about advanced Spark.', pt: 'Teste tudo o que aprendeu sobre Spark avançado.' },
      theory: { es: `## Proyecto: Optimizar un Pipeline\n\nTomá el ETL de la fase anterior y optimizalo:\n\n### Checklist:\n- [ ] Identificar cuellos de botella en Spark UI\n- [ ] Aplicar broadcast join donde sea apropiado\n- [ ] Verificar y corregir skew si existe\n- [ ] Cachear DataFrames reutilizados\n- [ ] Particionar la salida correctamente\n- [ ] Configurar AQE\n\n### Métricas a mejorar:\n- Tiempo de ejecución total\n- Shuffle bytes\n- Spill a disco\n\n### Quiz:\n1. ¿Cuál es más eficiente: UDF o Pandas UDF?\n2. ¿Cuándo usar cache vs persist?\n3. ¿Cómo detectás skew en Spark UI?\n4. ¿Qué hace broadcast()?\n5. ¿Cuál es la diferencia entre repartition y coalesce?`, en: `## Project: Optimize a Pipeline\n\nTake the ETL from the previous phase and optimize it:\n\n### Checklist:\n- [ ] Identify bottlenecks in Spark UI\n- [ ] Apply broadcast join where appropriate\n- [ ] Verify and fix skew if exists\n- [ ] Cache reused DataFrames\n- [ ] Partition output correctly\n- [ ] Configure AQE\n\n### Metrics to improve:\n- Total execution time\n- Shuffle bytes\n- Spill to disk\n\n### Quiz:\n1. Which is more efficient: UDF or Pandas UDF?\n2. When to use cache vs persist?\n3. How do you detect skew in Spark UI?\n4. What does broadcast() do?\n5. What's the difference between repartition and coalesce?`, pt: `## Projeto: Otimizar um Pipeline\n\nPegue o ETL da fase anterior e otimize-o:\n\n### Checklist:\n- [ ] Identificar gargalos no Spark UI\n- [ ] Aplicar broadcast join onde apropriado\n- [ ] Verificar e corrigir skew se existir\n- [ ] Cachear DataFrames reutilizados\n- [ ] Particionar a saída corretamente\n- [ ] Configurar AQE\n\n### Métricas a melhorar:\n- Tempo de execução total\n- Shuffle bytes\n- Spill para disco\n\n### Quiz:\n1. Qual é mais eficiente: UDF ou Pandas UDF?\n2. Quando usar cache vs persist?\n3. Como você detecta skew no Spark UI?\n4. O que broadcast() faz?\n5. Qual é a diferença entre repartition e coalesce?` },
      practicalTips: [{ es: '🏆 Un pipeline bien optimizado puede ser 10x más rápido que uno sin optimizar.', en: '🏆 A well-optimized pipeline can be 10x faster than an unoptimized one.', pt: '🏆 Um pipeline bem otimizado pode ser 10x mais rápido que um sem otimização.' }],
      externalLinks: [{ title: 'Performance Tuning', url: 'https://spark.apache.org/docs/latest/sql-performance-tuning.html', type: 'docs' }],
      checkpoint: { es: '🏆 ¿Mejoraste el tiempo de ejecución en al menos 30%?', en: '🏆 Did you improve execution time by at least 30%?', pt: '🏆 Você melhorou o tempo de execução em pelo menos 30%?' },
      xpReward: 75,
      estimatedMinutes: 60
    }
  ]
};


