import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function AnimatedCard({
  children,
  className = "",
  delay = 0,
  animation = "fade-in-up",
  hover = true,
  ...props
}) {
  const animations = {
    "fade-in": "animate-in fade-in duration-500",
    "fade-in-up": "animate-in fade-in slide-in-from-bottom duration-500",
    "fade-in-down": "animate-in fade-in slide-in-from-top duration-500",
    "fade-in-left": "animate-in fade-in slide-in-from-left duration-500",
    "fade-in-right": "animate-in fade-in slide-in-from-right duration-500",
    "zoom-in": "animate-in zoom-in duration-500",
    "zoom-in-fade": "animate-in fade-in zoom-in duration-700",
  };

  return (
    <Card
      className={cn(
        "glass border-0 shadow-lg transition-all",
        animations[animation],
        hover && "hover-lift",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Card>
  );
}

export function GlowCard({
  children,
  className = "",
  glowColor = "primary",
  ...props
}) {
  const glowColors = {
    primary: "hover:shadow-primary/20",
    blue: "hover:shadow-blue-500/20",
    purple: "hover:shadow-purple-500/20",
    green: "hover:shadow-green-500/20",
    red: "hover:shadow-red-500/20",
  };

  return (
    <Card
      className={cn(
        "glass border-0 shadow-lg transition-all duration-300",
        "hover:shadow-2xl",
        glowColors[glowColor],
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}
