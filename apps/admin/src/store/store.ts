import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createUtilsSlice, UtilsSlice } from "./slices";

type StoreState = UtilsSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createUtilsSlice(...a),
    }),
    {
      name: "App-storage",
      partialize: (state) => ({}),
    },
  ),
);
