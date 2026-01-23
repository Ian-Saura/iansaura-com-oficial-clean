import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { Bootcamp } from '../types/bootcamp';
import bootcampsData from '../content/bootcamps.json';
import { useLanguage } from '../i18n/LanguageContext';
import { 
  CheckCircle, Clock, Users, ArrowRight, Calendar, Star, Quote, 
  Play, Target, Award, Zap, MessageCircle, Shield,
  Code, Database, Rocket, ChevronDown
} from 'lucide-react';

interface BootcampsProps {
  user?: any;
}

export default function Bootcamps({ user }: BootcampsProps) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  const bootcamp = (bootcampsData as Bootcamp[]).find(
    (b) => b.slug === 'de-8-semanas'
  );

  const { t } = useLanguage();

  if (!bootcamp) {
    return <div>{t('bootcamp.notFound')}</div>;
  }

  const handleEnroll = () => {
    window.open('https://iansaura.gumroad.com/l/bykys', '_blank', 'noopener,noreferrer');
  };

  // Testimonials data
  const testimonials = [
    {
      name: "Victor Serey",
      cohort: "Cohorte Sep 2025",
      text: "Mi experiencia ha sido muy buena, siento que estoy aprendiendo realmente. Me sorprendió la dinámica del bootcamp, con un enfoque práctico sin dejar de lado la teoría.",
      achievement: "Diseñó un Pipeline desde 0 en 3 semanas",
      rating: 5
    },
    {
      name: "Marcelo López",
      cohort: "Cohorte 1 (2025)",
      text: "Vimos y entendimos no solo cómo se construye un pipeline, si no para qué sirve y cómo se debe hacer para que sea entendido por cualquiera.",
      achievement: "Aprendió documentación y validación de pipelines",
      rating: 5
    },
    {
      name: "Leonardo Polanco",
      cohort: "Cohorte Nov 2024",
      text: "Lo que más me gustó fue poder aplicar directamente lo aprendido. El proyecto final lo adapté para un cliente real y quedó funcionando en producción.",
      achievement: "Aplicó el proyecto final a un cliente real",
      rating: 5
    }
  ];

  const transformations = [
    { before: "Analista de datos sin saber programar", after: "Data Engineer Jr con Python + SQL", icon: <Code className="w-6 h-6" /> },
    { before: "Desarrollador queriendo cambiar a datos", after: "Construyendo pipelines en producción", icon: <Database className="w-6 h-6" /> },
    { before: "Sin experiencia en cloud", after: "Entendiendo arquitecturas cloud modernas", icon: <Rocket className="w-6 h-6" /> },
    { before: "No sé qué estudiar primero", after: "Roadmap claro semana por semana", icon: <Target className="w-6 h-6" /> }
  ];

  const whyDifferent = [
    { 
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Feedback Real en Cada Entrega",
      description: "No estás solo. Reviso tu código, te doy feedback personalizado y te ayudo a mejorar semana a semana."
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: "Proyecto Final Integrador",
      description: "Terminás con un pipeline completo en tu portfolio: ingesta, transformación, orquestación y visualización."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Grupos Reducidos (10 max)",
      description: "Atención personalizada. Puedo conocer tu situación y ayudarte a alcanzar TUS objetivos específicos."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Grabaciones + Comunidad de por Vida",
      description: "Acceso permanente a las grabaciones y al Discord de alumnos. Networking que vale oro."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-sans">
      <Navigation user={user} />

      {/* Hero Section - Impactful */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg shadow-orange-500/25"
          >
            <Zap className="w-4 h-4" />
            PRÓXIMA EDICIÓN POR CONFIRMAR
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            De cero a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
              Data Engineer
            </span>
            <br />en 8 semanas
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto"
          >
            El bootcamp más práctico de LATAM. Reservá tu lugar ahora para la próxima edición (dentro de los próximos 6 meses). 
            Feedback directo de Ian en cada entrega y un proyecto final para tu portfolio.
          </motion.p>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6 mb-10"
          >
            {[
              { icon: <Calendar className="w-5 h-5" />, text: "8 semanas intensivas" },
              { icon: <Clock className="w-5 h-5" />, text: "6-8 hs/semana" },
              { icon: <Users className="w-5 h-5" />, text: "10 cupos máximo" },
              { icon: <Play className="w-5 h-5" />, text: "Clases en vivo + grabaciones" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-full px-5 py-2.5 border border-slate-700">
                <span className="text-blue-400">{item.icon}</span>
                <span className="text-slate-200 font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={handleEnroll}
              className="group bg-gradient-to-r from-blue-500 via-cyan-500 to-emerald-500 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:shadow-2xl hover:shadow-cyan-500/25 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>Inscribirme Ahora</span>
              <div className="flex flex-col items-start text-sm font-normal">
                <span className="line-through text-white/60">$500 USD</span>
                <span className="text-white font-bold">$400 USD</span>
              </div>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 mt-4 text-sm"
          >
            🔥 Precio pre-inscripción: $400 USD. Una vez confirmada la fecha, el precio sube a $500 USD
          </motion.p>
        </div>
      </section>

      {/* Transformation Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tu transformación en 8 semanas
            </h2>
            <p className="text-slate-400 text-lg">
              No importa de dónde vengas, el bootcamp te lleva a donde querés ir
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {transformations.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-r from-slate-800/80 to-slate-800/40 rounded-2xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-blue-400">
                    {t.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-slate-400 text-sm line-through">{t.before}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                      <span className="text-white font-semibold">{t.after}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Por qué este bootcamp es diferente?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              No es otro curso más de videos. Es una experiencia de aprendizaje con acompañamiento real.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whyDifferent.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Programa Semana por Semana
            </h2>
            <p className="text-slate-400 text-lg">
              8 semanas de contenido estructurado para que aprendas haciendo
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {bootcamp.syllabus.map((week, idx) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-700/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-xl flex items-center justify-center font-bold">
                      {week.week}
                    </span>
                    <div>
                      <span className="font-semibold text-white text-lg">{week.title}</span>
                      <p className="text-slate-400 text-sm mt-1">{week.points.length} temas</p>
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedWeek === week.week ? 'rotate-180' : ''}`} />
                </button>
                
                {expandedWeek === week.week && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="px-5 pb-5 border-t border-slate-700"
                  >
                    <ul className="space-y-2 pt-4">
                      {week.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Lo que dicen nuestros alumnos
            </h2>
            <p className="text-slate-400 text-lg">
              Resultados reales de personas como vos
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700"
              >
                <Quote className="w-10 h-10 text-blue-500/30 mb-4" />
                <p className="text-slate-300 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.cohort}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-sm">
                  <span className="text-emerald-400 font-medium">🎯 {testimonial.achievement}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 via-cyan-600 to-emerald-600 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para dar el salto a Data Engineering?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                La próxima cohorte arranca el 13 de Enero. Solo 10 cupos disponibles.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <button
                  onClick={handleEnroll}
                  className="group bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3"
                >
                  Inscribirme - $400 USD
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" /> Pago seguro
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Garantía de satisfacción
                </span>
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4" /> Acceso de por vida a grabaciones
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-6">¿Tenés dudas?</h3>
          <p className="text-slate-400 mb-6">
            Escribime directamente a{' '}
            <a href="mailto:info@iansaura.com" className="text-blue-400 hover:underline">
              info@iansaura.com
            </a>
            {' '}y te respondo personalmente.
          </p>
        </div>
      </section>
    </div>
  );
}
