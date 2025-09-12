// Animation variants for framer-motion style animations
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scaleIn: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
  scaleUp: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  rotateIn: {
    initial: { rotate: -180, opacity: 0 },
    animate: { rotate: 0, opacity: 1 },
    exit: { rotate: 180, opacity: 0 },
  },
  slideInFromTop: {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  slideInFromBottom: {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  slideInFromLeft: {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  slideInFromRight: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

// Stagger children animations
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Page transition animations
export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 },
};

export const hoverGlow = {
  boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
  transition: { duration: 0.2 },
};

// Tap animations
export const tapScale = {
  scale: 0.95,
  transition: { duration: 0.1 },
};

// Animation utilities
export const getStaggerDelay = (index, baseDelay = 0.1) => index * baseDelay;

export const getRandomDelay = (min = 0, max = 1) =>
  Math.random() * (max - min) + min;

// CSS animation classes
export const animationClasses = {
  // Entrance animations
  fadeIn: "animate-in fade-in duration-500",
  fadeInUp: "animate-in fade-in slide-in-from-bottom duration-500",
  fadeInDown: "animate-in fade-in slide-in-from-top duration-500",
  fadeInLeft: "animate-in fade-in slide-in-from-left duration-500",
  fadeInRight: "animate-in fade-in slide-in-from-right duration-500",
  zoomIn: "animate-in zoom-in duration-500",

  // Exit animations
  fadeOut: "animate-out fade-out duration-300",
  fadeOutUp: "animate-out fade-out slide-out-to-top duration-300",
  fadeOutDown: "animate-out fade-out slide-out-to-bottom duration-300",
  fadeOutLeft: "animate-out fade-out slide-out-to-left duration-300",
  fadeOutRight: "animate-out fade-out slide-out-to-right duration-300",
  zoomOut: "animate-out zoom-out duration-300",

  // Continuous animations
  pulse: "animate-pulse",
  spin: "animate-spin",
  ping: "animate-ping",
  bounce: "animate-bounce",

  // Hover effects
  hoverLift: "hover-lift",
  hoverGlow: "hover:shadow-lg hover:shadow-primary/20",
  hoverScale: "hover:scale-105 transition-transform duration-200",

  // Focus effects
  focusRing: "focus-ring",

  // Glass effect
  glass: "glass",

  // Gradient text
  gradientText: "gradient-text",
};

// Animation duration utilities
export const durations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 700,
  slowest: 1000,
};

// Easing functions
export const easings = {
  linear: "linear",
  easeIn: "ease-in",
  easeOut: "ease-out",
  easeInOut: "ease-in-out",
  easeInQuad: "cubic-bezier(0.55, 0.085, 0.68, 0.53)",
  easeOutQuad: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  easeInOutQuad: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
  easeInCubic: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
  easeOutCubic: "cubic-bezier(0.215, 0.61, 0.355, 1)",
  easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  easeInQuart: "cubic-bezier(0.895, 0.03, 0.685, 0.22)",
  easeOutQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
  easeInOutQuart: "cubic-bezier(0.77, 0, 0.175, 1)",
  easeInQuint: "cubic-bezier(0.755, 0.05, 0.855, 0.06)",
  easeOutQuint: "cubic-bezier(0.23, 1, 0.32, 1)",
  easeInOutQuint: "cubic-bezier(0.86, 0, 0.07, 1)",
  easeInExpo: "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
  easeOutExpo: "cubic-bezier(0.19, 1, 0.22, 1)",
  easeInOutExpo: "cubic-bezier(1, 0, 0, 1)",
  easeInBack: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  easeOutBack: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  easeInOutBack: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
};
