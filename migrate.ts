import fs from 'fs';
import path from 'path';
import { companies, jobs, currentUser, applications, savedSnippets, tasks, conversations, testResults, activityLogs, techStackStats } from './src/data/mockData';

const writeJson = (filePath: string, data: any) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
  fs.writeFileSync(absolutePath, JSON.stringify(data, null, 2), 'utf8');
};

writeJson('src/pages/Home/HomeMockData.json', { companies, jobs, currentUser });
writeJson('src/pages/Jobs/JobsMockData.json', { jobs });
writeJson('src/pages/Companies/CompaniesMockData.json', { companies });
writeJson('src/pages/Sandbox/SandboxMockData.json', { tasks });
writeJson('src/pages/CandidateDashboard/CandidateMockData.json', { applications, savedSnippets, currentUser });
writeJson('src/pages/EmployerDashboard/EmployerMockData.json', { testResults, jobs });
writeJson('src/pages/Chat/ChatMockData.json', { conversations });
writeJson('src/pages/JobDetails/JobDetailsMockData.json', { job: jobs[0] });
writeJson('src/pages/CompanyOverview/CompanyOverviewMockData.json', { company: companies[0], jobs: jobs.filter(j => j.company.id === companies[0].id) });

console.log('Migration completed successfully!');
