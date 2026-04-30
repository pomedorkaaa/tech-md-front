import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import type { Job } from '../../types';

interface PremiumJobsListProps {
  jobs: Job[];
}

export default function PremiumJobsList({ jobs }: PremiumJobsListProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
          <Briefcase size={20} className="text-primary" />
          Премиум вакансии
        </h2>
        <Link to="/jobs" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">
          Все вакансии
        </Link>
      </div>

      <div className="space-y-3">
        {jobs.map(job => (
          <Link
            key={job.id}
            to={`/jobs/${job.id}`}
            className="group relative bg-charcoal rounded-2xl p-5 border border-border transition-all hover:border-primary/30 hover:bg-charcoal-light shadow-md block"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0 border border-primary/20 overflow-hidden text-sm font-black text-text-inverse dark:text-white/70">
                {job.company.name.substring(0,2).toUpperCase()}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 items-start">
                  <div>
                    <h3 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1.5 font-medium">
                      {job.company.name} • {job.location} • <span className="text-primary font-bold">{job.salary.currency}{job.salary.min}–{job.salary.max}</span>
                    </p>
                  </div>
                  {job.isHot && (
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary border border-primary/20">
                      HOT JOB
                    </span>
                  )}
                </div>
                
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.techStack.slice(0, 4).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded flex items-center bg-surface-elevated text-[10px] font-bold text-text-secondary border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border">
              <button className="w-full sm:w-auto sm:ml-auto justify-center sm:justify-end text-[13px] font-bold text-text-secondary hover:text-primary flex items-center gap-1.5 group/btn">
                Откликнуться <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
