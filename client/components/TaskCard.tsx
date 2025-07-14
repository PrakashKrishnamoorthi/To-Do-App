import React from "react";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  MoreVertical,
  Trash2,
  AlertTriangle,
  Flag,
  Play,
  Pause,
} from "lucide-react";
import { Task, TaskPriority, TaskStatus } from "@shared/tasks";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (task: Task) => void;
}

const priorityConfig: Record<
  TaskPriority,
  { color: string; icon: React.ReactNode; label: string }
> = {
  low: {
    color: "text-blue-500",
    icon: <Flag className="h-3 w-3" />,
    label: "Low",
  },
  medium: {
    color: "text-warning",
    icon: <Flag className="h-3 w-3" />,
    label: "Medium",
  },
  high: {
    color: "text-destructive",
    icon: <Flag className="h-3 w-3" />,
    label: "High",
  },
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const isOverdue =
    task.dueDate && !task.completed && isPast(new Date(task.dueDate));
  const isDueToday = task.dueDate && isToday(new Date(task.dueDate));
  const isDueTomorrow = task.dueDate && isTomorrow(new Date(task.dueDate));

  const getDueDateDisplay = () => {
    if (!task.dueDate) return null;

    const date = new Date(task.dueDate);
    let dateText = "";
    let colorClass = "text-muted-foreground";

    if (isOverdue) {
      dateText = `Overdue • ${format(date, "MMM d")}`;
      colorClass = "text-destructive";
    } else if (isDueToday) {
      dateText = "Due Today";
      colorClass = "text-warning";
    } else if (isDueTomorrow) {
      dateText = "Due Tomorrow";
      colorClass = "text-info";
    } else {
      dateText = format(date, "MMM d, yyyy");
    }

    return (
      <div className={cn("flex items-center gap-1 text-xs", colorClass)}>
        {isOverdue && <AlertTriangle className="h-3 w-3" />}
        <Calendar className="h-3 w-3" />
        <span>{dateText}</span>
      </div>
    );
  };

  const priorityInfo = priorityConfig[task.priority];

  return (
    <div
      className={cn(
        "group relative rounded-lg border bg-card p-4 shadow-material-1 transition-material hover:shadow-material-2",
        task.completed && "opacity-60",
        isOverdue &&
          !task.completed &&
          "border-destructive/50 bg-destructive/5 shadow-material-2",
      )}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div className="mt-0.5">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => onToggle(task.id)}
            className={cn(
              "h-5 w-5",
              task.completed &&
                "data-[state=checked]:bg-success data-[state=checked]:border-success",
            )}
          />
        </div>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3
              className={cn(
                "text-sm font-medium leading-snug",
                task.completed && "line-through text-muted-foreground",
              )}
            >
              {task.title}
            </h3>

            {/* Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {onEdit && (
                  <>
                    <DropdownMenuItem onClick={() => onEdit(task)}>
                      Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem
                  onClick={() => onDelete(task.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              {/* Priority */}
              <div
                className={cn(
                  "flex items-center gap-1 text-xs",
                  priorityInfo.color,
                )}
              >
                {priorityInfo.icon}
                <span className="capitalize">{priorityInfo.label}</span>
              </div>

              {/* Due Date */}
              {getDueDateDisplay()}
            </div>

            {/* Completion Time */}
            {task.completed && task.completedAt && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3" />
                <span>{format(new Date(task.completedAt), "MMM d")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
