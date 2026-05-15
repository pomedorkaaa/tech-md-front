import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSandboxTasks } from '../../hooks/useSandboxTasks';
import type { Application, SavedSnippet } from '../../types';
import { getApplications, getSavedSnippets } from '../../services/api';
import ProfileHeader from '../../components/CandidateDashboard/ProfileHeader';
import StatsGrid from '../../components/CandidateDashboard/StatsGrid';
import ApplicationsList from '../../components/CandidateDashboard/ApplicationsList';
import SkillBoostWidget from '../../components/CandidateDashboard/SkillBoostWidget';
import SavedSnippetsList from '../../components/CandidateDashboard/SavedSnippetsList';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const tasks = useSandboxTasks();
  const [applications, setApplications] = useState<Application[]>([]);
  const [snippets, setSnippets] = useState<SavedSnippet[]>([]);

  useEffect(() => {
    if (!user) return;
    getApplications(user.id).then(setApplications).catch(() => setApplications([]));
    getSavedSnippets(user.id).then(setSnippets).catch(() => setSnippets([]));
  }, [user]);

  const hardTask = tasks.find(t => t.difficulty === 'Hard');

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Профиль */}
      <div className="gradient-card rounded-xl p-6 border border-border mb-8">
        <ProfileHeader user={user} />
        <StatsGrid user={user} applicationsCount={applications.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Мои отклики и Прокачка навыков */}
        <div className="lg:col-span-2 space-y-6">
          <ApplicationsList applications={applications} />
          <SkillBoostWidget task={hardTask} />
        </div>

        {/* Сохранённое */}
        <SavedSnippetsList snippets={snippets} />
      </div>
    </div>
  );
}
