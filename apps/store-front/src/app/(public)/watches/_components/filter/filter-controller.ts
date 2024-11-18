"use client";
import { ProductFilterSchema } from "@/schemas";
import { useAppStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const useWatchesFilterController = () => {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const form = useForm<z.infer<typeof ProductFilterSchema>>({
    resolver: zodResolver(ProductFilterSchema),
    defaultValues: {
      brand: "",
      buckle: "",
      caseMaterial: "",
      category: "",
      movement: "",
      strap: "",
      strapSize: "",
      waterResistance: "",
    },
  });

  const { setProductAdvanceFilters, productAdvanceFilters } = useAppStore();

  const productAdvanceFilterCount = useMemo(
    () =>
      productAdvanceFilters
        ? Object.entries(productAdvanceFilters).filter(
            ([key, value]) =>
              value && key !== "caseDiameter" && key !== "dialColor",
          ).length
        : 0,
    [productAdvanceFilters],
  );

  const onSubmit = (values: z.infer<typeof ProductFilterSchema>) => {
    const cleanedValues = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value || undefined]),
    );

    setProductAdvanceFilters(cleanedValues);
    setIsFilterSheetOpen(false);
  };

  const handleResetFilters = () => {
    form.reset({
      brand: "",
      buckle: "",
      caseMaterial: "",
      category: "",
      movement: "",
      strap: "",
      strapSize: "",
      waterResistance: "",
    });
    setProductAdvanceFilters({
      brand: undefined,
      buckle: undefined,
      caseMaterial: undefined,
      category: undefined,
      movement: undefined,
      strap: undefined,
      strapSize: undefined,
      waterResistance: undefined,
    });
  };

  const handlePrimaryFilterClick = (
    filter: Partial<Record<"caseDiameter" | "dialColor", string | undefined>>,
  ) => {
    setProductAdvanceFilters(filter);
  };

  useEffect(() => {
    if (productAdvanceFilters) {
      const {
        brand = "",
        buckle = "",
        caseMaterial = "",
        category = "",
        movement = "",
        strap = "",
        strapSize = "",
        waterResistance = "",
      } = productAdvanceFilters;

      form.reset({
        brand,
        buckle,
        caseMaterial,
        category,
        movement,
        strap,
        strapSize,
        waterResistance,
      });
    }
  }, [productAdvanceFilters, isFilterSheetOpen, form]);

  return {
    form,
    onSubmit,
    isFilterSheetOpen,
    setIsFilterSheetOpen,
    handleResetFilters,
    handlePrimaryFilterClick,
    productAdvanceFilterCount,
    productAdvanceFilters,
  };
};

export default useWatchesFilterController;
