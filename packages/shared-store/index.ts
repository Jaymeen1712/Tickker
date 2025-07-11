export * from "./types";
export * from "./slices/utils-slice";
export * from "./slices/common-slice";

// Store factory function
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StoreConfig } from "./types";

export function createAppStore<T>(
  storeCreator: (...args: any[]) => T,
  config: StoreConfig
) {
  return create<T>()(
    persist(storeCreator, {
      name: config.name,
      partialize: config.partialize || (() => ({})),
      version: config.version || 1,
    })
  );
}
