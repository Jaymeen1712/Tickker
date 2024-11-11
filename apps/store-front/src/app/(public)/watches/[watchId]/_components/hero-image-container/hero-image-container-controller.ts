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

interface SingleProductHeroImageContainerControllerProps {
  images: string[];
}

const useSingleProductHeroImageContainerController = ({
  images,
}: SingleProductHeroImageContainerControllerProps) => {
  const [currentImg, setCurrentImg] = useState("");
  const [imgArr, setImgArr] = useState<string[]>([]);

  useEffect(() => {
    setImgArr(images);
  }, [images]);

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

  return { currentImg, heroImageHorizontalVariants };
};

export default useSingleProductHeroImageContainerController;
