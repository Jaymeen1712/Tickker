"use client";

import { CustomButton, QuantitySelector, Spinner } from "@/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useSingleProductShowcasePageController from "./page-controller";

interface SingleProductShowcasePageProps {
  params: {
    productId: string;
  };
}

const SingleProductShowcasePage: React.FC<SingleProductShowcasePageProps> = ({
  params,
}) => {
  const { productId } = params;

  const {
    product,
    isGetProductLoading,
    handleProductQuantityChange,
    handleAddToCartButtonClick,
    handleBuyNowButtonClick,
    productModifications,
    isBuyButtonLoading,
  } = useSingleProductShowcasePageController({
    productId,
  });

  return (
    <div className="container">
      {isGetProductLoading ? (
        <Spinner />
      ) : (
        <div className="space-y-6">
          <div>
            <div className="relative h-[440px] w-full rounded-md">
              <Image
                src="/wallhaven-m95x7k.jpg"
                alt="logo-maker"
                fill
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <div className="font-semibold">{product?.name}</div>
            <div className="truncate text-ellipsis">{product?.description}</div>
            <div>{product?.price}</div>
            <div>{product?.brand}</div>
          </div>

          <div>
            <span>Quantity</span>
            <QuantitySelector
              onQuantityChange={handleProductQuantityChange}
              initialQuantity={productModifications.quantity}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleAddToCartButtonClick}>Add to cart</Button>
            <CustomButton
              onClick={handleBuyNowButtonClick}
              loading={isBuyButtonLoading}
            >
              Buy now
            </CustomButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductShowcasePage;
