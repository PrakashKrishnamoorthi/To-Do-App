import { Task } from "@shared/tasks";

const STORAGE_KEY = "task-manager-tasks";

export const storage = {
  // Save tasks to localStorage
  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks to localStorage:", error);
      throw new Error("Failed to save tasks. Storage might be full.");
    }
  },

  // Load tasks from localStorage
  loadTasks: (): Task[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);

      // Validate the data structure
      if (!Array.isArray(parsed)) {
        console.warn(
          "Invalid task data in localStorage, returning empty array",
        );
        return [];
      }

      // Validate each task object
      const validTasks = parsed.filter((task): task is Task => {
        return (
          typeof task === "object" &&
          task !== null &&
          typeof task.id === "number" &&
          typeof task.title === "string" &&
          typeof task.completed === "boolean" &&
          typeof task.status === "string" &&
          ["not_started", "in_progress", "completed"].includes(task.status) &&
          typeof task.priority === "string" &&
          ["low", "medium", "high"].includes(task.priority) &&
          typeof task.createdAt === "string"
        );
      });

      if (validTasks.length !== parsed.length) {
        console.warn(
          `Filtered out ${parsed.length - validTasks.length} invalid tasks`,
        );
      }

      return validTasks;
    } catch (error) {
      console.error("Failed to load tasks from localStorage:", error);
      return [];
    }
  },

  // Clear all tasks from localStorage
  clearTasks: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to clear tasks from localStorage:", error);
    }
  },

  // Check if localStorage is available
  isAvailable: (): boolean => {
    try {
      const test = "__localStorage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },
};

// Error handling utilities
export class TaskStorageError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "TaskStorageError";
  }
}

export const errorMessages = {
  STORAGE_UNAVAILABLE: "Local storage is not available in this browser",
  SAVE_FAILED: "Failed to save tasks. Your changes may be lost.",
  LOAD_FAILED: "Failed to load saved tasks",
  STORAGE_FULL: "Storage is full. Please clear some data and try again.",
} as const;
