// Export all types
export * from "./api";
export * from "./auth";
export * from "./database";
export * from "./ui";

// Common utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Object utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// Function utility types
export type AsyncFunction<T extends unknown[] = unknown[], R = unknown> = (
  ...args: T
) => Promise<R>;

export type SyncFunction<T extends unknown[] = unknown[], R = unknown> = (
  ...args: T
) => R;

export type AnyFunction<T extends unknown[] = unknown[], R = unknown> = 
  | SyncFunction<T, R> 
  | AsyncFunction<T, R>;

// Array utility types
export type NonEmptyArray<T> = [T, ...T[]];

export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

// String utility types
export type StringLiteral<T> = T extends string 
  ? string extends T 
    ? never 
    : T 
  : never;

// ID types
export type ID = string;
export type UUID = string;
export type CUID = string;

// Timestamp types
export type Timestamp = Date | string | number;

// Environment types
export type Environment = "development" | "staging" | "production" | "test";

// Status types
export type Status = "active" | "inactive" | "pending" | "suspended";

// Generic CRUD operations
export interface CRUDOperations<T, CreateInput, UpdateInput> {
  create: (input: CreateInput) => Promise<T>;
  read: (id: ID) => Promise<T | null>;
  update: (id: ID, input: UpdateInput) => Promise<T>;
  delete: (id: ID) => Promise<boolean>;
  list: (params?: Record<string, unknown>) => Promise<T[]>;
}

// Error types
export interface ErrorWithCode extends Error {
  code: string;
  statusCode?: number;
}

export interface ValidationError extends Error {
  field: string;
  value: unknown;
  constraint: string;
}

// Configuration types
export interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: Environment;
    url: string;
  };
  database: {
    url: string;
    poolSize?: number;
  };
  auth: {
    secret: string;
    expiresIn: string;
    providers: string[];
  };
  storage: {
    provider: string;
    bucket: string;
    region?: string;
  };
  email: {
    provider: string;
    from: string;
    apiKey?: string;
  };
}

// Feature flags
export interface FeatureFlags {
  [key: string]: boolean;
}

// Metadata types
export interface Metadata {
  [key: string]: string | number | boolean | null;
}

// Audit trail
export interface AuditTrail {
  createdBy: ID;
  createdAt: Timestamp;
  updatedBy?: ID;
  updatedAt?: Timestamp;
  version: number;
}
