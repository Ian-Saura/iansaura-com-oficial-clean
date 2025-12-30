import { useState, useEffect, useCallback } from 'react';

interface PushNotificationState {
  isSupported: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission | 'default';
}

const PUSH_SUBSCRIPTION_KEY = 'ian-saura-push-subscription';

/**
 * Hook para manejar Push Notifications
 * Permite suscribirse, enviar notificaciones locales y programar recordatorios
 */
export function usePushNotifications() {
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    isSubscribed: false,
    permission: 'default'
  });

  useEffect(() => {
    // Check if notifications are supported
    const isSupported = 'Notification' in window && 'serviceWorker' in navigator;
    const permission = isSupported ? Notification.permission : 'default';
    const isSubscribed = localStorage.getItem(PUSH_SUBSCRIPTION_KEY) === 'true';

    setState({
      isSupported,
      isSubscribed,
      permission
    });
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!state.isSupported) return false;

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        localStorage.setItem(PUSH_SUBSCRIPTION_KEY, 'true');
        setState(prev => ({
          ...prev,
          permission,
          isSubscribed: true
        }));
        
        // Show welcome notification
        showNotification('¡Notificaciones activadas! 🔔', {
          body: 'Te avisaremos cuando tu racha esté en riesgo o tengas misiones pendientes.',
          tag: 'welcome'
        });
        
        return true;
      }
      
      setState(prev => ({ ...prev, permission }));
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, [state.isSupported]);

  const showNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (!state.isSupported || Notification.permission !== 'granted') return;

    try {
      // Try to use service worker for better reliability
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(registration => {
          registration.showNotification(title, {
            icon: '/icon-192.svg',
            badge: '/icon-192.svg',
            vibrate: [100, 50, 100],
            ...options
          });
        });
      } else {
        // Fallback to regular notification
        new Notification(title, {
          icon: '/icon-192.svg',
          ...options
        });
      }
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }, [state.isSupported]);

  const scheduleStreakReminder = useCallback(() => {
    if (!state.isSubscribed) return;

    // Check if it's evening (after 8 PM) and user hasn't been active today
    const now = new Date();
    const hour = now.getHours();
    const today = now.toISOString().split('T')[0];
    
    const lastActivity = localStorage.getItem('ian-saura-last-activity-date');
    
    if (hour >= 20 && lastActivity !== today) {
      showNotification('🔥 ¡Tu racha está en riesgo!', {
        body: 'Completá una actividad antes de medianoche para mantener tu racha.',
        tag: 'streak-reminder',
        requireInteraction: true,
        data: { url: '/members?tab=practica' }
      });
    }
  }, [state.isSubscribed, showNotification]);

  const scheduleMissionReminder = useCallback(() => {
    if (!state.isSubscribed) return;

    const now = new Date();
    const hour = now.getHours();
    
    // Check at 6 PM if missions are incomplete
    if (hour >= 18) {
      const missionsCompleted = localStorage.getItem('ian-saura-missions-completed-today');
      if (!missionsCompleted || missionsCompleted !== 'true') {
        showNotification('🎯 Misiones diarias pendientes', {
          body: 'Todavía tenés misiones por completar. ¡Ganá XP extra!',
          tag: 'mission-reminder',
          data: { url: '/members?tab=dashboard' }
        });
      }
    }
  }, [state.isSubscribed, showNotification]);

  const notifyAchievement = useCallback((title: string, description: string) => {
    showNotification(`🏆 ${title}`, {
      body: description,
      tag: 'achievement'
    });
  }, [showNotification]);

  const notifyLevelUp = useCallback((newRank: string) => {
    showNotification(`⬆️ ¡Subiste de nivel!`, {
      body: `Ahora sos ${newRank}. ¡Seguí así!`,
      tag: 'level-up'
    });
  }, [showNotification]);

  const unsubscribe = useCallback(() => {
    localStorage.removeItem(PUSH_SUBSCRIPTION_KEY);
    setState(prev => ({ ...prev, isSubscribed: false }));
  }, []);

  return {
    ...state,
    requestPermission,
    showNotification,
    scheduleStreakReminder,
    scheduleMissionReminder,
    notifyAchievement,
    notifyLevelUp,
    unsubscribe
  };
}

export default usePushNotifications;



