import type { ActivityLog } from '../../types';
import mockData from './AdminMockData.json';
import StatCards from '../../components/AdminDashboard/StatCards';
import SessionActivityChart from '../../components/AdminDashboard/SessionActivityChart';
import TechStackStats from '../../components/AdminDashboard/TechStackStats';
import ActivityLogViewer from '../../components/AdminDashboard/ActivityLogViewer';
import OnlineModerators from '../../components/AdminDashboard/OnlineModerators';
import GlobalNotificationForm from '../../components/AdminDashboard/GlobalNotificationForm';

interface TechStackStat {
  name: string;
  percentage: number;
}

const { activityLogs, techStackStats } = mockData as { activityLogs: ActivityLog[], techStackStats: TechStackStat[] };

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-text-primary mb-2">Обзор платформы</h1>
      <p className="text-text-muted mb-8">Панель администратора TechMoldova</p>

      {/* Статистика */}
      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Активность сессий (график-заглушка) */}
        <SessionActivityChart />

        {/* Стек технологий */}
        <TechStackStats stats={techStackStats} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Журнал активности */}
        <ActivityLogViewer logs={activityLogs} />

        {/* Модераторы + Уведомление */}
        <div className="space-y-6">
          <OnlineModerators />
          <GlobalNotificationForm />
        </div>
      </div>
    </div>
  );
}
