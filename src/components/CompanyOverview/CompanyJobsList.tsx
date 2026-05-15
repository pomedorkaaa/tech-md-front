import { Link } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';
import type { Job } from '../../types';

interface CompanyJobsListProps {
  jobs: Job[];
}

export default function CompanyJobsList({ jobs }: CompanyJobsListProps) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
        <Briefcase size={20} className="text-primary" /> Открытые вакансии
      </h2>
      {jobs.length === 0 ? (
        <div className="gradient-card rounded-xl p-6 border border-border text-center text-sm text-text-muted">
          У компании пока нет открытых вакансий
        </div>
      ) : (
        jobs.map(job => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="block gradient-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted mt-1">
                  <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                  <span className="text-primary font-semibold">
                    {job.salary.currency}{job.salary.min}–{job.salary.max}
                  </span>
                </div>
                {job.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {job.techStack.slice(0, 5).map(tech => (
                      <span key={tech} className="px-2 py-0.5 text-xs rounded-md bg-surface-elevated text-text-secondary">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
