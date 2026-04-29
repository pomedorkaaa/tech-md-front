import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Settings, Mail, MapPin, Trophy, Code, Star, Edit3, ExternalLink, CheckCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Необходимо войти в аккаунт</h1>
        <Link to="/login" className="text-primary hover:text-primary-light">Перейти на страницу входа →</Link>
      </div>
    );
  }

  const initials = user.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 overflow-x-hidden">
      {/* Профиль */}
      <div className="gradient-card rounded-xl p-5 sm:p-8 border border-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl sm:text-3xl font-bold shrink-0 ring-4 ring-primary/10">
              {initials}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary">{user.name}</h1>
                {user.verified && <CheckCircle size={18} className="text-primary" />}
              </div>
              <p className="text-text-secondary">{user.title || 'Разработчик'}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-text-muted">
                <span className="flex items-center gap-1"><Mail size={14} /> {user.email}</span>
                {user.location && <span className="flex items-center gap-1"><MapPin size={14} /> {user.location}</span>}
              </div>
            </div>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors shrink-0"
            >
              <Edit3 size={14} /> Редактировать
            </Link>
          </div>
        </div>
      </div>

      {/* Статистика */}
      {user.role === 'candidate' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Coding Score', value: user.codingScore || 0, icon: Trophy, color: 'text-primary' },
            { label: 'Решено задач', value: user.solvedTasks || 0, icon: Code, color: 'text-success' },
            { label: 'Рейтинг', value: user.rank || '—', icon: Star, color: 'text-warning' },
            { label: 'Приглашения', value: 5, icon: Mail, color: 'text-info' },
          ].map(stat => (
            <div key={stat.label} className="gradient-card rounded-xl p-4 sm:p-5 border border-border text-center">
              <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
              <p className="text-xl sm:text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-[10px] sm:text-xs text-text-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Навыки */}
      <div className="gradient-card rounded-xl p-5 sm:p-6 border border-border">
        <h2 className="text-lg font-bold text-text-primary mb-4">Навыки и технологии</h2>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'Git', 'REST API', 'GraphQL'].map(skill => (
            <span key={skill} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Быстрые ссылки */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link to="/dashboard" className="gradient-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all group">
          <Trophy size={20} className="text-primary mb-3" />
          <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">Личный кабинет</h3>
          <p className="text-xs text-text-muted mt-1">Отклики, задачи, сохранённое</p>
        </Link>
        <Link to="/chat" className="gradient-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all group">
          <Mail size={20} className="text-info mb-3" />
          <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">Сообщения</h3>
          <p className="text-xs text-text-muted mt-1">3 непрочитанных диалога</p>
        </Link>
        <Link to="/settings" className="gradient-card rounded-xl p-5 border border-border hover:border-primary/30 transition-all group">
          <Settings size={20} className="text-warning mb-3" />
          <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">Настройки</h3>
          <p className="text-xs text-text-muted mt-1">Пароль, уведомления, тема</p>
        </Link>
      </div>
    </div>
  );
}
