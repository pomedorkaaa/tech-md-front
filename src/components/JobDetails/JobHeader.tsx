import { MapPin, Clock, Send, Bookmark } from 'lucide-react';
import type { Job } from '../../types';

interface JobHeaderProps {
  job: Job;
  onApplyClick: () => void;
}

export default function JobHeader({ job, onApplyClick }: JobHeaderProps) {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-3xl shrink-0">
          {job.company.logo}
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-text-primary mb-1">{job.title}</h1>
          <p className="text-text-secondary">{job.company.name}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-text-muted">
            <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {job.experience}</span>
            <span className="px-2 py-0.5 rounded-md bg-surface-elevated text-text-secondary text-xs">
              {job.type === 'remote' ? 'Удалённо' : job.type === 'hybrid' ? 'Гибрид' : 'Офис'}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-2xl font-bold text-text-primary">
            {job.salary.currency}{job.salary.min}–{job.salary.max}
          </p>
          <p className="text-sm text-text-muted">/месяц</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.techStack.map(tech => (
          <span key={tech} className="px-3 py-1 text-xs rounded-lg bg-primary/10 text-primary font-medium">
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onApplyClick}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
        >
          <Send size={16} /> Откликнуться
        </button>
        <button className="px-4 py-3 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors">
          <Bookmark size={18} />
        </button>
      </div>
    </div>
  );
}
