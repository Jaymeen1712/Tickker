export * from "./auth.config.js";
export * from "./schemas.js";
export * from "./types.js";

// Re-export commonly used auth functions
export { AuthError } from "next-auth";
export type { NextAuthConfig } from "next-auth";
