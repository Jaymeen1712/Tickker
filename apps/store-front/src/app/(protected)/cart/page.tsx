"use client";
import ProductsDetailsComp from "./_products-details";
import ProductsPaymentComp from "./_products-payment";

const CartPage = () => {
  return (
    <div className="container flex flex-grow flex-col">
      <ProductsPaymentComp />
      <ProductsDetailsComp />
    </div>
  );
};

export default CartPage;
