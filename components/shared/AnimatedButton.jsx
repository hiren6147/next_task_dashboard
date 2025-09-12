import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";

export function AnimatedButton({
  children,
  className = "",
  variant = "default",
  showArrow = false,
  showSparkle = false,
  loading = false,
  loadingText = "Loading...",
  ...props
}) {
  return (
    <Button
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover-lift",
        className,
      )}
      variant={variant}
      disabled={loading}
      {...props}
    >
      {/* Animated background gradient */}
      <span className="from-primary/0 via-primary/10 to-primary/0 absolute inset-0 translate-x-[-100%] bg-gradient-to-r transition-transform duration-1000 group-hover:translate-x-[100%]" />

      {/* Button content */}
      <span className="relative flex items-center justify-center">
        {loading ? (
          <>
            <div className="border-primary-foreground mr-2 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            <span>{loadingText}</span>
          </>
        ) : (
          <>
            {showSparkle && (
              <Sparkles className="mr-2 h-4 w-4 opacity-70 transition-opacity group-hover:opacity-100" />
            )}
            {children}
            {showArrow && (
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </>
        )}
      </span>
    </Button>
  );
}

export function RippleButton({ children, className = "", ...props }) {
  const handleClick = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <Button
      className={cn("relative overflow-hidden", className)}
      onClick={handleClick}
      {...props}
    >
      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: scale(0);
          animation: ripple-animation 0.6s ease-out;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
      {children}
    </Button>
  );
}

export function GlowButton({
  children,
  className = "",
  glowColor = "primary",
  ...props
}) {
  const glowColors = {
    primary: "shadow-primary/50 hover:shadow-primary/70",
    blue: "shadow-blue-500/50 hover:shadow-blue-500/70",
    purple: "shadow-purple-500/50 hover:shadow-purple-500/70",
    green: "shadow-green-500/50 hover:shadow-green-500/70",
    red: "shadow-red-500/50 hover:shadow-red-500/70",
  };

  return (
    <Button
      className={cn(
        "relative transition-all duration-300",
        "hover:-translate-y-0.5 hover:shadow-lg",
        glowColors[glowColor],
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
