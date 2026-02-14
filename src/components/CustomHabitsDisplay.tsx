import React from 'react';
import { Check, Hash } from 'lucide-react';
import type { AppSettings, DailyData, DailyHabitValue } from '../types';
import { clsx } from 'clsx';

interface CustomHabitsDisplayProps {
  data: DailyData;
  settings: AppSettings;
  onUpdate: (data: Partial<DailyData>) => void;
}

export const CustomHabitsDisplay: React.FC<CustomHabitsDisplayProps> = ({ data, settings, onUpdate }) => {
  if (settings.customHabits.length === 0) return null;

  const updateHabitValue = (habitId: string, value: boolean | number) => {
    const currentHabits = data.habits || [];
    const existingIndex = currentHabits.findIndex(h => h.habitId === habitId);

    let newHabits: DailyHabitValue[];
    if (existingIndex >= 0) {
      newHabits = [...currentHabits];
      newHabits[existingIndex] = { ...newHabits[existingIndex], value };
    } else {
      newHabits = [...currentHabits, { habitId, value }];
    }

    onUpdate({ habits: newHabits });
  };

  const getHabitValue = (habitId: string) => {
    return data.habits?.find(h => h.habitId === habitId)?.value;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {settings.customHabits.map((habit) => {
        const value = getHabitValue(habit.id);

        if (habit.type === 'checkbox') {
          return (
            <button
              key={habit.id}
              onClick={() => updateHabitValue(habit.id, !value)}
              className={clsx(
                'flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 text-left',
                value
                  ? 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700'
              )}
            >
              <span className={clsx('font-bold', value ? 'text-indigo-700 dark:text-indigo-300' : 'text-slate-600 dark:text-slate-300')}>
                {habit.name}
              </span>
              <div className={clsx(
                'w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-colors',
                value
                  ? 'bg-indigo-600 border-indigo-600 text-white'
                  : 'border-slate-300 dark:border-slate-600'
              )}>
                {value && <Check size={16} strokeWidth={3} />}
              </div>
            </button>
          );
        }

        return (
          <div
            key={habit.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700"
          >
            <span className="font-bold text-slate-600 dark:text-slate-300">{habit.name}</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={(value as number) || 0}
                onChange={(e) => updateHabitValue(habit.id, parseFloat(e.target.value) || 0)}
                className="w-16 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-center font-bold outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Hash size={16} className="text-slate-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
