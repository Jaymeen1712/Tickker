import { Prisma } from "@prisma/client";
import { handleAsyncOperation } from "@repo/shared-utils";
import type {
  OrderFilters,
  PaginatedResult,
  ProductFilters,
  ProductSortOptions,
  QueryResult,
  UserFilters,
} from "./types.js";

// Error handling wrapper for database operations
export async function withErrorHandling<T>(
  operation: () => Promise<T>
): Promise<QueryResult<T>> {
  const result = await handleAsyncOperation(operation);
  const queryResult: QueryResult<T> = {
    success: result.success,
  };

  if (result.data !== undefined) {
    queryResult.data = result.data;
  }

  if (result.error !== undefined) {
    queryResult.error = result.error;
  }

  if (result.errors !== undefined) {
    queryResult.errors = result.errors;
  }

  return queryResult;
}

// Pagination utility
export function createPaginationOptions(
  page: number = 1,
  limit: number = 12
): { skip: number; take: number } {
  const skip = (page - 1) * limit;
  return { skip, take: limit };
}

// Create paginated result
export function createPaginatedResult<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
): PaginatedResult<T> {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    },
  };
}

// Build product where clause
export function buildProductWhereClause(
  filters: ProductFilters
): Prisma.ProductWhereInput {
  const where: Prisma.ProductWhereInput = {};

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
      { category: { contains: filters.search, mode: "insensitive" } },
      { brand: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters.category) {
    where.category = filters.category;
  }

  if (filters.brand) {
    where.brand = filters.brand;
  }

  if (filters.movement) {
    where.movement = filters.movement;
  }

  if (filters.caseMaterial) {
    where.caseMaterial = filters.caseMaterial;
  }

  if (filters.strap) {
    where.strap = filters.strap;
  }

  if (filters.waterResistance) {
    where.waterResistance = filters.waterResistance;
  }

  if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
    where.price = {};
    if (filters.priceMin !== undefined) {
      where.price.gte = filters.priceMin;
    }
    if (filters.priceMax !== undefined) {
      where.price.lte = filters.priceMax;
    }
  }

  if (filters.isVisible !== undefined) {
    where.isVisible = filters.isVisible;
  }

  if (filters.profileId) {
    where.profileId = filters.profileId;
  }

  return where;
}

// Build product order by clause
export function buildProductOrderBy(
  sortOptions: ProductSortOptions
): Prisma.ProductOrderByWithRelationInput {
  const { sortBy = "createdAt", sortOrder = "desc" } = sortOptions;
  return { [sortBy]: sortOrder };
}

// Build user where clause
export function buildUserWhereClause(
  filters: UserFilters
): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {};

  if (filters.email) {
    where.email = filters.email;
  }

  if (filters.roles && filters.roles.length > 0) {
    where.roles = {
      hasSome: filters.roles,
    };
  }

  return where;
}

// Build order where clause
export function buildOrderWhereClause(
  filters: OrderFilters
): Prisma.OrderWhereInput {
  const where: Prisma.OrderWhereInput = {};

  if (filters.profileId) {
    where.profileId = filters.profileId;
  }

  if (filters.paymentStatus) {
    where.paymentStatus = filters.paymentStatus as any;
  }

  if (filters.dateFrom || filters.dateTo) {
    where.createdAt = {};
    if (filters.dateFrom) {
      where.createdAt.gte = filters.dateFrom;
    }
    if (filters.dateTo) {
      where.createdAt.lte = filters.dateTo;
    }
  }

  return where;
}

// Validate ID format
export function isValidId(id: string): boolean {
  // Check if it's a valid CUID or UUID
  const cuidRegex = /^c[a-z0-9]{24}$/;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return cuidRegex.test(id) || uuidRegex.test(id);
}

// Create cache key
export function createCacheKey(
  prefix: string,
  params: Record<string, any>
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}:${params[key]}`)
    .join("|");
  return `${prefix}:${sortedParams}`;
}

// Sanitize input for database queries
export function sanitizeInput(input: any): any {
  if (typeof input === "string") {
    return input.trim();
  }
  if (typeof input === "object" && input !== null) {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return input;
}
