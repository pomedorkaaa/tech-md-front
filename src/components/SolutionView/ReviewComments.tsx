import { Edit3 } from 'lucide-react';

export const ReviewComments: React.FC = () => {
  return (
    <div className="bg-charcoal-light rounded-xl border border-border shadow-xl p-6 mb-12">
      <h3 className="text-sm font-bold text-text-primary mb-5 uppercase tracking-wider flex items-center gap-2 font-mono">
        <Edit3 className="text-primary" size={18} />
        Заметки рекрутера
      </h3>
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-3">
          <textarea 
            className="w-full p-4 rounded-xl border border-border bg-charcoal text-text-primary placeholder:text-text-muted/50 focus:ring-2 focus:ring-primary/50 text-sm min-h-[120px] transition-all outline-none" 
            placeholder="Оставьте комментарий к этому решению..."
          ></textarea>
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-text-secondary font-medium font-mono">Заметка будет видна только команде подбора</p>
            <button className="bg-white text-black hover:bg-gray-200 px-6 py-2 rounded-lg text-xs font-black uppercase transition-all shadow-lg font-mono tracking-widest">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
