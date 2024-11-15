import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductDetailsContainerProps {
  product: Product | undefined;
}

const ProductDetailsContainer: React.FC<ProductDetailsContainerProps> = ({
  product,
}) => {
  return (
    <div className="container flex gap-x-16 py-16">
      <div className="flex flex-1 flex-col gap-y-2">
        <div className="flex gap-x-2 uppercase">
          <h1 className="text-base">{product?.category}</h1>
          <span className="opacity-50">{product?.model}</span>
        </div>
        <div className="text-sm">{product?.description}</div>

        <div className="mt-8 flex flex-col gap-y-2 text-sm uppercase">
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Brand</span>
            <span>{product?.brand}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Name</span>
            <span>{product?.name}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Strap</span>
            <span>{product?.strap}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Buckle</span>
            <span>{product?.buckle}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Strap size</span>
            <span>{product?.strapSize}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Movement</span>
            <span>{product?.movement}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Water resistance</span>
            <span>{product?.waterResistance}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Case material</span>
            <span>{product?.caseMaterial}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Case diameter</span>
            <span>{product?.caseDiameter}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="w-48 opacity-50">Dial color</span>
            <span>{product?.dialColor}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-x-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <div className="relative h-[140px] w-[140px]" key={index}>
            <Image
              src={`/watches/28000253_fr.jpg`}
              alt="logo-maker"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsContainer;
