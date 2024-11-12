"use client";
import { CartItemsIncludingProductType } from "@/types";
import Image from "next/image";
import CartShowcaseSingleProductComp from "./_single-product-card";

interface ProductDetailsContainerProps {
  cartItems: CartItemsIncludingProductType[] | undefined;
  handleGetCartItems: () => void;
}

const ProductsDetailsComp: React.FC<ProductDetailsContainerProps> = ({
  cartItems,
  handleGetCartItems,
}) => {
  if (!cartItems) {
    return;
  }

  return (
    <>
      {cartItems.length ? (
        <div className="h-full pb-8">
          <div className="flex flex-wrap gap-x-8 gap-y-12">
            {cartItems.map((cartItem, index) => (
              <CartShowcaseSingleProductComp
                key={index}
                cartItem={cartItem}
                handleGetCartItems={handleGetCartItems}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div className="relative h-[250px] w-[250px]">
            <Image
              src="/img-empty-cart.png"
              alt="logo-maker"
              fill
              objectFit="cover"
              className="rounded-md"
            />
          </div>
          <div className="text-lg font-semibold">
            No watches in shopping cart.
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsDetailsComp;
