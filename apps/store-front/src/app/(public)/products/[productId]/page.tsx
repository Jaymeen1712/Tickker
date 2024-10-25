"use client";

import {
  CustomButton,
  CustomSlider,
  QuantitySelector,
  Rating,
  Spinner,
} from "@/components";
import { cn } from "@/lib/utils";
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
    handleProductImageClick,
    heroImage,
  } = useSingleProductShowcasePageController({
    productId,
  });

  return (
    <div className="container">
      {isGetProductLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-6 gap-8">
          {/* First Column - Product Info and Slider */}
          <div className="relative col-span-4 space-y-6">
            <div>
              {/* Main Product Image */}
              <div className="relative h-[440px] w-full rounded-md">
                <Image
                  src={heroImage.image}
                  alt="logo-maker"
                  fill
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              {/* Carousel Controls and Slider */}
              <div className="relative my-8 flex items-center">
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
                    any: 3,
                  }}
                  customClassName={"single-product-carousel"}
                >
                  {product?.images.map((image) => (
                    <div
                      className={cn(
                        "relative h-[80px] cursor-pointer rounded-md border bg-gray-100 outline-none transition-all hover:scale-110",
                        image.id === heroImage.id && "scale-110 shadow-md",
                      )}
                      key={image.id}
                      onClick={() => handleProductImageClick(image)}
                    >
                      <Image
                        src={image.image}
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

              {/* Product Information */}
              <div className="mb-4 space-y-2">
                <div className="text-2xl font-semibold">{product?.name}</div>
                <div className="line-clamp-3 text-ellipsis">
                  {product?.description}
                </div>
              </div>

              {/* Price and Brand */}
              {product?.price && (
                <div className="mt-2 space-x-2">
                  <span className="font-semibold">Price:</span>
                  <span>{product?.price}</span>
                </div>
              )}
              {product?.brand && (
                <div className="space-x-2">
                  <span className="font-semibold">Brand:</span>
                  <span>{product?.brand}</span>
                </div>
              )}
              {product?.rating && (
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">Rating:</span>
                  <Rating stop={product?.rating} />
                </div>
              )}
            </div>
          </div>

          {/* Sticky Second Column - Add to Cart and Buy Now */}
          <div className="col-span-2">
            <div className="sticky top-6 space-y-8">
              {/* Quantity Selector */}
              <div>
                <div className="mb-2 font-semibold">Quantity</div>
                <QuantitySelector
                  onQuantityChange={handleProductQuantityChange}
                  initialQuantity={productModifications.quantity}
                />
              </div>
              <div className="flex space-x-4">
                <CustomButton
                  onClick={handleAddToCartButtonClick}
                  className="flex-1 py-6 text-base"
                >
                  Add to cart
                </CustomButton>
                <CustomButton
                  onClick={handleBuyNowButtonClick}
                  loading={isBuyButtonLoading}
                  className="flex-1 py-6 text-base"
                >
                  Buy now
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProductShowcasePage;
