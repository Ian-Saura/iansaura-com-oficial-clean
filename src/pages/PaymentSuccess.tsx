import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { GoogleAuth } from '../integrations/GoogleAuth';

interface PaymentSuccessProps {
  onLogin: (user: any) => void;
  user: any;
}

export default function PaymentSuccess({ onLogin, user }: PaymentSuccessProps) {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Cache viewport dimensions once on mount to avoid layout thrashing in render
  const viewportDims = useMemo(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth < 768,
  }), []);

  // If user is already logged in, redirect to members
  useEffect(() => {
    if (user?.subscribed) {
      const timer = setTimeout(() => {
        navigate('/members?welcome=true');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const googleAuth = GoogleAuth.getInstance();
      await googleAuth.signIn(false);
      // This will redirect to Google, so we won't reach here
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900 flex items-center justify-center p-4 relative">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Confetti effect - reduced count on mobile for performance */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(viewportDims.isMobile ? 18 : 50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -20, 
                x: Math.random() * viewportDims.width,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                y: viewportDims.height + 20,
                rotate: Math.random() * 360,
                opacity: 0
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
              className={`absolute w-3 h-3 ${
                ['bg-emerald-500', 'bg-teal-500', 'bg-yellow-500', 'bg-pink-500', 'bg-purple-500'][i % 5]
              }`}
              style={{
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full"
      >
        <div className="bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/20 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-2"
            >
              🎉 ¡Pago Exitoso!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-emerald-100 text-lg"
            >
              Ya sos parte de la comunidad premium
            </motion.p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {user?.subscribed ? (
              // Already logged in and subscribed
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="text-slate-300 mb-4">
                  ¡Hola <span className="text-emerald-400 font-semibold">{user.name}</span>! 
                  Tu suscripción está activa.
                </p>
                <p className="text-slate-400 text-sm mb-6">
                  Redirigiendo al área de miembros...
                </p>
                <div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto" />
              </motion.div>
            ) : (
              // Need to login
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-5"
              >
                {/* Simple instruction */}
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    ¡Ya casi estás! 🎯
                  </h2>
                  <p className="text-slate-300 text-lg">
                    Hacé click abajo para entrar a la plataforma
                  </p>
                </div>

                {/* Google Login Button - BIGGER */}
                <div className="flex justify-center">
                  <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-emerald-500 disabled:opacity-50 text-lg"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-6 h-6" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    )}
                    <span>Entrar con Google</span>
                  </button>
                </div>
                
                <p className="text-center text-amber-400 text-sm font-medium">
                  ⚠️ Usá el mismo email con el que pagaste
                </p>

                {/* SPAM Warning */}
                <div className="bg-amber-500/10 rounded-xl p-4 border border-amber-500/30">
                  <p className="text-amber-300 text-sm text-center">
                    <span className="font-bold">📧 ¿No recibiste el email de confirmación?</span>
                    <br />
                    <span className="text-amber-400/80">Revisá tu carpeta de SPAM o Promociones</span>
                  </p>
                </div>

                {/* Help text */}
                <p className="text-center text-slate-500 text-sm">
                  ¿Problemas? Escribinos a{' '}
                  <a href="mailto:info@iansaura.com" className="text-emerald-400 hover:underline font-medium">
                    info@iansaura.com
                  </a>
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Back to home link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <button
            onClick={() => navigate('/')}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            ← Volver al inicio
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

