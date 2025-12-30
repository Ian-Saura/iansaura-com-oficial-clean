/**
 * Exercise Types - Shared types for all exercises
 * Scalable and maintainable structure
 */

import { LocalizedContent } from '../../types/i18n';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';
export type InterviewFrequency = 'low' | 'medium' | 'high' | 'very_high';

export * from '../../types/i18n';

// Base exercise interface - extensible for SQL, Python, etc.
export interface BaseExercise {
  id: string;
  difficulty: Difficulty;
  category: string;
  subcategory: string;
  tags: string[];
  interviewFrequency: InterviewFrequency;
  xpReward: number;
  coinsReward?: number;
  
  // Localized content
  title: LocalizedContent;
  description: LocalizedContent;
  theory: LocalizedContent;
  realWorldExample: LocalizedContent;
  hint?: LocalizedContent;
}

// SQL-specific exercise
export interface SQLExercise extends BaseExercise {
  type: 'sql';
  schema: string;           // SQL to create tables (same for all languages)
  sampleData: string;       // SQL to insert data
  expectedQuery?: string;   // Reference solution
  expectedResult: any[][];  // Expected output
  alternativeSolutions?: string[]; // Other valid solutions
}

// Python-specific exercise
export interface PythonExercise extends BaseExercise {
  type: 'python';
  starterCode: LocalizedContent;  // Code with comments in each language
  solution: string;               // Solution code
  testCode: string;               // Validation code
  requiredImports?: string[];     // e.g., ['pandas', 'numpy']
}

// Union type for any exercise
export type Exercise = SQLExercise | PythonExercise;

// Exercise category metadata
export interface ExerciseCategory {
  id: string;
  name: LocalizedContent;
  description: LocalizedContent;
  icon: string;
  color: string;
  order: number;
}

// User progress on exercises
export interface ExerciseProgress {
  odexerciseId: string;
  completed: boolean;
  completedAt?: string;
  timeSpentSeconds?: number;
  attempts: number;
  bestTime?: number;
}

// Helper to get localized content with fallback chain: requested -> en -> es
// Exported from i18n

// Categories for SQL
export const SQL_CATEGORIES: ExerciseCategory[] = [
  {
    id: 'fundamentals',
    name: { es: 'Fundamentos', en: 'Fundamentals' },
    description: { es: 'SELECT, WHERE, ORDER BY, LIMIT', en: 'SELECT, WHERE, ORDER BY, LIMIT' },
    icon: '📚',
    color: 'emerald',
    order: 1
  },
  {
    id: 'aggregations',
    name: { es: 'Agregaciones', en: 'Aggregations' },
    description: { es: 'COUNT, SUM, AVG, GROUP BY, HAVING', en: 'COUNT, SUM, AVG, GROUP BY, HAVING' },
    icon: '📊',
    color: 'blue',
    order: 2
  },
  {
    id: 'joins',
    name: { es: 'JOINs', en: 'JOINs' },
    description: { es: 'INNER, LEFT, RIGHT, FULL, Self JOIN', en: 'INNER, LEFT, RIGHT, FULL, Self JOIN' },
    icon: '🔗',
    color: 'purple',
    order: 3
  },
  {
    id: 'window_functions',
    name: { es: 'Window Functions', en: 'Window Functions' },
    description: { es: 'ROW_NUMBER, RANK, LAG, LEAD, NTILE', en: 'ROW_NUMBER, RANK, LAG, LEAD, NTILE' },
    icon: '🪟',
    color: 'yellow',
    order: 4
  },
  {
    id: 'subqueries',
    name: { es: 'CTEs y Subconsultas', en: 'CTEs & Subqueries' },
    description: { es: 'WITH, EXISTS, subconsultas correlacionadas', en: 'WITH, EXISTS, correlated subqueries' },
    icon: '🎯',
    color: 'red',
    order: 5
  },
  {
    id: 'optimization',
    name: { es: 'Optimización', en: 'Optimization' },
    description: { es: 'Performance, índices, SARGable queries', en: 'Performance, indexes, SARGable queries' },
    icon: '⚡',
    color: 'cyan',
    order: 6
  },
  {
    id: 'interview',
    name: { es: 'Entrevistas', en: 'Interview Questions' },
    description: { es: 'Preguntas reales de FAANG y LeetCode', en: 'Real FAANG and LeetCode questions' },
    icon: '💼',
    color: 'pink',
    order: 7
  },
  {
    id: 'dbt',
    name: { es: 'dbt', en: 'dbt' },
    description: { es: 'ref, source, incrementales, tests, macros', en: 'ref, source, incremental, tests, macros' },
    icon: '🔧',
    color: 'orange',
    order: 8
  }
];

// Categories for Python
export const PYTHON_CATEGORIES: ExerciseCategory[] = [
  {
    id: 'basics',
    name: { es: 'Python Básico', en: 'Python Basics' },
    description: { es: 'Variables, loops, funciones, estructuras', en: 'Variables, loops, functions, structures' },
    icon: '🐍',
    color: 'yellow',
    order: 1
  },
  {
    id: 'pandas',
    name: { es: 'Pandas', en: 'Pandas' },
    description: { es: 'DataFrames, filtros, groupby, merge', en: 'DataFrames, filters, groupby, merge' },
    icon: '🐼',
    color: 'blue',
    order: 2
  },
  {
    id: 'etl',
    name: { es: 'ETL', en: 'ETL' },
    description: { es: 'Limpieza, transformación, pipelines', en: 'Cleaning, transformation, pipelines' },
    icon: '🔄',
    color: 'purple',
    order: 3
  },
  {
    id: 'airflow',
    name: { es: 'Apache Airflow', en: 'Apache Airflow' },
    description: { es: 'DAGs, operators, XCom, sensors', en: 'DAGs, operators, XCom, sensors' },
    icon: '🚀',
    color: 'orange',
    order: 4
  },
  {
    id: 'pyspark',
    name: { es: 'PySpark', en: 'PySpark' },
    description: { es: 'RDDs, DataFrames, Spark SQL, optimización', en: 'RDDs, DataFrames, Spark SQL, optimization' },
    icon: '⚡',
    color: 'red',
    order: 5
  },
  {
    id: 'interview',
    name: { es: 'Entrevistas', en: 'Interview' },
    description: { es: 'Preguntas típicas de entrevistas técnicas', en: 'Typical technical interview questions' },
    icon: '🎯',
    color: 'emerald',
    order: 6
  }
];