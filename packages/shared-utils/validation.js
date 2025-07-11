"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationSchema = exports.ReviewSchema = exports.OrderSchema = exports.UpdateCartItemSchema = exports.CartItemSchema = exports.ProductFilterSchema = exports.FileUploadSchema = exports.ProductUpdateSchema = exports.ProductSchema = void 0;
const z = __importStar(require("zod"));
const constants_1 = require("./constants");
// Product validation schemas
exports.ProductSchema = z.object({
    name: z.string().min(1, "Product name is required").max(255),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().positive("Price must be positive"),
    stock: z.number().int().min(0, "Stock cannot be negative"),
    model: z.string().min(1, "Model is required"),
    brand: z.enum(constants_1.WATCH_BRANDS, { required_error: "Brand is required" }),
    category: z.enum(constants_1.PRODUCT_CATEGORIES, { required_error: "Category is required" }),
    movement: z.enum(constants_1.MOVEMENT_TYPES, { required_error: "Movement type is required" }),
    caseMaterial: z.enum(constants_1.CASE_MATERIALS, { required_error: "Case material is required" }),
    strap: z.enum(constants_1.STRAP_TYPES, { required_error: "Strap type is required" }),
    waterResistance: z.enum(constants_1.WATER_RESISTANCE_LEVELS, { required_error: "Water resistance is required" }),
    caseDiameter: z.string().min(1, "Case diameter is required"),
    dialColor: z.string().min(1, "Dial color is required"),
    buckle: z.string().min(1, "Buckle type is required"),
    strapSize: z.string().min(1, "Strap size is required"),
    isVisible: z.boolean().default(true),
});
exports.ProductUpdateSchema = exports.ProductSchema.partial();
// File upload validation
exports.FileUploadSchema = z.object({
    file: z
        .instanceof(File)
        .refine((file) => file.size <= constants_1.MAX_FILE_SIZE, "File size must be less than 20MB")
        .refine((file) => constants_1.ALLOWED_IMAGE_TYPES.includes(file.type), "Only JPEG, PNG, and WebP images are allowed"),
});
// Search and filter schemas
exports.ProductFilterSchema = z.object({
    search: z.string().optional(),
    category: z.enum(constants_1.PRODUCT_CATEGORIES).optional(),
    brand: z.enum(constants_1.WATCH_BRANDS).optional(),
    movement: z.enum(constants_1.MOVEMENT_TYPES).optional(),
    caseMaterial: z.enum(constants_1.CASE_MATERIALS).optional(),
    strap: z.enum(constants_1.STRAP_TYPES).optional(),
    waterResistance: z.enum(constants_1.WATER_RESISTANCE_LEVELS).optional(),
    priceMin: z.number().min(0).optional(),
    priceMax: z.number().min(0).optional(),
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(12),
    sortBy: z.enum(["name", "price", "createdAt", "updatedAt"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
// Cart validation
exports.CartItemSchema = z.object({
    productId: z.string().cuid(),
    quantity: z.number().int().min(1, "Quantity must be at least 1"),
});
exports.UpdateCartItemSchema = z.object({
    quantity: z.number().int().min(0, "Quantity cannot be negative"),
});
// Order validation
exports.OrderSchema = z.object({
    items: z.array(exports.CartItemSchema).min(1, "Order must contain at least one item"),
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
exports.ReviewSchema = z.object({
    productId: z.string().cuid(),
    comment: z.string().min(10, "Review must be at least 10 characters").max(1000),
    rating: z.number().int().min(1).max(5),
});
// Pagination validation
exports.PaginationSchema = z.object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(12),
});
