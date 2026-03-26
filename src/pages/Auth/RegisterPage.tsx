import { Link } from 'react-router-dom';
import { User, Briefcase, Mail, Lock, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

export default function RegisterPage() {
  const [accountType, setAccountType] = useState<'candidate' | 'company'>('candidate');

  return (
    <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden min-h-screen">
      {/* Atmospheric Background Element */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-orange-500/5 rounded-full blur-[100px]"></div>

      {/* Registration Card */}
      <div className="w-full max-w-lg z-10">
        {/* Brand Anchor */}
        <div className="mb-10 text-center">
          <Link to="/" className="inline-flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-bold text-xl font-sans">TM</span>
            </div>
            <h1 className="font-sans font-extrabold text-4xl tracking-tighter flex items-center text-text-primary">
              Tech<span className="text-primary">Moldova</span>
            </h1>
          </Link>
          <p className="font-sans font-medium text-[10px] uppercase tracking-[0.3em] text-text-muted mt-3 opacity-80">
            Digital Architecture & IT Ecosystem
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-charcoal rounded-xl shadow-2xl border border-border overflow-hidden">
          <div className="p-8 md:p-12">
            <h2 className="font-sans font-bold text-2xl text-text-primary mb-8">
              Создать аккаунт
            </h2>

            <form className="space-y-6">
              {/* Role Selection (Bento-style chips) */}
              <div className="space-y-3">
                <label className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted ml-1">
                  Тип аккаунта
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setAccountType('candidate')}
                    className={`flex items-center justify-center gap-3 py-4 rounded-lg transition-all duration-200 active:scale-95 ${
                      accountType === 'candidate'
                        ? 'bg-primary/10 border border-primary/30 text-primary'
                        : 'bg-charcoal-light text-text-muted hover:text-text-primary border border-transparent'
                    }`}
                    type="button"
                  >
                    <User size={20} />
                    <span className="font-sans font-bold text-xs tracking-wider">КАНДИДАТ</span>
                  </button>

                  <button
                    onClick={() => setAccountType('company')}
                    className={`flex items-center justify-center gap-3 py-4 rounded-lg transition-all duration-200 active:scale-95 ${
                      accountType === 'company'
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
                    htmlFor="name"
                  >
                    Полное имя
                  </label>
                  <div className="relative">
                    <input
                      className="w-full bg-charcoal-light border border-border rounded-lg py-4 pl-4 pr-12 text-text-primary placeholder:text-text-muted/40 focus:ring-2 focus:ring-primary/40 focus:border-transparent outline-none font-sans text-sm transition-all"
                      id="name"
                      placeholder="Иван Иванов"
                      type="text"
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
                      placeholder="name@company.md"
                      type="email"
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
                        placeholder="••••••••"
                        type="password"
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
                        placeholder="••••••••"
                        type="password"
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

        {/* National Identity Accent (Subtle Watermark) */}
        <div className="mt-12 flex justify-center items-center gap-6 opacity-20 grayscale">
          <div className="h-[1px] w-12 bg-border"></div>
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-blue-500"></div>
            <div className="w-1 h-3 bg-yellow-500"></div>
            <div className="w-1 h-3 bg-red-500"></div>
          </div>
          <div className="h-[1px] w-12 bg-border"></div>
        </div>

        <p className="mt-6 text-center font-sans text-medium text-[10px] text-text-muted/40 uppercase tracking-widest">
          Designed for the Moldovan Tech Ecosystem
        </p>
      </div>
    </main>
  );
}
