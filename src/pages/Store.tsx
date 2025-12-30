import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { CheckCircle, ArrowLeft, ShoppingCart, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface StoreProps {
  user?: {
    id: string;
    email: string;
    name: string;
    subscribed?: boolean;
  } | null;
}

export default function Store({ user }: StoreProps) {
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

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsWaitlistSubmitting(true);
    
    try {
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3001/api/waitlist.php'
        : '/api/waitlist.php';
      
      console.log('📝 Datos:', waitlistData);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(waitlistData),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        console.log('✅ Waitlist submission successful');
        setWaitlistSubmitted(true);
        setWaitlistData({ name: '', email: '', preferredPlan: '', reason: '', contactMethod: '', contactLink: '' });
        
        // Auto-close modal after 3 seconds
        setTimeout(() => {
          setShowWaitlistModal(false);
          setWaitlistSubmitted(false);
        }, 3000);
      } else {
        console.error('❌ Waitlist submission failed:', result.error);
        alert('Error al enviar la solicitud. Por favor intenta nuevamente.');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      alert('Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setIsWaitlistSubmitting(false);
    }
  };

  const openWaitlistModal = (plan: string) => {
    if (!user) {
      // Redirect to auth if user is not logged in
      window.location.href = '/auth';
      return;
    }
    
    setWaitlistData({ 
      ...waitlistData, 
      preferredPlan: plan,
      name: user.name,
      email: user.email
    });
    setShowWaitlistModal(true);
  };

  return (
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
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-5 h-5 inline mr-2" />
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Store Header */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <ShoppingCart className="w-16 h-16 inline-block mr-4 text-blue-600" />
              Tienda Digital
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Recursos educativos premium para acelerar tu carrera como <strong>Data Engineer</strong>
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Productos Disponibles
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Guías prácticas y recursos para dominar Python, SQL y Data Engineering
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6 max-w-2xl mx-auto">
                <p className="text-green-800 font-medium">
                  🚀 <strong>¡Disponible ahora!</strong> • Descarga inmediata • Oferta especial limitada
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Python Book - Available */}
              <Card className="bg-white shadow-2xl border-2 border-blue-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  {/* Book Cover */}
                  <div className="text-center mb-6">
                    <div className="relative mx-auto mb-4 w-48 h-64 rounded-lg overflow-hidden shadow-2xl">
                      <img 
                        src="/portada.png" 
                        alt="Fundamentos Prácticos de Programación con Python - Ian Saura" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      {/* Fallback design */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <div className="text-6xl mb-4">🐍</div>
                          <div className="font-bold text-lg">Python</div>
                          <div className="text-sm">Fundamentos</div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        DISPONIBLE
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Fundamentos Prácticos de Programación con Python
                      </h3>
                      <p className="text-lg text-blue-600 font-medium mb-2">
                        Nivel 1: De Cero a Scripts Profesionales
                      </p>
                      <p className="text-gray-600 text-sm mb-4">
                        Por Ian Andrés Saura Ellis
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Guía completa paso a paso</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Proyectos prácticos incluidos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Ideal para principiantes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Entrega inmediata por email</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-lg border border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-red-600">$19</span>
                          <span className="text-lg text-gray-500 line-through">$30</span>
                        </div>
                        <Badge className="bg-red-600 text-white px-3 py-1 text-xs">
                          37% OFF
                        </Badge>
                      </div>
                      <p className="text-sm text-red-700 font-medium">
                        🚀 Oferta de lanzamiento limitada
                      </p>
                    </div>

                    {/* Purchase Button */}
                    <div className="space-y-3">
                      <a
                        href="https://onei.la/10x"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-full text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        🛒 Comprar Ahora por $19 USD
                      </a>
                      <p className="text-xs text-gray-500 text-center">
                        💎 Descarga instantánea • 🔒 Pago seguro • 💌 Entrega por email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SQL Book - Available */}
              <Card className="bg-white shadow-2xl border-2 border-green-200 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-8">
                  {/* Book Cover */}
                  <div className="text-center mb-6">
                    <div className="relative mx-auto mb-4 w-48 h-64 rounded-lg overflow-hidden shadow-2xl">
                      <img 
                        src="/portada_SQL.png" 
                        alt="SQL desde Cero - Ian Saura" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image doesn't load
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      {/* Fallback design */}
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <div className="text-6xl mb-4">🗃️</div>
                          <div className="font-bold text-xl mb-2">SQL</div>
                          <div className="text-lg">desde Cero</div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                        DISPONIBLE
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        SQL desde Cero
                      </h3>
                      <p className="text-lg text-green-600 font-medium mb-2">
                        Domina Bases de Datos y Consultas Profesionales
                      </p>
                      <p className="text-gray-600 text-sm mb-4">
                        Por Ian Andrés Saura Ellis
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Fundamentos de bases de datos relacionales</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Consultas complejas con JOINs y subqueries</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Optimización y performance de consultas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Ejercicios prácticos paso a paso</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Scripts y ejemplos incluidos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">Entrega inmediata por email</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-green-600">$19</span>
                          <span className="text-lg text-gray-500 line-through">$30</span>
                        </div>
                        <Badge className="bg-green-600 text-white px-3 py-1 text-xs">
                          37% OFF
                        </Badge>
                      </div>
                      <p className="text-sm text-green-700 font-medium">
                        🚀 Oferta de lanzamiento limitada
                      </p>
                    </div>

                    {/* Purchase Button */}
                    <div className="space-y-3">
                      <a
                        href="https://onei.la/10x"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-full text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        🛒 Comprar Ahora por $19 USD
                      </a>
                      <p className="text-xs text-gray-500 text-center">
                        💎 Descarga instantánea • 🔒 Pago seguro • 💌 Entrega por email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Coming Soon Card 1 */}
              <Card className="bg-gray-50 shadow-lg border-2 border-gray-200 opacity-75">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="relative mx-auto mb-4 w-48 h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">📊</div>
                        <div className="font-bold text-lg">Próximamente</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-600 mb-2">
                        Data Engineering con Python
                      </h3>
                      <p className="text-lg text-gray-500 font-medium mb-2">
                        Nivel 2: Pipelines y ETL Profesionales
                      </p>
                    </div>

                    <div className="space-y-2 opacity-60">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Cron y Pandas para automatización</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Proyectos reales de ETL</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Automatización de tareas diarias</span>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                      <div className="text-center">
                        <Badge className="bg-gray-500 text-white px-3 py-1 text-xs mb-2">
                          PRÓXIMAMENTE
                        </Badge>
                        <p className="text-sm text-gray-600">
                          🚧 En desarrollo
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => openWaitlistModal('Bootcamp Nivel 2 - Data Engineering con Python')}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      📝 Unirme a la lista de espera
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Coming Soon Card 2 */}
              <Card className="bg-gray-50 shadow-lg border-2 border-gray-200 opacity-75">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="relative mx-auto mb-4 w-48 h-64 rounded-lg overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">🎯</div>
                        <div className="font-bold text-lg">Próximamente</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-600 mb-2">
                        Entrevistas Técnicas
                      </h3>
                      <p className="text-lg text-gray-500 font-medium mb-2">
                        Guía completa para Data Engineers
                      </p>
                    </div>

                    <div className="space-y-2 opacity-60">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">100+ preguntas técnicas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Casos de estudio reales</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Templates de respuestas</span>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                      <div className="text-center">
                        <Badge className="bg-gray-500 text-white px-3 py-1 text-xs mb-2">
                          PRÓXIMAMENTE
                        </Badge>
                        <p className="text-sm text-gray-600">
                          🚧 En desarrollo
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => openWaitlistModal('Guía Entrevistas Técnicas para Data Engineers')}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-full text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      📝 Unirme a la lista de espera
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>



            {/* Info Section */}
            <div className="mt-16 bg-blue-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">📖</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Contenido Premium</h4>
                    <p className="text-sm text-gray-600">Guías detalladas y proyectos reales</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">⚡</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Entrega Inmediata</h4>
                    <p className="text-sm text-gray-600">PDF en tu email al instante</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">🛡️</span>
                  <div>
                    <h4 className="font-semibold text-gray-900">Garantía Total</h4>
                    <p className="text-sm text-gray-600">100% satisfacción garantizada</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">¿Tienes preguntas?</h3>
            <p className="text-gray-300 mb-6">
              Contacta directamente para soporte con tus compras
            </p>
            <div className="space-y-2">
              <p className="text-blue-400">
                <a href="mailto:info@iansaura.com">info@iansaura.com</a>
              </p>
              <p className="text-sm text-gray-400">
                Respuesta en menos de 24 horas
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ian Saura. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Únete a la Lista de Espera</h3>
              <button onClick={() => setShowWaitlistModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-lg text-gray-700 mb-4">
              Estás interesado en: <strong>{waitlistData.preferredPlan}</strong>
            </p>

            {user && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-green-800 text-sm">
                  ✅ <strong>Cuenta verificada:</strong> {user.name} ({user.email})
                </p>
              </div>
            )}

            <form onSubmit={handleWaitlistSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <Input
                  type="text"
                  id="name"
                  value={waitlistData.name}
                  onChange={(e) => setWaitlistData({ ...waitlistData, name: e.target.value })}
                  required
                  className="w-full"
                  placeholder={user ? user.name : "Tu nombre"}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={waitlistData.email}
                  onChange={(e) => setWaitlistData({ ...waitlistData, email: e.target.value })}
                  required
                  className="w-full"
                  placeholder={user ? user.email : "tu@email.com"}
                />
              </div>
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                  Motivo de la lista de espera
                </label>
                <Textarea
                  id="reason"
                  value={waitlistData.reason}
                  onChange={(e) => setWaitlistData({ ...waitlistData, reason: e.target.value })}
                  rows={3}
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-1">
                  Método de contacto preferido
                </label>
                <select
                  id="contactMethod"
                  value={waitlistData.contactMethod}
                  onChange={(e) => setWaitlistData({ ...waitlistData, contactMethod: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Seleccionar un método</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="linkedin">LinkedIn</option>
                </select>
              </div>
              {waitlistData.contactMethod === 'whatsapp' && (
                <div>
                  <label htmlFor="contactLink" className="block text-sm font-medium text-gray-700 mb-1">
                    Link de WhatsApp (opcional)
                  </label>
                  <Input
                    type="url"
                    id="contactLink"
                    value={waitlistData.contactLink}
                    onChange={(e) => setWaitlistData({ ...waitlistData, contactLink: e.target.value })}
                    placeholder="https://wa.me/573001234567"
                    className="w-full"
                  />
                </div>
              )}
              <Button
                type="submit"
                disabled={isWaitlistSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {isWaitlistSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
              </Button>
            </form>

            {waitlistSubmitted && (
              <div className="mt-6 text-center text-green-600">
                <p>¡Solicitud enviada con éxito! Te notificaremos cuando el producto esté disponible.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 