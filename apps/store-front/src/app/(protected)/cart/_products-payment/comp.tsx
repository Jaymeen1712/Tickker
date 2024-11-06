"use client";
import { CustomButton } from "@/components";
import useProductsPaymentCompController from "./comp-controller";

const ProductsPaymentComp = () => {
  const { handleBuyButtonClick, isBuyButtonLoading } =
    useProductsPaymentCompController();

  return (
    <div className="flex min-w-[350px] flex-col items-end text-base uppercase">
      <h1 className="text-sm font-medium opacity-50">Extended warranty</h1>

      <div className="my-24 flex w-full flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <span className="opacity-50">Vat (19%)</span>
          <span>4534.45 ₹</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-50">Total excl. Vat</span>
          <span>23865.55 ₹</span>
        </div>
        <div className="flex items-center justify-between text-lg font-medium">
          <span>Total incl. Vat</span>
          <span>28400.00 ₹</span>
        </div>
      </div>
      <CustomButton
        className="rounded-full px-4 py-2"
        onClick={handleBuyButtonClick}
        loading={isBuyButtonLoading}
      >
        Checkout
      </CustomButton>
    </div>
  );
};

export default ProductsPaymentComp;
