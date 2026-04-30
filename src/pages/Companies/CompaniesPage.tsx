import mockData from './CompaniesMockData.json';
import type { Company } from '../../types';
import CompanyCard from '../../components/Companies/CompanyCard';

const { companies } = mockData as { companies: Company[] };

export default function CompaniesPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Заголовок */}
      <div>
        <h1 className="text-3xl font-black text-text-primary">Компании</h1>
        <p className="text-sm text-text-muted mt-1">
          Лучшие IT-работодатели Молдовы
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
