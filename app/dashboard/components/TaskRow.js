"use client";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  Circle,
  Clock,
  Trash2,
  Calendar,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { statuses, getStatusColor, formatDateDMY } from "@/lib/helpers";

export default function TaskRow({ task, onUpdate, onDelete }) {
  const [status, setStatus] = useState(task.status || "Todo");

  useEffect(() => setStatus(task.status || "Todo"), [task.status]);

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";
  const statusColor = getStatusColor(task.status);

  return (
    <TooltipProvider>
      <Card className="group mb-2 border-0 bg-white/70 shadow-sm backdrop-blur-sm transition-all duration-200 hover:scale-[1.01] hover:shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex min-w-0 flex-1 items-center space-x-3">
              <div className="flex-shrink-0">
                {task.status === "Done" ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                    <CheckCircle className="h-3 w-3 text-white" />
                  </div>
                ) : task.status === "In Progress" ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500">
                    <Clock className="h-3 w-3 text-white" />
                  </div>
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                    <Circle className="h-2 w-2 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  className={`truncate text-sm font-medium ${
                    task.status === "Done"
                      ? "text-muted-foreground line-through"
                      : ""
                  }`}
                >
                  {task.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center space-x-2">
              <div className="hidden items-center space-x-2 md:flex">
                <Badge
                  variant={statusColor === "default" ? "outline" : "default"}
                  className={`text-xs ${
                    statusColor === "success"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : statusColor === "warning"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : statusColor === "destructive"
                          ? "bg-red-100 text-red-800 hover:bg-red-200"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                  }`}
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {task.status}
                </Badge>

                {task.dueDate && (
                  <Badge
                    variant={isOverdue ? "destructive" : "outline"}
                    className={`text-xs ${
                      isOverdue
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  >
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDateDMY(task.dueDate)}
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Select
                  value={status}
                  onValueChange={async (value) => {
                    setStatus(value);
                    await onUpdate({ status: value });
                  }}
                >
                  <SelectTrigger className="h-8 w-32 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s} className="text-xs">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onDelete}
                      className="h-8 w-8 p-0 text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete task</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
