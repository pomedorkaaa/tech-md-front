import { Plus, ArrowRight } from 'lucide-react';
import type { Job } from '../../types';

interface ActiveJobsListProps {
  activeJobs: Job[];
}

export default function ActiveJobsList({ activeJobs }: ActiveJobsListProps) {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary">Активные вакансии</h2>
        <button className="text-sm text-primary hover:text-primary-light flex items-center gap-1">
          Показать все <ArrowRight size={14} />
        </button>
      </div>
      <div className="space-y-3">
        {activeJobs.map(job => (
          <div key={job.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors">
            <div>
              <h3 className="font-medium text-text-primary">{job.title}</h3>
              <p className="text-xs text-text-muted mt-1">{job.applicantsCount} откликов • {job.createdAt}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs rounded-lg bg-success/10 text-success font-medium">
                Активна
              </span>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-border text-text-muted hover:text-primary hover:border-primary/30 transition-colors text-sm">
        <Plus size={16} /> Создать новую вакансию
      </button>
    </div>
  );
}
