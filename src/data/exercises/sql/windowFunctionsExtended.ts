/**
 * SQL Window Functions Extended Exercises
 * ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, NTILE, etc. for Saurio 🦖
 */

import { SQLExercise } from '../types';

export const SQL_WINDOW_FUNCTIONS_EXTENDED: SQLExercise[] = [
  // === ROW_NUMBER con partición ===
  {
    id: 'sql-wx1',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['row_number', 'partition by', 'ranking'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'ROW_NUMBER con PARTITION BY',
      en: 'ROW_NUMBER with PARTITION BY',
      pt: 'ROW_NUMBER com PARTITION BY'
    },
    description: {
      es: 'Asigná un número de fila a cada venta dentro de su categoría, ordenado por monto descendente.',
      en: 'Assign a row number to each sale within its category, ordered by amount descending.',
      pt: 'Atribua um número de linha a cada venda dentro de sua categoria, ordenado por valor descendente.'
    },
    theory: {
      es: `**ROW_NUMBER() - Numerar filas:**

\`\`\`sql
SELECT 
  category,
  product,
  amount,
  ROW_NUMBER() OVER (
    PARTITION BY category 
    ORDER BY amount DESC
  ) as rank_in_category
FROM sales;
\`\`\`

**Componentes:**
- \`PARTITION BY\`: Reinicia la numeración por grupo
- \`ORDER BY\`: Define el orden dentro de cada partición
- Siempre genera valores únicos (1, 2, 3...)

**Sin PARTITION BY:** Numera toda la tabla como un solo grupo.`,
      en: `**ROW_NUMBER() - Number rows:**

\`\`\`sql
SELECT 
  category,
  product,
  amount,
  ROW_NUMBER() OVER (
    PARTITION BY category 
    ORDER BY amount DESC
  ) as rank_in_category
FROM sales;
\`\`\`

**Components:**
- \`PARTITION BY\`: Restarts numbering per group
- \`ORDER BY\`: Defines order within each partition
- Always generates unique values (1, 2, 3...)

**Without PARTITION BY:** Numbers entire table as one group.`,
      pt: `**ROW_NUMBER() - Numerar linhas:**

\`\`\`sql
SELECT 
  category,
  product,
  amount,
  ROW_NUMBER() OVER (
    PARTITION BY category 
    ORDER BY amount DESC
  ) as rank_in_category
FROM sales;
\`\`\`

**Componentes:**
- \`PARTITION BY\`: Reinicia a numeração por grupo
- \`ORDER BY\`: Define a ordem dentro de cada partição
- Sempre gera valores únicos (1, 2, 3...)

**Sem PARTITION BY:** Numera toda a tabela como um único grupo.`
    },
    realWorldExample: {
      es: 'Saurio genera rankings por categoría, top N por grupo.',
      en: 'Saurio generates rankings by category, top N per group.',
      pt: 'Saurio gera rankings por categoria, top N por grupo.'
    },
    hint: {
      es: 'Usá ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount DESC)',
      en: 'Use ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount DESC)',
      pt: 'Use ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount DESC)'
    },
    
    schema: `CREATE TABLE sales (id INT, category TEXT, product TEXT, amount REAL);`,
    sampleData: `INSERT INTO sales VALUES (1, 'Electronics', 'Laptop', 1200);
INSERT INTO sales VALUES (2, 'Electronics', 'Phone', 800);
INSERT INTO sales VALUES (3, 'Electronics', 'Tablet', 500);
INSERT INTO sales VALUES (4, 'Clothing', 'Jacket', 150);
INSERT INTO sales VALUES (5, 'Clothing', 'Shirt', 50);
INSERT INTO sales VALUES (6, 'Clothing', 'Pants', 80);`,
    expectedQuery: `SELECT 
  category,
  product,
  amount,
  ROW_NUMBER() OVER (PARTITION BY category ORDER BY amount DESC) as rank_in_category
FROM sales`,
    expectedResult: [
      ['Clothing', 'Jacket', 150, 1],
      ['Clothing', 'Pants', 80, 2],
      ['Clothing', 'Shirt', 50, 3],
      ['Electronics', 'Laptop', 1200, 1],
      ['Electronics', 'Phone', 800, 2],
      ['Electronics', 'Tablet', 500, 3],
    ],
  },
  // === RANK vs DENSE_RANK ===
  {
    id: 'sql-wx2',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['rank', 'dense_rank', 'ties'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'RANK vs DENSE_RANK - Manejo de empates',
      en: 'RANK vs DENSE_RANK - Handling Ties',
      pt: 'RANK vs DENSE_RANK - Tratamento de Empates'
    },
    description: {
      es: 'Mostrá el ranking de estudiantes por nota, usando RANK y DENSE_RANK para ver la diferencia con empates.',
      en: 'Show student ranking by grade, using RANK and DENSE_RANK to see the difference with ties.',
      pt: 'Mostre o ranking de estudantes por nota, usando RANK e DENSE_RANK para ver a diferença com empates.'
    },
    theory: {
      es: `**RANK vs DENSE_RANK:**

| Función | Comportamiento | Ejemplo (empate en 2°) |
|---------|----------------|------------------------|
| RANK | Salta posiciones | 1, 2, 2, **4**, 5 |
| DENSE_RANK | No salta | 1, 2, 2, **3**, 4 |
| ROW_NUMBER | Sin empates | 1, 2, 3, 4, 5 |

\`\`\`sql
SELECT 
  name,
  score,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM students;
\`\`\``,
      en: `**RANK vs DENSE_RANK:**

| Function | Behavior | Example (tie at 2nd) |
|----------|----------|----------------------|
| RANK | Skips positions | 1, 2, 2, **4**, 5 |
| DENSE_RANK | No skips | 1, 2, 2, **3**, 4 |
| ROW_NUMBER | No ties | 1, 2, 3, 4, 5 |

\`\`\`sql
SELECT 
  name,
  score,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM students;
\`\`\``,
      pt: `**RANK vs DENSE_RANK:**

| Função | Comportamento | Exemplo (empate em 2°) |
|--------|---------------|------------------------|
| RANK | Pula posições | 1, 2, 2, **4**, 5 |
| DENSE_RANK | Não pula | 1, 2, 2, **3**, 4 |
| ROW_NUMBER | Sem empates | 1, 2, 3, 4, 5 |

\`\`\`sql
SELECT 
  name,
  score,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM students;
\`\`\``
    },
    realWorldExample: {
      es: 'Rankings deportivos, clasificaciones con empates.',
      en: 'Sports rankings, classifications with ties.',
      pt: 'Rankings esportivos, classificações com empates.'
    },
    hint: {
      es: 'Usá ambas funciones con ORDER BY score DESC',
      en: 'Use both functions with ORDER BY score DESC',
      pt: 'Use ambas funções com ORDER BY score DESC'
    },
    
    schema: `CREATE TABLE students (id INT, name TEXT, score INT);`,
    sampleData: `INSERT INTO students VALUES (1, 'Ana', 95);
INSERT INTO students VALUES (2, 'Bob', 90);
INSERT INTO students VALUES (3, 'Carlos', 90);
INSERT INTO students VALUES (4, 'Diana', 85);
INSERT INTO students VALUES (5, 'Eva', 80);`,
    expectedQuery: `SELECT 
  name,
  score,
  RANK() OVER (ORDER BY score DESC) as rank,
  DENSE_RANK() OVER (ORDER BY score DESC) as dense_rank
FROM students`,
    expectedResult: [
      ['Ana', 95, 1, 1],
      ['Bob', 90, 2, 2],
      ['Carlos', 90, 2, 2],
      ['Diana', 85, 4, 3],
      ['Eva', 80, 5, 4],
    ],
  },
  // === LAG para comparar con anterior ===
  {
    id: 'sql-wx3',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['lag', 'previous', 'comparison'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'LAG - Acceder a fila anterior',
      en: 'LAG - Access Previous Row',
      pt: 'LAG - Acessar Linha Anterior'
    },
    description: {
      es: 'Mostrá las ventas mensuales con la venta del mes anterior y el cambio porcentual.',
      en: 'Show monthly sales with previous month sale and percentage change.',
      pt: 'Mostre as vendas mensais com a venda do mês anterior e a mudança percentual.'
    },
    theory: {
      es: `**LAG() - Acceder a filas anteriores:**

\`\`\`sql
SELECT 
  month,
  sales,
  LAG(sales, 1) OVER (ORDER BY month) as prev_month,
  LAG(sales, 2) OVER (ORDER BY month) as two_months_ago
FROM monthly_sales;
\`\`\`

**Sintaxis:** \`LAG(columna, offset, default)\`
- offset: cuántas filas atrás (default 1)
- default: valor si no existe fila anterior

**Cálculo de cambio:**
\`\`\`sql
ROUND(
  (sales - LAG(sales) OVER (ORDER BY month)) * 100.0 
  / LAG(sales) OVER (ORDER BY month), 2
) as pct_change
\`\`\``,
      en: `**LAG() - Access previous rows:**

\`\`\`sql
SELECT 
  month,
  sales,
  LAG(sales, 1) OVER (ORDER BY month) as prev_month,
  LAG(sales, 2) OVER (ORDER BY month) as two_months_ago
FROM monthly_sales;
\`\`\`

**Syntax:** \`LAG(column, offset, default)\`
- offset: how many rows back (default 1)
- default: value if no previous row exists

**Change calculation:**
\`\`\`sql
ROUND(
  (sales - LAG(sales) OVER (ORDER BY month)) * 100.0 
  / LAG(sales) OVER (ORDER BY month), 2
) as pct_change
\`\`\``,
      pt: `**LAG() - Acessar linhas anteriores:**

\`\`\`sql
SELECT 
  month,
  sales,
  LAG(sales, 1) OVER (ORDER BY month) as prev_month,
  LAG(sales, 2) OVER (ORDER BY month) as two_months_ago
FROM monthly_sales;
\`\`\`

**Sintaxe:** \`LAG(coluna, offset, default)\`
- offset: quantas linhas para trás (default 1)
- default: valor se não existir linha anterior

**Cálculo de mudança:**
\`\`\`sql
ROUND(
  (sales - LAG(sales) OVER (ORDER BY month)) * 100.0 
  / LAG(sales) OVER (ORDER BY month), 2
) as pct_change
\`\`\``
    },
    realWorldExample: {
      es: 'Análisis MoM (month over month), tendencias.',
      en: 'MoM (month over month) analysis, trends.',
      pt: 'Análise MoM (mês sobre mês), tendências.'
    },
    hint: {
      es: 'Usá LAG(sales, 1) OVER (ORDER BY month) para el mes anterior',
      en: 'Use LAG(sales, 1) OVER (ORDER BY month) for previous month',
      pt: 'Use LAG(sales, 1) OVER (ORDER BY month) para o mês anterior'
    },
    
    schema: `CREATE TABLE monthly_sales (id INT, month TEXT, sales REAL);`,
    sampleData: `INSERT INTO monthly_sales VALUES (1, '2024-01', 10000);
INSERT INTO monthly_sales VALUES (2, '2024-02', 12000);
INSERT INTO monthly_sales VALUES (3, '2024-03', 11500);
INSERT INTO monthly_sales VALUES (4, '2024-04', 15000);`,
    expectedQuery: `SELECT 
  month,
  sales,
  LAG(sales, 1) OVER (ORDER BY month) as prev_month_sales,
  ROUND(
    (sales - LAG(sales, 1) OVER (ORDER BY month)) * 100.0 
    / LAG(sales, 1) OVER (ORDER BY month), 1
  ) as pct_change
FROM monthly_sales`,
    expectedResult: [
      ['2024-01', 10000, null, null],
      ['2024-02', 12000, 10000, 20.0],
      ['2024-03', 11500, 12000, -4.2],
      ['2024-04', 15000, 11500, 30.4],
    ],
  },
  // === LEAD para proyectar hacia adelante ===
  {
    id: 'sql-wx4',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['lead', 'next', 'forecast'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'LEAD - Acceder a fila siguiente',
      en: 'LEAD - Access Next Row',
      pt: 'LEAD - Acessar Próxima Linha'
    },
    description: {
      es: 'Mostrá cada tarea con su fecha de inicio y la fecha de inicio de la siguiente tarea.',
      en: 'Show each task with its start date and the next task start date.',
      pt: 'Mostre cada tarefa com sua data de início e a data de início da próxima tarefa.'
    },
    theory: {
      es: `**LEAD() - Acceder a filas siguientes:**

\`\`\`sql
SELECT 
  task_name,
  start_date,
  LEAD(start_date, 1) OVER (ORDER BY start_date) as next_task_start,
  LEAD(task_name, 1) OVER (ORDER BY start_date) as next_task
FROM tasks;
\`\`\`

**LAG vs LEAD:**
- LAG: mira hacia atrás ←
- LEAD: mira hacia adelante →

**Uso común:** Calcular duración hasta el próximo evento:
\`\`\`sql
julianday(LEAD(start_date) OVER (...)) - julianday(start_date) as days_until_next
\`\`\``,
      en: `**LEAD() - Access next rows:**

\`\`\`sql
SELECT 
  task_name,
  start_date,
  LEAD(start_date, 1) OVER (ORDER BY start_date) as next_task_start,
  LEAD(task_name, 1) OVER (ORDER BY start_date) as next_task
FROM tasks;
\`\`\`

**LAG vs LEAD:**
- LAG: looks backward ←
- LEAD: looks forward →

**Common use:** Calculate duration until next event:
\`\`\`sql
julianday(LEAD(start_date) OVER (...)) - julianday(start_date) as days_until_next
\`\`\``,
      pt: `**LEAD() - Acessar próximas linhas:**

\`\`\`sql
SELECT 
  task_name,
  start_date,
  LEAD(start_date, 1) OVER (ORDER BY start_date) as next_task_start,
  LEAD(task_name, 1) OVER (ORDER BY start_date) as next_task
FROM tasks;
\`\`\`

**LAG vs LEAD:**
- LAG: olha para trás ←
- LEAD: olha para frente →

**Uso comum:** Calcular duração até o próximo evento:
\`\`\`sql
julianday(LEAD(start_date) OVER (...)) - julianday(start_date) as days_until_next
\`\`\``
    },
    realWorldExample: {
      es: 'Planificación, gaps entre eventos, proyecciones.',
      en: 'Planning, gaps between events, projections.',
      pt: 'Planejamento, gaps entre eventos, projeções.'
    },
    hint: {
      es: 'Usá LEAD(start_date, 1) OVER (ORDER BY start_date)',
      en: 'Use LEAD(start_date, 1) OVER (ORDER BY start_date)',
      pt: 'Use LEAD(start_date, 1) OVER (ORDER BY start_date)'
    },
    
    schema: `CREATE TABLE tasks (id INT, task_name TEXT, start_date TEXT);`,
    sampleData: `INSERT INTO tasks VALUES (1, 'Research', '2024-01-01');
INSERT INTO tasks VALUES (2, 'Design', '2024-01-15');
INSERT INTO tasks VALUES (3, 'Development', '2024-02-01');
INSERT INTO tasks VALUES (4, 'Testing', '2024-03-01');`,
    expectedQuery: `SELECT 
  task_name,
  start_date,
  LEAD(start_date, 1) OVER (ORDER BY start_date) as next_task_start,
  LEAD(task_name, 1) OVER (ORDER BY start_date) as next_task
FROM tasks`,
    expectedResult: [
      ['Research', '2024-01-01', '2024-01-15', 'Design'],
      ['Design', '2024-01-15', '2024-02-01', 'Development'],
      ['Development', '2024-02-01', '2024-03-01', 'Testing'],
      ['Testing', '2024-03-01', null, null],
    ],
  },
  // === Running Total con SUM OVER ===
  {
    id: 'sql-wx5',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['running total', 'cumulative', 'sum over'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Running Total - Suma acumulada',
      en: 'Running Total - Cumulative Sum',
      pt: 'Running Total - Soma Acumulada'
    },
    description: {
      es: 'Calculá el saldo acumulado de una cuenta bancaria después de cada transacción.',
      en: 'Calculate the cumulative balance of a bank account after each transaction.',
      pt: 'Calcule o saldo acumulado de uma conta bancária após cada transação.'
    },
    theory: {
      es: `**Running Total (Suma Acumulada):**

\`\`\`sql
SELECT 
  date,
  description,
  amount,
  SUM(amount) OVER (
    ORDER BY date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_balance
FROM transactions;
\`\`\`

**Frame por defecto:** Sin especificar frame, usa RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.

**Versión simplificada:**
\`\`\`sql
SUM(amount) OVER (ORDER BY date) as running_balance
\`\`\``,
      en: `**Running Total (Cumulative Sum):**

\`\`\`sql
SELECT 
  date,
  description,
  amount,
  SUM(amount) OVER (
    ORDER BY date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_balance
FROM transactions;
\`\`\`

**Default frame:** Without specifying frame, uses RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.

**Simplified version:**
\`\`\`sql
SUM(amount) OVER (ORDER BY date) as running_balance
\`\`\``,
      pt: `**Running Total (Soma Acumulada):**

\`\`\`sql
SELECT 
  date,
  description,
  amount,
  SUM(amount) OVER (
    ORDER BY date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) as running_balance
FROM transactions;
\`\`\`

**Frame padrão:** Sem especificar frame, usa RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.

**Versão simplificada:**
\`\`\`sql
SUM(amount) OVER (ORDER BY date) as running_balance
\`\`\``
    },
    realWorldExample: {
      es: 'Saldos bancarios, inventario acumulado, métricas YTD.',
      en: 'Bank balances, cumulative inventory, YTD metrics.',
      pt: 'Saldos bancários, inventário acumulado, métricas YTD.'
    },
    hint: {
      es: 'Usá SUM(amount) OVER (ORDER BY date) para suma acumulada',
      en: 'Use SUM(amount) OVER (ORDER BY date) for cumulative sum',
      pt: 'Use SUM(amount) OVER (ORDER BY date) para soma acumulada'
    },
    
    schema: `CREATE TABLE transactions (id INT, date TEXT, description TEXT, amount REAL);`,
    sampleData: `INSERT INTO transactions VALUES (1, '2024-01-01', 'Initial deposit', 1000);
INSERT INTO transactions VALUES (2, '2024-01-05', 'Grocery', -50);
INSERT INTO transactions VALUES (3, '2024-01-10', 'Salary', 3000);
INSERT INTO transactions VALUES (4, '2024-01-15', 'Rent', -1200);
INSERT INTO transactions VALUES (5, '2024-01-20', 'Bonus', 500);`,
    expectedQuery: `SELECT 
  date,
  description,
  amount,
  SUM(amount) OVER (ORDER BY date) as running_balance
FROM transactions`,
    expectedResult: [
      ['2024-01-01', 'Initial deposit', 1000, 1000],
      ['2024-01-05', 'Grocery', -50, 950],
      ['2024-01-10', 'Salary', 3000, 3950],
      ['2024-01-15', 'Rent', -1200, 2750],
      ['2024-01-20', 'Bonus', 500, 3250],
    ],
  },
  // === Moving Average ===
  {
    id: 'sql-wx6',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['moving average', 'rolling', 'rows between'],
    interviewFrequency: 'very_high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Moving Average - Promedio móvil',
      en: 'Moving Average - Rolling Average',
      pt: 'Moving Average - Média Móvel'
    },
    description: {
      es: 'Calculá el promedio móvil de 3 días de las ventas diarias.',
      en: 'Calculate the 3-day moving average of daily sales.',
      pt: 'Calcule a média móvel de 3 dias das vendas diárias.'
    },
    theory: {
      es: `**Moving Average (Promedio Móvil):**

\`\`\`sql
SELECT 
  date,
  sales,
  ROUND(AVG(sales) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2) as moving_avg_3d
FROM daily_sales;
\`\`\`

**Frame specifications:**
- \`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\` → últimas 3 filas
- \`ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\` → ventana centrada
- \`RANGE vs ROWS\`: RANGE agrupa valores iguales

**7-day moving average:**
\`\`\`sql
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
\`\`\``,
      en: `**Moving Average (Rolling Average):**

\`\`\`sql
SELECT 
  date,
  sales,
  ROUND(AVG(sales) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2) as moving_avg_3d
FROM daily_sales;
\`\`\`

**Frame specifications:**
- \`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\` → last 3 rows
- \`ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\` → centered window
- \`RANGE vs ROWS\`: RANGE groups equal values

**7-day moving average:**
\`\`\`sql
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
\`\`\``,
      pt: `**Moving Average (Média Móvel):**

\`\`\`sql
SELECT 
  date,
  sales,
  ROUND(AVG(sales) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2) as moving_avg_3d
FROM daily_sales;
\`\`\`

**Frame specifications:**
- \`ROWS BETWEEN 2 PRECEDING AND CURRENT ROW\` → últimas 3 linhas
- \`ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING\` → janela centrada
- \`RANGE vs ROWS\`: RANGE agrupa valores iguais

**7-day moving average:**
\`\`\`sql
ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
\`\`\``
    },
    realWorldExample: {
      es: 'Análisis de tendencias, suavizar datos ruidosos, stock trading.',
      en: 'Trend analysis, smoothing noisy data, stock trading.',
      pt: 'Análise de tendências, suavizar dados ruidosos, stock trading.'
    },
    hint: {
      es: 'Usá AVG() OVER con ROWS BETWEEN 2 PRECEDING AND CURRENT ROW',
      en: 'Use AVG() OVER with ROWS BETWEEN 2 PRECEDING AND CURRENT ROW',
      pt: 'Use AVG() OVER com ROWS BETWEEN 2 PRECEDING AND CURRENT ROW'
    },
    
    schema: `CREATE TABLE daily_sales (id INT, date TEXT, sales REAL);`,
    sampleData: `INSERT INTO daily_sales VALUES (1, '2024-01-01', 100);
INSERT INTO daily_sales VALUES (2, '2024-01-02', 150);
INSERT INTO daily_sales VALUES (3, '2024-01-03', 130);
INSERT INTO daily_sales VALUES (4, '2024-01-04', 180);
INSERT INTO daily_sales VALUES (5, '2024-01-05', 160);`,
    expectedQuery: `SELECT 
  date,
  sales,
  ROUND(AVG(sales) OVER (
    ORDER BY date
    ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
  ), 2) as moving_avg_3d
FROM daily_sales`,
    expectedResult: [
      ['2024-01-01', 100, 100.0],
      ['2024-01-02', 150, 125.0],
      ['2024-01-03', 130, 126.67],
      ['2024-01-04', 180, 153.33],
      ['2024-01-05', 160, 156.67],
    ],
  },
  // === NTILE para percentiles ===
  {
    id: 'sql-wx7',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['ntile', 'quartiles', 'percentiles'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'NTILE - Dividir en grupos iguales',
      en: 'NTILE - Divide Into Equal Groups',
      pt: 'NTILE - Dividir em Grupos Iguais'
    },
    description: {
      es: 'Dividí los clientes en 4 quartiles según su gasto total.',
      en: 'Divide customers into 4 quartiles based on their total spending.',
      pt: 'Divida os clientes em 4 quartis baseado no seu gasto total.'
    },
    theory: {
      es: `**NTILE(n) - Dividir en n grupos:**

\`\`\`sql
SELECT 
  customer_name,
  total_spent,
  NTILE(4) OVER (ORDER BY total_spent DESC) as quartile
FROM customers;
\`\`\`

**Resultados:**
- Quartile 1: Top 25% (mejores clientes)
- Quartile 2: 25-50%
- Quartile 3: 50-75%
- Quartile 4: Bottom 25%

**Otros usos:**
- \`NTILE(10)\` → Deciles
- \`NTILE(100)\` → Percentiles
- \`NTILE(3)\` → Terciles`,
      en: `**NTILE(n) - Divide into n groups:**

\`\`\`sql
SELECT 
  customer_name,
  total_spent,
  NTILE(4) OVER (ORDER BY total_spent DESC) as quartile
FROM customers;
\`\`\`

**Results:**
- Quartile 1: Top 25% (best customers)
- Quartile 2: 25-50%
- Quartile 3: 50-75%
- Quartile 4: Bottom 25%

**Other uses:**
- \`NTILE(10)\` → Deciles
- \`NTILE(100)\` → Percentiles
- \`NTILE(3)\` → Terciles`,
      pt: `**NTILE(n) - Dividir em n grupos:**

\`\`\`sql
SELECT 
  customer_name,
  total_spent,
  NTILE(4) OVER (ORDER BY total_spent DESC) as quartile
FROM customers;
\`\`\`

**Resultados:**
- Quartil 1: Top 25% (melhores clientes)
- Quartil 2: 25-50%
- Quartil 3: 50-75%
- Quartil 4: Bottom 25%

**Outros usos:**
- \`NTILE(10)\` → Decis
- \`NTILE(100)\` → Percentis
- \`NTILE(3)\` → Tercis`
    },
    realWorldExample: {
      es: 'Segmentación de clientes, análisis de distribución.',
      en: 'Customer segmentation, distribution analysis.',
      pt: 'Segmentação de clientes, análise de distribuição.'
    },
    hint: {
      es: 'Usá NTILE(4) OVER (ORDER BY total_spent DESC)',
      en: 'Use NTILE(4) OVER (ORDER BY total_spent DESC)',
      pt: 'Use NTILE(4) OVER (ORDER BY total_spent DESC)'
    },
    
    schema: `CREATE TABLE customers (id INT, customer_name TEXT, total_spent REAL);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Alice', 5000);
INSERT INTO customers VALUES (2, 'Bob', 3000);
INSERT INTO customers VALUES (3, 'Carlos', 8000);
INSERT INTO customers VALUES (4, 'Diana', 2000);
INSERT INTO customers VALUES (5, 'Eva', 6000);
INSERT INTO customers VALUES (6, 'Frank', 1500);
INSERT INTO customers VALUES (7, 'Grace', 4000);
INSERT INTO customers VALUES (8, 'Henry', 7000);`,
    expectedQuery: `SELECT 
  customer_name,
  total_spent,
  NTILE(4) OVER (ORDER BY total_spent DESC) as quartile
FROM customers`,
    expectedResult: [
      ['Carlos', 8000, 1],
      ['Henry', 7000, 1],
      ['Eva', 6000, 2],
      ['Alice', 5000, 2],
      ['Grace', 4000, 3],
      ['Bob', 3000, 3],
      ['Diana', 2000, 4],
      ['Frank', 1500, 4],
    ],
  },
  // === FIRST_VALUE / LAST_VALUE ===
  {
    id: 'sql-wx8',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['first_value', 'last_value', 'window frame'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'FIRST_VALUE y LAST_VALUE',
      en: 'FIRST_VALUE and LAST_VALUE',
      pt: 'FIRST_VALUE e LAST_VALUE'
    },
    description: {
      es: 'Mostrá cada venta con el producto más vendido y menos vendido de su categoría.',
      en: 'Show each sale with the best-selling and worst-selling product in its category.',
      pt: 'Mostre cada venda com o produto mais vendido e menos vendido de sua categoria.'
    },
    theory: {
      es: `**FIRST_VALUE / LAST_VALUE:**

\`\`\`sql
SELECT 
  category,
  product,
  sales,
  FIRST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
  ) as best_seller,
  LAST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) as worst_seller
FROM products;
\`\`\`

**⚠️ Importante:** LAST_VALUE necesita \`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\` para ver todas las filas de la partición.`,
      en: `**FIRST_VALUE / LAST_VALUE:**

\`\`\`sql
SELECT 
  category,
  product,
  sales,
  FIRST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
  ) as best_seller,
  LAST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) as worst_seller
FROM products;
\`\`\`

**⚠️ Important:** LAST_VALUE needs \`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\` to see all rows in partition.`,
      pt: `**FIRST_VALUE / LAST_VALUE:**

\`\`\`sql
SELECT 
  category,
  product,
  sales,
  FIRST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
  ) as best_seller,
  LAST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) as worst_seller
FROM products;
\`\`\`

**⚠️ Importante:** LAST_VALUE precisa de \`ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING\` para ver todas as linhas da partição.`
    },
    realWorldExample: {
      es: 'Comparar con mejor/peor de cada grupo.',
      en: 'Compare with best/worst of each group.',
      pt: 'Comparar com melhor/pior de cada grupo.'
    },
    hint: {
      es: 'Para LAST_VALUE, especificá el frame completo de la partición',
      en: 'For LAST_VALUE, specify the full partition frame',
      pt: 'Para LAST_VALUE, especifique o frame completo da partição'
    },
    
    schema: `CREATE TABLE products (id INT, category TEXT, product TEXT, sales INT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Electronics', 'Laptop', 150);
INSERT INTO products VALUES (2, 'Electronics', 'Phone', 200);
INSERT INTO products VALUES (3, 'Electronics', 'Tablet', 80);
INSERT INTO products VALUES (4, 'Clothing', 'Jacket', 100);
INSERT INTO products VALUES (5, 'Clothing', 'Shirt', 180);
INSERT INTO products VALUES (6, 'Clothing', 'Pants', 120);`,
    expectedQuery: `SELECT 
  category,
  product,
  sales,
  FIRST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
  ) as best_seller,
  LAST_VALUE(product) OVER (
    PARTITION BY category 
    ORDER BY sales DESC
    ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
  ) as worst_seller
FROM products`,
    expectedResult: [
      ['Clothing', 'Shirt', 180, 'Shirt', 'Jacket'],
      ['Clothing', 'Pants', 120, 'Shirt', 'Jacket'],
      ['Clothing', 'Jacket', 100, 'Shirt', 'Jacket'],
      ['Electronics', 'Phone', 200, 'Phone', 'Tablet'],
      ['Electronics', 'Laptop', 150, 'Phone', 'Tablet'],
      ['Electronics', 'Tablet', 80, 'Phone', 'Tablet'],
    ],
  },
  // === PERCENT_RANK / CUME_DIST ===
  {
    id: 'sql-wx9',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['percent_rank', 'cume_dist', 'percentile'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'PERCENT_RANK y CUME_DIST',
      en: 'PERCENT_RANK and CUME_DIST',
      pt: 'PERCENT_RANK e CUME_DIST'
    },
    description: {
      es: 'Calculá el percentil de cada empleado según su salario.',
      en: 'Calculate each employee percentile based on salary.',
      pt: 'Calcule o percentil de cada funcionário baseado no salário.'
    },
    theory: {
      es: `**PERCENT_RANK vs CUME_DIST:**

| Función | Fórmula | Rango |
|---------|---------|-------|
| PERCENT_RANK | (rank - 1) / (N - 1) | 0 a 1 |
| CUME_DIST | rank / N | 0+ a 1 |

\`\`\`sql
SELECT 
  name,
  salary,
  ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 1) as percentile,
  ROUND(CUME_DIST() OVER (ORDER BY salary) * 100, 1) as cumulative_dist
FROM employees;
\`\`\`

**Interpretación:**
- PERCENT_RANK 0.8 = "mejor que el 80%"
- CUME_DIST 0.8 = "80% de los valores son ≤ a este"`,
      en: `**PERCENT_RANK vs CUME_DIST:**

| Function | Formula | Range |
|----------|---------|-------|
| PERCENT_RANK | (rank - 1) / (N - 1) | 0 to 1 |
| CUME_DIST | rank / N | 0+ to 1 |

\`\`\`sql
SELECT 
  name,
  salary,
  ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 1) as percentile,
  ROUND(CUME_DIST() OVER (ORDER BY salary) * 100, 1) as cumulative_dist
FROM employees;
\`\`\`

**Interpretation:**
- PERCENT_RANK 0.8 = "better than 80%"
- CUME_DIST 0.8 = "80% of values are ≤ this"`,
      pt: `**PERCENT_RANK vs CUME_DIST:**

| Função | Fórmula | Intervalo |
|--------|---------|-----------|
| PERCENT_RANK | (rank - 1) / (N - 1) | 0 a 1 |
| CUME_DIST | rank / N | 0+ a 1 |

\`\`\`sql
SELECT 
  name,
  salary,
  ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 1) as percentile,
  ROUND(CUME_DIST() OVER (ORDER BY salary) * 100, 1) as cumulative_dist
FROM employees;
\`\`\`

**Interpretação:**
- PERCENT_RANK 0.8 = "melhor que 80%"
- CUME_DIST 0.8 = "80% dos valores são ≤ a este"`
    },
    realWorldExample: {
      es: 'Análisis de compensación, distribución de datos.',
      en: 'Compensation analysis, data distribution.',
      pt: 'Análise de compensação, distribuição de dados.'
    },
    hint: {
      es: 'Multiplicá por 100 y redondeá para obtener porcentaje',
      en: 'Multiply by 100 and round to get percentage',
      pt: 'Multiplique por 100 e arredonde para obter porcentagem'
    },
    
    schema: `CREATE TABLE employees (id INT, name TEXT, salary REAL);`,
    sampleData: `INSERT INTO employees VALUES (1, 'Ana', 40000);
INSERT INTO employees VALUES (2, 'Bob', 50000);
INSERT INTO employees VALUES (3, 'Carlos', 60000);
INSERT INTO employees VALUES (4, 'Diana', 70000);
INSERT INTO employees VALUES (5, 'Eva', 80000);`,
    expectedQuery: `SELECT 
  name,
  salary,
  ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 1) as percentile
FROM employees`,
    expectedResult: [
      ['Ana', 40000, 0.0],
      ['Bob', 50000, 25.0],
      ['Carlos', 60000, 50.0],
      ['Diana', 70000, 75.0],
      ['Eva', 80000, 100.0],
    ],
  },
  // === Window Function con CASE ===
  {
    id: 'sql-wx10',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['window', 'case', 'conditional'],
    interviewFrequency: 'high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Window Functions con CASE - Cambio de tendencia',
      en: 'Window Functions with CASE - Trend Change',
      pt: 'Window Functions com CASE - Mudança de Tendência'
    },
    description: {
      es: 'Identificá si las ventas de cada día subieron, bajaron o se mantuvieron respecto al día anterior.',
      en: 'Identify if sales for each day went up, down, or stayed the same compared to previous day.',
      pt: 'Identifique se as vendas de cada dia subiram, desceram ou ficaram iguais em relação ao dia anterior.'
    },
    theory: {
      es: `**Combinando Window Functions con CASE:**

\`\`\`sql
SELECT 
  date,
  sales,
  LAG(sales) OVER (ORDER BY date) as prev_sales,
  CASE 
    WHEN sales > LAG(sales) OVER (ORDER BY date) THEN '📈 Up'
    WHEN sales < LAG(sales) OVER (ORDER BY date) THEN '📉 Down'
    WHEN sales = LAG(sales) OVER (ORDER BY date) THEN '➡️ Same'
    ELSE '🆕 First'
  END as trend
FROM daily_sales;
\`\`\`

**Patrones útiles:**
- Detectar incrementos/decrementos
- Categorizar cambios
- Identificar records (MAX hasta la fecha)`,
      en: `**Combining Window Functions with CASE:**

\`\`\`sql
SELECT 
  date,
  sales,
  LAG(sales) OVER (ORDER BY date) as prev_sales,
  CASE 
    WHEN sales > LAG(sales) OVER (ORDER BY date) THEN '📈 Up'
    WHEN sales < LAG(sales) OVER (ORDER BY date) THEN '📉 Down'
    WHEN sales = LAG(sales) OVER (ORDER BY date) THEN '➡️ Same'
    ELSE '🆕 First'
  END as trend
FROM daily_sales;
\`\`\`

**Useful patterns:**
- Detect increases/decreases
- Categorize changes
- Identify records (MAX to date)`,
      pt: `**Combinando Window Functions com CASE:**

\`\`\`sql
SELECT 
  date,
  sales,
  LAG(sales) OVER (ORDER BY date) as prev_sales,
  CASE 
    WHEN sales > LAG(sales) OVER (ORDER BY date) THEN '📈 Up'
    WHEN sales < LAG(sales) OVER (ORDER BY date) THEN '📉 Down'
    WHEN sales = LAG(sales) OVER (ORDER BY date) THEN '➡️ Same'
    ELSE '🆕 First'
  END as trend
FROM daily_sales;
\`\`\`

**Padrões úteis:**
- Detectar aumentos/diminuições
- Categorizar mudanças
- Identificar records (MAX até a data)`
    },
    realWorldExample: {
      es: 'Análisis de tendencias, alertas de cambios.',
      en: 'Trend analysis, change alerts.',
      pt: 'Análise de tendências, alertas de mudanças.'
    },
    hint: {
      es: 'Usá LAG() dentro de CASE para comparar con valor anterior',
      en: 'Use LAG() inside CASE to compare with previous value',
      pt: 'Use LAG() dentro de CASE para comparar com valor anterior'
    },
    
    schema: `CREATE TABLE daily_sales (id INT, date TEXT, sales REAL);`,
    sampleData: `INSERT INTO daily_sales VALUES (1, '2024-01-01', 100);
INSERT INTO daily_sales VALUES (2, '2024-01-02', 150);
INSERT INTO daily_sales VALUES (3, '2024-01-03', 150);
INSERT INTO daily_sales VALUES (4, '2024-01-04', 120);
INSERT INTO daily_sales VALUES (5, '2024-01-05', 180);`,
    expectedQuery: `SELECT 
  date,
  sales,
  CASE 
    WHEN LAG(sales) OVER (ORDER BY date) IS NULL THEN 'First'
    WHEN sales > LAG(sales) OVER (ORDER BY date) THEN 'Up'
    WHEN sales < LAG(sales) OVER (ORDER BY date) THEN 'Down'
    ELSE 'Same'
  END as trend
FROM daily_sales`,
    expectedResult: [
      ['2024-01-01', 100, 'First'],
      ['2024-01-02', 150, 'Up'],
      ['2024-01-03', 150, 'Same'],
      ['2024-01-04', 120, 'Down'],
      ['2024-01-05', 180, 'Up'],
    ],
  },
  // === Named Window (WINDOW clause) ===
  {
    id: 'sql-wx11',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['window clause', 'named window', 'reuse'],
    interviewFrequency: 'medium',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'WINDOW clause - Reutilizar definiciones',
      en: 'WINDOW Clause - Reuse Definitions',
      pt: 'WINDOW Clause - Reutilizar Definições'
    },
    description: {
      es: 'Usá la cláusula WINDOW para definir una ventana reutilizable y calcular varias métricas.',
      en: 'Use WINDOW clause to define a reusable window and calculate multiple metrics.',
      pt: 'Use a cláusula WINDOW para definir uma janela reutilizável e calcular várias métricas.'
    },
    theory: {
      es: `**WINDOW clause - Definir ventanas reutilizables:**

\`\`\`sql
SELECT 
  date,
  sales,
  SUM(sales) OVER w as running_total,
  AVG(sales) OVER w as running_avg,
  COUNT(*) OVER w as running_count
FROM daily_sales
WINDOW w AS (ORDER BY date);
\`\`\`

**Ventajas:**
- Código más limpio y DRY
- Más fácil de mantener
- Evita repetir la misma definición

**Múltiples ventanas:**
\`\`\`sql
WINDOW 
  w1 AS (ORDER BY date),
  w2 AS (PARTITION BY category ORDER BY date)
\`\`\``,
      en: `**WINDOW clause - Define reusable windows:**

\`\`\`sql
SELECT 
  date,
  sales,
  SUM(sales) OVER w as running_total,
  AVG(sales) OVER w as running_avg,
  COUNT(*) OVER w as running_count
FROM daily_sales
WINDOW w AS (ORDER BY date);
\`\`\`

**Advantages:**
- Cleaner and DRY code
- Easier to maintain
- Avoids repeating same definition

**Multiple windows:**
\`\`\`sql
WINDOW 
  w1 AS (ORDER BY date),
  w2 AS (PARTITION BY category ORDER BY date)
\`\`\``,
      pt: `**WINDOW clause - Definir janelas reutilizáveis:**

\`\`\`sql
SELECT 
  date,
  sales,
  SUM(sales) OVER w as running_total,
  AVG(sales) OVER w as running_avg,
  COUNT(*) OVER w as running_count
FROM daily_sales
WINDOW w AS (ORDER BY date);
\`\`\`

**Vantagens:**
- Código mais limpo e DRY
- Mais fácil de manter
- Evita repetir a mesma definição

**Múltiplas janelas:**
\`\`\`sql
WINDOW 
  w1 AS (ORDER BY date),
  w2 AS (PARTITION BY category ORDER BY date)
\`\`\``
    },
    realWorldExample: {
      es: 'Queries complejos con múltiples métricas sobre la misma ventana.',
      en: 'Complex queries with multiple metrics over same window.',
      pt: 'Queries complexos com múltiplas métricas sobre a mesma janela.'
    },
    hint: {
      es: 'Definí la ventana con WINDOW w AS (...) después del FROM',
      en: 'Define window with WINDOW w AS (...) after FROM',
      pt: 'Defina a janela com WINDOW w AS (...) depois do FROM'
    },
    
    schema: `CREATE TABLE daily_sales (id INT, date TEXT, sales REAL);`,
    sampleData: `INSERT INTO daily_sales VALUES (1, '2024-01-01', 100);
INSERT INTO daily_sales VALUES (2, '2024-01-02', 150);
INSERT INTO daily_sales VALUES (3, '2024-01-03', 200);
INSERT INTO daily_sales VALUES (4, '2024-01-04', 120);`,
    expectedQuery: `SELECT 
  date,
  sales,
  SUM(sales) OVER w as running_total,
  ROUND(AVG(sales) OVER w, 2) as running_avg,
  COUNT(*) OVER w as day_number
FROM daily_sales
WINDOW w AS (ORDER BY date)`,
    expectedResult: [
      ['2024-01-01', 100, 100, 100.0, 1],
      ['2024-01-02', 150, 250, 125.0, 2],
      ['2024-01-03', 200, 450, 150.0, 3],
      ['2024-01-04', 120, 570, 142.5, 4],
    ],
  },
  // === Top N por grupo con window functions ===
  {
    id: 'sql-wx12',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'window_functions',
    tags: ['top n', 'partition', 'subquery'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Top N por grupo (pregunta clásica de entrevista)',
      en: 'Top N Per Group (Classic Interview Question)',
      pt: 'Top N por Grupo (Pergunta Clássica de Entrevista)'
    },
    description: {
      es: 'Obtené los 2 productos más vendidos de cada categoría.',
      en: 'Get the top 2 best-selling products from each category.',
      pt: 'Obtenha os 2 produtos mais vendidos de cada categoria.'
    },
    theory: {
      es: `**Top N por grupo - Patrón clásico:**

\`\`\`sql
WITH ranked AS (
  SELECT 
    category,
    product,
    sales,
    ROW_NUMBER() OVER (
      PARTITION BY category 
      ORDER BY sales DESC
    ) as rn
  FROM products
)
SELECT category, product, sales
FROM ranked
WHERE rn <= 2;
\`\`\`

**Alternativas:**
- RANK() si querés incluir empates
- DENSE_RANK() para empates sin saltar posiciones

**⚠️ Muy preguntado en entrevistas!**`,
      en: `**Top N per group - Classic pattern:**

\`\`\`sql
WITH ranked AS (
  SELECT 
    category,
    product,
    sales,
    ROW_NUMBER() OVER (
      PARTITION BY category 
      ORDER BY sales DESC
    ) as rn
  FROM products
)
SELECT category, product, sales
FROM ranked
WHERE rn <= 2;
\`\`\`

**Alternatives:**
- RANK() if you want to include ties
- DENSE_RANK() for ties without skipping positions

**⚠️ Very common interview question!**`,
      pt: `**Top N por grupo - Padrão clássico:**

\`\`\`sql
WITH ranked AS (
  SELECT 
    category,
    product,
    sales,
    ROW_NUMBER() OVER (
      PARTITION BY category 
      ORDER BY sales DESC
    ) as rn
  FROM products
)
SELECT category, product, sales
FROM ranked
WHERE rn <= 2;
\`\`\`

**Alternativas:**
- RANK() se quiser incluir empates
- DENSE_RANK() para empates sem pular posições

**⚠️ Muito perguntado em entrevistas!**`
    },
    realWorldExample: {
      es: 'Top vendedores por región, mejores productos por categoría.',
      en: 'Top salespeople by region, best products by category.',
      pt: 'Top vendedores por região, melhores produtos por categoria.'
    },
    hint: {
      es: 'Usá ROW_NUMBER con PARTITION BY y luego filtrá por rn <= 2',
      en: 'Use ROW_NUMBER with PARTITION BY then filter by rn <= 2',
      pt: 'Use ROW_NUMBER com PARTITION BY e depois filtre por rn <= 2'
    },
    
    schema: `CREATE TABLE products (id INT, category TEXT, product TEXT, sales INT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Electronics', 'Laptop', 150);
INSERT INTO products VALUES (2, 'Electronics', 'Phone', 200);
INSERT INTO products VALUES (3, 'Electronics', 'Tablet', 80);
INSERT INTO products VALUES (4, 'Electronics', 'Camera', 50);
INSERT INTO products VALUES (5, 'Clothing', 'Jacket', 100);
INSERT INTO products VALUES (6, 'Clothing', 'Shirt', 180);
INSERT INTO products VALUES (7, 'Clothing', 'Pants', 120);`,
    expectedQuery: `WITH ranked AS (
  SELECT 
    category,
    product,
    sales,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) as rn
  FROM products
)
SELECT category, product, sales
FROM ranked
WHERE rn <= 2`,
    expectedResult: [
      ['Clothing', 'Shirt', 180],
      ['Clothing', 'Pants', 120],
      ['Electronics', 'Phone', 200],
      ['Electronics', 'Laptop', 150],
    ],
  },
];

export default SQL_WINDOW_FUNCTIONS_EXTENDED;

