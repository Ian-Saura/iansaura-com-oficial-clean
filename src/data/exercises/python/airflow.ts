/**
 * Airflow Exercises
 * DAGs, Operators, Scheduling
 */

import { PythonExercise } from '../types';

export const PYTHON_AIRFLOW: PythonExercise[] = [
  {
    id: 'py-af1',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'airflow',
    tags: ['airflow', 'dag', 'scheduling'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Airflow: Primer DAG',
      en: 'Airflow: First DAG',
      pt: 'Airflow: Primeiro DAG'
    },
    description: {
      es: 'Definí un DAG básico que corra diariamente y tenga un BashOperator.',
      en: 'Define a basic DAG that runs daily and has a BashOperator.',
      pt: 'Defina um DAG básico que rode diariamente e tenha um BashOperator.'
    },
    theory: {
      es: `**Apache Airflow DAG:**

\`\`\`python
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

# Context manager para definir el DAG
with DAG(
    dag_id='mi_primer_dag',
    start_date=datetime(2023, 1, 1),
    schedule_interval='@daily',
    catchup=False
) as dag:
    
    t1 = BashOperator(
        task_id='print_date',
        bash_command='date'
    )
\`\`\``,
      en: `**Apache Airflow DAG:**

\`\`\`python
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

# Context manager to define the DAG
with DAG(
    dag_id='my_first_dag',
    start_date=datetime(2023, 1, 1),
    schedule_interval='@daily',
    catchup=False
) as dag:
    
    t1 = BashOperator(
        task_id='print_date',
        bash_command='date'
    )
\`\`\``,
      pt: `**Apache Airflow DAG:**

\`\`\`python
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

# Context manager para definir o DAG
with DAG(
    dag_id='meu_primeiro_dag',
    start_date=datetime(2023, 1, 1),
    schedule_interval='@daily',
    catchup=False
) as dag:
    
    t1 = BashOperator(
        task_id='print_date',
        bash_command='date'
    )
\`\`\``
    },
    realWorldExample: {
      es: 'Orquestar cualquier pipeline de datos en producción.',
      en: 'Orchestrate any data pipeline in production.',
      pt: 'Orquestrar qualquer pipeline de dados em produção.'
    },
    hint: {
      es: 'Usá with DAG(...) as dag:',
      en: 'Use with DAG(...) as dag:',
      pt: 'Use with DAG(...) as dag:'
    },
    
    starterCode: {
      es: `from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

# Definí el DAG:
# - dag_id: 'tutorial_dag'
# - start_date: hoy
# - schedule_interval: '@daily'
# - Agregá un BashOperator que imprima "Hola Airflow"

dag = None # Reemplazá por el bloque with DAG...

# Tu código aquí (simulado, solo escribí la estructura)
print("DAG definido")`,
      en: `from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

# Define the DAG:
# - dag_id: 'tutorial_dag'
# - start_date: today
# - schedule_interval: '@daily'
# - Add a BashOperator printing "Hello Airflow"

dag = None # Replace with block with DAG...

# Your code here (simulated, just write the structure)
print("DAG defined")`,
      pt: `from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

# Defina o DAG:
# - dag_id: 'tutorial_dag'
# - start_date: hoje
# - schedule_interval: '@daily'
# - Adicione um BashOperator que imprima "Olá Airflow"

dag = None # Substitua pelo bloco with DAG...

# Seu código aqui (simulado, apenas escreva a estrutura)
print("DAG definido")`
    },
    solution: `from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG(
    dag_id='tutorial_dag',
    start_date=datetime(2023, 1, 1),
    schedule_interval='@daily',
    catchup=False
) as dag:
    
    t1 = BashOperator(
        task_id='say_hello',
        bash_command='echo "Hola Airflow"'
    )

print("DAG definido")`,
    testCode: `
# En el entorno de navegador no podemos ejecutar Airflow real,
# pero validamos que el código sea sintácticamente correcto en Python.
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-af2',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'airflow',
    tags: ['airflow', 'pythonoperator'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Airflow: PythonOperator',
      en: 'Airflow: PythonOperator',
      pt: 'Airflow: PythonOperator'
    },
    description: {
      es: 'Creá una tarea que ejecute una función Python usando PythonOperator.',
      en: 'Create a task that executes a Python function using PythonOperator.',
      pt: 'Crie uma tarefa que execute uma função Python usando PythonOperator.'
    },
    theory: {
      es: `**PythonOperator:**

Permite ejecutar código Python arbitrario.

\`\`\`python
from airflow.operators.python import PythonOperator

def my_func(name):
    print(f"Hello {name}")

t1 = PythonOperator(
    task_id='python_task',
    python_callable=my_func,
    op_kwargs={'name': 'Ian'}
)
\`\`\``,
      en: `**PythonOperator:**

Allows executing arbitrary Python code.

\`\`\`python
from airflow.operators.python import PythonOperator

def my_func(name):
    print(f"Hello {name}")

t1 = PythonOperator(
    task_id='python_task',
    python_callable=my_func,
    op_kwargs={'name': 'Ian'}
)
\`\`\``,
      pt: `**PythonOperator:**

Permite executar código Python arbitrário.

\`\`\`python
from airflow.operators.python import PythonOperator

def my_func(name):
    print(f"Hello {name}")

t1 = PythonOperator(
    task_id='python_task',
    python_callable=my_func,
    op_kwargs={'name': 'Ian'}
)
\`\`\``
    },
    realWorldExample: {
      es: 'Ejecutar scripts ETL de Pandas dentro de Airflow.',
      en: 'Run Pandas ETL scripts within Airflow.',
      pt: 'Executar scripts ETL de Pandas dentro do Airflow.'
    },
    hint: {
      es: 'Definí la función primero, luego pasala en python_callable',
      en: 'Define the function first, then pass it in python_callable',
      pt: 'Defina a função primeiro, depois passe em python_callable'
    },
    
    starterCode: {
      es: `from airflow.operators.python import PythonOperator

def process_data():
    print("Procesando datos...")

# Creá el operador
# task = PythonOperator(...)

# Tu código aquí`,
      en: `from airflow.operators.python import PythonOperator

def process_data():
    print("Processing data...")

# Create the operator
# task = PythonOperator(...)

# Your code here`,
      pt: `from airflow.operators.python import PythonOperator

def process_data():
    print("Processando dados...")

# Crie o operador
# task = PythonOperator(...)

# Seu código aqui`
    },
    solution: `from airflow.operators.python import PythonOperator

def process_data():
    print("Procesando datos...")

task = PythonOperator(
    task_id='process_task',
    python_callable=process_data
)`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-af3',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'airflow',
    tags: ['airflow', 'dependencies', 'bitshift'],
    interviewFrequency: 'medium',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Airflow: Dependencias',
      en: 'Airflow: Dependencies',
      pt: 'Airflow: Dependências'
    },
    description: {
      es: 'Configurá que la tarea t2 se ejecute después de t1.',
      en: 'Configure task t2 to run after t1.',
      pt: 'Configure para que a tarefa t2 execute depois de t1.'
    },
    theory: {
      es: `**Dependencias en Airflow:**

Usamos los operadores bitshift \`>>\` y \`<<\`.

\`\`\`python
# t1 corre antes que t2
t1 >> t2

# Cadena
t1 >> t2 >> t3

# Lista (t2 y t3 corren en paralelo después de t1)
t1 >> [t2, t3]
\`\`\``,
      en: `**Dependencies in Airflow:**

We use bitshift operators \`>>\` and \`<<\`.

\`\`\`python
# t1 runs before t2
t1 >> t2

# Chain
t1 >> t2 >> t3

# List (t2 and t3 run in parallel after t1)
t1 >> [t2, t3]
\`\`\``,
      pt: `**Dependências no Airflow:**

Usamos os operadores bitshift \`>>\` e \`<<\`.

\`\`\`python
# t1 roda antes de t2
t1 >> t2

# Cadeia
t1 >> t2 >> t3

# Lista (t2 e t3 rodam em paralelo depois de t1)
t1 >> [t2, t3]
\`\`\``
    },
    realWorldExample: {
      es: 'No transformar datos hasta que la extracción termine.',
      en: 'Do not transform data until extraction finishes.',
      pt: 'Não transformar dados até que a extração termine.'
    },
    hint: {
      es: 'Usá t1 >> t2',
      en: 'Use t1 >> t2',
      pt: 'Use t1 >> t2'
    },
    
    starterCode: {
      es: `# Supongamos t1 y t2 ya definidos
# t1 = ...
# t2 = ...

# Definí la dependencia: t1 antes que t2
# Tu código aquí`,
      en: `# Assume t1 and t2 already defined
# t1 = ...
# t2 = ...

# Define dependency: t1 before t2
# Your code here`,
      pt: `# Suponha t1 e t2 já definidos
# t1 = ...
# t2 = ...

# Defina a dependência: t1 antes de t2
# Seu código aqui`
    },
    solution: `t1 >> t2`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-af4',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'airflow',
    tags: ['airflow', 'xcom', 'communication'],
    interviewFrequency: 'medium',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Airflow: XComs',
      en: 'Airflow: XComs',
      pt: 'Airflow: XComs'
    },
    description: {
      es: 'Pasá un valor de una tarea a otra usando XComs (push y pull).',
      en: 'Pass a value from one task to another using XComs (push and pull).',
      pt: 'Passe um valor de uma tarefa para outra usando XComs (push e pull).'
    },
    theory: {
      es: `**XComs (Cross Communications):**

Mecanismo para compartir pequeños datos entre tareas.

\`\`\`python
# Push (en t1)
def push_func(ti):
    ti.xcom_push(key='mi_valor', value=100)
    # O simplemente return 100 (guarda en return_value)

# Pull (en t2)
def pull_func(ti):
    valor = ti.xcom_pull(key='mi_valor', task_ids='t1')
    print(valor)
\`\`\`

**Nota:** No usar para pasar DataFrames enteros (usar S3/GCS para eso).`,
      en: `**XComs (Cross Communications):**

Mechanism to share small data between tasks.

\`\`\`python
# Push (in t1)
def push_func(ti):
    ti.xcom_push(key='my_value', value=100)
    # Or simply return 100 (saves in return_value)

# Pull (in t2)
def pull_func(ti):
    value = ti.xcom_pull(key='my_value', task_ids='t1')
    print(value)
\`\`\`

**Note:** Do not use to pass full DataFrames (use S3/GCS for that).`,
      pt: `**XComs (Cross Communications):**

Mecanismo para compartilhar pequenos dados entre tarefas.

\`\`\`python
# Push (em t1)
def push_func(ti):
    ti.xcom_push(key='meu_valor', value=100)
    # Ou simplesmente return 100 (salva em return_value)

# Pull (em t2)
def pull_func(ti):
    valor = ti.xcom_pull(key='meu_valor', task_ids='t1')
    print(valor)
\`\`\`

**Nota:** Não usar para passar DataFrames inteiros (usar S3/GCS para isso).`
    },
    realWorldExample: {
      es: 'Pasar rutas de archivos, fechas de corte o métricas de validación.',
      en: 'Pass file paths, cutoff dates, or validation metrics.',
      pt: 'Passar caminhos de arquivos, datas de corte ou métricas de validação.'
    },
    hint: {
      es: 'Usá ti.xcom_push() y ti.xcom_pull()',
      en: 'Use ti.xcom_push() and ti.xcom_pull()',
      pt: 'Use ti.xcom_push() e ti.xcom_pull()'
    },
    
    starterCode: {
      es: `def sender(ti):
    # Enviá el valor "datos_listos" con key "status"
    pass

def receiver(ti):
    # Recibí el valor de la task 'sender_task'
    pass
    
# Solo implementá las funciones`,
      en: `def sender(ti):
    # Send value "data_ready" with key "status"
    pass

def receiver(ti):
    # Receive value from task 'sender_task'
    pass
    
# Only implement functions`,
      pt: `def sender(ti):
    # Envie o valor "dados_prontos" com key "status"
    pass

def receiver(ti):
    # Receba o valor da task 'sender_task'
    pass
    
# Apenas implemente as funções`
    },
    solution: `def sender(ti):
    ti.xcom_push(key='status', value='datos_listos')

def receiver(ti):
    status = ti.xcom_pull(key='status', task_ids='sender_task')
    print(status)`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-af5',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'airflow',
    tags: ['airflow', 'catchup', 'backfill'],
    interviewFrequency: 'low',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Airflow: Catchup y Backfill',
      en: 'Airflow: Catchup and Backfill',
      pt: 'Airflow: Catchup e Backfill'
    },
    description: {
      es: '¿Cómo evitar que Airflow ejecute todas las fechas pasadas al activar un DAG?',
      en: 'How to prevent Airflow from running all past dates when activating a DAG?',
      pt: 'Como evitar que o Airflow execute todas as datas passadas ao ativar um DAG?'
    },
    theory: {
      es: `**Catchup:**

Por defecto, Airflow intenta ejecutar ("catchup") todas las ejecuciones perdidas desde \`start_date\` hasta hoy.

Para evitarlo:
\`\`\`python
dag = DAG(..., catchup=False)
\`\`\`

**Backfill:** Es el proceso manual de correr fechas pasadas.
\`airflow dags backfill -s 2023-01-01 -e 2023-01-10 mi_dag\``,
      en: `**Catchup:**

By default, Airflow tries to execute ("catchup") all missed runs from \`start_date\` to today.

To avoid it:
\`\`\`python
dag = DAG(..., catchup=False)
\`\`\`

**Backfill:** Is the manual process of running past dates.
\`airflow dags backfill -s 2023-01-01 -e 2023-01-10 my_dag\``,
      pt: `**Catchup:**

Por padrão, o Airflow tenta executar ("catchup") todas as execuções perdidas desde \`start_date\` até hoje.

Para evitá-lo:
\`\`\`python
dag = DAG(..., catchup=False)
\`\`\`

**Backfill:** É o processo manual de rodar datas passadas.
\`airflow dags backfill -s 2023-01-01 -e 2023-01-10 meu_dag\``
    },
    realWorldExample: {
      es: 'Deployar un DAG nuevo con start_date de hace un año sin colapsar el servidor.',
      en: 'Deploy a new DAG with start_date from a year ago without crashing the server.',
      pt: 'Deployar um DAG novo com start_date de um ano atrás sem colapsar o servidor.'
    },
    hint: {
      es: 'Poné catchup=False en la definición del DAG',
      en: 'Set catchup=False in DAG definition',
      pt: 'Coloque catchup=False na definição do DAG'
    },
    
    starterCode: {
      es: `# Escribí solo el parámetro que falta
with DAG(
    'mi_dag',
    start_date=datetime(2020, 1, 1),
    # ... falta algo acá ...
) as dag:
    pass`,
      en: `# Write only the missing parameter
with DAG(
    'my_dag',
    start_date=datetime(2020, 1, 1),
    # ... missing something here ...
) as dag:
    pass`,
      pt: `# Escreva apenas o parâmetro que falta
with DAG(
    'meu_dag',
    start_date=datetime(2020, 1, 1),
    # ... falta algo aqui ...
) as dag:
    pass`
    },
    solution: `catchup=False`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
];

export default PYTHON_AIRFLOW;
