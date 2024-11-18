"use client";
import { CustomButton } from "@/components";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import useSingleProductHeroImageContainerController from "./hero-image-container-controller";

interface SingleProductHeroImageContainerProps {
  product: Product | undefined;
  productId: string;
}

const SingleProductHeroImageContainer: React.FC<
  SingleProductHeroImageContainerProps
> = ({ product, productId }) => {
  const {
    currentImg,
    heroImageHorizontalVariants,
    handleAddToCartButtonClick,
    handleBuyNowButtonClick,
    isBuyButtonLoading,
    isAddToCartButtonLoading,
  } = useSingleProductHeroImageContainerController({
    productId,
    product,
  });

  return (
    <div className="container relative h-[70vh] pb-16">
      <div className="flex h-full flex-col gap-y-8">
        <div className="flex justify-between text-sm font-semibold">
          <div className="rounded-full bg-brown-2/50 px-4 py-2">
            Limited to {product?.stock} pieces
          </div>
          <div className="uppercase">Available</div>
        </div>
        <div className="flex-1 uppercase">
          <div className="grid h-full flex-1 grid-cols-1 place-content-center gap-y-4 text-6xl">
            <span className="text-sm font-semibold opacity-50">
              {product?.model}
            </span>
            <div>
              {product?.category.split(" ").map((word) => (
                <div className="tracking-tighter" key={word}>
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex w-fit gap-x-4">
            <CustomButton
              className="rounded-full bg-brown-2/100 uppercase hover:bg-brown-2/50"
              onClick={handleBuyNowButtonClick}
              loading={isBuyButtonLoading}
            >
              Buy now
            </CustomButton>
            <CustomButton
              className="rounded-full bg-brown-2/100 uppercase hover:bg-brown-2/50"
              onClick={handleAddToCartButtonClick}
              loading={isAddToCartButtonLoading}
            >
              Add to cart
            </CustomButton>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          variants={heroImageHorizontalVariants}
          initial="hidden"
          animate="visible"
          className="relative h-[550px] w-[550px]"
        >
          {currentImg && (
            <Image src={currentImg} alt="img" fill className="object-cover" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SingleProductHeroImageContainer;
