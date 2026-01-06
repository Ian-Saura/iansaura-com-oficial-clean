/**
 * FASE 7: Databricks Workflows
 * Orquestación y automatización de pipelines de datos
 */

import { DatabricksPhase } from '../types';

export const PHASE_7_WORKFLOWS: DatabricksPhase = {
  id: 'db-phase-7',
  number: 7,
  title: { es: 'Databricks Workflows', en: 'Databricks Workflows', pt: 'Databricks Workflows' },
  subtitle: { es: 'Orquestación de pipelines', en: 'Pipeline orchestration', pt: 'Orquestração de pipelines' },
  description: { 
    es: 'Workflows es el orquestador nativo de Databricks. Aprende a crear Jobs, configurar schedules, manejar dependencias entre tareas y monitorear ejecuciones. Es la forma de llevar tus notebooks a producción.',
    en: 'Workflows is Databricks native orchestrator. Learn to create Jobs, configure schedules, manage task dependencies and monitor executions.',
    pt: 'Workflows é o orquestrador nativo do Databricks. Aprenda a criar Jobs, configurar schedules, gerenciar dependências entre tarefas e monitorar execuções.'
  },
  icon: '⚙️',
  color: 'blue',
  estimatedDays: '3-4 días',
  steps: [
    {
      id: 'db-7-1',
      title: { es: '¿Qué son los Databricks Workflows?', en: 'What are Databricks Workflows?', pt: 'O que são Databricks Workflows?' },
      description: { es: 'Introducción al sistema de orquestación nativo de Databricks.', en: 'Introduction to Databricks native orchestration system.', pt: 'Introdução ao sistema de orquestração nativo do Databricks.' },
      theory: {
        es: `## Databricks Workflows: Tu Pipeline en Producción

Workflows es el sistema de **orquestación nativo** de Databricks que te permite:
- Programar notebooks para ejecutarse automáticamente
- Crear pipelines con múltiples tareas dependientes
- Monitorear y recibir alertas de fallos
- Reintentar automáticamente tareas fallidas

### Concepto Clave: Job vs Task

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                           JOB                                │
│        "Pipeline de procesamiento de ventas"                 │
│                                                              │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │  TASK 1  │───▶│  TASK 2  │───▶│  TASK 3  │             │
│   │  extract │    │ transform │    │   load   │             │
│   └──────────┘    └──────────┘    └──────────┘             │
│                                                              │
│   Schedule: Diario a las 6:00 AM                            │
│   Cluster: Shared pool                                       │
│   Alertas: Slack #data-alerts                               │
└─────────────────────────────────────────────────────────────┘

JOB = Contenedor que agrupa tareas relacionadas
TASK = Una unidad de trabajo (notebook, script, JAR, etc.)
\`\`\`

### Tipos de Tasks Disponibles

| Tipo | Qué ejecuta | Uso común |
|------|-------------|-----------|
| **Notebook** | Un notebook de Databricks | Transformaciones con PySpark |
| **Python script** | Archivo .py | Scripts standalone |
| **SQL** | Query SQL | Agregaciones, reporting |
| **dbt** | Proyecto dbt | Transformaciones SQL |
| **JAR** | Aplicación Java/Scala | Jobs legacy o especializados |
| **DLT Pipeline** | Pipeline de Delta Live Tables | ETL declarativo |
| **Spark Submit** | Job de Spark genérico | Migraciones desde otros clusters |

### Workflows vs Otras Herramientas

| Feature | Workflows | Airflow | Luigi |
|---------|-----------|---------|-------|
| Setup | Zero (nativo) | Medio | Medio |
| Integración Databricks | Perfecta | Requiere provider | Manual |
| UI de monitoreo | Excelente | Buena | Básica |
| Costo | Incluido | Separado | Separado |
| Multi-cloud | Sí | Sí | Sí |

### ¿Cuándo usar Workflows?

**✅ Usa Workflows cuando:**
- Tu pipeline es 100% en Databricks
- Necesitas setup rápido sin infraestructura adicional
- Quieres integración nativa con Delta Lake, Unity Catalog
- Tu equipo no tiene experiencia con Airflow

**❌ Considera Airflow cuando:**
- Necesitas orquestar servicios fuera de Databricks
- Tu organización ya tiene Airflow establecido
- Necesitas DAGs muy complejos con lógica Python`,
        en: `## Databricks Workflows: Your Pipeline in Production

Workflows is Databricks **native orchestration** system.

### Key Concepts

- **Job**: Container that groups related tasks
- **Task**: Single unit of work (notebook, script, etc.)
- **Schedule**: When the job runs (cron, trigger, manual)`,
        pt: `## Databricks Workflows: Seu Pipeline em Produção

Workflows é o sistema de **orquestração nativo** do Databricks.

### Conceitos Chave

- **Job**: Container que agrupa tarefas relacionadas
- **Task**: Unidade de trabalho (notebook, script, etc.)
- **Schedule**: Quando o job executa`
      },
      practicalTips: [
        { es: '💡 Workflows es la forma más simple de llevar un notebook a producción en Databricks.', en: '💡 Workflows is the simplest way to take a notebook to production in Databricks.', pt: '💡 Workflows é a forma mais simples de levar um notebook para produção no Databricks.' },
        { es: '⚠️ Si ya usas Airflow, considera el operador DatabricksSubmitRunOperator en vez de migrar todo.', en: '⚠️ If you already use Airflow, consider DatabricksSubmitRunOperator instead of migrating everything.', pt: '⚠️ Se já usa Airflow, considere o DatabricksSubmitRunOperator em vez de migrar tudo.' }
      ],
      externalLinks: [
        { title: 'Workflows Overview', url: 'https://docs.databricks.com/workflows/index.html', type: 'docs' },
        { title: 'Jobs vs Tasks', url: 'https://docs.databricks.com/workflows/jobs/jobs.html', type: 'docs' }
      ],
      checkpoint: { es: '🤔 ¿Entendés la diferencia entre Job y Task?', en: '🤔 Do you understand the difference between Job and Task?', pt: '🤔 Você entende a diferença entre Job e Task?' },
      xpReward: 20,
      estimatedMinutes: 20
    },
    {
      id: 'db-7-2',
      title: { es: 'Crear tu Primer Job', en: 'Create Your First Job', pt: 'Criar seu Primeiro Job' },
      description: { es: 'Paso a paso para crear un Job simple con un notebook.', en: 'Step by step to create a simple Job with a notebook.', pt: 'Passo a passo para criar um Job simples com um notebook.' },
      theory: {
        es: `## Crear un Job Paso a Paso

### Opción 1: Desde la UI (Recomendado para empezar)

\`\`\`
1. Ir a "Workflows" en el sidebar izquierdo
2. Click en "Create Job"
3. Nombrar el job: "mi_primer_job"
4. Agregar una task:
   - Type: Notebook
   - Source: Seleccionar tu notebook
   - Cluster: Seleccionar o crear uno
5. Click en "Create"
\`\`\`

### Opción 2: Desde el Notebook (Rápido para testing)

\`\`\`
1. Abrir tu notebook
2. Click en "Schedule" (arriba a la derecha)
3. Configurar schedule
4. Databricks crea el job automáticamente
\`\`\`

### Opción 3: Con la API/CLI (Para automatización)

\`\`\`python
# Usando databricks-sdk
from databricks.sdk import WorkspaceClient
from databricks.sdk.service.jobs import Task, NotebookTask

w = WorkspaceClient()

job = w.jobs.create(
    name="mi_primer_job_api",
    tasks=[
        Task(
            task_key="extract_data",
            notebook_task=NotebookTask(
                notebook_path="/Repos/mi-repo/notebooks/extract",
                base_parameters={"date": "{{start_date}}"}
            ),
            existing_cluster_id="0123-456789-abcdefg"
        )
    ]
)
print(f"Job creado con ID: {job.job_id}")
\`\`\`

### Configuración del Cluster para Jobs

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                  OPCIONES DE CLUSTER                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. JOB CLUSTER (Recomendado para producción)               │
│     - Se crea al iniciar el job, se destruye al terminar    │
│     - Más económico para jobs esporádicos                   │
│     - Aislamiento total                                      │
│                                                              │
│  2. EXISTING CLUSTER                                         │
│     - Usa un cluster ya corriendo                           │
│     - Más rápido (no hay startup time)                      │
│     - Riesgo de contención de recursos                      │
│                                                              │
│  3. JOB CLUSTER POOL                                         │
│     - Instancias pre-calentadas                             │
│     - Balance entre costo y velocidad                       │
│     - Ideal para jobs frecuentes                            │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Pasar Parámetros al Notebook

\`\`\`python
# En el notebook, recibir parámetros:
dbutils.widgets.text("date", "2024-01-01", "Fecha a procesar")
dbutils.widgets.text("environment", "dev", "Ambiente")

# Obtener valores
date = dbutils.widgets.get("date")
env = dbutils.widgets.get("environment")

print(f"Procesando {date} en ambiente {env}")

# En el Job, configurar base_parameters:
# {"date": "2024-01-15", "environment": "prod"}
\`\`\`

### Validar que el Job Funciona

\`\`\`
1. Click en "Run Now" para ejecutar manualmente
2. Ir a "Runs" para ver el estado
3. Click en la run para ver logs
4. Verificar que terminó con estado "Succeeded"
\`\`\``,
        en: `## Create a Job Step by Step

### From UI
1. Go to "Workflows"
2. Click "Create Job"
3. Add a task (Notebook type)
4. Select cluster
5. Create

### Pass Parameters
\`\`\`python
dbutils.widgets.text("date", "2024-01-01")
date = dbutils.widgets.get("date")
\`\`\``,
        pt: `## Criar um Job Passo a Passo

### Pela UI
1. Ir a "Workflows"
2. Click "Create Job"
3. Adicionar task (tipo Notebook)
4. Selecionar cluster
5. Criar`
      },
      practicalTips: [
        { es: '🚀 Para desarrollo usa "Existing Cluster", para producción usa "Job Cluster".', en: '🚀 For development use "Existing Cluster", for production use "Job Cluster".', pt: '🚀 Para desenvolvimento use "Existing Cluster", para produção use "Job Cluster".' },
        { es: '💡 Siempre usa parámetros (widgets) en vez de hardcodear valores - hace el notebook reutilizable.', en: '💡 Always use parameters (widgets) instead of hardcoding values - makes the notebook reusable.', pt: '💡 Sempre use parâmetros (widgets) em vez de hardcodear valores - torna o notebook reutilizável.' }
      ],
      externalLinks: [
        { title: 'Create a Job', url: 'https://docs.databricks.com/workflows/jobs/create-run-jobs.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Creaste un job y lo ejecutaste manualmente?', en: '✅ Did you create a job and run it manually?', pt: '✅ Você criou um job e executou manualmente?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-7-3',
      title: { es: 'Multi-Task Jobs y Dependencias', en: 'Multi-Task Jobs and Dependencies', pt: 'Jobs Multi-Task e Dependências' },
      description: { es: 'Crea pipelines complejos con múltiples tareas que dependen entre sí.', en: 'Create complex pipelines with multiple dependent tasks.', pt: 'Crie pipelines complexos com múltiplas tarefas dependentes.' },
      theory: {
        es: `## Multi-Task Jobs: Pipelines Reales

La mayoría de pipelines de datos tienen múltiples pasos que deben ejecutarse en orden.

### Ejemplo: Pipeline ETL Completo

\`\`\`
                    ┌──────────────────┐
                    │  extract_sales   │
                    │  (notebook)      │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
    │ clean_sales │  │clean_products│  │clean_customers│
    │ (notebook)  │  │ (notebook)   │  │  (notebook)   │
    └──────┬──────┘  └──────┬──────┘  └───────┬───────┘
           │                │                 │
           └────────────────┼─────────────────┘
                            │
                            ▼
                   ┌────────────────┐
                   │ join_and_agg   │
                   │  (notebook)    │
                   └────────┬───────┘
                            │
                            ▼
                   ┌────────────────┐
                   │  write_gold    │
                   │   (notebook)   │
                   └────────┬───────┘
                            │
                            ▼
                   ┌────────────────┐
                   │ notify_slack   │
                   │  (python)      │
                   └────────────────┘
\`\`\`

### Configurar Dependencias en la UI

\`\`\`
1. Agregar todas las tasks al job
2. En cada task, sección "Depends on"
3. Seleccionar las tasks que deben completarse antes
4. Databricks dibuja el DAG automáticamente
\`\`\`

### Configurar con JSON/API

\`\`\`json
{
  "name": "sales_pipeline",
  "tasks": [
    {
      "task_key": "extract_sales",
      "notebook_task": {
        "notebook_path": "/pipelines/extract_sales"
      },
      "new_cluster": { "spark_version": "14.3.x-scala2.12", "num_workers": 2 }
    },
    {
      "task_key": "clean_sales",
      "depends_on": [{"task_key": "extract_sales"}],
      "notebook_task": {
        "notebook_path": "/pipelines/clean_sales"
      }
    },
    {
      "task_key": "clean_products",
      "depends_on": [{"task_key": "extract_sales"}],
      "notebook_task": {
        "notebook_path": "/pipelines/clean_products"
      }
    },
    {
      "task_key": "join_and_agg",
      "depends_on": [
        {"task_key": "clean_sales"},
        {"task_key": "clean_products"}
      ],
      "notebook_task": {
        "notebook_path": "/pipelines/join_and_aggregate"
      }
    }
  ]
}
\`\`\`

### Pasar Datos entre Tasks

**Opción 1: Task Values (Pequeños)**
\`\`\`python
# En task 1: Guardar valor
dbutils.jobs.taskValues.set(key="rows_processed", value=10000)
dbutils.jobs.taskValues.set(key="output_path", value="s3://bucket/output/")

# En task 2: Leer valor
rows = dbutils.jobs.taskValues.get(taskKey="extract_sales", key="rows_processed")
path = dbutils.jobs.taskValues.get(taskKey="extract_sales", key="output_path")
\`\`\`

**Opción 2: Delta Tables (Grandes)**
\`\`\`python
# En task 1: Escribir a Delta
df.write.format("delta").mode("overwrite").saveAsTable("temp.extract_output")

# En task 2: Leer de Delta
df = spark.table("temp.extract_output")
\`\`\`

### Ejecución en Paralelo vs Secuencial

\`\`\`
SECUENCIAL: A → B → C (cada uno espera al anterior)
PARALELO: A → (B, C, D en paralelo) → E

Tip: Las tasks sin dependencias entre sí corren en paralelo automáticamente.
\`\`\``,
        en: `## Multi-Task Jobs: Real Pipelines

Configure dependencies to create complex pipelines.

\`\`\`json
{
  "tasks": [
    {"task_key": "extract", ...},
    {"task_key": "transform", "depends_on": [{"task_key": "extract"}]},
    {"task_key": "load", "depends_on": [{"task_key": "transform"}]}
  ]
}
\`\`\`

### Pass Data Between Tasks
\`\`\`python
# Set value
dbutils.jobs.taskValues.set(key="result", value=100)
# Get value
dbutils.jobs.taskValues.get(taskKey="task1", key="result")
\`\`\``,
        pt: `## Jobs Multi-Task: Pipelines Reais

Configure dependências para criar pipelines complexos.

\`\`\`python
# Passar dados entre tasks
dbutils.jobs.taskValues.set(key="result", value=100)
dbutils.jobs.taskValues.get(taskKey="task1", key="result")
\`\`\``
      },
      practicalTips: [
        { es: '🔀 Tasks sin dependencias corren en PARALELO - aprovecha esto para acelerar pipelines.', en: '🔀 Tasks without dependencies run in PARALLEL - leverage this to speed up pipelines.', pt: '🔀 Tasks sem dependências rodam em PARALELO - aproveite isso para acelerar pipelines.' },
        { es: '📊 Usa Task Values para metadatos pequeños, Delta Tables para datos grandes.', en: '📊 Use Task Values for small metadata, Delta Tables for large data.', pt: '📊 Use Task Values para metadados pequenos, Delta Tables para dados grandes.' }
      ],
      externalLinks: [
        { title: 'Multi-Task Jobs', url: 'https://docs.databricks.com/workflows/jobs/jobs.html#add-tasks-to-jobs', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Creaste un job con al menos 3 tasks dependientes?', en: '✅ Did you create a job with at least 3 dependent tasks?', pt: '✅ Você criou um job com pelo menos 3 tasks dependentes?' },
      xpReward: 35,
      estimatedMinutes: 40
    },
    {
      id: 'db-7-4',
      title: { es: 'Schedules y Triggers', en: 'Schedules and Triggers', pt: 'Schedules e Triggers' },
      description: { es: 'Configura cuándo se ejecutan tus jobs: por horario, eventos o triggers.', en: 'Configure when your jobs run: by schedule, events or triggers.', pt: 'Configure quando seus jobs executam: por schedule, eventos ou triggers.' },
      theory: {
        es: `## Schedules: Cuándo Ejecutar

### Tipos de Triggers

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| **Manual** | Testing, ad-hoc | Click en "Run Now" |
| **Scheduled** | Batch regular | Todos los días a las 6am |
| **File Arrival** | Event-driven | Cuando llega archivo a S3 |
| **Continuous** | Streaming-like | Re-ejecutar apenas termina |

### Configurar Schedule con Cron

\`\`\`
┌───────────── minuto (0-59)
│ ┌───────────── hora (0-23)
│ │ ┌───────────── día del mes (1-31)
│ │ │ ┌───────────── mes (1-12)
│ │ │ │ ┌───────────── día de la semana (0-6, 0=Domingo)
│ │ │ │ │
* * * * *
\`\`\`

**Ejemplos Comunes:**

\`\`\`
# Todos los días a las 6:00 AM
0 6 * * *

# Cada hora
0 * * * *

# Lunes a Viernes a las 9:00 AM
0 9 * * 1-5

# Primer día de cada mes a medianoche
0 0 1 * *

# Cada 15 minutos
*/15 * * * *

# Cada 6 horas (0:00, 6:00, 12:00, 18:00)
0 */6 * * *
\`\`\`

### Timezone Importante

\`\`\`python
# En la UI, seleccionar timezone explícitamente
# Por ejemplo: America/Argentina/Buenos_Aires

# ⚠️ Default es UTC - cuidado con jobs de fin de día
# Si quieres que corra a las 23:59 hora local, calcula el UTC
\`\`\`

### File Arrival Trigger

\`\`\`
1. En Job settings → Trigger type: "File arrival"
2. Configurar:
   - URL: s3://bucket/landing/
   - Formato esperado: *.csv
3. Cuando llega un archivo, el job se dispara automáticamente

Útil para: Archivos de proveedores externos, uploads manuales, etc.
\`\`\`

### Continuous Trigger

\`\`\`
El job se re-ejecuta inmediatamente después de terminar.
Simula streaming con batch micro-batches.

Configuración:
- Trigger type: "Continuous"
- Pause duration: 60 segundos (espera entre runs)

⚠️ Cuidado con costos - el cluster corre constantemente
\`\`\`

### Múltiples Schedules

\`\`\`
Un job puede tener múltiples schedules:

Job: "sales_pipeline"
├── Schedule 1: 0 6 * * * (daily completo)
├── Schedule 2: 0 12 * * * (refresh de mediodía)
└── Schedule 3: 0 */1 * * * (incremental cada hora)

Cada schedule puede tener parámetros diferentes.
\`\`\``,
        en: `## Schedules: When to Execute

### Cron Examples
\`\`\`
0 6 * * *     # Daily at 6am
0 * * * *     # Every hour
0 9 * * 1-5   # Weekdays at 9am
*/15 * * * *  # Every 15 minutes
\`\`\`

### Trigger Types
- Manual: Run Now button
- Scheduled: Cron expression
- File Arrival: When file lands in S3
- Continuous: Re-run when complete`,
        pt: `## Schedules: Quando Executar

### Exemplos de Cron
\`\`\`
0 6 * * *     # Diário às 6am
0 * * * *     # A cada hora
0 9 * * 1-5   # Dias úteis às 9am
\`\`\``
      },
      practicalTips: [
        { es: '⏰ SIEMPRE especifica timezone explícitamente. El default UTC causa muchos bugs.', en: '⏰ ALWAYS specify timezone explicitly. Default UTC causes many bugs.', pt: '⏰ SEMPRE especifique timezone explicitamente. Default UTC causa muitos bugs.' },
        { es: '🔄 Para jobs que deben correr "después del anterior", usa Continuous en vez de cron muy frecuente.', en: '🔄 For jobs that must run "after the previous one", use Continuous instead of very frequent cron.', pt: '🔄 Para jobs que devem rodar "depois do anterior", use Continuous em vez de cron muito frequente.' }
      ],
      externalLinks: [
        { title: 'Schedule Jobs', url: 'https://docs.databricks.com/workflows/jobs/schedule-jobs.html', type: 'docs' },
        { title: 'Crontab Guru', url: 'https://crontab.guru/', type: 'tool' }
      ],
      checkpoint: { es: '✅ ¿Configuraste un schedule con el timezone correcto de tu región?', en: '✅ Did you configure a schedule with the correct timezone for your region?', pt: '✅ Você configurou um schedule com o timezone correto da sua região?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-7-5',
      title: { es: 'Manejo de Errores y Reintentos', en: 'Error Handling and Retries', pt: 'Manejo de Erros e Retentativas' },
      description: { es: 'Configura qué hacer cuando una task falla: reintentar, alertar, compensar.', en: 'Configure what to do when a task fails: retry, alert, compensate.', pt: 'Configure o que fazer quando uma task falha: retentar, alertar, compensar.' },
      theory: {
        es: `## Manejo de Errores: Pipelines Robustos

### Configuración de Reintentos

\`\`\`
Por cada task, puedes configurar:
- Max retries: Cuántas veces reintentar (ej: 3)
- Min retry interval: Espera entre reintentos (ej: 30 segundos)
- Max retry interval: Espera máxima (ej: 5 minutos)
- Retry on timeout: Reintentar si excede tiempo límite

Ejemplo:
- Intento 1: Falla → espera 30s
- Intento 2: Falla → espera 1min
- Intento 3: Falla → espera 2min
- Intento 4: Falla → JOB FAILED
\`\`\`

### Timeouts

\`\`\`python
# Task level timeout (mata la task si tarda demasiado)
"timeout_seconds": 3600  # 1 hora máximo

# Job level timeout (mata todo el job)
"timeout_seconds": 14400  # 4 horas máximo

# ⚠️ Siempre configura timeouts para evitar jobs colgados que cuestan $$
\`\`\`

### On-Failure Tasks

\`\`\`
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   extract    │───▶│  transform   │───▶│     load     │
└──────────────┘    └───────┬──────┘    └──────────────┘
                            │
                            │ FALLA
                            ▼
                    ┌──────────────┐
                    │ notify_error │  ◀── Task que corre SOLO si falla
                    │  (on_failure) │
                    └──────────────┘
\`\`\`

En JSON:
\`\`\`json
{
  "task_key": "notify_error",
  "run_if": "AT_LEAST_ONE_FAILED",
  "notebook_task": {...},
  "depends_on": [
    {"task_key": "transform"}
  ]
}
\`\`\`

### Run Conditions

| run_if | Cuándo ejecuta |
|--------|----------------|
| ALL_SUCCESS | Todas las dependencias exitosas (default) |
| AT_LEAST_ONE_SUCCESS | Al menos una exitosa |
| NONE_FAILED | Ninguna falló (incluye skipped) |
| ALL_DONE | Todas terminaron (success o failed) |
| AT_LEAST_ONE_FAILED | Al menos una falló |

### Ejemplo: Pipeline con Compensación

\`\`\`
                    ┌──────────────┐
                    │   extract    │
                    └───────┬──────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
              ▼                           ▼
    ┌──────────────┐            ┌──────────────┐
    │  transform   │            │  on_extract  │
    │ (ALL_SUCCESS)│            │  _failed     │
    └───────┬──────┘            │(AT_LEAST_ONE │
            │                   │   _FAILED)   │
            │                   └──────────────┘
            ▼                   │
    ┌──────────────┐            │ Envía alerta,
    │     load     │            │ rollback,
    │ (ALL_SUCCESS)│            │ etc.
    └───────┬──────┘
            │
            ▼
    ┌──────────────┐
    │   on_success │
    │  (ALL_SUCCESS)│
    └──────────────┘
\`\`\``,
        en: `## Error Handling: Robust Pipelines

### Retries
- Max retries: 3
- Retry interval: 30s to 5min

### Timeouts
\`\`\`json
{"timeout_seconds": 3600}  // 1 hour max
\`\`\`

### On-Failure Tasks
\`\`\`json
{"run_if": "AT_LEAST_ONE_FAILED", ...}
\`\`\``,
        pt: `## Manejo de Erros: Pipelines Robustos

### Retentativas
- Max retries: 3
- Intervalo: 30s a 5min

### Timeouts
\`\`\`json
{"timeout_seconds": 3600}
\`\`\``
      },
      practicalTips: [
        { es: '⏱️ SIEMPRE configura timeout. Un job colgado puede costarte cientos de dólares.', en: '⏱️ ALWAYS configure timeout. A hanging job can cost you hundreds of dollars.', pt: '⏱️ SEMPRE configure timeout. Um job travado pode custar centenas de dólares.' },
        { es: '🔄 Los reintentos son buenos para errores transitorios (red, API). No para bugs en código.', en: '🔄 Retries are good for transient errors (network, API). Not for code bugs.', pt: '🔄 Retentativas são boas para erros transitórios (rede, API). Não para bugs no código.' }
      ],
      externalLinks: [
        { title: 'Task Runs', url: 'https://docs.databricks.com/workflows/jobs/jobs.html#configure-task-runs', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Configuraste reintentos y una task on_failure para alertas?', en: '✅ Did you configure retries and an on_failure task for alerts?', pt: '✅ Você configurou retentativas e uma task on_failure para alertas?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-7-6',
      title: { es: 'Alertas y Notificaciones', en: 'Alerts and Notifications', pt: 'Alertas e Notificações' },
      description: { es: 'Configura alertas por email, Slack, webhooks cuando tus jobs fallan o tardan demasiado.', en: 'Configure email, Slack, webhook alerts when your jobs fail or take too long.', pt: 'Configure alertas por email, Slack, webhooks quando seus jobs falham ou demoram demais.' },
      theory: {
        es: `## Alertas: Enterarse de Problemas Rápido

### Tipos de Alertas Disponibles

| Evento | Cuándo se dispara |
|--------|-------------------|
| On Start | Cuando el job comienza |
| On Success | Cuando termina exitosamente |
| On Failure | Cuando falla |
| On Duration Warning | Cuando excede tiempo esperado |

### Configurar Alertas por Email

\`\`\`
En Job settings → Email notifications:
- On start: [devops@empresa.com]
- On success: [] (vacío - no notificar)
- On failure: [team@empresa.com, oncall@empresa.com]
- On duration threshold exceeded: [team@empresa.com]
  - Threshold: 2 hours
\`\`\`

### Configurar Alertas por Webhook (Slack, Teams, PagerDuty)

\`\`\`
1. En Job settings → Webhook notifications
2. Agregar URL del webhook:
   - Slack: https://hooks.slack.com/services/XXX
   - Teams: https://outlook.office.com/webhook/XXX
3. Seleccionar eventos

El payload enviado incluye:
- job_id, run_id
- Estado (SUCCESS, FAILED, etc)
- Duración
- Link a la run
\`\`\`

### Crear Alert Custom con Notebook

\`\`\`python
# Task: send_slack_alert (run_if: AT_LEAST_ONE_FAILED)

import requests

def send_slack_alert(channel, message):
    webhook_url = dbutils.secrets.get("alerts", "slack_webhook")
    
    payload = {
        "channel": channel,
        "username": "Databricks Bot",
        "icon_emoji": ":warning:",
        "attachments": [{
            "color": "danger",
            "title": "Job Failed!",
            "text": message,
            "fields": [
                {"title": "Job", "value": dbutils.widgets.get("job_name"), "short": True},
                {"title": "Run ID", "value": dbutils.widgets.get("run_id"), "short": True}
            ]
        }]
    }
    
    requests.post(webhook_url, json=payload)

# Obtener info de la run fallida
failed_tasks = dbutils.jobs.taskValues.get(taskKey="check_status", key="failed_tasks")
send_slack_alert("#data-alerts", f"Tasks fallidas: {failed_tasks}")
\`\`\`

### Ejemplo: Alerta con Contexto Rico

\`\`\`python
# En tu task principal, guardar métricas para la alerta
try:
    # Tu código de procesamiento
    rows_processed = df.count()
    dbutils.jobs.taskValues.set(key="rows_processed", value=rows_processed)
    dbutils.jobs.taskValues.set(key="status", value="success")
except Exception as e:
    dbutils.jobs.taskValues.set(key="error_message", value=str(e))
    dbutils.jobs.taskValues.set(key="status", value="failed")
    raise

# En task de alerta, construir mensaje rico
status = dbutils.jobs.taskValues.get(taskKey="main_task", key="status")
if status == "failed":
    error = dbutils.jobs.taskValues.get(taskKey="main_task", key="error_message")
    # Enviar alerta con el error específico
\`\`\``,
        en: `## Alerts: Know About Problems Fast

### Alert Types
- On Start, On Success, On Failure
- On Duration Warning

### Webhook (Slack, Teams)
Add webhook URL in Job settings → Webhook notifications

### Custom Alert
\`\`\`python
import requests
requests.post(webhook_url, json={"text": "Job failed!"})
\`\`\``,
        pt: `## Alertas: Saber de Problemas Rápido

### Tipos de Alerta
- On Start, On Success, On Failure
- On Duration Warning

### Webhook (Slack, Teams)
Adicionar URL do webhook em Job settings`
      },
      practicalTips: [
        { es: '🔔 Alerta en On Failure es obligatoria. Sin esto, un pipeline roto puede pasar días sin notarse.', en: '🔔 On Failure alert is mandatory. Without this, a broken pipeline can go days unnoticed.', pt: '🔔 Alerta em On Failure é obrigatório. Sem isso, um pipeline quebrado pode passar dias despercebido.' },
        { es: '⏰ Duration Warning ayuda a detectar pipelines que se están degradando antes de que fallen.', en: '⏰ Duration Warning helps detect pipelines degrading before they fail.', pt: '⏰ Duration Warning ajuda a detectar pipelines degradando antes de falharem.' }
      ],
      externalLinks: [
        { title: 'Notifications', url: 'https://docs.databricks.com/workflows/jobs/job-notifications.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Configuraste alertas de failure que llegan a tu equipo?', en: '✅ Did you configure failure alerts that reach your team?', pt: '✅ Você configurou alertas de failure que chegam ao seu time?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-7-7',
      title: { es: 'Monitoreo y Debugging', en: 'Monitoring and Debugging', pt: 'Monitoramento e Debugging' },
      description: { es: 'Aprende a diagnosticar problemas en jobs: logs, métricas, Spark UI.', en: 'Learn to diagnose job problems: logs, metrics, Spark UI.', pt: 'Aprenda a diagnosticar problemas em jobs: logs, métricas, Spark UI.' },
      theory: {
        es: `## Monitoreo: Entender qué Pasa

### Dashboard de Runs

\`\`\`
En Workflows → Tu Job → Runs:

┌────────────────────────────────────────────────────────────┐
│ Run History                                                │
├────────┬──────────────┬──────────┬─────────────────────────┤
│ Run ID │ Start Time   │ Duration │ Status                  │
├────────┼──────────────┼──────────┼─────────────────────────┤
│ 12345  │ 2024-01-15   │ 45m      │ ✅ Succeeded            │
│ 12344  │ 2024-01-14   │ 1h 20m   │ ⚠️ Succeeded (slow)     │
│ 12343  │ 2024-01-13   │ 15m      │ ❌ Failed               │
│ 12342  │ 2024-01-12   │ 42m      │ ✅ Succeeded            │
└────────┴──────────────┴──────────┴─────────────────────────┘
\`\`\`

### Investigar una Run Fallida

\`\`\`
1. Click en la run fallida
2. Ver qué task falló (marcada en rojo)
3. Click en la task para ver:
   - Output del notebook
   - Logs del driver
   - Stack trace del error
4. Click en "Spark UI" para métricas detalladas
\`\`\`

### Spark UI: El Microscopio de Performance

\`\`\`
Spark UI te muestra:

┌─────────────────────────────────────────────────────────────┐
│ JOBS TAB                                                    │
│ - Cada "job" de Spark (acción que dispara ejecución)        │
│ - Tiempo por job                                            │
│ - Stages completados                                        │
├─────────────────────────────────────────────────────────────┤
│ STAGES TAB                                                  │
│ - Detalle de cada stage                                     │
│ - Input/Output size                                         │
│ - Shuffle read/write                                        │
│ - Tiempo por tarea                                          │
├─────────────────────────────────────────────────────────────┤
│ STORAGE TAB                                                 │
│ - DataFrames cacheados                                      │
│ - Uso de memoria                                            │
├─────────────────────────────────────────────────────────────┤
│ SQL TAB                                                     │
│ - Plan de ejecución de cada query                           │
│ - Tiempo por operación                                      │
│ - Rows procesadas                                           │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Métricas Clave a Monitorear

| Métrica | Qué indica | Acción si es alto |
|---------|-----------|-------------------|
| Shuffle Write | Datos movidos entre nodos | Reparticionar, broadcast joins |
| Spill | Datos que no cupieron en RAM | Más memoria o menos datos |
| GC Time | Tiempo en garbage collection | Optimizar memoria, serialización |
| Skew | Particiones desbalanceadas | Salting, repartition |

### Logging Custom

\`\`\`python
# En tu notebook, agregar logs para debugging
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("my_pipeline")

logger.info(f"Starting processing for date: {date}")
logger.info(f"Input records: {df.count()}")

# Estos logs aparecen en el output del notebook
# y en los logs del driver
\`\`\`

### Comparar Runs

\`\`\`
Para identificar degradación:
1. Seleccionar 2 runs
2. Click "Compare"
3. Ver diferencias en:
   - Duración total
   - Duración por task
   - Recursos usados

Útil para: "¿Por qué hoy tardó el doble?"
\`\`\``,
        en: `## Monitoring: Understand What's Happening

### Investigate Failed Run
1. Click on failed run
2. See which task failed
3. Check logs and stack trace
4. Open Spark UI for details

### Key Metrics
- Shuffle Write: Data moved between nodes
- Spill: Data that didn't fit in RAM
- GC Time: Garbage collection time`,
        pt: `## Monitoramento: Entender o que Acontece

### Investigar Run Fallida
1. Click na run fallida
2. Ver qual task falhou
3. Verificar logs e stack trace
4. Abrir Spark UI para detalhes`
      },
      practicalTips: [
        { es: '📊 Revisa el Spark UI de jobs exitosos también - puedes encontrar optimizaciones antes de que sea un problema.', en: '📊 Review Spark UI of successful jobs too - you can find optimizations before they become problems.', pt: '📊 Revise o Spark UI de jobs bem-sucedidos também - você pode encontrar otimizações antes que virem problemas.' },
        { es: '📈 Crea dashboards de duración histórica para detectar degradación gradual.', en: '📈 Create historical duration dashboards to detect gradual degradation.', pt: '📈 Crie dashboards de duração histórica para detectar degradação gradual.' }
      ],
      externalLinks: [
        { title: 'Spark UI', url: 'https://docs.databricks.com/clusters/spark-ui.html', type: 'docs' },
        { title: 'Debug Jobs', url: 'https://docs.databricks.com/workflows/jobs/debug-jobs.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Usaste Spark UI para investigar una run lenta?', en: '✅ Did you use Spark UI to investigate a slow run?', pt: '✅ Você usou Spark UI para investigar uma run lenta?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-7-8',
      title: { es: 'Proyecto: Pipeline de Producción', en: 'Project: Production Pipeline', pt: 'Projeto: Pipeline de Produção' },
      description: { es: 'Construye un pipeline completo con múltiples tasks, schedule, reintentos y alertas.', en: 'Build a complete pipeline with multiple tasks, schedule, retries and alerts.', pt: 'Construa um pipeline completo com múltiplas tasks, schedule, retentativas e alertas.' },
      theory: {
        es: `## Proyecto: Pipeline de Ventas Production-Ready

Vas a crear un pipeline ETL completo que simula uno de producción real.

### Arquitectura del Pipeline

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                  SALES DAILY PIPELINE                        │
│                  Schedule: 0 6 * * *                         │
│                  Timezone: America/Argentina/Buenos_Aires    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌──────────────┐                                          │
│   │  check_source│  ← Verifica que los datos fuente existen │
│   └──────┬───────┘                                          │
│          │                                                   │
│          ▼                                                   │
│   ┌──────────────┐                                          │
│   │extract_sales │  ← Lee de S3/API, escribe bronze         │
│   │  (retries: 3)│                                          │
│   └──────┬───────┘                                          │
│          │                                                   │
│    ┌─────┴─────┐                                            │
│    ▼           ▼                                            │
│ ┌────────┐ ┌────────┐                                       │
│ │ clean  │ │ clean  │  ← En paralelo                        │
│ │ orders │ │products│                                       │
│ └───┬────┘ └───┬────┘                                       │
│     └─────┬─────┘                                           │
│           ▼                                                  │
│   ┌──────────────┐                                          │
│   │join_and_calc │  ← Calcula métricas, escribe silver      │
│   └──────┬───────┘                                          │
│          │                                                   │
│          ▼                                                   │
│   ┌──────────────┐                                          │
│   │ write_gold   │  ← Escribe tablas gold para BI           │
│   │(timeout: 30m)│                                          │
│   └──────┬───────┘                                          │
│          │                                                   │
│    ┌─────┼─────┐                                            │
│    ▼           ▼                                            │
│ ┌────────┐ ┌────────┐                                       │
│ │on_succ │ │on_fail │  ← Notificaciones                     │
│ │(Slack) │ │(Slack+ │                                       │
│ │        │ │PagerD) │                                       │
│ └────────┘ └────────┘                                       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Checklist de Implementación

**Tasks:**
- [ ] check_source: Verifica que los archivos/tablas fuente existen
- [ ] extract_sales: Lee datos, maneja errores, escribe a bronze
- [ ] clean_orders: Limpia y valida órdenes
- [ ] clean_products: Limpia y valida productos
- [ ] join_and_calc: Join + cálculo de métricas
- [ ] write_gold: Escribe tablas finales
- [ ] notify_success: Slack con resumen
- [ ] notify_failure: Slack + PagerDuty con detalles

**Configuración:**
- [ ] Schedule diario a las 6am tu timezone
- [ ] Reintentos: 3 para extract, 2 para el resto
- [ ] Timeout: 30min por task, 3h total
- [ ] Job cluster con autoscaling 2-8 workers
- [ ] Tags: team=data, env=prod, domain=sales

**Parámetros:**
- [ ] date: Fecha a procesar (default: yesterday)
- [ ] environment: dev/staging/prod
- [ ] full_refresh: true/false

### Código Base para Notebooks

**check_source.py:**
\`\`\`python
# Verificar que los datos fuente existen
date = dbutils.widgets.get("date")

source_path = f"s3://raw-data/sales/{date}/"
if not dbutils.fs.ls(source_path):
    raise Exception(f"Source data not found for {date}")

# Guardar info para siguiente task
dbutils.jobs.taskValues.set(key="source_path", value=source_path)
dbutils.jobs.taskValues.set(key="source_exists", value=True)
\`\`\`

**extract_sales.py:**
\`\`\`python
date = dbutils.widgets.get("date")
source_path = dbutils.jobs.taskValues.get(taskKey="check_source", key="source_path")

# Leer datos
df = spark.read.format("json").load(source_path)

# Validaciones básicas
if df.count() == 0:
    raise Exception("Empty source file!")

# Escribir a bronze
df.write.format("delta").mode("overwrite").saveAsTable(f"bronze.sales_{date.replace('-','')}")

dbutils.jobs.taskValues.set(key="rows_extracted", value=df.count())
\`\`\`

### Criterios de Éxito

✅ El pipeline corre exitosamente de principio a fin
✅ Si falla extract, reintenta 3 veces antes de fallar definitivamente  
✅ Las tasks paralelas (clean_*) corren en paralelo
✅ Las alertas llegan correctamente a Slack
✅ Los logs son suficientes para debuggear problemas
✅ Las métricas (rows procesadas) se reportan`,
        en: `## Project: Production-Ready Sales Pipeline

Build a complete ETL pipeline with:
- Multiple dependent tasks
- Daily schedule
- Retries and timeouts
- Success/failure notifications

See Spanish version for full architecture diagram and checklist.`,
        pt: `## Projeto: Pipeline de Vendas Production-Ready

Construa um pipeline ETL completo com:
- Múltiplas tasks dependentes
- Schedule diário
- Retentativas e timeouts
- Notificações de sucesso/falha`
      },
      practicalTips: [
        { es: '🏗️ Este proyecto es perfecto para tu portfolio de Data Engineer.', en: '🏗️ This project is perfect for your Data Engineer portfolio.', pt: '🏗️ Este projeto é perfeito para seu portfólio de Data Engineer.' },
        { es: '📝 Documenta las decisiones de diseño (por qué 3 reintentos, por qué ese timeout, etc).', en: '📝 Document design decisions (why 3 retries, why that timeout, etc).', pt: '📝 Documente as decisões de design (por que 3 retentativas, por que esse timeout, etc).' }
      ],
      externalLinks: [
        { title: 'Best Practices', url: 'https://docs.databricks.com/workflows/jobs/jobs-best-practices.html', type: 'docs' }
      ],
      checkpoint: { es: '🏆 ¿Tu pipeline corre diariamente sin intervención manual y alerta cuando falla?', en: '🏆 Does your pipeline run daily without manual intervention and alert when it fails?', pt: '🏆 Seu pipeline roda diariamente sem intervenção manual e alerta quando falha?' },
      xpReward: 80,
      estimatedMinutes: 120
    }
  ]
};
