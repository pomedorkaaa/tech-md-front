import { useState, useEffect } from 'react';
import { User, Mail, MapPin, Briefcase, Camera, Save } from 'lucide-react';
import { getCurrentUser } from '../../services/api';
import type { User as UserType } from '../../types';

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

  if (!profile) return <div className="p-8 text-center text-text-muted">Загрузка профиля...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-text-primary">Настройки профиля</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`text-sm font-bold px-4 py-2 rounded-lg transition-colors ${
            isEditing ? 'text-text-muted hover:text-text-primary' : 'bg-primary/10 text-primary hover:bg-primary/20'
          }`}
        >
          {isEditing ? 'Отмена' : 'Редактировать'}
        </button>
      </div>

      <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex items-center gap-6 pb-6 border-b border-border">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center text-primary text-3xl font-black border-2 border-primary/30 group-hover:border-primary transition-colors">
                {profile.name.charAt(0)}
              </div>
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{profile.name}</h2>
              <p className="text-sm text-text-muted capitalize">{profile.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <User size={14} /> Имя и фамилия
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-70 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-70 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={14} /> Должность
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-70 transition-all"
                placeholder="Например, Senior React Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} /> Локация
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none disabled:opacity-70 transition-all"
                placeholder="Например, Кишинёв"
              />
            </div>
          </div>

          {isEditing && (
            <div className="pt-6 border-t border-border flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
              >
                <Save size={16} /> Сохранить изменения
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
