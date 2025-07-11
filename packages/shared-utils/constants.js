"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CURRENCY_SYMBOL = exports.DEFAULT_CURRENCY = exports.ALLOWED_IMAGE_TYPES = exports.MAX_FILE_SIZE = exports.MAX_PAGE_SIZE = exports.DEFAULT_PAGE_SIZE = exports.WATER_RESISTANCE_LEVELS = exports.STRAP_TYPES = exports.CASE_MATERIALS = exports.MOVEMENT_TYPES = exports.WATCH_BRANDS = exports.PRODUCT_CATEGORIES = exports.adminRoutes = exports.publicRoutes = exports.DEFAULT_LOGIN_REDIRECT = exports.apiAuthPrefix = exports.authRoutes = void 0;
// Authentication routes
exports.authRoutes = ["/login", "/register", "/reset-password"];
exports.apiAuthPrefix = "/api/auth";
exports.DEFAULT_LOGIN_REDIRECT = "/";
// Public routes that don't require authentication
exports.publicRoutes = [
    "/",
    "/products",
    "/products/[id]",
    "/about",
    "/contact",
    "/api/auth/callback/credentials",
];
// Admin-specific routes
exports.adminRoutes = [
    "/overview",
    "/products",
    "/orders",
    "/customers",
    "/analytics",
    "/settings",
];
// Product categories
exports.PRODUCT_CATEGORIES = [
    "Luxury",
    "Sport",
    "Casual",
    "Dress",
    "Smart",
    "Vintage",
];
// Watch brands
exports.WATCH_BRANDS = [
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
];
// Movement types
exports.MOVEMENT_TYPES = [
    "Automatic",
    "Manual",
    "Quartz",
    "Solar",
    "Kinetic",
];
// Case materials
exports.CASE_MATERIALS = [
    "Stainless Steel",
    "Gold",
    "Titanium",
    "Ceramic",
    "Carbon Fiber",
    "Aluminum",
];
// Strap types
exports.STRAP_TYPES = [
    "Leather",
    "Metal",
    "Rubber",
    "Fabric",
    "Silicone",
    "NATO",
];
// Water resistance levels
exports.WATER_RESISTANCE_LEVELS = [
    "30m",
    "50m",
    "100m",
    "200m",
    "300m",
    "500m",
    "1000m",
];
// Pagination
exports.DEFAULT_PAGE_SIZE = 12;
exports.MAX_PAGE_SIZE = 100;
// File upload
exports.MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB
exports.ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
// Currency
exports.DEFAULT_CURRENCY = "USD";
exports.CURRENCY_SYMBOL = "$";
