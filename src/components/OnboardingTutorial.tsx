import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronRight, ChevronLeft, Map, Database, Video, 
  Target, Code, Gift, Rocket
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LocalizedContent, t as tLocalized } from '../types/i18n';

interface OnboardingStep {
  id: string;
  title: LocalizedContent;
  description: LocalizedContent;
  icon: React.ReactNode;
  emoji: string;
  tip?: LocalizedContent;
}

const ONBOARDING_KEY = 'ian-saura-onboarding-completed';

interface Props {
  onComplete: () => void;
  forceShow?: boolean;
  isSubscribed?: boolean;
  onGoToPractice?: () => void;
}

export const OnboardingTutorial: React.FC<Props> = ({ 
  onComplete, 
  forceShow = false, 
  isSubscribed = false,
  onGoToPractice 
}) => {
  const { t, language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Helper for localized content
  const tl = (content: LocalizedContent | string | undefined) => {
    if (!content) return '';
    return tLocalized(content, language);
  };

  // Pasos para usuarios GRATUITOS
  const freeUserSteps = useMemo<OnboardingStep[]>(() => [
    {
      id: 'welcome-free',
      title: { es: '¡Bienvenido a la Academia! 🎉', en: 'Welcome to the Academy! 🎉', pt: 'Bem-vindo à Academia! 🎉' },
      description: { 
        es: 'Te explico rápido cómo funciona la plataforma para que no te pierdas. Son 6 secciones principales que vas a ver arriba.', 
        en: 'Let me quickly explain how the platform works so you don\'t get lost. There are 6 main sections you\'ll see above.', 
        pt: 'Vou explicar rapidamente como a plataforma funciona para você não se perder. São 6 seções principais que você verá acima.' 
      },
      icon: <Gift className="w-12 h-12" />,
      emoji: '👋',
      tip: { es: 'Tour de 1 minuto', en: '1-minute tour', pt: 'Tour de 1 minuto' }
    },
    {
      id: 'tab-dashboard',
      title: { es: '📊 Dashboard - Tu progreso', en: '📊 Dashboard - Your Progress', pt: '📊 Dashboard - Seu Progresso' },
      description: { 
        es: 'Acá ves tu XP, DataCoins, racha de días, y estadísticas. También tus certificados cuando completes niveles. Es tu "home" personal.', 
        en: 'Here you see your XP, DataCoins, daily streak, and stats. Also your certificates when you complete levels. It\'s your personal "home".', 
        pt: 'Aqui você vê seu XP, DataCoins, sequência de dias e estatísticas. Também seus certificados quando completar níveis. É sua "home" pessoal.' 
      },
      icon: <Target className="w-12 h-12" />,
      emoji: '📊',
      tip: { es: 'Revisalo cada día para ver tu progreso', en: 'Check it daily to see your progress', pt: 'Verifique diariamente para ver seu progresso' }
    },
    {
      id: 'tab-roadmap',
      title: { es: '🗺️ Roadmap - Tu camino', en: '🗺️ Roadmap - Your Path', pt: '🗺️ Roadmap - Seu Caminho' },
      description: { 
        es: 'El roadmap tiene 4 niveles: 0 (gratis), 1, 2 y 3. Cada nivel tiene fases y pasos. Seguí el orden, marcá los pasos completados, y avanzá a tu ritmo.', 
        en: 'The roadmap has 4 levels: 0 (free), 1, 2, and 3. Each level has phases and steps. Follow the order, mark completed steps, and advance at your own pace.', 
        pt: 'O roadmap tem 4 níveis: 0 (grátis), 1, 2 e 3. Cada nível tem fases e passos. Siga a ordem, marque os passos concluídos e avance no seu ritmo.' 
      },
      icon: <Map className="w-12 h-12" />,
      emoji: '🗺️',
      tip: { es: 'El Nivel 0 es 100% GRATIS', en: 'Level 0 is 100% FREE', pt: 'O Nível 0 é 100% GRÁTIS' }
    },
    {
      id: 'tab-practica',
      title: { es: '💻 Práctica - Ejercicios interactivos', en: '💻 Practice - Interactive Exercises', pt: '💻 Prática - Exercícios Interativos' },
      description: { 
        es: 'SQL, Python y Spark. Escribís código real que corre en el browser. Tenés 3 ejercicios gratis por día, con Premium son ilimitados.', 
        en: 'SQL, Python, and Spark. You write real code that runs in the browser. You have 3 free exercises per day, unlimited with Premium.', 
        pt: 'SQL, Python e Spark. Você escreve código real que roda no navegador. Você tem 3 exercícios grátis por dia, ilimitados com Premium.' 
      },
      icon: <Code className="w-12 h-12" />,
      emoji: '💻',
      tip: { es: '¡Empezá por SQL Fundamentals!', en: 'Start with SQL Fundamentals!', pt: 'Comece com SQL Fundamentals!' }
    },
    {
      id: 'tab-proyectos',
      title: { es: '📁 Proyectos - Para tu portfolio', en: '📁 Projects - For your portfolio', pt: '📁 Projetos - Para seu portfólio' },
      description: { 
        es: '40+ proyectos guiados con consignas, pasos y código. Cada uno tiene "Interview Story" para contar en entrevistas. Ideales para tu GitHub.', 
        en: '40+ guided projects with instructions, steps, and code. Each has an "Interview Story" to tell in interviews. Ideal for your GitHub.', 
        pt: '40+ projetos guiados com instruções, passos e código. Cada um tem "Interview Story" para contar em entrevistas. Ideais para seu GitHub.' 
      },
      icon: <Database className="w-12 h-12" />,
      emoji: '📁',
      tip: { es: 'Premium: acceso completo', en: 'Premium: full access', pt: 'Premium: acesso completo' }
    },
    {
      id: 'tab-videos',
      title: { es: '🎬 Videos - Bootcamp grabado', en: '🎬 Videos - Recorded Bootcamp', pt: '🎬 Vídeos - Bootcamp Gravado' },
      description: { 
        es: '8 semanas de contenido del bootcamp en video. Desde fundamentos hasta producción. Mirá directo en la plataforma.', 
        en: '8 weeks of bootcamp content in video. From fundamentals to production. Watch directly on the platform.', 
        pt: '8 semanas de conteúdo do bootcamp em vídeo. Dos fundamentos à produção. Assista diretamente na plataforma.' 
      },
      icon: <Video className="w-12 h-12" />,
      emoji: '🎬',
      tip: { es: 'Premium: todas las semanas', en: 'Premium: all weeks', pt: 'Premium: todas as semanas' }
    },
    {
      id: 'start-now',
      title: { es: '¡Listo! ¿Por dónde empezar?', en: 'Ready! Where to start?', pt: 'Pronto! Por onde começar?' },
      description: { 
        es: 'Mi recomendación: andá a "Práctica" → "SQL" y hacé tu primer ejercicio. En 2 minutos vas a tener tu primer logro. ¿Vamos? 🚀', 
        en: 'My recommendation: go to "Practice" → "SQL" and do your first exercise. In 2 minutes you\'ll have your first achievement. Let\'s go? 🚀', 
        pt: 'Minha recomendação: vá em "Prática" → "SQL" e faça seu primeiro exercício. Em 2 minutos você terá sua primeira conquista. Vamos? 🚀' 
      },
      icon: <Rocket className="w-12 h-12" />,
      emoji: '🎯',
      tip: { es: 'Click en "Ir a Práctica SQL" abajo', en: 'Click "Go to SQL Practice" below', pt: 'Clique em "Ir para Prática SQL" abaixo' }
    }
  ], []);

  // Pasos para usuarios PREMIUM/TRIAL
  const premiumUserSteps = useMemo<OnboardingStep[]>(() => [
    {
      id: 'welcome-premium',
      title: { es: '¡Bienvenido a Premium! 🚀', en: 'Welcome to Premium! 🚀', pt: 'Bem-vindo ao Premium! 🚀' },
      description: { 
        es: 'Tenés acceso COMPLETO. Te explico rápido las 6 secciones de la plataforma para que la aproveches al máximo.', 
        en: 'You have FULL access. Let me quickly explain the 6 sections of the platform so you can make the most of it.', 
        pt: 'Você tem acesso COMPLETO. Vou explicar rapidamente as 6 seções da plataforma para que você aproveite ao máximo.' 
      },
      icon: <Rocket className="w-12 h-12" />,
      emoji: '🎉',
      tip: { es: 'Tour de 1 minuto', en: '1-minute tour', pt: 'Tour de 1 minuto' }
    },
    {
      id: 'tab-dashboard-premium',
      title: { es: '📊 Dashboard - Tu progreso', en: '📊 Dashboard - Your Progress', pt: '📊 Dashboard - Seu Progresso' },
      description: { 
        es: 'Acá ves tu XP, DataCoins, racha de días, y estadísticas. También tus certificados cuando completes niveles. Revisalo cada día.', 
        en: 'Here you see your XP, DataCoins, daily streak, and stats. Also your certificates when you complete levels. Check it daily.', 
        pt: 'Aqui você vê seu XP, DataCoins, sequência de dias e estatísticas. Também seus certificados quando completar níveis. Verifique diariamente.' 
      },
      icon: <Target className="w-12 h-12" />,
      emoji: '📊',
      tip: { es: 'La racha de días suma XP extra', en: 'Daily streak adds extra XP', pt: 'A sequência de dias soma XP extra' }
    },
    {
      id: 'tab-roadmap-premium',
      title: { es: '🗺️ Roadmap - 4 Niveles completos', en: '🗺️ Roadmap - 4 Complete Levels', pt: '🗺️ Roadmap - 4 Níveis Completos' },
      description: { 
        es: 'Nivel 0 → 1 (Junior) → 2 (SSR) → 3 (Senior). Cada nivel tiene fases y pasos. Marcá los completados, tu progreso se guarda automáticamente.', 
        en: 'Level 0 → 1 (Junior) → 2 (SSR) → 3 (Senior). Each level has phases and steps. Mark completed ones, your progress saves automatically.', 
        pt: 'Nível 0 → 1 (Júnior) → 2 (Pleno) → 3 (Sênior). Cada nível tem fases e passos. Marque os concluídos, seu progresso é salvo automaticamente.' 
      },
      icon: <Map className="w-12 h-12" />,
      emoji: '🗺️',
      tip: { es: 'Empezá por el Nivel 1 si ya sabés lo básico', en: 'Start at Level 1 if you know the basics', pt: 'Comece no Nível 1 se já sabe o básico' }
    },
    {
      id: 'tab-practica-premium',
      title: { es: '💻 Práctica - ILIMITADA', en: '💻 Practice - UNLIMITED', pt: '💻 Prática - ILIMITADA' },
      description: { 
        es: '90+ ejercicios de SQL, Python y Spark. Código real que corre en el browser. Ideales para preparar entrevistas técnicas.', 
        en: '90+ SQL, Python, and Spark exercises. Real code that runs in the browser. Ideal for preparing technical interviews.', 
        pt: '90+ exercícios de SQL, Python e Spark. Código real que roda no navegador. Ideais para preparar entrevistas técnicas.' 
      },
      icon: <Code className="w-12 h-12" />,
      emoji: '💻',
      tip: { es: 'Los de Spark son conceptuales', en: 'Spark ones are conceptual', pt: 'Os de Spark são conceituais' }
    },
    {
      id: 'tab-proyectos-premium',
      title: { es: '📁 Proyectos - 40+ para portfolio', en: '📁 Projects - 40+ for portfolio', pt: '📁 Projetos - 40+ para portfólio' },
      description: { 
        es: 'ETL, Data Lakes, dbt, Airflow, Snowflake, Databricks. Cada proyecto tiene "Interview Story" para contar en entrevistas.', 
        en: 'ETL, Data Lakes, dbt, Airflow, Snowflake, Databricks. Each project has an "Interview Story" to tell in interviews.', 
        pt: 'ETL, Data Lakes, dbt, Airflow, Snowflake, Databricks. Cada projeto tem "Interview Story" para contar em entrevistas.' 
      },
      icon: <Database className="w-12 h-12" />,
      emoji: '📁',
      tip: { es: 'Subí 3-5 a tu GitHub como portfolio', en: 'Upload 3-5 to your GitHub as portfolio', pt: 'Suba 3-5 para seu GitHub como portfólio' }
    },
    {
      id: 'tab-videos-premium',
      title: { es: '🎬 Videos - 8 semanas de bootcamp', en: '🎬 Videos - 8 bootcamp weeks', pt: '🎬 Vídeos - 8 semanas de bootcamp' },
      description: { 
        es: 'Todo el bootcamp grabado: Python, SQL, ETL, Cloud, entrevistas. Mirá a tu ritmo, pausá, repetí. Ideal para reforzar conceptos.', 
        en: 'Entire bootcamp recorded: Python, SQL, ETL, Cloud, interviews. Watch at your pace, pause, repeat. Ideal for reinforcing concepts.', 
        pt: 'Todo o bootcamp gravado: Python, SQL, ETL, Cloud, entrevistas. Assista no seu ritmo, pause, repita. Ideal para reforçar conceitos.' 
      },
      icon: <Video className="w-12 h-12" />,
      emoji: '🎬',
      tip: { es: 'Complementá con la práctica', en: 'Complement with practice', pt: 'Complemente com a prática' }
    },
    {
      id: 'start-premium',
      title: { es: '¿Por dónde empezar?', en: 'Where to start?', pt: 'Por onde começar?' },
      description: { 
        es: 'Mi recomendación:\n• Si sos nuevo: Roadmap → Nivel 1\n• Si ya sabés algo: Práctica → SQL\n• Para portfolio: Proyectos\n\n¿Dudas? Discord te espera 💬', 
        en: 'My recommendation:\n• If you\'re new: Roadmap → Level 1\n• If you know basics: Practice → SQL\n• For portfolio: Projects\n\nQuestions? Discord awaits 💬', 
        pt: 'Minha recomendação:\n• Se é novo: Roadmap → Nível 1\n• Se já sabe algo: Prática → SQL\n• Para portfólio: Projetos\n\nDúvidas? Discord te espera 💬' 
      },
      icon: <Gift className="w-12 h-12" />,
      emoji: '🚀',
      tip: { es: 'Tu progreso se guarda automáticamente', en: 'Your progress is saved automatically', pt: 'Seu progresso é salvo automaticamente' }
    }
  ], []);


  const activeSteps = isSubscribed ? premiumUserSteps : freeUserSteps;

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (!completed || forceShow) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, [forceShow]);

  const handleComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleNext = () => {
    if (currentStep < activeSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };
  
  const handleGoToPractice = () => {
    handleComplete();
    if (onGoToPractice) {
      onGoToPractice();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isVisible) return null;

  const step = activeSteps[currentStep];
  const progress = ((currentStep + 1) / activeSteps.length) * 100;
  const isLastStep = currentStep === activeSteps.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={handleSkip}
        />
        
        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
        >
          {/* Progress bar */}
          <div className="h-1 bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
            />
          </div>
          
          {/* Close button */}
          <button
            onClick={handleSkip}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"
            title={t('onboarding.skip')}
          >
            <X className="w-5 h-5" />
          </button>
          
          {/* Content */}
          <div className="p-8">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {activeSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep 
                      ? 'w-6 bg-emerald-500' 
                      : index < currentStep 
                        ? 'bg-emerald-500/50' 
                        : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
            
            {/* Icon */}
            <motion.div
              key={step.id}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400"
            >
              {step.icon}
            </motion.div>
            
            {/* Text */}
            <motion.div
              key={`text-${step.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {step.emoji} {tl(step.title)}
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4 whitespace-pre-line">
                {tl(step.description)}
              </p>
              {step.tip && (
                <p className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2 inline-block">
                  💡 {tl(step.tip)}
                </p>
              )}
            </motion.div>
          </div>
          
          {/* Navigation */}
          <div className="px-8 pb-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === 0
                  ? 'text-slate-500 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              {t('onboarding.prev')}
            </button>
            
            <span className="text-slate-500 text-sm">
              {currentStep + 1} / {activeSteps.length}
            </span>
            
            {isLastStep && !isSubscribed && onGoToPractice ? (
              <button
                onClick={handleGoToPractice}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg shadow-blue-500/25 animate-pulse"
              >
                🚀 {t('practice.sql')}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:from-emerald-600 hover:to-cyan-600 transition-all shadow-lg shadow-emerald-500/25"
              >
                {isLastStep ? t('onboarding.start') : t('onboarding.next')}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingTutorial;

// Helper to check if onboarding is completed
export const isOnboardingCompleted = (): boolean => {
  return localStorage.getItem(ONBOARDING_KEY) === 'true';
};

// Helper to reset onboarding (for testing)
export const resetOnboarding = (): void => {
  localStorage.removeItem(ONBOARDING_KEY);
};
