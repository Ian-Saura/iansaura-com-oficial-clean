import { LocalizedContent } from '../types/i18n';

/**
 * Daily Challenges / Misiones Diarias
 * 
 * Sistema de misiones que se resetean cada día
 * Completar las 3 da un bonus de XP
 */

export interface DailyMission {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  icon: string;
  xpReward: number;
  coinsReward: number;
  type: 'steps' | 'videos' | 'projects' | 'datasets' | 'reflection' | 'login' | 'sql_exercise' | 'python_exercise';
  target: number; // Cantidad necesaria para completar
}

export interface Achievement {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  icon: string;
  xpReward: number;
  coinsReward: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirement: {
    type: 'steps' | 'projects' | 'videos' | 'streak' | 'xp' | 'level' | 'login_days' | 'reflections';
    value: number;
  };
  secret?: boolean; // Logros ocultos hasta desbloquearlos
}

// Misiones diarias disponibles (se seleccionan 3 al azar cada día)
export const DAILY_MISSIONS: DailyMission[] = [
  // Pasos
  { 
    id: 'dm-steps-1', 
    title: { es: 'Primer Paso', en: 'First Step', pt: 'Primeiro Passo' }, 
    description: { es: 'Completá 1 paso del roadmap', en: 'Complete 1 roadmap step', pt: 'Complete 1 passo do roadmap' }, 
    icon: '👣', 
    xpReward: 10, 
    coinsReward: 5, 
    type: 'steps', 
    target: 1 
  },
  { 
    id: 'dm-steps-2', 
    title: { es: 'En Marcha', en: 'Moving Forward', pt: 'Em Andamento' }, 
    description: { es: 'Completá 2 pasos del roadmap', en: 'Complete 2 roadmap steps', pt: 'Complete 2 passos do roadmap' }, 
    icon: '🚶', 
    xpReward: 20, 
    coinsReward: 10, 
    type: 'steps', 
    target: 2 
  },
  { 
    id: 'dm-steps-3', 
    title: { es: 'Imparable', en: 'Unstoppable', pt: 'Imparável' }, 
    description: { es: 'Completá 3 pasos del roadmap', en: 'Complete 3 roadmap steps', pt: 'Complete 3 passos do roadmap' }, 
    icon: '🏃', 
    xpReward: 30, 
    coinsReward: 15, 
    type: 'steps', 
    target: 3 
  },
  
  // Videos
  { 
    id: 'dm-video-1', 
    title: { es: 'Cinéfilo', en: 'Movie Buff', pt: 'Cinéfilo' }, 
    description: { es: 'Mirá 1 video del bootcamp', en: 'Watch 1 bootcamp video', pt: 'Assista 1 vídeo do bootcamp' }, 
    icon: '🎬', 
    xpReward: 15, 
    coinsReward: 5, 
    type: 'videos', 
    target: 1 
  },
  { 
    id: 'dm-video-2', 
    title: { es: 'Maratón', en: 'Marathon', pt: 'Maratona' }, 
    description: { es: 'Mirá 2 videos del bootcamp', en: 'Watch 2 bootcamp videos', pt: 'Assista 2 vídeos do bootcamp' }, 
    icon: '📺', 
    xpReward: 30, 
    coinsReward: 10, 
    type: 'videos', 
    target: 2 
  },
  
  // Proyectos
  { 
    id: 'dm-project', 
    title: { es: 'Builder', en: 'Builder', pt: 'Construtor' }, 
    description: { es: 'Avanzá en un proyecto', en: 'Advance in a project', pt: 'Avance em um projeto' }, 
    icon: '🔨', 
    xpReward: 25, 
    coinsReward: 15, 
    type: 'projects', 
    target: 1 
  },
  
  // Datasets
  { 
    id: 'dm-dataset', 
    title: { es: 'Data Explorer', en: 'Data Explorer', pt: 'Explorador de Dados' }, 
    description: { es: 'Generá un dataset', en: 'Generate a dataset', pt: 'Gere um dataset' }, 
    icon: '📊', 
    xpReward: 10, 
    coinsReward: 5, 
    type: 'datasets', 
    target: 1 
  },
  
  // Reflexiones
  { 
    id: 'dm-reflection', 
    title: { es: 'Pensador', en: 'Thinker', pt: 'Pensador' }, 
    description: { es: 'Completá una reflexión', en: 'Complete a reflection', pt: 'Complete uma reflexão' }, 
    icon: '💭', 
    xpReward: 15, 
    coinsReward: 5, 
    type: 'reflection', 
    target: 1 
  },
  
  // Login
  { 
    id: 'dm-login', 
    title: { es: 'Constante', en: 'Consistent', pt: 'Constante' }, 
    description: { es: 'Entrá a la plataforma', en: 'Log in to the platform', pt: 'Entre na plataforma' }, 
    icon: '✅', 
    xpReward: 5, 
    coinsReward: 2, 
    type: 'login', 
    target: 1 
  },
  
  // SQL Exercises
  { 
    id: 'dm-sql-1', 
    title: { es: 'SQL Rookie', en: 'SQL Rookie', pt: 'Novato em SQL' }, 
    description: { es: 'Completá 1 ejercicio de SQL', en: 'Complete 1 SQL exercise', pt: 'Complete 1 exercício de SQL' }, 
    icon: '🗃️', 
    xpReward: 15, 
    coinsReward: 8, 
    type: 'sql_exercise', 
    target: 1 
  },
  { 
    id: 'dm-sql-2', 
    title: { es: 'SQL Master', en: 'SQL Master', pt: 'Mestre em SQL' }, 
    description: { es: 'Completá 3 ejercicios de SQL', en: 'Complete 3 SQL exercises', pt: 'Complete 3 exercícios de SQL' }, 
    icon: '💎', 
    xpReward: 40, 
    coinsReward: 20, 
    type: 'sql_exercise', 
    target: 3 
  },
  { 
    id: 'dm-sql-3', 
    title: { es: 'SQL Legend', en: 'SQL Legend', pt: 'Lenda do SQL' }, 
    description: { es: 'Completá 5 ejercicios de SQL', en: 'Complete 5 SQL exercises', pt: 'Complete 5 exercícios de SQL' }, 
    icon: '👑', 
    xpReward: 75, 
    coinsReward: 35, 
    type: 'sql_exercise', 
    target: 5 
  },
  
  // Python Exercises
  { 
    id: 'dm-py-1', 
    title: { es: 'Python Newbie', en: 'Python Newbie', pt: 'Novato em Python' }, 
    description: { es: 'Completá 1 ejercicio de Python', en: 'Complete 1 Python exercise', pt: 'Complete 1 exercício de Python' }, 
    icon: '🐍', 
    xpReward: 15, 
    coinsReward: 8, 
    type: 'python_exercise', 
    target: 1 
  },
  { 
    id: 'dm-py-2', 
    title: { es: 'Pythonista', en: 'Pythonista', pt: 'Pythonista' }, 
    description: { es: 'Completá 3 ejercicios de Python', en: 'Complete 3 Python exercises', pt: 'Complete 3 exercícios de Python' }, 
    icon: '🔥', 
    xpReward: 40, 
    coinsReward: 20, 
    type: 'python_exercise', 
    target: 3 
  },
  { 
    id: 'dm-py-3', 
    title: { es: 'Python Guru', en: 'Python Guru', pt: 'Guru de Python' }, 
    description: { es: 'Completá 5 ejercicios de Python', en: 'Complete 5 Python exercises', pt: 'Complete 5 exercícios de Python' }, 
    icon: '🧙', 
    xpReward: 75, 
    coinsReward: 35, 
    type: 'python_exercise', 
    target: 5 
  },
];

// Bonus por completar las 3 misiones diarias
export const DAILY_BONUS = {
  xp: 50,
  coins: 25,
  title: { es: '🎯 ¡Misiones Completadas!', en: '🎯 Missions Completed!', pt: '🎯 Missões Completadas!' },
  description: { es: 'Completaste las 3 misiones del día', en: 'You completed all 3 daily missions', pt: 'Você completou as 3 missões diárias' }
};

// Sistema de Logros
export const ACHIEVEMENTS: Achievement[] = [
  // ============================================
  // COMMON - Primeros pasos
  // ============================================
  { 
    id: 'ach-first-step', 
    title: { es: 'Primera Sangre', en: 'First Blood', pt: 'Primeiro Sangue' }, 
    description: { es: 'Completaste tu primer paso', en: 'Completed your first step', pt: 'Completou seu primeiro passo' }, 
    icon: '🩸', 
    xpReward: 25, 
    coinsReward: 10, 
    rarity: 'common',
    requirement: { type: 'steps', value: 1 }
  },
  { 
    id: 'ach-5-steps', 
    title: { es: 'Calentando Motores', en: 'Warming Up', pt: 'Aquecendo os Motores' }, 
    description: { es: 'Completaste 5 pasos', en: 'Completed 5 steps', pt: 'Completou 5 passos' }, 
    icon: '🔥', 
    xpReward: 50, 
    coinsReward: 20, 
    rarity: 'common',
    requirement: { type: 'steps', value: 5 }
  },
  { 
    id: 'ach-first-video', 
    title: { es: 'Espectador', en: 'Viewer', pt: 'Espectador' }, 
    description: { es: 'Viste tu primer video', en: 'Watched your first video', pt: 'Assistiu ao seu primeiro vídeo' }, 
    icon: '👀', 
    xpReward: 20, 
    coinsReward: 10, 
    rarity: 'common',
    requirement: { type: 'videos', value: 1 }
  },
  { 
    id: 'ach-first-reflection', 
    title: { es: 'Filósofo', en: 'Philosopher', pt: 'Filósofo' }, 
    description: { es: 'Completaste tu primera reflexión', en: 'Completed your first reflection', pt: 'Completou sua primeira reflexão' }, 
    icon: '🤔', 
    xpReward: 15, 
    coinsReward: 5, 
    rarity: 'common',
    requirement: { type: 'reflections', value: 1 }
  },

  // ============================================
  // RARE - Progreso constante
  // ============================================
  { 
    id: 'ach-10-steps', 
    title: { es: 'Estudiante Dedicado', en: 'Dedicated Student', pt: 'Estudante Dedicado' }, 
    description: { es: 'Completaste 10 pasos', en: 'Completed 10 steps', pt: 'Completou 10 passos' }, 
    icon: '📚', 
    xpReward: 100, 
    coinsReward: 50, 
    rarity: 'rare',
    requirement: { type: 'steps', value: 10 }
  },
  { 
    id: 'ach-25-steps', 
    title: { es: 'En Racha', en: 'On a Roll', pt: 'Em Sequência' }, 
    description: { es: 'Completaste 25 pasos', en: 'Completed 25 steps', pt: 'Completou 25 passos' }, 
    icon: '⚡', 
    xpReward: 200, 
    coinsReward: 100, 
    rarity: 'rare',
    requirement: { type: 'steps', value: 25 }
  },
  { 
    id: 'ach-first-project', 
    title: { es: 'Constructor', en: 'Builder', pt: 'Construtor' }, 
    description: { es: 'Completaste tu primer proyecto', en: 'Completed your first project', pt: 'Completou seu primeiro projeto' }, 
    icon: '🏗️', 
    xpReward: 150, 
    coinsReward: 75, 
    rarity: 'rare',
    requirement: { type: 'projects', value: 1 }
  },
  { 
    id: 'ach-3-videos', 
    title: { es: 'Binge Watcher', en: 'Binge Watcher', pt: 'Binge Watcher' }, 
    description: { es: 'Viste 3 videos', en: 'Watched 3 videos', pt: 'Assistiu 3 vídeos' }, 
    icon: '📺', 
    xpReward: 75, 
    coinsReward: 30, 
    rarity: 'rare',
    requirement: { type: 'videos', value: 3 }
  },
  { 
    id: 'ach-streak-7', 
    title: { es: 'Semana Perfecta', en: 'Perfect Week', pt: 'Semana Perfeita' }, 
    description: { es: '7 días de streak', en: '7 day streak', pt: 'Sequência de 7 dias' }, 
    icon: '📅', 
    xpReward: 150, 
    coinsReward: 75, 
    rarity: 'rare',
    requirement: { type: 'streak', value: 7 }
  },
  { 
    id: 'ach-100-xp', 
    title: { es: 'Centenario', en: 'Centurion', pt: 'Centenário' }, 
    description: { es: 'Acumulaste 100 XP', en: 'Accumulated 100 XP', pt: 'Acumulou 100 XP' }, 
    icon: '💯', 
    xpReward: 50, 
    coinsReward: 25, 
    rarity: 'rare',
    requirement: { type: 'xp', value: 100 }
  },

  // ============================================
  // EPIC - Logros importantes
  // ============================================
  { 
    id: 'ach-50-steps', 
    title: { es: 'Medio Camino', en: 'Halfway There', pt: 'Meio Caminho' }, 
    description: { es: 'Completaste 50 pasos', en: 'Completed 50 steps', pt: 'Completou 50 passos' }, 
    icon: '🎯', 
    xpReward: 400, 
    coinsReward: 200, 
    rarity: 'epic',
    requirement: { type: 'steps', value: 50 }
  },
  { 
    id: 'ach-3-projects', 
    title: { es: 'Project Master', en: 'Project Master', pt: 'Mestre de Projetos' }, 
    description: { es: 'Completaste 3 proyectos', en: 'Completed 3 projects', pt: 'Completou 3 projetos' }, 
    icon: '🚀', 
    xpReward: 300, 
    coinsReward: 150, 
    rarity: 'epic',
    requirement: { type: 'projects', value: 3 }
  },
  { 
    id: 'ach-all-videos', 
    title: { es: 'Maratonista', en: 'Marathoner', pt: 'Maratonista' }, 
    description: { es: 'Viste los 8 videos del bootcamp', en: 'Watched all 8 bootcamp videos', pt: 'Assistiu aos 8 vídeos do bootcamp' }, 
    icon: '🏆', 
    xpReward: 250, 
    coinsReward: 125, 
    rarity: 'epic',
    requirement: { type: 'videos', value: 8 }
  },
  { 
    id: 'ach-streak-30', 
    title: { es: 'Imparable', en: 'Unstoppable', pt: 'Imparável' }, 
    description: { es: '30 días de streak', en: '30 day streak', pt: 'Sequência de 30 dias' }, 
    icon: '🔥', 
    xpReward: 500, 
    coinsReward: 250, 
    rarity: 'epic',
    requirement: { type: 'streak', value: 30 }
  },
  { 
    id: 'ach-500-xp', 
    title: { es: 'Veterano', en: 'Veteran', pt: 'Veterano' }, 
    description: { es: 'Acumulaste 500 XP', en: 'Accumulated 500 XP', pt: 'Acumulou 500 XP' }, 
    icon: '⭐', 
    xpReward: 100, 
    coinsReward: 50, 
    rarity: 'epic',
    requirement: { type: 'xp', value: 500 }
  },

  // ============================================
  // LEGENDARY - Élite
  // ============================================
  { 
    id: 'ach-100-steps', 
    title: { es: 'Centurión', en: 'Centurion', pt: 'Centurião' }, 
    description: { es: 'Completaste 100 pasos', en: 'Completed 100 steps', pt: 'Completou 100 passos' }, 
    icon: '🏛️', 
    xpReward: 1000, 
    coinsReward: 500, 
    rarity: 'legendary',
    requirement: { type: 'steps', value: 100 }
  },
  { 
    id: 'ach-5-projects', 
    title: { es: 'Arquitecto', en: 'Architect', pt: 'Arquiteto' }, 
    description: { es: 'Completaste 5 proyectos', en: 'Completed 5 projects', pt: 'Completou 5 projetos' }, 
    icon: '👑', 
    xpReward: 750, 
    coinsReward: 400, 
    rarity: 'legendary',
    requirement: { type: 'projects', value: 5 }
  },
  { 
    id: 'ach-streak-60', 
    title: { es: 'Leyenda', en: 'Legend', pt: 'Lenda' }, 
    description: { es: '60 días de streak', en: '60 day streak', pt: 'Sequência de 60 dias' }, 
    icon: '🌟', 
    xpReward: 1000, 
    coinsReward: 500, 
    rarity: 'legendary',
    requirement: { type: 'streak', value: 60 }
  },
  { 
    id: 'ach-1000-xp', 
    title: { es: 'Maestro', en: 'Master', pt: 'Mestre' }, 
    description: { es: 'Acumulaste 1000 XP', en: 'Accumulated 1000 XP', pt: 'Acumulou 1000 XP' }, 
    icon: '🎖️', 
    xpReward: 250, 
    coinsReward: 150, 
    rarity: 'legendary',
    requirement: { type: 'xp', value: 1000 }
  },
  
  // ============================================
  // SECRETOS
  // ============================================
  { 
    id: 'ach-night-owl', 
    title: { es: 'Búho Nocturno', en: 'Night Owl', pt: 'Coruja Noturna' }, 
    description: { es: 'Estudiaste después de medianoche', en: 'Studied after midnight', pt: 'Estudou depois da meia-noite' }, 
    icon: '🦉', 
    xpReward: 50, 
    coinsReward: 25, 
    rarity: 'rare',
    requirement: { type: 'login_days', value: 1 },
    secret: true
  },
  { 
    id: 'ach-early-bird', 
    title: { es: 'Madrugador', en: 'Early Bird', pt: 'Madrugador' }, 
    description: { es: 'Estudiaste antes de las 7am', en: 'Studied before 7am', pt: 'Estudou antes das 7h' }, 
    icon: '🐦', 
    xpReward: 50, 
    coinsReward: 25, 
    rarity: 'rare',
    requirement: { type: 'login_days', value: 1 },
    secret: true
  },
];

// Helper para obtener las misiones del día
export function getTodaysMissions(): DailyMission[] {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  
  // Usar el seed para seleccionar 3 misiones "aleatorias" pero consistentes para el día
  const shuffled = [...DAILY_MISSIONS].sort((a, b) => {
    const hashA = (seed * a.id.charCodeAt(3)) % 1000;
    const hashB = (seed * b.id.charCodeAt(3)) % 1000;
    return hashA - hashB;
  });
  
  // Asegurar variedad: al menos una de cada tipo principal
  const stepMission = shuffled.find(m => m.type === 'steps');
  const otherMissions = shuffled.filter(m => m.type !== 'steps' && m.id !== stepMission?.id).slice(0, 2);
  
  return stepMission ? [stepMission, ...otherMissions] : shuffled.slice(0, 3);
}

// Helper para verificar si un logro está desbloqueado
export function checkAchievementUnlocked(
  achievement: Achievement, 
  stats: { 
    steps: number; 
    projects: number; 
    videos: number; 
    streak: number; 
    xp: number;
    reflections: number;
  }
): boolean {
  const { type, value } = achievement.requirement;
  
  switch (type) {
    case 'steps': return stats.steps >= value;
    case 'projects': return stats.projects >= value;
    case 'videos': return stats.videos >= value;
    case 'streak': return stats.streak >= value;
    case 'xp': return stats.xp >= value;
    case 'reflections': return stats.reflections >= value;
    case 'login_days': return true; // Estos se manejan de forma especial
    case 'level': return false; // TODO: implementar
    default: return false;
  }
}