"use client";
import { CustomButton } from "@/components";
import useProductsPaymentCompController from "./comp-controller";

interface ProductsDetailsCompProps {
  cartSubTotal: number | undefined;
}

const ProductsPaymentComp: React.FC<ProductsDetailsCompProps> = ({
  cartSubTotal,
}) => {
  const { handleBuyButtonClick, isBuyButtonLoading, total } =
    useProductsPaymentCompController({ cartSubTotal });

  return (
    <div className="flex min-w-[350px] flex-col items-end text-base uppercase">
      <h1 className="text-sm font-medium opacity-50">Extended warranty</h1>

      <div className="my-24 flex w-full flex-col gap-y-6">
        <div className="flex items-center justify-between">
          <span className="opacity-50">Vat (18%)</span>
          <span>{total?.weightedTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-50">Total excl. Vat</span>
          <span>{total?.excludeWeightedTotal}</span>
        </div>
        <div className="flex items-center justify-between text-lg font-medium">
          <span>Total incl. Vat</span>
          <span>{total?.includeWeightedTotal}</span>
        </div>
      </div>
      <CustomButton
        className="rounded-full bg-brown-2/100 px-4 py-2 uppercase transition-all hover:bg-brown-2/50"
        onClick={handleBuyButtonClick}
        loading={isBuyButtonLoading}
        disabled={cartSubTotal === 0}
      >
        Checkout
      </CustomButton>
    </div>
  );
};

export default ProductsPaymentComp;
