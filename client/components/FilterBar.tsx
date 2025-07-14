import React from "react";
import {
  BarChart3,
  CheckCircle2,
  Circle,
  Filter,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { TaskFilter, TaskStats } from "@shared/tasks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  currentFilter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  stats: TaskStats;
  onClearCompleted?: () => void;
  onClearAll?: () => void;
}

const filterConfig: Record<
  TaskFilter,
  { icon: React.ReactNode; label: string }
> = {
  all: {
    icon: <BarChart3 className="h-4 w-4" />,
    label: "All Tasks",
  },
  active: {
    icon: <Circle className="h-4 w-4" />,
    label: "Active",
  },
  completed: {
    icon: <CheckCircle2 className="h-4 w-4" />,
    label: "Completed",
  },
};

export const FilterBar: React.FC<FilterBarProps> = ({
  currentFilter,
  onFilterChange,
  stats,
  onClearCompleted,
  onClearAll,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-muted/30 rounded-lg border">
      {/* Filter Buttons */}
      <div className="flex items-center gap-1">
        {Object.entries(filterConfig).map(([filter, config]) => {
          const isActive = currentFilter === filter;
          const count =
            filter === "all"
              ? stats.total
              : filter === "active"
                ? stats.active
                : stats.completed;

          return (
            <Button
              key={filter}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onFilterChange(filter as TaskFilter)}
              className={cn("flex items-center gap-2", isActive && "shadow-sm")}
            >
              {config.icon}
              <span>{config.label}</span>
              {count > 0 && (
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className="ml-1 h-5 px-1.5 text-xs"
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Stats and Actions */}
      <div className="flex items-center gap-3">
        {/* Overdue Badge */}
        {stats.overdue > 0 && (
          <Badge variant="destructive" className="flex items-center gap-1">
            <Circle className="h-3 w-3" />
            {stats.overdue} overdue
          </Badge>
        )}

        {/* Quick Stats */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
          <span>{stats.active} active</span>
          <span>{stats.completed} completed</span>
        </div>

        {/* Actions Menu */}
        {(onClearCompleted || onClearAll) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {onClearCompleted && stats.completed > 0 && (
                <DropdownMenuItem onClick={onClearCompleted}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Clear Completed ({stats.completed})
                </DropdownMenuItem>
              )}
              {onClearAll && stats.total > 0 && (
                <>
                  {onClearCompleted && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    onClick={onClearAll}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Tasks ({stats.total})
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};
