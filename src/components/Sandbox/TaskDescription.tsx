import { Building2, Users } from 'lucide-react';
import type { Task } from '../../types';

interface TaskDescriptionProps {
  task: Task;
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy:   'bg-success/15 text-success border-success/20',
  Medium: 'bg-warning/15 text-warning border-warning/20',
  Hard:   'bg-error/15 text-error border-error/20',
};

export default function TaskDescription({ task }: TaskDescriptionProps) {
  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5">
      <div>
        <div className="flex items-start gap-3 mb-3">
          <h1 className="text-xl font-black text-text-primary flex-1">{task.title}</h1>
          <span className={'px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border shrink-0 ' + (DIFFICULTY_STYLES[task.difficulty] ?? '')}>
            {task.difficulty}
          </span>
        </div>

        {task.companyName && (
          <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-elevated border border-border mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <Building2 size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary">{task.companyName}</p>
              <p className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                <Users size={11} /> {task.position}
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{task.description}</p>

      {task.examples.length > 0 && (
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Примеры</h3>
          <div className="space-y-3">
            {task.examples.map((ex, idx) => (
              <div key={idx} className="bg-surface-elevated rounded-xl p-4 border border-border">
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Вход:</div>
                <code className="text-sm text-primary font-mono">{ex.input}</code>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-3 mb-1">Выход:</div>
                <code className="text-sm text-success font-mono">{ex.output}</code>
                {ex.explanation && (
                  <p className="text-xs text-text-muted mt-2 italic border-t border-border pt-2">{ex.explanation}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {task.constraints.length > 0 && (
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Ограничения</h3>
          <ul className="space-y-1.5">
            {task.constraints.map((c, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-primary mt-1">•</span> {c}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
