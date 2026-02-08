import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Rocket, Star, CheckCircle, Clock, ArrowRight, Play, 
  BookOpen, Code, FlaskConical, Target, Lock, Award
} from 'lucide-react';
import { useLanguage } from '../../../i18n/LanguageContext';
import { LocalizedContent as LC, t as tLocalized } from '../../../types/i18n';
import { DatabricksSpecializationView } from '../DatabricksSpecializationView';
import { AWSSpecializationView } from '../AWSSpecializationView';
import { LockedContentPreview } from '../MembersUtils';
// Deep Dives - Disponible ahora
import { DeepDiveViewer } from '../DeepDiveViewer';
import { DeepDivesTab } from './DeepDivesTab';
import { getDeepDiveById } from '../../../data/deepDives';

interface SpecializationsTabProps {
  isFreeUser: boolean;
  userEmail?: string;
}

// Countdown Timer for AWS
const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-3">
      {[
        { value: timeLeft.days, label: 'd' },
        { value: timeLeft.hours, label: 'h' },
        { value: timeLeft.minutes, label: 'm' },
        { value: timeLeft.seconds, label: 's' }
      ].map((item, i) => (
        <div key={i} className="text-center">
          <div className="bg-slate-800 rounded-lg px-3 py-2 min-w-[50px]">
            <span className="text-xl font-bold text-white">{item.value.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-xs text-slate-500 mt-1">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export const SpecializationsTab: React.FC<SpecializationsTabProps> = ({ isFreeUser, userEmail }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language } = useLanguage();
  
  // Check if there's an active specialization saved
  const getActiveSpecialization = () => {
    return localStorage.getItem('active_specialization');
  };
  
  // Check if user has started Databricks (has progress)
  const hasDatabricksProgress = () => {
    const progress = localStorage.getItem('databricks_progress');
    return !!progress;
  };

  const [showDatabricks, setShowDatabricks] = useState(() => getActiveSpecialization() === 'databricks');
  const [showAWS, setShowAWS] = useState(() => getActiveSpecialization() === 'aws');
  
  // Deep Dives list view - muestra todos los deep dives
  const [showDeepDives, setShowDeepDives] = useState(false);
  
  // Deep Dive viewer state - se activa cuando viene de un hint del roadmap
  const [selectedDeepDiveId, setSelectedDeepDiveId] = useState<string | null>(null);
  
  // Check URL params for deep dive selection (from roadmap hints)
  useEffect(() => {
    const deepDiveId = searchParams.get('deepDive');
    if (deepDiveId) {
      const deepDive = getDeepDiveById(deepDiveId);
      if (deepDive) {
        setSelectedDeepDiveId(deepDiveId);
      }
    }
  }, [searchParams]);
  
  const t = (content: LC | string): string => {
    if (typeof content === 'string') return content;
    return tLocalized(content, language);
  };
  
  const databricksStarted = hasDatabricksProgress();

  // Free users see locked preview
  if (isFreeUser) {
    return (
      <LockedContentPreview
        title={t({ es: 'Especializaciones Premium', en: 'Premium Specializations', pt: 'Especializações Premium' })}
        description={t({ es: 'Accede a rutas de aprendizaje avanzadas con 100+ pasos, Labs hands-on y preparación para certificaciones oficiales.', en: 'Access advanced learning paths with 100+ steps, hands-on Labs and official certification prep.', pt: 'Acesse trilhas de aprendizado avançadas com 100+ passos, Labs hands-on e preparação para certificações oficiais.' })}
        features={[
          t({ es: 'Especialización en Databricks (12 fases)', en: 'Databricks Specialization (12 phases)', pt: 'Especialização em Databricks (12 fases)' }),
          t({ es: 'Labs hands-on con datos reales', en: 'Hands-on Labs with real data', pt: 'Labs hands-on com dados reais' }),
          t({ es: 'Ejercicios de Spark y Delta Lake', en: 'Spark and Delta Lake exercises', pt: 'Exercícios de Spark e Delta Lake' }),
          t({ es: 'Preparación para certificación DE Associate', en: 'DE Associate certification prep', pt: 'Preparação para certificação DE Associate' }),
        ]}
        userEmail={userEmail}
      />
    );
  }

  // Show Databricks specialization view (this is the default when they have started)
  if (showDatabricks) {
    return <DatabricksSpecializationView onBack={() => setShowDatabricks(false)} />;
  }
  
  // Show AWS specialization view
  if (showAWS) {
    return <AWSSpecializationView onBack={() => setShowAWS(false)} />;
  }
  
  // 🎓 Deep Dives List - Muestra todos los deep dives disponibles
  if (showDeepDives) {
    return (
      <DeepDivesTab 
        onViewContent={(deepDiveId) => {
          setSelectedDeepDiveId(deepDiveId);
          setShowDeepDives(false);
        }}
        completedDives={[]} // TODO: cargar desde progreso del usuario
        onBack={() => setShowDeepDives(false)}
      />
    );
  }
  
  // 🎓 Deep Dive Viewer - Cuando viene de un hint del roadmap o selección
  if (selectedDeepDiveId) {
    const deepDive = getDeepDiveById(selectedDeepDiveId);
    if (deepDive) {
      return (
        <DeepDiveViewer 
          deepDiveId={selectedDeepDiveId}
          onBack={() => {
            setSelectedDeepDiveId(null);
            // Limpiar el parámetro de la URL
            searchParams.delete('deepDive');
            setSearchParams(searchParams);
          }}
          onComplete={(id) => {
            // Marcar como completado (si se implementa sistema de progreso)
            console.log('Deep Dive completed:', id);
          }}
        />
      );
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-slate-900 to-orange-500/10 rounded-2xl p-8 border border-emerald-500/20 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-500/30 animate-pulse">
          <Rocket className="w-4 h-4" />
          {t({ es: '🚀 ¡Databricks ya está disponible!', en: '🚀 Databricks is now available!', pt: '🚀 Databricks já está disponível!' })}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t({ es: 'Especializaciones Avanzadas', en: 'Advanced Specializations', pt: 'Especializações Avançadas' })}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-6">
          {t({ es: 'Rutas de aprendizaje premium con Labs hands-on, 100+ pasos, proyectos reales y preparación para certificaciones oficiales.', en: 'Premium learning paths with hands-on Labs, 100+ steps, real projects and official certification prep.', pt: 'Trilhas de aprendizado premium com Labs hands-on, 100+ passos, projetos reais e preparação para certificações oficiais.' })}
        </p>
        <div className="flex items-center justify-center gap-2 text-emerald-400">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">{t({ es: 'Incluido en tu suscripción Premium', en: 'Included in your Premium subscription', pt: 'Incluído na sua assinatura Premium' })}</span>
        </div>
      </div>

      {/* Specializations Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* 🎓 FUNDAMENTOS TEÓRICOS - DISPONIBLE AHORA */}
        <div className="bg-gradient-to-br from-violet-500/20 to-slate-900 rounded-2xl p-6 border-2 border-violet-500/50 shadow-lg shadow-violet-500/10 relative overflow-hidden group hover:border-violet-400 transition-all">
          {/* Badge NUEVO */}
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Play className="w-3 h-3" />
              {t({ es: 'DISPONIBLE', en: 'AVAILABLE', pt: 'DISPONÍVEL' })}
            </span>
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">🎓</div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                {t({ es: 'Fundamentos Teóricos', en: 'Theoretical Foundations', pt: 'Fundamentos Teóricos' })}
              </h3>
              <p className="text-violet-400 text-sm font-medium">
                {t({ es: 'Para quienes quieren entender el "por qué"', en: 'For those who want to understand the "why"', pt: 'Para quem quer entender o "porquê"' })}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-6">
            {t({ es: '20+ Deep Dives con Mapas Mentales Mermaid, Cheat Sheets técnicos, Papers clásicos (Kleppmann, Kimball, Google, Amazon) y Gotchas de nivel senior. OPCIONAL pero poderoso.', en: '20+ Deep Dives with Mermaid Mind Maps, Technical Cheat Sheets, Classic Papers (Kleppmann, Kimball, Google, Amazon) and Senior-level Gotchas. OPTIONAL but powerful.', pt: '20+ Deep Dives com Mapas Mentais Mermaid, Cheat Sheets técnicos, Papers clássicos (Kleppmann, Kimball, Google, Amazon) e Gotchas de nível sênior. OPCIONAL mas poderoso.' })}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-violet-400">20+</div>
              <div className="text-xs text-slate-400">Deep Dives</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">40+</div>
              <div className="text-xs text-slate-400">{t({ es: 'Horas', en: 'Hours', pt: 'Horas' })}</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-yellow-400">1500+</div>
              <div className="text-xs text-slate-400">XP Bonus</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">∞</div>
              <div className="text-xs text-slate-400">{t({ es: 'Niveles', en: 'Levels', pt: 'Níveis' })}</div>
            </div>
          </div>

          {/* Skills Preview */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Mind Maps', 'Cheat Sheets', 'Kleppmann', 'Kimball', 'Google Papers', 'First Principles'].map(skill => (
              <span key={skill} className="bg-violet-500/20 text-violet-300 text-xs px-2 py-1 rounded-full border border-violet-500/30">
                {skill}
              </span>
            ))}
          </div>

          {/* Optional Badge */}
          <div className="flex items-center gap-2 mb-4 bg-emerald-500/10 text-emerald-400 px-3 py-2 rounded-lg border border-emerald-500/20">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t({ es: 'OPCIONAL - Complementa cualquier nivel', en: 'OPTIONAL - Complements any level', pt: 'OPCIONAL - Complementa qualquer nível' })}
            </span>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => {
              // Mostrar la lista completa de Deep Dives
              setShowDeepDives(true);
            }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold text-lg hover:from-violet-400 hover:to-purple-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30 group-hover:scale-[1.02]"
          >
            <BookOpen className="w-5 h-5" />
            {t({ es: 'Explorar Deep Dives', en: 'Explore Deep Dives', pt: 'Explorar Deep Dives' })}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        {/* 🔶 DATABRICKS - DISPONIBLE AHORA */}
        <div className="bg-gradient-to-br from-orange-500/20 to-slate-900 rounded-2xl p-6 border-2 border-orange-500/50 shadow-lg shadow-orange-500/10 relative overflow-hidden group hover:border-orange-400 transition-all">
          {/* Badge NUEVO */}
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Play className="w-3 h-3" />
              {t({ es: 'DISPONIBLE', en: 'AVAILABLE', pt: 'DISPONÍVEL' })}
            </span>
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">🔶</div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                {t({ es: 'Databricks Data Engineer', en: 'Databricks Data Engineer', pt: 'Databricks Data Engineer' })}
              </h3>
              <p className="text-orange-400 text-sm font-medium">
                {t({ es: 'La plataforma #1 de Lakehouse', en: 'The #1 Lakehouse platform', pt: 'A plataforma #1 de Lakehouse' })}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-6">
            {t({ es: 'Domina Databricks desde cero hasta la certificación DE Associate. 12 fases completas con teoría, práctica y proyectos reales.', en: 'Master Databricks from zero to DE Associate certification. 12 complete phases with theory, practice and real projects.', pt: 'Domine Databricks do zero à certificação DE Associate. 12 fases completas com teoria, prática e projetos reais.' })}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-orange-400">12</div>
              <div className="text-xs text-slate-400">{t({ es: 'Fases', en: 'Phases', pt: 'Fases' })}</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">100+</div>
              <div className="text-xs text-slate-400">{t({ es: 'Pasos', en: 'Steps', pt: 'Passos' })}</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-purple-400">20</div>
              <div className="text-xs text-slate-400">{t({ es: 'Ejercicios', en: 'Exercises', pt: 'Exercícios' })}</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">5</div>
              <div className="text-xs text-slate-400">{t({ es: 'Proyectos', en: 'Projects', pt: 'Projetos' })}</div>
            </div>
          </div>

          {/* Skills Preview */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Spark', 'Delta Lake', 'Unity Catalog', 'DLT', 'MLflow', 'Workflows'].map(skill => (
              <span key={skill} className="bg-orange-500/20 text-orange-300 text-xs px-2 py-1 rounded-full border border-orange-500/30">
                {skill}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setShowDatabricks(true)}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-lg hover:from-orange-400 hover:to-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 group-hover:scale-[1.02]"
          >
            <Play className="w-5 h-5" />
            {databricksStarted 
              ? t({ es: 'Continuar Especialización', en: 'Continue Specialization', pt: 'Continuar Especialização' })
              : t({ es: 'Comenzar Especialización', en: 'Start Specialization', pt: 'Começar Especialização' })
            }
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          {databricksStarted && (
            <p className="text-xs text-slate-400 text-center mt-2">
              {t({ es: 'Ya comenzaste esta especialización', en: 'You already started this specialization', pt: 'Você já começou esta especialização' })}
            </p>
          )}
        </div>

        {/* ☁️ AWS - 2 NIVELES */}
        <div className="bg-gradient-to-br from-amber-500/10 to-slate-900 rounded-2xl p-6 border border-amber-500/30 relative overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-500/30">
              <Star className="w-3 h-3" />
              {t({ es: '2 NIVELES', en: '2 LEVELS', pt: '2 NÍVEIS' })}
            </span>
          </div>

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <div className="text-6xl">☁️</div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                {t({ es: 'AWS Data Engineering', en: 'AWS Data Engineering', pt: 'AWS Data Engineering' })}
              </h3>
              <p className="text-amber-400 text-sm font-medium">
                {t({ es: 'Serverless + Advanced - El cloud #1', en: 'Serverless + Advanced - The #1 cloud', pt: 'Serverless + Advanced - A nuvem #1' })}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-4">
            {t({ es: 'Lambda, Fargate, Step Functions, Secrets Manager, S3 Medallion, Athena, Redshift, EMR, Kinesis. 10 proyectos enterprise, 18 preguntas de entrevista expert.', en: 'Lambda, Fargate, Step Functions, Secrets Manager, S3 Medallion, Athena, Redshift, EMR, Kinesis. 10 enterprise projects, 18 expert interview questions.', pt: 'Lambda, Fargate, Step Functions, Secrets Manager, S3 Medallion, Athena, Redshift, EMR, Kinesis. 10 projetos enterprise, 18 perguntas de entrevista expert.' })}
          </p>

          {/* Level indicators */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-emerald-500/10 rounded-lg p-2 border border-emerald-500/20">
              <div className="text-xs font-bold text-emerald-400">{t({ es: 'Nivel 1: Serverless', en: 'Level 1: Serverless', pt: 'Nível 1: Serverless' })}</div>
              <div className="text-xs text-slate-400">{t({ es: 'Lambda, Fargate, Free Tier', en: 'Lambda, Fargate, Free Tier', pt: 'Lambda, Fargate, Free Tier' })}</div>
            </div>
            <div className="bg-purple-500/10 rounded-lg p-2 border border-purple-500/20">
              <div className="text-xs font-bold text-purple-400">{t({ es: 'Nivel 2: Advanced', en: 'Level 2: Advanced', pt: 'Nível 2: Advanced' })}</div>
              <div className="text-xs text-slate-400">{t({ es: 'EMR, Kinesis, Certificación', en: 'EMR, Kinesis, Certification', pt: 'EMR, Kinesis, Certificação' })}</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-amber-400">15</div>
              <div className="text-xs text-slate-400">{t({ es: 'Fases', en: 'Phases', pt: 'Fases' })}</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-blue-400">134</div>
              <div className="text-xs text-slate-400">{t({ es: 'Pasos', en: 'Steps', pt: 'Passos' })}</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-purple-400">44</div>
              <div className="text-xs text-slate-400">{t({ es: 'Ejercicios', en: 'Exercises', pt: 'Exercícios' })}</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-3 text-center">
              <div className="text-xl font-bold text-emerald-400">10</div>
              <div className="text-xs text-slate-400">{t({ es: 'Proyectos', en: 'Projects', pt: 'Projetos' })}</div>
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-slate-900/80 rounded-xl p-4 mb-6 border border-amber-500/20">
            <p className="text-amber-400 text-sm font-semibold mb-3 text-center">
              🚀 {t({ es: 'Lanzamiento: Marzo 2026', en: 'Launch: March 2026', pt: 'Lançamento: Março 2026' })}
            </p>
            <CountdownTimer targetDate="2026-03-01T00:00:00" />
          </div>

          {/* Preview Button */}
          <button
            onClick={() => setShowAWS(true)}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            {t({ es: 'Ver Contenido', en: 'View Content', pt: 'Ver Conteúdo' })}
          </button>
        </div>
      </div>

      {/* What's Included */}
      <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400" />
          {t({ es: '¿Qué incluye cada especialización?', en: 'What does each specialization include?', pt: 'O que inclui cada especialização?' })}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 text-center">
            <BookOpen className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-emerald-400 mb-1">100+</div>
            <div className="text-slate-400 text-sm">{t({ es: 'Pasos con teoría detallada', en: 'Steps with detailed theory', pt: 'Passos com teoria detalhada' })}</div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 text-center">
            <FlaskConical className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400 mb-1">10+</div>
            <div className="text-slate-400 text-sm">{t({ es: 'Labs hands-on', en: 'Hands-on Labs', pt: 'Labs hands-on' })}</div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 text-center">
            <Code className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400 mb-1">20+</div>
            <div className="text-slate-400 text-sm">{t({ es: 'Ejercicios de código', en: 'Code exercises', pt: 'Exercícios de código' })}</div>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 text-center">
            <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400 mb-1">1</div>
            <div className="text-slate-400 text-sm">{t({ es: 'Certificación oficial prep', en: 'Official cert prep', pt: 'Prep certificação oficial' })}</div>
          </div>
        </div>
      </div>

      {/* Coming Soon Preview */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Rocket className="w-5 h-5 text-purple-400" />
          {t({ es: 'Más especializaciones en camino...', en: 'More specializations coming...', pt: 'Mais especializações a caminho...' })}
        </h3>
        <div className="flex flex-wrap gap-3">
          {['Azure Data Engineering', 'GCP Data Engineering', 'dbt', 'Airflow', 'Snowflake'].map(spec => (
            <span key={spec} className="bg-slate-800 text-slate-400 text-sm px-4 py-2 rounded-lg border border-slate-700">
              {spec}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecializationsTab;

