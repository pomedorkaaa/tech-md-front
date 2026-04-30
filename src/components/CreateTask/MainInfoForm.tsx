import { FileText } from 'lucide-react';
import { useState } from 'react';

interface MainInfoFormProps {
  data: {
    title: string;
    difficulty: string;
    category: string;
    tags: string[];
  };
  onChange: (updates: Partial<MainInfoFormProps['data']>) => void;
}

export default function MainInfoForm({ data, onChange }: MainInfoFormProps) {
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !data.tags.includes(newTag.trim())) {
      onChange({ tags: [...data.tags, newTag.trim()] });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange({ tags: data.tags.filter(t => t !== tagToRemove) });
  };

  return (
    <div className="bg-charcoal-light p-8 rounded-lg border border-border shadow-lg">
      <div className="flex items-center gap-3 mb-8 border-b border-border/30 pb-4">
        <FileText className="text-primary bg-primary/10 p-2 rounded" size={36} />
        <h3 className="text-xl font-bold text-text-primary tracking-tight uppercase font-sans">
          Основная информация
        </h3>
      </div>
      
      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 font-mono">
            Название задания
          </label>
          <input
            className="w-full rounded-lg border-border bg-charcoal text-text-primary px-4 py-3 focus:ring-1 focus:ring-primary focus:border-transparent transition-all placeholder:text-text-muted/50 text-sm outline-none border"
            placeholder="Например: Поиск в бинарном дереве"
            type="text"
            value={data.title}
            onChange={(e) => onChange({ title: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 font-mono">
              Сложность
            </label>
            <select 
              className="w-full rounded-lg border-border bg-charcoal text-text-primary px-4 py-3 focus:ring-1 focus:ring-primary focus:border-transparent outline-none border text-sm appearance-none"
              value={data.difficulty}
              onChange={(e) => onChange({ difficulty: e.target.value })}
            >
              <option disabled value="">Выберите уровень</option>
              <option value="easy">Easy (Легко)</option>
              <option value="medium">Medium (Средне)</option>
              <option value="hard">Hard (Сложно)</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 font-mono">
              Категория
            </label>
            <select 
              className="w-full rounded-lg border-border bg-charcoal text-text-primary px-4 py-3 focus:ring-1 focus:ring-primary focus:border-transparent outline-none border text-sm appearance-none"
              value={data.category}
              onChange={(e) => onChange({ category: e.target.value })}
            >
              <option value="algos">Алгоритмы</option>
              <option value="ds">Структуры данных</option>
              <option value="sql">Базы данных</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 font-mono">
            Тэги (через запятую или Enter)
          </label>
          <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-border bg-charcoal min-h-[50px] items-center">
            {data.tags.map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-charcoal-light text-text-primary text-[10px] font-bold border border-border uppercase tracking-wider font-mono">
                {tag}
                <button 
                  onClick={() => removeTag(tag)}
                  className="text-text-muted hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
            <input
              className="bg-transparent border-none p-0 text-sm focus:ring-0 text-text-primary placeholder:text-text-muted/50 flex-1 ml-2 outline-none"
              placeholder="Добавить..."
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
