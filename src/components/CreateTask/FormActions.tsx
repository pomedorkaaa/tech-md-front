import { ChevronRight } from 'lucide-react';

export default function FormActions() {
  return (
    <div className="flex justify-between items-center pt-4">
      <button className="flex items-center gap-2 px-6 py-3 text-[11px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-text-primary transition-colors">
        Сохранить черновик
      </button>
      <button className="flex items-center gap-3 px-10 py-4 bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] hover:opacity-90 text-white rounded font-black uppercase tracking-[0.2em] text-[11px] shadow-xl transition-all transform active:scale-95 group">
        Далее: Тест-кейсы
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
