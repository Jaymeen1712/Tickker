"use client";
import { Spinner } from "@/components";
import Image from "next/image";
import CartShowcaseSingleProductComp from "./_single-product";
import useProductsDetailsCompController from "./comp-controller";

const ProductsDetailsComp = () => {
  const { cartItems, isCartItemsLoading, cartSubTotal, handleGetCartItems } =
    useProductsDetailsCompController();

  return (
    <div className="mb-8 flex flex-grow flex-col shadow-md">
      <h3 className="border border-black py-8 text-center text-2xl font-semibold text-black">
        Shopping cart
      </h3>

      <div className="relative flex-grow border-2 border-y-0 border-dashed border-gray-3">
        <div className="absolute h-full w-full overflow-y-auto">
          {isCartItemsLoading ? (
            <div className="flex h-full items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {cartItems.length ? (
                <div className="flex flex-col">
                  {cartItems.map((cartItem) => (
                    <CartShowcaseSingleProductComp
                      cartItem={cartItem}
                      key={cartItem.id}
                      handleGetCartItems={handleGetCartItems}
                    />
                  ))}
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
                    No Products in shopping cart.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="border border-black px-8 py-4 text-end">
        <span className="text-base font-semibold text-black">
          Subtotal: {cartSubTotal}
        </span>
      </div>
    </div>
  );
};

export default ProductsDetailsComp;
