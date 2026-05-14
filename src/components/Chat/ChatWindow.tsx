import { Send, Paperclip, Code2, MoreVertical } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Conversation } from '../../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  text: string;
  time: string;
  isCode?: boolean;
}

interface ChatWindowProps {
  selectedConversation: Conversation;
  messages: ChatMessage[];
  newMessage: string;
  onMessageChange: (text: string) => void;
  onSendMessage?: () => void;
}

export default function ChatWindow({
  selectedConversation,
  messages,
  newMessage,
  onMessageChange,
  onSendMessage
}: ChatWindowProps) {
  const { t } = useTranslation();

  return (
    <div className="flex-1 flex flex-col">
      {/* Шапка чата */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface-paper">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
            {selectedConversation.companyName[0]}
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{selectedConversation.companyName} — {selectedConversation.jobTitle}</h3>
            <p className="text-xs text-text-muted">{t('chat.online')}</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-surface-elevated text-text-muted transition-colors">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-md rounded-2xl px-4 py-3 ${
              msg.sender === 'user'
                ? 'gradient-primary text-white rounded-br-md'
                : 'bg-surface-elevated text-text-primary rounded-bl-md'
            }`}>
              {msg.isCode ? (
                <div className="relative">
                  <div className="flex items-center gap-1 text-xs opacity-70 mb-2">
                    <Code2 size={12} /> Код
                  </div>
                  <pre className="text-xs font-mono bg-surface/30 rounded-lg p-3 overflow-x-auto whitespace-pre">
                    {msg.text}
                  </pre>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{msg.text}</p>
              )}
              <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-white/60' : 'text-text-muted'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Ввод сообщения */}
      <div className="px-6 py-4 border-t border-border bg-surface-paper">
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors">
            <Paperclip size={18} />
          </button>
          <button className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors">
            <Code2 size={18} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && onSendMessage) {
                onSendMessage();
              }
            }}
            placeholder={t('chat.type_message')}
            className="flex-1 bg-surface-elevated border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50"
          />
          <button
            className="p-2.5 rounded-xl gradient-primary text-white hover:opacity-90 transition-opacity"
            onClick={onSendMessage}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
