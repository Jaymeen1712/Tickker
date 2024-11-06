"use client";

import { Variants } from "framer-motion";
import { useEffect, useState } from "react";

const variants: Variants = {
  hidden: {
    opacity: 0,
    x: 0,
    filter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    x: -120,
    transition: {
      type: "linear",
      duration: 1.5,
    },
    filter: "blur(3px)",
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
    }, 1500);

    return () => {
      clearInterval(imgTimer);
    };
  }, [imgArr]);

  return { currentImg, variants };
};

export default useDashboardHeroImageController;
