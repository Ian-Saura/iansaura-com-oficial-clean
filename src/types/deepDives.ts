import { LocalizedContent } from './i18n';

// ============================================
// DEEP DIVES - Contenido teórico profundo
// ============================================

export type DeepDiveCategory = 
  | 'python'
  | 'pandas'
  | 'sql'
  | 'git'
  | 'apis'
  | 'docker'
  | 'spark'
  | 'airflow'
  | 'system-design'
  | 'databricks'
  | 'aws'
  | 'dbt'
  | 'snowflake'
  | 'data-quality'
  | 'data-modeling'
  | 'streaming'
  | 'leadership'
  | 'cloud';

export interface DeepDiveContent {
  id: string;
  title: LocalizedContent;
  subtitle: LocalizedContent;
  category: DeepDiveCategory;
  icon: string;
  color: 'emerald' | 'blue' | 'purple' | 'orange' | 'cyan' | 'rose' | 'amber' | 'teal' | 'violet' | 'pink' | 'indigo' | 'yellow';
  
  // Tiempo estimado de lectura
  readingTime: string; // e.g., "45 min"
  
  // Nivel de dificultad
  difficulty: 'foundational' | 'intermediate' | 'advanced';
  
  // Contenido principal (Markdown path)
  contentPath: string; // e.g., "level1/01-python-fundamentals.md"
  
  // Tags para filtrado
  tags: LocalizedContent[];
  
  // Referencias bibliográficas principales
  keyReferences: {
    title: string;
    author: string;
    type: 'book' | 'paper' | 'whitepaper' | 'documentation';
  }[];
  
  // Roadmap phases/steps que complementa
  complementsPhases: string[]; // phase IDs from roadmap
  
  // Prerequisitos (otros deep dives)
  prerequisites?: string[];
  
  // XP bonus por completarlo
  xpBonus: number;
}

export interface DeepDiveProgress {
  completedDives: string[];
  currentDive?: string;
  lastAccessed: Record<string, string>; // diveId -> timestamp
  notes: Record<string, string>; // diveId -> user notes
}

// Mapeo de pasos del roadmap a Deep Dives
export interface RoadmapDeepDiveMapping {
  phaseId: string;
  sectionId?: string;
  deepDiveIds: string[];
}

