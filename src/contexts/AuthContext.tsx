import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: 'candidate' | 'employer' | 'admin') => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'techmoldova-auth-user';

// Mock-пользователь для демонстрации
const mockCandidateUser: User = {
  id: 'u-1',
  name: 'Иван Петров',
  email: 'ivan@techmoldova.md',
  role: 'candidate',
  title: 'Senior Frontend Developer',
  location: 'Кишинёв, Молдова',
  codingScore: 847,
  solvedTasks: 42,
  rank: 'Gold',
  verified: true,
};

const mockEmployerUser: User = {
  id: 'u-2',
  name: 'Елена Руссу',
  email: 'elena@techflow.md',
  role: 'employer',
  title: 'HR Manager',
  location: 'Кишинёв, Молдова',
  verified: true,
};

const mockAdminUser: User = {
  id: 'u-3',
  name: 'Admin',
  email: 'admin@techmoldova.md',
  role: 'admin',
  title: 'System Administrator',
  location: 'Кишинёв, Молдова',
  verified: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, _password: string) => {
    // Mock: определяем роль по email
    await new Promise(resolve => setTimeout(resolve, 300));
    if (email.includes('admin')) {
      setUser(mockAdminUser);
    } else if (email.includes('employer') || email.includes('techflow')) {
      setUser(mockEmployerUser);
    } else {
      setUser(mockCandidateUser);
    }
  };

  const register = async (name: string, email: string, _password: string, role: 'candidate' | 'employer' | 'admin') => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newUser: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      role,
      title: role === 'candidate' ? 'Junior Developer' : role === 'employer' ? 'Recruiter' : 'Admin',
      location: 'Молдова',
      codingScore: 0,
      solvedTasks: 0,
      verified: false,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth должен использоваться внутри AuthProvider');
  return context;
}
