import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Clock, Code } from 'lucide-react';
import type { TestResult } from '../../types';
import { getTestResultById } from '../../services/api';

export default function TestResultDetailsPage() {
  const { id } = useParams();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    getTestResultById(id)
      .then(r => { if (mounted) setResult(r ?? null); })
      .catch(() => { if (mounted) setResult(null); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Загрузка...</div>;
  }

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Результат не найден</h1>
        <Link to="/employer" className="text-primary hover:underline">Вернуться в панель управления</Link>
      </div>
    );
  }

  const isSuccess = result.score >= 70;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/employer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Вернуться к результатам
      </Link>

      <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold border border-primary/30">
              {result.candidateName ? result.candidateName.split(' ').map(n => n[0]).join('') : '?'}
            </div>
            <div>
              <h1 className="text-2xl font-black text-text-primary mb-1">{result.candidateName || 'Кандидат'}</h1>
              <p className="text-text-secondary">{result.candidateRole}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-surface-elevated border border-border rounded-xl px-6 py-4 text-center">
              <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Скор</p>
              <p className={`text-3xl font-black ${isSuccess ? 'text-success' : 'text-error'}`}>
                {result.score}<span className="text-lg text-text-muted">/{result.maxScore}</span>
              </p>
            </div>
            <div className="bg-surface-elevated border border-border rounded-xl px-6 py-4 text-center">
              <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Тесты</p>
              <p className="text-3xl font-black text-text-primary">
                {result.passedTests}<span className="text-lg text-text-muted">/{result.totalTests}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="gradient-card rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-bold text-text-primary mb-4 border-b border-border pb-2">Детали прохождения</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <span className="text-sm text-text-muted flex items-center gap-2"><Clock size={16} /> Потрачено времени:</span>
              <span className="text-sm font-bold text-text-primary">{result.timeSpent}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-text-muted flex items-center gap-2"><Code size={16} /> Язык решения:</span>
              <span className="text-sm font-bold text-text-primary">{result.language}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-text-muted flex items-center gap-2"><CheckCircle size={16} /> Дата сдачи:</span>
              <span className="text-sm font-bold text-text-primary">{result.submittedAt}</span>
            </li>
          </ul>
        </div>

        <div className="gradient-card rounded-2xl p-6 border border-border flex flex-col justify-center">
          <h2 className="text-lg font-bold text-text-primary mb-4 text-center">Вердикт системы</h2>
          <div className="text-center">
            {isSuccess ? (
              <>
                <CheckCircle size={48} className="text-success mx-auto mb-3" />
                <p className="text-xl font-bold text-success mb-1">Кандидат прошел тест</p>
                <p className="text-sm text-text-muted">Рекомендуется пригласить на интервью</p>
              </>
            ) : (
              <>
                <XCircle size={48} className="text-error mx-auto mb-3" />
                <p className="text-xl font-bold text-error mb-1">Кандидат не прошел тест</p>
                <p className="text-sm text-text-muted">Оценка ниже проходного балла</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
         <Link
           to="/chat"
           className="px-6 py-3 border border-border text-text-secondary font-bold text-sm rounded-lg hover:bg-surface-elevated transition-colors inline-flex items-center"
         >
            Связаться с кандидатом
         </Link>
      </div>
    </div>
  );
}
