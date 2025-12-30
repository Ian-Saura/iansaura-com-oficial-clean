import { useState, useEffect, useCallback } from 'react';
import { getTodaysMissions, DAILY_BONUS, DailyMission } from '../data/dailyChallenges';

const STORAGE_KEY = 'ian-saura-daily-missions';

interface DailyMissionProgress {
  date: string; // YYYY-MM-DD
  completedMissions: string[]; // IDs de misiones completadas
  bonusClaimed: boolean;
  progress: Record<string, number>; // missionId -> progreso actual
}

interface DailyMissionState {
  missions: DailyMission[];
  progress: DailyMissionProgress;
  timeUntilReset: string;
}

/**
 * Hook para manejar las misiones diarias
 * Persiste el progreso y se resetea cada día
 */
export function useDailyMissions() {
  const today = new Date().toISOString().split('T')[0];
  
  const [state, setState] = useState<DailyMissionState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as DailyMissionProgress;
        
        // Si es un nuevo día, resetear
        if (parsed.date !== today) {
          return {
            missions: getTodaysMissions(),
            progress: {
              date: today,
              completedMissions: [],
              bonusClaimed: false,
              progress: {}
            },
            timeUntilReset: ''
          };
        }
        
        return {
          missions: getTodaysMissions(),
          progress: parsed,
          timeUntilReset: ''
        };
      }
    } catch {
      // Ignore
    }
    
    return {
      missions: getTodaysMissions(),
      progress: {
        date: today,
        completedMissions: [],
        bonusClaimed: false,
        progress: {}
      },
      timeUntilReset: ''
    };
  });

  // Persistir cambios
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
  }, [state.progress]);

  // Actualizar tiempo hasta reset - solo cada 5 minutos y pausa en background
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setState(prev => ({
        ...prev,
        timeUntilReset: `${hours}h ${minutes}m`
      }));
    };

    const intervalRef = { id: null as number | null };

    const startTimer = () => {
      if (intervalRef.id) return;
      updateTimer();
      // Update every 5 minutes instead of 1 (5x less CPU)
      intervalRef.id = window.setInterval(updateTimer, 5 * 60 * 1000);
    };

    const stopTimer = () => {
      if (intervalRef.id) {
        clearInterval(intervalRef.id);
        intervalRef.id = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    if (!document.hidden) {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Verificar si es un nuevo día y resetear
  useEffect(() => {
    if (state.progress.date !== today) {
      setState({
        missions: getTodaysMissions(),
        progress: {
          date: today,
          completedMissions: [],
          bonusClaimed: false,
          progress: {}
        },
        timeUntilReset: state.timeUntilReset
      });
    }
  }, [today, state.progress.date, state.timeUntilReset]);

  // Actualizar progreso de una misión
  const updateMissionProgress = useCallback((missionId: string, increment: number = 1) => {
    setState(prev => {
      const mission = prev.missions.find(m => m.id === missionId);
      if (!mission) return prev;
      
      const currentProgress = prev.progress.progress[missionId] || 0;
      const newProgress = currentProgress + increment;
      
      // Si alcanzó el target, marcar como completada
      const isNowComplete = newProgress >= mission.target && !prev.progress.completedMissions.includes(missionId);
      
      return {
        ...prev,
        progress: {
          ...prev.progress,
          progress: {
            ...prev.progress.progress,
            [missionId]: newProgress
          },
          completedMissions: isNowComplete 
            ? [...prev.progress.completedMissions, missionId]
            : prev.progress.completedMissions
        }
      };
    });
  }, []);

  // Completar una misión manualmente
  const completeMission = useCallback((missionId: string) => {
    setState(prev => {
      if (prev.progress.completedMissions.includes(missionId)) return prev;
      
      const mission = prev.missions.find(m => m.id === missionId);
      if (!mission) return prev;
      
      return {
        ...prev,
        progress: {
          ...prev.progress,
          completedMissions: [...prev.progress.completedMissions, missionId],
          progress: {
            ...prev.progress.progress,
            [missionId]: mission.target
          }
        }
      };
    });
  }, []);

  // Reclamar bonus diario
  const claimDailyBonus = useCallback((): { success: boolean; xp: number; coins: number } => {
    const allComplete = state.missions.every(m => 
      state.progress.completedMissions.includes(m.id)
    );
    
    if (!allComplete || state.progress.bonusClaimed) {
      return { success: false, xp: 0, coins: 0 };
    }
    
    setState(prev => ({
      ...prev,
      progress: {
        ...prev.progress,
        bonusClaimed: true
      }
    }));
    
    return { success: true, xp: DAILY_BONUS.xp, coins: DAILY_BONUS.coins };
  }, [state.missions, state.progress.completedMissions, state.progress.bonusClaimed]);

  // Helpers
  const isMissionComplete = useCallback((missionId: string): boolean => {
    return state.progress.completedMissions.includes(missionId);
  }, [state.progress.completedMissions]);

  const getMissionProgress = useCallback((missionId: string): number => {
    return state.progress.progress[missionId] || 0;
  }, [state.progress.progress]);

  const getAllMissionsComplete = useCallback((): boolean => {
    return state.missions.every(m => state.progress.completedMissions.includes(m.id));
  }, [state.missions, state.progress.completedMissions]);

  const getTotalRewards = useCallback((): { xp: number; coins: number } => {
    let xp = 0;
    let coins = 0;
    
    state.progress.completedMissions.forEach(id => {
      const mission = state.missions.find(m => m.id === id);
      if (mission) {
        xp += mission.xpReward;
        coins += mission.coinsReward;
      }
    });
    
    if (state.progress.bonusClaimed) {
      xp += DAILY_BONUS.xp;
      coins += DAILY_BONUS.coins;
    }
    
    return { xp, coins };
  }, [state.missions, state.progress.completedMissions, state.progress.bonusClaimed]);

  return {
    missions: state.missions,
    progress: state.progress,
    timeUntilReset: state.timeUntilReset,
    updateMissionProgress,
    completeMission,
    claimDailyBonus,
    isMissionComplete,
    getMissionProgress,
    getAllMissionsComplete,
    getTotalRewards,
    bonusClaimed: state.progress.bonusClaimed
  };
}



