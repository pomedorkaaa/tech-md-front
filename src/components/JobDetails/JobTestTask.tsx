import { Code, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Job } from '../../types';

interface JobTestTaskProps {
  testTask: Job['testTask'];
}

export default function JobTestTask({ testTask }: JobTestTaskProps) {
  const { t } = useTranslation();

  if (!testTask || testTask.type === 'none') return null;

  return (
    <div className="gradient-card rounded-xl p-6 border border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <Code size={18} className="text-primary" />
        <h2 className="text-lg font-bold text-text-primary">{t('job_details.test_task')}</h2>
      </div>
      <p className="text-text-secondary mb-3">{testTask.description}</p>
      <div className="flex items-center gap-3 text-sm">
        <span className={`px-2.5 py-1 rounded-lg font-medium ${
          testTask.difficulty === 'Easy' ? 'bg-success/10 text-success' :
          testTask.difficulty === 'Medium' ? 'bg-warning/10 text-warning' :
          'bg-error/10 text-error'
        }`}>{testTask.difficulty}</span>
        {testTask.timeLimit && (
          <span className="text-text-muted flex items-center gap-1">
            <Clock size={14} /> {testTask.timeLimit} {t('job_details.time_limit')}
          </span>
        )}
      </div>
    </div>
  );
}
