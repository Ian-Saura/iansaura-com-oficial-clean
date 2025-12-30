/**
 * SQL JOINs Extended Exercises
 * More INNER, LEFT, RIGHT, FULL, Self JOINs for Saurio 🦖
 */

import { SQLExercise } from '../types';

export const SQL_JOINS_EXTENDED: SQLExercise[] = [
  // === INNER JOIN con múltiples condiciones ===
  {
    id: 'sql-jx1',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'joins',
    tags: ['inner join', 'multiple conditions', 'and'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'JOIN con múltiples condiciones',
      en: 'JOIN with Multiple Conditions',
      pt: 'JOIN com Múltiplas Condições'
    },
    description: {
      es: 'Uní pedidos con productos solo cuando el producto esté en stock Y el pedido sea del mismo año que el producto se agregó.',
      en: 'Join orders with products only when product is in stock AND order is from the same year product was added.',
      pt: 'Una pedidos com produtos apenas quando o produto estiver em estoque E o pedido for do mesmo ano que o produto foi adicionado.'
    },
    theory: {
      es: `**JOIN con múltiples condiciones:**

\`\`\`sql
SELECT o.*, p.name
FROM orders o
JOIN products p ON 
  o.product_id = p.id 
  AND p.stock > 0
  AND strftime('%Y', o.order_date) = p.year_added;
\`\`\`

**Alternativa con WHERE (equivalente para INNER JOIN):**
\`\`\`sql
SELECT o.*, p.name
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE p.stock > 0 
  AND strftime('%Y', o.order_date) = p.year_added;
\`\`\`

**⚠️ Diferencia:** En LEFT JOIN, condiciones en ON vs WHERE dan resultados diferentes.`,
      en: `**JOIN with multiple conditions:**

\`\`\`sql
SELECT o.*, p.name
FROM orders o
JOIN products p ON 
  o.product_id = p.id 
  AND p.stock > 0
  AND strftime('%Y', o.order_date) = p.year_added;
\`\`\`

**Alternative with WHERE (equivalent for INNER JOIN):**
\`\`\`sql
SELECT o.*, p.name
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE p.stock > 0 
  AND strftime('%Y', o.order_date) = p.year_added;
\`\`\`

**⚠️ Difference:** In LEFT JOIN, conditions in ON vs WHERE give different results.`,
      pt: `**JOIN com múltiplas condições:**

\`\`\`sql
SELECT o.*, p.name
FROM orders o
JOIN products p ON 
  o.product_id = p.id 
  AND p.stock > 0
  AND strftime('%Y', o.order_date) = p.year_added;
\`\`\`

**Alternativa com WHERE (equivalente para INNER JOIN):**
\`\`\`sql
SELECT o.*, p.name
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE p.stock > 0 
  AND strftime('%Y', o.order_date) = p.year_added;
\`\`\`

**⚠️ Diferença:** Em LEFT JOIN, condições em ON vs WHERE dão resultados diferentes.`
    },
    realWorldExample: {
      es: 'Saurio valida complejos al unir tablas.',
      en: 'Saurio validates complex when joining tables.',
      pt: 'Saurio valida complexas ao unir tabelas.'
    },
    hint: {
      es: 'Agregá condiciones adicionales con AND en la cláusula ON',
      en: 'Add additional conditions with AND in the ON clause',
      pt: 'Adicione condições adicionais com AND na cláusula ON'
    },
    
    schema: `CREATE TABLE orders (id INT, product_id INT, order_date TEXT, quantity INT);
CREATE TABLE products (id INT, name TEXT, stock INT, year_added TEXT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 10, '2024');
INSERT INTO products VALUES (2, 'Mouse', 0, '2024');
INSERT INTO products VALUES (3, 'Monitor', 5, '2023');
INSERT INTO orders VALUES (1, 1, '2024-03-15', 2);
INSERT INTO orders VALUES (2, 2, '2024-04-10', 5);
INSERT INTO orders VALUES (3, 3, '2024-02-20', 1);
INSERT INTO orders VALUES (4, 1, '2023-12-01', 1);`,
    expectedQuery: `SELECT o.id as order_id, p.name, o.order_date
FROM orders o
JOIN products p ON o.product_id = p.id 
  AND p.stock > 0 
  AND strftime('%Y', o.order_date) = p.year_added`,
    expectedResult: [
      [1, 'Laptop', '2024-03-15'],
    ],
  },
  // === LEFT JOIN para encontrar faltantes ===
  {
    id: 'sql-jx2',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'joins',
    tags: ['left join', 'null', 'missing'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'LEFT JOIN para encontrar registros sin match',
      en: 'LEFT JOIN to Find Unmatched Records',
      pt: 'LEFT JOIN para Encontrar Registros sem Match'
    },
    description: {
      es: 'Encontrá todos los clientes que NUNCA han hecho un pedido.',
      en: 'Find all customers who have NEVER made an order.',
      pt: 'Encontre todos os clientes que NUNCA fizeram um pedido.'
    },
    theory: {
      es: `**LEFT JOIN + IS NULL para encontrar faltantes:**

\`\`\`sql
-- Clientes sin pedidos
SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
\`\`\`

**¿Por qué funciona?**
- LEFT JOIN trae TODOS los clientes
- Los que no tienen pedidos tienen NULL en columnas de orders
- Filtramos por esos NULLs

**Alternativa con NOT EXISTS:**
\`\`\`sql
SELECT * FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders WHERE customer_id = c.id
);
\`\`\``,
      en: `**LEFT JOIN + IS NULL to find missing:**

\`\`\`sql
-- Customers without orders
SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
\`\`\`

**Why it works:**
- LEFT JOIN brings ALL customers
- Those without orders have NULL in orders columns
- We filter by those NULLs

**Alternative with NOT EXISTS:**
\`\`\`sql
SELECT * FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders WHERE customer_id = c.id
);
\`\`\``,
      pt: `**LEFT JOIN + IS NULL para encontrar faltantes:**

\`\`\`sql
-- Clientes sem pedidos
SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
\`\`\`

**Por que funciona:**
- LEFT JOIN traz TODOS os clientes
- Os que não têm pedidos têm NULL em colunas de orders
- Filtramos por esses NULLs

**Alternativa com NOT EXISTS:**
\`\`\`sql
SELECT * FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders WHERE customer_id = c.id
);
\`\`\``
    },
    realWorldExample: {
      es: 'Usuarios inactivos, productos sin ventas, análisis de gaps.',
      en: 'Inactive users, products without sales, gap analysis.',
      pt: 'Usuários inativos, produtos sem vendas, análise de gaps.'
    },
    hint: {
      es: 'Usá LEFT JOIN y WHERE orders.id IS NULL',
      en: 'Use LEFT JOIN and WHERE orders.id IS NULL',
      pt: 'Use LEFT JOIN e WHERE orders.id IS NULL'
    },
    
    schema: `CREATE TABLE customers (id INT, name TEXT, email TEXT);
CREATE TABLE orders (id INT, customer_id INT, total REAL);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana', 'ana@mail.com');
INSERT INTO customers VALUES (2, 'Bob', 'bob@mail.com');
INSERT INTO customers VALUES (3, 'Carlos', 'carlos@mail.com');
INSERT INTO customers VALUES (4, 'Diana', 'diana@mail.com');
INSERT INTO orders VALUES (1, 1, 100);
INSERT INTO orders VALUES (2, 1, 150);
INSERT INTO orders VALUES (3, 3, 200);`,
    expectedQuery: `SELECT c.*
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL`,
    expectedResult: [
      [2, 'Bob', 'bob@mail.com'],
      [4, 'Diana', 'diana@mail.com'],
    ],
  },
  // === Self JOIN ===
  {
    id: 'sql-jx3',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'joins',
    tags: ['self join', 'hierarchy', 'recursive'],
    interviewFrequency: 'very_high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Self JOIN - Empleados y sus managers',
      en: 'Self JOIN - Employees and Their Managers',
      pt: 'Self JOIN - Funcionários e seus Gerentes'
    },
    description: {
      es: 'Mostrá cada empleado junto con el nombre de su manager.',
      en: 'Show each employee along with their manager name.',
      pt: 'Mostre cada funcionário junto com o nome do seu gerente.'
    },
    theory: {
      es: `**Self JOIN - Unir tabla consigo misma:**

\`\`\`sql
SELECT 
  e.name as employee,
  m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**Casos de uso:**
- Jerarquías (empleado → manager)
- Comparar filas de la misma tabla
- Encontrar duplicados
- Relaciones recursivas

**⚠️ Alias obligatorios:** Necesitás nombres distintos para cada "copia" de la tabla.`,
      en: `**Self JOIN - Join table with itself:**

\`\`\`sql
SELECT 
  e.name as employee,
  m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**Use cases:**
- Hierarchies (employee → manager)
- Compare rows from same table
- Find duplicates
- Recursive relationships

**⚠️ Aliases mandatory:** You need different names for each "copy" of the table.`,
      pt: `**Self JOIN - Unir tabela consigo mesma:**

\`\`\`sql
SELECT 
  e.name as employee,
  m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**Casos de uso:**
- Hierarquias (funcionário → gerente)
- Comparar linhas da mesma tabela
- Encontrar duplicados
- Relações recursivas

**⚠️ Aliases obrigatórios:** Você precisa de nomes diferentes para cada "cópia" da tabela.`
    },
    realWorldExample: {
      es: 'Organigramas, estructuras jerárquicas.',
      en: 'Org charts, hierarchical structures.',
      pt: 'Organogramas, estruturas hierárquicas.'
    },
    hint: {
      es: 'Uní employees consigo misma usando alias e y m',
      en: 'Join employees with itself using aliases e and m',
      pt: 'Una employees consigo mesma usando alias e e m'
    },
    
    schema: `CREATE TABLE employees (id INT, name TEXT, manager_id INT);`,
    sampleData: `INSERT INTO employees VALUES (1, 'CEO Carlos', NULL);
INSERT INTO employees VALUES (2, 'CTO María', 1);
INSERT INTO employees VALUES (3, 'Dev Ana', 2);
INSERT INTO employees VALUES (4, 'Dev Bob', 2);
INSERT INTO employees VALUES (5, 'CFO Pedro', 1);`,
    expectedQuery: `SELECT 
  e.name as employee,
  m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id`,
    expectedResult: [
      ['CEO Carlos', null],
      ['CTO María', 'CEO Carlos'],
      ['Dev Ana', 'CTO María'],
      ['Dev Bob', 'CTO María'],
      ['CFO Pedro', 'CEO Carlos'],
    ],
  },
  // === JOIN con agregación ===
  {
    id: 'sql-jx4',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'joins',
    tags: ['join', 'aggregation', 'groupby'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'JOIN con GROUP BY',
      en: 'JOIN with GROUP BY',
      pt: 'JOIN com GROUP BY'
    },
    description: {
      es: 'Mostrá cada cliente con el total de sus pedidos y cantidad de pedidos.',
      en: 'Show each customer with their total orders amount and order count.',
      pt: 'Mostre cada cliente com o total de seus pedidos e quantidade de pedidos.'
    },
    theory: {
      es: `**JOIN + GROUP BY:**

\`\`\`sql
SELECT 
  c.name,
  COUNT(o.id) as order_count,
  COALESCE(SUM(o.total), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
\`\`\`

**Tip:** Usá LEFT JOIN para incluir clientes sin pedidos.
**Tip:** COALESCE maneja los NULL de clientes sin pedidos.`,
      en: `**JOIN + GROUP BY:**

\`\`\`sql
SELECT 
  c.name,
  COUNT(o.id) as order_count,
  COALESCE(SUM(o.total), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
\`\`\`

**Tip:** Use LEFT JOIN to include customers without orders.
**Tip:** COALESCE handles NULLs from customers without orders.`,
      pt: `**JOIN + GROUP BY:**

\`\`\`sql
SELECT 
  c.name,
  COUNT(o.id) as order_count,
  COALESCE(SUM(o.total), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
\`\`\`

**Dica:** Use LEFT JOIN para incluir clientes sem pedidos.
**Dica:** COALESCE trata os NULLs de clientes sem pedidos.`
    },
    realWorldExample: {
      es: 'Reportes de clientes, análisis de ventas.',
      en: 'Customer reports, sales analysis.',
      pt: 'Relatórios de clientes, análise de vendas.'
    },
    hint: {
      es: 'Usá LEFT JOIN, COUNT y SUM con GROUP BY',
      en: 'Use LEFT JOIN, COUNT and SUM with GROUP BY',
      pt: 'Use LEFT JOIN, COUNT e SUM com GROUP BY'
    },
    
    schema: `CREATE TABLE customers (id INT, name TEXT);
CREATE TABLE orders (id INT, customer_id INT, total REAL);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana');
INSERT INTO customers VALUES (2, 'Bob');
INSERT INTO customers VALUES (3, 'Carlos');
INSERT INTO orders VALUES (1, 1, 100);
INSERT INTO orders VALUES (2, 1, 150);
INSERT INTO orders VALUES (3, 3, 200);
INSERT INTO orders VALUES (4, 3, 50);`,
    expectedQuery: `SELECT 
  c.name,
  COUNT(o.id) as order_count,
  COALESCE(SUM(o.total), 0) as total_spent
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name`,
    expectedResult: [
      ['Ana', 2, 250],
      ['Bob', 0, 0],
      ['Carlos', 2, 250],
    ],
  },
  // === CROSS JOIN ===
  {
    id: 'sql-jx5',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'joins',
    tags: ['cross join', 'cartesian', 'combinations'],
    interviewFrequency: 'medium',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'CROSS JOIN - Producto cartesiano',
      en: 'CROSS JOIN - Cartesian Product',
      pt: 'CROSS JOIN - Produto Cartesiano'
    },
    description: {
      es: 'Generá todas las combinaciones posibles de colores y tallas para productos.',
      en: 'Generate all possible combinations of colors and sizes for products.',
      pt: 'Gere todas as combinações possíveis de cores e tamanhos para produtos.'
    },
    theory: {
      es: `**CROSS JOIN - Todas las combinaciones:**

\`\`\`sql
-- 3 colores × 4 tallas = 12 combinaciones
SELECT c.color, s.size
FROM colors c
CROSS JOIN sizes s;
\`\`\`

**Sintaxis alternativa:**
\`\`\`sql
SELECT * FROM colors, sizes;  -- Implícito
\`\`\`

**⚠️ Cuidado:** El resultado crece exponencialmente.
- 100 × 100 = 10,000 filas
- 1000 × 1000 = 1,000,000 filas`,
      en: `**CROSS JOIN - All combinations:**

\`\`\`sql
-- 3 colors × 4 sizes = 12 combinations
SELECT c.color, s.size
FROM colors c
CROSS JOIN sizes s;
\`\`\`

**Alternative syntax:**
\`\`\`sql
SELECT * FROM colors, sizes;  -- Implicit
\`\`\`

**⚠️ Warning:** Result grows exponentially.
- 100 × 100 = 10,000 rows
- 1000 × 1000 = 1,000,000 rows`,
      pt: `**CROSS JOIN - Todas as combinações:**

\`\`\`sql
-- 3 cores × 4 tamanhos = 12 combinações
SELECT c.color, s.size
FROM colors c
CROSS JOIN sizes s;
\`\`\`

**Sintaxe alternativa:**
\`\`\`sql
SELECT * FROM colors, sizes;  -- Implícito
\`\`\`

**⚠️ Cuidado:** O resultado cresce exponencialmente.
- 100 × 100 = 10,000 linhas
- 1000 × 1000 = 1,000,000 linhas`
    },
    realWorldExample: {
      es: 'Generar SKUs, matrices de test, calendarios.',
      en: 'Generate SKUs, test matrices, calendars.',
      pt: 'Gerar SKUs, matrizes de teste, calendários.'
    },
    hint: {
      es: 'Usá CROSS JOIN sin condición ON',
      en: 'Use CROSS JOIN without ON condition',
      pt: 'Use CROSS JOIN sem condição ON'
    },
    
    schema: `CREATE TABLE colors (id INT, color TEXT);
CREATE TABLE sizes (id INT, size TEXT);`,
    sampleData: `INSERT INTO colors VALUES (1, 'Red');
INSERT INTO colors VALUES (2, 'Blue');
INSERT INTO colors VALUES (3, 'Green');
INSERT INTO sizes VALUES (1, 'S');
INSERT INTO sizes VALUES (2, 'M');
INSERT INTO sizes VALUES (3, 'L');`,
    expectedQuery: `SELECT c.color, s.size
FROM colors c
CROSS JOIN sizes s
ORDER BY c.color, s.size`,
    expectedResult: [
      ['Blue', 'L'],
      ['Blue', 'M'],
      ['Blue', 'S'],
      ['Green', 'L'],
      ['Green', 'M'],
      ['Green', 'S'],
      ['Red', 'L'],
      ['Red', 'M'],
      ['Red', 'S'],
    ],
  },
  // === JOIN 3 tablas ===
  {
    id: 'sql-jx6',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'joins',
    tags: ['multiple joins', 'three tables'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'JOIN de 3 tablas',
      en: 'JOIN of 3 Tables',
      pt: 'JOIN de 3 Tabelas'
    },
    description: {
      es: 'Mostrá el nombre del cliente, producto comprado y categoría del producto.',
      en: 'Show customer name, purchased product and product category.',
      pt: 'Mostre o nome do cliente, produto comprado e categoria do produto.'
    },
    theory: {
      es: `**JOIN múltiple (3+ tablas):**

\`\`\`sql
SELECT 
  c.name as customer,
  p.name as product,
  cat.name as category
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
JOIN categories cat ON p.category_id = cat.id;
\`\`\`

**Orden sugerido:**
1. Empezá con la tabla central (orders)
2. Uní hacia afuera siguiendo las relaciones
3. Usá alias cortos (c, p, o, cat)`,
      en: `**Multiple JOIN (3+ tables):**

\`\`\`sql
SELECT 
  c.name as customer,
  p.name as product,
  cat.name as category
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
JOIN categories cat ON p.category_id = cat.id;
\`\`\`

**Suggested order:**
1. Start with central table (orders)
2. Join outward following relationships
3. Use short aliases (c, p, o, cat)`,
      pt: `**JOIN múltiplo (3+ tabelas):**

\`\`\`sql
SELECT 
  c.name as customer,
  p.name as product,
  cat.name as category
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
JOIN categories cat ON p.category_id = cat.id;
\`\`\`

**Ordem sugerida:**
1. Comece com a tabela central (orders)
2. Una para fora seguindo as relações
3. Use alias curtos (c, p, o, cat)`
    },
    realWorldExample: {
      es: 'Reportes completos con datos de múltiples fuentes.',
      en: 'Complete reports with data from multiple sources.',
      pt: 'Relatórios completos com dados de múltiplas fontes.'
    },
    hint: {
      es: 'Encadená múltiples JOINs uno después del otro',
      en: 'Chain multiple JOINs one after another',
      pt: 'Encadeie múltiplos JOINs um após o outro'
    },
    
    schema: `CREATE TABLE customers (id INT, name TEXT);
CREATE TABLE categories (id INT, name TEXT);
CREATE TABLE products (id INT, name TEXT, category_id INT);
CREATE TABLE orders (id INT, customer_id INT, product_id INT);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana');
INSERT INTO customers VALUES (2, 'Bob');
INSERT INTO categories VALUES (1, 'Electronics');
INSERT INTO categories VALUES (2, 'Clothing');
INSERT INTO products VALUES (1, 'Laptop', 1);
INSERT INTO products VALUES (2, 'Shirt', 2);
INSERT INTO products VALUES (3, 'Phone', 1);
INSERT INTO orders VALUES (1, 1, 1);
INSERT INTO orders VALUES (2, 1, 2);
INSERT INTO orders VALUES (3, 2, 3);`,
    expectedQuery: `SELECT 
  c.name as customer,
  p.name as product,
  cat.name as category
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
JOIN categories cat ON p.category_id = cat.id`,
    expectedResult: [
      ['Ana', 'Laptop', 'Electronics'],
      ['Ana', 'Shirt', 'Clothing'],
      ['Bob', 'Phone', 'Electronics'],
    ],
  },
  // === NATURAL JOIN ===
  {
    id: 'sql-jx7',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'joins',
    tags: ['natural join', 'implicit', 'automatic'],
    interviewFrequency: 'medium',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'USING en JOINs',
      en: 'USING in JOINs',
      pt: 'USING em JOINs'
    },
    description: {
      es: 'Uní órdenes con clientes usando USING cuando las columnas tienen el mismo nombre.',
      en: 'Join orders with customers using USING when columns have the same name.',
      pt: 'Una pedidos com clientes usando USING quando as colunas têm o mesmo nome.'
    },
    theory: {
      es: `**USING - Sintaxis simplificada:**

\`\`\`sql
-- En vez de:
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

-- Podés usar:
SELECT * FROM orders o
JOIN customers c USING (customer_id);
\`\`\`

**Ventajas:**
- Más conciso
- No duplica la columna join en SELECT *

**NATURAL JOIN (automático, no recomendado):**
\`\`\`sql
SELECT * FROM orders NATURAL JOIN customers;
-- Une por TODAS las columnas con mismo nombre (peligroso)
\`\`\``,
      en: `**USING - Simplified syntax:**

\`\`\`sql
-- Instead of:
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

-- You can use:
SELECT * FROM orders o
JOIN customers c USING (customer_id);
\`\`\`

**Advantages:**
- More concise
- Doesn't duplicate join column in SELECT *

**NATURAL JOIN (automatic, not recommended):**
\`\`\`sql
SELECT * FROM orders NATURAL JOIN customers;
-- Joins by ALL columns with same name (dangerous)
\`\`\``,
      pt: `**USING - Sintaxe simplificada:**

\`\`\`sql
-- Em vez de:
SELECT * FROM orders o
JOIN customers c ON o.customer_id = c.customer_id;

-- Você pode usar:
SELECT * FROM orders o
JOIN customers c USING (customer_id);
\`\`\`

**Vantagens:**
- Mais conciso
- Não duplica a coluna join em SELECT *

**NATURAL JOIN (automático, não recomendado):**
\`\`\`sql
SELECT * FROM orders NATURAL JOIN customers;
-- Une por TODAS as colunas com mesmo nome (perigoso)
\`\`\``
    },
    realWorldExample: {
      es: 'Simplificar queries cuando columnas tienen nombres estándar.',
      en: 'Simplify queries when columns have standard names.',
      pt: 'Simplificar queries quando colunas têm nomes padrão.'
    },
    hint: {
      es: 'Usá USING (nombre_columna) cuando ambas tablas tienen la misma columna',
      en: 'Use USING (column_name) when both tables have the same column',
      pt: 'Use USING (nome_coluna) quando ambas tabelas têm a mesma coluna'
    },
    
    schema: `CREATE TABLE customers (customer_id INT, name TEXT);
CREATE TABLE orders (id INT, customer_id INT, total REAL);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana');
INSERT INTO customers VALUES (2, 'Bob');
INSERT INTO orders VALUES (1, 1, 100);
INSERT INTO orders VALUES (2, 1, 150);
INSERT INTO orders VALUES (3, 2, 200);`,
    expectedQuery: `SELECT c.name, o.id as order_id, o.total
FROM orders o
JOIN customers c USING (customer_id)`,
    expectedResult: [
      ['Ana', 1, 100],
      ['Ana', 2, 150],
      ['Bob', 3, 200],
    ],
  },
  // === JOIN con subconsulta ===
  {
    id: 'sql-jx8',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'joins',
    tags: ['join', 'subquery', 'derived table'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'JOIN con subconsulta (derived table)',
      en: 'JOIN with Subquery (derived table)',
      pt: 'JOIN com Subconsulta (derived table)'
    },
    description: {
      es: 'Mostrá cada cliente con su total de compras, uniéndolo con una subconsulta de totales.',
      en: 'Show each customer with their purchase total, joining with a totals subquery.',
      pt: 'Mostre cada cliente com seu total de compras, unindo com uma subconsulta de totais.'
    },
    theory: {
      es: `**JOIN con derived table (subconsulta):**

\`\`\`sql
SELECT c.name, t.total_spent
FROM customers c
LEFT JOIN (
  SELECT customer_id, SUM(total) as total_spent
  FROM orders
  GROUP BY customer_id
) t ON c.id = t.customer_id;
\`\`\`

**Ventajas:**
- Pre-agregar datos antes del JOIN
- Mejor performance en algunos casos
- Código más organizado

**Nota:** La subconsulta DEBE tener un alias (t en este caso).`,
      en: `**JOIN with derived table (subquery):**

\`\`\`sql
SELECT c.name, t.total_spent
FROM customers c
LEFT JOIN (
  SELECT customer_id, SUM(total) as total_spent
  FROM orders
  GROUP BY customer_id
) t ON c.id = t.customer_id;
\`\`\`

**Advantages:**
- Pre-aggregate data before JOIN
- Better performance in some cases
- More organized code

**Note:** Subquery MUST have an alias (t in this case).`,
      pt: `**JOIN com derived table (subconsulta):**

\`\`\`sql
SELECT c.name, t.total_spent
FROM customers c
LEFT JOIN (
  SELECT customer_id, SUM(total) as total_spent
  FROM orders
  GROUP BY customer_id
) t ON c.id = t.customer_id;
\`\`\`

**Vantagens:**
- Pré-agregar dados antes do JOIN
- Melhor performance em alguns casos
- Código mais organizado

**Nota:** A subconsulta DEVE ter um alias (t neste caso).`
    },
    realWorldExample: {
      es: 'Reportes complejos, combinación de agregados.',
      en: 'Complex reports, combining aggregates.',
      pt: 'Relatórios complexos, combinação de agregados.'
    },
    hint: {
      es: 'Creá una subconsulta con GROUP BY y dale un alias para hacer JOIN',
      en: 'Create a subquery with GROUP BY and give it an alias for JOIN',
      pt: 'Crie uma subconsulta com GROUP BY e dê um alias para fazer JOIN'
    },
    
    schema: `CREATE TABLE customers (id INT, name TEXT);
CREATE TABLE orders (id INT, customer_id INT, total REAL);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana');
INSERT INTO customers VALUES (2, 'Bob');
INSERT INTO customers VALUES (3, 'Carlos');
INSERT INTO orders VALUES (1, 1, 100);
INSERT INTO orders VALUES (2, 1, 150);
INSERT INTO orders VALUES (3, 2, 200);`,
    expectedQuery: `SELECT c.name, COALESCE(t.total_spent, 0) as total_spent
FROM customers c
LEFT JOIN (
  SELECT customer_id, SUM(total) as total_spent
  FROM orders
  GROUP BY customer_id
) t ON c.id = t.customer_id`,
    expectedResult: [
      ['Ana', 250],
      ['Bob', 200],
      ['Carlos', 0],
    ],
  },
  // === EXCLUSIVE JOIN (XOR) ===
  {
    id: 'sql-jx9',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'joins',
    tags: ['exclusive', 'xor', 'mismatch'],
    interviewFrequency: 'medium',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Encontrar diferencias entre dos tablas',
      en: 'Find Differences Between Two Tables',
      pt: 'Encontrar Diferenças Entre Duas Tabelas'
    },
    description: {
      es: 'Encontrá emails que están en la lista de marketing PERO NO en clientes, o viceversa.',
      en: 'Find emails that are in marketing list BUT NOT in customers, or vice versa.',
      pt: 'Encontre e-mails que estão na lista de marketing MAS NÃO em clientes, ou vice-versa.'
    },
    theory: {
      es: `**Encontrar diferencias (FULL OUTER JOIN exclusivo):**

\`\`\`sql
SELECT 
  COALESCE(m.email, c.email) as email,
  CASE 
    WHEN c.email IS NULL THEN 'Solo en marketing'
    WHEN m.email IS NULL THEN 'Solo en clientes'
  END as status
FROM marketing_list m
FULL OUTER JOIN customers c ON m.email = c.email
WHERE m.email IS NULL OR c.email IS NULL;
\`\`\`

**En SQLite (sin FULL OUTER):**
\`\`\`sql
-- LEFT JOIN + WHERE IS NULL
UNION
-- RIGHT JOIN + WHERE IS NULL (simulado)
\`\`\``,
      en: `**Find differences (exclusive FULL OUTER JOIN):**

\`\`\`sql
SELECT 
  COALESCE(m.email, c.email) as email,
  CASE 
    WHEN c.email IS NULL THEN 'Only in marketing'
    WHEN m.email IS NULL THEN 'Only in customers'
  END as status
FROM marketing_list m
FULL OUTER JOIN customers c ON m.email = c.email
WHERE m.email IS NULL OR c.email IS NULL;
\`\`\`

**In SQLite (no FULL OUTER):**
\`\`\`sql
-- LEFT JOIN + WHERE IS NULL
UNION
-- RIGHT JOIN + WHERE IS NULL (simulated)
\`\`\``,
      pt: `**Encontrar diferenças (FULL OUTER JOIN exclusivo):**

\`\`\`sql
SELECT 
  COALESCE(m.email, c.email) as email,
  CASE 
    WHEN c.email IS NULL THEN 'Só em marketing'
    WHEN m.email IS NULL THEN 'Só em clientes'
  END as status
FROM marketing_list m
FULL OUTER JOIN customers c ON m.email = c.email
WHERE m.email IS NULL OR c.email IS NULL;
\`\`\`

**No SQLite (sem FULL OUTER):**
\`\`\`sql
-- LEFT JOIN + WHERE IS NULL
UNION
-- RIGHT JOIN + WHERE IS NULL (simulado)
\`\`\``
    },
    realWorldExample: {
      es: 'Auditorías, sincronización de datos, reconciliación.',
      en: 'Audits, data synchronization, reconciliation.',
      pt: 'Auditorias, sincronização de dados, reconciliação.'
    },
    hint: {
      es: 'Usá UNION de dos LEFT JOINs con WHERE IS NULL',
      en: 'Use UNION of two LEFT JOINs with WHERE IS NULL',
      pt: 'Use UNION de dois LEFT JOINs com WHERE IS NULL'
    },
    
    schema: `CREATE TABLE marketing_list (id INT, email TEXT);
CREATE TABLE customers (id INT, email TEXT);`,
    sampleData: `INSERT INTO marketing_list VALUES (1, 'ana@mail.com');
INSERT INTO marketing_list VALUES (2, 'bob@mail.com');
INSERT INTO marketing_list VALUES (3, 'marketing@mail.com');
INSERT INTO customers VALUES (1, 'ana@mail.com');
INSERT INTO customers VALUES (2, 'bob@mail.com');
INSERT INTO customers VALUES (3, 'carlos@mail.com');`,
    expectedQuery: `SELECT m.email, 'Solo marketing' as source
FROM marketing_list m
LEFT JOIN customers c ON m.email = c.email
WHERE c.email IS NULL
UNION
SELECT c.email, 'Solo clientes' as source
FROM customers c
LEFT JOIN marketing_list m ON c.email = m.email
WHERE m.email IS NULL`,
    expectedResult: [
      ['carlos@mail.com', 'Solo clientes'],
      ['marketing@mail.com', 'Solo marketing'],
    ],
  },
  // === Comparar versiones (Self JOIN temporal) ===
  {
    id: 'sql-jx10',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'joins',
    tags: ['self join', 'temporal', 'comparison'],
    interviewFrequency: 'high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Self JOIN para comparar registros consecutivos',
      en: 'Self JOIN to Compare Consecutive Records',
      pt: 'Self JOIN para Comparar Registros Consecutivos'
    },
    description: {
      es: 'Mostrá el precio actual y anterior de cada producto para detectar cambios.',
      en: 'Show current and previous price for each product to detect changes.',
      pt: 'Mostre o preço atual e anterior de cada produto para detectar mudanças.'
    },
    theory: {
      es: `**Self JOIN para comparar versiones:**

\`\`\`sql
SELECT 
  p1.product_id,
  p1.price as current_price,
  p2.price as previous_price,
  p1.price - p2.price as change
FROM price_history p1
LEFT JOIN price_history p2 
  ON p1.product_id = p2.product_id 
  AND p1.version = p2.version + 1
WHERE p1.version = (
  SELECT MAX(version) FROM price_history 
  WHERE product_id = p1.product_id
);
\`\`\`

**Alternativa más elegante:** Window functions (LAG).`,
      en: `**Self JOIN to compare versions:**

\`\`\`sql
SELECT 
  p1.product_id,
  p1.price as current_price,
  p2.price as previous_price,
  p1.price - p2.price as change
FROM price_history p1
LEFT JOIN price_history p2 
  ON p1.product_id = p2.product_id 
  AND p1.version = p2.version + 1
WHERE p1.version = (
  SELECT MAX(version) FROM price_history 
  WHERE product_id = p1.product_id
);
\`\`\`

**More elegant alternative:** Window functions (LAG).`,
      pt: `**Self JOIN para comparar versões:**

\`\`\`sql
SELECT 
  p1.product_id,
  p1.price as current_price,
  p2.price as previous_price,
  p1.price - p2.price as change
FROM price_history p1
LEFT JOIN price_history p2 
  ON p1.product_id = p2.product_id 
  AND p1.version = p2.version + 1
WHERE p1.version = (
  SELECT MAX(version) FROM price_history 
  WHERE product_id = p1.product_id
);
\`\`\`

**Alternativa mais elegante:** Window functions (LAG).`
    },
    realWorldExample: {
      es: 'Auditoría de cambios, tracking de precios, versionado.',
      en: 'Change auditing, price tracking, versioning.',
      pt: 'Auditoria de mudanças, tracking de preços, versionamento.'
    },
    hint: {
      es: 'Uní la tabla consigo misma con version = version + 1',
      en: 'Join table with itself where version = version + 1',
      pt: 'Una a tabela consigo mesma onde version = version + 1'
    },
    
    schema: `CREATE TABLE price_history (id INT, product_name TEXT, price REAL, version INT);`,
    sampleData: `INSERT INTO price_history VALUES (1, 'Laptop', 900, 1);
INSERT INTO price_history VALUES (2, 'Laptop', 950, 2);
INSERT INTO price_history VALUES (3, 'Laptop', 999, 3);
INSERT INTO price_history VALUES (4, 'Mouse', 25, 1);
INSERT INTO price_history VALUES (5, 'Mouse', 29, 2);`,
    expectedQuery: `SELECT 
  p1.product_name,
  p1.price as current_price,
  p2.price as previous_price,
  p1.price - COALESCE(p2.price, p1.price) as price_change
FROM price_history p1
LEFT JOIN price_history p2 
  ON p1.product_name = p2.product_name 
  AND p1.version = p2.version + 1
WHERE p1.version = (
  SELECT MAX(version) FROM price_history ph 
  WHERE ph.product_name = p1.product_name
)`,
    expectedResult: [
      ['Laptop', 999, 950, 49],
      ['Mouse', 29, 25, 4],
    ],
  },
];

export default SQL_JOINS_EXTENDED;

