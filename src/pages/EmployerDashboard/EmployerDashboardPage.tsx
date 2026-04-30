import mockData from './EmployerMockData.json';
import type { Job, TestResult } from '../../types';
import EmployerStats from '../../components/EmployerDashboard/EmployerStats';
import ActiveJobsList from '../../components/EmployerDashboard/ActiveJobsList';
import TestResultsList from '../../components/EmployerDashboard/TestResultsList';
import EmployerCTA from '../../components/EmployerDashboard/EmployerCTA';

const { jobs, testResults } = mockData as { jobs: Job[], testResults: TestResult[] };

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

      <EmployerStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveJobsList activeJobs={activeJobs} />
        <TestResultsList testResults={testResults} />
      </div>

      <EmployerCTA />
    </div>
  );
}
