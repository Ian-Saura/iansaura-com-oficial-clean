/**
 * Analytics Hook - Track user events for conversion funnel
 * 
 * Usage:
 * const { track } = useAnalytics();
 * track('step_completed', { step_id: 'sql-basics', level: 1 });
 */

import { useCallback, useEffect, useRef } from 'react';

interface AnalyticsEvent {
  event: string;
  user_email?: string;
  properties?: Record<string, any>;
  session_id?: string;
  page_url?: string;
  referrer?: string;
}

// Generate or get session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Queue for batching events
let eventQueue: AnalyticsEvent[] = [];
let flushTimeout: NodeJS.Timeout | null = null;

const flushEvents = async () => {
  if (eventQueue.length === 0) return;
  
  const events = [...eventQueue];
  eventQueue = [];
  
  try {
    await fetch('/api/analytics.php?action=batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        events,
        session_id: getSessionId()
      })
    });
  } catch (error) {
    // Silent fail - don't break the app for analytics
    console.debug('Analytics batch failed:', error);
  }
};

const scheduleFlush = () => {
  if (flushTimeout) clearTimeout(flushTimeout);
  flushTimeout = setTimeout(flushEvents, 2000); // Flush every 2 seconds
};

export const useAnalytics = (userEmail?: string) => {
  const userEmailRef = useRef(userEmail);
  
  useEffect(() => {
    userEmailRef.current = userEmail;
  }, [userEmail]);
  
  // Track page view on mount
  useEffect(() => {
    const trackPageView = () => {
      eventQueue.push({
        event: 'page_view',
        user_email: userEmailRef.current,
        page_url: window.location.pathname,
        referrer: document.referrer || undefined
      });
      scheduleFlush();
    };
    
    trackPageView();
    
    // Flush on page unload
    const handleUnload = () => {
      if (eventQueue.length > 0) {
        // Use sendBeacon for reliable delivery on unload
        navigator.sendBeacon('/api/analytics.php?action=batch', JSON.stringify({
          events: eventQueue,
          session_id: getSessionId()
        }));
      }
    };
    
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);
  
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    eventQueue.push({
      event: eventName,
      user_email: userEmailRef.current,
      properties,
      page_url: window.location.pathname
    });
    scheduleFlush();
  }, []);
  
  // Specific tracking methods for common events
  const trackRegistration = useCallback((email: string, source?: string) => {
    track('user_registered', { email, source, timestamp: new Date().toISOString() });
  }, [track]);
  
  const trackLogin = useCallback((email: string) => {
    track('user_logged_in', { email, timestamp: new Date().toISOString() });
  }, [track]);
  
  const trackTrialStart = useCallback((email: string, days: number) => {
    track('trial_started', { email, trial_days: days, timestamp: new Date().toISOString() });
  }, [track]);
  
  const trackStepCompleted = useCallback((stepId: string, level: number, xpEarned?: number) => {
    track('step_completed', { step_id: stepId, level, xp_earned: xpEarned });
  }, [track]);
  
  const trackExerciseCompleted = useCallback((exerciseId: string, type: 'sql' | 'python', correct: boolean) => {
    track('exercise_completed', { exercise_id: exerciseId, type, correct });
  }, [track]);
  
  const trackProjectStarted = useCallback((projectId: string) => {
    track('project_started', { project_id: projectId });
  }, [track]);
  
  const trackSubscription = useCallback((email: string, plan: string, amount?: number) => {
    track('subscription_started', { email, plan, amount, timestamp: new Date().toISOString() });
  }, [track]);
  
  const trackCancellation = useCallback((email: string, reason?: string) => {
    track('subscription_cancelled', { email, reason, timestamp: new Date().toISOString() });
  }, [track]);
  
  const trackCTAClick = useCallback((ctaName: string, destination?: string) => {
    track('cta_clicked', { cta_name: ctaName, destination });
  }, [track]);
  
  const trackOnboardingStep = useCallback((step: number, totalSteps: number, skipped: boolean = false) => {
    track('onboarding_step', { step, total_steps: totalSteps, skipped });
  }, [track]);
  
  const trackOnboardingComplete = useCallback((totalSteps: number, skipped: boolean = false) => {
    track('onboarding_completed', { total_steps: totalSteps, skipped });
  }, [track]);
  
  return {
    track,
    trackRegistration,
    trackLogin,
    trackTrialStart,
    trackStepCompleted,
    trackExerciseCompleted,
    trackProjectStarted,
    trackSubscription,
    trackCancellation,
    trackCTAClick,
    trackOnboardingStep,
    trackOnboardingComplete
  };
};

// Standalone function for use outside React components
export const trackEvent = (eventName: string, properties?: Record<string, any>, userEmail?: string) => {
  eventQueue.push({
    event: eventName,
    user_email: userEmail,
    properties,
    page_url: typeof window !== 'undefined' ? window.location.pathname : undefined
  });
  scheduleFlush();
};

export default useAnalytics;
