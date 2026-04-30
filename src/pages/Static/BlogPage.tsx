import { Calendar, ArrowRight } from 'lucide-react';

const posts = [
  { id: 1, title: 'Как подготовиться к техническому интервью в 2026', excerpt: 'Практические советы от ведущих разработчиков Молдовы.', date: '28 апреля 2026', tag: 'Карьера', readTime: '5 мин' },
  { id: 2, title: 'Топ-10 технологий для изучения', excerpt: 'Какие технологии наиболее востребованы на рынке Молдовы?', date: '25 апреля 2026', tag: 'Технологии', readTime: '7 мин' },
  { id: 3, title: 'Удалённая работа: тренды и зарплаты', excerpt: 'Исследование рынка удалённой работы в IT-секторе Молдовы.', date: '20 апреля 2026', tag: 'Аналитика', readTime: '6 мин' },
  { id: 4, title: 'Запуск AI-анализа кода в Песочнице', excerpt: 'Новая функция: автоматический анализ качества кода с помощью ИИ.', date: '15 апреля 2026', tag: 'Продукт', readTime: '3 мин' },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 overflow-x-hidden">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-black text-text-primary">Блог <span className="text-primary">TechMoldova</span></h1>
        <p className="text-text-secondary">Статьи о карьере, технологиях и IT-рынке Молдовы</p>
      </div>
      <div className="space-y-5">
        {posts.map(post => (
          <article key={post.id} className="gradient-card rounded-xl p-5 sm:p-6 border border-border hover:border-primary/30 transition-all group cursor-pointer">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-lg bg-primary/10 text-primary border border-primary/20">{post.tag}</span>
              <span className="flex items-center gap-1 text-xs text-text-muted"><Calendar size={12}/> {post.date}</span>
              <span className="text-xs text-text-muted">{post.readTime} чтения</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-primary transition-colors mb-2">{post.title}</h2>
            <p className="text-sm text-text-secondary mb-4">{post.excerpt}</p>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-primary group-hover:gap-2 transition-all">Читать далее <ArrowRight size={14}/></span>
          </article>
        ))}
      </div>
    </div>
  );
}
