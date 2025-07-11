import type { Prisma } from "@prisma/client";

// Product types
export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    reviews: true;
    profile: {
      select: {
        id: true;
        name: true;
        username: true;
        email: true;
      };
    };
  };
}>;

export type ProductSummary = Pick<
  ProductWithRelations,
  "id" | "name" | "price" | "images" | "category" | "brand" | "stock"
>;

// User types
export type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    Profile: true;
  };
}>;

export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    Profile: true;
    accounts: {
      select: {
        id: true;
        providerId: true;
        providerAccountId: true;
      };
    };
  };
}>;

// Order types
export type OrderWithItems = Prisma.OrderGetPayload<{
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

export type OrderItemWithProduct = Prisma.OrderItemGetPayload<{
  include: {
    product: true;
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

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: {
    product: true;
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

// Review types
export type ReviewWithUser = Prisma.ReviewGetPayload<{
  include: {
    product: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

// Database operation types
export interface DatabaseFilters {
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
  status?: string;
  category?: string;
  tags?: string[];
}

export interface SortOptions {
  field: string;
  order: "asc" | "desc";
}

export interface QueryOptions {
  filters?: DatabaseFilters;
  sort?: SortOptions;
  pagination?: {
    page: number;
    limit: number;
  };
  include?: Record<string, boolean | object>;
  select?: Record<string, boolean>;
}

// Aggregation types
export interface CountResult {
  total: number;
  [key: string]: number;
}

export interface AggregationResult {
  count: CountResult;
  sum?: Record<string, number>;
  avg?: Record<string, number>;
  min?: Record<string, number>;
  max?: Record<string, number>;
}

// Transaction types
export interface TransactionOptions {
  timeout?: number;
  isolationLevel?: Prisma.TransactionIsolationLevel;
}

export type TransactionClient = any; // Simplified for compatibility

// Audit types
export interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId?: string;
  changes: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

// Soft delete types
export interface SoftDeletable {
  deletedAt?: Date | null;
  isDeleted?: boolean;
}

// Timestamped types
export interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}
