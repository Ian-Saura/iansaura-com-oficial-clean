import { Project } from '../../../types/members';

export const p2_sql_logs: Project = {
  id: 'p2-sql-logs',
  level: 1,
  title: { es: 'Análisis SQL de Logs de Servidor', en: 'SQL Server Logs Analysis', pt: 'Análise SQL de Logs de Servidor' },
  description: {
    es: 'Analizá logs de servidor web reales para encontrar patrones, errores y oportunidades de optimización. Este es el tipo de análisis que hacés constantemente como Data Engineer.',
    en: 'Analyze real web server logs to find patterns, errors, and optimization opportunities. This is the type of analysis you constantly do as a Data Engineer.',
    pt: 'Analise logs de servidor web reais para encontrar padrões, erros e oportunidades de otimização. Este é o tipo de análise que você faz constantemente como Data Engineer.'
  },
  difficulty: 'Principiante',
  duration: '2-3 horas',
  skills: [{ es: 'SQL' }, { es: 'DuckDB' }, { es: 'Window Functions' }, { es: 'CTEs' }, { es: 'Análisis de Datos', en: 'Data Analysis', pt: 'Análise de Dados' }],
  icon: '🔍',
  color: 'blue',
  datasetId: 'logs',
  prerequisites: ['p1-etl-python'],
  estimatedLines: 100,
  realWorldExample: {
    es: 'Así es como los equipos de SRE en Google analizan logs para detectar problemas de performance',
    en: 'This is how SRE teams at Google analyze logs to detect performance issues',
    pt: 'É assim que as equipes de SRE no Google analisam logs para detectar problemas de performance'
  },
  usedBy: ['Google', 'Datadog', 'Splunk', 'New Relic'],
  learningObjectives: [
    { es: 'Escribir queries SQL complejas', en: 'Write complex SQL queries', pt: 'Escrever queries SQL complexas' },
    { es: 'Usar Window Functions (ROW_NUMBER, RANK, LAG)', en: 'Use Window Functions (ROW_NUMBER, RANK, LAG)', pt: 'Usar Window Functions (ROW_NUMBER, RANK, LAG)' },
    { es: 'Usar CTEs para organizar queries', en: 'Use CTEs to organize queries', pt: 'Usar CTEs para organizar queries' },
    { es: 'Analizar datos temporales', en: 'Analyze temporal data', pt: 'Analisar dados temporais' },
    { es: 'Generar insights accionables', en: 'Generate actionable insights', pt: 'Gerar insights acionáveis' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'No usar alias descriptivos', en: 'Not using descriptive aliases', pt: 'Não usar aliases descritivos' },
      why: { es: 'Hace el código ilegible y difícil de mantener', en: 'Makes code unreadable and hard to maintain', pt: 'Torna o código ilegível e difícil de manter' },
      solution: { es: 'Siempre usá AS con nombres claros', en: 'Always use AS with clear names', pt: 'Sempre use AS com nomes claros' },
      code: `-- ❌ Malo
SELECT COUNT(*), AVG(response_time_ms) FROM logs;

-- ✅ Bueno
SELECT 
    COUNT(*) AS total_requests,
    AVG(response_time_ms) AS avg_response_ms
FROM logs;`
    },
    {
      mistake: { es: 'Olvidar GROUP BY cuando usás agregaciones', en: 'Forgetting GROUP BY when using aggregations', pt: 'Esquecer GROUP BY quando usar agregações' },
      why: { es: 'SQL requiere agrupar cuando mezclás columnas con funciones de agregación', en: 'SQL requires grouping when mixing columns with aggregation functions', pt: 'SQL requer agrupar quando mistura colunas com funções de agregação' },
      solution: { es: 'Agregá GROUP BY con todas las columnas no agregadas', en: 'Add GROUP BY with all non-aggregated columns', pt: 'Adicione GROUP BY com todas as colunas não agregadas' },
      code: `-- ❌ Error
SELECT endpoint, COUNT(*) FROM logs;

-- ✅ Correcto
SELECT endpoint, COUNT(*) 
FROM logs 
GROUP BY endpoint;`
    },
    {
      mistake: { es: 'Confundir RANK con ROW_NUMBER', en: 'Confusing RANK with ROW_NUMBER', pt: 'Confundir RANK com ROW_NUMBER' },
      why: { es: 'RANK deja huecos en empates, ROW_NUMBER no', en: 'RANK leaves gaps in ties, ROW_NUMBER does not', pt: 'RANK deixa lacunas em empates, ROW_NUMBER não' },
      solution: { es: 'Usá DENSE_RANK si querés ranking sin huecos', en: 'Use DENSE_RANK if you want ranking without gaps', pt: 'Use DENSE_RANK se quiser ranking sem lacunas' },
    },
  ],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Exploración inicial de logs', en: 'Initial logs exploration', pt: 'Exploração inicial de logs' },
      example: `+----------------+---------------------+---------------------+
| total_requests | first_request       | last_request        |
+----------------+---------------------+---------------------+
| 50000          | 2024-01-01 00:00:12 | 2024-01-31 23:59:45 |
+----------------+---------------------+---------------------+`
    },
    {
      step: 6,
      description: { es: 'Endpoints más lentos', en: 'Slowest endpoints', pt: 'Endpoints mais lentos' },
      example: `+------------------+-------------+------------+
| endpoint         | avg_time_ms | p99_time   |
+------------------+-------------+------------+
| /api/search      | 450.5       | 1250       |
| /api/reports     | 380.2       | 980        |
| /api/export      | 320.1       | 750        |
+------------------+-------------+------------+`
    },
  ],
  interviewStory: {
    hook: { es: "Analicé logs de servidor para identificar endpoints problemáticos y logré reducir los errores 500 en un 40% al encontrar un patrón que nadie había detectado.", en: "Analyzed server logs to identify problematic endpoints and managed to reduce 500 errors by 40% by finding a pattern no one had detected.", pt: "Analisei logs de servidor para identificar endpoints problemáticos e consegui reduzir os erros 500 em 40% ao encontrar um padrão que ninguém tinha detectado." },
    situation: { es: "Tenía acceso a logs de un servidor web con millones de requests. El equipo de desarrollo sabía que había problemas de performance pero no podía identificar exactamente dónde.", en: "I had access to logs from a web server with millions of requests. The dev team knew there were performance issues but couldn't identify exactly where.", pt: "Tinha acesso a logs de um servidor web com milhões de requests. A equipe de desenvolvimento sabia que havia problemas de performance mas não podia identificar exatamente onde." },
    task: { es: "Mi objetivo era analizar los logs para encontrar patrones de errores, identificar endpoints lentos, y generar insights accionables para el equipo.", en: "My goal was to analyze logs to find error patterns, identify slow endpoints, and generate actionable insights for the team.", pt: "Meu objetivo era analisar os logs para encontrar padrões de erros, identificar endpoints lentos e gerar insights acionáveis para a equipe." },
    actions: [
      { es: "Cargué los logs en DuckDB para poder hacer análisis SQL rápido sin necesidad de un servidor", en: "Loaded logs into DuckDB for fast SQL analysis without needing a server", pt: "Carreguei os logs no DuckDB para poder fazer análise SQL rápido sem necessidade de um servidor" },
      { es: "Usé Window Functions para calcular percentiles de response time (p50, p95, p99)", en: "Used Window Functions to calculate response time percentiles (p50, p95, p99)", pt: "Usei Window Functions para calcular percentis de response time (p50, p95, p99)" },
      { es: "Implementé análisis temporal con LAG() para detectar degradación gradual", en: "Implemented temporal analysis with LAG() to detect gradual degradation", pt: "Implementei análise temporal com LAG() para detectar degradação gradual" },
      { es: "Creé CTEs para organizar queries complejas de forma legible", en: "Created CTEs to organize complex queries readably", pt: "Criei CTEs para organizar queries complexas de forma legível" },
      { es: "Identifiqué que el endpoint /api/search tenía p99 de 5 segundos vs 200ms del resto", en: "Identified that /api/search endpoint had 5s p99 vs 200ms for the rest", pt: "Identifiquei que o endpoint /api/search tinha p99 de 5 segundos vs 200ms do resto" }
    ],
    results: [
      { es: "Identifiqué 3 endpoints responsables del 80% de los errores 500", en: "Identified 3 endpoints responsible for 80% of 500 errors", pt: "Identifiquei 3 endpoints responsáveis por 80% dos erros 500" },
      { es: "El endpoint /api/search tenía un problema de N+1 queries que nadie había detectado", en: "The /api/search endpoint had an N+1 query problem no one had detected", pt: "O endpoint /api/search tinha um problema de N+1 queries que ninguém tinha detectado" },
      { es: "Después del fix, el p99 bajó de 5s a 300ms", en: "After fix, p99 dropped from 5s to 300ms", pt: "Depois do fix, o p99 caiu de 5s para 300ms" },
      { es: "Creé un dashboard SQL que el equipo sigue usando para monitoreo", en: "Created a SQL dashboard the team still uses for monitoring", pt: "Criei um dashboard SQL que a equipe continua usando para monitoramento" }
    ],
    learnings: [
      { es: "Los promedios mienten - siempre hay que mirar percentiles (p95, p99)", en: "Averages lie - always look at percentiles (p95, p99)", pt: "As médias mentem - sempre tem que olhar percentis (p95, p99)" },
      { es: "Window Functions son esenciales para análisis temporal - LAG() me permitió ver tendencias", en: "Window Functions are essential for temporal analysis - LAG() allowed me to see trends", pt: "Window Functions são essenciais para análise temporal - LAG() me permitiu ver tendências" },
      { es: "DuckDB es increíblemente rápido para analytics local - procesé 10M de filas en segundos", en: "DuckDB is incredibly fast for local analytics - processed 10M rows in seconds", pt: "DuckDB é incrivelmente rápido para analytics local - processei 10M de linhas em segundos" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Por qué usaste DuckDB en vez de PostgreSQL?", en: "Why did you use DuckDB instead of PostgreSQL?", pt: "Por que usou DuckDB em vez de PostgreSQL?" },
        answer: { es: "DuckDB está optimizado para analytics y corre localmente sin servidor. Para este caso de análisis exploratorio era perfecto. En producción usaría algo como ClickHouse o BigQuery.", en: "DuckDB is optimized for analytics and runs locally serverless. For this exploratory analysis case it was perfect. In production I'd use something like ClickHouse or BigQuery.", pt: "DuckDB é otimizado para analytics e roda localmente sem servidor. Para este caso de análise exploratória era perfeito. Em produção usaria algo como ClickHouse ou BigQuery." }
      },
      {
        question: { es: "¿Cómo identificaste el problema de N+1?", en: "How did you identify the N+1 problem?", pt: "Como identificou o problema de N+1?" },
        answer: { es: "Vi que el endpoint /api/search tenía response times que crecían linealmente con el tamaño del resultado. Eso es un patrón clásico de N+1 - una query por cada item en vez de una query con JOIN.", en: "I saw /api/search response times grew linearly with result size. That's a classic N+1 pattern - one query per item instead of one JOIN query.", pt: "Vi que o endpoint /api/search tinha response times que cresciam linearmente com o tamanho do resultado. Isso é um padrão clássico de N+1 - uma query por cada item em vez de uma query com JOIN." }
      },
      {
        question: { es: "¿Qué harías diferente con más datos?", en: "What would you do differently with more data?", pt: "O que faria diferente com mais dados?" },
        answer: { es: "Agregaría sampling para exploración inicial, usaría particionamiento por fecha, y consideraría mover a un data warehouse como BigQuery para queries más complejas.", en: "I'd add sampling for initial exploration, use date partitioning, and consider moving to a data warehouse like BigQuery for complex queries.", pt: "Adicionaria sampling para exploração inicial, usaria particionamento por data e consideraria mover para um data warehouse como BigQuery para queries mais complexas." }
      }
    ],
    closingStatement: { es: "Este proyecto me enseñó que los datos de logs son una mina de oro de insights - solo necesitás las herramientas correctas para extraerlos.", en: "This project taught me logs are a goldmine of insights - you just need the right tools to extract them.", pt: "Este projeto me ensinou que os dados de logs são uma mina de ouro de insights - só precisa das ferramentas certas para extraí-los." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📥 Descargá el dataset de Web Logs', en: '📥 Download Web Logs dataset', pt: '📥 Baixe o dataset de Web Logs' },
      explanation: { es: 'El dataset contiene logs de un servidor web con: timestamp, endpoint, method, status_code, response_time_ms, user_id, ip_address.', en: 'Dataset contains web server logs with: timestamp, endpoint, method, status_code, response_time_ms, user_id, ip_address.', pt: 'O dataset contém logs de um servidor web com: timestamp, endpoint, method, status_code, response_time_ms, user_id, ip_address.' },
      tip: { es: 'Descargá en formato JSON o Parquet para cargarlo fácil en DuckDB.', en: 'Download in JSON or Parquet format for easy loading in DuckDB.', pt: 'Baixe em formato JSON ou Parquet para carregar fácil no DuckDB.' },
      checkpoint: { es: '¿Tenés el archivo de logs descargado?', en: 'Do you have the logs file downloaded?', pt: 'Tem o arquivo de logs baixado?' }
    },
    { 
      order: 2, 
      text: { es: '🦆 ¿Qué es DuckDB? (explicación for dummies)', en: '🦆 What is DuckDB? (dummies explanation)', pt: '🦆 O que é DuckDB? (explicação for dummies)' },
      explanation: { es: `**DuckDB** es una base de datos que corre **en tu computadora** sin necesidad de instalar nada complicado.

### Pensalo así:
- **MySQL/PostgreSQL** = Un servidor que tenés que instalar, configurar, y mantener corriendo
- **DuckDB** = Un archivo simple que abrís cuando lo necesitás (como Excel pero para SQL)

### ¿Por qué lo usamos acá?
1. **Cero setup**: Solo \`pip install duckdb\` y listo
2. **SQL estándar**: El mismo SQL que usarías en cualquier base de datos
3. **Perfecto para analytics**: Optimizado para queries de análisis (SELECT, GROUP BY, etc.)
4. **Gratis y local**: No necesitás cuenta en la nube ni pagar nada

### Instalación (literal 1 comando):
\`\`\`bash
pip install duckdb
\`\`\`

### La sintaxis es SQL normal:
\`\`\`sql
-- Esto funciona IGUAL en DuckDB, PostgreSQL, MySQL, etc:
SELECT endpoint, COUNT(*) as hits
FROM logs
WHERE status_code = 200
GROUP BY endpoint
ORDER BY hits DESC;
\`\`\`

### Pequeñas diferencias vs otros DBMS:
\`\`\`sql
-- Cargar archivos (esto es específico de DuckDB):
SELECT * FROM read_json_auto('archivo.json');
SELECT * FROM read_csv_auto('archivo.csv');
SELECT * FROM 'archivo.parquet';

-- El resto del SQL es estándar
\`\`\`

**En el trabajo real** usarías Snowflake, BigQuery, Redshift, etc. DuckDB es perfecto para **aprender y experimentar** porque el SQL es prácticamente idéntico.`, en: `**DuckDB** is a database that runs **on your computer** without needing to install anything complicated.

### Think of it like this:
- **MySQL/PostgreSQL** = A server you have to install, configure, and keep running
- **DuckDB** = A simple file you open when you need it (like Excel but for SQL)

### Why use it here?
1. **Zero setup**: Just \`pip install duckdb\`
2. **Standard SQL**: Same SQL you'd use in any database
3. **Perfect for analytics**: Optimized for analytical queries (SELECT, GROUP BY, etc.)
4. **Free and local**: No cloud account needed, no cost

### Installation (literally 1 command):
\`\`\`bash
pip install duckdb
\`\`\`

### Syntax is normal SQL:
\`\`\`sql
-- Works SAME in DuckDB, PostgreSQL, MySQL, etc:
SELECT endpoint, COUNT(*) as hits
FROM logs
WHERE status_code = 200
GROUP BY endpoint
ORDER BY hits DESC;
\`\`\`

### Small differences vs other DBMS:
\`\`\`sql
-- Load files (specific to DuckDB):
SELECT * FROM read_json_auto('file.json');
SELECT * FROM read_csv_auto('file.csv');
SELECT * FROM 'file.parquet';

-- Rest of SQL is standard
\`\`\`

**In real work** you'd use Snowflake, BigQuery, Redshift, etc. DuckDB is perfect for **learning and experimenting** because SQL is practically identical.`, pt: `**DuckDB** é um banco de dados que roda **no seu computador** sem necessidade de instalar nada complicado.

### Pense assim:
- **MySQL/PostgreSQL** = Um servidor que você tem que instalar, configurar e manter rodando
- **DuckDB** = Um arquivo simples que você abre quando precisa (como Excel mas para SQL)

### Por que usamos aqui?
1. **Zero setup**: Só \`pip install duckdb\` e pronto
2. **SQL padrão**: O mesmo SQL que usaria em qualquer banco de dados
3. **Perfeito para analytics**: Otimizado para queries de análise (SELECT, GROUP BY, etc.)
4. **Grátis e local**: Não precisa de conta na nuvem nem pagar nada

### Instalação (literalmente 1 comando):
\`\`\`bash
pip install duckdb
\`\`\`

### A sintaxe é SQL normal:
\`\`\`sql
-- Isso funciona IGUAL no DuckDB, PostgreSQL, MySQL, etc:
SELECT endpoint, COUNT(*) as hits
FROM logs
WHERE status_code = 200
GROUP BY endpoint
ORDER BY hits DESC;
\`\`\`

### Pequenas diferenças vs outros DBMS:
\`\`\`sql
-- Carregar arquivos (isso é específico do DuckDB):
SELECT * FROM read_json_auto('arquivo.json');
SELECT * FROM read_csv_auto('arquivo.csv');
SELECT * FROM 'arquivo.parquet';

-- O resto do SQL é padrão
\`\`\`

**No trabalho real** você usaria Snowflake, BigQuery, Redshift, etc. DuckDB é perfeito para **aprender e experimentar** porque o SQL é praticamente idêntico.` },
      tip: { es: 'Si sabés SQL, ya sabés usar DuckDB. Es SQL normal.', en: 'If you know SQL, you know DuckDB. It\'s normal SQL.', pt: 'Se sabe SQL, já sabe usar DuckDB. É SQL normal.' },
      checkpoint: { es: '¿Instalaste DuckDB con pip install duckdb?', en: 'Did you install DuckDB with pip install duckdb?', pt: 'Instalou DuckDB com pip install duckdb?' }
    },
    { 
      order: 3, 
      text: { es: '📂 Cargá los datos en DuckDB', en: '📂 Load data into DuckDB', pt: '📂 Carregue os dados no DuckDB' },
      code: `import duckdb

# Conectar a DuckDB (en memoria - los datos se pierden al cerrar)
# Si querés persistir: con = duckdb.connect('mis_logs.db')
con = duckdb.connect()

# DuckDB puede leer JSON directamente (esto es genial!)
con.execute("""
    CREATE TABLE logs AS 
    SELECT * FROM read_json_auto('data/logs.json')
""")

# Verificar que cargó bien
print("Total de filas:", con.execute("SELECT COUNT(*) FROM logs").fetchone()[0])

# Ver estructura de la tabla (igual que en PostgreSQL)
print("\\nColumnas:")
for col in con.execute("DESCRIBE logs").fetchall():
    print(f"  {col[0]}: {col[1]}")

# Ver primeras filas
print("\\nPrimeras 3 filas:")
print(con.execute("SELECT * FROM logs LIMIT 3").fetchdf())`,
      explanation: { es: `**Lo que hace este código:**
1. \`duckdb.connect()\` - Crea una base de datos en memoria
2. \`read_json_auto()\` - Lee el JSON y detecta los tipos automáticamente
3. \`CREATE TABLE ... AS SELECT\` - Crea la tabla con los datos
4. \`DESCRIBE\` - Muestra la estructura (igual que PostgreSQL)
5. \`.fetchdf()\` - Devuelve los resultados como DataFrame de Pandas (muy útil!)`, en: `**What this code does:**
1. \`duckdb.connect()\` - Creates in-memory database
2. \`read_json_auto()\` - Reads JSON and auto-detects types
3. \`CREATE TABLE ... AS SELECT\` - Creates table with data
4. \`DESCRIBE\` - Shows structure (same as PostgreSQL)
5. \`.fetchdf()\` - Returns results as Pandas DataFrame (very useful!)`, pt: `**O que faz este código:**
1. \`duckdb.connect()\` - Cria um banco de dados em memória
2. \`read_json_auto()\` - Lê o JSON e detecta os tipos automaticamente
3. \`CREATE TABLE ... AS SELECT\` - Cria a tabela com os dados
4. \`DESCRIBE\` - Mostra a estrutura (igual no PostgreSQL)
5. \`.fetchdf()\` - Retorna os resultados como DataFrame do Pandas (muito útil!)` },
      checkpoint: { es: '¿Podés ver cuántas filas tiene la tabla logs?', en: 'Can you see how many rows logs table has?', pt: 'Consegue ver quantas linhas tem a tabela logs?' }
    },
    { 
      order: 4, 
      text: { es: '🔍 Query 1: Exploración inicial', en: '🔍 Query 1: Initial exploration', pt: '🔍 Query 1: Exploração inicial' },
      code: `-- ========================================
-- 1. EXPLORACIÓN INICIAL
-- ========================================
-- ¿Cuántos registros? ¿Qué período cubren?

SELECT 
    COUNT(*) as total_requests,
    MIN(timestamp) as primera_request,
    MAX(timestamp) as ultima_request,
    COUNT(DISTINCT user_id) as usuarios_unicos,
    COUNT(DISTINCT endpoint) as endpoints_unicos
FROM logs;`,
      explanation: { es: 'Siempre empezá explorando. ¿Cuántos datos tenés? ¿Qué período cubren? ¿Cuántos usuarios únicos?', en: 'Always start exploring. How much data? What period? How many unique users?', pt: 'Sempre comece explorando. Quantos dados tem? Que período cobrem? Quantos usuários únicos?' },
      tip: { es: 'Guardá estas métricas para tu reporte final.', en: 'Save these metrics for your final report.', pt: 'Guarde estas métricas para seu relatório final.' }
    },
    { 
      order: 5, 
      text: { es: '📊 Query 2: Endpoints más usados', en: '📊 Query 2: Most used endpoints', pt: '📊 Query 2: Endpoints mais usados' },
      code: `-- ========================================
-- 2. ENDPOINTS MÁS USADOS
-- ========================================
-- ¿Qué endpoints reciben más tráfico?

SELECT 
    endpoint,
    COUNT(*) as hits,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM logs), 2) as porcentaje
FROM logs
GROUP BY endpoint
ORDER BY hits DESC
LIMIT 10;`,
      explanation: { es: 'Saber qué endpoints son más usados te ayuda a priorizar optimizaciones.', en: 'Knowing which endpoints are most used helps prioritize optimizations.', pt: 'Saber quais endpoints são mais usados ajuda a priorizar otimizações.' },
      tip: { es: 'El subquery para calcular porcentaje es un patrón muy común. Memorizalo.', en: 'Subquery to calculate percentage is a very common pattern. Memorize it.', pt: 'O subquery para calcular porcentagem é um padrão muito comum. Memorize.' }
    },
    { 
      order: 6, 
      text: { es: '🚨 Query 3: Análisis de errores', en: '🚨 Query 3: Error analysis', pt: '🚨 Query 3: Análise de erros' },
      code: `-- ========================================
-- 3. ANÁLISIS DE ERRORES
-- ========================================
-- ¿Qué endpoints tienen más errores 500?

SELECT 
    endpoint,
    COUNT(*) as total_errors,
    COUNT(DISTINCT user_id) as usuarios_afectados,
    ROUND(AVG(response_time_ms), 2) as avg_response_time
FROM logs
WHERE status_code >= 500
GROUP BY endpoint
ORDER BY total_errors DESC
LIMIT 10;`,
      explanation: { es: 'Los errores 500 son críticos. Afectan la experiencia del usuario y pueden indicar bugs.', en: '500 errors are critical. Affect user experience and can indicate bugs.', pt: 'Os erros 500 são críticos. Afetam a experiência do usuário e podem indicar bugs.' },
      warning: { es: 'Si un endpoint tiene muchos errores Y muchos usuarios afectados, es prioridad alta.', en: 'If an endpoint has many errors AND many affected users, it\'s high priority.', pt: 'Se um endpoint tem muitos erros E muitos usuários afetados, é prioridade alta.' }
    },
    { 
      order: 7, 
      text: { es: '⏱️ Query 4: Performance por endpoint', en: '⏱️ Query 4: Endpoint performance', pt: '⏱️ Query 4: Performance por endpoint' },
      code: `-- ========================================
-- 4. PERFORMANCE POR ENDPOINT
-- ========================================
-- ¿Qué endpoints son más lentos?

SELECT 
    endpoint,
    COUNT(*) as requests,
    ROUND(AVG(response_time_ms), 2) as avg_time,
    ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY response_time_ms), 2) as p50,
    ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY response_time_ms), 2) as p95,
    MAX(response_time_ms) as max_time
FROM logs
WHERE status_code < 500  -- Solo requests exitosas
GROUP BY endpoint
HAVING COUNT(*) > 100  -- Solo endpoints con suficiente tráfico
ORDER BY p95 DESC
LIMIT 10;`,
      explanation: { es: 'El promedio puede ser engañoso. El percentil 95 (p95) te dice cuánto tarda el 95% de las requests.', en: 'Average can be misleading. 95th percentile (p95) tells you how long 95% of requests take.', pt: 'A média pode ser enganosa. O percentil 95 (p95) diz quanto demora 95% das requests.' },
      tip: { es: 'En producción, se monitorea p50, p95, y p99. El p95 es el más común para SLOs.', en: 'In production, p50, p95, p99 are monitored. p95 is most common for SLOs.', pt: 'Em produção, monitora-se p50, p95 e p99. O p95 é o mais comum para SLOs.' }
    },
    { 
      order: 8, 
      text: { es: '📈 Query 5: Tendencia horaria', en: '📈 Query 5: Hourly trend', pt: '📈 Query 5: Tendência horária' },
      code: `-- ========================================
-- 5. TENDENCIA HORARIA
-- ========================================
-- ¿A qué hora hay más tráfico?

SELECT 
    EXTRACT(HOUR FROM timestamp) as hora,
    COUNT(*) as requests,
    ROUND(AVG(response_time_ms), 2) as avg_response_time,
    SUM(CASE WHEN status_code >= 500 THEN 1 ELSE 0 END) as errors
FROM logs
GROUP BY EXTRACT(HOUR FROM timestamp)
ORDER BY hora;`,
      explanation: { es: 'El tráfico varía por hora. Saber cuándo hay picos te ayuda a planificar capacidad.', en: 'Traffic varies by hour. Knowing peaks helps capacity planning.', pt: 'O tráfego varia por hora. Saber quando há picos ajuda a planejar capacidade.' },
      tip: { es: 'Buscá correlación entre tráfico alto y tiempos de respuesta altos. Puede indicar problemas de escala.', en: 'Look for correlation between high traffic and high response times. Can indicate scale problems.', pt: 'Busque correlação entre tráfego alto e tempos de resposta altos. Pode indicar problemas de escala.' }
    },
    { 
      order: 9, 
      text: { es: '🏆 Query 6: Window Functions - Ranking', en: '🏆 Query 6: Window Functions - Ranking', pt: '🏆 Query 6: Window Functions - Ranking' },
      code: `-- ========================================
-- 6. WINDOW FUNCTIONS - RANKING
-- ========================================
-- Top 3 requests más lentas por endpoint

WITH ranked AS (
    SELECT 
        endpoint,
        timestamp,
        response_time_ms,
        user_id,
        ROW_NUMBER() OVER (
            PARTITION BY endpoint 
            ORDER BY response_time_ms DESC
        ) as rank
    FROM logs
    WHERE status_code < 500
)
SELECT * FROM ranked 
WHERE rank <= 3
ORDER BY endpoint, rank;`,
      explanation: { es: 'ROW_NUMBER() numera filas dentro de cada grupo (PARTITION BY). Perfecto para "top N por categoría".', en: 'ROW_NUMBER() numbers rows within each group (PARTITION BY). Perfect for "top N per category".', pt: 'ROW_NUMBER() numera linhas dentro de cada grupo (PARTITION BY). Perfeito para "top N por categoria".' },
      tip: { es: 'La diferencia: ROW_NUMBER siempre da números únicos, RANK puede repetir si hay empates.', en: 'Difference: ROW_NUMBER always gives unique numbers, RANK can repeat if ties.', pt: 'A diferença: ROW_NUMBER sempre dá números únicos, RANK pode repetir se houver empates.' }
    },
    { 
      order: 10, 
      text: { es: '📊 Query 7: Comparación con período anterior (LAG)', en: '📊 Query 7: Comparison with previous period (LAG)', pt: '📊 Query 7: Comparação com período anterior (LAG)' },
      code: `-- ========================================
-- 7. COMPARACIÓN CON PERÍODO ANTERIOR
-- ========================================
-- ¿Cómo cambia el tráfico día a día?

WITH daily_stats AS (
    SELECT 
        DATE(timestamp) as fecha,
        COUNT(*) as requests,
        ROUND(AVG(response_time_ms), 2) as avg_time
    FROM logs
    GROUP BY DATE(timestamp)
)
SELECT 
    fecha,
    requests,
    LAG(requests) OVER (ORDER BY fecha) as requests_dia_anterior,
    requests - LAG(requests) OVER (ORDER BY fecha) as diferencia,
    ROUND(
        (requests - LAG(requests) OVER (ORDER BY fecha)) * 100.0 / 
        LAG(requests) OVER (ORDER BY fecha), 
        2
    ) as cambio_porcentual
FROM daily_stats
ORDER BY fecha;`,
      explanation: { es: 'LAG() te da el valor de la fila anterior. Perfecto para comparar con períodos previos.', en: 'LAG() gives value of previous row. Perfect for comparing with previous periods.', pt: 'LAG() te dá o valor da linha anterior. Perfeito para comparar com períodos prévios.' },
      tip: { es: 'LEAD() hace lo contrario: te da el valor de la fila siguiente.', en: 'LEAD() does opposite: gives value of next row.', pt: 'LEAD() faz o contrário: te dá o valor da linha seguinte.' }
    },
    { 
      order: 11, 
      text: { es: '💡 Escribí 3 recomendaciones', en: '💡 Write 3 recommendations', pt: '💡 Escreva 3 recomendações' },
      explanation: { es: 'Basándote en tu análisis, escribí 3 recomendaciones accionables para el equipo de desarrollo.', en: 'Based on your analysis, write 3 actionable recommendations for dev team.', pt: 'Baseando-se na sua análise, escreva 3 recomendações acionáveis para a equipe de desenvolvimento.' },
      tip: { es: 'Ejemplo: "El endpoint /api/search tiene p95 de 2.5s. Recomiendo agregar caching o optimizar la query de base de datos."', en: 'Example: "/api/search endpoint has 2.5s p95. I recommend adding caching or optimizing DB query."', pt: 'Exemplo: "O endpoint /api/search tem p95 de 2.5s. Recomendo adicionar caching ou otimizar a query de banco de dados."' },
      checkpoint: { es: '¿Tus recomendaciones son específicas y basadas en datos?', en: 'Are your recommendations specific and data-driven?', pt: 'Suas recomendações são específicas e baseadas em dados?' }
    },
  ],
  deliverable: { es: 'Archivo analysis.sql con queries comentadas + documento con hallazgos y recomendaciones', en: 'analysis.sql file with commented queries + document with findings and recommendations', pt: 'Arquivo analysis.sql com queries comentadas + documento com achados e recomendações' },
  evaluation: [
    { es: '¿Cada query tiene un comentario explicando su propósito?', en: 'Does each query have a comment explaining its purpose?', pt: 'Cada query tem um comentário explicando seu propósito?' },
    { es: '¿Usaste alias claros y descriptivos?', en: 'Did you use clear and descriptive aliases?', pt: 'Usou aliases claros e descritivos?' },
    { es: '¿Identificaste al menos 3 insights accionables?', en: 'Did you identify at least 3 actionable insights?', pt: 'Identificou pelo menos 3 insights acionáveis?' },
    { es: '¿Usaste Window Functions correctamente?', en: 'Did you use Window Functions correctly?', pt: 'Usou Window Functions corretamente?' },
    { es: '¿Las recomendaciones son específicas y basadas en datos?', en: 'Are recommendations specific and data-driven?', pt: 'As recomendações são específicas e baseadas em dados?' },
  ],
  codeExample: `-- analysis.sql - Análisis Completo de Logs
-- ================================================
-- Dataset: Web server logs de aplicación e-commerce
-- Autor: [Tu nombre]
-- Fecha: [Fecha]
-- ================================================

-- ========================================
-- 1. EXPLORACIÓN INICIAL
-- ========================================
SELECT 
    COUNT(*) as total_requests,
    MIN(timestamp) as primera_request,
    MAX(timestamp) as ultima_request,
    COUNT(DISTINCT user_id) as usuarios_unicos,
    COUNT(DISTINCT endpoint) as endpoints_unicos
FROM logs;

-- ========================================
-- 2. ENDPOINTS MÁS USADOS
-- ========================================
SELECT 
    endpoint,
    COUNT(*) as hits,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM logs), 2) as porcentaje
FROM logs
GROUP BY endpoint
ORDER BY hits DESC
LIMIT 10;

-- ========================================
-- 3. ANÁLISIS DE ERRORES
-- ========================================
SELECT 
    endpoint,
    COUNT(*) as total_errors,
    COUNT(DISTINCT user_id) as usuarios_afectados
FROM logs
WHERE status_code >= 500
GROUP BY endpoint
ORDER BY total_errors DESC;

-- ========================================
-- 4. PERFORMANCE (P50, P95, P99)
-- ========================================
SELECT 
    endpoint,
    COUNT(*) as requests,
    ROUND(PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY response_time_ms), 2) as p50,
    ROUND(PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY response_time_ms), 2) as p95,
    ROUND(PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY response_time_ms), 2) as p99
FROM logs
WHERE status_code < 500
GROUP BY endpoint
HAVING COUNT(*) > 100
ORDER BY p95 DESC;

-- ========================================
-- 5. TOP 3 REQUESTS LENTAS POR ENDPOINT
-- ========================================
WITH ranked AS (
    SELECT 
        endpoint,
        timestamp,
        response_time_ms,
        ROW_NUMBER() OVER (PARTITION BY endpoint ORDER BY response_time_ms DESC) as rank
    FROM logs
)
SELECT * FROM ranked WHERE rank <= 3;`,
  theory: { es: `## ¿Por qué analizar logs?

Los logs son la fuente de verdad de lo que pasa en tu sistema:
- **Detectar problemas**: Errores, timeouts, patrones anómalos
- **Optimizar performance**: Identificar endpoints lentos
- **Entender usuarios**: Qué usan, cuándo, cómo
- **Debugging**: Reconstruir qué pasó cuando algo falló

## DuckDB: SQL sin servidor

DuckDB es perfecto para analytics:
- Corre en tu máquina, sin instalar nada
- Lee directamente JSON, CSV, Parquet
- Sintaxis SQL estándar + funciones modernas
- Optimizado para queries analíticas (columnar)

## Window Functions - Esenciales

| Función | Uso | Ejemplo |
|---------|-----|---------|
| ROW_NUMBER() | Numerar filas | Top N por grupo |
| RANK() | Ranking con empates | Posición en leaderboard |
| LAG() | Valor anterior | Comparar con ayer |
| LEAD() | Valor siguiente | Predecir tendencia |
| SUM() OVER() | Acumulado | Running total |

## Percentiles para Performance

- **p50 (mediana)**: El 50% de las requests son más rápidas
- **p95**: El 95% son más rápidas (lo que ve la mayoría)
- **p99**: El 99% son más rápidas (casos extremos)

**Regla**: Si tu p95 es malo, el 5% de tus usuarios tienen mala experiencia.`, en: `## Why analyze logs?

Logs are the source of truth of what happens in your system:
- **Detect problems**: Errors, timeouts, anomalous patterns
- **Optimize performance**: Identify slow endpoints
- **Understand users**: What they use, when, how
- **Debugging**: Reconstruct what happened when something failed

## DuckDB: Serverless SQL

DuckDB is perfect for analytics:
- Runs on your machine, no install
- Reads JSON, CSV, Parquet directly
- Standard SQL syntax + modern functions
- Optimized for analytical queries (columnar)

## Window Functions - Essential

| Function | Use | Example |
|----------|-----|---------|
| ROW_NUMBER() | Number rows | Top N per group |
| RANK() | Ranking with ties | Leaderboard position |
| LAG() | Previous value | Compare with yesterday |
| LEAD() | Next value | Predict trend |
| SUM() OVER() | Accumulate | Running total |

## Percentiles for Performance

- **p50 (median)**: 50% of requests are faster
- **p95**: 95% are faster (what most see)
- **p99**: 99% are faster (extreme cases)

**Rule**: If your p95 is bad, 5% of your users have bad experience.`, pt: `## Por que analisar logs?

Logs são a fonte da verdade do que acontece no seu sistema:
- **Detectar problemas**: Erros, timeouts, padrões anômalos
- **Otimizar performance**: Identificar endpoints lentos
- **Entender usuários**: O que usam, quando, como
- **Debugging**: Reconstruir o que aconteceu quando algo falhou

## DuckDB: SQL sem servidor

DuckDB é perfeito para analytics:
- Roda na sua máquina, sem instalar nada
- Lê diretamente JSON, CSV, Parquet
- Sintaxe SQL padrão + funções modernas
- Otimizado para queries analíticas (colunar)

## Window Functions - Essenciais

| Função | Uso | Exemplo |
|--------|-----|---------|
| ROW_NUMBER() | Numerar linhas | Top N por grupo |
| RANK() | Ranking com empates | Posição no leaderboard |
| LAG() | Valor anterior | Comparar com ontem |
| LEAD() | Valor seguinte | Prever tendência |
| SUM() OVER() | Acumulado | Running total |

## Percentis para Performance

- **p50 (mediana)**: 50% das requests são mais rápidas
- **p95**: 95% são mais rápidas (o que a maioria vê)
- **p99**: 99% são mais rápidas (casos extremos)

**Regra**: Se seu p95 é ruim, 5% dos seus usuários têm má experiência.` },
  nextSteps: [
    { es: 'Hacé el proyecto "Pipeline con API" para combinar Python + SQL', en: 'Do "Pipeline with API" project to combine Python + SQL', pt: 'Faça o projeto "Pipeline com API" para combinar Python + SQL' },
    { es: 'Agregá análisis por user_id: ¿hay usuarios que generan muchos errores?', en: 'Add analysis by user_id: are there users generating many errors?', pt: 'Adicione análise por user_id: há usuários gerando muitos erros?' },
    { es: 'Creá un dashboard simple con los resultados', en: 'Create a simple dashboard with results', pt: 'Crie um dashboard simples com os resultados' },
  ],
  resources: [
    { title: { es: 'DuckDB Documentation', en: 'DuckDB Documentation', pt: 'Documentação DuckDB' }, url: 'https://duckdb.org/docs/', type: 'docs' },
    { title: { es: 'Window Functions Tutorial', en: 'Window Functions Tutorial', pt: 'Tutorial Window Functions' }, url: 'https://mode.com/sql-tutorial/sql-window-functions/', type: 'article' },
  ],
};


