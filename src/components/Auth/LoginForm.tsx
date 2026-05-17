import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import OAuthButtons from './OAuthButtons';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (err: any) {
      setError(err?.message || 'Invalid username or password');
    }
  };

  return (
    <div className="bg-charcoal rounded-xl shadow-2xl p-8 md:p-10 border border-border relative overflow-hidden">
      <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Username Field */}
        <div className="space-y-2">
          <label
            className="block font-sans text-xs font-bold uppercase tracking-widest text-text-secondary"
            htmlFor="username"
          >
            Username or Email
          </label>
          <div className="relative">
            <input
              className="w-full bg-charcoal-light border border-border rounded-lg py-3 px-4 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary/50 transition-all outline-none"
              id="username"
              name="username"
              placeholder="username or email@example.com"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label
              className="block font-sans text-xs font-bold uppercase tracking-widest text-text-secondary"
              htmlFor="password"
            >
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-primary hover:text-blue-400 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              className="w-full bg-charcoal-light border border-border rounded-lg py-3 px-4 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary/50 transition-all outline-none"
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Primary Action */}
        <button
          className="w-full bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] text-white font-sans font-bold py-4 rounded-lg shadow-lg active:scale-[0.98] transition-all duration-200"
          type="submit"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6 relative z-10">
        <OAuthButtons />
      </div>

      <p className="mt-8 text-center text-text-secondary text-sm relative z-10">
        Don't have an account?{' '}
        <Link
          to="/register"
          className="text-primary font-semibold hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
        >
          Create a profile
        </Link>
      </p>
    </div>
  );
}
