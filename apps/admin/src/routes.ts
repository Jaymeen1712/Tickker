/**
 * These routes do not require authentication.
 * @type {string[]}
 */

export const publicRoutes = ["/"];

/**
 * Routes that starts with this prefix are used for API authentication purposes.
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * An array of routes that are used for authentication
 * This routes will redirect user to /home if user is logged in.
 * @type {string[]}
 */

export const authRoutes = ["/signup", "/login"];

/**
 * User will redirect to this default path if logged in.
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/";
