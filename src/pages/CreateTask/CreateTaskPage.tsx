import { ChevronRight, CloudUpload, FileText, Settings, Code, Image as ImageIcon, Info, PlusCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreateTaskPage() {
  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 overflow-x-hidden">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2 text-text-muted text-[10px] uppercase tracking-[0.2em] font-bold">
            <Link to="/employer" className="hover:text-primary transition-colors">
              Кабинет
            </Link>
            <ChevronRight size={14} />
            <span className="text-text-primary">Новое задание</span>
          </div>
          <h1 className="text-text-primary text-2xl sm:text-4xl font-black tracking-tight leading-none font-sans">
            Создание задания
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-text-muted bg-transparent border border-border rounded hover:bg-white/5 transition-all">
            Отмена
          </button>
          <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-[11px] font-black uppercase tracking-widest text-white bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] rounded hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2">
            <CloudUpload size={18} />
            Опубликовать
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 sm:mb-10 bg-charcoal-light p-4 sm:p-6 rounded-lg border border-border shadow-xl">
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-black font-mono">
              Текущий этап
            </span>
            <span className="text-text-primary text-lg font-bold tracking-tight">
              1. Конфигурация условий
            </span>
          </div>
          <div className="text-right">
            <span className="text-primary text-2xl font-black italic">33%</span>
          </div>
        </div>
        <div className="h-1.5 w-full bg-charcoal rounded-full overflow-hidden flex gap-1.5">
          <div className="h-full bg-primary rounded-full w-1/3 shadow-[0_0_10px_rgba(77,142,255,0.3)]"></div>
          <div className="h-full bg-border/50 rounded-full w-1/3"></div>
          <div className="h-full bg-border/50 rounded-full w-1/3"></div>
        </div>
        <div className="grid grid-cols-3 mt-4">
          <div className="text-[10px] font-black tracking-widest text-primary uppercase font-mono">ИНФОРМАЦИЯ</div>
          <div className="text-[10px] font-black tracking-widest text-text-muted text-center uppercase font-mono">ТЕСТ-КЕЙСЫ</div>
          <div className="text-[10px] font-black tracking-widest text-text-muted text-right uppercase font-mono">РЕШЕНИЕ</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info */}
          <div className="bg-charcoal-light p-4 sm:p-8 rounded-lg border border-border shadow-lg">
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
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 font-mono">
                    Сложность
                  </label>
                  <select className="w-full rounded-lg border-border bg-charcoal text-text-primary px-4 py-3 focus:ring-1 focus:ring-primary focus:border-transparent outline-none border text-sm appearance-none">
                    <option disabled selected value="">Выберите уровень</option>
                    <option value="easy">Easy (Легко)</option>
                    <option value="medium">Medium (Средне)</option>
                    <option value="hard">Hard (Сложно)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 font-mono">
                    Категория
                  </label>
                  <select className="w-full rounded-lg border-border bg-charcoal text-text-primary px-4 py-3 focus:ring-1 focus:ring-primary focus:border-transparent outline-none border text-sm appearance-none">
                    <option value="algos">Алгоритмы</option>
                    <option value="ds">Структуры данных</option>
                    <option value="sql">Базы данных</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-text-muted uppercase tracking-[0.2em] mb-3 font-mono">
                  Тэги (через запятую)
                </label>
                <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-border bg-charcoal min-h-[50px] items-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-charcoal-light text-text-primary text-[10px] font-bold border border-border uppercase tracking-wider font-mono">
                    Binary Search
                    <button className="text-text-muted hover:text-red-400 transition-colors">×</button>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-charcoal-light text-text-primary text-[10px] font-bold border border-border uppercase tracking-wider font-mono">
                    Recursion
                    <button className="text-text-muted hover:text-red-400 transition-colors">×</button>
                  </span>
                  <input
                    className="bg-transparent border-none p-0 text-sm focus:ring-0 text-text-primary placeholder:text-text-muted/50 flex-1 ml-2 outline-none"
                    placeholder="Добавить..."
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Description Editor */}
          <div className="bg-charcoal-light p-4 sm:p-8 rounded-lg border border-border shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <FileText className="text-primary bg-primary/10 p-2 rounded" size={36} />
                <h3 className="text-xl font-bold text-text-primary tracking-tight uppercase font-sans">
                  Условие задачи
                </h3>
              </div>
              <div className="flex items-center gap-1 bg-charcoal p-1 rounded border border-border">
                <button className="p-1.5 rounded hover:bg-charcoal-light text-text-muted font-serif font-bold italic" title="Italic">I</button>
                <button className="p-1.5 rounded hover:bg-charcoal-light text-text-muted font-sans font-bold" title="Bold">B</button>
                <div className="w-px h-4 bg-border mx-1"></div>
                <button className="p-1.5 rounded hover:bg-charcoal-light text-text-muted" title="Code"><Code size={18} /></button>
                <button className="p-1.5 rounded hover:bg-charcoal-light text-text-muted" title="Image"><ImageIcon size={18} /></button>
              </div>
            </div>
            <textarea
              className="w-full min-h-[300px] rounded-lg border border-border bg-charcoal text-text-primary p-5 focus:ring-1 focus:ring-primary focus:border-transparent transition-all placeholder:text-text-muted/50 font-mono text-sm leading-relaxed outline-none resize-y"
              placeholder="Введите текст задания используя Markdown..."
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-black text-text-muted uppercase tracking-[0.2em] hover:text-text-primary transition-colors">
              Сохранить черновик
            </button>
            <button className="flex items-center justify-center gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] hover:opacity-90 text-white rounded font-black uppercase tracking-[0.2em] text-[11px] shadow-xl transition-all transform active:scale-95 group">
              Далее: Тест-кейсы
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Constraints */}
          <div className="bg-charcoal-light p-6 rounded-lg border border-border shadow-lg">
            <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] mb-8 flex items-center gap-3 font-mono">
              <Settings className="text-primary" size={18} />
              Ограничения
            </h4>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-wider font-mono">Лимит времени</span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-wider font-mono">2.0 сек</span>
                </div>
                <input
                  className="w-full h-1.5 bg-charcoal rounded-lg appearance-none cursor-pointer"
                  max="10"
                  min="0.1"
                  step="0.1"
                  type="range"
                  defaultValue="2"
                />
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-black text-text-muted uppercase tracking-wider font-mono">Лимит памяти</span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-wider font-mono">256 MB</span>
                </div>
                <input
                  className="w-full h-1.5 bg-charcoal rounded-lg appearance-none cursor-pointer"
                  max="1024"
                  min="64"
                  step="64"
                  type="range"
                  defaultValue="256"
                />
              </div>
            </div>
          </div>

          {/* Test cases sample */}
          <div className="bg-charcoal-light p-6 rounded-lg border border-border shadow-lg">
            <h4 className="text-[10px] font-black text-text-primary uppercase tracking-[0.2em] mb-6 flex items-center gap-3 font-mono">
              Пример теста
            </h4>
            <div className="space-y-5">
              <div className="bg-charcoal p-5 rounded border border-border relative">
                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest absolute top-2 right-3 font-mono">Input</label>
                <code className="text-[13px] text-blue-300 font-mono">root = [3,9,20,null,null,15,7]</code>
              </div>
              <div className="bg-charcoal p-5 rounded border border-border relative">
                <label className="text-[9px] font-black text-text-muted uppercase tracking-widest absolute top-2 right-3 font-mono">Output</label>
                <code className="text-[13px] text-green-400 font-mono">3</code>
              </div>
              <button className="w-full py-3.5 border border-dashed border-border hover:border-primary hover:bg-primary/5 text-[10px] font-black text-text-muted hover:text-text-primary uppercase tracking-widest rounded transition-all flex justify-center items-center gap-2 group font-mono">
                <PlusCircle size={18} className="group-hover:rotate-90 transition-transform" />
                Добавить тест-кейс
              </button>
            </div>
          </div>

          {/* Info Card */}
          <div className="relative bg-gradient-to-br from-charcoal-light to-charcoal rounded-lg p-6 border border-border shadow-xl overflow-hidden group">
            <div className="relative z-10 flex gap-4">
              <Info className="text-primary flex-shrink-0" size={24} />
              <div>
                <h5 className="text-[11px] font-black uppercase tracking-widest text-text-primary mb-3 leading-tight font-mono">
                  Гайдлайн платформы
                </h5>
                <p className="text-[11px] text-text-muted leading-relaxed font-inter mb-5">
                  Для задач категории "Алгоритмы" рекомендуется предоставлять минимум 10 автоматических тестов.
                </p>
                <a className="text-[10px] font-black text-primary hover:underline flex items-center gap-1 uppercase tracking-widest font-mono" href="#">
                  Документация
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
