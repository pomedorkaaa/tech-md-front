import { useState, useRef, useCallback, useEffect, Suspense, lazy } from 'react';
import { Play, RotateCcw, ChevronRight, ChevronDown, Building2, GripVertical, GripHorizontal, Users, CheckCircle2, XCircle, Send } from 'lucide-react';
import type { Task } from '@/types';
import mockData from './SandboxMockData.json';

const CodeEditor = lazy(() => import('@uiw/react-textarea-code-editor'));
const { tasks } = mockData as { tasks: Task[] };

type MobileTab = 'task' | 'code' | 'output';

interface TestResult {
  label: string;
  passed: boolean;
  expected: unknown;
  received: unknown;
  error?: string;
}

// ─── JS execution engine ─────────────────────────────────────
function runTestCases(code: string, task: Task): { results: TestResult[]; summary: string } {
  const results: TestResult[] = [];
  const testCases = task.testCases ?? [];
  const fnName = task.functionName ?? '';

  for (const tc of testCases) {
    const label = tc.label ?? `${fnName}(${(tc.args as unknown[]).map(a => JSON.stringify(a)).join(', ')})`;
    try {
      // eslint-disable-next-line no-new-func
      const fn = new Function(code + `\nreturn ${fnName}(${(tc.args as unknown[]).map(a => JSON.stringify(a)).join(', ')});`);
      const received = fn();
      const passed = JSON.stringify(received) === JSON.stringify(tc.expected);
      results.push({ label, passed, expected: tc.expected, received });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      results.push({ label, passed: false, expected: tc.expected, received: undefined, error: msg });
    }
  }

  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  const summary = passed === total
    ? `🎉 Все тесты пройдены! (${passed}/${total})`
    : `❌ Пройдено ${passed} из ${total} тестов`;
  return { results, summary };
}

const DIFF_STYLES: Record<string, string> = {
  Easy: 'bg-success/15 text-success border-success/20',
  Medium: 'bg-warning/15 text-warning border-warning/20',
  Hard: 'bg-error/15 text-error border-error/20',
};

export default function SandboxPage() {
  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);
  const [code, setCode] = useState(tasks[0].defaultCode ?? '');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [summary, setSummary] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileTab>('task');
  const [taskListOpen, setTaskListOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // ─── Resize state ────────────────────────────────────
  const [panelWidth, setPanelWidth] = useState(380);
  const [outputHeight, setOutputHeight] = useState(220);
  const isResizing = useRef(false);
  const isResizingOutput = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startWidth = useRef(0);
  const startHeight = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = panelWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [panelWidth]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isResizing.current) {
        setPanelWidth(Math.max(280, Math.min(600, startWidth.current + e.clientX - startX.current)));
      }
      if (isResizingOutput.current) {
        setOutputHeight(Math.max(100, Math.min(500, startHeight.current - (e.clientY - startY.current))));
      }
    };
    const onUp = () => {
      isResizing.current = false;
      isResizingOutput.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, []);

  // ─── Task selection ──────────────────────────────────
  const selectTask = (task: Task) => {
    setSelectedTask(task);
    setCode(task.defaultCode ?? '');
    setTestResults([]);
    setSummary('');
    setTaskListOpen(false);
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const { results, summary: s } = runTestCases(code, selectedTask);
      setTestResults(results);
      setSummary(s);
      setIsRunning(false);
      if (window.innerWidth < 768) setMobileTab('output');
    }, 300);
  };

  const handleClear = () => {
    setCode(selectedTask.defaultCode ?? '');
    setTestResults([]);
    setSummary('');
    setIsSubmitted(false);
  };

  const allPassed = testResults.length > 0 && testResults.every(r => r.passed);

  const handleSubmit = () => {
    if (!allPassed) {
      alert('Сначала решите задачу и пройдите все тесты!');
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  // ─── Shared components ───────────────────────────────
  const renderTaskDescription = (compact = false) => (
    <div className={`space-y-${compact ? '4' : '5'}`}>
      <div>
        <div className="flex items-start gap-3 mb-3">
          <h1 className={`${compact ? 'text-lg' : 'text-xl'} font-black text-text-primary flex-1`}>{selectedTask.title}</h1>
          <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg border shrink-0 ${DIFF_STYLES[selectedTask.difficulty] ?? ''}`}>
            {selectedTask.difficulty}
          </span>
        </div>
        {selectedTask.companyName && (
          <div className={`flex items-center gap-${compact ? '3' : '4'} px-${compact ? '3' : '4'} py-${compact ? '2.5' : '3'} rounded-xl bg-surface-elevated border border-border mb-4`}>
            <div className={`w-${compact ? '8' : '9'} h-${compact ? '8' : '9'} rounded-lg bg-primary/15 flex items-center justify-center shrink-0`}>
              <Building2 size={compact ? 14 : 16} className="text-primary" />
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
              <div key={idx} className={`bg-surface-elevated rounded-xl p-${compact ? '3' : '4'} border border-border`}>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">Вход:</div>
                <code className="text-sm text-primary font-mono break-all">{ex.input}</code>
                <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mt-3 mb-1">Выход:</div>
                <code className="text-sm text-success font-mono break-all">{ex.output}</code>
                {ex.explanation && <p className="text-xs text-text-muted mt-2 italic border-t border-border pt-2">{ex.explanation}</p>}
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
  );

  const renderOutput = (isMobileView = false) => {
    if (testResults.length === 0 && !isMobileView) return null;
    if (testResults.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-text-muted">
          <Play size={32} className="mb-3 opacity-30" />
          <p className="text-sm">Нажмите «Запустить» для вывода результата</p>
        </div>
      );
    }
    const allPassed = testResults.every(r => r.passed);
    return (
      <div className="space-y-3">
        {/* Summary */}
        <div className={`flex items-center gap-3 p-3 rounded-xl border ${allPassed ? 'bg-success/10 border-success/30' : 'bg-error/10 border-error/30'}`}>
          {allPassed ? <CheckCircle2 size={20} className="text-success shrink-0" /> : <XCircle size={20} className="text-error shrink-0" />}
          <span className={`text-sm font-bold ${allPassed ? 'text-success' : 'text-error'}`}>{summary}</span>
        </div>
        {/* Individual test results */}
        {testResults.map((r, i) => (
          <div key={i} className={`p-3 rounded-xl border ${r.passed ? 'border-success/20 bg-success/5' : 'border-error/20 bg-error/5'}`}>
            <div className="flex items-center gap-2 mb-1">
              {r.passed
                ? <CheckCircle2 size={14} className="text-success shrink-0" />
                : <XCircle size={14} className="text-error shrink-0" />}
              <span className={`text-xs font-bold ${r.passed ? 'text-success' : 'text-error'}`}>
                Тест {i + 1}: {r.passed ? 'Пройден' : 'Провален'}
              </span>
            </div>
            <div className="ml-5 text-xs font-mono text-text-secondary space-y-0.5">
              <div><span className="text-text-muted">Вызов:</span> {r.label}</div>
              <div><span className="text-text-muted">Ожидалось:</span> <span className="text-success">{JSON.stringify(r.expected)}</span></div>
              {!r.passed && (
                <div>
                  <span className="text-text-muted">Получено:</span>{' '}
                  <span className="text-error">{r.error ? `Error: ${r.error}` : JSON.stringify(r.received)}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderToolbar = (compact = false) => (
    <div className={`flex items-center justify-between px-${compact ? '3' : '4'} py-2.5 border-b border-border bg-charcoal shrink-0`}>
      <div className="flex items-center gap-2">
        <select className="bg-surface-elevated border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-primary/50">
          <option value="javascript">JavaScript</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={handleClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors">
          <RotateCcw size={compact ? 13 : 14} />
          {!compact && <span>Сброс</span>}
        </button>
        <button onClick={handleRun} disabled={isRunning}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-primary/20 disabled:opacity-50">
          <Play size={compact ? 13 : 14} />
          <span>{isRunning ? 'Запуск...' : 'Запустить'}</span>
        </button>
        <button onClick={handleSubmit}
          disabled={!allPassed}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold transition-all shadow-md ${
            isSubmitted
              ? 'bg-success text-white shadow-success/20'
              : !allPassed
              ? 'bg-surface-elevated border border-border text-text-muted opacity-50 cursor-not-allowed shadow-none'
              : 'bg-surface-elevated border border-border text-text-primary hover:border-primary/50 hover:text-primary shadow-none'
          }`}>
          {isSubmitted ? <CheckCircle2 size={compact ? 13 : 14} /> : <Send size={compact ? 13 : 14} />}
          {!compact && <span>{isSubmitted ? 'Отправлено!' : 'Отправить'}</span>}
        </button>
      </div>
    </div>
  );

  const renderCodeEditor = () => (
    <div className="flex-1 overflow-auto bg-[#1d1f21]" data-color-mode="dark">
      <Suspense fallback={<div className="p-5 text-text-muted text-sm">Загрузка редактора...</div>}>
        <CodeEditor
          value={code}
          language="js"
          placeholder="Напишите ваш код здесь..."
          onChange={e => {
            setCode(e.target.value);
            if (testResults.length > 0) {
              setTestResults([]);
              setSummary('');
            }
          }}
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
  );

  const renderTaskList = (compact = false) => (
    <div className="space-y-1.5">
      {tasks.map(task => (
        <button key={task.id} onClick={() => selectTask(task)}
          className={`w-full flex items-start gap-3 p-3 ${compact ? '' : 'rounded-xl'} text-left transition-all ${
            selectedTask.id === task.id
              ? `bg-primary/10 ${compact ? '' : 'border border-primary/20'}`
              : `hover:bg-surface-elevated ${compact ? '' : 'border border-transparent'}`
          }`}>
          <span className={`mt-0.5 w-2.5 h-2.5 rounded-full shrink-0 ${
            task.difficulty === 'Easy' ? 'bg-success' : task.difficulty === 'Medium' ? 'bg-warning' : 'bg-error'
          }`} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className={`font-semibold text-sm truncate ${selectedTask.id === task.id ? 'text-primary' : 'text-text-primary'}`}>
                {task.title}
              </span>
              {!compact && <ChevronRight size={14} className="text-text-muted shrink-0" />}
            </div>
            {task.companyName && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <Building2 size={11} className="text-text-muted shrink-0" />
                <span className="text-[11px] text-text-muted truncate">{task.companyName}</span>
                {!compact && <>
                  <span className="text-text-muted text-[9px]">•</span>
                  <span className="text-[11px] text-text-secondary truncate">{task.position}</span>
                </>}
              </div>
            )}
          </div>
        </button>
      ))}
    </div>
  );

  // ─── Mobile ──────────────────────────────────────────
  const renderMobile = () => (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:hidden overflow-x-hidden">
      <div className="flex border-b border-border bg-charcoal shrink-0">
        {([
          { key: 'task' as MobileTab, label: 'Задача' },
          { key: 'code' as MobileTab, label: 'Код' },
          { key: 'output' as MobileTab, label: 'Вывод' },
        ]).map(tab => (
          <button key={tab.key} onClick={() => setMobileTab(tab.key)}
            className={`flex-1 py-3 text-sm font-bold text-center transition-colors ${
              mobileTab === tab.key ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-text-muted hover:text-text-primary'
            }`}>
            {tab.label}
            {tab.key === 'output' && testResults.length > 0 && (
              <span className={`ml-1.5 inline-block w-1.5 h-1.5 rounded-full ${testResults.every(r => r.passed) ? 'bg-success' : 'bg-error'}`} />
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {mobileTab === 'task' && (
          <div className="flex flex-col h-full">
            <button onClick={() => setTaskListOpen(!taskListOpen)}
              className="flex items-center justify-between p-4 border-b border-border bg-charcoal shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  selectedTask.difficulty === 'Easy' ? 'bg-success' : selectedTask.difficulty === 'Medium' ? 'bg-warning' : 'bg-error'
                }`} />
                <span className="font-semibold text-sm text-text-primary truncate">{selectedTask.title}</span>
              </div>
              <ChevronDown size={16} className={`text-text-muted transition-transform shrink-0 ml-2 ${taskListOpen ? 'rotate-180' : ''}`} />
            </button>
            {taskListOpen && (
              <div className="border-b border-border bg-surface-elevated max-h-60 overflow-y-auto">
                {renderTaskList(true)}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4">
              {renderTaskDescription(true)}
              <button onClick={() => setMobileTab('code')}
                className="w-full mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-bold text-white gradient-primary shadow-md shadow-primary/20">
                Начать решение <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {mobileTab === 'code' && (
          <div className="flex flex-col h-full">
            {renderToolbar(true)}
            {renderCodeEditor()}
          </div>
        )}

        {mobileTab === 'output' && (
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-charcoal shrink-0">
              <h3 className="text-xs font-black uppercase tracking-widest text-text-secondary">Результаты</h3>
              <button onClick={handleRun} disabled={isRunning}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-bold text-white gradient-primary hover:opacity-90 transition-opacity shadow-md shadow-primary/20 disabled:opacity-50">
                <Play size={13} /> Запустить
              </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto bg-background-dark">
              {renderOutput(true)}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ─── Desktop ─────────────────────────────────────────
  const renderDesktop = () => (
    <div className="h-[calc(100vh-4rem)] hidden md:flex">
      {/* Left panel: tasks */}
      <div className="shrink-0 border-r border-border bg-charcoal flex flex-col overflow-hidden" style={{ width: panelWidth }}>
        <div className="border-b border-border p-4">
          <h2 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Задачи</h2>
          {renderTaskList()}
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {renderTaskDescription()}
        </div>
      </div>

      {/* Resize handle */}
      <div onMouseDown={handleMouseDown}
        className="w-1.5 shrink-0 bg-border hover:bg-primary/40 cursor-col-resize flex items-center justify-center transition-colors group">
        <GripVertical size={12} className="text-text-muted group-hover:text-primary transition-colors" />
      </div>

      {/* Right panel: editor */}
      <div className="flex-1 flex flex-col min-w-0">
        {renderToolbar()}
        {renderCodeEditor()}

        {/* Vertical resize handle for output */}
        {testResults.length > 0 && (
          <div onMouseDown={(e) => {
            isResizingOutput.current = true;
            startY.current = e.clientY;
            startHeight.current = outputHeight;
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';
          }}
            className="h-1.5 shrink-0 bg-border hover:bg-primary/40 cursor-row-resize flex items-center justify-center transition-colors group">
            <GripHorizontal size={12} className="text-text-muted group-hover:text-primary transition-colors" />
          </div>
        )}

        {/* Output panel */}
        {testResults.length > 0 && (
          <div className="border-t border-border bg-charcoal px-5 pt-4 pb-3 overflow-y-auto shrink-0" style={{ height: outputHeight }}>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-text-secondary mb-3">Результаты</h3>
            {renderOutput()}
          </div>
        )}
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
