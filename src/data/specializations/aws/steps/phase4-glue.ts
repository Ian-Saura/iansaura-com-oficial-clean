/**
 * FASE 4: AWS GLUE - ETL SERVERLESS
 * 10 pasos para dominar Glue
 */

import { AWSStep } from '../types';

export const phase4Steps: AWSStep[] = [
  {
    id: 'aws-4-1', stepNumber: 28,
    title: { es: 'Introducción a AWS Glue', en: 'Introduction to AWS Glue', pt: 'Introdução ao AWS Glue' },
    description: { es: 'Entender qué es Glue, sus componentes y cuándo usarlo.', en: 'Understand what Glue is, its components and when to use it.', pt: 'Entender o que é Glue, seus componentes e quando usá-lo.' },
    theory: {
      es: `## AWS Glue - ETL Serverless

### Componentes de Glue
1. **Data Catalog**: Metastore central (bases de datos, tablas, schemas)
2. **Crawlers**: Descubren schema automáticamente
3. **ETL Jobs**: Transformaciones con PySpark/Python
4. **Workflows**: Orquestación de jobs
5. **Studio**: IDE visual para ETL

### ¿Por qué Glue?
- **Serverless**: Sin servidores que gestionar
- **PySpark**: Lenguaje estándar de la industria
- **Integrado**: S3, Athena, Redshift lo usan nativamente
- **Escalable**: De MBs a PBs

### Pricing
- **Crawler**: $0.44/DPU-hora
- **ETL Job**: $0.44/DPU-hora
- **Data Catalog**: 1M objetos gratis, luego $1/100K objetos
- **Studio**: Basado en sesiones

### DPU (Data Processing Unit)
1 DPU = 4 vCPU + 16GB RAM
Jobs usan mínimo 2 DPUs (Spark) o 0.0625 DPU (Python Shell)`,
      en: `## AWS Glue - Serverless ETL

### Glue Components
1. **Data Catalog**: Central metastore (databases, tables, schemas)
2. **Crawlers**: Discover schema automatically
3. **ETL Jobs**: Transformations with PySpark/Python
4. **Workflows**: Job orchestration
5. **Studio**: Visual IDE for ETL

### Why Glue?
- **Serverless**: No servers to manage
- **PySpark**: Industry standard language
- **Integrated**: S3, Athena, Redshift use it natively
- **Scalable**: From MBs to PBs

### Pricing
- **Crawler**: $0.44/DPU-hour
- **ETL Job**: $0.44/DPU-hour
- **Data Catalog**: 1M objects free, then $1/100K objects
- **Studio**: Session-based

### DPU (Data Processing Unit)
1 DPU = 4 vCPU + 16GB RAM
Jobs use minimum 2 DPUs (Spark) or 0.0625 DPU (Python Shell)`,
      pt: `## AWS Glue - ETL Serverless

### Componentes do Glue
1. **Data Catalog**: Metastore central (bases de dados, tabelas, schemas)
2. **Crawlers**: Descobrem schema automaticamente
3. **ETL Jobs**: Transformações com PySpark/Python
4. **Workflows**: Orquestração de jobs
5. **Studio**: IDE visual para ETL

### Por que Glue?
- **Serverless**: Sem servidores para gerenciar
- **PySpark**: Linguagem padrão da indústria
- **Integrado**: S3, Athena, Redshift usam nativamente
- **Escalável**: De MBs a PBs

### Pricing
- **Crawler**: $0.44/DPU-hora
- **ETL Job**: $0.44/DPU-hora
- **Data Catalog**: 1M objetos grátis, depois $1/100K objetos
- **Studio**: Baseado em sessões

### DPU (Data Processing Unit)
1 DPU = 4 vCPU + 16GB RAM
Jobs usam mínimo 2 DPUs (Spark) ou 0.0625 DPU (Python Shell)`
    },
    practicalTips: [
      { es: '💡 Glue aparece en 80%+ de arquitecturas AWS de datos - es esencial dominarlo', en: '💡 Glue appears in 80%+ of AWS data architectures - mastering it is essential', pt: '💡 Glue aparece em 80%+ das arquiteturas AWS de dados - é essencial dominá-lo' }
    ],
    externalLinks: [
      { title: 'AWS Glue Developer Guide', url: 'https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Puedes explicar los 5 componentes principales de Glue?', en: '✅ Can you explain the 5 main components of Glue?', pt: '✅ Você consegue explicar os 5 componentes principais do Glue?' },
    xpReward: 50, estimatedMinutes: 30, services: ['Glue']
  },

  {
    id: 'aws-4-2', stepNumber: 29,
    title: { es: 'Glue Data Catalog', en: 'Glue Data Catalog', pt: 'Glue Data Catalog' },
    description: { es: 'Usar el Data Catalog como metastore central para tu Data Lake.', en: 'Use Data Catalog as central metastore for your Data Lake.', pt: 'Usar o Data Catalog como metastore central para seu Data Lake.' },
    theory: {
      es: `## Glue Data Catalog - Tu Metastore Central

### Jerarquía
\`\`\`
Account
└── Databases
    └── Tables
        ├── Columns
        ├── Partitions
        └── Properties
\`\`\`

### ¿Qué almacena?
- **Schema**: Nombres y tipos de columnas
- **Location**: Path S3 de los datos
- **Partitions**: Keys de particionamiento
- **Table properties**: SerDe, formato, compresión
- **Statistics**: Para optimización de queries

### Integración nativa con
- **Athena**: Usa Catalog como metastore
- **Redshift Spectrum**: Query externas
- **EMR**: Hive metastore compatible
- **Lake Formation**: Permisos granulares

### Crear tabla manualmente
\`\`\`sql
CREATE EXTERNAL TABLE events (
  event_id STRING,
  user_id STRING,
  event_type STRING,
  timestamp TIMESTAMP
)
PARTITIONED BY (year STRING, month STRING, day STRING)
STORED AS PARQUET
LOCATION 's3://bucket/processed/events/';
\`\`\``,
      en: `## Glue Data Catalog - Your Central Metastore

### Hierarchy
\`\`\`
Account
└── Databases
    └── Tables
        ├── Columns
        ├── Partitions
        └── Properties
\`\`\`

### What does it store?
- **Schema**: Column names and types
- **Location**: S3 path of data
- **Partitions**: Partition keys
- **Table properties**: SerDe, format, compression
- **Statistics**: For query optimization

### Native integration with
- **Athena**: Uses Catalog as metastore
- **Redshift Spectrum**: External queries
- **EMR**: Hive metastore compatible
- **Lake Formation**: Granular permissions

### Create table manually
\`\`\`sql
CREATE EXTERNAL TABLE events (
  event_id STRING,
  user_id STRING,
  event_type STRING,
  timestamp TIMESTAMP
)
PARTITIONED BY (year STRING, month STRING, day STRING)
STORED AS PARQUET
LOCATION 's3://bucket/processed/events/';
\`\`\``,
      pt: `## Glue Data Catalog - Seu Metastore Central

### Hierarquia
\`\`\`
Account
└── Databases
    └── Tables
        ├── Columns
        ├── Partitions
        └── Properties
\`\`\`

### O que armazena?
- **Schema**: Nomes e tipos de colunas
- **Location**: Path S3 dos dados
- **Partitions**: Keys de particionamento
- **Table properties**: SerDe, formato, compressão
- **Statistics**: Para otimização de queries

### Integração nativa com
- **Athena**: Usa Catalog como metastore
- **Redshift Spectrum**: Queries externas
- **EMR**: Compatível com Hive metastore
- **Lake Formation**: Permissões granulares

### Criar tabela manualmente
\`\`\`sql
CREATE EXTERNAL TABLE events (
  event_id STRING,
  user_id STRING,
  event_type STRING,
  timestamp TIMESTAMP
)
PARTITIONED BY (year STRING, month STRING, day STRING)
STORED AS PARQUET
LOCATION 's3://bucket/processed/events/';
\`\`\``
    },
    practicalTips: [
      { es: '📚 El Data Catalog es el "diccionario" de tu Data Lake - mantenlo organizado', en: '📚 Data Catalog is the "dictionary" of your Data Lake - keep it organized', pt: '📚 O Data Catalog é o "dicionário" do seu Data Lake - mantenha-o organizado' }
    ],
    externalLinks: [
      { title: 'Glue Data Catalog', url: 'https://docs.aws.amazon.com/glue/latest/dg/catalog-and-crawler.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste una database y tabla en el Data Catalog?', en: '✅ Did you create a database and table in Data Catalog?', pt: '✅ Você criou uma database e tabela no Data Catalog?' },
    xpReward: 55, estimatedMinutes: 30, services: ['Glue Data Catalog']
  },

  {
    id: 'aws-4-3', stepNumber: 30,
    title: { es: 'Glue Crawlers', en: 'Glue Crawlers', pt: 'Glue Crawlers' },
    description: { es: 'Crear crawlers para descubrir y catalogar datos automáticamente.', en: 'Create crawlers to automatically discover and catalog data.', pt: 'Criar crawlers para descobrir e catalogar dados automaticamente.' },
    theory: {
      es: `## Glue Crawlers - Descubrimiento Automático

### ¿Qué hace un Crawler?
1. Escanea path S3 (u otra fuente)
2. Infiere el schema de los datos
3. Detecta particiones
4. Crea/actualiza tablas en Data Catalog

### Configuración de Crawler
\`\`\`yaml
Crawler: raw-events-crawler
  Data sources: s3://bucket/raw/events/
  IAM role: GlueCrawlerRole
  Database: raw_db
  Table prefix: raw_
  Schedule: Run on demand / Every hour
  Schema change policy: Update in place
  Partition behavior: Add new partitions only
\`\`\`

### Classifiers
Glue usa classifiers para detectar formatos:
- **Built-in**: JSON, CSV, Parquet, ORC, Avro, XML
- **Custom**: Grok patterns, JSON paths, XML tags

### ⚠️ Consideraciones
- Crawlers pueden ser lentos para millones de archivos
- Cuidado con detección de tipos incorrecta
- Usa exclusions para ignorar archivos no deseados
- Considera crear tablas manualmente para mayor control`,
      en: `## Glue Crawlers - Automatic Discovery

### What does a Crawler do?
1. Scans S3 path (or other source)
2. Infers data schema
3. Detects partitions
4. Creates/updates tables in Data Catalog

### Crawler Configuration
\`\`\`yaml
Crawler: raw-events-crawler
  Data sources: s3://bucket/raw/events/
  IAM role: GlueCrawlerRole
  Database: raw_db
  Table prefix: raw_
  Schedule: Run on demand / Every hour
  Schema change policy: Update in place
  Partition behavior: Add new partitions only
\`\`\`

### Classifiers
Glue uses classifiers to detect formats:
- **Built-in**: JSON, CSV, Parquet, ORC, Avro, XML
- **Custom**: Grok patterns, JSON paths, XML tags

### ⚠️ Considerations
- Crawlers can be slow for millions of files
- Watch out for incorrect type detection
- Use exclusions to ignore unwanted files
- Consider creating tables manually for more control`,
      pt: `## Glue Crawlers - Descobrimento Automático

### O que faz um Crawler?
1. Escaneia path S3 (ou outra fonte)
2. Infere o schema dos dados
3. Detecta partições
4. Cria/atualiza tabelas no Data Catalog

### Configuração de Crawler
\`\`\`yaml
Crawler: raw-events-crawler
  Data sources: s3://bucket/raw/events/
  IAM role: GlueCrawlerRole
  Database: raw_db
  Table prefix: raw_
  Schedule: Run on demand / Every hour
  Schema change policy: Update in place
  Partition behavior: Add new partitions only
\`\`\`

### Classifiers
Glue usa classifiers para detectar formatos:
- **Built-in**: JSON, CSV, Parquet, ORC, Avro, XML
- **Custom**: Grok patterns, JSON paths, XML tags

### ⚠️ Considerações
- Crawlers podem ser lentos para milhões de arquivos
- Cuidado com detecção de tipos incorreta
- Use exclusions para ignorar arquivos não desejados
- Considere criar tabelas manualmente para maior controle`
    },
    practicalTips: [
      { es: '🔄 Usa MSCK REPAIR TABLE en Athena como alternativa más rápida para añadir particiones', en: '🔄 Use MSCK REPAIR TABLE in Athena as a faster alternative to add partitions', pt: '🔄 Use MSCK REPAIR TABLE no Athena como alternativa mais rápida para adicionar partições' }
    ],
    externalLinks: [
      { title: 'Glue Crawlers', url: 'https://docs.aws.amazon.com/glue/latest/dg/add-crawler.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un crawler que catalogó datos de S3?', en: '✅ Did you create a crawler that cataloged S3 data?', pt: '✅ Você criou um crawler que catalogou dados do S3?' },
    xpReward: 60, estimatedMinutes: 35, services: ['Glue Crawlers']
  },

  {
    id: 'aws-4-4', stepNumber: 31,
    title: { es: 'Tu primer Glue ETL Job', en: 'Your first Glue ETL Job', pt: 'Seu primeiro Glue ETL Job' },
    description: { es: 'Crear un job básico que lee, transforma y escribe datos.', en: 'Create a basic job that reads, transforms and writes data.', pt: 'Criar um job básico que lê, transforma e escreve dados.' },
    theory: {
      es: `## Tu Primer Glue Job

### Tipos de Jobs
- **Spark**: Para transformaciones complejas (PySpark)
- **Python Shell**: Para scripts simples (Pandas, boto3)
- **Streaming**: Para datos en tiempo real

### Estructura básica de un Glue Job
\`\`\`python
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

# Inicialización
args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Leer datos
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="raw_db",
    table_name="events"
)

# Transformar
transformed = datasource.toDF()
transformed = transformed.filter(transformed['value'] > 0)

# Escribir
glueContext.write_dynamic_frame.from_options(
    frame=DynamicFrame.fromDF(transformed, glueContext, "transformed"),
    connection_type="s3",
    connection_options={"path": "s3://bucket/processed/events/"},
    format="parquet"
)

job.commit()
\`\`\``,
      en: `## Your First Glue Job

### Job Types
- **Spark**: For complex transformations (PySpark)
- **Python Shell**: For simple scripts (Pandas, boto3)
- **Streaming**: For real-time data

### Basic Glue Job structure
\`\`\`python
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

# Initialization
args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Read data
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="raw_db",
    table_name="events"
)

# Transform
transformed = datasource.toDF()
transformed = transformed.filter(transformed['value'] > 0)

# Write
glueContext.write_dynamic_frame.from_options(
    frame=DynamicFrame.fromDF(transformed, glueContext, "transformed"),
    connection_type="s3",
    connection_options={"path": "s3://bucket/processed/events/"},
    format="parquet"
)

job.commit()
\`\`\``,
      pt: `## Seu Primeiro Glue Job

### Tipos de Jobs
- **Spark**: Para transformações complexas (PySpark)
- **Python Shell**: Para scripts simples (Pandas, boto3)
- **Streaming**: Para dados em tempo real

### Estrutura básica de um Glue Job
\`\`\`python
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

# Inicialização
args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Ler dados
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="raw_db",
    table_name="events"
)

# Transformar
transformed = datasource.toDF()
transformed = transformed.filter(transformed['value'] > 0)

# Escrever
glueContext.write_dynamic_frame.from_options(
    frame=DynamicFrame.fromDF(transformed, glueContext, "transformed"),
    connection_type="s3",
    connection_options={"path": "s3://bucket/processed/events/"},
    format="parquet"
)

job.commit()
\`\`\``
    },
    practicalTips: [
      { es: '⚡ Empieza con 2 DPUs para desarrollo, escala a más solo cuando sea necesario', en: '⚡ Start with 2 DPUs for development, scale to more only when needed', pt: '⚡ Comece com 2 DPUs para desenvolvimento, escale para mais só quando necessário' }
    ],
    externalLinks: [
      { title: 'Authoring Glue Jobs', url: 'https://docs.aws.amazon.com/glue/latest/dg/author-job.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Ejecutaste un job que leyó de Data Catalog y escribió a S3?', en: '✅ Did you run a job that read from Data Catalog and wrote to S3?', pt: '✅ Você executou um job que leu do Data Catalog e escreveu no S3?' },
    xpReward: 75, estimatedMinutes: 50, services: ['Glue ETL']
  },

  {
    id: 'aws-4-5', stepNumber: 32,
    title: { es: 'DynamicFrames vs DataFrames', en: 'DynamicFrames vs DataFrames', pt: 'DynamicFrames vs DataFrames' },
    description: { es: 'Entender cuándo usar DynamicFrames de Glue vs DataFrames de Spark.', en: 'Understand when to use Glue DynamicFrames vs Spark DataFrames.', pt: 'Entender quando usar DynamicFrames do Glue vs DataFrames do Spark.' },
    theory: {
      es: `## DynamicFrames vs DataFrames

### DynamicFrame (Glue)
- Schema flexible (cada record puede tener schema diferente)
- Mejor para datos semi-estructurados
- Transformaciones built-in de Glue
- Lazy evaluation

### DataFrame (Spark)
- Schema estricto y uniforme
- Mejor performance para datos estructurados
- Acceso a toda la API de Spark
- Más flexible para transformaciones complejas

### Conversión
\`\`\`python
# DynamicFrame → DataFrame
df = dynamic_frame.toDF()

# DataFrame → DynamicFrame
from awsglue.dynamicframe import DynamicFrame
dyf = DynamicFrame.fromDF(df, glueContext, "name")
\`\`\`

### Cuándo usar cuál
| Caso | Usar |
|------|------|
| Datos JSON anidados | DynamicFrame |
| Datos Parquet limpios | DataFrame |
| Transformaciones complejas | DataFrame |
| Flatten/Relationalize | DynamicFrame |
| Machine Learning | DataFrame |`,
      en: `## DynamicFrames vs DataFrames

### DynamicFrame (Glue)
- Flexible schema (each record can have different schema)
- Better for semi-structured data
- Glue built-in transformations
- Lazy evaluation

### DataFrame (Spark)
- Strict and uniform schema
- Better performance for structured data
- Access to full Spark API
- More flexible for complex transformations

### Conversion
\`\`\`python
# DynamicFrame → DataFrame
df = dynamic_frame.toDF()

# DataFrame → DynamicFrame
from awsglue.dynamicframe import DynamicFrame
dyf = DynamicFrame.fromDF(df, glueContext, "name")
\`\`\`

### When to use which
| Case | Use |
|------|------|
| Nested JSON data | DynamicFrame |
| Clean Parquet data | DataFrame |
| Complex transformations | DataFrame |
| Flatten/Relationalize | DynamicFrame |
| Machine Learning | DataFrame |`,
      pt: `## DynamicFrames vs DataFrames

### DynamicFrame (Glue)
- Schema flexível (cada record pode ter schema diferente)
- Melhor para dados semi-estruturados
- Transformações built-in do Glue
- Lazy evaluation

### DataFrame (Spark)
- Schema estrito e uniforme
- Melhor performance para dados estruturados
- Acesso a toda a API do Spark
- Mais flexível para transformações complexas

### Conversão
\`\`\`python
# DynamicFrame → DataFrame
df = dynamic_frame.toDF()

# DataFrame → DynamicFrame
from awsglue.dynamicframe import DynamicFrame
dyf = DynamicFrame.fromDF(df, glueContext, "name")
\`\`\`

### Quando usar qual
| Caso | Usar |
|------|------|
| Dados JSON aninhados | DynamicFrame |
| Dados Parquet limpos | DataFrame |
| Transformações complexas | DataFrame |
| Flatten/Relationalize | DynamicFrame |
| Machine Learning | DataFrame |`
    },
    practicalTips: [
      { es: '🔄 En la práctica, convierte a DataFrame para transformaciones complejas y vuelve a DynamicFrame para escribir', en: '🔄 In practice, convert to DataFrame for complex transformations and back to DynamicFrame to write', pt: '🔄 Na prática, converta para DataFrame para transformações complexas e volte para DynamicFrame para escrever' }
    ],
    externalLinks: [
      { title: 'DynamicFrame Class', url: 'https://docs.aws.amazon.com/glue/latest/dg/aws-glue-api-crawler-pyspark-extensions-dynamic-frame.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Probaste convertir entre DynamicFrame y DataFrame en un job?', en: '✅ Did you try converting between DynamicFrame and DataFrame in a job?', pt: '✅ Você testou converter entre DynamicFrame e DataFrame em um job?' },
    xpReward: 55, estimatedMinutes: 30, services: ['Glue ETL']
  },

  {
    id: 'aws-4-6', stepNumber: 33,
    title: { es: 'Glue Studio para desarrollo visual', en: 'Glue Studio for visual development', pt: 'Glue Studio para desenvolvimento visual' },
    description: { es: 'Usar la interfaz visual de Glue Studio para crear ETL sin escribir código.', en: 'Use Glue Studio visual interface to create ETL without writing code.', pt: 'Usar a interface visual do Glue Studio para criar ETL sem escrever código.' },
    theory: {
      es: `## Glue Studio - ETL Visual

### Componentes de Glue Studio
1. **Visual Job Editor**: Drag & drop de transformaciones
2. **Notebooks**: Desarrollo interactivo
3. **Job Monitoring**: Métricas y logs
4. **Schema Preview**: Visualiza el schema en cada paso

### Nodos disponibles
**Source nodes**:
- S3 bucket
- Glue Data Catalog
- JDBC connections
- Kafka/Kinesis

**Transform nodes**:
- ApplyMapping
- Filter
- Join
- Aggregate
- Custom SQL
- Custom code (Python)

**Target nodes**:
- S3
- Glue Data Catalog
- JDBC
- Redshift

### Workflow típico
1. Añade Source (ej: tabla del Catalog)
2. Añade transformaciones (Filter, Join, etc.)
3. Preview data en cada paso
4. Añade Target (S3 + Catalog)
5. Run job y monitorea`,
      en: `## Glue Studio - Visual ETL

### Glue Studio Components
1. **Visual Job Editor**: Drag & drop transformations
2. **Notebooks**: Interactive development
3. **Job Monitoring**: Metrics and logs
4. **Schema Preview**: Visualize schema at each step

### Available nodes
**Source nodes**:
- S3 bucket
- Glue Data Catalog
- JDBC connections
- Kafka/Kinesis

**Transform nodes**:
- ApplyMapping
- Filter
- Join
- Aggregate
- Custom SQL
- Custom code (Python)

**Target nodes**:
- S3
- Glue Data Catalog
- JDBC
- Redshift

### Typical workflow
1. Add Source (e.g., Catalog table)
2. Add transformations (Filter, Join, etc.)
3. Preview data at each step
4. Add Target (S3 + Catalog)
5. Run job and monitor`,
      pt: `## Glue Studio - ETL Visual

### Componentes do Glue Studio
1. **Visual Job Editor**: Drag & drop de transformações
2. **Notebooks**: Desenvolvimento interativo
3. **Job Monitoring**: Métricas e logs
4. **Schema Preview**: Visualize o schema em cada passo

### Nós disponíveis
**Source nodes**:
- S3 bucket
- Glue Data Catalog
- JDBC connections
- Kafka/Kinesis

**Transform nodes**:
- ApplyMapping
- Filter
- Join
- Aggregate
- Custom SQL
- Custom code (Python)

**Target nodes**:
- S3
- Glue Data Catalog
- JDBC
- Redshift

### Workflow típico
1. Adicione Source (ex: tabela do Catalog)
2. Adicione transformações (Filter, Join, etc.)
3. Preview data em cada passo
4. Adicione Target (S3 + Catalog)
5. Run job e monitore`
    },
    practicalTips: [
      { es: '🎨 Glue Studio es perfecto para prototipar pipelines rápidamente antes de optimizar código', en: '🎨 Glue Studio is perfect for quickly prototyping pipelines before optimizing code', pt: '🎨 Glue Studio é perfeito para prototipar pipelines rapidamente antes de otimizar código' }
    ],
    externalLinks: [
      { title: 'AWS Glue Studio', url: 'https://docs.aws.amazon.com/glue/latest/ug/what-is-glue-studio.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un job visual en Glue Studio con al menos 3 transformaciones?', en: '✅ Did you create a visual job in Glue Studio with at least 3 transformations?', pt: '✅ Você criou um job visual no Glue Studio com pelo menos 3 transformações?' },
    xpReward: 50, estimatedMinutes: 35, services: ['Glue Studio']
  },

  {
    id: 'aws-4-7', stepNumber: 34,
    title: { es: 'Job Bookmarks e incremental processing', en: 'Job Bookmarks and incremental processing', pt: 'Job Bookmarks e processamento incremental' },
    description: { es: 'Implementar procesamiento incremental para no reprocesar datos antiguos.', en: 'Implement incremental processing to avoid reprocessing old data.', pt: 'Implementar processamento incremental para não reprocessar dados antigos.' },
    theory: {
      es: `## Job Bookmarks - Procesamiento Incremental

### ¿Qué son Job Bookmarks?
Mecanismo de Glue para recordar qué datos ya procesó y solo leer los nuevos.

### Cómo funciona
1. Job lee datos de S3
2. Glue guarda un "bookmark" (timestamp/path del último procesamiento)
3. En la siguiente ejecución, solo lee datos nuevos

### Activar bookmarks
\`\`\`python
# En la configuración del job
job.init(args['JOB_NAME'], args)
# Bookmark se activa en Job properties: --job-bookmark-option = job-bookmark-enable
\`\`\`

### Opciones de bookmark
- **job-bookmark-enable**: Procesa solo datos nuevos
- **job-bookmark-disable**: Procesa todos los datos
- **job-bookmark-pause**: Mantiene bookmark pero procesa todo

### ⚠️ Limitaciones
- Solo funciona con sources de S3 o Catalog
- Requiere estructura de archivos ordenada
- No funciona bien con archivos que se modifican

### Alternativa: Partition filtering
\`\`\`python
# Filtrar por partición de fecha
push_down_predicate = "year='2024' AND month='01'"
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="db",
    table_name="events",
    push_down_predicate=push_down_predicate
)
\`\`\``,
      en: `## Job Bookmarks - Incremental Processing

### What are Job Bookmarks?
Glue mechanism to remember what data was already processed and only read new data.

### How it works
1. Job reads data from S3
2. Glue saves a "bookmark" (timestamp/path of last processing)
3. On next run, only reads new data

### Enable bookmarks
\`\`\`python
# In job configuration
job.init(args['JOB_NAME'], args)
# Bookmark is enabled in Job properties: --job-bookmark-option = job-bookmark-enable
\`\`\`

### Bookmark options
- **job-bookmark-enable**: Process only new data
- **job-bookmark-disable**: Process all data
- **job-bookmark-pause**: Keep bookmark but process all

### ⚠️ Limitations
- Only works with S3 or Catalog sources
- Requires ordered file structure
- Doesn't work well with modified files

### Alternative: Partition filtering
\`\`\`python
# Filter by date partition
push_down_predicate = "year='2024' AND month='01'"
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="db",
    table_name="events",
    push_down_predicate=push_down_predicate
)
\`\`\``,
      pt: `## Job Bookmarks - Processamento Incremental

### O que são Job Bookmarks?
Mecanismo do Glue para lembrar quais dados já foram processados e só ler os novos.

### Como funciona
1. Job lê dados do S3
2. Glue salva um "bookmark" (timestamp/path do último processamento)
3. Na próxima execução, só lê dados novos

### Ativar bookmarks
\`\`\`python
# Na configuração do job
job.init(args['JOB_NAME'], args)
# Bookmark é ativado nas Job properties: --job-bookmark-option = job-bookmark-enable
\`\`\`

### Opções de bookmark
- **job-bookmark-enable**: Processa só dados novos
- **job-bookmark-disable**: Processa todos os dados
- **job-bookmark-pause**: Mantém bookmark mas processa tudo

### ⚠️ Limitações
- Só funciona com sources de S3 ou Catalog
- Requer estrutura de arquivos ordenada
- Não funciona bem com arquivos que são modificados

### Alternativa: Partition filtering
\`\`\`python
# Filtrar por partição de data
push_down_predicate = "year='2024' AND month='01'"
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="db",
    table_name="events",
    push_down_predicate=push_down_predicate
)
\`\`\``
    },
    practicalTips: [
      { es: '⏰ Job bookmarks funcionan mejor con datos inmutables y paths ordenados por tiempo', en: '⏰ Job bookmarks work best with immutable data and time-ordered paths', pt: '⏰ Job bookmarks funcionam melhor com dados imutáveis e paths ordenados por tempo' }
    ],
    externalLinks: [
      { title: 'Job Bookmarks', url: 'https://docs.aws.amazon.com/glue/latest/dg/monitor-continuations.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Ejecutaste el mismo job 2 veces y verificaste que solo procesó datos nuevos?', en: '✅ Did you run the same job 2 times and verify it only processed new data?', pt: '✅ Você executou o mesmo job 2 vezes e verificou que só processou dados novos?' },
    xpReward: 65, estimatedMinutes: 40, services: ['Glue ETL']
  },

  {
    id: 'aws-4-8', stepNumber: 35,
    title: { es: 'Optimización de Glue Jobs', en: 'Glue Jobs optimization', pt: 'Otimização de Glue Jobs' },
    description: { es: 'Técnicas para mejorar performance y reducir costos de jobs.', en: 'Techniques to improve performance and reduce job costs.', pt: 'Técnicas para melhorar performance e reduzir custos de jobs.' },
    theory: {
      es: `## Optimización de Glue Jobs

### 1. Elegir el tipo de worker correcto
| Worker | vCPU | RAM | Uso |
|--------|------|-----|-----|
| Standard | 4 | 16GB | General |
| G.1X | 4 | 16GB | Memory-intensive |
| G.2X | 8 | 32GB | ML/Large datasets |

### 2. Auto-scaling
\`\`\`
# Configuración recomendada
Number of workers: 2 (mínimo)
Maximum workers: 10 (auto-scale up to)
\`\`\`

### 3. Pushdown predicates
\`\`\`python
# BIEN: filtra en la fuente
datasource = glueContext.create_dynamic_frame.from_catalog(
    push_down_predicate="year='2024'"
)

# MAL: filtra después de cargar todo
datasource = datasource.filter(lambda x: x['year'] == '2024')
\`\`\`

### 4. Particionamiento de output
\`\`\`python
glueContext.write_dynamic_frame.from_options(
    frame=df,
    connection_options={
        "path": "s3://bucket/output/",
        "partitionKeys": ["year", "month"]
    }
)
\`\`\`

### 5. Compaction de archivos pequeños
Si tienes muchos archivos pequeños, consolídalos con coalesce/repartition.`,
      en: `## Glue Jobs Optimization

### 1. Choose correct worker type
| Worker | vCPU | RAM | Use |
|--------|------|-----|-----|
| Standard | 4 | 16GB | General |
| G.1X | 4 | 16GB | Memory-intensive |
| G.2X | 8 | 32GB | ML/Large datasets |

### 2. Auto-scaling
\`\`\`
# Recommended configuration
Number of workers: 2 (minimum)
Maximum workers: 10 (auto-scale up to)
\`\`\`

### 3. Pushdown predicates
\`\`\`python
# GOOD: filter at source
datasource = glueContext.create_dynamic_frame.from_catalog(
    push_down_predicate="year='2024'"
)

# BAD: filter after loading everything
datasource = datasource.filter(lambda x: x['year'] == '2024')
\`\`\`

### 4. Output partitioning
\`\`\`python
glueContext.write_dynamic_frame.from_options(
    frame=df,
    connection_options={
        "path": "s3://bucket/output/",
        "partitionKeys": ["year", "month"]
    }
)
\`\`\`

### 5. Small files compaction
If you have many small files, consolidate them with coalesce/repartition.`,
      pt: `## Otimização de Glue Jobs

### 1. Escolher o tipo de worker correto
| Worker | vCPU | RAM | Uso |
|--------|------|-----|-----|
| Standard | 4 | 16GB | Geral |
| G.1X | 4 | 16GB | Memory-intensive |
| G.2X | 8 | 32GB | ML/Large datasets |

### 2. Auto-scaling
\`\`\`
# Configuração recomendada
Number of workers: 2 (mínimo)
Maximum workers: 10 (auto-scale up to)
\`\`\`

### 3. Pushdown predicates
\`\`\`python
# BOM: filtra na fonte
datasource = glueContext.create_dynamic_frame.from_catalog(
    push_down_predicate="year='2024'"
)

# RUIM: filtra depois de carregar tudo
datasource = datasource.filter(lambda x: x['year'] == '2024')
\`\`\`

### 4. Particionamento de output
\`\`\`python
glueContext.write_dynamic_frame.from_options(
    frame=df,
    connection_options={
        "path": "s3://bucket/output/",
        "partitionKeys": ["year", "month"]
    }
)
\`\`\`

### 5. Compactação de arquivos pequenos
Se você tem muitos arquivos pequenos, consolide-os com coalesce/repartition.`
    },
    practicalTips: [
      { es: '💰 Monitorea los jobs con CloudWatch - la métrica "DPU Hours" te dice cuánto costó', en: '💰 Monitor jobs with CloudWatch - the "DPU Hours" metric tells you how much it cost', pt: '💰 Monitore os jobs com CloudWatch - a métrica "DPU Hours" te diz quanto custou' }
    ],
    externalLinks: [
      { title: 'Glue Best Practices', url: 'https://docs.aws.amazon.com/glue/latest/dg/aws-glue-programming-etl-partitions.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Redujiste el tiempo de un job usando pushdown predicates?', en: '✅ Did you reduce a job\'s time using pushdown predicates?', pt: '✅ Você reduziu o tempo de um job usando pushdown predicates?' },
    xpReward: 70, estimatedMinutes: 45, services: ['Glue ETL']
  },

  {
    id: 'aws-4-9', stepNumber: 36,
    title: { es: 'Glue Workflows para orquestación', en: 'Glue Workflows for orchestration', pt: 'Glue Workflows para orquestração' },
    description: { es: 'Crear workflows que coordinan múltiples crawlers y jobs.', en: 'Create workflows that coordinate multiple crawlers and jobs.', pt: 'Criar workflows que coordenam múltiplos crawlers e jobs.' },
    theory: {
      es: `## Glue Workflows

### Componentes
- **Triggers**: Inician acciones (schedule, on-demand, conditional)
- **Jobs**: ETL jobs a ejecutar
- **Crawlers**: Crawlers a ejecutar
- **Conditions**: Lógica condicional (job succeeded/failed)

### Ejemplo de pipeline
\`\`\`
[Trigger: Daily 6AM]
    ↓
[Crawler: raw-data]
    ↓ (on success)
[Job: raw-to-processed]
    ↓ (on success)
[Crawler: processed-data]
    ↓ (on success)
[Job: processed-to-serving]
\`\`\`

### Triggers disponibles
1. **Schedule**: Cron expression
2. **On-demand**: Manual o API
3. **Conditional**: Basado en estado de otro job/crawler

### ⚠️ Limitaciones de Glue Workflows
- Sin GUI para monitoreo avanzado
- Sin reintentos configurables
- Sin notificaciones built-in

Para pipelines complejos, considera Step Functions o Airflow (MWAA).`,
      en: `## Glue Workflows

### Components
- **Triggers**: Initiate actions (schedule, on-demand, conditional)
- **Jobs**: ETL jobs to execute
- **Crawlers**: Crawlers to execute
- **Conditions**: Conditional logic (job succeeded/failed)

### Pipeline example
\`\`\`
[Trigger: Daily 6AM]
    ↓
[Crawler: raw-data]
    ↓ (on success)
[Job: raw-to-processed]
    ↓ (on success)
[Crawler: processed-data]
    ↓ (on success)
[Job: processed-to-serving]
\`\`\`

### Available triggers
1. **Schedule**: Cron expression
2. **On-demand**: Manual or API
3. **Conditional**: Based on another job/crawler state

### ⚠️ Glue Workflows limitations
- No GUI for advanced monitoring
- No configurable retries
- No built-in notifications

For complex pipelines, consider Step Functions or Airflow (MWAA).`,
      pt: `## Glue Workflows

### Componentes
- **Triggers**: Iniciam ações (schedule, on-demand, conditional)
- **Jobs**: ETL jobs a executar
- **Crawlers**: Crawlers a executar
- **Conditions**: Lógica condicional (job succeeded/failed)

### Exemplo de pipeline
\`\`\`
[Trigger: Daily 6AM]
    ↓
[Crawler: raw-data]
    ↓ (on success)
[Job: raw-to-processed]
    ↓ (on success)
[Crawler: processed-data]
    ↓ (on success)
[Job: processed-to-serving]
\`\`\`

### Triggers disponíveis
1. **Schedule**: Cron expression
2. **On-demand**: Manual ou API
3. **Conditional**: Baseado no estado de outro job/crawler

### ⚠️ Limitações de Glue Workflows
- Sem GUI para monitoramento avançado
- Sem retries configuráveis
- Sem notificações built-in

Para pipelines complexos, considere Step Functions ou Airflow (MWAA).`
    },
    practicalTips: [
      { es: '🔄 Usa Glue Workflows para pipelines simples, Step Functions para complejos', en: '🔄 Use Glue Workflows for simple pipelines, Step Functions for complex ones', pt: '🔄 Use Glue Workflows para pipelines simples, Step Functions para complexos' }
    ],
    externalLinks: [
      { title: 'Glue Workflows', url: 'https://docs.aws.amazon.com/glue/latest/dg/workflows_overview.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un workflow con al menos un crawler y un job encadenados?', en: '✅ Did you create a workflow with at least one crawler and one job chained?', pt: '✅ Você criou um workflow com pelo menos um crawler e um job encadeados?' },
    xpReward: 60, estimatedMinutes: 40, services: ['Glue Workflows']
  },

  {
    id: 'aws-4-10', stepNumber: 37,
    title: { es: 'Conexiones JDBC y fuentes externas', en: 'JDBC connections and external sources', pt: 'Conexões JDBC e fontes externas' },
    description: { es: 'Conectar Glue a bases de datos RDS, Redshift y otras fuentes.', en: 'Connect Glue to RDS, Redshift databases and other sources.', pt: 'Conectar Glue a bancos de dados RDS, Redshift e outras fontes.' },
    theory: {
      es: `## Conexiones en Glue

### Tipos de conexión
- **JDBC**: RDS, Redshift, Aurora, bases externas
- **MongoDB**: Atlas o self-hosted
- **Kafka**: MSK o clusters externos
- **Network**: Custom endpoints en VPC

### Crear conexión JDBC
\`\`\`yaml
Connection: rds-postgres
  Type: JDBC
  JDBC URL: jdbc:postgresql://mydb.xyz.us-east-1.rds.amazonaws.com:5432/mydb
  Username: (desde Secrets Manager)
  Password: (desde Secrets Manager)
  VPC: vpc-xyz
  Security Groups: sg-glue
  Subnet: subnet-private
\`\`\`

### Usar conexión en Job
\`\`\`python
# Leer desde RDS
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="connections_db",
    table_name="my_rds_table",
    additional_options={"jobBookmarkKeys": ["id"]}
)

# O directamente con JDBC
jdbc_df = glueContext.create_dynamic_frame.from_options(
    connection_type="postgresql",
    connection_options={
        "url": "jdbc:postgresql://host:5432/db",
        "user": "user",
        "password": "pass",
        "dbtable": "schema.table"
    }
)
\`\`\`

### VPC Configuration
Glue necesita acceso de red a la DB:
1. Glue en VPC privada
2. Security group permite tráfico desde Glue
3. Subnet con route a la DB (o NAT Gateway)`,
      en: `## Glue Connections

### Connection types
- **JDBC**: RDS, Redshift, Aurora, external databases
- **MongoDB**: Atlas or self-hosted
- **Kafka**: MSK or external clusters
- **Network**: Custom endpoints in VPC

### Create JDBC connection
\`\`\`yaml
Connection: rds-postgres
  Type: JDBC
  JDBC URL: jdbc:postgresql://mydb.xyz.us-east-1.rds.amazonaws.com:5432/mydb
  Username: (from Secrets Manager)
  Password: (from Secrets Manager)
  VPC: vpc-xyz
  Security Groups: sg-glue
  Subnet: subnet-private
\`\`\`

### Use connection in Job
\`\`\`python
# Read from RDS
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="connections_db",
    table_name="my_rds_table",
    additional_options={"jobBookmarkKeys": ["id"]}
)

# Or directly with JDBC
jdbc_df = glueContext.create_dynamic_frame.from_options(
    connection_type="postgresql",
    connection_options={
        "url": "jdbc:postgresql://host:5432/db",
        "user": "user",
        "password": "pass",
        "dbtable": "schema.table"
    }
)
\`\`\`

### VPC Configuration
Glue needs network access to the DB:
1. Glue in private VPC
2. Security group allows traffic from Glue
3. Subnet with route to DB (or NAT Gateway)`,
      pt: `## Conexões no Glue

### Tipos de conexão
- **JDBC**: RDS, Redshift, Aurora, bancos externos
- **MongoDB**: Atlas ou self-hosted
- **Kafka**: MSK ou clusters externos
- **Network**: Custom endpoints em VPC

### Criar conexão JDBC
\`\`\`yaml
Connection: rds-postgres
  Type: JDBC
  JDBC URL: jdbc:postgresql://mydb.xyz.us-east-1.rds.amazonaws.com:5432/mydb
  Username: (do Secrets Manager)
  Password: (do Secrets Manager)
  VPC: vpc-xyz
  Security Groups: sg-glue
  Subnet: subnet-private
\`\`\`

### Usar conexão no Job
\`\`\`python
# Ler do RDS
datasource = glueContext.create_dynamic_frame.from_catalog(
    database="connections_db",
    table_name="my_rds_table",
    additional_options={"jobBookmarkKeys": ["id"]}
)

# Ou diretamente com JDBC
jdbc_df = glueContext.create_dynamic_frame.from_options(
    connection_type="postgresql",
    connection_options={
        "url": "jdbc:postgresql://host:5432/db",
        "user": "user",
        "password": "pass",
        "dbtable": "schema.table"
    }
)
\`\`\`

### Configuração de VPC
Glue precisa de acesso de rede ao DB:
1. Glue em VPC privada
2. Security group permite tráfego do Glue
3. Subnet com rota ao DB (ou NAT Gateway)`
    },
    practicalTips: [
      { es: '🔗 Siempre guarda credenciales JDBC en Secrets Manager, nunca en el código', en: '🔗 Always store JDBC credentials in Secrets Manager, never in code', pt: '🔗 Sempre guarde credenciais JDBC no Secrets Manager, nunca no código' }
    ],
    externalLinks: [
      { title: 'Glue Connections', url: 'https://docs.aws.amazon.com/glue/latest/dg/populate-add-connection.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste una conexión y leíste datos de una base de datos externa?', en: '✅ Did you create a connection and read data from an external database?', pt: '✅ Você criou uma conexão e leu dados de um banco de dados externo?' },
    xpReward: 65, estimatedMinutes: 45, services: ['Glue Connections', 'VPC']
  }
];








