import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Clock, AlertCircle, CheckCircle, Trophy, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Application } from '../../types';

interface ApplicationsListProps {
  applications: Application[];
}

export default function ApplicationsList({ applications }: ApplicationsListProps) {
  const { t } = useTranslation();

  const statusConfig = {
    pending: { label: t('dashboard.status_pending'), icon: Clock, color: 'text-warning bg-warning/10' },
    reviewed: { label: t('dashboard.status_reviewed'), icon: AlertCircle, color: 'text-info bg-info/10' },
    interview: { label: t('dashboard.status_interview'), icon: CheckCircle, color: 'text-success bg-success/10' },
    offer: { label: t('dashboard.status_offer'), icon: Trophy, color: 'text-primary bg-primary/10' },
    rejected: { label: t('dashboard.status_rejected'), icon: XCircle, color: 'text-error bg-error/10' },
  };

  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
          <FileText size={18} /> {t('dashboard.my_applications')}
        </h2>
        <Link to="/jobs" className="text-sm text-primary hover:text-primary-light flex items-center gap-1">
          {t('dashboard.all_jobs')} <ArrowRight size={14} />
        </Link>
      </div>
      <div className="space-y-3">
        {applications.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-6">Вы ещё не отправляли отклики</p>
        ) : (
          applications.map(app => {
            const status = statusConfig[app.status];
            const StatusIcon = status.icon;
            return (
              <div key={app.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors">
                <div>
                  <h3 className="font-medium text-text-primary">{app.jobTitle}</h3>
                  <p className="text-sm text-text-muted">{app.companyName} • {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : ''}</p>
                </div>
                <div className="flex items-center gap-3">
                  {app.testScore != null && (
                    <span className="text-sm text-text-secondary">{app.testScore}%</span>
                  )}
                  <span className={`flex items-center gap-1 px-3 py-1 text-xs rounded-full font-medium ${status.color}`}>
                    <StatusIcon size={12} /> {status.label}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
