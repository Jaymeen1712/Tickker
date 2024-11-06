"use client";
import { CustomButton } from "@/components";
import { motion } from "framer-motion";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import useSingleProductHeroImageContainerController from "./hero-image-container-controller";

const SingleProductHeroImageContainer = () => {
  const { heroImageHorizontalVariants } =
    useSingleProductHeroImageContainerController();

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
        <div className="flex items-end justify-between">
          <CustomButton className="rounded-full bg-brown-2/50 uppercase">
            Buy now
          </CustomButton>
          <div className="flex flex-col gap-y-4 text-xl opacity-50 transition-all">
            <LuHeart className="cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-darken">
        <motion.div
          variants={heroImageHorizontalVariants}
          initial="hidden"
          animate="visible"
          className="h-[550px] w-[550px]"
        >
          <Image
            src={`/watches/28000253_fr.jpg`}
            alt="logo-maker"
            fill
            objectFit="cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SingleProductHeroImageContainer;
