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
const { activityLogs, techStackStats } = adminData as { activityLogs: ActivityLog[], techStackStats: { name: string, percentage: number }[] };
const { conversations } = chatData as { conversations: Conversation[] };
const { tasks } = sandboxData as { tasks: Task[] };

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5041/api';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false'; // По умолчанию true, пока нет бэкенда

const TOKEN_KEY = 'techmoldova-auth-token';

// Симуляция задержки сети для моков
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    clearStoredToken();
    localStorage.removeItem('techmoldova-auth-user');
    window.location.href = '/login';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    let errorMessage = response.statusText;
    try {
      const body = await response.json();
      errorMessage = body.Message || body.message || body.Detail || errorMessage;
    } catch { /* ignore parse errors */ }
    throw new Error(errorMessage);
  }
  return response.json();
}

// ─── Вакансии ────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  if (USE_MOCKS) {
    await delay(100);
    return jobs;
  }
  return fetchApi<Job[]>('/jobs');
}

export async function getJobById(id: string): Promise<Job | undefined> {
  if (USE_MOCKS) {
    await delay(100);
    return jobs.find(job => job.id === id);
  }
  return fetchApi<Job>(`/jobs/${id}`);
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

// ─── Авторизация ─────────────────────────────────────────
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
    registeredOn: string;
    profile: {
      title?: string;
      location?: string;
      avatar?: string;
      codingScore?: number;
      solvedTasks?: number;
      rank?: string;
      verified?: boolean;
    };
  };
}

export async function loginApi(username: string, password: string): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/user/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function registerApi(
  username: string,
  email: string,
  password: string,
  role: string
): Promise<AuthResponse> {
  return fetchApi<AuthResponse>('/user/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, role }),
  });
}

export async function getMeApi(): Promise<AuthResponse['user']> {
  return fetchApi<AuthResponse['user']>('/user/me');
}
