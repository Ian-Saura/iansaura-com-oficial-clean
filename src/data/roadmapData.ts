import { RoadmapLevel, Specialization } from '../types/members';
import { level0 } from './roadmap/level0';
import { level1_part1 } from './roadmap/level1_part1';
import { level1_part2 } from './roadmap/level1_part2';
import { level2 } from './roadmap/level2';
import { level3 } from './roadmap/level3';
import { specializations as specs } from './roadmap/specializations';

/**
 * Datos del Roadmap - 3 Niveles
 * 
 * IDs deben ser únicos: l{nivel}-{fase}-{seccion}-{step}
 */

// Merge level 1 parts
const level1: RoadmapLevel = {
  ...level1_part1,
  // Ensure phases are merged correctly
  phases: [
    ...(level1_part1.phases || []),
    ...(level1_part2.phases || [])
  ]
} as RoadmapLevel;

export const roadmapLevels: RoadmapLevel[] = [
  level0,
  level1,
  level2 as RoadmapLevel,
  level3 as RoadmapLevel,
];

export const specializations: Specialization[] = specs;

/**
 * Get all step IDs for a given level
 */
export function getLevelStepIds(levelNum: number): string[] {
  const level = roadmapLevels.find(l => l.level === levelNum);
  if (!level) return [];
  
  const stepIds: string[] = [];
  for (const phase of level.phases) {
    for (const section of phase.sections) {
      for (const step of section.steps) {
        stepIds.push(step.id);
      }
    }
  }
  return stepIds;
}
