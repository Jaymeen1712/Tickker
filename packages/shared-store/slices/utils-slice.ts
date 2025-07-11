import { StateCreator } from "zustand";
import { BaseUtilsSlice } from "../types";

export const createUtilsSlice: StateCreator<BaseUtilsSlice> = (set) => ({
  profile: undefined,
  setProfile: (profile) => set({ profile }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
});

export type { BaseUtilsSlice as UtilsSlice };
