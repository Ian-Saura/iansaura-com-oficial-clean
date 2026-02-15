import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, BookOpen, Clock, Award, ExternalLink,
  CheckCircle, Share2, Check, BookMarked, Sparkles, Loader2
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../../types/i18n';
import { getDeepDiveById } from '../../data/deepDives';
import { MarkdownRenderer } from './MarkdownRenderer';

interface DeepDiveViewerProps {
  deepDiveId: string;
  onBack: () => void;
  onComplete?: (deepDiveId: string) => void;
  isCompleted?: boolean;
}

/**
 * DeepDiveViewer - Visualizador de contenido Deep Dive
 * 
 * Carga y renderiza el contenido markdown con mapas mentales, cheat sheets y bibliografía.
 */
export const DeepDiveViewer: React.FC<DeepDiveViewerProps> = ({ 
  deepDiveId, 
  onBack, 
  onComplete,
  isCompleted = false
}) => {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [localCompleted, setLocalCompleted] = useState(isCompleted);
  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  const t = (content: LC | string): string => {
    if (typeof content === 'string') return content;
    return tLocalized(content, language);
  };

  const deepDive = getDeepDiveById(deepDiveId);

  // Fetch markdown content
  useEffect(() => {
    const fetchContent = async () => {
      if (!deepDive) return;
      
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`/deep-dives/${deepDive.contentPath}`);
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }
        const content = await response.text();
        setMarkdownContent(content);
      } catch (err) {
        console.error('Error loading deep dive content:', err);
        setError(t({ 
          es: 'Error al cargar el contenido. Por favor, intenta de nuevo.', 
          en: 'Error loading content. Please try again.', 
          pt: 'Erro ao carregar o conteúdo. Por favor, tente novamente.' 
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepDiveId, deepDive]);

  if (!deepDive) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-400 mb-2">
          {t({ es: 'Deep Dive no encontrado', en: 'Deep Dive not found', pt: 'Deep Dive não encontrado' })}
        </h3>
        <button 
          onClick={onBack}
          className="text-violet-400 hover:text-violet-300 mt-4"
        >
          ← {t({ es: 'Volver', en: 'Go back', pt: 'Voltar' })}
        </button>
      </div>
    );
  }

  const handleComplete = () => {
    setLocalCompleted(true);
    onComplete?.(deepDiveId);
    // Save to localStorage
    const completedDives = JSON.parse(localStorage.getItem('completed_deep_dives') || '[]');
    if (!completedDives.includes(deepDiveId)) {
      completedDives.push(deepDiveId);
      localStorage.setItem('completed_deep_dives', JSON.stringify(completedDives));
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/members?tab=especializaciones&deepDive=${deepDiveId}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Get color classes based on deepDive.color
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; gradient: string }> = {
      emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', gradient: 'from-emerald-500 to-emerald-600' },
      blue: { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400', gradient: 'from-blue-500 to-blue-600' },
      purple: { bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400', gradient: 'from-purple-500 to-purple-600' },
      orange: { bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400', gradient: 'from-orange-500 to-orange-600' },
      cyan: { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-400', gradient: 'from-cyan-500 to-cyan-600' },
      rose: { bg: 'bg-rose-500/20', border: 'border-rose-500/30', text: 'text-rose-400', gradient: 'from-rose-500 to-rose-600' },
      amber: { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-400', gradient: 'from-amber-500 to-amber-600' },
      teal: { bg: 'bg-teal-500/20', border: 'border-teal-500/30', text: 'text-teal-400', gradient: 'from-teal-500 to-teal-600' },
      violet: { bg: 'bg-violet-500/20', border: 'border-violet-500/30', text: 'text-violet-400', gradient: 'from-violet-500 to-violet-600' },
      indigo: { bg: 'bg-indigo-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400', gradient: 'from-indigo-500 to-indigo-600' },
    };
    return colorMap[color] || colorMap.violet;
  };

  const colors = getColorClasses(deepDive.color);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          {t({ es: 'Volver a Deep Dives', en: 'Back to Deep Dives', pt: 'Voltar aos Deep Dives' })}
        </button>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-600 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? t({ es: '¡Copiado!', en: 'Copied!', pt: 'Copiado!' }) : t({ es: 'Compartir', en: 'Share', pt: 'Compartilhar' })}
          </button>
        </div>
      </div>

      {/* Hero Card */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} via-slate-900 to-purple-500/10 border ${colors.border} p-8`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/5 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-6 mb-6">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-4xl shadow-2xl`}>
              {deepDive.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl font-bold text-white">
                  {t(deepDive.title)}
                </h1>
                {localCompleted && (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle className="w-4 h-4" />
                    {t({ es: 'Completado', en: 'Completed', pt: 'Completado' })}
                  </span>
                )}
              </div>
              <p className="text-slate-300 text-lg">
                {t(deepDive.subtitle)}
              </p>
            </div>
          </div>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="flex items-center gap-2 text-slate-400">
              <Clock className="w-4 h-4" />
              {deepDive.readingTime} {t({ es: 'de lectura', en: 'reading', pt: 'de leitura' })}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm ${colors.bg} ${colors.text} ${colors.border}`}>
              {deepDive.difficulty === 'foundational' ? t({ es: 'Fundamentos', en: 'Foundational', pt: 'Fundamentos' }) :
               deepDive.difficulty === 'intermediate' ? t({ es: 'Intermedio', en: 'Intermediate', pt: 'Intermediário' }) :
               t({ es: 'Avanzado', en: 'Advanced', pt: 'Avançado' })}
            </span>
            <span className="flex items-center gap-1.5 text-yellow-400">
              <Award className="w-4 h-4" />
              +{deepDive.xpBonus} XP
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {deepDive.tags.map((tag, i) => (
              <span 
                key={i} 
                className="text-sm px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700"
              >
                {t(tag)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-6 md:p-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-violet-400 animate-spin mb-4" />
            <p className="text-slate-400">
              {t({ es: 'Cargando contenido...', en: 'Loading content...', pt: 'Carregando conteúdo...' })}
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="text-violet-400 hover:text-violet-300"
            >
              {t({ es: 'Reintentar', en: 'Retry', pt: 'Tentar novamente' })}
            </button>
          </div>
        ) : (
          <MarkdownRenderer content={markdownContent} />
        )}
      </div>

      {/* Bibliography Section */}
      <div className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <BookMarked className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <h3 className="font-bold text-white">
              📚 {t({ es: 'Bibliografía Recomendada', en: 'Recommended Bibliography', pt: 'Bibliografia Recomendada' })}
            </h3>
            <p className="text-sm text-slate-400">
              {t({ es: 'Libros, papers y documentación para profundizar', en: 'Books, papers and documentation to go deeper', pt: 'Livros, papers e documentação para aprofundar' })}
            </p>
          </div>
        </div>
        
        <div className="grid gap-3">
          {deepDive.keyReferences.map((ref, i) => (
            <div 
              key={i}
              className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30 hover:border-slate-600/50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                ref.type === 'book' ? 'bg-blue-500/20 text-blue-400' :
                ref.type === 'paper' ? 'bg-purple-500/20 text-purple-400' :
                ref.type === 'whitepaper' ? 'bg-orange-500/20 text-orange-400' :
                'bg-emerald-500/20 text-emerald-400'
              }`}>
                {ref.type === 'book' ? '📕' :
                 ref.type === 'paper' ? '📄' :
                 ref.type === 'whitepaper' ? '📋' : '📖'}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">{ref.title}</h4>
                <p className="text-xs text-slate-400">{ref.author}</p>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                  ref.type === 'book' ? 'bg-blue-500/20 text-blue-400' :
                  ref.type === 'paper' ? 'bg-purple-500/20 text-purple-400' :
                  ref.type === 'whitepaper' ? 'bg-orange-500/20 text-orange-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {ref.type === 'book' ? t({ es: 'Libro', en: 'Book', pt: 'Livro' }) :
                   ref.type === 'paper' ? 'Paper' :
                   ref.type === 'whitepaper' ? 'Whitepaper' :
                   t({ es: 'Documentación', en: 'Documentation', pt: 'Documentação' })}
                </span>
              </div>
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(ref.title + ' ' + ref.author)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                title={t({ es: 'Buscar', en: 'Search', pt: 'Buscar' })}
              >
                <ExternalLink className="w-4 h-4 text-slate-500 hover:text-white" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-2xl p-6 border border-violet-500/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-white text-lg mb-1">
              {localCompleted 
                ? t({ es: '🎉 ¡Has completado este Deep Dive!', en: '🎉 You completed this Deep Dive!', pt: '🎉 Você completou este Deep Dive!' })
                : t({ es: '¿Terminaste de revisar el contenido?', en: 'Finished reviewing the content?', pt: 'Terminou de revisar o conteúdo?' })
              }
            </h3>
            <p className="text-sm text-slate-400">
              {localCompleted 
                ? t({ es: `Ganaste +${deepDive.xpBonus} XP bonus`, en: `You earned +${deepDive.xpBonus} bonus XP`, pt: `Você ganhou +${deepDive.xpBonus} XP bônus` })
                : t({ es: 'Márcalo como completado para ganar XP bonus', en: 'Mark as complete to earn bonus XP', pt: 'Marque como completo para ganhar XP bônus' })
              }
            </p>
          </div>
          
          {!localCompleted && (
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold hover:from-violet-400 hover:to-purple-500 transition-all shadow-lg shadow-violet-500/30"
            >
              <CheckCircle className="w-5 h-5" />
              {t({ es: 'Marcar como completado', en: 'Mark as complete', pt: 'Marcar como completo' })}
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← {t({ es: 'Volver a todos los Deep Dives', en: 'Back to all Deep Dives', pt: 'Voltar a todos os Deep Dives' })}
        </button>
      </div>
    </div>
  );
};

export default DeepDiveViewer;
