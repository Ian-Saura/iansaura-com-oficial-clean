import React from 'react';
import { 
  Search, Edit2, CheckCircle, XCircle, Crown, Gift, CreditCard, Clock, Users, X
} from 'lucide-react';
import { Subscriber } from '../types';

// User type configuration for clear categorization
const USER_TYPES = {
  invited_permanent: {
    label: '🎁 Invitado Permanente',
    shortLabel: 'Invitado ∞',
    color: 'violet',
    isPremium: true,
    description: 'Acceso premium sin fecha de expiración'
  },
  invited_temporary: {
    label: '🎁 Invitado Temporal',
    shortLabel: 'Invitado',
    color: 'purple',
    isPremium: true,
    description: 'Acceso premium con fecha de expiración'
  },
  invited: { // Legacy
    label: '🎁 Invitado',
    shortLabel: 'Invitado',
    color: 'violet',
    isPremium: true,
    description: 'Invitado (legacy)'
  },
  trial_with_card: {
    label: '💳 Trial Premium',
    shortLabel: 'Trial+Card',
    color: 'emerald',
    isPremium: true,
    description: 'Trial con tarjeta (sin carteles de pago)'
  },
  trial_no_card: {
    label: '⏳ Trial Free',
    shortLabel: 'Trial',
    color: 'amber',
    isPremium: false,
    description: 'Trial sin tarjeta (con carteles de pago)'
  },
  trial_free: { // Legacy
    label: '⏳ Trial Free',
    shortLabel: 'Trial',
    color: 'amber',
    isPremium: false,
    description: 'Trial gratis (legacy)'
  },
  trial_manual: { // Legacy
    label: '⏳ Trial Manual',
    shortLabel: 'Trial M',
    color: 'orange',
    isPremium: false,
    description: 'Trial manual (legacy)'
  },
  gumroad: {
    label: '💰 Gumroad',
    shortLabel: 'Gumroad',
    color: 'pink',
    isPremium: true,
    description: 'Pago via Gumroad'
  },
  oneinfinite: {
    label: '🔄 OneInfinite',
    shortLabel: 'OI',
    color: 'cyan',
    isPremium: true,
    description: 'OneInfinite (migrar antes 1/Ene)'
  },
  paid: {
    label: '💳 Pago Directo',
    shortLabel: 'Paid',
    color: 'green',
    isPremium: true,
    description: 'Pago directo'
  },
  external: {
    label: '🌐 Externo',
    shortLabel: 'Externo',
    color: 'blue',
    isPremium: true,
    description: 'Pago externo'
  },
  free: {
    label: '👤 Free User',
    shortLabel: 'Free',
    color: 'slate',
    isPremium: false,
    description: 'Usuario gratuito (nunca puso tarjeta)'
  }
} as const;

type PaymentType = keyof typeof USER_TYPES;

const getTypeConfig = (type: string | undefined | null) => {
  if (!type || type === '') {
    // Return a special "no type" config instead of defaulting to free
    return {
      label: '⚠️ Sin tipo',
      shortLabel: '⚠️ Sin tipo',
      color: 'red',
      isPremium: false,
      description: 'Usuario sin tipo asignado - necesita configuración'
    };
  }
  return USER_TYPES[type as PaymentType] || USER_TYPES.free;
};

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    violet: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
    emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    amber: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
    pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
    cyan: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
    green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
    slate: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30' },
    red: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' },
  };
  return colors[color] || colors.slate;
};

interface SubscribersTabProps {
  subscribers: Subscriber[];
  filteredSubscribers: Subscriber[];
  subscriberCounts: any;
  searchTerm: string;
  statusFilter: string;
  paymentTypeFilter: string;
  editingSubscriber: Subscriber | null;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: string) => void;
  setPaymentTypeFilter: (filter: string) => void;
  setEditingSubscriber: (subscriber: Subscriber | null) => void;
  handleUpdateSubscriber: (subscriber: Subscriber) => void | Promise<void>;
  handleBulkSetAccessType: (type: 'premium_invited' | 'premium_paid' | 'trial_card' | 'trial_free') => void | Promise<void>;
  handleBulkRemoveAccess: () => void | Promise<void>;
}

export const SubscribersTab: React.FC<SubscribersTabProps> = ({
  subscribers,
  filteredSubscribers,
  subscriberCounts,
  searchTerm,
  statusFilter,
  paymentTypeFilter,
  editingSubscriber,
  setSearchTerm,
  setStatusFilter,
  setPaymentTypeFilter,
  setEditingSubscriber,
  handleUpdateSubscriber,
}) => {
  // Calculate counts by type
  const countsByType = React.useMemo(() => {
    const counts: Record<string, number> = {};
    let noType = 0;
    subscribers.forEach(sub => {
      const type = sub.payment_type;
      if (!type) {
        noType++;
      } else {
        counts[type] = (counts[type] || 0) + 1;
      }
    });
    counts['_no_type'] = noType;
    return counts;
  }, [subscribers]);

  // OneInfinite users that need migration
  const oiUsers = subscribers.filter(s => s.payment_type === 'oneinfinite' || s.is_oneinfinite);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              💳 Gestión de Suscripciones
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Administra tipos de acceso, pagos y estados de usuarios
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30">
              <Crown className="w-4 h-4 inline mr-1" />
              {subscribers.filter(s => getTypeConfig(s.payment_type).isPremium && s.status === 'active').length} Premium
            </span>
            <span className="px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30">
              <Clock className="w-4 h-4 inline mr-1" />
              {subscriberCounts?.trials_active || 0} Trials
            </span>
            <span className="px-3 py-1.5 bg-slate-500/20 text-slate-400 rounded-lg border border-slate-500/30">
              <Users className="w-4 h-4 inline mr-1" />
              {subscribers.length} Total
            </span>
          </div>
        </div>
      </div>

      {/* OneInfinite Migration Alert */}
      {oiUsers.length > 0 && (
        <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/50">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🔄</div>
            <div className="flex-1">
              <h3 className="text-cyan-400 font-bold">Migración OneInfinite Pendiente</h3>
              <p className="text-slate-400 text-sm">
                <span className="text-cyan-300 font-bold">{oiUsers.length}</span> usuarios vencen el <span className="text-white font-bold">1 de Enero 2025</span>
              </p>
            </div>
            <button 
              onClick={() => setPaymentTypeFilter('oneinfinite')}
              className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors"
            >
              Ver usuarios OI
            </button>
          </div>
        </div>
      )}

      {/* User Types Legend */}
      <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
        <h3 className="text-sm font-bold text-slate-300 mb-3">
          📊 Tipos de Usuario ({subscribers.length} total)
          {statusFilter !== 'all' && <span className="text-amber-400 ml-2">(filtro: {statusFilter})</span>}
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
          {/* Show all types including legacy */}
          {Object.entries(USER_TYPES).map(([key, config]) => {
            const colors = getColorClasses(config.color);
            const count = countsByType[key] || 0;
            if (count === 0 && ['external', 'paid', 'invited_permanent', 'invited_temporary', 'trial_with_card', 'trial_no_card', 'free'].includes(key)) return null; // Hide empty types
            return (
              <button
                key={key}
                onClick={() => {
                  setStatusFilter('all'); // Reset status filter when clicking type
                  setPaymentTypeFilter(key);
                }}
                className={`p-2 rounded-lg border transition-all text-left ${colors.bg} ${colors.border} hover:scale-105 ${paymentTypeFilter === key ? 'ring-2 ring-white/50' : ''}`}
              >
                <div className={`text-lg font-bold ${colors.text}`}>{count}</div>
                <div className="text-xs text-slate-400 truncate">{config.shortLabel}</div>
              </button>
            );
          })}
          {/* Show users without payment_type */}
          {countsByType['_no_type'] > 0 && (
            <button
              onClick={() => {
                setStatusFilter('all');
                setPaymentTypeFilter('_no_type');
              }}
              className={`p-2 rounded-lg border transition-all text-left bg-red-500/20 border-red-500/30 hover:scale-105 ${paymentTypeFilter === '_no_type' ? 'ring-2 ring-white/50' : ''}`}
            >
              <div className="text-lg font-bold text-red-400">{countsByType['_no_type']}</div>
              <div className="text-xs text-slate-400 truncate">⚠️ Sin tipo</div>
            </button>
          )}
        </div>
        {/* Quick info */}
        <div className="mt-3 text-xs text-slate-500">
          💡 Click en un tipo para ver todos los usuarios de ese tipo (resetea filtro de estado)
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por email o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder:text-slate-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">📋 Todos ({subscribers.length})</option>
          <option value="active">✅ Activos ({subscribers.filter(s => s.status === 'active').length})</option>
          <option value="trial">⏳ En Trial ({subscribers.filter(s => s.status === 'trial').length})</option>
          <option value="cancelled">❌ Cancelados ({subscribers.filter(s => s.status === 'cancelled').length})</option>
          <option value="expired">💀 Expirados ({subscribers.filter(s => s.status === 'expired').length})</option>
          <option value="_no_status">⚠️ Sin status ({subscribers.filter(s => !s.status || s.status === '').length})</option>
        </select>
        <select
          value={paymentTypeFilter}
          onChange={(e) => setPaymentTypeFilter(e.target.value)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">🏷️ Todos los tipos</option>
          <optgroup label="Premium">
            <option value="invited_permanent">🎁 Invitado Permanente</option>
            <option value="invited_temporary">🎁 Invitado Temporal</option>
            <option value="trial_with_card">💳 Trial Premium (con card)</option>
            <option value="gumroad">💰 Gumroad</option>
            <option value="paid">💳 Pago Directo</option>
          </optgroup>
          <optgroup label="Free/Trial">
            <option value="trial_no_card">⏳ Trial Free (sin card)</option>
            <option value="free">👤 Free User</option>
          </optgroup>
          <optgroup label="Migración">
            <option value="oneinfinite">🔄 OneInfinite</option>
          </optgroup>
          <optgroup label="Legacy">
            <option value="invited">🎁 Invitado (legacy)</option>
            <option value="trial_free">⏳ Trial Free (legacy)</option>
            <option value="trial_manual">⏳ Trial Manual (legacy)</option>
          </optgroup>
          <optgroup label="Problemas">
            <option value="_no_type">⚠️ Sin tipo asignado</option>
          </optgroup>
        </select>
        {paymentTypeFilter !== 'all' && (
          <button
            onClick={() => setPaymentTypeFilter('all')}
            className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            title="Limpiar filtro"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        )}
      </div>

      {/* Subscribers Table */}
      <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr className="text-left text-slate-400 text-sm">
                <th className="p-4">Usuario</th>
                <th className="p-4">Tipo de Acceso</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Fechas</th>
                <th className="p-4">Discord</th>
                <th className="p-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    No se encontraron suscriptores con estos filtros
                  </td>
                </tr>
              ) : (
                filteredSubscribers.slice(0, 500).map(sub => {
                  const typeConfig = getTypeConfig(sub.payment_type);
                  const colors = getColorClasses(typeConfig.color);
                  
                  // Handle invalid dates (0000-00-00, null, etc)
                  const isValidDate = (dateStr: string | null | undefined) => {
                    if (!dateStr || dateStr.startsWith('0000')) return false;
                    const d = new Date(dateStr);
                    return !isNaN(d.getTime());
                  };
                  
                  const daysLeft = sub.days_left ?? (isValidDate(sub.subscription_end) 
                    ? Math.max(0, Math.ceil((new Date(sub.subscription_end!).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
                    : 0);
                  const isExpired = sub.status === 'expired' || sub.status === 'cancelled' || (isValidDate(sub.subscription_end) && daysLeft <= 0 && sub.status !== 'active');

                  return (
                    <tr key={sub.id} className="border-t border-slate-700/50 hover:bg-slate-800/50">
                      <td className="p-4">
                        <div>
                          <div className="text-white font-medium flex items-center gap-2">
                            {sub.name || sub.user_name || 'Sin nombre'}
                            {typeConfig.isPremium && <Crown className="w-3 h-3 text-amber-400" />}
                          </div>
                          <div className="text-slate-400 text-sm">{sub.email}</div>
                          {sub.secondary_email && (
                            <div className="text-slate-500 text-xs">Alt: {sub.secondary_email}</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text} ${colors.border} border`}>
                          {typeConfig.shortLabel}
                        </span>
                        {sub.payment_type === 'oneinfinite' && (
                          <div className="text-xs text-cyan-400 mt-1">⚠️ Migrar antes 1/Ene</div>
                        )}
                      </td>
                      <td className="p-4">
                        {isExpired ? (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400">
                            {sub.status === 'cancelled' ? '❌ Cancelado' : '💀 Expirado'}
                          </span>
                        ) : sub.is_trial || sub.status === 'trial' ? (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-amber-500/20 text-amber-400">
                            ⏳ Trial ({daysLeft}d)
                          </span>
                        ) : sub.status === 'active' || typeConfig.isPremium ? (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-500/20 text-emerald-400">
                            ✅ Activo
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-slate-500/20 text-slate-400">
                            {sub.status}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="text-slate-400 text-xs space-y-1">
                          {isValidDate(sub.subscription_start) && (
                            <div>📅 {new Date(sub.subscription_start!).toLocaleDateString()}</div>
                          )}
                          {isValidDate(sub.subscription_end) && (
                            <div className={daysLeft <= 7 && daysLeft > 0 ? 'text-amber-400' : daysLeft <= 0 ? 'text-red-400' : ''}>
                              🏁 {new Date(sub.subscription_end!).toLocaleDateString()}
                              {daysLeft > 0 && <span className="ml-1">({daysLeft}d)</span>}
                            </div>
                          )}
                          {(!isValidDate(sub.subscription_end)) && sub.payment_type === 'invited_permanent' && (
                            <div className="text-violet-400">∞ Permanente</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {sub.discord_connected ? (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            {sub.discord_username && (
                              <span className="text-xs text-slate-400 max-w-[80px] truncate">{sub.discord_username}</span>
                            )}
                          </div>
                        ) : (
                          <XCircle className="w-5 h-5 text-slate-500" />
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setEditingSubscriber(sub)}
                          className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-center text-slate-400 text-sm border-t border-slate-700">
          Mostrando {Math.min(500, filteredSubscribers.length)} de {filteredSubscribers.length} suscriptores
          {filteredSubscribers.length > 500 && <span className="text-amber-400 ml-2">(usá los filtros para ver más)</span>}
        </div>
      </div>

      {/* Edit Modal */}
      {editingSubscriber && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">✏️ Editar Suscriptor</h3>
              <button
                onClick={() => setEditingSubscriber(null)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Email (readonly) */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  value={editingSubscriber.email}
                  readOnly
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-400"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Nombre</label>
                <input
                  type="text"
                  value={editingSubscriber.name || ''}
                  onChange={(e) => setEditingSubscriber({ ...editingSubscriber, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Payment Type - Main selection */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Tipo de Acceso</label>
                <select
                  value={editingSubscriber.payment_type || 'free'}
                  onChange={(e) => setEditingSubscriber({ 
                    ...editingSubscriber, 
                    payment_type: e.target.value as Subscriber['payment_type'] 
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                >
                  <optgroup label="🏆 Premium (sin carteles de pago)">
                    <option value="invited_permanent">🎁 Invitado Permanente</option>
                    <option value="invited_temporary">🎁 Invitado Temporal</option>
                    <option value="trial_with_card">💳 Trial Premium (con tarjeta)</option>
                    <option value="gumroad">💰 Gumroad</option>
                    <option value="paid">💳 Pago Directo</option>
                    <option value="external">🌐 Externo</option>
                  </optgroup>
                  <optgroup label="⏳ Free/Trial (con carteles de pago)">
                    <option value="trial_no_card">⏳ Trial Free (sin tarjeta)</option>
                    <option value="free">👤 Free User</option>
                  </optgroup>
                  <optgroup label="🔄 Migración">
                    <option value="oneinfinite">🔄 OneInfinite (hasta 1/Ene)</option>
                  </optgroup>
                  <optgroup label="📦 Legacy (no usar para nuevos)">
                    <option value="invited">🎁 Invitado (legacy)</option>
                    <option value="trial_free">⏳ Trial Free (legacy)</option>
                    <option value="trial_manual">⏳ Trial Manual (legacy)</option>
                  </optgroup>
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  {getTypeConfig(editingSubscriber.payment_type).description}
                </p>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Estado</label>
                <select
                  value={editingSubscriber.status}
                  onChange={(e) => setEditingSubscriber({ ...editingSubscriber, status: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                >
                  <option value="active">✅ Activo</option>
                  <option value="trial">⏳ Trial</option>
                  <option value="cancelled">❌ Cancelado</option>
                  <option value="expired">💀 Expirado</option>
                  <option value="free">👤 Free</option>
                </select>
              </div>

              {/* Subscription End Date */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Fecha de Expiración</label>
                <input
                  type="date"
                  value={editingSubscriber.subscription_end ? editingSubscriber.subscription_end.split('T')[0] : ''}
                  onChange={(e) => setEditingSubscriber({ 
                    ...editingSubscriber, 
                    subscription_end: e.target.value 
                  })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Dejar vacío para acceso permanente (invitados permanentes)
                </p>
              </div>

              {/* Secondary Email */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Email Secundario</label>
                <input
                  type="email"
                  value={editingSubscriber.secondary_email || ''}
                  onChange={(e) => setEditingSubscriber({ ...editingSubscriber, secondary_email: e.target.value })}
                  placeholder="Email alternativo (si pagó con otro email)"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder:text-slate-600"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-slate-400 mb-1">Notas</label>
                <textarea
                  value={editingSubscriber.notes || ''}
                  onChange={(e) => setEditingSubscriber({ ...editingSubscriber, notes: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white h-24 resize-none"
                  placeholder="Notas internas sobre este usuario..."
                />
              </div>
            </div>

            {/* Current type indicator */}
            {(() => {
              const typeConfig = getTypeConfig(editingSubscriber.payment_type);
              const colors = getColorClasses(typeConfig.color);
              return (
                <div className={`mt-4 p-3 rounded-lg ${colors.bg} ${colors.border} border`}>
                  <div className="flex items-center gap-2">
                    {typeConfig.isPremium ? (
                      <Crown className={`w-4 h-4 ${colors.text}`} />
                    ) : (
                      <CreditCard className={`w-4 h-4 ${colors.text}`} />
                    )}
                    <span className={`font-medium ${colors.text}`}>
                      {typeConfig.isPremium ? 'Usuario Premium' : 'Usuario Free'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">
                    {typeConfig.isPremium 
                      ? 'No verá carteles de pago ni restricciones' 
                      : 'Verá carteles de pago y tendrá acceso limitado'}
                  </p>
                </div>
              );
            })()}

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingSubscriber(null)}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  handleUpdateSubscriber(editingSubscriber);
                  setEditingSubscriber(null);
                }}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
              >
                💾 Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribersTab;
