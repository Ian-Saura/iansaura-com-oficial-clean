import { DatabricksExercise } from '../types';
import { DATABRICKS_EXERCISES_SPARK_BASICS } from './spark-basics';
import { DATABRICKS_EXERCISES_DELTA_LAKE } from './delta-lake';

/**
 * Todos los ejercicios de la especialización Databricks
 * Total: 20 ejercicios (10 Spark + 10 Delta Lake)
 * 
 * ACTUALIZADO: Enero 2026 - Compatibles con Free Edition
 * - Todos los ejercicios usan Python y SQL (lenguajes disponibles en Free Edition)
 * - Diseñados para funcionar con serverless compute
 * - Delta Lake y Unity Catalog ahora disponibles gratis
 */
export const ALL_DATABRICKS_EXERCISES: DatabricksExercise[] = [
  ...DATABRICKS_EXERCISES_SPARK_BASICS,
  ...DATABRICKS_EXERCISES_DELTA_LAKE
];

// Ejercicios por categoría
export const DATABRICKS_EXERCISES_BY_CATEGORY = {
  sparkBasics: DATABRICKS_EXERCISES_SPARK_BASICS,
  deltaLake: DATABRICKS_EXERCISES_DELTA_LAKE
};

// Ejercicios por dificultad
export const DATABRICKS_EXERCISES_BY_DIFFICULTY = {
  easy: ALL_DATABRICKS_EXERCISES.filter(e => e.difficulty === 'easy'),
  medium: ALL_DATABRICKS_EXERCISES.filter(e => e.difficulty === 'medium'),
  hard: ALL_DATABRICKS_EXERCISES.filter(e => e.difficulty === 'hard')
};

// Estadísticas de ejercicios
export const EXERCISE_STATS = {
  total: ALL_DATABRICKS_EXERCISES.length,
  byDifficulty: {
    easy: DATABRICKS_EXERCISES_BY_DIFFICULTY.easy.length,
    medium: DATABRICKS_EXERCISES_BY_DIFFICULTY.medium.length,
    hard: DATABRICKS_EXERCISES_BY_DIFFICULTY.hard.length
  },
  byCategory: {
    sparkBasics: DATABRICKS_EXERCISES_SPARK_BASICS.length,
    deltaLake: DATABRICKS_EXERCISES_DELTA_LAKE.length
  }
};

// Re-exportar para acceso directo
export { DATABRICKS_EXERCISES_SPARK_BASICS } from './spark-basics';
export { DATABRICKS_EXERCISES_DELTA_LAKE } from './delta-lake';
