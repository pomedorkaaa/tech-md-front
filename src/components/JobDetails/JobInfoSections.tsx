import type { Job } from '../../types';

interface JobInfoSectionsProps {
  job: Job;
}

export default function JobInfoSections({ job }: JobInfoSectionsProps) {
  return (
    <>
      <div className="gradient-card rounded-xl p-6 border border-border">
        <h2 className="text-lg font-bold text-text-primary mb-4">О вакансии</h2>
        <p className="text-text-secondary leading-relaxed">{job.description}</p>
      </div>

      <div className="gradient-card rounded-xl p-6 border border-border">
        <h2 className="text-lg font-bold text-text-primary mb-4">Чем предстоит заниматься</h2>
        <ul className="space-y-2">
          {job.requirements.map((req, idx) => (
            <li key={idx} className="flex items-start gap-2 text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              {req}
            </li>
          ))}
        </ul>
      </div>

      <div className="gradient-card rounded-xl p-6 border border-border">
        <h2 className="text-lg font-bold text-text-primary mb-4">Мы предлагаем</h2>
        <ul className="space-y-2">
          {job.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-start gap-2 text-text-secondary">
              <span className="text-success">✓</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
