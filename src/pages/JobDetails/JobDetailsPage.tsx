import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Job } from '../../types';
import { getJobById, getJobs, createApplication, deleteJob } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

import JobHeader from '../../components/JobDetails/JobHeader';
import JobInfoSections from '../../components/JobDetails/JobInfoSections';
import JobTestTask from '../../components/JobDetails/JobTestTask';
import CompanyInfoCard from '../../components/JobDetails/CompanyInfoCard';
import SimilarJobsCard from '../../components/JobDetails/SimilarJobsCard';
import ApplyModal from '../../components/JobDetails/ApplyModal';

export default function JobDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobItem, setJobItem] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applyStatus, setApplyStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [applyError, setApplyError] = useState('');
  const [deleting, setDeleting] = useState(false);

  const canManage = user?.role === 'admin' || user?.role === 'employer';

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    Promise.all([getJobById(id).catch(() => undefined), getJobs().catch(() => [])])
      .then(([job, allJobs]) => {
        if (!mounted) return;
        setJobItem(job ?? null);
        if (job) {
          const similar = allJobs
            .filter(j => j.id !== job.id && j.techStack.some(t => job.techStack.includes(t)))
            .slice(0, 3);
          setSimilarJobs(similar);
        }
      })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobItem || !user) return;
    setApplyError('');
    setApplyStatus('sending');
    try {
      await createApplication({ userId: Number(user.id), jobId: Number(jobItem.id) });
      setApplyStatus('ok');
      setIsApplyModalOpen(false);
      setCoverLetter('');
      // мягкое подтверждение, чтобы не ломать UX alert'ом
      setTimeout(() => setApplyStatus('idle'), 2500);
    } catch (err: any) {
      setApplyError(err?.message || 'Не удалось отправить отклик');
      setApplyStatus('error');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-text-muted">{t('profile.loading_profile') || 'Загрузка...'}</div>;
  }

  if (!jobItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">{t('job_details.not_found')}</h1>
        <Link to="/jobs" className="text-primary hover:text-primary-light">{t('job_details.back_to_search')}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link to="/jobs" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors">
          <ArrowLeft size={16} /> {t('job_details.back_to_jobs')}
        </Link>
        {canManage && (
          <button
            onClick={async () => {
              if (!window.confirm('Удалить вакансию? Действие необратимо.')) return;
              setDeleting(true);
              try {
                await deleteJob(jobItem.id);
                navigate('/employer/jobs');
              } catch (err: any) {
                window.alert(err?.message || 'Не удалось удалить вакансию');
                setDeleting(false);
              }
            }}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-error/30 text-error text-sm font-medium hover:bg-error/10 transition-colors disabled:opacity-60"
          >
            <Trash2 size={14} /> {deleting ? 'Удаление...' : 'Удалить'}
          </button>
        )}
      </div>

      {applyStatus === 'ok' && (
        <div className="mb-4 bg-success/10 border border-success/30 rounded-lg p-3 text-success text-sm">
          {t('job_details.apply_success')}
        </div>
      )}

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
        onClose={() => { setIsApplyModalOpen(false); setApplyError(''); }}
        coverLetter={coverLetter}
        onCoverLetterChange={setCoverLetter}
        onSubmit={handleApply}
        submitting={applyStatus === 'sending'}
        error={applyError}
      />
    </div>
  );
}
