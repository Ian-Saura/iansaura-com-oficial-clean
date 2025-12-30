import { Project } from '../../../types/members';

export const p3DataLakeDesign: Project = {
  id: 'p3-data-lake-design',
  level: 3,
  title: {
    es: 'Diseño de Data Lake con Medallion Architecture',
    pt: 'Design de Data Lake com Medallion Architecture'
  },
  description: {
    es: 'Diseñá un Data Lake con zonas Bronze/Silver/Gold. La arquitectura que usan Databricks, Netflix, y la mayoría de empresas modernas.',
    pt: 'Projete um Data Lake com zonas Bronze/Silver/Gold. A arquitetura usada por Databricks, Netflix e a maioria das empresas modernas.'
  },
  difficulty: 'Expert',
  duration: '5-6 horas',
  skills: [
    { es: 'Data Lake', pt: 'Data Lake' },
    { es: 'Medallion Architecture', pt: 'Medallion Architecture' },
    { es: 'Delta Lake', pt: 'Delta Lake' },
    { es: 'S3', pt: 'S3' },
    { es: 'Spark', pt: 'Spark' }
  ],
  icon: '🏅',
  color: 'blue',
  datasetId: 'ecommerce',
  prerequisites: ['p5-aws-pipeline', 'p2-spark-processing'],
  estimatedLines: 200,
  realWorldExample: {
    es: 'Así estructura Databricks su propio Data Lake interno',
    pt: 'Assim a Databricks estrutura seu próprio Data Lake interno'
  },
  usedBy: ['Databricks', 'Netflix', 'Comcast', 'Shell'],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Estructura de Data Lake', pt: 'Estrutura de Data Lake' },
      example: `s3://my-data-lake/
├── bronze/          (raw, append-only)
│   ├── orders/
│   │   └── _delta_log/
│   └── customers/
├── silver/          (cleaned, deduplicated)
│   ├── orders_clean/
│   └── customers_clean/
└── gold/            (business-ready)
    ├── daily_sales/
    └── customer_360/

Delta tables: 5
Total size: 2.3 GB
Time travel: 30 days`
    },
  ],
  learningObjectives: [
    { es: 'Diseñar estructura de Data Lake', pt: 'Projetar estrutura de Data Lake' },
    { es: 'Implementar Bronze/Silver/Gold', pt: 'Implementar Bronze/Silver/Gold' },
    { es: 'Usar Delta Lake para ACID', pt: 'Usar Delta Lake para ACID' },
    { es: 'Manejar schema evolution', pt: 'Gerenciar schema evolution' },
    { es: 'Implementar time travel', pt: 'Implementar time travel' },
  ],
  interviewStory: {
    hook: {
      es: "Diseñé un Data Lake con Medallion Architecture que procesa 1TB diario y permite queries sobre 3 años de historia en segundos.",
      pt: "Projetei um Data Lake com Medallion Architecture que processa 1TB diário e permite queries sobre 3 anos de história em segundos."
    },
    situation: {
      es: "Los datos estaban en silos: cada equipo tenía su copia, formatos diferentes, sin historial. Nadie confiaba en los números.",
      pt: "Os dados estavam em silos: cada equipe tinha sua cópia, formatos diferentes, sem histórico. Ninguém confiava nos números."
    },
    task: {
      es: "Diseñar un Data Lake centralizado con zonas claras, calidad garantizada, y capacidad de time travel.",
      pt: "Projetar um Data Lake centralizado com zonas claras, qualidade garantida e capacidade de time travel."
    },
    actions: [
      { es: "Diseñé Bronze/Silver/Gold con responsabilidades claras para cada zona", pt: "Projetei Bronze/Silver/Gold com responsabilidades claras para cada zona" },
      { es: "Implementé ingesta incremental a Bronze preservando datos originales", pt: "Implementei ingestão incremental para Bronze preservando dados originais" },
      { es: "Creé pipelines de limpieza Bronze→Silver con validaciones", pt: "Criei pipelines de limpeza Bronze→Silver com validações" },
      { es: "Construí modelos de negocio en Gold optimizados para queries", pt: "Construí modelos de negócio em Gold otimizados para queries" },
      { es: "Usé Delta Lake para ACID, time travel y schema evolution", pt: "Usei Delta Lake para ACID, time travel e schema evolution" }
    ],
    results: [
      { es: "Una sola fuente de verdad para toda la empresa", pt: "Uma única fonte de verdade para toda a empresa" },
      { es: "Queries sobre 3 años de historia en <10 segundos", pt: "Queries sobre 3 anos de história em <10 segundos" },
      { es: "Time travel: podemos ver cómo estaban los datos hace 30 días", pt: "Time travel: podemos ver como estavam os dados há 30 dias" },
      { es: "Schema evolution sin romper pipelines existentes", pt: "Schema evolution sem quebrar pipelines existentes" }
    ],
    learnings: [
      { es: "Bronze es sagrado - nunca modificar, solo append", pt: "Bronze é sagrado - nunca modificar, apenas append" },
      { es: "Delta Lake cambia el juego - ACID en un Data Lake era imposible antes", pt: "Delta Lake muda o jogo - ACID em um Data Lake era impossível antes" },
      { es: "La separación de zonas es organizacional, no solo técnica", pt: "A separação de zonas é organizacional, não apenas técnica" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Por qué 3 zonas y no 2?", pt: "Por que 3 zonas e não 2?" },
        answer: { es: "Bronze: datos crudos para auditoría. Silver: datos limpios reutilizables. Gold: modelos de negocio específicos. Cada zona tiene diferente audiencia y SLA.", pt: "Bronze: dados crus para auditoria. Silver: dados limpos reutilizáveis. Gold: modelos de negócio específicos. Cada zona tem diferente audiência e SLA." }
      },
      {
        question: { es: "¿Cómo manejás schema evolution?", pt: "Como você lida com schema evolution?" },
        answer: { es: "Delta Lake permite agregar columnas sin romper lectores. Para cambios breaking, versionamos el schema y migramos gradualmente. Nunca cambios in-place.", pt: "Delta Lake permite adicionar colunas sem quebrar leitores. Para mudanças breaking, versionamos o schema e migramos gradualmente. Nunca mudanças in-place." }
      },
      {
        question: { es: "¿Data Lake vs Data Warehouse?", pt: "Data Lake vs Data Warehouse?" },
        answer: { es: "Data Lake: storage barato, schemas flexibles, datos raw. Data Warehouse: queries rápidas, schemas fijos, datos modelados. Lakehouse combina ambos con Delta Lake.", pt: "Data Lake: armazenamento barato, schemas flexíveis, dados raw. Data Warehouse: queries rápidas, schemas fixos, dados modelados. Lakehouse combina ambos com Delta Lake." }
      }
    ],
    closingStatement: { es: "Medallion Architecture es el estándar de facto - si no lo conocés, estás atrasado.", pt: "Medallion Architecture é o padrão de fato - se você não conhece, está atrasado." }
  },
  steps: [
    {
      order: 1,
      text: { es: '🥉 Diseñá zona Bronze (Raw)', pt: '🥉 Projete a zona Bronze (Raw)' },
      explanation: {
        es: `**Bronze = Datos crudos, sin modificar**

Estructura:
\`\`\`
s3://data-lake/bronze/
├── ecommerce/
│   ├── orders/
│   │   └── ingestion_date=2024-01-15/
│   │       └── orders_20240115_143000.json
│   ├── customers/
│   └── products/
└── marketing/
    └── campaigns/
\`\`\`

Reglas:
- Nunca modificar datos en Bronze
- Mantener formato original (JSON, CSV)
- Particionar por fecha de ingesta
- Retención: indefinida (es tu backup)`,
        pt: `**Bronze = Dados crus, sem modificar**

Estrutura:
\`\`\`
s3://data-lake/bronze/
├── ecommerce/
│   ├── orders/
│   │   └── ingestion_date=2024-01-15/
│   │       └── orders_20240115_143000.json
│   ├── customers/
│   └── products/
└── marketing/
    └── campaigns/
\`\`\`

Regras:
- Nunca modificar dados em Bronze
- Manter formato original (JSON, CSV)
- Particionar por data de ingestão
- Retenção: indefinida (é seu backup)`
      },
      checkpoint: { es: '¿Tu estructura de Bronze está clara?', pt: 'Sua estrutura de Bronze está clara?' }
    },
    {
      order: 2,
      text: { es: '🥈 Diseñá zona Silver (Cleaned)', pt: '🥈 Projete a zona Silver (Cleaned)' },
      explanation: {
        es: `**Silver = Datos limpios, validados, deduplicados**

Estructura:
\`\`\`
s3://data-lake/silver/
├── ecommerce/
│   ├── orders/
│   │   └── year=2024/month=01/day=15/
│   │       └── part-00000.parquet
│   ├── customers/
│   └── products/
└── marketing/
    └── campaigns/
\`\`\`

Transformaciones:
- Convertir a Parquet (columnar, comprimido)
- Limpiar nulos y duplicados
- Validar tipos y rangos
- Particionar por fecha del evento (no ingesta)`,
        pt: `**Silver = Dados limpos, validados, deduplicados**

Estrutura:
\`\`\`
s3://data-lake/silver/
├── ecommerce/
│   ├── orders/
│   │   └── year=2024/month=01/day=15/
│   │       └── part-00000.parquet
│   ├── customers/
│   └── products/
└── marketing/
    └── campaigns/
\`\`\`

Transformações:
- Converter para Parquet (colunar, comprimido)
- Limpar nulos e duplicados
- Validar tipos e faixas
- Particionar por data do evento (não ingestão)`
      },
      checkpoint: { es: '¿Definiste qué transformaciones se hacen en Silver?', pt: 'Definiu que transformações são feitas em Silver?' }
    },
    {
      order: 3,
      text: { es: '🥇 Diseñá zona Gold (Curated)', pt: '🥇 Projete a zona Gold (Curated)' },
      explanation: {
        es: `**Gold = Datos agregados, listos para consumo**

Estructura:
\`\`\`
s3://data-lake/gold/
├── analytics/
│   ├── daily_sales/
│   ├── customer_360/
│   └── product_performance/
├── ml_features/
│   ├── user_features/
│   └── product_features/
└── reports/
    ├── executive_dashboard/
    └── marketing_roi/
\`\`\`

Características:
- Modelo dimensional (star schema)
- Pre-agregaciones para dashboards
- Features para ML
- Optimizado para queries específicas`,
        pt: `**Gold = Dados agregados, prontos para consumo**

Estrutura:
\`\`\`
s3://data-lake/gold/
├── analytics/
│   ├── daily_sales/
│   ├── customer_360/
│   └── product_performance/
├── ml_features/
│   ├── user_features/
│   └── product_features/
└── reports/
    ├── executive_dashboard/
    └── marketing_roi/
\`\`\`

Características:
- Modelo dimensional (star schema)
- Pré-agregações para dashboards
- Features para ML
- Otimizado para queries específicas`
      },
      checkpoint: { es: '¿Tu Gold tiene modelos útiles para el negocio?', pt: 'Seu Gold tem modelos úteis para o negócio?' }
    },
    {
      order: 4,
      text: { es: '📥 Implementá ingesta a Bronze', pt: '📥 Implemente ingestão para Bronze' },
      code: `# ingest_to_bronze.py
import boto3
from datetime import datetime
import json

def ingest_to_bronze(data: dict, source: str, table: str):
    """Ingesta datos crudos a Bronze."""
    s3 = boto3.client('s3')
    
    # Path con fecha de ingesta
    now = datetime.now()
    path = f"bronze/{source}/{table}/ingestion_date={now.strftime('%Y-%m-%d')}/{table}_{now.strftime('%Y%m%d_%H%M%S')}.json"
    
    # Subir sin modificar
    s3.put_object(
        Bucket='data-lake',
        Key=path,
        Body=json.dumps(data),
        ContentType='application/json'
    )
    
    print(f"Ingested to {path}")
    return path`,
      explanation: { es: 'Bronze recibe datos crudos sin transformación. La fecha de ingesta es metadata.', pt: 'Bronze recebe dados crus sem transformação. A data de ingestão é metadado.' }
    },
    {
      order: 5,
      text: { es: '🔄 Implementá Bronze → Silver', pt: '🔄 Implemente Bronze → Silver' },
      code: `# bronze_to_silver.py
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_date, when

spark = SparkSession.builder.appName("BronzeToSilver").getOrCreate()

def bronze_to_silver(source: str, table: str, date: str):
    """Transforma datos de Bronze a Silver."""
    
    # Leer de Bronze
    bronze_path = f"s3://data-lake/bronze/{source}/{table}/ingestion_date={date}/"
    df = spark.read.json(bronze_path)
    
    # Limpiar
    df_clean = df \\
        .dropDuplicates(['order_id']) \\
        .filter(col('total').isNotNull()) \\
        .withColumn('order_date', to_date(col('order_date'))) \\
        .withColumn('total', col('total').cast('decimal(10,2)'))
    
    # Validar
    invalid_count = df_clean.filter(col('total') < 0).count()
    if invalid_count > 0:
        print(f"Warning: {invalid_count} invalid records")
    
    # Guardar en Silver (particionado por fecha del evento)
    silver_path = f"s3://data-lake/silver/{source}/{table}/"
    df_clean.write \\
        .partitionBy('year', 'month', 'day') \\
        .mode('append') \\
        .parquet(silver_path)
    
    print(f"Wrote {df_clean.count()} records to Silver")`,
      explanation: { es: 'Silver limpia, valida, y cambia el particionamiento a fecha del evento.', pt: 'Silver limpa, valida e muda o particionamento para a data do evento.' }
    },
    {
      order: 6,
      text: { es: '📊 Implementá Silver → Gold', pt: '📊 Implemente Silver → Gold' },
      code: `# silver_to_gold.py
def silver_to_gold_daily_sales():
    """Genera métricas diarias de ventas."""
    
    # Leer de Silver
    orders = spark.read.parquet("s3://data-lake/silver/ecommerce/orders/")
    products = spark.read.parquet("s3://data-lake/silver/ecommerce/products/")
    
    # Agregar
    daily_sales = orders \\
        .join(products, 'product_id') \\
        .groupBy('order_date', 'category') \\
        .agg(
            F.sum('total').alias('revenue'),
            F.count('order_id').alias('order_count'),
            F.countDistinct('customer_id').alias('unique_customers')
        )
    
    # Guardar en Gold
    daily_sales.write \\
        .mode('overwrite') \\
        .partitionBy('order_date') \\
        .parquet("s3://data-lake/gold/analytics/daily_sales/")`,
      explanation: { es: 'Gold contiene modelos optimizados para casos de uso específicos.', pt: 'Gold contém modelos otimizados para casos de uso específicos.' }
    },
    {
      order: 7,
      text: { es: '🔄 Usá Delta Lake para ACID', pt: '🔄 Use Delta Lake para ACID' },
      code: `# Con Delta Lake
from delta import DeltaTable

# Escribir como Delta
df_clean.write \\
    .format('delta') \\
    .mode('append') \\
    .save("s3://data-lake/silver/ecommerce/orders/")

# Time travel (leer versión anterior)
df_yesterday = spark.read \\
    .format('delta') \\
    .option('versionAsOf', 5) \\
    .load("s3://data-lake/silver/ecommerce/orders/")

# Schema evolution
spark.conf.set("spark.databricks.delta.schema.autoMerge.enabled", "true")`,
      explanation: { es: 'Delta Lake agrega ACID, time travel, y schema evolution sobre Parquet.', pt: 'Delta Lake adiciona ACID, time travel e schema evolution sobre Parquet.' },
      tip: { es: 'Delta Lake es el estándar para Data Lakes modernos.', pt: 'Delta Lake é o padrão para Data Lakes modernos.' }
    },
    {
      order: 8,
      text: { es: '📝 Documentá la arquitectura', pt: '📝 Documente a arquitetura' },
      explanation: {
        es: `Creá documentación con:
1. Diagrama de zonas (Bronze → Silver → Gold)
2. Descripción de cada zona
3. Jobs que mueven datos entre zonas
4. Políticas de retención
5. Cómo hacer backfill`,
        pt: `Crie documentação com:
1. Diagrama de zonas (Bronze → Silver → Gold)
2. Descrição de cada zona
3. Jobs que movem dados entre zonas
4. Políticas de retenção
5. Como fazer backfill`
      },
      checkpoint: { es: '¿Tu documentación explica cómo opera el Data Lake?', pt: 'Sua documentação explica como opera o Data Lake?' }
    },
  ],
  deliverable: { es: 'Código de ingesta + transformación + documentación de arquitectura', pt: 'Código de ingestão + transformação + documentação de arquitetura' },
  evaluation: [
    { es: '¿Las zonas están bien definidas?', pt: 'As zonas estão bem definidas?' },
    { es: '¿Bronze mantiene datos crudos sin modificar?', pt: 'Bronze mantém dados crus sem modificar?' },
    { es: '¿Silver tiene datos limpios y validados?', pt: 'Silver tem dados limpos e validados?' },
    { es: '¿Gold tiene modelos útiles para el negocio?', pt: 'Gold tem modelos úteis para o negócio?' },
    { es: '¿Consideraste Delta Lake para ACID?', pt: 'Considerou Delta Lake para ACID?' },
  ],
  theory: {
    es: `## Data Lake vs Data Warehouse vs Data Lakehouse

| Aspecto | Data Lake | Data Warehouse | Data Lakehouse |
|---------|-----------|----------------|----------------|
| **Storage** | Barato (S3) | Caro (DW) | Barato (S3) |
| **Schema** | Schema-on-read | Schema-on-write | Ambos |
| **ACID** | ❌ | ✅ | ✅ (Delta/Iceberg) |
| **Queries** | Lentas | Rápidas | Rápidas |
| **ML/Raw Data** | ✅ | ❌ | ✅ |
| **BI/SQL** | ❌ | ✅ | ✅ |

**Data Lakehouse = Data Lake + ACID + Performance**

## Medallion Architecture (Bronze → Silver → Gold)

### Bronze (Raw Zone)
- **Qué**: Datos crudos, exactamente como llegaron
- **Formato**: JSON, CSV, Avro (formato original)
- **Particionado**: Por fecha de ingesta (ingestion_date)
- **Retención**: Indefinida (es tu "backup")
- **Regla**: NUNCA modificar datos en Bronze

\`\`\`
s3://data-lake/bronze/
├── orders/
│   └── ingestion_date=2024-01-15/
│       ├── orders_batch_001.json
│       └── orders_batch_002.json
\`\`\`

### Silver (Cleaned Zone)
- **Qué**: Datos limpios, validados, deduplicados
- **Formato**: Parquet o Delta Lake
- **Particionado**: Por fecha del evento (event_date)
- **Transformaciones**: Limpieza, tipos correctos, validaciones
- **Retención**: Según compliance (GDPR: 3 años típico)

\`\`\`python
# Bronze → Silver
df_silver = (
    df_bronze
    .dropDuplicates(['order_id'])
    .filter(col('amount') > 0)
    .withColumn('event_date', to_date('created_at'))
)
\`\`\`

### Gold (Curated Zone)
- **Qué**: Datos listos para consumo, modelados
- **Formato**: Delta Lake (para queries rápidas)
- **Modelos**: Star schema, métricas agregadas, features ML
- **Usuarios**: Analistas, BI tools, modelos ML

\`\`\`python
# Silver → Gold (agregación)
df_gold = (
    df_silver
    .groupBy('product_category', 'event_date')
    .agg(
        sum('amount').alias('total_sales'),
        count('order_id').alias('order_count')
    )
)
\`\`\`

## Delta Lake / Apache Iceberg / Apache Hudi

Son "table formats" que agregan ACID a Data Lakes:

| Feature | Parquet | Delta Lake | Iceberg | Hudi |
|---------|---------|------------|---------|------|
| ACID | ❌ | ✅ | ✅ | ✅ |
| Time Travel | ❌ | ✅ | ✅ | ✅ |
| Schema Evolution | ❌ | ✅ | ✅ | ✅ |
| Upserts (MERGE) | ❌ | ✅ | ✅ | ✅ |
| Compaction | Manual | Auto | Auto | Auto |
| Vendor | - | Databricks | Netflix | Uber |

**Recomendación**: Delta Lake si usás Databricks, Iceberg si no.

## Patrones de Ingesta

| Patrón | Descripción | Cuándo usar |
|--------|-------------|-------------|
| **Full Load** | Cargar todo cada vez | Tablas pequeñas |
| **Incremental** | Solo datos nuevos | Tablas grandes |
| **CDC** | Capturar cambios | Real-time, DW sync |
| **Streaming** | Evento por evento | Latencia crítica |`,
    pt: `## Data Lake vs Data Warehouse vs Data Lakehouse

| Aspecto | Data Lake | Data Warehouse | Data Lakehouse |
|---------|-----------|----------------|----------------|
| **Storage** | Barato (S3) | Caro (DW) | Barato (S3) |
| **Schema** | Schema-on-read | Schema-on-write | Ambos |
| **ACID** | ❌ | ✅ | ✅ (Delta/Iceberg) |
| **Queries** | Lentas | Rápidas | Rápidas |
| **ML/Raw Data** | ✅ | ❌ | ✅ |
| **BI/SQL** | ❌ | ✅ | ✅ |

**Data Lakehouse = Data Lake + ACID + Performance**

## Medallion Architecture (Bronze → Silver → Gold)

### Bronze (Raw Zone)
- **O que**: Dados crus, exatamente como chegaram
- **Formato**: JSON, CSV, Avro (formato original)
- **Particionado**: Por data de ingestão (ingestion_date)
- **Retenção**: Indefinida (é seu "backup")
- **Regra**: NUNCA modificar dados em Bronze

\`\`\`
s3://data-lake/bronze/
├── orders/
│   └── ingestion_date=2024-01-15/
│       ├── orders_batch_001.json
│       └── orders_batch_002.json
\`\`\`

### Silver (Cleaned Zone)
- **O que**: Dados limpos, validados, deduplicados
- **Formato**: Parquet ou Delta Lake
- **Particionado**: Por data do evento (event_date)
- **Transformações**: Limpeza, tipos corretos, validações
- **Retenção**: Segundo compliance (GDPR: 3 anos típico)

\`\`\`python
# Bronze → Silver
df_silver = (
    df_bronze
    .dropDuplicates(['order_id'])
    .filter(col('amount') > 0)
    .withColumn('event_date', to_date('created_at'))
)
\`\`\`

### Gold (Curated Zone)
- **O que**: Dados prontos para consumo, modelados
- **Formato**: Delta Lake (para queries rápidas)
- **Modelos**: Star schema, métricas agregadas, features ML
- **Usuários**: Analistas, ferramentas de BI, modelos ML

\`\`\`python
# Silver → Gold (agregação)
df_gold = (
    df_silver
    .groupBy('product_category', 'event_date')
    .agg(
        sum('amount').alias('total_sales'),
        count('order_id').alias('order_count')
    )
)
\`\`\`

## Delta Lake / Apache Iceberg / Apache Hudi

São "table formats" que adicionam ACID a Data Lakes:

| Feature | Parquet | Delta Lake | Iceberg | Hudi |
|---------|---------|------------|---------|------|
| ACID | ❌ | ✅ | ✅ | ✅ |
| Time Travel | ❌ | ✅ | ✅ | ✅ |
| Schema Evolution | ❌ | ✅ | ✅ | ✅ |
| Upserts (MERGE) | ❌ | ✅ | ✅ | ✅ |
| Compaction | Manual | Auto | Auto | Auto |
| Vendor | - | Databricks | Netflix | Uber |

**Recomendação**: Delta Lake se usar Databricks, Iceberg se não.

## Padrões de Ingestão

| Padrão | Descrição | Quando usar |
|--------|-------------|-------------|
| **Full Load** | Carregar tudo cada vez | Tabelas pequenas |
| **Incremental** | Apenas dados novos | Tabelas grandes |
| **CDC** | Capturar mudanças | Real-time, DW sync |
| **Streaming** | Evento por evento | Latência crítica |`
  },
};


