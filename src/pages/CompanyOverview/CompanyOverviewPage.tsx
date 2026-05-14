import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Company, Job } from '../../types';
import { getCompanyById, getJobs } from '../../services/api';
import CompanyHeader from '../../components/CompanyOverview/CompanyHeader';
import CompanyJobsList from '../../components/CompanyOverview/CompanyJobsList';
import CompanyDetailsWidget from '../../components/CompanyOverview/CompanyDetailsWidget';

export default function CompanyOverviewPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [company, setCompany] = useState<Company | null>(null);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getCompanyById(id).catch(() => null),
      getJobs().catch(() => [])
    ]).then(([c, jobs]) => {
      setCompany(c || null);
      setCompanyJobs(jobs.filter(j => String(j.company.id) === String(id)));
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">{t('profile.loading_profile') || 'Загрузка...'}</div>;
  }

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">{t('jobs.not_found') || 'Компания не найдена'}</h1>
        <Link to="/" className="text-primary hover:text-primary-light">← Вернуться на главную</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <CompanyHeader company={company as any} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CompanyJobsList jobs={companyJobs} />
        <CompanyDetailsWidget company={company as any} />
      </div>
    </div>
  );
}
