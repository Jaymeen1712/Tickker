"use client";

import Link from "next/link";
import { Suspense } from "react";
import { LiaUserCircle } from "react-icons/lia";
import { LuHeart } from "react-icons/lu";
import { PiHandbagSimpleBold } from "react-icons/pi";
import HeaderSearchWithSuggestionBox from "../header-search-with-suggestion-box";
import useHeaderController from "./header-controller";

interface HeaderProps {
  isSearchVisible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isSearchVisible = true }) => {
  const { isUserPopoverOpen, setIsUserPopoverOpen, profile, headerMenuItems } =
    useHeaderController();

  return (
    <div className="container">
      <div className="flex items-center justify-between pb-12 pt-16">
        <Link className="pr-12 text-2xl font-semibold" href={"/"}>
          LOGO
        </Link>
        {isSearchVisible && (
          <div className="flex-1 px-12">
            <Suspense>
              <HeaderSearchWithSuggestionBox />
            </Suspense>
          </div>
        )}

        {/* Menu items */}
        <div className="flex gap-16 transition-all">
          {headerMenuItems.map(({ label }) => (
            <Link
              className="text-sm font-medium opacity-50 hover:opacity-100"
              href={`/${label}`}
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-8 transition-all">
          <Link href={"/wishlist"}>
            <LuHeart className="text-2xl hover:text-red-600" />
          </Link>
          <Link href={"/profile"}>
            <LiaUserCircle className="text-3xl" />
          </Link>
          <Link href={"/cart"}>
            <PiHandbagSimpleBold className="text-2xl" />
          </Link>
        </div>

        {/* <div className="flex items-center pl-12">
          <Popover
            open={isUserPopoverOpen}
            onOpenChange={(open) => {
              setIsUserPopoverOpen(open);
            }}
          >
            <PopoverTrigger>
              <Avatar>
                <AvatarImage
                  src={profile?.highResImage ?? ""}
                  alt="Profile img"
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
        </div> */}
      </div>
    </div>
  );
};

export default Header;
