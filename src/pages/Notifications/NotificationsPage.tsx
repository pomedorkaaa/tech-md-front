import { useState, useEffect } from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { fetchApi } from '../../services/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await fetchApi<Notification[]>('/notifications');
      setNotifications(data);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      await fetchApi(`/notifications/${id}/read`, { method: 'POST' });
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    } catch { }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-surface-elevated rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Bell size={24} className="text-primary" />
        <h1 className="text-2xl font-bold text-text-primary">Уведомления</h1>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16">
          <Bell size={48} className="mx-auto text-text-muted mb-4" />
          <p className="text-text-muted">Нет уведомлений</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border transition-colors ${
                notification.isRead
                  ? 'bg-surface-paper border-border'
                  : 'bg-primary/5 border-primary/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className={`text-sm font-semibold ${notification.isRead ? 'text-text-secondary' : 'text-text-primary'}`}>
                    {notification.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">{notification.message}</p>
                  <p className="text-xs text-text-muted mt-2">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-2 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-primary transition-colors"
                  >
                    <Check size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
