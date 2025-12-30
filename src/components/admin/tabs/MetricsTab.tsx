import React, { useState } from 'react';
import { 
  RefreshCw, AlertCircle, Mail, TrendingUp, Users, 
  Activity, Target, BarChart3, Calendar, Download, 
  DollarSign, Percent, Clock, Zap, Heart, HelpCircle, ChevronDown
} from 'lucide-react';

interface MetricsTabProps {
  analyticsMetrics: any;
  loadingMetrics: boolean;
  setSuccessMessage: (msg: string | null) => void;
  error?: string | null;
  loadRetentionMetrics: () => void;
}

// Status Guide Component
const StatusGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const statuses = [
    {
      status: 'active',
      payment_type: 'gumroad',
      label: '✅ Pago Gumroad',
      description: 'Usuario pagando via Gumroad. Se renueva automáticamente.',
      whenToUse: 'Se asigna automáticamente cuando pagan por Gumroad.',
      color: 'emerald'
    },
    {
      status: 'active',
      payment_type: 'oneinfinite',
      label: '✅ OneInfinite',
      description: 'Usuario de la membresía OneInfinite (hasta enero 2026).',
      whenToUse: 'Usuarios que vinieron de la promoción OneInfinite.',
      color: 'blue'
    },
    {
      status: 'trial',
      payment_type: 'trial_with_card',
      label: '🎁 Trial con Tarjeta',
      description: 'Trial de OneInfinite, se cobrará al finalizar. Sin banners.',
      whenToUse: 'Se asigna automáticamente via OneInfinite.',
      color: 'purple'
    },
    {
      status: 'trial',
      payment_type: 'trial_no_card',
      label: '⏳ Trial Manual',
      description: 'Trial manual sin tarjeta. Ve banners de suscripción.',
      whenToUse: 'Dar acceso temporal para probar la plataforma.',
      color: 'amber'
    },
    {
      status: 'active',
      payment_type: 'invited_permanent',
      label: '👑 Invitado Permanente',
      description: 'Acceso premium de por vida. Para colaboradores/amigos.',
      whenToUse: 'Colaboradores, mentores, casos especiales.',
      color: 'yellow'
    },
    {
      status: 'active',
      payment_type: 'invited_temporary',
      label: '🎟️ Invitado Temporal',
      description: 'Acceso premium temporal. Poner fecha de fin.',
      whenToUse: 'Acceso por tiempo limitado, promociones.',
      color: 'orange'
    },
    {
      status: 'cancelled',
      payment_type: '-',
      label: '❌ Cancelado',
      description: 'Usuario que canceló su suscripción.',
      whenToUse: 'Se asigna al cancelar en Gumroad o manualmente.',
      color: 'red'
    },
    {
      status: 'free',
      payment_type: 'free',
      label: '🆓 Free',
      description: 'Usuario registrado sin suscripción activa.',
      whenToUse: 'Estado por defecto o al remover acceso.',
      color: 'slate'
    }
  ];

  return (
    <details 
      className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl border border-slate-600 overflow-hidden"
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-700/30 transition-colors">
        <div className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <span className="font-semibold text-white">📋 Guía de Estados de Usuario</span>
          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Importante</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </summary>
      
      <div className="px-6 pb-6 pt-2 border-t border-slate-700">
        <p className="text-slate-400 text-sm mb-4">
          Usá esta guía para asignar correctamente los estados de suscripción:
        </p>
        
        <div className="grid gap-3">
          {statuses.map((s, idx) => (
            <div key={idx} className={`bg-${s.color}-500/10 border border-${s.color}-500/30 rounded-lg p-3`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white">{s.label}</span>
                    <code className="text-xs bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                      {s.status} / {s.payment_type}
                    </code>
                  </div>
                  <p className="text-slate-400 text-sm">{s.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Cuándo usar:</span>
                  <p className="text-xs text-slate-300 max-w-xs">{s.whenToUse}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
          <p className="text-amber-300 text-sm font-medium">⚠️ Importante:</p>
          <ul className="text-slate-400 text-sm mt-1 space-y-1">
            <li>• Si un usuario canceló en Gumroad pero querés darle más tiempo → <code className="text-emerald-400">invited_temporary</code></li>
            <li>• Si alguien pagó en Gumroad pero aparece como free → verificar email secundario</li>
            <li>• El cron NO desactiva automáticamente, solo notifica al admin</li>
          </ul>
        </div>
      </div>
    </details>
  );
};

// Metric Card Component
const MetricCard = ({ 
  label, 
  value, 
  subtext, 
  icon: Icon, 
  color = 'emerald',
  trend,
  trendValue
}: { 
  label: string; 
  value: string | number; 
  subtext?: string;
  icon?: React.ElementType;
  color?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}) => (
  <div className={`bg-${color}-500/10 rounded-xl p-4 border border-${color}-500/30`}>
    <div className="flex items-start justify-between">
      <div>
        <div className={`text-3xl font-bold text-${color}-400`}>{value}</div>
        <div className="text-slate-400 text-sm mt-1">{label}</div>
        {subtext && <div className="text-slate-500 text-xs mt-0.5">{subtext}</div>}
      </div>
      <div className="flex flex-col items-end gap-1">
        {Icon && <Icon className={`w-5 h-5 text-${color}-400`} />}
        {trend && trendValue && (
          <span className={`text-xs font-medium ${
            trend === 'up' ? 'text-emerald-400' : 
            trend === 'down' ? 'text-red-400' : 'text-slate-400'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        )}
      </div>
    </div>
  </div>
);

// Health Score Component
const HealthScore = ({ score }: { score: number }) => {
  const getColor = (s: number) => {
    if (s >= 80) return 'emerald';
    if (s >= 60) return 'amber';
    return 'red';
  };
  const color = getColor(score);
  const label = score >= 80 ? 'Excelente' : score >= 60 ? 'Bueno' : 'Necesita atención';
  
  return (
    <div className={`bg-gradient-to-br from-${color}-500/20 to-${color}-600/10 rounded-xl p-6 border border-${color}-500/30`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-slate-400 text-sm mb-1">Health Score del Negocio</div>
          <div className="flex items-baseline gap-3">
            <span className={`text-5xl font-bold text-${color}-400`}>{score}</span>
            <span className="text-slate-400">/100</span>
          </div>
          <div className={`text-${color}-400 text-sm mt-1`}>{label}</div>
        </div>
        <Heart className={`w-16 h-16 text-${color}-400/30`} />
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-400 transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

export const MetricsTab: React.FC<MetricsTabProps> = ({ 
  analyticsMetrics, 
  loadingMetrics, 
  setSuccessMessage,
  error,
  loadRetentionMetrics
}) => {
  if (loadingMetrics) {
  return (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
                  </div>
    );
  }

  if (!analyticsMetrics) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 mb-4">No se pudieron cargar las métricas.</div>
        {error && (
          <div className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 max-w-md mx-auto">
            {error}
          </div>
        )}
        <button 
          onClick={loadRetentionMetrics} 
          className="text-emerald-400 hover:underline px-4 py-2 bg-emerald-500/20 rounded-lg hover:bg-emerald-500/30 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  const { overview, revenue, funnel, churn_analysis, engagement, cohorts, trends, alerts, user_segments, quick_actions } = analyticsMetrics;

  return (
    <div className="space-y-6">
      {/* Status Guide */}
      <StatusGuide />

      {/* Health Score + Key SaaS Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        {revenue?.health_score !== undefined && (
          <HealthScore score={revenue.health_score} />
        )}
        
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-3">
          <MetricCard 
            label="MRR" 
            value={`$${(revenue?.mrr || 0).toLocaleString()}`}
            subtext="Monthly Recurring Revenue"
            icon={DollarSign}
            color="emerald"
            trend={revenue?.mrr_growth_rate > 0 ? 'up' : revenue?.mrr_growth_rate < 0 ? 'down' : 'stable'}
            trendValue={`${revenue?.mrr_growth_rate || 0}%`}
          />
          <MetricCard 
            label="LTV" 
            value={`$${revenue?.ltv || 0}`}
            subtext="Lifetime Value"
            icon={Target}
            color="blue"
          />
          <MetricCard 
            label="Churn" 
            value={`${revenue?.monthly_churn_rate || 0}%`}
            subtext="Mensual"
            icon={Percent}
            color={revenue?.monthly_churn_rate > 5 ? 'red' : 'amber'}
          />
          <MetricCard 
            label="NRR" 
            value={`${revenue?.nrr || 100}%`}
            subtext="Net Revenue Retention"
            icon={TrendingUp}
            color={revenue?.nrr >= 100 ? 'emerald' : 'amber'}
          />
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          📊 Engagement & Activity
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-cyan-400">{revenue?.dau || 0}</div>
            <div className="text-slate-400 text-xs">DAU (hoy)</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{revenue?.wau || 0}</div>
            <div className="text-slate-400 text-xs">WAU (7 días)</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{revenue?.mau || 0}</div>
            <div className="text-slate-400 text-xs">MAU (30 días)</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <div className={`text-2xl font-bold ${revenue?.stickiness > 15 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {revenue?.stickiness || 0}%
            </div>
            <div className="text-slate-400 text-xs">Stickiness (DAU/MAU)</div>
          </div>
          <div className="bg-slate-900/50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-amber-400">{engagement?.avg_xp || 0}</div>
            <div className="text-slate-400 text-xs">XP Promedio</div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <MetricCard label="Usuarios Totales" value={overview?.total_users || 0} icon={Users} color="slate" />
        <MetricCard label="Subs Pagos" value={revenue?.paid_subscribers || 0} icon={DollarSign} color="emerald" />
        <MetricCard label="En Trial" value={overview?.trial_subscribers || 0} icon={Clock} color="purple" />
        <MetricCard label="Free" value={overview?.free_users || 0} icon={Users} color="blue" />
        <MetricCard 
          label="Conversión Trial→Pago" 
          value={`${revenue?.trial_conversion_rate || 0}%`} 
          icon={Target} 
          color={revenue?.trial_conversion_rate > 15 ? 'emerald' : 'amber'} 
        />
      </div>

                    {/* Quick Actions */}
      {quick_actions?.length > 0 && (
                      <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-xl p-4 border border-violet-500/30">
                        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" />
            Quick Actions
                        </h3>
                        <div className="flex flex-wrap gap-2">
            {quick_actions.map((action: any) => (
                            <button
                              key={action.id}
                              onClick={() => {
                  const alert = alerts?.find((a: any) => a.action_id === action.id);
                                if (alert?.users) {
                                  const emails = alert.users.map((u: any) => u.email).join(', ');
                                  navigator.clipboard.writeText(emails);
                                  setSuccessMessage(`📋 ${alert.users.length} emails copiados al portapapeles`);
                                  setTimeout(() => setSuccessMessage(null), 3000);
                                } else {
                                  setSuccessMessage(`⚠️ No hay usuarios para esta acción`);
                                  setTimeout(() => setSuccessMessage(null), 3000);
                                }
                              }}
                              className="px-3 py-2 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg text-sm text-slate-300 hover:text-white transition-colors flex items-center gap-2"
                              title={action.description}
                            >
                              <span>{action.icon}</span>
                              <span>{action.title}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

      {/* Alerts Section */}
      {alerts?.length > 0 && (
                      <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-400" />
            ⚠️ Alertas y Acciones Pendientes
          </h3>
          {alerts.map((alert: any, idx: number) => (
                          <details key={idx} className={`rounded-xl border overflow-hidden ${
                            alert.type === 'danger' ? 'bg-red-500/10 border-red-500/30' :
                            alert.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30' :
                            'bg-blue-500/10 border-blue-500/30'
                          }`}>
                            <summary className="p-4 cursor-pointer flex items-start gap-3 hover:bg-slate-800/20">
                              <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                                alert.type === 'danger' ? 'text-red-400' :
                                alert.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-white flex items-center gap-2">
                                  {alert.title}
                                  {alert.users?.length > 0 && (
                                    <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full text-slate-300">
                                      {alert.users.length} usuarios
                                    </span>
                                  )}
                                </div>
                                <div className="text-slate-400 text-sm">{alert.message}</div>
                              </div>
                              {alert.users?.length > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const emails = alert.users.map((u: any) => u.email).join(', ');
                                    navigator.clipboard.writeText(emails);
                                    setSuccessMessage(`📋 ${alert.users.length} emails copiados`);
                                    setTimeout(() => setSuccessMessage(null), 3000);
                                  }}
                                  className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs text-white flex items-center gap-1"
                                >
                                  <Mail className="w-3 h-3" />
                                  Copiar emails
                                </button>
                              )}
                            </summary>
                            
                            {alert.users?.length > 0 && (
                              <div className="px-4 pb-4 border-t border-slate-700/50">
                                <div className="mt-3 max-h-60 overflow-y-auto space-y-1">
                                  <div className="grid grid-cols-12 gap-2 text-xs text-slate-500 font-medium pb-2 border-b border-slate-700/50 sticky top-0 bg-slate-900/80">
                                    <div className="col-span-4">Email</div>
                                    <div className="col-span-2">Nombre</div>
                                    <div className="col-span-1 text-center">XP</div>
                                    <div className="col-span-2">Status</div>
                                    <div className="col-span-3">Info</div>
                                  </div>
                                  {alert.users.map((user: any, userIdx: number) => (
                                    <div key={userIdx} className="grid grid-cols-12 gap-2 text-sm py-2 border-b border-slate-800/50 hover:bg-slate-800/30">
                                      <div className="col-span-4 text-slate-300 truncate" title={user.email}>{user.email}</div>
                                      <div className="col-span-2 text-slate-400 truncate">{user.name || '-'}</div>
                                      <div className="col-span-1 text-center">
                                        <span className={`font-medium ${(user.xp || 0) > 500 ? 'text-emerald-400' : (user.xp || 0) > 100 ? 'text-amber-400' : 'text-red-400'}`}>
                                          {user.xp || 0}
                                        </span>
                                      </div>
                                      <div className="col-span-2">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                          user.status === 'active' || user.subscription_status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                                          user.status === 'trial' || user.subscription_status === 'trial' ? 'bg-purple-500/20 text-purple-400' :
                                          'bg-slate-500/20 text-slate-400'
                                        }`}>
                                          {user.status || user.subscription_status || 'free'}
                                        </span>
                                      </div>
                                      <div className="col-span-3 text-slate-500 text-xs">
                                        {user.days_subscribed && <span>📅 {user.days_subscribed}d suscrito</span>}
                                        {user.days_inactive && <span>⏰ {user.days_inactive}d inactivo</span>}
                                        {user.days_left !== undefined && <span>⏳ {user.days_left}d restantes</span>}
                                        {user.streak > 0 && <span className="text-amber-400">🔥 {user.streak}</span>}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                                
                                <div className="mt-3 flex gap-2">
                                  <button
                                    onClick={() => {
                                      const csv = [
                                        ['Email', 'Nombre', 'XP', 'Status', 'Días'].join(','),
                                        ...alert.users.map((u: any) => [
                                          u.email,
                                          u.name || '',
                                          u.xp || 0,
                                          u.status || u.subscription_status || 'free',
                                          u.days_subscribed || u.days_inactive || ''
                                        ].join(','))
                                      ].join('\n');
                                      const blob = new Blob([csv], { type: 'text/csv' });
                                      const url = URL.createObjectURL(blob);
                                      const a = document.createElement('a');
                                      a.href = url;
                                      a.download = `${alert.action_id || 'users'}_${new Date().toISOString().split('T')[0]}.csv`;
                                      a.click();
                                    }}
                                    className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-xs text-emerald-400 flex items-center gap-1"
                                  >
                                    <Download className="w-3 h-3" />
                                    Exportar CSV
                                  </button>
                                </div>
                              </div>
                            )}
                          </details>
                        ))}
                      </div>
                    )}

                    {/* Trends - Week over Week */}
      {trends && (
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-emerald-400" />
                          📈 Tendencias (vs semana anterior)
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(trends).map(([key, data]: [string, any]) => (
                            <div key={key} className="bg-slate-900/50 rounded-lg p-4">
                              <div className="text-slate-400 text-xs uppercase mb-1">
                                {key === 'registrations' ? 'Registros' : 
                                 key === 'new_subscribers' ? 'Nuevos Subs' :
                                 key === 'cancellations' ? 'Cancelaciones' : 'Activos'}
                              </div>
                              <div className="flex items-end gap-2">
                                <span className="text-2xl font-bold text-white">{data.this_week}</span>
                                <span className={`text-sm font-medium flex items-center ${
                                  key === 'cancellations' 
                                    ? (data.trend === 'down' ? 'text-emerald-400' : data.trend === 'up' ? 'text-red-400' : 'text-slate-400')
                                    : (data.trend === 'up' ? 'text-emerald-400' : data.trend === 'down' ? 'text-red-400' : 'text-slate-400')
                                }`}>
                                  {data.trend === 'up' ? '↑' : data.trend === 'down' ? '↓' : '→'} {Math.abs(data.change_percent)}%
                                </span>
                              </div>
                              <div className="text-slate-500 text-xs">Semana anterior: {data.last_week}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Full Funnel */}
      {funnel && (
                      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/30">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-blue-400" />
                          🎯 Funnel Completo (30 días)
                        </h3>
                        
                        <div className="space-y-3 mb-6">
            {funnel.steps?.map((step: any, idx: number) => {
              const maxValue = funnel.steps[0]?.value || 1;
                            const percent = Math.round((step.value / maxValue) * 100);
                            return (
                              <div key={idx} className="flex items-center gap-4">
                                <div className="w-48 text-slate-300 text-sm flex items-center gap-2">
                                  <span>{step.icon}</span>
                                  <span>{step.name}</span>
                                </div>
                                <div className="flex-1">
                                  <div className="h-8 bg-slate-700/50 rounded-lg overflow-hidden relative">
                                    <div 
                                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                                      style={{ width: `${Math.max(percent, 2)}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-between px-3">
                                      <span className="text-white font-medium">{step.value.toLocaleString()}</span>
                                      <span className="text-slate-300 text-sm">{percent}%</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Conversion Rates */}
                        <div className="grid grid-cols-5 gap-3 pt-4 border-t border-slate-700">
            {Object.entries(funnel.conversion_rates || {}).map(([key, value]: [string, any]) => (
                            <div key={key} className="text-center">
                              <div className={`text-xl font-bold ${value >= 20 ? 'text-emerald-400' : value >= 10 ? 'text-amber-400' : 'text-red-400'}`}>
                                {value}%
                              </div>
                              <div className="text-slate-500 text-xs">
                                {key === 'click_to_register' ? 'Click→Reg' :
                                 key === 'register_to_level0' ? 'Reg→L0' :
                                 key === 'level0_to_trial' ? 'L0→Trial' :
                                 key === 'trial_to_paid' ? 'Trial→Pago' : 'Total'}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* User Segments */}
      {user_segments && (
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-purple-400" />
                          👥 Segmentos de Usuarios
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-slate-400 text-sm font-medium mb-3">Por Engagement (XP)</div>
                            <div className="space-y-2">
                {user_segments.by_engagement?.map((seg: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center bg-slate-900/50 rounded-lg px-3 py-2">
                                  <span className="text-slate-300 text-sm">{seg.segment}</span>
                                  <span className="text-white font-bold">{seg.count}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-slate-400 text-sm font-medium mb-3">Por Suscripción</div>
                            <div className="space-y-2">
                {user_segments.by_subscription?.map((seg: any, idx: number) => (
                                <div key={idx} className="flex justify-between items-center bg-slate-900/50 rounded-lg px-3 py-2">
                                  <span className="text-slate-300 text-sm">{seg.segment}</span>
                                  <span className="text-white font-bold">{seg.count}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Potential Upgrades */}
          {user_segments.potential_upgrades?.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-700">
                            <div className="text-slate-400 text-sm font-medium mb-2">🎯 Leads potenciales (Free con alto engagement):</div>
                            <div className="max-h-40 overflow-y-auto space-y-1">
                {user_segments.potential_upgrades.slice(0, 10).map((user: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between text-sm bg-emerald-500/10 border border-emerald-500/20 rounded px-3 py-2">
                                  <span className="text-slate-300">{user.email}</span>
                                  <div className="flex items-center gap-3">
                                    <span className="text-emerald-400">{user.xp} XP</span>
                                    {user.current_streak > 0 && <span className="text-amber-400">🔥 {user.current_streak}</span>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Cohort Analysis */}
      {cohorts?.by_registration_month?.length > 0 && (
                      <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-cyan-400" />
                          📊 Análisis de Cohortes
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left text-slate-400 text-sm border-b border-slate-700">
                                <th className="pb-3">Cohorte</th>
                                <th className="pb-3">Usuarios</th>
                                <th className="pb-3">Activos Hoy</th>
                                <th className="pb-3">Retención</th>
                                <th className="pb-3">Convertidos</th>
                                <th className="pb-3">Churned</th>
                              </tr>
                            </thead>
                            <tbody>
                {cohorts.by_registration_month.map((cohort: any) => {
                                const retentionRate = cohort.total_users > 0 ? Math.round((cohort.active_now / cohort.total_users) * 100) : 0;
                                return (
                                  <tr key={cohort.cohort} className="border-b border-slate-700/50">
                                    <td className="py-3 text-white font-medium">{cohort.cohort}</td>
                                    <td className="py-3 text-slate-300">{cohort.total_users}</td>
                                    <td className="py-3 text-slate-300">{cohort.active_now}</td>
                                    <td className="py-3">
                                      <span className={`font-medium ${retentionRate >= 50 ? 'text-emerald-400' : retentionRate >= 25 ? 'text-amber-400' : 'text-red-400'}`}>
                                        {retentionRate}%
                                      </span>
                                    </td>
                                    <td className="py-3 text-emerald-400">{cohort.converted}</td>
                                    <td className="py-3 text-red-400">{cohort.churned}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

      {/* Churn Analysis */}
      {churn_analysis && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-400" />
              ⚠️ Análisis de Churn
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Churn Rate (30d)</span>
                <span className={`font-bold text-xl ${churn_analysis.churn_rate_30d > 10 ? 'text-red-400' : churn_analysis.churn_rate_30d > 5 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {churn_analysis.churn_rate_30d}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Cancelaciones (7d)</span>
                <span className="text-red-400 font-bold">{churn_analysis.cancelled_7d}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Cancelaciones (30d)</span>
                <span className="text-red-400 font-bold">{churn_analysis.cancelled_30d}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Trials expirados sin convertir</span>
                <span className="text-amber-400 font-bold">{churn_analysis.trial_expired_not_converted}</span>
              </div>
            </div>

            {churn_analysis.churn_by_tenure?.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-slate-400 text-sm font-medium mb-2">Cuándo cancelan:</div>
                <div className="space-y-1">
                  {churn_analysis.churn_by_tenure.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-slate-300">{item.tenure}</span>
                      <span className="text-red-400">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-500/10 rounded-xl p-6 border border-amber-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-400" />
              👀 Usuarios en Riesgo
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">En riesgo (14-30d sin login)</span>
                <span className="text-amber-400 font-bold text-xl">{churn_analysis.at_risk_users}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Inactivos (30d+)</span>
                <span className="text-red-400 font-bold text-xl">{churn_analysis.inactive_users}</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
              <div className="text-slate-300 text-sm">💡 <strong>Acción sugerida:</strong></div>
              <div className="text-slate-400 text-xs mt-1">
                Enviar email de re-engagement a los {churn_analysis.at_risk_users} usuarios en riesgo
              </div>
            </div>
                    </div>
                      </div>
                    )}

      {/* Export All Metrics Button */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-700">
        <div className="text-slate-500 text-sm">
          Última actualización: {analyticsMetrics.generated_at}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              const dataStr = JSON.stringify(analyticsMetrics, null, 2);
              const blob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `metrics_${new Date().toISOString().split('T')[0]}.json`;
              a.click();
            }}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-white flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar JSON
          </button>
                    <button 
                      onClick={loadRetentionMetrics} 
            className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg text-sm text-emerald-400 flex items-center gap-2"
                    >
            <RefreshCw className="w-4 h-4" />
            Actualizar
                    </button>
                  </div>
      </div>
              </div>
  );
};

export default MetricsTab;
