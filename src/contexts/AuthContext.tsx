import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types';
import {
  loginApi, registerApi, getMeApi,
  setStoredToken, clearStoredToken, getStoredToken,
  mapAuthUser, oauthCallback,
} from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role: 'candidate' | 'employer') => Promise<void>;
  loginWithOAuth: (provider: 'google' | 'github', code: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_KEY = 'techmoldova-auth-user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  // On mount: if token exists, validate it via /me
  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return;
    }

    getMeApi()
      .then((backendUser) => {
        setUser(mapAuthUser(backendUser));
      })
      .catch(() => {
        clearStoredToken();
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (username: string, password: string) => {
    const response = await loginApi(username, password);
    setStoredToken(response.token);
    setUser(mapAuthUser(response.user));
  };

  const register = async (username: string, email: string, password: string, role: 'candidate' | 'employer') => {
    // backend ожидает Pascal-case ("Candidate"|"Employer")
    const roleCapitalized = role.charAt(0).toUpperCase() + role.slice(1);
    const response = await registerApi(username, email, password, roleCapitalized);
    setStoredToken(response.token);
    setUser(mapAuthUser(response.user));
  };

  const loginWithOAuth = async (provider: 'google' | 'github', code: string) => {
    const response = await oauthCallback(provider, code);
    setStoredToken(response.token);
    setUser(mapAuthUser(response.user));
  };

  const logout = () => {
    clearStoredToken();
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, loginWithOAuth, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
