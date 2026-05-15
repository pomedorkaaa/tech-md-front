import { Users, Building2, Briefcase } from 'lucide-react';
import type { Company } from '../../types';

interface CompanyDetailsWidgetProps {
  company: Company;
}

export default function CompanyDetailsWidget({ company }: CompanyDetailsWidgetProps) {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border space-y-4">
      <h3 className="text-lg font-bold text-text-primary">О компании</h3>
      <ul className="space-y-3 text-sm">
        {company.location && (
          <li className="flex items-center gap-2 text-text-secondary">
            <Building2 size={14} className="text-text-muted" /> {company.location}
          </li>
        )}
        {company.employeesCount && (
          <li className="flex items-center gap-2 text-text-secondary">
            <Users size={14} className="text-text-muted" /> {company.employeesCount} сотрудников
          </li>
        )}
        {company.openPositions != null && (
          <li className="flex items-center gap-2 text-text-secondary">
            <Briefcase size={14} className="text-text-muted" /> {company.openPositions} открытых вакансий
          </li>
        )}
      </ul>
      {company.techStack && company.techStack.length > 0 && (
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted mb-2">Стек</p>
          <div className="flex flex-wrap gap-1.5">
            {company.techStack.map(t => (
              <span key={t} className="px-2 py-1 text-xs rounded-md bg-surface-elevated text-text-secondary border border-border">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
