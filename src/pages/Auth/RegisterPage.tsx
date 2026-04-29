import { Link, useNavigate, Navigate } from 'react-router-dom';
import { User, Briefcase, Mail, Lock, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<'candidate' | 'company'>('candidate');
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(name, email, password, accountType === 'company' ? 'employer' : 'candidate');
      navigate('/');
    } finally { setLoading(false); }
  };

  return (
    <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative min-h-screen overflow-x-hidden">
      {/* Atmospheric Background Elements — всегда видимы, но ограничены контейнером */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-orange-500/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Registration Card */}
      <div className="w-full max-w-lg z-10">
        {/* Brand Anchor */}
        <div className="mb-6 sm:mb-10 text-center">
          <Link to="/" className="inline-flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <span className="text-white font-bold text-lg sm:text-xl font-sans">TM</span>
            </div>
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tighter flex items-center text-text-primary">
              Tech<span className="text-primary">Moldova</span>
            </h1>
          </Link>
          <p className="font-sans font-medium text-[10px] uppercase tracking-[0.3em] text-text-muted mt-3 opacity-80">
            Digital Architecture & IT Ecosystem
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-charcoal rounded-xl shadow-2xl border border-border overflow-hidden">
          <div className="p-5 sm:p-8 md:p-12">
            <h2 className="font-sans font-bold text-xl sm:text-2xl text-text-primary mb-6 sm:mb-8">
              Создать аккаунт
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Role Selection (Bento-style chips) */}
              <div className="space-y-3">
                <label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">
                  Тип аккаунта
                </label>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  <button
                    onClick={() => setAccountType('candidate')}
                    className={`flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-lg transition-all duration-200 active:scale-95 ${
                      accountType === 'candidate'
                        ? 'bg-primary/10 border border-primary/30 text-primary'
                        : 'bg-charcoal-light text-text-muted hover:text-text-primary border border-transparent'
                    }`}
                    type="button"
                  >
                    <User size={18} />
                    <span className="font-sans font-bold text-[10px] sm:text-xs tracking-wider">КАНДИДАТ</span>
                  </button>

                  <button
                    onClick={() => setAccountType('company')}
                    className={`flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 rounded-lg transition-all duration-200 active:scale-95 ${
                      accountType === 'company'
                        ? 'bg-primary/10 border border-primary/30 text-primary'
                        : 'bg-charcoal-light text-text-muted hover:text-text-primary border border-transparent'
                    }`}
                    type="button"
                  >
                    <Briefcase size={18} />
                    <span className="font-sans font-bold text-[10px] sm:text-xs tracking-wider">КОМПАНИЯ</span>
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div className="group border-t border-border mt-4 sm:mt-6 pt-4 sm:pt-6">
                  <label
                    className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1 block mb-2"
                    htmlFor="name"
                  >
                    Полное имя
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-charcoal-light border border-border rounded-lg py-3 sm:py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                      id="name"
                      placeholder="Иван Иванов"
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                    <BadgeCheck
                      size={18}
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
                      className="w-full bg-charcoal-light border border-border rounded-lg py-3 sm:py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                      id="email"
                      placeholder="name@company.md"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <Mail
                      size={18}
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
                        className="w-full bg-charcoal-light border border-border rounded-lg py-3 sm:py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <Lock
                        size={18}
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
                        className="w-full bg-charcoal-light border border-border rounded-lg py-3 sm:py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                        id="password_confirm"
                        placeholder="••••••••"
                        type="password"
                      />
                      <ShieldCheck
                        size={18}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted/50"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  className="w-full bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] text-white font-sans font-bold py-3.5 sm:py-4 rounded-lg shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Создание...' : 'Создать аккаунт'}
                </button>
              </div>
            </form>

            {/* Footer Link */}
            <div className="mt-6 sm:mt-8 text-center">
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

        {/* National Identity Accent (Subtle Watermark) — всегда видимый */}
        <div className="mt-8 sm:mt-12 flex justify-center items-center gap-6 opacity-20 grayscale">
          <div className="h-[1px] w-12 bg-border"></div>
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-blue-500"></div>
            <div className="w-1 h-3 bg-yellow-500"></div>
            <div className="w-1 h-3 bg-red-500"></div>
          </div>
          <div className="h-[1px] w-12 bg-border"></div>
        </div>

        <p className="mt-4 sm:mt-6 text-center font-sans text-medium text-[10px] text-text-muted/40 uppercase tracking-widest">
          Designed for the Moldovan Tech Ecosystem
        </p>
      </div>
    </main>
  );
}
