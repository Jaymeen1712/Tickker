"use client";
import { fetchAllProducts } from "@/db/queries";
import { handleAPIResponse } from "@/utils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { InputProps } from "../ui/input";

const useDashboardController = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>();

  const router = useRouter();

  const handleSearchInputChange: InputProps["onChange"] = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputClick = () => {
    searchQuery && router.push(`/search?query=${searchQuery}`);
  };

  const handleGetAllProducts = useCallback(async () => {
    const { errors, response } = await fetchAllProducts();

    const result = handleAPIResponse(errors, response);

    if (result) {
      setProducts(result);
    }
  }, []);

  useEffect(() => {
    handleGetAllProducts();
  }, [handleGetAllProducts]);

  return { products, handleSearchInputChange, handleSearchInputClick };
};

export default useDashboardController;
