import { Link } from 'react-router-dom';
import { Users, Code, Building2, Rocket, Globe, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 overflow-x-hidden">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-text-primary">О платформе <span className="text-primary">TechMoldova</span></h1>
        <p className="text-text-secondary max-w-2xl mx-auto">Первая гибридная IT-платформа Молдовы, объединяющая поиск работы и техническую оценку кандидатов.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[{icon:Users,title:'1,200+',desc:'IT-специалистов',color:'text-primary'},{icon:Building2,title:'150+',desc:'Компаний-партнёров',color:'text-info'},{icon:Code,title:'3,400+',desc:'Решённых задач',color:'text-success'}].map(s=>(
          <div key={s.title} className="gradient-card rounded-xl p-6 border border-border text-center">
            <s.icon size={28} className={`${s.color} mx-auto mb-3`}/><p className="text-2xl font-bold text-text-primary">{s.title}</p><p className="text-sm text-text-muted">{s.desc}</p>
          </div>))}
      </div>
      <div className="gradient-card rounded-xl p-6 sm:p-8 border border-border space-y-4">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2"><Rocket size={20} className="text-primary"/> Наша миссия</h2>
        <p className="text-text-secondary leading-relaxed">TechMoldova создана для того, чтобы IT-специалисты Молдовы могли найти лучшие возможности карьерного роста, не выезжая из страны. Мы верим, что талант не зависит от географии, и стремимся создать экосистему, где разработчики могут расти, а компании — находить лучших кандидатов.</p>
        <p className="text-text-secondary leading-relaxed">Наша уникальная особенность — встроенная песочница для решения алгоритмических задач, позволяющая работодателям объективно оценить навыки кандидатов, а разработчикам — продемонстрировать свой уровень.</p>
      </div>
      <div className="gradient-card rounded-xl p-6 sm:p-8 border border-border space-y-4">
        <h2 className="text-xl font-bold text-text-primary flex items-center gap-2"><Heart size={20} className="text-error"/> Наши ценности</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{t:'Прозрачность',d:'Открытые зарплаты, честные отзывы'},{t:'Меритократия',d:'Оценка по навыкам, а не по резюме'},{t:'Локальный фокус',d:'Развитие IT-экосистемы Молдовы'},{t:'Инновации',d:'AI-анализ кода, умные рекомендации'}].map(v=>(
            <div key={v.t} className="p-4 rounded-lg bg-surface-elevated border border-border"><h3 className="font-bold text-text-primary text-sm">{v.t}</h3><p className="text-xs text-text-muted mt-1">{v.d}</p></div>))}
        </div>
      </div>
      <div className="text-center">
        <Link to="/jobs" className="inline-flex items-center gap-2 px-8 py-3 rounded-xl gradient-primary text-white font-bold text-sm hover:opacity-90 transition-opacity">
          <Globe size={16}/> Начать поиск вакансий
        </Link>
      </div>
    </div>
  );
}
