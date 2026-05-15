import { useState } from 'react';
import { HelpCircle, ChevronDown, Send, Mail, MessageCircle } from 'lucide-react';

const faqs = [
  { q: 'Как создать аккаунт?', a: 'Нажмите «Регистрация» в правом верхнем углу и выберите тип аккаунта — кандидат или работодатель.' },
  { q: 'Как откликнуться на вакансию?', a: 'Перейдите на страницу вакансии и нажмите «Откликнуться». Если у вакансии есть тестовое задание, вам предложат его решить.' },
  { q: 'Что такое Coding Score?', a: 'Это рейтинг, который формируется на основе решённых задач в Песочнице. Чем больше и сложнее задач вы решаете, тем выше ваш score.' },
  { q: 'Как работает Песочница?', a: 'Песочница — это встроенный редактор кода, где вы можете решать алгоритмические задачи. Поддерживаются Python, JavaScript, TypeScript и Go.' },
  { q: 'Стоимость использования?', a: 'Для кандидатов платформа полностью бесплатна. Для работодателей доступны различные тарифные планы.' },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Поддержка: ${name || 'без имени'}`);
    const body = encodeURIComponent(`От: ${name} <${email}>\n\n${text}`);
    window.location.href = `mailto:support@techmoldova.md?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 overflow-x-hidden">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-text-primary">Центр <span className="text-primary">поддержки</span></h1>
        <p className="text-text-secondary">Ответы на частые вопросы и возможность связаться с нами</p>
      </div>

      <div className="gradient-card rounded-xl p-5 sm:p-6 border border-border">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4"><HelpCircle size={20} className="text-primary"/> Частые вопросы</h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-border rounded-lg overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-text-primary hover:bg-surface-elevated transition-colors text-left">
                {faq.q}
                <ChevronDown size={16} className={`shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''} text-text-muted`}/>
              </button>
              {openFaq === i && <div className="px-4 pb-3 text-sm text-text-secondary">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={submit} className="gradient-card rounded-xl p-5 sm:p-6 border border-border space-y-5">
        <h2 className="text-lg font-bold text-text-primary flex items-center gap-2"><MessageCircle size={20} className="text-primary"/> Связаться с нами</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Имя</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:border-primary/50"
              placeholder="Ваше имя"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:border-primary/50"
              placeholder="name@email.md"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Сообщение</label>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            required
            rows={4}
            className="w-full bg-surface-elevated border border-border rounded-lg px-4 py-3 text-sm text-text-primary outline-none focus:border-primary/50 resize-none"
            placeholder="Опишите вашу проблему..."
          />
        </div>
        <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-lg gradient-primary text-white font-bold text-sm">
          <Send size={16}/> Отправить
        </button>
      </form>

      <div className="text-center text-sm text-text-muted">
        <p className="flex items-center justify-center gap-2">
          <Mail size={14}/>
          <a href="mailto:support@techmoldova.md" className="text-primary hover:underline">support@techmoldova.md</a>
        </p>
      </div>
    </div>
  );
}
