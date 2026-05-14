import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Task } from '../../types';

interface DailyChallengeWidgetProps {
  tasks: Task[];
}

export default function DailyChallengeWidget({ tasks }: DailyChallengeWidgetProps) {
  const { t } = useTranslation();
  return (
    <div className="bg-charcoal rounded-2xl border border-border overflow-hidden shadow-md">
      <div className="p-4 border-b border-border bg-surface-elevated flex items-center justify-between">
        <h3 className="font-black text-xs uppercase tracking-widest text-text-primary flex items-center gap-2">
          <Flame size={16} className="text-yellow-500" />
          {t('home.daily_challenge')}
        </h3>
      </div>
      <div className="p-4 space-y-4">
        {tasks.slice(0, 2).map(task => (
           <Link
             key={task.id}
             to={`/sandbox?task=${task.id}`}
             className="flex items-center gap-3 group cursor-pointer"
           >
             <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center border ${
               task.difficulty === 'Easy' ? 'bg-success/10 border-success/20' :
               task.difficulty === 'Medium' ? 'bg-warning/10 border-warning/20' :
               'bg-error/10 border-error/20'
             }`}>
               <span className={`text-[9px] font-black ${
                 task.difficulty === 'Easy' ? 'text-success' :
                   task.difficulty === 'Medium' ? 'text-warning' :
                 'text-error'
               }`}>
                 {task.difficulty === 'Medium' ? 'MED' : task.difficulty.toUpperCase()}
               </span>
             </div>
             <div className="flex-1">
               <h4 className="text-[13px] font-bold text-text-primary group-hover:text-primary transition-colors leading-snug">{task.title}</h4>
               <p className="text-[10px] text-text-muted mt-0.5">{task.tags.join(' • ')}</p>
             </div>
           </Link>
        ))}
        <Link to="/sandbox" className="block text-center w-full py-2.5 rounded-lg bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
          {t('home.go_sandbox')}
        </Link>
      </div>
    </div>
  );
}
