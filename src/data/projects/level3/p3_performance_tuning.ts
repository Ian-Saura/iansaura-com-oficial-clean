import { Project } from '../../../types/members';

export const p3PerformanceTuning: Project = {
  id: 'p3-performance-tuning',
  level: 3,
  title: {
    es: 'Performance Tuning de Pipeline',
    pt: 'Performance Tuning de Pipeline'
  },
  description: {
    es: 'Optimizá un pipeline lento hasta hacerlo 10x más rápido. Esto te diferencia como Senior en entrevistas y en el trabajo.',
    pt: 'Otimize um pipeline lento até torná-lo 10x mais rápido. Isso te diferencia como Sênior em entrevistas e no trabalho.'
  },
  difficulty: 'Expert',
  duration: '4-5 horas',
  skills: [
    { es: 'Performance', pt: 'Performance' },
    { es: 'Profiling', pt: 'Profiling' },
    { es: 'Optimization', pt: 'Otimização' },
    { es: 'Python', pt: 'Python' },
    { es: 'SQL', pt: 'SQL' }
  ],
  icon: '⚡',
  color: 'emerald',
  datasetId: 'logs',
  prerequisites: ['p2-spark-processing', 'p2-sql-optimization'],
  estimatedLines: 150,
  realWorldExample: {
    es: 'Así optimiza Datadog el procesamiento de miles de millones de logs por día',
    pt: 'Assim o Datadog otimiza o processamento de bilhões de logs por dia'
  },
  usedBy: ['Shopify', 'Stripe', 'Square', 'Plaid'],
  expectedOutputs: [
    {
      step: 5,
      description: { es: 'Comparación antes/después', pt: 'Comparação antes/depois' },
      example: `📊 Performance Report
━━━━━━━━━━━━━━━━━━━━━
ANTES (slow_pipeline):
  - Tiempo: 45.2 segundos
  - Memoria: 2.1 GB peak
  - CPU: 25% (single thread)

DESPUÉS (fast_pipeline):
  - Tiempo: 3.8 segundos
  - Memoria: 450 MB peak
  - CPU: 85% (multi-thread)

⚡ Mejora: 11.9x más rápido
💾 Mejora: 4.7x menos memoria`
    },
  ],
  learningObjectives: [
    { es: 'Identificar cuellos de botella con profiling', pt: 'Identificar gargalos com profiling' },
    { es: 'Optimizar código Python', pt: 'Otimizar código Python' },
    { es: 'Optimizar queries SQL', pt: 'Otimizar queries SQL' },
    { es: 'Usar paralelismo efectivamente', pt: 'Usar paralelismo efetivamente' },
    { es: 'Medir y documentar mejoras', pt: 'Medir e documentar melhorias' },
  ],
  interviewStory: {
    hook: {
      es: "Optimicé un pipeline que tardaba 4 horas a solo 8 minutos - una mejora de 30x que ahorró $50K/año en compute.",
      pt: "Otimizei um pipeline que demorava 4 horas para apenas 8 minutos - uma melhoria de 30x que economizou $50K/ano em computação."
    },
    situation: {
      es: "El pipeline de analytics tardaba 4 horas y bloqueaba otros jobs. El costo de compute era altísimo y los reportes llegaban tarde.",
      pt: "O pipeline de analytics demorava 4 horas e bloqueava outros jobs. O custo de computação era altíssimo e os relatórios chegavam tarde."
    },
    task: {
      es: "Identificar los cuellos de botella y optimizar el pipeline sin cambiar los resultados.",
      pt: "Identificar os gargalos e otimizar o pipeline sem mudar os resultados."
    },
    actions: [
      { es: "Perfilé el código con cProfile y line_profiler para encontrar hotspots", pt: "Perfiei o código com cProfile e line_profiler para encontrar hotspots" },
      { es: "Reemplacé loops de Python con operaciones vectorizadas de Pandas", pt: "Substituí loops de Python por operações vetorizadas de Pandas" },
      { es: "Cambié de CSV a Parquet para I/O 10x más rápido", pt: "Mudei de CSV para Parquet para I/O 10x mais rápido" },
      { es: "Implementé procesamiento en chunks para no cargar todo en memoria", pt: "Implementei processamento em chunks para não carregar tudo na memória" },
      { es: "Paralelicé operaciones independientes con multiprocessing", pt: "Paralelizei operações independentes com multiprocessing" }
    ],
    results: [
      { es: "Tiempo de ejecución: de 4 horas a 8 minutos (30x más rápido)", pt: "Tempo de execução: de 4 horas para 8 minutos (30x mais rápido)" },
      { es: "Uso de memoria: de 16GB a 2GB", pt: "Uso de memória: de 16GB para 2GB" },
      { es: "Costo de compute: -$50K/año", pt: "Custo de computação: -$50K/ano" },
      { es: "Pipeline ahora corre 3 veces al día en vez de 1", pt: "Pipeline agora roda 3 vezes ao dia em vez de 1" }
    ],
    learnings: [
      { es: "Siempre perfilar antes de optimizar - la intuición suele estar mal", pt: "Sempre fazer profiling antes de otimizar - a intuição costuma estar errada" },
      { es: "Los loops de Python son el enemigo #1 de performance", pt: "Os loops de Python são o inimigo #1 da performance" },
      { es: "Parquet no es solo más chico, es dramáticamente más rápido", pt: "Parquet não é só menor, é dramaticamente mais rápido" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo identificás qué optimizar?", pt: "Como você identifica o que otimizar?" },
        answer: { es: "Profiling primero, siempre. Uso cProfile para overview, line_profiler para detalle. Optimizo el 20% del código que toma el 80% del tiempo.", pt: "Profiling primeiro, sempre. Uso cProfile para overview, line_profiler para detalhe. Otimizo os 20% do código que toma 80% do tempo." }
      },
      {
        question: { es: "¿Por qué los loops de Python son lentos?", pt: "Por que os loops de Python são lentos?" },
        answer: { es: "Python es interpretado y tiene overhead por operación. Pandas/NumPy usan C bajo el capó - una operación vectorizada hace millones de operaciones en C, no en Python.", pt: "Python é interpretado e tem overhead por operação. Pandas/NumPy usam C por baixo dos panos - uma operação vetorizada faz milhões de operações em C, não em Python." }
      },
      {
        question: { es: "¿Cuándo usarías multiprocessing vs multithreading?", pt: "Quando você usaria multiprocessing vs multithreading?" },
        answer: { es: "Multiprocessing para CPU-bound (cálculos). Multithreading para I/O-bound (network, disco). Python tiene el GIL que limita threads para CPU.", pt: "Multiprocessing para CPU-bound (cálculos). Multithreading para I/O-bound (network, disco). Python tem o GIL que limita threads para CPU." }
      }
    ],
    closingStatement: { es: "Performance tuning es el skill que te hace invaluable - cualquiera puede hacer que funcione, pocos pueden hacerlo rápido.", pt: "Performance tuning é a habilidade que te torna inestimável - qualquer um pode fazer funcionar, poucos podem fazê-lo rápido." }
  },
  steps: [
    {
      order: 1,
      text: { es: '🐌 Creá un pipeline lento (a propósito)', pt: '🐌 Crie um pipeline lento (de propósito)' },
      code: `# slow_pipeline.py - Versión lenta
import pandas as pd
import time

def slow_pipeline(filepath: str):
    start = time.time()
    
    # Cargar TODO en memoria
    df = pd.read_json(filepath)
    
    # Loop ineficiente
    results = []
    for _, row in df.iterrows():
        if row['total'] > 100:
            results.append({
                'customer_id': row['customer_id'],
                'total': row['total'],
                'category': row['category'].upper()
            })
    
    result_df = pd.DataFrame(results)
    
    # Agregación en loop
    totals = {}
    for _, row in result_df.iterrows():
        cid = row['customer_id']
        if cid not in totals:
            totals[cid] = 0
        totals[cid] += row['total']
    
    elapsed = time.time() - start
    print(f"Tiempo: {elapsed:.2f}s")
    return totals`,
      explanation: { es: 'Este código tiene varios problemas: iterrows, loops, no usa operaciones vectorizadas.', pt: 'Este código tem vários problemas: iterrows, loops, não usa operações vetorizadas.' },
      checkpoint: { es: '¿Podés identificar al menos 3 problemas de performance?', pt: 'Consegue identificar pelo menos 3 problemas de performance?' }
    },
    {
      order: 2,
      text: { es: '🔍 Hacé profiling', pt: '🔍 Faça profiling' },
      code: `import cProfile
import pstats

# Profiling con cProfile
profiler = cProfile.Profile()
profiler.enable()

result = slow_pipeline('data/logs_access_logs.csv')

profiler.disable()
stats = pstats.Stats(profiler)
stats.sort_stats('cumulative')
stats.print_stats(20)  # Top 20 funciones`,
      explanation: { es: 'cProfile te muestra dónde se gasta el tiempo. Buscá las funciones que más tardan.', pt: 'cProfile mostra onde se gasta o tempo. Procure as funções que mais demoram.' },
      tip: { es: 'Enfocate en las funciones con más "cumtime" (tiempo acumulado).', pt: 'Foque nas funções com mais "cumtime" (tempo acumulado).' }
    },
    {
      order: 3,
      text: { es: '⚡ Optimizá: Vectorización', pt: '⚡ Otimize: Vetorização' },
      code: `# fast_pipeline.py - Versión optimizada
import pandas as pd
import time

def fast_pipeline(filepath: str):
    start = time.time()
    
    # Cargar solo columnas necesarias (logs tienen muchas columnas)
    df = pd.read_csv(filepath, usecols=['timestamp', 'service_id', 'status_code', 'response_time_ms'])
    
    # Filtrar con vectorización (NO iterrows) - errores 5xx
    errors = df[df['status_code'] >= 500].copy()
    
    # Agregación vectorizada - errores por servicio
    error_counts = errors.groupby('service_id')['status_code'].count().to_dict()
    
    elapsed = time.time() - start
    print(f"Tiempo: {elapsed:.2f}s")
    return error_counts`,
      explanation: { es: 'Operaciones vectorizadas de Pandas son 10-100x más rápidas que loops.', pt: 'Operações vetorizadas de Pandas são 10-100x mais rápidas que loops.' },
      checkpoint: { es: '¿Cuánto más rápido es la versión optimizada?', pt: 'Quanto mais rápido é a versão otimizada?' }
    },
    {
      order: 4,
      text: { es: '📊 Optimizá queries SQL', pt: '📊 Otimize queries SQL' },
      code: `-- Query lenta (subqueries correlacionados)
SELECT 
    o.customer_id,
    (SELECT SUM(total) FROM orders o2 WHERE o2.customer_id = o.customer_id) as total
FROM orders o
WHERE o.total > 100;

-- Query optimizada (una sola pasada)
SELECT 
    customer_id,
    SUM(total) as total
FROM orders
WHERE total > 100
GROUP BY customer_id;`,
      explanation: { es: 'Los subqueries correlacionados se ejecutan para CADA fila. Evitalos.', pt: 'As subqueries correlacionadas são executadas para CADA linha. Evite-as.' },
      tip: { es: 'Usá EXPLAIN ANALYZE para ver el plan de ejecución.', pt: 'Use EXPLAIN ANALYZE para ver o plano de execução.' }
    },
    {
      order: 5,
      text: { es: '🔄 Agregá paralelismo', pt: '🔄 Adicione paralelismo' },
      code: `from concurrent.futures import ThreadPoolExecutor, as_completed
import pandas as pd

def process_chunk(chunk: pd.DataFrame) -> dict:
    """Procesa un chunk de datos."""
    filtered = chunk[chunk['total'] > 100]
    return filtered.groupby('customer_id')['total'].sum().to_dict()

def parallel_pipeline(filepath: str, num_workers: int = 4):
    # Cargar logs y dividir en chunks (logs suelen ser enormes)
    df = pd.read_csv(filepath)
    chunks = np.array_split(df, num_workers)
    
    # Procesar en paralelo
    results = []
    with ThreadPoolExecutor(max_workers=num_workers) as executor:
        futures = [executor.submit(process_chunk, chunk) for chunk in chunks]
        
        for future in as_completed(futures):
            results.append(future.result())
    
    # Combinar resultados
    combined = {}
    for result in results:
        for k, v in result.items():
            combined[k] = combined.get(k, 0) + v
    
    return combined

# Los logs son ideales para optimización: millones de registros, 
# operaciones repetitivas, mucho potencial de mejora`,
      explanation: { es: 'ThreadPoolExecutor permite procesar chunks en paralelo.', pt: 'ThreadPoolExecutor permite processar chunks em paralelo.' },
      warning: { es: 'Paralelismo tiene overhead. Solo vale la pena para tareas que tardan >1s.', pt: 'Paralelismo tem overhead. Só vale a pena para tarefas que demoram >1s.' }
    },
    {
      order: 6,
      text: { es: '📈 Medí y documentá mejoras', pt: '📈 Meça e documente melhorias' },
      code: `import time

def benchmark(func, *args, runs: int = 5):
    """Ejecuta función múltiples veces y reporta estadísticas."""
    times = []
    for _ in range(runs):
        start = time.time()
        func(*args)
        times.append(time.time() - start)
    
    return {
        'mean': sum(times) / len(times),
        'min': min(times),
        'max': max(times)
    }

# Comparar versiones con datos de logs
slow_stats = benchmark(slow_pipeline, 'data/logs_access_logs.csv')
fast_stats = benchmark(fast_pipeline, 'data/logs_access_logs.csv')

speedup = slow_stats['mean'] / fast_stats['mean']
print(f"Speedup: {speedup:.1f}x")`,
      explanation: { es: 'Siempre medí antes y después. Sin números, no sabés si mejoraste.', pt: 'Sempre meça antes e depois. Sem números, você não sabe se melhorou.' },
      checkpoint: { es: '¿Lograste mejora de al menos 5x?', pt: 'Conseguiu melhoria de pelo menos 5x?' }
    },
    {
      order: 7,
      text: { es: '📝 Documentá cada optimización', pt: '📝 Documente cada otimização' },
      code: `# Documentación de optimizaciones

## Resumen
Pipeline optimizado de 45s a 3s (15x speedup)

## Optimizaciones aplicadas

| # | Cambio | Impacto | Antes | Después |
|---|--------|---------|-------|---------|
| 1 | Vectorización | 5x | 45s | 9s |
| 2 | Eliminar subqueries | 2x | 9s | 4.5s |
| 3 | Paralelismo (4 workers) | 1.5x | 4.5s | 3s |

## Lecciones
- iterrows() es 100x más lento que vectorización
- Subqueries correlacionados son O(n²)
- Paralelismo tiene overhead, solo para tareas >1s`,
      explanation: { es: 'Documentar cada optimización ayuda a otros (y a vos en el futuro).', pt: 'Documentar cada otimização ajuda os outros (e você no futuro).' }
    },
  ],
  deliverable: { es: 'Código antes/después + documento con análisis de mejoras', pt: 'Código antes/depois + documento com análise de melhorias' },
  evaluation: [
    { es: '¿Lograste mejora de al menos 5x?', pt: 'Conseguiu melhoria de pelo menos 5x?' },
    { es: '¿Documentaste cada cambio y su impacto?', pt: 'Documentou cada mudança e seu impacto?' },
    { es: '¿El código sigue siendo legible y mantenible?', pt: 'O código continua legível e manutenível?' },
    { es: '¿Usaste profiling para identificar cuellos de botella?', pt: 'Usou profiling para identificar gargalos?' },
  ],
  theory: {
    es: `## Técnicas de Optimización

### Python/Pandas
1. **Vectorización**: Usar operaciones de Pandas, no loops
2. **Tipos correctos**: category para strings repetidos
3. **Chunks**: Procesar en partes si no cabe en memoria
4. **Cython/Numba**: Para código numérico crítico

### SQL
1. **Índices**: En columnas de WHERE y JOIN
2. **Evitar SELECT ***: Solo columnas necesarias
3. **CTEs vs Subqueries**: CTEs son más legibles y a veces más rápidos
4. **EXPLAIN**: Siempre revisar el plan

### General
1. **Medir primero**: No optimizar sin datos
2. **Profiling**: Encontrar el cuello de botella real
3. **80/20**: El 20% del código causa el 80% de la lentitud
4. **Caching**: No recalcular lo que ya calculaste`,
    pt: `## Técnicas de Otimização

### Python/Pandas
1. **Vetorização**: Usar operações de Pandas, não loops
2. **Tipos corretos**: category para strings repetidas
3. **Chunks**: Processar em partes se não couber na memória
4. **Cython/Numba**: Para código numérico crítico

### SQL
1. **Índices**: Em colunas de WHERE e JOIN
2. **Evitar SELECT ***: Apenas colunas necessárias
3. **CTEs vs Subqueries**: CTEs são mais legíveis e às vezes mais rápidos
4. **EXPLAIN**: Sempre revisar o plano

### Geral
1. **Medir primeiro**: Não otimizar sem dados
2. **Profiling**: Encontrar o gargalo real
3. **80/20**: Os 20% do código causam 80% da lentidão
4. **Caching**: Não recalcular o que já calculou`
  },
};


