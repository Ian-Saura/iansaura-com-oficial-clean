/**
 * Types for Databricks Labs
 */

export interface LocalizedContent {
  es: string;
  en: string;
  pt: string;
}

export interface LabStep {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  code?: string;
  codeLanguage?: 'python' | 'sql' | 'scala' | 'bash';
  expectedOutput?: string;
  screenshot?: string; // URL to screenshot
  tip?: LocalizedContent;
  warning?: LocalizedContent;
  checkpoint?: LocalizedContent; // Validation question
}

export interface DatabricksLab {
  id: string;
  title: LocalizedContent;
  subtitle: LocalizedContent;
  description: LocalizedContent;
  
  // Metadata
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  relatedPhases: string[]; // IDs of related roadmap phases
  prerequisites: LocalizedContent[];
  
  // Content
  objectives: LocalizedContent[];
  steps: LabStep[];
  
  // Rewards
  xpReward: number;
  badge?: {
    id: string;
    name: LocalizedContent;
    icon: string;
  };
  
  // Resources
  resources: {
    title: string;
    url: string;
    type: 'docs' | 'video' | 'article';
  }[];
  
  // Tags for filtering
  tags: string[];
  services: string[]; // Databricks services used
}

