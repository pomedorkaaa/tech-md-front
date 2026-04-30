import type { Job } from '../../types';

interface CompanyJobsListProps {
  jobs: Job[];
}

export default function CompanyJobsList({ jobs }: CompanyJobsListProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <h2 className="text-xl font-bold font-display">Открытые вакансии</h2>
      {jobs?.map((job: Job) => (
        <div key={job.id} className="surface-high p-6 rounded-lg">
          <h3 className="text-lg font-bold">{job.title}</h3>
          <p className="text-on-surface-variant text-sm mt-1">{job.location}</p>
        </div>
      ))}
    </div>
  );
}
