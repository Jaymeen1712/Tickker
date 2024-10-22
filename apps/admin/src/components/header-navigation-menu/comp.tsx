"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { capitalizeWords } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const menuItems: {
  key: string;
  label?: string;
}[] = [
  {
    key: "overview",
  },
  {
    key: "customers",
  },
  {
    key: "products",
  },
  {
    key: "orders",
  },
];

export const HeaderNavigationMenu = () => {
  const pathname = usePathname();

  const currSelectedItem = useMemo(() => pathname.split("/")[1], [pathname]);

  return (
    <NavigationMenu className="main-sidebar my-4 w-full">
      <NavigationMenuList className="flex flex-col gap-y-4 space-x-0">
        {menuItems.map(({ key, label }) => (
          <NavigationMenuItem value="overview" className={`w-full`}>
            <Link
              className={cn(
                navigationMenuTriggerStyle(),
                "flex w-full justify-start rounded-r-full border-l-4 border-l-transparent pl-8 opacity-50 transition-all hover:bg-blue-700 hover:text-white hover:opacity-100",
                currSelectedItem === key &&
                  "border-l-4 border-blue-700 bg-inherit opacity-100",
              )}
              href={`/${key}`}
            >
              {label ?? capitalizeWords(key)}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderNavigationMenu;
