import { Specialization } from '../../types/members';
// Import Databricks specialization data
// import { DATABRICKS_STATS, DATABRICKS_PREVIEW } from '../specializations/databricks';

export const specializations: Specialization[] = [
  // 🎓 FUNDAMENTOS TEÓRICOS - 🚀 DISPONIBLE - Lanzado Enero 2026
  {
    id: 'spec-theoretical-foundations',
    title: { es: 'Fundamentos Teóricos', en: 'Theoretical Foundations', pt: 'Fundamentos Teóricos' },
    subtitle: { es: 'Para quienes quieren entender el "por qué"', en: 'For those who want to understand the "why"', pt: 'Para quem quer entender o "porquê"' },
    description: { es: 'Contenido académico profundo que complementa cada fase del roadmap. 20+ Deep Dives con mapas mentales Mermaid, cheat sheets técnicos, bibliografía de papers clásicos (Kleppmann, Kimball, Google Papers, Amazon Dynamo) y gotchas de nivel senior. Opcional pero poderoso: te convierte en un ingeniero con bases sólidas que entiende el "por qué" detrás de cada herramienta.', en: 'Deep academic content that complements each roadmap phase. 20+ Deep Dives with Mermaid mind maps, technical cheat sheets, bibliography of classic papers (Kleppmann, Kimball, Google Papers, Amazon Dynamo) and senior-level gotchas. Optional but powerful: turns you into an engineer with solid foundations who understands the "why" behind each tool.', pt: 'Conteúdo acadêmico profundo que complementa cada fase do roadmap. 20+ Deep Dives com mapas mentais Mermaid, cheat sheets técnicos, bibliografia de papers clássicos (Kleppmann, Kimball, Google Papers, Amazon Dynamo) e gotchas de nível sênior. Opcional mas poderoso: transforma você em um engenheiro com bases sólidas que entende o "porquê" por trás de cada ferramenta.' },
    icon: '🎓',
    color: 'violet',
    status: 'available', // 🚀 LANZADO - Enero 2026
    isNext: false, // Ya está disponible
    isHidden: false,
    isNew: true, // Mostrar badge de nuevo
    releaseDate: 'Disponible ahora',
    prerequisites: [], // No tiene prerequisitos - aplica a cualquier nivel
    duration: '40+ horas de lectura',
    skills: [
      { es: 'First Principles & Fundamentos CS', en: 'First Principles & CS Fundamentals', pt: 'First Principles & Fundamentos CS' },
      { es: 'Mapas Mentales (Mermaid)', en: 'Mind Maps (Mermaid)', pt: 'Mapas Mentais (Mermaid)' },
      { es: 'Cheat Sheets Técnicos', en: 'Technical Cheat Sheets', pt: 'Cheat Sheets Técnicos' },
      { es: 'Papers Académicos (Google, Amazon, etc.)', en: 'Academic Papers (Google, Amazon, etc.)', pt: 'Papers Acadêmicos (Google, Amazon, etc.)' },
      { es: 'Bibliografía Profesional (Kleppmann, Kimball)', en: 'Professional Bibliography (Kleppmann, Kimball)', pt: 'Bibliografia Profissional (Kleppmann, Kimball)' },
      { es: 'Gotchas de Nivel Senior', en: 'Senior-Level Gotchas', pt: 'Gotchas de Nível Sênior' },
      { es: 'Preparación para Entrevistas Técnicas', en: 'Technical Interview Prep', pt: 'Preparação para Entrevistas Técnicas' },
      { es: 'Patrones de Diseño de Datos', en: 'Data Design Patterns', pt: 'Padrões de Design de Dados' }
    ],
    projects: 0, // No tiene proyectos, es contenido teórico
    dataPath: '../deepDives',
    stats: {
      phases: 20, // 20+ Deep Dives
      steps: 200, // Estimado ~10 secciones por deep dive
      exercises: 50, // Ejercicios de comprensión
      projects: 0,
      labs: 0
    }
  },
  // 1. DATABRICKS - 🚀 DISPONIBLE - Lanzado Enero 2025
  {
    id: 'spec-databricks',
    title: { es: 'Especialización en Databricks', en: 'Databricks Specialization', pt: 'Especialização em Databricks' },
    subtitle: { es: 'La plataforma unificada de datos más demandada', en: 'The most in-demand unified data platform', pt: 'A plataforma unificada de dados mais demandada' },
    description: { es: 'Domina Databricks desde cero hasta la certificación DE Associate. 12 fases, 100+ pasos, notebooks descargables, simulador de examen, certificado verificable con badge LinkedIn, y casos de uso reales LATAM. Practica con Community Edition (gratis) + Databricks Academy.', en: 'Master Databricks from zero to DE Associate certification. 12 phases, 100+ steps, downloadable notebooks, exam simulator, verifiable certificate with LinkedIn badge, and real LATAM use cases. Practice with Community Edition (free) + Databricks Academy.', pt: 'Domine Databricks do zero à certificação DE Associate. 12 fases, 100+ passos, notebooks baixáveis, simulador de exame, certificado verificável com badge LinkedIn, e casos de uso reais LATAM. Pratique com Community Edition (grátis) + Databricks Academy.' },
    icon: '🔶',
    color: 'orange',
    status: 'available', // 🚀 LANZADO - Enero 2025
    isNext: false, // Ya está disponible
    isHidden: false,
    isNew: true, // Mostrar badge de nuevo
    releaseDate: 'Disponible ahora',
    prerequisites: ['level-2'],
    duration: '8-12 semanas',
    skills: [
      { es: 'Databricks Workspace & Notebooks', en: 'Databricks Workspace & Notebooks', pt: 'Databricks Workspace & Notebooks' },
      { es: 'Apache Spark (DataFrames, SQL, Optimización)', en: 'Apache Spark (DataFrames, SQL, Optimization)', pt: 'Apache Spark (DataFrames, SQL, Otimização)' },
      { es: 'Delta Lake (ACID, Time Travel, MERGE, Z-Order)', en: 'Delta Lake (ACID, Time Travel, MERGE, Z-Order)', pt: 'Delta Lake (ACID, Time Travel, MERGE, Z-Order)' },
      { es: 'Unity Catalog (governance, permisos)', en: 'Unity Catalog (governance, permissions)', pt: 'Unity Catalog (governança, permissões)' },
      { es: 'Databricks Workflows & Jobs', en: 'Databricks Workflows & Jobs', pt: 'Databricks Workflows & Jobs' },
      { es: 'Delta Live Tables (DLT) & Expectations', en: 'Delta Live Tables (DLT) & Expectations', pt: 'Delta Live Tables (DLT) & Expectations' },
      { es: 'MLflow (tracking, registry, serving)', en: 'MLflow (tracking, registry, serving)', pt: 'MLflow (tracking, registry, serving)' },
      { es: 'SQL Warehouse & BI Integration', en: 'SQL Warehouse & BI Integration', pt: 'SQL Warehouse & Integração BI' },
      { es: 'Structured Streaming', en: 'Structured Streaming', pt: 'Structured Streaming' },
      { es: 'Certificación DE Associate', en: 'DE Associate Certification', pt: 'Certificação DE Associate' }
    ],
    projects: 5,
    // Extended data reference
    dataPath: '../specializations/databricks',
    stats: {
      phases: 12,
      steps: 100,
      labs: 10,
      exercises: 20,
      projects: 5
    }
  },
  // 2. AWS - MARZO 2026 - 2 NIVELES: Serverless + Advanced
  {
    id: 'spec-aws',
    title: { es: 'Especialización en AWS Data Engineering', en: 'AWS Data Engineering Specialization', pt: 'Especialização em AWS Data Engineering' },
    subtitle: { es: 'El cloud #1 en demanda laboral - 2 niveles', en: 'The #1 cloud in job demand - 2 levels', pt: 'A nuvem #1 em demanda de emprego - 2 níveis' },
    description: { es: '2 niveles complementarios: Nivel 1 Serverless (Lambda, Fargate, Step Functions, Free Tier) y Nivel 2 Advanced (EMR, Kinesis, IaC, Certificación). 15 fases, 134 pasos, 44 ejercicios, 10 proyectos enterprise Medallion, 18 preguntas de entrevista expert, y Secrets Manager integrado. Cada paso incluye teoría profunda, código real y tips de entrevista.', en: '2 complementary levels: Level 1 Serverless (Lambda, Fargate, Step Functions, Free Tier) and Level 2 Advanced (EMR, Kinesis, IaC, Certification). 15 phases, 134 steps, 44 exercises, 10 enterprise Medallion projects, 18 expert interview questions, and Secrets Manager integrated.', pt: '2 níveis complementares: Nível 1 Serverless (Lambda, Fargate, Step Functions, Free Tier) e Nível 2 Advanced (EMR, Kinesis, IaC, Certificação). 15 fases, 134 passos, 44 exercícios, 10 projetos enterprise Medallion, 18 perguntas de entrevista expert, e Secrets Manager integrado.' },
    icon: '☁️',
    color: 'amber',
    status: 'coming_soon',
    isNext: true,
    isHidden: false,
    releaseDate: '1 de Marzo 2026',
    releaseDateISO: '2026-03-01T00:00:00',
    prerequisites: ['level-2'],
    duration: '10-12 semanas',
    skills: [
      { es: 'S3 (Data Lake Medallion, partitioning)', en: 'S3 (Medallion Data Lake, partitioning)', pt: 'S3 (Data Lake Medallion, partitioning)' },
      { es: 'Lambda (ETL serverless, S3 triggers)', en: 'Lambda (serverless ETL, S3 triggers)', pt: 'Lambda (ETL serverless, S3 triggers)' },
      { es: 'ECS Fargate (Docker ETL para archivos grandes)', en: 'ECS Fargate (Docker ETL for large files)', pt: 'ECS Fargate (Docker ETL para arquivos grandes)' },
      { es: 'Secrets Manager (credenciales seguras)', en: 'Secrets Manager (secure credentials)', pt: 'Secrets Manager (credenciais seguras)' },
      { es: 'Step Functions (orquestación visual)', en: 'Step Functions (visual orchestration)', pt: 'Step Functions (orquestração visual)' },
      { es: 'Glue Data Catalog + Athena (SQL serverless)', en: 'Glue Data Catalog + Athena (serverless SQL)', pt: 'Glue Data Catalog + Athena (SQL serverless)' },
      { es: 'Amazon Redshift (data warehouse)', en: 'Amazon Redshift (data warehouse)', pt: 'Amazon Redshift (data warehouse)' },
      { es: 'EMR + Kinesis (Big Data + Streaming)', en: 'EMR + Kinesis (Big Data + Streaming)', pt: 'EMR + Kinesis (Big Data + Streaming)' },
      { es: 'IAM & Security best practices', en: 'IAM & Security best practices', pt: 'IAM & Melhores práticas de segurança' },
      { es: 'Preparación entrevistas nivel expert', en: 'Expert-level interview preparation', pt: 'Preparação entrevistas nível expert' }
    ],
    projects: 10,
    dataPath: '../specializations/aws',
    stats: {
      phases: 15,
      steps: 134,
      labs: 10,
      exercises: 44,
      projects: 10
    }
  },
  // 3. ANALYTICS ENGINEERING (dbt + Snowflake) - ABRIL 2026
  {
    id: 'spec-analytics-engineering',
    title: { es: 'Especialización en Analytics Engineering', en: 'Analytics Engineering Specialization', pt: 'Especialização em Analytics Engineering' },
    subtitle: { es: 'dbt + Snowflake: el stack moderno de analytics', en: 'dbt + Snowflake: the modern analytics stack', pt: 'dbt + Snowflake: a stack moderna de analytics' },
    description: { es: 'Profundiza en el rol de Analytics Engineer con dbt y Snowflake. Domina dbt a nivel experto, semantic layers, métricas como código, y cómo construir data products que realmente usan los stakeholders. El rol más hot del momento.', en: 'Deep dive into the Analytics Engineer role with dbt and Snowflake. Master dbt at an expert level, semantic layers, metrics as code, and how to build data products that stakeholders actually use. The hottest role right now.', pt: 'Aprofunde-se no papel de Analytics Engineer com dbt e Snowflake. Domine dbt em nível expert, semantic layers, métricas como código e como construir produtos de dados que os stakeholders realmente usam. O cargo mais quente do momento.' },
    icon: '📊',
    color: 'rose',
    status: 'coming_soon',
    releaseDate: 'Abril 2026',
    prerequisites: ['level-2'],
    duration: '4-6 semanas',
    skills: [
      { es: 'Snowflake (warehouse, stages, tasks)', en: 'Snowflake (warehouse, stages, tasks)', pt: 'Snowflake (warehouse, stages, tasks)' },
      { es: 'dbt avanzado (macros, packages, hooks)', en: 'Advanced dbt (macros, packages, hooks)', pt: 'dbt avançado (macros, packages, hooks)' },
      { es: 'Semantic Layer (dbt Semantic Layer, Cube)', en: 'Semantic Layer (dbt Semantic Layer, Cube)', pt: 'Semantic Layer (dbt Semantic Layer, Cube)' },
      { es: 'Metrics as Code', en: 'Metrics as Code', pt: 'Métricas como Código' },
      { es: 'Data modeling (dimensional, OBT)', en: 'Data modeling (dimensional, OBT)', pt: 'Modelagem de dados (dimensional, OBT)' },
      { es: 'Self-service BI (Metabase, Looker)', en: 'Self-service BI (Metabase, Looker)', pt: 'Self-service BI (Metabase, Looker)' },
      { es: 'dbt tests & documentation', en: 'dbt tests & documentation', pt: 'Testes e documentação dbt' },
      { es: 'CI/CD para dbt', en: 'CI/CD for dbt', pt: 'CI/CD para dbt' }
    ],
    projects: 4
  },
  // 4. AZURE
  {
    id: 'spec-azure',
    title: { es: 'Especialización en Azure Data Engineering', en: 'Azure Data Engineering Specialization', pt: 'Especialização em Azure Data Engineering' },
    subtitle: { es: 'El cloud enterprise por excelencia', en: 'The enterprise cloud par excellence', pt: 'A nuvem enterprise por excelência' },
    description: { es: 'Domina el ecosistema de datos de Microsoft Azure. Aprenderás Synapse Analytics, Data Factory, Databricks en Azure, y Event Hubs. Ideal para empresas con stack Microsoft y te prepara para la certificación Azure Data Engineer.', en: 'Master the Microsoft Azure data ecosystem. You will learn Synapse Analytics, Data Factory, Databricks on Azure, and Event Hubs. Ideal for companies with Microsoft stack and prepares you for Azure Data Engineer certification.', pt: 'Domine o ecossistema de dados do Microsoft Azure. Você aprenderá Synapse Analytics, Data Factory, Databricks no Azure e Event Hubs. Ideal para empresas com stack Microsoft e prepara você para a certificação Azure Data Engineer.' },
    icon: '🔷',
    color: 'blue',
    status: 'coming_soon',
    releaseDate: 'Abril 2026',
    prerequisites: ['level-2'],
    duration: '6-8 semanas',
    skills: [
      { es: 'Azure Synapse Analytics', en: 'Azure Synapse Analytics', pt: 'Azure Synapse Analytics' },
      { es: 'Azure Data Factory (ETL/ELT)', en: 'Azure Data Factory (ETL/ELT)', pt: 'Azure Data Factory (ETL/ELT)' },
      { es: 'Azure Databricks', en: 'Azure Databricks', pt: 'Azure Databricks' },
      { es: 'Azure Data Lake Storage', en: 'Azure Data Lake Storage', pt: 'Azure Data Lake Storage' },
      { es: 'Event Hubs (streaming)', en: 'Event Hubs (streaming)', pt: 'Event Hubs (streaming)' },
      { es: 'Power BI integration', en: 'Power BI integration', pt: 'Integração com Power BI' },
      { es: 'Azure Purview (governance)', en: 'Azure Purview (governance)', pt: 'Azure Purview (governança)' },
      { es: 'Azure security & networking', en: 'Azure security & networking', pt: 'Segurança e rede Azure' }
    ],
    projects: 4
  },
  // 5. REAL-TIME & STREAMING
  {
    id: 'spec-streaming',
    title: { es: 'Especialización en Real-Time & Streaming', en: 'Real-Time & Streaming Specialization', pt: 'Especialização em Real-Time & Streaming' },
    subtitle: { es: 'Domina Kafka, Flink y procesamiento en tiempo real', en: 'Master Kafka, Flink and real-time processing', pt: 'Domine Kafka, Flink e processamento em tempo real' },
    description: { es: 'Conviértete en experto en arquitecturas de streaming. Aprenderás a diseñar, implementar y operar pipelines de datos en tiempo real con Apache Kafka, Apache Flink, y patrones como Event Sourcing y CQRS. Esta especialización te prepara para roles de Staff Engineer en empresas que procesan millones de eventos por segundo.', en: 'Become an expert in streaming architectures. You will learn to design, implement and operate real-time data pipelines with Apache Kafka, Apache Flink, and patterns like Event Sourcing and CQRS. This specialization prepares you for Staff Engineer roles in companies processing millions of events per second.', pt: 'Torne-se um especialista em arquiteturas de streaming. Você aprenderá a projetar, implementar e operar pipelines de dados em tempo real com Apache Kafka, Apache Flink e padrões como Event Sourcing e CQRS. Esta especialização prepara você para funções de Staff Engineer em empresas que processam milhões de eventos por segundo.' },
    icon: '⚡',
    color: 'amber',
    status: 'coming_soon',
    releaseDate: 'Mayo 2026',
    prerequisites: ['level-3'],
    duration: '6-8 semanas',
    skills: [
      { es: 'Apache Kafka (Producers, Consumers, Streams)', en: 'Apache Kafka (Producers, Consumers, Streams)', pt: 'Apache Kafka (Producers, Consumers, Streams)' },
      { es: 'Apache Flink (DataStream API, CEP)', en: 'Apache Flink (DataStream API, CEP)', pt: 'Apache Flink (DataStream API, CEP)' },
      { es: 'Event Sourcing & CQRS', en: 'Event Sourcing & CQRS', pt: 'Event Sourcing & CQRS' },
      { es: 'Exactly-once semantics', en: 'Exactly-once semantics', pt: 'Semântica Exactly-once' },
      { es: 'Kafka Connect & Schema Registry', en: 'Kafka Connect & Schema Registry', pt: 'Kafka Connect & Schema Registry' },
      { es: 'Real-time dashboards', en: 'Real-time dashboards', pt: 'Dashboards em tempo real' },
      { es: 'Backpressure handling', en: 'Backpressure handling', pt: 'Tratamento de Backpressure' },
      { es: 'Stream-table duality', en: 'Stream-table duality', pt: 'Dualidade Stream-table' }
    ],
    projects: 4
  },
  // 6. DATA PLATFORM ENGINEERING
  {
    id: 'spec-platform-engineering',
    title: { es: 'Especialización en Data Platform Engineering', en: 'Data Platform Engineering Specialization', pt: 'Especialização em Data Platform Engineering' },
    subtitle: { es: 'Construye plataformas de datos internas', en: 'Build internal data platforms', pt: 'Construa plataformas de dados internas' },
    description: { es: 'Aprende a construir y operar plataformas de datos self-service. Esta especialización cubre Data Mesh, Internal Developer Platforms, y cómo crear herramientas que multiplican la productividad de todo el equipo de datos.', en: 'Learn to build and operate self-service data platforms. This specialization covers Data Mesh, Internal Developer Platforms, and how to create tools that multiply the productivity of the entire data team.', pt: 'Aprenda a construir e operar plataformas de dados self-service. Esta especialização cobre Data Mesh, Internal Developer Platforms e como criar ferramentas que multiplicam a produtividade de toda a equipe de dados.' },
    icon: '🏗️',
    color: 'cyan',
    status: 'coming_soon',
    releaseDate: 'Junio 2026',
    prerequisites: ['level-3'],
    duration: '6-8 semanas',
    skills: [
      { es: 'Data Mesh principles', en: 'Data Mesh principles', pt: 'Princípios de Data Mesh' },
      { es: 'Self-service data platforms', en: 'Self-service data platforms', pt: 'Plataformas de dados self-service' },
      { es: 'Data Contracts', en: 'Data Contracts', pt: 'Contratos de Dados' },
      { es: 'Internal Developer Portals (Backstage)', en: 'Internal Developer Portals (Backstage)', pt: 'Portais de Desenvolvedor Internos (Backstage)' },
      { es: 'Data Catalog (DataHub, Amundsen)', en: 'Data Catalog (DataHub, Amundsen)', pt: 'Catálogo de Dados (DataHub, Amundsen)' },
      { es: 'Cost management & FinOps', en: 'Cost management & FinOps', pt: 'Gestão de Custos & FinOps' },
      { es: 'Multi-tenancy', en: 'Multi-tenancy', pt: 'Multi-tenancy' },
      { es: 'Platform as a Product', en: 'Platform as a Product', pt: 'Plataforma como Produto' }
    ],
    projects: 4
  },
  // BONUS: ML Engineering (popular pero no en el top 6 del usuario)
  {
    id: 'spec-ml-engineering',
    title: { es: 'Especialización en ML Engineering', en: 'ML Engineering Specialization', pt: 'Especialização em ML Engineering' },
    subtitle: { es: 'De Data Engineer a ML Engineer', en: 'From Data Engineer to ML Engineer', pt: 'De Data Engineer a ML Engineer' },
    description: { es: 'Expande tu skillset hacia Machine Learning Engineering. Aprenderás a construir y operar pipelines de ML en producción, feature stores, model serving, y MLOps. Ideal para Data Engineers que quieren trabajar más cerca de los equipos de Data Science.', en: 'Expand your skillset towards Machine Learning Engineering. You will learn to build and operate ML pipelines in production, feature stores, model serving, and MLOps. Ideal for Data Engineers who want to work closer to Data Science teams.', pt: 'Expanda seu skillset para Machine Learning Engineering. Você aprenderá a construir e operar pipelines de ML em produção, feature stores, model serving e MLOps. Ideal para Data Engineers que desejam trabalhar mais perto das equipes de Data Science.' },
    icon: '🤖',
    color: 'violet',
    status: 'coming_soon',
    releaseDate: 'Julio 2026',
    prerequisites: ['level-3'],
    duration: '8-10 semanas',
    skills: [
      { es: 'Feature Engineering a escala', en: 'Feature Engineering at scale', pt: 'Feature Engineering em escala' },
      { es: 'Feature Stores (Feast, Tecton)', en: 'Feature Stores (Feast, Tecton)', pt: 'Feature Stores (Feast, Tecton)' },
      { es: 'MLflow & Experiment Tracking', en: 'MLflow & Experiment Tracking', pt: 'MLflow & Rastreamento de Experimentos' },
      { es: 'Model Serving (Seldon, KServe)', en: 'Model Serving (Seldon, KServe)', pt: 'Model Serving (Seldon, KServe)' },
      { es: 'Data Versioning (DVC)', en: 'Data Versioning (DVC)', pt: 'Versionamento de Dados (DVC)' },
      { es: 'ML Pipelines (Kubeflow, Vertex AI)', en: 'ML Pipelines (Kubeflow, Vertex AI)', pt: 'Pipelines de ML (Kubeflow, Vertex AI)' },
      { es: 'A/B Testing para ML', en: 'A/B Testing for ML', pt: 'Testes A/B para ML' },
      { es: 'Monitoring de modelos (drift detection)', en: 'Model monitoring (drift detection)', pt: 'Monitoramento de modelos (detecção de drift)' }
    ],
    projects: 5
  },
  // BONUS: Data Governance (importante pero más de nicho)
  {
    id: 'spec-data-governance',
    title: { es: 'Especialización en Data Governance & Quality', en: 'Data Governance & Quality Specialization', pt: 'Especialização em Data Governance & Quality' },
    subtitle: { es: 'Calidad, compliance y confianza en los datos', en: 'Quality, compliance and trust in data', pt: 'Qualidade, compliance e confiança nos dados' },
    description: { es: 'Especialízate en Data Governance, Quality y Compliance. Aprenderás a implementar frameworks de calidad de datos, data lineage, catalogación, y cumplimiento regulatorio (GDPR, CCPA, SOX).', en: 'Specialize in Data Governance, Quality and Compliance. You will learn to implement data quality frameworks, data lineage, cataloging, and regulatory compliance (GDPR, CCPA, SOX).', pt: 'Especialize-se em Data Governance, Quality e Compliance. Você aprenderá a implementar frameworks de qualidade de dados, linhagem de dados, catalogação e conformidade regulatória (GDPR, CCPA, SOX).' },
    icon: '🛡️',
    color: 'emerald',
    status: 'coming_soon',
    releaseDate: 'Agosto 2026',
    prerequisites: ['level-2'],
    duration: '4-6 semanas',
    skills: [
      { es: 'Data Quality frameworks', en: 'Data Quality frameworks', pt: 'Frameworks de Data Quality' },
      { es: 'Great Expectations avanzado', en: 'Advanced Great Expectations', pt: 'Great Expectations avançado' },
      { es: 'Data Lineage (OpenLineage)', en: 'Data Lineage (OpenLineage)', pt: 'Data Lineage (OpenLineage)' },
      { es: 'Data Catalog implementation', en: 'Data Catalog implementation', pt: 'Implementação de Data Catalog' },
      { es: 'GDPR/CCPA compliance', en: 'GDPR/CCPA compliance', pt: 'Conformidade GDPR/CCPA' },
      { es: 'PII detection & masking', en: 'PII detection & masking', pt: 'Detecção e mascaramento de PII' },
      { es: 'Data access controls', en: 'Data access controls', pt: 'Controles de acesso a dados' },
      { es: 'Audit trails', en: 'Audit trails', pt: 'Trilhas de auditoria' }
    ],
    projects: 3
  }
];
