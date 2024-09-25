"use client";

import { useEffect, useState } from "react";

const useHeaderController = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isUserPopoverOpen, setIsUserPopoverOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    scrollY,
    isUserPopoverOpen,
    setIsUserPopoverOpen,
  };
};

export default useHeaderController;
