import { Project } from '../../../types/members';

export const p8_dbt_project: Project = {
  id: 'p8-dbt-project',
  level: 2,
  title: { es: 'Proyecto dbt Profesional', en: 'Professional dbt Project', pt: 'Projeto dbt Profissional' },
  description: {
    es: 'Construí un proyecto dbt completo siguiendo las mejores prácticas. dbt es LA herramienta de transformación más usada en el mundo de analytics.',
    en: 'Build a complete dbt project following best practices. dbt is THE most used transformation tool in the analytics world.',
    pt: 'Construa um projeto dbt completo seguindo as melhores práticas. dbt é A ferramenta de transformação mais usada no mundo de analytics.'
  },
  difficulty: 'Avanzado',
  duration: '5-6 horas',
  skills: [{ es: 'SQL' }, { es: 'dbt' }, { es: 'Data Modeling', en: 'Data Modeling', pt: 'Modelagem de Dados' }, { es: 'Testing' }, { es: 'Documentación', en: 'Documentation', pt: 'Documentação' }],
  icon: '🔧',
  color: 'purple',
  datasetId: 'ecommerce',
  estimatedLines: 200,
  realWorldExample: {
    es: 'Así estructura GitLab sus transformaciones de datos con dbt',
    en: 'This is how GitLab structures its data transformations with dbt',
    pt: 'Assim o GitLab estrutura suas transformações de dados com dbt'
  },
  usedBy: ['GitLab', 'Spotify', 'JetBlue', 'Hubspot', 'Shopify'],
  learningObjectives: [
    { es: 'Estructurar proyecto dbt (staging → marts)', en: 'Structure dbt project (staging → marts)', pt: 'Estruturar projeto dbt (staging → marts)' },
    { es: 'Escribir modelos SQL con Jinja', en: 'Write SQL models with Jinja', pt: 'Escrever modelos SQL com Jinja' },
    { es: 'Implementar tests de datos', en: 'Implement data tests', pt: 'Implementar testes de dados' },
    { es: 'Generar documentación automática', en: 'Generate automatic documentation', pt: 'Gerar documentação automática' },
    { es: 'Usar snapshots para SCD Type 2', en: 'Use snapshots for SCD Type 2', pt: 'Usar snapshots para SCD Type 2' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'No seguir la estructura staging → intermediate → marts', en: 'Not following staging → intermediate → marts structure', pt: 'Não seguir a estrutura staging → intermediate → marts' },
      why: { es: 'Sin estructura clara, el proyecto se vuelve un caos', en: 'Without clear structure, the project becomes chaos', pt: 'Sem estrutura clara, o projeto vira um caos' },
      solution: { es: 'staging: 1:1 con fuente, marts: modelos de negocio', en: 'staging: 1:1 with source, marts: business models', pt: 'staging: 1:1 com fonte, marts: modelos de negócio' },
    },
    {
      mistake: { es: 'Olvidar tests en primary keys', en: 'Forgetting tests on primary keys', pt: 'Esquecer testes em chaves primárias' },
      why: { es: 'Duplicados pueden romper todo el pipeline', en: 'Duplicates can break the entire pipeline', pt: 'Duplicados podem quebrar todo o pipeline' },
      solution: { es: 'Siempre: unique + not_null en PKs', en: 'Always: unique + not_null on PKs', pt: 'Sempre: unique + not_null em PKs' },
      code: `# models/schema.yml
columns:
  - name: order_id
    tests:
      - unique
      - not_null`
    },
    {
      mistake: { es: 'Lógica de negocio en staging', en: 'Business logic in staging', pt: 'Lógica de negócio em staging' },
      why: { es: 'Staging debe ser limpieza mínima, no transformaciones', en: 'Staging should be minimal cleaning, not transformations', pt: 'Staging deve ser limpeza mínima, não transformações' },
      solution: { es: 'Staging: renombrar, castear. Marts: lógica de negocio', en: 'Staging: rename, cast. Marts: business logic', pt: 'Staging: renomear, cast. Marts: lógica de negócio' },
    },
  ],
  expectedOutputs: [
    {
      step: 6,
      description: { es: 'dbt run exitoso', en: 'Successful dbt run', pt: 'dbt run com sucesso' },
      example: `Running with dbt=1.7.0
Found 5 models, 8 tests, 0 snapshots

Concurrency: 4 threads

1 of 5 START sql view stg_orders
1 of 5 OK created sql view stg_orders [OK in 0.12s]
2 of 5 START sql view stg_customers
...
5 of 5 OK created sql table fct_orders [OK in 0.45s]

Finished running 3 views, 2 tables in 1.23s
Completed successfully`
    },
  ],
  interviewStory: {
    hook: { es: "Implementé dbt para estandarizar transformaciones de datos y reduje bugs en producción un 80% gracias a tests automáticos.", en: "Implemented dbt to standardize data transformations and reduced production bugs by 80% thanks to automated tests.", pt: "Implementei dbt para padronizar transformações de dados e reduzi bugs em produção em 80% graças a testes automáticos." },
    situation: { es: "El equipo tenía SQL scripts esparcidos en diferentes lugares, sin versionado, sin tests, sin documentación. Cuando algo fallaba, nadie sabía qué había cambiado.", en: "Team had SQL scripts scattered in different places, no versioning, no tests, no documentation. When something failed, no one knew what changed.", pt: "A equipe tinha scripts SQL espalhados em diferentes lugares, sem versionamento, sem testes, sem documentação. Quando algo falhava, ninguém sabia o que tinha mudado." },
    task: { es: "Migrar todas las transformaciones a dbt con estructura profesional, tests automáticos y documentación.", en: "Migrate all transformations to dbt with professional structure, automated tests, and documentation.", pt: "Migrar todas as transformações para dbt com estrutura profissional, testes automáticos e documentação." },
    actions: [
      { es: "Estructuré el proyecto en staging → intermediate → marts siguiendo best practices", en: "Structured project in staging → intermediate → marts following best practices", pt: "Estruturei o projeto em staging → intermediate → marts seguindo best practices" },
      { es: "Migré 25 scripts SQL a modelos dbt con ref() para dependencias", en: "Migrated 25 SQL scripts to dbt models with ref() for dependencies", pt: "Migrei 25 scripts SQL para modelos dbt com ref() para dependências" },
      { es: "Implementé tests de unique y not_null en todas las primary keys", en: "Implemented unique and not_null tests on all primary keys", pt: "Implementei testes de unique e not_null em todas as chaves primárias" },
      { es: "Agregué tests de accepted_values para campos críticos", en: "Added accepted_values tests for critical fields", pt: "Adicionei testes de accepted_values para campos críticos" },
      { es: "Generé documentación automática con dbt docs", en: "Generated automatic documentation with dbt docs", pt: "Gerei documentação automática com dbt docs" }
    ],
    results: [
      { es: "Bugs en producción bajaron 80% gracias a tests que corren en cada PR", en: "Production bugs dropped 80% thanks to tests running on each PR", pt: "Bugs em produção caíram 80% graças a testes que rodam em cada PR" },
      { es: "Onboarding de nuevos devs: de 2 semanas a 2 días con la documentación", en: "New dev onboarding: from 2 weeks to 2 days with documentation", pt: "Onboarding de novos devs: de 2 semanas para 2 dias com a documentação" },
      { es: "Tiempo de desarrollo de nuevos modelos: 50% más rápido con macros reutilizables", en: "New model dev time: 50% faster with reusable macros", pt: "Tempo de desenvolvimento de novos modelos: 50% mais rápido com macros reutilizáveis" },
      { es: "CI/CD completo: cada PR corre dbt build + test automáticamente", en: "Complete CI/CD: each PR runs dbt build + test automatically", pt: "CI/CD completo: cada PR roda dbt build + test automaticamente" }
    ],
    learnings: [
      { es: "La estructura staging → marts no es opcional - es lo que hace dbt mantenible", en: "Staging → marts structure is not optional - it's what makes dbt maintainable", pt: "A estrutura staging → marts não é opcional - é o que faz dbt sustentável" },
      { es: "Los tests son el ROI más alto - un test de 2 líneas puede evitar horas de debugging", en: "Tests have highest ROI - a 2-line test can save hours of debugging", pt: "Os testes são o ROI mais alto - um teste de 2 linhas pode evitar horas de debugging" },
      { es: "La documentación automática es un game changer para equipos", en: "Automatic documentation is a game changer for teams", pt: "A documentação automática é um game changer para equipes" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Por qué dbt y no solo SQL scripts?", en: "Why dbt and not just SQL scripts?", pt: "Por que dbt e não apenas scripts SQL?" },
        answer: { es: "dbt agrega: 1) Dependencias automáticas con ref(), 2) Tests integrados, 3) Documentación, 4) Versionado con Git, 5) Modularidad con macros. Es SQL con superpoderes.", en: "dbt adds: 1) Automatic dependencies with ref(), 2) Integrated tests, 3) Documentation, 4) Git versioning, 5) Modularity with macros. It's SQL with superpowers.", pt: "dbt adiciona: 1) Dependências automáticas com ref(), 2) Testes integrados, 3) Documentação, 4) Versionamento com Git, 5) Modularidade com macros. É SQL com superpoderes." }
      },
      {
        question: { es: "¿Cómo estructurás un proyecto dbt?", en: "How do you structure a dbt project?", pt: "Como estrutura um projeto dbt?" },
        answer: { es: "Staging: 1:1 con fuentes, solo renombrar y castear. Intermediate: lógica compartida. Marts: modelos de negocio finales. Nunca lógica de negocio en staging.", en: "Staging: 1:1 with sources, only rename and cast. Intermediate: shared logic. Marts: final business models. Never business logic in staging.", pt: "Staging: 1:1 com fontes, apenas renomear e cast. Intermediate: lógica compartilhada. Marts: modelos de negócio finais. Nunca lógica de negócio em staging." }
      },
      {
        question: { es: "¿Qué tests implementás siempre?", en: "What tests do you always implement?", pt: "Quais testes implementa sempre?" },
        answer: { es: "Mínimo: unique + not_null en PKs. Luego: accepted_values para enums, relationships para FKs, y tests custom para reglas de negocio.", en: "Minimum: unique + not_null on PKs. Then: accepted_values for enums, relationships for FKs, and custom tests for business rules.", pt: "Mínimo: unique + not_null em PKs. Depois: accepted_values para enums, relationships para FKs, e testes custom para regras de negócio." }
      }
    ],
    closingStatement: { es: "dbt transformó nuestro SQL de 'scripts que funcionan' a 'código de producción con calidad de software'.", en: "dbt transformed our SQL from 'scripts that work' to 'production code with software quality'.", pt: "dbt transformou nosso SQL de 'scripts que funcionam' para 'código de produção com qualidade de software'." }
  },
  prerequisites: ['p4-data-warehouse'],
  steps: [
    { 
      order: 1, 
      text: { es: '📦 Instalá dbt con DuckDB', en: '📦 Install dbt with DuckDB', pt: '📦 Instale dbt com DuckDB' },
      code: `# Instalar dbt-duckdb
pip install dbt-duckdb

# Verificar instalación
dbt --version`,
      explanation: { es: `**¿Por qué dbt + DuckDB?**

dbt (data build tool) es la herramienta estándar para transformar datos en Data Warehouses. Normalmente se usa con Snowflake, BigQuery o Redshift, pero esos cuestan dinero.

**dbt-duckdb** te permite aprender dbt gratis, usando DuckDB como base de datos local:
- ✅ Mismo dbt que usarías en producción
- ✅ Mismo SQL estándar
- ✅ Sin costo ni setup de cloud
- ✅ Cuando consigas trabajo, solo cambiás el adapter (dbt-snowflake, dbt-bigquery, etc.)

**El SQL que escribas en dbt es idéntico** sin importar si usás DuckDB, Snowflake o BigQuery.`, en: `**Why dbt + DuckDB?**

dbt (data build tool) is the standard tool for transforming data in Data Warehouses. Usually used with Snowflake, BigQuery or Redshift, but those cost money.

**dbt-duckdb** allows you to learn dbt for free, using DuckDB as local database:
- ✅ Same dbt you'd use in production
- ✅ Same standard SQL
- ✅ No cost or cloud setup
- ✅ When you get a job, just switch adapter (dbt-snowflake, dbt-bigquery, etc.)

**SQL you write in dbt is identical** regardless if you use DuckDB, Snowflake or BigQuery.`, pt: `**Por que dbt + DuckDB?**

dbt (data build tool) é a ferramenta padrão para transformar dados em Data Warehouses. Normalmente usada com Snowflake, BigQuery ou Redshift, mas esses custam dinheiro.

**dbt-duckdb** permite aprender dbt grátis, usando DuckDB como banco de dados local:
- ✅ Mesmo dbt que usaria em produção
- ✅ Mesmo SQL padrão
- ✅ Sem custo ou setup de cloud
- ✅ Quando conseguir trabalho, só troca o adapter (dbt-snowflake, dbt-bigquery, etc.)

**O SQL que você escreve no dbt é idêntico** não importa se usa DuckDB, Snowflake ou BigQuery.` },
      checkpoint: { es: '¿dbt --version funciona?', en: 'Does dbt --version work?', pt: 'dbt --version funciona?' }
    },
    { 
      order: 2, 
      text: { es: '🚀 Inicializá el proyecto', en: '🚀 Initialize project', pt: '🚀 Inicialize o projeto' },
      code: `# Crear proyecto
dbt init ecommerce_analytics

# Entrar al proyecto
cd ecommerce_analytics

# Estructura creada:
# ecommerce_analytics/
# ├── models/
# ├── seeds/
# ├── snapshots/
# ├── tests/
# ├── macros/
# └── dbt_project.yml`,
      explanation: { es: 'dbt init crea la estructura base del proyecto.', en: 'dbt init creates project base structure.', pt: 'dbt init cria a estrutura base do projeto.' }
    },
    { 
      order: 3, 
      text: { es: '⚙️ Configurá profiles.yml', en: '⚙️ Configure profiles.yml', pt: '⚙️ Configure profiles.yml' },
      code: `# ~/.dbt/profiles.yml

ecommerce_analytics:
  target: dev
  outputs:
    dev:
      type: duckdb
      path: 'ecommerce.duckdb'
      threads: 4`,
      explanation: { es: 'profiles.yml define la conexión a la base de datos. Está fuera del proyecto (en ~/.dbt/).', en: 'profiles.yml defines database connection. It is outside project (in ~/.dbt/).', pt: 'profiles.yml define a conexão com o banco de dados. Está fora do projeto (em ~/.dbt/).' },
      tip: { es: 'En producción, tendrías diferentes targets: dev, staging, prod.', en: 'In production, you would have different targets: dev, staging, prod.', pt: 'Em produção, teria diferentes targets: dev, staging, prod.' }
    },
    { 
      order: 4, 
      text: { es: '🌱 Cargá datos con seeds', en: '🌱 Load data with seeds', pt: '🌱 Carregue dados com seeds' },
      code: `# Copiá los CSVs a seeds/
# seeds/raw_orders.csv
# seeds/raw_customers.csv
# seeds/raw_products.csv

# Cargar seeds
dbt seed

# Verificar
dbt run-operation generate_source --args '{"schema_name": "main", "database_name": "ecommerce"}'`,
      explanation: { es: 'Seeds son archivos CSV que dbt carga a la base de datos. Perfecto para datos de referencia.', en: 'Seeds are CSV files dbt loads into database. Perfect for reference data.', pt: 'Seeds são arquivos CSV que o dbt carrega no banco de dados. Perfeito para dados de referência.' },
      checkpoint: { es: '¿dbt seed corre sin errores?', en: 'Does dbt seed run without errors?', pt: 'dbt seed roda sem erros?' }
    },
    { 
      order: 5, 
      text: { es: '📥 Creá modelos STAGING', en: '📥 Create STAGING models', pt: '📥 Crie modelos STAGING' },
      code: `-- models/staging/stg_orders.sql

WITH source AS (
    SELECT * FROM {{ ref('raw_orders') }}
),

renamed AS (
    SELECT
        order_id,
        customer_id,
        product_id,
        CAST(order_date AS DATE) AS order_date,
        CAST(quantity AS INTEGER) AS quantity,
        CAST(unit_price AS DECIMAL(10,2)) AS unit_price,
        CAST(total AS DECIMAL(10,2)) AS total_amount,
        CAST(discount AS DECIMAL(10,2)) AS discount_amount
    FROM source
)

SELECT * FROM renamed`,
      explanation: { es: 'Staging models son 1:1 con las fuentes. Solo renombran, castean tipos, no agregan lógica.', en: 'Staging models are 1:1 with sources. Only rename, cast types, no logic added.', pt: 'Staging models são 1:1 com as fontes. Apenas renomeiam, fazem cast de tipos, não adicionam lógica.' },
      tip: { es: '{{ ref() }} es la forma de referenciar otros modelos. dbt maneja las dependencias automáticamente.', en: '{{ ref() }} is how to reference other models. dbt handles dependencies automatically.', pt: '{{ ref() }} é a forma de referenciar outros modelos. dbt gerencia as dependências automaticamente.' }
    },
    { 
      order: 6, 
      text: { es: '🔧 Creá modelos INTERMEDIATE', en: '🔧 Create INTERMEDIATE models', pt: '🔧 Crie modelos INTERMEDIATE' },
      code: `-- models/intermediate/int_orders_enriched.sql

WITH orders AS (
    SELECT * FROM {{ ref('stg_orders') }}
),

customers AS (
    SELECT * FROM {{ ref('stg_customers') }}
),

products AS (
    SELECT * FROM {{ ref('stg_products') }}
),

enriched AS (
    SELECT
        o.order_id,
        o.order_date,
        o.quantity,
        o.unit_price,
        o.total_amount,
        o.discount_amount,
        
        -- Customer info
        c.customer_id,
        c.customer_name,
        c.customer_email,
        c.customer_city,
        
        -- Product info
        p.product_id,
        p.product_name,
        p.category,
        
        -- Calculated fields
        DATE_TRUNC('month', o.order_date) AS order_month,
        CASE 
            WHEN o.total_amount > 100 THEN 'High Value'
            WHEN o.total_amount > 50 THEN 'Medium Value'
            ELSE 'Low Value'
        END AS order_tier
        
    FROM orders o
    LEFT JOIN customers c ON o.customer_id = c.customer_id
    LEFT JOIN products p ON o.product_id = p.product_id
)

SELECT * FROM enriched`,
      explanation: { es: 'Intermediate models hacen JOINs y agregan lógica de negocio. Son el "trabajo pesado".', en: 'Intermediate models do JOINs and add business logic. They are the "heavy lifting".', pt: 'Intermediate models fazem JOINs e adicionam lógica de negócio. São o "trabalho pesado".' }
    },
    { 
      order: 7, 
      text: { es: '📊 Creá modelos MARTS', en: '📊 Create MARTS models', pt: '📊 Crie modelos MARTS' },
      code: `-- models/marts/fct_orders.sql

{{
    config(
        materialized='table'
    )
}}

WITH orders AS (
    SELECT * FROM {{ ref('int_orders_enriched') }}
)

SELECT
    order_id,
    order_date,
    order_month,
    customer_id,
    product_id,
    quantity,
    unit_price,
    total_amount,
    discount_amount,
    order_tier
FROM orders

-- models/marts/dim_customers.sql

{{
    config(
        materialized='table'
    )
}}

WITH customers AS (
    SELECT DISTINCT
        customer_id,
        customer_name,
        customer_email,
        customer_city
    FROM {{ ref('int_orders_enriched') }}
)

SELECT * FROM customers`,
      explanation: { es: 'Marts son los modelos finales que consumen los analistas. Fact tables y dimension tables.', en: 'Marts are final models consumed by analysts. Fact tables and dimension tables.', pt: 'Marts são os modelos finais que consomem os analistas. Fact tables e dimension tables.' },
      tip: { es: 'materialized="table" crea una tabla física. Por defecto dbt crea views.', en: 'materialized="table" creates a physical table. By default dbt creates views.', pt: 'materialized="table" cria uma tabela física. Por padrão dbt cria views.' }
    },
    { 
      order: 8, 
      text: { es: '✅ Agregá tests', en: '✅ Add tests', pt: '✅ Adicione testes' },
      code: `# models/staging/schema.yml

version: 2

models:
  - name: stg_orders
    description: "Staging de órdenes - datos limpios"
    columns:
      - name: order_id
        description: "Primary key de la orden"
        tests:
          - unique
          - not_null
      - name: customer_id
        description: "FK a customers"
        tests:
          - not_null
          - relationships:
              to: ref('stg_customers')
              field: customer_id
      - name: total_amount
        description: "Monto total de la orden"
        tests:
          - not_null
          - dbt_utils.accepted_range:
              min_value: 0

# Correr tests
# dbt test`,
      explanation: { es: 'Los tests de dbt validan la calidad de los datos automáticamente.', en: 'dbt tests validate data quality automatically.', pt: 'Os testes de dbt validam a qualidade dos dados automaticamente.' },
      checkpoint: { es: '¿dbt test pasa sin errores?', en: 'Does dbt test pass without errors?', pt: 'dbt test passa sem erros?' }
    },
    { 
      order: 9, 
      text: { es: '📝 Agregá documentación', en: '📝 Add documentation', pt: '📝 Adicione documentação' },
      code: `# models/marts/schema.yml

version: 2

models:
  - name: fct_orders
    description: |
      Fact table de órdenes.
      
      **Granularidad**: Una fila por orden.
      
      **Uso**: Análisis de ventas, revenue, comportamiento de clientes.
    columns:
      - name: order_id
        description: "Identificador único de la orden"
      - name: order_tier
        description: |
          Clasificación de la orden por valor:
          - High Value: > $100
          - Medium Value: $50-$100
          - Low Value: < $50

# Generar documentación
# dbt docs generate
# dbt docs serve`,
      explanation: { es: 'dbt docs generate crea documentación HTML automáticamente. dbt docs serve la sirve en localhost.', en: 'dbt docs generate creates HTML documentation automatically. dbt docs serve serves it on localhost.', pt: 'dbt docs generate cria documentação HTML automaticamente. dbt docs serve a serve em localhost.' },
      tip: { es: 'La documentación incluye el lineage (de dónde vienen los datos).', en: 'Documentation includes lineage (where data comes from).', pt: 'A documentação inclui o lineage (de onde vêm os dados).' }
    },
    { 
      order: 10, 
      text: { es: '🚀 Corré todo el proyecto', en: '🚀 Run the whole project', pt: '🚀 Rode todo o projeto' },
      code: `# Correr todos los modelos
dbt run

# Correr tests
dbt test

# Generar docs
dbt docs generate
dbt docs serve

# Todo junto
dbt build  # run + test`,
      explanation: { es: 'dbt build es el comando más completo: corre modelos y tests en orden.', en: 'dbt build is the most complete command: runs models and tests in order.', pt: 'dbt build é o comando mais completo: roda modelos e testes em ordem.' },
      checkpoint: { es: '¿dbt build pasa sin errores?', en: 'Does dbt build pass without errors?', pt: 'dbt build passa sem erros?' }
    },
  ],
  deliverable: { es: 'Repositorio dbt completo con: models/, tests/, schema.yml, README', en: 'Complete dbt repository with: models/, tests/, schema.yml, README', pt: 'Repositório dbt completo com: models/, tests/, schema.yml, README' },
  evaluation: [
    { es: '¿Seguiste la estructura staging → intermediate → marts?', en: 'Did you follow staging → intermediate → marts structure?', pt: 'Seguiu a estrutura staging → intermediate → marts?' },
    { es: '¿Cada modelo tiene descripción en schema.yml?', en: 'Does each model have description in schema.yml?', pt: 'Cada modelo tem descrição no schema.yml?' },
    { es: '¿Todos los PKs tienen tests unique + not_null?', en: 'Do all PKs have unique + not_null tests?', pt: 'Todos os PKs têm testes unique + not_null?' },
    { es: '¿La documentación se genera correctamente?', en: 'Is documentation generated correctly?', pt: 'A documentação gera corretamente?' },
    { es: '¿dbt build pasa sin errores?', en: 'Does dbt build pass without errors?', pt: 'dbt build passa sem erros?' },
  ],
  theory: { es: `## Estructura de Proyecto dbt

\`\`\`
models/
├── staging/          # 1:1 con fuentes, solo limpiar
│   ├── stg_orders.sql
│   └── stg_customers.sql
├── intermediate/     # JOINs, lógica de negocio
│   └── int_orders_enriched.sql
└── marts/           # Modelos finales para consumo
    ├── fct_orders.sql
    └── dim_customers.sql
\`\`\`

## Tests Nativos de dbt

| Test | Valida |
|------|--------|
| unique | No hay duplicados |
| not_null | No hay nulos |
| relationships | FK existe en otra tabla |
| accepted_values | Solo valores permitidos |

## Materializations

| Tipo | Crea | Uso | Cuándo |
|------|------|-----|--------|
| **view** | Vista | Staging | Tablas pequeñas, lectura frecuente |
| **table** | Tabla | Marts | Tablas medianas, queries pesadas |
| **incremental** | Tabla + INSERT | Facts | Tablas grandes (>1M filas) |
| **ephemeral** | CTE | Helpers | Lógica compartida, no persistir |

## Modelos Incrementales (MUY IMPORTANTE)

**¿Por qué?** Una fact table con 100M de filas no puede recargarse cada vez.

\`\`\`sql
-- models/marts/fct_orders.sql
{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge'
  )
}}

SELECT
  order_id,
  customer_id,
  amount,
  created_at
FROM {{ ref('stg_orders') }}

{% if is_incremental() %}
  -- Solo filas nuevas desde la última corrida
  WHERE created_at > (SELECT MAX(created_at) FROM {{ this }})
{% endif %}
\`\`\`

**Estrategias incrementales:**
| Estrategia | Descripción | Cuándo usar |
|------------|-------------|-------------|
| **append** | Solo INSERT | Datos inmutables (logs) |
| **merge** | UPSERT (INSERT o UPDATE) | Datos que cambian |
| **delete+insert** | Borra y reinserta | Cuando merge no está disponible |

## Full Refresh vs Incremental

\`\`\`bash
# Incremental (solo nuevos datos)
dbt run --select fct_orders

# Full refresh (recarga todo)
dbt run --select fct_orders --full-refresh
\`\`\`

**Tip**: Hacé full refresh periódicamente (semanal) para limpiar inconsistencias.`, en: `## dbt Project Structure

\`\`\`
models/
├── staging/          # 1:1 with sources, only clean
│   ├── stg_orders.sql
│   └── stg_customers.sql
├── intermediate/     # JOINs, business logic
│   └── int_orders_enriched.sql
└── marts/           # Final models for consumption
    ├── fct_orders.sql
    └── dim_customers.sql
\`\`\`

## Native dbt Tests

| Test | Validates |
|------|-----------|
| unique | No duplicates |
| not_null | No nulls |
| relationships | FK exists in another table |
| accepted_values | Only allowed values |

## Materializations

| Type | Creates | Use | When |
|------|---------|-----|------|
| **view** | View | Staging | Small tables, frequent read |
| **table** | Table | Marts | Medium tables, heavy queries |
| **incremental** | Table + INSERT | Facts | Large tables (>1M rows) |
| **ephemeral** | CTE | Helpers | Shared logic, don't persist |

## Incremental Models (VERY IMPORTANT)

**Why?** A fact table with 100M rows cannot be reloaded every time.

\`\`\`sql
-- models/marts/fct_orders.sql
{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge'
  )
}}

SELECT
  order_id,
  customer_id,
  amount,
  created_at
FROM {{ ref('stg_orders') }}

{% if is_incremental() %}
  -- Only new rows since last run
  WHERE created_at > (SELECT MAX(created_at) FROM {{ this }})
{% endif %}
\`\`\`

**Incremental Strategies:**
| Strategy | Description | When to use |
|----------|-------------|-------------|
| **append** | Only INSERT | Immutable data (logs) |
| **merge** | UPSERT (INSERT or UPDATE) | Changing data |
| **delete+insert** | Delete and reinsert | When merge unavailable |

## Full Refresh vs Incremental

\`\`\`bash
# Incremental (only new data)
dbt run --select fct_orders

# Full refresh (reload everything)
dbt run --select fct_orders --full-refresh
\`\`\`

**Tip**: Do full refresh periodically (weekly) to clean inconsistencies.`, pt: `## Estrutura de Projeto dbt

\`\`\`
models/
├── staging/          # 1:1 com fontes, apenas limpar
│   ├── stg_orders.sql
│   └── stg_customers.sql
├── intermediate/     # JOINs, lógica de negócio
│   └── int_orders_enriched.sql
└── marts/           # Modelos finais para consumo
    ├── fct_orders.sql
    └── dim_customers.sql
\`\`\`

## Testes Nativos de dbt

| Teste | Valida |
|-------|--------|
| unique | Não há duplicados |
| not_null | Não há nulos |
| relationships | FK existe em outra tabela |
| accepted_values | Apenas valores permitidos |

## Materializations

| Tipo | Cria | Uso | Quando |
|------|------|-----|--------|
| **view** | Vista | Staging | Tabelas pequenas, leitura frequente |
| **table** | Tabela | Marts | Tabelas médias, queries pesadas |
| **incremental** | Tabela + INSERT | Facts | Tabelas grandes (>1M linhas) |
| **ephemeral** | CTE | Helpers | Lógica compartilhada, não persistir |

## Modelos Incrementais (MUITO IMPORTANTE)

**Por que?** Uma fact table com 100M de linhas não pode ser recarregada a cada vez.

\`\`\`sql
-- models/marts/fct_orders.sql
{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge'
  )
}}

SELECT
  order_id,
  customer_id,
  amount,
  created_at
FROM {{ ref('stg_orders') }}

{% if is_incremental() %}
  -- Apenas linhas novas desde a última corrida
  WHERE created_at > (SELECT MAX(created_at) FROM {{ this }})
{% endif %}
\`\`\`

**Estratégias incrementais:**
| Estratégia | Descrição | Quando usar |
|------------|-----------|-------------|
| **append** | Apenas INSERT | Dados imutáveis (logs) |
| **merge** | UPSERT (INSERT ou UPDATE) | Dados que mudam |
| **delete+insert** | Apaga e reinsere | Quando merge não está disponível |

## Full Refresh vs Incremental

\`\`\`bash
# Incremental (apenas novos dados)
dbt run --select fct_orders

# Full refresh (recarrega tudo)
dbt run --select fct_orders --full-refresh
\`\`\`

**Tip**: Faça full refresh periodicamente (semanal) para limpar inconsistências.` },
  nextSteps: [
    { es: 'Implementá modelos incrementales', en: 'Implement incremental models', pt: 'Implemente modelos incrementais' },
    { es: 'Usá snapshots para SCD Type 2', en: 'Use snapshots for SCD Type 2', pt: 'Use snapshots para SCD Type 2' },
    { es: 'Creá macros reutilizables', en: 'Create reusable macros', pt: 'Crie macros reutilizáveis' },
  ],
};


