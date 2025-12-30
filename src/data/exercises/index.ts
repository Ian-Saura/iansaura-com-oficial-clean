/**
 * Exercises - Main Export
 * 
 * Scalable and maintainable structure for exercises
 * Supports internationalization (i18n)
 * Ready for thousands of users
 */

// Import first for internal use
import { ALL_SQL_EXERCISES as SQL_EXERCISES_INTERNAL, SQL_STATS as SQL_STATS_INTERNAL } from './sql';
import { ALL_PYTHON_EXERCISES as PY_EXERCISES_INTERNAL, PYTHON_STATS as PY_STATS_INTERNAL } from './python';
import { Exercise, Language, t as translate } from './types';

// Types
export * from './types';

// SQL Exercises
export {
  ALL_SQL_EXERCISES,
  SQL_EXERCISES_BY_CATEGORY,
  SQL_EXERCISES_BY_DIFFICULTY,
  getRandomSQLExercise,
  getSQLExerciseById,
  getSQLExercisesByTag,
  getInterviewSQLExercises,
  SQL_STATS,
  SQL_CATEGORIES,
} from './sql';

// Python Exercises
export {
  ALL_PYTHON_EXERCISES,
  PYTHON_EXERCISES_BY_CATEGORY,
  PYTHON_EXERCISES_BY_DIFFICULTY,
  getRandomPythonExercise,
  getPythonExerciseById,
  getPythonExercisesByTag,
  PYTHON_STATS,
  PYTHON_CATEGORIES,
} from './python';

// Get any exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  if (id.startsWith('sql-')) {
    return SQL_EXERCISES_INTERNAL.find(e => e.id === id);
  }
  if (id.startsWith('py-') || id.startsWith('pd-')) {
    return PY_EXERCISES_INTERNAL.find(e => e.id === id);
  }
  return undefined;
}

// Get random exercise for daily challenge
export function getRandomDailyExercise(type: 'sql' | 'python', difficulty: 'easy' | 'medium' | 'hard'): Exercise {
  const pool = type === 'sql' 
    ? SQL_EXERCISES_INTERNAL.filter(e => e.difficulty === difficulty || (difficulty === 'hard' && e.difficulty === 'expert'))
    : PY_EXERCISES_INTERNAL.filter(e => e.difficulty === difficulty || (difficulty === 'hard' && e.difficulty === 'expert'));
  
  return pool[Math.floor(Math.random() * pool.length)];
}

// Combined statistics
export const EXERCISE_STATS = {
  sql: SQL_STATS_INTERNAL,
  python: PY_STATS_INTERNAL,
  total: SQL_STATS_INTERNAL.total + PY_STATS_INTERNAL.total,
  totalXP: SQL_STATS_INTERNAL.totalXP + PY_STATS_INTERNAL.totalXP,
};

// Re-export translation helper
export const t = translate;
export type { Language };