import { Project } from '../../../types/members';

export const p1_extra_sql_joins: Project = {
  id: 'p1-extra-sql-joins',
  level: 1,
  title: { es: 'Masterclass de JOINs SQL', en: 'SQL JOINs Masterclass', pt: 'Masterclass de JOINs SQL' },
  description: {
    es: 'Dominar todos los tipos de JOINs con casos reales. Los JOINs son el 50% de lo que vas a hacer en SQL.',
    en: 'Master all JOIN types with real cases. JOINs are 50% of what you\'ll do in SQL.',
    pt: 'Dominar todos os tipos de JOINs com casos reais. Os JOINs são 50% do que você vai fazer em SQL.'
  },
  difficulty: 'Principiante',
  duration: '2-3 horas',
  skills: [{ es: 'SQL' }, { es: 'JOINs' }, { es: 'Análisis de Datos', en: 'Data Analysis', pt: 'Análise de Dados' }],
  icon: '🔗',
  color: 'blue',
  datasetId: 'rrhh',
  prerequisites: ['p1-etl-python'],
  estimatedLines: 60,
  realWorldExample: {
    es: 'Así combinan datos de empleados, departamentos y salarios en cualquier sistema de RRHH',
    en: 'This is how they combine employee, department, and salary data in any HR system',
    pt: 'Assim combinam dados de funcionários, departamentos e salários em qualquer sistema de RH'
  },
  usedBy: ['SAP', 'Workday', 'Oracle HCM', 'ADP'],
  learningObjectives: [
    { es: 'Entender cuándo usar cada tipo de JOIN', en: 'Understand when to use each JOIN type', pt: 'Entender quando usar cada tipo de JOIN' },
    { es: 'Combinar múltiples tablas', en: 'Combine multiple tables', pt: 'Combinar múltiplas tabelas' },
    { es: 'Hacer self-joins', en: 'Perform self-joins', pt: 'Fazer self-joins' },
    { es: 'Evitar errores comunes de JOINs', en: 'Avoid common JOIN mistakes', pt: 'Evitar erros comuns de JOINs' },
  ],
  expectedOutputs: [
    {
      step: 2,
      description: { es: 'INNER JOIN empleados-departamentos', en: 'INNER JOIN employees-departments', pt: 'INNER JOIN funcionários-departamentos' },
      example: `+-------------+----------------+------------------+
| employee_id | name           | department_name  |
+-------------+----------------+------------------+
| 1           | María García   | Engineering      |
| 2           | Juan Pérez     | Sales            |
| 3           | Ana López      | Engineering      |
+-------------+----------------+------------------+`
    },
    {
      step: 4,
      description: { es: 'Self-JOIN empleados y managers', en: 'Self-JOIN employees and managers', pt: 'Self-JOIN funcionários e gerentes' },
      example: `+----------------+------------------+
| empleado       | manager          |
+----------------+------------------+
| María García   | Carlos Director  |
| Juan Pérez     | Carlos Director  |
| Carlos Director| NULL             |
+----------------+------------------+`
    },
  ],
  interviewStory: {
    hook: { es: "Optimicé un reporte de RRHH que tardaba 45 minutos en generarse a solo 30 segundos, reescribiendo los JOINs de forma eficiente.", en: "Optimized an HR report taking 45 mins to just 30 seconds by rewriting JOINs efficiently.", pt: "Otimizei um relatório de RH que demorava 45 minutos para gerar para apenas 30 segundos, reescrevendo os JOINs de forma eficiente." },
    situation: { es: "El equipo de RRHH necesitaba un reporte que combinara datos de empleados, departamentos, y salarios históricos. El reporte existente era manual y tardaba casi una hora.", en: "HR team needed a report combining employee, department, and historical salary data. Existing report was manual and took almost an hour.", pt: "A equipe de RH precisava de um relatório que combinasse dados de funcionários, departamentos e salários históricos. O relatório existente era manual e demorava quase uma hora." },
    task: { es: "Crear queries SQL eficientes que combinaran las 3 tablas y generaran el reporte automáticamente.", en: "Create efficient SQL queries combining the 3 tables and generating the report automatically.", pt: "Criar queries SQL eficientes que combinassem as 3 tabelas e gerassem o relatório automaticamente." },
    actions: [
      { es: "Analicé la estructura de las tablas y sus relaciones (claves primarias y foráneas)", en: "Analyzed table structure and relationships (PKs and FKs)", pt: "Analisei a estrutura das tabelas e suas relações (chaves primárias e estrangeiras)" },
      { es: "Usé INNER JOIN para empleados activos con departamento asignado", en: "Used INNER JOIN for active employees with assigned department", pt: "Usei INNER JOIN para funcionários ativos com departamento atribuído" },
      { es: "Usé LEFT JOIN para incluir empleados sin departamento (casos edge)", en: "Used LEFT JOIN to include employees without department (edge cases)", pt: "Usei LEFT JOIN para incluir funcionários sem departamento (casos edge)" },
      { es: "Implementé self-join para la jerarquía empleado-manager", en: "Implemented self-join for employee-manager hierarchy", pt: "Implementei self-join para a hierarquia funcionário-gerente" },
      { es: "Optimicé con índices en las columnas de JOIN", en: "Optimized with indexes on JOIN columns", pt: "Otimizei com índices nas colunas de JOIN" }
    ],
    results: [
      { es: "Reporte automatizado que corre en 30 segundos vs 45 minutos manual", en: "Automated report running in 30 seconds vs 45 minutes manual", pt: "Relatório automatizado que roda em 30 segundos vs 45 minutos manual" },
      { es: "El equipo de RRHH ahora tiene datos actualizados diariamente", en: "HR team now has daily updated data", pt: "A equipe de RH agora tem dados atualizados diariamente" },
      { es: "Identificamos 12 empleados 'fantasma' sin departamento que nadie sabía que existían", en: "Identified 12 'ghost' employees without department no one knew existed", pt: "Identificamos 12 funcionários 'fantasmas' sem departamento que ninguém sabia que existiam" },
      { es: "La query se convirtió en template para otros reportes", en: "Query became a template for other reports", pt: "A query virou template para outros relatórios" }
    ],
    learnings: [
      { es: "INNER vs LEFT JOIN no es solo técnico - tiene implicaciones de negocio (¿queremos ver empleados sin depto o no?)", en: "INNER vs LEFT JOIN is not just technical - has business implications (do we want to see employees without dept or not?)", pt: "INNER vs LEFT JOIN não é só técnico - tem implicações de negócio (queremos ver funcionários sem depto ou não?)" },
      { es: "Self-joins son poderosos para jerarquías pero hay que tener cuidado con ciclos infinitos", en: "Self-joins are powerful for hierarchies but be careful with infinite cycles", pt: "Self-joins são poderosos para hierarquias mas tem que ter cuidado com ciclos infinitos" },
      { es: "Siempre hay que validar los resultados con el equipo de negocio - los datos pueden tener sorpresas", en: "Always validate results with business team - data can have surprises", pt: "Sempre tem que validar os resultados com a equipe de negócio - os dados podem ter surpresas" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cuál es la diferencia entre INNER y LEFT JOIN?", en: "What is the difference between INNER and LEFT JOIN?", pt: "Qual a diferença entre INNER e LEFT JOIN?" },
        answer: { es: "INNER solo devuelve filas que matchean en ambas tablas. LEFT devuelve TODAS las filas de la izquierda, con NULL si no hay match. Uso LEFT cuando quiero ver 'todos los X, tengan o no Y'.", en: "INNER only returns matching rows in both tables. LEFT returns ALL left rows, with NULL if no match. I use LEFT when I want 'all X, whether they have Y or not'.", pt: "INNER só retorna linhas que dão match em ambas as tabelas. LEFT retorna TODAS as linhas da esquerda, com NULL se não houver match. Uso LEFT quando quero ver 'todos os X, tenham ou não Y'." }
      },
      {
        question: { es: "¿Cómo optimizaste la query?", en: "How did you optimize the query?", pt: "Como otimizou a query?" },
        answer: { es: "Primero, agregué índices en las columnas de JOIN. Segundo, filtré temprano con WHERE antes de los JOINs. Tercero, evité SELECT * y solo traje las columnas necesarias.", en: "First, added indexes on JOIN columns. Second, filtered early with WHERE before JOINs. Third, avoided SELECT * and only fetched necessary columns.", pt: "Primeiro, adicionei índices nas colunas de JOIN. Segundo, filtrei cedo com WHERE antes dos JOINs. Terceiro, evitei SELECT * e só trouxe as colunas necessárias." }
      },
      {
        question: { es: "¿Qué pasa si hay NULLs en las claves de JOIN?", en: "What happens if there are NULLs in JOIN keys?", pt: "O que acontece se houver NULLs nas chaves de JOIN?" },
        answer: { es: "NULL nunca es igual a NULL en SQL, así que esas filas no matchean. Por eso uso COALESCE o filtro los NULLs antes del JOIN si es necesario.", en: "NULL never equals NULL in SQL, so those rows don't match. That's why I use COALESCE or filter NULLs before JOIN if needed.", pt: "NULL nunca é igual a NULL em SQL, então essas linhas não dão match. Por isso uso COALESCE ou filtro os NULLs antes do JOIN se necessário." }
      }
    ],
    closingStatement: { es: "Dominar JOINs es fundamental - el 90% de las queries en producción tienen al menos un JOIN.", en: "Mastering JOINs is fundamental - 90% of production queries have at least one JOIN.", pt: "Dominar JOINs é fundamental - 90% das queries em produção têm pelo menos um JOIN." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📥 Descargá el dataset de RRHH', en: '📥 Download HR dataset', pt: '📥 Baixe o dataset de RH' },
      explanation: { es: 'El dataset tiene 3 tablas: employees (empleados), departments (departamentos), salaries (salarios históricos).', en: 'Dataset has 3 tables: employees, departments, salaries (historical).', pt: 'O dataset tem 3 tabelas: employees (funcionários), departments (departamentos), salaries (salários históricos).' },
      checkpoint: { es: '¿Podés ver las 3 tablas en el dataset?', en: 'Can you see the 3 tables in the dataset?', pt: 'Consegue ver as 3 tabelas no dataset?' }
    },
    { 
      order: 2, 
      text: { es: '🔗 INNER JOIN: Empleados con departamento', en: '🔗 INNER JOIN: Employees with department', pt: '🔗 INNER JOIN: Funcionários com departamento' },
      code: `-- INNER JOIN: Solo filas que matchean en AMBAS tablas
SELECT 
    e.employee_id,
    e.name,
    d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id;

-- ¿Cuántos empleados tienen departamento?
-- Si hay menos filas que empleados, algunos no tienen departamento asignado`,
      explanation: { es: 'INNER JOIN devuelve SOLO las filas que tienen match en ambas tablas. Si un empleado no tiene department_id, no aparece.', en: 'INNER JOIN returns ONLY rows with match in both tables. If employee has no department_id, they don\'t appear.', pt: 'INNER JOIN retorna APENAS as linhas que têm match em ambas as tabelas. Se um funcionário não tem department_id, não aparece.' },
      tip: { es: 'Usá alias (e, d) para que las queries sean más legibles.', en: 'Use aliases (e, d) to make queries more readable.', pt: 'Use alias (e, d) para que as queries sejam mais legíveis.' }
    },
    { 
      order: 3, 
      text: { es: '⬅️ LEFT JOIN: Todos los empleados', en: '⬅️ LEFT JOIN: All employees', pt: '⬅️ LEFT JOIN: Todos os funcionários' },
      code: `-- LEFT JOIN: TODOS los de la izquierda, matcheen o no
SELECT 
    e.employee_id,
    e.name,
    d.department_name  -- Será NULL si no tiene departamento
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id;

-- Encontrar empleados SIN departamento
SELECT e.employee_id, e.name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE d.department_id IS NULL;`,
      explanation: { es: 'LEFT JOIN mantiene TODAS las filas de la tabla izquierda. Si no hay match, las columnas de la derecha son NULL.', en: 'LEFT JOIN keeps ALL rows from left table. If no match, right columns are NULL.', pt: 'LEFT JOIN mantém TODAS as linhas da tabela esquerda. Se não houver match, as colunas da direita são NULL.' },
      tip: { es: 'LEFT JOIN + WHERE ... IS NULL es el patrón para encontrar "los que NO tienen..."', en: 'LEFT JOIN + WHERE ... IS NULL is the pattern to find "those who DO NOT have..."', pt: 'LEFT JOIN + WHERE ... IS NULL é o padrão para encontrar "os que NÃO têm..."' }
    },
    { 
      order: 4, 
      text: { es: '🔄 Self-JOIN: Empleados y sus managers', en: '🔄 Self-JOIN: Employees and their managers', pt: '🔄 Self-JOIN: Funcionários e seus gerentes' },
      code: `-- Self-JOIN: Una tabla consigo misma
-- Cada empleado tiene un manager_id que es otro employee_id
SELECT 
    e.name as empleado,
    m.name as manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id;

-- Empleados sin manager (probablemente CEOs)
SELECT e.name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.employee_id
WHERE m.employee_id IS NULL;`,
      explanation: { es: 'Un self-join es cuando una tabla se relaciona consigo misma. Común para jerarquías (empleado-manager, categoría-subcategoría).', en: 'A self-join is when a table relates to itself. Common for hierarchies (employee-manager, category-subcategory).', pt: 'Um self-join é quando uma tabela se relaciona consigo mesma. Comum para hierarquias (funcionário-gerente, categoria-subcategoria).' },
      warning: { es: 'Siempre usá alias diferentes (e, m) cuando hacés self-join, sino SQL no sabe a cuál te referís.', en: 'Always use different aliases (e, m) when doing self-join, otherwise SQL won\'t know which one you mean.', pt: 'Sempre use aliases diferentes (e, m) quando faz self-join, senão o SQL não sabe a qual você se refere.' }
    },
    { 
      order: 5, 
      text: { es: '🔗🔗 JOIN de 3 tablas', en: '🔗🔗 3-Table JOIN', pt: '🔗🔗 JOIN de 3 tabelas' },
      code: `-- Combinar empleados + departamentos + salarios
SELECT 
    e.name as empleado,
    d.department_name as departamento,
    s.salary as salario,
    s.effective_date as fecha_salario
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
INNER JOIN salaries s ON e.employee_id = s.employee_id
WHERE s.effective_date = (
    SELECT MAX(effective_date) 
    FROM salaries s2 
    WHERE s2.employee_id = e.employee_id
);`,
      explanation: { es: 'Podés encadenar múltiples JOINs. El subquery obtiene el salario más reciente de cada empleado.', en: 'You can chain multiple JOINs. Subquery gets most recent salary for each employee.', pt: 'Você pode encadear múltiplos JOINs. O subquery obtém o salário mais recente de cada funcionário.' },
      tip: { es: 'El orden de los JOINs no afecta el resultado, pero sí puede afectar la performance.', en: 'Order of JOINs doesn\'t affect result, but can affect performance.', pt: 'A ordem dos JOINs não afeta o resultado, mas pode afetar a performance.' }
    },
    { 
      order: 6, 
      text: { es: '📝 Documentá cuándo usar cada JOIN', en: '📝 Document when to use each JOIN', pt: '📝 Documente quando usar cada JOIN' },
      explanation: { es: 'Creá una tabla resumen con ejemplos de cuándo usar cada tipo de JOIN.', en: 'Create a summary table with examples of when to use each JOIN type.', pt: 'Crie uma tabela resumo com exemplos de quando usar cada tipo de JOIN.' },
      checkpoint: { es: '¿Podés explicar la diferencia entre INNER y LEFT JOIN sin mirar notas?', en: 'Can you explain difference between INNER and LEFT JOIN without looking at notes?', pt: 'Consegue explicar a diferença entre INNER e LEFT JOIN sem olhar notas?' }
    },
  ],
  deliverable: { es: 'Archivo .sql con queries comentadas + documento explicando cuándo usar cada JOIN', en: '.sql file with commented queries + document explaining when to use each JOIN', pt: 'Arquivo .sql com queries comentadas + documento explicando quando usar cada JOIN' },
  evaluation: [
    { es: '¿Entendés cuándo usar INNER vs LEFT JOIN?', en: 'Do you understand when to use INNER vs LEFT JOIN?', pt: 'Entende quando usar INNER vs LEFT JOIN?' },
    { es: '¿Podés hacer un self-join?', en: 'Can you perform a self-join?', pt: 'Consegue fazer um self-join?' },
    { es: '¿Sabés combinar 3+ tablas?', en: 'Do you know how to combine 3+ tables?', pt: 'Sabe combinar 3+ tabelas?' },
    { es: '¿Tus queries tienen alias claros?', en: 'Do your queries have clear aliases?', pt: 'Suas queries têm aliases claros?' },
  ],
  theory: { es: `## Tipos de JOINs

| JOIN | Devuelve | Uso común |
|------|----------|-----------|
| INNER | Solo matches | Datos que DEBEN relacionarse |
| LEFT | Todo izquierda + matches | Encontrar "sin relación" |
| RIGHT | Todo derecha + matches | Poco usado, mejor invertir |
| FULL | Todo de ambas | Comparar dos datasets |
| CROSS | Producto cartesiano | Generar combinaciones |

## Errores Comunes

1. **Olvidar la condición ON**: CROSS JOIN accidental
2. **JOIN sin índices**: Queries lentas
3. **Confundir LEFT con INNER**: Perder datos sin querer`, en: `## JOIN Types

| JOIN | Returns | Common Use |
|------|---------|------------|
| INNER | Matches only | Data MUST relate |
| LEFT | All left + matches | Find "no relation" |
| RIGHT | All right + matches | Rarely used, better flip |
| FULL | All from both | Compare two datasets |
| CROSS | Cartesian product | Generate combinations |

## Common Mistakes

1. **Forget ON condition**: Accidental CROSS JOIN
2. **JOIN without indexes**: Slow queries
3. **Confuse LEFT with INNER**: Lose data unintentionally`, pt: `## Tipos de JOINs

| JOIN | Retorna | Uso comum |
|------|---------|-----------|
| INNER | Apenas matches | Dados que DEVEM se relacionar |
| LEFT | Tudo esquerda + matches | Encontrar "sem relação" |
| RIGHT | Tudo direita + matches | Pouco usado, melhor inverter |
| FULL | Tudo de ambas | Comparar dois datasets |
| CROSS | Produto cartesiano | Gerar combinações |

## Erros Comuns

1. **Esquecer a condição ON**: CROSS JOIN acidental
2. **JOIN sem índices**: Queries lentas
3. **Confundir LEFT com INNER**: Perder dados sem querer` },
};


