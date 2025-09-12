import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  actionLabel,
  className = "",
  animated = true,
}) {
  return (
    <Card
      className={cn(
        "glass border-0 py-16 text-center shadow-lg",
        animated && "animate-in fade-in zoom-in duration-500",
        className,
      )}
    >
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          {Icon && (
            <div className="relative">
              <div className="bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-3xl" />
              <Icon className="text-muted-foreground/50 animate-in zoom-in relative h-16 w-16 duration-700" />
            </div>
          )}
          {title && (
            <h3 className="animate-in fade-in slide-in-from-bottom text-xl font-semibold delay-100 duration-500">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-muted-foreground animate-in fade-in slide-in-from-bottom max-w-sm delay-200 duration-500">
              {description}
            </p>
          )}
          {action && actionLabel && (
            <Button
              onClick={action}
              className="hover-lift animate-in fade-in slide-in-from-bottom mt-4 delay-300 duration-500"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function EmptyTaskState({ onAddTask }) {
  return (
    <div className="animate-in fade-in space-y-3 py-12 text-center duration-500">
      <div className="bg-muted/50 mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full">
        <svg
          className="text-muted-foreground h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </div>
      <p className="text-muted-foreground text-sm font-medium">No tasks yet</p>
      <p className="text-muted-foreground/70 text-xs">
        Add your first task to get started
      </p>
      {onAddTask && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAddTask}
          className="hover-lift mt-2"
        >
          Add Task
        </Button>
      )}
    </div>
  );
}
