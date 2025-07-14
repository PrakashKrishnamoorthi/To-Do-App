import React from "react";
import { CheckCircle2, Plus, Search, Target } from "lucide-react";
import { TaskFilter } from "@shared/tasks";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface EmptyStateProps {
  filter: TaskFilter;
  onAddTask?: () => void;
  onResetFilter?: () => void;
}

const emptyStateConfig: Record<
  TaskFilter,
  {
    icon: React.ReactNode;
    title: string;
    description: string;
    actionText?: string;
  }
> = {
  all: {
    icon: <Target className="h-12 w-12 text-muted-foreground" />,
    title: "No tasks yet",
    description:
      "Get started by creating your first task. Break down your goals into actionable items.",
    actionText: "Create your first task",
  },
  active: {
    icon: <CheckCircle2 className="h-12 w-12 text-success" />,
    title: "All caught up!",
    description:
      "You've completed all your active tasks. Great work! Time to add some new goals.",
    actionText: "Add new task",
  },
  completed: {
    icon: <Search className="h-12 w-12 text-muted-foreground" />,
    title: "No completed tasks",
    description:
      "Complete some tasks to see them here. Your finished work will be displayed in this view.",
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  filter,
  onAddTask,
  onResetFilter,
}) => {
  const config = emptyStateConfig[filter];

  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4">{config.icon}</div>
        <h3 className="text-lg font-semibold mb-2">{config.title}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          {config.description}
        </p>

        <div className="flex gap-2">
          {config.actionText && onAddTask && (
            <Button onClick={onAddTask} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {config.actionText}
            </Button>
          )}

          {filter !== "all" && onResetFilter && (
            <Button variant="outline" onClick={onResetFilter}>
              View all tasks
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
