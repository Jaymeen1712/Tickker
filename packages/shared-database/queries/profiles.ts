"use server";

import type { ProfileWithUser, QueryResult } from "../types.js";
import { isValidId, withErrorHandling } from "../utils.js";

// Import db dynamically to avoid circular dependencies
let db: any;
try {
  db = require("@repo/database").db;
} catch (error) {
  // Fallback for build time
  db = null;
}

// Fetch profile by ID
export async function fetchProfileById(
  id: string
): Promise<QueryResult<ProfileWithUser | null>> {
  return withErrorHandling(async () => {
    if (!db) {
      throw new Error("Database not available");
    }

    if (!isValidId(id)) {
      throw new Error("Invalid profile ID format");
    }

    const profile = await db.profile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            roles: true,
          },
        },
      },
    });

    return profile;
  });
}

// Fetch profile by user ID
export async function fetchProfileByUserId(
  userId: string
): Promise<QueryResult<ProfileWithUser | null>> {
  return withErrorHandling(async () => {
    if (!db) {
      throw new Error("Database not available");
    }

    if (!isValidId(userId)) {
      throw new Error("Invalid user ID format");
    }

    const profile = await db.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            roles: true,
          },
        },
      },
    });

    return profile;
  });
}
