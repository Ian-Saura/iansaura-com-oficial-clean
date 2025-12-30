import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, Zap, Trophy, Clock, Target } from 'lucide-react';
import SQLPlayground from '../components/SQLPlayground';

interface SQLPracticeProps {
  user?: any;
}

export default function SQLPractice({ user }: SQLPracticeProps) {
  const handleExerciseComplete = (exerciseId: string, timeSeconds: number) => {
    console.log(`Ejercicio ${exerciseId} completado en ${timeSeconds} segundos`);
    // Aquí podrías guardar el progreso, dar XP, etc.
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to={user?.subscribed ? '/members' : '/suscripcion'}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </Link>
              <div className="h-6 w-px bg-slate-700" />
              <div className="flex items-center gap-2">
                <Database className="w-6 h-6 text-emerald-400" />
                <span className="font-bold text-lg">SQL Practice</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-400" />
                100% en tu browser
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-blue-400" />
                Sin límite de tiempo
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Intro */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            🎯 Práctica Interactiva de SQL
          </h1>
          <p className="text-slate-400 text-lg max-w-3xl">
            Ejecutá queries SQL directamente en tu browser. Sin servidores, sin instalación.
            Resolvé los ejercicios para ganar XP y subir de nivel.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Target className="w-5 h-5" />, label: '5 Ejercicios', color: 'emerald' },
            { icon: <Zap className="w-5 h-5" />, label: '+85 XP Total', color: 'yellow' },
            { icon: <Clock className="w-5 h-5" />, label: '~15 min', color: 'blue' },
            { icon: <Trophy className="w-5 h-5" />, label: 'Badge al completar', color: 'purple' },
          ].map((stat, i) => (
            <div 
              key={i}
              className={`bg-slate-800/50 rounded-xl p-4 border border-slate-700 flex items-center gap-3`}
            >
              <div className={`text-${stat.color}-400`}>{stat.icon}</div>
              <span className="text-slate-300">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Playground */}
        <SQLPlayground onComplete={handleExerciseComplete} />

        {/* Info adicional */}
        <div className="mt-8 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h3 className="font-bold text-white mb-3">💡 Cómo funciona</h3>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              El motor SQL corre 100% en tu browser usando WebAssembly (sql.js)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              No enviamos tus queries a ningún servidor - total privacidad
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              Los datos se resetean en cada ejercicio
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">•</span>
              Usá Ctrl+Enter para ejecutar rápido
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}



