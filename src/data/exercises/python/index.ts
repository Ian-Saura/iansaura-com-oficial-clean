/**
 * Python Exercises - Main Export
 * Scalable structure for thousands of exercises
 */

import { PythonExercise, PYTHON_CATEGORIES } from '../types';
import { PYTHON_BASICS } from './basics';
import { PYTHON_BASICS_EXTENDED } from './basicsExtended';
import { PYTHON_PANDAS } from './pandas';
import { PYTHON_PANDAS_EXTENDED } from './pandasExtended';
import { PYTHON_ETL } from './etl';
import { PYTHON_ETL_EXTENDED } from './etlExtended';
import { PYTHON_AIRFLOW } from './airflow';
import { PYTHON_PYSPARK } from './pyspark';
import { PYTHON_KAFKA } from './kafka';
import { PYTHON_INTERVIEW } from './interview';

// Combine all Python exercises
export const ALL_PYTHON_EXERCISES: PythonExercise[] = [
  ...PYTHON_BASICS,
  ...PYTHON_BASICS_EXTENDED,
  ...PYTHON_PANDAS,
  ...PYTHON_PANDAS_EXTENDED,
  ...PYTHON_ETL,
  ...PYTHON_ETL_EXTENDED,
  ...PYTHON_AIRFLOW,
  ...PYTHON_PYSPARK,
  ...PYTHON_KAFKA,
  ...PYTHON_INTERVIEW,
];

// Export by category
export const PYTHON_EXERCISES_BY_CATEGORY = {
  basics: [...PYTHON_BASICS, ...PYTHON_BASICS_EXTENDED],
  pandas: [...PYTHON_PANDAS, ...PYTHON_PANDAS_EXTENDED],
  etl: [...PYTHON_ETL, ...PYTHON_ETL_EXTENDED],
  airflow: PYTHON_AIRFLOW,
  pyspark: PYTHON_PYSPARK,
  kafka: PYTHON_KAFKA,
  interview: PYTHON_INTERVIEW,
};

// Export by difficulty
export const PYTHON_EXERCISES_BY_DIFFICULTY = {
  easy: ALL_PYTHON_EXERCISES.filter(e => e.difficulty === 'easy'),
  medium: ALL_PYTHON_EXERCISES.filter(e => e.difficulty === 'medium'),
  hard: ALL_PYTHON_EXERCISES.filter(e => e.difficulty === 'hard'),
  expert: ALL_PYTHON_EXERCISES.filter(e => e.difficulty === 'expert'),
};

// Get random exercise for daily challenges
export function getRandomPythonExercise(difficulty?: 'easy' | 'medium' | 'hard' | 'expert'): PythonExercise {
  const pool = difficulty 
    ? PYTHON_EXERCISES_BY_DIFFICULTY[difficulty]
    : ALL_PYTHON_EXERCISES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Get exercise by ID
export function getPythonExerciseById(id: string): PythonExercise | undefined {
  return ALL_PYTHON_EXERCISES.find(e => e.id === id);
}

// Get exercises by tag
export function getPythonExercisesByTag(tag: string): PythonExercise[] {
  return ALL_PYTHON_EXERCISES.filter(e => e.tags.includes(tag));
}

// Statistics
export const PYTHON_STATS = {
  total: ALL_PYTHON_EXERCISES.length,
  byDifficulty: {
    easy: PYTHON_EXERCISES_BY_DIFFICULTY.easy.length,
    medium: PYTHON_EXERCISES_BY_DIFFICULTY.medium.length,
    hard: PYTHON_EXERCISES_BY_DIFFICULTY.hard.length,
    expert: PYTHON_EXERCISES_BY_DIFFICULTY.expert.length,
  },
  byCategory: Object.fromEntries(
    Object.entries(PYTHON_EXERCISES_BY_CATEGORY).map(([k, v]) => [k, v.length])
  ),
  totalXP: ALL_PYTHON_EXERCISES.reduce((sum, e) => sum + e.xpReward, 0),
};

// Re-export
export { PYTHON_CATEGORIES };
export { PYTHON_BASICS, PYTHON_BASICS_EXTENDED, PYTHON_PANDAS, PYTHON_PANDAS_EXTENDED, PYTHON_ETL, PYTHON_ETL_EXTENDED, PYTHON_AIRFLOW, PYTHON_PYSPARK, PYTHON_KAFKA, PYTHON_INTERVIEW };