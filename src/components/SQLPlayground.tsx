import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Play, CheckCircle, XCircle, Lightbulb, RotateCcw, ChevronRight, Trophy, Clock, Database, BookOpen, ChevronDown, Zap, Table, Maximize2, Minimize2, PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { ALL_SQL_EXERCISES, SQL_CATEGORIES, t as tExercise } from '../data/exercises';
// import { LockedContentOverlay, LockBadge } from './LockedContentOverlay';
import type { SQLExercise } from '../data/exercises/types';
import { useEnergySystem } from '../hooks/useEnergySystem';
import { useLanguage } from '../i18n/LanguageContext';
import AITutor from './AITutor';
import AICodeReview from './AICodeReview';

// Declarar tipos para sql.js
declare global {
  interface Window {
    initSqlJs: (config: { locateFile: (file: string) => string }) => Promise<any>;
  }
}

interface SQLPlaygroundProps {
  exerciseId?: string;
  onComplete?: (exerciseId: string, timeSeconds: number, xpReward: number) => void;
  initialCategory?: string;
  limitToEasy?: boolean; // For free users - only show easy exercises
  energySystem?: ReturnType<typeof useEnergySystem>;
  isFreeUser?: boolean;
  userEmail?: string; // For syncing progress to server
}

// Componente principal
export const SQLPlayground: React.FC<SQLPlaygroundProps> = ({ exerciseId, onComplete, initialCategory, limitToEasy = false, energySystem, isFreeUser = false, userEmail }) => {
  const { t, language } = useLanguage();
  
  // Convertir ejercicio escalable al formato interno con idioma actual
  const convertExercise = useCallback((ex: SQLExercise) => {
    return {
      id: ex.id,
      title: tExercise(ex.title, language),
      difficulty: ex.difficulty,
      description: tExercise(ex.description, language),
      theory: tExercise(ex.theory, language),
      realWorldExample: tExercise(ex.realWorldExample, language),
      hint: ex.hint ? tExercise(ex.hint, language) : undefined,
      schema: ex.schema,
      sampleData: ex.sampleData,
      expectedQuery: ex.expectedQuery,
      expectedResult: ex.expectedResult,
      xpReward: ex.xpReward,
      coinsReward: ex.coinsReward || 0,
      subcategory: ex.subcategory,
      tags: ex.tags,
      interviewFrequency: ex.interviewFrequency,
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
      const saved = localStorage.getItem('sql_current_exercise_index');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  
  // Actualizar categoría cuando viene del roadmap
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setExerciseIndex(0); // Reset al primer ejercicio de la categoría
    }
  }, [initialCategory]);
  
  // Guardar ejercicio actual
  useEffect(() => {
    localStorage.setItem('sql_current_exercise_index', exerciseIndex.toString());
  }, [exerciseIndex]);
  
  // Estado para las queries guardadas por ejercicio
  // Arquitectura: localStorage = caché rápido, database = fuente de verdad
  const [savedQueries, setSavedQueries] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('sql_saved_queries');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  
  // Flag para evitar sincronización duplicada
  const [answersLoadedFromDB, setAnswersLoadedFromDB] = useState(false);
  
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ columns: string[]; values: any[][] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [db, setDb] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStartedTimer, setHasStartedTimer] = useState(false); // Timer only starts when user clicks "Comenzar"
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false); // Modo inmersivo
  const [showExerciseList, setShowExerciseList] = useState(true); // Panel ejercicios visible
  const [showConsigna, setShowConsigna] = useState(true); // Panel consigna visible
  
  // Anchos de paneles redimensionables (en px)
  const [exerciseListWidth, setExerciseListWidth] = useState(240);
  const [consignaWidth, setConsignaWidth] = useState(320);
  const [expectedTableHeight, setExpectedTableHeight] = useState(128); // Altura tabla resultado esperado
  const [inputTableHeight, setInputTableHeight] = useState(96); // Altura tabla datos entrada
  const [isResizing, setIsResizing] = useState<'exercises' | 'consigna' | 'expectedTable' | 'inputTable' | null>(null);
  const resizeRef = useRef<{ startX: number; startWidth: number; startY?: number; startHeight?: number }>({ startX: 0, startWidth: 0 });
  
  // Handlers de resize (horizontal para paneles, vertical para tabla)
  const handleResizeStart = (panel: 'exercises' | 'consigna' | 'expectedTable', e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(panel);
    resizeRef.current = {
      startX: e.clientX,
      startWidth: panel === 'exercises' ? exerciseListWidth : consignaWidth,
      startY: e.clientY,
      startHeight: expectedTableHeight
    };
  };
  
  useEffect(() => {
    if (!isResizing) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Resize vertical para tablas
      if (isResizing === 'expectedTable') {
        const deltaY = e.clientY - (resizeRef.current.startY || 0);
        const newHeight = Math.max(80, Math.min(400, (resizeRef.current.startHeight || 128) + deltaY));
        setExpectedTableHeight(newHeight);
        return;
      }
      
      if (isResizing === 'inputTable') {
        const deltaY = e.clientY - (resizeRef.current.startY || 0);
        const newHeight = Math.max(60, Math.min(300, (resizeRef.current.startHeight || 96) + deltaY));
        setInputTableHeight(newHeight);
        return;
      }
      
      // Resize horizontal para paneles
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
  
  // Estado para mostrar las tablas originales (soporta múltiples tablas para JOINs)
  const [originalTablesData, setOriginalTablesData] = useState<Array<{
    tableName: string;
    columns: string[];
    rows: any[][];
  }>>([]);
  
  // Cargar progreso - primero de localStorage como fallback, luego del servidor como fuente de verdad
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [progressLoaded, setProgressLoaded] = useState(false);
  
  // Cargar progreso del servidor primero (fuente de verdad), localStorage como fallback
  // También hace BACKFILL: si hay datos en localStorage que no están en el servidor, los sube
  useEffect(() => {
    const loadProgress = async () => {
      const localExercises = JSON.parse(localStorage.getItem('sql_completed_exercises') || '[]');
      
      // Intentar cargar del servidor primero
      if (userEmail) {
        try {
          const response = await fetch(`/api/user-progress.php?email=${encodeURIComponent(userEmail)}`);
          if (response.ok) {
            const data = await response.json();
            
            // Verificar si el servidor está offline
            if (data.offline === true) {
              console.log('[SQL] Backend is offline - using localStorage only');
              setProgressLoaded(true);
              return;
            }
            
            const serverExercises = data.success && data.progress?.completedSqlExercises 
              ? data.progress.completedSqlExercises 
              : [];
            
            // Merge para no perder progreso local no sincronizado
            const merged = Array.from(new Set([...serverExercises, ...localExercises]));
            setCompletedExercises(merged);
            localStorage.setItem('sql_completed_exercises', JSON.stringify(merged));
            
            // BACKFILL: Si hay datos en localStorage que no estaban en el servidor, sincronizar
            const newFromLocal = localExercises.filter((ex: string) => !serverExercises.includes(ex));
            if (newFromLocal.length > 0) {
              console.log(`[SQL Backfill] Sincronizando ${newFromLocal.length} ejercicios locales al servidor`);
              fetch('/api/user-progress.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: userEmail,
                  progress: { completedSqlExercises: merged }
                })
              }).catch(() => {}); // Silent fail
            }
            
            setProgressLoaded(true);
            return;
          } else {
            // Server error (500, 503, etc) - fallback to localStorage silently
            console.log('[SQL] Server unavailable - using localStorage');
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
    localStorage.setItem('sql_completed_exercises', JSON.stringify(completedExercises));
    
    // Sync to server if we have email
    if (userEmail && completedExercises.length > 0) {
      // Debounce server sync - increased from 1s to 3s to reduce CPU usage
      const timeoutId = setTimeout(() => {
        fetch('/api/user-progress.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            progress: { completedSqlExercises: completedExercises }
          })
        }).catch(() => {}); // Silent fail - server may be unavailable
      }, 3000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [completedExercises, userEmail]);
  
  // Guardar queries por ejercicio (caché rápido)
  useEffect(() => {
    localStorage.setItem('sql_saved_queries', JSON.stringify(savedQueries));
  }, [savedQueries]);
  
  // Estado para guardar el status isCorrect por ejercicio desde la DB
  const [savedAnswerStatus, setSavedAnswerStatus] = useState<Record<string, boolean>>({});
  
  // Cargar respuestas desde la base de datos al montar (fuente de verdad)
  useEffect(() => {
    if (!userEmail || answersLoadedFromDB) return;
    
    const loadFromDatabase = async () => {
      try {
        const response = await fetch(`/api/exercise-answers.php?email=${encodeURIComponent(userEmail)}&type=sql`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.answers) {
            // Merge: database tiene prioridad
            const dbAnswers: Record<string, string> = {};
            const dbStatus: Record<string, boolean> = {};
            Object.entries(data.answers).forEach(([id, ans]: [string, any]) => {
              if (ans.code) dbAnswers[id] = ans.code;
              if (ans.isCorrect !== undefined) dbStatus[id] = ans.isCorrect;
            });
            
            setSavedQueries(prev => {
              const merged = { ...prev, ...dbAnswers };
              localStorage.setItem('sql_saved_queries', JSON.stringify(merged));
              return merged;
            });
            setSavedAnswerStatus(prev => ({ ...prev, ...dbStatus }));
            
            // Fix race condition: if the current exercise has a DB answer
            // and the editor is still empty, update it
            const currentId = currentExerciseIdRef.current;
            if (currentId && dbAnswers[currentId]) {
              setQuery(prev => prev.trim() ? prev : dbAnswers[currentId]);
            }
            
            console.log(`[SQL] Loaded ${Object.keys(dbAnswers).length} answers from database`);
          }
        }
      } catch (err) {
        console.log('[SQL] Database offline, using localStorage');
      }
      setAnswersLoadedFromDB(true);
    };
    
    loadFromDatabase();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, answersLoadedFromDB]);
  
  // Función para guardar query a la base de datos (background sync)
  const saveToDatabase = useCallback(async (exerciseId: string, queryText: string, correct: boolean = false) => {
    if (!userEmail || !queryText.trim()) return;
    
    // Update local isCorrect status when saving a correct answer
    if (correct) {
      setSavedAnswerStatus(prev => ({ ...prev, [exerciseId]: true }));
    }
    
    try {
      await fetch('/api/exercise-answers.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          exerciseId,
          exerciseType: 'sql',
          code: queryText,
          isCorrect: correct
        })
      });
    } catch (err) {
      // Silent fail - localStorage tiene la copia
    }
  }, [userEmail]);
  
  // Guardar query actual (localStorage inmediato + DB opcional)
  const saveCurrentQuery = useCallback((exerciseId: string, queryText: string, syncToDb: boolean = false) => {
    if (queryText.trim()) {
      setSavedQueries(prev => ({ ...prev, [exerciseId]: queryText }));
      if (syncToDb) {
        saveToDatabase(exerciseId, queryText);
      }
    }
  }, [saveToDatabase]);

  // Refs para mantener valores actuales (evita stale closures en beforeunload/auto-save)
  const queryRef = useRef<string>('');
  useEffect(() => { queryRef.current = query; }, [query]);
  
  const savedQueriesRef = useRef<Record<string, string>>({});
  useEffect(() => { savedQueriesRef.current = savedQueries; }, [savedQueries]);
  
  // Ref for current exercise ID (set after currentExercise is defined below)
  const currentExerciseIdRef = useRef<string | null>(null);

  // Auto-save debounce ref
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // FREE USER LIMIT: Max 5 Easy exercises
  const FREE_EXERCISE_LIMIT = 5;
  
  // Filtrar ejercicios (free users only get easy AND limited to 5)
  const filteredExercises = useMemo(() => {
    let exercises = ALL_SQL_EXERCISES.filter(ex => {
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
      const found = ALL_SQL_EXERCISES.find(e => e.id === exerciseId);
      if (found) return convertExercise(found);
    }
    return filteredExercises[exerciseIndex] || filteredExercises[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId, filteredExercises, exerciseIndex]);
  
  // Check if current exercise is locked for free user (beyond the 5 free limit)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isExerciseLocked = useMemo(() => {
    if (!isFreeUser) return false;
    if (!currentExercise) return false;
    // Free users can only access the first FREE_EXERCISE_LIMIT exercises
    const allEasyExercises = ALL_SQL_EXERCISES.filter(e => e.difficulty === 'easy');
    const currentIdx = allEasyExercises.findIndex(e => e.id === currentExercise.id);
    return currentIdx >= FREE_EXERCISE_LIMIT;
  }, [isFreeUser, currentExercise]);

  // Estado para evitar clicks rápidos
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Reset ejercicio - pero carga la query guardada si existe
  const resetExercise = useCallback((loadSavedQuery: boolean = true) => {
    setResult(null);
    setError(null);
    setIsCorrect(null);
    setShowHint(false);
    setShowSolution(false);
    setHasStartedTimer(false); // Reset timer state
    setStartTime(Date.now());
    setElapsedTime(0);
    // Solo resetear query si no queremos cargar la guardada
    if (!loadSavedQuery) {
      setQuery('');
    }
  }, []);
  
  // Guardar query actual antes de cambiar de ejercicio
  const previousExerciseRef = useRef<string | null>(null);
  
  // Auto-reset cuando cambia el ejercicio
  useEffect(() => {
    // Guardar la query del ejercicio anterior antes de cambiar (sync to DB)
    if (previousExerciseRef.current && queryRef.current.trim()) {
      // Save using refs to avoid stale closures
      const prevId = previousExerciseRef.current;
      const prevQuery = queryRef.current;
      setSavedQueries(prev => {
        const updated = { ...prev, [prevId]: prevQuery };
        savedQueriesRef.current = updated;
        localStorage.setItem('sql_saved_queries', JSON.stringify(updated));
        return updated;
      });
      saveToDatabase(prevId, prevQuery); // Sync to DB
    }
    
    // Reset UI state first (results, hints, timer, etc.) WITHOUT touching the query
    resetExercise(true); // true = don't clear query, we load it below
    
    // Cargar la query guardada del nuevo ejercicio (use ref for latest data)
    if (currentExercise) {
      const savedQuery = savedQueriesRef.current[currentExercise.id] || '';
      setQuery(savedQuery);
      queryRef.current = savedQuery; // Sync ref
      previousExerciseRef.current = currentExercise.id;
    }
    
    // Pequeño delay para evitar clicks rápidos
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 150);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise?.id]); // Cuando cambia el ejercicio

  // Sync currentExerciseIdRef (used by beforeunload, auto-save, and DB load effects)
  useEffect(() => {
    currentExerciseIdRef.current = currentExercise?.id || null;
  }, [currentExercise?.id]);

  // Auto-save on typing (debounced 3s - localStorage only to avoid API spam)
  useEffect(() => {
    if (!currentExercise || !query.trim()) return;
    
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      saveCurrentQuery(currentExercise.id, query, false); // localStorage only
    }, 3000);
    
    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentExercise?.id]);

  // Save answer on page close / navigate away (beforeunload + unmount cleanup)
  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentQuery = queryRef.current;
      const exerciseId = currentExerciseIdRef.current;
      if (exerciseId && currentQuery.trim()) {
        // Save to localStorage synchronously
        const updated = { ...savedQueriesRef.current, [exerciseId]: currentQuery };
        localStorage.setItem('sql_saved_queries', JSON.stringify(updated));
        // Attempt DB save via sendBeacon (fire-and-forget, works during unload)
        if (userEmail) {
          const blob = new Blob([JSON.stringify({
            email: userEmail,
            exerciseId,
            exerciseType: 'sql',
            code: currentQuery
          })], { type: 'application/json' });
          navigator.sendBeacon('/api/exercise-answers.php', blob);
        }
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also save on unmount (e.g. tab switch within the app)
      handleBeforeUnload();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise?.id, userEmail]);

  // Estadísticas de progreso
  const progressStats = useMemo(() => {
    const total = ALL_SQL_EXERCISES.length;
    const completed = completedExercises.length;
    const byCategory: Record<string, { total: number; completed: number }> = {};
    
    SQL_CATEGORIES.forEach(cat => {
      const catExercises = ALL_SQL_EXERCISES.filter(e => e.subcategory === cat.id);
      byCategory[cat.id] = {
        total: catExercises.length,
        completed: catExercises.filter(e => completedExercises.includes(e.id)).length,
      };
    });
    
    return { total, completed, byCategory };
  }, [completedExercises]);

  // Cargar sql.js
  useEffect(() => {
    const loadSqlJs = async () => {
      try {
        setIsLoading(true);
        const SQL = await window.initSqlJs({
          locateFile: (file: string) => `https://sql.js.org/dist/${file}`,
        });
        const database = new SQL.Database();
        setDb(database);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading sql.js:', err);
        setError(t('errors.generic'));
        setIsLoading(false);
      }
    };

    if (typeof window.initSqlJs === 'function') {
      loadSqlJs();
    } else {
      const script = document.createElement('script');
      script.src = 'https://sql.js.org/dist/sql-wasm.js';
      script.onload = () => loadSqlJs();
      document.head.appendChild(script);
    }
  }, [t]);

  // Inicializar DB con schema del ejercicio
  useEffect(() => {
    if (db && currentExercise) {
      try {
        // Limpiar DB
        db.exec('SELECT name FROM sqlite_master WHERE type="table"').forEach((result: any) => {
          result.values.forEach((row: any) => {
            if (row[0] !== 'sqlite_sequence') {
              db.exec(`DROP TABLE IF EXISTS ${row[0]}`);
            }
          });
        });
        
        // Crear schema y datos
        db.exec(currentExercise.schema);
        db.exec(currentExercise.sampleData);
        
        // Extraer datos originales de TODAS las tablas para mostrar al usuario
        try {
          // Obtener todos los nombres de tablas del schema usando regex global
          const tableMatches = currentExercise.schema.matchAll(/CREATE\s+TABLE\s+(\w+)/gi);
          const tableNames = Array.from(tableMatches, m => m[1]);
          
          const tablesData: Array<{ tableName: string; columns: string[]; rows: any[][] }> = [];
          
          for (const tableName of tableNames) {
            try {
              const originalResults = db.exec(`SELECT * FROM ${tableName}`);
              if (originalResults.length > 0) {
                tablesData.push({
                  tableName,
                  columns: originalResults[0].columns,
                  rows: originalResults[0].values,
                });
              }
            } catch (err) {
              console.warn(`Could not extract data from table ${tableName}:`, err);
            }
          }
          
          setOriginalTablesData(tablesData);
        } catch (tableErr) {
          console.warn('Could not extract original table data:', tableErr);
          setOriginalTablesData([]);
        }
        
        // Reset estados (excepto query - se maneja en otro useEffect)
        setResult(null);
        setError(null);
        setIsCorrect(null);
        setShowHint(false);
        setShowSolution(false);
        setStartTime(Date.now());
        setElapsedTime(0);
      } catch (err: any) {
        console.error('Error setting up database:', err);
        setError(`${t('errors.generic')}: ${err.message}`);
      }
    }
  }, [db, currentExercise, t]);

  // Timer - only runs after user clicks "Comenzar" - pauses when tab is hidden
  const elapsedTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!hasStartedTimer) return;

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
  }, [startTime, hasStartedTimer]);
  
  // Start the timer
  const handleStartTimer = () => {
    setHasStartedTimer(true);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  // Ejecutar query
  const executeQuery = useCallback(() => {
    if (!db || !query.trim()) return;

    try {
      const results = db.exec(query);
      
      if (results.length > 0) {
        setResult({
          columns: results[0].columns,
          values: results[0].values,
        });
        
        // Verificar si es correcto
        const expected = currentExercise.expectedResult;
        const actual = results[0].values;
        
        const isMatch = expected.length === actual.length &&
          expected.every((row, i) =>
            row.every((val, j) => {
              const actualVal = actual[i]?.[j];
              if (val === null) return actualVal === null;
              if (typeof val === 'number') return Math.abs(val - actualVal) < 0.01;
              return String(val).toLowerCase() === String(actualVal).toLowerCase();
            })
          );
        
        setIsCorrect(isMatch);
        
        // Guardar la query al ejecutar (localStorage + database) con estado de corrección
        if (currentExercise) {
          saveCurrentQuery(currentExercise.id, query, true); // syncToDb = true
          // Also save isCorrect status to DB
          if (isMatch) {
            saveToDatabase(currentExercise.id, query, true);
          }
        }
        
        if (isMatch && !completedExercises.includes(currentExercise.id)) {
          // 🔋 ENERGY CHECK: Si es usuario FREE, verificar energía antes de dar recompensa
          if (isFreeUser && energySystem) {
            const canProceed = energySystem.useExercise();
            if (!canProceed) {
              // No tiene energía - el modal se muestra automáticamente
              // No marcar como completado ni dar XP
              return;
            }
          }
          
          setCompletedExercises(prev => [...prev, currentExercise.id]);
          onComplete?.(currentExercise.id, elapsedTime, currentExercise.xpReward);
        }
      } else {
        setResult({ columns: [], values: [] });
        setIsCorrect(false);
        // Save even incorrect attempts
        if (currentExercise) {
          saveCurrentQuery(currentExercise.id, query, true);
        }
      }
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setResult(null);
      setIsCorrect(false);
      // Save even on error so user doesn't lose their work
      if (currentExercise) {
        saveCurrentQuery(currentExercise.id, query, true);
      }
    }
  }, [db, query, currentExercise, elapsedTime, completedExercises, onComplete, saveCurrentQuery, saveToDatabase, isFreeUser, energySystem]);

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
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-slate-300">{t('common.loading')}</span>
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
      {/* SIDEBAR - Categorías y ejercicios */}
      <div className="w-72 flex-shrink-0 space-y-4">
        {/* Progreso general - Épico */}
        <div className="bg-gradient-to-br from-emerald-500/20 via-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-emerald-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-white">{progressStats.completed}<span className="text-emerald-400">/{progressStats.total}</span></div>
                <div className="text-xs text-emerald-400 font-medium">🏆 {t('practice.completed')}</div>
              </div>
            </div>
            <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-blue-500 transition-all shadow-lg shadow-emerald-500/30"
                style={{ width: `${Math.round((progressStats.completed / progressStats.total) * 100)}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-slate-400 text-center">
              {Math.round((progressStats.completed / progressStats.total) * 100)}% {t('common.completed')}
            </div>
          </div>
        </div>

        {/* Categorías - Épicas */}
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-3 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-900">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span className="text-lg">⚔️</span> {t('practice.category')}
            </h3>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            <button
              onClick={() => { setSelectedCategory('all'); setExerciseIndex(0); }}
              className={`w-full p-3 text-left flex items-center gap-3 transition-all ${
                selectedCategory === 'all' ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 border-l-4 border-emerald-500' : 'hover:bg-slate-700/50'
              }`}
            >
              <span className="text-2xl">🌍</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white">{t('practice.all')}</div>
                <div className="text-xs text-slate-400">{progressStats.total} {t('practice.exercises')}</div>
              </div>
            </button>
            {SQL_CATEGORIES.map(cat => {
              const stats = progressStats.byCategory[cat.id];
              const isActive = selectedCategory === cat.id;
              const isCompleted = stats && stats.completed === stats.total && stats.total > 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); setExerciseIndex(0); }}
                  className={`w-full p-3 text-left flex items-center gap-3 transition-all ${
                    isActive ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 border-l-4 border-emerald-500' : 
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

        {/* Lista de ejercicios - Épica */}
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
              const hasSavedAnswer = !isCompleted && !!savedQueries[ex.id];
              const isCurrent = idx === exerciseIndex;
              return (
                <button
                  key={ex.id}
                  onClick={() => { if (!isTransitioning) setExerciseIndex(idx); }}
                  className={`w-full p-3 text-left flex items-center gap-3 transition-all ${
                    isCurrent ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border-l-4 border-cyan-500' : 
                    isCompleted ? 'bg-emerald-500/5 hover:bg-emerald-500/10' : 
                    hasSavedAnswer ? 'bg-amber-500/5 hover:bg-amber-500/10' : 'hover:bg-slate-700/50'
                  }`}
                >
                  <span className="text-lg w-6 text-center">
                    {isCompleted ? '✅' : hasSavedAnswer ? '✏️' : isCurrent ? '⚡' : '○'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm truncate ${isCurrent ? 'text-cyan-300 font-bold' : isCompleted ? 'text-emerald-300' : hasSavedAnswer ? 'text-amber-300' : 'text-white'}`}>
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
        {/* Header del ejercicio - ÉPICO */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 px-6 py-5 border-b border-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl ${
                completedExercises.includes(currentExercise.id) 
                  ? 'bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-emerald-500/30' 
                  : 'bg-gradient-to-br from-slate-700 to-slate-600'
              }`}>
                {completedExercises.includes(currentExercise.id) 
                  ? <span className="text-2xl">🏆</span>
                  : <Database className="w-7 h-7 text-slate-300" />
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
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Timer or Start Button */}
              {hasStartedTimer ? (
                <div className="text-right bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700">
                  <div className="text-3xl font-mono font-black text-white">{formatTime(elapsedTime)}</div>
                  <div className="text-xs text-slate-400 font-medium">⏱️ {t('practice.time')}</div>
                </div>
              ) : (
                <button
                  onClick={handleStartTimer}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/30"
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

        <div className="p-6 space-y-5">
          {/* Descripción - ÉPICA */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-emerald-500" />
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎯</span>
              <div>
                <h4 className="text-sm font-black text-cyan-400 mb-2 uppercase tracking-wider">{t('playground.mission')}</h4>
                <p className="text-slate-200 text-lg leading-relaxed">{currentExercise.description}</p>
              </div>
            </div>
          </div>

          {/* Tablas Originales - ABIERTO por defecto para que vean los datos */}
          {originalTablesData.length > 0 && (
            <details open className="bg-gradient-to-r from-sky-500/10 to-blue-500/5 rounded-xl border border-sky-500/30 overflow-hidden group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-sky-500/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 flex items-center justify-center">
                    <Table className="w-4 h-4 text-sky-400" />
                  </div>
                  <span className="font-bold text-white">
                    📊 {language === 'es' ? 'DATOS DE ENTRADA' : language === 'pt' ? 'DADOS DE ENTRADA' : 'INPUT DATA'}
                  </span>
                  <div className="flex gap-1.5">
                    {originalTablesData.map((table, idx) => (
                      <span key={idx} className="text-xs text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded font-medium">
                        {table.tableName}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">
                    ({originalTablesData.reduce((sum, t) => sum + t.rows.length, 0)} {t('datasets.rows')})
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-sky-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5 border-t border-sky-500/20">
                <p className="text-xs text-sky-300/70 mt-3 mb-3">
                  {t('playground.originalData')}
                </p>
                
                {/* Mostrar cada tabla - grid alineado para múltiples tablas */}
                <div className={`${originalTablesData.length > 1 ? 'grid md:grid-cols-2 gap-4 items-start' : ''}`}>
                  {originalTablesData.map((tableData, tableIdx) => (
                    <div key={tableIdx} className="flex flex-col">
                      {/* Header de la tabla */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-sky-400">{tableData.tableName}</span>
                        <span className="text-xs text-slate-400">({tableData.rows.length} filas)</span>
                      </div>
                      
                      {/* Tabla de datos */}
                      <div className="overflow-x-auto rounded-lg border border-slate-600 flex-1">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-700">
                            <tr>
                              {tableData.columns.map((col, i) => (
                                <th key={i} className="px-3 py-2 text-left text-sky-300 font-bold border-b border-slate-600 whitespace-nowrap text-xs">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="bg-slate-800/50">
                            {tableData.rows.map((row, i) => (
                              <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/50">
                                {row.map((val, j) => (
                                  <td key={j} className="px-3 py-2 text-white whitespace-nowrap text-xs">
                                    {val === null ? <span className="text-slate-500 italic">NULL</span> : String(val)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      {/* Hint de query */}
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-slate-800 rounded font-mono text-[10px]">
                          SELECT * FROM {tableData.tableName}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Tip para JOINs */}
                {originalTablesData.length > 1 && (
                  <div className="mt-4 p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                    <p className="text-xs text-cyan-300">
                      💡 <strong>{t('playground.hint')}:</strong> Buscá columnas con nombres similares para conectar las tablas.
                    </p>
                  </div>
                )}
              </div>
            </details>
          )}

          {/* 🎯 RESULTADO ESPERADO - Colapsable */}
          {currentExercise.expectedResult && currentExercise.expectedResult.length > 0 && (
            <details open className="bg-gradient-to-r from-emerald-500/10 to-green-500/5 rounded-xl border border-emerald-500/30 overflow-hidden group">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-emerald-500/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="font-bold text-white">
                    🎯 {language === 'es' ? 'RESULTADO ESPERADO' : language === 'pt' ? 'RESULTADO ESPERADO' : 'EXPECTED OUTPUT'}
                  </span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                    {currentExercise.expectedResult.length} {language === 'es' ? (currentExercise.expectedResult.length === 1 ? 'fila' : 'filas') : 'rows'}
                  </span>
                </div>
                <ChevronDown className="w-5 h-5 text-emerald-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5 border-t border-emerald-500/20">
                <p className="text-xs text-emerald-300/70 mt-3 mb-3">
                  {language === 'es' ? 'Tu query debe devolver exactamente esta tabla:' : 
                   language === 'pt' ? 'Sua query deve retornar exatamente esta tabela:' :
                   'Your query should return exactly this table:'}
                </p>
                
                <div className="overflow-x-auto rounded-lg border border-emerald-600/30 max-h-64 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-emerald-900 sticky top-0 z-10">
                      <tr>
                        {(() => {
                          // 1. Si expectedResult tiene objetos, usar sus keys
                          const firstRow = currentExercise.expectedResult[0];
                          if (firstRow && typeof firstRow === 'object' && !Array.isArray(firstRow)) {
                            return Object.keys(firstRow).map((colName, i) => (
                              <th key={i} className="px-3 py-2 text-left text-emerald-300 font-bold border-b border-emerald-600/30 whitespace-nowrap text-xs uppercase">{colName}</th>
                            ));
                          }
                          
                          // 2. Parsear del expectedQuery (normalizar)
                          const query = (currentExercise.expectedQuery || '').replace(/\s+/g, ' ').trim();
                          const selectMatch = query.match(/SELECT\s+(.+?)\s+FROM\s/i);
                          
                          if (selectMatch) {
                            const selectPart = selectMatch[1].trim();
                            
                            // Si es SELECT *, parsear columnas del schema
                            if (selectPart === '*') {
                              const schema = currentExercise.schema || '';
                              // Buscar CREATE TABLE ... (col1 TYPE, col2 TYPE, ...)
                              const createMatch = schema.match(/CREATE\s+TABLE\s+\w+\s*\(([^)]+)\)/i);
                              if (createMatch) {
                                const colDefs = createMatch[1].split(',').map(c => c.trim());
                                const schemaColNames = colDefs.map(def => {
                                  // Extraer primer palabra (nombre de columna)
                                  const colName = def.split(/\s+/)[0];
                                  return colName;
                                }).filter(name => name && !name.toUpperCase().includes('PRIMARY') && !name.toUpperCase().includes('FOREIGN'));
                                
                                if (schemaColNames.length > 0) {
                                  return schemaColNames.map((colName, i) => (
                                    <th key={i} className="px-3 py-2 text-left text-emerald-300 font-bold border-b border-emerald-600/30 whitespace-nowrap text-xs uppercase">{colName}</th>
                                  ));
                                }
                              }
                            }
                            
                            // Parsear columnas explícitas
                            const cols: string[] = [];
                            let depth = 0;
                            let current = '';
                            for (const char of selectPart) {
                              if (char === '(') depth++;
                              else if (char === ')') depth--;
                              else if (char === ',' && depth === 0) {
                                cols.push(current.trim());
                                current = '';
                                continue;
                              }
                              current += char;
                            }
                            if (current.trim()) cols.push(current.trim());
                            
                            const colNames = cols.map(col => {
                              col = col.replace(/\s+/g, ' ').trim();
                              const asMatch = col.match(/\s+AS\s+['"`]?(\w+)['"`]?\s*$/i);
                              if (asMatch) return asMatch[1];
                              const funcAliasMatch = col.match(/\)\s+(\w+)\s*$/);
                              if (funcAliasMatch) return funcAliasMatch[1];
                              if (col.trim() === '*') return '*';
                              const dotMatch = col.match(/\.(\w+)\s*$/);
                              if (dotMatch) return dotMatch[1];
                              const words = col.trim().split(/\s+/);
                              return words[words.length - 1] || col.trim();
                            });
                            
                            if (colNames.length > 0 && colNames[0] !== '*') {
                              return colNames.map((colName, i) => (
                                <th key={i} className="px-3 py-2 text-left text-emerald-300 font-bold border-b border-emerald-600/30 whitespace-nowrap text-xs uppercase">{colName}</th>
                              ));
                            }
                          }
                          
                          // 3. Fallback: columnas genéricas
                          return (firstRow as any[])?.map((_, colIdx) => (
                            <th key={colIdx} className="px-3 py-2 text-left text-emerald-300 font-bold border-b border-emerald-600/30 whitespace-nowrap text-xs">COL_{colIdx + 1}</th>
                          ));
                        })()}
                      </tr>
                    </thead>
                    <tbody className="bg-slate-800/30">
                      {currentExercise.expectedResult.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-emerald-700/20 hover:bg-emerald-500/10">
                          {row.map((val, colIdx) => (
                            <td key={colIdx} className="px-3 py-2 text-white whitespace-nowrap text-xs font-mono">
                              {val === null ? <span className="text-slate-500 italic">NULL</span> : String(val)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
              </div>
            </details>
          )}

          {/* Teoría (colapsable) - Estilo Premium - CERRADO por defecto para que intenten primero */}
          <details className="bg-slate-800/40 rounded-xl border border-slate-700 overflow-hidden group">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="font-bold text-white">📚 {t('playground.theory')}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-6 border-t border-slate-700/50">
              {/* Contenido de teoría con mejor tipografía */}
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed [&>p]:text-slate-300 [&_code]:bg-slate-900 [&_code]:text-emerald-300 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-slate-900 [&_pre]:text-slate-200 [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto">
                <ReactMarkdown>{currentExercise.theory}</ReactMarkdown>
              </div>
              
              {currentExercise.realWorldExample && (
                <div className="mt-5 p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/5 rounded-xl border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-2">
                    <Zap className="w-4 h-4" />
                    {t('playground.realLife')}
                  </div>
                  <p className="text-slate-300 text-sm">{currentExercise.realWorldExample}</p>
                </div>
              )}
            </div>
          </details>

          {/* MODO INMERSIVO SQL PREMIUM - Fullscreen focus mode */}
          {isExpanded && (
            <div className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
              {/* Header compacto */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
                <div className="flex items-center gap-4">
                  {/* Toggle paneles */}
                  <div className="flex items-center gap-1">
                    <button onClick={() => setShowExerciseList(!showExerciseList)} className={`p-2 rounded-lg transition-all ${showExerciseList ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`} aria-label="Lista de ejercicios" aria-expanded={showExerciseList}>
                      {showExerciseList ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
                    </button>
                    <button onClick={() => setShowConsigna(!showConsigna)} className={`p-2 rounded-lg transition-all ${showConsigna ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                      {showConsigna ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Selector de Arena/Categoría */}
                  <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setExerciseIndex(0); }} className="bg-slate-800 text-slate-300 text-xs px-2 py-1.5 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500 cursor-pointer">
                    <option value="all">🎯 {t('practice.all')}</option>
                    {SQL_CATEGORIES.map(cat => <option key={cat.id} value={cat.id}>{cat.icon} {tExercise(cat.name, 'es')}</option>)}
                  </select>

                  {/* Navegación */}
                  <div className="flex items-center gap-2">
                    <button onClick={() => { if (exerciseIndex > 0) setExerciseIndex(exerciseIndex - 1); }} disabled={exerciseIndex === 0} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white" aria-label="Ejercicio anterior"><ChevronDown className="w-4 h-4 rotate-90" /></button>
                    <span className="text-emerald-400 font-mono font-bold text-sm">{exerciseIndex + 1}/{filteredExercises.length}</span>
                    <button onClick={() => { if (exerciseIndex < filteredExercises.length - 1) setExerciseIndex(exerciseIndex + 1); }} disabled={exerciseIndex === filteredExercises.length - 1} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white" aria-label="Siguiente ejercicio"><ChevronDown className="w-4 h-4 -rotate-90" /></button>
                  </div>

                  <span className="font-semibold text-white truncate max-w-[250px] text-sm">{currentExercise.title}</span>
                </div>

                <div className="flex items-center gap-2">
                  {hasStartedTimer ? (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 rounded-lg text-xs"><Clock className="w-3 h-3 text-slate-400" /><span className="font-mono text-slate-300">{Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</span></div>
                  ) : (
                    <button onClick={handleStartTimer} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-xs text-white font-bold"><Play className="w-3 h-3" />{t('practice.start')}</button>
                  )}
                  <button onClick={() => setIsExpanded(false)} className="p-2 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-red-500/20 rounded-lg" aria-label="Minimizar"><Minimize2 className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="flex-1 flex overflow-hidden">
                {/* Panel ejercicios */}
                {showExerciseList && (
                  <div className="bg-slate-900/30 border-r border-slate-700/50 flex flex-col overflow-hidden relative" style={{ width: exerciseListWidth, minWidth: 150, maxWidth: 500 }}>
                    <div
                      onMouseDown={(e) => handleResizeStart('exercises', e)}
                      className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-emerald-500/50 transition-colors z-10 ${isResizing === 'exercises' ? 'bg-emerald-500' : ''}`}
                    />
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                      {filteredExercises.map((ex, idx) => {
                        const exerciseTitle = typeof ex.title === 'string' ? ex.title : (ex.title as any).es || (ex.title as any).en || ex.title;
                        const isCompleted = completedExercises.includes(ex.id);
                        const hasSavedAnswer = !isCompleted && !!savedQueries[ex.id];
                        const isCurrent = idx === exerciseIndex;
                        return (
                          <button key={ex.id} onClick={() => setExerciseIndex(idx)} className={`w-full text-left p-2 rounded-lg transition-all text-xs ${isCurrent ? 'bg-emerald-500/20 border border-emerald-500/50 text-white' : hasSavedAnswer ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300' : 'hover:bg-slate-800/50 text-slate-400'}`}>
                            <div className="flex items-center gap-2">
                              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isCompleted ? 'bg-emerald-500/20 text-emerald-400' : hasSavedAnswer ? 'bg-amber-500/20 text-amber-400' : isCurrent ? 'bg-emerald-500 text-white' : 'bg-slate-700'}`}>{isCompleted ? <CheckCircle className="w-2.5 h-2.5" /> : hasSavedAnswer ? '✏️' : idx + 1}</span>
                              <span className="flex-1 truncate">{exerciseTitle}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Panel consigna - scrolleable con barra oculta */}
                {showConsigna && (
                  <div 
                    className="bg-slate-900/20 border-r border-slate-700/50 flex flex-col overflow-y-auto p-3 space-y-3 relative scrollbar-hide" 
                    style={{ width: consignaWidth, minWidth: 150, maxWidth: 500, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <div
                      onMouseDown={(e) => handleResizeStart('consigna', e)}
                      className={`absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-cyan-500/50 transition-colors z-10 ${isResizing === 'consigna' ? 'bg-cyan-500' : ''}`}
                    />
                    <div className="bg-slate-800/30 rounded-lg p-3 border border-slate-700/50">
                      <h3 className="text-xs font-bold text-emerald-400 mb-2">📋 {t('playground.mission')}</h3>
                      <p className="text-slate-300 text-xs leading-relaxed">{currentExercise.description}</p>
                    </div>

                    {/* 📊 Tablas de entrada en modo enfocado - REDIMENSIONABLE */}
                    {originalTablesData.length > 0 && (
                      <div className="bg-sky-500/10 rounded-lg p-3 border border-sky-500/20 relative">
                        <h3 className="text-xs font-bold text-sky-400 mb-2">📊 {language === 'es' ? 'DATOS DE ENTRADA' : 'INPUT DATA'}</h3>
                        <div 
                          className="space-y-2 overflow-y-auto scrollbar-hide"
                          style={{ maxHeight: inputTableHeight, minHeight: 60 }}
                        >
                          {originalTablesData.map((tableData, tableIdx) => (
                            <div key={tableIdx}>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold text-sky-300">{tableData.tableName}</span>
                                <span className="text-[9px] text-slate-500">({tableData.rows.length} filas)</span>
                              </div>
                              <div className="overflow-x-auto rounded border border-sky-600/30 overflow-y-auto scrollbar-hide max-h-40">
                                <table className="w-full text-[10px]">
                                  <thead className="bg-slate-800 sticky top-0 z-10">
                                    <tr>
                                      {tableData.columns.map((col, i) => (
                                        <th key={i} className="px-2 py-1 text-left text-sky-300 font-bold whitespace-nowrap bg-slate-800">{col}</th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="bg-slate-800/30">
                                    {tableData.rows.map((row, rowIdx) => (
                                      <tr key={rowIdx} className="border-b border-sky-700/20">
                                        {row.map((val, colIdx) => (
                                          <td key={colIdx} className="px-2 py-1 text-white whitespace-nowrap font-mono">
                                            {val === null ? <span className="text-slate-500">NULL</span> : String(val)}
                                          </td>
                                        ))}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Handle de resize vertical */}
                        <div
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setIsResizing('inputTable');
                            resizeRef.current = { startX: e.clientX, startWidth: 0, startY: e.clientY, startHeight: inputTableHeight };
                          }}
                          className={`absolute bottom-0 left-3 right-3 h-2 cursor-ns-resize flex items-center justify-center group hover:bg-sky-500/20 rounded-b transition-colors ${isResizing === 'inputTable' ? 'bg-sky-500/30' : ''}`}
                          title={language === 'es' ? 'Arrastrá para redimensionar' : 'Drag to resize'}
                        >
                          <div className="w-8 h-1 bg-sky-500/40 rounded-full group-hover:bg-sky-500/60 transition-colors" />
                        </div>
                        <p className="text-[9px] text-slate-500 mt-2 flex items-center justify-between">
                          <span>{originalTablesData.reduce((sum, t) => sum + t.rows.length, 0)} {language === 'es' ? 'filas total' : 'total rows'}</span>
                          <span className="text-sky-400/50">↕ {language === 'es' ? 'arrastrá el borde' : 'drag edge'}</span>
                        </p>
                      </div>
                    )}

                    {currentExercise.hint && (
                      <button onClick={() => setShowHint(!showHint)} className="w-full text-left p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs hover:bg-yellow-500/20">
                        <div className="flex items-center gap-2"><Lightbulb className="w-3 h-3" />{showHint ? 'Ocultar pista' : t('playground.hint')}</div>
                        {showHint && <p className="mt-2 text-yellow-300/80">{currentExercise.hint}</p>}
                      </button>
                    )}

                    {/* 🎯 Resultado esperado en modo enfocado - REDIMENSIONABLE */}
                    {currentExercise.expectedResult && currentExercise.expectedResult.length > 0 && (
                      <div className="bg-emerald-500/10 rounded-lg p-3 border border-emerald-500/20 relative">
                        <h3 className="text-xs font-bold text-emerald-400 mb-2">🎯 {language === 'es' ? 'RESULTADO ESPERADO' : 'EXPECTED OUTPUT'}</h3>
                        <div 
                          className="overflow-x-auto rounded border border-emerald-600/30 overflow-y-auto scrollbar-hide"
                          style={{ height: expectedTableHeight, minHeight: 80, maxHeight: 400 }}
                        >
                          <table className="w-full text-[10px]">
                            <thead className="bg-emerald-900 sticky top-0 z-10">
                              <tr>
                                {(() => {
                                  const query = (currentExercise.expectedQuery || '').replace(/\s+/g, ' ').trim();
                                  const selectMatch = query.match(/SELECT\s+(.+?)\s+FROM\s/i);
                                  
                                  if (selectMatch) {
                                    const selectPart = selectMatch[1].trim();
                                    
                                    // Si es SELECT *, parsear del schema
                                    if (selectPart === '*') {
                                      const schema = currentExercise.schema || '';
                                      const createMatch = schema.match(/CREATE\s+TABLE\s+\w+\s*\(([^)]+)\)/i);
                                      if (createMatch) {
                                        const colDefs = createMatch[1].split(',').map(c => c.trim());
                                        const schemaColNames = colDefs.map(def => def.split(/\s+/)[0])
                                          .filter(name => name && !name.toUpperCase().includes('PRIMARY') && !name.toUpperCase().includes('FOREIGN'));
                                        if (schemaColNames.length > 0) {
                                          return schemaColNames.map((colName, i) => (
                                            <th key={i} className="px-2 py-1 text-left text-emerald-300 font-bold whitespace-nowrap uppercase text-[9px]">{colName}</th>
                                          ));
                                        }
                                      }
                                    }
                                    
                                    const cols: string[] = [];
                                    let depth = 0;
                                    let current = '';
                                    for (const char of selectPart) {
                                      if (char === '(') depth++;
                                      else if (char === ')') depth--;
                                      else if (char === ',' && depth === 0) {
                                        cols.push(current.trim());
                                        current = '';
                                        continue;
                                      }
                                      current += char;
                                    }
                                    if (current.trim()) cols.push(current.trim());
                                    
                                    const colNames = cols.map(col => {
                                      col = col.replace(/\s+/g, ' ').trim();
                                      const asMatch = col.match(/\s+AS\s+['"`]?(\w+)['"`]?\s*$/i);
                                      if (asMatch) return asMatch[1];
                                      const funcAliasMatch = col.match(/\)\s+(\w+)\s*$/);
                                      if (funcAliasMatch) return funcAliasMatch[1];
                                      if (col.trim() === '*') return '*';
                                      const dotMatch = col.match(/\.(\w+)\s*$/);
                                      if (dotMatch) return dotMatch[1];
                                      const words = col.trim().split(/\s+/);
                                      return words[words.length - 1] || col.trim();
                                    });
                                    
                                    if (colNames.length > 0 && colNames[0] !== '*') {
                                      return colNames.map((colName, i) => (
                                        <th key={i} className="px-2 py-1 text-left text-emerald-300 font-bold whitespace-nowrap uppercase text-[9px]">{colName}</th>
                                      ));
                                    }
                                  }
                                  return currentExercise.expectedResult[0]?.map((_, i) => (
                                    <th key={i} className="px-2 py-1 text-left text-emerald-300 font-bold whitespace-nowrap text-[9px]">COL_{i + 1}</th>
                                  ));
                                })()}
                              </tr>
                            </thead>
                            <tbody className="bg-slate-800/30">
                              {currentExercise.expectedResult.map((row, rowIdx) => (
                                <tr key={rowIdx} className="border-b border-emerald-700/20">
                                  {row.map((val, colIdx) => (
                                    <td key={colIdx} className="px-2 py-1 text-white whitespace-nowrap font-mono">
                                      {val === null ? <span className="text-slate-500">NULL</span> : String(val)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        {/* Handle de resize vertical */}
                        <div
                          onMouseDown={(e) => handleResizeStart('expectedTable', e)}
                          className={`absolute bottom-0 left-3 right-3 h-2 cursor-ns-resize flex items-center justify-center group hover:bg-emerald-500/20 rounded-b transition-colors ${isResizing === 'expectedTable' ? 'bg-emerald-500/30' : ''}`}
                          title={language === 'es' ? 'Arrastrá para redimensionar' : 'Drag to resize'}
                        >
                          <div className="w-8 h-1 bg-emerald-500/40 rounded-full group-hover:bg-emerald-500/60 transition-colors" />
                        </div>
                        <p className="text-[9px] text-slate-500 mt-2 flex items-center justify-between">
                          <span>{currentExercise.expectedResult.length} {language === 'es' ? 'filas' : 'rows'}</span>
                          <span className="text-emerald-400/50">↕ {language === 'es' ? 'arrastrá el borde' : 'drag edge'}</span>
                        </p>
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
                          <div className="mt-2 text-[11px] leading-relaxed text-slate-300 [&_code]:bg-slate-900 [&_code]:text-emerald-300 [&_code]:px-1 [&_code]:rounded [&_pre]:bg-slate-900 [&_pre]:text-slate-200 [&_pre]:p-2 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:text-[10px] max-h-[200px] overflow-y-auto scrollbar-hide">
                            <ReactMarkdown>{currentExercise.theory}</ReactMarkdown>
                          </div>
                          {currentExercise.realWorldExample && (
                            <div className="mt-2 p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 mb-1">
                                🌐 {language === 'es' ? 'Caso real' : 'Real world'}
                              </div>
                              <p className="text-[10px] text-slate-400">{currentExercise.realWorldExample}</p>
                            </div>
                          )}
                        </div>
                      </details>
                    )}

                    {/* Botón de solución en modo enfocado */}
                    {currentExercise.expectedQuery && (
                      <div className={`w-full p-2 rounded-lg text-xs ${showSolution ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-slate-800/50 border border-slate-700/50'}`}>
                        <div className="flex items-center justify-between">
                          <button 
                            onClick={() => setShowSolution(!showSolution)} 
                            className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            <span>🔑</span>
                            {showSolution ? (language === 'es' ? 'Ocultar solución' : 'Hide solution') : t('playground.solution')}
                          </button>
                          {showSolution && (
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(currentExercise.expectedQuery || '');
                                const btn = document.getElementById('copy-sol-focused');
                                if (btn) { btn.textContent = '✓'; setTimeout(() => { btn.textContent = '📋'; }, 1500); }
                              }}
                              id="copy-sol-focused"
                              className="w-6 h-6 flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded transition-colors text-xs"
                              title={t('playground.copy')}
                            >
                              📋
                            </button>
                          )}
                        </div>
                        {showSolution && (
                          <pre className="mt-2 text-emerald-400 font-mono text-[10px] whitespace-pre-wrap break-all bg-slate-900 p-2 rounded select-text">{currentExercise.expectedQuery}</pre>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Panel principal - Editor + Output */}
                <div className="flex-1 flex flex-col bg-slate-950/50 p-3 gap-3">
                  {/* Editor */}
                  <div className="flex-1 flex flex-col bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden min-h-0">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 border-b border-slate-700/50">
                      <span className="text-xs text-slate-400">query.sql</span>
                      <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/50" /></div>
                    </div>
                    <textarea value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) executeQuery(); if (e.key === 'Escape') setIsExpanded(false); }} placeholder="SELECT * FROM ..." className="flex-1 w-full bg-transparent text-emerald-400 font-mono text-sm p-3 focus:outline-none resize-none" spellCheck={false} autoFocus />
                  </div>

                  {/* Output - debajo del editor */}
                  <div className="h-[160px] bg-slate-900 rounded-xl border border-slate-700/50 overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800/50 border-b border-slate-700/50">
                      <div className="flex items-center gap-2"><Table className="w-3 h-3 text-slate-400" /><span className="text-xs text-slate-400">{t('playground.output')}</span></div>
                      {isCorrect !== null && <span className={`text-[10px] px-2 py-0.5 rounded-full ${isCorrect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>{isCorrect ? t('playground.correct') : t('playground.incorrect')}</span>}
                    </div>
                    <div className="flex-1 p-2 overflow-auto text-xs">
                      {error ? <span className="text-red-400 font-mono">{error}</span> : result ? (
                        <table className="w-full"><thead><tr>{result.columns.map((col, i) => <th key={i} className="px-2 py-1 text-left text-emerald-400 border-b border-slate-700">{col}</th>)}</tr></thead>
                        <tbody>{result.values.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j} className="px-2 py-1 text-slate-300">{String(cell ?? 'NULL')}</td>)}</tr>)}</tbody></table>
                      ) : <span className="text-slate-600 italic">...</span>}
                    </div>
                  </div>

                  {/* Barra de acciones */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={executeQuery} disabled={!query.trim()} className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 text-white font-bold py-2 px-4 rounded-lg text-sm"><Play className="w-4 h-4" /> {t('playground.run')}</button>
                      <button onClick={() => { setQuery(''); setResult(null); setError(null); setIsCorrect(null); setHasStartedTimer(false); setElapsedTime(0); }} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg" title={t('playground.reset')} aria-label={t('playground.reset')}><RotateCcw className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center gap-2">
                      {exerciseIndex > 0 && <button onClick={() => setExerciseIndex(exerciseIndex - 1)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg" aria-label="Ejercicio anterior"><ChevronDown className="w-4 h-4 rotate-90" /></button>}
                      <button onClick={() => { if (exerciseIndex < filteredExercises.length - 1) setExerciseIndex(exerciseIndex + 1); }} disabled={exerciseIndex === filteredExercises.length - 1} className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm font-bold ${isCorrect ? 'bg-gradient-to-r from-emerald-600 to-cyan-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30'}`}>{t('playground.nextExercise')} <ChevronRight className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Editor SQL - Modo normal */}
          <div className="bg-slate-950 rounded-xl border border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
              <span className="text-sm text-slate-400 font-medium">{t('playground.yourSqlQuery')}</span>
              <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-2 text-xs font-medium text-emerald-400 hover:text-white bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 hover:border-emerald-400 px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-emerald-500/10"
                title="Modo inmersivo"
              >
                <Maximize2 className="w-3 h-3" />
                {t('playground.focusedMode')}
              </button>
            </div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  executeQuery();
                }
              }}
              placeholder="SELECT * FROM ..."
              className="w-full h-36 bg-transparent text-emerald-400 font-mono text-base p-4 focus:outline-none resize-y min-h-[100px]"
              spellCheck={false}
            />
          </div>

          {/* Botones de acción */}
          <div className="flex items-center gap-3">
            <button
              onClick={executeQuery}
              disabled={!query.trim()}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20"
            >
              <Play className="w-5 h-5" />
              {t('playground.run')}
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className={`flex items-center gap-2 py-3 px-5 rounded-xl font-medium transition-all ${
                showHint ? 'bg-yellow-500 text-slate-900' : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 border border-yellow-500/30'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              {t('playground.hint')}
            </button>

            <button
              onClick={() => setShowSolution(!showSolution)}
              className={`flex items-center gap-2 py-3 px-5 rounded-xl font-medium transition-all ${
                showSolution ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {t('playground.solution')}
            </button>

            <button
              onClick={() => {
                setQuery('');
                setResult(null);
                setError(null);
                setIsCorrect(null);
                setShowHint(false);
                setShowSolution(false);
                setHasStartedTimer(false);
                setStartTime(Date.now());
                setElapsedTime(0);
              }}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-3 px-5 rounded-xl transition-all"
              title={t('playground.reset')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {isCorrect && (
              <button
                onClick={nextExercise}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all ml-auto shadow-lg"
              >
                {t('playground.nextExercise')} <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Pista */}
          {showHint && currentExercise.hint && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
              <p className="font-bold text-yellow-400 mb-2">💡 {t('playground.hint')}</p>
              <p className="text-yellow-200">{currentExercise.hint}</p>
            </div>
          )}

          {/* AI Tutor */}
          {userEmail && (
            <AITutor
              exerciseTitle={currentExercise.title}
              exerciseDescription={currentExercise.description}
              userCode={query}
              language="sql"
              userEmail={userEmail}
              isPremium={!isFreeUser}
            />
          )}

          {/* Solución */}
          {showSolution && currentExercise.expectedQuery && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5">
              <p className="font-bold text-purple-400 mb-3">🔑 {t('playground.solution')}</p>
              <div className="relative">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentExercise.expectedQuery || '');
                    const btn = document.getElementById('copy-solution-sql');
                    if (btn) {
                      btn.textContent = '✓';
                      setTimeout(() => { btn.textContent = '📋'; }, 1500);
                    }
                  }}
                  id="copy-solution-sql"
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors z-10"
                  title={t('playground.copy')}
                >
                  📋
                </button>
                <pre className="bg-slate-950 p-4 pr-12 rounded-xl text-base overflow-x-auto border border-slate-700 select-text cursor-text">
                  <code className="text-purple-300 font-mono select-text">{currentExercise.expectedQuery}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="font-bold text-red-400">{t('common.error')}</span>
              </div>
              <pre className="text-red-300 text-sm whitespace-pre-wrap font-mono">{error}</pre>
            </div>
          )}

          {/* Resultado */}
          {result && (
            <div className={`rounded-xl border overflow-hidden ${
              isCorrect 
                ? 'bg-emerald-500/10 border-emerald-500/50' 
                : 'bg-slate-800/50 border-slate-700'
            }`}>
              <div className="px-5 py-3 border-b border-slate-700 flex items-center justify-between bg-slate-800/50">
                <span className="font-bold text-white">{t('playground.output')}</span>
                {isCorrect !== null && (
                  <span className={`flex items-center gap-2 font-bold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    {isCorrect ? `¡${t('playground.correct')}! +${currentExercise.xpReward} XP 🎉` : t('playground.incorrect')}
                  </span>
                )}
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-800">
                    <tr>
                      {result.columns.map((col, i) => (
                        <th key={i} className="px-4 py-3 text-left text-slate-300 font-bold border-b border-slate-700">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.values.map((row, i) => (
                      <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-800/50">
                        {row.map((val, j) => (
                          <td key={j} className="px-4 py-3 text-slate-300">
                            {val === null ? <span className="text-slate-500 italic">NULL</span> : String(val)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="px-5 py-2 bg-slate-800/50 text-sm text-slate-400">
                {result.values.length} {t('datasets.rows')}
              </div>
            </div>
          )}

          {/* AI Code Review - solo cuando es correcto */}
          {isCorrect && currentExercise && (
            <AICodeReview
              code={query}
              exerciseTitle={tExercise(currentExercise.title, language)}
              exerciseDescription={tExercise(currentExercise.description, language)}
              language="sql"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SQLPlayground;