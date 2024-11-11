"use client";
import { CustomButton } from "@/components";
import { Product } from "@prisma/client";
import { motion } from "framer-motion";
import Image from "next/image";
import useSingleProductHeroImageContainerController from "./hero-image-container-controller";

interface SingleProductHeroImageContainerProps {
  product: Product | undefined;
}

const SingleProductHeroImageContainer: React.FC<
  SingleProductHeroImageContainerProps
> = ({ product }) => {
  const { currentImg, heroImageHorizontalVariants } =
    useSingleProductHeroImageContainerController({
      images: product?.images ?? [],
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
          <CustomButton className="rounded-full bg-brown-2/50 uppercase">
            Buy now
          </CustomButton>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-darken">
        <motion.div
          variants={heroImageHorizontalVariants}
          initial="hidden"
          animate="visible"
          className="h-[550px] w-[550px]"
        >
          <Image src={currentImg} alt="logo-maker" fill objectFit="cover" />
        </motion.div>
      </div>
    </div>
  );
};

export default SingleProductHeroImageContainer;
