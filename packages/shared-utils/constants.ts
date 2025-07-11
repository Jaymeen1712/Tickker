// Authentication routes
export const authRoutes = ["/login", "/register", "/reset-password"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/";

// Public routes that don't require authentication
export const publicRoutes = [
  "/",
  "/products",
  "/products/[id]",
  "/about",
  "/contact",
  "/api/auth/callback/credentials",
];

// Admin-specific routes
export const adminRoutes = [
  "/overview",
  "/products",
  "/orders",
  "/customers",
  "/analytics",
  "/settings",
];

// Product categories
export const PRODUCT_CATEGORIES = [
  "Luxury",
  "Sport",
  "Casual",
  "Dress",
  "Smart",
  "Vintage",
] as const;

// Watch brands
export const WATCH_BRANDS = [
  "Rolex",
  "Omega",
  "Seiko",
  "Casio",
  "Citizen",
  "Tissot",
  "TAG Heuer",
  "Breitling",
  "Patek Philippe",
  "Audemars Piguet",
] as const;

// Movement types
export const MOVEMENT_TYPES = [
  "Automatic",
  "Manual",
  "Quartz",
  "Solar",
  "Kinetic",
] as const;

// Case materials
export const CASE_MATERIALS = [
  "Stainless Steel",
  "Gold",
  "Titanium",
  "Ceramic",
  "Carbon Fiber",
  "Aluminum",
] as const;

// Strap types
export const STRAP_TYPES = [
  "Leather",
  "Metal",
  "Rubber",
  "Fabric",
  "Silicone",
  "NATO",
] as const;

// Water resistance levels
export const WATER_RESISTANCE_LEVELS = [
  "30m",
  "50m",
  "100m",
  "200m",
  "300m",
  "500m",
  "1000m",
] as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 100;

// File upload
export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Currency
export const DEFAULT_CURRENCY = "USD";
export const CURRENCY_SYMBOL = "$";
