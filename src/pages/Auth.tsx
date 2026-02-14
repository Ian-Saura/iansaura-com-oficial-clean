import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Star,
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

interface AuthProps {
  onLogin: (user: any) => void;
}

declare global {
  interface Window {
    google: any;
  }
}

export default function Auth({ onLogin }: AuthProps) {
  const { t, language, setLanguage } = useLanguage();
  
  // Auth page defaults to ENGLISH (global audience) unless:
  // 1. User explicitly set language via ?lang= param
  // 2. User already has a language preference in localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const storedLang = localStorage.getItem('ian-saura-language');
    
    // If no explicit language preference, default to English for auth page
    if (!urlLang && !storedLang && language !== 'en') {
      setLanguage('en');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [resendingVerification, setResendingVerification] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
  // Forgot/Reset password states
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSent, setForgotPasswordSent] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  // Check if user is being redirected for subscription
  const searchParams = new URLSearchParams(location.search);
  const needsUpgrade = searchParams.get('upgrade') === 'true';
  const wantsSubscription = searchParams.get('action') === 'subscribe';
  const redirectPath = searchParams.get('redirect');
  
  // Check if coming from successful payment
  const paymentSuccess = searchParams.get('welcome') === 'true' || searchParams.get('payment') === 'success';
  
  // Check for email verification success/error from redirect
  const verificationSuccess = searchParams.get('verified') === 'true';
  const verificationError = searchParams.get('verification_error');
  const verificationMessageFromUrl = searchParams.get('message');
  const [showVerificationBanner, setShowVerificationBanner] = useState(verificationSuccess || !!verificationError);
  
  // Check for password reset token from URL
  const resetTokenFromUrl = searchParams.get('token');
  const isResetAction = searchParams.get('action') === 'reset';
  
  // If coming from reset link, show reset password form
  useEffect(() => {
    if (isResetAction && resetTokenFromUrl) {
      setShowResetPassword(true);
      setResetToken(resetTokenFromUrl);
    }
  }, [isResetAction, resetTokenFromUrl]);
  
  // 🎁 REFERRAL SYSTEM: Capture referral code from URL
  const referralCode = searchParams.get('ref');
  const [storedReferralCode, setStoredReferralCode] = useState<string | null>(
    localStorage.getItem('referral_code')
  );
  
  // Store referral code if present in URL
  useEffect(() => {
    if (referralCode) {
      localStorage.setItem('referral_code', referralCode);
      setStoredReferralCode(referralCode);
    }
  }, [referralCode]);

  // Reenviar email de verificación
  const handleResendVerification = async () => {
    if (!verificationEmail) return;
    
    setResendingVerification(true);
    setResendSuccess(false);
    
    try {
      const res = await fetch('/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'resend_verification', 
          email: verificationEmail 
        })
      });
      
      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      setResendSuccess(true);
      
    } catch (err) {
      // Mostrar error pero no cambiar el mensaje principal
      console.error('Error resending verification:', err);
    } finally {
      setResendingVerification(false);
    }
  };

  // Handle forgot password request
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail) {
      setErrorMessage('Ingresá tu email');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const res = await fetch('/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'forgot_password', 
          email: forgotPasswordEmail 
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setForgotPasswordSent(true);
        // Check if hint suggests Google login
        if (data.hint === 'google') {
          setErrorMessage('');
        }
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (err) {
      console.error('Error sending reset email:', err);
      setErrorMessage('Error al enviar el email. Intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Completá ambos campos de contraseña');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }
    
    if (newPassword.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const res = await fetch('/api/auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'reset_password', 
          token: resetToken,
          new_password: newPassword
        })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResetSuccess(true);
        // Clear URL params after successful reset
        navigate('/auth', { replace: true });
      } else {
        setErrorMessage(data.error || 'Error al cambiar la contraseña');
      }
    } catch (err) {
      console.error('Error resetting password:', err);
      setErrorMessage('Error al cambiar la contraseña. Intentá de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  // Preload Google Identity Services script on mount
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      // Load Google Identity Services if not yet loaded
      if (!window.google) {
        await new Promise<void>((resolve, reject) => {
          const existingScript = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
          if (existingScript) {
            existingScript.addEventListener('load', () => resolve());
            existingScript.addEventListener('error', () => reject(new Error('Failed to load Google')));
          } else {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Google'));
            document.head.appendChild(script);
          }
        });
        // Small delay to ensure API is fully ready
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      // Use OAuth2 token client - opens Google popup IMMEDIATELY on click
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
        scope: 'email profile openid',
        callback: async (tokenResponse: any) => {
          try {
            if (tokenResponse.error) {
              throw new Error(tokenResponse.error);
            }

            // Use access token to get user info from Google
            const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
            });
            const payload = await userInfoResponse.json();

            console.log('Google user:', payload.email);

            // Call backend to register/login user
            const apiResponse = await fetch('/api/google-auth.php', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                googleUser: {
                  id: payload.sub,
                  email: payload.email,
                  name: payload.name,
                  picture: payload.picture,
                  given_name: payload.given_name,
                  family_name: payload.family_name,
                }
              }),
            });

            const data = await apiResponse.json();

            if (!data.success) {
              throw new Error(data.error || 'Error en autenticación');
            }

            // Create user object
            const user = {
              id: data.user.id,
              email: data.user.email,
              name: data.user.name,
              picture: payload.picture,
              subscribed: data.user.subscribed,
              provider: 'google',
            };

            onLogin(user);

            // Navigate based on subscription
            if (needsUpgrade || wantsSubscription) {
              if (user.subscribed) {
                navigate('/members');
              } else {
                navigate('/suscripcion');
              }
            } else {
              if (user.subscribed) {
                navigate('/members');
              } else {
                navigate('/');
              }
            }
          } catch (error: any) {
            console.error('Google auth callback error:', error);
            alert('Error: ' + (error.message || 'Inténtalo de nuevo'));
          } finally {
            setGoogleLoading(false);
          }
        },
        error_callback: (error: any) => {
          console.error('Google OAuth error:', error);
          setGoogleLoading(false);
        },
      });

      // This opens Google's account picker popup directly - no double click needed!
      tokenClient.requestAccessToken();

    } catch (error: any) {
      console.error('Google auth error:', error);
      alert('Error al iniciar sesión con Google: ' + (error.message || 'Inténtalo de nuevo'));
      setGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use real authentication API
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api/auth-local.php' 
        : '/api/auth.php';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          email: formData.email,
          password: formData.password,
          name: formData.name,
          // 🎁 Include referral code on registration
          referral_code: !isLogin ? storedReferralCode : undefined
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Check if registration requires email verification
        if (result.requiresVerification) {
          // Show verification pending screen
          setVerificationPending(true);
          setVerificationEmail(formData.email);
        } else if (result.user) {
          // Login successful
          onLogin(result.user);

          // Handle different redirect scenarios
          if (wantsSubscription) {
            // Redirect to Gumroad checkout via subscribe.php
            window.location.href = 'https://iansaura.com/subscribe.php';
          } else if (needsUpgrade) {
            handleSubscription(result.user);
          } else if (redirectPath && redirectPath.startsWith('/') && !redirectPath.startsWith('//')) {
            // Only allow relative paths (prevent open redirect to external sites)
            navigate(redirectPath);
          } else {
            navigate('/');
          }
        }
      } else {
        throw new Error(result.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Auth error:', error);
      const errorMsg = error instanceof Error ? error.message : 'Error al iniciar sesión. Inténtalo de nuevo.';
      
      // Check if it's a verification error
      if (errorMsg.includes('verificado') || errorMsg.includes('verificar')) {
        setVerificationEmail(formData.email);
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage(errorMsg);
      }
    }

    setIsLoading(false);
  };

  // Subscription is handled via Gumroad
  const handleSubscription = async (_user: any) => {
    // Redirect to subscription page where Gumroad checkout is available
    navigate('/suscripcion');
  };



  // Show verification pending screen
  if (verificationPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Mail className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📧 Verificá tu email
              </h2>
              
              <p className="text-gray-600 mb-6">
                Te enviamos un email a <strong className="text-gray-900">{verificationEmail}</strong> con un link para verificar tu cuenta.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <p className="text-amber-800 text-sm">
                  <strong>⚠️ Importante:</strong> Revisá también tu carpeta de <strong>spam</strong> o correo no deseado.
                </p>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setVerificationPending(false);
                    setIsLogin(true);
                    setFormData({ ...formData, password: '' });
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  Ya verifiqué → Iniciar sesión
                </Button>
                
                <p className="text-gray-500 text-sm">
                  ¿No recibiste el email? Contactanos a{' '}
                  <a href="mailto:info@iansaura.com" className="text-blue-600 hover:underline">
                    info@iansaura.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Show forgot password screen
  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              {forgotPasswordSent ? (
                // Success state
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Mail className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    📧 Revisá tu email
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    Si <strong className="text-gray-900">{forgotPasswordEmail}</strong> está registrado, recibirás un email con instrucciones para restablecer tu contraseña.
                  </p>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                    <p className="text-amber-800 text-sm">
                      <strong>⚠️ Importante:</strong> El link expira en <strong>1 hora</strong>. Revisá también tu carpeta de <strong>spam</strong>.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        setShowForgotPassword(false);
                        setForgotPasswordSent(false);
                        setForgotPasswordEmail('');
                        setIsLogin(true);
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      ← Volver a iniciar sesión
                    </Button>
                  </div>
                </div>
              ) : (
                // Form state
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      🔐 ¿Olvidaste tu contraseña?
                    </h2>
                    <p className="text-gray-600">
                      Ingresá tu email y te enviaremos un link para restablecerla.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <p className="text-red-700 text-sm text-center">{errorMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          required
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 py-3 rounded-lg font-medium"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Enviando...
                        </div>
                      ) : (
                        <>
                          📧 Enviar link de recuperación
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => {
                        setShowForgotPassword(false);
                        setErrorMessage('');
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      ← Volver a iniciar sesión
                    </button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Show reset password screen (when coming from email link)
  if (showResetPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-8">
              {resetSuccess ? (
                // Success state
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    ✅ ¡Contraseña actualizada!
                  </h2>
                  
                  <p className="text-gray-600 mb-6">
                    Tu contraseña fue cambiada exitosamente. Ya podés iniciar sesión con tu nueva contraseña.
                  </p>
                  
                  <Button
                    onClick={() => {
                      setShowResetPassword(false);
                      setResetSuccess(false);
                      setIsLogin(true);
                    }}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                  >
                    Iniciar sesión →
                  </Button>
                </div>
              ) : (
                // Form state
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      🔑 Crear nueva contraseña
                    </h2>
                    <p className="text-gray-600">
                      Ingresá tu nueva contraseña para tu cuenta.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <p className="text-red-700 text-sm text-center">{errorMessage}</p>
                    </div>
                  )}

                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nueva contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                          placeholder="••••••••"
                          minLength={6}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar contraseña
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                          placeholder="••••••••"
                          minLength={6}
                        />
                      </div>
                      <p className="text-gray-500 text-xs mt-1">Mínimo 6 caracteres</p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 py-3 rounded-lg font-medium"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Guardando...
                        </div>
                      ) : (
                        <>
                          🔐 Guardar nueva contraseña
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center mt-6">
                    <button
                      onClick={() => {
                        setShowResetPassword(false);
                        setErrorMessage('');
                        navigate('/auth', { replace: true });
                      }}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      ← Volver a iniciar sesión
                    </button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Payment Success Banner */}
      {paymentSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 shadow-lg"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
            <div className="text-3xl">🎉</div>
            <div className="text-center">
              <h3 className="text-xl font-bold">¡Pago exitoso!</h3>
              <p className="text-emerald-100">Iniciá sesión con Google para acceder a tu cuenta premium</p>
            </div>
            <div className="text-3xl">🎉</div>
          </div>
        </motion.div>
      )}
      
      <div className={`max-w-5xl w-full grid lg:grid-cols-2 gap-8 ${paymentSuccess ? 'mt-24' : ''}`}>
        {/* Left side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl font-bold text-white">IS</span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {wantsSubscription ? t('auth.premiumSubscription') : (needsUpgrade ? t('auth.joinClub') : (isLogin ? t('auth.welcome') : t('auth.createAccount')))}
              </CardTitle>
              <p className="text-gray-600">
                {wantsSubscription 
                  ? t('auth.signInSubscription')
                  : (needsUpgrade 
                    ? t('auth.exclusiveContent')
                    : (isLogin ? t('auth.signInContinue') : t('auth.joinEngineers')))
                }
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* 🎁 Referral Code Active Banner */}
              {storedReferralCode && !isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🎁</span>
                    </div>
                    <div>
                      <p className="text-purple-800 font-medium text-sm">
                        {t('auth.referralActive') || '¡Código de referido activo!'}
                      </p>
                      <p className="text-purple-600 text-xs">
                        {t('auth.referralBonus') || 'Recibirás un descuento especial al suscribirte'}
                      </p>
                      <code className="text-xs font-mono bg-purple-100 text-purple-700 px-2 py-0.5 rounded mt-1 inline-block">
                        {storedReferralCode}
                      </code>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Verification Success/Error Banner from URL */}
              {showVerificationBanner && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    verificationSuccess 
                      ? 'bg-emerald-50 border border-emerald-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      {verificationSuccess ? (
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      )}
                      <div>
                        <p className={`font-medium ${verificationSuccess ? 'text-emerald-800' : 'text-red-800'}`}>
                          {verificationSuccess ? '¡Email verificado!' : 'Error de verificación'}
                        </p>
                        <p className={`text-sm ${verificationSuccess ? 'text-emerald-600' : 'text-red-600'}`}>
                          {verificationMessageFromUrl 
                            ? decodeURIComponent(verificationMessageFromUrl) 
                            : (verificationSuccess 
                              ? 'Ya podés iniciar sesión con tu cuenta.' 
                              : 'Hubo un problema con la verificación.')}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowVerificationBanner(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    errorMessage.includes('verificado') || errorMessage.includes('verificar')
                      ? 'bg-amber-50 border border-amber-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {errorMessage.includes('verificado') || errorMessage.includes('verificar') ? (
                    <div className="text-center">
                      <div className="text-3xl mb-2">📧</div>
                      <p className="text-amber-800 font-medium mb-2">Email no verificado</p>
                      <p className="text-amber-700 text-sm mb-3">
                        Revisá tu bandeja de entrada (y spam) en <strong>{verificationEmail}</strong> para el link de verificación.
                      </p>
                      
                      {resendSuccess ? (
                        <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-3">
                          <p className="text-green-700 text-sm font-medium">✅ ¡Email reenviado!</p>
                          <p className="text-green-600 text-xs">Revisá tu bandeja de entrada y spam</p>
                        </div>
                      ) : (
                        <button
                          onClick={handleResendVerification}
                          disabled={resendingVerification}
                          className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors mb-3 flex items-center justify-center mx-auto gap-2"
                        >
                          {resendingVerification ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Reenviando...
                            </>
                          ) : (
                            <>
                              📨 Reenviar email de verificación
                            </>
                          )}
                        </button>
                      )}
                      
                      <p className="text-amber-600 text-xs">
                        ¿Problemas? Contactanos a <a href="mailto:info@iansaura.com" className="underline">info@iansaura.com</a>
                      </p>
                    </div>
                  ) : (
                    <p className="text-red-700 text-sm text-center">{errorMessage}</p>
                  )}
                  <button 
                    onClick={() => setErrorMessage('')}
                    className="mt-3 w-full text-xs text-gray-500 hover:text-gray-700"
                  >
                    ✕ Cerrar
                  </button>
                </motion.div>
              )}

              {/* Google Sign-In Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full py-3 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                {googleLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                    {t('auth.connecting')}
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continuar con Google
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">o continúa con email</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                        placeholder="Ian Saura"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auth.email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('auth.password')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                      placeholder="••••••••"
                    />
                  </div>
                  {/* Forgot password link - only show on login */}
                  {isLogin && (
                    <div className="text-right mt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setShowForgotPassword(true);
                          setForgotPasswordEmail(formData.email);
                          setErrorMessage('');
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {t('auth.processing')}
                    </div>
                  ) : (
                    <>
                      {wantsSubscription ? t('auth.continueSubscription') : (needsUpgrade ? t('auth.subscribePrice') : (isLogin ? t('auth.signIn') : t('auth.createAccountBtn')))}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>



              {!needsUpgrade && (
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
                  >
                    {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
                  </button>
                </div>
              )}

              <div className="text-center">
                <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                  {t('auth.backHome')}
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right side - Benefits */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 flex flex-col justify-center"
        >
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('auth.transformCareer')}
            </h2>
            <p className="text-gray-600 text-xl mb-2">
              {t('auth.joinProfessionals')}
            </p>
            <p className="text-lg text-gray-500">
               <strong className="text-blue-600 text-2xl"></strong>
            </p>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: "🎥",
                title: t('auth.exclusiveVideos'),
                description: t('auth.videosDescription')
              },
              {
                icon: "📚",
                title: t('auth.downloadablePdfs'),
                description: t('auth.pdfsDescription')
              },
              {
                icon: "🗺️",
                title: t('auth.personalizedRoadmaps'),
                description: t('auth.roadmapsDescription')
              },
              {
                icon: "👥",
                title: t('auth.privateCommunity'),
                description: t('auth.communityDescription')
              },
              {
                icon: "💼",
                title: t('auth.interviewPrep'),
                description: t('auth.interviewDescription')
              },
              {
                icon: "🎯",
                title: t('auth.monthlyMentoring'),
                description: t('auth.mentoringDescription')
              }
            ].map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex items-start space-x-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:shadow-md transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="text-2xl">{benefit.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-blue-100 text-sm font-medium">{t('auth.rating')}</span>
              </div>
              <p className="text-blue-100 italic mb-4 text-lg">
                {t('auth.testimonial')}
              </p>
              <p className="text-sm text-blue-200 font-medium">
                {t('auth.testimonialAuthor')}
              </p>
            </CardContent>
          </Card>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
            <div className="flex items-center mb-3">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <span className="font-bold text-green-800 text-lg">{t('auth.satisfaction')}</span>
            </div>
            <p className="text-green-700">
              {t('auth.cancelAnytime')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 