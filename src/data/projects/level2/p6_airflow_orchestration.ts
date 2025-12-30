import { Project } from '../../../types/members';

export const p6_airflow_orchestration: Project = {
  id: 'p6-airflow-orchestration',
  level: 2,
  title: { es: 'Orquestación con Apache Airflow', en: 'Orchestration with Apache Airflow', pt: 'Orquestração com Apache Airflow' },
  description: {
    es: 'Construí un pipeline orquestado con Airflow que corre automáticamente todos los días. Airflow es LA herramienta de orquestación más usada en la industria.',
    en: 'Build an Airflow orchestrated pipeline that runs automatically every day. Airflow is THE most used orchestration tool in the industry.',
    pt: 'Construa um pipeline orquestrado com Airflow que roda automaticamente todos os dias. Airflow é A ferramenta de orquestração mais usada na indústria.'
  },
  difficulty: 'Avanzado',
  duration: '5-6 horas',
  skills: [{ es: 'Python' }, { es: 'Airflow' }, { es: 'Docker' }, { es: 'DAGs' }, { es: 'ETL' }, { es: 'Scheduling' }],
  icon: '🌀',
  color: 'orange',
  datasetId: 'iot',
  estimatedLines: 150,
  realWorldExample: {
    es: 'Así orquesta Siemens sus pipelines de datos de fábricas inteligentes',
    en: 'This is how Siemens orchestrates its smart factory data pipelines',
    pt: 'Assim a Siemens orquestra seus pipelines de dados de fábricas inteligentes'
  },
  usedBy: ['Uber', 'Airbnb', 'Spotify', 'Lyft', 'Twitter'],
  learningObjectives: [
    { es: 'Entender DAGs, Tasks y Operators', en: 'Understand DAGs, Tasks, and Operators', pt: 'Entender DAGs, Tasks e Operators' },
    { es: 'Crear pipelines con dependencias', en: 'Create pipelines with dependencies', pt: 'Criar pipelines com dependências' },
    { es: 'Configurar scheduling y retries', en: 'Configure scheduling and retries', pt: 'Configurar scheduling e retries' },
    { es: 'Usar Docker para levantar Airflow', en: 'Use Docker to spin up Airflow', pt: 'Usar Docker para levantar Airflow' },
    { es: 'Debuggear DAGs que fallan', en: 'Debug failing DAGs', pt: 'Debugar DAGs que falham' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'No hacer el código idempotente', en: 'Not making code idempotent', pt: 'Não fazer o código idempotente' },
      why: { es: 'Si el DAG falla y se re-ejecuta, puede duplicar datos', en: 'If DAG fails and reruns, it can duplicate data', pt: 'Se o DAG falha e re-executa, pode duplicar dados' },
      solution: { es: 'Usá UPSERT o DELETE+INSERT, nunca solo INSERT', en: 'Use UPSERT or DELETE+INSERT, never just INSERT', pt: 'Use UPSERT ou DELETE+INSERT, nunca só INSERT' },
      code: `# ❌ No idempotente
INSERT INTO tabla VALUES (...)

# ✅ Idempotente
DELETE FROM tabla WHERE fecha = '{{ ds }}'
INSERT INTO tabla VALUES (...)`
    },
    {
      mistake: { es: 'Olvidar configurar retries', en: 'Forgetting to configure retries', pt: 'Esquecer de configurar retries' },
      why: { es: 'Las fallas temporales (red, API) son comunes', en: 'Temporary failures (network, API) are common', pt: 'Falhas temporárias (rede, API) são comuns' },
      solution: { es: 'Siempre configurá retries con exponential backoff', en: 'Always configure retries with exponential backoff', pt: 'Sempre configure retries com exponential backoff' },
      code: `default_args = {
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
    'retry_exponential_backoff': True
}`
    },
    {
      mistake: { es: 'DAGs con demasiadas dependencias', en: 'DAGs with too many dependencies', pt: 'DAGs com muitas dependências' },
      why: { es: 'Un DAG de 100 tasks es imposible de debuggear', en: 'A 100-task DAG is impossible to debug', pt: 'Um DAG de 100 tasks é impossível de debugar' },
      solution: { es: 'Dividí en DAGs más chicos con TriggerDagRunOperator', en: 'Split into smaller DAGs with TriggerDagRunOperator', pt: 'Divida em DAGs menores com TriggerDagRunOperator' },
    },
  ],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'DAG visible en Airflow UI', en: 'DAG visible in Airflow UI', pt: 'DAG visível na UI do Airflow' },
      example: `DAG: iot_sensor_pipeline
├── extract_sensor_readings (success ✓)
├── extract_machine_data (success ✓)
├── detect_anomalies (running...)
├── generate_alerts (pending)
└── load_to_warehouse (pending)

Schedule: */15 * * * * (cada 15 minutos)
Last Run: 2024-01-15 14:30:00`
    },
  ],
  interviewStory: {
    hook: { es: "Implementé Airflow para orquestar 15 pipelines de datos que ahora corren automáticamente sin intervención humana, ahorrando 20 horas semanales de trabajo manual.", en: "Implemented Airflow to orchestrate 15 data pipelines now running automatically without human intervention, saving 20 hours of manual work weekly.", pt: "Implementei Airflow para orquestrar 15 pipelines de dados que agora rodam automaticamente sem intervenção humana, economizando 20 horas semanais de trabalho manual." },
    situation: { es: "El equipo corría pipelines manualmente con cron jobs y scripts bash. Cuando algo fallaba, nadie se enteraba hasta que el reporte del día siguiente estaba vacío.", en: "Team ran pipelines manually with cron jobs and bash scripts. When something failed, no one knew until next day's report was empty.", pt: "A equipe rodava pipelines manualmente com cron jobs e scripts bash. Quando algo falhava, ninguém sabia até que o relatório do dia seguinte estava vazio." },
    task: { es: "Implementar Airflow como plataforma de orquestación con monitoreo, alertas y reintentos automáticos.", en: "Implement Airflow as orchestration platform with monitoring, alerts, and automatic retries.", pt: "Implementar Airflow como plataforma de orquestração com monitoramento, alertas e re-tentativas automáticas." },
    actions: [
      { es: "Levanté Airflow con Docker Compose para desarrollo local", en: "Spun up Airflow with Docker Compose for local development", pt: "Levantei Airflow com Docker Compose para desenvolvimento local" },
      { es: "Migré los scripts existentes a DAGs con dependencias claras", en: "Migrated existing scripts to DAGs with clear dependencies", pt: "Migrei os scripts existentes para DAGs com dependências claras" },
      { es: "Configuré retries con exponential backoff para fallas temporales", en: "Configured retries with exponential backoff for temporary failures", pt: "Configurei retries com exponential backoff para falhas temporárias" },
      { es: "Implementé alertas a Slack cuando un DAG falla", en: "Implemented Slack alerts when a DAG fails", pt: "Implementei alertas no Slack quando um DAG falha" },
      { es: "Creé un DAG master que orquesta los demás con TriggerDagRunOperator", en: "Created master DAG orchestrating others with TriggerDagRunOperator", pt: "Criei um DAG master que orquestra os outros com TriggerDagRunOperator" }
    ],
    results: [
      { es: "15 pipelines corriendo automáticamente a las 6am cada día", en: "15 pipelines running automatically at 6am every day", pt: "15 pipelines rodando automaticamente às 6am todo dia" },
      { es: "Tiempo de detección de fallas: de 24 horas a 5 minutos", en: "Failure detection time: from 24 hours to 5 minutes", pt: "Tempo de detecção de falhas: de 24 horas para 5 minutos" },
      { es: "99.5% de uptime - solo 2 fallas en 3 meses (ambas por APIs externas)", en: "99.5% uptime - only 2 failures in 3 months (both external APIs)", pt: "99.5% de uptime - apenas 2 falhas em 3 meses (ambas por APIs externas)" },
      { es: "El equipo ahorra 20 horas semanales de trabajo manual", en: "Team saves 20 hours weekly of manual work", pt: "A equipe economiza 20 horas semanais de trabalho manual" }
    ],
    learnings: [
      { es: "Idempotencia es crítica - si un DAG se re-ejecuta no debe duplicar datos", en: "Idempotency is critical - if a DAG reruns it must not duplicate data", pt: "Idempotência é crítica - se um DAG re-executa não deve duplicar dados" },
      { es: "Los DAGs deben ser pequeños y enfocados - un DAG de 50 tasks es imposible de debuggear", en: "DAGs must be small and focused - a 50-task DAG is impossible to debug", pt: "DAGs devem ser pequenos e focados - um DAG de 50 tasks é impossível de debugar" },
      { es: "Las variables de Airflow son geniales para configuración sin tocar código", en: "Airflow variables are great for configuration without touching code", pt: "As variáveis do Airflow são ótimas para configuração sem tocar código" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Qué pasa si un DAG falla a mitad de ejecución?", en: "What happens if a DAG fails mid-execution?", pt: "O que acontece se um DAG falha no meio da execução?" },
        answer: { es: "Airflow marca las tasks fallidas y permite re-ejecutar solo las que fallaron. Por eso es crítico que cada task sea idempotente - puedo re-ejecutar sin miedo a duplicar datos.", en: "Airflow marks failed tasks and allows re-running only failed ones. That's why it's critical each task is idempotent - can re-run without fear of duplicating data.", pt: "Airflow marca as tasks falhadas e permite re-executar apenas as que falharam. Por isso é crítico que cada task seja idempotente - posso re-executar sem medo de duplicar dados." }
      },
      {
        question: { es: "¿Cómo manejás dependencias entre DAGs?", en: "How do you handle dependencies between DAGs?", pt: "Como lida com dependências entre DAGs?" },
        answer: { es: "Uso TriggerDagRunOperator para encadenar DAGs, o ExternalTaskSensor para esperar que otro DAG termine. Prefiero DAGs pequeños e independientes cuando es posible.", en: "I use TriggerDagRunOperator to chain DAGs, or ExternalTaskSensor to wait for another DAG to finish. I prefer small independent DAGs when possible.", pt: "Uso TriggerDagRunOperator para encadear DAGs, ou ExternalTaskSensor para esperar que outro DAG termine. Prefiro DAGs pequenos e independentes quando possível." }
      },
      {
        question: { es: "¿Airflow vs otras herramientas como Prefect o Dagster?", en: "Airflow vs other tools like Prefect or Dagster?", pt: "Airflow vs outras ferramentas como Prefect ou Dagster?" },
        answer: { es: "Airflow es el estándar de la industria con más comunidad y recursos. Prefect y Dagster son más modernos y pythonicos, pero menos maduros. Elegiría Airflow para equipos grandes, Prefect para startups.", en: "Airflow is industry standard with more community and resources. Prefect and Dagster are more modern and pythonic, but less mature. I'd choose Airflow for large teams, Prefect for startups.", pt: "Airflow é o padrão da indústria com mais comunidade e recursos. Prefect e Dagster são mais modernos e pythônicos, mas menos maduros. Escolheria Airflow para equipes grandes, Prefect para startups." }
      }
    ],
    closingStatement: { es: "Airflow transformó nuestros pipelines de 'scripts que alguien corre' a 'infraestructura de datos profesional'.", en: "Airflow transformed our pipelines from 'scripts someone runs' to 'professional data infrastructure'.", pt: "Airflow transformou nossos pipelines de 'scripts que alguém roda' para 'infraestrutura de dados profissional'." }
  },
  prerequisites: ['p1-etl-python', 'p3-api-pipeline'],
  steps: [
    { 
      order: 1, 
      text: { es: '🐳 Instalá Docker Desktop', en: '🐳 Install Docker Desktop', pt: '🐳 Instale Docker Desktop' },
      code: `# Verificar instalación
docker --version
docker-compose --version

# Si no tenés Docker, descargalo de docker.com`,
      explanation: { es: 'Airflow tiene muchos componentes (webserver, scheduler, database). Docker simplifica todo.', en: 'Airflow has many components (webserver, scheduler, database). Docker simplifies everything.', pt: 'Airflow tem muitos componentes (webserver, scheduler, database). Docker simplifica tudo.' },
      checkpoint: { es: '¿docker --version funciona?', en: 'Does docker --version work?', pt: 'docker --version funciona?' }
    },
    { 
      order: 2, 
      text: { es: '📂 Creá la estructura del proyecto', en: '📂 Create project structure', pt: '📂 Crie a estrutura do projeto' },
      code: `mkdir airflow-etl
cd airflow-etl

# Estructura de Airflow
mkdir -p dags logs plugins data output

# Archivos de configuración
touch docker-compose.yaml .env`,
      explanation: { es: 'dags/ es donde van tus pipelines. logs/ guarda los logs de ejecución.', en: 'dags/ is where your pipelines go. logs/ stores execution logs.', pt: 'dags/ é onde vão seus pipelines. logs/ guarda os logs de execução.' }
    },
    { 
      order: 3, 
      text: { es: '📄 Creá el docker-compose.yaml', en: '📄 Create docker-compose.yaml', pt: '📄 Crie o docker-compose.yaml' },
      code: `# docker-compose.yaml
version: '3.8'

x-airflow-common: &airflow-common
  image: apache/airflow:2.7.0
  environment:
    - AIRFLOW__CORE__EXECUTOR=LocalExecutor
    - AIRFLOW__CORE__SQL_ALCHEMY_CONN=postgresql+psycopg2://airflow:airflow@postgres/airflow
    - AIRFLOW__CORE__FERNET_KEY=your-fernet-key-here
    - AIRFLOW__CORE__LOAD_EXAMPLES=False
    - AIRFLOW__WEBSERVER__SECRET_KEY=your-secret-key
  volumes:
    - ./dags:/opt/airflow/dags
    - ./logs:/opt/airflow/logs
    - ./plugins:/opt/airflow/plugins
    - ./data:/opt/airflow/data
    - ./output:/opt/airflow/output
  depends_on:
    - postgres

services:
  postgres:
    image: postgres:13
    environment:
      - POSTGRES_USER=airflow
      - POSTGRES_PASSWORD=airflow
      - POSTGRES_DB=airflow
    volumes:
      - postgres-db-volume:/var/lib/postgresql/data

  airflow-init:
    <<: *airflow-common
    entrypoint: /bin/bash
    command:
      - -c
      - |
        airflow db init
        airflow users create \\
          --username admin \\
          --password admin \\
          --firstname Admin \\
          --lastname User \\
          --role Admin \\
          --email admin@example.com
    restart: "no"

  airflow-webserver:
    <<: *airflow-common
    command: webserver
    ports:
      - "8080:8080"
    restart: always

  airflow-scheduler:
    <<: *airflow-common
    command: scheduler
    restart: always

volumes:
  postgres-db-volume:`,
      explanation: { es: 'Este docker-compose levanta: PostgreSQL (metadata), Webserver (UI), Scheduler (ejecuta DAGs).', en: 'This docker-compose spins up: PostgreSQL (metadata), Webserver (UI), Scheduler (executes DAGs).', pt: 'Este docker-compose levanta: PostgreSQL (metadata), Webserver (UI), Scheduler (executa DAGs).' },
      tip: { es: 'Generá un FERNET_KEY real con: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"', en: 'Generate a real FERNET_KEY with: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"', pt: 'Gere um FERNET_KEY real com: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"' }
    },
    { 
      order: 4, 
      text: { es: '🚀 Levantá Airflow', en: '🚀 Spin up Airflow', pt: '🚀 Levante o Airflow' },
      code: `# Inicializar (solo la primera vez)
docker-compose up airflow-init

# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Acceder a la UI: http://localhost:8080
# Usuario: admin, Password: admin`,
      explanation: { es: 'La primera vez tarda unos minutos. Esperá hasta ver "Listening at: http://0.0.0.0:8080"', en: 'First time takes a few minutes. Wait until "Listening at: http://0.0.0.0:8080"', pt: 'A primeira vez demora uns minutos. Espere até ver "Listening at: http://0.0.0.0:8080"' },
      checkpoint: { es: '¿Podés acceder a http://localhost:8080?', en: 'Can you access http://localhost:8080?', pt: 'Consegue acessar http://localhost:8080?' }
    },
    { 
      order: 5, 
      text: { es: '📝 Creá tu primer DAG', en: '📝 Create your first DAG', pt: '📝 Crie seu primeiro DAG' },
      code: `# dags/etl_ecommerce.py
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator

# Configuración del DAG
default_args = {
    'owner': 'data-team',
    'depends_on_past': False,
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 3,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'etl_ecommerce',
    default_args=default_args,
    description='Pipeline ETL de datos de e-commerce',
    schedule_interval='@daily',  # Corre todos los días a medianoche
    start_date=datetime(2024, 1, 1),
    catchup=False,  # No ejecutar para fechas pasadas
    tags=['etl', 'ecommerce'],
)`,
      explanation: { es: 'default_args se aplican a todas las tasks. catchup=False evita que corra para fechas pasadas.', en: 'default_args apply to all tasks. catchup=False prevents running for past dates.', pt: 'default_args se aplicam a todas as tasks. catchup=False evita que rode para datas passadas.' },
      tip: { es: 'Siempre poné retries. Las redes fallan, las APIs tienen rate limits.', en: 'Always set retries. Networks fail, APIs have rate limits.', pt: 'Sempre coloque retries. As redes falham, as APIs têm rate limits.' }
    },
    { 
      order: 6, 
      text: { es: '📥 Task 1: Extract', en: '📥 Task 1: Extract', pt: '📥 Task 1: Extract' },
      code: `# Agregar al DAG

def extract(**context):
    """Extrae datos de sensores IoT."""
    import pandas as pd
    
    print("📥 Extrayendo datos de sensores...")
    
    # En producción, leerías de Kafka, MQTT o APIs de IoT
    # Por ahora, leemos de archivos CSV locales
    sensor_readings = pd.read_csv('/opt/airflow/data/iot_sensor_readings.csv')
    machines = pd.read_csv('/opt/airflow/data/iot_machines.csv')
    
    # Guardar rutas para la siguiente task (XCom)
    # NOTA: Para datos grandes, pasa rutas en vez del DataFrame
    context['ti'].xcom_push(key='readings_path', value='/opt/airflow/data/iot_sensor_readings.csv')
    context['ti'].xcom_push(key='machines_path', value='/opt/airflow/data/iot_machines.csv')
    
    print(f"✅ Extraídas {len(sensor_readings)} lecturas, {len(machines)} máquinas")
    return True

extract_task = PythonOperator(
    task_id='extract',
    python_callable=extract,
    dag=dag,
)`,
      explanation: { es: 'XCom (cross-communication) permite pasar datos entre tasks. Usalo para datos pequeños.', en: 'XCom (cross-communication) allows passing data between tasks. Use it for small data.', pt: 'XCom (cross-communication) permite passar dados entre tasks. Use para dados pequenos.' },
      warning: { es: 'XCom tiene límite de tamaño. Para datos grandes, guardá en archivos y pasá la ruta.', en: 'XCom has size limit. For large data, save to files and pass the path.', pt: 'XCom tem limite de tamanho. Para dados grandes, salve em arquivos e passe o caminho.' }
    },
    { 
      order: 7, 
      text: { es: '🔄 Task 2: Transform', en: '🔄 Task 2: Transform', pt: '🔄 Task 2: Transform' },
      code: `def transform(**context):
    """Transforma los datos de sensores."""
    import pandas as pd
    
    print("🔄 Transformando datos de sensores...")
    
    # Obtener ruta del CSV de la task anterior
    readings_path = context['ti'].xcom_pull(key='readings_path', task_ids='extract')
    
    # Transformar
    df = pd.read_csv(readings_path)
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['order_month'] = df['order_date'].dt.to_period('M').astype(str)
    
    # Calcular métricas
    metrics = {
        'total_orders': len(df),
        'total_revenue': float(df['total'].sum()),
        'avg_order_value': float(df['total'].mean()),
    }
    
    # Guardar datos transformados
    output_path = '/opt/airflow/output/orders_clean.parquet'
    df.to_parquet(output_path, index=False)
    
    context['ti'].xcom_push(key='metrics', value=metrics)
    context['ti'].xcom_push(key='output_path', value=output_path)
    
    print(f"✅ Transformadas {len(df)} órdenes")
    return True

transform_task = PythonOperator(
    task_id='transform',
    python_callable=transform,
    dag=dag,
)`,
      explanation: { es: 'xcom_pull obtiene datos de tasks anteriores. Especificá task_ids para saber de cuál.', en: 'xcom_pull gets data from previous tasks. Specify task_ids to know which one.', pt: 'xcom_pull obtém dados de tasks anteriores. Especifique task_ids para saber de qual.' }
    },
    { 
      order: 8, 
      text: { es: '💾 Task 3: Load', en: '💾 Task 3: Load', pt: '💾 Task 3: Load' },
      code: `def load(**context):
    """Carga los datos al destino."""
    import json
    
    print("💾 Cargando datos...")
    
    # Obtener métricas
    metrics = context['ti'].xcom_pull(key='metrics', task_ids='transform')
    output_path = context['ti'].xcom_pull(key='output_path', task_ids='transform')
    
    # En producción, cargarías a un Data Warehouse
    # Por ahora, guardamos un resumen
    summary = {
        'execution_date': str(context['execution_date']),
        'metrics': metrics,
        'output_file': output_path,
    }
    
    with open('/opt/airflow/output/summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    
    print(f"✅ Pipeline completado!")
    print(f"   Total orders: {metrics['total_orders']}")
    print(f"   Total revenue: {metrics['total_revenue']:,.2f}")
    
    return True

load_task = PythonOperator(
    task_id='load',
    python_callable=load,
    dag=dag,
)`,
      explanation: { es: 'context["execution_date"] te da la fecha para la que corre el pipeline. Útil para idempotencia.', en: 'context["execution_date"] gives you the date the pipeline runs for. Useful for idempotency.', pt: 'context["execution_date"] te dá a data para a qual roda o pipeline. Útil para idempotência.' }
    },
    { 
      order: 9, 
      text: { es: '🔗 Definí dependencias', en: '🔗 Define dependencies', pt: '🔗 Defina dependências' },
      code: `# Al final del archivo, definir el orden de ejecución

extract_task >> transform_task >> load_task

# Alternativa más explícita:
# transform_task.set_upstream(extract_task)
# load_task.set_upstream(transform_task)`,
      explanation: { es: '>> define el orden: extract corre primero, después transform, después load.', en: '>> defines order: extract runs first, then transform, then load.', pt: '>> define a ordem: extract roda primeiro, depois transform, depois load.' },
      tip: { es: 'Podés tener dependencias en paralelo: [task_a, task_b] >> task_c', en: 'You can have parallel dependencies: [task_a, task_b] >> task_c', pt: 'Você pode ter dependências em paralelo: [task_a, task_b] >> task_c' }
    },
    { 
      order: 10, 
      text: { es: '📊 Testeá el DAG', en: '📊 Test the DAG', pt: '📊 Teste o DAG' },
      code: `# Verificar sintaxis
docker-compose exec airflow-webserver airflow dags list

# Testear una task específica
docker-compose exec airflow-webserver airflow tasks test etl_ecommerce extract 2024-01-01

# Ver en la UI:
# 1. Ir a http://localhost:8080
# 2. Activar el DAG (toggle)
# 3. Trigger manual (botón play)
# 4. Ver logs de cada task`,
      explanation: { es: '"airflow tasks test" corre una task sin guardar estado. Perfecto para debugging.', en: '"airflow tasks test" runs a task without saving state. Perfect for debugging.', pt: '"airflow tasks test" roda uma task sem salvar estado. Perfeito para debugging.' },
      checkpoint: { es: '¿El DAG aparece en la UI sin errores?', en: 'Does the DAG appear in UI without errors?', pt: 'O DAG aparece na UI sem erros?' }
    },
    { 
      order: 11, 
      text: { es: '📝 Documentá y subí a GitHub', en: '📝 Document and push to GitHub', pt: '📝 Documente e suba para o GitHub' },
      explanation: { es: 'Creá README explicando: qué hace el DAG, cómo levantarlo, cómo monitorearlo.', en: 'Create README explaining: what the DAG does, how to spin it up, how to monitor it.', pt: 'Crie README explicando: o que faz o DAG, como levantar, como monitorar.' },
      checkpoint: { es: '¿Tu README tiene instrucciones claras para levantar Airflow?', en: 'Does your README have clear instructions to spin up Airflow?', pt: 'Seu README tem instruções claras para levantar Airflow?' }
    },
  ],
  deliverable: { es: 'Repositorio con: docker-compose.yaml, dags/, README.md', en: 'Repository with: docker-compose.yaml, dags/, README.md', pt: 'Repositório com: docker-compose.yaml, dags/, README.md' },
  evaluation: [
    { es: '¿El DAG corre exitosamente de principio a fin?', en: 'Does the DAG run successfully from start to finish?', pt: 'O DAG roda com sucesso do início ao fim?' },
    { es: '¿Las dependencias son correctas?', en: 'Are dependencies correct?', pt: 'As dependências estão corretas?' },
    { es: '¿Configuraste retries y timeouts?', en: 'Did you configure retries and timeouts?', pt: 'Configurou retries e timeouts?' },
    { es: '¿El código es idempotente (correr 2 veces = mismo resultado)?', en: 'Is code idempotent (running 2 times = same result)?', pt: 'O código é idempotente (rodar 2 vezes = mesmo resultado)?' },
    { es: '¿Los logs son informativos?', en: 'Are logs informative?', pt: 'Os logs são informativos?' },
  ],
  theory: { es: `## Conceptos de Airflow

**DAG (Directed Acyclic Graph)**: Tu pipeline completo. Define qué tasks corren y en qué orden.

**Task**: Una unidad de trabajo (extract, transform, load).

**Operator**: Template para crear tasks:
- PythonOperator: Ejecuta función Python
- BashOperator: Ejecuta comando bash
- SqlOperator: Ejecuta query SQL

## Buenas Prácticas

1. **Idempotencia**: Correr 2 veces debe dar el mismo resultado
2. **Catchup=False**: No ejecutar para fechas pasadas (a menos que lo necesites)
3. **Retries**: Siempre configurar reintentos
4. **Logging**: Loguear todo para debugging
5. **XCom pequeño**: Para datos grandes, usá archivos

## 🎯 THIN DAGs - LA REGLA DE ORO

**NUNCA pongas lógica de negocio pesada en el DAG.**

\`\`\`python
# ❌ MALO: Lógica pesada en el DAG
def extract_and_transform():
    df = pd.read_csv("huge_file.csv")  # 10GB
    df = df.dropna()
    df = df.groupby("category").agg(...)
    # ... 200 líneas de transformación
    df.to_parquet("output.parquet")

with DAG(...) as dag:
    PythonOperator(
        task_id="etl",
        python_callable=extract_and_transform  # ¡Todo el código acá!
    )

# ✅ BUENO: DAG thin que llama scripts externos
with DAG(...) as dag:
    extract = BashOperator(
        task_id="extract",
        bash_command="python /opt/scripts/extract.py {{ ds }}"
    )
    transform = BashOperator(
        task_id="transform", 
        bash_command="python /opt/scripts/transform.py {{ ds }}"
    )
    load = BashOperator(
        task_id="load",
        bash_command="python /opt/scripts/load.py {{ ds }}"
    )
    extract >> transform >> load
\`\`\``, en: `## Airflow Concepts

**DAG (Directed Acyclic Graph)**: Your complete pipeline. Defines which tasks run and in what order.

**Task**: A unit of work (extract, transform, load).

**Operator**: Template to create tasks:
- PythonOperator: Executes Python function
- BashOperator: Executes bash command
- SqlOperator: Executes SQL query

## Best Practices

1. **Idempotency**: Running 2 times must give same result
2. **Catchup=False**: Do not execute for past dates (unless needed)
3. **Retries**: Always configure retries
4. **Logging**: Log everything for debugging
5. **Small XCom**: For large data, use files

## 🎯 THIN DAGs - THE GOLDEN RULE

**NEVER put heavy business logic in the DAG.**

\`\`\`python
# ❌ BAD: Heavy logic in DAG
def extract_and_transform():
    df = pd.read_csv("huge_file.csv")  # 10GB
    df = df.dropna()
    df = df.groupby("category").agg(...)
    # ... 200 lines of transformation
    df.to_parquet("output.parquet")

with DAG(...) as dag:
    PythonOperator(
        task_id="etl",
        python_callable=extract_and_transform  # All code here!
    )

# ✅ GOOD: Thin DAG calling external scripts
with DAG(...) as dag:
    extract = BashOperator(
        task_id="extract",
        bash_command="python /opt/scripts/extract.py {{ ds }}"
    )
    transform = BashOperator(
        task_id="transform", 
        bash_command="python /opt/scripts/transform.py {{ ds }}"
    )
    load = BashOperator(
        task_id="load",
        bash_command="python /opt/scripts/load.py {{ ds }}"
    )
    extract >> transform >> load
\`\`\``, pt: `## Conceitos de Airflow

**DAG (Directed Acyclic Graph)**: Seu pipeline completo. Define quais tasks rodam e em que ordem.

**Task**: Uma unidade de trabalho (extract, transform, load).

**Operator**: Template para criar tasks:
- PythonOperator: Executa função Python
- BashOperator: Executa comando bash
- SqlOperator: Executa query SQL

## Boas Práticas

1. **Idempotência**: Rodar 2 vezes deve dar o mesmo resultado
2. **Catchup=False**: Não executar para datas passadas (a menos que precise)
3. **Retries**: Sempre configurar re-tentativas
4. **Logging**: Logar tudo para debugging
5. **XCom pequeno**: Para dados grandes, use arquivos

## 🎯 THIN DAGs - A REGRA DE OURO

**NUNCA coloque lógica de negócio pesada no DAG.**

\`\`\`python
# ❌ RUIM: Lógica pesada no DAG
def extract_and_transform():
    df = pd.read_csv("huge_file.csv")  # 10GB
    df = df.dropna()
    df = df.groupby("category").agg(...)
    # ... 200 linhas de transformação
    df.to_parquet("output.parquet")

with DAG(...) as dag:
    PythonOperator(
        task_id="etl",
        python_callable=extract_and_transform  # Todo o código aqui!
    )

# ✅ BOM: DAG thin que chama scripts externos
with DAG(...) as dag:
    extract = BashOperator(
        task_id="extract",
        bash_command="python /opt/scripts/extract.py {{ ds }}"
    )
    transform = BashOperator(
        task_id="transform", 
        bash_command="python /opt/scripts/transform.py {{ ds }}"
    )
    load = BashOperator(
        task_id="load",
        bash_command="python /opt/scripts/load.py {{ ds }}"
    )
    extract >> transform >> load
\`\`\`` },
};


