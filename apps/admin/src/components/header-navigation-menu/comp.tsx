"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const HeaderNavigationMenu = () => {
  const pathname = usePathname();

  const currSelectedItem = useMemo(() => pathname.split("/")[1], [pathname]);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem value="overview">
          <Link
            className={cn(
              navigationMenuTriggerStyle(),
              currSelectedItem === "overview" &&
                "bg-accent text-accent-foreground",
            )}
            href="/overview"
          >
            Overview
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            className={cn(
              navigationMenuTriggerStyle(),
              currSelectedItem === "customers" &&
                "bg-accent text-accent-foreground",
            )}
            href="/customers"
          >
            Customers
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            className={cn(
              navigationMenuTriggerStyle(),
              currSelectedItem === "products" &&
                "bg-accent text-accent-foreground",
            )}
            href="/products"
          >
            Products
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            className={cn(
              navigationMenuTriggerStyle(),
              currSelectedItem === "orders" &&
                "bg-accent text-accent-foreground",
            )}
            href="/orders"
          >
            Orders
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default HeaderNavigationMenu;
