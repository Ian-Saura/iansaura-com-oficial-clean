import React, { useState } from 'react';
import { Video, Play, CheckCircle, ExternalLink, Lock } from 'lucide-react';
import { useUserProgress } from '../../../hooks/useUserProgress';
import { bootcamps, upcomingBootcamps, DISCORD_INVITE_LINK } from '../../../data/videosData';
import { useLanguage } from '../../../i18n/LanguageContext';

interface VideosTabProps {
  progress: ReturnType<typeof useUserProgress>;
}

export const VideosTab: React.FC<VideosTabProps> = ({ progress }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const videoPlayerRef = React.useRef<HTMLDivElement>(null);
  const { tLocalized } = useLanguage();
  const bootcamp = bootcamps[0]; // Fundamentos
  const videosWatched = progress.progress.watchedVideos.length;
  const totalVideos = bootcamp.videos.length;
  const videoProgress = Math.round((videosWatched / totalVideos) * 100);
  
  // Auto-scroll to video player when a video is selected
  const handleSelectVideo = (youtubeId: string) => {
    setSelectedVideo(youtubeId);
    // Scroll to video player after a small delay to ensure it's rendered
    setTimeout(() => {
      videoPlayerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">🎓 {tLocalized(bootcamp.title)}</h2>
        <p className="text-slate-400">{tLocalized(bootcamp.edition)} - {bootcamp.date}. {tLocalized({ es: 'Mirá los videos acá mismo.', en: 'Watch the videos right here.', pt: 'Assista aos vídeos aqui mesmo.' })}</p>
      </div>

      {/* Progress */}
      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-red-400" />
            <span className="font-semibold text-white">{tLocalized({ es: 'Progreso del Bootcamp', en: 'Bootcamp Progress', pt: 'Progresso do Bootcamp' })}</span>
          </div>
          <span className="text-white font-bold">{videosWatched}/{totalVideos} {tLocalized({ es: 'videos', en: 'videos', pt: 'vídeos' })}</span>
        </div>
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 transition-all" style={{ width: `${videoProgress}%` }} />
        </div>
      </div>

      {/* Video Player */}
      {selectedVideo && (
        <div ref={videoPlayerRef} className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 scroll-mt-20">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Video del bootcamp"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="p-4 flex justify-between items-center">
            <span className="text-slate-400 text-sm">
              {tLocalized(bootcamp.videos.find(v => v.youtubeId === selectedVideo)?.title || '')}
            </span>
            <div className="flex gap-2">
              <button onClick={() => progress.markVideoWatched(selectedVideo)}
                className={`px-3 py-1 rounded text-sm ${
                  progress.isVideoWatched(selectedVideo)
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}>
                {progress.isVideoWatched(selectedVideo) ? `✓ ${tLocalized({ es: 'Visto', en: 'Watched', pt: 'Assistido' })}` : tLocalized({ es: 'Marcar como visto', en: 'Mark as watched', pt: 'Marcar como assistido' })}
              </button>
              <button onClick={() => setSelectedVideo(null)} className="text-slate-400 hover:text-white text-sm">{tLocalized({ es: 'Cerrar', en: 'Close', pt: 'Fechar' })}</button>
            </div>
          </div>
        </div>
      )}

      {/* Video List */}
      <div className="grid gap-4">
        {bootcamp.videos.map((video) => {
          const isWatched = progress.isVideoWatched(video.youtubeId);
          return (
            <div
              key={video.week}
              id={`video-week-${video.week}`}
              className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                selectedVideo === video.youtubeId
                  ? 'bg-red-500/10 border-red-500/50'
                  : isWatched
                    ? 'bg-emerald-500/5 border-emerald-500/30'
                    : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => handleSelectVideo(video.youtubeId)}
            >
              {/* Thumbnail - Full width on mobile, fixed on desktop */}
              <div className="relative w-full sm:w-32 h-40 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-900">
                <img src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} alt={tLocalized(video.title)} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors">
                  <Play className="w-12 sm:w-8 h-12 sm:h-8 text-white" fill="white" />
                </div>
                {isWatched && (
                  <div className="absolute top-2 right-2 sm:top-1 sm:right-1 bg-emerald-500 rounded-full p-1 sm:p-0.5">
                    <CheckCircle className="w-4 sm:w-3 h-4 sm:h-3 text-white" />
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-red-500/20 text-red-400 text-xs px-2 py-0.5 rounded-full font-medium">{tLocalized({ es: 'Semana', en: 'Week', pt: 'Semana' })} {video.week}</span>
                  {isWatched && <span className="text-emerald-400 text-xs">✓ {tLocalized({ es: 'Visto', en: 'Watched', pt: 'Assistido' })}</span>}
                </div>
                <h3 className="font-semibold text-white text-sm sm:text-base line-clamp-2 sm:truncate">{tLocalized(video.title)}</h3>
                <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 sm:truncate">{tLocalized(video.description)}</p>
              </div>
              
              {/* Buttons - Full width on mobile */}
              <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto flex-wrap sm:flex-nowrap">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleSelectVideo(video.youtubeId); }}
                  className="flex-1 sm:flex-none bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Play className="w-4 h-4" /> {tLocalized({ es: 'Ver acá', en: 'Watch here', pt: 'Assistir aqui' })}
                </button>
                <a
                  href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-2.5 sm:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  title={tLocalized({ es: 'Abrir en YouTube', en: 'Open in YouTube', pt: 'Abrir no YouTube' })}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="sm:hidden">YouTube</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Q&A Reminder */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-4 border border-amber-500/30">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💬</span>
          <div className="flex-1">
            <p className="text-amber-200 text-sm">
              <strong>{tLocalized({ es: '¿Tenés dudas sobre los videos?', en: 'Questions about videos?', pt: 'Dúvidas sobre os vídeos?' })}</strong> {tLocalized({ es: 'Dejá tus preguntas en el canal', en: 'Leave your questions in', pt: 'Deixe suas perguntas no canal' })} <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-amber-300">#q-and-a</span> {tLocalized({ es: 'de Discord para la próxima sesión en vivo.', en: 'channel on Discord for the next live session.', pt: 'do Discord para a próxima sessão ao vivo.' })}
            </p>
          </div>
          <a 
            href={DISCORD_INVITE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium rounded-lg transition-colors text-sm border border-amber-500/30"
          >
            {tLocalized({ es: 'Ir a Discord', en: 'Go to Discord', pt: 'Ir para o Discord' })}
          </a>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-400 mb-4">🔜 {tLocalized({ es: 'Próximamente', en: 'Coming Soon', pt: 'Em Breve' })}</h3>
        <div className="space-y-3">
          {upcomingBootcamps.map((b, idx) => (
            <div key={idx} className="flex items-center gap-3 text-slate-500">
              <Lock className="w-5 h-5" />
              <span><strong>{tLocalized(b.title)}</strong> - {b.estimatedDate}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Alias for backwards compatibility
export const GrabacionesTab = VideosTab;

