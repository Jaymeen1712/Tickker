"use client";

import { useEffect, useState } from "react";

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
  }, []);

  return { currentImg };
};

export default useDashboardHeroImageController;
