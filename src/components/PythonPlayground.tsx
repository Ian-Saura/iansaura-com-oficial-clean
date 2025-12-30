import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Play, CheckCircle, XCircle, Lightbulb, RotateCcw, ChevronRight, Trophy, Clock, Code, BookOpen, ChevronDown, ChevronUp, Zap, Terminal, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ALL_PYTHON_EXERCISES, PYTHON_CATEGORIES, t as tExercise } from '../data/exercises';
import type { PythonExercise } from '../data/exercises/types';
import { useEnergySystem } from '../hooks/useEnergySystem';
import { useLanguage } from '../i18n/LanguageContext';
import AITutor from './AITutor';
import AICodeReview from './AICodeReview';

// Declarar tipos para Pyodide
declare global {
  interface Window {
    loadPyodide: (config?: { indexURL?: string }) => Promise<any>;
    pyodide: any;
  }
}

interface PythonPlaygroundProps {
  exerciseId?: string;
  onComplete?: (exerciseId: string, timeSeconds: number, xpReward: number) => void;
  initialCategory?: string;
  limitToEasy?: boolean; // For free users - only show easy exercises
  energySystem?: ReturnType<typeof useEnergySystem>;
  isFreeUser?: boolean;
  onSyncRoadmap?: (category: string, count: number) => void; // Sync con roadmap
  userEmail?: string; // For syncing progress to server
}

// Componente principal
export const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ exerciseId, onComplete, initialCategory, limitToEasy = false, energySystem, isFreeUser = false, onSyncRoadmap, userEmail }) => {
  const { t, tLocalized, language } = useLanguage();
  
  // Convertir ejercicio escalable al formato interno con idioma actual
  const convertExercise = useCallback((ex: PythonExercise) => {
    return {
      id: ex.id,
      title: tExercise(ex.title, language),
      difficulty: ex.difficulty,
      description: tExercise(ex.description, language),
      theory: tExercise(ex.theory, language),
      realWorldExample: tExercise(ex.realWorldExample, language),
      hint: ex.hint ? tExercise(ex.hint, language) : undefined,
      starterCode: tExercise(ex.starterCode, language),
      solution: ex.solution,
      testCode: ex.testCode,
      xpReward: ex.xpReward,
      coinsReward: ex.coinsReward || 0,
      subcategory: ex.subcategory,
      tags: ex.tags,
      interviewFrequency: ex.interviewFrequency,
      requiredImports: ex.requiredImports,
    };
  }, [language]);
  
  // Estados
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  // Force 'easy' difficulty for free users
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(limitToEasy ? 'easy' : 'all');
  // Cargar ejercicio actual de localStorage
  const [exerciseIndex, setExerciseIndex] = useState(() => {
    try {
      const saved = localStorage.getItem('python_current_exercise_index');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showTheory, setShowTheory] = useState(false); // Cerrado por defecto - que intenten primero
  const [hasStarted, setHasStarted] = useState(false); // Esperar a que presione comenzar
  const [pyodide, setPyodide] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // Modo inmersivo
  const [showExerciseList, setShowExerciseList] = useState(true); // Panel ejercicios visible
  const [showConsigna, setShowConsigna] = useState(true); // Panel consigna visible
  
  // Anchos de paneles redimensionables (en px)
  const [exerciseListWidth, setExerciseListWidth] = useState(240);
  const [consignaWidth, setConsignaWidth] = useState(320);
  const [isResizing, setIsResizing] = useState<'exercises' | 'consigna' | null>(null);
  const resizeRef = useRef<{ startX: number; startWidth: number }>({ startX: 0, startWidth: 0 });
  
  // Handlers de resize
  const handleResizeStart = (panel: 'exercises' | 'consigna', e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(panel);
    resizeRef.current = {
      startX: e.clientX,
      startWidth: panel === 'exercises' ? exerciseListWidth : consignaWidth
    };
  };
  
  useEffect(() => {
    if (!isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - resizeRef.current.startX;
      const newWidth = Math.max(150, Math.min(500, resizeRef.current.startWidth + delta));
      
      if (isResizing === 'exercises') {
        setExerciseListWidth(newWidth);
      } else {
        setConsignaWidth(newWidth);
      }
    };
    
    const handleMouseUp = () => {
      setIsResizing(null);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);
  
  const outputRef = useRef<string[]>([]);

  // Cargar progreso - primero de localStorage como fallback, luego del servidor como fuente de verdad
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progressLoaded, setProgressLoaded] = useState(false);
  
  // Cargar progreso del servidor primero (fuente de verdad), localStorage como fallback
  // También hace BACKFILL: si hay datos en localStorage que no están en el servidor, los sube
  useEffect(() => {
    const loadProgress = async () => {
      const localExercises = JSON.parse(localStorage.getItem('python_completed_exercises') || '[]');
      
      // Intentar cargar del servidor primero
      if (userEmail) {
        try {
          const response = await fetch(`/api/user-progress.php?email=${encodeURIComponent(userEmail)}`);
          if (response.ok) {
            const data = await response.json();
            
            // Verificar si el servidor está offline
            if (data.offline === true) {
              console.log('[Python] Backend is offline - using localStorage only');
              setProgressLoaded(true);
              return;
            }
            
            const serverExercises = data.success && data.progress?.completedPythonExercises 
              ? data.progress.completedPythonExercises 
              : [];
            
            // Merge para no perder progreso local no sincronizado
            const merged = Array.from(new Set([...serverExercises, ...localExercises]));
            setCompletedExercises(merged);
            localStorage.setItem('python_completed_exercises', JSON.stringify(merged));
            
            // BACKFILL: Si hay datos en localStorage que no estaban en el servidor, sincronizar
            const newFromLocal = localExercises.filter((ex: string) => !serverExercises.includes(ex));
            if (newFromLocal.length > 0) {
              console.log(`[Python Backfill] Sincronizando ${newFromLocal.length} ejercicios locales al servidor`);
              fetch('/api/user-progress.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: userEmail,
                  progress: { completedPythonExercises: merged }
                })
              }).catch(() => {}); // Silent fail
            }
            
            setProgressLoaded(true);
            return;
          } else {
            // Server error (500, 503, etc) - fallback to localStorage silently
            console.log('[Python] Server unavailable - using localStorage');
          }
        } catch {
          // Network error - silently fallback to localStorage
        }
      }
      
      // Fallback a localStorage si no hay servidor o falló
      // NO intentar POST si el servidor ya retornó error (evita más 500s)
      if (localExercises.length > 0) {
        setCompletedExercises(localExercises);
      }
      setProgressLoaded(true);
    };
    
    loadProgress();
  }, [userEmail]);
  
  // Guardar progreso a localStorage y sincronizar con servidor
  useEffect(() => {
    localStorage.setItem('python_completed_exercises', JSON.stringify(completedExercises));
    
    // Sync to server if we have email
    if (userEmail && completedExercises.length > 0) {
      // Debounce server sync - increased from 1s to 3s to reduce CPU usage
      const timeoutId = setTimeout(() => {
        fetch('/api/user-progress.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            progress: { completedPythonExercises: completedExercises }
          })
        }).catch(() => {}); // Silent fail - server may be unavailable
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [completedExercises, userEmail]);
  
  // Guardar ejercicio actual
  useEffect(() => {
    localStorage.setItem('python_current_exercise_index', exerciseIndex.toString());
  }, [exerciseIndex]);

  // FREE USER LIMIT: Max 5 Easy exercises
  const FREE_EXERCISE_LIMIT = 5;
  
  // Filtrar ejercicios (free users only get easy AND limited to 5)
  const filteredExercises = useMemo(() => {
    let exercises = ALL_PYTHON_EXERCISES.filter(ex => {
      // Free users can only see easy exercises
      if (limitToEasy && ex.difficulty !== 'easy') return false;
      if (selectedCategory !== 'all' && ex.subcategory !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && ex.difficulty !== selectedDifficulty) return false;
      return true;
    });
    
    // Free users get only first 5 Easy exercises
    if (isFreeUser && limitToEasy) {
      exercises = exercises.slice(0, FREE_EXERCISE_LIMIT);
    }
    
    return exercises.map(convertExercise);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedDifficulty, limitToEasy, isFreeUser]);

  // Ejercicio actual
  const currentExercise = useMemo(() => {
    if (exerciseId) {
      const found = ALL_PYTHON_EXERCISES.find(e => e.id === exerciseId);
      if (found) return convertExercise(found);
    }
    return filteredExercises[exerciseIndex] || filteredExercises[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId, filteredExercises, exerciseIndex]);

  // Estado para evitar clicks rápidos
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Reset ejercicio
  const resetExercise = useCallback(() => {
    if (currentExercise) {
      setCode(currentExercise.starterCode);
    }
    setOutput('');
    setError(null);
    setIsCorrect(null);
    setShowHint(false);
    setShowSolution(false);
    setShowTheory(false); // Cerrar teoría al cambiar ejercicio
    setHasStarted(false); // Reset estado comenzar
    setStartTime(Date.now());
    setElapsedTime(0);
  }, [currentExercise]);
  
  // Auto-reset cuando cambia el ejercicio
  useEffect(() => {
    resetExercise();
    // Pequeño delay para evitar clicks rápidos
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseIndex]); // Solo cuando cambia el índice, no resetExercise para evitar loop

  // Estadísticas de progreso
  const progressStats = useMemo(() => {
    const total = ALL_PYTHON_EXERCISES.length;
    const completed = completedExercises.length;
    const byCategory: Record<string, { total: number; completed: number }> = {};
    
    PYTHON_CATEGORIES.forEach(cat => {
      const catExercises = ALL_PYTHON_EXERCISES.filter(e => e.subcategory === cat.id);
      byCategory[cat.id] = {
        total: catExercises.length,
        completed: catExercises.filter(e => completedExercises.includes(e.id)).length,
      };
    });
    
    return { total, completed, byCategory };
  }, [completedExercises]);

  // Cargar Pyodide
  useEffect(() => {
    const loadPyodideLib = async () => {
      try {
        setIsLoading(true);
        
        // Cargar script si no existe
        if (!window.loadPyodide) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
            script.onload = () => resolve();
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }
        
        const pyodideInstance = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
        });
        
        // Cargar pandas
        await pyodideInstance.loadPackage(['pandas', 'numpy']);
        
        setPyodide(pyodideInstance);
        setIsLoading(false);
      } catch (err: any) {
        console.error('Error loading Pyodide:', err);
        setError(t('errors.generic'));
        setIsLoading(false);
      }
    };

    loadPyodideLib();
  }, [t]);

  // Inicializar código cuando cambia ejercicio
  useEffect(() => {
    if (currentExercise) {
      setCode(currentExercise.starterCode);
      setOutput('');
      setError(null);
      setIsCorrect(null);
      setShowHint(false);
      setShowSolution(false);
      setStartTime(Date.now());
      setElapsedTime(0);
    }
  }, [currentExercise]);

  // Timer - solo corre si hasStarted Y no es correcto aún - pausa cuando la pestaña está oculta
  const elapsedTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!hasStarted || isCorrect === true) return;

    const updateTimer = () => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    };

    const startTimer = () => {
      if (elapsedTimerRef.current) return;
      elapsedTimerRef.current = window.setInterval(updateTimer, 1000);
    };

    const stopTimer = () => {
      if (elapsedTimerRef.current) {
        clearInterval(elapsedTimerRef.current);
        elapsedTimerRef.current = null;
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
  }, [startTime, hasStarted, isCorrect]);

  // Lista de módulos conceptuales que no están disponibles en Pyodide
  const CONCEPTUAL_MODULES = [
    'airflow',
    'pyspark', 
    'spark',
    'kafka',
    'confluent_kafka',
    'boto3',
    'azure',
    'google.cloud',
    'snowflake',
    'databricks',
    'dbt',
    'great_expectations',
    'prefect',
    'dagster',
    'luigi',
    'celery',
    'redis',
    'pymongo',
    'psycopg2',
    'sqlalchemy',
    'tensorflow',
    'torch',
    'keras',
  ];

  // Detectar si el código usa módulos conceptuales
  const detectConceptualModules = (codeToCheck: string): string[] => {
    const foundModules: string[] = [];
    for (const mod of CONCEPTUAL_MODULES) {
      // Buscar import patterns: "from X import", "import X"
      const regex = new RegExp(`(?:from\\s+${mod}|import\\s+${mod})`, 'i');
      if (regex.test(codeToCheck)) {
        foundModules.push(mod);
      }
    }
    return foundModules;
  };

  // Ejecutar código Python
  const executeCode = useCallback(async () => {
    if (!pyodide || !code.trim()) return;

    setIsRunning(true);
    setOutput('');
    setError(null);
    setIsCorrect(null);
    outputRef.current = [];

    // 🎓 Detectar módulos conceptuales (Airflow, Spark, etc.)
    const conceptualModules = detectConceptualModules(code);
    
    if (conceptualModules.length > 0) {
      // Este es un ejercicio CONCEPTUAL - validación estática
      try {
        // Intentar compilar el código para verificar sintaxis (sin ejecutar los imports)
        // Reemplazamos los imports problemáticos con imports mock
        let mockCode = code;
        for (const mod of conceptualModules) {
          // Crear mock simple del módulo
          mockCode = mockCode.replace(
            new RegExp(`from\\s+${mod}[^\\n]*`, 'gi'),
            `# [Mock] ${mod} (conceptual)`
          );
          mockCode = mockCode.replace(
            new RegExp(`import\\s+${mod}[^\\n]*`, 'gi'),
            `# [Mock] ${mod} (conceptual)`
          );
        }
        
        // Validar sintaxis Python básica ejecutando código limpio
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
        `);
        
        // Ejecutar el testCode del ejercicio (que debería tener la validación estática)
        await pyodide.runPythonAsync(currentExercise.testCode);
        const testOutput = pyodide.runPython('sys.stdout.getvalue()');
        
        // Mostrar mensaje amigable
        const moduleNames = conceptualModules.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');
        const conceptualMessage = language === 'en' 
          ? `🎓 CONCEPTUAL EXERCISE\n\n📦 ${moduleNames} is not available in the browser.\nThis exercise validates your understanding of the code structure.\n\n`
          : language === 'pt'
          ? `🎓 EXERCÍCIO CONCEITUAL\n\n📦 ${moduleNames} não está disponível no navegador.\nEste exercício valida seu entendimento da estrutura do código.\n\n`
          : `🎓 EJERCICIO CONCEPTUAL\n\n📦 ${moduleNames} no está disponible en el navegador.\nEste ejercicio valida tu entendimiento de la estructura del código.\n\n`;
        
        if (testOutput.includes('✅')) {
          setIsCorrect(true);
          setOutput(conceptualMessage + testOutput);
          
          if (!completedExercises.includes(currentExercise.id)) {
            if (isFreeUser && energySystem) {
              const canProceed = energySystem.useExercise();
              if (!canProceed) return;
            }
            
            const newCompletedList = [...completedExercises, currentExercise.id];
            setCompletedExercises(newCompletedList);
            onComplete?.(currentExercise.id, elapsedTime, currentExercise.xpReward);
            
            // Sincronizar con roadmap para ejercicios conceptuales también
            if (onSyncRoadmap) {
              const category = currentExercise.subcategory || 'python';
              const categoryMap: Record<string, string> = {
                'airflow': 'airflow',
                'spark': 'spark',
                'kafka': 'kafka',
                'basics': 'python',
                'data-engineering': 'python',
                'pandas': 'pandas',
              };
              const syncCategory = categoryMap[category] || 'python';
              const countInCategory = newCompletedList.filter(id => {
                const ex = ALL_PYTHON_EXERCISES.find(e => e.id === id);
                return ex && ex.subcategory === category;
              }).length;
              onSyncRoadmap(syncCategory, countInCategory);
            }
          }
        } else {
          setIsCorrect(false);
          setOutput(conceptualMessage + '❌ Revisá la estructura de tu código');
        }
        
        pyodide.runPython('sys.stdout = sys.__stdout__');
        setIsRunning(false);
        return;
        
      } catch (syntaxErr: any) {
        // Error de sintaxis en el código
        const moduleNames = conceptualModules.map(m => m.charAt(0).toUpperCase() + m.slice(1)).join(', ');
        const conceptualMessage = language === 'en'
          ? `🎓 CONCEPTUAL EXERCISE (${moduleNames})\n\n`
          : language === 'pt'
          ? `🎓 EXERCÍCIO CONCEITUAL (${moduleNames})\n\n`
          : `🎓 EJERCICIO CONCEPTUAL (${moduleNames})\n\n`;
        setError(conceptualMessage + (syntaxErr.message || 'Error de sintaxis'));
        setIsCorrect(false);
        setIsRunning(false);
        return;
      }
    }

    try {
      // Redirigir stdout
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      // Ejecutar código del usuario
      await pyodide.runPythonAsync(code);

      // Capturar output
      const stdout = pyodide.runPython('sys.stdout.getvalue()');
      setOutput(stdout);

      // Ejecutar tests
      try {
        await pyodide.runPythonAsync(currentExercise.testCode);
        const testOutput = pyodide.runPython('sys.stdout.getvalue()');
        
        if (testOutput.includes('✅')) {
          setIsCorrect(true);
          setOutput(testOutput);
          
          if (!completedExercises.includes(currentExercise.id)) {
            // 🔋 ENERGY CHECK: Si es usuario FREE, verificar energía antes de dar recompensa
            if (isFreeUser && energySystem) {
              const canProceed = energySystem.useExercise();
              if (!canProceed) {
                // No tiene energía - el modal se muestra automáticamente
                // No marcar como completado ni dar XP
                return;
              }
            }
            
            const newCompletedList = [...completedExercises, currentExercise.id];
            setCompletedExercises(newCompletedList);
            onComplete?.(currentExercise.id, elapsedTime, currentExercise.xpReward);
            
            // Sincronizar con roadmap - contar ejercicios por categoría
            if (onSyncRoadmap) {
              const category = currentExercise.subcategory || 'python';
              const categoryMap: Record<string, string> = {
                'basics': 'python',
                'data-engineering': 'python',
                'pandas': 'pandas',
                'fundamentals': 'sql_fundamentals',
                'joins': 'sql_joins',
                'aggregations': 'sql_aggregations',
              };
              const syncCategory = categoryMap[category] || 'python';
              const countInCategory = newCompletedList.filter(id => {
                const ex = ALL_PYTHON_EXERCISES.find(e => e.id === id);
                return ex && (ex.subcategory === category || (category === 'basics' && ex.subcategory === 'basics'));
              }).length;
              onSyncRoadmap(syncCategory, countInCategory);
            }
          }
        } else {
          setIsCorrect(false);
        }
      } catch (testErr: any) {
        setIsCorrect(false);
        // Parsear AssertionError para mensaje más amigable
        const errMsg = testErr.message || '';
        if (errMsg.includes('AssertionError')) {
          // Extraer el mensaje del assert
          const match = errMsg.match(/AssertionError:\s*(.+?)(?:\n|$)/);
          const assertMsg = match ? match[1] : '';
          
          // Intentar extraer "Expected X, got Y" del mensaje
          const expectedMatch = assertMsg.match(/[Ee]xpected\s+(.+?),\s*got\s+(.+)/);
          if (expectedMatch) {
            setOutput(stdout + '\n\n❌ ' + t('playground.incorrect') + '\n\n📋 ' + t('playground.expected') + ': ' + expectedMatch[1] + '\n📝 ' + t('playground.output') + ': ' + expectedMatch[2]);
          } else if (assertMsg) {
            setOutput(stdout + '\n\n❌ ' + assertMsg);
          } else {
            setOutput(stdout + '\n\n❌ Test fallido - revisá tu código');
          }
        } else {
          setOutput(stdout + '\n\n❌ Error: ' + errMsg);
        }
      }
    } catch (err: any) {
      setError(err.message);
      setIsCorrect(false);
    } finally {
      setIsRunning(false);
      // Restaurar stdout
      pyodide.runPython('sys.stdout = sys.__stdout__');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pyodide, code, currentExercise, elapsedTime, completedExercises, onComplete, isFreeUser, energySystem, t, language]);

  // Siguiente ejercicio
  const nextExercise = () => {
    const nextIndex = (exerciseIndex + 1) % filteredExercises.length;
    setExerciseIndex(nextIndex);
  };

  // Formatear tiempo
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Colores de dificultad
  const difficultyColors = {
    easy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    hard: 'bg-red-500/20 text-red-400 border-red-500/30',
    expert: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  };

  const difficultyLabels = {
    easy: t('practice.difficulty.easy'),
    medium: t('practice.difficulty.medium'),
    hard: t('practice.difficulty.hard'),
    expert: t('practice.difficulty.expert'),
  };

  if (isLoading) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-300">{t('common.loading')}</span>
          <span className="text-xs text-slate-500">{t('pythonPlayground.loadingFirst')}</span>
        </div>
      </div>
    );
  }

  if (!currentExercise) {
    return (
      <div className="bg-slate-900 rounded-2xl p-8 border border-slate-700 text-center">
        <p className="text-slate-400">{t('errors.notFound')}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 min-h-[600px]">
      {/* SIDEBAR - Categorías y ejercicios (igual que SQL) */}
      <div className="w-72 flex-shrink-0 space-y-4">
        {/* Progreso general */}
        <div className="bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-red-500/10 rounded-xl p-4 border border-yellow-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{progressStats.completed}<span className="text-yellow-400">/{progressStats.total}</span></div>
                <div className="text-xs text-yellow-400 font-medium">🏆 {t('practice.completed')}</div>
              </div>
            </div>
            <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-500 via-orange-400 to-red-500 transition-all shadow-lg shadow-yellow-500/30"
                style={{ width: `${Math.round((progressStats.completed / progressStats.total) * 100) || 0}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-slate-400 text-center">
              {Math.round((progressStats.completed / progressStats.total) * 100) || 0}% {t('common.completed')}
            </div>
          </div>
        </div>

        {/* Categorías */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-3 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span className="text-lg">🐍</span> {t('practice.category')}
            </h3>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            <button
              onClick={() => { setSelectedCategory('all'); setExerciseIndex(0); }}
              className={`w-full p-3 text-left flex items-center gap-3 transition-all ${
                selectedCategory === 'all' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-l-4 border-yellow-500' : 'hover:bg-slate-700/50'
              }`}
            >
              <span className="text-2xl">🌍</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white">{t('practice.all')}</div>
                <div className="text-xs text-slate-400">{progressStats.total} {t('practice.exercises')}</div>
              </div>
            </button>
            {PYTHON_CATEGORIES.map(cat => {
              const stats = progressStats.byCategory[cat.id];
              const isActive = selectedCategory === cat.id;
              const isCompleted = stats && stats.completed === stats.total && stats.total > 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setExerciseIndex(0); }}
                  className={`w-full p-3 text-left flex items-center gap-3 transition-all ${
                    isActive ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-l-4 border-yellow-500' : 
                    isCompleted ? 'bg-emerald-500/5' : 'hover:bg-slate-700/50'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white truncate">{tExercise(cat.name, 'es')}</div>
                    <div className="text-xs text-slate-400">{stats?.completed || 0}/{stats?.total || 0}</div>
                  </div>
                  {isCompleted && (
                    <span className="text-xl">👑</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista de ejercicios */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-3 border-b border-slate-700 flex items-center justify-between bg-gradient-to-r from-slate-800 to-slate-900">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span>🎯</span> {t('practice.exercises')}
            </h3>
            <span className="text-xs bg-slate-700 px-2 py-1 rounded-full text-slate-300 font-bold">{filteredExercises.length}</span>
          </div>
          <div className="max-h-[250px] overflow-y-auto">
            {filteredExercises.map((ex, idx) => {
              const isCompleted = completedExercises.includes(ex.id);
              const isCurrent = idx === exerciseIndex;
              return (
                <button
                  key={ex.id}
                  onClick={() => { if (!isTransitioning) setExerciseIndex(idx); }}
                  className={`w-full p-3 text-left flex items-center gap-3 transition-all ${
                    isCurrent ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border-l-4 border-yellow-500' : 
                    isCompleted ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : 'hover:bg-slate-700/50'
                  }`}
                >
                  <span className="text-lg w-6 text-center">
                    {isCompleted ? '✅' : isCurrent ? '⚡' : '○'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm truncate ${isCurrent ? 'text-yellow-300 font-bold' : isCompleted ? 'text-emerald-300' : 'text-white'}`}>
                      {ex.title}
                    </div>
                    <div className="text-xs text-slate-500">+{ex.xpReward} XP</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    ex.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
                    ex.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    ex.difficulty === 'hard' ? 'bg-red-500/20 text-red-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {ex.difficulty === 'easy' ? '🌱' : ex.difficulty === 'medium' ? '⚔️' : ex.difficulty === 'hard' ? '🔥' : '💀'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT - Ejercicio */}
      <div className="flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden">
        {/* Header del ejercicio - ÉPICO (igual que SQL) */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 px-6 py-5 border-b border-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-orange-500/5" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
                completedExercises.includes(currentExercise.id) 
                  ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-emerald-500/30' 
                  : 'bg-gradient-to-br from-slate-700 to-slate-600'
              }`}>
                {completedExercises.includes(currentExercise.id) 
                  ? <span className="text-2xl">🏆</span>
                  : <span className="text-2xl">🐍</span>
                }
              </div>
              <div>
                <h3 className="font-black text-white text-2xl tracking-tight">{currentExercise.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`text-xs px-3 py-1.5 rounded-full font-black ${difficultyColors[currentExercise.difficulty]}`}>
                    {currentExercise.difficulty === 'easy' ? '🌱 ' : currentExercise.difficulty === 'medium' ? '⚔️ ' : currentExercise.difficulty === 'hard' ? '🔥 ' : '💀 '}
                    {difficultyLabels[currentExercise.difficulty]}
                  </span>
                  <span className="text-sm text-yellow-400 font-black flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    +{currentExercise.xpReward} XP
                  </span>
                  {currentExercise.requiredImports?.includes('pandas') && (
                    <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30 font-bold">
                      🐼 Pandas
                    </span>
                  )}
                  {currentExercise.interviewFrequency === 'very_high' && (
                    <span className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 font-black border border-orange-500/30">
                      🎯 TOP en Entrevistas
                    </span>
                  )}
                  {currentExercise.interviewFrequency === 'high' && (
                    <span className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30">
                      💼 Común en Entrevistas
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer o Start Button */}
              {hasStarted ? (
                <div className="text-right bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700">
                  <div className="text-3xl font-mono font-black text-white">{formatTime(elapsedTime)}</div>
                  <div className="text-xs text-slate-400 font-medium">⏱️ {t('practice.time')}</div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setHasStarted(true);
                    setStartTime(Date.now());
                    setElapsedTime(0);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-yellow-500/30"
                >
                  <Play className="w-5 h-5" />
                  {t('practice.start')}
                </button>
              )}
              <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-1.5 border border-slate-600">
                <button
                  onClick={() => { if (exerciseIndex > 0 && !isTransitioning) setExerciseIndex(exerciseIndex - 1); }}
                  disabled={exerciseIndex === 0 || isTransitioning}
                  className="p-2.5 rounded-lg bg-slate-700 text-white disabled:opacity-30 hover:bg-slate-600 transition-colors font-bold"
                >
                  ←
                </button>
                <span className="text-sm text-white px-4 font-black">
                  {exerciseIndex + 1} <span className="text-slate-500">/</span> {filteredExercises.length}
                </span>
                <button
                  onClick={() => { if (exerciseIndex < filteredExercises.length - 1 && !isTransitioning) setExerciseIndex(exerciseIndex + 1); }}
                  disabled={exerciseIndex >= filteredExercises.length - 1 || isTransitioning}
                  className="p-2.5 rounded-lg bg-slate-700 text-white disabled:opacity-30 hover:bg-slate-600 transition-colors font-bold"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5 relative">
          {/* 📋 CONSIGNA - Lo que tienen que hacer */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-5 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500" />
            <div className="flex items-start gap-4">
              <span className="text-2xl">📋</span>
              <div>
                <h4 className="text-sm font-black text-blue-400 mb-2 uppercase tracking-wider">
                  {language === 'es' ? 'CONSIGNA' : language === 'pt' ? 'INSTRUÇÃO' : 'INSTRUCTIONS'}
                </h4>
                <p className="text-slate-200 text-base leading-relaxed">{currentExercise.description}</p>
              </div>
            </div>
          </div>

          {/* 🎯 RESULTADO ESPERADO - Colapsable */}
          {currentExercise.testCode && (
            <details open className="bg-gradient-to-r from-emerald-500/10 to-green-500/5 rounded-xl border border-emerald-500/30 overflow-hidden group">
              <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-emerald-500/5 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="font-bold text-white">
                    🎯 {language === 'es' ? 'RESULTADO ESPERADO' : language === 'pt' ? 'RESULTADO ESPERADO' : 'EXPECTED OUTPUT'}
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-emerald-400 group-open:rotate-180 transition-transform" />
              </summary>
              
              <div className="px-4 pb-4 border-t border-emerald-500/20">
                {/* Parsear assertions del testCode para mostrar valores esperados */}
                <div className="space-y-2 text-sm mt-3">
                  {(() => {
                    const testCode = currentExercise.testCode;
                    const expectations: { variable: string; expected: string }[] = [];
                    
                    const assertMatches = Array.from(testCode.matchAll(/assert\s+(.+?)\s*==\s*(.+?)(?:,|\n|$)/gm));
                    for (const match of assertMatches) {
                      const left = match[1].trim();
                      const right = match[2].trim().replace(/^['"]|['"]$/g, '');
                      
                      if (left.length < 50 && right.length < 50) {
                        expectations.push({ variable: left, expected: right });
                      }
                    }
                    
                    const expectedMatches = Array.from(testCode.matchAll(/[Ee]xpected\s+['"]?([^'"]+?)['"]?,\s*got/g));
                    for (const match of expectedMatches) {
                      if (!expectations.find(e => e.expected === match[1])) {
                        expectations.push({ variable: '', expected: match[1] });
                      }
                    }
                    
                    const limitedExpectations = expectations.slice(0, 5);
                    
                    if (limitedExpectations.length === 0) {
                      return (
                        <p className="text-emerald-300/70 text-xs">
                          {language === 'es' ? 'Ejecutá tu código para ver si es correcto.' : 
                           language === 'pt' ? 'Execute seu código para ver se está correto.' :
                           'Run your code to check if it\'s correct.'}
                        </p>
                      );
                    }
                    
                    return (
                      <>
                        {limitedExpectations.map((exp, i) => (
                          <div key={i} className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-3 py-2 overflow-x-auto">
                            <code className="text-emerald-400 font-mono text-xs font-bold">{exp.variable}</code>
                            <span className="text-slate-500">=</span>
                            <code className="text-white font-mono text-xs">{exp.expected}</code>
                          </div>
                        ))}
                        {expectations.length > 5 && (
                          <p className="text-slate-500 text-xs">+{expectations.length - 5} más...</p>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            </details>
          )}

          {/* Teoría (colapsable) - Estilo Premium */}
          <div className="bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => setShowTheory(!showTheory)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="font-bold text-white">📚 {t('playground.theory')}</span>
              </div>
              {showTheory ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            
            {showTheory && (
              <div className="px-5 pb-6 border-t border-slate-700/50">
                {/* Contenido de teoría con mejor tipografía */}
                <div className="mt-5 space-y-4 text-[15px] leading-relaxed [&>p]:text-slate-300 [&_code]:bg-slate-900 [&_code]:text-yellow-300 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-slate-900 [&_pre]:text-slate-200 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto">
                  <ReactMarkdown>{currentExercise.theory}</ReactMarkdown>
                </div>
                
                {currentExercise.realWorldExample && (
                  <div className="mt-5 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/5 rounded-xl border border-yellow-500/30">
                    <div className="flex items-center gap-2 text-sm font-bold text-yellow-400 mb-2">
                      <Zap className="w-4 h-4" />
                      {t('playground.realLife')}
                    </div>
                    <p className="text-slate-300 text-sm">{currentExercise.realWorldExample}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MODO INMERSIVO PREMIUM - Fullscreen focus mode */}
          {isExpanded && (
            <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
              {/* Header Premium */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                  {/* Toggle paneles */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setShowExerciseList(!showExerciseList)}
                      className={`p-2 rounded-lg transition-all ${showExerciseList ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                      title={showExerciseList ? 'Ocultar ejercicios' : 'Mostrar ejercicios'}
                    >
                      {showExerciseList ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setShowConsigna(!showConsigna)}
                      className={`p-2 rounded-lg transition-all ${showConsigna ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                      title={showConsigna ? 'Ocultar consigna' : 'Mostrar consigna'}
                    >
                      {showConsigna ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Selector de Arena/Categoría */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); setExerciseIndex(0); }}
                    className="bg-slate-800 text-slate-300 text-xs px-2 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="all">🎯 {t('practice.all')}</option>
                    {PYTHON_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.icon} {tExercise(cat.name, 'es')}</option>
                    ))}
                  </select>

                  {/* Navegación ejercicios */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { if (exerciseIndex > 0) setExerciseIndex(exerciseIndex - 1); }}
                      disabled={exerciseIndex === 0}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-all"
                    >
                      <ChevronDown className="w-4 h-4 rotate-90" />
                    </button>
                    <span className="text-blue-400 font-mono font-bold text-sm">{exerciseIndex + 1}/{filteredExercises.length}</span>
                    <button
                      onClick={() => { if (exerciseIndex < filteredExercises.length - 1) setExerciseIndex(exerciseIndex + 1); }}
                      disabled={exerciseIndex === filteredExercises.length - 1}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white transition-all"
                    >
                      <ChevronDown className="w-4 h-4 -rotate-90" />
                    </button>
                  </div>

                  {/* Título */}
                  <span className="font-semibold text-white truncate max-w-[250px] text-sm">{currentExercise.title}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    currentExercise.difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
                    currentExercise.difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {currentExercise.difficulty === 'easy' ? 'Fácil' : currentExercise.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded-lg text-xs">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span className="font-mono text-slate-300">{Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-500/20 rounded-lg transition-all"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="flex-1 flex overflow-hidden">
                {/* Panel izquierdo - Lista de ejercicios (colapsable y redimensionable) */}
                {showExerciseList && (
                  <div className="bg-slate-900/30 border-r border-slate-700/50 flex flex-col overflow-hidden relative" style={{ width: exerciseListWidth, minWidth: 150, maxWidth: 500 }}>
                    {/* Handle de resize */}
                    <div
                      onMouseDown={(e) => handleResizeStart('exercises', e)}
                      className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-emerald-500/50 transition-colors z-10 ${isResizing === 'exercises' ? 'bg-emerald-500' : ''}`}
                    />
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                      {filteredExercises.map((ex, idx) => {
                        const exerciseTitle = typeof ex.title === 'string' ? ex.title : (ex.title as any).es || (ex.title as any).en || ex.title;
                        const isCompleted = completedExercises.includes(ex.id);
                        const isCurrent = idx === exerciseIndex;
                        return (
                          <button
                            key={ex.id}
                            onClick={() => setExerciseIndex(idx)}
                            className={`w-full text-left p-2 rounded-lg transition-all text-xs ${
                              isCurrent ? 'bg-blue-500/20 border border-blue-500/50 text-white' : 'hover:bg-slate-800/50 text-slate-400'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                isCompleted ? 'bg-emerald-500/20 text-emerald-400' : isCurrent ? 'bg-blue-500 text-white' : 'bg-slate-700'
                              }`}>
                                {isCompleted ? <CheckCircle className="w-2.5 h-2.5" /> : idx + 1}
                              </span>
                              <span className="flex-1 truncate">{exerciseTitle}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="p-2 border-t border-slate-700/50 bg-slate-900/50">
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${(completedExercises.length / filteredExercises.length) * 100}%` }} />
                      </div>
                      <div className="text-[10px] text-slate-500 mt-1 text-center">{completedExercises.length}/{filteredExercises.length}</div>
                    </div>
                  </div>
                )}

                {/* Panel consigna (colapsable y redimensionable) - scroll sin barra visible */}
                {showConsigna && (
                  <div 
                    className="bg-slate-900/20 border-r border-slate-700/50 flex flex-col overflow-y-auto p-3 space-y-3 relative scrollbar-hide" 
                    style={{ width: consignaWidth, minWidth: 150, maxWidth: 500, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {/* Handle de resize */}
                    <div
                      onMouseDown={(e) => handleResizeStart('consigna', e)}
                      className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-cyan-500/50 transition-colors z-10 ${isResizing === 'consigna' ? 'bg-cyan-500' : ''}`}
                    />
                    <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                      <h3 className="text-xs font-bold text-blue-400 mb-2">📋 {t('playground.mission')}</h3>
                      <p className="text-slate-300 text-xs leading-relaxed">{currentExercise.description}</p>
                    </div>

                    {/* 🎯 Resultado esperado en modo enfocado para Python */}
                    {currentExercise.testCode && (
                      <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20">
                        <h3 className="text-xs font-bold text-emerald-400 mb-2">🎯 {language === 'es' ? 'Resultado Esperado' : 'Expected Output'}</h3>
                        <div className="space-y-1.5 text-[10px]">
                          {(() => {
                            const testCode = currentExercise.testCode;
                            const expectations: { variable: string; expected: string }[] = [];
                            
                            // Buscar patrones: assert variable == valor
                            const assertMatches = Array.from(testCode.matchAll(/assert\s+(\w+)\s*==\s*(.+?)(?:,|$)/gm));
                            for (const match of assertMatches) {
                              expectations.push({
                                variable: match[1],
                                expected: match[2].trim().replace(/^['"]|['"]$/g, '')
                              });
                            }
                            
                            // Buscar patrones: Expected X, got Y en los mensajes
                            const expectedMatches = Array.from(testCode.matchAll(/[Ee]xpected\s+['"]?(.+?)['"]?,\s*got/g));
                            for (const match of expectedMatches) {
                              if (!expectations.find(e => e.expected === match[1])) {
                                expectations.push({
                                  variable: '',
                                  expected: match[1]
                                });
                              }
                            }
                            
                            if (expectations.length === 0) {
                              return (
                                <p className="text-emerald-300/70 text-[9px]">
                                  {language === 'es' ? 'Ejecutá tu código para ver si es correcto.' : 'Run your code to check if it\'s correct.'}
                                </p>
                              );
                            }
                            
                            return expectations.slice(0, 4).map((exp, i) => (
                              <div key={i} className="flex items-center gap-1.5 bg-slate-800/50 rounded px-2 py-1">
                                {exp.variable && (
                                  <code className="text-emerald-400 font-mono font-bold">{exp.variable}</code>
                                )}
                                {exp.variable && <span className="text-slate-500">=</span>}
                                <code className="text-white font-mono">{exp.expected.length > 30 ? exp.expected.slice(0, 30) + '...' : exp.expected}</code>
                              </div>
                            ));
                          })()}
                        </div>
                      </div>
                    )}

                    {/* 📚 Teoría colapsable en modo enfocado */}
                    {currentExercise.theory && (
                      <details className="bg-cyan-500/10 rounded-lg border border-cyan-500/20 overflow-hidden group">
                        <summary className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-cyan-500/20 transition-colors">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="text-xs font-bold text-cyan-400">📚 {t('playground.theory')}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 text-cyan-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="px-3 pb-3 border-t border-cyan-500/20">
                          <div className="mt-2 text-[11px] leading-relaxed text-slate-300 [&_code]:bg-slate-900 [&_code]:text-amber-300 [&_code]:px-1 [&_code]:rounded [&_pre]:bg-slate-900 [&_pre]:text-slate-200 [&_pre]:p-2 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:text-[10px] max-h-[200px] overflow-y-auto scrollbar-hide">
                            <ReactMarkdown>{currentExercise.theory}</ReactMarkdown>
                          </div>
                          {currentExercise.realWorldExample && (
                            <div className="mt-2 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400 mb-1">
                                🌐 {language === 'es' ? 'Caso real' : 'Real world'}
                              </div>
                              <p className="text-[10px] text-slate-400">{currentExercise.realWorldExample}</p>
                            </div>
                          )}
                        </div>
                      </details>
                    )}

                    {currentExercise.hint && (
                      <button onClick={() => setShowHint(!showHint)} className="w-full text-left p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs hover:bg-yellow-500/20">
                        <div className="flex items-center gap-2"><Lightbulb className="w-3 h-3" />{showHint ? 'Ocultar pista' : t('playground.hint')}</div>
                        {showHint && <p className="mt-2 text-yellow-300/80">{currentExercise.hint}</p>}
                      </button>
                    )}
                    <div className="w-full text-left p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">
                      <button onClick={() => setShowSolution(!showSolution)} className="flex items-center gap-2 w-full hover:text-purple-300 transition-colors">
                        <Code className="w-3 h-3" />{showSolution ? 'Ocultar solución' : t('playground.solution')}
                      </button>
                      {showSolution && currentExercise.solution && (
                        <div className="mt-2 relative" onClick={(e) => e.stopPropagation()} onMouseUp={(e) => e.stopPropagation()}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              navigator.clipboard.writeText(currentExercise.solution || '');
                              const btn = e.currentTarget;
                              btn.textContent = '✓';
                              setTimeout(() => { btn.textContent = '📋'; }, 1500);
                            }}
                            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white text-xs rounded transition-colors z-10"
                            title={t('playground.copy')}
                          >
                            📋
                          </button>
                          <pre className="text-purple-300 font-mono text-[10px] bg-slate-950 p-2 pr-8 rounded overflow-x-auto select-text cursor-text">{currentExercise.solution}</pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Panel principal - Editor + Output */}
                <div className="flex-1 flex flex-col bg-slate-950/50 p-3 gap-3">
                  {/* Editor */}
                  <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden min-h-0">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-xs text-slate-400">editor.py</span>
                      <div className="flex gap-1">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                      </div>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) executeCode();
                        if (e.key === 'Escape') setIsExpanded(false);
                        if (e.key === 'Tab') {
                          e.preventDefault();
                          const ta = e.currentTarget;
                          const start = ta.selectionStart;
                          setCode(code.substring(0, start) + '    ' + code.substring(ta.selectionEnd));
                          requestAnimationFrame(() => { ta.selectionStart = ta.selectionEnd = start + 4; });
                        }
                      }}
                      placeholder="# Tu código Python aquí..."
                      className="flex-1 w-full bg-transparent text-blue-400 font-mono text-sm p-3 focus:outline-none resize-none"
                      spellCheck={false}
                      autoFocus
                    />
                  </div>

                  {/* Output - debajo del editor */}
                  <div className="h-[140px] bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 border-b border-slate-700/50">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-slate-400" />
                        <span className="text-xs text-slate-400">{t('playground.output')}</span>
                      </div>
                      {isCorrect !== null && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                          {isCorrect ? t('playground.correct') : t('playground.incorrect')}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 p-3 overflow-y-auto font-mono text-sm">
                      {error ? <span className="text-red-400">{error}</span> : output ? <span className="text-emerald-400 whitespace-pre-wrap">{output}</span> : <span className="text-slate-600 italic">...</span>}
                    </div>
                  </div>

                  {/* Barra de acciones */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={executeCode} disabled={!code.trim() || isRunning} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-2 px-4 rounded-lg text-sm">
                        {isRunning ? <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> {t('playground.running')}</> : <><Play className="w-4 h-4" /> {t('playground.run')}</>}
                      </button>
                      <button onClick={() => { setCode(currentExercise.starterCode); setOutput(''); setError(null); setIsCorrect(null); }} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg" aria-label="Reiniciar código">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <span className="text-[10px] text-slate-500">Ctrl+Enter</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {exerciseIndex > 0 && <button onClick={() => setExerciseIndex(exerciseIndex - 1)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg" aria-label="Ejercicio anterior"><ChevronDown className="w-4 h-4 rotate-90" /></button>}
                      <button
                        onClick={() => { if (exerciseIndex < filteredExercises.length - 1) setExerciseIndex(exerciseIndex + 1); }}
                        disabled={exerciseIndex === filteredExercises.length - 1}
                        className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm font-bold ${isCorrect ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30'}`}
                      >
                        {t('playground.nextExercise')} <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Editor Python - Modo normal */}
          <div>
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-slate-400">{t('pythonPlayground.yourCode')}</label>
              <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-2 text-xs font-medium text-blue-400 hover:text-white bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-400 px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-blue-500/10"
                title="Modo inmersivo"
              >
                <Maximize2 className="w-3 h-3" />
                {t('playground.focusedMode')}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  executeCode();
                }
                if (e.key === 'Tab') {
                  e.preventDefault();
                  const textarea = e.currentTarget;
                  const start = textarea.selectionStart;
                  const end = textarea.selectionEnd;
                  const newCode = code.substring(0, start) + '    ' + code.substring(end);
                  setCode(newCode);
                  requestAnimationFrame(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 4;
                  });
                }
              }}
              placeholder="# Tu código Python aquí..."
              className="w-full h-48 min-h-[120px] bg-slate-950 text-blue-400 font-mono text-sm p-4 rounded-xl border border-slate-700 focus:border-blue-500 focus:outline-none resize-y"
              spellCheck={false}
            />
            <p className="text-xs text-slate-500 mt-1">{t('pythonPlayground.shortcuts')}</p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={executeCode}
              disabled={!code.trim() || isRunning}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-all"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t('playground.running')}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  {t('playground.run')}
                </>
              )}
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 font-medium py-2 px-4 rounded-lg transition-all border border-yellow-600/30"
            >
              <Lightbulb className="w-4 h-4" />
              {t('playground.hint')}
            </button>

            <button
              onClick={() => setShowSolution(!showSolution)}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2 px-4 rounded-lg transition-all"
            >
              {t('playground.solution')}
            </button>

            <button
              onClick={() => {
                setCode(currentExercise.starterCode);
                setOutput('');
                setError(null);
                setIsCorrect(null);
                setShowHint(false);
                setShowSolution(false);
                setShowTheory(false);
                setHasStarted(false);
                setStartTime(Date.now());
                setElapsedTime(0);
              }}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2 px-4 rounded-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              {t('playground.reset')}
            </button>

            {isCorrect && (
              <button
                onClick={nextExercise}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all ml-auto"
              >
                {t('playground.nextExercise')} <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Pista */}
          {showHint && currentExercise.hint && (
            <div className="bg-yellow-900/20 border border-yellow-700 text-yellow-300 rounded-xl p-4">
              <p className="font-semibold mb-2">💡 {t('playground.hint')}:</p>
              <p>{currentExercise.hint}</p>
            </div>
          )}

          {/* AI Tutor */}
          {userEmail && (
            <AITutor
              exerciseTitle={currentExercise.title}
              exerciseDescription={currentExercise.description}
              userCode={code}
              language="python"
              userEmail={userEmail}
              isPremium={!isFreeUser}
            />
          )}

          {/* Solución */}
          {showSolution && currentExercise.solution && (
            <div className="bg-purple-900/20 border border-purple-700 rounded-xl p-4">
              <p className="font-semibold text-purple-400 mb-2">🔑 {t('playground.solution')}:</p>
              <div className="relative">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentExercise.solution || '');
                    const btn = document.getElementById('copy-solution-python');
                    if (btn) {
                      btn.textContent = '✓';
                      setTimeout(() => { btn.textContent = '📋'; }, 1500);
                    }
                  }}
                  id="copy-solution-python"
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors z-10"
                  title={t('playground.copy')}
                >
                  📋
                </button>
                <pre className="bg-slate-950 p-3 pr-12 rounded-lg text-sm overflow-x-auto select-text cursor-text">
                  <code className="text-purple-300 select-text">{currentExercise.solution}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Error - Mejorado con parsing inteligente */}
          {error && (
            <div className="bg-red-900/20 border border-red-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="font-semibold text-red-400">{t('common.error')}</span>
              </div>
              
              {/* Parsear el error para hacerlo más legible */}
              {(() => {
                const errMsg = error;
                
                // NameError - variable no definida
                if (errMsg.includes('NameError')) {
                  const match = errMsg.match(/NameError:\s*name '(\w+)' is not defined/);
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🔍</span>
                        <p className="text-red-300 text-lg">
                          <strong>{language === 'es' ? 'Variable no definida' : language === 'pt' ? 'Variável não definida' : 'Undefined variable'}:</strong>
                        </p>
                      </div>
                      <code className="block bg-red-900/30 px-3 py-2 rounded text-lg text-red-200">{match?.[1] || '?'}</code>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <p className="text-slate-300 text-sm">
                          💡 {language === 'es' ? 'Asegurate de definir esta variable ANTES de usarla.' : 
                              language === 'pt' ? 'Certifique-se de definir esta variável ANTES de usá-la.' :
                              'Make sure to define this variable BEFORE using it.'}
                        </p>
                      </div>
                    </div>
                  );
                }
                
                // SyntaxError
                if (errMsg.includes('SyntaxError')) {
                  const lineMatch = errMsg.match(/line (\d+)/);
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">⚠️</span>
                        <p className="text-red-300 text-lg">
                          <strong>{language === 'es' ? 'Error de sintaxis' : language === 'pt' ? 'Erro de sintaxe' : 'Syntax error'}</strong>
                          {lineMatch && <span className="text-amber-400 ml-2">(línea {lineMatch[1]})</span>}
                        </p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <p className="text-slate-300 text-sm mb-2">
                          💡 {language === 'es' ? 'Revisá:' : language === 'pt' ? 'Verifique:' : 'Check:'}
                        </p>
                        <ul className="text-slate-400 text-sm space-y-1 ml-4 list-disc">
                          <li>{language === 'es' ? 'Paréntesis y corchetes balanceados' : 'Balanced parentheses and brackets'}</li>
                          <li>{language === 'es' ? 'Comillas de apertura y cierre' : 'Opening and closing quotes'}</li>
                          <li>{language === 'es' ? 'Dos puntos (:) al final de if/for/def' : 'Colon (:) after if/for/def'}</li>
                          <li>{language === 'es' ? 'Indentación correcta (4 espacios)' : 'Correct indentation (4 spaces)'}</li>
                        </ul>
                      </div>
                    </div>
                  );
                }
                
                // TypeError
                if (errMsg.includes('TypeError')) {
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">🔄</span>
                        <p className="text-red-300 text-lg">
                          <strong>{language === 'es' ? 'Error de tipo' : language === 'pt' ? 'Erro de tipo' : 'Type error'}</strong>
                        </p>
                      </div>
                      <pre className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded overflow-x-auto border border-slate-700">
                        {errMsg.split('\n').slice(-2).join('\n')}
                      </pre>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <p className="text-slate-300 text-sm">
                          💡 {language === 'es' ? 'Estás mezclando tipos de datos incompatibles (ej: string + int).' : 
                              language === 'pt' ? 'Você está misturando tipos de dados incompatíveis (ex: string + int).' :
                              'You\'re mixing incompatible data types (e.g., string + int).'}
                        </p>
                      </div>
                    </div>
                  );
                }
                
                // IndexError
                if (errMsg.includes('IndexError')) {
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">📍</span>
                        <p className="text-red-300 text-lg">
                          <strong>{language === 'es' ? 'Índice fuera de rango' : language === 'pt' ? 'Índice fora do intervalo' : 'Index out of range'}</strong>
                        </p>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <p className="text-slate-300 text-sm">
                          💡 {language === 'es' ? 'Intentaste acceder a una posición que no existe en la lista.' : 
                              language === 'pt' ? 'Você tentou acessar uma posição que não existe na lista.' :
                              'You tried to access a position that doesn\'t exist in the list.'}
                        </p>
                        <p className="text-slate-400 text-xs mt-2">
                          {language === 'es' ? 'Recordá: los índices empiezan en 0, no en 1.' : 
                           language === 'pt' ? 'Lembre-se: os índices começam em 0, não em 1.' :
                           'Remember: indices start at 0, not 1.'}
                        </p>
                      </div>
                    </div>
                  );
                }
                
                // AssertionError (test fallido)
                if (errMsg.includes('AssertionError')) {
                  const assertMatch = errMsg.match(/AssertionError:\s*(.+?)(?:\n|$)/);
                  return (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">❌</span>
                        <p className="text-red-300 text-lg">
                          <strong>{language === 'es' ? 'Resultado incorrecto' : language === 'pt' ? 'Resultado incorreto' : 'Incorrect result'}</strong>
                        </p>
                      </div>
                      {assertMatch?.[1] && (
                        <div className="bg-amber-900/20 p-3 rounded-lg border border-amber-500/30">
                          <p className="text-amber-300 text-sm font-mono">{assertMatch[1]}</p>
                        </div>
                      )}
                      <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                        <p className="text-slate-300 text-sm">
                          💡 {language === 'es' ? 'Tu código ejecutó sin errores, pero el resultado no coincide con el esperado. Revisá el "Resultado Esperado" arriba.' : 
                              language === 'pt' ? 'Seu código executou sem erros, mas o resultado não coincide com o esperado. Verifique o "Resultado Esperado" acima.' :
                              'Your code ran without errors, but the result doesn\'t match what\'s expected. Check "Expected Output" above.'}
                        </p>
                      </div>
                    </div>
                  );
                }
                
                // Error genérico - mostrar últimas líneas relevantes
                const lines = errMsg.split('\n').filter(l => l.trim());
                const lastRelevant = lines.slice(-3).join('\n');
                return (
                  <div className="space-y-2">
                    <pre className="text-sm whitespace-pre-wrap font-mono text-red-300 bg-slate-900/50 p-3 rounded">{lastRelevant || errMsg}</pre>
                    <p className="text-slate-400 text-xs">
                      💡 {language === 'es' ? 'Si no entendés el error, copiá tu código y preguntale a Saurio.' : 
                          language === 'pt' ? 'Se não entender o erro, copie seu código e pergunte ao Saurio.' :
                          'If you don\'t understand the error, copy your code and ask Saurio.'}
                    </p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Output */}
          {output && (
            <div className={`rounded-xl border overflow-hidden ${
              isCorrect 
                ? 'bg-blue-900/20 border-blue-700' 
                : 'bg-slate-800/50 border-slate-700'
            }`}>
              <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-white">{t('playground.output')}</span>
                </div>
                {isCorrect !== null && (
                  <span className={`flex items-center gap-2 ${isCorrect ? 'text-blue-400' : 'text-red-400'}`}>
                    {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    {isCorrect ? `¡${t('playground.correct')}! +` + currentExercise.xpReward + ' XP' : t('playground.incorrect')}
                  </span>
                )}
              </div>
              
              <pre className="p-4 text-sm font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}

          {/* AI Code Review - solo cuando es correcto */}
          {isCorrect && currentExercise && (
            <AICodeReview
              code={code}
              exerciseTitle={tLocalized(currentExercise.title)}
              exerciseDescription={tLocalized(currentExercise.description)}
              language="python"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PythonPlayground;