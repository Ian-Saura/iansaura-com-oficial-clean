/**
 * DATABRICKS SPECIALIZATION
 * ========================
 * 
 * Especialización completa de Databricks para la Academia de Ian Saura
 * 
 * Estructura:
 * - 12 Fases (100+ pasos)
 * - 20 Ejercicios prácticos
 * - 5 Proyectos completos
 * - Recursos externos verificados
 * 
 * Contenido trilingüe: ES, EN, PT
 */

import { DatabricksSpecialization } from './types';
import { ALL_DATABRICKS_PHASES, PHASE_STATS } from './phases';
import { ALL_DATABRICKS_EXERCISES, EXERCISE_STATS } from './exercises';
import { ALL_DATABRICKS_PROJECTS, PROJECT_STATS } from './projects';
import { DATABRICKS_RESOURCES, STARTER_RESOURCES, RESOURCE_STATS } from './resources';
import { ALL_DATABRICKS_LABS, LABS_STATS } from './labs';

/**
 * Especialización completa de Databricks
 */
export const DATABRICKS_SPECIALIZATION: DatabricksSpecialization = {
  id: 'databricks',
  name: {
    es: 'Databricks Data Engineer',
    en: 'Databricks Data Engineer',
    pt: 'Databricks Data Engineer'
  },
  description: {
    es: 'Domina Databricks desde cero hasta la certificación. Incluye Lakehouse, Delta Lake, Spark, Unity Catalog, DLT, MLflow y preparación para el examen DE Associate.',
    en: 'Master Databricks from zero to certification. Includes Lakehouse, Delta Lake, Spark, Unity Catalog, DLT, MLflow and DE Associate exam preparation.',
    pt: 'Domine Databricks do zero à certificação. Inclui Lakehouse, Delta Lake, Spark, Unity Catalog, DLT, MLflow e preparação para o exame DE Associate.'
  },
  icon: '🔶',
  banner: '/images/specializations/databricks-banner.jpg',
  isNew: true,
  isComingSoon: false,
  phases: ALL_DATABRICKS_PHASES,
  exercises: ALL_DATABRICKS_EXERCISES,
  projects: ALL_DATABRICKS_PROJECTS
};

/**
 * Estadísticas de la especialización
 */
export const DATABRICKS_STATS = {
  phases: PHASE_STATS.totalPhases,
  steps: PHASE_STATS.totalSteps,
  exercises: EXERCISE_STATS.total,
  projects: PROJECT_STATS.total,
  projectSteps: PROJECT_STATS.totalSteps,
  labs: LABS_STATS.total,
  labSteps: LABS_STATS.totalSteps,
  resources: RESOURCE_STATS.total,
  freeResources: RESOURCE_STATS.free,
  estimatedHours: Math.round(PHASE_STATS.totalSteps * 0.5 + LABS_STATS.totalMinutes / 60), // ~30 min por paso + tiempo de labs
  estimatedWeeks: Math.round(PHASE_STATS.totalSteps / 14) // ~2 pasos por día
};

/**
 * Información resumida para mostrar en el listado de especializaciones
 */
export const DATABRICKS_PREVIEW = {
  id: 'databricks',
  name: DATABRICKS_SPECIALIZATION.name,
  description: DATABRICKS_SPECIALIZATION.description,
  icon: '🔶',
  stats: {
    phases: DATABRICKS_STATS.phases,
    steps: DATABRICKS_STATS.steps,
    exercises: DATABRICKS_STATS.exercises,
    projects: DATABRICKS_STATS.projects,
    labs: DATABRICKS_STATS.labs
  },
  highlights: {
    es: [
      '✅ 12 fases con 100+ pasos detallados',
      '✅ PySpark, Delta Lake: practica en Community Edition (gratis)',
      '✅ Unity Catalog, DLT: teoría + labs de Databricks Academy',
      '✅ 5 notebooks descargables (.dbc) listos para importar',
      '✅ 🎯 Simulador de examen DE Associate (45 preguntas)',
      '✅ 🏆 Certificado verificable + Badge LinkedIn',
      '✅ 4 casos de uso con datasets de la Academia (E-commerce, Finanzas, IoT)',
      '✅ Trilingüe: ES, EN, PT'
    ],
    en: [
      '✅ 12 phases with 100+ detailed steps',
      '✅ PySpark, Delta Lake: practice in Community Edition (free)',
      '✅ Unity Catalog, DLT: theory + Databricks Academy labs',
      '✅ 5 downloadable notebooks (.dbc) ready to import',
      '✅ 🎯 DE Associate exam simulator (45 questions)',
      '✅ 🏆 Verifiable certificate + LinkedIn Badge',
      '✅ 4 use cases with Academy datasets (E-commerce, Finance, IoT)',
      '✅ Trilingual: ES, EN, PT'
    ],
    pt: [
      '✅ 12 fases com 100+ passos detalhados',
      '✅ PySpark, Delta Lake: pratique no Community Edition (grátis)',
      '✅ Unity Catalog, DLT: teoria + labs do Databricks Academy',
      '✅ 5 notebooks baixáveis (.dbc) prontos para importar',
      '✅ 🎯 Simulador de exame DE Associate (45 perguntas)',
      '✅ 🏆 Certificado verificável + Badge LinkedIn',
      '✅ 4 casos de uso com datasets da Academia (E-commerce, Finanças, IoT)',
      '✅ Trilíngue: ES, EN, PT'
    ]
  },
  technologies: [
    'Databricks',
    'Apache Spark',
    'Delta Lake',
    'Unity Catalog',
    'Delta Live Tables',
    'MLflow',
    'Structured Streaming',
    'SQL Warehouse'
  ],
  prerequisites: {
    es: [
      'Conocimientos básicos de SQL',
      'Fundamentos de Python',
      'Conceptos básicos de Data Engineering'
    ],
    en: [
      'Basic SQL knowledge',
      'Python fundamentals',
      'Basic Data Engineering concepts'
    ],
    pt: [
      'Conhecimentos básicos de SQL',
      'Fundamentos de Python',
      'Conceitos básicos de Data Engineering'
    ]
  },
  certification: {
    name: 'Databricks Certified Data Engineer Associate',
    cost: '$200 USD',
    duration: '90 min',
    questions: 45,
    passingScore: '70%',
    validity: '2 years'
  },
  // Certificado de la Academia al completar
  academyCertificate: {
    enabled: true,
    name: {
      es: 'Certificado de Especialización en Databricks',
      en: 'Databricks Specialization Certificate',
      pt: 'Certificado de Especialização em Databricks'
    },
    validatorUrl: '/certificados/validar',
    linkedInShareable: true,
    badge: {
      name: 'Databricks Data Engineer',
      image: '/images/badges/databricks-badge.svg',
      description: {
        es: 'Completó la especialización de Databricks Data Engineer',
        en: 'Completed the Databricks Data Engineer specialization',
        pt: 'Completou a especialização de Databricks Data Engineer'
      }
    }
  },
  // Notebooks descargables
  downloadableNotebooks: [
    {
      id: 'nb-spark-basics',
      name: { es: 'PySpark Fundamentos', en: 'PySpark Fundamentals', pt: 'PySpark Fundamentos' },
      description: { es: 'DataFrames, transformaciones, acciones', en: 'DataFrames, transformations, actions', pt: 'DataFrames, transformações, ações' },
      downloadUrl: '/notebooks/databricks/01-pyspark-fundamentals.dbc',
      phases: ['db-phase-3']
    },
    {
      id: 'nb-spark-advanced',
      name: { es: 'PySpark Avanzado', en: 'Advanced PySpark', pt: 'PySpark Avançado' },
      description: { es: 'Window functions, UDFs, optimización', en: 'Window functions, UDFs, optimization', pt: 'Window functions, UDFs, otimização' },
      downloadUrl: '/notebooks/databricks/02-pyspark-advanced.dbc',
      phases: ['db-phase-4']
    },
    {
      id: 'nb-delta-lake',
      name: { es: 'Delta Lake Completo', en: 'Complete Delta Lake', pt: 'Delta Lake Completo' },
      description: { es: 'ACID, Time Travel, MERGE, OPTIMIZE', en: 'ACID, Time Travel, MERGE, OPTIMIZE', pt: 'ACID, Time Travel, MERGE, OPTIMIZE' },
      downloadUrl: '/notebooks/databricks/03-delta-lake.dbc',
      phases: ['db-phase-5']
    },
    {
      id: 'nb-etl-project',
      name: { es: 'Proyecto ETL E-commerce', en: 'E-commerce ETL Project', pt: 'Projeto ETL E-commerce' },
      description: { es: 'Pipeline completo Bronze/Silver/Gold', en: 'Complete Bronze/Silver/Gold pipeline', pt: 'Pipeline completo Bronze/Silver/Gold' },
      downloadUrl: '/notebooks/databricks/04-etl-ecommerce-project.dbc',
      phases: ['db-phase-3', 'db-phase-5']
    },
    {
      id: 'nb-streaming',
      name: { es: 'Structured Streaming', en: 'Structured Streaming', pt: 'Structured Streaming' },
      description: { es: 'Procesamiento en tiempo real', en: 'Real-time processing', pt: 'Processamento em tempo real' },
      downloadUrl: '/notebooks/databricks/05-structured-streaming.dbc',
      phases: ['db-phase-4']
    }
  ],
  // Exam Simulator (redirige a entrevistas)
  examSimulator: {
    enabled: true,
    title: {
      es: '🎯 Simulador de Examen DE Associate',
      en: '🎯 DE Associate Exam Simulator',
      pt: '🎯 Simulador de Exame DE Associate'
    },
    description: {
      es: 'Practica con preguntas tipo examen real. 45 preguntas, 90 minutos.',
      en: 'Practice with real exam-style questions. 45 questions, 90 minutes.',
      pt: 'Pratique com perguntas tipo exame real. 45 perguntas, 90 minutos.'
    },
    redirectUrl: '/miembros?tab=entrevistas&filter=databricks',
    questionsCount: 45,
    timeMinutes: 90
  },
  // Casos de uso con datasets de la Academia
  realUseCases: [
    {
      id: 'uc-ecommerce',
      industry: 'E-commerce',
      title: { es: 'Análisis de Comercio Electrónico', en: 'E-commerce Analysis', pt: 'Análise de Comércio Eletrônico' },
      description: {
        es: 'Pipeline completo con el dataset de E-commerce de la Academia. Análisis de ventas, segmentación de clientes, métricas de productos.',
        en: 'Complete pipeline with the Academy E-commerce dataset. Sales analysis, customer segmentation, product metrics.',
        pt: 'Pipeline completo com o dataset de E-commerce da Academia. Análise de vendas, segmentação de clientes, métricas de produtos.'
      },
      technologies: ['PySpark', 'Delta Lake', 'SQL'],
      datasetId: 'ecommerce',
      datasetUrl: '/miembros?tab=datasets'
    },
    {
      id: 'uc-finanzas',
      industry: 'Fintech',
      title: { es: 'Sistema Bancario - Detección de Fraude', en: 'Banking System - Fraud Detection', pt: 'Sistema Bancário - Detecção de Fraude' },
      description: {
        es: 'Análisis de transacciones bancarias, scoring crediticio, detección de anomalías con el dataset de Finanzas.',
        en: 'Banking transaction analysis, credit scoring, anomaly detection with the Finance dataset.',
        pt: 'Análise de transações bancárias, scoring de crédito, detecção de anomalias com o dataset de Finanças.'
      },
      technologies: ['Spark ML', 'MLflow', 'Structured Streaming'],
      datasetId: 'finanzas',
      datasetUrl: '/miembros?tab=datasets'
    },
    {
      id: 'uc-streaming',
      industry: 'Media & Entertainment',
      title: { es: 'Plataforma de Streaming - Recomendaciones', en: 'Streaming Platform - Recommendations', pt: 'Plataforma de Streaming - Recomendações' },
      description: {
        es: 'Análisis de comportamiento de usuarios, sistema de recomendaciones, predicción de churn con el dataset de Streaming.',
        en: 'User behavior analysis, recommendation system, churn prediction with the Streaming dataset.',
        pt: 'Análise de comportamento de usuários, sistema de recomendações, predição de churn com o dataset de Streaming.'
      },
      technologies: ['Delta Lake', 'MLflow', 'Feature Store'],
      datasetId: 'streaming',
      datasetUrl: '/miembros?tab=datasets'
    },
    {
      id: 'uc-iot',
      industry: 'Manufacturing',
      title: { es: 'Fábrica Inteligente - Mantenimiento Predictivo', en: 'Smart Factory - Predictive Maintenance', pt: 'Fábrica Inteligente - Manutenção Preditiva' },
      description: {
        es: 'Procesamiento de datos IoT en tiempo real, alertas, mantenimiento predictivo con el dataset de IoT Factory.',
        en: 'Real-time IoT data processing, alerts, predictive maintenance with the IoT Factory dataset.',
        pt: 'Processamento de dados IoT em tempo real, alertas, manutenção preditiva com o dataset de IoT Factory.'
      },
      technologies: ['Structured Streaming', 'Delta Lake', 'Auto Loader'],
      datasetId: 'iot',
      datasetUrl: '/miembros?tab=datasets'
    }
  ]
};

// Re-exportar todo para fácil acceso
export { ALL_DATABRICKS_PHASES } from './phases';
export { ALL_DATABRICKS_EXERCISES, DATABRICKS_EXERCISES_BY_CATEGORY, DATABRICKS_EXERCISES_BY_DIFFICULTY } from './exercises';
export { ALL_DATABRICKS_PROJECTS } from './projects';
export { DATABRICKS_RESOURCES, STARTER_RESOURCES } from './resources';
export { ALL_DATABRICKS_LABS, DATABRICKS_LABS_BY_CATEGORY, DATABRICKS_LABS_BY_DIFFICULTY, getLabsByPhase } from './labs';
export * from './types';

// Función helper para obtener fase por ID
export const getDatabricksPhaseById = (phaseId: string) => {
  return ALL_DATABRICKS_PHASES.find(phase => phase.id === phaseId);
};

// Función helper para obtener ejercicio por ID
export const getDatabricksExerciseById = (exerciseId: string) => {
  return ALL_DATABRICKS_EXERCISES.find(exercise => exercise.id === exerciseId);
};

// Función helper para obtener proyecto por ID
export const getDatabricksProjectById = (projectId: string) => {
  return ALL_DATABRICKS_PROJECTS.find(project => project.id === projectId);
};

// Función helper para obtener lab por ID
export const getDatabricksLabById = (labId: string) => {
  return ALL_DATABRICKS_LABS.find(lab => lab.id === labId);
};

// Log de estadísticas en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.log('📊 Databricks Specialization loaded:', {
    phases: DATABRICKS_STATS.phases,
    steps: DATABRICKS_STATS.steps,
    labs: DATABRICKS_STATS.labs,
    exercises: DATABRICKS_STATS.exercises,
    projects: DATABRICKS_STATS.projects,
    estimatedHours: DATABRICKS_STATS.estimatedHours,
    estimatedWeeks: DATABRICKS_STATS.estimatedWeeks
  });
}
