"use client";
import { Spinner } from "@/components";
import CartShowcaseSingleProductComp from "./_single-product";
import useProductsDetailsCompController from "./comp-controller";

const ProductsDetailsComp = () => {
  const { cartItems, isCartItemsLoading, cartSubTotal, handleGetCartItems } =
    useProductsDetailsCompController();

  return (
    <div className="col-span-3">
      <h3 className="mb-8 border-b border-b-gray-400 pb-8 text-center text-2xl font-semibold">
        Shopping cart
      </h3>

      {isCartItemsLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="mb-4 border-b border-b-gray-400 pb-4">
            {cartItems.map((cartItem) => (
              <CartShowcaseSingleProductComp
                cartItem={cartItem}
                key={cartItem.id}
                handleGetCartItems={handleGetCartItems}
              />
            ))}
          </div>

          <div className="text-end">
            <span className="text-base font-semibold">
              Subtotal: {cartSubTotal}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsDetailsComp;
