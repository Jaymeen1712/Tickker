"use client";
import { Spinner } from "@/components";
import Image from "next/image";
import CartShowcaseSingleProductComp from "./_single-product";
import useProductsDetailsCompController from "./comp-controller";

const ProductsDetailsComp = () => {
  const { cartItems, isCartItemsLoading, cartSubTotal, handleGetCartItems } =
    useProductsDetailsCompController();

  return (
    <div className="shadow-md">
      <h3 className="bg-red-contrast py-8 text-center text-2xl font-semibold text-gray-primary">
        Shopping cart
      </h3>

      <div className="max-h-[calc(100vh-400px)] overflow-auto border-2 border-y-0 border-dashed border-gray-3">
        {isCartItemsLoading ? (
          <div className="flex h-[35vh] items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {cartItems.length ? (
              <div className="mb-4 border-b border-b-gray-400 pb-4">
                {cartItems.map((cartItem) => (
                  <CartShowcaseSingleProductComp
                    cartItem={cartItem}
                    key={cartItem.id}
                    handleGetCartItems={handleGetCartItems}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-[35vh] w-full flex-col items-center justify-center">
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

      <div className="bg-red-contrast px-8 py-4 text-end">
        <span className="text-base font-semibold text-gray-primary">
          Subtotal: {cartSubTotal}
        </span>
      </div>
    </div>
  );
};

export default ProductsDetailsComp;
