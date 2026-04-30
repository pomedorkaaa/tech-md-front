import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden">
      <div className="flex items-center gap-2 mb-6"><Shield size={20} className="text-primary"/><h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Политика конфиденциальности</h1></div>
      <div className="gradient-card rounded-xl p-6 sm:p-8 border border-border prose-sm text-text-secondary space-y-6">
        <p className="text-xs text-text-muted">Последнее обновление: 1 января 2026</p>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">1. Сбор данных</h2><p>Мы собираем информацию, которую вы предоставляете при регистрации (имя, email, роль), а также данные о вашей активности на платформе (решённые задачи, отклики на вакансии).</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">2. Использование данных</h2><p>Ваши данные используются для: предоставления сервиса, подбора вакансий, формирования рейтинга, улучшения работы платформы.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">3. Передача данных</h2><p>Мы не передаём ваши данные третьим лицам, за исключением случаев: (а) ваш профиль виден работодателям, (б) по требованию закона.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">4. Хранение и защита</h2><p>Данные хранятся на защищённых серверах. Мы применяем шифрование и другие меры безопасности для защиты вашей информации.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">5. Ваши права</h2><p>Вы имеете право запросить копию своих данных, исправить их или потребовать удаления, обратившись по адресу <a href="mailto:privacy@techmoldova.md" className="text-primary hover:underline">privacy@techmoldova.md</a>.</p></section>
      </div>
    </div>
  );
}
