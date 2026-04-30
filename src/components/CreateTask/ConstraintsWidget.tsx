import { Settings } from 'lucide-react';

interface ConstraintsWidgetProps {
  timeLimit: number;
  memoryLimit: number;
  onChange: (updates: { timeLimit?: number; memoryLimit?: number }) => void;
}

export default function ConstraintsWidget({ timeLimit, memoryLimit, onChange }: ConstraintsWidgetProps) {
  return (
    <div className="bg-charcoal-light p-6 rounded-lg border border-border shadow-lg">
      <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] mb-8 flex items-center gap-3 font-mono">
        <Settings className="text-primary" size={18} />
        Ограничения
      </h4>
      <div className="space-y-8">
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-wider font-mono">Лимит времени</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-wider font-mono">{timeLimit.toFixed(1)} сек</span>
          </div>
          <input
            className="w-full h-1.5 bg-charcoal rounded-lg appearance-none cursor-pointer"
            max="10"
            min="0.1"
            step="0.1"
            type="range"
            value={timeLimit}
            onChange={(e) => onChange({ timeLimit: parseFloat(e.target.value) })}
          />
        </div>
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-[10px] font-black text-text-muted uppercase tracking-wider font-mono">Лимит памяти</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-wider font-mono">{memoryLimit} MB</span>
          </div>
          <input
            className="w-full h-1.5 bg-charcoal rounded-lg appearance-none cursor-pointer"
            max="1024"
            min="64"
            step="64"
            type="range"
            value={memoryLimit}
            onChange={(e) => onChange({ memoryLimit: parseInt(e.target.value, 10) })}
          />
        </div>
      </div>
    </div>
  );
}
