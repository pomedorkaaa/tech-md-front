import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Ban, Calendar } from 'lucide-react';

export const SolutionHeader: React.FC = () => {
  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider font-mono">
        <Link to="/employer" className="text-text-muted hover:text-primary transition-colors">
          Кандидаты
        </Link>
        <ChevronRight size={14} className="text-text-secondary" />
        <Link to="/jobs" className="text-text-muted hover:text-primary transition-colors">
          Back-end Разработчик
        </Link>
        <ChevronRight size={14} className="text-text-secondary" />
        <span className="text-text-primary">Иван Петров</span>
      </div>

      {/* Profile / Solution Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center bg-charcoal-light p-6 rounded-xl border border-border shadow-xl">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest font-mono">
              Статус: Принято
            </span>
            <span className="text-text-muted text-sm flex items-center gap-1.5 font-inter">
              <Clock size={16} />
              2 часа назад
            </span>
          </div>
          <h1 className="text-text-primary text-2xl font-black leading-tight tracking-tight font-sans">
            Задача: Оптимизация алгоритма QuickSort
          </h1>
          <p className="text-text-secondary text-sm max-w-3xl leading-relaxed font-inter">
            Кандидат реализовал алгоритм быстрой сортировки с выбором медианы в качестве опорного элемента. 
            Продемонстрировано владение Python list comprehensions и понимание рекурсивных процессов.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border text-text-secondary hover:bg-surface-elevated hover:text-text-primary transition-all font-semibold text-sm">
            <Ban size={18} />
            <span>Отклонить</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:opacity-90 transition-all font-bold text-sm shadow-[0_0_20px_rgba(77,142,255,0.2)]">
            <Calendar size={18} />
            <span>Назначить интервью</span>
          </button>
        </div>
      </div>
    </>
  );
};
