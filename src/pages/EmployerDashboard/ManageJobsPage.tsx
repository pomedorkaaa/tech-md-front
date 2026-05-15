import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, MapPin, Users } from 'lucide-react';
import { getJobs, deleteJob } from '../../services/api';
import type { Job } from '../../types';

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    getJobs()
      .then(setJobs)
      .catch(() => setJobs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    setError('');
    setDeletingId(id);
    try {
      await deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
      setConfirmId(null);
    } catch (err: any) {
      setError(err?.message || 'Не удалось удалить вакансию');
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
          <h1 className="text-3xl font-black text-text-primary mb-1">Мои вакансии</h1>
          <p className="text-sm text-text-secondary">Управление публикациями</p>
        </div>
        <Link
          to="/employer/jobs/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
        >
          <Plus size={16} /> Новая вакансия
        </Link>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-12 text-text-muted">Загрузка...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-text-muted text-sm">Нет вакансий — создайте первую</div>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <div
              key={job.id}
              className="gradient-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1 min-w-0">
                <Link
                  to={`/jobs/${job.id}`}
                  className="font-bold text-text-primary hover:text-primary transition-colors block truncate"
                >
                  {job.title}
                </Link>
                <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mt-1">
                  <span className="flex items-center gap-1">{job.company.name}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Users size={11} /> {job.applicantsCount ?? 0}</span>
                  <span className="text-primary font-semibold">
                    {job.salary.currency}{job.salary.min}–{job.salary.max}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {confirmId === job.id ? (
                  <>
                    <button
                      onClick={() => setConfirmId(null)}
                      disabled={deletingId === job.id}
                      className="px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-medium hover:bg-surface-elevated transition-colors disabled:opacity-60"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      disabled={deletingId === job.id}
                      className="px-3 py-1.5 rounded-lg bg-error text-white text-xs font-bold hover:bg-error/80 transition-colors disabled:opacity-60"
                    >
                      {deletingId === job.id ? 'Удаление...' : 'Удалить'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmId(job.id)}
                    className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors"
                    title="Удалить вакансию"
                  >
                    <Trash2 size={16} />
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
