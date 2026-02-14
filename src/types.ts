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

export interface DailyData {
  waterLiters: number;
  creatineTaken: boolean;
  collagenTaken: boolean;
  supplementsTaken: boolean;
  todos: Todo[];
  note?: string;
  habits?: DailyHabitValue[];
}

export interface AppSettings {
  dailyWaterGoalLiters: number;
  customHabits: CustomHabit[];
}

export interface DaySummary {
  date: string; // YYYY-MM-DD
  waterLiters: number;
  creatineTaken: boolean;
  collagenTaken: boolean;
  supplementsTaken: boolean;
  todosDone: number;
  todosTotal: number;
  note?: string;
  habits?: DailyHabitValue[];
}
