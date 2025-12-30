import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bootcamp } from '../../types/bootcamp';
import WeekCard from './WeekCard';
import Testimonials from './Testimonials';
import { 
  Clock, 
  Users, 
  Target, 
  Briefcase, 
  CheckCircle,
  ExternalLink,
  Layers,
  BookOpen,
  CreditCard,
  CalendarDays
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface BootcampDetailProps {
  bootcamp: Bootcamp;
  onOpenWaitlist?: (plan: string) => void;
}

export default function BootcampDetail({ bootcamp, onOpenWaitlist }: BootcampDetailProps) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: `Hola Ian, quiero asegurar mi lugar en ${bootcamp.title} pero necesito ayuda.`
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const handleCtaAction = (action: { href: string; external?: boolean }) => {
    if (!action?.href) return;
    if (action.external) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = action.href;
    }
  };

  const handlePrimaryAction = () => {
    if (bootcamp.cta.primary.href && bootcamp.cta.primary.href !== '/waitlist') {
      handleCtaAction(bootcamp.cta.primary);
      return;
    }

    if (onOpenWaitlist) {
      onOpenWaitlist(bootcamp.title);
    }
  };

  const renderPriceText = (priceText: string) => {
    const match = priceText.match(/~~(.*?)~~\s*(.*)/);
    if (match) {
      const [, previousPrice, currentPrice] = match;
      return (
        <>
          <span className="line-through text-gray-400 text-2xl font-semibold mr-3">
            {previousPrice.trim()}
          </span>
          <span className="text-3xl font-bold text-gray-900">
            {currentPrice.trim()}
          </span>
        </>
      );
    }

    return (
      <span className="text-3xl font-bold text-gray-900">
        {priceText}
      </span>
    );
  };

  const toggleWeek = (weekNum: number) => {
    setExpandedWeek(expandedWeek === weekNum ? null : weekNum);
  };

  const cohortBadgeClass =
    bootcamp.cohort.status === 'a_definir'
      ? 'bg-orange-500'
      : bootcamp.cohort.status === 'proximamente'
        ? 'bg-purple-600'
        : 'bg-green-500';

  const isPreinscripcion = bootcamp.cohort.status === 'preinscripcion_abierta';
  const isProximamente = bootcamp.cohort.status === 'proximamente';
  const scheduleLabel = bootcamp.schedule?.[0]?.startDate;

  const primaryButtonLabel = isProximamente
    ? 'Acceder a la preventa'
    : isPreinscripcion
      ? 'Reservar mi lugar ahora'
      : bootcamp.cta.primary.label;

  const primaryMicrocopy = isProximamente
    ? 'Pre-venta exclusiva • Congela tu precio hoy'
    : isPreinscripcion && scheduleLabel
      ? `Inicio ${scheduleLabel} • 15 lugares disponibles`
      : 'Reserva tu lugar y recibe soporte personalizado';

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    setContactError(null);

    try {
      const apiUrl = window.location.hostname === 'localhost'
        ? 'http://localhost:3001/api/waitlist.php'
        : '/api/waitlist.php';

      // Format data to match waitlist structure
      const submissionData = {
        name: contactData.name,
        email: contactData.email,
        preferredPlan: `${bootcamp.title} - Ayuda con inscripción`,
        reason: contactData.message,
        contactMethod: '',
        contactLink: ''
      };

      console.log('📤 Enviando solicitud de ayuda a:', apiUrl);
      console.log('📝 Datos:', submissionData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📥 Response data:', result);

      if (result.success) {
        setContactSubmitted(true);
        setContactData({
          name: '',
          email: '',
          message: `Hola Ian, quiero asegurar mi lugar en ${bootcamp.title} pero necesito ayuda.`
        });
        setTimeout(() => setContactSubmitted(false), 4000);
        console.log('✅ Solicitud de ayuda enviada exitosamente');
      } else {
        console.error('❌ Error del servidor:', result.error);
        throw new Error(result.error || 'No se pudo enviar la solicitud');
      }
    } catch (error) {
      console.error('❌ Error enviando solicitud:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setContactError(errorMessage);
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {bootcamp.title}
            </h2>
            {bootcamp.subtitle && (
              <p className="text-lg text-gray-700 mb-6">{bootcamp.subtitle}</p>
            )}
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <Clock className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">{bootcamp.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-gray-700">{bootcamp.capacity} cupos</span>
              </div>
              <Badge className={`${cohortBadgeClass} text-white`}>
                {bootcamp.cohort.label}
              </Badge>
            </div>

            {bootcamp.instructor_info?.collaborator && (
              <div className="bg-white rounded-xl p-4 mb-6 border border-blue-100">
                <p className="text-sm text-gray-600 mb-2">En colaboración con:</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-900">{bootcamp.instructor_info.collaborator.name}</p>
                    <p className="text-sm text-gray-600">{bootcamp.instructor_info.collaborator.title}</p>
                    <p className="text-xs text-blue-600 font-medium mt-1">
                      {bootcamp.instructor_info.collaborator.credentials}
                    </p>
                  </div>
                  <a 
                    href={bootcamp.instructor_info.collaborator.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handlePrimaryAction}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {primaryButtonLabel}
              </Button>
              <Button
                onClick={() => handleCtaAction(bootcamp.cta.secondary)}
                className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300"
              >
                {bootcamp.cta.secondary.label}
              </Button>
            </div>

            <p className="text-sm text-blue-600 mt-4 font-medium">
              {primaryMicrocopy}
            </p>

          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-600" />
                <h3 className="font-bold text-gray-900 text-lg">¿Para quién es este bootcamp?</h3>
              </div>
              <ul className="space-y-2">
                {bootcamp.audience.slice(0, 3).map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fallback Contact Capture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border border-blue-100 rounded-3xl p-6 md:p-8 shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 space-y-3">
            <h3 className="text-2xl font-bold text-gray-900">
              ¿Necesitas ayuda con tu inscripción?
            </h3>
            <p className="text-gray-600 text-sm">
              Si tu pago no se completa o querés coordinar una llamada, dejame tus datos y te respondo en menos de 24 horas.
            </p>
            <p className="text-xs text-gray-400">
              Respuesta directa de Ian • Sin spam • Soporte personalizado
            </p>
          </div>

          <div className="md:w-1/2">
            {contactSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-green-800 mb-2">¡Mensaje enviado!</h4>
                <p className="text-sm text-green-700">
                  Te contactaré pronto para ayudarte con tu reserva.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                  <Input
                    type="text"
                    required
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="Tu nombre"
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="tu@email.com"
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje</label>
                  <Textarea
                    required
                    rows={3}
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="bg-gray-50"
                  />
                </div>
                {contactError && (
                  <p className="text-sm text-red-500">{contactError}</p>
                )}
                <Button
                  type="submit"
                  disabled={isContactSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isContactSubmitting ? 'Enviando…' : 'Solicitar ayuda con mi reserva'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      {bootcamp.skills?.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Layers className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Skills que certificarás
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {bootcamp.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex items-start gap-3 bg-gray-50 rounded-lg p-4"
              >
                <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* What You'll Learn */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            ¿Qué vas a aprender?
          </h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {bootcamp.outcomes.map((outcome, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-3 bg-blue-50 rounded-lg p-4"
            >
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-700">{outcome}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Project */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
            {bootcamp.projectTitle ?? 'Tu Proyecto Final'}
          </h3>
        </div>
        
        <p className="text-gray-700 mb-6 text-lg">
          {bootcamp.projectSummary ?? 'Al finalizar el bootcamp, tendrás un proyecto completo y profesional que podrás mostrar en entrevistas:'}
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {bootcamp.project.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-3 bg-white rounded-lg p-4 shadow-sm"
            >
              <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
              </div>
              <p className="text-gray-700">{item}</p>
            </motion.div>
          ))}
        </div>

        {bootcamp.projectNote && (
          <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl p-6">
            <p className="text-lg font-semibold leading-relaxed">
              {bootcamp.projectNote}
            </p>
          </div>
        )}
      </motion.div>

      {/* Methodology */}
      {bootcamp.methodology && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Metodología de Aprendizaje
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Cada semana incluye:</h4>
              <ul className="space-y-3">
                {bootcamp.methodology.weeklyFlow.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recursos incluidos:</h4>
              <ul className="space-y-3">
                {bootcamp.methodology.resources.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pricing */}
      {bootcamp.pricing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Inversión y beneficios
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-start gap-3">
              <span className="text-sm uppercase tracking-wide text-gray-500">Precio</span>
              <div className="flex flex-wrap items-baseline gap-2">
                {renderPriceText(bootcamp.pricing.price)}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Opciones de pago</h4>
              <ul className="space-y-2">
                {bootcamp.pricing.paymentOptions.map((option, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Incluye</h4>
              <ul className="space-y-2">
                {bootcamp.pricing.includes.map((include, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <span>{include}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Schedule */}
      {bootcamp.schedule?.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              Próximas cohortes
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {bootcamp.schedule.map((item, index) => (
              <div key={index} className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-gray-50">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h4>
                <p className="text-gray-700 font-medium mb-2">Inicio: {item.startDate}</p>
                <p className="text-gray-600 mb-2">Clases: {item.classes}</p>
                {item.capacity && (
                  <p className="text-sm text-purple-600 font-semibold">{item.capacity}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* Syllabus */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          Programa Semana por Semana
        </h3>
        <div className="space-y-4">
          {bootcamp.syllabus.map((week) => (
            <WeekCard
              key={week.week}
              week={week}
              isExpanded={expandedWeek === week.week}
              onToggle={() => toggleWeek(week.week)}
            />
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <Testimonials 
        onOpenWaitlist={onOpenWaitlist}
        bootcampTitle={bootcamp.title}
      />

      {/* Final CTA */}
      {bootcamp.finalCta && bootcamp.finalCta.actions?.length ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            {bootcamp.finalCta.title}
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {bootcamp.finalCta.actions.map((action, index) => (
              <Button
                key={index}
                onClick={() => handleCtaAction(action)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${index === 0 ? 'bg-white text-blue-700 hover:bg-blue-50' : 'bg-white/10 text-white border border-white/40 hover:bg-white/20'}`}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </motion.div>
      ) : null}

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-8 md:p-12 shadow-lg"
      >
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Preguntas Frecuentes
        </h3>
        
        <div className="space-y-6 max-w-3xl mx-auto">
          {bootcamp.faq.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <h4 className="font-bold text-gray-900 text-lg mb-3">
                {item.question}
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {item.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}


