import { useCallback, useState } from 'react';
import confetti from 'canvas-confetti';

export interface CelebrationNotification {
  id: string;
  type: 'achievement' | 'level_up' | 'mission' | 'streak' | 'coins' | 'xp';
  title: string;
  description: string;
  icon: string;
  xp?: number;
  coins?: number;
}

/**
 * Hook para manejar celebraciones y notificaciones de logros
 */
export function useCelebration() {
  const [notifications, setNotifications] = useState<CelebrationNotification[]>([]);

  // Lanzar confetti básico
  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // Confetti de los lados (más épico)
  const fireConfettiSides = useCallback(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  // Confetti de estrellas (para logros épicos)
  const fireStars = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'] as confetti.Shape[],
      colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8']
    };

    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      origin: { x: 0.5, y: 0.5 }
    });

    confetti({
      ...defaults,
      particleCount: 25,
      scalar: 0.75,
      origin: { x: 0.5, y: 0.5 }
    });
  }, []);

  // Confetti de emojis
  const fireEmoji = useCallback((emoji: string) => {
    const scalar = 2;
    const emojiShape = confetti.shapeFromText({ text: emoji, scalar });

    confetti({
      shapes: [emojiShape],
      scalar,
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 }
    });
  }, []);

  // Agregar notificación
  const addNotification = useCallback((notification: Omit<CelebrationNotification, 'id'>) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const newNotification = { ...notification, id };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
    
    return id;
  }, []);

  // Remover notificación manualmente
  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Celebrar logro desbloqueado
  const celebrateAchievement = useCallback((title: string, description: string, icon: string, xp: number, coins: number, rarity: string) => {
    // Confetti según rareza
    if (rarity === 'legendary') {
      fireStars();
      setTimeout(fireConfettiSides, 300);
    } else if (rarity === 'epic') {
      fireConfettiSides();
    } else {
      fireConfetti();
    }
    
    // Notificación
    addNotification({
      type: 'achievement',
      title: `🏆 ${title}`,
      description,
      icon,
      xp,
      coins
    });
  }, [fireConfetti, fireConfettiSides, fireStars, addNotification]);

  // Celebrar level up
  const celebrateLevelUp = useCallback((newRank: string, icon: string) => {
    fireStars();
    setTimeout(fireConfettiSides, 200);
    
    addNotification({
      type: 'level_up',
      title: '🎉 ¡Subiste de nivel!',
      description: `Ahora sos ${icon} ${newRank}`,
      icon: '🎉'
    });
  }, [fireConfettiSides, fireStars, addNotification]);

  // Celebrar misión completada
  const celebrateMission = useCallback((title: string, xp: number, coins: number) => {
    fireConfetti();
    
    addNotification({
      type: 'mission',
      title: '✅ Misión Completada',
      description: title,
      icon: '🎯',
      xp,
      coins
    });
  }, [fireConfetti, addNotification]);

  // Celebrar bonus diario
  const celebrateDailyBonus = useCallback((xp: number, coins: number) => {
    fireConfettiSides();
    fireEmoji('🎯');
    
    addNotification({
      type: 'mission',
      title: '🎯 ¡Bonus Diario!',
      description: 'Completaste las 3 misiones del día',
      icon: '🎁',
      xp,
      coins
    });
  }, [fireConfettiSides, fireEmoji, addNotification]);

  // Celebrar streak
  const celebrateStreak = useCallback((days: number) => {
    if (days >= 30) {
      fireStars();
    } else if (days >= 7) {
      fireConfettiSides();
    } else {
      fireConfetti();
    }
    
    addNotification({
      type: 'streak',
      title: `🔥 ${days} días de streak!`,
      description: days >= 30 ? '¡Sos imparable!' : days >= 7 ? '¡Una semana completa!' : '¡Seguí así!',
      icon: '🔥'
    });
  }, [fireConfetti, fireConfettiSides, fireStars, addNotification]);

  // Notificar XP ganado (sin confetti, solo notificación)
  const notifyXP = useCallback((amount: number, reason?: string) => {
    addNotification({
      type: 'xp',
      title: `+${amount} XP`,
      description: reason || '¡Seguí así!',
      icon: '⚡',
      xp: amount
    });
  }, [addNotification]);

  // Notificar coins ganados
  const notifyCoins = useCallback((amount: number, reason?: string) => {
    addNotification({
      type: 'coins',
      title: `+${amount} 💎`,
      description: reason || '¡DataCoins ganados!',
      icon: '💎',
      coins: amount
    });
  }, [addNotification]);

  return {
    notifications,
    fireConfetti,
    fireConfettiSides,
    fireStars,
    fireEmoji,
    addNotification,
    removeNotification,
    celebrateAchievement,
    celebrateLevelUp,
    celebrateMission,
    celebrateDailyBonus,
    celebrateStreak,
    notifyXP,
    notifyCoins
  };
}



