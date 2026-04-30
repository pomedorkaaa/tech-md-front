import { Link } from 'react-router-dom';
import { Search, ArrowRight, Flame, Code, Building2, Briefcase } from 'lucide-react';
import mockData from './HomeMockData.json';
import sandboxData from '../Sandbox/SandboxMockData.json';
const { jobs, companies } = mockData as { jobs: any[], companies: any[] };
const { tasks } = sandboxData as any;

export default function HomePage() {
  const featuredJobs = jobs.slice(0, 4);

  return (
    <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 min-h-screen relative">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

      {/* ─── Hero ─────────────────────────────────────────── */}
      <section className="relative">
        <div className="flex flex-col lg:flex-row items-center gap-10 py-8">
          <div className="flex-1 flex flex-col gap-6 text-center lg:text-left z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                452 новых вакансии в Кишиневе
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-text-primary leading-tight">
                Твоя IT карьера <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">в Молдове</span>
              </h1>

              <p className="text-base text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Первая гибридная платформа: находи работу и проходи технические интервью на одной площадке. От джуна до лида в лучших компаниях страны.
              </p>
            </div>

            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <form className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-primary" />
                </div>
                <input 
                  type="text" 
                  placeholder="Должность, навык или компания..." 
                  className="block w-full pl-12 pr-32 py-4 rounded-xl border border-border bg-charcoal text-text-primary shadow-xl focus:ring-2 focus:ring-primary focus:border-transparent placeholder-text-muted transition-all outline-none text-sm" 
                />
                <div className="absolute inset-y-1.5 right-1.5 flex items-center">
                  <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 h-full rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20">
                    Поиск
                  </button>
                </div>
              </form>

              <div className="mt-4 overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex w-max lg:w-auto items-center gap-x-4 gap-y-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                  <span className="text-primary/60">Топ категории:</span>
                  {['Frontend', 'Python', 'QA Automation', 'DevOps'].map(tag => (
                    <Link
                      key={tag}
                      to={`/jobs?q=${tag}`}
                      className="hover:text-primary transition-colors whitespace-nowrap"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Правая часть (Hero) */}
          <div className="flex-1 w-full max-w-md hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden border border-border bg-charcoal shadow-2xl">
              <div className="h-8 border-b border-border bg-charcoal-light flex items-center px-4 gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                <div className="ml-3 h-4 w-24 bg-surface-elevated rounded"></div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 border-b border-border pb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Code size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="h-3 w-24 bg-surface-elevated rounded mb-1.5"></div>
                    <div className="h-2 w-36 bg-surface-elevated/50 rounded"></div>
                  </div>
                </div>
                <div className="space-y-1.5 font-mono text-xs text-primary/70">
                  <p><span>class</span> <span className="text-text-primary">Solution:</span></p>
                  <p className="pl-3"><span>def</span> <span className="text-text-primary">findDreamJob</span>(talent: Talent):</p>
                  <p className="pl-6"><span>return</span> TechHire.connect(talent, <span className="text-green-400">{"\"Moldova\""}</span>)</p>
                </div>
                <div className="flex gap-2 pt-3">
                  <div className="h-6 flex-1 bg-surface-elevated rounded-md border border-border"></div>
                  <div className="h-6 flex-1 bg-surface-elevated rounded-md border border-border"></div>
                  <div className="h-6 flex-1 bg-primary/20 rounded-md border border-primary/30"></div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-[60px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Основной контент (Грид) ────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Левая колонка (Вакансии) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
              <Briefcase size={20} className="text-primary" />
              Премиум вакансии
            </h2>
            <Link to="/jobs" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">
              Все вакансии
            </Link>
          </div>

          <div className="space-y-3">
            {featuredJobs.map(job => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="group relative bg-charcoal rounded-2xl p-5 border border-border transition-all hover:border-primary/30 hover:bg-charcoal-light shadow-md block"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0 border border-primary/20 overflow-hidden text-sm font-black text-text-inverse dark:text-white/70">
                    {job.company.name.substring(0,2).toUpperCase()}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 items-start">
                      <div>
                        <h3 className="font-bold text-lg text-text-primary group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1.5 font-medium">
                          {job.company.name} • {job.location} • <span className="text-primary font-bold">{job.salary.currency}{job.salary.min}–{job.salary.max}</span>
                        </p>
                      </div>
                      {job.isHot && (
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary border border-primary/20">
                          HOT JOB
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.techStack.slice(0, 4).map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded flex items-center bg-surface-elevated text-[10px] font-bold text-text-secondary border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <button className="w-full sm:w-auto sm:ml-auto justify-center sm:justify-end text-[13px] font-bold text-text-secondary hover:text-primary flex items-center gap-1.5 group/btn">
                    Откликнуться <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Правая колонка (Задачи и сайдбар) */}
        <div className="space-y-6">
          
          <div className="bg-charcoal rounded-2xl border border-border overflow-hidden shadow-md">
            <div className="p-4 border-b border-border bg-surface-elevated flex items-center justify-between">
              <h3 className="font-black text-xs uppercase tracking-widest text-text-primary flex items-center gap-2">
                <Flame size={16} className="text-yellow-500" />
                Daily Challenge
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {tasks.slice(0, 2).map(task => (
                 <Link
                   key={task.id}
                   to={`/sandbox?task=${task.id}`}
                   className="flex items-center gap-3 group cursor-pointer"
                 >
                   <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border ${
                     task.difficulty === 'Easy' ? 'bg-success/10 border-success/20' :
                     task.difficulty === 'Medium' ? 'bg-warning/10 border-warning/20' :
                     'bg-error/10 border-error/20'
                   }`}>
                     <span className={`text-[9px] font-black ${
                       task.difficulty === 'Easy' ? 'text-success' :
                         task.difficulty === 'Medium' ? 'text-warning' :
                       'text-error'
                     }`}>
                       {task.difficulty === 'Medium' ? 'MED' : task.difficulty.toUpperCase()}
                     </span>
                   </div>
                   <div className="flex-1">
                     <h4 className="text-[13px] font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">{task.title}</h4>
                     <p className="text-[10px] text-text-muted mt-0.5">{task.tags.join(' • ')}</p>
                   </div>
                 </Link>
              ))}
              <Link to="/sandbox" className="block text-center w-full py-2.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Перейти в Песочницу
              </Link>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden group">
            <div className="relative z-10 space-y-3">
              <h3 className="font-black text-xl leading-snug">Прокачай свой <br/>CV сегодня</h3>
              <p className="text-white/80 text-xs">Бесплатный разбор резюме от HR-экспертов из Кишинева.</p>
              <button className="bg-white text-primary px-4 py-2 mt-1 rounded-lg font-bold text-xs shadow-xl hover:scale-105 transition-transform">
                Отправить на аудит
              </button>
            </div>
            <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
          </div>

        </div>

      </div>

      {/* ─── Топ компании (Снизу) ──────────────────────────────────── */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xl font-black text-text-primary flex items-center gap-2">
            <Building2 size={20} className="text-primary" />
            Топ компании
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {companies.map(company => (
            <div
              key={company.id}
              className="group relative bg-charcoal rounded-2xl p-5 border border-border transition-all hover:border-primary/30 hover:bg-charcoal-light shadow-md text-center"
            >
              <div className="text-3xl mb-3">{company.logo}</div>
              <h3 className="font-bold text-[13px] text-text-primary group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              <p className="text-[11px] text-text-muted mt-1">{company.openPositions} вакансий</p>
              <div className="flex items-center justify-center gap-1 mt-2">
                <span className="text-[10px] text-warning">★</span>
                <span className="text-[11px] font-bold text-text-secondary">{company.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
