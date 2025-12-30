/**
 * SQL Window Functions Exercises
 * ROW_NUMBER, RANK, LAG, LEAD, NTILE, Running Totals
 */

import { SQLExercise } from '../types';

export const SQL_WINDOW_FUNCTIONS: SQLExercise[] = [
  {
    id: 'sql-w1',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['row_number', 'ranking', 'window'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'ROW_NUMBER() - Ranking',
      en: 'ROW_NUMBER() - Ranking',
      pt: 'ROW_NUMBER() - Classificação'
    },
    description: {
      es: 'Asigná un número de fila a cada producto ordenado por precio.',
      en: 'Assign a row number to each product ordered by price.',
      pt: 'Atribua um número de linha a cada produto ordenado por preço.'
    },
    theory: {
      es: `**Window Functions** calculan sobre una "ventana" de filas sin colapsar resultados.

**ROW_NUMBER()** asigna número secuencial único:
\`\`\`sql
ROW_NUMBER() OVER (
  [PARTITION BY columna]  -- Reinicia por grupo
  ORDER BY columna        -- Define el orden
)
\`\`\`

**Diferencias:**
- ROW_NUMBER: 1, 2, 3, 4 (siempre secuencial)
- RANK: 1, 2, 2, 4 (salta en empates)
- DENSE_RANK: 1, 2, 2, 3 (no salta)`,
      en: `**Window Functions** calculate over a "window" of rows without collapsing results.

**ROW_NUMBER()** assigns unique sequential number:
\`\`\`sql
ROW_NUMBER() OVER (
  [PARTITION BY column]  -- Reset by group
  ORDER BY column        -- Defines order
)
\`\`\`

**Differences:**
- ROW_NUMBER: 1, 2, 3, 4 (always sequential)
- RANK: 1, 2, 2, 4 (skips on ties)
- DENSE_RANK: 1, 2, 2, 3 (no skip)`,
      pt: `**Window Functions** calculam sobre uma "janela" de linhas sem colapsar os resultados.

**ROW_NUMBER()** atribui um número sequencial único:
\`\`\`sql
ROW_NUMBER() OVER (
  [PARTITION BY coluna]  -- Reinicia por grupo
  ORDER BY coluna        -- Define a ordem
)
\`\`\`

**Diferenças:**
- ROW_NUMBER: 1, 2, 3, 4 (sempre sequencial)
- RANK: 1, 2, 2, 4 (pula em empates)
- DENSE_RANK: 1, 2, 2, 3 (não pula)`
    },
    realWorldExample: {
      es: 'Ranking de vendedores, posición en leaderboard.',
      en: 'Salesperson ranking, leaderboard position.',
      pt: 'Ranking de vendedores, posição no leaderboard.'
    },
    hint: {
      es: 'Usá ROW_NUMBER() OVER (ORDER BY price DESC)',
      en: 'Use ROW_NUMBER() OVER (ORDER BY price DESC)',
      pt: 'Use ROW_NUMBER() OVER (ORDER BY price DESC)'
    },
    
    schema: `
      CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price REAL
      );
    `,
    sampleData: `
      INSERT INTO products VALUES (1, 'Laptop', 999.99);
      INSERT INTO products VALUES (2, 'Mouse', 29.99);
      INSERT INTO products VALUES (3, 'Desk', 199.99);
      INSERT INTO products VALUES (4, 'Chair', 149.99);
      INSERT INTO products VALUES (5, 'Monitor', 299.99);
    `,
    expectedQuery: 'SELECT name, price, ROW_NUMBER() OVER (ORDER BY price DESC) as ranking FROM products',
    expectedResult: [
      ['Laptop', 999.99, 1],
      ['Monitor', 299.99, 2],
      ['Desk', 199.99, 3],
      ['Chair', 149.99, 4],
      ['Mouse', 29.99, 5],
    ],
  },
  {
    id: 'sql-w2',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['running total', 'cumulative', 'sum over'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'SUM() OVER - Running Total',
      en: 'SUM() OVER - Running Total',
      pt: 'SUM() OVER - Total Acumulado'
    },
    description: {
      es: 'Calculá el total acumulado de ventas ordenado por fecha.',
      en: 'Calculate the running total of sales ordered by date.',
      pt: 'Calcule o total acumulado de vendas ordenado por data.'
    },
    theory: {
      es: `**Running Total** (Suma Acumulada):

\`\`\`sql
SUM(amount) OVER (ORDER BY date) as running_total
\`\`\`

**Resultado:**
\`\`\`
date       | amount | running_total
2024-01-01 |   100  |    100
2024-01-02 |   150  |    250  (100+150)
2024-01-03 |   200  |    450  (100+150+200)
\`\`\`

**Variantes:**
\`\`\`sql
-- Por categoría
SUM(amount) OVER (PARTITION BY category ORDER BY date)

-- Promedio móvil últimas 3 filas
AVG(amount) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
\`\`\``,
      en: `**Running Total** (Cumulative Sum):

\`\`\`sql
SUM(amount) OVER (ORDER BY date) as running_total
\`\`\`

**Result:**
\`\`\`
date       | amount | running_total
2024-01-01 |   100  |    100
2024-01-02 |   150  |    250  (100+150)
2024-01-03 |   200  |    450  (100+150+200)
\`\`\`

**Variants:**
\`\`\`sql
-- By category
SUM(amount) OVER (PARTITION BY category ORDER BY date)

-- Moving average last 3 rows
AVG(amount) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
\`\`\``,
      pt: `**Running Total** (Soma Acumulada):

\`\`\`sql
SUM(amount) OVER (ORDER BY date) as running_total
\`\`\`

**Resultado:**
\`\`\`
date       | amount | running_total
2024-01-01 |   100  |    100
2024-01-02 |   150  |    250  (100+150)
2024-01-03 |   200  |    450  (100+150+200)
\`\`\`

**Variantes:**
\`\`\`sql
-- Por categoria
SUM(amount) OVER (PARTITION BY category ORDER BY date)

-- Média móvel das últimas 3 linhas
AVG(amount) OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
\`\`\``
    },
    realWorldExample: {
      es: 'Balance acumulado, ventas acumuladas del año.',
      en: 'Cumulative balance, year-to-date sales.',
      pt: 'Balanço acumulado, vendas acumuladas do ano.'
    },
    hint: {
      es: 'Usá SUM(amount) OVER (ORDER BY date)',
      en: 'Use SUM(amount) OVER (ORDER BY date)',
      pt: 'Use SUM(amount) OVER (ORDER BY date)'
    },
    
    schema: `
      CREATE TABLE sales (
        id INTEGER PRIMARY KEY,
        date TEXT,
        amount REAL
      );
    `,
    sampleData: `
      INSERT INTO sales VALUES (1, '2024-01-01', 100);
      INSERT INTO sales VALUES (2, '2024-01-02', 150);
      INSERT INTO sales VALUES (3, '2024-01-03', 200);
      INSERT INTO sales VALUES (4, '2024-01-04', 75);
    `,
    expectedQuery: 'SELECT date, amount, SUM(amount) OVER (ORDER BY date) as running_total FROM sales',
    expectedResult: [
      ['2024-01-01', 100, 100],
      ['2024-01-02', 150, 250],
      ['2024-01-03', 200, 450],
      ['2024-01-04', 75, 525],
    ],
  },
  {
    id: 'sql-w3',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['lag', 'lead', 'comparison'],
    interviewFrequency: 'very_high',
    xpReward: 45,
    coinsReward: 20,
    
    title: {
      es: 'LAG() y LEAD()',
      en: 'LAG() and LEAD()',
      pt: 'LAG() e LEAD()'
    },
    description: {
      es: 'Compará las ventas de cada día con el día anterior.',
      en: 'Compare each day\'s sales with the previous day.',
      pt: 'Compare as vendas de cada dia com o dia anterior.'
    },
    theory: {
      es: `**LAG()** accede a fila ANTERIOR, **LEAD()** a la SIGUIENTE.

\`\`\`sql
LAG(columna, offset, default) OVER (ORDER BY col)
LEAD(columna, offset, default) OVER (ORDER BY col)
\`\`\`

**Ejemplo:**
\`\`\`sql
SELECT 
  date,
  amount,
  LAG(amount, 1, 0) OVER (ORDER BY date) as anterior,
  amount - LAG(amount, 1, 0) OVER (ORDER BY date) as diferencia
FROM sales;
\`\`\`

**Casos de uso:** Crecimiento día a día, detectar cambios.`,
      en: `**LAG()** accesses PREVIOUS row, **LEAD()** the NEXT.

\`\`\`sql
LAG(column, offset, default) OVER (ORDER BY col)
LEAD(column, offset, default) OVER (ORDER BY col)
\`\`\`

**Example:**
\`\`\`sql
SELECT 
  date,
  amount,
  LAG(amount, 1, 0) OVER (ORDER BY date) as previous,
  amount - LAG(amount, 1, 0) OVER (ORDER BY date) as difference
FROM sales;
\`\`\`

**Use cases:** Day-over-day growth, detect changes.`,
      pt: `**LAG()** acessa a linha ANTERIOR, **LEAD()** a SEGUINTE.

\`\`\`sql
LAG(coluna, offset, default) OVER (ORDER BY col)
LEAD(coluna, offset, default) OVER (ORDER BY col)
\`\`\`

**Exemplo:**
\`\`\`sql
SELECT 
  date,
  amount,
  LAG(amount, 1, 0) OVER (ORDER BY date) as anterior,
  amount - LAG(amount, 1, 0) OVER (ORDER BY date) as diferenca
FROM sales;
\`\`\`

**Casos de uso:** Crescimento dia a dia, detectar mudanças.`
    },
    realWorldExample: {
      es: 'Comparar ventas con período anterior, análisis de tendencias.',
      en: 'Compare sales with previous period, trend analysis.',
      pt: 'Comparar vendas com período anterior, análise de tendências.'
    },
    hint: {
      es: 'Usá LAG(amount) OVER (ORDER BY date)',
      en: 'Use LAG(amount) OVER (ORDER BY date)',
      pt: 'Use LAG(amount) OVER (ORDER BY date)'
    },
    
    schema: `
      CREATE TABLE sales (
        id INTEGER PRIMARY KEY,
        date TEXT,
        amount REAL
      );
    `,
    sampleData: `
      INSERT INTO sales VALUES (1, '2024-01-01', 100);
      INSERT INTO sales VALUES (2, '2024-01-02', 150);
      INSERT INTO sales VALUES (3, '2024-01-03', 120);
      INSERT INTO sales VALUES (4, '2024-01-04', 200);
    `,
    expectedQuery: 'SELECT date, amount, LAG(amount) OVER (ORDER BY date) as dia_anterior FROM sales',
    expectedResult: [
      ['2024-01-01', 100, null],
      ['2024-01-02', 150, 100],
      ['2024-01-03', 120, 150],
      ['2024-01-04', 200, 120],
    ],
  },
  {
    id: 'sql-w4',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['partition by', 'ranking by group'],
    interviewFrequency: 'very_high',
    xpReward: 45,
    coinsReward: 20,
    
    title: {
      es: 'PARTITION BY - Ranking por grupo',
      en: 'PARTITION BY - Ranking by Group',
      pt: 'PARTITION BY - Classificação por Grupo'
    },
    description: {
      es: 'Asigná un ranking a cada producto DENTRO de su categoría.',
      en: 'Assign a ranking to each product WITHIN its category.',
      pt: 'Atribua uma classificação a cada produto DENTRO da sua categoria.'
    },
    theory: {
      es: `**PARTITION BY** reinicia el cálculo por cada grupo:

\`\`\`sql
ROW_NUMBER() OVER (
  PARTITION BY category  -- Reinicia por categoría
  ORDER BY price DESC
) as ranking_en_categoria
\`\`\`

**Sin PARTITION:** Ranking global
**Con PARTITION:** Ranking por grupo

**Patrón común - Top N por grupo:**
\`\`\`sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY category ORDER BY price DESC
  ) as rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 3;
\`\`\``,
      en: `**PARTITION BY** resets calculation for each group:

\`\`\`sql
ROW_NUMBER() OVER (
  PARTITION BY category  -- Reset by category
  ORDER BY price DESC
) as ranking_in_category
\`\`\`

**Without PARTITION:** Global ranking
**With PARTITION:** Ranking per group

**Common pattern - Top N per group:**
\`\`\`sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY category ORDER BY price DESC
  ) as rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 3;
\`\`\``,
      pt: `**PARTITION BY** reinicia o cálculo para cada grupo:

\`\`\`sql
ROW_NUMBER() OVER (
  PARTITION BY category  -- Reinicia por categoria
  ORDER BY price DESC
) as ranking_em_categoria
\`\`\`

**Sem PARTITION:** Ranking global
**Com PARTITION:** Ranking por grupo

**Padrão comum - Top N por grupo:**
\`\`\`sql
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (
    PARTITION BY category ORDER BY price DESC
  ) as rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 3;
\`\`\``
    },
    realWorldExample: {
      es: 'Top 3 productos por categoría, mejor vendedor por región.',
      en: 'Top 3 products per category, best salesperson per region.',
      pt: 'Top 3 produtos por categoria, melhor vendedor por região.'
    },
    hint: {
      es: 'Usá PARTITION BY category en el OVER()',
      en: 'Use PARTITION BY category in the OVER()',
      pt: 'Use PARTITION BY category no OVER()'
    },
    
    schema: `
      CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price REAL,
        category TEXT
      );
    `,
    sampleData: `
      INSERT INTO products VALUES (1, 'Laptop', 999, 'Tech');
      INSERT INTO products VALUES (2, 'Mouse', 29, 'Tech');
      INSERT INTO products VALUES (3, 'Monitor', 299, 'Tech');
      INSERT INTO products VALUES (4, 'Desk', 199, 'Furniture');
      INSERT INTO products VALUES (5, 'Chair', 149, 'Furniture');
    `,
    expectedQuery: 'SELECT name, category, price, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) as ranking FROM products',
    expectedResult: [
      ['Desk', 'Furniture', 199, 1],
      ['Chair', 'Furniture', 149, 2],
      ['Laptop', 'Tech', 999, 1],
      ['Monitor', 'Tech', 299, 2],
      ['Mouse', 'Tech', 29, 3],
    ],
  },
  {
    id: 'sql-w5',
    type: 'sql',
    difficulty: 'expert',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['ntile', 'percentile', 'segmentation'],
    interviewFrequency: 'high',
    xpReward: 50,
    coinsReward: 25,
    
    title: {
      es: 'NTILE() - Percentiles',
      en: 'NTILE() - Percentiles',
      pt: 'NTILE() - Percentis'
    },
    description: {
      es: 'Dividí los productos en 4 grupos (cuartiles) por precio.',
      en: 'Divide products into 4 groups (quartiles) by price.',
      pt: 'Divida os produtos em 4 grupos (quartis) por preço.'
    },
    theory: {
      es: `**NTILE(n)** divide las filas en n grupos iguales:

\`\`\`sql
NTILE(4) OVER (ORDER BY price DESC) as cuartil
\`\`\`

**Resultado (10 productos):**
\`\`\`
ranking | cuartil
1-3     |    1    (top 25%)
4-5     |    2
6-8     |    3
9-10    |    4    (bottom 25%)
\`\`\`

**Casos de uso:**
- Segmentación de clientes (VIP, Premium, Standard)
- Análisis de distribución
- Identificar outliers`,
      en: `**NTILE(n)** divides rows into n equal groups:

\`\`\`sql
NTILE(4) OVER (ORDER BY price DESC) as quartile
\`\`\`

**Result (10 products):**
\`\`\`
ranking | quartile
1-3     |    1    (top 25%)
4-5     |    2
6-8     |    3
9-10    |    4    (bottom 25%)
\`\`\`

**Use cases:**
- Customer segmentation (VIP, Premium, Standard)
- Distribution analysis
- Identify outliers`,
      pt: `**NTILE(n)** divide as linhas em n grupos iguais:

\`\`\`sql
NTILE(4) OVER (ORDER BY price DESC) as quartil
\`\`\`

**Resultado (10 produtos):**
\`\`\`
ranking | quartil
1-3     |    1    (top 25%)
4-5     |    2
6-8     |    3
9-10    |    4    (bottom 25%)
\`\`\`

**Casos de uso:**
- Segmentação de clientes (VIP, Premium, Padrão)
- Análise de distribuição
- Identificar outliers`
    },
    realWorldExample: {
      es: 'Segmentar clientes por gasto, análisis de performance.',
      en: 'Segment customers by spending, performance analysis.',
      pt: 'Segmentar clientes por gastos, análise de performance.'
    },
    hint: {
      es: 'Usá NTILE(4) OVER (ORDER BY price DESC)',
      en: 'Use NTILE(4) OVER (ORDER BY price DESC)',
      pt: 'Use NTILE(4) OVER (ORDER BY price DESC)'
    },
    
    schema: `
      CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price REAL
      );
    `,
    sampleData: `
      INSERT INTO products VALUES (1, 'Laptop', 999);
      INSERT INTO products VALUES (2, 'Mouse', 29);
      INSERT INTO products VALUES (3, 'Monitor', 299);
      INSERT INTO products VALUES (4, 'Desk', 199);
      INSERT INTO products VALUES (5, 'Chair', 149);
      INSERT INTO products VALUES (6, 'Keyboard', 79);
      INSERT INTO products VALUES (7, 'Webcam', 89);
      INSERT INTO products VALUES (8, 'Headset', 129);
    `,
    expectedQuery: 'SELECT name, price, NTILE(4) OVER (ORDER BY price DESC) as cuartil FROM products',
    expectedResult: [
      ['Laptop', 999, 1],
      ['Monitor', 299, 1],
      ['Desk', 199, 2],
      ['Chair', 149, 2],
      ['Headset', 129, 3],
      ['Webcam', 89, 3],
      ['Keyboard', 79, 4],
      ['Mouse', 29, 4],
    ],
  },
];

export default SQL_WINDOW_FUNCTIONS;
