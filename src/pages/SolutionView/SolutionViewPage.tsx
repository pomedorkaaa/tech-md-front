import { Zap, Brain, CheckCircle, ShieldAlert } from 'lucide-react';
import { SolutionHeader } from '../../components/SolutionView/SolutionHeader';
import { CodeViewer } from '../../components/SolutionView/CodeViewer';
import { ReviewComments } from '../../components/SolutionView/ReviewComments';

export default function SolutionViewPage() {
  return (
    <div className="flex-1 flex justify-center py-8 px-4 sm:px-8">
      <div className="w-full max-w-[1400px] flex flex-col gap-6">
        
        <SolutionHeader />

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group flex flex-col gap-1 rounded-xl p-5 bg-charcoal-light border border-border hover:border-yellow-400/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest font-mono">Runtime</p>
              <Zap size={20} className="text-yellow-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-text-primary text-3xl font-black font-sans">45<span className="text-sm font-normal text-text-muted ml-1">ms</span></p>
            </div>
            <p className="text-yellow-400 text-[11px] font-bold flex items-center gap-1 mt-2 font-mono">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              ТОП 15% ПО СКОРОСТИ
            </p>
          </div>
          <div className="group flex flex-col gap-1 rounded-xl p-5 bg-charcoal-light border border-border hover:border-blue-400/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest font-mono">Memory</p>
              <Brain size={20} className="text-blue-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-text-primary text-3xl font-black font-sans">12.4<span className="text-sm font-normal text-text-muted ml-1">MB</span></p>
            </div>
            <p className="text-blue-400 text-[11px] font-bold flex items-center gap-1 mt-2 font-mono">
              <CheckCircle size={14} />
              ОПТИМАЛЬНЫЙ РАСХОД
            </p>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-5 bg-charcoal-light border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest font-mono">Tests</p>
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-text-primary text-3xl font-black font-sans">15<span className="text-text-muted font-light mx-1">/</span>15</p>
            </div>
            <p className="text-green-400 text-[11px] font-bold mt-2 font-mono">ВСЕ ТЕСТЫ ПРОЙДЕНЫ</p>
          </div>
          <div className="flex flex-col gap-1 rounded-xl p-5 bg-charcoal-light border border-border">
            <div className="flex items-center justify-between mb-2">
              <p className="text-text-muted text-xs font-bold uppercase tracking-widest font-mono">Code Quality</p>
              <ShieldAlert size={20} className="text-orange-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-text-primary text-3xl font-black font-sans">A<span className="text-text-muted text-xl">-</span></p>
            </div>
            <p className="text-text-secondary text-[11px] font-bold mt-2 uppercase tracking-tight font-mono">2 ЗАМЕЧАНИЯ LINTER</p>
          </div>
        </div>

        <CodeViewer />
        <ReviewComments />

      </div>
    </div>
  );
}
