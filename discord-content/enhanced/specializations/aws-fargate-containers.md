---
id: "spec-aws-fargate-containers"
version: "1.0.0"
lastUpdated: "2026-02-08"

title:
  es: "ECS Fargate para Data Engineering: Contenedores sin Servidores"
  en: "ECS Fargate for Data Engineering: Serverless Containers"
  pt: "ECS Fargate para Data Engineering: Contêineres sem Servidores"

subtitle:
  es: "Procesamiento pesado de datos con contenedores Docker gestionados por AWS"
  en: "Heavy data processing with Docker containers managed by AWS"
  pt: "Processamento pesado de dados com contêineres Docker gerenciados pela AWS"

level: "specialization"
phase: "spec-aws-fargate"
estimatedTime: "25-35 horas"

prerequisites:
  - "spec-aws-lambda-serverless"
  - "spec-aws-data-stack"

tags:
  - "aws"
  - "fargate"
  - "ecs"
  - "docker"
  - "containers"
  - "data-engineering"

theoreticalFoundations:
  - "Container orchestration"
  - "Docker fundamentals"
  - "Distributed data processing"
  - "Cost optimization"
---

<!-- 
╔══════════════════════════════════════════════════════════════╗
║  📚 BLOQUE: ECS FARGATE PARA DATA ENGINEERING              ║
║  Especialización: AWS Data Engineering                      ║
╚══════════════════════════════════════════════════════════════╝
-->

# 🐳 ECS Fargate para Data Engineering: Contenedores sin Servidores

> **Objetivo**: Dominar ECS Fargate para procesar cargas de datos que superan los límites de Lambda. Docker, ECR, Task Definitions, orquestación con Step Functions y optimización de costos.

---

## 1. ¿Cuándo Lambda No Alcanza?

### Árbol de Decisión

```
                    ¿Necesitas procesamiento de datos?
                              │
                    ┌─────────┴──────────┐
                    │                    │
              Archivo < 5 GB       Archivo > 5 GB
              Tiempo < 10 min      Tiempo > 15 min
              Memoria < 10 GB      Memoria > 10 GB
                    │                    │
                    ▼                    ▼
              ┌──────────┐        ┌──────────────┐
              │  LAMBDA  │        │   FARGATE    │
              │  ⚡ $0.00 │        │   🐳 $0.04+  │
              │  cuando   │        │   por hora   │
              │  idle     │        │   de uso     │
              └──────────┘        └──────────────┘
```

### Señales de que necesitas Fargate

| Señal | Ejemplo Real |
|-------|-------------|
| **Timeout > 15 min** | Transformación de 50M filas con joins complejos |
| **RAM > 10 GB** | Cargar dataset completo en memoria para deduplicación |
| **Archivo > 10 GB** | Archivos Parquet/CSV de data warehouse export |
| **Dependencias pesadas** | Spark local, modelos ML, librerías de C++ |
| **GPU necesaria** | Procesamiento de imágenes o NLP batch |
| **Long-running service** | Consumidor Kafka que corre 24/7 |

> **Regla de oro**: Lambda es para **eventos** (archivo llega → procesar). Fargate es para **tareas** (procesar batch de 2 horas cada noche).

---

## 2. Docker para Data Engineers

### Dockerfile para ETL (Multi-Stage Build)

```dockerfile
# ============================================
# STAGE 1: Builder - Instalar dependencias
# ============================================
FROM python:3.12-slim AS builder

WORKDIR /build

# Instalar dependencias de compilación
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copiar solo requirements primero (cache de Docker)
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ============================================
# STAGE 2: Runtime - Imagen final ligera
# ============================================
FROM python:3.12-slim AS runtime

WORKDIR /app

# Copiar dependencias instaladas del builder
COPY --from=builder /install /usr/local

# Copiar código de la aplicación
COPY src/ ./src/
COPY config/ ./config/

# Variables de entorno
ENV PYTHONUNBUFFERED=1
ENV AWS_DEFAULT_REGION=us-east-1

# Healthcheck (opcional para services)
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD python -c "print('healthy')" || exit 1

# Ejecutar el ETL
ENTRYPOINT ["python", "-m", "src.etl_main"]
```

### requirements.txt típico

```
pandas==2.2.0
pyarrow==15.0.0
boto3==1.34.0
psycopg2-binary==2.9.9
sqlalchemy==2.0.25
python-dotenv==1.0.0
```

### Estructura del Proyecto

```
data-etl-fargate/
├── Dockerfile
├── requirements.txt
├── src/
│   ├── __init__.py
│   ├── etl_main.py          # Punto de entrada
│   ├── extractors/
│   │   ├── s3_extractor.py
│   │   └── api_extractor.py
│   ├── transformers/
│   │   ├── cleaner.py
│   │   └── enricher.py
│   └── loaders/
│       ├── s3_loader.py
│       └── redshift_loader.py
├── config/
│   └── settings.py
├── tests/
│   └── test_etl.py
└── .dockerignore
```

### .dockerignore (Importante para imágenes ligeras)

```
.git
.gitignore
__pycache__
*.pyc
.env
.venv
tests/
*.md
.DS_Store
```

---

## 3. ECR: Tu Registro Privado

### Crear Repositorio y Subir Imagen

```bash
# 1. Crear repositorio en ECR
aws ecr create-repository \
  --repository-name data-etl-pipeline \
  --image-scanning-configuration scanOnPush=true \
  --encryption-configuration encryptionType=AES256

# 2. Autenticarse con ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  123456789012.dkr.ecr.us-east-1.amazonaws.com

# 3. Construir imagen
docker build -t data-etl-pipeline:latest .

# 4. Etiquetar con URI del ECR
docker tag data-etl-pipeline:latest \
  123456789012.dkr.ecr.us-east-1.amazonaws.com/data-etl-pipeline:latest

# 5. Subir (push)
docker push \
  123456789012.dkr.ecr.us-east-1.amazonaws.com/data-etl-pipeline:latest
```

### Lifecycle Policy (Limpiar imágenes antiguas)

```json
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Mantener solo las últimas 10 imágenes",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 10
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
```

```bash
# Aplicar lifecycle policy
aws ecr put-lifecycle-policy \
  --repository-name data-etl-pipeline \
  --lifecycle-policy-text file://lifecycle-policy.json
```

---

## 4. ECS/Fargate Concepts

### Jerarquía de Componentes

```
┌─────────────────────────────────────────────────────┐
│                    ECS CLUSTER                       │
│  "data-processing-cluster"                          │
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │             TASK DEFINITION                     │ │
│  │  "etl-ventas-task:3"  (versión 3)              │ │
│  │                                                 │ │
│  │  ┌──────────────┐  ┌──────────────┐            │ │
│  │  │ Container 1  │  │ Container 2  │            │ │
│  │  │ etl-worker   │  │ datadog-agent│  (sidecar) │ │
│  │  │ 2 vCPU       │  │ 0.25 vCPU    │            │ │
│  │  │ 8 GB RAM     │  │ 512 MB RAM   │            │ │
│  │  └──────────────┘  └──────────────┘            │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
│  ┌──────────────┐  ┌──────────────┐                │
│  │   TASK 1     │  │   TASK 2     │  (instancias  │
│  │  (running)   │  │  (running)   │   del task    │
│  │  archivo_a   │  │  archivo_b   │   definition) │
│  └──────────────┘  └──────────────┘                │
│                                                     │
│  ┌────────────────────────────────────────────────┐ │
│  │              SERVICE (opcional)                 │ │
│  │  "kafka-consumer-service"                      │ │
│  │  desiredCount: 3  ← mantiene 3 tasks corriendo │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

### Conceptos Clave

| Concepto | Analogía | En Data Engineering |
|----------|----------|---------------------|
| **Cluster** | El "edificio" | Agrupación lógica de tareas |
| **Task Definition** | El "plano del departamento" | Configuración: imagen, CPU, RAM, env vars |
| **Task** | El "departamento construido" | Instancia en ejecución del task definition |
| **Service** | El "contrato de mantenimiento" | Mantiene N tasks corriendo (long-running) |
| **Container** | La "habitación" | Un proceso dentro del task |

> **Para ETL batch**: Usas **Tasks** (se ejecutan y terminan). Para consumidores Kafka: usas **Services** (corren siempre).

---

## 5. Task Definition para ETL

### Ejemplo Completo (JSON)

```json
{
  "family": "etl-ventas-diarias",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "2048",
  "memory": "8192",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/etl-task-role",
  "containerDefinitions": [
    {
      "name": "etl-worker",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/data-etl-pipeline:latest",
      "essential": true,
      "cpu": 1792,
      "memory": 7680,
      "environment": [
        {"name": "ENV", "value": "production"},
        {"name": "S3_RAW_BUCKET", "value": "raw-data-lake"},
        {"name": "S3_CLEAN_BUCKET", "value": "clean-data-lake"},
        {"name": "REDSHIFT_SECRET_ARN", "value": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/redshift"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/etl-ventas",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "etl"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "python -c 'print(\"ok\")' || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    },
    {
      "name": "datadog-agent",
      "image": "datadog/agent:latest",
      "essential": false,
      "cpu": 256,
      "memory": 512,
      "environment": [
        {"name": "DD_API_KEY", "value": "your-datadog-key"},
        {"name": "ECS_FARGATE", "value": "true"}
      ]
    }
  ],
  "ephemeralStorage": {
    "sizeInGiB": 100
  }
}
```

### Configuraciones de CPU y Memoria Válidas

```
┌──────────────────────────────────────────────────┐
│  CPU (vCPU)  │  Memoria (GB) disponible          │
├──────────────┼───────────────────────────────────┤
│  0.25        │  0.5, 1, 2                        │
│  0.5         │  1, 2, 3, 4                       │
│  1           │  2, 3, 4, 5, 6, 7, 8              │
│  2           │  4 - 16 (incrementos de 1 GB)      │
│  4           │  8 - 30 (incrementos de 1 GB)      │
│  8           │  16 - 60 (incrementos de 4 GB)     │
│  16          │  32 - 120 (incrementos de 8 GB)    │
└──────────────────────────────────────────────────┘
```

### Roles IAM Necesarios

```
Execution Role (ecsTaskExecutionRole):
  ├── Permisos para ECS
  │   ├── ecr:GetAuthorizationToken
  │   ├── ecr:BatchGetImage
  │   └── logs:PutLogEvents
  └── Permisos para secretos
      └── secretsmanager:GetSecretValue

Task Role (etl-task-role):
  ├── S3
  │   ├── s3:GetObject      (leer raw)
  │   ├── s3:PutObject      (escribir processed)
  │   └── s3:ListBucket
  ├── Redshift
  │   └── redshift-data:ExecuteStatement
  └── Glue Catalog
      ├── glue:GetTable
      └── glue:UpdateTable
```

---

## 6. Lanzar y Monitorear Tareas

### Ejecutar Task con boto3

```python
import boto3
import time
import logging

logger = logging.getLogger(__name__)
ecs_client = boto3.client('ecs')


def run_etl_task(
    cluster: str = 'data-processing-cluster',
    task_definition: str = 'etl-ventas-diarias',
    subnet_ids: list = None,
    security_group_ids: list = None,
    overrides: dict = None
) -> str:
    """
    Lanzar una tarea Fargate para procesamiento ETL.

    Returns:
        task_arn: ARN de la tarea lanzada.
    """
    network_config = {
        'awsvpcConfiguration': {
            'subnets': subnet_ids or ['subnet-abc123', 'subnet-def456'],
            'securityGroups': security_group_ids or ['sg-etl-tasks'],
            'assignPublicIp': 'DISABLED'  # Usar NAT Gateway o VPC Endpoints
        }
    }

    # Overrides permiten cambiar env vars sin nueva Task Definition
    container_overrides = overrides or {
        'containerOverrides': [{
            'name': 'etl-worker',
            'environment': [
                {'name': 'INPUT_FILE', 'value': 's3://raw/ventas_2026_02.csv'},
                {'name': 'BATCH_DATE', 'value': '2026-02-08'}
            ]
        }]
    }

    response = ecs_client.run_task(
        cluster=cluster,
        taskDefinition=task_definition,
        launchType='FARGATE',
        count=1,
        networkConfiguration=network_config,
        overrides=container_overrides,
        platformVersion='LATEST'
    )

    task_arn = response['tasks'][0]['taskArn']
    logger.info(f"Task lanzada: {task_arn}")
    return task_arn


def wait_for_task(cluster: str, task_arn: str, timeout_minutes: int = 60) -> str:
    """
    Esperar a que la tarea termine y retornar el exit code.
    """
    waiter = ecs_client.get_waiter('tasks_stopped')

    logger.info(f"Esperando tarea (timeout: {timeout_minutes} min)...")
    waiter.wait(
        cluster=cluster,
        tasks=[task_arn],
        WaiterConfig={
            'Delay': 30,       # Verificar cada 30 segundos
            'MaxAttempts': timeout_minutes * 2  # 30s * 2 = 1 min
        }
    )

    # Obtener resultado
    response = ecs_client.describe_tasks(cluster=cluster, tasks=[task_arn])
    task = response['tasks'][0]

    container = task['containers'][0]
    exit_code = container.get('exitCode', -1)
    reason = container.get('reason', 'N/A')

    if exit_code == 0:
        logger.info(f"Task completada exitosamente: {task_arn}")
    else:
        logger.error(f"Task falló (exit code {exit_code}): {reason}")

    return exit_code


# Uso
if __name__ == '__main__':
    task_arn = run_etl_task()
    exit_code = wait_for_task('data-processing-cluster', task_arn)
    if exit_code != 0:
        raise RuntimeError(f"ETL task falló con exit code {exit_code}")
```

---

## 7. Procesamiento de Archivos Pesados (+10 GB)

### Lectura por Chunks (Streaming)

```python
import boto3
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
from io import BytesIO
import logging

logger = logging.getLogger(__name__)
s3_client = boto3.client('s3')

CHUNK_SIZE = 500_000  # filas por chunk


def process_large_csv(
    source_bucket: str,
    source_key: str,
    dest_bucket: str,
    dest_prefix: str
):
    """
    Procesar CSV de +10 GB leyendo por chunks.

    Cada chunk se transforma y escribe como un archivo Parquet separado.
    Ideal para archivos que no caben en memoria.
    """
    # Descargar archivo a almacenamiento efímero (/tmp en Fargate)
    local_path = f'/tmp/{source_key.split("/")[-1]}'
    logger.info(f"Descargando s3://{source_bucket}/{source_key} a {local_path}...")

    s3_client.download_file(source_bucket, source_key, local_path)
    logger.info("Descarga completada.")

    # Procesar por chunks
    chunk_number = 0
    total_rows = 0

    for chunk_df in pd.read_csv(local_path, chunksize=CHUNK_SIZE):
        chunk_number += 1
        rows_in_chunk = len(chunk_df)
        total_rows += rows_in_chunk

        logger.info(f"Chunk {chunk_number}: {rows_in_chunk} filas (total: {total_rows})")

        # Transformar
        chunk_df = transform_chunk(chunk_df)

        # Escribir chunk como Parquet a S3
        output_key = f"{dest_prefix}/part-{chunk_number:05d}.parquet"
        write_parquet(chunk_df, dest_bucket, output_key)

    logger.info(f"Proceso completado: {total_rows} filas en {chunk_number} chunks")
    return {'total_rows': total_rows, 'chunks': chunk_number}


def transform_chunk(df: pd.DataFrame) -> pd.DataFrame:
    """Transformaciones aplicadas a cada chunk."""
    # Normalizar columnas
    df.columns = [c.strip().lower().replace(' ', '_') for c in df.columns]

    # Tipos de dato
    for col in df.select_dtypes(include=['object']).columns:
        if 'fecha' in col or 'date' in col:
            df[col] = pd.to_datetime(df[col], errors='coerce')

    # Eliminar nulos completos
    df = df.dropna(how='all')

    return df


def write_parquet(df: pd.DataFrame, bucket: str, key: str):
    """Escribir DataFrame como Parquet a S3."""
    buffer = BytesIO()
    table = pa.Table.from_pandas(df)
    pq.write_table(table, buffer, compression='snappy')
    buffer.seek(0)

    s3_client.put_object(Bucket=bucket, Key=key, Body=buffer.getvalue())
    logger.info(f"Escrito: s3://{bucket}/{key}")
```

### Uso de Almacenamiento Efímero en Fargate

```
┌───────────────────────────────────────────────┐
│           Fargate Task                        │
│                                               │
│   /tmp (ephemeral storage)                    │
│   ├── Mínimo: 20 GB (gratis)                 │
│   ├── Máximo: 200 GB (costo adicional)        │
│   └── Se pierde al terminar la tarea          │
│                                               │
│   Estrategia:                                 │
│   1. Descargar archivo grande a /tmp          │
│   2. Procesar por chunks desde disco          │
│   3. Escribir resultados a S3                 │
│   4. Limpiar /tmp (opcional, se borra solo)   │
└───────────────────────────────────────────────┘
```

---

## 8. Orquestación con Step Functions

### ¿Por qué Step Functions?

Lambda y Fargate son **compute**. Step Functions es el **orquestador** que coordina múltiples pasos, maneja errores, y reintentos.

### Ejemplo: Pipeline de Ventas Diarias

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Lambda:     │────►│  Fargate:    │────►│  Lambda:     │
│  Validar     │     │  Transformar │     │  Notificar   │
│  archivo     │     │  (30 min)    │     │  resultado   │
└──────┬───────┘     └──────┬───────┘     └──────────────┘
       │                    │
       ▼ (error)            ▼ (error)
┌──────────────┐     ┌──────────────┐
│  SNS: Alerta │     │  SNS: Alerta │
│  + DLQ       │     │  + Retry     │
└──────────────┘     └──────────────┘
```

### Amazon States Language (ASL) - Definición

```json
{
  "Comment": "Pipeline ETL: Validar → Transformar → Notificar",
  "StartAt": "ValidateInput",
  "States": {
    "ValidateInput": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:us-east-1:123456789012:function:validate-input",
      "InputPath": "$.detail",
      "ResultPath": "$.validation",
      "Next": "IsValid",
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "NotifyFailure"
      }]
    },

    "IsValid": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.validation.valid",
          "BooleanEquals": true,
          "Next": "TransformData"
        }
      ],
      "Default": "NotifyInvalidData"
    },

    "TransformData": {
      "Type": "Task",
      "Resource": "arn:aws:states:::ecs:runTask.sync",
      "Parameters": {
        "Cluster": "arn:aws:ecs:us-east-1:123456789012:cluster/data-processing",
        "TaskDefinition": "arn:aws:ecs:us-east-1:123456789012:task-definition/etl-ventas:3",
        "LaunchType": "FARGATE",
        "NetworkConfiguration": {
          "AwsvpcConfiguration": {
            "Subnets": ["subnet-abc123"],
            "SecurityGroups": ["sg-etl"],
            "AssignPublicIp": "DISABLED"
          }
        },
        "Overrides": {
          "ContainerOverrides": [{
            "Name": "etl-worker",
            "Environment": [
              {"Name": "INPUT_FILE", "Value.$": "$.detail.s3Key"},
              {"Name": "BATCH_DATE", "Value.$": "$.detail.batchDate"}
            ]
          }]
        }
      },
      "TimeoutSeconds": 3600,
      "Retry": [{
        "ErrorEquals": ["States.TaskFailed"],
        "IntervalSeconds": 60,
        "MaxAttempts": 2,
        "BackoffRate": 2.0
      }],
      "Catch": [{
        "ErrorEquals": ["States.ALL"],
        "Next": "NotifyFailure"
      }],
      "Next": "NotifySuccess"
    },

    "NotifySuccess": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:123456789012:etl-success",
        "Message.$": "States.Format('ETL completado para {}', $.detail.batchDate)"
      },
      "End": true
    },

    "NotifyInvalidData": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:123456789012:etl-alerts",
        "Message": "Datos de entrada inválidos - verificar formato"
      },
      "End": true
    },

    "NotifyFailure": {
      "Type": "Task",
      "Resource": "arn:aws:states:::sns:publish",
      "Parameters": {
        "TopicArn": "arn:aws:sns:us-east-1:123456789012:etl-alerts",
        "Message.$": "States.Format('ETL FALLIDO: {}', $.Error)"
      },
      "End": true
    }
  }
}
```

> **`.sync`**: El sufijo `.sync` en `ecs:runTask.sync` hace que Step Functions **espere** a que la tarea Fargate termine antes de continuar. Sin `.sync`, Step Functions solo lanza la tarea y pasa al siguiente estado.

---

## 9. Costos y Optimización

### Modelo de Precios Fargate (us-east-1, 2026)

```
┌──────────────────────────────────────────────────┐
│  Recurso        │ Precio/hora    │ Precio/segundo│
├─────────────────┼────────────────┼───────────────┤
│  1 vCPU         │  ~$0.04048     │  $0.000011    │
│  1 GB RAM       │  ~$0.004445    │  $0.0000012   │
│  20 GB storage  │  Incluido      │  Incluido     │
│  Storage extra  │  ~$0.000111/GB │  por segundo  │
└──────────────────────────────────────────────────┘

Ejemplo: Task con 2 vCPU + 8 GB RAM corriendo 30 minutos:
  CPU:  2 × $0.04048 × 0.5h  = $0.04048
  RAM:  8 × $0.004445 × 0.5h = $0.01778
  TOTAL: ~$0.058 por ejecución
```

### Fargate Spot (Ahorro del 70%)

```python
# Lanzar task con Fargate Spot
response = ecs_client.run_task(
    cluster='data-processing',
    taskDefinition='etl-ventas-diarias',
    launchType='FARGATE',
    count=1,
    networkConfiguration=network_config,
    capacityProviderStrategy=[
        {
            'capacityProvider': 'FARGATE_SPOT',
            'weight': 1,
            'base': 0
        }
    ]
)
```

> **Fargate Spot**: Hasta 70% más barato. AWS puede interrumpir la tarea con 2 minutos de aviso. Ideal para ETL que puede re-ejecutarse (idempotente).

### Right-Sizing: Optimizar CPU y Memoria

```python
# Monitorear uso real para right-sizing
import psutil

def log_resource_usage():
    """Llamar periódicamente durante el ETL."""
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()

    logger.info(
        f"Recursos: CPU={cpu_percent}%, "
        f"RAM={memory.used / (1024**3):.1f}GB / {memory.total / (1024**3):.1f}GB "
        f"({memory.percent}%)"
    )

# Si observas: CPU=20%, RAM=30% → estás sobre-provisionando
# Reducir CPU y RAM en la Task Definition para ahorrar
```

### Comparación de Costos Mensual

```
Escenario: Procesar 100 archivos/día, 30 min cada uno

Lambda (1 GB RAM):
  100 × 30min × 60s × $0.0000166667/GB-s = $3.00/día
  Mensual: ~$90

Fargate (2 vCPU, 8 GB):
  100 × 0.5h × ($0.08096 + $0.03556) = $5.83/día
  Mensual: ~$175

Fargate Spot (2 vCPU, 8 GB):
  100 × 0.5h × $0.035 ≈ $1.75/día
  Mensual: ~$52

⚠️  Lambda gana en archivos pequeños/rápidos.
    Fargate Spot gana en tareas largas y pesadas.
```

---

## 10. Lambda vs Fargate vs Glue vs EMR

### Tabla de Comparación Completa

```
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│              │   Lambda     │   Fargate    │   Glue       │    EMR       │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Caso de uso  │ Ingesta      │ ETL pesado   │ ETL Spark    │ Big Data     │
│              │ event-driven │ batch        │ managed      │ Spark/Hadoop │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Max runtime  │ 15 min       │ Sin límite   │ Sin límite   │ Sin límite   │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Max memoria  │ 10 GB        │ 120 GB       │ Auto-scaled  │ TB+          │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Escalabilidad│ Auto (1000+  │ Manual/Auto  │ Auto (DPUs)  │ Auto/Manual  │
│              │ concurrent)  │ (tasks)      │              │ (nodes)      │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Costo idle   │ $0           │ $0           │ $0           │ $0 (si off)  │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Setup        │ Mínimo       │ Medio        │ Medio        │ Alto         │
│              │ (código)     │ (Docker+ECS) │ (Spark/ETL)  │ (cluster)    │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Cuándo usar  │ < 10 GB      │ 10-100 GB    │ 10 GB - 1 TB │ > 1 TB      │
│              │ < 15 min     │ cualquier    │ Spark ETL    │ Spark/Hive   │
│              │ event-driven │ duración     │              │ ML a escala  │
├──────────────┼──────────────┼──────────────┼──────────────┼──────────────┤
│ Precio aprox │ ~$0.05/hr    │ ~$0.05-0.15  │ ~$0.44/DPU   │ ~$0.10+/hr   │
│ (mínimo)     │ (1 GB)       │ /hr          │ /hr          │ por nodo     │
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```

### Patrón Híbrido Recomendado

```
                        Archivos llegan a S3
                              │
                    ┌─────────┴──────────┐
                    │  Lambda: Clasificar │
                    │  tamaño y tipo      │
                    └─────────┬──────────┘
                    ┌─────────┴──────────┐
              < 5 GB │                   │ > 5 GB
                    │                    │
                    ▼                    ▼
             ┌──────────┐        ┌──────────────┐
             │  Lambda  │        │   Fargate    │
             │  ETL     │        │   ETL        │
             └──────────┘        └──────────────┘
                    │                    │
                    └─────────┬──────────┘
                              ▼
                    ┌──────────────────┐
                    │   S3 (Parquet)   │
                    │   + Glue Catalog │
                    └──────────────────┘
```

---

## 11. Preguntas de Entrevista

### Pregunta 1: Diseño de Pipeline Híbrido
**P**: Recibes 10,000 archivos al día: 9,500 son < 1 MB y 500 son > 1 GB. ¿Cómo diseñas el pipeline?

**R**: Pipeline híbrido con clasificación inteligente:
1. **S3 trigger → Lambda clasificadora** que evalúa el tamaño del objeto.
2. Archivos < 100 MB → **Lambda ETL** directamente (bajo costo, rápido).
3. Archivos > 100 MB → Enviar mensaje a **SQS** que trigger **Fargate task**.
4. Fargate con **Spot** para los archivos grandes (ahorro 70%).
5. Ambos escriben a **S3 (Parquet)** con registro en **Glue Catalog**.
6. **Step Functions** como orquestador para retry y monitoreo.
7. **CloudWatch Alarms** para error rate y duración anómala.

---

### Pregunta 2: Fargate vs Lambda para Kafka Consumer
**P**: Necesitas consumir mensajes de MSK (Kafka) 24/7. ¿Lambda o Fargate?

**R**: Depende del patrón de consumo:
- **Lambda con MSK trigger**: AWS gestiona el consumer group. Ideal si el procesamiento por batch es < 15 min y no necesitas estado entre invocaciones. Escala automáticamente con particiones.
- **Fargate Service**: Para consumidores stateful, procesamiento complejo, o cuando necesitas control total del offset management. Corre 24/7 con un Service ECS (desiredCount = número de particiones).
- **Recomendación**: Empezar con Lambda MSK trigger (más simple). Migrar a Fargate solo si necesitas más control o el procesamiento excede 15 min por batch.

---

### Pregunta 3: Optimización de Costos
**P**: Tu pipeline Fargate cuesta $2,000/mes. ¿Cómo lo optimizas?

**R**: Estrategia de optimización en capas:
1. **Right-sizing**: Monitorear CPU y RAM real con CloudWatch Container Insights. Reducir si el uso es < 50%.
2. **Fargate Spot**: Para tareas idempotentes (re-ejecutables), ahorro de hasta 70%.
3. **Reducir duración**: Optimizar código (lectura por chunks, procesamiento paralelo con multiprocessing).
4. **Arquitectura**: ¿Los archivos pequeños realmente necesitan Fargate? Mover a Lambda si < 5 GB.
5. **Scheduling**: Si es batch nocturno, asegurarse de que las tareas no corren más de lo necesario.
6. **Savings Plans**: Fargate Savings Plans para workloads predecibles (hasta 50% descuento).
7. **Comprimir datos**: Inputs y outputs comprimidos (gzip/snappy) reducen tiempo de I/O.

---

## 12. Enlaces Oficiales

| Recurso | URL |
|---------|-----|
| ECS Developer Guide | https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ |
| Fargate User Guide | https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html |
| ECR User Guide | https://docs.aws.amazon.com/AmazonECR/latest/userguide/ |
| Task Definition Parameters | https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html |
| Step Functions Developer Guide | https://docs.aws.amazon.com/step-functions/latest/dg/ |
| Fargate Pricing | https://aws.amazon.com/fargate/pricing/ |
| Fargate Spot | https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html |
| Container Insights | https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html |
| Docker Best Practices | https://docs.docker.com/develop/develop-images/dockerfile_best-practices/ |

---

> **Ruta de aprendizaje**: Lambda → **Fargate** (estás aquí) → Glue (ETL Spark managed) → EMR (Big Data a escala). Cada herramienta resuelve un rango de volumen de datos diferente.
