import { useState, useRef, useCallback, useEffect, lazy, Suspense } from 'react';
import { Play, RotateCcw, ChevronRight, Building2, GripVertical, GripHorizontal, Users } from 'lucide-react';
import mockData from './SandboxMockData.json';
import type { Task } from '../../types';

// Ленивая загрузка редактора кода
const CodeEditor = lazy(() => import('@uiw/react-textarea-code-editor').then(m => ({ default: m.default })));

const { tasks } = mockData as { tasks: Task[] };

// Глубокое сравнение результатов (для массивов и объектов)
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null || a === undefined || b === undefined) return false;
  if (typeof a !== typeof b) return false;
  if (typeof a !== 'object') return false;
  const ja = JSON.stringify(a);
  const jb = JSON.stringify(b);
  return ja === jb;
}

function formatValue(val: unknown): string {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

// Форматирование ошибки как в настоящем компиляторе
function formatError(err: unknown): string {
  if (!(err instanceof Error)) return String(err);
  const name = err.constructor.name || 'Error';
  const msg = err.message;
  // Пытаемся достать номер строки из стека
  const stack = err.stack || '';
  const lineMatch = stack.match(/<anonymous>:(\d+):(\d+)/);
  const location = lineMatch ? ' (строка ' + lineMatch[1] + ', позиция ' + lineMatch[2] + ')' : '';
  return name + location + ': ' + msg;
}

// Универсальный запуск JS-кода с тестами из задачи
function runJavaScript(code: string, task: Task): string {
  const fnName = task.functionName;
  const testCases = task.testCases;

  if (!fnName || !testCases || testCases.length === 0) {
    return '\u26a0\ufe0f Для этой задачи тесты ещё не настроены.';
  }

  // Шаг 1: Проверяем, что код вообще парсится
  try {
    new Function(code);
  } catch (err: unknown) {
    return '\u274c SyntaxError\n\n' + formatError(err) + '\n\nКод не может быть выполнен — исправьте синтаксическую ошибку.';
  }

  // Шаг 2: Проверяем, что нужная функция определена
  try {
    const checkFn = new Function(code + '\nreturn typeof ' + fnName + ';');
    const fnType = checkFn();
    if (fnType !== 'function') {
      return '\u274c Функция "' + fnName + '" не найдена\n\nВаш код не содержит функцию с именем ' + fnName + '.\nУбедитесь, что имя функции совпадает с заданием.';
    }
  } catch (err: unknown) {
    // Код парсится, но при выполнении верхнего уровня падает — это runtime-ошибка
    return '\u274c ' + formatError(err) + '\n\nОшибка возникла при выполнении кода верхнего уровня (вне функции).';
  }

  // Шаг 3: Пробный запуск на первом тесте — ловим runtime-ошибки внутри функции
  const firstTc = testCases[0];
  try {
    const argsJson = JSON.stringify(firstTc.args);
    const probe = new Function(code + '\nreturn ' + fnName + '.apply(null, ' + argsJson + ');');
    probe();
  } catch (err: unknown) {
    // Отличаем ошибки кода от логических ошибок
    if (err instanceof ReferenceError || err instanceof TypeError || err instanceof RangeError || err instanceof URIError) {
      return '\u274c ' + formatError(err) + '\n\nОшибка возникла при вызове ' + fnName + '(' + firstTc.args.map(a => formatValue(a)).join(', ') + ').\nПроверьте переменные и типы данных в вашем коде.';
    }
    // Если это другая ошибка (например, пользователь сам кидает throw) — продолжаем к тестам
  }

  // Шаг 4: Прогоняем все тесты
  let results = '';
  let passed = 0;

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    const label = tc.label || (fnName + '(' + tc.args.map(a => formatValue(a)).join(', ') + ')');

    try {
      const argsJson = JSON.stringify(tc.args);
      const wrapper = new Function(code + '\nreturn ' + fnName + '.apply(null, ' + argsJson + ');');
      const res = wrapper();

      if (deepEqual(res, tc.expected)) {
        results += '\u2713 Тест ' + (i + 1) + ': ' + label + ' \u2192 ' + formatValue(res) + ' — Пройден\n';
        passed++;
      } else {
        results += '\u2717 Тест ' + (i + 1) + ': ' + label + ' \u2192 ' + formatValue(res) + ' (ожидалось ' + formatValue(tc.expected) + ') — Провален\n';
      }
    } catch (err: unknown) {
      results += '\u2717 Тест ' + (i + 1) + ': ' + label + ' — ' + formatError(err) + '\n';
    }
  }

  if (passed === testCases.length) {
    results += '\nВсе тесты пройдены! 🎉 (' + passed + '/' + testCases.length + ')';
  } else {
    results += '\nПройдено ' + passed + ' из ' + testCases.length + ' тестов.';
  }

  return results;
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy:   'bg-success/15 text-success border-success/20',
  Medium: 'bg-warning/15 text-warning border-warning/20',
  Hard:   'bg-error/15 text-error border-error/20',
};

export default function SandboxPage() {
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
  const [savedCodes, setSavedCodes] = useState<Record<string, string>>({});
  const [code, setCode] = useState(tasks[0].defaultCode || '');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ─── Ресайз панели задач (горизонтальный) ─────────────────
  const [panelWidth, setPanelWidth] = useState(380);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  // ─── Ресайз вывода (вертикальный) ─────────────────────────
  const [outputHeight, setOutputHeight] = useState(180);
  const isResizingOutput = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isResizing.current = true;
      startX.current = e.clientX;
      startWidth.current = panelWidth;
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    },
    [panelWidth]
  );

  useEffect(() => {
    // Определяем isMobile только после монтирования, чтобы избежать ошибок
    setIsMobile(window.innerWidth < 768);

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing.current) {
        const delta = e.clientX - startX.current;
        const newWidth = Math.max(280, Math.min(600, startWidth.current + delta));
        setPanelWidth(newWidth);
      }
      if (isResizingOutput.current) {
        const delta = startY.current - e.clientY;
        const container = editorContainerRef.current;
        const maxH = container ? container.clientHeight - 100 : 500;
        const newHeight = Math.max(60, Math.min(maxH, startHeight.current + delta));
        setOutputHeight(newHeight);
      }
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      isResizingOutput.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    const handleWindowResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleRun = () => {
    setIsRunning(true);
    setOutput('Запуск тестов...\n');
    setTimeout(() => {
      if (language === 'javascript') {
        setOutput(runJavaScript(code, selectedTask));
      } else {
        setOutput('ℹ️ В демо-режиме доступно только JavaScript.\n\nПереключите язык на JavaScript, чтобы проверить код.');
      }
      setIsRunning(false);
    }, 400);
  };

  const handleTaskSelect = (task: Task) => {
    if (task.id === selectedTask.id) return;
    setSelectedTask(task);
    setCode(savedCodes[task.id] || task.defaultCode || '');
    setOutput('');
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    setSavedCodes(prev => ({ ...prev, [selectedTask.id]: newCode }));
  };

  const handleClear = () => {
    const def = selectedTask.defaultCode || '';
    setCode(def);
    setSavedCodes(prev => ({ ...prev, [selectedTask.id]: def }));
    setOutput('');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col-reverse md:flex-row overflow-hidden">

      {/* ─── Левая панель: задачи ─────────────────────────────── */}
      <div
        className="shrink-0 border-b md:border-b-0 md:border-r border-border bg-charcoal flex flex-col overflow-hidden h-1/2 md:h-full"
        style={{ width: isMobile ? '100%' : panelWidth }}
      >
        {/* Список задач */}
        <div className="border-b border-border p-4 overflow-y-auto max-h-48 md:max-h-none">
          <h2 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Задачи</h2>
          <div className="space-y-1.5">
            {tasks.map(task => (
              <button
                key={task.id}
                onClick={() => handleTaskSelect(task)}
                className={
                  'w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ' +
                  (selectedTask.id === task.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-surface-elevated border border-transparent')
                }
              >
                <span
                  className={
                    'mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ' +
                    (task.difficulty === 'Easy' ? 'bg-success' : task.difficulty === 'Medium' ? 'bg-warning' : 'bg-error')
                  }
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={'font-semibold text-sm truncate ' + (selectedTask.id === task.id ? 'text-primary' : 'text-text-primary')}>
                      {task.title}
                    </span>
                    <ChevronRight size={14} className="text-text-muted shrink-0" />
                  </div>
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
              <span className={'px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border shrink-0 ' + (DIFFICULTY_STYLES[selectedTask.difficulty] ?? '')}>
                {selectedTask.difficulty}
              </span>
            </div>

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

          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">{selectedTask.description}</p>

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

      {/* ─── Ресайз-разделитель ──────────────────────────────── */}
      {!isMobile && (
        <div
          onMouseDown={handleMouseDown}
          className="w-1.5 shrink-0 bg-border hover:bg-primary/40 cursor-col-resize hidden md:flex items-center justify-center transition-colors group"
        >
          <GripVertical size={12} className="text-text-muted group-hover:text-primary transition-colors" />
        </div>
      )}

      {/* ─── Правая панель: редактор кода ───────────────────── */}
      <div ref={editorContainerRef} className="flex-1 flex flex-col min-w-0 h-1/2 md:h-full overflow-hidden">
        {/* Тулбар */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-charcoal shrink-0">
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-surface-elevated border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary/50"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Сброс</span>
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 md:px-5 py-1.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-primary/20 disabled:opacity-50"
            >
              <Play size={14} />
              <span className="hidden sm:inline">{isRunning ? 'Запуск...' : 'Запустить'}</span>
            </button>
          </div>
        </div>

        {/* Редактор */}
        <div className="flex-1 overflow-auto bg-[#1d1f21]" data-color-mode="dark">
          <Suspense fallback={<div className="p-5 text-text-muted text-sm">Загрузка редактора...</div>}>
            <CodeEditor
              value={code}
              language={language === 'typescript' ? 'ts' : language === 'javascript' ? 'js' : language}
              placeholder="Напишите ваш код здесь..."
              onChange={e => handleCodeChange(e.target.value)}
              padding={20}
              style={{
                fontSize: 14,
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                lineHeight: 1.6,
                minHeight: '100%',
                backgroundColor: '#1d1f21',
                color: '#c5c8c6',
              }}
            />
          </Suspense>
        </div>

        {/* ─── Ресайз-разделитель вертикальный ──────────────── */}
        {output && (
          <div
            onMouseDown={(e) => {
              isResizingOutput.current = true;
              startY.current = e.clientY;
              startHeight.current = outputHeight;
              document.body.style.cursor = 'row-resize';
              document.body.style.userSelect = 'none';
            }}
            className="h-1.5 shrink-0 bg-border hover:bg-primary/40 cursor-row-resize flex items-center justify-center transition-colors group"
          >
            <GripHorizontal size={12} className="text-text-muted group-hover:text-primary transition-colors" />
          </div>
        )}

        {/* Вывод */}
        {output && (
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
        )}
      </div>
    </div>
  );
}
