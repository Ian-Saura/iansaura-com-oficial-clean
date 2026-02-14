import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export default function InstallPWA() {
  const { tLocalized } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Check if user dismissed recently
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      if (Date.now() - dismissedTime < oneWeek) return;
    }

    // Detect iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Show iOS instructions after delay
    if (isIOSDevice) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // Listen for install prompt
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show banner after small delay
      setTimeout(() => setShowBanner(true), 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowBanner(false);
        setDeferredPrompt(null);
      }
    } catch (error) {
      console.error('Install prompt error:', error);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  if (!showBanner) return null;

  // iOS Instructions Modal
  if (isIOS && showIOSInstructions) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-4">
        <div className="bg-slate-900 rounded-2xl p-6 max-w-sm w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">
                  {tLocalized({ es: 'Instalar App', en: 'Install App', pt: 'Instalar App' })}
                </h3>
                <p className="text-slate-400 text-sm">iOS</p>
              </div>
            </div>
            <button onClick={handleDismiss} className="text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-3 text-sm text-slate-300">
            <p className="font-medium text-white">
              {tLocalized({ 
                es: 'Para instalar la app en tu iPhone:', 
                en: 'To install the app on your iPhone:', 
                pt: 'Para instalar o app no seu iPhone:' 
              })}
            </p>
            <ol className="space-y-2 list-decimal list-inside">
              <li>{tLocalized({ es: 'Tocá el botón', en: 'Tap the', pt: 'Toque no botão' })} <span className="bg-slate-700 px-2 py-0.5 rounded text-emerald-400">Compartir</span> {tLocalized({ es: 'abajo', en: 'below', pt: 'abaixo' })}</li>
              <li>{tLocalized({ es: 'Seleccioná', en: 'Select', pt: 'Selecione' })} "<span className="text-emerald-400">{tLocalized({ es: 'Agregar a Inicio', en: 'Add to Home Screen', pt: 'Adicionar à Tela Inicial' })}</span>"</li>
              <li>{tLocalized({ es: 'Tocá', en: 'Tap', pt: 'Toque em' })} "<span className="text-emerald-400">{tLocalized({ es: 'Agregar', en: 'Add', pt: 'Adicionar' })}</span>"</li>
            </ol>
          </div>
          
          <button
            onClick={handleDismiss}
            className="w-full mt-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
          >
            {tLocalized({ es: 'Entendido', en: 'Got it', pt: 'Entendi' })}
          </button>
        </div>
      </div>
    );
  }

  // Install Banner
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 safe-area-inset-bottom">
      <div className="max-w-lg mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-4 border border-slate-700 shadow-2xl flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <Download className="w-6 h-6 text-emerald-400" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-white text-sm sm:text-base truncate">
            {tLocalized({ es: 'Instalar App', en: 'Install App', pt: 'Instalar App' })}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm truncate">
            {tLocalized({ 
              es: 'Acceso rápido desde tu pantalla', 
              en: 'Quick access from your home screen', 
              pt: 'Acesso rápido da sua tela inicial' 
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-2 flex-shrink-0">
          {isIOS ? (
            <button
              onClick={() => setShowIOSInstructions(true)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm transition-colors"
            >
              {tLocalized({ es: 'Cómo', en: 'How', pt: 'Como' })}
            </button>
          ) : (
            <button
              onClick={handleInstall}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm transition-colors"
            >
              {tLocalized({ es: 'Instalar', en: 'Install', pt: 'Instalar' })}
            </button>
          )}
          <button
            onClick={handleDismiss}
            className="p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

