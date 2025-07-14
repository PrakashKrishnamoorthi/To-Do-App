import { useReducer, useCallback } from "react";
import {
  Task,
  TaskAction,
  TaskState,
  TaskFilter,
  TaskStats,
} from "@shared/tasks";

const initialState: TaskState = {
  tasks: [],
  filter: "all",
  isLoading: false,
  error: null,
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "ADD_TASK": {
      const newTask: Task = {
        ...action.payload,
        id: Date.now() + Math.random(), // Simple ID generation
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask],
        error: null,
      };
    }

    case "TOGGLE_TASK": {
      const now = new Date().toISOString();
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? now : undefined,
              }
            : task,
        ),
        error: null,
      };
    }

    case "DELETE_TASK": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
        error: null,
      };
    }

    case "UPDATE_TASK": {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task,
        ),
        error: null,
      };
    }

    case "SET_FILTER": {
      return {
        ...state,
        filter: action.payload,
      };
    }

    case "LOAD_TASKS": {
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        error: null,
      };
    }

    case "SET_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case "SET_ERROR": {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    case "CLEAR_COMPLETED": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => !task.completed),
        error: null,
      };
    }

    default:
      return state;
  }
}

export function useTaskReducer() {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Action creators
  const addTask = useCallback((task: Omit<Task, "id" | "createdAt">) => {
    dispatch({ type: "ADD_TASK", payload: task });
  }, []);

  const toggleTask = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_TASK", payload: id });
  }, []);

  const deleteTask = useCallback((id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  }, []);

  const updateTask = useCallback(
    (id: number, updates: Partial<Omit<Task, "id">>) => {
      dispatch({ type: "UPDATE_TASK", payload: { id, updates } });
    },
    [],
  );

  const setFilter = useCallback((filter: TaskFilter) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  }, []);

  const loadTasks = useCallback((tasks: Task[]) => {
    dispatch({ type: "LOAD_TASKS", payload: tasks });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  const clearCompleted = useCallback(() => {
    dispatch({ type: "CLEAR_COMPLETED" });
  }, []);

  // Computed values
  const filteredTasks = state.tasks.filter((task) => {
    switch (state.filter) {
      case "active":
        return !task.completed;
      case "completed":
        return task.completed;
      default:
        return true;
    }
  });

  const taskStats: TaskStats = {
    total: state.tasks.length,
    completed: state.tasks.filter((task) => task.completed).length,
    active: state.tasks.filter((task) => !task.completed).length,
    overdue: state.tasks.filter((task) => {
      if (task.completed || !task.dueDate) return false;
      return new Date(task.dueDate) < new Date();
    }).length,
  };

  return {
    state,
    filteredTasks,
    taskStats,
    actions: {
      addTask,
      toggleTask,
      deleteTask,
      updateTask,
      setFilter,
      loadTasks,
      setLoading,
      setError,
      clearCompleted,
    },
  };
}
