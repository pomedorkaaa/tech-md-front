import { useState } from 'react';
import mockData from './ChatMockData.json';
import type { Conversation } from '../../types';
import ConversationsSidebar from '../../components/Chat/ConversationsSidebar';
import ChatWindow from '../../components/Chat/ChatWindow';
import type { ChatMessage } from '../../components/Chat/ChatWindow';

const { conversations } = mockData as { conversations: Conversation[] };

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
  const [chatState, setChatState] = useState({
    selectedConversation: conversations[0],
    messages: mockMessages,
    newMessage: ''
  });

  const handleSelectConversation = (conv: Conversation) => {
    setChatState(prev => ({ ...prev, selectedConversation: conv }));
  };

  const handleMessageChange = (text: string) => {
    setChatState(prev => ({ ...prev, newMessage: text }));
  };

  const handleSendMessage = () => {
    if (!chatState.newMessage.trim()) return;
    
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: chatState.newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg],
      newMessage: ''
    }));
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <ConversationsSidebar 
        conversations={conversations}
        selectedConversation={chatState.selectedConversation}
        onSelect={handleSelectConversation}
      />
      <ChatWindow 
        selectedConversation={chatState.selectedConversation}
        messages={chatState.messages}
        newMessage={chatState.newMessage}
        onMessageChange={handleMessageChange}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
