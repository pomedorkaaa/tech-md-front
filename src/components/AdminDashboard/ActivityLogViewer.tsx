import type { ActivityLog } from '../../types';

interface ActivityLogViewerProps {
  logs: ActivityLog[];
}

export default function ActivityLogViewer({ logs }: ActivityLogViewerProps) {
  return (
    <div className="lg:col-span-2 gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary mb-4">Журнал активности</h2>
      <p className="text-sm text-text-muted mb-4">Последние 50 операций в системе</p>
      <div className="space-y-3">
        {logs.map(log => (
          <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-elevated">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${
                log.type === 'create' ? 'bg-success' :
                log.type === 'update' ? 'bg-info' :
                log.type === 'login' ? 'bg-primary' :
                log.type === 'system' ? 'bg-warning' :
                'bg-error'
              }`} />
              <div>
                <p className="text-sm text-text-primary">{log.action}</p>
                <p className="text-xs text-text-muted">{log.user}</p>
              </div>
            </div>
            <span className="text-xs text-text-muted">{log.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
