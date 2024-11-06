"use client";

import { Variants } from "framer-motion";
import { useEffect, useState } from "react";

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

const heroImageVerticalVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "easeOut",
      when: "beforeChildren",
    },
  },
};

const heroRemainingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "easeOut",
      delay: 0.3,
    },
  },
};

const useDashboardHeroImageController = () => {
  const [currentImg, setCurrentImg] = useState("28000253_fr.jpg");
  const [imgArr, setImgArr] = useState<string[]>([
    "28000253_fr.jpg",
    "28000253_s.jpg",
    "28000253_b.jpg",
  ]);

  useEffect(() => {
    const imgTimer = setInterval(() => {
      setCurrentImg((prev) => {
        const imgIndex = imgArr.findIndex((img) => img === prev);
        const nextIndex = (imgIndex + 1) % imgArr.length;
        return imgArr[nextIndex];
      });
    }, 2000);

    return () => {
      clearInterval(imgTimer);
    };
  }, [imgArr]);

  return {
    currentImg,
    heroImageHorizontalVariants,
    heroRemainingVariants,
    heroImageVerticalVariants,
  };
};

export default useDashboardHeroImageController;
