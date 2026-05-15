import { useState } from 'react';
import { Building2, MapPin, Globe, FileText, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createCompany } from '../../services/api';

export default function CreateCompanyPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    location: '',
    website: '',
    techStack: '',
    employeesCount: '',
    rating: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await createCompany({
        name: formData.name,
        logo: formData.logo || undefined,
        description: formData.description || undefined,
        location: formData.location,
        website: formData.website || undefined,
        techStack: formData.techStack || undefined,
        stats: {
          employeesCount: formData.employeesCount || undefined,
          rating: formData.rating ? Number(formData.rating) : undefined,
        },
      });
      navigate('/employer');
    } catch (err: any) {
      setError(err?.message || 'Не удалось создать компанию');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/employer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Вернуться в панель управления
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary mb-2">Добавление компании</h1>
        <p className="text-text-secondary">Создайте профиль вашей компании, чтобы начать публиковать вакансии.</p>
      </div>

      <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{error}</div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <Building2 size={14} /> Название компании <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="Например, TechFlow Systems"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <ImageIcon size={14} /> Логотип (URL или эмодзи)
            </label>
            <input
              type="text"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="🚀 или https://example.com/logo.png"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <FileText size={14} /> Описание компании
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
              placeholder="Коротко расскажите о вашей компании, миссии и продуктах..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <MapPin size={14} /> Локация (Штаб-квартира) <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                placeholder="Кишинёв, Молдова"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <Globe size={14} /> Веб-сайт
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                placeholder="https://"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Кол-во сотрудников</label>
              <input
                type="text"
                name="employeesCount"
                value={formData.employeesCount}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                placeholder="Например, 50-100"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Рейтинг</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                placeholder="4.5"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Технологии (через запятую)</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="React, Node.js, AWS"
            />
          </div>

          <div className="pt-6 border-t border-border flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-dark transition-colors shadow-md shadow-primary/20 disabled:opacity-60"
            >
              {submitting ? 'Создание...' : 'Зарегистрировать компанию'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
