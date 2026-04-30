import { Info, ExternalLink } from 'lucide-react';

export default function GuidelineCard() {
  return (
    <div className="relative bg-gradient-to-br from-charcoal-light to-charcoal rounded-lg p-6 border border-border shadow-xl overflow-hidden group">
      <div className="relative z-10 flex gap-4">
        <Info className="text-primary flex-shrink-0" size={24} />
        <div>
          <h5 className="text-[11px] font-black uppercase tracking-widest text-text-primary mb-3 leading-tight font-mono">
            Гайдлайн платформы
          </h5>
          <p className="text-[11px] text-text-muted leading-relaxed font-inter mb-5">
            Для задач категории "Алгоритмы" рекомендуется предоставлять минимум 10 автоматических тестов.
          </p>
          <a className="text-[10px] font-black text-primary hover:underline flex items-center gap-1 uppercase tracking-widest font-mono" href="#">
            Документация
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
