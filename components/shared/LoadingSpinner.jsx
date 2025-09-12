import { Loader2 } from "lucide-react";

export function LoadingSpinner({ size = "default", className = "" }) {
  const sizeClasses = {
    small: "h-4 w-4",
    default: "h-6 w-6",
    large: "h-8 w-8",
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`${sizeClasses[size]} text-primary animate-spin`} />
    </div>
  );
}

export function LoadingPage({ message = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-in fade-in zoom-in flex flex-col items-center space-y-4 duration-500">
        <LoadingSpinner size="large" />
        <p className="text-muted-foreground animate-pulse">{message}</p>
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-card animate-pulse rounded-lg border p-6">
      <div className="space-y-3">
        <div className="bg-muted h-4 w-3/4 rounded" />
        <div className="bg-muted h-4 w-1/2 rounded" />
        <div className="bg-muted h-4 w-5/6 rounded" />
      </div>
    </div>
  );
}
