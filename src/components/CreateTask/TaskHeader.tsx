import { ChevronRight, CloudUpload } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TaskHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
      <div>
        <div className="flex items-center gap-2 mb-2 text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">
          <Link to="/employer" className="hover:text-primary transition-colors">
            Кабинет
          </Link>
          <ChevronRight size={14} />
          <span className="text-text-primary">Новое задание</span>
        </div>
        <h1 className="text-text-primary text-4xl font-black tracking-tight leading-none font-sans">
          Создание задания
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-text-muted bg-transparent border border-border rounded hover:bg-white/5 transition-all">
          Отмена
        </button>
        <button className="px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-white bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] rounded hover:opacity-90 transition-all shadow-lg flex items-center gap-2">
          <CloudUpload size={18} />
          Опубликовать
        </button>
      </div>
    </div>
  );
}
