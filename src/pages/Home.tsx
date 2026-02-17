import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  ChevronDown,
  Mail,
  Linkedin,
  CheckCircle,
  Instagram,
  User,
  Play,
  Zap,
  Star,
  ArrowRight,
  Calendar,
  MessageCircle,
  BookOpen,
  Layers,
  Bot,
  Target,
  Clock
} from 'lucide-react';
import FadeIn, { FadeInSpan } from '../components/FadeIn';
import { useLanguage } from '../i18n/LanguageContext';
import { specializations } from '../data/roadmap/specializations';
import { SpecializationCountdown } from '../components/SpecializationCountdown';

interface HomeProps {
  user?: any;
}

export default function Home({ user }: HomeProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  // Profile image loading state
  const [imageLoaded, setImageLoaded] = useState(false);
  const [aboutImageLoaded, setAboutImageLoaded] = useState(false);


  const discountUrl = 'https://iansaura.gumroad.com/l/dgyzxi/15OFF';

  const handleSubscribe = () => {
    if (!user) {
      navigate('/auth?redirect=/suscripcion&action=subscribe');
    } else {
      window.location.href = discountUrl;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api/waitlist.php' 
        : '/api/waitlist.php';
      
      const submissionData = {
        name: formData.name,
        email: formData.email,
        preferredPlan: 'Consulta desde Home',
        reason: formData.message,
        contactMethod: '',
        contactLink: ''
      };
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 4000);
      } else {
        alert('Error enviando mensaje: ' + (result.error || 'Error desconocido'));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert('Error enviando mensaje. Por favor intenta nuevamente. Detalles: ' + errorMessage);
    }

    setIsSubmitting(false);
  };

  // Testimonials data - Real testimonials from LinkedIn and chat
  const testimonials = [
    {
      name: "Sebastian Currin V.",
      role: "Ingeniero Mecánico → Data",
      text: "He hecho varios cursos de datos, incluidos bootcamps. La academia de Ian Saura es por lejos la que más me ha gustado, tiene un roadmap claro, con ejercicios entretenidos y útiles, datasets lo suficientemente complejos para desafiarte y también links a recursos útiles. La recomiendo totalmente.",
      initials: "SC",
      linkedIn: "https://www.linkedin.com/posts/sebastiancurrin_he-hecho-varios-cursos-de-datos-incluidos-activity-7401272428112318467-hOxs"
    },
    {
      name: "Nataya Soledad Flores",
      role: "Data Engineer | Developer | Teacher",
      text: "El roadmap estructurado me resultó muy útil para organizar mis conversaciones de 1:1 con mi PM y definir objetivos concretos. Destaco los datasets y APIs propias con casos de uso realistas, el modo entrevista con timer para preparación técnica, y que el contenido es aplicable tanto para perfiles junior como para quienes ya tienen experiencia en el área.",
      initials: "NF",
      linkedIn: "https://www.linkedin.com/posts/natayadev_les-traigo-un-recurso-para-quienes-est%C3%A1n-activity-7403864695448920064-4dlq"
    },
    {
      name: "Tomas De Franco",
      role: "Formándose como Data Scientist",
      text: "La Data Engineering Academy superó mis expectativas. SQL desde cero con ejercicios aplicados, Python con ejemplos simples y potentes. Cada módulo está pensado para quienes nunca programaron. Combina teoría, práctica y simulaciones de entrevistas técnicas. Ideal para dar el salto hacia Data Analyst, Data Engineer o Data Scientist.",
      initials: "TD",
      linkedIn: "https://www.linkedin.com/posts/tomasdefranco_dataanalyst-datascientist-sql-activity-7403566419298148353-ZyHX"
    },
    {
      name: "Felipe Fonseca",
      role: "Profesional de Datos",
      text: "Sin duda Ian Saura es un crack enseñando datos. Su curso me sacó de muchas dudas. Incluye explicación clara de conceptos básicos, ejercicios prácticos para aplicar lo aprendido, ejecución de modelos sencillos en la plataforma y recursos adicionales con ejemplos reales.",
      initials: "FF",
      linkedIn: "https://www.linkedin.com/posts/felipe-fonseca-5b804491_sin-duda-ian-saura-es-un-crack-ensenando-activity-7402105701701156865-dhGG"
    },
    {
      name: "Matías S.",
      role: "Data Professional",
      text: "Muy buena tu academia, le estuve dedicando bien foco estos días y la verdad me encantó. Super conciso y directo al tema, lleno de práctica. Al ser tan interactivo lo hacía gratificante de aprender y estudiar. Sin duda muy recomendable.",
      initials: "MS"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-sans">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      
      <Navigation user={user} />

      {/* Spacer for fixed navigation */}
      <div className="h-16" />

      {/* 🚨 URGENCY BANNER - 15% Discount */}
      {!user?.subscribed && (
        <div className="sticky top-16 z-40 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 py-2.5 px-4 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 md:gap-4 flex-wrap text-center">
            <span className="text-xl">🔥</span>
            <p className="text-white font-medium text-sm md:text-base">
              <strong className="text-yellow-300">15% OFF</strong> {({ es: 'en tu primer mes', en: 'on your first month', pt: 'no seu primeiro mês' } as any)[language]} — 
              <span className="hidden sm:inline">{({ es: 'Código: ', en: 'Code: ', pt: 'Código: ' } as any)[language]}</span>
              <code className="bg-white/20 px-2 py-0.5 rounded text-yellow-200 font-mono font-bold text-sm">15OFF</code>
              <span className="text-white/80 text-xs ml-1">⏰ {({ es: 'hasta 1/03', en: 'until Mar 1', pt: 'até 01/03' } as any)[language]}</span>
            </p>
            <a
              href={discountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-emerald-600 px-4 py-1.5 rounded-full font-bold text-sm hover:bg-emerald-50 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              {({ es: '¡Suscribirme!', en: 'Subscribe!', pt: 'Assinar!' } as any)[language]} <ArrowRight className="w-4 h-4" />
            </a>
            </div>
          </div>
      )}

      {/* Banner para usuarios registrados - Ir a su área */}
      {user && (
        <div className={`sticky top-16 z-40 py-3 px-4 ${
          user?.subscribed && user?.bootcamp_access 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600'
            : user?.subscribed 
              ? 'bg-gradient-to-r from-emerald-600 to-cyan-600'
              : user?.bootcamp_access
                ? 'bg-gradient-to-r from-orange-600 to-amber-600'
                : 'bg-gradient-to-r from-teal-600 to-emerald-600'
        }`}>
          <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
            <p className="text-white font-medium text-sm">
              🎉 {t('landing.banner.hello')} {user?.name?.split(' ')[0] || 'crack'}! {t('landing.banner.hasAccess')} 
              {user?.subscribed && user?.bootcamp_access 
                ? ` ${t('landing.banner.academyBootcamp')}`
                : user?.subscribed 
                  ? ` ${t('landing.banner.academyPremium')}`
                  : user?.bootcamp_access
                    ? ` ${t('landing.banner.bootcamp')}`
                    : ` ${t('landing.banner.academyFree')}`}
            </p>
            <div className="flex flex-wrap gap-2">
              {/* Todos los usuarios registrados pueden acceder a la Academia */}
                <Link
                  to="/members"
                  className="bg-white text-emerald-600 px-4 py-1.5 rounded-full font-bold text-sm hover:bg-emerald-50 transition-colors flex items-center gap-1"
                >
                  {t('landing.banner.academy')} <ArrowRight className="w-4 h-4" />
                </Link>
              {user?.bootcamp_access && (
                <Link
                  to="/bootcamp-platform"
                  className="bg-white text-orange-600 px-4 py-1.5 rounded-full font-bold text-sm hover:bg-orange-50 transition-colors flex items-center gap-1"
                >
                  {t('landing.banner.bootcamp')} <ArrowRight className="w-4 h-4" />
                </Link>
              )}
                  </div>
                  </div>
              </div>
          )}

      {/* Hero Section */}
      <main id="main-content" role="main">
      <section className="pt-12 md:pt-16 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
                      <FadeIn from="up" duration={800} className="text-center">
            {/* Profile Image */}
              <div className="mb-8">
              <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden shadow-2xl relative bg-slate-800 ring-4 ring-emerald-500/30">
                  {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 animate-pulse flex items-center justify-center">
                    <User className="w-12 h-12 text-slate-500" />
                    </div>
                  )}
                  <img 
                    src="/ian-saura-profile-sm.jpg" 
                    alt="Ian Saura - Data Engineer y Educador" 
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="eager"
                    width={400}
                    height={400}
                    onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(true)}
                  style={{ width: '128px', height: '128px' }}
                  />
                </div>
              </div>

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              {t('landing.hero.imIan')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Ian</span>.<br />
              <span className="text-slate-200">{t('landing.hero.dataEngineer')}</span>
              </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-6 max-w-3xl mx-auto leading-relaxed">
              {t('landing.hero.helpProfessionals')} <strong className="text-white">{t('landing.hero.increaseSalary')}</strong> {t('landing.hero.getRemoteJobs')} <strong className="text-white">{t('landing.hero.dataEngineers')}</strong> {t('landing.hero.inWeeks')}
            </p>
            
            <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
              <span className="text-emerald-400 font-medium">🚀 {t('landing.hero.bootcampsIntensive')}</span> {t('landing.hero.personalizedMentoring')} 
              <span className="text-cyan-400 font-medium"> {t('landing.hero.beginnerToExpert')}</span>
            </p>

            {/* Two Main CTAs: Bootcamp + Subscription */}
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-8">
              {/* Bootcamp Card */}
              <FadeIn from="left" distance={20} delay={300} duration={500}
                className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 rounded-2xl md:rounded-3xl p-5 md:p-8 text-white border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-3xl">🚀</span>
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full font-medium border border-blue-500/30">
                      {t('landing.bootcampCard.nextEdition')}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    {t('landing.bootcampCard.title')}
                  </h3>
                  <p className="text-slate-300 mb-6 text-sm leading-relaxed">
                    {t('landing.bootcampCard.description')} 
                    <strong className="text-white"> {t('landing.bootcampCard.limitedSpots')}</strong>
                  </p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      {t('landing.bootcampCard.feature1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      {t('landing.bootcampCard.feature2')}
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      {t('landing.bootcampCard.feature3')}
                    </li>
                  </ul>
                  
                  <div className="text-center mb-4">
                    <span className="text-slate-400 line-through mr-2">$500</span>
                    <span className="text-2xl font-bold text-emerald-400">$400</span>
                    <span className="text-slate-400 ml-2">USD {t('landing.bootcampCard.earlyBird')}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                <Link 
                  to="/bootcamps"
                      className="flex-1 bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-center hover:bg-slate-700 transition-all border border-slate-600"
                >
                      {t('landing.bootcampCard.viewDetails')}
                </Link>
                <a 
                  href="https://iansaura.gumroad.com/l/bykys"
                  target="_blank"
                  rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-center hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center gap-2"
                >
                      Inscribirme <ArrowRight className="w-4 h-4" />
                </a>
              </div>
                </div>
              </FadeIn>

              {/* Academia Card - Two options: FREE + PREMIUM TRIAL */}
              <FadeIn from="right" distance={20} delay={400} duration={500}
                className="bg-gradient-to-br from-emerald-900/40 to-cyan-900/40 rounded-2xl md:rounded-3xl p-5 md:p-8 text-white border-2 border-emerald-500/50 hover:border-emerald-400 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-6 h-6 text-emerald-400" />
                    <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full font-medium border border-emerald-500/30">
                      {t('landing.subscriptionCard.recommended')}
                    </span>
                      </div>
                  
                  <h3 className="text-2xl font-bold mb-3">
                    {t('landing.subscriptionCard.title')}
                        </h3>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                    {t('landing.subscriptionCard.description')}
                  </p>
                  
                  {/* Two Options */}
                  <div className="space-y-4">
                    {/* Option 1: FREE - Nivel 0 */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-600">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-white">🆓 {t('common.free')}</span>
                        <span className="text-emerald-400 font-bold">$0</span>
                      </div>
                      <ul className="text-sm text-slate-400 space-y-1 mb-3">
                        <li>✓ {t('landing.subscriptionCard.feature1')}</li>
                        <li>✓ {t('landing.subscriptionCard.feature2')}</li>
                        <li>✓ {t('landing.subscriptionCard.feature3')}</li>
                      </ul>
                    <Link 
                        to="/auth?action=register"
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white px-4 py-2.5 rounded-lg font-medium text-center transition-all flex items-center justify-center gap-2"
                    >
                        {t('auth.register')}
                    </Link>
                  </div>
                    
                    {/* Option 2: PREMIUM */}
                    <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl p-4 border-2 border-emerald-500/50 relative">
                      <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                        ⭐ {t('landing.subscriptionCard.recommended')}
                </div>
                      <div className="flex items-center justify-between mb-2 mt-2">
                        <span className="text-lg font-bold text-white">🚀 Premium</span>
                        <div className="text-right">
                          <span className="text-slate-500 line-through text-sm mr-1">$30</span>
                          <span className="text-emerald-400 font-bold text-lg">$25.50</span>
                          <span className="text-slate-400 text-xs"> {({ es: '1er mes', en: '1st month', pt: '1º mês' } as any)[language]}</span>
              </div>
            </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-1.5 mb-3 text-center">
                        <span className="text-yellow-300 text-xs font-bold">🎉 15% OFF {({ es: 'hasta 1/03', en: 'until Mar 1', pt: 'até 01/03' } as any)[language]} — {({ es: 'Código: ', en: 'Code: ', pt: 'Código: ' } as any)[language]}<code className="bg-yellow-500/20 px-1.5 py-0.5 rounded font-mono">15OFF</code></span>
                      </div>
                      <ul className="text-sm text-slate-300 space-y-1 mb-3">
                        <li>✓ {t('landing.subscriptionCard.feature1')}</li>
                        <li>✓ {t('landing.subscriptionCard.feature4')}</li>
                        <li>✓ {t('landing.banner.noRisk')}</li>
                      </ul>
                      <a
                        href={discountUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 py-3 rounded-lg font-bold text-center transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        {t('landing.subscriptionCard.startTrial')} <ArrowRight className="w-4 h-4" />
                      </a>
                      <p className="text-center text-xs text-slate-500 mt-2">
                        {t('landing.banner.noRisk')}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </FadeIn>

          <FadeIn from="none" delay={1000} duration={500} className="text-center mt-12">
            <button
              onClick={() => document.getElementById('testimonios')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-slate-500 hover:text-slate-300 transition-colors animate-bounce"
            >
              <ChevronDown className="w-8 h-8" />
            </button>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section id="testimonios" className="py-16 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn from="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('testimonials.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t('testimonials.titleHighlight')}</span>
              </h2>
              <p className="text-slate-400">{t('testimonials.subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {testimonials.map((testimonial, index) => (
                <FadeIn
                  key={index}
                  from="up"
                  distance={20}
                  delay={index * 100}
                  duration={500}
                  className={`bg-slate-800/50 rounded-2xl p-6 border transition-all ${
                    (testimonial as any).linkedIn 
                      ? 'border-blue-500/50 hover:border-blue-500/70' 
                      : 'border-slate-700 hover:border-emerald-500/30'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                  </div>
                    {(testimonial as any).linkedIn && (
                      <a 
                        href={(testimonial as any).linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs bg-blue-500/10 px-2 py-1 rounded-full"
                      >
                        <Linkedin className="w-3 h-3" />
                        {t('testimonials.viewLinkedIn')}
                      </a>
                    )}
                </div>
                  <p className="text-slate-300 text-sm mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                      (testimonial as any).linkedIn 
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                        : 'bg-gradient-to-br from-emerald-500 to-cyan-500'
                    }`}>
                      {testimonial.initials}
                  </div>
                    <div>
                      <p className="font-bold text-white text-sm">{testimonial.name}</p>
                      <p className="text-slate-400 text-xs">{testimonial.role}</p>
                </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Companies where students work */}
                <div className="text-center">
              <p className="text-slate-500 text-sm mb-4">{t('testimonials.studentsWorkAt')}</p>
              <div className="flex flex-wrap justify-center gap-6 items-center opacity-60">
                <span className="text-slate-400 font-medium">Mercado Libre</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-medium">Globant</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-medium">Ualá</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-medium">Despegar</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 font-medium">{t('testimonials.remoteStartups')}</span>
                  </div>
                </div>
          </FadeIn>
              </div>
      </section>

      {/* 🚀 NUEVO - Databricks Specialization Launch */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-900/95 to-orange-900/10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-amber-500/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn from="up" distance={30} duration={600}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-500/30 animate-pulse">
                <span>🚀</span>
                {({ es: '¡NUEVO LANZAMIENTO!', en: 'NEW LAUNCH!', pt: 'NOVO LANÇAMENTO!' } as any)[language]}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {({ es: 'Especialización en Databricks', en: 'Databricks Specialization', pt: 'Especialização em Databricks' } as any)[language]}
              </h2>
              <p className="text-xl text-orange-400 font-medium mb-4">
                {({ es: 'El mejor curso de Databricks en LATAM', en: 'The best Databricks course in LATAM', pt: 'O melhor curso de Databricks em LATAM' } as any)[language]}
              </p>
              <p className="text-slate-400 max-w-2xl mx-auto">
                {({ 
                  es: 'Domina Databricks desde cero hasta la certificación DE Associate. 12 fases completas con teoría, práctica, Labs hands-on y proyectos reales.', 
                  en: 'Master Databricks from zero to DE Associate certification. 12 complete phases with theory, practice, hands-on Labs and real projects.', 
                  pt: 'Domine Databricks do zero à certificação DE Associate. 12 fases completas com teoria, prática, Labs hands-on e projetos reais.' 
                } as any)[language]}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-10">
              <FadeIn from="up" distance={20} delay={100}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-orange-500/20"
              >
                <div className="text-3xl font-bold text-orange-400">12</div>
                <div className="text-slate-400 text-sm">{({ es: 'Fases', en: 'Phases', pt: 'Fases' } as any)[language]}</div>
              </FadeIn>
              <FadeIn from="up" distance={20} delay={200}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-500/20"
              >
                <div className="text-3xl font-bold text-blue-400">100+</div>
                <div className="text-slate-400 text-sm">{({ es: 'Pasos', en: 'Steps', pt: 'Passos' } as any)[language]}</div>
              </FadeIn>
              <FadeIn from="up" distance={20} delay={300}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-500/20"
              >
                <div className="text-3xl font-bold text-purple-400">20</div>
                <div className="text-slate-400 text-sm">{({ es: 'Ejercicios', en: 'Exercises', pt: 'Exercícios' } as any)[language]}</div>
              </FadeIn>
              <FadeIn from="up" distance={20} delay={400}
                className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border border-emerald-500/20"
              >
                <div className="text-3xl font-bold text-emerald-400">10</div>
                <div className="text-slate-400 text-sm">Labs</div>
              </FadeIn>
            </div>

            {/* Topics */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['Apache Spark', 'Delta Lake', 'Unity Catalog', 'Delta Live Tables', 'MLflow', 'Workflows', 'SQL Warehouse', 'Certificación DE'].map((topic, idx) => (
                <FadeInSpan delay={idx * 50} className="bg-orange-500/10 text-orange-300 px-4 py-2 rounded-full text-sm font-medium border border-orange-500/20"
                >
                  {topic}
                </FadeInSpan>
              ))}
            </div>

            {/* CTA */}
            <FadeIn from="up" distance={20} delay={500}
                className="text-center"
            >
              <Button
                onClick={() => {
                  if (user) {
                    navigate('/members?tab=especializaciones');
                  } else {
                    navigate('/auth?redirect=/members?tab=especializaciones');
                  }
                }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
              >
                <Play className="w-5 h-5 mr-2" />
                {({ es: '¡Comenzar Ahora!', en: 'Start Now!', pt: 'Começar Agora!' } as any)[language]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-slate-500 text-sm mt-4">
                {({ es: '✨ Incluido gratis con tu suscripción Premium', en: '✨ Included free with your Premium subscription', pt: '✨ Incluído grátis com sua assinatura Premium' } as any)[language]}
              </p>
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* ☁️ COMING SOON - AWS Data Engineering Specialization */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-900/10 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <FadeIn from="up" distance={30} duration={600}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-500/30">
                <Clock className="w-4 h-4" />
                {({ es: 'PROXIMAMENTE - MARZO 2026', en: 'COMING SOON - MARCH 2026', pt: 'EM BREVE - MARÇO 2026' } as any)[language]}
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {({ es: 'Especialización en', en: 'Specialization in', pt: 'Especialização em' } as any)[language]}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">AWS Data Engineering</span>
              </h2>
              <p className="text-xl text-amber-400 font-medium mb-4">
                {({ es: '2 Niveles: Serverless + Advanced', en: '2 Levels: Serverless + Advanced', pt: '2 Níveis: Serverless + Advanced' } as any)[language]}
              </p>
              <p className="text-slate-400 max-w-2xl mx-auto">
                {({ 
                  es: 'Domina AWS desde cero hasta nivel expert. Lambda, Fargate, Step Functions, Redshift, EMR y más. 10 proyectos enterprise con arquitectura Medallion y 18 preguntas de entrevista.', 
                  en: 'Master AWS from zero to expert level. Lambda, Fargate, Step Functions, Redshift, EMR and more. 10 enterprise projects with Medallion architecture and 18 interview questions.', 
                  pt: 'Domine AWS do zero ao nível expert. Lambda, Fargate, Step Functions, Redshift, EMR e mais. 10 projetos enterprise com arquitetura Medallion e 18 perguntas de entrevista.' 
                } as any)[language]}
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="max-w-md mx-auto mb-10">
              <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-500/30">
                <p className="text-amber-400 text-sm font-semibold mb-4 text-center">
                  {({ es: '🚀 Lanzamiento: 1 de Marzo 2026', en: '🚀 Launch: March 1, 2026', pt: '🚀 Lançamento: 1 de Março 2026' } as any)[language]}
                </p>
                <SpecializationCountdown 
                  specialization={specializations.find(s => s.id === 'spec-aws')!} 
                  compact={true} 
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto mb-10">
              {[
                { value: '15', label: ({ es: 'Fases', en: 'Phases', pt: 'Fases' } as any)[language], color: 'text-amber-400', border: 'border-amber-500/20' },
                { value: '134', label: ({ es: 'Pasos', en: 'Steps', pt: 'Passos' } as any)[language], color: 'text-blue-400', border: 'border-blue-500/20' },
                { value: '44', label: ({ es: 'Ejercicios', en: 'Exercises', pt: 'Exercícios' } as any)[language], color: 'text-purple-400', border: 'border-purple-500/20' },
                { value: '10', label: ({ es: 'Proyectos', en: 'Projects', pt: 'Projetos' } as any)[language], color: 'text-emerald-400', border: 'border-emerald-500/20' },
                { value: '18', label: ({ es: 'Entrevistas', en: 'Interview Q', pt: 'Entrevistas' } as any)[language], color: 'text-red-400', border: 'border-red-500/20' },
              ].map((stat, idx) => (
                <FadeIn
                  key={idx}
                  from="up"
                  distance={20}
                  delay={idx * 100}
                  className={`bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 text-center border ${stat.border}`}
                >
                  <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </FadeIn>
              ))}
            </div>

            {/* What's included */}
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
              <div className="bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20">
                <div className="text-sm font-bold text-emerald-400 mb-2">
                  {({ es: 'Nivel 1: Serverless (Free Tier)', en: 'Level 1: Serverless (Free Tier)', pt: 'Nível 1: Serverless (Free Tier)' } as any)[language]}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['S3 Medallion', 'Lambda', 'Fargate', 'Step Functions', 'Athena', 'Secrets Manager'].map(s => (
                    <span key={s} className="bg-emerald-500/10 text-emerald-300 text-xs px-2 py-1 rounded-full border border-emerald-500/20">{s}</span>
                  ))}
                </div>
              </div>
              <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                <div className="text-sm font-bold text-purple-400 mb-2">
                  {({ es: 'Nivel 2: Advanced', en: 'Level 2: Advanced', pt: 'Nível 2: Advanced' } as any)[language]}
                </div>
                <div className="flex flex-wrap gap-2">
                  {['EMR', 'Kinesis', 'Redshift', 'MWAA', 'CloudFormation', 'Certificación'].map(s => (
                    <span key={s} className="bg-purple-500/10 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/20">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <FadeIn from="up" distance={20} delay={500}
                className="text-center"
            >
              <Button
                onClick={() => {
                  if (user) {
                    navigate('/members?tab=especializaciones');
                  } else {
                    navigate('/auth?redirect=/members?tab=especializaciones');
                  }
                }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:scale-105 transition-all"
              >
                <Clock className="w-5 h-5 mr-2" />
                {({ es: 'Ver Preview del Contenido', en: 'Preview Content', pt: 'Ver Preview do Conteúdo' } as any)[language]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-slate-500 text-sm mt-4">
                {({ es: '✨ Incluido gratis con tu suscripción Premium', en: '✨ Included free with your Premium subscription', pt: '✨ Incluído grátis com sua assinatura Premium' } as any)[language]}
              </p>
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* 🎓 NUEVO - Fundamentos Teóricos (Deep Dives) */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-violet-900/10 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <FadeIn from="up" distance={30} duration={600}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-emerald-500/30 animate-pulse">
              <span>🚀</span>
              {({ es: '¡NUEVO LANZAMIENTO!', en: 'NEW LAUNCH!', pt: 'NOVO LANÇAMENTO!' } as any)[language]}
            </div>
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-5xl">🎓</span>
              <h2 className="text-3xl md:text-4xl font-bold">
                {({ es: 'Fundamentos Teóricos', en: 'Theoretical Foundations', pt: 'Fundamentos Teóricos' } as any)[language]}
              </h2>
            </div>
            
            <p className="text-xl text-violet-400 font-medium mb-4">
              {({ es: 'Para quienes quieren entender el "por qué"', en: 'For those who want to understand the "why"', pt: 'Para quem quer entender o "porquê"' } as any)[language]}
            </p>
            
            <p className="text-slate-400 max-w-2xl mx-auto mb-8">
              {({ 
                es: '20+ Deep Dives con Mapas Mentales Mermaid, Cheat Sheets técnicos, Papers clásicos (Kleppmann, Kimball, Google, Amazon) y Gotchas de nivel senior. OPCIONAL pero poderoso.', 
                en: '20+ Deep Dives with Mermaid Mind Maps, Technical Cheat Sheets, Classic Papers (Kleppmann, Kimball, Google, Amazon) and Senior-level Gotchas. OPTIONAL but powerful.', 
                pt: '20+ Deep Dives com Mapas Mentais Mermaid, Cheat Sheets técnicos, Papers clássicos (Kleppmann, Kimball, Google, Amazon) e Gotchas de nível sênior. OPCIONAL mas poderoso.' 
              } as any)[language]}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-violet-500/20">
                <div className="text-2xl font-bold text-violet-400">20+</div>
                <div className="text-xs text-slate-400">Deep Dives</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-violet-500/20">
                <div className="text-2xl font-bold text-blue-400">40+</div>
                <div className="text-xs text-slate-400">{({ es: 'Horas', en: 'Hours', pt: 'Horas' } as any)[language]}</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-violet-500/20">
                <div className="text-2xl font-bold text-yellow-400">1500+</div>
                <div className="text-xs text-slate-400">XP Bonus</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-violet-500/20">
                <div className="text-2xl font-bold text-emerald-400">∞</div>
                <div className="text-xs text-slate-400">{({ es: 'Niveles', en: 'Levels', pt: 'Níveis' } as any)[language]}</div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['Mind Maps', 'Cheat Sheets', 'Kleppmann', 'Kimball', 'Google Papers', 'First Principles', 'Gotchas Senior'].map(skill => (
                <span key={skill} className="bg-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full border border-violet-500/30">
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-emerald-400 text-sm flex items-center justify-center gap-2 mb-6">
              <CheckCircle className="w-4 h-4" />
              {({ es: 'OPCIONAL - Complementa cualquier nivel del roadmap', en: 'OPTIONAL - Complements any roadmap level', pt: 'OPCIONAL - Complementa qualquer nível do roadmap' } as any)[language]}
            </p>

            {/* CTA Button */}
            <FadeIn from="up" distance={20} delay={300}>
              <Button
                onClick={() => {
                  if (user) {
                    navigate('/members?tab=especializaciones');
                  } else {
                    navigate('/auth?redirect=/members?tab=especializaciones');
                  }
                }}
                className="bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-lg shadow-violet-500/30 hover:scale-105 transition-all"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {({ es: 'Explorar Deep Dives', en: 'Explore Deep Dives', pt: 'Explorar Deep Dives' } as any)[language]}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-slate-500 text-sm mt-4">
                {({ es: '✨ Incluido gratis con tu suscripción Premium', en: '✨ Included free with your Premium subscription', pt: '✨ Incluído grátis com sua assinatura Premium' } as any)[language]}
              </p>
            </FadeIn>
          </FadeIn>
        </div>
      </section>

      {/* Subscription Benefits Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn from="up" distance={30} duration={600}>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full font-medium mb-6 border border-emerald-500/30">
                <Zap className="w-4 h-4" />
                {t('landingSubscription.badge')}
                  </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                {t('landingSubscription.title')} 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400"> {t('landingSubscription.titleHighlight')}</span>
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                {t('landingSubscription.subtitle')}
              </p>
                  </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/30 transition-all text-center">
                <Play className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature1Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature1Desc')}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/30 transition-all text-center">
                <BookOpen className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature2Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature2Desc')}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/30 transition-all text-center">
                <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature3Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature3Desc')}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/30 transition-all text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature4Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature4Desc')}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/30 transition-all text-center">
                <MessageCircle className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature5Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature5Desc')}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 hover:border-emerald-500/30 transition-all text-center">
                <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature6Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature6Desc')}</p>
              </div>
            </div>
            {/* NEW - Interview Prep Features */}
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 mb-12">
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all text-center relative">
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-bold rounded-full animate-pulse">NEW</span>
                <Layers className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature7Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature7Desc')}</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/10 rounded-xl p-4 border border-cyan-500/30 hover:border-cyan-400/50 transition-all text-center relative">
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold rounded-full animate-pulse">NEW</span>
                <Bot className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature8Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature8Desc')}</p>
              </div>
              <div className="bg-gradient-to-br from-amber-500/20 to-orange-600/10 rounded-xl p-4 border border-amber-500/30 hover:border-amber-400/50 transition-all text-center relative">
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full animate-pulse">NEW</span>
                <Target className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{t('landingSubscription.feature9Title')}</h3>
                <p className="text-slate-500 text-xs">{t('landingSubscription.feature9Desc')}</p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-emerald-900/50 to-cyan-900/50 rounded-2xl md:rounded-3xl p-5 md:p-8 border border-emerald-500/30 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-emerald-400 font-bold">{t('landingSubscription.priceLabel')}</span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$30</span>
                <span className="text-slate-400 ml-2">USD/{t('common.month')}</span>
              </div>
              
              <button
                onClick={handleSubscribe}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
              >
                {user ? `🚀 ${t('common.subscribeNow')} $30/${t('common.month')}` : t('landingSubscription.cta')}
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-slate-500 text-sm mt-4">
                {t('landingSubscription.ctaNote')}
                </p>
              </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn from="up" distance={30} duration={600}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t('faq.title').split(' ').slice(0, -1).join(' ')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{t('faq.title').split(' ').slice(-1)[0]}</span>
              </h2>
              <p className="text-slate-400">{t('faq.subtitle')}</p>
            </div>

            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">❓</span> {t('faq.q1')}
                </h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start gap-3 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                    <span className="text-emerald-400 font-bold">{t('nav.academy').replace('Go to ', '').replace('Ir a la ', '').replace('Ir para a ', '')}:</span>
                    <p>{t('faq.a1Academy')}</p>
                  </div>
                  <div className="flex items-start gap-3 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                    <span className="text-blue-400 font-bold">Bootcamp:</span>
                    <p>{t('faq.a1Bootcamp')}</p>
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">⏱️</span> {t('faq.q2')}
                </h3>
                <p className="text-slate-300" dangerouslySetInnerHTML={{ __html: t('faq.a2') }} />
                <ul className="mt-3 space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{t('faq.a2Level0')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{t('faq.a2Level1')}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{t('faq.a2Ready')}</span>
                  </li>
                </ul>
              </div>

              {/* FAQ 3 */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">💳</span> {t('faq.q3')}
                </h3>
                <p className="text-slate-300">
                  {t('faq.a3')}
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">🎓</span> {t('faq.q4')}
                </h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold min-w-fit">{t('nav.academy').replace('Go to ', '').replace('Ir a la ', '').replace('Ir para a ', '')}:</span>
                    <p>{t('faq.a4Academy')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 font-bold min-w-fit">Bootcamp:</span>
                    <p>{t('faq.a4Bootcamp')}</p>
                  </div>
                  <p className="text-sm text-slate-400 mt-2">
                    {t('faq.a4Tip')}
                  </p>
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-emerald-400">🌎</span> {t('faq.q5')}
                </h3>
                <p className="text-slate-300">
                  {t('faq.a5')}
                </p>
              </div>
            </div>

            {/* CTA after FAQ */}
            <div className="text-center mt-10">
              <p className="text-slate-400 mb-4">{t('faq.moreQuestions')}</p>
              <a
                href="https://discord.gg/jfyqeAMpmk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-medium transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                {t('faq.askDiscord')}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Sobre mí */}
      <section id="sobre-mi" className="py-24 bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn from="up" distance={30} duration={600}>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {t('about.title')}
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto"></div>
            </div>

            <div className="bg-slate-800/50 rounded-2xl md:rounded-3xl p-5 md:p-12 border border-slate-700">
              <div className="grid md:grid-cols-3 gap-6 md:gap-12 items-center">
                <div className="text-center md:text-left">
                  <div className="w-48 h-48 mx-auto md:mx-0 mb-6 rounded-3xl overflow-hidden shadow-2xl relative bg-slate-700 ring-4 ring-emerald-500/20">
                    {!aboutImageLoaded && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-700 animate-pulse flex items-center justify-center">
                        <User className="w-16 h-16 text-slate-500" />
                      </div>
                    )}
                    <img 
                      src="/ian-saura-profile-md.jpg" 
                      alt="Ian Saura - Data Engineer y Educador" 
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        aboutImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      loading="lazy"
                      onLoad={() => setAboutImageLoaded(true)}
                      onError={() => setAboutImageLoaded(true)}
                      style={{ width: '192px', height: '192px' }}
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Ian Saura</h3>
                  <p className="text-lg text-emerald-400 font-medium mb-2">{t('about.role')}</p>
                  <p className="text-slate-400 mb-6">{t('about.location')}</p>

                  <div className="flex justify-center md:justify-start gap-4">
                    <a
                      href="https://www.linkedin.com/in/ian-saura/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@iansaura"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <span className="text-white font-bold text-sm">TT</span>
                    </a>
                    <a
                      href="https://www.instagram.com/iansaura/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <Instagram className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href="https://discord.gg/jfyqeAMpmk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-indigo-600 hover:bg-indigo-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">Data Engineer</span>
                    <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">Profesor UNSAM</span>
                    <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30">Ingeniero Biomédico</span>
                    <span className="bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium border border-orange-500/30">📚 Autor</span>
                  </div>

                  <p className="text-lg text-slate-300 leading-relaxed">
                    {t('about.bio')}
                  </p>

                  <p className="text-lg text-slate-300 leading-relaxed">
                    {t('about.bio2')}
                  </p>

                  <div className="bg-slate-700/50 p-6 rounded-2xl border-l-4 border-emerald-500">
                    <p className="text-slate-200 font-medium">
                      {t('about.philosophy')}
                      </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-slate-600">
                      <div className="text-2xl font-bold text-emerald-400 mb-1">5+</div>
                      <div className="text-sm text-slate-400">{t('about.yearsExp')}</div>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-slate-600">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">150+</div>
                      <div className="text-sm text-slate-400">{t('about.transformed')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section - Simplified */}
      <section id="contacto" className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn from="up" distance={30} duration={600}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {t('contact.title')}
              </h2>
              <p className="text-slate-400">
                {t('contact.subtitle').replace('info@iansaura.com', '')} <a href="mailto:info@iansaura.com" className="text-emerald-400 hover:text-emerald-300">info@iansaura.com</a>
              </p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 max-w-2xl mx-auto">
              {submitted ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <h3 className="text-xl font-bold mb-2">{t('common.messageSent')}</h3>
                  <p className="text-slate-400 text-sm">{t('common.willReply')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        placeholder={t('contact.namePlaceholder')}
                      />
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                        placeholder={t('contact.emailPlaceholder')}
                      />
                    </div>
                    <Textarea
                      required
                    rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    placeholder={t('contact.messagePlaceholder')}
                    />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-xl font-medium"
                  >
                    {isSubmitting ? t('common.sending') : t('contact.send')}
                    <Mail className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 🎁 Referral Program Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900/20 via-slate-900 to-pink-900/20">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn from="up" distance={20} className="text-center mb-12">
            <span className="text-5xl mb-4 block">🎁</span>
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('referral.title')}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {t('referral.subtitle')}
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Free User Benefit */}
            <FadeIn from="left" distance={20} className="bg-slate-800/50 rounded-2xl p-6 border border-purple-500/30">

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {t('referral.freeUser.title')}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {t('referral.freeUser.description')}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  {t('referral.freeUser.benefit1')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  {t('referral.freeUser.benefit2')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  {t('referral.freeUser.benefit3')}
                </li>
              </ul>
            </FadeIn>

            {/* Premium User Benefit */}
            <FadeIn from="right" distance={20} className="bg-slate-800/50 rounded-2xl p-6 border border-amber-500/30">

              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👑</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {t('referral.premiumUser.title')}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {t('referral.premiumUser.description')}
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  {t('referral.premiumUser.benefit1')}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  {t('referral.premiumUser.benefit2')}
                </li>
              </ul>
            </FadeIn>
          </div>

          <FadeIn from="up" distance={10} className="mt-8 text-center">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-500 hover:to-pink-500 transition-all transform hover:scale-105"
            >
              {t('referral.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-slate-500 text-sm mt-3">
              {t('referral.note')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-t from-emerald-900/20 to-transparent">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">
            {t('finalCta.title')}
          </h2>
          <p className="text-slate-400 mb-8">
            {t('finalCta.subtitle')}
          </p>
              <button
            onClick={handleSubscribe}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
              >
            {user ? `🚀 ${t('common.subscribeNow')} $30/${t('common.month')}` : t('finalCta.cta')}
            <ArrowRight className="w-5 h-5" />
              </button>
          <p className="text-emerald-400 text-sm mt-4 font-medium">
            {t('finalCta.note')}
                </p>
              </div>
      </section>

      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Ian Saura</h3>
              <p className="text-slate-400 text-sm mb-3">{t('landingFooter.tagline')}</p>
              {/* Social Media Links */}
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/in/ian-saura/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/iansaura/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white" />
                </a>
                <a
                  href="https://www.tiktok.com/@iansaura"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="TikTok"
                >
                  <span className="text-white font-bold text-xs">TT</span>
                </a>
              </div>
            </div>
            <div className="flex gap-6 text-slate-400 text-sm flex-wrap justify-center">
              <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
              <Link to="/bootcamps" className="hover:text-white transition-colors">{t('nav.bootcamps')}</Link>
              <Link to="/suscripcion" className="hover:text-white transition-colors">{t('nav.subscription')}</Link>
              <Link to="/mentorias" className="hover:text-white transition-colors">{t('nav.mentorias')}</Link>
              <a href="mailto:info@iansaura.com" className="hover:text-white transition-colors">{t('common.contact')}</a>
            </div>
          </div>
          
          {/* Legal Links */}
          <div className="border-t border-slate-800 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex gap-4 text-slate-500 text-xs flex-wrap justify-center">
                <Link to="/terminos" className="hover:text-slate-300 transition-colors">{t('landingFooter.terms')}</Link>
                <Link to="/privacidad" className="hover:text-slate-300 transition-colors">{t('landingFooter.privacy')}</Link>
                <Link to="/conducta" className="hover:text-slate-300 transition-colors">{t('landingFooter.conduct')}</Link>
                <Link to="/reembolsos" className="hover:text-slate-300 transition-colors">{t('common.refundPolicy')}</Link>
              </div>
              <p className="text-slate-500 text-xs">
                © {new Date().getFullYear()} Ian Saura. {t('common.allRightsReserved')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 