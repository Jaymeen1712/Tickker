"use client";
import { fetchAllProducts } from "@/db/queries";
import { handleAPIResponse } from "@/utils";
import { Product } from "@prisma/client";
import { Variants } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { InputProps } from "../ui/input";

const heroRemainingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "easeOut",
      delay: 0.3,
    },
  },
};

const useRemainingDashboardContainerController = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>();
  const [categorizedProducts, setCategorizedProducts] = useState<
    Record<string, Product[]>
  >({});

  const router = useRouter();

  const handleSearchInputChange: InputProps["onChange"] = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputClick = () => {
    searchQuery && router.push(`/search?query=${searchQuery}`);
  };

  const handleGetAllProducts = useCallback(async () => {
    const { errors, response } = await fetchAllProducts({
      filters: {
        category: {
          in: ["Space timer jupiter", "Ceramics"],
        },
      },
    });

    const result = handleAPIResponse(errors, response);

    if (result) {
      setProducts(result);
    }
  }, []);

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
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  return {
    products,
    handleSearchInputChange,
    handleSearchInputClick,
    heroRemainingVariants,
    categorizedProducts,
  };
};

export default useRemainingDashboardContainerController;
