import { Briefcase, Users, Clock, UserCheck } from 'lucide-react';

interface EmployerStatsProps {
  totalJobs: number;
  totalApplications: number;
  pendingReview: number;
  hired: number;
}

export default function EmployerStats({
  totalJobs,
  totalApplications,
  pendingReview,
  hired,
}: EmployerStatsProps) {
  const items = [
    { label: 'Активные вакансии', value: totalJobs, icon: Briefcase, color: 'text-primary' },
    { label: 'Всего откликов', value: totalApplications, icon: Users, color: 'text-info' },
    { label: 'Ожидают проверки', value: pendingReview, icon: Clock, color: 'text-warning' },
    { label: 'Нанято', value: hired, icon: UserCheck, color: 'text-success' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {items.map(stat => (
        <div key={stat.label} className="gradient-card rounded-xl p-5 border border-border">
          <div className="flex items-center justify-between mb-2">
            <stat.icon size={20} className={stat.color} />
          </div>
          <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
          <p className="text-xs text-text-muted mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
