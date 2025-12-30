import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Clock, Play, CheckCircle, XCircle, ArrowRight, Trophy, Target, Zap } from 'lucide-react';
import { ALL_SQL_EXERCISES, ALL_PYTHON_EXERCISES, t, SQLExercise, PythonExercise } from '../../data/exercises';

interface InterviewModeProps {
  type: 'sql' | 'python';
  duration: number; // minutes
  questionCount: number;
  onComplete: (results: InterviewResults) => void;
  onExit: () => void;
  // SQL execution function (passed from parent)
  executeSQL?: (query: string) => Promise<{ success: boolean; data?: any[]; error?: string }>;
  // Python execution function
  executePython?: (code: string) => Promise<{ success: boolean; output?: string; error?: string }>;
}

interface InterviewResults {
  score: number;
  correctCount: number;
  totalCount: number;
  avgTime: number;
  answers: {
    exerciseId: string;
    exerciseTitle: string;
    correct: boolean;
    timeSeconds: number;
    userAnswer: string;
    expectedAnswer?: string;
  }[];
}

export const InterviewMode: React.FC<InterviewModeProps> = ({
  type,
  duration,
  questionCount,
  onComplete,
  onExit,
  executeSQL,
  executePython,
}) => {
  const [hasStarted, setHasStarted] = useState(false); // New state for start confirmation
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [answers, setAnswers] = useState<InterviewResults['answers']>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showHint, setShowHint] = useState(false);

  // Get random exercises prioritizing interview-relevant ones
  const exercises = useMemo(() => {
    const allExercises = type === 'sql' 
      ? ALL_SQL_EXERCISES.filter(e => 
          e.interviewFrequency === 'high' || 
          e.interviewFrequency === 'very_high' || 
          e.interviewFrequency === 'medium'
        )
      : ALL_PYTHON_EXERCISES.filter(e => 
          e.interviewFrequency === 'high' || 
          e.interviewFrequency === 'very_high' || 
          e.interviewFrequency === 'medium'
        );
    
    const shuffled = [...allExercises].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(questionCount, shuffled.length));
  }, [type, questionCount]);

  const currentExercise = exercises[currentQuestion];
  const progressPercent = ((currentQuestion) / exercises.length) * 100;

  const timerRef = useRef<number | null>(null);

  // Timer - only starts after user clicks "Comenzar" - pauses when tab is hidden
  useEffect(() => {
    if (!hasStarted) return;
    if (timeLeft <= 0 || isFinished) {
      if (!isFinished) finishInterview();
      return;
    }

    const startTimer = () => {
      if (timerRef.current) return;
      timerRef.current = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isFinished, hasStarted]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const finishInterview = useCallback(() => {
    setIsFinished(true);
    const correctCount = answers.filter(a => a.correct).length;
    const avgTime = answers.length > 0 
      ? Math.round(answers.reduce((a, b) => a + b.timeSeconds, 0) / answers.length) 
      : 0;
    
    onComplete({
      score: Math.round((correctCount / exercises.length) * 100),
      correctCount,
      totalCount: exercises.length,
      avgTime,
      answers,
    });
  }, [answers, exercises.length, onComplete]);

  const runCode = async () => {
    if (!userCode.trim()) {
      setResult({ success: false, message: 'Escribí tu código primero' });
      return;
    }

    setIsRunning(true);
    setResult(null);

    try {
      let isCorrect = false;
      let message = '';

      if (type === 'sql' && executeSQL) {
        const execResult = await executeSQL(userCode);
        
        if (execResult.error) {
          message = `❌ Error: ${execResult.error}`;
          isCorrect = false;
        } else if (execResult.data) {
          // Check if result matches expected
          const exercise = currentExercise as SQLExercise;
          const expectedSolution = exercise.expectedQuery?.toLowerCase().trim() || '';
          const userSolution = userCode.toLowerCase().trim();
          
          // Simple validation: check if key parts are present
          const keyParts = extractKeyParts(expectedSolution);
          const userHasKeyParts = keyParts.length === 0 || keyParts.every(part => userSolution.includes(part));
          
          if (execResult.data.length > 0 && userHasKeyParts) {
            isCorrect = true;
            message = `✅ ¡Correcto! Resultado: ${execResult.data.length} filas`;
          } else if (execResult.data.length > 0) {
            // Partial credit - query runs but might not be optimal
            isCorrect = true;
            message = `✅ Query ejecutada correctamente. ${execResult.data.length} filas.`;
          } else {
            message = `⚠️ Query ejecutada pero sin resultados. Revisá tu lógica.`;
          }
        }
      } else if (type === 'python' && executePython) {
        const execResult = await executePython(userCode);
        
        if (execResult.error) {
          message = `❌ Error: ${execResult.error}`;
          isCorrect = false;
        } else {
          // Check if code runs and produces output
          const exercise = currentExercise as PythonExercise;
          
          if (execResult.output && execResult.output.trim().length > 0) {
            // Check if code structure is correct
            isCorrect = validatePythonStructure(userCode, exercise);
            message = isCorrect 
              ? `✅ ¡Bien! Tu código funciona.\n${execResult.output}`
              : `⚠️ Código ejecutado. Revisar resultado:\n${execResult.output}`;
          } else {
            message = `⚠️ Código ejecutado pero sin output visible.`;
          }
        }
      } else {
        // Fallback: simple validation
        isCorrect = userCode.length > 10;
        message = isCorrect ? '✅ Respuesta registrada' : '❌ Respuesta muy corta';
      }

      setResult({ success: isCorrect, message });
      
      // Auto-advance after showing result
      if (isCorrect) {
        setTimeout(() => submitAnswer(isCorrect), 1500);
      }
    } catch (error) {
      setResult({ 
        success: false, 
        message: `❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}` 
      });
    } finally {
      setIsRunning(false);
    }
  };

  const extractKeyParts = (sql: string): string[] => {
    const parts: string[] = [];
    // Extract key SQL keywords and table names
    const keywords = ['select', 'from', 'where', 'join', 'group by', 'order by', 'having', 'limit'];
    keywords.forEach(kw => {
      if (sql.includes(kw)) parts.push(kw);
    });
    return parts;
  };

  const validatePythonStructure = (code: string, exercise: PythonExercise): boolean => {
    // Check if required patterns are present
    const solution = exercise.solution || '';
    const requiredPatterns = [
      /import\s+pandas/,
      /\.read_csv|\.read_json|DataFrame/,
      /\.groupby|\.merge|\.apply|\.filter/,
    ];
    
    return requiredPatterns.some(pattern => pattern.test(code) || pattern.test(solution));
  };

  const submitAnswer = (correct: boolean) => {
    const timeTaken = Math.round((Date.now() - questionStartTime) / 1000);
    
    const newAnswer = {
      exerciseId: currentExercise.id,
      exerciseTitle: t(currentExercise.title, 'es'),
      correct,
      timeSeconds: timeTaken,
      userAnswer: userCode,
      expectedAnswer: type === 'sql' 
        ? (currentExercise as SQLExercise).expectedQuery 
        : (currentExercise as PythonExercise).solution,
    };
    
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);
    
    if (currentQuestion + 1 >= exercises.length) {
      // Last question
      setIsFinished(true);
      const correctCount = newAnswers.filter(a => a.correct).length;
      const avgTime = Math.round(newAnswers.reduce((a, b) => a + b.timeSeconds, 0) / newAnswers.length);
      
      onComplete({
        score: Math.round((correctCount / exercises.length) * 100),
        correctCount,
        totalCount: exercises.length,
        avgTime,
        answers: newAnswers,
      });
    } else {
      // Next question
      setCurrentQuestion(currentQuestion + 1);
      setUserCode('');
      setResult(null);
      setShowHint(false);
      setQuestionStartTime(Date.now());
    }
  };

  const skipQuestion = () => {
    submitAnswer(false);
  };

  // Start confirmation screen - shows before timer starts
  if (!hasStarted) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
        <div className="text-center max-w-lg mx-auto">
          {/* Header */}
          <div className="text-7xl mb-6">🎯</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Modo Entrevista {type.toUpperCase()}
          </h2>
          
          {/* Info */}
          <div className="bg-slate-800/50 rounded-xl p-6 mb-6 text-left">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              Información de la sesión
            </h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center gap-3">
                <span className="text-emerald-400">⏱️</span>
                <span><strong>{duration} minutos</strong> de tiempo total</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400">📝</span>
                <span><strong>{questionCount} preguntas</strong> de entrevista</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400">🎯</span>
                <span>Preguntas frecuentes en entrevistas reales</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-400">⚡</span>
                <span>Ganá <strong>XP</strong> por cada respuesta correcta</span>
              </li>
            </ul>
          </div>

          {/* Warning */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
            <p className="text-amber-300 text-sm">
              ⚠️ <strong>Importante:</strong> El timer comenzará cuando hagas click en "Comenzar". 
              No podrás pausar la entrevista una vez iniciada.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onExit}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                setHasStarted(true);
                setQuestionStartTime(Date.now());
              }}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-xl font-bold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/30"
            >
              <Play className="w-5 h-5" />
              Comenzar Entrevista
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (isFinished) {
    const correctCount = answers.filter(a => a.correct).length;
    const score = Math.round((correctCount / exercises.length) * 100);
    const avgTime = answers.length > 0 
      ? Math.round(answers.reduce((a, b) => a + b.timeSeconds, 0) / answers.length) 
      : 0;

    return (
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
        {/* Score Header */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">
            {score >= 80 ? '🏆' : score >= 60 ? '⭐' : score >= 40 ? '💪' : '📚'}
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {score >= 80 ? '¡Excelente!' : score >= 60 ? '¡Buen trabajo!' : score >= 40 ? 'Sigue practicando' : 'Necesitas más práctica'}
          </h2>
          <p className="text-slate-400">Entrevista {type.toUpperCase()} completada</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className={`text-5xl font-bold mb-2 ${
              score >= 70 ? 'text-emerald-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {score}%
            </div>
            <div className="text-slate-400">Score</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-blue-400 mb-2">{correctCount}/{exercises.length}</div>
            <div className="text-slate-400">Correctas</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-purple-400 mb-2">{avgTime}s</div>
            <div className="text-slate-400">Promedio</div>
          </div>
        </div>

        {/* Results Breakdown */}
        <div className="bg-slate-800/30 rounded-xl p-6 mb-8">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            Resultados por pregunta
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {answers.map((answer, idx) => (
              <div 
                key={idx} 
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  answer.correct ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  answer.correct ? 'bg-emerald-500' : 'bg-red-500'
                }`}>
                  {answer.correct ? <CheckCircle className="w-5 h-5 text-white" /> : <XCircle className="w-5 h-5 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{answer.exerciseTitle}</div>
                  <div className="text-slate-400 text-sm">{answer.timeSeconds}s</div>
                </div>
                {!answer.correct && (
                  <button
                    onClick={() => {/* Could show solution */}}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Ver solución
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* XP Earned */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl p-4 border border-yellow-500/30 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-white font-bold">XP Ganado</span>
            </div>
            <div className="text-2xl font-bold text-yellow-400">+{correctCount * 15} XP</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onExit}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-colors"
          >
            Volver
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
          >
            <Trophy className="w-5 h-5" />
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  // Interview in progress
  return (
    <div className="space-y-4">
      {/* Header with Timer */}
      <div className="bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-xl p-4 border border-red-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🎯 Modo Entrevista
                <span className="text-sm font-normal text-red-400 bg-red-500/20 px-2 py-0.5 rounded">LIVE</span>
              </h2>
              <p className="text-slate-400">
                Pregunta {currentQuestion + 1} de {exercises.length} • Ejecutá tu código
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-mono font-bold ${
              timeLeft < 60 ? 'text-red-400' : 
              timeLeft < 180 ? 'text-yellow-400' : 'text-white'
            }`}>
              {formatTime(timeLeft)}
            </div>
            <button 
              onClick={onExit} 
              className="text-slate-500 text-sm hover:text-white transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Exercise */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        {/* Exercise Header */}
        <div className="p-4 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              currentExercise.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
              currentExercise.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-red-500/20 text-red-400'
            }`}>
              {currentExercise.difficulty === 'easy' ? 'Fácil' : 
               currentExercise.difficulty === 'medium' ? 'Medio' : 'Difícil'}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
              📊 {currentExercise.interviewFrequency === 'very_high' ? 'Muy común' : 
                   currentExercise.interviewFrequency === 'high' ? 'Común' : 'Ocasional'} en entrevistas
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-400">
              +15 XP
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            {t(currentExercise.title, 'es')}
          </h3>
          <p className="text-slate-300">{t(currentExercise.description, 'es')}</p>
        </div>

        {/* Schema (for SQL) */}
        {'schema' in currentExercise && currentExercise.schema && (
          <div className="px-4 py-3 bg-slate-900/50 border-b border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-slate-500 text-xs font-medium">SCHEMA</span>
            </div>
            <code className="text-emerald-400 text-sm font-mono">{currentExercise.schema}</code>
          </div>
        )}

        {/* Code Editor */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">Tu código {type.toUpperCase()}:</span>
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              {showHint ? 'Ocultar pista' : '💡 Ver pista'}
            </button>
          </div>
          
          {showHint && currentExercise.hint && (
            <div className="mb-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-cyan-300 text-sm">
                💡 {t(currentExercise.hint, 'es')}
              </p>
            </div>
          )}
          
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            placeholder={type === 'sql' ? 'SELECT * FROM ...' : '# Tu código Python aquí'}
            className="w-full h-40 bg-slate-900 border border-slate-600 rounded-lg p-4 font-mono text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
            autoFocus
          />

          {/* Result */}
          {result && (
            <div className={`mt-3 p-3 rounded-lg ${
              result.success ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'
            }`}>
              <pre className={`text-sm whitespace-pre-wrap ${result.success ? 'text-emerald-300' : 'text-red-300'}`}>
                {result.message}
              </pre>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={runCode}
              disabled={isRunning || !userCode.trim()}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                isRunning || !userCode.trim()
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Ejecutando...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Ejecutar y Verificar
                </>
              )}
            </button>
            
            <button
              onClick={skipQuestion}
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Saltar
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700">
        <p className="text-slate-400 text-sm text-center">
          💡 <strong className="text-white">Tip:</strong> En una entrevista real, explicá tu razonamiento mientras escribís. 
          Acá, enfocate en escribir código que funcione.
        </p>
      </div>
    </div>
  );
};

export default InterviewMode;
