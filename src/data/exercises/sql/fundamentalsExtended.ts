/**
 * SQL Fundamentals Extended Exercises
 * More SELECT, WHERE, ORDER BY, LIMIT exercises for Saurio 🦖
 */

import { SQLExercise } from '../types';

export const SQL_FUNDAMENTALS_EXTENDED: SQLExercise[] = [
  // === CASE WHEN ===
  {
    id: 'sql-fx1',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['case', 'when', 'conditional'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'CASE WHEN - Lógica condicional',
      en: 'CASE WHEN - Conditional Logic',
      pt: 'CASE WHEN - Lógica Condicional'
    },
    description: {
      es: 'Clasificá productos por rango de precio: "Premium" (>500), "Standard" (100-500), "Budget" (<100).',
      en: 'Classify products by price range: "Premium" (>500), "Standard" (100-500), "Budget" (<100).',
      pt: 'Classifique produtos por faixa de preço: "Premium" (>500), "Standard" (100-500), "Budget" (<100).'
    },
    theory: {
      es: `**CASE WHEN** - El IF de SQL:

\`\`\`sql
SELECT 
  nombre,
  precio,
  CASE 
    WHEN precio > 500 THEN 'Premium'
    WHEN precio >= 100 THEN 'Standard'
    ELSE 'Budget'
  END AS categoria
FROM productos;
\`\`\`

**Sintaxis:**
- \`CASE WHEN condición THEN valor\`
- \`ELSE valor_default\`
- \`END\` cierra el CASE

**Tip:** El orden importa, se evalúan secuencialmente.`,
      en: `**CASE WHEN** - SQL's IF:

\`\`\`sql
SELECT 
  name,
  price,
  CASE 
    WHEN price > 500 THEN 'Premium'
    WHEN price >= 100 THEN 'Standard'
    ELSE 'Budget'
  END AS category
FROM products;
\`\`\`

**Syntax:**
- \`CASE WHEN condition THEN value\`
- \`ELSE default_value\`
- \`END\` closes the CASE

**Tip:** Order matters, conditions are evaluated sequentially.`,
      pt: `**CASE WHEN** - O IF do SQL:

\`\`\`sql
SELECT 
  nome,
  preco,
  CASE 
    WHEN preco > 500 THEN 'Premium'
    WHEN preco >= 100 THEN 'Standard'
    ELSE 'Budget'
  END AS categoria
FROM produtos;
\`\`\`

**Sintaxe:**
- \`CASE WHEN condição THEN valor\`
- \`ELSE valor_default\`
- \`END\` fecha o CASE

**Dica:** A ordem importa, são avaliados sequencialmente.`
    },
    realWorldExample: {
      es: 'Saurio categoriza productos en su tienda: segmentación, niveles de riesgo, etiquetas dinámicas.',
      en: 'Saurio categorizes products in his store: segmentation, risk levels, dynamic labels.',
      pt: 'Saurio categoriza produtos em sua loja: segmentação, níveis de risco, rótulos dinâmicos.'
    },
    hint: {
      es: 'Usá CASE WHEN ... THEN ... ELSE ... END AS nombre_columna',
      en: 'Use CASE WHEN ... THEN ... ELSE ... END AS column_name',
      pt: 'Use CASE WHEN ... THEN ... ELSE ... END AS nome_coluna'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 999);
INSERT INTO products VALUES (2, 'Mouse', 29);
INSERT INTO products VALUES (3, 'Monitor', 349);
INSERT INTO products VALUES (4, 'Keyboard', 79);
INSERT INTO products VALUES (5, 'Webcam', 149);`,
    expectedQuery: `SELECT name, price,
  CASE 
    WHEN price > 500 THEN 'Premium'
    WHEN price >= 100 THEN 'Standard'
    ELSE 'Budget'
  END AS price_category
FROM products`,
    expectedResult: [
      ['Laptop', 999, 'Premium'],
      ['Mouse', 29, 'Budget'],
      ['Monitor', 349, 'Standard'],
      ['Keyboard', 79, 'Budget'],
      ['Webcam', 149, 'Standard'],
    ],
  },
  // === COALESCE ===
  {
    id: 'sql-fx2',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['coalesce', 'null', 'default'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'COALESCE - Valores por defecto',
      en: 'COALESCE - Default Values',
      pt: 'COALESCE - Valores Padrão'
    },
    description: {
      es: 'Mostrá el apodo de cada usuario, o su nombre si no tiene apodo.',
      en: 'Show each user nickname, or their name if they have no nickname.',
      pt: 'Mostre o apelido de cada usuário, ou seu nome se não tiver apelido.'
    },
    theory: {
      es: `**COALESCE** retorna el primer valor no NULL:

\`\`\`sql
-- Usar apodo, si es NULL usar nombre
SELECT COALESCE(apodo, nombre) AS display_name
FROM usuarios;

-- Múltiples fallbacks
SELECT COALESCE(apodo, nombre, email, 'Anónimo')
FROM usuarios;
\`\`\`

**Alternativas:**
- \`IFNULL(a, b)\` en MySQL
- \`NVL(a, b)\` en Oracle
- \`ISNULL(a, b)\` en SQL Server`,
      en: `**COALESCE** returns the first non-NULL value:

\`\`\`sql
-- Use nickname, if NULL use name
SELECT COALESCE(nickname, name) AS display_name
FROM users;

-- Multiple fallbacks
SELECT COALESCE(nickname, name, email, 'Anonymous')
FROM users;
\`\`\`

**Alternatives:**
- \`IFNULL(a, b)\` in MySQL
- \`NVL(a, b)\` in Oracle
- \`ISNULL(a, b)\` in SQL Server`,
      pt: `**COALESCE** retorna o primeiro valor não NULL:

\`\`\`sql
-- Usar apelido, se for NULL usar nome
SELECT COALESCE(apelido, nome) AS display_name
FROM usuarios;

-- Múltiplos fallbacks
SELECT COALESCE(apelido, nome, email, 'Anônimo')
FROM usuarios;
\`\`\`

**Alternativas:**
- \`IFNULL(a, b)\` no MySQL
- \`NVL(a, b)\` no Oracle
- \`ISNULL(a, b)\` no SQL Server`
    },
    realWorldExample: {
      es: 'Mostrar valores por defecto, manejar datos faltantes.',
      en: 'Show default values, handle missing data.',
      pt: 'Mostrar valores padrão, tratar dados faltantes.'
    },
    hint: {
      es: 'Usá COALESCE(nickname, name) para elegir el primero no NULL',
      en: 'Use COALESCE(nickname, name) to choose first non-NULL',
      pt: 'Use COALESCE(nickname, name) para escolher o primeiro não NULL'
    },
    
    schema: `CREATE TABLE users (id INT, name TEXT, nickname TEXT);`,
    sampleData: `INSERT INTO users VALUES (1, 'Ana García', 'Ani');
INSERT INTO users VALUES (2, 'Roberto Pérez', NULL);
INSERT INTO users VALUES (3, 'María López', 'Mari');
INSERT INTO users VALUES (4, 'Carlos Ruiz', NULL);`,
    expectedQuery: `SELECT name, COALESCE(nickname, name) AS display_name FROM users`,
    expectedResult: [
      ['Ana García', 'Ani'],
      ['Roberto Pérez', 'Roberto Pérez'],
      ['María López', 'Mari'],
      ['Carlos Ruiz', 'Carlos Ruiz'],
    ],
  },
  // === OFFSET ===
  {
    id: 'sql-fx3',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['offset', 'pagination', 'limit'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Paginación con OFFSET',
      en: 'Pagination with OFFSET',
      pt: 'Paginação com OFFSET'
    },
    description: {
      es: 'Obtené la segunda página de productos (productos 4-6, 3 por página).',
      en: 'Get the second page of products (products 4-6, 3 per page).',
      pt: 'Obtenha a segunda página de produtos (produtos 4-6, 3 por página).'
    },
    theory: {
      es: `**Paginación con LIMIT y OFFSET:**

\`\`\`sql
-- Página 1 (items 1-3)
SELECT * FROM products 
ORDER BY id 
LIMIT 3 OFFSET 0;

-- Página 2 (items 4-6)
SELECT * FROM products 
ORDER BY id 
LIMIT 3 OFFSET 3;

-- Fórmula general:
-- OFFSET = (página - 1) * items_por_página
\`\`\`

**⚠️ Importante:** Siempre usá ORDER BY con OFFSET para resultados consistentes.`,
      en: `**Pagination with LIMIT and OFFSET:**

\`\`\`sql
-- Page 1 (items 1-3)
SELECT * FROM products 
ORDER BY id 
LIMIT 3 OFFSET 0;

-- Page 2 (items 4-6)
SELECT * FROM products 
ORDER BY id 
LIMIT 3 OFFSET 3;

-- General formula:
-- OFFSET = (page - 1) * items_per_page
\`\`\`

**⚠️ Important:** Always use ORDER BY with OFFSET for consistent results.`,
      pt: `**Paginação com LIMIT e OFFSET:**

\`\`\`sql
-- Página 1 (itens 1-3)
SELECT * FROM products 
ORDER BY id 
LIMIT 3 OFFSET 0;

-- Página 2 (itens 4-6)
SELECT * FROM products 
ORDER BY id 
LIMIT 3 OFFSET 3;

-- Fórmula geral:
-- OFFSET = (página - 1) * itens_por_página
\`\`\`

**⚠️ Importante:** Sempre use ORDER BY com OFFSET para resultados consistentes.`
    },
    realWorldExample: {
      es: 'Paginación de APIs, listados de productos, feeds.',
      en: 'API pagination, product listings, feeds.',
      pt: 'Paginação de APIs, listagens de produtos, feeds.'
    },
    hint: {
      es: 'Para página 2 con 3 items: LIMIT 3 OFFSET 3',
      en: 'For page 2 with 3 items: LIMIT 3 OFFSET 3',
      pt: 'Para página 2 com 3 itens: LIMIT 3 OFFSET 3'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Product A', 100);
INSERT INTO products VALUES (2, 'Product B', 200);
INSERT INTO products VALUES (3, 'Product C', 150);
INSERT INTO products VALUES (4, 'Product D', 180);
INSERT INTO products VALUES (5, 'Product E', 220);
INSERT INTO products VALUES (6, 'Product F', 90);
INSERT INTO products VALUES (7, 'Product G', 300);`,
    expectedQuery: `SELECT * FROM products ORDER BY id LIMIT 3 OFFSET 3`,
    expectedResult: [
      [4, 'Product D', 180],
      [5, 'Product E', 220],
      [6, 'Product F', 90],
    ],
  },
  // === NOT IN ===
  {
    id: 'sql-fx4',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['not in', 'exclude', 'filter'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'NOT IN - Excluir valores',
      en: 'NOT IN - Exclude Values',
      pt: 'NOT IN - Excluir Valores'
    },
    description: {
      es: 'Encontrá empleados que NO trabajan en HR ni Finance.',
      en: 'Find employees who do NOT work in HR or Finance.',
      pt: 'Encontre funcionários que NÃO trabalham em RH nem Finanças.'
    },
    theory: {
      es: `**NOT IN** excluye valores de una lista:

\`\`\`sql
SELECT * FROM employees 
WHERE department NOT IN ('HR', 'Finance');

-- Equivalente a:
WHERE department <> 'HR' 
  AND department <> 'Finance'
\`\`\`

**⚠️ Cuidado con NULL:**
\`\`\`sql
-- Si la lista contiene NULL, NOT IN puede dar resultados inesperados
WHERE col NOT IN (1, 2, NULL)  -- Puede no retornar nada!
\`\`\``,
      en: `**NOT IN** excludes values from a list:

\`\`\`sql
SELECT * FROM employees 
WHERE department NOT IN ('HR', 'Finance');

-- Equivalent to:
WHERE department <> 'HR' 
  AND department <> 'Finance'
\`\`\`

**⚠️ Careful with NULL:**
\`\`\`sql
-- If list contains NULL, NOT IN may give unexpected results
WHERE col NOT IN (1, 2, NULL)  -- May return nothing!
\`\`\``,
      pt: `**NOT IN** exclui valores de uma lista:

\`\`\`sql
SELECT * FROM employees 
WHERE department NOT IN ('HR', 'Finance');

-- Equivalente a:
WHERE department <> 'HR' 
  AND department <> 'Finance'
\`\`\`

**⚠️ Cuidado com NULL:**
\`\`\`sql
-- Se a lista contiver NULL, NOT IN pode dar resultados inesperados
WHERE col NOT IN (1, 2, NULL)  -- Pode não retornar nada!
\`\`\``
    },
    realWorldExample: {
      es: 'Excluir categorías, estados específicos, listas negras.',
      en: 'Exclude categories, specific statuses, blacklists.',
      pt: 'Excluir categorias, status específicos, listas negras.'
    },
    hint: {
      es: 'Usá NOT IN con los departamentos a excluir',
      en: 'Use NOT IN with departments to exclude',
      pt: 'Use NOT IN com os departamentos a excluir'
    },
    
    schema: `CREATE TABLE employees (id INT, name TEXT, department TEXT, salary REAL);`,
    sampleData: `INSERT INTO employees VALUES (1, 'Ana', 'IT', 60000);
INSERT INTO employees VALUES (2, 'Bob', 'HR', 50000);
INSERT INTO employees VALUES (3, 'Carlos', 'Sales', 55000);
INSERT INTO employees VALUES (4, 'Diana', 'Finance', 65000);
INSERT INTO employees VALUES (5, 'Eva', 'IT', 62000);
INSERT INTO employees VALUES (6, 'Frank', 'Marketing', 52000);`,
    expectedQuery: `SELECT * FROM employees WHERE department NOT IN ('HR', 'Finance')`,
    expectedResult: [
      [1, 'Ana', 'IT', 60000],
      [3, 'Carlos', 'Sales', 55000],
      [5, 'Eva', 'IT', 62000],
      [6, 'Frank', 'Marketing', 52000],
    ],
  },
  // === CAST ===
  {
    id: 'sql-fx5',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['cast', 'convert', 'types'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'CAST - Conversión de tipos',
      en: 'CAST - Type Conversion',
      pt: 'CAST - Conversão de Tipos'
    },
    description: {
      es: 'Convertí el precio a entero y calculá el precio sin decimales.',
      en: 'Convert price to integer and calculate price without decimals.',
      pt: 'Converta o preço para inteiro e calcule o preço sem decimais.'
    },
    theory: {
      es: `**CAST para conversión de tipos:**

\`\`\`sql
-- Sintaxis ANSI
CAST(columna AS tipo)

-- Ejemplos
SELECT CAST(99.99 AS INTEGER);     -- 99
SELECT CAST(123 AS TEXT);          -- '123'
SELECT CAST('2024-01-15' AS DATE);

-- En algunos DBs: CONVERT
SELECT CONVERT(INTEGER, columna);
\`\`\`

**Tipos comunes:** INTEGER, REAL, TEXT, DATE, DECIMAL(p,s)`,
      en: `**CAST for type conversion:**

\`\`\`sql
-- ANSI syntax
CAST(column AS type)

-- Examples
SELECT CAST(99.99 AS INTEGER);     -- 99
SELECT CAST(123 AS TEXT);          -- '123'
SELECT CAST('2024-01-15' AS DATE);

-- In some DBs: CONVERT
SELECT CONVERT(INTEGER, column);
\`\`\`

**Common types:** INTEGER, REAL, TEXT, DATE, DECIMAL(p,s)`,
      pt: `**CAST para conversão de tipos:**

\`\`\`sql
-- Sintaxe ANSI
CAST(coluna AS tipo)

-- Exemplos
SELECT CAST(99.99 AS INTEGER);     -- 99
SELECT CAST(123 AS TEXT);          -- '123'
SELECT CAST('2024-01-15' AS DATE);

-- Em alguns DBs: CONVERT
SELECT CONVERT(INTEGER, coluna);
\`\`\`

**Tipos comuns:** INTEGER, REAL, TEXT, DATE, DECIMAL(p,s)`
    },
    realWorldExample: {
      es: 'Formatear datos para reportes, compatibilidad de tipos.',
      en: 'Format data for reports, type compatibility.',
      pt: 'Formatar dados para relatórios, compatibilidade de tipos.'
    },
    hint: {
      es: 'Usá CAST(price AS INTEGER) para convertir',
      en: 'Use CAST(price AS INTEGER) to convert',
      pt: 'Use CAST(price AS INTEGER) para converter'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 999.99);
INSERT INTO products VALUES (2, 'Mouse', 29.50);
INSERT INTO products VALUES (3, 'Monitor', 349.75);`,
    expectedQuery: `SELECT name, price, CAST(price AS INTEGER) AS price_rounded FROM products`,
    expectedResult: [
      ['Laptop', 999.99, 999],
      ['Mouse', 29.50, 29],
      ['Monitor', 349.75, 349],
    ],
  },
  // === OR vs UNION ===
  {
    id: 'sql-fx6',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['union', 'combine', 'sets'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'UNION - Combinar resultados',
      en: 'UNION - Combine Results',
      pt: 'UNION - Combinar Resultados'
    },
    description: {
      es: 'Combiná productos caros (>300) y productos con bajo stock (<10) en una sola lista.',
      en: 'Combine expensive products (>300) and low stock products (<10) into one list.',
      pt: 'Combine produtos caros (>300) e produtos com baixo estoque (<10) em uma só lista.'
    },
    theory: {
      es: `**UNION combina resultados de múltiples queries:**

\`\`\`sql
SELECT * FROM products WHERE price > 300
UNION
SELECT * FROM products WHERE stock < 10;
\`\`\`

**Tipos:**
- \`UNION\` - elimina duplicados
- \`UNION ALL\` - mantiene todos (más rápido)

**Reglas:**
- Mismo número de columnas
- Tipos compatibles
- Nombres de columnas del primer SELECT`,
      en: `**UNION combines results from multiple queries:**

\`\`\`sql
SELECT * FROM products WHERE price > 300
UNION
SELECT * FROM products WHERE stock < 10;
\`\`\`

**Types:**
- \`UNION\` - removes duplicates
- \`UNION ALL\` - keeps all (faster)

**Rules:**
- Same number of columns
- Compatible types
- Column names from first SELECT`,
      pt: `**UNION combina resultados de múltiplas queries:**

\`\`\`sql
SELECT * FROM products WHERE price > 300
UNION
SELECT * FROM products WHERE stock < 10;
\`\`\`

**Tipos:**
- \`UNION\` - remove duplicados
- \`UNION ALL\` - mantém todos (mais rápido)

**Regras:**
- Mesmo número de colunas
- Tipos compatíveis
- Nomes de colunas do primeiro SELECT`
    },
    realWorldExample: {
      es: 'Combinar alertas de diferentes condiciones, reportes consolidados.',
      en: 'Combine alerts from different conditions, consolidated reports.',
      pt: 'Combinar alertas de diferentes condições, relatórios consolidados.'
    },
    hint: {
      es: 'Usá UNION entre dos SELECTs separados',
      en: 'Use UNION between two separate SELECTs',
      pt: 'Use UNION entre dois SELECTs separados'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL, stock INT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 999, 5);
INSERT INTO products VALUES (2, 'Mouse', 29, 100);
INSERT INTO products VALUES (3, 'Monitor', 349, 20);
INSERT INTO products VALUES (4, 'Keyboard', 79, 8);
INSERT INTO products VALUES (5, 'Webcam', 89, 50);`,
    expectedQuery: `SELECT * FROM products WHERE price > 300
UNION
SELECT * FROM products WHERE stock < 10`,
    expectedResult: [
      [1, 'Laptop', 999, 5],
      [3, 'Monitor', 349, 20],
      [4, 'Keyboard', 79, 8],
    ],
  },
  // === STRING FUNCTIONS ===
  {
    id: 'sql-fx7',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['string', 'upper', 'lower', 'length'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Funciones de strings',
      en: 'String Functions',
      pt: 'Funções de Strings'
    },
    description: {
      es: 'Mostrá el nombre en mayúsculas y la longitud del nombre de cada producto.',
      en: 'Show the name in uppercase and the length of each product name.',
      pt: 'Mostre o nome em maiúsculas e o comprimento do nome de cada produto.'
    },
    theory: {
      es: `**Funciones de strings en SQL:**

\`\`\`sql
-- Mayúsculas/minúsculas
SELECT UPPER(name), LOWER(name) FROM products;

-- Longitud
SELECT LENGTH(name) FROM products;

-- Concatenar
SELECT name || ' - $' || price FROM products;

-- Substring
SELECT SUBSTR(name, 1, 3) FROM products;

-- Trim espacios
SELECT TRIM(name) FROM products;
\`\`\``,
      en: `**String functions in SQL:**

\`\`\`sql
-- Upper/lowercase
SELECT UPPER(name), LOWER(name) FROM products;

-- Length
SELECT LENGTH(name) FROM products;

-- Concatenate
SELECT name || ' - $' || price FROM products;

-- Substring
SELECT SUBSTR(name, 1, 3) FROM products;

-- Trim spaces
SELECT TRIM(name) FROM products;
\`\`\``,
      pt: `**Funções de strings em SQL:**

\`\`\`sql
-- Maiúsculas/minúsculas
SELECT UPPER(name), LOWER(name) FROM products;

-- Comprimento
SELECT LENGTH(name) FROM products;

-- Concatenar
SELECT name || ' - $' || price FROM products;

-- Substring
SELECT SUBSTR(name, 1, 3) FROM products;

-- Trim espaços
SELECT TRIM(name) FROM products;
\`\`\``
    },
    realWorldExample: {
      es: 'Normalizar datos, validar formatos, crear etiquetas.',
      en: 'Normalize data, validate formats, create labels.',
      pt: 'Normalizar dados, validar formatos, criar rótulos.'
    },
    hint: {
      es: 'Usá UPPER(name) y LENGTH(name)',
      en: 'Use UPPER(name) and LENGTH(name)',
      pt: 'Use UPPER(name) e LENGTH(name)'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop Pro', 999);
INSERT INTO products VALUES (2, 'Mouse', 29);
INSERT INTO products VALUES (3, 'Monitor HD', 349);`,
    expectedQuery: `SELECT name, UPPER(name) AS name_upper, LENGTH(name) AS name_length FROM products`,
    expectedResult: [
      ['Laptop Pro', 'LAPTOP PRO', 10],
      ['Mouse', 'MOUSE', 5],
      ['Monitor HD', 'MONITOR HD', 10],
    ],
  },
  // === MATHEMATICAL OPERATIONS ===
  {
    id: 'sql-fx8',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['math', 'calculations', 'arithmetic'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Operaciones matemáticas',
      en: 'Mathematical Operations',
      pt: 'Operações Matemáticas'
    },
    description: {
      es: 'Calculá el total (precio * cantidad) y el precio con 10% de descuento para cada producto.',
      en: 'Calculate total (price * quantity) and price with 10% discount for each product.',
      pt: 'Calcule o total (preço * quantidade) e o preço com 10% de desconto para cada produto.'
    },
    theory: {
      es: `**Operaciones matemáticas en SQL:**

\`\`\`sql
-- Básicas
SELECT price * quantity AS total FROM orders;
SELECT price * 0.9 AS discounted_price FROM products;
SELECT (price + shipping) * 1.21 AS total_with_tax FROM orders;

-- Funciones matemáticas
ROUND(valor, decimales)
ABS(valor)
CEIL(valor)  / CEILING(valor)
FLOOR(valor)
MOD(a, b)    -- Módulo
POWER(base, exp)
\`\`\``,
      en: `**Mathematical operations in SQL:**

\`\`\`sql
-- Basics
SELECT price * quantity AS total FROM orders;
SELECT price * 0.9 AS discounted_price FROM products;
SELECT (price + shipping) * 1.21 AS total_with_tax FROM orders;

-- Math functions
ROUND(value, decimals)
ABS(value)
CEIL(value)  / CEILING(value)
FLOOR(value)
MOD(a, b)    -- Modulo
POWER(base, exp)
\`\`\``,
      pt: `**Operações matemáticas em SQL:**

\`\`\`sql
-- Básicas
SELECT price * quantity AS total FROM orders;
SELECT price * 0.9 AS discounted_price FROM products;
SELECT (price + shipping) * 1.21 AS total_with_tax FROM orders;

-- Funções matemáticas
ROUND(valor, decimais)
ABS(valor)
CEIL(valor)  / CEILING(valor)
FLOOR(valor)
MOD(a, b)    -- Módulo
POWER(base, exp)
\`\`\``
    },
    realWorldExample: {
      es: 'Cálculos de precios, totales de pedidos, métricas.',
      en: 'Price calculations, order totals, metrics.',
      pt: 'Cálculos de preços, totais de pedidos, métricas.'
    },
    hint: {
      es: 'Multiplicá price * quantity y price * 0.9 para el descuento',
      en: 'Multiply price * quantity and price * 0.9 for discount',
      pt: 'Multiplique price * quantity e price * 0.9 para o desconto'
    },
    
    schema: `CREATE TABLE order_items (id INT, product TEXT, price REAL, quantity INT);`,
    sampleData: `INSERT INTO order_items VALUES (1, 'Laptop', 999, 2);
INSERT INTO order_items VALUES (2, 'Mouse', 29, 5);
INSERT INTO order_items VALUES (3, 'Monitor', 349, 1);`,
    expectedQuery: `SELECT product, price, quantity, 
  price * quantity AS total,
  ROUND(price * 0.9, 2) AS discounted_price
FROM order_items`,
    expectedResult: [
      ['Laptop', 999, 2, 1998, 899.1],
      ['Mouse', 29, 5, 145, 26.1],
      ['Monitor', 349, 1, 349, 314.1],
    ],
  },
  // === NULLIF ===
  {
    id: 'sql-fx9',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['nullif', 'null', 'division'],
    interviewFrequency: 'medium',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'NULLIF - Evitar división por cero',
      en: 'NULLIF - Avoid Division by Zero',
      pt: 'NULLIF - Evitar Divisão por Zero'
    },
    description: {
      es: 'Calculá el precio promedio por unidad vendida, evitando división por cero.',
      en: 'Calculate average price per unit sold, avoiding division by zero.',
      pt: 'Calcule o preço médio por unidade vendida, evitando divisão por zero.'
    },
    theory: {
      es: `**NULLIF(a, b)** retorna NULL si a = b:

\`\`\`sql
-- Evitar división por cero
SELECT total / NULLIF(cantidad, 0) AS precio_unitario
FROM ventas;

-- NULL / cualquierCosa = NULL (no error)

-- Combinado con COALESCE
SELECT COALESCE(total / NULLIF(cantidad, 0), 0) AS precio_unitario
FROM ventas;
\`\`\`

**⚠️ Sin NULLIF:** División por cero = Error`,
      en: `**NULLIF(a, b)** returns NULL if a = b:

\`\`\`sql
-- Avoid division by zero
SELECT total / NULLIF(quantity, 0) AS unit_price
FROM sales;

-- NULL / anything = NULL (no error)

-- Combined with COALESCE
SELECT COALESCE(total / NULLIF(quantity, 0), 0) AS unit_price
FROM sales;
\`\`\`

**⚠️ Without NULLIF:** Division by zero = Error`,
      pt: `**NULLIF(a, b)** retorna NULL se a = b:

\`\`\`sql
-- Evitar divisão por zero
SELECT total / NULLIF(quantidade, 0) AS preco_unitario
FROM vendas;

-- NULL / qualquerCoisa = NULL (sem erro)

-- Combinado com COALESCE
SELECT COALESCE(total / NULLIF(quantidade, 0), 0) AS preco_unitario
FROM vendas;
\`\`\`

**⚠️ Sem NULLIF:** Divisão por zero = Erro`
    },
    realWorldExample: {
      es: 'Métricas con posibles ceros, ratios seguros.',
      en: 'Metrics with possible zeros, safe ratios.',
      pt: 'Métricas com possíveis zeros, ratios seguros.'
    },
    hint: {
      es: 'Usá NULLIF(units_sold, 0) en el divisor',
      en: 'Use NULLIF(units_sold, 0) in the divisor',
      pt: 'Use NULLIF(units_sold, 0) no divisor'
    },
    
    schema: `CREATE TABLE sales (id INT, product TEXT, total_amount REAL, units_sold INT);`,
    sampleData: `INSERT INTO sales VALUES (1, 'Laptop', 2000, 2);
INSERT INTO sales VALUES (2, 'Mouse', 0, 0);
INSERT INTO sales VALUES (3, 'Monitor', 700, 2);
INSERT INTO sales VALUES (4, 'Keyboard', 150, 3);`,
    expectedQuery: `SELECT product, total_amount, units_sold,
  total_amount / NULLIF(units_sold, 0) AS price_per_unit
FROM sales`,
    expectedResult: [
      ['Laptop', 2000, 2, 1000],
      ['Mouse', 0, 0, null],
      ['Monitor', 700, 2, 350],
      ['Keyboard', 150, 3, 50],
    ],
  },
  // === USING DATES ===
  {
    id: 'sql-fx10',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['date', 'strftime', 'extract'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Extraer partes de fechas',
      en: 'Extract Date Parts',
      pt: 'Extrair Partes de Datas'
    },
    description: {
      es: 'Extraé el año y mes de cada orden.',
      en: 'Extract year and month from each order.',
      pt: 'Extraia o ano e mês de cada pedido.'
    },
    theory: {
      es: `**Extraer partes de fechas (SQLite):**

\`\`\`sql
-- SQLite usa strftime
SELECT strftime('%Y', order_date) AS year FROM orders;
SELECT strftime('%m', order_date) AS month FROM orders;
SELECT strftime('%d', order_date) AS day FROM orders;

-- PostgreSQL usa EXTRACT
SELECT EXTRACT(YEAR FROM order_date) FROM orders;
SELECT EXTRACT(MONTH FROM order_date) FROM orders;

-- MySQL usa funciones directas
SELECT YEAR(order_date), MONTH(order_date) FROM orders;
\`\`\``,
      en: `**Extract date parts (SQLite):**

\`\`\`sql
-- SQLite uses strftime
SELECT strftime('%Y', order_date) AS year FROM orders;
SELECT strftime('%m', order_date) AS month FROM orders;
SELECT strftime('%d', order_date) AS day FROM orders;

-- PostgreSQL uses EXTRACT
SELECT EXTRACT(YEAR FROM order_date) FROM orders;
SELECT EXTRACT(MONTH FROM order_date) FROM orders;

-- MySQL uses direct functions
SELECT YEAR(order_date), MONTH(order_date) FROM orders;
\`\`\``,
      pt: `**Extrair partes de datas (SQLite):**

\`\`\`sql
-- SQLite usa strftime
SELECT strftime('%Y', order_date) AS year FROM orders;
SELECT strftime('%m', order_date) AS month FROM orders;
SELECT strftime('%d', order_date) AS day FROM orders;

-- PostgreSQL usa EXTRACT
SELECT EXTRACT(YEAR FROM order_date) FROM orders;
SELECT EXTRACT(MONTH FROM order_date) FROM orders;

-- MySQL usa funções diretas
SELECT YEAR(order_date), MONTH(order_date) FROM orders;
\`\`\``
    },
    realWorldExample: {
      es: 'Reportes mensuales, análisis por período.',
      en: 'Monthly reports, period analysis.',
      pt: 'Relatórios mensais, análise por período.'
    },
    hint: {
      es: 'En SQLite usá strftime("%Y", fecha) para año',
      en: 'In SQLite use strftime("%Y", date) for year',
      pt: 'No SQLite use strftime("%Y", data) para ano'
    },
    
    schema: `CREATE TABLE orders (id INT, customer TEXT, order_date TEXT, total REAL);`,
    sampleData: `INSERT INTO orders VALUES (1, 'Ana', '2024-01-15', 150);
INSERT INTO orders VALUES (2, 'Bob', '2024-02-20', 200);
INSERT INTO orders VALUES (3, 'Carlos', '2024-01-25', 300);
INSERT INTO orders VALUES (4, 'Diana', '2024-03-10', 180);`,
    expectedQuery: `SELECT id, order_date,
  strftime('%Y', order_date) AS year,
  strftime('%m', order_date) AS month
FROM orders`,
    expectedResult: [
      [1, '2024-01-15', '2024', '01'],
      [2, '2024-02-20', '2024', '02'],
      [3, '2024-01-25', '2024', '01'],
      [4, '2024-03-10', '2024', '03'],
    ],
  },
  // === SUBQUERY IN WHERE ===
  {
    id: 'sql-fx11',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['subquery', 'nested', 'where'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Subconsulta en WHERE',
      en: 'Subquery in WHERE',
      pt: 'Subconsulta em WHERE'
    },
    description: {
      es: 'Encontrá productos con precio mayor al precio promedio.',
      en: 'Find products with price greater than average price.',
      pt: 'Encontre produtos com preço maior que o preço médio.'
    },
    theory: {
      es: `**Subconsultas en WHERE:**

\`\`\`sql
-- Valor escalar
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Lista de valores
SELECT * FROM products
WHERE category_id IN (
  SELECT id FROM categories WHERE active = 1
);

-- EXISTS
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders WHERE customer_id = c.id
);
\`\`\``,
      en: `**Subqueries in WHERE:**

\`\`\`sql
-- Scalar value
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- List of values
SELECT * FROM products
WHERE category_id IN (
  SELECT id FROM categories WHERE active = 1
);

-- EXISTS
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders WHERE customer_id = c.id
);
\`\`\``,
      pt: `**Subconsultas em WHERE:**

\`\`\`sql
-- Valor escalar
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Lista de valores
SELECT * FROM products
WHERE category_id IN (
  SELECT id FROM categories WHERE active = 1
);

-- EXISTS
SELECT * FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders WHERE customer_id = c.id
);
\`\`\``
    },
    realWorldExample: {
      es: 'Filtros dinámicos basados en estadísticas.',
      en: 'Dynamic filters based on statistics.',
      pt: 'Filtros dinâmicos baseados em estatísticas.'
    },
    hint: {
      es: 'Usá WHERE price > (SELECT AVG(price) FROM products)',
      en: 'Use WHERE price > (SELECT AVG(price) FROM products)',
      pt: 'Use WHERE price > (SELECT AVG(price) FROM products)'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 999);
INSERT INTO products VALUES (2, 'Mouse', 29);
INSERT INTO products VALUES (3, 'Monitor', 349);
INSERT INTO products VALUES (4, 'Keyboard', 79);
INSERT INTO products VALUES (5, 'Webcam', 89);`,
    expectedQuery: `SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products)`,
    expectedResult: [
      [1, 'Laptop', 999],
      [3, 'Monitor', 349],
    ],
  },
  // === DISTINCT ON (complex) ===
  {
    id: 'sql-fx12',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['distinct', 'dedup', 'first'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Primera fila por grupo (sin GROUP BY)',
      en: 'First Row per Group (without GROUP BY)',
      pt: 'Primeira Linha por Grupo (sem GROUP BY)'
    },
    description: {
      es: 'Obtené el pedido más reciente de cada cliente (usando subconsulta).',
      en: 'Get the most recent order from each customer (using subquery).',
      pt: 'Obtenha o pedido mais recente de cada cliente (usando subconsulta).'
    },
    theory: {
      es: `**Obtener primera/última fila por grupo:**

\`\`\`sql
-- Método 1: Subconsulta correlacionada
SELECT * FROM orders o1
WHERE order_date = (
  SELECT MAX(order_date) 
  FROM orders o2 
  WHERE o2.customer_id = o1.customer_id
);

-- Método 2: ROW_NUMBER (más eficiente)
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER(
    PARTITION BY customer_id ORDER BY order_date DESC
  ) AS rn
  FROM orders
)
SELECT * FROM ranked WHERE rn = 1;
\`\`\``,
      en: `**Get first/last row per group:**

\`\`\`sql
-- Method 1: Correlated subquery
SELECT * FROM orders o1
WHERE order_date = (
  SELECT MAX(order_date) 
  FROM orders o2 
  WHERE o2.customer_id = o1.customer_id
);

-- Method 2: ROW_NUMBER (more efficient)
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER(
    PARTITION BY customer_id ORDER BY order_date DESC
  ) AS rn
  FROM orders
)
SELECT * FROM ranked WHERE rn = 1;
\`\`\``,
      pt: `**Obter primeira/última linha por grupo:**

\`\`\`sql
-- Método 1: Subconsulta correlacionada
SELECT * FROM orders o1
WHERE order_date = (
  SELECT MAX(order_date) 
  FROM orders o2 
  WHERE o2.customer_id = o1.customer_id
);

-- Método 2: ROW_NUMBER (mais eficiente)
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER(
    PARTITION BY customer_id ORDER BY order_date DESC
  ) AS rn
  FROM orders
)
SELECT * FROM ranked WHERE rn = 1;
\`\`\``
    },
    realWorldExample: {
      es: 'Última actividad por usuario, pedido más reciente.',
      en: 'Last activity per user, most recent order.',
      pt: 'Última atividade por usuário, pedido mais recente.'
    },
    hint: {
      es: 'Usá subconsulta correlacionada con MAX(order_date)',
      en: 'Use correlated subquery with MAX(order_date)',
      pt: 'Use subconsulta correlacionada com MAX(order_date)'
    },
    
    schema: `CREATE TABLE orders (id INT, customer_id INT, order_date TEXT, total REAL);`,
    sampleData: `INSERT INTO orders VALUES (1, 101, '2024-01-15', 150);
INSERT INTO orders VALUES (2, 102, '2024-01-20', 200);
INSERT INTO orders VALUES (3, 101, '2024-02-10', 180);
INSERT INTO orders VALUES (4, 102, '2024-02-15', 220);
INSERT INTO orders VALUES (5, 103, '2024-01-25', 300);`,
    expectedQuery: `SELECT * FROM orders o1
WHERE order_date = (
  SELECT MAX(order_date) FROM orders o2 WHERE o2.customer_id = o1.customer_id
)`,
    expectedResult: [
      [3, 101, '2024-02-10', 180],
      [4, 102, '2024-02-15', 220],
      [5, 103, '2024-01-25', 300],
    ],
  },
  // === IS NOT NULL ===
  {
    id: 'sql-fx13',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['null', 'is not null', 'filter'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'IS NOT NULL - Filtrar no nulos',
      en: 'IS NOT NULL - Filter Non-Nulls',
      pt: 'IS NOT NULL - Filtrar Não Nulos'
    },
    description: {
      es: 'Encontrá clientes que SÍ tienen teléfono registrado.',
      en: 'Find customers who DO have a registered phone.',
      pt: 'Encontre clientes que SIM têm telefone registrado.'
    },
    theory: {
      es: `**Filtrar valores no nulos:**

\`\`\`sql
-- Clientes CON teléfono
SELECT * FROM customers 
WHERE phone IS NOT NULL;

-- Clientes SIN teléfono
SELECT * FROM customers 
WHERE phone IS NULL;

-- Múltiples columnas
SELECT * FROM customers 
WHERE phone IS NOT NULL 
  AND email IS NOT NULL;
\`\`\`

**⚠️ Recordá:** \`!= NULL\` NO funciona, siempre usá \`IS NOT NULL\``,
      en: `**Filter non-null values:**

\`\`\`sql
-- Customers WITH phone
SELECT * FROM customers 
WHERE phone IS NOT NULL;

-- Customers WITHOUT phone
SELECT * FROM customers 
WHERE phone IS NULL;

-- Multiple columns
SELECT * FROM customers 
WHERE phone IS NOT NULL 
  AND email IS NOT NULL;
\`\`\`

**⚠️ Remember:** \`!= NULL\` does NOT work, always use \`IS NOT NULL\``,
      pt: `**Filtrar valores não nulos:**

\`\`\`sql
-- Clientes COM telefone
SELECT * FROM customers 
WHERE phone IS NOT NULL;

-- Clientes SEM telefone
SELECT * FROM customers 
WHERE phone IS NULL;

-- Múltiplas colunas
SELECT * FROM customers 
WHERE phone IS NOT NULL 
  AND email IS NOT NULL;
\`\`\`

**⚠️ Lembre:** \`!= NULL\` NÃO funciona, sempre use \`IS NOT NULL\``
    },
    realWorldExample: {
      es: 'Filtrar registros completos, contactar solo a quienes tienen datos.',
      en: 'Filter complete records, contact only those with data.',
      pt: 'Filtrar registros completos, contatar apenas quem tem dados.'
    },
    hint: {
      es: 'Usá IS NOT NULL para filtrar valores no nulos',
      en: 'Use IS NOT NULL to filter non-null values',
      pt: 'Use IS NOT NULL para filtrar valores não nulos'
    },
    
    schema: `CREATE TABLE customers (id INT, name TEXT, email TEXT, phone TEXT);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana', 'ana@mail.com', '+34 612345678');
INSERT INTO customers VALUES (2, 'Bob', 'bob@mail.com', NULL);
INSERT INTO customers VALUES (3, 'Carlos', 'carlos@mail.com', '+34 687654321');
INSERT INTO customers VALUES (4, 'Diana', NULL, '+34 611223344');
INSERT INTO customers VALUES (5, 'Eva', 'eva@mail.com', NULL);`,
    expectedQuery: `SELECT * FROM customers WHERE phone IS NOT NULL`,
    expectedResult: [
      [1, 'Ana', 'ana@mail.com', '+34 612345678'],
      [3, 'Carlos', 'carlos@mail.com', '+34 687654321'],
      [4, 'Diana', null, '+34 611223344'],
    ],
  },
  // === ABS, ROUND ===
  {
    id: 'sql-fx14',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['round', 'abs', 'math'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'ROUND y ABS',
      en: 'ROUND and ABS',
      pt: 'ROUND e ABS'
    },
    description: {
      es: 'Redondeá precios a 2 decimales y mostrá el valor absoluto de variaciones.',
      en: 'Round prices to 2 decimals and show absolute value of variations.',
      pt: 'Arredonde preços para 2 decimais e mostre o valor absoluto de variações.'
    },
    theory: {
      es: `**ROUND y ABS:**

\`\`\`sql
-- Redondear a N decimales
SELECT ROUND(99.5678, 2);  -- 99.57
SELECT ROUND(99.5678);     -- 100

-- Valor absoluto
SELECT ABS(-25);           -- 25
SELECT ABS(price_change) FROM stocks;

-- Combinados
SELECT ROUND(ABS(variacion), 2) FROM datos;
\`\`\``,
      en: `**ROUND and ABS:**

\`\`\`sql
-- Round to N decimals
SELECT ROUND(99.5678, 2);  -- 99.57
SELECT ROUND(99.5678);     -- 100

-- Absolute value
SELECT ABS(-25);           -- 25
SELECT ABS(price_change) FROM stocks;

-- Combined
SELECT ROUND(ABS(variation), 2) FROM data;
\`\`\``,
      pt: `**ROUND e ABS:**

\`\`\`sql
-- Arredondar para N decimais
SELECT ROUND(99.5678, 2);  -- 99.57
SELECT ROUND(99.5678);     -- 100

-- Valor absoluto
SELECT ABS(-25);           -- 25
SELECT ABS(price_change) FROM stocks;

-- Combinados
SELECT ROUND(ABS(variacao), 2) FROM dados;
\`\`\``
    },
    realWorldExample: {
      es: 'Formatear precios, calcular diferencias absolutas.',
      en: 'Format prices, calculate absolute differences.',
      pt: 'Formatar preços, calcular diferenças absolutas.'
    },
    hint: {
      es: 'Usá ROUND(price, 2) y ABS(change)',
      en: 'Use ROUND(price, 2) and ABS(change)',
      pt: 'Use ROUND(price, 2) e ABS(change)'
    },
    
    schema: `CREATE TABLE stocks (id INT, symbol TEXT, price REAL, daily_change REAL);`,
    sampleData: `INSERT INTO stocks VALUES (1, 'AAPL', 178.234, -2.15);
INSERT INTO stocks VALUES (2, 'GOOGL', 141.567, 3.42);
INSERT INTO stocks VALUES (3, 'MSFT', 378.891, -1.23);`,
    expectedQuery: `SELECT symbol, ROUND(price, 2) AS price_rounded, ABS(daily_change) AS abs_change FROM stocks`,
    expectedResult: [
      ['AAPL', 178.23, 2.15],
      ['GOOGL', 141.57, 3.42],
      ['MSFT', 378.89, 1.23],
    ],
  },
  // === OR with parentheses ===
  {
    id: 'sql-fx15',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['or', 'and', 'parentheses', 'logic'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Paréntesis en condiciones complejas',
      en: 'Parentheses in Complex Conditions',
      pt: 'Parênteses em Condições Complexas'
    },
    description: {
      es: 'Encontrá productos que sean (Electronics O Gaming) Y tengan precio < 200.',
      en: 'Find products that are (Electronics OR Gaming) AND have price < 200.',
      pt: 'Encontre produtos que sejam (Electronics OU Gaming) E tenham preço < 200.'
    },
    theory: {
      es: `**Paréntesis para controlar evaluación:**

\`\`\`sql
-- ❌ Sin paréntesis (resultado inesperado)
SELECT * FROM products
WHERE category = 'Electronics' OR category = 'Gaming'
AND price < 200;
-- Se evalúa como: Electronics OR (Gaming AND price<200)

-- ✅ Con paréntesis (correcto)
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Gaming')
AND price < 200;
\`\`\`

**Precedencia:** NOT > AND > OR
**Regla:** En caso de duda, usá paréntesis.`,
      en: `**Parentheses to control evaluation:**

\`\`\`sql
-- ❌ Without parentheses (unexpected result)
SELECT * FROM products
WHERE category = 'Electronics' OR category = 'Gaming'
AND price < 200;
-- Evaluates as: Electronics OR (Gaming AND price<200)

-- ✅ With parentheses (correct)
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Gaming')
AND price < 200;
\`\`\`

**Precedence:** NOT > AND > OR
**Rule:** When in doubt, use parentheses.`,
      pt: `**Parênteses para controlar avaliação:**

\`\`\`sql
-- ❌ Sem parênteses (resultado inesperado)
SELECT * FROM products
WHERE category = 'Electronics' OR category = 'Gaming'
AND price < 200;
-- Avalia como: Electronics OR (Gaming AND price<200)

-- ✅ Com parênteses (correto)
SELECT * FROM products
WHERE (category = 'Electronics' OR category = 'Gaming')
AND price < 200;
\`\`\`

**Precedência:** NOT > AND > OR
**Regra:** Na dúvida, use parênteses.`
    },
    realWorldExample: {
      es: 'Filtros complejos en e-commerce, búsquedas avanzadas.',
      en: 'Complex filters in e-commerce, advanced searches.',
      pt: 'Filtros complexos em e-commerce, buscas avançadas.'
    },
    hint: {
      es: 'Encerrá las condiciones OR entre paréntesis',
      en: 'Wrap OR conditions in parentheses',
      pt: 'Coloque as condições OR entre parênteses'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, category TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 'Electronics', 999);
INSERT INTO products VALUES (2, 'Mouse', 'Electronics', 29);
INSERT INTO products VALUES (3, 'Chair', 'Furniture', 149);
INSERT INTO products VALUES (4, 'Headset', 'Gaming', 89);
INSERT INTO products VALUES (5, 'Monitor', 'Electronics', 349);
INSERT INTO products VALUES (6, 'Controller', 'Gaming', 59);`,
    expectedQuery: `SELECT * FROM products 
WHERE (category = 'Electronics' OR category = 'Gaming') 
AND price < 200`,
    expectedResult: [
      [2, 'Mouse', 'Electronics', 29],
      [4, 'Headset', 'Gaming', 89],
      [6, 'Controller', 'Gaming', 59],
    ],
  },
];

export default SQL_FUNDAMENTALS_EXTENDED;

