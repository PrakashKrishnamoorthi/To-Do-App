export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "not_started" | "in_progress" | "completed";

export type TaskFilter = "all" | "active" | "completed";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  status: TaskStatus;
  dueDate?: string; // ISO date string
  priority: TaskPriority;
  createdAt: string; // ISO date string
  completedAt?: string; // ISO date string
}

export interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  isLoading: boolean;
  error: string | null;
}

export type TaskAction =
  | { type: "ADD_TASK"; payload: Omit<Task, "id" | "createdAt"> }
  | { type: "TOGGLE_TASK"; payload: number }
  | { type: "DELETE_TASK"; payload: number }
  | {
      type: "UPDATE_TASK";
      payload: { id: number; updates: Partial<Omit<Task, "id">> };
    }
  | { type: "SET_FILTER"; payload: TaskFilter }
  | { type: "LOAD_TASKS"; payload: Task[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_COMPLETED" };

export interface TaskStats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}
