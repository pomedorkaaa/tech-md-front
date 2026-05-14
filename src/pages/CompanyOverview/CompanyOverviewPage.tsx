import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Company, Job } from '../../types';
import { useMockData } from '../../hooks/useMockData';
import CompanyHeader from '../../components/CompanyOverview/CompanyHeader';
import CompanyJobsList from '../../components/CompanyOverview/CompanyJobsList';
import CompanyDetailsWidget from '../../components/CompanyOverview/CompanyDetailsWidget';

export default function CompanyOverviewPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  
  // Загружаем локализованные данные
  const { companies } = useMockData<{companies: Company[]}>('CompaniesMockData.json', { companies: [] });
  const { jobs } = useMockData<{jobs: Job[]}>('JobsMockData.json', { jobs: [] });
  
  // Ищем компанию в общем списке моковых данных
  const companyItem = companies.find((c: Company) => c.id === id);
  // Находим все вакансии этой компании
  const companyJobs = jobs.filter((j: Job) => String(j.company.id) === String(id) || j.company.name === companyItem?.name);

  if (!companyItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">{t('jobs.not_found') || 'Компания не найдена'}</h1>
        <Link to="/" className="text-primary hover:text-primary-light">← Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <CompanyHeader company={companyItem as any} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CompanyJobsList jobs={companyJobs} />
        <CompanyDetailsWidget company={companyItem as any} />
      </div>
    </div>
  );
}
