import React from 'react';
import { X, Zap, Clock, Crown, ArrowRight, Sparkles } from 'lucide-react';
import { FREE_LIMITS } from '../hooks/useEnergySystem';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface EnergyLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  limitType: 'exercise' | 'step' | null;
  timeUntilReset: string;
}

export const EnergyLimitModal: React.FC<EnergyLimitModalProps> = ({
  isOpen,
  onClose,
  limitType,
  timeUntilReset,
}) => {
  useBodyScrollLock(isOpen);
  if (!isOpen) return null;

  const isExercise = limitType === 'exercise';
  const limit = isExercise ? FREE_LIMITS.exercises : FREE_LIMITS.roadmapSteps;
  const itemName = isExercise ? 'ejercicios' : 'pasos del roadmap';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl" style={{ WebkitOverflowScrolling: 'touch' }}>
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Content */}
        <div className="relative p-8 text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <Zap className="w-10 h-10 text-white" />
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-2">
            ¡Llegaste al límite diario!
          </h2>
          
          <p className="text-slate-300 mb-4">
            Completaste tus <span className="text-amber-400 font-bold">{limit} {itemName}</span> gratis de hoy.
          </p>
          
          {/* Timer */}
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              Se resetean en <span className="text-white font-medium">{timeUntilReset}</span>
            </span>
          </div>
          
          {/* Upgrade CTA */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl p-6 border border-emerald-500/30 mb-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-bold">ACCESO ILIMITADO</span>
            </div>
            
            <p className="text-white mb-4">
              Con la suscripción tenés <span className="text-emerald-400 font-bold">ejercicios y roadmap ilimitados</span>, 
              más proyectos, datasets, videos y comunidad Discord.
            </p>
            
            <a
              href="https://iansaura.com/subscribe.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <Sparkles className="w-5 h-5" />
              Suscribirme - $30/mes
              <ArrowRight className="w-5 h-5" />
            </a>
            
            <p className="text-slate-500 text-xs mt-3">
              Cancelá cuando quieras • Sin riesgo
            </p>
          </div>
          
          {/* Secondary option */}
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            Esperar a mañana →
          </button>
        </div>
        
        {/* Footer info */}
        <div className="px-8 py-4 bg-slate-800/50 border-t border-slate-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-slate-400">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Plan gratuito</span>
            </div>
            <div className="text-slate-500">
              {limit} {itemName}/día
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
