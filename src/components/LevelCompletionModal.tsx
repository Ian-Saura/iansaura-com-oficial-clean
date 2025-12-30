import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Linkedin, Check, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LevelCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: number;
  levelTitle: string;
  userName: string;
  userEmail: string;
  stats: {
    xp: number;
    streak: number;
    projects: number;
  };
  onDownloadCertificate: () => void;
}

const levelInfo: Record<number, { emoji: string; badge: string; color: string; gradient: string }> = {
  0: { emoji: '🌱', badge: 'Semilla', color: '#22c55e', gradient: 'from-green-500 to-emerald-500' },
  1: { emoji: '🌿', badge: 'Novato', color: '#10b981', gradient: 'from-emerald-500 to-teal-500' },
  2: { emoji: '⚔️', badge: 'Guerrero', color: '#8b5cf6', gradient: 'from-purple-500 to-pink-500' },
  3: { emoji: '👑', badge: 'Maestro', color: '#f59e0b', gradient: 'from-yellow-500 to-orange-500' }
};

export const LevelCompletionModal: React.FC<LevelCompletionModalProps> = ({
  isOpen,
  onClose,
  level,
  levelTitle,
  userName,
  userEmail,
  stats,
  onDownloadCertificate
}) => {
  const [copied, setCopied] = React.useState(false);
  const info = levelInfo[level] || levelInfo[1];
  const confettiTriggered = useRef(false);

  // Disparar confetti épico cuando se abre
  useEffect(() => {
    if (isOpen && !confettiTriggered.current) {
      confettiTriggered.current = true;
      
      // Confetti desde los lados
      const count = 200;
      const defaults = { origin: { y: 0.7 } };

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      };

      // Primera ola
      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });

      // Estrellas después
      setTimeout(() => {
        confetti({
          spread: 360,
          ticks: 100,
          gravity: 0,
          decay: 0.94,
          startVelocity: 30,
          shapes: ['star'],
          colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
          particleCount: 50,
          scalar: 1.2,
          origin: { x: 0.5, y: 0.5 }
        });
      }, 500);

      // Más confetti
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, 1000);
    }
    
    if (!isOpen) {
      confettiTriggered.current = false;
    }
  }, [isOpen]);

  const getShareText = () => {
    return `🎉 ¡Completé el ${levelTitle} en Data Engineering!

${info.emoji} Nivel: ${info.badge}
⚡ XP: ${stats.xp.toLocaleString()}
🔥 Streak: ${stats.streak} días
🚀 Proyectos: ${stats.projects}

El camino a mi primer trabajo en datos continúa.

👉 Gracias Ian Saura por crear esta academia. Si querés aprender Data Engineering, les recomiendo su plataforma: https://iansaura.com

#DataEngineering #Portfolio #Carrera`;
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareLinkedIn = () => {
    navigator.clipboard.writeText(getShareText());
    window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      >
        {/* Backdrop con blur */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden"
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-10`} />
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Content */}
          <div className="relative p-8 text-center">
            {/* Trophy animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10, delay: 0.2 }}
              className="mb-6"
            >
              <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${info.gradient} p-1`}>
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <span className="text-6xl">{info.emoji}</span>
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-2">
                🎉 ¡Felicitaciones!
              </h2>
              <p className="text-xl text-slate-300 mb-2">
                Completaste el <span className="font-bold" style={{ color: info.color }}>{levelTitle}</span>
              </p>
              <p className="text-slate-400 mb-6">
                Ahora sos <span className="font-semibold text-white">{info.emoji} {info.badge}</span>
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-amber-400">{stats.xp.toLocaleString()}</div>
                <div className="text-xs text-slate-400">XP Total</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-orange-400">{stats.streak}</div>
                <div className="text-xs text-slate-400">Días Streak</div>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl font-bold text-emerald-400">{stats.projects}</div>
                <div className="text-xs text-slate-400">Proyectos</div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {/* Download Certificate */}
              <button
                onClick={onDownloadCertificate}
                className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r ${info.gradient} text-white font-bold text-lg hover:opacity-90 transition-opacity shadow-lg`}
              >
                <Award className="w-6 h-6" />
                Descargar Certificado
              </button>

              {/* Share on LinkedIn */}
              <button
                onClick={handleShareLinkedIn}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#0077b5] text-white font-bold hover:bg-[#006399] transition-colors shadow-lg"
              >
                <Linkedin className="w-6 h-6" />
                Compartir en LinkedIn
              </button>

              {/* Copy text */}
              <button
                onClick={handleCopyText}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                {copied ? '¡Texto copiado!' : 'Copiar texto para compartir'}
              </button>
            </motion.div>

            {/* Tip */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-sm text-slate-500"
            >
              💡 Tip: Etiquetá a <a href="https://linkedin.com/in/iansaura" target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:underline">Ian Saura</a> en tu post para mayor alcance
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LevelCompletionModal;
