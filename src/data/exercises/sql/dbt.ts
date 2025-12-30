/**
 * dbt (data build tool) Exercises
 * Learn dbt syntax and patterns
 * (Conceptual exercises - real dbt requires a project and warehouse connection)
 */

import { SQLExercise } from '../types';

// Nota que se agrega a todos los ejercicios de dbt
const DBT_NOTE = `
⚠️ **NOTA:** Este es un ejercicio conceptual. dbt real requiere un proyecto configurado y conexión a un data warehouse (Snowflake, BigQuery, etc.). Acá practicamos la **sintaxis y patrones** de dbt que te van a preguntar en entrevistas. La query que escribas es SQL estándar - en dbt real usarías \`{{ ref('modelo') }}\` en vez del nombre de tabla directo.

---

`;

export const SQL_DBT: SQLExercise[] = [
  {
    id: 'dbt-1-ref',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'dbt',
    tags: ['dbt', 'ref', 'models'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: { es: '🧠 Conceptual: Función ref()', en: '🧠 Conceptual: ref() Function', pt: '🧠 Conceitual: Função ref()' },
    description: { 
      es: '[Ejercicio conceptual] Escribí la query SQL que iría en un modelo dbt (acá usamos nombre de tabla directo, en dbt real usarías ref()).',
      en: '[Conceptual exercise] Write the SQL query for a dbt model (here we use table name directly, in real dbt you would use ref()).',
      pt: '[Exercício conceitual] Escreva a query SQL que iria em um modelo dbt (aqui usamos o nome da tabela direto, no dbt real você usaria ref()).'
    },
    theory: {
      es: DBT_NOTE + `**dbt ref() - Referencia entre modelos:**

En dbt, usamos \`ref()\` para referenciar otros modelos. Esto:
- Crea dependencias automáticas
- Maneja nombres de schemas
- Permite ejecutar modelos en orden

\`\`\`sql
-- models/marts/orders_summary.sql
SELECT 
    customer_id,
    COUNT(*) as total_orders,
    SUM(amount) as total_spent
FROM {{ ref('stg_orders') }}  -- Referencia al modelo staging
GROUP BY customer_id
\`\`\`

**Estructura típica de dbt:**
\`\`\`
models/
├── staging/
│   ├── stg_orders.sql
│   └── stg_customers.sql
└── marts/
    └── orders_summary.sql  (usa ref('stg_orders'))
\`\`\``,
      en: `**dbt ref() - Reference between models:**

In dbt, we use ref() to reference other models. This creates automatic dependencies.`,
      pt: `**dbt ref() - Referência entre modelos:**

No dbt, usamos \`ref()\` para referenciar outros modelos. Isso:
- Cria dependências automáticas
- Gerencia nomes de schemas
- Permite executar modelos em ordem`
    },
    realWorldExample: { es: 'Construir un data warehouse con modelos organizados.', en: 'Build a data warehouse with organized models.', pt: 'Construir um data warehouse com modelos organizados.' },
    hint: { es: 'Usá {{ ref("stg_orders") }} en el FROM', en: 'Use {{ ref("stg_orders") }} in FROM', pt: 'Use {{ ref("stg_orders") }} no FROM' },
    
    // Simulamos el resultado de stg_orders
    schema: `CREATE TABLE stg_orders (order_id INT, customer_id INT, amount REAL, order_date TEXT);`,
    sampleData: `INSERT INTO stg_orders VALUES (1, 100, 50.00, '2024-01-01');
    INSERT INTO stg_orders VALUES (2, 100, 75.00, '2024-01-02');
    INSERT INTO stg_orders VALUES (3, 101, 100.00, '2024-01-01');
    INSERT INTO stg_orders VALUES (4, 100, 25.00, '2024-01-03');`,
    expectedQuery: `SELECT customer_id, COUNT(*) as total_orders, SUM(amount) as total_spent
    FROM stg_orders GROUP BY customer_id`,
    expectedResult: [[100, 3, 150], [101, 1, 100]],
  },
  {
    id: 'dbt-2-source',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'dbt',
    tags: ['dbt', 'source', 'raw'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: { es: '🧠 Conceptual: Función source()', en: '🧠 Conceptual: source() Function', pt: '🧠 Conceitual: Função source()' },
    description: { 
      es: 'Escribí un modelo staging que lea de una fuente raw usando source().',
      en: 'Write a staging model that reads from a raw source using source().',
      pt: 'Escreva um modelo staging que leia de uma fonte raw usando source().'
    },
    theory: {
      es: DBT_NOTE + `**dbt source() - Leer datos raw:**

\`source()\` referencia tablas externas (no modelos dbt):

\`\`\`sql
-- models/staging/stg_orders.sql
SELECT 
    id as order_id,
    customer_id,
    total as amount,
    created_at as order_date
FROM {{ source('raw_db', 'orders') }}
WHERE created_at >= '2024-01-01'
\`\`\`

**Definir sources en schema.yml:**
\`\`\`yaml
sources:
  - name: raw_db
    tables:
      - name: orders
      - name: customers
\`\`\`

**Beneficios:**
- Documentación de fuentes
- Tests de freshness
- Lineage tracking`,
      en: `**dbt source() - Read raw data:**

source() references external tables (not dbt models).`,
      pt: `**dbt source() - Ler dados raw:**

\`source()\` referencia tabelas externas (não modelos dbt):`
    },
    realWorldExample: { es: 'Staging layer que limpia datos raw.', en: 'Staging layer that cleans raw data.', pt: 'Camada de staging que limpa dados raw.' },
    hint: { es: 'Renombrá columnas y filtrá datos en staging', en: 'Rename columns and filter data in staging', pt: 'Renomeie colunas e filtre dados no staging' },
    
    schema: `CREATE TABLE raw_orders (id INT, customer_id INT, total REAL, created_at TEXT, status TEXT);`,
    sampleData: `INSERT INTO raw_orders VALUES (1, 100, 50.00, '2024-01-01', 'completed');
    INSERT INTO raw_orders VALUES (2, 100, 75.00, '2024-01-02', 'completed');
    INSERT INTO raw_orders VALUES (3, 101, 100.00, '2024-01-01', 'pending');`,
    expectedQuery: `SELECT id as order_id, customer_id, total as amount, created_at as order_date, status
    FROM raw_orders WHERE status = 'completed'`,
    expectedResult: [[1, 100, 50, '2024-01-01', 'completed'], [2, 100, 75, '2024-01-02', 'completed']],
  },
  {
    id: 'dbt-3-incremental',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'dbt',
    tags: ['dbt', 'incremental', 'materialization'],
    interviewFrequency: 'very_high',
    xpReward: 45,
    coinsReward: 20,
    
    title: { es: '🧠 Conceptual: Modelos incrementales', en: '🧠 Conceptual: Incremental Models', pt: '🧠 Conceitual: Modelos Incrementais' },
    description: { 
      es: 'Escribí la lógica para un modelo incremental que solo procese datos nuevos.',
      en: 'Write the logic for an incremental model that only processes new data.',
      pt: 'Escreva a lógica para um modelo incremental que processe apenas dados novos.'
    },
    theory: {
      es: DBT_NOTE + `**dbt Incremental Models:**

Solo procesan datos nuevos, no toda la tabla:

\`\`\`sql
-- models/marts/fct_orders.sql
{{ config(materialized='incremental', unique_key='order_id') }}

SELECT 
    order_id,
    customer_id,
    amount,
    order_date
FROM {{ ref('stg_orders') }}

{% if is_incremental() %}
  -- Solo datos nuevos desde la última ejecución
  WHERE order_date > (SELECT MAX(order_date) FROM {{ this }})
{% endif %}
\`\`\`

**Estrategias de merge:**
- \`unique_key\`: Actualiza si existe, inserta si no
- \`incremental_strategy\`: 'append', 'merge', 'delete+insert'`,
      en: `**dbt Incremental Models:**

Only process new data, not the entire table.`,
      pt: `**dbt Incremental Models:**

Apenas processam dados novos, não a tabela inteira.`
    },
    realWorldExample: { es: 'Tablas de hechos con millones de registros.', en: 'Fact tables with millions of records.', pt: 'Tabelas de fatos com milhões de registros.' },
    hint: { es: 'Filtrá por fecha mayor al máximo existente', en: 'Filter by date greater than existing max', pt: 'Filtre por data maior que o máximo existente' },
    
    schema: `CREATE TABLE stg_orders (order_id INT, customer_id INT, amount REAL, order_date TEXT);
    CREATE TABLE existing_orders (order_id INT, customer_id INT, amount REAL, order_date TEXT);`,
    sampleData: `INSERT INTO existing_orders VALUES (1, 100, 50.00, '2024-01-01');
    INSERT INTO existing_orders VALUES (2, 100, 75.00, '2024-01-02');
    INSERT INTO stg_orders VALUES (1, 100, 50.00, '2024-01-01');
    INSERT INTO stg_orders VALUES (2, 100, 75.00, '2024-01-02');
    INSERT INTO stg_orders VALUES (3, 101, 100.00, '2024-01-03');
    INSERT INTO stg_orders VALUES (4, 100, 25.00, '2024-01-04');`,
    expectedQuery: `SELECT * FROM stg_orders WHERE order_date > (SELECT MAX(order_date) FROM existing_orders)`,
    expectedResult: [[3, 101, 100, '2024-01-03'], [4, 100, 25, '2024-01-04']],
  },
  {
    id: 'dbt-4-tests',
    type: 'sql',
    difficulty: 'medium',
    category: 'sql',
    subcategory: 'dbt',
    tags: ['dbt', 'tests', 'quality'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: { es: '🧠 Conceptual: Test de unicidad', en: '🧠 Conceptual: Uniqueness Test', pt: '🧠 Conceitual: Teste de Unicidade' },
    description: { 
      es: 'Escribí una query que valide que order_id es único (como haría dbt test).',
      en: 'Write a query that validates order_id is unique (like dbt test would).',
      pt: 'Escreva uma query que valide que order_id é único (como o dbt test faria).'
    },
    theory: {
      es: DBT_NOTE + `**dbt Tests:**

dbt tiene tests built-in y custom:

\`\`\`yaml
# schema.yml
models:
  - name: stg_orders
    columns:
      - name: order_id
        tests:
          - unique        # No duplicados
          - not_null      # No nulos
      - name: status
        tests:
          - accepted_values:
              values: ['pending', 'completed', 'cancelled']
\`\`\`

**Cómo funcionan internamente:**
\`\`\`sql
-- Test unique (falla si devuelve filas)
SELECT order_id, COUNT(*) 
FROM stg_orders 
GROUP BY order_id 
HAVING COUNT(*) > 1;

-- Test not_null (falla si devuelve filas)
SELECT * FROM stg_orders WHERE order_id IS NULL;
\`\`\``,
      en: `**dbt Tests:**

dbt has built-in and custom tests. They fail if they return any rows.`,
      pt: `**dbt Tests:**

dbt tem testes built-in e customizados. Eles falham se retornarem quaisquer linhas.`
    },
    realWorldExample: { es: 'Validar calidad de datos antes de producción.', en: 'Validate data quality before production.', pt: 'Validar qualidade de dados antes da produção.' },
    hint: { es: 'GROUP BY + HAVING COUNT(*) > 1 encuentra duplicados', en: 'GROUP BY + HAVING COUNT(*) > 1 finds duplicates', pt: 'GROUP BY + HAVING COUNT(*) > 1 encontra duplicatas' },
    
    schema: `CREATE TABLE stg_orders (order_id INT, customer_id INT, amount REAL);`,
    sampleData: `INSERT INTO stg_orders VALUES (1, 100, 50.00);
    INSERT INTO stg_orders VALUES (2, 100, 75.00);
    INSERT INTO stg_orders VALUES (3, 101, 100.00);
    INSERT INTO stg_orders VALUES (2, 102, 25.00);`,  // Duplicado!
    expectedQuery: `SELECT order_id, COUNT(*) as count FROM stg_orders GROUP BY order_id HAVING COUNT(*) > 1`,
    expectedResult: [[2, 2]],
  },
  {
    id: 'dbt-5-macros',
    type: 'sql',
    difficulty: 'hard',
    category: 'sql',
    subcategory: 'dbt',
    tags: ['dbt', 'macros', 'jinja'],
    interviewFrequency: 'medium',
    xpReward: 40,
    coinsReward: 18,
    
    title: { es: '🧠 Conceptual: Macros y Jinja', en: '🧠 Conceptual: Macros and Jinja', pt: '🧠 Conceitual: Macros e Jinja' },
    description: { 
      es: 'Escribí una query que calcule métricas para múltiples períodos (simulando un macro).',
      en: 'Write a query that calculates metrics for multiple periods (simulating a macro).',
      pt: 'Escreva uma query que calcule métricas para múltiplos períodos (simulando uma macro).'
    },
    theory: {
      es: DBT_NOTE + `**dbt Macros con Jinja:**

Macros son funciones reutilizables:

\`\`\`sql
-- macros/calculate_metrics.sql
{% macro calculate_metrics(date_column, metric_column) %}
    SUM(CASE WHEN {{ date_column }} >= DATE('now', '-7 days') 
        THEN {{ metric_column }} END) as last_7_days,
    SUM(CASE WHEN {{ date_column }} >= DATE('now', '-30 days') 
        THEN {{ metric_column }} END) as last_30_days
{% endmacro %}

-- Uso en modelo:
SELECT 
    customer_id,
    {{ calculate_metrics('order_date', 'amount') }}
FROM {{ ref('stg_orders') }}
GROUP BY customer_id
\`\`\`

**Jinja loops:**
\`\`\`sql
{% for period in [7, 30, 90] %}
    SUM(CASE WHEN order_date >= DATE('now', '-{{ period }} days') 
        THEN amount END) as last_{{ period }}_days
    {% if not loop.last %},{% endif %}
{% endfor %}
\`\`\``,
      en: `**dbt Macros with Jinja:**

Macros are reusable functions. Use Jinja for loops and conditionals.`,
      pt: `**dbt Macros com Jinja:**

Macros são funções reutilizáveis. Use Jinja para loops e condicionais.`
    },
    realWorldExample: { es: 'Métricas de 7, 30, 90 días sin repetir código.', en: '7, 30, 90 day metrics without repeating code.', pt: 'Métricas de 7, 30, 90 dias sem repetir código.' },
    hint: { es: 'Usá CASE WHEN para cada período', en: 'Use CASE WHEN for each period', pt: 'Use CASE WHEN para cada período' },
    
    schema: `CREATE TABLE orders (customer_id INT, amount REAL, order_date TEXT);`,
    sampleData: `INSERT INTO orders VALUES (100, 50.00, '2024-01-15');
    INSERT INTO orders VALUES (100, 75.00, '2024-01-10');
    INSERT INTO orders VALUES (100, 100.00, '2024-01-01');
    INSERT INTO orders VALUES (101, 200.00, '2024-01-15');`,
    expectedQuery: `SELECT 
    customer_id,
    SUM(CASE WHEN order_date >= '2024-01-08' THEN amount ELSE 0 END) as last_7_days,
    SUM(CASE WHEN order_date >= '2024-01-01' THEN amount ELSE 0 END) as last_30_days
    FROM orders GROUP BY customer_id`,
    expectedResult: [[100, 125, 225], [101, 200, 200]],
  },
  {
    id: 'dbt-6-snapshots',
    type: 'sql',
    difficulty: 'expert',
    category: 'sql',
    subcategory: 'dbt',
    tags: ['dbt', 'snapshots', 'scd'],
    interviewFrequency: 'high',
    xpReward: 50,
    coinsReward: 25,
    
    title: { es: '🧠 Conceptual: Snapshots (SCD Type 2)', en: '🧠 Conceptual: Snapshots (SCD Type 2)', pt: '🧠 Conceitual: Snapshots (SCD Type 2)' },
    description: { 
      es: 'Encontrá el estado actual de cada cliente usando lógica de snapshot.',
      en: 'Find the current state of each customer using snapshot logic.',
      pt: 'Encontre o estado atual de cada cliente usando lógica de snapshot.'
    },
    theory: {
      es: DBT_NOTE + `**dbt Snapshots - Slowly Changing Dimensions:**

Capturan cambios históricos:

\`\`\`sql
-- snapshots/customers_snapshot.sql
{% snapshot customers_snapshot %}
{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
    )
}}
SELECT * FROM {{ source('raw', 'customers') }}
{% endsnapshot %}
\`\`\`

**Resultado:**
| customer_id | name | dbt_valid_from | dbt_valid_to |
|-------------|------|----------------|--------------|
| 1 | Ana | 2024-01-01 | 2024-02-01 |
| 1 | Ana María | 2024-02-01 | NULL |

**Para obtener estado actual:**
\`\`\`sql
SELECT * FROM customers_snapshot
WHERE dbt_valid_to IS NULL;
\`\`\``,
      en: `**dbt Snapshots - Slowly Changing Dimensions:**

Capture historical changes. Current records have dbt_valid_to = NULL.`,
      pt: `**dbt Snapshots - Slowly Changing Dimensions:**

Capturam mudanças históricas. Registros atuais têm dbt_valid_to = NULL.`
    },
    realWorldExample: { es: 'Historial de cambios de clientes, productos.', en: 'History of customer, product changes.', pt: 'Histórico de mudanças de clientes, produtos.' },
    hint: { es: 'Filtrá donde valid_to IS NULL', en: 'Filter where valid_to IS NULL', pt: 'Filtre onde valid_to IS NULL' },
    
    schema: `CREATE TABLE customers_snapshot (
      customer_id INT, name TEXT, email TEXT, 
      dbt_valid_from TEXT, dbt_valid_to TEXT
    );`,
    sampleData: `INSERT INTO customers_snapshot VALUES (1, 'Ana', 'ana@v1.com', '2024-01-01', '2024-02-01');
    INSERT INTO customers_snapshot VALUES (1, 'Ana María', 'ana@v2.com', '2024-02-01', NULL);
    INSERT INTO customers_snapshot VALUES (2, 'Juan', 'juan@test.com', '2024-01-01', NULL);`,
    expectedQuery: `SELECT customer_id, name, email FROM customers_snapshot WHERE dbt_valid_to IS NULL`,
    expectedResult: [[1, 'Ana María', 'ana@v2.com'], [2, 'Juan', 'juan@test.com']],
  },
];

export default SQL_DBT;
