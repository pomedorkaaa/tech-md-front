import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Clock, AlertCircle, CheckCircle, Trophy, XCircle } from 'lucide-react';
import type { Application } from '../../types';

const statusConfig = {
  pending: { label: 'На рассмотрении', icon: Clock, color: 'text-warning bg-warning/10' },
  reviewed: { label: 'Просмотрено', icon: AlertCircle, color: 'text-info bg-info/10' },
  interview: { label: 'Интервью', icon: CheckCircle, color: 'text-success bg-success/10' },
  offer: { label: 'Оффер', icon: Trophy, color: 'text-primary bg-primary/10' },
  rejected: { label: 'Отказ', icon: XCircle, color: 'text-error bg-error/10' },
};

interface ApplicationsListProps {
  applications: Application[];
}

export default function ApplicationsList({ applications }: ApplicationsListProps) {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
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
            <div key={app.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors">
              <div>
                <h3 className="font-medium text-text-primary">{app.jobTitle}</h3>
                <p className="text-sm text-text-muted">{app.companyName} • {app.appliedAt}</p>
              </div>
              <div className="flex items-center gap-3">
                {app.testScore && (
                  <span className="text-sm text-text-secondary">{app.testScore}%</span>
                )}
                <span className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full font-medium ${status.color}`}>
                  <StatusIcon size={12} /> {status.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
