import { useEffect, useState } from 'react';
import { Briefcase, MapPin, DollarSign, FileText, Code, CheckCircle, ArrowLeft, Target } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { Company, Job } from '../../types';
import { createJob, getCompanies } from '../../services/api';

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'MDL',
    type: 'full-time' as Job['type'],
    experience: 'Middle',
    description: '',
    requirements: '',
    techStack: '',
    benefits: '',
    companyId: '',
    isHot: false,
  });

  const [hasTestTask, setHasTestTask] = useState(false);
  const [testTaskData, setTestTaskData] = useState({
    type: 'algorithm' as NonNullable<Job['testTask']>['type'],
    title: '',
    description: '',
    difficulty: 'Medium' as NonNullable<Job['testTask']>['difficulty'],
    timeLimit: '60',
  });

  useEffect(() => {
    getCompanies()
      .then(list => {
        setCompanies(list);
        if (list.length && !formData.companyId) {
          setFormData(prev => ({ ...prev, companyId: list[0].id }));
        }
      })
      .catch(() => setCompanies([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestTaskChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setTestTaskData({ ...testTaskData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!formData.companyId) {
      setError('Сначала выберите компанию (или создайте её, если её ещё нет в системе).');
      return;
    }
    setSubmitting(true);
    try {
      await createJob({
        title: formData.title,
        companyId: Number(formData.companyId),
        location: formData.location,
        salary: {
          min: Number(formData.salaryMin || 0),
          max: Number(formData.salaryMax || 0),
          currency: formData.currency,
        },
        experience: formData.experience,
        type: formData.type,
        description: formData.description,
        requirements: formData.requirements.split(/[\n,]+/).map(s => s.trim()).filter(Boolean),
        benefits: formData.benefits.split(/[\n,]+/).map(s => s.trim()).filter(Boolean),
        techStack: formData.techStack.split(/[\n,]+/).map(s => s.trim()).filter(Boolean),
        isHot: formData.isHot,
        testTask: hasTestTask
          ? {
            type: testTaskData.type,
            title: testTaskData.title,
            description: testTaskData.description,
            difficulty: testTaskData.difficulty,
            timeLimit: testTaskData.timeLimit ? Number(testTaskData.timeLimit) : undefined,
          }
          : undefined,
      });
      navigate('/employer');
    } catch (err: any) {
      setError(err?.message || 'Не удалось создать вакансию');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/employer" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={16} /> Вернуться в панель управления
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-text-primary mb-2">Создание вакансии</h1>
        <p className="text-text-secondary">Подробно опишите вакансию, чтобы найти лучших специалистов.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-error/10 border border-error/30 rounded-lg p-3 text-error text-sm">{error}</div>
        )}

        {/* Основная информация */}
        <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border">
          <h2 className="text-xl font-bold text-text-primary mb-6 pb-2 border-b border-border">Основная информация</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <Briefcase size={14} /> Название должности <span className="text-error">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                placeholder="Например, Senior Frontend Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                Компания <span className="text-error">*</span>
              </label>
              <select
                name="companyId"
                required
                value={formData.companyId}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
              >
                <option value="">— Выберите компанию —</option>
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={14} /> Локация
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  placeholder="Например, Remote, Chisinau"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  Тип занятости
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <DollarSign size={14} /> Зарплатная вилка
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="Мин"
                  className="flex-1 bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <span className="text-text-muted">-</span>
                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="Макс"
                  className="flex-1 bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-24 bg-surface-elevated border border-border rounded-lg px-2 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="MDL">MDL</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Детали */}
        <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-border">
          <h2 className="text-xl font-bold text-text-primary mb-6 pb-2 border-b border-border">Детали вакансии</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <FileText size={14} /> Описание
              </label>
              <textarea
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                placeholder="Опишите задачи и проект..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <CheckCircle size={14} /> Требования (через запятую или с новой строки)
              </label>
              <textarea
                name="requirements"
                required
                rows={3}
                value={formData.requirements}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                placeholder="3+ года опыта, знание React..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                Бонусы (через запятую или с новой строки)
              </label>
              <textarea
                name="benefits"
                rows={3}
                value={formData.benefits}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all resize-none"
                placeholder="Удалённая работа, медстраховка, бонусы..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                <Code size={14} /> Технологический стек (через запятую)
              </label>
              <input
                type="text"
                name="techStack"
                required
                value={formData.techStack}
                onChange={handleChange}
                className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                placeholder="React, TypeScript, Tailwind CSS"
              />
            </div>
          </div>
        </div>

        {/* Тестовое задание */}
        <div className="gradient-card rounded-2xl p-6 sm:p-8 border border-primary/20">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
              <Target size={20} className="text-primary" /> Тестовое задание
            </h2>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={hasTestTask}
                  onChange={() => setHasTestTask(!hasTestTask)}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${hasTestTask ? 'bg-primary' : 'bg-surface-elevated border border-border'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${hasTestTask ? 'transform translate-x-4' : ''}`}></div>
              </div>
              <span className="ml-3 text-sm font-medium text-text-secondary">Добавить тест</span>
            </label>
          </div>

          {hasTestTask && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Тип задания</label>
                  <select
                    name="type"
                    value={testTaskData.type}
                    onChange={handleTestTaskChange}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="algorithm">Алгоритмическая задача</option>
                    <option value="project">Pet-проект</option>
                    <option value="live-coding">Live Coding</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Сложность</label>
                  <select
                    name="difficulty"
                    value={testTaskData.difficulty}
                    onChange={handleTestTaskChange}
                    className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="Easy">Легко</option>
                    <option value="Medium">Средне</option>
                    <option value="Hard">Сложно</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Название теста</label>
                <input
                  type="text"
                  name="title"
                  required={hasTestTask}
                  value={testTaskData.title}
                  onChange={handleTestTaskChange}
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="Например, Реверс связанного списка"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Описание теста</label>
                <textarea
                  name="description"
                  required={hasTestTask}
                  rows={4}
                  value={testTaskData.description}
                  onChange={handleTestTaskChange}
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                  placeholder="Опишите условие задачи..."
                />
              </div>

              <div className="space-y-2 w-1/2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  Лимит времени (минуты)
                </label>
                <input
                  type="number"
                  name="timeLimit"
                  value={testTaskData.timeLimit}
                  onChange={handleTestTaskChange}
                  className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/employer')}
            disabled={submitting}
            className="px-6 py-3 border border-border text-text-secondary font-bold text-sm rounded-lg hover:bg-surface-elevated transition-colors disabled:opacity-60"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-primary text-white font-bold text-sm rounded-lg hover:bg-primary-dark transition-colors shadow-md shadow-primary/20 disabled:opacity-60"
          >
            {submitting ? 'Публикация...' : 'Опубликовать вакансию'}
          </button>
        </div>
      </form>
    </div>
  );
}
