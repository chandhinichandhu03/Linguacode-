// ==============================================
// Theme Provider Wrapper
// ==============================================
// Wraps next-themes ThemeProvider and suppresses the
// React 19 "Encountered a script tag" console error
// that next-themes triggers during hydration.

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Suppress the specific script tag warning from next-themes in dev mode
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      args[0].includes("Encountered a script tag")
    ) {
      return; // Suppress only this specific warning
    }
    originalConsoleError.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
