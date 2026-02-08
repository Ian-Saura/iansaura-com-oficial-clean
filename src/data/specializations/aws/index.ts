/**
 * AWS DATA ENGINEERING SPECIALIZATION
 * 2 NIVELES:
 *   Nivel 1: Serverless - Lambda, Fargate, Step Functions (Free Tier)
 *   Nivel 2: Advanced - EMR, Kinesis, IaC, Monitoring, Certification
 * 
 * Estructura:
 * - 13 fases originales + 2 fases nuevas (Lambda, Fargate)
 * - 130+ pasos con teoría profunda, código, tips de entrevista
 * - 44 ejercicios prácticos
 * - 10 proyectos (5 por nivel)
 * - 18+ preguntas de entrevista de nivel experto
 * - 45+ recursos externos verificados
 * 
 * Idiomas: Español, English, Português
 */

// Types
export * from './types';

// Phases - original + reestructuradas por nivel
export { awsPhases, awsPhasesNivel1, awsPhasesNivel2, getPhasesByLevel, nivel1Stats, nivel2Stats } from './phases';
export type { AWSPhaseWithLevel } from './phases';

// Steps individuales por fase (originales)
export { phase0Steps, FREE_TIER_INFO, PHASE_COSTS } from './steps/phase0-freetier';
export { phase1Steps } from './steps/phase1-intro';
export { phase2Steps } from './steps/phase2-s3';
export { phase3Steps } from './steps/phase3-iam';
export { phase4Steps } from './steps/phase4-glue';
export { phase5Steps } from './steps/phase5-athena';
export { phase6Steps } from './steps/phase6-redshift';
export { phase7Steps } from './steps/phase7-emr';
export { phase8Steps } from './steps/phase8-kinesis';
export { phase9Steps } from './steps/phase9-orchestration';
export { phase10Steps } from './steps/phase10-iac';
export { phase11Steps } from './steps/phase11-monitoring';
export { phase12Steps } from './steps/phase12-certification';

// Steps nuevos - Nivel 1
export { phaseLambdaSteps, LAMBDA_PHASE_INFO } from './steps/phase-lambda';
export { phaseFargateSteps, FARGATE_PHASE_INFO } from './steps/phase-fargate';

// Exercises
export { awsExercises, getExercisesByPhase, getExercisesByDifficulty, exerciseStats } from './exercises';

// Projects - ambos niveles
export { awsProjects, getProjectById, projectStats } from './projects';
export { awsProjectsNivel1, getProjectNivel1ById, projectNivel1Stats } from './projects-nivel1';

// Interview Questions
export { interviewQuestions, getQuestionsByModule, getQuestionsByDifficulty, interviewStats } from './interview-questions';
export type { InterviewQuestion } from './interview-questions';

// Resources
export { awsResources, getResourcesByType, getResourcesByService, getFreeResources, resourceStats } from './resources';

// Labs (mini-proyectos guiados)
export { awsLabs, getLabById, getLabsByPhase, labStats } from './labs';

// Lab Steps (labs convertidos a pasos integrados)
export { getLabStepsForPhase, getAllLabSteps, labsByPhase, labStepsStats } from './lab-steps';

// Metadata de la especialización
export const AWS_SPECIALIZATION = {
  id: 'spec-aws',
  version: '2.0.0',
  
  // Estructura de 2 niveles
  levels: {
    nivel1: {
      name: { es: 'Nivel 1: Serverless', en: 'Level 1: Serverless', pt: 'Nível 1: Serverless' },
      description: { es: 'Lambda, Fargate, Step Functions - Free Tier priority', en: 'Lambda, Fargate, Step Functions - Free Tier priority', pt: 'Lambda, Fargate, Step Functions - Free Tier priority' },
      phases: 7,
      projects: 5,
      estimatedWeeks: '5-6',
      freeTierFriendly: true
    },
    nivel2: {
      name: { es: 'Nivel 2: Advanced', en: 'Level 2: Advanced', pt: 'Nível 2: Advanced' },
      description: { es: 'EMR, Kinesis, IaC, Monitoring, Certification', en: 'EMR, Kinesis, IaC, Monitoring, Certification', pt: 'EMR, Kinesis, IaC, Monitoring, Certificação' },
      phases: 6,
      projects: 5,
      estimatedWeeks: '4-5',
      freeTierFriendly: false
    }
  },
  
  // Estadísticas del contenido (totales)
  totalPhases: 13 + 2, // 13 originales + Lambda + Fargate
  totalSteps: 134, // 115 originales + 11 Lambda + 8 Fargate
  totalExercises: 44, // 35 originales + 9 nuevos
  totalProjects: 10, // 5 Nivel 1 + 5 Nivel 2
  totalInterviewQuestions: 18,
  totalLabs: 10,
  totalResources: 45,
  
  // Tiempo estimado
  estimatedDuration: '10-12 semanas (ambos niveles)',
  estimatedHours: 150,
  
  // Dificultad
  difficulty: 'intermediate-advanced',
  
  // Prerrequisitos
  prerequisites: [
    'level-2',
    'python-basics',
    'sql-intermediate'
  ],
  
  // Certificación objetivo
  certification: {
    name: 'AWS Certified Data Analytics - Specialty',
    code: 'DAS-C01',
    url: 'https://aws.amazon.com/certification/certified-data-analytics-specialty/'
  },
  
  // Servicios cubiertos (actualizado)
  services: [
    'S3', 'IAM', 'KMS', 'Glue', 'Athena', 'Redshift',
    'EMR', 'Kinesis', 'Lambda', 'Step Functions',
    'EventBridge', 'Lake Formation', 'CloudWatch', 'CloudTrail',
    'CloudFormation', 'Terraform',
    // Nuevos en Nivel 1
    'Secrets Manager', 'ECS', 'Fargate', 'ECR',
    'SQS', 'SNS', 'DynamoDB', 'X-Ray'
  ],
  
  // Skills que se desarrollan
  skills: {
    technical: [
      'Data Lake architecture (Medallion)',
      'Serverless ETL (Lambda + Fargate)',
      'Event-driven pipelines',
      'ETL with PySpark',
      'SQL analytics',
      'Streaming processing',
      'Data warehousing',
      'Container orchestration',
      'Secrets management',
      'Infrastructure as Code',
      'Data governance',
      'Monitoring & observability'
    ],
    soft: [
      'System design',
      'Cost optimization',
      'Security best practices',
      'Interview preparation',
      'Documentation'
    ]
  },
  
  // XP totales disponibles
  totalXP: {
    steps: 6560,       // 5350 originales + 610 Lambda + 500 Fargate + 100 interview
    exercises: 3400,   // 2700 originales + 700 nuevos
    projects: 7300,    // 4100 Nivel 2 + 3200 Nivel 1
    labs: 2000,
    total: 19260
  },
  
  // Metadata
  lastUpdated: '2026-02-08',
  authors: ['Ian Saura Data Engineering Platform'],
  
  // Estado de la especialización
  status: 'coming_soon',
  releaseDate: 'Marzo 2026'
};

// Helper para obtener todos los steps en orden (incluyendo labs integrados)
export const getAllSteps = (includeLabs: boolean = true) => {
  const { phase0Steps } = require('./steps/phase0-freetier');
  const { phase1Steps } = require('./steps/phase1-intro');
  const { phase2Steps } = require('./steps/phase2-s3');
  const { phase3Steps } = require('./steps/phase3-iam');
  const { phase4Steps } = require('./steps/phase4-glue');
  const { phase5Steps } = require('./steps/phase5-athena');
  const { phase6Steps } = require('./steps/phase6-redshift');
  const { phase7Steps } = require('./steps/phase7-emr');
  const { phase8Steps } = require('./steps/phase8-kinesis');
  const { phase9Steps } = require('./steps/phase9-orchestration');
  const { phase10Steps } = require('./steps/phase10-iac');
  const { phase11Steps } = require('./steps/phase11-monitoring');
  const { phase12Steps } = require('./steps/phase12-certification');
  const { getAllLabSteps } = require('./lab-steps');
  
  const allSteps = [
    ...phase0Steps,
    ...phase1Steps,
    ...phase2Steps,
    ...phase3Steps,
    ...phase4Steps,
    ...phase5Steps,
    ...phase6Steps,
    ...phase7Steps,
    ...phase8Steps,
    ...phase9Steps,
    ...phase10Steps,
    ...phase11Steps,
    ...phase12Steps
  ];

  // Agregar labs como pasos integrados si se solicita
  if (includeLabs) {
    allSteps.push(...getAllLabSteps());
  }

  return allSteps;
};

// Helper para obtener step por ID
export const getStepById = (stepId: string) => {
  const allSteps = getAllSteps();
  return allSteps.find((step: any) => step.id === stepId);
};

// Helper para obtener steps por fase (incluyendo labs integrados)
export const getStepsByPhase = (phaseNumber: number, includeLabs: boolean = true) => {
  const { getLabStepsForPhase } = require('./lab-steps');
  
  const phaseMap: { [key: number]: any } = {
    0: require('./steps/phase0-freetier').phase0Steps,
    1: require('./steps/phase1-intro').phase1Steps,
    2: require('./steps/phase2-s3').phase2Steps,
    3: require('./steps/phase3-iam').phase3Steps,
    4: require('./steps/phase4-glue').phase4Steps,
    5: require('./steps/phase5-athena').phase5Steps,
    6: require('./steps/phase6-redshift').phase6Steps,
    7: require('./steps/phase7-emr').phase7Steps,
    8: require('./steps/phase8-kinesis').phase8Steps,
    9: require('./steps/phase9-orchestration').phase9Steps,
    10: require('./steps/phase10-iac').phase10Steps,
    11: require('./steps/phase11-monitoring').phase11Steps,
    12: require('./steps/phase12-certification').phase12Steps
  };
  
  const steps = phaseMap[phaseNumber] || [];
  
  // Agregar labs de esta fase al final
  if (includeLabs) {
    const labSteps = getLabStepsForPhase(`phase${phaseNumber}`);
    return [...steps, ...labSteps];
  }
  
  return steps;
};

// Calcular progreso del usuario
export const calculateProgress = (completedSteps: string[]) => {
  const totalSteps = AWS_SPECIALIZATION.totalSteps;
  const completed = completedSteps.length;
  const percentage = Math.round((completed / totalSteps) * 100);
  
  return {
    completed,
    total: totalSteps,
    percentage,
    remaining: totalSteps - completed
  };
};

// Calcular XP ganado
export const calculateEarnedXP = (completedSteps: string[], completedExercises: string[], completedProjects: string[]) => {
  const allSteps = getAllSteps();
  const { awsExercises } = require('./exercises');
  const { awsProjects } = require('./projects');
  
  const stepsXP = completedSteps.reduce((sum, stepId) => {
    const step = allSteps.find((s: any) => s.id === stepId);
    return sum + (step?.xpReward || 0);
  }, 0);
  
  const exercisesXP = completedExercises.reduce((sum, exId) => {
    const ex = awsExercises.find((e: any) => e.id === exId);
    return sum + (ex?.xpReward || 0);
  }, 0);
  
  const projectsXP = completedProjects.reduce((sum, projId) => {
    const proj = awsProjects.find((p: any) => p.id === projId);
    return sum + (proj?.xpReward || 0);
  }, 0);
  
  return {
    steps: stepsXP,
    exercises: exercisesXP,
    projects: projectsXP,
    total: stepsXP + exercisesXP + projectsXP
  };
};

