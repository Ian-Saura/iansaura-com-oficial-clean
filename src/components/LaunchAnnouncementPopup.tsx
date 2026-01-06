import React, { useState, useEffect } from 'react';
import { X, Rocket, Play, ArrowRight, Star, Award, BookOpen, Code } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../types/i18n';
import { motion, AnimatePresence } from 'framer-motion';

interface LaunchAnnouncementPopupProps {
  onClose: () => void;
  onGoToSpecialization: () => void;
}

const STORAGE_KEY = 'ian-saura-databricks-launch-seen';

export const useLaunchAnnouncement = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem(STORAGE_KEY);
    if (!hasSeenPopup) {
      // Show popup after a small delay
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissPopup = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShowPopup(false);
  };

  return { showPopup, dismissPopup };
};

export const LaunchAnnouncementPopup: React.FC<LaunchAnnouncementPopupProps> = ({
  onClose,
  onGoToSpecialization
}) => {
  const { language } = useLanguage();
  
  const t = (content: LC | string): string => {
    if (typeof content === 'string') return content;
    return tLocalized(content, language);
  };

  const handleGoToSpecialization = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    onGoToSpecialization();
  };

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-orange-500/30 shadow-2xl shadow-orange-500/20 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Animated background effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-amber-500/20 animate-pulse"></div>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="relative p-8">
            {/* Header with icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/30 mb-4">
                <span className="text-5xl">🔶</span>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-3 border border-emerald-500/30">
                  <Rocket className="w-4 h-4" />
                  {t({ es: '¡NUEVO LANZAMIENTO!', en: 'NEW LAUNCH!', pt: 'NOVO LANÇAMENTO!' })}
                </div>
              </motion.div>

              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {t({ es: 'Especialización en Databricks', en: 'Databricks Specialization', pt: 'Especialização em Databricks' })}
              </h2>
              
              <p className="text-orange-400 font-medium">
                {t({ es: 'El mejor curso de Databricks en LATAM', en: 'The best Databricks course in LATAM', pt: 'O melhor curso de Databricks em LATAM' })}
              </p>
            </div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-3 mb-6"
            >
              <div className="bg-slate-800/80 rounded-xl p-3 flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">12 {t({ es: 'Fases', en: 'Phases', pt: 'Fases' })}</div>
                  <div className="text-slate-400 text-xs">{t({ es: '100+ pasos', en: '100+ steps', pt: '100+ passos' })}</div>
                </div>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-3 flex items-center gap-3">
                <Code className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">20 {t({ es: 'Ejercicios', en: 'Exercises', pt: 'Exercícios' })}</div>
                  <div className="text-slate-400 text-xs">Spark & Delta</div>
                </div>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-3 flex items-center gap-3">
                <Star className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">10 Labs</div>
                  <div className="text-slate-400 text-xs">Hands-on</div>
                </div>
              </div>
              <div className="bg-slate-800/80 rounded-xl p-3 flex items-center gap-3">
                <Award className="w-5 h-5 text-orange-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-sm">{t({ es: 'Certificación', en: 'Certification', pt: 'Certificação' })}</div>
                  <div className="text-slate-400 text-xs">DE Associate</div>
                </div>
              </div>
            </motion.div>

            {/* Topics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-2 mb-6"
            >
              {['Spark', 'Delta Lake', 'Unity Catalog', 'DLT', 'MLflow', 'Workflows', 'SQL'].map(topic => (
                <span key={topic} className="bg-orange-500/10 text-orange-300 text-xs px-3 py-1 rounded-full border border-orange-500/20">
                  {topic}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <button
                onClick={handleGoToSpecialization}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:from-orange-400 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:scale-[1.02]"
              >
                <Play className="w-5 h-5" />
                {t({ es: '¡Comenzar Ahora!', en: 'Start Now!', pt: 'Começar Agora!' })}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-colors"
              >
                {t({ es: 'Ver más tarde', en: 'View later', pt: 'Ver mais tarde' })}
              </button>
            </motion.div>

            {/* Footer note */}
            <p className="text-center text-slate-500 text-xs mt-4">
              {t({ es: '✨ Incluido gratis en tu suscripción Premium', en: '✨ Included free in your Premium subscription', pt: '✨ Incluído grátis na sua assinatura Premium' })}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LaunchAnnouncementPopup;

