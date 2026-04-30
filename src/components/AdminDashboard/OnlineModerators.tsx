import { Shield } from 'lucide-react';

export default function OnlineModerators() {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <Shield size={18} className="text-success" /> Модераторы онлайн
      </h2>
      <div className="space-y-3">
        {[
          { name: 'Елена Смирнова', role: 'Content Manager' },
          { name: 'Иван Петров', role: 'Tech Support' },
        ].map(mod => (
          <div key={mod.name} className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                {mod.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-surface-paper" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">{mod.name}</p>
              <p className="text-xs text-text-muted">{mod.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
