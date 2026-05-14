import { useTranslation } from 'react-i18next';
import { useMockData } from '../../hooks/useMockData';
import type { Company } from '../../types';
import CompanyCard from '../../components/Companies/CompanyCard';

export default function CompaniesPage() {
  const { t } = useTranslation();
  const mockData = useMockData<{ companies: Company[] }>('CompaniesMockData.json', { companies: [] });
  const companies = mockData.companies || [];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-black text-text-primary">{t('nav.companies')}</h1>
        <p className="text-sm text-text-muted mt-1">
          {t('nav.companies_subtitle')}
        </p>
      </div>

      {/* Сетка компаний */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </div>
  );
}
