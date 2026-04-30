export default function ProgressBar() {
  return (
    <div className="mb-10 bg-charcoal-light p-6 rounded-lg border border-border shadow-xl">
      <div className="flex justify-between items-end mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-black font-mono">
            Текущий этап
          </span>
          <span className="text-text-primary text-lg font-bold tracking-tight">
            1. Конфигурация условий
          </span>
        </div>
        <div className="text-right">
          <span className="text-primary text-2xl font-black italic">33%</span>
        </div>
      </div>
      <div className="h-1.5 w-full bg-charcoal rounded-full overflow-hidden flex gap-1.5">
        <div className="h-full bg-primary rounded-full w-1/3 shadow-[0_0_10px_rgba(77,142,255,0.3)]"></div>
        <div className="h-full bg-border/50 rounded-full w-1/3"></div>
        <div className="h-full bg-border/50 rounded-full w-1/3"></div>
      </div>
      <div className="grid grid-cols-3 mt-4">
        <div className="text-[10px] font-black tracking-widest text-primary uppercase font-mono">ИНФОРМАЦИЯ</div>
        <div className="text-[10px] font-black tracking-widest text-text-muted text-center uppercase font-mono">ТЕСТ-КЕЙСЫ</div>
        <div className="text-[10px] font-black tracking-widest text-text-muted text-right uppercase font-mono">РЕШЕНИЕ</div>
      </div>
    </div>
  );
}
