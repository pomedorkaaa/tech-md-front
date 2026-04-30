import type { User } from '../../types';

interface StatsGridProps {
  user: User;
}

export default function StatsGrid({ user }: StatsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="bg-surface-elevated rounded-xl p-4 text-center">
        <p className="text-xs text-text-muted mb-1">Coding Score</p>
        <p className="text-2xl font-bold text-primary">{user.codingScore}</p>
      </div>
      <div className="bg-surface-elevated rounded-xl p-4 text-center">
        <p className="text-xs text-text-muted mb-1">Решено задач</p>
        <p className="text-2xl font-bold text-text-primary">{user.solvedTasks}</p>
      </div>
      <div className="bg-surface-elevated rounded-xl p-4 text-center">
        <p className="text-xs text-text-muted mb-1">Текущий ранг</p>
        <p className="text-2xl font-bold text-warning">{user.rank}</p>
      </div>
      <div className="bg-surface-elevated rounded-xl p-4 text-center">
        <p className="text-xs text-text-muted mb-1">Приглашения</p>
        <p className="text-2xl font-bold text-success">5</p>
      </div>
    </div>
  );
}
