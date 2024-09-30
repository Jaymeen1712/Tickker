import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CommonSlice,
  createCommonSlice,
  createUtilsSlice,
  UtilsSlice,
} from "./slices";

type StoreState = UtilsSlice & CommonSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createUtilsSlice(...a),
      ...createCommonSlice(...a),
    }),
    {
      name: "App-storage",
      partialize: (state) => ({}),
    },
  ),
);
