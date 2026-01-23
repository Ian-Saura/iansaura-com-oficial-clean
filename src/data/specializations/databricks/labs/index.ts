/**
 * DATABRICKS LABS
 * ===============
 * 
 * Mini-labs guiados que integran los conceptos del roadmap
 * Diseñados para usar con Databricks Free Edition (GRATIS)
 * 
 * ACTUALIZADO: Enero 2026 - Free Edition
 * - Todos los labs usan serverless compute (automático)
 * - Solo Python y SQL (no R/Scala)
 * - Unity Catalog y DLT ahora disponibles gratis
 * 
 * Estructura de cada lab:
 * - Objetivo claro
 * - Prerrequisitos
 * - Pasos detallados con código
 * - Checkpoints de validación
 * - XP rewards
 */

import { DatabricksLab } from './types';
import { DATABRICKS_LABS_FUNDAMENTALS } from './fundamentals';
import { DATABRICKS_LABS_DELTA_LAKE } from './delta-lake';
import { DATABRICKS_LABS_ETL } from './etl-pipelines';
import { DATABRICKS_LABS_ADVANCED } from './advanced';

/**
 * Todos los labs de Databricks
 */
export const ALL_DATABRICKS_LABS: DatabricksLab[] = [
  ...DATABRICKS_LABS_FUNDAMENTALS,
  ...DATABRICKS_LABS_DELTA_LAKE,
  ...DATABRICKS_LABS_ETL,
  ...DATABRICKS_LABS_ADVANCED
];

/**
 * Labs por categoría
 */
export const DATABRICKS_LABS_BY_CATEGORY = {
  fundamentals: DATABRICKS_LABS_FUNDAMENTALS,
  deltaLake: DATABRICKS_LABS_DELTA_LAKE,
  etlPipelines: DATABRICKS_LABS_ETL,
  advanced: DATABRICKS_LABS_ADVANCED
};

/**
 * Labs por dificultad
 */
export const DATABRICKS_LABS_BY_DIFFICULTY = {
  beginner: ALL_DATABRICKS_LABS.filter(l => l.difficulty === 'beginner'),
  intermediate: ALL_DATABRICKS_LABS.filter(l => l.difficulty === 'intermediate'),
  advanced: ALL_DATABRICKS_LABS.filter(l => l.difficulty === 'advanced')
};

/**
 * Estadísticas de labs
 */
export const LABS_STATS = {
  total: ALL_DATABRICKS_LABS.length,
  totalSteps: ALL_DATABRICKS_LABS.reduce((acc, lab) => acc + lab.steps.length, 0),
  totalMinutes: ALL_DATABRICKS_LABS.reduce((acc, lab) => acc + lab.estimatedMinutes, 0),
  byDifficulty: {
    beginner: DATABRICKS_LABS_BY_DIFFICULTY.beginner.length,
    intermediate: DATABRICKS_LABS_BY_DIFFICULTY.intermediate.length,
    advanced: DATABRICKS_LABS_BY_DIFFICULTY.advanced.length
  },
  byCategory: {
    fundamentals: DATABRICKS_LABS_FUNDAMENTALS.length,
    deltaLake: DATABRICKS_LABS_DELTA_LAKE.length,
    etlPipelines: DATABRICKS_LABS_ETL.length,
    advanced: DATABRICKS_LABS_ADVANCED.length
  }
};

// Re-exportar tipos y labs individuales
export * from './types';
export { DATABRICKS_LABS_FUNDAMENTALS } from './fundamentals';
export { DATABRICKS_LABS_DELTA_LAKE } from './delta-lake';
export { DATABRICKS_LABS_ETL } from './etl-pipelines';
export { DATABRICKS_LABS_ADVANCED } from './advanced';

// Helper para obtener lab por ID
export const getDatabricksLabById = (labId: string) => {
  return ALL_DATABRICKS_LABS.find(lab => lab.id === labId);
};

// Helper para obtener labs de una fase específica
export const getLabsByPhase = (phaseId: string) => {
  return ALL_DATABRICKS_LABS.filter(lab => lab.relatedPhases.includes(phaseId));
};

