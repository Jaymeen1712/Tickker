import {
  createAppStore,
  createUtilsSlice,
  type UtilsSlice,
} from "@repo/shared-store";

type StoreState = UtilsSlice;

export const useAppStore = createAppStore<StoreState>(
  (...a) => ({
    ...createUtilsSlice(...a),
  }),
  {
    name: "Tickker-Admin-Storage",
    partialize: (state) => ({
      // Only persist specific parts of the state
      profile: state.profile,
    }),
  },
);
