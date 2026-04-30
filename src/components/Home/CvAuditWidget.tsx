export default function CvAuditWidget() {
  return (
    <div className="relative bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden group">
      <div className="relative z-10 space-y-3">
        <h3 className="font-black text-xl leading-snug">Прокачай свой <br/>CV сегодня</h3>
        <p className="text-white/80 text-xs">Бесплатный разбор резюме от HR-экспертов из Кишинева.</p>
        <button className="bg-white text-primary px-4 py-2 mt-1 rounded-lg font-bold text-xs shadow-xl hover:scale-105 transition-transform">
          Отправить на аудит
        </button>
      </div>
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
      <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
    </div>
  );
}
