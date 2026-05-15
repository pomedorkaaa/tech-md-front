import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/jobs?q=${encodeURIComponent(q)}` : '/jobs');
  };

  return (
    <section className="relative">
      <div className="flex flex-col lg:flex-row items-center gap-10 py-8">
        <div className="flex-1 flex flex-col gap-6 text-center lg:text-left z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              {t('home.hero_new_jobs')}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-black tracking-tight text-text-primary leading-tight">
              {t('home.hero_title')} <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">{t('home.hero_title_highlight')}</span>
            </h1>

            <p className="text-base text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('home.hero_desc')}
            </p>
          </div>

          <div className="w-full max-w-lg mx-auto lg:mx-0">
            <form className="relative group" onSubmit={handleSubmit}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-primary" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('home.search_placeholder')}
                className="block w-full pl-12 pr-32 py-4 rounded-xl border border-border bg-charcoal text-text-primary shadow-xl focus:ring-2 focus:ring-primary focus:border-transparent placeholder-text-muted transition-all outline-none text-sm"
              />
              <div className="absolute inset-y-1.5 right-1.5 flex items-center">
                <button type="submit" className="bg-primary hover:bg-primary-dark text-white px-6 h-full rounded-lg text-sm font-bold transition-all shadow-md shadow-primary/20">
                  {t('home.search_button')}
                </button>
              </div>
            </form>

            <div className="mt-4 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex flex-wrap lg:w-auto items-center gap-x-4 gap-y-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                <span className="text-primary/60">{t('home.top_categories')}</span>
                {['Frontend', 'Python', 'QA Automation', 'DevOps'].map(tag => (
                  <Link
                    key={tag}
                    to={`/jobs?q=${tag}`}
                    className="hover:text-primary transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

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
  );
}
