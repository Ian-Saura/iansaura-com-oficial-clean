/**
 * Types for Databricks Specialization
 */

export interface LocalizedContent {
  es: string;
  en: string;
  pt: string;
}

export interface DatabricksStep {
  id: string;
  title?: LocalizedContent; // Usado por phases
  name?: LocalizedContent; // Alias de title
  description: LocalizedContent;
  theory?: LocalizedContent;
  tips?: LocalizedContent[];
  practicalTips?: LocalizedContent[];
  resources?: { name: LocalizedContent; url: string }[];
  codeExample?: {
    language: 'python' | 'sql' | 'scala';
    code: string;
    explanation?: LocalizedContent;
  };
  externalLinks?: {
    title: string;
    url: string;
    type: 'docs' | 'video' | 'article' | 'tool';
  }[];
  checkpoint?: LocalizedContent; // Reflection question
  exercises?: string[]; // IDs of exercises
  projects?: string[]; // IDs of projects
  isOptional?: boolean;
  xpReward?: number;
  estimatedMinutes?: number;
}

export interface DatabricksPhase {
  id: string;
  number: number;
  title: LocalizedContent;
  subtitle: LocalizedContent;
  description: LocalizedContent;
  icon: string;
  color: string;
  steps: DatabricksStep[];
  project?: string; // Reference to project ID
  estimatedDays: string;
}

export interface DatabricksExercise {
  id: string;
  name: LocalizedContent;
  description: LocalizedContent;
  code: string; // Initial code snippet
  solution: string; // Expected solution
  testCases: string[]; // Test cases to validate the solution
  difficulty: 'easy' | 'medium' | 'hard';
  category: LocalizedContent;
  tags: string[];
  // Legacy fields for backward compatibility
  phaseId?: string;
  title?: LocalizedContent;
  type?: 'spark' | 'delta' | 'sql' | 'python' | 'workflow';
  starterCode?: string;
  testCode?: string;
  hints?: LocalizedContent[];
  xpReward?: number;
}

export interface DatabricksProjectStep {
  id: string;
  name: LocalizedContent;
  description: LocalizedContent;
  theory?: LocalizedContent;
  resources?: { name: LocalizedContent; url: string }[];
}

export interface DatabricksProject {
  id: string;
  name: LocalizedContent;
  description: LocalizedContent;
  steps: DatabricksProjectStep[];
  difficulty: 'easy' | 'medium' | 'hard';
  technologies: string[];
  // Links to other resources
  datasetId?: string; // ID del dataset de la Academia a usar
  phases?: number[]; // Fases del roadmap cubiertas
  exercisesLink?: string; // Link a ejercicios relacionados
  examLink?: string; // Link al simulador de examen
  // Legacy fields for backward compatibility
  number?: number;
  title?: LocalizedContent;
  subtitle?: LocalizedContent;
  estimatedHours?: number;
  skills?: LocalizedContent[];
  evaluation?: {
    criteria: LocalizedContent;
    points: number;
  }[];
  xpReward?: number;
}

export interface DatabricksSpecialization {
  id: string;
  name: LocalizedContent;
  description: LocalizedContent;
  icon: string;
  banner: string;
  isNew: boolean;
  isComingSoon: boolean;
  phases: DatabricksPhase[];
  exercises: DatabricksExercise[];
  projects: DatabricksProject[];
}
