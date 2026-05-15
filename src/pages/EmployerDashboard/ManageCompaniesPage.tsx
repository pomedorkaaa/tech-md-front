import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, MapPin } from 'lucide-react';
import { getCompanies, deleteCompany } from '../../services/api';
import type { Company } from '../../types';

export default function ManageCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getCompanies()
      .then(setCompanies)
      .catch(() => setCompanies([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    setError('');
    setDeletingId(id);
    try {
      await deleteCompany(id);
      setCompanies(prev => prev.filter(c => c.id !== id));
      setConfirmId(null);
    } catch (err: any) {
      setError(err?.message || 'Не удалось удалить компанию (возможно, есть связанные вакансии)');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/employer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Вернуться в панель
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-primary mb-1">Мои компании</h1>
          <p className="text-sm text-text-secondary">Управление профилями компаний</p>
        </div>
        <Link
          to="/employer/companies/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
        >
          <Plus size={16} /> Новая компания
        </Link>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-12 text-text-muted">Загрузка...</div>
      ) : companies.length === 0 ? (
        <div className="text-center py-12 text-text-muted text-sm">Нет компаний — добавьте первую</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map(company => (
            <div key={company.id} className="gradient-card rounded-xl p-5 border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-surface-elevated flex items-center justify-center text-2xl shrink-0 border border-border">
                  {company.logo || '🏢'}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/companies/${company.id}`} className="font-bold text-text-primary hover:text-primary transition-colors block truncate">
                    {company.name}
                  </Link>
                  <p className="text-xs text-text-muted flex items-center gap-1 mt-1">
                    <MapPin size={11} /> {company.location}
                  </p>
                </div>
              </div>
              {company.description && (
                <p className="text-xs text-text-secondary line-clamp-2 mb-3">{company.description}</p>
              )}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                {confirmId === company.id ? (
                  <>
                    <button
                      onClick={() => setConfirmId(null)}
                      disabled={deletingId === company.id}
                      className="px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-medium hover:bg-surface-elevated transition-colors disabled:opacity-60"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={() => handleDelete(company.id)}
                      disabled={deletingId === company.id}
                      className="px-3 py-1.5 rounded-lg bg-error text-white text-xs font-bold hover:bg-error/80 transition-colors disabled:opacity-60"
                    >
                      {deletingId === company.id ? 'Удаление...' : 'Удалить'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmId(company.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors text-xs"
                  >
                    <Trash2 size={14} /> Удалить
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
