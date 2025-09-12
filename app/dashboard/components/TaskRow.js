"use client";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  Trash2,
  Calendar,
  Tag,
  AlertCircle,
  MoreVertical,
  Edit,
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
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statuses, getStatusColor, formatDateDMY } from "@/lib/helpers";

export default function TaskRow({ task, onUpdate, onDelete }) {
  const [status, setStatus] = useState(task.status || "Todo");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => setStatus(task.status || "Todo"), [task.status]);

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done";

  const getStatusIcon = () => {
    switch (task.status) {
      case "Done":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "In Progress":
        return <Clock className="h-5 w-5 animate-pulse text-yellow-500" />;
      case "Todo":
      default:
        return <Circle className="text-muted-foreground h-5 w-5" />;
    }
  };

  const getStatusBadgeStyle = () => {
    switch (task.status) {
      case "Done":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "In Progress":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Todo":
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
    }
  };

  return (
    <TooltipProvider>
      <Card
        className={`group bg-card border shadow-sm transition-all duration-200 hover:shadow-md ${
          task.status === "Done" ? "opacity-75" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between space-x-4">
            {/* Left Section - Status Icon and Title */}
            <div className="flex min-w-0 flex-1 items-center space-x-3">
              <button
                onClick={() => {
                  const newStatus = task.status === "Done" ? "Todo" : "Done";
                  setStatus(newStatus);
                  onUpdate({ status: newStatus });
                }}
                className="flex-shrink-0 transition-transform duration-200 hover:scale-110"
              >
                {getStatusIcon()}
              </button>

              <div className="min-w-0 flex-1">
                <h3
                  className={`truncate text-sm font-medium transition-all duration-200 ${
                    task.status === "Done"
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }`}
                >
                  {task.title}
                </h3>

                {/* Mobile view - show badges below title */}
                <div className="mt-1 flex items-center space-x-2 md:hidden">
                  <Badge
                    variant="outline"
                    className={`text-xs ${getStatusBadgeStyle()}`}
                  >
                    {task.status}
                  </Badge>
                  {task.dueDate && (
                    <Badge
                      variant={isOverdue ? "destructive" : "outline"}
                      className="text-xs"
                    >
                      <Calendar className="mr-1 h-3 w-3" />
                      {formatDateDMY(task.dueDate)}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Badges and Actions */}
            <div className="flex flex-shrink-0 items-center space-x-2">
              {/* Desktop view - show badges */}
              <div className="hidden items-center space-x-2 md:flex">
                <Badge
                  variant="outline"
                  className={`text-xs transition-all duration-200 ${getStatusBadgeStyle()}`}
                >
                  <Tag className="mr-1 h-3 w-3" />
                  {task.status}
                </Badge>

                {task.dueDate && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Badge
                        variant={isOverdue ? "destructive" : "outline"}
                        className={`text-xs transition-all duration-200 ${
                          isOverdue
                            ? "border-red-500/20 bg-red-500/10 text-red-600"
                            : "bg-muted/50"
                        }`}
                      >
                        {isOverdue && <AlertCircle className="mr-1 h-3 w-3" />}
                        <Calendar className="mr-1 h-3 w-3" />
                        {formatDateDMY(task.dueDate)}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      {isOverdue ? "Overdue" : "Due date"}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>

              {/* Status Selector */}
              <Select
                value={status}
                onValueChange={async (value) => {
                  setStatus(value);
                  await onUpdate({ status: value });
                }}
              >
                <SelectTrigger className="bg-background/50 border-muted hidden h-8 w-28 text-xs md:flex">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((s) => (
                    <SelectItem key={s} value={s} className="text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs">
                          {s === "Done"
                            ? "✅"
                            : s === "In Progress"
                              ? "🔄"
                              : "📝"}
                        </span>
                        <span>{s}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Actions Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`h-8 w-8 p-0 transition-opacity ${
                      isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
                    }`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass">
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="text-destructive focus:bg-destructive/10 hover-lift cursor-pointer"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
}
