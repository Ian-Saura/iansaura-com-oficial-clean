import { DatabricksProject } from './types';

/**
 * Proyectos prácticos de la especialización Databricks
 * 5 proyectos completos con múltiples pasos
 * 
 * ACTUALIZADO: Enero 2026 - Compatible con Free Edition
 * - Todos los proyectos usan serverless compute
 * - Unity Catalog y DLT ahora disponibles gratis
 * - Solo Python y SQL (no R/Scala)
 */
export const ALL_DATABRICKS_PROJECTS: DatabricksProject[] = [
  // =====================================================
  // PROYECTO 0: PySpark Fundamentals (PRINCIPIANTE - Fases 1-4)
  // =====================================================
  {
    id: 'db-proj-0',
    name: {
      es: 'Fundamentos de PySpark en Databricks',
      en: 'PySpark Fundamentals in Databricks',
      pt: 'Fundamentos de PySpark no Databricks'
    },
    description: {
      es: 'Tu primer proyecto en Databricks. Aprende a crear notebooks, procesar datos con PySpark y escribir queries SQL sobre DataFrames.',
      en: 'Your first project in Databricks. Learn to create notebooks, process data with PySpark and write SQL queries on DataFrames.',
      pt: 'Seu primeiro projeto no Databricks. Aprenda a criar notebooks, processar dados com PySpark e escrever queries SQL em DataFrames.'
    },
    steps: [
      {
        id: 'db-proj-0-step-1',
        name: { es: 'Crear cuenta gratuita', en: 'Create free account', pt: 'Criar conta gratuita' },
        description: { es: 'Registrate en Databricks Free Edition. El compute serverless se activa automáticamente.', en: 'Sign up for Databricks Free Edition. Serverless compute activates automatically.', pt: 'Registre-se no Databricks Free Edition. O compute serverless ativa automaticamente.' },
        theory: { es: 'Free Edition incluye serverless compute, Unity Catalog básico, DLT y Databricks Assistant gratis.', en: 'Free Edition includes serverless compute, basic Unity Catalog, DLT and Databricks Assistant for free.', pt: 'Free Edition inclui serverless compute, Unity Catalog básico, DLT e Databricks Assistant grátis.' },
        resources: [{ name: { es: 'Databricks Free Edition', en: 'Databricks Free Edition', pt: 'Databricks Free Edition' }, url: 'https://www.databricks.com/try-databricks-free' }]
      },
      {
        id: 'db-proj-0-step-2',
        name: { es: 'Crear DataFrame desde datos', en: 'Create DataFrame from data', pt: 'Criar DataFrame a partir de dados' },
        description: { es: 'Usa el dataset de E-commerce de la Academia para crear tu primer DataFrame.', en: 'Use the Academy E-commerce dataset to create your first DataFrame.', pt: 'Use o dataset de E-commerce da Academia para criar seu primeiro DataFrame.' },
        theory: { es: 'Un DataFrame es una tabla distribuida en memoria.', en: 'A DataFrame is a distributed table in memory.', pt: 'Um DataFrame é uma tabela distribuída em memória.' }
      },
      {
        id: 'db-proj-0-step-3',
        name: { es: 'Transformaciones básicas', en: 'Basic transformations', pt: 'Transformações básicas' },
        description: { es: 'Aplica select, filter, groupBy y orderBy sobre los datos.', en: 'Apply select, filter, groupBy and orderBy on the data.', pt: 'Aplique select, filter, groupBy e orderBy nos dados.' },
        theory: { es: 'Las transformaciones son lazy - se ejecutan cuando hay una acción.', en: 'Transformations are lazy - they execute when there is an action.', pt: 'Transformações são lazy - executam quando há uma ação.' }
      },
      {
        id: 'db-proj-0-step-4',
        name: { es: 'Joins entre DataFrames', en: 'DataFrame Joins', pt: 'Joins entre DataFrames' },
        description: { es: 'Une orders con products y customers para análisis completo.', en: 'Join orders with products and customers for complete analysis.', pt: 'Una orders com products e customers para análise completa.' },
        theory: { es: 'Spark soporta inner, left, right, full y cross joins.', en: 'Spark supports inner, left, right, full and cross joins.', pt: 'Spark suporta inner, left, right, full e cross joins.' }
      },
      {
        id: 'db-proj-0-step-5',
        name: { es: 'Agregaciones y métricas', en: 'Aggregations and metrics', pt: 'Agregações e métricas' },
        description: { es: 'Calcula ventas por categoría, productos top y clientes frecuentes.', en: 'Calculate sales by category, top products and frequent customers.', pt: 'Calcule vendas por categoria, produtos top e clientes frequentes.' },
        theory: { es: 'groupBy + agg permite cálculos complejos como sum, avg, count.', en: 'groupBy + agg allows complex calculations like sum, avg, count.', pt: 'groupBy + agg permite cálculos complexos como sum, avg, count.' }
      },
      {
        id: 'db-proj-0-step-6',
        name: { es: 'Spark SQL', en: 'Spark SQL', pt: 'Spark SQL' },
        description: { es: 'Crea vistas temporales y escribe las mismas queries en SQL.', en: 'Create temporary views and write the same queries in SQL.', pt: 'Crie views temporárias e escreva as mesmas queries em SQL.' },
        theory: { es: 'Spark SQL permite usar SQL estándar sobre DataFrames.', en: 'Spark SQL allows using standard SQL on DataFrames.', pt: 'Spark SQL permite usar SQL padrão em DataFrames.' }
      }
    ],
    difficulty: 'easy',
    technologies: ['Databricks', 'PySpark', 'Spark SQL', 'DataFrames'],
    datasetId: 'ecommerce',
    phases: [1, 2, 3, 4],
    exercisesLink: '/miembros?tab=practica&filter=spark',
    examLink: '/miembros?tab=entrevistas&filter=databricks'
  },

  // =====================================================
  // PROYECTO 1: Lakehouse de E-commerce (INTERMEDIO - Fases 5-8)
  // =====================================================
  {
    id: 'db-proj-1',
    name: {
      es: 'Lakehouse de E-commerce',
      en: 'E-commerce Lakehouse',
      pt: 'Lakehouse de E-commerce'
    },
    description: {
      es: 'Diseña e implementa un Lakehouse completo para una tienda de e-commerce usando la arquitectura Medallion (Bronze, Silver, Gold).',
      en: 'Design and implement a complete Lakehouse for an e-commerce store using Medallion architecture (Bronze, Silver, Gold).',
      pt: 'Projete e implemente um Lakehouse completo para uma loja de e-commerce usando arquitetura Medallion (Bronze, Silver, Gold).'
    },
    steps: [
      {
        id: 'db-proj-1-step-1',
        name: {
          es: 'Configurar Unity Catalog',
          en: 'Configure Unity Catalog',
          pt: 'Configurar Unity Catalog'
        },
        description: {
          es: 'Crea un catálogo, schema y external location para el proyecto.',
          en: 'Create a catalog, schema and external location for the project.',
          pt: 'Crie um catálogo, schema e external location para o projeto.'
        },
        theory: {
          es: 'Unity Catalog proporciona gobernanza unificada para todos los assets de datos en Databricks.',
          en: 'Unity Catalog provides unified governance for all data assets in Databricks.',
          pt: 'Unity Catalog fornece governança unificada para todos os ativos de dados no Databricks.'
        },
        resources: [
          { 
            name: { es: 'Guía de Unity Catalog', en: 'Unity Catalog Guide', pt: 'Guia do Unity Catalog' }, 
            url: 'https://docs.databricks.com/data-governance/unity-catalog/index.html' 
          }
        ]
      },
      {
        id: 'db-proj-1-step-2',
        name: {
          es: 'Crear capa Bronze - Ingesta raw',
          en: 'Create Bronze layer - Raw ingestion',
          pt: 'Criar camada Bronze - Ingestão raw'
        },
        description: {
          es: 'Ingesta datos raw de orders, products y customers en tablas Delta Bronze.',
          en: 'Ingest raw data from orders, products and customers into Bronze Delta tables.',
          pt: 'Ingira dados raw de orders, products e customers em tabelas Delta Bronze.'
        },
        theory: {
          es: 'La capa Bronze contiene datos raw sin transformar, preservando el histórico completo.',
          en: 'Bronze layer contains raw untransformed data, preserving complete history.',
          pt: 'A camada Bronze contém dados raw sem transformar, preservando o histórico completo.'
        }
      },
      {
        id: 'db-proj-1-step-3',
        name: {
          es: 'Crear capa Silver - Limpieza',
          en: 'Create Silver layer - Cleaning',
          pt: 'Criar camada Silver - Limpeza'
        },
        description: {
          es: 'Limpia y transforma datos: deduplica, normaliza fechas, valida tipos.',
          en: 'Clean and transform data: deduplicate, normalize dates, validate types.',
          pt: 'Limpe e transforme dados: deduplique, normalize datas, valide tipos.'
        },
        theory: {
          es: 'La capa Silver contiene datos limpios, conformados y listos para análisis.',
          en: 'Silver layer contains clean, conformed data ready for analysis.',
          pt: 'A camada Silver contém dados limpos, conformados e prontos para análise.'
        }
      },
      {
        id: 'db-proj-1-step-4',
        name: {
          es: 'Crear capa Gold - Agregaciones',
          en: 'Create Gold layer - Aggregations',
          pt: 'Criar camada Gold - Agregações'
        },
        description: {
          es: 'Crea tablas de hechos y dimensiones para reporting: ventas_diarias, productos_top, clientes_activos.',
          en: 'Create fact and dimension tables for reporting: daily_sales, top_products, active_customers.',
          pt: 'Crie tabelas de fatos e dimensões para reporting: vendas_diarias, produtos_top, clientes_ativos.'
        },
        theory: {
          es: 'La capa Gold contiene datos agregados y modelados para consumo por BI y analytics.',
          en: 'Gold layer contains aggregated, modeled data for BI and analytics consumption.',
          pt: 'A camada Gold contém dados agregados e modelados para consumo por BI e analytics.'
        }
      },
      {
        id: 'db-proj-1-step-5',
        name: {
          es: 'Implementar Delta Live Tables',
          en: 'Implement Delta Live Tables',
          pt: 'Implementar Delta Live Tables'
        },
        description: {
          es: 'Convierte el pipeline a DLT con expectations y monitoreo automático.',
          en: 'Convert the pipeline to DLT with expectations and automatic monitoring.',
          pt: 'Converta o pipeline para DLT com expectations e monitoramento automático.'
        },
        theory: {
          es: 'DLT simplifica la creación de pipelines ETL con gestión automática de dependencias.',
          en: 'DLT simplifies ETL pipeline creation with automatic dependency management.',
          pt: 'DLT simplifica a criação de pipelines ETL com gestão automática de dependências.'
        }
      },
      {
        id: 'db-proj-1-step-6',
        name: {
          es: 'Crear dashboards en Databricks SQL',
          en: 'Create dashboards in Databricks SQL',
          pt: 'Criar dashboards em Databricks SQL'
        },
        description: {
          es: 'Diseña visualizaciones para métricas de negocio: revenue, conversión, productos.',
          en: 'Design visualizations for business metrics: revenue, conversion, products.',
          pt: 'Projete visualizações para métricas de negócio: revenue, conversão, produtos.'
        }
      }
    ],
    difficulty: 'hard',
    technologies: ['Databricks', 'Delta Lake', 'Unity Catalog', 'DLT', 'Spark SQL', 'Databricks SQL'],
    datasetId: 'ecommerce',
    phases: [5, 6, 7, 8],
    exercisesLink: '/miembros?tab=practica&filter=delta',
    examLink: '/miembros?tab=entrevistas&filter=databricks'
  },

  // =====================================================
  // PROYECTO 2: Pipeline de ML con MLflow (AVANZADO - Fases 9-12)
  // =====================================================
  {
    id: 'db-proj-2',
    name: {
      es: 'Pipeline de ML para predicción de churn',
      en: 'ML Pipeline for churn prediction',
      pt: 'Pipeline de ML para predição de churn'
    },
    description: {
      es: 'Construye un pipeline de Machine Learning completo usando MLflow para predecir abandono de clientes.',
      en: 'Build a complete Machine Learning pipeline using MLflow to predict customer churn.',
      pt: 'Construa um pipeline de Machine Learning completo usando MLflow para prever abandono de clientes.'
    },
    steps: [
      {
        id: 'db-proj-2-step-1',
        name: {
          es: 'Feature Engineering con Spark',
          en: 'Feature Engineering with Spark',
          pt: 'Feature Engineering com Spark'
        },
        description: {
          es: 'Crea features a partir de datos transaccionales: recency, frequency, monetary (RFM).',
          en: 'Create features from transactional data: recency, frequency, monetary (RFM).',
          pt: 'Crie features a partir de dados transacionais: recency, frequency, monetary (RFM).'
        },
        theory: {
          es: 'El feature engineering en Spark permite procesar grandes volúmenes de datos eficientemente.',
          en: 'Feature engineering in Spark allows efficient processing of large data volumes.',
          pt: 'Feature engineering no Spark permite processar grandes volumes de dados eficientemente.'
        },
        resources: [
          {
            name: { es: 'MLlib - Feature Engineering', en: 'MLlib - Feature Engineering', pt: 'MLlib - Feature Engineering' },
            url: 'https://spark.apache.org/docs/latest/ml-features.html'
          }
        ]
      },
      {
        id: 'db-proj-2-step-2',
        name: {
          es: 'Configurar MLflow Experiment',
          en: 'Configure MLflow Experiment',
          pt: 'Configurar MLflow Experiment'
        },
        description: {
          es: 'Crea un experimento MLflow y configura logging automático.',
          en: 'Create an MLflow experiment and configure automatic logging.',
          pt: 'Crie um experimento MLflow e configure logging automático.'
        },
        theory: {
          es: 'MLflow Tracking registra parámetros, métricas y artefactos de cada run.',
          en: 'MLflow Tracking records parameters, metrics and artifacts from each run.',
          pt: 'MLflow Tracking registra parâmetros, métricas e artefatos de cada run.'
        }
      },
      {
        id: 'db-proj-2-step-3',
        name: {
          es: 'Entrenar modelos con AutoML',
          en: 'Train models with AutoML',
          pt: 'Treinar modelos com AutoML'
        },
        description: {
          es: 'Usa Databricks AutoML para generar un baseline y comparar algoritmos.',
          en: 'Use Databricks AutoML to generate a baseline and compare algorithms.',
          pt: 'Use Databricks AutoML para gerar um baseline e comparar algoritmos.'
        },
        theory: {
          es: 'AutoML automatiza la selección de modelos, hiperparámetros y feature engineering.',
          en: 'AutoML automates model selection, hyperparameters and feature engineering.',
          pt: 'AutoML automatiza a seleção de modelos, hiperparâmetros e feature engineering.'
        }
      },
      {
        id: 'db-proj-2-step-4',
        name: {
          es: 'Registrar modelo en Model Registry',
          en: 'Register model in Model Registry',
          pt: 'Registrar modelo no Model Registry'
        },
        description: {
          es: 'Registra el mejor modelo y gestiona transiciones entre stages.',
          en: 'Register the best model and manage transitions between stages.',
          pt: 'Registre o melhor modelo e gerencie transições entre stages.'
        },
        theory: {
          es: 'Model Registry centraliza la gestión de versiones y el ciclo de vida de modelos.',
          en: 'Model Registry centralizes version management and model lifecycle.',
          pt: 'Model Registry centraliza a gestão de versões e o ciclo de vida de modelos.'
        }
      },
      {
        id: 'db-proj-2-step-5',
        name: {
          es: 'Deploy como Endpoint REST',
          en: 'Deploy as REST Endpoint',
          pt: 'Deploy como Endpoint REST'
        },
        description: {
          es: 'Despliega el modelo como endpoint REST usando Model Serving.',
          en: 'Deploy the model as a REST endpoint using Model Serving.',
          pt: 'Implemente o modelo como endpoint REST usando Model Serving.'
        },
        theory: {
          es: 'Model Serving permite inferencia en tiempo real con escalado automático.',
          en: 'Model Serving enables real-time inference with automatic scaling.',
          pt: 'Model Serving permite inferência em tempo real com escalado automático.'
        }
      }
    ],
    difficulty: 'hard',
    technologies: ['Databricks', 'MLflow', 'AutoML', 'Model Serving', 'PySpark ML'],
    datasetId: 'streaming',
    phases: [9, 10, 11, 12],
    exercisesLink: '/miembros?tab=practica&filter=spark',
    examLink: '/miembros?tab=entrevistas&filter=databricks'
  },

  // =====================================================
  // PROYECTO 3: Streaming de IoT
  // =====================================================
  {
    id: 'db-proj-3',
    name: {
      es: 'Pipeline de Streaming para datos IoT',
      en: 'Streaming Pipeline for IoT data',
      pt: 'Pipeline de Streaming para dados IoT'
    },
    description: {
      es: 'Procesa datos de sensores IoT en tiempo real con Structured Streaming y Delta Lake.',
      en: 'Process IoT sensor data in real-time with Structured Streaming and Delta Lake.',
      pt: 'Processe dados de sensores IoT em tempo real com Structured Streaming e Delta Lake.'
    },
    steps: [
      {
        id: 'db-proj-3-step-1',
        name: {
          es: 'Configurar fuente de streaming',
          en: 'Configure streaming source',
          pt: 'Configurar fonte de streaming'
        },
        description: {
          es: 'Simula un stream de datos IoT usando Auto Loader o Kafka.',
          en: 'Simulate an IoT data stream using Auto Loader or Kafka.',
          pt: 'Simule um stream de dados IoT usando Auto Loader ou Kafka.'
        },
        theory: {
          es: 'Auto Loader procesa archivos incrementalmente a medida que llegan al cloud storage.',
          en: 'Auto Loader processes files incrementally as they arrive in cloud storage.',
          pt: 'Auto Loader processa arquivos incrementalmente conforme chegam ao cloud storage.'
        },
        resources: [
          {
            name: { es: 'Auto Loader Docs', en: 'Auto Loader Docs', pt: 'Docs do Auto Loader' },
            url: 'https://docs.databricks.com/ingestion/auto-loader/index.html'
          }
        ]
      },
      {
        id: 'db-proj-3-step-2',
        name: {
          es: 'Transformaciones en streaming',
          en: 'Streaming transformations',
          pt: 'Transformações em streaming'
        },
        description: {
          es: 'Aplica transformaciones: parsing JSON, filtrado de anomalías, windowed aggregations.',
          en: 'Apply transformations: JSON parsing, anomaly filtering, windowed aggregations.',
          pt: 'Aplique transformações: parsing JSON, filtragem de anomalias, windowed aggregations.'
        },
        theory: {
          es: 'Structured Streaming usa el mismo API de DataFrame para batch y streaming.',
          en: 'Structured Streaming uses the same DataFrame API for batch and streaming.',
          pt: 'Structured Streaming usa a mesma API de DataFrame para batch e streaming.'
        }
      },
      {
        id: 'db-proj-3-step-3',
        name: {
          es: 'Sink a Delta Lake',
          en: 'Sink to Delta Lake',
          pt: 'Sink para Delta Lake'
        },
        description: {
          es: 'Escribe el stream a tablas Delta con checkpointing y exactly-once semantics.',
          en: 'Write the stream to Delta tables with checkpointing and exactly-once semantics.',
          pt: 'Escreva o stream para tabelas Delta com checkpointing e exactly-once semantics.'
        },
        theory: {
          es: 'Delta Lake garantiza exactly-once processing incluso ante fallos.',
          en: 'Delta Lake guarantees exactly-once processing even in case of failures.',
          pt: 'Delta Lake garante exactly-once processing mesmo em caso de falhas.'
        }
      },
      {
        id: 'db-proj-3-step-4',
        name: {
          es: 'Alertas en tiempo real',
          en: 'Real-time alerts',
          pt: 'Alertas em tempo real'
        },
        description: {
          es: 'Implementa lógica de alertas cuando métricas superan umbrales.',
          en: 'Implement alert logic when metrics exceed thresholds.',
          pt: 'Implemente lógica de alertas quando métricas excedem limites.'
        }
      },
      {
        id: 'db-proj-3-step-5',
        name: {
          es: 'Monitoreo del stream',
          en: 'Stream monitoring',
          pt: 'Monitoramento do stream'
        },
        description: {
          es: 'Configura métricas de Spark Streaming UI y alertas de latencia.',
          en: 'Configure Spark Streaming UI metrics and latency alerts.',
          pt: 'Configure métricas de Spark Streaming UI e alertas de latência.'
        }
      }
    ],
    difficulty: 'hard',
    technologies: ['Databricks', 'Structured Streaming', 'Delta Lake', 'Auto Loader', 'Kafka'],
    datasetId: 'iot',
    phases: [4, 5, 7],
    exercisesLink: '/miembros?tab=practica&filter=spark',
    examLink: '/miembros?tab=entrevistas&filter=databricks'
  },

  // =====================================================
  // PROYECTO 4: Data Warehouse moderno
  // =====================================================
  {
    id: 'db-proj-4',
    name: {
      es: 'Data Warehouse Moderno con Databricks SQL',
      en: 'Modern Data Warehouse with Databricks SQL',
      pt: 'Data Warehouse Moderno com Databricks SQL'
    },
    description: {
      es: 'Construye un Data Warehouse moderno usando Databricks SQL, con modelado dimensional y queries optimizados.',
      en: 'Build a modern Data Warehouse using Databricks SQL, with dimensional modeling and optimized queries.',
      pt: 'Construa um Data Warehouse moderno usando Databricks SQL, com modelagem dimensional e queries otimizados.'
    },
    steps: [
      {
        id: 'db-proj-4-step-1',
        name: {
          es: 'Diseñar modelo dimensional',
          en: 'Design dimensional model',
          pt: 'Projetar modelo dimensional'
        },
        description: {
          es: 'Diseña un star schema con fact_ventas y dimensiones: dim_producto, dim_cliente, dim_tiempo.',
          en: 'Design a star schema with fact_sales and dimensions: dim_product, dim_customer, dim_time.',
          pt: 'Projete um star schema com fact_vendas e dimensões: dim_produto, dim_cliente, dim_tempo.'
        },
        theory: {
          es: 'El modelo dimensional optimiza las consultas analíticas con esquemas denormalizados.',
          en: 'Dimensional modeling optimizes analytical queries with denormalized schemas.',
          pt: 'O modelo dimensional otimiza consultas analíticas com esquemas desnormalizados.'
        }
      },
      {
        id: 'db-proj-4-step-2',
        name: {
          es: 'Crear SQL Warehouse',
          en: 'Create SQL Warehouse',
          pt: 'Criar SQL Warehouse'
        },
        description: {
          es: 'Configura un SQL Warehouse con sizing apropiado y auto-scaling.',
          en: 'Configure a SQL Warehouse with appropriate sizing and auto-scaling.',
          pt: 'Configure um SQL Warehouse com sizing apropriado e auto-scaling.'
        },
        theory: {
          es: 'SQL Warehouse proporciona compute serverless optimizado para queries SQL.',
          en: 'SQL Warehouse provides serverless compute optimized for SQL queries.',
          pt: 'SQL Warehouse fornece compute serverless otimizado para queries SQL.'
        }
      },
      {
        id: 'db-proj-4-step-3',
        name: {
          es: 'Implementar SCD Type 2',
          en: 'Implement SCD Type 2',
          pt: 'Implementar SCD Type 2'
        },
        description: {
          es: 'Implementa Slowly Changing Dimensions Type 2 para rastrear cambios históricos.',
          en: 'Implement Slowly Changing Dimensions Type 2 to track historical changes.',
          pt: 'Implemente Slowly Changing Dimensions Type 2 para rastrear mudanças históricas.'
        },
        theory: {
          es: 'SCD Type 2 mantiene el historial completo de cambios en dimensiones.',
          en: 'SCD Type 2 maintains complete history of changes in dimensions.',
          pt: 'SCD Type 2 mantém o histórico completo de mudanças em dimensões.'
        }
      },
      {
        id: 'db-proj-4-step-4',
        name: {
          es: 'Optimizar rendimiento',
          en: 'Optimize performance',
          pt: 'Otimizar desempenho'
        },
        description: {
          es: 'Aplica Z-ORDER, OPTIMIZE, y liquid clustering para mejorar performance.',
          en: 'Apply Z-ORDER, OPTIMIZE, and liquid clustering to improve performance.',
          pt: 'Aplique Z-ORDER, OPTIMIZE, e liquid clustering para melhorar performance.'
        }
      },
      {
        id: 'db-proj-4-step-5',
        name: {
          es: 'Crear dashboards analíticos',
          en: 'Create analytical dashboards',
          pt: 'Criar dashboards analíticos'
        },
        description: {
          es: 'Diseña dashboards interactivos con KPIs de negocio.',
          en: 'Design interactive dashboards with business KPIs.',
          pt: 'Projete dashboards interativos com KPIs de negócio.'
        }
      }
    ],
    difficulty: 'medium',
    technologies: ['Databricks SQL', 'Delta Lake', 'Unity Catalog', 'Star Schema'],
    datasetId: 'ecommerce',
    phases: [5, 6, 9],
    exercisesLink: '/miembros?tab=practica&filter=delta',
    examLink: '/miembros?tab=entrevistas&filter=databricks'
  },

  // =====================================================
  // PROYECTO 5: Certificación Practice
  // =====================================================
  {
    id: 'db-proj-5',
    name: {
      es: 'Práctica para Certificación DE Associate',
      en: 'Certification Practice - DE Associate',
      pt: 'Prática para Certificação DE Associate'
    },
    description: {
      es: 'Proyecto integrador que cubre todos los temas del examen Databricks Certified Data Engineer Associate.',
      en: 'Integrative project covering all topics from Databricks Certified Data Engineer Associate exam.',
      pt: 'Projeto integrador que cobre todos os tópicos do exame Databricks Certified Data Engineer Associate.'
    },
    steps: [
      {
        id: 'db-proj-5-step-1',
        name: {
          es: 'Quiz: Fundamentos de Databricks',
          en: 'Quiz: Databricks Fundamentals',
          pt: 'Quiz: Fundamentos do Databricks'
        },
        description: {
          es: 'Responde preguntas sobre arquitectura, clusters, notebooks y runtime.',
          en: 'Answer questions about architecture, clusters, notebooks and runtime.',
          pt: 'Responda perguntas sobre arquitetura, clusters, notebooks e runtime.'
        }
      },
      {
        id: 'db-proj-5-step-2',
        name: {
          es: 'Quiz: Delta Lake',
          en: 'Quiz: Delta Lake',
          pt: 'Quiz: Delta Lake'
        },
        description: {
          es: 'Preguntas sobre ACID, Time Travel, MERGE, OPTIMIZE, VACUUM.',
          en: 'Questions about ACID, Time Travel, MERGE, OPTIMIZE, VACUUM.',
          pt: 'Perguntas sobre ACID, Time Travel, MERGE, OPTIMIZE, VACUUM.'
        }
      },
      {
        id: 'db-proj-5-step-3',
        name: {
          es: 'Quiz: ELT con Spark SQL',
          en: 'Quiz: ELT with Spark SQL',
          pt: 'Quiz: ELT com Spark SQL'
        },
        description: {
          es: 'Transformaciones SQL, CTEs, Window Functions, Higher-Order Functions.',
          en: 'SQL transformations, CTEs, Window Functions, Higher-Order Functions.',
          pt: 'Transformações SQL, CTEs, Window Functions, Higher-Order Functions.'
        }
      },
      {
        id: 'db-proj-5-step-4',
        name: {
          es: 'Quiz: Incremental Processing',
          en: 'Quiz: Incremental Processing',
          pt: 'Quiz: Processamento Incremental'
        },
        description: {
          es: 'Streaming, Auto Loader, COPY INTO, Change Data Feed.',
          en: 'Streaming, Auto Loader, COPY INTO, Change Data Feed.',
          pt: 'Streaming, Auto Loader, COPY INTO, Change Data Feed.'
        }
      },
      {
        id: 'db-proj-5-step-5',
        name: {
          es: 'Quiz: Production Pipelines',
          en: 'Quiz: Production Pipelines',
          pt: 'Quiz: Pipelines de Produção'
        },
        description: {
          es: 'Jobs, DLT, Repos, scheduling, monitoreo.',
          en: 'Jobs, DLT, Repos, scheduling, monitoring.',
          pt: 'Jobs, DLT, Repos, scheduling, monitoramento.'
        }
      },
      {
        id: 'db-proj-5-step-6',
        name: {
          es: 'Quiz: Data Governance',
          en: 'Quiz: Data Governance',
          pt: 'Quiz: Governança de Dados'
        },
        description: {
          es: 'Unity Catalog, permisos, lineage, data masking.',
          en: 'Unity Catalog, permissions, lineage, data masking.',
          pt: 'Unity Catalog, permissões, lineage, data masking.'
        }
      },
      {
        id: 'db-proj-5-step-7',
        name: {
          es: 'Examen de práctica completo',
          en: 'Full practice exam',
          pt: 'Exame de prática completo'
        },
        description: {
          es: '45 preguntas tipo examen con tiempo límite de 90 minutos.',
          en: '45 exam-style questions with 90 minute time limit.',
          pt: '45 perguntas tipo exame com limite de tempo de 90 minutos.'
        },
        resources: [
          {
            name: { es: 'Examen Oficial', en: 'Official Exam', pt: 'Exame Oficial' },
            url: 'https://www.databricks.com/learn/certification/data-engineer-associate'
          }
        ]
      }
    ],
    difficulty: 'medium',
    technologies: ['Databricks', 'Delta Lake', 'Spark SQL', 'Unity Catalog', 'DLT', 'Jobs'],
    phases: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    exercisesLink: '/miembros?tab=practica&filter=spark',
    examLink: '/miembros?tab=entrevistas&filter=databricks'
  }
];

// Estadísticas de proyectos
export const PROJECT_STATS = {
  total: ALL_DATABRICKS_PROJECTS.length,
  totalSteps: ALL_DATABRICKS_PROJECTS.reduce((acc, p) => acc + p.steps.length, 0),
  byDifficulty: {
    easy: ALL_DATABRICKS_PROJECTS.filter(p => p.difficulty === 'easy').length,
    medium: ALL_DATABRICKS_PROJECTS.filter(p => p.difficulty === 'medium').length,
    hard: ALL_DATABRICKS_PROJECTS.filter(p => p.difficulty === 'hard').length
  }
};
