import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Briefcase, Mail, Lock, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    accountType: 'candidate' as 'candidate' | 'employer',
    username: '',
    email: '',
    password: '',
    password_confirm: ''
  });
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleAccountTypeChange = (type: 'candidate' | 'employer') => {
    setFormData(prev => ({ ...prev, accountType: type }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password_confirm) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      await register(formData.username, formData.email, formData.password, formData.accountType);
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Registration failed');
    }
  };

  return (
    <div className="bg-charcoal rounded-xl shadow-2xl border border-border overflow-hidden">
      <div className="p-8 md:p-12">
        <h2 className="font-sans font-bold text-2xl text-text-primary mb-8">
          Создать аккаунт
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Role Selection (Bento-style chips) */}
          <div className="space-y-3">
            <label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">
              Тип аккаунта
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAccountTypeChange('candidate')}
                className={`flex items-center justify-center gap-3 py-4 rounded-lg transition-all duration-200 active:scale-95 ${
                  formData.accountType === 'candidate'
                    ? 'bg-primary/10 border border-primary/30 text-primary'
                    : 'bg-charcoal-light text-text-muted hover:text-text-primary border border-transparent'
                }`}
                type="button"
              >
                <User size={20} />
                <span className="font-sans font-bold text-xs tracking-wider">КАНДИДАТ</span>
              </button>

              <button
                onClick={() => handleAccountTypeChange('employer')}
                className={`flex items-center justify-center gap-3 py-4 rounded-lg transition-all duration-200 active:scale-95 ${
                  formData.accountType === 'employer'
                    ? 'bg-primary/10 border border-primary/30 text-primary'
                    : 'bg-charcoal-light text-text-muted hover:text-text-primary border border-transparent'
                }`}
                type="button"
              >
                <Briefcase size={20} />
                <span className="font-sans font-bold text-xs tracking-wider">КОМПАНИЯ</span>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="group border-t border-border mt-6 pt-6">
              <label
                className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1 block mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative">
                <input
                  className="w-full bg-charcoal-light border border-border rounded-lg py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                  id="username"
                  name="username"
                  placeholder="your_username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
                <BadgeCheck
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/50"
                />
              </div>
            </div>

            <div className="group">
              <label
                className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1 block mb-2"
                htmlFor="email"
              >
                Электронная почта
              </label>
              <div className="relative">
                <input
                  className="w-full bg-charcoal-light border border-border rounded-lg py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                  id="email"
                  name="email"
                  placeholder="name@company.md"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Mail
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1 block mb-2"
                  htmlFor="password"
                >
                  Пароль
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-charcoal-light border border-border rounded-lg py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Lock
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/50"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1 block mb-2"
                  htmlFor="password_confirm"
                >
                  Подтверждение
                </label>
                <div className="relative">
                  <input
                    className="w-full bg-charcoal-light border border-border rounded-lg py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                    id="password_confirm"
                    name="password_confirm"
                    placeholder="••••••••"
                    type="password"
                    value={formData.password_confirm}
                    onChange={handleChange}
                  />
                  <ShieldCheck
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/50"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button
              className="w-full bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] text-white font-sans font-bold py-4 rounded-lg shadow-lg active:scale-[0.98] transition-all duration-200"
              type="submit"
            >
              Создать аккаунт
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-muted">
            Уже есть аккаунт?
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline underline-offset-4 decoration-primary/30 transition-all ml-2"
            >
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
