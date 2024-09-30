import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface CarouselSingleContainerProps {
  product: Product;
}

const CarouselSingleContainer: React.FC<CarouselSingleContainerProps> = ({
  product,
}) => {
  const { images, name, price, brand, description, id } = useMemo(
    () => product,
    [product],
  );

  return (
    <Link href={`/products/${id}`}>
      <div className="relative h-[140px] w-full rounded-md">
        <Image
          src="/wallhaven-m95x7k.jpg"
          alt="logo-maker"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="my-2">
        <div className="font-semibold">{name}</div>
        <div className="line-clamp-2 text-ellipsis">{description}</div>
        <div className="mt-2 space-x-2">
          <span className="font-semibold">Price:</span>
          <span>{price}</span>
        </div>
        <div className="space-x-2">
          <span className="font-semibold">Brand:</span>
          <span>{brand}</span>
        </div>
      </div>
    </Link>
  );
};

export default CarouselSingleContainer;