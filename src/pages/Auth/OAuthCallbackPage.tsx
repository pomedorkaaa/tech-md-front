import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const STATE_KEY = 'techmoldova-oauth-state';
const SUPPORTED = ['google', 'github'] as const;
type SupportedProvider = (typeof SUPPORTED)[number];

/**
 * Handles the redirect that Google / GitHub send the browser to after consent.
 * Exchanges ?code=… via the backend, then sends the user home.
 */
export default function OAuthCallbackPage() {
  const { provider } = useParams<{ provider: string }>();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithOAuth } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return; // guards against React StrictMode double-invocation
    ranRef.current = true;

    const code = params.get('code');
    const state = params.get('state');
    const errorParam = params.get('error');
    const expectedState = sessionStorage.getItem(STATE_KEY);
    sessionStorage.removeItem(STATE_KEY);

    if (errorParam) {
      setError(`Authorization failed: ${errorParam}`);
      return;
    }

    if (!provider || !SUPPORTED.includes(provider as SupportedProvider)) {
      setError('Unsupported OAuth provider.');
      return;
    }
    if (!code) {
      setError('Missing authorization code.');
      return;
    }
    if (state && expectedState && state !== expectedState) {
      setError('OAuth state mismatch. Please try again.');
      return;
    }

    loginWithOAuth(provider as SupportedProvider, code)
      .then(() => navigate('/', { replace: true }))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : 'OAuth login failed';
        setError(message);
      });
  }, [provider, params, loginWithOAuth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-charcoal">
      <div className="bg-charcoal rounded-xl shadow-2xl p-8 md:p-10 border border-border max-w-md w-full text-center space-y-4">
        {error ? (
          <>
            <h2 className="font-sans font-bold text-xl text-text-primary">Sign-in failed</h2>
            <p className="text-sm text-text-secondary">{error}</p>
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="mt-2 inline-block bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
            >
              Back to login
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <h2 className="font-sans font-bold text-lg text-text-primary">Signing you in…</h2>
            <p className="text-sm text-text-secondary">
              Verifying your {provider} account, please wait.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
