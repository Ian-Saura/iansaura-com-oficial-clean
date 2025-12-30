/**
 * Types for AWS Data Engineering Specialization
 * Complete type definitions for 100+ steps roadmap
 */

export interface LocalizedContent {
  es: string;
  en: string;
  pt: string;
}

// AWS Service categories
export type AWSServiceCategory = 
  | 'storage'
  | 'compute'
  | 'database'
  | 'analytics'
  | 'streaming'
  | 'orchestration'
  | 'machine_learning'
  | 'security'
  | 'networking'
  | 'monitoring';

// Step types for different learning activities
export type StepType = 
  | 'theory'
  | 'hands_on'
  | 'exercise'
  | 'project'
  | 'quiz'
  | 'interview_prep';

export interface AWSStep {
  id: string;
  stepNumber: number;
  title: LocalizedContent;
  description: LocalizedContent;
  theory: LocalizedContent;
  practicalTips: LocalizedContent[];
  codeExample?: {
    language: 'python' | 'sql' | 'bash' | 'terraform' | 'cloudformation' | 'yaml';
    code: string;
    explanation: LocalizedContent;
  };
  awsConsoleSteps?: LocalizedContent[]; // Step-by-step in AWS Console
  cliCommands?: {
    command: string;
    explanation: LocalizedContent;
  }[];
  externalLinks: {
    title: string;
    url: string;
    type: 'docs' | 'video' | 'article' | 'tool' | 'aws_docs' | 'github';
    language?: 'es' | 'en' | 'pt';
  }[];
  checkpoint?: LocalizedContent; // Reflection question / verification
  commonMistakes?: LocalizedContent[]; // Common pitfalls to avoid
  interviewTips?: LocalizedContent[]; // What interviewers ask about this topic
  certificationNotes?: LocalizedContent; // Notes for AWS certification
  xpReward: number;
  estimatedMinutes: number;
  services: string[]; // AWS services covered in this step
  prerequisites?: string[]; // Step IDs that should be completed first
  // Lab integration
  isLab?: boolean; // If true, this step is a hands-on lab
  labId?: string; // Reference to lab in labs.ts
}

export interface AWSPhase {
  id: string;
  number: number;
  title: LocalizedContent;
  subtitle?: LocalizedContent;
  description: LocalizedContent;
  learningObjectives?: LocalizedContent[];
  icon: string;
  color: string;
  awsServices?: string[]; // Main AWS services in this phase
  services?: string[]; // Alias for awsServices
  stepsCount?: number; // Number of steps (for preview)
  steps?: AWSStep[];
  project?: string; // Reference to project ID
  estimatedDays: string;
  certificationWeight?: number; // 1-5, importance for certification
}

export interface AWSExercise {
  id: string;
  phaseId: string;
  title: LocalizedContent;
  description: LocalizedContent;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  type: 'python' | 'sql' | 'terraform' | 'cloudformation' | 'cli' | 'console' | 'json' | 'yaml' | 'hcl' | 'diagram' | 'quiz' | 'markdown';
  services?: string[]; // AWS services used (optional)
  scenario?: LocalizedContent; // Real-world scenario (optional)
  starterCode?: string;
  solution: string;
  testCode?: string;
  hints: LocalizedContent[];
  expectedOutput?: LocalizedContent;
  costWarning?: LocalizedContent; // Warning about AWS costs
  cleanupSteps?: LocalizedContent[]; // How to clean up resources
  xpReward: number;
  tags: string[];
  estimatedMinutes?: number; // Made optional
}

export interface AWSProject {
  id: string;
  number: number;
  title: LocalizedContent;
  subtitle?: LocalizedContent;
  description: LocalizedContent;
  businessCase?: LocalizedContent; // Why this project matters
  difficulty: 'intermediate' | 'advanced' | 'expert';
  estimatedHours: number;
  services?: string[]; // AWS services used
  prerequisites?: string[]; // Phase IDs required
  architecture?: {
    description: LocalizedContent;
    diagramUrl?: string;
    components: {
      service: string;
      purpose: LocalizedContent;
    }[];
  };
  skills?: LocalizedContent[];
  steps?: {
    title: LocalizedContent;
    description: LocalizedContent;
    deliverable?: LocalizedContent;
    code?: {
      language: string;
      code: string;
    };
    tips?: LocalizedContent[];
  }[];
  evaluation?: {
    criteria: LocalizedContent;
    points: number;
  }[];
  portfolioValue?: LocalizedContent; // How this looks on portfolio
  costEstimate?: LocalizedContent; // Estimated AWS costs
  cleanupInstructions?: LocalizedContent;
  xpReward: number;
}

export interface AWSResource {
  id: string;
  category: 'documentation' | 'tutorial' | 'video' | 'course' | 'certification' | 'tool' | 'blog' | 'github';
  title: LocalizedContent;
  description: LocalizedContent;
  url: string;
  free: boolean;
  official: boolean; // Is it official AWS content?
  language: 'es' | 'en' | 'pt' | 'multi';
  services: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration?: string; // e.g., "2 hours", "6-week course"
  recommended: boolean;
}

export interface CertificationInfo {
  name: LocalizedContent;
  code: string;
  description: LocalizedContent;
  examDuration: string;
  passingScore: string;
  cost: string;
  domains: {
    name: LocalizedContent;
    weight: string;
    topics: LocalizedContent[];
  }[];
  tips: LocalizedContent[];
  resources: AWSResource[];
}

// AWS Free Tier information
export interface FreeTierService {
  service: string;
  freeAmount: LocalizedContent;
  duration: LocalizedContent;
  tips: LocalizedContent[];
}

