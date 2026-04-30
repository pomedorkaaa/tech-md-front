import { CheckCircle } from 'lucide-react';
import type { User } from '../../types';

interface ProfileHeaderProps {
  user: User;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold shrink-0">
        {user.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-bold text-text-primary">{user.name}</h1>
          {user.verified && (
            <CheckCircle size={18} className="text-primary" />
          )}
        </div>
        <p className="text-text-secondary">{user.title}</p>
        <p className="text-sm text-text-muted">
          Профиль подтвержден • {user.location}
        </p>
      </div>
    </div>
  );
}
