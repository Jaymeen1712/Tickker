"use client";

import { useAppStore } from "@/store";
import { useState } from "react";

const useHeaderController = () => {
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);

  const { profile } = useAppStore();

  return {
    isUserPopoverOpen,
    setIsUserPopoverOpen,
    profile,
  };
};

export default useHeaderController;
