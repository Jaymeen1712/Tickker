"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { useMemo } from "react";
import useSingleProductCardController from "./single-product-card-controller";

interface SingleProductCardProps {
  product: Product;
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({ product }) => {
  const { handleRedirectToProductPage } = useSingleProductCardController({
    product,
  });

  const { model, name, stock, images } = useMemo(() => product, [product]);

  return (
    <div
      className="single-product-card-gradient-container relative flex h-96 w-96 cursor-pointer flex-col justify-between rounded-3xl p-6 transition-all hover:scale-105"
      onClick={handleRedirectToProductPage}
    >
      <div className="z-10 w-fit rounded-3xl bg-white/5 px-4 py-2 text-sm backdrop-blur-3xl">
        Limited to {stock} pieces
      </div>

      <div className="z-10 flex flex-col gap-y-2 pb-4 pl-4 uppercase">
        <span className="text-xs opacity-50">{model}</span>
        <span className="text-sm">{name}</span>
      </div>

      {/* Image container */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[240px] w-[240px]">
          <Image
            src={images[1]}
            alt="logo-maker"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
