import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getJobs } from '../../services/api';
import type { Job } from '../../types';

import JobSearchHeader from '../../components/Jobs/JobSearchHeader';
import JobsFiltersSidebar from '../../components/Jobs/JobsFiltersSidebar';
import JobCard from '../../components/Jobs/JobCard';

export default function JobsPage() {
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    getJobs().then(setJobs).catch(() => setJobs([]));
  }, []);

  // Top-15 технологий из всех имеющихся вакансий, иначе — дефолт.
  const techFilters = useMemo(() => {
    if (jobs.length === 0) {
      return ['React', 'Python', 'Java', 'Go', '.NET', 'Swift', 'TypeScript'];
    }
    const counts = new Map<string, number>();
    for (const j of jobs) {
      for (const tech of j.techStack) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(([tech]) => tech);
  }, [jobs]);

  const experienceFilters = [
    t('jobs.any'),
    t('jobs.0_1_exp', '0-1 год'),
    t('jobs.1_3_exp'),
    t('jobs.3_5_exp', '3-5 лет'),
    t('jobs.5_exp', '5+ лет'),
  ];

  const [filterState, setFilterState] = useState({
    searchQuery: '',
    selectedExperience: 'Любой',
    selectedTechs: [] as string[],
    showFilters: true,
    salaryMin: '',
    salaryMax: '',
    salaryCurrency: '€',
  });

  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
    '€': 1,
    '$': 1.1, // Approximate fallback 1 EUR = 1.1 USD
    'MDL': 20.0, // Approximate fallback 1 EUR = 20 MDL
  });

  // Fetch real exchange rates on mount
  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/EUR')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setExchangeRates({
            '€': 1,
            '$': data.rates.USD || 1.1,
            'MDL': data.rates.MDL || 20.0,
          });
        }
      })
      .catch(err => console.error('Failed to fetch exchange rates', err));
  }, []);

  // Read ?company= or ?q= from URL on mount
  useEffect(() => {
    const companyParam = searchParams.get('company');
    const qParam = searchParams.get('q');
    if (companyParam) {
      setFilterState(prev => ({ ...prev, searchQuery: companyParam }));
    } else if (qParam) {
      setFilterState(prev => ({ ...prev, searchQuery: qParam }));
    }
  }, [searchParams]);

  const filteredJobs = jobs.filter(job => {
    const q = filterState.searchQuery.toLowerCase();
    const matchesSearch = !q ||
      job.title.toLowerCase().includes(q) ||
      job.company.name.toLowerCase().includes(q) ||
      job.techStack.some(t => t.toLowerCase().includes(q));

    const matchesTech = filterState.selectedTechs.length === 0 ||
      job.techStack.some(t => filterState.selectedTechs.includes(t));

    // Salary filter with currency conversion
    const minSalInput = filterState.salaryMin ? Number(filterState.salaryMin) : 0;
    const maxSalInput = filterState.salaryMax ? Number(filterState.salaryMax) : Infinity;

    // Approximate exchange rates to a base currency (EUR)
    const inputCurrencyRate = exchangeRates[filterState.salaryCurrency] || 1;
    const jobCurrencyRate = exchangeRates[job.salary.currency] || 1;

    // Convert both to EUR for comparison (value / rate)
    const inputMinEur = minSalInput / inputCurrencyRate;
    const inputMaxEur = maxSalInput === Infinity ? Infinity : maxSalInput / inputCurrencyRate;
    const jobMinEur = job.salary.min / jobCurrencyRate;
    const jobMaxEur = job.salary.max / jobCurrencyRate;

    // Consider it a match if the job's salary range overlaps with the requested range
    const matchesSalary = jobMaxEur >= inputMinEur && jobMinEur <= inputMaxEur;

    return matchesSearch && matchesTech && matchesSalary;
  });

  const toggleTech = (tech: string) => {
    setFilterState(prev => ({
      ...prev,
      selectedTechs: prev.selectedTechs.includes(tech)
        ? prev.selectedTechs.filter(t => t !== tech)
        : [...prev.selectedTechs, tech]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <JobSearchHeader
        totalJobs={filteredJobs.length}
        searchQuery={filterState.searchQuery}
        onSearchChange={(value) => setFilterState(prev => ({ ...prev, searchQuery: value }))}
        showFilters={filterState.showFilters}
        onToggleFilters={() => setFilterState(prev => ({ ...prev, showFilters: !prev.showFilters }))}
      />

      <div className="flex flex-col lg:flex-row gap-6">
        {filterState.showFilters && (
          <JobsFiltersSidebar
            selectedExperience={filterState.selectedExperience}
            onExperienceChange={(exp) => setFilterState(prev => ({ ...prev, selectedExperience: exp }))}
            selectedTechs={filterState.selectedTechs}
            onTechToggle={toggleTech}
            experienceFilters={experienceFilters}
            techFilters={techFilters}
            salaryMin={filterState.salaryMin}
            salaryMax={filterState.salaryMax}
            salaryCurrency={filterState.salaryCurrency}
            onSalaryMinChange={(v) => setFilterState(prev => ({ ...prev, salaryMin: v }))}
            onSalaryMaxChange={(v) => setFilterState(prev => ({ ...prev, salaryMax: v }))}
            onSalaryCurrencyChange={(v) => setFilterState(prev => ({ ...prev, salaryCurrency: v }))}
          />
        )}

        <div className="flex-1 space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-16 text-text-muted">
              <p className="text-lg font-semibold mb-1">{t('jobs.no_results')}</p>
            </div>
          ) : (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
