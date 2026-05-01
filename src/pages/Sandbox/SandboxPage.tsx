import { useState, useRef, useCallback, useEffect, lazy, Suspense } from 'react';
import { GripVertical } from 'lucide-react';
import mockData from './SandboxMockData.json';
import type { Task } from '../../types';
import TasksList from '../../components/Sandbox/TasksList';
import TaskDescription from '../../components/Sandbox/TaskDescription';
import CodeToolbar from '../../components/Sandbox/CodeToolbar';
import OutputPanel from '../../components/Sandbox/OutputPanel';
import { runJavaScript } from '../../utils/sandboxRunner';

// Ленивая загрузка редактора кода
const CodeEditor = lazy(() => import('@uiw/react-textarea-code-editor').then(m => ({ default: m.default })));

const { tasks } = mockData as { tasks: Task[] };

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
    const handleWindowResize = () => setIsMobile(window.innerWidth < 768);
    handleWindowResize();

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
        <TasksList
          tasks={tasks}
          selectedTask={selectedTask}
          onSelectTask={handleTaskSelect}
        />
        <TaskDescription task={selectedTask} />
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
        <CodeToolbar
          language={language}
          isRunning={isRunning}
          onLanguageChange={setLanguage}
          onRun={handleRun}
          onClear={handleClear}
        />

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

        <OutputPanel
          output={output}
          outputHeight={outputHeight}
          onResizeStart={(e) => {
            isResizingOutput.current = true;
            startY.current = e.clientY;
            startHeight.current = outputHeight;
            document.body.style.cursor = 'row-resize';
            document.body.style.userSelect = 'none';
          }}
        />
      </div>
    </div>
  );
}
