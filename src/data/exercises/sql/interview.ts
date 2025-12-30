/**
 * SQL Real Interview Questions
 * Common patterns asked in FAANG and top tech companies
 */

import { SQLExercise } from '../types';

export const SQL_INTERVIEW: SQLExercise[] = [
  // === SECOND HIGHEST / NTH VALUE ===
  {
    id: 'sql-int-second-highest',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'interview',
    tags: ['nth value', 'classic', 'amazon'],
    interviewFrequency: 'very_high',
    xpReward: 35,
    coinsReward: 15,
    
    title: { es: 'Segundo salario más alto (Clásico Amazon)', en: 'Second Highest Salary (Amazon Classic)', pt: 'Segundo maior salário (Clássico Amazon)' },
    description: { es: 'Encontrá el segundo salario más alto. Si no existe, devolvé NULL.', en: 'Find the second highest salary. If none exists, return NULL.', pt: 'Encontre o segundo maior salário. Se não existir, retorne NULL.' },
    theory: {
      es: `**Múltiples formas de resolver:**

\`\`\`sql
-- Método 1: LIMIT OFFSET
SELECT DISTINCT salary FROM employees 
ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Método 2: Subconsulta
SELECT MAX(salary) FROM employees 
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Método 3: DENSE_RANK (más flexible para Nth)
SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rn
  FROM employees
) t WHERE rn = 2;
\`\`\``,
      en: `**Multiple ways to solve:**

Method 1: LIMIT OFFSET, Method 2: Subquery, Method 3: DENSE_RANK`,
      pt: `**Múltiplas formas de resolver:**

\`\`\`sql
-- Método 1: LIMIT OFFSET
SELECT DISTINCT salary FROM employees 
ORDER BY salary DESC LIMIT 1 OFFSET 1;

-- Método 2: Subconsulta
SELECT MAX(salary) FROM employees 
WHERE salary < (SELECT MAX(salary) FROM employees);

-- Método 3: DENSE_RANK (mais flexível para N-ésimo)
SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rn
  FROM employees
) t WHERE rn = 2;
\`\`\``
    },
    realWorldExample: { es: 'Pregunta clásica de Amazon, Google, Meta.', en: 'Classic Amazon, Google, Meta question.', pt: 'Pergunta clássica da Amazon, Google, Meta.' },
    hint: { es: 'Usá LIMIT 1 OFFSET 1 o MAX con subconsulta', en: 'Use LIMIT 1 OFFSET 1 or MAX with subquery', pt: 'Use LIMIT 1 OFFSET 1 ou MAX com subconsulta' },
    
    schema: `CREATE TABLE employees (id INT, name TEXT, salary INT);`,
    sampleData: `INSERT INTO employees VALUES (1, 'Ana', 100000);
    INSERT INTO employees VALUES (2, 'Juan', 80000);
    INSERT INTO employees VALUES (3, 'María', 120000);
    INSERT INTO employees VALUES (4, 'Pedro', 80000);`,
    expectedQuery: 'SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1',
    expectedResult: [[100000]],
  },
  
  // === DUPLICATE EMAILS ===
  {
    id: 'sql-int-duplicates',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'interview',
    tags: ['duplicates', 'group by', 'having', 'leetcode'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: { es: 'Emails duplicados (LeetCode #182)', en: 'Duplicate Emails (LeetCode #182)', pt: 'E-mails duplicados (LeetCode #182)' },
    description: { es: 'Encontrá todos los emails que aparecen más de una vez.', en: 'Find all emails that appear more than once.', pt: 'Encontre todos os e-mails que aparecem mais de uma vez.' },
    theory: {
      es: `**Encontrar duplicados con GROUP BY + HAVING:**

\`\`\`sql
SELECT email
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
\`\`\`

**HAVING** filtra después del GROUP BY (a diferencia de WHERE que filtra antes).`,
      en: `**Find duplicates with GROUP BY + HAVING:**

HAVING filters after GROUP BY (unlike WHERE which filters before).`,
      pt: `**Encontrar duplicatas com GROUP BY + HAVING:**

\`\`\`sql
SELECT email
FROM users
GROUP BY email
HAVING COUNT(*) > 1;
\`\`\`

**HAVING** filtra depois do GROUP BY (ao contrário do WHERE que filtra antes).`
    },
    realWorldExample: { es: 'Limpiar base de datos de usuarios duplicados.', en: 'Clean database of duplicate users.', pt: 'Limpar banco de dados de usuários duplicados.' },
    hint: { es: 'GROUP BY email HAVING COUNT(*) > 1', en: 'GROUP BY email HAVING COUNT(*) > 1', pt: 'GROUP BY email HAVING COUNT(*) > 1' },
    
    schema: `CREATE TABLE users (id INT, email TEXT);`,
    sampleData: `INSERT INTO users VALUES (1, 'a@test.com');
    INSERT INTO users VALUES (2, 'b@test.com');
    INSERT INTO users VALUES (3, 'a@test.com');
    INSERT INTO users VALUES (4, 'c@test.com');
    INSERT INTO users VALUES (5, 'b@test.com');`,
    expectedQuery: 'SELECT email FROM users GROUP BY email HAVING COUNT(*) > 1',
    expectedResult: [['a@test.com'], ['b@test.com']],
  },
  
  // === CONSECUTIVE NUMBERS ===
  {
    id: 'sql-int-consecutive',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'interview',
    tags: ['consecutive', 'lag', 'lead', 'leetcode'],
    interviewFrequency: 'high',
    xpReward: 45,
    coinsReward: 20,
    
    title: { es: 'Números consecutivos (LeetCode #180)', en: 'Consecutive Numbers (LeetCode #180)', pt: 'Números Consecutivos (LeetCode #180)' },
    description: { es: 'Encontrá números que aparecen al menos 3 veces consecutivas.', en: 'Find numbers that appear at least 3 times consecutively.', pt: 'Encontre números que aparecem pelo menos 3 vezes consecutivas.' },
    theory: {
      es: `**Usar LAG/LEAD para comparar filas adyacentes:**

\`\`\`sql
SELECT DISTINCT num FROM (
  SELECT num,
    LAG(num, 1) OVER (ORDER BY id) as prev1,
    LAG(num, 2) OVER (ORDER BY id) as prev2
  FROM logs
) t
WHERE num = prev1 AND num = prev2;
\`\`\`

O con self-join:
\`\`\`sql
SELECT DISTINCT l1.num
FROM logs l1, logs l2, logs l3
WHERE l1.id = l2.id - 1 AND l2.id = l3.id - 1
  AND l1.num = l2.num AND l2.num = l3.num;
\`\`\``,
      en: `**Use LAG/LEAD to compare adjacent rows.**`,
      pt: `**Use LAG/LEAD para comparar linhas adjacentes:**

\`\`\`sql
SELECT DISTINCT num FROM (
  SELECT num,
    LAG(num, 1) OVER (ORDER BY id) as prev1,
    LAG(num, 2) OVER (ORDER BY id) as prev2
  FROM logs
) t
WHERE num = prev1 AND num = prev2;
\`\`\``
    },
    realWorldExample: { es: 'Detectar patrones en logs, alertas repetidas.', en: 'Detect patterns in logs, repeated alerts.', pt: 'Detectar padrões em logs, alertas repetidos.' },
    hint: { es: 'Usá LAG para ver los 2 valores anteriores', en: 'Use LAG to see the 2 previous values', pt: 'Use LAG para ver os 2 valores anteriores' },
    
    schema: `CREATE TABLE logs (id INT, num INT);`,
    sampleData: `INSERT INTO logs VALUES (1, 1);
    INSERT INTO logs VALUES (2, 1);
    INSERT INTO logs VALUES (3, 1);
    INSERT INTO logs VALUES (4, 2);
    INSERT INTO logs VALUES (5, 1);
    INSERT INTO logs VALUES (6, 2);
    INSERT INTO logs VALUES (7, 2);`,
    expectedQuery: `SELECT DISTINCT num FROM (
      SELECT num, LAG(num, 1) OVER (ORDER BY id) as prev1, LAG(num, 2) OVER (ORDER BY id) as prev2 FROM logs
    ) t WHERE num = prev1 AND num = prev2`,
    expectedResult: [[1]],
  },
  
  // === DEPARTMENT HIGHEST SALARY ===
  {
    id: 'sql-int-dept-highest',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'interview',
    tags: ['max per group', 'join', 'leetcode'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: { es: 'Salario más alto por departamento (LeetCode #184)', en: 'Department Highest Salary (LeetCode #184)', pt: 'Maior Salário por Departamento (LeetCode #184)' },
    description: { es: 'Encontrá el empleado con mayor salario en cada departamento.', en: 'Find the employee with highest salary in each department.', pt: 'Encontre o funcionário com maior salário em cada departamento.' },
    theory: {
      es: `**Método 1: Subconsulta correlacionada**
\`\`\`sql
SELECT d.name as dept, e.name, e.salary
FROM employees e
JOIN departments d ON e.dept_id = d.id
WHERE e.salary = (
  SELECT MAX(salary) FROM employees 
  WHERE dept_id = e.dept_id
);
\`\`\`

**Método 2: Window function**
\`\`\`sql
SELECT dept, name, salary FROM (
  SELECT d.name as dept, e.name, e.salary,
    RANK() OVER (PARTITION BY e.dept_id ORDER BY e.salary DESC) as rn
  FROM employees e JOIN departments d ON e.dept_id = d.id
) t WHERE rn = 1;
\`\`\``,
      en: `**Method 1: Correlated subquery, Method 2: Window function**`,
      pt: `**Método 1: Subconsulta correlacionada**
**Método 2: Window function**`
    },
    realWorldExample: { es: 'Reportes de compensación por área.', en: 'Compensation reports by area.', pt: 'Relatórios de remuneração por área.' },
    hint: { es: 'Usá RANK() OVER (PARTITION BY dept)', en: 'Use RANK() OVER (PARTITION BY dept)', pt: 'Use RANK() OVER (PARTITION BY dept)' },
    
    schema: `CREATE TABLE departments (id INT, name TEXT);
    CREATE TABLE employees (id INT, name TEXT, salary INT, dept_id INT);`,
    sampleData: `INSERT INTO departments VALUES (1, 'IT');
    INSERT INTO departments VALUES (2, 'Sales');
    INSERT INTO employees VALUES (1, 'Ana', 100000, 1);
    INSERT INTO employees VALUES (2, 'Juan', 80000, 1);
    INSERT INTO employees VALUES (3, 'María', 90000, 2);
    INSERT INTO employees VALUES (4, 'Pedro', 95000, 2);`,
    expectedQuery: `SELECT d.name as dept, e.name, e.salary FROM employees e
    JOIN departments d ON e.dept_id = d.id
    WHERE e.salary = (SELECT MAX(salary) FROM employees WHERE dept_id = e.dept_id)`,
    expectedResult: [['IT', 'Ana', 100000], ['Sales', 'Pedro', 95000]],
  },
  
  // === CUSTOMERS WHO NEVER ORDER ===
  {
    id: 'sql-int-never-order',
    type: 'sql',
    difficulty: 'easy',
    category: 'sql',
    subcategory: 'interview',
    tags: ['left join', 'null', 'leetcode'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: { es: 'Clientes sin órdenes (LeetCode #183)', en: 'Customers Who Never Order (LeetCode #183)', pt: 'Clientes sem Pedidos (LeetCode #183)' },
    description: { es: 'Encontrá clientes que nunca hicieron una compra.', en: 'Find customers who never placed an order.', pt: 'Encontre clientes que nunca fizeram uma compra.' },
    theory: {
      es: `**Dos métodos principales:**

\`\`\`sql
-- Método 1: LEFT JOIN + IS NULL
SELECT c.name FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;

-- Método 2: NOT EXISTS
SELECT name FROM customers c
WHERE NOT EXISTS (SELECT 1 FROM orders WHERE customer_id = c.id);

-- Método 3: NOT IN
SELECT name FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);
\`\`\``,
      en: `**Two main methods:** LEFT JOIN + IS NULL, or NOT EXISTS`,
      pt: `**Dois métodos principais:** LEFT JOIN + IS NULL, ou NOT EXISTS`
    },
    realWorldExample: { es: 'Campañas de re-engagement para clientes inactivos.', en: 'Re-engagement campaigns for inactive customers.', pt: 'Campanhas de reengajamento para clientes inativos.' },
    hint: { es: 'LEFT JOIN y filtrá donde order.id IS NULL', en: 'LEFT JOIN and filter where order.id IS NULL', pt: 'LEFT JOIN e filtre onde order.id IS NULL' },
    
    schema: `CREATE TABLE customers (id INT, name TEXT);
    CREATE TABLE orders (id INT, customer_id INT);`,
    sampleData: `INSERT INTO customers VALUES (1, 'Ana');
    INSERT INTO customers VALUES (2, 'Juan');
    INSERT INTO customers VALUES (3, 'María');
    INSERT INTO orders VALUES (1, 1);
    INSERT INTO orders VALUES (2, 1);`,
    expectedQuery: 'SELECT c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL',
    expectedResult: [['Juan'], ['María']],
  },
  
  // === RISING TEMPERATURE ===
  {
    id: 'sql-int-rising-temp',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'interview',
    tags: ['self join', 'date', 'leetcode'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: { es: 'Temperatura creciente (LeetCode #197)', en: 'Rising Temperature (LeetCode #197)', pt: 'Temperatura Crescente (LeetCode #197)' },
    description: { es: 'Encontrá días donde la temperatura fue mayor que el día anterior.', en: 'Find days where temperature was higher than the previous day.', pt: 'Encontre dias onde a temperatura foi maior que no dia anterior.' },
    theory: {
      es: `**Comparar con el día anterior usando LAG o self-join:**

\`\`\`sql
-- Método 1: LAG
SELECT id FROM (
  SELECT id, temp, LAG(temp) OVER (ORDER BY date) as prev_temp
  FROM weather
) t WHERE temp > prev_temp;

-- Método 2: Self-join
SELECT w1.id FROM weather w1
JOIN weather w2 ON DATE(w1.date) = DATE(w2.date, '+1 day')
WHERE w1.temp > w2.temp;
\`\`\``,
      en: `**Compare with previous day using LAG or self-join**`,
      pt: `**Comparar com o dia anterior usando LAG ou self-join**`
    },
    realWorldExample: { es: 'Análisis de tendencias climáticas.', en: 'Climate trend analysis.', pt: 'Análise de tendências climáticas.' },
    hint: { es: 'Usá LAG() para obtener la temperatura del día anterior', en: 'Use LAG() to get previous day temperature', pt: 'Use LAG() para obter a temperatura do dia anterior' },
    
    schema: `CREATE TABLE weather (id INT, date TEXT, temp INT);`,
    sampleData: `INSERT INTO weather VALUES (1, '2024-01-01', 20);
    INSERT INTO weather VALUES (2, '2024-01-02', 25);
    INSERT INTO weather VALUES (3, '2024-01-03', 22);
    INSERT INTO weather VALUES (4, '2024-01-04', 28);`,
    expectedQuery: `SELECT id FROM (
      SELECT id, temp, LAG(temp) OVER (ORDER BY date) as prev_temp FROM weather
    ) t WHERE temp > prev_temp`,
    expectedResult: [[2], [4]],
  },
  
  // === DELETE DUPLICATES ===
  {
    id: 'sql-int-delete-dups',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'interview',
    tags: ['delete', 'duplicates', 'leetcode'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: { es: 'Identificar duplicados a eliminar (LeetCode #196)', en: 'Identify Duplicates to Delete (LeetCode #196)', pt: 'Identificar Duplicatas para Excluir (LeetCode #196)' },
    description: { es: 'Encontrá los IDs de emails duplicados que deberían eliminarse (mantener el menor ID).', en: 'Find IDs of duplicate emails that should be deleted (keep smallest ID).', pt: 'Encontre os IDs de e-mails duplicados que deveriam ser excluídos (manter o menor ID).' },
    theory: {
      es: `**Encontrar duplicados manteniendo el menor ID:**

\`\`\`sql
-- Encontrar IDs a eliminar
SELECT p1.id FROM person p1
JOIN person p2 ON p1.email = p2.email AND p1.id > p2.id;

-- Con window function
SELECT id FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as rn
  FROM person
) t WHERE rn > 1;
\`\`\``,
      en: `**Find duplicates keeping smallest ID**`,
      pt: `**Encontrar duplicatas mantendo o menor ID**`
    },
    realWorldExample: { es: 'Limpieza de datos, deduplicación.', en: 'Data cleaning, deduplication.', pt: 'Limpeza de dados, deduplicação.' },
    hint: { es: 'Self-join donde email es igual pero ID es mayor', en: 'Self-join where email equals but ID is greater', pt: 'Self-join onde o email é igual, mas o ID é maior' },
    
    schema: `CREATE TABLE person (id INT, email TEXT);`,
    sampleData: `INSERT INTO person VALUES (1, 'a@test.com');
    INSERT INTO person VALUES (2, 'b@test.com');
    INSERT INTO person VALUES (3, 'a@test.com');
    INSERT INTO person VALUES (4, 'a@test.com');`,
    expectedQuery: 'SELECT p1.id FROM person p1 JOIN person p2 ON p1.email = p2.email AND p1.id > p2.id',
    expectedResult: [[3], [4]],
  },
  
  // === RANK SCORES ===
  {
    id: 'sql-int-rank-scores',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'interview',
    tags: ['dense_rank', 'ranking', 'leetcode'],
    interviewFrequency: 'very_high',
    xpReward: 35,
    coinsReward: 15,
    
    title: { es: 'Rankear puntajes (LeetCode #178)', en: 'Rank Scores (LeetCode #178)', pt: 'Classificar Pontuações (LeetCode #178)' },
    description: { es: 'Rankeá los puntajes sin saltar números (DENSE_RANK).', en: 'Rank scores without skipping numbers (DENSE_RANK).', pt: 'Classifique as pontuações sem pular números (DENSE_RANK).' },
    theory: {
      es: `**RANK vs DENSE_RANK vs ROW_NUMBER:**

\`\`\`sql
-- Datos: 100, 100, 90, 80

-- ROW_NUMBER: 1, 2, 3, 4 (siempre único)
-- RANK:       1, 1, 3, 4 (salta después de empates)
-- DENSE_RANK: 1, 1, 2, 3 (no salta)

SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) as rank
FROM scores;
\`\`\``,
      en: `**RANK vs DENSE_RANK vs ROW_NUMBER:**

ROW_NUMBER: always unique, RANK: skips after ties, DENSE_RANK: no gaps`,
      pt: `**RANK vs DENSE_RANK vs ROW_NUMBER:**

ROW_NUMBER: sempre único, RANK: pula após empates, DENSE_RANK: sem lacunas`
    },
    realWorldExample: { es: 'Leaderboards, rankings de ventas.', en: 'Leaderboards, sales rankings.', pt: 'Leaderboards, rankings de vendas.' },
    hint: { es: 'DENSE_RANK() no salta números', en: 'DENSE_RANK() does not skip numbers', pt: 'DENSE_RANK() não pula números' },
    
    schema: `CREATE TABLE scores (id INT, score INT);`,
    sampleData: `INSERT INTO scores VALUES (1, 100);
    INSERT INTO scores VALUES (2, 100);
    INSERT INTO scores VALUES (3, 90);
    INSERT INTO scores VALUES (4, 80);`,
    expectedQuery: 'SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) as rank FROM scores',
    expectedResult: [[100, 1], [100, 1], [90, 2], [80, 3]],
  },
  
  // === NTH HIGHEST ===
  {
    id: 'sql-int-nth-highest',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'interview',
    tags: ['nth value', 'variable', 'leetcode'],
    interviewFrequency: 'high',
    xpReward: 40,
    coinsReward: 18,
    
    title: { es: 'N-ésimo salario más alto', en: 'Nth Highest Salary', pt: 'N-ésimo Maior Salário' },
    description: { es: 'Encontrá el 3er salario más alto.', en: 'Find the 3rd highest salary.', pt: 'Encontre o 3º maior salário.' },
    theory: {
      es: `**Patrón genérico para N-ésimo valor:**

\`\`\`sql
-- Con DENSE_RANK (maneja empates correctamente)
SELECT DISTINCT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rn
  FROM employees
) t WHERE rn = 3;  -- Cambiar 3 por N

-- Con LIMIT OFFSET
SELECT DISTINCT salary FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 2;  -- OFFSET = N-1
\`\`\``,
      en: `**Generic pattern for Nth value:**

Use DENSE_RANK or LIMIT OFFSET`,
      pt: `**Padrão genérico para o N-ésimo valor:**

Use DENSE_RANK ou LIMIT OFFSET`
    },
    realWorldExample: { es: 'Encontrar el N-ésimo mejor vendedor.', en: 'Find the Nth best salesperson.', pt: 'Encontrar o N-ésimo melhor vendedor.' },
    hint: { es: 'DENSE_RANK con WHERE rn = 3', en: 'DENSE_RANK with WHERE rn = 3', pt: 'DENSE_RANK com WHERE rn = 3' },
    
    schema: `CREATE TABLE employees (id INT, salary INT);`,
    sampleData: `INSERT INTO employees VALUES (1, 100);
    INSERT INTO employees VALUES (2, 200);
    INSERT INTO employees VALUES (3, 300);
    INSERT INTO employees VALUES (4, 400);
    INSERT INTO employees VALUES (5, 300);`,
    expectedQuery: `SELECT DISTINCT salary FROM (
      SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rn FROM employees
    ) t WHERE rn = 3`,
    expectedResult: [[200]],
  },
  
  // === MEDIAN ===
  {
    id: 'sql-int-median',
    type: 'sql',
    difficulty: 'expert',
    category: 'sql',
    subcategory: 'interview',
    tags: ['median', 'statistics', 'advanced'],
    interviewFrequency: 'medium',
    xpReward: 50,
    coinsReward: 25,
    
    title: { es: 'Calcular mediana', en: 'Calculate Median', pt: 'Calcular Mediana' },
    description: { es: 'Calculá la mediana de los salarios.', en: 'Calculate the median of salaries.', pt: 'Calcule a mediana dos salários.' },
    theory: {
      es: `**Mediana en SQL (sin función nativa):**

\`\`\`sql
-- Para número impar de filas
SELECT AVG(salary) as median FROM (
  SELECT salary FROM (
    SELECT salary, ROW_NUMBER() OVER (ORDER BY salary) as rn,
           COUNT(*) OVER () as total
    FROM employees
  ) t
  WHERE rn IN ((total + 1) / 2, (total + 2) / 2)
) t2;
\`\`\`

La mediana es el valor del medio (o promedio de los dos del medio si hay número par).`,
      en: `**Median in SQL (without native function):**

Median is the middle value (or average of two middle values for even count).`,
      pt: `**Mediana em SQL (sem função nativa):**

Mediana é o valor do meio (ou a média dos dois valores do meio se houver um número par).`
    },
    realWorldExample: { es: 'Estadísticas de compensación (mediana es mejor que promedio para salarios).', en: 'Compensation statistics (median is better than average for salaries).', pt: 'Estatísticas de remuneração (mediana é melhor que a média para salários).' },
    hint: { es: 'Usá ROW_NUMBER y COUNT para encontrar la posición del medio', en: 'Use ROW_NUMBER and COUNT to find middle position', pt: 'Use ROW_NUMBER e COUNT para encontrar a posição do meio' },
    
    schema: `CREATE TABLE employees (id INT, salary INT);`,
    sampleData: `INSERT INTO employees VALUES (1, 100);
    INSERT INTO employees VALUES (2, 200);
    INSERT INTO employees VALUES (3, 300);
    INSERT INTO employees VALUES (4, 400);
    INSERT INTO employees VALUES (5, 500);`,
    expectedQuery: `SELECT salary as median FROM (
      SELECT salary, ROW_NUMBER() OVER (ORDER BY salary) as rn, COUNT(*) OVER () as total FROM employees
    ) t WHERE rn = (total + 1) / 2`,
    expectedResult: [[300]],
  },
  
  // === FACEBOOK/META CLASSICS ===
  {
    id: 'sql-int-friend-requests',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'interview',
    tags: ['self-join', 'meta', 'facebook'],
    interviewFrequency: 'very_high',
    xpReward: 50,
    coinsReward: 25,
    
    title: { es: 'Aceptación de solicitudes de amistad (Meta)', en: 'Friend Request Acceptance Rate (Meta)', pt: 'Taxa de Aceitação de Solicitações de Amizade (Meta)' },
    description: { es: 'Calculá la tasa de aceptación de solicitudes de amistad.', en: 'Calculate the friend request acceptance rate.', pt: 'Calcule a taxa de aceitação de solicitações de amizade.' },
    theory: {
      es: `**Problema clásico de Meta:**
Tenés dos tablas: friend_requests (enviadas) y friend_accepts (aceptadas).
Calculá: aceptadas / enviadas.

\`\`\`sql
SELECT 
  ROUND(
    COUNT(DISTINCT a.sender_id, a.receiver_id) * 1.0 / 
    COUNT(DISTINCT r.sender_id, r.receiver_id),
    2
  ) as accept_rate
FROM friend_requests r
LEFT JOIN friend_accepts a 
  ON r.sender_id = a.sender_id AND r.receiver_id = a.receiver_id;
\`\`\``,
      en: `Classic Meta problem: Calculate acceptance rate from friend_requests and friend_accepts tables.`,
      pt: `Problema clássico da Meta: Calcule a taxa de aceitação das tabelas friend_requests e friend_accepts.`
    },
    realWorldExample: { es: 'Métricas de engagement en redes sociales.', en: 'Social network engagement metrics.', pt: 'Métricas de engajamento em redes sociais.' },
    hint: { es: 'LEFT JOIN entre requests y accepts, luego COUNT DISTINCT', en: 'LEFT JOIN requests with accepts, then COUNT DISTINCT', pt: 'LEFT JOIN entre requests e accepts, depois COUNT DISTINCT' },
    
    schema: `CREATE TABLE friend_requests (sender_id INT, receiver_id INT, request_date TEXT);
    CREATE TABLE friend_accepts (sender_id INT, receiver_id INT, accept_date TEXT);`,
    sampleData: `INSERT INTO friend_requests VALUES (1, 2, '2024-01-01');
    INSERT INTO friend_requests VALUES (1, 3, '2024-01-02');
    INSERT INTO friend_requests VALUES (2, 3, '2024-01-03');
    INSERT INTO friend_accepts VALUES (1, 2, '2024-01-02');
    INSERT INTO friend_accepts VALUES (2, 3, '2024-01-04');`,
    expectedQuery: `SELECT ROUND(
      (SELECT COUNT(*) FROM friend_accepts) * 1.0 / 
      (SELECT COUNT(*) FROM friend_requests), 2
    ) as accept_rate`,
    expectedResult: [[0.67]],
  },
  
  // === GOOGLE CLASSIC ===
  {
    id: 'sql-int-active-users',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'interview',
    tags: ['window functions', 'google', 'retention'],
    interviewFrequency: 'very_high',
    xpReward: 50,
    coinsReward: 25,
    
    title: { es: 'Usuarios activos consecutivos (Google)', en: 'Consecutive Active Users (Google)', pt: 'Usuários Ativos Consecutivos (Google)' },
    description: { es: 'Encontrá usuarios que estuvieron activos 3+ días consecutivos.', en: 'Find users active for 3+ consecutive days.', pt: 'Encontre usuários que estiveram ativos por 3+ dias consecutivos.' },
    theory: {
      es: `**Técnica de "gaps and islands":**
1. Asigná ROW_NUMBER por usuario ordenado por fecha
2. Restá ROW_NUMBER a la fecha
3. Si son consecutivos, la resta da el mismo valor
4. Agrupá por esa resta y contá

\`\`\`sql
SELECT DISTINCT user_id FROM (
  SELECT user_id, login_date,
    login_date - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) as grp
  FROM logins
) t
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;
\`\`\``,
      en: `Gaps and islands technique: Use ROW_NUMBER to identify consecutive sequences.`,
      pt: `Técnica "gaps and islands": Use ROW_NUMBER para identificar sequências consecutivas.`
    },
    realWorldExample: { es: 'Identificar usuarios más engaged para campañas.', en: 'Identify most engaged users for campaigns.', pt: 'Identificar usuários mais engajados para campanhas.' },
    hint: { es: 'Usá la técnica de gaps and islands con ROW_NUMBER', en: 'Use gaps and islands technique with ROW_NUMBER', pt: 'Use a técnica de gaps and islands com ROW_NUMBER' },
    
    schema: `CREATE TABLE logins (user_id INT, login_date TEXT);`,
    sampleData: `INSERT INTO logins VALUES (1, '2024-01-01');
    INSERT INTO logins VALUES (1, '2024-01-02');
    INSERT INTO logins VALUES (1, '2024-01-03');
    INSERT INTO logins VALUES (2, '2024-01-01');
    INSERT INTO logins VALUES (2, '2024-01-03');
    INSERT INTO logins VALUES (3, '2024-01-01');
    INSERT INTO logins VALUES (3, '2024-01-02');
    INSERT INTO logins VALUES (3, '2024-01-03');
    INSERT INTO logins VALUES (3, '2024-01-04');`,
    expectedQuery: `SELECT DISTINCT user_id FROM (
      SELECT user_id, login_date,
        JULIANDAY(login_date) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) as grp
      FROM logins
    ) t 
    GROUP BY user_id, grp 
    HAVING COUNT(*) >= 3`,
    expectedResult: [[1], [3]],
  },
  
  // === UBER/LYFT ===
  {
    id: 'sql-int-cancellation-rate',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'interview',
    tags: ['case when', 'uber', 'aggregation'],
    interviewFrequency: 'high',
    xpReward: 45,
    coinsReward: 20,
    
    title: { es: 'Tasa de cancelación de viajes (Uber)', en: 'Trip Cancellation Rate (Uber)', pt: 'Taxa de Cancelamento de Viagens (Uber)' },
    description: { es: 'Calculá la tasa de cancelación excluyendo usuarios baneados.', en: 'Calculate cancellation rate excluding banned users.', pt: 'Calcule a taxa de cancelamento excluindo usuários banidos.' },
    theory: {
      es: `**Problema clásico de Uber:**
1. Filtrá usuarios no baneados (tanto driver como rider)
2. Usá CASE WHEN para contar cancelaciones
3. Dividí por total de viajes

\`\`\`sql
SELECT 
  request_date,
  ROUND(
    SUM(CASE WHEN status LIKE '%cancelled%' THEN 1 ELSE 0 END) * 1.0 / COUNT(*),
    2
  ) as cancellation_rate
FROM trips t
JOIN users u1 ON t.rider_id = u1.user_id AND u1.banned = 'No'
JOIN users u2 ON t.driver_id = u2.user_id AND u2.banned = 'No'
GROUP BY request_date;
\`\`\``,
      en: `Classic Uber problem: Filter unbanned users, use CASE WHEN for cancellations.`,
      pt: `Problema clássico da Uber: Filtre usuários não banidos, use CASE WHEN para cancelamentos.`
    },
    realWorldExample: { es: 'KPIs de operaciones en ride-sharing.', en: 'Operations KPIs in ride-sharing.', pt: 'KPIs de operações em ride-sharing.' },
    hint: { es: 'JOIN con users dos veces (rider y driver) y filtrá banned', en: 'JOIN with users twice (rider and driver) and filter banned', pt: 'JOIN com users duas vezes (passageiro e motorista) e filtre banidos' },
    
    schema: `CREATE TABLE trips (id INT, rider_id INT, driver_id INT, status TEXT, request_date TEXT);
    CREATE TABLE users (user_id INT, banned TEXT, role TEXT);`,
    sampleData: `INSERT INTO trips VALUES (1, 1, 10, 'completed', '2024-01-01');
    INSERT INTO trips VALUES (2, 2, 11, 'cancelled_by_driver', '2024-01-01');
    INSERT INTO trips VALUES (3, 3, 12, 'completed', '2024-01-01');
    INSERT INTO trips VALUES (4, 4, 13, 'cancelled_by_rider', '2024-01-01');
    INSERT INTO users VALUES (1, 'No', 'rider');
    INSERT INTO users VALUES (2, 'No', 'rider');
    INSERT INTO users VALUES (3, 'No', 'rider');
    INSERT INTO users VALUES (4, 'Yes', 'rider');
    INSERT INTO users VALUES (10, 'No', 'driver');
    INSERT INTO users VALUES (11, 'No', 'driver');
    INSERT INTO users VALUES (12, 'No', 'driver');
    INSERT INTO users VALUES (13, 'No', 'driver');`,
    expectedQuery: `SELECT request_date, ROUND(SUM(CASE WHEN status LIKE '%cancelled%' THEN 1.0 ELSE 0 END) / COUNT(*), 2) as rate FROM trips t JOIN users u1 ON t.rider_id = u1.user_id AND u1.banned = 'No' JOIN users u2 ON t.driver_id = u2.user_id AND u2.banned = 'No' GROUP BY request_date`,
    expectedResult: [['2024-01-01', 0.33]],
  },
  
  // === AMAZON ===
  {
    id: 'sql-int-top-customers',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'interview',
    tags: ['ranking', 'amazon', 'window'],
    interviewFrequency: 'high',
    xpReward: 40,
    coinsReward: 18,
    
    title: { es: 'Top 3 clientes por categoría (Amazon)', en: 'Top 3 Customers per Category (Amazon)', pt: 'Top 3 Clientes por Categoria (Amazon)' },
    description: { es: 'Encontrá los top 3 clientes por gasto en cada categoría.', en: 'Find top 3 customers by spending in each category.', pt: 'Encontre os top 3 clientes por gasto em cada categoria.' },
    theory: {
      es: `**Ranking por grupo:**
\`\`\`sql
SELECT * FROM (
  SELECT 
    category,
    customer_id,
    total_spent,
    RANK() OVER (PARTITION BY category ORDER BY total_spent DESC) as rn
  FROM customer_spending
) t
WHERE rn <= 3;
\`\`\`

Usá RANK para empates, DENSE_RANK si no querés huecos.`,
      en: `Use RANK with PARTITION BY for ranking within groups.`,
      pt: `Use RANK com PARTITION BY para classificar dentro de grupos.`
    },
    realWorldExample: { es: 'Segmentación de clientes VIP por categoría.', en: 'VIP customer segmentation by category.', pt: 'Segmentação de clientes VIP por categoria.' },
    hint: { es: 'RANK() OVER (PARTITION BY category ORDER BY total DESC)', en: 'RANK() OVER (PARTITION BY category ORDER BY total DESC)', pt: 'RANK() OVER (PARTITION BY category ORDER BY total DESC)' },
    
    schema: `CREATE TABLE orders (order_id INT, customer_id INT, category TEXT, amount REAL);`,
    sampleData: `INSERT INTO orders VALUES (1, 1, 'Electronics', 500);
    INSERT INTO orders VALUES (2, 2, 'Electronics', 800);
    INSERT INTO orders VALUES (3, 3, 'Electronics', 300);
    INSERT INTO orders VALUES (4, 4, 'Electronics', 700);
    INSERT INTO orders VALUES (5, 1, 'Clothing', 200);
    INSERT INTO orders VALUES (6, 2, 'Clothing', 150);`,
    expectedQuery: `SELECT category, customer_id, total FROM (SELECT category, customer_id, SUM(amount) as total, RANK() OVER (PARTITION BY category ORDER BY SUM(amount) DESC) as rn FROM orders GROUP BY category, customer_id) t WHERE rn <= 3`,
    expectedResult: [['Clothing', 1, 200], ['Clothing', 2, 150], ['Electronics', 2, 800], ['Electronics', 4, 700], ['Electronics', 1, 500]],
  },
  
  // === NETFLIX ===
  {
    id: 'sql-int-watch-streak',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'interview',
    tags: ['gaps islands', 'netflix', 'streak'],
    interviewFrequency: 'high',
    xpReward: 50,
    coinsReward: 25,
    
    title: { es: 'Racha de visualización más larga (Netflix)', en: 'Longest Watch Streak (Netflix)', pt: 'Maior Sequência de Visualização (Netflix)' },
    description: { es: 'Encontrá la racha más larga de días consecutivos viendo contenido por usuario.', en: 'Find the longest streak of consecutive watching days per user.', pt: 'Encontre a maior sequência de dias consecutivos assistindo conteúdo por usuário.' },
    theory: {
      es: `**Gaps and Islands para rachas:**
1. Usá ROW_NUMBER para numerar días
2. Restá a la fecha para crear grupos
3. Contá días por grupo
4. Tomá el máximo

\`\`\`sql
SELECT user_id, MAX(streak) as longest_streak FROM (
  SELECT user_id, COUNT(*) as streak
  FROM (
    SELECT user_id, watch_date,
      DATE(watch_date, '-' || ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY watch_date) || ' days') as grp
    FROM watch_history
  ) t
  GROUP BY user_id, grp
) t2
GROUP BY user_id;
\`\`\``,
      en: `Gaps and islands technique for finding streaks.`,
      pt: `Técnica de gaps and islands para encontrar sequências.`
    },
    realWorldExample: { es: 'Gamificación y engagement de usuarios.', en: 'User gamification and engagement.', pt: 'Gamificação e engajamento de usuários.' },
    hint: { es: 'Gaps and islands + MAX(COUNT)', en: 'Gaps and islands + MAX(COUNT)', pt: 'Gaps and islands + MAX(COUNT)' },
    
    schema: `CREATE TABLE watch_history (user_id INT, watch_date TEXT);`,
    sampleData: `INSERT INTO watch_history VALUES (1, '2024-01-01');
    INSERT INTO watch_history VALUES (1, '2024-01-02');
    INSERT INTO watch_history VALUES (1, '2024-01-03');
    INSERT INTO watch_history VALUES (1, '2024-01-10');
    INSERT INTO watch_history VALUES (2, '2024-01-01');
    INSERT INTO watch_history VALUES (2, '2024-01-02');`,
    expectedQuery: `SELECT user_id, MAX(streak) as longest FROM (
      SELECT user_id, COUNT(*) as streak FROM (
        SELECT user_id, watch_date,
          JULIANDAY(watch_date) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY watch_date) as grp
        FROM watch_history
      ) t 
      GROUP BY user_id, grp
    ) t2 
    GROUP BY user_id`,
    expectedResult: [[1, 3], [2, 2]],
  },
  
  // === AIRBNB ===
  {
    id: 'sql-int-booking-overlap',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'interview',
    tags: ['date overlap', 'airbnb', 'self-join'],
    interviewFrequency: 'high',
    xpReward: 50,
    coinsReward: 25,
    
    title: { es: 'Reservas que se superponen (Airbnb)', en: 'Overlapping Bookings (Airbnb)', pt: 'Reservas Sobrepostas (Airbnb)' },
    description: { es: 'Encontrá reservas que se superponen para la misma propiedad.', en: 'Find overlapping bookings for the same property.', pt: 'Encontre reservas que se sobrepõem para a mesma propriedade.' },
    theory: {
      es: `**Detectar superposición de fechas:**
Dos rangos [A1, A2] y [B1, B2] se superponen si:
A1 <= B2 AND A2 >= B1

\`\`\`sql
SELECT a.booking_id, b.booking_id
FROM bookings a
JOIN bookings b ON a.property_id = b.property_id
  AND a.booking_id < b.booking_id  -- Evitar duplicados
  AND a.start_date <= b.end_date
  AND a.end_date >= b.start_date;
\`\`\``,
      en: `Date overlap detection: A1 <= B2 AND A2 >= B1`,
      pt: `Detecção de sobreposição de datas: A1 <= B2 E A2 >= B1`
    },
    realWorldExample: { es: 'Validación de disponibilidad en booking systems.', en: 'Availability validation in booking systems.', pt: 'Validação de disponibilidade em sistemas de reserva.' },
    hint: { es: 'Self-join con condición de overlap: start1 <= end2 AND end1 >= start2', en: 'Self-join with overlap condition', pt: 'Self-join com condição de sobreposição: inicio1 <= fim2 E fim1 >= inicio2' },
    
    schema: `CREATE TABLE bookings (booking_id INT, property_id INT, start_date TEXT, end_date TEXT);`,
    sampleData: `INSERT INTO bookings VALUES (1, 100, '2024-01-01', '2024-01-05');
    INSERT INTO bookings VALUES (2, 100, '2024-01-04', '2024-01-08');
    INSERT INTO bookings VALUES (3, 100, '2024-01-10', '2024-01-12');
    INSERT INTO bookings VALUES (4, 200, '2024-01-01', '2024-01-05');`,
    expectedQuery: `SELECT a.booking_id as b1, b.booking_id as b2 
    FROM bookings a 
    JOIN bookings b ON a.property_id = b.property_id 
      AND a.booking_id < b.booking_id 
      AND a.start_date <= b.end_date 
      AND a.end_date >= b.start_date`,
    expectedResult: [[1, 2]],
  },
  
  // === LINKEDIN ===
  {
    id: 'sql-int-connections-degree',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'interview',
    tags: ['graph', 'linkedin', 'recursive'],
    interviewFrequency: 'medium',
    xpReward: 55,
    coinsReward: 30,
    
    title: { es: 'Conexiones de segundo grado (LinkedIn)', en: 'Second Degree Connections (LinkedIn)', pt: 'Conexões de Segundo Grau (LinkedIn)' },
    description: { es: 'Encontrá conexiones de segundo grado (amigos de amigos) que no son conexiones directas.', en: 'Find second degree connections (friends of friends) that are not direct connections.', pt: 'Encontre conexões de segundo grau (amigos de amigos) que não são conexões diretas.' },
    theory: {
      es: `**Conexiones de segundo grado:**
1. Encontrá amigos directos del usuario
2. Encontrá amigos de esos amigos
3. Excluí conexiones directas y el usuario mismo

\`\`\`sql
SELECT DISTINCT c2.friend_id
FROM connections c1
JOIN connections c2 ON c1.friend_id = c2.user_id
WHERE c1.user_id = 1  -- Usuario objetivo
  AND c2.friend_id != 1  -- No el mismo usuario
  AND c2.friend_id NOT IN (
    SELECT friend_id FROM connections WHERE user_id = 1
  );  -- No conexiones directas
\`\`\``,
      en: `Second degree: friends of friends excluding direct connections.`,
      pt: `Segundo grau: amigos de amigos excluindo conexões diretas.`
    },
    realWorldExample: { es: 'Sugerencias "Personas que quizás conozcas".', en: '"People you may know" suggestions.', pt: 'Sugestões de "Pessoas que talvez você conheça".' },
    hint: { es: 'JOIN connections consigo misma y excluí conexiones directas', en: 'Self-join connections and exclude direct connections', pt: 'Faça JOIN de connections consigo mesma e exclua conexões diretas' },
    
    schema: `CREATE TABLE connections (user_id INT, friend_id INT);`,
    sampleData: `INSERT INTO connections VALUES (1, 2);
    INSERT INTO connections VALUES (1, 3);
    INSERT INTO connections VALUES (2, 1);
    INSERT INTO connections VALUES (2, 4);
    INSERT INTO connections VALUES (3, 1);
    INSERT INTO connections VALUES (3, 5);
    INSERT INTO connections VALUES (4, 2);
    INSERT INTO connections VALUES (5, 3);`,
    expectedQuery: `SELECT DISTINCT c2.friend_id FROM connections c1 JOIN connections c2 ON c1.friend_id = c2.user_id WHERE c1.user_id = 1 AND c2.friend_id != 1 AND c2.friend_id NOT IN (SELECT friend_id FROM connections WHERE user_id = 1)`,
    expectedResult: [[4], [5]],
  },
  
  // === STRIPE ===
  {
    id: 'sql-int-monthly-revenue',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'interview',
    tags: ['revenue', 'stripe', 'month-over-month'],
    interviewFrequency: 'high',
    xpReward: 40,
    coinsReward: 18,
    
    title: { es: 'Crecimiento de revenue mes a mes (Stripe)', en: 'Month-over-Month Revenue Growth (Stripe)', pt: 'Crescimento de Receita Mês a Mês (Stripe)' },
    description: { es: 'Calculá el porcentaje de crecimiento de revenue comparado con el mes anterior.', en: 'Calculate revenue growth percentage compared to previous month.', pt: 'Calcule a porcentagem de crescimento da receita em comparação com o mês anterior.' },
    theory: {
      es: `**Month-over-Month con LAG:**
\`\`\`sql
SELECT 
  month,
  revenue,
  LAG(revenue) OVER (ORDER BY month) as prev_revenue,
  ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / 
    LAG(revenue) OVER (ORDER BY month), 2) as growth_pct
FROM monthly_revenue;
\`\`\``,
      en: `Use LAG to compare with previous month.`,
      pt: `Use LAG para comparar com o mês anterior.`
    },
    realWorldExample: { es: 'Reportes financieros mensuales.', en: 'Monthly financial reports.', pt: 'Relatórios financeiros mensais.' },
    hint: { es: 'LAG(revenue) OVER (ORDER BY month) para el mes anterior', en: 'LAG(revenue) OVER (ORDER BY month) for previous month', pt: 'LAG(revenue) OVER (ORDER BY month) para o mês anterior' },
    
    schema: `CREATE TABLE transactions (id INT, amount REAL, transaction_date TEXT);`,
    sampleData: `INSERT INTO transactions VALUES (1, 1000, '2024-01-15');
    INSERT INTO transactions VALUES (2, 1500, '2024-01-20');
    INSERT INTO transactions VALUES (3, 2000, '2024-02-10');
    INSERT INTO transactions VALUES (4, 1000, '2024-02-15');
    INSERT INTO transactions VALUES (5, 4000, '2024-03-01');`,
    expectedQuery: `SELECT month, revenue, ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0 / LAG(revenue) OVER (ORDER BY month), 2) as growth FROM (SELECT strftime('%Y-%m', transaction_date) as month, SUM(amount) as revenue FROM transactions GROUP BY 1) t`,
    expectedResult: [['2024-01', 2500, null], ['2024-02', 3000, 20.0], ['2024-03', 4000, 33.33]],
  },
];

export default SQL_INTERVIEW;
