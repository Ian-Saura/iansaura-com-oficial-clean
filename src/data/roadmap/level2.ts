import { RoadmapLevel } from '../../types/members';

export const level2: RoadmapLevel = {
    level: 2,
    title: {
      es: 'Nivel 2: Convertite en Semi-Senior (SSR)',
      en: 'Level 2: Become a Semi-Senior (SSR)',
      pt: 'Nível 2: Torne-se Semi-Sênior (SSR)'
    },
    subtitle: {
      es: 'El salto de calidad: Spark, Airflow, Cloud y Arquitectura',
      en: 'The quality leap: Spark, Airflow, Cloud and Architecture',
      pt: 'O salto de qualidade: Spark, Airflow, Cloud e Arquitetura'
    },
    description: {
      es: 'Ya no sos Junior. Ya sabés SQL y Python básico. Ahora toca aprender las herramientas que usan las empresas grandes para manejar Big Data real. Acá es donde la mayoría se estanca, pero vos no. Vamos a ver Spark, orquestación, Cloud en serio y cómo diseñar pipelines robustos.',
      en: 'You are no longer a Junior. You already know SQL and basic Python. Now it\'s time to learn the tools that big companies use to handle real Big Data. This is where most people get stuck, but not you. We are going to see Spark, orchestration, serious Cloud and how to design robust pipelines.',
      pt: 'Você não é mais Júnior. Você já sabe SQL e Python básico. Agora é hora de aprender as ferramentas que as grandes empresas usam para lidar com Big Data real. É aqui que a maioria estagna, mas você não. Vamos ver Spark, orquestração, Cloud a sério e como projetar pipelines robustos.'
    },
    badge: '🚀 SSR',
    color: 'blue',
    phases: [
      {
        id: 'l2-intro',
        title: {
          es: 'Introducción: El Mindset SSR',
          en: 'Introduction: The SSR Mindset',
          pt: 'Introdução: O Mindset SSR'
        },
        emoji: '🧠',
        sections: [
          {
            id: 'l2-mindset',
            title: {
              es: '1️⃣ ¿Qué define a un SSR?',
              en: '1️⃣ What defines an SSR?',
              pt: '1️⃣ O que define um SSR?'
            },
            description: {
              es: 'Un Junior pregunta "¿cómo hago esto?". Un SSR pregunta "¿cuál es la mejor forma de hacer esto para que no explote en 6 meses?".',
              en: 'A Junior asks "how do I do this?". An SSR asks "what is the best way to do this so it doesn\'t explode in 6 months?".',
              pt: 'Um Júnior pergunta "como faço isso?". Um SSR pergunta "qual é a melhor maneira de fazer isso para que não exploda em 6 meses?".'
            },
            steps: [
              { 
                id: 'l2-min-1', 
                text: {
                  es: 'Entiendo que mi código debe ser mantenible, no solo funcionar',
                  en: 'I understand that my code must be maintainable, not just functional',
                  pt: 'Entendo que meu código deve ser sustentável, não apenas funcionar'
                },
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Mantenibilidad > Velocidad.
  
  Preguntas de un SSR antes de entregar:
  - ¿Alguien más va a entender esto en 3 meses?
  - ¿Qué pasa si los datos vienen duplicados?
  - ¿Qué pasa si la API se cae?
  - ¿Tengo logs para saber qué pasó si falla?`,
                  en: `Maintainability > Speed.
  
  SSR questions before delivering:
  - Will someone else understand this in 3 months?
  - What happens if data is duplicated?
  - What happens if the API goes down?
  - Do I have logs to know what happened if it fails?`,
                  pt: `Manutenibilidade > Velocidade.
  
  Perguntas de um SSR antes de entregar:
  - Alguém mais vai entender isso em 3 meses?
  - O que acontece se os dados vierem duplicados?
  - O que acontece se a API cair?
  - Tenho logs para saber o que aconteceu se falhar?`
                }
              },
              { 
                id: 'l2-min-2', 
                text: {
                  es: 'Sé buscar soluciones antes de preguntar (Google, Docs, StackOverflow)',
                  en: 'I know how to search for solutions before asking (Google, Docs, StackOverflow)',
                  pt: 'Sei buscar soluções antes de perguntar (Google, Docs, StackOverflow)'
                },
                type: 'task', 
                checkbox: true 
              },
              { 
                id: 'l2-min-3', 
                text: {
                  es: 'Empiezo a pensar en "Sistemas" y no solo en "Scripts"',
                  en: 'I start thinking in "Systems" and not just in "Scripts"',
                  pt: 'Começo a pensar em "Sistemas" e não apenas em "Scripts"'
                },
                type: 'task', 
                checkbox: true 
              },
            ]
          }
        ]
      },
      {
        id: 'l2-prerequisitos',
        title: {
          es: 'Verificación: ¿Estás listo para Nivel 2?',
          en: 'Verification: Are you ready for Level 2?',
          pt: 'Verificação: Você está pronto para o Nível 2?'
        },
        emoji: '✅',
        sections: [
          {
            id: 'l2-prereq-check',
            title: {
              es: '📋 Checklist del Nivel 1',
              en: '📋 Level 1 Checklist',
              pt: '📋 Checklist do Nível 1'
            },
            description: {
              es: 'Antes de seguir, asegurate de haber completado el Nivel 1. Si te saltaste algo, volvé y completalo. No hay atajos.',
              en: 'Before continuing, make sure you completed Level 1. If you skipped something, go back and complete it. There are no shortcuts.',
              pt: 'Antes de continuar, certifique-se de ter completado o Nível 1. Se pulou algo, volte e complete. Não há atalhos.'
            },
            steps: [
              { 
                id: 'l2-pre-1', 
                text: { es: '✅ Completé el Proyecto ETL con Python', en: '✅ Completed ETL Project with Python', pt: '✅ Completei o Projeto ETL com Python' },
                type: 'task', 
                checkbox: true,
                resource: { type: 'project', label: { es: 'Proyecto ETL', en: 'ETL Project', pt: 'Projeto ETL' }, projectId: 'p1-etl-python' }
              },
              { 
                id: 'l2-pre-2', 
                text: { es: '✅ Completé el Proyecto SQL Logs', en: '✅ Completed SQL Logs Project', pt: '✅ Completei o Projeto SQL Logs' },
                type: 'task', 
                checkbox: true,
                resource: { type: 'project', label: { es: 'Proyecto SQL', en: 'SQL Project', pt: 'Projeto SQL' }, projectId: 'p2-sql-logs' }
              },
              { 
                id: 'l2-pre-3', 
                text: { es: '✅ Completé el Proyecto API Pipeline', en: '✅ Completed API Pipeline Project', pt: '✅ Completei o Projeto API Pipeline' },
                type: 'task', 
                checkbox: true,
                resource: { type: 'project', label: { es: 'Proyecto API', en: 'API Project', pt: 'Projeto API' }, projectId: 'p3-api-pipeline' }
              },
              { 
                id: 'l2-pre-4', 
                text: { es: '✅ Tengo Docker instalado y funcionando', en: '✅ I have Docker installed and working', pt: '✅ Tenho Docker instalado e funcionando' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l2-pre-5', 
                text: { es: '✅ Puedo escribir Window Functions en SQL', en: '✅ I can write Window Functions in SQL', pt: '✅ Consigo escrever Window Functions em SQL' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l2-pre-6', 
                text: { es: '✅ Tengo al menos 3 proyectos en mi GitHub', en: '✅ I have at least 3 projects on my GitHub', pt: '✅ Tenho pelo menos 3 projetos no meu GitHub' },
                type: 'task', 
                checkbox: true
              },
            ]
          },
          {
            id: 'l2-prereq-skills',
            title: {
              es: '🎯 Skills que deberías dominar',
              en: '🎯 Skills you should master',
              pt: '🎯 Skills que você deveria dominar'
            },
            description: {
              es: 'Si alguno de estos puntos no te sale naturalmente, volvé al Nivel 1 y practicá más.',
              en: 'If any of these points don\'t come naturally, go back to Level 1 and practice more.',
              pt: 'Se algum desses pontos não sai naturalmente, volte ao Nível 1 e pratique mais.'
            },
            steps: [
              { 
                id: 'l2-skill-1', 
                text: { es: '🐼 Pandas: filtrar, groupby, merge sin googlear', en: '🐼 Pandas: filter, groupby, merge without googling', pt: '🐼 Pandas: filtrar, groupby, merge sem pesquisar' },
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Deberías poder escribir esto de memoria:

df[df["precio"] > 100]                    # Filtrar
df.groupby("categoria")["ventas"].sum()   # Agrupar
pd.merge(df1, df2, on="id", how="left")   # Combinar

Si tenés que googlear esto, practicá más en Nivel 1.`,
                  en: `You should be able to write this from memory:

df[df["price"] > 100]                     # Filter
df.groupby("category")["sales"].sum()     # Group
pd.merge(df1, df2, on="id", how="left")   # Combine

If you need to google this, practice more in Level 1.`,
                  pt: `Você deveria conseguir escrever isso de memória:

df[df["preco"] > 100]                     # Filtrar
df.groupby("categoria")["vendas"].sum()   # Agrupar
pd.merge(df1, df2, on="id", how="left")   # Combinar

Se precisa pesquisar isso, pratique mais no Nível 1.`
                }
              },
              { 
                id: 'l2-skill-2', 
                text: { es: '🗃️ SQL: JOINs, CTEs, Window Functions', en: '🗃️ SQL: JOINs, CTEs, Window Functions', pt: '🗃️ SQL: JOINs, CTEs, Window Functions' },
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Deberías poder escribir:

WITH ventas_cliente AS (
    SELECT cliente_id, SUM(total) as total
    FROM ordenes GROUP BY cliente_id
)
SELECT c.nombre, v.total,
       RANK() OVER (ORDER BY v.total DESC) as ranking
FROM clientes c
JOIN ventas_cliente v ON c.id = v.cliente_id`,
                  en: `You should be able to write:

WITH customer_sales AS (
    SELECT customer_id, SUM(total) as total
    FROM orders GROUP BY customer_id
)
SELECT c.name, v.total,
       RANK() OVER (ORDER BY v.total DESC) as ranking
FROM customers c
JOIN customer_sales v ON c.id = v.customer_id`,
                  pt: `Você deveria conseguir escrever:

WITH vendas_cliente AS (
    SELECT cliente_id, SUM(total) as total
    FROM pedidos GROUP BY cliente_id
)
SELECT c.nome, v.total,
       RANK() OVER (ORDER BY v.total DESC) as ranking
FROM clientes c
JOIN vendas_cliente v ON c.id = v.cliente_id`
                }
              },
              { 
                id: 'l2-skill-3', 
                text: { es: '🐳 Docker: crear imagen, correr container', en: '🐳 Docker: create image, run container', pt: '🐳 Docker: criar imagem, rodar container' },
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Deberías poder:

docker build -t mi-app .
docker run -p 8080:8080 mi-app
docker ps
docker logs <container_id>

Y entender qué hace cada comando.`,
                  en: `You should be able to:

docker build -t my-app .
docker run -p 8080:8080 my-app
docker ps
docker logs <container_id>

And understand what each command does.`,
                  pt: `Você deveria conseguir:

docker build -t minha-app .
docker run -p 8080:8080 minha-app
docker ps
docker logs <container_id>

E entender o que cada comando faz.`
                }
              },
              { 
                id: 'l2-skill-4', 
                text: { es: '🔌 APIs: consumir con requests, manejar JSON', en: '🔌 APIs: consume with requests, handle JSON', pt: '🔌 APIs: consumir com requests, lidar com JSON' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l2-skill-5', 
                text: { es: '🌿 Git: branches, merge, resolver conflictos', en: '🌿 Git: branches, merge, resolve conflicts', pt: '🌿 Git: branches, merge, resolver conflitos' },
                type: 'task', 
                checkbox: true
              },
            ],
            stopTitle: { es: '🚀 ¿Todo marcado?', en: '🚀 Everything checked?', pt: '🚀 Tudo marcado?' },
            stopContent: {
              es: 'Si marcaste todo, estás listo para el Nivel 2. Vas a aprender Spark, Airflow, Cloud en serio, y a diseñar sistemas que escalan. Vamos.',
              en: 'If you checked everything, you are ready for Level 2. You will learn Spark, Airflow, serious Cloud, and how to design systems that scale. Let\'s go.',
              pt: 'Se você marcou tudo, está pronto para o Nível 2. Você vai aprender Spark, Airflow, Cloud a sério e a projetar sistemas que escalam. Vamos lá.'
            }
          }
        ]
      },
      {
        id: 'l2-procesamiento',
        title: {
          es: 'Fase 1: Procesamiento Distribuido (Spark)',
          en: 'Phase 1: Distributed Processing (Spark)',
          pt: 'Fase 1: Processamento Distribuído (Spark)'
        },
        emoji: '⚡',
        sections: [
          {
            id: 'l2-spark-intro',
            title: {
              es: '1️⃣ ¿Por qué Spark?',
              en: '1️⃣ Why Spark?',
              pt: '1️⃣ Por que Spark?'
            },
            description: {
              es: 'Pandas explota con 10GB. Spark se ríe con 100TB. Es el estándar de facto para procesamiento masivo.',
              en: 'Pandas explodes with 10GB. Spark laughs with 100TB. It is the de facto standard for massive processing.',
              pt: 'Pandas explode com 10GB. Spark ri com 100TB. É o padrão de fato para processamento massivo.'
            },
            steps: [
              { id: 'l2-spk-1', text: { es: 'Entiendo la diferencia entre Pandas (Single Node) y Spark (Distributed)', pt: 'Entendo a diferença entre Pandas (Single Node) e Spark (Distributed)' }, type: 'task', checkbox: true },
              { id: 'l2-spk-2', text: { es: 'Sé qué es un RDD (aunque use DataFrames)', pt: 'Sei o que é um RDD (embora use DataFrames)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Spark Architecture', link: 'https://spark.apache.org/docs/latest/cluster-overview.html' } },
              { 
                id: 'l2-spk-3', 
                text: { es: 'Entiendo Lazy Evaluation y Transformations vs Actions', pt: 'Entendo Lazy Evaluation e Transformations vs Actions' },
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Spark no hace NADA hasta que le pedís un resultado (Action).
  
  Transformations (Lazy):
  - .filter()
  - .select()
  - .groupBy()
  
  Actions (Trigger):
  - .show()
  - .count()
  - .write()
  
  💡 Por esto Spark puede optimizar tu query antes de ejecutarla.`,
                  pt: `Spark não faz NADA até que você peça um resultado (Action).
  
  Transformations (Lazy):
  - .filter()
  - .select()
  - .groupBy()
  
  Actions (Trigger):
  - .show()
  - .count()
  - .write()
  
  💡 Por isso o Spark pode otimizar sua query antes de executá-la.`
                }
              },
            ]
          },
          {
            id: 'l2-pyspark',
            title: { es: '2️⃣ PySpark en la Práctica', en: '2️⃣ PySpark in Practice', pt: '2️⃣ PySpark na Prática' },
            description: { es: 'La API que vas a usar el 99% del tiempo. Olvidate de Scala por ahora.', pt: 'A API que você vai usar 99% do tempo. Esqueça Scala por enquanto.' },
            steps: [
              { id: 'l2-pys-1', text: { es: 'Instalé PySpark localmente o uso Databricks Community Edition', pt: 'Instalei PySpark localmente ou uso Databricks Community Edition' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Databricks CE', link: 'https://community.cloud.databricks.com/login.html' } },
              { id: 'l2-pys-2', text: { es: 'Puedo leer CSV, Parquet y JSON con PySpark', pt: 'Posso ler CSV, Parquet e JSON com PySpark' }, type: 'task', checkbox: true },
              { id: 'l2-pys-3', text: { es: 'Sé hacer .filter(), .select(), .withColumn()', pt: 'Sei fazer .filter(), .select(), .withColumn()' }, type: 'task', checkbox: true },
              { id: 'l2-pys-4', text: { es: 'Sé hacer joins y aggregations (.groupBy)', pt: 'Sei fazer joins e aggregations (.groupBy)' }, type: 'task', checkbox: true },
              { id: 'l2-pys-5', text: { es: 'Sé usar Spark SQL (spark.sql("SELECT..."))', pt: 'Sei usar Spark SQL (spark.sql("SELECT..."))' }, type: 'task', checkbox: true },
              { id: 'l2-pys-6', text: { es: 'Entiendo por qué Parquet es mejor que CSV', pt: 'Entendo por que Parquet é melhor que CSV' }, type: 'task', checkbox: true },
              { id: 'l2-pys-7', text: { es: '🏋️ Completé ejercicios de PySpark (Basics) de la plataforma', pt: '🏋️ Completei exercícios de PySpark (Basics) da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'PySpark Basics', link: '/members?tab=ejercicios&category=python&subcategory=pyspark' } },
              { id: 'l2-pys-8', text: { es: '🏋️ Completé ejercicios de PySpark (ETL) de la plataforma', pt: '🏋️ Completei exercícios de PySpark (ETL) da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'PySpark ETL', link: '/members?tab=ejercicios&category=python&subcategory=pyspark' } },
            ],
            stopTitle: { es: '🚫 No te vuelvas loco optimizando', pt: '🚫 Não fique louco otimizando' },
            stopContent: { es: 'Al principio, escribí código que funcione. Después aprendemos a tunear particiones y memoria. Primero funcionalidad, después performance.', pt: 'No início, escreva código que funcione. Depois aprendemos a ajustar partições e memória. Primeiro funcionalidade, depois performance.' }
          }
        ]
      },
      {
        id: 'l2-orquestacion',
        title: { es: 'Fase 2: Orquestación (Airflow)', en: 'Phase 2: Orchestration (Airflow)', pt: 'Fase 2: Orquestração (Airflow)' },
        emoji: '🎼',
        sections: [
          {
            id: 'l2-airflow-concepts',
            title: { es: '1️⃣ Conceptos de Airflow', en: '1️⃣ Airflow Concepts', pt: '1️⃣ Conceitos de Airflow' },
            description: { es: 'Tus scripts de Python no pueden correr "a mano". Necesitás un director de orquesta.', pt: 'Seus scripts Python não podem rodar "na mão". Você precisa de um maestro.' },
            steps: [
              { id: 'l2-air-1', text: { es: 'Entiendo qué es un DAG (Directed Acyclic Graph)', pt: 'Entendo o que é um DAG (Directed Acyclic Graph)' }, type: 'task', checkbox: true },
              { id: 'l2-air-2', text: { es: 'Sé qué son Operators, Tasks y Sensors', pt: 'Sei o que são Operators, Tasks e Sensors' }, type: 'task', checkbox: true },
              { 
                id: 'l2-air-3', 
                text: { es: 'Entiendo el Scheduler y el Executor', pt: 'Entendo o Scheduler e o Executor' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Scheduler: "Che, ya son las 9am, hay que correr el DAG de ventas".
  Executor: "Dale, ahí le digo a los workers que laburen".
  Webserver: La UI que ves.`,
                  pt: `Scheduler: "Ei, já são 9h, tem que rodar o DAG de vendas".
  Executor: "Beleza, vou avisar os workers para trabalharem".
  Webserver: A UI que você vê.`
                }
              },
              { id: 'l2-air-4', text: { es: 'Entiendo Idempotencia (CRÍTICO)', pt: 'Entendo Idempotência (CRÍTICO)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Idempotency in Data', link: 'https://medium.com/@maximebeauchemin/functional-data-engineering-a-modern-paradigm-for-batch-data-processing-2327ec32c42a' } },
            ]
          },
          {
            id: 'l2-airflow-practica',
            title: { es: '2️⃣ Airflow Hands-on', en: '2️⃣ Airflow Hands-on', pt: '2️⃣ Airflow Hands-on' },
            description: { es: 'Hora de levantar tu propio Airflow.', pt: 'Hora de levantar seu próprio Airflow.' },
            steps: [
              { id: 'l2-air-p1', text: { es: 'Levanté Airflow con Docker Compose', pt: 'Levantei Airflow com Docker Compose' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Airflow Docker', link: 'https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html' } },
              { id: 'l2-air-p2', text: { es: 'Creé mi primer DAG "Hola Mundo" (BashOperator)', pt: 'Criei meu primeiro DAG "Olá Mundo" (BashOperator)' }, type: 'task', checkbox: true },
              { id: 'l2-air-p3', text: { es: 'Creé un DAG con PythonOperator', pt: 'Criei um DAG com PythonOperator' }, type: 'task', checkbox: true },
              { id: 'l2-air-p4', text: { es: 'Usé Cron Expressions para scedulear (0 0 * * *)', pt: 'Usei Cron Expressions para agendar (0 0 * * *)' }, type: 'task', checkbox: true },
              { 
                id: 'l2-air-p5', 
                text: { es: 'Entiendo catchup y backfill', pt: 'Entendo catchup e backfill' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `catchup=True (default): "Uy, estuve apagado 5 días? Corro los 5 días ahora mismo".
  Peligroso si no tenés cuidado. Usualmente ponemos catchup=False en dev.`,
                  pt: `catchup=True (default): "Ué, fiquei desligado 5 dias? Rodo os 5 dias agora mesmo".
  Perigoso se não tiver cuidado. Normalmente colocamos catchup=False em dev.`
                }
              },
              { id: 'l2-air-p6', text: { es: '🏋️ Completé ejercicios de Airflow de la plataforma', pt: '🏋️ Completei exercícios de Airflow da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'Airflow Exercises', link: '/members?tab=ejercicios&category=python&subcategory=airflow' } },
            ]
          }
        ]
      },
      {
        id: 'l2-arquitectura',
        title: { es: 'Fase 3: Arquitectura de Datos', en: 'Phase 3: Data Architecture', pt: 'Fase 3: Arquitetura de Dados' },
        emoji: '🏗️',
        sections: [
          {
            id: 'l2-data-lake',
            title: { es: '1️⃣ Data Lake vs Data Warehouse', en: '1️⃣ Data Lake vs Data Warehouse', pt: '1️⃣ Data Lake vs Data Warehouse' },
            description: { es: 'La eterna discusión. Necesitás entender cuándo usar cuál (y por qué usamos los dos).', pt: 'A eterna discussão. Você precisa entender quando usar qual (e por que usamos os dois).' },
            steps: [
              { 
                id: 'l2-arch-1', 
                text: { es: 'Entiendo Data Lake (S3, GCS) - Schema on Read', pt: 'Entendo Data Lake (S3, GCS) - Schema on Read' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Data Lake:
  - Guardo TODO crudo (raw).
  - Barato.
  - Flexible (Schema on Read).
  - Ej: S3, ADLS, GCS.`,
                  pt: `Data Lake:
  - Guardo TUDO cru (raw).
  - Barato.
  - Flexível (Schema on Read).
  - Ex: S3, ADLS, GCS.`
                }
              },
              { 
                id: 'l2-arch-2', 
                text: { es: 'Entiendo Data Warehouse (Snowflake, BigQuery) - Schema on Write', pt: 'Entendo Data Warehouse (Snowflake, BigQuery) - Schema on Write' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Data Warehouse:
  - Datos limpios y estructurados.
  - Optimizado para SQL rápido.
  - Schema on Write (definís estructura antes de cargar).
  - Ej: Snowflake, Redshift, BigQuery.`,
                  pt: `Data Warehouse:
  - Dados limpos e estruturados.
  - Otimizado para SQL rápido.
  - Schema on Write (define estrutura antes de carregar).
  - Ex: Snowflake, Redshift, BigQuery.`
                }
              },
              { id: 'l2-arch-3', text: { es: 'Entiendo el concepto de Lakehouse (Lo mejor de los dos)', pt: 'Entendo o conceito de Lakehouse (O melhor dos dois)' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-capas',
            title: { es: '2️⃣ Arquitectura por Capas (Medallion)', en: '2️⃣ Layered Architecture (Medallion)', pt: '2️⃣ Arquitetura em Camadas (Medallion)' },
            description: { es: 'Bronze, Silver, Gold. El estándar de la industria.', pt: 'Bronze, Silver, Gold. O padrão da indústria.' },
            steps: [
              { 
                id: 'l2-med-1', 
                text: { es: 'Entiendo la capa Bronze (Raw)', pt: 'Entendo a camada Bronze (Raw)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Bronze / Raw:
  - Copia exacta de la fuente.
  - Sin limpiar.
  - Histórico completo.
  - Si rompo algo en silver, puedo reprocesar desde acá.`,
                  pt: `Bronze / Raw:
  - Cópia exata da fonte.
  - Sem limpeza.
  - Histórico completo.
  - Se quebro algo em silver, posso reprocessar daqui.`
                }
              },
              { 
                id: 'l2-med-2', 
                text: { es: 'Entiendo la capa Silver (Clean/Enriched)', pt: 'Entendo a camada Silver (Clean/Enriched)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Silver:
  - Datos limpios (types correctos, sin nulls feos).
  - Deduplicados.
  - Joins básicos.
  - "Single source of truth".`,
                  pt: `Silver:
  - Dados limpos (types corretos, sem nulls feios).
  - Deduplicados.
  - Joins básicos.
  - "Single source of truth".`
                }
              },
              { 
                id: 'l2-med-3', 
                text: { es: 'Entiendo la capa Gold (Aggregated/Business)', pt: 'Entendo a camada Gold (Aggregated/Business)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Gold:
  - Agregaciones para negocio (KPIs).
  - Modelado dimensional (Star Schema).
  - Listo para PowerBI/Tableau.`,
                  pt: `Gold:
  - Agregações para negócio (KPIs).
  - Modelagem dimensional (Star Schema).
  - Pronto para PowerBI/Tableau.`
                }
              },
            ]
          },
          {
            id: 'l2-modelado',
            title: { es: '3️⃣ Modelado Dimensional (Kimball)', en: '3️⃣ Dimensional Modeling (Kimball)', pt: '3️⃣ Modelagem Dimensional (Kimball)' },
            description: { es: 'Si metés todo en una tabla gigante, vas a sufrir. Aprendé a modelar.', pt: 'Se colocar tudo em uma tabela gigante, vai sofrer. Aprenda a modelar.' },
            steps: [
              { id: 'l2-dim-1', text: { es: 'Leí los primeros 4 capítulos de "The Data Warehouse Toolkit" (o resúmenes)', pt: 'Li os primeiros 4 capítulos de "The Data Warehouse Toolkit" (ou resumos)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Kimball Summary', link: 'https://www.holistics.io/blog/kimball-dimensional-modeling-techniques/' } },
              { 
                id: 'l2-dim-2', 
                text: { es: 'Entiendo Fact Tables vs Dimension Tables', pt: 'Entendo Fact Tables vs Dimension Tables' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Facts: Eventos, números, transacciones (Orders, Clicks, Pagos).
  Dimensions: Contexto, descripciones (Users, Products, Fechas).
  
  Fact table tiene FKs a Dimensions.`,
                  pt: `Facts: Eventos, números, transações (Orders, Clicks, Pagamentos).
  Dimensions: Contexto, descrições (Users, Products, Datas).
  
  Fact table tem FKs para Dimensions.`
                }
              },
              { id: 'l2-dim-3', text: { es: 'Entiendo Star Schema vs Snowflake Schema', pt: 'Entendo Star Schema vs Snowflake Schema' }, type: 'task', checkbox: true },
              { 
                id: 'l2-dim-4', 
                text: { es: 'Entiendo SCD (Slowly Changing Dimensions) Tipo 1 y 2', pt: 'Entendo SCD (Slowly Changing Dimensions) Tipo 1 e 2' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `SCD Tipo 1: Sobreescribo el valor viejo (pierdo historia).
  SCD Tipo 2: Creo nueva fila con vigencia (mantengo historia). CRÍTICO para DE.`,
                  pt: `SCD Tipo 1: Sobrescrevo o valor antigo (perco histórico).
  SCD Tipo 2: Crio nova linha com vigência (mantenho histórico). CRÍTICO para DE.`
                }
              },
            ]
          },
          {
            id: 'l2-calidad',
            title: { es: '4️⃣ Data Quality: Lo que Nadie te Enseña', en: '4️⃣ Data Quality: What Nobody Teaches You', pt: '4️⃣ Data Quality: O que Ninguém te Ensina' },
            description: { es: 'El 80% de tu tiempo como DE va a ser lidiando con datos sucios. Aprendé a validar datos automáticamente.', pt: '80% do seu tempo como DE será lidando com dados sujos. Aprenda a validar dados automaticamente.' },
            steps: [
              { 
                id: 'l2-cal-1', 
                text: { es: 'Entiendo qué es Data Quality y sus dimensiones', pt: 'Entendo o que é Data Quality e suas dimensões' }, 
                type: 'task', 
                checkbox: true, 
                resource: { type: 'external', label: 'Data Quality Dimensions', link: 'https://www.montecarlodata.com/blog-what-is-data-quality/' },
                explanation: {
                  es: `Data Quality = qué tan buenos son tus datos para su propósito.
  
  📊 Dimensiones clave:
  - Accuracy: ¿Son correctos los valores?
  - Completeness: ¿Faltan datos?
  - Consistency: ¿Los datos coinciden entre sistemas?
  - Timeliness: ¿Están actualizados?
  - Uniqueness: ¿Hay duplicados?
  - Validity: ¿Cumplen el formato esperado?
  
  💡 En la práctica: El 80% de tu tiempo es limpiar datos.`,
                  pt: `Data Quality = quão bons são seus dados para seu propósito.
  
  📊 Dimensões chave:
  - Accuracy: Os valores estão corretos?
  - Completeness: Faltam dados?
  - Consistency: Os dados coincidem entre sistemas?
  - Timeliness: Estão atualizados?
  - Uniqueness: Há duplicados?
  - Validity: Seguem o formato esperado?
  
  💡 Na prática: 80% do seu tempo é limpar dados.`
                }
              },
              { 
                id: 'l2-cal-2', 
                text: { es: 'Usé Great Expectations para validar un dataset', pt: 'Usei Great Expectations para validar um dataset' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Great Expectations = framework para tests de datos.
  
  📝 Ejemplo:
  expect_column_values_to_not_be_null("email")
  expect_column_values_to_be_unique("user_id")
  expect_column_values_to_be_between("age", 0, 120)
  
  💡 Lo integrás en tu pipeline:
  - Si los datos no pasan → el pipeline falla
  - Documentación automática
  - Alertas cuando algo cambia`,
                  pt: `Great Expectations = framework para testes de dados.
  
  📝 Exemplo:
  expect_column_values_to_not_be_null("email")
  expect_column_values_to_be_unique("user_id")
  expect_column_values_to_be_between("age", 0, 120)
  
  💡 Você integra no seu pipeline:
  - Se os dados não passam → o pipeline falha
  - Documentação automática
  - Alertas quando algo muda`
                }
              },
              { id: 'l2-cal-3', text: { es: 'Completé proyecto "Data Quality con Great Expectations"', pt: 'Completei projeto "Data Quality com Great Expectations"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p7-data-quality' } },
              { 
                id: 'l2-cal-4', 
                text: { es: 'Implementé tests de calidad en un pipeline real', pt: 'Implementei testes de qualidade em um pipeline real' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Tests de calidad en producción:
  
  📍 Dónde ponerlos:
  - Después de ingestar datos (raw)
  - Después de transformar (staging)
  - Antes de cargar a producción (final)
  
  💡 Qué testear:
  - Nulls en columnas críticas
  - Rangos válidos (fechas, montos)
  - Cardinalidad esperada
  - Freshness (datos no viejos)`,
                  pt: `Testes de qualidade em produção:
  
  📍 Onde colocar:
  - Depois de ingerir dados (raw)
  - Depois de transformar (staging)
  - Antes de carregar em produção (final)
  
  💡 O que testar:
  - Nulls em colunas críticas
  - Intervalos válidos (datas, valores)
  - Cardinalidade esperada
  - Freshness (dados não velhos)`
                }
              },
            ]
          },
          {
            id: 'l2-dbt-avanzado',
            title: { es: '5️⃣ dbt Avanzado', en: '5️⃣ Advanced dbt', pt: '5️⃣ dbt Avançado' },
            description: { es: 'Ya hiciste dbt Fundamentals. Ahora llevalo al siguiente nivel.', pt: 'Já fez dbt Fundamentals. Agora leve para o próximo nível.' },
            steps: [
              { id: 'l2-dbt-0', text: { es: '🏋️ Completé ejercicios de dbt de la plataforma', pt: '🏋️ Completei exercícios de dbt da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'Ejercicios dbt', link: '/members?tab=ejercicios&category=sql&subcategory=dbt' } },
              { id: 'l2-dbt-1', text: { es: 'Completé proyecto "Proyecto dbt Completo"', pt: 'Completei projeto "Projeto dbt Completo"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p8-dbt-project' } },
              { 
                id: 'l2-dbt-2', 
                text: { es: 'Entiendo staging → intermediate → marts', pt: 'Entendo staging → intermediate → marts' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Patrón de capas en dbt:
  
  📁 staging/: 1 modelo por source, limpieza básica
  SELECT
    id AS customer_id,
    LOWER(email) AS email
  FROM {{ source('raw', 'customers') }}
  
  📁 intermediate/: Joins y lógica de negocio
  SELECT ... FROM {{ ref('stg_customers') }}
  JOIN {{ ref('stg_orders') }}
  
  📁 marts/: Tablas finales para consumo
  - mart_sales, mart_customers, mart_products
  - Optimizadas para dashboards/reporting`,
                  pt: `Padrão de camadas em dbt:
  
  📁 staging/: 1 modelo por source, limpeza básica
  SELECT
    id AS customer_id,
    LOWER(email) AS email
  FROM {{ source('raw', 'customers') }}
  
  📁 intermediate/: Joins e lógica de negócio
  SELECT ... FROM {{ ref('stg_customers') }}
  JOIN {{ ref('stg_orders') }}
  
  📁 marts/: Tabelas finais para consumo
  - mart_sales, mart_customers, mart_products
  - Otimizadas para dashboards/reporting`
                }
              },
              { 
                id: 'l2-dbt-3', 
                text: { es: 'Sé crear tests custom en dbt', pt: 'Sei criar testes custom em dbt' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Tests custom para validaciones específicas:
  
  📁 tests/assert_total_positive.sql:
  SELECT * FROM {{ ref('orders') }}
  WHERE total_amount < 0
  
  Si retorna filas → test falla.
  
  📁 macros/test_is_valid_email.sql:
  {% test is_valid_email(model, column_name) %}
  SELECT * FROM {{ model }}
  WHERE {{ column_name }} NOT LIKE '%@%.%'
  {% endtest %}`,
                  pt: `Testes custom para validações específicas:
  
  📁 tests/assert_total_positive.sql:
  SELECT * FROM {{ ref('orders') }}
  WHERE total_amount < 0
  
  Se retorna linhas → teste falha.
  
  📁 macros/test_is_valid_email.sql:
  {% test is_valid_email(model, column_name) %}
  SELECT * FROM {{ model }}
  WHERE {{ column_name }} NOT LIKE '%@%.%'
  {% endtest %}`
                }
              },
              { 
                id: 'l2-dbt-4', 
                text: { es: 'Usé snapshots para SCD Type 2', pt: 'Usei snapshots para SCD Type 2' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Snapshots = historial de cambios automático.
  
  📁 snapshots/customers_snapshot.sql:
  {% snapshot customers_snapshot %}
  {{
    config(
      unique_key='id',
      strategy='timestamp',
      updated_at='updated_at'
    )
  }}
  SELECT * FROM {{ source('raw', 'customers') }}
  {% endsnapshot %}
  
  Agrega automáticamente:
  - dbt_valid_from, dbt_valid_to
  - dbt_scd_id`,
                  pt: `Snapshots = histórico de mudanças automático.
  
  📁 snapshots/customers_snapshot.sql:
  {% snapshot customers_snapshot %}
  {{
    config(
      unique_key='id',
      strategy='timestamp',
      updated_at='updated_at'
    )
  }}
  SELECT * FROM {{ source('raw', 'customers') }}
  {% endsnapshot %}
  
  Adiciona automaticamente:
  - dbt_valid_from, dbt_valid_to
  - dbt_scd_id`
                }
              },
              { 
                id: 'l2-dbt-5', 
                text: { es: 'Generé documentación con dbt docs', pt: 'Gerei documentação com dbt docs' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `dbt genera documentación automática:
  
  dbt docs generate  # Genera el sitio
  dbt docs serve     # Lo abre en el browser
  
  Incluye:
  - Linaje de datos (qué depende de qué)
  - Descripción de tablas/columnas
  - Tests configurados
  - Stats de ejecución
  
  💡 Tip: Agregá descripciones en schema.yml`,
                  pt: `dbt gera documentação automática:
  
  dbt docs generate  # Gera o site
  dbt docs serve     # Abre no navegador
  
  Inclui:
  - Linhagem de dados (o que depende do quê)
  - Descrição de tabelas/colunas
  - Testes configurados
  - Stats de execução
  
  💡 Dica: Adicione descrições no schema.yml`
                }
              },
              { 
                id: 'l2-dbt-6', 
                text: { es: 'Entiendo modelos incrementales (append, merge, delete+insert)', pt: 'Entendo modelos incrementais (append, merge, delete+insert)' }, 
                type: 'task', 
                checkbox: true, 
                resource: { type: 'external', label: 'dbt Incremental Models', link: 'https://docs.getdbt.com/docs/build/incremental-models' },
                explanation: {
                  es: `Incremental = solo procesar datos nuevos.
  
  📊 Estrategias:
  - append: Solo INSERT nuevos
  - merge: UPSERT (actualiza si existe)
  - delete+insert: Borra rango y reinserta
  
  {{ config(materialized='incremental') }}
  SELECT * FROM {{ ref('stg_events') }}
  {% if is_incremental() %}
  WHERE event_date > (SELECT MAX(event_date) FROM {{ this }})
  {% endif %}`,
                  pt: `Incremental = só processar dados novos.
  
  📊 Estratégias:
  - append: Só INSERT novos
  - merge: UPSERT (atualiza se existe)
  - delete+insert: Apaga intervalo e reinsere
  
  {{ config(materialized='incremental') }}
  SELECT * FROM {{ ref('stg_events') }}
  {% if is_incremental() %}
  WHERE event_date > (SELECT MAX(event_date) FROM {{ this }})
  {% endif %}`
                }
              },
              { 
                id: 'l2-dbt-7', 
                text: { es: 'Sé cuándo usar view, table, incremental, ephemeral', pt: 'Sei quando usar view, table, incremental, ephemeral' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Materializations en dbt:
  
  👁️ VIEW: Query guardado, no almacena datos
  - Staging, modelos intermedios livianos
  
  📊 TABLE: Se recrea completa cada run
  - Marts pequeños/medianos
  
  📈 INCREMENTAL: Solo procesa datos nuevos
  - Tablas grandes, datos históricos
  
  👻 EPHEMERAL: No se materializa, es CTE
  - Lógica reutilizable que no necesita tabla
  
  💡 Regla: Empezá con view, pasá a table si es lento, incremental si es enorme.`,
                  pt: `Materializations no dbt:
  
  👁️ VIEW: Query salva, não armazena dados
  - Staging, modelos intermediários leves
  
  📊 TABLE: Recriada completa a cada run
  - Marts pequenos/médios
  
  📈 INCREMENTAL: Só processa dados novos
  - Tabelas grandes, dados históricos
  
  👻 EPHEMERAL: Não materializa, é CTE
  - Lógica reutilizável que não precisa de tabela
  
  💡 Regra: Comece com view, passe para table se for lento, incremental se for enorme.`
                }
              },
            ]
          },
          {
            id: 'l2-proyectos-avanzados',
            title: { es: '6️⃣ Proyectos Avanzados (Práctica Real)', en: '6️⃣ Advanced Projects (Real Practice)', pt: '6️⃣ Projetos Avançados (Prática Real)' },
            description: { es: 'Estos proyectos te van a dar experiencia real con las herramientas que usan los SSR. Hacé al menos 3.', pt: 'Estes projetos te darão experiência real com as ferramentas que os SSR usam. Faça pelo menos 3.' },
            steps: [
              { id: 'l2-proy-1', text: { es: 'Completé "Procesamiento con PySpark"', pt: 'Completei "Processamento com PySpark"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p2-spark-processing' } },
              { id: 'l2-proy-2', text: { es: 'Completé "Pipeline Dockerizado"', pt: 'Completei "Pipeline Dockerizado"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p2-docker-pipeline' } },
              { id: 'l2-proy-3', text: { es: 'Completé "Infraestructura con Terraform"', pt: 'Completei "Infraestrutura com Terraform"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p2-terraform-infra' } },
              { id: 'l2-proy-4', text: { es: 'Completé "Optimización de Queries SQL"', pt: 'Completei "Otimização de Queries SQL"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p2-sql-optimization' } },
              { id: 'l2-proy-5', text: { es: 'Completé "Introducción a Streaming"', pt: 'Completei "Introdução a Streaming"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p2-streaming-basics' } },
              { id: 'l2-proy-6', text: { es: 'Completé "Pipeline End-to-End en AWS"', pt: 'Completei "Pipeline End-to-End na AWS"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p5-aws-pipeline' } },
            ],
            stopTitle: { es: '🎯 Meta: 3 proyectos mínimo', pt: '🎯 Meta: 3 projetos no mínimo' },
            stopContent: { es: 'No necesitás hacer todos. Elegí los que más te interesen o los que más pidan en tu mercado. Pero hacé al menos 3. Estos proyectos son los que van a tu portfolio y te diferencian en entrevistas.', pt: 'Não precisa fazer todos. Escolha os que mais te interessem ou os que mais peçam no seu mercado. Mas faça pelo menos 3. Estes projetos são os que vão para seu portfólio e te diferenciam em entrevistas.' }
          }
        ]
      },
      {
        id: 'l2-deep-dive',
        title: { es: 'Fase 4: Deep Dive Técnico', en: 'Phase 4: Technical Deep Dive', pt: 'Fase 4: Deep Dive Técnico' },
        emoji: '🔬',
        sections: [
          {
            id: 'l2-sql-avanzado',
            title: { es: '1️⃣ SQL Avanzado: Más Allá de lo Básico', en: '1️⃣ Advanced SQL: Beyond the Basics', pt: '1️⃣ SQL Avançado: Além do Básico' },
            description: { es: 'Un SSR domina SQL a nivel experto. Estas son las técnicas que te van a pedir en entrevistas y vas a usar todos los días.', pt: 'Um SSR domina SQL em nível expert. Estas são as técnicas que vão te pedir em entrevistas e você vai usar todos os dias.' },
            steps: [
              { id: 'l2-sqla-1', text: { es: 'Domino CTEs recursivas (para jerarquías)', pt: 'Domino CTEs recursivas (para hierarquias)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Recursive CTEs', link: 'https://www.postgresql.org/docs/current/queries-with.html' } },
              { 
                id: 'l2-sqla-2', 
                text: { es: 'Sé usar LATERAL JOINs (para subqueries correlacionadas)', pt: 'Sei usar LATERAL JOINs (para subqueries correlacionadas)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `LATERAL = subquery que puede referenciar columnas de tablas anteriores.
  
  SELECT u.name, top_orders.*
  FROM users u,
  LATERAL (
    SELECT * FROM orders 
    WHERE user_id = u.id 
    ORDER BY amount DESC 
    LIMIT 3
  ) top_orders;
  
  💡 Útil para "top N por grupo" sin Window Functions.`,
                  pt: `LATERAL = subquery que pode referenciar colunas de tabelas anteriores.
  
  SELECT u.name, top_orders.*
  FROM users u,
  LATERAL (
    SELECT * FROM orders 
    WHERE user_id = u.id 
    ORDER BY amount DESC 
    LIMIT 3
  ) top_orders;
  
  💡 Útil para "top N por grupo" sem Window Functions.`
                }
              },
              { 
                id: 'l2-sqla-3', 
                text: { es: 'Entiendo EXPLAIN ANALYZE y puedo optimizar queries', pt: 'Entendo EXPLAIN ANALYZE e posso otimizar queries' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `EXPLAIN ANALYZE muestra el plan de ejecución REAL:
  
  EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'x@x.com';
  
  Qué buscar:
  🔴 Seq Scan en tablas grandes = falta índice
  🔴 Nested Loop con muchas rows = considerar JOIN tipo
  🟢 Index Scan = está usando índice
  🟢 Rows cercano al estimado = estadísticas ok`,
                  pt: `EXPLAIN ANALYZE mostra o plano de execução REAL:
  
  EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'x@x.com';
  
  O que buscar:
  🔴 Seq Scan em tabelas grandes = falta índice
  🔴 Nested Loop com muitas rows = considerar JOIN tipo
  🟢 Index Scan = está usando índice
  🟢 Rows próximo ao estimado = estatísticas ok`
                }
              },
              { 
                id: 'l2-sqla-4', 
                text: { es: 'Sé cuándo usar índices y cuándo NO usarlos', pt: 'Sei quando usar índices e quando NÃO usá-los' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Cuándo SÍ usar índice:
  ✅ Columnas en WHERE frecuentes
  ✅ Foreign keys (para JOINs)
  ✅ Columnas de ORDER BY
  
  Cuándo NO usar:
  ❌ Tablas pequeñas (<1000 rows)
  ❌ Columnas con poca cardinalidad (ej: boolean)
  ❌ Tablas con muchos INSERTs (índices ralentizan writes)
  ❌ Columnas raramente usadas en queries`,
                  pt: `Quando SIM usar índice:
  ✅ Colunas em WHERE frequentes
  ✅ Foreign keys (para JOINs)
  ✅ Colunas de ORDER BY
  
  Quando NÃO usar:
  ❌ Tabelas pequenas (<1000 rows)
  ❌ Colunas com pouca cardinalidade (ex: boolean)
  ❌ Tabelas com muitos INSERTs (índices deixam writes lentos)
  ❌ Colunas raramente usadas em queries`
                }
              },
              { 
                id: 'l2-sqla-5', 
                text: { es: 'Puedo escribir queries con múltiples Window Functions', pt: 'Posso escrever queries com múltiplas Window Functions' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Podés usar múltiples Window Functions en un SELECT:
  
  SELECT 
    product,
    sales,
    ROW_NUMBER() OVER (ORDER BY sales DESC) as rank,
    SUM(sales) OVER () as total_sales,
    sales * 100.0 / SUM(sales) OVER () as pct_total,
    LAG(sales) OVER (ORDER BY date) as prev_day_sales
  FROM daily_sales;
  
  💡 Cada OVER() define su propia "ventana".`,
                  pt: `Você pode usar múltiplas Window Functions em um SELECT:
  
  SELECT 
    product,
    sales,
    ROW_NUMBER() OVER (ORDER BY sales DESC) as rank,
    SUM(sales) OVER () as total_sales,
    sales * 100.0 / SUM(sales) OVER () as pct_total,
    LAG(sales) OVER (ORDER BY date) as prev_day_sales
  FROM daily_sales;
  
  💡 Cada OVER() define sua própria "janela".`
                }
              },
              { 
                id: 'l2-sqla-6', 
                text: { es: 'Entiendo la diferencia entre UNION y UNION ALL', pt: 'Entendo a diferença entre UNION e UNION ALL' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `UNION = combina resultados SIN duplicados (más lento)
  UNION ALL = combina resultados CON duplicados (más rápido)
  
  -- UNION: elimina duplicados
  SELECT city FROM users UNION SELECT city FROM orders;
  
  -- UNION ALL: mantiene todo
  SELECT city FROM users UNION ALL SELECT city FROM orders;
  
  💡 Usá UNION ALL a menos que necesites eliminar duplicados.`,
                  pt: `UNION = combina resultados SEM duplicados (mais lento)
  UNION ALL = combina resultados COM duplicados (mais rápido)
  
  -- UNION: elimina duplicados
  SELECT city FROM users UNION SELECT city FROM orders;
  
  -- UNION ALL: mantém tudo
  SELECT city FROM users UNION ALL SELECT city FROM orders;
  
  💡 Use UNION ALL a menos que precise eliminar duplicados.`
                }
              },
              { 
                id: 'l2-sqla-7', 
                text: { es: 'Sé usar PIVOT/UNPIVOT (o equivalentes)', pt: 'Sei usar PIVOT/UNPIVOT (ou equivalentes)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `PIVOT = filas a columnas (para reportes):
  
  -- Original: product, month, sales
  -- Pivot: product, jan, feb, mar...
  
  En SQL estándar (sin PIVOT):
  SELECT product,
    SUM(CASE WHEN month = 'Jan' THEN sales END) as jan,
    SUM(CASE WHEN month = 'Feb' THEN sales END) as feb
  FROM sales GROUP BY product;
  
  💡 Snowflake tiene PIVOT nativo.`,
                  pt: `PIVOT = linhas para colunas (para relatórios):
  
  -- Original: product, month, sales
  -- Pivot: product, jan, feb, mar...
  
  Em SQL padrão (sem PIVOT):
  SELECT product,
    SUM(CASE WHEN month = 'Jan' THEN sales END) as jan,
    SUM(CASE WHEN month = 'Feb' THEN sales END) as feb
  FROM sales GROUP BY product;
  
  💡 Snowflake tem PIVOT nativo.`
                }
              },
              { id: 'l2-sqla-8', text: { es: '🏋️ Completé ejercicios de Window Functions de la plataforma', pt: '🏋️ Completei exercícios de Window Functions da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'Window Functions', link: '/members?tab=ejercicios&category=sql&subcategory=window_functions' } },
              { id: 'l2-sqla-9', text: { es: '🏋️ Completé ejercicios de Optimización SQL de la plataforma', pt: '🏋️ Completei exercícios de Otimização SQL da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'SQL Optimization', link: '/members?tab=ejercicios&category=sql&subcategory=optimization' } },
              { id: 'l2-sqla-10a', text: { es: '✅ DataLemur Medium/Hard: Ejercicios 1-5 completados', pt: '✅ DataLemur Medium/Hard: Exercícios 1-5 completados' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'DataLemur Hard', link: 'https://datalemur.com/questions?difficulty=Hard' } },
              { id: 'l2-sqla-10b', text: { es: '🏆 DataLemur Medium/Hard: Ejercicios 6-10 completados (¡Meta alcanzada!)', pt: '🏆 DataLemur Medium/Hard: Exercícios 6-10 completados (Meta alcançada!)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'DataLemur Hard', link: 'https://datalemur.com/questions?difficulty=Hard' } },
            ],
            stopTitle: { es: '⏸️ Práctica intensiva', pt: '⏸️ Prática intensiva' },
            stopContent: { es: 'Hacé 2-3 ejercicios de DataLemur por día durante 2 semanas. Al terminar, vas a resolver cualquier query que te tiren en una entrevista. Completá en bloques de 5 para ver tu progreso.', pt: 'Faça 2-3 exercícios de DataLemur por dia durante 2 semanas. Ao terminar, você vai resolver qualquer query que te jogarem em uma entrevista. Complete em blocos de 5 para ver seu progresso.' }
          },
          {
            id: 'l2-python-avanzado',
            title: { es: '2️⃣ Python para Data Engineering', en: '2️⃣ Python for Data Engineering', pt: '2️⃣ Python para Data Engineering' },
            description: { es: 'No es lo mismo Python para scripts que Python para pipelines de producción. Estas son las diferencias.', pt: 'Não é a mesma coisa Python para scripts e Python para pipelines de produção. Estas são as diferenças.' },
            steps: [
              { id: 'l2-pya-1', text: { es: 'Entiendo type hints y los uso consistentemente', pt: 'Entendo type hints e os uso consistentemente' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Type Hints', link: 'https://docs.python.org/3/library/typing.html' } },
              { id: 'l2-pya-2', text: { es: 'Sé usar dataclasses y Pydantic para modelos de datos', pt: 'Sei usar dataclasses e Pydantic para modelos de dados' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Pydantic', link: 'https://docs.pydantic.dev/' } },
              { 
                id: 'l2-pya-3', 
                text: { es: 'Entiendo async/await para I/O concurrente', pt: 'Entendo async/await para I/O concorrente' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `async/await = ejecutar I/O sin bloquear.
  
  import asyncio
  import aiohttp
  
  async def fetch_data(url):
      async with aiohttp.ClientSession() as session:
          async with session.get(url) as response:
              return await response.json()
  
  # Ejecutar múltiples requests en paralelo
  results = await asyncio.gather(
      fetch_data(url1),
      fetch_data(url2),
      fetch_data(url3)
  )
  
  💡 Útil para APIs, no para CPU-bound.`,
                  pt: `async/await = executar I/O sem bloquear.
  
  import asyncio
  import aiohttp
  
  async def fetch_data(url):
      async with aiohttp.ClientSession() as session:
          async with session.get(url) as response:
              return await response.json()
  
  # Executar múltiplos requests em paralelo
  results = await asyncio.gather(
      fetch_data(url1),
      fetch_data(url2),
      fetch_data(url3)
  )
  
  💡 Útil para APIs, não para CPU-bound.`
                }
              },
              { id: 'l2-pya-4', text: { es: 'Sé escribir tests con pytest', pt: 'Sei escrever testes com pytest' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'pytest', link: 'https://docs.pytest.org/' } },
              { 
                id: 'l2-pya-5', 
                text: { es: 'Uso logging en vez de print para debugging', pt: 'Uso logging em vez de print para debugging' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `logging > print porque:
  - Niveles (DEBUG, INFO, WARNING, ERROR)
  - Timestamps automáticos
  - Configurable (archivo, consola, etc.)
  
  import logging
  logging.basicConfig(level=logging.INFO)
  logger = logging.getLogger(__name__)
  
  logger.info("Pipeline started")
  logger.error(f"Failed: {error}")`,
                  pt: `logging > print porque:
  - Níveis (DEBUG, INFO, WARNING, ERROR)
  - Timestamps automáticos
  - Configurável (arquivo, console, etc.)
  
  import logging
  logging.basicConfig(level=logging.INFO)
  logger = logging.getLogger(__name__)
  
  logger.info("Pipeline started")
  logger.error(f"Failed: {error}")`
                }
              },
              { 
                id: 'l2-pya-6', 
                text: { es: 'Sé manejar excepciones correctamente (no solo try/except genérico)', pt: 'Sei lidar com exceções corretamente (não apenas try/except genérico)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `❌ Malo:
  try:
      algo()
  except:  # atrapa TODO, hasta KeyboardInterrupt
      pass
  
  ✅ Mejor:
  try:
      response = api.fetch()
  except requests.Timeout as e:
      logger.warning(f"Timeout: {e}")
      retry()
  except requests.HTTPError as e:
      logger.error(f"HTTP error: {e}")
      raise`,
                  pt: `❌ Ruim:
  try:
      algo()
  except:  # pega TUDO, até KeyboardInterrupt
      pass
  
  ✅ Melhor:
  try:
      response = api.fetch()
  except requests.Timeout as e:
      logger.warning(f"Timeout: {e}")
      retry()
  except requests.HTTPError as e:
      logger.error(f"HTTP error: {e}")
      raise`
                }
              },
              { 
                id: 'l2-pya-7', 
                text: { es: 'Entiendo generators y cuándo usarlos para memoria', pt: 'Entendo generators e quando usá-los para memória' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Generator = produce valores uno a la vez (lazy evaluation).
  
  # Lista: carga TODO en memoria
  numeros = [x**2 for x in range(1000000)]
  
  # Generator: calcula bajo demanda
  numeros = (x**2 for x in range(1000000))
  
  def leer_archivo_grande(path):
      with open(path) as f:
          for line in f:  # generator implícito
              yield procesar(line)
  
  💡 Usá generators para archivos grandes, streams.`,
                  pt: `Generator = produz valores um de cada vez (lazy evaluation).
  
  # Lista: carrega TUDO em memória
  numeros = [x**2 for x in range(1000000)]
  
  # Generator: calcula sob demanda
  numeros = (x**2 for x in range(1000000))
  
  def ler_arquivo_grande(path):
      with open(path) as f:
          for line in f:  # generator implícito
              yield processar(line)
  
  💡 Use generators para arquivos grandes, streams.`
                }
              },
              { 
                id: 'l2-pya-8', 
                text: { es: 'Sé usar virtual environments (venv, poetry, pipenv)', pt: 'Sei usar virtual environments (venv, poetry, pipenv)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Virtual environments = dependencias aisladas por proyecto.
  
  # venv (built-in)
  python -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  
  # poetry (más moderno)
  poetry init
  poetry add pandas
  poetry install
  
  💡 Nunca instales paquetes global (excepto poetry/pipx).`,
                  pt: `Virtual environments = dependências isoladas por projeto.
  
  # venv (built-in)
  python -m venv .venv
  source .venv/bin/activate
  pip install -r requirements.txt
  
  # poetry (mais moderno)
  poetry init
  poetry add pandas
  poetry install
  
  💡 Nunca instale pacotes globalmente (exceto poetry/pipx).`
                }
              },
              { id: 'l2-pya-9', text: { es: '🏋️ Completé ejercicios de Python Interview de la plataforma', pt: '🏋️ Completei exercícios de Python Interview da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'Python Interview', link: '/members?tab=ejercicios&category=python&subcategory=interview' } },
              { id: 'l2-pya-10', text: { es: '🏋️ Completé ejercicios de PySpark de la plataforma', pt: '🏋️ Completei exercícios de PySpark da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'PySpark Conceptual', link: '/members?tab=ejercicios&category=python&subcategory=pyspark' } },
            ]
          },
          {
            id: 'l2-cloud-profundo',
            title: { es: '3️⃣ Cloud: Más Allá de lo Básico', en: '3️⃣ Cloud: Beyond the Basics', pt: '3️⃣ Cloud: Além do Básico' },
            description: { es: 'Ya sabés S3 y Athena. Ahora necesitás entender el ecosistema completo.', pt: 'Você já sabe S3 e Athena. Agora precisa entender o ecossistema completo.' },
            steps: [
              { 
                id: 'l2-cloud-1', 
                text: { es: 'Entiendo VPCs, subnets, security groups', pt: 'Entendo VPCs, subnets, security groups' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Networking básico de AWS:
  
  VPC = red virtual privada (tu "data center" en cloud)
  Subnet = subdivisión de la VPC (pública o privada)
  Security Group = firewall que controla tráfico
  
  💡 En DE, usualmente trabajás con VPCs que ya existen. Pero necesitás entender para debugging de conexiones.`,
                  pt: `Networking básico de AWS:
  
  VPC = rede virtual privada (seu "data center" na cloud)
  Subnet = subdivisão da VPC (pública ou privada)
  Security Group = firewall que controla tráfego
  
  💡 Em DE, usualmente você trabalha com VPCs que já existem. Mas precisa entender para debugging de conexões.`
                }
              },
              { 
                id: 'l2-cloud-2', 
                text: { es: 'Sé configurar IAM roles con least privilege', pt: 'Sei configurar IAM roles com least privilege' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Least privilege = dar SOLO los permisos necesarios.
  
  ❌ Malo:
  "Action": "*", "Resource": "*"
  
  ✅ Mejor:
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::mi-bucket/*"
  
  💡 Empezá sin permisos y agregá solo lo que falla.`,
                  pt: `Least privilege = dar APENAS as permissões necessárias.
  
  ❌ Ruim:
  "Action": "*", "Resource": "*"
  
  ✅ Melhor:
  "Action": ["s3:GetObject", "s3:PutObject"],
  "Resource": "arn:aws:s3:::mi-bucket/*"
  
  💡 Comece sem permissões e adicione só o que falha.`
                }
              },
              { 
                id: 'l2-cloud-3', 
                text: { es: 'Entiendo la diferencia entre Glue Jobs y Glue Crawlers', pt: 'Entendo a diferença entre Glue Jobs e Glue Crawlers' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Glue Crawler = DESCUBRE la estructura de datos
  → Lee archivos en S3, infiere schema, crea tablas en Glue Catalog
  
  Glue Job = TRANSFORMA datos
  → Script PySpark/Python que procesa datos
  
  Flujo típico:
  1. Crawler descubre datos raw
  2. Job transforma y escribe resultado
  3. Otro Crawler actualiza el catálogo`,
                  pt: `Glue Crawler = DESCOBRE a estrutura de dados
  → Lê arquivos no S3, infere schema, cria tabelas no Glue Catalog
  
  Glue Job = TRANSFORMA dados
  → Script PySpark/Python que processa dados
  
  Fluxo típico:
  1. Crawler descobre dados raw
  2. Job transforma e escreve resultado
  3. Outro Crawler atualiza o catálogo`
                }
              },
              { 
                id: 'l2-cloud-4', 
                text: { es: 'Sé cuándo usar EMR vs Glue vs Lambda', pt: 'Sei quando usar EMR vs Glue vs Lambda' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Lambda = código pequeño, triggers (ej: nuevo archivo en S3)
  → Max 15 min, poca memoria
  
  Glue = ETL serverless, Spark manejado
  → Minutos a horas, sin admin de cluster
  
  EMR = cluster Spark/Hadoop completo
  → Para jobs enormes o configuración custom
  
  💡 Empezá con Lambda/Glue. Solo EMR si necesitás más control.`,
                  pt: `Lambda = código pequeno, triggers (ex: novo arquivo no S3)
  → Max 15 min, pouca memória
  
  Glue = ETL serverless, Spark gerenciado
  → Minutos a horas, sem admin de cluster
  
  EMR = cluster Spark/Hadoop completo
  → Para jobs enormes ou configuração custom
  
  💡 Comece com Lambda/Glue. Só EMR se precisar de mais controle.`
                }
              },
              { 
                id: 'l2-cloud-5', 
                text: { es: 'Entiendo Kinesis vs Kafka (MSK) para streaming', pt: 'Entendo Kinesis vs Kafka (MSK) para streaming' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Kinesis = streaming nativo de AWS (más simple)
  → Menor curva de aprendizaje
  → Pay per use
  
  MSK (Kafka manejado) = para equipos con experiencia Kafka
  → Más features (compaction, exactly-once)
  → Más complejo de operar
  
  💡 Si no tenés preferencia, empezá con Kinesis.`,
                  pt: `Kinesis = streaming nativo da AWS (mais simples)
  → Menor curva de aprendizado
  → Pay per use
  
  MSK (Kafka gerenciado) = para equipes com experiência Kafka
  → Mais features (compaction, exactly-once)
  → Mais complexo de operar
  
  💡 Se não tiver preferência, comece com Kinesis.`
                }
              },
              { 
                id: 'l2-cloud-6', 
                text: { es: 'Sé configurar CloudWatch para logging y alertas', pt: 'Sei configurar CloudWatch para logging e alertas' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `CloudWatch = monitoreo de AWS.
  
  Logs: todos los servicios pueden enviar logs aquí
  Métricas: CPU, memoria, errores, etc.
  Alarmas: "Si errores > 10/min, enviá email"
  
  Para DE:
  - Logs de Glue jobs
  - Alertas de fallos de pipeline
  - Dashboard de jobs corriendo
  
  💡 CloudWatch Insights para buscar en logs con queries.`,
                  pt: `CloudWatch = monitoramento da AWS.
  
  Logs: todos os serviços podem enviar logs aqui
  Métricas: CPU, memória, erros, etc.
  Alarmas: "Se erros > 10/min, envie email"
  
  Para DE:
  - Logs de Glue jobs
  - Alertas de falhas de pipeline
  - Dashboard de jobs rodando
  
  💡 CloudWatch Insights para buscar em logs com queries.`
                }
              },
              { id: 'l2-cloud-7', text: { es: 'Entiendo costos y puedo optimizar gastos', pt: 'Entendo custos e posso otimizar gastos' }, type: 'task', checkbox: true },
              { id: 'l2-cloud-8a', text: { es: '🎓 CERT: Estudié los dominios 1-2 (Design Resilient, High-Performing)', pt: '🎓 CERT: Estudei os domínios 1-2 (Design Resilient, High-Performing)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Guía del examen', link: 'https://d1.awsstatic.com/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf' } },
              { id: 'l2-cloud-8b', text: { es: '🎓 CERT: Estudié los dominios 3-4 (Secure, Cost-Optimized)', pt: '🎓 CERT: Estudei os domínios 3-4 (Secure, Cost-Optimized)' }, type: 'task', checkbox: true },
              { id: 'l2-cloud-8c', text: { es: '🎓 CERT: Hice al menos 3 exámenes de práctica (~65%+ para aprobar)', pt: '🎓 CERT: Fiz pelo menos 3 exames de prática (~65%+ para aprovar)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Practice Exams', link: 'https://www.whizlabs.com/aws-solutions-architect-associate/' } },
              { id: 'l2-cloud-8d', text: { es: '🏆 CERT: Aprobé AWS Solutions Architect Associate', pt: '🏆 CERT: Aprovei AWS Solutions Architect Associate' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Registrar examen', link: 'https://aws.amazon.com/certification/certified-solutions-architect-associate/' } },
            ],
            stopTitle: { es: '🎓 Certificaciones', pt: '🎓 Certificações' },
            stopContent: { es: 'AWS SAA es la certificación más valorada. El examen cuesta ~$150 USD. Tip: Hacé muchos exámenes de práctica antes de rendir. Apuntá a 80%+ en práctica para aprobar el real.', pt: 'AWS SAA é a certificação mais valorizada. O exame custa ~$150 USD. Dica: Faça muitos exames de prática antes de prestar. Mire em 80%+ na prática para passar no real.' }
          },
          {
            id: 'l2-git-cicd',
            title: { es: '4️⃣ Git y CI/CD', en: '4️⃣ Git and CI/CD', pt: '4️⃣ Git e CI/CD' },
            description: { es: 'Un SSR no solo sabe git add/commit/push. Maneja flujos de trabajo profesionales.', pt: 'Um SSR não sabe apenas git add/commit/push. Gerencia fluxos de trabalho profissionais.' },
            steps: [
              { id: 'l2-git-1', text: { es: 'Entiendo git rebase vs merge y cuándo usar cada uno', pt: 'Entendo git rebase vs merge e quando usar cada um' }, type: 'task', checkbox: true },
              { id: 'l2-git-2', text: { es: 'Sé resolver conflictos de merge sin romper nada', pt: 'Sei resolver conflitos de merge sem quebrar nada' }, type: 'task', checkbox: true },
              { id: 'l2-git-3', text: { es: 'Uso git stash cuando necesito cambiar de contexto', pt: 'Uso git stash quando preciso mudar de contexto' }, type: 'task', checkbox: true },
              { id: 'l2-git-4', text: { es: 'Sé hacer cherry-pick cuando necesito un commit específico', pt: 'Sei fazer cherry-pick quando preciso de um commit específico' }, type: 'task', checkbox: true },
              { id: 'l2-git-5', text: { es: 'Entiendo GitHub Actions o GitLab CI', pt: 'Entendo GitHub Actions ou GitLab CI' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'GitHub Actions', link: 'https://docs.github.com/en/actions' } },
              { id: 'l2-git-6', text: { es: 'Configuré un pipeline de CI que corre tests automáticamente', pt: 'Configurei um pipeline de CI que roda testes automaticamente' }, type: 'task', checkbox: true },
              { id: 'l2-git-7', text: { es: 'Configuré un pipeline de CD que deploya automáticamente', pt: 'Configurei um pipeline de CD que faz deploy automaticamente' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-testing',
            title: { es: '5️⃣ Testing de Pipelines', en: '5️⃣ Pipeline Testing', pt: '5️⃣ Teste de Pipelines' },
            description: { es: 'El código sin tests es deuda técnica. Un SSR testea su código.', pt: 'Código sem testes é dívida técnica. Um SSR testa seu código.' },
            steps: [
              { id: 'l2-test-1', text: { es: 'Escribí unit tests para funciones de transformación', pt: 'Escrevi unit tests para funções de transformação' }, type: 'task', checkbox: true },
              { id: 'l2-test-2', text: { es: 'Escribí integration tests para pipelines completos', pt: 'Escrevi integration tests para pipelines completos' }, type: 'task', checkbox: true },
              { id: 'l2-test-3', text: { es: 'Usé fixtures para datos de test', pt: 'Usei fixtures para dados de teste' }, type: 'task', checkbox: true },
              { id: 'l2-test-4', text: { es: 'Usé mocks para simular APIs externas', pt: 'Usei mocks para simular APIs externas' }, type: 'task', checkbox: true },
              { id: 'l2-test-5', text: { es: 'Configuré coverage reports', pt: 'Configurei coverage reports' }, type: 'task', checkbox: true },
              { id: 'l2-test-6', text: { es: 'Mis tests corren en CI antes de mergear', pt: 'Meus testes rodam em CI antes de mergear' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '📊 Meta de coverage', pt: '📊 Meta de coverage' },
            stopContent: { es: 'No te obsesiones con 100% coverage. Apuntá a 70-80% en código crítico. Lo importante es que los tests te den confianza para deployar.', pt: 'Não fique obcecado com 100% coverage. Mire em 70-80% em código crítico. O importante é que os testes te deem confiança para fazer deploy.' }
          }
        ]
      },
      {
        id: 'l2-soft',
        title: { es: 'Fase 5: Soft Skills (Lo que Realmente te Hace SSR)', en: 'Phase 5: Soft Skills (What Really Makes You SSR)', pt: 'Fase 5: Soft Skills (O que Realmente te Faz SSR)' },
        emoji: '🧠',
        sections: [
          {
            id: 'l2-estimacion',
            title: { es: '1️⃣ Aprendé a Estimar', en: '1️⃣ Learn to Estimate', pt: '1️⃣ Aprenda a Estimar' },
            description: { es: 'La diferencia entre Jr y SSR muchas veces es: el SSR estima bien. Trackeá tus estimaciones por 1 mes.', pt: 'A diferença entre Jr e SSR muitas vezes é: o SSR estima bem. Rastreie suas estimativas por 1 mês.' },
            steps: [
              { id: 'l2-est-1', text: { es: 'Tarea 1: Estimé ___ | Tardé ___ | Diferencia porque...', pt: 'Tarefa 1: Estimei ___ | Demorei ___ | Diferença porque...' }, type: 'reflection', textInput: { es: 'Detalle...', en: 'Detail...', pt: 'Detalhe...' } },
              { id: 'l2-est-2', text: { es: 'Tarea 2: Estimé ___ | Tardé ___ | Diferencia porque...', pt: 'Tarefa 2: Estimei ___ | Demorei ___ | Diferença porque...' }, type: 'reflection', textInput: { es: 'Detalle...', en: 'Detail...', pt: 'Detalhe...' } },
              { id: 'l2-est-3', text: { es: 'Tarea 3: Estimé ___ | Tardé ___ | Diferencia porque...', pt: 'Tarefa 3: Estimei ___ | Demorei ___ | Diferença porque...' }, type: 'reflection', textInput: { es: 'Detalle...', en: 'Detail...', pt: 'Detalhe...' } },
              { id: 'l2-est-4', text: { es: 'Patrón que descubrí después de 1 mes', pt: 'Padrão que descobri depois de 1 mês' }, type: 'reflection', textInput: { es: 'Ej: Siempre subestimo la integración...', pt: 'Ex: Sempre subestimo a integração...' } },
              { id: 'l2-est-5', text: { es: 'Trackee mis estimaciones por 1 mes', pt: 'Rastreei minhas estimativas por 1 mês' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '💡 Tip de estimación', pt: '💡 Dica de estimativa' },
            stopContent: { es: 'Multiplicá tu estimación inicial por 1.5-2x. En serio. Siempre hay algo que no consideraste. Mejor entregar antes que después.', pt: 'Multiplique sua estimativa inicial por 1.5-2x. Sério. Sempre tem algo que você não considerou. Melhor entregar antes do que depois.' }
          },
          {
            id: 'l2-comunicacion',
            title: { es: '2️⃣ Comunicación Efectiva', en: '2️⃣ Effective Communication', pt: '2️⃣ Comunicação Efetiva' },
            description: { es: 'Esto es más importante de lo que parece. Saber comunicar te diferencia más que saber Spark.', pt: 'Isso é mais importante do que parece. Saber comunicar te diferencia mais do que saber Spark.' },
            steps: [
              { id: 'l2-com-1', text: { es: 'Leí "Crucial Conversations" o vi resúmenes', pt: 'Li "Crucial Conversations" ou vi resumos' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Resumen en YouTube', link: 'https://www.youtube.com/results?search_query=crucial+conversations+summary' } },
              { id: 'l2-com-2', text: { es: '¿Cuándo fue la última conversación difícil que salió mal?', pt: 'Quando foi a última conversa difícil que deu errado?' }, type: 'reflection', textInput: { es: 'Situación...', en: 'Situation...', pt: 'Situação...' } },
              { id: 'l2-com-3', text: { es: '¿Qué podría haber hecho diferente?', pt: 'O que poderia ter feito diferente?' }, type: 'reflection', textInput: { es: 'Mejora...', en: 'Improvement...', pt: 'Melhoria...' } },
              { id: 'l2-com-4', text: { es: 'Practiqué dar feedback constructivo a un compañero', pt: 'Pratiquei dar feedback construtivo a um colega' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-ingles',
            title: { es: '3️⃣ Inglés = Salarios Top', en: '3️⃣ English = Top Salaries', pt: '3️⃣ Inglês = Salários Top' },
            description: { es: 'Si querés llegar a $5,000-7,000 USD en LATAM, estudiá inglés. No es opcional. Es el multiplicador más grande de tu carrera.', pt: 'Se você quer chegar a $5.000-7.000 USD na LATAM, estude inglês. Não é opcional. É o maior multiplicador da sua carreira.' },
            steps: [
              { id: 'l2-ing-1', text: { es: '¿Puedo mantener conversación técnica en inglés?', pt: 'Consigo manter conversa técnica em inglês?' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
              { id: 'l2-ing-2', text: { es: '¿Puedo escribir documentación en inglés?', pt: 'Consigo escrever documentação em inglês?' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
              { id: 'l2-ing-3', text: { es: '¿Puedo hacer entrevista técnica en inglés?', pt: 'Consigo fazer entrevista técnica em inglês?' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
              { id: 'l2-ing-4', text: { es: 'Si respondí "no" a alguna, ¿qué voy a hacer?', pt: 'Se respondi "não" a alguma, o que vou fazer?' }, type: 'reflection', textInput: { es: 'Plan concreto...', en: 'Concrete plan...', pt: 'Plano concreto...' } },
              { id: 'l2-ing-5', text: { es: 'Estoy tomando clases o practicando inglés', pt: 'Estou fazendo aulas ou praticando inglês' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '🌎 El mercado global', pt: '🌎 O mercado global' },
            stopContent: { es: 'Con inglés fluido, podés aplicar a empresas de USA/Europa que pagan 3-5x más que empresas locales. Es la inversión con mayor ROI que podés hacer.', pt: 'Com inglês fluente, você pode aplicar para empresas dos EUA/Europa que pagam 3-5x mais que empresas locais. É o investimento com maior ROI que você pode fazer.' }
          }
        ]
      },
      {
        id: 'l2-troubleshooting',
        title: { es: 'Fase 6: Troubleshooting y Debugging (La Realidad)', en: 'Phase 6: Troubleshooting and Debugging (The Reality)', pt: 'Fase 6: Troubleshooting e Debugging (A Realidade)' },
        emoji: '🔥',
        sections: [
          {
            id: 'l2-debug-intro',
            title: { es: '💬 Mensaje de Ian', en: '💬 Message from Ian', pt: '💬 Mensagem do Ian' },
            description: { es: 'Te voy a ser honesto: el 50% de tu tiempo como Data Engineer va a ser debuggeando cosas que no funcionan. Pipelines que fallan a las 3am, datos que llegan mal, jobs que tardan 10x más de lo esperado. Esta sección es sobre eso - la realidad que nadie te enseña.', pt: 'Vou ser honesto: 50% do seu tempo como Data Engineer será debugando coisas que não funcionam. Pipelines que falham às 3am, dados que chegam errados, jobs que demoram 10x mais que o esperado. Esta seção é sobre isso - a realidade que ninguém te ensina.' },
            steps: [
              { id: 'l2-dbg-msg', text: { es: '📖 Leí y entendí que el debugging es parte del trabajo', pt: '📖 Li e entendi que o debugging é parte do trabalho' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-airflow-debug',
            title: { es: '1️⃣ Debugging de Airflow (Lo más común)', en: '1️⃣ Airflow Debugging (Most Common)', pt: '1️⃣ Debugging de Airflow (O mais comum)' },
            description: { es: 'Airflow es hermoso cuando funciona. Cuando no, es una pesadilla. Estos son los problemas más comunes y cómo resolverlos.', pt: 'Airflow é lindo quando funciona. Quando não, é um pesadelo. Estes são os problemas mais comuns e como resolvê-los.' },
            steps: [
              { id: 'l2-afd-1', text: { es: 'PROBLEMA: DAG no aparece en la UI → Revisar sintaxis, imports, DAG_FOLDER', pt: 'PROBLEMA: DAG não aparece na UI → Revisar sintaxe, imports, DAG_FOLDER' }, type: 'task', checkbox: true },
              { id: 'l2-afd-2', text: { es: 'PROBLEMA: Task stuck en "running" → Revisar logs, workers, conexiones', pt: 'PROBLEMA: Task presa em "running" → Revisar logs, workers, conexões' }, type: 'task', checkbox: true },
              { id: 'l2-afd-3', text: { es: 'PROBLEMA: Task falla sin error claro → Revisar XCom, memory, timeouts', pt: 'PROBLEMA: Task falha sem erro claro → Revisar XCom, memory, timeouts' }, type: 'task', checkbox: true },
              { id: 'l2-afd-4', text: { es: 'PROBLEMA: Scheduler lento → Revisar parsing time, cantidad de DAGs', pt: 'PROBLEMA: Scheduler lento → Revisar parsing time, quantidade de DAGs' }, type: 'task', checkbox: true },
              { id: 'l2-afd-5', text: { es: 'Sé leer logs de Airflow y encontrar el error real', pt: 'Sei ler logs do Airflow e encontrar o erro real' }, type: 'task', checkbox: true },
              { id: 'l2-afd-6', text: { es: 'Sé usar "airflow tasks test" para debuggear localmente', pt: 'Sei usar "airflow tasks test" para debugar localmente' }, type: 'task', checkbox: true },
              { id: 'l2-afd-7', text: { es: 'Debuggeé un DAG real que falló en mi empresa', pt: 'Debuguei um DAG real que falhou na minha empresa' }, type: 'task', checkbox: true },
              { id: 'l2-afd-8', text: { es: '🚀 Practicá: Completé el proyecto de Airflow', pt: '🚀 Pratique: Completei o projeto de Airflow' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p6-airflow-orchestration' } },
            ],
            stopTitle: { es: '🔧 Ejercicio práctico', pt: '🔧 Exercício prático' },
            stopContent: { es: 'Rompé intencionalmente un DAG de 3 formas diferentes: 1) Error de sintaxis, 2) Dependencia circular, 3) Task que falla. Debuggeá cada uno. Esto te prepara para la realidad.', pt: 'Quebre intencionalmente um DAG de 3 formas diferentes: 1) Erro de sintaxe, 2) Dependência circular, 3) Task que falha. Debugue cada um. Isso te prepara para a realidade.' }
          },
          {
            id: 'l2-spark-debug',
            title: { es: '2️⃣ Debugging de Spark (Cuando todo es lento)', en: '2️⃣ Spark Debugging (When Everything is Slow)', pt: '2️⃣ Debugging de Spark (Quando tudo está lento)' },
            description: { es: 'Spark es poderoso pero opaco. Cuando un job tarda 2 horas en vez de 10 minutos, necesitás saber dónde buscar.', pt: 'Spark é poderoso mas opaco. Quando um job demora 2 horas em vez de 10 minutos, você precisa saber onde procurar.' },
            steps: [
              { 
                id: 'l2-spd-1', 
                text: { es: 'Sé leer el Spark UI (Jobs, Stages, Tasks)', pt: 'Sei ler a Spark UI (Jobs, Stages, Tasks)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `El Spark UI es tu mejor amigo para debugging. Accedés en http://localhost:4040 cuando corre tu job.
  
  📊 Jobs: Muestra cada "action" (collect, save, count). Un job lento = problema.
  
  📊 Stages: Cada job se divide en stages separados por shuffles. Si un stage tarda mucho, ahí está el problema.
  
  📊 Tasks: Cada stage tiene tasks (1 por partición). Si 199 tasks tardan 10 segundos y 1 tarda 10 minutos = DATA SKEW.
  
  🔍 Qué buscar:
  - Tasks con tiempos muy diferentes → Data skew
  - Muchos stages → Demasiados shuffles
  - "Shuffle Read/Write" alto → Optimizar joins`,
                  pt: `A Spark UI é sua melhor amiga para debugging. Acesse em http://localhost:4040 quando seu job rodar.
  
  📊 Jobs: Mostra cada "action" (collect, save, count). Um job lento = problema.
  
  📊 Stages: Cada job se divide em stages separados por shuffles. Se um stage demora muito, aí está o problema.
  
  📊 Tasks: Cada stage tem tasks (1 por partição). Se 199 tasks demoram 10 segundos e 1 demora 10 minutos = DATA SKEW.
  
  🔍 O que buscar:
  - Tasks com tempos muito diferentes → Data skew
  - Muitos stages → Muitos shuffles
  - "Shuffle Read/Write" alto → Otimizar joins`
                },
                learnMoreLink: 'https://spark.apache.org/docs/latest/web-ui.html',
                learnMoreLabel: 'Documentación Spark UI'
              },
              { 
                id: 'l2-spd-2', 
                text: { es: 'Entiendo qué es un "shuffle" y por qué es costoso', pt: 'Entendo o que é um "shuffle" e por que é custoso' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Un SHUFFLE es cuando Spark tiene que redistribuir datos entre particiones. Es la operación más costosa.
  
  🔄 Cuándo ocurre shuffle:
  - groupBy / groupByKey
  - join (excepto broadcast)
  - repartition
  - distinct
  - orderBy / sort
  
  💸 Por qué es costoso:
  1. Escribe datos a disco
  2. Transfiere por red entre executors
  3. Lee de disco en el otro lado
  
  ⚡ Cómo reducir shuffles:
  - Usar broadcast joins para tablas chicas (<10MB)
  - Filtrar ANTES del join
  - Usar coalesce() en vez de repartition() cuando reducís particiones
  - Agregar ANTES de joinear si es posible`,
                  pt: `Um SHUFFLE é quando Spark tem que redistribuir dados entre partições. É a operação mais custosa.
  
  🔄 Quando ocorre shuffle:
  - groupBy / groupByKey
  - join (exceto broadcast)
  - repartition
  - distinct
  - orderBy / sort
  
  💸 Por que é custoso:
  1. Escreve dados em disco
  2. Transfere por rede entre executors
  3. Lê de disco no outro lado
  
  ⚡ Como reduzir shuffles:
  - Usar broadcast joins para tabelas pequenas (<10MB)
  - Filtrar ANTES do join
  - Usar coalesce() em vez de repartition() quando reduz partições
  - Agregar ANTES de fazer join se possível`
                }
              },
              { 
                id: 'l2-spd-3', 
                text: { es: 'Sé identificar data skew (particiones desbalanceadas)', pt: 'Sei identificar data skew (partições desbalanceadas)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `DATA SKEW = cuando una partición tiene MUCHO más datos que otras. Es el problema #1 de performance en Spark.
  
  🔍 Cómo identificarlo:
  1. En Spark UI → Stages → Ver "Duration" de tasks
  2. Si 1 task tarda 10x más que las otras = SKEW
  3. Buscar keys muy frecuentes (ej: NULL, "unknown", user_id popular)
  
  🛠️ Soluciones:
  1. SALTING: Agregar sufijo random a la key problemática
     df.withColumn("salted_key", concat(col("key"), lit("_"), (rand() * 10).cast("int")))
     
  2. BROADCAST: Si una tabla es chica, broadcast join
     df1.join(broadcast(df2), "key")
     
  3. FILTRAR NULLS: Procesar nulls por separado
     df_nulls = df.filter(col("key").isNull())
     df_valid = df.filter(col("key").isNotNull())`,
                  pt: `DATA SKEW = quando uma partição tem MUITO mais dados que outras. É o problema #1 de performance no Spark.
  
  🔍 Como identificar:
  1. Na Spark UI → Stages → Ver "Duration" de tasks
  2. Se 1 task demora 10x mais que as outras = SKEW
  3. Buscar keys muito frequentes (ex: NULL, "unknown", user_id popular)
  
  🛠️ Soluções:
  1. SALTING: Adicionar sufixo random à key problemática
     df.withColumn("salted_key", concat(col("key"), lit("_"), (rand() * 10).cast("int")))
     
  2. BROADCAST: Se uma tabela é pequena, broadcast join
     df1.join(broadcast(df2), "key")
     
  3. FILTRAR NULLS: Processar nulls separadamente
     df_nulls = df.filter(col("key").isNull())
     df_valid = df.filter(col("key").isNotNull())`
                }
              },
              { 
                id: 'l2-spd-4', 
                text: { es: 'Sé cuándo usar broadcast joins vs shuffle joins', pt: 'Sei quando usar broadcast joins vs shuffle joins' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `BROADCAST JOIN: Spark copia la tabla chica a TODOS los executors. No hay shuffle.
  
  ✅ Usar broadcast cuando:
  - Una tabla es chica (< 10MB por defecto, configurable)
  - Querés evitar shuffle a toda costa
  
  ❌ NO usar broadcast cuando:
  - La tabla "chica" es de 1GB+ (OOM en executors)
  - Tenés muchos executors (copia en cada uno)
  
  🔧 Cómo forzarlo:
  from pyspark.sql.functions import broadcast
  df_big.join(broadcast(df_small), "key")
  
  ⚙️ Configuración:
  spark.sql.autoBroadcastJoinThreshold = 10485760  # 10MB default
  # Poner -1 para desactivar auto-broadcast`,
                  pt: `BROADCAST JOIN: Spark copia a tabela pequena para TODOS os executors. Não há shuffle.
  
  ✅ Usar broadcast quando:
  - Uma tabela é pequena (< 10MB por padrão, configurável)
  - Quer evitar shuffle a todo custo
  
  ❌ NÃO usar broadcast quando:
  - A tabela "pequena" for de 1GB+ (OOM em executors)
  - Tiver muitos executors (cópia em cada um)
  
  🔧 Como forçar:
  from pyspark.sql.functions import broadcast
  df_big.join(broadcast(df_small), "key")
  
  ⚙️ Configuração:
  spark.sql.autoBroadcastJoinThreshold = 10485760  # 10MB default
  # Colocar -1 para desativar auto-broadcast`
                }
              },
              { 
                id: 'l2-spd-5', 
                text: { es: 'Entiendo OOM errors y cómo evitarlos', pt: 'Entendo OOM errors e como evitá-los' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `OOM (Out Of Memory) = cuando Spark se queda sin RAM. Puede pasar en Driver o Executors.
  
  🚨 OOM en Driver (más común):
  - collect() en un DataFrame grande
  - toPandas() con millones de filas
  - Broadcast de tabla muy grande
  
  Solución: NUNCA hagas collect() en producción. Usa take(100) o write a archivo.
  
  🚨 OOM en Executor:
  - Particiones muy grandes
  - Demasiados datos en una task (skew)
  - Cache de datos que no caben
  
  Soluciones:
  1. Aumentar particiones: df.repartition(1000)
  2. Aumentar memoria executor: --executor-memory 8g
  3. Reducir concurrencia: spark.sql.shuffle.partitions = 200
  4. Spill to disk: spark.memory.fraction = 0.6
  
  ⚙️ Configuración recomendada:
  spark.executor.memory = 8g
  spark.executor.memoryOverhead = 2g  # 20% extra para overhead`,
                  pt: `OOM (Out Of Memory) = quando Spark fica sem RAM. Pode acontecer no Driver ou Executors.
  
  🚨 OOM no Driver (mais comum):
  - collect() em um DataFrame grande
  - toPandas() com milhões de linhas
  - Broadcast de tabela muito grande
  
  Solução: NUNCA faça collect() em produção. Use take(100) ou write para arquivo.
  
  🚨 OOM no Executor:
  - Partições muito grandes
  - Muitos dados em uma task (skew)
  - Cache de dados que não cabem
  
  Soluções:
  1. Aumentar partições: df.repartition(1000)
  2. Aumentar memória executor: --executor-memory 8g
  3. Reduzir concorrência: spark.sql.shuffle.partitions = 200
  4. Spill to disk: spark.memory.fraction = 0.6
  
  ⚙️ Configuração recomendada:
  spark.executor.memory = 8g
  spark.executor.memoryOverhead = 2g  # 20% extra para overhead`
                }
              },
              { id: 'l2-spd-6', text: { es: 'Optimicé un job de Spark que era lento', pt: 'Otimizei um job de Spark que era lento' }, type: 'task', checkbox: true },
              { id: 'l2-spd-7', text: { es: '🚀 Practicá: Completé el proyecto de PySpark', pt: '🚀 Pratique: Completei o projeto de PySpark' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p2-spark-processing' } },
            ],
            stopTitle: { es: '📊 Caso real', pt: '📊 Caso real' },
            stopContent: { es: 'Un job de Spark tardaba 3 horas. Mirando el Spark UI, vi que 1 task de 200 tardaba 2.5 horas (data skew). Solución: salting de la key. Tiempo final: 15 minutos. Este tipo de debugging es lo que te hace SSR.', pt: 'Um job de Spark demorava 3 horas. Olhando a Spark UI, vi que 1 task de 200 demorava 2.5 horas (data skew). Solução: salting da key. Tempo final: 15 minutos. Este tipo de debugging é o que te faz SSR.' }
          },
          {
            id: 'l2-data-issues',
            title: { es: '3️⃣ Problemas de Datos (El 80% de tu tiempo)', en: '3️⃣ Data Problems (80% of Your Time)', pt: '3️⃣ Problemas de Dados (80% do seu tempo)' },
            description: { es: 'Los datos siempre llegan mal. Siempre. Aprendé a detectar y manejar estos problemas.', pt: 'Os dados sempre chegam errados. Sempre. Aprenda a detectar e lidar com esses problemas.' },
            steps: [
              { id: 'l2-dat-1', text: { es: 'PROBLEMA: Datos duplicados → Implementé deduplicación con window functions', pt: 'PROBLEMA: Dados duplicados → Implementei deduplicação com window functions' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ver Window Functions', projectId: 'p1-extra-window-functions' } },
              { id: 'l2-dat-2', text: { es: 'PROBLEMA: Schema change sin aviso → Implementé schema evolution', pt: 'PROBLEMA: Mudança de schema sem aviso → Implementei schema evolution' }, type: 'task', checkbox: true },
              { id: 'l2-dat-3', text: { es: 'PROBLEMA: Datos llegan tarde (late data) → Implementé manejo de late arrivals', pt: 'PROBLEMA: Dados chegam tarde (late data) → Implementei tratamento de late arrivals' }, type: 'task', checkbox: true },
              { id: 'l2-dat-4', text: { es: 'PROBLEMA: Nulls inesperados → Implementé validación con Great Expectations', pt: 'PROBLEMA: Nulls inesperados → Implementei validação com Great Expectations' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Proyecto Data Quality', projectId: 'p7-data-quality' } },
              { id: 'l2-dat-5', text: { es: 'PROBLEMA: Encoding incorrecto (UTF-8, Latin1) → Sé detectar y corregir', pt: 'PROBLEMA: Encoding incorreto (UTF-8, Latin1) → Sei detectar e corrigir' }, type: 'task', checkbox: true },
              { id: 'l2-dat-6', text: { es: 'PROBLEMA: Timezone hell → Entiendo UTC y conversiones', pt: 'PROBLEMA: Timezone hell → Entendo UTC e conversões' }, type: 'task', checkbox: true },
              { id: 'l2-dat-7', text: { es: 'Documenté un problema de datos que encontré y cómo lo resolví', pt: 'Documentei um problema de dados que encontrei e como o resolvi' }, type: 'task', checkbox: true },
              { id: 'l2-dat-8', text: { es: '🚀 Practicá: Completé el proyecto de Data Cleaning', pt: '🚀 Pratique: Completei o projeto de Data Cleaning' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p1-extra-python-cleaning' } },
            ]
          },
          {
            id: 'l2-oncall',
            title: { es: '4️⃣ Mentalidad On-Call', en: '4️⃣ On-Call Mindset', pt: '4️⃣ Mentalidade On-Call' },
            description: { es: 'En algún momento vas a estar de guardia. Cuando algo falla a las 3am, ¿sabés qué hacer?', pt: 'Em algum momento você estará de plantão. Quando algo falha às 3am, sabe o que fazer?' },
            steps: [
              { id: 'l2-onc-1', text: { es: 'Tengo un checklist mental de qué revisar primero', pt: 'Tenho um checklist mental do que revisar primeiro' }, type: 'task', checkbox: true },
              { id: 'l2-onc-2', text: { es: 'Sé dónde están los logs de cada sistema', pt: 'Sei onde estão os logs de cada sistema' }, type: 'task', checkbox: true },
              { id: 'l2-onc-3', text: { es: 'Sé cómo escalar si no puedo resolver', pt: 'Sei como escalar se não puder resolver' }, type: 'task', checkbox: true },
              { id: 'l2-onc-4', text: { es: 'Sé comunicar el estado a stakeholders sin tecnicismos', pt: 'Sei comunicar o estado a stakeholders sem tecnicismos' }, type: 'task', checkbox: true },
              { id: 'l2-onc-5', text: { es: 'Después de un incidente, escribo postmortem', pt: 'Depois de um incidente, escrevo postmortem' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '🚨 Tu checklist de debugging', pt: '🚨 Seu checklist de debugging' },
            stopContent: { es: '1) ¿Qué cambió? (deploy, datos, config) 2) ¿Cuándo empezó? 3) ¿Qué dicen los logs? 4) ¿Puedo reproducirlo? 5) ¿Cuál es el impacto? Memorizá esto.', pt: '1) O que mudou? (deploy, dados, config) 2) Quando começou? 3) O que dizem os logs? 4) Posso reproduzi-lo? 5) Qual é o impacto? Memorize isso.' }
          }
        ]
      },
      {
        id: 'l2-casos-estudio',
        title: { es: 'Fase 7: Casos de Estudio (Arquitecturas Reales)', en: 'Phase 7: Case Studies (Real Architectures)', pt: 'Fase 7: Estudos de Caso (Arquiteturas Reais)' },
        emoji: '🏗️',
        sections: [
          {
            id: 'l2-casos-intro',
            title: { es: '💬 Por qué estudiar arquitecturas reales', en: '💬 Why Study Real Architectures', pt: '💬 Por que estudiar arquiteturas reais' },
            description: { es: 'Las empresas top publican sus arquitecturas. Estudiarlas te da perspectiva que no conseguís en ningún curso. Cuando entiendas por qué Uber diseñó así su data platform, vas a pensar diferente.', pt: 'As empresas top publicam suas arquiteturas. Estudá-las te dá perspectiva que você não consegue em nenhum curso. Quando entender por que a Uber projetou assim sua data platform, você vai pensar diferente.' },
            steps: [
              { id: 'l2-cas-intro', text: { es: 'Entiendo que estudiar arquitecturas reales me hace mejor ingeniero', pt: 'Entendo que estudar arquiteturas reais me faz um engenheiro melhor' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-caso-uber',
            title: { es: '1️⃣ Caso: Uber - Michelangelo (ML Platform)', en: '1️⃣ Case: Uber - Michelangelo (ML Platform)', pt: '1️⃣ Caso: Uber - Michelangelo (ML Platform)' },
            description: { es: 'Uber procesa millones de viajes por día. Su plataforma de ML es un ejemplo de escala.', pt: 'Uber processa milhões de viagens por dia. Sua plataforma de ML é um exemplo de escala.' },
            steps: [
              { id: 'l2-uber-1', text: { es: 'Leí el blog post de Michelangelo', pt: 'Li o blog post de Michelangelo' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Uber Engineering Blog', link: 'https://www.uber.com/blog/michelangelo-machine-learning-platform/' } },
              { id: 'l2-uber-2', text: { es: 'Entiendo: Feature Store, Model Training, Model Serving', pt: 'Entendo: Feature Store, Model Training, Model Serving' }, type: 'task', checkbox: true },
              { id: 'l2-uber-3', text: { es: '¿Qué problema resuelve el Feature Store?', pt: 'Que problema o Feature Store resolve?' }, type: 'reflection', textInput: { es: 'Respuesta...', en: 'Answer...', pt: 'Resposta...' } },
              { id: 'l2-uber-4', text: { es: '¿Por qué separar training de serving?', pt: 'Por que separar training de serving?' }, type: 'reflection', textInput: { es: 'Respuesta...', en: 'Answer...', pt: 'Resposta...' } },
            ]
          },
          {
            id: 'l2-caso-spotify',
            title: { es: '2️⃣ Caso: Spotify - Event Delivery', pt: '2️⃣ Caso: Spotify - Event Delivery' },
            description: { es: 'Spotify procesa 100+ billones de eventos por día. Su sistema de eventos es arte.', pt: 'Spotify processa 100+ bilhões de eventos por dia. Seu sistema de eventos é arte.' },
            steps: [
              { id: 'l2-spot-1', text: { es: 'Leí sobre la arquitectura de eventos de Spotify', pt: 'Li sobre a arquitetura de eventos do Spotify' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Spotify Engineering', link: 'https://engineering.atspotify.com/2020/02/event-delivery-the-journey-of-a-spotify-event/' } },
              { id: 'l2-spot-2', text: { es: 'Entiendo: Google Pub/Sub, BigQuery, Data Lake', pt: 'Entendo: Google Pub/Sub, BigQuery, Data Lake' }, type: 'task', checkbox: true },
              { id: 'l2-spot-3', text: { es: '¿Por qué usan Pub/Sub en vez de Kafka?', pt: 'Por que usam Pub/Sub em vez de Kafka?' }, type: 'reflection', textInput: { es: 'Respuesta...', en: 'Answer...', pt: 'Resposta...' } },
              { id: 'l2-spot-4', text: { es: '¿Cómo manejan la escala de 100B eventos/día?', pt: 'Como lidam com a escala de 100B eventos/dia?' }, type: 'reflection', textInput: { es: 'Respuesta...', en: 'Answer...', pt: 'Resposta...' } },
            ]
          },
          {
            id: 'l2-caso-netflix',
            title: { es: '3️⃣ Caso: Netflix - Data Mesh', pt: '3️⃣ Caso: Netflix - Data Mesh' },
            description: { es: 'Netflix fue pionero en Data Mesh antes de que tuviera nombre. Su arquitectura descentralizada es un modelo.', pt: 'Netflix foi pioneira em Data Mesh antes que tivesse nome. Sua arquitetura descentralizada é um modelo.' },
            steps: [
              { id: 'l2-nflx-1', text: { es: 'Leí sobre la arquitectura de datos de Netflix', pt: 'Li sobre a arquitetura de dados da Netflix' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Netflix Tech Blog', link: 'https://netflixtechblog.com/data-mesh-a-data-movement-and-processing-platform-netflix-1288bcab2873' } },
              { id: 'l2-nflx-2', text: { es: 'Entiendo: Domain ownership, Data Products, Self-serve platform', pt: 'Entendo: Domain ownership, Data Products, Self-serve platform' }, type: 'task', checkbox: true },
              { id: 'l2-nflx-3', text: { es: '¿Qué problemas resuelve Data Mesh vs Data Warehouse centralizado?', pt: 'Que problemas Data Mesh resolve vs Data Warehouse centralizado?' }, type: 'reflection', textInput: { es: 'Respuesta...', en: 'Answer...', pt: 'Resposta...' } },
            ]
          },
          {
            id: 'l2-caso-airbnb',
            title: { es: '4️⃣ Caso: Airbnb - Minerva (Metrics Platform)', pt: '4️⃣ Caso: Airbnb - Minerva (Metrics Platform)' },
            description: { es: 'Airbnb tiene una de las plataformas de métricas más sofisticadas. Minerva es un caso de estudio en consistencia.', pt: 'Airbnb tem uma das plataformas de métricas mais sofisticadas. Minerva é um estudo de caso em consistência.' },
            steps: [
              { id: 'l2-abnb-1', text: { es: 'Leí sobre Minerva', pt: 'Li sobre Minerva' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Airbnb Engineering', link: 'https://medium.com/airbnb-engineering/how-airbnb-achieved-metric-consistency-at-scale-f23cc53dea70' } },
              { id: 'l2-abnb-2', text: { es: 'Entiendo: Metric definitions, Single source of truth', pt: 'Entendo: Metric definitions, Single source of truth' }, type: 'task', checkbox: true },
              { id: 'l2-abnb-3', text: { es: '¿Por qué es importante tener definiciones de métricas centralizadas?', pt: 'Por que é importante ter definições de métricas centralizadas?' }, type: 'reflection', textInput: { es: 'Respuesta...', en: 'Answer...', pt: 'Resposta...' } },
            ],
            stopTitle: { es: '🎯 Tu turno', pt: '🎯 Sua vez' },
            stopContent: { es: 'Elegí UNA de estas arquitecturas y dibujá un diagrama de memoria. Si podés explicarla sin mirar, la entendiste. Esto es exactamente lo que te van a pedir en entrevistas Senior.', pt: 'Escolha UMA dessas arquiteturas e desenhe um diagrama de memória. Se puder explicá-la sem olhar, você entendeu. Isso é exatamente o que vão te pedir em entrevistas Sênior.' }
          }
        ]
      },
      {
        id: 'l2-proyecto-integrador',
        title: { es: 'Fase 8: Proyecto Integrador (Tu Masterpiece)', pt: 'Fase 8: Projeto Integrador (Sua Obra-prima)' },
        emoji: '🏆',
        sections: [
          {
            id: 'l2-proy-int-intro',
            title: { es: '💬 Mensaje de Ian', en: '💬 Message from Ian', pt: '💬 Mensagem do Ian' },
            description: { es: 'Este proyecto es tu carta de presentación. Cuando termines, vas a tener algo que el 95% de los candidatos no tienen: un sistema end-to-end que demuestra que podés construir cosas reales. Tomátelo en serio.', pt: 'Este projeto é seu cartão de visita. Quando terminar, terá algo que 95% dos candidatos não têm: um sistema end-to-end que demonstra que você pode construir coisas reais. Leve a sério.' },
            steps: [
              { id: 'l2-pint-msg', text: { es: 'Entiendo que este proyecto es mi diferenciador en entrevistas', pt: 'Entendo que este projeto é meu diferencial em entrevistas' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-proy-int-desc',
            title: { es: '🚀 El Proyecto: Data Platform E-commerce', pt: '🚀 O Projeto: Data Platform E-commerce' },
            description: { es: 'Vas a construir una plataforma de datos completa para un e-commerce ficticio. Ingesta, transformación, warehouse, dashboards, alertas. Todo.', pt: 'Você vai construir uma plataforma de dados completa para um e-commerce fictício. Ingestão, transformação, warehouse, dashboards, alertas. Tudo.' },
            steps: [
              { id: 'l2-pint-1', text: { es: 'FASE 1: Diseñé la arquitectura (diagrama en draw.io)', pt: 'FASE 1: Projetei a arquitetura (diagrama no draw.io)' }, type: 'task', checkbox: true, resource: { type: 'project', label: '📐 Ver System Design', projectId: 'p9-system-design' } },
              { id: 'l2-pint-2', text: { es: 'FASE 2: Ingesta - Pipeline que consume APIs y guarda en S3/Data Lake', pt: 'FASE 2: Ingestão - Pipeline que consome APIs e salva no S3/Data Lake' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ver Pipeline API', projectId: 'p3-api-pipeline' } },
              { id: 'l2-pint-3', text: { es: 'FASE 3: Transformación - dbt project con staging → marts', pt: 'FASE 3: Transformação - dbt project com staging → marts' }, type: 'task', checkbox: true, resource: { type: 'project', label: '🔧 Ver Proyecto dbt', projectId: 'p8-dbt-project' } },
              { id: 'l2-pint-4', text: { es: 'FASE 4: Warehouse - Modelo dimensional en DuckDB/Snowflake', pt: 'FASE 4: Warehouse - Modelo dimensional no DuckDB/Snowflake' }, type: 'task', checkbox: true, resource: { type: 'project', label: '🏢 Ver Data Warehouse', projectId: 'p4-data-warehouse' } },
              { id: 'l2-pint-5', text: { es: 'FASE 5: Orquestación - DAG de Airflow que corre todo', pt: 'FASE 5: Orquestração - DAG de Airflow que roda tudo' }, type: 'task', checkbox: true, resource: { type: 'project', label: '⚙️ Ver Airflow', projectId: 'p6-airflow-orchestration' } },
              { id: 'l2-pint-6', text: { es: 'FASE 6: Calidad - Tests con Great Expectations', pt: 'FASE 6: Qualidade - Testes com Great Expectations' }, type: 'task', checkbox: true, resource: { type: 'project', label: '✅ Ver Data Quality', projectId: 'p7-data-quality' } },
              { id: 'l2-pint-7', text: { es: 'FASE 7: Observabilidad - Logs, métricas, alertas', pt: 'FASE 7: Observabilidade - Logs, métricas, alertas' }, type: 'task', checkbox: true, resource: { type: 'project', label: '📊 Ver Monitoring', projectId: 'p3-monitoring-alerting' } },
              { id: 'l2-pint-8', text: { es: 'FASE 8: Documentación - README completo, diagramas, decisiones', pt: 'FASE 8: Documentação - README completo, diagramas, decisões' }, type: 'task', checkbox: true, resource: { type: 'project', label: '📝 Ver Documentación', projectId: 'p10-mentoring-doc' } },
              { id: 'l2-pint-9', text: { es: 'FASE 9: Deploy - Dockerizado y deployable', pt: 'FASE 9: Deploy - Dockerizado e deployable' }, type: 'task', checkbox: true, resource: { type: 'project', label: '🐳 Ver Docker', projectId: 'p2-docker-pipeline' } },
              { id: 'l2-pint-10', text: { es: '🎉 COMPLETÉ MI DATA PLATFORM E-COMMERCE 🎉', pt: '🎉 COMPLETEI MINHA DATA PLATFORM E-COMMERCE 🎉' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '⏱️ Tiempo estimado', pt: '⏱️ Tempo estimado' },
            stopContent: { es: 'Este proyecto toma 40-60 horas. No lo hagas en un fin de semana. Hacelo bien, en 4-6 semanas. Cada fase es un commit. Al final, tenés un portfolio que impresiona.', pt: 'Este projeto leva 40-60 horas. Não faça em um fim de semana. Faça bem, em 4-6 semanas. Cada fase é um commit. No final, você tem um portfólio que impressiona.' }
          },
          {
            id: 'l2-proy-int-eval',
            title: { es: '📋 Autoevaluación del Proyecto', pt: '📋 Autoavaliação do Projeto' },
            description: { es: 'Antes de considerar el proyecto terminado, revisá estos puntos.', pt: 'Antes de considerar o projeto terminado, revise estes pontos.' },
            steps: [
              { id: 'l2-pint-ev1', text: { es: '¿Puedo explicar cada decisión de diseño?', pt: 'Posso explicar cada decisão de design?' }, type: 'reflection', textInput: { es: 'Sí/No - Si no, ¿qué me falta entender?', pt: 'Sim/Não - Se não, o que me falta entender?' } },
              { id: 'l2-pint-ev2', text: { es: '¿El código tiene tests?', pt: 'O código tem testes?' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
              { id: 'l2-pint-ev3', text: { es: '¿Hay documentación suficiente para que otro lo entienda?', pt: 'Há documentação suficiente para que outro entenda?' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
              { id: 'l2-pint-ev4', text: { es: '¿Funciona con un solo comando (docker-compose up)?', pt: 'Funciona com um único comando (docker-compose up)?' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
              { id: 'l2-pint-ev5', text: { es: '¿Puedo hacer una demo de 10 minutos sin mirar notas?', pt: 'Posso fazer uma demo de 10 minutos sem olhar notas?' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
            ]
          }
        ]
      },
      {
        id: 'l2-entrevistas-ssr',
        title: { es: 'Fase 9: Preparación para Entrevistas SSR', pt: 'Fase 9: Preparação para Entrevistas SSR' },
        emoji: '🎤',
        sections: [
          {
            id: 'l2-ent-intro',
            title: { es: '💬 La verdad sobre entrevistas SSR', pt: '💬 A verdade sobre entrevistas SSR' },
            description: { es: 'Las entrevistas SSR son diferentes a las Jr. Te van a pedir que expliques decisiones, que diseñes soluciones, que demuestres que pensás como ingeniero senior. Esta fase te prepara.', pt: 'As entrevistas SSR são diferentes das Jr. Vão te pedir para explicar decisões, projetar soluções, demonstrar que pensa como engenheiro sênior. Esta fase te prepara.' },
            steps: [
              { id: 'l2-ent-msg', text: { es: 'Entiendo que las entrevistas SSR son sobre demostrar criterio, no solo conocimiento', pt: 'Entendo que entrevistas SSR são sobre demonstrar critério, não apenas conhecimento' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-ent-tecnica',
            title: { es: '1️⃣ Entrevista Técnica SSR', pt: '1️⃣ Entrevista Técnica SSR' },
            description: { es: 'Te van a pedir que resuelvas problemas más complejos y que expliques tu razonamiento.', pt: 'Vão te pedir para resolver problemas mais complexos e explicar seu raciocínio.' },
            steps: [
              { id: 'l2-entt-1', text: { es: 'Practiqué 10 ejercicios Hard de DataLemur', pt: 'Pratiquei 10 exercícios Hard do DataLemur' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'DataLemur Hard', link: 'https://datalemur.com/questions?difficulty=Hard' } },
              { id: 'l2-entt-2', text: { es: 'Practiqué explicar mi razonamiento en voz alta mientras codifico', pt: 'Pratiquei explicar meu raciocínio em voz alta enquanto codifico' }, type: 'task', checkbox: true },
              { id: 'l2-entt-3', text: { es: 'Puedo resolver un problema de SQL en 20 minutos bajo presión', pt: 'Posso resolver um problema de SQL em 20 minutos sob pressão' }, type: 'task', checkbox: true },
              { id: 'l2-entt-4', text: { es: 'Puedo explicar trade-offs de diferentes soluciones', pt: 'Posso explicar trade-offs de diferentes soluções' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-ent-system',
            title: { es: '2️⃣ System Design (Nivel SSR)', pt: '2️⃣ System Design (Nível SSR)' },
            description: { es: 'No te van a pedir diseñar Twitter. Pero sí te van a pedir diseñar un pipeline o un sistema de métricas.', pt: 'Não vão te pedir para projetar o Twitter. Mas sim projetar um pipeline ou um sistema de métricas.' },
            steps: [
              { id: 'l2-ents-1', text: { es: 'Practiqué: "Diseñá un pipeline que procese 1M eventos/hora"', pt: 'Pratiquei: "Projete um pipeline que processe 1M eventos/hora"' }, type: 'task', checkbox: true },
              { id: 'l2-ents-2', text: { es: 'Practiqué: "Diseñá un sistema de métricas para un e-commerce"', pt: 'Pratiquei: "Projete um sistema de métricas para um e-commerce"' }, type: 'task', checkbox: true },
              { id: 'l2-ents-3', text: { es: 'Practiqué: "¿Cómo migrarías de un monolito a microservicios de datos?"', pt: 'Pratiquei: "Como você migraria de um monólito para microsserviços de dados?"' }, type: 'task', checkbox: true },
              { id: 'l2-ents-4', text: { es: 'Sé dibujar diagramas claros mientras explico', pt: 'Sei desenhar diagramas claros enquanto explico' }, type: 'task', checkbox: true },
              { id: 'l2-ents-5', text: { es: 'Sé hacer preguntas clarificadoras antes de diseñar', pt: 'Sei fazer perguntas clarificadoras antes de projetar' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '💡 Framework para System Design', pt: '💡 Framework para System Design' },
            stopContent: { es: '1) Clarificar requisitos 2) Estimar escala 3) Diseño high-level 4) Deep dive en componentes 5) Trade-offs 6) Puntos de falla. Memorizá este framework.', pt: '1) Clarificar requisitos 2) Estimar escala 3) Design high-level 4) Deep dive em componentes 5) Trade-offs 6) Pontos de falha. Memorize este framework.' }
          },
          {
            id: 'l2-ent-behavioral',
            title: { es: '3️⃣ Entrevista Behavioral', pt: '3️⃣ Entrevista Behavioral' },
            description: { es: 'Te van a preguntar sobre situaciones pasadas. Usá el método STAR: Situación, Tarea, Acción, Resultado.', pt: 'Vão te perguntar sobre situações passadas. Use o método STAR: Situação, Tarefa, Ação, Resultado.' },
            steps: [
              { id: 'l2-entb-1', text: { es: 'Preparé historia: "Contame de un proyecto difícil que lideraste"', pt: 'Preparei história: "Conte sobre um projeto difícil que você liderou"' }, type: 'task', checkbox: true },
              { id: 'l2-entb-2', text: { es: 'Preparé historia: "Contame de un conflicto con un compañero"', pt: 'Preparei história: "Conte sobre um conflito com um colega"' }, type: 'task', checkbox: true },
              { id: 'l2-entb-3', text: { es: 'Preparé historia: "Contame de una vez que fallaste"', pt: 'Preparei história: "Conte sobre uma vez que você falhou"' }, type: 'task', checkbox: true },
              { id: 'l2-entb-4', text: { es: 'Preparé historia: "Contame de una vez que tuviste que aprender algo rápido"', pt: 'Preparei história: "Conte sobre uma vez que teve que aprender algo rápido"' }, type: 'task', checkbox: true },
              { id: 'l2-entb-5', text: { es: 'Practiqué responder en formato STAR (2-3 minutos por respuesta)', pt: 'Pratiquei responder em formato STAR (2-3 minutos por resposta)' }, type: 'task', checkbox: true },
              { id: 'l2-entb-6', text: { es: '🎯 Practiqué al menos 5 preguntas Behavioral en la plataforma', pt: '🎯 Pratiquei pelo menos 5 perguntas Behavioral na plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: 'Ir a Behavioral', en: 'Go to Behavioral', pt: 'Ir para Behavioral' }, link: '/members?tab=interviews' } },
            ],
            stopTitle: { es: '🦖 Practica con Saurio', pt: '🦖 Pratique com Saurio' },
            stopContent: { es: 'En la plataforma podes practicar Behavioral con Saurio como entrevistador AI. Te da feedback en tiempo real y te ayuda a mejorar tus respuestas. Es como tener un mock interview 24/7.', pt: 'Na plataforma você pode praticar Behavioral com Saurio como entrevistador AI. Te dá feedback em tempo real e te ajuda a melhorar suas respostas. É como ter um mock interview 24/7.' }
          },
          {
            id: 'l2-ent-livecoding',
            title: { es: '4️⃣ Live Coding', pt: '4️⃣ Live Coding' },
            description: { es: 'Te van a pedir que escribas código en vivo. SQL y Python son los más comunes para DE.', pt: 'Vão te pedir para escrever código ao vivo. SQL e Python são os mais comuns para DE.' },
            steps: [
              { id: 'l2-entlc-1', text: { es: '🏋️ Completé 10 ejercicios SQL Medium en la plataforma', pt: '🏋️ Completei 10 exercícios SQL Medium na plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: 'SQL Practice', en: 'SQL Practice', pt: 'SQL Practice' }, link: '/members?tab=practica' } },
              { id: 'l2-entlc-2', text: { es: '🏋️ Completé 10 ejercicios Python/Pandas en la plataforma', pt: '🏋️ Completei 10 exercícios Python/Pandas na plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: 'Python Practice', en: 'Python Practice', pt: 'Python Practice' }, link: '/members?tab=practica' } },
              { id: 'l2-entlc-3', text: { es: 'Practiqué explicar mi código mientras lo escribo', pt: 'Pratiquei explicar meu código enquanto escrevo' }, type: 'task', checkbox: true },
              { id: 'l2-entlc-4', text: { es: 'Sé debuggear errores en vivo sin entrar en pánico', pt: 'Sei debugar erros ao vivo sem entrar em pânico' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '💡 Tips para Live Coding', pt: '💡 Dicas para Live Coding' },
            stopContent: { es: '1) Siempre pensá en voz alta 2) Empezá con casos simples 3) Preguntá si podes googlear syntax 4) No entres en pánico si te trabás, es normal 5) Practicá con timer de 20-30 min por ejercicio.', pt: '1) Sempre pense em voz alta 2) Comece com casos simples 3) Pergunte se pode googlear syntax 4) Não entre em pânico se travar, é normal 5) Pratique com timer de 20-30 min por exercício.' }
          },
          {
            id: 'l2-ent-assessment',
            title: { es: '5️⃣ Skill Assessment', pt: '5️⃣ Skill Assessment' },
            description: { es: 'Antes de aplicar, evaluá tu nivel real. El assessment te dice si estás listo o qué te falta.', pt: 'Antes de aplicar, avalie seu nível real. O assessment te diz se está pronto ou o que falta.' },
            steps: [
              { id: 'l2-enta-1', text: { es: 'Hice el Skill Assessment de la plataforma', pt: 'Fiz o Skill Assessment da plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: 'Skill Assessment', en: 'Skill Assessment', pt: 'Skill Assessment' }, link: '/members?tab=interviews' } },
              { id: 'l2-enta-2', text: { es: 'Mi resultado es 60%+ (estoy listo para aplicar)', pt: 'Meu resultado é 60%+ (estou pronto para aplicar)' }, type: 'task', checkbox: true },
              { id: 'l2-enta-3', text: { es: 'Si no llegué a 60%, trabajé en las áreas débiles', pt: 'Se não cheguei a 60%, trabalhei nas áreas fracas' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-ent-preguntas',
            title: { es: '4️⃣ Tus Preguntas para Ellos', pt: '4️⃣ Suas Perguntas para Eles' },
            description: { es: 'Las preguntas que hacés dicen mucho de vos. Prepará preguntas inteligentes.', pt: 'As perguntas que você faz dizem muito sobre você. Prepare perguntas inteligentes.' },
            steps: [
              { id: 'l2-entp-1', text: { es: 'Tengo lista de preguntas sobre el equipo de datos', pt: 'Tenho lista de perguntas sobre a equipe de dados' }, type: 'task', checkbox: true },
              { id: 'l2-entp-2', text: { es: 'Tengo lista de preguntas sobre el stack tecnológico', pt: 'Tenho lista de perguntas sobre o stack tecnológico' }, type: 'task', checkbox: true },
              { id: 'l2-entp-3', text: { es: 'Tengo lista de preguntas sobre crecimiento profesional', pt: 'Tenho lista de perguntas sobre crescimento profissional' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '❓ Preguntas que impresionan', pt: '❓ Perguntas que impressionam' },
            stopContent: { es: '"¿Cuál es el mayor desafío técnico del equipo de datos ahora?" "¿Cómo manejan data quality?" "¿Qué % del tiempo es mantenimiento vs proyectos nuevos?" Estas preguntas muestran que pensás como SSR.', pt: '"Qual é o maior desafio técnico da equipe de dados agora?" "Como lidam com data quality?" "Qual % do tempo é manutenção vs projetos novos?" Estas perguntas mostram que você pensa como SSR.' }
          },
          {
            id: 'l2-mock-interview',
            title: { es: '🎤 Mock Interview Final', pt: '🎤 Mock Interview Final' },
            description: { es: 'Antes de pasar al siguiente nivel, completá una Mock Interview de 45 minutos. Es la prueba de fuego que simula una entrevista real.', pt: 'Antes de passar para o próximo nível, complete uma Mock Interview de 45 minutos. É a prova de fogo que simula uma entrevista real.' },
            steps: [
              { id: 'l2-mock-1', text: { es: '🎯 Completé la Mock Interview de 45 min en la plataforma', pt: '🎯 Completei a Mock Interview de 45 min na plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: '🎤 Ir a Mock Interview', en: '🎤 Go to Mock Interview', pt: '🎤 Ir para Mock Interview' }, link: '/members?tab=interviews' } },
              { id: 'l2-mock-2', text: { es: 'Mi resultado fue HIRE o mejor', pt: 'Meu resultado foi HIRE ou melhor' }, type: 'task', checkbox: true },
              { id: 'l2-mock-3', text: { es: 'Si no obtuve HIRE, repetí hasta lograrlo', pt: 'Se não obtive HIRE, repeti até conseguir' }, type: 'task', checkbox: true },
              { id: 'l2-mock-4', text: { es: 'Me grabé respondiendo para ver mi lenguaje corporal', pt: 'Me gravei respondendo para ver minha linguagem corporal' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '🏆 La Mock Interview es el final boss', pt: '🏆 A Mock Interview é o chefe final' },
            stopContent: { es: 'Si lográs HIRE en la Mock Interview, estás listo para entrevistas reales. La presión del timer, las preguntas variadas, y el feedback al final te preparan mejor que cualquier otra cosa. No pases al siguiente nivel sin hacer esto.', pt: 'Se conseguir HIRE na Mock Interview, está pronto para entrevistas reais. A pressão do timer, as perguntas variadas, e o feedback no final te preparam melhor do que qualquer outra coisa. Não passe para o próximo nível sem fazer isso.' }
          }
        ]
      },
      {
        id: 'l2-cierre',
        title: { es: '🎯 Llegaste a SSR', pt: '🎯 Chegou a SSR' },
        emoji: '🏆',
        sections: [
          {
            id: 'l2-cierre-msg',
            title: { es: '💬 Mensaje Final de Ian', pt: '💬 Mensagem Final do Ian' },
            description: { es: 'Si llegaste hasta acá y completaste todo, no sos el mismo que empezó. Tenés skills técnicos sólidos, experiencia práctica real, y un proyecto que te diferencia. Ahora es momento de salir a buscar lo que merecés. Estoy orgulloso de vos.', pt: 'Se chegou até aqui e completou tudo, não é o mesmo que começou. Tem skills técnicos sólidos, experiência prática real, e um projeto que te diferencia. Agora é momento de sair para buscar o que merece. Estou orgulhoso de você.' },
            steps: [
              { id: 'l2-cierre-msg-1', text: { es: 'Leí el mensaje y me siento listo para el siguiente paso', pt: 'Li a mensagem e me sinto pronto para o próximo passo' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l2-checklist-final',
            title: { es: 'Checklist Final', pt: 'Checklist Final' },
            description: { es: 'Marcá todo lo que aplica. Si tenés 80%+, sos SSR.', pt: 'Marque tudo que se aplica. Se tiver 80%+, é SSR.' },
            steps: [
              { id: 'l2-fin-1', text: { es: 'Puedo diseñar una arquitectura de datos desde cero', pt: 'Posso projetar uma arquitetura de dados do zero' }, type: 'task', checkbox: true },
              { id: 'l2-fin-2', text: { es: 'Puedo estimar tareas con ±30% de precisión', pt: 'Posso estimar tarefas com ±30% de precisão' }, type: 'task', checkbox: true },
              { id: 'l2-fin-3', text: { es: 'Ayudé a onboardear a alguien nuevo', pt: 'Ajudei no onboarding de alguém novo' }, type: 'task', checkbox: true },
              { id: 'l2-fin-4', text: { es: 'Propuse y lideré una mejora técnica', pt: 'Propus e liderei uma melhoria técnica' }, type: 'task', checkbox: true },
              { id: 'l2-fin-5', text: { es: 'Mis code reviews agregan valor real', pt: 'Meus code reviews agregam valor real' }, type: 'task', checkbox: true },
              { id: 'l2-fin-6', text: { es: 'Sé decir "no" o "necesito más tiempo" sin problemas', pt: 'Sei dizer "não" ou "preciso de mais tempo" sem problemas' }, type: 'task', checkbox: true },
              { id: 'l2-fin-7', text: { es: 'Tengo ofertas de mercado que validan mi nivel', pt: 'Tenho ofertas de mercado que validam meu nível' }, type: 'task', checkbox: true },
              { id: 'l2-fin-8', text: { es: 'Completé mi proyecto integrador', pt: 'Completei meu projeto integrador' }, type: 'task', checkbox: true },
              { id: 'l2-fin-9', text: { es: 'Estudié al menos 2 casos de estudio de empresas reales', pt: 'Estudei pelo menos 2 estudos de caso de empresas reais' }, type: 'task', checkbox: true },
              { id: 'l2-fin-10', text: { es: 'Debuggeé problemas reales en producción', pt: 'Debuguei problemas reais em produção' }, type: 'task', checkbox: true },
              { id: 'l2-fin-11', text: { es: '🎉 ME CONSIDERO SSR / ME PAGAN COMO SSR 🎉', pt: '🎉 ME CONSIDERO SSR / ME PAGAM COMO SSR 🎉' }, type: 'task', checkbox: true },
            ]
          }
        ]
      }
    ],
    checklist: [
      { es: '✅ Tengo objetivos claros con mi manager', pt: '✅ Tenho objetivos claros com meu manager' },
      { es: '✅ Mantengo un Brag Document actualizado', pt: '✅ Mantenho um Brag Document atualizado' },
      { es: '✅ Tuve al menos 2 entrevistas externas este semestre', pt: '✅ Tive pelo menos 2 entrevistas externas neste semestre' },
      { es: '✅ Sé cuánto paga el mercado por mi rol', pt: '✅ Sei quanto o mercado paga pela minha função' },
      { es: '✅ Leí "Designing Data-Intensive Applications" completo', pt: '✅ Li "Designing Data-Intensive Applications" completo' },
      { es: '✅ Puedo dibujar la arquitectura de mi proyecto principal', pt: '✅ Posso desenhar a arquitetura do meu projeto principal' },
      { es: '✅ Tengo experiencia con Airflow/Docker/Terraform', pt: '✅ Tenho experiência com Airflow/Docker/Terraform' },
      { es: '✅ Trackee mis estimaciones por 1 mes', pt: '✅ Rastreei minhas estimativas por 1 mês' },
      { es: '✅ Mi inglés es suficiente para entrevistas (o estoy estudiando)', pt: '✅ Meu inglês é suficiente para entrevistas (ou estou estudando)' },
      { es: '🎉 Llegué a SSR con sueldo acorde', pt: '🎉 Cheguei a SSR com salário compatível' },
    ],
    resources: [
      {
        title: { es: '📚 Libros Técnicos', pt: '📚 Livros Técnicos', en: '📚 Technical Books' },
        items: [
          { es: '"Designing Data-Intensive Applications" - Kleppmann ⭐⭐⭐', pt: '"Designing Data-Intensive Applications" - Kleppmann ⭐⭐⭐', en: '"Designing Data-Intensive Applications" - Kleppmann ⭐⭐⭐' },
          { es: '"The Data Warehouse Toolkit" - Ralph Kimball', pt: '"The Data Warehouse Toolkit" - Ralph Kimball', en: '"The Data Warehouse Toolkit" - Ralph Kimball' },
          { es: '"Data Pipelines Pocket Reference" - James Densmore', pt: '"Data Pipelines Pocket Reference" - James Densmore', en: '"Data Pipelines Pocket Reference" - James Densmore' },
          { es: '"Fundamentals of Data Engineering" - Joe Reis (repaso)', pt: '"Fundamentals of Data Engineering" - Joe Reis (revisão)', en: '"Fundamentals of Data Engineering" - Joe Reis (review)' },
        ]
      },
      {
        title: { es: '📈 Libros de Carrera', pt: '📈 Livros de Carreira', en: '📈 Career Books' },
        items: [
          { es: '"Staff Engineer" - Will Larson (para entender el siguiente nivel)', pt: '"Staff Engineer" - Will Larson (para entender o próximo nível)', en: '"Staff Engineer" - Will Larson (to understand the next level)' },
          { es: '"The Manager\'s Path" - Camille Fournier', pt: '"The Manager\'s Path" - Camille Fournier', en: '"The Manager\'s Path" - Camille Fournier' },
          { es: '"Never Split the Difference" - Chris Voss (negociación)', pt: '"Never Split the Difference" - Chris Voss (negociação)', en: '"Never Split the Difference" - Chris Voss (negotiation)' },
        ]
      },
      {
        title: { es: '🗣️ Soft Skills', pt: '🗣️ Soft Skills', en: '🗣️ Soft Skills' },
        items: [
          { es: '"Crucial Conversations" - Patterson, Grenny, McMillan', pt: '"Crucial Conversations" - Patterson, Grenny, McMillan', en: '"Crucial Conversations" - Patterson, Grenny, McMillan' },
          { es: '"Radical Candor" - Kim Scott', pt: '"Radical Candor" - Kim Scott', en: '"Radical Candor" - Kim Scott' },
        ]
      },
      {
        title: { es: '🛠️ Herramientas a Dominar', pt: '🛠️ Ferramentas a Dominar', en: '🛠️ Tools to Master' },
        items: [
          { es: 'Airflow (orquestación)', pt: 'Airflow (orquestração)', en: 'Airflow (orchestration)' },
          { es: 'Spark (procesamiento distribuido)', pt: 'Spark (processamento distribuído)', en: 'Spark (distributed processing)' },
          { es: 'Terraform (infraestructura como código)', pt: 'Terraform (infraestrutura como código)', en: 'Terraform (infrastructure as code)' },
          { es: 'Docker/Kubernetes (containerización)', pt: 'Docker/Kubernetes (containerização)', en: 'Docker/Kubernetes (containerization)' },
          { es: 'Great Expectations (data quality)', pt: 'Great Expectations (data quality)', en: 'Great Expectations (data quality)' },
        ]
      }
    ]
  };
