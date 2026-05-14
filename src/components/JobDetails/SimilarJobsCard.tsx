import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Job } from '../../types';

interface SimilarJobsCardProps {
  similarJobs: Job[];
}

export default function SimilarJobsCard({ similarJobs }: SimilarJobsCardProps) {
  const { t } = useTranslation();

  if (similarJobs.length === 0) return null;

  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-bold text-text-primary mb-4">{t('job_details.similar_jobs')}</h3>
      <div className="space-y-3">
        {similarJobs.map(sj => (
          <Link
            key={sj.id}
            to={`/jobs/${sj.id}`}
            className="block p-3 rounded-lg bg-surface-elevated hover:bg-surface-overlay transition-colors group"
          >
            <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
              {sj.title}
            </h4>
            <p className="text-xs text-text-muted mt-1">{sj.company.name}</p>
            <p className="text-xs text-text-secondary mt-1">
              {sj.salary.currency}{sj.salary.min}–{sj.salary.max}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
