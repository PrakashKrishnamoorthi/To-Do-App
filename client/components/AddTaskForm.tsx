import React, { useState, useEffect } from "react";
import { Plus, Calendar, Flag, Activity } from "lucide-react";
import { Task, TaskPriority, TaskStatus } from "@shared/tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, "id" | "createdAt">) => void;
  className?: string;
  isExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({
  onAddTask,
  className,
  isExpanded: controlledExpanded,
  onExpandedChange,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [status, setStatus] = useState<TaskStatus>("not_started");
  const [dueDate, setDueDate] = useState("");

  const isExpanded =
    controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const setIsExpanded = (expanded: boolean) => {
    if (onExpandedChange) {
      onExpandedChange(expanded);
    } else {
      setInternalExpanded(expanded);
    }
  };

  useEffect(() => {
    if (controlledExpanded) {
      setInternalExpanded(controlledExpanded);
    }
  }, [controlledExpanded]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      completed: status === "completed",
      status,
      priority,
      dueDate: dueDate || undefined,
    });

    // Reset form
    setTitle("");
    setPriority("medium");
    setStatus("not_started");
    setDueDate("");
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setTitle("");
    setPriority("medium");
    setDueDate("");
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Card
        className={cn(
          "border-dashed border-2 hover:border-primary/50 transition-material cursor-pointer hover:shadow-material-1",
          className,
        )}
        onClick={() => setIsExpanded(true)}
      >
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-material">
            <Plus className="h-5 w-5" />
            <span className="text-sm font-medium">Add a new task</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("border-primary/50 shadow-material-2", className)}>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="text-base"
              autoFocus
            />
          </div>

          {/* Options Row */}
          <div className="flex gap-3">
            {/* Priority Select */}
            <div className="flex-1">
              <Select
                value={priority}
                onValueChange={(value) => setPriority(value as TaskPriority)}
              >
                <SelectTrigger className="h-9">
                  <div className="flex items-center gap-2">
                    <Flag className="h-3 w-3" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <Flag className="h-3 w-3 text-blue-500" />
                      <span>Low Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="medium">
                    <div className="flex items-center gap-2">
                      <Flag className="h-3 w-3 text-warning" />
                      <span>Medium Priority</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <Flag className="h-3 w-3 text-destructive" />
                      <span>High Priority</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Due Date Input */}
            <div className="flex-1">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="pl-9 h-9"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={!title.trim()}>
              <Plus className="h-3 w-3 mr-1" />
              Add Task
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
