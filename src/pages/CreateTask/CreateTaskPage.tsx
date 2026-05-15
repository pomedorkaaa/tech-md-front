import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Code, Tag, ChevronDown } from 'lucide-react';
import { createTask } from '../../services/api';

export default function CreateTaskPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [data, setData] = useState({
    title: '',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    category: 'Algorithms',
    tags: '',
    companyName: '',
    position: '',
    description: '',
    examples: '',
    constraints: '',
    language: 'JavaScript',
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (key: keyof typeof data, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (!tag) return;
    const tags = data.tags.split(',').map(s => s.trim()).filter(Boolean);
    if (!tags.includes(tag)) tags.push(tag);
    setData(prev => ({ ...prev, tags: tags.join(', ') }));
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    const tags = data.tags.split(',').map(s => s.trim()).filter(Boolean).filter(t => t !== tag);
    setData(prev => ({ ...prev, tags: tags.join(', ') }));
  };

  const tagsList = data.tags.split(',').map(s => s.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!data.title.trim() || !data.description.trim()) {
      setError('Заполните название и описание');
      return;
    }
    setSubmitting(true);
    try {
      await createTask({
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        category: data.category || 'Algorithms',
        tags: data.tags,
        companyName: data.companyName || undefined,
        position: data.position || undefined,
        examples: data.examples,
        constraints: data.constraints,
        language: data.language || undefined,
      });
      navigate('/employer');
    } catch (err: any) {
      setError(err?.message || 'Не удалось создать задачу');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/employer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Вернуться в панель управления
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary mb-2">Создание задачи</h1>
        <p className="text-text-secondary">Опишите алгоритмическую задачу для оценки кандидатов.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{error}</div>
        )}

        {/* Основная информация */}
        <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border space-y-6">
          <h2 className="text-xl font-bold text-text-primary pb-2 border-b border-border flex items-center gap-2">
            <FileText size={20} className="text-primary" /> Основная информация
          </h2>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Название задачи <span className="text-error">*</span>
            </label>
            <input
              type="text"
              required
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Например, Разворот связного списка"
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Сложность</label>
              <div className="relative">
                <select
                  value={data.difficulty}
                  onChange={(e) => handleChange('difficulty', e.target.value)}
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary appearance-none focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Категория</label>
              <input
                type="text"
                value={data.category}
                onChange={(e) => handleChange('category', e.target.value)}
                placeholder="Algorithms"
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Язык</label>
              <input
                type="text"
                value={data.language}
                onChange={(e) => handleChange('language', e.target.value)}
                placeholder="JavaScript"
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <Tag size={14} /> Тэги
            </label>
            <div className="flex flex-wrap items-center gap-2 p-2 bg-surface-elevated border border-border rounded-lg min-h-[44px]">
              {tagsList.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="text-primary/70 hover:text-error transition-colors">×</button>
                </span>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Добавить тэг и Enter"
                className="bg-transparent flex-1 min-w-[140px] outline-none text-sm text-text-primary placeholder:text-text-muted px-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Компания (опц.)</label>
              <input
                type="text"
                value={data.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Позиция (опц.)</label>
              <input
                type="text"
                value={data.position}
                onChange={(e) => handleChange('position', e.target.value)}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Описание */}
        <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border space-y-6">
          <h2 className="text-xl font-bold text-text-primary pb-2 border-b border-border flex items-center gap-2">
            <Code size={20} className="text-primary" /> Условие задачи
          </h2>
          <textarea
            required
            rows={6}
            value={data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Подробное описание задачи..."
            className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none resize-none"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Примеры (JSON или текст)</label>
              <textarea
                rows={5}
                value={data.examples}
                onChange={(e) => handleChange('examples', e.target.value)}
                placeholder='[{"input":"[1,2]","output":"[2,1]"}]'
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none resize-none font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Ограничения (через ; или новую строку)</label>
              <textarea
                rows={5}
                value={data.constraints}
                onChange={(e) => handleChange('constraints', e.target.value)}
                placeholder="1 ≤ n ≤ 1000;  значения целые"
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none resize-none font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/employer')}
            disabled={submitting}
            className="px-6 py-3 border border-border text-text-secondary font-bold text-sm rounded-lg hover:bg-surface-elevated transition-colors disabled:opacity-60"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-dark transition-colors shadow-md shadow-primary/20 disabled:opacity-60"
          >
            {submitting ? 'Публикация...' : 'Опубликовать задачу'}
          </button>
        </div>
      </form>
    </div>
  );
}
