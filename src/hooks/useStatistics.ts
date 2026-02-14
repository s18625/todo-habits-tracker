import { useMemo, useCallback } from 'react';
import { format, subDays } from 'date-fns';
import { getDailyDataSync } from './useLocalStorage';
import type { AppSettings, DailyData } from '../types';

interface ExtendedDailyData extends DailyData {
  date: string;
}

export function useStatistics(settings: AppSettings) {
  const getHistory = useCallback((days: number): ExtendedDailyData[] => {
    const history: ExtendedDailyData[] = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const date = subDays(today, i);
      const dateKey = format(date, 'yyyy-MM-dd');
      const dailyData = getDailyDataSync(dateKey);
      history.push({ date: dateKey, ...dailyData });
    }
    return history;
  }, []);

  const calculateMetrics = useCallback((data: ExtendedDailyData[]) => {
    const days = data.length;
    const totalWater = data.reduce((acc, d) => acc + d.waterLiters, 0);
    const avgWater = totalWater / days;

    let totalTodos = 0;
    let completedTodos = 0;
    data.forEach(d => {
      totalTodos += d.todos.length;
      completedTodos += d.todos.filter(t => t.done).length;
    });
    const todoCompletionRate = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

    const creatineDays = data.filter(d => d.creatineTaken).length;
    const collagenDays = data.filter(d => d.collagenTaken).length;

    return {
      avgWater,
      totalWater,
      todoCompletionRate,
      creatineDays,
      collagenDays,
    };
  }, []);

  const calculateStreak = useCallback((checkFn: (d: DailyData) => boolean) => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = subDays(today, i);
      const dateKey = format(date, 'yyyy-MM-dd');
      const dailyData = getDailyDataSync(dateKey);

      if (checkFn(dailyData)) {
        streak++;
      } else {
        // If it's today and not yet completed, don't break the streak yet,
        // but if it's yesterday or earlier and not completed, break it.
        if (i === 0) continue;
        break;
      }
    }
    return streak;
  }, []);

  const stats7 = useMemo(() => calculateMetrics(getHistory(7)), [calculateMetrics, getHistory]);
  const stats30 = useMemo(() => calculateMetrics(getHistory(30)), [calculateMetrics, getHistory]);
  const chartData14 = useMemo(() => getHistory(14).reverse(), [getHistory]);

  const streaks = useMemo(() => ({
    water: calculateStreak(d => d.waterLiters >= settings.dailyWaterGoalLiters),
    creatine: calculateStreak(d => d.creatineTaken),
    collagen: calculateStreak(d => d.collagenTaken),
  }), [calculateStreak, settings.dailyWaterGoalLiters]);

  return {
    stats7,
    stats30,
    chartData14,
    streaks,
  };
}
