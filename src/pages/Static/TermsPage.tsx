import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden">
      <div className="flex items-center gap-2 mb-6"><FileText size={20} className="text-primary"/><h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Условия использования</h1></div>
      <div className="gradient-card rounded-xl p-6 sm:p-8 border border-border prose-sm text-text-secondary space-y-6">
        <p className="text-xs text-text-muted">Последнее обновление: 1 января 2026</p>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">1. Общие положения</h2><p>Настоящие Условия использования регулируют порядок использования платформы TechMoldova. Регистрируясь на платформе, вы соглашаетесь с данными условиями.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">2. Аккаунт пользователя</h2><p>Вы обязуетесь предоставить достоверную информацию при регистрации и поддерживать её в актуальном состоянии. Вы несёте ответственность за сохранность своих учётных данных.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">3. Использование платформы</h2><p>Платформа предоставляется «как есть». Запрещается использование платформы для рассылки спама, размещения заведомо ложной информации, а также любых действий, нарушающих законодательство Республики Молдова.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">4. Интеллектуальная собственность</h2><p>Весь контент платформы, включая дизайн, логотипы и алгоритмические задачи, является собственностью TechMoldova. Решения пользователей принадлежат их авторам.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">5. Ограничение ответственности</h2><p>TechMoldova не несёт ответственности за результаты трудоустройства, решения работодателей или убытки, связанные с использованием платформы.</p></section>
        <section><h2 className="text-lg font-bold text-text-primary mb-2">6. Контакты</h2><p>По всем вопросам: <a href="mailto:legal@techmoldova.md" className="text-primary hover:underline">legal@techmoldova.md</a></p></section>
      </div>
    </div>
  );
}
