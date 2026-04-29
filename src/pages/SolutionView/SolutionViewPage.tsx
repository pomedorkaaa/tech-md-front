import { Link } from 'react-router-dom';
import { ChevronRight, Clock, Ban, Calendar, Zap, Brain, CheckCircle, ShieldAlert, FileCode2, Copy, Settings, CheckCircle2, Sparkles, Edit3 } from 'lucide-react';

export default function SolutionViewPage() {
  return (
    <div className="flex-1 flex justify-center py-6 sm:py-8 px-4 sm:px-8 overflow-x-hidden">
      <div className="w-full max-w-[1400px] flex flex-col gap-6">
        
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

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group flex flex-col gap-1 rounded-xl p-5 bg-charcoal-light border border-border hover:border-yellow-400/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest font-mono">Runtime</p>
              <Zap size={20} className="text-yellow-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-text-primary text-3xl font-black font-sans">45<span className="text-sm font-normal text-text-muted ml-1">ms</span></p>
            </div>
            <p className="text-yellow-400 text-[11px] font-bold flex items-center gap-1 mt-2 font-mono">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              ТОП 15% ПО СКОРОСТИ
            </p>
          </div>
          <div className="group flex flex-col gap-1 rounded-xl p-5 bg-charcoal-light border border-border hover:border-blue-400/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest font-mono">Memory</p>
              <Brain size={20} className="text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-text-primary text-3xl font-black font-sans">12.4<span className="text-sm font-normal text-text-muted ml-1">MB</span></p>
            </div>
            <p className="text-blue-400 text-[11px] font-bold flex items-center gap-1 mt-2 font-mono">
              <CheckCircle size={14} />
              ОПТИМАЛЬНЫЙ РАСХОД
            </p>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-5 bg-charcoal-light border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest font-mono">Tests</p>
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-text-primary text-3xl font-black font-sans">15<span className="text-text-muted font-light mx-1">/</span>15</p>
            </div>
            <p className="text-green-400 text-[11px] font-bold mt-2 font-mono">ВСЕ ТЕСТЫ ПРОЙДЕНЫ</p>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-5 bg-charcoal-light border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest font-mono">Code Quality</p>
              <ShieldAlert size={20} className="text-orange-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-text-primary text-3xl font-black font-sans">A<span className="text-text-muted text-xl">-</span></p>
            </div>
            <p className="text-text-secondary text-[11px] font-bold mt-2 uppercase tracking-tight font-mono">2 ЗАМЕЧАНИЯ LINTER</p>
          </div>
        </div>

        {/* Code & Tests Layout */}
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

        {/* Recruiter Notes */}
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

      </div>
    </div>
  );
}
