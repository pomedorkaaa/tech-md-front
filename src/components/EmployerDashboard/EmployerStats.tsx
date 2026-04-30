import { Briefcase, Users, Clock, UserCheck } from 'lucide-react';

export default function EmployerStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Активные вакансии', value: '12', icon: Briefcase, color: 'text-primary' },
        { label: 'Новые отклики', value: '48', icon: Users, color: 'text-info' },
        { label: 'Ожидают проверки', value: '5', icon: Clock, color: 'text-warning' },
        { label: 'Нанято в этом месяце', value: '3', icon: UserCheck, color: 'text-success' },
      ].map(stat => (
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
