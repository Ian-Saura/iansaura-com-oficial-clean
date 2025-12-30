/**
 * FREEMIUM CONFIGURATION
 * Defines what free users can access vs premium users
 */

// ============ FREE TIER LIMITS ============

export const FREEMIUM_CONFIG = {
  // Roadmaps: Only Level 0 complete, Level 1 phases 1-2
  roadmaps: {
    freeAccess: {
      level0: 'full',      // Complete access
      level1: 'partial',   // Only phases 1-2
      level2: 'locked',    // Fully locked
      level3: 'locked',    // Fully locked
    },
    level1FreePhasesLimit: 2, // Can access phases 0, 1, 2 (first 3)
  },

  // SQL Exercises: 5 Easy exercises free
  sqlExercises: {
    freeLimit: 5,
    freeExerciseIds: [
      'sql-easy-1',   // SELECT basics
      'sql-easy-2',   // WHERE clause
      'sql-easy-3',   // ORDER BY
      'sql-easy-4',   // COUNT/SUM
      'sql-easy-5',   // GROUP BY intro
    ],
    // Alternative: allow any 5 Easy exercises
    allowAnyEasy: true,
    maxEasyForFree: 5,
  },

  // Python Exercises: 5 Easy exercises free
  pythonExercises: {
    freeLimit: 5,
    freeExerciseIds: [
      'py-b1',        // List comprehension
      'py-b2',        // Count frequencies
      'py-b3',        // Filter even numbers
      'py-b4',        // String reverse
      'py-b5',        // Find duplicates
    ],
    allowAnyEasy: true,
    maxEasyForFree: 5,
  },

  // Projects: Can see description but not the guide
  projects: {
    freeAccess: 'preview', // 'preview' = see description only, 'locked' = can't see at all
    freeProjectIds: [], // No free full access to any project
  },

  // System Design: 1 interview fully readable
  systemDesign: {
    freeLimit: 1,
    freeInterviewIds: [
      'sd-ecommerce-pipeline', // E-commerce Data Pipeline - most attractive
    ],
  },

  // Behavioral: 2 questions fully readable  
  behavioral: {
    freeLimit: 2,
    freeQuestionIds: [
      'bq-conflict-1',  // "Tell me about a time you disagreed with a coworker"
      'bq-success-1',   // "Tell me about your biggest achievement"
    ],
  },

  // Mock Interview: Fully locked
  mockInterview: {
    freeAccess: false,
  },

  // Saurio AI: Limited questions per day
  saurio: {
    freeQuestionsPerDay: 3,
    premiumQuestionsPerDay: Infinity, // Unlimited
  },

  // Energy System
  energy: {
    freeMaxEnergy: 10,
    freeEnergyPerDay: 10,
    premiumMaxEnergy: 100,
    premiumEnergyPerDay: 100,
    // Energy costs
    exerciseCost: 1,
    projectStepCost: 2,
    systemDesignCost: 3,
    mockInterviewCost: 10,
  },

  // Datasets: Only e-commerce for free
  datasets: {
    freeDatasetIds: ['ecommerce'],
    allDatasetsForPremium: true,
  },

  // Certificates: Locked for free
  certificates: {
    freeAccess: false,
  },

  // Leaderboard: View only for free
  leaderboard: {
    freeCanView: true,
    freeCanParticipate: false,
  },

  // Recordings: Limited for free
  recordings: {
    freeLimit: 2, // Can watch 2 recordings
    freeRecordingIds: [], // Or specific IDs
  },
};

// ============ HELPER FUNCTIONS ============

/**
 * Check if user is premium (has active subscription or trial)
 */
export const isPremiumUser = (user: {
  subscription_status?: string;
  trial_end?: string;
  is_invited?: boolean;
  oneinfinite_subscriber?: boolean;
}): boolean => {
  if (!user) return false;
  
  // Invited users are premium
  if (user.is_invited) return true;
  
  // OneInfinite subscribers are premium
  if (user.oneinfinite_subscriber) return true;
  
  // Active subscription
  if (user.subscription_status === 'active' || user.subscription_status === 'trialing') {
    return true;
  }
  
  // Check if trial is still valid
  if (user.trial_end) {
    const trialEnd = new Date(user.trial_end);
    if (trialEnd > new Date()) {
      return true;
    }
  }
  
  return false;
};

/**
 * Check if a specific exercise is free
 */
export const isExerciseFree = (
  exerciseId: string,
  exerciseType: 'sql' | 'python',
  exerciseDifficulty: string,
  completedCount: number
): boolean => {
  const config = exerciseType === 'sql' 
    ? FREEMIUM_CONFIG.sqlExercises 
    : FREEMIUM_CONFIG.pythonExercises;
  
  // If it's in the free list, it's free
  if (config.freeExerciseIds.includes(exerciseId)) {
    return true;
  }
  
  // If we allow any Easy and haven't exceeded limit
  if (config.allowAnyEasy && exerciseDifficulty === 'easy') {
    return completedCount < config.maxEasyForFree;
  }
  
  return false;
};

/**
 * Check if a roadmap phase is accessible
 */
export const isRoadmapPhaseAccessible = (
  level: number,
  phaseIndex: number,
  isPremium: boolean
): boolean => {
  if (isPremium) return true;
  
  const config = FREEMIUM_CONFIG.roadmaps;
  
  if (level === 0) return true; // Level 0 always free
  if (level === 1) return phaseIndex <= config.level1FreePhasesLimit;
  return false; // Level 2, 3 locked for free
};

/**
 * Check if System Design interview is accessible
 */
export const isSystemDesignFree = (interviewId: string): boolean => {
  return FREEMIUM_CONFIG.systemDesign.freeInterviewIds.includes(interviewId);
};

/**
 * Check if Behavioral question is accessible
 */
export const isBehavioralFree = (questionId: string): boolean => {
  return FREEMIUM_CONFIG.behavioral.freeQuestionIds.includes(questionId);
};

/**
 * Check if dataset is accessible
 */
export const isDatasetFree = (datasetId: string): boolean => {
  return FREEMIUM_CONFIG.datasets.freeDatasetIds.includes(datasetId);
};

/**
 * Get remaining Saurio questions for the day
 */
export const getSaurioQuestionsRemaining = (
  isPremium: boolean,
  questionsUsedToday: number
): number => {
  const limit = isPremium 
    ? FREEMIUM_CONFIG.saurio.premiumQuestionsPerDay 
    : FREEMIUM_CONFIG.saurio.freeQuestionsPerDay;
  
  return Math.max(0, limit - questionsUsedToday);
};

/**
 * Check if user can use Saurio
 */
export const canUseSaurio = (
  isPremium: boolean,
  questionsUsedToday: number
): boolean => {
  return getSaurioQuestionsRemaining(isPremium, questionsUsedToday) > 0;
};

// ============ UI MESSAGES ============

export const FREEMIUM_MESSAGES = {
  es: {
    upgradeTitle: '🔒 Contenido Premium',
    upgradeDescription: 'Desbloqueá acceso completo por solo $30/mes',
    upgradeButton: 'Suscribirme Ahora',
    saurioLimit: 'Saurio: {remaining} preguntas restantes hoy',
    saurioLimitReached: 'Llegaste al límite de preguntas de Saurio hoy. Vuelve mañana o hacete premium.',
    exerciseLimit: 'Ejercicio premium. Suscribite para desbloquearlo.',
    roadmapLocked: 'Este nivel está bloqueado. Suscribite para continuar.',
    energyLow: 'Te queda poca energía. Esperá a mañana o hacete premium.',
  },
  en: {
    upgradeTitle: '🔒 Premium Content',
    upgradeDescription: 'Unlock full access for just $30/month',
    upgradeButton: 'Subscribe Now',
    saurioLimit: 'Saurio: {remaining} questions left today',
    saurioLimitReached: 'You reached Saurio\'s question limit for today. Come back tomorrow or go premium.',
    exerciseLimit: 'Premium exercise. Subscribe to unlock.',
    roadmapLocked: 'This level is locked. Subscribe to continue.',
    energyLow: 'Low energy. Wait until tomorrow or go premium.',
  },
  pt: {
    upgradeTitle: '🔒 Conteúdo Premium',
    upgradeDescription: 'Desbloqueie acesso completo por apenas $30/mês',
    upgradeButton: 'Assinar Agora',
    saurioLimit: 'Saurio: {remaining} perguntas restantes hoje',
    saurioLimitReached: 'Você atingiu o limite de perguntas do Saurio hoje. Volte amanhã ou seja premium.',
    exerciseLimit: 'Exercício premium. Assine para desbloquear.',
    roadmapLocked: 'Este nível está bloqueado. Assine para continuar.',
    energyLow: 'Energia baixa. Espere até amanhã ou seja premium.',
  },
};






