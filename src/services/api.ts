/**
 * Сервисный слой TechMoldova
 * 
 * API-подобные функции, которые пока возвращают моковые данные.
 * При подключении .NET бэкенда достаточно будет заменить реализацию
 * в этих функциях на реальные HTTP-запросы.
 */
import jobsData from '../pages/Jobs/JobsMockData.json';
import companiesData from '../pages/Companies/CompaniesMockData.json';
import candidateData from '../pages/CandidateDashboard/CandidateMockData.json';
import employerData from '../pages/EmployerDashboard/EmployerMockData.json';
import adminData from '../pages/AdminDashboard/AdminMockData.json';
import chatData from '../pages/Chat/ChatMockData.json';
import sandboxData from '../pages/Sandbox/SandboxMockData.json';

import type { Job, Company, Task, User, Application, SavedSnippet, TestResult, ActivityLog, Conversation } from '../types';

const { jobs } = jobsData as { jobs: Job[] };
const { companies } = companiesData as { companies: Company[] };
const { currentUser, applications, savedSnippets } = candidateData as unknown as { currentUser: User, applications: Application[], savedSnippets: SavedSnippet[] };
const { testResults } = employerData as { testResults: TestResult[] };
const { activityLogs, techStackStats } = adminData as { activityLogs: ActivityLog[], techStackStats: { name: string, value: number }[] };
const { conversations } = chatData as { conversations: Conversation[] };
const { tasks } = sandboxData as { tasks: Task[] };

// Симуляция задержки сети
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ─── Вакансии ────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  await delay(100);
  return jobs;
}

export async function getJobById(id: string): Promise<Job | undefined> {
  await delay(100);
  return jobs.find(job => job.id === id);
}

export async function searchJobs(query: string): Promise<Job[]> {
  await delay(100);
  const lower = query.toLowerCase();
  return jobs.filter(job =>
    job.title.toLowerCase().includes(lower) ||
    job.company.name.toLowerCase().includes(lower) ||
    job.techStack.some(t => t.toLowerCase().includes(lower))
  );
}

// ─── Компании ────────────────────────────────────────────
export async function getCompanies(): Promise<Company[]> {
  await delay(100);
  return companies;
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  await delay(100);
  return companies.find(c => c.id === id);
}

// ─── Задачи ──────────────────────────────────────────────
export async function getTasks(): Promise<Task[]> {
  await delay(100);
  return tasks;
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  await delay(100);
  return tasks.find(t => t.id === id);
}

// ─── Пользователь ────────────────────────────────────────
export async function getCurrentUser(): Promise<User> {
  await delay(100);
  return currentUser;
}

// ─── Отклики (Кандидат) ──────────────────────────────────
export async function getApplications() {
  await delay(100);
  return applications;
}

// ─── Сохранённое (Кандидат) ──────────────────────────────
export async function getSavedSnippets() {
  await delay(100);
  return savedSnippets;
}

// ─── Диалоги (Чат) ───────────────────────────────────────
export async function getConversations() {
  await delay(100);
  return conversations;
}

// ─── Результаты тестов (Работодатель) ────────────────────
export async function getTestResults() {
  await delay(100);
  return testResults;
}

// ─── Админ-панель ────────────────────────────────────────
export async function getAdminStats() {
  await delay(100);
  return {
    totalUsers: 1248,
    totalJobs: 856,
    totalSolutions: 3400,
    cpuLoad: 42,
  };
}

export async function getActivityLogs() {
  await delay(100);
  return activityLogs;
}

export async function getTechStackStats() {
  await delay(100);
  return techStackStats;
}
