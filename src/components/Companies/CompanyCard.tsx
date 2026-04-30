import { MapPin, Users, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Company } from '../../types';

interface CompanyCardProps {
  company: Company;
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group bg-charcoal rounded-2xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-xl bg-surface-elevated flex items-center justify-center text-3xl shrink-0 border border-border">
          {company.logo}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors truncate">
            {company.name}
          </h3>
          <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
            <MapPin size={12} />
            Кишинёв, Молдова
          </p>
        </div>
      </div>

      <p className="text-sm text-text-secondary mb-4 line-clamp-2">
        {company.description || 'Инновационная IT-компания с офисом в Кишинёве.'}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm text-text-secondary">
            <Users size={14} className="text-text-muted" />
            {company.openPositions} вакансий
          </span>
          <span className="flex items-center gap-1 text-sm text-warning">
            <Star size={14} />
            {company.rating}
          </span>
        </div>
        <Link
          to={`/jobs?company=${company.name}`}
          className="text-xs font-bold text-primary hover:text-primary-light flex items-center gap-1 transition-colors"
        >
          Вакансии <ExternalLink size={12} />
        </Link>
      </div>
    </div>
  );
}
