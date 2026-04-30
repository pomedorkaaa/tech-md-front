import { ChevronRight, Building2 } from 'lucide-react';
import type { Task } from '../../types';

interface TasksListProps {
  tasks: Task[];
  selectedTask: Task;
  onSelectTask: (task: Task) => void;
}

export default function TasksList({ tasks, selectedTask, onSelectTask }: TasksListProps) {
  return (
    <div className="border-b border-border p-4 overflow-y-auto max-h-48 md:max-h-none">
      <h2 className="text-xs font-black uppercase tracking-widest text-text-secondary mb-3">Задачи</h2>
      <div className="space-y-1.5">
        {tasks.map(task => (
          <button
            key={task.id}
            onClick={() => onSelectTask(task)}
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
  );
}
