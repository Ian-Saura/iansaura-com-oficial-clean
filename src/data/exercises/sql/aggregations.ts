/**
 * SQL Aggregation Exercises
 * COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING
 */

import { SQLExercise } from '../types';

export const SQL_AGGREGATIONS: SQLExercise[] = [
  {
    id: 'sql-a1',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['count', 'aggregate'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'COUNT - Contar filas',
      en: 'COUNT - Count Rows',
      pt: 'COUNT - Contar Linhas'
    },
    description: {
      es: 'Contá cuántos productos hay en total.',
      en: 'Count how many products there are in total.',
      pt: 'Conte quantos produtos existem no total.'
    },
    theory: {
      es: `**COUNT()** cuenta filas.

\`\`\`sql
COUNT(*) -- Todas las filas (incluyendo NULLs)
COUNT(columna) -- Filas donde columna NO es NULL
COUNT(DISTINCT columna) -- Valores únicos
\`\`\`

**Performance:** \`COUNT(*)\` es generalmente más rápido.`,
      en: `**COUNT()** counts rows.

\`\`\`sql
COUNT(*) -- All rows (including NULLs)
COUNT(column) -- Rows where column is NOT NULL
COUNT(DISTINCT column) -- Unique values
\`\`\`

**Performance:** \`COUNT(*)\` is generally faster.`,
      pt: `**COUNT()** conta linhas.

\`\`\`sql
COUNT(*) -- Todas as linhas (incluindo NULLs)
COUNT(coluna) -- Linhas onde coluna NÃO é NULL
COUNT(DISTINCT coluna) -- Valores únicos
\`\`\`

**Performance:** \`COUNT(*)\` é geralmente mais rápido.`
    },
    realWorldExample: {
      es: 'Contar pedidos del día o usuarios activos.',
      en: 'Count daily orders or active users.',
      pt: 'Contar pedidos do dia ou usuários ativos.'
    },
    hint: {
      es: 'Usá COUNT(*)',
      en: 'Use COUNT(*)',
      pt: 'Use COUNT(*)'
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
      INSERT INTO products VALUES (1, 'Laptop', 999.99, 'Electronics');
      INSERT INTO products VALUES (2, 'Mouse', 29.99, 'Electronics');
      INSERT INTO products VALUES (3, 'Desk', 199.99, 'Furniture');
      INSERT INTO products VALUES (4, 'Chair', 149.99, 'Furniture');
      INSERT INTO products VALUES (5, 'Monitor', 299.99, 'Electronics');
    `,
    expectedQuery: 'SELECT COUNT(*) as total FROM products',
    expectedResult: [[5]],
  },
  {
    id: 'sql-a2',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['sum', 'avg', 'min', 'max'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'SUM, AVG, MIN, MAX',
      en: 'SUM, AVG, MIN, MAX',
      pt: 'SUM, AVG, MIN, MAX'
    },
    description: {
      es: 'Calculá el precio promedio, mínimo y máximo de los productos.',
      en: 'Calculate the average, minimum and maximum price of products.',
      pt: 'Calcule o preço médio, mínimo e máximo dos produtos.'
    },
    theory: {
      es: `**Funciones de agregación:**

\`\`\`sql
SUM(columna)   -- Suma total
AVG(columna)   -- Promedio
MIN(columna)   -- Valor mínimo
MAX(columna)   -- Valor máximo
\`\`\`

**Nota:** Todas ignoran NULLs excepto COUNT(*).

**Tip:** Usá \`ROUND(AVG(col), 2)\` para redondear.`,
      en: `**Aggregation functions:**

\`\`\`sql
SUM(column)   -- Total sum
AVG(column)   -- Average
MIN(column)   -- Minimum value
MAX(column)   -- Maximum value
\`\`\`

**Note:** All ignore NULLs except COUNT(*).

**Tip:** Use \`ROUND(AVG(col), 2)\` to round.`,
      pt: `**Funções de agregação:**

\`\`\`sql
SUM(coluna)   -- Soma total
AVG(coluna)   -- Média
MIN(coluna)   -- Valor mínimo
MAX(coluna)   -- Valor máximo
\`\`\`

**Nota:** Todas ignoram NULLs exceto COUNT(*).

**Dica:** Use \`ROUND(AVG(col), 2)\` para arredondar.`
    },
    realWorldExample: {
      es: 'Calcular ticket promedio de ventas.',
      en: 'Calculate average sales ticket.',
      pt: 'Calcular ticket médio de vendas.'
    },
    hint: {
      es: 'Usá AVG(), MIN(), MAX() en un solo SELECT',
      en: 'Use AVG(), MIN(), MAX() in a single SELECT',
      pt: 'Use AVG(), MIN(), MAX() em um único SELECT'
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
      INSERT INTO products VALUES (1, 'Laptop', 999.99, 'Electronics');
      INSERT INTO products VALUES (2, 'Mouse', 29.99, 'Electronics');
      INSERT INTO products VALUES (3, 'Desk', 199.99, 'Furniture');
      INSERT INTO products VALUES (4, 'Chair', 149.99, 'Furniture');
      INSERT INTO products VALUES (5, 'Monitor', 299.99, 'Electronics');
    `,
    expectedQuery: 'SELECT AVG(price) as promedio, MIN(price) as minimo, MAX(price) as maximo FROM products',
    expectedResult: [[335.99, 29.99, 999.99]],
  },
  {
    id: 'sql-a3',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['group by', 'aggregate'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'GROUP BY - Agrupar datos',
      en: 'GROUP BY - Group Data',
      pt: 'GROUP BY - Agrupar Dados'
    },
    description: {
      es: 'Contá cuántos productos hay en cada categoría.',
      en: 'Count how many products are in each category.',
      pt: 'Conte quantos produtos existem em cada categoria.'
    },
    theory: {
      es: `**GROUP BY** agrupa filas con valores iguales.

**Regla de oro:** Toda columna en SELECT debe estar en GROUP BY o ser agregación.

\`\`\`sql
-- ✅ Correcto
SELECT category, COUNT(*) FROM products GROUP BY category;

-- ❌ Error
SELECT category, name, COUNT(*) FROM products GROUP BY category;
\`\`\`

**Orden SQL:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`,
      en: `**GROUP BY** groups rows with equal values.

**Golden rule:** Every column in SELECT must be in GROUP BY or be an aggregation.

\`\`\`sql
-- ✅ Correct
SELECT category, COUNT(*) FROM products GROUP BY category;

-- ❌ Error
SELECT category, name, COUNT(*) FROM products GROUP BY category;
\`\`\`

**SQL order:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`,
      pt: `**GROUP BY** agrupa linhas com valores iguais.

**Regra de ouro:** Toda coluna no SELECT deve estar no GROUP BY ou ser uma agregação.

\`\`\`sql
-- ✅ Correto
SELECT category, COUNT(*) FROM products GROUP BY category;

-- ❌ Erro
SELECT category, name, COUNT(*) FROM products GROUP BY category;
\`\`\`

**Ordem SQL:** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`
    },
    realWorldExample: {
      es: 'Ventas por mes, usuarios por país.',
      en: 'Sales by month, users by country.',
      pt: 'Vendas por mês, usuários por país.'
    },
    hint: {
      es: 'Usá GROUP BY category con COUNT(*)',
      en: 'Use GROUP BY category with COUNT(*)',
      pt: 'Use GROUP BY category com COUNT(*)'
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
      INSERT INTO products VALUES (1, 'Laptop', 999.99, 'Electronics');
      INSERT INTO products VALUES (2, 'Mouse', 29.99, 'Electronics');
      INSERT INTO products VALUES (3, 'Desk', 199.99, 'Furniture');
      INSERT INTO products VALUES (4, 'Chair', 149.99, 'Furniture');
      INSERT INTO products VALUES (5, 'Monitor', 299.99, 'Electronics');
    `,
    expectedQuery: 'SELECT category, COUNT(*) as cantidad FROM products GROUP BY category',
    expectedResult: [
      ['Electronics', 3],
      ['Furniture', 2],
    ],
  },
  {
    id: 'sql-a4',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['having', 'group by', 'filter groups'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'HAVING - Filtrar grupos',
      en: 'HAVING - Filter Groups',
      pt: 'HAVING - Filtrar Grupos'
    },
    description: {
      es: 'Mostrá solo las categorías que tienen más de 2 productos.',
      en: 'Show only categories that have more than 2 products.',
      pt: 'Mostre apenas as categorias que têm mais de 2 produtos.'
    },
    theory: {
      es: `**HAVING** filtra grupos DESPUÉS de GROUP BY.

**Diferencia clave:**
\`\`\`sql
-- WHERE: filtra filas ANTES de agrupar
SELECT category, COUNT(*) 
FROM products 
WHERE price > 50
GROUP BY category;

-- HAVING: filtra grupos DESPUÉS de agrupar
SELECT category, COUNT(*) 
FROM products 
GROUP BY category
HAVING COUNT(*) > 2;
\`\`\``,
      en: `**HAVING** filters groups AFTER GROUP BY.

**Key difference:**
\`\`\`sql
-- WHERE: filters rows BEFORE grouping
SELECT category, COUNT(*) 
FROM products 
WHERE price > 50
GROUP BY category;

-- HAVING: filters groups AFTER grouping
SELECT category, COUNT(*) 
FROM products 
GROUP BY category
HAVING COUNT(*) > 2;
\`\`\``,
      pt: `**HAVING** filtra grupos DEPOIS do GROUP BY.

**Diferença chave:**
\`\`\`sql
-- WHERE: filtra linhas ANTES de agrupar
SELECT category, COUNT(*) 
FROM products 
WHERE price > 50
GROUP BY category;

-- HAVING: filtra grupos DEPOIS de agrupar
SELECT category, COUNT(*) 
FROM products 
GROUP BY category
HAVING COUNT(*) > 2;
\`\`\``
    },
    realWorldExample: {
      es: 'Encontrar categorías con ventas significativas.',
      en: 'Find categories with significant sales.',
      pt: 'Encontrar categorias com vendas significativas.'
    },
    hint: {
      es: 'Usá HAVING COUNT(*) > 2',
      en: 'Use HAVING COUNT(*) > 2',
      pt: 'Use HAVING COUNT(*) > 2'
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
      INSERT INTO products VALUES (1, 'Laptop', 999.99, 'Electronics');
      INSERT INTO products VALUES (2, 'Mouse', 29.99, 'Electronics');
      INSERT INTO products VALUES (3, 'Desk', 199.99, 'Furniture');
      INSERT INTO products VALUES (4, 'Chair', 149.99, 'Furniture');
      INSERT INTO products VALUES (5, 'Monitor', 299.99, 'Electronics');
    `,
    expectedQuery: 'SELECT category, COUNT(*) as cantidad FROM products GROUP BY category HAVING COUNT(*) > 2',
    expectedResult: [
      ['Electronics', 3],
    ],
  },
  {
    id: 'sql-a5',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'aggregations',
    tags: ['group by', 'sum', 'multiple aggregations'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Múltiples agregaciones',
      en: 'Multiple Aggregations',
      pt: 'Múltiplas Agregações'
    },
    description: {
      es: 'Calculá el total de ventas, promedio y cantidad de transacciones por categoría.',
      en: 'Calculate total sales, average and transaction count by category.',
      pt: 'Calcule o total de vendas, média e quantidade de transações por categoria.'
    },
    theory: {
      es: `**Múltiples agregaciones en un SELECT:**

\`\`\`sql
SELECT 
  category,
  COUNT(*) as num_products,
  SUM(price) as total_value,
  AVG(price) as avg_price,
  MIN(price) as min_price,
  MAX(price) as max_price
FROM products
GROUP BY category;
\`\`\`

**Tip:** Usá alias descriptivos para cada agregación.`,
      en: `**Multiple aggregations in one SELECT:**

\`\`\`sql
SELECT 
  category,
  COUNT(*) as num_products,
  SUM(price) as total_value,
  AVG(price) as avg_price,
  MIN(price) as min_price,
  MAX(price) as max_price
FROM products
GROUP BY category;
\`\`\`

**Tip:** Use descriptive aliases for each aggregation.`,
      pt: `**Múltiplas agregações em um SELECT:**

\`\`\`sql
SELECT 
  category,
  COUNT(*) as num_products,
  SUM(price) as total_value,
  AVG(price) as avg_price,
  MIN(price) as min_price,
  MAX(price) as max_price
FROM products
GROUP BY category;
\`\`\`

**Dica:** Use alias descritivos para cada agregação.`
    },
    realWorldExample: {
      es: 'Dashboard de métricas por categoría de producto.',
      en: 'Metrics dashboard by product category.',
      pt: 'Dashboard de métricas por categoria de produto.'
    },
    hint: {
      es: 'Combiná SUM(), AVG(), COUNT() en un GROUP BY',
      en: 'Combine SUM(), AVG(), COUNT() in a GROUP BY',
      pt: 'Combine SUM(), AVG(), COUNT() em um GROUP BY'
    },
    
    schema: `
      CREATE TABLE sales (
        id INTEGER PRIMARY KEY,
        category TEXT,
        amount REAL,
        date TEXT
      );
    `,
    sampleData: `
      INSERT INTO sales VALUES (1, 'Tech', 500, '2024-01-01');
      INSERT INTO sales VALUES (2, 'Tech', 300, '2024-01-02');
      INSERT INTO sales VALUES (3, 'Ropa', 100, '2024-01-01');
      INSERT INTO sales VALUES (4, 'Ropa', 150, '2024-01-02');
      INSERT INTO sales VALUES (5, 'Tech', 400, '2024-01-03');
    `,
    expectedQuery: 'SELECT category, SUM(amount) as total, AVG(amount) as promedio, COUNT(*) as cantidad FROM sales GROUP BY category',
    expectedResult: [
      ['Ropa', 250, 125, 2],
      ['Tech', 1200, 400, 3],
    ],
  },
];

export default SQL_AGGREGATIONS;
