import { useState } from 'react';
import { getOAuthUrl } from '../../services/api';

const STATE_KEY = 'techmoldova-oauth-state';

/**
 * Google / GitHub sign-in buttons. Always visible — clicking starts the
 * OAuth authorization-code flow. If a provider is not configured on the
 * backend, the user gets a clear error message.
 */
export default function OAuthButtons() {
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'github' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async (provider: 'google' | 'github') => {
    try {
      setError(null);
      setLoadingProvider(provider);
      const state = `${provider}:${crypto.randomUUID()}`;
      sessionStorage.setItem(STATE_KEY, state);
      const url = await getOAuthUrl(provider, state);
      window.location.href = url;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'OAuth start failed';
      setError(message);
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-border" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
          or
        </span>
        <div className="flex-1 border-t border-border" />
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={() => handleClick('google')}
          disabled={loadingProvider !== null}
          className="flex items-center justify-center gap-3 w-full bg-charcoal-light hover:bg-surface-elevated border border-border rounded-lg py-3 px-4 text-sm font-semibold text-text-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <GoogleIcon />
          <span>{loadingProvider === 'google' ? 'Redirecting…' : 'Continue with Google'}</span>
        </button>

        <button
          type="button"
          onClick={() => handleClick('github')}
          disabled={loadingProvider !== null}
          className="flex items-center justify-center gap-3 w-full bg-charcoal-light hover:bg-surface-elevated border border-border rounded-lg py-3 px-4 text-sm font-semibold text-text-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <GitHubIcon />
          <span>{loadingProvider === 'github' ? 'Redirecting…' : 'Continue with GitHub'}</span>
        </button>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.51 8.18c0-.57-.05-1.11-.14-1.63H9v3.09h4.21a3.6 3.6 0 0 1-1.56 2.36v1.96h2.52c1.47-1.36 2.34-3.36 2.34-5.78z"
        fill="#4285F4"
      />
      <path
        d="M9 17c2.12 0 3.9-.7 5.2-1.9l-2.52-1.96c-.7.47-1.6.75-2.68.75-2.06 0-3.81-1.39-4.43-3.27H1.96v2.05A8 8 0 0 0 9 17z"
        fill="#34A853"
      />
      <path
        d="M4.57 10.62a4.8 4.8 0 0 1 0-3.06V5.51H1.96a8 8 0 0 0 0 7.16l2.61-2.05z"
        fill="#FBBC05"
      />
      <path
        d="M9 4.74c1.16 0 2.2.4 3.02 1.18l2.24-2.24A8 8 0 0 0 1.96 5.51l2.61 2.05C5.19 6.13 6.94 4.74 9 4.74z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-1.95c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.16 1.18.92-.26 1.9-.39 2.88-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.16-1.18 3.16-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.42-2.69 5.4-5.25 5.68.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
