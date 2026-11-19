"use client";

import { createContext, useContext, type ReactNode } from "react";

type GsapContextValue = { ready: boolean };

const GsapContext = createContext<GsapContextValue>({ ready: false });

/**
 * Marks the point where client-only animation libraries are available.
 * Components that need ScrollTrigger read `ready` so they never run during SSR.
 */
export function GsapProvider({ children }: { children: ReactNode }) {
  return <GsapContext.Provider value={{ ready: true }}>{children}</GsapContext.Provider>;
}

export function useGsapReady() {
  return useContext(GsapContext).ready;
}
