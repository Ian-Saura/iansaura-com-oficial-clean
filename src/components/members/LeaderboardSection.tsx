import React, { useState, useEffect } from 'react';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useLanguage } from '../../i18n/LanguageContext';

// Map avatar IDs to emoji icons
const AVATAR_ICONS: Record<string, string> = {
  'avatar-python': '🐍', 'avatar-sql': '🗃️', 'avatar-terminal': '💻',
  'avatar-coffee': '☕', 'avatar-bug': '🐛', 'avatar-rocket': '🚀',
  'avatar-cloud': '☁️', 'avatar-spark': '⚡', 'avatar-docker': '🐳',
  'avatar-robot': '🤖', 'avatar-ninja': '🥷', 'avatar-fire': '🔥',
  'avatar-architect': '🏛️', 'avatar-dragon': '🐉', 'avatar-alien': '👽',
  'avatar-crown': '👑', 'avatar-wizard': '🧙', 'avatar-unicorn': '🦄',
  'avatar-diamond': '💎', 'avatar-galaxy': '🌌'
};

const getAvatarIcon = (avatarId?: string): string | null => {
  if (!avatarId) return null;
  return AVATAR_ICONS[avatarId] || null;
};

interface LeaderboardEntry {
  position: number;
  name: string;
  steps: number;
  projects: number;
  score: number;
  medal: string;
  isCurrentUser?: boolean;
  avatar?: string; // Avatar emoji icon
}

interface PreviousWinner {
  position: number;
  medal: string;
  name: string;
  score: number;
  steps: number;
  projects: number;
  prize: number;
}

interface LeaderboardSectionProps {
  userProgress: ReturnType<typeof useUserProgress>;
  userName: string;
}

export const LeaderboardSection: React.FC<LeaderboardSectionProps> = ({ userProgress, userName }) => {
  const { t } = useLanguage();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [myPosition, setMyPosition] = useState<number | null>(null);
  const [previousWinners, setPreviousWinners] = useState<PreviousWinner[]>([]);
  const [previousMonthName, setPreviousMonthName] = useState<string>('');

  // Calcular mi score
  const mySteps = userProgress.progress.completedSteps.length;
  const myProjects = userProgress.progress.completedProjects.length;
  const myVideos = userProgress.progress.watchedVideos.length;
  const myScore = (mySteps * 10) + (myProjects * 25) + (myVideos * 5);
  
  // Get my equipped avatar
  const myAvatar = userProgress.progress.equippedAvatar;
  
  // Generar mi nombre para el leaderboard (Nombre A.)
  const getMyDisplayName = () => {
    const parts = userName.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1].charAt(0).toUpperCase()}.`;
    }
    return parts[0] || 'Tú';
  };
  const myDisplayName = getMyDisplayName();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard.php');
        const data = await response.json();
        if (data.success && data.leaderboard.length > 0) {
          const leaderboardWithMe = insertCurrentUser(data.leaderboard);
          setLeaderboard(leaderboardWithMe);
        } else {
          const myEntry: LeaderboardEntry = {
            position: 1,
            name: myDisplayName,
            steps: mySteps,
            projects: myProjects,
            score: myScore,
            medal: '🥇',
            isCurrentUser: true,
            avatar: getAvatarIcon(myAvatar) || undefined
          };
          setLeaderboard([myEntry]);
          setMyPosition(1);
        }
      } catch (error) {
        const myEntry: LeaderboardEntry = {
          position: 1,
          name: myDisplayName,
          steps: mySteps,
          projects: myProjects,
          score: myScore,
          medal: '🥇',
          isCurrentUser: true,
          avatar: getAvatarIcon(myAvatar) || undefined
        };
        setLeaderboard([myEntry]);
        setMyPosition(1);
      } finally {
        setLoading(false);
      }
    };

    const insertCurrentUser = (entries: LeaderboardEntry[]): LeaderboardEntry[] => {
      // Filtrar cualquier entrada que coincida con el usuario actual
      // Comparar por nombre normalizado para evitar duplicados
      const normalizedMyName = myDisplayName.toLowerCase().trim();
      const filtered = entries.filter(e => {
        const normalizedEntryName = e.name.toLowerCase().trim();
        // Excluir si el nombre es igual o muy similar
        return normalizedEntryName !== normalizedMyName && 
               !normalizedEntryName.startsWith(normalizedMyName.split(' ')[0].toLowerCase());
      });

      const myEntry: LeaderboardEntry = {
        position: 0,
        name: myDisplayName,
        steps: mySteps,
        projects: myProjects,
        score: myScore,
        medal: '',
        isCurrentUser: true,
        avatar: getAvatarIcon(myAvatar) || undefined
      };

      // Encontrar posición correcta basada en score
      let position = 1;
      for (const entry of filtered) {
        if (myScore >= entry.score) break;
        position++;
      }
      
      const result = [...filtered];
      myEntry.position = position;
      myEntry.medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : '';
      
      result.splice(position - 1, 0, myEntry);
      
      result.forEach((entry, idx) => {
        entry.position = idx + 1;
        entry.medal = entry.position === 1 ? '🥇' : entry.position === 2 ? '🥈' : entry.position === 3 ? '🥉' : '';
      });

      setMyPosition(position);
      
      if (position <= 5) {
        return result.slice(0, 5);
      } else {
        return [...result.slice(0, 4), myEntry];
      }
    };

    fetchLeaderboard();
    
    // Fetch previous month winners
    const fetchPreviousWinners = async () => {
      try {
        const response = await fetch('/api/leaderboard-winners.php');
        const data = await response.json();
        if (data.success && data.has_winners) {
          setPreviousWinners(data.winners);
          setPreviousMonthName(data.month_name);
        }
      } catch (error) {
        console.error('Error fetching previous winners:', error);
      }
    };
    fetchPreviousWinners();
  }, [myScore, mySteps, myProjects, myDisplayName, myAvatar]);

  const getMedalColor = (position: number, isCurrentUser: boolean) => {
    if (isCurrentUser) return 'from-emerald-500/30 to-teal-500/30 border-emerald-500/60 ring-2 ring-emerald-500/30';
    if (position === 1) return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/40';
    if (position === 2) return 'from-slate-400/20 to-slate-500/20 border-slate-400/40';
    if (position === 3) return 'from-orange-600/20 to-amber-700/20 border-orange-600/40';
    return 'bg-slate-800/50 border-slate-700';
  };

  const getCurrentMonth = () => {
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return months[new Date().getMonth()];
  };

  return (
    <div className="space-y-4">
      {/* 🏆 Previous Month Winners - Hall of Fame */}
      {previousWinners.length > 0 && (
        <div className="bg-gradient-to-br from-amber-900/20 via-yellow-900/10 to-amber-900/20 rounded-xl p-4 border border-amber-500/30">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-amber-400 font-bold flex items-center gap-2">
              🏆 {t('leaderboard.hallOfFame')}
            </h3>
            <span className="text-amber-500/60 text-xs">{previousMonthName}</span>
          </div>
          
          {/* Podium Style */}
          <div className="flex items-end justify-center gap-2 mb-3">
            {/* 2nd Place */}
            {previousWinners[1] && (
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">{previousWinners[1].medal}</div>
                <div className="w-16 h-16 bg-slate-400/20 rounded-lg flex flex-col items-center justify-center border border-slate-400/40">
                  <span className="text-slate-300 text-xs font-medium truncate max-w-14">{previousWinners[1].name.split(' ')[0]}</span>
                  <span className="text-slate-400 text-xs">{previousWinners[1].score} pts</span>
                </div>
                <span className="text-amber-400 text-xs mt-1">+{previousWinners[1].prize} 🪙</span>
              </div>
            )}
            
            {/* 1st Place (tallest) */}
            {previousWinners[0] && (
              <div className="flex flex-col items-center -mt-4">
                <div className="text-3xl mb-1 animate-bounce">{previousWinners[0].medal}</div>
                <div className="w-20 h-20 bg-yellow-500/20 rounded-lg flex flex-col items-center justify-center border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/20">
                  <span className="text-yellow-300 text-sm font-bold truncate max-w-18">{previousWinners[0].name.split(' ')[0]}</span>
                  <span className="text-yellow-400 text-xs font-medium">{previousWinners[0].score} pts</span>
                </div>
                <span className="text-amber-300 text-sm font-bold mt-1">+{previousWinners[0].prize} 🪙</span>
              </div>
            )}
            
            {/* 3rd Place */}
            {previousWinners[2] && (
              <div className="flex flex-col items-center">
                <div className="text-2xl mb-1">{previousWinners[2].medal}</div>
                <div className="w-16 h-14 bg-orange-600/20 rounded-lg flex flex-col items-center justify-center border border-orange-600/40">
                  <span className="text-orange-300 text-xs font-medium truncate max-w-14">{previousWinners[2].name.split(' ')[0]}</span>
                  <span className="text-orange-400 text-xs">{previousWinners[2].score} pts</span>
                </div>
                <span className="text-amber-400 text-xs mt-1">+{previousWinners[2].prize} 🪙</span>
              </div>
            )}
          </div>
          
          <p className="text-amber-500/70 text-xs text-center">
            ¡Felicitaciones a los ganadores! Los Data Coins ya fueron acreditados 🎉
          </p>
        </div>
      )}

      {/* Current Month Header */}
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm">{getCurrentMonth()} 2025 - {t('leaderboard.currentMonth')}</span>
        <div className="flex items-center gap-3 text-xs">
          <span>{t('leaderboard.gold')}</span>
          <span>{t('leaderboard.silver')}</span>
          <span>{t('leaderboard.bronze')}</span>
        </div>
      </div>

      {/* Mi posición - Compacta */}
      <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
            {getAvatarIcon(myAvatar) ? (
              <span className="text-2xl">{getAvatarIcon(myAvatar)}</span>
            ) : (
              <span className="text-emerald-400 font-bold text-sm">{myDisplayName.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div>
            <p className="text-white font-medium text-sm">{t('leaderboard.you')}</p>
            <p className="text-emerald-400 text-xs">{mySteps} {t('leaderboard.steps')} • {myProjects} {t('leaderboard.projects')}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-emerald-400">#{myPosition || '-'}</p>
          <p className="text-slate-400 text-xs">{myScore} pts</p>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <div 
              key={entry.position + (entry.isCurrentUser ? '-me' : '')}
              className={`flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r ${getMedalColor(entry.position, !!entry.isCurrentUser)} border transition-all`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                {entry.medal ? (
                  <span className="text-2xl">{entry.medal}</span>
                ) : (
                  <span className="text-slate-400 font-bold">#{entry.position}</span>
                )}
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${entry.isCurrentUser ? 'bg-emerald-500/30 border-2 border-emerald-500' : 'bg-slate-700 border border-slate-600'}`}>
                {/* Show avatar if available, otherwise show initial */}
                {entry.avatar || (entry.isCurrentUser && getAvatarIcon(myAvatar)) ? (
                  <span className="text-2xl">{entry.avatar || getAvatarIcon(myAvatar)}</span>
                ) : (
                  <span className={`font-bold text-sm ${entry.isCurrentUser ? 'text-emerald-400' : 'text-white'}`}>
                    {entry.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${entry.isCurrentUser ? 'text-emerald-400' : 'text-white'}`}>
                    {entry.name}
                  </span>
                  {entry.isCurrentUser && <span className="text-emerald-400 text-xs bg-emerald-500/20 px-2 py-0.5 rounded">TÚ</span>}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-400">{entry.steps} {t('leaderboard.steps')}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-500">{entry.projects} {t('leaderboard.projects')}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${entry.isCurrentUser ? 'text-emerald-400' : 'text-emerald-400'}`}>{entry.score}</span>
                <span className="text-slate-500 text-xs ml-1">pts</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 p-3 bg-slate-900/50 rounded-lg space-y-2">
        <p className="text-slate-400 text-sm text-center">
          💡 <strong className="text-white">{t('leaderboard.scoring')}</strong>
        </p>
        <div className="flex justify-center gap-4 text-xs">
          <span className="text-yellow-400">🥇 500 🪙</span>
          <span className="text-slate-400">🥈 300 🪙</span>
          <span className="text-orange-400">🥉 150 🪙</span>
        </div>
        <p className="text-slate-500 text-xs text-center">
          {t('leaderboard.prizes')}
        </p>
      </div>
    </div>
  );
};

