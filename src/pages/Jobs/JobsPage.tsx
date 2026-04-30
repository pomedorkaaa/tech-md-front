import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Clock, Code, Flame } from 'lucide-react';
import mockData from './JobsMockData.json';
import type { Job } from '../../types';
const { jobs } = mockData as { jobs: Job[] };

const experienceFilters = ['Любой', '0-1 год', '1-3 года', '3-5 лет', '5+ лет'];
const techFilters = ['React', 'Python', 'Java', 'Go', '.NET', 'Swift', 'TypeScript'];

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('Любой');
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(true);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTech = selectedTechs.length === 0 ||
      job.techStack.some(t => selectedTechs.includes(t));

    return matchesSearch && matchesTech;
  });

  const toggleTech = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Заголовок */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary">
          Найдено {filteredJobs.length} вакансий
        </h1>
        <p className="text-sm text-text-muted mt-1">
          Результаты поиска для Python, Frontend, Backend разработчиков
        </p>
      </div>

      {/* Строка поиска */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 flex items-center bg-surface-paper border border-border rounded-xl px-4">
          <Search size={18} className="text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Должность, компания или технология..."
            className="flex-1 bg-transparent px-3 py-3 text-text-primary placeholder:text-text-muted outline-none text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-colors
            ${showFilters
              ? 'border-primary/30 bg-primary/10 text-primary'
              : 'border-border bg-surface-paper text-text-secondary hover:text-text-primary'
            }`}
        >
          <SlidersHorizontal size={16} />
          Фильтры
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Фильтры (сайдбар) */}
        {showFilters && (
          <aside className="w-full lg:w-64 shrink-0 space-y-6">
            {/* Зарплата */}
            <div className="gradient-card rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Зарплата</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="От"
                  className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
                />
                <input
                  type="text"
                  placeholder="До"
                  className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
                />
              </div>
            </div>

            {/* Опыт работы */}
            <div className="gradient-card rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Опыт работы</h3>
              <div className="space-y-2">
                {experienceFilters.map(exp => (
                  <label key={exp} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded border transition-colors ${
                      selectedExperience === exp
                        ? 'bg-primary border-primary'
                        : 'border-border group-hover:border-primary/50'
                    }`}>
                      {selectedExperience === exp && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      )}
                    </div>
                    <span
                      className="text-sm text-text-secondary group-hover:text-text-primary transition-colors cursor-pointer"
                      onClick={() => setSelectedExperience(exp)}
                    >
                      {exp}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Технологии */}
            <div className="gradient-card rounded-xl p-5 border border-border">
              <h3 className="text-sm font-semibold text-text-primary mb-3">Технологии</h3>
              <div className="flex flex-wrap gap-2">
                {techFilters.map(tech => (
                  <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all ${
                      selectedTechs.includes(tech)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-surface-elevated text-text-secondary border border-transparent hover:text-text-primary'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Список вакансий */}
        <div className="flex-1 space-y-4">
          {filteredJobs.map(job => (
            <Link
              key={job.id}
              to={`/jobs/${job.id}`}
              className="group block gradient-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-elevated flex items-center justify-center text-2xl shrink-0">
                    {job.company.logo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      {job.isHot && (
                        <span className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-error/10 text-error">
                          <Flame size={10} /> Hot
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-text-muted">{job.company.name}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-text-primary">
                    {job.salary.currency}{job.salary.min}–{job.salary.max}
                  </p>
                  <p className="text-xs text-text-muted">/месяц</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {job.experience}</span>
                <span className="px-2 py-0.5 rounded-md bg-surface-elevated text-text-secondary">
                  {job.type === 'remote' ? 'Удалённо' : job.type === 'hybrid' ? 'Гибрид' : 'Офис'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {job.techStack.slice(0, 5).map(tech => (
                    <span key={tech} className="px-2.5 py-1 text-xs rounded-md bg-surface-elevated text-text-secondary">
                      {tech}
                    </span>
                  ))}
                </div>

                {job.testTask && job.testTask.type !== 'none' && (
                  <div className="flex items-center gap-2 text-xs text-text-muted shrink-0">
                    <Code size={12} />
                    <span>{job.testTask.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                      job.testTask.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                      job.testTask.difficulty === 'Medium' ? 'bg-warning/10 text-warning' :
                      'bg-error/10 text-error'
                    }`}>{job.testTask.difficulty}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
