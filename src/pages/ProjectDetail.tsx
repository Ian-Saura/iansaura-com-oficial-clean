import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowLeft, Target, Clock, Code, BookOpen, CheckCircle, ChevronDown, ChevronRight,
  Flame, Sparkles, Gift, Award, ExternalLink, Play, FileText, Video, Briefcase,
  Eye, EyeOff, Lightbulb, HelpCircle, Lock, Unlock, AlertTriangle, Zap, Trophy,
  X, ChevronUp
} from 'lucide-react';
import { projects } from '../data/projectsData';
import { useUserProgress } from '../hooks/useUserProgress';
import { useCelebration } from '../hooks/useCelebration';
import { useLanguage } from '../i18n/LanguageContext';
import { ProjectStep, ProjectHint, CommonMistake } from '../types/members';
import { LocalizedContent, t as tLocalized } from '../types/i18n';
import AITutor from '../components/AITutor';

// ============================================
// THEORY CONTENT - Formatea el texto de teoría
// ============================================
const TheoryContent: React.FC<{ content: LocalizedContent; lang?: 'es' | 'en' | 'pt' }> = ({ content, lang = 'es' }) => {
  // Procesar el contenido para mejor formato
  const lines = tLocalized(content, lang).split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let tableHeaders: string[] = [];
  
  // Helper para procesar markdown inline (negritas, código, etc)
  const processInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`(.+?)`/g, '<code class="text-indigo-300 bg-slate-900 px-1.5 py-0.5 rounded text-sm">$1</code>');
  };

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="my-4 space-y-2">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-indigo-400 mt-1">→</span>
              <span dangerouslySetInnerHTML={{ __html: processInlineMarkdown(item) }} />
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="my-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {tableHeaders.map((h, i) => (
                  <th key={i} className="bg-slate-800 text-left text-slate-300 px-4 py-3 font-semibold border-b border-slate-600 first:rounded-tl-lg last:rounded-tr-lg">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, ri) => (
                <tr key={ri} className="hover:bg-slate-800/50 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-slate-400 border-b border-slate-700/50">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      tableHeaders = [];
      inTable = false;
    }
  };
  
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    
    // Headers
    if (trimmed.startsWith('## ')) {
      flushList();
      flushTable();
      elements.push(
        <h2 key={`h2-${idx}`} className="text-xl font-bold text-indigo-400 mt-8 mb-4 pb-2 border-b border-slate-700 first:mt-0">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith('### ')) {
      flushList();
      flushTable();
      elements.push(
        <h3 key={`h3-${idx}`} className="text-lg font-semibold text-slate-200 mt-6 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          {trimmed.slice(4)}
        </h3>
      );
    }
    // List items
    else if (trimmed.startsWith('- ')) {
      flushTable();
      currentList.push(trimmed.slice(2));
    }
    // Table
    else if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      const cells = trimmed.split('|').filter(c => c.trim()).map(c => c.trim());
      
      if (trimmed.includes('---')) {
        // Separator row, skip
      } else if (tableHeaders.length === 0) {
        tableHeaders = cells;
        inTable = true;
      } else {
        tableRows.push(cells);
      }
    }
    // Bold text block (like **Regla práctica**)
    else if (trimmed.startsWith('**') && trimmed.includes('**:')) {
      flushList();
      flushTable();
      const match = trimmed.match(/\*\*(.+?)\*\*:?\s*(.*)/);
      if (match) {
        elements.push(
          <div key={`tip-${idx}`} className="my-4 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <span className="font-bold text-indigo-400">{match[1]}: </span>
                <span className="text-slate-300">{match[2]}</span>
              </div>
            </div>
          </div>
        );
      }
    }
    // Regular paragraph
    else if (trimmed.length > 0 && !inTable) {
      flushList();
      flushTable();
      elements.push(
        <p key={`p-${idx}`} className="my-3 text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: processInlineMarkdown(trimmed) }} />
      );
    }
  });
  
  flushList();
  flushTable();
  
  return <>{elements}</>;
};

// ============================================
// HINT COMPONENT - Sistema de Hints Progresivos
// ============================================
interface HintSystemProps {
  hints?: ProjectHint[];
  stepOrder: number;
  lang?: 'es' | 'en' | 'pt';
}

const HintSystem: React.FC<HintSystemProps> = ({ hints, stepOrder, lang = 'es' }) => {
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  
  if (!hints || hints.length === 0) return null;
  
  const revealHint = (level: number) => {
    if (!revealedHints.includes(level)) {
      setRevealedHints([...revealedHints, level]);
    }
  };
  
  const sortedHints = [...hints].sort((a, b) => a.level - b.level);
  
  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center gap-2 text-slate-400 text-sm">
        <Lightbulb className="w-4 h-4" />
        <span>¿Necesitás ayuda? Intentá primero, después mirá los hints</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {sortedHints.map((hint) => {
          const isRevealed = revealedHints.includes(hint.level);
          const canReveal = hint.level === 1 || revealedHints.includes(hint.level - 1);
          
          return (
            <button
              key={hint.level}
              onClick={() => canReveal && revealHint(hint.level)}
              disabled={!canReveal && !isRevealed}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2
                ${isRevealed 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : canReveal
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }
              `}
            >
              {isRevealed ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              {tLocalized(hint.title, lang)}
            </button>
          );
        })}
      </div>
      
      {/* Revealed Hints */}
      <div className="space-y-3">
        {sortedHints.map((hint) => {
          if (!revealedHints.includes(hint.level)) return null;
          
          return (
            <div 
              key={hint.level}
              className={`
                rounded-xl p-4 border animate-fadeIn
                ${hint.level === 1 ? 'bg-blue-500/10 border-blue-500/20' :
                  hint.level === 2 ? 'bg-amber-500/10 border-amber-500/20' :
                  'bg-emerald-500/10 border-emerald-500/20'}
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                {hint.level === 1 && <HelpCircle className="w-4 h-4 text-blue-400" />}
                {hint.level === 2 && <Lightbulb className="w-4 h-4 text-amber-400" />}
                {hint.level === 3 && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                <span className={`font-medium ${
                  hint.level === 1 ? 'text-blue-400' :
                  hint.level === 2 ? 'text-amber-400' :
                  'text-emerald-400'
                }`}>
                  {tLocalized(hint.title, lang)}
                </span>
              </div>
              <p className="text-slate-300 text-sm whitespace-pre-wrap">{tLocalized(hint.content, lang)}</p>
              {hint.code && (
                <pre className="mt-3 bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm">
                  <code className="text-emerald-300 font-mono whitespace-pre">{hint.code}</code>
                </pre>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// CODE REVEAL COMPONENT
// ============================================
interface CodeRevealProps {
  code: string;
  title?: string;
}

const CodeReveal: React.FC<CodeRevealProps> = ({ code, title = "Ver código" }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  
  return (
    <div className="mt-3">
      <button
        onClick={() => setIsRevealed(!isRevealed)}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
          ${isRevealed 
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }
        `}
      >
        {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        {isRevealed ? 'Ocultar código' : title}
      </button>
      
      {isRevealed && (
        <pre className="mt-3 bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm animate-fadeIn">
          <code className="text-emerald-300 font-mono whitespace-pre">{code}</code>
        </pre>
      )}
    </div>
  );
};

// ============================================
// STEP COMPONENT
// ============================================
interface StepComponentProps {
  step: ProjectStep;
  isCompleted: boolean;
  onToggle: () => void;
  lang?: 'es' | 'en' | 'pt';
}

const StepComponent: React.FC<StepComponentProps> = ({ step, isCompleted, onToggle, lang = 'es' }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const difficultyColors = {
    easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  
  return (
    <div className={`
      border-l-4 pl-6 py-4 transition-all
      ${isCompleted ? 'border-emerald-500 bg-emerald-500/5' : 'border-blue-500/30 hover:border-blue-500'}
    `}>
      {/* Step Header */}
      <div className="flex items-start gap-4">
        <button
          onClick={onToggle}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all
            ${isCompleted 
              ? 'bg-emerald-500 text-white' 
              : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
            }
          `}
        >
          {isCompleted ? <CheckCircle className="w-5 h-5" /> : <span className="font-bold">{step.order}</span>}
        </button>
        
        <div className="flex-1">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3">
              <h4 className={`font-semibold ${isCompleted ? 'text-emerald-400' : 'text-white'}`}>
                {tLocalized(step.text, lang)}
              </h4>
              {/* Time and difficulty badges */}
              <div className="flex items-center gap-2">
                {step.estimatedTime && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300">
                    ⏱️ {step.estimatedTime}
                  </span>
                )}
                {step.difficulty && (
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[step.difficulty]}`}>
                    {step.difficulty === 'easy' ? '🟢 Fácil' : step.difficulty === 'medium' ? '🟡 Medio' : '🔴 Difícil'}
                  </span>
                )}
              </div>
            </div>
            <button className="text-slate-400 hover:text-white p-1">
              {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Challenge - Lo que deberías intentar */}
          {step.challenge && (
            <div className="mt-3 flex items-start gap-2 text-sm bg-purple-500/10 text-purple-300 rounded-lg p-3 border border-purple-500/20">
              <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold">🎯 Desafío:</span> {tLocalized(step.challenge, lang)}
              </div>
            </div>
          )}
          
          {/* Expanded Content */}
          {isExpanded && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              {/* Explanation */}
              {step.explanation && (
                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    💡 {tLocalized(step.explanation, lang)}
                  </p>
                </div>
              )}
              
              {/* Tip */}
              {step.tip && (
                <div className="flex items-start gap-2 text-sm bg-blue-500/10 text-blue-300 rounded-lg p-3 border border-blue-500/20">
                  <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Tip:</strong> {tLocalized(step.tip, lang)}</span>
                </div>
              )}
              
              {/* Warning */}
              {step.warning && (
                <div className="flex items-start gap-2 text-sm bg-amber-500/10 text-amber-300 rounded-lg p-3 border border-amber-500/20">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>⚠️ Cuidado:</strong> {tLocalized(step.warning, lang)}</span>
                </div>
              )}
              
              {/* Code - Hidden by default */}
              {step.code && (
                <CodeReveal code={step.code} title="💻 Ver código de este paso" />
              )}
              
              {/* Hints System */}
              <HintSystem hints={step.hints} stepOrder={step.order} lang={lang} />
              
              {/* Expected Output */}
              {step.expectedOutput && (
                <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                  <h5 className="text-sm font-semibold text-cyan-400 mb-2">📋 Output esperado:</h5>
                  <pre className="text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap font-mono bg-slate-950 p-3 rounded">
                    {tLocalized(step.expectedOutput, lang)}
                  </pre>
                </div>
              )}
              
              {/* Checkpoint */}
              {step.checkpoint && (
                <div className="flex items-start gap-2 text-sm bg-emerald-500/10 text-emerald-300 rounded-lg p-3 border border-emerald-500/20">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>✓ Checkpoint:</strong> {tLocalized(step.checkpoint, lang)}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================
// Project that is free for promotion purposes
const FREE_PROJECT_ID = 'p1-etl-python';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const progress = useUserProgress();
  const celebration = useCelebration();
  const { language, t } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [completedEval, setCompletedEval] = useState<number[]>([]);
  
  // Access control state
  const [accessChecked, setAccessChecked] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  
  // Get user from localStorage
  const userEmail = useMemo(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user?.email || '';
      } catch {
        return '';
      }
    }
    return '';
  }, []);
  
  // Access control: free project is open, others require subscription
  useEffect(() => {
    if (projectId === FREE_PROJECT_ID) {
      setHasAccess(true);
      setAccessChecked(true);
      return;
    }
    
    // Not the free project - verify subscription with server
    if (!userEmail) {
      setHasAccess(false);
      setAccessChecked(true);
      return;
    }
    
    const checkAccess = async () => {
      try {
        const res = await fetch(`/api/check-subscriber.php?email=${encodeURIComponent(userEmail)}`);
        if (res.ok) {
          const data = await res.json();
          setHasAccess(data.success && data.subscribed === true);
        } else {
          setHasAccess(false);
        }
      } catch {
        // On error, check localStorage as fallback
        try {
          const cached = localStorage.getItem('user');
          if (cached) {
            const u = JSON.parse(cached);
            setHasAccess(u.subscribed === true);
          }
        } catch {
          setHasAccess(false);
        }
      }
      setAccessChecked(true);
    };
    
    checkAccess();
  }, [projectId, userEmail]);
  
  const project = projects.find(p => p.id === projectId);
  
  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem(`project-steps-${projectId}`);
    if (saved) {
      setCompletedSteps(JSON.parse(saved));
    }
    // Load completed evaluations
    const savedEval = localStorage.getItem(`project-eval-${projectId}`);
    if (savedEval) {
      setCompletedEval(JSON.parse(savedEval));
    }
  }, [projectId]);
  
  const toggleStep = (stepOrder: number) => {
    const newCompleted = completedSteps.includes(stepOrder)
      ? completedSteps.filter(s => s !== stepOrder)
      : [...completedSteps, stepOrder];
    
    setCompletedSteps(newCompleted);
    localStorage.setItem(`project-steps-${projectId}`, JSON.stringify(newCompleted));
    
    // If all steps completed, mark project as completed with celebration!
    if (project && !completedSteps.includes(stepOrder) && newCompleted.length === project.steps.length) {
      progress.toggleProject(project.id);
      celebration.fireConfettiSides();
      setTimeout(() => celebration.fireStars(), 300);
    }
  };
  
  const toggleEval = (idx: number) => {
    const newCompleted = completedEval.includes(idx)
      ? completedEval.filter(i => i !== idx)
      : [...completedEval, idx];
    
    setCompletedEval(newCompleted);
    localStorage.setItem(`project-eval-${projectId}`, JSON.stringify(newCompleted));
  };
  
  // Loading state while checking access
  if (!accessChecked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">
            {language === 'en' ? 'Verifying access...' : language === 'pt' ? 'Verificando acesso...' : 'Verificando acceso...'}
          </p>
        </div>
      </div>
    );
  }
  
  // Access denied - show paywall
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="bg-slate-800/60 rounded-2xl border border-slate-700 p-8">
            <Lock className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-white mb-3">
              {language === 'en' ? 'Premium Project' : language === 'pt' ? 'Projeto Premium' : 'Proyecto Premium'}
            </h1>
            <p className="text-slate-400 mb-6">
              {language === 'en' 
                ? 'This guided project is available for premium subscribers. Subscribe to access all projects, roadmaps, exercises and more.'
                : language === 'pt'
                ? 'Este projeto guiado está disponível para assinantes premium. Assine para acessar todos os projetos, roadmaps, exercícios e mais.'
                : 'Este proyecto guiado está disponible para suscriptores premium. Suscribite para acceder a todos los proyectos, roadmaps, ejercicios y más.'}
            </p>
            <div className="space-y-3">
              {!userEmail ? (
                <button
                  onClick={() => navigate('/auth')}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
                >
                  {language === 'en' ? 'Log In / Sign Up' : language === 'pt' ? 'Entrar / Cadastrar' : 'Iniciar Sesión / Registrarse'}
                </button>
              ) : (
                <button
                  onClick={() => navigate('/suscripcion')}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-colors"
                >
                  {language === 'en' ? 'Subscribe Now' : language === 'pt' ? 'Assinar Agora' : 'Suscribirme'}
                </button>
              )}
              <button
                onClick={() => navigate('/project/p1-etl-python')}
                className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-xl transition-colors text-sm"
              >
                {language === 'en' ? '🎁 Try Free Project: ETL with Python' : language === 'pt' ? '🎁 Experimente Grátis: ETL com Python' : '🎁 Probá Gratis: ETL con Python'}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="text-slate-500 hover:text-slate-400 text-sm transition-colors"
              >
                ← {language === 'en' ? 'Go back' : language === 'pt' ? 'Voltar' : 'Volver'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Proyecto no encontrado</h1>
          <Link to="/members" className="text-emerald-400 hover:underline">
            ← Volver a la plataforma
          </Link>
        </div>
      </div>
    );
  }
  
  const isCompleted = progress.isProjectCompleted(project.id);
  const stepsProgress = Math.round((completedSteps.length / project.steps.length) * 100);
  
  const colorClasses = {
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    orange: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
  };
  
  const bgColor = colorClasses[project.color as keyof typeof colorClasses] || colorClasses.emerald;
  
  return (
    <>
      <Helmet>
        <title>{tLocalized(project.title, language)} | Ian Saura Data Engineering Academy</title>
        <meta name="description" content={tLocalized(project.description, language)} />
      </Helmet>
      
      <div className="min-h-screen bg-slate-900">
        {/* Header */}
        <div className={`bg-gradient-to-br ${bgColor} border-b`}>
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Back button */}
            <button
              onClick={() => navigate('/members')}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver a la plataforma
            </button>
            
            {/* Project Header */}
            <div className="flex items-start gap-6">
              {project.icon && (
                <div className="text-4xl md:text-6xl">{project.icon}</div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.difficulty === 'Principiante' ? 'bg-green-500/20 text-green-400' :
                    project.difficulty === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-400' :
                    project.difficulty === 'Avanzado' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>{project.difficulty}</span>
                  <span className="text-slate-400 text-sm">Nivel {project.level}</span>
                  <span className="text-slate-400 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {project.duration}
                  </span>
                  {project.estimatedLines && (
                    <span className="text-slate-400 text-sm flex items-center gap-1">
                      <Code className="w-3 h-3" /> ~{project.estimatedLines} líneas
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-white mb-3">{tLocalized(project.title, language)}</h1>
                <p className="text-slate-300 text-lg">{tLocalized(project.description, language)}</p>
                
                {/* Real World Example */}
                {project.realWorldExample && (
                  <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">Caso Real:</span>
                    <span className="text-slate-300">{tLocalized(project.realWorldExample, language)}</span>
                  </div>
                )}
                
                {/* Used By Companies */}
                {project.usedBy && project.usedBy.length > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Usado por:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.usedBy.map((company, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded-full text-xs">
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Completion Badge */}
              {isCompleted && (
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-4 text-center">
                  <Trophy className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <span className="text-emerald-400 font-bold">Completado</span>
                </div>
              )}
            </div>
            
            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {project.skills.map((skill, idx) => (
                <span key={idx} className="text-xs bg-slate-700/50 text-slate-300 px-3 py-1.5 rounded-lg font-medium">
                  {tLocalized(skill, language)}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Steps */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress */}
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">Tu progreso</span>
                  <span className="text-emerald-400 font-bold">{stepsProgress}%</span>
                </div>
                <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500"
                    style={{ width: `${stepsProgress}%` }}
                  />
                </div>
                <p className="text-slate-400 text-sm mt-2">
                  {completedSteps.length} de {project.steps.length} pasos completados
                </p>
              </div>
              
              {/* Learning Objectives */}
              {project.learningObjectives && project.learningObjectives.length > 0 && (
                <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/20">
                  <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    🎯 {t('projectDetail.learningObjectives')}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.learningObjectives.map((obj, idx) => (
                      <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        {tLocalized(obj, language)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Common Mistakes - Enhanced */}
              {project.commonMistakes && project.commonMistakes.length > 0 && (
                <div className="bg-red-500/10 rounded-xl p-5 border border-red-500/20">
                  <h3 className="font-bold text-red-400 mb-4 flex items-center gap-2">
                    <Flame className="w-5 h-5" />
                    ⚠️ {t('projectDetail.commonErrors')}
                  </h3>
                  <div className="space-y-4">
                    {project.commonMistakes.map((mistake, idx) => {
                      // Check if it's a localized content object (has 'es' and 'en')
                      const isLocalizedContent = 'es' in mistake && 'en' in mistake;
                      // Or if it's a CommonMistake object (has 'mistake', 'why', 'solution')
                      const isCommonMistake = 'mistake' in mistake && 'why' in mistake;

                      if (isLocalizedContent && !isCommonMistake) {
                        return (
                          <div key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                            <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                            {tLocalized(mistake as LocalizedContent, language)}
                          </div>
                        );
                      } else {
                         const cm = mistake as CommonMistake;
                         return (
                          <details key={idx} className="group bg-slate-800/50 rounded-lg overflow-hidden">
                            <summary className="flex items-start gap-2 p-3 cursor-pointer hover:bg-slate-800 transition-colors list-none [&::-webkit-details-marker]:hidden">
                              <ChevronRight className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90" />
                              <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300 text-sm font-medium flex-1">{tLocalized(cm.mistake, language)}</span>
                            </summary>
                            <div className="px-3 pb-3 pt-1 border-t border-slate-700 space-y-2">
                              <p className="text-slate-400 text-sm"><strong className="text-amber-400">Por qué es un error:</strong> {tLocalized(cm.why, language)}</p>
                              <p className="text-slate-400 text-sm"><strong className="text-emerald-400">Solución:</strong> {tLocalized(cm.solution, language)}</p>
                              {cm.code && (
                                <pre className="text-xs bg-slate-900 p-3 rounded overflow-x-auto text-slate-300 font-mono">{cm.code}</pre>
                              )}
                            </div>
                          </details>
                        )
                      }
                    })}
                  </div>
                </div>
              )}
              
              {/* Expected Outputs */}
              {project.expectedOutputs && project.expectedOutputs.length > 0 && (
                <div className="bg-cyan-500/10 rounded-xl p-5 border border-cyan-500/20">
                  <h3 className="font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    📋 Outputs esperados
                  </h3>
                  <div className="space-y-4">
                    {project.expectedOutputs.map((output, idx) => (
                      <details key={idx} className="group bg-slate-800/50 rounded-lg overflow-hidden">
                        <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-slate-800 transition-colors list-none [&::-webkit-details-marker]:hidden">
                          <ChevronRight className="w-4 h-4 text-slate-500 flex-shrink-0 transition-transform group-open:rotate-90" />
                          <span className="text-cyan-400 font-mono text-sm">Paso {output.step}</span>
                          <span className="text-slate-300 text-sm flex-1">{tLocalized(output.description, language)}</span>
                        </summary>
                        <div className="px-3 pb-3 pt-1 border-t border-slate-700">
                          <pre className="text-xs bg-slate-900 p-3 rounded overflow-x-auto text-emerald-300 font-mono whitespace-pre-wrap">{output.example}</pre>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Steps */}
              <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white text-xl mb-6 flex items-center gap-2">
                  <Code className="w-6 h-6 text-blue-400" />
                  📋 Pasos del Proyecto
                </h3>
                
                <div className="space-y-2">
                  {project.steps.map((step) => (
                    <StepComponent
                      key={step.order}
                      step={step}
                      isCompleted={completedSteps.includes(step.order)}
                      onToggle={() => toggleStep(step.order)}
                      lang={language}
                    />
                  ))}
                </div>
              </div>
              
              {/* Theory Section - Premium UI */}
              {project.theory && (
                <div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-6 py-4 border-b border-slate-700/50">
                    <h3 className="font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <span className="text-lg">Fundamentos Teóricos</span>
                        <p className="text-xs text-slate-500 font-normal mt-0.5">Conceptos clave para este proyecto</p>
                      </div>
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="text-[15px] leading-relaxed text-slate-300 
                      [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-indigo-400 [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:pb-2 [&_h2]:border-b [&_h2]:border-slate-700
                      [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-200 [&_h3]:mt-5 [&_h3]:mb-2
                      [&_strong]:text-white [&_strong]:font-semibold
                      [&_code]:text-indigo-300 [&_code]:bg-slate-900 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
                      [&_ul]:my-3 [&_ul]:space-y-2
                      [&_li]:flex [&_li]:items-start [&_li]:gap-2
                      [&_table]:w-full [&_table]:my-4 [&_table]:text-sm [&_table]:border-collapse
                      [&_th]:bg-slate-800 [&_th]:text-left [&_th]:text-slate-300 [&_th]:px-4 [&_th]:py-2.5 [&_th]:font-semibold [&_th]:border [&_th]:border-slate-600
                      [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-slate-400 [&_td]:border [&_td]:border-slate-700
                      [&_tr:hover_td]:bg-slate-800/50
                      ">
                      <TheoryContent content={project.theory} lang={language} />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Full Code Example - Premium UI */}
              {project.codeExample && (
                <div className="bg-slate-800/40 rounded-2xl border border-slate-700 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 px-6 py-4 border-b border-slate-700/50">
                    <h3 className="font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                        <Code className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-lg">Código de Referencia</span>
                        <p className="text-xs text-slate-500 font-normal mt-0.5">Solución completa comentada</p>
                      </div>
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-5">
                      <div className="flex items-center gap-2 text-amber-400 font-medium text-sm">
                        <span>⚠️</span>
                        <span>Intentá resolver el proyecto por tu cuenta antes de ver esto.</span>
                      </div>
                      <p className="text-slate-400 text-xs mt-1 ml-6">Es la mejor forma de aprender y consolidar los conceptos.</p>
                    </div>
                    <CodeReveal code={project.codeExample} title="🔓 Revelar código completo" />
                  </div>
                </div>
              )}
              
              {/* 🎤 Interview Story - Cómo contar este proyecto en entrevistas */}
              {project.interviewStory && (
                <div className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 rounded-2xl border border-amber-500/20 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-6 py-4 border-b border-amber-500/20">
                    <h3 className="font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                        <span className="text-xl">🎤</span>
                      </div>
                      <div>
                        <span className="text-lg">{t('projectDetail.interview.title')}</span>
                        <p className="text-xs text-slate-500 font-normal mt-0.5">{t('projectDetail.interview.subtitle')}</p>
                      </div>
                    </h3>
                  </div>
                  <div className="p-6 space-y-6">
                    {/* Hook */}
                    <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/30">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🎯</span>
                        <div>
                          <span className="text-amber-400 font-bold text-sm uppercase tracking-wide">{t('projectDetail.interview.hook')}</span>
                          <p className="text-white mt-2 text-lg font-medium leading-relaxed">
                            "{tLocalized(project.interviewStory.hook, language)}"
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* STAR Method */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Situation */}
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">S</span>
                          <span className="text-blue-400 font-semibold text-sm">{t('projectDetail.interview.situation')}</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{tLocalized(project.interviewStory.situation, language)}</p>
                      </div>
                      
                      {/* Task */}
                      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">T</span>
                          <span className="text-purple-400 font-semibold text-sm">{t('projectDetail.interview.task')}</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">{tLocalized(project.interviewStory.task, language)}</p>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">A</span>
                        <span className="text-emerald-400 font-semibold text-sm">{t('projectDetail.interview.actions')}</span>
                      </div>
                      <ul className="space-y-2">
                        {project.interviewStory.actions.map((action, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-emerald-400 mt-1">→</span>
                            <span>{tLocalized(action, language)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Results */}
                    <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-xl p-4 border border-emerald-500/30">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">R</span>
                        <span className="text-emerald-400 font-semibold text-sm">{t('projectDetail.interview.results')}</span>
                      </div>
                      <ul className="space-y-2">
                        {project.interviewStory.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-white text-sm font-medium">
                            <span className="text-emerald-400">✓</span>
                            <span>{tLocalized(result, language)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Learnings */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">💡</span>
                        <span className="text-slate-300 font-semibold text-sm">{t('projectDetail.interview.learnings')}</span>
                      </div>
                      <ul className="space-y-2">
                        {project.interviewStory.learnings.map((learning, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                            <span className="text-amber-400">•</span>
                            <span>{tLocalized(learning, language)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Possible Questions */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg">❓</span>
                        <span className="text-slate-300 font-semibold text-sm">{t('projectDetail.interview.questions')}</span>
                      </div>
                      <div className="space-y-4">
                        {project.interviewStory.possibleQuestions.map((qa, idx) => (
                          <div key={idx} className="border-l-2 border-indigo-500/50 pl-4">
                            <p className="text-indigo-400 text-sm font-medium mb-1">"{tLocalized(qa.question, language)}"</p>
                            <p className="text-slate-400 text-sm">{tLocalized(qa.answer, language)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Closing Statement */}
                    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-4 border border-indigo-500/30">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🎬</span>
                        <div>
                          <span className="text-indigo-400 font-bold text-sm uppercase tracking-wide">{t('projectDetail.interview.closing')}</span>
                          <p className="text-white mt-2 italic leading-relaxed">
                            "{tLocalized(project.interviewStory.closingStatement, language)}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {/* Deliverable */}
              <div className="bg-blue-500/10 rounded-xl p-5 border border-blue-500/20">
                <h3 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  📦 {t('projectDetail.deliverable')}
                </h3>
                <p className="text-slate-300 text-sm">{tLocalized(project.deliverable, language)}</p>
              </div>
              
              {/* Evaluation */}
              <div className="bg-purple-500/10 rounded-xl p-5 border border-purple-500/20">
                <h3 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  ✅ {t('projectDetail.selfEvaluation')}
                </h3>
                <ul className="space-y-2">
                  {project.evaluation.map((q, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <button
                        onClick={() => toggleEval(idx)}
                        className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                          completedEval.includes(idx) 
                            ? 'bg-purple-500 border-purple-500 text-white' 
                            : 'border-purple-500/50 hover:border-purple-400'
                        }`}
                      >
                        {completedEval.includes(idx) && <CheckCircle className="w-3 h-3" />}
                      </button>
                      <span className={completedEval.includes(idx) ? 'line-through text-slate-500' : ''}>{tLocalized(q, language)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Related Video */}
              {project.videoWeek && (
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <h3 className="font-bold text-slate-300 mb-3 flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    🎬 Video Relacionado
                  </h3>
                  <Link 
                    to="/members" 
                    state={{ tab: 'grabaciones', week: project.videoWeek }}
                    className="text-emerald-400 hover:underline text-sm flex items-center gap-2"
                  >
                    Ver Semana {project.videoWeek} del Bootcamp
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
              
              {/* Next Steps */}
              {project.nextSteps && project.nextSteps.length > 0 && (
                <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-xl p-5 border border-emerald-500/20">
                  <h3 className="font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <ChevronRight className="w-5 h-5" />
                    🚀 Próximos pasos
                  </h3>
                  <ul className="space-y-2">
                    {project.nextSteps.map((step, idx) => (
                      <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-emerald-400" />
                        {tLocalized(step, language)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Resources */}
              {project.resources && project.resources.length > 0 && (
                <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                  <h3 className="font-bold text-slate-300 mb-3 flex items-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    🔗 Recursos
                  </h3>
                  <div className="space-y-2">
                    {project.resources.map((resource, idx) => (
                      <a 
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
                      >
                        {resource.type === 'video' && <Play className="w-4 h-4" />}
                        {resource.type === 'article' && <FileText className="w-4 h-4" />}
                        {resource.type === 'docs' && <BookOpen className="w-4 h-4" />}
                        {tLocalized(resource.title, language)}
                        <ExternalLink className="w-3 h-3 ml-auto" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Mark Complete Button */}
              <button
                onClick={() => progress.toggleProject(project.id)}
                className={`
                  w-full px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-105
                  ${isCompleted 
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/25'
                  }
                `}
              >
                {isCompleted ? '✓ ' + t('projectDetail.projectCompleted') : '🚀 ' + t('projectDetail.markComplete')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      
      {/* Saurio - Floating AI Tutor */}
      {userEmail && project && (
        <AITutor
          exerciseTitle={tLocalized(project.title, language)}
          exerciseDescription={tLocalized(project.description, language)}
          userCode=""
          language="project"
          userEmail={userEmail}
          floating={true}
        />
      )}
      
      {/* CTA Banner - Only for non-logged-in users on free project */}
      {!userEmail && projectId === FREE_PROJECT_ID && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t border-emerald-500/30 shadow-2xl shadow-emerald-500/10" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-center sm:text-left">
              <p className="text-white font-semibold text-sm sm:text-base">
                {language === 'en' ? '🚀 Liked this project? There are 25+ more waiting for you' 
                  : language === 'pt' ? '🚀 Gostou deste projeto? Há mais de 25 te esperando' 
                  : '🚀 ¿Te gustó este proyecto? Hay 25+ más esperándote'}
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                {language === 'en' ? 'Plus roadmaps, 200+ exercises, AI tutor, datasets & Discord community' 
                  : language === 'pt' ? 'Mais roadmaps, 200+ exercícios, tutor IA, datasets e comunidade Discord' 
                  : 'Más roadmaps, 200+ ejercicios, tutor IA, datasets y comunidad Discord'}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => navigate('/auth')}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all text-sm whitespace-nowrap"
              >
                {language === 'en' ? 'Start Free' : language === 'pt' ? 'Começar Grátis' : 'Empezar Gratis'}
              </button>
              <button
                onClick={() => navigate('/suscripcion')}
                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium rounded-xl transition-colors text-sm whitespace-nowrap"
              >
                {language === 'en' ? 'See Plans' : language === 'pt' ? 'Ver Planos' : 'Ver Planes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Error Boundary Wrapper
class ProjectDetailErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">😅</div>
            <h1 className="text-2xl font-bold text-white mb-4">Algo salió mal</h1>
            <p className="text-slate-400 mb-6">
              Hubo un error al cargar el proyecto. Por favor, intentá de nuevo.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="block w-full px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Recargar página
              </button>
              <Link to="/members" className="block w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors">
                ← Volver a la plataforma
              </Link>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <pre className="mt-4 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-left text-xs text-red-300 overflow-auto">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const ProjectDetailWithErrorBoundary: React.FC = () => (
  <ProjectDetailErrorBoundary>
    <ProjectDetail />
  </ProjectDetailErrorBoundary>
);

export default ProjectDetailWithErrorBoundary;