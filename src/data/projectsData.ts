/**
 * Proyectos Data - Re-exportación desde estructura modular
 * 
 * Los proyectos ahora están organizados por nivel en:
 * - src/data/projects/level1Projects.ts
 * - src/data/projects/level2Projects.ts
 * - src/data/projects/level3Projects.ts
 * 
 * Este archivo mantiene compatibilidad con imports existentes.
 */

export { 
  projects, 
  upcomingProjects,
  level1Projects,
  level2Projects,
  level3Projects,
  getProjectsByLevel,
  getProjectById,
} from './projects';