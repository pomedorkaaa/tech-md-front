import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const platformLinks = [
    { label: t('footer.jobs'), path: '/jobs' },
    { label: t('footer.companies'), path: '/companies' },
    { label: t('footer.sandbox'), path: '/sandbox' },
    { label: t('footer.blog'), path: '/blog' },
  ];

  const companyLinks = [
    { label: t('footer.about'), path: '/about' },
    { label: t('footer.employers'), path: '/employer' },
    { label: t('footer.support'), path: '/support' },
  ];

  const legalLinks = [
    { label: t('footer.terms'), path: '/terms' },
    { label: t('footer.privacy'), path: '/privacy' },
    { label: t('footer.cookies'), path: '/cookies' },
  ];

  return (
    <footer className="border-t border-border bg-surface-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              {t('footer.desc')}
            </p>
          </div>

          {/* Платформа */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">{t('footer.platform')}</h3>
            <ul className="space-y-2">
              {platformLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Компания */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Правовая информация */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.path} className="text-sm text-text-muted hover:text-text-primary transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Нижняя линия */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            {t('footer.copyright')}
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
