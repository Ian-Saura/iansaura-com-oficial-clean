import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Database, Clock, Target, Trophy, Zap, Lock, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUserProgress } from '../../../hooks/useUserProgress';
import { useEnergySystem } from '../../../hooks/useEnergySystem';
import SQLPlayground from '../../SQLPlayground';
import PythonPlayground from '../../PythonPlayground';
import { InterviewMode } from '../InterviewMode';
import { useLanguage } from '../../../i18n/LanguageContext';

interface PracticaTabProps {
  progress: ReturnType<typeof useUserProgress>;
  isFreeUser?: boolean;
  energySystem?: ReturnType<typeof useEnergySystem>;
  userEmail?: string;
}

type Mode = 'practice' | 'interview';

interface InterviewConfig {
  type: 'sql' | 'python';
  duration: number;
  questionCount: number;
}

export const PracticaTab: React.FC<PracticaTabProps> = ({ progress, isFreeUser = false, energySystem, userEmail }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, tLocalized } = useLanguage();
  // Cargar playground activo de localStorage
  const [activePlayground, setActivePlayground] = useState<'sql' | 'python'>(() => {
    try {
      const saved = localStorage.getItem('practica_active_playground');
      return (saved === 'python' || saved === 'sql') ? saved : 'sql';
    } catch {
      return 'sql';
    }
  });
  const [mode, setMode] = useState<Mode>('practice');
  const [interviewConfig, setInterviewConfig] = useState<InterviewConfig | null>(null);
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);
  const [returnToRoadmap, setReturnToRoadmap] = useState<{ stepId: string; level: number } | null>(null);
  const [showInterviewMode, setShowInterviewMode] = useState(false);
  
  // Leer parámetros de URL cuando viene desde el roadmap
  useEffect(() => {
    const category = searchParams.get('category');
    const subcategory = searchParams.get('subcategory');
    const fromStep = searchParams.get('fromStep');
    const fromLevel = searchParams.get('fromLevel');
    
    if (category === 'sql' || category === 'python') {
      setActivePlayground(category);
    }
    
    // Pasar subcategory como filtro inicial al playground
    if (subcategory) {
      setInitialCategory(subcategory);
    }
    
    // Guardar info para volver al roadmap
    if (fromStep && fromLevel) {
      setReturnToRoadmap({ stepId: fromStep, level: parseInt(fromLevel) });
    }
    
    // Limpiar parámetros de URL después de leerlos (mantenemos tab y return info)
    if (category || subcategory) {
      const newParams = new URLSearchParams();
      newParams.set('tab', 'practica');
      // Mantener fromStep y fromLevel para que el botón siga funcionando
      if (fromStep) newParams.set('fromStep', fromStep);
      if (fromLevel) newParams.set('fromLevel', fromLevel);
      navigate({ search: newParams.toString() }, { replace: true });
    }
  }, [searchParams, navigate]);
  
  // Guardar playground activo
  useEffect(() => {
    localStorage.setItem('practica_active_playground', activePlayground);
  }, [activePlayground]);
  
  // Refs for SQL execution from SQLPlayground
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sqlExecuteRef = useRef<((query: string) => Promise<{ success: boolean; data?: any[]; error?: string }>) | null>(null);
  
  const handleExerciseComplete = (exerciseId: string, timeSeconds: number, xpReward: number) => {
    console.log(`Exercise ${exerciseId} completed in ${timeSeconds}s, +${xpReward} XP`);
    progress.addXPAndCoins(xpReward, 0, `Ejercicio ${exerciseId}`);
  };

  const startInterview = (duration: number, questionCount: number) => {
    setInterviewConfig({
      type: activePlayground,
      duration,
      questionCount,
    });
    setMode('interview');
  };

  const handleInterviewComplete = useCallback((results: { score: number; correctCount: number; totalCount: number }) => {
    setLastScore(results.score);
    // Award XP based on performance
    const xpEarned = results.correctCount * 15;
    progress.addXPAndCoins(xpEarned, 0, 'Modo Entrevista');
    setMode('practice');
    setInterviewConfig(null);
  }, [progress]);

  const handleInterviewExit = () => {
    setMode('practice');
    setInterviewConfig(null);
  };

  // Interview Mode
  if (mode === 'interview' && interviewConfig) {
    return (
      <InterviewMode
        type={interviewConfig.type}
        duration={interviewConfig.duration}
        questionCount={interviewConfig.questionCount}
        onComplete={handleInterviewComplete}
        onExit={handleInterviewExit}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Return to Roadmap Button - Shows when coming from roadmap */}
      {returnToRoadmap && (
        <button
          onClick={() => {
            // Navigate back to roadmap with the step highlighted
            navigate(`/members?tab=roadmap&level=${returnToRoadmap.level}&step=${returnToRoadmap.stepId}`);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500/20 to-purple-500/20 hover:from-violet-500/30 hover:to-purple-500/30 border border-violet-500/50 text-violet-300 rounded-lg transition-all group"
        >
          <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span>{tLocalized({ es: 'Volver al Roadmap', en: 'Back to Roadmap', pt: 'Voltar ao Roadmap' })}</span>
          <span className="text-xs text-violet-400/70">({returnToRoadmap.stepId})</span>
        </button>
      )}
      
      {/* Header with Mode Selection */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              activePlayground === 'sql' 
                ? 'bg-gradient-to-br from-emerald-500 to-cyan-500' 
                : 'bg-gradient-to-br from-yellow-500 to-orange-500'
            }`}>
              {activePlayground === 'sql' ? <Database className="w-6 h-6 text-white" /> : <span className="text-2xl">🐍</span>}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {tLocalized({ es: 'Práctica', en: 'Practice', pt: 'Prática' })} {activePlayground === 'sql' ? 'SQL' : 'Python'}
              </h2>
              <p className="text-slate-400 text-sm">
                {tLocalized({ es: 'Ejecutá código real y recibí feedback instantáneo', en: 'Run real code and get instant feedback', pt: 'Execute código real e receba feedback instantâneo' })}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Toggle SQL/Python */}
            <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-600">
              <button
                onClick={() => setActivePlayground('sql')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  activePlayground === 'sql'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Database className="w-4 h-4" />
                SQL
              </button>
              <button
                onClick={() => setActivePlayground('python')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all ${
                  activePlayground === 'python'
                    ? 'bg-yellow-500 text-slate-900 shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🐍 Python
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Mode - Collapsible Button */}
      <div className="rounded-xl border border-slate-700 overflow-hidden">
        <button
          onClick={() => !isFreeUser && setShowInterviewMode(!showInterviewMode)}
          disabled={isFreeUser}
          className={`w-full flex items-center justify-between p-4 transition-colors ${
            isFreeUser 
              ? 'bg-slate-800/50 cursor-not-allowed' 
              : showInterviewMode 
                ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20' 
                : 'bg-slate-800 hover:bg-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              isFreeUser ? 'bg-slate-700' : 'bg-gradient-to-br from-red-500 to-orange-500'
            }`}>
              {isFreeUser ? <Lock className="w-5 h-5 text-slate-400" /> : <Target className="w-5 h-5 text-white" />}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">🎯 {tLocalized({ es: 'Modo Entrevista', en: 'Interview Mode', pt: 'Modo Entrevista' })}</span>
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">LIVECODING</span>
                {isFreeUser && <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">Premium</span>}
              </div>
              <p className="text-slate-400 text-sm">
                {isFreeUser 
                  ? tLocalized({ es: 'Suscribite para simular entrevistas técnicas reales', en: 'Subscribe to simulate real technical interviews', pt: 'Assine para simular entrevistas técnicas reais' })
                  : tLocalized({ es: 'Simulá una entrevista técnica con timer', en: 'Simulate a technical interview with timer', pt: 'Simule uma entrevista técnica com timer' })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastScore !== null && !isFreeUser && (
              <span className={`text-sm font-bold ${lastScore >= 70 ? 'text-emerald-400' : lastScore >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                {tLocalized({ es: 'Último:', en: 'Last:', pt: 'Último:' })} {lastScore}%
              </span>
            )}
            {isFreeUser ? (
              <button
                onClick={(e) => { e.stopPropagation(); navigate('/suscripcion'); }}
                className="px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg font-medium hover:bg-emerald-600"
              >
                {tLocalized({ es: 'Desbloquear', en: 'Unlock', pt: 'Desbloquear' })}
              </button>
            ) : (
              showInterviewMode ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />
            )}
          </div>
        </button>
        
        {/* Expanded Interview Options */}
        {showInterviewMode && !isFreeUser && (
          <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border-t border-red-500/20">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-sm text-slate-400">⏱️ {tLocalized({ es: 'Elegí duración:', en: 'Choose duration:', pt: 'Escolha a duração:' })}</span>
              <button
                onClick={() => startInterview(10, 5)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/20 border border-slate-600 hover:border-red-500 rounded-lg transition-all"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-white font-medium">10 min</span>
                <span className="text-xs text-slate-500">(5 {tLocalized({ es: 'preguntas', en: 'questions', pt: 'perguntas' })})</span>
              </button>
              <button
                onClick={() => startInterview(20, 7)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-orange-500/20 border border-slate-600 hover:border-orange-500 rounded-lg transition-all"
              >
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-white font-medium">20 min</span>
                <span className="text-xs text-slate-500">(7 {tLocalized({ es: 'preguntas', en: 'questions', pt: 'perguntas' })})</span>
              </button>
              <button
                onClick={() => startInterview(30, 10)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg transition-all shadow-lg shadow-red-500/20"
              >
                <Trophy className="w-4 h-4 text-white" />
                <span className="text-white font-bold">30 min</span>
                <span className="text-xs text-red-100">(10 {tLocalized({ es: 'preguntas', en: 'questions', pt: 'perguntas' })}) ⭐</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-400" /> {tLocalized({ es: 'Código real', en: 'Real code', pt: 'Código real' })}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-red-400" /> {tLocalized({ es: 'Timer real', en: 'Real timer', pt: 'Timer real' })}</span>
              <span className="flex items-center gap-1"><Target className="w-3 h-3 text-cyan-400" /> {tLocalized({ es: 'Preguntas FAANG', en: 'FAANG Questions', pt: 'Perguntas FAANG' })}</span>
              <span className="flex items-center gap-1"><Trophy className="w-3 h-3 text-amber-400" /> {tLocalized({ es: '+15 XP/correcta', en: '+15 XP/correct', pt: '+15 XP/correta' })}</span>
            </div>
          </div>
        )}
      </div>

      {/* Playground - Free users only get Easy exercises */}
      {activePlayground === 'sql' ? (
        <SQLPlayground onComplete={handleExerciseComplete} limitToEasy={isFreeUser} initialCategory={initialCategory} energySystem={energySystem} isFreeUser={isFreeUser} userEmail={userEmail} />
      ) : (
        <PythonPlayground onComplete={handleExerciseComplete} initialCategory={initialCategory || 'all'} limitToEasy={isFreeUser} energySystem={energySystem} isFreeUser={isFreeUser} onSyncRoadmap={progress.syncExercisesWithRoadmap} userEmail={userEmail} />
      )}
      
      {/* Free user info */}
      {isFreeUser && (
        <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Crown className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-emerald-300 font-medium">{tLocalized({ es: 'Plan Gratuito: Solo ejercicios Easy disponibles', en: 'Free Plan: Only Easy exercises available', pt: 'Plano Gratuito: Apenas exercícios Fáceis disponíveis' })}</p>
              <p className="text-slate-400 text-sm">{tLocalized({ es: 'Suscribite para acceder a ejercicios Medium, Hard y el Modo Entrevista', en: 'Subscribe to access Medium, Hard exercises and Interview Mode', pt: 'Assine para acessar exercícios Médios, Difíceis e o Modo Entrevista' })}</p>
            </div>
            <button
              onClick={() => navigate('/suscripcion')}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              {tLocalized({ es: 'Ver planes', en: 'View plans', pt: 'Ver planos' })}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

