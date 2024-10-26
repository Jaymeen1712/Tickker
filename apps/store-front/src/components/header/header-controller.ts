"use client";

import { useAppStore } from "@/store";
import { useState } from "react";

const headerMenuItems: {
  label: string;
}[] = [
  {
    label: "Watches",
  },
  {
    label: "Warranty & Service",
  },
  {
    label: "Stores",
  },
];

const useHeaderController = () => {
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);

  const { profile } = useAppStore();

  return {
    isUserPopoverOpen,
    setIsUserPopoverOpen,
    profile,
    headerMenuItems,
  };
};

export default useHeaderController;
