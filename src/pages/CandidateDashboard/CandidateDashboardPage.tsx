import mockData from './CandidateMockData.json';
import sandboxData from '../Sandbox/SandboxMockData.json';
import type { User, Application, SavedSnippet, Task } from '../../types';
import ProfileHeader from '../../components/CandidateDashboard/ProfileHeader';
import StatsGrid from '../../components/CandidateDashboard/StatsGrid';
import ApplicationsList from '../../components/CandidateDashboard/ApplicationsList';
import SkillBoostWidget from '../../components/CandidateDashboard/SkillBoostWidget';
import SavedSnippetsList from '../../components/CandidateDashboard/SavedSnippetsList';

const { currentUser, applications, savedSnippets } = mockData as { currentUser: User, applications: Application[], savedSnippets: SavedSnippet[] };
const { tasks } = sandboxData as { tasks: Task[] };

export default function CandidateDashboard() {
  const hardTask = tasks.find(t => t.difficulty === 'Hard');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Профиль */}
      <div className="gradient-card rounded-xl p-6 border border-border mb-8">
        <ProfileHeader user={currentUser} />
        <StatsGrid user={currentUser} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Мои отклики и Прокачка навыков */}
        <div className="lg:col-span-2 space-y-6">
          <ApplicationsList applications={applications} />
          <SkillBoostWidget task={hardTask} />
        </div>

        {/* Сохранённое */}
        <SavedSnippetsList snippets={savedSnippets} />
      </div>
    </div>
  );
}
