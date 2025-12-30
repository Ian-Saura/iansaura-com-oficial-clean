/**
 * Bootcamp Platform - Plataforma exclusiva para participantes del Bootcamp
 * 
 * Acceso separado de la suscripción:
 * - Solo Suscripción → /members
 * - Solo Bootcamp → /bootcamp-platform
 * - Ambos → acceso a todo
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import {
  CheckCircle, Circle, ChevronDown, ChevronRight,
  Code, Download, ExternalLink, FileText,
  Target, MessageCircle, Mail,
  Home, LogOut, Star, Rocket, Trophy,
  Calendar, Video, Folder, AlertCircle, Lightbulb,
  Database, Zap, Shield
} from 'lucide-react';

import {
  bootcampWeeks,
  bootcampRules,
  bootcampFinalProject,
  bootcampQuickLinks,
  BootcampWeek,
  BootcampExercise
} from '../data/bootcampData';

const ADMIN_EMAILS = ['iansauradata@gmail.com', 'info@iansaura.com'];

interface User {
  id: string;
  email: string;
  name?: string;
  subscribed?: boolean;
  bootcamp_access?: boolean;
}

interface BootcampPlatformProps {
  user: User | null;
}

// Custom hook for bootcamp progress
function useBootcampProgress(userEmail: string | null) {
  const STORAGE_KEY = 'ian-saura-bootcamp-progress';
  
  const [progress, setProgress] = useState<{
    completedExercises: string[];
    watchedVideos: string[];
    completedWeeks: string[];
    notes: { [key: string]: string };
    lastUpdated: string;
  }>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {
        completedExercises: [],
        watchedVideos: [],
        completedWeeks: [],
        notes: {},
        lastUpdated: new Date().toISOString()
      };
    } catch {
      return {
        completedExercises: [],
        watchedVideos: [],
        completedWeeks: [],
        notes: {},
        lastUpdated: new Date().toISOString()
      };
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...progress,
      lastUpdated: new Date().toISOString()
    }));
  }, [progress]);

  const toggleExercise = (exerciseId: string) => {
    setProgress(prev => ({
      ...prev,
      completedExercises: prev.completedExercises.includes(exerciseId)
        ? prev.completedExercises.filter(id => id !== exerciseId)
        : [...prev.completedExercises, exerciseId]
    }));
  };

  const toggleVideo = (weekId: string) => {
    setProgress(prev => ({
      ...prev,
      watchedVideos: prev.watchedVideos.includes(weekId)
        ? prev.watchedVideos.filter(id => id !== weekId)
        : [...prev.watchedVideos, weekId]
    }));
  };

  const toggleWeekComplete = (weekId: string) => {
    setProgress(prev => ({
      ...prev,
      completedWeeks: prev.completedWeeks.includes(weekId)
        ? prev.completedWeeks.filter(id => id !== weekId)
        : [...prev.completedWeeks, weekId]
    }));
  };

  const saveNote = (key: string, value: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [key]: value }
    }));
  };

  const getOverallProgress = () => {
    const totalWeeks = bootcampWeeks.length;
    const completed = progress.completedWeeks.length;
    return Math.round((completed / totalWeeks) * 100);
  };

  return {
    progress,
    toggleExercise,
    toggleVideo,
    toggleWeekComplete,
    saveNote,
    getOverallProgress,
    isExerciseComplete: (id: string) => progress.completedExercises.includes(id),
    isVideoWatched: (id: string) => progress.watchedVideos.includes(id),
    isWeekComplete: (id: string) => progress.completedWeeks.includes(id)
  };
}

// Navigation component for bootcamp
const BootcampNavigation: React.FC<{ user: User; displayName: string }> = ({ user, displayName }) => {
  const [showMenu, setShowMenu] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-orange-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/bootcamp-platform" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-500/20">
              DE
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-white group-hover:text-orange-400 transition-colors">
                Bootcamp Data Engineering
              </div>
              <div className="text-xs text-slate-500">by Ian Saura</div>
            </div>
          </Link>

          {/* Center Badge */}
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-400 px-4 py-1.5 rounded-full border border-orange-500/30">
            <Rocket className="w-4 h-4" />
            <span className="font-medium text-sm">Participante Bootcamp</span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <a 
              href={bootcampQuickLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discord</span>
            </a>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-white font-medium">{displayName}</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
                  <div className="p-3 border-b border-slate-700">
                    <div className="text-white font-medium">{displayName}</div>
                    <div className="text-slate-400 text-sm truncate">{user.email}</div>
                    <div className="flex items-center gap-1 mt-1 text-orange-400 text-xs">
                      <Rocket className="w-3 h-3" />
                      Participante Bootcamp
                    </div>
                  </div>
                  
                  <div className="p-2">
                    {/* Si tiene suscripción, mostrar link a la Academia */}
                    {user.subscribed && (
                      <Link 
                        to="/members"
                        className="flex items-center gap-3 px-3 py-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors"
                      >
                        <Star className="w-4 h-4" />
                        Ir a la Academia Premium
                      </Link>
                    )}
                    <Link 
                      to="/"
                      className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Home className="w-4 h-4" />
                      Ir al sitio principal
                    </Link>
                    {/* Admin link */}
                    {ADMIN_EMAILS.includes(user.email?.toLowerCase()) && (
                      <Link 
                        to="/admin"
                        className="flex items-center gap-3 px-3 py-2 text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-colors"
                      >
                        <Shield className="w-4 h-4" />
                        Admin Panel
                      </Link>
                    )}
                    <a 
                      href={bootcampQuickLinks.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Comunidad Discord
                      <ExternalLink className="w-3 h-3 ml-auto text-slate-500" />
                    </a>
                  </div>

                  <div className="p-2 border-t border-slate-700">
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-[-1]" onClick={() => setShowMenu(false)} />
      )}
    </nav>
  );
};

// Week Card Component
const WeekCard: React.FC<{
  week: BootcampWeek;
  isExpanded: boolean;
  onToggle: () => void;
  progress: ReturnType<typeof useBootcampProgress>;
}> = ({ week, isExpanded, onToggle, progress }) => {
  const { tLocalized: localizedT } = useLanguage();
  const exercisesCompleted = week.exercises.filter(ex => 
    progress.isExerciseComplete(ex.id)
  ).length;
  const isVideoWatched = progress.isVideoWatched(week.id);
  const isWeekComplete = progress.isWeekComplete(week.id);

  return (
    <div className={`rounded-2xl border transition-all ${
      isWeekComplete 
        ? 'bg-emerald-500/10 border-emerald-500/30' 
        : 'bg-slate-800/50 border-slate-700 hover:border-orange-500/50'
    }`}>
      {/* Header */}
      <button 
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
            isWeekComplete 
              ? 'bg-emerald-500 text-white' 
              : 'bg-gradient-to-br from-orange-500 to-amber-500 text-white'
          }`}>
            {isWeekComplete ? <CheckCircle className="w-6 h-6" /> : week.weekNumber}
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">
              Semana {week.weekNumber}: {localizedT(week.title)}
            </h3>
            <p className="text-slate-400 text-sm">{localizedT(week.description)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
            <Video className={`w-4 h-4 ${isVideoWatched ? 'text-emerald-400' : ''}`} />
            <span>{exercisesCompleted}/{week.exercises.length} ejercicios</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 space-y-6">
              {/* Video Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium flex items-center gap-2">
                    <Video className="w-5 h-5 text-orange-400" />
                    Grabación de la clase
                  </h4>
                  <button
                    onClick={() => progress.toggleVideo(week.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      isVideoWatched 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {isVideoWatched ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    {isVideoWatched ? 'Visto' : 'Marcar como visto'}
                  </button>
                </div>
                
                {/* Embedded Video */}
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-700">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${week.videoId}`}
                    title={`Semana ${week.weekNumber}: ${week.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                {/* Resources */}
                <div className="flex flex-wrap gap-2">
                  {week.presentationName && (
                    <a 
                      href={`/bootcamp-resources/${week.presentationName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Presentación
                      <Download className="w-3 h-3" />
                    </a>
                  )}
                  <a 
                    href={week.deliveryFormUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg text-sm text-orange-400 transition-colors"
                  >
                    <Target className="w-4 h-4" />
                    Formulario de entrega
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Exercises */}
              <div className="space-y-3">
                <h4 className="text-white font-medium flex items-center gap-2">
                  <Code className="w-5 h-5 text-orange-400" />
                  Ejercicios ({week.exercises.length})
                </h4>
                
                <div className="space-y-3">
                  {week.exercises.map((exercise) => (
                    <ExerciseCard 
                      key={exercise.id}
                      exercise={exercise}
                      isComplete={progress.isExerciseComplete(exercise.id)}
                      onToggle={() => progress.toggleExercise(exercise.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Mark Week Complete */}
              <div className="pt-4 border-t border-slate-700">
                <button
                  onClick={() => progress.toggleWeekComplete(week.id)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    isWeekComplete
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {isWeekComplete ? (
                    <span className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      ¡Semana completada!
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Circle className="w-5 h-5" />
                      Marcar semana como completada
                    </span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Exercise Card Component
const ExerciseCard: React.FC<{
  exercise: BootcampExercise;
  isComplete: boolean;
  onToggle: () => void;
}> = ({ exercise, isComplete, onToggle }) => {
  const { tLocalized: localizedT } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`rounded-xl border transition-all ${
      isComplete 
        ? 'bg-emerald-500/10 border-emerald-500/30' 
        : 'bg-slate-900/50 border-slate-700'
    }`}>
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="w-full p-4 flex items-start gap-3 text-left"
      >
        <button
          onClick={(e) => { e.stopPropagation(); onToggle(); }}
          className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
            isComplete 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : 'border-slate-500 hover:border-orange-500'
          }`}
        >
          {isComplete && <CheckCircle className="w-3 h-3" />}
        </button>
        <div className="flex-1">
          <h5 className={`font-medium ${isComplete ? 'text-emerald-400' : 'text-white'}`}>
            {localizedT(exercise.title)}
          </h5>
          <p className="text-slate-400 text-sm mt-1">{localizedT(exercise.objective)}</p>
        </div>
        {showDetails ? (
          <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Instructions */}
              <div>
                <h6 className="text-orange-400 text-sm font-medium mb-2">Instrucciones:</h6>
                <ul className="space-y-1">
                  {exercise.instructions.map((instruction, idx) => (
                    <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                      <span className="text-orange-400">•</span>
                      <span>{localizedT(instruction)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverable */}
              <div className="p-3 bg-slate-800 rounded-lg">
                <h6 className="text-amber-400 text-sm font-medium mb-1 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Entregable:
                </h6>
                <p className="text-slate-300 text-sm">{localizedT(exercise.deliverable)}</p>
              </div>

              {/* Code Examples */}
              {exercise.codeExamples && exercise.codeExamples.length > 0 && (
                <div>
                  <h6 className="text-blue-400 text-sm font-medium mb-2 flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Ejemplo de código:
                  </h6>
                  {exercise.codeExamples.map((example, idx) => (
                    <pre key={idx} className="bg-slate-950 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-slate-300">{example.code}</code>
                    </pre>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Dataset Generator Component for Bootcamp
interface GeneratedDataset {
  dataset_type: string;
  description: string;
  tables: { [key: string]: any[] };
  schema: { [key: string]: string[] };
  relationships: string[];
}

const BootcampDatasetGenerator: React.FC<{ userEmail: string }> = ({ userEmail }) => {
  const [selectedType, setSelectedType] = useState<string>('ecommerce');
  const [rowCount, setRowCount] = useState<number>(100);
  const [format, setFormat] = useState<'json' | 'csv'>('csv');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedDataset | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<string>('');

  const datasetTypes = [
    { id: 'ecommerce', name: '🛒 E-commerce', description: 'Categorías, productos, clientes, órdenes' },
    { id: 'logs', name: '📊 Logs', description: 'Servicios, servidores, logs' },
    { id: 'finance', name: '💰 Finanzas', description: 'Categorías, cuentas, transacciones' },
    { id: 'hr', name: '👥 RRHH', description: 'Departamentos, posiciones, empleados' },
    { id: 'iot', name: '🌡️ IoT', description: 'Ubicaciones, dispositivos, lecturas' },
    { id: 'streaming', name: '🎬 Streaming', description: 'Géneros, contenido, usuarios, historial' },
  ];

  const generateDataset = async () => {
    setIsGenerating(true);
    setError(null);
    setGeneratedData(null);
    setSelectedTable('');

    try {
      // Always fetch JSON to get the full structure
      const response = await fetch(`/api/datasets.php?type=${selectedType}&rows=${rowCount}&format=json&email=${encodeURIComponent(userEmail)}`);
      
      if (!response.ok) {
        throw new Error('Error al generar el dataset');
      }

      const data = await response.json();
      setGeneratedData(data);
      
      // Select first table by default
      if (data.tables) {
        const tableNames = Object.keys(data.tables);
        if (tableNames.length > 0) {
          setSelectedTable(tableNames[0]);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsGenerating(false);
    }
  };

  const arrayToCsv = (data: any[]): string => {
    if (!data || data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(h => {
          const val = row[h];
          if (val === null || val === undefined) return '';
          if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n'))) {
            return `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        }).join(',')
      )
    ];
    return csvRows.join('\n');
  };

  const downloadTable = (tableName: string) => {
    if (!generatedData || !generatedData.tables[tableName]) return;
    
    const tableData = generatedData.tables[tableName];
    let content: string;
    let mimeType: string;
    let extension: string;

    if (format === 'json') {
      content = JSON.stringify(tableData, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else {
      content = arrayToCsv(tableData);
      mimeType = 'text/csv';
      extension = 'csv';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedType}_${tableName}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAllTables = () => {
    if (!generatedData) return;
    
    // Download each table as a separate file
    Object.keys(generatedData.tables).forEach((tableName, index) => {
      setTimeout(() => downloadTable(tableName), index * 200);
    });
  };

  return (
    <div className="space-y-4">
      {/* Dataset Type Selection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {datasetTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => { setSelectedType(type.id); setGeneratedData(null); }}
            className={`p-3 rounded-lg border text-left transition-all ${
              selectedType === type.id
                ? 'bg-orange-500/20 border-orange-500/50'
                : 'bg-slate-900 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="font-medium text-white text-sm">{type.name}</div>
            <div className="text-slate-400 text-xs">{type.description}</div>
          </button>
        ))}
      </div>

      {/* Options */}
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-slate-400 text-sm mb-1">Filas (tabla principal)</label>
          <select
            value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value={50}>50 filas</option>
            <option value={100}>100 filas</option>
            <option value={500}>500 filas</option>
            <option value={1000}>1,000 filas</option>
          </select>
        </div>

        <div>
          <label className="block text-slate-400 text-sm mb-1">Formato</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as 'json' | 'csv')}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm"
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>
        </div>

        <button
          onClick={generateDataset}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Generar Dataset
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Generated Data Preview */}
      {generatedData && generatedData.tables && (
        <div className="space-y-4">
          {/* Header with description */}
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h5 className="text-emerald-400 font-medium flex items-center gap-2">
                  ✅ Dataset generado correctamente
                </h5>
                <p className="text-slate-400 text-sm mt-1">{generatedData.description}</p>
              </div>
              <button
                onClick={downloadAllTables}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Descargar Todo ({Object.keys(generatedData.tables).length} archivos)
              </button>
            </div>
          </div>

          {/* Schema & Relationships */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
              <h6 className="text-white font-medium mb-2 text-sm">📊 Esquema de tablas</h6>
              <div className="space-y-2">
                {Object.entries(generatedData.schema).map(([table, columns]) => (
                  <div key={table} className="text-xs">
                    <span className="text-orange-400 font-medium">{table}:</span>
                    <span className="text-slate-400 ml-2">{(columns as string[]).join(', ')}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700">
              <h6 className="text-white font-medium mb-2 text-sm">🔗 Relaciones</h6>
              <ul className="space-y-1">
                {generatedData.relationships.map((rel, idx) => (
                  <li key={idx} className="text-slate-400 text-xs font-mono">{rel}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tables tabs */}
          <div>
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {Object.keys(generatedData.tables).map((tableName) => (
                <button
                  key={tableName}
                  onClick={() => setSelectedTable(tableName)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    selectedTable === tableName
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tableName} ({generatedData.tables[tableName].length})
                </button>
              ))}
            </div>

            {/* Selected table preview */}
            {selectedTable && generatedData.tables[selectedTable] && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    Vista previa de <span className="text-white font-medium">{selectedTable}</span>
                  </span>
                  <button
                    onClick={() => downloadTable(selectedTable)}
                    className="flex items-center gap-1 px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs hover:bg-slate-700 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    {format.toUpperCase()}
                  </button>
                </div>
                <div className="bg-slate-950 rounded-lg p-4 overflow-x-auto max-h-48">
                  <pre className="text-xs text-slate-400">
                    {JSON.stringify(generatedData.tables[selectedTable].slice(0, 3), null, 2)}
                    {generatedData.tables[selectedTable].length > 3 && 
                      '\n... y ' + (generatedData.tables[selectedTable].length - 3) + ' filas más'}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Final Project Component
const FinalProjectSection: React.FC<{ hasSubscription?: boolean; userEmail?: string }> = ({ hasSubscription, userEmail = '' }) => {
  const { tLocalized } = useLanguage();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [selectedDatasetOption, setSelectedDatasetOption] = useState<'generator' | 'own'>('generator');

  return (
    <div className="space-y-6">
      {/* Context */}
      <div className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/30">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-orange-400" />
          Proyecto Final Integrador
        </h3>
        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-slate-300">
            El proyecto final es tu oportunidad de demostrar todo lo que aprendiste. 
            <strong className="text-orange-400"> Podés elegir qué datos usar:</strong>
          </p>
        </div>
      </div>

      {/* Dataset Options */}
      <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" />
          Elegí tus Datos
        </h4>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Option 1: Generator */}
          <button
            onClick={() => setSelectedDatasetOption('generator')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedDatasetOption === 'generator'
                ? 'bg-orange-500/20 border-orange-500/50'
                : 'bg-slate-900 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="text-2xl mb-2">🚀</div>
            <h5 className={`font-medium mb-1 ${selectedDatasetOption === 'generator' ? 'text-orange-400' : 'text-white'}`}>
              Generador de Datasets
            </h5>
            <p className="text-slate-400 text-sm">
              Generá datos personalizados: e-commerce, logs, finanzas, HR, IoT, streaming
            </p>
          </button>

          {/* Option 2: Own data */}
          <button
            onClick={() => setSelectedDatasetOption('own')}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedDatasetOption === 'own'
                ? 'bg-purple-500/20 border-purple-500/50'
                : 'bg-slate-900 border-slate-700 hover:border-slate-600'
            }`}
          >
            <div className="text-2xl mb-2">💼</div>
            <h5 className={`font-medium mb-1 ${selectedDatasetOption === 'own' ? 'text-purple-400' : 'text-white'}`}>
              Tus Propios Datos
            </h5>
            <p className="text-slate-400 text-sm">
              Usá datos de tu trabajo, cliente o proyecto personal
            </p>
          </button>
        </div>

        {/* Content based on selection */}
        <AnimatePresence mode="wait">
          {selectedDatasetOption === 'generator' && (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <p className="text-slate-300 text-sm">
                Generá datasets personalizados para tu proyecto. Elegí el tipo, cantidad de registros y formato:
              </p>
              <BootcampDatasetGenerator userEmail={userEmail} />
            </motion.div>
          )}

          {selectedDatasetOption === 'own' && (
            <motion.div
              key="own"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/30">
                <h5 className="text-purple-400 font-medium mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  ¡Excelente elección!
                </h5>
                <p className="text-slate-300 text-sm mb-3">
                  Usar datos reales de tu trabajo o proyecto personal es la mejor forma de aprender. 
                  Asegurate de:
                </p>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Anonimizar datos sensibles</strong> - Nombres, emails, IDs reales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Tener al menos 3 tablas</strong> - Para practicar JOINs y modelado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Incluir fechas</strong> - Para análisis temporal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Tener "suciedad"</strong> - Nulos, duplicados, formatos inconsistentes</span>
                  </li>
                </ul>
              </div>
              <p className="text-slate-400 text-sm">
                💡 <strong className="text-white">Tip:</strong> Si no tenés datos propios, podés buscar datasets públicos en 
                <a href="https://www.kaggle.com/datasets" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline ml-1">Kaggle</a> o 
                <a href="https://datasetsearch.research.google.com/" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline ml-1">Google Dataset Search</a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Weekly Tasks with Delivery */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-400" />
          Entregas Semanales del Proyecto Final
        </h4>
        
        {bootcampFinalProject.weeklyTasks.map((task) => (
          <div 
            key={task.week}
            className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
          >
            <button
              onClick={() => setExpandedWeek(expandedWeek === task.week ? null : task.week)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                  {task.week}
                </div>
                <div>
                  <h5 className="text-white font-medium">{tLocalized(task.title)}</h5>
                  <p className="text-slate-400 text-sm">{tLocalized(task.objective)}</p>
                </div>
              </div>
              {expandedWeek === task.week ? (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <AnimatePresence>
              {expandedWeek === task.week && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-4">
                    <div>
                      <h6 className="text-orange-400 text-sm font-medium mb-2">Entregables:</h6>
                      <ul className="space-y-1">
                        {task.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                            <span>{tLocalized(deliverable)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Botón de entrega para esta semana */}
                    {bootcampWeeks[task.week - 1]?.deliveryFormUrl && (
                      <a
                        href={bootcampWeeks[task.week - 1].deliveryFormUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors text-sm"
                      >
                        <Folder className="w-4 h-4" />
                        Entregar Semana {task.week}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Delivery Section */}
      <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl border border-emerald-500/30">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-400" />
          📤 Subir Entregas del Proyecto Final
        </h4>
        <p className="text-slate-300 text-sm mb-4">
          Usá el formulario de Google para subir tus entregas semanales del proyecto final. 
          Asegurate de incluir todos los archivos requeridos.
        </p>
        <a 
          href="https://docs.google.com/forms/d/e/1FAIpQLSeQGCY64Y0LDhKr8OG1R5dmvk9bu6cdORVAFGYhVkLmPTkGFw/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
        >
          <Folder className="w-5 h-5" />
          Subir Entrega del Proyecto Final
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

// Rules Section
const RulesSection: React.FC = () => {
  const { tLocalized: localizedT } = useLanguage();
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bootcampRules.map((rule) => (
        <div 
          key={rule.id}
          className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-orange-500/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{rule.icon}</span>
            <h4 className="text-white font-medium">{localizedT(rule.title)}</h4>
          </div>
          <p className="text-slate-400 text-sm">{localizedT(rule.content)}</p>
        </div>
      ))}
    </div>
  );
};

// Feedback interface
interface Feedback {
  id: number;
  week_number: number;
  feedback_title: string;
  feedback_content: string;
  grade: string | null;
  created_at: string;
  is_read: boolean;
}

// Simple Markdown to HTML parser for feedback
function renderMarkdown(text: string): string {
  if (!text) return '';
  
  let html = text;
  
  // Escape HTML first
  html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Code blocks (```language ... ```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="bg-slate-900 rounded-lg p-4 overflow-x-auto my-4 border border-slate-700"><code class="text-sm text-emerald-400">${code.trim()}</code></pre>`;
  });
  
  // Inline code (`code`)
  html = html.replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1.5 py-0.5 rounded text-orange-400 text-sm">$1</code>');
  
  // Tables
  html = html.replace(/\n\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
    const headerCells = header.split('|').filter((c: string) => c.trim());
    const headerHtml = headerCells.map((c: string) => `<th class="px-4 py-2 text-left text-orange-400 font-bold border-b border-slate-600">${c.trim()}</th>`).join('');
    
    const rowsHtml = rows.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim());
      return `<tr class="border-b border-slate-700/50">${cells.map((c: string) => `<td class="px-4 py-2 text-slate-300">${c.trim()}</td>`).join('')}</tr>`;
    }).join('');
    
    return `<div class="overflow-x-auto my-4"><table class="w-full text-sm border border-slate-700 rounded-lg overflow-hidden"><thead class="bg-slate-800"><tr>${headerHtml}</tr></thead><tbody class="bg-slate-800/50">${rowsHtml}</tbody></table></div>`;
  });
  
  // Headers - add text-slate-300 wrapper after headers for following content
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-lg font-bold text-white mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold text-white mt-8 mb-4 pb-2 border-b border-slate-700">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-white mt-6 mb-4">$1</h1>');
  
  // Bold and italic - ensure text color
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="text-white"><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="text-slate-200">$1</em>');
  
  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-orange-500 pl-4 py-2 my-4 bg-orange-500/10 rounded-r-lg text-slate-300 italic">$1</blockquote>');
  
  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr class="border-slate-700 my-6" />');
  
  // Unordered lists
  html = html.replace(/^- (.+)$/gm, '<li class="ml-4 text-slate-300 flex items-start gap-2"><span class="text-orange-400 mt-1.5">•</span><span>$1</span></li>');
  html = html.replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-3 space-y-1">$&</ul>');
  
  // Numbered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li class="ml-4 text-slate-300">$1</li>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-orange-400 hover:underline">$1</a>');
  
  // Line breaks - wrap text in spans with color
  html = html.replace(/\n\n/g, '</p><p class="my-3 text-slate-300">');
  html = html.replace(/\n/g, '<br/>');
  
  // Wrap everything in a container with base text color
  html = `<div class="text-slate-300">${html}</div>`;
  
  return html;
}

// Main Component
export default function BootcampPlatform({ user }: BootcampPlatformProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { tLocalized } = useLanguage();
  const [activeTab, setActiveTab] = useState<'clases' | 'proyecto' | 'reglas' | 'devoluciones'>('clases');
  const [expandedWeek, setExpandedWeek] = useState<string | null>('week-1');
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingFeedbacks, setLoadingFeedbacks] = useState(false);
  
  const progress = useBootcampProgress(user?.email || null);
  
  // Load feedbacks
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user?.email) {
      // Get unread count
      fetch(`/api/bootcamp-feedback.php?action=unread_count&email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setUnreadCount(data.unread_count);
        })
        .catch(console.error);
    }
  }, [user?.email]);
  
  // Load feedbacks when tab is opened
  useEffect(() => {
    if (activeTab === 'devoluciones' && user?.email && feedbacks.length === 0) {
      setLoadingFeedbacks(true);
      fetch(`/api/bootcamp-feedback.php?action=list&email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setFeedbacks(data.feedbacks);
            setUnreadCount(0); // Mark as read
          }
        })
        .catch(console.error)
        .finally(() => setLoadingFeedbacks(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, user?.email]);
  
  // Get display name
  const getDisplayName = () => {
    if (!user) return 'Participante';
    const name = user.name || user.email?.split('@')[0] || 'Participante';
    if (name.toLowerCase() === 'google' || name.toLowerCase() === 'user') {
      return 'Crack';
    }
    return name.split(' ')[0];
  };
  
  const displayName = getDisplayName();
  const overallProgress = progress.getOverallProgress();
  const completedWeeks = progress.progress.completedWeeks.length;

  // Access check
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            DE
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Bootcamp Data Engineering</h1>
          <p className="text-slate-400 mb-6">Necesitás iniciar sesión para acceder al contenido del bootcamp.</p>
          <Link 
            to="/auth?action=bootcamp"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <BootcampNavigation user={user} displayName={displayName} />
      
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                ¡Bienvenido al Bootcamp, {displayName}! 🚀
              </h1>
              <p className="text-slate-400">
                8 semanas de aprendizaje intensivo en Data Engineering
              </p>
            </motion.div>

            {/* Progress Card */}
            <div className="p-6 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/30 mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Tu Progreso</h2>
                  <p className="text-slate-400 text-sm">
                    {completedWeeks} de 8 semanas completadas
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-4xl font-bold text-orange-400">{overallProgress}%</span>
                </div>
              </div>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              
              {/* Week indicators */}
              <div className="flex justify-between mt-3">
                {bootcampWeeks.map((week) => (
                  <div 
                    key={week.id}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      progress.isWeekComplete(week.id)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {progress.isWeekComplete(week.id) ? '✓' : week.weekNumber}
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {[
                { id: 'clases', label: 'Clases', icon: Video },
                { id: 'proyecto', label: 'Proyecto Final', icon: Trophy },
                { id: 'devoluciones', label: 'Devoluciones', icon: Mail },
                { id: 'reglas', label: 'Reglas', icon: AlertCircle },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === 'devoluciones' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'clases' && (
              <motion.div
                key="clases"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {bootcampWeeks.map((week) => (
                  <WeekCard
                    key={week.id}
                    week={week}
                    isExpanded={expandedWeek === week.id}
                    onToggle={() => setExpandedWeek(expandedWeek === week.id ? null : week.id)}
                    progress={progress}
                  />
                ))}
              </motion.div>
            )}

            {activeTab === 'proyecto' && (
              <motion.div
                key="proyecto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FinalProjectSection hasSubscription={user?.subscribed} userEmail={user?.email || ''} />
              </motion.div>
            )}

            {activeTab === 'reglas' && (
              <motion.div
                key="reglas"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <RulesSection />
              </motion.div>
            )}

            {activeTab === 'devoluciones' && (
              <motion.div
                key="devoluciones"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-2xl border border-orange-500/30 p-6">
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-orange-400" />
                    Mis Devoluciones
                  </h2>
                  <p className="text-slate-400">
                    Acá encontrás las devoluciones de tus entregas semanales. Recibirás un email cada vez que haya una nueva.
                  </p>
                </div>

                {loadingFeedbacks ? (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Cargando devoluciones...</p>
                  </div>
                ) : feedbacks.length === 0 ? (
                  <div className="text-center py-12 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Aún no tenés devoluciones</h3>
                    <p className="text-slate-400 max-w-md mx-auto">
                      Las devoluciones de tus entregas aparecerán acá. Asegurate de entregar cada semana para recibir feedback.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {feedbacks.map((feedback) => (
                      <div 
                        key={feedback.id}
                        className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden"
                      >
                        <div className="p-5 border-b border-slate-700 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white font-bold">
                              S{feedback.week_number}
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{feedback.feedback_title}</h3>
                              <p className="text-slate-400 text-sm">
                                Semana {feedback.week_number} • {new Date(feedback.created_at).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
                              </p>
                            </div>
                          </div>
                          {feedback.grade && (
                            <div className={`px-4 py-2 rounded-lg font-bold ${
                              feedback.grade === 'Excelente' ? 'bg-emerald-500/20 text-emerald-400' :
                              feedback.grade === 'Muy Bien' ? 'bg-blue-500/20 text-blue-400' :
                              feedback.grade === 'Bien' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-slate-700 text-slate-300'
                            }`}>
                              {feedback.grade}
                            </div>
                          )}
                        </div>
                        <div className="p-5">
                          <div 
                            className="prose prose-invert prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(feedback.feedback_content) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Links Footer */}
          <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h3 className="text-white font-semibold mb-4">¿Necesitás ayuda?</h3>
            <div className="flex flex-wrap gap-3">
              <a 
                href={bootcampQuickLinks.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Discord
              </a>
              <a 
                href={`mailto:${bootcampQuickLinks.email}`}
                className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a 
                href={bootcampQuickLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}