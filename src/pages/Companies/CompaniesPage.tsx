import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { getCompanies } from '../../services/api';
import type { Company } from '../../types';
import CompanyCard from '../../components/Companies/CompanyCard';

export default function CompaniesPage() {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies()
      .then(setCompanies)
      .catch(() => setCompanies([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.description || '').toLowerCase().includes(q) ||
      (c.location || '').toLowerCase().includes(q)
    );
  }, [companies, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-text-primary">{t('nav.companies')}</h1>
        <p className="text-sm text-text-muted mt-1">
          {t('nav.companies_subtitle')}
        </p>
      </div>

      <div className="flex items-center bg-surface-paper border border-border rounded-xl px-4">
        <Search size={18} className="text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск компании по названию, описанию или городу"
          className="flex-1 bg-transparent px-3 py-3 text-text-primary placeholder:text-text-muted outline-none text-sm"
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-text-muted text-sm">Загрузка...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-text-muted text-sm">
          {companies.length === 0 ? 'Пока нет компаний' : 'Ничего не найдено по запросу'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}
