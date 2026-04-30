import { Users, Briefcase, Code2, Cpu, Send, Shield } from 'lucide-react';
import type { ActivityLog } from '../../types';
import mockData from './AdminMockData.json';

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Пользователи', value: '1,248', icon: Users, color: 'text-primary' },
          { label: 'Вакансии', value: '856', icon: Briefcase, color: 'text-info' },
          { label: 'Решения', value: '3.4k', icon: Code2, color: 'text-success' },
          { label: 'CPU Load', value: '42%', icon: Cpu, color: 'text-warning' },
        ].map(stat => (
          <div key={stat.label} className="gradient-card rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className={stat.color} />
              <span className="text-xs text-text-muted">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Активность сессий (график-заглушка) */}
        <div className="lg:col-span-2 gradient-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-bold text-text-primary mb-4">Активность сессий</h2>
          <p className="text-sm text-text-muted mb-4">Использование песочниц в реальном времени</p>
          <div className="h-48 flex items-end gap-2">
            {[35, 58, 42, 70, 65, 48, 82, 55, 60, 75, 45, 90, 68, 52, 78, 40, 85, 62, 72, 50].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md gradient-primary opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                style={{ height: `${h}%` }}
                title={`${h}% загрузки`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-text-muted">
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
          </div>
        </div>

        {/* Стек технологий */}
        <div className="gradient-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-bold text-text-primary mb-4">Стек технологий</h2>
          <div className="space-y-4">
            {techStackStats.map(tech => (
              <div key={tech.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-text-secondary">{tech.name}</span>
                  <span className="text-text-primary font-medium">{tech.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-elevated">
                  <div
                    className="h-full rounded-full gradient-primary"
                    style={{ width: `${tech.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Журнал активности */}
        <div className="lg:col-span-2 gradient-card rounded-xl p-6 border border-border">
          <h2 className="text-lg font-bold text-text-primary mb-4">Журнал активности</h2>
          <p className="text-sm text-text-muted mb-4">Последние 50 операций в системе</p>
          <div className="space-y-3">
            {activityLogs.map(log => (
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

        {/* Модераторы + Уведомление */}
        <div className="space-y-6">
          {/* Модераторы онлайн */}
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

          {/* Глобальное уведомление */}
          <div className="gradient-card rounded-xl p-6 border border-border">
            <h2 className="text-lg font-bold text-text-primary mb-2">Глобальное уведомление</h2>
            <p className="text-xs text-text-muted mb-4">
              Отправить системное сообщение всем активным пользователям и компаниям
            </p>
            <textarea
              placeholder="Текст уведомления..."
              rows={3}
              className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 resize-none mb-3"
            />
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity">
              <Send size={14} /> Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
