import { Users, Briefcase, Code2, Cpu } from 'lucide-react';

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { label: 'Пользователи', value: '1,248', icon: Users, color: 'text-primary' },
        { label: 'Вакансии', value: '856', icon: Briefcase, color: 'text-info' },
        { label: 'Решения', value: '3.4k', icon: Code2, color: 'text-success' },
        { label: 'CPU Load', value: '42%', icon: Cpu, color: 'text-warning' },
      ].map(stat => (
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
