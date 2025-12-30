import { useState, useEffect, useCallback } from 'react';
import { UserProgress, REWARDS, USER_RANKS, UserRankInfo, SHOP_ITEMS } from '../types/members';
import { logger } from '../utils/logger';

const STORAGE_KEY = 'ian-saura-user-progress';

const defaultProgress: UserProgress = {
  completedSteps: [],
  completedProjects: [],
  completedProjectSteps: {},
  watchedVideos: [],
  textInputs: {},
  lastUpdated: new Date().toISOString(),
  // Sistema de economía
  totalXP: 0,
  dataCoins: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: '',
  activityDates: [], // Historial de fechas únicas de actividad
  purchasedItems: [],
  equippedAvatar: undefined,
  equippedBadge: undefined,
  equippedTitle: undefined,
  achievements: [],
  coinsPurchased: 0,
  // Ejercicios de práctica completados
  completedSqlExercises: [],
  completedPythonExercises: [],
};

/**
 * Custom hook para manejar el progreso del usuario
 * Incluye sistema de XP, DataCoins, niveles y tienda
 */
export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Migrar datos antiguos si no tienen los nuevos campos
        return {
          ...defaultProgress,
          ...parsed,
          completedProjectSteps: parsed.completedProjectSteps || {},
          totalXP: parsed.totalXP || 0,
          dataCoins: parsed.dataCoins || 0,
          currentStreak: parsed.currentStreak || 0,
          longestStreak: parsed.longestStreak || 0,
          lastActivityDate: parsed.lastActivityDate || '',
          activityDates: parsed.activityDates || [], // Migrar activityDates
          purchasedItems: parsed.purchasedItems || [],
          achievements: parsed.achievements || [],
          coinsPurchased: parsed.coinsPurchased || 0,
          // Migrar ejercicios desde localStorage antiguo si existen
          completedSqlExercises: parsed.completedSqlExercises || JSON.parse(localStorage.getItem('sql_completed_exercises') || '[]'),
          completedPythonExercises: parsed.completedPythonExercises || JSON.parse(localStorage.getItem('python_completed_exercises') || '[]'),
        };
      }
      return defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  // Persistir cambios en localStorage y sincronizar con servidor
  useEffect(() => {
    try {
      const updatedProgress = {
        ...progress,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
      
      // Sincronizar con servidor (debounced)
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user?.email) {
          const timeoutId = setTimeout(() => {
            fetch('/api/user-progress.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, progress: updatedProgress }),
            }).catch(() => {});
          }, 2000);
          return () => clearTimeout(timeoutId);
        }
      }
    } catch (error) {
      logger.error('Error saving progress:', error);
    }
  }, [progress]);

  // Sincronizar entre tabs - with debounce to prevent loops
  useEffect(() => {
    let isProcessingExternalChange = false;
    
    const handleStorageChange = (e: StorageEvent) => {
      // Only handle changes from OTHER tabs (not our own writes)
      if (e.key === STORAGE_KEY && e.newValue && !isProcessingExternalChange) {
        try {
          const newData = JSON.parse(e.newValue);
          // Only update if the data is actually different (compare by completedSteps length as quick check)
          setProgress(prev => {
            if (prev.completedSteps.length !== newData.completedSteps?.length ||
                prev.totalXP !== newData.totalXP) {
              isProcessingExternalChange = true;
              // Reset flag after a short delay
              setTimeout(() => { isProcessingExternalChange = false; }, 100);
              return { ...defaultProgress, ...newData };
            }
            return prev; // No change needed
          });
        } catch {
          // Ignore parse errors
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Sincronizar progreso con servidor al iniciar
  useEffect(() => {
    const syncWithServer = async () => {
      try {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;
        
        const user = JSON.parse(userStr);
        if (!user?.email) return;
        
        // 1. Cargar progreso del servidor
        const response = await fetch(`/api/user-progress.php?email=${encodeURIComponent(user.email)}`);
        if (!response.ok) {
          // Server error - silently use local storage
          console.log('[useUserProgress] Server unavailable, using local storage');
          return;
        }
        
        const data = await response.json();
        
        // Check for offline mode from server
        if (data.offline) {
          console.log('[useUserProgress] Server in offline mode, using local storage');
          return;
        }
        
        if (data.success && data.progress) {
          // Servidor tiene datos - merge inteligente
          setProgress(prev => {
            const serverSteps = data.progress.completedSteps?.length || 0;
            const localSteps = prev.completedSteps.length;
            const serverStreak = data.progress.currentStreak || 0;
            const localStreak = prev.currentStreak || 0;
            const serverXP = data.progress.totalXP || 0;
            const localXP = prev.totalXP || 0;
            const serverCoins = data.progress.dataCoins || 0;
            const localCoins = prev.dataCoins || 0;
            
            // Merge: tomar el mayor de cada campo
            // STREAK: siempre tomar del servidor si tiene lastActivityDate más reciente o streak mayor
            const serverLastActivity = data.progress.lastActivityDate || '';
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const localLastActivity = prev.lastActivityDate || '';
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const useServerStreak = serverLastActivity >= localLastActivity || serverStreak > localStreak;
            
            // Merge activityDates (unir arrays sin duplicados)
            const serverActivityDates = data.progress.activityDates || [];
            const localActivityDates = prev.activityDates || [];
            const mergedActivityDates = Array.from(new Set([...serverActivityDates, ...localActivityDates])).sort();
            
            // Calcular streak basándose en activityDates
            const calculateStreakFromMerged = (dates: string[]): number => {
              if (dates.length === 0) return 0;
              const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));
              const today = new Date().toISOString().split('T')[0];
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayStr = yesterday.toISOString().split('T')[0];
              
              if (sortedDates[0] !== today && sortedDates[0] !== yesterdayStr) return 0;
              
              let streak = 0;
              let checkDate = new Date(sortedDates[0]);
              for (const dateStr of sortedDates) {
                const expected = checkDate.toISOString().split('T')[0];
                if (dateStr === expected) {
                  streak++;
                  checkDate.setDate(checkDate.getDate() - 1);
                } else if (dateStr < expected) break;
              }
              return streak;
            };
            
            const calculatedStreak = calculateStreakFromMerged(mergedActivityDates);
            
            const mergedProgress = {
              ...prev,
              completedSteps: serverSteps >= localSteps ? (data.progress.completedSteps || prev.completedSteps) : prev.completedSteps,
              completedProjects: data.progress.completedProjects?.length >= (prev.completedProjects?.length || 0) 
                ? (data.progress.completedProjects || prev.completedProjects) 
                : prev.completedProjects,
              watchedVideos: data.progress.watchedVideos?.length >= (prev.watchedVideos?.length || 0)
                ? (data.progress.watchedVideos || prev.watchedVideos)
                : prev.watchedVideos,
              totalXP: Math.max(serverXP, localXP),
              dataCoins: Math.max(serverCoins, localCoins),
              // STREAK: Calcular basándose en activityDates
              currentStreak: calculatedStreak,
              longestStreak: Math.max(data.progress.longestStreak || 0, prev.longestStreak || 0, calculatedStreak),
              lastActivityDate: serverLastActivity || localLastActivity || '',
              activityDates: mergedActivityDates,
              coinsPurchased: Math.max(data.progress.coinsPurchased || 0, prev.coinsPurchased || 0),
              achievements: Array.from(new Set([...(prev.achievements || []), ...(data.progress.achievements || [])])),
              purchasedItems: Array.from(new Set([...(prev.purchasedItems || []), ...(data.progress.purchasedItems || [])])),
              equippedAvatar: data.progress.equippedAvatar || prev.equippedAvatar,
              equippedBadge: data.progress.equippedBadge || prev.equippedBadge,
              equippedTitle: data.progress.equippedTitle || prev.equippedTitle,
            };
            
            // Si local tiene más datos, sincronizar al servidor
            if (localSteps > serverSteps || localXP > serverXP || localCoins > serverCoins) {
              fetch('/api/user-progress.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, progress: mergedProgress }),
              }).catch(() => {});
            }
            
            return mergedProgress;
          });
        } else {
          // Servidor no tiene datos - subir progreso local
          const localProgress = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
          if (localProgress.completedSteps?.length > 0) {
            fetch('/api/user-progress.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: user.email, progress: localProgress }),
            }).catch(() => {});
          }
        }
      } catch {
        // Silent fail - usar datos locales
      }
    };
    
    syncWithServer();
  }, []);

  // Actualizar streak al cargar - usar activityDates
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return;
    
    const user = JSON.parse(userStr);
    if (!user?.email) return;
    
    // Forzar actualización desde el servidor
    fetch(`/api/user-progress.php?email=${encodeURIComponent(user.email)}`)
      .then(res => {
        if (!res.ok) {
          console.log('[useUserProgress] Streak sync: server unavailable');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (!data || data.offline) return; // Server offline or error
        if (data.success && data.progress) {
          const serverActivityDates = data.progress.activityDates || [];
          
          // Calcular streak desde activityDates
          const calcStreak = (dates: string[]): number => {
            if (dates.length === 0) return 0;
            const sorted = [...dates].sort((a, b) => b.localeCompare(a));
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (sorted[0] !== today && sorted[0] !== yesterdayStr) return 0;
            
            let streak = 0;
            let checkDate = new Date(sorted[0]);
            for (const d of sorted) {
              const expected = checkDate.toISOString().split('T')[0];
              if (d === expected) {
                streak++;
                checkDate.setDate(checkDate.getDate() - 1);
              } else if (d < expected) break;
            }
            return streak;
          };
          
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const calculatedStreak = calcStreak(serverActivityDates);
          
          setProgress(prev => {
            const mergedDates = Array.from(new Set([...serverActivityDates, ...(prev.activityDates || [])])).sort();
            const finalStreak = calcStreak(mergedDates);
            return {
              ...prev,
              currentStreak: finalStreak,
              longestStreak: Math.max(data.progress.longestStreak || 0, prev.longestStreak || 0, finalStreak),
              lastActivityDate: data.progress.lastActivityDate || prev.lastActivityDate || '',
              activityDates: mergedDates,
            };
          });
        }
      })
      .catch(() => {
        // Silent fail - server unavailable
        console.log('[useUserProgress] Streak sync failed - using local data');
      });
  }, []); // Solo al montar

  // ============================================
  // FUNCIONES DE XP Y COINS
  // ============================================

  // Función para calcular streak basándose en activityDates
  const calculateStreakFromDates = (dates: string[]): number => {
    if (dates.length === 0) return 0;
    
    // Ordenar fechas de más reciente a más antigua
    const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    // Si la última actividad no fue hoy ni ayer, streak es 0
    if (sortedDates[0] !== today && sortedDates[0] !== yesterdayStr) {
      return 0;
    }
    
    // Contar días consecutivos desde hoy/ayer hacia atrás
    let streak = 0;
    let checkDate = new Date(sortedDates[0]);
    
    for (const dateStr of sortedDates) {
      const expectedDateStr = checkDate.toISOString().split('T')[0];
      if (dateStr === expectedDateStr) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else if (dateStr < expectedDateStr) {
        // Hubo un gap, terminar conteo
        break;
      }
      // Si dateStr > expectedDateStr, es duplicado o fecha futura, ignorar
    }
    
    return streak;
  };

  // Función para agregar fecha de hoy a activityDates (sin duplicados)
  const addTodayToActivityDates = (dates: string[]): string[] => {
    const today = new Date().toISOString().split('T')[0];
    if (dates.includes(today)) {
      return dates; // Ya existe, no agregar
    }
    return [...dates, today];
  };

  // Función para calcular el nuevo streak (usa activityDates)
  const calculateNewStreak = (prev: UserProgress): { newStreak: number; longestStreak: number; newActivityDates: string[] } => {
    const newActivityDates = addTodayToActivityDates(prev.activityDates || []);
    const newStreak = calculateStreakFromDates(newActivityDates);
    
    return {
      newStreak,
      longestStreak: Math.max(prev.longestStreak, newStreak),
      newActivityDates
    };
  };

  const addXPAndCoins = useCallback((xp: number, coins: number, reason?: string) => {
    setProgress(prev => {
      const newXP = prev.totalXP + xp;
      const newCoins = prev.dataCoins + coins;
      
      // Check for level up bonus
      const oldRank = getUserRank(prev.totalXP);
      const newRank = getUserRank(newXP);
      let bonusCoins = 0;
      if (oldRank.rank !== newRank.rank) {
        bonusCoins = REWARDS.LEVEL_UP.coins;
      }
      
      // Update streak usando activityDates
      const today = new Date().toISOString().split('T')[0];
      const { newStreak, longestStreak, newActivityDates } = calculateNewStreak(prev);
      
      // Check streak bonuses
      let streakBonus = 0;
      if (newStreak === 7 && prev.currentStreak < 7) {
        streakBonus = REWARDS.STREAK_7_DAYS.coins;
      } else if (newStreak === 30 && prev.currentStreak < 30) {
        streakBonus = REWARDS.STREAK_30_DAYS.coins;
      }
      
      return {
        ...prev,
        totalXP: newXP,
        dataCoins: newCoins + bonusCoins + streakBonus,
        currentStreak: newStreak,
        longestStreak,
        lastActivityDate: today,
        activityDates: newActivityDates,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Obtener rango actual del usuario
  const getUserRank = useCallback((xp?: number): UserRankInfo => {
    const currentXP = xp ?? progress.totalXP;
    for (let i = USER_RANKS.length - 1; i >= 0; i--) {
      if (currentXP >= USER_RANKS[i].minXP) {
        return USER_RANKS[i];
      }
    }
    return USER_RANKS[0];
  }, [progress.totalXP]);

  // Calcular XP para el siguiente nivel
  const getXPToNextRank = useCallback((): { current: number; needed: number; percent: number } => {
    const currentRank = getUserRank();
    const currentRankIndex = USER_RANKS.findIndex(r => r.rank === currentRank.rank);
    
    if (currentRankIndex >= USER_RANKS.length - 1) {
      return { current: progress.totalXP, needed: progress.totalXP, percent: 100 };
    }
    
    const nextRank = USER_RANKS[currentRankIndex + 1];
    const xpInCurrentRank = progress.totalXP - currentRank.minXP;
    const xpNeededForNext = nextRank.minXP - currentRank.minXP;
    const percent = Math.round((xpInCurrentRank / xpNeededForNext) * 100);
    
    return { current: xpInCurrentRank, needed: xpNeededForNext, percent };
  }, [progress.totalXP, getUserRank]);

  // ============================================
  // FUNCIONES DE TIENDA
  // ============================================

  const purchaseItem = useCallback((itemId: string): { success: boolean; message: string } => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) {
      return { success: false, message: 'Item no encontrado' };
    }
    
    if (progress.purchasedItems.includes(itemId)) {
      return { success: false, message: 'Ya tenés este item' };
    }
    
    if (progress.dataCoins < item.price) {
      return { success: false, message: `Necesitás ${item.price - progress.dataCoins} DataCoins más` };
    }
    
    // Check unlock requirements
    if (item.unlockRequirement) {
      const { type, value } = item.unlockRequirement;
      if (type === 'xp' && progress.totalXP < value) {
        return { success: false, message: `Necesitás ${value} XP para desbloquear este item` };
      }
      if (type === 'projects' && progress.completedProjects.length < value) {
        return { success: false, message: `Necesitás completar ${value} proyectos para desbloquear este item` };
      }
    }
    
    setProgress(prev => ({
      ...prev,
      dataCoins: prev.dataCoins - item.price,
      purchasedItems: [...prev.purchasedItems, itemId],
    }));
    
    return { success: true, message: `¡Compraste ${item.name}!` };
  }, [progress]);

  const equipItem = useCallback((itemId: string) => {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item || !progress.purchasedItems.includes(itemId)) return;
    
    setProgress(prev => {
      const updates: Partial<UserProgress> = {};
      if (item.type === 'avatar') updates.equippedAvatar = itemId;
      if (item.type === 'badge') updates.equippedBadge = itemId;
      if (item.type === 'title') updates.equippedTitle = itemId;
      return { ...prev, ...updates };
    });
  }, [progress.purchasedItems]);

  const unequipItem = useCallback((type: 'avatar' | 'badge' | 'title') => {
    setProgress(prev => {
      const updates: Partial<UserProgress> = {};
      if (type === 'avatar') updates.equippedAvatar = undefined;
      if (type === 'badge') updates.equippedBadge = undefined;
      if (type === 'title') updates.equippedTitle = undefined;
      return { ...prev, ...updates };
    });
  }, []);

  // Agregar coins (para compras)
  const addPurchasedCoins = useCallback((coins: number) => {
    setProgress(prev => ({
      ...prev,
      dataCoins: prev.dataCoins + coins,
      coinsPurchased: prev.coinsPurchased + coins,
    }));
  }, []);

  // Agregar achievement
  const addAchievement = useCallback((achievementId: string) => {
    setProgress(prev => {
      if (prev.achievements.includes(achievementId)) {
        return prev; // Ya tiene el achievement
      }
      return {
        ...prev,
        achievements: [...prev.achievements, achievementId],
      };
    });
  }, []);

  // ============================================
  // FUNCIONES DE PROGRESO (actualizadas con rewards)
  // ============================================

  const toggleStep = useCallback((stepId: string) => {
    setProgress(prev => {
      const isCompleting = !prev.completedSteps.includes(stepId);
      
      if (isCompleting) {
        // Dar rewards - usar calculateNewStreak con activityDates
        const today = new Date().toISOString().split('T')[0];
        const { newStreak, longestStreak, newActivityDates } = calculateNewStreak(prev);
        
        return {
          ...prev,
          completedSteps: [...prev.completedSteps, stepId],
          totalXP: prev.totalXP + REWARDS.STEP_COMPLETE.xp,
          dataCoins: prev.dataCoins + REWARDS.STEP_COMPLETE.coins,
          lastActivityDate: today,
          currentStreak: newStreak,
          longestStreak,
          activityDates: newActivityDates,
        };
      } else {
        // Quitar rewards (permitir desmarcar)
        return {
          ...prev,
          completedSteps: prev.completedSteps.filter(id => id !== stepId),
          totalXP: Math.max(0, prev.totalXP - REWARDS.STEP_COMPLETE.xp),
          dataCoins: Math.max(0, prev.dataCoins - REWARDS.STEP_COMPLETE.coins),
        };
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleProject = useCallback((projectId: string) => {
    setProgress(prev => {
      const isCompleting = !prev.completedProjects.includes(projectId);
      const isFirstProject = prev.completedProjects.length === 0 && isCompleting;
      
      if (isCompleting) {
        return {
          ...prev,
          completedProjects: [...prev.completedProjects, projectId],
          totalXP: prev.totalXP + REWARDS.PROJECT_COMPLETE.xp,
          dataCoins: prev.dataCoins + REWARDS.PROJECT_COMPLETE.coins + (isFirstProject ? REWARDS.FIRST_PROJECT.coins : 0),
          achievements: isFirstProject && !prev.achievements.includes('first_project') 
            ? [...prev.achievements, 'first_project'] 
            : prev.achievements,
        };
      } else {
        return {
          ...prev,
          completedProjects: prev.completedProjects.filter(id => id !== projectId),
          totalXP: Math.max(0, prev.totalXP - REWARDS.PROJECT_COMPLETE.xp),
          dataCoins: Math.max(0, prev.dataCoins - REWARDS.PROJECT_COMPLETE.coins),
        };
      }
    });
  }, []);

  const toggleProjectStep = useCallback((projectId: string, stepId: string) => {
    setProgress(prev => {
      const projectSteps = prev.completedProjectSteps[projectId] || [];
      const isCompleting = !projectSteps.includes(stepId);
      
      return {
        ...prev,
        completedProjectSteps: {
          ...prev.completedProjectSteps,
          [projectId]: isCompleting 
            ? [...projectSteps, stepId]
            : projectSteps.filter(id => id !== stepId),
        },
      };
    });
  }, []);

  const isProjectStepCompleted = useCallback((projectId: string, stepId: string): boolean => {
    return (progress.completedProjectSteps[projectId] || []).includes(stepId);
  }, [progress.completedProjectSteps]);

  const markVideoWatched = useCallback((videoId: string) => {
    setProgress(prev => {
      if (prev.watchedVideos.includes(videoId)) return prev;
      
      return {
        ...prev,
        watchedVideos: [...prev.watchedVideos, videoId],
        totalXP: prev.totalXP + REWARDS.VIDEO_WATCHED.xp,
        dataCoins: prev.dataCoins + REWARDS.VIDEO_WATCHED.coins,
      };
    });
  }, []);

  const toggleVideoWatched = useCallback((videoId: string) => {
    setProgress(prev => {
      const isWatching = !prev.watchedVideos.includes(videoId);
      
      if (isWatching) {
        return {
          ...prev,
          watchedVideos: [...prev.watchedVideos, videoId],
          totalXP: prev.totalXP + REWARDS.VIDEO_WATCHED.xp,
          dataCoins: prev.dataCoins + REWARDS.VIDEO_WATCHED.coins,
        };
      } else {
        return {
          ...prev,
          watchedVideos: prev.watchedVideos.filter(id => id !== videoId),
          totalXP: Math.max(0, prev.totalXP - REWARDS.VIDEO_WATCHED.xp),
          dataCoins: Math.max(0, prev.dataCoins - REWARDS.VIDEO_WATCHED.coins),
        };
      }
    });
  }, []);

  // ============================================
  // FUNCIONES AUXILIARES
  // ============================================

  const saveTextInput = useCallback((stepId: string, value: string) => {
    setProgress(prev => {
      const previousValue = prev.textInputs[stepId] || '';
      const hadContent = previousValue.trim().length > 0;
      const hasContent = value.trim().length > 0;
      
      // Si es la primera vez que se escribe algo (transición de vacío a contenido), dar XP
      const isNewCompletion = !hadContent && hasContent;
      // Si se borra todo (transición de contenido a vacío), quitar XP
      const isUncompletion = hadContent && !hasContent;
      
      return {
        ...prev,
        textInputs: { ...prev.textInputs, [stepId]: value },
        // Dar/quitar XP solo en las transiciones
        totalXP: isNewCompletion 
          ? prev.totalXP + REWARDS.STEP_COMPLETE.xp 
          : isUncompletion 
            ? Math.max(0, prev.totalXP - REWARDS.STEP_COMPLETE.xp)
            : prev.totalXP,
        dataCoins: isNewCompletion 
          ? prev.dataCoins + REWARDS.STEP_COMPLETE.coins 
          : isUncompletion 
            ? Math.max(0, prev.dataCoins - REWARDS.STEP_COMPLETE.coins)
            : prev.dataCoins,
      };
    });
  }, []);

  const getTextInput = useCallback((stepId: string): string => {
    return progress.textInputs[stepId] || '';
  }, [progress.textInputs]);

  const isStepCompleted = useCallback((stepId: string): boolean => {
    // Un step está completo si:
    // 1. Está en completedSteps (checkbox marcado), o
    // 2. Tiene un textInput con contenido (reflexión completada)
    if (progress.completedSteps.includes(stepId)) return true;
    
    // Verificar si tiene texto guardado (para reflexiones)
    const textValue = progress.textInputs[stepId];
    if (textValue && textValue.trim().length > 0) return true;
    
    return false;
  }, [progress.completedSteps, progress.textInputs]);

  const isProjectCompleted = useCallback((projectId: string): boolean => {
    return progress.completedProjects.includes(projectId);
  }, [progress.completedProjects]);

  const isVideoWatched = useCallback((videoId: string): boolean => {
    return progress.watchedVideos.includes(videoId);
  }, [progress.watchedVideos]);

  const calculateLevelProgress = useCallback((levelStepIds: string[]): number => {
    // Contar steps completados (checkboxes + reflexiones con texto)
    const completed = levelStepIds.filter(id => {
      if (progress.completedSteps.includes(id)) return true;
      const textValue = progress.textInputs[id];
      if (textValue && textValue.trim().length > 0) return true;
      return false;
    }).length;
    return levelStepIds.length > 0 ? Math.round((completed / levelStepIds.length) * 100) : 0;
  }, [progress.completedSteps, progress.textInputs]);

  // Calcular XP de un nivel específico
  const calculateLevelXP = useCallback((level: number): number => {
    // Calcular XP basado en pasos completados del nivel
    // Esto es una aproximación - en realidad deberíamos trackear por nivel
    return progress.completedSteps.filter(id => id.startsWith(`l${level}-`)).length * REWARDS.STEP_COMPLETE.xp;
  }, [progress.completedSteps]);

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  const exportProgress = useCallback((): string => {
    return JSON.stringify(progress, null, 2);
  }, [progress]);

  const importProgress = useCallback((json: string): boolean => {
    try {
      const imported = JSON.parse(json) as UserProgress;
      if (imported.completedSteps && imported.completedProjects && imported.watchedVideos) {
        setProgress({ ...defaultProgress, ...imported });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  // ============================================
  // SYNC EJERCICIOS CON ROADMAP
  // ============================================

  // Mapeo de cantidad de ejercicios a pasos del roadmap
  const EXERCISE_ROADMAP_SYNC = {
    python: [
      { count: 3, stepId: 'l0-pyej-1' },  // Nivel 0: 3 ejercicios Python Easy
      { count: 5, stepId: 'l0-pyej-2' },  // Nivel 0: 5 ejercicios Python Easy
      { count: 5, stepId: 'l1-pyp-1a' },  // Nivel 1: Ejercicios 1-5
      { count: 10, stepId: 'l1-pyp-1b' }, // Nivel 1: Ejercicios 6-10
      { count: 15, stepId: 'l1-pyp-1c' }, // Nivel 1: Ejercicios 11-15
      { count: 20, stepId: 'l1-pyp-1d' }, // Nivel 1: Ejercicios 16-20
    ],
    pandas: [
      { count: 3, stepId: 'l1-pyp-0b' },  // Completé ejercicios de Pandas
    ],
    sql_fundamentals: [
      { count: 10, stepId: 'l1-sqlp-0a' }, // SQL Fundamentals
    ],
    sql_joins: [
      { count: 5, stepId: 'l1-sqlp-0b' },  // JOINs
    ],
    sql_aggregations: [
      { count: 5, stepId: 'l1-sqlp-0c' },  // Agregaciones
    ],
  };

  // Sincronizar ejercicios completados con roadmap
  const syncExercisesWithRoadmap = useCallback((category: string, completedCount: number) => {
    const mappings = EXERCISE_ROADMAP_SYNC[category as keyof typeof EXERCISE_ROADMAP_SYNC];
    if (!mappings) return;

    setProgress(prev => {
      let newCompletedSteps = [...prev.completedSteps];
      let stepsAdded = false;

      for (const mapping of mappings) {
        if (completedCount >= mapping.count && !newCompletedSteps.includes(mapping.stepId)) {
          newCompletedSteps.push(mapping.stepId);
          stepsAdded = true;
        }
      }

      if (!stepsAdded) return prev;

      return {
        ...prev,
        completedSteps: newCompletedSteps,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Marcar ejercicio SQL como completado
  const completeSqlExercise = useCallback((exerciseId: string) => {
    setProgress(prev => {
      if (prev.completedSqlExercises.includes(exerciseId)) return prev;
      const updated = [...prev.completedSqlExercises, exerciseId];
      // Limpiar localStorage antiguo ya que ahora se guarda en progreso
      localStorage.removeItem('sql_completed_exercises');
      return {
        ...prev,
        completedSqlExercises: updated,
      };
    });
  }, []);

  // Marcar ejercicio Python como completado
  const completePythonExercise = useCallback((exerciseId: string) => {
    setProgress(prev => {
      if (prev.completedPythonExercises.includes(exerciseId)) return prev;
      const updated = [...prev.completedPythonExercises, exerciseId];
      // Limpiar localStorage antiguo ya que ahora se guarda en progreso
      localStorage.removeItem('python_completed_exercises');
      return {
        ...prev,
        completedPythonExercises: updated,
      };
    });
  }, []);

  // Verificar si ejercicio está completado
  const isSqlExerciseCompleted = useCallback((exerciseId: string) => {
    return progress.completedSqlExercises.includes(exerciseId);
  }, [progress.completedSqlExercises]);

  const isPythonExerciseCompleted = useCallback((exerciseId: string) => {
    return progress.completedPythonExercises.includes(exerciseId);
  }, [progress.completedPythonExercises]);

  return {
    progress,
    // Acciones básicas
    toggleStep,
    toggleProject,
    toggleProjectStep,
    markVideoWatched,
    toggleVideoWatched,
    saveTextInput,
    getTextInput,
    // Checks
    isStepCompleted,
    isProjectCompleted,
    isProjectStepCompleted,
    isVideoWatched,
    // Cálculos
    calculateLevelProgress,
    calculateLevelXP,
    getUserRank,
    getXPToNextRank,
    // XP & Coins
    addXPAndCoins,
    // Tienda
    purchaseItem,
    equipItem,
    unequipItem,
    addPurchasedCoins,
    // Achievements
    addAchievement,
    // Sync ejercicios
    syncExercisesWithRoadmap,
    // Ejercicios SQL/Python
    completeSqlExercise,
    completePythonExercise,
    isSqlExerciseCompleted,
    isPythonExerciseCompleted,
    // Utils
    resetProgress,
    exportProgress,
    importProgress,
  };
}