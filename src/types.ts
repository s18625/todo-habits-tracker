export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export type CustomHabitType = 'checkbox' | 'number';

export interface CustomHabit {
  id: string;
  name: string;
  type: CustomHabitType;
}

export interface DailyHabitValue {
  habitId: string;
  value: boolean | number;
}

export interface SupplementsState {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
}

export interface SupplementsSettings {
  morning: { enabled: boolean; label: string };
  afternoon: { enabled: boolean; label: string };
  evening: { enabled: boolean; label: string };
}

export interface DailyData {
  waterLiters: number;
  creatineTaken: boolean;
  collagenTaken: boolean;
  supplementsTaken: boolean | SupplementsState;
  todos: Todo[];
  note?: string;
  habits?: DailyHabitValue[];
}

export interface AppSettings {
  dailyWaterGoalLiters: number;
  customHabits: CustomHabit[];
  supplementsSettings: SupplementsSettings;
}

export interface DaySummary {
  date: string; // YYYY-MM-DD
  waterLiters: number;
  creatineTaken: boolean;
  collagenTaken: boolean;
  supplementsTaken: boolean | SupplementsState;
  todosDone: number;
  todosTotal: number;
  note?: string;
  habits?: DailyHabitValue[];
}
