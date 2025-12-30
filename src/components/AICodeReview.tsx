import React, { useState, useEffect } from 'react';
import { Star, Sparkles, Lightbulb, ThumbsUp, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface CodeReviewData {
  positive: string;
  improvements: string[];
  rating: number;
  tip: string;
}

interface AICodeReviewProps {
  code: string;
  exerciseTitle: string;
  exerciseDescription: string;
  language: 'sql' | 'python';
  onClose?: () => void;
  autoFetch?: boolean;
}

export default function AICodeReview({
  code,
  exerciseTitle,
  exerciseDescription,
  language,
  onClose,
  autoFetch = true
}: AICodeReviewProps) {
  const { tLocalized, language: userLanguage } = useLanguage();
  const [review, setReview] = useState<CodeReviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const fetchReview = async () => {
    if (hasFetched || loading) return;
    
    setLoading(true);
    setError(null);
    setHasFetched(true);

    try {
      const res = await fetch('/api/ai-code-review.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          exerciseTitle,
          exerciseDescription,
          language,
          userLanguage
        })
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Error fetching review');
      } else {
        setReview(data.review);
      }
    } catch (err) {
      setError(tLocalized({
        es: 'Error de conexión',
        en: 'Connection error',
        pt: 'Erro de conexão'
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && !hasFetched) {
      // Small delay to not block the success animation
      const timer = setTimeout(fetchReview, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-slate-600'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!review && !loading && !error) {
    return null;
  }

  return (
    <div className="mt-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-purple-500/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              {tLocalized({
                es: '✨ Code Review AI',
                en: '✨ AI Code Review',
                pt: '✨ Code Review IA'
              })}
              {review && renderStars(review.rating)}
            </h3>
            <p className="text-xs text-slate-400">
              {tLocalized({
                es: 'Feedback automático de tu código',
                en: 'Automatic feedback on your code',
                pt: 'Feedback automático do seu código'
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {loading && <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />}
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-4 pb-4">
          {loading && (
            <div className="flex items-center justify-center py-6 gap-3">
              <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
              <span className="text-slate-400 text-sm">
                {tLocalized({
                  es: 'Analizando tu código...',
                  en: 'Analyzing your code...',
                  pt: 'Analisando seu código...'
                })}
              </span>
            </div>
          )}

          {error && (
            <div className="py-4 text-center">
              <p className="text-red-400 text-sm">{error}</p>
              <button
                onClick={() => { setHasFetched(false); fetchReview(); }}
                className="mt-2 text-purple-400 hover:text-purple-300 text-sm underline"
              >
                {tLocalized({ es: 'Reintentar', en: 'Retry', pt: 'Tentar novamente' })}
              </button>
            </div>
          )}

          {review && (
            <div className="space-y-4">
              {/* Positive feedback */}
              <div className="flex items-start gap-3 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <ThumbsUp className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-emerald-400 mb-1">
                    {tLocalized({ es: '👍 Bien hecho', en: '👍 Well done', pt: '👍 Bem feito' })}
                  </p>
                  <p className="text-sm text-slate-300">{review.positive}</p>
                </div>
              </div>

              {/* Improvements */}
              {review.improvements && review.improvements.length > 0 && (
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <p className="text-xs font-medium text-blue-400 mb-2">
                    {tLocalized({ es: '💡 Sugerencias', en: '💡 Suggestions', pt: '💡 Sugestões' })}
                  </p>
                  <ul className="space-y-2">
                    {review.improvements.map((improvement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-blue-400 mt-1">→</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pro tip */}
              {review.tip && (
                <div className="flex items-start gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                  <Lightbulb className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-amber-400 mb-1">
                      {tLocalized({ es: '🎯 Pro Tip', en: '🎯 Pro Tip', pt: '🎯 Dica Pro' })}
                    </p>
                    <p className="text-sm text-slate-300">{review.tip}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
