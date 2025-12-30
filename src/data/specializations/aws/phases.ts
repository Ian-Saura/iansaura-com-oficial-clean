/**
 * FASES DEL ROADMAP AWS DATA ENGINEERING
 * 13 fases con progresión desde setup hasta certificación
 * Fase 0: Setup Free Tier (OBLIGATORIA)
 */
import { AWSPhase } from './types';

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

// Helper para obtener fase por número
export const getPhaseByNumber = (number: number): AWSPhase | undefined => {
  return awsPhases.find(p => p.number === number);
};

// Helper para obtener fase por ID
export const getPhaseById = (id: string): AWSPhase | undefined => {
  return awsPhases.find(p => p.id === id);
};

// Estadísticas de fases
export const phaseStats = {
  totalPhases: awsPhases.length,
  totalSteps: awsPhases.reduce((sum, p) => sum + (p.stepsCount || 0), 0),
  estimatedWeeks: '8-10'
};
