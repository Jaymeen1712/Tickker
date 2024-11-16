"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogoIcon } from "@/images";
import { capitalizeWords } from "@/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useMemo } from "react";
import CustomNavigationMenu from "../header-navigation-menu/comp";
import useHeaderController from "./header-controller";

const Header = () => {
  const { isUserPopoverOpen, setIsUserPopoverOpen, profile } =
    useHeaderController();

  const splitName = profile?.name?.split(" ");

  const initials = useMemo(() => {
    if (!profile?.name) return "";
    const [firstName = "", lastName = ""] = profile.name.split(" ");
    return `${firstName[0]?.toUpperCase() || ""}${lastName[0]?.toUpperCase() || ""}`;
  }, [profile]);

  return (
    <div className="left-0 right-0 z-50 h-full min-w-[250px] transition-all duration-500">
      <div className={"flex h-full flex-col"}>
        <div className="my-12 pl-8">
          <LogoIcon />
        </div>
        <div className="flex-1 overflow-auto">
          <CustomNavigationMenu />
        </div>
        <div className="my-4 pl-4">
          <Popover
            open={isUserPopoverOpen}
            onOpenChange={(open) => {
              setIsUserPopoverOpen(open);
            }}
          >
            <PopoverTrigger className="flex w-full items-center gap-x-4 rounded-full px-4 py-2 transition-all hover:bg-white">
              <Avatar>
                <AvatarFallback className="border-2 border-gray-300 bg-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex whitespace-nowrap text-base font-semibold">
                {capitalizeWords(splitName?.[0])}{" "}
                {capitalizeWords(splitName?.[1].split("")[0])}
              </div>
            </PopoverTrigger>
            <PopoverContent
              className={"mt-2 flex w-full flex-col space-y-2 px-0 py-1"}
              align="end"
            >
              <Link
                href={`/profile`}
                className="cursor-pointer px-4 py-1 leading-relaxed hover:bg-gray-100"
                onClick={() => {
                  setIsUserPopoverOpen(false);
                }}
              >
                Profile
              </Link>
              <div
                className="cursor-pointer px-4 py-1 leading-relaxed hover:bg-gray-100"
                onClick={() => {
                  signOut({ callbackUrl: "/login" });
                }}
              >
                Logout
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
