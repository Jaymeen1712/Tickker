"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
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

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    const headerItem = pathname.split("/")[1];
    setCurrentActiveHeaderItem(headerItem);
  }, [pathname]);

  return {
    headerMenuItems,
    currentActiveHeaderItem,
    session,
    router,
  };
};

export default useHeaderController;
