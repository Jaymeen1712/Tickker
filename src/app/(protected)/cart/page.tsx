"use client";
import ProductsDetailsComp from "./_products-details";
import ProductsPaymentComp from "./_products-payment";

const CartPage = () => {
  return (
    <div className="container grid grid-cols-4 gap-8">
      <ProductsDetailsComp />
      <ProductsPaymentComp />
    </div>
  );
};

export default CartPage;
