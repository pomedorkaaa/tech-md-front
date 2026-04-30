import React from 'react';
import { Briefcase } from 'lucide-react';

export const UserExperience: React.FC = () => {
  return (
    <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border mt-8">
      <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <Briefcase className="text-primary" size={20} />
        Опыт работы
      </h2>
      <div className="space-y-6">
        <div className="border-l-2 border-border pl-4 pb-2">
          <h3 className="text-lg font-bold text-text-primary">Frontend Developer</h3>
          <p className="text-sm text-primary mb-2">TechCorp • 2021 - Настоящее время</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Разработка пользовательских интерфейсов на React, оптимизация производительности, 
            настройка CI/CD.
          </p>
        </div>
      </div>
    </div>
  );
};
