/**
 * SQL Exercises - Main Export
 * Scalable structure for thousands of exercises
 */

import { SQLExercise, SQL_CATEGORIES } from '../types';
import { SQL_FUNDAMENTALS } from './fundamentals';
import { SQL_FUNDAMENTALS_EXTENDED } from './fundamentalsExtended';
import { SQL_AGGREGATIONS } from './aggregations';
import { SQL_AGGREGATIONS_EXTENDED } from './aggregationsExtended';
import { SQL_JOINS } from './joins';
import { SQL_JOINS_EXTENDED } from './joinsExtended';
import { SQL_WINDOW_FUNCTIONS } from './windowFunctions';
import { SQL_WINDOW_FUNCTIONS_EXTENDED } from './windowFunctionsExtended';
import { SQL_ADVANCED } from './advanced';
import { SQL_OPTIMIZATION } from './optimization';
import { SQL_INTERVIEW } from './interview';
import { SQL_DBT } from './dbt';

// Combine all SQL exercises
export const ALL_SQL_EXERCISES: SQLExercise[] = [
  ...SQL_FUNDAMENTALS,
  ...SQL_FUNDAMENTALS_EXTENDED,
  ...SQL_AGGREGATIONS,
  ...SQL_AGGREGATIONS_EXTENDED,
  ...SQL_JOINS,
  ...SQL_JOINS_EXTENDED,
  ...SQL_WINDOW_FUNCTIONS,
  ...SQL_WINDOW_FUNCTIONS_EXTENDED,
  ...SQL_ADVANCED,
  ...SQL_OPTIMIZATION,
  ...SQL_INTERVIEW,
  ...SQL_DBT,
];

// Export by category for filtering
export const SQL_EXERCISES_BY_CATEGORY = {
  fundamentals: [...SQL_FUNDAMENTALS, ...SQL_FUNDAMENTALS_EXTENDED],
  aggregations: [...SQL_AGGREGATIONS, ...SQL_AGGREGATIONS_EXTENDED],
  joins: [...SQL_JOINS, ...SQL_JOINS_EXTENDED],
  window_functions: [...SQL_WINDOW_FUNCTIONS, ...SQL_WINDOW_FUNCTIONS_EXTENDED],
  subqueries: SQL_ADVANCED.filter(e => e.subcategory === 'subqueries'),
  advanced: SQL_ADVANCED.filter(e => e.subcategory === 'advanced'),
  optimization: SQL_OPTIMIZATION,
  interview: SQL_INTERVIEW,
  dbt: SQL_DBT,
};

// Export by difficulty
export const SQL_EXERCISES_BY_DIFFICULTY = {
  easy: ALL_SQL_EXERCISES.filter(e => e.difficulty === 'easy'),
  medium: ALL_SQL_EXERCISES.filter(e => e.difficulty === 'medium'),
  hard: ALL_SQL_EXERCISES.filter(e => e.difficulty === 'hard'),
  expert: ALL_SQL_EXERCISES.filter(e => e.difficulty === 'expert'),
};

// Get random exercise for daily challenges
export function getRandomSQLExercise(difficulty?: 'easy' | 'medium' | 'hard' | 'expert'): SQLExercise {
  const pool = difficulty 
    ? SQL_EXERCISES_BY_DIFFICULTY[difficulty]
    : ALL_SQL_EXERCISES;
  return pool[Math.floor(Math.random() * pool.length)];
}

// Get exercise by ID
export function getSQLExerciseById(id: string): SQLExercise | undefined {
  return ALL_SQL_EXERCISES.find(e => e.id === id);
}

// Get exercises by tag
export function getSQLExercisesByTag(tag: string): SQLExercise[] {
  return ALL_SQL_EXERCISES.filter(e => e.tags.includes(tag));
}

// Get high-frequency interview exercises
export function getInterviewSQLExercises(): SQLExercise[] {
  return ALL_SQL_EXERCISES.filter(e => 
    e.interviewFrequency === 'very_high' || e.interviewFrequency === 'high'
  );
}

// Statistics
export const SQL_STATS = {
  total: ALL_SQL_EXERCISES.length,
  byDifficulty: {
    easy: SQL_EXERCISES_BY_DIFFICULTY.easy.length,
    medium: SQL_EXERCISES_BY_DIFFICULTY.medium.length,
    hard: SQL_EXERCISES_BY_DIFFICULTY.hard.length,
    expert: SQL_EXERCISES_BY_DIFFICULTY.expert.length,
  },
  byCategory: Object.fromEntries(
    Object.entries(SQL_EXERCISES_BY_CATEGORY).map(([k, v]) => [k, v.length])
  ),
  totalXP: ALL_SQL_EXERCISES.reduce((sum, e) => sum + e.xpReward, 0),
};

// Re-export categories
export { SQL_CATEGORIES };
export { SQL_FUNDAMENTALS, SQL_FUNDAMENTALS_EXTENDED, SQL_AGGREGATIONS, SQL_AGGREGATIONS_EXTENDED, SQL_JOINS, SQL_JOINS_EXTENDED, SQL_WINDOW_FUNCTIONS, SQL_WINDOW_FUNCTIONS_EXTENDED, SQL_ADVANCED, SQL_OPTIMIZATION, SQL_INTERVIEW, SQL_DBT };