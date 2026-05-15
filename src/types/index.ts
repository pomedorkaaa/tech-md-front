/**
 * Типы данных TechMoldova
 * Описывают основные сущности платформы. Подготовлены для будущего .NET бэкенда.
 */

// ─── Пользователь ────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'candidate' | 'employer' | 'admin';
  title?: string;
  location?: string;
  codingScore?: number;
  solvedTasks?: number;
  rank?: string;
  verified?: boolean;
}

// ─── Компания ────────────────────────────────────────────
export interface Company {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  location: string;
  employeesCount?: string;
  rating?: number;
  website?: string;
  techStack?: string[];
  openPositions?: number;
}

// ─── Вакансия ────────────────────────────────────────────
export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  experience: string;
  type: 'full-time' | 'part-time' | 'remote' | 'hybrid' | 'contract' | 'internship';
  description: string;
  requirements: string[];
  benefits: string[];
  techStack: string[];
  testTask?: {
    type: 'algorithm' | 'live-coding' | 'project' | 'none';
    title: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    timeLimit?: number; // минуты
  };
  createdAt: string;
  isHot?: boolean;
  applicantsCount?: number;
}

// ─── Задача (Песочница) ──────────────────────────────────
export interface Task {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  tags: string[];
  companyName?: string;
  position?: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  solvedCount?: number;
  language?: string;
  defaultCode?: string;
  functionName?: string;
  testCases?: {
    args: unknown[];
    expected: unknown;
    label?: string;
  }[];
}

// ─── Сообщение (Чат) ─────────────────────────────────────
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isCode?: boolean;
  codeLanguage?: string;
}

// ─── Диалог ──────────────────────────────────────────────
export interface Conversation {
  id: string;
  jobTitle: string;
  companyName: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  avatar?: string;
}

// ─── Отклик (Кандидат) ───────────────────────────────────
export interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  status: 'pending' | 'reviewed' | 'interview' | 'offer' | 'rejected';
  appliedAt: string;
  testScore?: number;
}

// ─── Результат теста (Работодатель) ──────────────────────
export interface TestResult {
  id: string;
  candidateName: string;
  candidateRole: string;
  avatar?: string;
  score: number;
  maxScore: number;
  passedTests: number;
  totalTests: number;
  timeSpent: string;
  submittedAt: string;
  language: string;
}

// ─── Элемент меню админки/сайдбара ───────────────────────
export interface SidebarItem {
  icon: string;
  label: string;
  path: string;
  badge?: number;
}

// ─── Статистика (Админ) ──────────────────────────────────
export interface AdminStats {
  totalUsers: number;
  totalJobs: number;
  totalSolutions: number;
  cpuLoad: number;
}

// ─── Сохранённая задача (ЛК кандидата) ───────────────────
export interface SavedSnippet {
  id: string;
  icon: string;
  title: string;
  language: string;
  languageShort: string;
  description: string;
}

// ─── Уведомление ─────────────────────────────────────────
export interface Notification {
  id: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
}

// ─── Запись журнала активности ────────────────────────────
export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'create' | 'update' | 'delete' | 'login' | 'system';
}
