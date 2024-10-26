"use client";
import Image from "next/image";
import CustomButton from "../custom-button";
import useDashboardHeroImageController from "./dashboard-hero-image-controller";

const DashboardHeroImageContainer = () => {
  const { currentImg } = useDashboardHeroImageController();

  return (
    <div className="container relative h-[70vh] pb-16">
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
                <div className="tracking-tighter" key={word}>
                  {word}
                </div>
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

      <div
        className="absolute inset-0 left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2"
        style={{
          mixBlendMode: "darken",
        }}
      >
        <Image
          src={`/watches/${currentImg}`}
          alt="logo-maker"
          fill
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default DashboardHeroImageContainer;
