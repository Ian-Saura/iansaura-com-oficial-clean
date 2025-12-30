import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';

export default function RedFlags() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api/redflags-delivery.php' 
        : '/api/redflags-delivery.php';
      
      console.log('📤 Enviando solicitud de PDF a:', apiUrl);
      console.log('📧 Email:', email);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📥 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('📥 Response data:', result);

      if (result.success) {
        setSubmitted(true);
        setEmail('');
        console.log('✅ PDF enviado exitosamente');
      } else {
        setError(result.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      setError('Error al procesar tu solicitud. Por favor intenta nuevamente. Detalles: ' + errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12"
      >
        {!submitted ? (
          <>
            <div className="text-center mb-8">
              <Download className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                15 Red Flags en tu Código de Data Engineering
              </h1>
              <p className="text-lg text-gray-600">
                Descargá la guía gratuita y descubrí los errores más comunes que cometen los Data Engineers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Enviando...' : '📥 Descargar PDF Gratis'}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-6">
              Recibirás el PDF por email en menos de 1 minuto
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Revisá tu email!
            </h2>
            <p className="text-lg text-gray-600">
              Te enviamos el PDF a <strong>{email}</strong>
            </p>
            <p className="text-sm text-gray-500 mt-4">
              (Si no lo ves, revisá tu carpeta de spam)
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
