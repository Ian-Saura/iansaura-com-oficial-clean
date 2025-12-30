import React, { useState, useEffect, useCallback } from 'react';
import { 
  Layers, 
  Users, 
  Target,
  CheckCircle,
  Circle,
  Clock,
  // Award, // unused
  ChevronRight,
  ChevronDown,
  Play,
  RotateCcw,
  Eye,
  // EyeOff, // unused
  AlertTriangle,
  AlertCircle,
  Lightbulb,
  Bot,
  ArrowRight,
  Sparkles,
  Brain,
  MessageSquare,
  Timer,
  Trophy,
  TrendingUp,
  BookOpen,
  Zap,
  Code,
  Crown,
  Lock
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { SystemDesignTab } from './SystemDesignTab';
import { 
  BEHAVIORAL_QUESTIONS, 
  BEHAVIORAL_CATEGORIES, 
  BehavioralQuestion,
  getBehavioralByCategory,
  BEHAVIORAL_STATS
} from '../../../data/behavioralInterviews';
import {
  // ASSESSMENT_QUESTIONS, // unused
  SKILL_AREAS,
  AssessmentQuestion,
  AssessmentResult,
  generateAssessment,
  calculateAssessmentResult,
  ASSESSMENT_STATS
} from '../../../data/skillAssessment';

type InterviewSection = 'overview' | 'system-design' | 'behavioral' | 'assessment' | 'mock-interview';

// Mock Interview types
interface MockInterviewQuestion {
  type: 'behavioral' | 'system-design' | 'technical' | 'negotiation';
  question: BehavioralQuestion | { id: string; title: LocalizedContent; description: LocalizedContent; tips?: LocalizedContent };
  userAnswer: string;
  aiFeedback?: string;
  score?: number; // 1-5
}

// Technical scenario questions for mock interview
const TECHNICAL_SCENARIOS: { id: string; title: LocalizedContent; description: LocalizedContent; tips: LocalizedContent }[] = [
  {
    id: 'tech-1',
    title: { es: 'Debugging en Producción', en: 'Production Debugging', pt: 'Debugging em Produção' },
    description: { 
      es: 'Tu pipeline de datos falló a las 3am y el dashboard ejecutivo no tiene datos actualizados. ¿Cómo lo debuggearías?',
      en: 'Your data pipeline failed at 3am and the executive dashboard has no updated data. How would you debug it?',
      pt: 'Seu pipeline de dados falhou às 3h da manhã e o dashboard executivo não tem dados atualizados. Como você debugaria?'
    },
    tips: {
      es: 'Menciona: logs, alertas, rollback, comunicación con stakeholders, root cause analysis, postmortem',
      en: 'Mention: logs, alerts, rollback, stakeholder communication, root cause analysis, postmortem',
      pt: 'Mencione: logs, alertas, rollback, comunicação com stakeholders, root cause analysis, postmortem'
    }
  },
  {
    id: 'tech-2',
    title: { es: 'Optimización de Query', en: 'Query Optimization', pt: 'Otimização de Query' },
    description: {
      es: 'Una query que alimenta un dashboard tarda 15 minutos. Los usuarios se quejan. ¿Cómo la optimizarías?',
      en: 'A query that feeds a dashboard takes 15 minutes. Users are complaining. How would you optimize it?',
      pt: 'Uma query que alimenta um dashboard demora 15 minutos. Os usuários estão reclamando. Como você otimizaria?'
    },
    tips: {
      es: 'Menciona: EXPLAIN plan, índices, particiones, materializar vistas, caching, denormalización',
      en: 'Mention: EXPLAIN plan, indexes, partitions, materialized views, caching, denormalization',
      pt: 'Mencione: EXPLAIN plan, índices, partições, views materializadas, caching, denormalização'
    }
  },
  {
    id: 'tech-3',
    title: { es: 'Data Quality Issue', en: 'Data Quality Issue', pt: 'Problema de Data Quality' },
    description: {
      es: 'Finance reporta que los números de revenue del mes pasado no cuadran con el sistema fuente. ¿Cómo investigarías?',
      en: 'Finance reports that last month\'s revenue numbers don\'t match the source system. How would you investigate?',
      pt: 'Finance reporta que os números de receita do mês passado não batem com o sistema fonte. Como você investigaria?'
    },
    tips: {
      es: 'Menciona: reconciliación, data lineage, tests de calidad, validaciones, comunicación',
      en: 'Mention: reconciliation, data lineage, quality tests, validations, communication',
      pt: 'Mencione: reconciliação, data lineage, testes de qualidade, validações, comunicação'
    }
  }
];

type LocalizedContent = { es: string; en: string; pt: string };

interface MockInterviewScorecard {
  overallRating: 'strong-hire' | 'hire' | 'lean-hire' | 'lean-no-hire' | 'no-hire';
  scores: {
    communication: number;
    technicalDepth: number;
    problemSolving: number;
    leadership: number;
    starMethod: number;
  };
  strengths: string[];
  improvements: string[];
  recommendation: string;
}

interface InterviewPrepTabProps {
  userEmail?: string;
  onAskAI?: (question: string, context: string) => void;
  onAddXP?: (xp: number, coins: number, reason: string) => void;
  onUnlockAchievement?: (achievementId: string) => void;
  achievements?: string[];
  isFreeUser?: boolean;
}

// Local storage helpers
const getCompletedBehavioral = (): string[] => {
  const saved = localStorage.getItem('behavioral-completed');
  return saved ? JSON.parse(saved) : [];
};

const saveCompletedBehavioral = (completed: string[]) => {
  localStorage.setItem('behavioral-completed', JSON.stringify(completed));
};

const getAssessmentHistory = (): { date: string; result: AssessmentResult }[] => {
  const saved = localStorage.getItem('assessment-history');
  return saved ? JSON.parse(saved) : [];
};

const saveAssessmentResult = (result: AssessmentResult) => {
  const history = getAssessmentHistory();
  history.push({ date: new Date().toISOString(), result });
  localStorage.setItem('assessment-history', JSON.stringify(history.slice(-10))); // Keep last 10
};

export const InterviewPrepTab: React.FC<InterviewPrepTabProps> = ({
  isFreeUser = false,
  userEmail,
  onAskAI,
  onAddXP,
  onUnlockAchievement,
  achievements = []
}) => {
  const { tLocalized: t, language } = useLanguage();
  const [activeSection, setActiveSection] = useState<InterviewSection>('overview');
  
  // FREE USER CONFIG: Only 2 Behavioral questions are free
  const FREE_BEHAVIORAL_IDS = ['bq-conflict-1', 'bq-success-1'];
  const isBehavioralFree = (questionId: string): boolean => {
    if (!isFreeUser) return true;
    return FREE_BEHAVIORAL_IDS.includes(questionId);
  };
  
  // Behavioral state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<BehavioralQuestion | null>(null);
  const [completedBehavioral, setCompletedBehavioral] = useState<string[]>([]);
  const [showSTAR, setShowSTAR] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  
  // Assessment state
  const [assessmentMode, setAssessmentMode] = useState<'idle' | 'in-progress' | 'results'>('idle');
  const [currentQuestions, setCurrentQuestions] = useState<AssessmentQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; selectedOptionId: string; timeSpent: number }[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [assessmentTimer, setAssessmentTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Mock Interview state
  const [mockMode, setMockMode] = useState<'idle' | 'in-progress' | 'evaluation' | 'scorecard'>('idle');
  const [mockQuestions, setMockQuestions] = useState<MockInterviewQuestion[]>([]);
  const [mockCurrentIndex, setMockCurrentIndex] = useState(0);
  const [mockTimer, setMockTimer] = useState(45 * 60); // 45 minutes in seconds
  const [mockTimerActive, setMockTimerActive] = useState(false);
  const [mockCurrentAnswer, setMockCurrentAnswer] = useState('');
  const [mockScorecard, setMockScorecard] = useState<MockInterviewScorecard | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Load saved progress
  useEffect(() => {
    setCompletedBehavioral(getCompletedBehavioral());
  }, []);

  // Assessment timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive) {
      interval = setInterval(() => {
        setAssessmentTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  // Mock Interview timer (countdown)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mockTimerActive && mockTimer > 0) {
      interval = setInterval(() => {
        setMockTimer(prev => {
          if (prev <= 1) {
            setMockTimerActive(false);
            // Time's up - go to scorecard
            generateMockScorecard();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mockTimerActive, mockTimer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Behavioral functions
  const handleCompleteBehavioral = useCallback((questionId: string) => {
    const newCompleted = [...completedBehavioral, questionId];
    setCompletedBehavioral(newCompleted);
    saveCompletedBehavioral(newCompleted);
    
    if (onAddXP) {
      const question = BEHAVIORAL_QUESTIONS.find(q => q.id === questionId);
      onAddXP(question?.estimatedXP || 100, 50, `Behavioral: ${questionId}`);
    }
    
    // Check achievements
    if (onUnlockAchievement) {
      if (newCompleted.length === 1) onUnlockAchievement('behavioral_first');
      if (newCompleted.length >= 5) onUnlockAchievement('behavioral_5');
      if (newCompleted.length >= BEHAVIORAL_QUESTIONS.length) onUnlockAchievement('behavioral_all');
    }
  }, [completedBehavioral, onAddXP, onUnlockAchievement]);

  const buildBehavioralContext = (question: BehavioralQuestion, userCurrentAnswer?: string): string => {
    const hasAnswer = userCurrentAnswer && userCurrentAnswer.trim().length > 20;
    
    return `You are an expert interviewer practicing behavioral questions with a candidate preparing for Data Engineering interviews.

CURRENT QUESTION: "${question.question[language as 'es' | 'en' | 'pt']}"

WHY INTERVIEWERS ASK THIS:
${question.whyTheyAsk[language as 'es' | 'en' | 'pt']}

WHAT MAKES A GREAT ANSWER (STAR Method):
${question.whatTheyLookFor[language as 'es' | 'en' | 'pt'].map(w => `✓ ${w}`).join('\n')}

RED FLAGS TO AVOID:
${question.redFlags[language as 'es' | 'en' | 'pt'].map(r => `✗ ${r}`).join('\n')}

POSSIBLE FOLLOW-UP QUESTIONS:
${question.followUpQuestions[language as 'es' | 'en' | 'pt'].map(f => `• ${f}`).join('\n')}

${hasAnswer ? `
========================================
CANDIDATE'S ANSWER TO EVALUATE:
========================================
"${userCurrentAnswer}"
========================================

EVALUATE THEIR ANSWER:
1. Does it follow STAR structure? (Situation, Task, Action, Result)
2. Is it specific with metrics/results?
3. Does it show ownership and impact?
4. Any red flags present?
5. What's missing?
` : ''}

YOUR ROLE AS INTERVIEWER:
- Be encouraging but honest - real interviewers give direct feedback
- ${hasAnswer ? 'FIRST evaluate their answer above, then' : ''} guide them to improve
- Help them use STAR method: each part should be 1-2 sentences
- Push for SPECIFIC metrics: "increased by X%", "reduced from Y to Z"
- Ask follow-up questions like a real interviewer would
- If answer is vague, ask "Can you be more specific about...?"
- Don't give them the "perfect answer" - help them craft THEIR OWN story
- Respond in ${language === 'es' ? 'Spanish' : language === 'pt' ? 'Portuguese' : 'English'}`;
  };

  const handleAskBehavioralAI = () => {
    if (!selectedQuestion || !aiQuestion.trim() || !onAskAI) return;
    // Include user's answer in the context so Saurio can evaluate it
    const context = buildBehavioralContext(selectedQuestion, userAnswer);
    onAskAI(aiQuestion, context);
    setAiQuestion('');
  };

  // Assessment functions
  const startAssessment = () => {
    const questions = generateAssessment(15);
    setCurrentQuestions(questions);
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setAssessmentResult(null);
    setAssessmentMode('in-progress');
    setQuestionStartTime(Date.now());
    setAssessmentTimer(0);
    setTimerActive(true);
  };

  const handleAnswer = (optionId: string) => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    const newAnswers = [...answers, {
      questionId: currentQuestions[currentQuestionIndex].id,
      selectedOptionId: optionId,
      timeSpent
    }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    } else {
      // Finish assessment
      setTimerActive(false);
      const result = calculateAssessmentResult(newAnswers);
      setAssessmentResult(result);
      saveAssessmentResult(result);
      setAssessmentMode('results');
      
      if (onAddXP) {
        const xp = Math.round(result.percentage * 2);
        const coins = Math.round(result.percentage);
        onAddXP(xp, coins, 'Skill Assessment completed');
      }
      
      if (onUnlockAchievement) {
        if (result.percentage >= 80) onUnlockAchievement('assessment_80');
        if (result.percentage >= 90) onUnlockAchievement('assessment_90');
        if (result.readyToApply) onUnlockAchievement('ready_to_apply');
      }
    }
  };

  // ============ MOCK INTERVIEW FUNCTIONS ============
  
  // State for per-question AI feedback
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentFeedback, setCurrentFeedback] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const startMockInterview = () => {
    // Generate 7 questions: Mix of all types
    const questions: MockInterviewQuestion[] = [];
    
    // 2 Behavioral questions (random)
    const behavioralPool = [...BEHAVIORAL_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 2);
    behavioralPool.forEach(q => {
      questions.push({
        type: 'behavioral',
        question: q,
        userAnswer: ''
      });
    });
    
    // 1 Negotiation question (from salary category)
    const negotiationQ = BEHAVIORAL_QUESTIONS.filter(q => q.category === 'salary').sort(() => Math.random() - 0.5)[0];
    if (negotiationQ) {
      questions.push({
        type: 'negotiation',
        question: negotiationQ,
        userAnswer: ''
      });
    }
    
    // 2 Technical scenarios
    const techPool = [...TECHNICAL_SCENARIOS].sort(() => Math.random() - 0.5).slice(0, 2);
    techPool.forEach(q => {
      questions.push({
        type: 'technical',
        question: q,
        userAnswer: ''
      });
    });
    
    // 2 System Design questions (simplified prompts)
    const systemDesignPrompts = [
      { id: 'sd-mock-1', title: { es: 'System Design: Pipeline E-commerce', en: 'System Design: E-commerce Pipeline', pt: 'System Design: Pipeline E-commerce' }, description: { es: 'Diseñá un pipeline de datos para un e-commerce que procesa 10M de eventos de clickstream por día. ¿Qué tecnologías usarías y por qué?', en: 'Design a data pipeline for an e-commerce processing 10M clickstream events per day. What technologies would you use and why?', pt: 'Projete um pipeline de dados para um e-commerce que processa 10M de eventos de clickstream por dia. Quais tecnologias usaria e por quê?' }, tips: { es: 'Menciona: ingesta (Kafka/Kinesis), procesamiento (Spark/Flink), storage (S3/Delta Lake), serving (Snowflake/BigQuery)', en: 'Mention: ingestion (Kafka/Kinesis), processing (Spark/Flink), storage (S3/Delta Lake), serving (Snowflake/BigQuery)', pt: 'Mencione: ingestão (Kafka/Kinesis), processamento (Spark/Flink), storage (S3/Delta Lake), serving (Snowflake/BigQuery)' } },
      { id: 'sd-mock-2', title: { es: 'System Design: Real-time Analytics', en: 'System Design: Real-time Analytics', pt: 'System Design: Real-time Analytics' }, description: { es: 'Tu empresa necesita dashboards en tiempo real con latencia < 5 segundos. Actualmente usan batch diario. ¿Cómo migrarías?', en: 'Your company needs real-time dashboards with < 5 second latency. Currently using daily batch. How would you migrate?', pt: 'Sua empresa precisa de dashboards em tempo real com latência < 5 segundos. Atualmente usa batch diário. Como migraria?' }, tips: { es: 'Menciona: streaming vs batch, CDC, Kafka, materialized views, trade-offs', en: 'Mention: streaming vs batch, CDC, Kafka, materialized views, trade-offs', pt: 'Mencione: streaming vs batch, CDC, Kafka, materialized views, trade-offs' } },
      { id: 'sd-mock-3', title: { es: 'System Design: Data Warehouse', en: 'System Design: Data Warehouse', pt: 'System Design: Data Warehouse' }, description: { es: 'Diseñá el data warehouse para una fintech con datos de transacciones, usuarios y fraude. ¿Qué modelo usarías?', en: 'Design the data warehouse for a fintech with transaction, user, and fraud data. What model would you use?', pt: 'Projete o data warehouse para uma fintech com dados de transações, usuários e fraude. Qual modelo usaria?' }, tips: { es: 'Menciona: star schema vs snowflake, facts vs dimensions, slowly changing dimensions, partitioning', en: 'Mention: star schema vs snowflake, facts vs dimensions, slowly changing dimensions, partitioning', pt: 'Mencione: star schema vs snowflake, facts vs dimensions, slowly changing dimensions, partitioning' } },
    ];
    const sdPool = systemDesignPrompts.sort(() => Math.random() - 0.5).slice(0, 2);
    sdPool.forEach(q => {
      questions.push({
        type: 'system-design',
        question: q,
        userAnswer: ''
      });
    });
    
    // Shuffle all questions
    questions.sort(() => Math.random() - 0.5);
    
    setMockQuestions(questions);
    setMockCurrentIndex(0);
    setMockTimer(45 * 60); // 45 minutes
    setMockCurrentAnswer('');
    setMockScorecard(null);
    setMockMode('in-progress');
    setMockTimerActive(true);
    setCurrentFeedback('');
    setShowFeedback(false);
  };

  // Get AI feedback for current answer
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getMockFeedback = async () => {
    if (!mockCurrentAnswer.trim() || mockCurrentAnswer.length < 30) return;
    
    setIsLoadingFeedback(true);
    const currentQ = mockQuestions[mockCurrentIndex];
    
    // Build context based on question type
    let questionText = '';
    let tips = '';
    
    if (currentQ.type === 'behavioral' || currentQ.type === 'negotiation') {
      const bq = currentQ.question as BehavioralQuestion;
      questionText = bq.question[language as 'es' | 'en' | 'pt'];
      tips = bq.whatTheyLookFor[language as 'es' | 'en' | 'pt'].join(', ');
    } else {
      const sq = currentQ.question as { title: LocalizedContent; description: LocalizedContent; tips?: LocalizedContent };
      questionText = sq.description[language as 'es' | 'en' | 'pt'];
      tips = sq.tips?.[language as 'es' | 'en' | 'pt'] || '';
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const feedbackPrompt = language === 'es' 
      ? `Sos un entrevistador Senior de Data Engineering evaluando esta respuesta.

PREGUNTA: "${questionText}"
TIPO: ${currentQ.type === 'behavioral' ? 'Behavioral (usa método STAR)' : currentQ.type === 'system-design' ? 'System Design' : currentQ.type === 'negotiation' ? 'Negociación Salarial' : 'Técnica/Scenario'}

RESPUESTA DEL CANDIDATO:
"${mockCurrentAnswer}"

CRITERIOS DE EVALUACIÓN:
${tips}

Dá feedback constructivo y específico en 3-4 oraciones:
1. Qué estuvo bien
2. Qué podría mejorar
3. Tip concreto para la próxima vez

Sé directo pero motivador. Formato: bullet points cortos.`
      : `You are a Senior Data Engineering interviewer evaluating this answer.

QUESTION: "${questionText}"
TYPE: ${currentQ.type === 'behavioral' ? 'Behavioral (use STAR method)' : currentQ.type === 'system-design' ? 'System Design' : currentQ.type === 'negotiation' ? 'Salary Negotiation' : 'Technical/Scenario'}

CANDIDATE'S ANSWER:
"${mockCurrentAnswer}"

EVALUATION CRITERIA:
${tips}

Give constructive and specific feedback in 3-4 sentences:
1. What was good
2. What could improve
3. Concrete tip for next time

Be direct but motivating. Format: short bullet points.`;

    // Call the AI (using the onAskAI prop indirectly through context)
    try {
      // Simulate AI response for now - in production this would call the actual AI
      const mockFeedback = generateLocalFeedback(currentQ, mockCurrentAnswer, language);
      setCurrentFeedback(mockFeedback);
      setShowFeedback(true);
      
      // Save feedback to question
      const updatedQuestions = [...mockQuestions];
      updatedQuestions[mockCurrentIndex].aiFeedback = mockFeedback;
      setMockQuestions(updatedQuestions);
    } catch (error) {
      setCurrentFeedback(language === 'es' ? 'No se pudo generar feedback. Continúa con la siguiente pregunta.' : 'Could not generate feedback. Continue to next question.');
      setShowFeedback(true);
    }
    
    setIsLoadingFeedback(false);
  };
  
  // Generate local feedback based on heuristics (fallback)
  const generateLocalFeedback = (q: MockInterviewQuestion, answer: string, lang: string): string => {
    const answerLower = answer.toLowerCase();
    const len = answer.length;
    const feedback: string[] = [];
    
    // Check for STAR elements
    const hasSituation = answerLower.includes('situation') || answerLower.includes('situación') || answerLower.includes('contexto') || answerLower.includes('cuando');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hasTask = answerLower.includes('task') || answerLower.includes('tarea') || answerLower.includes('responsabilidad') || answerLower.includes('objetivo');
    const hasAction = answerLower.includes('action') || answerLower.includes('acción') || answerLower.includes('hice') || answerLower.includes('implementé');
    const hasResult = answerLower.includes('result') || answerLower.includes('resultado') || answerLower.includes('logré') || answerLower.includes('%');
    
    // Check for metrics
    const hasMetrics = /\d+%|\d+x|\d+ (days|días|users|usuarios|hours|horas|rows|filas)/.test(answerLower);
    
    // Check for technical terms
    const techTerms = ['pipeline', 'sql', 'python', 'spark', 'kafka', 'airflow', 'data', 'etl', 'warehouse', 'lake'];
    const hasTechTerms = techTerms.some(t => answerLower.includes(t));
    
    if (lang === 'es') {
      // Positive feedback
      if (len > 200) feedback.push('✅ **Buena extensión** - Respuesta detallada');
      if (hasMetrics) feedback.push('✅ **Métricas concretas** - Los números dan credibilidad');
      if (hasTechTerms) feedback.push('✅ **Vocabulario técnico** - Demuestra conocimiento');
      if (hasSituation && hasAction) feedback.push('✅ **Estructura clara** - Se entiende el contexto y las acciones');
      
      // Improvement areas
      if (len < 150) feedback.push('⚠️ **Muy corta** - Elaborá más, una buena respuesta tiene 2-3 minutos hablando');
      if (!hasMetrics) feedback.push('⚠️ **Faltan métricas** - Agregá números específicos (%, tiempo, volumen)');
      if (q.type === 'behavioral' && !hasSituation) feedback.push('⚠️ **Falta contexto (S de STAR)** - Empezá describiendo la situación');
      if (q.type === 'behavioral' && !hasResult) feedback.push('⚠️ **Falta resultado (R de STAR)** - Terminá con el impacto medible');
      if (q.type === 'system-design' && !hasTechTerms) feedback.push('⚠️ **Pocas tecnologías mencionadas** - Nombrá herramientas específicas');
      
      // Tips
      if (feedback.length < 3) feedback.push('💡 **Tip**: Practicá respondiendo en voz alta y grabándote');
    } else {
      // Positive feedback
      if (len > 200) feedback.push('✅ **Good length** - Detailed answer');
      if (hasMetrics) feedback.push('✅ **Concrete metrics** - Numbers add credibility');
      if (hasTechTerms) feedback.push('✅ **Technical vocabulary** - Shows knowledge');
      if (hasSituation && hasAction) feedback.push('✅ **Clear structure** - Context and actions are understood');
      
      // Improvement areas
      if (len < 150) feedback.push('⚠️ **Too short** - Elaborate more, a good answer is 2-3 minutes speaking');
      if (!hasMetrics) feedback.push('⚠️ **Missing metrics** - Add specific numbers (%, time, volume)');
      if (q.type === 'behavioral' && !hasSituation) feedback.push('⚠️ **Missing context (S in STAR)** - Start by describing the situation');
      if (q.type === 'behavioral' && !hasResult) feedback.push('⚠️ **Missing result (R in STAR)** - End with measurable impact');
      if (q.type === 'system-design' && !hasTechTerms) feedback.push('⚠️ **Few technologies mentioned** - Name specific tools');
      
      // Tips
      if (feedback.length < 3) feedback.push('💡 **Tip**: Practice answering out loud and recording yourself');
    }
    
    return feedback.slice(0, 4).join('\n');
  };

  const handleMockNextQuestion = () => {
    // Save current answer
    const updatedQuestions = [...mockQuestions];
    updatedQuestions[mockCurrentIndex].userAnswer = mockCurrentAnswer;
    setMockQuestions(updatedQuestions);
    
    // Reset feedback state
    setShowFeedback(false);
    setCurrentFeedback('');
    
    if (mockCurrentIndex < mockQuestions.length - 1) {
      setMockCurrentIndex(prev => prev + 1);
      setMockCurrentAnswer('');
    } else {
      // All questions answered - generate scorecard
      setMockTimerActive(false);
      setMockMode('evaluation');
      generateMockScorecard();
    }
  };

  const generateMockScorecard = () => {
    setIsEvaluating(true);
    
    // Calculate scores based on answer length and keywords (simple heuristic)
    const scores = {
      communication: 0,
      technicalDepth: 0,
      problemSolving: 0,
      leadership: 0,
      starMethod: 0
    };
    
    const strengths: string[] = [];
    const improvements: string[] = [];
    
    // Generate feedback for each question and store it
    const updatedQuestions = mockQuestions.map((q, idx) => {
      const feedback = generateLocalFeedback(q, q.userAnswer, language);
      return { ...q, aiFeedback: feedback };
    });
    setMockQuestions(updatedQuestions);
    
    updatedQuestions.forEach((q, idx) => {
      const answer = q.userAnswer.toLowerCase();
      const len = q.userAnswer.length;
      
      // STAR method keywords
      const hasStarElements = 
        (answer.includes('situation') || answer.includes('situación') || answer.includes('contexto')) ||
        (answer.includes('task') || answer.includes('tarea') || answer.includes('responsabilidad')) ||
        (answer.includes('action') || answer.includes('acción') || answer.includes('hice')) ||
        (answer.includes('result') || answer.includes('resultado') || answer.includes('logré'));
      
      // Metrics keywords
      const hasMetrics = /\d+%|\d+ (days|días|hours|horas|users|usuarios|millions|millones)/.test(answer);
      
      // Leadership keywords
      const hasLeadership = answer.includes('led') || answer.includes('lideré') || answer.includes('team') || answer.includes('equipo') || answer.includes('mentor');
      
      // Technical keywords
      const hasTechnical = answer.includes('pipeline') || answer.includes('data') || answer.includes('sql') || answer.includes('python') || answer.includes('spark') || answer.includes('airflow');
      
      // Score based on content
      if (len > 200) scores.communication += 1;
      if (hasStarElements) scores.starMethod += 1;
      if (hasMetrics) scores.technicalDepth += 1;
      if (hasLeadership) scores.leadership += 1;
      if (hasTechnical) scores.problemSolving += 1;
    });
    
    // Normalize scores to 1-5 scale
    const totalQ = mockQuestions.length || 1;
    scores.communication = Math.min(5, Math.max(1, Math.round((scores.communication / totalQ) * 5) + 2));
    scores.starMethod = Math.min(5, Math.max(1, Math.round((scores.starMethod / totalQ) * 5) + 1));
    scores.technicalDepth = Math.min(5, Math.max(1, Math.round((scores.technicalDepth / totalQ) * 5) + 2));
    scores.leadership = Math.min(5, Math.max(1, Math.round((scores.leadership / totalQ) * 5) + 1));
    scores.problemSolving = Math.min(5, Math.max(1, Math.round((scores.problemSolving / totalQ) * 5) + 2));
    
    // Generate strengths and improvements based on scores
    if (scores.communication >= 4) strengths.push(language === 'es' ? 'Respuestas detalladas y claras' : 'Detailed and clear answers');
    if (scores.starMethod >= 4) strengths.push(language === 'es' ? 'Buen uso del método STAR' : 'Good use of STAR method');
    if (scores.technicalDepth >= 4) strengths.push(language === 'es' ? 'Métricas específicas y cuantificables' : 'Specific and quantifiable metrics');
    if (scores.leadership >= 4) strengths.push(language === 'es' ? 'Demuestra liderazgo e iniciativa' : 'Demonstrates leadership and initiative');
    
    if (scores.communication <= 2) improvements.push(language === 'es' ? 'Elaborar más las respuestas' : 'Elaborate more on answers');
    if (scores.starMethod <= 2) improvements.push(language === 'es' ? 'Usar estructura STAR consistentemente' : 'Use STAR structure consistently');
    if (scores.technicalDepth <= 2) improvements.push(language === 'es' ? 'Incluir métricas y números específicos' : 'Include metrics and specific numbers');
    if (scores.leadership <= 2) improvements.push(language === 'es' ? 'Mostrar más ejemplos de liderazgo' : 'Show more leadership examples');
    
    // Ensure we have at least some feedback
    if (strengths.length === 0) strengths.push(language === 'es' ? 'Completaste todas las preguntas' : 'Completed all questions');
    if (improvements.length === 0) improvements.push(language === 'es' ? 'Practica más para mejorar confianza' : 'Practice more to improve confidence');
    
    // Calculate overall rating
    const avgScore = (scores.communication + scores.starMethod + scores.technicalDepth + scores.leadership + scores.problemSolving) / 5;
    let overallRating: MockInterviewScorecard['overallRating'];
    if (avgScore >= 4.5) overallRating = 'strong-hire';
    else if (avgScore >= 3.5) overallRating = 'hire';
    else if (avgScore >= 2.5) overallRating = 'lean-hire';
    else if (avgScore >= 1.5) overallRating = 'lean-no-hire';
    else overallRating = 'no-hire';
    
    const recommendation = language === 'es'
      ? avgScore >= 3 
        ? 'Buen desempeño general. Con más práctica estarás listo para entrevistas reales.'
        : 'Recomiendo practicar más con las preguntas individuales antes de otra mock interview.'
      : avgScore >= 3
        ? 'Good overall performance. With more practice you\'ll be ready for real interviews.'
        : 'I recommend practicing more with individual questions before another mock interview.';
    
    setMockScorecard({
      overallRating,
      scores,
      strengths,
      improvements,
      recommendation
    });
    
    setMockMode('scorecard');
    setIsEvaluating(false);
    
    // Award XP
    if (onAddXP) {
      const xp = Math.round(avgScore * 100);
      onAddXP(xp, Math.round(xp / 2), 'Mock Interview completed');
    }
    
    if (onUnlockAchievement) {
      onUnlockAchievement('mock_interview_first');
      if (avgScore >= 4) onUnlockAchievement('mock_interview_hire');
    }
  };

  const formatMockTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Overview section
  const renderOverview = () => {
    const systemDesignCompleted = JSON.parse(localStorage.getItem('sd-completed-interviews') || '[]').length;
    const behavioralCompleted = completedBehavioral.length;
    const assessmentHistory = getAssessmentHistory();
    const lastAssessment = assessmentHistory[assessmentHistory.length - 1];

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-3">
            {t({ es: '🎯 Centro de Preparación', en: '🎯 Interview Prep Center', pt: '🎯 Centro de Preparação' })}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            {t({ 
              es: 'Todo lo que necesitas para dominar entrevistas de Data Engineering: System Design, Behavioral, y Assessment de skills.',
              en: 'Everything you need to master Data Engineering interviews: System Design, Behavioral, and Skills Assessment.',
              pt: 'Tudo que voce precisa para dominar entrevistas de Data Engineering: System Design, Behavioral, e Assessment de skills.'
            })}
          </p>
        </div>

        {/* Progress Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* System Design */}
          <button
            onClick={() => setActiveSection('system-design')}
            className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-5 text-left hover:border-purple-400/50 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">System Design</h3>
                <p className="text-xs text-slate-400">{systemDesignCompleted}/10</p>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
              <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${(systemDesignCompleted / 10) * 100}%` }} />
            </div>
            <p className="text-xs text-slate-500">{t({ es: 'Arquitectura de datos', en: 'Data architecture', pt: 'Arquitetura de dados' })}</p>
          </button>

          {/* Behavioral */}
          <button
            onClick={() => setActiveSection('behavioral')}
            className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-xl p-5 text-left hover:border-emerald-400/50 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Behavioral</h3>
                <p className="text-xs text-slate-400">{behavioralCompleted}/{BEHAVIORAL_STATS.total}</p>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
              <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(behavioralCompleted / BEHAVIORAL_STATS.total) * 100}%` }} />
            </div>
            <p className="text-xs text-slate-500">{t({ es: 'Soft skills y STAR', en: 'Soft skills & STAR', pt: 'Soft skills e STAR' })}</p>
          </button>

          {/* Live Coding - Links to Practice */}
          <a
            href="/members?tab=practica"
            className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-5 text-left hover:border-blue-400/50 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Live Coding</h3>
                <p className="text-xs text-slate-400">SQL & Python</p>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '0%' }} />
            </div>
            <p className="text-xs text-slate-500">{t({ es: 'Ir a Practica', en: 'Go to Practice', pt: 'Ir para Pratica' })} →</p>
          </a>

          {/* Assessment */}
          <button
            onClick={() => setActiveSection('assessment')}
            className="bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 rounded-xl p-5 text-left hover:border-amber-400/50 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Assessment</h3>
                <p className="text-xs text-slate-400">
                  {lastAssessment ? `${lastAssessment.result.percentage}%` : t({ es: 'Sin evaluar', en: 'Not assessed', pt: 'Nao avaliado' })}
                </p>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 mb-2">
              <div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${lastAssessment?.result.percentage || 0}%` }} />
            </div>
            <p className="text-xs text-slate-500">{t({ es: 'Evalua tu nivel', en: 'Assess your level', pt: 'Avalie seu nivel' })}</p>
          </button>
        </div>

        {/* 🎯 MOCK INTERVIEW PREMIUM - Full Simulation */}
        <div className="bg-gradient-to-r from-rose-500/20 via-pink-500/10 to-purple-500/20 border-2 border-rose-500/40 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            🔥 PREMIUM
          </div>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-2xl shadow-lg">
              🎤
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">
                {t({ es: 'Mock Interview Completa', en: 'Full Mock Interview', pt: 'Mock Interview Completa' })}
              </h3>
              <p className="text-slate-300 text-sm mb-4">
                {t({ 
                  es: 'Simulación realista de 45 minutos mezclando: Behavioral, System Design, Escenarios Técnicos y Negociación Salarial. Timer real, feedback por pregunta, y Scorecard final.', 
                  en: 'Realistic 45-minute simulation mixing: Behavioral, System Design, Technical Scenarios and Salary Negotiation. Real timer, per-question feedback, and final Scorecard.',
                  pt: 'Simulação realista de 45 minutos misturando: Behavioral, System Design, Cenários Técnicos e Negociação Salarial. Timer real, feedback por pergunta, e Scorecard final.'
                })}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full border border-emerald-500/30">🎭 Behavioral</span>
                <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30">🏗️ System Design</span>
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30">🔧 Technical</span>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-1 rounded-full border border-amber-500/30">💰 Negotiation</span>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="text-xs bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full">⏱️ 45 min</span>
                <span className="text-xs bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full">📝 7 preguntas</span>
                <span className="text-xs bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full">🦖 Feedback/pregunta</span>
                <span className="text-xs bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full">📊 Scorecard</span>
              </div>
              <button
                onClick={() => {
                  setActiveSection('mock-interview');
                  startMockInterview();
                }}
                className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-rose-500/25"
              >
                {t({ es: '🚀 Comenzar Mock Interview', en: '🚀 Start Mock Interview', pt: '🚀 Começar Mock Interview' })}
              </button>
            </div>
          </div>
        </div>

        {/* When to do what - Level Guide */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            {t({ es: 'Cuando practicar cada tipo de entrevista', en: 'When to practice each interview type', pt: 'Quando praticar cada tipo de entrevista' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Level 1 */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌱</span>
                <span className="font-medium text-green-400">Level 1 - Novato</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'Live Coding SQL basico', en: 'Basic SQL Live Coding', pt: 'Live Coding SQL basico' })}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'Behavioral comunes', en: 'Common Behavioral', pt: 'Behavioral comuns' })}
                </li>
                <li className="flex items-start gap-2">
                  <Circle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  {t({ es: 'System Design (solo leer)', en: 'System Design (just read)', pt: 'System Design (so ler)' })}
                </li>
              </ul>
            </div>
            {/* Level 2 */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🚀</span>
                <span className="font-medium text-amber-400">Level 2 - SSR</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'System Design Junior/Mid', en: 'Junior/Mid System Design', pt: 'System Design Junior/Mid' })}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'Behavioral + tricky', en: 'Behavioral + tricky', pt: 'Behavioral + tricky' })}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'Live Coding Medium', en: 'Medium Live Coding', pt: 'Live Coding Medium' })}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'Skill Assessment 60%+', en: 'Skill Assessment 60%+', pt: 'Skill Assessment 60%+' })}
                </li>
              </ul>
            </div>
            {/* Level 3 */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">👑</span>
                <span className="font-medium text-purple-400">Level 3 - Senior</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'System Design Senior', en: 'Senior System Design', pt: 'System Design Senior' })}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'Leadership Principles', en: 'Leadership Principles', pt: 'Leadership Principles' })}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'Live Coding Hard', en: 'Hard Live Coding', pt: 'Live Coding Hard' })}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  {t({ es: 'Skill Assessment 80%+', en: 'Skill Assessment 80%+', pt: 'Skill Assessment 80%+' })}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interview Tips */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            {t({ es: 'Tips para tu proxima entrevista', en: 'Tips for your next interview', pt: 'Dicas para sua proxima entrevista' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-400">1</span>
              </div>
              <div>
                <p className="text-white font-medium">{t({ es: 'Practica en voz alta', en: 'Practice out loud', pt: 'Pratique em voz alta' })}</p>
                <p className="text-sm text-slate-400">{t({ es: 'Graba tus respuestas y escuchalas', en: 'Record your answers and listen to them', pt: 'Grave suas respostas e ouca' })}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-400">2</span>
              </div>
              <div>
                <p className="text-white font-medium">{t({ es: 'Usa el metodo STAR', en: 'Use the STAR method', pt: 'Use o metodo STAR' })}</p>
                <p className="text-sm text-slate-400">{t({ es: 'Situation, Task, Action, Result', en: 'Situation, Task, Action, Result', pt: 'Situation, Task, Action, Result' })}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-amber-400">3</span>
              </div>
              <div>
                <p className="text-white font-medium">{t({ es: 'Pregunta antes de disenar', en: 'Ask before designing', pt: 'Pergunte antes de desenhar' })}</p>
                <p className="text-sm text-slate-400">{t({ es: 'Clarifica requerimientos primero', en: 'Clarify requirements first', pt: 'Clarifique requisitos primeiro' })}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <span className="text-blue-400">4</span>
              </div>
              <div>
                <p className="text-white font-medium">{t({ es: 'Explica tu razonamiento', en: 'Explain your reasoning', pt: 'Explique seu raciocinio' })}</p>
                <p className="text-sm text-slate-400">{t({ es: 'El proceso importa tanto como la solucion', en: 'The process matters as much as the solution', pt: 'O processo importa tanto quanto a solucao' })}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🎥 Recording Tip - CRITICAL */}
        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎥</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">
                {t({ es: 'TIP PRO: Grabate practicando', en: 'PRO TIP: Record yourself practicing', pt: 'DICA PRO: Grave-se praticando' })}
              </h3>
              <p className="text-slate-300 text-sm mb-3">
                {t({ 
                  es: 'El 90% de los candidatos no hacen esto, y es lo que mas te va a ayudar. Usa Loom o OBS para grabarte respondiendo preguntas. Despues mira el video y nota: pausas largas, muletillas ("ehh", "este"), falta de estructura. Es incomodo, pero funciona.',
                  en: 'Most candidates dont do this, and its what helps the most. Use Loom or OBS to record yourself answering questions. Then watch the video and notice: long pauses, filler words ("umm", "like"), lack of structure. Its uncomfortable, but it works.',
                  pt: 'A maioria dos candidatos nao faz isso, e e o que mais ajuda. Use Loom ou OBS para se gravar respondendo perguntas. Depois assista o video e note: pausas longas, muletas ("ehh", "tipo"), falta de estrutura. E desconfortavel, mas funciona.'
                })}
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="https://www.loom.com" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full transition-colors">
                  Loom (gratis) →
                </a>
                <a href="https://obsproject.com" target="_blank" rel="noopener noreferrer" className="text-xs px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-full transition-colors">
                  OBS (gratis) →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 😰 Nervousness Tips */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span className="text-2xl">😰</span>
            {t({ es: 'Si te pones nervioso/a...', en: 'If you get nervous...', pt: 'Se voce ficar nervoso/a...' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">🫁 {t({ es: 'Respira', en: 'Breathe', pt: 'Respire' })}</h4>
              <p className="text-sm text-slate-300">
                {t({ 
                  es: 'Antes de responder, toma 3 segundos. Respira profundo. Esta bien hacer pausas - muestra que pensas antes de hablar.',
                  en: 'Before answering, take 3 seconds. Breathe deeply. Its okay to pause - it shows you think before speaking.',
                  pt: 'Antes de responder, tire 3 segundos. Respire fundo. Tudo bem fazer pausas - mostra que voce pensa antes de falar.'
                })}
              </p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-purple-400 font-medium mb-2">✍️ {t({ es: 'Escribe mientras pensas', en: 'Write while thinking', pt: 'Escreva enquanto pensa' })}</h4>
              <p className="text-sm text-slate-300">
                {t({ 
                  es: 'En System Design, dibuja mientras hablas. Esto te da tiempo y muestra tu proceso. Si es virtual, comparte pantalla.',
                  en: 'In System Design, draw while talking. This buys you time and shows your process. If virtual, share your screen.',
                  pt: 'Em System Design, desenhe enquanto fala. Isso te da tempo e mostra seu processo. Se for virtual, compartilhe a tela.'
                })}
              </p>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
              <h4 className="text-emerald-400 font-medium mb-2">🆘 {t({ es: 'Pedi ayuda', en: 'Ask for help', pt: 'Peca ajuda' })}</h4>
              <p className="text-sm text-slate-300">
                {t({ 
                  es: '"Me trabe un poco, podrias darme una pista?" No es debilidad, es comunicacion. Mejor que quedarte en silencio 2 minutos.',
                  en: '"I got a bit stuck, could you give me a hint?" Its not weakness, its communication. Better than staying silent for 2 minutes.',
                  pt: '"Travei um pouco, poderia me dar uma dica?" Nao e fraqueza, e comunicacao. Melhor do que ficar em silencio por 2 minutos.'
                })}
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <h4 className="text-amber-400 font-medium mb-2">🎭 {t({ es: 'Recorda: ellos tambien fueron juniors', en: 'Remember: they were juniors too', pt: 'Lembre: eles tambem foram juniors' })}</h4>
              <p className="text-sm text-slate-300">
                {t({ 
                  es: 'El entrevistador QUIERE que te vaya bien. No buscan hacerte caer, buscan un companero de equipo. Relaja.',
                  en: 'The interviewer WANTS you to do well. They arent trying to trip you up, theyre looking for a teammate. Relax.',
                  pt: 'O entrevistador QUER que voce se saia bem. Eles nao estao tentando te derrubar, estao procurando um colega. Relaxe.'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Pre-Interview Checklist */}
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            {t({ es: 'Checklist: 24 horas antes', en: 'Checklist: 24 hours before', pt: 'Checklist: 24 horas antes' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <label className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span className="text-slate-300">{t({ es: 'Investigue la empresa y el rol', en: 'Researched the company and role', pt: 'Pesquisei a empresa e o cargo' })}</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span className="text-slate-300">{t({ es: 'Prepare mis historias STAR', en: 'Prepared my STAR stories', pt: 'Preparei minhas historias STAR' })}</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span className="text-slate-300">{t({ es: 'Probe mi camara y microfono', en: 'Tested my camera and microphone', pt: 'Testei minha camera e microfone' })}</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span className="text-slate-300">{t({ es: 'Tengo preguntas para hacerles', en: 'Have questions for them', pt: 'Tenho perguntas para eles' })}</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span className="text-slate-300">{t({ es: 'Practique al menos 1 System Design', en: 'Practiced at least 1 System Design', pt: 'Pratiquei pelo menos 1 System Design' })}</span>
            </label>
            <label className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-500 bg-slate-700 text-emerald-500 focus:ring-emerald-500" />
              <span className="text-slate-300">{t({ es: 'Dormi bien (7+ horas)', en: 'Slept well (7+ hours)', pt: 'Dormi bem (7+ horas)' })}</span>
            </label>
          </div>
        </div>

        {/* Ready to Apply Banner */}
        {lastAssessment?.result.readyToApply && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center">
                <Trophy className="w-7 h-7 text-green-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {t({ es: 'Estas listo para aplicar!', en: 'Youre ready to apply!', pt: 'Voce esta pronto para aplicar!' })}
                </h3>
                <p className="text-green-300/80">
                  {t({ 
                    es: 'Tu assessment indica que tenes las skills necesarias. Es hora de buscar oportunidades!',
                    en: 'Your assessment indicates you have the necessary skills. Time to look for opportunities!',
                    pt: 'Seu assessment indica que voce tem as skills necessarias. Hora de buscar oportunidades!'
                  })}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Behavioral section
  const renderBehavioral = () => {
    if (selectedQuestion) {
      return (
        <div className="space-y-6">
          {/* Back button */}
          <button
            onClick={() => setSelectedQuestion(null)}
            className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            {t({ es: 'Volver a preguntas', en: 'Back to questions', pt: 'Voltar para perguntas' })}
          </button>

          {/* Question Card */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  selectedQuestion.difficulty === 'common' ? 'bg-green-500/20 text-green-400' :
                  selectedQuestion.difficulty === 'tricky' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {selectedQuestion.difficulty.toUpperCase()}
                </span>
                <span className="text-slate-500 text-sm">+{selectedQuestion.estimatedXP} XP</span>
              </div>
              {completedBehavioral.includes(selectedQuestion.id) ? (
                <span className="text-green-400 flex items-center gap-1 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  {t({ es: 'Completado', en: 'Completed', pt: 'Completado' })}
                </span>
              ) : null}
            </div>

            <h3 className="text-xl font-bold text-white mb-4">
              {selectedQuestion.question[language as 'es' | 'en' | 'pt']}
            </h3>

            {/* Why they ask */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-4">
              <h4 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                {t({ es: 'Por que preguntan esto?', en: 'Why do they ask this?', pt: 'Por que perguntam isso?' })}
              </h4>
              <p className="text-slate-300 text-sm">
                {selectedQuestion.whyTheyAsk[language as 'es' | 'en' | 'pt']}
              </p>
            </div>

            {/* What they look for */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-4">
              <h4 className="text-emerald-400 font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                {t({ es: 'Que buscan?', en: 'What are they looking for?', pt: 'O que eles buscam?' })}
              </h4>
              <ul className="space-y-1">
                {selectedQuestion.whatTheyLookFor[language as 'es' | 'en' | 'pt'].map((item, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* STAR Method Toggle */}
            <button
              onClick={() => setShowSTAR(!showSTAR)}
              className="w-full bg-slate-700/50 hover:bg-slate-700 rounded-lg p-4 mb-4 flex items-center justify-between transition-colors"
            >
              <span className="text-white font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {t({ es: 'Ver ejemplo de respuesta (STAR)', en: 'See example answer (STAR)', pt: 'Ver exemplo de resposta (STAR)' })}
              </span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showSTAR ? 'rotate-180' : ''}`} />
            </button>

            {showSTAR && (
              <div className="bg-slate-700/30 rounded-lg p-4 mb-4 space-y-4">
                <div>
                  <h5 className="text-amber-400 font-medium text-sm mb-1">📍 Situation</h5>
                  <p className="text-slate-300 text-sm">{selectedQuestion.exampleAnswer.situation[language as 'es' | 'en' | 'pt']}</p>
                </div>
                <div>
                  <h5 className="text-blue-400 font-medium text-sm mb-1">📋 Task</h5>
                  <p className="text-slate-300 text-sm">{selectedQuestion.exampleAnswer.task[language as 'es' | 'en' | 'pt']}</p>
                </div>
                <div>
                  <h5 className="text-purple-400 font-medium text-sm mb-1">⚡ Action</h5>
                  <p className="text-slate-300 text-sm">{selectedQuestion.exampleAnswer.action[language as 'es' | 'en' | 'pt']}</p>
                </div>
                <div>
                  <h5 className="text-green-400 font-medium text-sm mb-1">🎯 Result</h5>
                  <p className="text-slate-300 text-sm">{selectedQuestion.exampleAnswer.result[language as 'es' | 'en' | 'pt']}</p>
                </div>
              </div>
            )}

            {/* Red Flags */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-4">
              <h4 className="text-red-400 font-medium mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                {t({ es: 'Red Flags - Evita esto!', en: 'Red Flags - Avoid this!', pt: 'Red Flags - Evite isso!' })}
              </h4>
              <ul className="space-y-1">
                {selectedQuestion.redFlags[language as 'es' | 'en' | 'pt'].map((item, idx) => (
                  <li key={idx} className="text-slate-300 text-sm">{item}</li>
                ))}
              </ul>
            </div>

            {/* Your answer area */}
            <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                {t({ es: 'Tu respuesta', en: 'Your answer', pt: 'Sua resposta' })}
              </h4>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-500 resize-none min-h-[150px]"
                placeholder={t({ 
                  es: 'Escribe tu respuesta usando el metodo STAR...', 
                  en: 'Write your answer using the STAR method...', 
                  pt: 'Escreva sua resposta usando o metodo STAR...' 
                })}
              />
            </div>

            {/* Ask Saurio */}
            {onAskAI && (
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4 mb-4">
                <h4 className="text-cyan-400 font-medium mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  {t({ es: 'Practica con Saurio (Entrevistador AI)', en: 'Practice with Saurio (AI Interviewer)', pt: 'Pratique com Saurio (Entrevistador AI)' })}
                </h4>
                <p className="text-sm text-slate-400 mb-3">
                  {t({ 
                    es: 'Saurio actuara como entrevistador. Podes pedirle feedback sobre tu respuesta o practicar follow-up questions.',
                    en: 'Saurio will act as an interviewer. You can ask for feedback on your answer or practice follow-up questions.',
                    pt: 'Saurio atuara como entrevistador. Voce pode pedir feedback sobre sua resposta ou praticar follow-up questions.'
                  })}
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAskBehavioralAI()}
                    className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-500"
                    placeholder={t({ es: 'Ej: Dame feedback sobre mi respuesta...', en: 'Ex: Give me feedback on my answer...', pt: 'Ex: Me de feedback sobre minha resposta...' })}
                  />
                  <button
                    onClick={handleAskBehavioralAI}
                    disabled={!aiQuestion.trim()}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors"
                  >
                    {t({ es: 'Preguntar', en: 'Ask', pt: 'Perguntar' })}
                  </button>
                </div>
                {/* Main action - Evaluate answer */}
                {userAnswer.trim().length > 20 && (
                  <button
                    onClick={() => { 
                      setAiQuestion(t({ es: 'Evalua mi respuesta y dame feedback especifico', en: 'Evaluate my answer and give me specific feedback', pt: 'Avalie minha resposta e me de feedback especifico' })); 
                      setTimeout(() => handleAskBehavioralAI(), 100);
                    }}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 mb-3"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {t({ es: '🦖 Evaluar mi respuesta', en: '🦖 Evaluate my answer', pt: '🦖 Avaliar minha resposta' })}
                  </button>
                )}
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => { setAiQuestion(t({ es: 'Que le falta a mi respuesta?', en: 'What is my answer missing?', pt: 'O que falta na minha resposta?' })); handleAskBehavioralAI(); }}
                    className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
                  >
                    {t({ es: '¿Qué falta?', en: 'What\'s missing?', pt: 'O que falta?' })}
                  </button>
                  <button
                    onClick={() => { setAiQuestion(t({ es: 'Hazme una follow-up question como un entrevistador real', en: 'Ask me a follow-up question like a real interviewer', pt: 'Me faca uma follow-up question como um entrevistador real' })); handleAskBehavioralAI(); }}
                    className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
                  >
                    {t({ es: 'Follow-up', en: 'Follow-up', pt: 'Follow-up' })}
                  </button>
                  <button
                    onClick={() => { setAiQuestion(t({ es: 'Ayudame a estructurar mi respuesta con STAR', en: 'Help me structure my answer with STAR', pt: 'Me ajude a estruturar minha resposta com STAR' })); handleAskBehavioralAI(); }}
                    className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
                  >
                    {t({ es: 'Ayuda STAR', en: 'STAR Help', pt: 'Ajuda STAR' })}
                  </button>
                  <button
                    onClick={() => { setAiQuestion(t({ es: 'Como puedo hacer mi respuesta mas impactante?', en: 'How can I make my answer more impactful?', pt: 'Como posso tornar minha resposta mais impactante?' })); handleAskBehavioralAI(); }}
                    className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded transition-colors"
                  >
                    {t({ es: 'Más impacto', en: 'More impact', pt: 'Mais impacto' })}
                  </button>
                </div>
              </div>
            )}

            {/* Mark as complete */}
            {!completedBehavioral.includes(selectedQuestion.id) && (
              <button
                onClick={() => handleCompleteBehavioral(selectedQuestion.id)}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                {t({ es: 'Marcar como practicado', en: 'Mark as practiced', pt: 'Marcar como praticado' })}
              </button>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Back to overview */}
        <button
          onClick={() => setActiveSection('overview')}
          className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          {t({ es: 'Volver al overview', en: 'Back to overview', pt: 'Voltar ao overview' })}
        </button>

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
            <Users className="w-7 h-7 text-emerald-400" />
            {t({ es: 'Behavioral Interviews', en: 'Behavioral Interviews', pt: 'Behavioral Interviews' })}
          </h2>
          <p className="text-slate-400">
            {t({ 
              es: `${BEHAVIORAL_STATS.total} preguntas organizadas por categoria. Practica usando el metodo STAR.`,
              en: `${BEHAVIORAL_STATS.total} questions organized by category. Practice using the STAR method.`,
              pt: `${BEHAVIORAL_STATS.total} perguntas organizadas por categoria. Pratique usando o metodo STAR.`
            })}
          </p>
        </div>

        {/* STAR Method Explainer */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4">
          <h3 className="text-amber-400 font-semibold mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            {t({ es: 'Metodo STAR', en: 'STAR Method', pt: 'Metodo STAR' })}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-800/50 rounded-lg p-3">
              <span className="text-amber-400 font-bold">S</span>
              <span className="text-white ml-1">ituation</span>
              <p className="text-xs text-slate-400 mt-1">{t({ es: 'El contexto', en: 'The context', pt: 'O contexto' })}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <span className="text-blue-400 font-bold">T</span>
              <span className="text-white ml-1">ask</span>
              <p className="text-xs text-slate-400 mt-1">{t({ es: 'Tu responsabilidad', en: 'Your responsibility', pt: 'Sua responsabilidade' })}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <span className="text-purple-400 font-bold">A</span>
              <span className="text-white ml-1">ction</span>
              <p className="text-xs text-slate-400 mt-1">{t({ es: 'Que hiciste', en: 'What you did', pt: 'O que voce fez' })}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3">
              <span className="text-green-400 font-bold">R</span>
              <span className="text-white ml-1">esult</span>
              <p className="text-xs text-slate-400 mt-1">{t({ es: 'El resultado', en: 'The result', pt: 'O resultado' })}</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BEHAVIORAL_CATEGORIES.map(category => {
            const questions = getBehavioralByCategory(category.id);
            const completed = questions.filter(q => completedBehavioral.includes(q.id)).length;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id === selectedCategory ? null : category.id)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-emerald-500/20 border-emerald-500/50' 
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{category.name[language as 'es' | 'en' | 'pt']}</h3>
                  <span className="text-sm text-slate-400">{completed}/{questions.length}</span>
                </div>
                <p className="text-sm text-slate-400 mb-2">{category.description[language as 'es' | 'en' | 'pt']}</p>
                <div className="w-full bg-slate-700 rounded-full h-1.5">
                  <div className="bg-emerald-500 h-1.5 rounded-full transition-all" style={{ width: `${(completed / questions.length) * 100}%` }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Questions for selected category */}
        {selectedCategory && (
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              {BEHAVIORAL_CATEGORIES.find(c => c.id === selectedCategory)?.name[language as 'es' | 'en' | 'pt']}
            </h3>
            <div className="space-y-2">
              {getBehavioralByCategory(selectedCategory).map(question => {
                const isFree = isBehavioralFree(question.id);
                const isLocked = !isFree;
                
                return (
                <button
                  key={question.id}
                  onClick={() => !isLocked && ( setSelectedQuestion(question), setShowSTAR(false), setUserAnswer('') )}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                    isLocked 
                      ? 'bg-slate-800/30 border-slate-700/30 cursor-not-allowed opacity-60'
                      : 'bg-slate-700/50 hover:bg-slate-700 border-slate-600 hover:border-slate-500'
                  }`}
                  disabled={isLocked}
                >
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  ) : completedBehavioral.includes(question.id) ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className={`text-sm ${isLocked ? 'text-slate-500' : 'text-white'}`}>{question.question[language as 'es' | 'en' | 'pt']}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        question.difficulty === 'common' ? 'bg-green-500/20 text-green-400' :
                        question.difficulty === 'tricky' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span className="text-xs text-slate-500">+{question.estimatedXP} XP</span>
                      {isLocked && (
                        <span className="text-xs text-purple-400">🔒 Premium</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isLocked ? 'text-slate-600' : 'text-slate-400'}`} />
                </button>
              );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Assessment section
  const renderAssessment = () => {
    if (assessmentMode === 'in-progress') {
      const currentQuestion = currentQuestions[currentQuestionIndex];
      const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;

      return (
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">
                {t({ es: 'Pregunta', en: 'Question', pt: 'Pergunta' })} {currentQuestionIndex + 1}/{currentQuestions.length}
              </span>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 flex items-center gap-1">
                  <Timer className="w-4 h-4" />
                  {formatTime(assessmentTimer)}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  currentQuestion.difficulty === 'junior' ? 'bg-green-500/20 text-green-400' :
                  currentQuestion.difficulty === 'mid' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {currentQuestion.difficulty.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Question */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
              {SKILL_AREAS.find(a => a.id === currentQuestion.area)?.icon}
              <span>{SKILL_AREAS.find(a => a.id === currentQuestion.area)?.name[language as 'es' | 'en' | 'pt']}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4">
              {currentQuestion.question[language as 'es' | 'en' | 'pt']}
            </h3>

            {currentQuestion.codeSnippet && (
              <pre className="bg-slate-900 rounded-lg p-4 mb-4 overflow-x-auto">
                <code className="text-sm text-green-400 font-mono">
                  {currentQuestion.codeSnippet}
                </code>
              </pre>
            )}

            <div className="space-y-3">
              {currentQuestion.options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(option.id)}
                  className="w-full p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-amber-500/50 text-left transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-600 group-hover:bg-amber-500/20 flex items-center justify-center text-slate-300 group-hover:text-amber-400 font-medium transition-colors">
                      {option.id.toUpperCase()}
                    </span>
                    <span className="text-white flex-1 pt-1">
                      {option.text[language as 'es' | 'en' | 'pt']}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    if (assessmentMode === 'results' && assessmentResult) {
      return (
        <div className="space-y-6">
          {/* Results Header */}
          <div className={`rounded-xl p-6 border ${
            assessmentResult.readyToApply 
              ? 'bg-gradient-to-br from-green-500/20 to-emerald-600/10 border-green-500/30' 
              : 'bg-slate-800 border-slate-700'
          }`}>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{assessmentResult.percentage}%</span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {t({ es: 'Nivel:', en: 'Level:', pt: 'Nivel:' })} {assessmentResult.level.toUpperCase()}
              </h2>
              <p className="text-slate-400">
                {assessmentResult.totalScore}/{assessmentResult.maxScore} {t({ es: 'puntos', en: 'points', pt: 'pontos' })} en {formatTime(assessmentTimer)}
              </p>
            </div>
          </div>

          {/* Ready to Apply */}
          {assessmentResult.readyToApply && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {t({ es: 'Estas listo para aplicar!', en: 'Youre ready to apply!', pt: 'Voce esta pronto para aplicar!' })}
                  </h3>
                  <p className="text-green-300/80 text-sm">
                    {t({ es: 'Tus skills estan a nivel para entrevistas.', en: 'Your skills are interview-ready.', pt: 'Suas skills estao prontas para entrevistas.' })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Results by Area */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t({ es: 'Resultados por Area', en: 'Results by Area', pt: 'Resultados por Area' })}
            </h3>
            <div className="space-y-4">
              {assessmentResult.byArea.map(area => (
                <div key={area.area}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white flex items-center gap-2">
                      {SKILL_AREAS.find(a => a.id === area.area)?.icon}
                      {SKILL_AREAS.find(a => a.id === area.area)?.name[language as 'es' | 'en' | 'pt']}
                    </span>
                    <span className={`font-medium ${
                      area.percentage >= 80 ? 'text-green-400' :
                      area.percentage >= 60 ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {area.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        area.percentage >= 80 ? 'bg-green-500' :
                        area.percentage >= 60 ? 'bg-amber-500' :
                        'bg-red-500'
                      }`} 
                      style={{ width: `${area.percentage}%` }} 
                    />
                  </div>
                  <p className="text-xs text-slate-400">{area.recommendation[language as 'es' | 'en' | 'pt']}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          {assessmentResult.nextSteps[language as 'es' | 'en' | 'pt'].length > 0 && (
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-400" />
                {t({ es: 'Proximos Pasos', en: 'Next Steps', pt: 'Proximos Passos' })}
              </h3>
              <ul className="space-y-2">
                {assessmentResult.nextSteps[language as 'es' | 'en' | 'pt'].map((step, idx) => (
                  <li key={idx} className="text-slate-300 flex items-center gap-2">
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Retry button */}
          <button
            onClick={() => { setAssessmentMode('idle'); setAssessmentResult(null); }}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            {t({ es: 'Volver', en: 'Go back', pt: 'Voltar' })}
          </button>
        </div>
      );
    }

    // Idle state - start assessment
    return (
      <div className="space-y-6">
        {/* Back to overview */}
        <button
          onClick={() => setActiveSection('overview')}
          className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          {t({ es: 'Volver al overview', en: 'Back to overview', pt: 'Voltar ao overview' })}
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
            <Target className="w-10 h-10 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {t({ es: 'Skill Assessment', en: 'Skill Assessment', pt: 'Skill Assessment' })}
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            {t({ 
              es: 'Evalua tu nivel actual en SQL, Python, conceptos de Data Engineering, y System Design. Recibe recomendaciones personalizadas.',
              en: 'Assess your current level in SQL, Python, Data Engineering concepts, and System Design. Get personalized recommendations.',
              pt: 'Avalie seu nivel atual em SQL, Python, conceitos de Data Engineering, e System Design. Receba recomendacoes personalizadas.'
            })}
          </p>
        </div>

        {/* Assessment Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <Clock className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-white font-medium">~{ASSESSMENT_STATS.estimatedTime} min</p>
            <p className="text-xs text-slate-400">{t({ es: 'Duracion', en: 'Duration', pt: 'Duracao' })}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <BookOpen className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-white font-medium">{ASSESSMENT_STATS.questionsPerAssessment}</p>
            <p className="text-xs text-slate-400">{t({ es: 'Preguntas', en: 'Questions', pt: 'Perguntas' })}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <Layers className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <p className="text-white font-medium">4</p>
            <p className="text-xs text-slate-400">{t({ es: 'Areas', en: 'Areas', pt: 'Areas' })}</p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <Zap className="w-6 h-6 text-green-400 mx-auto mb-2" />
            <p className="text-white font-medium">+200 XP</p>
            <p className="text-xs text-slate-400">{t({ es: 'Recompensa', en: 'Reward', pt: 'Recompensa' })}</p>
          </div>
        </div>

        {/* Areas covered */}
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">
            {t({ es: 'Areas Evaluadas', en: 'Assessed Areas', pt: 'Areas Avaliadas' })}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SKILL_AREAS.map(area => (
              <div key={area.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <span className="text-2xl">{area.icon}</span>
                <div>
                  <p className="text-white font-medium">{area.name[language as 'es' | 'en' | 'pt']}</p>
                  <p className="text-xs text-slate-400">{area.description[language as 'es' | 'en' | 'pt']}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
        {getAssessmentHistory().length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h3 className="text-sm font-medium text-slate-400 mb-3">
              {t({ es: 'Historial reciente', en: 'Recent history', pt: 'Historico recente' })}
            </h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {getAssessmentHistory().slice(-5).reverse().map((entry, idx) => (
                <div key={idx} className="flex-shrink-0 p-3 bg-slate-700/50 rounded-lg text-center min-w-[100px]">
                  <p className="text-lg font-bold text-white">{entry.result.percentage}%</p>
                  <p className="text-xs text-slate-400">{entry.result.level}</p>
                  <p className="text-xs text-slate-500">{new Date(entry.date).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Start button */}
        <button
          onClick={startAssessment}
          className="w-full py-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-amber-500/25"
        >
          <Play className="w-6 h-6" />
          {t({ es: 'Comenzar Assessment', en: 'Start Assessment', pt: 'Comecar Assessment' })}
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto relative">
      {/* 🔒 LOCKED OVERLAY FOR FREE USERS - Pueden ver pero no interactuar */}
      {isFreeUser && (
        <div className="absolute inset-0 z-40 pointer-events-auto">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/70 to-slate-900/95" />
          
          {/* Lock CTA - Fixed at top */}
          <div className="sticky top-4 mx-auto max-w-lg px-4 z-50">
            <div className="bg-gradient-to-r from-purple-900/95 to-indigo-900/95 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-6 shadow-2xl shadow-purple-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {t({ es: '🔒 Contenido Premium', en: '🔒 Premium Content', pt: '🔒 Conteúdo Premium' })}
                  </h3>
                  <p className="text-purple-300 text-sm">
                    {t({ es: 'Desbloquea preparación completa para entrevistas', en: 'Unlock complete interview preparation', pt: 'Desbloqueie preparação completa para entrevistas' })}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2 mb-5">
                {[
                  { es: '20+ System Design Interviews', en: '20+ System Design Interviews', pt: '20+ System Design Interviews' },
                  { es: 'Behavioral con método STAR', en: 'Behavioral with STAR method', pt: 'Behavioral com método STAR' },
                  { es: 'Skill Assessment personalizado', en: 'Personalized Skill Assessment', pt: 'Skill Assessment personalizado' },
                  { es: 'Saurio AI como entrevistador', en: 'Saurio AI as interviewer', pt: 'Saurio AI como entrevistador' },
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    {t(feature)}
                  </li>
                ))}
              </ul>
              
              <a 
                href="https://iansaura.gumroad.com/l/saurio?wanted=true" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold rounded-xl text-center transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25"
              >
                {t({ es: '🚀 Suscribirme - $30/mes', en: '🚀 Subscribe - $30/month', pt: '🚀 Assinar - $30/mês' })}
              </a>
              
              <p className="text-center text-xs text-slate-400 mt-3">
                {t({ es: 'Cancela cuando quieras • Sin compromiso', en: 'Cancel anytime • No commitment', pt: 'Cancele quando quiser • Sem compromisso' })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Section tabs (only show when in behavioral or assessment) */}
      {(activeSection === 'behavioral' || activeSection === 'assessment') && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveSection('overview')}
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap bg-slate-800/50 text-slate-400 hover:text-white"
          >
            <Target className="w-4 h-4" />
            Overview
          </button>
          <button
            onClick={() => setActiveSection('system-design')}
            className="px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap bg-slate-800/50 text-slate-400 hover:text-white"
          >
            <Layers className="w-4 h-4" />
            System Design
          </button>
          <button
            onClick={() => setActiveSection('behavioral')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeSection === 'behavioral' 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : 'bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Behavioral
          </button>
          <button
            onClick={() => setActiveSection('assessment')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeSection === 'assessment' 
                ? 'bg-amber-500/20 text-amber-400' 
                : 'bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-4 h-4" />
            Assessment
          </button>
        </div>
      )}

      {/* Content */}
      {activeSection === 'overview' && renderOverview()}
      {activeSection === 'system-design' && (
        <div>
          <button
            onClick={() => setActiveSection('overview')}
            className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            {t({ es: 'Volver al overview', en: 'Back to overview', pt: 'Voltar ao overview' })}
          </button>
          <SystemDesignTab 
            userEmail={userEmail}
            onAskAI={onAskAI}
            onAddXP={onAddXP}
            onUnlockAchievement={onUnlockAchievement}
            achievements={achievements}
            isFreeUser={isFreeUser}
          />
        </div>
      )}
      {activeSection === 'behavioral' && renderBehavioral()}
      {activeSection === 'assessment' && renderAssessment()}
      
      {/* MOCK INTERVIEW MODE */}
      {activeSection === 'mock-interview' && (
        <div className="space-y-6">
          {/* Scorecard View */}
          {mockMode === 'scorecard' && mockScorecard && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">📊 {t({ es: 'Tu Scorecard', en: 'Your Scorecard', pt: 'Seu Scorecard' })}</h2>
                <p className="text-slate-400">{t({ es: 'Resultado de tu Mock Interview', en: 'Your Mock Interview Results', pt: 'Resultado da sua Mock Interview' })}</p>
              </div>
              
              {/* Overall Rating */}
              <div className={`text-center p-8 rounded-2xl border-2 ${
                mockScorecard.overallRating === 'strong-hire' ? 'bg-emerald-500/20 border-emerald-500/50' :
                mockScorecard.overallRating === 'hire' ? 'bg-green-500/20 border-green-500/50' :
                mockScorecard.overallRating === 'lean-hire' ? 'bg-yellow-500/20 border-yellow-500/50' :
                mockScorecard.overallRating === 'lean-no-hire' ? 'bg-orange-500/20 border-orange-500/50' :
                'bg-red-500/20 border-red-500/50'
              }`}>
                <div className="text-5xl mb-4">
                  {mockScorecard.overallRating === 'strong-hire' ? '🌟' :
                   mockScorecard.overallRating === 'hire' ? '✅' :
                   mockScorecard.overallRating === 'lean-hire' ? '🤔' :
                   mockScorecard.overallRating === 'lean-no-hire' ? '⚠️' : '❌'}
                </div>
                <h3 className={`text-3xl font-bold mb-2 ${
                  mockScorecard.overallRating === 'strong-hire' ? 'text-emerald-400' :
                  mockScorecard.overallRating === 'hire' ? 'text-green-400' :
                  mockScorecard.overallRating === 'lean-hire' ? 'text-yellow-400' :
                  mockScorecard.overallRating === 'lean-no-hire' ? 'text-orange-400' : 'text-red-400'
                }`}>
                  {mockScorecard.overallRating === 'strong-hire' ? 'STRONG HIRE' :
                   mockScorecard.overallRating === 'hire' ? 'HIRE' :
                   mockScorecard.overallRating === 'lean-hire' ? 'LEAN HIRE' :
                   mockScorecard.overallRating === 'lean-no-hire' ? 'LEAN NO HIRE' : 'NO HIRE'}
                </h3>
                <p className="text-slate-300 max-w-md mx-auto">{mockScorecard.recommendation}</p>
              </div>
              
              {/* Score Bars */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">{t({ es: 'Evaluación por área', en: 'Evaluation by area', pt: 'Avaliação por área' })}</h4>
                <div className="space-y-4">
                  {[
                    { key: 'communication', label: t({ es: 'Comunicación', en: 'Communication', pt: 'Comunicação' }), color: 'bg-blue-500' },
                    { key: 'starMethod', label: t({ es: 'Método STAR', en: 'STAR Method', pt: 'Método STAR' }), color: 'bg-emerald-500' },
                    { key: 'technicalDepth', label: t({ es: 'Profundidad Técnica', en: 'Technical Depth', pt: 'Profundidade Técnica' }), color: 'bg-purple-500' },
                    { key: 'leadership', label: t({ es: 'Liderazgo', en: 'Leadership', pt: 'Liderança' }), color: 'bg-amber-500' },
                    { key: 'problemSolving', label: t({ es: 'Problem Solving', en: 'Problem Solving', pt: 'Problem Solving' }), color: 'bg-cyan-500' },
                  ].map(({ key, label, color }) => (
                    <div key={key}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">{label}</span>
                        <span className="text-white font-medium">{mockScorecard.scores[key as keyof typeof mockScorecard.scores]}/5</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${(mockScorecard.scores[key as keyof typeof mockScorecard.scores] / 5) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
                  <h4 className="font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {t({ es: 'Fortalezas', en: 'Strengths', pt: 'Pontos Fortes' })}
                  </h4>
                  <ul className="space-y-2">
                    {mockScorecard.strengths.map((s, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-400">✓</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
                  <h4 className="font-semibold text-amber-400 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {t({ es: 'Áreas de Mejora', en: 'Areas for Improvement', pt: 'Áreas de Melhoria' })}
                  </h4>
                  <ul className="space-y-2">
                    {mockScorecard.improvements.map((s, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-amber-400">→</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* 📝 DETAILED FEEDBACK PER QUESTION */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  🦖 {t({ es: 'Feedback Detallado por Pregunta', en: 'Detailed Feedback per Question', pt: 'Feedback Detalhado por Pergunta' })}
                </h4>
                <div className="space-y-4">
                  {mockQuestions.map((q, idx) => {
                    // Get question text
                    let questionText = '';
                    if (q.type === 'behavioral' || q.type === 'negotiation') {
                      questionText = (q.question as BehavioralQuestion).question[language as 'es' | 'en' | 'pt'];
                    } else {
                      const sq = q.question as { description: { es: string; en: string; pt: string } };
                      questionText = sq.description[language as 'es' | 'en' | 'pt'];
                    }
                    
                    // Truncate question for display
                    const shortQuestion = questionText.length > 80 ? questionText.slice(0, 80) + '...' : questionText;
                    
                    return (
                      <details key={idx} className="group">
                        <summary className="cursor-pointer p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/70 transition-colors">
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              q.type === 'behavioral' ? 'bg-emerald-500/20 text-emerald-400' :
                              q.type === 'system-design' ? 'bg-purple-500/20 text-purple-400' :
                              q.type === 'technical' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>
                              {q.type === 'behavioral' ? '🎭' : q.type === 'system-design' ? '🏗️' : q.type === 'technical' ? '🔧' : '💰'}
                            </span>
                            <span className="text-sm text-white font-medium flex-1">
                              {t({ es: 'Pregunta', en: 'Question', pt: 'Pergunta' })} {idx + 1}: {shortQuestion}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              q.userAnswer.length > 200 ? 'bg-emerald-500/20 text-emerald-400' :
                              q.userAnswer.length > 100 ? 'bg-amber-500/20 text-amber-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {q.userAnswer.length} chars
                            </span>
                          </div>
                        </summary>
                        <div className="mt-2 p-4 bg-slate-900/30 rounded-lg ml-4 border-l-2 border-slate-600">
                          {/* Your answer */}
                          <div className="mb-4">
                            <h5 className="text-xs font-bold text-slate-400 mb-2">{t({ es: 'TU RESPUESTA:', en: 'YOUR ANSWER:', pt: 'SUA RESPOSTA:' })}</h5>
                            <p className="text-sm text-slate-300 italic bg-slate-800/50 p-3 rounded">
                              "{q.userAnswer || t({ es: '(Sin respuesta)', en: '(No answer)', pt: '(Sem resposta)' })}"
                            </p>
                          </div>
                          {/* Feedback */}
                          <div>
                            <h5 className="text-xs font-bold text-indigo-400 mb-3 flex items-center gap-1">
                              🦖 FEEDBACK DE SAURIO:
                            </h5>
                            <div className="space-y-2">
                              {(q.aiFeedback || '').split('\n').filter(line => line.trim()).map((line, idx) => {
                                const isPositive = line.includes('✅');
                                const isWarning = line.includes('⚠️');
                                const isTip = line.includes('💡');
                                
                                // Extract text after emoji and **text**
                                const cleanLine = line
                                  .replace(/^[✅⚠️💡]\s*/, '')
                                  .replace(/\*\*([^*]+)\*\*/g, '$1');
                                const parts = cleanLine.split(' - ');
                                const title = parts[0] || '';
                                const description = parts.slice(1).join(' - ') || '';
                                
                                return (
                                  <div 
                                    key={idx}
                                    className={`flex items-start gap-3 p-3 rounded-lg ${
                                      isPositive ? 'bg-emerald-500/10 border border-emerald-500/30' :
                                      isWarning ? 'bg-amber-500/10 border border-amber-500/30' :
                                      isTip ? 'bg-blue-500/10 border border-blue-500/30' :
                                      'bg-slate-700/50'
                                    }`}
                                  >
                                    <span className="text-lg flex-shrink-0">
                                      {isPositive ? '✅' : isWarning ? '⚠️' : isTip ? '💡' : '📝'}
                                    </span>
                                    <div>
                                      <p className={`font-semibold text-sm ${
                                        isPositive ? 'text-emerald-400' :
                                        isWarning ? 'text-amber-400' :
                                        isTip ? 'text-blue-400' :
                                        'text-slate-300'
                                      }`}>
                                        {title}
                                      </p>
                                      {description && (
                                        <p className="text-xs text-slate-400 mt-1">{description}</p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                              {!q.aiFeedback && (
                                <p className="text-sm text-slate-500 italic">
                                  {t({ es: 'No hay feedback disponible', en: 'No feedback available', pt: 'Nenhum feedback disponível' })}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={() => {
                    setMockMode('idle');
                    startMockInterview();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  🔄 {t({ es: 'Repetir Interview', en: 'Repeat Interview', pt: 'Repetir Interview' })}
                </button>
                <button
                  onClick={() => {
                    setActiveSection('overview');
                    setMockMode('idle');
                  }}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-xl transition-all"
                >
                  🏠 {t({ es: 'Volver al Overview', en: 'Back to Overview', pt: 'Voltar ao Overview' })}
                </button>
              </div>
            </div>
          )}
          
          {/* In Progress View */}
          {mockMode === 'in-progress' && mockQuestions.length > 0 && (
            <div className="space-y-5">
              {/* Header with Timer */}
              <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">🎤</div>
                  <div>
                    <h2 className="text-lg font-bold text-white">{t({ es: 'Mock Interview', en: 'Mock Interview', pt: 'Mock Interview' })}</h2>
                    <p className="text-sm text-slate-400">{t({ es: 'Pregunta', en: 'Question', pt: 'Pergunta' })} {mockCurrentIndex + 1} / {mockQuestions.length}</p>
                  </div>
                </div>
                <div className={`text-3xl font-mono font-bold px-4 py-2 rounded-lg ${mockTimer < 300 ? 'text-red-400 bg-red-500/20 animate-pulse' : 'text-emerald-400 bg-emerald-500/20'}`}>
                  ⏱️ {formatMockTimer(mockTimer)}
                </div>
              </div>
              
              {/* Progress Bar with Question Types */}
              <div className="space-y-2">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-rose-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: `${((mockCurrentIndex + 1) / mockQuestions.length) * 100}%` }} />
                </div>
                <div className="flex gap-1 justify-center">
                  {mockQuestions.map((q, i) => (
                    <div 
                      key={i}
                      className={`w-8 h-1 rounded-full transition-all ${
                        i < mockCurrentIndex ? 'bg-emerald-500' : 
                        i === mockCurrentIndex ? 'bg-rose-500' : 'bg-slate-600'
                      }`}
                      title={q.type}
                    />
                  ))}
                </div>
              </div>
              
              {/* Question Type Badge */}
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  mockQuestions[mockCurrentIndex].type === 'behavioral' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  mockQuestions[mockCurrentIndex].type === 'system-design' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                  mockQuestions[mockCurrentIndex].type === 'technical' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {mockQuestions[mockCurrentIndex].type === 'behavioral' ? '🎭 BEHAVIORAL' :
                   mockQuestions[mockCurrentIndex].type === 'system-design' ? '🏗️ SYSTEM DESIGN' :
                   mockQuestions[mockCurrentIndex].type === 'technical' ? '🔧 TECHNICAL SCENARIO' :
                   '💰 NEGOTIATION'}
                </span>
                <span className="text-xs text-slate-500">
                  {mockQuestions[mockCurrentIndex].type === 'behavioral' ? t({ es: 'Usa método STAR', en: 'Use STAR method', pt: 'Use método STAR' }) :
                   mockQuestions[mockCurrentIndex].type === 'system-design' ? t({ es: 'Dibujá arquitectura mental', en: 'Draw mental architecture', pt: 'Desenhe arquitetura mental' }) :
                   mockQuestions[mockCurrentIndex].type === 'technical' ? t({ es: 'Sé específico con pasos', en: 'Be specific with steps', pt: 'Seja específico com passos' }) :
                   t({ es: 'Nunca digas un número primero', en: 'Never say a number first', pt: 'Nunca diga um número primeiro' })}
                </span>
              </div>
              
              {/* Current Question */}
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-xl p-6 border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">👤</span>
                  <span className="text-sm text-slate-400 font-medium">{t({ es: 'Entrevistador pregunta:', en: 'Interviewer asks:', pt: 'Entrevistador pergunta:' })}</span>
                </div>
                <p className="text-xl text-white leading-relaxed">
                  "{(() => {
                    const q = mockQuestions[mockCurrentIndex];
                    if (q.type === 'behavioral' || q.type === 'negotiation') {
                      return (q.question as BehavioralQuestion).question[language as 'es' | 'en' | 'pt'];
                    } else {
                      const sq = q.question as { description: { es: string; en: string; pt: string } };
                      return sq.description[language as 'es' | 'en' | 'pt'];
                    }
                  })()}"
                </p>
                
                {/* Tips for this question type */}
                {(() => {
                  const q = mockQuestions[mockCurrentIndex];
                  if (q.type === 'system-design' || q.type === 'technical') {
                    const sq = q.question as { tips?: { es: string; en: string; pt: string } };
                    if (sq.tips) {
                      return (
                        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
                          <p className="text-xs text-slate-400">
                            💡 <strong>Tips:</strong> {sq.tips[language as 'es' | 'en' | 'pt']}
                          </p>
                        </div>
                      );
                    }
                  }
                  return null;
                })()}
              </div>
              
              {/* Answer Area */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-slate-400">{t({ es: 'Tu respuesta:', en: 'Your answer:', pt: 'Sua resposta:' })}</label>
                  <span className={`text-xs ${mockCurrentAnswer.length < 100 ? 'text-red-400' : mockCurrentAnswer.length < 200 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {mockCurrentAnswer.length} {t({ es: 'caracteres', en: 'characters', pt: 'caracteres' })} 
                    {mockCurrentAnswer.length < 100 && ` (${t({ es: 'muy corta', en: 'too short', pt: 'muito curta' })})`}
                    {mockCurrentAnswer.length >= 200 && ' ✓'}
                  </span>
                </div>
                <textarea
                  value={mockCurrentAnswer}
                  onChange={(e) => setMockCurrentAnswer(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-600 rounded-xl p-4 text-white placeholder-slate-500 resize-none min-h-[180px] focus:border-rose-500/50 focus:outline-none transition-colors"
                  placeholder={
                    mockQuestions[mockCurrentIndex].type === 'behavioral' || mockQuestions[mockCurrentIndex].type === 'negotiation'
                      ? t({ es: 'Usa STAR: Situación → Tarea → Acción → Resultado...', en: 'Use STAR: Situation → Task → Action → Result...', pt: 'Use STAR: Situação → Tarefa → Ação → Resultado...' })
                      : mockQuestions[mockCurrentIndex].type === 'system-design'
                        ? t({ es: 'Describe: Requerimientos → Arquitectura → Tecnologías → Trade-offs...', en: 'Describe: Requirements → Architecture → Technologies → Trade-offs...', pt: 'Descreva: Requisitos → Arquitetura → Tecnologias → Trade-offs...' })
                        : t({ es: 'Explica paso a paso cómo lo resolverías...', en: 'Explain step by step how you would solve it...', pt: 'Explique passo a passo como resolveria...' })
                  }
                  autoFocus
                  disabled={showFeedback}
                />
              </div>
              
              {/* Type-specific reminder */}
              <div className={`rounded-lg p-3 text-sm ${
                mockQuestions[mockCurrentIndex].type === 'behavioral' || mockQuestions[mockCurrentIndex].type === 'negotiation'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : mockQuestions[mockCurrentIndex].type === 'system-design'
                    ? 'bg-purple-500/10 border border-purple-500/30 text-purple-300'
                    : 'bg-blue-500/10 border border-blue-500/30 text-blue-300'
              }`}>
                {mockQuestions[mockCurrentIndex].type === 'behavioral' || mockQuestions[mockCurrentIndex].type === 'negotiation' ? (
                  <p>💡 <strong>STAR:</strong> {t({ es: 'Situación → Tarea → Acción → Resultado (con métricas!)', en: 'Situation → Task → Action → Result (with metrics!)', pt: 'Situação → Tarefa → Ação → Resultado (com métricas!)' })}</p>
                ) : mockQuestions[mockCurrentIndex].type === 'system-design' ? (
                  <p>💡 <strong>Framework:</strong> {t({ es: 'Clarificar → High-level → Deep dive → Trade-offs → Escalabilidad', en: 'Clarify → High-level → Deep dive → Trade-offs → Scalability', pt: 'Clarificar → High-level → Deep dive → Trade-offs → Escalabilidade' })}</p>
                ) : (
                  <p>💡 <strong>Tip:</strong> {t({ es: 'Sé específico: menciona herramientas, comandos, y pasos concretos', en: 'Be specific: mention tools, commands, and concrete steps', pt: 'Seja específico: mencione ferramentas, comandos e passos concretos' })}</p>
                )}
              </div>
              
              {/* Realistic Interview Notice - NO feedback during interview */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 text-center">
                <p className="text-xs text-slate-400">
                  💼 {t({ 
                    es: 'Como en una entrevista real: el feedback detallado vendrá al final en tu Scorecard',
                    en: 'Like in a real interview: detailed feedback will come at the end in your Scorecard',
                    pt: 'Como em uma entrevista real: o feedback detalhado virá no final no seu Scorecard'
                  })}
                </p>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3">
                {/* Next Question Button */}
                <button
                  onClick={handleMockNextQuestion}
                  disabled={mockCurrentAnswer.length < 50}
                  className="flex-1 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  {mockCurrentIndex < mockQuestions.length - 1 
                    ? t({ es: 'Siguiente Pregunta →', en: 'Next Question →', pt: 'Próxima Pergunta →' })
                    : t({ es: '📊 Finalizar y Ver Scorecard', en: '📊 Finish & View Scorecard', pt: '📊 Finalizar e Ver Scorecard' })}
                </button>
                
                {/* End Early Button */}
                <button
                  onClick={() => {
                    if (window.confirm(t({ es: '¿Seguro que querés terminar la entrevista?', en: 'Are you sure you want to end the interview?', pt: 'Tem certeza que quer terminar a entrevista?' }))) {
                      setMockTimerActive(false);
                      generateMockScorecard();
                    }
                  }}
                  className="px-5 py-4 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-xl transition-all text-sm"
                >
                  {t({ es: 'Terminar', en: 'End', pt: 'Terminar' })}
                </button>
              </div>
            </div>
          )}
          
          {/* Evaluation Loading */}
          {mockMode === 'evaluation' && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4 animate-bounce">🦖</div>
              <h2 className="text-2xl font-bold text-white mb-2">{t({ es: 'Saurio está evaluando...', en: 'Saurio is evaluating...', pt: 'Saurio está avaliando...' })}</h2>
              <p className="text-slate-400">{t({ es: 'Generando tu scorecard personalizado', en: 'Generating your personalized scorecard', pt: 'Gerando seu scorecard personalizado' })}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};