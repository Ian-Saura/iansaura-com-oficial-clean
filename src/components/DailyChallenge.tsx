import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Trophy, Share2, CheckCircle, Play, Zap, Users, Crown, Flame } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { ALL_SQL_EXERCISES } from '../data/exercises';

interface DailyChallengeProps {
  userEmail?: string;
  onStartChallenge: () => void;
  completedExercises: string[];
}

interface DailyStats {
  totalParticipants: number;
  averageTime: number;
  fastestTime: number;
  yourTime?: number;
  yourRank?: number;
}

// Get today's exercise based on date (deterministic)
const getTodaysExercise = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  
  // Filter to medium difficulty exercises (good for daily challenge)
  const eligibleExercises = ALL_SQL_EXERCISES.filter(e => 
    e.difficulty === 'medium' || e.difficulty === 'easy'
  );
  
  // Use day of year to pick exercise (cycles through all)
  const exerciseIndex = dayOfYear % eligibleExercises.length;
  return eligibleExercises[exerciseIndex];
};

// Format time in minutes:seconds
const formatTime = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

export default function DailyChallenge({ userEmail, onStartChallenge, completedExercises }: DailyChallengeProps) {
  const { t, tLocalized, language } = useLanguage();
  const [todaysExercise] = useState(getTodaysExercise());
  const [hasCompletedToday, setHasCompletedToday] = useState(false);
  const [stats, setStats] = useState<DailyStats | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [timeUntilReset, setTimeUntilReset] = useState('');

  // Check if user completed today's challenge
  useEffect(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    const completedToday = localStorage.getItem(`daily_challenge_${todayKey}`);
    if (completedToday) {
      setHasCompletedToday(true);
      try {
        const data = JSON.parse(completedToday);
        setStats(prev => ({ ...prev, yourTime: data.time, yourRank: data.rank } as DailyStats));
      } catch {}
    }
    
    // Also check if exercise is in completed list
    if (todaysExercise && completedExercises.includes(todaysExercise.id)) {
      setHasCompletedToday(true);
    }
  }, [todaysExercise, completedExercises]);

  // Countdown to next challenge
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilReset(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Simulated stats (in production, fetch from API)
  useEffect(() => {
    // Simulate community stats
    setStats(prev => ({
      ...prev,
      totalParticipants: Math.floor(Math.random() * 50) + 20,
      averageTime: Math.floor(Math.random() * 180) + 120, // 2-5 min
      fastestTime: Math.floor(Math.random() * 60) + 30, // 30-90 sec
    } as DailyStats));
  }, []);

  const handleShare = () => {
    const text = tLocalized({
      es: `🎯 Completé el Desafío Diario de SQL en Ian Saura!\n\n⏱️ Mi tiempo: ${stats?.yourTime ? formatTime(stats.yourTime) : 'N/A'}\n🏆 Ranking: #${stats?.yourRank || '?'}\n\n¿Podés superarme? 👇\nhttps://iansaura.com/members?tab=practica&daily=true`,
      en: `🎯 Completed the Daily SQL Challenge at Ian Saura!\n\n⏱️ My time: ${stats?.yourTime ? formatTime(stats.yourTime) : 'N/A'}\n🏆 Rank: #${stats?.yourRank || '?'}\n\nCan you beat me? 👇\nhttps://iansaura.com/members?tab=practica&daily=true`,
      pt: `🎯 Completei o Desafio Diário de SQL na Ian Saura!\n\n⏱️ Meu tempo: ${stats?.yourTime ? formatTime(stats.yourTime) : 'N/A'}\n🏆 Ranking: #${stats?.yourRank || '?'}\n\nVocê consegue me superar? 👇\nhttps://iansaura.com/members?tab=practica&daily=true`
    });

    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert(tLocalized({ es: '¡Copiado al portapapeles!', en: 'Copied to clipboard!', pt: 'Copiado!' }));
    }
  };

  if (!todaysExercise) return null;

  const exerciseTitle = typeof todaysExercise.title === 'object' 
    ? (todaysExercise.title as any)[language] || (todaysExercise.title as any).es
    : todaysExercise.title;

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
      
      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
              {tLocalized({ es: '🔥 Desafío Diario', en: '🔥 Daily Challenge', pt: '🔥 Desafio Diário' })}
              {hasCompletedToday && <CheckCircle className="w-5 h-5 text-emerald-400" />}
            </h3>
            <p className="text-sm text-slate-400 flex items-center gap-2">
              <Clock className="w-3 h-3" />
              {tLocalized({ es: 'Nuevo en', en: 'Resets in', pt: 'Reinicia em' })} {timeUntilReset}
            </p>
          </div>
        </div>
        
        {/* Streak indicator */}
        <div className="flex items-center gap-1 px-3 py-1.5 bg-orange-500/20 rounded-full">
          <Flame className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-bold text-orange-400">
            {new Date().getDate()}
          </span>
        </div>
      </div>

      {/* Today's exercise info */}
      <div className="relative bg-slate-800/50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-amber-400 font-medium uppercase tracking-wide">
            {todaysExercise.category}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            todaysExercise.difficulty === 'easy' ? 'bg-emerald-500/20 text-emerald-400' :
            todaysExercise.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {todaysExercise.difficulty}
          </span>
        </div>
        <h4 className="font-semibold text-white mb-1">{exerciseTitle}</h4>
        <p className="text-sm text-slate-400 line-clamp-2">
          {typeof todaysExercise.description === 'object'
            ? (todaysExercise.description as any)[language] || (todaysExercise.description as any).es
            : todaysExercise.description}
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-800/30 rounded-lg p-3 text-center">
            <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{stats.totalParticipants}</div>
            <div className="text-xs text-slate-500">
              {tLocalized({ es: 'Participantes', en: 'Participants', pt: 'Participantes' })}
            </div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3 text-center">
            <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{formatTime(stats.averageTime)}</div>
            <div className="text-xs text-slate-500">
              {tLocalized({ es: 'Promedio', en: 'Average', pt: 'Média' })}
            </div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3 text-center">
            <Crown className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
            <div className="text-lg font-bold text-white">{formatTime(stats.fastestTime)}</div>
            <div className="text-xs text-slate-500">
              {tLocalized({ es: 'Récord', en: 'Record', pt: 'Recorde' })}
            </div>
          </div>
        </div>
      )}

      {/* Your result (if completed) */}
      {hasCompletedToday && stats?.yourTime && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <div>
                <p className="font-semibold text-emerald-400">
                  {tLocalized({ es: '¡Completado!', en: 'Completed!', pt: 'Completado!' })}
                </p>
                <p className="text-sm text-slate-400">
                  {tLocalized({ es: 'Tu tiempo:', en: 'Your time:', pt: 'Seu tempo:' })} {formatTime(stats.yourTime)}
                  {stats.yourRank && ` • #${stats.yourRank}`}
                </p>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              {tLocalized({ es: 'Compartir', en: 'Share', pt: 'Compartilhar' })}
            </button>
          </div>
        </div>
      )}

      {/* CTA Button */}
      {!hasCompletedToday ? (
        <button
          onClick={onStartChallenge}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all hover:scale-[1.02] shadow-lg shadow-amber-500/20"
        >
          <Play className="w-5 h-5" />
          {tLocalized({ es: 'Comenzar Desafío', en: 'Start Challenge', pt: 'Iniciar Desafio' })}
          <Zap className="w-4 h-4 text-yellow-300" />
        </button>
      ) : (
        <div className="text-center text-sm text-slate-500">
          {tLocalized({ 
            es: '¡Volvé mañana para un nuevo desafío!', 
            en: 'Come back tomorrow for a new challenge!', 
            pt: 'Volte amanhã para um novo desafio!' 
          })}
        </div>
      )}

      {/* XP Bonus indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-amber-400">
        <Trophy className="w-3 h-3" />
        <span>+50 XP {tLocalized({ es: 'bonus por completar', en: 'bonus for completing', pt: 'bônus por completar' })}</span>
      </div>
    </div>
  );
}


