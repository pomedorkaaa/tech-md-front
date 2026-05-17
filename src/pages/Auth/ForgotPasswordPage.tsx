import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/Auth/AuthLayout';
import { forgotPassword } from '../../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setSent(true);
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle="Reset your password">
      <div className="bg-charcoal rounded-xl shadow-2xl p-8 md:p-10 border border-border">
        {sent ? (
          <div className="text-center space-y-4">
            <div className="w-14 h-14 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="font-sans font-bold text-xl text-text-primary">Check your email</h2>
            <p className="text-sm text-text-secondary">
              If an account exists for <span className="font-semibold text-text-primary">{email}</span>,
              we've sent a password reset link. It expires in 1 hour.
            </p>
            <Link
              to="/login"
              className="inline-block mt-4 text-primary font-semibold text-sm hover:underline underline-offset-4"
            >
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h2 className="font-sans font-bold text-xl text-text-primary mb-2">Forgot your password?</h2>
            <p className="text-sm text-text-secondary mb-6">
              Enter the email address associated with your account and we'll send you a link to reset your password.
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
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  className="w-full bg-charcoal-light border border-border rounded-lg py-3 px-4 text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-primary/50 transition-all outline-none"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@company.md"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-gradient-to-br from-[#adc6ff] to-[#4d8eff] dark:from-[#4d8eff] dark:to-[#005ac2] text-white font-sans font-bold py-4 rounded-lg shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>

            <p className="mt-6 text-center text-text-secondary text-sm">
              Remember your password?{' '}
              <Link
                to="/login"
                className="text-primary font-semibold hover:text-blue-400 transition-colors underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
