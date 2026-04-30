import { PlusCircle } from 'lucide-react';

export default function TestCasesSample() {
  return (
    <div className="bg-charcoal-light p-6 rounded-lg border border-border shadow-lg">
      <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-mono">
        Пример теста
      </h4>
      <div className="space-y-5">
        <div className="bg-charcoal p-5 rounded border border-border relative">
          <label className="text-[9px] font-black text-text-muted uppercase tracking-widest absolute top-2 right-3 font-mono">Input</label>
          <code className="text-[13px] text-blue-300 font-mono">root = [3,9,20,null,null,15,7]</code>
        </div>
        <div className="bg-charcoal p-5 rounded border border-border relative">
          <label className="text-[9px] font-black text-text-muted uppercase tracking-widest absolute top-2 right-3 font-mono">Output</label>
          <code className="text-[13px] text-green-400 font-mono">3</code>
        </div>
        <button className="w-full py-3.5 border border-dashed border-border hover:border-primary hover:bg-primary/5 text-[10px] font-black text-text-muted hover:text-text-primary uppercase tracking-widest rounded transition-all flex justify-center items-center gap-2 group font-mono">
          <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
          Добавить тест-кейс
        </button>
      </div>
    </div>
  );
}
