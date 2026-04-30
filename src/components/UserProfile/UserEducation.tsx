import React from 'react';
import { BookOpen } from 'lucide-react';

export const UserEducation: React.FC = () => {
  return (
    <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border mt-8">
      <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <BookOpen className="text-primary" size={20} />
        Образование
      </h2>
      <div className="space-y-6">
        <div className="border-l-2 border-border pl-4 pb-2">
          <h3 className="text-lg font-bold text-text-primary">Бакалавр Компьютерных Наук</h3>
          <p className="text-sm text-primary mb-2">Технический Университет Молдовы • 2017 - 2021</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            Специализация: Информационные технологии и программная инженерия.
          </p>
        </div>
      </div>
    </div>
  );
};
