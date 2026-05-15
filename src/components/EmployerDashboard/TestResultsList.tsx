import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { TestResult } from '../../types';

interface TestResultsListProps {
  testResults: TestResult[];
}

export default function TestResultsList({ testResults }: TestResultsListProps) {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-text-primary">Решения тестов</h2>
      </div>
      <div className="space-y-3">
        {testResults.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-6">Пока нет результатов</p>
        ) : (
          testResults.map(result => (
            <div key={result.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors gap-4 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                  {result.candidateName ? result.candidateName.split(' ').map(n => n[0]).join('') : '?'}
                </div>
                <div>
                  <h3 className="font-medium text-sm text-text-primary">{result.candidateName || 'Кандидат'}</h3>
                  <p className="text-xs text-text-muted">{result.candidateRole}</p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 border-t border-border/50 sm:border-0 pt-3 sm:pt-0">
                <div className="text-left sm:text-right">
                  <p className={`text-sm font-bold ${
                    result.score >= 90 ? 'text-success' : result.score >= 70 ? 'text-warning' : 'text-error'
                  }`}>
                    {result.score}/{result.maxScore}
                  </p>
                  <p className="text-xs text-text-muted">{result.timeSpent} • {result.language}</p>
                </div>
                <Link to={`/employer/tests/${result.id}`} className="p-2 text-text-muted hover:text-primary bg-surface border border-border rounded-lg transition-colors">
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
