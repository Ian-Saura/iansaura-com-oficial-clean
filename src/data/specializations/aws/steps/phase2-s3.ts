/**
 * FASE 2: AMAZON S3 - EL CORAZÓN DEL DATA LAKE
 * 10 pasos detallados para dominar S3
 */

import { AWSStep } from '../types';

export const phase2Steps: AWSStep[] = [
  {
    id: 'aws-2-1',
    stepNumber: 10,
    title: {
      es: 'Fundamentos de Amazon S3',
      en: 'Amazon S3 Fundamentals',
      pt: 'Fundamentos do Amazon S3'
    },
    description: {
      es: 'Entender qué es S3, sus conceptos clave (buckets, objects, keys) y por qué es el corazón del Data Lake.',
      en: 'Understand what S3 is, its key concepts (buckets, objects, keys) and why it\'s the heart of the Data Lake.',
      pt: 'Entender o que é S3, seus conceitos-chave (buckets, objects, keys) e por que é o coração do Data Lake.'
    },
    theory: {
      es: `## Amazon S3 - Simple Storage Service

### ¿Qué es S3?
S3 es el servicio de almacenamiento de objetos de AWS. Imagina un sistema de archivos infinito, altamente disponible (99.999999999% durabilidad - "11 nines") y accesible desde cualquier parte del mundo.

### Conceptos clave
- **Bucket**: Contenedor de nivel superior (como una carpeta raíz). Nombre único globalmente.
- **Object**: Cualquier archivo almacenado (hasta 5TB por objeto)
- **Key**: La ruta completa del objeto dentro del bucket (ej: \`raw/2024/01/15/data.parquet\`)
- **Metadata**: Datos sobre el objeto (content-type, custom tags, etc.)

### ¿Por qué S3 para Data Lakes?
1. **Escalabilidad infinita**: Sin límite de almacenamiento
2. **Durabilidad extrema**: 11 nines = prácticamente imposible perder datos
3. **Costo bajo**: ~$0.023/GB/mes en Standard
4. **Integración nativa**: Glue, Athena, EMR, Redshift Spectrum leen directamente
5. **Separación compute-storage**: El paradigma moderno de Data Engineering

### Modelo de consistencia (actualizado 2020)
S3 ahora ofrece **strong consistency** para todas las operaciones. Antes de 2020 era eventual consistency, lo que causaba problemas en pipelines.

### Pricing S3 Standard
- Storage: $0.023/GB/mes (primeros 50TB)
- PUT/POST: $0.005 por 1000 requests
- GET: $0.0004 por 1000 requests
- Data Transfer OUT: $0.09/GB (hacia internet)`,
      en: `## Amazon S3 - Simple Storage Service

### What is S3?
S3 is AWS's object storage service. Think of it as an infinite file system, highly available (99.999999999% durability - "11 nines") and accessible from anywhere in the world.

### Key concepts
- **Bucket**: Top-level container (like a root folder). Globally unique name.
- **Object**: Any stored file (up to 5TB per object)
- **Key**: The complete path of the object within the bucket (e.g., \`raw/2024/01/15/data.parquet\`)
- **Metadata**: Data about the object (content-type, custom tags, etc.)

### Why S3 for Data Lakes?
1. **Infinite scalability**: No storage limit
2. **Extreme durability**: 11 nines = practically impossible to lose data
3. **Low cost**: ~$0.023/GB/month in Standard
4. **Native integration**: Glue, Athena, EMR, Redshift Spectrum read directly
5. **Compute-storage separation**: The modern Data Engineering paradigm

### Consistency model (updated 2020)
S3 now offers **strong consistency** for all operations. Before 2020 it was eventual consistency, which caused problems in pipelines.

### S3 Standard Pricing
- Storage: $0.023/GB/month (first 50TB)
- PUT/POST: $0.005 per 1000 requests
- GET: $0.0004 per 1000 requests
- Data Transfer OUT: $0.09/GB (to internet)`,
      pt: `## Amazon S3 - Simple Storage Service

### O que é S3?
S3 é o serviço de armazenamento de objetos da AWS. Pense nele como um sistema de arquivos infinito, altamente disponível (99.999999999% durabilidade - "11 nines") e acessível de qualquer lugar do mundo.

### Conceitos-chave
- **Bucket**: Container de nível superior (como uma pasta raiz). Nome único globalmente.
- **Object**: Qualquer arquivo armazenado (até 5TB por objeto)
- **Key**: O caminho completo do objeto dentro do bucket (ex: \`raw/2024/01/15/data.parquet\`)
- **Metadata**: Dados sobre o objeto (content-type, custom tags, etc.)

### Por que S3 para Data Lakes?
1. **Escalabilidade infinita**: Sem limite de armazenamento
2. **Durabilidade extrema**: 11 nines = praticamente impossível perder dados
3. **Custo baixo**: ~$0.023/GB/mês em Standard
4. **Integração nativa**: Glue, Athena, EMR, Redshift Spectrum leem diretamente
5. **Separação compute-storage**: O paradigma moderno de Data Engineering

### Modelo de consistência (atualizado 2020)
S3 agora oferece **strong consistency** para todas as operações. Antes de 2020 era eventual consistency, o que causava problemas em pipelines.

### Pricing S3 Standard
- Storage: $0.023/GB/mês (primeiros 50TB)
- PUT/POST: $0.005 por 1000 requests
- GET: $0.0004 por 1000 requests
- Data Transfer OUT: $0.09/GB (para internet)`
    },
    practicalTips: [
      { es: '🪣 Nombra buckets con prefijo único (ej: empresa-proyecto-env-region)', en: '🪣 Name buckets with unique prefix (e.g., company-project-env-region)', pt: '🪣 Nomeie buckets com prefixo único (ex: empresa-projeto-env-region)' },
      { es: '📁 S3 NO tiene carpetas reales - las "carpetas" son solo prefijos en el key', en: '📁 S3 does NOT have real folders - "folders" are just prefixes in the key', pt: '📁 S3 NÃO tem pastas reais - as "pastas" são apenas prefixos na key' },
      { es: '💰 El costo principal suele ser Data Transfer OUT, no el storage', en: '💰 The main cost is usually Data Transfer OUT, not storage', pt: '💰 O custo principal costuma ser Data Transfer OUT, não o storage' }
    ],
    externalLinks: [
      { title: 'Amazon S3 User Guide', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html', type: 'aws_docs' },
      { title: 'S3 Pricing', url: 'https://aws.amazon.com/s3/pricing/', type: 'aws_docs' },
      { title: 'S3 FAQs', url: 'https://aws.amazon.com/s3/faqs/', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Puedes explicar la diferencia entre bucket, object y key?', en: '✅ Can you explain the difference between bucket, object and key?', pt: '✅ Você consegue explicar a diferença entre bucket, object e key?' },
    xpReward: 50,
    estimatedMinutes: 30,
    services: ['S3']
  },

  {
    id: 'aws-2-2',
    stepNumber: 11,
    title: {
      es: 'Crear y configurar tu primer bucket S3',
      en: 'Create and configure your first S3 bucket',
      pt: 'Criar e configurar seu primeiro bucket S3'
    },
    description: {
      es: 'Crear un bucket S3 con las configuraciones correctas de seguridad y mejores prácticas.',
      en: 'Create an S3 bucket with correct security settings and best practices.',
      pt: 'Criar um bucket S3 com as configurações corretas de segurança e melhores práticas.'
    },
    theory: {
      es: `## Crear tu Primer Bucket S3

### Reglas de naming para buckets
- 3-63 caracteres, solo minúsculas, números y guiones
- Debe empezar con letra o número
- NO puede ser formato IP (192.168.1.1)
- Único GLOBALMENTE en todo AWS

### Configuraciones importantes
1. **Block Public Access**: SIEMPRE activado por defecto
2. **Versioning**: Recomendado para datos importantes
3. **Encryption**: SSE-S3 (gratis) o SSE-KMS (más control)
4. **Tags**: Para tracking de costos

### Convención de nombres recomendada
\`\`\`
{empresa}-{proyecto}-{ambiente}-{region}-{uso}

Ejemplos:
- miempresa-datalake-prod-useast1-raw
- miempresa-datalake-dev-useast1-processed
- miempresa-analytics-prod-useast1-exports
\`\`\`

### Block Public Access Settings
Estas son 4 configuraciones que BLOQUEAN acceso público:
1. BlockPublicAcls
2. IgnorePublicAcls
3. BlockPublicPolicy
4. RestrictPublicBuckets

Para un Data Lake, las 4 deben estar ACTIVADAS.`,
      en: `## Create Your First S3 Bucket

### Bucket naming rules
- 3-63 characters, lowercase only, numbers and hyphens
- Must start with letter or number
- CANNOT be IP format (192.168.1.1)
- GLOBALLY unique across all AWS

### Important configurations
1. **Block Public Access**: ALWAYS enabled by default
2. **Versioning**: Recommended for important data
3. **Encryption**: SSE-S3 (free) or SSE-KMS (more control)
4. **Tags**: For cost tracking

### Recommended naming convention
\`\`\`
{company}-{project}-{environment}-{region}-{use}

Examples:
- mycompany-datalake-prod-useast1-raw
- mycompany-datalake-dev-useast1-processed
- mycompany-analytics-prod-useast1-exports
\`\`\`

### Block Public Access Settings
These are 4 settings that BLOCK public access:
1. BlockPublicAcls
2. IgnorePublicAcls
3. BlockPublicPolicy
4. RestrictPublicBuckets

For a Data Lake, all 4 should be ENABLED.`,
      pt: `## Criar Seu Primeiro Bucket S3

### Regras de naming para buckets
- 3-63 caracteres, apenas minúsculas, números e hífens
- Deve começar com letra ou número
- NÃO pode ser formato IP (192.168.1.1)
- Único GLOBALMENTE em toda AWS

### Configurações importantes
1. **Block Public Access**: SEMPRE ativado por padrão
2. **Versioning**: Recomendado para dados importantes
3. **Encryption**: SSE-S3 (grátis) ou SSE-KMS (mais controle)
4. **Tags**: Para tracking de custos

### Convenção de nomes recomendada
\`\`\`
{empresa}-{projeto}-{ambiente}-{region}-{uso}

Exemplos:
- minhaempresa-datalake-prod-useast1-raw
- minhaempresa-datalake-dev-useast1-processed
- minhaempresa-analytics-prod-useast1-exports
\`\`\`

### Block Public Access Settings
Estas são 4 configurações que BLOQUEIAM acesso público:
1. BlockPublicAcls
2. IgnorePublicAcls
3. BlockPublicPolicy
4. RestrictPublicBuckets

Para um Data Lake, as 4 devem estar ATIVADAS.`
    },
    codeExample: {
      language: 'bash',
      code: `# Crear bucket con AWS CLI
aws s3 mb s3://tunombre-datalake-learning-useast1 --region us-east-1

# Verificar que se creó
aws s3 ls

# Subir un archivo de prueba
echo "Hello S3!" > test.txt
aws s3 cp test.txt s3://tunombre-datalake-learning-useast1/test/

# Ver contenido del bucket
aws s3 ls s3://tunombre-datalake-learning-useast1/ --recursive

# Descargar el archivo
aws s3 cp s3://tunombre-datalake-learning-useast1/test/test.txt downloaded.txt

# Eliminar el archivo
aws s3 rm s3://tunombre-datalake-learning-useast1/test/test.txt`,
      explanation: { es: 'Comandos básicos para crear bucket y gestionar objetos', en: 'Basic commands to create bucket and manage objects', pt: 'Comandos básicos para criar bucket e gerenciar objetos' }
    },
    practicalTips: [
      { es: '🔒 NUNCA desactives Block Public Access a menos que sea absolutamente necesario', en: '🔒 NEVER disable Block Public Access unless absolutely necessary', pt: '🔒 NUNCA desative Block Public Access a menos que seja absolutamente necessário' },
      { es: '🏷️ Siempre usa tags: Environment, Project, Owner como mínimo', en: '🏷️ Always use tags: Environment, Project, Owner as minimum', pt: '🏷️ Sempre use tags: Environment, Project, Owner como mínimo' }
    ],
    externalLinks: [
      { title: 'Creating S3 Bucket', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un bucket, subiste un archivo y lo descargaste con CLI?', en: '✅ Did you create a bucket, upload a file and download it with CLI?', pt: '✅ Você criou um bucket, fez upload de um arquivo e baixou com CLI?' },
    xpReward: 60,
    estimatedMinutes: 25,
    services: ['S3']
  },

  {
    id: 'aws-2-3',
    stepNumber: 12,
    title: {
      es: 'Storage Classes y Lifecycle Policies',
      en: 'Storage Classes and Lifecycle Policies',
      pt: 'Storage Classes e Lifecycle Policies'
    },
    description: {
      es: 'Entender las diferentes clases de almacenamiento y cómo automatizar el movimiento de datos para optimizar costos.',
      en: 'Understand different storage classes and how to automate data movement to optimize costs.',
      pt: 'Entender as diferentes classes de armazenamento e como automatizar o movimento de dados para otimizar custos.'
    },
    theory: {
      es: `## Storage Classes en S3

### Clases disponibles (2024)
| Clase | Uso | Costo Storage | Costo Retrieval |
|-------|-----|---------------|-----------------|
| **Standard** | Acceso frecuente | $0.023/GB | Gratis |
| **Intelligent-Tiering** | Patrones desconocidos | $0.0025/1000 obj | Auto |
| **Standard-IA** | Acceso infrecuente (>30 días) | $0.0125/GB | $0.01/GB |
| **One Zone-IA** | IA + single AZ | $0.01/GB | $0.01/GB |
| **Glacier Instant** | Archivado con acceso inmediato | $0.004/GB | $0.03/GB |
| **Glacier Flexible** | Archivado (mins-12h retrieval) | $0.0036/GB | $0.03/GB |
| **Glacier Deep Archive** | Archivado largo plazo (12-48h) | $0.00099/GB | $0.02/GB |

### Lifecycle Policies - Automatiza el ahorro
Reglas automáticas para mover/eliminar objetos:
\`\`\`yaml
# Ejemplo: Datos de logs
- Días 0-30: Standard (acceso activo)
- Días 30-90: Standard-IA (reportes mensuales)
- Días 90-365: Glacier Flexible (compliance)
- Día 365+: Delete (ya no necesario)
\`\`\`

### Para Data Lakes típicos
- **raw/**: Standard → Glacier Flexible (90 días)
- **processed/**: Standard → Standard-IA (30 días)
- **serving/**: Standard (acceso frecuente)
- **temp/**: Delete después de 7 días`,
      en: `## Storage Classes in S3

### Available classes (2024)
| Class | Use | Storage Cost | Retrieval Cost |
|-------|-----|---------------|-----------------|
| **Standard** | Frequent access | $0.023/GB | Free |
| **Intelligent-Tiering** | Unknown patterns | $0.0025/1000 obj | Auto |
| **Standard-IA** | Infrequent access (>30 days) | $0.0125/GB | $0.01/GB |
| **One Zone-IA** | IA + single AZ | $0.01/GB | $0.01/GB |
| **Glacier Instant** | Archive with instant access | $0.004/GB | $0.03/GB |
| **Glacier Flexible** | Archive (mins-12h retrieval) | $0.0036/GB | $0.03/GB |
| **Glacier Deep Archive** | Long-term archive (12-48h) | $0.00099/GB | $0.02/GB |

### Lifecycle Policies - Automate savings
Automatic rules to move/delete objects:
\`\`\`yaml
# Example: Log data
- Days 0-30: Standard (active access)
- Days 30-90: Standard-IA (monthly reports)
- Days 90-365: Glacier Flexible (compliance)
- Day 365+: Delete (no longer needed)
\`\`\`

### For typical Data Lakes
- **raw/**: Standard → Glacier Flexible (90 days)
- **processed/**: Standard → Standard-IA (30 days)
- **serving/**: Standard (frequent access)
- **temp/**: Delete after 7 days`,
      pt: `## Storage Classes no S3

### Classes disponíveis (2024)
| Classe | Uso | Custo Storage | Custo Retrieval |
|-------|-----|---------------|-----------------|
| **Standard** | Acesso frequente | $0.023/GB | Grátis |
| **Intelligent-Tiering** | Padrões desconhecidos | $0.0025/1000 obj | Auto |
| **Standard-IA** | Acesso infrequente (>30 dias) | $0.0125/GB | $0.01/GB |
| **One Zone-IA** | IA + single AZ | $0.01/GB | $0.01/GB |
| **Glacier Instant** | Arquivamento com acesso imediato | $0.004/GB | $0.03/GB |
| **Glacier Flexible** | Arquivamento (mins-12h retrieval) | $0.0036/GB | $0.03/GB |
| **Glacier Deep Archive** | Arquivamento longo prazo (12-48h) | $0.00099/GB | $0.02/GB |

### Lifecycle Policies - Automatize economia
Regras automáticas para mover/deletar objetos:
\`\`\`yaml
# Exemplo: Dados de logs
- Dias 0-30: Standard (acesso ativo)
- Dias 30-90: Standard-IA (relatórios mensais)
- Dias 90-365: Glacier Flexible (compliance)
- Dia 365+: Delete (não mais necessário)
\`\`\`

### Para Data Lakes típicos
- **raw/**: Standard → Glacier Flexible (90 dias)
- **processed/**: Standard → Standard-IA (30 dias)
- **serving/**: Standard (acesso frequente)
- **temp/**: Delete após 7 dias`
    },
    practicalTips: [
      { es: '💡 Intelligent-Tiering es perfecto cuando no conoces los patrones de acceso', en: '💡 Intelligent-Tiering is perfect when you don\'t know access patterns', pt: '💡 Intelligent-Tiering é perfeito quando não conhece os padrões de acesso' },
      { es: '⚠️ El retrieval de Glacier Deep Archive puede tardar 12-48h - planifica con anticipación', en: '⚠️ Glacier Deep Archive retrieval can take 12-48h - plan ahead', pt: '⚠️ O retrieval de Glacier Deep Archive pode levar 12-48h - planeje com antecedência' }
    ],
    externalLinks: [
      { title: 'S3 Storage Classes', url: 'https://aws.amazon.com/s3/storage-classes/', type: 'aws_docs' },
      { title: 'S3 Lifecycle Configuration', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Puedes explicar cuándo usar Standard vs IA vs Glacier?', en: '✅ Can you explain when to use Standard vs IA vs Glacier?', pt: '✅ Você consegue explicar quando usar Standard vs IA vs Glacier?' },
    xpReward: 55,
    estimatedMinutes: 30,
    services: ['S3', 'S3 Glacier']
  },

  {
    id: 'aws-2-4',
    stepNumber: 13,
    title: {
      es: 'Particionamiento de datos para Data Lakes',
      en: 'Data partitioning for Data Lakes',
      pt: 'Particionamento de dados para Data Lakes'
    },
    description: {
      es: 'Aprender estrategias de particionamiento Hive-style que optimizan queries en Athena y Spark.',
      en: 'Learn Hive-style partitioning strategies that optimize queries in Athena and Spark.',
      pt: 'Aprender estratégias de particionamento Hive-style que otimizam queries no Athena e Spark.'
    },
    theory: {
      es: `## Particionamiento en S3 - Clave para Performance

### ¿Qué es particionamiento?
Organizar datos en "carpetas" basadas en valores de columnas para que las queries solo lean los datos necesarios.

### Formato Hive-Style (estándar de la industria)
\`\`\`
s3://bucket/tabla/
  ├── year=2024/
  │   ├── month=01/
  │   │   ├── day=15/
  │   │   │   ├── data_001.parquet
  │   │   │   └── data_002.parquet
  │   │   └── day=16/
  │   └── month=02/
  └── year=2023/
\`\`\`

### Beneficios del particionamiento
1. **Partition pruning**: Athena solo escanea particiones relevantes
2. **Menor costo**: Menos datos escaneados = menor costo en Athena
3. **Mejor performance**: Menos I/O = queries más rápidas
4. **Paralelización**: Spark puede procesar particiones en paralelo

### Estrategias comunes
| Datos | Particionamiento recomendado |
|-------|------------------------------|
| Logs/Eventos | year/month/day o year/month/day/hour |
| Transacciones | year/month/day |
| Datos geográficos | country/region |
| Multi-tenant | tenant_id/year/month |

### ⚠️ Anti-patrones a evitar
- Demasiadas particiones pequeñas (< 128MB por partición)
- Particiones muy grandes (> 1GB archivos individuales)
- Particionamiento por columna de alta cardinalidad (ej: user_id)`,
      en: `## Partitioning in S3 - Key for Performance

### What is partitioning?
Organizing data in "folders" based on column values so queries only read necessary data.

### Hive-Style format (industry standard)
\`\`\`
s3://bucket/table/
  ├── year=2024/
  │   ├── month=01/
  │   │   ├── day=15/
  │   │   │   ├── data_001.parquet
  │   │   │   └── data_002.parquet
  │   │   └── day=16/
  │   └── month=02/
  └── year=2023/
\`\`\`

### Partitioning benefits
1. **Partition pruning**: Athena only scans relevant partitions
2. **Lower cost**: Less data scanned = lower cost in Athena
3. **Better performance**: Less I/O = faster queries
4. **Parallelization**: Spark can process partitions in parallel

### Common strategies
| Data | Recommended partitioning |
|-------|------------------------------|
| Logs/Events | year/month/day or year/month/day/hour |
| Transactions | year/month/day |
| Geographic data | country/region |
| Multi-tenant | tenant_id/year/month |

### ⚠️ Anti-patterns to avoid
- Too many small partitions (< 128MB per partition)
- Very large partitions (> 1GB individual files)
- Partitioning by high cardinality column (e.g., user_id)`,
      pt: `## Particionamento no S3 - Chave para Performance

### O que é particionamento?
Organizar dados em "pastas" baseadas em valores de colunas para que as queries só leiam os dados necessários.

### Formato Hive-Style (padrão da indústria)
\`\`\`
s3://bucket/tabela/
  ├── year=2024/
  │   ├── month=01/
  │   │   ├── day=15/
  │   │   │   ├── data_001.parquet
  │   │   │   └── data_002.parquet
  │   │   └── day=16/
  │   └── month=02/
  └── year=2023/
\`\`\`

### Benefícios do particionamento
1. **Partition pruning**: Athena só escaneia partições relevantes
2. **Menor custo**: Menos dados escaneados = menor custo no Athena
3. **Melhor performance**: Menos I/O = queries mais rápidas
4. **Paralelização**: Spark pode processar partições em paralelo

### Estratégias comuns
| Dados | Particionamento recomendado |
|-------|------------------------------|
| Logs/Eventos | year/month/day ou year/month/day/hour |
| Transações | year/month/day |
| Dados geográficos | country/region |
| Multi-tenant | tenant_id/year/month |

### ⚠️ Anti-padrões a evitar
- Muitas partições pequenas (< 128MB por partição)
- Partições muito grandes (> 1GB arquivos individuais)
- Particionamento por coluna de alta cardinalidade (ex: user_id)`
    },
    codeExample: {
      language: 'python',
      code: `import pandas as pd
from datetime import datetime
import pyarrow as pa
import pyarrow.parquet as pq

# Crear datos de ejemplo
df = pd.DataFrame({
    'event_id': range(1000),
    'user_id': [f'user_{i%100}' for i in range(1000)],
    'event_type': ['click', 'view', 'purchase'] * 333 + ['click'],
    'timestamp': pd.date_range('2024-01-01', periods=1000, freq='H'),
    'value': [round(i * 0.5, 2) for i in range(1000)]
})

# Añadir columnas de partición
df['year'] = df['timestamp'].dt.year
df['month'] = df['timestamp'].dt.month.astype(str).str.zfill(2)
df['day'] = df['timestamp'].dt.day.astype(str).str.zfill(2)

# Guardar con particionamiento Hive-style
# boto3 + pyarrow para subir a S3
table = pa.Table.from_pandas(df)
pq.write_to_dataset(
    table,
    root_path='s3://tu-bucket/events/',
    partition_cols=['year', 'month', 'day'],
    existing_data_behavior='overwrite_or_ignore'
)`,
      explanation: { es: 'Código Python para crear datos particionados en formato Hive-style', en: 'Python code to create Hive-style partitioned data', pt: 'Código Python para criar dados particionados no formato Hive-style' }
    },
    practicalTips: [
      { es: '📊 Objetivo: archivos de 128MB-1GB para optimal performance', en: '📊 Target: 128MB-1GB files for optimal performance', pt: '📊 Objetivo: arquivos de 128MB-1GB para performance optimal' },
      { es: '🎯 Particiona por las columnas más usadas en filtros WHERE', en: '🎯 Partition by columns most used in WHERE filters', pt: '🎯 Particione pelas colunas mais usadas em filtros WHERE' }
    ],
    externalLinks: [
      { title: 'Athena Partitioning Best Practices', url: 'https://docs.aws.amazon.com/athena/latest/ug/partitions.html', type: 'aws_docs' },
      { title: 'AWS Blog - S3 Partitioning', url: 'https://aws.amazon.com/blogs/big-data/top-10-performance-tuning-tips-for-amazon-athena/', type: 'article' }
    ],
    checkpoint: { es: '✅ ¿Puedes crear una estructura de particiones Hive-style para datos de logs?', en: '✅ Can you create a Hive-style partition structure for log data?', pt: '✅ Você consegue criar uma estrutura de partições Hive-style para dados de logs?' },
    xpReward: 70,
    estimatedMinutes: 40,
    services: ['S3']
  },

  {
    id: 'aws-2-5',
    stepNumber: 14,
    title: {
      es: 'Formatos de archivo: Parquet vs JSON vs CSV',
      en: 'File formats: Parquet vs JSON vs CSV',
      pt: 'Formatos de arquivo: Parquet vs JSON vs CSV'
    },
    description: {
      es: 'Entender qué formato usar y por qué Parquet es el estándar para Data Lakes.',
      en: 'Understand which format to use and why Parquet is the standard for Data Lakes.',
      pt: 'Entender qual formato usar e por que Parquet é o padrão para Data Lakes.'
    },
    theory: {
      es: `## Formatos de Archivo para Data Lakes

### Comparación de formatos
| Formato | Tipo | Compresión | Query Speed | Uso |
|---------|------|------------|-------------|-----|
| **Parquet** | Columnar | Excelente (snappy/gzip) | Muy rápido | Standard DL |
| **ORC** | Columnar | Excelente | Muy rápido | Hive legacy |
| **Avro** | Row | Buena | Medio | Streaming, Kafka |
| **JSON** | Row | Pobre | Lento | APIs, logs |
| **CSV** | Row | Pobre | Lento | Legacy, exports |

### ¿Por qué Parquet para Data Lakes?
1. **Columnar**: Solo lee las columnas que necesitas
2. **Compresión**: 80-90% menos espacio que CSV
3. **Schema embebido**: El schema está en el archivo
4. **Soporte universal**: Spark, Athena, Redshift, Pandas lo leen
5. **Predicate pushdown**: Filtra antes de leer

### Ejemplo práctico de ahorro
\`\`\`
1GB de datos CSV:
- Athena escanea: 1GB → Costo: $0.005
- Storage: 1GB × $0.023 = $0.023/mes

Mismo dato en Parquet:
- Athena escanea: 0.1GB → Costo: $0.0005 (10x menos!)
- Storage: 0.15GB × $0.023 = $0.003/mes
\`\`\`

### Tipos de compresión
- **Snappy**: Balance velocidad/compresión (default recomendado)
- **Gzip**: Mayor compresión, más lento
- **LZ4**: Muy rápido, menos compresión
- **Zstd**: Nuevo, excelente balance`,
      en: `## File Formats for Data Lakes

### Format comparison
| Format | Type | Compression | Query Speed | Use |
|---------|------|------------|-------------|-----|
| **Parquet** | Columnar | Excellent (snappy/gzip) | Very fast | Standard DL |
| **ORC** | Columnar | Excellent | Very fast | Hive legacy |
| **Avro** | Row | Good | Medium | Streaming, Kafka |
| **JSON** | Row | Poor | Slow | APIs, logs |
| **CSV** | Row | Poor | Slow | Legacy, exports |

### Why Parquet for Data Lakes?
1. **Columnar**: Only reads columns you need
2. **Compression**: 80-90% less space than CSV
3. **Embedded schema**: Schema is in the file
4. **Universal support**: Spark, Athena, Redshift, Pandas read it
5. **Predicate pushdown**: Filters before reading

### Practical savings example
\`\`\`
1GB of CSV data:
- Athena scans: 1GB → Cost: $0.005
- Storage: 1GB × $0.023 = $0.023/month

Same data in Parquet:
- Athena scans: 0.1GB → Cost: $0.0005 (10x less!)
- Storage: 0.15GB × $0.023 = $0.003/month
\`\`\`

### Compression types
- **Snappy**: Speed/compression balance (recommended default)
- **Gzip**: Higher compression, slower
- **LZ4**: Very fast, less compression
- **Zstd**: New, excellent balance`,
      pt: `## Formatos de Arquivo para Data Lakes

### Comparação de formatos
| Formato | Tipo | Compressão | Query Speed | Uso |
|---------|------|------------|-------------|-----|
| **Parquet** | Columnar | Excelente (snappy/gzip) | Muito rápido | Standard DL |
| **ORC** | Columnar | Excelente | Muito rápido | Hive legacy |
| **Avro** | Row | Boa | Médio | Streaming, Kafka |
| **JSON** | Row | Pobre | Lento | APIs, logs |
| **CSV** | Row | Pobre | Lento | Legacy, exports |

### Por que Parquet para Data Lakes?
1. **Columnar**: Só lê as colunas que você precisa
2. **Compressão**: 80-90% menos espaço que CSV
3. **Schema embarcado**: O schema está no arquivo
4. **Suporte universal**: Spark, Athena, Redshift, Pandas leem
5. **Predicate pushdown**: Filtra antes de ler

### Exemplo prático de economia
\`\`\`
1GB de dados CSV:
- Athena escaneia: 1GB → Custo: $0.005
- Storage: 1GB × $0.023 = $0.023/mês

Mesmo dado em Parquet:
- Athena escaneia: 0.1GB → Custo: $0.0005 (10x menos!)
- Storage: 0.15GB × $0.023 = $0.003/mês
\`\`\`

### Tipos de compressão
- **Snappy**: Balanço velocidade/compressão (default recomendado)
- **Gzip**: Maior compressão, mais lento
- **LZ4**: Muito rápido, menos compressão
- **Zstd**: Novo, excelente balanço`
    },
    codeExample: {
      language: 'python',
      code: `import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

# Crear DataFrame
df = pd.DataFrame({
    'id': range(100000),
    'name': [f'User {i}' for i in range(100000)],
    'value': [i * 1.5 for i in range(100000)]
})

# Guardar como CSV
df.to_csv('data.csv', index=False)

# Guardar como Parquet con Snappy
df.to_parquet('data.parquet', compression='snappy')

# Guardar como Parquet con Gzip (más compresión)
df.to_parquet('data_gzip.parquet', compression='gzip')

# Comparar tamaños
import os
print(f"CSV: {os.path.getsize('data.csv') / 1024:.2f} KB")
print(f"Parquet Snappy: {os.path.getsize('data.parquet') / 1024:.2f} KB")
print(f"Parquet Gzip: {os.path.getsize('data_gzip.parquet') / 1024:.2f} KB")`,
      explanation: { es: 'Comparación práctica de tamaños entre CSV y Parquet', en: 'Practical size comparison between CSV and Parquet', pt: 'Comparação prática de tamanhos entre CSV e Parquet' }
    },
    practicalTips: [
      { es: '✅ Usa Parquet con Snappy para el 90% de los casos', en: '✅ Use Parquet with Snappy for 90% of cases', pt: '✅ Use Parquet com Snappy para 90% dos casos' },
      { es: '📥 Para datos que vienen como JSON/CSV, conviértelos a Parquet en la capa raw → processed', en: '📥 For data coming as JSON/CSV, convert to Parquet in raw → processed layer', pt: '📥 Para dados que vêm como JSON/CSV, converta para Parquet na camada raw → processed' }
    ],
    externalLinks: [
      { title: 'Apache Parquet', url: 'https://parquet.apache.org/docs/', type: 'docs' },
      { title: 'AWS - Optimizing Data Storage', url: 'https://docs.aws.amazon.com/athena/latest/ug/data-types.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Puedes convertir un CSV a Parquet y comparar los tamaños?', en: '✅ Can you convert a CSV to Parquet and compare sizes?', pt: '✅ Você consegue converter um CSV para Parquet e comparar os tamanhos?' },
    xpReward: 55,
    estimatedMinutes: 30,
    services: ['S3']
  },

  {
    id: 'aws-2-6',
    stepNumber: 15,
    title: {
      es: 'Versionado y replicación en S3',
      en: 'Versioning and replication in S3',
      pt: 'Versionamento e replicação no S3'
    },
    description: {
      es: 'Configurar versionado para proteger datos y replicación para disaster recovery.',
      en: 'Configure versioning to protect data and replication for disaster recovery.',
      pt: 'Configurar versionamento para proteger dados e replicação para disaster recovery.'
    },
    theory: {
      es: `## Versionado y Replicación en S3

### Versionado
Mantiene múltiples versiones del mismo objeto:
- Cada PUT crea una nueva versión
- DELETE marca como "delete marker" pero no borra
- Puedes restaurar versiones anteriores
- Importante para compliance y protección contra errores

### Estados del versionado
1. **Unversioned** (default): Sin historial
2. **Enabled**: Guarda todas las versiones
3. **Suspended**: Deja de crear versiones (las existentes persisten)

### Costos del versionado
⚠️ Cada versión cuenta como almacenamiento adicional. Usa Lifecycle policies para:
- Mover versiones antiguas a IA/Glacier
- Eliminar versiones después de X días
- Eliminar delete markers huérfanos

### Replicación
Copia automática de objetos a otro bucket:

**Same-Region Replication (SRR)**:
- Compliance (múltiples copias en misma región)
- Agregación de logs

**Cross-Region Replication (CRR)**:
- Disaster recovery
- Latencia geográfica
- Compliance multi-región

### Configuración de replicación
\`\`\`yaml
Replication Rule:
  Source: bucket-source/*
  Destination: bucket-dest-us-west-2
  IAM Role: ReplicationRole
  Options:
    - Replicate delete markers: Yes/No
    - Replica modifications sync: Yes
\`\`\``,
      en: `## Versioning and Replication in S3

### Versioning
Maintains multiple versions of the same object:
- Each PUT creates a new version
- DELETE marks as "delete marker" but doesn't delete
- You can restore previous versions
- Important for compliance and error protection

### Versioning states
1. **Unversioned** (default): No history
2. **Enabled**: Saves all versions
3. **Suspended**: Stops creating versions (existing ones persist)

### Versioning costs
⚠️ Each version counts as additional storage. Use Lifecycle policies to:
- Move old versions to IA/Glacier
- Delete versions after X days
- Delete orphan delete markers

### Replication
Automatic copy of objects to another bucket:

**Same-Region Replication (SRR)**:
- Compliance (multiple copies in same region)
- Log aggregation

**Cross-Region Replication (CRR)**:
- Disaster recovery
- Geographic latency
- Multi-region compliance

### Replication configuration
\`\`\`yaml
Replication Rule:
  Source: bucket-source/*
  Destination: bucket-dest-us-west-2
  IAM Role: ReplicationRole
  Options:
    - Replicate delete markers: Yes/No
    - Replica modifications sync: Yes
\`\`\``,
      pt: `## Versionamento e Replicação no S3

### Versionamento
Mantém múltiplas versões do mesmo objeto:
- Cada PUT cria uma nova versão
- DELETE marca como "delete marker" mas não deleta
- Você pode restaurar versões anteriores
- Importante para compliance e proteção contra erros

### Estados do versionamento
1. **Unversioned** (default): Sem histórico
2. **Enabled**: Salva todas as versões
3. **Suspended**: Para de criar versões (as existentes persistem)

### Custos do versionamento
⚠️ Cada versão conta como armazenamento adicional. Use Lifecycle policies para:
- Mover versões antigas para IA/Glacier
- Deletar versões após X dias
- Deletar delete markers órfãos

### Replicação
Cópia automática de objetos para outro bucket:

**Same-Region Replication (SRR)**:
- Compliance (múltiplas cópias na mesma região)
- Agregação de logs

**Cross-Region Replication (CRR)**:
- Disaster recovery
- Latência geográfica
- Compliance multi-região

### Configuração de replicação
\`\`\`yaml
Replication Rule:
  Source: bucket-source/*
  Destination: bucket-dest-us-west-2
  IAM Role: ReplicationRole
  Options:
    - Replicate delete markers: Yes/No
    - Replica modifications sync: Yes
\`\`\``
    },
    practicalTips: [
      { es: '🛡️ Habilita versionado en buckets de datos importantes (procesados, serving)', en: '🛡️ Enable versioning on important data buckets (processed, serving)', pt: '🛡️ Habilite versionamento em buckets de dados importantes (processados, serving)' },
      { es: '💰 Siempre combina versionado con lifecycle policies para controlar costos', en: '💰 Always combine versioning with lifecycle policies to control costs', pt: '💰 Sempre combine versionamento com lifecycle policies para controlar custos' }
    ],
    externalLinks: [
      { title: 'S3 Versioning', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html', type: 'aws_docs' },
      { title: 'S3 Replication', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Habilitaste versionado en tu bucket y probaste restaurar una versión anterior?', en: '✅ Did you enable versioning on your bucket and try restoring a previous version?', pt: '✅ Você habilitou versionamento no seu bucket e testou restaurar uma versão anterior?' },
    xpReward: 50,
    estimatedMinutes: 30,
    services: ['S3']
  },

  {
    id: 'aws-2-7',
    stepNumber: 16,
    title: {
      es: 'Encriptación y seguridad en S3',
      en: 'Encryption and security in S3',
      pt: 'Encriptação e segurança no S3'
    },
    description: {
      es: 'Implementar encriptación at-rest y in-transit, y entender bucket policies.',
      en: 'Implement at-rest and in-transit encryption, and understand bucket policies.',
      pt: 'Implementar encriptação at-rest e in-transit, e entender bucket policies.'
    },
    theory: {
      es: `## Seguridad en S3

### Encriptación At-Rest (datos almacenados)

**SSE-S3 (Server-Side Encryption with S3 keys)**:
- AWS maneja las keys automáticamente
- Sin costo adicional
- Default recomendado para la mayoría de casos

**SSE-KMS (Server-Side Encryption with KMS)**:
- Tú controlas las keys en KMS
- Audit trail de uso de keys
- Costo adicional por API calls a KMS
- Recomendado para datos sensibles

**SSE-C (Server-Side Encryption with Customer keys)**:
- Tú provees la key en cada request
- AWS no guarda la key
- Máximo control, más complejidad

### Encriptación In-Transit
SIEMPRE usa HTTPS (SSL/TLS). Puedes forzarlo con bucket policy:
\`\`\`json
{
  "Statement": [{
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": "arn:aws:s3:::bucket/*",
    "Condition": {
      "Bool": {"aws:SecureTransport": "false"}
    }
  }]
}
\`\`\`

### Bucket Policies vs IAM Policies
- **Bucket Policy**: Attached al bucket, controla quién accede
- **IAM Policy**: Attached al usuario/rol, controla qué puede hacer
- Ambas se evalúan juntas (explicit deny wins)

### Access Points
Puntos de acceso específicos para diferentes usuarios/aplicaciones con sus propias policies.`,
      en: `## Security in S3

### At-Rest Encryption (stored data)

**SSE-S3 (Server-Side Encryption with S3 keys)**:
- AWS manages keys automatically
- No additional cost
- Recommended default for most cases

**SSE-KMS (Server-Side Encryption with KMS)**:
- You control keys in KMS
- Audit trail of key usage
- Additional cost for KMS API calls
- Recommended for sensitive data

**SSE-C (Server-Side Encryption with Customer keys)**:
- You provide the key in each request
- AWS doesn't store the key
- Maximum control, more complexity

### In-Transit Encryption
ALWAYS use HTTPS (SSL/TLS). You can enforce it with bucket policy:
\`\`\`json
{
  "Statement": [{
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": "arn:aws:s3:::bucket/*",
    "Condition": {
      "Bool": {"aws:SecureTransport": "false"}
    }
  }]
}
\`\`\`

### Bucket Policies vs IAM Policies
- **Bucket Policy**: Attached to bucket, controls who accesses
- **IAM Policy**: Attached to user/role, controls what they can do
- Both are evaluated together (explicit deny wins)

### Access Points
Specific access points for different users/applications with their own policies.`,
      pt: `## Segurança no S3

### Encriptação At-Rest (dados armazenados)

**SSE-S3 (Server-Side Encryption with S3 keys)**:
- AWS gerencia as keys automaticamente
- Sem custo adicional
- Default recomendado para a maioria dos casos

**SSE-KMS (Server-Side Encryption with KMS)**:
- Você controla as keys no KMS
- Audit trail de uso das keys
- Custo adicional por API calls ao KMS
- Recomendado para dados sensíveis

**SSE-C (Server-Side Encryption with Customer keys)**:
- Você provê a key em cada request
- AWS não guarda a key
- Máximo controle, mais complexidade

### Encriptação In-Transit
SEMPRE use HTTPS (SSL/TLS). Você pode forçá-lo com bucket policy:
\`\`\`json
{
  "Statement": [{
    "Effect": "Deny",
    "Principal": "*",
    "Action": "s3:*",
    "Resource": "arn:aws:s3:::bucket/*",
    "Condition": {
      "Bool": {"aws:SecureTransport": "false"}
    }
  }]
}
\`\`\`

### Bucket Policies vs IAM Policies
- **Bucket Policy**: Attached ao bucket, controla quem acessa
- **IAM Policy**: Attached ao usuário/role, controla o que pode fazer
- Ambas são avaliadas juntas (explicit deny wins)

### Access Points
Pontos de acesso específicos para diferentes usuários/aplicações com suas próprias policies.`
    },
    practicalTips: [
      { es: '🔐 Habilita SSE-S3 como default en todos tus buckets', en: '🔐 Enable SSE-S3 as default on all your buckets', pt: '🔐 Habilite SSE-S3 como default em todos os seus buckets' },
      { es: '📋 Usa SSE-KMS cuando necesites audit trail o compliance específico', en: '📋 Use SSE-KMS when you need audit trail or specific compliance', pt: '📋 Use SSE-KMS quando precisar de audit trail ou compliance específico' }
    ],
    externalLinks: [
      { title: 'S3 Encryption', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-encryption.html', type: 'aws_docs' },
      { title: 'S3 Bucket Policies', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Configuraste default encryption en tu bucket?', en: '✅ Did you configure default encryption on your bucket?', pt: '✅ Você configurou default encryption no seu bucket?' },
    xpReward: 55,
    estimatedMinutes: 35,
    services: ['S3', 'KMS']
  },

  {
    id: 'aws-2-8',
    stepNumber: 17,
    title: {
      es: 'S3 Select y optimización de queries',
      en: 'S3 Select and query optimization',
      pt: 'S3 Select e otimização de queries'
    },
    description: {
      es: 'Usar S3 Select para filtrar datos antes de descargarlos y optimizar transferencia.',
      en: 'Use S3 Select to filter data before downloading and optimize transfer.',
      pt: 'Usar S3 Select para filtrar dados antes de baixar e otimizar transferência.'
    },
    theory: {
      es: `## S3 Select - SQL Directamente en S3

### ¿Qué es S3 Select?
Ejecuta SQL simple directamente sobre objetos en S3 sin descargarlos completamente. Solo transfieres los datos que necesitas.

### Beneficios
- **Hasta 400% más rápido**: Menos datos transferidos
- **Hasta 80% menos costoso**: Solo pagas por datos escaneados
- **Soporta**: CSV, JSON, Parquet

### Ejemplo de uso
\`\`\`python
import boto3

s3 = boto3.client('s3')

response = s3.select_object_content(
    Bucket='my-bucket',
    Key='data/users.parquet',
    ExpressionType='SQL',
    Expression="SELECT name, email FROM s3object WHERE age > 25",
    InputSerialization={'Parquet': {}},
    OutputSerialization={'JSON': {}}
)

for event in response['Payload']:
    if 'Records' in event:
        print(event['Records']['Payload'].decode())
\`\`\`

### Limitaciones
- Queries simples (sin JOINs, subqueries limitadas)
- Max 256 columnas
- Parquet: solo columnas de tipos soportados
- No reemplaza Athena para queries complejas

### Cuándo usar S3 Select vs Athena
| S3 Select | Athena |
|-----------|--------|
| Filtros simples en un archivo | Queries complejas multi-archivo |
| Integración en código | Análisis ad-hoc |
| Bajo latencia, archivo único | Grandes volúmenes, JOINs |`,
      en: `## S3 Select - SQL Directly on S3

### What is S3 Select?
Execute simple SQL directly on objects in S3 without downloading them completely. You only transfer the data you need.

### Benefits
- **Up to 400% faster**: Less data transferred
- **Up to 80% less expensive**: You only pay for data scanned
- **Supports**: CSV, JSON, Parquet

### Usage example
\`\`\`python
import boto3

s3 = boto3.client('s3')

response = s3.select_object_content(
    Bucket='my-bucket',
    Key='data/users.parquet',
    ExpressionType='SQL',
    Expression="SELECT name, email FROM s3object WHERE age > 25",
    InputSerialization={'Parquet': {}},
    OutputSerialization={'JSON': {}}
)

for event in response['Payload']:
    if 'Records' in event:
        print(event['Records']['Payload'].decode())
\`\`\`

### Limitations
- Simple queries (no JOINs, limited subqueries)
- Max 256 columns
- Parquet: only supported column types
- Doesn't replace Athena for complex queries

### When to use S3 Select vs Athena
| S3 Select | Athena |
|-----------|--------|
| Simple filters on one file | Complex multi-file queries |
| Code integration | Ad-hoc analysis |
| Low latency, single file | Large volumes, JOINs |`,
      pt: `## S3 Select - SQL Diretamente no S3

### O que é S3 Select?
Execute SQL simples diretamente sobre objetos no S3 sem baixá-los completamente. Você só transfere os dados que precisa.

### Benefícios
- **Até 400% mais rápido**: Menos dados transferidos
- **Até 80% menos custoso**: Você só paga pelos dados escaneados
- **Suporta**: CSV, JSON, Parquet

### Exemplo de uso
\`\`\`python
import boto3

s3 = boto3.client('s3')

response = s3.select_object_content(
    Bucket='my-bucket',
    Key='data/users.parquet',
    ExpressionType='SQL',
    Expression="SELECT name, email FROM s3object WHERE age > 25",
    InputSerialization={'Parquet': {}},
    OutputSerialization={'JSON': {}}
)

for event in response['Payload']:
    if 'Records' in event:
        print(event['Records']['Payload'].decode())
\`\`\`

### Limitações
- Queries simples (sem JOINs, subqueries limitadas)
- Max 256 colunas
- Parquet: apenas tipos de colunas suportados
- Não substitui Athena para queries complexas

### Quando usar S3 Select vs Athena
| S3 Select | Athena |
|-----------|--------|
| Filtros simples em um arquivo | Queries complexas multi-arquivo |
| Integração em código | Análise ad-hoc |
| Baixa latência, arquivo único | Grandes volumes, JOINs |`
    },
    practicalTips: [
      { es: '⚡ Usa S3 Select en Lambda functions para procesar archivos grandes sin cargarlos completos en memoria', en: '⚡ Use S3 Select in Lambda functions to process large files without loading them completely in memory', pt: '⚡ Use S3 Select em Lambda functions para processar arquivos grandes sem carregá-los completamente na memória' }
    ],
    externalLinks: [
      { title: 'S3 Select Documentation', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/selecting-content-from-objects.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Probaste S3 Select con un archivo CSV o Parquet?', en: '✅ Did you try S3 Select with a CSV or Parquet file?', pt: '✅ Você testou S3 Select com um arquivo CSV ou Parquet?' },
    xpReward: 50,
    estimatedMinutes: 30,
    services: ['S3']
  },

  {
    id: 'aws-2-9',
    stepNumber: 18,
    title: {
      es: 'Event Notifications y integración con Lambda',
      en: 'Event Notifications and Lambda integration',
      pt: 'Event Notifications e integração com Lambda'
    },
    description: {
      es: 'Configurar notificaciones de eventos S3 para disparar pipelines automáticamente.',
      en: 'Configure S3 event notifications to trigger pipelines automatically.',
      pt: 'Configurar notificações de eventos S3 para disparar pipelines automaticamente.'
    },
    theory: {
      es: `## S3 Event Notifications

### ¿Qué son?
Notificaciones automáticas cuando algo pasa en un bucket: crear, eliminar, restaurar objetos.

### Destinos posibles
1. **Lambda**: Ejecutar código serverless
2. **SQS**: Encolar mensajes para procesamiento
3. **SNS**: Notificaciones a múltiples suscriptores
4. **EventBridge**: Routing avanzado de eventos

### Eventos disponibles
- \`s3:ObjectCreated:*\`: Cualquier creación
- \`s3:ObjectCreated:Put\`: PUT específico
- \`s3:ObjectRemoved:*\`: Cualquier eliminación
- \`s3:ObjectRestore:Completed\`: Restore de Glacier

### Caso de uso típico: Pipeline automático
\`\`\`
Archivo llega a s3://bucket/raw/
    ↓
S3 Event Notification
    ↓
Lambda function dispara Glue Job
    ↓
Glue procesa a s3://bucket/processed/
    ↓
S3 Event Notification (processed)
    ↓
Lambda actualiza Data Catalog
\`\`\`

### Filtros de prefijo y sufijo
Puedes filtrar qué objetos disparan eventos:
- Prefijo: \`raw/incoming/\`
- Sufijo: \`.csv\` o \`.parquet\``,
      en: `## S3 Event Notifications

### What are they?
Automatic notifications when something happens in a bucket: create, delete, restore objects.

### Possible destinations
1. **Lambda**: Execute serverless code
2. **SQS**: Queue messages for processing
3. **SNS**: Notifications to multiple subscribers
4. **EventBridge**: Advanced event routing

### Available events
- \`s3:ObjectCreated:*\`: Any creation
- \`s3:ObjectCreated:Put\`: Specific PUT
- \`s3:ObjectRemoved:*\`: Any deletion
- \`s3:ObjectRestore:Completed\`: Glacier restore

### Typical use case: Automatic pipeline
\`\`\`
File arrives at s3://bucket/raw/
    ↓
S3 Event Notification
    ↓
Lambda function triggers Glue Job
    ↓
Glue processes to s3://bucket/processed/
    ↓
S3 Event Notification (processed)
    ↓
Lambda updates Data Catalog
\`\`\`

### Prefix and suffix filters
You can filter which objects trigger events:
- Prefix: \`raw/incoming/\`
- Suffix: \`.csv\` or \`.parquet\``,
      pt: `## S3 Event Notifications

### O que são?
Notificações automáticas quando algo acontece em um bucket: criar, deletar, restaurar objetos.

### Destinos possíveis
1. **Lambda**: Executar código serverless
2. **SQS**: Enfileirar mensagens para processamento
3. **SNS**: Notificações para múltiplos assinantes
4. **EventBridge**: Roteamento avançado de eventos

### Eventos disponíveis
- \`s3:ObjectCreated:*\`: Qualquer criação
- \`s3:ObjectCreated:Put\`: PUT específico
- \`s3:ObjectRemoved:*\`: Qualquer deleção
- \`s3:ObjectRestore:Completed\`: Restore do Glacier

### Caso de uso típico: Pipeline automático
\`\`\`
Arquivo chega em s3://bucket/raw/
    ↓
S3 Event Notification
    ↓
Lambda function dispara Glue Job
    ↓
Glue processa para s3://bucket/processed/
    ↓
S3 Event Notification (processed)
    ↓
Lambda atualiza Data Catalog
\`\`\`

### Filtros de prefixo e sufixo
Você pode filtrar quais objetos disparam eventos:
- Prefixo: \`raw/incoming/\`
- Sufixo: \`.csv\` ou \`.parquet\``
    },
    codeExample: {
      language: 'python',
      code: `# Lambda function example triggered by S3
import json
import boto3

def lambda_handler(event, context):
    # Parse S3 event
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        size = record['s3']['object']['size']
        
        print(f"New file: s3://{bucket}/{key} ({size} bytes)")
        
        # Trigger Glue job if it's a CSV
        if key.endswith('.csv'):
            glue = boto3.client('glue')
            glue.start_job_run(
                JobName='my-etl-job',
                Arguments={
                    '--input_path': f's3://{bucket}/{key}'
                }
            )
    
    return {'statusCode': 200}`,
      explanation: { es: 'Lambda que procesa eventos S3 y dispara un Glue job', en: 'Lambda that processes S3 events and triggers a Glue job', pt: 'Lambda que processa eventos S3 e dispara um Glue job' }
    },
    practicalTips: [
      { es: '🔔 Usa EventBridge en lugar de SNS/SQS cuando necesites routing complejo de eventos', en: '🔔 Use EventBridge instead of SNS/SQS when you need complex event routing', pt: '🔔 Use EventBridge em vez de SNS/SQS quando precisar de roteamento complexo de eventos' }
    ],
    externalLinks: [
      { title: 'S3 Event Notifications', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Configuraste una notificación que dispara Lambda cuando subes un archivo?', en: '✅ Did you configure a notification that triggers Lambda when you upload a file?', pt: '✅ Você configurou uma notificação que dispara Lambda quando faz upload de um arquivo?' },
    xpReward: 65,
    estimatedMinutes: 40,
    services: ['S3', 'Lambda', 'EventBridge']
  },

  {
    id: 'aws-2-10',
    stepNumber: 19,
    title: {
      es: 'Arquitectura de Data Lake con S3',
      en: 'Data Lake architecture with S3',
      pt: 'Arquitetura de Data Lake com S3'
    },
    description: {
      es: 'Diseñar la estructura completa de un Data Lake con zonas raw, processed, y serving.',
      en: 'Design the complete structure of a Data Lake with raw, processed, and serving zones.',
      pt: 'Projetar a estrutura completa de um Data Lake com zonas raw, processed e serving.'
    },
    theory: {
      es: `## Arquitectura de Data Lake en S3

### Modelo de zonas (Medallion Architecture)
\`\`\`
s3://company-datalake-{env}/
├── raw/              # Bronze: Datos crudos, sin modificar
│   ├── source1/
│   │   └── year=2024/month=01/
│   └── source2/
│
├── processed/        # Silver: Datos limpios, transformados
│   ├── domain1/
│   │   └── table1/
│   └── domain2/
│
├── serving/          # Gold: Datos listos para consumo
│   ├── analytics/
│   ├── ml/
│   └── reporting/
│
├── temp/             # Archivos temporales (lifecycle: 7 días)
│
└── archive/          # Datos históricos (Glacier)
\`\`\`

### Convenciones por zona

**Raw (Bronze)**:
- Formato original (JSON, CSV, etc.)
- Particionado por fecha de llegada
- Inmutable (nunca modificar)
- Versionado habilitado

**Processed (Silver)**:
- Formato Parquet
- Particionado por lógica de negocio
- Schema validado
- Datos deduplicados y limpios

**Serving (Gold)**:
- Formato Parquet optimizado
- Agregaciones pre-calculadas
- Métricas de negocio
- Acceso directo por analistas/BI

### Tags recomendados
\`\`\`
Environment: dev|staging|prod
DataClassification: public|internal|confidential|restricted
Owner: data-team
CostCenter: analytics
Retention: 30d|90d|1y|7y|forever
\`\`\``,
      en: `## Data Lake Architecture in S3

### Zone model (Medallion Architecture)
\`\`\`
s3://company-datalake-{env}/
├── raw/              # Bronze: Raw, unmodified data
│   ├── source1/
│   │   └── year=2024/month=01/
│   └── source2/
│
├── processed/        # Silver: Clean, transformed data
│   ├── domain1/
│   │   └── table1/
│   └── domain2/
│
├── serving/          # Gold: Ready-to-consume data
│   ├── analytics/
│   ├── ml/
│   └── reporting/
│
├── temp/             # Temporary files (lifecycle: 7 days)
│
└── archive/          # Historical data (Glacier)
\`\`\`

### Conventions by zone

**Raw (Bronze)**:
- Original format (JSON, CSV, etc.)
- Partitioned by arrival date
- Immutable (never modify)
- Versioning enabled

**Processed (Silver)**:
- Parquet format
- Partitioned by business logic
- Validated schema
- Deduplicated and clean data

**Serving (Gold)**:
- Optimized Parquet format
- Pre-calculated aggregations
- Business metrics
- Direct access by analysts/BI

### Recommended tags
\`\`\`
Environment: dev|staging|prod
DataClassification: public|internal|confidential|restricted
Owner: data-team
CostCenter: analytics
Retention: 30d|90d|1y|7y|forever
\`\`\``,
      pt: `## Arquitetura de Data Lake no S3

### Modelo de zonas (Medallion Architecture)
\`\`\`
s3://company-datalake-{env}/
├── raw/              # Bronze: Dados brutos, não modificados
│   ├── source1/
│   │   └── year=2024/month=01/
│   └── source2/
│
├── processed/        # Silver: Dados limpos, transformados
│   ├── domain1/
│   │   └── table1/
│   └── domain2/
│
├── serving/          # Gold: Dados prontos para consumo
│   ├── analytics/
│   ├── ml/
│   └── reporting/
│
├── temp/             # Arquivos temporários (lifecycle: 7 dias)
│
└── archive/          # Dados históricos (Glacier)
\`\`\`

### Convenções por zona

**Raw (Bronze)**:
- Formato original (JSON, CSV, etc.)
- Particionado por data de chegada
- Imutável (nunca modificar)
- Versionamento habilitado

**Processed (Silver)**:
- Formato Parquet
- Particionado por lógica de negócio
- Schema validado
- Dados deduplicados e limpos

**Serving (Gold)**:
- Formato Parquet otimizado
- Agregações pré-calculadas
- Métricas de negócio
- Acesso direto por analistas/BI

### Tags recomendadas
\`\`\`
Environment: dev|staging|prod
DataClassification: public|internal|confidential|restricted
Owner: data-team
CostCenter: analytics
Retention: 30d|90d|1y|7y|forever
\`\`\``
    },
    practicalTips: [
      { es: '🏗️ Crea buckets separados por ambiente (dev/staging/prod) para mejor aislamiento', en: '🏗️ Create separate buckets by environment (dev/staging/prod) for better isolation', pt: '🏗️ Crie buckets separados por ambiente (dev/staging/prod) para melhor isolamento' },
      { es: '📊 La zona serving debe ser la más optimizada - aquí es donde los usuarios consultan', en: '📊 The serving zone should be the most optimized - this is where users query', pt: '📊 A zona serving deve ser a mais otimizada - aqui é onde os usuários consultam' }
    ],
    externalLinks: [
      { title: 'Building Data Lakes on AWS', url: 'https://docs.aws.amazon.com/whitepapers/latest/building-data-lakes/building-data-lake-aws.html', type: 'aws_docs' },
      { title: 'Data Lake Architecture Best Practices', url: 'https://aws.amazon.com/blogs/big-data/build-a-lake-house-architecture-on-aws/', type: 'article' }
    ],
    checkpoint: { es: '✅ ¿Puedes diseñar un Data Lake con las 3 zonas y explicar qué va en cada una?', en: '✅ Can you design a Data Lake with 3 zones and explain what goes in each?', pt: '✅ Você consegue projetar um Data Lake com 3 zonas e explicar o que vai em cada uma?' },
    interviewTips: [
      { es: 'Pregunta MUY común: "Diseña un Data Lake en AWS". Dibuja las zonas, menciona S3, Glue Catalog, Athena, y Lake Formation', en: 'VERY common question: "Design a Data Lake in AWS". Draw the zones, mention S3, Glue Catalog, Athena, and Lake Formation', pt: 'Pergunta MUITO comum: "Projete um Data Lake na AWS". Desenhe as zonas, mencione S3, Glue Catalog, Athena e Lake Formation' }
    ],
    certificationNotes: { es: 'Este tema es CRÍTICO para la certificación. El 20%+ de las preguntas involucran arquitectura de Data Lake', en: 'This topic is CRITICAL for certification. 20%+ of questions involve Data Lake architecture', pt: 'Este tema é CRÍTICO para a certificação. 20%+ das perguntas envolvem arquitetura de Data Lake' },
    xpReward: 80,
    estimatedMinutes: 45,
    services: ['S3', 'Glue Data Catalog', 'Lake Formation']
  }
];








