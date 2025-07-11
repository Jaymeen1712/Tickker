"use server";
import {
  fetchProducts,
  type ProductFilters,
  type ProductSortOptions,
} from "@repo/shared-database";

export const fetchAllProducts = async ({
  filters = {},
  sortOptions = {},
  pagination = {},
}: {
  filters?: ProductFilters;
  sortOptions?: ProductSortOptions;
  pagination?: { page?: number; limit?: number };
}) => {
  const result = await fetchProducts(filters, sortOptions, pagination);
  return {
    errors: result.success ? null : [result.error],
    response: result.data,
  };
};

export const fetchSingleProductById = async (id: string) => {
  const { fetchProductById } = await import("@repo/shared-database");
  const result = await fetchProductById(id, true);
  return {
    errors: result.success ? null : [result.error || "Product not found"],
    response: result.data,
  };
};

export const fetchProductsBySearchQuery = async (
  searchQuery: string | undefined,
  count?: number,
) => {
  if (!searchQuery) {
    return { errors: null, response: [] };
  }

  const { searchProducts } = await import("@repo/shared-database");
  const result = await searchProducts(searchQuery, count || 10);
  return {
    errors: result.success ? null : [result.error],
    response: result.data || [],
  };
};

export const fetchSimilarProductsByCategory = async (
  productId: string,
  category: string,
  limit?: number,
) => {
  const { fetchSimilarProducts } = await import("@repo/shared-database");
  const result = await fetchSimilarProducts(productId, category, limit || 6);
  return {
    errors: result.success ? null : [result.error],
    response: result.data || [],
  };
};

export const fetchDashboardProduct = async () => {
  // This function should be removed or made configurable
  // Hardcoded IDs are not good practice
  const { fetchProductById } = await import("@repo/shared-database");
  const result = await fetchProductById("cm3ih8tyu00012gvdupdywack", true);
  return {
    errors: result.success ? null : [result.error || "Product not found"],
    response: result.data,
  };
};
