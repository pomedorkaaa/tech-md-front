import { useState, useEffect } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { getNotifications, markNotificationRead } from '../../services/api';
import type { Notification } from '../../types';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getNotifications()
      .then(data => { if (mounted) setNotifications(data); })
      .catch(() => { if (mounted) setNotifications([]); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, isRead: true } : n)
      );
    } catch { /* noop */ }
  };

  const markAllRead = async () => {
    const unread = notifications.filter(n => !n.isRead);
    await Promise.allSettled(unread.map(n => markNotificationRead(n.id)));
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell size={24} className="text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">Уведомления</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary font-bold">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-light transition-colors"
          >
            <CheckCheck size={16} /> Прочитать все
          </button>
        )}
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
                    title="Прочитано"
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
