import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Trash2 } from 'lucide-react';
import type { Job } from '../../types';

interface ActiveJobsListProps {
  activeJobs: Job[];
  onDelete?: (id: string) => void;
  deletingId?: string | null;
}

export default function ActiveJobsList({ activeJobs, onDelete, deletingId }: ActiveJobsListProps) {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary">Активные вакансии</h2>
        <Link to="/employer/jobs" className="text-sm text-primary hover:text-primary-light flex items-center gap-1">
          Управлять <ArrowRight size={14} />
        </Link>
      </div>
      <div className="space-y-3">
        {activeJobs.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-6">Нет активных вакансий</p>
        ) : (
          activeJobs.map(job => (
            <div
              key={job.id}
              className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors gap-3"
            >
              <Link to={`/jobs/${job.id}`} className="flex-1 min-w-0">
                <h3 className="font-medium text-text-primary truncate">{job.title}</h3>
                <p className="text-xs text-text-muted mt-1">
                  {job.applicantsCount ?? 0} откликов
                  {job.createdAt ? ` • ${new Date(job.createdAt).toLocaleDateString()}` : ''}
                </p>
              </Link>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2 py-0.5 text-xs rounded-lg bg-success/10 text-success font-medium">
                  Активна
                </span>
                {onDelete && (
                  <button
                    onClick={() => onDelete(job.id)}
                    disabled={deletingId === job.id}
                    className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors disabled:opacity-60"
                    title="Удалить"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      <Link
        to="/employer/jobs/new"
        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-border text-text-muted hover:text-primary hover:border-primary/30 transition-colors text-sm"
      >
        <Plus size={16} /> Создать новую вакансию
      </Link>
    </div>
  );
}
