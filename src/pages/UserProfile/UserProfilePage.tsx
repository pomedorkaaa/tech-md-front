import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import type { User as UserType } from '../../types';
import { UserProfileHeader } from '../../components/UserProfile/UserProfileHeader';
import { useFavorites } from '../../contexts/FavoritesContext';
import JobCard from '../../components/Jobs/JobCard';
import { Bookmark } from 'lucide-react';
import { getJobs, updateProfile, mapAuthUser } from '../../services/api';
import type { Job } from '../../types';

export default function UserProfilePage() {
  const { t } = useTranslation();
  const { user, updateUser } = useAuth();
  const { savedJobIds } = useFavorites();
  const [activeTab, setActiveTab] = useState<'profile' | 'favorites'>('profile');
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [saveError, setSaveError] = useState('');
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

  useEffect(() => {
    getJobs().then(setAllJobs).catch(() => setAllJobs([]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSaveError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaveError('');
    try {
      const updated = await updateProfile(user.id, {
        title: formData.title,
        location: formData.location,
      });
      const merged = { ...mapAuthUser(updated), name: formData.name };
      updateUser(merged);
      setProfile(prev => prev ? { ...prev, ...merged } : null);
      setIsEditing(false);
    } catch (err: any) {
      setSaveError(err?.message || 'Не удалось обновить профиль');
    }
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const savedJobs = allJobs.filter(j => savedJobIds.includes(j.id));

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
          {saveError && (
            <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{saveError}</div>
          )}
          <UserProfileHeader 
            profile={profile} 
            formData={formData} 
            isEditing={isEditing} 
            handleChange={handleChange} 
            handleSubmit={handleSubmit} 
            toggleEditing={toggleEditing} 
          />
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
              {savedJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
