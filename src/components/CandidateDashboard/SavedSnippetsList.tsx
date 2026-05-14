import { Bookmark } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { SavedSnippet } from '../../types';

interface SavedSnippetsListProps {
  snippets: SavedSnippet[];
}

export default function SavedSnippetsList({ snippets }: SavedSnippetsListProps) {
  const { t } = useTranslation();

  return (
    <div className="gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
        <Bookmark size={18} /> {t('dashboard.saved_snippets')}
      </h2>
      <div className="space-y-3">
        {snippets.map(snippet => (
          <div key={snippet.id} className="p-4 rounded-xl bg-surface-elevated hover:bg-surface-overlay transition-colors cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 text-xs rounded font-mono font-bold bg-primary/10 text-primary">
                {snippet.languageShort}
              </span>
              <h3 className="font-medium text-sm text-text-primary">{snippet.title}</h3>
            </div>
            <p className="text-xs text-text-muted">{snippet.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
