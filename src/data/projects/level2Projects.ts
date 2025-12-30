import { Project } from '../../types/members';
import { p4_data_warehouse } from './level2/p4_data_warehouse';
import { p6_airflow_orchestration } from './level2/p6_airflow_orchestration';
import { p8_dbt_project } from './level2/p8_dbt_project';
import { p5_aws_pipeline } from './level2/p5_aws_pipeline';
import { p7_data_quality } from './level2/p7_data_quality';
import { p2_spark_processing } from './level2/p2_spark_processing';
import { p2_docker_pipeline } from './level2/p2_docker_pipeline';
import { p2_terraform_infra } from './level2/p2_terraform_infra';
import { p2_sql_optimization } from './level2/p2_sql_optimization';
import { p2_streaming_basics } from './level2/p2_streaming_basics';
import { databricksProject } from './databricksProject';

/**
 * Proyectos Nivel 2: De Junior a SSR
 * 
 * Estos proyectos están diseñados para:
 * - Dominar herramientas profesionales (Airflow, Spark, dbt)
 * - Entender arquitecturas de datos
 * - Prepararte para roles SSR
 */

export const level2Projects: Project[] = [
  p4_data_warehouse,
  p6_airflow_orchestration,
  p8_dbt_project,
  p5_aws_pipeline,
  p7_data_quality,
  p2_spark_processing,
  p2_docker_pipeline,
  p2_terraform_infra,
  p2_sql_optimization,
  p2_streaming_basics,
  databricksProject, // Proyecto de Databricks con dataset streaming
];
