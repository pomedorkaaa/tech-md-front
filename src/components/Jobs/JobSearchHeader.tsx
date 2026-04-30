import { Search, SlidersHorizontal } from 'lucide-react';

interface JobSearchHeaderProps {
  totalJobs: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  onToggleFilters: () => void;
}

export default function JobSearchHeader({
  totalJobs,
  searchQuery,
  onSearchChange,
  showFilters,
  onToggleFilters
}: JobSearchHeaderProps) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary">
          Найдено {totalJobs} вакансий
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Результаты поиска для Python, Frontend, Backend разработчиков
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center bg-surface-paper border border-border rounded-xl px-4">
          <Search size={18} className="text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Должность, компания или технология..."
            className="flex-1 bg-transparent px-3 py-3 text-text-primary placeholder:text-text-muted outline-none text-sm"
          />
        </div>
        <button
          onClick={onToggleFilters}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors
            ${showFilters
              ? 'border-primary/30 bg-primary/10 text-primary'
              : 'border-border bg-surface-paper text-text-secondary hover:text-text-primary'
            }`}
        >
          <SlidersHorizontal size={16} />
          Фильтры
        </button>
      </div>
    </>
  );
}
