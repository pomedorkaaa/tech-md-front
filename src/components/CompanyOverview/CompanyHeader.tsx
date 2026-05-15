import { MapPin, Star, Globe } from 'lucide-react';
import type { Company } from '../../types';

interface CompanyHeaderProps {
  company: Company;
}

export default function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="gradient-card rounded-xl p-6 sm:p-8 border border-border">
      <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6">
        <div className="w-20 h-20 rounded-2xl bg-surface-elevated flex items-center justify-center text-4xl shrink-0 border border-border">
          {company.logo || '🏢'}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-black text-text-primary mb-2">{company.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted mb-3">
            {company.location && (
              <span className="flex items-center gap-1.5"><MapPin size={14} /> {company.location}</span>
            )}
            {company.rating != null && (
              <span className="flex items-center gap-1.5 text-warning">
                <Star size={14} fill="currentColor" /> {company.rating}
              </span>
            )}
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center gap-1.5 text-primary hover:underline"
              >
                <Globe size={14} /> Сайт
              </a>
            )}
          </div>
          {company.description && (
            <p className="text-text-secondary leading-relaxed">{company.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
