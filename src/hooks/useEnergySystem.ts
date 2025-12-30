import { useState, useEffect, useCallback } from 'react';

/**
 * Energy System - Límite diario para usuarios gratuitos
 * 
 * Usuarios GRATIS:
 * - 3 ejercicios/día
 * - 5 pasos del roadmap/día
 * 
 * Usuarios PAGOS:
 * - Ilimitado
 */

const STORAGE_KEY = 'ian-saura-energy';

// Límites para usuarios gratuitos
export const FREE_LIMITS = {
  exercises: 3,
  roadmapSteps: 5,
};

interface EnergyState {
  date: string; // YYYY-MM-DD
  exercisesUsed: number;
  stepsUsed: number;
}

interface UseEnergySystemReturn {
  // Estado actual
  exercisesRemaining: number;
  stepsRemaining: number;
  exercisesUsed: number;
  stepsUsed: number;
  
  // Verificar si puede hacer más
  canDoExercise: boolean;
  canDoStep: boolean;
  
  // Consumir energía
  useExercise: () => boolean;
  useStep: () => boolean;
  
  // Tiempo hasta reset
  timeUntilReset: string;
  
  // Para mostrar modal
  showLimitModal: boolean;
  setShowLimitModal: (show: boolean) => void;
  limitType: 'exercise' | 'step' | null;
}

export function useEnergySystem(isSubscribed: boolean = false): UseEnergySystemReturn {
  const today = new Date().toISOString().split('T')[0];
  
  const [state, setState] = useState<EnergyState>(() => {
    // Si es suscriptor, no tiene límites
    if (isSubscribed) {
      return { date: today, exercisesUsed: 0, stepsUsed: 0 };
    }
    
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as EnergyState;
        // Si es un nuevo día, resetear
        if (parsed.date !== today) {
          return { date: today, exercisesUsed: 0, stepsUsed: 0 };
        }
        return parsed;
      }
    } catch {}
    
    return { date: today, exercisesUsed: 0, stepsUsed: 0 };
  });

  const [timeUntilReset, setTimeUntilReset] = useState('');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [limitType, setLimitType] = useState<'exercise' | 'step' | null>(null);

  // Persistir cambios
  useEffect(() => {
    if (!isSubscribed) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isSubscribed]);

  // Verificar si es un nuevo día
  useEffect(() => {
    if (state.date !== today) {
      setState({ date: today, exercisesUsed: 0, stepsUsed: 0 });
    }
  }, [today, state.date]);

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
      
      setTimeUntilReset(`${hours}h ${minutes}m`);
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

  // Calcular energía restante
  const exercisesRemaining = isSubscribed 
    ? Infinity 
    : Math.max(0, FREE_LIMITS.exercises - state.exercisesUsed);
  
  const stepsRemaining = isSubscribed 
    ? Infinity 
    : Math.max(0, FREE_LIMITS.roadmapSteps - state.stepsUsed);

  const canDoExercise = isSubscribed || exercisesRemaining > 0;
  const canDoStep = isSubscribed || stepsRemaining > 0;

  // Consumir ejercicio
  const useExercise = useCallback((): boolean => {
    if (isSubscribed) return true;
    
    if (state.exercisesUsed >= FREE_LIMITS.exercises) {
      setLimitType('exercise');
      setShowLimitModal(true);
      return false;
    }
    
    setState(prev => ({
      ...prev,
      exercisesUsed: prev.exercisesUsed + 1
    }));
    return true;
  }, [isSubscribed, state.exercisesUsed]);

  // Consumir paso del roadmap
  const useStep = useCallback((): boolean => {
    if (isSubscribed) return true;
    
    if (state.stepsUsed >= FREE_LIMITS.roadmapSteps) {
      setLimitType('step');
      setShowLimitModal(true);
      return false;
    }
    
    setState(prev => ({
      ...prev,
      stepsUsed: prev.stepsUsed + 1
    }));
    return true;
  }, [isSubscribed, state.stepsUsed]);

  return {
    exercisesRemaining,
    stepsRemaining,
    exercisesUsed: state.exercisesUsed,
    stepsUsed: state.stepsUsed,
    canDoExercise,
    canDoStep,
    useExercise,
    useStep,
    timeUntilReset,
    showLimitModal,
    setShowLimitModal,
    limitType,
  };
}
