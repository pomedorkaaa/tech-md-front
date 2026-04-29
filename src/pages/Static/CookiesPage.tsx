import { Cookie } from 'lucide-react';

export default function CookiesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden">
      <div className="flex items-center gap-2 mb-6"><Cookie size={20} className="text-primary"/><h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Политика Cookie</h1></div>
      <div className="gradient-card rounded-xl p-6 sm:p-8 border border-border prose-sm text-text-secondary space-y-6">
        <p className="text-xs text-text-muted">Последнее обновление: 1 января 2026</p>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">Что такое Cookie?</h2><p>Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">Какие Cookie мы используем</h2>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li><strong className="text-text-primary">Необходимые</strong> — для авторизации и безопасности сессии</li>
            <li><strong className="text-text-primary">Функциональные</strong> — для запоминания ваших предпочтений (тема, язык)</li>
            <li><strong className="text-text-primary">Аналитические</strong> — для анализа использования платформы</li>
          </ul>
        </section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">Управление Cookie</h2><p>Вы можете управлять Cookie в настройках вашего браузера. Отключение обязательных Cookie может повлиять на работу платформы.</p></section>
      </div>
    </div>
  );
}
