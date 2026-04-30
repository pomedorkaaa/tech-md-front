import { Briefcase, Users, Clock, UserCheck, Eye, Plus, ArrowRight } from 'lucide-react';
import mockData from './EmployerMockData.json';
const { jobs, testResults } = mockData as any;

export default function EmployerDashboard() {
  const activeJobs = jobs.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Панель управления</h1>
        <p className="text-text-muted mt-1">
          Обзор ваших активных вакансий, недавних откликов и результатов тестирования кандидатов.
        </p>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Активные вакансии', value: '12', icon: Briefcase, color: 'text-primary' },
          { label: 'Новые отклики', value: '48', icon: Users, color: 'text-info' },
          { label: 'Ожидают проверки', value: '5', icon: Clock, color: 'text-warning' },
          { label: 'Нанято в этом месяце', value: '3', icon: UserCheck, color: 'text-success' },
        ].map(stat => (
          <div key={stat.label} className="gradient-card rounded-xl p-5 border border-border">
            <div className="flex items-center justify-between mb-2">
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="text-3xl font-bold text-text-primary">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Активные вакансии */}
        <div className="gradient-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">Активные вакансии</h2>
            <button className="text-sm text-primary hover:text-primary-light flex items-center gap-1">
              Показать все <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {activeJobs.map(job => (
              <div key={job.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors">
                <div>
                  <h3 className="font-medium text-text-primary">{job.title}</h3>
                  <p className="text-xs text-text-muted mt-1">{job.applicantsCount} откликов • {job.createdAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-xs rounded-lg bg-success/10 text-success font-medium">
                    Активна
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-dashed border-border text-text-muted hover:text-primary hover:border-primary/30 transition-colors text-sm">
            <Plus size={16} /> Создать новую вакансию
          </button>
        </div>

        {/* Решения тестов */}
        <div className="gradient-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">Решения тестов</h2>
            <button className="text-sm text-primary hover:text-primary-light flex items-center gap-1">
              Показать все результаты <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {testResults.map(result => (
              <div key={result.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors gap-4 sm:gap-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                    {result.candidateName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-text-primary">{result.candidateName}</h3>
                    <p className="text-xs text-text-muted">{result.candidateRole}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 border-t border-border/50 sm:border-0 pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <p className={`text-sm font-bold ${
                      result.score >= 90 ? 'text-success' : result.score >= 70 ? 'text-warning' : 'text-error'
                    }`}>
                      {result.score}/{result.maxScore}
                    </p>
                    <p className="text-xs text-text-muted">{result.passedTests}/{result.totalTests} тестов</p>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-surface-overlay transition-colors text-text-muted hover:text-primary">
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 gradient-card rounded-xl p-6 border border-primary/20">
        <h3 className="text-lg font-bold text-text-primary mb-2">Начните поиск талантов прямо сейчас</h3>
        <p className="text-sm text-text-secondary mb-4">
          Создайте новую вакансию и добавьте тестовое задание, чтобы автоматически отфильтровать лучших кандидатов.
        </p>
        <button className="px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity text-sm">
          Создать вакансию
        </button>
      </div>
    </div>
  );
}
