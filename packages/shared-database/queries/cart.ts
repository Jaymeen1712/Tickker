"use server";

import type { CartWithItems, QueryResult } from "../types.js";
import { isValidId, withErrorHandling } from "../utils.js";

// Import db dynamically to avoid circular dependencies
async function getDb() {
  try {
    const { db } = await import("@repo/database");
    return db;
  } catch (error) {
    console.error("Failed to import database:", error);
    return null;
  }
}

// Fetch cart by profile ID
export async function fetchCartByProfileId(
  profileId: string
): Promise<QueryResult<CartWithItems | null>> {
  return withErrorHandling(async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    if (!isValidId(profileId)) {
      throw new Error("Invalid profile ID format");
    }

    const cart = await db.cart.findUnique({
      where: { profileId },
      include: {
        cartItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
                stock: true,
              },
            },
          },
        },
        profile: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return cart;
  });
}
