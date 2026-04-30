export default function EmployerCTA() {
  return (
    <div className="mt-8 gradient-card rounded-xl p-6 border border-primary/20">
      <h3 className="text-lg font-bold text-text-primary mb-2">Начните поиск талантов прямо сейчас</h3>
      <p className="text-sm text-text-secondary mb-4">
        Создайте новую вакансию и добавьте тестовое задание, чтобы автоматически отфильтровать лучших кандидатов.
      </p>
      <button className="px-6 py-3 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity text-sm">
        Создать вакансию
      </button>
    </div>
  );
}
