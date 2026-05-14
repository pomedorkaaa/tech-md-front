import { useState, useEffect } from 'react';
import type { ActivityLog } from '../../types';
import { getActivityLogs, getAdminStats } from '../../services/api';
import StatCards from '../../components/AdminDashboard/StatCards';
import SessionActivityChart from '../../components/AdminDashboard/SessionActivityChart';
import TechStackStats from '../../components/AdminDashboard/TechStackStats';
import ActivityLogViewer from '../../components/AdminDashboard/ActivityLogViewer';
import OnlineModerators from '../../components/AdminDashboard/OnlineModerators';
import GlobalNotificationForm from '../../components/AdminDashboard/GlobalNotificationForm';

export interface AdminStatsData {
  totalUsers: number;
  totalCompanies: number;
  totalJobs: number;
  totalApplications: number;
  totalActivityLogs: number;
}

export default function AdminDashboard() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [stats, setStats] = useState<AdminStatsData | null>(null);

  useEffect(() => {
    getActivityLogs().then(setLogs).catch(() => setLogs([]));
    getAdminStats().then(setStats).catch(() => setStats(null));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Обзор платформы</h1>
      <p className="text-text-muted mb-8">Панель администратора TechMoldova</p>

      <StatCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SessionActivityChart />
        <TechStackStats stats={[]} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <ActivityLogViewer logs={logs} />

        <div className="space-y-6">
          <OnlineModerators />
          <GlobalNotificationForm />
        </div>
      </div>
    </div>
  );
}
