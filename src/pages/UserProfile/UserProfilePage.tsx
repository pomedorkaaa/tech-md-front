import { useState, useEffect } from 'react';
import { getCurrentUser } from '../../services/api';
import type { User as UserType } from '../../types';
import { UserProfileHeader } from '../../components/UserProfile/UserProfileHeader';
import { UserExperience } from '../../components/UserProfile/UserExperience';
import { UserEducation } from '../../components/UserProfile/UserEducation';
import { UserSkills } from '../../components/UserProfile/UserSkills';

export default function UserProfilePage() {
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    title: '',
    location: '',
  });

  useEffect(() => {
    getCurrentUser().then(user => {
      setProfile(user);
      setFormData({
        name: user.name,
        email: user.email,
        title: user.title || '',
        location: user.location || '',
      });
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет вызов API для обновления профиля
    setProfile(prev => prev ? { ...prev, ...formData } : null);
    setIsEditing(false);
    alert('Профиль успешно обновлен!');
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  if (!profile) return <div className="p-8 text-center text-text-muted">Загрузка профиля...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
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
  );
}
