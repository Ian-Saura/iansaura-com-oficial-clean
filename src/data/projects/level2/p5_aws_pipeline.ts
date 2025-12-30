import { Project } from '../../../types/members';

export const p5_aws_pipeline: Project = {
  id: 'p5-aws-pipeline',
  level: 2,
  title: { es: 'Pipeline End-to-End en AWS', en: 'End-to-End Pipeline on AWS', pt: 'Pipeline End-to-End na AWS' },
  description: {
    es: 'Construí un pipeline completo en AWS: S3 → Glue/Lambda → Athena. Esto es exactamente lo que hacen los equipos de datos en empresas reales.',
    en: 'Build a complete pipeline on AWS: S3 → Glue/Lambda → Athena. This is exactly what data teams do in real companies.',
    pt: 'Construa um pipeline completo na AWS: S3 → Glue/Lambda → Athena. Isso é exatamente o que fazem as equipes de dados em empresas reais.'
  },
  difficulty: 'Avanzado',
  duration: '6-8 horas',
  skills: [{ es: 'AWS' }, { es: 'S3' }, { es: 'Athena' }, { es: 'Glue' }, { es: 'Lambda' }, { es: 'IAM' }, { es: 'Terraform' }],
  icon: '☁️',
  color: 'orange',
  datasetId: 'finanzas',
  prerequisites: ['p4-data-warehouse', 'p1-etl-python'],
  estimatedLines: 100,
  realWorldExample: {
    es: 'Así estructura Capital One su Data Lake de transacciones financieras en AWS',
    en: 'This is how Capital One structures its financial transactions Data Lake on AWS',
    pt: 'Assim a Capital One estrutura seu Data Lake de transações financeiras na AWS'
  },
  usedBy: ['Netflix', 'Airbnb', 'Lyft', 'Pinterest', 'Slack'],
  learningObjectives: [
    { es: 'Estructurar un Data Lake en S3', en: 'Structure a Data Lake in S3', pt: 'Estruturar um Data Lake no S3' },
    { es: 'Configurar Athena para queries SQL', en: 'Configure Athena for SQL queries', pt: 'Configurar Athena para queries SQL' },
    { es: 'Crear crawlers con Glue', en: 'Create crawlers with Glue', pt: 'Criar crawlers com Glue' },
    { es: 'Manejar permisos IAM', en: 'Manage IAM permissions', pt: 'Gerenciar permissões IAM' },
    { es: 'Optimizar costos', en: 'Optimize costs', pt: 'Otimizar custos' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'Usar la cuenta root', en: 'Using root account', pt: 'Usar a conta root' },
      why: { es: 'Si comprometen la root, perdés todo', en: 'If root is compromised, you lose everything', pt: 'Se comprometem a root, você perde tudo' },
      solution: { es: 'Creá usuarios IAM con permisos mínimos', en: 'Create IAM users with minimal permissions', pt: 'Crie usuários IAM com permissões mínimas' },
    },
    {
      mistake: { es: 'No particionar datos en S3', en: 'Not partitioning data in S3', pt: 'Não particionar dados no S3' },
      why: { es: 'Athena escanea TODO si no hay particiones, $$$', en: 'Athena scans EVERYTHING if no partitions, $$$', pt: 'Athena escaneia TUDO se não houver partições, $$$' },
      solution: { es: 'Particioná por fecha: s3://bucket/year=2024/month=01/', en: 'Partition by date: s3://bucket/year=2024/month=01/', pt: 'Particione por data: s3://bucket/year=2024/month=01/' },
      code: `s3://mi-datalake/
├── raw/
│   └── transactions/
│       ├── year=2024/month=01/data.parquet
│       └── year=2024/month=02/data.parquet`
    },
    {
      mistake: { es: 'Olvidar revisar costos', en: 'Forgetting to check costs', pt: 'Esquecer de revisar custos' },
      why: { es: 'AWS cobra por todo: storage, queries, transfers', en: 'AWS charges for everything: storage, queries, transfers', pt: 'AWS cobra por tudo: storage, queries, transfers' },
      solution: { es: 'Configurá alertas de billing en $5, $10, $20', en: 'Set billing alerts at $5, $10, $20', pt: 'Configure alertas de billing em $5, $10, $20' },
    },
  ],
  expectedOutputs: [
    {
      step: 5,
      description: { es: 'Query en Athena funcionando', en: 'Working Athena query', pt: 'Query no Athena funcionando' },
      example: `Query: SELECT account_id, SUM(amount) as total 
       FROM transactions 
       WHERE type = 'deposit' 
       GROUP BY account_id LIMIT 10

Status: SUCCEEDED
Data scanned: 1.2 MB
Time: 2.3 seconds
Cost: $0.000006`
    },
  ],
  interviewStory: {
    hook: { es: "Construí un Data Lake en AWS que procesa 10GB de datos diarios por menos de $5/mes, usando S3, Glue y Athena.", en: "Built a Data Lake on AWS processing 10GB daily data for less than $5/month, using S3, Glue, and Athena.", pt: "Construí um Data Lake na AWS que processa 10GB de dados diários por menos de $5/mês, usando S3, Glue e Athena." },
    situation: { es: "La empresa tenía datos en múltiples fuentes que nadie podía consultar fácilmente. Necesitaban un lugar centralizado para analytics sin gastar una fortuna.", en: "Company had data in multiple sources no one could easily query. Needed centralized place for analytics without spending a fortune.", pt: "A empresa tinha dados em múltiplas fontes que ninguém podia consultar facilmente. Precisavam de um lugar centralizado para analytics sem gastar uma fortuna." },
    task: { es: "Diseñar e implementar un Data Lake serverless en AWS que fuera escalable y económico.", en: "Design and implement a serverless Data Lake on AWS that was scalable and cost-effective.", pt: "Projetar e implementar um Data Lake serverless na AWS que fosse escalável e econômico." },
    actions: [
      { es: "Diseñé la estructura del Data Lake en S3 con zonas raw/processed/curated", en: "Designed Data Lake structure in S3 with raw/processed/curated zones", pt: "Projetei a estrutura do Data Lake no S3 com zonas raw/processed/curated" },
      { es: "Implementé ingesta con AWS Glue crawlers para catalogar datos automáticamente", en: "Implemented ingestion with AWS Glue crawlers to automatically catalog data", pt: "Implementei ingestão com AWS Glue crawlers para catalogar dados automaticamente" },
      { es: "Configuré Athena para queries SQL sobre S3 sin necesidad de cargar datos", en: "Configured Athena for SQL queries on S3 without loading data", pt: "Configurei Athena para queries SQL sobre S3 sem necessidade de carregar dados" },
      { es: "Usé particionamiento por fecha para reducir costos de queries", en: "Used date partitioning to reduce query costs", pt: "Usei particionamento por data para reduzir custos de queries" },
      { es: "Implementé lifecycle policies para mover datos viejos a Glacier", en: "Implemented lifecycle policies to move old data to Glacier", pt: "Implementei lifecycle policies para mover dados velhos para Glacier" }
    ],
    results: [
      { es: "Data Lake procesando 10GB diarios por menos de $5/mes", en: "Data Lake processing 10GB daily for less than $5/month", pt: "Data Lake processando 10GB diários por menos de $5/mês" },
      { es: "Queries que antes eran imposibles ahora corren en segundos", en: "Queries that were impossible now run in seconds", pt: "Queries que antes eram impossíveis agora rodam em segundos" },
      { es: "El equipo de analytics puede consultar datos sin ayuda de ingeniería", en: "Analytics team can query data without engineering help", pt: "A equipe de analytics pode consultar dados sem ajuda de engenharia" },
      { es: "Escalable: el mismo diseño soportaría 1TB/día sin cambios", en: "Scalable: same design would support 1TB/day without changes", pt: "Escalável: o mesmo design suportaria 1TB/dia sem mudanças" }
    ],
    learnings: [
      { es: "Serverless no significa gratis - hay que optimizar para no tener sorpresas", en: "Serverless doesn't mean free - must optimize to avoid surprises", pt: "Serverless não significa grátis - tem que otimizar para não ter surpresas" },
      { es: "El particionamiento es crítico - puede reducir costos 100x", en: "Partitioning is critical - can reduce costs 100x", pt: "O particionamento é crítico - pode reduzir custos 100x" },
      { es: "Athena cobra por data scanned, no por tiempo - Parquet es esencial", en: "Athena charges by data scanned, not time - Parquet is essential", pt: "Athena cobra por data scanned, não por tempo - Parquet é essencial" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Por qué S3 + Athena en vez de Redshift?", en: "Why S3 + Athena instead of Redshift?", pt: "Por que S3 + Athena em vez de Redshift?" },
        answer: { es: "Costo y flexibilidad. Athena es pay-per-query, Redshift es pay-per-hour. Para analytics ad-hoc con uso variable, Athena es mucho más económico. Redshift para workloads predecibles y pesados.", en: "Cost and flexibility. Athena is pay-per-query, Redshift is pay-per-hour. For ad-hoc analytics with variable usage, Athena is much cheaper. Redshift for predictable heavy workloads.", pt: "Custo e flexibilidade. Athena é pay-per-query, Redshift é pay-per-hour. Para analytics ad-hoc com uso variável, Athena é muito mais econômico. Redshift para workloads previsíveis e pesados." }
      },
      {
        question: { es: "¿Cómo optimizaste costos?", en: "How did you optimize costs?", pt: "Como otimizou custos?" },
        answer: { es: "Tres cosas: 1) Parquet en vez de CSV (10x menos data scanned), 2) Particionamiento por fecha, 3) Lifecycle policies para mover datos viejos a Glacier.", en: "Three things: 1) Parquet instead of CSV (10x less data scanned), 2) Date partitioning, 3) Lifecycle policies to move old data to Glacier.", pt: "Três coisas: 1) Parquet em vez de CSV (10x menos data scanned), 2) Particionamento por data, 3) Lifecycle policies para mover dados velhos para Glacier." }
      },
      {
        question: { es: "¿Cómo manejarías datos en tiempo real?", en: "How would you handle real-time data?", pt: "Como lidaria com dados em tempo real?" },
        answer: { es: "Agregaría Kinesis Firehose para streaming a S3, con micro-batches cada 5 minutos. Para latencia sub-segundo, consideraría Kinesis Analytics o Flink.", en: "I'd add Kinesis Firehose for streaming to S3, with micro-batches every 5 mins. For sub-second latency, I'd consider Kinesis Analytics or Flink.", pt: "Adicionaria Kinesis Firehose para streaming ao S3, com micro-batches a cada 5 minutos. Para latência sub-segundo, consideraria Kinesis Analytics ou Flink." }
      }
    ],
    closingStatement: { es: "AWS me enseñó que la arquitectura correcta puede ser 10x más barata que la obvia.", en: "AWS taught me that the right architecture can be 10x cheaper than the obvious one.", pt: "AWS me ensinou que a arquitetura correta pode ser 10x mais barata que a óbvia." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '🔐 Configurá AWS correctamente', en: '🔐 Configure AWS correctly', pt: '🔐 Configure AWS corretamente' },
      explanation: { es: `1. Creá cuenta AWS Free Tier si no tenés
2. Configurá MFA en la cuenta root
3. Creá un usuario IAM para desarrollo
4. Nunca uses la cuenta root para trabajar`, en: `1. Create AWS Free Tier account if you don't have one
2. Configure MFA on root account
3. Create IAM user for development
4. Never use root account for work`, pt: `1. Crie conta AWS Free Tier se não tiver
2. Configure MFA na conta root
3. Crie um usuário IAM para desenvolvimento
4. Nunca use a conta root para trabalhar` },
      warning: { es: 'AWS puede cobrarte si te pasás del Free Tier. Revisá los límites.', en: 'AWS can charge you if you exceed Free Tier. Check limits.', pt: 'AWS pode cobrar se passar do Free Tier. Revise os limites.' },
      checkpoint: { es: '¿Tenés un usuario IAM con MFA?', en: 'Do you have an IAM user with MFA?', pt: 'Tem um usuário IAM com MFA?' }
    },
    { 
      order: 2, 
      text: { es: '📦 Creá el bucket S3', en: '📦 Create S3 bucket', pt: '📦 Crie o bucket S3' },
      code: `# Estructura recomendada:
s3://mi-data-lake-[tu-nombre]/
├── raw/              # Datos crudos, nunca modificar
│   └── ecommerce/
│       └── orders/
├── processed/        # Datos limpios
│   └── ecommerce/
│       └── orders/
└── analytics/        # Datos agregados
    └── reports/`,
      explanation: { es: 'Esta estructura (raw/processed/analytics) es el estándar de la industria.', en: 'This structure (raw/processed/analytics) is industry standard.', pt: 'Esta estrutura (raw/processed/analytics) é o padrão da indústria.' },
      tip: { es: 'El nombre del bucket debe ser único globalmente. Agregá tu nombre o fecha.', en: 'Bucket name must be globally unique. Add your name or date.', pt: 'O nome do bucket deve ser único globalmente. Adicione seu nome ou data.' }
    },
    { 
      order: 3, 
      text: { es: '📤 Subí datos a S3', en: '📤 Upload data to S3', pt: '📤 Suba dados para S3' },
      code: `# Con AWS CLI - subir todos los CSVs de datos bancarios
aws s3 cp data/ s3://mi-data-lake/raw/finanzas/ --recursive --exclude "*" --include "finanzas_*.csv"

# O un archivo específico:
# aws s3 cp data/finanzas_transactions.csv s3://mi-data-lake/raw/finanzas/

# También podés subir en JSON para estructura más rica:
# aws s3 cp data/finanzas_transactions.json s3://mi-data-lake/raw/finanzas/

# O desde la consola web:
# 1. Ir a S3
# 2. Click en el bucket
# 3. Upload (seleccioná los CSVs o JSON)`,
      explanation: { es: 'Los datos en raw/ son la fuente de verdad. Nunca los modifiques.', en: 'Data in raw/ is the source of truth. Never modify it.', pt: 'Os dados em raw/ são a fonte da verdade. Nunca modifique.' },
      checkpoint: { es: '¿Podés ver el archivo en S3?', en: 'Can you see the file in S3?', pt: 'Consegue ver o arquivo no S3?' }
    },
    { 
      order: 4, 
      text: { es: '🔍 Configurá Glue Crawler', en: '🔍 Configure Glue Crawler', pt: '🔍 Configure Glue Crawler' },
      explanation: { es: `1. Ir a AWS Glue → Crawlers → Create crawler
2. Nombre: ecommerce-crawler
3. Data source: s3://mi-data-lake/raw/ecommerce/
4. IAM role: Crear nuevo o usar existente
5. Database: ecommerce_db
6. Run crawler`, en: `1. Go to AWS Glue → Crawlers → Create crawler
2. Name: ecommerce-crawler
3. Data source: s3://mi-data-lake/raw/ecommerce/
4. IAM role: Create new or use existing
5. Database: ecommerce_db
6. Run crawler`, pt: `1. Ir para AWS Glue → Crawlers → Create crawler
2. Nome: ecommerce-crawler
3. Data source: s3://mi-data-lake/raw/ecommerce/
4. IAM role: Criar novo ou usar existente
5. Database: ecommerce_db
6. Run crawler` },
      tip: { es: 'El crawler detecta el schema automáticamente y crea tablas en el Glue Data Catalog.', en: 'Crawler automatically detects schema and creates tables in Glue Data Catalog.', pt: 'O crawler detecta o schema automaticamente e cria tabelas no Glue Data Catalog.' }
    },
    { 
      order: 5, 
      text: { es: '🔎 Configurá Athena', en: '🔎 Configure Athena', pt: '🔎 Configure Athena' },
      code: `-- En Athena Query Editor:

-- Ver tablas creadas por el crawler
SHOW TABLES IN ecommerce_db;

-- Query básica
SELECT COUNT(*) FROM ecommerce_db.orders;

-- Query más compleja
SELECT 
    DATE_TRUNC('month', order_date) as month,
    SUM(total) as revenue,
    COUNT(*) as orders
FROM ecommerce_db.orders
GROUP BY 1
ORDER BY 1;`,
      explanation: { es: 'Athena cobra por datos escaneados. Particionar y usar Parquet reduce costos.', en: 'Athena charges by data scanned. Partitioning and using Parquet reduces costs.', pt: 'Athena cobra por dados escaneados. Particionar e usar Parquet reduz custos.' },
      warning: { es: 'Configurá un "query result location" en S3 antes de correr queries.', en: 'Configure a "query result location" in S3 before running queries.', pt: 'Configure um "query result location" no S3 antes de rodar queries.' }
    },
    { 
      order: 6, 
      text: { es: '💰 Optimizá costos', en: '💰 Optimize costs', pt: '💰 Otimize custos' },
      code: `-- Convertir a Parquet (más eficiente)
CREATE TABLE ecommerce_db.orders_parquet
WITH (
    format = 'PARQUET',
    external_location = 's3://mi-data-lake/processed/ecommerce/orders/'
) AS
SELECT * FROM ecommerce_db.orders;

-- Comparar costos
-- JSON: escanea todo el archivo
-- Parquet: escanea solo columnas necesarias`,
      explanation: { es: 'Parquet puede reducir costos de Athena en 90%.', en: 'Parquet can reduce Athena costs by 90%.', pt: 'Parquet pode reduzir custos do Athena em 90%.' },
      tip: { es: 'Revisá AWS Cost Explorer regularmente.', en: 'Check AWS Cost Explorer regularly.', pt: 'Revise o AWS Cost Explorer regularmente.' }
    },
    { 
      order: 7, 
      text: { es: '🔒 Configurá IAM correctamente', en: '🔒 Configure IAM correctly', pt: '🔒 Configure IAM corretamente' },
      explanation: { es: `Creá policies con least privilege:
- S3: solo lectura del bucket específico
- Athena: solo queries, no crear tablas
- Glue: solo el crawler específico`, en: `Create policies with least privilege:
- S3: read-only specific bucket
- Athena: queries only, no table creation
- Glue: specific crawler only`, pt: `Crie policies com least privilege:
- S3: apenas leitura do bucket específico
- Athena: apenas queries, não criar tabelas
- Glue: apenas o crawler específico` },
      checkpoint: { es: '¿Tus policies siguen el principio de least privilege?', en: 'Do your policies follow least privilege principle?', pt: 'Suas policies seguem o princípio de least privilege?' }
    },
    { 
      order: 8, 
      text: { es: '📝 Documentá la arquitectura', en: '📝 Document architecture', pt: '📝 Documente a arquitetura' },
      explanation: { es: 'Creá un diagrama en draw.io mostrando: S3 buckets, Glue crawler, Athena, IAM roles.', en: 'Create a diagram in draw.io showing: S3 buckets, Glue crawler, Athena, IAM roles.', pt: 'Crie um diagrama no draw.io mostrando: S3 buckets, Glue crawler, Athena, IAM roles.' },
      checkpoint: { es: '¿Tu diagrama muestra el flujo de datos completo?', en: 'Does your diagram show the complete data flow?', pt: 'Seu diagrama mostra o fluxo de dados completo?' }
    },
  ],
  deliverable: { es: 'Diagrama de arquitectura + screenshots + documentación de costos', en: 'Architecture diagram + screenshots + cost documentation', pt: 'Diagrama de arquitetura + screenshots + documentação de custos' },
  evaluation: [
    { es: '¿La estructura de S3 sigue raw/processed/analytics?', en: 'Does S3 structure follow raw/processed/analytics?', pt: 'A estrutura do S3 segue raw/processed/analytics?' },
    { es: '¿Los permisos IAM son mínimos?', en: 'Are IAM permissions minimal?', pt: 'As permissões IAM são mínimas?' },
    { es: '¿Usás Parquet para optimizar costos?', en: 'Do you use Parquet to optimize costs?', pt: 'Usa Parquet para otimizar custos?' },
    { es: '¿Documentaste los costos estimados?', en: 'Did you document estimated costs?', pt: 'Documentou os custos estimados?' },
  ],
  theory: { es: `## Servicios AWS para Data Engineering

| Servicio | Función | Costo |
|----------|---------|-------|
| S3 | Storage | $0.023/GB/mes |
| Athena | SQL queries | $5/TB escaneado |
| Glue | ETL, Crawlers | $0.44/DPU-hora |
| Lambda | Funciones | Free tier generoso |

## Estructura de Data Lake

**Raw**: Datos crudos, nunca modificar
**Processed**: Datos limpios, validados
**Analytics**: Datos agregados, listos para BI

## Optimización de Costos

1. Usar Parquet en vez de JSON/CSV
2. Particionar por fecha
3. Usar columnar storage
4. Comprimir datos`, en: `## AWS Services for Data Engineering

| Service | Function | Cost |
|---------|----------|------|
| S3 | Storage | $0.023/GB/month |
| Athena | SQL queries | $5/TB scanned |
| Glue | ETL, Crawlers | $0.44/DPU-hour |
| Lambda | Functions | Generous Free tier |

## Data Lake Structure

**Raw**: Raw data, never modify
**Processed**: Clean, validated data
**Analytics**: Aggregated data, ready for BI

## Cost Optimization

1. Use Parquet instead of JSON/CSV
2. Partition by date
3. Use columnar storage
4. Compress data`, pt: `## Serviços AWS para Data Engineering

| Serviço | Função | Custo |
|---------|--------|-------|
| S3 | Storage | $0.023/GB/mês |
| Athena | SQL queries | $5/TB escaneado |
| Glue | ETL, Crawlers | $0.44/DPU-hora |
| Lambda | Funções | Free tier generoso |

## Estrutura de Data Lake

**Raw**: Dados crus, nunca modificar
**Processed**: Dados limpos, validados
**Analytics**: Dados agregados, prontos para BI

## Otimização de Custos

1. Usar Parquet em vez de JSON/CSV
2. Particionar por data
3. Usar columnar storage
4. Comprimir dados` },
};


