import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronRight, Rocket, GraduationCap } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../i18n/LanguageContext';

interface NavigationProps {
  user?: any;
}

export default function Navigation({ user }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState({ subscription: false, bootcamp: false });
  const location = useLocation();
  const { t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const isActive = (path: string) => location.pathname === path;

  // Verificar acceso del usuario
  useEffect(() => {
    if (user?.email) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          setHasAccess({
            subscription: parsed.subscribed === true || parsed.subscribed === 1,
            bootcamp: parsed.bootcamp_access === true || parsed.bootcamp_access === 1
          });
        } catch (e) {}
      }
      
      fetch(`/api/check-subscriber.php?email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.subscribed || data.bootcamp_access) {
            setHasAccess({
              subscription: data.subscribed === true,
              bootcamp: data.bootcamp_access === true
            });
          }
        })
        .catch(() => {});
    }
  }, [user]);

  const mainLinks = [
    { path: '/bootcamps', label: t('nav.bootcamps') },
    { path: '/suscripcion', label: t('nav.subscription'), highlight: true },
  ];

  const secondaryLinks = [
    { path: '/mentorias', label: t('nav.mentorias') },
    { path: '/capacitaciones-empresariales', label: t('nav.empresas') },
  ];

  return (
    <nav className="fixed top-0 w-full z-50" aria-label="Navegación principal">
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-gray-200/50" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
              <span className="text-white font-bold text-sm">IS</span>
            </div>
            <span className="text-lg font-bold text-gray-900 hidden sm:block">
              Ian Saura
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            {/* Main Links */}
            <div className="flex items-center gap-1 mr-4">
              {mainLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? link.highlight 
                        ? 'text-emerald-700 bg-emerald-50' 
                        : 'text-blue-700 bg-blue-50'
                      : link.highlight
                        ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                  }`}
                >
                  {link.highlight && (
                    <Zap className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
                  )}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 mr-4" />

            {/* Secondary Links */}
            <div className="flex items-center gap-1 mr-4">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
                    isActive(link.path)
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-200 mr-4" />
            
            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/members"
                  className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 animate-pulse hover:animate-none"
                >
                  <Rocket className="w-4 h-4" />
                  Ir a la Academia
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                {hasAccess.bootcamp && (
                  <Link
                    to="/bootcamp-platform"
                    className="group flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Ir al Bootcamp
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
                
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium max-w-[100px] truncate">
                    {user.name || user.email?.split('@')[0] || 'Usuario'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="group flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30"
              >
                {t('nav.login')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
            
            {/* Language Selector - VISIBLE */}
            <LanguageSelector variant="buttons" className="ml-2" />
          </div>

          {/* Mobile menu button - CSS transition instead of framer-motion */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span className={`transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'} absolute`}>
              <Menu className="w-5 h-5 text-gray-700" />
            </span>
            <span className={`transition-all duration-200 ${mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'} absolute`}>
              <X className="w-5 h-5 text-gray-700" />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu - CSS transition instead of framer-motion */}
      <div
        ref={menuRef}
        className={`md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200/50 overflow-hidden transition-all duration-200 ease-in-out ${
          mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 space-y-2 max-h-[80vh] overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Main Links */}
          {mainLinks.map((link, index) => (
            <div
              key={link.path}
              className={`transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
              style={{ transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms' }}
            >
              <Link
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(link.path)
                    ? link.highlight 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-blue-50 text-blue-700'
                    : link.highlight
                      ? 'text-emerald-600 hover:bg-emerald-50'
                      : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.highlight && <Zap className="w-4 h-4" />}
                <span className="font-medium">{link.label}</span>
              </Link>
            </div>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-100 my-3" />

          {/* Secondary Links */}
          {secondaryLinks.map((link, index) => (
            <div
              key={link.path}
              className={`transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
              style={{ transitionDelay: mobileMenuOpen ? `${(mainLinks.length + index) * 50}ms` : '0ms' }}
            >
              <Link
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(link.path)
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                <span>{link.label}</span>
              </Link>
            </div>
          ))}

          {/* Divider */}
          <div className="border-t border-gray-100 my-3" />

          {/* User Section */}
          <div
            className={`space-y-3 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}
            style={{ transitionDelay: mobileMenuOpen ? '200ms' : '0ms' }}
          >
            {user && (hasAccess.subscription || hasAccess.bootcamp) && (
              <Link
                to={hasAccess.subscription ? "/members" : "/bootcamp-platform"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-emerald-500/30 animate-pulse"
              >
                {hasAccess.subscription ? (
                  <>
                    <Rocket className="w-5 h-5" />
                    Ir a la Academia
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-5 h-5" />
                    Ir al Bootcamp
                  </>
                )}
                <ChevronRight className="w-5 h-5" />
              </Link>
            )}
            
            {user ? (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {(user.name || user.email || 'U').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm text-gray-700 font-medium">
                    {user.name || user.email?.split('@')[0] || 'Usuario'}
                  </span>
                </div>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    window.location.reload();
                  }}
                  className="text-sm text-red-500 font-medium"
                >
                  Salir
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3.5 rounded-xl font-medium shadow-lg"
              >
                {t('nav.login')}
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
            
            {/* Language Selector Mobile */}
            <div className="pt-4 border-t border-gray-100 mt-4">
              <div className="text-xs font-medium text-gray-500 mb-2">Idioma / Language</div>
              <LanguageSelector variant="buttons" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
