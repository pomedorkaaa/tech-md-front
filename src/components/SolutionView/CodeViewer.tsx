import { FileCode2, Copy, Settings, CheckCircle2, Sparkles } from 'lucide-react';

export const CodeViewer: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[600px]">
      {/* Main Code View */}
      <div className="lg:col-span-2 bg-charcoal-light rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-charcoal/80">
          <div className="flex items-center gap-3">
            <FileCode2 className="text-text-secondary" size={20} />
            <h3 className="font-bold text-text-primary text-sm tracking-tight font-sans">solution.py</h3>
            <div className="flex items-center gap-1 bg-charcoal px-2 py-0.5 rounded border border-border">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="text-[10px] text-text-secondary font-mono">Python 3.11</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-charcoal rounded text-text-muted hover:text-text-primary transition-colors">
              <Copy size={18} />
            </button>
            <button className="p-2 hover:bg-charcoal rounded text-text-muted hover:text-text-primary transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-charcoal text-text-primary font-mono text-sm overflow-auto relative">
          <div className="flex">
            <div className="w-12 bg-charcoal border-r border-border text-text-muted/50 flex flex-col items-center pt-4 select-none text-[11px] sticky left-0">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <div className="flex-1 p-4 whitespace-pre leading-relaxed overflow-x-auto text-[13px]">
              <span className="text-purple-400">class</span> <span className="text-yellow-300">Solution</span>:{'\n'}
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">quickSort</span>(<span className="text-orange-400">self</span>, <span className="text-text-primary">arr</span>):{'\n'}
              {'        '}<span className="text-text-muted italic"># Базовый случай рекурсии</span>{'\n'}
              {'        '}<span className="text-purple-400">if</span> <span className="text-sky-400">len</span>(arr) &lt;= <span className="text-amber-400">1</span>:{'\n'}
              {'            '}<span className="text-purple-400">return</span> arr{'\n'}
              {'        '}<span className="text-text-muted italic"># Выбор опорного элемента (pivot)</span>{'\n'}
              {'        '}pivot = arr[<span className="text-sky-400">len</span>(arr) // <span className="text-amber-400">2</span>]{'\n'}
              {'        '}<span className="text-text-muted italic"># Разделение на три списка</span>{'\n'}
              {'        '}left = [x <span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> arr <span className="text-purple-400">if</span> x &lt; pivot]{'\n'}
              {'        '}middle = [x <span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> arr <span className="text-purple-400">if</span> x == pivot]{'\n'}
              {'        '}right = [x <span className="text-purple-400">for</span> x <span className="text-purple-400">in</span> arr <span className="text-purple-400">if</span> x &gt; pivot]{'\n'}
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">self</span>.quickSort(left) + middle + <span className="text-orange-400">self</span>.quickSort(right){'\n'}
              {'    '}<span className="text-purple-400">def</span> <span className="text-blue-400">process</span>(<span className="text-orange-400">self</span>, <span className="text-text-primary">input_data</span>):{'\n'}
              {'        '}<span className="text-purple-400">return</span> <span className="text-orange-400">self</span>.quickSort(input_data)
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Tests Output */}
        <div className="bg-charcoal-light rounded-xl border border-border shadow-xl flex flex-col flex-1">
          <div className="p-5 border-b border-border flex justify-between items-center">
            <h3 className="font-bold text-text-primary text-sm uppercase tracking-wider font-sans">Тесты</h3>
            <span className="text-[10px] font-bold bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 uppercase font-mono">Все пройдены</span>
          </div>
          <div className="p-0 overflow-y-auto max-h-[350px]">
            <div className="flex items-start gap-3 p-4 border-b border-border hover:bg-surface-elevated transition-colors">
              <CheckCircle2 className="text-green-400 mt-0.5" size={18} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-text-primary">#1: Basic Array</p>
                  <span className="text-[10px] text-text-muted font-mono">1.2ms</span>
                </div>
                <div className="mt-2 bg-charcoal p-2 rounded text-[10px] text-text-secondary font-mono truncate border border-border">
                  In: [5, 2, 9, 1]
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border-b border-border hover:bg-surface-elevated transition-colors">
              <CheckCircle2 className="text-green-400 mt-0.5" size={18} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-text-primary">#2: Reversed</p>
                  <span className="text-[10px] text-text-muted font-mono">0.8ms</span>
                </div>
                <div className="mt-2 bg-charcoal p-2 rounded text-[10px] text-text-secondary font-mono truncate border border-border">
                  In: [10, 5, 2, 1]
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 border-b border-border hover:bg-surface-elevated transition-colors">
              <CheckCircle2 className="text-green-400 mt-0.5" size={18} />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-text-primary">#3: Duplicates</p>
                  <span className="text-[10px] text-text-muted font-mono">2.1ms</span>
                </div>
                <div className="mt-2 bg-charcoal p-2 rounded text-[10px] text-text-secondary font-mono truncate border border-border">
                  In: [1, 1, 1, 1]
                </div>
              </div>
            </div>
            <div className="p-4 bg-charcoal/30 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-charcoal bg-green-500 flex items-center justify-center text-[8px] font-black text-black">12+</div>
              </div>
              <p className="text-[11px] text-text-secondary font-medium">Остальные тесты успешно завершены</p>
            </div>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-gradient-to-br from-charcoal-light to-charcoal rounded-xl border border-purple-500/20 p-5 shadow-lg relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all"></div>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-purple-400" size={20} />
            <h3 className="font-bold text-text-primary text-xs uppercase tracking-widest font-mono">AI Анализ Решения</h3>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed mb-4">
            Код демонстрирует чистую реализацию. Использование памяти <span className="text-purple-400">O(n)</span> из-за создания новых списков на каждом этапе. Рекомендуется обсудить <span className="bg-charcoal px-1 rounded text-text-primary italic border border-border">in-place</span> оптимизацию на интервью.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded-md bg-charcoal text-[9px] font-bold text-text-secondary border border-border font-mono">READABILITY: 9/10</span>
            <span className="px-2 py-1 rounded-md bg-charcoal text-[9px] font-bold text-text-secondary border border-border font-mono">OPTIMAL: YES</span>
          </div>
        </div>
      </div>
    </div>
  );
};
