import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, RotateCcw, ChevronRight, ChevronDown, Building2, GripVertical, Users } from 'lucide-react';
import mockData from './SandboxMockData.json';
const { tasks } = mockData as any;

type MobileTab = 'task' | 'code' | 'output';

export default function SandboxPage() {
  const [selectedTask, setSelectedTask] = useState(tasks[0]);
  const [code, setCode] = useState(`def sum_two_numbers(a, b):
    # Напишите ваше решение здесь
    return a + b`);
  const [output, setOutput] = useState('');
  const [mobileTab, setMobileTab] = useState<MobileTab>('task');
  const [taskListOpen, setTaskListOpen] = useState(false);

  // ─── Ресайз панели задач (только десктоп) ─────────────────────────────
  const [panelWidth, setPanelWidth] = useState(380);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = panelWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [panelWidth]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const delta = e.clientX - startX.current;
      const newWidth = Math.max(280, Math.min(600, startWidth.current + delta));
      setPanelWidth(newWidth);
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleRun = () => {
    setOutput('✓ Тест 1: sum_two_numbers(2, 3) = 5 — Пройден\n✓ Тест 2: sum_two_numbers(-1, 1) = 0 — Пройден\n✓ Тест 3: sum_two_numbers(0, 0) = 0 — Пройден\n\nВсе тесты пройдены! 🎉');
    // Автоматически переключаемся на вкладку вывода на мобильных
    if (window.innerWidth < 768) {
      setMobileTab('output');
    }
  };

  const difficultyStyles = {
    Easy: 'bg-success/15 text-success border-success/20',
    Medium: 'bg-warning/15 text-warning border-warning/20',
    Hard: 'bg-error/15 text-error border-error/20',
  };

  // ─── Мобильная версия ─────────────────────────────
  const renderMobile = () => (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:hidden overflow-x-hidden">
      {/* Мобильные вкладки */}
      <div className="flex border-b border-border bg-charcoal shrink-0">
        {([
          { key: 'task' as MobileTab, label: 'Задача' },
          { key: 'code' as MobileTab, label: 'Код' },
          { key: 'output' as MobileTab, label: 'Вывод' },
        ]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setMobileTab(tab.key)}
            className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${
              mobileTab === tab.key
                ? 'text-primary border-b-2 border-primary bg-primary/5'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {tab.label}
            {tab.key === 'output' && output && (
              <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-success"></span>
            )}
          </button>
        ))}
      </div>

      {/* Мобильный контент вкладок */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* Вкладка «Задача» */}
        {mobileTab === 'task' && (
          <div className="flex flex-col h-full">
            {/* Выбор задачи (аккордеон) */}
            <button
              onClick={() => setTaskListOpen(!taskListOpen)}
              className="flex items-center justify-between p-4 border-b border-border bg-charcoal shrink-0"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  selectedTask.difficulty === 'Easy' ? 'bg-success' :
                  selectedTask.difficulty === 'Medium' ? 'bg-warning' :
                  'bg-error'
                }`} />
                <span className="font-semibold text-sm text-text-primary truncate">{selectedTask.title}</span>
              </div>
              <ChevronDown size={16} className={`text-text-muted transition-transform shrink-0 ml-2 ${taskListOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Список задач (раскрывающийся) */}
            {taskListOpen && (
              <div className="border-b border-border bg-surface-elevated max-h-60 overflow-y-auto">
                {tasks.map(task => (
                  <button
                    key={task.id}
                    onClick={() => { setSelectedTask(task); setTaskListOpen(false); }}
                    className={`w-full flex items-start gap-3 p-3 text-left transition-all ${
                      selectedTask.id === task.id
                        ? 'bg-primary/10'
                        : 'hover:bg-surface-elevated'
                    }`}
                  >
                    <span className={`mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                      task.difficulty === 'Easy' ? 'bg-success' :
                      task.difficulty === 'Medium' ? 'bg-warning' :
                      'bg-error'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <span className={`font-semibold text-sm truncate block ${
                        selectedTask.id === task.id ? 'text-primary' : 'text-text-primary'
                      }`}>
                        {task.title}
                      </span>
                      {task.companyName && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <Building2 size={11} className="text-text-muted shrink-0" />
                          <span className="text-[11px] text-text-muted truncate">{task.companyName}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Описание задачи */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <div className="flex items-start gap-3 mb-3">
                  <h1 className="text-lg font-black text-text-primary flex-1">{selectedTask.title}</h1>
                  <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border shrink-0 ${difficultyStyles[selectedTask.difficulty]}`}>
                    {selectedTask.difficulty}
                  </span>
                </div>

                {selectedTask.companyName && (
                  <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-surface-elevated border border-border mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                      <Building2 size={14} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-text-primary">{selectedTask.companyName}</p>
                      <p className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                        <Users size={11} /> {selectedTask.position}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                {selectedTask.description}
              </p>

              {/* Примеры */}
              {selectedTask.examples.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Примеры</h3>
                  <div className="space-y-3">
                    {selectedTask.examples.map((ex, idx) => (
                      <div key={idx} className="bg-surface-elevated rounded-xl p-3 border border-border">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Вход:</div>
                        <code className="text-sm text-primary font-mono break-all">{ex.input}</code>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-3 mb-1">Выход:</div>
                        <code className="text-sm text-success font-mono break-all">{ex.output}</code>
                        {ex.explanation && (
                          <p className="text-xs text-text-muted mt-2 italic border-t border-border pt-2">{ex.explanation}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ограничения */}
              {selectedTask.constraints.length > 0 && (
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Ограничения</h3>
                  <ul className="space-y-1.5">
                    {selectedTask.constraints.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="text-primary mt-1">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Кнопка «Начать решение» */}
              <button
                onClick={() => setMobileTab('code')}
                className="w-full mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white gradient-primary shadow-md shadow-primary/20"
              >
                Начать решение <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Вкладка «Код» */}
        {mobileTab === 'code' && (
          <div className="flex flex-col h-full">
            {/* Мобильный тулбар */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-charcoal shrink-0">
              <select className="bg-surface-elevated border border-border rounded-lg px-2 py-1.5 text-sm text-text-primary outline-none focus:border-primary/50">
                <option>Python</option>
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Go</option>
              </select>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { setCode(''); setOutput(''); }}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
                >
                  <RotateCcw size={13} />
                </button>
                <button
                  onClick={handleRun}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
                >
                  <Play size={13} /> Запуск
                </button>
              </div>
            </div>

            {/* Редактор кода */}
            <div className="flex-1 relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="absolute inset-0 w-full h-full bg-background-dark p-4 text-sm font-mono text-text-primary outline-none resize-none leading-relaxed"
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {/* Вкладка «Вывод» */}
        {mobileTab === 'output' && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-charcoal shrink-0">
              <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Вывод</h3>
              <button
                onClick={handleRun}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
              >
                <Play size={13} /> Запустить
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-background-dark">
              {output ? (
                <pre className="text-sm font-mono text-success whitespace-pre-wrap break-words">{output}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-text-muted">
                  <Play size={32} className="mb-3 opacity-30" />
                  <p className="text-sm">Нажмите «Запустить» для вывода результата</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ─── Десктоп версия (оригинальная) ─────────────────────────────
  const renderDesktop = () => (
    <div className="h-[calc(100vh-4rem)] hidden md:flex">
      {/* ─── Левая панель: задачи ─────────────────────── */}
      <div
        className="shrink-0 border-r border-border bg-charcoal flex flex-col overflow-hidden"
        style={{ width: panelWidth }}
      >
        {/* Список задач */}
        <div className="border-b border-border p-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Задачи</h2>
          <div className="space-y-1.5">
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                  selectedTask.id === task.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-surface-elevated border border-transparent'
                }`}
              >
                <span className={`mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                  task.difficulty === 'Easy' ? 'bg-success' :
                  task.difficulty === 'Medium' ? 'bg-warning' :
                  'bg-error'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-semibold text-sm truncate ${
                      selectedTask.id === task.id ? 'text-primary' : 'text-text-primary'
                    }`}>
                      {task.title}
                    </span>
                    <ChevronRight size={14} className="text-text-muted shrink-0" />
                  </div>
                  {/* Компания и должность в компактном виде */}
                  {task.companyName && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Building2 size={11} className="text-text-muted shrink-0" />
                      <span className="text-[11px] text-text-muted truncate">{task.companyName}</span>
                      <span className="text-text-muted text-[9px]">•</span>
                      <span className="text-[11px] text-text-secondary truncate">{task.position}</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Описание выбранной задачи */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          <div>
            <div className="flex items-start gap-3 mb-3">
              <h1 className="text-xl font-black text-text-primary flex-1">{selectedTask.title}</h1>
              <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border shrink-0 ${difficultyStyles[selectedTask.difficulty]}`}>
                {selectedTask.difficulty}
              </span>
            </div>

            {/* Компания и должность развернуто */}
            {selectedTask.companyName && (
              <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-elevated border border-border mb-4">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Building2 size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-primary">{selectedTask.companyName}</p>
                  <p className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5">
                    <Users size={11} /> {selectedTask.position}
                  </p>
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
            {selectedTask.description}
          </p>

          {/* Примеры */}
          {selectedTask.examples.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Примеры</h3>
              <div className="space-y-3">
                {selectedTask.examples.map((ex, idx) => (
                  <div key={idx} className="bg-surface-elevated rounded-xl p-4 border border-border">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Вход:</div>
                    <code className="text-sm text-primary font-mono">{ex.input}</code>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-3 mb-1">Выход:</div>
                    <code className="text-sm text-success font-mono">{ex.output}</code>
                    {ex.explanation && (
                      <p className="text-xs text-text-muted mt-2 italic border-t border-border pt-2">{ex.explanation}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ограничения */}
          {selectedTask.constraints.length > 0 && (
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Ограничения</h3>
              <ul className="space-y-1.5">
                {selectedTask.constraints.map((c, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-primary mt-1">•</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ─── Ресайз-разделитель ─────────────────────────── */}
      <div
        onMouseDown={handleMouseDown}
        className="w-1.5 shrink-0 bg-border hover:bg-primary/40 cursor-col-resize flex items-center justify-center transition-colors group"
      >
        <GripVertical size={12} className="text-text-muted group-hover:text-primary transition-colors" />
      </div>

      {/* ─── Правая панель: редактор кода ──────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Тулбар */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-charcoal">
          <div className="flex items-center gap-2">
            <select className="bg-surface-elevated border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary/50">
              <option>Python</option>
              <option>JavaScript</option>
              <option>TypeScript</option>
              <option>Go</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setCode(''); setOutput(''); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <RotateCcw size={14} /> Очистить
            </button>
            <button
              onClick={handleRun}
              className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
            >
              <Play size={14} /> Запустить
            </button>
          </div>
        </div>

        {/* Редактор */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 relative">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="absolute inset-0 w-full h-full bg-background-dark p-5 text-sm font-mono text-text-primary outline-none resize-none leading-relaxed"
              spellCheck={false}
            />
          </div>

          {/* Вывод */}
          {output && (
            <div className="h-1/3 border-t border-border bg-charcoal p-5 overflow-y-auto">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-3">Вывод</h3>
              <pre className="text-sm font-mono text-success whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {renderMobile()}
      {renderDesktop()}
    </>
  );
}
