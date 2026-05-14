import React from 'react';
import { BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const UserEducation: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border mt-8">
      <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
        <BookOpen className="text-primary" size={20} />
        {t('profile.education')}
      </h2>
      <div className="space-y-6">
        <div className="border-l-2 border-border pl-4 pb-2">
          <h3 className="text-lg font-bold text-text-primary">{t('profile.edu_title')}</h3>
          <p className="text-sm text-primary mb-2">{t('profile.edu_school_date')}</p>
          <p className="text-sm text-text-secondary leading-relaxed">
            {t('profile.edu_desc')}
          </p>
        </div>
      </div>
    </div>
  );
};
