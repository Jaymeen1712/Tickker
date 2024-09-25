import { Profile } from "@prisma/client";
import { StateCreator } from "zustand";

export interface UtilsSlice {
  profile: Profile | undefined;
  setProfile: (data: Profile | undefined) => void;
  isLoading: boolean;
  setIsLoading: (data: boolean) => void;
}

export const createUtilsSlice: StateCreator<UtilsSlice> = (set, get) => ({
  profile: undefined,
  setProfile: (profile) => set({ profile }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
});
