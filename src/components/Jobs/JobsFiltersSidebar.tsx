interface JobsFiltersSidebarProps {
  selectedExperience: string;
  onExperienceChange: (exp: string) => void;
  selectedTechs: string[];
  onTechToggle: (tech: string) => void;
  experienceFilters: string[];
  techFilters: string[];
}

export default function JobsFiltersSidebar({
  selectedExperience,
  onExperienceChange,
  selectedTechs,
  onTechToggle,
  experienceFilters,
  techFilters
}: JobsFiltersSidebarProps) {
  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-6">
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
                onClick={() => onExperienceChange(exp)}
              >
                {exp}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="gradient-card rounded-xl p-5 border border-border">
        <h3 className="text-sm font-semibold text-text-primary mb-3">Технологии</h3>
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
