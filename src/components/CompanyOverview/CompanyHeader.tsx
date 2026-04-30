import type { Company } from '../../types';

interface CompanyHeaderProps {
  company: Company;
}

export default function CompanyHeader({ company }: CompanyHeaderProps) {
  return (
    <div className="glass-panel p-8">
      <h1 className="text-3xl font-display font-extrabold mb-2">{company?.name || 'Компания'}</h1>
      <p className="text-on-surface-variant text-lg">
        {company?.description}
      </p>
    </div>
  );
}
