export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

export interface DailyData {
  waterLiters: number;
  creatineTaken: boolean;
  collagenTaken: boolean;
  todos: Todo[];
}

export interface AppSettings {
  dailyWaterGoalLiters: number;
}

export interface DaySummary {
  date: string; // YYYY-MM-DD
  waterLiters: number;
  creatineTaken: boolean;
  collagenTaken: boolean;
  todosDone: number;
  todosTotal: number;
}
