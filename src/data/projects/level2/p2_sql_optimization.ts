import { Project } from '../../../types/members';

export const p2_sql_optimization: Project = {
  id: 'p2-sql-optimization',
  level: 2,
  title: { es: 'Optimización de Queries SQL', en: 'SQL Query Optimization', pt: 'Otimização de Queries SQL' },
  description: {
    es: 'Aprendé a hacer queries 10x más rápidas. Esto te diferencia de otros candidatos en entrevistas.',
    en: 'Learn to make queries 10x faster. This sets you apart from other candidates in interviews.',
    pt: 'Aprenda a fazer queries 10x mais rápidas. Isso te diferencia de outros candidatos em entrevistas.'
  },
  difficulty: 'Avanzado',
  duration: '3-4 horas',
  skills: [{ es: 'SQL' }, { es: 'Performance' }, { es: 'EXPLAIN' }, { es: 'Indexing' }],
  icon: '🚀',
  color: 'emerald',
  datasetId: 'logs',
  prerequisites: ['p1-extra-window-functions', 'p2-sql-logs'],
  estimatedLines: 80,
  realWorldExample: {
    es: 'Así optimizan queries los DBAs de empresas como Shopify',
    en: 'This is how DBAs at companies like Shopify optimize queries',
    pt: 'Assim os DBAs de empresas como Shopify otimizam queries'
  },
  usedBy: ['Shopify', 'Stripe', 'GitHub', 'Stack Overflow'],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Query optimizada', en: 'Optimized query', pt: 'Query otimizada' },
      example: `ANTES (sin índice):
  Seq Scan on orders
  Rows: 1,000,000
  Time: 4500ms

DESPUÉS (con índice):
  Index Scan using idx_orders_date
  Rows: 1,000
  Time: 12ms

⚡ 375x más rápido!`
    },
  ],
  learningObjectives: [
    { es: 'Leer y entender EXPLAIN plans', en: 'Read and understand EXPLAIN plans', pt: 'Ler e entender EXPLAIN plans' },
    { es: 'Identificar cuellos de botella', en: 'Identify bottlenecks', pt: 'Identificar gargalos' },
    { es: 'Crear índices estratégicos', en: 'Create strategic indexes', pt: 'Criar índices estratégicos' },
    { es: 'Reescribir queries ineficientes', en: 'Rewrite inefficient queries', pt: 'Reescrever queries ineficientes' },
    { es: 'Medir mejoras de performance', en: 'Measure performance improvements', pt: 'Medir melhorias de performance' },
  ],
  interviewStory: {
    hook: { es: "Optimicé una query que tardaba 45 segundos a solo 50 milisegundos - el dashboard pasó de inutilizable a instantáneo.", en: "Optimized a query taking 45 seconds to just 50 milliseconds - dashboard went from unusable to instant.", pt: "Otimizei uma query que demorava 45 segundos para apenas 50 milissegundos - o dashboard passou de inutilizável para instantâneo." },
    situation: { es: "El dashboard de analytics estaba lento. Los usuarios se quejaban de que tardaba casi un minuto en cargar. El equipo de backend decía que 'SQL es lento'.", en: "Analytics dashboard was slow. Users complained it took almost a minute to load. Backend team said 'SQL is slow'.", pt: "O dashboard de analytics estava lento. Os usuários reclamavam que demorava quase um minuto para carregar. A equipe de backend dizia que 'SQL é lento'." },
    task: { es: "Analizar y optimizar las queries más lentas para hacer el dashboard usable.", en: "Analyze and optimize slowest queries to make dashboard usable.", pt: "Analisar e otimizar as queries mais lentas para tornar o dashboard utilizável." },
    actions: [
      { es: "Usé EXPLAIN ANALYZE para identificar los cuellos de botella", en: "Used EXPLAIN ANALYZE to identify bottlenecks", pt: "Usei EXPLAIN ANALYZE para identificar os gargalos" },
      { es: "Encontré que la query hacía Sequential Scan en 10M de filas", en: "Found query doing Sequential Scan on 10M rows", pt: "Encontrei que a query fazia Sequential Scan em 10M de linhas" },
      { es: "Creé índices compuestos en las columnas de filtro más usadas", en: "Created composite indexes on most used filter columns", pt: "Criei índices compostos nas colunas de filtro mais usadas" },
      { es: "Reescribí subqueries ineficientes como JOINs", en: "Rewrote inefficient subqueries as JOINs", pt: "Reescrevi subqueries ineficientes como JOINs" },
      { es: "Agregué materialización para cálculos que no cambian frecuentemente", en: "Added materialization for calculations that don't change frequently", pt: "Adicionei materialização para cálculos que não mudam frequentemente" }
    ],
    results: [
      { es: "Query principal: de 45 segundos a 50ms (900x más rápido)", en: "Main query: from 45 seconds to 50ms (900x faster)", pt: "Query principal: de 45 segundos para 50ms (900x mais rápido)" },
      { es: "Dashboard ahora carga en <1 segundo", en: "Dashboard now loads in <1 second", pt: "Dashboard agora carrega em <1 segundo" },
      { es: "Usuarios felices, equipo de backend sorprendido", en: "Happy users, backend team surprised", pt: "Usuários felizes, equipe de backend surpresa" },
      { es: "Costo de base de datos bajó 40% por menos CPU", en: "Database cost dropped 40% due to less CPU", pt: "Custo de banco de dados caiu 40% por menos CPU" }
    ],
    learnings: [
      { es: "EXPLAIN es tu mejor amigo - nunca optimices a ciegas", en: "EXPLAIN is your best friend - never optimize blindly", pt: "EXPLAIN é seu melhor amigo - nunca otimize às cegas" },
      { es: "Los índices no son magia - hay que elegir las columnas correctas", en: "Indexes are not magic - must choose correct columns", pt: "Os índices não são mágica - tem que escolher as colunas corretas" },
      { es: "A veces la solución es cambiar el modelo de datos, no la query", en: "Sometimes solution is changing data model, not query", pt: "Às vezes a solução é mudar o modelo de dados, não a query" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo identificás qué optimizar?", en: "How do you identify what to optimize?", pt: "Como identifica o que otimizar?" },
        answer: { es: "1) EXPLAIN ANALYZE para ver el plan, 2) Busco Seq Scans en tablas grandes, 3) Busco Nested Loops con muchas iteraciones, 4) Mido tiempo real vs estimado.", en: "1) EXPLAIN ANALYZE to see plan, 2) Look for Seq Scans on large tables, 3) Look for Nested Loops with many iterations, 4) Measure real vs estimated time.", pt: "1) EXPLAIN ANALYZE para ver o plano, 2) Busco Seq Scans em tabelas grandes, 3) Busco Nested Loops com muitas iterações, 4) Meço tempo real vs estimado." }
      },
      {
        question: { es: "¿Cuándo NO crear un índice?", en: "When NOT to create an index?", pt: "Quando NÃO criar um índice?" },
        answer: { es: "1) Tablas pequeñas (<10K filas), 2) Columnas con baja cardinalidad, 3) Tablas con muchos INSERTs (índices hacen writes más lentos), 4) Cuando ya hay muchos índices.", en: "1) Small tables (<10K rows), 2) Low cardinality columns, 3) Tables with many INSERTs (indexes make writes slower), 4) When there are already many indexes.", pt: "1) Tabelas pequenas (<10K linhas), 2) Colunas com baixa cardinalidade, 3) Tabelas com muitos INSERTs (índices fazem writes mais lentos), 4) Quando já há muitos índices." }
      },
      {
        question: { es: "¿Índice compuesto vs múltiples índices simples?", en: "Composite index vs multiple simple indexes?", pt: "Índice composto vs múltiplos índices simples?" },
        answer: { es: "Compuesto cuando siempre filtro por ambas columnas juntas. El orden importa: la columna más selectiva primero. Un índice (a, b) sirve para filtrar por (a) pero no por (b) solo.", en: "Composite when always filtering by both columns together. Order matters: most selective column first. An index (a, b) works for filtering by (a) but not by (b) alone.", pt: "Composto quando sempre filtro por ambas colunas juntas. A ordem importa: a coluna mais seletiva primeiro. Um índice (a, b) serve para filtrar por (a) mas não por (b) sozinho." }
      }
    ],
    closingStatement: { es: "SQL no es lento - las queries mal escritas son lentas. Saber optimizar te hace invaluable.", en: "SQL is not slow - poorly written queries are slow. Knowing how to optimize makes you invaluable.", pt: "SQL não é lento - as queries mal escritas são lentas. Saber otimizar te torna inestimável." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📥 Cargá datos en DuckDB (o PostgreSQL)', en: '📥 Load data into DuckDB (or PostgreSQL)', pt: '📥 Carregue dados no DuckDB (ou PostgreSQL)' },
      code: `import duckdb

# Conectar a DuckDB
con = duckdb.connect('optimization_lab.db')

# Cargar datos (DuckDB puede leer JSON directamente)
con.execute("""
    CREATE TABLE logs AS 
    SELECT * FROM read_json_auto('data/logs.json')
""")

# Verificar tamaño
print(con.execute("SELECT COUNT(*) FROM logs").fetchone())`,
      explanation: { es: `**Nota sobre herramientas:**

Para este proyecto podés usar **DuckDB** o **PostgreSQL**. Ambos soportan EXPLAIN y tienen comportamiento similar.

| Comando | DuckDB | PostgreSQL |
|---------|--------|------------|
| Ver plan | EXPLAIN query | EXPLAIN query |
| Ver plan + ejecutar | EXPLAIN ANALYZE query | EXPLAIN ANALYZE query |
| Crear índice | CREATE INDEX... | CREATE INDEX... |

**La sintaxis SQL es prácticamente idéntica.** Si preferís PostgreSQL, instalalo con Docker:
\`\`\`bash
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres
\`\`\``, en: `**Note on tools:**

For this project you can use **DuckDB** or **PostgreSQL**. Both support EXPLAIN and behave similarly.

| Command | DuckDB | PostgreSQL |
|---------|--------|------------|
| See plan | EXPLAIN query | EXPLAIN query |
| See plan + execute | EXPLAIN ANALYZE query | EXPLAIN ANALYZE query |
| Create index | CREATE INDEX... | CREATE INDEX... |

**SQL syntax is practically identical.** If you prefer PostgreSQL, install with Docker:
\`\`\`bash
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres
\`\`\``, pt: `**Nota sobre ferramentas:**

Para este projeto você pode usar **DuckDB** ou **PostgreSQL**. Ambos suportam EXPLAIN e têm comportamento similar.

| Comando | DuckDB | PostgreSQL |
|---------|--------|------------|
| Ver plano | EXPLAIN query | EXPLAIN query |
| Ver plano + executar | EXPLAIN ANALYZE query | EXPLAIN ANALYZE query |
| Criar índice | CREATE INDEX... | CREATE INDEX... |

**A sintaxe SQL é praticamente idêntica.** Se preferir PostgreSQL, instale com Docker:
\`\`\`bash
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pass postgres
\`\`\`` },
      checkpoint: { es: '¿Tenés al menos 10K filas?', en: 'Do you have at least 10K rows?', pt: 'Tem pelo menos 10K linhas?' }
    },
    { 
      order: 2, 
      text: { es: '🐌 Escribí una query lenta', en: '🐌 Write a slow query', pt: '🐌 Escreva uma query lenta' },
      code: `-- Query ineficiente (a propósito)
SELECT 
    l1.endpoint,
    (SELECT AVG(response_time_ms) FROM logs l2 WHERE l2.endpoint = l1.endpoint) as avg_time,
    (SELECT COUNT(*) FROM logs l2 WHERE l2.endpoint = l1.endpoint) as count
FROM logs l1
WHERE l1.status_code = 500;`,
      explanation: { es: 'Los subqueries correlacionados se ejecutan para CADA fila. Muy lento.', en: 'Correlated subqueries run for EACH row. Very slow.', pt: 'Subqueries correlacionados são executados para CADA linha. Muito lento.' }
    },
    { 
      order: 3, 
      text: { es: '🔍 Usá EXPLAIN ANALYZE', en: '🔍 Use EXPLAIN ANALYZE', pt: '🔍 Use EXPLAIN ANALYZE' },
      code: `EXPLAIN ANALYZE
SELECT 
    l1.endpoint,
    (SELECT AVG(response_time_ms) FROM logs l2 WHERE l2.endpoint = l1.endpoint) as avg_time
FROM logs l1
WHERE l1.status_code = 500;

-- Buscar:
-- - Seq Scan (escaneo completo)
-- - Nested Loop (loops anidados)
-- - Tiempo de ejecución`,
      explanation: { es: 'EXPLAIN ANALYZE ejecuta la query y muestra el plan real con tiempos.', en: 'EXPLAIN ANALYZE executes query and shows real plan with times.', pt: 'EXPLAIN ANALYZE executa a query e mostra o plano real com tempos.' }
    },
    { 
      order: 4, 
      text: { es: '📈 Agregá índices', en: '📈 Add indexes', pt: '📈 Adicione índices' },
      code: `-- Crear índices en columnas usadas en WHERE y JOIN
CREATE INDEX idx_logs_endpoint ON logs(endpoint);
CREATE INDEX idx_logs_status ON logs(status_code);

-- Verificar que se usan
EXPLAIN ANALYZE
SELECT * FROM logs WHERE endpoint = '/api/users';`,
      explanation: { es: 'Los índices aceleran búsquedas pero ocupan espacio y ralentizan INSERTs.', en: 'Indexes speed up searches but take up space and slow down INSERTs.', pt: 'Índices aceleram buscas mas ocupam espaço e deixam INSERTs mais lentos.' }
    },
    { 
      order: 5, 
      text: { es: '✏️ Reescribí la query', en: '✏️ Rewrite the query', pt: '✏️ Reescreva a query' },
      code: `-- Query optimizada con JOIN
SELECT 
    l.endpoint,
    stats.avg_time,
    stats.count
FROM logs l
JOIN (
    SELECT 
        endpoint,
        AVG(response_time_ms) as avg_time,
        COUNT(*) as count
    FROM logs
    GROUP BY endpoint
) stats ON l.endpoint = stats.endpoint
WHERE l.status_code = 500;`,
      explanation: { es: 'Un JOIN con subquery agregada es mucho más eficiente que subqueries correlacionados.', en: 'JOIN with aggregated subquery is much more efficient than correlated subqueries.', pt: 'Um JOIN com subquery agregada é muito mais eficiente que subqueries correlacionados.' }
    },
    { 
      order: 6, 
      text: { es: '⏱️ Compará tiempos', en: '⏱️ Compare times', pt: '⏱️ Compare tempos' },
      code: `-- Medir tiempo de query original
\\timing on

-- Query original: X ms
-- Query optimizada: Y ms
-- Mejora: X/Y veces`,
      checkpoint: { es: '¿Lograste mejora de al menos 5x?', en: 'Did you achieve at least 5x improvement?', pt: 'Conseguiu melhoria de pelo menos 5x?' }
    },
  ],
  deliverable: { es: 'Documento con queries antes/después + análisis de EXPLAIN', en: 'Document with before/after queries + EXPLAIN analysis', pt: 'Documento com queries antes/depois + análise de EXPLAIN' },
  evaluation: [
    { es: '¿Lograste mejora de al menos 5x?', en: 'Did you achieve at least 5x improvement?', pt: 'Conseguiu melhoria de pelo menos 5x?' },
    { es: '¿Entendés cuándo usar índices?', en: 'Do you understand when to use indexes?', pt: 'Entende quando usar índices?' },
    { es: '¿Podés leer un EXPLAIN plan?', en: 'Can you read an EXPLAIN plan?', pt: 'Consegue ler um EXPLAIN plan?' },
    { es: '¿Documentaste cada optimización?', en: 'Did you document each optimization?', pt: 'Documentou cada otimização?' },
  ],
  theory: { es: `## Cómo leer EXPLAIN

| Operación | Significado | Bueno/Malo |
|-----------|-------------|------------|
| Seq Scan | Escaneo completo | ❌ Malo para tablas grandes |
| Index Scan | Usa índice | ✅ Bueno |
| Nested Loop | Loop anidado | ⚠️ Depende |
| Hash Join | Join con hash | ✅ Bueno para tablas grandes |

## Cuándo crear índices

✅ Columnas en WHERE frecuentes
✅ Columnas en JOIN
✅ Columnas en ORDER BY

❌ Tablas pequeñas
❌ Columnas con pocos valores únicos
❌ Tablas con muchos INSERTs`, en: `## How to read EXPLAIN

| Operation | Meaning | Good/Bad |
|-----------|---------|----------|
| Seq Scan | Full scan | ❌ Bad for large tables |
| Index Scan | Uses index | ✅ Good |
| Nested Loop | Nested loop | ⚠️ Depends |
| Hash Join | Hash Join | ✅ Good for large tables |

## When to create indexes

✅ Frequent WHERE columns
✅ JOIN columns
✅ ORDER BY columns

❌ Small tables
❌ Columns with few unique values
❌ Tables with many INSERTs`, pt: `## Como ler EXPLAIN

| Operação | Significado | Bom/Ruim |
|----------|-------------|----------|
| Seq Scan | Escaneamento completo | ❌ Ruim para tabelas grandes |
| Index Scan | Usa índice | ✅ Bom |
| Nested Loop | Loop aninhado | ⚠️ Depende |
| Hash Join | Join com hash | ✅ Bom para tabelas grandes |

## Quando criar índices

✅ Colunas em WHERE frequentes
✅ Colunas em JOIN
✅ Colunas em ORDER BY

❌ Tabelas pequenas
❌ Colunas com poucos valores únicos
❌ Tabelas com muitos INSERTs` },
};


