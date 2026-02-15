/* eslint-disable no-useless-escape */
/**
 * LABS GUIADOS AWS DATA ENGINEERING
 * Mini-proyectos de 1-2 horas que integran múltiples servicios
 * Diseñados para práctica rápida con código paso-a-paso
 */

export interface AWSLab {
  id: string;
  number: number;
  title: { es: string; en: string; pt: string };
  description: { es: string; en: string; pt: string };
  services: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  phaseIds: string[]; // Fases relacionadas
  architecture: string; // Diagrama ASCII
  steps: {
    title: { es: string; en: string; pt: string };
    description: { es: string; en: string; pt: string };
    code?: string;
    language?: 'python' | 'bash' | 'json' | 'sql' | 'yaml' | 'hcl';
  }[];
  cleanup: string; // Comandos para limpiar recursos
  xpReward: number;
  tags: string[];
}

export const awsLabs: AWSLab[] = [
  // LAB 1: S3 Event → Lambda → SNS
  {
    id: 'aws-lab-1',
    number: 1,
    title: { es: 'Alerta automática de nuevos archivos en S3', en: 'Automatic alert for new S3 files', pt: 'Alerta automático de novos arquivos no S3' },
    description: { es: 'Configura una Lambda que se dispare cuando suben archivos a S3 y envíe una notificación por email con los detalles del archivo.', en: 'Configure a Lambda triggered when files are uploaded to S3 that sends an email notification with file details.', pt: 'Configure uma Lambda que dispare quando arquivos são enviados ao S3 e envie uma notificação por email com detalhes do arquivo.' },
    services: ['S3', 'Lambda', 'SNS'],
    difficulty: 'beginner',
    estimatedMinutes: 60,
    phaseIds: ['phase2', 'phase8'],
    architecture: `
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│   S3    │────▶│ Lambda  │────▶│   SNS   │────▶│  Email  │
│ (upload)│     │(process)│     │ (topic) │     │(notify) │
└─────────┘     └─────────┘     └─────────┘     └─────────┘`,
    steps: [
      { title: { es: 'Crear SNS Topic', en: 'Create SNS Topic', pt: 'Criar SNS Topic' }, description: { es: 'Crea el topic y suscribe tu email.', en: 'Create the topic and subscribe your email.', pt: 'Crie o topic e inscreva seu email.' }, code: `# Crear topic
TOPIC_ARN=$(aws sns create-topic --name s3-file-alerts --query TopicArn --output text)

# Suscribir email
aws sns subscribe --topic-arn $TOPIC_ARN --protocol email --notification-endpoint tu@email.com

# Confirma el email que recibirás`, language: 'bash' },
      { title: { es: 'Crear rol IAM para Lambda', en: 'Create IAM role for Lambda', pt: 'Criar role IAM para Lambda' }, description: { es: 'Rol con permisos para S3, SNS y CloudWatch Logs.', en: 'Role with permissions for S3, SNS, and CloudWatch Logs.', pt: 'Role com permissões para S3, SNS e CloudWatch Logs.' }, code: `# trust-policy.json
cat > /tmp/trust-policy.json << 'EOF'
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "lambda.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}
EOF

aws iam create-role --role-name LambdaS3SNSRole --assume-role-policy-document file:///tmp/trust-policy.json

# Adjuntar políticas
aws iam attach-role-policy --role-name LambdaS3SNSRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam attach-role-policy --role-name LambdaS3SNSRole --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
aws iam attach-role-policy --role-name LambdaS3SNSRole --policy-arn arn:aws:iam::aws:policy/AmazonSNSFullAccess`, language: 'bash' },
      { title: { es: 'Crear función Lambda', en: 'Create Lambda function', pt: 'Criar função Lambda' }, description: { es: 'Lambda que procesa el evento S3 y notifica.', en: 'Lambda that processes S3 event and notifies.', pt: 'Lambda que processa o evento S3 e notifica.' }, code: `# lambda_function.py
import json
import boto3
import os
from datetime import datetime

sns = boto3.client('sns')
s3 = boto3.client('s3')

def lambda_handler(event, context):
    topic_arn = os.environ['SNS_TOPIC_ARN']
    
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        size = record['s3']['object'].get('size', 0)
        
        # Obtener metadata del objeto
        try:
            response = s3.head_object(Bucket=bucket, Key=key)
            content_type = response.get('ContentType', 'unknown')
        except:
            content_type = 'unknown'
        
        # Formatear mensaje
        message = f"""
🆕 Nuevo archivo en S3

📁 Bucket: {bucket}
📄 Archivo: {key}
📊 Tamaño: {size / 1024:.2f} KB
📋 Tipo: {content_type}
🕐 Fecha: {datetime.now().isoformat()}
        """
        
        # Enviar notificación
        sns.publish(
            TopicArn=topic_arn,
            Subject=f'[S3 Alert] Nuevo archivo: {key}',
            Message=message
        )
    
    return {'statusCode': 200, 'body': 'Notification sent'}`, language: 'python' },
      { title: { es: 'Desplegar Lambda', en: 'Deploy Lambda', pt: 'Fazer deploy da Lambda' }, description: { es: 'Empaqueta y despliega la función.', en: 'Package and deploy the function.', pt: 'Empacote e faça deploy da função.' }, code: `# Empaquetar
cd /tmp && zip function.zip lambda_function.py

# Obtener ARN del rol
ROLE_ARN=$(aws iam get-role --role-name LambdaS3SNSRole --query Role.Arn --output text)

# Crear función
aws lambda create-function \\
  --function-name S3FileNotifier \\
  --runtime python3.11 \\
  --handler lambda_function.lambda_handler \\
  --role $ROLE_ARN \\
  --zip-file fileb:///tmp/function.zip \\
  --environment "Variables={SNS_TOPIC_ARN=$TOPIC_ARN}"

# Dar permiso a S3 para invocar Lambda
aws lambda add-permission \\
  --function-name S3FileNotifier \\
  --statement-id s3-trigger \\
  --action lambda:InvokeFunction \\
  --principal s3.amazonaws.com \\
  --source-arn arn:aws:s3:::YOUR-BUCKET-NAME`, language: 'bash' },
      { title: { es: 'Configurar trigger S3', en: 'Configure S3 trigger', pt: 'Configurar trigger S3' }, description: { es: 'Conecta el bucket a la Lambda.', en: 'Connect the bucket to Lambda.', pt: 'Conecte o bucket à Lambda.' }, code: `LAMBDA_ARN=$(aws lambda get-function --function-name S3FileNotifier --query Configuration.FunctionArn --output text)

# Configurar notificación en el bucket
aws s3api put-bucket-notification-configuration \\
  --bucket YOUR-BUCKET-NAME \\
  --notification-configuration '{
    "LambdaFunctionConfigurations": [{
      "LambdaFunctionArn": "'$LAMBDA_ARN'",
      "Events": ["s3:ObjectCreated:*"],
      "Filter": {
        "Key": {
          "FilterRules": [
            {"Name": "prefix", "Value": "uploads/"},
            {"Name": "suffix", "Value": ".csv"}
          ]
        }
      }
    }]
  }'`, language: 'bash' },
      { title: { es: 'Probar', en: 'Test', pt: 'Testar' }, description: { es: 'Sube un archivo y verifica el email.', en: 'Upload a file and verify the email.', pt: 'Faça upload de um arquivo e verifique o email.' }, code: `# Crear archivo de prueba
echo "id,name,value" > /tmp/test.csv
echo "1,test,100" >> /tmp/test.csv

# Subir a S3
aws s3 cp /tmp/test.csv s3://YOUR-BUCKET-NAME/uploads/

# Deberías recibir un email en segundos!`, language: 'bash' }
    ],
    cleanup: `# Limpiar recursos
aws lambda delete-function --function-name S3FileNotifier
aws sns delete-topic --topic-arn $TOPIC_ARN
aws iam detach-role-policy --role-name LambdaS3SNSRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam detach-role-policy --role-name LambdaS3SNSRole --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess
aws iam detach-role-policy --role-name LambdaS3SNSRole --policy-arn arn:aws:iam::aws:policy/AmazonSNSFullAccess
aws iam delete-role --role-name LambdaS3SNSRole`,
    xpReward: 150,
    tags: ['s3', 'lambda', 'sns', 'serverless', 'events']
  },

  // LAB 2: Glue Job + Step Functions + Email Alert
  {
    id: 'aws-lab-2',
    number: 2,
    title: { es: 'Pipeline ETL orquestado con alertas', en: 'Orchestrated ETL pipeline with alerts', pt: 'Pipeline ETL orquestrado com alertas' },
    description: { es: 'Crea un pipeline que ejecute un Glue Job, espere su finalización, y envíe email de éxito o fallo.', en: 'Create a pipeline that runs a Glue Job, waits for completion, and sends success or failure email.', pt: 'Crie um pipeline que execute um Glue Job, aguarde sua finalização e envie email de sucesso ou falha.' },
    services: ['Glue', 'Step Functions', 'SNS'],
    difficulty: 'intermediate',
    estimatedMinutes: 90,
    phaseIds: ['phase4', 'phase9'],
    architecture: `
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Start     │────▶│  Glue Job    │────▶│   Choice     │
│  (trigger)   │     │  (ETL sync)  │     │ (succeeded?) │
└──────────────┘     └──────────────┘     └──────┬───────┘
                                                  │
                           ┌──────────────────────┼──────────────────────┐
                           │                      │                      │
                           ▼                      ▼                      ▼
                    ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
                    │   Success    │      │    Fail      │      │   Timeout    │
                    │  SNS Email   │      │  SNS Email   │      │  SNS Email   │
                    └──────────────┘      └──────────────┘      └──────────────┘`,
    steps: [
      { title: { es: 'Crear Glue Job de ejemplo', en: 'Create sample Glue Job', pt: 'Criar Glue Job de exemplo' }, description: { es: 'Un job simple que procesa datos.', en: 'A simple job that processes data.', pt: 'Um job simples que processa dados.' }, code: `# glue_job.py - Subir a S3
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

args = getResolvedOptions(sys.argv, ['JOB_NAME'])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args['JOB_NAME'], args)

# Simular procesamiento
df = spark.createDataFrame([
    (1, "Product A", 100),
    (2, "Product B", 200),
], ["id", "name", "value"])

df.write.mode("overwrite").parquet("s3://YOUR-BUCKET/output/sample/")

job.commit()`, language: 'python' },
      { title: { es: 'Crear Step Functions', en: 'Create Step Functions', pt: 'Criar Step Functions' }, description: { es: 'State machine que orquesta todo.', en: 'State machine that orchestrates everything.', pt: 'State machine que orquestra tudo.' }, code: `{
  "Comment": "ETL Pipeline with Notifications",
  "StartAt": "StartGlueJob",
  "States": {
    "StartGlueJob": {
      "Type": "Task",
      "Resource": "arn:aws:states:::glue:startJobRun.sync",
      "Parameters": {
        "JobName": "sample-etl-job"
      },
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "NotifyFailure",
        "ResultPath": "$.error"
      }],
      "Next": "NotifySuccess"
    },
    "NotifySuccess": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:ACCOUNT:etl-alerts",
        "Subject": "✅ ETL Pipeline Completed Successfully",
        "Message.$": "States.Format('Job completed at {}', $$.State.EnteredTime)"
      },
      "End": true
    },
    "NotifyFailure": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:ACCOUNT:etl-alerts",
        "Subject": "❌ ETL Pipeline Failed",
        "Message.$": "States.Format('Job failed: {}', $.error.Cause)"
      },
      "Next": "FailState"
    },
    "FailState": {
      "Type": "Fail",
      "Error": "ETLFailed",
      "Cause": "Glue job execution failed"
    }
  }
}`, language: 'json' },
      { title: { es: 'Desplegar con CLI', en: 'Deploy with CLI', pt: 'Fazer deploy com CLI' }, description: { es: 'Crea todos los recursos.', en: 'Create all resources.', pt: 'Crie todos os recursos.' }, code: `# 1. Crear SNS Topic
TOPIC_ARN=$(aws sns create-topic --name etl-alerts --query TopicArn --output text)
aws sns subscribe --topic-arn $TOPIC_ARN --protocol email --notification-endpoint tu@email.com

# 2. Subir script Glue a S3
aws s3 cp glue_job.py s3://YOUR-BUCKET/scripts/

# 3. Crear Glue Job
aws glue create-job \\
  --name sample-etl-job \\
  --role GlueServiceRole \\
  --command '{"Name": "glueetl", "ScriptLocation": "s3://YOUR-BUCKET/scripts/glue_job.py"}' \\
  --default-arguments '{"--job-language": "python"}'

# 4. Crear Step Functions (reemplaza ACCOUNT y region en el JSON)
aws stepfunctions create-state-machine \\
  --name ETLPipelineWithAlerts \\
  --definition file://state-machine.json \\
  --role-arn arn:aws:iam::ACCOUNT:role/StepFunctionsGlueRole`, language: 'bash' },
      { title: { es: 'Probar pipeline', en: 'Test pipeline', pt: 'Testar pipeline' }, description: { es: 'Ejecuta y verifica emails.', en: 'Execute and verify emails.', pt: 'Execute e verifique emails.' }, code: `# Ejecutar
aws stepfunctions start-execution \\
  --state-machine-arn arn:aws:states:us-east-1:ACCOUNT:stateMachine:ETLPipelineWithAlerts

# Ver estado
aws stepfunctions list-executions \\
  --state-machine-arn arn:aws:states:us-east-1:ACCOUNT:stateMachine:ETLPipelineWithAlerts \\
  --query 'executions[0].status'`, language: 'bash' }
    ],
    cleanup: `aws stepfunctions delete-state-machine --state-machine-arn ARN
aws glue delete-job --job-name sample-etl-job
aws sns delete-topic --topic-arn $TOPIC_ARN`,
    xpReward: 200,
    tags: ['glue', 'stepfunctions', 'sns', 'orchestration', 'etl']
  },

  // LAB 3: API Gateway → Kinesis → S3
  {
    id: 'aws-lab-3',
    number: 3,
    title: { es: 'API de ingesta de eventos a Data Lake', en: 'Event ingestion API to Data Lake', pt: 'API de ingestão de eventos para Data Lake' },
    description: { es: 'Crea una API REST que reciba eventos JSON y los envíe a Kinesis Firehose para almacenarlos en S3.', en: 'Create a REST API that receives JSON events and sends them to Kinesis Firehose for S3 storage.', pt: 'Crie uma API REST que receba eventos JSON e os envie para Kinesis Firehose para armazenamento no S3.' },
    services: ['API Gateway', 'Kinesis Firehose', 'S3'],
    difficulty: 'intermediate',
    estimatedMinutes: 75,
    phaseIds: ['phase2', 'phase8'],
    architecture: `
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────┐
│  Client │────▶│ API Gateway │────▶│   Firehose   │────▶│   S3    │
│  (POST) │     │   (REST)    │     │  (buffered)  │     │(Parquet)│
└─────────┘     └─────────────┘     └──────────────┘     └─────────┘`,
    steps: [
      { title: { es: 'Crear Firehose Delivery Stream', en: 'Create Firehose Delivery Stream', pt: 'Criar Firehose Delivery Stream' }, description: { es: 'Stream que almacena en S3.', en: 'Stream that stores to S3.', pt: 'Stream que armazena no S3.' }, code: `# Crear rol para Firehose
aws iam create-role --role-name FirehoseS3Role --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "firehose.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}'

aws iam attach-role-policy --role-name FirehoseS3Role \\
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

# Crear delivery stream
aws firehose create-delivery-stream \\
  --delivery-stream-name events-to-s3 \\
  --delivery-stream-type DirectPut \\
  --s3-destination-configuration '{
    "RoleARN": "arn:aws:iam::ACCOUNT:role/FirehoseS3Role",
    "BucketARN": "arn:aws:s3:::YOUR-BUCKET",
    "Prefix": "events/year=!{timestamp:yyyy}/month=!{timestamp:MM}/day=!{timestamp:dd}/",
    "ErrorOutputPrefix": "errors/",
    "BufferingHints": {"SizeInMBs": 5, "IntervalInSeconds": 60}
  }'`, language: 'bash' },
      { title: { es: 'Crear API Gateway', en: 'Create API Gateway', pt: 'Criar API Gateway' }, description: { es: 'API REST con integración directa a Firehose.', en: 'REST API with direct Firehose integration.', pt: 'API REST com integração direta ao Firehose.' }, code: `# Crear API
API_ID=$(aws apigateway create-rest-api --name EventsAPI --query 'id' --output text)
ROOT_ID=$(aws apigateway get-resources --rest-api-id $API_ID --query 'items[0].id' --output text)

# Crear recurso /events
RESOURCE_ID=$(aws apigateway create-resource \\
  --rest-api-id $API_ID \\
  --parent-id $ROOT_ID \\
  --path-part events \\
  --query 'id' --output text)

# Crear método POST
aws apigateway put-method \\
  --rest-api-id $API_ID \\
  --resource-id $RESOURCE_ID \\
  --http-method POST \\
  --authorization-type NONE

# Rol para API Gateway
aws iam create-role --role-name APIGatewayFirehoseRole --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"Service": "apigateway.amazonaws.com"},
    "Action": "sts:AssumeRole"
  }]
}'
aws iam attach-role-policy --role-name APIGatewayFirehoseRole \\
  --policy-arn arn:aws:iam::aws:policy/AmazonKinesisFirehoseFullAccess`, language: 'bash' },
      { title: { es: 'Configurar integración', en: 'Configure integration', pt: 'Configurar integração' }, description: { es: 'Conecta API Gateway a Firehose.', en: 'Connect API Gateway to Firehose.', pt: 'Conecte API Gateway ao Firehose.' }, code: `# Integración con Firehose
aws apigateway put-integration \\
  --rest-api-id $API_ID \\
  --resource-id $RESOURCE_ID \\
  --http-method POST \\
  --type AWS \\
  --integration-http-method POST \\
  --uri "arn:aws:apigateway:us-east-1:firehose:action/PutRecord" \\
  --credentials "arn:aws:iam::ACCOUNT:role/APIGatewayFirehoseRole" \\
  --request-templates '{
    "application/json": "{\\\"DeliveryStreamName\\\": \\\"events-to-s3\\\", \\\"Record\\\": {\\\"Data\\\": \\\"$util.base64Encode($input.body)\\n\\\"}}"
  }'

# Response
aws apigateway put-method-response \\
  --rest-api-id $API_ID \\
  --resource-id $RESOURCE_ID \\
  --http-method POST \\
  --status-code 200

aws apigateway put-integration-response \\
  --rest-api-id $API_ID \\
  --resource-id $RESOURCE_ID \\
  --http-method POST \\
  --status-code 200 \\
  --selection-pattern ""

# Deploy
aws apigateway create-deployment --rest-api-id $API_ID --stage-name prod`, language: 'bash' },
      { title: { es: 'Probar API', en: 'Test API', pt: 'Testar API' }, description: { es: 'Envía eventos y verifica en S3.', en: 'Send events and verify in S3.', pt: 'Envie eventos e verifique no S3.' }, code: `# URL de la API
API_URL="https://$API_ID.execute-api.us-east-1.amazonaws.com/prod/events"

# Enviar eventos
for i in {1..10}; do
  curl -X POST $API_URL \\
    -H "Content-Type: application/json" \\
    -d '{"event_id": "'$i'", "user": "test", "action": "click", "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"}'
  echo ""
done

# Esperar 60s (buffer interval) y verificar S3
sleep 65
aws s3 ls s3://YOUR-BUCKET/events/ --recursive`, language: 'bash' }
    ],
    cleanup: `aws apigateway delete-rest-api --rest-api-id $API_ID
aws firehose delete-delivery-stream --delivery-stream-name events-to-s3
aws iam detach-role-policy --role-name FirehoseS3Role --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam delete-role --role-name FirehoseS3Role`,
    xpReward: 175,
    tags: ['apigateway', 'kinesis', 'firehose', 's3', 'streaming']
  },

  // LAB 4: EventBridge Schedule → Athena → Slack/Email
  {
    id: 'aws-lab-4',
    number: 4,
    title: { es: 'Reporte diario automático con Athena', en: 'Automatic daily report with Athena', pt: 'Relatório diário automático com Athena' },
    description: { es: 'Programa una query Athena diaria que genere un reporte y lo envíe por email.', en: 'Schedule a daily Athena query that generates a report and sends it by email.', pt: 'Programe uma query Athena diária que gere um relatório e o envie por email.' },
    services: ['EventBridge', 'Lambda', 'Athena', 'SNS'],
    difficulty: 'intermediate',
    estimatedMinutes: 90,
    phaseIds: ['phase5', 'phase9'],
    architecture: `
┌────────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│ EventBridge│────▶│ Lambda  │────▶│ Athena  │────▶│ Lambda  │────▶│  SNS    │
│  (cron)    │     │ (start) │     │ (query) │     │(format) │     │ (email) │
└────────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘`,
    steps: [
      { title: { es: 'Crear Lambda para ejecutar query', en: 'Create Lambda to run query', pt: 'Criar Lambda para executar query' }, description: { es: 'Lambda que inicia la query Athena y formatea resultados.', en: 'Lambda that starts Athena query and formats results.', pt: 'Lambda que inicia a query Athena e formata resultados.' }, code: `# daily_report_lambda.py
import boto3
import os
import time

athena = boto3.client('athena')
sns = boto3.client('sns')

def lambda_handler(event, context):
    # Query de reporte
    query = """
    SELECT 
        DATE(sale_date) as fecha,
        COUNT(*) as total_ventas,
        SUM(amount) as revenue,
        AVG(amount) as avg_ticket
    FROM datalake_db.sales
    WHERE sale_date >= current_date - interval '1' day
    GROUP BY DATE(sale_date)
    ORDER BY fecha
    """
    
    # Ejecutar query
    response = athena.start_query_execution(
        QueryString=query,
        QueryExecutionContext={'Database': 'datalake_db'},
        ResultConfiguration={
            'OutputLocation': f"s3://{os.environ['BUCKET']}/athena-results/"
        }
    )
    
    query_id = response['QueryExecutionId']
    
    # Esperar resultado (max 60s)
    for _ in range(12):
        status = athena.get_query_execution(QueryExecutionId=query_id)
        state = status['QueryExecution']['Status']['State']
        if state in ['SUCCEEDED', 'FAILED', 'CANCELLED']:
            break
        time.sleep(5)
    
    if state != 'SUCCEEDED':
        raise Exception(f"Query failed: {state}")
    
    # Obtener resultados
    results = athena.get_query_results(QueryExecutionId=query_id)
    
    # Formatear reporte
    report = "📊 REPORTE DIARIO DE VENTAS\\n" + "="*40 + "\\n\\n"
    
    headers = [col['Label'] for col in results['ResultSet']['ResultSetMetadata']['ColumnInfo']]
    rows = results['ResultSet']['Rows'][1:]  # Skip header
    
    for row in rows:
        values = [col.get('VarCharValue', 'N/A') for col in row['Data']]
        for h, v in zip(headers, values):
            report += f"{h}: {v}\\n"
        report += "\\n"
    
    # Enviar por SNS
    sns.publish(
        TopicArn=os.environ['SNS_TOPIC'],
        Subject='📊 Reporte Diario de Ventas',
        Message=report
    )
    
    return {'statusCode': 200, 'body': 'Report sent'}`, language: 'python' },
      { title: { es: 'Desplegar Lambda', en: 'Deploy Lambda', pt: 'Fazer deploy da Lambda' }, description: { es: 'Crea la función con permisos.', en: 'Create the function with permissions.', pt: 'Crie a função com permissões.' }, code: `# Crear rol
aws iam create-role --role-name LambdaAthenaReportRole --assume-role-policy-document '{
  "Version": "2012-10-17",
  "Statement": [{"Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]
}'

aws iam attach-role-policy --role-name LambdaAthenaReportRole --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam attach-role-policy --role-name LambdaAthenaReportRole --policy-arn arn:aws:iam::aws:policy/AmazonAthenaFullAccess
aws iam attach-role-policy --role-name LambdaAthenaReportRole --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam attach-role-policy --role-name LambdaAthenaReportRole --policy-arn arn:aws:iam::aws:policy/AmazonSNSFullAccess

# Empaquetar y crear
zip -j /tmp/report.zip daily_report_lambda.py

aws lambda create-function \\
  --function-name DailyAthenaReport \\
  --runtime python3.11 \\
  --handler daily_report_lambda.lambda_handler \\
  --role arn:aws:iam::ACCOUNT:role/LambdaAthenaReportRole \\
  --zip-file fileb:///tmp/report.zip \\
  --timeout 120 \\
  --environment "Variables={BUCKET=your-bucket,SNS_TOPIC=arn:aws:sns:...}"`, language: 'bash' },
      { title: { es: 'Crear schedule EventBridge', en: 'Create EventBridge schedule', pt: 'Criar schedule EventBridge' }, description: { es: 'Programa ejecución diaria a las 8 AM.', en: 'Schedule daily execution at 8 AM.', pt: 'Programe execução diária às 8h.' }, code: `# Crear regla de schedule
aws events put-rule \\
  --name DailyReportSchedule \\
  --schedule-expression "cron(0 8 * * ? *)" \\
  --state ENABLED \\
  --description "Daily report at 8 AM UTC"

# Agregar Lambda como target
aws lambda add-permission \\
  --function-name DailyAthenaReport \\
  --statement-id eventbridge-invoke \\
  --action lambda:InvokeFunction \\
  --principal events.amazonaws.com \\
  --source-arn arn:aws:events:us-east-1:ACCOUNT:rule/DailyReportSchedule

aws events put-targets \\
  --rule DailyReportSchedule \\
  --targets '[{"Id": "1", "Arn": "arn:aws:lambda:us-east-1:ACCOUNT:function:DailyAthenaReport"}]'`, language: 'bash' },
      { title: { es: 'Probar manualmente', en: 'Test manually', pt: 'Testar manualmente' }, description: { es: 'Invoca la Lambda para verificar.', en: 'Invoke Lambda to verify.', pt: 'Invoque a Lambda para verificar.' }, code: `aws lambda invoke \\
  --function-name DailyAthenaReport \\
  --payload '{}' \\
  /tmp/response.json

cat /tmp/response.json`, language: 'bash' }
    ],
    cleanup: `aws events remove-targets --rule DailyReportSchedule --ids "1"
aws events delete-rule --name DailyReportSchedule
aws lambda delete-function --function-name DailyAthenaReport`,
    xpReward: 200,
    tags: ['eventbridge', 'athena', 'lambda', 'sns', 'scheduling', 'reporting']
  },

  // LAB 5: CloudWatch Alarm → Lambda Auto-remediation
  {
    id: 'aws-lab-5',
    number: 5,
    title: { es: 'Auto-remediación de Glue Jobs fallidos', en: 'Auto-remediation for failed Glue Jobs', pt: 'Auto-remediação de Glue Jobs que falharam' },
    description: { es: 'Cuando un Glue Job falla, una alarma dispara una Lambda que lo reinicia automáticamente (max 3 intentos).', en: 'When a Glue Job fails, an alarm triggers a Lambda that automatically restarts it (max 3 attempts).', pt: 'Quando um Glue Job falha, um alarme dispara uma Lambda que o reinicia automaticamente (máx 3 tentativas).' },
    services: ['CloudWatch', 'Lambda', 'Glue', 'DynamoDB'],
    difficulty: 'advanced',
    estimatedMinutes: 90,
    phaseIds: ['phase4', 'phase11'],
    architecture: `
┌───────────┐     ┌────────────┐     ┌─────────┐     ┌──────────┐
│ Glue Job  │────▶│ CloudWatch │────▶│  SNS    │────▶│  Lambda  │
│ (fails)   │     │  (alarm)   │     │(trigger)│     │(remediate)│
└───────────┘     └────────────┘     └─────────┘     └─────┬────┘
                                                           │
                                              ┌────────────┼────────────┐
                                              ▼            ▼            ▼
                                         ┌────────┐  ┌─────────┐  ┌─────────┐
                                         │DynamoDB│  │Restart  │  │  SNS    │
                                         │(count) │  │Glue Job │  │(notify) │
                                         └────────┘  └─────────┘  └─────────┘`,
    steps: [
      { title: { es: 'Crear tabla DynamoDB para tracking', en: 'Create DynamoDB table for tracking', pt: 'Criar tabela DynamoDB para tracking' }, description: { es: 'Tabla para contar reintentos por job.', en: 'Table to count retries per job.', pt: 'Tabela para contar retentativas por job.' }, code: `aws dynamodb create-table \\
  --table-name glue-job-retries \\
  --attribute-definitions AttributeName=job_name,AttributeType=S \\
  --key-schema AttributeName=job_name,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST`, language: 'bash' },
      { title: { es: 'Crear Lambda de remediación', en: 'Create remediation Lambda', pt: 'Criar Lambda de remediação' }, description: { es: 'Lambda que reinicia el job si no excede límite.', en: 'Lambda that restarts job if limit not exceeded.', pt: 'Lambda que reinicia o job se o limite não foi excedido.' }, code: `# auto_remediate.py
import boto3
import json
import os

glue = boto3.client('glue')
dynamodb = boto3.resource('dynamodb')
sns = boto3.client('sns')

MAX_RETRIES = 3

def lambda_handler(event, context):
    # Parsear mensaje de alarma
    message = json.loads(event['Records'][0]['Sns']['Message'])
    job_name = message.get('Trigger', {}).get('Dimensions', [{}])[0].get('value', 'unknown')
    
    if job_name == 'unknown':
        # Extraer de alarm description
        job_name = os.environ.get('DEFAULT_JOB', 'sample-etl-job')
    
    table = dynamodb.Table('glue-job-retries')
    
    # Obtener/incrementar contador
    response = table.update_item(
        Key={'job_name': job_name},
        UpdateExpression='SET retry_count = if_not_exists(retry_count, :zero) + :inc, last_retry = :now',
        ExpressionAttributeValues={
            ':zero': 0,
            ':inc': 1,
            ':now': context.aws_request_id
        },
        ReturnValues='ALL_NEW'
    )
    
    retry_count = response['Attributes']['retry_count']
    
    if retry_count <= MAX_RETRIES:
        # Reiniciar job
        glue.start_job_run(JobName=job_name)
        
        sns.publish(
            TopicArn=os.environ['SNS_TOPIC'],
            Subject=f'🔄 Glue Job {job_name} reiniciado (intento {retry_count}/{MAX_RETRIES})',
            Message=f'El job {job_name} falló y fue reiniciado automáticamente.'
        )
        
        return {'action': 'restarted', 'retry': retry_count}
    else:
        # Excedió límite - notificar para intervención manual
        sns.publish(
            TopicArn=os.environ['SNS_TOPIC'],
            Subject=f'🚨 ALERTA: Glue Job {job_name} requiere intervención manual',
            Message=f'El job {job_name} ha fallado {MAX_RETRIES} veces. Requiere revisión manual.'
        )
        
        # Reset counter para siguiente día
        table.update_item(
            Key={'job_name': job_name},
            UpdateExpression='SET retry_count = :zero',
            ExpressionAttributeValues={':zero': 0}
        )
        
        return {'action': 'escalated', 'retry': retry_count}`, language: 'python' },
      { title: { es: 'Crear alarma CloudWatch', en: 'Create CloudWatch alarm', pt: 'Criar alarme CloudWatch' }, description: { es: 'Alarma que detecta fallos de Glue.', en: 'Alarm that detects Glue failures.', pt: 'Alarme que detecta falhas do Glue.' }, code: `# Crear SNS topic para la alarma
ALARM_TOPIC=$(aws sns create-topic --name glue-failures --query TopicArn --output text)

# Suscribir la Lambda
aws sns subscribe \\
  --topic-arn $ALARM_TOPIC \\
  --protocol lambda \\
  --notification-endpoint arn:aws:lambda:us-east-1:ACCOUNT:function:GlueAutoRemediate

# Crear alarma
aws cloudwatch put-metric-alarm \\
  --alarm-name GlueJobFailedAlarm \\
  --alarm-description "Glue job failed - trigger auto-remediation" \\
  --metric-name "glue.driver.aggregate.numFailedTasks" \\
  --namespace Glue \\
  --dimensions Name=JobName,Value=sample-etl-job Name=JobRunId,Value=ALL Name=Type,Value=gauge \\
  --statistic Maximum \\
  --period 300 \\
  --threshold 0 \\
  --comparison-operator GreaterThanThreshold \\
  --evaluation-periods 1 \\
  --alarm-actions $ALARM_TOPIC \\
  --treat-missing-data notBreaching`, language: 'bash' },
      { title: { es: 'Probar flujo completo', en: 'Test full flow', pt: 'Testar fluxo completo' }, description: { es: 'Simula un fallo y verifica remediación.', en: 'Simulate a failure and verify remediation.', pt: 'Simule uma falha e verifique a remediação.' }, code: `# Puedes probar invocando la Lambda directamente con un evento simulado
aws lambda invoke \\
  --function-name GlueAutoRemediate \\
  --payload '{
    "Records": [{
      "Sns": {
        "Message": "{\\"Trigger\\": {\\"Dimensions\\": [{\\"value\\": \\"sample-etl-job\\"}]}}"
      }
    }]
  }' \\
  /tmp/response.json

cat /tmp/response.json`, language: 'bash' }
    ],
    cleanup: `aws cloudwatch delete-alarms --alarm-names GlueJobFailedAlarm
aws lambda delete-function --function-name GlueAutoRemediate
aws dynamodb delete-table --table-name glue-job-retries
aws sns delete-topic --topic-arn $ALARM_TOPIC`,
    xpReward: 225,
    tags: ['cloudwatch', 'lambda', 'glue', 'dynamodb', 'auto-remediation', 'alerting']
  },
  // LAB 6: DynamoDB Streams → Lambda → S3
  {
    id: 'aws-lab-6',
    number: 6,
    title: { es: 'CDC de DynamoDB a Data Lake', en: 'DynamoDB CDC to Data Lake', pt: 'CDC do DynamoDB para Data Lake' },
    description: { es: 'Captura cambios en DynamoDB y los replica al Data Lake en S3 para analytics.', en: 'Capture DynamoDB changes and replicate to Data Lake in S3 for analytics.', pt: 'Capture mudanças no DynamoDB e replique para o Data Lake no S3 para analytics.' },
    services: ['DynamoDB', 'Lambda', 'S3', 'Kinesis Firehose'],
    difficulty: 'intermediate',
    estimatedMinutes: 75,
    phaseIds: ['phase2', 'phase8'],
    architecture: `
┌──────────┐     ┌──────────┐     ┌─────────┐     ┌──────────┐     ┌─────────┐
│ DynamoDB │────▶│ Streams  │────▶│ Lambda  │────▶│ Firehose │────▶│   S3    │
│ (table)  │     │ (CDC)    │     │(process)│     │(batch)   │     │(parquet)│
└──────────┘     └──────────┘     └─────────┘     └──────────┘     └─────────┘`,
    steps: [
      { title: { es: 'Crear tabla DynamoDB con Streams', en: 'Create DynamoDB table with Streams', pt: 'Criar tabela DynamoDB com Streams' }, description: { es: 'Tabla con streams habilitados.', en: 'Table with streams enabled.', pt: 'Tabela com streams habilitados.' }, code: `aws dynamodb create-table \\
  --table-name orders \\
  --attribute-definitions AttributeName=order_id,AttributeType=S \\
  --key-schema AttributeName=order_id,KeyType=HASH \\
  --billing-mode PAY_PER_REQUEST \\
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES`, language: 'bash' },
      { title: { es: 'Crear Lambda processor', en: 'Create Lambda processor', pt: 'Criar Lambda processor' }, description: { es: 'Procesa cambios y envía a Firehose.', en: 'Processes changes and sends to Firehose.', pt: 'Processa mudanças e envia para Firehose.' }, code: `# dynamodb_cdc.py
import json
import boto3
from datetime import datetime

firehose = boto3.client('firehose')

def lambda_handler(event, context):
    records = []
    
    for record in event['Records']:
        event_name = record['eventName']  # INSERT, MODIFY, REMOVE
        
        cdc_record = {
            'event_type': event_name,
            'event_time': datetime.utcnow().isoformat(),
            'table': record['eventSourceARN'].split('/')[1],
            'keys': record['dynamodb'].get('Keys', {}),
            'new_image': record['dynamodb'].get('NewImage', {}),
            'old_image': record['dynamodb'].get('OldImage', {})
        }
        
        records.append({
            'Data': json.dumps(cdc_record) + '\\n'
        })
    
    if records:
        firehose.put_record_batch(
            DeliveryStreamName='dynamodb-cdc-stream',
            Records=records
        )
    
    return {'processed': len(records)}`, language: 'python' },
      { title: { es: 'Configurar trigger', en: 'Configure trigger', pt: 'Configurar trigger' }, description: { es: 'Conecta DynamoDB Streams a Lambda.', en: 'Connect DynamoDB Streams to Lambda.', pt: 'Conecte DynamoDB Streams à Lambda.' }, code: `# Obtener ARN del stream
STREAM_ARN=$(aws dynamodb describe-table --table-name orders --query 'Table.LatestStreamArn' --output text)

# Crear event source mapping
aws lambda create-event-source-mapping \\
  --function-name DynamoDBCDCProcessor \\
  --event-source-arn $STREAM_ARN \\
  --starting-position LATEST \\
  --batch-size 100`, language: 'bash' },
      { title: { es: 'Probar CDC', en: 'Test CDC', pt: 'Testar CDC' }, description: { es: 'Inserta datos y verifica en S3.', en: 'Insert data and verify in S3.', pt: 'Insira dados e verifique no S3.' }, code: `# Insertar orden
aws dynamodb put-item --table-name orders --item '{
  "order_id": {"S": "ORD-001"},
  "customer": {"S": "John Doe"},
  "amount": {"N": "150.00"},
  "status": {"S": "pending"}
}'

# Actualizar orden
aws dynamodb update-item --table-name orders \\
  --key '{"order_id": {"S": "ORD-001"}}' \\
  --update-expression "SET #s = :s" \\
  --expression-attribute-names '{"#s": "status"}' \\
  --expression-attribute-values '{":s": {"S": "completed"}}'

# Verificar en S3 después de 60s
sleep 65 && aws s3 ls s3://YOUR-BUCKET/cdc/ --recursive`, language: 'bash' }
    ],
    cleanup: `aws dynamodb delete-table --table-name orders
aws lambda delete-function --function-name DynamoDBCDCProcessor`,
    xpReward: 175,
    tags: ['dynamodb', 'lambda', 'firehose', 's3', 'cdc', 'streaming']
  },

  // LAB 7: S3 → Lambda → Comprehend → S3 (NLP)
  {
    id: 'aws-lab-7',
    number: 7,
    title: { es: 'Análisis de sentimiento de reviews', en: 'Review sentiment analysis', pt: 'Análise de sentimento de reviews' },
    description: { es: 'Procesa archivos de reviews con Comprehend para detectar sentimiento y entidades.', en: 'Process review files with Comprehend to detect sentiment and entities.', pt: 'Processe arquivos de reviews com Comprehend para detectar sentimento e entidades.' },
    services: ['S3', 'Lambda', 'Comprehend'],
    difficulty: 'intermediate',
    estimatedMinutes: 60,
    phaseIds: ['phase2'],
    architecture: `
┌─────────┐     ┌─────────┐     ┌────────────┐     ┌─────────┐
│   S3    │────▶│ Lambda  │────▶│ Comprehend │────▶│   S3    │
│(reviews)│     │(process)│     │(sentiment) │     │(results)│
└─────────┘     └─────────┘     └────────────┘     └─────────┘`,
    steps: [
      { title: { es: 'Crear Lambda de análisis', en: 'Create analysis Lambda', pt: 'Criar Lambda de análise' }, description: { es: 'Lambda que usa Comprehend.', en: 'Lambda that uses Comprehend.', pt: 'Lambda que usa Comprehend.' }, code: `# sentiment_analyzer.py
import json
import boto3
import csv
import io

s3 = boto3.client('s3')
comprehend = boto3.client('comprehend')

def lambda_handler(event, context):
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']
    
    # Leer archivo de reviews
    response = s3.get_object(Bucket=bucket, Key=key)
    content = response['Body'].read().decode('utf-8')
    
    reviews = list(csv.DictReader(io.StringIO(content)))
    results = []
    
    for review in reviews:
        text = review.get('text', '')[:5000]  # Comprehend limit
        
        # Análisis de sentimiento
        sentiment = comprehend.detect_sentiment(Text=text, LanguageCode='en')
        
        # Detectar entidades
        entities = comprehend.detect_entities(Text=text, LanguageCode='en')
        
        results.append({
            'review_id': review.get('id'),
            'original_text': text[:200],
            'sentiment': sentiment['Sentiment'],
            'sentiment_scores': sentiment['SentimentScore'],
            'entities': [{'text': e['Text'], 'type': e['Type']} for e in entities['Entities'][:10]]
        })
    
    # Guardar resultados
    output_key = key.replace('reviews/', 'analyzed/').replace('.csv', '_analyzed.json')
    s3.put_object(
        Bucket=bucket,
        Key=output_key,
        Body=json.dumps(results, indent=2),
        ContentType='application/json'
    )
    
    return {'analyzed': len(results), 'output': output_key}`, language: 'python' },
      { title: { es: 'Desplegar y configurar trigger', en: 'Deploy and configure trigger', pt: 'Fazer deploy e configurar trigger' }, description: { es: 'Lambda con trigger S3.', en: 'Lambda with S3 trigger.', pt: 'Lambda com trigger S3.' }, code: `# Crear rol con permisos de Comprehend
aws iam create-role --role-name LambdaComprehendRole --assume-role-policy-document '{...}'
aws iam attach-role-policy --role-name LambdaComprehendRole --policy-arn arn:aws:iam::aws:policy/ComprehendFullAccess
aws iam attach-role-policy --role-name LambdaComprehendRole --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

# Crear función
aws lambda create-function \\
  --function-name SentimentAnalyzer \\
  --runtime python3.11 \\
  --handler sentiment_analyzer.lambda_handler \\
  --role arn:aws:iam::ACCOUNT:role/LambdaComprehendRole \\
  --timeout 300 \\
  --zip-file fileb://function.zip

# Configurar trigger S3 para prefix reviews/
aws s3api put-bucket-notification-configuration --bucket YOUR-BUCKET --notification-configuration '{
  "LambdaFunctionConfigurations": [{
    "LambdaFunctionArn": "arn:aws:lambda:...",
    "Events": ["s3:ObjectCreated:*"],
    "Filter": {"Key": {"FilterRules": [{"Name": "prefix", "Value": "reviews/"}]}}
  }]
}'`, language: 'bash' },
      { title: { es: 'Probar con reviews', en: 'Test with reviews', pt: 'Testar com reviews' }, description: { es: 'Sube archivo y verifica análisis.', en: 'Upload file and verify analysis.', pt: 'Faça upload do arquivo e verifique análise.' }, code: `# Crear archivo de prueba
cat > /tmp/sample_reviews.csv << 'EOF'
id,text
1,"This product is amazing! I love it so much, best purchase ever!"
2,"Terrible quality, broke after one day. Very disappointed."
3,"It's okay, nothing special but does the job."
EOF

# Subir
aws s3 cp /tmp/sample_reviews.csv s3://YOUR-BUCKET/reviews/

# Esperar y verificar
sleep 10
aws s3 cp s3://YOUR-BUCKET/analyzed/sample_reviews_analyzed.json -`, language: 'bash' }
    ],
    cleanup: `aws lambda delete-function --function-name SentimentAnalyzer`,
    xpReward: 150,
    tags: ['s3', 'lambda', 'comprehend', 'nlp', 'ml']
  },

  // LAB 8: Terraform Data Lake Module
  {
    id: 'aws-lab-8',
    number: 8,
    title: { es: 'Módulo Terraform para Data Lake', en: 'Terraform module for Data Lake', pt: 'Módulo Terraform para Data Lake' },
    description: { es: 'Crea un módulo Terraform reutilizable que despliega toda la infraestructura de un Data Lake.', en: 'Create a reusable Terraform module that deploys complete Data Lake infrastructure.', pt: 'Crie um módulo Terraform reutilizável que faça deploy de toda a infraestrutura de um Data Lake.' },
    services: ['Terraform', 'S3', 'Glue', 'Athena', 'IAM'],
    difficulty: 'advanced',
    estimatedMinutes: 120,
    phaseIds: ['phase10'],
    architecture: `
┌─────────────────────────────────────────────────────────┐
│                 Terraform Module                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │   S3    │  │  Glue   │  │ Athena  │  │   IAM   │   │
│  │ Buckets │  │ Catalog │  │Workgroup│  │  Roles  │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
└─────────────────────────────────────────────────────────┘`,
    steps: [
      { title: { es: 'Estructura del módulo', en: 'Module structure', pt: 'Estrutura do módulo' }, description: { es: 'Organiza los archivos del módulo.', en: 'Organize module files.', pt: 'Organize os arquivos do módulo.' }, code: `# Crear estructura
mkdir -p modules/datalake
cd modules/datalake

# Archivos necesarios:
# - main.tf (recursos principales)
# - variables.tf (inputs)
# - outputs.tf (outputs)
# - versions.tf (providers)`, language: 'bash' },
      { title: { es: 'variables.tf', en: 'variables.tf', pt: 'variables.tf' }, description: { es: 'Define las variables de entrada.', en: 'Define input variables.', pt: 'Defina as variáveis de entrada.' }, code: `# modules/datalake/variables.tf
variable "project_name" {
  description = "Name of the data lake project"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "enable_versioning" {
  description = "Enable S3 versioning"
  type        = bool
  default     = true
}

variable "lifecycle_glacier_days" {
  description = "Days before moving to Glacier"
  type        = number
  default     = 90
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default     = {}
}`, language: 'hcl' },
      { title: { es: 'main.tf', en: 'main.tf', pt: 'main.tf' }, description: { es: 'Recursos principales del módulo.', en: 'Main module resources.', pt: 'Recursos principais do módulo.' }, code: `# modules/datalake/main.tf
data "aws_caller_identity" "current" {}
data "aws_region" "current" {}

locals {
  bucket_prefix = "\${var.project_name}-\${var.environment}-\${data.aws_caller_identity.current.account_id}"
  common_tags = merge(var.tags, {
    Project     = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
  })
}

# S3 Bucket para Data Lake
resource "aws_s3_bucket" "datalake" {
  bucket = "\${local.bucket_prefix}-datalake"
  tags   = local.common_tags
}

resource "aws_s3_bucket_versioning" "datalake" {
  bucket = aws_s3_bucket.datalake.id
  versioning_configuration {
    status = var.enable_versioning ? "Enabled" : "Disabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "datalake" {
  bucket = aws_s3_bucket.datalake.id
  
  rule {
    id     = "raw-to-glacier"
    status = "Enabled"
    filter { prefix = "raw/" }
    transition {
      days          = var.lifecycle_glacier_days
      storage_class = "GLACIER"
    }
  }
}

# Glue Catalog Database
resource "aws_glue_catalog_database" "main" {
  name = replace(var.project_name, "-", "_")
}

# Athena Workgroup
resource "aws_athena_workgroup" "main" {
  name = "\${var.project_name}-\${var.environment}"
  
  configuration {
    result_configuration {
      output_location = "s3://\${aws_s3_bucket.datalake.bucket}/athena-results/"
    }
  }
  tags = local.common_tags
}

# IAM Role para Glue
resource "aws_iam_role" "glue" {
  name = "\${var.project_name}-\${var.environment}-glue-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "glue.amazonaws.com" }
    }]
  })
  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "glue_service" {
  role       = aws_iam_role.glue.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole"
}`, language: 'hcl' },
      { title: { es: 'outputs.tf y uso', en: 'outputs.tf and usage', pt: 'outputs.tf e uso' }, description: { es: 'Outputs y cómo usar el módulo.', en: 'Outputs and how to use the module.', pt: 'Outputs e como usar o módulo.' }, code: `# modules/datalake/outputs.tf
output "bucket_name" { value = aws_s3_bucket.datalake.bucket }
output "bucket_arn" { value = aws_s3_bucket.datalake.arn }
output "database_name" { value = aws_glue_catalog_database.main.name }
output "glue_role_arn" { value = aws_iam_role.glue.arn }
output "athena_workgroup" { value = aws_athena_workgroup.main.name }

# ---
# Uso del módulo (main.tf en root)
module "datalake_dev" {
  source = "./modules/datalake"
  
  project_name           = "ecommerce"
  environment            = "dev"
  enable_versioning      = true
  lifecycle_glacier_days = 90
  
  tags = {
    Team = "data-engineering"
  }
}

output "datalake_bucket" {
  value = module.datalake_dev.bucket_name
}`, language: 'hcl' },
      { title: { es: 'Desplegar', en: 'Deploy', pt: 'Fazer deploy' }, description: { es: 'Ejecuta Terraform.', en: 'Run Terraform.', pt: 'Execute Terraform.' }, code: `terraform init
terraform plan
terraform apply -auto-approve

# Verificar recursos creados
aws s3 ls | grep datalake
aws glue get-databases
aws athena list-work-groups`, language: 'bash' }
    ],
    cleanup: `terraform destroy -auto-approve`,
    xpReward: 250,
    tags: ['terraform', 'iac', 's3', 'glue', 'athena', 'module']
  },

  // LAB 9: CI/CD para Glue Jobs
  {
    id: 'aws-lab-9',
    number: 9,
    title: { es: 'CI/CD para Glue Jobs con GitHub Actions', en: 'CI/CD for Glue Jobs with GitHub Actions', pt: 'CI/CD para Glue Jobs com GitHub Actions' },
    description: { es: 'Pipeline que hace lint, test y deploy de Glue jobs automáticamente en cada push.', en: 'Pipeline that lints, tests, and deploys Glue jobs automatically on each push.', pt: 'Pipeline que faz lint, test e deploy de Glue jobs automaticamente em cada push.' },
    services: ['GitHub Actions', 'Glue', 'S3'],
    difficulty: 'advanced',
    estimatedMinutes: 90,
    phaseIds: ['phase10'],
    architecture: `
┌─────────┐     ┌──────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Push   │────▶│  Lint    │────▶│  Test   │────▶│ Upload  │────▶│ Update  │
│(GitHub) │     │ (ruff)   │     │(pytest) │     │  (S3)   │     │ (Glue)  │
└─────────┘     └──────────┘     └─────────┘     └─────────┘     └─────────┘`,
    steps: [
      { title: { es: 'Estructura del proyecto', en: 'Project structure', pt: 'Estrutura do projeto' }, description: { es: 'Organiza el repo de Glue jobs.', en: 'Organize the Glue jobs repo.', pt: 'Organize o repo de Glue jobs.' }, code: `glue-jobs/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── jobs/
│   ├── etl_sales.py
│   └── etl_customers.py
├── tests/
│   ├── test_etl_sales.py
│   └── conftest.py
├── requirements.txt
└── pyproject.toml`, language: 'bash' },
      { title: { es: 'GitHub Actions workflow', en: 'GitHub Actions workflow', pt: 'GitHub Actions workflow' }, description: { es: 'Pipeline de CI/CD completo.', en: 'Complete CI/CD pipeline.', pt: 'Pipeline de CI/CD completo.' }, code: `# .github/workflows/deploy.yml
name: Glue Jobs CI/CD

on:
  push:
    branches: [main]
    paths: ['jobs/**']
  pull_request:
    branches: [main]

env:
  AWS_REGION: us-east-1
  SCRIPTS_BUCKET: glue-scripts-bucket

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: pip install ruff
      - run: ruff check jobs/

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.11' }
      - run: pip install -r requirements.txt
      - run: pip install pytest moto
      - run: pytest tests/ -v

  deploy:
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Configure AWS
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          aws-region: \${{ env.AWS_REGION }}
      
      - name: Upload scripts to S3
        run: |
          for file in jobs/*.py; do
            aws s3 cp "$file" "s3://\$SCRIPTS_BUCKET/jobs/"
          done
      
      - name: Update Glue Jobs
        run: |
          for file in jobs/*.py; do
            JOB_NAME=$(basename "$file" .py)
            aws glue update-job --job-name "$JOB_NAME" \\
              --job-update "{
                \\"Command\\": {
                  \\"ScriptLocation\\": \\"s3://\$SCRIPTS_BUCKET/jobs/$(basename $file)\\"
                }
              }" 2>/dev/null || echo "Job $JOB_NAME not found, skipping"
          done`, language: 'yaml' },
      { title: { es: 'Test local con moto', en: 'Local test with moto', pt: 'Teste local com moto' }, description: { es: 'Tests unitarios para Glue.', en: 'Unit tests for Glue.', pt: 'Testes unitários para Glue.' }, code: `# tests/conftest.py
import pytest
import boto3
from moto import mock_aws

@pytest.fixture
def aws_credentials():
    import os
    os.environ['AWS_ACCESS_KEY_ID'] = 'testing'
    os.environ['AWS_SECRET_ACCESS_KEY'] = 'testing'
    os.environ['AWS_SECURITY_TOKEN'] = 'testing'
    os.environ['AWS_SESSION_TOKEN'] = 'testing'
    os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'

@pytest.fixture
def s3_client(aws_credentials):
    with mock_aws():
        yield boto3.client('s3', region_name='us-east-1')

# tests/test_etl_sales.py
def test_transform_sales_data():
    # Import tu función de transformación
    from jobs.etl_sales import transform_sales
    
    input_data = [{'id': 1, 'amount': '100.50'}]
    result = transform_sales(input_data)
    
    assert result[0]['amount'] == 100.50
    assert 'processed_at' in result[0]`, language: 'python' },
      { title: { es: 'Configurar secrets', en: 'Configure secrets', pt: 'Configurar secrets' }, description: { es: 'OIDC para GitHub Actions.', en: 'OIDC for GitHub Actions.', pt: 'OIDC para GitHub Actions.' }, code: `# 1. Crear Identity Provider en IAM para GitHub
aws iam create-open-id-connect-provider \\
  --url https://token.actions.githubusercontent.com \\
  --client-id-list sts.amazonaws.com

# 2. Crear rol con trust policy para GitHub
# (Agregar tu repo en la condición)

# 3. En GitHub: Settings > Secrets > Actions
# Agregar: AWS_ROLE_ARN = arn:aws:iam::ACCOUNT:role/GitHubActionsRole`, language: 'bash' }
    ],
    cleanup: `# Eliminar workflow borrando el archivo y haciendo push`,
    xpReward: 225,
    tags: ['github-actions', 'cicd', 'glue', 'testing', 'devops']
  },

  // LAB 10: Lake Formation Data Sharing
  {
    id: 'aws-lab-10',
    number: 10,
    title: { es: 'Data Sharing entre cuentas con Lake Formation', en: 'Cross-account Data Sharing with Lake Formation', pt: 'Data Sharing entre contas com Lake Formation' },
    description: { es: 'Comparte tablas del Data Lake con otra cuenta AWS de forma segura usando Lake Formation.', en: 'Share Data Lake tables with another AWS account securely using Lake Formation.', pt: 'Compartilhe tabelas do Data Lake com outra conta AWS de forma segura usando Lake Formation.' },
    services: ['Lake Formation', 'Glue', 'RAM'],
    difficulty: 'advanced',
    estimatedMinutes: 90,
    phaseIds: ['phase3'],
    architecture: `
┌─────────────────────┐          ┌─────────────────────┐
│   Producer Account  │          │  Consumer Account   │
│  ┌───────────────┐  │   RAM    │  ┌───────────────┐  │
│  │ Lake Formation│──┼──────────┼──│ Lake Formation│  │
│  │   (tables)    │  │  Share   │  │   (access)    │  │
│  └───────────────┘  │          │  └───────────────┘  │
│  ┌───────────────┐  │          │  ┌───────────────┐  │
│  │      S3       │  │          │  │    Athena     │  │
│  │   (data)      │  │          │  │   (query)     │  │
│  └───────────────┘  │          │  └───────────────┘  │
└─────────────────────┘          └─────────────────────┘`,
    steps: [
      { title: { es: 'Configurar Lake Formation (Producer)', en: 'Configure Lake Formation (Producer)', pt: 'Configurar Lake Formation (Producer)' }, description: { es: 'Registrar S3 y configurar permisos.', en: 'Register S3 and configure permissions.', pt: 'Registrar S3 e configurar permissões.' }, code: `# Registrar ubicación S3
aws lakeformation register-resource \\
  --resource-arn arn:aws:s3:::datalake-bucket \\
  --use-service-linked-role

# Dar permisos de admin a tu usuario
aws lakeformation grant-permissions \\
  --principal DataLakePrincipalIdentifier=arn:aws:iam::ACCOUNT:user/admin \\
  --resource '{"Database": {"Name": "sales_db"}}' \\
  --permissions ALL`, language: 'bash' },
      { title: { es: 'Compartir tabla con otra cuenta', en: 'Share table with another account', pt: 'Compartilhar tabela com outra conta' }, description: { es: 'Usa Lake Formation para compartir.', en: 'Use Lake Formation to share.', pt: 'Use Lake Formation para compartilhar.' }, code: `# Otorgar permisos a la cuenta consumidora
aws lakeformation grant-permissions \\
  --principal DataLakePrincipalIdentifier=CONSUMER_ACCOUNT_ID \\
  --resource '{
    "Table": {
      "DatabaseName": "sales_db",
      "Name": "transactions"
    }
  }' \\
  --permissions SELECT \\
  --permissions-with-grant-option []

# Habilitar cross-account para la tabla
aws lakeformation put-data-lake-settings \\
  --data-lake-settings '{
    "DataLakeAdmins": [{"DataLakePrincipalIdentifier": "arn:aws:iam::ACCOUNT:user/admin"}],
    "CreateDatabaseDefaultPermissions": [],
    "CreateTableDefaultPermissions": []
  }'

# Compartir via RAM (Resource Access Manager)
aws ram create-resource-share \\
  --name "DataLake-Share" \\
  --resource-arns "arn:aws:glue:us-east-1:ACCOUNT:table/sales_db/transactions" \\
  --principals "CONSUMER_ACCOUNT_ID"`, language: 'bash' },
      { title: { es: 'Aceptar share (Consumer)', en: 'Accept share (Consumer)', pt: 'Aceitar share (Consumer)' }, description: { es: 'En la cuenta consumidora.', en: 'In the consumer account.', pt: 'Na conta consumidora.' }, code: `# En la cuenta CONSUMER

# 1. Aceptar resource share
aws ram accept-resource-share-invitation \\
  --resource-share-invitation-arn "arn:aws:ram:..."

# 2. Crear resource link a la tabla compartida
aws glue create-database --database-input '{"Name": "shared_data"}'

aws glue create-table \\
  --database-name shared_data \\
  --table-input '{
    "Name": "transactions_link",
    "TargetTable": {
      "CatalogId": "PRODUCER_ACCOUNT_ID",
      "DatabaseName": "sales_db",
      "Name": "transactions"
    }
  }'`, language: 'bash' },
      { title: { es: 'Consultar datos compartidos', en: 'Query shared data', pt: 'Consultar dados compartilhados' }, description: { es: 'Usa Athena en la cuenta consumer.', en: 'Use Athena in consumer account.', pt: 'Use Athena na conta consumer.' }, code: `-- En Athena de la cuenta Consumer
SELECT 
    DATE(transaction_date) as fecha,
    COUNT(*) as num_transactions,
    SUM(amount) as total
FROM shared_data.transactions_link
WHERE transaction_date >= current_date - interval '7' day
GROUP BY DATE(transaction_date)
ORDER BY fecha;

-- Los datos vienen de la cuenta Producer pero se consultan desde Consumer`, language: 'sql' }
    ],
    cleanup: `# Producer: Revocar permisos
aws lakeformation revoke-permissions ...
aws ram delete-resource-share --resource-share-arn ...

# Consumer: Eliminar resource link
aws glue delete-table --database-name shared_data --name transactions_link`,
    xpReward: 250,
    tags: ['lakeformation', 'ram', 'governance', 'cross-account', 'security']
  }
];

// Helper para obtener lab por ID
export const getLabById = (id: string): AWSLab | undefined => {
  return awsLabs.find(l => l.id === id);
};

// Helper para obtener labs por fase
export const getLabsByPhase = (phaseId: string): AWSLab[] => {
  return awsLabs.filter(l => l.phaseIds.includes(phaseId));
};

// Estadísticas
export const labStats = {
  total: awsLabs.length,
  totalMinutes: awsLabs.reduce((sum, l) => sum + l.estimatedMinutes, 0),
  totalXP: awsLabs.reduce((sum, l) => sum + l.xpReward, 0),
  byDifficulty: {
    beginner: awsLabs.filter(l => l.difficulty === 'beginner').length,
    intermediate: awsLabs.filter(l => l.difficulty === 'intermediate').length,
    advanced: awsLabs.filter(l => l.difficulty === 'advanced').length
  }
};

