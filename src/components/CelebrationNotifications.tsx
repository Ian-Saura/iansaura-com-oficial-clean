import React from 'react';
import { CelebrationNotification } from '../hooks/useCelebration';

interface CelebrationNotificationsProps {
  notifications: CelebrationNotification[];
  onRemove: (id: string) => void;
}

export const CelebrationNotifications: React.FC<CelebrationNotificationsProps> = ({ 
  notifications, 
  onRemove 
}) => {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in-right"
          onClick={() => onRemove(notification.id)}
        >
          <div className="font-bold">{notification.title}</div>
          <div className="text-sm">{notification.description}</div>
        </div>
      ))}
    </div>
  );
};
