"use client";

import { Product } from "@prisma/client";
import Vibrant from "node-vibrant";
import { Vec3 } from "node-vibrant/lib/color";
import { useCallback, useEffect, useState } from "react";

interface SingleProductCardControllerProps {
  product: Product;
}

const useSingleProductCardController = ({
  product,
}: SingleProductCardControllerProps) => {
  const [imageColor, setImageColor] = useState<{
    lightVibrant: Vec3;
    darkMuted: Vec3;
  }>();

  const setBackgroundFromImage = useCallback(async (imageSrc: string) => {
    Vibrant.from(imageSrc)
      .getPalette()
      .then((palette) => {
        const lightVibrant = palette.LightVibrant?.getRgb();
        const darkMuted = palette.DarkMuted?.getRgb();
        lightVibrant &&
          darkMuted &&
          setImageColor({
            darkMuted,
            lightVibrant,
          });
      });
  }, []);

  const handleAddToWishlist = () => {
    try {
      // const {} = await
    } finally {
    }
  };

  useEffect(() => {
    product?.images[0] && setBackgroundFromImage(product?.images[0]);
  }, [product, setBackgroundFromImage]);

  return { imageColor, handleAddToWishlist };
};

export default useSingleProductCardController;
