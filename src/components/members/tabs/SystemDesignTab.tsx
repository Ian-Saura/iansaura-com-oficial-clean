import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle, 
  Circle, 
  Clock, 
  Target, 
  AlertTriangle,
  Lightbulb,
  MessageCircle,
  Code,
  // Database, // unused
  // Cloud, // unused
  Zap,
  Award,
  BookOpen,
  Play,
  RotateCcw,
  Eye,
  EyeOff,
  HelpCircle,
  Bot,
  ArrowRight,
  CheckSquare,
  Square,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { 
  SYSTEM_DESIGN_INTERVIEWS, 
  SystemDesignInterview
  // getSystemDesignsByDifficulty // unused
} from '../../../data/systemDesignInterviews';

interface SystemDesignTabProps {
  userEmail?: string;
  onAskAI?: (question: string, context: string) => void;
  onAddXP?: (xp: number, coins: number, reason: string) => void;
  onUnlockAchievement?: (achievementId: string) => void;
  achievements?: string[];
  isFreeUser?: boolean;
}

// FREE USER CONFIG: Only 1 System Design interview is free
const FREE_SYSTEM_DESIGN_IDS = ['sd-ecommerce-pipeline'];

// Simulated progress storage (in real app, would be in backend)
const getProgress = (interviewId: string): { completedSteps: string[], startedAt?: string, completed?: boolean } => {
  const saved = localStorage.getItem(`sd-progress-${interviewId}`);
  return saved ? JSON.parse(saved) : { completedSteps: [], completed: false };
};

const saveProgress = (interviewId: string, completedSteps: string[], startedAt?: string, completed?: boolean) => {
  localStorage.setItem(`sd-progress-${interviewId}`, JSON.stringify({ completedSteps, startedAt, completed }));
};

const getCompletedInterviews = (): string[] => {
  const saved = localStorage.getItem('sd-completed-interviews');
  return saved ? JSON.parse(saved) : [];
};

const saveCompletedInterviews = (interviews: string[]) => {
  localStorage.setItem('sd-completed-interviews', JSON.stringify(interviews));
};

export const SystemDesignTab: React.FC<SystemDesignTabProps> = ({ 
  userEmail, 
  onAskAI,
  onAddXP,
  onUnlockAchievement,
  achievements = [],
  isFreeUser = false
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, language } = useLanguage();
  const [selectedInterview, setSelectedInterview] = useState<SystemDesignInterview | null>(null);
  const [activeSection, setActiveSection] = useState<'overview' | 'problem' | 'questions' | 'solution' | 'tradeoffs' | 'tips'>('overview');
  
  // Check if an interview is free for free users
  const isInterviewFree = (interviewId: string): boolean => {
    if (!isFreeUser) return true;
    return FREE_SYSTEM_DESIGN_IDS.includes(interviewId);
  };
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSimulating, setIsSimulating] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [userNotes, setUserNotes] = useState<string>('');
  const [showTheory, setShowTheory] = useState<Record<string, boolean>>({});
  const [aiQuestion, setAiQuestion] = useState('');

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Load progress when interview changes
  useEffect(() => {
    if (selectedInterview) {
      const progress = getProgress(selectedInterview.id);
      setCompletedSteps(progress.completedSteps);
    }
  }, [selectedInterview]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleStep = (stepId: string) => {
    const newSteps = completedSteps.includes(stepId)
      ? completedSteps.filter(s => s !== stepId)
      : [...completedSteps, stepId];
    setCompletedSteps(newSteps);
    if (selectedInterview) {
      saveProgress(selectedInterview.id, newSteps);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'junior': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'mid': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'senior': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    const labels: Record<string, Record<string, string>> = {
      junior: { es: '🌱 Junior', en: '🌱 Junior', pt: '🌱 Junior' },
      mid: { es: '🚀 Mid-Level', en: '🚀 Mid-Level', pt: '🚀 Mid-Level' },
      senior: { es: '👑 Senior', en: '👑 Senior', pt: '👑 Senior' }
    };
    return labels[difficulty]?.[language] || difficulty;
  };

  // Build rich context for Saurio AI - INTERVIEWER MODE
  const buildAIContext = (interview: SystemDesignInterview) => {
    const problemText = interview.problem.en;
    
    // Build Q&A pairs for clarifying questions
    const clarifyingQA = interview.clarifyingQuestions.map(q => 
      `If user asks about "${q.question.en}" or similar, respond with: "${q.typicalAnswer.en}"`
    ).join('\n');
    
    // Build hints about common mistakes (what NOT to do)
    const mistakesList = interview.commonMistakes.map(m => m.en).join('\n- ');
    
    return `
🎭 YOU ARE THE INTERVIEWER - ROLEPLAY MODE
==========================================
You are conducting a System Design interview at a ${interview.company} company.
This is a ${interview.difficulty.toUpperCase()} level interview.

THE PROBLEM YOU PRESENTED:
${problemText}

YOUR ROLE:
- You are the interviewer, NOT a tutor
- Answer clarifying questions as an interviewer would (give information they need to design)
- Do NOT give away the solution or architecture
- Do NOT suggest technologies unless they ask
- Be realistic - a real interviewer wouldn't hand-hold

WHEN THE CANDIDATE ASKS CLARIFYING QUESTIONS:
${clarifyingQA}

For other clarifying questions, make up reasonable answers that fit a ${interview.company} context.

IF THEY ASK FOR HINTS OR HELP:
- Gently redirect: "What do you think would be a good approach?"
- Ask probing questions: "What are the main components you'd need?"
- You can say: "That's a reasonable direction, tell me more about how you'd implement it"

WHAT A GOOD CANDIDATE SHOULD DO (but don't tell them):
- Ask clarifying questions first
- Estimate scale/volume
- Draw high-level architecture
- Discuss trade-offs
- Components they should mention: ${interview.solution.map(s => s.components.join(', ')).join(', ')}

COMMON MISTAKES TO WATCH FOR:
- ${mistakesList}

Remember: You are simulating a REAL interview. Be professional, slightly challenging, but fair.
If they're completely stuck after trying, you can give a small nudge like "Have you considered how you'd handle [X]?"
`;
  };

  const handleAskAI = (interview: SystemDesignInterview) => {
    if (onAskAI && aiQuestion.trim()) {
      const context = buildAIContext(interview);
      onAskAI(aiQuestion, context);
      setAiQuestion('');
    }
  };

  // Interview List View
  if (!selectedInterview) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl p-6 border border-indigo-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
              <Target className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">System Design Interviews</h1>
              <p className="text-indigo-300">
                {language === 'es' ? 'Practica entrevistas reales de arquitectura de datos' :
                 language === 'pt' ? 'Pratique entrevistas reais de arquitetura de dados' :
                 'Practice real data architecture interviews'}
              </p>
            </div>
          </div>
          
          <div className="bg-black/20 rounded-xl p-4 mt-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-slate-300">
                <p className="font-medium text-amber-400 mb-1">
                  {language === 'es' ? '¿Por qué System Design?' :
                   language === 'pt' ? 'Por que System Design?' :
                   'Why System Design?'}
                </p>
                <p>
                  {language === 'es' 
                    ? 'Las entrevistas de System Design son el filtro más difícil para roles de Data Engineering Mid/Senior. No se trata de memorizar - se trata de pensar en voz alta, hacer las preguntas correctas, y demostrar que podés diseñar sistemas robustos.'
                    : language === 'pt'
                    ? 'As entrevistas de System Design são o filtro mais difícil para roles de Data Engineering Mid/Senior. Não se trata de memorizar - se trata de pensar em voz alta, fazer as perguntas certas, e demonstrar que você pode projetar sistemas robustos.'
                    : 'System Design interviews are the toughest filter for Mid/Senior Data Engineering roles. It\'s not about memorizing - it\'s about thinking out loud, asking the right questions, and showing you can design robust systems.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-white">{SYSTEM_DESIGN_INTERVIEWS.length}</div>
            <div className="text-slate-400 text-sm">
              {language === 'es' ? 'Entrevistas' : language === 'pt' ? 'Entrevistas' : 'Interviews'}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-amber-400">
              {SYSTEM_DESIGN_INTERVIEWS.reduce((sum, i) => sum + i.estimatedXP, 0)}
            </div>
            <div className="text-slate-400 text-sm">XP Total</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 text-center">
            <div className="text-3xl font-bold text-emerald-400">
              {SYSTEM_DESIGN_INTERVIEWS.reduce((sum, i) => sum + parseInt(i.duration), 0)} min
            </div>
            <div className="text-slate-400 text-sm">
              {language === 'es' ? 'Contenido' : language === 'pt' ? 'Conteúdo' : 'Content'}
            </div>
          </div>
        </div>

        {/* Interview Cards */}
        <div className="space-y-4">
          {SYSTEM_DESIGN_INTERVIEWS.map((interview, index) => {
            const progress = getProgress(interview.id);
            const totalSteps = interview.clarifyingQuestions.length + interview.solution.length + interview.tradeoffs.length;
            const completedCount = progress.completedSteps.length;
            const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
            const isFree = isInterviewFree(interview.id);
            const isLocked = !isFree;

            return (
              <div 
                key={interview.id}
                className={`bg-slate-800/50 rounded-xl border transition-all ${
                  isLocked 
                    ? 'border-slate-700/30 opacity-70 cursor-not-allowed' 
                    : 'border-slate-700/50 hover:border-indigo-500/50 cursor-pointer group'
                }`}
                onClick={() => !isLocked && setSelectedInterview(interview)}
              >
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-indigo-400">#{index + 1}</span>
                        <h3 className={`text-lg font-bold transition-colors ${isLocked ? 'text-slate-500' : 'text-white group-hover:text-indigo-400'}`}>
                          {interview.title[language as keyof typeof interview.title] || interview.title.en}
                        </h3>
                        {isLocked && (
                          <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs text-purple-400 font-medium flex items-center gap-1">
                            🔒 Premium
                          </span>
                        )}
                        {isFree && isFreeUser && (
                          <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs text-emerald-400 font-medium">
                            ✓ FREE
                          </span>
                        )}
                      </div>
                      
                      <p className="text-slate-400 text-sm mb-3">{interview.company}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(interview.difficulty)}`}>
                          {getDifficultyLabel(interview.difficulty)}
                        </span>
                        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-slate-700 text-slate-300">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {interview.duration}
                        </span>
                        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-amber-500/20 text-amber-400">
                          +{interview.estimatedXP} XP
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {interview.tags.slice(0, 5).map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded text-xs bg-slate-700/50 text-slate-400">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {progressPercent > 0 && (
                        <div className="text-right">
                          <div className="text-xs text-slate-400 mb-1">{progressPercent}%</div>
                          <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 transition-all"
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      )}
                      <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming Soon */}
        <div className="bg-slate-800/30 rounded-xl p-6 border border-dashed border-slate-700 text-center">
          <Sparkles className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <h3 className="text-slate-400 font-medium mb-1">
            {language === 'es' ? '¿Querés más entrevistas?' :
             language === 'pt' ? 'Quer mais entrevistas?' :
             'Want more interviews?'}
          </h3>
          <p className="text-slate-500 text-sm">
            {language === 'es' ? 'Pedilo en Discord y las agregamos pronto 🦖' :
             language === 'pt' ? 'Peça no Discord e adicionamos em breve 🦖' :
             'Request them on Discord and we\'ll add them soon 🦖'}
          </p>
        </div>
      </div>
    );
  }

  // Interview Detail View
  const interview = selectedInterview;
  const lang = language as keyof typeof interview.title;

  const totalSteps = interview.clarifyingQuestions.length + interview.solution.length + interview.tradeoffs.length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps.length / totalSteps) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Back Button & Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            setSelectedInterview(null);
            setIsSimulating(false);
            setTimerActive(false);
            setTimer(0);
            setActiveSection('overview');
          }}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          {language === 'es' ? 'Volver a la lista' : language === 'pt' ? 'Voltar à lista' : 'Back to list'}
        </button>

        {/* Timer */}
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 rounded-lg font-mono text-lg ${timerActive ? 'bg-red-500/20 text-red-400' : 'bg-slate-800 text-slate-400'}`}>
            {formatTime(timer)}
          </div>
          <button
            onClick={() => setTimerActive(!timerActive)}
            className={`p-2 rounded-lg transition-colors ${timerActive ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-400 hover:text-white'}`}
          >
            {timerActive ? <Circle className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={() => { setTimer(0); setTimerActive(false); }}
            className="p-2 rounded-lg bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Interview Header */}
      <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl p-6 border border-slate-700/50">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              {interview.title[lang] || interview.title.en}
            </h1>
            <p className="text-slate-400">{interview.company}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(interview.difficulty)}`}>
              {getDifficultyLabel(interview.difficulty)}
            </span>
            <span className="text-amber-400 font-medium">+{interview.estimatedXP} XP</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-400">
              {language === 'es' ? 'Progreso' : language === 'pt' ? 'Progresso' : 'Progress'}
            </span>
            <span className="text-white font-medium">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {interview.tags.map(tag => (
            <span key={tag} className="px-2 py-1 rounded text-xs bg-slate-700/50 text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', icon: BookOpen, label: { es: 'Resumen', en: 'Overview', pt: 'Resumo' } },
          { id: 'problem', icon: Target, label: { es: 'Problema', en: 'Problem', pt: 'Problema' } },
          { id: 'questions', icon: HelpCircle, label: { es: 'Preguntas', en: 'Questions', pt: 'Perguntas' } },
          { id: 'solution', icon: Code, label: { es: 'Solución', en: 'Solution', pt: 'Solução' } },
          { id: 'tradeoffs', icon: Zap, label: { es: 'Trade-offs', en: 'Trade-offs', pt: 'Trade-offs' } },
          { id: 'tips', icon: Lightbulb, label: { es: 'Tips', en: 'Tips', pt: 'Dicas' } },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as typeof activeSection)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              activeSection === tab.id
                ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label[lang] || tab.label.en}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="bg-slate-800/30 rounded-xl border border-slate-700/50">
        
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                {language === 'es' ? '¿Cómo usar esta entrevista?' : 
                 language === 'pt' ? 'Como usar esta entrevista?' : 
                 'How to use this interview?'}
              </h2>
              
              <div className="grid gap-4">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {language === 'es' ? 'Lee el problema' : language === 'pt' ? 'Leia o problema' : 'Read the problem'}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {language === 'es' 
                          ? 'Imaginá que estás en la entrevista. El entrevistador te acaba de dar este problema.'
                          : language === 'pt'
                          ? 'Imagine que você está na entrevista. O entrevistador acabou de te dar este problema.'
                          : 'Imagine you\'re in the interview. The interviewer just gave you this problem.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-400 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {language === 'es' ? 'Intentá resolverlo vos primero' : 
                         language === 'pt' ? 'Tente resolvê-lo você primeiro' : 
                         'Try to solve it yourself first'}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {language === 'es' 
                          ? 'Usá el timer de 45 minutos. Anotá tus ideas. DESPUÉS mirá la solución.'
                          : language === 'pt'
                          ? 'Use o timer de 45 minutos. Anote suas ideias. DEPOIS veja a solução.'
                          : 'Use the 45-minute timer. Write down your ideas. THEN look at the solution.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-indigo-400 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {language === 'es' ? 'Compará con la solución' : 
                         language === 'pt' ? 'Compare com a solução' : 
                         'Compare with the solution'}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {language === 'es' 
                          ? '¿Te olvidaste de preguntar requisitos? ¿Pensaste en los trade-offs? Aprendé de las diferencias.'
                          : language === 'pt'
                          ? 'Esqueceu de perguntar requisitos? Pensou nos trade-offs? Aprenda com as diferenças.'
                          : 'Did you forget to ask requirements? Did you think about trade-offs? Learn from the differences.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-400 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">
                        {language === 'es' ? '🦖 Saurio = Tu entrevistador' : 
                         language === 'pt' ? '🦖 Saurio = Seu entrevistador' : 
                         '🦖 Saurio = Your interviewer'}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {language === 'es' 
                          ? 'Hacele preguntas clarificadoras como en una entrevista real: "¿De dónde vienen los datos?", "¿Cuántos usuarios hay?". Saurio responde como el entrevistador.'
                          : language === 'pt'
                          ? 'Faça perguntas clarificadoras como em uma entrevista real: "De onde vêm os dados?", "Quantos usuários há?". Saurio responde como o entrevistador.'
                          : 'Ask clarifying questions like in a real interview: "Where does the data come from?", "How many users?". Saurio responds as the interviewer.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Button */}
            <button
              onClick={() => {
                setActiveSection('problem');
                setTimerActive(true);
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-5 h-5" />
              {language === 'es' ? 'Empezar Entrevista (45 min)' : 
               language === 'pt' ? 'Começar Entrevista (45 min)' : 
               'Start Interview (45 min)'}
            </button>

            {/* Requirements Summary */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-900/50 rounded-xl p-4 border border-emerald-500/20">
                <h3 className="text-emerald-400 font-medium mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {language === 'es' ? 'Requisitos Funcionales' : 
                   language === 'pt' ? 'Requisitos Funcionais' : 
                   'Functional Requirements'}
                </h3>
                <ul className="space-y-2">
                  {interview.requirements.functional.map((req, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      {req[lang] || req.en}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-4 border border-amber-500/20">
                <h3 className="text-amber-400 font-medium mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {language === 'es' ? 'Requisitos No-Funcionales' : 
                   language === 'pt' ? 'Requisitos Não-Funcionais' : 
                   'Non-Functional Requirements'}
                </h3>
                <ul className="space-y-2">
                  {interview.requirements.nonFunctional.map((req, i) => (
                    <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      {req[lang] || req.en}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Problem Section */}
        {activeSection === 'problem' && (
          <div className="p-6 space-y-6">
            <div className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-500/30">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-white">
                  {language === 'es' ? 'El Problema' : language === 'pt' ? 'O Problema' : 'The Problem'}
                </h2>
              </div>
              <div className="text-slate-200 whitespace-pre-line leading-relaxed">
                {interview.problem[lang] || interview.problem.en}
              </div>
            </div>

            {/* Theory Box */}
            <div className="bg-amber-500/10 rounded-xl p-5 border border-amber-500/30">
              <button
                onClick={() => setShowTheory(prev => ({ ...prev, problem: !prev.problem }))}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <h3 className="text-amber-400 font-medium">
                    {language === 'es' ? '📚 Teoría: ¿Cómo arrancar una System Design?' : 
                     language === 'pt' ? '📚 Teoria: Como começar uma System Design?' : 
                     '📚 Theory: How to start a System Design?'}
                  </h3>
                </div>
                {showTheory.problem ? <ChevronDown className="w-5 h-5 text-amber-400" /> : <ChevronRight className="w-5 h-5 text-amber-400" />}
              </button>
              
              {showTheory.problem && (
                <div className="mt-4 text-slate-300 text-sm space-y-3">
                  <p>
                    {language === 'es' 
                      ? '🎯 Los primeros 5 minutos son CRÍTICOS. No te lances a dibujar soluciones.'
                      : language === 'pt'
                      ? '🎯 Os primeiros 5 minutos são CRÍTICOS. Não se lance a desenhar soluções.'
                      : '🎯 The first 5 minutes are CRITICAL. Don\'t jump to drawing solutions.'}
                  </p>
                  <div className="bg-black/20 rounded-lg p-3 font-mono text-xs">
                    <p className="text-emerald-400 mb-2">
                      {language === 'es' ? '// Estructura de los primeros 5 minutos:' : 
                       language === 'pt' ? '// Estrutura dos primeiros 5 minutos:' : 
                       '// Structure of the first 5 minutes:'}
                    </p>
                    <p>1. {language === 'es' ? 'Repetí el problema para confirmar que entendiste' : 
                           language === 'pt' ? 'Repita o problema para confirmar que entendeu' : 
                           'Repeat the problem to confirm you understood'}</p>
                    <p>2. {language === 'es' ? 'Preguntá sobre USUARIOS (¿cuántos? ¿dónde?)' : 
                           language === 'pt' ? 'Pergunte sobre USUÁRIOS (quantos? onde?)' : 
                           'Ask about USERS (how many? where?)'}</p>
                    <p>3. {language === 'es' ? 'Preguntá sobre VOLUMEN (¿cuántos datos?)' : 
                           language === 'pt' ? 'Pergunte sobre VOLUME (quantos dados?)' : 
                           'Ask about VOLUME (how much data?)'}</p>
                    <p>4. {language === 'es' ? 'Preguntá sobre LATENCIA (¿real-time o batch?)' : 
                           language === 'pt' ? 'Pergunte sobre LATÊNCIA (real-time ou batch?)' : 
                           'Ask about LATENCY (real-time or batch?)'}</p>
                    <p>5. {language === 'es' ? 'Preguntá sobre RESTRICCIONES (budget, equipo)' : 
                           language === 'pt' ? 'Pergunte sobre RESTRIÇÕES (budget, equipe)' : 
                           'Ask about CONSTRAINTS (budget, team)'}</p>
                  </div>
                  <p className="text-amber-400">
                    {language === 'es' 
                      ? '💡 Un buen candidato hace preguntas. Un mal candidato asume todo.'
                      : language === 'pt'
                      ? '💡 Um bom candidato faz perguntas. Um mau candidato assume tudo.'
                      : '💡 A good candidate asks questions. A bad candidate assumes everything.'}
                  </p>
                </div>
              )}
            </div>

            {/* Notes Area */}
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-slate-400" />
                {language === 'es' ? 'Tus notas (intentá resolver antes de ver la solución)' : 
                 language === 'pt' ? 'Suas notas (tente resolver antes de ver a solução)' : 
                 'Your notes (try to solve before seeing the solution)'}
              </h3>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder={language === 'es' 
                  ? '¿Qué preguntas harías? ¿Qué componentes usarías? ¿Qué trade-offs ves?'
                  : language === 'pt'
                  ? 'Que perguntas faria? Que componentes usaria? Que trade-offs vê?'
                  : 'What questions would you ask? What components would you use? What trade-offs do you see?'}
                className="w-full h-40 bg-black/30 border border-slate-700 rounded-lg p-3 text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* AI Interviewer */}
            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <h3 className="text-purple-400 font-medium">
                  {language === 'es' ? '🦖 Saurio (Entrevistador)' :
                   language === 'pt' ? '🦖 Saurio (Entrevistador)' :
                   '🦖 Saurio (Interviewer)'}
                </h3>
              </div>
              <p className="text-slate-400 text-sm mb-2">
                {language === 'es' 
                  ? 'Haceme preguntas clarificadoras como en una entrevista real:'
                  : language === 'pt'
                  ? 'Me faça perguntas clarificadoras como em uma entrevista real:'
                  : 'Ask me clarifying questions like in a real interview:'}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {[
                  { es: '¿De dónde vienen los datos?', en: 'Where does the data come from?', pt: 'De onde vêm os dados?' },
                  { es: '¿Cuántos usuarios hay?', en: 'How many users?', pt: 'Quantos usuários?' },
                  { es: '¿Cuál es el SLA?', en: 'What\'s the SLA?', pt: 'Qual é o SLA?' },
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setAiQuestion(q[language as keyof typeof q] || q.en)}
                    className="text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-2 py-1 rounded transition-colors"
                  >
                    {q[language as keyof typeof q] || q.en}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder={language === 'es' 
                    ? 'Ej: ¿Cuántos registros procesan por día?'
                    : language === 'pt'
                    ? 'Ex: Quantos registros processam por dia?'
                    : 'E.g.: How many records per day?'}
                  className="flex-1 bg-black/30 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleAskAI(interview)}
                />
                <button
                  onClick={() => handleAskAI(interview)}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 px-4 py-2 rounded-lg transition-colors"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-slate-500 text-xs mt-2 italic">
                {language === 'es' 
                  ? '💡 En entrevistas reales, SIEMPRE hacé preguntas antes de diseñar'
                  : language === 'pt'
                  ? '💡 Em entrevistas reais, SEMPRE faça perguntas antes de projetar'
                  : '💡 In real interviews, ALWAYS ask questions before designing'}
              </p>
            </div>

            <button
              onClick={() => setActiveSection('questions')}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {language === 'es' ? 'Ver Preguntas Clarificadoras →' : 
               language === 'pt' ? 'Ver Perguntas Clarificadoras →' : 
               'See Clarifying Questions →'}
            </button>
          </div>
        )}

        {/* Clarifying Questions Section */}
        {activeSection === 'questions' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">
                {language === 'es' ? 'Preguntas Clarificadoras' : 
                 language === 'pt' ? 'Perguntas Clarificadoras' : 
                 'Clarifying Questions'}
              </h2>
            </div>

            <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/30 mb-6">
              <p className="text-emerald-400 text-sm">
                {language === 'es' 
                  ? '💡 SIEMPRE hacé estas preguntas antes de diseñar. Un entrevistador espera que las hagas.'
                  : language === 'pt'
                  ? '💡 SEMPRE faça estas perguntas antes de projetar. Um entrevistador espera que você as faça.'
                  : '💡 ALWAYS ask these questions before designing. An interviewer expects you to ask them.'}
              </p>
            </div>

            {interview.clarifyingQuestions.map((q, index) => {
              const stepId = `q-${index}`;
              const isCompleted = completedSteps.includes(stepId);
              const showAnswer = showAnswers[stepId];
              const showHint = showHints[stepId];

              return (
                <div key={index} className="bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleStep(stepId)}
                        className="mt-1 flex-shrink-0"
                      >
                        {isCompleted 
                          ? <CheckSquare className="w-5 h-5 text-emerald-400" />
                          : <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                        }
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-indigo-400 font-medium">Q{index + 1}</span>
                          <h3 className="text-white font-medium">
                            {q.question[lang] || q.question.en}
                          </h3>
                        </div>

                        {/* Why Ask Button */}
                        <button
                          onClick={() => setShowHints(prev => ({ ...prev, [stepId]: !prev[stepId] }))}
                          className="text-amber-400 text-sm flex items-center gap-1 mb-2 hover:text-amber-300"
                        >
                          {showHint ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          {language === 'es' ? '¿Por qué preguntar esto?' : 
                           language === 'pt' ? 'Por que perguntar isso?' : 
                           'Why ask this?'}
                        </button>

                        {showHint && (
                          <div className="bg-amber-500/10 rounded-lg p-3 mb-3 border border-amber-500/20">
                            <p className="text-amber-300 text-sm">
                              {q.whyAsk[lang] || q.whyAsk.en}
                            </p>
                          </div>
                        )}

                        {/* Typical Answer Button */}
                        <button
                          onClick={() => setShowAnswers(prev => ({ ...prev, [stepId]: !prev[stepId] }))}
                          className="text-emerald-400 text-sm flex items-center gap-1 hover:text-emerald-300"
                        >
                          {showAnswer ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          {language === 'es' ? 'Ver respuesta típica' : 
                           language === 'pt' ? 'Ver resposta típica' : 
                           'See typical answer'}
                        </button>

                        {showAnswer && (
                          <div className="bg-emerald-500/10 rounded-lg p-3 mt-2 border border-emerald-500/20">
                            <p className="text-emerald-300 text-sm">
                              <span className="font-medium">
                                {language === 'es' ? 'Entrevistador: ' : 
                                 language === 'pt' ? 'Entrevistador: ' : 
                                 'Interviewer: '}
                              </span>
                              "{q.typicalAnswer[lang] || q.typicalAnswer.en}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setActiveSection('solution')}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors mt-6"
            >
              {language === 'es' ? 'Ver Solución Paso a Paso →' : 
               language === 'pt' ? 'Ver Solução Passo a Passo →' : 
               'See Step-by-Step Solution →'}
            </button>
          </div>
        )}

        {/* Solution Section */}
        {activeSection === 'solution' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">
                {language === 'es' ? 'Solución Paso a Paso' : 
                 language === 'pt' ? 'Solução Passo a Passo' : 
                 'Step-by-Step Solution'}
              </h2>
            </div>

            {interview.solution.map((step, index) => {
              const stepId = `s-${index}`;
              const isCompleted = completedSteps.includes(stepId);
              const showDetails = showAnswers[stepId];

              return (
                <div key={index} className="bg-slate-900/50 rounded-xl border border-slate-700/50 overflow-hidden">
                  <button
                    onClick={() => setShowAnswers(prev => ({ ...prev, [stepId]: !prev[stepId] }))}
                    className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isCompleted ? 'bg-emerald-500/20' : 'bg-indigo-500/20'
                      }`}>
                        <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-indigo-400'}`}>
                          {step.step}
                        </span>
                      </div>
                      <h3 className="text-white font-medium text-left">
                        {step.title[lang] || step.title.en}
                      </h3>
                    </div>
                    {showDetails ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                  </button>

                  {showDetails && (
                    <div className="px-4 pb-4 space-y-4">
                      {/* Description */}
                      <div className="bg-black/30 rounded-lg p-4">
                        <p className="text-slate-300 text-sm whitespace-pre-line">
                          {step.description[lang] || step.description.en}
                        </p>
                      </div>

                      {/* Components */}
                      <div className="flex flex-wrap gap-2">
                        <span className="text-slate-400 text-sm">
                          {language === 'es' ? 'Componentes:' : 
                           language === 'pt' ? 'Componentes:' : 
                           'Components:'}
                        </span>
                        {step.components.map(comp => (
                          <span key={comp} className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-400 text-xs">
                            {comp}
                          </span>
                        ))}
                      </div>

                      {/* Diagram */}
                      {step.diagram && (
                        <div className="bg-black/50 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-slate-300 text-xs font-mono whitespace-pre">
                            {step.diagram}
                          </pre>
                        </div>
                      )}

                      {/* Mark as complete */}
                      <button
                        onClick={() => toggleStep(stepId)}
                        className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                          isCompleted 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {isCompleted 
                          ? (language === 'es' ? '✓ Completado' : language === 'pt' ? '✓ Completado' : '✓ Completed')
                          : (language === 'es' ? 'Marcar como entendido' : language === 'pt' ? 'Marcar como entendido' : 'Mark as understood')
                        }
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => setActiveSection('tradeoffs')}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {language === 'es' ? 'Ver Trade-offs →' : 
               language === 'pt' ? 'Ver Trade-offs →' : 
               'See Trade-offs →'}
            </button>
          </div>
        )}

        {/* Trade-offs Section */}
        {activeSection === 'tradeoffs' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Trade-offs</h2>
            </div>

            <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30 mb-6">
              <p className="text-amber-400 text-sm">
                {language === 'es' 
                  ? '💡 Discutir trade-offs demuestra madurez técnica. Un junior dice "usemos Kafka". Un senior dice "Kafka vs Kinesis: depende de X, Y, Z".'
                  : language === 'pt'
                  ? '💡 Discutir trade-offs demonstra maturidade técnica. Um junior diz "usemos Kafka". Um senior diz "Kafka vs Kinesis: depende de X, Y, Z".'
                  : '💡 Discussing trade-offs shows technical maturity. A junior says "let\'s use Kafka". A senior says "Kafka vs Kinesis: depends on X, Y, Z".'}
              </p>
            </div>

            {interview.tradeoffs.map((tradeoff, index) => {
              const stepId = `t-${index}`;
              const isCompleted = completedSteps.includes(stepId);

              return (
                <div key={index} className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
                  <div className="flex items-start gap-3 mb-4">
                    <button
                      onClick={() => toggleStep(stepId)}
                      className="mt-1 flex-shrink-0"
                    >
                      {isCompleted 
                        ? <CheckSquare className="w-5 h-5 text-emerald-400" />
                        : <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                      }
                    </button>
                    <h3 className="text-white font-medium">
                      {tradeoff.decision[lang] || tradeoff.decision.en}
                    </h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/20">
                      <span className="text-blue-400 text-xs font-medium">
                        {language === 'es' ? 'Opción A' : language === 'pt' ? 'Opção A' : 'Option A'}
                      </span>
                      <p className="text-slate-300 text-sm mt-1">
                        {tradeoff.option1[lang] || tradeoff.option1.en}
                      </p>
                    </div>
                    <div className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                      <span className="text-purple-400 text-xs font-medium">
                        {language === 'es' ? 'Opción B' : language === 'pt' ? 'Opção B' : 'Option B'}
                      </span>
                      <p className="text-slate-300 text-sm mt-1">
                        {tradeoff.option2[lang] || tradeoff.option2.en}
                      </p>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                    <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      {language === 'es' ? 'Recomendación' : language === 'pt' ? 'Recomendação' : 'Recommendation'}
                    </span>
                    <p className="text-slate-300 text-sm mt-1">
                      {tradeoff.recommendation[lang] || tradeoff.recommendation.en}
                    </p>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setActiveSection('tips')}
              className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
            >
              {language === 'es' ? 'Ver Tips Finales →' : 
               language === 'pt' ? 'Ver Dicas Finais →' : 
               'See Final Tips →'}
            </button>
          </div>
        )}

        {/* Tips Section */}
        {activeSection === 'tips' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white">
                {language === 'es' ? 'Tips para la Entrevista' : 
                 language === 'pt' ? 'Dicas para a Entrevista' : 
                 'Interview Tips'}
              </h2>
            </div>

            {/* Interviewer Tips */}
            <div className="bg-emerald-500/10 rounded-xl p-5 border border-emerald-500/30">
              <h3 className="text-emerald-400 font-medium mb-4 flex items-center gap-2">
                <Award className="w-4 h-4" />
                {language === 'es' ? 'Cómo impresionar al entrevistador' : 
                 language === 'pt' ? 'Como impressionar o entrevistador' : 
                 'How to impress the interviewer'}
              </h3>
              <div className="space-y-3">
                {interview.interviewerTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-slate-300 text-sm">
                      {tip[lang] || tip.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-red-500/10 rounded-xl p-5 border border-red-500/30">
              <h3 className="text-red-400 font-medium mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {language === 'es' ? 'Errores comunes a evitar' : 
                 language === 'pt' ? 'Erros comuns a evitar' : 
                 'Common mistakes to avoid'}
              </h3>
              <div className="space-y-3">
                {interview.commonMistakes.map((mistake, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-red-400 flex-shrink-0">✗</span>
                    <p className="text-slate-300 text-sm">
                      {mistake[lang] || mistake.en}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Topics */}
            <div className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50">
              <h3 className="text-slate-300 font-medium mb-3">
                {language === 'es' ? 'Temas relacionados para estudiar' : 
                 language === 'pt' ? 'Temas relacionados para estudar' : 
                 'Related topics to study'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {interview.relatedTopics.map(topic => (
                  <span key={topic} className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Completion */}
            {progressPercent === 100 ? (
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl p-6 border border-emerald-500/30 text-center">
                <Award className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">
                  {language === 'es' ? '🎉 ¡Entrevista Completada!' : 
                   language === 'pt' ? '🎉 Entrevista Completa!' : 
                   '🎉 Interview Completed!'}
                </h3>
                <p className="text-emerald-300 mb-4">
                  {language === 'es' 
                    ? `Ganaste ${interview.estimatedXP} XP. ¡Seguí practicando con más entrevistas!`
                    : language === 'pt'
                    ? `Ganhou ${interview.estimatedXP} XP. Continue praticando com mais entrevistas!`
                    : `You earned ${interview.estimatedXP} XP. Keep practicing with more interviews!`}
                </p>
                <button
                  onClick={() => {
                    // Mark interview as completed and award XP/achievements
                    const completedInterviews = getCompletedInterviews();
                    if (!completedInterviews.includes(interview.id)) {
                      const newCompleted = [...completedInterviews, interview.id];
                      saveCompletedInterviews(newCompleted);
                      saveProgress(interview.id, completedSteps, undefined, true);
                      
                      // Award XP
                      if (onAddXP) {
                        onAddXP(interview.estimatedXP, Math.floor(interview.estimatedXP / 10), `System Design: ${interview.title.en}`);
                      }
                      
                      // Check for achievements
                      if (onUnlockAchievement) {
                        // First System Design
                        if (newCompleted.length === 1 && !achievements.includes('first_system_design')) {
                          onUnlockAchievement('first_system_design');
                        }
                        // Three System Designs
                        if (newCompleted.length === 3 && !achievements.includes('three_system_designs')) {
                          onUnlockAchievement('three_system_designs');
                        }
                        // All System Designs
                        if (newCompleted.length >= SYSTEM_DESIGN_INTERVIEWS.length && !achievements.includes('all_system_designs')) {
                          onUnlockAchievement('all_system_designs');
                        }
                      }
                    }
                    
                    setSelectedInterview(null);
                    setActiveSection('overview');
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {language === 'es' ? '¡Reclamar XP y continuar!' : 
                   language === 'pt' ? 'Reivindicar XP e continuar!' : 
                   'Claim XP and continue!'}
                </button>
              </div>
            ) : (
              <div className="bg-indigo-500/10 rounded-xl p-5 border border-indigo-500/30 text-center">
                <p className="text-indigo-300 mb-3">
                  {language === 'es' 
                    ? `Progreso: ${progressPercent}% completado`
                    : language === 'pt'
                    ? `Progresso: ${progressPercent}% completo`
                    : `Progress: ${progressPercent}% complete`}
                </p>
                <p className="text-slate-400 text-sm">
                  {language === 'es' 
                    ? 'Marcá todos los pasos como completados para ganar XP'
                    : language === 'pt'
                    ? 'Marque todos os passos como completos para ganhar XP'
                    : 'Mark all steps as complete to earn XP'}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemDesignTab;


