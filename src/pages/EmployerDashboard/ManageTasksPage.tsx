import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { getTasks, deleteTask } from '../../services/api';
import type { Task } from '../../types';

export default function ManageTasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then(setTasks)
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    setError('');
    setDeletingId(id);
    try {
      await deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      setConfirmId(null);
    } catch (err: any) {
      setError(err?.message || 'Не удалось удалить задачу');
    } finally {
      setDeletingId(null);
    }
  };

  const diffStyles: Record<string, string> = {
    Easy: 'bg-success/10 text-success border-success/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    Hard: 'bg-error/10 text-error border-error/20',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/employer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Вернуться в панель
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-primary mb-1">Задачи</h1>
          <p className="text-sm text-text-secondary">Управление задачами для песочницы</p>
        </div>
        <Link
          to="/employer/tasks/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
        >
          <Plus size={16} /> Новая задача
        </Link>
      </div>

      {error && (
        <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm mb-4">{error}</div>
      )}

      {loading ? (
        <div className="text-center py-12 text-text-muted">Загрузка...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 text-text-muted text-sm">Нет задач — создайте первую</div>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task.id} className="gradient-card rounded-xl p-5 border border-border flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-text-primary truncate">{task.title}</h3>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border ${diffStyles[task.difficulty] || ''}`}>
                    {task.difficulty}
                  </span>
                  <span className="text-xs text-text-muted">{task.category}</span>
                  {task.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs text-text-muted">• {tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {confirmId === task.id ? (
                  <>
                    <button
                      onClick={() => setConfirmId(null)}
                      disabled={deletingId === task.id}
                      className="px-3 py-1.5 rounded-lg border border-border text-text-secondary text-xs font-medium hover:bg-surface-elevated transition-colors disabled:opacity-60"
                    >
                      Отмена
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      disabled={deletingId === task.id}
                      className="px-3 py-1.5 rounded-lg bg-error text-white text-xs font-bold hover:bg-error/80 transition-colors disabled:opacity-60"
                    >
                      {deletingId === task.id ? 'Удаление...' : 'Удалить'}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirmId(task.id)}
                    className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors"
                    title="Удалить задачу"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
