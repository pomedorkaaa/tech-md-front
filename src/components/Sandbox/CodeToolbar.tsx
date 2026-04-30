import { Play, RotateCcw } from 'lucide-react';

interface CodeToolbarProps {
  language: string;
  isRunning: boolean;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onClear: () => void;
}

export default function CodeToolbar({ language, isRunning, onLanguageChange, onRun, onClear }: CodeToolbarProps) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-charcoal shrink-0">
      <div className="flex items-center gap-2">
        <select
          value={language}
          onChange={e => onLanguageChange(e.target.value)}
          className="bg-surface-elevated border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary/50"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="go">Go</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
        >
          <RotateCcw size={14} />
          <span className="hidden sm:inline">Сброс</span>
        </button>
        <button
          onClick={onRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 md:px-5 py-1.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-primary/20 disabled:opacity-50"
        >
          <Play size={14} />
          <span className="hidden sm:inline">{isRunning ? 'Запуск...' : 'Запустить'}</span>
        </button>
      </div>
    </div>
  );
}
