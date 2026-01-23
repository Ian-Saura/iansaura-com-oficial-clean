import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  CheckCircle, Lock, Zap, ChevronRight, Sparkles, Star,
  Gem, MapPin, MessageCircle
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../../../types/i18n';
import { useUserProgress } from '../../../hooks/useUserProgress';
import { useCelebration } from '../../../hooks/useCelebration';
import { useEnergySystem } from '../../../hooks/useEnergySystem';
import { roadmapLevels, getLevelStepIds } from '../../../data/roadmapData';
import { projects } from '../../../data/projectsData';
import { DISCORD_INVITE_LINK } from '../../../data/videosData';
import { ResourceButton, TabType, renderMarkdown } from '../MembersUtils';
// Deep Dives imports - Hints para "Fundamentos Teóricos" (Febrero 2026)
// NOTA: Habilitado pero con fecha de lanzamiento - solo aparece después del 1 Feb 2026
import { DeepDiveHint } from '../DeepDiveHint';
import { getDeepDivesForPhase } from '../../../data/deepDives';

// Fecha de lanzamiento de la especialización Fundamentos Teóricos
const DEEP_DIVES_LAUNCH_DATE = new Date('2026-02-01T00:00:00');
const isDeepDivesLaunched = () => new Date() >= DEEP_DIVES_LAUNCH_DATE;

// XP System
export const XP_PER_STEP = 10;
export const XP_PER_PROJECT = 50;

const RoadmapTab: React.FC<{ 
  progress: ReturnType<typeof useUserProgress>;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
  celebration: ReturnType<typeof useCelebration>;
  isFreeUser?: boolean;
  onPositionChange?: (position: { level: number; phaseIndex: number; stepId?: string }) => void;
  energySystem?: ReturnType<typeof useEnergySystem>;
  onLevelComplete?: (stepId: string) => void;
}> = ({ progress, setActiveTab, celebration, isFreeUser = false, onPositionChange, energySystem, onLevelComplete }) => {
  const { language } = useLanguage();
  const t = (content: LC | string): string => tLocalized(content, language);
  
  // Load saved position from localStorage on initial render
  const getInitialPosition = () => {
    const saved = localStorage.getItem('roadmap_position');
    if (saved) {
      try {
        const position = JSON.parse(saved);
        return {
          level: isFreeUser ? 0 : (position.level ?? 1),
          phase: position.phaseIndex ?? 0
        };
      } catch {
        return { level: isFreeUser ? 0 : 1, phase: 0 };
      }
    }
    return { level: isFreeUser ? 0 : 1, phase: 0 };
  };
  
  const initialPosition = getInitialPosition();
  const [selectedLevel, setSelectedLevel] = useState(initialPosition.level);
  const [activePhaseIndex, setActivePhaseIndex] = useState(initialPosition.phase);
  const [expandedExplanation, setExpandedExplanation] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Save position whenever level or phase changes
  useEffect(() => {
    const effectiveLevel = isFreeUser ? 0 : selectedLevel;
    onPositionChange?.({ level: effectiveLevel, phaseIndex: activePhaseIndex });
    // Also save to localStorage directly for persistence
    localStorage.setItem('roadmap_position', JSON.stringify({
      level: effectiveLevel,
      phaseIndex: activePhaseIndex,
      timestamp: Date.now()
    }));
  }, [selectedLevel, activePhaseIndex, isFreeUser, onPositionChange]);
  
  // Handle return from practice or floating button - restore position
  useEffect(() => {
    const stepId = searchParams.get('step');
    const level = searchParams.get('level');
    const phase = searchParams.get('phase');
    
    // If we have level and phase (from floating button), restore position
    if (level) {
      const levelNum = parseInt(level);
      if (!isFreeUser && levelNum >= 0 && levelNum <= 3) {
        setSelectedLevel(levelNum);
      }
      
      // If phase is provided directly, use it
      if (phase) {
        const phaseNum = parseInt(phase);
        if (!isNaN(phaseNum)) {
          setActivePhaseIndex(phaseNum);
        }
      }
      // If stepId is provided, find the phase containing it
      else if (stepId) {
        const targetLevel = roadmapLevels.find(l => l.level === (isFreeUser ? 0 : levelNum));
        if (targetLevel) {
          targetLevel.phases.forEach((phaseData, phaseIdx) => {
            phaseData.sections.forEach(section => {
              if (section.steps.some(s => s.id === stepId)) {
                setActivePhaseIndex(phaseIdx);
              }
            });
          });
        }
      }
      
      // Scroll to the step after a small delay (if stepId provided)
      if (stepId) {
        setTimeout(() => {
          const stepElement = document.getElementById(`step-${stepId}`);
          if (stepElement) {
            stepElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Highlight the step temporarily
            stepElement.classList.add('ring-2', 'ring-violet-500', 'ring-offset-2', 'ring-offset-slate-900');
            setTimeout(() => {
              stepElement.classList.remove('ring-2', 'ring-violet-500', 'ring-offset-2', 'ring-offset-slate-900');
            }, 3000);
          }
        }, 500);
      } else {
        // Just scroll to top when returning to a phase
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Clean up URL params
      const newParams = new URLSearchParams();
      newParams.set('tab', 'roadmap');
      navigate({ search: newParams.toString() }, { replace: true });
    }
  }, [searchParams, isFreeUser, navigate]);

  // Force level 0 for free users
  const effectiveLevel = isFreeUser ? 0 : selectedLevel;
  const currentLevel = roadmapLevels.find(l => l.level === effectiveLevel)!;
  const levelStepIds = getLevelStepIds(effectiveLevel);
  const levelProgress = progress.calculateLevelProgress(levelStepIds);
  const completedSteps = levelStepIds.filter((id: string) => progress.isStepCompleted(id)).length;
  
  // Calculate XP
  const totalXP = progress.progress.completedSteps.length * XP_PER_STEP + 
                  progress.progress.completedProjects.length * XP_PER_PROJECT;
  const levelXP = completedSteps * XP_PER_STEP;

  // Level config
  const levelConfig = {
    0: { 
      emoji: '🌱', 
      title: t({ es: 'Los Primeros Pasos', en: 'The First Steps', pt: 'Os Primeiros Passos' }),
      subtitle: t({ es: 'Para quienes nunca programaron', en: 'For those who never coded', pt: 'Para quem nunca programou' }),
      color: 'teal',
      gradient: 'from-teal-500 via-cyan-500 to-emerald-400',
      bgGradient: 'from-teal-900/30 via-slate-900 to-slate-900',
      icon: '🌱',
      rank: t({ es: 'Semilla', en: 'Seed', pt: 'Semente' })
    },
    1: { 
      emoji: '⚔️', 
      title: t({ es: 'El Despertar del Data Engineer', en: 'Awakening of the Data Engineer', pt: 'O Despertar do Data Engineer' }),
      subtitle: t({ es: 'Tu viaje comienza aquí', en: 'Your journey starts here', pt: 'Sua jornada começa aqui' }),
      color: 'emerald',
      gradient: 'from-emerald-600 via-emerald-500 to-teal-400',
      bgGradient: 'from-emerald-900/30 via-slate-900 to-slate-900',
      icon: '⚔️',
      rank: t({ es: 'Novato', en: 'Novice', pt: 'Novato' })
    },
    2: { 
      emoji: '🚀', 
      title: t({ es: 'El Ascenso del Guerrero', en: 'Rise of the Warrior', pt: 'A Ascensão do Guerreiro' }),
      subtitle: t({ es: 'De Junior a Semi-Senior', en: 'From Junior to Semi-Senior', pt: 'De Júnior a Pleno' }),
      color: 'blue',
      gradient: 'from-blue-600 via-blue-500 to-cyan-400',
      bgGradient: 'from-blue-900/30 via-slate-900 to-slate-900',
      icon: '🛡️',
      rank: t({ es: 'Guerrero', en: 'Warrior', pt: 'Guerreiro' })
    },
    3: { 
      emoji: '👑', 
      title: t({ es: 'La Corona del Senior', en: 'The Senior Crown', pt: 'A Coroa do Sênior' }),
      subtitle: t({ es: 'Liderazgo y maestría', en: 'Leadership and mastery', pt: 'Liderança e maestria' }),
      color: 'purple',
      gradient: 'from-purple-600 via-purple-500 to-pink-400',
      bgGradient: 'from-purple-900/30 via-slate-900 to-slate-900',
      icon: '👑',
      rank: t({ es: 'Maestro', en: 'Master', pt: 'Mestre' })
    }
  };

  const config = levelConfig[effectiveLevel as keyof typeof levelConfig];
  const currentPhase = currentLevel.phases[activePhaseIndex];

  // Calculate phase progress
  const getPhaseProgress = (phase: typeof currentLevel.phases[0]) => {
    const phaseStepIds = phase.sections.flatMap(s => s.steps.map(st => st.id));
    const completed = phaseStepIds.filter(id => progress.isStepCompleted(id)).length;
    return { completed, total: phaseStepIds.length, percent: Math.round((completed / phaseStepIds.length) * 100) || 0 };
  };

  // Ref para evitar clicks múltiples (no causa re-renders)
  const processingStepsRef = React.useRef<Set<string>>(new Set());
  
  // Handle step toggle with milestone celebration (con protección contra clicks rápidos)
  const handleStepToggle = React.useCallback((stepId: string, _section: typeof currentPhase.sections[0]) => {
    // Evitar clicks múltiples en el mismo step
    if (processingStepsRef.current.has(stepId)) {
      return;
    }
    
    const wasCompleted = progress.isStepCompleted(stepId);
    
    // 🔋 ENERGY CHECK: Si es usuario FREE y está COMPLETANDO (no des-completando)
    // verificar si tiene energía disponible
    if (!wasCompleted && energySystem && isFreeUser) {
      const canProceed = energySystem.useStep();
      if (!canProceed) {
        // No tiene energía, el modal se muestra automáticamente
        return;
      }
    }
    
    // Marcar como procesando (sin causar re-render)
    processingStepsRef.current.add(stepId);
    
    progress.toggleStep(stepId);
    
    // Only celebrate when COMPLETING a step (not unchecking)
    if (!wasCompleted) {
      // Check if this completes the entire CHAPTER (phase), not just section
      const allPhaseSteps = currentPhase.sections.flatMap(s => s.steps.filter(st => st.checkbox));
      const otherPhaseStepsCompleted = allPhaseSteps
        .filter(s => s.id !== stepId)
        .every(s => progress.isStepCompleted(s.id));
      
      if (otherPhaseStepsCompleted) {
        // 🎉 CHAPTER completed! Big celebration!
        setTimeout(() => {
          celebration.fireConfettiSides();
        }, 300);
      }
      
      // Check if this completes the entire LEVEL
      if (onLevelComplete) {
        onLevelComplete(stepId);
      }
    }
    
    // Liberar el step después de un pequeño delay
    setTimeout(() => {
      processingStepsRef.current.delete(stepId);
    }, 200);
  }, [currentPhase, progress, celebration, energySystem, isFreeUser, onLevelComplete]);

  // Get unlockable projects based on XP
  const getUnlockableProjects = () => {
    const thresholds = [
      { xp: 50, project: projects.find(p => p.level === effectiveLevel) },
      { xp: 150, project: projects.filter(p => p.level === effectiveLevel)[1] },
      { xp: 300, project: projects.filter(p => p.level === effectiveLevel)[2] },
      { xp: 500, project: projects.filter(p => p.level === effectiveLevel)[3] },
    ];
    return thresholds;
  };

  return (
    <div className="space-y-6">
      {/* Epic Header */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.bgGradient} border border-${config.color}-500/30 p-6`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl" />
        
        <div className="relative z-10">
          {/* Level Tabs - Free users only see Level 0, others are locked */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {[0, 1, 2, 3].map((lvl) => {
              const lvlConfig = levelConfig[lvl as keyof typeof levelConfig];
              const lvlProgress = progress.calculateLevelProgress(getLevelStepIds(lvl));
              const isLocked = isFreeUser && lvl > 0;
              
              return (
                <button
                  key={lvl}
                  onClick={() => {
                    if (isLocked) {
                      navigate('/suscripcion');
                    } else {
                      setSelectedLevel(lvl);
                    }
                  }}
                  className={`flex-1 p-3 rounded-xl border transition-all relative ${
                    isLocked 
                      ? 'bg-slate-800/30 border-slate-700/50 cursor-pointer hover:border-emerald-500/50'
                      : effectiveLevel === lvl 
                        ? `bg-${lvlConfig.color}-500/20 border-${lvlConfig.color}-500/50` 
                        : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {isLocked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 rounded-xl">
                      <Lock className="w-4 h-4 text-slate-400" />
              </div>
                  )}
                  <div className={`flex items-center justify-between ${isLocked ? 'opacity-40' : ''}`}>
                    <div className="flex items-center gap-2">
                      <span>{lvlConfig.emoji}</span>
                      <span className={`text-sm font-medium ${effectiveLevel === lvl ? `text-${lvlConfig.color}-400` : 'text-slate-400'}`}>
                        {lvlConfig.rank}
                      </span>
            </div>
                    <span className={`text-xs ${effectiveLevel === lvl ? `text-${lvlConfig.color}-300` : 'text-slate-500'}`}>
                      {isLocked ? '🔒' : `${lvlProgress}%`}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{config.icon}</div>
            <div>
              <h2 className={`text-2xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
                {config.title}
              </h2>
              <p className="text-slate-400">{config.subtitle}</p>
            </div>
          </div>

          {/* XP Bar */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className={`w-5 h-5 text-${config.color}-400`} />
                <span className="font-bold text-white">{levelXP} XP</span>
                <span className="text-slate-500 text-sm">en este nivel</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">{completedSteps}/{levelStepIds.length} pasos</span>
                <span className={`text-${config.color}-400 font-bold`}>{levelProgress}%</span>
              </div>
            </div>
            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${config.gradient} transition-all duration-1000`}
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chapter/Phase Selector - Visual Map */}
      <div className="relative">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <MapPin className={`w-6 h-6 text-${config.color}-400`} />
          Tu Camino
        </h3>
        
        <div className="relative flex items-center gap-4 overflow-x-auto pb-6 pt-2 px-2 -mx-2 scrollbar-hide">
          {/* Connecting Line */}
          <div className="absolute top-10 left-0 right-0 h-1 bg-slate-700 z-0" />
          
          {currentLevel.phases.map((phase, idx) => {
            const phaseProgress = getPhaseProgress(phase);
            const isActive = activePhaseIndex === idx;
            const isCompleted = phaseProgress.percent === 100;
            // Lock chapters that aren't the first AND previous chapter isn't at least 50% complete
            const prevPhaseProgress = idx > 0 ? getPhaseProgress(currentLevel.phases[idx - 1]).percent : 100;
            const isLocked = idx > 0 && prevPhaseProgress < 50;
            
            return (
              <button
                key={phase.id}
                onClick={() => !isLocked && setActivePhaseIndex(idx)}
                disabled={isLocked}
                className={`relative z-10 flex-shrink-0 group transition-all duration-300 ${
                  isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {/* Node */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300 ${
                  isActive 
                    ? `bg-gradient-to-br ${config.gradient} shadow-xl shadow-${config.color}-500/40 scale-110` 
                    : isCompleted 
                      ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                      : isLocked
                        ? 'bg-slate-800/50 border-2 border-slate-700'
                        : 'bg-slate-800 border-2 border-slate-600 hover:border-slate-500 hover:scale-105'
                }`}>
                  {isLocked ? <Lock className="w-7 h-7 text-slate-500" /> :
                   isCompleted ? <CheckCircle className="w-10 h-10 text-white" /> : 
                   <span>{phase.emoji}</span>}
                </div>
                
                {/* Label */}
                <div className={`mt-3 text-center max-w-[100px] ${isActive ? 'opacity-100' : 'opacity-80'}`}>
                  <p className={`text-sm font-semibold ${isActive ? `text-${config.color}-400` : isLocked ? 'text-slate-600' : 'text-slate-300'}`}>
                    Cap. {idx + 1}
                  </p>
                  <p className={`text-xs ${isLocked ? 'text-slate-600' : 'text-slate-500'}`}>{phaseProgress.percent}%</p>
                </div>
              </button>
            );
          })}
            </div>
          </div>

      {/* Active Chapter Content */}
      {currentPhase && (
        <div id="chapter-content" className={`rounded-2xl border border-${config.color}-500/30 overflow-hidden`}>
          {/* Quick Navigation - Top - Más visible */}
          <div className={`flex items-center justify-between bg-gradient-to-r from-${config.color}-500/10 to-transparent px-5 py-3 border-b border-${config.color}-500/20`}>
            <button
              onClick={() => setActivePhaseIndex(Math.max(0, activePhaseIndex - 1))}
              disabled={activePhaseIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activePhaseIndex === 0 
                  ? 'text-slate-600 cursor-not-allowed bg-slate-800/30' 
                  : `text-white bg-${config.color}-500/20 hover:bg-${config.color}-500/40 border border-${config.color}-500/30`
              }`}
            >
              ← Anterior
            </button>
            <div className="flex items-center gap-2">
              {currentLevel.phases.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activePhaseIndex === idx 
                      ? `bg-${config.color}-400 w-8` 
                      : 'bg-slate-600 hover:bg-slate-500'
                  }`}
                  title={`Capítulo ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActivePhaseIndex(Math.min(currentLevel.phases.length - 1, activePhaseIndex + 1))}
              disabled={activePhaseIndex === currentLevel.phases.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                activePhaseIndex === currentLevel.phases.length - 1 
                  ? 'text-slate-600 cursor-not-allowed bg-slate-800/30' 
                  : `text-white bg-${config.color}-500/20 hover:bg-${config.color}-500/40 border border-${config.color}-500/30`
              }`}
            >
              Siguiente →
            </button>
          </div>
          
          {/* Chapter Header */}
          <div className={`bg-gradient-to-r from-${config.color}-500/20 to-transparent p-8 border-b border-${config.color}-500/20`}>
            <div className="flex items-center gap-6">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center text-4xl shadow-xl`}>
                {currentPhase.emoji}
        </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-${config.color}-400 text-base font-semibold`}>Capítulo {activePhaseIndex + 1}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">{getPhaseProgress(currentPhase).completed}/{getPhaseProgress(currentPhase).total} misiones</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">{t(currentPhase.title)}</h3>
              </div>
              <div className="text-right hidden md:block">
                <div className={`text-4xl font-bold text-${config.color}-400`}>{getPhaseProgress(currentPhase).percent}%</div>
                <div className="text-slate-400 text-sm">completado</div>
              </div>
            </div>
            
            {/* Phase Progress Bar */}
            <div className="mt-6 h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${config.gradient} transition-all duration-500`}
                style={{ width: `${getPhaseProgress(currentPhase).percent}%` }}
              />
            </div>
          </div>

          {/* Missions/Sections */}
          <div className="p-6 space-y-6 bg-slate-900/50">
            {currentPhase.sections.map((section, sectionIdx) => {
              const sectionSteps = section.steps;
              const completedInSection = sectionSteps.filter(s => progress.isStepCompleted(s.id)).length;
              const sectionComplete = completedInSection === sectionSteps.length;
              
              return (
                <div 
                  key={section.id}
                  className={`rounded-2xl border transition-all ${
                    sectionComplete 
                      ? 'bg-emerald-500/5 border-emerald-500/30' 
                      : 'bg-slate-800/50 border-slate-700/50'
                  }`}
                >
                  {/* Mission Header */}
                  <div className="p-5 flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      sectionComplete 
                        ? 'bg-emerald-500 text-white' 
                        : `bg-${config.color}-500/20 text-${config.color}-400`
                    }`}>
                      {sectionComplete ? <CheckCircle className="w-6 h-6" /> : sectionIdx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-1">{t(section.title)}</h4>
                      <div className="text-slate-300 text-base leading-relaxed">{renderMarkdown(t(section.description))}</div>
                    </div>
                    <div className="flex items-center gap-3 hidden md:flex">
                      <span className="text-slate-400">{completedInSection}/{sectionSteps.length}</span>
                      <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${sectionComplete ? 'bg-emerald-500' : `bg-${config.color}-500`}`}
                          style={{ width: `${(completedInSection / sectionSteps.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="px-5 pb-5">
                    <div className="space-y-2">
                      {sectionSteps.map((step, stepIdx) => {
                        const isCompleted = progress.isStepCompleted(step.id);
                        const textValue = progress.getTextInput(step.id);
                        const hasText = textValue && textValue.trim().length > 0;
                        
                        // Reflexión/Textarea - DISEÑO MEJORADO
                        if (step.type === 'reflection' && step.textInput) {
                          // Detectar si es una pregunta de nivel 1-10
                          const isLevelQuestion = t(step.text).includes('1 =') && t(step.text).includes('10 =');
                          const levelValue = textValue ? parseInt(textValue) : 0;
                          const hasValidLevel = isLevelQuestion && levelValue >= 1 && levelValue <= 10;
                          
                          // Extraer el título limpio para preguntas de nivel
                          const cleanTitle = isLevelQuestion 
                            ? t(step.text).split('(')[0].trim()
                            : t(step.text);
                          
                          if (isLevelQuestion) {
                            // UI especial para preguntas de nivel 1-10
                            return (
                              <div 
                                key={step.id} 
                                className={`relative rounded-2xl border-2 transition-all overflow-hidden shadow-lg ${
                                  hasValidLevel 
                                    ? 'bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-indigo-500/5 border-cyan-500/40 shadow-cyan-500/10' 
                                    : 'bg-gradient-to-br from-slate-800/60 to-slate-800/30 border-slate-600/50 hover:border-cyan-500/30'
                                }`}
                              >
                                <div className={`flex items-center gap-4 px-5 py-4 border-b ${
                                  hasValidLevel ? 'border-cyan-500/20 bg-cyan-500/5' : 'border-slate-700/30'
                                }`}>
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow-inner ${
                                    hasValidLevel 
                                      ? 'bg-gradient-to-br from-cyan-500/30 to-blue-600/30 shadow-cyan-500/20 text-cyan-300' 
                                      : 'bg-slate-700/70 text-slate-500'
                                  }`}>
                                    {hasValidLevel ? levelValue : '?'}
                        </div>
                                  <div className="flex-1">
                                    <span className={`font-semibold text-base ${hasValidLevel ? 'text-cyan-200' : 'text-slate-200'}`}>
                                      {cleanTitle}
                                    </span>
                                    <p className="text-xs text-slate-500 mt-0.5">Seleccioná tu nivel del 1 al 10</p>
                      </div>
                                  {hasValidLevel && (
                                    <div className="flex items-center gap-2 text-sm text-cyan-400 bg-cyan-500/20 px-3 py-1.5 rounded-full border border-cyan-500/30">
                                      <CheckCircle className="w-4 h-4" />
                                      <span className="font-medium">Nivel {levelValue}</span>
                                    </div>
                                  )}
                                </div>
                                {/* Selector de nivel visual */}
                                <div className="p-5">
                                  <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs text-slate-500">Principiante</span>
                                    <span className="text-xs text-slate-500">Experto</span>
                                  </div>
                                  <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                      <button
                                        key={num}
                                        onClick={() => progress.saveTextInput(step.id, num.toString())}
                                        className={`flex-1 h-12 rounded-xl font-bold text-lg transition-all duration-200 ${
                                          levelValue === num
                                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105 ring-2 ring-cyan-400/50'
                                            : levelValue > 0 && num <= levelValue
                                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                              : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-600'
                                        }`}
                                      >
                                        {num}
                                      </button>
                ))}
              </div>
                                  {/* Visual scale indicator */}
                                  <div className="mt-4 flex items-center h-2 rounded-full overflow-hidden">
                                    <div className="flex-[3] h-full bg-emerald-500/30" title="1-3: Básico" />
                                    <div className="flex-[3] h-full bg-yellow-500/30" title="4-6: Intermedio" />
                                    <div className="flex-[3] h-full bg-orange-500/30" title="7-9: Avanzado" />
                                    <div className="flex-1 h-full bg-red-500/30" title="10: Experto" />
                                  </div>
                                  <div className="mt-1 flex text-[10px] text-slate-500">
                                    <span className="flex-[3] text-emerald-400/70">Básico</span>
                                    <span className="flex-[3] text-yellow-400/70">Intermedio</span>
                                    <span className="flex-[3] text-orange-400/70">Avanzado</span>
                                    <span className="flex-1 text-right text-red-400/70">Pro</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          
                          // Textarea normal para otras reflexiones
                          return (
                            <div 
                              key={step.id} 
                              className={`relative rounded-2xl border-2 transition-all overflow-hidden shadow-lg ${
                                hasText 
                                  ? 'bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-fuchsia-500/5 border-violet-500/40 shadow-violet-500/10' 
                                  : 'bg-gradient-to-br from-slate-800/60 to-slate-800/30 border-slate-600/50 hover:border-violet-500/30 hover:shadow-violet-500/5'
                              }`}
                            >
                              {/* Header con gradiente */}
                              <div className={`flex items-center gap-4 px-5 py-4 border-b ${
                                hasText ? 'border-violet-500/20 bg-violet-500/5' : 'border-slate-700/30'
                              }`}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner ${
                                  hasText 
                                    ? 'bg-gradient-to-br from-violet-500/30 to-purple-600/30 shadow-violet-500/20' 
                                    : 'bg-slate-700/70'
                                }`}>
                                  💭
                        </div>
                                <div className="flex-1">
                                  <span className={`font-semibold text-base ${hasText ? 'text-violet-200' : 'text-slate-200'}`}>
                                    {t(step.text)}
                                  </span>
                                  <p className="text-xs text-slate-500 mt-0.5">Reflexión personal • Se guarda automáticamente</p>
                                </div>
                                {hasText && (
                                  <div className="flex items-center gap-2 text-sm text-violet-400 bg-violet-500/20 px-3 py-1.5 rounded-full border border-violet-500/30">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="font-medium">Guardado</span>
                                  </div>
                                )}
                              </div>
                              {/* Textarea mejorado */}
                              <div className="p-4">
                                <textarea
                                  value={textValue}
                                  onChange={(e) => progress.saveTextInput(step.id, e.target.value)}
                                  placeholder={t(step.textInput || '')}
                                  className={`w-full rounded-xl px-5 py-4 text-base resize-none transition-all duration-200 ${
                                    hasText 
                                      ? 'bg-slate-900/70 border-2 border-violet-500/30 text-white' 
                                      : 'bg-slate-900/50 border-2 border-slate-700/50 text-slate-300 hover:border-slate-600'
                                  } focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 focus:outline-none placeholder:text-slate-500 placeholder:italic`}
                                  rows={3}
                                />
                                <p className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                                  <span>🔒</span> Tus respuestas se guardan de forma segura en tu cuenta para trackear tu progreso.
                                </p>
                              </div>
                            </div>
                          );
                        }
                        
                        // Paso normal con checkbox
                        return (
                          <div
                            key={step.id}
                            id={`step-${step.id}`}
                            className={`group relative flex items-start gap-4 p-4 rounded-xl transition-all ${
                              isCompleted
                                ? 'bg-emerald-500/10 border border-emerald-500/20'
                                : 'hover:bg-slate-800/60 border border-transparent hover:border-slate-700/50'
                            } ${step.checkbox ? 'cursor-pointer' : ''}`}
                            onClick={() => step.checkbox && handleStepToggle(step.id, section)}
                          >
                            {/* Checkbox/Number */}
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                              isCompleted 
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                                : step.checkbox 
                                  ? 'bg-slate-700/80 text-slate-400 group-hover:bg-slate-600 group-hover:text-white border-2 border-slate-600 group-hover:border-slate-500'
                                  : 'bg-slate-700/50 text-slate-500'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="w-5 h-5" />
                              ) : (
                                <span className="text-sm font-bold">{stepIdx + 1}</span>
                              )}
                        </div>
                            
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                <p className={`text-[15px] leading-relaxed flex-1 ${
                                  isCompleted 
                                    ? 'text-emerald-300' 
                                    : 'text-slate-200 group-hover:text-white'
                                }`}>
                                  {t(step.text)}
                                </p>
                                
                                {/* Info button for explanation */}
                                {step.explanation && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setExpandedExplanation(expandedExplanation === step.id ? null : step.id);
                                    }}
                                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                      expandedExplanation === step.id
                                        ? 'bg-cyan-500 text-white'
                                        : 'bg-slate-700 text-slate-400 hover:bg-cyan-500/20 hover:text-cyan-400'
                                    }`}
                                    title="¿No sabés qué es esto? Click para ver explicación"
                                  >
                                    ?
                                  </button>
                                )}
                              </div>
                              
                              {/* Expandable explanation */}
                              {step.explanation && expandedExplanation === step.id && (
                                <div 
                                  className="mt-3 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <div className="flex items-start gap-2 mb-2">
                                    <span className="text-cyan-400 font-semibold">💡 Explicación:</span>
                                  </div>
                                  <div className="text-slate-300 leading-relaxed">
                                    {renderMarkdown(t(step.explanation))}
                                  </div>
                                  {step.learnMoreLink && (
                                    <a
                                      href={step.learnMoreLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 mt-3 text-cyan-400 hover:text-cyan-300 text-xs font-medium"
                                    >
                                      {`📚 ${step.learnMoreLabel || 'Aprender más'} →`}
                                    </a>
                                  )}
                  </div>
                              )}
                              
                              {/* Resource Button - Más visible */}
                              {step.resource && (
                                <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                                  <ResourceButton 
                                    resource={step.resource} 
                                    onNavigate={(tab) => setActiveTab(tab)}
                                    stepId={step.id}
                                    level={effectiveLevel}
                                  />
                </div>
                              )}
        </div>
                            
                            {/* XP Reward Badge */}
                            {step.checkbox && !isCompleted && (
                              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                                'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              } opacity-60 group-hover:opacity-100`}>
                                <Zap className="w-3.5 h-3.5" />
                                <span>+{XP_PER_STEP} XP</span>
      </div>
                            )}
                            
                            {/* Completed Badge */}
                            {isCompleted && (
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                <CheckCircle className="w-3.5 h-3.5" />
                                <span>Hecho</span>
                              </div>
                            )}
    </div>
  );
                      })}
                    </div>

                    {/* Stop Box */}
                    {section.stopTitle && (
                      <div className="mt-6 ml-12 relative">
                        {/* Línea conectora */}
                        <div className="absolute -left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500/50 to-transparent" />
                        
                        <div className="p-6 bg-gradient-to-br from-red-500/15 via-red-500/10 to-orange-500/5 border-2 border-red-500/40 rounded-2xl shadow-lg shadow-red-500/10">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-red-500/30 flex-shrink-0">
                              🛑
                            </div>
                            <div className="flex-1">
                              <h5 className="text-xl font-bold text-red-300 mb-2">
                                {t(section.stopTitle)}
                              </h5>
                              {section.stopContent && <p className="text-slate-200 text-base leading-relaxed">{t(section.stopContent)}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* 🎓 Deep Dive Hint - Solo aparece después del 1 Feb 2026 */}
            {isDeepDivesLaunched() && (() => {
              const phaseDeepDives = getDeepDivesForPhase(currentPhase.id);
              if (phaseDeepDives.length === 0) return null;
              
              return (
                <DeepDiveHint 
                  deepDives={phaseDeepDives}
                  onViewDeepDive={(deepDiveId) => {
                    // Navegar a la tab de especializaciones con el deep dive seleccionado
                    navigate(`/members?tab=especializaciones&deepDive=${deepDiveId}`);
                  }}
                  compact={true}
                  className="mt-4"
                />
              );
            })()}
          </div>
        </div>
      )}

      {/* Navigation Buttons - Moved above projects for better UX */}
      <div className="flex items-center justify-between bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
        <button
          onClick={() => {
            setActivePhaseIndex(Math.max(0, activePhaseIndex - 1));
            // Scroll to chapter content
            setTimeout(() => document.getElementById('chapter-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
          }}
          disabled={activePhaseIndex === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activePhaseIndex === 0 
              ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
              : `bg-slate-800 text-white hover:bg-slate-700`
          }`}
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          Capítulo Anterior
        </button>
        
        <div className="flex items-center gap-2">
          {currentLevel.phases.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActivePhaseIndex(idx);
                setTimeout(() => document.getElementById('chapter-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                activePhaseIndex === idx ? `bg-${config.color}-500 w-6` : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
                ))}
              </div>
        
        <button
          onClick={() => {
            setActivePhaseIndex(Math.min(currentLevel.phases.length - 1, activePhaseIndex + 1));
            // Scroll to chapter content
            setTimeout(() => document.getElementById('chapter-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
          }}
          disabled={activePhaseIndex === currentLevel.phases.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activePhaseIndex === currentLevel.phases.length - 1 
              ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
              : `bg-gradient-to-r ${config.gradient} text-white hover:opacity-90`
          }`}
        >
          Siguiente Capítulo
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Unlockable Projects */}
      <div className={`rounded-2xl border border-${config.color}-500/30 overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900`}>
        <div className="p-5 border-b border-slate-700/50">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Gem className={`w-5 h-5 text-${config.color}-400`} />
            Proyectos Desbloqueables
          </h3>
          <p className="text-slate-400 text-sm">Ganá XP completando pasos para desbloquear proyectos premium</p>
        </div>
        
        <div className="p-4 grid md:grid-cols-2 gap-3">
          {getUnlockableProjects().map(({ xp, project }, idx) => {
            if (!project) return null;
            const isUnlocked = totalXP >= xp;
            const progressToUnlock = Math.min((totalXP / xp) * 100, 100);
            
            return (
              <div 
                key={idx}
                className={`relative rounded-xl p-4 border transition-all ${
                  isUnlocked 
                    ? `bg-${config.color}-500/10 border-${config.color}-500/30 cursor-pointer hover:bg-${config.color}-500/20`
                    : 'bg-slate-800/30 border-slate-700/50'
                }`}
                onClick={() => isUnlocked && setActiveTab('proyectos')}
              >
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <Lock className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">{xp - totalXP} XP más</p>
                      <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-2 mx-auto overflow-hidden">
                        <div className={`h-full bg-${config.color}-500`} style={{ width: `${progressToUnlock}%` }} />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    isUnlocked ? `bg-${config.color}-500/20` : 'bg-slate-700'
                  }`}>
                    {project.icon || '📦'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-white text-sm">{t(project.title)}</h4>
                      {isUnlocked && <Sparkles className={`w-4 h-4 text-${config.color}-400`} />}
                    </div>
                    <p className="text-slate-400 text-xs line-clamp-2">{t(project.description)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        isUnlocked ? `bg-${config.color}-500/20 text-${config.color}-400` : 'bg-slate-700 text-slate-400'
                      }`}>
                        {project.difficulty}
                      </span>
                      <span className="text-xs text-slate-500">{project.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specializations Section */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl border border-amber-500/30">
            <Star className="w-6 h-6 text-amber-400" />
          </div>
                    <div>
            <h3 className="text-xl font-bold text-white">🎯 {t({ es: 'Especializaciones', en: 'Specializations', pt: 'Especializações' })}</h3>
            <p className="text-slate-400 text-sm">{t({ es: 'Paths avanzados después de completar el Nivel 3', en: 'Advanced paths after completing Level 3', pt: 'Trilhas avançadas após completar o Nível 3' })}</p>
                      </div>
        </div>

      </div>

      {/* Discord CTA */}
      <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <MessageCircle className="w-8 h-8 text-indigo-400" />
          <div>
            <h3 className="font-bold text-white">¿Dudas en tu aventura?</h3>
            <p className="text-slate-400 text-sm">Preguntá en Discord o esperá al Q&A mensual</p>
          </div>
        </div>
        <a 
          href={DISCORD_INVITE_LINK} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <MessageCircle className="w-4 h-4" /> Discord
                    </a>
                  </div>
                </div>
  );
};

export default RoadmapTab;
