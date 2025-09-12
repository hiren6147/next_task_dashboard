import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

const toastIcons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: "bg-green-500/10 text-green-600 border-green-500/20",
  error: "bg-red-500/10 text-red-600 border-red-500/20",
  warning: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  info: "bg-blue-500/10 text-blue-600 border-blue-500/20",
};

export function Toast({
  type = "info",
  title,
  description,
  onClose,
  className = "",
}) {
  const Icon = toastIcons[type];

  return (
    <div
      className={cn(
        "glass flex items-start space-x-3 rounded-lg border p-4 shadow-lg",
        "animate-in slide-in-from-right fade-in duration-300",
        toastStyles[type],
        className,
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
      <div className="flex-1 space-y-1">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {description && <p className="text-sm opacity-90">{description}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="hover:bg-background/50 flex-shrink-0 rounded-md p-1 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function ToastContainer({ toasts = [] }) {
  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-sm space-y-2">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id || index}
          {...toast}
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
}
