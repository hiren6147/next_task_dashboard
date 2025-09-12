"use client";

import { ThemeProvider } from "@/lib/theme-provider";

export default function Providers({ children }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="next-task-dashboard-theme">
      {children}
    </ThemeProvider>
  );
}
