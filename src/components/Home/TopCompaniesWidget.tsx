import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Company } from '../../types';

interface TopCompaniesWidgetProps {
  companies: Company[];
}

export default function TopCompaniesWidget({ companies }: TopCompaniesWidgetProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
          <Building2 size={20} className="text-primary" />
          {t('home.top_companies')}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {companies.length === 0 ? (
          <div className="col-span-2 md:col-span-5 text-center text-sm text-text-muted py-6">
            Пока нет компаний
          </div>
        ) : (
          companies.map(company => (
            <Link
              key={company.id}
              to={`/jobs?company=${company.name}`}
              className="group relative bg-charcoal rounded-2xl p-5 border border-border transition-all hover:border-primary/30 hover:bg-charcoal-light shadow-md text-center block"
            >
              <div className="text-3xl mb-3">{company.logo || '🏢'}</div>
              <h3 className="font-bold text-[13px] text-text-primary group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              {company.openPositions != null && (
                <p className="text-[11px] text-text-muted mt-1">{company.openPositions} {t('home.vacancies')}</p>
              )}
              {company.rating != null && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <span className="text-[10px] text-warning">★</span>
                  <span className="text-[11px] font-bold text-text-secondary">{company.rating}</span>
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
