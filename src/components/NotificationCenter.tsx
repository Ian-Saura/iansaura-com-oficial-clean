import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Trophy, Zap, Gift, Calendar, Star, ChevronRight } from 'lucide-react';

export interface AppNotification {
  id: string;
  type: 'achievement' | 'update' | 'reminder' | 'reward' | 'announcement';
  title: string;
  message: string;
  icon?: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const NOTIFICATIONS_KEY = 'ian-saura-notifications';

interface Props {
  onNotificationClick?: (notification: AppNotification) => void;
}

export const NotificationCenter: React.FC<Props> = ({ onNotificationClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Cargar notificaciones del localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(NOTIFICATIONS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      }
    } catch {
      // Ignore
    }
  }, []);

  // Guardar notificaciones
  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // Agregar notificación de bienvenida solo la primera vez (no cada vez que se vacía)
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('ian-saura-welcome-notification-shown');
    if (!hasSeenWelcome && notifications.length === 0) {
      const welcomeNotification: AppNotification = {
        id: 'welcome',
        type: 'announcement',
        title: '¡Bienvenido a la Academia! 🎉',
        message: 'Empezá por el Roadmap Nivel 1 para comenzar tu camino hacia Data Engineer.',
        timestamp: new Date(),
        read: false
      };
      setNotifications([welcomeNotification]);
      localStorage.setItem('ian-saura-welcome-notification-shown', 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getTypeIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'achievement': return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'update': return <Zap className="w-5 h-5 text-blue-400" />;
      case 'reminder': return <Calendar className="w-5 h-5 text-orange-400" />;
      case 'reward': return <Gift className="w-5 h-5 text-purple-400" />;
      case 'announcement': return <Star className="w-5 h-5 text-emerald-400" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Ahora';
    if (minutes < 60) return `Hace ${minutes}m`;
    if (hours < 24) return `Hace ${hours}h`;
    return `Hace ${days}d`;
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-700 transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-80 max-h-96 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl overflow-hidden z-50"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-slate-700">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notificaciones
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                      {unreadCount} nuevas
                    </span>
                  )}
                </h3>
                {notifications.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Marcar todo leído
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No hay notificaciones</p>
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-slate-800/30' : ''
                      }`}
                      onClick={() => {
                        markAsRead(notification.id);
                        if (onNotificationClick) {
                          onNotificationClick(notification);
                        }
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.icon ? (
                            <span className="text-xl">{notification.icon}</span>
                          ) : (
                            getTypeIcon(notification.type)
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium text-sm truncate ${
                              notification.read ? 'text-slate-300' : 'text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                            {notification.message}
                          </p>
                          <span className="text-xs text-slate-500 mt-1 block">
                            {formatTime(notification.timestamp)}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {notification.action && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            notification.action?.onClick();
                          }}
                          className="mt-2 ml-8 flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300"
                        >
                          {notification.action.label}
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-slate-700">
                  <button
                    onClick={clearAll}
                    className="w-full text-center text-xs text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    Limpiar todo
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// Hook para agregar notificaciones desde cualquier parte de la app
export function useNotifications() {
  const addNotification = (notification: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: AppNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };

    try {
      const saved = localStorage.getItem(NOTIFICATIONS_KEY);
      const current = saved ? JSON.parse(saved) : [];
      const updated = [newNotification, ...current].slice(0, 50); // Max 50 notifications
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(updated));
      
      // Disparar evento para actualizar otros componentes
      window.dispatchEvent(new CustomEvent('notification-added', { detail: newNotification }));
    } catch (err) {
      console.error('Error adding notification:', err);
    }
  };

  return { addNotification };
}

export default NotificationCenter;

