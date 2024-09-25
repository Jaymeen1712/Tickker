"use client";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

interface SingleProductCompProps {
  product: Product;
}

const SingleProductComp: React.FC<SingleProductCompProps> = ({ product }) => {
  const { brand, category, description, images, name, price, rating, id } =
    useMemo(() => product, [product]);

  return (
    <Link
      href={`/products/${id}`}
      className="grid grid-cols-4 items-center gap-4 p-4 hover:bg-gray-100"
    >
      <div className="relative col-span-1 h-[80px] w-full rounded-md">
        <Image
          src="/wallhaven-m95x7k.jpg"
          alt="logo-maker"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="col-span-3 flex">
        <div className="flex flex-1 flex-col">
          <span>{name}</span>
          {/* <span>{description}</span> */}
          <span>{brand}</span>
          <span>{category}</span>
        </div>
        <div className="">{price}</div>
      </div>
    </Link>
  );
};

export default SingleProductComp;
