import type {
  Job, Company, Task, Application, SavedSnippet, TestResult,
  ActivityLog, Conversation, Message, User, Notification,
} from '../types';

// ─────────────────────────────────────────────────────────
// Базовая инфраструктура
// ─────────────────────────────────────────────────────────

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5041/api';

const TOKEN_KEY = 'techmoldova-auth-token';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}, skipAuthRedirect = false): Promise<T> {
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
    if (!skipAuthRedirect) {
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    let errorMessage = response.statusText;
    try {
      const body = await response.json();
      errorMessage = body.Message || body.message || body.Detail || body.detail || errorMessage;
    } catch { /* ignore */ }
    throw new Error(errorMessage);
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  // Возможно пустое тело при 200 без контента
  const text = await response.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

// ─────────────────────────────────────────────────────────
// Хелперы преобразования
// ─────────────────────────────────────────────────────────

function lc<T extends string>(value: string | undefined | null, fallback: T): T {
  return (value ? value.toLowerCase() : fallback) as T;
}

/**
 * Бэк хранит tags/constraints как строку. Пробуем JSON, иначе разбиваем по ; , или переводу строки.
 */
function parseStringArray(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw !== 'string') return [];
  const trimmed = raw.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed.map(String);
    } catch { /* ignore */ }
  }
  return trimmed.split(/[\n;,]+/).map(s => s.trim()).filter(Boolean);
}

function parseExamples(raw: unknown): Task['examples'] {
  if (Array.isArray(raw)) return raw as Task['examples'];
  if (typeof raw !== 'string') return [];
  const trimmed = raw.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) return parsed;
      return [parsed];
    } catch { /* ignore */ }
  }
  return [];
}

// ─── Job ─────────────────────────────────────────────────

const JOB_TYPE_MAP: Record<string, Job['type']> = {
  FullTime: 'full-time',
  PartTime: 'part-time',
  Remote: 'remote',
  Hybrid: 'hybrid',
  Contract: 'contract',
  Internship: 'internship',
};

const JOB_TYPE_REVERSE: Record<Job['type'], string> = {
  'full-time': 'FullTime',
  'part-time': 'PartTime',
  'remote': 'Remote',
  'hybrid': 'Hybrid',
  'contract': 'Contract',
  'internship': 'Internship',
};

const TEST_TASK_TYPE_MAP: Record<string, NonNullable<Job['testTask']>['type']> = {
  Algorithm: 'algorithm',
  LiveCoding: 'live-coding',
  Project: 'project',
  None: 'none',
};

function mapJob(j: any): Job {
  return {
    id: String(j.id),
    title: j.title ?? '',
    company: {
      id: String(j.company?.id ?? ''),
      name: j.company?.name ?? '',
      logo: j.company?.logo,
      location: j.location ?? '',
    },
    location: j.location ?? '',
    salary: {
      min: Number(j.salary?.min ?? 0),
      max: Number(j.salary?.max ?? 0),
      currency: j.salary?.currency ?? 'MDL',
    },
    experience: j.experience ?? '',
    type: JOB_TYPE_MAP[j.type] ?? 'full-time',
    description: j.description ?? '',
    requirements: Array.isArray(j.requirements) ? j.requirements : [],
    benefits: Array.isArray(j.benefits) ? j.benefits : [],
    techStack: Array.isArray(j.techStack) ? j.techStack : [],
    testTask: j.testTask
      ? {
        type: TEST_TASK_TYPE_MAP[j.testTask.type] ?? 'none',
        title: j.testTask.title ?? '',
        description: j.testTask.description ?? '',
        difficulty: (j.testTask.difficulty as 'Easy' | 'Medium' | 'Hard') ?? 'Easy',
        timeLimit: j.testTask.timeLimit,
      }
      : undefined,
    createdAt: j.createdAt ?? '',
    isHot: !!j.isHot,
    applicantsCount: j.applicantsCount,
  };
}

// ─── Company ─────────────────────────────────────────────

function mapCompany(c: any): Company {
  return {
    id: String(c.id),
    name: c.name ?? '',
    logo: c.logo,
    description: c.description,
    location: c.location ?? '',
    employeesCount: c.stats?.employeesCount ?? undefined,
    rating: c.stats?.rating ?? undefined,
    openPositions: c.stats?.openPositions ?? undefined,
    website: c.website,
    techStack: typeof c.techStack === 'string'
      ? c.techStack.split(/[\s,]+/).filter(Boolean)
      : Array.isArray(c.techStack) ? c.techStack : undefined,
  };
}

// ─── Task ────────────────────────────────────────────────

function mapTask(t: any): Task {
  return {
    id: String(t.id),
    title: t.title ?? '',
    description: t.description ?? '',
    difficulty: (t.difficulty as 'Easy' | 'Medium' | 'Hard') ?? 'Easy',
    category: t.category ?? '',
    tags: parseStringArray(t.tags),
    companyName: t.companyName ?? undefined,
    position: t.position ?? undefined,
    examples: parseExamples(t.examples),
    constraints: parseStringArray(t.constraints),
    solvedCount: t.solvedCount ?? 0,
    language: t.language ?? undefined,
    functionName: t.functionName ?? undefined,
    defaultCode: t.defaultCode ?? undefined,
    testCases: parseTestCases(t.testCases),
  };
}

function parseTestCases(raw: unknown): Task['testCases'] {
  if (Array.isArray(raw)) return raw as Task['testCases'];
  if (typeof raw !== 'string' || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ─── Application ─────────────────────────────────────────

function mapApplication(a: any): Application {
  return {
    id: String(a.id),
    jobTitle: a.jobTitle ?? '',
    companyName: a.companyName ?? '',
    status: lc(a.status, 'pending'),
    appliedAt: a.appliedAt ?? '',
    testScore: a.testScore ?? undefined,
  };
}

// ─── SavedSnippet ────────────────────────────────────────

function mapSnippet(s: any): SavedSnippet {
  return {
    id: String(s.id),
    icon: s.icon ?? '',
    title: s.title ?? '',
    language: s.language ?? '',
    languageShort: s.languageShort ?? '',
    description: s.description ?? '',
  };
}

// ─── Conversation ────────────────────────────────────────

function mapConversation(c: any): Conversation {
  return {
    id: String(c.id),
    jobTitle: c.jobInfo?.jobTitle ?? '',
    companyName: c.jobInfo?.companyName ?? '',
    lastMessage: c.lastMessage ?? '',
    lastMessageTime: c.lastMessageTime ?? '',
    unread: !!c.unread,
    avatar: c.avatar ?? undefined,
  };
}

// ─── Message ─────────────────────────────────────────────

function mapMessage(m: any): Message {
  return {
    id: String(m.id),
    senderId: String(m.senderId),
    senderName: m.senderName ?? '',
    content: m.content ?? '',
    timestamp: m.timestamp ?? '',
    isCode: !!m.code?.isCode,
    codeLanguage: m.code?.language ?? undefined,
  };
}

// ─── TestResult ──────────────────────────────────────────

function mapTestResult(r: any): TestResult {
  return {
    id: String(r.id),
    candidateName: r.candidate?.name ?? '',
    candidateRole: r.candidate?.role ?? '',
    avatar: r.candidate?.avatar ?? undefined,
    score: Number(r.score ?? 0),
    maxScore: Number(r.maxScore ?? 0),
    passedTests: r.passedTests ?? 0,
    totalTests: r.totalTests ?? 0,
    timeSpent: r.timeSpent ?? '',
    submittedAt: r.submittedAt ?? '',
    language: r.language ?? '',
  };
}

// ─── ActivityLog ─────────────────────────────────────────

function mapActivityLog(l: any): ActivityLog {
  return {
    id: String(l.id),
    action: l.action ?? '',
    user: l.username ?? l.user ?? '',
    timestamp: l.timestamp ?? '',
    type: lc(l.type, 'system'),
  };
}

// ─── Notification ────────────────────────────────────────

function mapNotification(n: any): Notification {
  return {
    id: Number(n.id),
    title: n.title ?? '',
    message: n.message ?? '',
    isRead: !!n.isRead,
    createdAt: n.createdAt ?? '',
    userId: String(n.userId ?? ''),
  };
}

// ─────────────────────────────────────────────────────────
// API: вакансии
// ─────────────────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  const data = await fetchApi<any[]>('/job/all');
  return (data ?? []).map(mapJob);
}

export async function getJobById(id: string): Promise<Job | undefined> {
  const data = await fetchApi<any>(`/job/${id}`);
  return data ? mapJob(data) : undefined;
}

export async function searchJobs(query: string): Promise<Job[]> {
  const data = await fetchApi<any[]>(`/job/search?q=${encodeURIComponent(query)}`);
  return (data ?? []).map(mapJob);
}

export interface CreateJobInput {
  title: string;
  companyId: number;
  location: string;
  salary: { min: number; max: number; currency: string };
  experience: string;
  type: Job['type'];
  description: string;
  requirements?: string[];
  benefits?: string[];
  techStack?: string[];
  testTask?: NonNullable<Job['testTask']>;
  isHot?: boolean;
}

export async function createJob(data: CreateJobInput): Promise<Job> {
  const body = {
    ...data,
    type: JOB_TYPE_REVERSE[data.type] ?? 'FullTime',
    testTask: data.testTask
      ? {
        type: data.testTask.type === 'live-coding'
          ? 'LiveCoding'
          : data.testTask.type.charAt(0).toUpperCase() + data.testTask.type.slice(1),
        title: data.testTask.title,
        description: data.testTask.description,
        difficulty: data.testTask.difficulty,
        timeLimit: data.testTask.timeLimit,
      }
      : undefined,
  };
  const created = await fetchApi<any>('/job', { method: 'POST', body: JSON.stringify(body) });
  return mapJob(created);
}

export async function deleteJob(id: string | number): Promise<void> {
  await fetchApi<void>(`/job/${id}`, { method: 'DELETE' });
}

// ─────────────────────────────────────────────────────────
// API: компании
// ─────────────────────────────────────────────────────────
export async function getCompanies(): Promise<Company[]> {
  const data = await fetchApi<any[]>('/company/all');
  return (data ?? []).map(mapCompany);
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  const data = await fetchApi<any>(`/company/${id}`);
  return data ? mapCompany(data) : undefined;
}

export interface CreateCompanyInput {
  name: string;
  logo?: string;
  description?: string;
  location: string;
  website?: string;
  techStack?: string;
  stats?: { employeesCount?: string; rating?: number; openPositions?: number };
}

export async function createCompany(data: CreateCompanyInput): Promise<Company> {
  const created = await fetchApi<any>('/company', { method: 'POST', body: JSON.stringify(data) });
  return mapCompany(created);
}

export async function deleteCompany(id: string | number): Promise<void> {
  await fetchApi<void>(`/company/${id}`, { method: 'DELETE' });
}

// ─────────────────────────────────────────────────────────
// API: задачи (Sandbox)
// ─────────────────────────────────────────────────────────
export async function getTasks(): Promise<Task[]> {
  const data = await fetchApi<any[]>('/task/all');
  return (data ?? []).map(mapTask);
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  const data = await fetchApi<any>(`/task/${id}`);
  return data ? mapTask(data) : undefined;
}

export async function createTask(data: any): Promise<Task> {
  const created = await fetchApi<any>('/task', { method: 'POST', body: JSON.stringify(data) });
  return mapTask(created);
}

export async function deleteTask(id: string | number): Promise<void> {
  await fetchApi<void>(`/task/${id}`, { method: 'DELETE' });
}

// ─────────────────────────────────────────────────────────
// API: отклики
// ─────────────────────────────────────────────────────────
export async function getApplications(userId: string): Promise<Application[]> {
  const data = await fetchApi<any[]>(`/application/user/${userId}`);
  return (data ?? []).map(mapApplication);
}

export async function getAllApplications(): Promise<Application[]> {
  const data = await fetchApi<any[]>('/application/all');
  return (data ?? []).map(mapApplication);
}

export async function createApplication(data: { userId: number; jobId: number }): Promise<Application> {
  const created = await fetchApi<any>('/application', { method: 'POST', body: JSON.stringify(data) });
  return mapApplication(created);
}

export async function updateApplicationStatus(
  id: string,
  data: { status?: string; testScore?: number },
): Promise<Application> {
  const updated = await fetchApi<any>(`/application/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      status: data.status
        ? data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase()
        : undefined,
      testScore: data.testScore,
    }),
  });
  return mapApplication(updated);
}

// ─────────────────────────────────────────────────────────
// API: сохранённые сниппеты
// ─────────────────────────────────────────────────────────
export async function getSavedSnippets(userId: string): Promise<SavedSnippet[]> {
  const data = await fetchApi<any[]>(`/snippet/user/${userId}`);
  return (data ?? []).map(mapSnippet);
}

export async function createSnippet(data: {
  userId: number;
  icon: string;
  title: string;
  language: string;
  languageShort: string;
  description: string;
}): Promise<SavedSnippet> {
  const created = await fetchApi<any>('/snippet', { method: 'POST', body: JSON.stringify(data) });
  return mapSnippet(created);
}

// ─────────────────────────────────────────────────────────
// API: диалоги
// ─────────────────────────────────────────────────────────
export async function getConversations(userId: string): Promise<Conversation[]> {
  const data = await fetchApi<any[]>(`/conversation/user/${userId}`);
  return (data ?? []).map(mapConversation);
}

export async function createConversation(data: {
  userId: number;
  jobInfo: { jobTitle: string; companyName: string };
}): Promise<Conversation> {
  const created = await fetchApi<any>('/conversation', { method: 'POST', body: JSON.stringify(data) });
  return mapConversation(created);
}

// ─────────────────────────────────────────────────────────
// API: сообщения
// ─────────────────────────────────────────────────────────
export async function getMessages(conversationId: string): Promise<Message[]> {
  const data = await fetchApi<any[]>(`/message/conversation/${conversationId}`);
  return (data ?? []).map(mapMessage);
}

export async function sendMessage(data: {
  conversationId: number;
  senderId: number;
  content: string;
  isCode?: boolean;
  codeLanguage?: string;
}): Promise<Message> {
  const body = {
    conversationId: data.conversationId,
    senderId: data.senderId,
    content: data.content,
    code: { isCode: !!data.isCode, language: data.codeLanguage },
  };
  const created = await fetchApi<any>('/message', { method: 'POST', body: JSON.stringify(body) });
  return mapMessage(created);
}

// ─────────────────────────────────────────────────────────
// API: результаты тестов
// ─────────────────────────────────────────────────────────
export async function getTestResults(): Promise<TestResult[]> {
  const data = await fetchApi<any[]>('/testresult/all');
  return (data ?? []).map(mapTestResult);
}

export async function getTestResultById(id: string): Promise<TestResult | undefined> {
  const data = await fetchApi<any>(`/testresult/${id}`);
  return data ? mapTestResult(data) : undefined;
}

export async function createTestResult(data: any): Promise<TestResult> {
  const created = await fetchApi<any>('/testresult', { method: 'POST', body: JSON.stringify(data) });
  return mapTestResult(created);
}

// ─────────────────────────────────────────────────────────
// API: админ-панель
// ─────────────────────────────────────────────────────────
export interface AdminStatsData {
  totalUsers: number;
  totalCompanies: number;
  totalJobs: number;
  totalApplications: number;
  totalActivityLogs: number;
}

export async function getAdminStats(): Promise<AdminStatsData> {
  const data = await fetchApi<any>('/admin/statistics');
  return {
    totalUsers: data?.totalUsers ?? 0,
    totalCompanies: data?.totalCompanies ?? 0,
    totalJobs: data?.totalJobs ?? 0,
    totalApplications: data?.totalApplications ?? 0,
    totalActivityLogs: data?.totalActivityLogs ?? 0,
  };
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  const data = await fetchApi<any[]>('/admin/activity-logs');
  return (data ?? []).map(mapActivityLog);
}

export async function getAdminUsers(): Promise<AuthUser[]> {
  const data = await fetchApi<any[]>('/admin/users');
  return data ?? [];
}

export async function blockUser(userId: number): Promise<void> {
  await fetchApi<void>(`/admin/users/${userId}/block`, { method: 'POST' });
}

// ─────────────────────────────────────────────────────────
// API: уведомления
// ─────────────────────────────────────────────────────────
export async function getNotifications(): Promise<Notification[]> {
  const data = await fetchApi<any[]>('/notifications');
  return (data ?? []).map(mapNotification);
}

export async function markNotificationRead(id: number): Promise<void> {
  await fetchApi<void>(`/notifications/${id}/read`, { method: 'POST' });
}

export async function broadcastNotification(title: string, message: string): Promise<void> {
  await fetchApi<void>('/notifications/broadcast', {
    method: 'POST',
    body: JSON.stringify({ title, message }),
  });
}

// ─────────────────────────────────────────────────────────
// API: авторизация и пользователи
// ─────────────────────────────────────────────────────────

/** Сырая форма пользователя, которую возвращает бэкенд. */
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: 'Candidate' | 'Employer' | 'Admin' | string;
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
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export function mapAuthUser(u: AuthUser): User {
  return {
    id: String(u.id),
    name: u.username,
    email: u.email,
    role: lc(u.role, 'candidate'),
    title: u.profile?.title,
    location: u.profile?.location,
    avatar: u.profile?.avatar,
    codingScore: u.profile?.codingScore,
    solvedTasks: u.profile?.solvedTasks,
    rank: u.profile?.rank,
    verified: u.profile?.verified,
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

export async function getMeApi(): Promise<AuthUser> {
  return fetchApi<AuthUser>('/user/me', {}, true);
}

export interface UpdateProfileInput {
  email?: string;
  title?: string;
  location?: string;
  avatar?: string;
  codingScore?: number;
  solvedTasks?: number;
  rank?: string;
}

export async function updateProfile(userId: string, data: UpdateProfileInput): Promise<AuthUser> {
  const body = {
    email: data.email,
    profile: {
      title: data.title,
      location: data.location,
      avatar: data.avatar,
      codingScore: data.codingScore,
      solvedTasks: data.solvedTasks,
      rank: data.rank,
    },
  };
  return fetchApi<AuthUser>(`/user/${userId}`, { method: 'PUT', body: JSON.stringify(body) });
}

export async function changePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
  return fetchApi<{ message: string }>('/user/change-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteAccount(): Promise<void> {
  await fetchApi<void>('/user/me', { method: 'DELETE' });
}

export async function forgotPassword(email: string): Promise<{ message: string }> {
  return fetchApi<{ message: string }>('/user/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
  return fetchApi<{ message: string }>('/user/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  });
}

// ─────────────────────────────────────────────────────────
// API: OAuth (Google / GitHub)
// ─────────────────────────────────────────────────────────

export async function getOAuthUrl(provider: 'google' | 'github', state: string): Promise<string> {
  const data = await fetchApi<{ url: string }>(
    `/auth/${provider}/url?state=${encodeURIComponent(state)}`,
  );
  return data.url;
}

export async function oauthCallback(
  provider: 'google' | 'github',
  code: string,
): Promise<AuthResponse> {
  return fetchApi<AuthResponse>(`/auth/${provider}/callback`, {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
}
