import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface SingleProductShowcaseCompProps {
  product: Product;
}

const SingleProductShowcaseComp: React.FC<SingleProductShowcaseCompProps> = ({
  product,
}) => {
  const { brand, category, description, images, name, price, rating, id } =
    product;

  return (
    <Link href={`/products/${id}`}>
      <div className="relative col-span-1 h-[140px] w-full rounded-md">
        <Image
          src={images?.[0]}
          alt="logo-maker"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="col-span-3 grid grid-cols-4">
        <div className="col-span-3 flex flex-col">
          <span>{name}</span>
          <span>{description}</span>
          <span>{brand}</span>
          <span>{category}</span>
          <span>{rating}</span>
        </div>
        <div className="col-span-1">{price}</div>
      </div>
    </Link>
  );
};

export default SingleProductShowcaseComp;
