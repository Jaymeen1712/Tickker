"use server";

import { Prisma } from "@prisma/client";
import type {
  PaginatedResult,
  QueryResult,
  UserFilters,
  UserWithRelations,
} from "../types.js";
import {
  buildUserWhereClause,
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

// Fetch user by ID
export async function fetchUserById(
  id: string,
  includeRelations: boolean = false
): Promise<QueryResult<UserWithRelations | null>> {
  return withErrorHandling(async () => {
    if (!isValidId(id)) {
      throw new Error("Invalid user ID format");
    }

    const user = await db.user.findUnique({
      where: { id },
      include: includeRelations
        ? {
            Profile: true,
            accounts: {
              select: {
                id: true,
                providerId: true,
                providerAccountId: true,
              },
            },
          }
        : undefined,
    });

    return user;
  });
}

// Fetch user by email
export async function fetchUserByEmail(
  email: string,
  includeRelations: boolean = false
): Promise<QueryResult<UserWithRelations | null>> {
  return withErrorHandling(async () => {
    if (!email?.trim()) {
      throw new Error("Email is required");
    }

    const user = await db.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: includeRelations
        ? {
            Profile: true,
            accounts: {
              select: {
                id: true,
                providerId: true,
                providerAccountId: true,
              },
            },
          }
        : undefined,
    });

    return user;
  });
}

// Fetch users with filtering and pagination
export async function fetchUsers(
  filters: UserFilters = {},
  pagination: { page?: number; limit?: number } = {}
): Promise<QueryResult<PaginatedResult<UserWithRelations>>> {
  return withErrorHandling(async () => {
    const { page = 1, limit = 20 } = pagination;
    const { skip, take } = createPaginationOptions(page, limit);

    const where = buildUserWhereClause(filters);

    const [users, total] = await Promise.all([
      db.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
        include: {
          Profile: {
            select: {
              id: true,
              name: true,
              username: true,
              email: true,
            },
          },
          accounts: {
            select: {
              id: true,
              providerId: true,
            },
          },
        },
      }),
      db.user.count({ where }),
    ]);

    return createPaginatedResult(users, total, page, limit);
  });
}

// Create user with validation
export async function createUser(
  data: Prisma.UserCreateInput
): Promise<QueryResult<UserWithRelations>> {
  return withErrorHandling(async () => {
    // Validate required fields
    if (!data.email?.trim()) {
      throw new Error("Email is required");
    }

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: data.email.toLowerCase().trim() },
      select: { id: true },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const user = await db.user.create({
      data: {
        ...data,
        email: data.email.toLowerCase().trim(),
        name: data.name?.trim(),
      },
      include: {
        Profile: true,
        accounts: true,
      },
    });

    return user;
  });
}

// Update user with validation
export async function updateUser(
  id: string,
  data: Prisma.UserUpdateInput
): Promise<QueryResult<UserWithRelations>> {
  return withErrorHandling(async () => {
    if (!isValidId(id)) {
      throw new Error("Invalid user ID format");
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // If updating email, check for conflicts
    if (data.email && data.email !== existingUser.email) {
      const emailConflict = await db.user.findUnique({
        where: { email: data.email as string },
        select: { id: true },
      });

      if (emailConflict && emailConflict.id !== id) {
        throw new Error("Email is already in use");
      }
    }

    const user = await db.user.update({
      where: { id },
      data: {
        ...data,
        email: data.email
          ? (data.email as string).toLowerCase().trim()
          : undefined,
        name: data.name ? (data.name as string).trim() : undefined,
        updatedAt: new Date(),
      },
      include: {
        Profile: true,
        accounts: true,
      },
    });

    return user;
  });
}

// Delete user
export async function deleteUser(id: string): Promise<QueryResult<boolean>> {
  return withErrorHandling(async () => {
    if (!isValidId(id)) {
      throw new Error("Invalid user ID format");
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existingUser) {
      throw new Error("User not found");
    }

    await db.user.delete({
      where: { id },
    });

    return true;
  });
}

// Get user statistics
export async function getUserStats(): Promise<
  QueryResult<{
    total: number;
    admins: number;
    standard: number;
    withProfiles: number;
  }>
> {
  return withErrorHandling(async () => {
    const [total, admins, standard, withProfiles] = await Promise.all([
      db.user.count(),
      db.user.count({
        where: {
          roles: {
            has: "ADMIN",
          },
        },
      }),
      db.user.count({
        where: {
          roles: {
            has: "STANDARD",
          },
        },
      }),
      db.user.count({
        where: {
          Profile: {
            isNot: null,
          },
        },
      }),
    ]);

    return {
      total,
      admins,
      standard,
      withProfiles,
    };
  });
}
