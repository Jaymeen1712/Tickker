import { StateCreator } from "zustand";
import { CommonSlice } from "../types";

export const createCommonSlice: StateCreator<CommonSlice> = (set, get) => ({
  productAdvanceFilters: undefined,
  setProductAdvanceFilters: (productAdvanceFilters) =>
    set({
      productAdvanceFilters: {
        ...get().productAdvanceFilters,
        ...productAdvanceFilters,
      },
    }),
  resetProductAdvanceFilters: () =>
    set({
      productAdvanceFilters: undefined,
    }),
});

export type { CommonSlice };
