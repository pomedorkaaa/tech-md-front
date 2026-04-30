import React from 'react';
import { Sparkles } from 'lucide-react';

export const UserSkills: React.FC = () => {
  return (
    <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border mt-8 mb-12">
      <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <Sparkles className="text-primary" size={20} />
        Навыки
      </h2>
      <div className="flex flex-wrap gap-3">
        {['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Docker'].map((skill) => (
          <span 
            key={skill}
            className="px-4 py-2 bg-surface-elevated text-text-primary text-sm font-medium rounded-lg border border-border hover:border-primary/50 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};
