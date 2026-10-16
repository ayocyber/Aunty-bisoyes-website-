"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store compatible with useSyncExternalStore.
 * Values are cached in memory so snapshots stay referentially stable,
 * and changes sync across components and browser tabs.
 */
export function createPersistentStore<T>(key: string, initial: () => T) {
  let cache: T | undefined;
  const listeners = new Set<() => void>();

  const read = (): T => {
    if (cache !== undefined) return cache;
    try {
      const raw = window.localStorage.getItem(key);
      cache = raw ? (JSON.parse(raw) as T) : initial();
      if (!raw) window.localStorage.setItem(key, JSON.stringify(cache));
    } catch {
      cache = initial();
    }
    return cache;
  };

  const set = (next: T | ((prev: T) => T)) => {
    const value = typeof next === "function" ? (next as (p: T) => T)(read()) : next;
    cache = value;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable — keep in memory */
    }
    listeners.forEach((l) => l());
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) {
        cache = undefined;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };

  function useStore(): T | null {
    return useSyncExternalStore(subscribe, read, () => null);
  }

  return { useStore, set, get: read };
}

/** True only after hydration — avoids server/client mismatches for client-only UI. */
export function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
