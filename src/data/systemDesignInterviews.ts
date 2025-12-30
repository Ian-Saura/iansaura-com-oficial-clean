/**
 * System Design Interviews for Data Engineering
 * 
 * Estructura: Cada interview simula una entrevista real con:
 * - Contexto del problema
 * - Preguntas clarificadoras que deberías hacer
 * - Solución paso a paso
 * - Diagramas (descripción)
 * - Trade-offs a discutir
 * - Errores comunes a evitar
 */

export interface SystemDesignInterview {
  id: string;
  title: {
    es: string;
    en: string;
    pt: string;
  };
  company: string; // Tipo de empresa (no nombre real)
  difficulty: 'junior' | 'mid' | 'senior';
  duration: string; // "45 min"
  tags: string[];
  problem: {
    es: string;
    en: string;
    pt: string;
  };
  clarifyingQuestions: {
    question: { es: string; en: string; pt: string };
    whyAsk: { es: string; en: string; pt: string };
    typicalAnswer: { es: string; en: string; pt: string };
  }[];
  requirements: {
    functional: { es: string; en: string; pt: string }[];
    nonFunctional: { es: string; en: string; pt: string }[];
  };
  solution: {
    step: number;
    title: { es: string; en: string; pt: string };
    description: { es: string; en: string; pt: string };
    components: string[];
    diagram?: string; // ASCII art or description
  }[];
  tradeoffs: {
    decision: { es: string; en: string; pt: string };
    option1: { es: string; en: string; pt: string };
    option2: { es: string; en: string; pt: string };
    recommendation: { es: string; en: string; pt: string };
  }[];
  commonMistakes: {
    es: string;
    en: string;
    pt: string;
  }[];
  interviewerTips: {
    es: string;
    en: string;
    pt: string;
  }[];
  relatedTopics: string[];
  estimatedXP: number;
}

export const SYSTEM_DESIGN_INTERVIEWS: SystemDesignInterview[] = [
  // ============ INTERVIEW 1: E-COMMERCE PIPELINE ============
  {
    id: 'sd-ecommerce-pipeline',
    title: {
      es: 'Pipeline de Datos para E-commerce',
      en: 'E-commerce Data Pipeline',
      pt: 'Pipeline de Dados para E-commerce'
    },
    company: 'E-commerce (estilo Mercado Libre/Amazon)',
    difficulty: 'junior',
    duration: '45 min',
    tags: ['ETL', 'Data Warehouse', 'Batch Processing', 'AWS'],
    problem: {
      es: `Sos el primer Data Engineer de una startup de e-commerce que está creciendo rápido. 
Tienen 100,000 transacciones por día y necesitan:
1. Un dashboard para el equipo de ventas con métricas diarias
2. Reportes semanales para inversores
3. Datos históricos para análisis de tendencias

El CTO te pregunta: "¿Cómo diseñarías el pipeline de datos?"`,
      en: `You're the first Data Engineer at a fast-growing e-commerce startup.
They have 100,000 transactions per day and need:
1. A dashboard for the sales team with daily metrics
2. Weekly reports for investors
3. Historical data for trend analysis

The CTO asks: "How would you design the data pipeline?"`,
      pt: `Você é o primeiro Data Engineer de uma startup de e-commerce que está crescendo rápido.
Eles têm 100.000 transações por dia e precisam de:
1. Um dashboard para o time de vendas com métricas diárias
2. Relatórios semanais para investidores
3. Dados históricos para análise de tendências

O CTO pergunta: "Como você projetaria o pipeline de dados?"`
    },
    clarifyingQuestions: [
      {
        question: {
          es: '¿De dónde vienen los datos? ¿Qué sistemas fuente tienen?',
          en: 'Where does the data come from? What source systems do you have?',
          pt: 'De onde vêm os dados? Quais sistemas fonte vocês têm?'
        },
        whyAsk: {
          es: 'Necesitás saber si es PostgreSQL, MySQL, APIs, archivos, etc. para elegir el método de extracción.',
          en: 'You need to know if it\'s PostgreSQL, MySQL, APIs, files, etc. to choose the extraction method.',
          pt: 'Você precisa saber se é PostgreSQL, MySQL, APIs, arquivos, etc. para escolher o método de extração.'
        },
        typicalAnswer: {
          es: 'PostgreSQL para transacciones, MongoDB para catálogo de productos, y algunos CSVs de proveedores.',
          en: 'PostgreSQL for transactions, MongoDB for product catalog, and some CSVs from suppliers.',
          pt: 'PostgreSQL para transações, MongoDB para catálogo de produtos, e alguns CSVs de fornecedores.'
        }
      },
      {
        question: {
          es: '¿Qué latencia es aceptable? ¿Los datos pueden tener unas horas de delay?',
          en: 'What latency is acceptable? Can the data have a few hours of delay?',
          pt: 'Qual latência é aceitável? Os dados podem ter algumas horas de atraso?'
        },
        whyAsk: {
          es: 'Define si necesitás streaming (tiempo real) o batch (cada X horas). Cambia completamente la arquitectura.',
          en: 'Defines if you need streaming (real-time) or batch (every X hours). Completely changes the architecture.',
          pt: 'Define se você precisa de streaming (tempo real) ou batch (a cada X horas). Muda completamente a arquitetura.'
        },
        typicalAnswer: {
          es: 'El dashboard puede actualizarse cada hora. Los reportes son semanales.',
          en: 'The dashboard can update every hour. Reports are weekly.',
          pt: 'O dashboard pode atualizar a cada hora. Os relatórios são semanais.'
        }
      },
      {
        question: {
          es: '¿Qué presupuesto y equipo tienen? ¿Puedo usar servicios managed?',
          en: 'What budget and team do you have? Can I use managed services?',
          pt: 'Qual orçamento e equipe vocês têm? Posso usar serviços gerenciados?'
        },
        whyAsk: {
          es: 'Airflow self-hosted vs MWAA, Spark cluster vs Glue. El presupuesto define la complejidad.',
          en: 'Self-hosted Airflow vs MWAA, Spark cluster vs Glue. Budget defines complexity.',
          pt: 'Airflow self-hosted vs MWAA, cluster Spark vs Glue. O orçamento define a complexidade.'
        },
        typicalAnswer: {
          es: 'Startup con funding, podemos gastar en cloud. Solo vos como DE por ahora.',
          en: 'Funded startup, we can spend on cloud. Just you as DE for now.',
          pt: 'Startup com funding, podemos gastar em cloud. Só você como DE por enquanto.'
        }
      },
      {
        question: {
          es: '¿Cuánto van a crecer? ¿En 1 año serán 10x?',
          en: 'How much will you grow? Will you be 10x in 1 year?',
          pt: 'Quanto vão crescer? Em 1 ano serão 10x?'
        },
        whyAsk: {
          es: 'Si van a escalar mucho, elegís tecnologías que escalen (Spark > Pandas).',
          en: 'If they\'ll scale a lot, you choose technologies that scale (Spark > Pandas).',
          pt: 'Se vão escalar muito, você escolhe tecnologias que escalam (Spark > Pandas).'
        },
        typicalAnswer: {
          es: 'Esperamos 5-10x en el próximo año si todo sale bien.',
          en: 'We expect 5-10x next year if everything goes well.',
          pt: 'Esperamos 5-10x no próximo ano se tudo der certo.'
        }
      }
    ],
    requirements: {
      functional: [
        { es: 'Ingestar datos de PostgreSQL, MongoDB y CSVs', en: 'Ingest data from PostgreSQL, MongoDB and CSVs', pt: 'Ingerir dados de PostgreSQL, MongoDB e CSVs' },
        { es: 'Transformar y limpiar datos (deduplicar, validar)', en: 'Transform and clean data (deduplicate, validate)', pt: 'Transformar e limpar dados (deduplicar, validar)' },
        { es: 'Cargar a un Data Warehouse para analytics', en: 'Load to a Data Warehouse for analytics', pt: 'Carregar para um Data Warehouse para analytics' },
        { es: 'Actualización cada hora para el dashboard', en: 'Hourly update for dashboard', pt: 'Atualização a cada hora para o dashboard' },
        { es: 'Datos históricos de al menos 2 años', en: 'Historical data of at least 2 years', pt: 'Dados históricos de pelo menos 2 anos' }
      ],
      nonFunctional: [
        { es: 'Escalable a 10x el volumen actual', en: 'Scalable to 10x current volume', pt: 'Escalável a 10x o volume atual' },
        { es: 'Recuperación ante fallos (retry, alertas)', en: 'Failure recovery (retry, alerts)', pt: 'Recuperação de falhas (retry, alertas)' },
        { es: 'Costo optimizado (serverless donde sea posible)', en: 'Cost optimized (serverless where possible)', pt: 'Custo otimizado (serverless onde possível)' },
        { es: 'Mantenible por 1 persona', en: 'Maintainable by 1 person', pt: 'Manutenível por 1 pessoa' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Capa de Ingesta', en: 'Ingestion Layer', pt: 'Camada de Ingestão' },
        description: {
          es: `Extraemos datos de las 3 fuentes hacia S3 (nuestro Data Lake).

PostgreSQL → AWS DMS o Airbyte (CDC para capturar cambios)
MongoDB → Airbyte connector o script Python con pymongo
CSVs → Los proveedores los suben a un bucket S3 dedicado

Todo llega a s3://empresa-data/raw/ con particiones por fecha:
s3://empresa-data/raw/transactions/year=2024/month=12/day=09/`,
          en: `We extract data from the 3 sources to S3 (our Data Lake).

PostgreSQL → AWS DMS or Airbyte (CDC to capture changes)
MongoDB → Airbyte connector or Python script with pymongo
CSVs → Suppliers upload to a dedicated S3 bucket

Everything arrives at s3://company-data/raw/ with date partitions:
s3://company-data/raw/transactions/year=2024/month=12/day=09/`,
          pt: `Extraímos dados das 3 fontes para S3 (nosso Data Lake).

PostgreSQL → AWS DMS ou Airbyte (CDC para capturar mudanças)
MongoDB → Conector Airbyte ou script Python com pymongo
CSVs → Fornecedores sobem para um bucket S3 dedicado

Tudo chega em s3://empresa-data/raw/ com partições por data:
s3://empresa-data/raw/transactions/year=2024/month=12/day=09/`
        },
        components: ['AWS DMS', 'Airbyte', 'S3', 'Python'],
        diagram: `
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  PostgreSQL  │     │   MongoDB    │     │  CSV Files   │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       │ DMS/CDC            │ Airbyte            │ S3 Upload
       │                    │                    │
       └────────────────────┼────────────────────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   S3 (Raw)    │
                    │   Data Lake   │
                    └───────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Capa de Transformación', en: 'Transformation Layer', pt: 'Camada de Transformação' },
        description: {
          es: `Usamos dbt + Snowflake para transformar los datos.

¿Por qué dbt?
- SQL puro (fácil de mantener)
- Tests integrados
- Documentación automática
- Git-friendly

¿Por qué Snowflake?
- Serverless (no hay que administrar)
- Escala automáticamente
- Separación storage/compute
- 30 días gratis para empezar

Estructura de modelos:
- staging/ → Limpieza básica (tipos, nulls)
- intermediate/ → Joins entre tablas
- marts/ → Métricas de negocio listas para dashboards`,
          en: `We use dbt + Snowflake to transform the data.

Why dbt?
- Pure SQL (easy to maintain)
- Built-in tests
- Automatic documentation
- Git-friendly

Why Snowflake?
- Serverless (no admin needed)
- Auto-scales
- Storage/compute separation
- 30-day free trial to start

Model structure:
- staging/ → Basic cleaning (types, nulls)
- intermediate/ → Table joins
- marts/ → Business metrics ready for dashboards`,
          pt: `Usamos dbt + Snowflake para transformar os dados.

Por que dbt?
- SQL puro (fácil de manter)
- Testes integrados
- Documentação automática
- Git-friendly

Por que Snowflake?
- Serverless (não precisa administrar)
- Escala automaticamente
- Separação storage/compute
- 30 dias grátis para começar

Estrutura de modelos:
- staging/ → Limpeza básica (tipos, nulls)
- intermediate/ → Joins entre tabelas
- marts/ → Métricas de negócio prontas para dashboards`
        },
        components: ['dbt', 'Snowflake', 'SQL'],
        diagram: `
┌───────────────┐
│   S3 (Raw)    │
└───────┬───────┘
        │ COPY INTO
        ▼
┌───────────────┐      ┌─────────────────────────────────┐
│   Snowflake   │◄─────│  dbt (transformations)          │
│   (Warehouse) │      │  ├── staging/                   │
│               │      │  ├── intermediate/              │
│               │      │  └── marts/                     │
└───────────────┘      └─────────────────────────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'Capa de Orquestación', en: 'Orchestration Layer', pt: 'Camada de Orquestração' },
        description: {
          es: `Usamos Airflow (MWAA en AWS) para orquestar todo.

DAG principal (corre cada hora):
1. Trigger ingesta desde fuentes
2. Esperar que datos lleguen a S3
3. Ejecutar dbt run (transformaciones)
4. Ejecutar dbt test (validaciones)
5. Notificar a Slack si hay errores

¿Por qué MWAA y no self-hosted?
- Es solo 1 persona manejando todo
- No queremos administrar infraestructura
- MWAA escala automáticamente`,
          en: `We use Airflow (MWAA on AWS) to orchestrate everything.

Main DAG (runs every hour):
1. Trigger ingestion from sources
2. Wait for data to arrive in S3
3. Run dbt run (transformations)
4. Run dbt test (validations)
5. Notify Slack if errors

Why MWAA and not self-hosted?
- It's only 1 person managing everything
- We don't want to manage infrastructure
- MWAA scales automatically`,
          pt: `Usamos Airflow (MWAA na AWS) para orquestrar tudo.

DAG principal (roda a cada hora):
1. Trigger ingestão das fontes
2. Esperar dados chegarem no S3
3. Executar dbt run (transformações)
4. Executar dbt test (validações)
5. Notificar Slack se houver erros

Por que MWAA e não self-hosted?
- É só 1 pessoa gerenciando tudo
- Não queremos administrar infraestrutura
- MWAA escala automaticamente`
        },
        components: ['Airflow', 'MWAA', 'Slack'],
        diagram: `
┌─────────────────────────────────────────────────────┐
│                 Airflow DAG                          │
│  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐   │
│  │Ingest│──▶│Wait │──▶│ dbt │──▶│Test │──▶│Notify│  │
│  │Data │   │ S3  │   │ run │   │     │   │Slack │  │
│  └─────┘   └─────┘   └─────┘   └─────┘   └─────┘   │
└─────────────────────────────────────────────────────┘
                         │
              Corre cada hora (0 * * * *)
        `
      },
      {
        step: 4,
        title: { es: 'Capa de Consumo', en: 'Consumption Layer', pt: 'Camada de Consumo' },
        description: {
          es: `Los datos finales están en Snowflake, listos para consumir:

Dashboard (equipo de ventas):
- Metabase conectado a Snowflake
- Métricas: ventas diarias, productos top, conversión
- Actualización automática cada hora

Reportes (inversores):
- dbt genera las tablas agregadas
- Export a Google Sheets o PDF automático
- Envío semanal por email

Análisis ad-hoc (equipo de datos):
- Conexión directa a Snowflake
- Jupyter notebooks para análisis exploratorio`,
          en: `Final data is in Snowflake, ready to consume:

Dashboard (sales team):
- Metabase connected to Snowflake
- Metrics: daily sales, top products, conversion
- Automatic hourly update

Reports (investors):
- dbt generates aggregated tables
- Auto export to Google Sheets or PDF
- Weekly email delivery

Ad-hoc analysis (data team):
- Direct Snowflake connection
- Jupyter notebooks for exploratory analysis`,
          pt: `Os dados finais estão no Snowflake, prontos para consumir:

Dashboard (time de vendas):
- Metabase conectado ao Snowflake
- Métricas: vendas diárias, produtos top, conversão
- Atualização automática a cada hora

Relatórios (investidores):
- dbt gera as tabelas agregadas
- Export para Google Sheets ou PDF automático
- Envio semanal por email

Análise ad-hoc (time de dados):
- Conexão direta ao Snowflake
- Jupyter notebooks para análise exploratória`
        },
        components: ['Metabase', 'Google Sheets', 'Jupyter'],
        diagram: `
                    ┌───────────────┐
                    │   Snowflake   │
                    │   (marts/)    │
                    └───────┬───────┘
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
          ▼                 ▼                 ▼
   ┌────────────┐   ┌────────────┐   ┌────────────┐
   │  Metabase  │   │  Reports   │   │  Jupyter   │
   │ (Dashboard)│   │  (Weekly)  │   │ (Ad-hoc)   │
   └────────────┘   └────────────┘   └────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Snowflake vs Redshift vs BigQuery', en: 'Snowflake vs Redshift vs BigQuery', pt: 'Snowflake vs Redshift vs BigQuery' },
        option1: { es: 'Snowflake: Más fácil, mejor separación compute/storage, caro a escala', en: 'Snowflake: Easier, better compute/storage separation, expensive at scale', pt: 'Snowflake: Mais fácil, melhor separação compute/storage, caro em escala' },
        option2: { es: 'Redshift: Más barato si ya usás AWS, más complejo de administrar', en: 'Redshift: Cheaper if already on AWS, more complex to manage', pt: 'Redshift: Mais barato se já usa AWS, mais complexo de administrar' },
        recommendation: { es: 'Para startup con 1 DE: Snowflake. La simplicidad vale el costo extra.', en: 'For startup with 1 DE: Snowflake. Simplicity is worth the extra cost.', pt: 'Para startup com 1 DE: Snowflake. A simplicidade vale o custo extra.' }
      },
      {
        decision: { es: 'Batch (cada hora) vs Streaming (tiempo real)', en: 'Batch (hourly) vs Streaming (real-time)', pt: 'Batch (a cada hora) vs Streaming (tempo real)' },
        option1: { es: 'Batch: Más simple, más barato, suficiente para dashboards', en: 'Batch: Simpler, cheaper, enough for dashboards', pt: 'Batch: Mais simples, mais barato, suficiente para dashboards' },
        option2: { es: 'Streaming: Datos al instante, pero 10x más complejo y caro', en: 'Streaming: Instant data, but 10x more complex and expensive', pt: 'Streaming: Dados instantâneos, mas 10x mais complexo e caro' },
        recommendation: { es: 'Empezar con batch. Agregar streaming solo cuando haya un caso de uso real que lo requiera.', en: 'Start with batch. Add streaming only when there\'s a real use case that requires it.', pt: 'Começar com batch. Adicionar streaming só quando houver um caso de uso real que requeira.' }
      },
      {
        decision: { es: 'Airbyte vs Fivetran vs Scripts custom', en: 'Airbyte vs Fivetran vs Custom scripts', pt: 'Airbyte vs Fivetran vs Scripts custom' },
        option1: { es: 'Airbyte: Open source, gratis, muchos conectores', en: 'Airbyte: Open source, free, many connectors', pt: 'Airbyte: Open source, grátis, muitos conectores' },
        option2: { es: 'Fivetran: Más robusto, muy caro ($$$)', en: 'Fivetran: More robust, very expensive ($$$)', pt: 'Fivetran: Mais robusto, muito caro ($$$)' },
        recommendation: { es: 'Airbyte para empezar. Si crecen mucho y tienen budget, migrar a Fivetran.', en: 'Airbyte to start. If they grow a lot and have budget, migrate to Fivetran.', pt: 'Airbyte para começar. Se crescerem muito e tiverem budget, migrar para Fivetran.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No preguntar sobre latencia y asumir que necesitan real-time', en: '❌ Not asking about latency and assuming they need real-time', pt: '❌ Não perguntar sobre latência e assumir que precisam de real-time' },
      { es: '❌ Sobre-ingenierizar: proponer Kafka + Spark para 100K rows/día', en: '❌ Over-engineering: proposing Kafka + Spark for 100K rows/day', pt: '❌ Over-engineering: propor Kafka + Spark para 100K rows/dia' },
      { es: '❌ No considerar el equipo: proponer 5 herramientas para 1 persona', en: '❌ Not considering the team: proposing 5 tools for 1 person', pt: '❌ Não considerar o time: propor 5 ferramentas para 1 pessoa' },
      { es: '❌ Olvidar monitoreo y alertas', en: '❌ Forgetting monitoring and alerts', pt: '❌ Esquecer monitoramento e alertas' },
      { es: '❌ No hablar de costos', en: '❌ Not talking about costs', pt: '❌ Não falar de custos' }
    ],
    interviewerTips: [
      { es: '💡 Siempre empezá preguntando requisitos antes de dibujar', en: '💡 Always start by asking requirements before drawing', pt: '💡 Sempre comece perguntando requisitos antes de desenhar' },
      { es: '💡 Pensá en voz alta - el entrevistador quiere ver tu proceso', en: '💡 Think out loud - the interviewer wants to see your process', pt: '💡 Pense em voz alta - o entrevistador quer ver seu processo' },
      { es: '💡 Dibujá mientras explicás - un diagrama vale más que mil palabras', en: '💡 Draw while explaining - a diagram is worth a thousand words', pt: '💡 Desenhe enquanto explica - um diagrama vale mais que mil palavras' },
      { es: '💡 Mencioná trade-offs sin que te pregunten - demuestra madurez', en: '💡 Mention trade-offs without being asked - shows maturity', pt: '💡 Mencione trade-offs sem que perguntem - demonstra maturidade' },
      { es: '💡 Preguntá si podés usar servicios managed - es pragmático', en: '💡 Ask if you can use managed services - it\'s pragmatic', pt: '💡 Pergunte se pode usar serviços gerenciados - é pragmático' }
    ],
    relatedTopics: ['ETL', 'Data Warehouse', 'dbt', 'Airflow', 'AWS', 'Snowflake'],
    estimatedXP: 500
  },

  // ============ INTERVIEW 2: REAL-TIME FRAUD DETECTION ============
  {
    id: 'sd-fraud-detection',
    title: {
      es: 'Sistema de Detección de Fraude en Tiempo Real',
      en: 'Real-Time Fraud Detection System',
      pt: 'Sistema de Detecção de Fraude em Tempo Real'
    },
    company: 'Fintech / Banco Digital',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['Streaming', 'Kafka', 'Real-time', 'ML', 'AWS'],
    problem: {
      es: `Trabajás para un banco digital que procesa 1 millón de transacciones por día.
Necesitan detectar transacciones fraudulentas en menos de 500ms para poder bloquearlas.

Actualmente tienen un sistema batch que detecta fraude 24 horas después (muy tarde).
El negocio está perdiendo $500K/mes en fraude.

El CTO pregunta: "¿Cómo diseñarías un sistema de detección de fraude en tiempo real?"`,
      en: `You work for a digital bank that processes 1 million transactions per day.
They need to detect fraudulent transactions in under 500ms to block them.

Currently they have a batch system that detects fraud 24 hours later (too late).
The business is losing $500K/month to fraud.

The CTO asks: "How would you design a real-time fraud detection system?"`,
      pt: `Você trabalha para um banco digital que processa 1 milhão de transações por dia.
Eles precisam detectar transações fraudulentas em menos de 500ms para poder bloqueá-las.

Atualmente têm um sistema batch que detecta fraude 24 horas depois (muito tarde).
O negócio está perdendo $500K/mês em fraude.

O CTO pergunta: "Como você projetaria um sistema de detecção de fraude em tempo real?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Qué datos tienen sobre cada transacción?', en: 'What data do you have about each transaction?', pt: 'Quais dados vocês têm sobre cada transação?' },
        whyAsk: { es: 'Define qué features podés usar para el modelo de ML', en: 'Defines what features you can use for the ML model', pt: 'Define quais features você pode usar para o modelo de ML' },
        typicalAnswer: { es: 'Monto, ubicación, merchant, hora, dispositivo, historial del usuario', en: 'Amount, location, merchant, time, device, user history', pt: 'Valor, localização, merchant, hora, dispositivo, histórico do usuário' }
      },
      {
        question: { es: '¿Ya tienen un modelo de ML para fraude o hay que crearlo?', en: 'Do you already have an ML model for fraud or does it need to be created?', pt: 'Já têm um modelo de ML para fraude ou precisa ser criado?' },
        whyAsk: { es: 'Si ya existe el modelo, solo necesitás deployarlo en tiempo real', en: 'If the model exists, you only need to deploy it in real-time', pt: 'Se o modelo já existe, você só precisa deployá-lo em tempo real' },
        typicalAnswer: { es: 'Tenemos un modelo batch en Python que funciona bien. Necesitamos hacerlo real-time.', en: 'We have a batch Python model that works well. We need to make it real-time.', pt: 'Temos um modelo batch em Python que funciona bem. Precisamos torná-lo real-time.' }
      },
      {
        question: { es: '¿Cuál es el false positive rate aceptable?', en: 'What false positive rate is acceptable?', pt: 'Qual é a taxa de falso positivo aceitável?' },
        whyAsk: { es: 'Bloquear transacciones legítimas es tan malo como dejar pasar fraude', en: 'Blocking legitimate transactions is as bad as letting fraud through', pt: 'Bloquear transações legítimas é tão ruim quanto deixar passar fraude' },
        typicalAnswer: { es: 'Menos del 1% de false positives. Preferimos dejar pasar algo de fraude que bloquear clientes legítimos.', en: 'Less than 1% false positives. We prefer to let some fraud through than block legitimate customers.', pt: 'Menos de 1% de falsos positivos. Preferimos deixar passar algum fraude do que bloquear clientes legítimos.' }
      },
      {
        question: { es: '¿Qué pasa si el sistema de ML está caído? ¿Bloqueamos todo?', en: 'What happens if the ML system is down? Do we block everything?', pt: 'O que acontece se o sistema de ML estiver fora? Bloqueamos tudo?' },
        whyAsk: { es: 'Define la estrategia de fallback - crítico para sistemas financieros', en: 'Defines fallback strategy - critical for financial systems', pt: 'Define a estratégia de fallback - crítico para sistemas financeiros' },
        typicalAnswer: { es: 'Si el sistema está caído, dejamos pasar transacciones pequeñas (<$100) y bloqueamos grandes.', en: 'If system is down, we let small transactions (<$100) through and block large ones.', pt: 'Se o sistema estiver fora, deixamos passar transações pequenas (<$100) e bloqueamos grandes.' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Procesar cada transacción en menos de 500ms', en: 'Process each transaction in under 500ms', pt: 'Processar cada transação em menos de 500ms' },
        { es: 'Aplicar modelo de ML para scoring de riesgo', en: 'Apply ML model for risk scoring', pt: 'Aplicar modelo de ML para scoring de risco' },
        { es: 'Bloquear automáticamente transacciones de alto riesgo', en: 'Automatically block high-risk transactions', pt: 'Bloquear automaticamente transações de alto risco' },
        { es: 'Alertar al equipo de fraude para revisión manual', en: 'Alert fraud team for manual review', pt: 'Alertar o time de fraude para revisão manual' },
        { es: 'Guardar historial para reentrenar el modelo', en: 'Save history to retrain the model', pt: 'Salvar histórico para retreinar o modelo' }
      ],
      nonFunctional: [
        { es: 'Latencia p99 < 500ms', en: 'p99 latency < 500ms', pt: 'Latência p99 < 500ms' },
        { es: 'Disponibilidad 99.99% (4 minutos de downtime/mes)', en: 'Availability 99.99% (4 minutes downtime/month)', pt: 'Disponibilidade 99.99% (4 minutos de downtime/mês)' },
        { es: 'Escalable a 10M transacciones/día', en: 'Scalable to 10M transactions/day', pt: 'Escalável a 10M transações/dia' },
        { es: 'Fallback si el ML falla', en: 'Fallback if ML fails', pt: 'Fallback se o ML falhar' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Arquitectura General', en: 'General Architecture', pt: 'Arquitetura Geral' },
        description: {
          es: `El flujo es: Transacción → Kafka → ML Service → Decisión → Response

Usamos Kafka como message broker porque:
- Puede manejar millones de mensajes/segundo
- Garantiza que no se pierden mensajes
- Permite replay si algo falla
- Desacopla el sistema de pagos del sistema de ML`,
          en: `The flow is: Transaction → Kafka → ML Service → Decision → Response

We use Kafka as message broker because:
- Can handle millions of messages/second
- Guarantees no messages are lost
- Allows replay if something fails
- Decouples payment system from ML system`,
          pt: `O fluxo é: Transação → Kafka → ML Service → Decisão → Response

Usamos Kafka como message broker porque:
- Pode lidar com milhões de mensagens/segundo
- Garante que não se perdem mensagens
- Permite replay se algo falhar
- Desacopla o sistema de pagamentos do sistema de ML`
        },
        components: ['Kafka', 'MSK', 'API Gateway'],
        diagram: `
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Payment    │────▶│    Kafka     │────▶│  ML Scoring  │────▶│   Decision   │
│   Service    │     │    (MSK)     │     │   Service    │     │   Service    │
└──────────────┘     └──────────────┘     └──────────────┘     └──────┬───────┘
                                                                       │
                                          ┌────────────────────────────┤
                                          │                            │
                                          ▼                            ▼
                                   ┌────────────┐              ┌────────────┐
                                   │   BLOCK    │              │   ALLOW    │
                                   └────────────┘              └────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Feature Store (Datos en Tiempo Real)', en: 'Feature Store (Real-Time Data)', pt: 'Feature Store (Dados em Tempo Real)' },
        description: {
          es: `El modelo de ML necesita features del usuario en tiempo real:
- Cantidad de transacciones en últimas 24h
- Monto total gastado hoy
- Ubicaciones recientes
- Dispositivos usados

Usamos Redis como Feature Store porque:
- Latencia < 1ms
- Podemos pre-computar features
- TTL para datos que expiran

Cada transacción:
1. Llega a Kafka
2. Consulta Redis para features del usuario
3. Envía features + transacción al modelo`,
          en: `The ML model needs real-time user features:
- Number of transactions in last 24h
- Total amount spent today
- Recent locations
- Devices used

We use Redis as Feature Store because:
- Latency < 1ms
- We can pre-compute features
- TTL for expiring data

Each transaction:
1. Arrives at Kafka
2. Queries Redis for user features
3. Sends features + transaction to model`,
          pt: `O modelo de ML precisa de features do usuário em tempo real:
- Quantidade de transações nas últimas 24h
- Valor total gasto hoje
- Localizações recentes
- Dispositivos usados

Usamos Redis como Feature Store porque:
- Latência < 1ms
- Podemos pré-computar features
- TTL para dados que expiram

Cada transação:
1. Chega no Kafka
2. Consulta Redis para features do usuário
3. Envia features + transação para o modelo`
        },
        components: ['Redis', 'ElastiCache', 'Feature Store'],
        diagram: `
┌──────────────┐     ┌──────────────┐
│  Transaction │────▶│    Kafka     │
└──────────────┘     └──────┬───────┘
                            │
                            ▼
                     ┌──────────────┐     ┌──────────────┐
                     │   Feature    │────▶│    Redis     │
                     │  Enrichment  │◀────│ (Features)   │
                     └──────┬───────┘     └──────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  ML Service  │
                     └──────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'ML Scoring Service', en: 'ML Scoring Service', pt: 'ML Scoring Service' },
        description: {
          es: `El modelo corre en un servicio dedicado:

Opción 1: SageMaker Endpoint
- Managed, auto-scaling
- Más caro pero menos mantenimiento

Opción 2: EKS con modelo en container
- Más control, más barato a escala
- Necesita más DevOps

Para empezar: SageMaker Endpoint con auto-scaling.

El servicio:
1. Recibe features
2. Aplica el modelo (inferencia ~50ms)
3. Devuelve score de riesgo (0-100)
4. Score > 80 → BLOCK
5. Score 50-80 → REVIEW
6. Score < 50 → ALLOW`,
          en: `The model runs in a dedicated service:

Option 1: SageMaker Endpoint
- Managed, auto-scaling
- More expensive but less maintenance

Option 2: EKS with model in container
- More control, cheaper at scale
- Needs more DevOps

To start: SageMaker Endpoint with auto-scaling.

The service:
1. Receives features
2. Applies the model (inference ~50ms)
3. Returns risk score (0-100)
4. Score > 80 → BLOCK
5. Score 50-80 → REVIEW
6. Score < 50 → ALLOW`,
          pt: `O modelo roda em um serviço dedicado:

Opção 1: SageMaker Endpoint
- Managed, auto-scaling
- Mais caro mas menos manutenção

Opção 2: EKS com modelo em container
- Mais controle, mais barato em escala
- Precisa de mais DevOps

Para começar: SageMaker Endpoint com auto-scaling.

O serviço:
1. Recebe features
2. Aplica o modelo (inferência ~50ms)
3. Retorna score de risco (0-100)
4. Score > 80 → BLOCK
5. Score 50-80 → REVIEW
6. Score < 50 → ALLOW`
        },
        components: ['SageMaker', 'EKS', 'Docker'],
        diagram: `
┌─────────────────────────────────────────────────────┐
│               ML Scoring Service                     │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐           │
│  │ Feature │──▶│  Model  │──▶│  Score  │           │
│  │ Vector  │   │Inference│   │ 0-100   │           │
│  └─────────┘   └─────────┘   └────┬────┘           │
│                                   │                 │
│              ┌────────────────────┼────────────────┐│
│              │                    │                ││
│              ▼                    ▼                ▼│
│         ┌────────┐          ┌────────┐       ┌────────┐
│         │ BLOCK  │          │ REVIEW │       │ ALLOW  │
│         │ (>80)  │          │(50-80) │       │ (<50)  │
│         └────────┘          └────────┘       └────────┘
└─────────────────────────────────────────────────────┘
        `
      },
      {
        step: 4,
        title: { es: 'Monitoreo y Feedback Loop', en: 'Monitoring and Feedback Loop', pt: 'Monitoramento e Feedback Loop' },
        description: {
          es: `Crítico para un sistema de ML en producción:

Monitoreo en tiempo real:
- Latencia p50, p95, p99
- Tasa de bloqueo vs allow
- False positives reportados
- Drift del modelo (accuracy decayendo)

Feedback loop para mejorar:
1. Transacciones bloqueadas → Revisión manual
2. Usuario reporta "no fui yo" → Etiqueta como fraude
3. Datos vuelven al data lake
4. Reentrenamiento del modelo (semanal)

Alertas:
- Si latencia > 400ms
- Si tasa de bloqueo sube 2x
- Si modelo no responde`,
          en: `Critical for an ML system in production:

Real-time monitoring:
- Latency p50, p95, p99
- Block vs allow rate
- Reported false positives
- Model drift (accuracy decaying)

Feedback loop for improvement:
1. Blocked transactions → Manual review
2. User reports "wasn't me" → Label as fraud
3. Data goes back to data lake
4. Model retraining (weekly)

Alerts:
- If latency > 400ms
- If block rate increases 2x
- If model doesn't respond`,
          pt: `Crítico para um sistema de ML em produção:

Monitoramento em tempo real:
- Latência p50, p95, p99
- Taxa de block vs allow
- Falsos positivos reportados
- Drift do modelo (accuracy decaindo)

Feedback loop para melhorar:
1. Transações bloqueadas → Revisão manual
2. Usuário reporta "não fui eu" → Etiqueta como fraude
3. Dados voltam ao data lake
4. Retreinamento do modelo (semanal)

Alertas:
- Se latência > 400ms
- Se taxa de block sobe 2x
- Se modelo não responde`
        },
        components: ['CloudWatch', 'Grafana', 'PagerDuty'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                    Feedback Loop                         │
│                                                          │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │ Blocked  │───▶│  Manual  │───▶│  Label   │          │
│  │   Txn    │    │  Review  │    │  Data    │          │
│  └──────────┘    └──────────┘    └────┬─────┘          │
│                                       │                 │
│                                       ▼                 │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐          │
│  │   New    │◀───│ Retrain  │◀───│   Data   │          │
│  │  Model   │    │  Weekly  │    │   Lake   │          │
│  └──────────┘    └──────────┘    └──────────┘          │
└─────────────────────────────────────────────────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Kafka vs Kinesis vs SQS', en: 'Kafka vs Kinesis vs SQS', pt: 'Kafka vs Kinesis vs SQS' },
        option1: { es: 'Kafka (MSK): Más flexible, replay infinito, más complejo', en: 'Kafka (MSK): More flexible, infinite replay, more complex', pt: 'Kafka (MSK): Mais flexível, replay infinito, mais complexo' },
        option2: { es: 'Kinesis: Full AWS, más simple, retención limitada (7 días)', en: 'Kinesis: Full AWS, simpler, limited retention (7 days)', pt: 'Kinesis: Full AWS, mais simples, retenção limitada (7 dias)' },
        recommendation: { es: 'Para fraude: Kafka por el replay infinito. Podés re-procesar meses de datos si encontrás un bug.', en: 'For fraud: Kafka for infinite replay. You can re-process months of data if you find a bug.', pt: 'Para fraude: Kafka pelo replay infinito. Você pode re-processar meses de dados se encontrar um bug.' }
      },
      {
        decision: { es: 'SageMaker Endpoint vs Self-hosted', en: 'SageMaker Endpoint vs Self-hosted', pt: 'SageMaker Endpoint vs Self-hosted' },
        option1: { es: 'SageMaker: $$$, pero managed, auto-scaling, A/B testing built-in', en: 'SageMaker: $$$, but managed, auto-scaling, A/B testing built-in', pt: 'SageMaker: $$$, mas managed, auto-scaling, A/B testing built-in' },
        option2: { es: 'EKS self-hosted: Más barato, más control, más trabajo de DevOps', en: 'EKS self-hosted: Cheaper, more control, more DevOps work', pt: 'EKS self-hosted: Mais barato, mais controle, mais trabalho de DevOps' },
        recommendation: { es: 'Empezar con SageMaker. Migrar a self-hosted solo si el costo se vuelve prohibitivo.', en: 'Start with SageMaker. Migrate to self-hosted only if cost becomes prohibitive.', pt: 'Começar com SageMaker. Migrar para self-hosted só se o custo se tornar proibitivo.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Olvidar el fallback si ML falla - las transacciones deben seguir procesándose', en: '❌ Forgetting fallback if ML fails - transactions must keep processing', pt: '❌ Esquecer o fallback se ML falhar - as transações devem continuar sendo processadas' },
      { es: '❌ No considerar el cold start - primera request a modelo recién deployado es lenta', en: '❌ Not considering cold start - first request to newly deployed model is slow', pt: '❌ Não considerar o cold start - primeira request a modelo recém deployado é lenta' },
      { es: '❌ Procesar features en el request path - pre-computar en Redis', en: '❌ Computing features in request path - pre-compute in Redis', pt: '❌ Processar features no request path - pré-computar no Redis' },
      { es: '❌ No tener un feedback loop para mejorar el modelo', en: '❌ Not having a feedback loop to improve the model', pt: '❌ Não ter um feedback loop para melhorar o modelo' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná latencia específica (500ms) y cómo cada componente contribuye', en: '💡 Mention specific latency (500ms) and how each component contributes', pt: '💡 Mencione latência específica (500ms) e como cada componente contribui' },
      { es: '💡 Hablá del fallback antes de que te pregunten - es crítico en fintech', en: '💡 Talk about fallback before they ask - it\'s critical in fintech', pt: '💡 Fale do fallback antes que perguntem - é crítico em fintech' },
      { es: '💡 Mencioná compliance (PCI-DSS) si aplica', en: '💡 Mention compliance (PCI-DSS) if applicable', pt: '💡 Mencione compliance (PCI-DSS) se aplicável' },
      { es: '💡 El feedback loop para ML es diferenciador - demuestra que pensás a largo plazo', en: '💡 The ML feedback loop is a differentiator - shows you think long-term', pt: '💡 O feedback loop para ML é diferenciador - demonstra que você pensa a longo prazo' }
    ],
    relatedTopics: ['Kafka', 'Streaming', 'ML', 'Redis', 'SageMaker', 'AWS'],
    estimatedXP: 750
  },

  // ============ INTERVIEW 3: DATA LAKE MIGRATION ============
  {
    id: 'sd-data-lake-migration',
    title: {
      es: 'Migración de Data Warehouse a Data Lake',
      en: 'Data Warehouse to Data Lake Migration',
      pt: 'Migração de Data Warehouse para Data Lake'
    },
    company: 'Enterprise / Empresa grande',
    difficulty: 'senior',
    duration: '60 min',
    tags: ['Migration', 'Data Lake', 'Delta Lake', 'Spark', 'Strategy'],
    problem: {
      es: `Una empresa de retail con 15 años de historia tiene todo en un Data Warehouse on-premise (Oracle).
Tienen 50TB de datos históricos y el sistema está llegando al límite de capacidad.
Quieren migrar a la nube y modernizar su arquitectura.

Restricciones:
- No pueden tener downtime - el negocio depende de los reportes diarios
- Tienen 20 años de SQL legacy que no pueden reescribir todo
- Budget de $2M para el proyecto
- Timeline: 18 meses

El CTO pregunta: "¿Cómo diseñarías la estrategia de migración?"`,
      en: `A retail company with 15 years of history has everything in an on-premise Data Warehouse (Oracle).
They have 50TB of historical data and the system is reaching capacity limits.
They want to migrate to cloud and modernize their architecture.

Constraints:
- No downtime allowed - business depends on daily reports
- They have 20 years of legacy SQL they can't rewrite entirely
- Budget of $2M for the project
- Timeline: 18 months

The CTO asks: "How would you design the migration strategy?"`,
      pt: `Uma empresa de varejo com 15 anos de história tem tudo em um Data Warehouse on-premise (Oracle).
Eles têm 50TB de dados históricos e o sistema está chegando ao limite de capacidade.
Querem migrar para cloud e modernizar sua arquitetura.

Restrições:
- Não podem ter downtime - o negócio depende dos relatórios diários
- Têm 20 anos de SQL legacy que não podem reescrever tudo
- Budget de $2M para o projeto
- Timeline: 18 meses

O CTO pergunta: "Como você projetaria a estratégia de migração?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuántas tablas y procedimientos tienen?', en: 'How many tables and procedures do you have?', pt: 'Quantas tabelas e procedures vocês têm?' },
        whyAsk: { es: 'Define el scope del proyecto y si es viable en 18 meses', en: 'Defines project scope and if it\'s viable in 18 months', pt: 'Define o escopo do projeto e se é viável em 18 meses' },
        typicalAnswer: { es: '500 tablas, 200 stored procedures, 50 ETL jobs en Informatica', en: '500 tables, 200 stored procedures, 50 ETL jobs in Informatica', pt: '500 tabelas, 200 stored procedures, 50 ETL jobs em Informatica' }
      },
      {
        question: { es: '¿Qué tan críticos son los datos? ¿Hay datos que no se pueden perder?', en: 'How critical is the data? Is there data that cannot be lost?', pt: 'Quão críticos são os dados? Há dados que não podem ser perdidos?' },
        whyAsk: { es: 'Define la estrategia de backup y rollback', en: 'Defines backup and rollback strategy', pt: 'Define a estratégia de backup e rollback' },
        typicalAnswer: { es: 'Datos de ventas y clientes son críticos. Logs históricos pueden perderse sin impacto.', en: 'Sales and customer data is critical. Historical logs can be lost without impact.', pt: 'Dados de vendas e clientes são críticos. Logs históricos podem ser perdidos sem impacto.' }
      },
      {
        question: { es: '¿Tienen equipo interno o van a contratar?', en: 'Do you have an internal team or will you hire?', pt: 'Têm equipe interna ou vão contratar?' },
        whyAsk: { es: 'Define si pueden hacer el trabajo o necesitan consultora', en: 'Defines if they can do the work or need a consultancy', pt: 'Define se podem fazer o trabalho ou precisam de consultoria' },
        typicalAnswer: { es: '5 DEs internos con conocimiento de Oracle. Podemos contratar 2-3 más.', en: '5 internal DEs with Oracle knowledge. We can hire 2-3 more.', pt: '5 DEs internos com conhecimento de Oracle. Podemos contratar 2-3 mais.' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Migrar 50TB de datos históricos a cloud', en: 'Migrate 50TB of historical data to cloud', pt: 'Migrar 50TB de dados históricos para cloud' },
        { es: 'Mantener compatibilidad con SQL existente donde sea posible', en: 'Maintain compatibility with existing SQL where possible', pt: 'Manter compatibilidade com SQL existente onde possível' },
        { es: 'Zero downtime para reportes del negocio', en: 'Zero downtime for business reports', pt: 'Zero downtime para relatórios do negócio' },
        { es: 'Mejorar performance de queries actuales', en: 'Improve performance of current queries', pt: 'Melhorar performance das queries atuais' }
      ],
      nonFunctional: [
        { es: 'Timeline: 18 meses máximo', en: 'Timeline: 18 months maximum', pt: 'Timeline: 18 meses máximo' },
        { es: 'Budget: $2M incluyendo cloud costs del primer año', en: 'Budget: $2M including first year cloud costs', pt: 'Budget: $2M incluindo custos de cloud do primeiro ano' },
        { es: 'Capacidad de rollback si algo sale mal', en: 'Rollback capability if something goes wrong', pt: 'Capacidade de rollback se algo der errado' },
        { es: 'Escalable a 500TB en los próximos 5 años', en: 'Scalable to 500TB in the next 5 years', pt: 'Escalável a 500TB nos próximos 5 anos' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Fase 0: Assessment y Planning (Mes 1-2)', en: 'Phase 0: Assessment and Planning (Month 1-2)', pt: 'Fase 0: Assessment e Planning (Mês 1-2)' },
        description: {
          es: `Antes de migrar nada, necesitamos entender qué tenemos:

1. Inventario de assets:
   - Catalogar las 500 tablas (tamaño, uso, dependencias)
   - Documentar los 200 stored procedures
   - Mapear los 50 ETL jobs

2. Análisis de uso:
   - ¿Qué tablas se usan diariamente?
   - ¿Cuáles no se tocaron en 2 años?
   - ¿Qué queries son más lentos?

3. Priorización:
   - Tier 1: Crítico para el negocio (migrar primero)
   - Tier 2: Importante pero no urgente
   - Tier 3: Nice to have / deprecar

Output: Documento de 50 páginas con plan detallado y risks.`,
          en: `Before migrating anything, we need to understand what we have:

1. Asset inventory:
   - Catalog the 500 tables (size, usage, dependencies)
   - Document the 200 stored procedures
   - Map the 50 ETL jobs

2. Usage analysis:
   - What tables are used daily?
   - Which haven't been touched in 2 years?
   - What queries are slowest?

3. Prioritization:
   - Tier 1: Business critical (migrate first)
   - Tier 2: Important but not urgent
   - Tier 3: Nice to have / deprecate

Output: 50-page document with detailed plan and risks.`,
          pt: `Antes de migrar nada, precisamos entender o que temos:

1. Inventário de assets:
   - Catalogar as 500 tabelas (tamanho, uso, dependências)
   - Documentar os 200 stored procedures
   - Mapear os 50 ETL jobs

2. Análise de uso:
   - Quais tabelas são usadas diariamente?
   - Quais não foram tocadas em 2 anos?
   - Quais queries são mais lentas?

3. Priorização:
   - Tier 1: Crítico para o negócio (migrar primeiro)
   - Tier 2: Importante mas não urgente
   - Tier 3: Nice to have / deprecar

Output: Documento de 50 páginas com plano detalhado e riscos.`
        },
        components: ['Excel', 'Documentation', 'Stakeholder meetings'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                 Assessment Output                        │
│  ┌─────────────────────────────────────────────────────┐│
│  │ Tier 1 (Critical)    │ 50 tables  │ Migrate first  ││
│  │ Tier 2 (Important)   │ 200 tables │ Month 6-12     ││
│  │ Tier 3 (Deprecate)   │ 250 tables │ Archive/delete ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Fase 1: Dual-Write Architecture (Mes 3-6)', en: 'Phase 1: Dual-Write Architecture (Month 3-6)', pt: 'Fase 1: Arquitetura Dual-Write (Mês 3-6)' },
        description: {
          es: `La clave para zero downtime: Dual-Write.

Estrategia:
1. Configurar Data Lake en AWS (S3 + Delta Lake)
2. Todos los nuevos datos van a AMBOS sistemas
3. Oracle sigue siendo el "source of truth"
4. El Data Lake es "read replica" por ahora

Tecnología:
- AWS DMS para CDC (captura de cambios)
- DMS escribe a S3 en formato Parquet
- Delta Lake encima de S3 para ACID transactions
- Databricks/EMR para procesar

Esto nos da:
- Rollback fácil (Oracle sigue funcionando)
- Podemos comparar resultados (Oracle vs Data Lake)
- Cero riesgo para el negocio`,
          en: `The key to zero downtime: Dual-Write.

Strategy:
1. Set up Data Lake in AWS (S3 + Delta Lake)
2. All new data goes to BOTH systems
3. Oracle remains the "source of truth"
4. Data Lake is "read replica" for now

Technology:
- AWS DMS for CDC (change data capture)
- DMS writes to S3 in Parquet format
- Delta Lake on top of S3 for ACID transactions
- Databricks/EMR for processing

This gives us:
- Easy rollback (Oracle keeps working)
- We can compare results (Oracle vs Data Lake)
- Zero risk for the business`,
          pt: `A chave para zero downtime: Dual-Write.

Estratégia:
1. Configurar Data Lake na AWS (S3 + Delta Lake)
2. Todos os novos dados vão para AMBOS sistemas
3. Oracle continua sendo o "source of truth"
4. O Data Lake é "read replica" por agora

Tecnologia:
- AWS DMS para CDC (captura de mudanças)
- DMS escreve no S3 em formato Parquet
- Delta Lake em cima do S3 para ACID transactions
- Databricks/EMR para processar

Isso nos dá:
- Rollback fácil (Oracle continua funcionando)
- Podemos comparar resultados (Oracle vs Data Lake)
- Zero risco para o negócio`
        },
        components: ['AWS DMS', 'S3', 'Delta Lake', 'Databricks'],
        diagram: `
                    ┌──────────────────┐
                    │   Source Systems │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐   ┌──────────┐
       │  Oracle  │   │  Oracle  │   │  AWS S3  │
       │  (Live)  │   │  (Live)  │   │(Data Lake)│
       └──────────┘   └──────────┘   └──────────┘
              ▲              │              │
              │              │ DMS CDC      │
              │              └──────────────┘
              │
        Source of Truth
        (for now)
        `
      },
      {
        step: 3,
        title: { es: 'Fase 2: Historical Data Migration (Mes 4-9)', en: 'Phase 2: Historical Data Migration (Month 4-9)', pt: 'Fase 2: Migração de Dados Históricos (Mês 4-9)' },
        description: {
          es: `Mientras dual-write corre, migramos los 50TB históricos:

Estrategia por volumen:
- Tablas < 1GB: Export directo a Parquet
- Tablas 1-10GB: AWS DMS full load
- Tablas > 10GB: Spark job paralelo (particionar por fecha)

Proceso:
1. Exportar tabla de Oracle
2. Convertir a Parquet (mejor compresión)
3. Cargar a S3
4. Registrar en Delta Lake
5. Validar conteo de rows
6. Validar checksums en columnas críticas

Paralelización:
- 10 tablas en paralelo
- Corre en horario nocturno (menos impacto)
- Estimado: 6 meses para todo`,
          en: `While dual-write runs, we migrate the 50TB of historical data:

Strategy by volume:
- Tables < 1GB: Direct export to Parquet
- Tables 1-10GB: AWS DMS full load
- Tables > 10GB: Parallel Spark job (partition by date)

Process:
1. Export table from Oracle
2. Convert to Parquet (better compression)
3. Load to S3
4. Register in Delta Lake
5. Validate row count
6. Validate checksums on critical columns

Parallelization:
- 10 tables in parallel
- Runs at night (less impact)
- Estimated: 6 months for everything`,
          pt: `Enquanto dual-write roda, migramos os 50TB históricos:

Estratégia por volume:
- Tabelas < 1GB: Export direto para Parquet
- Tabelas 1-10GB: AWS DMS full load
- Tabelas > 10GB: Spark job paralelo (particionar por data)

Processo:
1. Exportar tabela do Oracle
2. Converter para Parquet (melhor compressão)
3. Carregar no S3
4. Registrar no Delta Lake
5. Validar contagem de rows
6. Validar checksums em colunas críticas

Paralelização:
- 10 tabelas em paralelo
- Roda em horário noturno (menos impacto)
- Estimado: 6 meses para tudo`
        },
        components: ['Spark', 'Parquet', 'AWS DMS'],
        diagram: `
┌──────────────────────────────────────────────────────┐
│              Historical Migration Pipeline            │
│                                                       │
│  Oracle ──▶ Export ──▶ Parquet ──▶ S3 ──▶ Validate  │
│    │                                          │       │
│    │         ┌────────────────────────────────┘       │
│    │         ▼                                        │
│    │    ┌──────────┐                                 │
│    └───▶│ Checksum │ ← If mismatch, re-run           │
│         │  Compare │                                 │
│         └──────────┘                                 │
└──────────────────────────────────────────────────────┘
        `
      },
      {
        step: 4,
        title: { es: 'Fase 3: Query Migration y Cutover (Mes 10-18)', en: 'Phase 3: Query Migration and Cutover (Month 10-18)', pt: 'Fase 3: Migração de Queries e Cutover (Mês 10-18)' },
        description: {
          es: `Una vez que los datos están en el Data Lake, migramos las queries:

Estrategia:
1. Stored procedures críticos → dbt models
2. Reportes en SQL → Mantener en SQL (Databricks SQL)
3. ETL en Informatica → Airflow + Spark

Cutover gradual:
- Semana 1-4: 10% del tráfico al Data Lake
- Semana 5-8: 50% del tráfico
- Semana 9-12: 90% del tráfico
- Semana 13+: 100% (apagar Oracle)

Rollback plan:
- Si hay problemas, volver a Oracle en < 1 hora
- Mantener Oracle en "warm standby" por 3 meses post-migración`,
          en: `Once data is in the Data Lake, we migrate queries:

Strategy:
1. Critical stored procedures → dbt models
2. SQL reports → Keep in SQL (Databricks SQL)
3. ETL in Informatica → Airflow + Spark

Gradual cutover:
- Week 1-4: 10% traffic to Data Lake
- Week 5-8: 50% traffic
- Week 9-12: 90% traffic
- Week 13+: 100% (turn off Oracle)

Rollback plan:
- If problems, return to Oracle in < 1 hour
- Keep Oracle in "warm standby" for 3 months post-migration`,
          pt: `Uma vez que os dados estão no Data Lake, migramos as queries:

Estratégia:
1. Stored procedures críticos → modelos dbt
2. Relatórios em SQL → Manter em SQL (Databricks SQL)
3. ETL em Informatica → Airflow + Spark

Cutover gradual:
- Semana 1-4: 10% do tráfego para Data Lake
- Semana 5-8: 50% do tráfego
- Semana 9-12: 90% do tráfego
- Semana 13+: 100% (desligar Oracle)

Plano de rollback:
- Se houver problemas, voltar ao Oracle em < 1 hora
- Manter Oracle em "warm standby" por 3 meses pós-migração`
        },
        components: ['dbt', 'Airflow', 'Databricks SQL'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                 Gradual Cutover                          │
│                                                          │
│  Week 1-4:    [██░░░░░░░░] 10%   → Monitor closely      │
│  Week 5-8:    [█████░░░░░] 50%   → Compare results      │
│  Week 9-12:   [█████████░] 90%   → Confidence high      │
│  Week 13+:    [██████████] 100%  → Oracle off           │
│                                                          │
│  ⚠️ Rollback: Oracle warm standby for 3 months         │
└─────────────────────────────────────────────────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Big Bang vs Gradual Migration', en: 'Big Bang vs Gradual Migration', pt: 'Big Bang vs Migração Gradual' },
        option1: { es: 'Big Bang: Más rápido, más riesgo, todo de una vez', en: 'Big Bang: Faster, more risk, all at once', pt: 'Big Bang: Mais rápido, mais risco, tudo de uma vez' },
        option2: { es: 'Gradual: Más lento, menos riesgo, rollback fácil', en: 'Gradual: Slower, less risk, easy rollback', pt: 'Gradual: Mais lento, menos risco, rollback fácil' },
        recommendation: { es: 'Para 50TB y 500 tablas: Gradual. El riesgo de big bang es demasiado alto.', en: 'For 50TB and 500 tables: Gradual. Big bang risk is too high.', pt: 'Para 50TB e 500 tabelas: Gradual. O risco de big bang é muito alto.' }
      },
      {
        decision: { es: 'Rewrite vs Lift-and-Shift', en: 'Rewrite vs Lift-and-Shift', pt: 'Rewrite vs Lift-and-Shift' },
        option1: { es: 'Rewrite: Mejor arquitectura, pero 3x tiempo y costo', en: 'Rewrite: Better architecture, but 3x time and cost', pt: 'Rewrite: Melhor arquitetura, mas 3x tempo e custo' },
        option2: { es: 'Lift-and-Shift: Más rápido, pero arrastrás deuda técnica', en: 'Lift-and-Shift: Faster, but you carry technical debt', pt: 'Lift-and-Shift: Mais rápido, mas arrasta dívida técnica' },
        recommendation: { es: 'Híbrido: Lift-and-shift para 80%, rewrite para el 20% crítico.', en: 'Hybrid: Lift-and-shift for 80%, rewrite for critical 20%.', pt: 'Híbrido: Lift-and-shift para 80%, rewrite para os 20% críticos.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Subestimar el tiempo de validación de datos', en: '❌ Underestimating data validation time', pt: '❌ Subestimar o tempo de validação de dados' },
      { es: '❌ No tener plan de rollback', en: '❌ Not having a rollback plan', pt: '❌ Não ter plano de rollback' },
      { es: '❌ Intentar migrar todo de una vez', en: '❌ Trying to migrate everything at once', pt: '❌ Tentar migrar tudo de uma vez' },
      { es: '❌ Olvidar los stored procedures y solo pensar en tablas', en: '❌ Forgetting stored procedures and only thinking about tables', pt: '❌ Esquecer os stored procedures e só pensar em tabelas' },
      { es: '❌ No involucrar a los usuarios de negocio en las validaciones', en: '❌ Not involving business users in validations', pt: '❌ Não envolver os usuários de negócio nas validações' }
    ],
    interviewerTips: [
      { es: '💡 Empezá por el assessment - demuestra que no te lanzás a codear sin entender', en: '💡 Start with assessment - shows you don\'t jump to coding without understanding', pt: '💡 Comece pelo assessment - demonstra que você não pula para codear sem entender' },
      { es: '💡 Dual-write es la clave para zero downtime - explicalo bien', en: '💡 Dual-write is the key to zero downtime - explain it well', pt: '💡 Dual-write é a chave para zero downtime - explique bem' },
      { es: '💡 Mencioná validación de datos - es el 50% del trabajo real', en: '💡 Mention data validation - it\'s 50% of the real work', pt: '💡 Mencione validação de dados - é 50% do trabalho real' },
      { es: '💡 Tener un rollback plan demuestra madurez senior', en: '💡 Having a rollback plan shows senior maturity', pt: '💡 Ter um plano de rollback demonstra maturidade senior' }
    ],
    relatedTopics: ['Migration', 'Data Lake', 'Delta Lake', 'AWS DMS', 'Spark', 'Enterprise'],
    estimatedXP: 1000
  },

  // ============ INTERVIEW 4: CDC PIPELINE ============
  {
    id: 'sd-cdc-pipeline',
    title: {
      es: 'Pipeline de Change Data Capture (CDC)',
      en: 'Change Data Capture (CDC) Pipeline',
      pt: 'Pipeline de Change Data Capture (CDC)'
    },
    company: 'SaaS / Startup Tech',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['CDC', 'Debezium', 'Kafka', 'Real-time', 'PostgreSQL'],
    problem: {
      es: `Una startup SaaS tiene su aplicación principal en PostgreSQL con 50 tablas críticas.
Necesitan sincronizar estos datos en near-real-time con:
1. Un Data Warehouse (Snowflake) para analytics
2. Un sistema de búsqueda (Elasticsearch) para la app
3. Un cache (Redis) para datos de usuarios

Actualmente hacen un dump diario que tarda 4 horas y causa locks en producción.

El CTO pregunta: "¿Cómo diseñarías un pipeline CDC para sincronizar en tiempo real sin afectar producción?"`,
      en: `A SaaS startup has their main application on PostgreSQL with 50 critical tables.
They need to sync this data in near-real-time with:
1. A Data Warehouse (Snowflake) for analytics
2. A search system (Elasticsearch) for the app
3. A cache (Redis) for user data

Currently they do a daily dump that takes 4 hours and causes locks in production.

The CTO asks: "How would you design a CDC pipeline to sync in real-time without affecting production?"`,
      pt: `Uma startup SaaS tem sua aplicação principal em PostgreSQL com 50 tabelas críticas.
Eles precisam sincronizar esses dados em near-real-time com:
1. Um Data Warehouse (Snowflake) para analytics
2. Um sistema de busca (Elasticsearch) para a app
3. Um cache (Redis) para dados de usuários

Atualmente fazem um dump diário que leva 4 horas e causa locks em produção.

O CTO pergunta: "Como você projetaria um pipeline CDC para sincronizar em tempo real sem afetar produção?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuál es el volumen de cambios por segundo?', en: 'What is the volume of changes per second?', pt: 'Qual é o volume de mudanças por segundo?' },
        whyAsk: { es: 'Define el sizing de Kafka y si necesitamos particionamiento', en: 'Defines Kafka sizing and if we need partitioning', pt: 'Define o dimensionamento do Kafka e se precisamos de particionamento' },
        typicalAnswer: { es: 'Unos 1000 cambios/segundo en picos, 100/segundo promedio', en: 'About 1000 changes/second at peak, 100/second average', pt: 'Uns 1000 mudanças/segundo em picos, 100/segundo em média' }
      },
      {
        question: { es: '¿Necesitan garantía de orden en los cambios?', en: 'Do you need ordering guarantees on changes?', pt: 'Precisam de garantia de ordem nas mudanças?' },
        whyAsk: { es: 'Si el orden importa, necesitamos partición por key en Kafka', en: 'If order matters, we need partition by key in Kafka', pt: 'Se a ordem importa, precisamos de partição por key no Kafka' },
        typicalAnswer: { es: 'Sí, para una misma entidad los cambios deben llegar en orden', en: 'Yes, for the same entity changes must arrive in order', pt: 'Sim, para uma mesma entidade as mudanças devem chegar em ordem' }
      },
      {
        question: { es: '¿Qué pasa si perdemos un evento? ¿Es crítico?', en: 'What happens if we lose an event? Is it critical?', pt: 'O que acontece se perdermos um evento? É crítico?' },
        whyAsk: { es: 'Define si necesitamos exactly-once o si at-least-once alcanza', en: 'Defines if we need exactly-once or if at-least-once is enough', pt: 'Define se precisamos de exactly-once ou se at-least-once é suficiente' },
        typicalAnswer: { es: 'At-least-once está bien, podemos manejar duplicados', en: 'At-least-once is fine, we can handle duplicates', pt: 'At-least-once está ok, podemos lidar com duplicados' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Capturar cambios de 50 tablas PostgreSQL en near-real-time', en: 'Capture changes from 50 PostgreSQL tables in near-real-time', pt: 'Capturar mudanças de 50 tabelas PostgreSQL em near-real-time' },
        { es: 'Enviar a Snowflake, Elasticsearch y Redis', en: 'Send to Snowflake, Elasticsearch and Redis', pt: 'Enviar para Snowflake, Elasticsearch e Redis' },
        { es: 'Mantener orden de eventos por entidad', en: 'Maintain event order per entity', pt: 'Manter ordem de eventos por entidade' },
        { es: 'No afectar performance de producción', en: 'Not affect production performance', pt: 'Não afetar performance de produção' }
      ],
      nonFunctional: [
        { es: 'Latencia < 30 segundos end-to-end', en: 'Latency < 30 seconds end-to-end', pt: 'Latência < 30 segundos end-to-end' },
        { es: 'Disponibilidad 99.9%', en: 'Availability 99.9%', pt: 'Disponibilidade 99.9%' },
        { es: 'Escalable a 10x el volumen actual', en: 'Scalable to 10x current volume', pt: 'Escalável a 10x o volume atual' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'CDC con Debezium', en: 'CDC with Debezium', pt: 'CDC com Debezium' },
        description: {
          es: `Debezium es el estándar open-source para CDC:

1. Lee el WAL (Write-Ahead Log) de PostgreSQL
2. NO hace queries a las tablas (cero impacto en prod)
3. Captura INSERTs, UPDATEs, DELETEs
4. Envía eventos a Kafka

Configuración PostgreSQL:
- wal_level = logical
- max_replication_slots = 4
- max_wal_senders = 4

Cada cambio se convierte en un evento JSON con:
- before: estado anterior
- after: estado nuevo
- op: tipo de operación (c/u/d)
- ts_ms: timestamp`,
          en: `Debezium is the open-source standard for CDC:

1. Reads PostgreSQL's WAL (Write-Ahead Log)
2. Does NOT query tables (zero prod impact)
3. Captures INSERTs, UPDATEs, DELETEs
4. Sends events to Kafka

PostgreSQL configuration:
- wal_level = logical
- max_replication_slots = 4
- max_wal_senders = 4

Each change becomes a JSON event with:
- before: previous state
- after: new state
- op: operation type (c/u/d)
- ts_ms: timestamp`,
          pt: `Debezium é o padrão open-source para CDC:

1. Lê o WAL (Write-Ahead Log) do PostgreSQL
2. NÃO faz queries nas tabelas (zero impacto em prod)
3. Captura INSERTs, UPDATEs, DELETEs
4. Envia eventos para Kafka

Configuração PostgreSQL:
- wal_level = logical
- max_replication_slots = 4
- max_wal_senders = 4

Cada mudança vira um evento JSON com:
- before: estado anterior
- after: estado novo
- op: tipo de operação (c/u/d)
- ts_ms: timestamp`
        },
        components: ['Debezium', 'PostgreSQL', 'Kafka Connect'],
        diagram: `
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  PostgreSQL  │────▶│   Debezium   │────▶│    Kafka     │
│     WAL      │     │  Connector   │     │   Topics     │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                            ┌────────────────────┼────────────────────┐
                            │                    │                    │
                            ▼                    ▼                    ▼
                     ┌────────────┐       ┌────────────┐       ┌────────────┐
                     │ Snowflake  │       │Elasticsearch│      │   Redis    │
                     └────────────┘       └────────────┘       └────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Kafka como Hub Central', en: 'Kafka as Central Hub', pt: 'Kafka como Hub Central' },
        description: {
          es: `Kafka actúa como buffer y distribuidor:

Estructura de topics:
- dbserver.schema.table (1 topic por tabla)
- Particionado por primary key (garantiza orden)

Retención:
- 7 días mínimo (permite replay)
- Compaction para tablas dimensionales

Consumer Groups:
- cg-snowflake: Lee todos los topics
- cg-elasticsearch: Solo tablas de búsqueda
- cg-redis: Solo tablas de usuarios

Cada consumer puede ir a su ritmo sin afectar a otros.`,
          en: `Kafka acts as buffer and distributor:

Topic structure:
- dbserver.schema.table (1 topic per table)
- Partitioned by primary key (guarantees order)

Retention:
- 7 days minimum (allows replay)
- Compaction for dimensional tables

Consumer Groups:
- cg-snowflake: Reads all topics
- cg-elasticsearch: Only search tables
- cg-redis: Only user tables

Each consumer can go at its own pace without affecting others.`,
          pt: `Kafka atua como buffer e distribuidor:

Estrutura de topics:
- dbserver.schema.table (1 topic por tabela)
- Particionado por primary key (garante ordem)

Retenção:
- 7 dias mínimo (permite replay)
- Compaction para tabelas dimensionais

Consumer Groups:
- cg-snowflake: Lê todos os topics
- cg-elasticsearch: Só tabelas de busca
- cg-redis: Só tabelas de usuários

Cada consumer pode ir no seu ritmo sem afetar os outros.`
        },
        components: ['Kafka', 'MSK', 'Consumer Groups'],
        diagram: `
                     ┌─────────────────────────────────┐
                     │           Kafka                  │
                     │  ┌─────────────────────────────┐│
                     │  │ users.public.customers      ││
                     │  │ [p0] [p1] [p2] [p3]        ││
                     │  └─────────────────────────────┘│
                     │  ┌─────────────────────────────┐│
                     │  │ users.public.orders         ││
                     │  │ [p0] [p1] [p2] [p3]        ││
                     │  └─────────────────────────────┘│
                     └─────────────────────────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'Consumers Específicos', en: 'Specific Consumers', pt: 'Consumers Específicos' },
        description: {
          es: `Cada destino tiene su consumer optimizado:

Snowflake Consumer:
- Flink job que hace micro-batches (cada 30 seg)
- MERGE INTO para upserts eficientes
- Maneja schema evolution automático

Elasticsearch Consumer:
- Kafka Connect con Elasticsearch Sink
- Bulk indexing cada 5 segundos
- Dead letter queue para errores

Redis Consumer:
- Aplicación Go/Rust para baja latencia
- Actualiza solo campos que cambiaron
- TTL automático para datos viejos

Importante: Cada consumer tiene su propia lógica de retry y DLQ.`,
          en: `Each destination has its optimized consumer:

Snowflake Consumer:
- Flink job doing micro-batches (every 30 sec)
- MERGE INTO for efficient upserts
- Handles schema evolution automatically

Elasticsearch Consumer:
- Kafka Connect with Elasticsearch Sink
- Bulk indexing every 5 seconds
- Dead letter queue for errors

Redis Consumer:
- Go/Rust application for low latency
- Updates only changed fields
- Automatic TTL for old data

Important: Each consumer has its own retry and DLQ logic.`,
          pt: `Cada destino tem seu consumer otimizado:

Snowflake Consumer:
- Flink job fazendo micro-batches (a cada 30 seg)
- MERGE INTO para upserts eficientes
- Lida com schema evolution automaticamente

Elasticsearch Consumer:
- Kafka Connect com Elasticsearch Sink
- Bulk indexing a cada 5 segundos
- Dead letter queue para erros

Redis Consumer:
- Aplicação Go/Rust para baixa latência
- Atualiza só campos que mudaram
- TTL automático para dados velhos

Importante: Cada consumer tem sua própria lógica de retry e DLQ.`
        },
        components: ['Flink', 'Kafka Connect', 'Go/Rust'],
        diagram: `
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Snowflake   │     │Elasticsearch │     │    Redis     │
│   Consumer   │     │   Sink       │     │   Consumer   │
│  (Flink)     │     │(Kafka Connect)│    │   (Go)       │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       │ MERGE INTO         │ Bulk Index         │ SET/HSET
       ▼                    ▼                    ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Snowflake   │     │Elasticsearch │     │    Redis     │
└──────────────┘     └──────────────┘     └──────────────┘
        `
      },
      {
        step: 4,
        title: { es: 'Monitoreo y Recovery', en: 'Monitoring and Recovery', pt: 'Monitoramento e Recovery' },
        description: {
          es: `Monitoreo crítico para CDC:

Métricas clave:
- Lag de replicación (Debezium → Kafka)
- Lag de consumers (Kafka → destinos)
- Eventos en DLQ por destino
- Latencia end-to-end (p50, p99)

Alertas:
- Lag > 5 minutos
- DLQ > 100 mensajes
- Consumer detenido > 1 minuto

Recovery:
- Si Debezium falla: Replay desde LSN guardado
- Si consumer falla: Resume desde offset de Kafka
- Si destino falla: DLQ + retry automático`,
          en: `Critical monitoring for CDC:

Key metrics:
- Replication lag (Debezium → Kafka)
- Consumer lag (Kafka → destinations)
- Events in DLQ per destination
- End-to-end latency (p50, p99)

Alerts:
- Lag > 5 minutes
- DLQ > 100 messages
- Consumer stopped > 1 minute

Recovery:
- If Debezium fails: Replay from saved LSN
- If consumer fails: Resume from Kafka offset
- If destination fails: DLQ + automatic retry`,
          pt: `Monitoramento crítico para CDC:

Métricas chave:
- Lag de replicação (Debezium → Kafka)
- Lag de consumers (Kafka → destinos)
- Eventos em DLQ por destino
- Latência end-to-end (p50, p99)

Alertas:
- Lag > 5 minutos
- DLQ > 100 mensagens
- Consumer parado > 1 minuto

Recovery:
- Se Debezium falha: Replay do LSN salvo
- Se consumer falha: Resume do offset do Kafka
- Se destino falha: DLQ + retry automático`
        },
        components: ['Prometheus', 'Grafana', 'PagerDuty'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                    Monitoring Dashboard                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ Debezium    │  │  Consumer   │  │    DLQ      │     │
│  │ Lag: 2s     │  │  Lag: 15s   │  │ Count: 3    │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│  ┌─────────────────────────────────────────────────┐   │
│  │ End-to-End Latency: p50=5s, p99=25s            │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Debezium vs AWS DMS', en: 'Debezium vs AWS DMS', pt: 'Debezium vs AWS DMS' },
        option1: { es: 'Debezium: Open source, más control, necesita infra', en: 'Debezium: Open source, more control, needs infra', pt: 'Debezium: Open source, mais controle, precisa de infra' },
        option2: { es: 'AWS DMS: Managed, menos control, más caro', en: 'AWS DMS: Managed, less control, more expensive', pt: 'AWS DMS: Managed, menos controle, mais caro' },
        recommendation: { es: 'Debezium si tenés el equipo para mantenerlo. DMS si querés simplificar ops.', en: 'Debezium if you have the team to maintain it. DMS if you want to simplify ops.', pt: 'Debezium se tem o time para manter. DMS se quer simplificar ops.' }
      },
      {
        decision: { es: 'Kafka vs Kinesis para eventos', en: 'Kafka vs Kinesis for events', pt: 'Kafka vs Kinesis para eventos' },
        option1: { es: 'Kafka: Retención ilimitada, replay, más complejo', en: 'Kafka: Unlimited retention, replay, more complex', pt: 'Kafka: Retenção ilimitada, replay, mais complexo' },
        option2: { es: 'Kinesis: Más simple, retención 7 días max, menos features', en: 'Kinesis: Simpler, 7 day max retention, fewer features', pt: 'Kinesis: Mais simples, retenção 7 dias max, menos features' },
        recommendation: { es: 'Kafka para CDC - necesitás replay largo y particionamiento por key.', en: 'Kafka for CDC - you need long replay and partitioning by key.', pt: 'Kafka para CDC - você precisa de replay longo e particionamento por key.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Hacer queries a las tablas en lugar de leer el WAL', en: '❌ Querying tables instead of reading the WAL', pt: '❌ Fazer queries nas tabelas em vez de ler o WAL' },
      { es: '❌ No particionar por key - pierde garantía de orden', en: '❌ Not partitioning by key - loses ordering guarantee', pt: '❌ Não particionar por key - perde garantia de ordem' },
      { es: '❌ Un solo consumer para todos los destinos', en: '❌ One consumer for all destinations', pt: '❌ Um só consumer para todos os destinos' },
      { es: '❌ No tener DLQ - eventos perdidos sin forma de recuperar', en: '❌ No DLQ - lost events with no way to recover', pt: '❌ Não ter DLQ - eventos perdidos sem forma de recuperar' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná que CDC lee el WAL, no hace queries', en: '💡 Mention that CDC reads the WAL, doesn\'t query', pt: '💡 Mencione que CDC lê o WAL, não faz queries' },
      { es: '💡 Explicá por qué cada destino necesita su consumer', en: '💡 Explain why each destination needs its own consumer', pt: '💡 Explique por que cada destino precisa de seu próprio consumer' },
      { es: '💡 Hablá de idempotencia para manejar duplicados', en: '💡 Talk about idempotency to handle duplicates', pt: '💡 Fale de idempotência para lidar com duplicados' }
    ],
    relatedTopics: ['CDC', 'Debezium', 'Kafka', 'PostgreSQL', 'Event Sourcing'],
    estimatedXP: 650
  },

  // ============ INTERVIEW 5: STREAMING ANALYTICS ============
  {
    id: 'sd-streaming-analytics',
    title: {
      es: 'Plataforma de Analytics en Tiempo Real',
      en: 'Real-Time Analytics Platform',
      pt: 'Plataforma de Analytics em Tempo Real'
    },
    company: 'AdTech / Gaming',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['Streaming', 'Flink', 'Kafka', 'Analytics', 'Real-time'],
    problem: {
      es: `Una empresa de gaming mobile tiene 10 millones de usuarios activos diarios.
Necesitan analytics en tiempo real para:
1. Dashboard de métricas live (DAU, sesiones, revenue)
2. Detección de anomalías (drops en engagement)
3. A/B testing con resultados en minutos, no días

Actualmente procesan con Spark batch cada hora - demasiado lento para reaccionar.

El CTO pregunta: "¿Cómo diseñarías una plataforma de analytics en tiempo real?"`,
      en: `A mobile gaming company has 10 million daily active users.
They need real-time analytics for:
1. Live metrics dashboard (DAU, sessions, revenue)
2. Anomaly detection (drops in engagement)
3. A/B testing with results in minutes, not days

Currently they process with Spark batch every hour - too slow to react.

The CTO asks: "How would you design a real-time analytics platform?"`,
      pt: `Uma empresa de gaming mobile tem 10 milhões de usuários ativos diários.
Eles precisam de analytics em tempo real para:
1. Dashboard de métricas live (DAU, sessões, revenue)
2. Detecção de anomalias (quedas em engagement)
3. A/B testing com resultados em minutos, não dias

Atualmente processam com Spark batch a cada hora - muito lento para reagir.

O CTO pergunta: "Como você projetaria uma plataforma de analytics em tempo real?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuántos eventos por segundo generan?', en: 'How many events per second do you generate?', pt: 'Quantos eventos por segundo vocês geram?' },
        whyAsk: { es: 'Define el sizing de Kafka y Flink', en: 'Defines Kafka and Flink sizing', pt: 'Define o dimensionamento do Kafka e Flink' },
        typicalAnswer: { es: '100K eventos/segundo en pico', en: '100K events/second at peak', pt: '100K eventos/segundo em pico' }
      },
      {
        question: { es: '¿Qué granularidad necesitan? ¿Por minuto, por 5 min?', en: 'What granularity do you need? Per minute, per 5 min?', pt: 'Que granularidade precisam? Por minuto, por 5 min?' },
        whyAsk: { es: 'Define el window size en el streaming', en: 'Defines the window size in streaming', pt: 'Define o tamanho da janela no streaming' },
        typicalAnswer: { es: 'Métricas por minuto para el dashboard, por 5 min para alertas', en: 'Per minute metrics for dashboard, per 5 min for alerts', pt: 'Métricas por minuto para o dashboard, por 5 min para alertas' }
      },
      {
        question: { es: '¿Necesitan datos históricos también o solo real-time?', en: 'Do you need historical data too or just real-time?', pt: 'Precisam de dados históricos também ou só real-time?' },
        whyAsk: { es: 'Si necesitan histórico, vamos a necesitar una Lambda architecture', en: 'If they need historical, we\'ll need a Lambda architecture', pt: 'Se precisam de histórico, vamos precisar de uma Lambda architecture' },
        typicalAnswer: { es: 'Ambos - real-time para el día, histórico para comparar con ayer/semana pasada', en: 'Both - real-time for today, historical to compare with yesterday/last week', pt: 'Ambos - real-time para o dia, histórico para comparar com ontem/semana passada' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Procesar 100K eventos/segundo', en: 'Process 100K events/second', pt: 'Processar 100K eventos/segundo' },
        { es: 'Dashboard con latencia < 1 minuto', en: 'Dashboard with latency < 1 minute', pt: 'Dashboard com latência < 1 minuto' },
        { es: 'Alertas de anomalías en < 5 minutos', en: 'Anomaly alerts in < 5 minutes', pt: 'Alertas de anomalias em < 5 minutos' },
        { es: 'A/B testing con significancia estadística en tiempo real', en: 'A/B testing with statistical significance in real-time', pt: 'A/B testing com significância estatística em tempo real' }
      ],
      nonFunctional: [
        { es: 'Escalable a 1M eventos/segundo', en: 'Scalable to 1M events/second', pt: 'Escalável a 1M eventos/segundo' },
        { es: 'Disponibilidad 99.9%', en: 'Availability 99.9%', pt: 'Disponibilidade 99.9%' },
        { es: 'Costo optimizado (no sobre-provisionear)', en: 'Cost optimized (don\'t over-provision)', pt: 'Custo otimizado (não super-provisionar)' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Ingesta con Kafka', en: 'Ingestion with Kafka', pt: 'Ingestão com Kafka' },
        description: {
          es: `Kafka como buffer de entrada:

Topics:
- game-events: Todos los eventos del juego
- purchases: Eventos de compra (separado para prioridad)

Particionamiento:
- Por user_id para mantener orden por usuario
- 100 particiones (permite 100 consumers paralelos)

Producers:
- SDK del juego envía a Kafka via API Gateway
- Compression: lz4 (mejor balance velocidad/tamaño)
- Batch: 100ms o 1000 eventos`,
          en: `Kafka as input buffer:

Topics:
- game-events: All game events
- purchases: Purchase events (separate for priority)

Partitioning:
- By user_id to maintain order per user
- 100 partitions (allows 100 parallel consumers)

Producers:
- Game SDK sends to Kafka via API Gateway
- Compression: lz4 (best speed/size balance)
- Batch: 100ms or 1000 events`,
          pt: `Kafka como buffer de entrada:

Topics:
- game-events: Todos os eventos do jogo
- purchases: Eventos de compra (separado para prioridade)

Particionamento:
- Por user_id para manter ordem por usuário
- 100 partições (permite 100 consumers paralelos)

Producers:
- SDK do jogo envia para Kafka via API Gateway
- Compressão: lz4 (melhor balanço velocidade/tamanho)
- Batch: 100ms ou 1000 eventos`
        },
        components: ['Kafka', 'API Gateway', 'Game SDK'],
        diagram: `
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Mobile     │────▶│ API Gateway  │────▶│    Kafka     │
│    Game      │     │  (throttle)  │     │   Topics     │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                            ┌────────────────────┴────────────────────┐
                            │                                         │
                            ▼                                         ▼
                     ┌────────────┐                           ┌────────────┐
                     │game-events │                           │ purchases  │
                     │ (100 part) │                           │ (10 part)  │
                     └────────────┘                           └────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Procesamiento con Flink', en: 'Processing with Flink', pt: 'Processamento com Flink' },
        description: {
          es: `Apache Flink para procesamiento streaming:

Jobs paralelos:
1. Metrics Aggregator
   - Window: 1 minuto tumbling
   - Métricas: DAU, sessions, events por tipo
   - Output: metrics topic

2. Anomaly Detector
   - Window: 5 minutos sliding
   - Compara con baseline (histórico)
   - Output: alerts topic

3. A/B Analyzer
   - Agrupa por experimento y variante
   - Calcula conversion rate con intervalo de confianza
   - Output: experiments topic

Checkpointing cada 30 segundos para recovery.`,
          en: `Apache Flink for streaming processing:

Parallel jobs:
1. Metrics Aggregator
   - Window: 1 minute tumbling
   - Metrics: DAU, sessions, events by type
   - Output: metrics topic

2. Anomaly Detector
   - Window: 5 minutes sliding
   - Compares with baseline (historical)
   - Output: alerts topic

3. A/B Analyzer
   - Groups by experiment and variant
   - Calculates conversion rate with confidence interval
   - Output: experiments topic

Checkpointing every 30 seconds for recovery.`,
          pt: `Apache Flink para processamento streaming:

Jobs paralelos:
1. Metrics Aggregator
   - Janela: 1 minuto tumbling
   - Métricas: DAU, sessões, eventos por tipo
   - Output: metrics topic

2. Anomaly Detector
   - Janela: 5 minutos sliding
   - Compara com baseline (histórico)
   - Output: alerts topic

3. A/B Analyzer
   - Agrupa por experimento e variante
   - Calcula taxa de conversão com intervalo de confiança
   - Output: experiments topic

Checkpointing a cada 30 segundos para recovery.`
        },
        components: ['Apache Flink', 'Flink SQL', 'Checkpointing'],
        diagram: `
                     ┌─────────────────────────────────┐
                     │         Apache Flink            │
                     │  ┌─────────────────────────────┐│
                     │  │   Metrics Aggregator        ││
                     │  │   Window: 1 min             ││
                     │  └─────────────────────────────┘│
                     │  ┌─────────────────────────────┐│
                     │  │   Anomaly Detector          ││
                     │  │   Window: 5 min sliding     ││
                     │  └─────────────────────────────┘│
                     │  ┌─────────────────────────────┐│
                     │  │   A/B Analyzer              ││
                     │  │   Window: continuous        ││
                     │  └─────────────────────────────┘│
                     └─────────────────────────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'Serving Layer', en: 'Serving Layer', pt: 'Serving Layer' },
        description: {
          es: `Dos capas de serving para diferentes casos de uso:

Real-time (hot):
- Redis TimeSeries para métricas recientes
- Retención: últimas 24 horas
- Granularidad: 1 minuto
- Queries: O(1) para último valor, O(n) para rango

Histórico (warm):
- ClickHouse para analytics
- Retención: 2 años
- Granularidad: 1 minuto
- Queries: Sub-segundo para agregaciones

El dashboard consulta ambos:
- Últimas 24h → Redis
- Comparación histórica → ClickHouse`,
          en: `Two serving layers for different use cases:

Real-time (hot):
- Redis TimeSeries for recent metrics
- Retention: last 24 hours
- Granularity: 1 minute
- Queries: O(1) for latest value, O(n) for range

Historical (warm):
- ClickHouse for analytics
- Retention: 2 years
- Granularity: 1 minute
- Queries: Sub-second for aggregations

Dashboard queries both:
- Last 24h → Redis
- Historical comparison → ClickHouse`,
          pt: `Duas camadas de serving para diferentes casos de uso:

Real-time (hot):
- Redis TimeSeries para métricas recentes
- Retenção: últimas 24 horas
- Granularidade: 1 minuto
- Queries: O(1) para último valor, O(n) para range

Histórico (warm):
- ClickHouse para analytics
- Retenção: 2 anos
- Granularidade: 1 minuto
- Queries: Sub-segundo para agregações

O dashboard consulta ambos:
- Últimas 24h → Redis
- Comparação histórica → ClickHouse`
        },
        components: ['Redis TimeSeries', 'ClickHouse', 'Grafana'],
        diagram: `
                            Flink Output
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
       ┌────────────┐     ┌────────────┐     ┌────────────┐
       │   Redis    │     │ ClickHouse │     │   Alerts   │
       │ TimeSeries │     │  (OLAP)    │     │  (Slack)   │
       └────────────┘     └────────────┘     └────────────┘
              │                  │
              └────────┬─────────┘
                       │
                       ▼
                ┌────────────┐
                │  Dashboard │
                │  (Grafana) │
                └────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Flink vs Spark Structured Streaming', en: 'Flink vs Spark Structured Streaming', pt: 'Flink vs Spark Structured Streaming' },
        option1: { es: 'Flink: True streaming, mejor latencia, event-time processing nativo', en: 'Flink: True streaming, better latency, native event-time processing', pt: 'Flink: True streaming, melhor latência, event-time processing nativo' },
        option2: { es: 'Spark: Micro-batch, más fácil si ya usás Spark, mejor para ML', en: 'Spark: Micro-batch, easier if you already use Spark, better for ML', pt: 'Spark: Micro-batch, mais fácil se já usa Spark, melhor para ML' },
        recommendation: { es: 'Flink para este caso - latencia < 1 minuto es crítica.', en: 'Flink for this case - latency < 1 minute is critical.', pt: 'Flink para este caso - latência < 1 minuto é crítica.' }
      },
      {
        decision: { es: 'ClickHouse vs Druid vs Pinot', en: 'ClickHouse vs Druid vs Pinot', pt: 'ClickHouse vs Druid vs Pinot' },
        option1: { es: 'ClickHouse: Más simple, excelente SQL, mejor para analytics ad-hoc', en: 'ClickHouse: Simpler, excellent SQL, better for ad-hoc analytics', pt: 'ClickHouse: Mais simples, excelente SQL, melhor para analytics ad-hoc' },
        option2: { es: 'Druid/Pinot: Mejor para dashboards pre-definidos, más complejo', en: 'Druid/Pinot: Better for pre-defined dashboards, more complex', pt: 'Druid/Pinot: Melhor para dashboards pré-definidos, mais complexo' },
        recommendation: { es: 'ClickHouse para empezar - más fácil de operar y excelente performance.', en: 'ClickHouse to start - easier to operate and excellent performance.', pt: 'ClickHouse para começar - mais fácil de operar e excelente performance.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Usar solo Redis sin histórico - no pueden comparar con ayer', en: '❌ Using only Redis without historical - can\'t compare with yesterday', pt: '❌ Usar só Redis sem histórico - não podem comparar com ontem' },
      { es: '❌ Windows muy chicos (segundos) - demasiado ruido en las métricas', en: '❌ Windows too small (seconds) - too much noise in metrics', pt: '❌ Janelas muito pequenas (segundos) - muito ruído nas métricas' },
      { es: '❌ No usar event-time - métricas incorrectas si hay late arrivals', en: '❌ Not using event-time - incorrect metrics if there are late arrivals', pt: '❌ Não usar event-time - métricas incorretas se há late arrivals' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná event-time vs processing-time', en: '💡 Mention event-time vs processing-time', pt: '💡 Mencione event-time vs processing-time' },
      { es: '💡 Explicá por qué dos serving layers (hot/warm)', en: '💡 Explain why two serving layers (hot/warm)', pt: '💡 Explique por que duas serving layers (hot/warm)' },
      { es: '💡 Hablá de watermarks para late data', en: '💡 Talk about watermarks for late data', pt: '💡 Fale de watermarks para late data' }
    ],
    relatedTopics: ['Streaming', 'Flink', 'ClickHouse', 'Real-time Analytics', 'Event Processing'],
    estimatedXP: 700
  },

  // ============ INTERVIEW 6: DATA MESH ============
  {
    id: 'sd-data-mesh',
    title: {
      es: 'Implementación de Data Mesh',
      en: 'Data Mesh Implementation',
      pt: 'Implementação de Data Mesh'
    },
    company: 'Enterprise / Corporación grande',
    difficulty: 'senior',
    duration: '60 min',
    tags: ['Data Mesh', 'Architecture', 'Governance', 'Self-service', 'Federation'],
    problem: {
      es: `Una corporación con 50 equipos de producto tiene un equipo centralizado de datos de 15 personas.
Problemas actuales:
- El equipo de datos es cuello de botella (6 meses de backlog)
- Cada equipo de producto espera 3+ meses para tener sus datos en el warehouse
- Nadie confía en los datos porque no saben de dónde vienen
- Los dominios de negocio no tienen ownership de sus datos

El CDO pregunta: "¿Cómo diseñarías la transición a Data Mesh para descentralizar la responsabilidad de datos?"`,
      en: `A corporation with 50 product teams has a centralized data team of 15 people.
Current problems:
- Data team is a bottleneck (6 months backlog)
- Each product team waits 3+ months to get their data in the warehouse
- Nobody trusts the data because they don't know where it comes from
- Business domains don't have ownership of their data

The CDO asks: "How would you design the transition to Data Mesh to decentralize data responsibility?"`,
      pt: `Uma corporação com 50 times de produto tem um time centralizado de dados de 15 pessoas.
Problemas atuais:
- O time de dados é gargalo (6 meses de backlog)
- Cada time de produto espera 3+ meses para ter seus dados no warehouse
- Ninguém confia nos dados porque não sabem de onde vêm
- Os domínios de negócio não têm ownership dos seus dados

O CDO pergunta: "Como você projetaria a transição para Data Mesh para descentralizar a responsabilidade de dados?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Los equipos de producto tienen skills de datos o necesitan capacitación?', en: 'Do product teams have data skills or need training?', pt: 'Os times de produto têm skills de dados ou precisam de capacitação?' },
        whyAsk: { es: 'Data Mesh requiere que los dominios manejen sus datos - necesitás saber el gap de skills', en: 'Data Mesh requires domains to handle their data - you need to know the skills gap', pt: 'Data Mesh requer que os domínios gerenciem seus dados - você precisa saber o gap de skills' },
        typicalAnswer: { es: 'Algunos tienen 1-2 personas con SQL, pero ninguno tiene DEs dedicados', en: 'Some have 1-2 people with SQL, but none have dedicated DEs', pt: 'Alguns têm 1-2 pessoas com SQL, mas nenhum tem DEs dedicados' }
      },
      {
        question: { es: '¿Hay estándares de datos o cada equipo hace lo que quiere?', en: 'Are there data standards or does each team do what they want?', pt: 'Há padrões de dados ou cada time faz o que quer?' },
        whyAsk: { es: 'Data Mesh sin gobernanza es caos. Necesitás saber el punto de partida', en: 'Data Mesh without governance is chaos. You need to know the starting point', pt: 'Data Mesh sem governança é caos. Você precisa saber o ponto de partida' },
        typicalAnswer: { es: 'Muy pocos estándares. Cada equipo nombra las columnas diferente.', en: 'Very few standards. Each team names columns differently.', pt: 'Poucos padrões. Cada time nomeia as colunas de forma diferente.' }
      },
      {
        question: { es: '¿Cuál es el timeline esperado para la transición?', en: 'What is the expected timeline for the transition?', pt: 'Qual é o timeline esperado para a transição?' },
        whyAsk: { es: 'Data Mesh es una transformación de años, no meses', en: 'Data Mesh is a years-long transformation, not months', pt: 'Data Mesh é uma transformação de anos, não meses' },
        typicalAnswer: { es: '2-3 años para la transición completa, pero necesitamos quick wins en 6 meses', en: '2-3 years for full transition, but we need quick wins in 6 months', pt: '2-3 anos para a transição completa, mas precisamos de quick wins em 6 meses' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Cada dominio publica sus datos como "productos de datos"', en: 'Each domain publishes their data as "data products"', pt: 'Cada domínio publica seus dados como "produtos de dados"' },
        { es: 'Catálogo centralizado para descubrir data products', en: 'Centralized catalog to discover data products', pt: 'Catálogo centralizado para descobrir data products' },
        { es: 'Self-service para que dominios creen pipelines sin el equipo central', en: 'Self-service for domains to create pipelines without central team', pt: 'Self-service para que domínios criem pipelines sem o time central' },
        { es: 'Gobernanza federada (estándares globales, implementación local)', en: 'Federated governance (global standards, local implementation)', pt: 'Governança federada (padrões globais, implementação local)' }
      ],
      nonFunctional: [
        { es: 'Quick wins en 6 meses con 2-3 dominios piloto', en: 'Quick wins in 6 months with 2-3 pilot domains', pt: 'Quick wins em 6 meses com 2-3 domínios piloto' },
        { es: 'Transición gradual sin disruption del negocio', en: 'Gradual transition without business disruption', pt: 'Transição gradual sem disrupção do negócio' },
        { es: 'Interoperabilidad entre data products de diferentes dominios', en: 'Interoperability between data products from different domains', pt: 'Interoperabilidade entre data products de diferentes domínios' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Definir Dominios y Data Products', en: 'Define Domains and Data Products', pt: 'Definir Domínios e Data Products' },
        description: {
          es: `Primero: identificar los dominios de negocio y sus data products.

Dominios típicos:
- Customers (datos de clientes)
- Orders (transacciones)
- Products (catálogo)
- Finance (revenue, costs)
- Marketing (campaigns, attribution)

Cada dominio define sus Data Products:
- Nombre único (customers.profiles)
- Owner (equipo responsable)
- Schema (estructura de datos)
- SLA (freshness, availability)
- Documentación

El equipo central se convierte en "enabler", no "owner".`,
          en: `First: identify business domains and their data products.

Typical domains:
- Customers (customer data)
- Orders (transactions)
- Products (catalog)
- Finance (revenue, costs)
- Marketing (campaigns, attribution)

Each domain defines their Data Products:
- Unique name (customers.profiles)
- Owner (responsible team)
- Schema (data structure)
- SLA (freshness, availability)
- Documentation

Central team becomes "enabler", not "owner".`,
          pt: `Primeiro: identificar os domínios de negócio e seus data products.

Domínios típicos:
- Customers (dados de clientes)
- Orders (transações)
- Products (catálogo)
- Finance (receita, custos)
- Marketing (campanhas, atribuição)

Cada domínio define seus Data Products:
- Nome único (customers.profiles)
- Owner (time responsável)
- Schema (estrutura de dados)
- SLA (freshness, disponibilidade)
- Documentação

O time central se torna "enabler", não "owner".`
        },
        components: ['Domain-Driven Design', 'Data Products', 'Ownership'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                    Business Domains                      │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐           │
│  │ Customers │  │  Orders   │  │  Finance  │           │
│  │           │  │           │  │           │           │
│  │ Products: │  │ Products: │  │ Products: │           │
│  │ - profiles│  │ - orders  │  │ - revenue │           │
│  │ - segments│  │ - returns │  │ - costs   │           │
│  └───────────┘  └───────────┘  └───────────┘           │
└─────────────────────────────────────────────────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Self-Service Data Platform', en: 'Self-Service Data Platform', pt: 'Self-Service Data Platform' },
        description: {
          es: `El equipo central construye la plataforma, no los pipelines:

Componentes de la plataforma:
1. Data Lake compartido (S3 con particiones por dominio)
2. Templates de pipelines (Airflow DAGs pre-configurados)
3. Infraestructura como código (Terraform modules)
4. Catálogo de datos (DataHub/Amundsen)
5. Lineage automático

Cada dominio usa la plataforma para:
- Crear sus propios pipelines (sin tickets)
- Publicar data products (auto-registro)
- Monitorear calidad (tests automáticos)

El equipo central mantiene la plataforma y define estándares.`,
          en: `Central team builds the platform, not the pipelines:

Platform components:
1. Shared Data Lake (S3 with domain partitions)
2. Pipeline templates (pre-configured Airflow DAGs)
3. Infrastructure as code (Terraform modules)
4. Data catalog (DataHub/Amundsen)
5. Automatic lineage

Each domain uses the platform to:
- Create their own pipelines (no tickets)
- Publish data products (auto-registration)
- Monitor quality (automatic tests)

Central team maintains the platform and defines standards.`,
          pt: `Time central constrói a plataforma, não os pipelines:

Componentes da plataforma:
1. Data Lake compartilhado (S3 com partições por domínio)
2. Templates de pipelines (Airflow DAGs pré-configurados)
3. Infraestrutura como código (Terraform modules)
4. Catálogo de dados (DataHub/Amundsen)
5. Lineage automático

Cada domínio usa a plataforma para:
- Criar seus próprios pipelines (sem tickets)
- Publicar data products (auto-registro)
- Monitorar qualidade (testes automáticos)

Time central mantém a plataforma e define padrões.`
        },
        components: ['DataHub', 'Airflow', 'Terraform', 'S3'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│               Self-Service Platform                      │
│  ┌─────────────────────────────────────────────────────┐│
│  │              Data Catalog (DataHub)                 ││
│  └─────────────────────────────────────────────────────┘│
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  Pipeline   │  │   Infra     │  │   Quality   │     │
│  │  Templates  │  │  Terraform  │  │   Tests     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│  ┌─────────────────────────────────────────────────────┐│
│  │           Shared Data Lake (S3)                     ││
│  │  /customers/  /orders/  /finance/  /marketing/      ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'Gobernanza Federada', en: 'Federated Governance', pt: 'Governança Federada' },
        description: {
          es: `Gobernanza = Estándares globales + Autonomía local

Estándares globales (enforcement automático):
- Naming conventions (snake_case, prefijos de dominio)
- Schema registry obligatorio
- Documentación mínima requerida
- Tests de calidad básicos (nulls, freshness)
- PII marcado y encriptado

Autonomía local (decisión del dominio):
- Tecnología de procesamiento
- Frecuencia de actualización
- Lógica de negocio
- SLAs específicos

Guild de Data:
- Representantes de cada dominio
- Se reúne mensualmente
- Decide nuevos estándares
- Comparte mejores prácticas`,
          en: `Governance = Global standards + Local autonomy

Global standards (automatic enforcement):
- Naming conventions (snake_case, domain prefixes)
- Mandatory schema registry
- Minimum required documentation
- Basic quality tests (nulls, freshness)
- PII marked and encrypted

Local autonomy (domain decision):
- Processing technology
- Update frequency
- Business logic
- Specific SLAs

Data Guild:
- Representatives from each domain
- Meets monthly
- Decides new standards
- Shares best practices`,
          pt: `Governança = Padrões globais + Autonomia local

Padrões globais (enforcement automático):
- Naming conventions (snake_case, prefixos de domínio)
- Schema registry obrigatório
- Documentação mínima requerida
- Testes de qualidade básicos (nulls, freshness)
- PII marcado e criptografado

Autonomia local (decisão do domínio):
- Tecnologia de processamento
- Frequência de atualização
- Lógica de negócio
- SLAs específicos

Guild de Data:
- Representantes de cada domínio
- Se reúne mensalmente
- Decide novos padrões
- Compartilha melhores práticas`
        },
        components: ['Schema Registry', 'Data Quality', 'Data Guild'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│               Federated Governance                       │
│                                                          │
│  GLOBAL STANDARDS          LOCAL AUTONOMY               │
│  ┌─────────────┐           ┌─────────────┐             │
│  │ Naming      │           │ Technology  │             │
│  │ Schema      │     +     │ Frequency   │             │
│  │ PII         │           │ SLAs        │             │
│  │ Quality     │           │ Logic       │             │
│  └─────────────┘           └─────────────┘             │
│                                                          │
│        ┌─────────────────────────────────┐              │
│        │         Data Guild              │              │
│        │  [Customers] [Orders] [Finance] │              │
│        └─────────────────────────────────┘              │
└─────────────────────────────────────────────────────────┘
        `
      },
      {
        step: 4,
        title: { es: 'Rollout Gradual', en: 'Gradual Rollout', pt: 'Rollout Gradual' },
        description: {
          es: `Transición en fases (no big bang):

Fase 1 (Meses 1-6): Piloto
- 2-3 dominios con equipos motivados
- Construir plataforma MVP
- Aprender y ajustar

Fase 2 (Meses 6-12): Expansión
- 5-10 dominios más
- Madurar la plataforma
- Documentar patrones

Fase 3 (Meses 12-24): Escala
- Resto de dominios
- Migrar pipelines legacy
- Deprecar warehouse centralizado

Métricas de éxito:
- Time to data (de meses a días)
- % de data products con owner
- NPS de consumidores de datos`,
          en: `Transition in phases (not big bang):

Phase 1 (Months 1-6): Pilot
- 2-3 domains with motivated teams
- Build MVP platform
- Learn and adjust

Phase 2 (Months 6-12): Expansion
- 5-10 more domains
- Mature the platform
- Document patterns

Phase 3 (Months 12-24): Scale
- Rest of domains
- Migrate legacy pipelines
- Deprecate centralized warehouse

Success metrics:
- Time to data (from months to days)
- % of data products with owner
- Data consumer NPS`,
          pt: `Transição em fases (não big bang):

Fase 1 (Meses 1-6): Piloto
- 2-3 domínios com times motivados
- Construir plataforma MVP
- Aprender e ajustar

Fase 2 (Meses 6-12): Expansão
- 5-10 domínios mais
- Amadurecer a plataforma
- Documentar padrões

Fase 3 (Meses 12-24): Escala
- Resto dos domínios
- Migrar pipelines legacy
- Depreciar warehouse centralizado

Métricas de sucesso:
- Time to data (de meses para dias)
- % de data products com owner
- NPS de consumidores de dados`
        },
        components: ['Change Management', 'Metrics', 'Migration'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                    Rollout Timeline                      │
│                                                          │
│  Phase 1        Phase 2        Phase 3                  │
│  (Pilot)        (Expand)       (Scale)                  │
│  ┌──────┐       ┌──────┐       ┌──────┐                │
│  │ 2-3  │───────│ 5-10 │───────│ All  │                │
│  │domains│      │domains│      │domains│               │
│  └──────┘       └──────┘       └──────┘                │
│  Month 0-6      Month 6-12     Month 12-24             │
│                                                          │
│  ⚡ Quick wins  📈 Scale       🎯 Full adoption        │
└─────────────────────────────────────────────────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Data Mesh vs Data Fabric', en: 'Data Mesh vs Data Fabric', pt: 'Data Mesh vs Data Fabric' },
        option1: { es: 'Data Mesh: Descentralizado, ownership por dominio, cambio organizacional grande', en: 'Data Mesh: Decentralized, domain ownership, large organizational change', pt: 'Data Mesh: Descentralizado, ownership por domínio, mudança organizacional grande' },
        option2: { es: 'Data Fabric: Más tecnológico, menos cambio org, el equipo central sigue siendo owner', en: 'Data Fabric: More technological, less org change, central team remains owner', pt: 'Data Fabric: Mais tecnológico, menos mudança org, time central continua sendo owner' },
        recommendation: { es: 'Data Mesh si el problema es organizacional (bottleneck). Data Fabric si es solo tecnológico.', en: 'Data Mesh if problem is organizational (bottleneck). Data Fabric if just technological.', pt: 'Data Mesh se o problema é organizacional (gargalo). Data Fabric se é só tecnológico.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Implementar solo la tecnología sin el cambio organizacional', en: '❌ Implementing only technology without organizational change', pt: '❌ Implementar só a tecnologia sem a mudança organizacional' },
      { es: '❌ No definir estándares globales - termina en caos', en: '❌ Not defining global standards - ends in chaos', pt: '❌ Não definir padrões globais - termina em caos' },
      { es: '❌ Big bang en lugar de rollout gradual', en: '❌ Big bang instead of gradual rollout', pt: '❌ Big bang em vez de rollout gradual' },
      { es: '❌ No invertir en la plataforma self-service', en: '❌ Not investing in self-service platform', pt: '❌ Não investir na plataforma self-service' }
    ],
    interviewerTips: [
      { es: '💡 Data Mesh es tanto organizacional como tecnológico - mencioná ambos', en: '💡 Data Mesh is both organizational and technological - mention both', pt: '💡 Data Mesh é tanto organizacional quanto tecnológico - mencione ambos' },
      { es: '💡 Hablá de gobernanza federada vs centralizada', en: '💡 Talk about federated vs centralized governance', pt: '💡 Fale de governança federada vs centralizada' },
      { es: '💡 Mencioná el rol del equipo central como "platform team"', en: '💡 Mention central team role as "platform team"', pt: '💡 Mencione o papel do time central como "platform team"' }
    ],
    relatedTopics: ['Data Mesh', 'Data Products', 'Governance', 'Self-service', 'Domain-Driven Design'],
    estimatedXP: 900
  },

  // ============ INTERVIEW 7: ML FEATURE STORE ============
  {
    id: 'sd-feature-store',
    title: {
      es: 'Feature Store para ML en Producción',
      en: 'Feature Store for ML in Production',
      pt: 'Feature Store para ML em Produção'
    },
    company: 'ML Platform / Fintech',
    difficulty: 'senior',
    duration: '60 min',
    tags: ['ML', 'Feature Store', 'Real-time', 'Feast', 'MLOps'],
    problem: {
      es: `Una fintech tiene 20 modelos de ML en producción (fraude, scoring, recomendaciones).
Problemas actuales:
1. Training-serving skew: Features calculadas diferente en training vs inference
2. Cada modelo recalcula las mismas features (user_avg_transaction)
3. Latencia de inference muy alta (200ms) porque calculan features en runtime
4. Data scientists no pueden experimentar con features de otros equipos

El Head of ML pregunta: "¿Cómo diseñarías un Feature Store que resuelva estos problemas?"`,
      en: `A fintech has 20 ML models in production (fraud, scoring, recommendations).
Current problems:
1. Training-serving skew: Features calculated differently in training vs inference
2. Each model recalculates the same features (user_avg_transaction)
3. Very high inference latency (200ms) because they calculate features at runtime
4. Data scientists can't experiment with features from other teams

The Head of ML asks: "How would you design a Feature Store that solves these problems?"`,
      pt: `Uma fintech tem 20 modelos de ML em produção (fraude, scoring, recomendações).
Problemas atuais:
1. Training-serving skew: Features calculadas de forma diferente em training vs inference
2. Cada modelo recalcula as mesmas features (user_avg_transaction)
3. Latência de inferência muito alta (200ms) porque calculam features em runtime
4. Data scientists não podem experimentar com features de outros times

O Head of ML pergunta: "Como você projetaria um Feature Store que resolva estes problemas?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuántas features tienen en total y cuántas necesitan en real-time?', en: 'How many features do you have total and how many need real-time?', pt: 'Quantas features vocês têm no total e quantas precisam em real-time?' },
        whyAsk: { es: 'Define si necesitas online store, offline store, o ambos', en: 'Defines if you need online store, offline store, or both', pt: 'Define se precisa de online store, offline store, ou ambos' },
        typicalAnswer: { es: '500 features, 50 necesitan real-time con latencia < 10ms', en: '500 features, 50 need real-time with latency < 10ms', pt: '500 features, 50 precisam de real-time com latência < 10ms' }
      },
      {
        question: { es: '¿Qué latencia de inference es aceptable?', en: 'What inference latency is acceptable?', pt: 'Qual latência de inferência é aceitável?' },
        whyAsk: { es: 'Define el storage para online features (Redis, DynamoDB)', en: 'Defines storage for online features (Redis, DynamoDB)', pt: 'Define o storage para online features (Redis, DynamoDB)' },
        typicalAnswer: { es: 'Para fraude necesitamos < 50ms total, de los cuales 10ms pueden ser feature retrieval', en: 'For fraud we need < 50ms total, of which 10ms can be feature retrieval', pt: 'Para fraude precisamos < 50ms total, dos quais 10ms podem ser feature retrieval' }
      },
      {
        question: { es: '¿Los data scientists usan Python/Spark o SQL?', en: 'Do data scientists use Python/Spark or SQL?', pt: 'Os data scientists usam Python/Spark ou SQL?' },
        whyAsk: { es: 'Define el SDK y la interfaz del feature store', en: 'Defines the SDK and feature store interface', pt: 'Define o SDK e a interface do feature store' },
        typicalAnswer: { es: 'Principalmente Python y PySpark, algunos usan SQL', en: 'Mainly Python and PySpark, some use SQL', pt: 'Principalmente Python e PySpark, alguns usam SQL' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Definir features una vez, usar en training y serving', en: 'Define features once, use in training and serving', pt: 'Definir features uma vez, usar em training e serving' },
        { es: 'Reutilizar features entre modelos', en: 'Reuse features across models', pt: 'Reutilizar features entre modelos' },
        { es: 'Servir features en < 10ms para inference', en: 'Serve features in < 10ms for inference', pt: 'Servir features em < 10ms para inferência' },
        { es: 'Point-in-time correctness para training', en: 'Point-in-time correctness for training', pt: 'Point-in-time correctness para training' }
      ],
      nonFunctional: [
        { es: 'Latencia p99 < 10ms para online serving', en: 'p99 latency < 10ms for online serving', pt: 'Latência p99 < 10ms para online serving' },
        { es: 'Soportar 500+ features', en: 'Support 500+ features', pt: 'Suportar 500+ features' },
        { es: 'Self-service para data scientists', en: 'Self-service for data scientists', pt: 'Self-service para data scientists' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Arquitectura Dual: Online + Offline', en: 'Dual Architecture: Online + Offline', pt: 'Arquitetura Dual: Online + Offline' },
        description: {
          es: `Feature Store tiene dos componentes:

Offline Store (para training):
- Storage: S3/Delta Lake
- Features históricas con timestamp
- Point-in-time queries para evitar data leakage
- Batch processing con Spark

Online Store (para inference):
- Storage: Redis/DynamoDB
- Solo último valor de cada feature
- Latencia < 10ms
- Actualizaciones en streaming

Ambos stores comparten las mismas definiciones de features.`,
          en: `Feature Store has two components:

Offline Store (for training):
- Storage: S3/Delta Lake
- Historical features with timestamp
- Point-in-time queries to avoid data leakage
- Batch processing with Spark

Online Store (for inference):
- Storage: Redis/DynamoDB
- Only latest value of each feature
- Latency < 10ms
- Streaming updates

Both stores share the same feature definitions.`,
          pt: `Feature Store tem dois componentes:

Offline Store (para training):
- Storage: S3/Delta Lake
- Features históricas com timestamp
- Point-in-time queries para evitar data leakage
- Batch processing com Spark

Online Store (para inferência):
- Storage: Redis/DynamoDB
- Só último valor de cada feature
- Latência < 10ms
- Atualizações em streaming

Ambos stores compartilham as mesmas definições de features.`
        },
        components: ['Feast', 'Delta Lake', 'Redis', 'Spark'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                    Feature Store                         │
│  ┌─────────────────────┐   ┌─────────────────────┐     │
│  │   Offline Store     │   │    Online Store     │     │
│  │   (Training)        │   │   (Inference)       │     │
│  │   ┌─────────┐       │   │   ┌─────────┐       │     │
│  │   │  Delta  │       │   │   │  Redis  │       │     │
│  │   │  Lake   │       │   │   │         │       │     │
│  │   └─────────┘       │   │   └─────────┘       │     │
│  │   Point-in-time ✓   │   │   Latency < 10ms   │     │
│  └─────────────────────┘   └─────────────────────┘     │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │            Feature Registry (definitions)            ││
│  └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Feature Definitions', en: 'Feature Definitions', pt: 'Feature Definitions' },
        description: {
          es: `Las features se definen UNA vez en código:

Feature definition incluye:
- Nombre y descripción
- Entidad (user, transaction, merchant)
- Tipo de dato
- Transformación (SQL o Python)
- TTL para online store

Ejemplo (Feast):
user_features = FeatureView(
    name="user_transaction_stats",
    entities=[user],
    features=[
        Feature("avg_transaction_30d", Float64),
        Feature("count_transactions_30d", Int64),
    ],
    batch_source=BigQuerySource(
        query="SELECT user_id, AVG(amount) as avg..."
    )
)

El mismo código genera training data y online features.`,
          en: `Features are defined ONCE in code:

Feature definition includes:
- Name and description
- Entity (user, transaction, merchant)
- Data type
- Transformation (SQL or Python)
- TTL for online store

Example (Feast):
user_features = FeatureView(
    name="user_transaction_stats",
    entities=[user],
    features=[
        Feature("avg_transaction_30d", Float64),
        Feature("count_transactions_30d", Int64),
    ],
    batch_source=BigQuerySource(
        query="SELECT user_id, AVG(amount) as avg..."
    )
)

Same code generates training data and online features.`,
          pt: `As features são definidas UMA vez em código:

Feature definition inclui:
- Nome e descrição
- Entidade (user, transaction, merchant)
- Tipo de dado
- Transformação (SQL ou Python)
- TTL para online store

Exemplo (Feast):
user_features = FeatureView(
    name="user_transaction_stats",
    entities=[user],
    features=[
        Feature("avg_transaction_30d", Float64),
        Feature("count_transactions_30d", Int64),
    ],
    batch_source=BigQuerySource(
        query="SELECT user_id, AVG(amount) as avg..."
    )
)

O mesmo código gera training data e online features.`
        },
        components: ['Feast', 'Feature Registry', 'Python SDK'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                 Feature Definition                       │
│  ┌─────────────────────────────────────────────────────┐│
│  │ user_features = FeatureView(                        ││
│  │     name="user_transaction_stats",                  ││
│  │     entities=[user],                                ││
│  │     features=[                                      ││
│  │         Feature("avg_transaction_30d", Float64),    ││
│  │         Feature("count_transactions_30d", Int64),   ││
│  │     ],                                              ││
│  │     batch_source=BigQuerySource(query="...")        ││
│  │ )                                                   ││
│  └─────────────────────────────────────────────────────┘│
│                          │                               │
│              ┌───────────┴───────────┐                  │
│              ▼                       ▼                  │
│     ┌─────────────┐         ┌─────────────┐            │
│     │  Training   │         │  Serving    │            │
│     │   Data      │         │   Data      │            │
│     └─────────────┘         └─────────────┘            │
└─────────────────────────────────────────────────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'Materialización y Serving', en: 'Materialization and Serving', pt: 'Materialização e Serving' },
        description: {
          es: `Dos flujos de materialización:

Batch (diario/horario):
1. Spark job lee feature definitions
2. Ejecuta transformaciones
3. Escribe a offline store (Delta Lake)
4. Copia últimos valores a online store (Redis)

Streaming (real-time):
1. Features que necesitan frescura < 1 hora
2. Flink consume eventos de Kafka
3. Calcula features incrementales
4. Actualiza Redis directamente

Serving API:
- get_online_features(entity_keys, feature_refs)
- Retorna features en < 10ms
- SDK para Python/Java/Go`,
          en: `Two materialization flows:

Batch (daily/hourly):
1. Spark job reads feature definitions
2. Executes transformations
3. Writes to offline store (Delta Lake)
4. Copies latest values to online store (Redis)

Streaming (real-time):
1. Features that need freshness < 1 hour
2. Flink consumes events from Kafka
3. Calculates incremental features
4. Updates Redis directly

Serving API:
- get_online_features(entity_keys, feature_refs)
- Returns features in < 10ms
- SDK for Python/Java/Go`,
          pt: `Dois fluxos de materialização:

Batch (diário/horário):
1. Spark job lê feature definitions
2. Executa transformações
3. Escreve no offline store (Delta Lake)
4. Copia últimos valores para online store (Redis)

Streaming (real-time):
1. Features que precisam de freshness < 1 hora
2. Flink consome eventos do Kafka
3. Calcula features incrementais
4. Atualiza Redis diretamente

Serving API:
- get_online_features(entity_keys, feature_refs)
- Retorna features em < 10ms
- SDK para Python/Java/Go`
        },
        components: ['Spark', 'Flink', 'Redis', 'Serving API'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                 Materialization Flows                    │
│                                                          │
│  BATCH (Daily)              STREAMING (Real-time)       │
│  ┌─────────┐                ┌─────────┐                 │
│  │  Spark  │                │  Flink  │                 │
│  └────┬────┘                └────┬────┘                 │
│       │                          │                      │
│       ▼                          │                      │
│  ┌─────────┐                     │                      │
│  │ Delta   │                     │                      │
│  │ Lake    │                     │                      │
│  └────┬────┘                     │                      │
│       │ copy                     │ direct               │
│       └──────────┐    ┌──────────┘                      │
│                  ▼    ▼                                 │
│              ┌─────────────┐                            │
│              │    Redis    │                            │
│              │ (< 10ms)    │                            │
│              └─────────────┘                            │
└─────────────────────────────────────────────────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Feast vs Tecton vs Custom', en: 'Feast vs Tecton vs Custom', pt: 'Feast vs Tecton vs Custom' },
        option1: { es: 'Feast: Open source, gratis, necesita ops', en: 'Feast: Open source, free, needs ops', pt: 'Feast: Open source, grátis, precisa de ops' },
        option2: { es: 'Tecton: Managed, muy caro ($$$), menos ops', en: 'Tecton: Managed, very expensive ($$$), less ops', pt: 'Tecton: Managed, muito caro ($$$), menos ops' },
        recommendation: { es: 'Feast para empezar. Tecton si tenés mucho budget y poco tiempo.', en: 'Feast to start. Tecton if you have big budget and little time.', pt: 'Feast para começar. Tecton se tem muito budget e pouco tempo.' }
      },
      {
        decision: { es: 'Redis vs DynamoDB para online store', en: 'Redis vs DynamoDB for online store', pt: 'Redis vs DynamoDB para online store' },
        option1: { es: 'Redis: Más rápido (< 5ms), necesita cluster management', en: 'Redis: Faster (< 5ms), needs cluster management', pt: 'Redis: Mais rápido (< 5ms), precisa de cluster management' },
        option2: { es: 'DynamoDB: Serverless, un poco más lento (5-10ms), less ops', en: 'DynamoDB: Serverless, slightly slower (5-10ms), less ops', pt: 'DynamoDB: Serverless, um pouco mais lento (5-10ms), less ops' },
        recommendation: { es: 'Redis si < 5ms es crítico. DynamoDB para simplificar ops.', en: 'Redis if < 5ms is critical. DynamoDB to simplify ops.', pt: 'Redis se < 5ms é crítico. DynamoDB para simplificar ops.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No considerar point-in-time correctness - causa data leakage', en: '❌ Not considering point-in-time correctness - causes data leakage', pt: '❌ Não considerar point-in-time correctness - causa data leakage' },
      { es: '❌ Calcular features en runtime en lugar de pre-computar', en: '❌ Calculating features at runtime instead of pre-computing', pt: '❌ Calcular features em runtime em vez de pré-computar' },
      { es: '❌ Diferentes definiciones para training y serving', en: '❌ Different definitions for training and serving', pt: '❌ Definições diferentes para training e serving' }
    ],
    interviewerTips: [
      { es: '💡 Explicá el problema de training-serving skew', en: '💡 Explain the training-serving skew problem', pt: '💡 Explique o problema de training-serving skew' },
      { es: '💡 Mencioná point-in-time correctness para evitar data leakage', en: '💡 Mention point-in-time correctness to avoid data leakage', pt: '💡 Mencione point-in-time correctness para evitar data leakage' },
      { es: '💡 Hablá de la dualidad offline/online store', en: '💡 Talk about the offline/online store duality', pt: '💡 Fale da dualidade offline/online store' }
    ],
    relatedTopics: ['Feature Store', 'ML', 'Feast', 'MLOps', 'Real-time Inference'],
    estimatedXP: 850
  },

  // ============ INTERVIEW 8: DATA WAREHOUSE MODELING (JUNIOR) ============
  {
    id: 'sd-dwh-modeling',
    title: {
      es: 'Modelado de Data Warehouse (Star Schema)',
      en: 'Data Warehouse Modeling (Star Schema)',
      pt: 'Modelagem de Data Warehouse (Star Schema)'
    },
    company: 'Retail / E-commerce',
    difficulty: 'junior',
    duration: '30 min',
    tags: ['Data Modeling', 'Star Schema', 'Dimensional', 'SQL', 'Entry-level'],
    problem: {
      es: `Una tienda de retail tiene datos de ventas en una base de datos transaccional (PostgreSQL).
El equipo de BI necesita hacer análisis de ventas por:
- Producto, categoría
- Tienda, región
- Fecha (día, semana, mes, año)
- Cliente (segmento, antigüedad)

Actualmente hacen queries directamente a producción y tardan 10+ minutos.

El manager pregunta: "¿Cómo modelarías un Data Warehouse para que las queries sean rápidas?"`,
      en: `A retail store has sales data in a transactional database (PostgreSQL).
The BI team needs to analyze sales by:
- Product, category
- Store, region
- Date (day, week, month, year)
- Customer (segment, tenure)

Currently they query production directly and it takes 10+ minutes.

The manager asks: "How would you model a Data Warehouse so queries are fast?"`,
      pt: `Uma loja de varejo tem dados de vendas em um banco de dados transacional (PostgreSQL).
A equipe de BI precisa analisar vendas por:
- Produto, categoria
- Loja, região
- Data (dia, semana, mês, ano)
- Cliente (segmento, antiguidade)

Atualmente fazem queries diretamente em produção e demoram 10+ minutos.

O gerente pergunta: "Como você modelaria um Data Warehouse para que as queries sejam rápidas?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuántos registros de ventas tienen por día?', en: 'How many sales records do you have per day?', pt: 'Quantos registros de vendas vocês têm por dia?' },
        whyAsk: { es: 'Define el tamaño de la fact table y si necesitamos particionamiento', en: 'Defines fact table size and if we need partitioning', pt: 'Define o tamanho da tabela fato e se precisamos de particionamento' },
        typicalAnswer: { es: 'Unas 50,000 ventas por día, 18 millones al año', en: 'About 50,000 sales per day, 18 million per year', pt: 'Umas 50.000 vendas por dia, 18 milhões por ano' }
      },
      {
        question: { es: '¿Cuántos productos y tiendas tienen?', en: 'How many products and stores do you have?', pt: 'Quantos produtos e lojas vocês têm?' },
        whyAsk: { es: 'Define el tamaño de las dimension tables', en: 'Defines dimension table sizes', pt: 'Define o tamanho das tabelas dimensão' },
        typicalAnswer: { es: '10,000 productos, 200 tiendas, 500,000 clientes', en: '10,000 products, 200 stores, 500,000 customers', pt: '10.000 produtos, 200 lojas, 500.000 clientes' }
      },
      {
        question: { es: '¿Necesitan datos históricos o solo actuales?', en: 'Do you need historical data or just current?', pt: 'Precisam de dados históricos ou só atuais?' },
        whyAsk: { es: 'Define si necesitamos SCD (Slowly Changing Dimensions)', en: 'Defines if we need SCD (Slowly Changing Dimensions)', pt: 'Define se precisamos de SCD (Slowly Changing Dimensions)' },
        typicalAnswer: { es: 'Necesitamos ver cómo cambian los precios y categorías de productos', en: 'We need to see how product prices and categories change', pt: 'Precisamos ver como mudam os preços e categorias de produtos' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Queries de agregación en < 5 segundos', en: 'Aggregation queries in < 5 seconds', pt: 'Queries de agregação em < 5 segundos' },
        { es: 'Análisis por múltiples dimensiones', en: 'Analysis by multiple dimensions', pt: 'Análise por múltiplas dimensões' },
        { es: 'Historial de cambios en productos', en: 'History of product changes', pt: 'Histórico de mudanças em produtos' },
        { es: 'Actualización diaria de datos', en: 'Daily data refresh', pt: 'Atualização diária de dados' }
      ],
      nonFunctional: [
        { es: 'Fácil de entender para analistas de BI', en: 'Easy to understand for BI analysts', pt: 'Fácil de entender para analistas de BI' },
        { es: 'Escalable a 5 años de datos', en: 'Scalable to 5 years of data', pt: 'Escalável a 5 anos de dados' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Identificar Fact Table (Hechos)', en: 'Identify Fact Table', pt: 'Identificar Tabela Fato' },
        description: {
          es: `La Fact Table contiene las métricas numéricas que queremos analizar:

fact_sales:
- sale_id (PK)
- date_key (FK a dim_date)
- product_key (FK a dim_product)
- store_key (FK a dim_store)
- customer_key (FK a dim_customer)
- quantity (medida)
- unit_price (medida)
- total_amount (medida)
- discount_amount (medida)

Las medidas son los números que vamos a sumar, promediar, etc.
Las keys son referencias a las dimensiones.`,
          en: `The Fact Table contains the numeric metrics we want to analyze:

fact_sales:
- sale_id (PK)
- date_key (FK to dim_date)
- product_key (FK to dim_product)
- store_key (FK to dim_store)
- customer_key (FK to dim_customer)
- quantity (measure)
- unit_price (measure)
- total_amount (measure)
- discount_amount (measure)

Measures are the numbers we'll sum, average, etc.
Keys are references to dimensions.`,
          pt: `A Tabela Fato contém as métricas numéricas que queremos analisar:

fact_sales:
- sale_id (PK)
- date_key (FK para dim_date)
- product_key (FK para dim_product)
- store_key (FK para dim_store)
- customer_key (FK para dim_customer)
- quantity (medida)
- unit_price (medida)
- total_amount (medida)
- discount_amount (medida)

As medidas são os números que vamos somar, calcular média, etc.
As keys são referências às dimensões.`
        },
        components: ['Fact Table', 'Measures', 'Foreign Keys'],
        diagram: `
┌─────────────────────────────────────────┐
│             fact_sales                   │
├─────────────────────────────────────────┤
│ sale_id         (PK)                    │
│ date_key        (FK) ──────────────────▶│ dim_date
│ product_key     (FK) ──────────────────▶│ dim_product
│ store_key       (FK) ──────────────────▶│ dim_store
│ customer_key    (FK) ──────────────────▶│ dim_customer
├─────────────────────────────────────────┤
│ quantity        (measure)               │
│ unit_price      (measure)               │
│ total_amount    (measure)               │
│ discount_amount (measure)               │
└─────────────────────────────────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Diseñar Dimension Tables', en: 'Design Dimension Tables', pt: 'Projetar Tabelas Dimensão' },
        description: {
          es: `Las Dimensions son las tablas que describen el "quién, qué, dónde, cuándo":

dim_date:
- date_key (PK, formato YYYYMMDD)
- full_date, day, month, year
- day_of_week, week_of_year
- is_weekend, is_holiday
- quarter, fiscal_year

dim_product:
- product_key (PK, surrogate key)
- product_id (natural key)
- product_name, category, subcategory
- brand, supplier
- current_price

dim_store:
- store_key (PK)
- store_name, city, region, country

dim_customer:
- customer_key (PK)
- customer_name, segment
- registration_date, tenure_months`,
          en: `Dimensions are tables that describe "who, what, where, when":

dim_date:
- date_key (PK, format YYYYMMDD)
- full_date, day, month, year
- day_of_week, week_of_year
- is_weekend, is_holiday
- quarter, fiscal_year

dim_product:
- product_key (PK, surrogate key)
- product_id (natural key)
- product_name, category, subcategory
- brand, supplier
- current_price

dim_store:
- store_key (PK)
- store_name, city, region, country

dim_customer:
- customer_key (PK)
- customer_name, segment
- registration_date, tenure_months`,
          pt: `As Dimensões são tabelas que descrevem "quem, o quê, onde, quando":

dim_date:
- date_key (PK, formato YYYYMMDD)
- full_date, day, month, year
- day_of_week, week_of_year
- is_weekend, is_holiday
- quarter, fiscal_year

dim_product:
- product_key (PK, surrogate key)
- product_id (natural key)
- product_name, category, subcategory
- brand, supplier
- current_price

dim_store:
- store_key (PK)
- store_name, city, region, country

dim_customer:
- customer_key (PK)
- customer_name, segment
- registration_date, tenure_months`
        },
        components: ['Dimension Tables', 'Surrogate Keys', 'Attributes'],
        diagram: `
                    ┌─────────────┐
                    │  dim_date   │
                    │ date_key    │
                    │ day, month  │
                    │ quarter...  │
                    └──────┬──────┘
                           │
┌─────────────┐     ┌──────┴──────┐     ┌─────────────┐
│ dim_product │     │ fact_sales  │     │  dim_store  │
│ product_key ├────▶│             │◀────┤ store_key   │
│ name, cat.  │     │  measures   │     │ city, region│
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                    ┌──────┴──────┐
                    │dim_customer │
                    │customer_key │
                    │ segment...  │
                    └─────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'Star Schema Completo', en: 'Complete Star Schema', pt: 'Star Schema Completo' },
        description: {
          es: `El Star Schema se llama así porque las dimensiones rodean la fact table como una estrella.

Ventajas:
✅ Queries simples con JOINs directos
✅ Fácil de entender para analistas
✅ Performance optimizada para agregaciones
✅ Herramientas BI lo soportan nativamente

Query típica:
SELECT 
  d.month,
  p.category,
  s.region,
  SUM(f.total_amount) as revenue
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_store s ON f.store_key = s.store_key
GROUP BY d.month, p.category, s.region

Esta query es rápida porque:
- Solo JOINs simples (no cascada)
- Dimensiones son pequeñas
- Fact table está particionada por fecha`,
          en: `The Star Schema is named because dimensions surround the fact table like a star.

Advantages:
✅ Simple queries with direct JOINs
✅ Easy to understand for analysts
✅ Optimized performance for aggregations
✅ BI tools support it natively

Typical query:
SELECT 
  d.month,
  p.category,
  s.region,
  SUM(f.total_amount) as revenue
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_store s ON f.store_key = s.store_key
GROUP BY d.month, p.category, s.region

This query is fast because:
- Only simple JOINs (no cascade)
- Dimensions are small
- Fact table is partitioned by date`,
          pt: `O Star Schema se chama assim porque as dimensões cercam a tabela fato como uma estrela.

Vantagens:
✅ Queries simples com JOINs diretos
✅ Fácil de entender para analistas
✅ Performance otimizada para agregações
✅ Ferramentas BI suportam nativamente

Query típica:
SELECT 
  d.month,
  p.category,
  s.region,
  SUM(f.total_amount) as revenue
FROM fact_sales f
JOIN dim_date d ON f.date_key = d.date_key
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_store s ON f.store_key = s.store_key
GROUP BY d.month, p.category, s.region

Esta query é rápida porque:
- Só JOINs simples (sem cascata)
- Dimensões são pequenas
- Tabela fato está particionada por data`
        },
        components: ['Star Schema', 'Query Optimization', 'Partitioning'],
        diagram: `
                          ┌───────────┐
                          │ dim_date  │
                          └─────┬─────┘
                                │
        ┌───────────┐     ┌─────┴─────┐     ┌───────────┐
        │dim_product│─────│fact_sales │─────│ dim_store │
        └───────────┘     └─────┬─────┘     └───────────┘
                                │
                          ┌─────┴─────┐
                          │dim_customer│
                          └───────────┘
                          
                     ⭐ STAR SCHEMA ⭐
        `
      },
      {
        step: 4,
        title: { es: 'SCD Tipo 2 para Historial', en: 'SCD Type 2 for History', pt: 'SCD Tipo 2 para Histórico' },
        description: {
          es: `Para trackear cambios históricos usamos Slowly Changing Dimensions (SCD) Tipo 2:

dim_product (con SCD Tipo 2):
- product_key (surrogate key, único)
- product_id (natural key, se repite)
- product_name, category, price
- valid_from (fecha inicio)
- valid_to (fecha fin, NULL = actual)
- is_current (boolean)

Ejemplo:
| product_key | product_id | price | valid_from | valid_to   | is_current |
|-------------|------------|-------|------------|------------|------------|
| 1           | PROD-001   | 100   | 2023-01-01 | 2023-06-30 | false      |
| 2           | PROD-001   | 120   | 2023-07-01 | NULL       | true       |

Así podemos ver ventas con el precio que tenía el producto EN ESE MOMENTO.`,
          en: `To track historical changes we use Slowly Changing Dimensions (SCD) Type 2:

dim_product (with SCD Type 2):
- product_key (surrogate key, unique)
- product_id (natural key, repeats)
- product_name, category, price
- valid_from (start date)
- valid_to (end date, NULL = current)
- is_current (boolean)

Example:
| product_key | product_id | price | valid_from | valid_to   | is_current |
|-------------|------------|-------|------------|------------|------------|
| 1           | PROD-001   | 100   | 2023-01-01 | 2023-06-30 | false      |
| 2           | PROD-001   | 120   | 2023-07-01 | NULL       | true       |

This way we can see sales with the price the product had AT THAT TIME.`,
          pt: `Para rastrear mudanças históricas usamos Slowly Changing Dimensions (SCD) Tipo 2:

dim_product (com SCD Tipo 2):
- product_key (surrogate key, único)
- product_id (natural key, se repete)
- product_name, category, price
- valid_from (data início)
- valid_to (data fim, NULL = atual)
- is_current (boolean)

Exemplo:
| product_key | product_id | price | valid_from | valid_to   | is_current |
|-------------|------------|-------|------------|------------|------------|
| 1           | PROD-001   | 100   | 2023-01-01 | 2023-06-30 | false      |
| 2           | PROD-001   | 120   | 2023-07-01 | NULL       | true       |

Assim podemos ver vendas com o preço que o produto tinha NAQUELE MOMENTO.`
        },
        components: ['SCD Type 2', 'Surrogate Keys', 'Historical Tracking'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│           dim_product (SCD Type 2)                       │
├───────────┬───────────┬───────┬────────────┬───────────┤
│product_key│product_id │ price │ valid_from │ valid_to  │
├───────────┼───────────┼───────┼────────────┼───────────┤
│     1     │ PROD-001  │  100  │ 2023-01-01 │2023-06-30 │
│     2     │ PROD-001  │  120  │ 2023-07-01 │   NULL    │ ← current
│     3     │ PROD-002  │   50  │ 2023-01-01 │   NULL    │ ← current
└───────────┴───────────┴───────┴────────────┴───────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Star Schema vs Snowflake Schema', en: 'Star Schema vs Snowflake Schema', pt: 'Star Schema vs Snowflake Schema' },
        option1: { es: 'Star: Dimensiones denormalizadas, más simple, queries más rápidas', en: 'Star: Denormalized dimensions, simpler, faster queries', pt: 'Star: Dimensões desnormalizadas, mais simples, queries mais rápidas' },
        option2: { es: 'Snowflake: Dimensiones normalizadas, menos espacio, más JOINs', en: 'Snowflake: Normalized dimensions, less space, more JOINs', pt: 'Snowflake: Dimensões normalizadas, menos espaço, mais JOINs' },
        recommendation: { es: 'Star Schema para la mayoría de casos - simplicidad > ahorro de espacio', en: 'Star Schema for most cases - simplicity > space savings', pt: 'Star Schema para a maioria dos casos - simplicidade > economia de espaço' }
      },
      {
        decision: { es: 'SCD Tipo 1 vs Tipo 2', en: 'SCD Type 1 vs Type 2', pt: 'SCD Tipo 1 vs Tipo 2' },
        option1: { es: 'Tipo 1: Sobrescribir (no hay historial), más simple', en: 'Type 1: Overwrite (no history), simpler', pt: 'Tipo 1: Sobrescrever (sem histórico), mais simples' },
        option2: { es: 'Tipo 2: Nueva fila por cambio (historial completo), más complejo', en: 'Type 2: New row per change (full history), more complex', pt: 'Tipo 2: Nova linha por mudança (histórico completo), mais complexo' },
        recommendation: { es: 'Tipo 2 para precios y atributos importantes. Tipo 1 para datos que no cambian.', en: 'Type 2 for prices and important attributes. Type 1 for data that doesn\'t change.', pt: 'Tipo 2 para preços e atributos importantes. Tipo 1 para dados que não mudam.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No usar surrogate keys - problemas cuando cambian IDs naturales', en: '❌ Not using surrogate keys - problems when natural IDs change', pt: '❌ Não usar surrogate keys - problemas quando IDs naturais mudam' },
      { es: '❌ Poner demasiadas columnas en la fact table (debe ser solo medidas y FKs)', en: '❌ Putting too many columns in fact table (should only be measures and FKs)', pt: '❌ Colocar muitas colunas na tabela fato (deve ser só medidas e FKs)' },
      { es: '❌ No crear dim_date - es SIEMPRE necesaria', en: '❌ Not creating dim_date - it\'s ALWAYS necessary', pt: '❌ Não criar dim_date - é SEMPRE necessária' },
      { es: '❌ Olvidar particionar fact table por fecha', en: '❌ Forgetting to partition fact table by date', pt: '❌ Esquecer de particionar tabela fato por data' }
    ],
    interviewerTips: [
      { es: '💡 Siempre empezá identificando qué quieren MEDIR (eso es la fact table)', en: '💡 Always start by identifying what they want to MEASURE (that\'s the fact table)', pt: '💡 Sempre comece identificando o que querem MEDIR (isso é a tabela fato)' },
      { es: '💡 Preguntá por análisis históricos para determinar si necesitan SCD', en: '💡 Ask about historical analysis to determine if they need SCD', pt: '💡 Pergunte sobre análises históricas para determinar se precisam de SCD' },
      { es: '💡 Dibujá el star schema - es muy visual y los entrevistadores lo valoran', en: '💡 Draw the star schema - it\'s very visual and interviewers appreciate it', pt: '💡 Desenhe o star schema - é muito visual e os entrevistadores valorizam' }
    ],
    relatedTopics: ['Star Schema', 'Dimensional Modeling', 'SCD', 'Data Warehouse', 'Kimball'],
    estimatedXP: 450
  },

  // ============ INTERVIEW 9: DATA QUALITY PIPELINE (JUNIOR) ============
  {
    id: 'sd-data-quality',
    title: {
      es: 'Pipeline de Calidad de Datos',
      en: 'Data Quality Pipeline',
      pt: 'Pipeline de Qualidade de Dados'
    },
    company: 'Fintech / Startup',
    difficulty: 'junior',
    duration: '30 min',
    tags: ['Data Quality', 'Testing', 'Great Expectations', 'dbt', 'Entry-level'],
    problem: {
      es: `Una fintech tiene problemas con la calidad de sus datos:
- El mes pasado enviaron reportes con números incorrectos al regulador
- Hay clientes con fechas de nacimiento en el futuro
- Algunas transacciones tienen montos negativos que no deberían
- Los dashboards a veces muestran NULL donde no debería

El Data Lead pregunta: "¿Cómo diseñarías un sistema para detectar y alertar sobre problemas de calidad de datos?"`,
      en: `A fintech has data quality problems:
- Last month they sent reports with incorrect numbers to the regulator
- There are customers with birth dates in the future
- Some transactions have negative amounts that shouldn't exist
- Dashboards sometimes show NULL where they shouldn't

The Data Lead asks: "How would you design a system to detect and alert on data quality issues?"`,
      pt: `Uma fintech tem problemas de qualidade de dados:
- No mês passado enviaram relatórios com números incorretos ao regulador
- Há clientes com datas de nascimento no futuro
- Algumas transações têm valores negativos que não deveriam existir
- Os dashboards às vezes mostram NULL onde não deveriam

O Data Lead pergunta: "Como você projetaria um sistema para detectar e alertar sobre problemas de qualidade de dados?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuándo necesitan detectar los problemas? ¿En tiempo real o está bien diario?', en: 'When do you need to detect issues? Real-time or daily is OK?', pt: 'Quando precisam detectar os problemas? Em tempo real ou diário está ok?' },
        whyAsk: { es: 'Define si necesitamos validación en streaming o batch', en: 'Defines if we need streaming or batch validation', pt: 'Define se precisamos de validação em streaming ou batch' },
        typicalAnswer: { es: 'Con detectar problemas antes del reporte diario está bien', en: 'Detecting issues before the daily report is fine', pt: 'Detectar problemas antes do relatório diário está ok' }
      },
      {
        question: { es: '¿Qué pasa cuando detectan un problema? ¿Bloquean el pipeline o solo alertan?', en: 'What happens when you detect an issue? Block the pipeline or just alert?', pt: 'O que acontece quando detectam um problema? Bloqueiam o pipeline ou só alertam?' },
        whyAsk: { es: 'Define si los tests son bloqueantes o solo informativos', en: 'Defines if tests are blocking or just informational', pt: 'Define se os testes são bloqueantes ou só informativos' },
        typicalAnswer: { es: 'Para datos regulatorios debe bloquear, para dashboards solo alertar', en: 'For regulatory data it must block, for dashboards just alert', pt: 'Para dados regulatórios deve bloquear, para dashboards só alertar' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Validar datos antes de cada carga al warehouse', en: 'Validate data before each warehouse load', pt: 'Validar dados antes de cada carga ao warehouse' },
        { es: 'Alertar cuando hay anomalías', en: 'Alert when there are anomalies', pt: 'Alertar quando há anomalias' },
        { es: 'Dashboard de estado de calidad de datos', en: 'Data quality status dashboard', pt: 'Dashboard de status de qualidade de dados' },
        { es: 'Historial de problemas detectados', en: 'History of detected issues', pt: 'Histórico de problemas detectados' }
      ],
      nonFunctional: [
        { es: 'Tests deben correr en < 10 minutos', en: 'Tests must run in < 10 minutes', pt: 'Testes devem rodar em < 10 minutos' },
        { es: 'Fácil de agregar nuevas reglas', en: 'Easy to add new rules', pt: 'Fácil de adicionar novas regras' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Tipos de Validaciones', en: 'Types of Validations', pt: 'Tipos de Validações' },
        description: {
          es: `Hay diferentes tipos de checks de calidad:

1. Schema Validation (estructura):
   - ¿Las columnas existen?
   - ¿Los tipos de datos son correctos?

2. Completeness (completitud):
   - ¿Hay NULLs donde no debería?
   - ¿Faltan registros esperados?

3. Uniqueness (unicidad):
   - ¿Hay duplicados en primary keys?

4. Validity (validez):
   - ¿Los valores están en rangos válidos?
   - ¿Los emails tienen formato correcto?

5. Consistency (consistencia):
   - ¿Los totales cuadran?
   - ¿Las relaciones FK existen?

6. Freshness (frescura):
   - ¿Los datos son recientes?`,
          en: `There are different types of quality checks:

1. Schema Validation (structure):
   - Do columns exist?
   - Are data types correct?

2. Completeness:
   - Are there NULLs where they shouldn't be?
   - Are expected records missing?

3. Uniqueness:
   - Are there duplicates in primary keys?

4. Validity:
   - Are values in valid ranges?
   - Do emails have correct format?

5. Consistency:
   - Do totals add up?
   - Do FK relationships exist?

6. Freshness:
   - Is data recent?`,
          pt: `Há diferentes tipos de checks de qualidade:

1. Schema Validation (estrutura):
   - As colunas existem?
   - Os tipos de dados estão corretos?

2. Completeness (completude):
   - Há NULLs onde não deveria?
   - Faltam registros esperados?

3. Uniqueness (unicidade):
   - Há duplicados em primary keys?

4. Validity (validade):
   - Os valores estão em ranges válidos?
   - Os emails têm formato correto?

5. Consistency (consistência):
   - Os totais batem?
   - As relações FK existem?

6. Freshness (frescura):
   - Os dados são recentes?`
        },
        components: ['Schema', 'Completeness', 'Uniqueness', 'Validity'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│               Data Quality Dimensions                    │
├─────────────┬─────────────┬─────────────┬──────────────┤
│   Schema    │Completeness │ Uniqueness  │   Validity   │
│  (columns)  │  (NULLs)    │(duplicates) │  (ranges)    │
├─────────────┼─────────────┴─────────────┼──────────────┤
│ Consistency │         Freshness         │   Accuracy   │
│  (totals)   │        (recency)          │  (correct?)  │
└─────────────┴───────────────────────────┴──────────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Implementación con dbt tests', en: 'Implementation with dbt tests', pt: 'Implementação com dbt tests' },
        description: {
          es: `dbt tiene tests de calidad integrados:

schema.yml:
models:
  - name: customers
    columns:
      - name: customer_id
        tests:
          - unique        # No duplicados
          - not_null      # No NULLs
      - name: email
        tests:
          - unique
          - not_null
      - name: birth_date
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: "birth_date <= current_date"
      - name: balance
        tests:
          - dbt_utils.expression_is_true:
              expression: "balance >= 0"

Tests custom en SQL:
-- tests/assert_total_balance_matches.sql
SELECT 1
WHERE (SELECT SUM(balance) FROM customers)
   != (SELECT total_balance FROM daily_totals)`,
          en: `dbt has built-in quality tests:

schema.yml:
models:
  - name: customers
    columns:
      - name: customer_id
        tests:
          - unique        # No duplicates
          - not_null      # No NULLs
      - name: email
        tests:
          - unique
          - not_null
      - name: birth_date
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: "birth_date <= current_date"
      - name: balance
        tests:
          - dbt_utils.expression_is_true:
              expression: "balance >= 0"

Custom SQL tests:
-- tests/assert_total_balance_matches.sql
SELECT 1
WHERE (SELECT SUM(balance) FROM customers)
   != (SELECT total_balance FROM daily_totals)`,
          pt: `dbt tem testes de qualidade integrados:

schema.yml:
models:
  - name: customers
    columns:
      - name: customer_id
        tests:
          - unique        # Sem duplicados
          - not_null      # Sem NULLs
      - name: email
        tests:
          - unique
          - not_null
      - name: birth_date
        tests:
          - not_null
          - dbt_utils.expression_is_true:
              expression: "birth_date <= current_date"
      - name: balance
        tests:
          - dbt_utils.expression_is_true:
              expression: "balance >= 0"

Testes custom em SQL:
-- tests/assert_total_balance_matches.sql
SELECT 1
WHERE (SELECT SUM(balance) FROM customers)
   != (SELECT total_balance FROM daily_totals)`
        },
        components: ['dbt', 'dbt tests', 'schema.yml'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                    dbt Pipeline                          │
│                                                          │
│  Source Data  →  dbt run  →  dbt test  →  Production    │
│                     │            │                       │
│                     │            ▼                       │
│                     │       ┌─────────┐                 │
│                     │       │ Tests:  │                 │
│                     │       │- unique │                 │
│                     │       │- not_null│                │
│                     │       │- custom │                 │
│                     │       └────┬────┘                 │
│                     │            │                       │
│                     │      Pass? │ Fail?                │
│                     │        ✓   │   ✗                  │
│                     │            │   ↓                  │
│                     │            │ ALERT!               │
└─────────────────────────────────────────────────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'Pipeline Completo', en: 'Complete Pipeline', pt: 'Pipeline Completo' },
        description: {
          es: `El pipeline de calidad se integra en el proceso ETL:

1. Ingest: Datos llegan a staging
2. Test staging: Validaciones básicas
3. Transform: dbt transforma datos
4. Test transform: Validaciones de negocio
5. Load: Si todo pasa → producción
6. Monitor: Alertas continuas

Severidad de tests:
- ERROR: Bloquea pipeline (datos regulatorios)
- WARN: Solo alerta, pipeline continúa
- INFO: Log para análisis

Alertas van a:
- Slack: Para el equipo de datos
- PagerDuty: Para errores críticos
- Dashboard: Para tracking histórico`,
          en: `The quality pipeline integrates into the ETL process:

1. Ingest: Data arrives at staging
2. Test staging: Basic validations
3. Transform: dbt transforms data
4. Test transform: Business validations
5. Load: If all pass → production
6. Monitor: Continuous alerts

Test severity:
- ERROR: Blocks pipeline (regulatory data)
- WARN: Just alert, pipeline continues
- INFO: Log for analysis

Alerts go to:
- Slack: For the data team
- PagerDuty: For critical errors
- Dashboard: For historical tracking`,
          pt: `O pipeline de qualidade se integra no processo ETL:

1. Ingest: Dados chegam no staging
2. Test staging: Validações básicas
3. Transform: dbt transforma dados
4. Test transform: Validações de negócio
5. Load: Se tudo passa → produção
6. Monitor: Alertas contínuas

Severidade dos testes:
- ERROR: Bloqueia pipeline (dados regulatórios)
- WARN: Só alerta, pipeline continua
- INFO: Log para análise

Alertas vão para:
- Slack: Para o time de dados
- PagerDuty: Para erros críticos
- Dashboard: Para tracking histórico`
        },
        components: ['ETL', 'dbt', 'Slack', 'Monitoring'],
        diagram: `
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Source  │──▶│ Staging │──▶│Transform│──▶│  Prod   │
└─────────┘   └────┬────┘   └────┬────┘   └─────────┘
                   │             │
                   ▼             ▼
              ┌─────────┐   ┌─────────┐
              │ Tests 1 │   │ Tests 2 │
              │ (basic) │   │(business│
              └────┬────┘   └────┬────┘
                   │             │
                   └──────┬──────┘
                          ▼
                   ┌─────────────┐
                   │   Alerts    │
                   │ Slack/Pager │
                   └─────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'dbt tests vs Great Expectations', en: 'dbt tests vs Great Expectations', pt: 'dbt tests vs Great Expectations' },
        option1: { es: 'dbt tests: Integrado, simple, menos features', en: 'dbt tests: Integrated, simple, fewer features', pt: 'dbt tests: Integrado, simples, menos features' },
        option2: { es: 'Great Expectations: Más potente, documentación auto, más setup', en: 'Great Expectations: More powerful, auto docs, more setup', pt: 'Great Expectations: Mais potente, docs auto, mais setup' },
        recommendation: { es: 'Empezá con dbt tests, agregá GX cuando necesites más poder.', en: 'Start with dbt tests, add GX when you need more power.', pt: 'Comece com dbt tests, adicione GX quando precisar de mais poder.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Solo testear en producción - los errores ya llegaron', en: '❌ Only testing in production - errors already arrived', pt: '❌ Só testar em produção - os erros já chegaram' },
      { es: '❌ Demasiadas alertas - fatiga de alertas, se ignoran', en: '❌ Too many alerts - alert fatigue, they get ignored', pt: '❌ Muitos alertas - fadiga de alertas, são ignorados' },
      { es: '❌ No documentar qué significa cada test', en: '❌ Not documenting what each test means', pt: '❌ Não documentar o que cada teste significa' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná las 6 dimensiones de calidad de datos', en: '💡 Mention the 6 dimensions of data quality', pt: '💡 Mencione as 6 dimensões de qualidade de dados' },
      { es: '💡 Hablá de severidades (ERROR vs WARN)', en: '💡 Talk about severities (ERROR vs WARN)', pt: '💡 Fale de severidades (ERROR vs WARN)' },
      { es: '💡 Mencioná que los tests deben estar en el pipeline, no después', en: '💡 Mention that tests should be in the pipeline, not after', pt: '💡 Mencione que os testes devem estar no pipeline, não depois' }
    ],
    relatedTopics: ['Data Quality', 'dbt', 'Great Expectations', 'Testing', 'ETL'],
    estimatedXP: 400
  },

  // ============ INTERVIEW 10: LOG ANALYTICS (JUNIOR) ============
  {
    id: 'sd-log-analytics',
    title: {
      es: 'Sistema de Analytics de Logs',
      en: 'Log Analytics System',
      pt: 'Sistema de Analytics de Logs'
    },
    company: 'Tech Company / SaaS',
    difficulty: 'junior',
    duration: '30 min',
    tags: ['Logs', 'ELK', 'Analytics', 'Monitoring', 'Entry-level'],
    problem: {
      es: `Una empresa SaaS tiene 50 microservicios que generan logs.
Problemas actuales:
- Los logs están en cada servidor, hay que hacer SSH para verlos
- Cuando hay un error en producción, tardan 30+ min en encontrar la causa
- No saben cuántos errores tienen por día
- No pueden buscar por usuario o transacción

El DevOps Lead pregunta: "¿Cómo centralizarías los logs para poder analizarlos?"`,
      en: `A SaaS company has 50 microservices generating logs.
Current problems:
- Logs are on each server, need SSH to see them
- When there's a production error, it takes 30+ min to find the cause
- They don't know how many errors they have per day
- They can't search by user or transaction

The DevOps Lead asks: "How would you centralize logs to be able to analyze them?"`,
      pt: `Uma empresa SaaS tem 50 microserviços que geram logs.
Problemas atuais:
- Os logs estão em cada servidor, precisa fazer SSH para ver
- Quando há um erro em produção, demoram 30+ min para encontrar a causa
- Não sabem quantos erros têm por dia
- Não conseguem buscar por usuário ou transação

O DevOps Lead pergunta: "Como você centralizaria os logs para poder analisá-los?"`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuántos GB de logs generan por día?', en: 'How many GB of logs do you generate per day?', pt: 'Quantos GB de logs vocês geram por dia?' },
        whyAsk: { es: 'Define el sizing del cluster y costos', en: 'Defines cluster sizing and costs', pt: 'Define o dimensionamento do cluster e custos' },
        typicalAnswer: { es: 'Unos 50 GB por día, 1.5 TB al mes', en: 'About 50 GB per day, 1.5 TB per month', pt: 'Uns 50 GB por dia, 1.5 TB por mês' }
      },
      {
        question: { es: '¿Cuánto tiempo necesitan retener los logs?', en: 'How long do you need to retain logs?', pt: 'Quanto tempo precisam reter os logs?' },
        whyAsk: { es: 'Define el storage necesario y políticas de retención', en: 'Defines storage needed and retention policies', pt: 'Define o storage necessário e políticas de retenção' },
        typicalAnswer: { es: '30 días para búsqueda rápida, 1 año en archivo', en: '30 days for quick search, 1 year in archive', pt: '30 dias para busca rápida, 1 ano em arquivo' }
      },
      {
        question: { es: '¿Los logs tienen un formato estándar o cada servicio logea diferente?', en: 'Do logs have a standard format or does each service log differently?', pt: 'Os logs têm um formato padrão ou cada serviço loga diferente?' },
        whyAsk: { es: 'Define si necesitamos parseo complejo', en: 'Defines if we need complex parsing', pt: 'Define se precisamos de parsing complexo' },
        typicalAnswer: { es: 'Cada equipo usa su formato, es un caos', en: 'Each team uses their format, it\'s chaos', pt: 'Cada time usa seu formato, é um caos' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Centralizar logs de todos los servicios', en: 'Centralize logs from all services', pt: 'Centralizar logs de todos os serviços' },
        { es: 'Búsqueda full-text en < 5 segundos', en: 'Full-text search in < 5 seconds', pt: 'Busca full-text em < 5 segundos' },
        { es: 'Dashboard de métricas de errores', en: 'Error metrics dashboard', pt: 'Dashboard de métricas de erros' },
        { es: 'Alertas cuando hay muchos errores', en: 'Alerts when there are many errors', pt: 'Alertas quando há muitos erros' }
      ],
      nonFunctional: [
        { es: 'Latencia de ingesta < 30 segundos', en: 'Ingestion latency < 30 seconds', pt: 'Latência de ingestão < 30 segundos' },
        { es: 'Retención 30 días hot, 1 año cold', en: 'Retention 30 days hot, 1 year cold', pt: 'Retenção 30 dias hot, 1 ano cold' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Arquitectura ELK/OpenSearch', en: 'ELK/OpenSearch Architecture', pt: 'Arquitetura ELK/OpenSearch' },
        description: {
          es: `El stack ELK (Elasticsearch, Logstash, Kibana) o su versión open source OpenSearch:

Componentes:
- Agents (Filebeat/Fluentd): Recolectan logs de cada servidor
- Kafka (opcional): Buffer para no perder logs
- Logstash: Parsea y transforma logs
- Elasticsearch/OpenSearch: Almacena e indexa
- Kibana: Visualización y búsqueda

Flujo:
App → Filebeat → Kafka → Logstash → Elasticsearch → Kibana`,
          en: `The ELK stack (Elasticsearch, Logstash, Kibana) or its open source version OpenSearch:

Components:
- Agents (Filebeat/Fluentd): Collect logs from each server
- Kafka (optional): Buffer to not lose logs
- Logstash: Parse and transform logs
- Elasticsearch/OpenSearch: Store and index
- Kibana: Visualization and search

Flow:
App → Filebeat → Kafka → Logstash → Elasticsearch → Kibana`,
          pt: `O stack ELK (Elasticsearch, Logstash, Kibana) ou sua versão open source OpenSearch:

Componentes:
- Agents (Filebeat/Fluentd): Coletam logs de cada servidor
- Kafka (opcional): Buffer para não perder logs
- Logstash: Parseia e transforma logs
- Elasticsearch/OpenSearch: Armazena e indexa
- Kibana: Visualização e busca

Fluxo:
App → Filebeat → Kafka → Logstash → Elasticsearch → Kibana`
        },
        components: ['Filebeat', 'Kafka', 'Logstash', 'Elasticsearch', 'Kibana'],
        diagram: `
┌─────────┐ ┌─────────┐ ┌─────────┐
│Service 1│ │Service 2│ │Service N│
└────┬────┘ └────┬────┘ └────┬────┘
     │           │           │
     └─────────┬─────────────┘
               │ Filebeat
               ▼
         ┌───────────┐
         │   Kafka   │ (buffer)
         └─────┬─────┘
               │
               ▼
         ┌───────────┐
         │ Logstash  │ (parse)
         └─────┬─────┘
               │
               ▼
         ┌───────────┐
         │Elasticsearch│
         └─────┬─────┘
               │
               ▼
         ┌───────────┐
         │  Kibana   │
         └───────────┘
        `
      },
      {
        step: 2,
        title: { es: 'Formato de Logs Estructurado', en: 'Structured Log Format', pt: 'Formato de Logs Estruturado' },
        description: {
          es: `Definir un formato estándar para TODOS los servicios:

JSON estructurado:
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "payment-api",
  "trace_id": "abc123",
  "user_id": "user_456",
  "message": "Payment failed",
  "error": {
    "type": "CardDeclined",
    "code": "INSUFFICIENT_FUNDS"
  },
  "context": {
    "amount": 100.00,
    "currency": "USD"
  }
}

Campos obligatorios:
- timestamp (ISO 8601)
- level (DEBUG, INFO, WARN, ERROR)
- service (nombre del microservicio)
- trace_id (para tracking distribuido)
- message

Esto permite:
- Filtrar por nivel: level:ERROR
- Buscar por usuario: user_id:user_456
- Seguir una transacción: trace_id:abc123`,
          en: `Define a standard format for ALL services:

Structured JSON:
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "payment-api",
  "trace_id": "abc123",
  "user_id": "user_456",
  "message": "Payment failed",
  "error": {
    "type": "CardDeclined",
    "code": "INSUFFICIENT_FUNDS"
  },
  "context": {
    "amount": 100.00,
    "currency": "USD"
  }
}

Required fields:
- timestamp (ISO 8601)
- level (DEBUG, INFO, WARN, ERROR)
- service (microservice name)
- trace_id (for distributed tracing)
- message

This allows:
- Filter by level: level:ERROR
- Search by user: user_id:user_456
- Follow a transaction: trace_id:abc123`,
          pt: `Definir um formato padrão para TODOS os serviços:

JSON estruturado:
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "ERROR",
  "service": "payment-api",
  "trace_id": "abc123",
  "user_id": "user_456",
  "message": "Payment failed",
  "error": {
    "type": "CardDeclined",
    "code": "INSUFFICIENT_FUNDS"
  },
  "context": {
    "amount": 100.00,
    "currency": "USD"
  }
}

Campos obrigatórios:
- timestamp (ISO 8601)
- level (DEBUG, INFO, WARN, ERROR)
- service (nome do microserviço)
- trace_id (para tracking distribuído)
- message

Isso permite:
- Filtrar por nível: level:ERROR
- Buscar por usuário: user_id:user_456
- Seguir uma transação: trace_id:abc123`
        },
        components: ['JSON', 'Structured Logging', 'Trace ID'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│              Structured Log Event                        │
├─────────────────────────────────────────────────────────┤
│ timestamp │ level │ service    │ trace_id │ message    │
├───────────┼───────┼────────────┼──────────┼────────────┤
│ 2024-01-15│ ERROR │ payment-api│ abc123   │ Payment... │
│ 2024-01-15│ INFO  │ user-api   │ abc123   │ User found │
│ 2024-01-15│ ERROR │ payment-api│ def456   │ Timeout    │
└─────────────────────────────────────────────────────────┘
         │
         │ Same trace_id = same transaction!
         ▼
┌─────────────────────────────────────────────────────────┐
│  trace_id:abc123 shows full request flow across services│
└─────────────────────────────────────────────────────────┘
        `
      },
      {
        step: 3,
        title: { es: 'Dashboards y Alertas', en: 'Dashboards and Alerts', pt: 'Dashboards e Alertas' },
        description: {
          es: `Kibana para visualización:

Dashboard principal:
- Errores por servicio (last 24h)
- Errores por hora (time series)
- Top 10 tipos de error
- Latencia por servicio

Alertas configuradas:
- Más de 100 errores en 5 minutos → Slack
- Más de 1000 errores en 1 hora → PagerDuty
- Nuevo tipo de error detectado → Email

Saved searches para debugging:
- "Todos los errores del servicio X"
- "Logs de una transacción específica"
- "Errores de autenticación"`,
          en: `Kibana for visualization:

Main dashboard:
- Errors by service (last 24h)
- Errors by hour (time series)
- Top 10 error types
- Latency by service

Configured alerts:
- More than 100 errors in 5 minutes → Slack
- More than 1000 errors in 1 hour → PagerDuty
- New error type detected → Email

Saved searches for debugging:
- "All errors from service X"
- "Logs from a specific transaction"
- "Authentication errors"`,
          pt: `Kibana para visualização:

Dashboard principal:
- Erros por serviço (last 24h)
- Erros por hora (time series)
- Top 10 tipos de erro
- Latência por serviço

Alertas configuradas:
- Mais de 100 erros em 5 minutos → Slack
- Mais de 1000 erros em 1 hora → PagerDuty
- Novo tipo de erro detectado → Email

Buscas salvas para debugging:
- "Todos os erros do serviço X"
- "Logs de uma transação específica"
- "Erros de autenticação"`
        },
        components: ['Kibana', 'Dashboards', 'Alerts'],
        diagram: `
┌─────────────────────────────────────────────────────────┐
│                 Kibana Dashboard                         │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Errors: 234  │  │ Services: 50 │  │ Alerts: 3    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│  [Graph: Errors over time]                              │
│  ████████████████▓▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░             │
├─────────────────────────────────────────────────────────┤
│  Top Errors:                                             │
│  1. NullPointerException (45)                           │
│  2. ConnectionTimeout (32)                              │
│  3. AuthFailed (28)                                     │
└─────────────────────────────────────────────────────────┘
        `
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'ELK self-hosted vs CloudWatch/Datadog', en: 'ELK self-hosted vs CloudWatch/Datadog', pt: 'ELK self-hosted vs CloudWatch/Datadog' },
        option1: { es: 'ELK: Más control, más barato a escala, más ops', en: 'ELK: More control, cheaper at scale, more ops', pt: 'ELK: Mais controle, mais barato em escala, mais ops' },
        option2: { es: 'CloudWatch/Datadog: Managed, más caro, menos ops', en: 'CloudWatch/Datadog: Managed, more expensive, less ops', pt: 'CloudWatch/Datadog: Managed, mais caro, menos ops' },
        recommendation: { es: 'Datadog si tenés budget y querés simplicidad. ELK si querés control y ahorro.', en: 'Datadog if you have budget and want simplicity. ELK if you want control and savings.', pt: 'Datadog se tem budget e quer simplicidade. ELK se quer controle e economia.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No definir formato estándar - imposible buscar después', en: '❌ Not defining standard format - impossible to search later', pt: '❌ Não definir formato padrão - impossível buscar depois' },
      { es: '❌ Logear información sensible (passwords, tokens)', en: '❌ Logging sensitive info (passwords, tokens)', pt: '❌ Logear informação sensível (passwords, tokens)' },
      { es: '❌ Logear todo en DEBUG - costos de storage explosivos', en: '❌ Logging everything in DEBUG - explosive storage costs', pt: '❌ Logear tudo em DEBUG - custos de storage explosivos' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná la importancia del trace_id para debugging distribuido', en: '💡 Mention the importance of trace_id for distributed debugging', pt: '💡 Mencione a importância do trace_id para debugging distribuído' },
      { es: '💡 Hablá de retención en tiers (hot/warm/cold)', en: '💡 Talk about retention in tiers (hot/warm/cold)', pt: '💡 Fale de retenção em tiers (hot/warm/cold)' },
      { es: '💡 No te olvides de mencionar seguridad - PII en logs', en: '💡 Don\'t forget to mention security - PII in logs', pt: '💡 Não esqueça de mencionar segurança - PII em logs' }
    ],
    relatedTopics: ['ELK', 'Logging', 'Monitoring', 'Observability', 'Microservices'],
    estimatedXP: 400
  },

  // ============ INTERVIEW 11: SOCIAL MEDIA ANALYTICS ============
  {
    id: 'sd-social-analytics',
    title: {
      es: 'Analytics de Redes Sociales',
      en: 'Social Media Analytics Platform',
      pt: 'Analytics de Redes Sociais'
    },
    company: 'Social Media (estilo Twitter/LinkedIn)',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['Streaming', 'Analytics', 'Real-time', 'Aggregations'],
    problem: {
      es: `Sos Data Engineer en una red social con 50M de usuarios activos. 
El equipo de Growth necesita:
1. Métricas en tiempo real: posts, likes, shares por minuto
2. Tendencias: hashtags trending en los últimos 15 minutos
3. Analytics por usuario: engagement rate, mejores horarios para postear
4. Dashboard para el equipo de moderación

¿Cómo diseñarías este sistema?`,
      en: `You're a Data Engineer at a social network with 50M active users.
The Growth team needs:
1. Real-time metrics: posts, likes, shares per minute
2. Trends: trending hashtags in the last 15 minutes
3. Per-user analytics: engagement rate, best times to post
4. Dashboard for the moderation team

How would you design this system?`,
      pt: `Você é Data Engineer em uma rede social com 50M de usuários ativos.
O time de Growth precisa de:
1. Métricas em tempo real: posts, likes, shares por minuto
2. Tendências: hashtags em alta nos últimos 15 minutos
3. Analytics por usuário: taxa de engajamento, melhores horários para postar
4. Dashboard para o time de moderação

Como você projetaria este sistema?`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuántos eventos por segundo manejamos?', en: 'How many events per second do we handle?', pt: 'Quantos eventos por segundo temos?' },
        whyAsk: { es: 'Define si necesitamos streaming pesado', en: 'Defines if we need heavy streaming', pt: 'Define se precisamos de streaming pesado' },
        typicalAnswer: { es: 'Picos de 100k eventos/segundo', en: 'Peaks of 100k events/second', pt: 'Picos de 100k eventos/segundo' }
      },
      {
        question: { es: '¿Qué latencia es aceptable para trending?', en: 'What latency is acceptable for trending?', pt: 'Que latência é aceitável para trending?' },
        whyAsk: { es: 'Define la ventana de procesamiento', en: 'Defines the processing window', pt: 'Define a janela de processamento' },
        typicalAnswer: { es: 'Máximo 1 minuto de delay', en: 'Maximum 1 minute delay', pt: 'Máximo 1 minuto de delay' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Contar eventos en tiempo real', en: 'Count events in real-time', pt: 'Contar eventos em tempo real' },
        { es: 'Calcular trending hashtags cada minuto', en: 'Calculate trending hashtags every minute', pt: 'Calcular trending hashtags a cada minuto' },
        { es: 'Agregar métricas por usuario', en: 'Aggregate metrics per user', pt: 'Agregar métricas por usuário' }
      ],
      nonFunctional: [
        { es: 'Latencia < 1 minuto para trending', en: 'Latency < 1 minute for trending', pt: 'Latência < 1 minuto para trending' },
        { es: 'Manejar 100k eventos/segundo', en: 'Handle 100k events/second', pt: 'Lidar com 100k eventos/segundo' },
        { es: '99.9% uptime', en: '99.9% uptime', pt: '99.9% uptime' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Ingesta con Kafka', en: 'Ingestion with Kafka', pt: 'Ingestão com Kafka' },
        description: { es: 'Todos los eventos (posts, likes, shares) van a topics de Kafka particionados por user_id', en: 'All events (posts, likes, shares) go to Kafka topics partitioned by user_id', pt: 'Todos os eventos (posts, likes, shares) vão para topics do Kafka particionados por user_id' },
        components: ['Kafka', 'Schema Registry']
      },
      {
        step: 2,
        title: { es: 'Procesamiento con Flink', en: 'Processing with Flink', pt: 'Processamento com Flink' },
        description: { es: 'Flink para agregaciones en ventanas: trending cada 1 min, métricas por usuario cada 5 min', en: 'Flink for windowed aggregations: trending every 1 min, user metrics every 5 min', pt: 'Flink para agregações em janelas: trending a cada 1 min, métricas por usuário a cada 5 min' },
        components: ['Apache Flink', 'Windowing', 'State Management'],
        diagram: `
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Events    │────▶│    Kafka    │────▶│    Flink    │
│  (50M/day)  │     │  (3 topics) │     │  (windows)  │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                    ┌──────────────────────────┼──────────────────────────┐
                    ▼                          ▼                          ▼
             ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
             │   Redis     │           │  TimescaleDB │           │ ClickHouse  │
             │ (trending)  │           │(user metrics)│           │ (analytics) │
             └─────────────┘           └─────────────┘           └─────────────┘`
      },
      {
        step: 3,
        title: { es: 'Storage por caso de uso', en: 'Storage by use case', pt: 'Storage por caso de uso' },
        description: { es: 'Redis para trending (TTL 1h), TimescaleDB para time-series por usuario, ClickHouse para analytics ad-hoc', en: 'Redis for trending (TTL 1h), TimescaleDB for per-user time-series, ClickHouse for ad-hoc analytics', pt: 'Redis para trending (TTL 1h), TimescaleDB para time-series por usuário, ClickHouse para analytics ad-hoc' },
        components: ['Redis', 'TimescaleDB', 'ClickHouse']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Flink vs Spark Streaming', en: 'Flink vs Spark Streaming', pt: 'Flink vs Spark Streaming' },
        option1: { es: 'Flink: true streaming, mejor latencia', en: 'Flink: true streaming, better latency', pt: 'Flink: true streaming, melhor latência' },
        option2: { es: 'Spark: micro-batches, ecosistema más grande', en: 'Spark: micro-batches, bigger ecosystem', pt: 'Spark: micro-batches, ecossistema maior' },
        recommendation: { es: 'Flink para latencia < 1 min. Spark si ya lo usan para batch.', en: 'Flink for latency < 1 min. Spark if already used for batch.', pt: 'Flink para latência < 1 min. Spark se já usam para batch.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No considerar late arrivals (eventos que llegan tarde)', en: '❌ Not considering late arrivals', pt: '❌ Não considerar late arrivals (eventos que chegam tarde)' },
      { es: '❌ Guardar todo en una sola DB - Redis no escala para histórico', en: '❌ Storing everything in one DB - Redis doesnt scale for historical', pt: '❌ Guardar tudo em um só DB - Redis não escala para histórico' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná watermarks para late arrivals', en: '💡 Mention watermarks for late arrivals', pt: '💡 Mencione watermarks para late arrivals' },
      { es: '💡 Hablá de backpressure en Flink', en: '💡 Talk about backpressure in Flink', pt: '💡 Fale de backpressure no Flink' }
    ],
    relatedTopics: ['Streaming', 'Flink', 'Kafka', 'Redis', 'ClickHouse'],
    estimatedXP: 350
  },

  // ============ INTERVIEW 12: NOTIFICATION SYSTEM ============
  {
    id: 'sd-notification-system',
    title: {
      es: 'Sistema de Notificaciones',
      en: 'Notification System',
      pt: 'Sistema de Notificações'
    },
    company: 'Fintech (estilo app bancaria)',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['Real-time', 'Queues', 'Push Notifications', 'Multi-channel'],
    problem: {
      es: `Diseñá un sistema de notificaciones para una app bancaria con 5M de usuarios.
Tipos de notificaciones:
1. Transaccionales: "Recibiste $500" (inmediato)
2. Alertas de fraude: "Detectamos actividad sospechosa" (< 30 seg)
3. Marketing: "Nuevo préstamo disponible" (batch, mejor horario)

Canales: Push, Email, SMS, In-app
Requisito clave: Las alertas de fraude NUNCA pueden perderse.`,
      en: `Design a notification system for a banking app with 5M users.
Notification types:
1. Transactional: "You received $500" (immediate)
2. Fraud alerts: "We detected suspicious activity" (< 30 sec)
3. Marketing: "New loan available" (batch, best time)

Channels: Push, Email, SMS, In-app
Key requirement: Fraud alerts can NEVER be lost.`,
      pt: `Projete um sistema de notificações para um app bancário com 5M de usuários.
Tipos de notificações:
1. Transacionais: "Você recebeu R$500" (imediato)
2. Alertas de fraude: "Detectamos atividade suspeita" (< 30 seg)
3. Marketing: "Novo empréstimo disponível" (batch, melhor horário)

Canais: Push, Email, SMS, In-app
Requisito chave: Alertas de fraude NUNCA podem ser perdidos.`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuántas notificaciones por día?', en: 'How many notifications per day?', pt: 'Quantas notificações por dia?' },
        whyAsk: { es: 'Dimensiona la infraestructura', en: 'Sizes the infrastructure', pt: 'Dimensiona a infraestrutura' },
        typicalAnswer: { es: '10M transaccionales, 500k marketing, 10k fraude', en: '10M transactional, 500k marketing, 10k fraud', pt: '10M transacionais, 500k marketing, 10k fraude' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Enviar a múltiples canales según preferencia', en: 'Send to multiple channels based on preference', pt: 'Enviar para múltiplos canais conforme preferência' },
        { es: 'Priorización (fraude > transaccional > marketing)', en: 'Prioritization (fraud > transactional > marketing)', pt: 'Priorização (fraude > transacional > marketing)' },
        { es: 'Deduplicación (no enviar 2 veces la misma)', en: 'Deduplication (dont send same notification twice)', pt: 'Deduplicação (não enviar 2 vezes a mesma)' }
      ],
      nonFunctional: [
        { es: 'Fraude: < 30 segundos, 0 pérdida', en: 'Fraud: < 30 seconds, 0 loss', pt: 'Fraude: < 30 segundos, 0 perda' },
        { es: '99.99% delivery rate', en: '99.99% delivery rate', pt: '99.99% taxa de entrega' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'API Gateway con priorización', en: 'API Gateway with prioritization', pt: 'API Gateway com priorização' },
        description: { es: 'API recibe notificaciones y las rutea a colas por prioridad', en: 'API receives notifications and routes to queues by priority', pt: 'API recebe notificações e roteia para filas por prioridade' },
        components: ['API Gateway', 'Router'],
        diagram: `
┌──────────────────────────────────────────────────────────────┐
│                     Notification API                          │
└──────────────────────────┬───────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Queue: FRAUD │   │Queue: TRANS  │   │Queue: MKTG   │
│  (priority)  │   │  (normal)    │   │  (low)       │
└──────┬───────┘   └──────┬───────┘   └──────┬───────┘
       │                  │                  │
       └──────────────────┼──────────────────┘
                          ▼
              ┌────────────────────┐
              │  Channel Router    │
              │ (Push/Email/SMS)   │
              └────────────────────┘`
      },
      {
        step: 2,
        title: { es: 'Colas separadas por prioridad', en: 'Separate queues by priority', pt: 'Filas separadas por prioridade' },
        description: { es: 'SQS con colas dedicadas: fraud (FIFO, DLQ), transactional (standard), marketing (scheduled)', en: 'SQS with dedicated queues: fraud (FIFO, DLQ), transactional (standard), marketing (scheduled)', pt: 'SQS com filas dedicadas: fraud (FIFO, DLQ), transactional (standard), marketing (scheduled)' },
        components: ['SQS FIFO', 'Dead Letter Queue', 'CloudWatch']
      },
      {
        step: 3,
        title: { es: 'Workers con retry y DLQ', en: 'Workers with retry and DLQ', pt: 'Workers com retry e DLQ' },
        description: { es: 'Workers procesan colas. Si falla 3 veces → DLQ. Alerta inmediata para fraud DLQ.', en: 'Workers process queues. If fails 3 times → DLQ. Immediate alert for fraud DLQ.', pt: 'Workers processam filas. Se falha 3 vezes → DLQ. Alerta imediato para fraud DLQ.' },
        components: ['Lambda/ECS', 'SNS', 'Twilio', 'Firebase']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'SQS FIFO vs Kafka', en: 'SQS FIFO vs Kafka', pt: 'SQS FIFO vs Kafka' },
        option1: { es: 'SQS FIFO: garantiza orden y exactly-once, límite 300 msg/s por grupo', en: 'SQS FIFO: guarantees order and exactly-once, limit 300 msg/s per group', pt: 'SQS FIFO: garante ordem e exactly-once, limite 300 msg/s por grupo' },
        option2: { es: 'Kafka: mayor throughput, más complejo de operar', en: 'Kafka: higher throughput, more complex to operate', pt: 'Kafka: maior throughput, mais complexo de operar' },
        recommendation: { es: 'SQS para notificaciones (volumen manejable). Kafka si ya lo tienen.', en: 'SQS for notifications (manageable volume). Kafka if you already have it.', pt: 'SQS para notificações (volume gerenciável). Kafka se já têm.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Una sola cola para todo - fraude se bloquea por marketing', en: '❌ Single queue for everything - fraud gets blocked by marketing', pt: '❌ Uma única fila para tudo - fraude bloqueia por marketing' },
      { es: '❌ No tener DLQ - mensajes se pierden silenciosamente', en: '❌ No DLQ - messages get lost silently', pt: '❌ Não ter DLQ - mensagens se perdem silenciosamente' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná idempotencia para evitar duplicados', en: '💡 Mention idempotency to avoid duplicates', pt: '💡 Mencione idempotência para evitar duplicados' },
      { es: '💡 Hablá de user preferences (horario, canales)', en: '💡 Talk about user preferences (time, channels)', pt: '💡 Fale de user preferences (horário, canais)' }
    ],
    relatedTopics: ['Queues', 'SQS', 'Push Notifications', 'Exactly-once'],
    estimatedXP: 350
  },

  // ============ INTERVIEW 13: LEGACY MODERNIZATION ============
  {
    id: 'sd-legacy-modernization',
    title: {
      es: 'Modernización de Sistemas Legacy',
      en: 'Legacy Systems Modernization',
      pt: 'Modernização de Sistemas Legacy'
    },
    company: 'Enterprise (banco/retail grande)',
    difficulty: 'senior',
    duration: '45 min',
    tags: ['Modernization', 'Legacy', 'Migration', 'Governance'],
    problem: {
      es: `Un banco tradicional tiene datos en:
- Oracle (core banking, 10TB)
- SQL Server (CRM, 2TB)
- Archivos CSV en file servers (reportes legacy, 500GB)
- Mainframe COBOL (transacciones históricas, 5TB)

Quieren migrar a un Data Lake moderno en AWS.
Restricciones:
- No pueden apagar sistemas legacy durante migración
- Compliance: auditoría de todos los accesos
- Presupuesto: $500k para el primer año

¿Cómo lo harías?`,
      en: `A traditional bank has data in:
- Oracle (core banking, 10TB)
- SQL Server (CRM, 2TB)
- CSV files on file servers (legacy reports, 500GB)
- Mainframe COBOL (historical transactions, 5TB)

They want to migrate to a modern Data Lake on AWS.
Constraints:
- Cannot shut down legacy systems during migration
- Compliance: audit all access
- Budget: $500k for first year

How would you do it?`,
      pt: `Um banco tradicional tem dados em:
- Oracle (core banking, 10TB)
- SQL Server (CRM, 2TB)
- Arquivos CSV em file servers (relatórios legacy, 500GB)
- Mainframe COBOL (transações históricas, 5TB)

Eles querem migrar para um Data Lake moderno na AWS.
Restrições:
- Não podem desligar sistemas legacy durante migração
- Compliance: auditoria de todos os acessos
- Budget: $500k para o primeiro ano

Como você faria?`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuál es el timeline esperado?', en: 'What is the expected timeline?', pt: 'Qual é o timeline esperado?' },
        whyAsk: { es: 'Define el approach (big bang vs incremental)', en: 'Defines the approach (big bang vs incremental)', pt: 'Define o approach (big bang vs incremental)' },
        typicalAnswer: { es: '18 meses para migración completa', en: '18 months for full migration', pt: '18 meses para migração completa' }
      },
      {
        question: { es: '¿Qué sistemas son críticos 24/7?', en: 'Which systems are critical 24/7?', pt: 'Quais sistemas são críticos 24/7?' },
        whyAsk: { es: 'Define ventanas de migración', en: 'Defines migration windows', pt: 'Define janelas de migração' },
        typicalAnswer: { es: 'Core banking no puede tener downtime', en: 'Core banking cannot have downtime', pt: 'Core banking não pode ter downtime' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Migrar 17.5TB sin downtime', en: 'Migrate 17.5TB without downtime', pt: 'Migrar 17.5TB sem downtime' },
        { es: 'CDC para sincronización continua', en: 'CDC for continuous sync', pt: 'CDC para sincronização contínua' },
        { es: 'Catálogo de datos centralizado', en: 'Centralized data catalog', pt: 'Catálogo de dados centralizado' }
      ],
      nonFunctional: [
        { es: 'Auditoría de todos los accesos', en: 'Audit all access', pt: 'Auditoria de todos os acessos' },
        { es: 'Encriptación at rest y in transit', en: 'Encryption at rest and in transit', pt: 'Criptografia at rest e in transit' },
        { es: 'Rollback posible en cualquier fase', en: 'Rollback possible at any phase', pt: 'Rollback possível em qualquer fase' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Fase 1: Landing Zone', en: 'Phase 1: Landing Zone', pt: 'Fase 1: Landing Zone' },
        description: { es: 'Setup S3 con estructura Medallion, Lake Formation para governance, Glue Catalog', en: 'Setup S3 with Medallion structure, Lake Formation for governance, Glue Catalog', pt: 'Setup S3 com estrutura Medallion, Lake Formation para governance, Glue Catalog' },
        components: ['S3', 'Lake Formation', 'Glue Catalog'],
        diagram: `
┌─────────────────────────────────────────────────────────────┐
│                    AWS Data Lake                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Lake Formation                       │  │
│  │  (Permissions, Auditing, Data Catalog)               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │  Bronze    │  │  Silver    │  │   Gold     │            │
│  │  (raw)     │─▶│ (cleaned)  │─▶│ (curated)  │            │
│  │  17.5TB    │  │            │  │            │            │
│  └────────────┘  └────────────┘  └────────────┘            │
└─────────────────────────────────────────────────────────────┘`
      },
      {
        step: 2,
        title: { es: 'Fase 2: CDC con DMS', en: 'Phase 2: CDC with DMS', pt: 'Fase 2: CDC com DMS' },
        description: { es: 'AWS DMS para Oracle/SQL Server con CDC. Full load inicial + ongoing replication.', en: 'AWS DMS for Oracle/SQL Server with CDC. Initial full load + ongoing replication.', pt: 'AWS DMS para Oracle/SQL Server com CDC. Full load inicial + replicação contínua.' },
        components: ['AWS DMS', 'CDC', 'Schema Conversion Tool']
      },
      {
        step: 3,
        title: { es: 'Fase 3: Mainframe con Connect:Direct', en: 'Phase 3: Mainframe with Connect:Direct', pt: 'Fase 3: Mainframe com Connect:Direct' },
        description: { es: 'Batch diario del mainframe via Connect:Direct o AWS Mainframe Modernization', en: 'Daily batch from mainframe via Connect:Direct or AWS Mainframe Modernization', pt: 'Batch diário do mainframe via Connect:Direct ou AWS Mainframe Modernization' },
        components: ['Connect:Direct', 'AWS Transfer Family']
      },
      {
        step: 4,
        title: { es: 'Fase 4: Cutover gradual', en: 'Phase 4: Gradual cutover', pt: 'Fase 4: Cutover gradual' },
        description: { es: 'Migrar reportes uno por uno. Validar datos. Apagar fuentes legacy cuando estén replicadas.', en: 'Migrate reports one by one. Validate data. Turn off legacy sources when replicated.', pt: 'Migrar relatórios um por um. Validar dados. Desligar fontes legacy quando replicadas.' },
        components: ['Data Validation', 'Parallel Running']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Big Bang vs Incremental', en: 'Big Bang vs Incremental', pt: 'Big Bang vs Incremental' },
        option1: { es: 'Big Bang: más rápido pero alto riesgo', en: 'Big Bang: faster but high risk', pt: 'Big Bang: mais rápido mas alto risco' },
        option2: { es: 'Incremental: más seguro pero toma más tiempo', en: 'Incremental: safer but takes longer', pt: 'Incremental: mais seguro mas leva mais tempo' },
        recommendation: { es: 'Incremental SIEMPRE para bancos. El riesgo regulatorio no vale.', en: 'Incremental ALWAYS for banks. The regulatory risk is not worth it.', pt: 'Incremental SEMPRE para bancos. O risco regulatório não vale.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No planear rollback - cuando algo falla, están atrapados', en: '❌ Not planning rollback - when something fails, theyre stuck', pt: '❌ Não planejar rollback - quando algo falha, estão presos' },
      { es: '❌ Olvidar data quality checks antes de apagar legacy', en: '❌ Forgetting data quality checks before turning off legacy', pt: '❌ Esquecer data quality checks antes de desligar legacy' },
      { es: '❌ No involucrar compliance desde el día 1', en: '❌ Not involving compliance from day 1', pt: '❌ Não envolver compliance desde o dia 1' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná Lake Formation para governance', en: '💡 Mention Lake Formation for governance', pt: '💡 Mencione Lake Formation para governance' },
      { es: '💡 Hablá de parallel running antes de cutover', en: '💡 Talk about parallel running before cutover', pt: '💡 Fale de parallel running antes de cutover' }
    ],
    relatedTopics: ['Migration', 'Data Lake', 'CDC', 'DMS', 'Governance'],
    estimatedXP: 500
  },

  // ============ INTERVIEW 14: ML FEATURE ENGINEERING ============
  {
    id: 'sd-feature-engineering',
    title: {
      es: 'Feature Engineering Pipeline',
      en: 'Feature Engineering Pipeline',
      pt: 'Pipeline de Feature Engineering'
    },
    company: 'Fintech/E-commerce con ML',
    difficulty: 'senior',
    duration: '45 min',
    tags: ['ML', 'Feature Engineering', 'Real-time', 'Batch'],
    problem: {
      es: `Tu empresa tiene 15 modelos de ML en producción:
- Detección de fraude (real-time, < 100ms)
- Recomendaciones (batch, diario)
- Credit scoring (batch + real-time para aplicaciones)

Problemas actuales:
- Cada equipo calcula las mismas features diferente
- Training/serving skew (features distintas en training vs prod)
- No hay versionado de features

Diseñá un Feature Store.`,
      en: `Your company has 15 ML models in production:
- Fraud detection (real-time, < 100ms)
- Recommendations (batch, daily)
- Credit scoring (batch + real-time for applications)

Current problems:
- Each team calculates the same features differently
- Training/serving skew (different features in training vs prod)
- No feature versioning

Design a Feature Store.`,
      pt: `Sua empresa tem 15 modelos de ML em produção:
- Detecção de fraude (real-time, < 100ms)
- Recomendações (batch, diário)
- Credit scoring (batch + real-time para aplicações)

Problemas atuais:
- Cada time calcula as mesmas features diferente
- Training/serving skew (features diferentes em training vs prod)
- Não há versionamento de features

Projete um Feature Store.`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cuántas features únicas tenemos?', en: 'How many unique features do we have?', pt: 'Quantas features únicas temos?' },
        whyAsk: { es: 'Dimensiona el catálogo', en: 'Sizes the catalog', pt: 'Dimensiona o catálogo' },
        typicalAnswer: { es: 'Alrededor de 500 features, 50 compartidas entre modelos', en: 'Around 500 features, 50 shared across models', pt: 'Cerca de 500 features, 50 compartilhadas entre modelos' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Catálogo de features con metadata', en: 'Feature catalog with metadata', pt: 'Catálogo de features com metadata' },
        { es: 'Serving online (< 100ms) y offline (batch)', en: 'Online serving (< 100ms) and offline (batch)', pt: 'Serving online (< 100ms) e offline (batch)' },
        { es: 'Versionado y lineage de features', en: 'Feature versioning and lineage', pt: 'Versionamento e lineage de features' }
      ],
      nonFunctional: [
        { es: 'p99 < 50ms para online serving', en: 'p99 < 50ms for online serving', pt: 'p99 < 50ms para online serving' },
        { es: 'Consistencia entre training y serving', en: 'Consistency between training and serving', pt: 'Consistência entre training e serving' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Arquitectura dual store', en: 'Dual store architecture', pt: 'Arquitetura dual store' },
        description: { es: 'Offline store (S3/Delta) para training, Online store (Redis/DynamoDB) para serving', en: 'Offline store (S3/Delta) for training, Online store (Redis/DynamoDB) for serving', pt: 'Offline store (S3/Delta) para training, Online store (Redis/DynamoDB) para serving' },
        components: ['S3', 'Delta Lake', 'Redis', 'DynamoDB'],
        diagram: `
┌─────────────────────────────────────────────────────────────┐
│                     Feature Store                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐         ┌────────────────┐              │
│  │  Feature       │         │  Feature       │              │
│  │  Computation   │         │  Serving API   │              │
│  │  (Spark/Flink) │         │  (< 50ms p99)  │              │
│  └───────┬────────┘         └───────┬────────┘              │
│          │                          │                        │
│          ▼                          ▼                        │
│  ┌────────────────┐         ┌────────────────┐              │
│  │ Offline Store  │ ──sync─▶│ Online Store   │              │
│  │ (S3 + Delta)   │         │ (Redis/Dynamo) │              │
│  │ For Training   │         │ For Inference  │              │
│  └────────────────┘         └────────────────┘              │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Feature Registry / Catalog                  │  │
│  │  (metadata, versions, lineage, ownership)             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘`
      },
      {
        step: 2,
        title: { es: 'Sincronización offline → online', en: 'Offline → online sync', pt: 'Sincronização offline → online' },
        description: { es: 'Batch job que materializa features del offline store al online store. Para real-time: stream processing.', en: 'Batch job that materializes features from offline to online store. For real-time: stream processing.', pt: 'Batch job que materializa features do offline para online store. Para real-time: stream processing.' },
        components: ['Airflow', 'Spark', 'Flink']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Build vs Buy (Feast, Tecton, SageMaker)', en: 'Build vs Buy (Feast, Tecton, SageMaker)', pt: 'Build vs Buy (Feast, Tecton, SageMaker)' },
        option1: { es: 'Build: más control, más esfuerzo', en: 'Build: more control, more effort', pt: 'Build: mais controle, mais esforço' },
        option2: { es: 'Feast/Tecton: más rápido, vendor lock-in', en: 'Feast/Tecton: faster, vendor lock-in', pt: 'Feast/Tecton: mais rápido, vendor lock-in' },
        recommendation: { es: 'Feast open-source si tenés equipo. Tecton/SageMaker si no.', en: 'Feast open-source if you have a team. Tecton/SageMaker if not.', pt: 'Feast open-source se tem equipe. Tecton/SageMaker se não.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Guardar features sin versionado - imposible reproducir modelos', en: '❌ Storing features without versioning - impossible to reproduce models', pt: '❌ Guardar features sem versionamento - impossível reproduzir modelos' },
      { es: '❌ No considerar feature freshness - datos stale en serving', en: '❌ Not considering feature freshness - stale data in serving', pt: '❌ Não considerar feature freshness - dados desatualizados em serving' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná point-in-time correctness para evitar data leakage', en: '💡 Mention point-in-time correctness to avoid data leakage', pt: '💡 Mencione point-in-time correctness para evitar data leakage' },
      { es: '💡 Hablá de backfill de features', en: '💡 Talk about feature backfill', pt: '💡 Fale de backfill de features' }
    ],
    relatedTopics: ['ML', 'Feature Store', 'Feast', 'Redis', 'Delta Lake'],
    estimatedXP: 450
  },

  // ============ INTERVIEW 15: IOT DATA PLATFORM ============
  {
    id: 'sd-iot-platform',
    title: {
      es: 'Plataforma de Datos IoT',
      en: 'IoT Data Platform',
      pt: 'Plataforma de Dados IoT'
    },
    company: 'Manufactura/Logistics',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['IoT', 'Time-series', 'Edge', 'Streaming'],
    problem: {
      es: `Una fábrica tiene 10,000 sensores que envían datos cada segundo:
- Temperatura, presión, vibración
- Cada sensor: 1 mensaje/segundo = 10k msg/seg total
- Necesitan: alertas en tiempo real + analytics histórico

Casos de uso:
1. Alerta si temperatura > umbral (< 5 segundos)
2. Predicción de mantenimiento (análisis de tendencias)
3. Dashboard operativo

¿Cómo diseñarías la plataforma?`,
      en: `A factory has 10,000 sensors sending data every second:
- Temperature, pressure, vibration
- Each sensor: 1 message/second = 10k msg/sec total
- They need: real-time alerts + historical analytics

Use cases:
1. Alert if temperature > threshold (< 5 seconds)
2. Predictive maintenance (trend analysis)
3. Operational dashboard

How would you design the platform?`,
      pt: `Uma fábrica tem 10.000 sensores enviando dados a cada segundo:
- Temperatura, pressão, vibração
- Cada sensor: 1 mensagem/segundo = 10k msg/seg total
- Precisam de: alertas em tempo real + analytics histórico

Casos de uso:
1. Alerta se temperatura > limiar (< 5 segundos)
2. Manutenção preditiva (análise de tendências)
3. Dashboard operacional

Como você projetaria a plataforma?`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Los sensores tienen conectividad estable?', en: 'Do sensors have stable connectivity?', pt: 'Os sensores têm conectividade estável?' },
        whyAsk: { es: 'Define si necesitamos edge processing', en: 'Defines if we need edge processing', pt: 'Define se precisamos de edge processing' },
        typicalAnswer: { es: 'WiFi industrial, 99% uptime', en: 'Industrial WiFi, 99% uptime', pt: 'WiFi industrial, 99% uptime' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Ingerir 10k mensajes/segundo', en: 'Ingest 10k messages/second', pt: 'Ingerir 10k mensagens/segundo' },
        { es: 'Alertas en < 5 segundos', en: 'Alerts in < 5 seconds', pt: 'Alertas em < 5 segundos' },
        { es: 'Retención de 2 años para análisis', en: '2-year retention for analysis', pt: 'Retenção de 2 anos para análise' }
      ],
      nonFunctional: [
        { es: 'Alta disponibilidad (fábrica 24/7)', en: 'High availability (factory 24/7)', pt: 'Alta disponibilidade (fábrica 24/7)' },
        { es: 'Costo eficiente para storage histórico', en: 'Cost-efficient for historical storage', pt: 'Custo eficiente para storage histórico' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Ingesta con IoT Core + Kinesis', en: 'Ingestion with IoT Core + Kinesis', pt: 'Ingestão com IoT Core + Kinesis' },
        description: { es: 'AWS IoT Core para MQTT, Kinesis Data Streams para buffering', en: 'AWS IoT Core for MQTT, Kinesis Data Streams for buffering', pt: 'AWS IoT Core para MQTT, Kinesis Data Streams para buffering' },
        components: ['AWS IoT Core', 'Kinesis Data Streams', 'MQTT'],
        diagram: `
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────────┐
│ Sensors │────▶│ IoT Core│────▶│ Kinesis │────▶│ Consumers   │
│ (10k)   │MQTT │ (MQTT)  │     │ Streams │     │             │
└─────────┘     └─────────┘     └────┬────┘     └─────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
             ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
             │   Lambda    │  │ Timestream  │  │     S3      │
             │  (alerts)   │  │(time-series)│  │  (archive)  │
             └─────────────┘  └─────────────┘  └─────────────┘`
      },
      {
        step: 2,
        title: { es: 'Alertas con Lambda', en: 'Alerts with Lambda', pt: 'Alertas com Lambda' },
        description: { es: 'Lambda procesa cada batch de Kinesis, evalúa reglas, dispara SNS si hay alerta', en: 'Lambda processes each Kinesis batch, evaluates rules, triggers SNS if alert', pt: 'Lambda processa cada batch do Kinesis, avalia regras, dispara SNS se há alerta' },
        components: ['Lambda', 'SNS', 'Rules Engine']
      },
      {
        step: 3,
        title: { es: 'Storage dual: Timestream + S3', en: 'Dual storage: Timestream + S3', pt: 'Storage dual: Timestream + S3' },
        description: { es: 'Timestream para queries recientes (30 días), S3 Parquet para histórico (2 años)', en: 'Timestream for recent queries (30 days), S3 Parquet for historical (2 years)', pt: 'Timestream para queries recentes (30 dias), S3 Parquet para histórico (2 anos)' },
        components: ['Timestream', 'S3', 'Parquet']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Timestream vs InfluxDB vs TimescaleDB', en: 'Timestream vs InfluxDB vs TimescaleDB', pt: 'Timestream vs InfluxDB vs TimescaleDB' },
        option1: { es: 'Timestream: serverless, más caro', en: 'Timestream: serverless, more expensive', pt: 'Timestream: serverless, mais caro' },
        option2: { es: 'InfluxDB/Timescale: más barato, hay que operar', en: 'InfluxDB/Timescale: cheaper, need to operate', pt: 'InfluxDB/Timescale: mais barato, precisa operar' },
        recommendation: { es: 'Timestream si no querés ops. Timescale si tenés equipo de infra.', en: 'Timestream if you dont want ops. Timescale if you have infra team.', pt: 'Timestream se não quer ops. Timescale se tem equipe de infra.' }
      }
    ],
    commonMistakes: [
      { es: '❌ Guardar todo en hot storage - costos explotan', en: '❌ Storing everything in hot storage - costs explode', pt: '❌ Guardar tudo em hot storage - custos explodem' },
      { es: '❌ No comprimir datos - IoT genera mucho volumen', en: '❌ Not compressing data - IoT generates high volume', pt: '❌ Não comprimir dados - IoT gera muito volume' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná downsampling para datos históricos', en: '💡 Mention downsampling for historical data', pt: '💡 Mencione downsampling para dados históricos' },
      { es: '💡 Hablá de edge computing si hay latencia de red', en: '💡 Talk about edge computing if there is network latency', pt: '💡 Fale de edge computing se há latência de rede' }
    ],
    relatedTopics: ['IoT', 'Time-series', 'Kinesis', 'Timestream', 'MQTT'],
    estimatedXP: 350
  },

  // ============ INTERVIEW 16: A/B TESTING PLATFORM ============
  {
    id: 'sd-ab-testing',
    title: {
      es: 'Plataforma de A/B Testing',
      en: 'A/B Testing Platform',
      pt: 'Plataforma de A/B Testing'
    },
    company: 'Tech company (producto digital)',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['A/B Testing', 'Experimentation', 'Analytics', 'Statistics'],
    problem: {
      es: `Tu empresa quiere lanzar 50 experimentos por semana.
Necesitan una plataforma que permita:
1. Definir experimentos y variantes
2. Asignar usuarios a variantes consistentemente
3. Calcular métricas y significancia estadística
4. Dashboard para PMs

Usuarios: 10M activos mensuales
Eventos: 100M por día`,
      en: `Your company wants to run 50 experiments per week.
They need a platform that allows:
1. Define experiments and variants
2. Assign users to variants consistently
3. Calculate metrics and statistical significance
4. Dashboard for PMs

Users: 10M monthly active
Events: 100M per day`,
      pt: `Sua empresa quer rodar 50 experimentos por semana.
Precisam de uma plataforma que permita:
1. Definir experimentos e variantes
2. Atribuir usuários a variantes consistentemente
3. Calcular métricas e significância estatística
4. Dashboard para PMs

Usuários: 10M ativos mensais
Eventos: 100M por dia`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Qué métricas son las más importantes?', en: 'What metrics are most important?', pt: 'Quais métricas são mais importantes?' },
        whyAsk: { es: 'Define qué calcular en tiempo real vs batch', en: 'Defines what to calculate real-time vs batch', pt: 'Define o que calcular em tempo real vs batch' },
        typicalAnswer: { es: 'Conversión (real-time), Revenue per user (batch)', en: 'Conversion (real-time), Revenue per user (batch)', pt: 'Conversão (real-time), Revenue per user (batch)' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Asignación determinística (mismo user = misma variante)', en: 'Deterministic assignment (same user = same variant)', pt: 'Atribuição determinística (mesmo user = mesma variante)' },
        { es: 'Cálculo de p-value automático', en: 'Automatic p-value calculation', pt: 'Cálculo de p-value automático' },
        { es: 'Segmentación (país, device, etc.)', en: 'Segmentation (country, device, etc.)', pt: 'Segmentação (país, device, etc.)' }
      ],
      nonFunctional: [
        { es: 'Latencia < 50ms para assignment', en: 'Latency < 50ms for assignment', pt: 'Latência < 50ms para assignment' },
        { es: 'Resultados disponibles en < 24h', en: 'Results available in < 24h', pt: 'Resultados disponíveis em < 24h' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Assignment Service', en: 'Assignment Service', pt: 'Assignment Service' },
        description: { es: 'Hash(user_id + experiment_id) % 100 para asignar variante. Cachear en Redis.', en: 'Hash(user_id + experiment_id) % 100 for variant assignment. Cache in Redis.', pt: 'Hash(user_id + experiment_id) % 100 para atribuir variante. Cachear no Redis.' },
        components: ['Assignment Service', 'Redis', 'Consistent Hashing'],
        diagram: `
┌──────────┐     ┌─────────────────┐     ┌─────────┐
│   App    │────▶│ Assignment API  │────▶│  Redis  │
│          │     │ hash(uid+exp)   │     │ (cache) │
└──────────┘     └────────┬────────┘     └─────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Experiment      │
                 │ Config DB       │
                 │ (PostgreSQL)    │
                 └─────────────────┘`
      },
      {
        step: 2,
        title: { es: 'Event Collection', en: 'Event Collection', pt: 'Coleta de Eventos' },
        description: { es: 'Eventos con experiment_id y variant van a Kafka → ClickHouse', en: 'Events with experiment_id and variant go to Kafka → ClickHouse', pt: 'Eventos com experiment_id e variant vão para Kafka → ClickHouse' },
        components: ['Kafka', 'ClickHouse', 'Event Schema']
      },
      {
        step: 3,
        title: { es: 'Statistics Engine', en: 'Statistics Engine', pt: 'Engine de Estatísticas' },
        description: { es: 'Cron diario que calcula métricas por experimento, variante. T-test para significancia.', en: 'Daily cron that calculates metrics per experiment, variant. T-test for significance.', pt: 'Cron diário que calcula métricas por experimento, variante. T-test para significância.' },
        components: ['Spark', 'Statistical Tests', 'Confidence Intervals']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Build vs Buy (Optimizely, LaunchDarkly)', en: 'Build vs Buy (Optimizely, LaunchDarkly)', pt: 'Build vs Buy (Optimizely, LaunchDarkly)' },
        option1: { es: 'Build: más control, necesitás estadísticos', en: 'Build: more control, need statisticians', pt: 'Build: mais controle, precisa de estatísticos' },
        option2: { es: 'Buy: más rápido, vendor lock-in', en: 'Buy: faster, vendor lock-in', pt: 'Buy: mais rápido, vendor lock-in' },
        recommendation: { es: 'Comprar al principio. Construir cuando tengas 100+ experimentos/mes.', en: 'Buy at first. Build when you have 100+ experiments/month.', pt: 'Comprar no início. Construir quando tiver 100+ experimentos/mês.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No usar hashing consistente - user ve variantes diferentes', en: '❌ Not using consistent hashing - user sees different variants', pt: '❌ Não usar hashing consistente - user vê variantes diferentes' },
      { es: '❌ Peeking (mirar resultados antes de sample size)', en: '❌ Peeking (looking at results before sample size)', pt: '❌ Peeking (olhar resultados antes do sample size)' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná multiple testing correction (Bonferroni)', en: '💡 Mention multiple testing correction (Bonferroni)', pt: '💡 Mencione multiple testing correction (Bonferroni)' },
      { es: '💡 Hablá de guardrail metrics', en: '💡 Talk about guardrail metrics', pt: '💡 Fale de guardrail metrics' }
    ],
    relatedTopics: ['A/B Testing', 'Statistics', 'Hashing', 'ClickHouse'],
    estimatedXP: 350
  },

  // ============ INTERVIEW 17: SEARCH SYSTEM ============
  {
    id: 'sd-search-system',
    title: {
      es: 'Sistema de Búsqueda',
      en: 'Search System',
      pt: 'Sistema de Busca'
    },
    company: 'E-commerce/Content platform',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['Search', 'Elasticsearch', 'Relevance', 'NLP'],
    problem: {
      es: `Diseñá el sistema de búsqueda para una plataforma de e-commerce:
- 5 millones de productos
- 10k búsquedas por segundo en picos
- Necesitan: autocomplete, typo tolerance, filtros, ranking personalizado

El equipo de producto se queja de que los resultados no son relevantes.`,
      en: `Design the search system for an e-commerce platform:
- 5 million products
- 10k searches per second at peak
- Need: autocomplete, typo tolerance, filters, personalized ranking

The product team complains that results are not relevant.`,
      pt: `Projete o sistema de busca para uma plataforma de e-commerce:
- 5 milhões de produtos
- 10k buscas por segundo em picos
- Precisam de: autocomplete, tolerância a erros, filtros, ranking personalizado

O time de produto reclama que os resultados não são relevantes.`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Qué latencia es aceptable?', en: 'What latency is acceptable?', pt: 'Que latência é aceitável?' },
        whyAsk: { es: 'Define la arquitectura de caching', en: 'Defines caching architecture', pt: 'Define a arquitetura de caching' },
        typicalAnswer: { es: 'p95 < 200ms', en: 'p95 < 200ms', pt: 'p95 < 200ms' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Búsqueda full-text con relevance scoring', en: 'Full-text search with relevance scoring', pt: 'Busca full-text com relevance scoring' },
        { es: 'Autocomplete en < 100ms', en: 'Autocomplete in < 100ms', pt: 'Autocomplete em < 100ms' },
        { es: 'Filtros (precio, categoría, rating)', en: 'Filters (price, category, rating)', pt: 'Filtros (preço, categoria, rating)' }
      ],
      nonFunctional: [
        { es: 'p95 < 200ms', en: 'p95 < 200ms', pt: 'p95 < 200ms' },
        { es: 'Indexación near real-time (< 1 min)', en: 'Near real-time indexing (< 1 min)', pt: 'Indexação near real-time (< 1 min)' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Elasticsearch cluster', en: 'Elasticsearch cluster', pt: 'Elasticsearch cluster' },
        description: { es: 'Cluster de ES con 3 nodos mínimo. Índice por categoría para mejor performance.', en: 'ES cluster with minimum 3 nodes. Index per category for better performance.', pt: 'Cluster de ES com mínimo 3 nós. Índice por categoria para melhor performance.' },
        components: ['Elasticsearch', 'Kibana'],
        diagram: `
┌──────────────────────────────────────────────────────────────┐
│                    Search Architecture                        │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────┐     ┌─────────────┐     ┌─────────────────────┐ │
│  │  User   │────▶│ Search API  │────▶│   Elasticsearch     │ │
│  │         │     │             │     │   (3-node cluster)  │ │
│  └─────────┘     └──────┬──────┘     └─────────────────────┘ │
│                         │                                     │
│                         ▼                                     │
│                  ┌─────────────┐                              │
│                  │    Redis    │                              │
│                  │(autocomplete│                              │
│                  │   cache)    │                              │
│                  └─────────────┘                              │
│                                                               │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Indexing Pipeline                           │ │
│  │  Products DB ──▶ Kafka ──▶ Index Worker ──▶ ES          │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘`
      },
      {
        step: 2,
        title: { es: 'Relevance tuning', en: 'Relevance tuning', pt: 'Relevance tuning' },
        description: { es: 'BM25 base + boosts personalizados: ventas recientes, rating, match en título > descripción', en: 'BM25 base + custom boosts: recent sales, rating, title match > description', pt: 'BM25 base + boosts personalizados: vendas recentes, rating, match em título > descrição' },
        components: ['BM25', 'Custom Scoring', 'Learning to Rank']
      },
      {
        step: 3,
        title: { es: 'Autocomplete con prefix index', en: 'Autocomplete with prefix index', pt: 'Autocomplete com prefix index' },
        description: { es: 'Edge n-gram tokenizer + Redis cache de las 10k queries más comunes', en: 'Edge n-gram tokenizer + Redis cache of top 10k queries', pt: 'Edge n-gram tokenizer + Redis cache das 10k queries mais comuns' },
        components: ['Edge N-gram', 'Redis', 'Completion Suggester']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Elasticsearch vs Algolia vs Typesense', en: 'Elasticsearch vs Algolia vs Typesense', pt: 'Elasticsearch vs Algolia vs Typesense' },
        option1: { es: 'ES: más control, más ops', en: 'ES: more control, more ops', pt: 'ES: mais controle, mais ops' },
        option2: { es: 'Algolia: instant setup, caro a escala', en: 'Algolia: instant setup, expensive at scale', pt: 'Algolia: setup instantâneo, caro em escala' },
        recommendation: { es: 'Algolia para MVP. ES para 1M+ productos.', en: 'Algolia for MVP. ES for 1M+ products.', pt: 'Algolia para MVP. ES para 1M+ produtos.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No usar analyzer correcto para el idioma', en: '❌ Not using correct analyzer for language', pt: '❌ Não usar analyzer correto para o idioma' },
      { es: '❌ Indexar todo en un solo índice gigante', en: '❌ Indexing everything in one giant index', pt: '❌ Indexar tudo em um único índice gigante' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná synonyms y stemming', en: '💡 Mention synonyms and stemming', pt: '💡 Mencione synonyms e stemming' },
      { es: '💡 Hablá de Learning to Rank para personalización', en: '💡 Talk about Learning to Rank for personalization', pt: '💡 Fale de Learning to Rank para personalização' }
    ],
    relatedTopics: ['Search', 'Elasticsearch', 'NLP', 'Relevance'],
    estimatedXP: 350
  },

  // ============ INTERVIEW 18: COST OPTIMIZATION ============
  {
    id: 'sd-cost-optimization',
    title: {
      es: 'Dashboard de Costos Cloud',
      en: 'Cloud Cost Optimization Dashboard',
      pt: 'Dashboard de Custos Cloud'
    },
    company: 'Cualquier empresa con cloud spend significativo',
    difficulty: 'mid',
    duration: '45 min',
    tags: ['FinOps', 'Cost Management', 'AWS', 'Analytics'],
    problem: {
      es: `Tu empresa gasta $500k/mes en AWS y nadie sabe exactamente en qué.
Necesitan:
1. Dashboard que muestre costo por equipo/proyecto/servicio
2. Alertas cuando un servicio excede su presupuesto
3. Recomendaciones de ahorro (instancias idle, reserved vs on-demand)
4. Forecasting de costos

¿Cómo lo diseñarías?`,
      en: `Your company spends $500k/month on AWS and nobody knows exactly on what.
They need:
1. Dashboard showing cost by team/project/service
2. Alerts when a service exceeds budget
3. Savings recommendations (idle instances, reserved vs on-demand)
4. Cost forecasting

How would you design it?`,
      pt: `Sua empresa gasta $500k/mês na AWS e ninguém sabe exatamente em quê.
Precisam de:
1. Dashboard mostrando custo por time/projeto/serviço
2. Alertas quando um serviço excede o orçamento
3. Recomendações de economia (instâncias ociosas, reserved vs on-demand)
4. Forecasting de custos

Como você projetaria?`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Cómo están taggeados los recursos actualmente?', en: 'How are resources currently tagged?', pt: 'Como os recursos estão taggeados atualmente?' },
        whyAsk: { es: 'Sin tags, no hay forma de atribuir costos', en: 'Without tags, theres no way to attribute costs', pt: 'Sem tags, não há como atribuir custos' },
        typicalAnswer: { es: 'Parcialmente - algunos tienen team tag, muchos no', en: 'Partially - some have team tag, many dont', pt: 'Parcialmente - alguns têm team tag, muitos não' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Ingerir Cost and Usage Report de AWS', en: 'Ingest AWS Cost and Usage Report', pt: 'Ingerir Cost and Usage Report da AWS' },
        { es: 'Atribuir costos a equipos via tags', en: 'Attribute costs to teams via tags', pt: 'Atribuir custos a times via tags' },
        { es: 'Alertas de budget threshold', en: 'Budget threshold alerts', pt: 'Alertas de limite de orçamento' }
      ],
      nonFunctional: [
        { es: 'Datos actualizados diariamente', en: 'Data updated daily', pt: 'Dados atualizados diariamente' },
        { es: 'Histórico de 12 meses', en: '12 month history', pt: 'Histórico de 12 meses' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Ingesta de CUR', en: 'CUR Ingestion', pt: 'Ingestão de CUR' },
        description: { es: 'AWS Cost and Usage Report a S3, Glue Crawler, Athena para queries', en: 'AWS Cost and Usage Report to S3, Glue Crawler, Athena for queries', pt: 'AWS Cost and Usage Report para S3, Glue Crawler, Athena para queries' },
        components: ['CUR', 'S3', 'Glue', 'Athena'],
        diagram: `
┌─────────────────────────────────────────────────────────────┐
│                 Cost Optimization Platform                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  AWS CUR ──▶ S3 ──▶ Glue Crawler ──▶ Athena                │
│    (CSV)     │                         │                    │
│              │                         ▼                    │
│              │                  ┌─────────────┐            │
│              │                  │  QuickSight │            │
│              │                  │ (dashboard) │            │
│              │                  └─────────────┘            │
│              │                                              │
│              ▼                                              │
│       ┌─────────────┐     ┌─────────────┐                  │
│       │ Lambda      │────▶│    SNS      │                  │
│       │ (alerts)    │     │  (notify)   │                  │
│       └─────────────┘     └─────────────┘                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘`
      },
      {
        step: 2,
        title: { es: 'Tagging enforcement', en: 'Tagging enforcement', pt: 'Tagging enforcement' },
        description: { es: 'AWS Config rules para detectar recursos sin tags. SCPs para prevenir creación sin tags.', en: 'AWS Config rules to detect untagged resources. SCPs to prevent creation without tags.', pt: 'AWS Config rules para detectar recursos sem tags. SCPs para prevenir criação sem tags.' },
        components: ['AWS Config', 'SCPs', 'Tag Editor']
      },
      {
        step: 3,
        title: { es: 'Recommendations engine', en: 'Recommendations engine', pt: 'Engine de recomendações' },
        description: { es: 'AWS Cost Explorer API + Trusted Advisor para sugerencias. Calcular savings si migran a Reserved.', en: 'AWS Cost Explorer API + Trusted Advisor for suggestions. Calculate savings if migrating to Reserved.', pt: 'AWS Cost Explorer API + Trusted Advisor para sugestões. Calcular savings se migrarem para Reserved.' },
        components: ['Cost Explorer', 'Trusted Advisor', 'Compute Optimizer']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Build vs Buy (CloudHealth, Spot.io)', en: 'Build vs Buy (CloudHealth, Spot.io)', pt: 'Build vs Buy (CloudHealth, Spot.io)' },
        option1: { es: 'Build: más barato, más trabajo', en: 'Build: cheaper, more work', pt: 'Build: mais barato, mais trabalho' },
        option2: { es: 'Buy: más rápido, costo mensual', en: 'Buy: faster, monthly cost', pt: 'Buy: mais rápido, custo mensal' },
        recommendation: { es: 'Athena + QuickSight para empezar. CloudHealth si > $1M/mes.', en: 'Athena + QuickSight to start. CloudHealth if > $1M/month.', pt: 'Athena + QuickSight para começar. CloudHealth se > $1M/mês.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No enforzar tagging desde el principio', en: '❌ Not enforcing tagging from the beginning', pt: '❌ Não enforçar tagging desde o início' },
      { es: '❌ Ignorar datos de días anteriores al calcular trends', en: '❌ Ignoring previous days data when calculating trends', pt: '❌ Ignorar dados de dias anteriores ao calcular trends' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná Savings Plans vs Reserved Instances', en: '💡 Mention Savings Plans vs Reserved Instances', pt: '💡 Mencione Savings Plans vs Reserved Instances' },
      { es: '💡 Hablá de rightsizing recommendations', en: '💡 Talk about rightsizing recommendations', pt: '💡 Fale de rightsizing recommendations' }
    ],
    relatedTopics: ['FinOps', 'AWS', 'Cost Management', 'Athena'],
    estimatedXP: 300
  },

  // ============ INTERVIEW 19: DATA CATALOG ============
  {
    id: 'sd-data-catalog',
    title: {
      es: 'Data Catalog y Governance',
      en: 'Data Catalog & Governance',
      pt: 'Data Catalog e Governance'
    },
    company: 'Enterprise (cualquier empresa grande)',
    difficulty: 'senior',
    duration: '45 min',
    tags: ['Data Catalog', 'Governance', 'Metadata', 'Compliance'],
    problem: {
      es: `Tu empresa tiene 500+ datasets en diferentes sistemas (Snowflake, S3, PostgreSQL).
Problemas:
- Nadie sabe qué datos existen o qué significan
- No hay forma de saber quién tiene acceso a qué
- Compliance pregunta por PII y no saben dónde está
- Data scientists pierden horas buscando el dataset correcto

Diseñá un Data Catalog.`,
      en: `Your company has 500+ datasets in different systems (Snowflake, S3, PostgreSQL).
Problems:
- Nobody knows what data exists or what it means
- No way to know who has access to what
- Compliance asks about PII and they dont know where it is
- Data scientists waste hours looking for the right dataset

Design a Data Catalog.`,
      pt: `Sua empresa tem 500+ datasets em diferentes sistemas (Snowflake, S3, PostgreSQL).
Problemas:
- Ninguém sabe que dados existem ou o que significam
- Não há como saber quem tem acesso ao quê
- Compliance pergunta sobre PII e não sabem onde está
- Data scientists perdem horas procurando o dataset certo

Projete um Data Catalog.`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Hay algún catálogo parcial existente?', en: 'Is there any existing partial catalog?', pt: 'Há algum catálogo parcial existente?' },
        whyAsk: { es: 'Define si empezamos de cero', en: 'Defines if we start from scratch', pt: 'Define se começamos do zero' },
        typicalAnswer: { es: 'Hay un Excel con algunos datasets, desactualizado', en: 'Theres an Excel with some datasets, outdated', pt: 'Há um Excel com alguns datasets, desatualizado' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Inventario automático de todos los datasets', en: 'Automatic inventory of all datasets', pt: 'Inventário automático de todos os datasets' },
        { es: 'Search por nombre, descripción, tags', en: 'Search by name, description, tags', pt: 'Search por nome, descrição, tags' },
        { es: 'Lineage: de dónde viene cada dato', en: 'Lineage: where each data comes from', pt: 'Lineage: de onde vem cada dado' }
      ],
      nonFunctional: [
        { es: 'Metadata actualizada automáticamente', en: 'Metadata updated automatically', pt: 'Metadata atualizada automaticamente' },
        { es: 'SSO integration', en: 'SSO integration', pt: 'SSO integration' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Metadata Crawlers', en: 'Metadata Crawlers', pt: 'Metadata Crawlers' },
        description: { es: 'Crawlers que extraen schema, samples, stats de cada fuente. Programados diariamente.', en: 'Crawlers that extract schema, samples, stats from each source. Scheduled daily.', pt: 'Crawlers que extraem schema, samples, stats de cada fonte. Programados diariamente.' },
        components: ['Crawlers', 'Glue', 'Custom Connectors'],
        diagram: `
┌─────────────────────────────────────────────────────────────┐
│                     Data Catalog                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │ Snowflake │  │    S3     │  │ PostgreSQL│               │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘               │
│        │              │              │                       │
│        └──────────────┼──────────────┘                       │
│                       ▼                                      │
│              ┌────────────────┐                              │
│              │   Crawlers     │                              │
│              │ (schema, stats)│                              │
│              └────────┬───────┘                              │
│                       ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              Metadata Store (PostgreSQL)                 ││
│  │  - Tables, columns, types                                ││
│  │  - Descriptions, tags, owners                            ││
│  │  - Lineage relationships                                 ││
│  │  - Access logs                                           ││
│  └─────────────────────────────────────────────────────────┘│
│                       │                                      │
│                       ▼                                      │
│              ┌────────────────┐                              │
│              │  Search UI     │                              │
│              │ (Elasticsearch)│                              │
│              └────────────────┘                              │
└─────────────────────────────────────────────────────────────┘`
      },
      {
        step: 2,
        title: { es: 'Search con Elasticsearch', en: 'Search with Elasticsearch', pt: 'Search com Elasticsearch' },
        description: { es: 'Index metadata en ES para búsqueda full-text. Facets por owner, tags, source.', en: 'Index metadata in ES for full-text search. Facets by owner, tags, source.', pt: 'Index metadata no ES para busca full-text. Facets por owner, tags, source.' },
        components: ['Elasticsearch', 'Search API']
      },
      {
        step: 3,
        title: { es: 'PII Detection', en: 'PII Detection', pt: 'PII Detection' },
        description: { es: 'ML para detectar columnas con PII (emails, nombres, SSN). Taggear automáticamente.', en: 'ML to detect columns with PII (emails, names, SSN). Auto-tag.', pt: 'ML para detectar colunas com PII (emails, nomes, CPF). Taggear automaticamente.' },
        components: ['AWS Macie', 'Custom ML', 'Auto-tagging']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Build vs Buy (DataHub, Atlan, Collibra)', en: 'Build vs Buy (DataHub, Atlan, Collibra)', pt: 'Build vs Buy (DataHub, Atlan, Collibra)' },
        option1: { es: 'DataHub (open source): gratis, hay que operar', en: 'DataHub (open source): free, need to operate', pt: 'DataHub (open source): grátis, precisa operar' },
        option2: { es: 'Atlan/Collibra: managed, $100k+/año', en: 'Atlan/Collibra: managed, $100k+/year', pt: 'Atlan/Collibra: managed, $100k+/ano' },
        recommendation: { es: 'DataHub si tenés equipo de plataforma. Atlan si no.', en: 'DataHub if you have platform team. Atlan if not.', pt: 'DataHub se tem equipe de plataforma. Atlan se não.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No definir ownership - nadie mantiene las descripciones', en: '❌ Not defining ownership - nobody maintains descriptions', pt: '❌ Não definir ownership - ninguém mantém as descrições' },
      { es: '❌ Hacer todo manual - se desactualiza en semanas', en: '❌ Doing everything manual - gets outdated in weeks', pt: '❌ Fazer tudo manual - fica desatualizado em semanas' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná data contracts para mantener calidad', en: '💡 Mention data contracts to maintain quality', pt: '💡 Mencione data contracts para manter qualidade' },
      { es: '💡 Hablá de cómo incentivar a los equipos a documentar', en: '💡 Talk about how to incentivize teams to document', pt: '💡 Fale de como incentivar os times a documentar' }
    ],
    relatedTopics: ['Data Catalog', 'Governance', 'DataHub', 'Metadata'],
    estimatedXP: 450
  },

  // ============ INTERVIEW 20: MULTI-TENANT ANALYTICS ============
  {
    id: 'sd-multitenant-analytics',
    title: {
      es: 'Analytics Multi-tenant SaaS',
      en: 'Multi-tenant SaaS Analytics',
      pt: 'Analytics Multi-tenant SaaS'
    },
    company: 'B2B SaaS',
    difficulty: 'senior',
    duration: '45 min',
    tags: ['Multi-tenant', 'SaaS', 'Isolation', 'Analytics'],
    problem: {
      es: `Sos DE en un SaaS B2B con 500 clientes (tenants).
Cada cliente quiere:
1. Dashboard con SUS métricas (no ver datos de otros)
2. Exports de sus datos
3. Algunos clientes grandes quieren conectar su propio BI tool

Restricciones:
- Aislamiento total entre tenants (compliance)
- Algunos tenants tienen 100x más datos que otros
- No podemos cobrar mucho más a tenants pequeños

¿Cómo diseñarías la plataforma de analytics?`,
      en: `You're a DE at a B2B SaaS with 500 customers (tenants).
Each customer wants:
1. Dashboard with THEIR metrics (cant see others data)
2. Exports of their data
3. Some large clients want to connect their own BI tool

Constraints:
- Total isolation between tenants (compliance)
- Some tenants have 100x more data than others
- We cant charge much more to small tenants

How would you design the analytics platform?`,
      pt: `Você é DE em um SaaS B2B com 500 clientes (tenants).
Cada cliente quer:
1. Dashboard com SUAS métricas (não ver dados de outros)
2. Exports dos seus dados
3. Alguns clientes grandes querem conectar sua própria ferramenta de BI

Restrições:
- Isolamento total entre tenants (compliance)
- Alguns tenants têm 100x mais dados que outros
- Não podemos cobrar muito mais para tenants pequenos

Como você projetaria a plataforma de analytics?`
    },
    clarifyingQuestions: [
      {
        question: { es: '¿Qué porcentaje de clientes son enterprise vs SMB?', en: 'What percentage of customers are enterprise vs SMB?', pt: 'Que porcentagem de clientes são enterprise vs SMB?' },
        whyAsk: { es: 'Define si necesitamos tiered architecture', en: 'Defines if we need tiered architecture', pt: 'Define se precisamos de arquitetura em tiers' },
        typicalAnswer: { es: '10% enterprise (80% del revenue), 90% SMB', en: '10% enterprise (80% of revenue), 90% SMB', pt: '10% enterprise (80% da receita), 90% SMB' }
      }
    ],
    requirements: {
      functional: [
        { es: 'Dashboards embebidos en el producto', en: 'Embedded dashboards in the product', pt: 'Dashboards embebidos no produto' },
        { es: 'Data export a CSV/Parquet', en: 'Data export to CSV/Parquet', pt: 'Data export para CSV/Parquet' },
        { es: 'Conexión directa para clientes enterprise', en: 'Direct connection for enterprise clients', pt: 'Conexão direta para clientes enterprise' }
      ],
      nonFunctional: [
        { es: 'Aislamiento 100% entre tenants', en: '100% isolation between tenants', pt: '100% de isolamento entre tenants' },
        { es: 'Query time < 5s para 95% de queries', en: 'Query time < 5s for 95% of queries', pt: 'Query time < 5s para 95% das queries' }
      ]
    },
    solution: [
      {
        step: 1,
        title: { es: 'Pool model con row-level security', en: 'Pool model with row-level security', pt: 'Pool model com row-level security' },
        description: { es: 'Un DW compartido con tenant_id en cada tabla. Row-level security en Snowflake/BigQuery.', en: 'Shared DW with tenant_id in each table. Row-level security in Snowflake/BigQuery.', pt: 'DW compartilhado com tenant_id em cada tabela. Row-level security no Snowflake/BigQuery.' },
        components: ['Snowflake', 'Row-Level Security', 'tenant_id'],
        diagram: `
┌─────────────────────────────────────────────────────────────┐
│                Multi-tenant Analytics                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                Shared Data Warehouse                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │ Table: events                                    │  │  │
│  │  │ - tenant_id (partition key)                     │  │  │
│  │  │ - event_type, timestamp, data...                │  │  │
│  │  │ [Row-Level Security: WHERE tenant_id = @user]   │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                          │                                   │
│         ┌────────────────┼────────────────┐                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  SMB Tier   │  │  Pro Tier   │  │ Enterprise  │         │
│  │ (embedded)  │  │ (embedded+  │  │ (dedicated  │         │
│  │             │  │  export)    │  │  schema)    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘`
      },
      {
        step: 2,
        title: { es: 'Tiered architecture', en: 'Tiered architecture', pt: 'Arquitetura em tiers' },
        description: { es: 'SMB: pool compartido. Enterprise: schema dedicado o incluso DW separado para cumplir SLAs.', en: 'SMB: shared pool. Enterprise: dedicated schema or even separate DW to meet SLAs.', pt: 'SMB: pool compartilhado. Enterprise: schema dedicado ou até DW separado para cumprir SLAs.' },
        components: ['Tiering', 'Schema per tenant', 'Resource governors']
      },
      {
        step: 3,
        title: { es: 'Embedded BI', en: 'Embedded BI', pt: 'BI Embebido' },
        description: { es: 'Metabase/Preset/Looker embebido con filtro de tenant automático. API para custom dashboards.', en: 'Metabase/Preset/Looker embedded with automatic tenant filter. API for custom dashboards.', pt: 'Metabase/Preset/Looker embebido com filtro de tenant automático. API para dashboards custom.' },
        components: ['Metabase', 'Looker', 'Embedded Analytics']
      }
    ],
    tradeoffs: [
      {
        decision: { es: 'Pool (shared) vs Silo (dedicated)', en: 'Pool (shared) vs Silo (dedicated)', pt: 'Pool (shared) vs Silo (dedicated)' },
        option1: { es: 'Pool: más eficiente en costos, riesgo de noisy neighbor', en: 'Pool: more cost efficient, noisy neighbor risk', pt: 'Pool: mais eficiente em custos, risco de noisy neighbor' },
        option2: { es: 'Silo: aislamiento perfecto, caro de operar', en: 'Silo: perfect isolation, expensive to operate', pt: 'Silo: isolamento perfeito, caro de operar' },
        recommendation: { es: 'Pool para SMB, Silo para enterprise con SLAs estrictos.', en: 'Pool for SMB, Silo for enterprise with strict SLAs.', pt: 'Pool para SMB, Silo para enterprise com SLAs estritos.' }
      }
    ],
    commonMistakes: [
      { es: '❌ No poner tenant_id en todas las tablas - queries filtran mal', en: '❌ Not putting tenant_id in all tables - queries filter incorrectly', pt: '❌ Não colocar tenant_id em todas as tabelas - queries filtram errado' },
      { es: '❌ No usar resource governors - un tenant grande afecta a todos', en: '❌ Not using resource governors - one large tenant affects all', pt: '❌ Não usar resource governors - um tenant grande afeta todos' }
    ],
    interviewerTips: [
      { es: '💡 Mencioná query queues separadas por tier', en: '💡 Mention separate query queues by tier', pt: '💡 Mencione query queues separadas por tier' },
      { es: '💡 Hablá de cómo manejar tenant offboarding (delete data)', en: '💡 Talk about handling tenant offboarding (delete data)', pt: '💡 Fale de como lidar com tenant offboarding (delete data)' }
    ],
    relatedTopics: ['Multi-tenant', 'SaaS', 'Snowflake', 'Row-Level Security'],
    estimatedXP: 450
  }
];

// Helper functions
export const getSystemDesignById = (id: string): SystemDesignInterview | undefined => {
  return SYSTEM_DESIGN_INTERVIEWS.find(sd => sd.id === id);
};

export const getSystemDesignsByDifficulty = (difficulty: 'junior' | 'mid' | 'senior'): SystemDesignInterview[] => {
  return SYSTEM_DESIGN_INTERVIEWS.filter(sd => sd.difficulty === difficulty);
};

export const getSystemDesignsByTag = (tag: string): SystemDesignInterview[] => {
  return SYSTEM_DESIGN_INTERVIEWS.filter(sd => sd.tags.includes(tag));
};

export const SYSTEM_DESIGN_STATS = {
  total: SYSTEM_DESIGN_INTERVIEWS.length,
  byDifficulty: {
    junior: SYSTEM_DESIGN_INTERVIEWS.filter(sd => sd.difficulty === 'junior').length,
    mid: SYSTEM_DESIGN_INTERVIEWS.filter(sd => sd.difficulty === 'mid').length,
    senior: SYSTEM_DESIGN_INTERVIEWS.filter(sd => sd.difficulty === 'senior').length,
  },
  totalXP: SYSTEM_DESIGN_INTERVIEWS.reduce((sum, sd) => sum + sd.estimatedXP, 0),
};

