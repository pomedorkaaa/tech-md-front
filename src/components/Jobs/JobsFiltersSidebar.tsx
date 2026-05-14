import { useTranslation } from 'react-i18next';

interface JobsFiltersSidebarProps {
  selectedExperience: string;
  onExperienceChange: (exp: string) => void;
  selectedTechs: string[];
  onTechToggle: (tech: string) => void;
  experienceFilters: string[];
  techFilters: string[];
  salaryMin: string;
  salaryMax: string;
  salaryCurrency: string;
  onSalaryMinChange: (value: string) => void;
  onSalaryMaxChange: (value: string) => void;
  onSalaryCurrencyChange: (value: string) => void;
}

export default function JobsFiltersSidebar({
  selectedExperience,
  onExperienceChange,
  selectedTechs,
  onTechToggle,
  experienceFilters,
  techFilters,
  salaryMin,
  salaryMax,
  salaryCurrency,
  onSalaryMinChange,
  onSalaryMaxChange,
  onSalaryCurrencyChange,
}: JobsFiltersSidebarProps) {
  const { t } = useTranslation();
  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
      {/* Зарплата */}
      <div className="gradient-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-3">{t('jobs.salary')}</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="number"
            placeholder={t('jobs.salary_from')}
            value={salaryMin}
            onChange={(e) => onSalaryMinChange(e.target.value)}
            className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <input
            type="number"
            placeholder={t('jobs.salary_to')}
            value={salaryMax}
            onChange={(e) => onSalaryMaxChange(e.target.value)}
            className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div>
          <label className="text-xs text-text-muted mb-1.5 block">{t('jobs.salary_currency')}</label>
          <select
            value={salaryCurrency}
            onChange={(e) => onSalaryCurrencyChange(e.target.value)}
            className="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-primary/50"
          >
            <option value="€">€ EUR</option>
            <option value="$">$ USD</option>
            <option value="MDL">MDL Лей</option>
          </select>
        </div>
      </div>

      {/* Опыт работы */}
      <div className="gradient-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-3">{t('jobs.experience')}</h3>
        <div className="space-y-2">
          {experienceFilters.map(exp => (
            <label
              key={exp}
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onExperienceChange(exp)}
            >
              <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${
                selectedExperience === exp
                  ? 'bg-primary border-primary'
                  : 'border-border group-hover:border-primary/50'
              }`}>
                {selectedExperience === exp && (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {exp}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Технологии */}
      <div className="gradient-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-3">{t('jobs.technologies')}</h3>
        <div className="flex flex-wrap gap-2">
          {techFilters.map(tech => (
            <button
              key={tech}
              onClick={() => onTechToggle(tech)}
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
  );
}
