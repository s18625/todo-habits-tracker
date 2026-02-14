import React from 'react';
import type { AppSettings } from '../types';
import { Settings as SettingsIcon, Droplets, Pill } from 'lucide-react';
import { CustomHabitsManager } from './CustomHabitsManager';
import { DataManagement } from './DataManagement';

interface SettingsProps {
  settings: AppSettings;
  onUpdate: (newSettings: AppSettings) => void;
}

export const Settings: React.FC<SettingsProps> = ({ settings, onUpdate }) => {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <SettingsIcon className="text-slate-500" size={24} />
        Ustawienia
      </h2>

      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <Droplets size={20} />
            </div>
            <div>
              <h3 className="font-bold">Dzienny cel wody</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Ile litrów chcesz pić dziennie?</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              step="0.25"
              min="0"
              value={settings.dailyWaterGoalLiters}
              onChange={(e) => onUpdate({ ...settings, dailyWaterGoalLiters: parseFloat(e.target.value) || 0 })}
              className="w-20 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-center font-bold focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span className="font-bold">L</span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <Pill size={20} />
            </div>
            <div>
              <h3 className="font-bold">Pory suplementów</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Skonfiguruj kiedy bierzesz suple</p>
            </div>
          </div>

          <div className="space-y-3">
            {(['morning', 'afternoon', 'evening'] as const).map((period) => (
              <div key={period} className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.supplementsSettings[period].enabled}
                    onChange={(e) => {
                      const newSettings = { ...settings };
                      newSettings.supplementsSettings[period].enabled = e.target.checked;
                      onUpdate(newSettings);
                    }}
                    className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={settings.supplementsSettings[period].label}
                    onChange={(e) => {
                      const newSettings = { ...settings };
                      newSettings.supplementsSettings[period].label = e.target.value;
                      onUpdate(newSettings);
                    }}
                    disabled={!settings.supplementsSettings[period].enabled}
                    className="bg-transparent font-bold text-sm outline-none disabled:opacity-50"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CustomHabitsManager settings={settings} onUpdate={onUpdate} />

      <DataManagement />
    </section>
  );
};
