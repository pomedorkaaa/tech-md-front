import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import mockData from './JobDetailsMockData.json';
import type { Job } from '../../types';

import JobHeader from '../../components/JobDetails/JobHeader';
import JobInfoSections from '../../components/JobDetails/JobInfoSections';
import JobTestTask from '../../components/JobDetails/JobTestTask';
import CompanyInfoCard from '../../components/JobDetails/CompanyInfoCard';
import SimilarJobsCard from '../../components/JobDetails/SimilarJobsCard';
import ApplyModal from '../../components/JobDetails/ApplyModal';

const { job } = mockData as { job: Job };
// Временно оборачиваем в массив чтобы код ниже не сломался, или просто берем [] так как код изначально фильтровал
const jobs = [job];

export default function JobDetailPage() {
  const { id } = useParams();
  const jobItem = jobs.find(j => j.id === id);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Отклик успешно отправлен!');
    setIsApplyModalOpen(false);
    setCoverLetter('');
  };

  if (!jobItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Вакансия не найдена</h1>
        <Link to="/jobs" className="text-primary hover:text-primary-light">← Вернуться к поиску</Link>
      </div>
    );
  }

  const similarJobs = jobs.filter(j => j.id !== jobItem.id && j.techStack.some(t => jobItem.techStack.includes(t))).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-6">
        <ArrowLeft size={16} /> Назад к вакансиям
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <JobHeader job={jobItem} onApplyClick={() => setIsApplyModalOpen(true)} />
          <JobInfoSections job={jobItem} />
          <JobTestTask testTask={jobItem.testTask} />
        </div>

        <div className="space-y-6">
          <CompanyInfoCard company={jobItem.company} />
          <SimilarJobsCard similarJobs={similarJobs} />
        </div>
      </div>

      <ApplyModal 
        job={jobItem}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        coverLetter={coverLetter}
        onCoverLetterChange={setCoverLetter}
        onSubmit={handleApply}
      />
    </div>
  );
}
