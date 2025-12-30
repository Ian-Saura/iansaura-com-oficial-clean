import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, MessageSquare, Clock, CheckCircle, XCircle, Trophy, Mic, Video, Lightbulb, RefreshCw, Star, Send } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MockInterviewProps {
  userEmail: string;
  isPremium: boolean;
  onClose: () => void;
}

interface InterviewQuestion {
  id: string;
  category: 'sql' | 'python' | 'system_design' | 'behavioral';
  difficulty: 'easy' | 'medium' | 'hard';
  question: { es: string; en: string; pt: string };
  hints: { es: string[]; en: string[]; pt: string[] };
  expectedTopics: string[];
  timeLimit: number; // seconds
}

const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // SQL Questions
  {
    id: 'sql_1',
    category: 'sql',
    difficulty: 'easy',
    question: {
      es: 'Explicame la diferencia entre INNER JOIN y LEFT JOIN. ¿Cuándo usarías cada uno?',
      en: 'Explain the difference between INNER JOIN and LEFT JOIN. When would you use each one?',
      pt: 'Explique a diferença entre INNER JOIN e LEFT JOIN. Quando você usaria cada um?'
    },
    hints: {
      es: ['Pensá en qué pasa con las filas sin match', 'Mencioná casos de uso como reportes vs validación'],
      en: ['Think about what happens with unmatched rows', 'Mention use cases like reports vs validation'],
      pt: ['Pense no que acontece com linhas sem match', 'Mencione casos de uso como relatórios vs validação']
    },
    expectedTopics: ['matching rows', 'null values', 'use cases', 'performance'],
    timeLimit: 180
  },
  {
    id: 'sql_2',
    category: 'sql',
    difficulty: 'medium',
    question: {
      es: '¿Qué son las Window Functions? Dame un ejemplo de cuándo usarías ROW_NUMBER() vs RANK()',
      en: 'What are Window Functions? Give me an example of when you would use ROW_NUMBER() vs RANK()',
      pt: 'O que são Window Functions? Dê um exemplo de quando você usaria ROW_NUMBER() vs RANK()'
    },
    hints: {
      es: ['Pensá en cómo manejan los empates', 'Mencioná el PARTITION BY'],
      en: ['Think about how they handle ties', 'Mention PARTITION BY'],
      pt: ['Pense em como lidam com empates', 'Mencione PARTITION BY']
    },
    expectedTopics: ['partitioning', 'ordering', 'ties handling', 'performance'],
    timeLimit: 240
  },
  {
    id: 'sql_3',
    category: 'sql',
    difficulty: 'hard',
    question: {
      es: '¿Cómo optimizarías una query que está tardando mucho? ¿Qué herramientas usarías para diagnosticar el problema?',
      en: 'How would you optimize a slow query? What tools would you use to diagnose the problem?',
      pt: 'Como você otimizaria uma query lenta? Quais ferramentas usaria para diagnosticar o problema?'
    },
    hints: {
      es: ['EXPLAIN/EXPLAIN ANALYZE', 'Índices', 'Query plan'],
      en: ['EXPLAIN/EXPLAIN ANALYZE', 'Indexes', 'Query plan'],
      pt: ['EXPLAIN/EXPLAIN ANALYZE', 'Índices', 'Query plan']
    },
    expectedTopics: ['indexes', 'explain plan', 'statistics', 'query rewriting'],
    timeLimit: 300
  },
  // Python Questions
  {
    id: 'python_1',
    category: 'python',
    difficulty: 'easy',
    question: {
      es: '¿Cuál es la diferencia entre una lista y una tupla en Python? ¿Cuándo usarías cada una?',
      en: 'What is the difference between a list and a tuple in Python? When would you use each?',
      pt: 'Qual é a diferença entre uma lista e uma tupla em Python? Quando você usaria cada uma?'
    },
    hints: {
      es: ['Mutabilidad', 'Performance', 'Hashable'],
      en: ['Mutability', 'Performance', 'Hashable'],
      pt: ['Mutabilidade', 'Performance', 'Hashable']
    },
    expectedTopics: ['mutability', 'memory', 'use cases'],
    timeLimit: 120
  },
  {
    id: 'python_2',
    category: 'python',
    difficulty: 'medium',
    question: {
      es: 'Tenés un DataFrame de Pandas con 10 millones de filas y está lento. ¿Cómo lo optimizarías?',
      en: 'You have a Pandas DataFrame with 10 million rows and it\'s slow. How would you optimize it?',
      pt: 'Você tem um DataFrame do Pandas com 10 milhões de linhas e está lento. Como otimizaria?'
    },
    hints: {
      es: ['dtypes', 'chunking', 'vectorización', 'alternativas como Polars'],
      en: ['dtypes', 'chunking', 'vectorization', 'alternatives like Polars'],
      pt: ['dtypes', 'chunking', 'vetorização', 'alternativas como Polars']
    },
    expectedTopics: ['memory optimization', 'dtypes', 'chunking', 'vectorization'],
    timeLimit: 240
  },
  // System Design
  {
    id: 'design_1',
    category: 'system_design',
    difficulty: 'hard',
    question: {
      es: 'Diseñá un pipeline de datos que procese 1TB de logs diarios y permita consultas en tiempo real. ¿Qué tecnologías usarías?',
      en: 'Design a data pipeline that processes 1TB of logs daily and allows real-time queries. What technologies would you use?',
      pt: 'Projete um pipeline de dados que processe 1TB de logs diários e permita consultas em tempo real. Quais tecnologias usaria?'
    },
    hints: {
      es: ['Batch vs Streaming', 'Storage layers', 'Query engine'],
      en: ['Batch vs Streaming', 'Storage layers', 'Query engine'],
      pt: ['Batch vs Streaming', 'Camadas de storage', 'Query engine']
    },
    expectedTopics: ['kafka', 'spark', 'data lake', 'partitioning', 'query optimization'],
    timeLimit: 420
  },
  // Behavioral
  {
    id: 'behavioral_1',
    category: 'behavioral',
    difficulty: 'medium',
    question: {
      es: 'Contame sobre un proyecto de datos desafiante que hayas hecho. ¿Qué problemas encontraste y cómo los resolviste?',
      en: 'Tell me about a challenging data project you\'ve done. What problems did you encounter and how did you solve them?',
      pt: 'Conte-me sobre um projeto de dados desafiador que você fez. Quais problemas encontrou e como os resolveu?'
    },
    hints: {
      es: ['Usá el método STAR', 'Mencioná métricas de impacto', 'Sé específico'],
      en: ['Use the STAR method', 'Mention impact metrics', 'Be specific'],
      pt: ['Use o método STAR', 'Mencione métricas de impacto', 'Seja específico']
    },
    expectedTopics: ['problem solving', 'technical skills', 'impact', 'teamwork'],
    timeLimit: 300
  }
];

export default function MockInterview({ userEmail, isPremium, onClose }: MockInterviewProps) {
  const { tLocalized, language } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const currentQuestion = INTERVIEW_QUESTIONS[currentQuestionIndex];
  const timerRef = useRef<number | null>(null);

  // Timer - pauses when tab is hidden to save CPU
  useEffect(() => {
    if (!isRunning || timeRemaining <= 0) return;

    const tick = () => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    };

    const startTimer = () => {
      if (timerRef.current) return;
      timerRef.current = window.setInterval(tick, 1000);
    };

    const stopTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    if (!document.hidden) {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, timeRemaining]);

  const startQuestion = () => {
    setTimeRemaining(currentQuestion.timeLimit);
    setIsRunning(true);
    setFeedback(null);
    setUserAnswer('');
    setShowHints(false);
  };

  const submitAnswer = async () => {
    setIsRunning(false);
    setIsLoadingFeedback(true);

    try {
      const res = await fetch('/api/ai-tutor.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          code: userAnswer,
          question: `Evalúa esta respuesta de entrevista técnica. Pregunta: "${currentQuestion.question[language as keyof typeof currentQuestion.question]}". Respuesta del candidato: "${userAnswer}". Temas esperados: ${currentQuestion.expectedTopics.join(', ')}. Da feedback constructivo y una puntuación del 1-10.`,
          exerciseTitle: 'Mock Interview',
          exerciseDescription: currentQuestion.question[language as keyof typeof currentQuestion.question],
          language: 'general',
          userLanguage: language
        })
      });

      const data = await res.json();
      if (data.success) {
        setFeedback(data.response);
        setCompletedQuestions(prev => [...prev, currentQuestion.id]);
      } else {
        setFeedback(tLocalized({
          es: 'No pude evaluar tu respuesta. Revisá los hints y seguí practicando.',
          en: 'Could not evaluate your answer. Check the hints and keep practicing.',
          pt: 'Não consegui avaliar sua resposta. Confira as dicas e continue praticando.'
        }));
      }
    } catch {
      setFeedback(tLocalized({
        es: 'Error de conexión. Intentá de nuevo.',
        en: 'Connection error. Try again.',
        pt: 'Erro de conexão. Tente novamente.'
      }));
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const nextQuestion = () => {
    const filteredQuestions = selectedCategory 
      ? INTERVIEW_QUESTIONS.filter(q => q.category === selectedCategory)
      : INTERVIEW_QUESTIONS;
    
    const currentInFiltered = filteredQuestions.findIndex(q => q.id === currentQuestion.id);
    const nextIndex = (currentInFiltered + 1) % filteredQuestions.length;
    const nextQuestion = filteredQuestions[nextIndex];
    const globalIndex = INTERVIEW_QUESTIONS.findIndex(q => q.id === nextQuestion.id);
    
    setCurrentQuestionIndex(globalIndex);
    setFeedback(null);
    setUserAnswer('');
    setShowHints(false);
    setIsRunning(false);
    setTimeRemaining(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const categories = [
    { id: 'sql', label: 'SQL', icon: '🗃️' },
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'system_design', label: tLocalized({ es: 'System Design', en: 'System Design', pt: 'System Design' }), icon: '🏗️' },
    { id: 'behavioral', label: tLocalized({ es: 'Behavioral', en: 'Behavioral', pt: 'Comportamental' }), icon: '💬' },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 border-b border-slate-700 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-white">
                {tLocalized({ es: '🎤 Mock Interview', en: '🎤 Mock Interview', pt: '🎤 Mock Interview' })}
              </h2>
              <p className="text-xs text-slate-400">
                {tLocalized({ es: 'Practica con Saurio', en: 'Practice with Saurio', pt: 'Pratique com Saurio' })}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2">✕</button>
        </div>

        <div className="p-6">
          {/* Category selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !selectedCategory ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tLocalized({ es: 'Todas', en: 'All', pt: 'Todas' })}
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  selectedCategory === cat.id ? 'bg-purple-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Question card */}
          <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  currentQuestion.category === 'sql' ? 'bg-blue-500/20 text-blue-400' :
                  currentQuestion.category === 'python' ? 'bg-green-500/20 text-green-400' :
                  currentQuestion.category === 'system_design' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-amber-500/20 text-amber-400'
                }`}>
                  {currentQuestion.category.replace('_', ' ')}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  currentQuestion.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
                  currentQuestion.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {currentQuestion.difficulty}
                </span>
              </div>
              
              {/* Timer */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                timeRemaining > 60 ? 'bg-emerald-500/20 text-emerald-400' :
                timeRemaining > 30 ? 'bg-amber-500/20 text-amber-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                <Clock className="w-4 h-4" />
                <span className="font-mono font-bold">{formatTime(timeRemaining)}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-4">
              {currentQuestion.question[language as keyof typeof currentQuestion.question]}
            </h3>

            {/* Hints */}
            {showHints && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-400">
                    {tLocalized({ es: 'Pistas', en: 'Hints', pt: 'Dicas' })}
                  </span>
                </div>
                <ul className="space-y-1">
                  {currentQuestion.hints[language as keyof typeof currentQuestion.hints].map((hint, i) => (
                    <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-amber-400">→</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Answer input */}
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={tLocalized({
                es: 'Escribí tu respuesta aquí... (imaginá que estás en una entrevista real)',
                en: 'Write your answer here... (imagine you\'re in a real interview)',
                pt: 'Escreva sua resposta aqui... (imagine que está em uma entrevista real)'
              })}
              disabled={!isRunning && timeRemaining === 0 && !feedback}
              className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 resize-none disabled:opacity-50"
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {!isRunning && !feedback ? (
              <button
                onClick={startQuestion}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all"
              >
                <Play className="w-5 h-5" />
                {tLocalized({ es: 'Comenzar', en: 'Start', pt: 'Iniciar' })}
              </button>
            ) : isRunning ? (
              <>
                <button
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 px-4 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-xl transition-colors"
                >
                  <Lightbulb className="w-5 h-5" />
                  {tLocalized({ es: 'Pistas', en: 'Hints', pt: 'Dicas' })}
                </button>
                <button
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                  {tLocalized({ es: 'Enviar Respuesta', en: 'Submit Answer', pt: 'Enviar Resposta' })}
                </button>
              </>
            ) : null}
          </div>

          {/* Feedback */}
          {isLoadingFeedback && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-purple-400">
                {tLocalized({ es: 'Saurio está evaluando tu respuesta...', en: 'Saurio is evaluating your answer...', pt: 'Saurio está avaliando sua resposta...' })}
              </p>
            </div>
          )}

          {feedback && (
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                  🦖
                </div>
                <div>
                  <p className="font-semibold text-white">Saurio</p>
                  <p className="text-xs text-slate-400">
                    {tLocalized({ es: 'Feedback de entrevista', en: 'Interview feedback', pt: 'Feedback da entrevista' })}
                  </p>
                </div>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap">{feedback}</p>
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={nextQuestion}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                  {tLocalized({ es: 'Siguiente Pregunta', en: 'Next Question', pt: 'Próxima Pergunta' })}
                </button>
                <button
                  onClick={() => { setFeedback(null); setUserAnswer(''); }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  {tLocalized({ es: 'Reintentar', en: 'Retry', pt: 'Tentar Novamente' })}
                </button>
              </div>
            </div>
          )}

          {/* Progress */}
          <div className="text-center text-sm text-slate-500">
            {completedQuestions.length} / {INTERVIEW_QUESTIONS.length} {tLocalized({ es: 'preguntas completadas', en: 'questions completed', pt: 'perguntas completadas' })}
          </div>
        </div>
      </div>
    </div>
  );
}


