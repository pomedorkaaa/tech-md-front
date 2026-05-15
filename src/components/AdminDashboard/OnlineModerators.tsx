import { useEffect, useState } from 'react';
import { Shield } from 'lucide-react';
import { getAdminUsers, type AuthUser } from '../../services/api';

export default function OnlineModerators() {
  const [mods, setMods] = useState<AuthUser[]>([]);

  useEffect(() => {
    getAdminUsers()
      .then(list => {
        const filtered = list.filter(u => u.role === 'Admin' || u.role === 'Employer');
        setMods(filtered.slice(0, 5));
      })
      .catch(() => setMods([]));
  }, []);

  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <Shield size={18} className="text-success" /> Модераторы и работодатели
      </h2>
      <div className="space-y-3">
        {mods.length === 0 ? (
          <p className="text-sm text-text-muted">Нет модераторов</p>
        ) : (
          mods.map(mod => (
            <div key={mod.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface-elevated">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  {mod.username.substring(0, 2).toUpperCase()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-surface-paper" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{mod.username}</p>
                <p className="text-xs text-text-muted">{mod.role}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
