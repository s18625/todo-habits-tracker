import { useState, useEffect } from 'react';
import type { DailyData, AppSettings } from '../types';
import { format } from 'date-fns';

const DEFAULT_SETTINGS: AppSettings = {
  dailyWaterGoalLiters: 2.5,
};

const DEFAULT_DAILY_DATA: DailyData = {
  waterLiters: 0,
  creatineTaken: false,
  collagenTaken: false,
  todos: [],
};

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('app_settings', JSON.stringify(settings));
  }, [settings]);

  return [settings, setSettings] as const;
}

export function useDailyData(date: Date) {
  const dateKey = format(date, 'yyyy-MM-dd');
  const [data, setData] = useState<DailyData>(() => {
    const key = `daily_${dateKey}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : DEFAULT_DAILY_DATA;
  });

  useEffect(() => {
    const key = `daily_${dateKey}`;
    const saved = localStorage.getItem(key);
    setData(saved ? JSON.parse(saved) : DEFAULT_DAILY_DATA);
  }, [dateKey]);

  const updateData = (newData: Partial<DailyData> | ((prev: DailyData) => DailyData)) => {
    setData(prev => {
      const updated = typeof newData === 'function' ? newData(prev) : { ...prev, ...newData };
      localStorage.setItem(`daily_${dateKey}`, JSON.stringify(updated));
      
      // Dispatch a custom event to notify other components (like History) that data has changed
      window.dispatchEvent(new Event('storage-update'));
      
      return updated;
    });
  };

  return [data, updateData] as const;
}

export function getDailyDataSync(dateKey: string): DailyData {
  const key = `daily_${dateKey}`;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : DEFAULT_DAILY_DATA;
}
