import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../components/Auth/AuthLayout';
import { resetPassword } from '../../services/api';

export default function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    if (!token) {
      setError('Invalid or missing reset token. Please request a new link.');
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'This reset link is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle="Set a new password">
      <div className="bg-charcoal rounded-xl shadow-2xl p-8 md:p-10 border border-border">
        {success ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-sans font-bold text-xl text-text-primary">Password updated</h2>
            <p className="text-sm text-text-secondary">
              Your password has been changed. You can now sign in with your new password.
            </p>
            <Link
              to="/login"
              className="inline-block mt-4 bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] text-white font-sans font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 transition-opacity"
            >
              Sign in
            </Link>
          </div>
        ) : (
          <>
            <h2 className="font-sans font-bold text-xl text-text-primary mb-2">Create a new password</h2>
            <p className="text-sm text-text-secondary mb-6">
              Enter your new password below. Make sure it's at least 6 characters.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label
                  className="block font-sans text-xs font-bold uppercase tracking-widest text-text-secondary"
                  htmlFor="password"
                >
                  New password
                </label>
                <input
                  className="w-full bg-charcoal-light border border-border rounded-lg py-3 px-4 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="block font-sans text-xs font-bold uppercase tracking-widest text-text-secondary"
                  htmlFor="confirm"
                >
                  Confirm password
                </label>
                <input
                  className="w-full bg-charcoal-light border border-border rounded-lg py-3 px-4 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  id="confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] text-white font-sans font-bold py-4 rounded-lg shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Updating…' : 'Reset password'}
              </button>
            </form>

            <p className="mt-6 text-center text-text-secondary text-sm">
              <Link
                to="/login"
                className="text-primary font-semibold hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
              >
                ← Back to sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
