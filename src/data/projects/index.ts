import { Project } from '../../types/members';
import { level1Projects } from './level1Projects';
import { level2Projects } from './level2Projects';
import { level3Projects } from './level3Projects';
import { snowflakeProject } from './snowflakeProject';
import { databricksProject } from './databricksProject';

// Re-export individual level arrays
export { level1Projects } from './level1Projects';
export { level2Projects } from './level2Projects';
export { level3Projects } from './level3Projects';
export { snowflakeProject } from './snowflakeProject';
export { databricksProject } from './databricksProject';

// Combined projects array
export const projects: Project[] = [
  ...level1Projects,
  ...level2Projects,
  snowflakeProject,
  databricksProject,
  ...level3Projects,
];

// Upcoming projects
export const upcomingProjects = [
  {
    title: { es: 'Real-Time Dashboard con Kafka', en: 'Real-Time Dashboard with Kafka', pt: 'Real-Time Dashboard com Kafka' },
    description: { es: 'Dashboard de métricas en tiempo real', en: 'Real-time metrics dashboard', pt: 'Dashboard de métricas em tempo real' },
    estimatedDate: 'Q1 2026',
  },
  {
    title: { es: 'ML Pipeline con Feature Store', en: 'ML Pipeline with Feature Store', pt: 'ML Pipeline com Feature Store' },
    description: { es: 'Pipeline de ML completo con feature engineering', en: 'Complete ML pipeline with feature engineering', pt: 'Pipeline de ML completo com feature engineering' },
    estimatedDate: 'Q1 2026',
  },
  {
    title: { es: 'Data Lakehouse con Delta Lake', en: 'Data Lakehouse with Delta Lake', pt: 'Data Lakehouse com Delta Lake' },
    description: { es: 'Arquitectura Lakehouse moderna', en: 'Modern Lakehouse architecture', pt: 'Arquitetura Lakehouse moderna' },
    estimatedDate: 'Q2 2026',
  },
];

// Helper functions
export const getProjectsByLevel = (level: number): Project[] => {
  return projects.filter(p => p.level === level);
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};