import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 - Página no encontrada | Ian Saura</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <div className="text-center max-w-lg mx-auto">
          {/* 404 big number */}
          <div className="relative mb-8">
            <div className="text-[8rem] sm:text-[10rem] font-black text-slate-800/50 leading-none select-none">
              404
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl sm:text-6xl">🔍</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Página no encontrada
          </h1>
          <p className="text-slate-400 mb-8 text-base sm:text-lg leading-relaxed">
            La página que buscás no existe o fue movida. 
            Pero no te preocupes, podés volver al inicio o explorar la plataforma.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-emerald-500/20 touch-manipulation"
            >
              <Home className="w-5 h-5" />
              Ir al inicio
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-6 rounded-xl transition-all border border-slate-700 touch-manipulation"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver atrás
            </button>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-slate-800">
            <p className="text-sm text-slate-500 mb-4 flex items-center justify-center gap-1.5">
              <Search className="w-4 h-4" /> Links útiles
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { to: '/suscripcion', label: 'Suscripción' },
                { to: '/bootcamps', label: 'Bootcamps' },
                { to: '/mentorias', label: 'Mentorías' },
                { to: '/auth', label: 'Iniciar sesión' },
              ].map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm text-slate-400 hover:text-emerald-400 bg-slate-800/50 hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
