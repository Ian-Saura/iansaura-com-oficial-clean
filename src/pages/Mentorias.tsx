import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { 
  CheckCircle, 
  Users, 
  Zap, 
  Play, 
  Calendar,
  MessageCircle,
  ArrowRight,
  Clock,
  Target,
  Star,
  BookOpen,
  Video
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MentoriasProps {
  user?: any;
}

export default function Mentorias({ user }: MentoriasProps) {
  const [waitlistData, setWaitlistData] = useState({
    name: '',
    email: '',
    preferredPlan: 'Mentorías Premium 1:1',
    reason: '',
    contactMethod: '',
    contactLink: ''
  });
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsWaitlistSubmitting(true);

    try {
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api/waitlist.php' 
        : '/api/waitlist.php';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(waitlistData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setWaitlistSubmitted(true);
        setWaitlistData({ 
          name: '', 
          email: '', 
          preferredPlan: 'Mentorías Premium 1:1', 
          reason: '', 
          contactMethod: '', 
          contactLink: '' 
        });
        setTimeout(() => {
          setShowWaitlistModal(false);
          setWaitlistSubmitted(false);
        }, 3000);
      } else {
        alert('Error enviando solicitud: ' + (result.error || 'Error desconocido'));
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      alert('Error enviando solicitud. Por favor intenta nuevamente. Detalles: ' + errorMessage);
    }

    setIsWaitlistSubmitting(false);
  };

  const openWaitlistModal = () => {
    setShowWaitlistModal(true);
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

            {/* Sold Out Banner */}
            <div className="max-w-xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-2xl p-6 border border-red-500/30">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-2xl">🔥</span>
                  <span className="text-xl font-bold text-red-400">Cupos Agotados</span>
                </div>
                <p className="text-slate-300 mb-6 text-sm">
                  Actualmente todas las plazas de mentoría están ocupadas. 
                  Únete a la lista de espera para ser notificado cuando haya disponibilidad.
                </p>
                
                {user ? (
                  <button
                    onClick={openWaitlistModal}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30"
                  >
                    📝 Unirme a la Lista de Espera
                  </button>
                ) : (
                  <div className="space-y-3">
                    <p className="text-orange-400 text-sm font-medium">
                      🔐 Necesitas una cuenta para unirte a la lista de espera
                    </p>
                    <Link
                      to="/auth"
                      className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 px-8 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
                    >
                      Crear cuenta / Iniciar sesión
                    </Link>
                  </div>
                )}
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

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto border border-slate-700"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">
                Lista de Espera - Mentorías
              </h3>
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-400 font-bold">🔥 TEMPORALMENTE AGOTADO</span>
              </div>
              <p className="text-red-300 text-sm">
                Las mentorías están agotadas por alta demanda. Únete a la lista de espera y te contactaré cuando abra un nuevo cupo.
              </p>
            </div>

            {waitlistSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">¡Te has unido a la lista de espera!</h4>
                <p className="text-slate-400">
                  Te contactaré cuando se abra un cupo para mentorías personalizadas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Nombre completo <span className="text-red-400">*</span></label>
                  <Input
                    type="text"
                    required
                    value={waitlistData.name}
                    onChange={(e) => setWaitlistData({...waitlistData, name: e.target.value})}
                    placeholder="Tu nombre completo"
                    className="w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Email <span className="text-red-400">*</span></label>
                  <Input
                    type="email"
                    required
                    value={waitlistData.email}
                    onChange={(e) => setWaitlistData({...waitlistData, email: e.target.value})}
                    placeholder="tu@email.com"
                    className="w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">Método de contacto preferido</label>
                  <select
                    value={waitlistData.contactMethod}
                    onChange={(e) => setWaitlistData({...waitlistData, contactMethod: e.target.value})}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white"
                  >
                    <option value="">Selecciona método de contacto</option>
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="LinkedIn">LinkedIn</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    ¿Por qué te interesa la mentoría? <span className="text-red-400">*</span>
                  </label>
                  <Textarea
                    required
                    rows={4}
                    value={waitlistData.reason}
                    onChange={(e) => setWaitlistData({...waitlistData, reason: e.target.value})}
                    placeholder="Contame tu situación actual y qué querés lograr..."
                    className="w-full bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isWaitlistSubmitting}
                  className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                >
                  {isWaitlistSubmitting ? 'Enviando...' : '📝 Unirme a la Lista de Espera'}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
