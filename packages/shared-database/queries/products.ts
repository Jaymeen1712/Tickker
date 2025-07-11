"use server";

import { Prisma } from "@prisma/client";
import type {
  PaginatedResult,
  ProductFilters,
  ProductSortOptions,
  ProductWithRelations,
  QueryResult,
} from "../types.js";
import {
  buildProductOrderBy,
  buildProductWhereClause,
  createPaginatedResult,
  createPaginationOptions,
  isValidId,
  withErrorHandling,
} from "../utils.js";

// Import db dynamically to avoid circular dependencies
let db: any;
try {
  db = require("@repo/database").db;
} catch (error) {
  // Fallback for build time
  db = null;
}

// Fetch products with advanced filtering and pagination
export async function fetchProducts(
  filters: ProductFilters = {},
  sortOptions: ProductSortOptions = {},
  pagination: { page?: number; limit?: number } = {}
): Promise<QueryResult<PaginatedResult<ProductWithRelations>>> {
  return withErrorHandling(async () => {
    const { page = 1, limit = 12 } = pagination;
    const { skip, take } = createPaginationOptions(page, limit);

    const where = buildProductWhereClause(filters);
    const orderBy = buildProductOrderBy(sortOptions);

    const [products, total] = await Promise.all([
      db.product.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          reviews: {
            take: 5,
            orderBy: { createdAt: "desc" },
          },
          profile: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      }),
      db.product.count({ where }),
    ]);

    return createPaginatedResult(products, total, page, limit);
  });
}

// Fetch single product by ID with relations
export async function fetchProductById(
  id: string,
  includeRelations: boolean = true
): Promise<QueryResult<ProductWithRelations | null>> {
  return withErrorHandling(async () => {
    if (!isValidId(id)) {
      throw new Error("Invalid product ID format");
    }

    const product = await db.product.findUnique({
      where: { id },
      include: includeRelations
        ? {
            reviews: {
              orderBy: { createdAt: "desc" },
              take: 10,
            },
            profile: {
              select: {
                id: true,
                name: true,
                username: true,
                email: true,
              },
            },
          }
        : undefined,
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  });
}

// Search products with optimized query
export async function searchProducts(
  searchQuery: string,
  limit: number = 10
): Promise<QueryResult<ProductWithRelations[]>> {
  return withErrorHandling(async () => {
    if (!searchQuery.trim()) {
      return [];
    }

    const products = await db.product.findMany({
      where: {
        AND: [
          { isVisible: true },
          {
            OR: [
              { name: { contains: searchQuery, mode: "insensitive" } },
              { description: { contains: searchQuery, mode: "insensitive" } },
              { category: { contains: searchQuery, mode: "insensitive" } },
              { brand: { contains: searchQuery, mode: "insensitive" } },
            ],
          },
        ],
      },
      take: limit,
      orderBy: [
        { name: "asc" }, // Prioritize exact name matches
        { createdAt: "desc" },
      ],
      include: {
        reviews: false, // Don't include reviews for search results
        profile: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return products;
  });
}

// Fetch similar products by category
export async function fetchSimilarProducts(
  productId: string,
  category: string,
  limit: number = 6
): Promise<QueryResult<ProductWithRelations[]>> {
  return withErrorHandling(async () => {
    const products = await db.product.findMany({
      where: {
        AND: [{ id: { not: productId } }, { category }, { isVisible: true }],
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        category: true,
        brand: true,
        reviews: false,
        profile: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return products;
  });
}

// Create product with validation
export async function createProduct(
  data: Prisma.ProductCreateInput
): Promise<QueryResult<ProductWithRelations>> {
  return withErrorHandling(async () => {
    // Validate required fields
    if (!data.name?.trim()) {
      throw new Error("Product name is required");
    }
    if (!data.price || data.price <= 0) {
      throw new Error("Valid price is required");
    }
    if (!data.stock || data.stock < 0) {
      throw new Error("Valid stock quantity is required");
    }

    const product = await db.product.create({
      data: {
        ...data,
        name: data.name.trim(),
        description: data.description?.trim(),
      },
      include: {
        reviews: true,
        profile: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return product;
  });
}

// Update product with validation
export async function updateProduct(
  id: string,
  data: Prisma.ProductUpdateInput
): Promise<QueryResult<ProductWithRelations>> {
  return withErrorHandling(async () => {
    if (!isValidId(id)) {
      throw new Error("Invalid product ID format");
    }

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const product = await db.product.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
      include: {
        reviews: true,
        profile: {
          select: {
            id: true,
            name: true,
            username: true,
          },
        },
      },
    });

    return product;
  });
}

// Delete product
export async function deleteProduct(id: string): Promise<QueryResult<boolean>> {
  return withErrorHandling(async () => {
    if (!isValidId(id)) {
      throw new Error("Invalid product ID format");
    }

    await db.product.delete({
      where: { id },
    });

    return true;
  });
}

// Get product statistics
export async function getProductStats(profileId?: string): Promise<
  QueryResult<{
    total: number;
    visible: number;
    hidden: number;
    outOfStock: number;
  }>
> {
  return withErrorHandling(async () => {
    const where = profileId ? { profileId } : {};

    const [total, visible, hidden, outOfStock] = await Promise.all([
      db.product.count({ where }),
      db.product.count({ where: { ...where, isVisible: true } }),
      db.product.count({ where: { ...where, isVisible: false } }),
      db.product.count({ where: { ...where, stock: 0 } }),
    ]);

    return {
      total,
      visible,
      hidden,
      outOfStock,
    };
  });
}
