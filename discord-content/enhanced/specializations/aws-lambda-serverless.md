---
id: "spec-aws-lambda-serverless"
version: "1.0.0"
lastUpdated: "2026-02-08"

title:
  es: "AWS Lambda para Data Engineering: Deep Dive Completo"
  en: "AWS Lambda for Data Engineering: Complete Deep Dive"
  pt: "AWS Lambda para Data Engineering: Deep Dive Completo"

subtitle:
  es: "Procesamiento serverless de datos con Lambda, S3 triggers y patrones ETL"
  en: "Serverless data processing with Lambda, S3 triggers and ETL patterns"
  pt: "Processamento serverless de dados com Lambda, S3 triggers e padrões ETL"

level: "specialization"
phase: "spec-aws-lambda"
estimatedTime: "20-30 horas"

prerequisites:
  - "spec-aws-data-stack"
  - "l2-cloud-architecture"

tags:
  - "aws"
  - "lambda"
  - "serverless"
  - "s3-triggers"
  - "etl"
  - "data-engineering"

theoreticalFoundations:
  - "Serverless computing model"
  - "Event-driven architecture"
  - "ETL patterns"
  - "Cold start optimization"
---

<!-- 
╔══════════════════════════════════════════════════════════════╗
║  📚 BLOQUE: AWS LAMBDA PARA DATA ENGINEERING               ║
║  Especialización: AWS Data Engineering                      ║
╚══════════════════════════════════════════════════════════════╝
-->

# ⚡ AWS Lambda para Data Engineering: Deep Dive Completo

> **Objetivo**: Dominar AWS Lambda como motor de ingesta y transformación de datos. Desde S3 triggers hasta patrones ETL de producción con manejo de errores y monitoreo.

---

## 1. ¿Por qué Lambda es el Motor de Ingesta #1?

Lambda es el servicio más utilizado para **ingesta event-driven** en pipelines de datos modernos. Cada vez que un archivo llega a S3, Lambda puede procesarlo automáticamente sin necesidad de servidores.

### Arquitectura Event-Driven de Ingesta

```
                        ┌─────────────────────────────────────┐
                        │         DATA PIPELINE               │
                        │         (Event-Driven)              │
                        └─────────────────────────────────────┘

  ┌──────────┐    S3 Event     ┌──────────┐     Write      ┌──────────┐
  │          │ ──────────────► │          │ ─────────────► │          │
  │  S3 Raw  │   (ObjectCreated)│  Lambda  │  (Parquet)     │ S3 Clean │
  │  Bucket  │                 │ Function │                │  Bucket  │
  │          │                 │          │                │          │
  └──────────┘                 └────┬─────┘                └────┬─────┘
       ▲                            │                           │
       │                            │ Log / Error               │ Query
   Upload                           ▼                           ▼
   (CSV, JSON)               ┌──────────┐              ┌──────────────┐
                              │CloudWatch│              │    Athena    │
                              │  Logs    │              │   / Redshift │
                              └──────────┘              └──────────────┘
```

### Ventajas Clave para Data Engineering

| Característica         | Beneficio para Data                          |
|------------------------|----------------------------------------------|
| **Auto-scaling**       | 1 archivo o 10,000 → Lambda escala solo      |
| **Pago por uso**       | $0 cuando no hay datos que procesar          |
| **Event-driven**       | Reacciona en segundos a nuevos archivos      |
| **Sin mantenimiento**  | No hay servidores, OS, ni parches            |
| **Integración nativa** | S3, SQS, Kinesis, DynamoDB triggers          |

> **Dato clave**: El 90% de los pipelines de ingesta en startups y empresas medianas usan Lambda + S3 como primer paso.

---

## 2. Modelo de Ejecución

### Ciclo de Vida de una Invocación

```
┌─────────────────────────────────────────────────────────────┐
│                   COLD START                                 │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │ Download │  │  Init Runtime│  │  Init Handler      │    │
│  │ Code     │──│  (Python 3.x)│──│  (imports, clients)│    │
│  │ (~50ms)  │  │  (~200ms)    │  │  (~100-500ms)      │    │
│  └──────────┘  └──────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   WARM INVOCATION                            │
│  ┌──────────────────────────────┐                           │
│  │  handler(event, context)     │  ← Solo esto se repite   │
│  │  (~10-50ms overhead)         │                           │
│  └──────────────────────────────┘                           │
└─────────────────────────────────────────────────────────────┘
```

### Cold Start vs Warm Start

```python
# ✅ BUENA PRÁCTICA: Inicializar FUERA del handler
# Esto se ejecuta SOLO en cold start
import boto3
import pandas as pd

s3_client = boto3.client('s3')
glue_client = boto3.client('glue')

# Reutilización de conexión entre invocaciones
print("Cold start: clientes inicializados")


def handler(event, context):
    """
    Esto se ejecuta en CADA invocación (warm o cold).
    Los clientes de arriba se REUTILIZAN.
    """
    # Procesar evento...
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    return process_file(bucket, key)
```

### Provisioned Concurrency (Eliminar Cold Starts)

```python
# Para pipelines críticos: configurar provisioned concurrency
# AWS CLI:
# aws lambda put-provisioned-concurrency-config \
#   --function-name data-ingestion \
#   --qualifier prod \
#   --provisioned-concurrent-executions 5
```

> **Tip**: Para Data Engineering, cold starts de ~1-2 segundos son aceptables. Usa Provisioned Concurrency solo si el SLA es < 500ms.

---

## 3. S3 Trigger: El Patrón Más Importante

### Estructura del Evento S3

```json
{
  "Records": [
    {
      "eventVersion": "2.1",
      "eventSource": "aws:s3",
      "eventName": "ObjectCreated:Put",
      "eventTime": "2026-02-08T10:30:00.000Z",
      "s3": {
        "bucket": {
          "name": "raw-data-lake",
          "arn": "arn:aws:s3:::raw-data-lake"
        },
        "object": {
          "key": "incoming/ventas/2026/02/08/ventas_diarias.csv",
          "size": 15728640,
          "eTag": "a1b2c3d4e5f6"
        }
      }
    }
  ]
}
```

### Filtros de Prefijo y Sufijo

```
Configuración del trigger:
  ├── Prefix: "incoming/"      → Solo archivos en incoming/
  ├── Suffix: ".csv"           → Solo archivos CSV
  └── Events: ObjectCreated    → Solo creación, no borrado
```

> **Regla de oro**: SIEMPRE usar prefix y suffix para evitar invocaciones innecesarias.

### Evitar Loops Infinitos (Error Clásico #1)

```
❌ LOOP INFINITO:
S3 (raw/) → Lambda → Escribe en S3 (raw/) → Trigger de nuevo → Lambda → ...

✅ SOLUCIÓN 1: Buckets separados
S3 (raw-bucket) → Lambda → S3 (clean-bucket)   ← SIN trigger en clean

✅ SOLUCIÓN 2: Prefijos diferentes
S3 (incoming/) → Lambda → S3 (processed/)
   └── Trigger solo en incoming/

✅ SOLUCIÓN 3: Sufijos diferentes
S3 (*.csv) → Lambda → S3 (*.parquet)
   └── Trigger solo en .csv
```

```python
def handler(event, context):
    """Handler con protección anti-loop."""
    bucket = event['Records'][0]['s3']['bucket']['name']
    key = event['Records'][0]['s3']['object']['key']

    # Protección anti-loop: verificar prefijo
    if not key.startswith('incoming/'):
        print(f"SKIP: {key} no está en incoming/")
        return {'statusCode': 200, 'body': 'Skipped'}

    # Protección adicional: verificar extensión
    if not key.endswith('.csv'):
        print(f"SKIP: {key} no es CSV")
        return {'statusCode': 200, 'body': 'Skipped'}

    return process_file(bucket, key)
```

---

## 4. Handler Pattern para ETL (CSV → Parquet)

### Patrón Completo de Transformación

```python
import boto3
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
from io import BytesIO
from urllib.parse import unquote_plus
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

s3_client = boto3.client('s3')

CLEAN_BUCKET = 'clean-data-lake'


def handler(event, context):
    """
    ETL Lambda: CSV → Parquet con validación.

    Trigger: S3 ObjectCreated en raw-data-lake/incoming/*.csv
    Output:  clean-data-lake/processed/YYYY/MM/DD/filename.parquet
    """
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        # Decodificar caracteres especiales en el key
        key = unquote_plus(record['s3']['object']['key'])
        size_mb = record['s3']['object']['size'] / (1024 * 1024)

        logger.info(f"Procesando: s3://{bucket}/{key} ({size_mb:.1f} MB)")

        try:
            # 1. EXTRACT: Leer CSV desde S3
            response = s3_client.get_object(Bucket=bucket, Key=key)
            df = pd.read_csv(response['Body'], encoding='utf-8')
            logger.info(f"Filas leídas: {len(df)}, Columnas: {list(df.columns)}")

            # 2. TRANSFORM: Limpieza y validación
            df = transform_data(df)

            # 3. LOAD: Escribir Parquet a bucket limpio
            output_key = generate_output_key(key)
            write_parquet_to_s3(df, CLEAN_BUCKET, output_key)

            logger.info(f"Escrito: s3://{CLEAN_BUCKET}/{output_key}")

        except Exception as e:
            logger.error(f"Error procesando {key}: {str(e)}")
            raise  # Re-raise para que Lambda marque como fallo

    return {
        'statusCode': 200,
        'body': f'Procesados {len(event["Records"])} archivos'
    }


def transform_data(df: pd.DataFrame) -> pd.DataFrame:
    """Transformaciones de limpieza estándar."""
    # Normalizar nombres de columnas
    df.columns = [col.strip().lower().replace(' ', '_') for col in df.columns]

    # Eliminar duplicados
    initial_rows = len(df)
    df = df.drop_duplicates()
    logger.info(f"Duplicados eliminados: {initial_rows - len(df)}")

    # Convertir fechas
    date_columns = [col for col in df.columns if 'fecha' in col or 'date' in col]
    for col in date_columns:
        df[col] = pd.to_datetime(df[col], errors='coerce')

    # Eliminar filas completamente nulas
    df = df.dropna(how='all')

    # Agregar metadata de procesamiento
    df['_processed_at'] = pd.Timestamp.now()
    df['_source_file'] = 'lambda_etl'

    return df


def generate_output_key(input_key: str) -> str:
    """
    incoming/ventas/archivo.csv → processed/ventas/2026/02/08/archivo.parquet
    """
    from datetime import datetime
    today = datetime.now()

    filename = input_key.split('/')[-1].replace('.csv', '.parquet')
    path_parts = input_key.replace('incoming/', '').rsplit('/', 1)[0]

    return f"processed/{path_parts}/{today.strftime('%Y/%m/%d')}/{filename}"


def write_parquet_to_s3(df: pd.DataFrame, bucket: str, key: str):
    """Escribir DataFrame como Parquet a S3."""
    buffer = BytesIO()
    table = pa.Table.from_pandas(df)
    pq.write_table(
        table,
        buffer,
        compression='snappy',  # Balance entre tamaño y velocidad
        use_dictionary=True,
        write_statistics=True
    )
    buffer.seek(0)

    s3_client.put_object(
        Bucket=bucket,
        Key=key,
        Body=buffer.getvalue(),
        ContentType='application/octet-stream'
    )
```

---

## 5. Secrets Manager Integration

### Patrón con Caching (Evitar llamadas repetidas)

```python
import boto3
import json
from functools import lru_cache

secrets_client = boto3.client('secretsmanager')


@lru_cache(maxsize=1)
def get_database_credentials(secret_name: str = 'prod/data-pipeline/redshift') -> dict:
    """
    Obtener credenciales con caching en memoria.
    En warm invocations, se reutiliza el cache (0 costo adicional).
    """
    response = secrets_client.get_secret_value(SecretId=secret_name)
    return json.loads(response['SecretString'])


def handler(event, context):
    """Handler que usa credenciales cacheadas."""
    # Primera invocación: llama a Secrets Manager (~50ms)
    # Siguientes invocaciones: usa cache (~0ms)
    creds = get_database_credentials()

    connection_string = (
        f"postgresql://{creds['username']}:{creds['password']}"
        f"@{creds['host']}:{creds['port']}/{creds['database']}"
    )

    # Usar la conexión para cargar datos...
    load_to_redshift(connection_string, event)
```

### Uso de Lambda Extensions para Secrets (Avanzado)

```
┌──────────────────────────────────────────────┐
│               Lambda Execution Env           │
│  ┌────────────────┐  ┌────────────────────┐  │
│  │   Tu Código    │  │  Secrets Manager   │  │
│  │   (Handler)    │──│  Extension         │  │
│  │                │  │  (cache local)     │  │
│  └────────────────┘  └────────────────────┘  │
└──────────────────────────────────────────────┘

Ventaja: Cache automático de secretos con TTL configurable.
ARN Layer: arn:aws:lambda:<region>:177933569100:layer:
           AWS-Parameters-and-Secrets-Lambda-Extension:11
```

---

## 6. Lambda Layers para Dependencias

### El Problema

Lambda viene con un runtime mínimo de Python. Librerías como `pandas`, `pyarrow` o `numpy` **no están incluidas** y pesan > 50 MB.

### Crear un Layer con pandas + pyarrow

```bash
# 1. Crear directorio con estructura requerida
mkdir -p lambda-layer/python

# 2. Instalar dependencias para Amazon Linux 2 (arquitectura Lambda)
pip install pandas pyarrow \
  --target lambda-layer/python \
  --platform manylinux2014_x86_64 \
  --only-binary=:all:

# 3. Comprimir (máximo 250 MB descomprimido)
cd lambda-layer
zip -r9 pandas-pyarrow-layer.zip python/

# 4. Publicar layer
aws lambda publish-layer-version \
  --layer-name pandas-pyarrow \
  --description "pandas 2.x + pyarrow para ETL" \
  --zip-file fileb://pandas-pyarrow-layer.zip \
  --compatible-runtimes python3.11 python3.12
```

### Layers Públicos Recomendados

```
┌───────────────────────────────────────────────────────────┐
│  Layer                  │ Tamaño  │ Uso                   │
├─────────────────────────┼─────────┼───────────────────────┤
│ AWSSDKPandas-Python312  │ ~90 MB  │ pandas + numpy        │
│  (AWS Data Wrangler)    │         │ + awswrangler         │
│ pyarrow                 │ ~80 MB  │ Lectura/escritura     │
│                         │         │ Parquet               │
│ psycopg2                │ ~15 MB  │ PostgreSQL/Redshift   │
│ requests                │ ~2 MB   │ APIs HTTP             │
└───────────────────────────────────────────────────────────┘
```

> **AWS Data Wrangler** (awswrangler): Layer oficial de AWS que incluye pandas + integración nativa con S3, Glue, Athena, Redshift. Ideal para Data Engineering.

```python
# Con AWS Data Wrangler layer, tu código se simplifica:
import awswrangler as wr

def handler(event, context):
    # Leer CSV desde S3
    df = wr.s3.read_csv('s3://raw-bucket/incoming/data.csv')

    # Escribir Parquet directamente (con Glue Catalog opcional)
    wr.s3.to_parquet(
        df=df,
        path='s3://clean-bucket/processed/',
        dataset=True,
        database='my_database',     # Registrar en Glue Catalog
        table='my_table',
        mode='append',
        partition_cols=['year', 'month']
    )
```

---

## 7. Error Handling: DLQ, Destinations y SNS

### Estrategia de Errores para Pipelines de Datos

```
                    Invocación Lambda
                          │
                    ┌─────┴─────┐
                    │ ¿Éxito?   │
                    └─────┬─────┘
                   Sí/    │    \No
                  /       │     \
                 ▼        │      ▼
          ┌──────────┐    │  ┌──────────────┐
          │ Success  │    │  │ Retry x2     │ ← AWS reintenta automáticamente
          │Destination│   │  │ (async)      │   en invocaciones asíncronas
          └──────────┘    │  └──────┬───────┘
               │          │         │
               ▼          │    ¿Sigue fallando?
          ┌──────────┐    │         │
          │ SNS/SQS  │    │         ▼
          │ Notificar│    │  ┌──────────────┐
          │ Éxito    │    │  │ DLQ (SQS)    │ ← Mensaje va a Dead Letter Queue
          └──────────┘    │  │ o Failure    │
                          │  │ Destination  │
                          │  └──────┬───────┘
                          │         │
                          │         ▼
                          │  ┌──────────────┐
                          │  │ Alerta SNS   │ → Email/Slack/PagerDuty
                          │  │ + Reprocesar │
                          │  └──────────────┘
```

### Configurar DLQ con CloudFormation/SAM

```yaml
# template.yaml (AWS SAM)
Resources:
  DataIngestionFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: data-ingestion-etl
      Runtime: python3.12
      Handler: app.handler
      Timeout: 300
      MemorySize: 1024
      # Dead Letter Queue
      DeadLetterQueue:
        Type: SQS
        TargetArn: !GetAtt IngestionDLQ.Arn
      # Destinations (más modernas que DLQ)
      EventInvokeConfig:
        MaximumRetryAttempts: 2
        OnSuccess:
          Type: SNS
          Destination: !Ref SuccessTopic
        OnFailure:
          Type: SQS
          Destination: !GetAtt IngestionDLQ.Arn

  IngestionDLQ:
    Type: AWS::SQS::Queue
    Properties:
      QueueName: data-ingestion-dlq
      MessageRetentionPeriod: 1209600  # 14 días

  SuccessTopic:
    Type: AWS::SNS::Topic
    Properties:
      TopicName: data-ingestion-success
```

### Manejo de Errores en Código

```python
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)


class DataValidationError(Exception):
    """Error de validación que NO debe reintentarse."""
    pass


class TransientError(Exception):
    """Error transitorio que SÍ debe reintentarse."""
    pass


def handler(event, context):
    try:
        result = process_event(event)
        return {'statusCode': 200, 'body': result}

    except DataValidationError as e:
        # Error de datos → no reintentar, enviar a DLQ directamente
        logger.error(f"Validación fallida (no retry): {e}")
        # Guardar el archivo problemático en bucket de errores
        save_to_error_bucket(event, str(e))
        return {'statusCode': 400, 'body': str(e)}

    except TransientError as e:
        # Error transitorio → dejar que Lambda reintente
        logger.warning(f"Error transitorio (retry): {e}")
        raise  # Re-raise = Lambda reintenta

    except Exception as e:
        # Error inesperado → log detallado + raise
        logger.error(f"Error inesperado: {e}", exc_info=True)
        raise
```

---

## 8. Testing y Debugging

### Eventos de Test (Simular S3 Trigger)

```json
{
  "Records": [
    {
      "eventVersion": "2.1",
      "eventSource": "aws:s3",
      "eventName": "ObjectCreated:Put",
      "s3": {
        "bucket": {
          "name": "test-raw-bucket"
        },
        "object": {
          "key": "incoming/ventas/test_data.csv",
          "size": 1024
        }
      }
    }
  ]
}
```

### Unit Testing Local

```python
# test_handler.py
import pytest
import json
from unittest.mock import patch, MagicMock
from io import BytesIO
import pandas as pd


@pytest.fixture
def s3_event():
    """Evento S3 de prueba."""
    return {
        "Records": [{
            "s3": {
                "bucket": {"name": "test-bucket"},
                "object": {"key": "incoming/test.csv", "size": 100}
            }
        }]
    }


@pytest.fixture
def sample_csv():
    """CSV de prueba como bytes."""
    df = pd.DataFrame({
        'nombre': ['Ana', 'Luis', 'Ana'],
        'fecha': ['2026-01-01', '2026-01-02', '2026-01-01'],
        'monto': [100.5, 200.0, 100.5]
    })
    buffer = BytesIO()
    df.to_csv(buffer, index=False)
    buffer.seek(0)
    return buffer


@patch('app.s3_client')
def test_handler_csv_to_parquet(mock_s3, s3_event, sample_csv):
    """Verificar que CSV se convierte a Parquet correctamente."""
    # Arrange
    mock_s3.get_object.return_value = {'Body': sample_csv}

    # Act
    from app import handler
    result = handler(s3_event, None)

    # Assert
    assert result['statusCode'] == 200
    mock_s3.put_object.assert_called_once()
    call_args = mock_s3.put_object.call_args
    assert 'processed/' in call_args.kwargs['Key']
    assert call_args.kwargs['Key'].endswith('.parquet')
```

### CloudWatch Logs Insights Queries

```sql
-- Encontrar errores en las últimas 24 horas
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 50

-- Duración promedio por función
fields @timestamp, @duration, @billedDuration, @memorySize, @maxMemoryUsed
| stats avg(@duration) as avg_duration,
        max(@duration) as max_duration,
        count(*) as invocations
| filter @type = "REPORT"

-- Cold starts vs warm starts
fields @timestamp, @initDuration
| stats count(*) as total,
        count(@initDuration) as cold_starts,
        avg(@initDuration) as avg_cold_start_ms
| filter @type = "REPORT"

-- Archivos procesados por hora
fields @timestamp, @message
| filter @message like /Procesando: s3/
| stats count(*) as archivos_por_hora by bin(1h)

-- Top 10 archivos más lentos
fields @timestamp, @duration, @message
| filter @message like /Procesando/
| sort @duration desc
| limit 10
```

### X-Ray Tracing (Trazabilidad End-to-End)

```python
# Activar X-Ray en la configuración de Lambda
# Y agregar el SDK:
from aws_xray_sdk.core import xray_recorder, patch_all

# Instrumentar automáticamente boto3, requests, etc.
patch_all()


@xray_recorder.capture('process_csv')
def process_csv(bucket, key):
    """Esta función aparecerá como subsegmento en X-Ray."""
    # ... procesamiento
    pass
```

---

## 9. Límites y Cuándo Usar Fargate

### Límites de Lambda (2026)

```
┌───────────────────────────────────────────────────┐
│  Recurso                │ Límite                  │
├─────────────────────────┼─────────────────────────┤
│  Timeout máximo         │ 15 minutos              │
│  Memoria máxima         │ 10,240 MB (10 GB)       │
│  Almacenamiento /tmp    │ 10,240 MB (10 GB)       │
│  Payload (sync)         │ 6 MB                    │
│  Payload (async)        │ 256 KB                  │
│  Concurrencia por cuenta│ 1,000 (default)         │
│  Package size (zip)     │ 50 MB (250 MB descomp.) │
│  Container image        │ 10 GB                   │
│  vCPUs (proporcional)   │ 6 vCPUs (a 10 GB RAM)   │
│  Ephemeral storage      │ 10 GB /tmp              │
└───────────────────────────────────────────────────┘
```

### Árbol de Decisión: Lambda vs Fargate

```
¿Tu tarea necesita más de 15 minutos?
├── SÍ → Fargate
└── NO
    ├── ¿Necesita más de 10 GB RAM?
    │   ├── SÍ → Fargate
    │   └── NO
    │       ├── ¿El archivo pesa más de 10 GB?
    │       │   ├── SÍ → Fargate (streaming con EFS o /tmp no alcanza)
    │       │   └── NO
    │       │       ├── ¿Necesita GPU?
    │       │       │   ├── SÍ → Fargate o EC2
    │       │       │   └── NO → ✅ LAMBDA
    │       │       └──
    │       └──
    └──
```

> **Regla práctica**: Si tu archivo cabe en memoria y se procesa en < 10 minutos → **Lambda**. De lo contrario → **Fargate**.

---

## 10. Preguntas de Entrevista

### Pregunta 1: Cold Start Optimization
**P**: Tu Lambda de ingesta tiene cold starts de 8 segundos que afectan el SLA. ¿Cómo lo resuelves?

**R**: Múltiples estrategias en orden de impacto:
1. **Reducir el tamaño del package**: Eliminar dependencias innecesarias, usar Layers.
2. **Provisioned Concurrency**: Mantener N instancias warm (costo fijo).
3. **Mover inicialización fuera del handler**: Clientes boto3, conexiones DB.
4. **Usar SnapStart** (Java) o **container images** optimizadas.
5. **Reducir memoria no ayuda**: Más memoria = más CPU = cold start más rápido.

---

### Pregunta 2: Loop Infinito en S3
**P**: Un junior configuró un Lambda que lee de S3 y escribe en el mismo bucket. El costo se disparó a $5,000 en una hora. ¿Qué pasó y cómo lo previenes?

**R**: Se creó un **loop infinito**: Lambda escribe → S3 trigger → Lambda se invoca de nuevo → escribe → trigger → ... Soluciones:
1. **Buckets separados** para raw y processed (mejor opción).
2. **Prefijos distintos** con filter en el trigger (`incoming/` → `processed/`).
3. **Sufijos distintos** (`.csv` trigger → escribe `.parquet`).
4. **Concurrency limit = 1** como freno de emergencia temporal.
5. Activar **billing alarm** en CloudWatch como red de seguridad.

---

### Pregunta 3: Archivos Grandes
**P**: Necesitas procesar un CSV de 8 GB en Lambda. ¿Es posible? ¿Cómo?

**R**: Sí, es posible con la configuración adecuada:
1. **Lambda con 10 GB de memoria** y 10 GB de `/tmp`.
2. **Streaming desde S3** con `boto3` y lectura por chunks con `pd.read_csv(chunksize=...)`.
3. Escribir cada chunk procesado a S3 inmediatamente.
4. **Alternativa**: Si el procesamiento toma > 15 min, migrar a **Fargate**.

---

### Pregunta 4: Idempotencia
**P**: S3 puede enviar el mismo evento dos veces a Lambda. ¿Cómo garantizas que no proceses un archivo duplicado?

**R**: Implementar **idempotencia**:
1. Usar **DynamoDB** como registro: antes de procesar, verificar si el `s3_key + etag` ya existe.
2. Usar **S3 object metadata** para marcar archivos como procesados.
3. Escribir outputs con **nombre determinístico** (no timestamp random) → sobreescritura es idempotente.
4. **Conditional writes** en DynamoDB con `ConditionExpression`.

---

### Pregunta 5: Monitoreo de Pipeline
**P**: ¿Cómo monitoreas un pipeline Lambda que procesa 50,000 archivos/día?

**R**: Stack de monitoreo completo:
1. **CloudWatch Metrics**: Invocations, Errors, Duration, Throttles, ConcurrentExecutions.
2. **CloudWatch Alarms**: Error rate > 5%, Duration > 80% del timeout, Throttles > 0.
3. **CloudWatch Logs Insights**: Queries customizadas para patrones de error.
4. **X-Ray**: Trazabilidad end-to-end, bottlenecks en S3/Redshift calls.
5. **Custom Metrics**: Archivos procesados, filas transformadas, bytes escritos.
6. **Dashboard**: Visualización unificada con métricas de negocio.

---

## 11. Enlaces Oficiales

| Recurso | URL |
|---------|-----|
| Lambda Developer Guide | https://docs.aws.amazon.com/lambda/latest/dg/ |
| Lambda Best Practices | https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html |
| S3 Event Notifications | https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html |
| Lambda Layers | https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html |
| Lambda Destinations | https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html |
| AWS Data Wrangler | https://aws-sdk-pandas.readthedocs.io/ |
| CloudWatch Logs Insights | https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html |
| Lambda Quotas | https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html |
| X-Ray SDK Python | https://docs.aws.amazon.com/xray/latest/devguide/xray-sdk-python.html |

---

> **Siguiente paso**: Una vez domines Lambda, avanza a **[ECS Fargate para Data Engineering](./aws-fargate-containers.md)** para procesar cargas que superan los límites de Lambda.
