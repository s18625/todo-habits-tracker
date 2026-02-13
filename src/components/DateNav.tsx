import React from 'react';
import { format, addDays, isToday, isYesterday, isTomorrow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface DateNavProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateNav: React.FC<DateNavProps> = ({ currentDate, onDateChange }) => {
  const getDateLabel = () => {
    if (isToday(currentDate)) return 'Dzisiaj';
    if (isYesterday(currentDate)) return 'Wczoraj';
    if (isTomorrow(currentDate)) return 'Jutro';
    return format(currentDate, 'd MMMM yyyy', { locale: pl });
  };

  return (
    <div className="flex flex-col space-y-4 mb-8">
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => onDateChange(addDays(currentDate, -1))}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Previous day"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {format(currentDate, 'EEEE', { locale: pl })}
          </span>
          <span className="text-lg font-bold">
            {getDateLabel()}
          </span>
        </div>

        <button
          onClick={() => onDateChange(addDays(currentDate, 1))}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Next day"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => onDateChange(new Date())}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
            isToday(currentDate)
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
        >
          Dzisiaj
        </button>
        <div className="relative flex-1">
          <input
            type="date"
            value={format(currentDate, 'yyyy-MM-dd')}
            onChange={(e) => onDateChange(new Date(e.target.value))}
            className="w-full py-2 px-4 rounded-lg text-sm font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 appearance-none cursor-pointer"
          />
          <CalendarIcon size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
        </div>
      </div>
    </div>
  );
};
