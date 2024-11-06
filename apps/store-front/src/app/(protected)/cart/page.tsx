"use client";
import { Header } from "@/components";
import ProductsDetailsComp from "./_products-details";
import ProductsPaymentComp from "./_products-payment";
import useCartPageController from "./page-controller";

const CartPage = () => {
  const { isScrolled } = useCartPageController();

  return (
    <div className="hero-image-gradient-container min-h-screen">
      <div
        className={`sticky top-0 z-20 transition-all ${isScrolled ? "backdrop-blur-3xl" : ""}`}
      >
        <Header />
      </div>
      <div className="container">
        <h3 className="pb-14 text-4xl font-normal uppercase tracking-tighter">
          Shopping cart
        </h3>
        <div className="flex gap-x-12">
          <div className="relative">
            <ProductsDetailsComp />
          </div>
          <div className="sticky top-44 h-max">
            <ProductsPaymentComp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
