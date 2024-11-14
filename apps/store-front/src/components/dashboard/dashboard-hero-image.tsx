"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import CustomButton from "../custom-button";
import useDashboardHeroImageController from "./dashboard-hero-image-controller";

const DashboardHeroImageContainer = () => {
  const {
    currentImg,
    heroImageHorizontalVariants,
    heroRemainingVariants,
    heroImageVerticalVariants,
  } = useDashboardHeroImageController();

  return (
    <div className="container relative h-[70vh] pb-16">
      <motion.div
        className="flex h-full flex-col gap-y-8"
        variants={heroRemainingVariants}
        initial="hidden"
        animate="visible"
      >
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
      </motion.div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-darken">
        <motion.div
          variants={heroImageVerticalVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            key={currentImg}
            variants={heroImageHorizontalVariants}
            initial="hidden"
            animate="visible"
            className="h-[550px] w-[550px] relative"
          >
            <Image
              src={`/watches/${currentImg}`}
              alt="logo-maker"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHeroImageContainer;
