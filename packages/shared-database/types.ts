import { Prisma } from "@prisma/client";

// Base query result type
export interface QueryResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
}

// Pagination types
export interface PaginationOptions {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    nextCursor?: string;
    prevCursor?: string;
  };
}

// Product query types
export interface ProductFilters {
  search?: string;
  category?: string;
  brand?: string;
  movement?: string;
  caseMaterial?: string;
  strap?: string;
  waterResistance?: string;
  priceMin?: number;
  priceMax?: number;
  isVisible?: boolean;
  profileId?: string;
}

export interface ProductSortOptions {
  sortBy?: "name" | "price" | "createdAt" | "updatedAt";
  sortOrder?: "asc" | "desc";
}

// User query types
export interface UserFilters {
  email?: string;
  roles?: ("ADMIN" | "STANDARD")[];
  isActive?: boolean;
}

// Order query types
export interface OrderFilters {
  profileId?: string;
  paymentStatus?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Cache configuration
export interface CacheConfig {
  ttl?: number; // Time to live in seconds
  key?: string;
  tags?: string[];
}

// Query options
export interface QueryOptions {
  cache?: CacheConfig;
  include?: Record<string, any>;
  select?: Record<string, any>;
}

// Product with relations
export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
    profile: true;
  };
}>;

// Order with relations
export type OrderWithRelations = Prisma.OrderGetPayload<{
  include: {
    orderItems: {
      include: {
        product: {
          select: {
            id: true;
            name: true;
            price: true;
            images: true;
          };
        };
      };
    };
    profile: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
  };
}>;

// Cart with relations
export type CartWithRelations = Prisma.CartGetPayload<{
  include: {
    cartItems: {
      include: {
        product: true;
      };
    };
    profile: true;
  };
}>;

// User with relations
export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    Profile: true;
    accounts: true;
  };
}>;

// Cart types
export type CartWithItems = Prisma.CartGetPayload<{
  include: {
    cartItems: {
      include: {
        product: {
          select: {
            id: true;
            name: true;
            price: true;
            images: true;
            stock: true;
          };
        };
      };
    };
    profile: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

// Profile types
export type ProfileWithUser = Prisma.ProfileGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        email: true;
        roles: true;
      };
    };
  };
}>;
