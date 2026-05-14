import { MapPin, Users, Building2, Globe, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Job } from '../../types';

interface CompanyInfoCardProps {
  company: Job['company'];
}

export default function CompanyInfoCard({ company }: CompanyInfoCardProps) {
  const { t } = useTranslation();

  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-bold text-text-primary mb-4">{company.name}</h3>
      <p className="text-sm text-text-secondary mb-4">{company.description}</p>
      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-text-muted">
          <MapPin size={14} /> {company.location}
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <Users size={14} /> {company.employeesCount} {t('job_details.employees')}
        </div>
        <div className="flex items-center gap-2 text-text-muted">
          <Building2 size={14} /> {company.openPositions} {t('companies.open_positions')}
        </div>
        {company.website && (
          <a href={company.website} className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors">
            <Globe size={14} /> {t('job_details.company_info')} <ExternalLink size={12} />
          </a>
        )}
      </div>
      {company.rating && (
        <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
          <span className="text-warning">★</span>
          <span className="text-text-primary font-semibold">{company.rating}</span>
          <span className="text-xs text-text-muted">{t('companies.title')}</span>
        </div>
      )}
    </div>
  );
}
