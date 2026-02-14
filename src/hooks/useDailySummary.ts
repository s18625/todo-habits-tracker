import { getDailyDataSync, useAppSettings } from './useLocalStorage';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';

export function useDailySummary(dateKey: string) {
  const data = getDailyDataSync(dateKey);
  const [settings] = useAppSettings();

  let dateLabel = dateKey;
  try {
    const date = parseISO(dateKey);
    dateLabel = format(date, 'd MMMM yyyy', { locale: pl });
  } catch {
    console.error('Invalid date', dateKey);
  }

  const hasData = data.waterLiters > 0 ||
                  data.creatineTaken ||
                  data.collagenTaken ||
                  (data.todos && data.todos.length > 0) ||
                  (typeof data.supplementsTaken === 'object' && (data.supplementsTaken.morning || data.supplementsTaken.afternoon || data.supplementsTaken.evening));

  return { data, settings, dateLabel, hasData };
}
