import { useState } from 'react';
import { Send, Paperclip, Code2, MoreVertical, ArrowLeft } from 'lucide-react';
import mockData from './ChatMockData.json';
const { conversations } = mockData as any;

interface ChatMessage {
  id: string;
  sender: 'user' | 'other';
  text: string;
  time: string;
  isCode?: boolean;
}

const mockMessages: ChatMessage[] = [
  { id: '1', sender: 'other', text: 'Здравствуйте! Мы ознакомились с вашим профилем и хотели бы предложить пройти техническое интервью.', time: '14:20' },
  { id: '2', sender: 'user', text: 'Здравствуйте! Спасибо за предложение. Когда будет удобно провести интервью?', time: '14:25' },
  { id: '3', sender: 'other', text: 'Также хотели бы попросить вас решить небольшую задачу. Вот пример кода, который нужно оптимизировать:', time: '14:28' },
  {
    id: '4',
    sender: 'other',
    text: `class LRUCache {\n  constructor(capacity) {\n    this.cache = new Map();\n    this.capacity = capacity;\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const val = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, val);\n    return val;\n  }\n}`,
    time: '14:30',
    isCode: true,
  },
  { id: '5', sender: 'user', text: 'Отлично, я посмотрю эту задачу и вернусь с решением сегодня.', time: '14:32' },
];

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false); // Для мобильного переключения

  const handleSelectConversation = (conv: any) => {
    setSelectedConversation(conv);
    setShowChat(true);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-x-hidden">
      {/* Список диалогов — на мобильных полноэкранный, скрывается при выборе чата */}
      <div className={`${showChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 shrink-0 border-r border-border bg-surface-paper flex-col`}>
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-text-primary">Сообщения</h2>
          <p className="text-xs text-text-muted mt-1">Активные диалоги</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => handleSelectConversation(conv)}
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

      {/* Окно чата — на мобильных полноэкранное */}
      <div className={`${showChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col min-w-0`}>
        {/* Шапка чата */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-border bg-surface-paper">
          <div className="flex items-center gap-3 min-w-0">
            {/* Кнопка «Назад» — только мобильные */}
            <button
              onClick={() => setShowChat(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-surface-elevated text-text-muted shrink-0"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs sm:text-sm font-bold shrink-0">
              {selectedConversation.companyName[0]}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm sm:text-base text-text-primary truncate">
                {selectedConversation.companyName}
                <span className="hidden sm:inline"> — {selectedConversation.jobTitle}</span>
              </h3>
              <p className="text-xs text-text-muted">Онлайн</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-surface-elevated text-text-muted transition-colors shrink-0">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Сообщения */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-md rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 ${
                msg.sender === 'user'
                  ? 'gradient-primary text-white rounded-br-md'
                  : 'bg-surface-elevated text-text-primary rounded-bl-md'
              }`}>
                {msg.isCode ? (
                  <div className="relative">
                    <div className="flex items-center gap-1 text-xs opacity-70 mb-2">
                      <Code2 size={12} /> Код
                    </div>
                    <pre className="text-xs font-mono bg-surface/30 rounded-lg p-2 sm:p-3 overflow-x-auto whitespace-pre">
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
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-border bg-surface-paper">
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="hidden sm:block p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors">
              <Paperclip size={18} />
            </button>
            <button className="hidden sm:block p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors">
              <Code2 size={18} />
            </button>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Введите сообщение..."
              className="flex-1 bg-surface-elevated border border-border rounded-xl px-3 sm:px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-primary/50 min-w-0"
            />
            <button className="p-2.5 rounded-xl gradient-primary text-white hover:opacity-90 transition-opacity shrink-0">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
