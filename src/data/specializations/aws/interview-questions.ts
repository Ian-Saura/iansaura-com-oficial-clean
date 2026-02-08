/**
 * PREGUNTAS DE ENTREVISTA - AWS DATA ENGINEERING
 * 3+ preguntas de nivel experto por módulo del Nivel 1
 * Incluye respuesta detallada para cada pregunta
 */
import { LocalizedContent } from './types';

export interface InterviewQuestion {
  id: string;
  moduleId: string;
  moduleName: LocalizedContent;
  question: LocalizedContent;
  answer: LocalizedContent;
  difficulty: 'senior' | 'expert' | 'staff';
  services: string[];
  tags: string[];
}

export const interviewQuestions: InterviewQuestion[] = [
  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 1: FUNDAMENTOS Y SEGURIDAD (IAM + S3)
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iq-1-1',
    moduleId: 'module-1',
    moduleName: { es: 'Fundamentos y Seguridad (IAM + S3)', en: 'Fundamentals and Security (IAM + S3)', pt: 'Fundamentos e Segurança (IAM + S3)' },
    question: {
      es: 'Si tengo un bucket con millones de archivos pequeños (< 1KB cada uno), ¿cómo impacta esto a Athena y cómo lo solucionarías?',
      en: 'If I have a bucket with millions of small files (< 1KB each), how does this impact Athena and how would you fix it?',
      pt: 'Se eu tenho um bucket com milhões de arquivos pequenos (< 1KB cada), como isso impacta o Athena e como você resolveria?'
    },
    answer: {
      es: 'El problema de "small files" es uno de los más comunes en Data Lakes. Athena cobra por TB escaneado pero tiene un overhead por archivo: debe listar cada archivo, abrir cada uno, leer headers. Con millones de archivos pequeños, el tiempo de listing excede el de procesamiento. Soluciones: 1) File compaction: un job periódico (Lambda o Glue) que agrupa archivos pequeños en archivos grandes de 128-256MB en Parquet. 2) Particionamiento inteligente: en lugar de un archivo por evento, agrupar por hora/día. 3) Athena CTAS: CREATE TABLE AS SELECT para reescribir datos compactados. 4) Partition Projection: elimina la necesidad de que Athena liste particiones en el Glue Catalog.',
      en: 'The "small files" problem is one of the most common in Data Lakes. Athena charges per TB scanned but has per-file overhead. Solutions: 1) File compaction job. 2) Smart partitioning. 3) Athena CTAS. 4) Partition Projection.',
      pt: 'O problema de "small files" é um dos mais comuns em Data Lakes. Athena cobra por TB escaneado mas tem overhead por arquivo. Soluções: 1) File compaction job. 2) Particionamento inteligente. 3) Athena CTAS. 4) Partition Projection.'
    },
    difficulty: 'senior',
    services: ['S3', 'Athena'],
    tags: ['small-files', 'optimization', 'partitioning']
  },
  {
    id: 'iq-1-2',
    moduleId: 'module-1',
    moduleName: { es: 'Fundamentos y Seguridad (IAM + S3)', en: 'Fundamentals and Security (IAM + S3)', pt: 'Fundamentos e Segurança (IAM + S3)' },
    question: {
      es: '¿Cuál es la diferencia entre una Bucket Policy, una IAM Policy y un ACL en S3? ¿Cuándo usarías cada una?',
      en: 'What is the difference between a Bucket Policy, IAM Policy and ACL in S3? When would you use each?',
      pt: 'Qual é a diferença entre uma Bucket Policy, IAM Policy e ACL no S3? Quando você usaria cada uma?'
    },
    answer: {
      es: 'Bucket Policy: se adjunta al bucket, define quién puede acceder al bucket (incluyendo cuentas externas, servicios, roles). Ideal para acceso cross-account o público. IAM Policy: se adjunta al usuario/rol, define a qué recursos puede acceder ese principal. Ideal para controlar permisos de tu equipo interno. ACL: mecanismo legacy de S3, NO recomendado. AWS recomienda deshabilitarlas (Block Public Access incluye esto). Regla: usa IAM Policy para "quién puede hacer qué" e Bucket Policy para "quién puede acceder a este bucket específico". Nunca ACLs.',
      en: 'Bucket Policy: attached to bucket, defines who can access. IAM Policy: attached to user/role, defines what resources they can access. ACL: legacy, NOT recommended. Rule: IAM Policy for internal team, Bucket Policy for cross-account or service access. Never ACLs.',
      pt: 'Bucket Policy: anexada ao bucket, define quem pode acessar. IAM Policy: anexada ao user/role, define quais recursos podem acessar. ACL: legado, NÃO recomendado. Regra: IAM Policy para time interno, Bucket Policy para acesso cross-account.'
    },
    difficulty: 'senior',
    services: ['S3', 'IAM'],
    tags: ['security', 'policies', 'access-control']
  },
  {
    id: 'iq-1-3',
    moduleId: 'module-1',
    moduleName: { es: 'Fundamentos y Seguridad (IAM + S3)', en: 'Fundamentals and Security (IAM + S3)', pt: 'Fundamentos e Segurança (IAM + S3)' },
    question: {
      es: '¿Cómo manejas credenciales de base de datos en una Lambda que se conecta a Redshift?',
      en: 'How do you handle database credentials in a Lambda that connects to Redshift?',
      pt: 'Como você gerencia credenciais de banco de dados em uma Lambda que se conecta ao Redshift?'
    },
    answer: {
      es: 'NUNCA en código ni en environment variables (son visibles en la consola). La respuesta correcta: AWS Secrets Manager. 1) Crear secret con host, port, dbname, username, password. 2) Lambda lee el secret con get_secret_value() y lo cachea en variable global (se reutiliza en warm invocations). 3) IAM policy con least privilege: solo secretsmanager:GetSecretValue en el ARN específico del secret. 4) Habilitar rotación automática cada 30 días. 5) Usar la librería aws-secretsmanager-caching para caching eficiente. Alternativa: Redshift Data API con IAM authentication (sin password).',
      en: 'NEVER in code or env vars. Use AWS Secrets Manager: create secret, Lambda reads with get_secret_value() and caches in global variable, IAM policy with least privilege, enable auto-rotation. Alternative: Redshift Data API with IAM auth.',
      pt: 'NUNCA no código ou env vars. Usar AWS Secrets Manager: criar secret, Lambda lê com get_secret_value() e cacheia em variável global, IAM policy com least privilege, habilitar rotação automática.'
    },
    difficulty: 'expert',
    services: ['Lambda', 'Secrets Manager', 'Redshift', 'IAM'],
    tags: ['security', 'secrets', 'best-practices']
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 2: GLUE DATA CATALOG + ATHENA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iq-2-1',
    moduleId: 'module-2',
    moduleName: { es: 'Glue Data Catalog + Athena', en: 'Glue Data Catalog + Athena', pt: 'Glue Data Catalog + Athena' },
    question: {
      es: '¿Qué es Partition Projection y por qué reduce costos en Athena?',
      en: 'What is Partition Projection and why does it reduce costs in Athena?',
      pt: 'O que é Partition Projection e por que reduz custos no Athena?'
    },
    answer: {
      es: 'Normalmente, cuando ejecutas una query en Athena, primero consulta el Glue Data Catalog para obtener la lista de particiones y sus ubicaciones en S3. Con millones de particiones, esta llamada es lenta y costosa. Partition Projection calcula las particiones dinámicamente en memoria usando reglas definidas en la tabla (por ejemplo: year es un entero de 2020 a 2030, month es un entero de 1 a 12). Athena genera las rutas S3 sin consultar el Catalog. Beneficios: 1) No necesitas MSCK REPAIR TABLE ni add_partition(). 2) Queries sobre tablas con muchas particiones son instantáneas. 3) No hay costo de Glue Catalog API calls. Se configura con propiedades de tabla como projection.year.type=integer, projection.year.range=2020,2030.',
      en: 'Instead of querying Glue Catalog for partition list, Partition Projection calculates partitions dynamically in memory using table properties. Benefits: no MSCK REPAIR, instant queries, no Catalog API costs.',
      pt: 'Em vez de consultar o Glue Catalog para lista de partições, Partition Projection calcula partições dinamicamente em memória usando propriedades da tabela.'
    },
    difficulty: 'expert',
    services: ['Athena', 'Glue Data Catalog'],
    tags: ['optimization', 'partitioning', 'cost-reduction']
  },
  {
    id: 'iq-2-2',
    moduleId: 'module-2',
    moduleName: { es: 'Glue Data Catalog + Athena', en: 'Glue Data Catalog + Athena', pt: 'Glue Data Catalog + Athena' },
    question: {
      es: '¿Cómo optimizarías una query de Athena que escanea 500GB y cuesta $2.50?',
      en: 'How would you optimize an Athena query that scans 500GB and costs $2.50?',
      pt: 'Como você otimizaria uma query do Athena que escaneia 500GB e custa $2.50?'
    },
    answer: {
      es: 'Athena cobra $5/TB escaneado. 500GB = $2.50. Estrategias para reducir: 1) Convertir de CSV a Parquet (reduce 85-90% del tamaño). 2) Particionamiento por fecha (WHERE year=2024 AND month=12 escanea solo esa partición). 3) Proyección de columnas: SELECT col1, col2 en lugar de SELECT * (Parquet es columnar). 4) Compresión: Snappy en Parquet. 5) CTAS para pre-agregar datos frecuentes. 6) Athena Workgroups con límite de bytes escaneados. Resultado: una query de 500GB en CSV puede bajar a ~15GB en Parquet particionado = $0.075 (97% menos).',
      en: 'Strategies: 1) Convert CSV to Parquet (85-90% reduction). 2) Partitioning by date. 3) Column projection instead of SELECT *. 4) Snappy compression. 5) CTAS for pre-aggregation. 6) Workgroups with byte limits. Result: 500GB CSV → ~15GB Parquet = $0.075 (97% less).',
      pt: 'Estratégias: 1) Converter CSV para Parquet (85-90% redução). 2) Particionamento por data. 3) Projeção de colunas. 4) Compressão Snappy. 5) CTAS. 6) Workgroups com limites. Resultado: 500GB CSV → ~15GB Parquet = $0.075 (97% menos).'
    },
    difficulty: 'senior',
    services: ['Athena'],
    tags: ['optimization', 'cost', 'parquet']
  },
  {
    id: 'iq-2-3',
    moduleId: 'module-2',
    moduleName: { es: 'Glue Data Catalog + Athena', en: 'Glue Data Catalog + Athena', pt: 'Glue Data Catalog + Athena' },
    question: {
      es: '¿Cuándo usarías un Crawler vs crear tablas manualmente en el Glue Data Catalog?',
      en: 'When would you use a Crawler vs creating tables manually in Glue Data Catalog?',
      pt: 'Quando você usaria um Crawler vs criar tabelas manualmente no Glue Data Catalog?'
    },
    answer: {
      es: 'Crawler: útil para exploración inicial cuando no conoces el schema, o cuando el schema cambia frecuentemente. Pero: cobra por DPU-hora ($0.44/DPU-hora mínimo), puede inferir tipos incorrectamente, y a veces crea tablas duplicadas. Manual: recomendado en producción cuando conoces el schema. CREATE EXTERNAL TABLE en Athena o glue.create_table() con boto3. Es GRATIS (sin Crawler), tienes control total del schema, y evitas sorpresas. Regla de oro: Crawlers para dev/exploración, tablas manuales para producción.',
      en: 'Crawler: for exploration when schema is unknown. Manual: recommended in production for known schemas. Crawlers cost $0.44/DPU-hour, can infer types incorrectly. Manual is FREE and gives full control.',
      pt: 'Crawler: para exploração quando schema é desconhecido. Manual: recomendado em produção para schemas conhecidos. Crawlers custam $0.44/DPU-hora, podem inferir tipos incorretamente.'
    },
    difficulty: 'senior',
    services: ['Glue Data Catalog'],
    tags: ['crawler', 'catalog', 'cost']
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 3: LAMBDA
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iq-3-1',
    moduleId: 'module-3',
    moduleName: { es: 'Lambda (Procesamiento por Eventos)', en: 'Lambda (Event Processing)', pt: 'Lambda (Processamento por Eventos)' },
    question: {
      es: '¿Cómo procesarías un archivo de 8GB en Lambda si solo tienes 10GB de memoria?',
      en: 'How would you process an 8GB file in Lambda with only 10GB of memory?',
      pt: 'Como você processaria um arquivo de 8GB no Lambda com apenas 10GB de memória?'
    },
    answer: {
      es: 'Es factible pero arriesgado (8GB de datos + overhead de Python/pandas puede exceder 10GB). Estrategia: 1) Configurar 10GB de memoria y 10GB de ephemeral storage (/tmp). 2) NO leer todo en memoria con pd.read_csv(). Usar pandas chunksize: pd.read_csv(file, chunksize=100000). 3) Procesar cada chunk y escribir a /tmp. 4) Monitorear con context.get_remaining_time_in_millis() para graceful shutdown si se acerca el timeout. 5) Si el procesamiento toma > 15 min, NO es para Lambda → usar Fargate (sin límite de tiempo ni memoria). Regla: si necesitas más de 5GB de memoria o más de 10 min, evalúa Fargate.',
      en: 'Risky but feasible: 1) Set 10GB memory + 10GB ephemeral storage. 2) Use pandas chunksize instead of reading all. 3) Monitor remaining time. 4) If > 15 min, move to Fargate.',
      pt: 'Arriscado mas factível: 1) Configurar 10GB memória + 10GB ephemeral storage. 2) Usar pandas chunksize. 3) Monitorar tempo restante. 4) Se > 15 min, mover para Fargate.'
    },
    difficulty: 'expert',
    services: ['Lambda'],
    tags: ['large-files', 'memory', 'limits']
  },
  {
    id: 'iq-3-2',
    moduleId: 'module-3',
    moduleName: { es: 'Lambda (Procesamiento por Eventos)', en: 'Lambda (Event Processing)', pt: 'Lambda (Processamento por Eventos)' },
    question: {
      es: '¿Cómo garantizarías idempotencia en una Lambda que procesa eventos de S3?',
      en: 'How would you guarantee idempotency in a Lambda processing S3 events?',
      pt: 'Como você garantiria idempotência em uma Lambda que processa eventos do S3?'
    },
    answer: {
      es: 'S3 puede enviar el mismo evento más de una vez (at-least-once delivery). Sin idempotencia, procesas el mismo archivo dos veces. Solución: 1) DynamoDB como state store: antes de procesar, PutItem con condition_expression="attribute_not_exists(file_key)". Si ya existe, skip. 2) El file_key puede ser bucket+key+etag (el etag cambia si el contenido cambia). 3) Usar TTL en DynamoDB (90 días) para limpieza automática. 4) Al finalizar, actualizar status a "processed" con timestamp. 5) Alternativa: usar el event_id del evento S3 como idempotency key. Esto es un patrón crítico en producción que demuestra madurez en diseño de sistemas.',
      en: 'S3 has at-least-once delivery. Solution: DynamoDB as state store with conditional writes. Use bucket+key+etag as idempotency key. TTL for cleanup.',
      pt: 'S3 tem entrega at-least-once. Solução: DynamoDB como state store com conditional writes. Usar bucket+key+etag como chave de idempotência. TTL para limpeza.'
    },
    difficulty: 'expert',
    services: ['Lambda', 'DynamoDB', 'S3'],
    tags: ['idempotency', 'reliability', 'design-pattern']
  },
  {
    id: 'iq-3-3',
    moduleId: 'module-3',
    moduleName: { es: 'Lambda (Procesamiento por Eventos)', en: 'Lambda (Event Processing)', pt: 'Lambda (Processamento por Eventos)' },
    question: {
      es: '¿Qué pasa si Lambda escribe en el mismo bucket que lo triggerea? ¿Cómo lo solucionas?',
      en: 'What happens if Lambda writes to the same bucket that triggers it? How do you fix it?',
      pt: 'O que acontece se Lambda escreve no mesmo bucket que o dispara? Como você resolve?'
    },
    answer: {
      es: 'Se crea un LOOP INFINITO: archivo llega → Lambda se ejecuta → Lambda escribe → nuevo archivo dispara Lambda → repite. Esto puede generar miles de ejecuciones en segundos y costos altísimos. Soluciones: 1) Usar prefijos diferentes: trigger en bronze/, output en silver/. Configurar S3 notification con filter prefix=bronze/. 2) Usar suffix filters: trigger en .csv, output en .parquet. 3) Mejor práctica: usar BUCKETS SEPARADOS para input y output. 4) Si usas EventBridge en lugar de S3 Notifications, puedes filtrar por metadata adicional.',
      en: 'Creates INFINITE LOOP. Solutions: 1) Different prefixes with filter. 2) Different suffixes. 3) Separate buckets. 4) EventBridge for advanced filtering.',
      pt: 'Cria LOOP INFINITO. Soluções: 1) Prefixos diferentes com filtro. 2) Suffixes diferentes. 3) Buckets separados. 4) EventBridge para filtragem avançada.'
    },
    difficulty: 'senior',
    services: ['Lambda', 'S3'],
    tags: ['infinite-loop', 'trigger', 'anti-pattern']
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 4: FARGATE
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iq-4-1',
    moduleId: 'module-4',
    moduleName: { es: 'ECS Fargate (Procesamiento Largo)', en: 'ECS Fargate (Long Processing)', pt: 'ECS Fargate (Processamento Longo)' },
    question: {
      es: '¿Cuándo migrarías un ETL de Lambda a Fargate? ¿Cuáles son los trade-offs?',
      en: 'When would you migrate an ETL from Lambda to Fargate? What are the trade-offs?',
      pt: 'Quando você migraria um ETL de Lambda para Fargate? Quais são os trade-offs?'
    },
    answer: {
      es: 'Migrar cuando: 1) Procesamiento > 15 min (límite hard de Lambda). 2) Archivos > 10GB (exceden memoria Lambda). 3) Dependencias > 250MB (límite de deployment package). 4) Necesitas GPU o recursos específicos. Trade-offs: Lambda tiene cold start de 200ms-10s vs Fargate 30-60s. Lambda escala a 0 instantáneamente vs Fargate tarda más. Lambda es gratis (1M ejecuciones/mes) vs Fargate cobra desde la primera ejecución ($0.04/vCPU-hora). Lambda no requiere Docker vs Fargate sí. Estrategia híbrida: Lambda para archivos < 1GB y < 5 min, Fargate para todo lo demás.',
      en: 'Migrate when: processing > 15 min, files > 10GB, dependencies > 250MB. Trade-offs: Lambda has faster cold start, scales to 0, is free. Fargate has no time/memory limits but costs from first execution.',
      pt: 'Migrar quando: processamento > 15 min, arquivos > 10GB, dependências > 250MB. Trade-offs: Lambda tem cold start mais rápido, escala a 0, é grátis. Fargate não tem limites mas cobra desde a primeira execução.'
    },
    difficulty: 'expert',
    services: ['Lambda', 'ECS', 'Fargate'],
    tags: ['architecture', 'migration', 'trade-offs']
  },
  {
    id: 'iq-4-2',
    moduleId: 'module-4',
    moduleName: { es: 'ECS Fargate (Procesamiento Largo)', en: 'ECS Fargate (Long Processing)', pt: 'ECS Fargate (Processamento Longo)' },
    question: {
      es: '¿Cómo optimizarías un contenedor Docker para ETL en Fargate?',
      en: 'How would you optimize a Docker container for ETL on Fargate?',
      pt: 'Como você otimizaria um container Docker para ETL no Fargate?'
    },
    answer: {
      es: '1) Multi-stage build: separar build (con gcc, compiladores) de runtime (python:3.12-slim). Reduce imagen de 1.5GB a 200MB. 2) Layer caching: ordenar instrucciones de menos a más cambiable (requirements.txt antes que código). 3) .dockerignore: excluir .git, __pycache__, tests, docs. 4) No instalar paquetes innecesarios: --no-dev, --no-cache-dir. 5) Usar Alpine SOLO si no necesitas C extensions (pandas no funciona bien en Alpine). 6) Para ECR: lifecycle policy que borre imágenes > 30 días para reducir storage costs.',
      en: '1) Multi-stage build. 2) Layer caching. 3) .dockerignore. 4) No unnecessary packages. 5) python:slim over Alpine for data packages. 6) ECR lifecycle policies.',
      pt: '1) Multi-stage build. 2) Layer caching. 3) .dockerignore. 4) Sem pacotes desnecessários. 5) python:slim em vez de Alpine. 6) ECR lifecycle policies.'
    },
    difficulty: 'senior',
    services: ['ECS', 'Fargate', 'ECR'],
    tags: ['docker', 'optimization', 'best-practices']
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 5: REDSHIFT
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iq-5-1',
    moduleId: 'module-5',
    moduleName: { es: 'Amazon Redshift (Data Warehouse)', en: 'Amazon Redshift (Data Warehouse)', pt: 'Amazon Redshift (Data Warehouse)' },
    question: {
      es: 'Explica la diferencia entre Distribution Key de tipo ALL, KEY y EVEN en Redshift. ¿Cuándo usarías cada una?',
      en: 'Explain the difference between ALL, KEY and EVEN Distribution in Redshift. When would you use each?',
      pt: 'Explique a diferença entre Distribution Key tipo ALL, KEY e EVEN no Redshift. Quando usaria cada uma?'
    },
    answer: {
      es: 'ALL: copia la tabla completa en cada nodo. Ideal para tablas pequeñas de dimensión (< 1M filas) que se JOINean frecuentemente. Elimina data shuffling en JOINs. KEY: distribuye filas por hash de una columna. Filas con el mismo valor de la key van al mismo nodo. Ideal para tablas de hechos grandes. Si joineas fact_orders DISTKEY(customer_id) con dim_customer DISTKEY(customer_id), el JOIN es local (no network). EVEN: distribuye filas round-robin. Ideal cuando no hay patrón de JOIN claro. Buen default pero no optimiza JOINs. Error común: usar KEY distribution en una columna con baja cardinalidad (ej: status con 3 valores) → data skew.',
      en: 'ALL: copies table to all nodes (small dimension tables). KEY: distributes by column hash (large fact tables, co-locates JOINs). EVEN: round-robin (no clear JOIN pattern). Common mistake: KEY on low-cardinality column causes skew.',
      pt: 'ALL: copia tabela para todos os nós (tabelas dimensão pequenas). KEY: distribui por hash de coluna (tabelas fato grandes). EVEN: round-robin (sem padrão de JOIN claro).'
    },
    difficulty: 'expert',
    services: ['Redshift'],
    tags: ['distribution', 'optimization', 'data-warehouse']
  },
  {
    id: 'iq-5-copy',
    moduleId: 'module-5',
    moduleName: { es: 'Amazon Redshift (Data Warehouse)', en: 'Amazon Redshift (Data Warehouse)', pt: 'Amazon Redshift (Data Warehouse)' },
    question: {
      es: '¿Por qué COPY es 10-100x más rápido que INSERT en Redshift? ¿Cómo optimizarías una carga de 100 millones de filas?',
      en: 'Why is COPY 10-100x faster than INSERT in Redshift? How would you optimize loading 100 million rows?',
      pt: 'Por que COPY é 10-100x mais rápido que INSERT no Redshift? Como você otimizaria uma carga de 100 milhões de linhas?'
    },
    answer: {
      es: 'COPY aprovecha la arquitectura MPP: el Leader Node distribuye la carga entre TODOS los Compute Nodes en paralelo. INSERT es fila por fila, usa un solo nodo. Para optimizar: 1) Dividir datos en N archivos donde N = múltiplo del número de slices (ej: 4 slices → 4, 8, 12 archivos de 100MB-1GB). Esto garantiza que todos los slices trabajan en paralelo. 2) Usar Parquet con Snappy en lugar de CSV (más rápido, tipos nativos, menor tamaño). 3) COMPUPDATE ON para que Redshift aplique encoding óptimo automáticamente. 4) STATUPDATE ON para actualizar estadísticas del optimizer. 5) Después del COPY, VACUUM + ANALYZE. 6) COPY es GRATIS: no tiene costo adicional, solo el compute de Redshift. Transferencia S3→Redshift en la misma región también es gratis. Es la operación con mejor relación costo/rendimiento en todo AWS.',
      en: 'COPY leverages MPP architecture: Leader Node distributes load across ALL Compute Nodes in parallel. INSERT is row-by-row, single node. To optimize: 1) Split data into N files where N = multiple of slice count. 2) Use Parquet with Snappy. 3) COMPUPDATE ON for automatic encoding. 4) STATUPDATE ON. 5) Post-COPY: VACUUM + ANALYZE. 6) COPY is FREE - no additional cost.',
      pt: 'COPY aproveita a arquitetura MPP: Leader Node distribui a carga entre TODOS os Compute Nodes em paralelo. INSERT é linha por linha. Para otimizar: 1) Dividir dados em N arquivos onde N = múltiplo do número de slices. 2) Usar Parquet com Snappy. 3) COMPUPDATE ON. 4) VACUUM + ANALYZE pós-COPY. 5) COPY é GRÁTIS.'
    },
    difficulty: 'expert',
    services: ['Redshift', 'S3'],
    tags: ['copy', 'performance', 'mpp', 'cost-optimization']
  },
  {
    id: 'iq-5-2',
    moduleId: 'module-5',
    moduleName: { es: 'Amazon Redshift (Data Warehouse)', en: 'Amazon Redshift (Data Warehouse)', pt: 'Amazon Redshift (Data Warehouse)' },
    question: {
      es: '¿Cómo implementarías un UPSERT (MERGE) en Redshift?',
      en: 'How would you implement an UPSERT (MERGE) in Redshift?',
      pt: 'Como você implementaria um UPSERT (MERGE) no Redshift?'
    },
    answer: {
      es: 'Redshift no tiene MERGE nativo (a diferencia de Snowflake). El patrón estándar: 1) COPY datos nuevos a tabla staging (CREATE TEMP TABLE staging LIKE target). 2) BEGIN TRANSACTION. 3) DELETE FROM target USING staging WHERE target.id = staging.id. 4) INSERT INTO target SELECT * FROM staging. 5) COMMIT (o ROLLBACK si hubo error). 6) DROP TABLE staging. 7) VACUUM target (recuperar espacio de filas borradas). 8) ANALYZE target (actualizar estadísticas). Orquestar con Step Functions para retry automático. En Redshift Serverless, usar Data API para ejecutar SQL desde Lambda sin conexión directa.',
      en: 'Redshift has no native MERGE. Pattern: 1) COPY to staging. 2) BEGIN. 3) DELETE from target WHERE id matches. 4) INSERT from staging. 5) COMMIT. 6) VACUUM. 7) ANALYZE.',
      pt: 'Redshift não tem MERGE nativo. Padrão: 1) COPY para staging. 2) BEGIN. 3) DELETE do target WHERE id matches. 4) INSERT do staging. 5) COMMIT. 6) VACUUM. 7) ANALYZE.'
    },
    difficulty: 'expert',
    services: ['Redshift'],
    tags: ['upsert', 'merge', 'scd']
  },
  {
    id: 'iq-5-3',
    moduleId: 'module-5',
    moduleName: { es: 'Amazon Redshift (Data Warehouse)', en: 'Amazon Redshift (Data Warehouse)', pt: 'Amazon Redshift (Data Warehouse)' },
    question: {
      es: '¿Qué es Redshift Spectrum y cuándo lo usarías en lugar de COPY?',
      en: 'What is Redshift Spectrum and when would you use it instead of COPY?',
      pt: 'O que é Redshift Spectrum e quando você usaria em vez de COPY?'
    },
    answer: {
      es: 'Spectrum permite ejecutar queries de Redshift directamente sobre datos en S3, sin cargarlos al warehouse. Usa el Glue Data Catalog como metastore. Cuándo Spectrum: 1) Datos históricos que rara vez se consultan (cold data). 2) Datos demasiado grandes para cargar a Redshift. 3) JOINs entre datos internos (Redshift) y externos (S3). Cuándo COPY: datos calientes consultados frecuentemente, necesitas performance máxima, datos < 1TB. Patrón lakehouse: datos recientes en Redshift (hot), datos históricos en S3 vía Spectrum (cold). Spectrum cobra $5/TB escaneado (igual que Athena).',
      en: 'Spectrum queries S3 data directly from Redshift using Glue Catalog. Use for: cold/historical data, data too large for Redshift, joining internal+external data. Use COPY for: hot data, max performance.',
      pt: 'Spectrum consulta dados do S3 diretamente do Redshift usando Glue Catalog. Use para: dados frios/históricos, dados muito grandes para Redshift, joins interno+externo.'
    },
    difficulty: 'senior',
    services: ['Redshift', 'S3'],
    tags: ['spectrum', 'lakehouse', 'optimization']
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 6: STEP FUNCTIONS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iq-6-1',
    moduleId: 'module-6',
    moduleName: { es: 'Step Functions (Orquestación)', en: 'Step Functions (Orchestration)', pt: 'Step Functions (Orquestração)' },
    question: {
      es: '¿Cuál es la diferencia entre Step Functions Standard y Express? ¿Cuándo usarías cada uno?',
      en: 'What is the difference between Step Functions Standard and Express? When would you use each?',
      pt: 'Qual é a diferença entre Step Functions Standard e Express? Quando usaria cada um?'
    },
    answer: {
      es: 'Standard: 1 año de duración máxima, exactly-once execution, historial completo en consola, $0.025 por 1000 transiciones de estado. Ideal para: pipelines ETL, workflows largos, procesos que necesitan trazabilidad. Express: 5 minutos máximo, at-least-once o at-most-once, logs en CloudWatch (no en consola), pricing por ejecución+duración (mucho más barato para alto volumen). Ideal para: procesamiento de eventos high-throughput (IoT, streaming), transformaciones rápidas, cost-sensitive. Free Tier: Standard tiene 4,000 transiciones/mes gratis. Express no tiene free tier. Para Data Engineering, Standard es casi siempre la elección correcta.',
      en: 'Standard: 1 year max, exactly-once, console history, per-transition pricing. Express: 5 min max, at-least-once, CloudWatch logs, per-execution pricing. For Data Engineering, Standard is almost always the right choice.',
      pt: 'Standard: 1 ano máx, exactly-once, histórico no console. Express: 5 min máx, at-least-once, logs no CloudWatch. Para Data Engineering, Standard é quase sempre a escolha correta.'
    },
    difficulty: 'expert',
    services: ['Step Functions'],
    tags: ['orchestration', 'architecture', 'pricing']
  },
  {
    id: 'iq-6-2',
    moduleId: 'module-6',
    moduleName: { es: 'Step Functions (Orquestación)', en: 'Step Functions (Orchestration)', pt: 'Step Functions (Orquestração)' },
    question: {
      es: '¿Cómo implementarías error handling robusto en un pipeline de Step Functions?',
      en: 'How would you implement robust error handling in a Step Functions pipeline?',
      pt: 'Como você implementaria error handling robusto em um pipeline de Step Functions?'
    },
    answer: {
      es: 'Step Functions tiene error handling nativo con Retry y Catch. Estrategia por capas: 1) Retry con backoff exponencial para errores transitorios (Retry: ErrorEquals=States.ALL, MaxAttempts=3, BackoffRate=2). 2) Catch para errores no recuperables → enviar a SNS o SQS DLQ. 3) Choice state después de cada tarea para verificar output (si status=INVALID, ir a rama de error). 4) Parallel state con error handling individual por rama. 5) ResultPath para preservar el input original junto con el error. 6) Step final "Cleanup" que siempre se ejecuta (usando Catch→Cleanup→Fail). Patrón saga: si paso 3 falla, ejecutar compensaciones de pasos 1 y 2.',
      en: 'Native error handling: 1) Retry with exponential backoff. 2) Catch for unrecoverable errors → SNS/DLQ. 3) Choice state for output validation. 4) Parallel with per-branch error handling. 5) ResultPath to preserve context. 6) Saga pattern for compensations.',
      pt: 'Error handling nativo: 1) Retry com backoff exponencial. 2) Catch para erros não recuperáveis → SNS/DLQ. 3) Choice state para validação de output. 4) Parallel com error handling por branch. 5) Padrão saga para compensações.'
    },
    difficulty: 'expert',
    services: ['Step Functions', 'SNS'],
    tags: ['error-handling', 'reliability', 'saga-pattern']
  },
  {
    id: 'iq-6-3',
    moduleId: 'module-6',
    moduleName: { es: 'Step Functions (Orquestación)', en: 'Step Functions (Orchestration)', pt: 'Step Functions (Orquestração)' },
    question: {
      es: '¿Step Functions o Airflow (MWAA)? ¿Cuándo elegirías cada uno?',
      en: 'Step Functions or Airflow (MWAA)? When would you choose each?',
      pt: 'Step Functions ou Airflow (MWAA)? Quando escolheria cada um?'
    },
    answer: {
      es: 'Step Functions: serverless, paga por uso, visual, integración nativa con 200+ servicios AWS, ideal para workflows event-driven. Sin servidor que mantener. Gratis (4000 transiciones/mes). Airflow (MWAA): estándar de la industria, community enorme, DAGs en Python (flexibilidad total), ideal para workflows complejos con lógica de negocio, schedule-driven. Pero: MWAA cuesta mínimo $350/mes (siempre encendido). Regla: si tu pipeline es 100% AWS y event-driven → Step Functions. Si necesitas orquestar servicios multi-cloud, tienes lógica Python compleja, o tu equipo ya conoce Airflow → MWAA. Para startups y Free Tier → Step Functions siempre.',
      en: 'Step Functions: serverless, pay-per-use, native AWS integration, event-driven. Airflow: industry standard, Python DAGs, multi-cloud, but costs $350+/month. Rule: 100% AWS → Step Functions. Multi-cloud or complex Python logic → Airflow.',
      pt: 'Step Functions: serverless, paga por uso, integração nativa AWS, event-driven. Airflow: padrão da indústria, DAGs Python, multi-cloud, mas custa $350+/mês.'
    },
    difficulty: 'staff',
    services: ['Step Functions', 'MWAA'],
    tags: ['orchestration', 'architecture-decision', 'airflow']
  }
];

// Helpers
export const getQuestionsByModule = (moduleId: string) => {
  return interviewQuestions.filter(q => q.moduleId === moduleId);
};

export const getQuestionsByDifficulty = (difficulty: 'senior' | 'expert' | 'staff') => {
  return interviewQuestions.filter(q => q.difficulty === difficulty);
};

export const interviewStats = {
  total: interviewQuestions.length,
  byDifficulty: {
    senior: interviewQuestions.filter(q => q.difficulty === 'senior').length,
    expert: interviewQuestions.filter(q => q.difficulty === 'expert').length,
    staff: interviewQuestions.filter(q => q.difficulty === 'staff').length
  },
  byModule: {
    'module-1': interviewQuestions.filter(q => q.moduleId === 'module-1').length,
    'module-2': interviewQuestions.filter(q => q.moduleId === 'module-2').length,
    'module-3': interviewQuestions.filter(q => q.moduleId === 'module-3').length,
    'module-4': interviewQuestions.filter(q => q.moduleId === 'module-4').length,
    'module-5': interviewQuestions.filter(q => q.moduleId === 'module-5').length,
    'module-6': interviewQuestions.filter(q => q.moduleId === 'module-6').length
  }
};
