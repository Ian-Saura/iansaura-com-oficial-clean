/**
 * FASE LAMBDA: PROCESAMIENTO POR EVENTOS (AWS LAMBDA)
 * 11 pasos para dominar Lambda como motor de ingesta serverless
 * Nivel 1: Serverless Data Engineering
 * 
 * Costo Free Tier: GRATIS (1 millón de ejecuciones/mes de por vida)
 */
import { AWSStep } from '../types';

export const phaseLambdaSteps: AWSStep[] = [
  // ═══════════════════════════════════════════════════════════════
  // STEP 1: FaaS Fundamentals
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-1',
    stepNumber: 201,
    title: {
      es: 'FaaS: Function as a Service',
      en: 'FaaS: Function as a Service',
      pt: 'FaaS: Function as a Service'
    },
    description: {
      es: 'Entender el paradigma serverless, el modelo de ejecución de Lambda y por qué es el motor de ingesta #1 en AWS.',
      en: 'Understand the serverless paradigm, Lambda execution model and why it is the #1 ingestion engine in AWS.',
      pt: 'Entender o paradigma serverless, o modelo de execução do Lambda e por que é o motor de ingestão #1 na AWS.'
    },
    theory: {
      es: `## Function as a Service (FaaS)

### ¿Qué es Lambda?
AWS Lambda es un servicio de computación **serverless** que ejecuta código en respuesta a eventos. No gestionas servidores, no pagas por tiempo idle, y escala automáticamente de 0 a miles de ejecuciones concurrentes.

### El Paradigma Serverless
\`\`\`
Tradicional (EC2):          Serverless (Lambda):
┌─────────────────┐        ┌─────────────────┐
│ Servidor 24/7   │        │ Evento llega    │
│ Pagas siempre   │        │ Lambda ejecuta  │
│ Tú escalas      │        │ Lambda termina  │
│ Tú parcheas     │        │ Pagas solo eso  │
│ Tú monitoreas   │        │ AWS escala      │
└─────────────────┘        └─────────────────┘
  $$$$ siempre               $ solo cuando se usa
\`\`\`

### Modelo de Ejecución
1. **Evento** llega (archivo en S3, mensaje en SQS, request HTTP, schedule)
2. AWS **provisiona** un contenedor con tu código (si no existe uno caliente)
3. Tu **handler** se ejecuta con el evento como input
4. Lambda **retorna** el resultado y el contenedor queda "caliente" por ~15 min
5. Si no hay más eventos, el contenedor se **destruye**

### ¿Por qué Lambda para Data Engineering?
- **Ingesta event-driven**: Archivo llega a S3 → Lambda procesa automáticamente
- **Costo $0 en desarrollo**: 1 millón de ejecuciones gratis por mes (de por vida)
- **Sin infraestructura**: No hay EC2, no hay Docker, no hay clusters
- **Escala automática**: 1000 archivos llegan al mismo tiempo → 1000 Lambdas en paralelo

### Pricing
\`\`\`
Free Tier (PERMANENTE, no expira):
  ✓ 1,000,000 requests/mes
  ✓ 400,000 GB-segundos de compute/mes
  ✓ Ejemplo: 1M ejecuciones de 128MB × 1 segundo = GRATIS

Después del Free Tier:
  $0.20 por 1M requests
  $0.0000166667 por GB-segundo
\`\`\`

### Lambda vs Otros Servicios de Compute
| Criterio | Lambda | Fargate | Glue | EMR |
|----------|--------|---------|------|-----|
| Max duración | 15 min | Sin límite | Sin límite | Sin límite |
| Max memoria | 10 GB | 30 GB | 300+ GB | TB+ |
| Escala a 0 | ✅ | ✅ | ✅ | ❌ |
| Cold start | 1-10s | 30-60s | 1-5 min | 5-15 min |
| Costo mínimo | $0 | $0.01/tarea | $0.44/DPU-h | $$/hora |
| Mejor para | ETL < 15 min | ETL largo | Spark ETL | Big Data |`,
      en: `## Function as a Service (FaaS)

### What is Lambda?
AWS Lambda is a **serverless** compute service that runs code in response to events. You don't manage servers, don't pay for idle time, and it scales automatically from 0 to thousands of concurrent executions.

### The Serverless Paradigm
\`\`\`
Traditional (EC2):          Serverless (Lambda):
┌─────────────────┐        ┌─────────────────┐
│ Server 24/7     │        │ Event arrives   │
│ Always paying   │        │ Lambda executes │
│ You scale       │        │ Lambda finishes │
│ You patch       │        │ Pay only that   │
│ You monitor     │        │ AWS scales      │
└─────────────────┘        └─────────────────┘
  $$$$ always                $ only when used
\`\`\`

### Execution Model
1. **Event** arrives (file in S3, SQS message, HTTP request, schedule)
2. AWS **provisions** a container with your code (if no warm one exists)
3. Your **handler** executes with the event as input
4. Lambda **returns** the result and the container stays "warm" for ~15 min
5. If no more events, the container is **destroyed**

### Why Lambda for Data Engineering?
- **Event-driven ingestion**: File lands in S3 → Lambda processes automatically
- **$0 cost in development**: 1 million free executions per month (forever)
- **No infrastructure**: No EC2, no Docker, no clusters
- **Auto-scaling**: 1000 files arrive simultaneously → 1000 Lambdas in parallel

### Pricing
\`\`\`
Free Tier (PERMANENT, never expires):
  ✓ 1,000,000 requests/month
  ✓ 400,000 GB-seconds of compute/month
  ✓ Example: 1M executions of 128MB × 1 second = FREE

After Free Tier:
  $0.20 per 1M requests
  $0.0000166667 per GB-second
\`\`\``,
      pt: `## Function as a Service (FaaS)

### O que é Lambda?
AWS Lambda é um serviço de computação **serverless** que executa código em resposta a eventos. Você não gerencia servidores, não paga por tempo ocioso, e escala automaticamente de 0 a milhares de execuções concorrentes.

### O Paradigma Serverless
\`\`\`
Tradicional (EC2):          Serverless (Lambda):
┌─────────────────┐        ┌─────────────────┐
│ Servidor 24/7   │        │ Evento chega    │
│ Paga sempre     │        │ Lambda executa  │
│ Você escala     │        │ Lambda termina  │
│ Você atualiza   │        │ Paga só isso    │
│ Você monitora   │        │ AWS escala      │
└─────────────────┘        └─────────────────┘
  $$$$ sempre                $ só quando usado
\`\`\`

### Por que Lambda para Data Engineering?
- **Ingestão event-driven**: Arquivo chega no S3 → Lambda processa automaticamente
- **Custo $0 em desenvolvimento**: 1 milhão de execuções grátis por mês (para sempre)
- **Sem infraestrutura**: Sem EC2, sem Docker, sem clusters
- **Auto-scaling**: 1000 arquivos chegam ao mesmo tempo → 1000 Lambdas em paralelo`
    },
    practicalTips: [
      { es: '💰 Lambda es GRATIS para desarrollo - 1M ejecuciones/mes nunca expiran', en: '💰 Lambda is FREE for development - 1M executions/month never expire', pt: '💰 Lambda é GRÁTIS para desenvolvimento - 1M execuções/mês nunca expiram' },
      { es: '⚡ Para Data Engineering, el trigger más común es S3 - archivo llega, Lambda procesa', en: '⚡ For Data Engineering, the most common trigger is S3 - file arrives, Lambda processes', pt: '⚡ Para Data Engineering, o trigger mais comum é S3 - arquivo chega, Lambda processa' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cuándo usarías Lambda vs Glue vs EMR para ETL?" → Lambda: archivos < 10GB, procesamiento < 15 min. Glue: ETL con Spark, schema inference. EMR: Big Data, jobs de horas, custom Spark.', en: '🎯 "When would you use Lambda vs Glue vs EMR for ETL?" → Lambda: files < 10GB, processing < 15 min. Glue: ETL with Spark, schema inference. EMR: Big Data, hour-long jobs, custom Spark.', pt: '🎯 "Quando você usaria Lambda vs Glue vs EMR para ETL?" → Lambda: arquivos < 10GB, processamento < 15 min. Glue: ETL com Spark, schema inference. EMR: Big Data, jobs de horas, custom Spark.' },
      { es: '🎯 "¿Qué pasa si 10,000 archivos llegan a S3 al mismo tiempo?" → Lambda escala automáticamente a 10,000 ejecuciones concurrentes (dentro del límite de concurrencia de la cuenta, default 1000). Puedes solicitar aumento.', en: '🎯 "What happens if 10,000 files arrive in S3 at the same time?" → Lambda auto-scales to 10,000 concurrent executions (within account concurrency limit, default 1000). You can request increase.', pt: '🎯 "O que acontece se 10.000 arquivos chegam no S3 ao mesmo tempo?" → Lambda escala automaticamente para 10.000 execuções concorrentes (dentro do limite de concorrência da conta, default 1000). Você pode solicitar aumento.' },
      { es: '🎯 "¿Lambda es realmente gratis?" → Sí, 1M ejecuciones/mes + 400K GB-seg son PERMANENTES. Un pipeline que procesa 100 archivos/día nunca sale del Free Tier.', en: '🎯 "Is Lambda really free?" → Yes, 1M executions/month + 400K GB-sec are PERMANENT. A pipeline processing 100 files/day never leaves Free Tier.', pt: '🎯 "Lambda é realmente grátis?" → Sim, 1M execuções/mês + 400K GB-seg são PERMANENTES. Um pipeline que processa 100 arquivos/dia nunca sai do Free Tier.' }
    ],
    commonMistakes: [
      { es: '❌ Pensar que Lambda es solo para microservicios web - es el motor de ingesta #1 para Data Lakes', en: '❌ Thinking Lambda is only for web microservices - it is the #1 ingestion engine for Data Lakes', pt: '❌ Pensar que Lambda é só para microsserviços web - é o motor de ingestão #1 para Data Lakes' },
      { es: '❌ No considerar el límite de 15 minutos - para ETL largo, usa Fargate o Glue', en: '❌ Not considering the 15-minute limit - for long ETL, use Fargate or Glue', pt: '❌ Não considerar o limite de 15 minutos - para ETL longo, use Fargate ou Glue' }
    ],
    externalLinks: [
      { title: 'AWS Lambda Documentation', url: 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html', type: 'aws_docs' },
      { title: 'Lambda Free Tier', url: 'https://aws.amazon.com/lambda/pricing/', type: 'aws_docs' },
      { title: 'Serverless Land - Patterns', url: 'https://serverlessland.com/patterns', type: 'tool' }
    ],
    checkpoint: { es: '✅ ¿Puedes explicar cuándo usar Lambda vs Fargate vs Glue para ETL?', en: '✅ Can you explain when to use Lambda vs Fargate vs Glue for ETL?', pt: '✅ Você consegue explicar quando usar Lambda vs Fargate vs Glue para ETL?' },
    xpReward: 50,
    estimatedMinutes: 30,
    services: ['Lambda']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 2: Anatomía de una Lambda
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-2',
    stepNumber: 202,
    title: {
      es: 'Anatomía de una Lambda Function',
      en: 'Anatomy of a Lambda Function',
      pt: 'Anatomia de uma Lambda Function'
    },
    description: {
      es: 'Entender la estructura del handler, el event object, context, environment variables y el ciclo de vida.',
      en: 'Understand the handler structure, event object, context, environment variables and lifecycle.',
      pt: 'Entender a estrutura do handler, o event object, context, environment variables e o ciclo de vida.'
    },
    theory: {
      es: `## Anatomía de una Lambda

### Estructura del Handler
\`\`\`python
import json
import boto3

# Código FUERA del handler se ejecuta UNA VEZ (en cold start)
# Ideal para: conexiones a DB, clientes boto3, configuración
s3_client = boto3.client('s3')

def lambda_handler(event, context):
    """
    event: dict con los datos del trigger (S3, SQS, API Gateway, etc.)
    context: objeto con metadata de la ejecución
    """
    # Procesar el evento
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    # Leer archivo de S3
    response = s3_client.get_object(Bucket=bucket, Key=key)
    data = response['Body'].read().decode('utf-8')
    
    # Retornar resultado
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': f'Procesado: {key}',
            'rows': len(data.split('\\n'))
        })
    }
\`\`\`

### El Objeto Context
\`\`\`python
def lambda_handler(event, context):
    print(f"Function: {context.function_name}")
    print(f"Memory: {context.memory_limit_in_mb} MB")
    print(f"Time left: {context.get_remaining_time_in_millis()} ms")
    print(f"Request ID: {context.aws_request_id}")
    print(f"Log group: {context.log_group_name}")
\`\`\`

### Environment Variables
\`\`\`python
import os

def lambda_handler(event, context):
    # Variables de entorno configuradas en la Lambda
    env = os.environ.get('ENVIRONMENT', 'dev')
    output_bucket = os.environ.get('OUTPUT_BUCKET')
    silver_prefix = os.environ.get('SILVER_PREFIX', 'silver/')
    
    # NUNCA guardar secrets en env vars - usar Secrets Manager
    # ❌ db_password = os.environ['DB_PASSWORD']
    # ✅ Usar Secrets Manager (ver Step 9)
\`\`\`

### Ciclo de Vida del Contenedor
\`\`\`
Cold Start (primera ejecución):
  1. AWS descarga tu código
  2. Crea contenedor
  3. Ejecuta código FUERA del handler (imports, conexiones)
  4. Ejecuta el handler

Warm Invocation (siguiente ejecución en ~15 min):
  1. Reutiliza el contenedor existente
  2. Ejecuta SOLO el handler (mucho más rápido)
  3. Variables globales mantienen su valor
\`\`\`

### Best Practice: Init Code vs Handler Code
\`\`\`python
import boto3
import json

# ✅ INIT CODE - se ejecuta una vez, se reutiliza
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['STATE_TABLE'])

def lambda_handler(event, context):
    # ✅ HANDLER CODE - se ejecuta cada invocación
    for record in event['Records']:
        process_record(record)
\`\`\``,
      en: `## Anatomy of a Lambda

### Handler Structure
\`\`\`python
import json
import boto3

# Code OUTSIDE the handler runs ONCE (on cold start)
# Ideal for: DB connections, boto3 clients, configuration
s3_client = boto3.client('s3')

def lambda_handler(event, context):
    """
    event: dict with trigger data (S3, SQS, API Gateway, etc.)
    context: object with execution metadata
    """
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    response = s3_client.get_object(Bucket=bucket, Key=key)
    data = response['Body'].read().decode('utf-8')
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': f'Processed: {key}',
            'rows': len(data.split('\\n'))
        })
    }
\`\`\`

### Lifecycle: Init Code vs Handler Code
\`\`\`python
import boto3

# ✅ INIT CODE - runs once, reused across invocations
s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')

def lambda_handler(event, context):
    # ✅ HANDLER CODE - runs every invocation
    for record in event['Records']:
        process_record(record)
\`\`\``,
      pt: `## Anatomia de uma Lambda

### Estrutura do Handler
\`\`\`python
import json
import boto3

# Código FORA do handler executa UMA VEZ (no cold start)
# Ideal para: conexões a DB, clientes boto3, configuração
s3_client = boto3.client('s3')

def lambda_handler(event, context):
    """
    event: dict com dados do trigger (S3, SQS, API Gateway, etc.)
    context: objeto com metadata da execução
    """
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    response = s3_client.get_object(Bucket=bucket, Key=key)
    data = response['Body'].read().decode('utf-8')
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': f'Processado: {key}',
            'rows': len(data.split('\\n'))
        })
    }
\`\`\``
    },
    practicalTips: [
      { es: '⚡ Pon clientes boto3 FUERA del handler - se reutilizan en warm invocations', en: '⚡ Put boto3 clients OUTSIDE the handler - they are reused in warm invocations', pt: '⚡ Coloque clientes boto3 FORA do handler - são reutilizados em warm invocations' },
      { es: '🔒 NUNCA pongas secrets en environment variables - usa Secrets Manager', en: '🔒 NEVER put secrets in environment variables - use Secrets Manager', pt: '🔒 NUNCA coloque secrets em environment variables - use Secrets Manager' }
    ],
    interviewTips: [
      { es: '🎯 "¿Dónde inicializarías una conexión a base de datos en Lambda?" → FUERA del handler, como variable global. Se ejecuta en cold start y se reutiliza en warm invocations. Esto reduce latencia de 500ms a 5ms en llamadas subsecuentes.', en: '🎯 "Where would you initialize a database connection in Lambda?" → OUTSIDE the handler, as a global variable. It runs on cold start and is reused in warm invocations. This reduces latency from 500ms to 5ms in subsequent calls.', pt: '🎯 "Onde você inicializaria uma conexão a banco de dados no Lambda?" → FORA do handler, como variável global. Executa no cold start e é reutilizada em warm invocations. Isso reduz latência de 500ms para 5ms em chamadas subsequentes.' },
      { es: '🎯 "¿Qué es context.get_remaining_time_in_millis() y para qué sirve?" → Retorna el tiempo restante antes del timeout. Esencial para hacer graceful shutdown: si quedan < 30s, guardar progreso y retornar en lugar de morir por timeout.', en: '🎯 "What is context.get_remaining_time_in_millis() and what is it for?" → Returns remaining time before timeout. Essential for graceful shutdown: if < 30s remain, save progress and return instead of dying by timeout.', pt: '🎯 "O que é context.get_remaining_time_in_millis() e para que serve?" → Retorna o tempo restante antes do timeout. Essencial para graceful shutdown: se restam < 30s, salvar progresso e retornar em vez de morrer por timeout.' }
    ],
    externalLinks: [
      { title: 'Lambda Handler in Python', url: 'https://docs.aws.amazon.com/lambda/latest/dg/python-handler.html', type: 'aws_docs' },
      { title: 'Lambda Context Object', url: 'https://docs.aws.amazon.com/lambda/latest/dg/python-context.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Entiendes la diferencia entre init code (fuera del handler) y handler code?', en: '✅ Do you understand the difference between init code (outside handler) and handler code?', pt: '✅ Você entende a diferença entre init code (fora do handler) e handler code?' },
    xpReward: 55,
    estimatedMinutes: 35,
    services: ['Lambda']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 3: Cold Starts
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-3',
    stepNumber: 203,
    title: {
      es: 'Cold Starts: El Problema y las Soluciones',
      en: 'Cold Starts: The Problem and Solutions',
      pt: 'Cold Starts: O Problema e as Soluções'
    },
    description: {
      es: 'Entender qué son los cold starts, su impacto real en Data Engineering, y cómo mitigarlos.',
      en: 'Understand what cold starts are, their real impact on Data Engineering, and how to mitigate them.',
      pt: 'Entender o que são cold starts, seu impacto real em Data Engineering, e como mitigá-los.'
    },
    theory: {
      es: `## Cold Starts en Lambda

### ¿Qué es un Cold Start?
Cuando no hay un contenedor "caliente" disponible, AWS debe:
1. Descargar tu código (o imagen Docker)
2. Crear un nuevo micro-VM (Firecracker)
3. Inicializar el runtime (Python, Node, Java)
4. Ejecutar tu código de inicialización (imports, conexiones)
5. ENTONCES ejecutar tu handler

### Tiempos Típicos de Cold Start
| Runtime | Sin VPC | Con VPC |
|---------|---------|---------|
| Python | 200-500ms | 500ms-2s |
| Node.js | 100-300ms | 400ms-1.5s |
| Java | 1-5s | 3-10s |
| Docker image | 2-10s | 5-15s |

### ¿Cold Starts importan en Data Engineering?
**En la mayoría de casos, NO son un problema** porque:
- Un pipeline ETL tarda minutos, no milisegundos
- Si Lambda procesa un archivo de 100MB, el cold start de 500ms es irrelevante
- Los pipelines batch no tienen requisitos de latencia estrictos

**Sí importan cuando:**
- Procesas miles de archivos pequeños (cada uno dispara un cold start)
- Tienes un pipeline near-real-time (< 1 segundo de latencia requerida)
- Usas VPC (añade segundos al cold start)

### Mitigación
\`\`\`python
# 1. Provisioned Concurrency (mantiene N contenedores calientes)
# aws lambda put-provisioned-concurrency-config \\
#   --function-name my-etl \\
#   --qualifier PROD \\
#   --provisioned-concurrent-executions 5

# 2. Minimizar imports (no importes todo pandas si solo necesitas read_csv)
# ❌ import pandas as pd  (importa TODO pandas)
# ✅ from pandas import read_csv  (solo lo necesario)

# 3. Evitar VPC si no es necesario
# Lambda puede acceder a S3, SQS, DynamoDB SIN VPC
# Solo necesitas VPC para: RDS, Redshift, ElastiCache
\`\`\`

### SnapStart (Java) y Provisioned Concurrency
- **SnapStart**: Toma un snapshot del contenedor inicializado. Solo Java.
- **Provisioned Concurrency**: Mantiene N contenedores calientes. Cuesta más pero elimina cold starts. Usar solo si la latencia es crítica.`,
      en: `## Cold Starts in Lambda

### What is a Cold Start?
When no "warm" container is available, AWS must:
1. Download your code (or Docker image)
2. Create a new micro-VM (Firecracker)
3. Initialize the runtime (Python, Node, Java)
4. Run your initialization code (imports, connections)
5. THEN execute your handler

### Do Cold Starts Matter in Data Engineering?
**In most cases, NO** because:
- An ETL pipeline takes minutes, not milliseconds
- If Lambda processes a 100MB file, the 500ms cold start is irrelevant
- Batch pipelines don't have strict latency requirements

**They DO matter when:**
- Processing thousands of small files (each triggers a cold start)
- Near-real-time pipeline (< 1 second latency required)
- Using VPC (adds seconds to cold start)`,
      pt: `## Cold Starts no Lambda

### O que é um Cold Start?
Quando não há um container "quente" disponível, a AWS deve:
1. Baixar seu código (ou imagem Docker)
2. Criar uma nova micro-VM (Firecracker)
3. Inicializar o runtime (Python, Node, Java)
4. Executar seu código de inicialização (imports, conexões)
5. ENTÃO executar seu handler

### Cold Starts importam em Data Engineering?
**Na maioria dos casos, NÃO** porque:
- Um pipeline ETL demora minutos, não milissegundos
- Se Lambda processa um arquivo de 100MB, o cold start de 500ms é irrelevante
- Pipelines batch não têm requisitos de latência estritos`
    },
    practicalTips: [
      { es: '🧊 Para Data Engineering, los cold starts raramente son un problema - tus pipelines tardan minutos, no milisegundos', en: '🧊 For Data Engineering, cold starts are rarely a problem - your pipelines take minutes, not milliseconds', pt: '🧊 Para Data Engineering, cold starts raramente são um problema - seus pipelines demoram minutos, não milissegundos' },
      { es: '🔌 Evita VPC en Lambda a menos que necesites acceder a RDS/Redshift - S3, DynamoDB y SQS no requieren VPC', en: '🔌 Avoid VPC in Lambda unless you need to access RDS/Redshift - S3, DynamoDB and SQS don\'t require VPC', pt: '🔌 Evite VPC no Lambda a menos que precise acessar RDS/Redshift - S3, DynamoDB e SQS não requerem VPC' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo mitigarías cold starts en una Lambda que procesa eventos en tiempo real?" → 1) Provisioned Concurrency para mantener N contenedores calientes. 2) Minimizar el tamaño del deployment package. 3) Evitar VPC si no es necesario. 4) Usar SnapStart si es Java. 5) Para Data Engineering batch, cold starts suelen ser irrelevantes.', en: '🎯 "How would you mitigate cold starts in a Lambda that processes real-time events?" → 1) Provisioned Concurrency. 2) Minimize deployment package size. 3) Avoid VPC if not necessary. 4) Use SnapStart for Java. 5) For batch Data Engineering, cold starts are usually irrelevant.', pt: '🎯 "Como você mitigaria cold starts em uma Lambda que processa eventos em tempo real?" → 1) Provisioned Concurrency. 2) Minimizar tamanho do deployment package. 3) Evitar VPC se não necessário. 4) Usar SnapStart para Java. 5) Para Data Engineering batch, cold starts geralmente são irrelevantes.' },
      { es: '🎯 "¿Lambda necesita VPC para acceder a S3?" → NO. S3, DynamoDB, SQS, SNS, Kinesis son servicios públicos de AWS accesibles sin VPC. Solo necesitas VPC para recursos privados como RDS, Redshift, ElastiCache o APIs internas.', en: '🎯 "Does Lambda need VPC to access S3?" → NO. S3, DynamoDB, SQS, SNS, Kinesis are public AWS services accessible without VPC. You only need VPC for private resources like RDS, Redshift, ElastiCache or internal APIs.', pt: '🎯 "Lambda precisa de VPC para acessar S3?" → NÃO. S3, DynamoDB, SQS, SNS, Kinesis são serviços públicos da AWS acessíveis sem VPC. Você só precisa de VPC para recursos privados como RDS, Redshift, ElastiCache ou APIs internas.' }
    ],
    externalLinks: [
      { title: 'Lambda Cold Starts', url: 'https://docs.aws.amazon.com/lambda/latest/operatorguide/execution-environments.html', type: 'aws_docs' },
      { title: 'Provisioned Concurrency', url: 'https://docs.aws.amazon.com/lambda/latest/dg/provisioned-concurrency.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Puedes explicar por qué los cold starts suelen ser irrelevantes en Data Engineering?', en: '✅ Can you explain why cold starts are usually irrelevant in Data Engineering?', pt: '✅ Você consegue explicar por que cold starts geralmente são irrelevantes em Data Engineering?' },
    xpReward: 50,
    estimatedMinutes: 25,
    services: ['Lambda']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 4: Límites y Configuración
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-4',
    stepNumber: 204,
    title: {
      es: 'Límites y Configuración de Lambda',
      en: 'Lambda Limits and Configuration',
      pt: 'Limites e Configuração do Lambda'
    },
    description: {
      es: 'Conocer los límites técnicos de Lambda y cómo configurar memoria, timeout, concurrencia y storage.',
      en: 'Know Lambda technical limits and how to configure memory, timeout, concurrency and storage.',
      pt: 'Conhecer os limites técnicos do Lambda e como configurar memória, timeout, concorrência e storage.'
    },
    theory: {
      es: `## Límites de Lambda

### Límites Críticos para Data Engineering
\`\`\`
Memoria:           128 MB → 10,240 MB (10 GB)
Timeout:           1 segundo → 15 minutos
Payload (sync):    6 MB (request y response)
Payload (async):   256 KB
Deployment pkg:    50 MB (zip) / 250 MB (descomprimido)
Container image:   10 GB
Ephemeral storage: 512 MB → 10,240 MB (/tmp)
Concurrencia:      1,000 por región (ajustable)
\`\`\`

### Memory = CPU
Lambda no permite configurar CPU directamente. **Más memoria = más CPU**:
\`\`\`
128 MB  → ~1/8 vCPU (muy lento para pandas)
512 MB  → ~1/3 vCPU
1024 MB → ~0.6 vCPU (mínimo recomendado para ETL)
1769 MB → 1 vCPU completa
3008 MB → 2 vCPU
10240 MB → 6 vCPU (máximo poder)
\`\`\`

### Configurar via CLI
\`\`\`bash
# Crear función
aws lambda create-function \\
  --function-name etl-bronze-to-silver \\
  --runtime python3.12 \\
  --handler lambda_function.lambda_handler \\
  --role arn:aws:iam::123456789012:role/LambdaETLRole \\
  --zip-file fileb://function.zip \\
  --memory-size 1024 \\
  --timeout 300 \\
  --ephemeral-storage '{"Size": 2048}' \\
  --environment 'Variables={ENVIRONMENT=prod,OUTPUT_BUCKET=my-datalake}'

# Actualizar configuración
aws lambda update-function-configuration \\
  --function-name etl-bronze-to-silver \\
  --memory-size 2048 \\
  --timeout 600
\`\`\`

### Cuándo Lambda NO es suficiente
- Procesamiento > 15 minutos → **Fargate**
- Archivo > 10 GB en memoria → **Fargate**
- Dependencias > 250 MB → **Container image** o **Fargate**
- Procesamiento con GPU → **SageMaker** o **EC2**`,
      en: `## Lambda Limits

### Critical Limits for Data Engineering
\`\`\`
Memory:           128 MB → 10,240 MB (10 GB)
Timeout:          1 second → 15 minutes
Payload (sync):   6 MB (request and response)
Payload (async):  256 KB
Deployment pkg:   50 MB (zip) / 250 MB (uncompressed)
Container image:  10 GB
Ephemeral storage: 512 MB → 10,240 MB (/tmp)
Concurrency:      1,000 per region (adjustable)
\`\`\`

### Memory = CPU
Lambda doesn't allow configuring CPU directly. **More memory = more CPU**:
\`\`\`
128 MB  → ~1/8 vCPU (very slow for pandas)
1024 MB → ~0.6 vCPU (minimum recommended for ETL)
1769 MB → 1 full vCPU
10240 MB → 6 vCPU (maximum power)
\`\`\`

### When Lambda is NOT enough
- Processing > 15 minutes → **Fargate**
- File > 10 GB in memory → **Fargate**
- Dependencies > 250 MB → **Container image** or **Fargate**`,
      pt: `## Limites do Lambda

### Limites Críticos para Data Engineering
\`\`\`
Memória:          128 MB → 10.240 MB (10 GB)
Timeout:          1 segundo → 15 minutos
Payload (sync):   6 MB (request e response)
Deployment pkg:   50 MB (zip) / 250 MB (descomprimido)
Container image:  10 GB
Ephemeral storage: 512 MB → 10.240 MB (/tmp)
Concorrência:     1.000 por região (ajustável)
\`\`\`

### Memória = CPU
Lambda não permite configurar CPU diretamente. **Mais memória = mais CPU**.

### Quando Lambda NÃO é suficiente
- Processamento > 15 minutos → **Fargate**
- Arquivo > 10 GB em memória → **Fargate**`
    },
    practicalTips: [
      { es: '🧠 Para ETL con pandas, usa mínimo 1024 MB de memoria - por debajo es demasiado lento', en: '🧠 For ETL with pandas, use minimum 1024 MB memory - below that is too slow', pt: '🧠 Para ETL com pandas, use mínimo 1024 MB de memória - abaixo disso é muito lento' },
      { es: '💾 Usa /tmp (ephemeral storage hasta 10GB) para archivos temporales grandes', en: '💾 Use /tmp (ephemeral storage up to 10GB) for large temporary files', pt: '💾 Use /tmp (ephemeral storage até 10GB) para arquivos temporários grandes' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo procesarías un archivo de 5GB en Lambda?" → 1) Configurar 10GB de memoria y 10GB de ephemeral storage. 2) Descargar a /tmp. 3) Procesar con pandas en chunks. 4) Si tarda > 15 min, mover a Fargate.', en: '🎯 "How would you process a 5GB file in Lambda?" → 1) Configure 10GB memory and 10GB ephemeral storage. 2) Download to /tmp. 3) Process with pandas in chunks. 4) If > 15 min, move to Fargate.', pt: '🎯 "Como você processaria um arquivo de 5GB no Lambda?" → 1) Configurar 10GB de memória e 10GB de ephemeral storage. 2) Baixar para /tmp. 3) Processar com pandas em chunks. 4) Se demorar > 15 min, mover para Fargate.' },
      { es: '🎯 "¿Cómo controlarías que Lambda no escale a miles de ejecuciones y genere costos?" → Reserved Concurrency: limitar a N ejecuciones máximas. Esto también protege servicios downstream como Redshift de ser bombardeados.', en: '🎯 "How would you prevent Lambda from scaling to thousands of executions and generating costs?" → Reserved Concurrency: limit to N maximum executions. This also protects downstream services like Redshift from being overwhelmed.', pt: '🎯 "Como você controlaria que Lambda não escale a milhares de execuções e gere custos?" → Reserved Concurrency: limitar a N execuções máximas. Isso também protege serviços downstream como Redshift de serem sobrecarregados.' }
    ],
    externalLinks: [
      { title: 'Lambda Quotas', url: 'https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html', type: 'aws_docs' },
      { title: 'Lambda Configuration', url: 'https://docs.aws.amazon.com/lambda/latest/dg/configuration-function-common.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Sabes cuánta memoria configurar para ETL con pandas y cuándo Lambda no es suficiente?', en: '✅ Do you know how much memory to configure for ETL with pandas and when Lambda is not enough?', pt: '✅ Você sabe quanta memória configurar para ETL com pandas e quando Lambda não é suficiente?' },
    xpReward: 55,
    estimatedMinutes: 30,
    services: ['Lambda']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 5: S3 Trigger como Motor de Ingesta
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-5',
    stepNumber: 205,
    title: {
      es: 'S3 Trigger: El Motor de Ingesta del Data Lake',
      en: 'S3 Trigger: The Data Lake Ingestion Engine',
      pt: 'S3 Trigger: O Motor de Ingestão do Data Lake'
    },
    description: {
      es: 'Configurar S3 Event Notifications para que Lambda se ejecute automáticamente cuando un archivo llega al Data Lake.',
      en: 'Configure S3 Event Notifications so Lambda runs automatically when a file arrives at the Data Lake.',
      pt: 'Configurar S3 Event Notifications para que Lambda execute automaticamente quando um arquivo chega no Data Lake.'
    },
    theory: {
      es: `## S3 Trigger → Lambda

### El Patrón Más Importante en Data Engineering Serverless
\`\`\`
Fuente de datos         S3 Bronze          Lambda             S3 Silver
(API, SFTP, App) ────▶ sales.csv ────▶ valida + limpia ────▶ sales.parquet
                        ↑                    ↑
                   S3 Event            Automático, sin
                   Notification        cron, sin polling
\`\`\`

### Eventos S3 Disponibles
- \`s3:ObjectCreated:*\` → Cualquier creación (PUT, POST, COPY, multipart)
- \`s3:ObjectCreated:Put\` → Solo PUT
- \`s3:ObjectRemoved:*\` → Borrado
- \`s3:ObjectRestore:Completed\` → Restauración de Glacier

### Estructura del Evento S3
\`\`\`python
# Esto es lo que Lambda recibe como 'event':
{
  "Records": [{
    "eventSource": "aws:s3",
    "eventName": "ObjectCreated:Put",
    "s3": {
      "bucket": {
        "name": "mi-datalake-123456",
        "arn": "arn:aws:s3:::mi-datalake-123456"
      },
      "object": {
        "key": "bronze/sales/year=2024/month=12/day=15/sales_20241215.csv",
        "size": 1048576,
        "eTag": "abc123..."
      }
    }
  }]
}
\`\`\`

### Configurar S3 Trigger via CLI
\`\`\`bash
# 1. Dar permiso a S3 para invocar Lambda
aws lambda add-permission \\
  --function-name etl-bronze-to-silver \\
  --statement-id s3-trigger \\
  --action lambda:InvokeFunction \\
  --principal s3.amazonaws.com \\
  --source-arn arn:aws:s3:::mi-datalake-123456 \\
  --source-account 123456789012

# 2. Configurar notificación en el bucket
aws s3api put-bucket-notification-configuration \\
  --bucket mi-datalake-123456 \\
  --notification-configuration '{
    "LambdaFunctionConfigurations": [{
      "Id": "BronzeIngestion",
      "LambdaFunctionArn": "arn:aws:lambda:us-east-1:123456789012:function:etl-bronze-to-silver",
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {
        "Key": {
          "FilterRules": [
            {"Name": "prefix", "Value": "bronze/"},
            {"Name": "suffix", "Value": ".csv"}
          ]
        }
      }
    }]
  }'
\`\`\`

### Filtros Importantes
- **prefix**: Solo archivos en \`bronze/\` (no disparar con \`silver/\` o \`gold/\`)
- **suffix**: Solo \`.csv\` (no disparar con \`.parquet\` o \`_SUCCESS\`)
- **⚠️ CUIDADO**: Si Lambda escribe en el MISMO bucket sin filtros, creas un loop infinito

### EventBridge como Alternativa (Recomendado)
\`\`\`bash
# EventBridge ofrece filtros más granulares que S3 notifications
aws s3api put-bucket-notification-configuration \\
  --bucket mi-datalake \\
  --notification-configuration '{"EventBridgeConfiguration": {}}'

# Luego crear regla en EventBridge con filtros avanzados
aws events put-rule \\
  --name bronze-csv-ingestion \\
  --event-pattern '{
    "source": ["aws.s3"],
    "detail-type": ["Object Created"],
    "detail": {
      "bucket": {"name": ["mi-datalake"]},
      "object": {"key": [{"prefix": "bronze/"}, {"suffix": ".csv"}]}
    }
  }'
\`\`\``,
      en: `## S3 Trigger → Lambda

### The Most Important Pattern in Serverless Data Engineering
\`\`\`
Data source          S3 Bronze          Lambda             S3 Silver
(API, SFTP, App) ──▶ sales.csv ──────▶ validate+clean ──▶ sales.parquet
                      ↑                    ↑
                 S3 Event            Automatic, no
                 Notification        cron, no polling
\`\`\`

### S3 Event Structure
\`\`\`python
# This is what Lambda receives as 'event':
{
  "Records": [{
    "s3": {
      "bucket": {"name": "my-datalake-123456"},
      "object": {
        "key": "bronze/sales/year=2024/month=12/day=15/sales_20241215.csv",
        "size": 1048576
      }
    }
  }]
}
\`\`\`

### Configure via CLI
\`\`\`bash
aws s3api put-bucket-notification-configuration \\
  --bucket my-datalake-123456 \\
  --notification-configuration '{
    "LambdaFunctionConfigurations": [{
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {"Key": {"FilterRules": [
        {"Name": "prefix", "Value": "bronze/"},
        {"Name": "suffix", "Value": ".csv"}
      ]}}
    }]
  }'
\`\`\``,
      pt: `## S3 Trigger → Lambda

### O Padrão Mais Importante em Data Engineering Serverless
\`\`\`
Fonte de dados       S3 Bronze          Lambda             S3 Silver
(API, SFTP, App) ──▶ sales.csv ──────▶ valida+limpa ────▶ sales.parquet
\`\`\`

### Configurar via CLI
\`\`\`bash
aws s3api put-bucket-notification-configuration \\
  --bucket meu-datalake \\
  --notification-configuration '{
    "LambdaFunctionConfigurations": [{
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {"Key": {"FilterRules": [
        {"Name": "prefix", "Value": "bronze/"},
        {"Name": "suffix", "Value": ".csv"}
      ]}}
    }]
  }'
\`\`\``
    },
    practicalTips: [
      { es: '⚠️ SIEMPRE usa filtros de prefix y suffix - si Lambda escribe en el mismo bucket sin filtros, creas un LOOP INFINITO', en: '⚠️ ALWAYS use prefix and suffix filters - if Lambda writes to the same bucket without filters, you create an INFINITE LOOP', pt: '⚠️ SEMPRE use filtros de prefix e suffix - se Lambda escreve no mesmo bucket sem filtros, você cria um LOOP INFINITO' },
      { es: '📦 Usa EventBridge en lugar de S3 Notifications para filtros más granulares y multi-target', en: '📦 Use EventBridge instead of S3 Notifications for more granular filters and multi-target', pt: '📦 Use EventBridge em vez de S3 Notifications para filtros mais granulares e multi-target' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo evitarías un loop infinito si Lambda lee y escribe en el mismo bucket?" → 1) Usar prefijos diferentes: leer de bronze/, escribir en silver/. 2) Configurar suffix filter para .csv (Lambda escribe .parquet). 3) Mejor: usar buckets separados para input/output.', en: '🎯 "How would you avoid an infinite loop if Lambda reads and writes to the same bucket?" → 1) Use different prefixes: read from bronze/, write to silver/. 2) Configure suffix filter for .csv (Lambda writes .parquet). 3) Better: use separate buckets for input/output.', pt: '🎯 "Como você evitaria um loop infinito se Lambda lê e escreve no mesmo bucket?" → 1) Usar prefixos diferentes: ler de bronze/, escrever em silver/. 2) Configurar suffix filter para .csv (Lambda escreve .parquet). 3) Melhor: usar buckets separados para input/output.' },
      { es: '🎯 "¿Qué pasa si S3 recibe 10,000 archivos en 1 segundo?" → S3 genera 10,000 eventos. Lambda escala a 10,000 ejecuciones concurrentes (dentro del límite de cuenta). Usa Reserved Concurrency si quieres limitar.', en: '🎯 "What happens if S3 receives 10,000 files in 1 second?" → S3 generates 10,000 events. Lambda scales to 10,000 concurrent executions (within account limit). Use Reserved Concurrency to limit.', pt: '🎯 "O que acontece se S3 recebe 10.000 arquivos em 1 segundo?" → S3 gera 10.000 eventos. Lambda escala para 10.000 execuções concorrentes (dentro do limite da conta). Use Reserved Concurrency para limitar.' }
    ],
    externalLinks: [
      { title: 'S3 Event Notifications', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/NotificationHowTo.html', type: 'aws_docs' },
      { title: 'Lambda with S3', url: 'https://docs.aws.amazon.com/lambda/latest/dg/with-s3.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Configuraste un S3 trigger que solo dispara con archivos .csv en bronze/?', en: '✅ Did you configure an S3 trigger that only fires for .csv files in bronze/?', pt: '✅ Você configurou um S3 trigger que só dispara com arquivos .csv em bronze/?' },
    xpReward: 65,
    estimatedMinutes: 40,
    services: ['Lambda', 'S3']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 6: Lambda para Bronze → Silver
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-6',
    stepNumber: 206,
    title: {
      es: 'Lambda ETL: Bronze → Silver (Validar, Limpiar, Parquet)',
      en: 'Lambda ETL: Bronze → Silver (Validate, Clean, Parquet)',
      pt: 'Lambda ETL: Bronze → Silver (Validar, Limpar, Parquet)'
    },
    description: {
      es: 'Crear una Lambda completa que detecta un CSV en Bronze, valida el schema, limpia los datos y escribe Parquet en Silver.',
      en: 'Create a complete Lambda that detects a CSV in Bronze, validates the schema, cleans data and writes Parquet to Silver.',
      pt: 'Criar uma Lambda completa que detecta um CSV em Bronze, valida o schema, limpa os dados e escreve Parquet em Silver.'
    },
    theory: {
      es: `## Lambda ETL: El Pipeline Bronze → Silver

### Código Completo del Handler
\`\`\`python
import json
import os
import io
import boto3
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
from datetime import datetime

s3 = boto3.client('s3')
OUTPUT_BUCKET = os.environ.get('OUTPUT_BUCKET', os.environ.get('BUCKET'))
SILVER_PREFIX = os.environ.get('SILVER_PREFIX', 'silver/')

# Schema esperado
EXPECTED_COLUMNS = {
    'order_id': 'int64',
    'customer_id': 'int64',
    'product': 'str',
    'quantity': 'int64',
    'price': 'float64',
    'order_date': 'str'
}

def lambda_handler(event, context):
    """
    Trigger: S3 ObjectCreated en bronze/*.csv
    1. Lee CSV de Bronze
    2. Valida schema (columnas y tipos)
    3. Limpia datos (nulls, duplicados, tipos)
    4. Escribe Parquet particionado en Silver
    """
    try:
        # Extraer info del evento S3
        record = event['Records'][0]
        source_bucket = record['s3']['bucket']['name']
        source_key = record['s3']['object']['key']
        file_size = record['s3']['object'].get('size', 0)
        
        print(f"Procesando: s3://{source_bucket}/{source_key} ({file_size} bytes)")
        
        # 1. LEER CSV de Bronze
        response = s3.get_object(Bucket=source_bucket, Key=source_key)
        df = pd.read_csv(io.BytesIO(response['Body'].read()))
        rows_original = len(df)
        print(f"Filas leídas: {rows_original}")
        
        # 2. VALIDAR schema
        missing_cols = set(EXPECTED_COLUMNS.keys()) - set(df.columns)
        if missing_cols:
            raise ValueError(f"Columnas faltantes: {missing_cols}")
        
        # 3. LIMPIAR datos
        # Remover duplicados
        df = df.drop_duplicates(subset=['order_id'])
        
        # Remover filas con nulls en columnas críticas
        df = df.dropna(subset=['order_id', 'customer_id', 'product'])
        
        # Convertir tipos
        df['order_id'] = df['order_id'].astype('int64')
        df['customer_id'] = df['customer_id'].astype('int64')
        df['price'] = pd.to_numeric(df['price'], errors='coerce').fillna(0)
        df['quantity'] = pd.to_numeric(df['quantity'], errors='coerce').fillna(0).astype('int64')
        
        # Agregar metadata de procesamiento
        df['_processed_at'] = datetime.utcnow().isoformat()
        df['_source_file'] = source_key
        
        rows_clean = len(df)
        rows_removed = rows_original - rows_clean
        print(f"Filas limpias: {rows_clean} (removidas: {rows_removed})")
        
        # 4. ESCRIBIR Parquet particionado en Silver
        # Extraer fecha para partición
        now = datetime.utcnow()
        partition_path = f"year={now.year}/month={now.month:02d}/day={now.day:02d}"
        
        # Generar nombre de archivo único
        file_name = source_key.split('/')[-1].replace('.csv', '.parquet')
        output_key = f"{SILVER_PREFIX}orders/{partition_path}/{file_name}"
        
        # Convertir a Parquet
        table = pa.Table.from_pandas(df)
        buffer = io.BytesIO()
        pq.write_table(table, buffer, compression='snappy')
        buffer.seek(0)
        
        # Subir a Silver
        output_bucket = OUTPUT_BUCKET or source_bucket
        s3.put_object(
            Bucket=output_bucket,
            Key=output_key,
            Body=buffer.getvalue(),
            ContentType='application/octet-stream'
        )
        
        result = {
            'status': 'success',
            'source': f"s3://{source_bucket}/{source_key}",
            'destination': f"s3://{output_bucket}/{output_key}",
            'rows_original': rows_original,
            'rows_clean': rows_clean,
            'rows_removed': rows_removed,
            'output_format': 'parquet/snappy'
        }
        print(f"Resultado: {json.dumps(result)}")
        return result
        
    except Exception as e:
        print(f"ERROR: {str(e)}")
        raise
\`\`\`

### ¿Por qué Parquet y no CSV?
| Característica | CSV | Parquet |
|---------------|-----|---------|
| Tamaño | 100 MB | ~15 MB (85% menos) |
| Lectura columnar | ❌ Lee todo | ✅ Solo columnas necesarias |
| Tipos de datos | Todo es string | Tipado fuerte |
| Costo Athena | $5/TB escaneado | $0.75/TB (85% menos) |
| Compresión | Ninguna/Gzip | Snappy (rápida) |`,
      en: `## Lambda ETL: The Bronze → Silver Pipeline

### Complete Handler Code
\`\`\`python
import json, os, io, boto3
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
from datetime import datetime

s3 = boto3.client('s3')

EXPECTED_COLUMNS = {
    'order_id': 'int64', 'customer_id': 'int64',
    'product': 'str', 'quantity': 'int64',
    'price': 'float64', 'order_date': 'str'
}

def lambda_handler(event, context):
    record = event['Records'][0]
    bucket = record['s3']['bucket']['name']
    key = record['s3']['object']['key']
    
    # 1. Read CSV from Bronze
    response = s3.get_object(Bucket=bucket, Key=key)
    df = pd.read_csv(io.BytesIO(response['Body'].read()))
    
    # 2. Validate schema
    missing = set(EXPECTED_COLUMNS.keys()) - set(df.columns)
    if missing: raise ValueError(f"Missing columns: {missing}")
    
    # 3. Clean data
    df = df.drop_duplicates(subset=['order_id'])
    df = df.dropna(subset=['order_id', 'customer_id'])
    df['_processed_at'] = datetime.utcnow().isoformat()
    
    # 4. Write Parquet to Silver
    now = datetime.utcnow()
    output_key = f"silver/orders/year={now.year}/month={now.month:02d}/day={now.day:02d}/{key.split('/')[-1].replace('.csv','.parquet')}"
    
    table = pa.Table.from_pandas(df)
    buffer = io.BytesIO()
    pq.write_table(table, buffer, compression='snappy')
    buffer.seek(0)
    
    s3.put_object(Bucket=bucket, Key=output_key, Body=buffer.getvalue())
    return {'status': 'success', 'rows': len(df)}
\`\`\``,
      pt: `## Lambda ETL: O Pipeline Bronze → Silver

### Código Completo do Handler
\`\`\`python
import json, os, io, boto3
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
from datetime import datetime

s3 = boto3.client('s3')

def lambda_handler(event, context):
    record = event['Records'][0]
    bucket = record['s3']['bucket']['name']
    key = record['s3']['object']['key']
    
    # 1. Ler CSV do Bronze
    response = s3.get_object(Bucket=bucket, Key=key)
    df = pd.read_csv(io.BytesIO(response['Body'].read()))
    
    # 2. Validar schema
    # 3. Limpar dados (duplicados, nulls, tipos)
    df = df.drop_duplicates(subset=['order_id'])
    df = df.dropna(subset=['order_id', 'customer_id'])
    
    # 4. Escrever Parquet particionado no Silver
    now = datetime.utcnow()
    output_key = f"silver/orders/year={now.year}/month={now.month:02d}/day={now.day:02d}/data.parquet"
    
    table = pa.Table.from_pandas(df)
    buffer = io.BytesIO()
    pq.write_table(table, buffer, compression='snappy')
    buffer.seek(0)
    
    s3.put_object(Bucket=bucket, Key=output_key, Body=buffer.getvalue())
    return {'status': 'success', 'rows': len(df)}
\`\`\``
    },
    practicalTips: [
      { es: '📦 Parquet reduce costos de Athena un 85% vs CSV - SIEMPRE convierte en Silver', en: '📦 Parquet reduces Athena costs 85% vs CSV - ALWAYS convert in Silver', pt: '📦 Parquet reduz custos do Athena 85% vs CSV - SEMPRE converta no Silver' },
      { es: '📅 Particiona por fecha (year/month/day) - es el estándar de la industria', en: '📅 Partition by date (year/month/day) - it is the industry standard', pt: '📅 Particione por data (year/month/day) - é o padrão da indústria' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo convertirías CSV a Parquet en Lambda?" → Leer con pandas, convertir con pyarrow, escribir a buffer en memoria, subir a S3. Usar compresión Snappy para balance entre velocidad y tamaño.', en: '🎯 "How would you convert CSV to Parquet in Lambda?" → Read with pandas, convert with pyarrow, write to in-memory buffer, upload to S3. Use Snappy compression for balance between speed and size.', pt: '🎯 "Como você converteria CSV para Parquet no Lambda?" → Ler com pandas, converter com pyarrow, escrever em buffer na memória, subir para S3. Usar compressão Snappy para balanço entre velocidade e tamanho.' },
      { es: '🎯 "¿Qué metadata agregarías al procesar datos en Silver?" → _processed_at (timestamp), _source_file (trazabilidad), _row_hash (deduplicación). Esto es lineage básico.', en: '🎯 "What metadata would you add when processing data in Silver?" → _processed_at (timestamp), _source_file (traceability), _row_hash (deduplication). This is basic lineage.', pt: '🎯 "Que metadata você adicionaria ao processar dados no Silver?" → _processed_at (timestamp), _source_file (rastreabilidade), _row_hash (deduplicação). Isso é lineage básico.' }
    ],
    externalLinks: [
      { title: 'Lambda with S3 Tutorial', url: 'https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html', type: 'aws_docs' },
      { title: 'PyArrow Documentation', url: 'https://arrow.apache.org/docs/python/', type: 'docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste una Lambda que lee CSV de Bronze, limpia y escribe Parquet en Silver?', en: '✅ Did you create a Lambda that reads CSV from Bronze, cleans and writes Parquet to Silver?', pt: '✅ Você criou uma Lambda que lê CSV do Bronze, limpa e escreve Parquet no Silver?' },
    xpReward: 80,
    estimatedMinutes: 50,
    services: ['Lambda', 'S3']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 7: Lambda Layers
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-7',
    stepNumber: 207,
    title: { es: 'Lambda Layers: Dependencias Compartidas', en: 'Lambda Layers: Shared Dependencies', pt: 'Lambda Layers: Dependências Compartilhadas' },
    description: { es: 'Crear y usar Layers para compartir pandas, pyarrow y otras dependencias entre funciones Lambda.', en: 'Create and use Layers to share pandas, pyarrow and other dependencies across Lambda functions.', pt: 'Criar e usar Layers para compartilhar pandas, pyarrow e outras dependências entre funções Lambda.' },
    theory: {
      es: `## Lambda Layers

### ¿Qué son?
Paquetes ZIP con código o dependencias que se montan en \`/opt/\` del contenedor Lambda. Permiten:
- Compartir dependencias entre múltiples funciones
- Reducir el tamaño del deployment package
- Versionar dependencias independientemente del código

### Crear Layer con pandas + pyarrow
\`\`\`bash
# 1. Crear directorio con estructura correcta
mkdir -p layer/python
pip install pandas pyarrow -t layer/python/ --platform manylinux2014_x86_64 --only-binary=:all:

# 2. Empaquetar
cd layer && zip -r ../pandas-layer.zip python/

# 3. Publicar layer
aws lambda publish-layer-version \\
  --layer-name pandas-pyarrow \\
  --zip-file fileb://pandas-layer.zip \\
  --compatible-runtimes python3.11 python3.12 \\
  --description "pandas 2.x + pyarrow para ETL"

# 4. Agregar layer a tu función
aws lambda update-function-configuration \\
  --function-name etl-bronze-to-silver \\
  --layers arn:aws:lambda:us-east-1:123456789012:layer:pandas-pyarrow:1
\`\`\`

### Layers Públicos Útiles
- **AWSSDKPandas** (aws-sdk-pandas): Layer oficial de AWS con pandas + awswrangler
- **ARN**: \`arn:aws:lambda:us-east-1:336392948345:layer:AWSSDKPandas-Python312:1\`

### Límites
- Máximo 5 layers por función
- Tamaño total descomprimido: 250 MB (incluyendo función + layers)
- Si necesitas más → usar Container Image (hasta 10 GB)`,
      en: `## Lambda Layers

### What are they?
ZIP packages with code or dependencies mounted at \`/opt/\` in the Lambda container. They allow:
- Sharing dependencies between multiple functions
- Reducing deployment package size
- Versioning dependencies independently from code

### Create Layer with pandas + pyarrow
\`\`\`bash
mkdir -p layer/python
pip install pandas pyarrow -t layer/python/ --platform manylinux2014_x86_64 --only-binary=:all:
cd layer && zip -r ../pandas-layer.zip python/

aws lambda publish-layer-version \\
  --layer-name pandas-pyarrow \\
  --zip-file fileb://pandas-layer.zip \\
  --compatible-runtimes python3.11 python3.12
\`\`\``,
      pt: `## Lambda Layers

### O que são?
Pacotes ZIP com código ou dependências montados em \`/opt/\` do container Lambda.

### Criar Layer com pandas + pyarrow
\`\`\`bash
mkdir -p layer/python
pip install pandas pyarrow -t layer/python/ --platform manylinux2014_x86_64 --only-binary=:all:
cd layer && zip -r ../pandas-layer.zip python/

aws lambda publish-layer-version \\
  --layer-name pandas-pyarrow \\
  --zip-file fileb://pandas-layer.zip \\
  --compatible-runtimes python3.11 python3.12
\`\`\``
    },
    practicalTips: [
      { es: '🎯 Usa el Layer oficial AWSSDKPandas de AWS - ya tiene pandas + pyarrow optimizados', en: '🎯 Use the official AWSSDKPandas Layer from AWS - it already has optimized pandas + pyarrow', pt: '🎯 Use o Layer oficial AWSSDKPandas da AWS - já tem pandas + pyarrow otimizados' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo usarías pandas en Lambda si el deployment package supera 50 MB?" → 1) Lambda Layer con pandas/pyarrow. 2) Layer oficial AWSSDKPandas. 3) Si supera 250 MB total, usar Container Image (hasta 10 GB).', en: '🎯 "How would you use pandas in Lambda if the deployment package exceeds 50 MB?" → 1) Lambda Layer with pandas/pyarrow. 2) Official AWSSDKPandas Layer. 3) If exceeds 250 MB total, use Container Image (up to 10 GB).', pt: '🎯 "Como você usaria pandas no Lambda se o deployment package exceder 50 MB?" → 1) Lambda Layer com pandas/pyarrow. 2) Layer oficial AWSSDKPandas. 3) Se exceder 250 MB total, usar Container Image (até 10 GB).' }
    ],
    externalLinks: [
      { title: 'Lambda Layers', url: 'https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html', type: 'aws_docs' },
      { title: 'AWS SDK Pandas Layer', url: 'https://aws-sdk-pandas.readthedocs.io/en/stable/layers.html', type: 'docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un Layer con pandas y lo agregaste a tu Lambda?', en: '✅ Did you create a Layer with pandas and add it to your Lambda?', pt: '✅ Você criou um Layer com pandas e adicionou ao seu Lambda?' },
    xpReward: 55, estimatedMinutes: 30, services: ['Lambda']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 8: Lambda + SQS/SNS
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-8',
    stepNumber: 208,
    title: { es: 'Lambda + SQS/SNS: Dead Letter Queues y Notificaciones', en: 'Lambda + SQS/SNS: Dead Letter Queues and Notifications', pt: 'Lambda + SQS/SNS: Dead Letter Queues e Notificações' },
    description: { es: 'Configurar Dead Letter Queues para errores, retry policies y notificaciones SNS para alertas del pipeline.', en: 'Configure Dead Letter Queues for errors, retry policies and SNS notifications for pipeline alerts.', pt: 'Configurar Dead Letter Queues para erros, retry policies e notificações SNS para alertas do pipeline.' },
    theory: {
      es: `## Error Handling en Lambda

### Dead Letter Queue (DLQ)
Cuando Lambda falla después de los retries, el evento va a una cola SQS para análisis posterior.

\`\`\`bash
# 1. Crear SQS DLQ
aws sqs create-queue --queue-name etl-failures-dlq

# 2. Configurar Lambda con DLQ
aws lambda update-function-configuration \\
  --function-name etl-bronze-to-silver \\
  --dead-letter-config '{"TargetArn": "arn:aws:sqs:us-east-1:123456789012:etl-failures-dlq"}'
\`\`\`

### Retry Behavior
- **Invocación asíncrona** (S3 trigger): Lambda reintenta 2 veces automáticamente
- **Invocación síncrona** (API Gateway): No hay retry automático, el caller reintenta
- **Event Source Mapping** (SQS, Kinesis): Retry configurable por batch

### Notificaciones SNS
\`\`\`python
import boto3

sns = boto3.client('sns')
TOPIC_ARN = os.environ['ALERT_TOPIC_ARN']  # Mejor: leer de Secrets Manager

def notify_success(result):
    sns.publish(
        TopicArn=TOPIC_ARN,
        Subject='✅ Pipeline ETL Exitoso',
        Message=json.dumps(result, indent=2)
    )

def notify_failure(error, source_file):
    sns.publish(
        TopicArn=TOPIC_ARN,
        Subject='❌ Pipeline ETL Falló',
        Message=f"Error procesando {source_file}: {str(error)}"
    )
\`\`\`

### Lambda Destinations (alternativa moderna a DLQ)
\`\`\`bash
# Configurar destino en caso de éxito → SNS
aws lambda put-function-event-invoke-config \\
  --function-name etl-bronze-to-silver \\
  --destination-config '{
    "OnSuccess": {"Destination": "arn:aws:sns:...:pipeline-success"},
    "OnFailure": {"Destination": "arn:aws:sqs:...:pipeline-failures"}
  }'
\`\`\``,
      en: `## Error Handling in Lambda

### Dead Letter Queue (DLQ)
When Lambda fails after retries, the event goes to an SQS queue for later analysis.

\`\`\`bash
aws sqs create-queue --queue-name etl-failures-dlq
aws lambda update-function-configuration \\
  --function-name etl-bronze-to-silver \\
  --dead-letter-config '{"TargetArn": "arn:aws:sqs:...:etl-failures-dlq"}'
\`\`\`

### Lambda Destinations (modern alternative to DLQ)
\`\`\`bash
aws lambda put-function-event-invoke-config \\
  --function-name etl-bronze-to-silver \\
  --destination-config '{
    "OnSuccess": {"Destination": "arn:aws:sns:...:pipeline-success"},
    "OnFailure": {"Destination": "arn:aws:sqs:...:pipeline-failures"}
  }'
\`\`\``,
      pt: `## Tratamento de Erros no Lambda

### Dead Letter Queue (DLQ)
Quando Lambda falha após retries, o evento vai para uma fila SQS para análise posterior.

### Lambda Destinations (alternativa moderna ao DLQ)
\`\`\`bash
aws lambda put-function-event-invoke-config \\
  --function-name etl-bronze-to-silver \\
  --destination-config '{
    "OnSuccess": {"Destination": "arn:aws:sns:...:pipeline-success"},
    "OnFailure": {"Destination": "arn:aws:sqs:...:pipeline-failures"}
  }'
\`\`\``
    },
    practicalTips: [
      { es: '🛡️ SIEMPRE configura DLQ o Destinations - sin ellos, los eventos fallidos se pierden para siempre', en: '🛡️ ALWAYS configure DLQ or Destinations - without them, failed events are lost forever', pt: '🛡️ SEMPRE configure DLQ ou Destinations - sem eles, eventos que falharam são perdidos para sempre' }
    ],
    interviewTips: [
      { es: '🎯 "¿Qué pasa si Lambda falla al procesar un archivo de S3?" → Con invocación asíncrona (S3 trigger), Lambda reintenta 2 veces. Si sigue fallando, el evento va al DLQ (SQS). Sin DLQ, el evento se pierde. Destinations es la alternativa moderna.', en: '🎯 "What happens if Lambda fails to process an S3 file?" → With async invocation (S3 trigger), Lambda retries 2 times. If still failing, event goes to DLQ (SQS). Without DLQ, event is lost. Destinations is the modern alternative.', pt: '🎯 "O que acontece se Lambda falha ao processar um arquivo do S3?" → Com invocação assíncrona (S3 trigger), Lambda retenta 2 vezes. Se continuar falhando, evento vai para DLQ (SQS). Sem DLQ, evento é perdido. Destinations é a alternativa moderna.' }
    ],
    externalLinks: [
      { title: 'Lambda DLQ', url: 'https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-dlq', type: 'aws_docs' },
      { title: 'Lambda Destinations', url: 'https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html#invocation-async-destinations', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Configuraste DLQ y notificaciones SNS para tu Lambda ETL?', en: '✅ Did you configure DLQ and SNS notifications for your ETL Lambda?', pt: '✅ Você configurou DLQ e notificações SNS para seu Lambda ETL?' },
    xpReward: 60, estimatedMinutes: 35, services: ['Lambda', 'SQS', 'SNS']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 9: Lambda + Secrets Manager
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-9',
    stepNumber: 209,
    title: { es: 'Lambda + Secrets Manager: Credenciales Seguras', en: 'Lambda + Secrets Manager: Secure Credentials', pt: 'Lambda + Secrets Manager: Credenciais Seguras' },
    description: { es: 'NUNCA hardcodear credenciales. Usar Secrets Manager para almacenar, rotar y acceder a secrets desde Lambda.', en: 'NEVER hardcode credentials. Use Secrets Manager to store, rotate and access secrets from Lambda.', pt: 'NUNCA hardcodear credenciais. Usar Secrets Manager para armazenar, rotar e acessar secrets do Lambda.' },
    theory: {
      es: `## Secrets Manager: La Forma Correcta de Manejar Credenciales

### ❌ Lo que NUNCA debes hacer
\`\`\`python
# PELIGROSO - cualquiera con acceso al código ve las credenciales
REDSHIFT_PASSWORD = "MiPasswordSecreta123!"
DB_HOST = "mi-cluster.xyz.us-east-1.redshift.amazonaws.com"

# SEMI-PELIGROSO - mejor que hardcodear, pero las env vars se ven en la consola
password = os.environ['DB_PASSWORD']
\`\`\`

### ✅ Lo que SÍ debes hacer: Secrets Manager
\`\`\`python
import boto3
import json

# Cliente Secrets Manager (fuera del handler para reutilizar)
secrets_client = boto3.client('secretsmanager')

# Cache del secret (para no llamar a Secrets Manager en cada invocación)
_cached_secret = None

def get_secret(secret_name):
    """Lee un secret de AWS Secrets Manager con caching."""
    global _cached_secret
    if _cached_secret is None:
        response = secrets_client.get_secret_value(SecretId=secret_name)
        _cached_secret = json.loads(response['SecretString'])
    return _cached_secret

def lambda_handler(event, context):
    # Leer credenciales de Redshift desde Secrets Manager
    secret = get_secret('prod/redshift/datalake')
    
    host = secret['host']
    port = secret['port']
    database = secret['dbname']
    username = secret['username']
    password = secret['password']
    
    # Ahora puedes conectarte de forma segura
    # import psycopg2
    # conn = psycopg2.connect(host=host, port=port, dbname=database,
    #                         user=username, password=password)
    print(f"Conectando a {host}:{port}/{database} como {username}")
\`\`\`

### Crear un Secret
\`\`\`bash
# Crear secret para Redshift
aws secretsmanager create-secret \\
  --name prod/redshift/datalake \\
  --description "Credenciales Redshift Data Lake" \\
  --secret-string '{
    "host": "mi-cluster.xyz.us-east-1.redshift.amazonaws.com",
    "port": 5439,
    "dbname": "datalake",
    "username": "etl_user",
    "password": "CAMBIAR_POR_PASSWORD_REAL"
  }'

# Listar secrets
aws secretsmanager list-secrets

# Leer un secret
aws secretsmanager get-secret-value --secret-id prod/redshift/datalake
\`\`\`

### Rotación Automática de Credenciales
Secrets Manager puede rotar passwords automáticamente:
\`\`\`bash
# Habilitar rotación cada 30 días
aws secretsmanager rotate-secret \\
  --secret-id prod/redshift/datalake \\
  --rotation-lambda-arn arn:aws:lambda:...:function:SecretRotator \\
  --rotation-rules '{"AutomaticallyAfterDays": 30}'
\`\`\`

### Secrets Manager vs Parameter Store vs Environment Variables
| Criterio | Secrets Manager | Parameter Store | Env Variables |
|----------|----------------|-----------------|---------------|
| Costo | $0.40/secret/mes | Gratis (standard) | Gratis |
| Rotación auto | ✅ | ❌ | ❌ |
| Encriptación | ✅ KMS obligatorio | ✅ KMS opcional | ❌ Texto plano |
| Auditoría | ✅ CloudTrail | ✅ CloudTrail | ❌ |
| Mejor para | DB passwords, API keys | Config no-secret | Config no-sensible |

### Caching para Performance
\`\`\`python
# Librería oficial de AWS para caching de secrets
# pip install aws-secretsmanager-caching
from aws_secretsmanager_caching import SecretCache, SecretCacheConfig

cache_config = SecretCacheConfig(
    max_cache_size=100,
    secret_refresh_interval=3600  # Refrescar cada hora
)
cache = SecretCache(config=cache_config)

def lambda_handler(event, context):
    # Lee del cache local, no de Secrets Manager en cada invocación
    secret_string = cache.get_secret_string('prod/redshift/datalake')
    secret = json.loads(secret_string)
\`\`\`

### IAM Policy para Lambda
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": [
      "secretsmanager:GetSecretValue"
    ],
    "Resource": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/redshift/*"
  }]
}
\`\`\``,
      en: `## Secrets Manager: The Right Way to Handle Credentials

### What you should NEVER do
\`\`\`python
# DANGEROUS - anyone with code access sees credentials
REDSHIFT_PASSWORD = "MySecretPassword123!"

# SEMI-DANGEROUS - better than hardcoding, but env vars are visible in console
password = os.environ['DB_PASSWORD']
\`\`\`

### What you SHOULD do: Secrets Manager
\`\`\`python
import boto3, json

secrets_client = boto3.client('secretsmanager')
_cached_secret = None

def get_secret(secret_name):
    global _cached_secret
    if _cached_secret is None:
        response = secrets_client.get_secret_value(SecretId=secret_name)
        _cached_secret = json.loads(response['SecretString'])
    return _cached_secret

def lambda_handler(event, context):
    secret = get_secret('prod/redshift/datalake')
    host = secret['host']
    password = secret['password']
\`\`\`

### Secrets Manager vs Parameter Store vs Environment Variables
| Criteria | Secrets Manager | Parameter Store | Env Variables |
|----------|----------------|-----------------|---------------|
| Cost | $0.40/secret/month | Free (standard) | Free |
| Auto rotation | Yes | No | No |
| Encryption | KMS mandatory | KMS optional | No |
| Best for | DB passwords, API keys | Non-secret config | Non-sensitive config |`,
      pt: `## Secrets Manager: A Forma Correta de Gerenciar Credenciais

### O que NUNCA fazer
\`\`\`python
# PERIGOSO - qualquer um com acesso ao código vê as credenciais
REDSHIFT_PASSWORD = "MinhaSenhaSecreta123!"
\`\`\`

### O que SIM fazer: Secrets Manager
\`\`\`python
import boto3, json

secrets_client = boto3.client('secretsmanager')
_cached_secret = None

def get_secret(secret_name):
    global _cached_secret
    if _cached_secret is None:
        response = secrets_client.get_secret_value(SecretId=secret_name)
        _cached_secret = json.loads(response['SecretString'])
    return _cached_secret

def lambda_handler(event, context):
    secret = get_secret('prod/redshift/datalake')
\`\`\``
    },
    practicalTips: [
      { es: '🔒 REGLA DE ORO: Si es un password, API key o connection string → Secrets Manager. Si es config no-sensible (bucket name, prefix) → Environment Variable.', en: '🔒 GOLDEN RULE: If it is a password, API key or connection string → Secrets Manager. If non-sensitive config (bucket name, prefix) → Environment Variable.', pt: '🔒 REGRA DE OURO: Se é password, API key ou connection string → Secrets Manager. Se é config não-sensível (bucket name, prefix) → Environment Variable.' },
      { es: '⚡ Cachea el secret en una variable global - se reutiliza en warm invocations y evita llamar a Secrets Manager cada vez ($0.05 por 10K llamadas)', en: '⚡ Cache the secret in a global variable - reused in warm invocations and avoids calling Secrets Manager every time ($0.05 per 10K calls)', pt: '⚡ Faça cache do secret em variável global - reutilizada em warm invocations e evita chamar Secrets Manager toda vez ($0.05 por 10K chamadas)' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo manejas credenciales en Lambda?" → NUNCA en código ni env vars. Usar Secrets Manager con caching. El secret se lee una vez en cold start y se cachea en variable global. Rotación automática cada 30 días. IAM policy con least privilege (solo GetSecretValue en el ARN específico).', en: '🎯 "How do you handle credentials in Lambda?" → NEVER in code or env vars. Use Secrets Manager with caching. Secret is read once on cold start and cached in global variable. Auto-rotation every 30 days. IAM policy with least privilege.', pt: '🎯 "Como você gerencia credenciais no Lambda?" → NUNCA no código ou env vars. Usar Secrets Manager com caching. O secret é lido uma vez no cold start e cacheado em variável global. Rotação automática a cada 30 dias. IAM policy com least privilege.' },
      { es: '🎯 "¿Cuál es la diferencia entre Secrets Manager y Parameter Store?" → Secrets Manager: rotación auto, $0.40/mes, ideal para passwords. Parameter Store: gratis, sin rotación, ideal para config no-sensible como feature flags o URLs.', en: '🎯 "What is the difference between Secrets Manager and Parameter Store?" → Secrets Manager: auto-rotation, $0.40/month, ideal for passwords. Parameter Store: free, no rotation, ideal for non-sensitive config like feature flags or URLs.', pt: '🎯 "Qual é a diferença entre Secrets Manager e Parameter Store?" → Secrets Manager: rotação auto, $0.40/mês, ideal para passwords. Parameter Store: grátis, sem rotação, ideal para config não-sensível como feature flags ou URLs.' },
      { es: '🎯 "¿Qué pasa si pones el password en una environment variable de Lambda?" → Es visible en la consola de AWS para cualquiera con acceso IAM a la función. No está encriptado en tránsito entre la consola y Lambda. No tiene auditoría de quién lo leyó. No tiene rotación automática. Es un antipatrón de seguridad.', en: '🎯 "What happens if you put a password in a Lambda environment variable?" → It is visible in the AWS console to anyone with IAM access to the function. Not encrypted in transit. No audit trail. No auto-rotation. It is a security anti-pattern.', pt: '🎯 "O que acontece se você colocar o password em uma environment variable do Lambda?" → É visível no console da AWS para qualquer um com acesso IAM à função. Não está criptografado em trânsito. Sem trilha de auditoria. Sem rotação automática. É um anti-padrão de segurança.' }
    ],
    externalLinks: [
      { title: 'Secrets Manager Documentation', url: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html', type: 'aws_docs' },
      { title: 'Lambda with Secrets Manager', url: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/retrieving-secrets_lambda.html', type: 'aws_docs' },
      { title: 'Secrets Caching Library', url: 'https://github.com/aws/aws-secretsmanager-caching-python', type: 'github' }
    ],
    checkpoint: { es: '✅ ¿Creaste un secret en Secrets Manager y lo leíste desde Lambda con caching?', en: '✅ Did you create a secret in Secrets Manager and read it from Lambda with caching?', pt: '✅ Você criou um secret no Secrets Manager e leu do Lambda com caching?' },
    xpReward: 70, estimatedMinutes: 40, services: ['Lambda', 'Secrets Manager']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 10: Lambda con boto3 Avanzado
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-10',
    stepNumber: 210,
    title: { es: 'Lambda con boto3 Avanzado: Glue Catalog, Athena, DynamoDB', en: 'Lambda with Advanced boto3: Glue Catalog, Athena, DynamoDB', pt: 'Lambda com boto3 Avançado: Glue Catalog, Athena, DynamoDB' },
    description: { es: 'Interactuar con Glue Data Catalog, ejecutar queries de Athena y usar DynamoDB como state store desde Lambda.', en: 'Interact with Glue Data Catalog, run Athena queries and use DynamoDB as state store from Lambda.', pt: 'Interagir com Glue Data Catalog, executar queries do Athena e usar DynamoDB como state store do Lambda.' },
    theory: {
      es: `## Lambda como Orquestador Ligero

### Actualizar Glue Catalog (registrar particiones)
\`\`\`python
glue = boto3.client('glue')

def add_partition(database, table, year, month, day, s3_path):
    """Registra una nueva partición en el Glue Data Catalog."""
    try:
        glue.create_partition(
            DatabaseName=database,
            TableName=table,
            PartitionInput={
                'Values': [str(year), f'{month:02d}', f'{day:02d}'],
                'StorageDescriptor': {
                    'Location': s3_path,
                    'InputFormat': 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetInputFormat',
                    'OutputFormat': 'org.apache.hadoop.hive.ql.io.parquet.MapredParquetOutputFormat',
                    'SerdeInfo': {
                        'SerializationLibrary': 'org.apache.hadoop.hive.ql.io.parquet.serde.ParquetHiveSerDe'
                    }
                }
            }
        )
        print(f"Partición {year}/{month:02d}/{day:02d} creada")
    except glue.exceptions.AlreadyExistsException:
        print(f"Partición ya existe, ignorando")
\`\`\`

### Ejecutar Athena Query desde Lambda
\`\`\`python
athena = boto3.client('athena')

def run_athena_query(query, database, output_location):
    """Ejecuta un query en Athena y espera el resultado."""
    response = athena.start_query_execution(
        QueryString=query,
        QueryExecutionContext={'Database': database},
        ResultConfiguration={'OutputLocation': output_location}
    )
    query_id = response['QueryExecutionId']
    
    # Esperar resultado (polling)
    import time
    while True:
        status = athena.get_query_execution(QueryExecutionId=query_id)
        state = status['QueryExecution']['Status']['State']
        if state in ['SUCCEEDED', 'FAILED', 'CANCELLED']:
            break
        time.sleep(2)
    
    if state == 'SUCCEEDED':
        return athena.get_query_results(QueryExecutionId=query_id)
    else:
        reason = status['QueryExecution']['Status'].get('StateChangeReason', 'Unknown')
        raise Exception(f"Athena query failed: {reason}")
\`\`\`

### DynamoDB como State Store
\`\`\`python
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('pipeline-state')

def track_file(source_key, status, rows_processed):
    """Registra el estado de procesamiento de un archivo."""
    table.put_item(Item={
        'file_key': source_key,
        'status': status,
        'rows_processed': rows_processed,
        'processed_at': datetime.utcnow().isoformat(),
        'ttl': int((datetime.utcnow() + timedelta(days=90)).timestamp())
    })

def is_already_processed(source_key):
    """Verifica si un archivo ya fue procesado (idempotencia)."""
    response = table.get_item(Key={'file_key': source_key})
    return 'Item' in response and response['Item']['status'] == 'success'
\`\`\``,
      en: `## Lambda as Lightweight Orchestrator

### Update Glue Catalog (register partitions)
\`\`\`python
glue = boto3.client('glue')

def add_partition(database, table, year, month, day, s3_path):
    try:
        glue.create_partition(
            DatabaseName=database, TableName=table,
            PartitionInput={
                'Values': [str(year), f'{month:02d}', f'{day:02d}'],
                'StorageDescriptor': {'Location': s3_path, ...}
            }
        )
    except glue.exceptions.AlreadyExistsException:
        pass  # Already exists, ignore
\`\`\`

### DynamoDB as State Store (idempotency)
\`\`\`python
def is_already_processed(source_key):
    response = table.get_item(Key={'file_key': source_key})
    return 'Item' in response and response['Item']['status'] == 'success'
\`\`\``,
      pt: `## Lambda como Orquestrador Leve

### Atualizar Glue Catalog (registrar partições)
\`\`\`python
glue = boto3.client('glue')

def add_partition(database, table, year, month, day, s3_path):
    try:
        glue.create_partition(
            DatabaseName=database, TableName=table,
            PartitionInput={
                'Values': [str(year), f'{month:02d}', f'{day:02d}'],
                'StorageDescriptor': {'Location': s3_path, ...}
            }
        )
    except glue.exceptions.AlreadyExistsException:
        pass
\`\`\``
    },
    practicalTips: [
      { es: '🔄 Usa DynamoDB para idempotencia - verifica si el archivo ya fue procesado antes de procesarlo de nuevo', en: '🔄 Use DynamoDB for idempotency - check if file was already processed before processing again', pt: '🔄 Use DynamoDB para idempotência - verifique se o arquivo já foi processado antes de processar novamente' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo garantizarías que Lambda no procese el mismo archivo dos veces?" → Idempotencia con DynamoDB: antes de procesar, verificar si el file_key ya existe con status=success. Usar conditional writes para evitar race conditions.', en: '🎯 "How would you guarantee Lambda doesn\'t process the same file twice?" → Idempotency with DynamoDB: before processing, check if file_key already exists with status=success. Use conditional writes to avoid race conditions.', pt: '🎯 "Como você garantiria que Lambda não processe o mesmo arquivo duas vezes?" → Idempotência com DynamoDB: antes de processar, verificar se file_key já existe com status=success. Usar conditional writes para evitar race conditions.' }
    ],
    externalLinks: [
      { title: 'Glue CreatePartition API', url: 'https://docs.aws.amazon.com/glue/latest/webapi/API_CreatePartition.html', type: 'aws_docs' },
      { title: 'Athena boto3', url: 'https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/athena.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Implementaste idempotencia con DynamoDB y actualización de particiones en Glue Catalog?', en: '✅ Did you implement idempotency with DynamoDB and partition updates in Glue Catalog?', pt: '✅ Você implementou idempotência com DynamoDB e atualização de partições no Glue Catalog?' },
    xpReward: 70, estimatedMinutes: 45, services: ['Lambda', 'Glue Data Catalog', 'Athena', 'DynamoDB']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 11: Testing y Debugging
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-lambda-11',
    stepNumber: 211,
    title: { es: 'Testing y Debugging de Lambda', en: 'Lambda Testing and Debugging', pt: 'Testing e Debugging do Lambda' },
    description: { es: 'CloudWatch Logs, X-Ray tracing, eventos de prueba y SAM local para desarrollo.', en: 'CloudWatch Logs, X-Ray tracing, test events and SAM local for development.', pt: 'CloudWatch Logs, X-Ray tracing, eventos de teste e SAM local para desenvolvimento.' },
    theory: {
      es: `## Testing y Debugging

### CloudWatch Logs
Cada Lambda escribe automáticamente a CloudWatch Logs:
\`\`\`
Log Group: /aws/lambda/etl-bronze-to-silver
Log Stream: 2024/12/15/[$LATEST]abc123...

Ejemplo de output:
START RequestId: abc-123 Version: $LATEST
Procesando: s3://mi-datalake/bronze/sales/sales_20241215.csv (1048576 bytes)
Filas leídas: 10000
Filas limpias: 9850 (removidas: 150)
Resultado: {"status": "success", ...}
END RequestId: abc-123
REPORT RequestId: abc-123 Duration: 3200 ms Billed: 3200 ms Memory: 1024 MB Max Used: 456 MB
\`\`\`

### Queries en CloudWatch Logs Insights
\`\`\`sql
-- Encontrar errores en las últimas 24 horas
fields @timestamp, @message
| filter @message like /ERROR|Exception|Traceback/
| sort @timestamp desc
| limit 50

-- Duración promedio por función
filter @type = "REPORT"
| stats avg(@duration) as avg_ms, max(@duration) as max_ms, count(*) as invocations
  by bin(1h)

-- Archivos que fallaron
fields @timestamp, @message
| filter @message like /ERROR/
| parse @message /Procesando: (?<file>.*?) \\(/
| stats count() by file
\`\`\`

### Eventos de Prueba
\`\`\`bash
# Crear evento de prueba S3
cat > test-event.json << 'EOF'
{
  "Records": [{
    "eventSource": "aws:s3",
    "eventName": "ObjectCreated:Put",
    "s3": {
      "bucket": {"name": "mi-datalake-test"},
      "object": {
        "key": "bronze/sales/test_file.csv",
        "size": 1024
      }
    }
  }]
}
EOF

# Invocar Lambda con evento de prueba
aws lambda invoke \\
  --function-name etl-bronze-to-silver \\
  --payload file://test-event.json \\
  --cli-binary-format raw-in-base64-out \\
  output.json

cat output.json
\`\`\`

### X-Ray Tracing
\`\`\`bash
# Habilitar tracing
aws lambda update-function-configuration \\
  --function-name etl-bronze-to-silver \\
  --tracing-config Mode=Active

# En el código, instrumentar boto3
from aws_xray_sdk.core import xray_recorder
from aws_xray_sdk.core import patch_all
patch_all()  # Instrumenta automáticamente boto3, requests, etc.
\`\`\`

### SAM Local (desarrollo local)
\`\`\`bash
# Instalar SAM CLI
pip install aws-sam-cli

# Invocar Lambda localmente
sam local invoke --event test-event.json

# Levantar API Gateway local
sam local start-api
\`\`\``,
      en: `## Testing and Debugging

### CloudWatch Logs
Every Lambda automatically writes to CloudWatch Logs.

### Test Events
\`\`\`bash
cat > test-event.json << 'EOF'
{"Records": [{"s3": {"bucket": {"name": "test"}, "object": {"key": "bronze/test.csv"}}}]}
EOF

aws lambda invoke --function-name etl-bronze-to-silver --payload file://test-event.json output.json
\`\`\`

### X-Ray Tracing
\`\`\`bash
aws lambda update-function-configuration \\
  --function-name etl-bronze-to-silver \\
  --tracing-config Mode=Active
\`\`\``,
      pt: `## Testing e Debugging

### CloudWatch Logs
Cada Lambda escreve automaticamente no CloudWatch Logs.

### Eventos de Teste
\`\`\`bash
aws lambda invoke --function-name etl-bronze-to-silver --payload file://test-event.json output.json
\`\`\`

### X-Ray Tracing
\`\`\`bash
aws lambda update-function-configuration \\
  --function-name etl-bronze-to-silver \\
  --tracing-config Mode=Active
\`\`\``
    },
    practicalTips: [
      { es: '📊 Revisa la línea REPORT en CloudWatch Logs - muestra Duration, Billed Duration, Memory Used y Max Memory. Úsala para right-size tu Lambda.', en: '📊 Check the REPORT line in CloudWatch Logs - shows Duration, Billed Duration, Memory Used and Max Memory. Use it to right-size your Lambda.', pt: '📊 Verifique a linha REPORT no CloudWatch Logs - mostra Duration, Billed Duration, Memory Used e Max Memory. Use-a para right-size seu Lambda.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo debuggearías una Lambda que falla intermitentemente?" → 1) CloudWatch Logs Insights para buscar patrones de error. 2) X-Ray para ver tracing distribuido. 3) Revisar REPORT para detectar OOM (Max Memory ≈ Memory Limit). 4) Verificar timeouts (Duration ≈ Timeout).', en: '🎯 "How would you debug a Lambda that fails intermittently?" → 1) CloudWatch Logs Insights for error patterns. 2) X-Ray for distributed tracing. 3) Check REPORT for OOM (Max Memory ≈ Memory Limit). 4) Check timeouts (Duration ≈ Timeout).', pt: '🎯 "Como você debuggaria uma Lambda que falha intermitentemente?" → 1) CloudWatch Logs Insights para buscar padrões de erro. 2) X-Ray para tracing distribuído. 3) Verificar REPORT para OOM (Max Memory ≈ Memory Limit). 4) Verificar timeouts (Duration ≈ Timeout).' }
    ],
    externalLinks: [
      { title: 'CloudWatch Logs Insights', url: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html', type: 'aws_docs' },
      { title: 'Lambda with X-Ray', url: 'https://docs.aws.amazon.com/lambda/latest/dg/services-xray.html', type: 'aws_docs' },
      { title: 'AWS SAM', url: 'https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Invocaste tu Lambda con un evento de prueba y analizaste los logs en CloudWatch?', en: '✅ Did you invoke your Lambda with a test event and analyze logs in CloudWatch?', pt: '✅ Você invocou seu Lambda com um evento de teste e analisou os logs no CloudWatch?' },
    xpReward: 55, estimatedMinutes: 35, services: ['Lambda', 'CloudWatch', 'X-Ray']
  }
];

// ═══════════════════════════════════════════════════════════════
// Helper exports
// ═══════════════════════════════════════════════════════════════
export const LAMBDA_PHASE_INFO = {
  totalSteps: phaseLambdaSteps.length,
  totalXP: phaseLambdaSteps.reduce((sum, s) => sum + s.xpReward, 0),
  totalMinutes: phaseLambdaSteps.reduce((sum, s) => sum + s.estimatedMinutes, 0),
  freeTier: true,
  freeTierDetails: '1M ejecuciones/mes + 400K GB-seg (PERMANENTE)',
  services: ['Lambda', 'S3', 'Secrets Manager', 'SQS', 'SNS', 'DynamoDB', 'Glue Data Catalog', 'Athena', 'CloudWatch', 'X-Ray']
};
