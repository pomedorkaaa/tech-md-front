interface TechStackStat {
  name: string;
  percentage: number;
}

interface TechStackStatsProps {
  stats: TechStackStat[];
}

export default function TechStackStats({ stats }: TechStackStatsProps) {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary mb-4">Стек технологий</h2>
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
    </div>
  );
}
