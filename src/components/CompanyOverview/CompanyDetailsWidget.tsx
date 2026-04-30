import type { Company } from '../../types';

interface CompanyDetailsWidgetProps {
  company: Company;
}

export default function CompanyDetailsWidget({ company }: CompanyDetailsWidgetProps) {
  return (
    <div>
      <div className="surface-high p-6 rounded-lg">
        <h3 className="text-lg font-bold">О компании</h3>
        <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
          <li>Локация: {company?.location}</li>
          <li>Сотрудники: {company?.employeesCount}</li>
          <li>Стек: {company?.techStack?.join(', ')}</li>
        </ul>
      </div>
    </div>
  );
}
