import { Users, Briefcase, Code2, Cpu } from 'lucide-react';
import type { AdminStatsData } from '../../pages/AdminDashboard/AdminDashboardPage';

interface StatCardsProps {
  stats: AdminStatsData | null;
}

export default function StatCards({ stats }: StatCardsProps) {
  const items = [
    { label: 'Пользователи', value: stats?.totalUsers ?? 0, icon: Users, color: 'text-primary' },
    { label: 'Вакансии', value: stats?.totalJobs ?? 0, icon: Briefcase, color: 'text-info' },
    { label: 'Компании', value: stats?.totalCompanies ?? 0, icon: Code2, color: 'text-success' },
    { label: 'Логи', value: stats?.totalActivityLogs ?? 0, icon: Cpu, color: 'text-warning' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {items.map(stat => (
        <div key={stat.label} className="gradient-card rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-3">
            <stat.icon size={20} className={stat.color} />
            <span className="text-xs text-text-muted">{stat.label}</span>
          </div>
          <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
