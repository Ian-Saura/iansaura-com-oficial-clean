import { Project } from '../../types/members';
import { p9SystemDesign } from './level3/p9_system_design';
import { p10MentoringDoc } from './level3/p10_mentoring_doc';
import { p11CodeReviewGuide } from './level3/p11_code_review_guide';
import { p12IncidentPostmortem } from './level3/p12_incident_postmortem';
import { p3DataMesh } from './level3/p3_data_mesh';
import { p3KafkaStreaming } from './level3/p3_kafka_streaming';
import { p3PerformanceTuning } from './level3/p3_performance_tuning';
import { p3DataLakeDesign } from './level3/p3_data_lake_design';
import { p3MonitoringAlerting } from './level3/p3_monitoring_alerting';

/**
 * Proyectos Nivel 3: Ser Senior
 * 
 * Estos proyectos están diseñados para:
 * - Diseñar sistemas a escala
 * - Liderar técnicamente
 * - Resolver problemas complejos
 * - Demostrar criterio de Senior
 */

export const level3Projects: Project[] = [
  p9SystemDesign,
  p10MentoringDoc,
  p11CodeReviewGuide,
  p12IncidentPostmortem,
  p3DataMesh,
  p3KafkaStreaming,
  p3PerformanceTuning,
  p3DataLakeDesign,
  p3MonitoringAlerting
];

export {
  p9SystemDesign,
  p10MentoringDoc,
  p11CodeReviewGuide,
  p12IncidentPostmortem,
  p3DataMesh,
  p3KafkaStreaming,
  p3PerformanceTuning,
  p3DataLakeDesign,
  p3MonitoringAlerting
};
