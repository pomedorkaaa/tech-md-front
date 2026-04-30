import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface-paper">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Логотип и описание */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white font-bold text-sm">
                TM
              </div>
              <span className="text-lg font-bold text-text-primary">
                Tech<span className="text-primary">Moldova</span>
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed">
              Платформа для IT-специалистов Молдовы. Найдите работу мечты и прокачайте навыки.
            </p>
          </div>

          {/* Платформа */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Платформа</h3>
            <ul className="space-y-2">
              {['Вакансии', 'Компании', 'Задачи', 'Песочница'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Компания</h3>
            <ul className="space-y-2">
              {['О нас', 'Для работодателей', 'Поддержка', 'Блог'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Правовая информация */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">Юридическая информация</h3>
            <ul className="space-y-2">
              {['Условия использования', 'Конфиденциальность', 'Cookie-файлы'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижняя линия */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © 2026 TechMoldova. Сделано для IT-сообщества Молдовы.
          </p>
          <div className="flex items-center gap-4 text-text-muted">
            <a href="#" className="hover:text-text-primary transition-colors text-lg">𝕏</a>
            <a href="#" className="hover:text-text-primary transition-colors text-sm font-bold">in</a>
            <a href="#" className="hover:text-text-primary transition-colors text-sm font-bold">GH</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
