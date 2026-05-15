import { useState, useEffect } from 'react';
import { useSandboxTasks } from '../../hooks/useSandboxTasks';
import { getJobs, getCompanies } from '../../services/api';
import type { Job, Company } from '../../types';
import HeroSection from '../../components/Home/HeroSection';
import PremiumJobsList from '../../components/Home/PremiumJobsList';
import DailyChallengeWidget from '../../components/Home/DailyChallengeWidget';
import CvAuditWidget from '../../components/Home/CvAuditWidget';
import TopCompaniesWidget from '../../components/Home/TopCompaniesWidget';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const tasks = useSandboxTasks();

  useEffect(() => {
    getJobs().then(setJobs).catch(() => setJobs([]));
    getCompanies().then(setCompanies).catch(() => setCompanies([]));
  }, []);

  const featuredJobs = jobs.slice(0, 4);

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 min-h-screen relative">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <HeroSection />

      {/* ─── Основной контент (Грид) ────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Левая колонка (Вакансии) */}
        <PremiumJobsList jobs={featuredJobs} />

        {/* Правая колонка (Задачи и сайдбар) */}
        <div className="space-y-6">
          <DailyChallengeWidget tasks={tasks} />
          <CvAuditWidget />
        </div>

      </div>

      {/* ─── Топ компании (Снизу) ──────────────────────────────────── */}
      <TopCompaniesWidget companies={companies} />
    </main>
  );
}
