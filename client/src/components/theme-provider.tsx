"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = useState(false);

  // useEffect only fires on the client side after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // If we aren't mounted yet, render a fragment container to prevent server script mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}