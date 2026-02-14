import { useState, useEffect } from 'react';
import type { DailyData, AppSettings } from '../types';
import { format } from 'date-fns';

const DEFAULT_SETTINGS: AppSettings = {
  dailyWaterGoalLiters: 2.5,
  customHabits: [],
  supplementsSettings: {
    morning: { enabled: true, label: 'Rano' },
    afternoon: { enabled: true, label: 'Południe' },
    evening: { enabled: true, label: 'Wieczór' },
  }
};

const DEFAULT_DAILY_DATA: DailyData = {
  waterLiters: 0,
  creatineTaken: false,
  collagenTaken: false,
  supplementsTaken: {
    morning: false,
    afternoon: false,
    evening: false,
  },
  todos: [],
  note: '',
  habits: [],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrateDailyData(data: any): DailyData {
  let supplementsTaken = data.supplementsTaken;

  // Migration: if supplementsTaken is boolean, move it to morning
  if (typeof supplementsTaken === 'boolean') {
    supplementsTaken = {
      morning: supplementsTaken,
      afternoon: false,
      evening: false,
    };
  } else if (!supplementsTaken) {
    supplementsTaken = DEFAULT_DAILY_DATA.supplementsTaken;
  }

  return {
    ...DEFAULT_DAILY_DATA,
    ...data,
    supplementsTaken,
    note: data.note || '',
    habits: data.habits || [],
  };
}

export function useAppSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: ensure customHabits and supplementsSettings exists
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        customHabits: parsed.customHabits || [],
        supplementsSettings: parsed.supplementsSettings || DEFAULT_SETTINGS.supplementsSettings,
      };
    }
    return DEFAULT_SETTINGS;
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
    if (saved) {
      return migrateDailyData(JSON.parse(saved));
    }
    return DEFAULT_DAILY_DATA;
  });

  const [prevDateKey, setPrevDateKey] = useState(dateKey);

  if (dateKey !== prevDateKey) {
    setPrevDateKey(dateKey);
    const key = `daily_${dateKey}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setData(migrateDailyData(JSON.parse(saved)));
    } else {
      setData(DEFAULT_DAILY_DATA);
    }
  }

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
  if (saved) {
    return migrateDailyData(JSON.parse(saved));
  }
  return DEFAULT_DAILY_DATA;
}
