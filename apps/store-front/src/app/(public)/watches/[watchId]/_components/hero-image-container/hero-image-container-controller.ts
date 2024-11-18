import {
  createOrderByProfileId,
  createOrderItemsByOrderId,
  createProductInCart,
  fetchCartByProfileId,
} from "@/db/queries";
import { useAppStore } from "@/store";
import {
  handleAPIResponse,
  handleNoProfileInPublicTemplate,
  handleShowError,
  handleShowSuccess,
} from "@/utils";
import { Cart, Order, Product } from "@prisma/client";
import { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const heroImageHorizontalVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface SingleProductHeroImageContainerControllerProps {
  productId: string;
  product: Product | undefined;
}

const useSingleProductHeroImageContainerController = ({
  productId,
  product,
}: SingleProductHeroImageContainerControllerProps) => {
  const [currentImg, setCurrentImg] = useState("");
  const [imgArr, setImgArr] = useState<string[]>([]);
  const [isBuyButtonLoading, setIsBuyButtonLoading] = useState(false);
  const [isAddToCartButtonLoading, setIsAddToCartButtonLoading] =
    useState(false);
  const { profile } = useAppStore();

  const router = useRouter();

  const handleAddToCartButtonClick = async () => {
    try {
      if (!profile) {
        handleNoProfileInPublicTemplate();
        return;
      }
      setIsAddToCartButtonLoading(true);

      const { id } = profile;

      const { errors, response } = await fetchCartByProfileId({
        profileId: id,
      });

      const cartResult = handleAPIResponse(errors, response);

      if (cartResult) {
        const { id: cartId } = cartResult as Cart;

        const { errors, response } = await createProductInCart({
          cartId,
          productId,
          quantity: 1,
        });

        const result = handleAPIResponse(errors, response);

        if (result) {
          handleShowSuccess("Product successfully added in cart.");
        }
      }
    } finally {
      setIsAddToCartButtonLoading(false);
    }
  };

  const handleBuyNowButtonClick = async () => {
    try {
      if (!profile) {
        handleNoProfileInPublicTemplate();
        return;
      }

      if (!product) {
        handleShowError(3);
        return;
      }
      setIsBuyButtonLoading(true);

      const { id: profileId } = profile;
      const { price, profileId: productOwnerId } = product;
      const quantity = 1;

      const { errors, response } = await createOrderByProfileId({
        profileId,
        amount: quantity * price,
      });

      const result = handleAPIResponse(errors, response);

      if (result) {
        const { id: orderId } = result as Order;

        const { errors } = await createOrderItemsByOrderId({
          orderId,
          price,
          productId,
          quantity,
          productOwnerId,
        });

        if (errors) {
          handleShowError(3);
        } else {
          router.push(`/payment/${orderId}`);
        }
      }
    } finally {
      setIsBuyButtonLoading(false);
    }
  };

  useEffect(() => {
    if (product && product.images.length > 0) {
      setImgArr(product.images);
      setCurrentImg(product.images[0]);
    }
  }, [product]);

  useEffect(() => {
    if (imgArr.length > 0) {
      const imgTimer = setInterval(() => {
        setCurrentImg((prev) => {
          const imgIndex = imgArr.findIndex((img) => img === prev);
          const nextIndex = (imgIndex + 1) % imgArr.length;
          return imgArr[nextIndex];
        });
      }, 2000);

      return () => {
        clearInterval(imgTimer);
      };
    }
  }, [imgArr]);

  return {
    currentImg,
    heroImageHorizontalVariants,
    handleAddToCartButtonClick,
    handleBuyNowButtonClick,
    isAddToCartButtonLoading,
    isBuyButtonLoading,
  };
};

export default useSingleProductHeroImageContainerController;
