export function AnimatedBackground({ variant = "gradient" }) {
  if (variant === "gradient") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="bg-primary/10 absolute -top-40 -right-40 h-80 w-80 animate-pulse rounded-full blur-3xl" />
        <div
          className="bg-primary/10 absolute -bottom-40 -left-40 h-80 w-80 animate-pulse rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="bg-primary/5 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="bg-background absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] [background-size:16px_16px]" />
      </div>
    );
  }

  if (variant === "grid") {
    return (
      <div className="fixed inset-0 -z-10 h-full w-full">
        <div className="bg-background absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:14px_24px]" />
      </div>
    );
  }

  if (variant === "particles") {
    return (
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="bg-primary/20 absolute h-2 w-2 animate-ping rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return null;
}
