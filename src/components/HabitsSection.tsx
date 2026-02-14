import React from 'react';
import type { DailyData, AppSettings } from '../types';
import { Droplets, Zap, Sparkles, RefreshCcw, Plus, Pill } from 'lucide-react';
import { CustomHabitsDisplay } from './CustomHabitsDisplay';

interface HabitsSectionProps {
  data: DailyData;
  settings: AppSettings;
  onUpdate: (newData: Partial<DailyData>) => void;
}

export const HabitsSection: React.FC<HabitsSectionProps> = ({ data, settings, onUpdate }) => {
  const waterProgress = Math.min((data.waterLiters / settings.dailyWaterGoalLiters) * 100, 100);

  const addWater = (amount: number) => {
    onUpdate({ waterLiters: Math.max(0, data.waterLiters + amount) });
  };

  const resetWater = () => {
    onUpdate({ waterLiters: 0 });
  };

  return (
    <section className="space-y-6 mb-10">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Sparkles className="text-amber-500" size={24} />
        Nawyki dzisiaj
      </h2>

      {/* Water Tracker */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Droplets size={24} />
            </div>
            <div>
              <h3 className="font-bold">Woda</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Cel: {settings.dailyWaterGoalLiters}L
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
              {data.waterLiters.toFixed(2)}
            </span>
            <span className="text-slate-400 dark:text-slate-500 font-medium ml-1">/ {settings.dailyWaterGoalLiters}L</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${waterProgress}%` }}
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[0.25, 0.5, 1.0].map((amount) => (
            <button
              key={amount}
              onClick={() => addWater(amount)}
              className="flex items-center justify-center gap-1 py-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl transition-colors text-sm font-bold border border-slate-100 dark:border-slate-600"
            >
              <Plus size={14} />
              {amount}L
            </button>
          ))}
          <button
            onClick={resetWater}
            className="flex items-center justify-center py-2 bg-slate-50 dark:bg-slate-700/50 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-xl transition-colors text-sm font-bold border border-slate-100 dark:border-slate-600"
          >
            <RefreshCcw size={14} />
          </button>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => onUpdate({ creatineTaken: !data.creatineTaken })}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
            data.creatineTaken
              ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
          }`}
        >
          <Zap className={`mb-2 ${data.creatineTaken ? 'fill-amber-500' : ''}`} size={24} />
          <span className="font-bold text-sm">Kreatyna</span>
          <span className="text-[10px] mt-1">{data.creatineTaken ? 'Zrobione!' : 'Do zrobienia'}</span>
        </button>

        <button
          onClick={() => onUpdate({ collagenTaken: !data.collagenTaken })}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
            data.collagenTaken
              ? 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-400'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
          }`}
        >
          <Sparkles className={`mb-2 ${data.collagenTaken ? 'fill-pink-500' : ''}`} size={24} />
          <span className="font-bold text-sm">Kolagen</span>
          <span className="text-[10px] mt-1">{data.collagenTaken ? 'Zrobione!' : 'Do zrobienia'}</span>
        </button>

        <button
          onClick={() => onUpdate({ supplementsTaken: !data.supplementsTaken })}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
            data.supplementsTaken
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
          }`}
        >
          <Pill className={`mb-2 ${data.supplementsTaken ? 'fill-emerald-500' : ''}`} size={24} />
          <span className="font-bold text-sm">Suple</span>
          <span className="text-[10px] mt-1">{data.supplementsTaken ? 'Zrobione!' : 'Do zrobienia'}</span>
        </button>
      </div>

      <CustomHabitsDisplay
        data={data}
        settings={settings}
        onUpdate={onUpdate}
      />
    </section>
  );
};
