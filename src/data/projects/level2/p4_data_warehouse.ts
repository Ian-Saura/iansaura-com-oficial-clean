import { Project } from '../../../types/members';

export const p4_data_warehouse: Project = {
  id: 'p4-data-warehouse',
  level: 2,
  title: { es: 'Data Warehouse con Modelo Dimensional', en: 'Data Warehouse with Dimensional Modeling', pt: 'Data Warehouse com Modelo Dimensional' },
  description: {
    es: 'Diseñá e implementá un Data Warehouse real con modelo estrella. Vas a aprender el patrón que usan empresas como Amazon, Netflix y Spotify para analytics.',
    en: 'Design and implement a real Data Warehouse with star schema. You will learn the pattern used by companies like Amazon, Netflix, and Spotify for analytics.',
    pt: 'Projete e implemente um Data Warehouse real com modelo estrela. Você aprenderá o padrão usado por empresas como Amazon, Netflix e Spotify para analytics.'
  },
  difficulty: 'Intermedio',
  duration: '4-5 horas',
  skills: [{ es: 'SQL' }, { es: 'Modelado Dimensional', en: 'Dimensional Modeling', pt: 'Modelagem Dimensional' }, { es: 'Star Schema' }, { es: 'DuckDB' }, { es: 'ETL' }],
  icon: '🏛️',
  color: 'blue',
  datasetId: 'ecommerce',
  prerequisites: ['p1-etl-python', 'p1-extra-sql-joins'],
  estimatedLines: 200,
  realWorldExample: {
    es: 'Así modela Amazon sus datos de ventas para reportes ejecutivos',
    en: 'This is how Amazon models its sales data for executive reports',
    pt: 'Assim a Amazon modela seus dados de vendas para relatórios executivos'
  },
  usedBy: ['Amazon', 'Netflix', 'Walmart', 'Target'],
  learningObjectives: [
    { es: 'Entender OLTP vs OLAP', en: 'Understand OLTP vs OLAP', pt: 'Entender OLTP vs OLAP' },
    { es: 'Diseñar modelos dimensionales (Star Schema)', en: 'Design dimensional models (Star Schema)', pt: 'Projetar modelos dimensionais (Star Schema)' },
    { es: 'Implementar Surrogate Keys', en: 'Implement Surrogate Keys', pt: 'Implementar Surrogate Keys' },
    { es: 'Crear tablas de dimensiones y hechos', en: 'Create dimension and fact tables', pt: 'Criar tabelas de dimensões e fatos' },
    { es: 'Escribir queries analíticas eficientes', en: 'Write efficient analytical queries', pt: 'Escrever queries analíticas eficientes' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'Poner atributos en la fact table', en: 'Putting attributes in the fact table', pt: 'Colocar atributos na fact table' },
      why: { es: 'Los atributos descriptivos deben ir en dimensiones, no en hechos', en: 'Descriptive attributes should go in dimensions, not facts', pt: 'Os atributos descritivos devem ir em dimensões, não em fatos' },
      solution: { es: 'La fact table solo tiene: keys + métricas numéricas', en: 'The fact table only has: keys + numeric metrics', pt: 'A fact table só tem: keys + métricas numéricas' },
      code: `-- ❌ Malo: nombre_producto en fact
CREATE TABLE fact_ventas (
    producto_id INT,
    nombre_producto VARCHAR,  -- NO!
    cantidad INT
);

-- ✅ Bueno: nombre en dimensión
CREATE TABLE dim_producto (producto_id, nombre, ...);
CREATE TABLE fact_ventas (producto_key, cantidad, monto);`
    },
    {
      mistake: { es: 'Olvidar la dimensión de fecha', en: 'Forgetting the date dimension', pt: 'Esquecer a dimensão de data' },
      why: { es: 'El 90% de los análisis son temporales (ventas por mes, año)', en: '90% of analyses are temporal (sales by month, year)', pt: '90% das análises são temporais (vendas por mês, ano)' },
      solution: { es: 'Siempre creá dim_fecha con atributos útiles', en: 'Always create dim_date with useful attributes', pt: 'Sempre crie dim_data com atributos úteis' },
    },
    {
      mistake: { es: 'No usar surrogate keys', en: 'Not using surrogate keys', pt: 'Não usar surrogate keys' },
      why: { es: 'Los IDs del sistema fuente pueden cambiar o duplicarse', en: 'Source system IDs can change or duplicate', pt: 'Os IDs do sistema fonte podem mudar ou duplicar' },
      solution: { es: 'Generá tus propios IDs (1, 2, 3...) para el warehouse', en: 'Generate your own IDs (1, 2, 3...) for the warehouse', pt: 'Gere seus próprios IDs (1, 2, 3...) para o warehouse' },
    },
  ],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Estructura del Star Schema', en: 'Star Schema Structure', pt: 'Estrutura do Star Schema' },
      example: `DIMENSIONES:
  dim_fecha: 365 filas (1 por día)
  dim_producto: 200 filas
  dim_cliente: 500 filas
  
HECHOS:
  fact_ventas: 10,000 filas
  
Relaciones:
  fact_ventas.fecha_key → dim_fecha
  fact_ventas.producto_key → dim_producto
  fact_ventas.cliente_key → dim_cliente`
    },
    {
      step: 7,
      description: { es: 'Query analítica sobre el modelo', en: 'Analytical query on the model', pt: 'Query analítica sobre o modelo' },
      example: `+----------+------------+--------+----------+
| mes      | categoria  | ventas | clientes |
+----------+------------+--------+----------+
| 2024-01  | Electronics| 125000 | 234      |
| 2024-01  | Clothing   | 85000  | 189      |
| 2024-02  | Electronics| 142000 | 267      |
+----------+------------+--------+----------+`
    },
  ],
  interviewStory: {
    hook: { es: "Diseñé un Data Warehouse con modelo estrella que redujo el tiempo de reportes ejecutivos de 4 horas a 30 segundos.", en: "Designed a Data Warehouse with star schema that reduced executive reporting time from 4 hours to 30 seconds.", pt: "Projetei um Data Warehouse com modelo estrela que reduziu o tempo de relatórios executivos de 4 horas para 30 segundos." },
    situation: { es: "La empresa tenía datos de ventas en un sistema transaccional (OLTP) que no estaba diseñado para analytics. Los reportes mensuales tardaban horas porque las queries eran muy complejas.", en: "The company had sales data in a transactional system (OLTP) not designed for analytics. Monthly reports took hours because queries were very complex.", pt: "A empresa tinha dados de vendas em um sistema transacional (OLTP) que não estava projetado para analytics. Os relatórios mensais demoravam horas porque as queries eram muito complexas." },
    task: { es: "Diseñar e implementar un Data Warehouse con modelo dimensional que permitiera análisis rápido y flexible.", en: "Design and implement a Data Warehouse with dimensional modeling allowing fast and flexible analysis.", pt: "Projetar e implementar um Data Warehouse com modelo dimensional que permitisse análise rápida e flexível." },
    actions: [
      { es: "Analicé los requerimientos de negocio: qué preguntas necesitaban responder", en: "Analyzed business requirements: what questions they needed to answer", pt: "Analisei os requisitos de negócio: quais perguntas precisavam responder" },
      { es: "Diseñé un Star Schema con dim_fecha, dim_producto, dim_cliente y fact_ventas", en: "Designed a Star Schema with dim_date, dim_product, dim_customer, and fact_sales", pt: "Projetei um Star Schema com dim_data, dim_produto, dim_cliente e fact_vendas" },
      { es: "Implementé surrogate keys para independizar el warehouse del sistema fuente", en: "Implemented surrogate keys to decouple warehouse from source system", pt: "Implementei surrogate keys para tornar o warehouse independente do sistema fonte" },
      { es: "Creé el proceso ETL para cargar datos diariamente", en: "Created ETL process to load data daily", pt: "Criei o processo ETL para carregar dados diariamente" },
      { es: "Optimicé con índices en las foreign keys de la fact table", en: "Optimized with indexes on foreign keys of the fact table", pt: "Otimizei com índices nas chaves estrangeiras da fact table" }
    ],
    results: [
      { es: "Reportes que tardaban 4 horas ahora corren en 30 segundos", en: "Reports that took 4 hours now run in 30 seconds", pt: "Relatórios que demoravam 4 horas agora rodam em 30 segundos" },
      { es: "El equipo de negocio puede hacer análisis ad-hoc sin ayuda de IT", en: "Business team can do ad-hoc analysis without IT help", pt: "A equipe de negócio pode fazer análises ad-hoc sem ajuda de TI" },
      { es: "Identificamos que el 20% de productos generaba el 80% de revenue", en: "Identified that 20% of products generated 80% of revenue", pt: "Identificamos que 20% dos produtos geravam 80% da receita" },
      { es: "El modelo soporta 3 años de historia con performance excelente", en: "Model supports 3 years of history with excellent performance", pt: "O modelo suporta 3 anos de histórico com performance excelente" }
    ],
    learnings: [
      { es: "El modelado dimensional es contra-intuitivo al principio - la desnormalización es intencional", en: "Dimensional modeling is counter-intuitive at first - denormalization is intentional", pt: "A modelagem dimensional é contra-intuitiva no início - a desnormalização é intencional" },
      { es: "La dimensión de fecha es crítica - el 90% de las preguntas de negocio son temporales", en: "Date dimension is critical - 90% of business questions are temporal", pt: "A dimensão de data é crítica - 90% das perguntas de negócio são temporais" },
      { es: "Surrogate keys evitan problemas cuando el sistema fuente cambia IDs", en: "Surrogate keys avoid problems when source system changes IDs", pt: "Surrogate keys evitam problemas quando o sistema fonte muda IDs" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cuál es la diferencia entre Star Schema y Snowflake?", en: "What is the difference between Star Schema and Snowflake?", pt: "Qual a diferença entre Star Schema e Snowflake?" },
        answer: { es: "En Star las dimensiones están desnormalizadas (una tabla). En Snowflake están normalizadas (múltiples tablas). Star es más simple y rápido para queries; Snowflake ahorra espacio pero complica los JOINs.", en: "In Star dimensions are denormalized (one table). In Snowflake they are normalized (multiple tables). Star is simpler and faster for queries; Snowflake saves space but complicates JOINs.", pt: "Em Star as dimensões estão desnormalizadas (uma tabela). Em Snowflake estão normalizadas (múltiplas tabelas). Star é mais simples e rápido para queries; Snowflake economiza espaço mas complica os JOINs." }
      },
      {
        question: { es: "¿Por qué usaste surrogate keys?", en: "Why did you use surrogate keys?", pt: "Por que usou surrogate keys?" },
        answer: { es: "Tres razones: 1) Los IDs del sistema fuente pueden cambiar, 2) Permiten manejar slowly changing dimensions, 3) Son más eficientes (INT vs VARCHAR) para JOINs.", en: "Three reasons: 1) Source system IDs can change, 2) Allow handling slowly changing dimensions, 3) More efficient (INT vs VARCHAR) for JOINs.", pt: "Três razões: 1) Os IDs do sistema fonte podem mudar, 2) Permitem lidar com slowly changing dimensions, 3) São mais eficientes (INT vs VARCHAR) para JOINs." }
      },
      {
        question: { es: "¿Cómo manejarías cambios en las dimensiones?", en: "How would you handle changes in dimensions?", pt: "Como lidaria com mudanças nas dimensões?" },
        answer: { es: "Depende del caso. Type 1: sobrescribo (para correcciones). Type 2: creo nueva fila con fecha efectiva (para historial). Type 3: agrego columna 'anterior' (para comparaciones simples).", en: "Depends on the case. Type 1: overwrite (for corrections). Type 2: create new row with effective date (for history). Type 3: add 'previous' column (for simple comparisons).", pt: "Depende do caso. Type 1: sobrescrevo (para correções). Type 2: crio nova linha com data efetiva (para histórico). Type 3: adiciono coluna 'anterior' (para comparações simples)." }
      }
    ],
    closingStatement: { es: "El modelado dimensional es el fundamento de todo Data Warehouse - si lo hacés bien, todo lo demás es fácil.", en: "Dimensional modeling is the foundation of every Data Warehouse - if you do it right, everything else is easy.", pt: "A modelagem dimensional é o fundamento de todo Data Warehouse - se fizer bem, tudo o resto é fácil." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📖 Entendé OLTP vs OLAP', en: '📖 Understand OLTP vs OLAP', pt: '📖 Entenda OLTP vs OLAP' },
      explanation: { es: `**OLTP (Online Transaction Processing)**: Bases de datos operacionales optimizadas para INSERT/UPDATE. Ej: la base de datos de tu e-commerce donde se guardan las órdenes.

**OLAP (Online Analytical Processing)**: Data Warehouses optimizados para SELECT con agregaciones. Ej: donde los analistas hacen reportes de ventas por mes.

El modelo dimensional (Star Schema) es el estándar para OLAP.`, en: `**OLTP (Online Transaction Processing)**: Operational databases optimized for INSERT/UPDATE. E.g., your e-commerce database storing orders.

**OLAP (Online Analytical Processing)**: Data Warehouses optimized for SELECT with aggregations. E.g., where analysts make monthly sales reports.

Dimensional modeling (Star Schema) is the standard for OLAP.`, pt: `**OLTP (Online Transaction Processing)**: Bases de dados operacionais otimizadas para INSERT/UPDATE. Ex: a base de dados do seu e-commerce onde as ordens são salvas.

**OLAP (Online Analytical Processing)**: Data Warehouses otimizados para SELECT com agregações. Ex: onde os analistas fazem relatórios de vendas por mês.

O modelo dimensional (Star Schema) é o padrão para OLAP.` },
      checkpoint: { es: '¿Podés explicar la diferencia entre OLTP y OLAP?', en: 'Can you explain the difference between OLTP and OLAP?', pt: 'Pode explicar a diferença entre OLTP e OLAP?' }
    },
    { 
      order: 2, 
      text: { es: '🦆 ¿Qué es DuckDB y por qué lo usamos?', en: '🦆 What is DuckDB and why do we use it?', pt: '🦆 O que é DuckDB e por que o usamos?' },
      explanation: { es: `**DuckDB** es una base de datos analítica (OLAP) que corre **localmente en tu máquina**, sin necesidad de instalar un servidor.

### ¿Por qué DuckDB para este proyecto?

| Alternativa | Problema | Por qué DuckDB es mejor aquí |
|-------------|----------|------------------------------|
| PostgreSQL | Necesitás instalar y configurar un servidor | DuckDB es un archivo, sin setup |
| MySQL | Igual, requiere servidor corriendo | DuckDB corre "in-process" |
| Snowflake/BigQuery | Cuestan dinero y requieren cuenta | DuckDB es gratis y local |
| SQLite | Optimizado para OLTP, no analytics | DuckDB está optimizado para OLAP |

### Sintaxis: DuckDB vs PostgreSQL/MySQL

La buena noticia: **DuckDB usa SQL estándar**, muy similar a PostgreSQL. Las diferencias son mínimas:

\`\`\`sql
-- Esto funciona IGUAL en DuckDB, PostgreSQL y MySQL:
SELECT customer_id, SUM(total) as revenue
FROM orders
GROUP BY customer_id
ORDER BY revenue DESC;

-- Funciones de fecha (pequeñas diferencias):
-- DuckDB/PostgreSQL:
EXTRACT(YEAR FROM order_date)

-- MySQL:
YEAR(order_date)
\`\`\`

### Instalación (super simple)
\`\`\`bash
pip install duckdb
\`\`\`

### Uso básico
\`\`\`python
import duckdb

# Crear conexión (en memoria o archivo)
con = duckdb.connect()  # En memoria
# con = duckdb.connect('mi_warehouse.db')  # Persistente

# Ejecutar SQL normalmente
con.execute("CREATE TABLE test (id INT, name VARCHAR)")
con.execute("INSERT INTO test VALUES (1, 'Juan')")
result = con.execute("SELECT * FROM test").fetchall()
\`\`\`

**En producción** usarías Snowflake, BigQuery o Redshift. DuckDB es perfecto para **aprender y prototipar** porque el SQL es prácticamente idéntico.`, en: `**DuckDB** is an analytical database (OLAP) that runs **locally on your machine**, without needing to install a server.

### Why DuckDB for this project?

| Alternative | Problem | Why DuckDB is better here |
|-------------|---------|---------------------------|
| PostgreSQL | Need to install and configure server | DuckDB is a file, no setup |
| MySQL | Same, requires running server | DuckDB runs "in-process" |
| Snowflake/BigQuery | Cost money and require account | DuckDB is free and local |
| SQLite | Optimized for OLTP, not analytics | DuckDB is optimized for OLAP |

### Syntax: DuckDB vs PostgreSQL/MySQL

Good news: **DuckDB uses standard SQL**, very similar to PostgreSQL. Differences are minimal:

\`\`\`sql
-- This works THE SAME in DuckDB, PostgreSQL and MySQL:
SELECT customer_id, SUM(total) as revenue
FROM orders
GROUP BY customer_id
ORDER BY revenue DESC;

-- Date functions (small differences):
-- DuckDB/PostgreSQL:
EXTRACT(YEAR FROM order_date)

-- MySQL:
YEAR(order_date)
\`\`\`

### Installation (super simple)
\`\`\`bash
pip install duckdb
\`\`\`

### Basic Usage
\`\`\`python
import duckdb

# Create connection (in memory or file)
con = duckdb.connect()  # In memory
# con = duckdb.connect('my_warehouse.db')  # Persistent

# Execute SQL normally
con.execute("CREATE TABLE test (id INT, name VARCHAR)")
con.execute("INSERT INTO test VALUES (1, 'Juan')")
result = con.execute("SELECT * FROM test").fetchall()
\`\`\`

**In production** you would use Snowflake, BigQuery, or Redshift. DuckDB is perfect for **learning and prototyping** because the SQL is practically identical.`, pt: `**DuckDB** é uma base de dados analítica (OLAP) que roda **localmente na sua máquina**, sem necessidade de instalar um servidor.

### Por que DuckDB para este projeto?

| Alternativa | Problema | Por que DuckDB é melhor aqui |
|-------------|----------|------------------------------|
| PostgreSQL | Precisa instalar e configurar um servidor | DuckDB é um arquivo, sem setup |
| MySQL | Igual, requer servidor rodando | DuckDB roda "in-process" |
| Snowflake/BigQuery | Custam dinheiro e requerem conta | DuckDB é grátis e local |
| SQLite | Otimizado para OLTP, não analytics | DuckDB está otimizado para OLAP |

### Sintaxe: DuckDB vs PostgreSQL/MySQL

A boa notícia: **DuckDB usa SQL padrão**, muito similar ao PostgreSQL. As diferenças são mínimas:

\`\`\`sql
-- Isso funciona IGUAL em DuckDB, PostgreSQL e MySQL:
SELECT customer_id, SUM(total) as revenue
FROM orders
GROUP BY customer_id
ORDER BY revenue DESC;

-- Funções de data (pequenas diferenças):
-- DuckDB/PostgreSQL:
EXTRACT(YEAR FROM order_date)

-- MySQL:
YEAR(order_date)
\`\`\`

### Instalação (super simples)
\`\`\`bash
pip install duckdb
\`\`\`

### Uso básico
\`\`\`python
import duckdb

# Criar conexão (em memória ou arquivo)
con = duckdb.connect()  # Em memória
# con = duckdb.connect('meu_warehouse.db')  # Persistente

# Executar SQL normalmente
con.execute("CREATE TABLE test (id INT, name VARCHAR)")
con.execute("INSERT INTO test VALUES (1, 'Juan')")
result = con.execute("SELECT * FROM test").fetchall()
\`\`\`

**Em produção** você usaria Snowflake, BigQuery ou Redshift. DuckDB é perfeito para **aprender e prototipar** porque o SQL é praticamente idêntico.` },
      tip: { es: 'DuckDB es como "SQLite para analytics". Ideal para aprender porque no necesitás infraestructura.', en: 'DuckDB is like "SQLite for analytics". Ideal for learning because you don\'t need infrastructure.', pt: 'DuckDB é como "SQLite para analytics". Ideal para aprender porque não precisa de infraestrutura.' },
      checkpoint: { es: '¿Instalaste DuckDB con pip install duckdb?', en: 'Did you install DuckDB with pip install duckdb?', pt: 'Instalou DuckDB com pip install duckdb?' }
    },
    { 
      order: 3, 
      text: { es: '📥 Descargá y explorá el dataset', en: '📥 Download and explore the dataset', pt: '📥 Baixe e explore o dataset' },
      code: `import duckdb
import glob
import os

# Buscar los archivos CSV descargados
archivos = glob.glob('data/ecommerce_*.csv')
print(f"📂 Archivos encontrados: {len(archivos)}")
for f in sorted(archivos)[:5]:
    print(f"  - {os.path.basename(f)}")

# Crear conexión a DuckDB (en memoria para este ejercicio)
# Si querés persistir, usá: con = duckdb.connect('warehouse.db')
con = duckdb.connect()

# Cargar cada CSV como tabla "raw" (simulan el sistema OLTP de origen)
for filepath in archivos:
    # Extraer nombre de tabla del archivo (ej: ecommerce_orders.csv -> orders)
    table_name = os.path.basename(filepath).replace('ecommerce_', '').replace('.csv', '')
    con.execute(f"CREATE TABLE raw_{table_name} AS SELECT * FROM read_csv_auto('{filepath}')")
    count = con.execute(f"SELECT COUNT(*) FROM raw_{table_name}").fetchone()[0]
    print(f"raw_{table_name}: {count} filas")

# Explorar estructura (igual que en PostgreSQL)
print("\\n📋 Estructura de raw_orders:")
print(con.execute("DESCRIBE raw_orders").fetchall())

# Ver primeras filas
print("\\n📊 Primeras filas:")
print(con.execute("SELECT * FROM raw_orders LIMIT 3").fetchdf())`,
      explanation: { es: `Primero cargamos los datos "raw" (crudos) que simulan el sistema OLTP de origen.

**Nota sobre DuckDB:**
- \`con.execute()\` ejecuta cualquier SQL estándar
- \`.fetchall()\` devuelve lista de tuplas
- \`.fetchdf()\` devuelve un DataFrame de Pandas (muy útil!)
- \`DESCRIBE tabla\` muestra la estructura (igual que PostgreSQL)`, en: `First we load "raw" data simulating the source OLTP system.

**Note on DuckDB:**
- \`con.execute()\` executes any standard SQL
- \`.fetchall()\` returns list of tuples
- \`.fetchdf()\` returns Pandas DataFrame (very useful!)
- \`DESCRIBE table\` shows structure (same as PostgreSQL)`, pt: `Primeiro carregamos os dados "raw" (crus) que simulam o sistema OLTP de origem.

**Nota sobre DuckDB:**
- \`con.execute()\` executa qualquer SQL padrão
- \`.fetchall()\` retorna lista de tuplas
- \`.fetchdf()\` retorna DataFrame do Pandas (muito útil!)
- \`DESCRIBE tabela\` mostra a estrutura (igual ao PostgreSQL)` },
      checkpoint: { es: '¿Tenés las tablas raw_orders, raw_order_items, raw_customers, raw_products?', en: 'Do you have raw_orders, raw_order_items, raw_customers, raw_products tables?', pt: 'Tem as tabelas raw_orders, raw_order_items, raw_customers, raw_products?' }
    },
    { 
      order: 4, 
      text: { es: '📐 Diseñá el modelo dimensional', en: '📐 Design the dimensional model', pt: '📐 Projete o modelo dimensional' },
      explanation: { es: `Dibujá en papel o draw.io el modelo Star Schema:

**Fact Table (centro)**: fact_order_items
- order_item_key (PK, surrogate)
- customer_key (FK)
- product_key (FK)
- date_key (FK)
- order_id (degenerate dimension - ID original)
- quantity (métrica)
- unit_price (métrica)
- line_total (métrica)
- discount_amount (métrica)

**¿Por qué "order_items" y no "orders"?**
El "grain" (granularidad) debe ser el nivel más bajo de detalle que necesitás.
- raw_orders tiene info de la orden (cliente, fecha)
- raw_order_items tiene el detalle (qué productos, cantidades, precios)
- Para analizar productos, necesitás el nivel de ITEM

**Dimensiones (puntas de la estrella)**:
- dim_customers: customer_key, customer_id, name, email, city, country
- dim_products: product_key, product_id, name, category, price
- dim_date: date_key, full_date, year, quarter, month, day, day_of_week, is_weekend`, en: `Draw on paper or draw.io the Star Schema model:

**Fact Table (center)**: fact_order_items
- order_item_key (PK, surrogate)
- customer_key (FK)
- product_key (FK)
- date_key (FK)
- order_id (degenerate dimension - original ID)
- quantity (metric)
- unit_price (metric)
- line_total (metric)
- discount_amount (metric)

**Why "order_items" and not "orders"?**
The "grain" (granularity) must be the lowest level of detail you need.
- raw_orders has order info (customer, date)
- raw_order_items has detail (which products, quantities, prices)
- To analyze products, you need ITEM level

**Dimensions (star points)**:
- dim_customers: customer_key, customer_id, name, email, city, country
- dim_products: product_key, product_id, name, category, price
- dim_date: date_key, full_date, year, quarter, month, day, day_of_week, is_weekend`, pt: `Desenhe no papel ou draw.io o modelo Star Schema:

**Fact Table (centro)**: fact_order_items
- order_item_key (PK, surrogate)
- customer_key (FK)
- product_key (FK)
- date_key (FK)
- order_id (degenerate dimension - ID original)
- quantity (métrica)
- unit_price (métrica)
- line_total (métrica)
- discount_amount (métrica)

**Por que "order_items" e não "orders"?**
O "grain" (granularidade) deve ser o nível mais baixo de detalhe que você precisa.
- raw_orders tem info da ordem (cliente, data)
- raw_order_items tem o detalhe (quais produtos, quantidades, preços)
- Para analisar produtos, você precisa do nível de ITEM

**Dimensões (pontas da estrela)**:
- dim_customers: customer_key, customer_id, name, email, city, country
- dim_products: product_key, product_id, name, category, price
- dim_date: date_key, full_date, year, quarter, mês, dia, dia_da_semana, is_weekend` },
      tip: { es: 'Las métricas en la fact table deben ser NUMÉRICAS y ADITIVAS (se pueden sumar).', en: 'Metrics in fact table must be NUMERIC and ADDITIVE (can be summed).', pt: 'As métricas na fact table devem ser NUMÉRICAS e ADITIVAS (podem ser somadas).' },
      checkpoint: { es: '¿Tu diagrama tiene 1 fact table y 3 dimensiones?', en: 'Does your diagram have 1 fact table and 3 dimensions?', pt: 'Seu diagrama tem 1 fact table e 3 dimensões?' }
    },
    { 
      order: 5, 
      text: { es: '📅 Creá dim_date (la más importante)', en: '📅 Create dim_date (most important)', pt: '📅 Crie dim_date (a mais importante)' },
      code: `-- Crear dimensión de fecha
-- Una fila por cada fecha en el rango de datos

CREATE TABLE dim_date AS
WITH date_range AS (
    SELECT 
        CAST(MIN(order_date) AS DATE) as min_date,
        CAST(MAX(order_date) AS DATE) as max_date
    FROM raw_orders
),
dates AS (
    SELECT 
        CAST(generate_series AS DATE) as full_date
    FROM generate_series(
        (SELECT min_date FROM date_range),
        (SELECT max_date FROM date_range),
        INTERVAL '1 day'
    )
)
SELECT 
    ROW_NUMBER() OVER (ORDER BY full_date) as date_key,
    full_date,
    EXTRACT(YEAR FROM full_date) as year,
    EXTRACT(QUARTER FROM full_date) as quarter,
    EXTRACT(MONTH FROM full_date) as month,
    EXTRACT(DAY FROM full_date) as day,
    DAYNAME(full_date) as day_name,
    EXTRACT(DOW FROM full_date) as day_of_week,
    CASE WHEN EXTRACT(DOW FROM full_date) IN (0, 6) THEN TRUE ELSE FALSE END as is_weekend,
    MONTHNAME(full_date) as month_name
FROM dates;

SELECT * FROM dim_date LIMIT 5;`,
      explanation: { es: 'dim_date es especial: se genera, no se carga. Tiene atributos útiles como is_weekend que facilitan análisis.', en: 'dim_date is special: it is generated, not loaded. It has useful attributes like is_weekend that facilitate analysis.', pt: 'dim_date é especial: é gerada, não carregada. Tem atributos úteis como is_weekend que facilitam análises.' },
      tip: { es: 'Siempre incluí dim_date. El 90% de los análisis son por tiempo.', en: 'Always include dim_date. 90% of analyses are by time.', pt: 'Sempre inclua dim_date. 90% das análises são por tempo.' }
    },
    { 
      order: 6, 
      text: { es: '👥 Creá dim_customers', en: '👥 Create dim_customers', pt: '👥 Crie dim_customers' },
      code: `-- Crear dimensión de clientes
CREATE TABLE dim_customers AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY customer_id) as customer_key,  -- Surrogate key
    customer_id,  -- Business key (original)
    name,
    email,
    city,
    country,
    created_at
FROM raw_customers;

SELECT * FROM dim_customers LIMIT 5;`,
      explanation: { es: 'customer_key es la surrogate key (artificial), customer_id es la business key (original del sistema fuente).', en: 'customer_key is the surrogate key (artificial), customer_id is the business key (original from source system).', pt: 'customer_key é a surrogate key (artificial), customer_id é a business key (original do sistema fonte).' },
      tip: { es: 'Las surrogate keys son INT secuenciales. Son más eficientes para JOINs que strings o UUIDs.', en: 'Surrogate keys are sequential INTs. They are more efficient for JOINs than strings or UUIDs.', pt: 'As surrogate keys são INT sequenciais. São mais eficientes para JOINs que strings ou UUIDs.' }
    },
    { 
      order: 7, 
      text: { es: '📦 Creá dim_products', en: '📦 Create dim_products', pt: '📦 Crie dim_products' },
      code: `-- Crear dimensión de productos
CREATE TABLE dim_products AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY product_id) as product_key,
    product_id,
    name as product_name,
    category,
    price as list_price,
    created_at
FROM raw_products;

SELECT * FROM dim_products LIMIT 5;`,
      checkpoint: { es: '¿Cada dimensión tiene surrogate_key + business_key?', en: 'Does each dimension have surrogate_key + business_key?', pt: 'Cada dimensão tem surrogate_key + business_key?' }
    },
    { 
      order: 8, 
      text: { es: '📊 Creá fact_order_items (la fact table)', en: '📊 Create fact_order_items (the fact table)', pt: '📊 Crie fact_order_items (a fact table)' },
      code: `-- Crear fact table a nivel de ITEM (no de orden)
-- Importante: raw_orders NO tiene product_id ni quantity por producto
-- Esos datos están en raw_order_items (detalle de cada orden)

-- Primero exploremos la estructura:
SELECT 'raw_orders' as tabla, * FROM raw_orders LIMIT 2;
SELECT 'raw_order_items' as tabla, * FROM raw_order_items LIMIT 2;

-- La fact table debe estar al nivel de ITEM para tener el detalle
-- Esto es lo correcto en modelado dimensional (grain = order_item)

CREATE TABLE fact_order_items AS
SELECT 
    ROW_NUMBER() OVER (ORDER BY o.order_id, oi.product_id) as order_item_key,
    c.customer_key,
    p.product_key,
    d.date_key,
    o.order_id,  -- Degenerate dimension (ID de la orden original)
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price as line_total,
    COALESCE(oi.discount, 0) as discount_amount
FROM raw_orders o
INNER JOIN raw_order_items oi ON o.order_id = oi.order_id  -- JOIN con detalle!
INNER JOIN dim_customers c ON o.customer_id = c.customer_id
INNER JOIN dim_products p ON oi.product_id = p.product_id  -- product_id está en items!
INNER JOIN dim_date d ON CAST(o.order_date AS DATE) = d.full_date;

-- Verificar cantidad de filas (será más que raw_orders porque hay múltiples items por orden)
SELECT 
    (SELECT COUNT(*) FROM raw_orders) as ordenes_originales,
    (SELECT COUNT(*) FROM fact_order_items) as filas_fact_table;

SELECT * FROM fact_order_items LIMIT 5;`,
      explanation: { es: `**Importante sobre el "grain" (granularidad):**

La fact table está al nivel de **order_item** (cada línea de cada orden), NO al nivel de orden.

¿Por qué? Porque:
- raw_orders tiene info de la orden (cliente, fecha, total)
- raw_order_items tiene el detalle (qué productos, cantidades, precios)
- El product_id está en raw_order_items, NO en raw_orders

**Resultado:** Si tenés 10,000 órdenes con promedio de 1.5 items cada una, tendrás ~15,000 filas en la fact table.

Esto es **correcto** - el grain debe ser el nivel más bajo de detalle que necesitás analizar.`, en: `**Important on "grain" (granularity):**

The fact table is at **order_item** level (each line of each order), NOT at order level.

Why? Because:
- raw_orders has order info (customer, date, total)
- raw_order_items has detail (which products, quantities, prices)
- product_id is in raw_order_items, NOT in raw_orders

**Result:** If you have 10,000 orders with average of 1.5 items each, you will have ~15,000 rows in fact table.

This is **correct** - grain must be the lowest level of detail you need to analyze.`, pt: `**Importante sobre o "grain" (granularidade):**

A fact table está ao nível de **order_item** (cada linha de cada ordem), NÃO ao nível de ordem.

Por que? Porque:
- raw_orders tem info da ordem (cliente, data, total)
- raw_order_items tem o detalhe (quais produtos, quantidades, preços)
- O product_id está em raw_order_items, NÃO em raw_orders

**Resultado:** Se você tem 10.000 ordens com média de 1.5 itens cada uma, terá ~15.000 linhas na fact table.

Isso é **correto** - o grain deve ser o nível mais baixo de detalhe que você precisa analisar.` },
      warning: { es: 'El JOIN con raw_order_items es CLAVE. Sin él, no tenés acceso a product_id ni a las cantidades por producto.', en: 'JOIN with raw_order_items is KEY. Without it, you have no access to product_id or quantities per product.', pt: 'O JOIN com raw_order_items é CHAVE. Sem ele, não tem acesso a product_id nem às quantidades por produto.' },
      tip: { es: 'En la vida real, siempre verificá dónde están los datos que necesitás. El modelo OLTP puede tener la info distribuida en varias tablas.', en: 'In real life, always check where the data you need is. OLTP model can have info distributed in several tables.', pt: 'Na vida real, sempre verifique onde estão os dados que você precisa. O modelo OLTP pode ter a info distribuída em várias tabelas.' }
    },
    { 
      order: 9, 
      text: { es: '📊 Query analítica 1: Ventas por mes', en: '📊 Analytical Query 1: Sales by month', pt: '📊 Query analítica 1: Vendas por mês' },
      code: `-- Ventas totales por mes
SELECT 
    d.year,
    d.month_name,
    SUM(f.line_total) as total_ventas,
    COUNT(DISTINCT f.order_id) as cantidad_ordenes,  -- DISTINCT por múltiples items/orden
    COUNT(DISTINCT f.customer_key) as clientes_unicos,
    SUM(f.quantity) as unidades_vendidas
FROM fact_order_items f
JOIN dim_date d ON f.date_key = d.date_key
GROUP BY d.year, d.month, d.month_name
ORDER BY d.year, d.month;`,
      explanation: { es: `Notá cómo el JOIN con dim_date te da acceso a todos los atributos de fecha.

**Importante:** Usamos COUNT(DISTINCT order_id) para contar órdenes únicas, porque la fact table tiene múltiples filas por orden (una por cada item).`, en: `Note how JOIN with dim_date gives you access to all date attributes.

**Important:** We use COUNT(DISTINCT order_id) to count unique orders, because fact table has multiple rows per order (one per item).`, pt: `Note como o JOIN com dim_date te dá acesso a todos os atributos de data.

**Importante:** Usamos COUNT(DISTINCT order_id) para contar ordens únicas, porque a fact table tem múltiplas linhas por ordem (uma por cada item).` },
      tip: { es: 'Siempre agrupá por la key numérica (month) y mostrá el nombre (month_name).', en: 'Always group by numeric key (month) and show name (month_name).', pt: 'Sempre agrupe pela key numérica (mês) e mostre o nome (month_name).' }
    },
    { 
      order: 10, 
      text: { es: '📊 Query analítica 2: Top productos', en: '📊 Analytical Query 2: Top products', pt: '📊 Query analítica 2: Top produtos' },
      code: `-- Top 10 productos por revenue
SELECT 
    p.product_name,
    p.category,
    SUM(f.line_total) as revenue,
    SUM(f.quantity) as unidades_vendidas,
    COUNT(DISTINCT f.customer_key) as clientes,
    COUNT(DISTINCT f.order_id) as ordenes_con_producto
FROM fact_order_items f
JOIN dim_products p ON f.product_key = p.product_key
GROUP BY p.product_key, p.product_name, p.category
ORDER BY revenue DESC
LIMIT 10;`,
      checkpoint: { es: '¿Tus queries usan los JOINs correctos?', en: 'Do your queries use correct JOINs?', pt: 'Suas queries usam os JOINs corretos?' }
    },
    { 
      order: 11, 
      text: { es: '📊 Query analítica 3: Análisis de fin de semana', en: '📊 Analytical Query 3: Weekend Analysis', pt: '📊 Query analítica 3: Análise de fim de semana' },
      code: `-- Ventas en fin de semana vs días de semana
SELECT 
    CASE WHEN d.is_weekend THEN 'Fin de semana' ELSE 'Día de semana' END as tipo_dia,
    SUM(f.line_total) as total_ventas,
    AVG(f.line_total) as ticket_promedio_por_item,
    COUNT(DISTINCT f.order_id) as cantidad_ordenes,
    SUM(f.quantity) as items_vendidos
FROM fact_order_items f
JOIN dim_date d ON f.date_key = d.date_key
GROUP BY d.is_weekend;`,
      explanation: { es: 'El atributo is_weekend en dim_date hace este análisis trivial.', en: 'The is_weekend attribute in dim_date makes this analysis trivial.', pt: 'O atributo is_weekend em dim_date faz esta análise trivial.' }
    },
    { 
      order: 12, 
      text: { es: '📝 Documentá tu modelo', en: '📝 Document your model', pt: '📝 Documente seu modelo' },
      explanation: { es: 'Creá un README con: diagrama del modelo, explicación de cada tabla, queries de ejemplo.', en: 'Create a README with: model diagram, explanation of each table, example queries.', pt: 'Crie um README com: diagrama do modelo, explicação de cada tabela, queries de exemplo.' },
      checkpoint: { es: '¿Tu documentación explica por qué diseñaste así el modelo?', en: 'Does your documentation explain why you designed the model this way?', pt: 'Sua documentação explica por que projetou assim o modelo?' }
    },
  ],
  deliverable: { es: 'Diagrama del modelo + scripts SQL de creación + queries analíticas + README', en: 'Model diagram + creation SQL scripts + analytical queries + README', pt: 'Diagrama do modelo + scripts SQL de criação + queries analíticas + README' },
  evaluation: [
    { es: '¿La fact table está al nivel correcto (order_item, no order)?', en: 'Is the fact table at the correct level (order_item, not order)?', pt: 'A fact table está no nível correto (order_item, não order)?' },
    { es: '¿Hiciste JOIN entre raw_orders y raw_order_items?', en: 'Did you JOIN raw_orders and raw_order_items?', pt: 'Fez JOIN entre raw_orders e raw_order_items?' },
    { es: '¿La fact table tiene SOLO métricas numéricas y FKs?', en: 'Does the fact table have ONLY numeric metrics and FKs?', pt: 'A fact table tem APENAS métricas numéricas e FKs?' },
    { es: '¿Cada dimensión tiene surrogate key + business key?', en: 'Does each dimension have surrogate key + business key?', pt: 'Cada dimensão tem surrogate key + business key?' },
    { es: '¿Creaste dim_date con atributos útiles?', en: 'Did you create dim_date with useful attributes?', pt: 'Criou dim_date com atributos úteis?' },
    { es: '¿Las queries usan COUNT(DISTINCT order_id) para contar órdenes?', en: 'Do queries use COUNT(DISTINCT order_id) to count orders?', pt: 'As queries usam COUNT(DISTINCT order_id) para contar ordens?' },
  ],
  theory: { es: `## OLTP vs OLAP

| Característica | OLTP | OLAP |
|----------------|------|------|
| Propósito | Operaciones | Analytics |
| Queries | INSERT, UPDATE | SELECT, agregaciones |
| Usuarios | Aplicaciones | Analistas |
| Normalización | Alta (3NF) | Baja (Star Schema) |
| Ejemplo | Base de e-commerce | Data Warehouse |

## Star Schema

**Fact Table** (centro):
- Contiene MÉTRICAS (números que se agregan)
- Foreign Keys a dimensiones
- Muchas filas (millones/billones)

**Dimension Tables** (puntas):
- Contienen CONTEXTO (quién, qué, cuándo, dónde)
- Atributos descriptivos
- Pocas filas (miles)

## Surrogate Keys vs Natural/Business Keys

| Tipo | Ejemplo | Cuándo usar |
|------|---------|-------------|
| **Natural Key** | email, DNI | Cuando es inmutable y único |
| **Business Key** | order_id del sistema | Para tracking del origen |
| **Surrogate Key** | 1, 2, 3... (auto-increment) | SIEMPRE en Data Warehouse |

**¿Por qué Surrogate Keys en el DW?**
1. **Performance**: INT es más rápido que VARCHAR en JOINs
2. **Independencia**: El sistema fuente puede cambiar sus IDs
3. **Historial**: Permiten SCD Type 2 (versionar cambios)
4. **Consistencia**: Siempre mismo formato (INT)

\`\`\`sql
-- Ejemplo: mismo cliente, 2 versiones
customer_key | customer_id | nombre | email | valid_from | valid_to
1            | CUST-123    | Juan   | juan@v1.com | 2024-01-01 | 2024-06-01
2            | CUST-123    | Juan   | juan@v2.com | 2024-06-01 | 9999-12-31
\`\`\`

## Full Load vs Incremental Load

| Estrategia | Descripción | Cuándo usar |
|------------|-------------|-------------|
| **Full Load** | Borrar todo y recargar | Tablas pequeñas (<1M filas), dimensiones |
| **Incremental** | Solo agregar/actualizar nuevos | Tablas grandes, facts |
| **CDC (Change Data Capture)** | Capturar solo cambios | Real-time, alta frecuencia |

\`\`\`sql
-- Full Load (simple pero lento)
TRUNCATE TABLE dim_productos;
INSERT INTO dim_productos SELECT * FROM source;

-- Incremental (eficiente)
INSERT INTO fact_ventas
SELECT * FROM source_ventas
WHERE created_at > (SELECT MAX(created_at) FROM fact_ventas);

-- Upsert/Merge (actualizar o insertar)
MERGE INTO dim_clientes target
USING source_clientes source
ON target.business_key = source.id
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...;
\`\`\`

## Slowly Changing Dimensions (SCD)

| Tipo | Qué hace | Ejemplo |
|------|----------|---------|
| **SCD Type 0** | Nunca cambia | fecha_nacimiento |
| **SCD Type 1** | Sobrescribe | email (solo querés el actual) |
| **SCD Type 2** | Versiona con historial | dirección (querés ver cambios) |
| **SCD Type 3** | Guarda valor anterior | salario_actual, salario_anterior |

**SCD Type 2 es el más común en DW profesionales.**`, en: `## OLTP vs OLAP

| Feature | OLTP | OLAP |
|---------|------|------|
| Purpose | Operations | Analytics |
| Queries | INSERT, UPDATE | SELECT, aggregations |
| Users | Applications | Analysts |
| Normalization | High (3NF) | Low (Star Schema) |
| Example | E-commerce Database | Data Warehouse |

## Star Schema

**Fact Table** (center):
- Contains METRICS (numbers that are aggregated)
- Foreign Keys to dimensions
- Many rows (millions/billions)

**Dimension Tables** (points):
- Contain CONTEXT (who, what, when, where)
- Descriptive attributes
- Few rows (thousands)

## Surrogate Keys vs Natural/Business Keys

| Type | Example | When to use |
|------|---------|-------------|
| **Natural Key** | email, ID | When immutable and unique |
| **Business Key** | system order_id | For origin tracking |
| **Surrogate Key** | 1, 2, 3... (auto-increment) | ALWAYS in Data Warehouse |

**Why Surrogate Keys in DW?**
1. **Performance**: INT is faster than VARCHAR in JOINs
2. **Independence**: Source system can change its IDs
3. **History**: Enable SCD Type 2 (version changes)
4. **Consistency**: Always same format (INT)

\`\`\`sql
-- Example: same customer, 2 versions
customer_key | customer_id | name | email | valid_from | valid_to
1            | CUST-123    | Juan   | juan@v1.com | 2024-01-01 | 2024-06-01
2            | CUST-123    | Juan   | juan@v2.com | 2024-06-01 | 9999-12-31
\`\`\`

## Full Load vs Incremental Load

| Strategy | Description | When to use |
|----------|-------------|-------------|
| **Full Load** | Delete all and reload | Small tables (<1M rows), dimensions |
| **Incremental** | Only add/update new | Large tables, facts |
| **CDC (Change Data Capture)** | Capture only changes | Real-time, high frequency |

\`\`\`sql
-- Full Load (simple but slow)
TRUNCATE TABLE dim_products;
INSERT INTO dim_products SELECT * FROM source;

-- Incremental (efficient)
INSERT INTO fact_sales
SELECT * FROM source_sales
WHERE created_at > (SELECT MAX(created_at) FROM fact_sales);

-- Upsert/Merge (update or insert)
MERGE INTO dim_customers target
USING source_customers source
ON target.business_key = source.id
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...;
\`\`\`

## Slowly Changing Dimensions (SCD)

| Type | What it does | Example |
|------|--------------|---------|
| **SCD Type 0** | Never changes | birth_date |
| **SCD Type 1** | Overwrites | email (only want current) |
| **SCD Type 2** | Versions with history | address (want to see changes) |
| **SCD Type 3** | Saves previous value | current_salary, previous_salary |

**SCD Type 2 is most common in professional DW.**`, pt: `## OLTP vs OLAP

| Característica | OLTP | OLAP |
|----------------|------|------|
| Propósito | Operações | Analytics |
| Queries | INSERT, UPDATE | SELECT, agregações |
| Usuários | Aplicações | Analistas |
| Normalização | Alta (3NF) | Baixa (Star Schema) |
| Exemplo | Base de e-commerce | Data Warehouse |

## Star Schema

**Fact Table** (centro):
- Contém MÉTRICAS (números que se agregam)
- Foreign Keys a dimensões
- Muitas linhas (milhões/bilhões)

**Dimension Tables** (pontas):
- Contêm CONTEXTO (quem, o quê, quando, onde)
- Atributos descritivos
- Poucas linhas (milhares)

## Surrogate Keys vs Natural/Business Keys

| Tipo | Exemplo | Quando usar |
|------|---------|-------------|
| **Natural Key** | email, CPF | Quando é imutável e único |
| **Business Key** | order_id do sistema | Para tracking da origem |
| **Surrogate Key** | 1, 2, 3... (auto-increment) | SEMPRE em Data Warehouse |

**Por que Surrogate Keys no DW?**
1. **Performance**: INT é mais rápido que VARCHAR em JOINs
2. **Independência**: O sistema fonte pode mudar seus IDs
3. **Histórico**: Permitem SCD Type 2 (versionar mudanças)
4. **Consistência**: Sempre mesmo formato (INT)

\`\`\`sql
-- Exemplo: mesmo cliente, 2 versões
customer_key | customer_id | nome | email | valid_from | valid_to
1            | CUST-123    | Juan   | juan@v1.com | 2024-01-01 | 2024-06-01
2            | CUST-123    | Juan   | juan@v2.com | 2024-06-01 | 9999-12-31
\`\`\`

## Full Load vs Incremental Load

| Estratégia | Descrição | Quando usar |
|------------|-----------|-------------|
| **Full Load** | Apagar tudo e recarregar | Tabelas pequenas (<1M linhas), dimensões |
| **Incremental** | Apenas adicionar/atualizar novos | Tabelas grandes, facts |
| **CDC (Change Data Capture)** | Capturar apenas mudanças | Real-time, alta frequência |

\`\`\`sql
-- Full Load (simples mas lento)
TRUNCATE TABLE dim_produtos;
INSERT INTO dim_produtos SELECT * FROM source;

-- Incremental (eficiente)
INSERT INTO fact_vendas
SELECT * FROM source_vendas
WHERE created_at > (SELECT MAX(created_at) FROM fact_vendas);

-- Upsert/Merge (atualizar ou inserir)
MERGE INTO dim_clientes target
USING source_clientes source
ON target.business_key = source.id
WHEN MATCHED THEN UPDATE SET ...
WHEN NOT MATCHED THEN INSERT ...;
\`\`\`

## Slowly Changing Dimensions (SCD)

| Tipo | O que faz | Exemplo |
|------|-----------|---------|
| **SCD Type 0** | Nunca muda | data_nascimento |
| **SCD Type 1** | Sobrescreve | email (só quer o atual) |
| **SCD Type 2** | Versiona com histórico | endereço (quer ver mudanças) |
| **SCD Type 3** | Salva valor anterior | salario_atual, salario_anterior |

**SCD Type 2 é o mais comum em DW profissionais.**` },
  nextSteps: [
    { es: 'Implementá Slowly Changing Dimensions (SCD Type 2)', en: 'Implement Slowly Changing Dimensions (SCD Type 2)', pt: 'Implemente Slowly Changing Dimensions (SCD Type 2)' },
    { es: 'Agregá más dimensiones (dim_geography, dim_promotion)', en: 'Add more dimensions (dim_geography, dim_promotion)', pt: 'Adicione mais dimensões (dim_geography, dim_promotion)' },
    { es: 'Conectá con una herramienta de BI (Metabase, Superset)', en: 'Connect with a BI tool (Metabase, Superset)', pt: 'Conecte com uma ferramenta de BI (Metabase, Superset)' },
  ],
};


