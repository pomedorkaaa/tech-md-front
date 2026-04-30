import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, RotateCcw, ChevronRight, Building2, GripVertical, Users } from 'lucide-react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-go';
import 'prismjs/themes/prism-tomorrow.css';
import mockData from './SandboxMockData.json';
import type { Task } from '../../types';

const { tasks } = mockData as { tasks: Task[] };

const DEFAULT_CODE = `function sum_two_numbers(a, b) {
  // Напишите ваше решение здесь
  return a + b;
}`;

const TEST_CASES = [
  { a: 2, b: 3, expected: 5 },
  { a: -1, b: 1, expected: 0 },
  { a: 0, b: 0, expected: 0 },
  { a: 10, b: -5, expected: 5 },
];

function highlightCode(code: string, lang: string): string {
  try {
    const grammar = Prism.languages[lang] ?? Prism.languages['javascript'];
    return Prism.highlight(code, grammar, lang);
  } catch {
    return code;
  }
}

function runJavaScript(code: string): string {
  try {
    const runner = new Function(
      'a',
      'b',
      [
        code,
        'if (typeof sum_two_numbers === "function") {',
        '  return sum_two_numbers(a, b);',
        '}',
        'throw new Error("Функция sum_two_numbers не найдена");',
      ].join('\n')
    );

    let results = '';
    let passed = 0;

    for (let i = 0; i < TEST_CASES.length; i++) {
      const tc = TEST_CASES[i];
      try {
        const res = runner(tc.a, tc.b) as number;
        if (res === tc.expected) {
          results += `\u2713 Тест ${i + 1}: sum_two_numbers(${tc.a}, ${tc.b}) = ${res} — Пройден\n`;
          passed++;
        } else {
          results += `\u2717 Тест ${i + 1}: sum_two_numbers(${tc.a}, ${tc.b}) = ${res} (ожидалось ${tc.expected}) — Провален\n`;
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        results += `\u2717 Тест ${i + 1}: Ошибка выполнения — ${msg}\n`;
      }
    }

    if (passed === TEST_CASES.length) {
      results += '\nВсе тесты пройдены! 🎉';
    } else {
      results += `\nПройдено ${passed} из ${TEST_CASES.length} тестов.`;
    }

    return results;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return `Ошибка компиляции: ${msg}`;
  }
}

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy:   'bg-success/15 text-success border-success/20',
  Medium: 'bg-warning/15 text-warning border-warning/20',
  Hard:   'bg-error/15 text-error border-error/20',
};

export default function SandboxPage() {
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isRunning, setIsRunning] = useState(false);

  // ─── Ресайз панели задач ──────────────────────────────────
  const [panelWidth, setPanelWidth] = useState(380);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

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
        setOutput(runJavaScript(code));
      } else {
        setOutput(
          'ℹ️ В демо-режиме компиляция поддерживается только для JavaScript.\n\nПереключите язык на JavaScript, чтобы проверить код.'
        );
      }
      setIsRunning(false);
    }, 400);
  };

  const handleClear = () => {
    setCode('');
    setOutput('');
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col-reverse md:flex-row">

      {/* ─── Левая панель: задачи ─────────────────────────────── */}
      <div
        className="shrink-0 border-b md:border-b-0 md:border-r border-border bg-charcoal flex flex-col overflow-hidden h-1/2 md:h-full"
        style={{ width: isMobile ? '100%' : panelWidth }}
      >
        {/* Список задач */}
        <div className="border-b border-border p-4 overflow-y-auto">
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
                <span
                  className={`mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ${
                    task.difficulty === 'Easy'
                      ? 'bg-success'
                      : task.difficulty === 'Medium'
                      ? 'bg-warning'
                      : 'bg-error'
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`font-semibold text-sm truncate ${
                        selectedTask.id === task.id ? 'text-primary' : 'text-text-primary'
                      }`}
                    >
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
              <span
                className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border shrink-0 ${
                  DIFFICULTY_STYLES[selectedTask.difficulty] ?? ''
                }`}
              >
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

          <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
            {selectedTask.description}
          </p>

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
                      <p className="text-xs text-text-muted mt-2 italic border-t border-border pt-2">
                        {ex.explanation}
                      </p>
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
      <div className="flex-1 flex flex-col min-w-0 h-1/2 md:h-full">
        {/* Тулбар */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-charcoal">
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
              <RotateCcw size={14} /> <span className="hidden sm:inline">Очистить</span>
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 md:px-5 py-1.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-primary/20 disabled:opacity-50"
            >
              <Play size={14} /> <span className="hidden sm:inline">{isRunning ? 'Запуск...' : 'Запустить'}</span>
            </button>
          </div>
        </div>

        {/* Редактор */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto bg-[#1d1f21]">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={c => highlightCode(c, language)}
              padding={20}
              style={{
                fontFamily: '"Fira Code", "JetBrains Mono", "Cascadia Code", monospace',
                fontSize: 14,
                lineHeight: 1.6,
                minHeight: '100%',
                backgroundColor: '#1d1f21',
              }}
              textareaClassName="focus:outline-none"
            />
          </div>

          {/* Вывод */}
          {output && (
            <div className="h-40 border-t border-border bg-charcoal p-5 overflow-y-auto shrink-0">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-3">Вывод</h3>
              <pre className="text-sm font-mono text-success whitespace-pre-wrap">{output}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
