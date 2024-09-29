"use client";
import { CustomButton } from "@/components";
import useProductsPaymentCompController from "./comp-controller";

const ProductsPaymentComp = () => {
  const { handleBuyButtonClick, isBuyButtonLoading } =
    useProductsPaymentCompController();

  return (
    <div className="mb-8 mt-4 flex h-fit items-center justify-center">
      <CustomButton
        className="w-28 rounded-full"
        onClick={handleBuyButtonClick}
        loading={isBuyButtonLoading}
      >
        Buy
      </CustomButton>
    </div>
  );
};

export default ProductsPaymentComp;
