import React, { useState } from 'react';
import { Plus, Trash2, Hash, CheckSquare } from 'lucide-react';
import type { AppSettings, CustomHabit, CustomHabitType } from '../types';

interface CustomHabitsManagerProps {
  settings: AppSettings;
  onUpdate: (newSettings: AppSettings) => void;
}

export const CustomHabitsManager: React.FC<CustomHabitsManagerProps> = ({ settings, onUpdate }) => {
  const [newName, setNewName] = useState('');
  const [newType, setNewType] = useState<CustomHabitType>('checkbox');

  const addHabit = () => {
    if (!newName.trim()) return;
    const newHabit: CustomHabit = {
      id: crypto.randomUUID(),
      name: newName.trim(),
      type: newType,
    };
    onUpdate({
      ...settings,
      customHabits: [...settings.customHabits, newHabit],
    });
    setNewName('');
  };

  const removeHabit = (id: string) => {
    onUpdate({
      ...settings,
      customHabits: settings.customHabits.filter(h => h.id !== id),
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-4">
      <h3 className="font-bold flex items-center gap-2">
        <CheckSquare className="text-indigo-500" size={20} />
        Zarządzaj nawykami
      </h3>

      <div className="space-y-3">
        {settings.customHabits.length === 0 && (
          <p className="text-sm text-slate-500 text-center py-4">Nie masz jeszcze żadnych własnych nawyków.</p>
        )}
        {settings.customHabits.map((habit) => (
          <div key={habit.id} className="flex items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              {habit.type === 'checkbox' ? <CheckSquare size={18} className="text-slate-400" /> : <Hash size={18} className="text-slate-400" />}
              <span className="font-medium">{habit.name}</span>
            </div>
            <button
              onClick={() => removeHabit(habit.id)}
              className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-700 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nazwa nowego nawyku..."
            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select
            value={newType}
            onChange={(e) => setNewType(e.target.value as CustomHabitType)}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="checkbox">Tak/Nie</option>
            <option value="number">Liczba</option>
          </select>
        </div>
        <button
          onClick={addHabit}
          disabled={!newName.trim()}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-bold py-2 rounded-lg transition-colors"
        >
          <Plus size={18} />
          Dodaj nawyk
        </button>
      </div>
    </div>
  );
};
