import type { Company, Job } from '../../types';
import mockData from './CompanyOverviewMockData.json';
const { company, jobs } = mockData as { company: Company, jobs: Job[] };

export default function CompanyOverviewPage() {

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="glass-panel p-8">
        <h1 className="text-3xl font-display font-extrabold mb-2">{company?.name || 'Компания'}</h1>
        <p className="text-on-surface-variant text-lg">
          {company?.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold font-display">Открытые вакансии</h2>
          {jobs?.map((job: Job) => (
            <div key={job.id} className="surface-high p-6 rounded-lg">
              <h3 className="text-lg font-bold">{job.title}</h3>
              <p className="text-on-surface-variant text-sm mt-1">{job.location}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="surface-high p-6 rounded-lg">
            <h3 className="text-lg font-bold">О компании</h3>
            <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
              <li>Локация: {company?.location}</li>
              <li>Сотрудники: {company?.employeesCount}</li>
              <li>Стек: {company?.techStack?.join(', ')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
