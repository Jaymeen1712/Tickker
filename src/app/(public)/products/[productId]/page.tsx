"use client";

import {
  CustomButton,
  CustomSlider,
  QuantitySelector,
  Spinner,
} from "@/components";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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
    handlePrevClick,
    setHandlePrevClick,
    handleNextClick,
    setHandleNextClick,
    isPrevDisable,
    setIsPrevDisable,
    isNextDisable,
    setIsNextDisable,
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

            <div className="relative my-4 flex items-center">
              <CustomButton
                onClick={() => handlePrevClick()}
                className="carousel-btn absolute z-20 cursor-pointer"
                disabled={isPrevDisable}
              >
                <FaArrowLeft />
              </CustomButton>

              <CustomSlider
                itemsLength={product?.images?.length ?? 0}
                setHandlePrevClick={setHandlePrevClick}
                setHandleNextClick={setHandleNextClick}
                setIsPrevDisable={setIsPrevDisable}
                setIsNextDisable={setIsNextDisable}
                responsiveConfig={{
                  "1024": 5,
                  "480": 3,
                  "600": 4,
                  any: 1,
                }}
              >
                {product?.images.map((image, index) => (
                  <div
                    className="relative h-[80px] rounded-md border bg-gray-100"
                    key={index}
                  >
                    <Image
                      src="/wallhaven-m95x7k.jpg"
                      alt="logo-maker"
                      fill
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>
                ))}
              </CustomSlider>
              <CustomButton
                onClick={() => handleNextClick()}
                className="carousel-btn absolute right-0 z-20 cursor-pointer"
                disabled={isNextDisable}
              >
                <FaArrowRight />
              </CustomButton>
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
