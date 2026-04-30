import { GripHorizontal } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  outputHeight: number;
  onResizeStart: (e: React.MouseEvent) => void;
}

export default function OutputPanel({ output, outputHeight, onResizeStart }: OutputPanelProps) {
  if (!output) return null;

  return (
    <>
      {/* Вертикальный ресайз-разделитель */}
      <div
        onMouseDown={onResizeStart}
        className="h-1.5 shrink-0 bg-border hover:bg-primary/40 cursor-row-resize flex items-center justify-center transition-colors group"
      >
        <GripHorizontal size={12} className="text-text-muted group-hover:text-primary transition-colors" />
      </div>

      {/* Панель вывода */}
      <div
        className="border-t border-border bg-charcoal px-5 pt-4 pb-3 overflow-y-auto shrink-0"
        style={{ height: outputHeight }}
      >
        <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-3">Вывод</h3>
        <div className="text-sm font-mono whitespace-pre-wrap">
          {output.split('\n').map((line, i) => (
            <div key={i} className={
              line.includes('\u274c') || line.includes('\u2717') || line.includes('Error') || line.includes('Провален')
                ? 'text-error'
                : line.includes('\u2713') || line.includes('Пройден') || line.includes('🎉')
                ? 'text-success'
                : line.includes('\u26a0')
                ? 'text-warning'
                : 'text-text-secondary'
            }>
              {line}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
