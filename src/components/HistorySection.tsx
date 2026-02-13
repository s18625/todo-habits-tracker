import React, { useState, useEffect, useCallback } from 'react';
import { format, subDays } from 'date-fns';
import { pl } from 'date-fns/locale';
import { History, Droplets, Zap, Sparkles, CheckCircle } from 'lucide-react';
import { getDailyDataSync } from '../hooks/useLocalStorage';
import type { DaySummary } from '../types';

export const HistorySection: React.FC = () => {
  const [history, setHistory] = useState<DaySummary[]>([]);

  const loadHistory = useCallback(() => {
    const last7Days: DaySummary[] = [];
    for (let i = 0; i < 7; i++) {
      const date = subDays(new Date(), i);
      const dateKey = format(date, 'yyyy-MM-dd');
      const data = getDailyDataSync(dateKey);
      
      last7Days.push({
        date: dateKey,
        waterLiters: data.waterLiters,
        creatineTaken: data.creatineTaken,
        collagenTaken: data.collagenTaken,
        todosDone: data.todos.filter(t => t.done).length,
        todosTotal: data.todos.length,
      });
    }
    setHistory(last7Days);
  }, []);

  useEffect(() => {
    loadHistory();
    window.addEventListener('storage-update', loadHistory);
    return () => window.removeEventListener('storage-update', loadHistory);
  }, [loadHistory]);

  return (
    <section className="space-y-6 mt-12 pb-10">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <History className="text-purple-500" size={24} />
        Historia (ostatnie 7 dni)
      </h2>

      <div className="space-y-3">
        {history.map((day) => (
          <div
            key={day.date}
            className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-slate-700 dark:text-slate-200">
                {format(new Date(day.date), 'EEEE, d MMM', { locale: pl })}
              </span>
              <div className="flex gap-2">
                <span className={`p-1.5 rounded-lg ${day.waterLiters > 0 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                  <Droplets size={14} />
                </span>
                <span className={`p-1.5 rounded-lg ${day.creatineTaken ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                  <Zap size={14} />
                </span>
                <span className={`p-1.5 rounded-lg ${day.collagenTaken ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' : 'bg-slate-100 dark:bg-slate-700 text-slate-400'}`}>
                  <Sparkles size={14} />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Droplets size={14} className="text-blue-500" />
                <span>Woda: <strong>{day.waterLiters.toFixed(2)}L</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <CheckCircle size={14} className="text-green-500" />
                <span>Zadania: <strong>{day.todosDone}/{day.todosTotal}</strong></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
