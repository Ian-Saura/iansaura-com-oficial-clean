/**
 * SQL Optimization & Performance Exercises
 * Real interview questions about query optimization
 */

import { SQLExercise } from '../types';

export const SQL_OPTIMIZATION: SQLExercise[] = [
  {
    id: 'sql-opt-1',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'optimization',
    tags: ['index', 'explain', 'performance'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: { es: 'Evitar SELECT *', en: 'Avoid SELECT *', pt: 'Evitar SELECT *' },
    description: {
      es: 'Reescribí esta query para que sea más eficiente seleccionando solo las columnas necesarias.',
      en: 'Rewrite this query to be more efficient by selecting only necessary columns.',
      pt: 'Reescreva esta query para ser mais eficiente selecionando apenas as colunas necessárias.'
    },
    theory: {
      es: `**¿Por qué evitar SELECT *?**

1. **Más datos transferidos** - Columnas innecesarias consumen ancho de banda
2. **No usa índices covering** - Fuerza lectura de la tabla completa
3. **Problemas de mantenimiento** - Si agregan columnas, tu query cambia

\`\`\`sql
-- ❌ Malo
SELECT * FROM orders WHERE status = 'completed';

-- ✅ Bueno
SELECT order_id, customer_id, total, created_at 
FROM orders WHERE status = 'completed';
\`\`\``,
      en: `**Why avoid SELECT *?**

1. **More data transferred** - Unnecessary columns consume bandwidth
2. **Doesn't use covering indexes** - Forces full table read
3. **Maintenance issues** - If columns are added, your query changes`,
      pt: `**Por que evitar SELECT *?**

1. **Mais dados transferidos** - Colunas desnecessárias consomem largura de banda
2. **Não usa índices covering** - Força a leitura da tabela completa
3. **Problemas de manutenção** - Se adicionarem colunas, sua query muda

\`\`\`sql
-- ❌ Ruim
SELECT * FROM orders WHERE status = 'completed';

-- ✅ Bom
SELECT order_id, customer_id, total, created_at 
FROM orders WHERE status = 'completed';
\`\`\``
    },
    realWorldExample: { es: 'Queries en dashboards que solo necesitan pocas columnas.', en: 'Dashboard queries that only need a few columns.', pt: 'Queries em dashboards que só precisam de poucas colunas.' },
    hint: { es: 'Seleccioná solo id, name y email', en: 'Select only id, name and email', pt: 'Selecione apenas id, name e email' },
    
    schema: `CREATE TABLE users (id INT, name TEXT, email TEXT, password TEXT, created_at TEXT, updated_at TEXT, settings TEXT);`,
    sampleData: `INSERT INTO users VALUES (1, 'Ana', 'ana@test.com', 'hash123', '2024-01-01', '2024-01-02', '{}');
    INSERT INTO users VALUES (2, 'Juan', 'juan@test.com', 'hash456', '2024-01-02', '2024-01-03', '{}');`,
    expectedQuery: 'SELECT id, name, email FROM users',
    expectedResult: [[1, 'Ana', 'ana@test.com'], [2, 'Juan', 'juan@test.com']],
  },
  {
    id: 'sql-opt-2',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'optimization',
    tags: ['sargable', 'index', 'where'],
    interviewFrequency: 'very_high',
    xpReward: 45,
    coinsReward: 20,
    
    title: { es: 'Queries SARGables', en: 'SARGable Queries', pt: 'Queries SARGables' },
    description: {
      es: 'Reescribí esta query para que pueda usar índices (SARGable).',
      en: 'Rewrite this query so it can use indexes (SARGable).',
      pt: 'Reescreva esta query para que possa usar índices (SARGable).'
    },
    theory: {
      es: `**SARG = Search ARGument able**

Una query es SARGable cuando puede usar índices. Evitá funciones en columnas del WHERE:

\`\`\`sql
-- ❌ No SARGable (no usa índice)
WHERE YEAR(created_at) = 2024
WHERE UPPER(name) = 'ANA'
WHERE price + 10 > 100

-- ✅ SARGable (usa índice)
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'
WHERE name = 'Ana'
WHERE price > 90
\`\`\``,
      en: `**SARG = Search ARGument able**

A query is SARGable when it can use indexes. Avoid functions on WHERE columns.`,
      pt: `**SARG = Search ARGument able**

Uma query é SARGable quando pode usar índices. Evite funções em colunas do WHERE:

\`\`\`sql
-- ❌ Não SARGable (não usa índice)
WHERE YEAR(created_at) = 2024
WHERE UPPER(name) = 'ANA'
WHERE price + 10 > 100

-- ✅ SARGable (usa índice)
WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'
WHERE name = 'Ana'
WHERE price > 90
\`\`\``
    },
    realWorldExample: { es: 'Queries de búsqueda que deben ser rápidas.', en: 'Search queries that must be fast.', pt: 'Queries de busca que devem ser rápidas.' },
    hint: { es: 'Usá BETWEEN o >= y < en lugar de funciones de fecha', en: 'Use BETWEEN or >= and < instead of date functions', pt: 'Use BETWEEN ou >= e < em vez de funções de data' },
    
    schema: `CREATE TABLE orders (id INT, total REAL, created_at TEXT);`,
    sampleData: `INSERT INTO orders VALUES (1, 100, '2024-01-15');
    INSERT INTO orders VALUES (2, 200, '2024-02-20');
    INSERT INTO orders VALUES (3, 150, '2023-12-25');`,
    expectedQuery: "SELECT * FROM orders WHERE created_at >= '2024-01-01' AND created_at < '2025-01-01'",
    expectedResult: [[1, 100, '2024-01-15'], [2, 200, '2024-02-20']],
  },
  {
    id: 'sql-opt-3',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'optimization',
    tags: ['exists', 'in', 'performance'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: { es: 'EXISTS vs IN', en: 'EXISTS vs IN', pt: 'EXISTS vs IN' },
    description: {
      es: 'Reescribí usando EXISTS en lugar de IN para mejor performance con tablas grandes.',
      en: 'Rewrite using EXISTS instead of IN for better performance with large tables.',
      pt: 'Reescreva usando EXISTS em vez de IN para melhor performance com tabelas grandes.'
    },
    theory: {
      es: `**EXISTS vs IN:**

- **IN**: Ejecuta la subconsulta completa primero
- **EXISTS**: Para en el primer match (más eficiente)

\`\`\`sql
-- Con IN (evalúa todos los valores)
SELECT * FROM customers 
WHERE id IN (SELECT customer_id FROM orders);

-- Con EXISTS (para en primer match)
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
\`\`\`

**Regla general:** EXISTS es mejor cuando la subconsulta devuelve muchos resultados.`,
      en: `**EXISTS vs IN:**

- **IN**: Executes full subquery first
- **EXISTS**: Stops at first match (more efficient)`,
      pt: `**EXISTS vs IN:**

- **IN**: Executa a subconsulta completa primeiro
- **EXISTS**: Para na primeira correspondência (mais eficiente)

\`\`\`sql
-- Com IN (avalia todos os valores)
SELECT * FROM customers 
WHERE id IN (SELECT customer_id FROM orders);

-- Com EXISTS (para na primeira correspondência)
SELECT * FROM customers c
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id);
\`\`\`

**Regra geral:** EXISTS é melhor quando a subconsulta retorna muitos resultados.`
    },
    realWorldExample: { es: 'Verificar si un cliente tiene órdenes.', en: 'Check if a customer has orders.', pt: 'Verificar se um cliente tem pedidos.' },
    hint: { es: 'Usá EXISTS con subconsulta correlacionada', en: 'Use EXISTS with correlated subquery', pt: 'Use EXISTS com subconsulta correlacionada' },
    
    schema: `CREATE TABLE customers (id INT, name TEXT);
    CREATE TABLE orders (id INT, customer_id INT, total REAL);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana');
    INSERT INTO customers VALUES (2, 'Juan');
    INSERT INTO customers VALUES (3, 'María');
    INSERT INTO orders VALUES (1, 1, 100);
    INSERT INTO orders VALUES (2, 3, 200);`,
    expectedQuery: 'SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id)',
    expectedResult: [[1, 'Ana'], [3, 'María']],
  },
  {
    id: 'sql-opt-4',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'optimization',
    tags: ['limit', 'pagination', 'offset'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: { es: 'Paginación eficiente', en: 'Efficient Pagination', pt: 'Paginação Eficiente' },
    description: {
      es: 'Implementá paginación para mostrar los registros 11-20 ordenados por fecha.',
      en: 'Implement pagination to show records 11-20 ordered by date.',
      pt: 'Implemente paginação para mostrar os registros 11-20 ordenados por data.'
    },
    theory: {
      es: `**Paginación con LIMIT y OFFSET:**

\`\`\`sql
-- Página 1 (registros 1-10)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 0;

-- Página 2 (registros 11-20)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 10;

-- Fórmula: OFFSET = (página - 1) * tamaño_página
\`\`\`

**⚠️ Problema:** OFFSET alto es lento porque escanea todos los registros anteriores.

**Solución para páginas altas:** Keyset pagination (WHERE id > last_id).`,
      en: `**Pagination with LIMIT and OFFSET:**

Formula: OFFSET = (page - 1) * page_size`,
      pt: `**Paginação com LIMIT e OFFSET:**

\`\`\`sql
-- Página 1 (registros 1-10)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 0;

-- Página 2 (registros 11-20)
SELECT * FROM products ORDER BY id LIMIT 10 OFFSET 10;

-- Fórmula: OFFSET = (página - 1) * tamanho_página
\`\`\`

**⚠️ Problema:** OFFSET alto é lento porque escaneia todos os registros anteriores.

**Solução para páginas altas:** Keyset pagination (WHERE id > last_id).`
    },
    realWorldExample: { es: 'Listados de productos en e-commerce.', en: 'Product listings in e-commerce.', pt: 'Listagens de produtos em e-commerce.' },
    hint: { es: 'LIMIT 10 OFFSET 10 para la segunda página', en: 'LIMIT 10 OFFSET 10 for second page', pt: 'LIMIT 10 OFFSET 10 para a segunda página' },
    
    schema: `CREATE TABLE products (id INT, name TEXT, created_at TEXT);`,
    sampleData: `INSERT INTO products VALUES (1, 'Prod1', '2024-01-01');
    INSERT INTO products VALUES (2, 'Prod2', '2024-01-02');
    INSERT INTO products VALUES (3, 'Prod3', '2024-01-03');
    INSERT INTO products VALUES (4, 'Prod4', '2024-01-04');
    INSERT INTO products VALUES (5, 'Prod5', '2024-01-05');`,
    expectedQuery: 'SELECT * FROM products ORDER BY created_at LIMIT 2 OFFSET 2',
    expectedResult: [[3, 'Prod3', '2024-01-03'], [4, 'Prod4', '2024-01-04']],
  },
  {
    id: 'sql-opt-5',
    type: 'sql',
    difficulty: 'expert',
    category: 'sql',
    subcategory: 'optimization',
    tags: ['union', 'union all', 'duplicates'],
    interviewFrequency: 'high',
    xpReward: 45,
    coinsReward: 20,
    
    title: { es: 'UNION vs UNION ALL', en: 'UNION vs UNION ALL', pt: 'UNION vs UNION ALL' },
    description: {
      es: 'Combiná dos tablas de logs usando UNION ALL (más eficiente cuando no hay duplicados).',
      en: 'Combine two log tables using UNION ALL (more efficient when no duplicates).',
      pt: 'Combine duas tabelas de logs usando UNION ALL (mais eficiente quando não há duplicatas).'
    },
    theory: {
      es: `**UNION vs UNION ALL:**

\`\`\`sql
-- UNION: Elimina duplicados (más lento, hace DISTINCT)
SELECT name FROM table1
UNION
SELECT name FROM table2;

-- UNION ALL: Mantiene duplicados (más rápido)
SELECT name FROM table1
UNION ALL
SELECT name FROM table2;
\`\`\`

**Regla:** Usá UNION ALL cuando sabés que no hay duplicados o no te importan.`,
      en: `**UNION vs UNION ALL:**

UNION removes duplicates (slower), UNION ALL keeps them (faster).`,
      pt: `**UNION vs UNION ALL:**

\`\`\`sql
-- UNION: Remove duplicatas (mais lento, faz DISTINCT)
SELECT name FROM table1
UNION
SELECT name FROM table2;

-- UNION ALL: Mantém duplicatas (mais rápido)
SELECT name FROM table1
UNION ALL
SELECT name FROM table2;
\`\`\`

**Regra:** Use UNION ALL quando você sabe que não há duplicatas ou não se importa com elas.`
    },
    realWorldExample: { es: 'Combinar logs de diferentes servidores.', en: 'Combine logs from different servers.', pt: 'Combinar logs de diferentes servidores.' },
    hint: { es: 'UNION ALL no elimina duplicados', en: 'UNION ALL does not remove duplicates', pt: 'UNION ALL não remove duplicatas' },
    
    schema: `CREATE TABLE logs_server1 (id INT, message TEXT, ts TEXT);
    CREATE TABLE logs_server2 (id INT, message TEXT, ts TEXT);`,
    sampleData: `INSERT INTO logs_server1 VALUES (1, 'Error A', '2024-01-01');
    INSERT INTO logs_server1 VALUES (2, 'Error B', '2024-01-02');
    INSERT INTO logs_server2 VALUES (3, 'Error C', '2024-01-01');
    INSERT INTO logs_server2 VALUES (4, 'Error D', '2024-01-02');`,
    expectedQuery: 'SELECT * FROM logs_server1 UNION ALL SELECT * FROM logs_server2',
    expectedResult: [[1, 'Error A', '2024-01-01'], [2, 'Error B', '2024-01-02'], [3, 'Error C', '2024-01-01'], [4, 'Error D', '2024-01-02']],
  },
];

export default SQL_OPTIMIZATION;
