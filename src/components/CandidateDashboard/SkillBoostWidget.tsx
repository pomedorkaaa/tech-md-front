import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import type { Task } from '../../types';

interface SkillBoostWidgetProps {
  task?: Task;
}

export default function SkillBoostWidget({ task }: SkillBoostWidgetProps) {
  if (!task) return null;

  return (
    <div className="gradient-card rounded-xl p-6 border border-primary/20">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={18} className="text-primary" />
        <h2 className="text-lg font-bold text-text-primary">Прокачайте навыки</h2>
      </div>
      <p className="text-sm text-text-secondary mb-4">
        Ваш рейтинг растет! Решите задачу уровня Hard для получения бейджа "Алгоритмист".
      </p>
      <Link to={`/sandbox?task=${task.id}`} className="block p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors group">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">{task.title}</h3>
            <div className="flex gap-2 mt-1">
              {task.tags.map(tag => (
                <span key={tag} className="text-xs text-text-muted">{tag}</span>
              ))}
            </div>
          </div>
          <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-error/10 text-error">{task.difficulty}</span>
        </div>
      </Link>
    </div>
  );
}
