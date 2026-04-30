import { useState } from 'react';
import { Building2, MapPin, Globe, FileText, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateCompanyPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    location: '',
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В будущем здесь будет вызов API (POST /api/companies)
    alert('Компания успешно создана!');
    navigate('/employer');
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
              <ImageIcon size={14} /> Логотип (URL)
            </label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
              <FileText size={14} /> Описание компании <span className="text-error">*</span>
            </label>
            <textarea
              name="description"
              required
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
                <MapPin size={14} /> Локация (Штаб-квартира)
              </label>
              <input
                type="text"
                name="location"
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

          <div className="pt-6 border-t border-border flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
            >
              Зарегистрировать компанию
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
