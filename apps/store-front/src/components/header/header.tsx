"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { BiPackage } from "react-icons/bi";
import { LuUserCircle2 } from "react-icons/lu";
import { PiHandbagSimpleBold } from "react-icons/pi";
import CustomButton from "../custom-button";
import useHeaderController from "./header-controller";

const Header = () => {
  const { headerMenuItems, currentActiveHeaderItem, session, router } =
    useHeaderController();

  return (
    <div className="container">
      <div className="flex items-center justify-between gap-x-8 pb-12 pt-16">
        <Link className="text-2xl font-semibold" href={"/"}>
          LOGO
        </Link>

        {/* Menu items */}
        <div className="flex gap-16 transition-all">
          {headerMenuItems.map(({ label, redirectURL }) => (
            <Link
              className={cn(
                "text-sm font-medium opacity-50 hover:opacity-100",
                currentActiveHeaderItem.toLowerCase() ===
                  (redirectURL || label).toLowerCase() && "opacity-100",
              )}
              href={`/${redirectURL || label.toLowerCase()}`}
              key={label}
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </div>

        {session ? (
          <div className="flex items-center gap-8 transition-all">
            <Link href={"/cart"}>
              <PiHandbagSimpleBold className="text-2xl" />
            </Link>
            <Link href={"/orders"}>
              <BiPackage className="text-2xl" />
            </Link>
            <Link href={"/profile"}>
              <LuUserCircle2 className="text-2xl" />
            </Link>
          </div>
        ) : (
          <div className="flex gap-x-8">
            <CustomButton
              variant={"link"}
              className="rounded-none border-none p-0 uppercase text-white-primary"
              onClick={() => router.replace("/login")}
            >
              Login
            </CustomButton>
            <CustomButton
              variant={"link"}
              className="rounded-none border-none p-0 uppercase text-white-primary"
              onClick={() => router.replace("/signup")}
            >
              Sign up
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
