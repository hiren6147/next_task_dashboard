"use client";
import { useState } from "react";
import { Plus, Tag, Calendar, Sparkles, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DatePicker } from "@/components/ui/date-picker";
import { statuses } from "@/lib/helpers";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Todo");
  const [dueDate, setDueDate] = useState(undefined);
  const [titleError, setTitleError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setTitleError("");

    // Validate task title
    if (!title.trim()) {
      setTitleError("Task title is required");
      return;
    }

    await onAdd({ title, status, dueDate: dueDate || null });
    setTitle("");
    setStatus("Todo");
    setDueDate(undefined);
    setTitleError("");
    setIsExpanded(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Done":
        return "✅";
      case "In Progress":
        return "🔄";
      case "Todo":
      default:
        return "📝";
    }
  };

  return (
    <Card className="bg-card border shadow-sm transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-primary/5 hover:bg-primary/10 border-primary/20 group flex w-full items-center justify-center space-x-2 rounded-lg border border-dashed px-4 py-3 transition-all duration-200"
          >
            <Plus className="text-primary h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
            <span className="text-primary text-sm font-medium">
              Add New Task
            </span>
            <Sparkles className="text-primary h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </button>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="animate-in fade-in slide-in-from-top space-y-4 duration-300"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-foreground flex items-center text-sm font-semibold">
                <Sparkles className="text-primary mr-2 h-4 w-4" />
                New Task
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle("");
                  setStatus("Todo");
                  setDueDate(undefined);
                  setTitleError("");
                }}
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                <CircleX className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <Label htmlFor="title" className="mb-1 text-xs font-medium">
                  What needs to be done?
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Review project proposal"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (titleError) setTitleError("");
                  }}
                  className="bg-background/50 border-muted focus-ring"
                  autoFocus
                  required
                />
                {titleError && (
                  <Alert
                    variant="destructive"
                    className="animate-in slide-in-from-top mt-2 duration-200"
                  >
                    <AlertDescription className="text-xs">
                      {titleError}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="status" className="mb-1 text-xs font-medium">
                    Status
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="bg-background/50 border-muted focus-ring">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          <div className="flex items-center space-x-2">
                            <span>{getStatusIcon(s)}</span>
                            <span>{s}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dueDate" className="mb-1 text-xs font-medium">
                    Due Date
                  </Label>
                  <DatePicker
                    date={dueDate}
                    onSelect={setDueDate}
                    placeholder="Select date"
                    className="bg-background/50 border-muted focus-ring w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle("");
                  setStatus("Todo");
                  setDueDate(undefined);
                  setTitleError("");
                }}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="hover-lift">
                <Plus className="mr-1 h-3 w-3" />
                Add Task
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
