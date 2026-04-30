import { Link, useLocation } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

export interface SidebarNavItem {
  icon: LucideIcon;
  label: string;
  path: string;
  badge?: number;
}

interface SidebarProps {
  items: SidebarNavItem[];
  title?: string;
  subtitle?: string;
  bottomItems?: SidebarNavItem[];
}

export default function Sidebar({ items, title, subtitle, bottomItems }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-surface-paper border-r border-border flex flex-col">
      {/* Заголовок */}
      {title && (
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary">{title}</h2>
          {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Основная навигация */}
      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated'
                }`}
            >
              <Icon size={18} />
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary font-semibold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Нижняя навигация */}
      {bottomItems && bottomItems.length > 0 && (
        <div className="p-4 border-t border-border space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
}
