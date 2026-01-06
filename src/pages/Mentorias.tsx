import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { 
  CheckCircle, 
  Users, 
  Calendar,
  MessageCircle,
  ArrowRight,
  Clock,
  Target,
  Star,
  Video,
  ClipboardCheck,
  ExternalLink,
  Sparkles,
  Zap,
  Play,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MentoriasProps {
  user?: any;
}

// URL del formulario de aplicación JotForm
const JOTFORM_URL = 'https://form.jotform.com/253644919536064';

export default function Mentorias({ user }: MentoriasProps) {
  const handleApplyClick = () => {
    window.open(JOTFORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white font-sans">
      <Navigation user={user} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-orange-500/30">
              <Users className="w-4 h-4" />
              Atención personalizada 1:1
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mentorías
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-500">
                Personalizadas
              </span>
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Acelera tu crecimiento profesional con mentoría uno a uno. 
              Sesiones enfocadas en <strong className="text-white">tus objetivos específicos</strong>.
            </p>

            {/* Application Banner */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-emerald-900/40 to-cyan-900/40 rounded-2xl p-6 border border-emerald-500/30">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Sparkles className="w-6 h-6 text-emerald-400" />
                  <span className="text-xl font-bold text-emerald-400">Postulaciones Abiertas</span>
                </div>
                <p className="text-slate-300 mb-4 text-sm">
                  ¿Querés ser parte del programa de mentorías personalizadas? 
                  Completá el formulario y analizaremos tu perfil.
                </p>
                
                {/* Application Process Steps */}
                <div className="bg-slate-900/50 rounded-xl p-4 mb-6">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-emerald-400" />
                    Proceso de selección:
                  </h4>
                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
                      <span>Completás el formulario de aplicación</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
                      <span>Analizamos tu perfil y objetivos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                      <span>Te contactamos para coordinar la mentoría</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleApplyClick}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2"
                >
                  <ClipboardCheck className="w-5 h-5" />
                  Completar Formulario de Aplicación
                  <ExternalLink className="w-4 h-4" />
                </button>
                
                <p className="text-slate-500 text-xs mt-3 text-center">
                  El formulario se abre en una nueva pestaña
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Mentorship Section */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              ¿Por qué elegir mentoría personalizada?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-orange-500/30 transition-all">
                <Target className="w-10 h-10 text-orange-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Plan Personalizado</h3>
                <p className="text-slate-400 text-sm">Roadmap adaptado a tus objetivos específicos y situación actual.</p>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-orange-500/30 transition-all">
                <MessageCircle className="w-10 h-10 text-red-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Feedback Directo</h3>
                <p className="text-slate-400 text-sm">Resolución de dudas en tiempo real durante las sesiones.</p>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-orange-500/30 transition-all">
                <Clock className="w-10 h-10 text-pink-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Acelera tu Carrera</h3>
                <p className="text-slate-400 text-sm">Evita errores comunes y toma el camino más directo.</p>
              </div>
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-orange-500/30 transition-all">
                <Star className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="font-bold text-lg mb-2">Experiencia Real</h3>
                <p className="text-slate-400 text-sm">Aprende de alguien que ya recorrió el camino.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section: Bootcamp vs Subscription */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Mientras tanto... <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">¿Qué opción es para vos?</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Tenemos dos opciones principales para empezar tu camino en Data Engineering
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Bootcamp Card */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl p-8 border border-blue-500/30 relative">
                <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  EN VIVO
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Bootcamp</h3>
                    <p className="text-blue-400 text-sm">Fundamentos de Data Engineering</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-6">
                  Programa intensivo de <strong className="text-white">8 semanas en vivo</strong>. 
                  Clases grupales con interacción directa, ejercicios prácticos y proyecto final.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Clases en vivo</strong> 2x por semana</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Interacción grupal</strong> con otros estudiantes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Proyecto final</strong> para tu portfolio</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Feedback personalizado</strong> durante el bootcamp</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Acceso a grabaciones</strong> del bootcamp</span>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold">$400</span>
                    <span className="text-slate-400">USD único</span>
                  </div>
                  <p className="text-slate-500 text-sm">8 semanas • Próxima edición: Enero 2025</p>
                </div>

                <div className="bg-blue-500/10 rounded-xl p-4 mb-6 border border-blue-500/20">
                  <p className="text-blue-300 text-sm">
                    <strong>Ideal si:</strong> Querés estructura, fechas fijas, interacción en vivo y un grupo con el que avanzar.
                  </p>
                </div>

                <Link 
                  to="/bootcamps"
                  className="block w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-bold text-center hover:from-blue-600 hover:to-purple-600 transition-all"
                >
                  Ver Bootcamp <ArrowRight className="w-4 h-4 inline ml-2" />
                </Link>
              </div>

              {/* Subscription Card */}
              <div className="bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 rounded-3xl p-8 border border-emerald-500/30 relative">
                <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                  A TU RITMO
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Suscripción Premium</h3>
                    <p className="text-emerald-400 text-sm">Acceso ilimitado</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-6">
                  Acceso a <strong className="text-white">todo el contenido grabado</strong>, 
                  roadmaps, comunidad Discord y sesiones Q&A mensuales. Aprendé a tu propio ritmo.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <Play className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Grabaciones</strong> de bootcamps pasados y futuros</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <BookOpen className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Guías de roadmap</strong> nivel 1, 2 y 3</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MessageCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Discord premium</strong> con soporte prioritario</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Q&A mensuales</strong> en vivo grupales</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-slate-300"><strong className="text-white">Contenido nuevo</strong> cada mes</span>
                  </div>
                </div>

                <div className="border-t border-slate-700 pt-6 mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold">$30</span>
                    <span className="text-slate-400">USD/mes</span>
                  </div>
                  <p className="text-slate-500 text-sm">Cancela cuando quieras • Acceso inmediato</p>
                </div>

                <div className="bg-emerald-500/10 rounded-xl p-4 mb-6 border border-emerald-500/20">
                  <p className="text-emerald-300 text-sm">
                    <strong>Ideal si:</strong> Preferís aprender a tu ritmo, ya tenés experiencia o querés acceso continuo al contenido.
                  </p>
                </div>

                <Link 
                  to="/suscripcion"
                  className="block w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold text-center hover:from-emerald-600 hover:to-cyan-600 transition-all"
                >
                  Ver Suscripción <ArrowRight className="w-4 h-4 inline ml-2" />
                </Link>
              </div>
            </div>

            {/* Quick Comparison Table */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 overflow-x-auto">
              <h3 className="text-xl font-bold mb-6 text-center">Comparación rápida</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium"></th>
                    <th className="text-center py-3 px-4 text-blue-400 font-bold">Bootcamp</th>
                    <th className="text-center py-3 px-4 text-emerald-400 font-bold">Suscripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Formato</td>
                    <td className="py-3 px-4 text-center">En vivo, fechas fijas</td>
                    <td className="py-3 px-4 text-center">Grabado, a tu ritmo</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Duración</td>
                    <td className="py-3 px-4 text-center">8 semanas</td>
                    <td className="py-3 px-4 text-center">Mientras pagues</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Interacción en vivo</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                    <td className="py-3 px-4 text-center text-slate-500">Solo Q&A mensuales</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Proyecto con feedback</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                    <td className="py-3 px-4 text-center text-slate-500">—</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Acceso a grabaciones</td>
                    <td className="py-3 px-4 text-center">Del bootcamp que cursás</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /> Todos</td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Roadmaps y guías</td>
                    <td className="py-3 px-4 text-center text-slate-500">—</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-slate-300">Discord premium</td>
                    <td className="py-3 px-4 text-center text-slate-500">—</td>
                    <td className="py-3 px-4 text-center"><CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-slate-300 font-bold">Precio</td>
                    <td className="py-3 px-4 text-center font-bold text-blue-400">$400 único</td>
                    <td className="py-3 px-4 text-center font-bold text-emerald-400">$30/mes</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* FAQ */}
            <div className="mt-12 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold mb-6 text-center">Preguntas frecuentes</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h4 className="font-bold mb-2">¿Puedo hacer el bootcamp y después la suscripción?</h4>
                  <p className="text-slate-400 text-sm">Sí, muchos hacen eso. El bootcamp te da la estructura inicial y la suscripción te mantiene actualizado con contenido nuevo y acceso a la comunidad.</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h4 className="font-bold mb-2">¿La suscripción incluye el bootcamp en vivo?</h4>
                  <p className="text-slate-400 text-sm">No, la suscripción incluye las <strong>grabaciones</strong> de los bootcamps, no la participación en vivo. Si querés la experiencia en vivo con feedback, el bootcamp es lo tuyo.</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h4 className="font-bold mb-2">¿Cuál me conviene si soy principiante total?</h4>
                  <p className="text-slate-400 text-sm">Si sos muy principiante y necesitás estructura, el <strong>bootcamp en vivo</strong> es mejor porque tenés fechas, grupo y feedback directo. Si ya sabés algo y querés ir a tu ritmo, la suscripción funciona bien.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Other Alternatives */}
      <section className="py-16 px-6 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-8">¿Sos una empresa?</h2>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-bold mb-3">📚 Capacitaciones Empresariales</h3>
              <p className="text-slate-400 mb-6">
                Capacita a tu equipo en Data Engineering, Power BI, SQL y más. 
                Programas personalizados para empresas.
              </p>
              <Link 
                to="/capacitaciones-empresariales"
                className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
              >
                Ver capacitaciones empresariales <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Ian Saura</h3>
              <p className="text-slate-400 text-sm">Data Engineer y Educador</p>
            </div>
            <div className="flex gap-6 text-slate-400 text-sm">
              <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
              <Link to="/bootcamps" className="hover:text-white transition-colors">Bootcamps</Link>
              <Link to="/suscripcion" className="hover:text-white transition-colors">Suscripción</Link>
              <a href="mailto:info@iansaura.com" className="hover:text-white transition-colors">Contacto</a>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
            <p>© 2024 Ian Saura. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
