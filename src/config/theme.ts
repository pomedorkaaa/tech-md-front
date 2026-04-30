/**
 * Централизованные дизайн-токены TechMoldova
 * 
 * Измените значения здесь — они автоматически применятся ко всему проекту.
 * Этот файл является единственным источником правды для шрифтов, цветов,
 * скруглений, теней и прочих визуальных параметров.
 */

// ─── Цвета ───────────────────────────────────────────────
export const colors = {
  // Основной акцентный цвет
  primary: {
    DEFAULT: '#1e1eff',
    light: '#4747f5',
    dark: '#1212cc', // primary-dark из Stitch
    50: '#eef0ff',
    100: '#dee2ff',
    200: '#c4c8ff',
    300: '#a0a4ff',
    400: '#7a7cff',
    500: '#5c5bf9',
    600: '#1e1eff',
    700: '#1212cc',
    800: '#0c0c88',
    900: '#080855',
  },

  // Поверхности (фоны) по названиям из Stitch
  surface: {
    DEFAULT: '#0a0a0b',     // background-dark
    paper: '#161618',        // surface-dark
    charcoal: '#121214',     // charcoal
    charcoalLight: '#1c1c1f', // charcoal-light
    elevated: '#1c1c1f',     // мапинг для совместимости
    overlay: '#374151',
  },

  // Текст
  text: {
    primary: '#f3f4f6',      // gray-100
    secondary: '#9ca3af',    // gray-400
    muted: '#6b7280',        // gray-500
    inverse: '#121214',      // charcoal
  },

  // Границы
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.05)', // border-white/5
    light: 'rgba(255, 255, 255, 0.1)',    // border-white/10
    focus: '#1e1eff',
  },

  // Статусы
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Градиенты (строки для CSS)
  gradients: {
    primary: 'linear-gradient(135deg, #1e1eff 0%, #1212cc 100%)',
    hero: 'linear-gradient(135deg, #0a0a0b 0%, #121214 50%, #0a0a0b 100%)',
    card: 'linear-gradient(145deg, #121214 0%, #1c1c1f 100%)',
  },
} as const;

// ─── Шрифты ──────────────────────────────────────────────
export const fonts = {
  // Семейства шрифтов
  family: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  },

  // Размеры шрифтов (rem)
  size: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },

  // Толщина шрифта
  weight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Межстрочный интервал
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const;

// ─── Скругления ──────────────────────────────────────────
export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  DEFAULT: '0.5rem', // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// ─── Тени ────────────────────────────────────────────────
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
  glow: '0 0 20px rgba(30,30,255,0.3)',
  'glow-lg': '0 0 40px rgba(30,30,255,0.4)',
} as const;

// ─── Анимация ────────────────────────────────────────────
export const animation = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;

// ─── Брейкпоинты ─────────────────────────────────────────
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ─── Экспорт всей темы ──────────────────────────────────
const theme = {
  colors,
  fonts,
  borderRadius,
  shadows,
  animation,
  breakpoints,
} as const;

export type Theme = typeof theme;
export default theme;
