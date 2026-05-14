import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import type { User as UserType } from '../../types';
import { UserProfileHeader } from '../../components/UserProfile/UserProfileHeader';
import { UserExperience } from '../../components/UserProfile/UserExperience';
import { UserEducation } from '../../components/UserProfile/UserEducation';
import { UserSkills } from '../../components/UserProfile/UserSkills';
import { useFavorites } from '../../contexts/FavoritesContext';
import JobCard from '../../components/Jobs/JobCard';
import { useMockData } from '../../hooks/useMockData';
import { Bookmark } from 'lucide-react';

export default function UserProfilePage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { savedJobIds } = useFavorites();
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites'>('profile');
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    location: '',
  });

  useEffect(() => {
    if (user) {
      setProfile(user);
      setFormData({
        name: user.name,
        email: user.email,
        title: user.title || '',
        location: user.location || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет вызов API для обновления профиля
    setProfile(prev => prev ? { ...prev, ...formData } : null);
    setIsEditing(false);
    alert(t('profile.profile_updated'));
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const mockData = useMockData<{ jobs: any[] }>('JobsMockData.json', { jobs: [] });
  const mockJobs = mockData.jobs || [];
  const savedJobs = mockJobs.filter((j: any) => savedJobIds.includes(j.id));

  if (!profile) return <div className="p-8 text-center text-text-muted">{t('profile.loading_profile')}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      
      {/* ТАБЫ */}
      <div className="flex items-center gap-6 border-b border-border mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          {t('profile.my_profile')}
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'favorites' ? 'border-primary text-primary' : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <Bookmark size={16} /> {t('profile.saved_jobs')}
          <span className="bg-surface-elevated text-text-secondary text-xs px-2 py-0.5 rounded-full">{savedJobs.length}</span>
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div className="max-w-3xl space-y-6">
          <UserProfileHeader 
            profile={profile} 
            formData={formData} 
            isEditing={isEditing} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            toggleEditing={toggleEditing} 
          />
          <UserExperience />
          <UserEducation />
          <UserSkills />
        </div>
      ) : (
        <div className="space-y-4">
          {savedJobs.length === 0 ? (
            <div className="text-center py-16 bg-surface-paper border border-border rounded-xl">
              <Bookmark size={48} className="mx-auto text-text-muted mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-text-primary mb-2">{t('profile.no_saved_jobs')}</h3>
              <p className="text-text-muted text-sm">{t('profile.no_saved_jobs_desc')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedJobs.map((job: any) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
