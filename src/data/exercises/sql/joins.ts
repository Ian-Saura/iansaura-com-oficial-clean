/**
 * SQL JOIN Exercises
 * INNER, LEFT, RIGHT, Self JOIN
 */

import { SQLExercise } from '../types';

export const SQL_JOINS: SQLExercise[] = [
  {
    id: 'sql-j1',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'joins',
    tags: ['inner join', 'join'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'INNER JOIN',
      en: 'INNER JOIN',
      pt: 'INNER JOIN'
    },
    description: {
      es: 'Uní orders con customers para mostrar el nombre del cliente en cada orden.',
      en: 'Join orders with customers to show customer name in each order.',
      pt: 'Junte orders com customers para mostrar o nome do cliente em cada pedido.'
    },
    theory: {
      es: `**INNER JOIN** devuelve filas con coincidencia en AMBAS tablas.

\`\`\`sql
SELECT o.*, c.name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

**Visualización:**
\`\`\`
Orders    Customers    INNER JOIN
id|c_id   id|name      id|c_id|name
1 | 101   101|María    1 |101 |María
2 | 102   102|Juan     2 |102 |Juan
3 | 999   103|Ana      (orden 3 excluida)
\`\`\``,
      en: `**INNER JOIN** returns rows with matches in BOTH tables.

\`\`\`sql
SELECT o.*, c.name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

**Visualization:**
\`\`\`
Orders    Customers    INNER JOIN
id|c_id   id|name      id|c_id|name
1 | 101   101|María    1 |101 |María
2 | 102   102|Juan     2 |102 |Juan
3 | 999   103|Ana      (order 3 excluded)
\`\`\``,
      pt: `**INNER JOIN** retorna linhas com correspondência em AMBAS as tabelas.

\`\`\`sql
SELECT o.*, c.name
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id;
\`\`\`

**Visualização:**
\`\`\`
Orders    Customers    INNER JOIN
id|c_id   id|name      id|c_id|name
1 | 101   101|María    1 |101 |María
2 | 102   102|Juan     2 |102 |Juan
3 | 999   103|Ana      (pedido 3 excluído)
\`\`\``
    },
    realWorldExample: {
      es: 'Mostrar pedidos con información del cliente.',
      en: 'Show orders with customer information.',
      pt: 'Mostrar pedidos com informações do cliente.'
    },
    hint: {
      es: 'Usá INNER JOIN customers ON orders.customer_id = customers.id',
      en: 'Use INNER JOIN customers ON orders.customer_id = customers.id',
      pt: 'Use INNER JOIN customers ON orders.customer_id = customers.id'
    },
    
    schema: `
      CREATE TABLE customers (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT
      );
      CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        total REAL,
        date TEXT
      );
    `,
    sampleData: `
      INSERT INTO customers VALUES (101, 'María García', 'maria@email.com');
      INSERT INTO customers VALUES (102, 'Juan Pérez', 'juan@email.com');
      INSERT INTO customers VALUES (103, 'Ana López', 'ana@email.com');
      INSERT INTO orders VALUES (1, 101, 150.00, '2024-01-15');
      INSERT INTO orders VALUES (2, 102, 89.99, '2024-01-16');
      INSERT INTO orders VALUES (3, 101, 250.00, '2024-01-17');
    `,
    expectedQuery: 'SELECT orders.id, orders.total, customers.name FROM orders INNER JOIN customers ON orders.customer_id = customers.id',
    expectedResult: [
      [1, 150.00, 'María García'],
      [2, 89.99, 'Juan Pérez'],
      [3, 250.00, 'María García'],
    ],
  },
  {
    id: 'sql-j2',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'joins',
    tags: ['left join', 'outer join'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'LEFT JOIN',
      en: 'LEFT JOIN',
      pt: 'LEFT JOIN'
    },
    description: {
      es: 'Mostrá todos los clientes y sus órdenes (incluyendo clientes sin órdenes).',
      en: 'Show all customers and their orders (including customers without orders).',
      pt: 'Mostre todos os clientes e seus pedidos (incluindo clientes sem pedidos).'
    },
    theory: {
      es: `**LEFT JOIN** devuelve TODAS las filas de la izquierda, NULL si no hay coincidencia.

\`\`\`
Customers    Orders       LEFT JOIN
id|name      id|c_id      name  |o_id|total
101|María    1 |101       María | 1  | 150
102|Juan     2 |101       María | 2  | 200
103|Ana                   Juan  |NULL| NULL
                          Ana   |NULL| NULL
\`\`\`

**Encontrar sin coincidencia:**
\`\`\`sql
SELECT c.* FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL; -- Clientes sin órdenes
\`\`\``,
      en: `**LEFT JOIN** returns ALL rows from the left, NULL if no match.

\`\`\`
Customers    Orders       LEFT JOIN
id|name      id|c_id      name  |o_id|total
101|María    1 |101       María | 1  | 150
102|Juan     2 |101       María | 2  | 200
103|Ana                   Juan  |NULL| NULL
                          Ana   |NULL| NULL
\`\`\`

**Find without match:**
\`\`\`sql
SELECT c.* FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL; -- Customers without orders
\`\`\``,
      pt: `**LEFT JOIN** retorna TODAS as linhas da esquerda, NULL se não houver correspondência.

\`\`\`
Customers    Orders       LEFT JOIN
id|name      id|c_id      name  |o_id|total
101|María    1 |101       María | 1  | 150
102|Juan     2 |101       María | 2  | 200
103|Ana                   Juan  |NULL| NULL
                          Ana   |NULL| NULL
\`\`\`

**Encontrar sem correspondência:**
\`\`\`sql
SELECT c.* FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL; -- Clientes sem pedidos
\`\`\``
    },
    realWorldExample: {
      es: 'Encontrar clientes sin compras, productos sin ventas.',
      en: 'Find customers without purchases, products without sales.',
      pt: 'Encontrar clientes sem compras, produtos sem vendas.'
    },
    hint: {
      es: 'Usá LEFT JOIN orders ON customers.id = orders.customer_id',
      en: 'Use LEFT JOIN orders ON customers.id = orders.customer_id',
      pt: 'Use LEFT JOIN orders ON customers.id = orders.customer_id'
    },
    
    schema: `
      CREATE TABLE customers (
        id INTEGER PRIMARY KEY,
        name TEXT
      );
      CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        total REAL
      );
    `,
    sampleData: `
      INSERT INTO customers VALUES (101, 'María García');
      INSERT INTO customers VALUES (102, 'Juan Pérez');
      INSERT INTO customers VALUES (103, 'Ana López');
      INSERT INTO orders VALUES (1, 101, 150.00);
      INSERT INTO orders VALUES (2, 101, 250.00);
    `,
    expectedQuery: 'SELECT customers.name, orders.total FROM customers LEFT JOIN orders ON customers.id = orders.customer_id',
    expectedResult: [
      ['María García', 150.00],
      ['María García', 250.00],
      ['Juan Pérez', null],
      ['Ana López', null],
    ],
  },
  {
    id: 'sql-j3',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'joins',
    tags: ['self join', 'hierarchy'],
    interviewFrequency: 'medium',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Self JOIN - Jerarquías',
      en: 'Self JOIN - Hierarchies',
      pt: 'Self JOIN - Hierarquias'
    },
    description: {
      es: 'Encontrá empleados y sus managers (ambos en la misma tabla).',
      en: 'Find employees and their managers (both in the same table).',
      pt: 'Encontre funcionários e seus gerentes (ambos na mesma tabela).'
    },
    theory: {
      es: `**Self JOIN** une una tabla consigo misma.

\`\`\`sql
-- Tabla employees: id, name, manager_id
SELECT 
  e.name as empleado,
  m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**Resultado:**
\`\`\`
empleado | manager
CEO      | NULL
VP       | CEO
Dev      | VP
\`\`\``,
      en: `**Self JOIN** joins a table with itself.

\`\`\`sql
-- Table employees: id, name, manager_id
SELECT 
  e.name as employee,
  m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**Result:**
\`\`\`
employee | manager
CEO      | NULL
VP       | CEO
Dev      | VP
\`\`\``,
      pt: `**Self JOIN** une uma tabela consigo mesma.

\`\`\`sql
-- Tabela employees: id, name, manager_id
SELECT 
  e.name as funcionario,
  m.name as gerente
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
\`\`\`

**Resultado:**
\`\`\`
funcionario | gerente
CEO         | NULL
VP          | CEO
Dev         | VP
\`\`\``
    },
    realWorldExample: {
      es: 'Organigramas, categorías padre/hijo.',
      en: 'Org charts, parent/child categories.',
      pt: 'Organogramas, categorias pai/filho.'
    },
    hint: {
      es: 'Uní employees consigo misma con alias diferentes (e, m)',
      en: 'Join employees with itself using different aliases (e, m)',
      pt: 'Junte employees consigo mesma com alias diferentes (e, m)'
    },
    
    schema: `
      CREATE TABLE employees (
        id INTEGER PRIMARY KEY,
        name TEXT,
        manager_id INTEGER
      );
    `,
    sampleData: `
      INSERT INTO employees VALUES (1, 'CEO', NULL);
      INSERT INTO employees VALUES (2, 'VP Engineering', 1);
      INSERT INTO employees VALUES (3, 'VP Sales', 1);
      INSERT INTO employees VALUES (4, 'Dev Senior', 2);
      INSERT INTO employees VALUES (5, 'Dev Junior', 2);
    `,
    expectedQuery: 'SELECT e.name as empleado, m.name as manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id',
    expectedResult: [
      ['CEO', null],
      ['VP Engineering', 'CEO'],
      ['VP Sales', 'CEO'],
      ['Dev Senior', 'VP Engineering'],
      ['Dev Junior', 'VP Engineering'],
    ],
  },
  {
    id: 'sql-j4',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'joins',
    tags: ['multiple joins', 'three tables'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Múltiples JOINs',
      en: 'Multiple JOINs',
      pt: 'Múltiplos JOINs'
    },
    description: {
      es: 'Uní orders, customers y products para un reporte completo.',
      en: 'Join orders, customers and products for a complete report.',
      pt: 'Junte orders, customers e products para um relatório completo.'
    },
    theory: {
      es: `**Múltiples JOINs** encadenados:

\`\`\`sql
SELECT 
  c.name as cliente,
  p.name as producto,
  oi.quantity,
  oi.quantity * p.price as subtotal
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;
\`\`\`

**Tip:** Usá alias cortos para legibilidad.`,
      en: `**Multiple JOINs** chained:

\`\`\`sql
SELECT 
  c.name as customer,
  p.name as product,
  oi.quantity,
  oi.quantity * p.price as subtotal
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;
\`\`\`

**Tip:** Use short aliases for readability.`,
      pt: `**Múltiplos JOINs** encadeados:

\`\`\`sql
SELECT 
  c.name as cliente,
  p.name as produto,
  oi.quantity,
  oi.quantity * p.price as subtotal
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id;
\`\`\`

**Dica:** Use alias curtos para legibilidade.`
    },
    realWorldExample: {
      es: 'Reporte de ventas con detalle de cliente y producto.',
      en: 'Sales report with customer and product details.',
      pt: 'Relatório de vendas com detalhes do cliente e produto.'
    },
    hint: {
      es: 'Encadená los JOINs uno tras otro',
      en: 'Chain the JOINs one after another',
      pt: 'Encadeie os JOINs um após o outro'
    },
    
    schema: `
      CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT);
      CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL);
      CREATE TABLE orders (
        id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        product_id INTEGER,
        quantity INTEGER
      );
    `,
    sampleData: `
      INSERT INTO customers VALUES (1, 'María');
      INSERT INTO customers VALUES (2, 'Juan');
      INSERT INTO products VALUES (1, 'Laptop', 999);
      INSERT INTO products VALUES (2, 'Mouse', 29);
      INSERT INTO orders VALUES (1, 1, 1, 1);
      INSERT INTO orders VALUES (2, 1, 2, 2);
      INSERT INTO orders VALUES (3, 2, 2, 1);
    `,
    expectedQuery: 'SELECT c.name as cliente, p.name as producto, o.quantity FROM orders o JOIN customers c ON o.customer_id = c.id JOIN products p ON o.product_id = p.id',
    expectedResult: [
      ['María', 'Laptop', 1],
      ['María', 'Mouse', 2],
      ['Juan', 'Mouse', 1],
    ],
  },
];

export default SQL_JOINS;
