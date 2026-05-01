import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon, User, LogOut, Settings, MessageCircle, Briefcase, ChevronDown, Shield } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const navLinks = [
  { label: 'Вакансии', path: '/jobs' },
  { label: 'Компании', path: '/companies' },
  { label: 'Задачи', path: '/sandbox' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие dropdown по клику вне
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  const initials = user?.name?.split(' ').map(n => n[0]).join('') || '?';

  // Ссылки для авторизованного dropdown
  const userMenuLinks = [
    { label: 'Профиль', path: '/profile', icon: User },
    { label: 'Сообщения', path: '/chat', icon: MessageCircle },
    ...(user?.role === 'candidate' ? [{ label: 'Личный кабинет', path: '/dashboard', icon: Briefcase }] : []),
    ...(user?.role === 'employer' ? [{ label: 'Панель работодателя', path: '/employer', icon: Briefcase }] : []),
    ...(user?.role === 'admin' ? [{ label: 'Админка', path: '/admin', icon: Shield }] : []),
    { label: 'Настройки', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background-dark/80 backdrop-blur-xl transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Правая часть (десктоп) */}
          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-text-muted hover:bg-surface-elevated hover:text-text-primary transition-colors">
              <Search size={16} />
            </button>

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-border text-text-muted hover:bg-surface-elevated hover:text-text-primary transition-colors"
              title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <div className="h-5 w-px bg-border mx-1"></div>

            {isAuthenticated && user ? (
              /* Авторизованный пользователь */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-surface-elevated transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {initials}
                  </div>
                  <span className="text-sm font-medium text-text-primary hidden lg:block max-w-[120px] truncate">{user.name}</span>
                  <ChevronDown size={14} className={`text-text-muted transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-surface-paper border border-border rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-border mb-1">
                      <p className="text-sm font-bold text-text-primary truncate">{user.name}</p>
                      <p className="text-xs text-text-muted truncate">{user.email}</p>
                    </div>
                    {userMenuLinks.map(link => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                      >
                        <link.icon size={16} /> {link.label}
                      </Link>
                    ))}
                    <div className="border-t border-border mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 w-full text-sm text-error hover:bg-error/5 transition-colors"
                      >
                        <LogOut size={16} /> Выйти
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Гость */
              <>
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
              </>
            )}
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

            {isAuthenticated && user ? (
              <>
                <div className="pt-3 border-t border-border space-y-1">
                  <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">{initials}</div>
                    <div><p className="text-sm font-bold text-text-primary">{user.name}</p><p className="text-xs text-text-muted">{user.email}</p></div>
                  </div>
                  {userMenuLinks.map(link => (
                    <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors">
                      <link.icon size={16}/> {link.label}
                    </Link>
                  ))}
                  <button onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 w-full rounded-lg text-sm text-error hover:bg-error/5 transition-colors">
                    <LogOut size={16}/> Выйти
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-3 border-t border-border flex gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}
                  className="flex-1 px-4 py-2 text-center text-sm font-medium text-text-secondary border border-border rounded-lg hover:bg-surface-elevated">
                  Вход
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}
                  className="flex-1 px-4 py-2 text-center text-sm font-medium text-white rounded-lg gradient-primary">
                  Регистрация
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
