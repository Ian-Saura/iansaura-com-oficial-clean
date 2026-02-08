/**
 * FASE 6: AMAZON REDSHIFT - DATA WAREHOUSE
 * 9 pasos para dominar Redshift
 */
import { AWSStep } from '../types';

export const phase6Steps: AWSStep[] = [
  { id: 'aws-6-1', stepNumber: 46, title: { es: 'Introducción a Amazon Redshift', en: 'Introduction to Amazon Redshift', pt: 'Introdução ao Amazon Redshift' }, description: { es: 'Entender arquitectura MPP y casos de uso.', en: 'Understand MPP architecture and use cases.', pt: 'Entender arquitetura MPP e casos de uso.' }, theory: { es: `## Amazon Redshift\n\n### Arquitectura MPP (Massively Parallel Processing)\n- **Leader Node**: Recibe queries, planifica, coordina\n- **Compute Nodes**: Ejecutan queries en paralelo\n- **Slices**: Subdivisiones de cada nodo\n\n### Tipos de nodos\n| Tipo | vCPU | RAM | Storage | Uso |\n|------|------|-----|---------|-----|\n| dc2.large | 2 | 15GB | 160GB SSD | Dev/Test |\n| dc2.8xlarge | 32 | 244GB | 2.56TB SSD | Production |\n| ra3.xlplus | 4 | 32GB | Managed | Scalable |\n| ra3.4xlarge | 12 | 96GB | Managed | Production |\n\n### Redshift Serverless\nPaga por capacidad usada (RPUs), sin gestión de clusters.`, en: `## Amazon Redshift\n\n### MPP Architecture (Massively Parallel Processing)\n- **Leader Node**: Receives queries, plans, coordinates\n- **Compute Nodes**: Execute queries in parallel\n- **Slices**: Subdivisions of each node\n\n### Node types\n| Type | vCPU | RAM | Storage | Use |\n|------|------|-----|---------|-----|\n| dc2.large | 2 | 15GB | 160GB SSD | Dev/Test |\n| dc2.8xlarge | 32 | 244GB | 2.56TB SSD | Production |\n| ra3.xlplus | 4 | 32GB | Managed | Scalable |\n| ra3.4xlarge | 12 | 96GB | Managed | Production |\n\n### Redshift Serverless\nPay for used capacity (RPUs), no cluster management.`, pt: `## Amazon Redshift\n\n### Arquitetura MPP (Massively Parallel Processing)\n- **Leader Node**: Recebe queries, planeja, coordena\n- **Compute Nodes**: Executam queries em paralelo\n- **Slices**: Subdivisões de cada nó\n\n### Tipos de nós\n| Tipo | vCPU | RAM | Storage | Uso |\n|------|------|-----|---------|-----|\n| dc2.large | 2 | 15GB | 160GB SSD | Dev/Test |\n| dc2.8xlarge | 32 | 244GB | 2.56TB SSD | Production |\n| ra3.xlplus | 4 | 32GB | Managed | Scalable |\n| ra3.4xlarge | 12 | 96GB | Managed | Production |\n\n### Redshift Serverless\nPaga por capacidade usada (RPUs), sem gestão de clusters.` }, practicalTips: [{ es: '🚀 Usa Redshift Serverless para desarrollo y pequeños workloads', en: '🚀 Use Redshift Serverless for development and small workloads', pt: '🚀 Use Redshift Serverless para desenvolvimento e pequenos workloads' }], externalLinks: [{ title: 'Redshift Documentation', url: 'https://docs.aws.amazon.com/redshift/latest/dg/welcome.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Entiendes la diferencia entre Leader y Compute nodes?', en: '✅ Do you understand the difference between Leader and Compute nodes?', pt: '✅ Você entende a diferença entre Leader e Compute nodes?' }, xpReward: 55, estimatedMinutes: 30, services: ['Redshift'] },
  
  { id: 'aws-6-2', stepNumber: 47, title: { es: 'Crear cluster Redshift', en: 'Create Redshift cluster', pt: 'Criar cluster Redshift' }, description: { es: 'Configurar un cluster o Redshift Serverless.', en: 'Configure a cluster or Redshift Serverless.', pt: 'Configurar um cluster ou Redshift Serverless.' }, theory: { es: `## Crear Cluster Redshift\n\n### Opciones de creación\n1. **Provisioned**: Cluster con nodos fijos\n2. **Serverless**: Capacidad automática\n\n### Configuración básica\n\`\`\`yaml\nCluster: my-dwh-cluster\n  Node type: dc2.large\n  Number of nodes: 2\n  Database name: analytics\n  Admin user: admin\n  VPC: vpc-prod\n  Security Group: sg-redshift\n  Encrypted: Yes (KMS)\n  Enhanced VPC Routing: Yes\n\`\`\`\n\n### Conexión\n\`\`\`bash\n# Con psql\npsql -h cluster.xyz.us-east-1.redshift.amazonaws.com -p 5439 -U admin -d analytics\n\n# JDBC URL\njdbc:redshift://cluster.xyz.us-east-1.redshift.amazonaws.com:5439/analytics\n\`\`\``, en: `## Create Redshift Cluster\n\n### Creation options\n1. **Provisioned**: Cluster with fixed nodes\n2. **Serverless**: Automatic capacity\n\n### Basic configuration\n\`\`\`yaml\nCluster: my-dwh-cluster\n  Node type: dc2.large\n  Number of nodes: 2\n  Database name: analytics\n  Admin user: admin\n  VPC: vpc-prod\n  Security Group: sg-redshift\n  Encrypted: Yes (KMS)\n  Enhanced VPC Routing: Yes\n\`\`\`\n\n### Connection\n\`\`\`bash\n# With psql\npsql -h cluster.xyz.us-east-1.redshift.amazonaws.com -p 5439 -U admin -d analytics\n\n# JDBC URL\njdbc:redshift://cluster.xyz.us-east-1.redshift.amazonaws.com:5439/analytics\n\`\`\``, pt: `## Criar Cluster Redshift\n\n### Opções de criação\n1. **Provisioned**: Cluster com nós fixos\n2. **Serverless**: Capacidade automática\n\n### Configuração básica\n\`\`\`yaml\nCluster: my-dwh-cluster\n  Node type: dc2.large\n  Number of nodes: 2\n  Database name: analytics\n  Admin user: admin\n  VPC: vpc-prod\n  Security Group: sg-redshift\n  Encrypted: Yes (KMS)\n  Enhanced VPC Routing: Yes\n\`\`\`\n\n### Conexão\n\`\`\`bash\n# Com psql\npsql -h cluster.xyz.us-east-1.redshift.amazonaws.com -p 5439 -U admin -d analytics\n\n# JDBC URL\njdbc:redshift://cluster.xyz.us-east-1.redshift.amazonaws.com:5439/analytics\n\`\`\`` }, practicalTips: [{ es: '💰 dc2.large es suficiente para aprender - NO crees clusters grandes', en: '💰 dc2.large is enough for learning - DON\'T create large clusters', pt: '💰 dc2.large é suficiente para aprender - NÃO crie clusters grandes' }], externalLinks: [{ title: 'Getting Started with Redshift', url: 'https://docs.aws.amazon.com/redshift/latest/gsg/getting-started.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Creaste un cluster Serverless o dc2.large y te conectaste?', en: '✅ Did you create a Serverless or dc2.large cluster and connect?', pt: '✅ Você criou um cluster Serverless ou dc2.large e se conectou?' }, xpReward: 60, estimatedMinutes: 35, services: ['Redshift'] },
  
  { id: 'aws-6-3', stepNumber: 48, title: { es: 'COPY: El Comando Más Importante de Redshift', en: 'COPY: The Most Important Redshift Command', pt: 'COPY: O Comando Mais Importante do Redshift' }, description: { es: 'COPY es 10-100x más rápido que INSERT. Es la ÚNICA forma correcta de cargar datos masivos. Aprovecha MPP para cargar en paralelo desde S3.', en: 'COPY is 10-100x faster than INSERT. It is the ONLY correct way to bulk load data. It leverages MPP to load in parallel from S3.', pt: 'COPY é 10-100x mais rápido que INSERT. É a ÚNICA forma correta de carregar dados massivos. Aproveita MPP para carregar em paralelo do S3.' }, theory: { es: `## COPY: El Comando Más Importante de Redshift

### ¿Por Qué COPY es Clave?
COPY es **10-100x más rápido** que INSERT porque aprovecha la arquitectura MPP (Massively Parallel Processing):

\`\`\`
INSERT (MALO - fila por fila):
  App → Leader Node → 1 Compute Node → disco
  1 millón de filas = 1 millón de operaciones secuenciales
  Tiempo: ~30 minutos

COPY (BUENO - paralelo masivo):
  S3 → Leader Node → TODOS los Compute Nodes en paralelo
  1 millón de filas = repartidas entre N nodos simultáneamente
  Tiempo: ~30 segundos (60x más rápido)
\`\`\`

**REGLA DE ORO: NUNCA uses INSERT para cargas de más de 100 filas. Siempre COPY.**

### Sintaxis Básica
\`\`\`sql
-- Desde Parquet (RECOMENDADO - más rápido, tipos nativos)
COPY sales
FROM 's3://mi-datalake/silver/sales/'
IAM_ROLE 'arn:aws:iam::123456789012:role/RedshiftS3Role'
FORMAT AS PARQUET;

-- Desde CSV comprimido
COPY users
FROM 's3://mi-datalake/bronze/users/'
IAM_ROLE 'arn:aws:iam::123456789012:role/RedshiftS3Role'
CSV
IGNOREHEADER 1
DELIMITER ','
GZIP
REGION 'us-east-1'
MAXERROR 100
COMPUPDATE ON
STATUPDATE ON;
\`\`\`

### Optimización: Dividir Archivos para Carga Paralela
La regla más importante: **número de archivos = múltiplo del número de slices**.

\`\`\`
Cluster con 2 nodos dc2.large (2 slices cada uno) = 4 slices total

❌ MALO: 1 archivo de 10GB
   → Solo 1 slice trabaja, los otros 3 esperan

✅ BUENO: 4 archivos de 2.5GB
   → Cada slice carga 1 archivo en paralelo (4x más rápido)

✅ MEJOR: 8 archivos de 1.25GB
   → 2 rondas, cada slice siempre ocupado

Regla: archivos de 100MB-1GB, cantidad = múltiplo de slices
\`\`\`

\`\`\`bash
# Ver cuántos slices tiene tu cluster
SELECT node, COUNT(*) as slices FROM stv_slices GROUP BY node;
\`\`\`

### MANIFEST: Control Exacto de Archivos
\`\`\`json
// manifest.json en S3
{
  "entries": [
    {"url": "s3://bucket/data/part-00000.parquet", "mandatory": true},
    {"url": "s3://bucket/data/part-00001.parquet", "mandatory": true},
    {"url": "s3://bucket/data/part-00002.parquet", "mandatory": true},
    {"url": "s3://bucket/data/part-00003.parquet", "mandatory": true}
  ]
}
\`\`\`

\`\`\`sql
-- COPY con MANIFEST (carga SOLO los archivos listados)
COPY sales
FROM 's3://bucket/data/manifest.json'
IAM_ROLE 'arn:aws:iam::123:role/RedshiftS3Role'
FORMAT AS PARQUET
MANIFEST;
\`\`\`

### Debugging: Cuando COPY Falla
\`\`\`sql
-- Ver errores de la última carga
SELECT * FROM stl_load_errors ORDER BY starttime DESC LIMIT 20;

-- Ver columnas problemáticas
SELECT colname, type, col_length, err_reason
FROM stl_load_errors 
WHERE filename LIKE '%sales%'
ORDER BY starttime DESC LIMIT 10;

-- Errores comunes:
-- "Delimiter not found" → archivo no tiene el delimiter correcto
-- "String length exceeds DDL length" → VARCHAR muy corto
-- "Invalid digit" → columna INT tiene texto
\`\`\`

### Opciones Avanzadas
\`\`\`sql
COPY sales
FROM 's3://bucket/data/'
IAM_ROLE 'arn:aws:iam::123:role/RedshiftS3Role'
FORMAT AS PARQUET
COMPUPDATE ON        -- Aplica encoding óptimo automáticamente
STATUPDATE ON        -- Actualiza estadísticas para el optimizer
MAXERROR 1000        -- Permite hasta 1000 errores antes de fallar
TRUNCATECOLUMNS      -- Trunca strings que excedan VARCHAR length
TIMEFORMAT 'auto'    -- Detecta formato de timestamps automáticamente
ACCEPTINVCHARS ' '   -- Reemplaza caracteres inválidos con espacio
BLANKSASNULL;        -- Trata blanks como NULL
\`\`\`

### COPY vs INSERT vs UNLOAD - Cuándo Usar Cada Uno
| Operación | Comando | Velocidad | Cuándo |
|-----------|---------|-----------|--------|
| S3 → Redshift | **COPY** | ⚡⚡⚡ | SIEMPRE para cargas bulk |
| Redshift → S3 | **UNLOAD** | ⚡⚡⚡ | Exportar resultados/Gold |
| Fila individual | INSERT | ⚡ | Solo para < 100 filas |
| Tabla a tabla | INSERT INTO...SELECT | ⚡⚡ | Transformaciones internas |

### Costo: COPY es GRATIS
COPY no tiene costo adicional. Solo pagas por el compute de Redshift que ya está corriendo. La transferencia desde S3 en la misma región es gratis. Es la operación con mejor relación costo/rendimiento en todo AWS.

### Post-COPY: VACUUM y ANALYZE
\`\`\`sql
-- Después de COPY o DELETE, SIEMPRE ejecutar:
VACUUM sales;    -- Recupera espacio de filas eliminadas, re-sort
ANALYZE sales;   -- Actualiza estadísticas para query optimizer

-- VACUUM FULL vs SORT ONLY
VACUUM FULL sales;       -- Recupera espacio + re-sort (más lento)
VACUUM SORT ONLY sales;  -- Solo re-sort (más rápido)
VACUUM DELETE ONLY sales; -- Solo recuperar espacio
\`\`\``, en: `## COPY: The Most Important Redshift Command

### Why COPY is Key
COPY is **10-100x faster** than INSERT because it leverages MPP (Massively Parallel Processing):

\`\`\`
INSERT (BAD - row by row):
  App → Leader Node → 1 Compute Node → disk
  1 million rows = 1 million sequential operations
  Time: ~30 minutes

COPY (GOOD - massive parallel):
  S3 → Leader Node → ALL Compute Nodes in parallel
  1 million rows = distributed across N nodes simultaneously
  Time: ~30 seconds (60x faster)
\`\`\`

**GOLDEN RULE: NEVER use INSERT for loads of more than 100 rows. Always COPY.**

### Basic Syntax
\`\`\`sql
-- From Parquet (RECOMMENDED)
COPY sales
FROM 's3://my-datalake/silver/sales/'
IAM_ROLE 'arn:aws:iam::123:role/RedshiftS3Role'
FORMAT AS PARQUET;

-- From compressed CSV
COPY users
FROM 's3://my-datalake/bronze/users/'
IAM_ROLE 'arn:aws:iam::123:role/RedshiftS3Role'
CSV IGNOREHEADER 1 GZIP MAXERROR 100
COMPUPDATE ON STATUPDATE ON;
\`\`\`

### Optimization: Split Files for Parallel Loading
Most important rule: **number of files = multiple of slice count**.

### Debugging: When COPY Fails
\`\`\`sql
SELECT * FROM stl_load_errors ORDER BY starttime DESC LIMIT 20;
\`\`\`

### Post-COPY: VACUUM and ANALYZE
\`\`\`sql
VACUUM sales;   -- Reclaim space from deleted rows, re-sort
ANALYZE sales;  -- Update statistics for query optimizer
\`\`\`

### COPY is FREE
No additional cost. You only pay for Redshift compute already running. S3 transfer in same region is free.`, pt: `## COPY: O Comando Mais Importante do Redshift

### Por Que COPY é Chave
COPY é **10-100x mais rápido** que INSERT porque aproveita a arquitetura MPP:

\`\`\`
INSERT (RUIM - linha por linha):
  App → Leader Node → 1 Compute Node → disco
  1 milhão de linhas = 1 milhão de operações sequenciais

COPY (BOM - paralelo massivo):
  S3 → Leader Node → TODOS os Compute Nodes em paralelo
  1 milhão de linhas = distribuídas entre N nós simultaneamente
\`\`\`

**REGRA DE OURO: NUNCA use INSERT para cargas de mais de 100 linhas. Sempre COPY.**

### Sintaxe Básica
\`\`\`sql
COPY sales
FROM 's3://meu-datalake/silver/sales/'
IAM_ROLE 'arn:aws:iam::123:role/RedshiftS3Role'
FORMAT AS PARQUET;
\`\`\`

### Otimização: Dividir Arquivos
Regra: número de arquivos = múltiplo do número de slices.

### Debugging
\`\`\`sql
SELECT * FROM stl_load_errors ORDER BY starttime DESC LIMIT 20;
\`\`\`

### COPY é GRÁTIS
Sem custo adicional. Transferência do S3 na mesma região é grátis.` }, practicalTips: [{ es: '⚡ NUNCA uses INSERT para más de 100 filas - COPY es 10-100x más rápido porque carga en paralelo usando todos los nodos del cluster', en: '⚡ NEVER use INSERT for more than 100 rows - COPY is 10-100x faster because it loads in parallel using all cluster nodes', pt: '⚡ NUNCA use INSERT para mais de 100 linhas - COPY é 10-100x mais rápido porque carrega em paralelo usando todos os nós do cluster' }, { es: '📦 Divide archivos en múltiplos del número de slices (ej: cluster de 4 slices → 4, 8, 12 archivos). Archivos de 100MB-1GB cada uno.', en: '📦 Split files into multiples of slice count (e.g.: 4 slice cluster → 4, 8, 12 files). Files of 100MB-1GB each.', pt: '📦 Divida arquivos em múltiplos do número de slices (ex: cluster de 4 slices → 4, 8, 12 arquivos). Arquivos de 100MB-1GB cada.' }, { es: '🆓 COPY no tiene costo extra - solo pagas el compute de Redshift que ya está corriendo. La transferencia desde S3 en la misma región es gratis.', en: '🆓 COPY has no extra cost - you only pay for Redshift compute already running. S3 transfer in same region is free.', pt: '🆓 COPY não tem custo extra - você só paga pelo compute do Redshift que já está rodando. Transferência do S3 na mesma região é grátis.' }, { es: '🔍 Si COPY falla, revisa stl_load_errors para ver exactamente qué fila y columna causó el error', en: '🔍 If COPY fails, check stl_load_errors to see exactly which row and column caused the error', pt: '🔍 Se COPY falhar, verifique stl_load_errors para ver exatamente qual linha e coluna causou o erro' }], interviewTips: [{ es: '🎯 "¿Cómo cargarías 100 millones de filas en Redshift?" → NUNCA con INSERT. Siempre COPY desde S3. Dividir los datos en archivos de 100MB-1GB, cantidad = múltiplo de slices. Usar Parquet con Snappy para máxima eficiencia. COPY es 10-100x más rápido que INSERT porque aprovecha MPP para cargar en paralelo en todos los nodos.', en: '🎯 "How would you load 100 million rows into Redshift?" → NEVER with INSERT. Always COPY from S3. Split data into 100MB-1GB files, count = multiple of slices. Use Parquet with Snappy. COPY is 10-100x faster than INSERT because it leverages MPP.', pt: '🎯 "Como você carregaria 100 milhões de linhas no Redshift?" → NUNCA com INSERT. Sempre COPY do S3. Dividir dados em arquivos de 100MB-1GB, quantidade = múltiplo de slices. Usar Parquet com Snappy. COPY é 10-100x mais rápido que INSERT.' }, { es: '🎯 "¿Qué haces después de un COPY o DELETE en Redshift?" → VACUUM para recuperar espacio de filas eliminadas y re-sortear. ANALYZE para actualizar estadísticas del query optimizer. Sin VACUUM, las queries se degradan progresivamente. Sin ANALYZE, el optimizer toma decisiones subóptimas.', en: '🎯 "What do you do after a COPY or DELETE in Redshift?" → VACUUM to reclaim space and re-sort. ANALYZE to update optimizer statistics. Without VACUUM, queries degrade progressively. Without ANALYZE, optimizer makes suboptimal decisions.', pt: '🎯 "O que você faz depois de um COPY ou DELETE no Redshift?" → VACUUM para recuperar espaço e re-ordenar. ANALYZE para atualizar estatísticas do optimizer. Sem VACUUM, queries degradam progressivamente.' }, { es: '🎯 "¿Cómo debuggearías un COPY que falla?" → Consultar stl_load_errors para ver fila exacta, columna y motivo del error. Errores comunes: tipos de datos incompatibles, VARCHAR muy corto, caracteres inválidos. Usar MAXERROR para tolerar N errores. Usar MANIFEST para control exacto de qué archivos cargar.', en: '🎯 "How would you debug a failing COPY?" → Query stl_load_errors for exact row, column and error reason. Common errors: incompatible data types, VARCHAR too short, invalid characters. Use MAXERROR to tolerate N errors.', pt: '🎯 "Como você debuggaria um COPY que falha?" → Consultar stl_load_errors para ver linha exata, coluna e motivo do erro.' }], commonMistakes: [{ es: '❌ Usar INSERT INTO para cargas masivas - es 10-100x más lento que COPY', en: '❌ Using INSERT INTO for bulk loads - it is 10-100x slower than COPY', pt: '❌ Usar INSERT INTO para cargas massivas - é 10-100x mais lento que COPY' }, { es: '❌ Cargar un solo archivo enorme - dividir en múltiplos del número de slices', en: '❌ Loading a single huge file - split into multiples of slice count', pt: '❌ Carregar um único arquivo enorme - dividir em múltiplos do número de slices' }, { es: '❌ No ejecutar VACUUM/ANALYZE después de COPY con DELETE previo', en: '❌ Not running VACUUM/ANALYZE after COPY with prior DELETE', pt: '❌ Não executar VACUUM/ANALYZE depois de COPY com DELETE anterior' }], externalLinks: [{ title: 'COPY Command Reference', url: 'https://docs.aws.amazon.com/redshift/latest/dg/r_COPY.html', type: 'aws_docs' }, { title: 'COPY Best Practices', url: 'https://docs.aws.amazon.com/redshift/latest/dg/c_loading-data-best-practices.html', type: 'aws_docs' }, { title: 'STL_LOAD_ERRORS', url: 'https://docs.aws.amazon.com/redshift/latest/dg/r_STL_LOAD_ERRORS.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Cargaste 1M+ filas con COPY y verificaste que fue paralelo revisando slices?', en: '✅ Did you load 1M+ rows with COPY and verify it was parallel by checking slices?', pt: '✅ Você carregou 1M+ linhas com COPY e verificou que foi paralelo checando slices?' }, xpReward: 75, estimatedMinutes: 50, services: ['Redshift', 'S3'] },
  
  { id: 'aws-6-4', stepNumber: 49, title: { es: 'Distribution y Sort Keys', en: 'Distribution and Sort Keys', pt: 'Distribution e Sort Keys' }, description: { es: 'Optimizar tablas con distribution y sort keys.', en: 'Optimize tables with distribution and sort keys.', pt: 'Otimizar tabelas com distribution e sort keys.' }, theory: { es: `## Distribution y Sort Keys\n\n### Distribution Styles\n1. **AUTO**: Redshift elige (recomendado para empezar)\n2. **EVEN**: Distribuye filas uniformemente\n3. **KEY**: Por valor de columna (bueno para JOINs)\n4. **ALL**: Copia tabla a todos los nodos (tablas pequeñas)\n\n### Sort Keys\n1. **COMPOUND**: Múltiples columnas, orden importa\n2. **INTERLEAVED**: Múltiples columnas, orden no importa (deprecated)\n\n### Ejemplo optimizado\n\`\`\`sql\nCREATE TABLE sales (\n  sale_id BIGINT,\n  customer_id INT,\n  sale_date DATE,\n  amount DECIMAL(10,2)\n)\nDISTKEY(customer_id)  -- JOIN frecuente con customers\nSORTKEY(sale_date);   -- Filtro frecuente por fecha\n\`\`\`\n\n### Cuándo usar qué\n- **DISTKEY**: Columna de JOIN más frecuente\n- **SORTKEY**: Columna de filtro más frecuente`, en: `## Distribution and Sort Keys\n\n### Distribution Styles\n1. **AUTO**: Redshift chooses (recommended to start)\n2. **EVEN**: Distributes rows evenly\n3. **KEY**: By column value (good for JOINs)\n4. **ALL**: Copies table to all nodes (small tables)\n\n### Sort Keys\n1. **COMPOUND**: Multiple columns, order matters\n2. **INTERLEAVED**: Multiple columns, order doesn't matter (deprecated)\n\n### Optimized example\n\`\`\`sql\nCREATE TABLE sales (\n  sale_id BIGINT,\n  customer_id INT,\n  sale_date DATE,\n  amount DECIMAL(10,2)\n)\nDISTKEY(customer_id)  -- Frequent JOIN with customers\nSORTKEY(sale_date);   -- Frequent filter by date\n\`\`\`\n\n### When to use what\n- **DISTKEY**: Most frequent JOIN column\n- **SORTKEY**: Most frequent filter column`, pt: `## Distribution e Sort Keys\n\n### Distribution Styles\n1. **AUTO**: Redshift escolhe (recomendado para começar)\n2. **EVEN**: Distribui linhas uniformemente\n3. **KEY**: Por valor de coluna (bom para JOINs)\n4. **ALL**: Copia tabela para todos os nós (tabelas pequenas)\n\n### Sort Keys\n1. **COMPOUND**: Múltiplas colunas, ordem importa\n2. **INTERLEAVED**: Múltiplas colunas, ordem não importa (deprecated)\n\n### Exemplo otimizado\n\`\`\`sql\nCREATE TABLE sales (\n  sale_id BIGINT,\n  customer_id INT,\n  sale_date DATE,\n  amount DECIMAL(10,2)\n)\nDISTKEY(customer_id)  -- JOIN frequente com customers\nSORTKEY(sale_date);   -- Filtro frequente por data\n\`\`\`\n\n### Quando usar o quê\n- **DISTKEY**: Coluna de JOIN mais frequente\n- **SORTKEY**: Coluna de filtro mais frequente` }, practicalTips: [{ es: '📊 Analiza tus queries más frecuentes antes de elegir keys', en: '📊 Analyze your most frequent queries before choosing keys', pt: '📊 Analise suas queries mais frequentes antes de escolher keys' }], externalLinks: [{ title: 'Table Design Best Practices', url: 'https://docs.aws.amazon.com/redshift/latest/dg/c_best-practices-best-dist-key.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Creaste tablas con DISTKEY y SORTKEY apropiados?', en: '✅ Did you create tables with appropriate DISTKEY and SORTKEY?', pt: '✅ Você criou tabelas com DISTKEY e SORTKEY apropriados?' }, xpReward: 70, estimatedMinutes: 45, services: ['Redshift'] },
  
  { id: 'aws-6-5', stepNumber: 50, title: { es: 'Redshift Spectrum', en: 'Redshift Spectrum', pt: 'Redshift Spectrum' }, description: { es: 'Consultar datos en S3 directamente desde Redshift.', en: 'Query data in S3 directly from Redshift.', pt: 'Consultar dados no S3 diretamente do Redshift.' }, theory: { es: `## Redshift Spectrum - Data Lakehouse\n\n### ¿Qué es?\nExtensión que permite ejecutar queries sobre S3 desde Redshift, combinando datos del warehouse con el data lake.\n\n### Crear external schema\n\`\`\`sql\nCREATE EXTERNAL SCHEMA spectrum_schema\nFROM DATA CATALOG\nDATABASE 'glue_database'\nIAM_ROLE 'arn:aws:iam::123:role/SpectrumRole'\nREGION 'us-east-1';\n\`\`\`\n\n### Query combinada\n\`\`\`sql\n-- Tabla interna + S3 via Spectrum\nSELECT \n  r.customer_name,\n  SUM(s.amount) as total\nFROM redshift_schema.customers r\nJOIN spectrum_schema.sales_history s ON r.id = s.customer_id\nGROUP BY r.customer_name;\n\`\`\`\n\n### Pricing\n- $5 por TB escaneado en S3 (igual que Athena)`, en: `## Redshift Spectrum - Data Lakehouse\n\n### What is it?\nExtension that allows running queries on S3 from Redshift, combining warehouse data with data lake.\n\n### Create external schema\n\`\`\`sql\nCREATE EXTERNAL SCHEMA spectrum_schema\nFROM DATA CATALOG\nDATABASE 'glue_database'\nIAM_ROLE 'arn:aws:iam::123:role/SpectrumRole'\nREGION 'us-east-1';\n\`\`\`\n\n### Combined query\n\`\`\`sql\n-- Internal table + S3 via Spectrum\nSELECT \n  r.customer_name,\n  SUM(s.amount) as total\nFROM redshift_schema.customers r\nJOIN spectrum_schema.sales_history s ON r.id = s.customer_id\nGROUP BY r.customer_name;\n\`\`\`\n\n### Pricing\n- $5 per TB scanned in S3 (same as Athena)`, pt: `## Redshift Spectrum - Data Lakehouse\n\n### O que é?\nExtensão que permite executar queries sobre S3 do Redshift, combinando dados do warehouse com o data lake.\n\n### Criar external schema\n\`\`\`sql\nCREATE EXTERNAL SCHEMA spectrum_schema\nFROM DATA CATALOG\nDATABASE 'glue_database'\nIAM_ROLE 'arn:aws:iam::123:role/SpectrumRole'\nREGION 'us-east-1';\n\`\`\`\n\n### Query combinada\n\`\`\`sql\n-- Tabela interna + S3 via Spectrum\nSELECT \n  r.customer_name,\n  SUM(s.amount) as total\nFROM redshift_schema.customers r\nJOIN spectrum_schema.sales_history s ON r.id = s.customer_id\nGROUP BY r.customer_name;\n\`\`\`\n\n### Pricing\n- $5 por TB escaneado no S3 (igual ao Athena)` }, practicalTips: [{ es: '🏠 Spectrum es ideal para Data Lakehouse - datos calientes en Redshift, históricos en S3', en: '🏠 Spectrum is ideal for Data Lakehouse - hot data in Redshift, historical in S3', pt: '🏠 Spectrum é ideal para Data Lakehouse - dados quentes no Redshift, históricos no S3' }], externalLinks: [{ title: 'Redshift Spectrum', url: 'https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Configuraste Spectrum y consultaste datos de S3?', en: '✅ Did you configure Spectrum and query S3 data?', pt: '✅ Você configurou Spectrum e consultou dados do S3?' }, xpReward: 65, estimatedMinutes: 40, services: ['Redshift', 'Glue Data Catalog'] },
  
  { id: 'aws-6-6', stepNumber: 51, title: { es: 'UNLOAD: Exportar datos a S3', en: 'UNLOAD: Export data to S3', pt: 'UNLOAD: Exportar dados para S3' }, description: { es: 'Exportar resultados de queries a S3.', en: 'Export query results to S3.', pt: 'Exportar resultados de queries para S3.' }, theory: { es: `## UNLOAD - Exportar a S3\n\n### Sintaxis básica\n\`\`\`sql\nUNLOAD ('SELECT * FROM sales WHERE year = 2024')\nTO 's3://bucket/exports/sales_2024_'\nIAM_ROLE 'arn:aws:iam::123:role/RedshiftRole'\nPARQUET\nPARTITION BY (region)\nALLOWOVERWRITE;\n\`\`\`\n\n### Opciones útiles\n- **PARQUET/CSV**: Formato de output\n- **PARTITION BY**: Particionar output\n- **PARALLEL ON/OFF**: Control de paralelismo\n- **HEADER**: Incluir headers (CSV)\n- **GZIP**: Comprimir output`, en: `## UNLOAD - Export to S3\n\n### Basic syntax\n\`\`\`sql\nUNLOAD ('SELECT * FROM sales WHERE year = 2024')\nTO 's3://bucket/exports/sales_2024_'\nIAM_ROLE 'arn:aws:iam::123:role/RedshiftRole'\nPARQUET\nPARTITION BY (region)\nALLOWOVERWRITE;\n\`\`\`\n\n### Useful options\n- **PARQUET/CSV**: Output format\n- **PARTITION BY**: Partition output\n- **PARALLEL ON/OFF**: Parallelism control\n- **HEADER**: Include headers (CSV)\n- **GZIP**: Compress output`, pt: `## UNLOAD - Exportar para S3\n\n### Sintaxe básica\n\`\`\`sql\nUNLOAD ('SELECT * FROM sales WHERE year = 2024')\nTO 's3://bucket/exports/sales_2024_'\nIAM_ROLE 'arn:aws:iam::123:role/RedshiftRole'\nPARQUET\nPARTITION BY (region)\nALLOWOVERWRITE;\n\`\`\`\n\n### Opções úteis\n- **PARQUET/CSV**: Formato de output\n- **PARTITION BY**: Particionar output\n- **PARALLEL ON/OFF**: Controle de paralelismo\n- **HEADER**: Incluir headers (CSV)\n- **GZIP**: Comprimir output` }, practicalTips: [{ es: '📤 UNLOAD es más eficiente que SELECT INTO S3 para grandes volúmenes', en: '📤 UNLOAD is more efficient than SELECT INTO S3 for large volumes', pt: '📤 UNLOAD é mais eficiente que SELECT INTO S3 para grandes volumes' }], externalLinks: [{ title: 'UNLOAD Reference', url: 'https://docs.aws.amazon.com/redshift/latest/dg/r_UNLOAD.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Exportaste datos de Redshift a S3 con UNLOAD?', en: '✅ Did you export data from Redshift to S3 with UNLOAD?', pt: '✅ Você exportou dados do Redshift para S3 com UNLOAD?' }, xpReward: 50, estimatedMinutes: 25, services: ['Redshift', 'S3'] },
  
  { id: 'aws-6-7', stepNumber: 52, title: { es: 'VACUUM y ANALYZE', en: 'VACUUM and ANALYZE', pt: 'VACUUM e ANALYZE' }, description: { es: 'Mantenimiento de tablas para performance óptima.', en: 'Table maintenance for optimal performance.', pt: 'Manutenção de tabelas para performance ótima.' }, theory: { es: `## Mantenimiento de Tablas\n\n### VACUUM\nRecupera espacio de filas eliminadas y reordena datos:\n\`\`\`sql\n-- VACUUM completo\nVACUUM FULL sales;\n\n-- Solo ordenar\nVACUUM SORT ONLY sales;\n\n-- Solo recuperar espacio\nVACUUM DELETE ONLY sales;\n\`\`\`\n\n### ANALYZE\nActualiza estadísticas para el query planner:\n\`\`\`sql\nANALYZE sales;\nANALYZE PREDICATE COLUMNS sales;  -- Solo columnas usadas en predicados\n\`\`\`\n\n### Auto-mantenimiento\nRedshift hace VACUUM y ANALYZE automáticamente, pero puedes forzarlos después de cargas grandes.`, en: `## Table Maintenance\n\n### VACUUM\nRecovers space from deleted rows and reorders data:\n\`\`\`sql\n-- Full VACUUM\nVACUUM FULL sales;\n\n-- Sort only\nVACUUM SORT ONLY sales;\n\n-- Delete only\nVACUUM DELETE ONLY sales;\n\`\`\`\n\n### ANALYZE\nUpdates statistics for query planner:\n\`\`\`sql\nANALYZE sales;\nANALYZE PREDICATE COLUMNS sales;  -- Only columns used in predicates\n\`\`\`\n\n### Auto-maintenance\nRedshift does VACUUM and ANALYZE automatically, but you can force them after large loads.`, pt: `## Manutenção de Tabelas\n\n### VACUUM\nRecupera espaço de linhas deletadas e reordena dados:\n\`\`\`sql\n-- VACUUM completo\nVACUUM FULL sales;\n\n-- Só ordenar\nVACUUM SORT ONLY sales;\n\n-- Só recuperar espaço\nVACUUM DELETE ONLY sales;\n\`\`\`\n\n### ANALYZE\nAtualiza estatísticas para o query planner:\n\`\`\`sql\nANALYZE sales;\nANALYZE PREDICATE COLUMNS sales;  -- Só colunas usadas em predicados\n\`\`\`\n\n### Auto-manutenção\nRedshift faz VACUUM e ANALYZE automaticamente, mas você pode forçá-los após cargas grandes.` }, practicalTips: [{ es: '🔧 Ejecuta VACUUM después de cargas grandes de datos', en: '🔧 Run VACUUM after large data loads', pt: '🔧 Execute VACUUM após cargas grandes de dados' }], externalLinks: [{ title: 'VACUUM Command', url: 'https://docs.aws.amazon.com/redshift/latest/dg/r_VACUUM_command.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Ejecutaste VACUUM y ANALYZE en una tabla?', en: '✅ Did you run VACUUM and ANALYZE on a table?', pt: '✅ Você executou VACUUM e ANALYZE em uma tabela?' }, xpReward: 45, estimatedMinutes: 25, services: ['Redshift'] },
  
  { id: 'aws-6-8', stepNumber: 53, title: { es: 'Query Performance y Workload Management', en: 'Query Performance and Workload Management', pt: 'Query Performance e Workload Management' }, description: { es: 'Diagnosticar y optimizar performance de queries.', en: 'Diagnose and optimize query performance.', pt: 'Diagnosticar e otimizar performance de queries.' }, theory: { es: `## Query Performance\n\n### Herramientas de diagnóstico\n\`\`\`sql\n-- Ver plan de ejecución\nEXPLAIN SELECT * FROM sales WHERE date > '2024-01-01';\n\n-- Ver queries lentas\nSELECT * FROM STL_QUERY\nWHERE elapsed > 60000000 -- más de 60 segundos\nORDER BY elapsed DESC;\n\n-- Ver locks\nSELECT * FROM SVV_TRANSACTIONS WHERE lockable_object_type = 'relation';\n\`\`\`\n\n### WLM (Workload Management)\nConfigura colas con diferentes prioridades:\n\`\`\`yaml\nQueues:\n  - Name: ETL\n    Memory: 40%\n    Concurrency: 5\n    User Groups: [etl_users]\n  - Name: BI\n    Memory: 50%\n    Concurrency: 15\n    User Groups: [analysts]\n  - Name: Default\n    Memory: 10%\n    Concurrency: 5\n\`\`\``, en: `## Query Performance\n\n### Diagnostic tools\n\`\`\`sql\n-- View execution plan\nEXPLAIN SELECT * FROM sales WHERE date > '2024-01-01';\n\n-- View slow queries\nSELECT * FROM STL_QUERY\nWHERE elapsed > 60000000 -- more than 60 seconds\nORDER BY elapsed DESC;\n\n-- View locks\nSELECT * FROM SVV_TRANSACTIONS WHERE lockable_object_type = 'relation';\n\`\`\`\n\n### WLM (Workload Management)\nConfigure queues with different priorities:\n\`\`\`yaml\nQueues:\n  - Name: ETL\n    Memory: 40%\n    Concurrency: 5\n    User Groups: [etl_users]\n  - Name: BI\n    Memory: 50%\n    Concurrency: 15\n    User Groups: [analysts]\n  - Name: Default\n    Memory: 10%\n    Concurrency: 5\n\`\`\``, pt: `## Query Performance\n\n### Ferramentas de diagnóstico\n\`\`\`sql\n-- Ver plano de execução\nEXPLAIN SELECT * FROM sales WHERE date > '2024-01-01';\n\n-- Ver queries lentas\nSELECT * FROM STL_QUERY\nWHERE elapsed > 60000000 -- mais de 60 segundos\nORDER BY elapsed DESC;\n\n-- Ver locks\nSELECT * FROM SVV_TRANSACTIONS WHERE lockable_object_type = 'relation';\n\`\`\`\n\n### WLM (Workload Management)\nConfigure filas com diferentes prioridades:\n\`\`\`yaml\nQueues:\n  - Name: ETL\n    Memory: 40%\n    Concurrency: 5\n    User Groups: [etl_users]\n  - Name: BI\n    Memory: 50%\n    Concurrency: 15\n    User Groups: [analysts]\n  - Name: Default\n    Memory: 10%\n    Concurrency: 5\n\`\`\`` }, practicalTips: [{ es: '📈 Usa STL_QUERY y STL_QUERYTEXT para analizar queries problemáticas', en: '📈 Use STL_QUERY and STL_QUERYTEXT to analyze problematic queries', pt: '📈 Use STL_QUERY e STL_QUERYTEXT para analisar queries problemáticas' }], externalLinks: [{ title: 'Query Performance Tuning', url: 'https://docs.aws.amazon.com/redshift/latest/dg/c-optimizing-query-performance.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Usaste EXPLAIN para analizar un query?', en: '✅ Did you use EXPLAIN to analyze a query?', pt: '✅ Você usou EXPLAIN para analisar uma query?' }, xpReward: 60, estimatedMinutes: 40, services: ['Redshift'] },
  
  { id: 'aws-6-9', stepNumber: 54, title: { es: 'Redshift Data Sharing y ML', en: 'Redshift Data Sharing and ML', pt: 'Redshift Data Sharing e ML' }, description: { es: 'Compartir datos entre clusters y usar ML integrado.', en: 'Share data between clusters and use integrated ML.', pt: 'Compartilhar dados entre clusters e usar ML integrado.' }, theory: { es: `## Funcionalidades Avanzadas\n\n### Data Sharing\nComparte datos entre clusters sin copiarlos:\n\`\`\`sql\n-- Productor: crear datashare\nCREATE DATASHARE sales_share;\nALTER DATASHARE sales_share ADD SCHEMA public;\nALTER DATASHARE sales_share ADD TABLE public.sales;\nGRANT USAGE ON DATASHARE sales_share TO NAMESPACE 'consumer-namespace-id';\n\n-- Consumidor: usar datashare\nCREATE DATABASE sales_db FROM DATASHARE sales_share OF NAMESPACE 'producer-namespace-id';\n\`\`\`\n\n### Redshift ML\n\`\`\`sql\nCREATE MODEL churn_model\nFROM (\n  SELECT features, churned FROM training_data\n)\nTARGET churned\nFUNCTION predict_churn\nIAM_ROLE 'arn:aws:iam::123:role/RedshiftMLRole'\nAUTO ON;\n\n-- Usar modelo\nSELECT customer_id, predict_churn(features) as will_churn\nFROM customers;\n\`\`\``, en: `## Advanced Features\n\n### Data Sharing\nShare data between clusters without copying:\n\`\`\`sql\n-- Producer: create datashare\nCREATE DATASHARE sales_share;\nALTER DATASHARE sales_share ADD SCHEMA public;\nALTER DATASHARE sales_share ADD TABLE public.sales;\nGRANT USAGE ON DATASHARE sales_share TO NAMESPACE 'consumer-namespace-id';\n\n-- Consumer: use datashare\nCREATE DATABASE sales_db FROM DATASHARE sales_share OF NAMESPACE 'producer-namespace-id';\n\`\`\`\n\n### Redshift ML\n\`\`\`sql\nCREATE MODEL churn_model\nFROM (\n  SELECT features, churned FROM training_data\n)\nTARGET churned\nFUNCTION predict_churn\nIAM_ROLE 'arn:aws:iam::123:role/RedshiftMLRole'\nAUTO ON;\n\n-- Use model\nSELECT customer_id, predict_churn(features) as will_churn\nFROM customers;\n\`\`\``, pt: `## Funcionalidades Avançadas\n\n### Data Sharing\nCompartilha dados entre clusters sem copiar:\n\`\`\`sql\n-- Produtor: criar datashare\nCREATE DATASHARE sales_share;\nALTER DATASHARE sales_share ADD SCHEMA public;\nALTER DATASHARE sales_share ADD TABLE public.sales;\nGRANT USAGE ON DATASHARE sales_share TO NAMESPACE 'consumer-namespace-id';\n\n-- Consumidor: usar datashare\nCREATE DATABASE sales_db FROM DATASHARE sales_share OF NAMESPACE 'producer-namespace-id';\n\`\`\`\n\n### Redshift ML\n\`\`\`sql\nCREATE MODEL churn_model\nFROM (\n  SELECT features, churned FROM training_data\n)\nTARGET churned\nFUNCTION predict_churn\nIAM_ROLE 'arn:aws:iam::123:role/RedshiftMLRole'\nAUTO ON;\n\n-- Usar modelo\nSELECT customer_id, predict_churn(features) as will_churn\nFROM customers;\n\`\`\`` }, practicalTips: [{ es: '🤝 Data Sharing es clave para arquitecturas multi-cluster y data mesh', en: '🤝 Data Sharing is key for multi-cluster and data mesh architectures', pt: '🤝 Data Sharing é chave para arquiteturas multi-cluster e data mesh' }], externalLinks: [{ title: 'Redshift Data Sharing', url: 'https://docs.aws.amazon.com/redshift/latest/dg/datashare-overview.html', type: 'aws_docs' }], checkpoint: { es: '✅ ¿Entiendes cómo funciona Data Sharing entre clusters?', en: '✅ Do you understand how Data Sharing works between clusters?', pt: '✅ Você entende como funciona Data Sharing entre clusters?' }, xpReward: 55, estimatedMinutes: 35, services: ['Redshift'] }
];








