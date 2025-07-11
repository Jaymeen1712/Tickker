import { publicRoutes } from "./constants.js";

// Route checking utilities
export function checkIsPublicRoute(pathname: string): boolean {
  return publicRoutes.some((route) => {
    if (route.includes("[id]")) {
      const pattern = route.replace("[id]", "[^/]+");
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname);
    }
    return route === pathname;
  });
}

// Error handling utilities
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: string[];
}

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
  };
}

export function createErrorResponse(error: string | string[]): ApiResponse {
  return {
    success: false,
    error: Array.isArray(error) ? error[0] || "Unknown error" : error,
    errors: Array.isArray(error) ? error : [error],
  };
}

// Async error handling wrapper
export async function handleAsyncOperation<T>(
  operation: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const result = await operation();
    return createSuccessResponse(result);
  } catch (error) {
    console.error("Async operation failed:", error);
    return createErrorResponse(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}

// URL and slug utilities
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateProductUrl(id: string, name: string): string {
  const slug = createSlug(name);
  return `/products/${id}/${slug}`;
}

// Price utilities
export function calculateDiscountedPrice(
  originalPrice: number,
  discountPercentage: number
): number {
  return originalPrice * (1 - discountPercentage / 100);
}

export function calculateTax(amount: number, taxRate: number = 0.08): number {
  return amount * taxRate;
}

export function calculateTotal(
  subtotal: number,
  tax: number = 0,
  shipping: number = 0
): number {
  return subtotal + tax + shipping;
}

// Array utilities
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

// Object utilities
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

// Date utilities
export function isDateInRange(
  date: Date,
  startDate: Date,
  endDate: Date
): boolean {
  return date >= startDate && date <= endDate;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
