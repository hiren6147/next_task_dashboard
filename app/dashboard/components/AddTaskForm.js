"use client";
import { useState } from "react";
import { Plus, Tag } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DatePicker } from "@/components/ui/date-picker";
import { statuses } from "@/lib/helpers";

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Todo");
  const [dueDate, setDueDate] = useState(undefined);
  const [titleError, setTitleError] = useState("");

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
  };

  return (
    <Card className="mb-4 border-0 bg-white/60 shadow-md backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-lg font-semibold">
          <Plus className="h-5 w-5 text-blue-600" />
          <span>Add New Task</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            <div className="md:col-span-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Task Title
              </Label>
              <Input
                id="title"
                placeholder="Enter task title..."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (titleError) setTitleError("");
                }}
                className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                required
              />
              {titleError && (
                <Alert variant="destructive" className="animate-slide-up mt-2">
                  <AlertDescription className="text-xs">
                    {titleError}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status
              </Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="mt-1 transition-all duration-200 focus:ring-2 focus:ring-blue-500/20">
                  <div className="flex items-center space-x-2">
                    <Tag className="text-muted-foreground h-4 w-4" />
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </Label>
              <div className="mt-1">
                <DatePicker
                  date={dueDate}
                  onSelect={setDueDate}
                  placeholder="Select due date"
                  className="border-input border transition-all duration-200 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:from-blue-700 hover:to-purple-700 hover:shadow-lg"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
