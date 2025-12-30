import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, CreditCard, Download, AlertTriangle, CheckCircle, 
  Calendar, Mail, User, Shield, ExternalLink, Clock,
  XCircle, Loader2, Play, Receipt, RefreshCw
} from 'lucide-react';

interface SettingsProps {
  user: any;
}

interface SubscriptionInfo {
  status: 'active' | 'trial' | 'cancelled' | 'expired' | 'none' | 'paused';
  is_oneinfinite: boolean;
  subscription_start?: string;
  subscription_end?: string;
  trial_days_left?: number;
  payment_type?: string;
  plan_type?: string;
  oneinfinite_subscription_id?: string;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  currency: string;
  product: string;
  status: 'completed' | 'refunded';
  source: string;
  receipt_url?: string;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const navigate = useNavigate();
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Payment history state
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [totalPaid, setTotalPaid] = useState(0);
  
  // Pause/resume state (for paused users only)
  const [pausing, setPausing] = useState(false);

  useEffect(() => {
    loadSubscriptionInfo();
    loadPaymentHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const loadPaymentHistory = async () => {
    if (!user?.email) return;
    
    setLoadingPayments(true);
    try {
      const res = await fetch(`/api/payment-history.php?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success) {
        setPayments(data.payments || []);
        setTotalPaid(data.total_paid || 0);
      }
    } catch (err) {
      console.error('Error loading payment history:', err);
    } finally {
      setLoadingPayments(false);
    }
  };

  const handleResumeSubscription = async () => {
    if (!user?.email) return;
    
    setPausing(true);
    try {
      const res = await fetch('/api/pause-subscription.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: user.email,
          action: 'resume'
        })
      });
      const data = await res.json();
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Tu suscripción ha sido reanudada.' });
        loadSubscriptionInfo();
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al reanudar.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Error de conexión.' });
    } finally {
      setPausing(false);
    }
  };

  const loadSubscriptionInfo = async () => {
    if (!user?.email) return;
    
    try {
      const res = await fetch(`/api/subscription-info.php?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success) {
        setSubscriptionInfo(data.subscription);
      }
    } catch (err) {
      console.error('Error loading subscription info:', err);
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('es-AR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const getStatusBadge = () => {
    if (!subscriptionInfo) return null;
    
    switch (subscriptionInfo.status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Activa
          </span>
        );
      case 'trial':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Período de prueba ({subscriptionInfo.trial_days_left} días)
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Cancelada (acceso hasta {formatDate(subscriptionInfo.subscription_end)})
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
            <Clock className="w-4 h-4" />
            Pausada
          </span>
        );
      case 'expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
            <XCircle className="w-4 h-4" />
            Expirada
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-500/20 text-slate-400 rounded-full text-sm font-medium">
            Sin suscripción
          </span>
        );
    }
  };

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Configuración | Ian Saura</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <div className="bg-slate-900/80 border-b border-slate-800 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/members')}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-slate-400" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">Configuración</h1>
                <p className="text-sm text-slate-400">Gestioná tu cuenta y suscripción</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          {/* Message */}
          {message && (
            <div className={`p-4 rounded-xl border ${
              message.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <div className="flex items-center gap-2">
                {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                {message.text}
              </div>
            </div>
          )}

          {/* Account Info */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-emerald-400" />
                Información de la cuenta
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400">Email</span>
                </div>
                <span className="text-white font-medium">{user.email}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400">Nombre</span>
                </div>
                <span className="text-white font-medium">{user.name || '-'}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-400">Proveedor de login</span>
                </div>
                <span className="text-white font-medium capitalize">{user.provider || 'Email'}</span>
              </div>
            </div>
          </div>

          {/* Subscription Info */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                Suscripción
              </h2>
            </div>
            
            {loading ? (
              <div className="p-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Estado</span>
                  {getStatusBadge()}
                </div>

                {subscriptionInfo && subscriptionInfo.status !== 'none' && (
                  <>
                    {/* Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                          <Calendar className="w-4 h-4" />
                          Fecha de inicio
                        </div>
                        <div className="text-white font-medium">
                          {formatDate(subscriptionInfo.subscription_start)}
                        </div>
                      </div>
                      <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/50">
                        <div className="flex items-center gap-2 text-slate-400 text-sm mb-1">
                          <Calendar className="w-4 h-4" />
                          {subscriptionInfo.status === 'trial' ? 'Fin del período de prueba' : 'Próxima renovación'}
                        </div>
                        <div className="text-white font-medium">
                          {formatDate(subscriptionInfo.subscription_end)}
                        </div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    {(subscriptionInfo.payment_type === 'gumroad' || subscriptionInfo.is_oneinfinite) && (
                      <div className="bg-pink-500/10 border border-pink-500/30 rounded-xl p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-pink-400" />
                          </div>
                          <div>
                            <div className="text-pink-400 font-medium">Pago automático activo</div>
                            <div className="text-slate-400 text-sm">Se renueva automáticamente con tu tarjeta</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3">
                      {/* Gumroad Portal - Facturas y gestión */}
                      {subscriptionInfo.payment_type === 'gumroad' && (
                        <a
                          href="https://app.gumroad.com/library"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between p-4 bg-pink-500/10 hover:bg-pink-500/20 rounded-xl border border-pink-500/30 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-pink-400" />
                            <div className="text-left">
                              <div className="text-white font-medium">Ver facturas y comprobantes</div>
                              <div className="text-slate-400 text-sm">Portal de Gumroad - Facturas oficiales</div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-pink-400" />
                        </a>
                      )}

                      {/* Manage payment method - Gumroad */}
                      {subscriptionInfo.payment_type === 'gumroad' && (
                        <a
                          href="https://app.gumroad.com/library"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between p-4 bg-slate-900/50 hover:bg-slate-900 rounded-xl border border-slate-700/50 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-slate-400 group-hover:text-pink-400 transition-colors" />
                            <div className="text-left">
                              <div className="text-white font-medium">Gestionar suscripción</div>
                              <div className="text-slate-500 text-sm">Cambiar tarjeta, pausar o cancelar</div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-500" />
                        </a>
                      )}

                      {/* Legacy OneInfinite Portal */}
                      {subscriptionInfo.is_oneinfinite && subscriptionInfo.payment_type !== 'gumroad' && (
                        <a
                          href="https://one.lat/portal"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-between p-4 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-xl border border-emerald-500/30 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <Download className="w-5 h-5 text-emerald-400" />
                            <div className="text-left">
                              <div className="text-white font-medium">Ver facturas anteriores</div>
                              <div className="text-slate-400 text-sm">Portal de OneInfinite (pagos anteriores)</div>
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-emerald-400" />
                        </a>
                      )}
                    </div>

                    {/* Pause/Resume Subscription */}
                    {subscriptionInfo.status === 'paused' ? (
                      <div className="pt-4">
                        <button
                          onClick={handleResumeSubscription}
                          disabled={pausing}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                        >
                          {pausing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                          Reanudar suscripción
                        </button>
                      </div>
                    ) : (subscriptionInfo.status === 'active' || subscriptionInfo.status === 'trial') && (
                      <div className="pt-4">
                        <p className="text-slate-500 text-xs">
                          ¿Necesitás pausar tu suscripción? Contactanos a{' '}
                          <a href="mailto:info@iansaura.com" className="text-amber-400 hover:underline">info@iansaura.com</a>
                          {' '}y lo gestionamos manualmente para que mantengas tu precio actual.
                        </p>
                      </div>
                    )}

                    {/* Cancel Subscription */}
                    {(subscriptionInfo.status === 'active' || subscriptionInfo.status === 'trial') && (
                      <div className="pt-6 border-t border-slate-700">
                        {!showCancelConfirm ? (
                          <button
                            onClick={() => setShowCancelConfirm(true)}
                            className="text-red-400 hover:text-red-300 text-sm transition-colors"
                          >
                            Cancelar suscripción
                          </button>
                        ) : (
                          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-5 space-y-4">
                            <div className="flex items-start gap-3">
                              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="text-red-400 font-semibold">¿Estás seguro?</h4>
                                <p className="text-slate-400 text-sm mt-1">
                                  Si cancelás, seguirás teniendo acceso hasta el {formatDate(subscriptionInfo.subscription_end)}.
                                  Después de esa fecha, perderás acceso al contenido premium.
                                </p>
                              </div>
                            </div>
                            
                            {/* Info about Gumroad cancellation */}
                            <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-4">
                              <p className="text-pink-300 text-sm">
                                <strong>📋 Para cancelar tu suscripción:</strong>
                              </p>
                              <ol className="text-slate-400 text-sm mt-2 space-y-1 list-decimal list-inside">
                                <li>Hacé click en "Ir a Gumroad" abajo</li>
                                <li>Iniciá sesión con el email que usaste para pagar</li>
                                <li>Buscá tu suscripción y seleccioná "Cancel subscription"</li>
                              </ol>
                            </div>

                            <div className="flex gap-3">
                              <button
                                onClick={() => setShowCancelConfirm(false)}
                                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                              >
                                Volver
                              </button>
                              <a
                                href="https://app.gumroad.com/library"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg transition-colors flex items-center justify-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Ir a Gumroad
                              </a>
                            </div>
                            
                            <p className="text-slate-500 text-xs text-center">
                              ¿Tenés problemas? Escribinos a{' '}
                              <a href="mailto:info@iansaura.com" className="text-amber-400 hover:underline">info@iansaura.com</a>
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* No subscription */}
                {(!subscriptionInfo || subscriptionInfo.status === 'none' || subscriptionInfo.status === 'expired') && (
                  <div className="text-center py-6">
                    <p className="text-slate-400 mb-4">No tenés una suscripción activa</p>
                    <Link
                      to="/suscripcion"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-colors"
                    >
                      Ver planes de suscripción
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Payment History */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-400" />
                Historial de Pagos
              </h3>
              <button
                onClick={loadPaymentHistory}
                disabled={loadingPayments}
                className="text-slate-400 hover:text-emerald-400 p-1"
              >
                <RefreshCw className={`w-4 h-4 ${loadingPayments ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            {loadingPayments ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
              </div>
            ) : payments.length > 0 ? (
              <>
                <div className="space-y-3 mb-4">
                  {payments.slice(0, 5).map((payment, idx) => (
                    <div 
                      key={payment.id || idx}
                      className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700/50"
                    >
                      <div>
                        <div className="text-white text-sm font-medium">
                          ${payment.amount.toFixed(2)} {payment.currency}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {new Date(payment.date).toLocaleDateString('es-AR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          payment.status === 'completed' 
                            ? 'bg-emerald-500/20 text-emerald-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {payment.status === 'completed' ? 'Completado' : 'Reembolsado'}
                        </span>
                        {payment.receipt_url && (
                          <a
                            href={payment.receipt_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-emerald-400"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-slate-400 text-sm pt-3 border-t border-slate-700">
                  Total pagado: <span className="text-emerald-400 font-medium">${totalPaid.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-slate-500 text-sm">
                No hay pagos registrados aún
              </div>
            )}
          </div>

          {/* Help */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6">
            <h3 className="text-white font-semibold mb-3">¿Necesitás ayuda?</h3>
            <p className="text-slate-400 text-sm mb-4">
              Si tenés algún problema con tu suscripción o necesitás una factura especial, 
              contactanos y te ayudamos.
            </p>
            <a
              href="mailto:info@iansaura.com?subject=Consulta sobre mi suscripción"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              info@iansaura.com
            </a>
          </div>
        </div>
      </div>

    </>
  );
};

export default Settings;

