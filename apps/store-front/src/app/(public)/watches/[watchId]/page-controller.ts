"use client";
import {
  fetchSimilarProductsByCategory,
  fetchSingleProductById,
} from "@/db/queries";
import { handleAPIResponse } from "@/utils";
import { Product } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

interface SingleWatchPageControllerProps {
  productId: string;
}

const useSingleWatchPageController = ({
  productId,
}: SingleWatchPageControllerProps) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [similarProducts, setSimilarProducts] = useState<
    | {
        id: string;
        images: string[];
      }[]
    | undefined
  >(undefined);

  const handleGetProduct = useCallback(async () => {
    try {
      const { errors, response } = await fetchSingleProductById(productId);
      const result = handleAPIResponse(errors, response);
      if (result) {
        setProduct(result);
      }
    } finally {
    }
  }, [productId]);

  const handleGetSimilarProductsByCategory = async (
    category: string,
    id: string,
  ) => {
    try {
      const { errors, response } =
        await fetchSimilarProductsByCategory(category);

      const result = handleAPIResponse(errors, response);

      if (result) {
        setSimilarProducts(
          result.filter(
            (subResult: { id: string; images: string[] }) =>
              subResult.id !== id,
          ),
        );
      }
    } finally {
    }
  };

  useEffect(() => {
    if (!product) {
      return;
    }

    const { category, id } = product;

    handleGetSimilarProductsByCategory(category, id);
  }, [product]);

  useEffect(() => {
    handleGetProduct();
  }, [handleGetProduct]);

  return { product, similarProducts };
};

export default useSingleWatchPageController;
