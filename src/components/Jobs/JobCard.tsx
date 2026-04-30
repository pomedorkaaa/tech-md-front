import { Link } from 'react-router-dom';
import { MapPin, Clock, Code, Flame } from 'lucide-react';
import type { Job } from '../../types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="group block gradient-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center text-2xl shrink-0">
            {job.company.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              {job.isHot && (
                <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-error/10 text-error">
                  <Flame size={10} /> Hot
                </span>
              )}
            </div>
            <p className="text-sm text-text-muted">{job.company.name}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="font-semibold text-text-primary">
            {job.salary.currency}{job.salary.min}–{job.salary.max}
          </p>
          <p className="text-xs text-text-muted">/месяц</p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
        <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
        <span className="flex items-center gap-1"><Clock size={12} /> {job.experience}</span>
        <span className="px-2 py-0.5 rounded-md bg-surface-elevated text-text-secondary">
          {job.type === 'remote' ? 'Удалённо' : job.type === 'hybrid' ? 'Гибрид' : 'Офис'}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {job.techStack.slice(0, 5).map(tech => (
            <span key={tech} className="px-2.5 py-1 text-xs rounded-md bg-surface-elevated text-text-secondary">
              {tech}
            </span>
          ))}
        </div>

        {job.testTask && job.testTask.type !== 'none' && (
          <div className="flex items-center gap-2 text-xs text-text-muted shrink-0">
            <Code size={12} />
            <span>{job.testTask.title}</span>
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
              job.testTask.difficulty === 'Easy' ? 'bg-success/10 text-success' :
              job.testTask.difficulty === 'Medium' ? 'bg-warning/10 text-warning' :
              'bg-error/10 text-error'
            }`}>{job.testTask.difficulty}</span>
          </div>
        )}
      </div>
    </Link>
  );
}
