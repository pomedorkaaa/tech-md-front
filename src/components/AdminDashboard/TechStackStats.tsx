import { useEffect, useMemo, useState } from 'react';
import { getJobs } from '../../services/api';

export default function TechStackStats() {
  const [techCounts, setTechCounts] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    getJobs()
      .then(jobs => {
        const counts = new Map<string, number>();
        for (const j of jobs) {
          for (const tech of j.techStack) {
            counts.set(tech, (counts.get(tech) ?? 0) + 1);
          }
        }
        setTechCounts(counts);
      })
      .catch(() => setTechCounts(new Map()));
  }, []);

  const stats = useMemo(() => {
    const total = Array.from(techCounts.values()).reduce((a, b) => a + b, 0);
    if (total === 0) return [];
    return Array.from(techCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        percentage: Math.round((count / total) * 100),
      }));
  }, [techCounts]);

  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary mb-4">Стек технологий</h2>
      {stats.length === 0 ? (
        <p className="text-sm text-text-muted">Нет данных</p>
      ) : (
        <div className="space-y-4">
          {stats.map(tech => (
            <div key={tech.name}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-text-secondary">{tech.name}</span>
                <span className="text-text-primary font-medium">{tech.percentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-elevated">
                <div
                  className="h-full rounded-full gradient-primary"
                  style={{ width: `${tech.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
