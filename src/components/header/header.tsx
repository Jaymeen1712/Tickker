"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import HeaderSearchWithSuggestionBox from "../header-search-with-suggestion-box";
import useHeaderController from "./header-controller";

interface HeaderProps {
  isSearchVisible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSearchVisible = true }) => {
  const { scrollY, isUserPopoverOpen, setIsUserPopoverOpen } =
    useHeaderController();

  return (
    <div
      className={cn(
        "container left-0 right-0 z-50 transition-all duration-500",
        // scrollY < 10 ? "top-0 mx-0" : "top-8 mx-8",
      )}
    >
      <div
        className={cn(
          "flex h-24 items-center justify-between",
          // scrollY > 10 && "rounded-md",
        )}
      >
        <Link className="pr-12" href={"/"}>
          LOGO
        </Link>
        {isSearchVisible && (
          <div className="flex-1 px-12">
            <HeaderSearchWithSuggestionBox />
          </div>
        )}
        <div className="pl-12">
          <Popover
            open={isUserPopoverOpen}
            onOpenChange={(open) => {
              setIsUserPopoverOpen(open);
            }}
          >
            <PopoverTrigger>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
              </Avatar>
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
              <Link
                href={`/cart`}
                className="cursor-pointer px-4 py-1 leading-relaxed hover:bg-gray-100"
                onClick={() => {
                  setIsUserPopoverOpen(false);
                }}
              >
                Cart
              </Link>
              <Link
                href={`/orders`}
                className="cursor-pointer px-4 py-1 leading-relaxed hover:bg-gray-100"
                onClick={() => {
                  setIsUserPopoverOpen(false);
                }}
              >
                Orders
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
