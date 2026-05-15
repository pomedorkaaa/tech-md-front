import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Zap, Brain, CheckCircle, ArrowLeft, Code, Clock } from 'lucide-react';
import { getTestResultById } from '../../services/api';
import type { TestResult } from '../../types';

export default function SolutionViewPage() {
  const { id } = useParams();
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getTestResultById(id)
      .then(r => setResult(r ?? null))
      .catch(() => setResult(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-text-muted">Загрузка...</div>;
  }

  if (!result) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Решение не найдено</h1>
        <Link to="/employer" className="text-primary hover:underline">Вернуться в панель</Link>
      </div>
    );
  }

  const passRate = result.totalTests > 0 ? Math.round((result.passedTests / result.totalTests) * 100) : 0;
  const passed = result.score >= 70;

  return (
    <div className="flex-1 flex justify-center py-8 px-4 sm:px-8">
      <div className="w-full max-w-[1400px] flex flex-col gap-6">
        <Link to="/employer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Вернуться в панель управления
        </Link>

        <div className="gradient-card rounded-xl p-6 border border-border">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${passed ? 'bg-success/10 text-success border-success/20' : 'bg-error/10 text-error border-error/20'}`}>
                {passed ? 'Принято' : 'Не пройдено'}
              </span>
              <h1 className="text-text-primary text-2xl font-black mt-3">
                {result.candidateName || 'Кандидат'}
              </h1>
              <p className="text-text-secondary text-sm mt-1">{result.candidateRole}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-text-muted">Дата сдачи</p>
              <p className="text-sm text-text-primary">
                {result.submittedAt ? new Date(result.submittedAt).toLocaleString() : '—'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl p-5 bg-charcoal-light border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Score</p>
              <Zap size={20} className="text-yellow-400" />
            </div>
            <p className="text-text-primary text-3xl font-black">
              {result.score}<span className="text-sm font-normal text-text-muted ml-1">/{result.maxScore}</span>
            </p>
          </div>
          <div className="rounded-xl p-5 bg-charcoal-light border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Tests</p>
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <p className="text-text-primary text-3xl font-black">
              {result.passedTests}<span className="text-text-muted font-light mx-1">/</span>{result.totalTests}
            </p>
            <p className="text-[11px] text-text-muted mt-2">{passRate}% пройдено</p>
          </div>
          <div className="rounded-xl p-5 bg-charcoal-light border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Time</p>
              <Clock size={20} className="text-blue-400" />
            </div>
            <p className="text-text-primary text-3xl font-black">{result.timeSpent || '—'}</p>
          </div>
          <div className="rounded-xl p-5 bg-charcoal-light border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest">Language</p>
              <Code size={20} className="text-orange-400" />
            </div>
            <p className="text-text-primary text-2xl font-black">{result.language || '—'}</p>
          </div>
        </div>

        <div className="gradient-card rounded-xl p-6 border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <Brain size={20} className="text-primary" /> Прогресс прохождения
            </h2>
          </div>
          <div className="w-full h-3 rounded-full bg-surface-elevated overflow-hidden">
            <div
              className="h-full rounded-full gradient-primary transition-all"
              style={{ width: `${passRate}%` }}
            />
          </div>
          <p className="text-sm text-text-muted mt-2">
            Кандидат набрал <span className="text-text-primary font-bold">{result.score}</span> из <span className="text-text-primary font-bold">{result.maxScore}</span> баллов.
          </p>
        </div>
      </div>
    </div>
  );
}
