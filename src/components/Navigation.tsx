import React from 'react';
import { Calendar, History, BarChart3, Settings } from 'lucide-react';
import { clsx } from 'clsx';

export type Tab = 'today' | 'history' | 'stats' | 'settings';

interface NavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'today', label: 'Dziś', icon: Calendar },
    { id: 'history', label: 'Historia', icon: History },
    { id: 'stats', label: 'Statystyki', icon: BarChart3 },
    { id: 'settings', label: 'Ustawienia', icon: Settings },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 pb-safe z-50">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={clsx(
              'flex flex-col items-center justify-center gap-1 transition-colors flex-1 h-full',
              activeTab === id
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            )}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
