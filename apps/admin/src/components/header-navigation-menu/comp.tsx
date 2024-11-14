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
  matchURL?: string[];
}[] = [
  {
    key: "overview",
  },
  {
    key: "customers",
  },
  {
    key: "products",
    matchURL: ["products", "add-update-product"],
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
        {menuItems.map(({ key, label, matchURL }) => {
          const isMatchedURL = matchURL
            ? matchURL.includes(currSelectedItem)
            : currSelectedItem === key;
          return (
            <NavigationMenuItem value="overview" className={`w-full`} key={key}>
              <Link
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex w-full justify-start rounded-r-full border-l-4 border-l-transparent pl-8 opacity-50 transition-all hover:bg-blue-primary hover:text-white hover:opacity-100",
                  isMatchedURL &&
                    "border-l-4 border-blue-primary bg-inherit opacity-100",
                )}
                href={`/${key}`}
              >
                {label ?? capitalizeWords(key)}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderNavigationMenu;
