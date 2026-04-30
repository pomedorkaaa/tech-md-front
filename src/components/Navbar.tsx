import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const navLinks = [
  { label: 'Вакансии', path: '/jobs' },
  { label: 'Компании', path: '/companies' },
  { label: 'Задачи', path: '/sandbox' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background-dark/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex w-8 h-8 items-center justify-center rounded-lg bg-primary text-white shadow-[0_0_20px_rgba(19,19,236,0.3)] transition-transform group-hover:scale-105">
              <span className="font-bold text-sm">TM</span>
            </div>
            <span className="text-lg font-black tracking-tighter text-text-primary">
              Tech<span className="text-primary">Moldova</span>
            </span>
          </Link>

          {/* Навигация (десктоп) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-medium transition-colors
                  ${location.pathname === link.path
                    ? 'text-text-primary'
                    : 'text-text-muted hover:text-text-primary'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Правая часть */}
          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-text-muted hover:bg-surface-elevated hover:text-text-primary transition-colors">
              <Search size={16} />
            </button>

            {/* Кнопка смены темы */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-text-muted hover:bg-surface-elevated hover:text-text-primary transition-colors"
              title={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div className="h-5 w-px bg-border mx-1"></div>
            <Link
              to="/login"
              className="text-sm font-semibold text-text-muted hover:text-text-primary transition-colors px-2"
            >
              Войти
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-primary px-4 py-1.5 text-sm font-bold text-white hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
            >
              Регистрация
            </Link>
          </div>

          {/* Мобильное меню: кнопка */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              className="p-2 rounded-lg text-text-muted hover:text-text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-surface-paper">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border flex gap-2">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex-1 px-4 py-2 text-center text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-surface-elevated"
              >
                Вход
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="flex-1 px-4 py-2 text-center text-sm font-medium text-white rounded-lg gradient-primary"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
