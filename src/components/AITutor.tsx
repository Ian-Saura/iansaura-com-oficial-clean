import React, { useState, useEffect } from 'react';
import { Send, Loader2, X, Crown, Zap, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

// Saurio - The friendly Data Dinosaur mascot
export const SaurioIcon = ({ className = "w-6 h-6", animated = false }: { className?: string; animated?: boolean }) => (
  <svg 
    viewBox="0 0 64 64" 
    className={`${className} ${animated ? 'animate-bounce' : ''}`}
    fill="none"
  >
    <ellipse cx="32" cy="38" rx="18" ry="14" fill="url(#saurioGradient)" />
    <circle cx="44" cy="24" r="12" fill="url(#saurioGradient)" />
    <circle cx="48" cy="22" r="4" fill="white" />
    <circle cx="49" cy="21" r="2" fill="#1e293b" />
    <circle cx="50" cy="20" r="0.8" fill="white" />
    <ellipse cx="54" cy="26" rx="4" ry="3" fill="#34d399" />
    <path d="M50 28 Q52 31 54 28" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <circle cx="26" cy="26" r="3" fill="#f472b6" />
    <circle cx="32" cy="22" r="3.5" fill="#a78bfa" />
    <circle cx="38" cy="20" r="3" fill="#60a5fa" />
    <path d="M14 38 Q8 35 6 40 Q4 45 10 44" stroke="url(#saurioGradient)" strokeWidth="4" strokeLinecap="round" fill="none" />
    <ellipse cx="24" cy="50" rx="4" ry="3" fill="#10b981" />
    <ellipse cx="40" cy="50" rx="4" ry="3" fill="#10b981" />
    <text x="8" y="20" fontSize="6" fill="#60a5fa" fontFamily="monospace">01</text>
    <text x="52" y="12" fontSize="5" fill="#a78bfa" fontFamily="monospace">1</text>
    <defs>
      <linearGradient id="saurioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
    </defs>
  </svg>
);

interface AITutorProps {
  exerciseTitle: string;
  exerciseDescription: string;
  userCode: string;
  language: 'sql' | 'python' | 'project' | 'general';
  userEmail: string;
  isPremium?: boolean;
  floating?: boolean;
  initialQuestion?: string;
  onQuestionSent?: () => void;
}

interface AIResponse {
  success: boolean;
  response?: string;
  error?: string;
  remaining?: number | null;
  limit?: number | null;
  is_premium?: boolean;
}

export default function AITutor({ 
  exerciseTitle, 
  exerciseDescription, 
  userCode, 
  language, 
  userEmail,
  isPremium = false,
  floating = false,
  initialQuestion = '',
  onQuestionSent
}: AITutorProps) {
  const { tLocalized, language: userLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  
  // Handle initial question from external source (e.g., System Design)
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim()) {
      setIsOpen(true);
      setQuestion(initialQuestion);
      onQuestionSent?.();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuestion]);

  // Simplified quick questions (only 3)
  const quickQuestions = [
    { es: 'Dame una pista', en: 'Give me a hint', pt: 'Me dê uma dica' },
    { es: '¿Por dónde empiezo?', en: 'Where do I start?', pt: 'Por onde começo?' },
    { es: 'Explica el concepto', en: 'Explain the concept', pt: 'Explique o conceito' },
  ];

  const askTutor = async (customQuestion?: string) => {
    const questionToAsk = customQuestion || question;
    if (!questionToAsk.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('/api/ai-tutor.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          code: userCode,
          question: questionToAsk,
          exerciseTitle,
          exerciseDescription,
          language: language === 'project' ? 'general' : language,
          userLanguage
        })
      });

      const data: AIResponse = await res.json();

      if (!data.success) {
        setError(data.error || 'Error desconocido');
        if (data.remaining !== undefined) {
          setRemaining(data.remaining);
        }
      } else {
        setResponse(data.response || '');
        if (data.remaining !== undefined) {
          setRemaining(data.remaining);
        }
      }
    } catch (err) {
      setError(tLocalized({
        es: 'Error de conexión. Intentá de nuevo.',
        en: 'Connection error. Try again.',
        pt: 'Erro de conexão. Tente novamente.'
      }));
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  const handleQuickQuestion = (q: { es: string; en: string; pt: string }) => {
    const questionText = q[userLanguage as keyof typeof q] || q.es;
    setQuestion(questionText);
    askTutor(questionText);
  };

  // Floating button (closed state) - ALWAYS floating now
  // Position: bottom-24 to leave space for potential "Volver al Roadmap" button at bottom-6
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-50 group flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-full text-white shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105"
        title={tLocalized({ es: 'Preguntale a Saurio 🦖', en: 'Ask Saurio 🦖', pt: 'Pergunte ao Saurio 🦖' })}
      >
        <SaurioIcon className="w-7 h-7 group-hover:scale-110 transition-transform" />
        <span className="font-bold text-xs hidden sm:inline">Saurio</span>
        <MessageCircle className="w-3.5 h-3.5 absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-0.5 animate-pulse" />
      </button>
    );
  }

  // Simplified panel content - more compact, positioned higher
  return (
    <div className="fixed bottom-24 right-4 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-gradient-to-br from-slate-800/98 to-slate-900/98 backdrop-blur-xl border border-emerald-500/30 rounded-2xl p-3 shadow-2xl shadow-emerald-500/20 animate-in slide-in-from-bottom-4 fade-in duration-300">
      {/* Header - Compact */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SaurioIcon className="w-8 h-8" />
          <div>
            <h3 className="font-bold text-white text-sm">Saurio</h3>
            <p className="text-[10px] text-slate-400">
              {isPremium ? (
                <span className="flex items-center gap-1 text-amber-400">
                  <Crown className="w-3 h-3" /> 
                  {tLocalized({ es: 'Ilimitado', en: 'Unlimited', pt: 'Ilimitado' })}
                </span>
              ) : remaining !== null ? (
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  {remaining} {tLocalized({ es: 'restantes', en: 'left', pt: 'restantes' })}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-emerald-400">
                  <Zap className="w-3 h-3" />
                  {tLocalized({ es: 'Tutor IA', en: 'AI Tutor', pt: 'Tutor IA' })}
                </span>
              )}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-slate-400 hover:text-white p-1 hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Questions - Compact */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleQuickQuestion(q)}
            disabled={loading}
            className="text-[10px] px-2.5 py-1 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors disabled:opacity-50"
          >
            {q[userLanguage as keyof typeof q] || q.es}
          </button>
        ))}
      </div>

      {/* Input - Compact */}
      <div className="flex gap-1.5 mb-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && askTutor()}
          placeholder={tLocalized({
            es: '¿En qué te ayudo?',
            en: 'How can I help?',
            pt: 'Como posso ajudar?'
          })}
          disabled={loading}
          className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 disabled:opacity-50"
        />
        <button
          onClick={() => askTutor()}
          disabled={loading || !question.trim()}
          className="px-3 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </div>

      {/* Response - Compact with better scrolling */}
      {(response || error) && (
        <div className={`p-2.5 rounded-lg text-xs max-h-40 overflow-y-auto ${
          error ? 'bg-red-500/10 border border-red-500/30 text-red-300' : 'bg-emerald-500/10 border border-emerald-500/30 text-slate-200'
        }`}>
          {error ? (
            <p>🦖 {error}</p>
          ) : (
            <div className="flex items-start gap-2">
              <SaurioIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p className="whitespace-pre-wrap leading-relaxed text-[11px]">{response}</p>
            </div>
          )}
        </div>
      )}

      {/* Minimal footer - only when no response */}
      {!response && !error && (
        <p className="text-[9px] text-slate-500 text-center mt-1">
          🦖 {tLocalized({ es: 'Pistas, no respuestas directas', en: 'Hints, not direct answers', pt: 'Dicas, não respostas diretas' })}
        </p>
      )}
    </div>
  );
}

