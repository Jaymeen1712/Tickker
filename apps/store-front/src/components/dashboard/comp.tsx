"use client";

import { CarouselWithTitle, CustomButton } from "@/components";
import useDashboardController from "./comp-controller";

const DashboardComp = () => {
  const { products, handleSearchInputChange, handleSearchInputClick } =
    useDashboardController();

  return (
    <div className="container">
      <div className="h-[70vh]">
        <div className="flex h-full flex-col gap-y-8">
          <div className="flex justify-between text-sm font-semibold">
            <div className="rounded-full bg-brown-2/50 px-4 py-2">
              Limited to 50 pieces
            </div>
            <div className="uppercase">Available</div>
          </div>
          <div className="flex-1 uppercase">
            <div className="grid h-full flex-1 grid-cols-1 place-content-center gap-y-4 text-6xl">
              <span className="text-sm font-semibold opacity-50">
                CH-9342.2-CUBK
              </span>
              <div>
                {"Space timer jupiter".split(" ").map((word) => (
                  <div className="tracking-tighter">{word}</div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <CustomButton className="rounded-full bg-brown-2/50 uppercase">
              Find out more
            </CustomButton>
          </div>
        </div>
      </div>

      {/* Carousel container */}
      <div className="flex flex-col space-y-8 py-8">
        <CarouselWithTitle title={"Recent"} products={products} />
        <CarouselWithTitle title={"Recent"} products={products} />
        <CarouselWithTitle title={"Recent"} products={products} />
      </div>
    </div>
  );
};

export default DashboardComp;
