import * as z from "zod";
import {
  ALLOWED_IMAGE_TYPES,
  CASE_MATERIALS,
  MAX_FILE_SIZE,
  MOVEMENT_TYPES,
  PRODUCT_CATEGORIES,
  STRAP_TYPES,
  WATCH_BRANDS,
  WATER_RESISTANCE_LEVELS,
} from "./constants.js";

// Product validation schemas
export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required").max(255),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  model: z.string().min(1, "Model is required"),
  brand: z.enum(WATCH_BRANDS, { required_error: "Brand is required" }),
  category: z.enum(PRODUCT_CATEGORIES, {
    required_error: "Category is required",
  }),
  movement: z.enum(MOVEMENT_TYPES, {
    required_error: "Movement type is required",
  }),
  caseMaterial: z.enum(CASE_MATERIALS, {
    required_error: "Case material is required",
  }),
  strap: z.enum(STRAP_TYPES, { required_error: "Strap type is required" }),
  waterResistance: z.enum(WATER_RESISTANCE_LEVELS, {
    required_error: "Water resistance is required",
  }),
  caseDiameter: z.string().min(1, "Case diameter is required"),
  dialColor: z.string().min(1, "Dial color is required"),
  buckle: z.string().min(1, "Buckle type is required"),
  strapSize: z.string().min(1, "Strap size is required"),
  isVisible: z.boolean().default(true),
});

export const ProductUpdateSchema = ProductSchema.partial();

// File upload validation
export const FileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 20MB"
    )
    .refine(
      (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
      "Only JPEG, PNG, and WebP images are allowed"
    ),
});

// Search and filter schemas
export const ProductFilterSchema = z.object({
  search: z.string().optional(),
  category: z.enum(PRODUCT_CATEGORIES).optional(),
  brand: z.enum(WATCH_BRANDS).optional(),
  movement: z.enum(MOVEMENT_TYPES).optional(),
  caseMaterial: z.enum(CASE_MATERIALS).optional(),
  strap: z.enum(STRAP_TYPES).optional(),
  waterResistance: z.enum(WATER_RESISTANCE_LEVELS).optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(12),
  sortBy: z
    .enum(["name", "price", "createdAt", "updatedAt"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Cart validation
export const CartItemSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const UpdateCartItemSchema = z.object({
  quantity: z.number().int().min(0, "Quantity cannot be negative"),
});

// Order validation
export const OrderSchema = z.object({
  items: z.array(CartItemSchema).min(1, "Order must contain at least one item"),
  shippingAddress: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  paymentMethod: z.enum(["credit_card", "paypal", "stripe"]),
});

// Review validation
export const ReviewSchema = z.object({
  productId: z.string().cuid(),
  comment: z
    .string()
    .min(10, "Review must be at least 10 characters")
    .max(1000),
  rating: z.number().int().min(1).max(5),
});

// Pagination validation
export const PaginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(12),
});

// Export types
export type ProductInput = z.infer<typeof ProductSchema>;
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>;
export type ProductFilter = z.infer<typeof ProductFilterSchema>;
export type CartItemInput = z.infer<typeof CartItemSchema>;
export type OrderInput = z.infer<typeof OrderSchema>;
export type ReviewInput = z.infer<typeof ReviewSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
