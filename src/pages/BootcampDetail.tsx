import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BootcampDetail from '../components/bootcamps/BootcampDetail';
import { Bootcamp } from '../types/bootcamp';
import bootcampsData from '../content/bootcamps.json';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../i18n/LanguageContext';

interface BootcampDetailPageProps {
  user?: any;
}

export default function BootcampDetailPage({ user }: BootcampDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Waitlist form state
  const [waitlistData, setWaitlistData] = useState({
    name: '',
    email: '',
    preferredPlan: '',
    reason: '',
    contactMethod: '',
    contactLink: ''
  });
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  const bootcamps = bootcampsData as Bootcamp[];
  const bootcamp = bootcamps.find(b => b.slug === slug);

  if (!bootcamp) {
    return <Navigate to="/bootcamps" replace />;
  }

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
        setWaitlistData({ name: '', email: '', preferredPlan: '', reason: '', contactMethod: '', contactLink: '' });
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

  const openWaitlistModal = (plan: string) => {
    setWaitlistData({ ...waitlistData, preferredPlan: plan });
    setShowWaitlistModal(true);
  };

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": bootcamp.title,
    "description": `${bootcamp.title} - Duración: ${bootcamp.duration}. ${bootcamp.audience[0]}`,
    "provider": {
      "@type": "Organization",
      "name": "Ian Saura",
      "url": "https://iansaura.com"
    },
    "courseMode": "online",
    "educationalLevel": "intermediate",
    "teaches": bootcamp.outcomes,
    "timeRequired": bootcamp.duration,
    "numberOfCredits": bootcamp.capacity,
    "inLanguage": "es",
    "availableLanguage": "es",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/PreOrder",
      "category": "Data Engineering"
    }
  };

  return (
    <>
      <Helmet>
        <title>{bootcamp.title} | Ian Saura</title>
        <meta name="description" content={`${bootcamp.title} - Duración ${bootcamp.duration}. ${bootcamp.audience[0]}`} />
        <meta property="og:title" content={bootcamp.title} />
        <meta property="og:description" content={`${bootcamp.title} - Duración ${bootcamp.duration}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://iansaura.com/bootcamps/${bootcamp.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={bootcamp.title} />
        <meta name="twitter:description" content={`${bootcamp.title} - Duración ${bootcamp.duration}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-white font-sans">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
          <div className="max-w-6xl mx-auto px-6 py-3">
            <div className="flex justify-between items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-gray-900"
              >
                <Link to="/">Ian Saura</Link>
              </motion.div>
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Inicio
                </Link>
                <Link
                  to="/bootcamps"
                  className="text-blue-600 font-medium"
                >
                  Bootcamps
                </Link>
                <Link
                  to="/mentorias"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Mentorías
                </Link>
                {user ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">¡Hola, {user.name}!</span>
                    <button
                      onClick={() => {
                        localStorage.removeItem('user');
                        window.location.reload();
                      }}
                      className="text-red-600 hover:text-red-700 transition-colors text-sm"
                    >
                      Salir
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    🔐 Iniciar Sesión
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden mt-4 pb-4 border-t border-gray-100"
              >
                <div className="flex flex-col space-y-3 pt-4">
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                  >
                    Inicio
                  </Link>
                  <Link
                    to="/bootcamps"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-blue-600 font-medium text-left"
                  >
                    Bootcamps
                  </Link>
                  <Link
                    to="/mentorias"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                  >
                    Mentorías
                  </Link>
                  {user ? (
                    <div className="border-t border-gray-200 pt-3 mt-3 space-y-2">
                      <div className="text-sm text-gray-600 mb-2">¡Hola, {user.name}!</div>
                      <button
                        onClick={() => {
                          localStorage.removeItem('user');
                          window.location.reload();
                        }}
                        className="text-red-600 hover:text-red-700 transition-colors text-sm text-left"
                      >
                        Salir
                      </button>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <Link
                        to="/auth"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-3 rounded-full text-sm font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        🔐 Iniciar Sesión
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </nav>

        {/* Breadcrumb */}
        <div className="pt-24 pb-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
              <span className="mx-2">/</span>
              <Link to="/bootcamps" className="hover:text-blue-600 transition-colors">Bootcamps</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{bootcamp.title}</span>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="pb-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {bootcamp.title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BootcampDetail 
                bootcamp={bootcamp}
                onOpenWaitlist={openWaitlistModal}
              />
            </motion.div>
          </div>
        </main>

        {/* Waitlist Modal */}
        {showWaitlistModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Lista de Espera</h3>
                <button
                  onClick={() => setShowWaitlistModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600 font-bold">📝 LISTA DE ESPERA</span>
                  <Badge className="bg-blue-600 text-white text-xs">PRÓXIMAMENTE</Badge>
                </div>
                <p className="text-blue-700 text-sm">
                  Únete a la lista de espera para ser el primero en enterarte cuando abramos el próximo cupo.
                </p>
              </div>

              {waitlistSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h4 className="text-xl font-bold mb-2">¡Te has unido a la lista de espera!</h4>
                  <p className="text-gray-600">
                    Te contactaré cuando se abra un cupo para el {waitlistData.preferredPlan}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre completo <span className="text-red-500">*</span></label>
                    <Input
                      type="text"
                      required
                      value={waitlistData.name}
                      onChange={(e) => setWaitlistData({...waitlistData, name: e.target.value})}
                      placeholder="Tu nombre completo"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email <span className="text-red-500">*</span></label>
                    <Input
                      type="email"
                      required
                      value={waitlistData.email}
                      onChange={(e) => setWaitlistData({...waitlistData, email: e.target.value})}
                      placeholder="tu@email.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Bootcamp <span className="text-red-500">*</span></label>
                    <Input
                      type="text"
                      required
                      value={bootcamp.title}
                      readOnly
                      className="w-full bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('bootcamp.whySelected')} <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      required
                      rows={4}
                      value={waitlistData.reason}
                      onChange={(e) => setWaitlistData({...waitlistData, reason: e.target.value})}
                      placeholder="Ejemplo: 'Soy desarrollador con 3 años de experiencia buscando transicionar a Data Engineering. Mi objetivo es duplicar mi salario actual y trabajar de forma remota. Tengo disponibilidad inmediata y estoy 100% comprometido con el proceso.'"
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isWaitlistSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-full font-medium"
                  >
                    {isWaitlistSubmitting ? t('common.sending') : '📝 ' + t('bootcamp.joinWaitlist')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
