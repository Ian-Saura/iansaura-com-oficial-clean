import React from 'react';
import { Crown, Lock, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { FREEMIUM_MESSAGES } from '../config/freemium';

interface LockedContentOverlayProps {
  type?: 'full' | 'inline' | 'banner';
  title?: string;
  description?: string;
  showButton?: boolean;
  compact?: boolean;
  onUpgradeClick?: () => void;
}

export const LockedContentOverlay: React.FC<LockedContentOverlayProps> = ({
  type = 'full',
  title,
  description,
  showButton = true,
  compact = false,
  onUpgradeClick,
}) => {
  const { language } = useLanguage();
  const messages = FREEMIUM_MESSAGES[language as keyof typeof FREEMIUM_MESSAGES] || FREEMIUM_MESSAGES.en;

  const handleUpgrade = () => {
    if (onUpgradeClick) {
      onUpgradeClick();
    } else {
      window.open('https://iansaura.com/checkout', '_blank');
    }
  };

  // Full overlay - covers the entire content
  if (type === 'full') {
    return (
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className={`bg-gradient-to-br from-purple-900/90 to-indigo-900/90 ${compact ? 'p-5' : 'p-8'} rounded-2xl shadow-2xl border border-purple-500/30 max-w-md text-center animate-in fade-in zoom-in-95 duration-300`}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold text-white mb-2`}>
            {title || messages.upgradeTitle}
          </h3>
          
          <p className={`text-purple-200 ${compact ? 'text-sm' : ''} mb-5`}>
            {description || messages.upgradeDescription}
          </p>
          
          <ul className="space-y-2 mb-5 text-left">
            {[
              language === 'es' ? '✅ Roadmaps completos (0 a Senior)' : '✅ Complete roadmaps (0 to Senior)',
              language === 'es' ? '✅ 118 ejercicios SQL + 90 Python' : '✅ 118 SQL + 90 Python exercises',
              language === 'es' ? '✅ 20+ System Design Interviews' : '✅ 20+ System Design Interviews',
              language === 'es' ? '✅ Mock Interview con Scorecard' : '✅ Mock Interview with Scorecard',
              language === 'es' ? '✅ Saurio AI ilimitado' : '✅ Unlimited Saurio AI',
            ].map((feature, i) => (
              <li key={i} className={`${compact ? 'text-xs' : 'text-sm'} text-slate-300`}>
                {feature}
              </li>
            ))}
          </ul>
          
          {showButton && (
            <>
              <button 
                onClick={handleUpgrade}
                className={`w-full ${compact ? 'py-2.5 text-sm' : 'py-3'} px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25`}
              >
                🚀 {messages.upgradeButton}
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-3">
                {language === 'es' ? '$30/mes • Cancela cuando quieras' : '$30/month • Cancel anytime'}
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // Inline lock - smaller, fits within content
  if (type === 'inline') {
    return (
      <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <Lock className="w-5 h-5 text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">
            {title || messages.upgradeTitle}
          </h4>
          <p className="text-xs text-slate-400 truncate">
            {description || messages.upgradeDescription}
          </p>
        </div>
        {showButton && (
          <button 
            onClick={handleUpgrade}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-medium rounded-lg transition-all flex-shrink-0"
          >
            {language === 'es' ? 'Desbloquear' : 'Unlock'}
          </button>
        )}
      </div>
    );
  }

  // Banner - top/bottom notification style
  if (type === 'banner') {
    return (
      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-lg p-3 flex items-center gap-3">
        <Zap className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <p className="text-sm text-amber-200 flex-1">
          {title || (language === 'es' ? '⚡ Contenido premium' : '⚡ Premium content')}
        </p>
        {showButton && (
          <button 
            onClick={handleUpgrade}
            className="text-xs text-amber-400 hover:text-amber-300 font-medium underline"
          >
            {language === 'es' ? 'Upgrade' : 'Upgrade'}
          </button>
        )}
      </div>
    );
  }

  return null;
};

// Simple lock icon badge for lists
export const LockBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => (
  <span className={`inline-flex items-center justify-center ${size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'} rounded bg-purple-500/20 border border-purple-500/30`}>
    <Lock className={`${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} text-purple-400`} />
  </span>
);

// Premium badge
export const PremiumBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-full text-[10px] font-bold text-amber-400">
    <Crown className="w-3 h-3" />
    PREMIUM
  </span>
);






