import {
  createAppStore,
  createCommonSlice,
  createUtilsSlice,
  type CommonSlice,
  type UtilsSlice,
} from "@repo/shared-store";

type StoreState = UtilsSlice & CommonSlice;

export const useAppStore = createAppStore<StoreState>(
  (...a) => ({
    ...createUtilsSlice(...a),
    ...createCommonSlice(...a),
  }),
  {
    name: "Tickker-Storefront-Storage",
    partialize: (state) => ({
      // Only persist specific parts of the state
      profile: state.profile,
    }),
  },
);
