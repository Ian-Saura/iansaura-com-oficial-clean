import React from 'react';
import { BookOpen, ChevronRight, Sparkles, Clock, Award } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../../types/i18n';
import { DeepDiveContent } from '../../types/deepDives';

interface DeepDiveHintProps {
  deepDives: DeepDiveContent[];
  onViewDeepDive: (deepDiveId: string) => void;
  compact?: boolean;
  className?: string;
}

/**
 * DeepDiveHint - Muestra un hint sutil sobre contenido profundo disponible
 * 
 * Aparece al final de cada fase del roadmap cuando hay Deep Dives relacionados.
 * Es completamente OPCIONAL y no bloquea el progreso.
 */
export const DeepDiveHint: React.FC<DeepDiveHintProps> = ({ 
  deepDives, 
  onViewDeepDive, 
  compact = false,
  className = ''
}) => {
  const { language } = useLanguage();
  const t = (content: LC | string): string => {
    if (typeof content === 'string') return content;
    return tLocalized(content, language);
  };

  if (deepDives.length === 0) return null;

  const totalReadingTime = deepDives.reduce((acc, dd) => acc + parseInt(dd.readingTime), 0);
  const totalXP = deepDives.reduce((acc, dd) => acc + dd.xpBonus, 0);

  // Versión compacta para inline en el roadmap
  if (compact) {
    return (
      <div 
        className={`group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-fuchsia-500/10 
                    border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 cursor-pointer ${className}`}
        onClick={() => onViewDeepDive(deepDives[0].id)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="relative flex items-center gap-3 p-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/30 to-purple-600/30 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-violet-400" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-violet-300">
                📚 {t({ es: 'Deep Dive disponible', en: 'Deep Dive available', pt: 'Deep Dive disponível' })}
              </span>
              <span className="text-xs text-violet-400/70 hidden sm:inline">
                ({t({ es: 'opcional', en: 'optional', pt: 'opcional' })})
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">
              {deepDives.map(dd => t(dd.title)).join(', ')}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-violet-400">
            <span className="text-xs font-medium bg-violet-500/20 px-2 py-1 rounded-full hidden sm:inline-flex items-center gap-1">
              <Award className="w-3 h-3" />
              +{totalXP} XP
            </span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    );
  }

  // Versión expandida para mostrar más detalle
  return (
    <div className={`rounded-2xl bg-gradient-to-br from-violet-500/10 via-slate-900 to-purple-500/10 
                    border border-violet-500/30 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500/20 to-transparent px-5 py-4 border-b border-violet-500/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">
                🎓 {t({ es: 'Deep Dives Disponibles', en: 'Deep Dives Available', pt: 'Deep Dives Disponíveis' })}
              </h3>
              <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full border border-violet-500/30">
                {t({ es: 'OPCIONAL', en: 'OPTIONAL', pt: 'OPCIONAL' })}
              </span>
            </div>
            <p className="text-sm text-slate-400">
              {t({ 
                es: 'Contenido académico para quienes quieren entender el "por qué"', 
                en: 'Academic content for those who want to understand the "why"', 
                pt: 'Conteúdo acadêmico para quem quer entender o "porquê"' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Deep Dives List */}
      <div className="p-4 space-y-3">
        {deepDives.map((dive) => (
          <button
            key={dive.id}
            onClick={() => onViewDeepDive(dive.id)}
            className="w-full group bg-slate-800/50 hover:bg-slate-800 rounded-xl p-4 border border-slate-700/50 
                       hover:border-violet-500/50 transition-all text-left"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${dive.color}-500/20 flex items-center justify-center text-2xl flex-shrink-0`}>
                {dive.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-white group-hover:text-violet-300 transition-colors">
                    {t(dive.title)}
                  </h4>
                  <Sparkles className="w-4 h-4 text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-slate-400 line-clamp-1">
                  {t(dive.subtitle)}
                </p>
                
                {/* Tags */}
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {dive.readingTime}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full bg-${dive.color}-500/20 text-${dive.color}-400 border border-${dive.color}-500/30`}>
                    {dive.difficulty === 'foundational' ? t({ es: 'Fundamentos', en: 'Foundational', pt: 'Fundamentos' }) :
                     dive.difficulty === 'intermediate' ? t({ es: 'Intermedio', en: 'Intermediate', pt: 'Intermediário' }) :
                     t({ es: 'Avanzado', en: 'Advanced', pt: 'Avançado' })}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-yellow-400">
                    <Award className="w-3 h-3" />
                    +{dive.xpBonus} XP
                  </span>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </button>
        ))}
      </div>

      {/* Footer Stats */}
      <div className="px-5 py-3 bg-slate-900/50 border-t border-slate-700/30 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {totalReadingTime} min {t({ es: 'total', en: 'total', pt: 'total' })}
          </span>
          <span className="flex items-center gap-1 text-yellow-400/70">
            <Award className="w-3.5 h-3.5" />
            +{totalXP} XP {t({ es: 'bonus', en: 'bonus', pt: 'bônus' })}
          </span>
        </div>
        <span className="text-xs text-violet-400/70">
          {t({ 
            es: 'No es obligatorio para avanzar', 
            en: 'Not required to progress', 
            pt: 'Não é obrigatório para avançar' 
          })}
        </span>
      </div>
    </div>
  );
};

/**
 * DeepDiveChip - Versión muy compacta para mostrar inline
 */
export const DeepDiveChip: React.FC<{
  count: number;
  onClick: () => void;
}> = ({ count, onClick }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { language } = useLanguage();
  
  if (count === 0) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                 bg-violet-500/20 text-violet-400 border border-violet-500/30
                 hover:bg-violet-500/30 hover:border-violet-500/50 transition-all"
    >
      <BookOpen className="w-3 h-3" />
      <span>{count}</span>
      <span className="hidden sm:inline">Deep {count === 1 ? 'Dive' : 'Dives'}</span>
    </button>
  );
};

export default DeepDiveHint;

