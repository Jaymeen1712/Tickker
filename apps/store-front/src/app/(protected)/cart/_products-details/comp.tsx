"use client";
import CartShowcaseSingleProductComp from "./_single-product-card";
import useProductsDetailsCompController from "./comp-controller";

const ProductsDetailsComp = () => {
  const { cartItems, isCartItemsLoading, cartSubTotal, handleGetCartItems } =
    useProductsDetailsCompController();

  return (
    <div className="pb-8">
      <div className="flex flex-wrap gap-x-8 gap-y-12">
        {[...Array(3)].map((_, index) => (
          // @ts-ignore
          <CartShowcaseSingleProductComp key={index} />
        ))}
      </div>

      {/* <div className="flex h-full w-full flex-col items-center justify-center">
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
        </div> */}

      {/* <div className="border border-black px-8 py-4 text-end">
        <span className="text-base font-semibold text-black">
          Subtotal: {cartSubTotal}
        </span>
      </div> */}
    </div>
  );
};

export default ProductsDetailsComp;
