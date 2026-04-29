import { Trophy, FileText, Bookmark, TrendingUp, CheckCircle, Clock, XCircle, AlertCircle, ArrowRight } from 'lucide-react';
import mockData from './CandidateMockData.json';
const { currentUser, applications, savedSnippets, tasks } = mockData as any;
import { Link } from 'react-router-dom';

const statusConfig = {
  pending: { label: 'На рассмотрении', icon: Clock, color: 'text-warning bg-warning/10' },
  reviewed: { label: 'Просмотрено', icon: AlertCircle, color: 'text-info bg-info/10' },
  interview: { label: 'Интервью', icon: CheckCircle, color: 'text-success bg-success/10' },
  offer: { label: 'Оффер', icon: Trophy, color: 'text-primary bg-primary/10' },
  rejected: { label: 'Отказ', icon: XCircle, color: 'text-error bg-error/10' },
};

export default function CandidateDashboard() {
  const hardTask = tasks.find(t => t.difficulty === 'Hard');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
      {/* Профиль */}
      <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl sm:text-2xl font-bold shrink-0">
            {currentUser.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-bold text-text-primary">{currentUser.name}</h1>
              {currentUser.verified && (
                <CheckCircle size={18} className="text-primary" />
              )}
            </div>
            <p className="text-text-secondary text-sm sm:text-base">{currentUser.title}</p>
            <p className="text-xs sm:text-sm text-text-muted">
              Профиль подтвержден • {currentUser.location}
            </p>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-5 sm:mt-6">
          <div className="bg-surface-elevated rounded-xl p-3 sm:p-4 text-center">
            <p className="text-[10px] sm:text-xs text-text-muted mb-1">Coding Score</p>
            <p className="text-xl sm:text-2xl font-bold text-primary">{currentUser.codingScore}</p>
          </div>
          <div className="bg-surface-elevated rounded-xl p-3 sm:p-4 text-center">
            <p className="text-[10px] sm:text-xs text-text-muted mb-1">Решено задач</p>
            <p className="text-xl sm:text-2xl font-bold text-text-primary">{currentUser.solvedTasks}</p>
          </div>
          <div className="bg-surface-elevated rounded-xl p-3 sm:p-4 text-center">
            <p className="text-[10px] sm:text-xs text-text-muted mb-1">Текущий ранг</p>
            <p className="text-xl sm:text-2xl font-bold text-warning">{currentUser.rank}</p>
          </div>
          <div className="bg-surface-elevated rounded-xl p-3 sm:p-4 text-center">
            <p className="text-[10px] sm:text-xs text-text-muted mb-1">Приглашения</p>
            <p className="text-xl sm:text-2xl font-bold text-success">5</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Мои отклики */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2">
                <FileText size={18} /> Мои отклики
              </h2>
              <Link to="/jobs" className="text-sm text-primary hover:text-primary-light flex items-center gap-1">
                Все вакансии <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {applications.map(app => {
                const status = statusConfig[app.status];
                const StatusIcon = status.icon;
                return (
                  <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors gap-2 sm:gap-4">
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm sm:text-base text-text-primary truncate">{app.jobTitle}</h3>
                      <p className="text-xs sm:text-sm text-text-muted truncate">{app.companyName} • {app.appliedAt}</p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      {app.testScore && (
                        <span className="text-xs sm:text-sm text-text-secondary">{app.testScore}%</span>
                      )}
                      <span className={`flex items-center gap-1 px-2 sm:px-3 py-1 text-[10px] sm:text-xs rounded-full font-medium ${status.color}`}>
                        <StatusIcon size={12} /> {status.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Прокачка навыков */}
          {hardTask && (
            <div className="gradient-card rounded-xl p-4 sm:p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={18} className="text-primary" />
                <h2 className="text-base sm:text-lg font-bold text-text-primary">Прокачайте навыки</h2>
              </div>
              <p className="text-sm text-text-secondary mb-4">
                Ваш рейтинг растет! Решите задачу уровня Hard для получения бейджа "Алгоритмист".
              </p>
              <Link to={`/sandbox?task=${hardTask.id}`} className="block p-3 sm:p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors group">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-text-primary group-hover:text-primary transition-colors truncate">{hardTask.title}</h3>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      {hardTask.tags.map(tag => (
                        <span key={tag} className="text-xs text-text-muted">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-error/10 text-error shrink-0">{hardTask.difficulty}</span>
                </div>
              </Link>
            </div>
          )}
        </div>

        {/* Сохранённое */}
        <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border">
          <h2 className="text-base sm:text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
            <Bookmark size={18} /> Сохранённое
          </h2>
          <div className="space-y-3">
            {savedSnippets.map(snippet => (
              <div key={snippet.id} className="p-3 sm:p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors cursor-pointer">
                <div className="flex items-center gap-2 sm:gap-3 mb-2">
                  <span className="px-2 py-0.5 text-xs rounded font-mono font-bold bg-primary/10 text-primary">
                    {snippet.languageShort}
                  </span>
                  <h3 className="font-medium text-sm text-text-primary truncate">{snippet.title}</h3>
                </div>
                <p className="text-xs text-text-muted">{snippet.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
