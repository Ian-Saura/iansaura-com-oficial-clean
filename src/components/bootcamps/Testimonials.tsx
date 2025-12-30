import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, TrendingUp, Award, Users } from 'lucide-react';

interface TestimonialData {
  name: string;
  role?: string;
  cohort: string;
  rating: number;
  text: string;
  achievement?: string;
  image?: string;
}

interface TestimonialsProps {
  onOpenWaitlist?: (plan: string) => void;
  bootcampTitle?: string;
}

export default function Testimonials({ onOpenWaitlist, bootcampTitle }: TestimonialsProps) {
  const featuredTestimonial: TestimonialData = {
    name: "Victor Serey",
    cohort: "Cohorte Sep 2025",
    rating: 10,
    text: "Mi experiencia hasta ahora ha sido muy buena, siento que estoy aprendiendo realmente y los profesores se aseguran que así sea. Me sorprendió la dinámica del bootcamp, con un enfoque práctico sin dejar de lado la teoría.",
    achievement: "Diseñó un Pipeline desde 0 en 3 semanas"
  };

  const additionalTestimonials: TestimonialData[] = [
    {
      name: "Marcelo López",
      cohort: "Cohorte 1 (2025)",
      rating: 10,
      text: "Me resultó muy interesante porque vimos y entendimos no solo cómo se construye un pipeline, si no para qué sirve y cómo se debe hacer para que sea entendido por cualquiera.",
      achievement: "Aprendió sobre documentación y validación de pipelines"
    }
  ];

  const stats = [
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      value: "10/10",
      label: "Calificación promedio",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      value: "Pipeline desde 0",
      label: "Proyecto real en 3 semanas",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Award className="w-8 h-8 text-indigo-600" />,
      value: "100%",
      label: "Recomendado por alumnos",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(Math.floor(rating))].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lo que dicen nuestros{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              alumnos
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Testimonios reales de profesionales que transformaron su carrera
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>

            <div className="relative z-10">
              <Quote className="w-12 h-12 text-white/30 mb-6" />
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-white text-xl md:text-2xl leading-relaxed mb-6 font-medium">
                    "{featuredTestimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl">{featuredTestimonial.name}</h4>
                      <p className="text-purple-100">{featuredTestimonial.cohort}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    {renderStars(featuredTestimonial.rating)}
                    <span className="text-white font-bold text-lg ml-2">
                      {featuredTestimonial.rating}/10
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-6 h-6 text-yellow-300" />
                      <span className="text-white/80 font-medium">Logro destacado</span>
                    </div>
                    <p className="text-white text-xl font-bold">
                      {featuredTestimonial.achievement}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Testimonials Grid */}
        {additionalTestimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {additionalTestimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    {testimonial.role && (
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {renderStars(testimonial.rating)}
                  <span className="text-gray-600 font-semibold text-sm ml-1">
                    {testimonial.rating}/10
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-4">
                  "{testimonial.text}"
                </p>

                {testimonial.achievement && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-100">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600" />
                      <p className="text-sm font-semibold text-purple-900">
                        {testimonial.achievement}
                      </p>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-3">{testimonial.cohort}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Listo para transformar tu carrera?
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a los profesionales que ya están construyendo su futuro como Data Engineers
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-xl mx-auto">
              <a
                href="https://onei.la/ihw"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🚀 Reservar mi lugar ahora
              </a>
              <button
                onClick={() => onOpenWaitlist && onOpenWaitlist(bootcampTitle || 'Bootcamp')}
                className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all duration-300"
              >
                💬 Pagar en 2 cuotas
              </button>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Solo quedan 10 lugares • Inicio: 13 de Enero 2025
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

