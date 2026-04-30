import type { Company, Job } from '../../types';
import mockData from './CompanyOverviewMockData.json';
import CompanyHeader from '../../components/CompanyOverview/CompanyHeader';
import CompanyJobsList from '../../components/CompanyOverview/CompanyJobsList';
import CompanyDetailsWidget from '../../components/CompanyOverview/CompanyDetailsWidget';

const { company, jobs } = mockData as { company: Company, jobs: Job[] };

export default function CompanyOverviewPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <CompanyHeader company={company} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CompanyJobsList jobs={jobs} />
        <CompanyDetailsWidget company={company} />
      </div>
    </div>
  );
}
