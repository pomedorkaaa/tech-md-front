import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building2, Code2 } from 'lucide-react';
import type { Application, Job, TestResult } from '../../types';
import { getAllApplications, getJobs, getTestResults, deleteJob } from '../../services/api';
import EmployerStats from '../../components/EmployerDashboard/EmployerStats';
import ActiveJobsList from '../../components/EmployerDashboard/ActiveJobsList';
import TestResultsList from '../../components/EmployerDashboard/TestResultsList';
import EmployerCTA from '../../components/EmployerDashboard/EmployerCTA';

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    getJobs().then(setJobs).catch(() => setJobs([]));
    getTestResults().then(setTestResults).catch(() => setTestResults([]));
    getAllApplications().then(setApplications).catch(() => setApplications([]));
  }, []);

  const handleQuickDelete = async (id: string) => {
    if (!window.confirm('Удалить вакансию? Действие необратимо.')) return;
    setDeletingId(id);
    try {
      await deleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (err: any) {
      window.alert(err?.message || 'Не удалось удалить вакансию');
    } finally {
      setDeletingId(null);
    }
  };

  const activeJobs = jobs.slice(0, 3);
  const pendingReview = applications.filter(a => a.status === 'pending').length;
  const hired = applications.filter(a => a.status === 'offer').length;

  const manageLinks = [
    { to: '/employer/jobs', label: 'Управление вакансиями', icon: Briefcase, count: jobs.length },
    { to: '/employer/companies', label: 'Управление компаниями', icon: Building2 },
    { to: '/employer/tasks', label: 'Управление задачами', icon: Code2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Панель управления</h1>
        <p className="text-text-muted mt-1">
          Обзор ваших активных вакансий, недавних откликов и результатов тестирования кандидатов.
        </p>
      </div>

      <EmployerStats
        totalJobs={jobs.length}
        totalApplications={applications.length}
        pendingReview={pendingReview}
        hired={hired}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {manageLinks.map(item => (
          <Link
            key={item.to}
            to={item.to}
            className="gradient-card rounded-xl p-4 border border-border hover:border-primary/30 transition-colors flex items-center gap-3 group"
          >
            <item.icon size={20} className="text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors">{item.label}</p>
              {item.count != null && (
                <p className="text-xs text-text-muted">{item.count} записей</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveJobsList activeJobs={activeJobs} onDelete={handleQuickDelete} deletingId={deletingId} />
        <TestResultsList testResults={testResults} />
      </div>

      <EmployerCTA />
    </div>
  );
}
