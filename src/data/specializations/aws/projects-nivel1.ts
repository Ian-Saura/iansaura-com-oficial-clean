/**
 * PROYECTOS NIVEL 1: SERVERLESS DATA ENGINEERING
 * 5 proyectos enterprise-grade con arquitectura Medallion
 * Optimizados para Free Tier
 */
import { AWSProject } from './types';

export const awsProjectsNivel1: AWSProject[] = [
  // ═══════════════════════════════════════════════════════════════
  // PROYECTO 1: CROWN JEWEL - Pipeline Medallion Orquestado E2E
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-n1-proj-1',
    number: 1,
    title: {
      es: 'Pipeline Medallion Orquestado End-to-End',
      en: 'End-to-End Orchestrated Medallion Pipeline',
      pt: 'Pipeline Medallion Orquestrado End-to-End'
    },
    subtitle: {
      es: 'El proyecto estrella: S3 → Lambda → Step Functions → Athena → SNS',
      en: 'The crown jewel: S3 → Lambda → Step Functions → Athena → SNS',
      pt: 'O projeto estrela: S3 → Lambda → Step Functions → Athena → SNS'
    },
    description: {
      es: 'Construye un pipeline de datos enterprise completo que se activa automáticamente cuando un archivo llega a S3. Usa 3 Lambdas orquestadas por Step Functions: validación de schema, limpieza y transformación Bronze→Silver, y generación de agregados Gold con Athena CTAS. Las Lambdas leen configuración sensible (SNS topic ARN, database config) desde Secrets Manager. Incluye notificaciones SNS de éxito/fallo, registro de particiones en Glue Catalog, y data quality checks.',
      en: 'Build a complete enterprise data pipeline that activates automatically when a file arrives in S3. Uses 3 Lambdas orchestrated by Step Functions: schema validation, Bronze→Silver cleanup and transformation, and Gold aggregate generation with Athena CTAS. Lambdas read sensitive configuration from Secrets Manager. Includes SNS success/failure notifications, Glue Catalog partition registration, and data quality checks.',
      pt: 'Construa um pipeline de dados enterprise completo que se ativa automaticamente quando um arquivo chega no S3. Usa 3 Lambdas orquestradas por Step Functions: validação de schema, limpeza Bronze→Silver, e geração de agregados Gold com Athena CTAS. As Lambdas leem configuração sensível do Secrets Manager. Inclui notificações SNS, registro de partições no Glue Catalog, e data quality checks.'
    },
    businessCase: {
      es: 'En empresas reales, los datos llegan continuamente desde APIs, partners y sistemas internos. Necesitas un pipeline que: 1) se active solo, 2) valide antes de procesar, 3) transforme a formatos eficientes, 4) genere métricas de negocio, y 5) notifique al equipo si algo falla. Este proyecto replica ese patrón exacto.',
      en: 'In real companies, data arrives continuously from APIs, partners and internal systems. You need a pipeline that: 1) activates automatically, 2) validates before processing, 3) transforms to efficient formats, 4) generates business metrics, and 5) notifies the team if something fails. This project replicates that exact pattern.',
      pt: 'Em empresas reais, dados chegam continuamente de APIs, parceiros e sistemas internos. Você precisa de um pipeline que: 1) ative sozinho, 2) valide antes de processar, 3) transforme para formatos eficientes, 4) gere métricas de negócio, e 5) notifique o time se algo falhar. Este projeto replica esse padrão exato.'
    },
    difficulty: 'advanced',
    estimatedHours: 20,
    services: ['S3', 'Lambda', 'Step Functions', 'Athena', 'Glue Data Catalog', 'SNS', 'Secrets Manager', 'CloudWatch', 'IAM'],
    prerequisites: ['aws-phase-1', 'aws-phase-2', 'aws-phase-3'],
    skills: [
      { es: 'S3 Event Notifications con filtros', en: 'S3 Event Notifications with filters', pt: 'S3 Event Notifications com filtros' },
      { es: 'Lambda (3 funciones con diferentes responsabilidades)', en: 'Lambda (3 functions with different responsibilities)', pt: 'Lambda (3 funções com diferentes responsabilidades)' },
      { es: 'Step Functions (orquestación con error handling)', en: 'Step Functions (orchestration with error handling)', pt: 'Step Functions (orquestração com error handling)' },
      { es: 'Athena CTAS para generación Gold', en: 'Athena CTAS for Gold generation', pt: 'Athena CTAS para geração Gold' },
      { es: 'Secrets Manager para credenciales', en: 'Secrets Manager for credentials', pt: 'Secrets Manager para credenciais' },
      { es: 'Arquitectura Medallion completa', en: 'Complete Medallion architecture', pt: 'Arquitetura Medallion completa' }
    ],
    architecture: {
      description: {
        es: 'Archivo CSV llega a S3 Bronze → S3 Event Notification dispara Step Functions → Lambda 1 valida schema → Lambda 2 limpia y escribe Parquet en Silver → Lambda 3 registra partición en Glue y ejecuta Athena CTAS para Gold → SNS notifica resultado. Las 3 Lambdas leen config de Secrets Manager.',
        en: 'CSV file arrives at S3 Bronze → S3 Event Notification triggers Step Functions → Lambda 1 validates schema → Lambda 2 cleans and writes Parquet to Silver → Lambda 3 registers partition in Glue and runs Athena CTAS for Gold → SNS notifies result.',
        pt: 'Arquivo CSV chega no S3 Bronze → S3 Event Notification dispara Step Functions → Lambda 1 valida schema → Lambda 2 limpa e escreve Parquet no Silver → Lambda 3 registra partição no Glue e executa Athena CTAS para Gold → SNS notifica resultado.'
      },
      components: [
        { service: 'S3', purpose: { es: 'Data Lake con zonas Bronze/Silver/Gold', en: 'Data Lake with Bronze/Silver/Gold zones', pt: 'Data Lake com zonas Bronze/Silver/Gold' } },
        { service: 'Lambda', purpose: { es: '3 funciones: Validador, Transformer, Aggregator', en: '3 functions: Validator, Transformer, Aggregator', pt: '3 funções: Validador, Transformer, Aggregator' } },
        { service: 'Step Functions', purpose: { es: 'Orquestación con Retry/Catch y flujos paralelos', en: 'Orchestration with Retry/Catch and parallel flows', pt: 'Orquestração com Retry/Catch e fluxos paralelos' } },
        { service: 'Athena', purpose: { es: 'CTAS para generar tablas Gold agregadas', en: 'CTAS to generate aggregated Gold tables', pt: 'CTAS para gerar tabelas Gold agregadas' } },
        { service: 'Glue Data Catalog', purpose: { es: 'Registro automático de particiones', en: 'Automatic partition registration', pt: 'Registro automático de partições' } },
        { service: 'Secrets Manager', purpose: { es: 'Almacena SNS ARN y configuración sensible', en: 'Stores SNS ARN and sensitive configuration', pt: 'Armazena SNS ARN e configuração sensível' } },
        { service: 'SNS', purpose: { es: 'Notificaciones de éxito/fallo por email', en: 'Success/failure email notifications', pt: 'Notificações de sucesso/falha por email' } }
      ]
    },
    steps: [
      {
        title: { es: 'Diseñar la arquitectura', en: 'Design the architecture', pt: 'Projetar a arquitetura' },
        description: { es: 'Dibuja el diagrama de flujo completo: S3 → Step Functions → Lambda×3 → Athena → SNS. Define los schemas de entrada/salida de cada Lambda.', en: 'Draw the complete flow diagram. Define input/output schemas for each Lambda.', pt: 'Desenhe o diagrama de fluxo completo. Defina os schemas de entrada/saída de cada Lambda.' },
        deliverable: { es: 'Diagrama de arquitectura + schemas JSON de cada Lambda', en: 'Architecture diagram + JSON schemas for each Lambda', pt: 'Diagrama de arquitetura + schemas JSON de cada Lambda' }
      },
      {
        title: { es: 'Crear estructura S3 Medallion', en: 'Create S3 Medallion structure', pt: 'Criar estrutura S3 Medallion' },
        description: { es: 'Crear bucket con zonas bronze/, silver/, gold/. Configurar encryption SSE-S3 y lifecycle rules. Subir CSVs de prueba a bronze/.', en: 'Create bucket with bronze/, silver/, gold/ zones. Configure SSE-S3 encryption and lifecycle rules.', pt: 'Criar bucket com zonas bronze/, silver/, gold/. Configurar encryption SSE-S3 e lifecycle rules.' },
        deliverable: { es: 'Bucket configurado con datos de prueba en bronze/', en: 'Configured bucket with test data in bronze/', pt: 'Bucket configurado com dados de teste em bronze/' }
      },
      {
        title: { es: 'Crear Secret en Secrets Manager', en: 'Create Secret in Secrets Manager', pt: 'Criar Secret no Secrets Manager' },
        description: { es: 'Almacenar configuración sensible: SNS Topic ARN, nombre de base de datos Glue, prefijos S3. Crear IAM policy para que Lambda lea el secret.', en: 'Store sensitive config: SNS Topic ARN, Glue database name, S3 prefixes. Create IAM policy for Lambda to read the secret.', pt: 'Armazenar configuração sensível: SNS Topic ARN, nome do banco Glue, prefixos S3. Criar IAM policy para Lambda ler o secret.' },
        deliverable: { es: 'Secret creado + IAM policy con GetSecretValue', en: 'Secret created + IAM policy with GetSecretValue', pt: 'Secret criado + IAM policy com GetSecretValue' }
      },
      {
        title: { es: 'Lambda 1: Validador de Schema', en: 'Lambda 1: Schema Validator', pt: 'Lambda 1: Validador de Schema' },
        description: { es: 'Lee CSV de S3, verifica columnas esperadas, tipos de datos, y porcentaje de nulls. Retorna status: VALID o INVALID con detalles.', en: 'Read CSV from S3, verify expected columns, data types, and null percentage. Return status: VALID or INVALID with details.', pt: 'Ler CSV do S3, verificar colunas esperadas, tipos de dados, e porcentagem de nulls. Retornar status: VALID ou INVALID com detalhes.' },
        deliverable: { es: 'Lambda validador desplegada y probada con evento de test', en: 'Validator Lambda deployed and tested with test event', pt: 'Lambda validador implantada e testada com evento de teste' },
        code: {
          language: 'python',
          code: `import json, os, io, boto3
import pandas as pd

s3 = boto3.client('s3')
secrets = boto3.client('secretsmanager')
_config = None

def get_config():
    global _config
    if not _config:
        resp = secrets.get_secret_value(SecretId=os.environ['CONFIG_SECRET'])
        _config = json.loads(resp['SecretString'])
    return _config

EXPECTED = ['order_id','customer_id','product','quantity','price','order_date']

def lambda_handler(event, context):
    bucket = event['bucket']
    key = event['key']
    
    obj = s3.get_object(Bucket=bucket, Key=key)
    df = pd.read_csv(io.BytesIO(obj['Body'].read()))
    
    missing = [c for c in EXPECTED if c not in df.columns]
    null_pct = df.isnull().sum().sum() / (len(df) * len(df.columns)) * 100
    
    is_valid = len(missing) == 0 and null_pct < 20
    
    return {
        'status': 'VALID' if is_valid else 'INVALID',
        'bucket': bucket, 'key': key,
        'rows': len(df), 'columns': list(df.columns),
        'missing_columns': missing,
        'null_percentage': round(null_pct, 2)
    }`
        }
      },
      {
        title: { es: 'Lambda 2: Transformer Bronze→Silver', en: 'Lambda 2: Bronze→Silver Transformer', pt: 'Lambda 2: Transformer Bronze→Silver' },
        description: { es: 'Lee CSV validado, elimina duplicados, limpia nulls, convierte tipos, agrega metadata (_processed_at, _source_file), y escribe Parquet con snappy en Silver particionado por fecha.', en: 'Read validated CSV, remove duplicates, clean nulls, convert types, add metadata, write Parquet with snappy to Silver partitioned by date.', pt: 'Ler CSV validado, remover duplicados, limpar nulls, converter tipos, adicionar metadata, escrever Parquet com snappy no Silver particionado por data.' },
        deliverable: { es: 'Lambda transformer con Parquet output en Silver', en: 'Transformer Lambda with Parquet output in Silver', pt: 'Lambda transformer com Parquet output no Silver' }
      },
      {
        title: { es: 'Lambda 3: Aggregator Silver→Gold', en: 'Lambda 3: Silver→Gold Aggregator', pt: 'Lambda 3: Aggregator Silver→Gold' },
        description: { es: 'Registra partición en Glue Catalog con create_partition(). Ejecuta Athena CTAS query para generar tabla Gold con agregados de negocio (ventas por producto, por día, top clientes).', en: 'Register partition in Glue Catalog. Execute Athena CTAS for Gold aggregates (sales by product, day, top customers).', pt: 'Registrar partição no Glue Catalog. Executar Athena CTAS para agregados Gold (vendas por produto, dia, top clientes).' },
        deliverable: { es: 'Lambda aggregator + tablas Gold en Athena consultables', en: 'Aggregator Lambda + queryable Gold tables in Athena', pt: 'Lambda aggregator + tabelas Gold consultáveis no Athena' }
      },
      {
        title: { es: 'Step Functions: State Machine', en: 'Step Functions: State Machine', pt: 'Step Functions: State Machine' },
        description: { es: 'Crear state machine ASL que orqueste: Validar → (si VALID) Transformar → Agregar → Notificar éxito. Si INVALID o error → Notificar fallo. Con Retry (3 intentos, backoff exponencial) y Catch para cada Lambda.', en: 'Create ASL state machine: Validate → (if VALID) Transform → Aggregate → Notify success. If INVALID or error → Notify failure. With Retry and Catch for each Lambda.', pt: 'Criar state machine ASL: Validar → (se VALID) Transformar → Agregar → Notificar sucesso. Se INVALID ou erro → Notificar falha. Com Retry e Catch para cada Lambda.' },
        deliverable: { es: 'State machine desplegada con flujos de éxito y error', en: 'Deployed state machine with success and error flows', pt: 'State machine implantada com fluxos de sucesso e erro' },
        code: {
          language: 'json',
          code: `{
  "Comment": "Medallion Pipeline E2E",
  "StartAt": "ValidateSchema",
  "States": {
    "ValidateSchema": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:validator",
      "Retry": [{"ErrorEquals": ["States.ALL"], "MaxAttempts": 2, "BackoffRate": 2}],
      "Catch": [{"ErrorEquals": ["States.ALL"], "Next": "NotifyFailure"}],
      "Next": "CheckValidation"
    },
    "CheckValidation": {
      "Type": "Choice",
      "Choices": [{"Variable": "$.status", "StringEquals": "VALID", "Next": "TransformData"}],
      "Default": "NotifyFailure"
    },
    "TransformData": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:transformer",
      "Retry": [{"ErrorEquals": ["States.ALL"], "MaxAttempts": 2}],
      "Catch": [{"ErrorEquals": ["States.ALL"], "Next": "NotifyFailure"}],
      "Next": "AggregateGold"
    },
    "AggregateGold": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:aggregator",
      "Catch": [{"ErrorEquals": ["States.ALL"], "Next": "NotifyFailure"}],
      "Next": "NotifySuccess"
    },
    "NotifySuccess": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {"TopicArn": "arn:aws:sns:...:pipeline-alerts", "Subject": "Pipeline OK", "Message.$": "States.Format('Processed {} rows from {}', $.rows, $.key)"},
      "End": true
    },
    "NotifyFailure": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {"TopicArn": "arn:aws:sns:...:pipeline-alerts", "Subject": "Pipeline FAILED", "Message.$": "States.JsonToString($)"},
      "End": true
    }
  }
}`
        }
      },
      {
        title: { es: 'Configurar S3 Trigger → Step Functions', en: 'Configure S3 Trigger → Step Functions', pt: 'Configurar S3 Trigger → Step Functions' },
        description: { es: 'Conectar S3 Event Notification (prefix=bronze/, suffix=.csv) con EventBridge, que dispara Step Functions. Probar subiendo un CSV y verificar la ejecución completa.', en: 'Connect S3 Event Notification with EventBridge to trigger Step Functions. Test by uploading a CSV.', pt: 'Conectar S3 Event Notification com EventBridge para disparar Step Functions. Testar subindo um CSV.' },
        deliverable: { es: 'Trigger configurado: archivo en bronze/ → pipeline automático', en: 'Trigger configured: file in bronze/ → automatic pipeline', pt: 'Trigger configurado: arquivo em bronze/ → pipeline automático' }
      },
      {
        title: { es: 'Configurar SNS y CloudWatch', en: 'Configure SNS and CloudWatch', pt: 'Configurar SNS e CloudWatch' },
        description: { es: 'Crear SNS Topic con subscripción email. Verificar logs de cada Lambda en CloudWatch. Crear dashboard con métricas: archivos procesados, errores, duración promedio.', en: 'Create SNS Topic with email subscription. Verify Lambda logs in CloudWatch. Create dashboard with metrics.', pt: 'Criar SNS Topic com subscription email. Verificar logs de cada Lambda no CloudWatch. Criar dashboard com métricas.' },
        deliverable: { es: 'Notificaciones email + dashboard de monitoreo', en: 'Email notifications + monitoring dashboard', pt: 'Notificações email + dashboard de monitoramento' }
      },
      {
        title: { es: 'Test E2E y Documentación', en: 'E2E Test and Documentation', pt: 'Teste E2E e Documentação' },
        description: { es: 'Subir 10 archivos CSV variados (válidos e inválidos) y verificar: Bronze→Silver→Gold, notificaciones, logs, particiones en Glue. Documentar arquitectura, decisiones y costos.', en: 'Upload 10 varied CSV files and verify: Bronze→Silver→Gold, notifications, logs, Glue partitions. Document architecture, decisions and costs.', pt: 'Subir 10 arquivos CSV variados e verificar: Bronze→Silver→Gold, notificações, logs, partições no Glue. Documentar arquitetura, decisões e custos.' },
        deliverable: { es: 'README profesional + video demo de 3 min', en: 'Professional README + 3 min demo video', pt: 'README profissional + vídeo demo de 3 min' }
      }
    ],
    evaluation: [
      { criteria: { es: 'Arquitectura Medallion correcta (Bronze/Silver/Gold)', en: 'Correct Medallion architecture', pt: 'Arquitetura Medallion correta' }, points: 15 },
      { criteria: { es: 'Lambda Validador con reglas de calidad robustas', en: 'Validator Lambda with robust quality rules', pt: 'Lambda Validador com regras de qualidade robustas' }, points: 15 },
      { criteria: { es: 'Transformer produce Parquet particionado correctamente', en: 'Transformer produces correctly partitioned Parquet', pt: 'Transformer produz Parquet particionado corretamente' }, points: 15 },
      { criteria: { es: 'Step Functions con error handling completo (Retry/Catch)', en: 'Step Functions with complete error handling', pt: 'Step Functions com error handling completo' }, points: 20 },
      { criteria: { es: 'Secrets Manager integrado correctamente', en: 'Secrets Manager correctly integrated', pt: 'Secrets Manager integrado corretamente' }, points: 10 },
      { criteria: { es: 'Athena CTAS genera Gold consultable', en: 'Athena CTAS generates queryable Gold', pt: 'Athena CTAS gera Gold consultável' }, points: 10 },
      { criteria: { es: 'Pipeline E2E funcional con notificaciones', en: 'Functional E2E pipeline with notifications', pt: 'Pipeline E2E funcional com notificações' }, points: 15 }
    ],
    costEstimate: { es: 'Costo: $0 en Free Tier. Lambda: gratis (1M ejecuciones/mes). S3: gratis (5GB). Athena: $0 con queries pequeñas. Step Functions: gratis (4000 transiciones/mes). SNS: gratis (1M publicaciones). Secrets Manager: 1 secret gratis 30 días, luego $0.40/mes.', en: 'Cost: $0 on Free Tier. Lambda: free. S3: free (5GB). Athena: $0 with small queries. Step Functions: free (4000 transitions/month). SNS: free (1M publications). Secrets Manager: 1 secret free 30 days, then $0.40/month.', pt: 'Custo: $0 no Free Tier. Lambda: grátis. S3: grátis (5GB). Athena: $0 com queries pequenas. Step Functions: grátis (4000 transições/mês). SNS: grátis (1M publicações). Secrets Manager: 1 secret grátis 30 dias, depois $0.40/mês.' },
    portfolioValue: { es: 'Este proyecto demuestra dominio de arquitectura serverless, event-driven design y orquestación de pipelines. Es exactamente lo que empresas como Mercado Libre, Globant y Rappi buscan en un Data Engineer senior.', en: 'This project demonstrates mastery of serverless architecture, event-driven design and pipeline orchestration. Exactly what companies like Amazon, Netflix, and Airbnb look for in a senior Data Engineer.', pt: 'Este projeto demonstra domínio de arquitetura serverless, event-driven design e orquestração de pipelines. Exatamente o que empresas como iFood, Nubank e VTEX buscam em um Data Engineer sênior.' },
    xpReward: 800
  },

  // ═══════════════════════════════════════════════════════════════
  // PROYECTO 2: Deduplicación Inteligente
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-n1-proj-2',
    number: 2,
    title: {
      es: 'Deduplicación Inteligente en S3',
      en: 'Intelligent S3 Deduplication',
      pt: 'Deduplicação Inteligente no S3'
    },
    subtitle: {
      es: 'Hashing, DynamoDB state y Last-Write-Wins',
      en: 'Hashing, DynamoDB state and Last-Write-Wins',
      pt: 'Hashing, DynamoDB state e Last-Write-Wins'
    },
    description: {
      es: 'Crea un sistema que detecta y elimina registros duplicados usando hashing (MD5/SHA256). Lambda genera un hash por fila, DynamoDB almacena los hashes vistos, y aplica lógica "Last Write Wins" basada en timestamps de metadata. Patrón crítico en empresas donde las fuentes envían datos duplicados.',
      en: 'Build a system that detects and removes duplicate records using hashing (MD5/SHA256). Lambda generates a per-row hash, DynamoDB stores seen hashes, and applies "Last Write Wins" logic based on metadata timestamps.',
      pt: 'Crie um sistema que detecta e remove registros duplicados usando hashing (MD5/SHA256). Lambda gera hash por linha, DynamoDB armazena hashes vistos, e aplica lógica "Last Write Wins" baseada em timestamps de metadata.'
    },
    difficulty: 'intermediate',
    estimatedHours: 12,
    services: ['S3', 'Lambda', 'DynamoDB', 'CloudWatch'],
    prerequisites: ['aws-phase-1', 'aws-phase-2'],
    skills: [
      { es: 'Hashing MD5/SHA256 para deduplicación', en: 'MD5/SHA256 hashing for deduplication', pt: 'Hashing MD5/SHA256 para deduplicação' },
      { es: 'DynamoDB como state store', en: 'DynamoDB as state store', pt: 'DynamoDB como state store' },
      { es: 'Patrón Last-Write-Wins', en: 'Last-Write-Wins pattern', pt: 'Padrão Last-Write-Wins' },
      { es: 'Idempotencia en pipelines', en: 'Pipeline idempotency', pt: 'Idempotência em pipelines' }
    ],
    steps: [
      { title: { es: 'Generar datos con duplicados', en: 'Generate data with duplicates', pt: 'Gerar dados com duplicados' }, description: { es: 'Script Python que genera CSVs con ~20% de registros duplicados y timestamps variados.', en: 'Python script generating CSVs with ~20% duplicate records and varied timestamps.', pt: 'Script Python que gera CSVs com ~20% de registros duplicados e timestamps variados.' }, deliverable: { es: 'CSVs de prueba con duplicados conocidos', en: 'Test CSVs with known duplicates', pt: 'CSVs de teste com duplicados conhecidos' } },
      { title: { es: 'Crear tabla DynamoDB', en: 'Create DynamoDB table', pt: 'Criar tabela DynamoDB' }, description: { es: 'Tabla record-hashes con partition key = row_hash, TTL de 90 días para cleanup automático.', en: 'Table record-hashes with partition key = row_hash, 90-day TTL for auto cleanup.', pt: 'Tabela record-hashes com partition key = row_hash, TTL de 90 dias para cleanup automático.' }, deliverable: { es: 'Tabla DynamoDB con TTL habilitado', en: 'DynamoDB table with TTL enabled', pt: 'Tabela DynamoDB com TTL habilitado' } },
      { title: { es: 'Lambda de deduplicación', en: 'Deduplication Lambda', pt: 'Lambda de deduplicação' }, description: { es: 'Lee CSV, genera hash SHA256 por fila (excluyendo timestamp), consulta DynamoDB, aplica Last-Write-Wins, escribe solo registros únicos a Silver.', en: 'Read CSV, generate SHA256 hash per row, query DynamoDB, apply Last-Write-Wins, write only unique records to Silver.', pt: 'Ler CSV, gerar hash SHA256 por linha, consultar DynamoDB, aplicar Last-Write-Wins, escrever só registros únicos no Silver.' }, deliverable: { es: 'Lambda con lógica de dedup completa', en: 'Lambda with complete dedup logic', pt: 'Lambda com lógica de dedup completa' } },
      { title: { es: 'Métricas y validación', en: 'Metrics and validation', pt: 'Métricas e validação' }, description: { es: 'Dashboard CloudWatch: duplicados detectados, registros procesados, ratio de dedup. Validar que 0 duplicados pasan a Silver.', en: 'CloudWatch dashboard: duplicates detected, records processed, dedup ratio. Validate 0 duplicates pass to Silver.', pt: 'Dashboard CloudWatch: duplicados detectados, registros processados, ratio de dedup. Validar que 0 duplicados passam para Silver.' }, deliverable: { es: 'Dashboard + informe de validación', en: 'Dashboard + validation report', pt: 'Dashboard + relatório de validação' } }
    ],
    evaluation: [
      { criteria: { es: 'Algoritmo de hashing correcto y eficiente', en: 'Correct and efficient hashing algorithm', pt: 'Algoritmo de hashing correto e eficiente' }, points: 25 },
      { criteria: { es: 'DynamoDB con TTL y conditional writes', en: 'DynamoDB with TTL and conditional writes', pt: 'DynamoDB com TTL e conditional writes' }, points: 25 },
      { criteria: { es: 'Last-Write-Wins implementado correctamente', en: 'Last-Write-Wins correctly implemented', pt: 'Last-Write-Wins implementado corretamente' }, points: 25 },
      { criteria: { es: '0 duplicados en Silver (validado)', en: '0 duplicates in Silver (validated)', pt: '0 duplicados no Silver (validado)' }, points: 25 }
    ],
    costEstimate: { es: '$0 en Free Tier. DynamoDB: 25 WCU/RCU gratis. Lambda: gratis.', en: '$0 on Free Tier. DynamoDB: 25 WCU/RCU free. Lambda: free.', pt: '$0 no Free Tier. DynamoDB: 25 WCU/RCU grátis. Lambda: grátis.' },
    xpReward: 500
  },

  // ═══════════════════════════════════════════════════════════════
  // PROYECTO 3: Patrón UPSERT en Redshift
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-n1-proj-3',
    number: 3,
    title: {
      es: 'Patrón UPSERT en Redshift',
      en: 'Redshift UPSERT Pattern',
      pt: 'Padrão UPSERT no Redshift'
    },
    subtitle: {
      es: 'COPY → Staging → DELETE+INSERT → VACUUM',
      en: 'COPY → Staging → DELETE+INSERT → VACUUM',
      pt: 'COPY → Staging → DELETE+INSERT → VACUUM'
    },
    description: {
      es: 'Implementa el patrón UPSERT clásico de Redshift para actualizar dimensiones de clientes. COPY a tabla Staging → BEGIN → DELETE where ID matches → INSERT from Staging → COMMIT/ROLLBACK → VACUUM+ANALYZE. Orquestado por Step Functions con error handling transaccional. Credenciales de Redshift almacenadas en Secrets Manager con rotación automática.',
      en: 'Implement the classic Redshift UPSERT pattern for updating customer dimensions. COPY to Staging → BEGIN → DELETE where ID matches → INSERT from Staging → COMMIT/ROLLBACK → VACUUM+ANALYZE. Orchestrated by Step Functions with transactional error handling. Redshift credentials stored in Secrets Manager with auto-rotation.',
      pt: 'Implemente o padrão UPSERT clássico do Redshift para atualizar dimensões de clientes. COPY para Staging → BEGIN → DELETE where ID matches → INSERT from Staging → COMMIT/ROLLBACK → VACUUM+ANALYZE. Orquestrado por Step Functions com error handling transacional. Credenciais do Redshift armazenadas no Secrets Manager com rotação automática.'
    },
    difficulty: 'advanced',
    estimatedHours: 16,
    services: ['S3', 'Redshift', 'Step Functions', 'Lambda', 'SNS', 'Secrets Manager'],
    prerequisites: ['aws-phase-1', 'aws-phase-2', 'aws-phase-3'],
    skills: [
      { es: 'Patrón UPSERT (DELETE+INSERT)', en: 'UPSERT pattern (DELETE+INSERT)', pt: 'Padrão UPSERT (DELETE+INSERT)' },
      { es: 'Redshift COPY y optimización', en: 'Redshift COPY and optimization', pt: 'Redshift COPY e otimização' },
      { es: 'Transacciones en Redshift', en: 'Redshift transactions', pt: 'Transações no Redshift' },
      { es: 'Secrets Manager para credenciales DB', en: 'Secrets Manager for DB credentials', pt: 'Secrets Manager para credenciais DB' }
    ],
    steps: [
      { title: { es: 'Modelo dimensional', en: 'Dimensional model', pt: 'Modelo dimensional' }, description: { es: 'Crear dim_customer con SCD Type 1, tabla staging_customers, y distribution/sort keys óptimos.', en: 'Create dim_customer with SCD Type 1, staging_customers table, and optimal keys.', pt: 'Criar dim_customer com SCD Type 1, staging_customers, e keys ótimas.' }, deliverable: { es: 'DDL con distribution keys justificados', en: 'DDL with justified distribution keys', pt: 'DDL com distribution keys justificadas' } },
      { title: { es: 'Secret para Redshift', en: 'Secret for Redshift', pt: 'Secret para Redshift' }, description: { es: 'Crear secret en Secrets Manager con host, port, dbname, username, password. Lambda lo lee con caching.', en: 'Create secret in Secrets Manager. Lambda reads it with caching.', pt: 'Criar secret no Secrets Manager. Lambda lê com caching.' }, deliverable: { es: 'Secret creado + Lambda con get_secret_value + cache', en: 'Secret created + Lambda with get_secret_value + cache', pt: 'Secret criado + Lambda com get_secret_value + cache' } },
      { title: { es: 'Lambda UPSERT con Data API', en: 'UPSERT Lambda with Data API', pt: 'Lambda UPSERT com Data API' }, description: { es: 'Lambda que usa Redshift Data API para ejecutar: COPY → BEGIN → DELETE matches → INSERT → COMMIT. Rollback en caso de error.', en: 'Lambda using Redshift Data API for: COPY → BEGIN → DELETE → INSERT → COMMIT.', pt: 'Lambda usando Redshift Data API para: COPY → BEGIN → DELETE → INSERT → COMMIT.' }, deliverable: { es: 'Lambda con UPSERT transaccional completo', en: 'Lambda with complete transactional UPSERT', pt: 'Lambda com UPSERT transacional completo' } },
      { title: { es: 'Step Functions orchestration', en: 'Step Functions orchestration', pt: 'Orquestração Step Functions' }, description: { es: 'State machine: Upload trigger → COPY a staging → UPSERT → VACUUM ANALYZE → SNS notification.', en: 'State machine: Upload trigger → COPY → UPSERT → VACUUM ANALYZE → SNS.', pt: 'State machine: Upload trigger → COPY → UPSERT → VACUUM ANALYZE → SNS.' }, deliverable: { es: 'Pipeline UPSERT automatizado E2E', en: 'Automated E2E UPSERT pipeline', pt: 'Pipeline UPSERT automatizado E2E' } }
    ],
    evaluation: [
      { criteria: { es: 'Patrón UPSERT correcto y transaccional', en: 'Correct transactional UPSERT pattern', pt: 'Padrão UPSERT correto e transacional' }, points: 30 },
      { criteria: { es: 'Secrets Manager con caching', en: 'Secrets Manager with caching', pt: 'Secrets Manager com caching' }, points: 20 },
      { criteria: { es: 'VACUUM y ANALYZE post-load', en: 'Post-load VACUUM and ANALYZE', pt: 'VACUUM e ANALYZE pós-carga' }, points: 20 },
      { criteria: { es: 'Orquestación con error handling', en: 'Orchestration with error handling', pt: 'Orquestração com error handling' }, points: 30 }
    ],
    costEstimate: { es: 'Redshift Serverless: trial 2 meses gratis (dc2.large). Lambda y Step Functions: gratis. Secrets Manager: $0.40/mes por secret.', en: 'Redshift Serverless: 2-month free trial. Lambda and Step Functions: free. Secrets Manager: $0.40/month per secret.', pt: 'Redshift Serverless: trial 2 meses grátis. Lambda e Step Functions: grátis. Secrets Manager: $0.40/mês por secret.' },
    xpReward: 600
  },

  // ═══════════════════════════════════════════════════════════════
  // PROYECTO 4: ETL Big Data con Fargate
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-n1-proj-4',
    number: 4,
    title: {
      es: 'ETL de Big Data con Fargate',
      en: 'Big Data ETL with Fargate',
      pt: 'ETL de Big Data com Fargate'
    },
    subtitle: {
      es: 'Docker + ECS Fargate para archivos de +10GB',
      en: 'Docker + ECS Fargate for 10GB+ files',
      pt: 'Docker + ECS Fargate para arquivos de +10GB'
    },
    description: {
      es: 'Cuando Lambda no alcanza (archivos > 10GB o procesamiento > 15 min), usa Fargate. Crea un contenedor Docker con un script Python/Pandas que procesa un dataset de +10GB de logs, aplica deduplicación masiva, validación de tipos, y guarda el resultado optimizado en Gold. Lanzado por Step Functions.',
      en: 'When Lambda is not enough (files > 10GB or processing > 15 min), use Fargate. Create a Docker container with a Python/Pandas script that processes a 10GB+ log dataset, applies massive deduplication, type validation, and saves optimized results to Gold. Launched by Step Functions.',
      pt: 'Quando Lambda não é suficiente (arquivos > 10GB ou processamento > 15 min), use Fargate. Crie um container Docker com script Python/Pandas que processa dataset de +10GB de logs, aplica deduplicação massiva, validação de tipos, e salva resultado otimizado no Gold. Lançado por Step Functions.'
    },
    difficulty: 'advanced',
    estimatedHours: 18,
    services: ['ECR', 'ECS', 'Fargate', 'S3', 'Step Functions', 'CloudWatch'],
    prerequisites: ['aws-phase-1', 'aws-phase-2', 'aws-phase-3'],
    skills: [
      { es: 'Docker para ETL (multi-stage build)', en: 'Docker for ETL (multi-stage build)', pt: 'Docker para ETL (multi-stage build)' },
      { es: 'ECR (push/pull imágenes)', en: 'ECR (push/pull images)', pt: 'ECR (push/pull imagens)' },
      { es: 'Fargate Task Definitions', en: 'Fargate Task Definitions', pt: 'Fargate Task Definitions' },
      { es: 'Procesamiento de archivos grandes en chunks', en: 'Large file processing in chunks', pt: 'Processamento de arquivos grandes em chunks' }
    ],
    steps: [
      { title: { es: 'Dockerfile para ETL Python', en: 'Dockerfile for Python ETL', pt: 'Dockerfile para ETL Python' }, description: { es: 'Multi-stage build: base python:3.12-slim, instalar pandas/pyarrow/boto3, copiar script ETL, configurar ENTRYPOINT.', en: 'Multi-stage build with pandas/pyarrow/boto3, copy ETL script, configure ENTRYPOINT.', pt: 'Multi-stage build com pandas/pyarrow/boto3, copiar script ETL, configurar ENTRYPOINT.' }, deliverable: { es: 'Dockerfile optimizado + .dockerignore', en: 'Optimized Dockerfile + .dockerignore', pt: 'Dockerfile otimizado + .dockerignore' } },
      { title: { es: 'Script ETL para archivos pesados', en: 'ETL script for heavy files', pt: 'Script ETL para arquivos pesados' }, description: { es: 'Python que lee de S3 en chunks de 100MB, deduplica con hashing, valida tipos, escribe Parquet particionado. Manejo de memoria y logging.', en: 'Python reading from S3 in 100MB chunks, deduplicates with hashing, validates types, writes partitioned Parquet.', pt: 'Python que lê do S3 em chunks de 100MB, deduplica com hashing, valida tipos, escreve Parquet particionado.' }, deliverable: { es: 'Script etl_heavy.py probado localmente', en: 'etl_heavy.py script tested locally', pt: 'Script etl_heavy.py testado localmente' } },
      { title: { es: 'ECR: Push imagen', en: 'ECR: Push image', pt: 'ECR: Push imagem' }, description: { es: 'Crear repositorio ECR, build imagen, tag y push. Configurar lifecycle policy para limpiar imágenes viejas.', en: 'Create ECR repository, build image, tag and push. Configure lifecycle policy.', pt: 'Criar repositório ECR, build imagem, tag e push. Configurar lifecycle policy.' }, deliverable: { es: 'Imagen en ECR con lifecycle policy', en: 'Image in ECR with lifecycle policy', pt: 'Imagem no ECR com lifecycle policy' } },
      { title: { es: 'Task Definition y ejecución', en: 'Task Definition and execution', pt: 'Task Definition e execução' }, description: { es: 'Crear Task Definition con 2 vCPU, 4GB RAM, IAM Task Role para S3. Ejecutar con RunTask y monitorear en CloudWatch.', en: 'Create Task Definition with 2 vCPU, 4GB RAM, IAM Task Role for S3. Execute with RunTask.', pt: 'Criar Task Definition com 2 vCPU, 4GB RAM, IAM Task Role para S3. Executar com RunTask.' }, deliverable: { es: 'Tarea Fargate ejecutada con resultados en Gold', en: 'Fargate task executed with results in Gold', pt: 'Tarefa Fargate executada com resultados no Gold' } },
      { title: { es: 'Orquestación Step Functions', en: 'Step Functions orchestration', pt: 'Orquestração Step Functions' }, description: { es: 'State machine que lanza tarea Fargate, espera finalización, verifica exit code, y notifica por SNS.', en: 'State machine that launches Fargate task, waits for completion, checks exit code, notifies via SNS.', pt: 'State machine que lança tarefa Fargate, espera finalização, verifica exit code, e notifica via SNS.' }, deliverable: { es: 'Pipeline orquestado E2E', en: 'E2E orchestrated pipeline', pt: 'Pipeline orquestrado E2E' } }
    ],
    evaluation: [
      { criteria: { es: 'Dockerfile optimizado con multi-stage', en: 'Optimized multi-stage Dockerfile', pt: 'Dockerfile otimizado com multi-stage' }, points: 20 },
      { criteria: { es: 'ETL procesa archivos grandes en chunks', en: 'ETL processes large files in chunks', pt: 'ETL processa arquivos grandes em chunks' }, points: 25 },
      { criteria: { es: 'Task Definition con recursos correctos', en: 'Task Definition with correct resources', pt: 'Task Definition com recursos corretos' }, points: 20 },
      { criteria: { es: 'Orquestación con monitoreo', en: 'Orchestration with monitoring', pt: 'Orquestração com monitoramento' }, points: 20 },
      { criteria: { es: 'Documentación de costos y decisiones', en: 'Cost and decision documentation', pt: 'Documentação de custos e decisões' }, points: 15 }
    ],
    costEstimate: { es: 'Fargate: ~$0.05-0.20 por ejecución (2 vCPU, 4GB, 10 min). ECR: 500MB gratis. Total estimado: < $1 por mes de desarrollo.', en: 'Fargate: ~$0.05-0.20 per execution. ECR: 500MB free. Estimated total: < $1/month for development.', pt: 'Fargate: ~$0.05-0.20 por execução. ECR: 500MB grátis. Total estimado: < $1/mês de desenvolvimento.' },
    xpReward: 700
  },

  // ═══════════════════════════════════════════════════════════════
  // PROYECTO 5: Data Quality Framework
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-n1-proj-5',
    number: 5,
    title: {
      es: 'Data Quality Framework Reutilizable',
      en: 'Reusable Data Quality Framework',
      pt: 'Framework de Data Quality Reutilizável'
    },
    subtitle: {
      es: 'Alertas automáticas cuando los datos fallan checks de calidad',
      en: 'Automatic alerts when data fails quality checks',
      pt: 'Alertas automáticas quando dados falham checks de qualidade'
    },
    description: {
      es: 'Sistema de auditoría y calidad de datos reutilizable. Una Lambda cuenta nulos, duplicados, valores fuera de rango y anomalías estadísticas en la capa Silver. Si los errores superan un umbral configurable, Step Functions detiene el proceso y envía alerta vía SNS. Las reglas de calidad se almacenan en DynamoDB para ser reutilizables entre pipelines.',
      en: 'Reusable data audit and quality system. A Lambda counts nulls, duplicates, out-of-range values and statistical anomalies in the Silver layer. If errors exceed a configurable threshold, Step Functions stops the process and sends an SNS alert. Quality rules are stored in DynamoDB for reuse across pipelines.',
      pt: 'Sistema de auditoria e qualidade de dados reutilizável. Uma Lambda conta nulls, duplicados, valores fora de range e anomalias estatísticas na camada Silver. Se erros excedem um threshold configurável, Step Functions para o processo e envia alerta via SNS. Regras de qualidade armazenadas no DynamoDB para reutilização entre pipelines.'
    },
    difficulty: 'advanced',
    estimatedHours: 15,
    services: ['Lambda', 'Step Functions', 'DynamoDB', 'S3', 'Athena', 'SNS'],
    prerequisites: ['aws-phase-1', 'aws-phase-2'],
    skills: [
      { es: 'Data Quality checks (nulls, duplicados, rangos)', en: 'Data Quality checks (nulls, duplicates, ranges)', pt: 'Data Quality checks (nulls, duplicados, ranges)' },
      { es: 'DynamoDB como reglas configurables', en: 'DynamoDB as configurable rules', pt: 'DynamoDB como regras configuráveis' },
      { es: 'Circuit breaker pattern', en: 'Circuit breaker pattern', pt: 'Padrão circuit breaker' },
      { es: 'Alertas automáticas por SNS', en: 'Automatic SNS alerts', pt: 'Alertas automáticas por SNS' }
    ],
    steps: [
      { title: { es: 'Definir reglas de calidad', en: 'Define quality rules', pt: 'Definir regras de qualidade' }, description: { es: 'Diseñar schema de reglas en DynamoDB: table_name, column, check_type (null_pct, unique, range, regex), threshold, severity.', en: 'Design rules schema in DynamoDB: table_name, column, check_type, threshold, severity.', pt: 'Projetar schema de regras no DynamoDB: table_name, column, check_type, threshold, severity.' }, deliverable: { es: 'Tabla DynamoDB con 20+ reglas de ejemplo', en: 'DynamoDB table with 20+ example rules', pt: 'Tabela DynamoDB com 20+ regras de exemplo' } },
      { title: { es: 'Lambda Quality Checker', en: 'Quality Checker Lambda', pt: 'Lambda Quality Checker' }, description: { es: 'Lee reglas de DynamoDB, ejecuta checks sobre datos en S3/Athena, genera reporte con score de calidad (0-100).', en: 'Read rules from DynamoDB, execute checks on S3/Athena data, generate quality report with score (0-100).', pt: 'Ler regras do DynamoDB, executar checks nos dados do S3/Athena, gerar relatório com score de qualidade (0-100).' }, deliverable: { es: 'Lambda con framework de quality checks genérico', en: 'Lambda with generic quality checks framework', pt: 'Lambda com framework de quality checks genérico' } },
      { title: { es: 'Step Functions con circuit breaker', en: 'Step Functions with circuit breaker', pt: 'Step Functions com circuit breaker' }, description: { es: 'Si quality_score < threshold → STOP pipeline + SNS alert. Si OK → continuar procesamiento. Registrar historial de quality scores.', en: 'If quality_score < threshold → STOP pipeline + SNS alert. If OK → continue. Log quality score history.', pt: 'Se quality_score < threshold → PARAR pipeline + SNS alert. Se OK → continuar. Registrar histórico de quality scores.' }, deliverable: { es: 'Pipeline con circuit breaker funcional', en: 'Pipeline with functional circuit breaker', pt: 'Pipeline com circuit breaker funcional' } },
      { title: { es: 'Dashboard de calidad', en: 'Quality dashboard', pt: 'Dashboard de qualidade' }, description: { es: 'Athena queries sobre historial de quality scores. Tendencias por tabla, por día. Identificar degradación.', en: 'Athena queries on quality score history. Trends by table, by day. Identify degradation.', pt: 'Athena queries sobre histórico de quality scores. Tendências por tabela, por dia. Identificar degradação.' }, deliverable: { es: 'Queries de análisis + documentación del framework', en: 'Analysis queries + framework documentation', pt: 'Queries de análise + documentação do framework' } }
    ],
    evaluation: [
      { criteria: { es: 'Framework genérico y reutilizable', en: 'Generic and reusable framework', pt: 'Framework genérico e reutilizável' }, points: 25 },
      { criteria: { es: 'Quality checks comprehensivos (5+ tipos)', en: 'Comprehensive quality checks (5+ types)', pt: 'Quality checks abrangentes (5+ tipos)' }, points: 25 },
      { criteria: { es: 'Circuit breaker detiene pipeline correctamente', en: 'Circuit breaker correctly stops pipeline', pt: 'Circuit breaker para pipeline corretamente' }, points: 25 },
      { criteria: { es: 'Alertas y monitoreo funcional', en: 'Functional alerts and monitoring', pt: 'Alertas e monitoramento funcional' }, points: 25 }
    ],
    costEstimate: { es: '$0 en Free Tier. Lambda: gratis. DynamoDB: gratis (25 WCU/RCU). SNS: gratis. Step Functions: gratis (4000 transiciones/mes).', en: '$0 on Free Tier. All services within free tier limits.', pt: '$0 no Free Tier. Todos os serviços dentro dos limites do free tier.' },
    xpReward: 600
  }
];

// Helpers
export const getProjectNivel1ById = (id: string): AWSProject | undefined => {
  return awsProjectsNivel1.find(p => p.id === id);
};

export const projectNivel1Stats = {
  total: awsProjectsNivel1.length,
  totalHours: awsProjectsNivel1.reduce((sum, p) => sum + p.estimatedHours, 0),
  totalXP: awsProjectsNivel1.reduce((sum, p) => sum + p.xpReward, 0),
  byDifficulty: {
    intermediate: awsProjectsNivel1.filter(p => p.difficulty === 'intermediate').length,
    advanced: awsProjectsNivel1.filter(p => p.difficulty === 'advanced').length
  }
};
