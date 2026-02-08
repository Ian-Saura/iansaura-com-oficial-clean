import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { useLanguage } from '../i18n/LanguageContext';
import { specializations } from '../data/roadmapData';
import { SpecializationCountdown } from '../components/SpecializationCountdown';
import { 
  CheckCircle, 
  Play, 
  Calendar, 
  BookOpen,
  MessageCircle,
  ArrowRight,
  Zap,
  Database,
  Code,
  Map,
  ChevronRight,
  Linkedin,
  ExternalLink,
  Bot
} from 'lucide-react';

interface SuscripcionProps {
  user?: any;
}

export default function Suscripcion({ user }: SuscripcionProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  // Auto-redirect si ya está suscrito
  useEffect(() => {
    if (user?.subscribed) {
      navigate('/members');
    }
  }, [user, navigate]);

  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubscribe = () => {
    if (!user) {
      navigate('/auth?redirect=/suscripcion&action=subscribe');
    } else {
      window.location.href = 'https://iansaura.com/subscribe.php';
    }
  };

  // Si está suscrito, mostrar mensaje mientras redirige
  if (user?.subscribed) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">{t('subscriptionPage.redirecting')}</p>
        </div>
      </div>
    );
  }

  const platformFeatures = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: `🆕 ${t('subscriptionPage.features.exercises')}`,
      description: t('subscriptionPage.features.exercisesDesc'),
      color: "yellow",
      isNew: true
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: `🆕 ${t('subscriptionPage.features.dbtAirflow')}`,
      description: t('subscriptionPage.features.dbtAirflowDesc'),
      color: "orange",
      isNew: true
    },
    {
      icon: <Map className="w-8 h-8" />,
      title: t('subscriptionPage.features.roadmap'),
      description: t('subscriptionPage.features.roadmapDesc'),
      color: "emerald"
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: t('subscriptionPage.features.videos'),
      description: t('subscriptionPage.features.videosDesc'),
      color: "red"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t('subscriptionPage.features.datasets'),
      description: t('subscriptionPage.features.datasetsDesc'),
      color: "blue"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: t('subscriptionPage.features.projects'),
      description: t('subscriptionPage.features.projectsDesc'),
      color: "purple"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: t('subscriptionPage.features.discord'),
      description: t('subscriptionPage.features.discordDesc'),
      color: "indigo"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: t('subscriptionPage.features.qa'),
      description: t('subscriptionPage.features.qaDesc'),
      color: "cyan"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: `🆕 ${t('subscriptionPage.features.saurio')}`,
      description: t('subscriptionPage.features.saurioDesc'),
      color: "emerald",
      isNew: true
    }
  ];

  const roadmapPreview = [
    { level: 1, title: t('subscriptionPage.roadmapLevels.level1'), items: ["Python & SQL", "DataLemur + LeetCode", "AWS, Snowflake, dbt", t('common.jobSearch') || "Job search", t('common.interviews') || "Interviews"] },
    { level: 2, title: t('subscriptionPage.roadmapLevels.level2'), items: [t('common.companyPerformance') || "Company performance", t('common.salaryNegotiation') || "Salary negotiation", t('common.architectures') || "Architectures", t('common.effectiveCommunication') || "Effective communication"] },
    { level: 3, title: t('subscriptionPage.roadmapLevels.level3'), items: [t('common.technicalLeadership') || "Technical leadership", t('common.codeQuality') || "Code quality", t('common.architecturalDecisions') || "Architectural decisions", t('common.juniorMentoring') || "Junior mentoring"] }
  ];

  // SYLLABUS DETALLADO
  const detailedSyllabus = [
    {
      category: "🐍 Python para Data Engineering (21 ejercicios)",
      topics: [
        "Pandas: DataFrames, filtros, groupby, merge, pivot",
        "ETL: limpieza de nulos, duplicados, fechas, pipelines",
        "Airflow: DAGs, operators, dependencias, XCom, sensors, branching",
        "Funciones, loops y list comprehensions",
        "APIs: requests y manejo de respuestas",
        "Buenas prácticas de código"
      ]
    },
    {
      category: "🔍 SQL Avanzado (51 ejercicios)",
      topics: [
        "Fundamentals: SELECT, WHERE, ORDER BY, LIMIT, DISTINCT",
        "Aggregations: COUNT, SUM, AVG, GROUP BY, HAVING",
        "JOINs: INNER, LEFT, RIGHT, FULL, Self-Join",
        "Window Functions: ROW_NUMBER, RANK, LAG, LEAD, NTILE",
        "CTEs y Subqueries: WITH, EXISTS, correlacionadas",
        "Optimization: SARGable, EXISTS vs IN, paginación",
        "Interview Questions: LeetCode, FAANG patterns"
      ]
    },
    {
      category: "🔧 dbt (6 ejercicios prácticos)",
      topics: [
        "ref() y source() - Referencias entre modelos",
        "Modelos incrementales - Procesar solo datos nuevos",
        "Tests de calidad - unique, not_null, accepted_values",
        "Macros y Jinja - Código reutilizable",
        "Snapshots - SCD Type 2 para históricos"
      ]
    },
    {
      category: "🚀 Apache Airflow (6 ejercicios prácticos)",
      topics: [
        "DAGs - Estructura y configuración",
        "Operators - Python, Bash, SQL, S3",
        "Dependencias - Orden de ejecución",
        "XCom - Pasar datos entre tasks",
        "Sensors - Esperar condiciones",
        "Branching - Ejecución condicional"
      ]
    },
    {
      category: "☁️ Cloud & Herramientas",
      topics: [
        "AWS: S3, Redshift, Glue, Lambda",
        "Snowflake: Data Warehouse moderno",
        "Docker: Contenedores para Data",
        "Git: Control de versiones"
      ]
    },
    {
      category: "🔧 ETL/ELT & Pipelines",
      topics: [
        "Diseño de pipelines de datos",
        "ETL vs ELT: cuándo usar cada uno",
        "Ingesta de datos batch y streaming",
        "Data Quality y validación",
        "Manejo de datos incrementales",
        "Orquestación y scheduling"
      ]
    },
    {
      category: "💼 Carrera & Entrevistas",
      topics: [
        "Armado de CV para Data Engineering",
        "LinkedIn optimizado para recruiters",
        "Preparación de entrevistas técnicas",
        "Coding challenges en vivo",
        "System Design para Data",
        "Negociación salarial"
      ]
    },
    {
      category: "🚀 Nivel Senior",
      topics: [
        "Arquitecturas de datos a escala",
        "Liderazgo técnico y mentoría",
        "Code reviews efectivos",
        "Documentación y comunicación",
        "Estimación y planning",
        "Decisiones de tecnología"
      ]
    }
  ];

  const projectsList = [
    { name: "ETL Simple con Python", difficulty: "Principiante", skills: ["Python", "Pandas", "CSV"] },
    { name: "Data Pipeline con Airflow", difficulty: "Intermedio", skills: ["Airflow", "Python", "Docker"] },
    { name: "Data Warehouse en Snowflake", difficulty: "Intermedio", skills: ["Snowflake", "SQL", "dbt"] },
    { name: "API de Datos en Tiempo Real", difficulty: "Avanzado", skills: ["FastAPI", "Python", "Streaming"] },
    { name: "Dashboard de Métricas", difficulty: "Intermedio", skills: ["SQL", "Metabase", "Modelado"] },
    { name: "Sistema de Alertas", difficulty: "Avanzado", skills: ["Python", "AWS Lambda", "SNS"] },
  ];

  // Real testimonials from LinkedIn and chat
  const testimonials = [
    {
      name: "Sebastian Currin V.",
      role: "Ingeniero Mecánico → Data",
      text: "He hecho varios cursos de datos, incluidos bootcamps. La academia de Ian Saura es por lejos la que más me ha gustado, tiene un roadmap claro, con ejercicios entretenidos y útiles, datasets lo suficientemente complejos para desafiarte y también links a recursos útiles. La recomiendo totalmente.",
      avatar: "S",
      linkedIn: "https://www.linkedin.com/posts/sebastiancurrin_he-hecho-varios-cursos-de-datos-incluidos-activity-7401272428112318467-hOxs"
    },
    {
      name: "Tomas De Franco",
      role: "Formándose como Data Scientist",
      text: "La Data Engineering Academy superó mis expectativas. SQL desde cero con ejercicios aplicados, Python con ejemplos potentes. Cada módulo pensado para quienes nunca programaron. Combina teoría, práctica y simulaciones de entrevistas técnicas.",
      avatar: "T",
      linkedIn: "https://www.linkedin.com/posts/tomasdefranco_dataanalyst-datascientist-sql-activity-7403566419298148353-ZyHX"
    },
    {
      name: "Felipe Fonseca",
      role: "Profesional de Datos",
      text: "Sin duda Ian Saura es un crack enseñando datos. Su curso me sacó de muchas dudas: explicación clara de conceptos básicos, ejercicios prácticos, ejecución de modelos en la plataforma y recursos adicionales con ejemplos reales.",
      avatar: "F",
      linkedIn: "https://www.linkedin.com/posts/felipe-fonseca-5b804491_sin-duda-ian-saura-es-un-crack-ensenando-activity-7402105701701156865-dhGG"
    },
    {
      name: "Matías S.",
      role: "Data Professional",
      text: "Muy buena la academia. Super conciso y directo al tema, lleno de práctica. Al ser tan interactivo lo hacía gratificante de aprender. Sin duda muy recomendable para fortalecer habilidades en el rol.",
      avatar: "M"
    }
  ];

  const colorClasses: Record<string, string> = {
    emerald: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-400",
    red: "from-red-500/20 to-red-500/5 border-red-500/30 text-red-400",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-400",
    purple: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-400",
    indigo: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400",
    yellow: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
    cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/30 text-cyan-400",
    orange: "from-orange-500/20 to-orange-500/5 border-orange-500/30 text-orange-400"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navigation user={user} />

      {/* Hero Section - Optimizado para conversión */}
      <section className="pt-24 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* 🚨 URGENCY BANNER - Arriba de todo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto mb-6"
          >
            <div className="bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 rounded-xl p-3 border border-red-500/50">
              <div className="flex items-center justify-center gap-3 text-center">
                <span className="text-2xl">⚠️</span>
                <p className="text-white font-bold text-sm md:text-base">
                  {t('subscription.launchPrice')}
                </p>
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
          </motion.div>

          {/* Título + CTA Principal - Above the fold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3 leading-tight">
              {t('subscription.heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t('subscription.heroTitleHighlight')}</span>
            </h1>
            <p className="text-lg text-slate-300 mb-4 max-w-2xl mx-auto">
              {t('subscription.heroDescription')}
            </p>
          </motion.div>

          {/* 🎁 CTA PRINCIPAL - Grande y visible */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-full blur-3xl" />
              
              <div className="relative text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-4xl">🚀</span>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {t('subscriptionPage.hero.joinNow')}
                    </h3>
                    <p className="text-slate-300 text-sm">{t('subscriptionPage.hero.joinNowDesc')}</p>
                  </div>
                </div>

                <a
                  href="https://iansaura.gumroad.com/l/dgyzxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30 animate-pulse"
                >
                  🚀 {t('subscriptionPage.hero.subscribe')}
                  <ArrowRight className="w-6 h-6" />
                </a>
                
                <p className="text-slate-500 text-xs mt-3">
                  {t('subscriptionPage.hero.cancelAnytime')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats - Más compacto */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 md:gap-8 mb-6"
          >
            {[
              { value: "150+", label: t('subscriptionPage.hero.students') },
              { value: "90+", label: t('subscriptionPage.hero.exercises') },
              { value: "40+", label: t('subscriptionPage.hero.projects') },
              { value: "8", label: t('subscriptionPage.hero.weeksVideo') },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-2xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-slate-500 text-xs">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Divider */}
          <div className="flex items-center gap-4 max-w-3xl mx-auto mb-8">
            <div className="flex-1 h-px bg-slate-700" />
            <span className="text-slate-500 text-sm">{t('subscriptionPage.plans.choosePlan')}</span>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          {/* Price Cards - 3 Options */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Mensual */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 border border-slate-600 hover:border-emerald-500/50 transition-all">
                <div className="text-center mb-6">
                  <div className="text-slate-400 text-sm mb-2">{t('subscriptionPage.plans.monthly')}</div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-white">$30</span>
                    <span className="text-slate-400 text-lg">{t('subscriptionPage.plans.perMonth')}</span>
                  </div>
                  <p className="text-emerald-400 text-xs mt-2">{t('subscriptionPage.plans.launchPrice')}</p>
                  <p className="text-red-400 text-xs">{t('subscriptionPage.plans.afterDate')}</p>
                </div>

                <ul className="space-y-2 mb-6 text-sm">
                  {[t('subscriptionPage.plans.allContent'), t('subscriptionPage.plans.cancelAnytime'), t('subscriptionPage.plans.priceLockedForever')].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://iansaura.gumroad.com/l/dgyzxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-6 rounded-xl text-center transition-all"
                >
                  {t('subscriptionPage.plans.chooseMonthly')}
                </a>
              </div>

              {/* 6 Meses - DESTACADO */}
              <div className="bg-gradient-to-br from-emerald-900/50 to-cyan-900/50 rounded-3xl p-6 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-sm px-4 py-1 rounded-full font-bold">
                  {t('subscriptionPage.plans.mostPopular')}
                </div>
                
                <div className="text-center mb-6 mt-2">
                  <div className="text-emerald-400 text-sm mb-2 font-medium">{t('subscriptionPage.plans.sixMonths')}</div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-white">$150</span>
                    <span className="text-slate-400 text-lg">USD</span>
                  </div>
                  <p className="text-slate-300 text-sm mt-1">= $25/{t('common.month')}</p>
                  <div className="inline-block bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full mt-2 font-medium">
                    {t('subscriptionPage.plans.save30')}
                  </div>
                </div>

                <ul className="space-y-2 mb-6 text-sm">
                  {[t('subscriptionPage.plans.allContent'), t('subscriptionPage.plans.sixMonthsAccess'), t('subscriptionPage.plans.bestPricePerMonth'), t('subscriptionPage.plans.noAutoRenewal')].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://iansaura.gumroad.com/l/dgyzxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-3 px-6 rounded-xl text-center transition-all transform hover:scale-105 shadow-lg"
                >
                  {t('subscriptionPage.plans.chooseSixMonths')}
                </a>
              </div>

              {/* 12 Meses - OneInfinite pago único */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-3xl p-6 border border-purple-500/50 hover:border-purple-400 transition-all">
                <div className="text-center mb-6">
                  <div className="text-purple-400 text-sm mb-2 font-medium">{t('subscriptionPage.plans.twelveMonths')}</div>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-5xl font-bold text-white">$240</span>
                    <span className="text-slate-400 text-lg">USD</span>
                  </div>
                  <p className="text-slate-300 text-sm mt-1">= $20/{t('common.month')}</p>
                  <div className="inline-block bg-yellow-500/20 text-yellow-400 text-xs px-3 py-1 rounded-full mt-2 font-medium">
                    {t('subscriptionPage.plans.save120')}
                  </div>
                </div>

                <ul className="space-y-2 mb-6 text-sm">
                  {[t('subscriptionPage.plans.allContent'), t('subscriptionPage.plans.oneYearComplete'), t('subscriptionPage.plans.bestSavings'), t('subscriptionPage.plans.noAutoRenewal')].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://iansaura.gumroad.com/l/dgyzxi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl text-center transition-all"
                >
                  {t('subscriptionPage.plans.chooseTwelveMonths')}
                </a>
              </div>
            </div>

            <p className="text-center text-slate-500 text-sm mt-6">
              {t('subscriptionPage.plans.securePayment')}
            </p>
            
            {/* Cómo acceder - Más claro */}
            <div className="mt-6 max-w-xl mx-auto">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                <p className="text-blue-300 text-sm text-center font-medium mb-2">
                  {t('subscriptionPage.plans.afterPayment')}
                </p>
                <p className="text-white text-center">
                  {t('subscriptionPage.plans.afterPaymentStep')}
                </p>
                <p className="text-slate-400 text-xs text-center mt-2">
                  {t('subscriptionPage.plans.afterPaymentNote')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('subscriptionPage.features.title')}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              {t('subscriptionPage.features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br ${colorClasses[feature.color]} rounded-2xl p-6 border`}
              >
                <div className={`w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-4 ${colorClasses[feature.color].split(' ').pop()}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📚 SYLLABUS DETALLADO - Nueva sección */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-blue-500/30">
              <BookOpen className="w-4 h-4" />
              {t('subscriptionPage.syllabus.title')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('subscriptionPage.syllabus.subtitle')}
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Contenido estructurado y progresivo para llevarte de cero a Data Engineer profesional
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {detailedSyllabus.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all"
              >
                <h3 className="text-xl font-bold text-white mb-4">{section.category}</h3>
                <ul className="space-y-2">
                  {section.topics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Proyectos incluidos */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl p-8 border border-emerald-500/30">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              🚀 Proyectos Prácticos Incluidos
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectsList.map((project, idx) => (
                <div key={idx} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-white text-sm">{project.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.difficulty === 'Principiante' ? 'bg-emerald-500/20 text-emerald-400' :
                      project.difficulty === 'Intermedio' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.skills.map((skill, i) => (
                      <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-400 text-sm mt-4">
              {t('subscriptionPage.moreProjects') || '+19 more projects available on the platform'}
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('subscriptionPage.roadmapLevels.title')}
            </h2>
            <p className="text-slate-400 text-lg">
              {t('subscriptionPage.roadmapLevels.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roadmapPreview.map((level, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700"
              >
                <div className={`text-4xl font-bold mb-2 ${
                  idx === 0 ? 'text-emerald-400' : idx === 1 ? 'text-blue-400' : 'text-purple-400'
                }`}>
                  Nivel {level.level}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{level.title}</h3>
                <ul className="space-y-2">
                  {level.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400">
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 Coming Soon - Specializaciones Section */}
      {(() => {
        const nextSpecs = specializations.filter(s => s.isNext && !s.isHidden);
        if (nextSpecs.length === 0) return null;
        
        return (
          <section className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-900/95 to-orange-900/10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-orange-500/30"
                >
                  <span className="animate-pulse">🔥</span>
                  {({ es: 'Nuevas Especializaciones', en: 'New Specializations', pt: 'Novas Especializações' } as any)[language]}
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {({ es: '🚀 Próximamente: Labs y Especializaciones', en: '🚀 Coming Soon: Labs & Specializations', pt: '🚀 Em breve: Labs e Especializações' } as any)[language]}
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  {({ 
                    es: 'Nuevas rutas de aprendizaje avanzadas con Labs hands-on, 100+ pasos, proyectos, ejercicios y preparación para certificaciones. Regístrate para ser notificado.', 
                    en: 'New advanced learning paths with hands-on Labs, 100+ steps, projects, exercises, and certification prep. Sign up to be notified.', 
                    pt: 'Novas trilhas de aprendizado avançadas com Labs hands-on, 100+ passos, projetos, exercícios e preparação para certificações. Cadastre-se para ser notificado.' 
                  } as any)[language]}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {nextSpecs.map((spec, idx) => (
                  <motion.div
                    key={spec.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <SpecializationCountdown specialization={spec} />
                  </motion.div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm">
                  {({ es: '🎁 Incluido en tu suscripción Premium', en: '🎁 Included in your Premium subscription', pt: '🎁 Incluído na sua assinatura Premium' } as any)[language]}
                </p>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Datasets Preview */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('subscriptionPage.datasetsSection.title')}
              </h2>
              <p className="text-slate-400 text-lg mb-6">
                {t('subscriptionPage.datasetsSection.subtitle')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "🛒", name: "E-commerce" },
                  { icon: "📊", name: "Web Logs" },
                  { icon: "💰", name: "Finanzas" },
                  { icon: "👥", name: "RRHH" },
                  { icon: "📡", name: "IoT Sensores" },
                  { icon: "🎬", name: "Streaming" }
                ].map((dataset, idx) => (
                  <div key={idx} className="bg-slate-800/50 rounded-lg p-3 flex items-center gap-3 border border-slate-700">
                    <span className="text-2xl">{dataset.icon}</span>
                    <span className="text-slate-300">{dataset.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
              <div className="font-mono text-sm">
                <p className="text-slate-500"># Ejemplo de uso de la API</p>
                <p className="text-emerald-400">import requests</p>
                <p className="text-white mt-2">response = requests.get(</p>
                <p className="text-yellow-400 ml-4">"https://iansaura.com/api/datasets.php"</p>
                <p className="text-yellow-400 ml-4">"?type=ecommerce&rows=1000"</p>
                <p className="text-white">)</p>
                <p className="text-white">data = response.json()</p>
                <p className="text-slate-500 mt-2"># 1000 filas de datos realistas!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">{t('subscriptionPage.testimonialsSection.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className={`bg-slate-800/50 rounded-2xl p-6 border ${(testimonial as any).linkedIn ? 'border-blue-500/50' : 'border-slate-700'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${(testimonial as any).linkedIn ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-white flex items-center gap-2">
                        {testimonial.name}
                        {(testimonial as any).linkedIn && (
                          <a href={(testimonial as any).linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <div className="text-slate-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-slate-300 italic">"{testimonial.text}"</p>
                  {(testimonial as any).linkedIn && (
                    <a href={(testimonial as any).linkedIn} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm mt-3">
                      {t('testimonials.viewLinkedIn')} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('subscriptionPage.faqSection.title')}</h2>
          <div className="space-y-4">
            {[
              {
                q: "¿Qué incluye exactamente la suscripción?",
                a: "Roadmap interactivo en 3 niveles (Novato → Guerrero → Maestro), 8 semanas de videos del bootcamp, generador de 6 tipos de datasets, +25 proyectos guiados con código, comunidad Discord exclusiva, Q&A mensual en vivo, sistema de gamificación con XP y recompensas, y certificados descargables."
              },
              {
                q: "¿Necesito conocimientos previos?",
                a: "No. El Nivel 1 empieza desde cero. Si ya sabés algo de Python o SQL, vas a avanzar más rápido, pero no es requisito. El roadmap te guía paso a paso."
              },
              {
                q: "¿Cuánto tiempo necesito dedicar por semana?",
                a: "Recomiendo 10-15 horas semanales para avanzar a buen ritmo. Pero vos manejás tus tiempos. El contenido está siempre disponible."
              },
              {
                q: "¿En cuánto tiempo puedo conseguir trabajo?",
                a: "Depende de tu dedicación y experiencia previa. Estudiantes del bootcamp han conseguido trabajo en 2-4 meses. El Nivel 1 del roadmap está diseñado para prepararte en 3-6 meses."
              },
              {
                q: "¿Puedo cancelar cuando quiera?",
                a: "Sí, cancelás cuando quieras. Sin compromisos, sin preguntas, sin letra chica. Si elegís el plan mensual, se renueva automáticamente pero podés cancelar en cualquier momento."
              },
              {
                q: "🔐 ¿Cómo accedo después de pagar?",
                a: "¡Muy fácil! Después de pagar, hacé click en 'Iniciar con Google' usando el MISMO EMAIL con el que pagaste. El sistema te reconoce automáticamente y te da acceso completo. Si usaste otro email, escribinos a info@iansaura.com"
              },
              {
                q: "¿Cuándo tengo acceso?",
                a: "Inmediatamente después de suscribirte. Entrás a tu panel de miembros y tenés todo disponible: roadmap, videos, datasets, proyectos, todo."
              },
              {
                q: "¿Es diferente al bootcamp en vivo?",
                a: "El bootcamp en vivo incluye sesiones interactivas, feedback personalizado y proyecto final con revisión. La suscripción te da acceso a las grabaciones del bootcamp más toda la plataforma de práctica (roadmaps, datasets, proyectos)."
              },
              {
                q: "¿Qué tecnologías se enseñan?",
                a: "Python, SQL, Pandas, AWS (S3, Redshift, Glue, Lambda), Snowflake, dbt, Apache Airflow, Docker, Git, y más. Todo lo que necesitás para trabajar como Data Engineer."
              },
              {
                q: "¿Hay certificado?",
                a: "Sí. Al completar cada nivel del roadmap podés descargar un certificado. También hay badges y logros por tus avances."
              },
              {
                q: "¿Qué pasa si ya hice el bootcamp?",
                a: "Perfecto, la suscripción te da acceso al roadmap avanzado (niveles 2 y 3 para Jr/SSR y Senior), datasets para seguir practicando, proyectos avanzados, y los Q&A mensuales."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Optimizado para conversión */}
      <section className="py-16 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('subscriptionPage.finalCta.title')}
          </h2>
          <p className="text-slate-400 mb-6">
            {t('subscriptionPage.finalCta.subtitle')}
          </p>
          
          <div className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border-2 border-emerald-500/50 inline-block">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-3xl">🚀</span>
              <div className="text-left">
                <div className="text-2xl font-bold text-white">$30/mes</div>
                <div className="text-slate-400 text-sm">{t('subscriptionPage.hero.cancelAnytime')}</div>
              </div>
            </div>
            <a
              href="https://iansaura.gumroad.com/l/dgyzxi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 px-10 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
            >
              🚀 {t('subscriptionPage.hero.subscribe')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800 pb-28 md:pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            <a 
              href="https://www.linkedin.com/in/ian-saura/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a 
              href="https://www.instagram.com/iansaura/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a 
              href="https://www.tiktok.com/@iansaura" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
            >
              <span className="text-white font-bold text-sm">TT</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex gap-4 text-slate-500 text-xs flex-wrap justify-center mb-4">
            <Link to="/terminos" className="hover:text-slate-300 transition-colors">Términos y Condiciones</Link>
            <span className="text-slate-700">•</span>
            <Link to="/privacidad" className="hover:text-slate-300 transition-colors">Política de Privacidad</Link>
            <span className="text-slate-700">•</span>
            <Link to="/conducta" className="hover:text-slate-300 transition-colors">Código de Conducta</Link>
            <span className="text-slate-700">•</span>
            <Link to="/reembolsos" className="hover:text-slate-300 transition-colors">Política de Reembolsos</Link>
          </div>

          {/* Copyright */}
          <p className="text-center text-slate-500 text-sm">© 2024 Ian Saura. La mejor academia de Data Engineering en LATAM.</p>
        </div>
      </footer>

      {/* 📱 STICKY CTA - Solo Mobile */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-slate-950 via-slate-950 to-transparent pt-4 pb-4 px-4 z-50">
        <a
          href="https://iansaura.gumroad.com/l/dgyzxi"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-4 rounded-xl text-lg shadow-lg shadow-emerald-500/30"
        >
          🚀 Suscribirme - $30/mes
        </a>
        <p className="text-center text-slate-500 text-xs mt-2">Cancela cuando quieras</p>
      </div>
    </div>
  );
}