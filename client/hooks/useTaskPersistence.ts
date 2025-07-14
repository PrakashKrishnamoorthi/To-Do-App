import { useEffect, useCallback } from "react";
import { Task } from "@shared/tasks";
import { storage, TaskStorageError, errorMessages } from "@/lib/storage";

interface UseTaskPersistenceProps {
  tasks: Task[];
  onLoadTasks: (tasks: Task[]) => void;
  onError: (error: string) => void;
}

export function useTaskPersistence({
  tasks,
  onLoadTasks,
  onError,
}: UseTaskPersistenceProps) {
  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      try {
        if (!storage.isAvailable()) {
          onError(errorMessages.STORAGE_UNAVAILABLE);
          return;
        }

        const savedTasks = storage.loadTasks();
        onLoadTasks(savedTasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
        onError(errorMessages.LOAD_FAILED);
      }
    };

    loadTasks();
  }, [onLoadTasks, onError]);

  // Save tasks whenever they change
  useEffect(() => {
    // Don't save on initial load (empty tasks array)
    if (tasks.length === 0) return;

    const saveTasksWithDelay = setTimeout(() => {
      try {
        if (!storage.isAvailable()) {
          onError(errorMessages.STORAGE_UNAVAILABLE);
          return;
        }

        storage.saveTasks(tasks);
      } catch (error) {
        console.error("Failed to save tasks:", error);
        if (
          error instanceof DOMException &&
          error.name === "QuotaExceededError"
        ) {
          onError(errorMessages.STORAGE_FULL);
        } else {
          onError(errorMessages.SAVE_FAILED);
        }
      }
    }, 300); // Debounce saves

    return () => clearTimeout(saveTasksWithDelay);
  }, [tasks, onError]);

  // Manual save function for critical operations
  const forceSave = useCallback(() => {
    try {
      if (!storage.isAvailable()) {
        throw new TaskStorageError(errorMessages.STORAGE_UNAVAILABLE);
      }
      storage.saveTasks(tasks);
      return true;
    } catch (error) {
      console.error("Force save failed:", error);
      onError(
        error instanceof TaskStorageError
          ? error.message
          : errorMessages.SAVE_FAILED,
      );
      return false;
    }
  }, [tasks, onError]);

  // Clear all data
  const clearStorage = useCallback(() => {
    try {
      storage.clearTasks();
      onLoadTasks([]);
      return true;
    } catch (error) {
      console.error("Failed to clear storage:", error);
      onError("Failed to clear all tasks");
      return false;
    }
  }, [onLoadTasks, onError]);

  return {
    forceSave,
    clearStorage,
    isStorageAvailable: storage.isAvailable(),
  };
}
