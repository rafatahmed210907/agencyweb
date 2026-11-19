"use client";

import { useCallback, useSyncExternalStore } from "react";

function subscribe(query: string, onChange: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribeToQuery = useCallback(
    (onChange: () => void) => subscribe(query, onChange),
    [query],
  );

  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return serverFallback;
    return window.matchMedia(query).matches;
  }, [query, serverFallback]);

  return useSyncExternalStore(subscribeToQuery, getSnapshot, () => serverFallback);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function useIsTouch(): boolean {
  return useMediaQuery("(pointer: coarse)", true);
}

export function useRichMotion(): boolean {
  const reduced = usePrefersReducedMotion();
  const touch = useIsTouch();
  return !reduced && !touch;
}

export function useIsDesktop(breakpoint = 1024): boolean {
  return useMediaQuery(`(min-width: ${breakpoint}px)`);
}
