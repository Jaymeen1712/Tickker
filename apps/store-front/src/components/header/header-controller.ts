"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const headerMenuItems: {
  label: string;
  redirectURL?: string;
}[] = [
  {
    label: "Watches",
  },
  {
    label: "Warranty & Service",
    redirectURL: "warranty-and-service",
  },
  {
    label: "Stores",
  },
];

const useHeaderController = () => {
  const pathname = usePathname();

  const [currentActiveHeaderItem, setCurrentActiveHeaderItem] = useState("");

  useEffect(() => {
    const headerItem = pathname.split("/")[1];
    setCurrentActiveHeaderItem(headerItem);
  }, [pathname]);

  return {
    headerMenuItems,
    currentActiveHeaderItem,
  };
};

export default useHeaderController;
