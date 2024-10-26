"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { LuHeart } from "react-icons/lu";
import useSingleProductCardController from "./single-product-card-controller";

interface SingleProductCardProps {
  product: Product;
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({ product }) => {
  const { imageColor, handleAddToWishlist } = useSingleProductCardController({
    product,
  });

  return (
    <div className="w-fit">
      <div className="relative overflow-hidden rounded-xl bg-white-primary">
        <div className="relative mx-auto flex h-72 w-72 cursor-pointer items-center justify-center transition-all hover:scale-110">
          <Image
            src={product?.images[0]}
            alt="watch-image"
            fill
            objectFit="contain"
          />
        </div>
        <div className="absolute inset-0 right-4 top-4 flex h-fit justify-end">
          <LuHeart
            className="cursor-pointer text-xl text-black transition-all hover:fill-black"
            onClick={handleAddToWishlist}
          />
        </div>
      </div>
      <div className="mt-2 flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{product?.name}</div>
          <div className="font-bold">{product?.price}</div>
        </div>
        <div className="line-clamp-1 text-ellipsis text-sm">
          {product?.description}
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
