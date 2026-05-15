import { useTranslation } from 'react-i18next';
import type { Job } from '../../types';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  coverLetter: string;
  onCoverLetterChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting?: boolean;
  error?: string;
}

export default function ApplyModal({
  job,
  isOpen,
  onClose,
  coverLetter,
  onCoverLetterChange,
  onSubmit,
  submitting = false,
  error = '',
}: ApplyModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-text-primary">{t('job_details.apply_modal_title')}</h2>
          <p className="text-sm text-text-secondary mt-1">{job.title} в {job.company.name}</p>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{error}</div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-primary">{t('job_details.cover_letter')}</label>
            <textarea
              required
              rows={6}
              value={coverLetter}
              onChange={e => onCoverLetterChange(e.target.value)}
              placeholder={t('job_details.cover_letter_placeholder')}
              className="w-full bg-surface-elevated border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none resize-none transition-all"
            />
            <p className="text-xs text-text-muted">Ваш профиль и резюме будут прикреплены автоматически.</p>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-xl border border-border text-text-secondary font-bold hover:bg-surface-elevated transition-colors disabled:opacity-60"
            >
              {t('job_details.cancel')}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-md shadow-primary/20 disabled:opacity-60"
            >
              {submitting ? '...' : t('job_details.send_application')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
