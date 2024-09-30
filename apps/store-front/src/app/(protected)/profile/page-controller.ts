"use client";

import { useAppStore } from "@/store";

const useProfilePageController = () => {
  const { profile } = useAppStore();

  return { profile };
};

export default useProfilePageController;
