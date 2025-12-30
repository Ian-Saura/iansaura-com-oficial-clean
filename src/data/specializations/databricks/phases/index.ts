import { DatabricksPhase } from '../types';
import { PHASE_1_SETUP } from './phase1-setup';
import { PHASE_2_ARCHITECTURE } from './phase2-architecture';
import { PHASE_3_SPARK_BASICS } from './phase3-spark-basics';
import { PHASE_4_SPARK_ADVANCED } from './phase4-spark-advanced';
import { PHASE_5_DELTA_LAKE } from './phase5-delta-lake';
import { PHASE_6_UNITY_CATALOG } from './phase6-unity-catalog';
import { PHASE_7_WORKFLOWS } from './phase7-workflows';
import { PHASE_8_DLT } from './phase8-dlt';
import { DATABRICKS_PHASES_9_12_FINAL } from './phase9-12-final';

/**
 * Todas las fases de la especialización Databricks
 * 12 fases con 100+ pasos en total
 */
export const ALL_DATABRICKS_PHASES: DatabricksPhase[] = [
  PHASE_1_SETUP,
  PHASE_2_ARCHITECTURE,
  PHASE_3_SPARK_BASICS,
  PHASE_4_SPARK_ADVANCED,
  PHASE_5_DELTA_LAKE,
  PHASE_6_UNITY_CATALOG,
  PHASE_7_WORKFLOWS,
  PHASE_8_DLT,
  ...DATABRICKS_PHASES_9_12_FINAL
];

// Calcula estadísticas del roadmap
export const PHASE_STATS = {
  totalPhases: ALL_DATABRICKS_PHASES.length,
  totalSteps: ALL_DATABRICKS_PHASES.reduce((acc, phase) => acc + phase.steps.length, 0),
  stepsByPhase: ALL_DATABRICKS_PHASES.map(phase => ({
    id: phase.id,
    title: phase.title,
    steps: phase.steps.length
  }))
};

// Re-exportar fases individuales
export { PHASE_1_SETUP } from './phase1-setup';
export { PHASE_2_ARCHITECTURE } from './phase2-architecture';
export { PHASE_3_SPARK_BASICS } from './phase3-spark-basics';
export { PHASE_4_SPARK_ADVANCED } from './phase4-spark-advanced';
export { PHASE_5_DELTA_LAKE } from './phase5-delta-lake';
export { PHASE_6_UNITY_CATALOG } from './phase6-unity-catalog';
export { PHASE_7_WORKFLOWS } from './phase7-workflows';
export { PHASE_8_DLT } from './phase8-dlt';
export { DATABRICKS_PHASES_9_12_FINAL } from './phase9-12-final';
