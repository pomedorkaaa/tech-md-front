import { Send } from 'lucide-react';

export default function GlobalNotificationForm() {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary mb-2">Глобальное уведомление</h2>
      <p className="text-xs text-text-muted mb-4">
        Отправить системное сообщение всем активным пользователям и компаниям
      </p>
      <textarea
        placeholder="Текст уведомления..."
        rows={3}
        className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 resize-none mb-3"
      />
      <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
        <Send size={14} /> Отправить
      </button>
    </div>
  );
}
