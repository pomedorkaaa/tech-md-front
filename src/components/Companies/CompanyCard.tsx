import { MapPin, Users, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Company } from '../../types';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const { t } = useTranslation();

  return (
    <div className="group bg-charcoal rounded-2xl p-5 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col h-full">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-3xl shrink-0 border border-border group-hover:border-primary/20 transition-colors">
          {company.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors truncate">
            {company.name}
          </h3>
          <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
            <MapPin size={12} />
            Кишинёв, Молдова
          </p>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-3 flex-1">
        {company.description || 'Инновационная IT-компания с офисом в Кишинёве.'}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-sm text-text-secondary">
            <Users size={16} className="text-text-muted" />
            <span className="font-medium">{company.openPositions}</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-warning">
            <Star size={16} fill="currentColor" />
            <span className="font-medium">{company.rating}</span>
          </span>
        </div>
        <Link
          to={`/jobs?company=${company.name}`}
          className="text-sm font-semibold text-primary hover:text-primary-light flex items-center gap-1.5 transition-colors"
        >
          {t('companies.view_jobs')} <ExternalLink size={14} />
        </Link>
      </div>
    </div>
  );
}
