import { LocalizedContent } from '../types/i18n';

// Mini-retos semanales
export interface WeeklyChallenge {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  estimatedTime: string;
  skills: string[];
  deliverable: LocalizedContent;
  badge: string;
  badgeEmoji: string;
  startDate: string;
  endDate: string;
  discordChannel: string;
}

// Reto actual
export const currentChallenge: WeeklyChallenge = {
  id: 'challenge-001',
  title: { es: 'Pipeline API → CSV', en: 'Pipeline API → CSV', pt: 'Pipeline API → CSV' },
  description: { 
    es: 'Creá un script en Python que consuma la API de datasets de la plataforma y guarde los datos en un archivo CSV local.', 
    en: 'Create a Python script that consumes the platform datasets API and saves the data to a local CSV file.', 
    pt: 'Crie um script em Python que consuma a API de datasets da plataforma e salve os dados em um arquivo CSV local.' 
  },
  difficulty: 'Fácil',
  estimatedTime: '30-60 min',
  skills: ['Python', 'APIs', 'CSV'],
  deliverable: { es: 'Subí tu script a #retos-semanales en Discord', en: 'Upload your script to #weekly-challenges on Discord', pt: 'Envie seu script para #desafios-semanais no Discord' },
  badge: 'Pipeline Starter',
  badgeEmoji: '🔧',
  startDate: '2025-12-09',
  endDate: '2025-12-15',
  discordChannel: '#retos-semanales'
};

// Próximos retos
export const upcomingChallenges: Omit<WeeklyChallenge, 'startDate' | 'endDate'>[] = [
  {
    id: 'challenge-002',
    title: { es: 'Dashboard de Ventas', en: 'Sales Dashboard', pt: 'Dashboard de Vendas' },
    description: { 
      es: 'Usá el dataset de E-commerce para crear un dashboard simple en Looker Studio o Metabase.', 
      en: 'Use the E-commerce dataset to create a simple dashboard in Looker Studio or Metabase.', 
      pt: 'Use o dataset de E-commerce para criar um dashboard simples no Looker Studio ou Metabase.' 
    },
    difficulty: 'Medio',
    estimatedTime: '1-2 horas',
    skills: ['SQL', 'Visualización', 'BI'],
    deliverable: { es: 'Compartí el link de tu dashboard', en: 'Share your dashboard link', pt: 'Compartilhe o link do seu dashboard' },
    badge: 'Dashboard Builder',
    badgeEmoji: '📊',
    discordChannel: '#retos-semanales'
  },
  {
    id: 'challenge-003',
    title: { es: 'Data Quality Check', en: 'Data Quality Check', pt: 'Verificação de Qualidade de Dados' },
    description: { 
      es: 'Escribí validaciones para detectar datos duplicados, nulos y outliers en un dataset.', 
      en: 'Write validations to detect duplicate, null, and outlier data in a dataset.', 
      pt: 'Escreva validações para detectar dados duplicados, nulos e outliers em um dataset.' 
    },
    difficulty: 'Medio',
    estimatedTime: '1-2 horas',
    skills: ['Python', 'Data Quality', 'Pandas'],
    deliverable: { es: 'Subí tu notebook con las validaciones', en: 'Upload your notebook with validations', pt: 'Envie seu notebook com as validações' },
    badge: 'Quality Guardian',
    badgeEmoji: '🛡️',
    discordChannel: '#retos-semanales'
  },
  {
    id: 'challenge-004',
    title: { es: 'ETL con Airflow', en: 'ETL with Airflow', pt: 'ETL com Airflow' },
    description: { 
      es: 'Creá un DAG simple que extraiga datos de la API, los transforme y los guarde.', 
      en: 'Create a simple DAG that extracts data from the API, transforms it, and saves it.', 
      pt: 'Crie um DAG simples que extraia dados da API, os transforme e os salve.' 
    },
    difficulty: 'Difícil',
    estimatedTime: '2-3 horas',
    skills: ['Airflow', 'Python', 'ETL'],
    deliverable: { es: 'Subí tu DAG y un screenshot del Airflow UI', en: 'Upload your DAG and a screenshot of the Airflow UI', pt: 'Envie seu DAG e um screenshot da UI do Airflow' },
    badge: 'Orchestrator',
    badgeEmoji: '🎼',
    discordChannel: '#retos-semanales'
  }
];

// Badges ganados (se guardan en localStorage/backend)
export interface EarnedBadge {
  challengeId: string;
  badge: string;
  badgeEmoji: string;
  earnedAt: string;
}

// Ofertas laborales curadas
export interface JobOffer {
  id: string;
  title: string; // Keep as string, usually specific
  company: string;
  location: string;
  type: 'Remote' | 'Hybrid' | 'On-site';
  seniority: 'Junior' | 'Semi-Senior' | 'Senior';
  salary?: string;
  url: string;
  postedAt: string;
  tags: string[];
}

export const jobOffers: JobOffer[] = [
  {
    id: 'job-001',
    title: 'Data Engineer Jr',
    company: 'Mercado Libre',
    location: 'Argentina (Remote)',
    type: 'Remote',
    seniority: 'Junior',
    salary: 'USD 1,500 - 2,500',
    url: 'https://www.linkedin.com/jobs/search/?keywords=data%20engineer&location=Argentina',
    postedAt: '2025-12-01',
    tags: ['Python', 'SQL', 'AWS']
  },
  {
    id: 'job-002',
    title: 'Data Engineer',
    company: 'Globant',
    location: 'LATAM (Remote)',
    type: 'Remote',
    seniority: 'Semi-Senior',
    salary: 'USD 3,000 - 5,000',
    url: 'https://www.linkedin.com/jobs/search/?keywords=data%20engineer&location=Latin%20America',
    postedAt: '2025-12-05',
    tags: ['Spark', 'Airflow', 'GCP']
  },
  {
    id: 'job-003',
    title: 'Senior Data Engineer',
    company: 'Ualá',
    location: 'Argentina (Hybrid)',
    type: 'Hybrid',
    seniority: 'Senior',
    salary: 'USD 5,000 - 8,000',
    url: 'https://www.linkedin.com/jobs/search/?keywords=senior%20data%20engineer&location=Argentina',
    postedAt: '2025-12-08',
    tags: ['Snowflake', 'dbt', 'Kafka']
  }
];

// Links útiles para búsqueda laboral
export const jobSearchLinks = [
  { name: 'LinkedIn Jobs - DE Argentina', url: 'https://www.linkedin.com/jobs/search/?keywords=data%20engineer&location=Argentina&f_TPR=r86400', icon: '💼' },
  { name: 'LinkedIn Jobs - DE Remote LATAM', url: 'https://www.linkedin.com/jobs/search/?keywords=data%20engineer%20remote&location=Latin%20America&f_TPR=r86400', icon: '🌎' },
  { name: 'Get on Board', url: 'https://www.getonbrd.com/jobs/data?remote=true', icon: '🚀' },
  { name: 'Wellfound (ex AngelList)', url: 'https://wellfound.com/role/data-engineer', icon: '⭐' }
];
