"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsPublicRoute = checkIsPublicRoute;
exports.createSuccessResponse = createSuccessResponse;
exports.createErrorResponse = createErrorResponse;
exports.handleAsyncOperation = handleAsyncOperation;
exports.createSlug = createSlug;
exports.generateProductUrl = generateProductUrl;
exports.calculateDiscountedPrice = calculateDiscountedPrice;
exports.calculateTax = calculateTax;
exports.calculateTotal = calculateTotal;
exports.chunk = chunk;
exports.unique = unique;
exports.omit = omit;
exports.pick = pick;
exports.isDateInRange = isDateInRange;
exports.addDays = addDays;
exports.isValidEmail = isValidEmail;
exports.isValidUrl = isValidUrl;
const constants_1 = require("./constants");
// Route checking utilities
function checkIsPublicRoute(pathname) {
    return constants_1.publicRoutes.some((route) => {
        if (route.includes("[id]")) {
            const pattern = route.replace("[id]", "[^/]+");
            const regex = new RegExp(`^${pattern}$`);
            return regex.test(pathname);
        }
        return route === pathname;
    });
}
function createSuccessResponse(data) {
    return {
        success: true,
        data,
    };
}
function createErrorResponse(error) {
    return {
        success: false,
        error: Array.isArray(error) ? error[0] || "Unknown error" : error,
        errors: Array.isArray(error) ? error : [error],
    };
}
// Async error handling wrapper
async function handleAsyncOperation(operation) {
    try {
        const result = await operation();
        return createSuccessResponse(result);
    }
    catch (error) {
        console.error("Async operation failed:", error);
        return createErrorResponse(error instanceof Error ? error.message : "An unexpected error occurred");
    }
}
// URL and slug utilities
function createSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
function generateProductUrl(id, name) {
    const slug = createSlug(name);
    return `/products/${id}/${slug}`;
}
// Price utilities
function calculateDiscountedPrice(originalPrice, discountPercentage) {
    return originalPrice * (1 - discountPercentage / 100);
}
function calculateTax(amount, taxRate = 0.08) {
    return amount * taxRate;
}
function calculateTotal(subtotal, tax = 0, shipping = 0) {
    return subtotal + tax + shipping;
}
// Array utilities
function chunk(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}
function unique(array) {
    return Array.from(new Set(array));
}
// Object utilities
function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result;
}
function pick(obj, keys) {
    const result = {};
    keys.forEach((key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
// Date utilities
function isDateInRange(date, startDate, endDate) {
    return date >= startDate && date <= endDate;
}
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
// Validation utilities
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
