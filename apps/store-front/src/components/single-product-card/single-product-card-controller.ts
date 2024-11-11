"use client";

import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface SingleProductCardControllerProps {
  product: Product;
}

const useSingleProductCardController = ({
  product,
}: SingleProductCardControllerProps) => {
  const router = useRouter();
  const { id } = useMemo(() => product, [product]);

  const handleAddToWishlist = () => {
    try {
      // const {} = await
    } finally {
    }
  };

  const handleRedirectToProductPage = () => {
    router.push(`/watches/${id}`);
  };

  return { handleAddToWishlist, handleRedirectToProductPage };
};

export default useSingleProductCardController;
