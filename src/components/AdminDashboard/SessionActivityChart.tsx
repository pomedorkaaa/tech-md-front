export default function SessionActivityChart() {
  return (
    <div className="lg:col-span-2 gradient-card rounded-xl p-6 border border-border">
      <h2 className="text-lg font-bold text-text-primary mb-4">Активность сессий</h2>
      <p className="text-sm text-text-muted mb-4">Использование песочниц в реальном времени</p>
      <div className="h-48 flex items-end gap-2">
        {[35, 58, 42, 70, 65, 48, 82, 55, 60, 75, 45, 90, 68, 52, 78, 40, 85, 62, 72, 50].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md gradient-primary opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ height: `${h}%` }}
            title={`${h}% загрузки`}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-text-muted">
        <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:59</span>
      </div>
    </div>
  );
}
