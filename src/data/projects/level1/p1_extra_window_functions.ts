import { Project } from '../../../types/members';

export const p1_extra_window_functions: Project = {
  id: 'p1-extra-window-functions',
  level: 1,
  title: { es: 'Masterclass de Window Functions', en: 'Window Functions Masterclass', pt: 'Masterclass de Window Functions' },
  description: {
    es: 'Aprendé a usar ROW_NUMBER, RANK, LEAD y LAG para análisis avanzados en SQL. Indispensable para entrevistas.',
    en: 'Learn to use ROW_NUMBER, RANK, LEAD, and LAG for advanced SQL analysis. Essential for interviews.',
    pt: 'Aprenda a usar ROW_NUMBER, RANK, LEAD e LAG para análises avançadas em SQL. Indispensável para entrevistas.'
  },
  difficulty: 'Intermedio',
  duration: '2-3 horas',
  skills: [{ es: 'SQL Avanzado', en: 'Advanced SQL', pt: 'SQL Avançado' }, { es: 'Window Functions' }, { es: 'Analytics' }],
  icon: '🪟',
  color: 'purple',
  datasetId: 'ecommerce',
  prerequisites: ['p1-etl-python', 'p1-extra-sql-joins'],
  estimatedLines: 70,
  realWorldExample: {
    es: 'Usado para calcular rankings de ventas, comparar mes actual vs anterior (YoY/MoM) y detectar duplicados.',
    en: 'Used to calculate sales rankings, compare current vs previous month (YoY/MoM), and detect duplicates.',
    pt: 'Usado para calcular rankings de vendas, comparar mês atual vs anterior (YoY/MoM) e detectar duplicados.'
  },
  usedBy: ['Uber (viajes previos)', 'Netflix (ranking visualizaciones)', 'Spotify (top canciones)'],
  learningObjectives: [
    { es: 'Entender PARTITION BY y ORDER BY dentro de OVER()', en: 'Understand PARTITION BY and ORDER BY inside OVER()', pt: 'Entender PARTITION BY e ORDER BY dentro de OVER()' },
    { es: 'Calcular rankings con ROW_NUMBER, RANK, DENSE_RANK', en: 'Calculate rankings with ROW_NUMBER, RANK, DENSE_RANK', pt: 'Calcular rankings com ROW_NUMBER, RANK, DENSE_RANK' },
    { es: 'Comparar filas con LEAD y LAG', en: 'Compare rows with LEAD and LAG', pt: 'Comparar linhas com LEAD e LAG' },
    { es: 'Calcular totales acumulados (Running Total)', en: 'Calculate running totals', pt: 'Calcular totais acumulados (Running Total)' },
  ],
  expectedOutputs: [
    {
      step: 3,
      description: { es: 'Ranking de productos por categoría', en: 'Product ranking by category', pt: 'Ranking de produtos por categoria' },
      example: `+-------------+----------------+----------+--------+
| category    | product        | sales    | rank   |
+-------------+----------------+----------+--------+
| Electronics | Laptop         | 5000     | 1      |
| Electronics | Mouse          | 200      | 2      |
| Furniture   | Chair          | 800      | 1      |
| Furniture   | Lamp           | 100      | 2      |
+-------------+----------------+----------+--------+`
    },
    {
      step: 4,
      description: { es: 'Comparación MoM (Mes a Mes)', en: 'MoM Comparison (Month over Month)', pt: 'Comparação MoM (Mês a Mês)' },
      example: `+--------+-------+------------+-------------+
| month  | sales | prev_sales | growth_pct  |
+--------+-------+------------+-------------+
| Jan    | 1000  | NULL       | NULL        |
| Feb    | 1200  | 1000       | 20.0%       |
| Mar    | 1100  | 1200       | -8.3%       |
+--------+-------+------------+-------------+`
    },
  ],
  interviewStory: {
    hook: { es: "Detecté una caída del 15% en retención de usuarios usando LAG() para analizar tiempos entre sesiones.", en: "Detected 15% drop in user retention using LAG() to analyze time between sessions.", pt: "Detectei uma queda de 15% na retenção de usuários usando LAG() para analisar tempos entre sessões." },
    situation: { es: "Marketing quería saber si los usuarios volvían más rápido o más lento a la app después de un cambio de UI.", en: "Marketing wanted to know if users returned faster or slower to the app after a UI change.", pt: "Marketing queria saber se os usuários voltavam mais rápido ou mais lento para o app depois de uma mudança de UI." },
    task: { es: "Calcular el tiempo promedio entre sesiones por usuario y ver la tendencia mensual.", en: "Calculate average time between sessions per user and see monthly trend.", pt: "Calcular o tempo médio entre sessões por usuário e ver a tendência mensal." },
    actions: [
      { es: "Usé LAG() para traer la fecha de la sesión anterior a la fila actual", en: "Used LAG() to bring previous session date to current row", pt: "Usei LAG() para trazer a data da sessão anterior para a linha atual" },
      { es: "Calculé la diferencia en días (DATEDIFF) entre sesión actual y anterior", en: "Calculated day difference (DATEDIFF) between current and previous session", pt: "Calculei a diferença em dias (DATEDIFF) entre sessão atual e anterior" },
      { es: "Agrupé por mes y calculé el promedio de días entre sesiones", en: "Grouped by month and calculated average days between sessions", pt: "Agrupei por mês e calculei a média de dias entre sessões" },
      { es: "Usé PARTITION BY user_id para que el cálculo sea por usuario", en: "Used PARTITION BY user_id so calculation is per user", pt: "Usei PARTITION BY user_id para que o cálculo seja por usuário" }
    ],
    results: [
      { es: "Descubrimos que el tiempo entre sesiones aumentó de 3 a 5 días", en: "Discovered time between sessions increased from 3 to 5 days", pt: "Descobrimos que o tempo entre sessões aumentou de 3 a 5 dias" },
      { es: "Identificamos que el problema era en usuarios de Android", en: "Identified problem was with Android users", pt: "Identificamos que o problema era em usuários de Android" },
      { es: "Revertimos el cambio y la métrica volvió a la normalidad en 2 semanas", en: "Reverted change and metric returned to normal in 2 weeks", pt: "Revertemos a mudança e a métrica voltou ao normal em 2 semanas" }
    ],
    learnings: [
      { es: "LAG/LEAD son mucho más eficientes que self-joins para comparar filas", en: "LAG/LEAD are much more efficient than self-joins for comparing rows", pt: "LAG/LEAD são muito mais eficientes que self-joins para comparar linhas" },
      { es: "Entender PARTITION BY es clave para no mezclar datos de distintos usuarios", en: "Understanding PARTITION BY is key to not mixing data from different users", pt: "Entender PARTITION BY é chave para não misturar dados de diferentes usuários" },
      { es: "Window functions permiten análisis complejos sin subqueries anidados", en: "Window functions allow complex analysis without nested subqueries", pt: "Window functions permitem análises complexas sem subqueries aninhados" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Diferencia entre RANK, DENSE_RANK y ROW_NUMBER?", en: "Difference between RANK, DENSE_RANK, and ROW_NUMBER?", pt: "Diferença entre RANK, DENSE_RANK e ROW_NUMBER?" },
        answer: { es: "ROW_NUMBER siempre da único (1,2,3,4). RANK salta si hay empate (1,2,2,4). DENSE_RANK no salta (1,2,2,3).", en: "ROW_NUMBER is always unique (1,2,3,4). RANK skips on ties (1,2,2,4). DENSE_RANK doesn't skip (1,2,2,3).", pt: "ROW_NUMBER sempre dá único (1,2,3,4). RANK salta se houver empate (1,2,2,4). DENSE_RANK não salta (1,2,2,3)." }
      },
      {
        question: { es: "¿Qué hace PARTITION BY?", en: "What does PARTITION BY do?", pt: "O que faz PARTITION BY?" },
        answer: { es: "Divide el set de resultados en grupos y aplica la función a cada grupo por separado (como un GROUP BY pero sin colapsar filas).", en: "Divides result set into groups and applies function to each group separately (like GROUP BY but without collapsing rows).", pt: "Divide o set de resultados em grupos e aplica a função a cada grupo separadamente (como um GROUP BY mas sem colapsar linhas)." }
      },
      {
        question: { es: "¿Cómo calculás un Running Total?", en: "How do you calculate a Running Total?", pt: "Como calcula um Running Total?" },
        answer: { es: "SUM(columna) OVER (ORDER BY fecha ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW).", en: "SUM(column) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW).", pt: "SUM(coluna) OVER (ORDER BY data ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)." }
      }
    ],
    closingStatement: { es: "Si sabés Window Functions, estás en el top 20% de candidatos SQL.", en: "If you know Window Functions, you're in the top 20% of SQL candidates.", pt: "Se você sabe Window Functions, está no top 20% de candidatos SQL." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📊 Prepará el dataset de ventas', en: '📊 Prepare sales dataset', pt: '📊 Prepare o dataset de vendas' },
      explanation: { es: 'Usaremos una tabla de ventas con: date, category, product, amount.', en: 'We will use a sales table with: date, category, product, amount.', pt: 'Usaremos uma tabela de vendas com: date, category, product, amount.' },
      checkpoint: { es: '¿Tenés la tabla lista?', en: 'Table ready?', pt: 'Tabela pronta?' }
    },
    { 
      order: 2, 
      text: { es: '🥇 ROW_NUMBER: Top ventas', en: '🥇 ROW_NUMBER: Top sales', pt: '🥇 ROW_NUMBER: Top vendas' },
      code: `-- ROW_NUMBER: Asigna un número secuencial único
SELECT 
    product,
    category,
    amount,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount DESC) as rank_in_category
FROM sales;

-- Filtrar el Top 1 de cada categoría (requiere subquery/CTE)
WITH RankedSales AS (
    SELECT 
        product,
        category,
        amount,
        ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount DESC) as rn
    FROM sales
)
SELECT * FROM RankedSales WHERE rn = 1;`,
      explanation: { es: 'ROW_NUMBER numera filas. PARTITION BY reinicia la cuenta por categoría. ORDER BY define quién es el #1.', en: 'ROW_NUMBER numbers rows. PARTITION BY resets count by category. ORDER BY defines who is #1.', pt: 'ROW_NUMBER numera linhas. PARTITION BY reinicia a contagem por categoria. ORDER BY define quem é o #1.' },
      tip: { es: 'No podés usar window functions en WHERE directamente, necesitás CTE.', en: 'You can\'t use window functions in WHERE directly, you need CTE.', pt: 'Você não pode usar window functions no WHERE diretamente, precisa de CTE.' }
    },
    { 
      order: 3, 
      text: { es: '🥈 RANK vs DENSE_RANK', en: '🥈 RANK vs DENSE_RANK', pt: '🥈 RANK vs DENSE_RANK' },
      code: `-- Diferencia en empates
SELECT 
    product,
    amount,
    ROW_NUMBER() OVER (ORDER BY amount DESC) as rn,
    RANK() OVER (ORDER BY amount DESC) as rk,
    DENSE_RANK() OVER (ORDER BY amount DESC) as drk
FROM sales;`,
      explanation: { es: 'Probá con valores repetidos. RANK dejará huecos (1, 2, 2, 4). DENSE_RANK no (1, 2, 2, 3).', en: 'Try with repeated values. RANK will leave gaps (1, 2, 2, 4). DENSE_RANK won\'t (1, 2, 2, 3).', pt: 'Teste com valores repetidos. RANK deixará buracos (1, 2, 2, 4). DENSE_RANK não (1, 2, 2, 3).' },
      challenge: { es: '¿Cuál usarías para premiar a los 3 mejores vendedores si hay empate en el puesto 3?', en: 'Which one would you use to reward top 3 salespeople if there is a tie at 3rd place?', pt: 'Qual você usaria para premiar os 3 melhores vendedores se houver empate no 3º lugar?' }
    },
    { 
      order: 4, 
      text: { es: '📅 LEAD y LAG: Comparación temporal', en: '📅 LEAD and LAG: Time comparison', pt: '📅 LEAD e LAG: Comparação temporal' },
      code: `-- Comparar ventas con el día anterior
SELECT 
    date,
    amount as sales_today,
    LAG(amount) OVER (ORDER BY date) as sales_yesterday,
    LEAD(amount) OVER (ORDER BY date) as sales_tomorrow,
    amount - LAG(amount) OVER (ORDER BY date) as diff
FROM daily_sales;`,
      explanation: { es: 'LAG mira atrás, LEAD mira adelante. Ideal para calcular crecimiento (Growth Rate).', en: 'LAG looks back, LEAD looks forward. Ideal for calculating Growth Rate.', pt: 'LAG olha para trás, LEAD olha para frente. Ideal para calcular crescimento (Growth Rate).' },
      tip: { es: 'Podés especificar offset: LAG(col, 7) mira 7 días atrás.', en: 'You can specify offset: LAG(col, 7) looks 7 days back.', pt: 'Você pode especificar offset: LAG(col, 7) olha 7 dias para trás.' }
    },
    { 
      order: 5, 
      text: { es: '📈 Running Total (Acumulado)', en: '📈 Running Total', pt: '📈 Running Total (Acumulado)' },
      code: `-- Suma acumulada mes a mes
SELECT 
    month,
    amount,
    SUM(amount) OVER (ORDER BY month) as running_total
FROM monthly_sales;

-- Promedio móvil de 3 meses
AVG(amount) OVER (
    ORDER BY month 
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
) as moving_avg;`,
      explanation: { es: 'SUM() OVER() sin PARTITION acumula todo. Con PARTITION acumula por grupo.', en: 'SUM() OVER() without PARTITION accumulates everything. With PARTITION accumulates by group.', pt: 'SUM() OVER() sem PARTITION acumula tudo. Com PARTITION acumula por grupo.' },
      warning: { es: 'Cuidado con el orden por defecto si no especificás ROWS.', en: 'Watch out for default order if you don\'t specify ROWS.', pt: 'Cuidado com a ordem padrão se você não especificar ROWS.' }
    },
    { 
      order: 6, 
      text: { es: '🧠 Resolvé ejercicios de entrevista', en: '🧠 Solve interview exercises', pt: '🧠 Resolva exercícios de entrevista' },
      explanation: { es: 'Usá el dataset para responder preguntas típicas de entrevista.', en: 'Use dataset to answer typical interview questions.', pt: 'Use o dataset para responder perguntas típicas de entrevista.' },
      checkpoint: { es: '¿Podés calcular el % de crecimiento mensual?', en: 'Can you calculate monthly growth %?', pt: 'Consegue calcular a % de crescimento mensal?' }
    },
  ],
  deliverable: { es: 'Script SQL con 5 queries de análisis avanzado', en: 'SQL script with 5 advanced analysis queries', pt: 'Script SQL com 5 queries de análise avançada' },
  evaluation: [
    { es: '¿Usás CTEs para filtrar resultados de window functions?', en: 'Do you use CTEs to filter window function results?', pt: 'Usa CTEs para filtrar resultados de window functions?' },
    { es: '¿Entendés la diferencia entre RANK y DENSE_RANK?', en: 'Do you understand difference between RANK and DENSE_RANK?', pt: 'Entende a diferença entre RANK e DENSE_RANK?' },
    { es: '¿Podés calcular MoM Growth?', en: 'Can you calculate MoM Growth?', pt: 'Consegue calcular MoM Growth?' },
    { es: '¿Sabés usar ROWS BETWEEN?', en: 'Do you know how to use ROWS BETWEEN?', pt: 'Sabe usar ROWS BETWEEN?' },
  ],
  theory: { es: `## Window Functions

Sintaxis básica:
\`\`\`sql
FUNCION() OVER (
  [PARTITION BY columnas]
  [ORDER BY columnas]
  [ROWS frame]
)
\`\`\`

- **PARTITION BY**: "Divide" los datos en grupos (como GROUP BY) pero mantiene las filas individuales.
- **ORDER BY**: Define el orden dentro de cada partición.
- **ROWS**: Define la "ventana" de filas a considerar (ej: 3 anteriores).

## Funciones Clave
- **Ranking**: ROW_NUMBER, RANK, DENSE_RANK, NTILE
- **Offset**: LAG, LEAD, FIRST_VALUE, LAST_VALUE
- **Agregación**: SUM, AVG, MIN, MAX, COUNT (usadas con OVER)`, en: `## Window Functions

Basic Syntax:
\`\`\`sql
FUNCTION() OVER (
  [PARTITION BY columns]
  [ORDER BY columns]
  [ROWS frame]
)
\`\`\`

- **PARTITION BY**: "Divides" data into groups (like GROUP BY) but keeps individual rows.
- **ORDER BY**: Defines order within each partition.
- **ROWS**: Defines "window" of rows to consider (e.g., 3 previous).

## Key Functions
- **Ranking**: ROW_NUMBER, RANK, DENSE_RANK, NTILE
- **Offset**: LAG, LEAD, FIRST_VALUE, LAST_VALUE
- **Aggregation**: SUM, AVG, MIN, MAX, COUNT (used with OVER)`, pt: `## Window Functions

Sintaxe básica:
\`\`\`sql
FUNCAO() OVER (
  [PARTITION BY colunas]
  [ORDER BY colunas]
  [ROWS frame]
)
\`\`\`

- **PARTITION BY**: "Divide" os dados em grupos (como GROUP BY) mas mantém as linhas individuais.
- **ORDER BY**: Define a ordem dentro de cada partição.
- **ROWS**: Define a "janela" de linhas a considerar (ex: 3 anteriores).

## Funções Chave
- **Ranking**: ROW_NUMBER, RANK, DENSE_RANK, NTILE
- **Offset**: LAG, LEAD, FIRST_VALUE, LAST_VALUE
- **Agregação**: SUM, AVG, MIN, MAX, COUNT (usadas com OVER)` },
};


