import { useEffect, useState } from 'react';
import type { Conversation, Message } from '../../types';
import ConversationsSidebar from '../../components/Chat/ConversationsSidebar';
import ChatWindow from '../../components/Chat/ChatWindow';
import type { ChatMessage } from '../../components/Chat/ChatWindow';
import { useAuth } from '../../contexts/AuthContext';
import { getConversations, getMessages, sendMessage } from '../../services/api';

function toChatMessage(m: Message, currentUserId: string): ChatMessage {
  return {
    id: m.id,
    sender: m.senderId === currentUserId ? 'user' : 'other',
    text: m.content,
    time: m.timestamp ? new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
    isCode: !!m.isCode,
  };
}

export default function ChatPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!user) return;
    getConversations(user.id)
      .then(list => {
        setConversations(list);
        if (list.length) setSelected(list[0]);
      })
      .catch(() => setConversations([]));
  }, [user]);

  useEffect(() => {
    if (!selected || !user) {
      setMessages([]);
      return;
    }
    getMessages(selected.id)
      .then(list => setMessages(list.map(m => toChatMessage(m, user.id))))
      .catch(() => setMessages([]));
  }, [selected, user]);

  const handleSelectConversation = (conv: Conversation) => {
    setSelected(conv);
  };

  const handleMessageChange = (text: string) => {
    setNewMessage(text);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selected || !user) return;
    const text = newMessage;
    setNewMessage('');
    try {
      const created = await sendMessage({
        conversationId: Number(selected.id),
        senderId: Number(user.id),
        content: text,
      });
      setMessages(prev => [...prev, toChatMessage(created, user.id)]);
    } catch {
      // мягкий откат: возвращаем текст в инпут
      setNewMessage(text);
    }
  };

  if (!user) return null;

  if (conversations.length === 0 || !selected) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-text-muted">
        У вас пока нет диалогов
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <ConversationsSidebar
        conversations={conversations}
        selectedConversation={selected}
        onSelect={handleSelectConversation}
      />
      <ChatWindow
        selectedConversation={selected}
        messages={messages}
        newMessage={newMessage}
        onMessageChange={handleMessageChange}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
