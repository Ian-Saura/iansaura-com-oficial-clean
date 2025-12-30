/**
 * SQL Aggregations Extended Exercises
 * More GROUP BY, HAVING, COUNT, SUM, AVG exercises for Saurio 🦖
 */

import { SQLExercise } from '../types';

export const SQL_AGGREGATIONS_EXTENDED: SQLExercise[] = [
  // === HAVING con múltiples condiciones ===
  {
    id: 'sql-ax1',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['having', 'multiple conditions', 'groupby'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'HAVING con múltiples condiciones',
      en: 'HAVING with Multiple Conditions',
      pt: 'HAVING com Múltiplas Condições'
    },
    description: {
      es: 'Encontrá departamentos con más de 2 empleados Y salario promedio mayor a 50000.',
      en: 'Find departments with more than 2 employees AND average salary greater than 50000.',
      pt: 'Encontre departamentos com mais de 2 funcionários E salário médio maior que 50000.'
    },
    theory: {
      es: `**HAVING con múltiples condiciones:**

\`\`\`sql
SELECT department, COUNT(*) as emp_count, AVG(salary) as avg_sal
FROM employees
GROUP BY department
HAVING COUNT(*) > 2 AND AVG(salary) > 50000;
\`\`\`

**Regla:** HAVING filtra DESPUÉS del GROUP BY.

**Diferencia con WHERE:**
- WHERE filtra filas ANTES del agrupamiento
- HAVING filtra grupos DESPUÉS del agrupamiento`,
      en: `**HAVING with multiple conditions:**

\`\`\`sql
SELECT department, COUNT(*) as emp_count, AVG(salary) as avg_sal
FROM employees
GROUP BY department
HAVING COUNT(*) > 2 AND AVG(salary) > 50000;
\`\`\`

**Rule:** HAVING filters AFTER GROUP BY.

**Difference from WHERE:**
- WHERE filters rows BEFORE grouping
- HAVING filters groups AFTER grouping`,
      pt: `**HAVING com múltiplas condições:**

\`\`\`sql
SELECT department, COUNT(*) as emp_count, AVG(salary) as avg_sal
FROM employees
GROUP BY department
HAVING COUNT(*) > 2 AND AVG(salary) > 50000;
\`\`\`

**Regra:** HAVING filtra DEPOIS do GROUP BY.

**Diferença do WHERE:**
- WHERE filtra linhas ANTES do agrupamento
- HAVING filtra grupos DEPOIS do agrupamento`
    },
    realWorldExample: {
      es: 'Identificar departamentos grandes y bien pagados.',
      en: 'Identify large and well-paid departments.',
      pt: 'Identificar departamentos grandes e bem pagos.'
    },
    hint: {
      es: 'Usá HAVING con COUNT(*) > 2 AND AVG(salary) > 50000',
      en: 'Use HAVING with COUNT(*) > 2 AND AVG(salary) > 50000',
      pt: 'Use HAVING com COUNT(*) > 2 AND AVG(salary) > 50000'
    },
    
    schema: `CREATE TABLE employees (id INT, name TEXT, department TEXT, salary REAL);`,
    sampleData: `INSERT INTO employees VALUES (1, 'Ana', 'IT', 60000);
INSERT INTO employees VALUES (2, 'Bob', 'IT', 55000);
INSERT INTO employees VALUES (3, 'Carlos', 'IT', 58000);
INSERT INTO employees VALUES (4, 'Diana', 'HR', 45000);
INSERT INTO employees VALUES (5, 'Eva', 'HR', 48000);
INSERT INTO employees VALUES (6, 'Frank', 'Sales', 52000);
INSERT INTO employees VALUES (7, 'Grace', 'Sales', 54000);
INSERT INTO employees VALUES (8, 'Henry', 'Sales', 56000);`,
    expectedQuery: `SELECT department, COUNT(*) as emp_count, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING COUNT(*) > 2 AND AVG(salary) > 50000`,
    expectedResult: [
      ['IT', 3, 57666.666666666664],
      ['Sales', 3, 54000],
    ],
  },
  // === COUNT DISTINCT ===
  {
    id: 'sql-ax2',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['count', 'distinct', 'unique'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'COUNT DISTINCT - Valores únicos',
      en: 'COUNT DISTINCT - Unique Values',
      pt: 'COUNT DISTINCT - Valores Únicos'
    },
    description: {
      es: 'Contá cuántos clientes únicos hay y cuántos países diferentes tienen.',
      en: 'Count how many unique customers and how many different countries there are.',
      pt: 'Conte quantos clientes únicos existem e quantos países diferentes têm.'
    },
    theory: {
      es: `**COUNT DISTINCT:**

\`\`\`sql
-- Contar valores únicos
SELECT COUNT(DISTINCT customer_id) as unique_customers
FROM orders;

-- vs COUNT normal (cuenta todos incluyendo repetidos)
SELECT COUNT(customer_id) as total_orders
FROM orders;

-- Múltiples COUNT DISTINCT
SELECT 
  COUNT(DISTINCT customer_id) as customers,
  COUNT(DISTINCT product_id) as products,
  COUNT(*) as total_rows
FROM orders;
\`\`\``,
      en: `**COUNT DISTINCT:**

\`\`\`sql
-- Count unique values
SELECT COUNT(DISTINCT customer_id) as unique_customers
FROM orders;

-- vs normal COUNT (counts all including repeats)
SELECT COUNT(customer_id) as total_orders
FROM orders;

-- Multiple COUNT DISTINCT
SELECT 
  COUNT(DISTINCT customer_id) as customers,
  COUNT(DISTINCT product_id) as products,
  COUNT(*) as total_rows
FROM orders;
\`\`\``,
      pt: `**COUNT DISTINCT:**

\`\`\`sql
-- Contar valores únicos
SELECT COUNT(DISTINCT customer_id) as unique_customers
FROM orders;

-- vs COUNT normal (conta todos incluindo repetidos)
SELECT COUNT(customer_id) as total_orders
FROM orders;

-- Múltiplos COUNT DISTINCT
SELECT 
  COUNT(DISTINCT customer_id) as customers,
  COUNT(DISTINCT product_id) as products,
  COUNT(*) as total_rows
FROM orders;
\`\`\``
    },
    realWorldExample: {
      es: 'Métricas de usuarios únicos, diversidad de datos.',
      en: 'Unique user metrics, data diversity.',
      pt: 'Métricas de usuários únicos, diversidade de dados.'
    },
    hint: {
      es: 'Usá COUNT(DISTINCT columna) para valores únicos',
      en: 'Use COUNT(DISTINCT column) for unique values',
      pt: 'Use COUNT(DISTINCT coluna) para valores únicos'
    },
    
    schema: `CREATE TABLE customers (id INT, name TEXT, country TEXT);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana', 'Spain');
INSERT INTO customers VALUES (2, 'Bob', 'USA');
INSERT INTO customers VALUES (3, 'Carlos', 'Spain');
INSERT INTO customers VALUES (4, 'Diana', 'Germany');
INSERT INTO customers VALUES (5, 'Eva', 'USA');
INSERT INTO customers VALUES (6, 'Frank', 'Spain');`,
    expectedQuery: `SELECT COUNT(*) as total_customers, COUNT(DISTINCT country) as unique_countries FROM customers`,
    expectedResult: [
      [6, 3],
    ],
  },
  // === GROUP BY múltiples columnas ===
  {
    id: 'sql-ax3',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['groupby', 'multiple columns', 'hierarchical'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'GROUP BY múltiples columnas',
      en: 'GROUP BY Multiple Columns',
      pt: 'GROUP BY Múltiplas Colunas'
    },
    description: {
      es: 'Calculá el total de ventas por año Y mes.',
      en: 'Calculate total sales by year AND month.',
      pt: 'Calcule o total de vendas por ano E mês.'
    },
    theory: {
      es: `**GROUP BY múltiples columnas:**

\`\`\`sql
SELECT 
  year, 
  month, 
  SUM(amount) as total
FROM sales
GROUP BY year, month
ORDER BY year, month;
\`\`\`

**Comportamiento:** Crea un grupo por cada combinación única de valores.

**Ejemplo:**
- (2024, 01): $1000
- (2024, 02): $1200
- (2024, 03): $900`,
      en: `**GROUP BY multiple columns:**

\`\`\`sql
SELECT 
  year, 
  month, 
  SUM(amount) as total
FROM sales
GROUP BY year, month
ORDER BY year, month;
\`\`\`

**Behavior:** Creates a group for each unique combination of values.

**Example:**
- (2024, 01): $1000
- (2024, 02): $1200
- (2024, 03): $900`,
      pt: `**GROUP BY múltiplas colunas:**

\`\`\`sql
SELECT 
  year, 
  month, 
  SUM(amount) as total
FROM sales
GROUP BY year, month
ORDER BY year, month;
\`\`\`

**Comportamento:** Cria um grupo para cada combinação única de valores.

**Exemplo:**
- (2024, 01): $1000
- (2024, 02): $1200
- (2024, 03): $900`
    },
    realWorldExample: {
      es: 'Reportes mensuales, análisis jerárquico.',
      en: 'Monthly reports, hierarchical analysis.',
      pt: 'Relatórios mensais, análise hierárquica.'
    },
    hint: {
      es: 'Usá GROUP BY año, mes para agrupar por ambos',
      en: 'Use GROUP BY year, month to group by both',
      pt: 'Use GROUP BY ano, mes para agrupar por ambos'
    },
    
    schema: `CREATE TABLE sales (id INT, sale_year INT, sale_month INT, amount REAL);`,
    sampleData: `INSERT INTO sales VALUES (1, 2024, 1, 500);
INSERT INTO sales VALUES (2, 2024, 1, 300);
INSERT INTO sales VALUES (3, 2024, 2, 450);
INSERT INTO sales VALUES (4, 2024, 2, 550);
INSERT INTO sales VALUES (5, 2024, 3, 600);
INSERT INTO sales VALUES (6, 2024, 1, 200);`,
    expectedQuery: `SELECT sale_year, sale_month, SUM(amount) as total_sales
FROM sales
GROUP BY sale_year, sale_month
ORDER BY sale_year, sale_month`,
    expectedResult: [
      [2024, 1, 1000],
      [2024, 2, 1000],
      [2024, 3, 600],
    ],
  },
  // === MIN y MAX ===
  {
    id: 'sql-ax4',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['min', 'max', 'extremes'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'MIN y MAX',
      en: 'MIN and MAX',
      pt: 'MIN e MAX'
    },
    description: {
      es: 'Encontrá el producto más caro y el más barato por categoría.',
      en: 'Find the most expensive and cheapest product per category.',
      pt: 'Encontre o produto mais caro e o mais barato por categoria.'
    },
    theory: {
      es: `**MIN y MAX:**

\`\`\`sql
-- Valores extremos globales
SELECT MIN(price), MAX(price) FROM products;

-- Por grupo
SELECT 
  category,
  MIN(price) as cheapest,
  MAX(price) as most_expensive
FROM products
GROUP BY category;

-- También funciona con fechas y strings
SELECT MIN(order_date), MAX(order_date) FROM orders;
SELECT MIN(name), MAX(name) FROM products;  -- Alfabético
\`\`\``,
      en: `**MIN and MAX:**

\`\`\`sql
-- Global extreme values
SELECT MIN(price), MAX(price) FROM products;

-- By group
SELECT 
  category,
  MIN(price) as cheapest,
  MAX(price) as most_expensive
FROM products
GROUP BY category;

-- Also works with dates and strings
SELECT MIN(order_date), MAX(order_date) FROM orders;
SELECT MIN(name), MAX(name) FROM products;  -- Alphabetical
\`\`\``,
      pt: `**MIN e MAX:**

\`\`\`sql
-- Valores extremos globais
SELECT MIN(price), MAX(price) FROM products;

-- Por grupo
SELECT 
  category,
  MIN(price) as cheapest,
  MAX(price) as most_expensive
FROM products
GROUP BY category;

-- Também funciona com datas e strings
SELECT MIN(order_date), MAX(order_date) FROM orders;
SELECT MIN(name), MAX(name) FROM products;  -- Alfabético
\`\`\``
    },
    realWorldExample: {
      es: 'Rangos de precios, fechas límite, extremos de datos.',
      en: 'Price ranges, date limits, data extremes.',
      pt: 'Faixas de preços, datas limite, extremos de dados.'
    },
    hint: {
      es: 'Usá MIN(price) y MAX(price) agrupado por category',
      en: 'Use MIN(price) and MAX(price) grouped by category',
      pt: 'Use MIN(price) e MAX(price) agrupado por category'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, category TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 999);
INSERT INTO products VALUES (2, 'Mouse', 'Electronics', 29);
INSERT INTO products VALUES (3, 'Monitor', 'Electronics', 349);
INSERT INTO products VALUES (4, 'Desk', 'Furniture', 299);
INSERT INTO products VALUES (5, 'Chair', 'Furniture', 149);
INSERT INTO products VALUES (6, 'Lamp', 'Furniture', 49);`,
    expectedQuery: `SELECT category, MIN(price) as min_price, MAX(price) as max_price
FROM products
GROUP BY category`,
    expectedResult: [
      ['Electronics', 29, 999],
      ['Furniture', 49, 299],
    ],
  },
  // === SUM con CASE ===
  {
    id: 'sql-ax5',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['sum', 'case', 'conditional aggregation'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'SUM con CASE - Agregación condicional',
      en: 'SUM with CASE - Conditional Aggregation',
      pt: 'SUM com CASE - Agregação Condicional'
    },
    description: {
      es: 'Contá cuántos pedidos están en cada estado (pending, completed, cancelled) en columnas separadas.',
      en: 'Count how many orders are in each status (pending, completed, cancelled) in separate columns.',
      pt: 'Conte quantos pedidos estão em cada status (pending, completed, cancelled) em colunas separadas.'
    },
    theory: {
      es: `**SUM con CASE - Pivot manual:**

\`\`\`sql
SELECT 
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
FROM orders;
\`\`\`

**Alternativa con COUNT:**
\`\`\`sql
COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending
\`\`\`

**Uso:** Crear tablas pivote sin función PIVOT.`,
      en: `**SUM with CASE - Manual pivot:**

\`\`\`sql
SELECT 
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
FROM orders;
\`\`\`

**Alternative with COUNT:**
\`\`\`sql
COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending
\`\`\`

**Use:** Create pivot tables without PIVOT function.`,
      pt: `**SUM com CASE - Pivot manual:**

\`\`\`sql
SELECT 
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled
FROM orders;
\`\`\`

**Alternativa com COUNT:**
\`\`\`sql
COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending
\`\`\`

**Uso:** Criar tabelas pivot sem função PIVOT.`
    },
    realWorldExample: {
      es: 'Dashboards de estado, reportes de conversión.',
      en: 'Status dashboards, conversion reports.',
      pt: 'Dashboards de status, relatórios de conversão.'
    },
    hint: {
      es: 'Usá SUM(CASE WHEN status = "valor" THEN 1 ELSE 0 END) para cada estado',
      en: 'Use SUM(CASE WHEN status = "value" THEN 1 ELSE 0 END) for each status',
      pt: 'Use SUM(CASE WHEN status = "valor" THEN 1 ELSE 0 END) para cada status'
    },
    
    schema: `CREATE TABLE orders (id INT, customer TEXT, status TEXT, amount REAL);`,
    sampleData: `INSERT INTO orders VALUES (1, 'Ana', 'completed', 100);
INSERT INTO orders VALUES (2, 'Bob', 'pending', 150);
INSERT INTO orders VALUES (3, 'Carlos', 'completed', 200);
INSERT INTO orders VALUES (4, 'Diana', 'cancelled', 80);
INSERT INTO orders VALUES (5, 'Eva', 'pending', 120);
INSERT INTO orders VALUES (6, 'Frank', 'completed', 90);
INSERT INTO orders VALUES (7, 'Grace', 'cancelled', 110);`,
    expectedQuery: `SELECT 
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_count,
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_count,
  SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_count
FROM orders`,
    expectedResult: [
      [2, 3, 2],
    ],
  },
  // === AVG con filtros ===
  {
    id: 'sql-ax6',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['avg', 'filter', 'where'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'AVG con WHERE',
      en: 'AVG with WHERE',
      pt: 'AVG com WHERE'
    },
    description: {
      es: 'Calculá el promedio de ventas solo para transacciones mayores a $50.',
      en: 'Calculate average sales only for transactions greater than $50.',
      pt: 'Calcule a média de vendas apenas para transações maiores que $50.'
    },
    theory: {
      es: `**AVG con filtros:**

\`\`\`sql
-- Promedio general
SELECT AVG(amount) FROM sales;

-- Promedio filtrado
SELECT AVG(amount) FROM sales WHERE amount > 50;

-- Comparar ambos
SELECT 
  AVG(amount) as avg_all,
  AVG(CASE WHEN amount > 50 THEN amount END) as avg_large
FROM sales;
\`\`\`

**⚠️ NULL:** AVG ignora NULLs automáticamente.`,
      en: `**AVG with filters:**

\`\`\`sql
-- General average
SELECT AVG(amount) FROM sales;

-- Filtered average
SELECT AVG(amount) FROM sales WHERE amount > 50;

-- Compare both
SELECT 
  AVG(amount) as avg_all,
  AVG(CASE WHEN amount > 50 THEN amount END) as avg_large
FROM sales;
\`\`\`

**⚠️ NULL:** AVG ignores NULLs automatically.`,
      pt: `**AVG com filtros:**

\`\`\`sql
-- Média geral
SELECT AVG(amount) FROM sales;

-- Média filtrada
SELECT AVG(amount) FROM sales WHERE amount > 50;

-- Comparar ambas
SELECT 
  AVG(amount) as avg_all,
  AVG(CASE WHEN amount > 50 THEN amount END) as avg_large
FROM sales;
\`\`\`

**⚠️ NULL:** AVG ignora NULLs automaticamente.`
    },
    realWorldExample: {
      es: 'Métricas excluyendo outliers o transacciones mínimas.',
      en: 'Metrics excluding outliers or minimum transactions.',
      pt: 'Métricas excluindo outliers ou transações mínimas.'
    },
    hint: {
      es: 'Filtrá primero con WHERE y luego calculá AVG',
      en: 'Filter first with WHERE then calculate AVG',
      pt: 'Filtre primeiro com WHERE e depois calcule AVG'
    },
    
    schema: `CREATE TABLE sales (id INT, product TEXT, amount REAL);`,
    sampleData: `INSERT INTO sales VALUES (1, 'A', 30);
INSERT INTO sales VALUES (2, 'B', 80);
INSERT INTO sales VALUES (3, 'C', 45);
INSERT INTO sales VALUES (4, 'D', 120);
INSERT INTO sales VALUES (5, 'E', 60);
INSERT INTO sales VALUES (6, 'F', 25);`,
    expectedQuery: `SELECT 
  ROUND(AVG(amount), 2) as avg_all,
  ROUND(AVG(CASE WHEN amount > 50 THEN amount END), 2) as avg_above_50
FROM sales`,
    expectedResult: [
      [60, 86.67],
    ],
  },
  // === GROUP BY con ORDER BY agregado ===
  {
    id: 'sql-ax7',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['groupby', 'orderby', 'ranking'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Ordenar por resultado de agregación',
      en: 'Order by Aggregation Result',
      pt: 'Ordenar por Resultado de Agregação'
    },
    description: {
      es: 'Mostrá categorías ordenadas por total de ventas (de mayor a menor).',
      en: 'Show categories ordered by total sales (highest to lowest).',
      pt: 'Mostre categorias ordenadas por total de vendas (do maior para o menor).'
    },
    theory: {
      es: `**ORDER BY con agregaciones:**

\`\`\`sql
SELECT category, SUM(amount) as total
FROM sales
GROUP BY category
ORDER BY total DESC;  -- Usar alias

-- O directamente
ORDER BY SUM(amount) DESC;

-- Por múltiples criterios
ORDER BY total DESC, category ASC;
\`\`\`

**Tip:** Podés usar el alias en ORDER BY.`,
      en: `**ORDER BY with aggregations:**

\`\`\`sql
SELECT category, SUM(amount) as total
FROM sales
GROUP BY category
ORDER BY total DESC;  -- Use alias

-- Or directly
ORDER BY SUM(amount) DESC;

-- By multiple criteria
ORDER BY total DESC, category ASC;
\`\`\`

**Tip:** You can use alias in ORDER BY.`,
      pt: `**ORDER BY com agregações:**

\`\`\`sql
SELECT category, SUM(amount) as total
FROM sales
GROUP BY category
ORDER BY total DESC;  -- Usar alias

-- Ou diretamente
ORDER BY SUM(amount) DESC;

-- Por múltiplos critérios
ORDER BY total DESC, category ASC;
\`\`\`

**Dica:** Você pode usar alias em ORDER BY.`
    },
    realWorldExample: {
      es: 'Rankings de ventas, top categorías.',
      en: 'Sales rankings, top categories.',
      pt: 'Rankings de vendas, top categorias.'
    },
    hint: {
      es: 'Usá ORDER BY SUM(amount) DESC o el alias',
      en: 'Use ORDER BY SUM(amount) DESC or the alias',
      pt: 'Use ORDER BY SUM(amount) DESC ou o alias'
    },
    
    schema: `CREATE TABLE sales (id INT, category TEXT, amount REAL);`,
    sampleData: `INSERT INTO sales VALUES (1, 'Electronics', 500);
INSERT INTO sales VALUES (2, 'Clothing', 200);
INSERT INTO sales VALUES (3, 'Electronics', 300);
INSERT INTO sales VALUES (4, 'Furniture', 450);
INSERT INTO sales VALUES (5, 'Clothing', 150);
INSERT INTO sales VALUES (6, 'Electronics', 400);`,
    expectedQuery: `SELECT category, SUM(amount) as total_sales
FROM sales
GROUP BY category
ORDER BY total_sales DESC`,
    expectedResult: [
      ['Electronics', 1200],
      ['Furniture', 450],
      ['Clothing', 350],
    ],
  },
  // === COUNT(*) vs COUNT(column) ===
  {
    id: 'sql-ax8',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['count', 'null', 'difference'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'COUNT(*) vs COUNT(columna)',
      en: 'COUNT(*) vs COUNT(column)',
      pt: 'COUNT(*) vs COUNT(coluna)'
    },
    description: {
      es: 'Contá total de filas vs filas con email (no NULL).',
      en: 'Count total rows vs rows with email (not NULL).',
      pt: 'Conte total de linhas vs linhas com email (não NULL).'
    },
    theory: {
      es: `**Diferencia COUNT(*) vs COUNT(columna):**

\`\`\`sql
-- COUNT(*) cuenta TODAS las filas
SELECT COUNT(*) FROM users;  -- 5

-- COUNT(columna) cuenta valores NO NULL
SELECT COUNT(email) FROM users;  -- 3 (si hay 2 NULLs)

-- Usar para detectar NULLs
SELECT 
  COUNT(*) as total,
  COUNT(email) as with_email,
  COUNT(*) - COUNT(email) as missing_email
FROM users;
\`\`\``,
      en: `**Difference COUNT(*) vs COUNT(column):**

\`\`\`sql
-- COUNT(*) counts ALL rows
SELECT COUNT(*) FROM users;  -- 5

-- COUNT(column) counts non-NULL values
SELECT COUNT(email) FROM users;  -- 3 (if 2 NULLs)

-- Use to detect NULLs
SELECT 
  COUNT(*) as total,
  COUNT(email) as with_email,
  COUNT(*) - COUNT(email) as missing_email
FROM users;
\`\`\``,
      pt: `**Diferença COUNT(*) vs COUNT(coluna):**

\`\`\`sql
-- COUNT(*) conta TODAS as linhas
SELECT COUNT(*) FROM users;  -- 5

-- COUNT(coluna) conta valores NÃO NULL
SELECT COUNT(email) FROM users;  -- 3 (se há 2 NULLs)

-- Usar para detectar NULLs
SELECT 
  COUNT(*) as total,
  COUNT(email) as with_email,
  COUNT(*) - COUNT(email) as missing_email
FROM users;
\`\`\``
    },
    realWorldExample: {
      es: 'Auditar completitud de datos, detectar campos vacíos.',
      en: 'Audit data completeness, detect empty fields.',
      pt: 'Auditar completude de dados, detectar campos vazios.'
    },
    hint: {
      es: 'COUNT(*) cuenta todo, COUNT(email) ignora NULLs',
      en: 'COUNT(*) counts all, COUNT(email) ignores NULLs',
      pt: 'COUNT(*) conta tudo, COUNT(email) ignora NULLs'
    },
    
    schema: `CREATE TABLE users (id INT, name TEXT, email TEXT);`,
    sampleData: `INSERT INTO users VALUES (1, 'Ana', 'ana@mail.com');
INSERT INTO users VALUES (2, 'Bob', NULL);
INSERT INTO users VALUES (3, 'Carlos', 'carlos@mail.com');
INSERT INTO users VALUES (4, 'Diana', NULL);
INSERT INTO users VALUES (5, 'Eva', 'eva@mail.com');`,
    expectedQuery: `SELECT 
  COUNT(*) as total_users,
  COUNT(email) as users_with_email,
  COUNT(*) - COUNT(email) as users_missing_email
FROM users`,
    expectedResult: [
      [5, 3, 2],
    ],
  },
  // === HAVING vs WHERE ===
  {
    id: 'sql-ax9',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['having', 'where', 'difference'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'WHERE + HAVING juntos',
      en: 'WHERE + HAVING Together',
      pt: 'WHERE + HAVING Juntos'
    },
    description: {
      es: 'Encontrá categorías con ventas promedio > 100, pero solo considerando ventas del 2024.',
      en: 'Find categories with average sales > 100, but only considering 2024 sales.',
      pt: 'Encontre categorias com vendas médias > 100, mas apenas considerando vendas de 2024.'
    },
    theory: {
      es: `**WHERE + HAVING:**

\`\`\`sql
SELECT category, AVG(amount) as avg_sale
FROM sales
WHERE sale_year = 2024       -- Filtra ANTES de agrupar
GROUP BY category
HAVING AVG(amount) > 100;    -- Filtra DESPUÉS de agrupar
\`\`\`

**Orden de ejecución:**
1. FROM
2. WHERE (filtra filas)
3. GROUP BY
4. HAVING (filtra grupos)
5. SELECT
6. ORDER BY`,
      en: `**WHERE + HAVING:**

\`\`\`sql
SELECT category, AVG(amount) as avg_sale
FROM sales
WHERE sale_year = 2024       -- Filters BEFORE grouping
GROUP BY category
HAVING AVG(amount) > 100;    -- Filters AFTER grouping
\`\`\`

**Execution order:**
1. FROM
2. WHERE (filters rows)
3. GROUP BY
4. HAVING (filters groups)
5. SELECT
6. ORDER BY`,
      pt: `**WHERE + HAVING:**

\`\`\`sql
SELECT category, AVG(amount) as avg_sale
FROM sales
WHERE sale_year = 2024       -- Filtra ANTES de agrupar
GROUP BY category
HAVING AVG(amount) > 100;    -- Filtra DEPOIS de agrupar
\`\`\`

**Ordem de execução:**
1. FROM
2. WHERE (filtra linhas)
3. GROUP BY
4. HAVING (filtra grupos)
5. SELECT
6. ORDER BY`
    },
    realWorldExample: {
      es: 'Análisis filtrado con umbrales de métricas.',
      en: 'Filtered analysis with metric thresholds.',
      pt: 'Análise filtrada com limiares de métricas.'
    },
    hint: {
      es: 'Usá WHERE para filtrar año, HAVING para filtrar el promedio resultante',
      en: 'Use WHERE to filter year, HAVING to filter resulting average',
      pt: 'Use WHERE para filtrar ano, HAVING para filtrar a média resultante'
    },
    
    schema: `CREATE TABLE sales (id INT, category TEXT, amount REAL, sale_year INT);`,
    sampleData: `INSERT INTO sales VALUES (1, 'Electronics', 150, 2024);
INSERT INTO sales VALUES (2, 'Electronics', 120, 2024);
INSERT INTO sales VALUES (3, 'Clothing', 80, 2024);
INSERT INTO sales VALUES (4, 'Clothing', 90, 2024);
INSERT INTO sales VALUES (5, 'Electronics', 200, 2023);
INSERT INTO sales VALUES (6, 'Furniture', 110, 2024);
INSERT INTO sales VALUES (7, 'Furniture', 130, 2024);`,
    expectedQuery: `SELECT category, AVG(amount) as avg_sales
FROM sales
WHERE sale_year = 2024
GROUP BY category
HAVING AVG(amount) > 100`,
    expectedResult: [
      ['Electronics', 135],
      ['Furniture', 120],
    ],
  },
  // === Porcentajes con agregaciones ===
  {
    id: 'sql-ax10',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['percentage', 'subquery', 'total'],
    interviewFrequency: 'very_high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Calcular porcentaje del total',
      en: 'Calculate Percentage of Total',
      pt: 'Calcular Porcentagem do Total'
    },
    description: {
      es: 'Calculá qué porcentaje representa cada categoría del total de ventas.',
      en: 'Calculate what percentage each category represents of total sales.',
      pt: 'Calcule qual porcentagem cada categoria representa do total de vendas.'
    },
    theory: {
      es: `**Porcentaje del total:**

\`\`\`sql
SELECT 
  category,
  SUM(amount) as category_total,
  ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM sales), 2) as percentage
FROM sales
GROUP BY category;
\`\`\`

**Alternativa con CTE:**
\`\`\`sql
WITH totals AS (
  SELECT SUM(amount) as grand_total FROM sales
)
SELECT 
  category,
  ROUND(SUM(amount) * 100.0 / (SELECT grand_total FROM totals), 2) as pct
FROM sales
GROUP BY category;
\`\`\``,
      en: `**Percentage of total:**

\`\`\`sql
SELECT 
  category,
  SUM(amount) as category_total,
  ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM sales), 2) as percentage
FROM sales
GROUP BY category;
\`\`\`

**Alternative with CTE:**
\`\`\`sql
WITH totals AS (
  SELECT SUM(amount) as grand_total FROM sales
)
SELECT 
  category,
  ROUND(SUM(amount) * 100.0 / (SELECT grand_total FROM totals), 2) as pct
FROM sales
GROUP BY category;
\`\`\``,
      pt: `**Porcentagem do total:**

\`\`\`sql
SELECT 
  category,
  SUM(amount) as category_total,
  ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM sales), 2) as percentage
FROM sales
GROUP BY category;
\`\`\`

**Alternativa com CTE:**
\`\`\`sql
WITH totals AS (
  SELECT SUM(amount) as grand_total FROM sales
)
SELECT 
  category,
  ROUND(SUM(amount) * 100.0 / (SELECT grand_total FROM totals), 2) as pct
FROM sales
GROUP BY category;
\`\`\``
    },
    realWorldExample: {
      es: 'Distribución de ingresos, market share, composición.',
      en: 'Revenue distribution, market share, composition.',
      pt: 'Distribuição de receitas, market share, composição.'
    },
    hint: {
      es: 'Dividí SUM por una subconsulta con el total general',
      en: 'Divide SUM by a subquery with grand total',
      pt: 'Divida SUM por uma subconsulta com o total geral'
    },
    
    schema: `CREATE TABLE sales (id INT, category TEXT, amount REAL);`,
    sampleData: `INSERT INTO sales VALUES (1, 'Electronics', 500);
INSERT INTO sales VALUES (2, 'Clothing', 200);
INSERT INTO sales VALUES (3, 'Electronics', 300);
INSERT INTO sales VALUES (4, 'Furniture', 250);
INSERT INTO sales VALUES (5, 'Clothing', 150);
INSERT INTO sales VALUES (6, 'Electronics', 200);
INSERT INTO sales VALUES (7, 'Furniture', 150);
INSERT INTO sales VALUES (8, 'Clothing', 250);`,
    expectedQuery: `SELECT 
  category,
  SUM(amount) as total,
  ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM sales), 2) as percentage
FROM sales
GROUP BY category
ORDER BY percentage DESC`,
    expectedResult: [
      ['Electronics', 1000, 50.0],
      ['Clothing', 600, 30.0],
      ['Furniture', 400, 20.0],
    ],
  },
  // === TOP N por grupo ===
  {
    id: 'sql-ax11',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['top', 'limit', 'group', 'subquery'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Top 1 por categoría (sin window functions)',
      en: 'Top 1 per Category (without window functions)',
      pt: 'Top 1 por Categoria (sem window functions)'
    },
    description: {
      es: 'Encontrá el producto más caro de cada categoría usando subconsulta.',
      en: 'Find the most expensive product in each category using subquery.',
      pt: 'Encontre o produto mais caro de cada categoria usando subconsulta.'
    },
    theory: {
      es: `**Top 1 por grupo (método clásico):**

\`\`\`sql
SELECT * FROM products p1
WHERE price = (
  SELECT MAX(price) 
  FROM products p2 
  WHERE p2.category = p1.category
);
\`\`\`

**Alternativa con JOIN:**
\`\`\`sql
SELECT p.* 
FROM products p
JOIN (
  SELECT category, MAX(price) as max_price
  FROM products
  GROUP BY category
) m ON p.category = m.category AND p.price = m.max_price;
\`\`\`

**Nota:** Window functions (ROW_NUMBER) es más elegante.`,
      en: `**Top 1 per group (classic method):**

\`\`\`sql
SELECT * FROM products p1
WHERE price = (
  SELECT MAX(price) 
  FROM products p2 
  WHERE p2.category = p1.category
);
\`\`\`

**Alternative with JOIN:**
\`\`\`sql
SELECT p.* 
FROM products p
JOIN (
  SELECT category, MAX(price) as max_price
  FROM products
  GROUP BY category
) m ON p.category = m.category AND p.price = m.max_price;
\`\`\`

**Note:** Window functions (ROW_NUMBER) is more elegant.`,
      pt: `**Top 1 por grupo (método clássico):**

\`\`\`sql
SELECT * FROM products p1
WHERE price = (
  SELECT MAX(price) 
  FROM products p2 
  WHERE p2.category = p1.category
);
\`\`\`

**Alternativa com JOIN:**
\`\`\`sql
SELECT p.* 
FROM products p
JOIN (
  SELECT category, MAX(price) as max_price
  FROM products
  GROUP BY category
) m ON p.category = m.category AND p.price = m.max_price;
\`\`\`

**Nota:** Window functions (ROW_NUMBER) é mais elegante.`
    },
    realWorldExample: {
      es: 'Best sellers por categoría, top performers por equipo.',
      en: 'Best sellers per category, top performers per team.',
      pt: 'Best sellers por categoria, top performers por equipe.'
    },
    hint: {
      es: 'Usá subconsulta correlacionada con MAX(price) WHERE p2.category = p1.category',
      en: 'Use correlated subquery with MAX(price) WHERE p2.category = p1.category',
      pt: 'Use subconsulta correlacionada com MAX(price) WHERE p2.category = p1.category'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, category TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 999);
INSERT INTO products VALUES (2, 'Mouse', 'Electronics', 29);
INSERT INTO products VALUES (3, 'Desk', 'Furniture', 299);
INSERT INTO products VALUES (4, 'Chair', 'Furniture', 149);
INSERT INTO products VALUES (5, 'Shirt', 'Clothing', 49);
INSERT INTO products VALUES (6, 'Pants', 'Clothing', 79);`,
    expectedQuery: `SELECT * FROM products p1
WHERE price = (
  SELECT MAX(price) FROM products p2 WHERE p2.category = p1.category
)`,
    expectedResult: [
      [1, 'Laptop', 'Electronics', 999],
      [3, 'Desk', 'Furniture', 299],
      [6, 'Pants', 'Clothing', 79],
    ],
  },
  // === GROUP_CONCAT / STRING_AGG ===
  {
    id: 'sql-ax12',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['group_concat', 'string_agg', 'concatenate'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'GROUP_CONCAT - Concatenar valores',
      en: 'GROUP_CONCAT - Concatenate Values',
      pt: 'GROUP_CONCAT - Concatenar Valores'
    },
    description: {
      es: 'Listá todos los productos de cada categoría en una sola celda, separados por coma.',
      en: 'List all products in each category in a single cell, comma-separated.',
      pt: 'Liste todos os produtos de cada categoria em uma única célula, separados por vírgula.'
    },
    theory: {
      es: `**GROUP_CONCAT (SQLite/MySQL):**

\`\`\`sql
SELECT 
  category,
  GROUP_CONCAT(name) as products
FROM products
GROUP BY category;
-- 'Electronics' | 'Laptop,Mouse,Monitor'

-- Con separador custom
GROUP_CONCAT(name, ' | ')

-- Con ORDER
GROUP_CONCAT(name ORDER BY name)
\`\`\`

**En PostgreSQL:** \`STRING_AGG(name, ',')\`
**En SQL Server:** \`STRING_AGG(name, ',')\``,
      en: `**GROUP_CONCAT (SQLite/MySQL):**

\`\`\`sql
SELECT 
  category,
  GROUP_CONCAT(name) as products
FROM products
GROUP BY category;
-- 'Electronics' | 'Laptop,Mouse,Monitor'

-- With custom separator
GROUP_CONCAT(name, ' | ')

-- With ORDER
GROUP_CONCAT(name ORDER BY name)
\`\`\`

**In PostgreSQL:** \`STRING_AGG(name, ',')\`
**In SQL Server:** \`STRING_AGG(name, ',')\``,
      pt: `**GROUP_CONCAT (SQLite/MySQL):**

\`\`\`sql
SELECT 
  category,
  GROUP_CONCAT(name) as products
FROM products
GROUP BY category;
-- 'Electronics' | 'Laptop,Mouse,Monitor'

-- Com separador custom
GROUP_CONCAT(name, ' | ')

-- Com ORDER
GROUP_CONCAT(name ORDER BY name)
\`\`\`

**No PostgreSQL:** \`STRING_AGG(name, ',')\`
**No SQL Server:** \`STRING_AGG(name, ',')\``
    },
    realWorldExample: {
      es: 'Listas de tags, emails de grupo, resúmenes.',
      en: 'Tag lists, group emails, summaries.',
      pt: 'Listas de tags, e-mails de grupo, resumos.'
    },
    hint: {
      es: 'Usá GROUP_CONCAT(name) agrupado por category',
      en: 'Use GROUP_CONCAT(name) grouped by category',
      pt: 'Use GROUP_CONCAT(name) agrupado por category'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, category TEXT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 'Electronics');
INSERT INTO products VALUES (2, 'Mouse', 'Electronics');
INSERT INTO products VALUES (3, 'Monitor', 'Electronics');
INSERT INTO products VALUES (4, 'Desk', 'Furniture');
INSERT INTO products VALUES (5, 'Chair', 'Furniture');`,
    expectedQuery: `SELECT category, GROUP_CONCAT(name) as products
FROM products
GROUP BY category`,
    expectedResult: [
      ['Electronics', 'Laptop,Mouse,Monitor'],
      ['Furniture', 'Desk,Chair'],
    ],
  },
];

export default SQL_AGGREGATIONS_EXTENDED;

