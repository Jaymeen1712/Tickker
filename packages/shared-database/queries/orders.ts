"use server";

import type {
  OrderFilters,
  OrderWithRelations,
  PaginatedResult,
  QueryResult,
} from "../types.js";
import {
  buildOrderWhereClause,
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

// Fetch orders with filtering and pagination
export async function fetchOrders(
  filters: OrderFilters = {},
  pagination: { page?: number; limit?: number } = {}
): Promise<QueryResult<PaginatedResult<OrderWithRelations>>> {
  return withErrorHandling(async () => {
    if (!db) {
      throw new Error("Database not available");
    }

    const { page = 1, limit = 20 } = pagination;
    const { skip, take } = createPaginationOptions(page, limit);

    const where = buildOrderWhereClause(filters);

    const [orders, total] = await Promise.all([
      db.order.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          orderItems: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  images: true,
                },
              },
            },
          },
          profile: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      db.order.count({ where }),
    ]);

    return createPaginatedResult(orders, total, page, limit);
  });
}

// Fetch single order by ID
export async function fetchOrderById(
  id: string
): Promise<QueryResult<OrderWithRelations | null>> {
  return withErrorHandling(async () => {
    if (!db) {
      throw new Error("Database not available");
    }

    if (!isValidId(id)) {
      throw new Error("Invalid order ID format");
    }

    const order = await db.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        profile: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return order;
  });
}
