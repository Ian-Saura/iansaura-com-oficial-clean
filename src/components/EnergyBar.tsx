import React from 'react';
import { Zap, BookOpen, Crown } from 'lucide-react';
import { FREE_LIMITS } from '../hooks/useEnergySystem';

interface EnergyBarProps {
  exercisesRemaining: number;
  stepsRemaining: number;
  exercisesUsed: number;
  stepsUsed: number;
  isSubscribed: boolean;
  timeUntilReset: string;
}

export const EnergyBar: React.FC<EnergyBarProps> = ({
  exercisesRemaining,
  stepsRemaining,
  exercisesUsed,
  stepsUsed,
  isSubscribed,
  timeUntilReset,
}) => {
  // Si es suscriptor, mostrar badge premium
  if (isSubscribed) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-full">
        <Crown className="w-4 h-4 text-emerald-400" />
        <span className="text-emerald-400 text-sm font-medium">Premium - Ilimitado</span>
      </div>
    );
  }

  const exercisePercent = ((FREE_LIMITS.exercises - exercisesUsed) / FREE_LIMITS.exercises) * 100;
  const stepPercent = ((FREE_LIMITS.roadmapSteps - stepsUsed) / FREE_LIMITS.roadmapSteps) * 100;

  const getColor = (percent: number) => {
    if (percent > 66) return 'bg-emerald-500';
    if (percent > 33) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-4 px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl">
      {/* Ejercicios */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <Zap className={`w-4 h-4 ${exercisesRemaining > 0 ? 'text-amber-400' : 'text-slate-500'}`} />
          <span className="text-xs text-slate-400">Ejercicios:</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(FREE_LIMITS.exercises)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-4 rounded-sm transition-colors ${
                i < (FREE_LIMITS.exercises - exercisesUsed)
                  ? getColor(exercisePercent)
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${exercisesRemaining > 0 ? 'text-white' : 'text-red-400'}`}>
          {exercisesRemaining}/{FREE_LIMITS.exercises}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-slate-600" />

      {/* Pasos */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <BookOpen className={`w-4 h-4 ${stepsRemaining > 0 ? 'text-blue-400' : 'text-slate-500'}`} />
          <span className="text-xs text-slate-400">Pasos:</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(FREE_LIMITS.roadmapSteps)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-4 rounded-sm transition-colors ${
                i < (FREE_LIMITS.roadmapSteps - stepsUsed)
                  ? getColor(stepPercent)
                  : 'bg-slate-600'
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${stepsRemaining > 0 ? 'text-white' : 'text-red-400'}`}>
          {stepsRemaining}/{FREE_LIMITS.roadmapSteps}
        </span>
      </div>

      {/* Reset timer */}
      <div className="hidden md:flex items-center gap-1 text-xs text-slate-500">
        <span>Reset:</span>
        <span className="text-slate-400">{timeUntilReset}</span>
      </div>

      {/* Upgrade button */}
      <a
        href="/suscripcion"
        className="ml-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white text-xs font-bold rounded-full transition-all flex items-center gap-1"
      >
        <Crown className="w-3 h-3" />
        <span className="hidden sm:inline">Ilimitado</span>
      </a>
    </div>
  );
};
