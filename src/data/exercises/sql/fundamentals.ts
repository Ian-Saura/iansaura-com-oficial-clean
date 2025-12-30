/**
 * SQL Fundamentals Exercises
 * SELECT, WHERE, ORDER BY, LIMIT, DISTINCT
 */

import { SQLExercise } from '../types';

export const SQL_FUNDAMENTALS: SQLExercise[] = [
  {
    id: 'sql-f1',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['select', 'basics'],
    interviewFrequency: 'very_high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'SELECT Básico',
      en: 'Basic SELECT',
      pt: 'SELECT Básico'
    },
    description: {
      es: 'Seleccioná todas las columnas de la tabla products.',
      en: 'Select all columns from the products table.',
      pt: 'Selecione todas as colunas da tabela products.'
    },
    theory: {
      es: `**SELECT** es el comando más básico de SQL para recuperar datos.

**Sintaxis:**
\`\`\`sql
SELECT columna1, columna2 FROM tabla;
SELECT * FROM tabla; -- Todas las columnas
\`\`\`

**Best Practice:** Siempre especificá las columnas que necesitás en producción.`,
      en: `**SELECT** is the most basic SQL command to retrieve data.

**Syntax:**
\`\`\`sql
SELECT column1, column2 FROM table;
SELECT * FROM table; -- All columns
\`\`\`

**Best Practice:** Always specify the columns you need in production.`,
      pt: `**SELECT** é o comando mais básico do SQL para recuperar dados.

**Sintaxe:**
\`\`\`sql
SELECT coluna1, coluna2 FROM tabela;
SELECT * FROM tabela; -- Todas as colunas
\`\`\`

**Melhor Prática:** Sempre especifique as colunas que você precisa em produção.`
    },
    realWorldExample: {
      es: 'En un e-commerce, usarías SELECT para obtener la lista de productos del catálogo.',
      en: 'In an e-commerce, you would use SELECT to get the product catalog list.',
      pt: 'Em um e-commerce, você usaria SELECT para obter a lista de produtos do catálogo.'
    },
    hint: {
      es: 'Usá SELECT * FROM tabla',
      en: 'Use SELECT * FROM table',
      pt: 'Use SELECT * FROM tabela'
    },
    
    schema: `
      CREATE TABLE products (
        id INTEGER PRIMARY KEY,
        name TEXT,
        price REAL,
        category TEXT,
        stock INTEGER
      );
    `,
    sampleData: `
      INSERT INTO products VALUES (1, 'Laptop', 999.99, 'Electronics', 10);
      INSERT INTO products VALUES (2, 'Mouse', 29.99, 'Electronics', 50);
      INSERT INTO products VALUES (3, 'Desk', 199.99, 'Furniture', 15);
      INSERT INTO products VALUES (4, 'Chair', 149.99, 'Furniture', 20);
      INSERT INTO products VALUES (5, 'Monitor', 299.99, 'Electronics', 25);
    `,
    expectedQuery: 'SELECT * FROM products',
    expectedResult: [
      [1, 'Laptop', 999.99, 'Electronics', 10],
      [2, 'Mouse', 29.99, 'Electronics', 50],
      [3, 'Desk', 199.99, 'Furniture', 15],
      [4, 'Chair', 149.99, 'Furniture', 20],
      [5, 'Monitor', 299.99, 'Electronics', 25],
    ],
  },
  {
    id: 'sql-f2',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['where', 'filter', 'comparison'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'WHERE - Filtrado básico',
      en: 'WHERE - Basic Filtering',
      pt: 'WHERE - Filtragem Básica'
    },
    description: {
      es: 'Filtrá los productos con precio mayor a 100.',
      en: 'Filter products with price greater than 100.',
      pt: 'Filtre os produtos com preço maior que 100.'
    },
    theory: {
      es: `**WHERE** filtra las filas que cumplen una condición.

**Operadores:**
- \`=\`, \`<>\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- \`BETWEEN x AND y\`
- \`IN (a, b, c)\`
- \`LIKE '%patron%'\`
- \`IS NULL\` / \`IS NOT NULL\`

**Operadores lógicos:** AND, OR, NOT`,
      en: `**WHERE** filters rows that meet a condition.

**Operators:**
- \`=\`, \`<>\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- \`BETWEEN x AND y\`
- \`IN (a, b, c)\`
- \`LIKE '%pattern%'\`
- \`IS NULL\` / \`IS NOT NULL\`

**Logical operators:** AND, OR, NOT`,
      pt: `**WHERE** filtra as linhas que atendem a uma condição.

**Operadores:**
- \`=\`, \`<>\`, \`>\`, \`<\`, \`>=\`, \`<=\`
- \`BETWEEN x AND y\`
- \`IN (a, b, c)\`
- \`LIKE '%padrao%'\`
- \`IS NULL\` / \`IS NOT NULL\`

**Operadores lógicos:** AND, OR, NOT`
    },
    realWorldExample: {
      es: 'Filtrar productos en oferta o de una categoría específica.',
      en: 'Filter products on sale or from a specific category.',
      pt: 'Filtrar produtos em oferta ou de uma categoria específica.'
    },
    hint: {
      es: 'Usá WHERE price > 100',
      en: 'Use WHERE price > 100',
      pt: 'Use WHERE price > 100'
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
    expectedQuery: "SELECT * FROM products WHERE price > 100",
    expectedResult: [
      [1, 'Laptop', 999.99, 'Electronics'],
      [3, 'Desk', 199.99, 'Furniture'],
      [4, 'Chair', 149.99, 'Furniture'],
      [5, 'Monitor', 299.99, 'Electronics'],
    ],
  },
  {
    id: 'sql-f3',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['order', 'sort', 'desc', 'asc'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'ORDER BY - Ordenamiento',
      en: 'ORDER BY - Sorting',
      pt: 'ORDER BY - Ordenação'
    },
    description: {
      es: 'Ordená los productos por precio de mayor a menor.',
      en: 'Sort products by price from highest to lowest.',
      pt: 'Ordene os produtos por preço do maior para o menor.'
    },
    theory: {
      es: `**ORDER BY** ordena los resultados.

\`\`\`sql
ORDER BY columna ASC;  -- Ascendente (default)
ORDER BY columna DESC; -- Descendente
ORDER BY col1, col2;   -- Múltiples columnas
\`\`\`

**Performance tip:** Usá índices en columnas frecuentemente ordenadas.`,
      en: `**ORDER BY** sorts the results.

\`\`\`sql
ORDER BY column ASC;  -- Ascending (default)
ORDER BY column DESC; -- Descending
ORDER BY col1, col2;  -- Multiple columns
\`\`\`

**Performance tip:** Use indexes on frequently sorted columns.`,
      pt: `**ORDER BY** ordena os resultados.

\`\`\`sql
ORDER BY coluna ASC;  -- Ascendente (padrão)
ORDER BY coluna DESC; -- Descendente
ORDER BY col1, col2;  -- Múltiplas colunas
\`\`\`

**Dica de performance:** Use índices em colunas frequentemente ordenadas.`
    },
    realWorldExample: {
      es: 'Mostrar los productos más caros primero.',
      en: 'Show the most expensive products first.',
      pt: 'Mostrar os produtos mais caros primeiro.'
    },
    hint: {
      es: 'Usá ORDER BY price DESC',
      en: 'Use ORDER BY price DESC',
      pt: 'Use ORDER BY price DESC'
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
    expectedQuery: 'SELECT * FROM products ORDER BY price DESC',
    expectedResult: [
      [1, 'Laptop', 999.99, 'Electronics'],
      [5, 'Monitor', 299.99, 'Electronics'],
      [3, 'Desk', 199.99, 'Furniture'],
      [4, 'Chair', 149.99, 'Furniture'],
      [2, 'Mouse', 29.99, 'Electronics'],
    ],
  },
  {
    id: 'sql-f4',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['limit', 'top', 'pagination'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'LIMIT - Top N',
      en: 'LIMIT - Top N',
      pt: 'LIMIT - Top N'
    },
    description: {
      es: 'Obtené los 3 productos más caros.',
      en: 'Get the 3 most expensive products.',
      pt: 'Obtenha os 3 produtos mais caros.'
    },
    theory: {
      es: `**LIMIT** restringe el número de filas.

\`\`\`sql
-- MySQL, PostgreSQL, SQLite
SELECT * FROM tabla LIMIT 10;
SELECT * FROM tabla LIMIT 10 OFFSET 20; -- Paginación

-- SQL Server
SELECT TOP 10 * FROM tabla;
\`\`\`

**Paginación:** \`LIMIT items OFFSET (página-1)*items\``,
      en: `**LIMIT** restricts the number of rows.

\`\`\`sql
-- MySQL, PostgreSQL, SQLite
SELECT * FROM table LIMIT 10;
SELECT * FROM table LIMIT 10 OFFSET 20; -- Pagination

-- SQL Server
SELECT TOP 10 * FROM table;
\`\`\`

**Pagination:** \`LIMIT items OFFSET (page-1)*items\``,
      pt: `**LIMIT** restringe o número de linhas.

\`\`\`sql
-- MySQL, PostgreSQL, SQLite
SELECT * FROM tabela LIMIT 10;
SELECT * FROM tabela LIMIT 10 OFFSET 20; -- Paginação

-- SQL Server
SELECT TOP 10 * FROM tabela;
\`\`\`

**Paginação:** \`LIMIT items OFFSET (página-1)*items\``
    },
    realWorldExample: {
      es: 'Mostrar "Top 10 productos más vendidos".',
      en: 'Show "Top 10 best-selling products".',
      pt: 'Mostrar "Top 10 produtos mais vendidos".'
    },
    hint: {
      es: 'Combiná ORDER BY con LIMIT',
      en: 'Combine ORDER BY with LIMIT',
      pt: 'Combine ORDER BY com LIMIT'
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
    expectedQuery: 'SELECT * FROM products ORDER BY price DESC LIMIT 3',
    expectedResult: [
      [1, 'Laptop', 999.99, 'Electronics'],
      [5, 'Monitor', 299.99, 'Electronics'],
      [3, 'Desk', 199.99, 'Furniture'],
    ],
  },
  {
    id: 'sql-f5',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['distinct', 'unique'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'DISTINCT - Valores únicos',
      en: 'DISTINCT - Unique Values',
      pt: 'DISTINCT - Valores Únicos'
    },
    description: {
      es: 'Obtené todas las categorías únicas de productos.',
      en: 'Get all unique product categories.',
      pt: 'Obtenha todas as categorias únicas de produtos.'
    },
    theory: {
      es: `**DISTINCT** elimina filas duplicadas.

\`\`\`sql
SELECT DISTINCT columna FROM tabla;
SELECT DISTINCT col1, col2 FROM tabla; -- Combinaciones únicas
SELECT COUNT(DISTINCT columna) FROM tabla; -- Contar únicos
\`\`\`

**Alternativa:** \`GROUP BY columna\` es a veces más eficiente.`,
      en: `**DISTINCT** removes duplicate rows.

\`\`\`sql
SELECT DISTINCT column FROM table;
SELECT DISTINCT col1, col2 FROM table; -- Unique combinations
SELECT COUNT(DISTINCT column) FROM table; -- Count unique
\`\`\`

**Alternative:** \`GROUP BY column\` is sometimes more efficient.`,
      pt: `**DISTINCT** remove linhas duplicadas.

\`\`\`sql
SELECT DISTINCT coluna FROM tabela;
SELECT DISTINCT col1, col2 FROM tabela; -- Combinações únicas
SELECT COUNT(DISTINCT coluna) FROM tabela; -- Contar únicos
\`\`\`

**Alternativa:** \`GROUP BY coluna\` às vezes é mais eficiente.`
    },
    realWorldExample: {
      es: 'Obtener la lista de países donde tenemos clientes.',
      en: 'Get the list of countries where we have customers.',
      pt: 'Obter a lista de países onde temos clientes.'
    },
    hint: {
      es: 'Usá SELECT DISTINCT category',
      en: 'Use SELECT DISTINCT category',
      pt: 'Use SELECT DISTINCT category'
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
    expectedQuery: 'SELECT DISTINCT category FROM products',
    expectedResult: [
      ['Electronics'],
      ['Furniture'],
    ],
  },
  {
    id: 'sql-f6',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['where', 'and', 'or', 'multiple conditions'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'WHERE con múltiples condiciones',
      en: 'WHERE with Multiple Conditions',
      pt: 'WHERE com Múltiplas Condições'
    },
    description: {
      es: 'Encontrá productos de Electronics con precio menor a 500.',
      en: 'Find Electronics products with price less than 500.',
      pt: 'Encontre produtos de Electronics com preço menor que 500.'
    },
    theory: {
      es: `**Combinando condiciones:**

\`\`\`sql
-- AND: ambas deben cumplirse
WHERE categoria = 'Electronics' AND precio < 500

-- OR: al menos una debe cumplirse
WHERE categoria = 'Electronics' OR precio < 50

-- Paréntesis para agrupar
WHERE (cat = 'A' OR cat = 'B') AND precio > 100
\`\`\`

**Orden de evaluación:** NOT > AND > OR`,
      en: `**Combining conditions:**

\`\`\`sql
-- AND: both must be true
WHERE category = 'Electronics' AND price < 500

-- OR: at least one must be true
WHERE category = 'Electronics' OR price < 50

-- Parentheses to group
WHERE (cat = 'A' OR cat = 'B') AND price > 100
\`\`\`

**Evaluation order:** NOT > AND > OR`,
      pt: `**Combinando condições:**

\`\`\`sql
-- AND: ambas devem ser verdadeiras
WHERE categoria = 'Electronics' AND preco < 500

-- OR: pelo menos uma deve ser verdadeira
WHERE categoria = 'Electronics' OR preco < 50

-- Parênteses para agrupar
WHERE (cat = 'A' OR cat = 'B') AND preco > 100
\`\`\`

**Ordem de avaliação:** NOT > AND > OR`
    },
    realWorldExample: {
      es: 'Filtrar productos en oferta de una categoría específica.',
      en: 'Filter sale products from a specific category.',
      pt: 'Filtrar produtos em oferta de uma categoria específica.'
    },
    hint: {
      es: 'Usá AND para combinar condiciones',
      en: 'Use AND to combine conditions',
      pt: 'Use AND para combinar condições'
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
    expectedQuery: "SELECT * FROM products WHERE category = 'Electronics' AND price < 500",
    expectedResult: [
      [2, 'Mouse', 29.99, 'Electronics'],
      [5, 'Monitor', 299.99, 'Electronics'],
    ],
  },
  // === NUEVOS EJERCICIOS EASY PARA JUNIORS ===
  {
    id: 'sql-f7',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['like', 'pattern', 'text search'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'LIKE - Búsqueda de patrones',
      en: 'LIKE - Pattern Matching',
      pt: 'LIKE - Busca de Padrões'
    },
    description: {
      es: 'Encontrá todos los productos cuyo nombre contenga "Monitor".',
      en: 'Find all products whose name contains "Monitor".',
      pt: 'Encontre todos os produtos cujo nome contenha "Monitor".'
    },
    theory: {
      es: `**LIKE** busca patrones en texto.

**Wildcards:**
- \`%\` = cualquier cantidad de caracteres
- \`_\` = exactamente un carácter

\`\`\`sql
WHERE nombre LIKE 'A%'      -- Empieza con A
WHERE nombre LIKE '%phone'  -- Termina con phone
WHERE nombre LIKE '%pro%'   -- Contiene pro
WHERE codigo LIKE 'AB_'     -- AB + un carácter
\`\`\`

**Case sensitivity:** Depende de la base de datos. Usá ILIKE (Postgres) o LOWER() para case-insensitive.`,
      en: `**LIKE** searches for patterns in text.

**Wildcards:**
- \`%\` = any number of characters
- \`_\` = exactly one character`,
      pt: `**LIKE** busca padrões em texto.

**Wildcards:**
- \`%\` = qualquer quantidade de caracteres
- \`_\` = exatamente um caractere

\`\`\`sql
WHERE nome LIKE 'A%'      -- Começa com A
WHERE nome LIKE '%phone'  -- Termina com phone
WHERE nome LIKE '%pro%'   -- Contém pro
WHERE codigo LIKE 'AB_'     -- AB + um caractere
\`\`\`

**Sensibilidade a maiúsculas/minúsculas:** Depende do banco de dados. Use ILIKE (Postgres) ou LOWER() para ignorar maiúsculas/minúsculas.`
    },
    realWorldExample: {
      es: 'Buscar clientes por nombre parcial.',
      en: 'Search customers by partial name.',
      pt: 'Buscar clientes por nome parcial.'
    },
    hint: {
      es: 'Usá LIKE con % antes y después',
      en: 'Use LIKE with % before and after',
      pt: 'Use LIKE com % antes e depois'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Monitor LG 24"', 299.99);
INSERT INTO products VALUES (2, 'Mouse Wireless', 29.99);
INSERT INTO products VALUES (3, 'Monitor Samsung 27"', 399.99);
INSERT INTO products VALUES (4, 'Keyboard', 49.99);
INSERT INTO products VALUES (5, 'Monitor Dell 32"', 499.99);`,
    expectedQuery: "SELECT * FROM products WHERE name LIKE '%Monitor%'",
    expectedResult: [
      [1, 'Monitor LG 24"', 299.99],
      [3, 'Monitor Samsung 27"', 399.99],
      [5, 'Monitor Dell 32"', 499.99],
    ],
  },
  {
    id: 'sql-f8',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['in', 'list', 'multiple values'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'IN - Lista de valores',
      en: 'IN - List of Values',
      pt: 'IN - Lista de Valores'
    },
    description: {
      es: 'Encontrá productos de las categorías "Electronics" o "Books".',
      en: 'Find products from categories "Electronics" or "Books".',
      pt: 'Encontre produtos das categorias "Electronics" ou "Books".'
    },
    theory: {
      es: `**IN** verifica si un valor está en una lista.

\`\`\`sql
-- Equivalente a múltiples OR
WHERE category IN ('Electronics', 'Books', 'Games')

-- Lo mismo pero más largo
WHERE category = 'Electronics' 
   OR category = 'Books' 
   OR category = 'Games'

-- NOT IN para excluir
WHERE category NOT IN ('Furniture')
\`\`\`

**Con subconsulta:**
\`\`\`sql
WHERE id IN (SELECT product_id FROM orders)
\`\`\``,
      en: `**IN** checks if a value is in a list.

Equivalent to multiple OR conditions. Can also use NOT IN to exclude.`,
      pt: `**IN** verifica se um valor está em uma lista.

\`\`\`sql
-- Equivalente a múltiplos OR
WHERE category IN ('Electronics', 'Books', 'Games')

-- O mesmo, mas mais longo
WHERE category = 'Electronics' 
   OR category = 'Books' 
   OR category = 'Games'

-- NOT IN para excluir
WHERE category NOT IN ('Furniture')
\`\`\`

**Com subconsulta:**
\`\`\`sql
WHERE id IN (SELECT product_id FROM orders)
\`\`\``
    },
    realWorldExample: {
      es: 'Filtrar pedidos de ciertos estados (pending, processing).',
      en: 'Filter orders by certain statuses (pending, processing).',
      pt: 'Filtrar pedidos de certos status (pending, processing).'
    },
    hint: {
      es: 'Usá IN con los valores entre paréntesis',
      en: 'Use IN with values in parentheses',
      pt: 'Use IN com os valores entre parênteses'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, category TEXT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 'Electronics');
INSERT INTO products VALUES (2, 'Python Book', 'Books');
INSERT INTO products VALUES (3, 'Desk', 'Furniture');
INSERT INTO products VALUES (4, 'SQL Guide', 'Books');
INSERT INTO products VALUES (5, 'Monitor', 'Electronics');`,
    expectedQuery: "SELECT * FROM products WHERE category IN ('Electronics', 'Books')",
    expectedResult: [
      [1, 'Laptop', 'Electronics'],
      [2, 'Python Book', 'Books'],
      [4, 'SQL Guide', 'Books'],
      [5, 'Monitor', 'Electronics'],
    ],
  },
  {
    id: 'sql-f9',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['between', 'range'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'BETWEEN - Rango de valores',
      en: 'BETWEEN - Range of Values',
      pt: 'BETWEEN - Intervalo de Valores'
    },
    description: {
      es: 'Encontrá productos con precio entre 100 y 300.',
      en: 'Find products with price between 100 and 300.',
      pt: 'Encontre produtos com preço entre 100 e 300.'
    },
    theory: {
      es: `**BETWEEN** verifica si un valor está en un rango (inclusivo).

\`\`\`sql
-- Equivalente a >= AND <=
WHERE price BETWEEN 100 AND 300

-- Lo mismo
WHERE price >= 100 AND price <= 300

-- Con fechas
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31'

-- NOT BETWEEN para excluir
WHERE price NOT BETWEEN 100 AND 300
\`\`\`

**Importante:** BETWEEN es INCLUSIVO en ambos extremos.`,
      en: `**BETWEEN** checks if a value is in a range (inclusive).

Equivalent to >= AND <=. BETWEEN is INCLUSIVE on both ends.`,
      pt: `**BETWEEN** verifica se um valor está em um intervalo (inclusivo).

\`\`\`sql
-- Equivalente a >= AND <=
WHERE price BETWEEN 100 AND 300

-- O mesmo
WHERE price >= 100 AND price <= 300

-- Com datas
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31'

-- NOT BETWEEN para excluir
WHERE price NOT BETWEEN 100 AND 300
\`\`\`

**Importante:** BETWEEN é INCLUSIVO em ambas as extremidades.`
    },
    realWorldExample: {
      es: 'Filtrar ventas de un período específico.',
      en: 'Filter sales from a specific period.',
      pt: 'Filtrar vendas de um período específico.'
    },
    hint: {
      es: 'Usá BETWEEN con los límites',
      en: 'Use BETWEEN with the limits',
      pt: 'Use BETWEEN com os limites'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 999.99);
INSERT INTO products VALUES (2, 'Mouse', 29.99);
INSERT INTO products VALUES (3, 'Monitor', 299.99);
INSERT INTO products VALUES (4, 'Keyboard', 149.99);
INSERT INTO products VALUES (5, 'Headphones', 199.99);`,
    expectedQuery: "SELECT * FROM products WHERE price BETWEEN 100 AND 300",
    expectedResult: [
      [3, 'Monitor', 299.99],
      [4, 'Keyboard', 149.99],
      [5, 'Headphones', 199.99],
    ],
  },
  {
    id: 'sql-f10',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['null', 'is null', 'is not null'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'IS NULL - Valores nulos',
      en: 'IS NULL - Null Values',
      pt: 'IS NULL - Valores Nulos'
    },
    description: {
      es: 'Encontrá clientes que NO tienen email registrado.',
      en: 'Find customers who do NOT have an email registered.',
      pt: 'Encontre clientes que NÃO têm e-mail registrado.'
    },
    theory: {
      es: `**NULL** representa ausencia de valor. NO es igual a 0 o string vacío.

\`\`\`sql
-- ❌ INCORRECTO (NULL no es igual a nada)
WHERE email = NULL

-- ✅ CORRECTO
WHERE email IS NULL
WHERE email IS NOT NULL

-- COALESCE para valor por defecto
SELECT COALESCE(email, 'sin-email@default.com') FROM users
\`\`\`

**Importante:** NULL en cualquier operación = NULL
- NULL + 5 = NULL
- NULL = NULL → FALSE (no TRUE!)`,
      en: `**NULL** represents absence of value. It's NOT equal to 0 or empty string.

Use IS NULL / IS NOT NULL. NULL in any operation = NULL.`,
      pt: `**NULL** representa ausência de valor. NÃO é igual a 0 ou string vazia.

\`\`\`sql
-- ❌ INCORRETO (NULL não é igual a nada)
WHERE email = NULL

-- ✅ CORRETO
WHERE email IS NULL
WHERE email IS NOT NULL

-- COALESCE para valor padrão
SELECT COALESCE(email, 'sem-email@default.com') FROM users
\`\`\`

**Importante:** NULL em qualquer operação = NULL
- NULL + 5 = NULL
- NULL = NULL → FALSE (não TRUE!)`
    },
    realWorldExample: {
      es: 'Encontrar registros incompletos para limpieza de datos.',
      en: 'Find incomplete records for data cleaning.',
      pt: 'Encontrar registros incompletos para limpeza de dados.'
    },
    hint: {
      es: 'Usá IS NULL, no = NULL',
      en: 'Use IS NULL, not = NULL',
      pt: 'Use IS NULL, não = NULL'
    },
    
    schema: `CREATE TABLE customers (id INT, name TEXT, email TEXT);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana García', 'ana@email.com');
INSERT INTO customers VALUES (2, 'Juan Pérez', NULL);
INSERT INTO customers VALUES (3, 'María López', 'maria@email.com');
INSERT INTO customers VALUES (4, 'Pedro Sánchez', NULL);
INSERT INTO customers VALUES (5, 'Laura Martín', 'laura@email.com');`,
    expectedQuery: "SELECT * FROM customers WHERE email IS NULL",
    expectedResult: [
      [2, 'Juan Pérez', null],
      [4, 'Pedro Sánchez', null],
    ],
  },
  {
    id: 'sql-f11',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['alias', 'as', 'rename'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'AS - Alias de columnas',
      en: 'AS - Column Aliases',
      pt: 'AS - Alias de Colunas'
    },
    description: {
      es: 'Seleccioná nombre como "producto" y precio como "precio_usd".',
      en: 'Select name as "product" and price as "price_usd".',
      pt: 'Selecione o nome como "produto" e o preço como "preco_usd".'
    },
    theory: {
      es: `**AS** renombra columnas o tablas en el resultado.

\`\`\`sql
-- Alias de columna
SELECT name AS producto, price AS precio FROM products;

-- Alias de tabla (útil en JOINs)
SELECT p.name, c.name 
FROM products p
JOIN categories c ON p.cat_id = c.id;

-- Con expresiones
SELECT price * 0.9 AS precio_con_descuento FROM products;
\`\`\`

**Nota:** AS es opcional pero mejora legibilidad.`,
      en: `**AS** renames columns or tables in the result.

AS is optional but improves readability.`,
      pt: `**AS** renomeia colunas ou tabelas no resultado.

\`\`\`sql
-- Alias de coluna
SELECT name AS produto, price AS preco FROM products;

-- Alias de tabela (útil em JOINs)
SELECT p.name, c.name 
FROM products p
JOIN categories c ON p.cat_id = c.id;

-- Com expressões
SELECT price * 0.9 AS preco_com_desconto FROM products;
\`\`\`

**Nota:** AS é opcional, mas melhora a legibilidade.`
    },
    realWorldExample: {
      es: 'Crear reportes con nombres de columnas legibles.',
      en: 'Create reports with readable column names.',
      pt: 'Criar relatórios com nomes de colunas legíveis.'
    },
    hint: {
      es: 'Usá AS para renombrar',
      en: 'Use AS to rename',
      pt: 'Use AS para renomear'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 999.99);
INSERT INTO products VALUES (2, 'Mouse', 29.99);
INSERT INTO products VALUES (3, 'Monitor', 299.99);`,
    expectedQuery: "SELECT name AS producto, price AS precio_usd FROM products",
    expectedResult: [
      ['Laptop', 999.99],
      ['Mouse', 29.99],
      ['Monitor', 299.99],
    ],
  },
  {
    id: 'sql-f12',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['select columns', 'specific columns'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'SELECT columnas específicas',
      en: 'SELECT Specific Columns',
      pt: 'SELECT Colunas Específicas'
    },
    description: {
      es: 'Seleccioná solo el nombre y categoría de los productos.',
      en: 'Select only the name and category of products.',
      pt: 'Selecione apenas o nome e a categoria dos produtos.'
    },
    theory: {
      es: `**Seleccionar columnas específicas** es mejor práctica que SELECT *.

\`\`\`sql
-- ❌ Malo en producción
SELECT * FROM products;

-- ✅ Mejor
SELECT name, category FROM products;
\`\`\`

**¿Por qué evitar SELECT *?**
1. Transfiere datos innecesarios
2. Si agregan columnas, tu query cambia
3. No aprovecha índices covering
4. Menos claro qué datos usás`,
      en: `**Selecting specific columns** is better practice than SELECT *.

Avoid SELECT * in production: transfers unnecessary data, breaks if columns are added.`,
      pt: `**Selecionar colunas específicas** é uma melhor prática do que SELECT *.

\`\`\`sql
-- ❌ Ruim em produção
SELECT * FROM products;

-- ✅ Melhor
SELECT name, category FROM products;
\`\`\`

**Por que evitar SELECT *?**
1. Transfere dados desnecessários
2. Se adicionarem colunas, sua query muda
3. Não aproveita índices covering
4. Menos claro quais dados você usa`
    },
    realWorldExample: {
      es: 'APIs que solo necesitan ciertos campos.',
      en: 'APIs that only need certain fields.',
      pt: 'APIs que só precisam de certos campos.'
    },
    hint: {
      es: 'Listá las columnas separadas por coma',
      en: 'List columns separated by comma',
      pt: 'Liste as colunas separadas por vírgula'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL, category TEXT, stock INT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 999.99, 'Electronics', 10);
INSERT INTO products VALUES (2, 'Mouse', 29.99, 'Electronics', 50);
INSERT INTO products VALUES (3, 'Desk', 199.99, 'Furniture', 15);`,
    expectedQuery: "SELECT name, category FROM products",
    expectedResult: [
      ['Laptop', 'Electronics'],
      ['Mouse', 'Electronics'],
      ['Desk', 'Furniture'],
    ],
  },
  {
    id: 'sql-f13',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['order by', 'multiple columns', 'sort'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'ORDER BY múltiples columnas',
      en: 'ORDER BY Multiple Columns',
      pt: 'ORDER BY Múltiplas Colunas'
    },
    description: {
      es: 'Ordená productos por categoría (A-Z) y dentro de cada categoría por precio (mayor a menor).',
      en: 'Sort products by category (A-Z) and within each category by price (highest to lowest).',
      pt: 'Ordene produtos por categoria (A-Z) e dentro de cada categoria por preço (maior para menor).'
    },
    theory: {
      es: `**ORDER BY múltiple** ordena por prioridad.

\`\`\`sql
-- Primero por category ASC, luego por price DESC
ORDER BY category ASC, price DESC

-- Equivalente (ASC es default)
ORDER BY category, price DESC
\`\`\`

**Orden de evaluación:**
1. Ordena por primera columna
2. Dentro de valores iguales, ordena por segunda
3. Y así sucesivamente...`,
      en: `**Multiple ORDER BY** sorts by priority.

First sorts by first column, then within equal values sorts by second, etc.`,
      pt: `**ORDER BY múltiplo** ordena por prioridade.

\`\`\`sql
-- Primeiro por category ASC, depois por price DESC
ORDER BY category ASC, price DESC

-- Equivalente (ASC é padrão)
ORDER BY category, price DESC
\`\`\`

**Ordem de avaliação:**
1. Ordena pela primeira coluna
2. Dentro de valores iguais, ordena pela segunda
3. E assim sucessivamente...`
    },
    realWorldExample: {
      es: 'Ordenar empleados por departamento y dentro por salario.',
      en: 'Sort employees by department and within by salary.',
      pt: 'Ordenar funcionários por departamento e dentro por salário.'
    },
    hint: {
      es: 'Usá ORDER BY col1, col2 DESC',
      en: 'Use ORDER BY col1, col2 DESC',
      pt: 'Use ORDER BY col1, col2 DESC'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, price REAL, category TEXT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 999.99, 'Electronics');
INSERT INTO products VALUES (2, 'Mouse', 29.99, 'Electronics');
INSERT INTO products VALUES (3, 'Desk', 199.99, 'Furniture');
INSERT INTO products VALUES (4, 'Chair', 149.99, 'Furniture');
INSERT INTO products VALUES (5, 'Monitor', 299.99, 'Electronics');`,
    expectedQuery: "SELECT * FROM products ORDER BY category ASC, price DESC",
    expectedResult: [
      [1, 'Laptop', 999.99, 'Electronics'],
      [5, 'Monitor', 299.99, 'Electronics'],
      [2, 'Mouse', 29.99, 'Electronics'],
      [3, 'Desk', 199.99, 'Furniture'],
      [4, 'Chair', 149.99, 'Furniture'],
    ],
  },
  {
    id: 'sql-f14',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['concat', 'string', 'concatenation'],
    interviewFrequency: 'medium',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Concatenar strings',
      en: 'Concatenate Strings',
      pt: 'Concatenar Strings'
    },
    description: {
      es: 'Creá una columna "descripcion" que combine nombre y categoría: "Laptop (Electronics)".',
      en: 'Create a "description" column that combines name and category: "Laptop (Electronics)".',
      pt: 'Crie uma coluna "descricao" que combine nome e categoria: "Laptop (Electronics)".'
    },
    theory: {
      es: `**Concatenación de strings** varía por base de datos.

\`\`\`sql
-- SQLite, MySQL
SELECT name || ' (' || category || ')' FROM products;

-- MySQL también
SELECT CONCAT(name, ' (', category, ')') FROM products;

-- SQL Server
SELECT name + ' (' + category + ')' FROM products;
\`\`\`

**Manejo de NULL:**
- || con NULL = NULL
- CONCAT ignora NULLs en algunos DBs`,
      en: `**String concatenation** varies by database.

SQLite uses ||, MySQL uses CONCAT(), SQL Server uses +.`,
      pt: `**Concatenação de strings** varia por banco de dados.

\`\`\`sql
-- SQLite, MySQL
SELECT name || ' (' || category || ')' FROM products;

-- MySQL também
SELECT CONCAT(name, ' (', category, ')') FROM products;

-- SQL Server
SELECT name + ' (' + category + ')' FROM products;
\`\`\`

**Tratamento de NULL:**
- || com NULL = NULL
- CONCAT ignora NULLs em alguns bancos de dados`
    },
    realWorldExample: {
      es: 'Crear nombres completos (nombre + apellido).',
      en: 'Create full names (first + last name).',
      pt: 'Criar nomes completos (nome + sobrenome).'
    },
    hint: {
      es: 'En SQLite usá || para concatenar',
      en: 'In SQLite use || to concatenate',
      pt: 'No SQLite use || para concatenar'
    },
    
    schema: `CREATE TABLE products (id INT, name TEXT, category TEXT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Laptop', 'Electronics');
INSERT INTO products VALUES (2, 'Desk', 'Furniture');
INSERT INTO products VALUES (3, 'Monitor', 'Electronics');`,
    expectedQuery: "SELECT name || ' (' || category || ')' AS descripcion FROM products",
    expectedResult: [
      ['Laptop (Electronics)'],
      ['Desk (Furniture)'],
      ['Monitor (Electronics)'],
    ],
  },
  {
    id: 'sql-f15',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['between', 'range', 'filter'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Filtrar por rango de fechas',
      en: 'Filter by Date Range',
      pt: 'Filtrar por Intervalo de Datas'
    },
    description: {
      es: 'Encontrá todas las órdenes realizadas entre el 1 y el 15 de enero de 2024.',
      en: 'Find all orders placed between January 1st and 15th, 2024.',
      pt: 'Encontre todos os pedidos feitos entre 1º e 15 de janeiro de 2024.'
    },
    theory: {
      es: `**BETWEEN** es ideal para rangos (fechas, números).

\`\`\`sql
-- Incluye ambos extremos
SELECT * FROM orders 
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-15';

-- Equivalente a:
WHERE order_date >= '2024-01-01' AND order_date <= '2024-01-15'
\`\`\`

**⚠️ Cuidado con fechas con hora:**
- '2024-01-15' = '2024-01-15 00:00:00'
- Órdenes del 15 a las 10:00 NO se incluyen`,
      en: `**BETWEEN** is ideal for ranges (dates, numbers). It includes both endpoints.`,
      pt: `**BETWEEN** é ideal para intervalos (datas, números).

\`\`\`sql
-- Inclui ambos os extremos
SELECT * FROM orders 
WHERE order_date BETWEEN '2024-01-01' AND '2024-01-15';

-- Equivalente a:
WHERE order_date >= '2024-01-01' AND order_date <= '2024-01-15'
\`\`\`

**⚠️ Cuidado com datas com hora:**
- '2024-01-15' = '2024-01-15 00:00:00'
- Pedidos do dia 15 às 10:00 NÃO são incluídos`
    },
    realWorldExample: {
      es: 'Reportes mensuales, análisis de campañas por período.',
      en: 'Monthly reports, campaign analysis by period.',
      pt: 'Relatórios mensais, análise de campanhas por período.'
    },
    hint: {
      es: 'Usá BETWEEN con las fechas en formato YYYY-MM-DD',
      en: 'Use BETWEEN with dates in YYYY-MM-DD format',
      pt: 'Use BETWEEN com as datas no formato YYYY-MM-DD'
    },
    
    schema: `CREATE TABLE orders (id INT, customer_id INT, order_date TEXT, total DECIMAL);`,
    sampleData: `INSERT INTO orders VALUES (1, 101, '2024-01-05', 150.00);
INSERT INTO orders VALUES (2, 102, '2024-01-10', 200.00);
INSERT INTO orders VALUES (3, 103, '2024-01-20', 300.00);
INSERT INTO orders VALUES (4, 104, '2024-01-12', 175.00);`,
    expectedQuery: "SELECT * FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-01-15'",
    expectedResult: [
      [1, 101, '2024-01-05', 150.00],
      [2, 102, '2024-01-10', 200.00],
      [4, 104, '2024-01-12', 175.00],
    ],
  },
  {
    id: 'sql-f16',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'fundamentals',
    tags: ['in', 'filter', 'list'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Filtrar con lista de valores',
      en: 'Filter with List of Values',
      pt: 'Filtrar com Lista de Valores'
    },
    description: {
      es: 'Encontrá todos los empleados que trabajan en los departamentos "Sales", "Marketing" o "IT".',
      en: 'Find all employees who work in "Sales", "Marketing", or "IT" departments.',
      pt: 'Encontre todos os funcionários que trabalham nos departamentos "Sales", "Marketing" ou "IT".'
    },
    theory: {
      es: `**IN** es más limpio que múltiples OR:

\`\`\`sql
-- ✅ Limpio y legible
SELECT * FROM employees 
WHERE department IN ('Sales', 'Marketing', 'IT');

-- ❌ Verbose y propenso a errores
SELECT * FROM employees 
WHERE department = 'Sales' 
   OR department = 'Marketing' 
   OR department = 'IT';
\`\`\`

**NOT IN** para excluir:
\`\`\`sql
WHERE department NOT IN ('HR', 'Finance')
\`\`\``,
      en: `**IN** is cleaner than multiple OR conditions. Use NOT IN to exclude values.`,
      pt: `**IN** é mais limpo do que múltiplos OR:

\`\`\`sql
-- ✅ Limpo e legível
SELECT * FROM employees 
WHERE department IN ('Sales', 'Marketing', 'IT');

-- ❌ Verborrágico e propenso a erros
SELECT * FROM employees 
WHERE department = 'Sales' 
   OR department = 'Marketing' 
   OR department = 'IT';
\`\`\`

**NOT IN** para excluir:
\`\`\`sql
WHERE department NOT IN ('HR', 'Finance')
\`\`\``
    },
    realWorldExample: {
      es: 'Filtrar productos por categorías específicas, usuarios por países.',
      en: 'Filter products by specific categories, users by countries.',
      pt: 'Filtrar produtos por categorias específicas, usuários por países.'
    },
    hint: {
      es: 'Usá IN con una lista de valores entre paréntesis',
      en: 'Use IN with a list of values in parentheses',
      pt: 'Use IN com uma lista de valores entre parênteses'
    },
    
    schema: `CREATE TABLE employees (id INT, name TEXT, department TEXT, salary DECIMAL);`,
    sampleData: `INSERT INTO employees VALUES (1, 'Ana', 'Sales', 50000);
INSERT INTO employees VALUES (2, 'Carlos', 'IT', 65000);
INSERT INTO employees VALUES (3, 'María', 'HR', 45000);
INSERT INTO employees VALUES (4, 'Pedro', 'Marketing', 55000);
INSERT INTO employees VALUES (5, 'Laura', 'Finance', 60000);`,
    expectedQuery: "SELECT * FROM employees WHERE department IN ('Sales', 'Marketing', 'IT')",
    expectedResult: [
      [1, 'Ana', 'Sales', 50000],
      [2, 'Carlos', 'IT', 65000],
      [4, 'Pedro', 'Marketing', 55000],
    ],
  },
];

export default SQL_FUNDAMENTALS;
