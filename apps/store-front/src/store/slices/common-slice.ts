import { WatchSpecificProductFieldsType } from "@/types";
import { StateCreator } from "zustand";

export interface CommonSlice {
  productAdvanceFilters: WatchSpecificProductFieldsType | undefined;
  setProductAdvanceFilters: (
    data: WatchSpecificProductFieldsType | undefined,
  ) => void;
  resetProductAdvanceFilters: () => void;
}

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
