/**
 * FASES DEL ROADMAP AWS DATA ENGINEERING
 * 2 Niveles:
 *   Nivel 1: Serverless (Fases 0-6) - Lambda, Fargate, Step Functions, Free Tier priority
 *   Nivel 2: Advanced  (Fases 7-12) - EMR, Kinesis, IaC, Monitoring, Certification
 * 
 * Fase 0: Setup Free Tier (OBLIGATORIA)
 */
import { AWSPhase } from './types';

// ═══════════════════════════════════════════════════════════════
// TIPO EXTENDIDO PARA NIVEL
// ═══════════════════════════════════════════════════════════════
export interface AWSPhaseWithLevel extends AWSPhase {
  level: 1 | 2;
}

// ═══════════════════════════════════════════════════════════════
// TODAS LAS FASES (legacy export para compatibilidad)
// ═══════════════════════════════════════════════════════════════
export const awsPhases: AWSPhase[] = [
  // FASE 0: SETUP FREE TIER (OBLIGATORIA)
  {
    id: 'aws-phase-0',
    number: 0,
    title: {
      es: '🆓 Setup AWS Free Tier',
      en: '🆓 AWS Free Tier Setup',
      pt: '🆓 Setup AWS Free Tier'
    },
    subtitle: {
      es: 'Configurá tu cuenta sin gastar un centavo',
      en: 'Set up your account without spending a cent',
      pt: 'Configure sua conta sem gastar um centavo'
    },
    description: {
      es: 'OBLIGATORIO antes de empezar. Vas a crear tu cuenta AWS de forma segura, configurar alertas de costos, y preparar todo para que puedas hacer TODOS los labs gratis (o casi). Si no hacés esto, podés terminar con cobros sorpresa.',
      en: 'MANDATORY before starting. You will create your AWS account securely, set up cost alerts, and prepare everything so you can do ALL labs for free (or almost). If you don\'t do this, you might end up with surprise charges.',
      pt: 'OBRIGATÓRIO antes de começar. Você vai criar sua conta AWS de forma segura, configurar alertas de custos, e preparar tudo para que possa fazer TODOS os labs de graça (ou quase). Se não fizer isso, pode acabar com cobranças surpresa.'
    },
    icon: '🆓',
    color: 'emerald',
    estimatedDays: '1 día',
    stepsCount: 8,
    services: ['IAM', 'Budgets', 'CLI']
  },
  
  // FASE 1: Introducción
  {
    id: 'aws-phase-1',
    number: 1,
    title: {
      es: 'Fundamentos de AWS',
      en: 'AWS Fundamentals',
      pt: 'Fundamentos da AWS'
    },
    subtitle: {
      es: 'Tu primer contacto con la nube',
      en: 'Your first contact with the cloud',
      pt: 'Seu primeiro contato com a nuvem'
    },
    description: {
      es: 'Configura tu cuenta AWS de forma segura, aprende la consola, CLI y los conceptos básicos de cloud computing que necesitas para Data Engineering.',
      en: 'Set up your AWS account securely, learn the console, CLI, and the basic cloud computing concepts you need for Data Engineering.',
      pt: 'Configure sua conta AWS de forma segura, aprenda o console, CLI e os conceitos básicos de cloud computing que você precisa para Data Engineering.'
    },
    icon: '🚀',
    color: 'blue',
    estimatedDays: '3-4 días',
    stepsCount: 8,
    services: ['IAM', 'Console', 'CLI']
  },
  
  // FASE 2: S3
  {
    id: 'aws-phase-2',
    number: 2,
    title: {
      es: 'Amazon S3 - El corazón del Data Lake',
      en: 'Amazon S3 - The Heart of Data Lake',
      pt: 'Amazon S3 - O Coração do Data Lake'
    },
    subtitle: {
      es: 'Almacenamiento de objetos escalable',
      en: 'Scalable object storage',
      pt: 'Armazenamento de objetos escalável'
    },
    description: {
      es: 'Domina S3: buckets, objetos, clases de almacenamiento, lifecycle policies, particionamiento para analytics, y formatos de datos óptimos.',
      en: 'Master S3: buckets, objects, storage classes, lifecycle policies, analytics partitioning, and optimal data formats.',
      pt: 'Domine S3: buckets, objetos, classes de armazenamento, lifecycle policies, particionamento para analytics e formatos de dados ótimos.'
    },
    icon: '🪣',
    color: 'green',
    estimatedDays: '4-5 días',
    stepsCount: 10,
    services: ['S3']
  },
  
  // FASE 3: IAM & Seguridad
  {
    id: 'aws-phase-3',
    number: 3,
    title: {
      es: 'IAM, KMS y Seguridad',
      en: 'IAM, KMS, and Security',
      pt: 'IAM, KMS e Segurança'
    },
    subtitle: {
      es: 'Protege tu Data Lake',
      en: 'Protect your Data Lake',
      pt: 'Proteja seu Data Lake'
    },
    description: {
      es: 'Aprende IAM en profundidad: usuarios, roles, policies. Encriptación con KMS. Governance básico con Lake Formation.',
      en: 'Learn IAM in depth: users, roles, policies. Encryption with KMS. Basic governance with Lake Formation.',
      pt: 'Aprenda IAM em profundidade: users, roles, policies. Criptografia com KMS. Governance básico com Lake Formation.'
    },
    icon: '🔐',
    color: 'red',
    estimatedDays: '4-5 días',
    stepsCount: 9,
    services: ['IAM', 'KMS', 'Lake Formation']
  },
  
  // FASE 4: Glue
  {
    id: 'aws-phase-4',
    number: 4,
    title: {
      es: 'AWS Glue - ETL Serverless',
      en: 'AWS Glue - Serverless ETL',
      pt: 'AWS Glue - ETL Serverless'
    },
    subtitle: {
      es: 'Transforma datos a escala',
      en: 'Transform data at scale',
      pt: 'Transforme dados em escala'
    },
    description: {
      es: 'Domina Glue completamente: Data Catalog, Crawlers, ETL Jobs con PySpark, Glue Studio, Workflows, y Data Quality.',
      en: 'Master Glue completely: Data Catalog, Crawlers, ETL Jobs with PySpark, Glue Studio, Workflows, and Data Quality.',
      pt: 'Domine o Glue completamente: Data Catalog, Crawlers, ETL Jobs com PySpark, Glue Studio, Workflows e Data Quality.'
    },
    icon: '🧪',
    color: 'purple',
    estimatedDays: '6-7 días',
    stepsCount: 12,
    services: ['Glue']
  },
  
  // FASE 5: Athena
  {
    id: 'aws-phase-5',
    number: 5,
    title: {
      es: 'Amazon Athena - SQL Serverless',
      en: 'Amazon Athena - Serverless SQL',
      pt: 'Amazon Athena - SQL Serverless'
    },
    subtitle: {
      es: 'Consulta tu Data Lake con SQL',
      en: 'Query your Data Lake with SQL',
      pt: 'Consulte seu Data Lake com SQL'
    },
    description: {
      es: 'Aprende a usar Athena para queries sobre S3: optimización, CTAS, vistas, workgroups, federated queries, y control de costos.',
      en: 'Learn to use Athena for S3 queries: optimization, CTAS, views, workgroups, federated queries, and cost control.',
      pt: 'Aprenda a usar Athena para queries sobre S3: otimização, CTAS, views, workgroups, federated queries e controle de custos.'
    },
    icon: '🔍',
    color: 'indigo',
    estimatedDays: '4-5 días',
    stepsCount: 8,
    services: ['Athena']
  },
  
  // FASE 6: Redshift
  {
    id: 'aws-phase-6',
    number: 6,
    title: {
      es: 'Amazon Redshift - Data Warehouse',
      en: 'Amazon Redshift - Data Warehouse',
      pt: 'Amazon Redshift - Data Warehouse'
    },
    subtitle: {
      es: 'Analytics de alto rendimiento',
      en: 'High-performance analytics',
      pt: 'Analytics de alto desempenho'
    },
    description: {
      es: 'Construye un Data Warehouse profesional: Redshift Serverless, modelo dimensional, COPY, UNLOAD, Spectrum, y tuning de performance.',
      en: 'Build a professional Data Warehouse: Redshift Serverless, dimensional model, COPY, UNLOAD, Spectrum, and performance tuning.',
      pt: 'Construa um Data Warehouse profissional: Redshift Serverless, modelo dimensional, COPY, UNLOAD, Spectrum e tuning de performance.'
    },
    icon: '📊',
    color: 'orange',
    estimatedDays: '5-6 días',
    stepsCount: 10,
    services: ['Redshift']
  },
  
  // FASE 7: EMR
  {
    id: 'aws-phase-7',
    number: 7,
    title: {
      es: 'Amazon EMR - Big Data',
      en: 'Amazon EMR - Big Data',
      pt: 'Amazon EMR - Big Data'
    },
    subtitle: {
      es: 'Spark, Hive y procesamiento masivo',
      en: 'Spark, Hive, and massive processing',
      pt: 'Spark, Hive e processamento massivo'
    },
    description: {
      es: 'Procesa petabytes con EMR: clusters, EMR Serverless, Spark optimization, Hive, Delta Lake/Iceberg, y casos de uso avanzados.',
      en: 'Process petabytes with EMR: clusters, EMR Serverless, Spark optimization, Hive, Delta Lake/Iceberg, and advanced use cases.',
      pt: 'Processe petabytes com EMR: clusters, EMR Serverless, Spark optimization, Hive, Delta Lake/Iceberg e casos de uso avançados.'
    },
    icon: '⚡',
    color: 'yellow',
    estimatedDays: '5-6 días',
    stepsCount: 9,
    services: ['EMR']
  },
  
  // FASE 8: Kinesis
  {
    id: 'aws-phase-8',
    number: 8,
    title: {
      es: 'Amazon Kinesis - Streaming',
      en: 'Amazon Kinesis - Streaming',
      pt: 'Amazon Kinesis - Streaming'
    },
    subtitle: {
      es: 'Procesa datos en tiempo real',
      en: 'Process data in real-time',
      pt: 'Processe dados em tempo real'
    },
    description: {
      es: 'Domina streaming: Kinesis Data Streams, Firehose, Data Analytics (Flink), MSK (Kafka), y arquitecturas de streaming.',
      en: 'Master streaming: Kinesis Data Streams, Firehose, Data Analytics (Flink), MSK (Kafka), and streaming architectures.',
      pt: 'Domine streaming: Kinesis Data Streams, Firehose, Data Analytics (Flink), MSK (Kafka) e arquiteturas de streaming.'
    },
    icon: '🌊',
    color: 'cyan',
    estimatedDays: '5-6 días',
    stepsCount: 9,
    services: ['Kinesis', 'Lambda', 'MSK']
  },
  
  // FASE 9: Orquestación
  {
    id: 'aws-phase-9',
    number: 9,
    title: {
      es: 'Orquestación de Pipelines',
      en: 'Pipeline Orchestration',
      pt: 'Orquestração de Pipelines'
    },
    subtitle: {
      es: 'Automatiza tus workflows de datos',
      en: 'Automate your data workflows',
      pt: 'Automatize seus workflows de dados'
    },
    description: {
      es: 'Orquesta pipelines complejos: Step Functions, EventBridge, Glue Workflows, MWAA (Airflow), y patrones de orquestación.',
      en: 'Orchestrate complex pipelines: Step Functions, EventBridge, Glue Workflows, MWAA (Airflow), and orchestration patterns.',
      pt: 'Orquestre pipelines complexos: Step Functions, EventBridge, Glue Workflows, MWAA (Airflow) e padrões de orquestração.'
    },
    icon: '🎼',
    color: 'pink',
    estimatedDays: '4-5 días',
    stepsCount: 8,
    services: ['Step Functions', 'EventBridge', 'MWAA']
  },
  
  // FASE 10: IaC
  {
    id: 'aws-phase-10',
    number: 10,
    title: {
      es: 'Infrastructure as Code',
      en: 'Infrastructure as Code',
      pt: 'Infrastructure as Code'
    },
    subtitle: {
      es: 'Terraform, CloudFormation y CI/CD',
      en: 'Terraform, CloudFormation, and CI/CD',
      pt: 'Terraform, CloudFormation e CI/CD'
    },
    description: {
      es: 'Automatiza tu infraestructura: Terraform para AWS, CloudFormation, AWS CDK, y pipelines CI/CD con GitHub Actions.',
      en: 'Automate your infrastructure: Terraform for AWS, CloudFormation, AWS CDK, and CI/CD pipelines with GitHub Actions.',
      pt: 'Automatize sua infraestrutura: Terraform para AWS, CloudFormation, AWS CDK e pipelines CI/CD com GitHub Actions.'
    },
    icon: '🏗️',
    color: 'slate',
    estimatedDays: '4-5 días',
    stepsCount: 8,
    services: ['Terraform', 'CloudFormation', 'CDK']
  },
  
  // FASE 11: Monitoreo
  {
    id: 'aws-phase-11',
    number: 11,
    title: {
      es: 'Monitoring y Observabilidad',
      en: 'Monitoring and Observability',
      pt: 'Monitoring e Observabilidade'
    },
    subtitle: {
      es: 'CloudWatch, alertas y operaciones',
      en: 'CloudWatch, alerts, and operations',
      pt: 'CloudWatch, alertas e operações'
    },
    description: {
      es: 'Monitorea tu plataforma: CloudWatch métricas, logs, alarms, dashboards, X-Ray, Cost Explorer, y auto-remediation.',
      en: 'Monitor your platform: CloudWatch metrics, logs, alarms, dashboards, X-Ray, Cost Explorer, and auto-remediation.',
      pt: 'Monitore sua plataforma: CloudWatch metrics, logs, alarms, dashboards, X-Ray, Cost Explorer e auto-remediation.'
    },
    icon: '📈',
    color: 'emerald',
    estimatedDays: '3-4 días',
    stepsCount: 8,
    services: ['CloudWatch', 'X-Ray', 'CloudTrail']
  },
  
  // FASE 12: Certificación
  {
    id: 'aws-phase-12',
    number: 12,
    title: {
      es: 'Arquitectura y Certificación',
      en: 'Architecture and Certification',
      pt: 'Arquitetura e Certificação'
    },
    subtitle: {
      es: 'DAS-C01 y portfolio profesional',
      en: 'DAS-C01 and professional portfolio',
      pt: 'DAS-C01 e portfólio profissional'
    },
    description: {
      es: 'Prepárate para la certificación AWS Data Analytics Specialty, practica diseño de sistemas, y construye tu portfolio.',
      en: 'Prepare for AWS Data Analytics Specialty certification, practice system design, and build your portfolio.',
      pt: 'Prepare-se para a certificação AWS Data Analytics Specialty, pratique design de sistemas e construa seu portfólio.'
    },
    icon: '🏆',
    color: 'amber',
    estimatedDays: '5-7 días',
    stepsCount: 13,
    services: ['All']
  }
];

// ═══════════════════════════════════════════════════════════════
// NIVEL 1: SERVERLESS (Fases 0-6 + Lambda + Fargate)
// Free Tier priority, enfoque en Lambda/Fargate/Step Functions
// ═══════════════════════════════════════════════════════════════
export const awsPhasesNivel1: AWSPhaseWithLevel[] = [
  // Phase 0: Free Tier Setup
  { ...awsPhases[0], level: 1 },
  // Phase 1: Fundamentos y Seguridad (agrupa phases 1+2+3 existentes)
  {
    id: 'aws-n1-phase-1',
    number: 1,
    title: {
      es: 'Fundamentos y Seguridad (IAM + S3)',
      en: 'Fundamentals and Security (IAM + S3)',
      pt: 'Fundamentos e Segurança (IAM + S3)'
    },
    subtitle: {
      es: 'Almacenamiento, identidad y el Data Lake Medallion',
      en: 'Storage, identity and the Medallion Data Lake',
      pt: 'Armazenamento, identidade e o Data Lake Medallion'
    },
    description: {
      es: 'Domina S3 (almacenamiento de objetos, durabilidad 99.999999999%, particionamiento), IAM (Least Privilege, roles de ejecución), KMS (encriptación), y Secrets Manager. Configura tu Data Lake con estructura Medallion: bronze/, silver/, gold/.',
      en: 'Master S3 (object storage, 99.999999999% durability, partitioning), IAM (Least Privilege, execution roles), KMS (encryption), and Secrets Manager. Configure your Medallion Data Lake: bronze/, silver/, gold/.',
      pt: 'Domine S3 (armazenamento de objetos, durabilidade 99.999999999%, particionamento), IAM (Least Privilege, roles de execução), KMS (criptografia), e Secrets Manager. Configure seu Data Lake Medallion: bronze/, silver/, gold/.'
    },
    icon: '🔐',
    color: 'red',
    estimatedDays: '10-12 días',
    stepsCount: 27,
    services: ['S3', 'IAM', 'KMS', 'Lake Formation', 'Secrets Manager'],
    level: 1
  },
  // Phase 2: Glue Data Catalog + Athena
  {
    id: 'aws-n1-phase-2',
    number: 2,
    title: {
      es: 'El Cerebro del Data Lake (Glue Catalog + Athena)',
      en: 'The Data Lake Brain (Glue Catalog + Athena)',
      pt: 'O Cérebro do Data Lake (Glue Catalog + Athena)'
    },
    subtitle: {
      es: 'Schema-on-Read, SQL serverless y $0 en queries',
      en: 'Schema-on-Read, serverless SQL and $0 queries',
      pt: 'Schema-on-Read, SQL serverless e $0 em queries'
    },
    description: {
      es: 'Hive Metastore, Schema-on-Read, optimización de almacenamiento (Parquet vs CSV), Partition Projection. Creación de tablas manuales en el catálogo (sin Crawlers costosos). Queries SQL sobre S3 con Athena. Athena cobra $5/TB: aprende a pagar $0 con LIMIT y particionamiento.',
      en: 'Hive Metastore, Schema-on-Read, storage optimization (Parquet vs CSV), Partition Projection. Manual tables in catalog (no costly Crawlers). SQL queries over S3 with Athena.',
      pt: 'Hive Metastore, Schema-on-Read, otimização de armazenamento (Parquet vs CSV), Partition Projection. Tabelas manuais no catálogo (sem Crawlers custosos). Queries SQL sobre S3 com Athena.'
    },
    icon: '🧠',
    color: 'purple',
    estimatedDays: '8-10 días',
    stepsCount: 20,
    services: ['Glue Data Catalog', 'Athena'],
    level: 1
  },
  // Phase 3: Lambda
  {
    id: 'aws-n1-phase-3',
    number: 3,
    title: {
      es: 'Procesamiento por Eventos (AWS Lambda)',
      en: 'Event-Driven Processing (AWS Lambda)',
      pt: 'Processamento por Eventos (AWS Lambda)'
    },
    subtitle: {
      es: 'FaaS, S3 triggers, Bronze→Silver, Secrets Manager',
      en: 'FaaS, S3 triggers, Bronze→Silver, Secrets Manager',
      pt: 'FaaS, S3 triggers, Bronze→Silver, Secrets Manager'
    },
    description: {
      es: 'FaaS, cold starts, S3 triggers como motor de ingesta, handlers Python para validar schemas, limpiar datos y convertir a Parquet. Lambda Layers para dependencias. SQS/SNS para error handling. Secrets Manager para credenciales seguras. Boto3 avanzado con Glue Catalog, Athena y DynamoDB. GRATIS: 1M ejecuciones/mes de por vida.',
      en: 'FaaS, cold starts, S3 triggers as ingestion engine, Python handlers for schema validation, data cleaning and Parquet conversion. Lambda Layers, SQS/SNS, Secrets Manager, advanced boto3. FREE: 1M executions/month forever.',
      pt: 'FaaS, cold starts, S3 triggers como motor de ingestão, handlers Python para validar schemas, limpar dados e converter para Parquet. Lambda Layers, SQS/SNS, Secrets Manager, boto3 avançado. GRÁTIS: 1M execuções/mês para sempre.'
    },
    icon: '⚡',
    color: 'yellow',
    estimatedDays: '6-8 días',
    stepsCount: 11,
    services: ['Lambda', 'S3', 'Secrets Manager', 'SQS', 'SNS', 'DynamoDB'],
    level: 1
  },
  // Phase 4: Fargate
  {
    id: 'aws-n1-phase-4',
    number: 4,
    title: {
      es: 'Procesamiento de Larga Duración (ECS Fargate)',
      en: 'Long-Running Processing (ECS Fargate)',
      pt: 'Processamento de Longa Duração (ECS Fargate)'
    },
    subtitle: {
      es: 'Docker para ETL, cuando Lambda no alcanza',
      en: 'Docker for ETL, when Lambda is not enough',
      pt: 'Docker para ETL, quando Lambda não é suficiente'
    },
    description: {
      es: 'Dockerización de procesos ETL. ¿Cuándo Lambda no alcanza? (15 min, 10GB). Orquestación de contenedores sin servidores. Docker con Python/Pandas para procesar archivos pesados (+10GB). ECR, Task Definitions, Fargate launch. Se paga por CPU/RAM por segundo.',
      en: 'Docker for ETL. When Lambda is not enough (15 min, 10GB). Serverless container orchestration. Docker with Python/Pandas for heavy files. ECR, Task Definitions, Fargate launch.',
      pt: 'Docker para ETL. Quando Lambda não é suficiente (15 min, 10GB). Orquestração de containers serverless. Docker com Python/Pandas para arquivos pesados. ECR, Task Definitions, Fargate launch.'
    },
    icon: '🐳',
    color: 'blue',
    estimatedDays: '5-6 días',
    stepsCount: 8,
    services: ['ECS', 'Fargate', 'ECR', 'S3', 'CloudWatch'],
    level: 1
  },
  // Phase 5: Redshift (reutiliza existente)
  { ...awsPhases[6], level: 1, number: 5 },
  // Phase 6: Step Functions (reutiliza existente, solo Step Functions)
  {
    id: 'aws-n1-phase-6',
    number: 6,
    title: {
      es: 'Orquestación Visual (Step Functions)',
      en: 'Visual Orchestration (Step Functions)',
      pt: 'Orquestração Visual (Step Functions)'
    },
    subtitle: {
      es: 'State Machines, Retry/Catch y flujos E2E',
      en: 'State Machines, Retry/Catch and E2E flows',
      pt: 'State Machines, Retry/Catch e fluxos E2E'
    },
    description: {
      es: 'State Machines para orquestar pipelines. Manejo de errores (Retry/Catch). Flujos paralelos y de espera. Diferencia entre Standard y Express. Unir todo: Lambda → Fargate → Redshift → SNS. 4,000 transiciones gratis/mes.',
      en: 'State Machines for pipeline orchestration. Error handling (Retry/Catch). Parallel and wait flows. Standard vs Express. Connect everything: Lambda → Fargate → Redshift → SNS.',
      pt: 'State Machines para orquestrar pipelines. Tratamento de erros (Retry/Catch). Fluxos paralelos e de espera. Standard vs Express. Conectar tudo: Lambda → Fargate → Redshift → SNS.'
    },
    icon: '🎼',
    color: 'pink',
    estimatedDays: '4-5 días',
    stepsCount: 8,
    services: ['Step Functions', 'Lambda', 'SNS'],
    level: 1
  }
];

// ═══════════════════════════════════════════════════════════════
// NIVEL 2: ADVANCED (Fases 7-12 existentes, intactas)
// EMR, Kinesis, IaC, Monitoring, Certification
// ═══════════════════════════════════════════════════════════════
export const awsPhasesNivel2: AWSPhaseWithLevel[] = [
  { ...awsPhases[7], level: 2 },   // Phase 7: EMR
  { ...awsPhases[8], level: 2 },   // Phase 8: Kinesis
  { ...awsPhases[9], level: 2 },   // Phase 9: Orchestration (MWAA, EventBridge)
  { ...awsPhases[10], level: 2 },  // Phase 10: IaC
  { ...awsPhases[11], level: 2 },  // Phase 11: Monitoring
  { ...awsPhases[12], level: 2 }   // Phase 12: Certification
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

// Helper para obtener fase por número
export const getPhaseByNumber = (number: number): AWSPhase | undefined => {
  return awsPhases.find(p => p.number === number);
};

// Helper para obtener fase por ID
export const getPhaseById = (id: string): AWSPhase | undefined => {
  return [...awsPhases, ...awsPhasesNivel1].find(p => p.id === id);
};

// Helper para obtener fases por nivel
export const getPhasesByLevel = (level: 1 | 2): AWSPhaseWithLevel[] => {
  return level === 1 ? awsPhasesNivel1 : awsPhasesNivel2;
};

// Estadísticas de fases
export const phaseStats = {
  totalPhases: awsPhases.length,
  totalSteps: awsPhases.reduce((sum, p) => sum + (p.stepsCount || 0), 0),
  estimatedWeeks: '8-10'
};

// Estadísticas por nivel
export const nivel1Stats = {
  totalPhases: awsPhasesNivel1.length,
  totalSteps: awsPhasesNivel1.reduce((sum, p) => sum + (p.stepsCount || 0), 0),
  estimatedWeeks: '5-6',
  freeTierFriendly: true
};

export const nivel2Stats = {
  totalPhases: awsPhasesNivel2.length,
  totalSteps: awsPhasesNivel2.reduce((sum, p) => sum + (p.stepsCount || 0), 0),
  estimatedWeeks: '4-5',
  freeTierFriendly: false
};
