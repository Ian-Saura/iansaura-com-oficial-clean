/**
 * PROYECTOS AWS DATA ENGINEERING
 * 5 proyectos prácticos de nivel intermedio a avanzado
 */
import { AWSProject } from './types';

export const awsProjects: AWSProject[] = [
  // === PROYECTO 1: DATA LAKE BÁSICO ===
  {
    id: 'aws-proj-1',
    number: 1,
    title: {
      es: 'Data Lake E-commerce',
      en: 'E-commerce Data Lake',
      pt: 'Data Lake E-commerce'
    },
    subtitle: {
      es: 'Tu primer Data Lake completo en AWS',
      en: 'Your first complete Data Lake on AWS',
      pt: 'Seu primeiro Data Lake completo na AWS'
    },
    description: {
      es: 'Construye un Data Lake desde cero para una tienda de e-commerce ficticia. Implementarás ingesta de datos desde archivos CSV, procesamiento con Glue, y consultas con Athena. Este proyecto consolida los conocimientos de S3, Glue y Athena.',
      en: 'Build a Data Lake from scratch for a fictional e-commerce store. You will implement data ingestion from CSV files, processing with Glue, and queries with Athena. This project consolidates knowledge of S3, Glue, and Athena.',
      pt: 'Construa um Data Lake do zero para uma loja de e-commerce fictícia. Você implementará ingestão de dados de arquivos CSV, processamento com Glue e consultas com Athena. Este projeto consolida o conhecimento de S3, Glue e Athena.'
    },
    difficulty: 'intermediate',
    estimatedHours: 12,
    skills: [
      { es: 'S3 con zonas raw/processed/serving', en: 'S3 with raw/processed/serving zones', pt: 'S3 com zonas raw/processed/serving' },
      { es: 'Glue Crawlers y Data Catalog', en: 'Glue Crawlers and Data Catalog', pt: 'Glue Crawlers e Data Catalog' },
      { es: 'Glue Jobs con PySpark', en: 'Glue Jobs with PySpark', pt: 'Glue Jobs com PySpark' },
      { es: 'Athena para queries SQL', en: 'Athena for SQL queries', pt: 'Athena para queries SQL' },
      { es: 'Particionamiento por fecha', en: 'Date partitioning', pt: 'Particionamento por data' }
    ],
    steps: [
      {
        title: { es: 'Diseñar estructura del Data Lake', en: 'Design Data Lake structure', pt: 'Projetar estrutura do Data Lake' },
        description: { es: 'Crea el bucket S3 con las zonas bronze/silver/gold y define el schema de los datos de ventas, productos y clientes.', en: 'Create the S3 bucket with bronze/silver/gold zones and define the schema for sales, products, and customers data.', pt: 'Crie o bucket S3 com as zonas bronze/silver/gold e defina o schema dos dados de vendas, produtos e clientes.' },
        deliverable: { es: 'Bucket S3 con estructura de carpetas y README con schema de datos', en: 'S3 bucket with folder structure and README with data schema', pt: 'Bucket S3 com estrutura de pastas e README com schema de dados' }
      },
      {
        title: { es: 'Generar datos de prueba', en: 'Generate test data', pt: 'Gerar dados de teste' },
        description: { es: 'Crea un script Python que genere 1 millón de registros de ventas con datos realistas (fechas, productos, montos).', en: 'Create a Python script that generates 1 million sales records with realistic data (dates, products, amounts).', pt: 'Crie um script Python que gere 1 milhão de registros de vendas com dados realistas (datas, produtos, valores).' },
        deliverable: { es: 'Script data_generator.py y archivos CSV en S3', en: 'data_generator.py script and CSV files in S3', pt: 'Script data_generator.py e arquivos CSV no S3' }
      },
      {
        title: { es: 'Configurar Glue Crawlers', en: 'Configure Glue Crawlers', pt: 'Configurar Glue Crawlers' },
        description: { es: 'Crea crawlers para detectar el schema de los CSV y poblar el Glue Data Catalog.', en: 'Create crawlers to detect CSV schema and populate the Glue Data Catalog.', pt: 'Crie crawlers para detectar o schema dos CSV e popular o Glue Data Catalog.' },
        deliverable: { es: 'Crawlers funcionando y tablas visibles en Catalog', en: 'Working crawlers and tables visible in Catalog', pt: 'Crawlers funcionando e tabelas visíveis no Catalog' }
      },
      {
        title: { es: 'Crear Glue ETL Job', en: 'Create Glue ETL Job', pt: 'Criar Glue ETL Job' },
        description: { es: 'Desarrolla un job que: limpie datos nulos, convierta a Parquet, agregue particiones por año/mes, y calcule métricas.', en: 'Develop a job that: cleans null data, converts to Parquet, adds year/month partitions, and calculates metrics.', pt: 'Desenvolva um job que: limpe dados nulos, converta para Parquet, adicione partições por ano/mês e calcule métricas.' },
        deliverable: { es: 'Job glue_etl.py probado y datos en processed/', en: 'Tested glue_etl.py job and data in processed/', pt: 'Job glue_etl.py testado e dados em processed/' }
      },
      {
        title: { es: 'Queries de negocio en Athena', en: 'Business queries in Athena', pt: 'Queries de negócio no Athena' },
        description: { es: 'Escribe 10 queries que respondan preguntas de negocio: top productos, ventas por región, tendencias mensuales, etc.', en: 'Write 10 queries that answer business questions: top products, sales by region, monthly trends, etc.', pt: 'Escreva 10 queries que respondam perguntas de negócio: top produtos, vendas por região, tendências mensais, etc.' },
        deliverable: { es: 'Archivo queries.sql con 10 queries documentadas', en: 'queries.sql file with 10 documented queries', pt: 'Arquivo queries.sql com 10 queries documentadas' }
      },
      {
        title: { es: 'Documentación y README', en: 'Documentation and README', pt: 'Documentação e README' },
        description: { es: 'Documenta la arquitectura, instrucciones de despliegue, y resultados del proyecto.', en: 'Document the architecture, deployment instructions, and project results.', pt: 'Documente a arquitetura, instruções de deploy e resultados do projeto.' },
        deliverable: { es: 'README.md completo con diagrama de arquitectura', en: 'Complete README.md with architecture diagram', pt: 'README.md completo com diagrama de arquitetura' }
      }
    ],
    evaluation: [
      { criteria: { es: 'Estructura correcta del Data Lake en S3', en: 'Correct Data Lake structure in S3', pt: 'Estrutura correta do Data Lake no S3' }, points: 15 },
      { criteria: { es: 'Datos generados con calidad y volumen adecuado', en: 'Data generated with quality and adequate volume', pt: 'Dados gerados com qualidade e volume adequado' }, points: 10 },
      { criteria: { es: 'Glue Crawlers configurados correctamente', en: 'Glue Crawlers correctly configured', pt: 'Glue Crawlers configurados corretamente' }, points: 15 },
      { criteria: { es: 'ETL Job funcional con transformaciones correctas', en: 'Functional ETL Job with correct transformations', pt: 'ETL Job funcional com transformações corretas' }, points: 25 },
      { criteria: { es: 'Queries optimizadas usando particiones', en: 'Optimized queries using partitions', pt: 'Queries otimizadas usando partições' }, points: 20 },
      { criteria: { es: 'Documentación clara y profesional', en: 'Clear and professional documentation', pt: 'Documentação clara e profissional' }, points: 15 }
    ],
    xpReward: 500,
    services: ['S3', 'Glue', 'Athena', 'IAM'],
    prerequisites: ['phase2', 'phase3', 'phase4', 'phase5']
  },

  // === PROYECTO 2: STREAMING PIPELINE ===
  {
    id: 'aws-proj-2',
    number: 2,
    title: {
      es: 'Pipeline de Streaming IoT',
      en: 'IoT Streaming Pipeline',
      pt: 'Pipeline de Streaming IoT'
    },
    subtitle: {
      es: 'Procesa eventos en tiempo real',
      en: 'Process events in real-time',
      pt: 'Processe eventos em tempo real'
    },
    description: {
      es: 'Construye un pipeline de streaming que ingesta eventos de sensores IoT (simulados), los procesa en tiempo real con Kinesis, y los almacena para análisis. Incluye alertas cuando los valores excedan umbrales.',
      en: 'Build a streaming pipeline that ingests IoT sensor events (simulated), processes them in real-time with Kinesis, and stores them for analysis. Includes alerts when values exceed thresholds.',
      pt: 'Construa um pipeline de streaming que ingere eventos de sensores IoT (simulados), processa em tempo real com Kinesis e armazena para análise. Inclui alertas quando valores excedem limiares.'
    },
    difficulty: 'intermediate',
    estimatedHours: 15,
    skills: [
      { es: 'Kinesis Data Streams', en: 'Kinesis Data Streams', pt: 'Kinesis Data Streams' },
      { es: 'Kinesis Data Firehose', en: 'Kinesis Data Firehose', pt: 'Kinesis Data Firehose' },
      { es: 'Lambda para procesamiento', en: 'Lambda for processing', pt: 'Lambda para processamento' },
      { es: 'SNS para alertas', en: 'SNS for alerts', pt: 'SNS para alertas' },
      { es: 'CloudWatch dashboards', en: 'CloudWatch dashboards', pt: 'CloudWatch dashboards' }
    ],
    steps: [
      {
        title: { es: 'Crear Kinesis Data Stream', en: 'Create Kinesis Data Stream', pt: 'Criar Kinesis Data Stream' },
        description: { es: 'Configura un stream on-demand para recibir eventos de sensores con capacidad de escalar automáticamente.', en: 'Configure an on-demand stream to receive sensor events with automatic scaling capability.', pt: 'Configure um stream on-demand para receber eventos de sensores com capacidade de escalar automaticamente.' },
        deliverable: { es: 'Stream iot-events creado y activo', en: 'iot-events stream created and active', pt: 'Stream iot-events criado e ativo' }
      },
      {
        title: { es: 'Desarrollar productor de eventos', en: 'Develop event producer', pt: 'Desenvolver produtor de eventos' },
        description: { es: 'Crea un script Python que simule 100 sensores enviando lecturas de temperatura, humedad y presión cada segundo.', en: 'Create a Python script that simulates 100 sensors sending temperature, humidity, and pressure readings every second.', pt: 'Crie um script Python que simule 100 sensores enviando leituras de temperatura, umidade e pressão a cada segundo.' },
        deliverable: { es: 'Script iot_producer.py enviando datos al stream', en: 'iot_producer.py script sending data to stream', pt: 'Script iot_producer.py enviando dados para o stream' }
      },
      {
        title: { es: 'Configurar Lambda consumer', en: 'Configure Lambda consumer', pt: 'Configurar Lambda consumer' },
        description: { es: 'Crea una función Lambda que procese los eventos: valide datos, detecte anomalías (temp > 40°C) y envíe alertas por SNS.', en: 'Create a Lambda function that processes events: validates data, detects anomalies (temp > 40°C), and sends SNS alerts.', pt: 'Crie uma função Lambda que processe os eventos: valide dados, detecte anomalias (temp > 40°C) e envie alertas por SNS.' },
        deliverable: { es: 'Lambda sensor_processor desplegada con trigger de Kinesis', en: 'sensor_processor Lambda deployed with Kinesis trigger', pt: 'Lambda sensor_processor implantada com trigger de Kinesis' }
      },
      {
        title: { es: 'Configurar Firehose a S3', en: 'Configure Firehose to S3', pt: 'Configurar Firehose para S3' },
        description: { es: 'Configura Kinesis Firehose para almacenar todos los eventos en S3 con particiones por fecha y conversión a Parquet.', en: 'Configure Kinesis Firehose to store all events in S3 with date partitions and Parquet conversion.', pt: 'Configure Kinesis Firehose para armazenar todos os eventos no S3 com partições por data e conversão para Parquet.' },
        deliverable: { es: 'Delivery stream entregando datos a S3 en Parquet', en: 'Delivery stream delivering data to S3 in Parquet', pt: 'Delivery stream entregando dados para S3 em Parquet' }
      },
      {
        title: { es: 'Dashboard de monitoreo', en: 'Monitoring dashboard', pt: 'Dashboard de monitoramento' },
        description: { es: 'Crea un dashboard en CloudWatch que muestre: eventos/segundo, alertas disparadas, latencia del pipeline, y métricas de sensores.', en: 'Create a CloudWatch dashboard showing: events/second, triggered alerts, pipeline latency, and sensor metrics.', pt: 'Crie um dashboard no CloudWatch mostrando: eventos/segundo, alertas disparados, latência do pipeline e métricas de sensores.' },
        deliverable: { es: 'Dashboard IoT-Monitoring con 6+ widgets', en: 'IoT-Monitoring dashboard with 6+ widgets', pt: 'Dashboard IoT-Monitoring com 6+ widgets' }
      },
      {
        title: { es: 'Análisis histórico', en: 'Historical analysis', pt: 'Análise histórica' },
        description: { es: 'Configura Athena para analizar los datos históricos y crea queries que identifiquen patrones y tendencias por sensor/ubicación.', en: 'Configure Athena to analyze historical data and create queries that identify patterns and trends by sensor/location.', pt: 'Configure Athena para analisar dados históricos e crie queries que identifiquem padrões e tendências por sensor/localização.' },
        deliverable: { es: 'Tabla en Athena y 5 queries de análisis', en: 'Athena table and 5 analysis queries', pt: 'Tabela no Athena e 5 queries de análise' }
      }
    ],
    evaluation: [
      { criteria: { es: 'Stream configurado correctamente', en: 'Stream correctly configured', pt: 'Stream configurado corretamente' }, points: 10 },
      { criteria: { es: 'Productor genera datos realistas', en: 'Producer generates realistic data', pt: 'Produtor gera dados realistas' }, points: 15 },
      { criteria: { es: 'Lambda procesa y alerta correctamente', en: 'Lambda processes and alerts correctly', pt: 'Lambda processa e alerta corretamente' }, points: 25 },
      { criteria: { es: 'Firehose entrega en Parquet particionado', en: 'Firehose delivers in partitioned Parquet', pt: 'Firehose entrega em Parquet particionado' }, points: 20 },
      { criteria: { es: 'Dashboard útil y bien organizado', en: 'Useful and well-organized dashboard', pt: 'Dashboard útil e bem organizado' }, points: 15 },
      { criteria: { es: 'Queries de análisis valiosas', en: 'Valuable analysis queries', pt: 'Queries de análise valiosas' }, points: 15 }
    ],
    xpReward: 600,
    services: ['Kinesis', 'Lambda', 'S3', 'Athena', 'SNS', 'CloudWatch'],
    prerequisites: ['phase2', 'phase8']
  },

  // === PROYECTO 3: DATA WAREHOUSE ===
  {
    id: 'aws-proj-3',
    number: 3,
    title: {
      es: 'Data Warehouse Financiero',
      en: 'Financial Data Warehouse',
      pt: 'Data Warehouse Financeiro'
    },
    subtitle: {
      es: 'Analytics de alto rendimiento con Redshift',
      en: 'High-performance analytics with Redshift',
      pt: 'Analytics de alto desempenho com Redshift'
    },
    description: {
      es: 'Diseña e implementa un Data Warehouse en Redshift Serverless para análisis financiero. Incluye modelo dimensional, ETL optimizado, y queries de BI. Conecta con datos externos en S3 usando Spectrum.',
      en: 'Design and implement a Data Warehouse in Redshift Serverless for financial analysis. Includes dimensional model, optimized ETL, and BI queries. Connect with external data in S3 using Spectrum.',
      pt: 'Projete e implemente um Data Warehouse no Redshift Serverless para análise financeira. Inclui modelo dimensional, ETL otimizado e queries de BI. Conecte com dados externos no S3 usando Spectrum.'
    },
    difficulty: 'advanced',
    estimatedHours: 20,
    skills: [
      { es: 'Redshift Serverless', en: 'Redshift Serverless', pt: 'Redshift Serverless' },
      { es: 'Modelo dimensional (Star Schema)', en: 'Dimensional model (Star Schema)', pt: 'Modelo dimensional (Star Schema)' },
      { es: 'COPY y UNLOAD', en: 'COPY and UNLOAD', pt: 'COPY e UNLOAD' },
      { es: 'Redshift Spectrum', en: 'Redshift Spectrum', pt: 'Redshift Spectrum' },
      { es: 'Optimización de queries', en: 'Query optimization', pt: 'Otimização de queries' }
    ],
    steps: [
      {
        title: { es: 'Diseñar modelo dimensional', en: 'Design dimensional model', pt: 'Projetar modelo dimensional' },
        description: { es: 'Diseña un Star Schema con fact_transactions y dimensiones: dim_customer, dim_product, dim_date, dim_location.', en: 'Design a Star Schema with fact_transactions and dimensions: dim_customer, dim_product, dim_date, dim_location.', pt: 'Projete um Star Schema com fact_transactions e dimensões: dim_customer, dim_product, dim_date, dim_location.' },
        deliverable: { es: 'Diagrama ERD y DDL de todas las tablas', en: 'ERD diagram and DDL for all tables', pt: 'Diagrama ERD e DDL de todas as tabelas' }
      },
      {
        title: { es: 'Crear Redshift Serverless', en: 'Create Redshift Serverless', pt: 'Criar Redshift Serverless' },
        description: { es: 'Configura namespace y workgroup con las tablas del modelo dimensional, incluyendo distribution y sort keys óptimos.', en: 'Configure namespace and workgroup with dimensional model tables, including optimal distribution and sort keys.', pt: 'Configure namespace e workgroup com tabelas do modelo dimensional, incluindo distribution e sort keys ótimos.' },
        deliverable: { es: 'Redshift Serverless con tablas creadas', en: 'Redshift Serverless with tables created', pt: 'Redshift Serverless com tabelas criadas' }
      },
      {
        title: { es: 'ETL de carga inicial', en: 'Initial load ETL', pt: 'ETL de carga inicial' },
        description: { es: 'Crea scripts que carguen 10M de transacciones desde S3 usando COPY. Implementa validaciones y manejo de errores.', en: 'Create scripts that load 10M transactions from S3 using COPY. Implement validations and error handling.', pt: 'Crie scripts que carreguem 10M de transações do S3 usando COPY. Implemente validações e tratamento de erros.' },
        deliverable: { es: 'Script load_data.sql y datos cargados', en: 'load_data.sql script and loaded data', pt: 'Script load_data.sql e dados carregados' }
      },
      {
        title: { es: 'Configurar Spectrum', en: 'Configure Spectrum', pt: 'Configurar Spectrum' },
        description: { es: 'Crea external schema que apunte al Data Lake en S3 para consultar datos históricos sin cargarlos a Redshift.', en: 'Create external schema pointing to Data Lake in S3 to query historical data without loading into Redshift.', pt: 'Crie external schema apontando para o Data Lake no S3 para consultar dados históricos sem carregar no Redshift.' },
        deliverable: { es: 'External schema y query de ejemplo uniendo local + externo', en: 'External schema and example query joining local + external', pt: 'External schema e query de exemplo unindo local + externo' }
      },
      {
        title: { es: 'Queries de BI', en: 'BI queries', pt: 'Queries de BI' },
        description: { es: 'Desarrolla 10 queries complejas: ventas por segmento, YoY growth, customer lifetime value, cohort analysis, etc.', en: 'Develop 10 complex queries: sales by segment, YoY growth, customer lifetime value, cohort analysis, etc.', pt: 'Desenvolva 10 queries complexas: vendas por segmento, YoY growth, customer lifetime value, cohort analysis, etc.' },
        deliverable: { es: 'Archivo bi_queries.sql documentado', en: 'Documented bi_queries.sql file', pt: 'Arquivo bi_queries.sql documentado' }
      },
      {
        title: { es: 'Optimización de performance', en: 'Performance optimization', pt: 'Otimização de performance' },
        description: { es: 'Analiza query plans, ajusta DISTKEY/SORTKEY, crea vistas materializadas para queries frecuentes.', en: 'Analyze query plans, adjust DISTKEY/SORTKEY, create materialized views for frequent queries.', pt: 'Analise query plans, ajuste DISTKEY/SORTKEY, crie views materializadas para queries frequentes.' },
        deliverable: { es: 'Documento de optimización con antes/después', en: 'Optimization document with before/after', pt: 'Documento de otimização com antes/depois' }
      }
    ],
    evaluation: [
      { criteria: { es: 'Modelo dimensional bien diseñado', en: 'Well-designed dimensional model', pt: 'Modelo dimensional bem projetado' }, points: 20 },
      { criteria: { es: 'Distribution y sort keys correctos', en: 'Correct distribution and sort keys', pt: 'Distribution e sort keys corretos' }, points: 15 },
      { criteria: { es: 'ETL robusto con validaciones', en: 'Robust ETL with validations', pt: 'ETL robusto com validações' }, points: 20 },
      { criteria: { es: 'Spectrum configurado y funcional', en: 'Spectrum configured and functional', pt: 'Spectrum configurado e funcional' }, points: 15 },
      { criteria: { es: 'Queries de BI complejas y útiles', en: 'Complex and useful BI queries', pt: 'Queries de BI complexas e úteis' }, points: 20 },
      { criteria: { es: 'Performance optimizado con evidencia', en: 'Optimized performance with evidence', pt: 'Performance otimizado com evidência' }, points: 10 }
    ],
    xpReward: 700,
    services: ['Redshift', 'S3', 'Glue', 'Spectrum'],
    prerequisites: ['phase5', 'phase6']
  },

  // === PROYECTO 4: ML PIPELINE ===
  {
    id: 'aws-proj-4',
    number: 4,
    title: {
      es: 'Pipeline de Feature Engineering',
      en: 'Feature Engineering Pipeline',
      pt: 'Pipeline de Feature Engineering'
    },
    subtitle: {
      es: 'Prepara datos para Machine Learning',
      en: 'Prepare data for Machine Learning',
      pt: 'Prepare dados para Machine Learning'
    },
    description: {
      es: 'Construye un pipeline completo de feature engineering que procese datos raw, genere features para ML, y los almacene en un Feature Store. El pipeline se orquesta con Step Functions y se ejecuta en EMR Serverless.',
      en: 'Build a complete feature engineering pipeline that processes raw data, generates ML features, and stores them in a Feature Store. The pipeline is orchestrated with Step Functions and runs on EMR Serverless.',
      pt: 'Construa um pipeline completo de feature engineering que processe dados raw, gere features para ML e armazene em um Feature Store. O pipeline é orquestrado com Step Functions e executa no EMR Serverless.'
    },
    difficulty: 'advanced',
    estimatedHours: 25,
    skills: [
      { es: 'EMR Serverless con Spark', en: 'EMR Serverless with Spark', pt: 'EMR Serverless com Spark' },
      { es: 'Feature Engineering avanzado', en: 'Advanced Feature Engineering', pt: 'Feature Engineering avançado' },
      { es: 'Step Functions orquestación', en: 'Step Functions orchestration', pt: 'Step Functions orquestração' },
      { es: 'Glue Data Quality', en: 'Glue Data Quality', pt: 'Glue Data Quality' },
      { es: 'SageMaker Feature Store', en: 'SageMaker Feature Store', pt: 'SageMaker Feature Store' }
    ],
    steps: [
      {
        title: { es: 'Análisis de datos fuente', en: 'Source data analysis', pt: 'Análise de dados fonte' },
        description: { es: 'Analiza los datos de clientes y transacciones para identificar qué features son valiosas para predicción de churn.', en: 'Analyze customer and transaction data to identify valuable features for churn prediction.', pt: 'Analise os dados de clientes e transações para identificar quais features são valiosas para predição de churn.' },
        deliverable: { es: 'Notebook de análisis exploratorio con conclusiones', en: 'Exploratory analysis notebook with conclusions', pt: 'Notebook de análise exploratória com conclusões' }
      },
      {
        title: { es: 'Diseñar Feature Store', en: 'Design Feature Store', pt: 'Projetar Feature Store' },
        description: { es: 'Define el schema del Feature Store con: customer features, behavioral features, aggregated features. Incluye TTL y versioning.', en: 'Define Feature Store schema with: customer features, behavioral features, aggregated features. Include TTL and versioning.', pt: 'Defina o schema do Feature Store com: customer features, behavioral features, aggregated features. Inclua TTL e versioning.' },
        deliverable: { es: 'Documento de diseño del Feature Store', en: 'Feature Store design document', pt: 'Documento de design do Feature Store' }
      },
      {
        title: { es: 'Pipeline EMR Spark', en: 'EMR Spark pipeline', pt: 'Pipeline EMR Spark' },
        description: { es: 'Desarrolla jobs Spark que calculen: RFM features, time-based aggregations, behavioral patterns, y one-hot encoding.', en: 'Develop Spark jobs that calculate: RFM features, time-based aggregations, behavioral patterns, and one-hot encoding.', pt: 'Desenvolva jobs Spark que calculem: RFM features, time-based aggregations, behavioral patterns e one-hot encoding.' },
        deliverable: { es: 'Scripts feature_engineering/*.py probados', en: 'Tested feature_engineering/*.py scripts', pt: 'Scripts feature_engineering/*.py testados' }
      },
      {
        title: { es: 'Data Quality checks', en: 'Data Quality checks', pt: 'Verificações de Data Quality' },
        description: { es: 'Implementa validaciones de calidad: no nulls en features críticas, rangos válidos, distribuciones esperadas.', en: 'Implement quality validations: no nulls in critical features, valid ranges, expected distributions.', pt: 'Implemente validações de qualidade: sem nulls em features críticas, ranges válidos, distribuições esperadas.' },
        deliverable: { es: 'Quality rules integradas en el pipeline', en: 'Quality rules integrated in pipeline', pt: 'Quality rules integradas no pipeline' }
      },
      {
        title: { es: 'Orquestación Step Functions', en: 'Step Functions orchestration', pt: 'Orquestração Step Functions' },
        description: { es: 'Crea state machine que orqueste: validación → EMR job → quality check → Feature Store update → notificación.', en: 'Create state machine that orchestrates: validation → EMR job → quality check → Feature Store update → notification.', pt: 'Crie state machine que orquestre: validação → EMR job → quality check → Feature Store update → notificação.' },
        deliverable: { es: 'State machine desplegada y funcional', en: 'Deployed and functional state machine', pt: 'State machine implantada e funcional' }
      },
      {
        title: { es: 'Ingestión al Feature Store', en: 'Feature Store ingestion', pt: 'Ingestão para Feature Store' },
        description: { es: 'Configura SageMaker Feature Store y escribe features desde Spark. Implementa upserts para actualizaciones.', en: 'Configure SageMaker Feature Store and write features from Spark. Implement upserts for updates.', pt: 'Configure SageMaker Feature Store e escreva features do Spark. Implemente upserts para atualizações.' },
        deliverable: { es: 'Feature Group con datos y queries de validación', en: 'Feature Group with data and validation queries', pt: 'Feature Group com dados e queries de validação' }
      }
    ],
    evaluation: [
      { criteria: { es: 'Features bien fundamentadas en análisis', en: 'Features well-founded in analysis', pt: 'Features bem fundamentadas em análise' }, points: 15 },
      { criteria: { es: 'Feature Store bien diseñado', en: 'Well-designed Feature Store', pt: 'Feature Store bem projetado' }, points: 15 },
      { criteria: { es: 'Spark jobs eficientes y correctos', en: 'Efficient and correct Spark jobs', pt: 'Spark jobs eficientes e corretos' }, points: 25 },
      { criteria: { es: 'Quality checks comprehensivos', en: 'Comprehensive quality checks', pt: 'Quality checks abrangentes' }, points: 15 },
      { criteria: { es: 'Orquestación robusta con error handling', en: 'Robust orchestration with error handling', pt: 'Orquestração robusta com error handling' }, points: 20 },
      { criteria: { es: 'Feature Store funcional end-to-end', en: 'End-to-end functional Feature Store', pt: 'Feature Store funcional end-to-end' }, points: 10 }
    ],
    xpReward: 800,
    services: ['EMR', 'Step Functions', 'Glue', 'SageMaker', 'S3'],
    prerequisites: ['phase7', 'phase9']
  },

  // === PROYECTO 5: CAPSTONE - DATA PLATFORM ===
  {
    id: 'aws-proj-5',
    number: 5,
    title: {
      es: 'Data Platform Enterprise',
      en: 'Enterprise Data Platform',
      pt: 'Data Platform Enterprise'
    },
    subtitle: {
      es: 'Proyecto capstone: plataforma de datos completa',
      en: 'Capstone project: complete data platform',
      pt: 'Projeto capstone: plataforma de dados completa'
    },
    description: {
      es: 'Construye una plataforma de datos empresarial completa que integre: batch processing, streaming, data warehouse, governance, IaC, CI/CD, y monitoreo. Este proyecto demuestra dominio end-to-end de AWS Data Engineering.',
      en: 'Build a complete enterprise data platform integrating: batch processing, streaming, data warehouse, governance, IaC, CI/CD, and monitoring. This project demonstrates end-to-end mastery of AWS Data Engineering.',
      pt: 'Construa uma plataforma de dados empresarial completa integrando: batch processing, streaming, data warehouse, governance, IaC, CI/CD e monitoramento. Este projeto demonstra domínio end-to-end de AWS Data Engineering.'
    },
    difficulty: 'advanced',
    estimatedHours: 40,
    skills: [
      { es: 'Arquitectura multi-capa', en: 'Multi-layer architecture', pt: 'Arquitetura multi-camada' },
      { es: 'IaC con Terraform', en: 'IaC with Terraform', pt: 'IaC com Terraform' },
      { es: 'CI/CD con GitHub Actions', en: 'CI/CD with GitHub Actions', pt: 'CI/CD com GitHub Actions' },
      { es: 'Lake Formation governance', en: 'Lake Formation governance', pt: 'Lake Formation governance' },
      { es: 'Observabilidad completa', en: 'Complete observability', pt: 'Observabilidade completa' }
    ],
    steps: [
      {
        title: { es: 'Arquitectura y diseño', en: 'Architecture and design', pt: 'Arquitetura e design' },
        description: { es: 'Diseña la arquitectura completa incluyendo: ingesta batch/streaming, procesamiento, storage, serving, governance, y monitoreo.', en: 'Design the complete architecture including: batch/streaming ingestion, processing, storage, serving, governance, and monitoring.', pt: 'Projete a arquitetura completa incluindo: ingestão batch/streaming, processamento, storage, serving, governance e monitoramento.' },
        deliverable: { es: 'Documento de arquitectura con diagramas', en: 'Architecture document with diagrams', pt: 'Documento de arquitetura com diagramas' }
      },
      {
        title: { es: 'Infrastructure as Code', en: 'Infrastructure as Code', pt: 'Infrastructure as Code' },
        description: { es: 'Implementa toda la infraestructura con Terraform: VPC, S3, Glue, Kinesis, Redshift, Step Functions, IAM, Lake Formation.', en: 'Implement all infrastructure with Terraform: VPC, S3, Glue, Kinesis, Redshift, Step Functions, IAM, Lake Formation.', pt: 'Implemente toda a infraestrutura com Terraform: VPC, S3, Glue, Kinesis, Redshift, Step Functions, IAM, Lake Formation.' },
        deliverable: { es: 'Módulos Terraform organizados y documentados', en: 'Organized and documented Terraform modules', pt: 'Módulos Terraform organizados e documentados' }
      },
      {
        title: { es: 'Pipeline de ingesta', en: 'Ingestion pipeline', pt: 'Pipeline de ingestão' },
        description: { es: 'Implementa ingesta batch (desde APIs/DBs) y streaming (desde eventos). Incluye validación y error handling.', en: 'Implement batch ingestion (from APIs/DBs) and streaming (from events). Include validation and error handling.', pt: 'Implemente ingestão batch (de APIs/DBs) e streaming (de eventos). Inclua validação e error handling.' },
        deliverable: { es: 'Pipelines de ingesta batch y streaming funcionando', en: 'Working batch and streaming ingestion pipelines', pt: 'Pipelines de ingestão batch e streaming funcionando' }
      },
      {
        title: { es: 'Pipeline de procesamiento', en: 'Processing pipeline', pt: 'Pipeline de processamento' },
        description: { es: 'Desarrolla ETL con Glue/EMR que transforme datos de bronze a silver a gold. Incluye data quality y CDC.', en: 'Develop ETL with Glue/EMR that transforms data from bronze to silver to gold. Include data quality and CDC.', pt: 'Desenvolva ETL com Glue/EMR que transforme dados de bronze para silver para gold. Inclua data quality e CDC.' },
        deliverable: { es: 'Jobs de ETL con calidad integrada', en: 'ETL jobs with integrated quality', pt: 'Jobs de ETL com qualidade integrada' }
      },
      {
        title: { es: 'Data Warehouse', en: 'Data Warehouse', pt: 'Data Warehouse' },
        description: { es: 'Configura Redshift con modelo dimensional, carga desde Data Lake, y queries de BI.', en: 'Configure Redshift with dimensional model, load from Data Lake, and BI queries.', pt: 'Configure Redshift com modelo dimensional, carga do Data Lake e queries de BI.' },
        deliverable: { es: 'Redshift con modelo y datos cargados', en: 'Redshift with model and loaded data', pt: 'Redshift com modelo e dados carregados' }
      },
      {
        title: { es: 'Governance con Lake Formation', en: 'Governance with Lake Formation', pt: 'Governance com Lake Formation' },
        description: { es: 'Implementa governance: registra recursos, define permisos por columna, configura data classification.', en: 'Implement governance: register resources, define column-level permissions, configure data classification.', pt: 'Implemente governance: registre recursos, defina permissões por coluna, configure data classification.' },
        deliverable: { es: 'Lake Formation configurado con permisos', en: 'Lake Formation configured with permissions', pt: 'Lake Formation configurado com permissões' }
      },
      {
        title: { es: 'Observabilidad', en: 'Observability', pt: 'Observabilidade' },
        description: { es: 'Crea dashboards, alarmas, y runbooks para: salud del pipeline, calidad de datos, costos, y SLAs.', en: 'Create dashboards, alarms, and runbooks for: pipeline health, data quality, costs, and SLAs.', pt: 'Crie dashboards, alarmes e runbooks para: saúde do pipeline, qualidade de dados, custos e SLAs.' },
        deliverable: { es: 'Dashboard completo y alertas configuradas', en: 'Complete dashboard and configured alerts', pt: 'Dashboard completo e alertas configurados' }
      },
      {
        title: { es: 'CI/CD Pipeline', en: 'CI/CD Pipeline', pt: 'CI/CD Pipeline' },
        description: { es: 'Configura GitHub Actions: lint, test, plan, apply para infra; y deploy para Glue jobs y Lambdas.', en: 'Configure GitHub Actions: lint, test, plan, apply for infra; and deploy for Glue jobs and Lambdas.', pt: 'Configure GitHub Actions: lint, test, plan, apply para infra; e deploy para Glue jobs e Lambdas.' },
        deliverable: { es: 'Workflows de CI/CD funcionando', en: 'Working CI/CD workflows', pt: 'Workflows de CI/CD funcionando' }
      },
      {
        title: { es: 'Documentación y demo', en: 'Documentation and demo', pt: 'Documentação e demo' },
        description: { es: 'Documenta la plataforma completa y prepara una demo que muestre el flujo end-to-end.', en: 'Document the complete platform and prepare a demo showing the end-to-end flow.', pt: 'Documente a plataforma completa e prepare uma demo mostrando o fluxo end-to-end.' },
        deliverable: { es: 'README completo, video demo de 5 min', en: 'Complete README, 5 min demo video', pt: 'README completo, vídeo demo de 5 min' }
      }
    ],
    evaluation: [
      { criteria: { es: 'Arquitectura bien diseñada y justificada', en: 'Well-designed and justified architecture', pt: 'Arquitetura bem projetada e justificada' }, points: 15 },
      { criteria: { es: 'IaC completo y modular', en: 'Complete and modular IaC', pt: 'IaC completo e modular' }, points: 15 },
      { criteria: { es: 'Ingesta batch y streaming funcional', en: 'Functional batch and streaming ingestion', pt: 'Ingestão batch e streaming funcional' }, points: 15 },
      { criteria: { es: 'ETL con calidad de datos', en: 'ETL with data quality', pt: 'ETL com qualidade de dados' }, points: 15 },
      { criteria: { es: 'Data Warehouse optimizado', en: 'Optimized Data Warehouse', pt: 'Data Warehouse otimizado' }, points: 10 },
      { criteria: { es: 'Governance implementado', en: 'Governance implemented', pt: 'Governance implementado' }, points: 10 },
      { criteria: { es: 'Observabilidad comprehensiva', en: 'Comprehensive observability', pt: 'Observabilidade abrangente' }, points: 10 },
      { criteria: { es: 'CI/CD funcional', en: 'Functional CI/CD', pt: 'CI/CD funcional' }, points: 5 },
      { criteria: { es: 'Documentación profesional', en: 'Professional documentation', pt: 'Documentação profissional' }, points: 5 }
    ],
    xpReward: 1500,
    services: ['S3', 'Glue', 'Athena', 'Redshift', 'Kinesis', 'Lambda', 'Step Functions', 'Lake Formation', 'CloudWatch', 'IAM', 'Terraform'],
    prerequisites: ['phase1', 'phase2', 'phase3', 'phase4', 'phase5', 'phase6', 'phase8', 'phase9', 'phase10', 'phase11']
  }
];

// Helper para obtener proyecto por ID
export const getProjectById = (id: string): AWSProject | undefined => {
  return awsProjects.find(p => p.id === id);
};

// Estadísticas
export const projectStats = {
  total: awsProjects.length,
  totalHours: awsProjects.reduce((sum, p) => sum + p.estimatedHours, 0),
  totalXP: awsProjects.reduce((sum, p) => sum + p.xpReward, 0),
  byDifficulty: {
    intermediate: awsProjects.filter(p => p.difficulty === 'intermediate').length,
    advanced: awsProjects.filter(p => p.difficulty === 'advanced').length
  }
};








