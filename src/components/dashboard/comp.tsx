"use client";

import { CarouselWithTitle } from "@/components";
import Image from "next/image";
import { LuSearch } from "react-icons/lu";
import { Input } from "../ui/input";
import useDashboardController from "./comp-controller";

const DashboardComp = () => {
  const { products, handleSearchInputChange, handleSearchInputClick } =
    useDashboardController();

  return (
    <>
      <div className="relative h-[80vh] w-full">
        <div className="absolute inset-0">
          <Image
            src="/img-dashboard.jpg"
            layout="fill"
            alt="everything"
            objectFit="cover"
          />
        </div>
        <div className="container h-full w-full">
          <div className="z-20 flex h-full items-center justify-center">
            <div className="flex w-full items-center">
              <div className="relative w-full">
                <Input
                  className="rounded-full border-none bg-gray-100/20 p-8 pr-12 text-xl text-white focus-visible:ring focus-visible:ring-gray-100/80"
                  onChange={handleSearchInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchInputClick();
                    }
                  }}
                  placeholder="Search..."
                />
                {/* Search button */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 transform">
                  <LuSearch
                    color="white"
                    className="cursor-pointer text-xl"
                    onClick={handleSearchInputClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CarouselWithTitle title={"Recent"} products={products} />
    </>
  );
};

export default DashboardComp;
