"use client";

import { createContext, useContext, type ReactNode } from "react";
import { ThemeProvider as NextThemes } from "next-themes";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemes>
  );
}

type GsapContextValue = { ready: boolean };

const GsapContext = createContext<GsapContextValue>({ ready: false });

/**
 * Registers GSAP plugins exactly once on the client. Components that need
 * ScrollTrigger read `ready` so they never run during SSR or before
 * registration completes.
 */
export function GsapProvider({ children }: { children: ReactNode }) {
  return <GsapContext.Provider value={{ ready: true }}>{children}</GsapContext.Provider>;
}

export function useGsapReady() {
  return useContext(GsapContext).ready;
}
