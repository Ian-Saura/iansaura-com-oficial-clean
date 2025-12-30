import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Specialization } from '../types/members';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface SpecializationCountdownProps {
  specialization: Specialization;
  onNotifyMe?: (email: string, specId: string) => void;
  compact?: boolean;
  isBeta?: boolean;
}

const calculateTimeLeft = (targetDate: string): CountdownValues => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

export const SpecializationCountdown: React.FC<SpecializationCountdownProps> = ({
  specialization,
  onNotifyMe,
  compact = false,
  isBeta = false
}) => {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<CountdownValues>(
    specialization.releaseDateISO ? calculateTimeLeft(specialization.releaseDateISO) : { days: 0, hours: 0, minutes: 0, seconds: 0 }
  );
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Optimized countdown - pauses when tab is hidden to save CPU
  useEffect(() => {
    if (!specialization.releaseDateISO) return;
    
    const updateCountdown = () => {
      setTimeLeft(calculateTimeLeft(specialization.releaseDateISO!));
    };

    const startTimer = () => {
      if (timerRef.current) return; // Already running
      updateCountdown(); // Update immediately when tab becomes visible
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

    // Only start timer if page is visible
    if (!document.hidden) {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [specialization.releaseDateISO]);

  const handleNotifyMe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Guardar en localStorage que ya está suscrito
    const subscribed = JSON.parse(localStorage.getItem('specNotifications') || '{}');
    subscribed[specialization.id] = email;
    localStorage.setItem('specNotifications', JSON.stringify(subscribed));
    
    // Llamar callback si existe
    if (onNotifyMe) {
      await onNotifyMe(email, specialization.id);
    }
    
    setIsSubscribed(true);
    setIsLoading(false);
  };

  // Check if already subscribed
  useEffect(() => {
    const subscribed = JSON.parse(localStorage.getItem('specNotifications') || '{}');
    if (subscribed[specialization.id]) {
      setIsSubscribed(true);
    }
  }, [specialization.id]);

  // Only show as launched if the release date has actually passed (not just countdown at 0)
  const releaseDate = specialization.releaseDateISO ? new Date(specialization.releaseDateISO) : null;
  const isLaunched = releaseDate ? new Date() >= releaseDate : false;

  const labels = {
    days: { es: 'días', en: 'days', pt: 'dias' },
    hours: { es: 'horas', en: 'hours', pt: 'horas' },
    minutes: { es: 'min', en: 'min', pt: 'min' },
    seconds: { es: 'seg', en: 'sec', pt: 'seg' },
    notifyMe: { es: 'Avisarme cuando lance', en: 'Notify me when it launches', pt: 'Me avisar quando lançar' },
    emailPlaceholder: { es: 'tu@email.com', en: 'your@email.com', pt: 'seu@email.com' },
    subscribed: { es: '✅ Te avisaremos!', en: '✅ We\'ll notify you!', pt: '✅ Vamos te avisar!' },
    launching: { es: '🚀 Lanzamiento:', en: '🚀 Launching:', pt: '🚀 Lançamento:' },
    launched: { es: '🎉 ¡Ya disponible!', en: '🎉 Now available!', pt: '🎉 Já disponível!' },
    comingSoon: { es: 'Próximamente', en: 'Coming Soon', pt: 'Em breve' }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-orange-400">{labels.launching[language]}</span>
        <div className="flex gap-1 font-mono">
          <span className="bg-slate-800 px-2 py-1 rounded">{timeLeft.days}d</span>
          <span className="bg-slate-800 px-2 py-1 rounded">{timeLeft.hours}h</span>
          <span className="bg-slate-800 px-2 py-1 rounded">{timeLeft.minutes}m</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br ${isBeta ? 'from-purple-900/30 to-slate-900/80 border-purple-500/30' : 'from-slate-800/80 to-slate-900/80 border-slate-700/50'} rounded-xl p-6 border`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-4xl">{specialization.icon}</span>
        <div>
          <h3 className="text-xl font-bold text-white">
            {specialization.title[language]}
          </h3>
          <p className="text-sm text-slate-400">
            {specialization.subtitle[language]}
          </p>
        </div>
        {isBeta ? (
          <span className="ml-auto bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <span>🧪</span> Beta
          </span>
        ) : specialization.isNext && (
          <span className="ml-auto bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full text-xs font-semibold">
            {labels.comingSoon[language]}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-slate-300 text-sm mb-4 line-clamp-2">
        {specialization.description[language]}
      </p>

      {/* Stats */}
      {specialization.stats && (
        <div className="flex flex-wrap gap-3 mb-4">
          {specialization.stats.phases && (
            <div className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs">
              <span className="text-slate-400">Fases:</span>{' '}
              <span className="text-white font-semibold">{specialization.stats.phases}</span>
            </div>
          )}
          {specialization.stats.steps && (
            <div className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs">
              <span className="text-slate-400">Pasos:</span>{' '}
              <span className="text-white font-semibold">{specialization.stats.steps}+</span>
            </div>
          )}
          {specialization.stats.labs && (
            <div className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs">
              <span className="text-slate-400">Labs:</span>{' '}
              <span className="text-white font-semibold">{specialization.stats.labs}</span>
            </div>
          )}
          {specialization.stats.exercises && (
            <div className="bg-slate-700/50 px-3 py-1 rounded-lg text-xs">
              <span className="text-slate-400">Ejercicios:</span>{' '}
              <span className="text-white font-semibold">{specialization.stats.exercises}</span>
            </div>
          )}
        </div>
      )}

      {/* Beta Access Banner */}
      {isBeta && (
        <div className="mb-4 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-xl p-4 border border-purple-500/20">
          <div className="text-sm text-purple-400 mb-2 flex items-center gap-2 font-semibold">
            <span>🎉</span>
            <span>{({ es: '¡Tenés acceso anticipado!', en: 'You have early access!', pt: 'Você tem acesso antecipado!' } as any)[language]}</span>
          </div>
          <p className="text-xs text-slate-400">
            {({ es: 'Como beta tester, podés explorar esta especialización antes que nadie.', en: 'As a beta tester, you can explore this specialization before anyone else.', pt: 'Como beta tester, você pode explorar esta especialização antes de todos.' } as any)[language]}
          </p>
        </div>
      )}

      {/* Countdown - ALWAYS show if there's a release date and not launched (hide for beta) */}
      {specialization.releaseDate && !isBeta && (
        <div className="mb-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-xl p-4 border border-orange-500/20">
          <div className="text-sm text-orange-400 mb-3 flex items-center gap-2 font-semibold">
            <span>🚀</span>
            <span>{({ es: 'Lanzamiento:', en: 'Launch:', pt: 'Lançamento:' } as any)[language]} {specialization.releaseDate}</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="bg-slate-900/80 rounded-lg p-3 text-center border border-slate-700/50">
              <div className="text-3xl font-bold text-white font-mono">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-xs text-slate-400 uppercase">{labels.days[language]}</div>
            </div>
            <div className="bg-slate-900/80 rounded-lg p-3 text-center border border-slate-700/50">
              <div className="text-3xl font-bold text-white font-mono">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs text-slate-400 uppercase">{labels.hours[language]}</div>
            </div>
            <div className="bg-slate-900/80 rounded-lg p-3 text-center border border-slate-700/50">
              <div className="text-3xl font-bold text-white font-mono">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs text-slate-400 uppercase">{labels.minutes[language]}</div>
            </div>
            <div className="bg-slate-900/80 rounded-lg p-3 text-center border border-orange-500/30">
              <div className="text-3xl font-bold text-orange-400 font-mono">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-xs text-slate-400 uppercase">{labels.seconds[language]}</div>
            </div>
          </div>
        </div>
      )}

      {/* Beta CTA Button */}
      {isBeta && (
        <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          <span>🚀</span>
          {({ es: 'Comenzar Especialización', en: 'Start Specialization', pt: 'Iniciar Especialização' } as any)[language]}
        </button>
      )}

      {/* Notify Me Form */}
      {!isLaunched && !isSubscribed && !isBeta && (
        <form onSubmit={handleNotifyMe} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={labels.emailPlaceholder[language]}
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all disabled:opacity-50"
          >
            {isLoading ? '...' : '🔔'}
          </button>
        </form>
      )}

      {/* Subscribed state */}
      {isSubscribed && !isLaunched && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
          <span className="text-emerald-400 text-sm">{labels.subscribed[language]}</span>
        </div>
      )}

      {/* Skills preview */}
      <div className="mt-4 flex flex-wrap gap-2">
        {specialization.skills.slice(0, 4).map((skill, idx) => (
          <span
            key={idx}
            className="bg-slate-700/30 text-slate-300 px-2 py-1 rounded text-xs"
          >
            {skill[language]}
          </span>
        ))}
        {specialization.skills.length > 4 && (
          <span className="text-slate-500 text-xs">
            +{specialization.skills.length - 4} más
          </span>
        )}
      </div>
    </div>
  );
};

// Componente para lista de próximas especializaciones
export const ComingSpecializations: React.FC<{
  specializations: Specialization[];
  title?: string;
}> = ({ specializations, title }) => {
  const { language } = useLanguage();
  
  const nextSpecs = specializations
    .filter(s => s.status === 'coming_soon' && !s.isHidden && s.isNext)
    .sort((a, b) => {
      if (!a.releaseDateISO || !b.releaseDateISO) return 0;
      return new Date(a.releaseDateISO).getTime() - new Date(b.releaseDateISO).getTime();
    });

  if (nextSpecs.length === 0) return null;

  const labels = {
    title: { es: '🚀 Próximas Especializaciones', en: '🚀 Coming Specializations', pt: '🚀 Próximas Especializações' },
    subtitle: { es: 'Nuevas rutas de aprendizaje avanzadas', en: 'New advanced learning paths', pt: 'Novas trilhas de aprendizado avançadas' }
  };

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          {title || labels.title[language]}
        </h2>
        <p className="text-slate-400">{labels.subtitle[language]}</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {nextSpecs.map(spec => (
          <SpecializationCountdown key={spec.id} specialization={spec} />
        ))}
      </div>
    </section>
  );
};

export default SpecializationCountdown;

