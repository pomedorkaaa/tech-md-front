import { useState } from 'react';
import { Send } from 'lucide-react';
import { broadcastNotification } from '../../services/api';

export default function GlobalNotificationForm() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setError('');
    setState('sending');
    try {
      await broadcastNotification(title.trim() || 'Уведомление от администрации', message.trim());
      setMessage('');
      setTitle('');
      setState('ok');
      setTimeout(() => setState('idle'), 2500);
    } catch (err: any) {
      setError(err?.message || 'Не удалось отправить');
      setState('error');
    }
  };

  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary mb-2">Глобальное уведомление</h2>
      <p className="text-xs text-text-muted mb-4">
        Отправить системное сообщение всем пользователям платформы
      </p>
      {error && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-2 text-error text-xs mb-3">{error}</div>
      )}
      {state === 'ok' && (
        <div className="bg-success/10 border border-success/30 rounded-lg p-2 text-success text-xs mb-3">Отправлено всем пользователям</div>
      )}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Заголовок (опционально)"
        className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 mb-3"
      />
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Текст уведомления..."
        rows={3}
        className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 resize-none mb-3"
      />
      <button
        onClick={handleSubmit}
        disabled={state === 'sending' || !message.trim()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        <Send size={14} /> {state === 'sending' ? 'Отправка...' : 'Отправить'}
      </button>
    </div>
  );
}
