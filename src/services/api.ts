import type { Job, Company, Task, Application, SavedSnippet, TestResult, ActivityLog, Conversation } from '../types';

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
      errorMessage = body.Message || body.message || body.Detail || errorMessage;
    } catch { }
    throw new Error(errorMessage);
  }
  return response.json();
}

// ─── Вакансии ────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  return fetchApi<Job[]>('/job/all');
}

export async function getJobById(id: string): Promise<Job | undefined> {
  return fetchApi<Job>(`/job/${id}`);
}

export async function searchJobs(query: string): Promise<Job[]> {
  return fetchApi<Job[]>(`/job/search?q=${encodeURIComponent(query)}`);
}

export async function createJob(data: any): Promise<Job> {
  return fetchApi<Job>('/job', { method: 'POST', body: JSON.stringify(data) });
}

// ─── Компании ────────────────────────────────────────────
export async function getCompanies(): Promise<Company[]> {
  return fetchApi<Company[]>('/company/all');
}

export async function getCompanyById(id: string): Promise<Company | undefined> {
  return fetchApi<Company>(`/company/${id}`);
}

export async function createCompany(data: any): Promise<Company> {
  return fetchApi<Company>('/company', { method: 'POST', body: JSON.stringify(data) });
}

// ─── Задачи ──────────────────────────────────────────────
export async function getTasks(): Promise<Task[]> {
  return fetchApi<Task[]>('/task/all');
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  return fetchApi<Task>(`/task/${id}`);
}

export async function createTask(data: any): Promise<Task> {
  return fetchApi<Task>('/task', { method: 'POST', body: JSON.stringify(data) });
}

// ─── Отклики ─────────────────────────────────────────────
export async function getApplications(userId: string): Promise<Application[]> {
  return fetchApi<Application[]>(`/application/user/${userId}`);
}

export async function createApplication(data: any): Promise<Application> {
  return fetchApi<Application>('/application', { method: 'POST', body: JSON.stringify(data) });
}

// ─── Сохранённые сниппеты ────────────────────────────────
export async function getSavedSnippets(userId: string): Promise<SavedSnippet[]> {
  return fetchApi<SavedSnippet[]>(`/snippet/user/${userId}`);
}

export async function createSnippet(data: any): Promise<SavedSnippet> {
  return fetchApi<SavedSnippet>('/snippet', { method: 'POST', body: JSON.stringify(data) });
}

// ─── Диалоги ─────────────────────────────────────────────
export async function getConversations(userId: string): Promise<Conversation[]> {
  return fetchApi<Conversation[]>(`/conversation/user/${userId}`);
}

export async function createConversation(data: any): Promise<Conversation> {
  return fetchApi<Conversation>('/conversation', { method: 'POST', body: JSON.stringify(data) });
}

// ─── Сообщения ───────────────────────────────────────────
export async function getMessages(conversationId: string) {
  return fetchApi<any[]>(`/message/conversation/${conversationId}`);
}

export async function sendMessage(data: any) {
  return fetchApi<any>('/message', { method: 'POST', body: JSON.stringify(data) });
}

// ─── Результаты тестов ───────────────────────────────────
export async function getTestResults(): Promise<TestResult[]> {
  return fetchApi<TestResult[]>('/testresult/all');
}

export async function getTestResultById(id: string): Promise<TestResult | undefined> {
  return fetchApi<TestResult>(`/testresult/${id}`);
}

export async function createTestResult(data: any): Promise<TestResult> {
  return fetchApi<TestResult>('/testresult', { method: 'POST', body: JSON.stringify(data) });
}

// ─── Админ-панель ────────────────────────────────────────
export async function getAdminStats() {
  return fetchApi<any>('/admin/statistics');
}

export async function getActivityLogs(): Promise<ActivityLog[]> {
  return fetchApi<ActivityLog[]>('/admin/activity-logs');
}

export async function getAdminUsers() {
  return fetchApi<any[]>('/admin/users');
}

export async function blockUser(userId: number) {
  return fetchApi<void>(`/admin/users/${userId}/block`, { method: 'POST' });
}

// ─── Уведомления ─────────────────────────────────────────
export async function getNotifications() {
  return fetchApi<{ id: number; title: string; message: string; isRead: boolean; createdAt: string }[]>('/notifications');
}

export async function markNotificationRead(id: number) {
  return fetchApi<void>(`/notifications/${id}/read`, { method: 'POST' });
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
  return fetchApi<AuthResponse['user']>('/user/me', {}, true);
}

export async function updateProfile(userId: string, data: any) {
  return fetchApi<any>(`/user/${userId}`, { method: 'PUT', body: JSON.stringify(data) });
}

export async function changePassword(data: { currentPassword: string; newPassword: string }) {
  return fetchApi<any>('/user/change-password', { method: 'POST', body: JSON.stringify(data) });
}
