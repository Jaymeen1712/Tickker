"use client";
import { CustomButton } from "@/components";
import useProductsPaymentCompController from "./comp-controller";

const ProductsPaymentComp = () => {
  const { handleBuyButtonClick, isBuyButtonLoading } =
    useProductsPaymentCompController();

  return (
    <div className="col-span-1 flex h-fit items-center">
      <CustomButton
        className="w-full rounded-full"
        onClick={handleBuyButtonClick}
        loading={isBuyButtonLoading}
      >
        Buy
      </CustomButton>
    </div>
  );
};

export default ProductsPaymentComp;
