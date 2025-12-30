import { Project } from '../../types/members';
import { p1_etl_python } from './level1/p1_etl_python';
import { p2_sql_logs } from './level1/p2_sql_logs';
import { p3_api_pipeline } from './level1/p3_api_pipeline';
import { p1_extra_sql_joins } from './level1/p1_extra_sql_joins';
import { p1_extra_window_functions } from './level1/p1_extra_window_functions';
import { p1_extra_python_cleaning } from './level1/p1_extra_python_cleaning';

/**
 * Proyectos Nivel 1: Conseguir tu Primer Trabajo
 * 
 * Estos proyectos están diseñados para:
 * - Construir las bases técnicas fundamentales
 * - Crear portfolio para mostrar en entrevistas
 * - Practicar con datos reales
 */

export const level1Projects: Project[] = [
  p1_etl_python,
  p2_sql_logs,
  p3_api_pipeline,
  p1_extra_sql_joins,
  p1_extra_window_functions,
  p1_extra_python_cleaning
];
