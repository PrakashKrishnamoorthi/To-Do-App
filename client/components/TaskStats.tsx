import React from "react";
import {
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { TaskStats as TaskStatsType } from "@shared/tasks";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface TaskStatsProps {
  stats: TaskStatsType;
  className?: string;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats, className }) => {
  const completionRate =
    stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  const statItems = [
    {
      label: "Total Tasks",
      value: stats.total,
      icon: <Target className="h-4 w-4" />,
      color: "text-primary",
    },
    {
      label: "Active",
      value: stats.active,
      icon: <Clock className="h-4 w-4" />,
      color: "text-info",
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: <CheckCircle2 className="h-4 w-4" />,
      color: "text-success",
    },
    {
      label: "Overdue",
      value: stats.overdue,
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "text-destructive",
    },
  ];

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Completion Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Progress</span>
              </div>
              <span className="text-sm text-muted-foreground">
                {completionRate}%
              </span>
            </div>
            <Progress value={completionRate} className="h-2" />
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {statItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 p-2 rounded-md bg-muted/30"
              >
                <div className={cn("flex-shrink-0", item.color)}>
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-lg font-semibold">{item.value}</div>
                  <div className="text-xs text-muted-foreground truncate">
                    {item.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Insights */}
          {stats.total > 0 && (
            <div className="pt-2 border-t text-xs text-muted-foreground">
              {stats.overdue > 0 ? (
                <span className="text-destructive">
                  ⚠️ {stats.overdue} task{stats.overdue > 1 ? "s" : ""} overdue
                </span>
              ) : stats.active === 0 ? (
                <span className="text-success">
                  🎉 All tasks completed! Great work!
                </span>
              ) : (
                <span>
                  📝 {stats.active} active task{stats.active > 1 ? "s" : ""}{" "}
                  remaining
                </span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
