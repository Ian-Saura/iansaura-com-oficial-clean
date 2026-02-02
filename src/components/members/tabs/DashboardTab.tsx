import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, Zap, Trophy, Sparkles, ArrowRight, 
  Briefcase, Crown, Award
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { LocalizedContent } from '../../../types/i18n';
import { useUserProgress } from '../../../hooks/useUserProgress';
import { roadmapLevels, getLevelStepIds } from '../../../data/roadmapData';
import { DISCORD_INVITE_LINK, getDiscordConnectLink } from '../../../data/videosData';
import { currentChallenge } from '../../../data/challengesData';
import { getTodaysMissions, DAILY_BONUS, ACHIEVEMENTS, checkAchievementUnlocked } from '../../../data/dailyChallenges';
import { USER_RANKS } from '../../../types/members';
import { CertificateCard } from '../../CertificateGenerator';
// API Token functionality moved to DatasetsTab
import { LeaderboardSection } from '../LeaderboardSection';
import { AmbassadorProgram } from '../../AmbassadorProgram';
import { DiscordLinkSection, DiscordQuickButton } from '../DiscordLinkSection';

// Roadmap position storage - for returning to exact position
const ROADMAP_POSITION_KEY = 'ian-saura-roadmap-position';

interface RoadmapPosition {
  level: number;
  phaseIndex: number;
  stepId?: string;
  timestamp: number;
}

const getRoadmapPosition = (): RoadmapPosition | null => {
  const saved = localStorage.getItem(ROADMAP_POSITION_KEY);
  if (!saved) return null;
  try {
    const position = JSON.parse(saved);
    // Expire after 24 hours
    if (Date.now() - position.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem(ROADMAP_POSITION_KEY);
      return null;
    }
    return position;
  } catch {
    return null;
  }
};

interface DashboardTabProps {
  setActiveTab: (tab: 'dashboard' | 'roadmap' | 'proyectos' | 'datasets' | 'grabaciones' | 'tienda' | 'practica') => void;
  progress: ReturnType<typeof useUserProgress>;
  userName: string;
  userEmail: string;
  onShowBadge: (level: number, type: '50' | '100') => void;
  isFreeUser?: boolean;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ 
  setActiveTab, 
  progress, 
  userName, 
  userEmail, 
  onShowBadge,
  isFreeUser = false
}) => {
  const { t } = useLanguage();
  const level0Progress = progress.calculateLevelProgress(getLevelStepIds(0));
  const level1Progress = progress.calculateLevelProgress(getLevelStepIds(1));
  const level2Progress = progress.calculateLevelProgress(getLevelStepIds(2));
  const level3Progress = progress.calculateLevelProgress(getLevelStepIds(3));
  const projectsCompleted = progress.progress.completedProjects.length;

  // Determine current level (free users only see level 0)
  const currentLevel = isFreeUser 
    ? 0 
    : level1Progress < 100 ? 1 : level2Progress < 100 ? 2 : 3;
  const currentProgress = isFreeUser 
    ? level0Progress 
    : currentLevel === 1 ? level1Progress : currentLevel === 2 ? level2Progress : level3Progress;
  const levelConfig = {
    0: { emoji: '🌱', label: { es: 'Fundamentos', en: 'Fundamentals', pt: 'Fundamentos' }, color: 'lime', nextAction: { es: 'Aprendé Python y SQL básico', en: 'Learn Python and SQL basics', pt: 'Aprenda Python e SQL básico' } },
    1: { emoji: '⚔️', label: { es: 'Primer Trabajo', en: 'First Job', pt: 'Primeiro Emprego' }, color: 'emerald', nextAction: { es: 'Dominá Python y SQL', en: 'Master Python and SQL', pt: 'Domine Python e SQL' } },
    2: { emoji: '🚀', label: { es: 'Jr → SSR', en: 'Jr → SSR', pt: 'Jr → Pleno' }, color: 'blue', nextAction: { es: 'Arquitectura y liderazgo', en: 'Architecture and leadership', pt: 'Arquitetura e liderança' } },
    3: { emoji: '👑', label: { es: 'Senior', en: 'Senior', pt: 'Sênior' }, color: 'purple', nextAction: { es: 'Impacto y mentoría', en: 'Impact and mentorship', pt: 'Impacto e mentoria' } },
  };
  const config = levelConfig[currentLevel as keyof typeof levelConfig];

  // Get equipped items

  return (
    <div className="space-y-6">
      {/* 💬 Discord Quick Button - simple status indicator at top */}
      <DiscordQuickButton userEmail={userEmail} />

      {/* 🎯 MAIN: Today's Session - Simple and focused */}
        <WhatToDoToday 
          progress={progress}
          level1Progress={level1Progress}
          level2Progress={level2Progress}
          level3Progress={level3Progress}
          projectsCompleted={projectsCompleted}
          setActiveTab={setActiveTab}
        />

      {/* 📊 Progress + Streak in one compact row */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Current Level Progress */}
        <CurrentProgressCard 
          config={config}
          currentLevel={currentLevel}
          currentProgress={currentProgress}
          setActiveTab={setActiveTab}
        />
        
        {/* Streak - Compact */}
        <StreakCard progress={progress} />
      </div>

      {/* 🤝 Ambassador Program - Contact for commissions */}
      <AmbassadorProgram userEmail={userEmail} userName={userName} />

      {/* 🔧 Tools Section - Collapsible */}
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
          <span className="text-slate-300 font-medium flex items-center gap-2">
            <span className="text-lg">🔧</span> {t('tools.title')}
          </span>
          <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-4 space-y-4">
          {/* Discord Link Section */}
          <DiscordLinkSection userEmail={userEmail} userName={userName} />
          
          {/* Certificates */}
          <CertificatesCard 
            progress={progress}
            userName={userName}
            userEmail={userEmail}
          />
        </div>
      </details>

      {/* 🏆 Leaderboard - Collapsible */}
      <details className="group">
        <summary className="flex items-center justify-between cursor-pointer p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600 transition-colors">
          <span className="text-slate-300 font-medium flex items-center gap-2">
            <span className="text-lg">🏆</span> {t('leaderboard.title')}
          </span>
          <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="mt-4">
          <LeaderboardSection userProgress={progress} userName={userName} />
        </div>
      </details>
    </div>
  );
};

// ============================================
// SUB-COMPONENTS
// ============================================

// 🎯 DAILY STUDY SESSION - Personalized guided session like Duolingo
interface WhatToDoTodayProps {
  progress: ReturnType<typeof useUserProgress>;
  level1Progress: number;
  level2Progress: number;
  level3Progress: number;
  projectsCompleted: number;
  setActiveTab: (tab: any) => void;
}

const DAILY_SESSION_KEY = 'ian-saura-daily-session';

interface DailySessionTask {
  id: string;
  type: 'roadmap' | 'exercise' | 'project' | 'video';
  title: LocalizedContent;
  emoji: string;
  time: number; // minutes
  xp: number;
  link?: string;
  tab?: string;
  completed: boolean;
}

const WhatToDoToday: React.FC<WhatToDoTodayProps> = ({ 
  progress, 
  level1Progress, 
  level2Progress, 
  level3Progress,
  projectsCompleted,
  setActiveTab 
}) => {
  const { t, tLocalized } = useLanguage();
  const currentStreak = progress.progress.currentStreak || 0;
  const completedSteps = progress.progress.completedSteps?.length || 0;
  const today = new Date().toISOString().split('T')[0];
  const lastActivity = progress.progress.lastActivityDate || '';
  const isActiveToday = lastActivity === today;
  
  // Get or generate today's session
  const [sessionTasks, setSessionTasks] = React.useState<DailySessionTask[]>(() => {
    try {
      const saved = localStorage.getItem(DAILY_SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.date === today) {
          return parsed.tasks;
        }
      }
    } catch {}
    
    // Generate new session based on user level
    return generateDailySession(completedSteps, level1Progress, level2Progress, projectsCompleted);
  });

  // Save session to localStorage
  React.useEffect(() => {
    localStorage.setItem(DAILY_SESSION_KEY, JSON.stringify({
      date: today,
      tasks: sessionTasks
    }));
  }, [sessionTasks, today]);

  // Generate personalized daily session
  function generateDailySession(steps: number, l1: number, l2: number, projects: number): DailySessionTask[] {
    const tasks: DailySessionTask[] = [];
    
    // Determine user level
    const isNewUser = steps === 0;
    const isBeginner = steps < 20;
    const isIntermediate = l1 >= 50 && l1 < 100;
    const isAdvanced = l1 === 100;
    
    if (isNewUser) {
      // New user: simple intro session
      tasks.push({
        id: 'new-1',
        type: 'roadmap',
        title: { es: 'Completá tu primer paso del roadmap', en: 'Complete your first roadmap step', pt: 'Complete seu primeiro passo do roadmap' },
        emoji: '🚀',
        time: 5,
        xp: 50,
        tab: 'roadmap',
        completed: false
      });
      tasks.push({
        id: 'new-2',
        type: 'exercise',
        title: { es: 'Hacé 1 ejercicio de Python Easy', en: 'Do 1 Python Easy exercise', pt: 'Faça 1 exercício de Python Fácil' },
        emoji: '🐍',
        time: 5,
        xp: 25,
        tab: 'practica',
        completed: false
      });
    } else if (isBeginner) {
      // Beginner: focus on fundamentals
      tasks.push({
        id: 'beg-1',
        type: 'roadmap',
        title: { es: 'Completá 3 pasos del roadmap', en: 'Complete 3 roadmap steps', pt: 'Complete 3 passos do roadmap' },
        emoji: '📚',
        time: 10,
        xp: 75,
        tab: 'roadmap',
        completed: false
      });
      tasks.push({
        id: 'beg-2',
        type: 'exercise',
        title: { es: 'Hacé 2 ejercicios SQL Easy', en: 'Do 2 SQL Easy exercises', pt: 'Faça 2 exercícios SQL Fácil' },
        emoji: '🗄️',
        time: 10,
        xp: 50,
        tab: 'practica',
        completed: false
      });
      tasks.push({
        id: 'beg-3',
        type: 'exercise',
        title: { es: 'Hacé 1 ejercicio Python Easy', en: 'Do 1 Python Easy exercise', pt: 'Faça 1 exercício Python Fácil' },
        emoji: '🐍',
        time: 5,
        xp: 25,
        tab: 'practica',
        completed: false
      });
    } else if (isIntermediate) {
      // Intermediate: mix of roadmap + harder exercises
      tasks.push({
        id: 'int-1',
        type: 'roadmap',
        title: { es: 'Completá 3 pasos del roadmap', en: 'Complete 3 roadmap steps', pt: 'Complete 3 passos do roadmap' },
        emoji: '📚',
        time: 10,
        xp: 75,
        tab: 'roadmap',
        completed: false
      });
      tasks.push({
        id: 'int-2',
        type: 'exercise',
        title: { es: 'Hacé 2 ejercicios SQL Medium', en: 'Do 2 SQL Medium exercises', pt: 'Faça 2 exercícios SQL Médio' },
        emoji: '⚡',
        time: 15,
        xp: 100,
        tab: 'practica',
        completed: false
      });
      if (projects === 0) {
        tasks.push({
          id: 'int-3',
          type: 'project',
          title: { es: 'Empezá tu primer proyecto', en: 'Start your first project', pt: 'Comece seu primeiro projeto' },
          emoji: '💼',
          time: 15,
          xp: 150,
          tab: 'proyectos',
          completed: false
        });
      }
    } else if (isAdvanced) {
      // Advanced: projects + hard exercises
      tasks.push({
        id: 'adv-1',
        type: 'roadmap',
        title: { es: 'Completá 2 pasos del Nivel 2', en: 'Complete 2 steps of Level 2', pt: 'Complete 2 passos do Nível 2' },
        emoji: '🎯',
        time: 10,
        xp: 100,
        tab: 'roadmap',
        completed: false
      });
      tasks.push({
        id: 'adv-2',
        type: 'exercise',
        title: { es: 'Hacé 1 ejercicio SQL Hard', en: 'Do 1 SQL Hard exercise', pt: 'Faça 1 exercício SQL Difícil' },
        emoji: '🔥',
        time: 15,
        xp: 150,
        tab: 'practica',
        completed: false
      });
      tasks.push({
        id: 'adv-3',
        type: 'project',
        title: { es: 'Avanzá en un proyecto', en: 'Advance in a project', pt: 'Avance em um projeto' },
        emoji: '🚀',
        time: 20,
        xp: 200,
        tab: 'proyectos',
        completed: false
      });
    } else {
      // Default session
      tasks.push({
        id: 'def-1',
        type: 'roadmap',
        title: { es: 'Completá 2 pasos del roadmap', en: 'Complete 2 roadmap steps', pt: 'Complete 2 passos do roadmap' },
        emoji: '📚',
        time: 10,
        xp: 50,
        tab: 'roadmap',
        completed: false
      });
      tasks.push({
        id: 'def-2',
        type: 'exercise',
        title: { es: 'Hacé 2 ejercicios de práctica', en: 'Do 2 practice exercises', pt: 'Faça 2 exercícios de prática' },
        emoji: '⚡',
        time: 10,
        xp: 50,
        tab: 'practica',
        completed: false
      });
    }
    
    return tasks;
  }

  const completedCount = sessionTasks.filter(t => t.completed).length;
  const totalTasks = sessionTasks.length;
  const sessionProgress = totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;
  const totalTime = sessionTasks.reduce((acc, t) => acc + t.time, 0);
  const totalXP = sessionTasks.reduce((acc, t) => acc + t.xp, 0);
  
  const toggleTask = (taskId: string) => {
    setSessionTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const handleStartTask = (task: DailySessionTask) => {
    if (task.tab) {
      setActiveTab(task.tab);
    }
  };

  const isSessionComplete = completedCount === totalTasks && totalTasks > 0;
  
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-5 ${
      isSessionComplete 
        ? 'bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-teal-500/20 border-emerald-500/50'
        : !isActiveToday && currentStreak > 0
          ? 'bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-red-500/20 border-amber-500/50 animate-pulse'
          : 'bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-blue-500/10 border-indigo-500/30'
    }`}>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-2xl">{isSessionComplete ? '🎉' : '📖'}</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isSessionComplete ? t('dashboard.sessionTitle.complete') : t('dashboard.sessionTitle.active')}
            </h3>
            <p className="text-sm text-slate-400">
              {isSessionComplete 
                ? t('dashboard.sessionSubtitle.complete', { xp: totalXP })
                : t('dashboard.sessionSubtitle.active', { time: totalTime, xp: totalXP })}
            </p>
          </div>
        </div>
        
        {/* Streak warning */}
        {!isActiveToday && currentStreak > 0 && !isSessionComplete && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-full">
            <span className="text-amber-400 text-sm font-medium">🔥 {t('quickWin.streakRisk')}</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>{t('dashboard.tasks', { completed: completedCount, total: totalTasks })}</span>
          <span>{Math.round(sessionProgress)}%</span>
        </div>
        <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${
              isSessionComplete 
                ? 'bg-gradient-to-r from-emerald-500 to-green-400'
                : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            }`}
            style={{ width: `${sessionProgress}%` }}
          />
        </div>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {sessionTasks.map((task, idx) => (
          <div
            key={task.id}
            className={`group relative flex items-center gap-3 p-3 rounded-xl border transition-all ${
              task.completed
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
            }`}
          >
            {/* Checkbox */}
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-500 text-white'
                  : 'border-slate-500 hover:border-indigo-400'
              }`}
            >
              {task.completed && (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            
            {/* Task info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-lg">{task.emoji}</span>
                <span className={`font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-white'}`}>
                  {tLocalized(task.title)}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-slate-500">⏱️ {task.time} min</span>
                <span className="text-xs text-amber-400">+{task.xp} XP</span>
              </div>
            </div>
            
            {/* Start button */}
            {!task.completed && (
              <button
                onClick={() => handleStartTask(task)}
                className="opacity-0 group-hover:opacity-100 px-3 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-lg transition-all flex items-center gap-1"
              >
                {t('dashboard.go')} <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Session complete celebration */}
      {isSessionComplete && (
        <div className="mt-4 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center">
          <p className="text-emerald-300 font-medium">
            🎊 {t('dashboard.sessionComplete')}
          </p>
          <p className="text-emerald-400/70 text-sm mt-1">
            {t('dashboard.streakSafe')}
          </p>
        </div>
      )}

      {/* Quick action buttons */}
      {!isSessionComplete && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('roadmap')}
              className="flex-1 py-2 px-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              📚 Roadmap
            </button>
            <button
              onClick={() => setActiveTab('practica')}
              className="flex-1 py-2 px-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              ⚡ {t('onboarding.steps.practice.title')}
            </button>
            <button
              onClick={() => setActiveTab('proyectos')}
              className="flex-1 py-2 px-3 bg-slate-700/50 hover:bg-slate-700 text-slate-300 text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              💼 {t('onboarding.steps.projects.title')}
            </button>
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="mt-3 text-center">
        <p className="text-slate-500 text-xs">
          {t('dashboard.tip')}
        </p>
      </div>
    </div>
  );
};

// 🔥 STREAK CARD - Compact version
const StreakCard: React.FC<{ progress: ReturnType<typeof useUserProgress> }> = ({ progress }) => {
  const { t } = useLanguage();
  const currentStreak = progress.progress.currentStreak || 0;
  const longestStreak = progress.progress.longestStreak || 0;
  const lastActivityDate = progress.progress.lastActivityDate || '';
  
  const today = new Date().toISOString().split('T')[0];
  const isActiveToday = lastActivityDate === today;
  const isAtRisk = !isActiveToday && currentStreak > 0;
  
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 h-full flex flex-col justify-center ${
      isAtRisk 
        ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-500/50' 
        : currentStreak > 0
          ? 'bg-gradient-to-br from-orange-500/15 to-red-500/10 border-orange-500/30'
          : 'bg-slate-800/50 border-slate-700'
    }`}>
      <div className="flex items-center gap-4">
        {/* Fire Icon */}
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
          currentStreak > 0 ? 'bg-gradient-to-br from-orange-500 to-red-500' : 'bg-slate-700'
        }`}>
          <span className="text-3xl">{currentStreak > 0 ? '🔥' : '❄️'}</span>
        </div>
        
        {/* Info */}
        <div className="flex-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white">{currentStreak}</span>
            <span className="text-slate-400">{t('dashboard.time.day')}</span>
          </div>
          <div className="text-sm text-slate-400">
            {isAtRisk ? (
              <span className="text-amber-400">⚠️ {t('quickWin.completeToday')}</span>
            ) : isActiveToday ? (
              <span className="text-emerald-400">✅ {t('quickWin.streakActive')}</span>
            ) : (
              <span>{t('dashboard.startStreak')}</span>
            )}
          </div>
          {longestStreak > currentStreak && (
            <div className="text-xs text-slate-500 mt-1">{t('quickWin.record', { days: longestStreak })}</div>
          )}
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProfileCard: React.FC<{
  userName: string;
  equippedAvatar: any;
  equippedBadge: any;
  equippedTitle: any;
  userRank: any;
  progress: ReturnType<typeof useUserProgress>;
  setActiveTab: (tab: any) => void;
}> = ({ userName, equippedAvatar, equippedBadge, equippedTitle, userRank, progress, setActiveTab }) => {
  const { tLocalized } = useLanguage();
  const rarityStyles: Record<string, string> = {
    common: 'bg-gradient-to-br from-slate-600 to-slate-700 border-slate-500/50 shadow-slate-500/20',
    rare: 'bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-400/50 shadow-blue-500/30',
    epic: 'bg-gradient-to-br from-violet-600 to-purple-700 border-violet-400/50 shadow-violet-500/30',
    legendary: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 border-yellow-400/50 shadow-orange-500/40',
    mythic: 'bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 border-red-400/50 shadow-red-500/50',
  };
  const style = equippedAvatar ? rarityStyles[equippedAvatar.rarity] : 'bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-emerald-500/30';

  const currentXP = progress.progress.totalXP;
  const currentRankIndex = USER_RANKS.findIndex(r => currentXP >= r.minXP && currentXP <= r.maxXP);
  const nextRank = USER_RANKS[currentRankIndex + 1];
  const currentRankInfo = USER_RANKS[currentRankIndex] || USER_RANKS[0];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-slate-800 to-slate-900 border border-purple-500/20 p-6">
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-10 flex items-center gap-6">
        <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-xl border-2 ${style}`}>
          {equippedAvatar ? equippedAvatar.icon : userName.charAt(0).toUpperCase()}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-2xl font-bold text-white">{userName}</h2>
            {equippedBadge && (
              <span className="text-2xl" title={tLocalized(equippedBadge.name)}>{equippedBadge.icon}</span>
            )}
          </div>
          {equippedTitle ? (
            <p className="text-purple-400 font-medium flex items-center gap-2">
              <span>{equippedTitle.icon}</span> {tLocalized(equippedTitle.name)}
            </p>
          ) : (
            <p className="text-slate-400">{tLocalized(userRank.title)}</p>
          )}
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-sm">
              <span>{userRank.icon}</span>
              <span className="text-white font-medium">{userRank.rank}</span>
              <span className="text-slate-500">• {progress.progress.totalXP} XP</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-yellow-400">
              <span>💎</span>
              <span className="font-medium">{progress.progress.dataCoins}</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setActiveTab('tienda')}
          className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-300 text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          {tLocalized({es: 'Personalizar', en: 'Customize', pt: 'Personalizar'})}
        </button>
      </div>
      
      {/* XP Progress Bar */}
      {nextRank ? (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-yellow-400" />
              {tLocalized({ es: 'Próximo nivel:', en: 'Next level:', pt: 'Próximo nível:' })} <span className="text-white font-medium">{nextRank.icon} {nextRank.rank}</span>
            </span>
            <span className="text-slate-500">{nextRank.minXP - currentXP} XP {tLocalized({ es: 'restantes', en: 'remaining', pt: 'restantes' })}</span>
          </div>
          <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, ((currentXP - currentRankInfo.minXP) / (nextRank.minXP - currentRankInfo.minXP)) * 100)}%` }}
            />
          </div>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl border border-yellow-500/30">
          <div className="flex items-center gap-2 text-yellow-400 font-medium">
            <Crown className="w-5 h-5" />
            <span>{tLocalized({ es: '¡Nivel máximo alcanzado! 🏆', en: 'Max level reached! 🏆', pt: 'Nível máximo alcançado! 🏆' })}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DailyMissionsCard: React.FC<{ progress: ReturnType<typeof useUserProgress> }> = ({ progress }) => {
  const { t, tLocalized } = useLanguage();
  const missions = getTodaysMissions();
  
  const isMissionCompleted = (mission: any) => {
    switch (mission.type) {
      case 'steps': return progress.progress.completedSteps.length >= mission.target;
      case 'videos': return progress.progress.watchedVideos.length >= mission.target;
      case 'projects': return progress.progress.completedProjects.length >= mission.target;
      case 'login': return true;
      default: return false;
    }
  };

  const completedCount = missions.filter(isMissionCompleted).length;
  const allCompleted = completedCount === 3;

  return (
    <div className="bg-gradient-to-br from-cyan-500/10 via-slate-800/50 to-purple-500/10 rounded-2xl p-5 border border-cyan-500/30">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-xl">
            🎯
          </div>
          <div>
            <h3 className="font-bold text-white">{t('quickWin.missionsToday')}</h3>
            <p className="text-xs text-slate-400">{t('quickWin.missionsBonus', { xp: DAILY_BONUS.xp })}</p>
          </div>
        </div>
        <div className="text-xs text-slate-500">
          {t('quickWin.resetsIn', {
            time: (() => {
              const now = new Date();
              const tomorrow = new Date(now);
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(0, 0, 0, 0);
              const diff = tomorrow.getTime() - now.getTime();
              const hours = Math.floor(diff / (1000 * 60 * 60));
              const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              return `${hours}h ${mins}m`;
            })()
          })}
        </div>
      </div>
      
      <div className="space-y-3">
        {missions.map((mission) => {
          const isCompleted = isMissionCompleted(mission);
          
          return (
            <div 
              key={mission.id}
              className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                isCompleted 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-2xl ${
                isCompleted ? 'bg-emerald-500/20' : 'bg-slate-700/50'
              }`}>
                {isCompleted ? '✅' : mission.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${isCompleted ? 'text-emerald-400' : 'text-white'}`}>
                    {tLocalized(mission.title)}
                  </span>
                  {isCompleted && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                      {t('quickWin.completedMission')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400">{tLocalized(mission.description)}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-yellow-400">+{mission.xpReward} XP</div>
                <div className="text-xs text-slate-500">+{mission.coinsReward} 💎</div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Bonus indicator */}
      <div className={`mt-4 p-3 rounded-xl border ${
        allCompleted 
          ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/30' 
          : 'bg-slate-800/30 border-slate-700'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">{allCompleted ? '🎉' : '🎁'}</span>
            <span className={allCompleted ? 'text-yellow-400 font-medium' : 'text-slate-400'}>
              {allCompleted ? t('quickWin.bonusUnlocked') : t('quickWin.completeMore', { count: 3 - completedCount })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-bold ${allCompleted ? 'text-yellow-400' : 'text-slate-500'}`}>
              +{DAILY_BONUS.xp} XP
            </span>
            <span className={allCompleted ? 'text-yellow-400' : 'text-slate-500'}>
              +{DAILY_BONUS.coins} 💎
            </span>
          </div>
        </div>
        <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all ${allCompleted ? 'bg-yellow-500' : 'bg-cyan-500'}`}
            style={{ width: `${(completedCount / 3) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

const CurrentProgressCard: React.FC<{
  config: { emoji: string; label: LocalizedContent; color: string; nextAction: LocalizedContent };
  currentLevel: number;
  currentProgress: number;
  setActiveTab: (tab: any) => void;
}> = ({ config, currentLevel, currentProgress, setActiveTab }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, tLocalized } = useLanguage();
  
  const handleContinue = () => {
    const savedPosition = getRoadmapPosition();
    if (savedPosition) {
      navigate(`/members?tab=roadmap&level=${savedPosition.level}&phase=${savedPosition.phaseIndex}${savedPosition.stepId ? `&step=${savedPosition.stepId}` : ''}`);
    } else {
      navigate(`/members?tab=roadmap&level=${currentLevel}`);
    }
    setActiveTab('roadmap');
  };
  
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/15 to-slate-800 border border-emerald-500/30 p-6 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{config.emoji}</span>
        <div className="flex-1">
          <p className="text-slate-400 text-xs">{tLocalized({ es: 'Nivel', en: 'Level', pt: 'Nível' })} {currentLevel}</p>
          <h2 className="text-lg font-bold text-white">{tLocalized(config.label)}</h2>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-400">{currentProgress}%</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden mb-4">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-1000" 
          style={{ width: `${currentProgress}%` }} 
        />
      </div>
      
      {/* Action */}
      <button 
        onClick={handleContinue}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors"
      >
        {tLocalized({ es: 'Continuar Roadmap', en: 'Continue Roadmap', pt: 'Continuar Roadmap' })} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StatsRow: React.FC<{
  progress: ReturnType<typeof useUserProgress>;
  projectsCompleted: number;
  videosWatched: number;
  level1Progress: number;
  level2Progress: number;
  level3Progress: number;
}> = ({ progress, projectsCompleted, videosWatched, level1Progress, level2Progress, level3Progress }) => {
  const { t } = useLanguage();
  return (
  <div className="grid md:grid-cols-2 gap-4">
    <div className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-emerald-400">{progress.progress.completedSteps.length}</div>
        <div className="text-xs text-slate-500">{t('dashboard.stats.steps')}</div>
      </div>
      <div className="w-px h-8 bg-slate-700" />
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-blue-400">{projectsCompleted}</div>
        <div className="text-xs text-slate-500">{t('dashboard.stats.projects')}</div>
      </div>
      <div className="w-px h-8 bg-slate-700" />
      <div className="flex-1 text-center">
        <div className="text-2xl font-bold text-red-400">{videosWatched}</div>
        <div className="text-xs text-slate-500">{t('onboarding.steps.videos.title').split(' ')[0]}</div>
      </div>
    </div>
    
    <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl border border-slate-700">
      {[
        { level: 1, value: level1Progress, color: 'emerald', emoji: '🌱' },
        { level: 2, value: level2Progress, color: 'blue', emoji: '🚀' },
        { level: 3, value: level3Progress, color: 'purple', emoji: '👑' },
      ].map((stat) => (
        <div key={stat.level} className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">{stat.emoji}</span>
            <span className="text-xs font-medium text-emerald-400">{stat.value}%</span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: `${stat.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const QuickActionsGrid: React.FC<{ setActiveTab: (tab: any) => void; userEmail?: string }> = ({ setActiveTab, userEmail }) => {
  const { t } = useLanguage();
  return (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    <a 
      href={getDiscordConnectLink(userEmail)} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-4 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-xl border border-indigo-500/30 transition-all group"
    >
      <MessageCircle className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
      <span className="text-white text-sm font-medium">Discord</span>
    </a>
    
    <a 
      href={getDiscordConnectLink(userEmail)} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-4 bg-amber-500/10 hover:bg-amber-500/20 rounded-xl border border-amber-500/30 transition-all group relative overflow-hidden"
    >
      <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded font-bold animate-pulse">LIVE</span>
      <span className="text-2xl group-hover:scale-110 transition-transform">🎙️</span>
      <span className="text-white text-sm font-medium">Q&A 17 Dec</span>
    </a>
    
    <a 
      href="https://www.linkedin.com/jobs/search/?keywords=data%20engineer"
      target="_blank" 
      rel="noopener noreferrer"
      className="flex flex-col items-center gap-2 p-4 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/30 transition-all group"
    >
      <Briefcase className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform" />
      <span className="text-white text-sm font-medium">{t('dashboard.jobs')}</span>
    </a>

    <button 
      onClick={() => setActiveTab('tienda')}
      className="flex flex-col items-center gap-2 p-4 bg-purple-500/10 hover:bg-purple-500/20 rounded-xl border border-purple-500/30 transition-all group"
    >
      <span className="text-2xl group-hover:scale-110 transition-transform">🛒</span>
      <span className="text-white text-sm font-medium">{t('shop.title')}</span>
    </button>
  </div>
);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AchievementsCard: React.FC<{ progress: ReturnType<typeof useUserProgress> }> = ({ progress }) => {
  const { t, tLocalized } = useLanguage();
  const stats = { 
    steps: progress.progress.completedSteps.length, 
    projects: progress.progress.completedProjects.length, 
    videos: progress.progress.watchedVideos.length, 
    streak: progress.progress.currentStreak, 
    xp: progress.progress.totalXP, 
    reflections: Object.keys(progress.progress.textInputs).length 
  };
  const unlocked = ACHIEVEMENTS.filter(a => !a.secret && checkAchievementUnlocked(a, stats)).length;
  const total = ACHIEVEMENTS.filter(a => !a.secret).length;

  return (
    <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          <span className="text-white font-medium">{t('dashboard.achievements')}</span>
        </div>
        <span className="text-xs text-slate-400">{t('dashboard.unlocked', { count: unlocked, total })}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {ACHIEVEMENTS.filter(a => !a.secret).slice(0, 12).map(a => {
          const isUnlocked = checkAchievementUnlocked(a, stats);
          return (
            <div 
              key={a.id} 
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all cursor-help ${
                isUnlocked 
                  ? 'bg-yellow-500/20 border border-yellow-500/30 hover:scale-110' 
                  : 'bg-slate-800 opacity-40 grayscale'
              }`}
              title={isUnlocked ? `${tLocalized(a.title)}: ${tLocalized(a.description)}` : '???'}
            >
              {isUnlocked ? a.icon : '🔒'}
            </div>
          );
        })}
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xs text-slate-500 bg-slate-800/50">
          +{ACHIEVEMENTS.filter(a => !a.secret).length - 12}
        </div>
      </div>
    </div>
  );
};

const CertificatesCard: React.FC<{
  progress: ReturnType<typeof useUserProgress>;
  userName: string;
  userEmail: string;
}> = ({ progress, userName, userEmail }) => {
  const { t, tLocalized, language } = useLanguage();
  return (
  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/30">
    <div className="flex items-center gap-2 mb-4">
      <Award className="w-5 h-5 text-amber-400" />
      <span className="text-white font-medium">{t('dashboard.certificates')}</span>
      <span className="text-xs text-amber-300/70 ml-auto">PDF + LinkedIn</span>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {roadmapLevels.map((level) => {
        const levelSteps = getLevelStepIds(level.level);
        const completed = levelSteps.filter(id => progress.isStepCompleted(id)).length;
        const percent = Math.round((completed / levelSteps.length) * 100);
        const isComplete = percent >= 100;
        const cfg = { 
          0: { emoji: '🎓', name: { es: 'Fundamentos', en: 'Fundamentals', pt: 'Fundamentos' }, title: { es: 'Bases de Data Analytics', en: 'Data Analytics Basics', pt: 'Bases de Data Analytics' } },
          1: { emoji: '🌱', name: { es: 'Novato', en: 'Novice', pt: 'Novato' }, title: { es: 'Conseguir tu Primer Trabajo', en: 'Get Your First Job', pt: 'Conseguir seu Primeiro Emprego' } }, 
          2: { emoji: '⚔️', name: { es: 'Guerrero', en: 'Warrior', pt: 'Guerreiro' }, title: { es: 'De Junior a Semi-Senior', en: 'From Junior to Semi-Senior', pt: 'De Junior a Semi-Sênior' } }, 
          3: { emoji: '👑', name: { es: 'Maestro', en: 'Master', pt: 'Mestre' }, title: { es: 'Nivel Senior', en: 'Senior Level', pt: 'Nível Sênior' } } 
        }[level.level] || { emoji: '📜', name: { es: 'Nivel', en: 'Level', pt: 'Nível' }, title: { es: 'Completado', en: 'Completed', pt: 'Completado' } };
        
        return (
          <div 
            key={level.level} 
            className={`rounded-xl overflow-hidden border ${
              isComplete 
                ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50' 
                : 'bg-slate-800/50 border-slate-700'
            }`}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                  isComplete ? 'bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg' : 'bg-slate-700'
                }`}>
                  {isComplete ? cfg.emoji : '🔒'}
                </div>
                <div>
                  <div className={`font-bold ${isComplete ? 'text-white' : 'text-slate-400'}`}>{tLocalized(cfg.name)}</div>
                  <div className="text-xs text-slate-500">{tLocalized(cfg.title)}</div>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">{completed}/{levelSteps.length} {t('dashboard.stats.steps').toLowerCase()}</span>
                  <span className={isComplete ? 'text-amber-400 font-bold' : 'text-slate-500'}>{percent}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all ${isComplete ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-slate-600'}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
              
              {isComplete ? (
                <CertificateCard
                  level={level.level}
                  levelTitle={tLocalized(cfg.title)}
                  userName={userName}
                  userEmail={userEmail}
                  completionPercent={percent}
                  completedDate={new Date().toLocaleDateString(language === 'es' ? 'es-AR' : language === 'pt' ? 'pt-BR' : 'en-US')}
                  onGenerate={() => {}}
                />
              ) : (
                <div className="text-center py-2 text-slate-500 text-sm">
                  {t('dashboard.stepsRemaining', { count: levelSteps.length - completed })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const WeeklyChallengeCard: React.FC = () => {
  const { t, tLocalized, language } = useLanguage();
  
  const difficultyMap: Record<string, any> = {
    'Fácil': { es: 'Fácil', en: 'Easy', pt: 'Fácil' },
    'Medio': { es: 'Medio', en: 'Medium', pt: 'Médio' },
    'Difícil': { es: 'Difícil', en: 'Hard', pt: 'Difícil' }
  };

  return (
  <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl border border-cyan-500/30 overflow-hidden">
    <div className="p-4 border-b border-cyan-500/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-2xl shadow-lg">
            {currentChallenge.badgeEmoji}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-cyan-500 text-white text-xs px-2 py-0.5 rounded-full font-bold uppercase">{t('dashboard.weeklyChallenge')}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                currentChallenge.difficulty === 'Fácil' ? 'bg-emerald-500/20 text-emerald-400' :
                currentChallenge.difficulty === 'Medio' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>{tLocalized(difficultyMap[currentChallenge.difficulty] || { es: currentChallenge.difficulty })}</span>
            </div>
            <h4 className="text-white font-bold text-lg">{tLocalized(currentChallenge.title)}</h4>
          </div>
        </div>
        <div className="text-right">
          <div className="text-cyan-400 font-medium">{currentChallenge.estimatedTime}</div>
          <div className="text-xs text-slate-500">{t('dashboard.until', { date: new Date(currentChallenge.endDate).toLocaleDateString(language === 'es' ? 'es-AR' : language === 'pt' ? 'pt-BR' : 'en-US') })}</div>
        </div>
      </div>
    </div>
    
    <div className="p-4 space-y-4">
      <div>
        <h5 className="text-white font-medium mb-2">📋 {t('dashboard.instructions')}</h5>
        <p className="text-slate-300">{tLocalized(currentChallenge.description)}</p>
      </div>
      
      <div className="flex items-center gap-2 flex-wrap">
        {currentChallenge.skills.map((skill, i) => (
          <span key={i} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-lg">{skill}</span>
        ))}
      </div>
      
      <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
        <h5 className="text-cyan-400 font-medium text-sm mb-1">🎯 {t('dashboard.deliverable')}</h5>
        <p className="text-slate-300 text-sm">{tLocalized(currentChallenge.deliverable)}</p>
      </div>
      
      <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentChallenge.badgeEmoji}</span>
          <div>
            <div className="text-yellow-400 font-medium text-sm">Badge: "{currentChallenge.badge}"</div>
            <div className="text-slate-500 text-xs">+50 XP • +25 💎</div>
          </div>
        </div>
        <a 
          href={DISCORD_INVITE_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          {t('dashboard.submitDiscord')}
        </a>
      </div>
    </div>
  </div>
  );
};

// 🚀 COMING SOON ROADMAP - Retention section
interface ComingSoonRoadmapProps {
  isFreeUser?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ComingSoonRoadmap: React.FC<ComingSoonRoadmapProps> = ({ isFreeUser }) => {
  const { tLocalized } = useLanguage();
  // Especializaciones = Roadmaps adicionales por tecnología/tema
  // Niveles 0-3 = Base general | Especializaciones = Profundización en temas
  const upcomingSpecializations = [
    {
      id: 'aws-spec',
      title: 'AWS Data Engineering',
      description: tLocalized({ es: 'S3, Glue, Athena, Lambda, Step Functions, Redshift, EMR', en: 'S3, Glue, Athena, Lambda, Step Functions, Redshift, EMR', pt: 'S3, Glue, Athena, Lambda, Step Functions, Redshift, EMR' }),
      emoji: '☁️',
      date: 'Q1 2026',
      steps: '~25 pasos',
      color: 'from-orange-500 to-amber-500',
      borderColor: 'border-orange-500/30',
      bgColor: 'bg-orange-500/10',
    },
    {
      id: 'gcp-spec',
      title: 'GCP Data Engineering',
      description: tLocalized({ es: 'BigQuery, Dataflow, Cloud Composer, Pub/Sub, Dataproc', en: 'BigQuery, Dataflow, Cloud Composer, Pub/Sub, Dataproc', pt: 'BigQuery, Dataflow, Cloud Composer, Pub/Sub, Dataproc' }),
      emoji: '🔵',
      date: 'Q2 2026',
      steps: '~25 pasos',
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
    },
    {
      id: 'streaming',
      title: { es: 'Real-Time & Streaming', en: 'Real-Time & Streaming', pt: 'Real-Time & Streaming' },
      description: tLocalized({ es: 'Kafka, Spark Streaming, Flink, CDC, Event-Driven', en: 'Kafka, Spark Streaming, Flink, CDC, Event-Driven', pt: 'Kafka, Spark Streaming, Flink, CDC, Event-Driven' }),
      emoji: '⚡',
      date: 'Q2 2026',
      steps: '~20 pasos',
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10',
    },
    {
      id: 'dbt-analytics',
      title: 'dbt & Analytics Engineering',
      description: tLocalized({ es: 'dbt Core, dbt Cloud, testing, documentación, CI/CD', en: 'dbt Core, dbt Cloud, testing, documentation, CI/CD', pt: 'dbt Core, dbt Cloud, testing, documentação, CI/CD' }),
      emoji: '🔶',
      date: 'Q3 2026',
      steps: '~20 pasos',
      color: 'from-red-500 to-orange-500',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl">
              🎯
            </div>
            <div>
              <h3 className="text-white font-bold">{tLocalized({ es: 'Especializaciones próximas', en: 'Upcoming Specializations', pt: 'Especializações Próximas' })}</h3>
              <p className="text-slate-400 text-sm">{tLocalized({ es: 'Roadmaps adicionales por tecnología', en: 'Additional roadmaps by technology', pt: 'Roadmaps adicionais por tecnologia' })}</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-3 py-1.5">
            <span className="text-emerald-400 text-sm font-medium">🔒 {tLocalized({ es: 'Incluido en tu plan', en: 'Included in your plan', pt: 'Incluído no seu plano' })}</span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="px-4 pt-4">
        <div className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/50 text-sm">
          <p className="text-slate-300">
            <span className="text-white font-medium">{tLocalized({ es: 'Niveles 0-3', en: 'Levels 0-3', pt: 'Níveis 0-3' })}</span> = {tLocalized({ es: 'Base sólida en Data Engineering', en: 'Solid Data Engineering foundation', pt: 'Base sólida em Data Engineering' })}
            <span className="mx-2">→</span>
            <span className="text-white font-medium">{tLocalized({ es: 'Especializaciones', en: 'Specializations', pt: 'Especializações' })}</span> = {tLocalized({ es: 'Profundización por tecnología/cloud', en: 'Deep dive by technology/cloud', pt: 'Aprofundamento por tecnologia/cloud' })}
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcomingSpecializations.map((spec) => (
            <div
              key={spec.id}
              className={`relative p-4 rounded-xl border ${spec.borderColor} ${spec.bgColor} transition-all hover:scale-[1.02]`}
            >
              {/* Badge */}
              <div className="absolute top-2 right-2">
                <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${spec.color} text-white font-medium`}>
                  Roadmap
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${spec.color} flex items-center justify-center text-2xl shadow-lg`}>
                  {spec.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-semibold mb-1">{tLocalized(spec.title)}</h4>
                  <p className="text-slate-400 text-sm line-clamp-2">{spec.description}</p>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-slate-500">📅 {spec.date}</span>
                    <span className="text-xs text-slate-500">📚 {spec.steps}</span>
                    {!isFreeUser && (
                      <span className="text-xs text-emerald-400">✓ {tLocalized({ es: 'Incluido', en: 'Included', pt: 'Incluído' })}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA for free users */}
        {isFreeUser && (
          <div className="mt-4 p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl border border-amber-500/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🔐</span>
                <div>
                  <p className="text-white font-medium">{tLocalized({ es: 'Todo esto está incluido en Premium', en: 'All this is included in Premium', pt: 'Tudo isso está incluído no Premium' })}</p>
                  <p className="text-slate-400 text-sm">{tLocalized({ es: 'Sin costo extra cuando se lance', en: 'No extra cost when launched', pt: 'Sem custo extra quando lançado' })}</p>
                </div>
              </div>
              <a
                href="https://iansaura.com/subscribe.php"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 whitespace-nowrap"
              >
                {tLocalized({ es: 'Suscribirme - $30/mes →', en: 'Subscribe - $30/month →', pt: 'Assinar - $30/mês →' })}
              </a>
            </div>
          </div>
        )}

        {/* Bottom message for premium users */}
        {!isFreeUser && (
          <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-center">
            <p className="text-emerald-400 text-sm">
              <span className="font-medium">✨ {tLocalized({ es: 'Tu suscripción incluye todo el contenido futuro', en: 'Your subscription includes all future content', pt: 'Sua assinatura inclui todo o conteúdo futuro' })}</span>
              <span className="text-slate-400"> • {tLocalized({ es: 'Precio bloqueado mientras sigas activo', en: 'Price locked while active', pt: 'Preço bloqueado enquanto ativo' })}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTab;
