import { Bootcamp, UpcomingFeature } from '../types/members';

/**
 * Videos y Bootcamps
 * 
 * Para agregar videos:
 * 1. Agregar al array de videos del bootcamp correspondiente
 * 2. Usar el youtubeId (la parte después de v= en la URL)
 */

export const bootcamps: Bootcamp[] = [
  {
    id: 'fundamentos-ed1',
    title: { es: 'Bootcamp: Fundamentos de Data Engineering', en: 'Bootcamp: Data Engineering Fundamentals', pt: 'Bootcamp: Fundamentos de Engenharia de Dados' },
    edition: { es: 'Edición 1', en: 'Edition 1', pt: 'Edição 1' },
    date: 'Octubre 2024',
    status: 'available',
    videos: [
      {
        week: 1,
        title: { es: 'Introducción al rol + Roadmap', en: 'Introduction to the role + Roadmap', pt: 'Introdução ao papel + Roadmap' },
        youtubeId: 'oDMquk7krqc',
        description: { es: 'Qué es Data Engineering, roles en el ecosistema de datos, herramientas principales.', en: 'What is Data Engineering, roles in the data ecosystem, main tools.', pt: 'O que é Data Engineering, papéis no ecossistema de dados, ferramentas principais.' },
        duration: '2h',
      },
      {
        week: 2,
        title: { es: 'Fundamentos de Python para datos', en: 'Python fundamentals for data', pt: 'Fundamentos de Python para dados' },
        youtubeId: 'UuCJd3bHm0E',
        description: { es: 'Python aplicado: pandas, funciones, manejo de archivos, buenas prácticas.', en: 'Applied Python: pandas, functions, file handling, best practices.', pt: 'Python aplicado: pandas, funções, manipulação de arquivos, boas práticas.' },
        duration: '2h',
      },
      {
        week: 3,
        title: { es: 'SQL aplicado a Ingeniería de Datos', en: 'SQL applied to Data Engineering', pt: 'SQL aplicado à Engenharia de Dados' },
        youtubeId: 'sXT2n5JtaH4',
        description: { es: 'SQL avanzado: JOINs, agregaciones, window functions, CTEs.', en: 'Advanced SQL: JOINs, aggregations, window functions, CTEs.', pt: 'SQL avançado: JOINs, agregações, window functions, CTEs.' },
        duration: '2h',
      },
      {
        week: 4,
        title: { es: 'Arquitectura moderna de datos', en: 'Modern Data Architecture', pt: 'Arquitetura moderna de dados' },
        youtubeId: 'Z0-FdWQZ2GA',
        description: { es: 'Data Lakes, Data Warehouses, arquitecturas modernas, cloud.', en: 'Data Lakes, Data Warehouses, modern architectures, cloud.', pt: 'Data Lakes, Data Warehouses, arquiteturas modernas, cloud.' },
        duration: '2h',
      },
      {
        week: 5,
        title: { es: 'Automatización y orquestación', en: 'Automation and orchestration', pt: 'Automação e orquestração' },
        youtubeId: 'Q_C9DTL6yrg',
        description: { es: 'Airflow, scheduling, dependencias entre tareas, DAGs.', en: 'Airflow, scheduling, task dependencies, DAGs.', pt: 'Airflow, scheduling, dependências entre tarefas, DAGs.' },
        duration: '2h',
      },
      {
        week: 6,
        title: { es: 'Calidad, validación de datos y Git', en: 'Data quality, validation and Git', pt: 'Qualidade, validação de dados e Git' },
        youtubeId: 'RXs7AW_7d_E',
        description: { es: 'Data quality, testing, control de versiones, CI/CD.', en: 'Data quality, testing, version control, CI/CD.', pt: 'Data quality, testing, controle de versão, CI/CD.' },
        duration: '2h',
      },
      {
        week: 7,
        title: { es: 'Preparación para producción', en: 'Production readiness', pt: 'Preparação para produção' },
        youtubeId: '7fT-iBcHEK0',
        description: { es: 'Deploy, monitoring, logging, alertas, mejores prácticas.', en: 'Deploy, monitoring, logging, alerts, best practices.', pt: 'Deploy, monitoramento, logging, alertas, melhores práticas.' },
        duration: '2h',
      },
      {
        week: 8,
        title: { es: 'Extra - Visualización de datos', en: 'Extra - Data Visualization', pt: 'Extra - Visualização de dados' },
        youtubeId: 'dlEspsj1500',
        description: { es: 'Dashboards, métricas, storytelling con datos.', en: 'Dashboards, metrics, data storytelling.', pt: 'Dashboards, métricas, storytelling com dados.' },
        duration: '1.5h',
      },
    ],
  },
];

// Bootcamps próximos
export const upcomingBootcamps = [
  {
    title: { es: 'Especialización en AWS', en: 'AWS Specialization', pt: 'Especialização em AWS' },
    description: { es: 'S3, Glue, Athena, Lambda, Step Functions, y más', en: 'S3, Glue, Athena, Lambda, Step Functions, and more', pt: 'S3, Glue, Athena, Lambda, Step Functions, e mais' },
    estimatedDate: 'Q1 2026',
  },
  {
    title: { es: 'Fundamentos - Segunda Edición', en: 'Fundamentals - Second Edition', pt: 'Fundamentos - Segunda Edição' },
    description: { es: 'Contenido actualizado con nuevas tecnologías', en: 'Updated content with new technologies', pt: 'Conteúdo atualizado com novas tecnologias' },
    estimatedDate: 'Febrero 2026',
  },
];

// Features próximas
export const upcomingFeatures: UpcomingFeature[] = [
  {
    id: 'airflow-project',
    title: { es: 'Pipeline con Airflow', en: 'Pipeline with Airflow', pt: 'Pipeline com Airflow' },
    description: { es: 'Proyecto guiado de orquestación', en: 'Guided orchestration project', pt: 'Projeto guiado de orquestração' },
    estimatedDate: 'Enero 2026',
    icon: 'rocket',
  },
  {
    id: 'interactive-exercises',
    title: { es: 'Ejercicios Interactivos', en: 'Interactive Exercises', pt: 'Exercícios Interativos' },
    description: { es: 'SQL y Python con feedback automático', en: 'SQL and Python with automatic feedback', pt: 'SQL e Python com feedback automático' },
    estimatedDate: 'Febrero 2026',
    icon: 'zap',
  },
  {
    id: 'certificates',
    title: { es: 'Certificados', en: 'Certificates', pt: 'Certificados' },
    description: { es: 'Certificados por completar proyectos', en: 'Certificates for completing projects', pt: 'Certificados por completar projetos' },
    estimatedDate: 'Q1 2026',
    icon: 'award',
  },
  {
    id: 'aws-bootcamp',
    title: { es: 'Especialización AWS', en: 'AWS Specialization', pt: 'Especialização AWS' },
    description: { es: 'Bootcamp completo de AWS para DE', en: 'Complete AWS Bootcamp for DE', pt: 'Bootcamp completo de AWS para DE' },
    estimatedDate: 'Q2 2026',
    icon: 'book',
  },
];

// Discord link (permanente - nunca expira)
export const DISCORD_INVITE_LINK = 'https://discord.gg/jfyqeAMpmk';

// Discord connection link generator - uses email to auto-connect subscriber
export const getDiscordConnectLink = (email?: string): string => {
  if (email) {
    return `https://www.iansaura.com/api/generate-discord-link.php?email=${encodeURIComponent(email)}`;
  }
  return DISCORD_INVITE_LINK;
};
