import { useState } from 'react';
import mockData from './JobsMockData.json';
import type { Job } from '../../types';

import JobSearchHeader from '../../components/Jobs/JobSearchHeader';
import JobsFiltersSidebar from '../../components/Jobs/JobsFiltersSidebar';
import JobCard from '../../components/Jobs/JobCard';

const { jobs } = mockData as { jobs: Job[] };

const experienceFilters = ['Любой', '0-1 год', '1-3 года', '3-5 лет', '5+ лет'];
const techFilters = ['React', 'Python', 'Java', 'Go', '.NET', 'Swift', 'TypeScript'];

export default function JobsPage() {
  const [filterState, setFilterState] = useState({
    searchQuery: '',
    selectedExperience: 'Любой',
    selectedTechs: [] as string[],
    showFilters: true
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = !filterState.searchQuery ||
      job.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
      job.company.name.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
      job.techStack.some(t => t.toLowerCase().includes(filterState.searchQuery.toLowerCase()));

    const matchesTech = filterState.selectedTechs.length === 0 ||
      job.techStack.some(t => filterState.selectedTechs.includes(t));

    return matchesSearch && matchesTech;
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
          />
        )}

        <div className="flex-1 space-y-4">
          {filteredJobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
