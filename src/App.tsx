import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './i18n/LanguageContext';
import ErrorBoundary from './components/ErrorBoundary';
import InstallPWA from './components/InstallPWA';
import './App.css';

// ============================================
// EAGER LOADED - Landing pages (critical path)
// Build version: v20241209-global - Updated SEO for worldwide audience
// ============================================
import Home from './pages/Home';

// Suscripcion - lazy loaded (not the landing page)
const Suscripcion = lazy(() => import('./pages/Suscripcion'));

// ============================================
// LAZY LOADED - Heavy pages (loaded on demand)
// ============================================
// Members Area (4500+ lines) - Only for logged in users
const Members = lazy(() => import('./pages/Members'));

// Admin Panel (4300+ lines) - Only for admins
const Admin = lazy(() => import('./pages/Admin'));

// Bootcamp Platform (1400+ lines) - Only for bootcamp users
const BootcampPlatform = lazy(() => import('./pages/BootcampPlatform'));

// Project Detail (1100+ lines) - Accessed via direct URL
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// Auth pages - Only for non-logged in users
const Auth = lazy(() => import('./pages/Auth'));
const Login = lazy(() => import('./pages/Login'));

// Secondary pages - Lower priority
const Mentorias = lazy(() => import('./pages/Mentorias'));
const Bootcamps = lazy(() => import('./pages/Bootcamps'));
const BootcampDetailPage = lazy(() => import('./pages/BootcampDetail'));
const CapacitacionesEmpresariales = lazy(() => import('./pages/CapacitacionesEmpresariales'));
const RedFlags = lazy(() => import('./pages/RedFlags'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const GuiaDataEngineering = lazy(() => import('./pages/GuiaDataEngineering'));
const Settings = lazy(() => import('./pages/Settings'));
const VerifyCertificate = lazy(() => import('./pages/VerifyCertificate'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading spinner for lazy-loaded pages
const PageLoader = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-400">Cargando...</p>
    </div>
  </div>
);

interface User {
  id: string;
  email: string;
  subscribed: boolean;
  bootcamp_access?: boolean;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session and ALWAYS verify with server
    const initUser = async () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
          const parsedUser = JSON.parse(savedUser);
          
          // SECURITY: Set user with subscribed=false initially
          // Server will confirm the real subscription status
          setUser({ ...parsedUser, subscribed: false });
          
          // Verify user data with server (source of truth) - retry up to 2 times
          if (parsedUser.email) {
            let verified = false;
            for (let attempt = 1; attempt <= 2; attempt++) {
              try {
                const response = await fetch(`/api/check-subscriber.php?email=${encodeURIComponent(parsedUser.email)}`);
                if (response.ok) {
                  const data = await response.json();
                  if (data.success) {
                    const updatedUser = {
                      ...parsedUser,
                      subscribed: data.subscribed || false,
                      bootcamp_access: data.bootcamp_access || false,
                      is_trial: data.is_trial || false,
                      is_oneinfinite_trial: data.is_oneinfinite_trial || false,
                      trial_ends: data.trial_ends || null,
                      trial_days_left: data.trial_days_left || null,
                    };
                    setUser(updatedUser);
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    verified = true;
                    break;
                  }
                }
              } catch (err) {
                console.warn(`User verification attempt ${attempt} failed:`, err);
                if (attempt < 2) await new Promise(r => setTimeout(r, 1500));
              }
            }
            if (!verified) {
              // All attempts failed - use cached value as fallback for existing subscribers
              // This prevents subscribers from losing access due to temporary server issues
              console.error('Could not verify subscription with server');
              setUser({ ...parsedUser, subscribed: parsedUser.subscribed || false });
            }
          }
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
    };
    
    initUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <InstallPWA />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* EAGER LOADED - Critical landing pages */}
                <Route path="/" element={<Home user={user} />} />
                <Route path="/suscripcion" element={<Suscripcion user={user} />} />
                
                {/* LAZY LOADED - Secondary pages */}
                <Route path="/payment-success" element={<PaymentSuccess onLogin={login} user={user} />} />
                <Route path="/redflags" element={<RedFlags />} />
                <Route path="/guia-data-engineering" element={<GuiaDataEngineering user={user} />} />
                <Route path="/que-es-data-engineering" element={<GuiaDataEngineering user={user} />} />
                <Route path="/bootcamps" element={<Bootcamps user={user} />} />
                <Route path="/bootcamps/:slug" element={<BootcampDetailPage user={user} />} />
                <Route path="/mentorias" element={<Mentorias user={user} />} />
                <Route path="/capacitaciones-empresariales" element={<CapacitacionesEmpresariales user={user} />} />
                
                {/* LAZY LOADED - Members Area (4500+ lines) */}
                <Route 
                  path="/members" 
                  element={
                    user ? (
                      <Members user={user} />
                    ) : (
                      <Navigate to="/auth?action=subscribe" replace />
                    )
                  } 
                />
                
                {/* LAZY LOADED - Auth pages */}
                <Route path="/login" element={<Login onLogin={login} />} />
                <Route 
                  path="/auth" 
                  element={
                    user ? (
                      <Navigate to="/" replace />
                    ) : (
                      <Auth onLogin={login} />
                    )
                  } 
                />
                
                {/* LAZY LOADED - Admin Panel (4300+ lines) */}
                <Route path="/admin" element={<Admin user={user} />} />
                
                {/* LAZY LOADED - Settings */}
                <Route 
                  path="/settings" 
                  element={user ? <Settings user={user} /> : <Navigate to="/auth" replace />} 
                />
                
                {/* LAZY LOADED - Project Detail */}
                <Route path="/project/:projectId" element={<ProjectDetail />} />
                
                {/* Certificate Verification */}
                <Route path="/verify/:certId" element={<VerifyCertificate />} />
                
                {/* Legal Pages */}
                <Route path="/terminos" element={<Legal user={user} />} />
                <Route path="/privacidad" element={<Legal user={user} />} />
                <Route path="/conducta" element={<Legal user={user} />} />
                <Route path="/reembolsos" element={<Legal user={user} />} />
                
                {/* LAZY LOADED - Bootcamp Platform (1400+ lines) */}
                <Route 
                  path="/bootcamp-platform" 
                  element={
                    user ? (
                      user.bootcamp_access ? (
                        <BootcampPlatform user={user} />
                      ) : (
                        <Navigate to="/bootcamps" replace />
                      )
                    ) : (
                      <Navigate to="/auth?action=bootcamp" replace />
                    )
                  } 
                />
                
                {/* 404 - Catch all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
    </ErrorBoundary>
  );
}

// v20251208-cleanup
export default App;