"use client";

import { fetchAllProducts } from "@/db/queries";
import { useAppStore } from "@/store";
import { handleAPIResponse } from "@/utils";
import { Product } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

const useWatchesPageController = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categorizedProducts, setCategorizedProducts] = useState<
    Record<string, Product[]>
  >({});

  const { productAdvanceFilters, resetProductAdvanceFilters } = useAppStore();

  const handleGetAllProducts = useCallback(async () => {
    const { errors, response } = await fetchAllProducts({
      filters: productAdvanceFilters,
    });

    const result = handleAPIResponse(errors, response);

    if (result) {
      setProducts(result);
    }
  }, [productAdvanceFilters]);

  useEffect(() => {
    if (products) {
      const categorizedProducts = products.reduce(
        (acc: Record<string, Product[]>, cur: Product) => {
          if (!acc[cur.category]) {
            acc[cur.category] = [];
          }
          acc[cur.category].push(cur);
          return acc;
        },
        {},
      );

      setCategorizedProducts(categorizedProducts);
    }
  }, [products]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  useEffect(() => {
    return () => {
      resetProductAdvanceFilters();
    };
  }, [resetProductAdvanceFilters]);

  return { isScrolled, categorizedProducts };
};

export default useWatchesPageController;
