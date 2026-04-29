import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Building2, Globe, Users, ArrowLeft, Code, Bookmark, Send, ExternalLink } from 'lucide-react';
import mockData from './JobDetailsMockData.json';
import type { Job } from '../../types';
const { job } = mockData as { job: Job };
// Временно оборачиваем в массив чтобы код ниже не сломался, или просто берем [] так как код изначально фильтровал
const jobs = [job];

export default function JobDetailPage() {
  const { id } = useParams();
  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Вакансия не найдена</h1>
        <Link to="/jobs" className="text-primary hover:text-primary-light">← Вернуться к поиску</Link>
      </div>
    );
  }

  const similarJobs = jobs.filter(j => j.id !== job.id && j.techStack.some(t => job.techStack.includes(t))).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
      {/* Навигация */}
      <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-4 sm:mb-6">
        <ArrowLeft size={16} /> Назад к вакансиям
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* Основной контент */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Шапка */}
          <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border">
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                {job.company.logo}
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">{job.title}</h1>
                <p className="text-text-secondary">{job.company.name}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-sm text-text-muted">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {job.experience}</span>
                  <span className="px-2 py-0.5 rounded-md bg-surface-elevated text-text-secondary text-xs">
                    {job.type === 'remote' ? 'Удалённо' : job.type === 'hybrid' ? 'Гибрид' : 'Офис'}
                  </span>
                </div>
              </div>
              {/* Зарплата — на мобильных под описанием */}
              <div className="sm:text-right shrink-0 w-full sm:w-auto">
                <p className="text-xl sm:text-2xl font-bold text-text-primary">
                  {job.salary.currency}{job.salary.min}–{job.salary.max}
                </p>
                <p className="text-sm text-text-muted">/месяц</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {job.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 text-xs rounded-lg bg-primary/10 text-primary font-medium">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity text-sm">
                <Send size={16} /> Откликнуться
              </button>
              <button className="px-4 py-3 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:bg-surface-elevated transition-colors">
                <Bookmark size={18} />
              </button>
            </div>
          </div>

          {/* О вакансии */}
          <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border">
            <h2 className="text-lg font-bold text-text-primary mb-4">О вакансии</h2>
            <p className="text-text-secondary leading-relaxed text-sm sm:text-base">{job.description}</p>
          </div>

          {/* Требования */}
          <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border">
            <h2 className="text-lg font-bold text-text-primary mb-4">Чем предстоит заниматься</h2>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-2 text-text-secondary text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Мы предлагаем */}
          <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border">
            <h2 className="text-lg font-bold text-text-primary mb-4">Мы предлагаем</h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-text-secondary text-sm sm:text-base">
                  <span className="text-success">✓</span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Тестовое задание */}
          {job.testTask && job.testTask.type !== 'none' && (
            <div className="gradient-card rounded-xl p-4 sm:p-6 border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <Code size={18} className="text-primary" />
                <h2 className="text-lg font-bold text-text-primary">Тестовое задание</h2>
              </div>
              <p className="text-text-secondary mb-3 text-sm sm:text-base">{job.testTask.description}</p>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className={`px-2.5 py-1 rounded-lg font-medium ${
                  job.testTask.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                  job.testTask.difficulty === 'Medium' ? 'bg-warning/10 text-warning' :
                  'bg-error/10 text-error'
                }`}>{job.testTask.difficulty}</span>
                {job.testTask.timeLimit && (
                  <span className="text-text-muted flex items-center gap-1">
                    <Clock size={14} /> {job.testTask.timeLimit} мин
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Сайдбар */}
        <div className="space-y-4 sm:space-y-6">
          {/* Информация о компании */}
          <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border">
            <h3 className="text-lg font-bold text-text-primary mb-4">{job.company.name}</h3>
            <p className="text-sm text-text-secondary mb-4">{job.company.description}</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-text-muted">
                <MapPin size={14} /> {job.company.location}
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Users size={14} /> {job.company.employeesCount} сотрудников
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <Building2 size={14} /> {job.company.openPositions} открытых вакансий
              </div>
              {job.company.website && (
                <a href={job.company.website} className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors">
                  <Globe size={14} /> Сайт компании <ExternalLink size={12} />
                </a>
              )}
            </div>
            {job.company.rating && (
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-2">
                <span className="text-warning">★</span>
                <span className="text-text-primary font-semibold">{job.company.rating}</span>
                <span className="text-xs text-text-muted">рейтинг компании</span>
              </div>
            )}
          </div>

          {/* Похожие вакансии */}
          {similarJobs.length > 0 && (
            <div className="gradient-card rounded-xl p-4 sm:p-6 border border-border">
              <h3 className="text-lg font-bold text-text-primary mb-4">Похожие вакансии</h3>
              <div className="space-y-3">
                {similarJobs.map(sj => (
                  <Link
                    key={sj.id}
                    to={`/jobs/${sj.id}`}
                    className="block p-3 rounded-lg bg-surface-elevated hover:bg-surface-overlay transition-colors group"
                  >
                    <h4 className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors">
                      {sj.title}
                    </h4>
                    <p className="text-xs text-text-muted mt-1">{sj.company.name}</p>
                    <p className="text-xs text-text-secondary mt-1">
                      {sj.salary.currency}{sj.salary.min}–{sj.salary.max}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
