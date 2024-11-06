"use client";
import { Variants } from "framer-motion";

const heroImageHorizontalVariants: Variants = {
  // hidden: {
  //   opacity: 1,
  //   x: 0,
  //   // filter: "blur(0px)",
  // },
  // visible: {
  //   opacity: 1,
  //   x: -120,
  //   transition: {
  //     type: "linear",
  //     duration: 2,
  //   },
  //   // filter: "blur(3px)",
  // },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const useSingleProductHeroImageContainerController = () => {
  return { heroImageHorizontalVariants };
};

export default useSingleProductHeroImageContainerController;
