import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database, Play, ExternalLink, Lock, 
  Code, Rocket, ChevronRight, CheckCircle, Crown
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../../types/i18n';
import { RoadmapResource } from '../../types/members';

// ============================================
// TYPES
// ============================================
export type TabType = 'dashboard' | 'roadmap' | 'proyectos' | 'datasets' | 'grabaciones' | 'tienda' | 'practica' | 'especializaciones' | 'interviews';

// ============================================
// MARKDOWN HELPERS
// ============================================

// Render inline markdown (bold, inline code)
export const renderInlineMarkdown = (text: string): React.ReactNode => {
  // Handle **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx} className="px-1.5 py-0.5 bg-slate-700 rounded text-cyan-300 text-xs">{part.slice(1, -1)}</code>;
    }
    return part;
  });
};

// Renderizar markdown simple (tablas, código, negritas)
export const renderMarkdown = (text: string): React.ReactNode => {
  // Split by code blocks first
  const parts = text.split(/```(\w*)\n?([\s\S]*?)```/g);
  
  const elements: React.ReactNode[] = [];
  
  for (let i = 0; i < parts.length; i++) {
    if (i % 3 === 0) {
      // Regular text - check for tables
      const textPart = parts[i];
      
      // Detectar tabla markdown: buscar líneas que empiecen y terminen con |
      // y tengan una línea separadora con |---|
      const hasTableSeparator = /\|[\s-]+\|/.test(textPart);
      const hasMultiplePipes = (textPart.match(/\|/g) || []).length >= 4;
      
      if (hasMultiplePipes && hasTableSeparator) {
        const lines = textPart.split('\n');
        let tableLines: string[] = [];
        let beforeTable: string[] = [];
        let afterTable: string[] = [];
        let inTable = false;
        let tableEnded = false;
        
        for (const line of lines) {
          const trimmed = line.trim();
          // Una línea de tabla tiene al menos 2 pipes
          const pipeCount = (trimmed.match(/\|/g) || []).length;
          const isTableLine = pipeCount >= 2 && (trimmed.startsWith('|') || trimmed.includes('|'));
          
          if (isTableLine && !tableEnded) {
            inTable = true;
            tableLines.push(line);
          } else if (inTable && !isTableLine) {
            tableEnded = true;
            if (trimmed) afterTable.push(line);
          } else if (!inTable) {
            beforeTable.push(line);
          } else {
            if (trimmed) afterTable.push(line);
          }
        }
        
        // Render before table text
        if (beforeTable.length > 0 && beforeTable.some(l => l.trim())) {
          elements.push(<div key={`before-${i}`} className="whitespace-pre-line">{renderInlineMarkdown(beforeTable.join('\n'))}</div>);
        }
        
        // Render table - necesita al menos header + separator + 1 data row
        if (tableLines.length >= 3) {
          const headerRow = tableLines[0].split('|').map(c => c.trim()).filter(c => c);
          // Skip separator row (index 1), get data rows
          const dataRows = tableLines.slice(2)
            .filter(row => !row.includes('---')) // Skip any separator rows
            .map(row => row.split('|').map(c => c.trim()).filter(c => c));
          
          elements.push(
            <div key={`table-${i}`} className="my-4 overflow-x-auto rounded-lg border border-slate-600">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-700">
                    {headerRow.map((cell, idx) => (
                      <th key={idx} className="border-b border-slate-600 px-4 py-2.5 text-left text-cyan-300 font-semibold">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dataRows.map((row, rowIdx) => (
                    <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800/80'}>
                      {row.map((cell, cellIdx) => (
                        <td key={cellIdx} className="border-b border-slate-700/50 px-4 py-2 text-slate-200">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        
        // Render after table text
        if (afterTable.length > 0 && afterTable.some(l => l.trim())) {
          elements.push(<div key={`after-${i}`} className="whitespace-pre-line">{renderInlineMarkdown(afterTable.join('\n'))}</div>);
        }
      } else {
        // No table, just render inline markdown with preserved line breaks
        elements.push(<div key={`text-${i}`} className="whitespace-pre-line">{renderInlineMarkdown(textPart)}</div>);
      }
    } else if (i % 3 === 1) {
      // Language identifier (skip)
    } else {
      // Code block content
      elements.push(
        <pre key={`code-${i}`} className="my-2 p-3 bg-slate-900 rounded-lg overflow-x-auto text-xs">
          <code className="text-emerald-400">{parts[i]}</code>
        </pre>
      );
    }
  }
  
  return <>{elements}</>;
};

// ============================================
// RESOURCE BUTTON
// ============================================

export interface ResourceButtonProps {
  resource: RoadmapResource;
  onNavigate: (tab: TabType) => void;
  stepId?: string;
  level?: number;
}

export interface AchievementNotification {
  id: string;
  type: 'streak' | 'steps' | 'level' | 'video' | 'project' | 'xp' | 'coins' | 'level_up' | 'badge';
  title: string;
  description: string;
  icon: string;
}


export const ResourceButton: React.FC<ResourceButtonProps> = ({ resource, onNavigate, stepId, level }) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = (content: LC | string): string => tLocalized(content, language);
  
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (resource.type === 'external' && resource.link) {
      window.open(resource.link, '_blank');
    } else if (resource.type === 'project' && resource.projectId) {
      // Navigate to project detail page
      navigate(`/project/${resource.projectId}`);
    } else if (resource.type === 'dataset') {
      onNavigate('datasets');
    } else if (resource.type === 'video') {
      // Navegar a grabaciones con la semana específica si existe
      onNavigate('grabaciones');
      // Hacer scroll al video específico después de un pequeño delay
      if (resource.videoWeek) {
        setTimeout(() => {
          const videoElement = document.getElementById(`video-week-${resource.videoWeek}`);
          if (videoElement) {
            videoElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            videoElement.classList.add('ring-2', 'ring-red-500', 'ring-offset-2', 'ring-offset-slate-900');
            setTimeout(() => {
              videoElement.classList.remove('ring-2', 'ring-red-500', 'ring-offset-2', 'ring-offset-slate-900');
            }, 3000);
          }
        }, 300);
      }
    } else if (resource.type === 'exercise' && resource.link) {
      // Navegar a práctica con los parámetros de la URL
      try {
        const url = new URL(resource.link, window.location.origin);
        const category = url.searchParams.get('category') || 'sql';
        const difficulty = url.searchParams.get('difficulty');
        const subcategory = url.searchParams.get('subcategory');
        
        // Construir URL con parámetros + info para volver al roadmap
        let navUrl = `/members?tab=practica&category=${category}`;
        if (difficulty) navUrl += `&difficulty=${difficulty}`;
        if (subcategory) navUrl += `&subcategory=${subcategory}`;
        if (stepId) navUrl += `&fromStep=${stepId}`;
        if (level !== undefined) navUrl += `&fromLevel=${level}`;
        
        navigate(navUrl);
      } catch (e) {
        // Si falla el parseo, navegar sin parámetros
        onNavigate('practica');
      }
    } else if (resource.type === 'practice') {
      // Navegar a práctica con Python/SQL y categoría preseleccionada
      const practiceType = resource.practiceType || 'python';
      const category = resource.practiceCategory || 'basics';
      navigate(`/members?tab=practica&category=${practiceType}&subcategory=${category}`);
    }
  };
  
  // Mostrar la semana en el label si es un video
  const displayLabel = resource.type === 'video' && resource.videoWeek 
    ? `${t(resource.label)} (Semana ${resource.videoWeek})`
    : t(resource.label);

  const getConfig = () => {
    switch (resource.type) {
      case 'external': 
        return { 
          icon: <ExternalLink className="w-4 h-4" />,
          bg: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30',
          border: 'border-blue-500/40 hover:border-blue-400/60',
          text: 'text-blue-300',
          shadow: 'shadow-blue-500/10 hover:shadow-blue-500/20',
          emoji: '📖'
        };
      case 'project': 
        return { 
          icon: <Rocket className="w-4 h-4" />,
          bg: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30',
          border: 'border-emerald-500/40 hover:border-emerald-400/60',
          text: 'text-emerald-300',
          shadow: 'shadow-emerald-500/10 hover:shadow-emerald-500/20',
          emoji: '🚀'
        };
      case 'dataset': 
        return { 
          icon: <Database className="w-4 h-4" />,
          bg: 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30',
          border: 'border-purple-500/40 hover:border-purple-400/60',
          text: 'text-purple-300',
          shadow: 'shadow-purple-500/10 hover:shadow-purple-500/20',
          emoji: '📊'
        };
      case 'video': 
        return { 
          icon: <Play className="w-4 h-4" />,
          bg: 'bg-gradient-to-r from-red-500/20 to-orange-500/20 hover:from-red-500/30 hover:to-orange-500/30',
          border: 'border-red-500/40 hover:border-red-400/60',
          text: 'text-red-300',
          shadow: 'shadow-red-500/10 hover:shadow-red-500/20',
          emoji: '🎬'
        };
      case 'practice':
        return { 
          icon: <Code className="w-4 h-4" />,
          bg: 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 hover:from-yellow-500/30 hover:to-amber-500/30',
          border: 'border-yellow-500/40 hover:border-yellow-400/60',
          text: 'text-yellow-300',
          shadow: 'shadow-yellow-500/10 hover:shadow-yellow-500/20',
          emoji: '🐍'
        };
      default: 
        return { 
          icon: <ExternalLink className="w-4 h-4" />,
          bg: 'bg-slate-500/10 hover:bg-slate-500/20',
          border: 'border-slate-500/30 hover:border-slate-500/50',
          shadow: '',
          text: 'text-slate-400',
          emoji: '📎'
        };
    }
  };

  const config = getConfig();

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl ${config.bg} border-2 ${config.border} ${config.text} ${config.shadow} transition-all duration-200 group font-semibold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
    >
      <span className="text-lg">{config.emoji}</span>
      <span className="flex-1">{displayLabel}</span>
      <ChevronRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
    </button>
  );
};

// ============================================
// ACHIEVEMENT TOAST
// ============================================

export const AchievementToast: React.FC<{ notification: AchievementNotification; onClose: () => void }> = ({ notification, onClose }) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  
  // Auto-close después de 1.5 segundos (muy rápido para no molestar)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onCloseRef.current();
    }, 1500);
    return () => clearTimeout(timer);
  }, [notification.id]);

  // Colores sólidos sin transparencia
  const bgColors: Record<string, string> = {
    xp: 'bg-gradient-to-r from-amber-600 to-yellow-500',
    coins: 'bg-gradient-to-r from-yellow-600 to-orange-500',
    level_up: 'bg-gradient-to-r from-purple-600 to-pink-500',
    badge: 'bg-gradient-to-r from-emerald-600 to-teal-500',
    streak: 'bg-gradient-to-r from-orange-600 to-red-500',
    steps: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    level: 'bg-gradient-to-r from-purple-600 to-pink-500',
    video: 'bg-gradient-to-r from-red-600 to-pink-500',
    project: 'bg-gradient-to-r from-green-600 to-emerald-500',
  };

  return (
    <div className={`flex items-center gap-3 px-3 py-2 rounded-lg ${bgColors[notification.type]} shadow-lg max-w-[200px] animate-slide-in-right pointer-events-none`}>
      <div className="text-xl">{notification.icon}</div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-white text-sm">{notification.title}</h4>
      </div>
    </div>
  );
};

// ============================================
// COUNTDOWN TIMER
// ============================================

export const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { language } = useLanguage();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      try {
        const target = new Date(targetDate + 'Z').getTime();
        const now = new Date().getTime();
        const diff = target - now;
        
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        };
      } catch (e) {
        console.error('Error calculating time:', e);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    const updateCountdown = () => setTimeLeft(calculateTime());

    const startTimer = () => {
      if (timerRef.current) return;
      updateCountdown();
      timerRef.current = window.setInterval(updateCountdown, 1000);
    };

    const stopTimer = () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
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
  }, [targetDate]);

  const labels = {
    days: { es: 'DÍAS', en: 'DAYS', pt: 'DIAS' },
    hours: { es: 'HORAS', en: 'HOURS', pt: 'HORAS' },
    minutes: { es: 'MIN', en: 'MIN', pt: 'MIN' },
    seconds: { es: 'SEG', en: 'SEC', pt: 'SEG' }
  };

  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="bg-slate-800 rounded-lg p-3 text-center">
        <div className="text-3xl font-bold text-white font-mono">{String(timeLeft.days).padStart(2, '0')}</div>
        <div className="text-xs text-slate-400">{labels.days[language]}</div>
      </div>
      <div className="bg-slate-800 rounded-lg p-3 text-center">
        <div className="text-3xl font-bold text-white font-mono">{String(timeLeft.hours).padStart(2, '0')}</div>
        <div className="text-xs text-slate-400">{labels.hours[language]}</div>
      </div>
      <div className="bg-slate-800 rounded-lg p-3 text-center">
        <div className="text-3xl font-bold text-white font-mono">{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div className="text-xs text-slate-400">{labels.minutes[language]}</div>
      </div>
      <div className="bg-slate-800 rounded-lg p-3 text-center border border-orange-500/30">
        <div className="text-3xl font-bold text-orange-400 font-mono">{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div className="text-xs text-slate-400">{labels.seconds[language]}</div>
      </div>
    </div>
  );
};

// ============================================
// LOCKED CONTENT PREVIEW
// ============================================

export const LockedContentPreview: React.FC<{
  title: string;
  description: string;
  features: string[];
  userEmail?: string;
}> = ({ title, description, features, userEmail }) => {
  const { language } = useLanguage();
  const t = (content: LC | string): string => tLocalized(content, language);
  
  return (
    <div className="relative">
      {/* Blurred background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/90 backdrop-blur-sm z-10 rounded-2xl" />
      
      {/* Lock overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-6 shadow-2xl border border-slate-600">
          <Lock className="w-12 h-12 text-slate-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-slate-400 text-lg mb-8 max-w-md">{description}</p>
        
        {/* Features list */}
        <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-left bg-slate-800/50 rounded-lg px-4 py-3 border border-slate-700">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="text-slate-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <a
          href={`https://iansaura.com/api/subscribe.php${userEmail ? `?email=${encodeURIComponent(userEmail)}` : ''}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-4 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
        >
          <Crown className="w-6 h-6" />
          {t({ es: 'Suscribirme - $30/mes', en: 'Subscribe - $30/month', pt: 'Assinar - $30/mês' })}
          <ChevronRight className="w-5 h-5" />
        </a>
        
        <p className="text-slate-500 text-sm mt-4">
          {t({ es: 'Sin compromiso • Cancelá cuando quieras', en: 'No commitment • Cancel anytime', pt: 'Sem compromisso • Cancele quando quiser' })}
        </p>
      </div>
      
      {/* Fake blurred content behind */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden rounded-2xl">
        <div className="grid grid-cols-3 gap-4 p-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-slate-800 rounded-xl h-48 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
};
