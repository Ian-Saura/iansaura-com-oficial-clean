/**
 * SQL Advanced Exercises
 * CTEs, Subqueries, Interview patterns
 */

import { SQLExercise } from '../types';

export const SQL_ADVANCED: SQLExercise[] = [
  // === CTEs ===
  {
    id: 'sql-cte-1',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'subqueries',
    tags: ['cte', 'with', 'common table expression'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'CTE Básico',
      en: 'Basic CTE',
      pt: 'CTE Básico'
    },
    description: {
      es: 'Usá un CTE para encontrar categorías con ventas totales mayores a 500.',
      en: 'Use a CTE to find categories with total sales greater than 500.',
      pt: 'Use uma CTE para encontrar categorias com vendas totais maiores que 500.'
    },
    theory: {
      es: `**CTE (Common Table Expression)** es una subconsulta nombrada.

\`\`\`sql
WITH nombre_cte AS (
  SELECT ...
)
SELECT * FROM nombre_cte WHERE ...;
\`\`\`

**Ventajas:**
- Más legible que subconsultas anidadas
- Reutilizable en la misma query
- Facilita debugging`,
      en: `**CTE (Common Table Expression)** is a named subquery.

\`\`\`sql
WITH cte_name AS (
  SELECT ...
)
SELECT * FROM cte_name WHERE ...;
\`\`\`

**Advantages:**
- More readable than nested subqueries
- Reusable in the same query
- Easier debugging`,
      pt: `**CTE (Common Table Expression)** é uma subconsulta nomeada.

\`\`\`sql
WITH nome_cte AS (
  SELECT ...
)
SELECT * FROM nome_cte WHERE ...;
\`\`\`

**Vantagens:**
- Mais legível que subconsultas aninhadas
- Reutilizável na mesma query
- Facilita o debugging`
    },
    realWorldExample: {
      es: 'Queries complejas con múltiples pasos de cálculo.',
      en: 'Complex queries with multiple calculation steps.',
      pt: 'Queries complexas com múltiplos passos de cálculo.'
    },
    hint: {
      es: 'Usá WITH ventas_categoria AS (...)',
      en: 'Use WITH category_sales AS (...)',
      pt: 'Use WITH vendas_categoria AS (...)'
    },
    
    schema: `
      CREATE TABLE sales (
        id INTEGER PRIMARY KEY,
        category TEXT,
        amount REAL
      );
    `,
    sampleData: `
      INSERT INTO sales VALUES (1, 'Tech', 300);
      INSERT INTO sales VALUES (2, 'Tech', 400);
      INSERT INTO sales VALUES (3, 'Ropa', 150);
      INSERT INTO sales VALUES (4, 'Ropa', 200);
      INSERT INTO sales VALUES (5, 'Tech', 250);
    `,
    expectedQuery: `WITH ventas_categoria AS (
      SELECT category, SUM(amount) as total
      FROM sales
      GROUP BY category
    )
    SELECT * FROM ventas_categoria WHERE total > 500`,
    expectedResult: [
      ['Tech', 950],
    ],
  },
  {
    id: 'sql-cte-2',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'subqueries',
    tags: ['cte', 'multiple ctes'],
    interviewFrequency: 'high',
    xpReward: 45,
    coinsReward: 20,
    
    title: {
      es: 'CTEs Múltiples',
      en: 'Multiple CTEs',
      pt: 'Múltiplas CTEs'
    },
    description: {
      es: 'Usá múltiples CTEs para comparar ventas por categoría con el promedio general.',
      en: 'Use multiple CTEs to compare sales by category with the overall average.',
      pt: 'Use múltiplas CTEs para comparar vendas por categoria com a média geral.'
    },
    theory: {
      es: `**Múltiples CTEs:**

\`\`\`sql
WITH 
cte1 AS (SELECT ...),
cte2 AS (SELECT ... FROM cte1)
SELECT * FROM cte2;
\`\`\`

Podés referenciar CTEs anteriores en los siguientes.`,
      en: `**Multiple CTEs:**

\`\`\`sql
WITH 
cte1 AS (SELECT ...),
cte2 AS (SELECT ... FROM cte1)
SELECT * FROM cte2;
\`\`\`

You can reference previous CTEs in subsequent ones.`,
      pt: `**Múltiplas CTEs:**

\`\`\`sql
WITH 
cte1 AS (SELECT ...),
cte2 AS (SELECT ... FROM cte1)
SELECT * FROM cte2;
\`\`\`

Você pode referenciar CTEs anteriores nas seguintes.`
    },
    realWorldExample: {
      es: 'Comparar métricas de cada grupo con el promedio global.',
      en: 'Compare each group\'s metrics with the global average.',
      pt: 'Comparar métricas de cada grupo com a média global.'
    },
    hint: {
      es: 'Definí un CTE para ventas por categoría y otro para el promedio',
      en: 'Define one CTE for sales by category and another for the average',
      pt: 'Defina uma CTE para vendas por categoria e outra para a média'
    },
    
    schema: `
      CREATE TABLE sales (
        id INTEGER PRIMARY KEY,
        category TEXT,
        amount REAL
      );
    `,
    sampleData: `
      INSERT INTO sales VALUES (1, 'Tech', 500);
      INSERT INTO sales VALUES (2, 'Tech', 400);
      INSERT INTO sales VALUES (3, 'Ropa', 100);
      INSERT INTO sales VALUES (4, 'Ropa', 150);
    `,
    expectedQuery: `WITH 
    ventas_cat AS (SELECT category, SUM(amount) as total FROM sales GROUP BY category),
    promedio AS (SELECT AVG(total) as avg_total FROM ventas_cat)
    SELECT v.category, v.total, p.avg_total FROM ventas_cat v, promedio p`,
    expectedResult: [
      ['Ropa', 250, 575],
      ['Tech', 900, 575],
    ],
  },
  
  // === SUBQUERIES ===
  {
    id: 'sql-sub-1',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'subqueries',
    tags: ['subquery', 'where', 'scalar'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Subconsulta en WHERE',
      en: 'Subquery in WHERE',
      pt: 'Subconsulta no WHERE'
    },
    description: {
      es: 'Encontrá productos con precio mayor al promedio.',
      en: 'Find products with price greater than average.',
      pt: 'Encontre produtos com preço maior que a média.'
    },
    theory: {
      es: `**Subconsulta escalar** devuelve un solo valor:

\`\`\`sql
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

La subconsulta se ejecuta primero y su resultado se usa en la comparación.`,
      en: `**Scalar subquery** returns a single value:

\`\`\`sql
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

The subquery runs first and its result is used in the comparison.`,
      pt: `**Subconsulta escalar** retorna um único valor:

\`\`\`sql
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

A subconsulta é executada primeiro e seu resultado é usado na comparação.`
    },
    realWorldExample: {
      es: 'Encontrar productos premium (por encima del promedio).',
      en: 'Find premium products (above average).',
      pt: 'Encontrar produtos premium (acima da média).'
    },
    hint: {
      es: 'Usá WHERE price > (SELECT AVG(price) FROM products)',
      en: 'Use WHERE price > (SELECT AVG(price) FROM products)',
      pt: 'Use WHERE price > (SELECT AVG(price) FROM products)'
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
      INSERT INTO products VALUES (4, 'Keyboard', 79);
    `,
    expectedQuery: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)',
    expectedResult: [
      [1, 'Laptop', 999],
      [3, 'Monitor', 299],
    ],
  },
  {
    id: 'sql-sub-2',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'subqueries',
    tags: ['subquery', 'in', 'list'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Subconsulta con IN',
      en: 'Subquery with IN',
      pt: 'Subconsulta com IN'
    },
    description: {
      es: 'Encontrá clientes que hayan hecho al menos una compra.',
      en: 'Find customers who have made at least one purchase.',
      pt: 'Encontre clientes que tenham feito pelo menos uma compra.'
    },
    theory: {
      es: `**Subconsulta con IN** para verificar pertenencia:

\`\`\`sql
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);
\`\`\`

Útil cuando la subconsulta devuelve múltiples valores.`,
      en: `**Subquery with IN** to check membership:

\`\`\`sql
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);
\`\`\`

Useful when the subquery returns multiple values.`,
      pt: `**Subconsulta com IN** para verificar pertinência:

\`\`\`sql
SELECT * FROM customers
WHERE id IN (SELECT customer_id FROM orders);
\`\`\`

Útil quando a subconsulta retorna múltiplos valores.`
    },
    realWorldExample: {
      es: 'Segmentar clientes activos vs inactivos.',
      en: 'Segment active vs inactive customers.',
      pt: 'Segmentar clientes ativos vs inativos.'
    },
    hint: {
      es: 'Usá WHERE id IN (SELECT customer_id FROM orders)',
      en: 'Use WHERE id IN (SELECT customer_id FROM orders)',
      pt: 'Use WHERE id IN (SELECT customer_id FROM orders)'
    },
    
    schema: `
      CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
      CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, amount REAL);
    `,
    sampleData: `
      INSERT INTO customers VALUES (1, 'María');
      INSERT INTO customers VALUES (2, 'Juan');
      INSERT INTO customers VALUES (3, 'Ana');
      INSERT INTO orders VALUES (1, 1, 100);
      INSERT INTO orders VALUES (2, 1, 150);
      INSERT INTO orders VALUES (3, 3, 200);
    `,
    expectedQuery: 'SELECT * FROM customers WHERE id IN (SELECT customer_id FROM orders)',
    expectedResult: [
      [1, 'María'],
      [3, 'Ana'],
    ],
  },
  {
    id: 'sql-sub-3',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'subqueries',
    tags: ['subquery', 'exists', 'correlated'],
    interviewFrequency: 'high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Subconsulta con EXISTS',
      en: 'Subquery with EXISTS',
      pt: 'Subconsulta com EXISTS'
    },
    description: {
      es: 'Encontrá clientes que NO hayan hecho ninguna compra.',
      en: 'Find customers who have NOT made any purchase.',
      pt: 'Encontre clientes que NÃO tenham feito nenhuma compra.'
    },
    theory: {
      es: `**EXISTS** verifica si la subconsulta devuelve algún resultado:

\`\`\`sql
-- Clientes CON órdenes
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- Clientes SIN órdenes
SELECT * FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
\`\`\`

EXISTS es más eficiente que IN para subconsultas grandes.`,
      en: `**EXISTS** checks if the subquery returns any results:

\`\`\`sql
-- Customers WITH orders
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- Customers WITHOUT orders
SELECT * FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
\`\`\`

EXISTS is more efficient than IN for large subqueries.`,
      pt: `**EXISTS** verifica se a subconsulta retorna algum resultado:

\`\`\`sql
-- Clientes COM pedidos
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);

-- Clientes SEM pedidos
SELECT * FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
\`\`\`

EXISTS é mais eficiente que IN para subconsultas grandes.`
    },
    realWorldExample: {
      es: 'Encontrar clientes inactivos para campañas de re-engagement.',
      en: 'Find inactive customers for re-engagement campaigns.',
      pt: 'Encontrar clientes inativos para campanhas de reengajamento.'
    },
    hint: {
      es: 'Usá NOT EXISTS con una subconsulta correlacionada',
      en: 'Use NOT EXISTS with a correlated subquery',
      pt: 'Use NOT EXISTS com uma subconsulta correlacionada'
    },
    
    schema: `
      CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
      CREATE TABLE orders (id INTEGER PRIMARY KEY, customer_id INTEGER, amount REAL);
    `,
    sampleData: `
      INSERT INTO customers VALUES (1, 'María');
      INSERT INTO customers VALUES (2, 'Juan');
      INSERT INTO customers VALUES (3, 'Ana');
      INSERT INTO orders VALUES (1, 1, 100);
      INSERT INTO orders VALUES (2, 3, 200);
    `,
    expectedQuery: 'SELECT * FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)',
    expectedResult: [
      [2, 'Juan'],
    ],
  },
  
  // === INTERVIEW PATTERNS ===
  {
    id: 'sql-int-1',
    type: 'sql',
    difficulty: 'expert',
    category: 'sql',
    subcategory: 'advanced',
    tags: ['top n', 'partition', 'interview'],
    interviewFrequency: 'very_high',
    xpReward: 50,
    coinsReward: 25,
    
    title: {
      es: 'Top N por grupo (Clásico de entrevista)',
      en: 'Top N per group (Interview Classic)',
      pt: 'Top N por grupo (Clássico de entrevista)'
    },
    description: {
      es: 'Encontrá los 2 productos más caros de cada categoría.',
      en: 'Find the 2 most expensive products in each category.',
      pt: 'Encontre os 2 produtos mais caros de cada categoria.'
    },
    theory: {
      es: `**Top N por grupo** - Patrón muy común en entrevistas:

\`\`\`sql
WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) as rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 2;
\`\`\`

**Pasos:**
1. Asignar ranking dentro de cada grupo (PARTITION BY)
2. Filtrar por el ranking deseado`,
      en: `**Top N per group** - Very common interview pattern:

\`\`\`sql
WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) as rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 2;
\`\`\`

**Steps:**
1. Assign ranking within each group (PARTITION BY)
2. Filter by desired ranking`,
      pt: `**Top N por grupo** - Padrão muito comum em entrevistas:

\`\`\`sql
WITH ranked AS (
  SELECT *,
    ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) as rn
  FROM products
)
SELECT * FROM ranked WHERE rn <= 2;
\`\`\`

**Passos:**
1. Atribuir ranking dentro de cada grupo (PARTITION BY)
2. Filtrar pelo ranking desejado`
    },
    realWorldExample: {
      es: 'Top 3 vendedores por región, mejores productos por categoría.',
      en: 'Top 3 salespeople per region, best products per category.',
      pt: 'Top 3 vendedores por região, melhores produtos por categoria.'
    },
    hint: {
      es: 'Usá ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)',
      en: 'Use ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)',
      pt: 'Use ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC)'
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
      INSERT INTO products VALUES (6, 'Lamp', 49, 'Furniture');
    `,
    expectedQuery: `WITH ranked AS (
      SELECT *, ROW_NUMBER() OVER (PARTITION BY category ORDER BY price DESC) as rn
      FROM products
    )
    SELECT name, price, category FROM ranked WHERE rn <= 2`,
    expectedResult: [
      ['Desk', 199, 'Furniture'],
      ['Chair', 149, 'Furniture'],
      ['Laptop', 999, 'Tech'],
      ['Monitor', 299, 'Tech'],
    ],
  },
  {
    id: 'sql-int-2',
    type: 'sql',
    difficulty: 'expert',
    category: 'sql',
    subcategory: 'advanced',
    tags: ['consecutive', 'gaps', 'islands'],
    interviewFrequency: 'high',
    xpReward: 50,
    coinsReward: 25,
    
    title: {
      es: 'Detectar valores consecutivos',
      en: 'Detect Consecutive Values',
      pt: 'Detectar Valores Consecutivos'
    },
    description: {
      es: 'Encontrá usuarios con login en días consecutivos (racha).',
      en: 'Find users with login on consecutive days (streak).',
      pt: 'Encontre usuários com login em dias consecutivos (sequência).'
    },
    theory: {
      es: `**Problema de islas y gaps** - Patrón avanzado:

\`\`\`sql
-- Detectar días consecutivos
SELECT user_id,
  login_date,
  login_date - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) as grp
FROM logins;
\`\`\`

La diferencia entre fecha y row_number es constante para días consecutivos.`,
      en: `**Islands and gaps problem** - Advanced pattern:

\`\`\`sql
-- Detect consecutive days
SELECT user_id,
  login_date,
  login_date - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) as grp
FROM logins;
\`\`\`

The difference between date and row_number is constant for consecutive days.`,
      pt: `**Problema de ilhas e lacunas** - Padrão avançado:

\`\`\`sql
-- Detectar dias consecutivos
SELECT user_id,
  login_date,
  login_date - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) as grp
FROM logins;
\`\`\`

A diferença entre a data e o row_number é constante para dias consecutivos.`
    },
    realWorldExample: {
      es: 'Calcular rachas de actividad, detectar patrones de uso.',
      en: 'Calculate activity streaks, detect usage patterns.',
      pt: 'Calcular sequências de atividade, detectar padrões de uso.'
    },
    hint: {
      es: 'Usá LAG() para comparar con el día anterior',
      en: 'Use LAG() to compare with the previous day',
      pt: 'Use LAG() para comparar com o dia anterior'
    },
    
    schema: `
      CREATE TABLE logins (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        login_date TEXT
      );
    `,
    sampleData: `
      INSERT INTO logins VALUES (1, 1, '2024-01-01');
      INSERT INTO logins VALUES (2, 1, '2024-01-02');
      INSERT INTO logins VALUES (3, 1, '2024-01-03');
      INSERT INTO logins VALUES (4, 1, '2024-01-05');
      INSERT INTO logins VALUES (5, 2, '2024-01-01');
    `,
    expectedQuery: `SELECT user_id, login_date, 
      LAG(login_date) OVER (PARTITION BY user_id ORDER BY login_date) as prev_date
    FROM logins`,
    expectedResult: [
      [1, '2024-01-01', null],
      [1, '2024-01-02', '2024-01-01'],
      [1, '2024-01-03', '2024-01-02'],
      [1, '2024-01-05', '2024-01-03'],
      [2, '2024-01-01', null],
    ],
  },
  {
    id: 'sql-int-3',
    type: 'sql',
    difficulty: 'expert',
    category: 'sql',
    subcategory: 'advanced',
    tags: ['pivot', 'case when', 'transpose'],
    interviewFrequency: 'high',
    xpReward: 45,
    coinsReward: 22,
    
    title: {
      es: 'Pivot manual con CASE',
      en: 'Manual Pivot with CASE',
      pt: 'Pivô Manual com CASE'
    },
    description: {
      es: 'Convertí filas a columnas: ventas por mes como columnas.',
      en: 'Convert rows to columns: sales by month as columns.',
      pt: 'Converta linhas em colunas: vendas por mês como colunas.'
    },
    theory: {
      es: `**Pivot manual** cuando la DB no tiene PIVOT nativo:

\`\`\`sql
SELECT 
  product,
  SUM(CASE WHEN month = 'Jan' THEN amount ELSE 0 END) as Jan,
  SUM(CASE WHEN month = 'Feb' THEN amount ELSE 0 END) as Feb,
  SUM(CASE WHEN month = 'Mar' THEN amount ELSE 0 END) as Mar
FROM sales
GROUP BY product;
\`\`\``,
      en: `**Manual pivot** when DB doesn't have native PIVOT:

\`\`\`sql
SELECT 
  product,
  SUM(CASE WHEN month = 'Jan' THEN amount ELSE 0 END) as Jan,
  SUM(CASE WHEN month = 'Feb' THEN amount ELSE 0 END) as Feb,
  SUM(CASE WHEN month = 'Mar' THEN amount ELSE 0 END) as Mar
FROM sales
GROUP BY product;
\`\`\``,
      pt: `**Pivô manual** quando o DB não tem PIVOT nativo:

\`\`\`sql
SELECT 
  product,
  SUM(CASE WHEN month = 'Jan' THEN amount ELSE 0 END) as Jan,
  SUM(CASE WHEN month = 'Feb' THEN amount ELSE 0 END) as Feb,
  SUM(CASE WHEN month = 'Mar' THEN amount ELSE 0 END) as Mar
FROM sales
GROUP BY product;
\`\`\``
    },
    realWorldExample: {
      es: 'Reportes con meses como columnas, comparativas.',
      en: 'Reports with months as columns, comparisons.',
      pt: 'Relatórios com meses como colunas, comparações.'
    },
    hint: {
      es: 'Usá SUM(CASE WHEN month = ... THEN amount ELSE 0 END)',
      en: 'Use SUM(CASE WHEN month = ... THEN amount ELSE 0 END)',
      pt: 'Use SUM(CASE WHEN month = ... THEN amount ELSE 0 END)'
    },
    
    schema: `
      CREATE TABLE sales (
        id INTEGER PRIMARY KEY,
        product TEXT,
        month TEXT,
        amount REAL
      );
    `,
    sampleData: `
      INSERT INTO sales VALUES (1, 'Laptop', 'Jan', 100);
      INSERT INTO sales VALUES (2, 'Laptop', 'Feb', 150);
      INSERT INTO sales VALUES (3, 'Mouse', 'Jan', 50);
      INSERT INTO sales VALUES (4, 'Mouse', 'Feb', 75);
    `,
    expectedQuery: `SELECT 
      product,
      SUM(CASE WHEN month = 'Jan' THEN amount ELSE 0 END) as Jan,
      SUM(CASE WHEN month = 'Feb' THEN amount ELSE 0 END) as Feb
    FROM sales
    GROUP BY product`,
    expectedResult: [
      ['Laptop', 100, 150],
      ['Mouse', 50, 75],
    ],
  },
  {
    id: 'sql-int-4',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'advanced',
    tags: ['self join', 'comparison', 'pairs'],
    interviewFrequency: 'medium',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Encontrar pares (Self Join)',
      en: 'Find Pairs (Self Join)',
      pt: 'Encontrar Pares (Self Join)'
    },
    description: {
      es: 'Encontrá pares de productos con el mismo precio.',
      en: 'Find pairs of products with the same price.',
      pt: 'Encontre pares de produtos com o mesmo preço.'
    },
    theory: {
      es: `**Self Join para comparar filas:**

\`\`\`sql
SELECT a.name, b.name, a.price
FROM products a
JOIN products b ON a.price = b.price AND a.id < b.id;
\`\`\`

\`a.id < b.id\` evita duplicados y auto-comparación.`,
      en: `**Self Join to compare rows:**

\`\`\`sql
SELECT a.name, b.name, a.price
FROM products a
JOIN products b ON a.price = b.price AND a.id < b.id;
\`\`\`

\`a.id < b.id\` avoids duplicates and self-comparison.`,
      pt: `**Self Join para comparar linhas:**

\`\`\`sql
SELECT a.name, b.name, a.price
FROM products a
JOIN products b ON a.price = b.price AND a.id < b.id;
\`\`\`

\`a.id < b.id\` evita duplicatas e autocomparação.`
    },
    realWorldExample: {
      es: 'Encontrar duplicados, productos similares.',
      en: 'Find duplicates, similar products.',
      pt: 'Encontrar duplicatas, produtos similares.'
    },
    hint: {
      es: 'Uní la tabla consigo misma con a.id < b.id',
      en: 'Join the table with itself using a.id < b.id',
      pt: 'Junte a tabela consigo mesma com a.id < b.id'
    },
    
    schema: `
      CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price REAL
      );
    `,
    sampleData: `
      INSERT INTO products VALUES (1, 'Laptop A', 999);
      INSERT INTO products VALUES (2, 'Monitor', 299);
      INSERT INTO products VALUES (3, 'Laptop B', 999);
      INSERT INTO products VALUES (4, 'Keyboard', 79);
    `,
    expectedQuery: 'SELECT a.name, b.name, a.price FROM products a JOIN products b ON a.price = b.price AND a.id < b.id',
    expectedResult: [
      ['Laptop A', 'Laptop B', 999],
    ],
  },
  {
    id: 'sql-int-5',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'advanced',
    tags: ['cumulative', 'running', 'balance'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Balance acumulado',
      en: 'Running Balance',
      pt: 'Balanço Acumulado'
    },
    description: {
      es: 'Calculá el balance acumulado de una cuenta con depósitos y retiros.',
      en: 'Calculate the running balance of an account with deposits and withdrawals.',
      pt: 'Calcule o balanço acumulado de uma conta com depósitos e retiradas.'
    },
    theory: {
      es: `**Balance acumulado con SUM OVER:**

\`\`\`sql
SELECT 
  date,
  type,
  amount,
  SUM(CASE WHEN type = 'deposit' THEN amount ELSE -amount END) 
    OVER (ORDER BY date) as balance
FROM transactions;
\`\`\` `,
      en: `**Running balance with SUM OVER:**

\`\`\`sql
SELECT 
  date,
  type,
  amount,
  SUM(CASE WHEN type = 'deposit' THEN amount ELSE -amount END) 
    OVER (ORDER BY date) as balance
FROM transactions;
\`\`\` `,
      pt: `**Balanço acumulado com SUM OVER:**

\`\`\`sql
SELECT 
  date,
  type,
  amount,
  SUM(CASE WHEN type = 'deposit' THEN amount ELSE -amount END) 
    OVER (ORDER BY date) as balance
FROM transactions;
\`\`\` `
    },
    realWorldExample: {
      es: 'Estados de cuenta bancarios, inventario.',
      en: 'Bank statements, inventory tracking.',
      pt: 'Extratos bancários, rastreamento de inventário.'
    },
    hint: {
      es: 'Usá CASE para convertir retiros a negativos, luego SUM OVER',
      en: 'Use CASE to convert withdrawals to negative, then SUM OVER',
      pt: 'Use CASE para converter retiradas em negativos, depois SUM OVER'
    },
    
    schema: `
      CREATE TABLE transactions (
        id INTEGER PRIMARY KEY,
        date TEXT,
        type TEXT,
        amount REAL
      );
    `,
    sampleData: `
      INSERT INTO transactions VALUES (1, '2024-01-01', 'deposit', 1000);
      INSERT INTO transactions VALUES (2, '2024-01-02', 'withdrawal', 200);
      INSERT INTO transactions VALUES (3, '2024-01-03', 'deposit', 500);
      INSERT INTO transactions VALUES (4, '2024-01-04', 'withdrawal', 300);
    `,
    expectedQuery: `SELECT date, type, amount,
      SUM(CASE WHEN type = 'deposit' THEN amount ELSE -amount END) OVER (ORDER BY date) as balance
    FROM transactions`,
    expectedResult: [
      ['2024-01-01', 'deposit', 1000, 1000],
      ['2024-01-02', 'withdrawal', 200, 800],
      ['2024-01-03', 'deposit', 500, 1300],
      ['2024-01-04', 'withdrawal', 300, 1000],
    ],
  },
];

export default SQL_ADVANCED;
