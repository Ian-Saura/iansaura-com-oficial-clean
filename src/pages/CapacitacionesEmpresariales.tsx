import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import { 
  Briefcase, 
  Users, 
  Award, 
  TrendingUp, 
  CheckCircle,
  BarChart3,
  Database,
  Brain,
  Zap,
  Clock,
  Target,
  ArrowRight,
  Building2,
  LineChart,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

interface User {
  id: string;
  email: string;
  subscribed: boolean;
}

interface CapacitacionesEmpresarialesProps {
  user: User | null;
}

export default function CapacitacionesEmpresariales({ user }: CapacitacionesEmpresarialesProps) {
  const [formData, setFormData] = useState({
    empresa: '',
    nombre: '',
    email: '',
    telefono: '',
    capacitacion: '',
    participantes: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const capacitaciones = [
    {
      icon: <BarChart3 className="w-12 h-12 text-blue-600" />,
      title: "Power BI - De Excel a Business Intelligence",
      description: "Transforma tu equipo de Excel a visualizaciones profesionales con Power BI",
      highlights: [
        "Para usuarios de Excel sin experiencia técnica",
        "Dashboards interactivos desde cero",
        "Conexión a múltiples fuentes de datos",
        "DAX y modelado de datos simplificado"
      ],
      duration: "3-5 días intensivos",
      audience: "Analistas, Controllers, Gerencias",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Database className="w-12 h-12 text-purple-600" />,
      title: "Data Engineering para Equipos",
      description: "Construye pipelines de datos escalables y automatizados",
      highlights: [
        "Arquitecturas modernas de datos",
        "Automatización de ETL con Python",
        "Data Warehousing y modelado dimensional",
        "Implementación de proyectos reales"
      ],
      duration: "5-10 días",
      audience: "Equipos técnicos, IT, Analistas Senior",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Brain className="w-12 h-12 text-indigo-600" />,
      title: "IA Aplicada a tu Negocio",
      description: "Implementa Inteligencia Artificial sin necesidad de ser científico de datos",
      highlights: [
        "ChatGPT y LLMs para productividad empresarial",
        "Automatización de procesos con IA",
        "Análisis predictivo para toma de decisiones",
        "Casos de uso específicos para tu industria"
      ],
      duration: "2-4 días",
      audience: "Todo el equipo, Gerencias, Operaciones",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <LineChart className="w-12 h-12 text-green-600" />,
      title: "Data Analytics & Storytelling con Datos",
      description: "Convierte datos en decisiones estratégicas y presentaciones impactantes",
      highlights: [
        "SQL para análisis de negocio",
        "Visualización de datos efectiva",
        "Storytelling con datos para presentaciones",
        "Métricas e indicadores clave (KPIs)"
      ],
      duration: "3-6 días",
      audience: "Analistas, Marketing, Ventas, Producto",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Zap className="w-12 h-12 text-orange-600" />,
      title: "Python para Automatización Empresarial",
      description: "Automatiza tareas repetitivas y aumenta la productividad de tu equipo",
      highlights: [
        "Python desde cero para no programadores",
        "Automatización de Excel, reportes y emails",
        "Web scraping y extracción de datos",
        "Scripts prácticos para el día a día"
      ],
      duration: "4-6 días",
      audience: "Operaciones, Administración, IT",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <Sparkles className="w-12 h-12 text-yellow-600" />,
      title: "Capacitación Personalizada",
      description: "Diseñamos la capacitación exacta que tu empresa necesita",
      highlights: [
        "Diagnóstico de necesidades técnicas",
        "Contenido adaptado a tu industria",
        "Combinación de tecnologías según objetivos",
        "Proyectos basados en casos reales de tu empresa"
      ],
      duration: "Flexible",
      audience: "Adaptado a tu equipo",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const beneficios = [
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,
      title: "Teoría + Práctica",
      description: "Clases presenciales u online con proyectos reales desde el día 1"
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Seguimiento Personalizado",
      description: "Acompañamiento post-capacitación y mentoría para dudas"
    },
    {
      icon: <Building2 className="w-8 h-8 text-indigo-600" />,
      title: "Adaptado a tu Empresa",
      description: "Usamos casos reales de tu negocio, no ejemplos genéricos"
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Certificación",
      description: "Certificado de finalización para cada participante"
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "Horarios Flexibles",
      description: "Intensivos de 1 semana o distribuidos en varias semanas"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-600" />,
      title: "ROI Medible",
      description: "Enfoque en resultados concretos y mejoras inmediatas"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:3001/api/waitlist.php'
        : '/api/waitlist.php';

      const submissionData = {
        name: `${formData.nombre} (${formData.empresa})`,
        email: formData.email,
        preferredPlan: `Capacitación Empresarial: ${formData.capacitacion}`,
        reason: `Empresa: ${formData.empresa}\nTeléfono: ${formData.telefono}\nParticipantes: ${formData.participantes}\nMensaje: ${formData.mensaje}`,
        contactMethod: 'WhatsApp',
        contactLink: formData.telefono
      };

      console.log('📤 Enviando solicitud de capacitación empresarial:', submissionData);

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
        setFormData({
          empresa: '',
          nombre: '',
          email: '',
          telefono: '',
          capacitacion: '',
          participantes: '',
          mensaje: ''
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(result.error || 'Error al enviar solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Capacitaciones Empresariales en Data, BI y IA | Ian Saura</title>
        <meta name="description" content="Capacitaciones personalizadas para empresas en Power BI, Data Engineering, Inteligencia Artificial, Python y más. Teoría + Práctica + Seguimiento personalizado." />
        <meta name="keywords" content="capacitación empresarial, Power BI, Data Engineering, IA empresarial, Python empresarial, Business Intelligence" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navigation user={user} />

        {/* Hero Section */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium mb-6">
                <Briefcase className="w-5 h-5" />
                Capacitaciones Empresariales
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transforma tu equipo con{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  capacitaciones de alto impacto
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Teoría + Práctica + Seguimiento personalizado en Power BI, Data Engineering, IA y más.
                <br />
                Capacitaciones adaptadas a las necesidades reales de tu empresa.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contacto" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Solicitar Propuesta
                </a>
                <a href="#capacitaciones" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300">
                  Ver Capacitaciones
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                ¿Por qué capacitar con nosotros?
              </h2>
              <p className="text-xl text-gray-600">
                Metodología probada con resultados medibles
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beneficios.map((beneficio, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4">{beneficio.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{beneficio.title}</h3>
                  <p className="text-gray-600">{beneficio.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capacitaciones */}
        <section id="capacitaciones" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Capacitaciones más solicitadas
              </h2>
              <p className="text-xl text-gray-600">
                Las skills más demandadas y mejor pagadas del mercado
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capacitaciones.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`bg-gradient-to-r ${cap.gradient} p-6 text-white`}>
                    <div className="mb-4">{cap.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{cap.title}</h3>
                    <p className="text-white/90">{cap.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-3 mb-6">
                      {cap.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{cap.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{cap.audience}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Solicita una propuesta personalizada
              </h2>
              <p className="text-xl text-gray-600">
                Cuéntanos qué necesita tu equipo y diseñamos la capacitación ideal
              </p>
            </motion.div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-12 text-center shadow-xl"
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Solicitud enviada!</h3>
                <p className="text-gray-600 text-lg">
                  Te contactaremos en las próximas 24 horas con una propuesta personalizada.
                </p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-8 shadow-xl"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Empresa <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Nombre de tu empresa"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tu nombre <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      placeholder="Tu nombre completo"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@empresa.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      placeholder="+54 11 1234-5678"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacitación de interés <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.capacitacion}
                      onChange={(e) => setFormData({ ...formData, capacitacion: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Power BI">Power BI - De Excel a BI</option>
                      <option value="Data Engineering">Data Engineering</option>
                      <option value="IA Empresarial">IA Aplicada a Negocios</option>
                      <option value="Data Analytics">Data Analytics & Storytelling</option>
                      <option value="Python">Python para Automatización</option>
                      <option value="Personalizada">Capacitación Personalizada</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad de participantes
                    </label>
                    <Input
                      type="text"
                      value={formData.participantes}
                      onChange={(e) => setFormData({ ...formData, participantes: e.target.value })}
                      placeholder="Ej: 10-15 personas"
                      className="w-full"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje / Necesidades específicas
                    </label>
                    <Textarea
                      rows={4}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      placeholder="Cuéntanos qué necesita tu equipo, objetivos de la capacitación, fechas tentativas, etc."
                      className="w-full"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                <div className="mt-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        Solicitar Propuesta <ArrowRight className="inline ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-gray-500 text-center mt-4">
                  Respuesta en menos de 24 horas • Propuesta sin compromiso
                </p>
              </motion.form>
            )}
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para llevar tu equipo al siguiente nivel?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Únete a las +50 empresas que ya capacitaron con nosotros
            </p>
            <a
              href="#contacto"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Comienza Ahora
            </a>
          </div>
        </section>
      </div>
    </>
  );
}





