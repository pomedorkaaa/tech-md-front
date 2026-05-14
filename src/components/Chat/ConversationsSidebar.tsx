import { useTranslation } from 'react-i18next';
import type { Conversation } from '../../types';

interface ConversationsSidebarProps {
  conversations: Conversation[];
  selectedConversation: Conversation;
  onSelect: (conv: Conversation) => void;
}

export default function ConversationsSidebar({ conversations, selectedConversation, onSelect }: ConversationsSidebarProps) {
  const { t } = useTranslation();

  return (
    <div className="w-80 shrink-0 border-r border-border bg-surface-paper flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-bold text-text-primary">{t('chat.conversations')}</h2>
        <p className="text-xs text-text-muted mt-1">Активные диалоги</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map(conv => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv)}
            className={`w-full flex items-start gap-3 p-4 text-left transition-colors border-b border-border/50 ${
              selectedConversation.id === conv.id
                ? 'bg-primary/5 border-l-2 border-l-primary'
                : 'hover:bg-surface-elevated'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
              {conv.companyName[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-text-primary truncate">{conv.jobTitle}</h3>
                <span className="text-xs text-text-muted shrink-0 ml-2">{conv.lastMessageTime}</span>
              </div>
              <p className="text-xs text-text-muted truncate mt-0.5">{conv.lastMessage}</p>
            </div>
            {conv.unread && (
              <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
