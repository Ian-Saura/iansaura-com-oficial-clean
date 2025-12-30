import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import MembersNavigation from '../components/MembersNavigation';
import {
  Database, Map, Video, CheckCircle, Lock,
  ChevronRight, ChevronDown, Star, Target, Rocket,
  Clock, X, MoreHorizontal,
  Code, Crown, TrendingUp,
  ShoppingBag, Search, Bell, Layers, Zap
} from 'lucide-react';

// Data imports
import { getLevelStepIds } from '../data/roadmapData';
import { useLanguage } from '../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../types/i18n';

// Hooks
import { useUserProgress } from '../hooks/useUserProgress';
import { useCelebration } from '../hooks/useCelebration';
import { useDailyMissions } from '../hooks/useDailyMissions';
import { useEnergySystem } from '../hooks/useEnergySystem';
import { useAnalytics } from '../hooks/useAnalytics';

// Components
import Shop from '../components/members/Shop';
import { CelebrationNotifications } from '../components/CelebrationNotifications';
import { OnboardingTutorial } from '../components/OnboardingTutorial';
import { GlobalSearch } from '../components/GlobalSearch';
import { NotificationCenter } from '../components/NotificationCenter';
import AITutor from '../components/AITutor';

// Refactored components
import { GrabacionesTab as ExtractedGrabacionesTab } from '../components/members/tabs/VideosTab';
import { PracticaTab as ExtractedPracticaTab } from '../components/members/tabs/PracticaTab';
import { DashboardTab as ExtractedDashboardTab } from '../components/members/tabs/DashboardTab';
import { ProyectosTab as ExtractedProyectosTab } from '../components/members/tabs/ProyectosTab';
import { InterviewPrepTab } from '../components/members/tabs/InterviewPrepTab';
import { DatasetsTab as ExtractedDatasetsTab } from '../components/members/tabs/DatasetsTab';
import RoadmapTab from '../components/members/tabs/RoadmapTab';
import { BadgeModal } from '../components/members/BadgeModal';
import { AchievementToast, CountdownTimer, LockedContentPreview, AchievementNotification } from '../components/members/MembersUtils';
import { LeaderboardSection as ExtractedLeaderboardSection } from '../components/members/LeaderboardSection';
import { QuickWinChallenge } from '../components/members/QuickWinChallenge';
import { ExitIntentPopup } from '../components/ExitIntentPopup';
import { NotificationPrompt } from '../components/NotificationPrompt';
import { EnergyBar } from '../components/EnergyBar';
import { EnergyLimitModal } from '../components/EnergyLimitModal';
import { LevelCompletionModal } from '../components/LevelCompletionModal';

// Types
import { SHOP_ITEMS } from '../types/members';

// Types
interface MembersProps {
  user: any;
}

// ============================================
// BADGE MODAL COMPONENT
// ============================================

// ============================================
// HELPER FUNCTIONS
// ============================================

// Renderizar markdown simple (tablas, código, negritas)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderMarkdown = (text: string): React.ReactNode => {
  // Split by code blocks first
  const parts = text.split(/```(\w*)\n?([\s\S]*?)```/g);
  
  const elements: React.ReactNode[] = [];
  
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      // Regular text - check for tables
      const textPart = parts[i];
      
      // Detectar tabla markdown: buscar líneas que empiecen y terminen con |
      // y tengan una línea separadora con |---|
      const hasTableSeparator = /\|[\s-]+\|/.test(textPart);
      const hasMultiplePipes = (textPart.match(/\|/g) || []).length >= 4;
      
      if (hasMultiplePipes && hasTableSeparator) {
        const lines = textPart.split('\n');
        let tableLines: string[] = [];
        let beforeTable: string[] = [];
        let afterTable: string[] = [];
        let inTable = false;
        let tableEnded = false;
        
        for (const line of lines) {
          const trimmed = line.trim();
          // Una línea de tabla tiene al menos 2 pipes
          const pipeCount = (trimmed.match(/\|/g) || []).length;
          const isTableLine = pipeCount >= 2 && (trimmed.startsWith('|') || trimmed.includes('|'));
          
          if (isTableLine && !tableEnded) {
            inTable = true;
            tableLines.push(line);
          } else if (inTable && !isTableLine) {
            tableEnded = true;
            if (trimmed) afterTable.push(line);
          } else if (!inTable) {
            beforeTable.push(line);
          } else {
            if (trimmed) afterTable.push(line);
          }
        }
        
        // Render before table text
        if (beforeTable.length > 0 && beforeTable.some(l => l.trim())) {
          elements.push(<div key={`before-${i}`} className="whitespace-pre-line">{renderInlineMarkdown(beforeTable.join('\n'))}</div>);
        }
        
        // Render table - necesita al menos header + separator + 1 data row
        if (tableLines.length >= 3) {
          const headerRow = tableLines[0].split('|').map(c => c.trim()).filter(c => c);
          // Skip separator row (index 1), get data rows
          const dataRows = tableLines.slice(2)
            .filter(row => !row.includes('---')) // Skip any separator rows
            .map(row => row.split('|').map(c => c.trim()).filter(c => c));
          
          elements.push(
            <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-lg border border-slate-600">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-700">
                    {headerRow.map((cell, idx) => (
                      <th key={idx} className="border-b border-slate-600 px-4 py-2.5 text-left text-cyan-300 font-semibold">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800/80'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="border-b border-slate-700/50 px-4 py-2 text-slate-200">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        
        // Render after table text
        if (afterTable.length > 0 && afterTable.some(l => l.trim())) {
          elements.push(<div key={`after-${i}`} className="whitespace-pre-line">{renderInlineMarkdown(afterTable.join('\n'))}</div>);
        }
      } else {
        // No table, just render inline markdown with preserved line breaks
        elements.push(<div key={`text-${i}`} className="whitespace-pre-line">{renderInlineMarkdown(textPart)}</div>);
      }
    } else if (i % 3 === 1) {
      // Language identifier (skip)
    } else {
      // Code block content
      elements.push(
        <pre key={`code-${i}`} className="my-2 p-3 bg-slate-900 rounded-lg overflow-x-auto text-xs">
          <code className="text-emerald-400">{parts[i]}</code>
        </pre>
      );
    }
  }
  
  return <>{elements}</>;
};

// Render inline markdown (bold, inline code)
const renderInlineMarkdown = (text: string): React.ReactNode => {
  // Handle **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx} className="px-1.5 py-0.5 bg-slate-700 rounded text-cyan-300 text-xs">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

// Obtener nombre para mostrar (evita "Google" u otros nombres genéricos)
const getDisplayName = (user: any): string => {
  const genericNames = ['google', 'user', 'usuario', 'admin', 'test'];
  const name = user?.name?.split(' ')[0]?.toLowerCase();
  
  if (!name || genericNames.includes(name) || name.length < 2) {
    return 'Crack';
  }
  
  // Capitalizar primera letra
  return user.name.split(' ')[0].charAt(0).toUpperCase() + user.name.split(' ')[0].slice(1).toLowerCase();
};

// Mensajes motivacionales según progreso (con soporte i18n)
const getMotivationalMessage = (totalProgress: number, t: (key: string) => string): { emoji: string; message: string } => {
  if (totalProgress === 0) {
    return { emoji: '🚀', message: t('motivational.start') };
  }
  if (totalProgress < 25) {
    return { emoji: '💪', message: t('motivational.progress25') };
  }
  if (totalProgress < 50) {
    return { emoji: '🔥', message: t('motivational.progress50') };
  }
  if (totalProgress < 75) {
    return { emoji: '⚡', message: t('motivational.progress75') };
  }
  if (totalProgress < 100) {
    return { emoji: '🏆', message: t('motivational.progress90') };
  }
  return { emoji: '👑', message: t('motivational.completed') };
};

// ============================================
// ACHIEVEMENT NOTIFICATION COMPONENT
// ============================================

// ============================================
// ROADMAP POSITION STORAGE - Para volver al punto exacto
// ============================================
const ROADMAP_POSITION_KEY = 'ian-saura-roadmap-position';

interface RoadmapPosition {
  level: number;
  phaseIndex: number;
  stepId?: string;
  timestamp: number;
}

const saveRoadmapPosition = (position: Omit<RoadmapPosition, 'timestamp'>) => {
  localStorage.setItem(ROADMAP_POSITION_KEY, JSON.stringify({
    ...position,
    timestamp: Date.now()
  }));
};

const getRoadmapPosition = (): RoadmapPosition | null => {
  const saved = localStorage.getItem(ROADMAP_POSITION_KEY);
  if (!saved) return null;
  try {
    const position = JSON.parse(saved);
    // No expiration - always remember last position
    return position;
  } catch {
    return null;
  }
};

// ============================================
// COUNTDOWN TIMER COMPONENT
// ============================================

// ============================================
// NEW BADGE EXPIRATION DATE (1 week from release)
// ============================================
const INTERVIEW_PREP_RELEASE_DATE = new Date('2024-12-09');
const isFeatureNew = (releaseDate: Date, daysToShow: number = 7): boolean => {
  const now = new Date();
  const expirationDate = new Date(releaseDate);
  expirationDate.setDate(expirationDate.getDate() + daysToShow);
  return now < expirationDate;
};

// ============================================
// MAIN COMPONENT
// ============================================
const Members: React.FC<MembersProps> = ({ user }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap' | 'proyectos' | 'datasets' | 'grabaciones' | 'tienda' | 'practica' | 'especializaciones' | 'interviews'>('dashboard');
  const [showBadgeModal, setShowBadgeModal] = useState<{ level: number; type: '50' | '100' } | null>(null);
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  // AI Context for System Design (passed to Saurio)
  const [aiContext, setAiContext] = useState<{ title: string; description: string } | null>(null);
  const [saurioQuestion, setSaurioQuestion] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showQuickWin, setShowQuickWin] = useState(false);
  const [showLevel0CompleteModal, setShowLevel0CompleteModal] = useState(false);
  const [showOIMigrationModal, setShowOIMigrationModal] = useState(false);
  const [savedRoadmapPosition, setSavedRoadmapPosition] = useState<RoadmapPosition | null>(null);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const [levelCompletionModal, setLevelCompletionModal] = useState<{
    isOpen: boolean;
    level: number;
    levelTitle: string;
  } | null>(null);
  const progress = useUserProgress();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { trackStepCompleted, trackExerciseCompleted, trackProjectStarted } = useAnalytics(user?.email);
  const { language, t: translateKey } = useLanguage();
  
  // Translation helper that uses current language
  const t = useCallback((content: LC | string): string => tLocalized(content, language), [language]);
  
  // Load saved roadmap position on mount
  useEffect(() => {
    setSavedRoadmapPosition(getRoadmapPosition());
  }, []);

  // Close more dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setShowMoreDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // 🔧 FIX: Memoize position change handler to prevent infinite re-render loop
  const handlePositionChange = useCallback((pos: { level: number; phaseIndex: number; stepId?: string }) => {
    saveRoadmapPosition(pos);
    setSavedRoadmapPosition({ ...pos, timestamp: Date.now() });
  }, []);
  
  // Show OI Migration modal if user needs to migrate from OneInfinite
  useEffect(() => {
    if ((user as any)?.oi_migrated) {
      setShowOIMigrationModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [(user as any)?.oi_migrated]);
  
  // Refresh subscription status on mount to ensure we have the latest data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [subscriptionChecked, setSubscriptionChecked] = useState(false);
  const [actuallySubscribed, setActuallySubscribed] = useState(user?.subscribed === true);
  
  useEffect(() => {
    const refreshSubscription = async () => {
      if (!user?.email) return;
      
      try {
        const response = await fetch(`/api/check-subscriber.php?email=${encodeURIComponent(user.email)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            // Update local state
            setActuallySubscribed(data.subscribed === true);
            
            // If subscription status changed, update localStorage
            if (data.subscribed !== user.subscribed) {
              const updatedUser = {
                ...user,
                subscribed: data.subscribed || false,
                bootcamp_access: data.bootcamp_access || false,
                is_trial: data.is_trial || false,
                is_oneinfinite_trial: data.is_oneinfinite_trial || false,
                trial_ends: data.trial_ends || null,
                trial_days_left: data.trial_days_left || null,
              };
              localStorage.setItem('user', JSON.stringify(updatedUser));
              // Force page reload to update all components
              window.location.reload();
            }
          }
        }
      } catch (err) {
        console.error('Error refreshing subscription:', err);
      }
      setSubscriptionChecked(true);
    };
    
    refreshSubscription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);
  
  // Heartbeat - Track user activity for "En Vivo" admin panel
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!user?.email) return;
    
    const sendHeartbeat = async () => {
      try {
        await fetch('/api/heartbeat.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email })
        });
      } catch (err) {
        // Silent fail - heartbeat is not critical
      }
    };
    
    // Send heartbeat immediately on mount
    sendHeartbeat();
    
    // Then send every 5 minutes while user is on the page
    const interval = setInterval(sendHeartbeat, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user?.email]);
  
  // FREE vs PAID access logic - use refreshed state
  const isSubscribed = actuallySubscribed;
  const isFreeUser = !isSubscribed;
  
  // Show Quick Win challenge for new SUBSCRIBED users (no completed steps)
  // Free users (level 0) should NOT see SQL challenge - they're learning Python basics
  useEffect(() => {
    const hasSeenQuickWin = localStorage.getItem('ian-saura-quickwin-seen');
    const hasCompletedSteps = progress.progress.completedSteps.length > 0;
    
    // Show Quick Win if: new user AND hasn't seen it before AND is subscribed (not free tier)
    // Free users (level 0) are learning Python basics, SQL challenge would confuse them
    if (!hasCompletedSteps && !hasSeenQuickWin && isSubscribed) {
      // Small delay to let the page load first
      const timer = setTimeout(() => {
        setShowQuickWin(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [progress.progress.completedSteps.length, isSubscribed]);

  // Check if user completed 80%+ of Level 0 and show upgrade modal
  useEffect(() => {
    if (!isFreeUser) return; // Only for free users
    
    const hasSeenLevel0Complete = localStorage.getItem('ian-saura-level0-complete-seen');
    if (hasSeenLevel0Complete) return;
    
    // Calculate Level 0 progress
    const level0StepIds = getLevelStepIds(0);
    const completedLevel0 = level0StepIds.filter((id: string) => progress.isStepCompleted(id)).length;
    const level0Percent = (completedLevel0 / level0StepIds.length) * 100;
    
    // Show modal when user completes 80%+ of Level 0
    if (level0Percent >= 80) {
      // Small delay to let any animations finish
      const timer = setTimeout(() => {
        setShowLevel0CompleteModal(true);
        localStorage.setItem('ian-saura-level0-complete-seen', 'true');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress.progress.completedSteps.length, isFreeUser, progress]);

  // Read tab from URL params
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      const validTabs = ['dashboard', 'roadmap', 'proyectos', 'datasets', 'grabaciones', 'tienda', 'practica', 'especializaciones', 'interviews'];
      if (validTabs.includes(tabParam)) {
        setActiveTab(tabParam as any);
      }
    }
  }, [searchParams]);

  // Level titles for celebration modal
  const levelTitles: Record<number, string> = {
    0: 'Nivel 0 - Fundamentos',
    1: 'Nivel 1 - Junior Data Engineer',
    2: 'Nivel 2 - Semi-Senior Data Engineer',
    3: 'Nivel 3 - Senior Data Engineer'
  };

  // Check if a level was just completed and show celebration
  const checkLevelCompletion = useCallback((stepId: string) => {
    // Determine which level this step belongs to
    const levelMatch = stepId.match(/^l(\d+)-/);
    if (!levelMatch) return;
    
    const levelNum = parseInt(levelMatch[1], 10);
    if (isNaN(levelNum) || levelNum < 0 || levelNum > 3) return;
    
    // Check if already celebrated (use localStorage directly to avoid stale state)
    const savedCelebrated = localStorage.getItem('ian-saura-celebrated-levels');
    const alreadyCelebrated: number[] = savedCelebrated ? JSON.parse(savedCelebrated) : [];
    if (alreadyCelebrated.includes(levelNum)) return;
    
    // Calculate progress for this level
    const levelStepIds = getLevelStepIds(levelNum);
    if (levelStepIds.length === 0) return;
    
    // Read directly from localStorage to get latest state
    setTimeout(() => {
      const progressData = JSON.parse(localStorage.getItem('ian-saura-user-progress') || '{}');
      const currentSteps: string[] = progressData.completedSteps || [];
      const completedCount = levelStepIds.filter((id: string) => currentSteps.includes(id)).length;
      const percent = (completedCount / levelStepIds.length) * 100;
      
      if (percent >= 100) {
        // Mark as celebrated
        const newCelebrated = [...alreadyCelebrated, levelNum];
        localStorage.setItem('ian-saura-celebrated-levels', JSON.stringify(newCelebrated));
        
        // Show celebration modal
        setLevelCompletionModal({
          isOpen: true,
          level: levelNum,
          levelTitle: levelTitles[levelNum] || `Nivel ${levelNum}`
        });
      }
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const celebration = useCelebration();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dailyMissions = useDailyMissions();
  
  // Energy System for free users (limits daily exercises and roadmap steps)
  const energySystem = useEnergySystem(isSubscribed);
  
  // Keyboard shortcut for search (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Track previous XP to detect changes
  const prevXPRef = useRef(progress.progress.totalXP);
  const prevRankRef = useRef(progress.getUserRank().rank);
  const notificationCounterRef = useRef(0);
  
  // Show notification when XP changes - SOLO 1 TOAST A LA VEZ (reemplaza el anterior)
  React.useEffect(() => {
    const currentXP = progress.progress.totalXP;
    const currentRank = progress.getUserRank();
    
    // XP gained - mostrar solo si ganó XP (no en carga inicial)
    if (currentXP > prevXPRef.current && prevXPRef.current > 0) {
      const gained = currentXP - prevXPRef.current;
      notificationCounterRef.current += 1;
      
      // REEMPLAZAR todas las notificaciones anteriores con una nueva
      setNotifications([{
        id: `xp-${Date.now()}-${notificationCounterRef.current}`,
        type: 'xp',
        title: `+${gained} XP`,
        description: '',
        icon: '⚡'
      }]);
    }
    
    // Level up - este sí puede acumularse porque es especial
    if (currentRank.rank !== prevRankRef.current && prevXPRef.current > 0) {
      notificationCounterRef.current += 1;
      setNotifications([{
        id: `level-${Date.now()}-${notificationCounterRef.current}`,
        type: 'level_up',
        title: '¡Nivel UP!',
        description: '',
        icon: currentRank.icon
      }]);
    }
    
    prevXPRef.current = currentXP;
    prevRankRef.current = currentRank.rank;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress.progress.totalXP]);
  
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth?action=subscribe');
    }
  }, [user, navigate]);

  if (!user) return null;

  const displayName = getDisplayName(user);
  const totalSteps = progress.progress.completedSteps.length;
  const motivational = getMotivationalMessage(totalSteps > 0 ? Math.min(100, Math.round(totalSteps / 30 * 100)) : 0, translateKey);

  // Tabs - Free users see all but some are locked
  // Primary tabs - always visible
  const primaryTabs = isFreeUser ? [
    { id: 'dashboard', label: t({ es: 'Dashboard', en: 'Dashboard', pt: 'Dashboard' }), icon: TrendingUp },
    { id: 'roadmap', label: t({ es: 'Nivel 0', en: 'Level 0', pt: 'Nível 0' }), icon: Map },
    { id: 'practica', label: t({ es: 'Práctica', en: 'Practice', pt: 'Prática' }), icon: Code },
    { id: 'interviews', label: t({ es: 'Entrevistas', en: 'Interviews', pt: 'Entrevistas' }), icon: Layers, locked: true },
    { id: 'proyectos', label: t({ es: 'Proyectos', en: 'Projects', pt: 'Projetos' }), icon: Target, locked: true },
  ] : [
    { id: 'dashboard', label: t({ es: 'Dashboard', en: 'Dashboard', pt: 'Dashboard' }), icon: TrendingUp },
    { id: 'roadmap', label: t({ es: 'Roadmap', en: 'Roadmap', pt: 'Roadmap' }), icon: Map },
    { id: 'practica', label: t({ es: 'Práctica', en: 'Practice', pt: 'Prática' }), icon: Code },
    { id: 'interviews', label: t({ es: 'Entrevistas', en: 'Interviews', pt: 'Entrevistas' }), icon: Layers, isNew: isFeatureNew(INTERVIEW_PREP_RELEASE_DATE) },
    { id: 'proyectos', label: t({ es: 'Proyectos', en: 'Projects', pt: 'Projetos' }), icon: Target },
  ];

  // Secondary tabs - in "More" dropdown
  const secondaryTabs = isFreeUser ? [
    { id: 'datasets', label: t({ es: 'Datasets', en: 'Datasets', pt: 'Datasets' }), icon: Database, locked: true },
    { id: 'grabaciones', label: t({ es: 'Videos', en: 'Videos', pt: 'Vídeos' }), icon: Video, locked: true },
    { id: 'tienda', label: t({ es: 'Tienda', en: 'Shop', pt: 'Loja' }), icon: ShoppingBag, locked: true },
    { id: 'especializaciones', label: t({ es: 'Próximamente', en: 'Coming Soon', pt: 'Em Breve' }), icon: Rocket, isComingSoon: true },
  ] : [
    { id: 'datasets', label: t({ es: 'Datasets & APIs', en: 'Datasets & APIs', pt: 'Datasets & APIs' }), icon: Database },
    { id: 'grabaciones', label: t({ es: 'Grabaciones', en: 'Recordings', pt: 'Gravações' }), icon: Video },
    { id: 'tienda', label: t({ es: 'Tienda', en: 'Shop', pt: 'Loja' }), icon: ShoppingBag, highlight: true },
    { id: 'especializaciones', label: t({ es: 'Próximamente', en: 'Coming Soon', pt: 'Em Breve' }), icon: Rocket, isComingSoon: true },
  ];

  // Combined for backwards compatibility and mobile nav
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tabs = [...primaryTabs, ...secondaryTabs];

  // Check if current tab is in secondary tabs
  const isSecondaryTabActive = secondaryTabs.some(tab => tab.id === activeTab);

  // Get user rank info
  const userRank = progress.getUserRank();

  return (
    <>
      <Helmet>
        <title>Área de Miembros | Ian Saura Premium</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Achievement Notification - Solo 1 a la vez, no bloquea clicks */}
      {notifications.length > 0 && (
        <div className="fixed top-20 right-4 z-[9999]">
          <AchievementToast 
            key={notifications[0].id}
            notification={notifications[0]} 
            onClose={() => removeNotification(notifications[0].id)} 
          />
        </div>
      )}

      {/* Badge Modal */}
      {showBadgeModal && (
        <BadgeModal 
          level={showBadgeModal.level} 
          type={showBadgeModal.type} 
          userName={displayName}
          onClose={() => setShowBadgeModal(null)} 
        />
      )}

      {/* Celebration Notifications (Confetti) */}
      <CelebrationNotifications 
        notifications={celebration.notifications} 
        onRemove={celebration.removeNotification} 
      />

      {/* Onboarding Tutorial - Optimizado para mostrar valor rápido */}
      <OnboardingTutorial 
        onComplete={() => {
          setShowOnboarding(false);
          celebration.fireConfettiSides();
        }}
        isSubscribed={isSubscribed}
        onGoToPractice={() => {
          setShowOnboarding(false);
          setActiveTab('practica');
          // Pequeño reward por completar onboarding
          progress.addXPAndCoins(10, 5, 'Onboarding completado');
        }}
      />

      {/* Quick Win Challenge for new users */}
      <QuickWinChallenge 
        isVisible={showQuickWin}
        onComplete={() => {
          setShowQuickWin(false);
          localStorage.setItem('ian-saura-quickwin-seen', 'true');
          // Give rewards
          progress.addXPAndCoins(50, 10, 'Quick Win Challenge completado');
          celebration.fireConfettiSides();
        }}
        onSkip={() => {
          setShowQuickWin(false);
          localStorage.setItem('ian-saura-quickwin-seen', 'true');
        }}
      />

      {/* Level 0 Complete Modal - Upgrade CTA */}
      {showLevel0CompleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowLevel0CompleteModal(false)}
          />
          <div className="relative bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-2xl border border-purple-500/30 p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Confetti effect on open */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-6xl animate-bounce">
              🎉
            </div>
            
            {/* Close button */}
            <button 
              onClick={() => setShowLevel0CompleteModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {/* Content */}
            <div className="text-center space-y-4">
              <div className="text-5xl mb-2">🏆</div>
              <h2 className="text-2xl font-bold text-white">
                ¡Felicitaciones!
              </h2>
              <p className="text-lg text-purple-300">
                Completaste los fundamentos de Data Analytics
              </p>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 my-6">
                <p className="text-slate-300 text-sm leading-relaxed">
                  Ya dominás los conceptos básicos de Python, SQL y análisis de datos. 
                  <span className="text-emerald-400 font-medium"> El siguiente paso es el Nivel 1: </span>
                  donde vas a aprender las habilidades que buscan las empresas para contratar Data Analysts.
                </p>
              </div>
              
              {/* Progress visualization */}
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-4">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span>Nivel 0</span>
                </div>
                <ChevronRight className="w-4 h-4" />
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                  <span className="text-purple-400 font-medium">Nivel 1</span>
                </div>
                <ChevronRight className="w-4 h-4" />
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <span>Nivel 2</span>
                </div>
                <ChevronRight className="w-4 h-4" />
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                  <span>Nivel 3</span>
                </div>
              </div>
              
              {/* CTA */}
              <a
                href={`https://iansaura.com/api/subscribe.php${user?.email ? `?email=${encodeURIComponent(user.email)}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-purple-500/30"
              >
                🚀 {t({ es: 'Suscribirme - $30/mes', en: 'Subscribe - $30/month', pt: 'Assinar - $30/mês' })}
              </a>
              
              <p className="text-xs text-slate-500">
                {t({ es: 'Sin compromiso. Cancelá cuando quieras.', en: 'No commitment. Cancel anytime.', pt: 'Sem compromisso. Cancele quando quiser.' })}
              </p>
              
              <button
                onClick={() => setShowLevel0CompleteModal(false)}
                className="text-slate-400 hover:text-white text-sm transition-colors"
              >
                {t({ es: 'Seguir practicando el Nivel 0', en: 'Keep practicing Level 0', pt: 'Continuar praticando o Nível 0' })}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OneInfinite Migration Modal */}
      {showOIMigrationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
          />
          <div className="relative bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900 rounded-2xl border border-orange-500/30 p-8 max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Warning icon */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl">
              ⚠️
            </div>
            
            {/* Content */}
            <div className="text-center space-y-4 mt-4">
              <h2 className="text-2xl font-bold text-white">
                Tu suscripción anterior fue cancelada
              </h2>
              <p className="text-lg text-orange-300">
                Debido a problemas con OneInfinite
              </p>
              
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 my-6 text-left">
                <p className="text-slate-300 text-sm leading-relaxed mb-3">
                  OneInfinite (nuestra plataforma de pagos anterior) dejó de funcionar correctamente, 
                  por lo que tu suscripción fue cancelada automáticamente.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed">
                  <span className="text-emerald-400 font-medium">¡Buenas noticias!</span> Migramos a Gumroad, una plataforma 
                  más segura y confiable. <span className="text-emerald-400 font-bold">Suscribite de nuevo para continuar</span> 
                  donde lo dejaste.
                </p>
              </div>
              
              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                  <div className="text-emerald-400 font-medium">✅ Solo $30/mes</div>
                  <div className="text-slate-500 text-xs">Cancela cuando quieras</div>
                </div>
                <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                  <div className="text-emerald-400 font-medium">✅ Tu progreso</div>
                  <div className="text-slate-500 text-xs">Sigue guardado</div>
                </div>
              </div>
              
              {/* CTA */}
              <a
                href={(user as any)?.migration_link || `https://iansaura.com/api/subscribe.php${user?.email ? `?email=${encodeURIComponent(user.email)}` : ''}`}
                className="block w-full py-4 px-6 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-orange-500/30"
              >
                🔄 Suscribirme ahora - $30/mes
              </a>
              
              <p className="text-xs text-slate-500">
                Usamos Gumroad, una plataforma de pagos segura y confiable.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Search Modal */}
      <GlobalSearch 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
        onNavigate={(tab) => setActiveTab(tab as any)} 
      />

      {/* Exit Intent Popup - Retention */}
      <ExitIntentPopup 
        isTrialUser={user.is_trial}
        userName={displayName}
      />

      {/* Push Notification Permission Prompt */}
      <NotificationPrompt />

      {/* Level Completion Celebration Modal */}
      {levelCompletionModal && (
        <LevelCompletionModal
          isOpen={levelCompletionModal.isOpen}
          onClose={() => setLevelCompletionModal(null)}
          level={levelCompletionModal.level}
          levelTitle={levelCompletionModal.levelTitle}
          userName={displayName}
          userEmail={user?.email || ''}
          stats={{
            xp: progress.progress.totalXP,
            streak: progress.progress.currentStreak,
            projects: progress.progress.completedProjects?.length || 0
          }}
          onDownloadCertificate={() => {
            setLevelCompletionModal(null);
            setActiveTab('dashboard');
          }}
        />
      )}

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Dedicated Members Navigation - No external links */}
        <MembersNavigation user={user} displayName={displayName} />
        
        {/* Hero Header with Motivational Message */}
        <div className="pt-20 pb-6 px-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-emerald-950/20 to-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar - Muestra el equipado o inicial del nombre */}
                {(() => {
                  const avatarItem = SHOP_ITEMS.find(i => i.id === progress.progress.equippedAvatar);
                  if (avatarItem) {
                    // Colores según rareza
                    const rarityStyles: Record<string, string> = {
                      common: 'bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500/50 shadow-slate-500/20',
                      rare: 'bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-400/50 shadow-blue-500/30',
                      epic: 'bg-gradient-to-br from-violet-600 to-purple-700 border-violet-400/50 shadow-violet-500/30',
                      legendary: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 border-yellow-400/50 shadow-orange-500/40',
                      mythic: 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 border-red-400/50 shadow-red-500/50',
                    };
                    const style = rarityStyles[avatarItem.rarity] || rarityStyles.common;
                    return (
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-lg border-2 ${style}`}>
                        {avatarItem.icon}
                      </div>
                    );
                  }
                  return (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-emerald-500/30">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  );
                })()}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">
                      {t({ es: '¡Hola', en: 'Hello', pt: 'Olá' })}, {displayName}!
          </h1>
                    {/* Badge equipado */}
                    {progress.progress.equippedBadge && (
                      <span className="text-2xl" title={t(SHOP_ITEMS.find(i => i.id === progress.progress.equippedBadge)?.name || { es: '', en: '' })}>
                        {SHOP_ITEMS.find(i => i.id === progress.progress.equippedBadge)?.icon}
                      </span>
                    )}
                    <span>👋</span>
                  </div>
                  {/* Título equipado o mensaje motivacional */}
                  <p className="text-slate-400 flex items-center gap-2 text-sm md:text-base">
                    {progress.progress.equippedTitle ? (
                      <>
                        <span className="text-lg">{SHOP_ITEMS.find(i => i.id === progress.progress.equippedTitle)?.icon}</span>
                        <span className="text-purple-400 font-medium">{t(SHOP_ITEMS.find(i => i.id === progress.progress.equippedTitle)?.name || { es: '', en: '' })}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">{motivational.emoji}</span>
                        <span>{motivational.message}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
              
              {/* Quick Stats with XP and Coins */}
              <div className="hidden lg:flex items-center gap-3">
                {/* User Rank */}
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-800/80 to-slate-800/50 rounded-lg border border-slate-700">
                  <span className="text-2xl">{userRank.icon}</span>
                  <div>
                    <div className="text-white font-bold text-sm">{userRank.rank}</div>
                    <div className="text-slate-500 text-xs">{progress.progress.totalXP} XP</div>
                  </div>
                </div>
                
                {/* DataCoins */}
                <button 
                  onClick={() => setActiveTab('tienda')}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30 hover:border-yellow-500/50 transition-colors cursor-pointer"
                >
                  <span className="text-xl">💎</span>
                  <div>
                    <div className="text-yellow-400 font-bold text-sm">{progress.progress.dataCoins}</div>
                    <div className="text-yellow-600 text-xs">DataCoins</div>
                        </div>
                </button>

                {/* Streak */}
                {progress.progress.currentStreak > 0 && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/10 rounded-lg border border-orange-500/30">
                    <span className="text-lg">🔥</span>
                    <div className="text-orange-400 font-bold text-sm">{progress.progress.currentStreak}</div>
                      </div>
                )}

                <div className="text-center px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-emerald-400 font-bold text-sm">{progress.progress.completedSteps.length}</div>
                  <div className="text-slate-500 text-xs">Pasos</div>
              </div>
                <div className="text-center px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="text-blue-400 font-bold text-sm">{progress.progress.completedProjects.length}</div>
                  <div className="text-slate-500 text-xs">Proyectos</div>
                </div>

                {/* Search Button */}
                <button
                  onClick={() => setShowSearch(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors text-slate-400 hover:text-white"
                  title="Buscar (Ctrl+K)"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-xs hidden xl:inline">Ctrl+K</span>
                </button>

                {/* Notification Center */}
                <NotificationCenter />
                        </div>
            </div>
          </div>
        </div>

        {/* ⚡ ENERGY BAR - Shows daily limits for free users */}
        {isFreeUser && (
          <div className="border-b border-slate-800 bg-slate-900/50 py-3">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-center">
              <EnergyBar 
                exercisesRemaining={energySystem.exercisesRemaining}
                stepsRemaining={energySystem.stepsRemaining}
                exercisesUsed={energySystem.exercisesUsed}
                stepsUsed={energySystem.stepsUsed}
                isSubscribed={isSubscribed}
                timeUntilReset={energySystem.timeUntilReset}
              />
            </div>
          </div>
        )}

        {/* 🚨 UPGRADE BANNER - Solo para usuarios no suscritos */}
        {/* Muestra opciones de suscripción para usuarios free */}
        {!isSubscribed && (
              <div className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 border-b-2 border-emerald-500/50">
            <div className="max-w-7xl mx-auto px-4 py-5">
              {/* Urgency Header */}
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <span className="bg-emerald-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                  ¡SUSCRIBITE Y DESBLOQUEÁ TODO!
                </span>
                <span className="text-2xl">🚀</span>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Acceso completo a todo el contenido
                </h3>
                <p className="text-lg text-emerald-400 font-bold">
                  Por solo <span className="text-3xl">$30 USD/mes</span>
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  Este precio se mantiene mientras no canceles. Cancela cuando quieras, sin compromisos.
                </p>
              </div>

              {/* Pricing Options */}
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                {/* Mensual */}
                <a
                  href="https://iansaura.com/api/subscribe.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-slate-800/50 rounded-xl border border-slate-600 hover:border-emerald-500/50 transition-all group"
                >
                  <div className="text-center">
                    <div className="text-slate-400 text-sm mb-1">Mensual</div>
                    <div className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">$30</div>
                    <div className="text-slate-500 text-xs">USD/mes</div>
                    <div className="mt-2 text-xs text-emerald-400">Cancela cuando quieras</div>
                        </div>
                </a>
                
                {/* 6 Meses - Destacado - OneInfinite pago único */}
                <a
                  href="https://onei.la/56P"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-xl border-2 border-emerald-500 hover:border-emerald-400 transition-all relative group"
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                    MÁS POPULAR
                  </div>
                  <div className="text-center">
                    <div className="text-emerald-400 text-sm mb-1 font-medium">6 Meses</div>
                    <div className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors">$150</div>
                    <div className="text-slate-400 text-xs">= $25/mes</div>
                    <div className="mt-2 text-xs text-yellow-400 font-medium">Ahorrás $30 💰</div>
                  </div>
                </a>
                
                {/* 12 Meses - OneInfinite pago único */}
                <a
                  href="https://onei.la/0KX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/50 hover:border-purple-400 transition-all group"
                >
                  <div className="text-center">
                    <div className="text-purple-400 text-sm mb-1 font-medium">12 Meses</div>
                    <div className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">$240</div>
                    <div className="text-slate-400 text-xs">= $30/mes</div>
                    <div className="mt-2 text-xs text-yellow-400 font-medium">Ahorrás $120 🔥</div>
                  </div>
                </a>
              </div>

              {/* Value Proposition */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-center mb-3">
                  <span className="text-white font-bold">¿Qué incluye tu suscripción?</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> 3 Roadmaps completos
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> +25 Proyectos guiados
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> 8 Videos del Bootcamp
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> Generador de Datasets
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> APIs para practicar
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> Discord Premium
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> Q&A mensuales en vivo
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span> Actualizaciones constantes
                  </div>
                </div>
              </div>

              {/* Q&A Access Restriction Notice */}
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl border border-purple-500/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎤</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-purple-300">Q&A Mensuales en Vivo</h4>
                    <p className="text-sm text-slate-400 mt-1">
                      Los suscriptores tienen acceso a sesiones de Q&A mensuales donde pueden dejar sus preguntas 
                      y recibir respuestas en vivo. <span className="text-purple-400 font-medium">Suscribite para participar.</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      📅 Próximo Q&A: 17 de Diciembre 18:00 hs Argentina
                    </p>
                  </div>
                </div>
              </div>

              {/* Subscribe CTA */}
              <div className="text-center mt-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium border border-emerald-500/30">
                  <Zap className="w-4 h-4" />
                  {t({ es: 'Suscribite para acceso completo', en: 'Subscribe for full access', pt: 'Assine para acesso completo' })}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs - Desktop (Sticky) */}
        <div className="border-b border-slate-800 sticky top-16 bg-slate-950/98 backdrop-blur-md z-40 hidden md:block">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex gap-1 py-2 items-center">
              {/* Primary Tabs */}
              {primaryTabs.map((tab) => {
                const isLocked = 'locked' in tab && tab.locked;
                const isNew = 'isNew' in tab && tab.isNew;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSearchParams({ tab: tab.id });
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                      isLocked
                        ? 'text-slate-500 hover:text-slate-400 hover:bg-slate-800/30 border border-slate-700/50 opacity-70'
                        : activeTab === tab.id
                          ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    {isLocked ? <Lock className="w-4 h-4" /> : <tab.icon className="w-4 h-4" />}
                    {tab.label}
                    {isLocked && <span className="text-xs">🔒</span>}
                    {isNew && <span className="text-xs bg-blue-500 text-white px-1.5 py-0.5 rounded-full ml-1">NEW</span>}
                  </button>
                );
              })}

              {/* More Dropdown */}
              <div className="relative" ref={moreDropdownRef}>
                <button
                  onClick={() => setShowMoreDropdown(!showMoreDropdown)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                    isSecondaryTabActive
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                      : showMoreDropdown
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                  {t({ es: 'Más', en: 'More', pt: 'Mais' })}
                  <ChevronDown className={`w-4 h-4 transition-transform ${showMoreDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showMoreDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
                    {secondaryTabs.map((tab) => {
                      const isLocked = 'locked' in tab && tab.locked;
                      const isComingSoon = 'isComingSoon' in tab && tab.isComingSoon;
                      const isHighlight = 'highlight' in tab && tab.highlight;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id as any);
                            setSearchParams({ tab: tab.id });
                            setShowMoreDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 transition-all ${
                            isComingSoon
                              ? 'text-orange-400/70 hover:text-orange-400 hover:bg-orange-500/10'
                              : isLocked
                                ? 'text-slate-500 hover:text-slate-400 hover:bg-slate-800/50'
                                : activeTab === tab.id
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : isHighlight
                                    ? 'text-yellow-400 hover:bg-yellow-500/10'
                                    : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {isLocked && !isComingSoon ? <Lock className="w-4 h-4" /> : <tab.icon className="w-4 h-4" />}
                          <span>{tab.label}</span>
                          {isLocked && !isComingSoon && <span className="text-xs ml-auto">🔒</span>}
                          {isComingSoon && <span className="text-xs ml-auto">🚀</span>}
                          {isHighlight && !isLocked && <span className="text-xs ml-auto">💎</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Bottom Navigation - Fixed (5 items max) */}
        <div className="fixed bottom-0 left-0 right-0 bg-slate-950/98 backdrop-blur-md border-t border-slate-800 z-50 md:hidden safe-area-bottom">
          <nav className="flex justify-around items-center py-2 px-1">
            {[
              { id: 'dashboard', icon: TrendingUp, label: 'Home', locked: false },
              { id: 'roadmap', icon: Map, label: 'Roadmap', locked: false },
              { id: 'practica', icon: Code, label: 'Práctica', locked: false },
              { id: 'interviews', icon: Layers, label: 'Entrevistas', locked: isFreeUser },
              { id: 'more', icon: MoreHorizontal, label: t({ es: 'Más', en: 'More', pt: 'Mais' }), locked: false, isMore: true },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if ('isMore' in tab && tab.isMore) {
                    setShowMoreDropdown(!showMoreDropdown);
                  } else {
                    setActiveTab(tab.id as any);
                    setSearchParams({ tab: tab.id });
                    setShowMoreDropdown(false);
                  }
                }}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all relative ${
                  tab.locked
                    ? 'text-slate-600 opacity-60'
                    : ('isMore' in tab && tab.isMore)
                      ? (showMoreDropdown || isSecondaryTabActive)
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-slate-500'
                      : activeTab === tab.id
                        ? 'text-emerald-400 bg-emerald-500/10'
                        : 'text-slate-500'
                }`}
              >
                {tab.locked ? <Lock className="w-5 h-5" /> : <tab.icon className="w-5 h-5" />}
                <span className="text-[10px] font-medium">{tab.label}</span>
                {tab.locked && <span className="absolute -top-1 -right-1 text-[8px]">🔒</span>}
              </button>
            ))}
          </nav>

          {/* Mobile More Dropdown */}
          {showMoreDropdown && (
            <div className="absolute bottom-full left-0 right-0 bg-slate-900 border-t border-slate-700 rounded-t-2xl shadow-xl pb-2 animate-in slide-in-from-bottom duration-200">
              <div className="p-4 grid grid-cols-4 gap-3">
                {[
                  { id: 'proyectos', icon: Target, label: t({ es: 'Proyectos', en: 'Projects', pt: 'Projetos' }), locked: isFreeUser },
                  { id: 'datasets', icon: Database, label: 'Datasets', locked: isFreeUser },
                  { id: 'grabaciones', icon: Video, label: 'Videos', locked: isFreeUser },
                  { id: 'tienda', icon: ShoppingBag, label: t({ es: 'Tienda', en: 'Shop', pt: 'Loja' }), locked: isFreeUser, highlight: true },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setSearchParams({ tab: tab.id });
                      setShowMoreDropdown(false);
                    }}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                      tab.locked
                        ? 'text-slate-600 bg-slate-800/30'
                        : activeTab === tab.id
                          ? 'text-emerald-400 bg-emerald-500/20'
                          : 'highlight' in tab && tab.highlight
                            ? 'text-yellow-400 bg-slate-800 hover:bg-yellow-500/10'
                            : 'text-slate-400 bg-slate-800 hover:bg-slate-700'
                    }`}
                  >
                    {tab.locked ? <Lock className="w-6 h-6" /> : <tab.icon className="w-6 h-6" />}
                    <span className="text-[10px] font-medium">{tab.label}</span>
                    {tab.locked && <span className="text-[8px]">🔒</span>}
                    {'highlight' in tab && tab.highlight && !tab.locked && <span className="text-[8px]">💎</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Content - Extra bottom padding for mobile nav */}
        <div className="max-w-7xl mx-auto px-4 py-8 pb-24 md:pb-8">
          {/* Free User Upgrade Banner */}
          {isFreeUser && (
            <div className="mb-6 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Rocket className="w-8 h-8" />
                  </div>
                    <div>
                    <h3 className="text-xl font-bold">🎓 Estás en el Plan Gratuito</h3>
                    <p className="text-emerald-100 text-sm">
                      Tenés acceso al Nivel 0 y práctica básica. Suscribite para desbloquear los 3 niveles completos, proyectos, grabaciones y más.
                    </p>
                      </div>
                </div>
                <button
                  onClick={() => navigate('/suscripcion')}
                  className="flex-shrink-0 flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-colors shadow-lg"
                >
                  <Crown className="w-5 h-5" />
                  Suscribirme - $30/mes
                </button>
                    </div>
                  </div>
          )}
          
          {activeTab === 'dashboard' && <ExtractedDashboardTab setActiveTab={setActiveTab} progress={progress} userName={displayName} userEmail={user?.email || ''} onShowBadge={(level, type) => setShowBadgeModal({ level, type })} isFreeUser={isFreeUser} />}
          {activeTab === 'roadmap' && <RoadmapTab 
            progress={progress} 
            setActiveTab={setActiveTab} 
            celebration={celebration} 
            isFreeUser={isFreeUser}
            energySystem={energySystem}
            onPositionChange={handlePositionChange}
            onLevelComplete={checkLevelCompletion}
            userEmail={user?.email}
          />}
          {activeTab === 'proyectos' && (isFreeUser ? <LockedContentPreview title={translateKey('locked.projects.title')} description={translateKey('locked.projects.description')} features={[translateKey('locked.projects.feature1'), translateKey('locked.projects.feature2'), translateKey('locked.projects.feature3'), translateKey('locked.projects.feature4')]} userEmail={user?.email} /> : <ExtractedProyectosTab progress={progress} />)}
          {activeTab === 'datasets' && <ExtractedDatasetsTab userEmail={user?.email || ''} isFreeUser={isFreeUser} />}
          {activeTab === 'grabaciones' && (isFreeUser ? <LockedContentPreview title={translateKey('locked.videos.title')} description={translateKey('locked.videos.description')} features={[translateKey('locked.videos.feature1'), translateKey('locked.videos.feature2'), translateKey('locked.videos.feature3'), translateKey('locked.videos.feature4')]} userEmail={user?.email} /> : <GrabacionesTab progress={progress} />)}
          {activeTab === 'practica' && <PracticaTab progress={progress} isFreeUser={isFreeUser} energySystem={energySystem} userEmail={user?.email} />}
          {activeTab === 'interviews' && (
                  <InterviewPrepTab 
                    userEmail={user?.email} 
                    isFreeUser={isFreeUser}
                    onAddXP={progress.addXPAndCoins} 
                    onUnlockAchievement={progress.addAchievement} 
                    achievements={progress.progress.achievements}
                    onAskAI={(question, context) => {
                      setAiContext({ title: 'Interview Prep', description: context });
                      setSaurioQuestion(question);
                    }}
                  />
                )}
          {activeTab === 'tienda' && isFreeUser && <LockedContentPreview title={translateKey('locked.store.title')} description={translateKey('locked.store.description')} features={[translateKey('locked.store.feature1'), translateKey('locked.store.feature2'), translateKey('locked.store.feature3'), translateKey('locked.store.feature4')]} userEmail={user?.email} />}
          {activeTab === 'tienda' && !isFreeUser && (
            <Shop 
              progress={progress.progress}
              onPurchase={progress.purchaseItem}
              onEquip={progress.equipItem}
              onUnequip={progress.unequipItem}
            />
          )}
          
          {/* 🚀 COMING SOON - Especializaciones Tab */}
          {activeTab === 'especializaciones' && (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="bg-gradient-to-br from-orange-500/10 via-slate-900 to-amber-500/10 rounded-2xl p-8 border border-orange-500/20 text-center">
                <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-500/30">
                  <Rocket className="w-4 h-4" />
                  {t({ es: 'Nuevo contenido en Enero 2025', en: 'New content in January 2025', pt: 'Novo conteúdo em Janeiro 2025' })}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {t({ es: '🚀 Especializaciones Avanzadas', en: '🚀 Advanced Specializations', pt: '🚀 Especializações Avançadas' })}
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-6">
                  {t({ es: 'Rutas de aprendizaje premium con Labs hands-on, 100+ pasos, proyectos reales y preparación para certificaciones oficiales. Todo incluido en tu suscripción.', en: 'Premium learning paths with hands-on Labs, 100+ steps, real projects and official certification prep. All included in your subscription.', pt: 'Trilhas de aprendizado premium com Labs hands-on, 100+ passos, projetos reais e preparação para certificações oficiais. Tudo incluído na sua assinatura.' })}
                </p>
                <div className="flex items-center justify-center gap-2 text-emerald-400">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">{t({ es: 'Incluido gratis en tu suscripción Premium', en: 'Included free in your Premium subscription', pt: 'Incluído grátis na sua assinatura Premium' })}</span>
                </div>
              </div>

              {/* Countdown Cards - Databricks y AWS */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Databricks - Enero 2025 */}
                <div className="bg-gradient-to-br from-orange-500/10 to-slate-900 rounded-2xl p-6 border border-orange-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-5xl">🔶</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {t({ es: 'Especialización en Databricks', en: 'Databricks Specialization', pt: 'Especialização em Databricks' })}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {t({ es: 'La plataforma unificada de datos más demandada', en: 'The most in-demand unified data platform', pt: 'A plataforma unificada de dados mais demandada' })}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-xs mb-4 line-clamp-2">
                    {t({ es: 'Domina Databricks desde cero hasta la certificación DE Associate. 12 fases con 100+ pasos detallados, 10 Labs hands-on, 20 ejercicios de Spark y Delta Lake, 5 proyectos completos.', en: 'Master Databricks from zero to DE Associate certification. 12 phases with 100+ detailed steps, 10 hands-on Labs, 20 Spark and Delta Lake exercises, 5 complete projects.', pt: 'Domine Databricks do zero à certificação DE Associate. 12 fases com 100+ passos detalhados, 10 Labs hands-on, 20 exercícios de Spark e Delta Lake, 5 projetos completos.' })}
                  </p>
                  
                  {/* Countdown Databricks */}
                  <div className="bg-slate-900/80 rounded-xl p-4 mb-4 border border-orange-500/20">
                    <p className="text-orange-400 text-sm font-semibold mb-3">🚀 {t({ es: 'Lanzamiento: 1 de Enero 2025', en: 'Launch: January 1, 2025', pt: 'Lançamento: 1 de Janeiro 2025' })}</p>
                    <CountdownTimer targetDate="2025-01-01T00:00:00" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs text-slate-300">12 {t({ es: 'Fases', en: 'Phases', pt: 'Fases' })}</span>
                    <span className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs text-slate-300">100+ {t({ es: 'Pasos', en: 'Steps', pt: 'Passos' })}</span>
                    <span className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs text-slate-300">10 {t({ es: 'Labs', en: 'Labs', pt: 'Labs' })}</span>
                    <span className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs text-slate-300">20 {t({ es: 'Ejercicios', en: 'Exercises', pt: 'Exercícios' })}</span>
                  </div>
                </div>

                {/* AWS - Febrero 2025 */}
                <div className="bg-gradient-to-br from-amber-500/10 to-slate-900 rounded-2xl p-6 border border-amber-500/30">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-5xl">☁️</span>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {t({ es: 'Especialización en AWS Data Engineering', en: 'AWS Data Engineering Specialization', pt: 'Especialização em AWS Data Engineering' })}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {t({ es: 'El cloud #1 en demanda laboral', en: 'The #1 cloud in job demand', pt: 'A nuvem #1 em demanda de emprego' })}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 text-xs mb-4 line-clamp-2">
                    {t({ es: 'Conviértete en experto en el stack de datos de AWS. 12 fases, 107 pasos, 10 Labs hands-on, 35 ejercicios, 5 proyectos. Aprenderás S3, Glue, Redshift, Athena, EMR, Kinesis, y Step Functions.', en: 'Become an expert in the AWS data stack. 12 phases, 107 steps, 10 hands-on Labs, 35 exercises, 5 projects. You will learn S3, Glue, Redshift, Athena, EMR, Kinesis, and Step Functions.', pt: 'Torne-se um especialista no stack de dados da AWS. 12 fases, 107 passos, 10 Labs hands-on, 35 exercícios, 5 projetos. Você aprenderá S3, Glue, Redshift, Athena, EMR, Kinesis e Step Functions.' })}
                  </p>
                  
                  {/* Countdown AWS */}
                  <div className="bg-slate-900/80 rounded-xl p-4 mb-4 border border-amber-500/20">
                    <p className="text-amber-400 text-sm font-semibold mb-3">🚀 {t({ es: 'Lanzamiento: 1 de Febrero 2025', en: 'Launch: February 1, 2025', pt: 'Lançamento: 1 de Fevereiro 2025' })}</p>
                    <CountdownTimer targetDate="2025-02-01T00:00:00" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs text-slate-300">12 {t({ es: 'Fases', en: 'Phases', pt: 'Fases' })}</span>
                    <span className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs text-slate-300">107+ {t({ es: 'Pasos', en: 'Steps', pt: 'Passos' })}</span>
                    <span className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs text-slate-300">10 {t({ es: 'Labs', en: 'Labs', pt: 'Labs' })}</span>
                    <span className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs text-slate-300">35 {t({ es: 'Ejercicios', en: 'Exercises', pt: 'Exercícios' })}</span>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  {t({ es: '¿Qué incluye cada especialización?', en: 'What does each specialization include?', pt: 'O que inclui cada especialização?' })}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">100+</div>
                    <div className="text-slate-400 text-sm">{t({ es: 'Pasos detallados', en: 'Detailed steps', pt: 'Passos detalhados' })}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <div className="text-2xl font-bold text-blue-400 mb-1">10+</div>
                    <div className="text-slate-400 text-sm">{t({ es: 'Labs hands-on', en: 'Hands-on Labs', pt: 'Labs hands-on' })}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <div className="text-2xl font-bold text-purple-400 mb-1">20+</div>
                    <div className="text-slate-400 text-sm">{t({ es: 'Ejercicios prácticos', en: 'Practical exercises', pt: 'Exercícios práticos' })}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
                    <div className="text-2xl font-bold text-orange-400 mb-1">5</div>
                    <div className="text-slate-400 text-sm">{t({ es: 'Proyectos portfolio', en: 'Portfolio projects', pt: 'Projetos portfolio' })}</div>
                  </div>
                </div>
              </div>

              {/* Stay Tuned */}
              <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20 text-center">
                <Bell className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">
                  {t({ es: '¡No te pierdas el lanzamiento!', en: "Don't miss the launch!", pt: 'Não perca o lançamento!' })}
                </h3>
                <p className="text-slate-400 text-sm">
                  {t({ es: 'Introduce tu email arriba para recibir una notificación cuando lancemos. Serás de los primeros en acceder.', en: 'Enter your email above to get notified when we launch. You will be among the first to access.', pt: 'Digite seu email acima para receber uma notificação quando lançarmos. Você será um dos primeiros a acessar.' })}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ⚡ ENERGY LIMIT MODAL - Shows when user hits daily limit */}
      <EnergyLimitModal 
        isOpen={energySystem.showLimitModal}
        onClose={() => energySystem.setShowLimitModal(false)}
        limitType={energySystem.limitType}
        timeUntilReset={energySystem.timeUntilReset}
      />

      {/* 🗺️ FLOATING RETURN TO ROADMAP BUTTON */}
      {/* Hide in roadmap (already there) and practica (has its own button at top) */}
      {activeTab !== 'roadmap' && activeTab !== 'practica' && savedRoadmapPosition && (
        <button
          onClick={() => {
            const pos = savedRoadmapPosition;
            // Navigate to roadmap with saved position
            navigate(`/members?tab=roadmap&level=${pos.level}&phase=${pos.phaseIndex}${pos.stepId ? `&step=${pos.stepId}` : ''}`);
            setActiveTab('roadmap');
          }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-full shadow-lg shadow-violet-500/30 transition-all hover:scale-105 group"
        >
          <svg className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="font-medium">{t({ es: 'Volver al Roadmap', en: 'Back to Roadmap', pt: 'Voltar ao Roadmap' })}</span>
          <span className="text-violet-200 text-sm hidden sm:inline">
            ({t({ es: 'Nivel', en: 'Level', pt: 'Nível' })} {savedRoadmapPosition.level})
          </span>
        </button>
      )}

      {/* Saurio - Global AI Tutor (only show when NOT in practice tab, that one has its own contextual Saurio) */}
      {activeTab !== 'practica' && (
        <AITutor
          exerciseTitle={aiContext?.title || t({ es: 'Área de Miembros', en: 'Members Area', pt: 'Área de Membros' })}
          exerciseDescription={aiContext?.description || t({ 
            es: 'Estás en el dashboard de la plataforma. Preguntame sobre cómo usar la plataforma, por dónde empezar, o cualquier duda sobre Data Engineering.', 
            en: 'You are in the platform dashboard. Ask me about how to use the platform, where to start, or any questions about Data Engineering.',
            pt: 'Você está no painel da plataforma. Pergunte-me sobre como usar a plataforma, por onde começar, ou qualquer dúvida sobre Data Engineering.'
          })}
          userCode=""
          language="general"
          userEmail={user?.email || ''}
          floating={true}
          initialQuestion={saurioQuestion}
          onQuestionSent={() => setSaurioQuestion('')}
        />
      )}
    </>
  );
};


// ============================================
// LOCKED CONTENT PREVIEW - For free users
// ============================================

// ============================================
// PROYECTOS TAB
// ============================================

// ============================================
// DATASETS TAB
// ============================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GeneratedDataset {
  dataset_type: string;
  description: string;
  tables: { [key: string]: any[] };
  schema: { [key: string]: string[] };
  relationships: string[];
}

// Dataset Suggestion Box Component with Voting
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface DatasetSuggestion {
  id: string;
  suggestion: string;
  votes: number;
  voters: string[];
  created_at: string;
}


// GrabacionesTab - Now extracted to components/members/tabs/VideosTab.tsx
const GrabacionesTab = ExtractedGrabacionesTab;

// PracticaTab - Now extracted to components/members/tabs/PracticaTab.tsx
const PracticaTab = ExtractedPracticaTab;

// LeaderboardSection - Now extracted to components/members/LeaderboardSection.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LeaderboardSection = ExtractedLeaderboardSection;

// ============================================
// API TOKEN SECTION
// ============================================
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ApiTokenSectionProps {
  userEmail: string;
}


export default Members;
