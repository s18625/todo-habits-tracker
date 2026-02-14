import React from 'react';
import { Droplets, CheckCircle2, Zap, Sparkles, Pill, FileText } from 'lucide-react';
import type { DailyData, AppSettings, SupplementsState } from '../types';
import { clsx } from 'clsx';

interface SummaryCardProps {
  data: DailyData;
  settings: AppSettings;
  dateLabel: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ data, settings, dateLabel }) => {
  const supplements = data.supplementsTaken as SupplementsState;
  const doneTodos = data.todos.filter(t => t.done);

  const isCreatineDone = data.creatineTaken;
  const isCollagenDone = data.collagenTaken;

  const morningSupps = settings.supplementsSettings.morning.enabled;
  const afternoonSupps = settings.supplementsSettings.afternoon.enabled;
  const eveningSupps = settings.supplementsSettings.evening.enabled;

  const areSuppsDone = (
    (!morningSupps || supplements.morning) &&
    (!afternoonSupps || supplements.afternoon) &&
    (!eveningSupps || supplements.evening)
  );

  return (
    <div id="summary-card" className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">DailyTracker</h2>
        <p className="text-slate-500 dark:text-slate-400 font-bold">{dateLabel}</p>
      </div>

      <div className="space-y-4">
        {/* Water */}
        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50">
          <div className="flex items-center gap-3">
            <Droplets className="text-blue-500" size={24} />
            <span className="font-bold text-slate-700 dark:text-slate-200">Woda</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-blue-600 dark:text-blue-400">{data.waterLiters.toFixed(2)}</span>
            <span className="text-sm text-slate-400 dark:text-slate-500 ml-1">/ {settings.dailyWaterGoalLiters}L</span>
          </div>
        </div>

        {/* Tasks */}
        <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-indigo-500" size={24} />
            <span className="font-bold text-slate-700 dark:text-slate-200">Zadania</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">{doneTodos.length}</span>
            <span className="text-sm text-slate-400 dark:text-slate-500 ml-1">/ {data.todos.length}</span>
          </div>
        </div>

        {/* Supplements Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className={clsx(
            "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all",
            isCreatineDone ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800" : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800"
          )}>
            <Zap size={20} className={isCreatineDone ? "text-amber-500 fill-amber-500" : "text-slate-300 dark:text-slate-600"} />
            <span className="text-[10px] font-bold mt-1 dark:text-slate-300">Kreatyna</span>
          </div>

          <div className={clsx(
            "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all",
            isCollagenDone ? "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800" : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800"
          )}>
            <Sparkles size={20} className={isCollagenDone ? "text-pink-500 fill-pink-500" : "text-slate-300 dark:text-slate-600"} />
            <span className="text-[10px] font-bold mt-1 dark:text-slate-300">Kolagen</span>
          </div>

          <div className={clsx(
            "flex flex-col items-center justify-center p-3 rounded-2xl border transition-all",
            areSuppsDone ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800" : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800"
          )}>
            <Pill size={20} className={areSuppsDone ? "text-emerald-500 fill-emerald-500" : "text-slate-300 dark:text-slate-600"} />
            <span className="text-[10px] font-bold mt-1 dark:text-slate-300">Suple</span>
          </div>
        </div>

        {/* Note if exists */}
        {data.note && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-slate-400" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Notatka</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 italic">"{data.note}"</p>
          </div>
        )}

        {/* Task list (for share view) */}
        {doneTodos.length > 0 && (
          <div className="space-y-2 pt-2">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block px-1">Zrealizowane zadania:</span>
             <ul className="space-y-1">
               {doneTodos.map(todo => (
                 <li key={todo.id} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/30 p-2 rounded-lg border border-slate-100 dark:border-slate-800/50">
                   <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                   {todo.text}
                 </li>
               ))}
             </ul>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
           Six Seven
        </div>
      </div>
    </div>
  );
};
