import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [verificationMessage, setVerificationMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  const handleGoogleCallback = useCallback(async (code: string, state: string | null) => {
    try {
      console.log('Processing Google OAuth callback...');
      
      // Call our backend to exchange code for tokens and authenticate
      // redirect_uri MUST match exactly what's in Google Cloud Console (sin www)
      const response = await fetch('/api/google-callback.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          redirect_uri: 'https://iansaura.com/login',
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        console.error('Backend error:', data.error);
        throw new Error(data.error || 'Error en la autenticación');
      }

      console.log('Authentication successful:', data.user.email);

      // Create the user object for the app
      const user = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        picture: data.user.picture,
        subscribed: data.user.subscribed,
        provider: 'google',
        email_verified: true,
      };

      // Login the user
      onLogin(user);
      
      // Clear OAuth data from sessionStorage
      sessionStorage.removeItem('oauth_code');
      sessionStorage.removeItem('oauth_state');
      sessionStorage.removeItem('oauth_error');
      
      // Navigate based on state and subscription status
      if (state === 'upgrade' || state === 'subscribe') {
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
      console.error('Error handling Google callback:', error);
      alert('Error procesando la autenticación: ' + (error.message || 'Inténtalo de nuevo'));
      
      // Clear OAuth data on error
      sessionStorage.removeItem('oauth_code');
      sessionStorage.removeItem('oauth_state');
      sessionStorage.removeItem('oauth_error');
      
      navigate('/auth');
    }
  }, [navigate, onLogin]);

  useEffect(() => {
    // Check for email verification messages first
    const success = searchParams.get('success');
    const errorParam = searchParams.get('error');
    const message = searchParams.get('message');
    
    if (success || errorParam) {
      // This is an email verification redirect
      if (message) {
        setVerificationMessage({
          type: success ? 'success' : 'error',
          text: decodeURIComponent(message)
        });
      }
      // Redirect to auth page with the message after a short delay
      setTimeout(() => {
        const params = new URLSearchParams();
        if (success) params.set('verified', 'true');
        if (errorParam) params.set('verification_error', errorParam);
        if (message) params.set('message', message);
        navigate(`/auth?${params.toString()}`);
      }, 2000);
      return;
    }
    
    // Check for OAuth data in sessionStorage (from pre-React redirect)
    const code = sessionStorage.getItem('oauth_code');
    const state = sessionStorage.getItem('oauth_state');
    const oauthError = sessionStorage.getItem('oauth_error');

    if (oauthError) {
      console.error('OAuth error:', oauthError);
      alert('Error en la autenticación. Redirigiendo...');
      sessionStorage.removeItem('oauth_error');
      navigate('/auth');
      return;
    }

    if (code) {
      handleGoogleCallback(code, state);
      return;
    }

    // Fallback: Check URL parameters
    const urlCode = searchParams.get('code');
    const urlState = searchParams.get('state');
    const urlError = searchParams.get('error');

    // Skip if this is a verification error (already handled above)
    if (urlError && !errorParam) {
      console.error('OAuth URL error:', urlError);
      alert('Error en la autenticación. Redirigiendo...');
      navigate('/auth');
      return;
    }

    if (urlCode) {
      handleGoogleCallback(urlCode, urlState);
      return;
    }

    // No OAuth data found, redirect to auth
    navigate('/auth');
  }, [searchParams, navigate, handleGoogleCallback]);

  // Show verification message if present
  if (verificationMessage) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          {verificationMessage.type === 'success' ? (
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          <p className={`text-lg font-medium ${verificationMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>
            {verificationMessage.text}
          </p>
          <p className="text-sm text-slate-400 mt-4">Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white font-medium">Procesando autenticación...</p>
        <p className="text-sm text-slate-400 mt-2">Validando credenciales de Google...</p>
      </div>
    </div>
  );
}
