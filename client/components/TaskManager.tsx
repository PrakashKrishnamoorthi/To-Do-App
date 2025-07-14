import React, { useRef, useEffect } from "react";
import { CheckSquare, Settings, Plus } from "lucide-react";
import { useTaskReducer } from "@/hooks/useTaskReducer";
import { useTaskPersistence } from "@/hooks/useTaskPersistence";
import { TaskCard } from "@/components/TaskCard";
import { AddTaskForm } from "@/components/AddTaskForm";
import { FilterBar } from "@/components/FilterBar";
import { EmptyState } from "@/components/EmptyState";
import { TaskStats } from "@/components/TaskStats";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskManagerProps {
  className?: string;
}

export const TaskManager: React.FC<TaskManagerProps> = ({ className }) => {
  const { state, filteredTasks, taskStats, actions } = useTaskReducer();
  const addTaskFormRef = useRef<HTMLDivElement>(null);
  const [isAddTaskExpanded, setIsAddTaskExpanded] = React.useState(false);

  // Setup localStorage persistence
  useTaskPersistence({
    tasks: state.tasks,
    onLoadTasks: actions.loadTasks,
    onError: actions.setError,
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + K to focus add task
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        handleAddTaskClick();
      }
      // Ctrl/Cmd + 1,2,3 for filter shortcuts
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key >= "1" &&
        event.key <= "3"
      ) {
        event.preventDefault();
        const filters: ("all" | "active" | "completed")[] = [
          "all",
          "active",
          "completed",
        ];
        actions.setFilter(filters[parseInt(event.key) - 1]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [actions.setFilter]);

  const handleAddTaskClick = () => {
    setIsAddTaskExpanded(true);
    setTimeout(() => {
      addTaskFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleClearCompleted = () => {
    actions.clearCompleted();
  };

  const handleClearAll = () => {
    if (
      window.confirm(
        "Are you sure you want to delete all tasks? This action cannot be undone.",
      )
    ) {
      actions.loadTasks([]);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-background animate-in fade-in duration-500",
        className,
      )}
    >
      {/* Header */}
      <header className="border-b bg-card shadow-material-2">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <CheckSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">TaskFlow</h1>
                <p className="text-sm text-muted-foreground">
                  Stay organized, stay productive
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Stats Overview */}
          {state.tasks.length > 0 && (
            <TaskStats stats={taskStats} className="mb-6" />
          )}

          {/* Add Task Form */}
          <div ref={addTaskFormRef}>
            <AddTaskForm
              onAddTask={actions.addTask}
              isExpanded={isAddTaskExpanded}
              onExpandedChange={setIsAddTaskExpanded}
            />
          </div>

          {/* Error Display */}
          {state.error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4">
              <div className="flex items-center gap-2 text-destructive">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">{state.error}</span>
              </div>
            </div>
          )}

          {/* Filter Bar */}
          {state.tasks.length > 0 && (
            <FilterBar
              currentFilter={state.filter}
              onFilterChange={actions.setFilter}
              stats={taskStats}
              onClearCompleted={
                taskStats.completed > 0 ? handleClearCompleted : undefined
              }
              onClearAll={taskStats.total > 0 ? handleClearAll : undefined}
            />
          )}

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggle={actions.toggleTask}
                  onDelete={actions.deleteTask}
                />
              ))
            ) : (
              <EmptyState
                filter={state.filter}
                onAddTask={handleAddTaskClick}
                onResetFilter={() => actions.setFilter("all")}
              />
            )}
          </div>

          {/* Footer */}
          {state.tasks.length > 0 && (
            <footer className="text-center py-8">
              <div className="text-sm text-muted-foreground">
                <p>
                  {taskStats.total} task{taskStats.total !== 1 ? "s" : ""} total
                  • {taskStats.completed} completed • {taskStats.active} active
                </p>
                <p className="mt-1">
                  Data is automatically saved to your browser's local storage
                </p>
              </div>
            </footer>
          )}
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-material-6 hover:shadow-material-8 transition-material"
          onClick={handleAddTaskClick}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
